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

import {Lang} from "../util/Lang";

import {Config, Optional} from "../../_ext/monadish/Monad";
import {XMLQuery} from "../../_ext/monadish/XmlQuery";
import {DomQuery} from "../../_ext/monadish/DomQuery";
import {Implementation} from "../Impl";
import {Const} from "../core/Const";

export class Response {

    /*partial response types*/
    static RESP_PARTIAL = "partial-response";
    static RESP_TYPE_ERROR = "error";
    static RESP_TYPE_REDIRECT = "redirect";
    static RESP_TYPE_CHANGES = "changes";

    /*partial commands*/
    static CMD_CHANGES = "changes";
    static CMD_UPDATE = "update";
    static CMD_DELETE = "delete";
    static CMD_INSERT = "insert";
    static CMD_EVAL = "eval";
    static CMD_ERROR = "error";
    static CMD_ATTRIBUTES = "attributes";
    static CMD_EXTENSION = "extension";
    static CMD_REDIRECT = "redirect";

    /*other constants*/

    private static UPDATE_FORMS = "_updateForms";
    private static UPDATE_ELEMS = "_updateElems";

    /**
     * uses response to start Html element replacement
     *
     * @param {XMLHttpRequest} request (xhrRequest) - xhr request object
     * @param {[key: string]: any} context (Map) - AJAX context
     *
     * A special handling has to be added to the update cycle
     * according to the JSDoc specs if the CDATA block contains html tags the outer rim must be stripped
     * if the CDATA block contains a head section the document head must be replaced
     * and if the CDATA block contains a body section the document body must be replaced!
     *
     */
    static processResponse(request: XMLHttpRequest, context: { [key: string]: any }) {

        let req = Config.fromNullable(request);
        let {externalContext, internalContext} = this.resolveContexts(context);
        let responseXML: XMLQuery = this.resolveResponseXML(req);

        //we now process the partial tags, or in none given raise an error
        responseXML.querySelectorAll(this.RESP_PARTIAL)
            .each(item => this.processPartialTag(item, request, externalContext, internalContext))
            .orElseLazy(() => {
                throw this.raiseError(new Error(), Const.ERR_NO_PARTIAL_RESPONSE, Const.PHASE_PROCESS_RESPONSE);
            });

        //we now process the viewstates and the evals deferred
        //the reason for this is that often it is better
        //to wait until the document has caught up before
        //doing any evals even on embedded scripts
        this.fixViewStates(externalContext, internalContext);
        this.eval(externalContext, internalContext);
    }


    /**
     *
     * highest node partia-response from there the main operations are triggered
     */
    private static processPartialTag(item, request: XMLHttpRequest, externalContext, internalContext) {

        internalContext.apply(Const.PARTIAL_ID).value = item.id;
        const SUB_TAGS = [this.CMD_ERROR, this.CMD_REDIRECT, this.CMD_CHANGES].join(",");

        //now we can process the main operations
        item.getIf(SUB_TAGS).each((node: XMLQuery) => {
            switch (node.tagName.value) {
                case this.CMD_ERROR:
                    this.processErrorTag(request, externalContext, internalContext, node);
                    break;
                case this.CMD_REDIRECT:
                    this.processRedirectTag(request, externalContext, internalContext, node);
                    break;
                case this.CMD_CHANGES:
                    this.processChangesTag(request, externalContext, internalContext, node);
                    break;
            }
        });
    }

    /**
     * processes an incoming error from the response
     * which is hosted under the &lt;error&gt; tag
     * @param request the current request
     * @param context the contect object
     * @param node the node in the xml hosting the error message
     */
    private static processErrorTag(request: XMLHttpRequest, context: Config, internalContext: Config, node: XMLQuery) {
        /**
         * <error>
         *      <error-name>String</error-name>
         *      <error-message><![CDATA[message]]></error-message>
         * <error>
         */

        let errorName = node.getIf("error-name").textContent("");
        let errorMessage = node.getIf("error-message").cDATAAsString;

        let errorData = Implementation.instance.createErrorData(request, context, Const.SERVER_ERROR, errorName, errorMessage, "Response", "processError");
        Implementation.instance.sendError(errorData);
    }

    /**
     * process the redirect operation
     *
     * @param request
     * @param context
     * @param internalContext
     * @param node
     */
    private static processRedirectTag(request: XMLHttpRequest, context: Config, internalContext: Config, node: XMLQuery) {
        let ATTR_URL = "url";
        if (node.attr(ATTR_URL).isAbsent()) {
            throw this.raiseError(new Error(), Lang.instance.getMessage("ERR_RED_URL", null, "_Ajaxthis.processRedirect"), "processRedirect");
        }
        let redirectUrl = Lang.instance.trim(node.attr(ATTR_URL).value);
        if (redirectUrl == "") {
            return false;
        }
        (<any>window).location = redirectUrl;
        return true;
    }

    /**
     * next level changes tag
     *
     * @param request
     * @param context
     * @param internalContext
     * @param node
     */
    private static processChangesTag(request: XMLHttpRequest, context: Config, internalContext: Config, node: XMLQuery): boolean {
        const ALLOWED_TAGS = [this.CMD_UPDATE, this.CMD_EVAL, this.CMD_INSERT, this.CMD_DELETE, this.CMD_ATTRIBUTES, this.CMD_EXTENSION].join(",");
        node.getIf(ALLOWED_TAGS).each(
            (node: XMLQuery) => {
                switch (node.tagName.value) {
                    case this.CMD_UPDATE:
                        this.processUpdateTag(request, context, internalContext, node);
                        break;

                    case this.CMD_EVAL:
                        this.processEvalTag(node);
                        break;

                    case this.CMD_INSERT:
                        this.processInsertTag(request, context, internalContext, node);
                        break;

                    case this.CMD_DELETE:
                        this.processDeleteTag(request, context, internalContext, node);
                        break;

                    case this.CMD_ATTRIBUTES:
                        this.processAttributesTag(request, context, internalContext, node);
                        break;

                    case this.CMD_EXTENSION:
                        break;
                }
            }
        );
        return true;
    }

    private static processEvalTag(node: XMLQuery) {
        DomQuery.globalEval(node.cDATAAsString);
    }

    private static processAttributesTag(request: XMLHttpRequest, context: Config, internalContext: Config, node: XMLQuery) {
        let elem = DomQuery.byId(node.id.value);

        node.byTagName("attribute").each((item: XMLQuery) => {
            elem.attr(item.attr("name").value).value = item.attr("value").value;
        });
    }

    private static processUpdateTag(request: XMLHttpRequest, context: Config, internalContext: Config, node: XMLQuery) {
        if (node.id.value == Const.P_VIEWSTATE) {
            this.handleViewState(context, internalContext, node);
        } else {
            this.handleElementUpdate(node, context, internalContext);
        }
    }

    private static handleElementUpdate(node: XMLQuery, context: Config, internalContext: Config) {
        let cdataBlock = node.cDATAAsString;
        switch (node.id.value) {
            case Const.P_VIEWROOT :
                this.replaceViewRoot(context, internalContext, XMLQuery.parseXML(cdataBlock.substring(cdataBlock.indexOf("<html"))));
                break;

            case Const.P_VIEWHEAD:
                this.replaceHead(context, internalContext, XMLQuery.parseXML(cdataBlock));
                break;

            case Const.P_VIEWBODY:
                this.replaceBody(context, internalContext, XMLQuery.parseXML(cdataBlock));
                break;

            default://htmlItem replacement
                this.updateElement(context, internalContext, node, cdataBlock);
                break;

        }
    }

    private static handleViewState(context: Config, internalContext: Config, node: XMLQuery) {
        internalContext.apply("appliedViewState").value = node.textContent("");

        let elem = this.resolveSourceElement(context, internalContext);
        let sourceForm = this.resolveSourceForm(internalContext, elem);

        if (sourceForm.isPresent()) {
            internalContext.apply(this.UPDATE_FORMS).value.push(sourceForm);
        }
        //no source form found is not an error because
        //we might be able to recover one way or the other
        //TODO issue a warning for the no source form case
    }

    private static eval(context: Config, internalContext: Config) {
        let updateelems = new DomQuery(internalContext.getIf(this.UPDATE_ELEMS).value);
        updateelems.runCss();
        updateelems.runScripts();
    }

    private static fixViewStates(context: Config, internalContext: Config) {
        if (internalContext.getIf("appliedViewState").isAbsent()) {
            return;
        }
        let viewState = internalContext.getIf("appliedViewState").value;
        if (this.isAllFormResolution(context)) {
            let forms = DomQuery.querySelectorAll(Const.TAG_FORM);
            this.appendViewStateToForms(forms, viewState);
        } else {
            let updateforms = new DomQuery(internalContext.getIf(this.UPDATE_FORMS).value);
            this.appendViewStateToForms(updateforms, viewState);
        }
    }

    private static isAllFormResolution(context: Config) {
        return Lang.instance.getLocalOrGlobalConfig(context, "no_portlet_env", false);
    }

    private static appendViewStateToForms(forms: DomQuery, viewState: string) {
        forms.each((form: DomQuery) => {
            let viewStateElems = form.querySelectorAll(Const.SEL_VIEWSTATE_ELEM)
                .orElseLazy(() => this.newViewStateElement(form));

            viewStateElems.attr("value").value = viewState;
        });
    }


    private static resolveResponseXML(req) {
        let ret = new XMLQuery(req.getIf(Const.SEL_RESPONSE_XML)
            .orElseLazy(this.raiseResponseXMLErr).value);
        this.assertParserError(ret);
        return ret;
    }

    private static resolveContexts(context: { [p: string]: any }) {
        /**
         * we split the context apart into the external one and
         * some internal values
         */
        let externalContext = Config.fromNullable(context);
        let internalContext = externalContext.getIf(Const.CTX_PARAM_MF_INTERNAL);

        /**
         * prepare storage for some deferred operations
         */
        internalContext.apply(this.UPDATE_FORMS).value = [];
        internalContext.apply(this.UPDATE_ELEMS).value = [];
        return {externalContext, internalContext};
    }


    /**
     * Helper to Create a new JSF ViewState Element
     *
     * @param parent, the parent node to attach the viewstate element to
     * (usually a form node)
     */
    private static newViewStateElement(parent: DomQuery): DomQuery {
        let newViewState = DomQuery.fromMarkup(
            ["<input type='hidden'", "id='", Const.P_VIEWSTATE, "' name='", Const.P_VIEWSTATE, "' value='' />"].join("")
        );
        newViewState.appendTo(parent);
        return newViewState;
    }

    private static resolveSourceElement(context: Config, internalContext: Config) {
        let elemId = this.resolveSourceElementId(context, internalContext);
        let elem = DomQuery.byId(elemId.value);
        return elem;
    }

    private static resolveSourceForm(internalContext: Config, elem: DomQuery) {
        let sourceFormId = internalContext.getIf(Const.CTX_PARAM_SRC_FRM_ID);
        let sourceForm = new DomQuery(sourceFormId.isPresent() ? document.forms[sourceFormId.value] : null);
        sourceForm = sourceForm.orElse(elem.parents(Const.TAG_FORM))
            .orElse(elem.querySelectorAll(Const.TAG_FORM))
            .orElse(DomQuery.querySelectorAll(Const.TAG_FORM));
        return sourceForm;
    }

    private static resolveSourceElementId(context: Config, internalContext: Config) {
        //?internal context?? used to be external one
        return internalContext.getIf(Const.CTX_PARAM_SRC_CTL_ID)
            .orElseLazy(() => context.getIf(Const.SOURCE, "id").value);
    }

    private static processInsertTag(request: XMLHttpRequest, context: Config, internalContext: Config, node: XMLQuery) {
        //let insertId = node.id; //not used atm

        let before = node.attr(Const.TAG_BEFORE);
        let after = node.attr(Const.TAG_AFTER);

        let insertNodes = DomQuery.fromMarkup(node.cDATAAsString);

        if (before.isPresent()) {
            DomQuery.byId(before.value).insertBefore(insertNodes);
        } else {
            DomQuery.byId(after.value).insertAfter(insertNodes);
        }

        internalContext.apply(this.UPDATE_ELEMS).value.push(insertNodes);
    }

    private static processDeleteTag(request: XMLHttpRequest, context: Config, internalContext: Config, node: XMLQuery) {
        DomQuery.byId(node.id.value).delete();
    }

    private static replaceViewRoot(context: Config, internalContext: Config, shadownResponse: XMLQuery) {

        let head = new XMLQuery(shadownResponse.byTagName(Const.TAG_HEAD));
        let body = new XMLQuery(shadownResponse.byTagName(Const.TAG_BODY));

        if (head.isPresent()) {
            this.replaceHead(context, internalContext, head);
        }
        if (body.isPresent()) {
            this.replaceBody(context, internalContext, body);
        }
    }

    private static replaceHead(context: Config, internalContext: Config, shadowHead: XMLQuery) {
        let shadowHTML = <DomQuery>DomQuery.fromMarkup("<head />").html(shadowHead.getIf("*").toString());
        let oldHead = DomQuery.querySelectorAll(Const.TAG_HEAD);

        oldHead.querySelectorAll("script, style, link").delete();
        shadowHTML.runCss();
        shadowHTML.runScripts();
    }

    private static replaceBody(context: Config, internalContext: Config, shadowBody: XMLQuery) {
        let shadowInnerHTML = shadowBody.getIf("*").toString();

        let resultb = <DomQuery>DomQuery.querySelectorAll(Const.TAG_BODY).html(shadowInnerHTML);
        let sourceFormb = resultb.querySelectorAll(Const.TAG_FORM);

        internalContext.apply(this.UPDATE_FORMS).value.push(sourceFormb);
        internalContext.apply(this.UPDATE_ELEMS).value.push(resultb);

        resultb.copyAttrs(shadowBody);
    }

    private static updateElement(context: Config, internalContext: Config, node: XMLQuery, cdataBlock: string) {
        let result = DomQuery.byId(node.attr("id").value).outerHTML(cdataBlock);
        let sourceForm = result.parents(Const.TAG_FORM).orElse(result.byTagName(Const.TAG_FORM, true));

        internalContext.apply(this.UPDATE_FORMS).value.push(sourceForm);
        internalContext.apply(this.UPDATE_ELEMS).value.push(result);
    }


    private static assertParserError(responseXML: XMLQuery) {
        if (responseXML.isXMLParserError()) {
            throw this.raiseError(new Error(), responseXML.parserErrorText(""), Const.PHASE_PROCESS_RESPONSE);
        }
    }

    private static raiseResponseXMLErr() {
        throw Lang.instance.makeException(new Error(),
            Const.EMPTY_RESPONSE, Const.EMPTY_RESPONSE,
            "Response", Const.PHASE_PROCESS_RESPONSE, "");
    }

    /**
     * internal helper which raises an error in the
     * format we need for further processing
     *
     * @param message the message
     * @param title the title of the error (optional)
     * @param name the name of the error (optional)
     */
    private static raiseError(error: any, message: string, caller ?: string, title ?: string, name ?: string) {
        let _Impl = Implementation.instance;
        let finalTitle = title || Const.MALFORMEDXML;
        let finalName = name || Const.MALFORMEDXML;
        let finalMessage = message || "";

        return Lang.instance.makeException(error, finalTitle, finalName, "Response", caller || (((<any>arguments).caller) ? (<any>arguments).caller.toString() : "_raiseError"), finalMessage);
    }
}