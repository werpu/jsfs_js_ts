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

import {Config, DomQuery, Lang, XMLQuery} from "../../ext/monadish";
import {Const} from "../core/Const";
import {Implementation} from "../AjaxImpl";
import {Assertions} from "../util/Assertions";

import {ResonseDataResolver} from "./ResonseDataResolver";
import {IResponseProcessor} from "./IResponseProcessor";
import {ErrorData} from "./ErrorData";
import {DQ} from "../../ext/monadish/DomQuery";
import trim = Lang.trim;
import {ExtLang} from "../util/Lang";
import getLocalOrGlobalConfig = ExtLang.getLocalOrGlobalConfig;
import TAG_HEAD = Const.TAG_HEAD;
import SEL_SCRIPTS_STYLES = Const.SEL_SCRIPTS_STYLES;
import TAG_BODY = Const.TAG_BODY;
import TAG_FORM = Const.TAG_FORM;
import SOURCE = Const.SOURCE;
import ERROR_NAME = Const.ERROR_NAME;
import ERROR_MESSAGE = Const.ERROR_MESSAGE;
import P_PARTIAL_SOURCE = Const.P_PARTIAL_SOURCE;
import RESPONSE_XML = Const.RESPONSE_XML;

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
        let shadowHead = shadowDocument.querySelectorAll(TAG_HEAD);
        if (!shadowHead.isPresent()) {
            return;
        }
        let shadowInnerHTML: string = <string>shadowHead.html().value;
        let oldHead = DQ.querySelectorAll(TAG_HEAD);

        //delete all to avoid script and style overlays
        oldHead.querySelectorAll(SEL_SCRIPTS_STYLES).delete();

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

        let shadowBody = shadowDocument.querySelectorAll(TAG_BODY);
        if (!shadowBody.isPresent()) {
            return;
        }

        let shadowInnerHTML: string = <string>shadowBody.html().value;

        let resultingBody = <DQ>DQ.querySelectorAll(TAG_BODY).html(shadowInnerHTML);
        let updateForms = resultingBody.querySelectorAll(TAG_FORM);

        resultingBody.copyAttrs(shadowBody);

        this.storeForPostProcessing(updateForms, resultingBody);
    }

    /**
     * Leaf Tag eval... process whatever is in the evals cdata block
     *
     * @param node
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
        mergedErrorData.assign(SOURCE).value = this.externalContext.getIf(P_PARTIAL_SOURCE).get(0).value;
        mergedErrorData.assign(ERROR_NAME).value = node.getIf(ERROR_NAME).textContent("");
        mergedErrorData.assign(ERROR_MESSAGE).value = node.getIf(ERROR_MESSAGE).cDATAAsString;

        let hasResponseXML = this.internalContext.get(RESPONSE_XML).isPresent();
        mergedErrorData.assignIf(hasResponseXML, RESPONSE_XML).value = this.internalContext.getIf(RESPONSE_XML).value.get(0).value;

        let errorData = ErrorData.fromServerError(mergedErrorData);

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
        if (redirectUrl != "") {
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
        let result = DQ.byId(node.id.value).outerHTML(cdataBlock);
        let sourceForm = result.parents(Const.TAG_FORM).orElse(result.byTagName(Const.TAG_FORM, true));

        this.storeForPostProcessing(sourceForm, result);
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

        node.byTagName("attribute").each((item: XMLQuery) => {
            elem.attr(item.attr("name").value).value = item.attr("value").value;
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
            DQ.byId(before.value).insertBefore(insertNodes);
        }
        if (after.isPresent()) {
            DQ.byId(after.value).insertAfter(insertNodes);
        }

        this.internalContext.assign(Const.UPDATE_ELEMS).value.push(insertNodes);
    }

    /**
     * process the viewState update, update the affected
     * forms with their respective new viewstate values
     *
     */
    processViewState(node: XMLQuery) {
        this.internalContext.assign("appliedViewState").value = node.textContent("");

        let elem = ResonseDataResolver.resolveSourceElement(this.externalContext, this.internalContext);
        let sourceForm = ResonseDataResolver.resolveSourceForm(this.internalContext, elem);

        if (sourceForm.isPresent()) {
            this.internalContext.assign(Const.UPDATE_FORMS).value.push(sourceForm);
        } else {
            this.newViewStateElement(sourceForm);
        }
        //no source form found is not an error because
        //we might be able to recover one way or the other
        //TODO issue a warning for the no source form case
    }

    globalEval() {
        let updateElems = new DQ(...this.internalContext.getIf(Const.UPDATE_ELEMS).value);
        updateElems.runCss();
        updateElems.runScripts();
    }

    fixViewStates() {
        if (this.internalContext.getIf("appliedViewState").isAbsent()) {
            return;
        }
        let viewState = this.internalContext.getIf("appliedViewState").value;
        if (this.isAllFormResolution(this.externalContext)) {
            let forms = DQ.querySelectorAll(Const.TAG_FORM);
            this.appendViewStateToForms(forms, viewState);
        } else {
            let updateForms = new DQ(...this.internalContext.getIf(Const.UPDATE_FORMS).value);
            this.appendViewStateToForms(updateForms, viewState);
        }
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
        let newViewState = DQ.fromMarkup(
            ["<input type='hidden'", "id='", Const.P_VIEWSTATE, "' name='", Const.P_VIEWSTATE, "' value='' />"].join("")
        );
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

}