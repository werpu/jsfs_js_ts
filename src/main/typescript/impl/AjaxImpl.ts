/* Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as myfacesConfig from "../api/Myfaces";

import {IListener} from "./util/ListenerQueue";
import {Response} from "./xhrCore/Response";
import {XhrRequest} from "./xhrCore/XhrRequest";
import {AsynchronouseQueue} from "./util/AsyncQueue";
import {AssocArrayCollector, Config, DQ, Lang, Optional, Stream} from "../ext/monadish";

import {Const} from "./core/Const";
import {Assertions} from "./util/Assertions";
import {XhrFormData} from "./xhrCore/XhrFormData";
import {ExtDomquery} from "./util/ExtDomQuery";
import {ErrorData} from "./xhrCore/ErrorData";
import {EventData} from "./xhrCore/EventData";
import {ExtLang} from "./util/Lang";

declare var jsf: any;

/*
 * allowed project stages
 */
enum ProjectStages {
    Production = "Production",
    Development = "Development",
    SystemTest = "SystemTest",
    UnitTest = "UnitTest"
}

/*
 *   blockfilter for the passthrough filtering; the attributes given here
 *   will not be transmitted from the options into the passthrough
 */
enum BlockFilter {
    onerror = "onerror",
    onevent = "onevent",
    render = "render",
    execute = "execute",
    myfaces = "myfaces",
    delay = "delay",
    timeout = "timeout",
    windowId = "windowId"
}

/**
 * Core Implementation
 * to distinct between api and impl
 *
 * The original idea was to make the implementation pluggable
 * but this is pointless, you always can overwrite the thin api layer
 * however a dedicated api makes sense for readability reasons
 */
export module Implementation {

    import trim = Lang.trim;
    import getMessage = ExtLang.getMessage;
    import getForm = ExtLang.getForm;
    import getLocalOrGlobalConfig = ExtLang.getLocalOrGlobalConfig;
    import getEvent = ExtLang.resolveEvent;
    import getGlobalConfig = ExtLang.getGlobalConfig;
    import assert = Assertions.assert;


    let globalConfig = myfacesConfig.myfaces.config;

    let projectStage: string = null;
    let separator: string = null;
    let eventQueue = [];
    let errorQueue = [];
    export let requestQueue: AsynchronouseQueue<XhrRequest> = null;
    /*error reporting threshold*/
    let threshold = "ERROR";


    /**
     * fetches the separator char from the given script tags
     *
     * @return {char} the separator char for the given script tags
     */
    export function getSeparatorChar(): string {
        return this?.globalConfig?.separator ??
            this?.separator ??
            (separator = ExtDomquery.searchJsfJsFor(/separator=([^&;]*)/).orElse(":").value);
    }

    /**
     * this is for testing purposes only, since AjaxImpl is a module
     * we need to reset for every unit test its internal states
     */
    export function reset() {
        globalConfig = myfacesConfig.myfaces.config;

        projectStage = null;
        separator = null;
        eventQueue = [];
        errorQueue = [];
        requestQueue = null;
    }

    /**
     * @return the project stage also emitted by the server:
     * it cannot be cached and must be delivered over the server
     * The value for it comes from the requestInternal parameter of the jsf.js script called "stage".
     */
    export function getProjectStage(): string | null {
        return this?.globalConfig?.projectStage ??
            this?.projectStage ??
            (projectStage = resolveProjectStateFromURL());
    }

    /**
     * resolves the project stage as url parameter
     * @return the project stage or null
     */
    export function resolveProjectStateFromURL(): string | null {

        /* run through all script tags and try to find the one that includes jsf.js */
        let foundStage = <string>ExtDomquery.searchJsfJsFor(/stage=([^&;]*)/).value;
        return (foundStage in ProjectStages) ? foundStage : null;
    }

    /**
     * implementation of the jsf.util.chain functionality
     *
     * @param source
     * @param event
     * @param funcs
     */
    export function chain(source: any, event: Event, ...funcs: EvalFuncs): boolean {

        let ret = true;
        let resolveAndExecute = function (func: Function | string) {
            if ("string" != typeof func) {
                //function is passed down as chain parameter, can be executed as is
                return (ret = ret && ((<Function>func).call(source, event) !== false));
            } else {
                //either a function or a string can be passed in case of a string we have to wrap it into another function
                //it it is not a plain executable code but a definition
                let sourceCode = trim(<string>func);
                if (sourceCode.indexOf("function ") == 0) {
                    sourceCode = `return ${sourceCode} (event)`;
                }
                return (ret = ret && (new Function("event", sourceCode).call(source, event) !== false));
            }
        };

        //we can use our stream each functionality to run our chain here..
        //the no return value == false stop stream functionality is handled by our resolveAndExecute
        <any>Stream.of(...funcs).each(func => resolveAndExecute(func));
        return ret;
    }

    /**
     * this function has to send the ajax requests
     *
     * following request conditions must be met:
     * <ul>
     *  <li> the request must be sent asynchronously! </li>
     *  <li> the request must be a POST!!! request </li>
     *  <li> the request url must be the form action attribute </li>
     *  <li> all requests must be queued with a client side request queue to ensure the request ordering!</li>
     * </ul>
     *
     * @param el any dom element no matter being it html or jsf, from which the event is emitted
     * @param event any javascript event supported by that object
     * @param opts  map of options being pushed into the ajax cycle
     *
     *
     * a) transformArguments out of the function
     * b) passThrough handling with a map copy with a filter map block map
     */
    export function request(el: ElemDef, event?: Event, opts ?: Options) {

        /*
         *namespace remap for our local function context we mix the entire function namespace into
         *a local function variable so that we do not have to write the entire namespace
         *all the time
         */
        const resolvedEvent = getEvent(event);

        //options not set we define a default one with nothing
        const options = new Config(opts).deepCopy;
        const elem = DQ.byId(el || <Element>resolvedEvent.target);
        const elementId = elem.id;
        const requestCtx = new Config({});
        const internalCtx = new Config({});

        Assertions.assertRequestIntegrity(options, elem);

        assignWindowId(options, requestCtx);

        requestCtx.assign(Const.CTX_PARAM_PASS_THR).value = filterPassthroughValues(options.value);

        requestCtx.assignIf(!!resolvedEvent, Const.CTX_PARAM_PASS_THR, Const.P_EVT).value = resolvedEvent?.type;

        /**
         * ajax pass through context with the source
         * onresolvedEvent and onerror
         */
        requestCtx.assign(Const.SOURCE).value = elementId.value;

        /**
         * on resolvedEvent and onError...
         * those values will be traversed later on
         * also into the response context
         */
        requestCtx.assign(Const.ON_EVENT).value = options.value?.onevent;
        requestCtx.assign(Const.ON_ERROR).value = options.value?.onerror;

        /**
         * lets drag the myfaces config params also in
         */
        requestCtx.assign(Const.MYFACES).value = options.value?.myfaces;
        /**
         * fetch the parent form
         *
         * note we also add an override possibility here
         * so that people can use dummy forms and work
         * with detached objects
         */
        let form: DQ = resolveForm(requestCtx, elem, resolvedEvent);

        /**
         * binding contract the javax.faces.source must be set
         */
        requestCtx.assign(Const.CTX_PARAM_PASS_THR, Const.P_PARTIAL_SOURCE).value = elementId.value;

        /**
         * javax.faces.partial.ajax must be set to true
         */
        requestCtx.assign(Const.CTX_PARAM_PASS_THR, Const.P_AJAX).value = true;

        /**
         * binding contract the javax.faces.source must be set
         */
        requestCtx.assign(Const.CTX_PARAM_PASS_THR, Const.P_PARTIAL_SOURCE).value = elementId.value;

        /**
         * if resetValues is set to true
         * then we have to set javax.faces.resetValues as well
         * as pass through parameter
         * the value has to be explicitly true, according to
         * the specs jsdoc
         */
        requestCtx.assignIf(true === options.value?.resetValues,
            Const.CTX_PARAM_PASS_THR, Const.P_RESET_VALUES).value = true;

        //additional meta information to speed things up, note internal non jsf
        //pass through options are stored under _mfInternal in the context
        internalCtx.assign(Const.CTX_PARAM_SRC_FRM_ID).value = form.id.value;
        internalCtx.assign(Const.CTX_PARAM_SRC_CTL_ID).value = elementId.value;
        internalCtx.assign(Const.CTX_PARAM_TR_TYPE).value = Const.REQ_TYPE_POST;

        //mojarra compatibility, mojarra is sending the form id as well
        //this is not documented behavior but can be determined by running
        //mojarra under blackbox conditions
        //i assume it does the same as our formId_submit=1 so leaving it out
        //wont hurt but for the sake of compatibility we are going to add it

        requestCtx.assign(Const.CTX_PARAM_PASS_THR, form.id.value).value = form.id.value;

        assignClientWindowId(form, requestCtx);

        assignExecute(options, requestCtx, form, elementId.value);
        assignRender(options, requestCtx, form, elementId.value);

        let delay: number = resolveDelay(options);
        let timeout: number = resolveTimeout(options);

        //now we enqueue the request as asynchronous runnable into our request
        //queue and let the queue take over the rest
        queueHandler.addRequestToQueue(elem, form, requestCtx, internalCtx, delay, timeout);
    }

    /**
     * Spec. 13.3.3
     * Examining the response markup and updating the DOM tree
     * @param {XMLHttpRequest} request - the ajax request
     * @param {Object} context - the ajax context
     */
    export function response(request: XMLHttpRequest, context: Context) {
        Response.processResponse(request, context);
    }

    /**
     * adds an error handler to the error queue
     *
     * @param errorListener the error listener handler
     */
    export function addOnError(errorListener: IListener<ErrorData>) {
        /*error handling already done in the assert of the queue*/
        errorQueue.push(errorListener);
    }

    /**
     * adds an event handler to the event queue
     *
     * @param eventListener the event listener handler
     */
    export function addOnEvent(eventListener: IListener<EventData>) {
        /*error handling already done in the assert of the queue*/
        eventQueue.push(eventListener);
    }

    // noinspection JSUnusedLocalSymbols
    /**
     * sends an event to the event handlers
     *
     * @param data the event data object hosting the event data according to the spec @see EventData for what is reachable
     * @param localHandler an optional event handler, which is processed before the event handler chain
     */
    export function sendEvent(data: EventData, localHandler = function (data: EventData) {
    }) {
        /*now we serve the queue as well*/
        localHandler(data);
        eventQueue.forEach(fn => fn(data));
    }

    /**
     * error handler behavior called internally
     * and only into the impl it takes care of the
     * internal message transformation to a myfaces internal error
     * and then uses the standard send error mechanisms
     * also a double error logging prevention is done as well
     *
     * @param request the request currently being processed
     * @param context the context affected by this error
     * @param exception the exception being thrown
     * @param clearRequestQueue if set to true, clears the request queue of all pending requests
     */
    export function stdErrorHandler(request: XMLHttpRequest,
                                    context: Config,
                                    exception: any,
                                    clearRequestQueue = false) {
        //newer browsers do not allow to hold additional values on native objects like exceptions
        //we hence capsule it into the request, which is gced automatically
        //on ie as well, since the stdErrorHandler usually is called between requests
        //this is a valid approach
        try {
            if (threshold == "ERROR") {
                let errorData = ErrorData.fromClient(exception);
                sendError(errorData);
            }
        } finally {
            if (clearRequestQueue) {
                requestQueue.cleanup();
            }
        }
    }

    // noinspection JSUnusedLocalSymbols
    /**
     * implementation triggering the error chain
     *
     *
     *
     *  handles the errors, in case of an onError exists within the context the onError is called as local error handler
     *  the registered error handlers in the queue receiv an error message to be dealt with
     *  and if the projectStage is at development an alert box is displayed
     *
     *  note: we have additional functionality here, via the global config myfaces.config.defaultErrorOutput a function can be provided
     *  which changes the default output behavior from alert to something else
     *
     * @param errorData the error data to be displayed
     * @param localHandler an optional local error handler which has to be processed before the error handler queue
     */
    export function sendError(errorData: ErrorData, localHandler = function (data: any) {
    }) {

        localHandler(errorData);
        errorQueue.forEach((errorCallback: Function) => {
            errorCallback(errorData);
        });
        let displayError: (string) => void = getGlobalConfig("defaultErrorOutput", (console ? console.error : alert));
        displayError(errorData);
    }

    /**
     * @node optional element or id defining a rootnode where an element with the id "javax.faces.windowId" is hosted
     * @return the client window id of the current window, if one is given if none is found, null is returned
     */
    export function getClientWindow(node ?: Element | string): string | null {
        const ALTERED = "___mf_id_altered__";
        const INIT = "___init____";

        /**
         * the search root for the dom element search
         */
        let searchRoot = new DQ(node || document.body);

        /**
         * lazy helper to fetch the window id from the window url
         */
        let fetchWindowIdFromUrl = () => ExtDomquery.searchJsfJsFor(/jfwid=([^&;]*)/).orElse(null).value;

        /**
         * functional double check based on stream reduction
         * the values should be identical or on INIT value which is a premise to
         * skip the first check
         *
         * @param value1
         * @param value2
         */
        let doubleCheck = (value1: string, value2: string) => {
            if (value1 == ALTERED) {
                return value1;
            } else if (value1 == INIT) {
                return value2;
            } else if (value1 != value2) {
                return ALTERED;
            }
            return value2;
        };

        /**
         * helper for cleaner code, maps the value from an item
         *
         * @param item
         */
        let getValue = (item: DQ) => item.attr("value").value;
        /**
         * fetch the window id from the forms
         * window ids must be present in all forms
         * or non existent. If they exist all of them must be the same
         */
        let formWindowId: Optional<string> = searchRoot.stream.map<string>(getValue).reduce(doubleCheck, INIT);

        //if the resulting window id is set on altered then we have an unresolvable problem
        assert(formWindowId.value != ALTERED, "Multiple different windowIds found in document");

        /**
         * return the window id or null
         * prio, forms under node/document and if not given then from the url
         */
        return formWindowId.value ?? fetchWindowIdFromUrl();
    }

    /**
     * collect and encode data for a given form element (must be of type form)
     * find the javax.faces.ViewState element and encode its value as well!
     * @return a concatenated string of the encoded values!
     *
     * @throws Error in case of the given element not being of type form!
     * https://issues.apache.org/jira/browse/MYFACES-2110
     */
    export function getViewState(form: Element | string): string {
        /**
         *  typecheck assert!, we opt for strong typing here
         *  because it makes it easier to detect bugs
         */

        let element: DQ = DQ.byId(form);
        if (!element.isTag(Const.TAG_FORM)) {
            throw new Error(getMessage("ERR_VIEWSTATE"));
        }

        let formData = new XhrFormData(element);
        return formData.toString();
    }


    /**
     * this at the first sight looks like a weird construct, but we need to do it this way
     * for testing, we cannot proxy addRequestToQueue from the testing frameworks directly
     * but we need to keep it under unit tests.
     */
    export let queueHandler = {
        /**
         * public to make it shimmable for tests
         *
         * adds a new request to our queue for further processing
         */
        addRequestToQueue: function (elem: DQ, form: DQ, reqCtx: Config, respPassThr: Config, delay = 0, timeout = 0) {
            requestQueue = requestQueue ?? new AsynchronouseQueue<XhrRequest>();
            requestQueue.enqueue(new XhrRequest(elem, form, reqCtx, respPassThr, [], timeout), delay);
        }
    };

    //----------------------------------------------- Methods ---------------------------------------------------------------------

    /**
     * assigns the windowId into our context object
     * The problem is that the window id can be passed down from various sources
     * first it can be part of our options otherwise also in our url
     *
     * the window id is assigned from followng sources
     * 1) options value
     * 2) if no options value is present we look into our url
     *
     * The window Id then is stored as
     * @param options the target options object receiving an new windowId if none is present
     * @param targetCtx the receiving target context
     */
    function assignWindowId(options: Config, targetCtx: Config) {
        let windowId = options?.value?.windowId ?? ExtDomquery.windowId;
        targetCtx.assignIf(!!windowId, Const.P_WINDOW_ID).value = windowId;

        //todo still needed ??? we clone anyway
        options.delete(Const.WINDOW_ID);
    }

    /**
     * the idea is to replace some placeholder parameters with their respective values
     * placeholder params like  @all, @none, @form, @this need to be replaced by
     * the values defined by the specification
     *
     * This function does it for the render parameters
     *
     * @param requestOptions the source options coming in as options object from jsf.ajax.request (options parameter)
     * @param targetContext the receiving target context
     * @param issuingForm the issuing form
     * @param sourceElementId the executing element triggering the jsf.ajax.request (id of it)
     */
    function assignRender(requestOptions: Config, targetContext: Config, issuingForm: DQ, sourceElementId: string) {
        if (requestOptions.getIf(Const.RENDER).isPresent()) {
            remapDefaultConstants(targetContext.getIf(Const.CTX_PARAM_PASS_THR).get({}), Const.P_RENDER, <string>requestOptions.getIf(Const.RENDER).value, issuingForm, <any>sourceElementId);
        }
    }

    /**
     * the idea is to replace some placeholder parameters with their respective values
     * placeholder params like  @all, @none, @form, @this need to be replaced by
     * the values defined by the specification
     *
     * This function does it for the execute parameters
     *
     * @param requestOptions the source options coming in as options object from jsf.ajax.request (options parameter)
     * @param targetContext the receiving target context
     * @param issuingForm the issuing form
     * @param sourceElementId the executing element triggering the jsf.ajax.request (id of it)
     */
    function assignExecute(requestOptions: Config, targetContext: Config, issuingForm: DQ, sourceElementId: string) {


        if (requestOptions.getIf(Const.CTX_PARAM_EXECUTE).isPresent()) {
            /*the options must be a blank delimited list of strings*/
            /*compliance with Mojarra which automatically adds @this to an execute
             * the spec rev 2.0a however states, if none is issued nothing at all should be sent down
             */
            requestOptions.assign(Const.CTX_PARAM_EXECUTE).value = [requestOptions.getIf(Const.CTX_PARAM_EXECUTE).value, Const.IDENT_THIS].join(" ");
            remapDefaultConstants(targetContext.getIf(Const.CTX_PARAM_PASS_THR).get({}), Const.P_EXECUTE, <string>requestOptions.getIf(Const.CTX_PARAM_EXECUTE).value, issuingForm, <any>sourceElementId);
        } else {
            targetContext.assign(Const.CTX_PARAM_PASS_THR, Const.P_EXECUTE).value = sourceElementId;
        }
    }

    /**
     * apply the browser tab where the request was originating from
     *
     * @param form the form hosting the client window id
     * @param targetContext the target context receiving the value
     */
    function assignClientWindowId(form: DQ, targetContext: Config) {
        let clientWindow = jsf.getClientWindow(form.getAsElem(0).value);
        if (clientWindow) {
            targetContext.assign(Const.CTX_PARAM_PASS_THR, Const.P_CLIENT_WINDOW).value = clientWindow;
        }
    }

    /**
     * transforms the user values to the expected one
     * with the proper none all form and this handling
     * (note we also could use a simple string replace but then
     * we would have had double entries under some circumstances)
     *
     * there are several standardized constants which need a special treatment
     * like @all, @none, @form, @this
     *
     * @param targetConfig the target configuration receiving the final values
     * @param targetKey the target key
     * @param userValues the passed user values (aka input string which needs to be transformed)
     * @param issuingForm the form where the issuing element originates
     * @param issuingElementId the issuing element
     */
    function remapDefaultConstants(targetConfig: Config, targetKey: string, userValues: string, issuingForm: DQ, issuingElementId: string): Config {
        //a cleaner implementation of the transform list method

        let iterValues = (userValues) ? trim(userValues).split(/\s+/gi) : [];
        let ret = [];
        let processed = {};

        //the idea is simply to loop over all values and then replace
        //their generic values and filter out doubles
        //this is more readable than the old indexed based solution
        //and not really slower because we had to build up the index in our old solution
        //anyway
        for (let cnt = 0; cnt < iterValues.length; cnt++) {
            //avoid doubles
            if (iterValues[cnt] in processed) {
                continue;
            }
            switch (iterValues[cnt]) {
                //@none no values should be sent
                case Const.IDENT_NONE:
                    return targetConfig.delete(targetKey);
                //@all is a pass through case according to the spec
                case Const.IDENT_ALL:
                    targetConfig.assign(targetKey).value = Const.IDENT_ALL;
                    return targetConfig;
                //@form pushes the issuing form id into our list
                case Const.IDENT_FORM:
                    ret.push(issuingForm.id.value);
                    processed[issuingForm.id.value] = true;
                    break;
                //@this is replaced with the current issuing element id
                case Const.IDENT_THIS:
                    if (!(issuingElementId in processed)) {
                        ret.push(issuingElementId);
                        processed[issuingElementId] = true;
                    }
                    break;
                default:
                    ret.push(iterValues[cnt]);
                    processed[iterValues[cnt]] = true;
            }
        }
        //We now add the target as joined list
        targetConfig.assign(targetKey).value = ret.join(" ");
        return targetConfig;
    }

    /**
     * filter the options tiven with a blacklist so that only
     * the values required for passthough land in the ajax request
     *
     * @param mappedOpts the options to be filtered
     */
    function filterPassthroughValues(mappedOpts: { [key: string]: any }) {
        //we now can use the full code reduction given by our stream api
        //to filter
        return Stream.ofAssoc(mappedOpts)
            .filter(item => !(item[0] in BlockFilter))
            .collect(new AssocArrayCollector());
    }

    /**
     * form resolution the same way our old implementation did
     * it is either the id or the parent form of the element or an embedded form
     * of the element
     *
     * @param requestCtx
     * @param elem
     * @param event
     */
    function resolveForm(requestCtx: Config, elem: DQ, event: Event): DQ {
        const configId = requestCtx.value?.myfaces?.form ?? Const.MF_NONE; //requestCtx.getIf(MYFACES, "form").orElse(MF_NONE).value;
        return DQ
            .byId(configId)
            .orElseLazy(() => getForm(elem.getAsElem(0).value, event));
    }

    function resolveTimeout(options: Config): number {
        let getCfg = getLocalOrGlobalConfig;
        return options.getIf(Const.CTX_PARAM_TIMEOUT).value ?? getCfg(options.value, Const.CTX_PARAM_TIMEOUT, 0);
    }

    /**
     * resolve the delay from the options and/or the request context and or the configuration
     *
     * @param options ... the options object, in most cases it will host the delay value
     */
    function resolveDelay(options: Config): number {
        let getCfg = getLocalOrGlobalConfig;

        return options.getIf(Const.CTX_PARAM_DELAY).value ?? getCfg(options.value, Const.CTX_PARAM_DELAY, 0);
    }

}
