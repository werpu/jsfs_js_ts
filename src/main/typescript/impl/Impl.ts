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


import * as myfacesConfig from "../api/myfaces";
import {myfaces} from "../api/myfaces";
import {Lang} from "./util/Lang";
import {ErrorData, EventData, IListener, ListenerQueue} from "./util/ListenerQueue";
import {Response} from "./xhrCore/Response";
import {XhrRequest} from "./xhrCore/XhrRequest";
import {AsynchronouseQueue} from "./util/Queue";
import {Config, Optional} from "../_ext/monadish/Monad";
import {DomQuery} from "../_ext/monadish/DomQuery";
import {ExtDomQuery} from "./util/ExtDomQuery";
import {Const} from "./core/Const";


let globalConfig = myfacesConfig.myfaces.config;

export class Implementation {


    /*blockfilter for the passthrough filtering; the attributes given here
     * will not be transmitted from the options into the passthrough*/
    private BLOCKFILTER = {onerror: 1, onevent: 1, render: 1, execute: 1, myfaces: 1};


    private static _instance: Implementation = null;
    private projectStage: string = null;
    private separator: string = null;


    private eventQueue = new ListenerQueue<EventData>();
    private errorQueue = new ListenerQueue<ErrorData>();
    private requestQueue = new AsynchronouseQueue<XhrRequest>();


    /*error reporting threshold*/
    private threshold = "ERROR";

    private constructor() {
    }

    static get instance(): Implementation {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new Implementation();
        return this._instance;
    }

    /**
     * @return the project stage also emitted by the server:
     * it cannot be cached and must be delivered over the server
     * The value for it comes from the requestInternal parameter of the jsf.js script called "stage".
     */
    getProjectStage(): string {
        if (globalConfig.projectStage !== null) {
            return globalConfig.projectStage;
        }
        if (this.projectStage !== null) {
            return this.projectStage;
        }

        let allowedProjectStages = {STG_PROD: 1, "Development": 1, "SystemTest": 1, "UnitTest": 1};

        /* run through all script tags and try to find the one that includes jsf.js */
        DomQuery.querySelectorAll("script").filter((item: DomQuery) => {
            return item.attr("src", "").value.search(/\/javax\.faces\.resource\/jsf\.js.*ln=javax\.faces/) != -1;
        }).first((item: DomQuery) => {
            let result = item.attr("src", "").value.match(/stage=([^&;]*)/);
            // we found stage=XXX
            // return only valid values of ProjectStage
            this.projectStage = (allowedProjectStages[result[1]]) ? result[1] : null;
        });

        return this.projectStage;
    }

    /**
     * fetches the separator char from the given script tags
     *
     * @return {char} the separator char for the given script tags
     */
    getSeparatorChar(): string {
        if (globalConfig.separator !== null) {
            return globalConfig.separator;
        }
        if (this.separator) {
            return this.separator;
        }

        DomQuery.querySelectorAll("script").filter(item => {
            return item.attr("src", "").value.search(/\/javax\.faces\.resource.*\/jsf\.js.*separator/) != -1;
        }).first((item: DomQuery) => {
            let result = item.attr("src", "").value.match(/separator=([^&;]*)/);
            this.separator = decodeURIComponent(result[1]);
            return false;
        });

        this.separator = this.separator || ":";
        return this.separator;
    }

    chain(source: any, event: Event, ...funcs: Array<Function | string>): boolean {
        for (let cnt = 0; funcs && cnt < funcs.length; cnt++) {
            let ret: any;
            if ("string" != typeof funcs[cnt]) {
                ret = (<Function>funcs[cnt]).call(source, event);
            } else {
                //either a function or a string can be passed in case of a string we have to wrap it into another function
                ret = new Function("event", <string>funcs[cnt]).call(source, event);
            }
            if (ret === false) {
                return false;
            }
        }
        return true;
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
     * @param {String|Node} elem any dom element no matter being it html or jsf, from which the event is emitted
     * @param {|Event|} event any javascript event supported by that object
     * @param {|Object|} options  map of options being pushed into the ajax cycle
     *
     *
     * a) transformArguments out of the function
     * b) passThrough handling with a map copy with a filter map block map
     */
    request(el: Element, event?: Event, opts?: { [key: string]: string | Function | { [key: string]: string | Function } }) {
        const _Lang = Lang.instance;
        /*
         *namespace remap for our local function context we mix the entire function namespace into
         *a local function variable so that we do not have to write the entire namespace
         *all the time
         */
        event = _Lang.getEvent(event);
        //options not set we define a default one with nothing
        let options = new Config(opts || {});
        let elem = DomQuery.byId(el || <Element>event.target);

        /*assert if the onerror is set and once if it is set it must be of type function*/

        _Lang.assertType(options.getIf(Const.ON_ERROR).value, "function");
        /*assert if the onevent is set and once if it is set it must be of type function*/
        _Lang.assertType(options.getIf(Const.ON_EVENT).value, "function");
        //improve the error messages if an empty elem is passed

        this.assertElementExists(elem);

        /*preparations for jsf 2.2 windowid handling*/
        //pass the window id into the options if not set already

        options.apply(Const.P_WINDOW_ID).value = options.getIf("windowId").presentOrElse(ExtDomQuery.windowId).value;
        options.delete("windowId");


        /**
         * we cross reference statically hence the mapping here
         * the entire mapping between the functions is stateless
         */
        //null definitely means no event passed down so we skip the ie specific checks


        let elementId = elem.id;

        //TODO cleaned up passthrough handling
        /*
         * We make a copy of our options because
         * we should not touch the incoming params!
         */

        let passThrgh = _Lang.mixMaps({}, <any>options, true, <any>this.BLOCKFILTER);

        if (event) {
            passThrgh[Const.P_EVT] = event.type;
        }

        /**
         * ajax pass through context with the source
         * onevent and onerror
         */
        let context = {};
        let ctx = new Config(context);

        ctx.apply(Const.SOURCE).value = elem;
        ctx.apply(Const.ON_EVENT).value = options.getIf(Const.ON_EVENT).value;
        ctx.apply(Const.ON_ERROR).value = options.getIf(Const.ON_ERROR).value;
        ctx.apply("myfaces").value = options.getIf("myfaces").value;
        ctx.apply(Const.CTX_PARAM_DELAY).value = options.getIf(Const.CTX_PARAM_DELAY).value;


        /**
         * fetch the parent form
         *
         * note we also add an override possibility here
         * so that people can use dummy forms and work
         * with detached objects
         */
        let form: DomQuery = DomQuery
            .querySelectorAll("#" + (ctx.getIf("myfaces", "form").value || "__mf_none__"))
            .presentOrElseLazy(() => {
                return new DomQuery(this.getForm(elem.getAsElem(0).value, event).value);
            });


        /**
         * binding contract the javax.faces.source must be set
         */
        ctx.apply(Const.CTX_PARAM_PASS_THR, Const.P_PARTIAL_SOURCE).value = elementId;
        /**
         * javax.faces.partial.ajax must be set to true
         */
        ctx.apply(Const.CTX_PARAM_PASS_THR, Const.P_AJAX).value = elementId;

        this.applyClientWindowId(form, ctx, passThrgh);

        /**
         * binding contract the javax.faces.source must be set
         */
        ctx.apply(Const.CTX_PARAM_PASS_THR, Const.P_PARTIAL_SOURCE).value = elementId;

        /**
         * javax.faces.partial.ajax must be set to true
         */
        ctx.apply(Const.CTX_PARAM_PASS_THR, Const.P_AJAX).value = elementId;

        /**
         * if resetValues is set to true
         * then we have to set javax.faces.resetValues as well
         * as pass through parameter
         * the value has to be explicitly true, according to
         * the specs jsdoc
         */

        ctx.applyIf(true === options.getIf(Const.CTX_PARAM_RST).get(false).value,
            Const.CTX_PARAM_PASS_THR, Const.P_RESET_VALUES).value = true;

        this.applyExecute(options, ctx, form, elementId.value);
        this.applyRender(options, ctx, form, elementId.value);

        let delay = options.getIf(Const.CTX_PARAM_DELAY).get(_Lang.getLocalOrGlobalConfig(ctx.value, Const.CTX_PARAM_DELAY, 0)).value;

        //additional meta information to speed things up, note internal non jsf
        //pass through options are stored under _mfInternal in the context
        ctx.apply(Const.CTX_PARAM_MF_INTERNAL, Const.CTX_PARAM_SRC_FRM_ID).value = form.id.value;
        ctx.apply(Const.CTX_PARAM_MF_INTERNAL, Const.CTX_PARAM_SRC_CTL_ID).value = elementId;
        ctx.apply(Const.CTX_PARAM_MF_INTERNAL, Const.CTX_PARAM_TR_TYPE).value = Const.REQ_TYPE_POST;

        //mojarra compatibility, mojarra is sending the form id as well
        //this is not documented behavior but can be determined by running
        //mojarra under blackbox conditions
        //i assume it does the same as our formId_submit=1 so leaving it out
        //wont hurt but for the sake of compatibility we are going to add it
        ctx.apply(Const.CTX_PARAM_PASS_THR, form.id.value).value = form.id.value;

        //todo partial id handling from config

        //now we enqueue the request as asynchronous runnable into our request
        //queue and let the queue take over the rest
        this.addRequestToQueue(elem, form, ctx);
    }

    private assertElementExists(elem: DomQuery) {
        if (elem.isAbsent()) {
            throw Lang.instance.makeException(new Error(), "ArgNotSet", null, "Impl", "request", Lang.instance.getMessage("ERR_MUST_BE_PROVIDED1", "{0}: source  must be provided", "jsf.ajax.request", "source element id"));
        }
    }


    /**
     * public to make it shimmable for tests
     */
    addRequestToQueue(elem: DomQuery, form: DomQuery, ctx: Config) {
        this.requestQueue.enqueue(new XhrRequest(elem, form, ctx));
    }

    private applyRender(options: Config, ctx: Config, form: DomQuery, elementId: string) {
        if (options.getIf("render").isPresent()) {
            this.transformValues(ctx.getIf(Const.CTX_PARAM_PASS_THR).get({}), Const.P_RENDER, <string>options.getIf("render").value, form, <any>elementId);
        }
    }


    private applyExecute(options: Config, ctx: Config, form: DomQuery, elementId: string) {
        //TODO none handling
        if (options.getIf(Const.CTX_PARAM_EXECUTE).isPresent()) {
            /*the options must be a blank delimited list of strings*/
            /*compliance with Mojarra which automatically adds @this to an execute
             * the spec rev 2.0a however states, if none is issued nothing at all should be sent down
             */
            options.apply(Const.CTX_PARAM_EXECUTE).value = options.getIf(Const.CTX_PARAM_EXECUTE).value + " @this";
            this.transformValues(ctx.getIf(Const.CTX_PARAM_PASS_THR).get({}), Const.P_EXECUTE, <string>options.getIf(Const.CTX_PARAM_EXECUTE).value, form, <any>elementId);
        } else {
            ctx.apply(Const.CTX_PARAM_PASS_THR, Const.P_EXECUTE).value = elementId;
        }
    }

    private applyClientWindowId(form: DomQuery, ctx: Config, passThrgh?: any) {
        let clientWindow = (<any>window).jsf.getClientWindow(form.getAsElem(0).value);
        if (clientWindow) {
            if (form.querySelectorAll("[name='" + Const.P_CLIENTWINDOW + "']").length == 0) {
                ctx.apply(Const.CTX_PARAM_MF_INTERNAL, "_clientWindow").value = clientWindow;
            } else {
                ctx.apply(Const.CTX_PARAM_PASS_THR, Const.P_CLIENTWINDOW).value = clientWindow;
            }
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
    private transformValues(targetConfig: Config, targetKey: string, userValues: string, issuingForm: DomQuery, issuingElementId: string): Config {
        //a cleaner implementation of the transform list method
        let _Lang = Lang.instance;
        let iterValues = (userValues) ? _Lang.trim(userValues).split(/\s+/gi) : [];
        let ret = [];
        let added = {};

        //the idea is simply to loop over all values and then replace
        //their generic values and filter out doubles
        //this is more readable than the old indexed based solution
        //and not really slower because we had to build up the index in our old solution
        //anyway
        for (let cnt = 0; cnt < iterValues.length; cnt++) {
            //avoid doubles
            if (iterValues[cnt] in added) {
                continue;
            }
            switch (iterValues[cnt]) {
                //@none no values should be sent
                case Const.IDENT_NONE:
                    return targetConfig.delete(targetKey);
                //@all is a pass through case according to the spec
                case Const.IDENT_ALL:
                    targetConfig.apply(targetKey).value = Const.IDENT_ALL;
                    return targetConfig;
                //@form pushes the issuing form id into our list
                case Const.IDENT_FORM:
                    ret.push(issuingForm.id.value);
                    added[issuingForm.id.value] = true;
                    break;
                //@this is replaced with the current issuing element id
                case Const.IDENT_THIS:
                    if (!(issuingElementId in added)) {
                        ret.push(issuingElementId);
                        added[issuingElementId] = true;
                    }
                    break;
                default:
                    ret.push(iterValues[cnt]);
                    added[iterValues[cnt]] = true;
            }
        }
        //We now add the target as joined list
        targetConfig.apply(targetKey).value = ret.join(" ");
        return targetConfig;
    }

    /**
     * Spec. 13.3.3
     * Examining the response markup and updating the DOM tree
     * @param {XMLHttpRequest} request - the ajax request
     * @param {Object} context - the ajax context
     */
    response(request: XMLHttpRequest, context: { [key: string]: any }) {
        Response.processResponse(request, context);
    }

    addOnError(errorListener: IListener<ErrorData>) {
        /*error handling already done in the assert of the queue*/
        this.errorQueue.enqueue(errorListener);
    }

    addOnEvent(eventListener: IListener<EventData>) {
        /*error handling already done in the assert of the queue*/
        this.eventQueue.enqueue(eventListener);
    }

    /**
     * sends an event
     */
    sendEvent(/*Object*/request: XMLHttpRequest, /*Object*/ context: { [key: string]: any }, /*event name*/ name: string) {
        let _Lang = Lang.instance;
        let eventData = new EventData();
        let UNKNOWN = _Lang.getMessage("UNKNOWN");

        let req = new Config(request);

        eventData.type = Const.EVENT;

        eventData.status = name;
        eventData.source = context.source;

        if (name !== Const.BEGIN) {

            try {
                eventData.responseCode = req.getIf(Const.STATUS).value;
                eventData.responseText = req.getIf(Const.RESPONSE_TEXT).value;
                eventData.responseXML = req.getIf(Const.RESPONSE_XML).value;

            } catch (e) {
                let impl = _Lang.getGlobalConfig("jsfAjaxImpl", this);
                this.sendError(request, context, Const.CLIENT_ERROR, "ErrorRetrievingResponse",
                    _Lang.getMessage("ERR_CONSTRUCT", e.toString()));

                //client errors are not swallowed
                throw e;
            }

        }

        /**/
        if (context.onevent) {
            /*calling null to preserve the original scope*/
            context.onevent.call(null, eventData);
        }

        /*now we serve the queue as well*/
        this.eventQueue.broadcastEvent(eventData);
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
     */
    stdErrorHandler(request: XMLHttpRequest, context: { [key: string]: any }, exception: any, clearRequestQueue = false) {
        //newer browsers do not allow to hold additional values on native objects like exceptions
        //we hence capsule it into the request, which is gced automatically
        //on ie as well, since the stdErrorHandler usually is called between requests
        //this is a valid approach
        try {
            if (this.threshold == "ERROR") {
                let mfInternal = exception._mfInternal || {};

                let finalMsg = [];
                finalMsg.push(exception.message);
                this.sendError(request, context,
                    mfInternal.title || Const.CLIENT_ERROR, mfInternal.name || exception.name, finalMsg.join("\n"), mfInternal.caller, mfInternal.callFunc);
            }
        } finally {
            if (clearRequestQueue) {
                //TODO requestQueue cleaup call
            }
        }
    }


    /**
     * implementation triggering the error chain
     *
     * @param {Object} request the request object which comes from the xhr cycle
     * @param {Object} context (Map) the context object being pushed over the xhr cycle keeping additional metadata
     * @param {String} name the error name
     * @param {String} serverErrorName the server error name in case of a server error
     * @param {String} serverErrorMessage the server error message in case of a server error
     * @param {String} caller optional caller reference for extended error messages
     * @param {String} callFunc optional caller Function reference for extended error messages
     *
     *  handles the errors, in case of an onError exists within the context the onError is called as local error handler
     *  the registered error handlers in the queue receiv an error message to be dealt with
     *  and if the projectStage is at development an alert box is displayed
     *
     *  note: we have additional functionality here, via the global config myfaces.config.defaultErrorOutput a function can be provided
     *  which changes the default output behavior from alert to something else
     *
     *
     */
    sendError(request: XMLHttpRequest, context: { [key: string]: any }, name: string, serverErrorName?: string, serverErrorMessage?: string, caller?: string, callFunc?: string) {
        let _Lang = Lang.instance;
        let UNKNOWN = _Lang.getMessage("UNKNOWN");

        let eventData = new ErrorData();
        //we keep this in a closure because we might reuse it for our serverErrorMessage
        let malFormedMessage = function () {
            return (name && name === this.MALFORMEDXML) ? _Lang.getMessage("ERR_MALFORMEDXML") : "";
        };
        let ctx = new Config(context);

        //by setting unknown values to unknown we can handle cases
        //better where a simulated context is pushed into the system
        eventData.type = Const.ERROR;

        eventData.status = name || UNKNOWN;
        eventData.serverErrorName = serverErrorName || UNKNOWN;
        eventData.serverErrorMessage = serverErrorMessage || UNKNOWN;

        try {
            eventData.source = ctx.getIf(Const.SOURCE).presentOrElse(UNKNOWN).value;
            eventData.responseCode = ctx.getIf(Const.STATUS).presentOrElse(UNKNOWN).value;
            eventData.responseText = ctx.getIf(Const.RESPONSE_TEXT).presentOrElse(UNKNOWN).value;
            eventData.responseXML = ctx.getIf(Const.RESPONSE_XML).presentOrElse(UNKNOWN).value;
        } catch (e) {
            // silently ignore: user can find out by examining the event data
        }
        //extended error message only in dev mode
        if ((<any>window).jsf.getProjectStage() === Const.STAGE_DEVELOPMENT) {
            eventData.serverErrorMessage = eventData.serverErrorMessage || "";
            eventData.serverErrorMessage = (caller) ? eventData.serverErrorMessage + "\nCalling class: " + caller : eventData.serverErrorMessage;
            eventData.serverErrorMessage = (callFunc) ? eventData.serverErrorMessage + "\n Calling function: " + callFunc : eventData.serverErrorMessage;
        }

        /**/
        if (ctx.getIf(Const.ON_ERROR).isPresent()) {
            context.onerror(eventData);
        }

        /*now we serve the queue as well*/
        this.errorQueue.broadcastEvent(eventData);

        if ((<any>window).getProjectStage() === Const.STAGE_DEVELOPMENT && !this.errorQueue.length && ctx.getIf(Const.ON_ERROR).isAbsent()) {
            let DIVIDER = "--------------------------------------------------------",
                displayError: (string) => void = Lang.instance.getGlobalConfig("defaultErrorOutput", alert),
                finalMessage = [],
                //we remap the function to achieve a better compressability
                pushMsg = (item: any) => {
                    finalMessage.push(item);
                };

            (serverErrorMessage) ? pushMsg(_Lang.getMessage("MSG_ERROR_MESSAGE") + " " + serverErrorMessage + "\n") : null;

            pushMsg(DIVIDER);

            (caller) ? pushMsg("Calling class:" + caller) : null;
            (callFunc) ? pushMsg("Calling function:" + callFunc) : null;
            (name) ? pushMsg(_Lang.getMessage("MSG_ERROR_NAME") + " " + name) : null;
            (serverErrorName && name != serverErrorName) ? pushMsg("Server error name: " + serverErrorName) : null;


            pushMsg(malFormedMessage());
            pushMsg(DIVIDER);
            pushMsg(_Lang.getMessage("MSG_DEV_MODE"));
            displayError(finalMessage.join("\n"));
        }
    }


    /**
     * fetches the form in an unprecise manner depending
     * on an element or event target
     *
     * @param elem
     * @param event
     */
    private getForm(elem: Element, event?: Event): Optional<Element> {
        let _Lang = Lang.instance;

        let queryElem = new DomQuery(elem);
        let eventTarget = event ? new DomQuery(_Lang.getEventTarget(event)) : new DomQuery();
        let form = queryElem.parents("form").presentOrElse(queryElem.byTagName("form", true))
            .presentOrElseLazy(() => eventTarget.parents("form")
                .presentOrElseLazy(() => eventTarget.byTagName("form"))).first();
        if (form.isAbsent()) {
            throw _Lang.makeException(new Error(), null, null, "Impl", "getForm", _Lang.getMessage("ERR_FORM"));
        }

        return form.getAsElem(0);
    }

}
