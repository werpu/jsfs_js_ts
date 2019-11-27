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

import {Config, DomQuery, Lang, Stream, XMLQuery} from "../../ext/monadish";
import {Const} from "../core/Const";
import {Implementation} from "../AjaxImpl";
import {Assertions} from "../util/Assertions";

import {ResonseDataResolver} from "./ResonseDataResolver";
import {IResponseProcessor} from "./IResponseProcessor";
import {ErrorData} from "./ErrorData";
import {DQ} from "../../ext/monadish/DomQuery";
import {ExtLang} from "../util/Lang";
import trim = Lang.trim;
import getLocalOrGlobalConfig = ExtLang.getLocalOrGlobalConfig;
import resolveSourceElement = ResonseDataResolver.resolveSourceElement;
import resolveSourceForm = ResonseDataResolver.resolveSourceForm;


import {ViewState} from "../core/ImplTypes";
import {EventData} from "./EventData";


/**
 * Response processor
 *
 * Each  XML tag is either a node or a leaf
 * or both
 *
 * the processor provides a set of operations
 * which are executed on a single leaf node per operation
 * and present the core functionality of our response
 *
 */
export class ResponseProcessor implements IResponseProcessor {

    constructor(private request: Config, private externalContext: Config, private internalContext: Config) {

    }

    replaceHead(shadowDocument: XMLQuery | DQ) {
        let shadowHead = shadowDocument.querySelectorAll(Const.TAG_HEAD);
        if (!shadowHead.isPresent()) {
            return;
        }
        let shadowInnerHTML: string = <string>shadowHead.html().value;
        let oldHead = DQ.querySelectorAll(Const.TAG_HEAD);

        //delete all to avoid script and style overlays
        oldHead.querySelectorAll(Const.SEL_SCRIPTS_STYLES).delete();

        this.storeForEval(shadowHead);
    }

    /**
     * replaces the body in the expected manner
     * which means the entire body content is refreshed
     * however also the body attributes must be transferred
     * keeping event handlers etc... in place
     *
     * @param shadowDocument .. an incoming shadow document hosting the new nodes
     */
    replaceBody(shadowDocument: XMLQuery | DQ) {

        let shadowBody = shadowDocument.querySelectorAll(Const.TAG_BODY);
        if (!shadowBody.isPresent()) {
            return;
        }

        let shadowInnerHTML: string = <string>shadowBody.html().value;

        let resultingBody = <DQ>DQ.querySelectorAll(Const.TAG_BODY).html(shadowInnerHTML);
        let updateForms = resultingBody.querySelectorAll(Const.TAG_FORM);

        resultingBody.copyAttrs(shadowBody);

        this.storeForPostProcessing(updateForms, resultingBody);
    }

    /**
     * Leaf Tag eval... process whatever is in the evals cdata block
     *
     * @param node the node to eval
     */
    eval(node: XMLQuery) {
        DQ.globalEval(node.cDATAAsString);
    }

    /**
     * processes an incoming error from the response
     * which is hosted under the &lt;error&gt; tag
     * @param request the current request
     * @param context the context object
     * @param node the node in the xml hosting the error message
     */
    error(node: XMLQuery) {
        /**
         * <error>
         *      <error-name>String</error-name>
         *      <error-message><![CDATA[message]]></error-message>
         * <error>
         */

        let mergedErrorData = new Config({});
        mergedErrorData.assign(Const.SOURCE).value = this.externalContext.getIf(Const.P_PARTIAL_SOURCE).get(0).value;
        mergedErrorData.assign(Const.ERROR_NAME).value = node.getIf(Const.ERROR_NAME).textContent(Const.EMPTY_STR);
        mergedErrorData.assign(Const.ERROR_MESSAGE).value = node.getIf(Const.ERROR_MESSAGE).cDATAAsString;

        let hasResponseXML = this.internalContext.get(Const.RESPONSE_XML).isPresent();
        mergedErrorData.assignIf(hasResponseXML, Const.RESPONSE_XML).value = this.internalContext.getIf(Const.RESPONSE_XML).value.get(0).value;

        let errorData = ErrorData.fromServerError(mergedErrorData);

        this.externalContext.getIf(Const.ON_ERROR).orElse(this.internalContext.getIf(Const.ON_ERROR).value).orElse(Const.EMPTY_FUNC).value(errorData);
        Implementation.sendError(errorData);
    }

    /**
     * process the redirect operation
     *
     * @param node
     */
    redirect(node: XMLQuery) {
        Assertions.assertUrlExists(node);

        let redirectUrl = trim(node.attr(Const.ATTR_URL).value);
        if (redirectUrl != Const.EMPTY_STR) {
            (<any>window).location.href = redirectUrl;
        }
    }

    /**
     * processes the update operation and updates the node with the cdata block
     * @param context
     * @param internalContext
     * @param node
     * @param cdataBlock
     */
    update(node: XMLQuery, cdataBlock: string) {
        let result = DQ.byId(node.id.value).outerHTML(cdataBlock, false, false);
        let sourceForm = result?.parents(Const.TAG_FORM).orElse(result.byTagName(Const.TAG_FORM, true));
        if(sourceForm) {
            this.storeForPostProcessing(sourceForm, result);
        }
    }


    delete(node: XMLQuery) {
        DQ.byId(node.id.value).delete();
    }

    /**
     * attributes leaf tag... process the attributes
     *
     * @param node
     */
    attributes(node: XMLQuery) {
        let elem = DQ.byId(node.id.value);

        node.byTagName(Const.TAG_ATTR).each((item: XMLQuery) => {
            elem.attr(item.attr(Const.ATTR_NAME).value).value = item.attr(Const.ATTR_VALUE).value;
        });
    }

    /**
     * @param shadownResponse
     */
    replaceViewRoot(shadowDocument: XMLQuery) {
        this.replaceHead(shadowDocument);
        this.replaceBody(shadowDocument);
    }

    /**
     * insert handling, either before or after
     *
     * @param node
     */
    insert(node: XMLQuery) {
        //let insertId = node.id; //not used atm

        let before = node.attr(Const.TAG_BEFORE);
        let after = node.attr(Const.TAG_AFTER);

        let insertNodes = DQ.fromMarkup(<any>node.cDATAAsString);

        if (before.isPresent()) {
            let res = DQ.byId(before.value).insertBefore(insertNodes);
            this.internalContext.assign(Const.UPDATE_ELEMS).value.push(insertNodes);
        }
        if (after.isPresent()) {
            let domQuery = DQ.byId(after.value);
            domQuery.insertAfter(insertNodes);

            this.internalContext.assign(Const.UPDATE_ELEMS).value.push(insertNodes);
        }
    }

    insertWithSubtags(node: XMLQuery) {
        let before = node.querySelectorAll(Const.TAG_BEFORE);
        let after = node.querySelectorAll(Const.TAG_AFTER);

        before.each(item => {
            let insertId = item.attr(Const.ATTR_ID);
            let insertNodes = DQ.fromMarkup(<any>item.cDATAAsString);
            if(insertId.isPresent()) {
                DQ.byId(insertId.value).insertBefore(insertNodes);
                this.internalContext.assign(Const.UPDATE_ELEMS).value.push(insertNodes);
            }
        });

        after.each(item => {
            let insertId = item.attr(Const.ATTR_ID);
            let insertNodes = DQ.fromMarkup(<any>item.cDATAAsString);
            if(insertId.isPresent()) {
                DQ.byId(insertId.value).insertAfter(insertNodes);
                this.internalContext.assign(Const.UPDATE_ELEMS).value.push(insertNodes);
            }
        });
    }

    /**
     * process the viewState update, update the affected
     * forms with their respective new viewstate values
     *
     */
    processViewState(node: XMLQuery): boolean {
        if( this.isViewStateNode(node)) {
            let viewStateValue = node.textContent();
            this.internalContext.assign(Const.APPLIED_VST, node.id.value).value = new ViewState(node.id.value, viewStateValue);
            return true;
        }
        return false;
    }

    globalEval() {
        let updateElems = new DQ(...this.internalContext.getIf(Const.UPDATE_ELEMS).value);
        updateElems.runCss();
        updateElems.runScripts();
    }

    fixViewStates() {
        Stream.ofAssoc<ViewState>(this.internalContext.getIf(Const.APPLIED_VST).orElse({}).value)
            .each((item: Array<any>) => {
                let key = item[0];
                let value: ViewState =item[1];
                let nameSpace = DQ.byId(value.nameSpace).orElse(document.body);
                let affectedForms = nameSpace.byTagName(Const.TAG_FORM);
                let affectedForms2 = nameSpace.filter(item => item.tagName.orElse(Const.EMPTY_STR).value.toLowerCase() == Const.TAG_FORM);


                this.appendViewStateToForms(new DomQuery(affectedForms, affectedForms2), value.value);
            });
    }

    done() {
        let eventData = EventData.createFromRequest(this.request.value, this.externalContext, Const.SUCCESS);

        //because some frameworks might decorate them over the context in the response
        let eventHandler = this.externalContext.getIf(Const.ON_EVENT).orElse(this.internalContext.getIf(Const.ON_EVENT).value).orElse(Const.EMPTY_FUNC).value;
        Implementation.sendEvent(eventData,  eventHandler);
    }


    private isAllFormResolution(context: Config) {
        return getLocalOrGlobalConfig(context, "no_portlet_env", false);
    }

    private appendViewStateToForms(forms: DQ, viewState: string) {
        forms.each((form: DQ) => {
            let viewStateElems = form.querySelectorAll(Const.SEL_VIEWSTATE_ELEM)
                .orElseLazy(() => this.newViewStateElement(form));

            viewStateElems.attr("value").value = viewState;
        });
    }

    /**
     * Helper to Create a new JSF ViewState Element
     *
     * @param parent, the parent node to attach the viewstate element to
     * (usually a form node)
     */
    private newViewStateElement(parent: DQ): DQ {
        let newViewState = DQ.fromMarkup(Const.HTML_VIEWSTATE);
        newViewState.appendTo(parent);
        return newViewState;
    }

    /**
     * Stores certain aspects of the dom for later post processing
     *
     * @param updateForms the update forms which should receive standardized internal jsf data
     * @param toBeEvaled the resulting elements which should be evaled
     */
    private storeForPostProcessing(updateForms: DQ, toBeEvaled: DQ) {
        this.storeForUpdate(updateForms);
        this.storeForEval(toBeEvaled);
    }

    private storeForUpdate(updateForms: DQ) {
        this.internalContext.assign(Const.UPDATE_FORMS).value.push(updateForms);
    }

    private storeForEval(toBeEvaled: DQ) {
        this.internalContext.assign(Const.UPDATE_ELEMS).value.push(toBeEvaled);
    }

    private isViewStateNode(node: XMLQuery) {
        let separatorchar = (<any>window).jsf.separatorchar;
        return "undefined" != typeof node?.id?.value && ( node?.id?.value == Const.P_VIEWSTATE ||
            node?.id?.value?.indexOf([separatorchar, Const.P_VIEWSTATE].join(Const.EMPTY_STR)) != -1 ||
            node?.id?.value?.indexOf([Const.P_VIEWSTATE, separatorchar].join(Const.EMPTY_STR)) != -1 );
    }

}