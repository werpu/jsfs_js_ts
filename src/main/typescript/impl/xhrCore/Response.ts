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
    static P_VIEWSTATE = "javax.faces.ViewState";
    static P_VIEWROOT = "javax.faces.ViewRoot";
    static P_VIEWHEAD = "javax.faces.ViewHead";
    static P_VIEWBODY = "javax.faces.ViewBody";

    private static MF_INTERNAL = "_mfInternal";
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
        /**
         * we split the context apart into the external one and
         * some internal values
         */
        let externalCtx = Config.fromNullable(context);
        let internalCtx = externalCtx.getIf(Response.MF_INTERNAL);
        let Impl = Implementation.instance;

        /**
         * prepare storage for some deferred operations
         */
        internalCtx.apply(Response.UPDATE_FORMS).value = [];
        internalCtx.apply(Response.UPDATE_ELEMS).value = [];

        if (req.getIf("responseXML").isAbsent()) {
            throw Lang.instance.makeException(new Error(), Const.EMPTY_RESPONSE, Const.EMPTY_RESPONSE, "Response", "processResponse", "");
        }
        let responseXML: XMLQuery = new XMLQuery(req.getIf("responseXML").value);

        if (responseXML.isXMLParserError()) {
            throw Response.raiseError(new Error(), responseXML.parserErrorText(""), "processResponse");
        }

        let partial = responseXML.getIf(Response.RESP_PARTIAL);
        if (partial.isAbsent()) {
            throw Response.raiseError(new Error(), "Partial response not set", "processResponse");
        }

        partial.each(item => {
            //we cannot do a query selector all
            //directly because we have to
            //fetch the partialId for further processing
            internalCtx.apply(Const.PARTIAL_ID).value = item.id;
            const SUB_TAGS = [Response.CMD_ERROR, Response.CMD_REDIRECT, Response.CMD_CHANGES].join(",");

            //now we can process the main operations
            item.getIf(SUB_TAGS).each((node: XMLQuery) => {
                this.handleMainOperations(node, request, externalCtx);
            });
        });

        //we now process all the deferred operations
        //TODO pass op functions instead of parameters
        //makes more sense

        Response.fixViewStates(externalCtx);
        Response.eval(externalCtx);


    }

    /**
     * handles the main operations on error, redirect, changes
     * extension is not handled since we do not usxe it
     *
     * @param node
     * @param request
     * @param externalCtx
     */
    private static handleMainOperations(node: XMLQuery, request: XMLHttpRequest, externalCtx) {
        switch (node.tagName.value) {
            case Response.CMD_ERROR:
                Response.processError(request, externalCtx, node);
                break;
            case Response.CMD_REDIRECT:
                Response.processRedirect(request, externalCtx, node);
                break;
            case Response.CMD_CHANGES:
                Response.processChanges(request, externalCtx, node);
                break;
        }

    }

    private static eval(context: Config) {
        let updateelems = new DomQuery(context.getIf(Response.MF_INTERNAL, Response.UPDATE_ELEMS).value);
        updateelems.runCss();
        updateelems.runScripts();
    }

    private static fixViewStates(context: Config) {
        if (context.getIf(Response.MF_INTERNAL, "appliedViewState").isAbsent()) {
            return;
        }
        let viewState = context.getIf(Response.MF_INTERNAL, "appliedViewState").value;
        if (Lang.instance.getLocalOrGlobalConfig(context, "no_portlet_env", false)) {
            let forms = DomQuery.querySelectorAll("form");
            this.appendViewStateToForms(forms, viewState);
        } else {
            let updateforms = new DomQuery(context.getIf(Response.MF_INTERNAL, Response.UPDATE_FORMS).value);
            this.appendViewStateToForms(updateforms, viewState);
        }
    }

    private static appendViewStateToForms(forms: DomQuery, viewState: any) {
        forms.each((form: DomQuery) => {
            let viewStates = forms.querySelectorAll("[name='" + Response.P_VIEWSTATE + "']");
            if (viewStates.isAbsent()) {
                let newViewState = DomQuery.fromMarkup(
                    ["<input type='hidden'", "id='", Response.P_VIEWSTATE, "' name='", Response.P_VIEWSTATE, "' value='", viewState, "' />"].join("")
                );
                form.appendTo(newViewState);
            } else {
                viewStates.attr("value").value = viewState;
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
    private static processError(request: XMLHttpRequest, context: Config, node: XMLQuery) {
        /**
         * <error>
         *      <error-name>String</error-name>
         *      <error-message><![CDATA[message]]></error-message>
         * <error>
         */

        let errorName = node.getIf("error-name").textContent("");
        let errorMessage = node.getIf("error-message").cDATAAsString;

        //TODO
        //Impl.Implementation.instance.sendError(request, context, this.attr("impl").SERVER_ERROR, errorName, errorMessage, "Response", "processError");
    }

    private static processRedirect(request: XMLHttpRequest, context: Config, node: XMLQuery) {
        if (node.attr("url").isAbsent()) {
            throw Response.raiseError(new Error(), Lang.instance.getMessage("ERR_RED_URL", null, "_AjaxResponse.processRedirect"), "processRedirect");
        }
        let redirectUrl = Lang.instance.trim(node.attr("url").value);
        if (redirectUrl == "") {
            return false;
        }
        (<any>window).location = redirectUrl;
        return true;
    }

    private static processChanges(request: XMLHttpRequest, context: Config, node: XMLQuery): boolean {
        node.getIf([Response.CMD_UPDATE, Response.CMD_EVAL, Response.CMD_INSERT, Response.CMD_DELETE, Response.CMD_ATTRIBUTES, Response.CMD_EXTENSION].join(",")).each(
            (node: XMLQuery) => {
                switch ((<any>node.value).tagName) {
                    case Response.CMD_UPDATE:
                        Response.processUpdate(request, context, node);
                        break;

                    case Response.CMD_EVAL:
                        DomQuery.globalEval(node.cDATAAsString);
                        break;

                    case Response.CMD_INSERT:
                        Response.processInsert(request, context, node);
                        break;

                    case Response.CMD_DELETE:
                        Response.processDelete(request, context, node);
                        break;

                    case Response.CMD_ATTRIBUTES:
                        Response.processAttributes(request, context, node);
                        break;

                    case Response.CMD_EXTENSION:
                        break;
                }
            }
        );
        return true;
    }

    private static processAttributes(request: XMLHttpRequest, context: Config, node: XMLQuery) {
        let id = node.attr("id");
        let elem = DomQuery.querySelectorAll("#" + id.value);
        node.byTagName("attribute").each((item: XMLQuery) => {
            elem.attr(item.attr("name").value).value = item.attr("value").value;
        });
    }

    private static processUpdate(request: XMLHttpRequest, context: Config, node: XMLQuery) {
        if (node.attr("id").value == Response.P_VIEWSTATE) {
            context.apply(Response.MF_INTERNAL, "appliedViewState").value = node.textContent("");

            let elemId = context.getIf("_mfSourceControlId").orElse(context.getIf("source").isPresent() ? context.getIf("source", "id") : null);
            let sourceFormId = context.getIf(Response.MF_INTERNAL, "_mfSourceFormId");

            let sourceForm = new DomQuery(sourceFormId.isPresent() ? document.forms[sourceFormId.value] : null);

            let elem = DomQuery.querySelectorAll("#" + elemId.value);
            sourceForm = sourceForm.orElse(elem.parents("form"))
                .orElse(elem.querySelectorAll("form"))
                .orElse(DomQuery.querySelectorAll("form"));

            if (sourceForm.isAbsent()) {
                //no source form found is not an error because
                //we might be able to recover one way or the other
                return true;
            } else {
                context.apply(Response.MF_INTERNAL, Response.UPDATE_FORMS).value.push(sourceForm);
            }
        } else {
            let cdataBlock = node.cDATAAsString;
            switch (node.attr("id").value) {
                case Response.P_VIEWROOT :
                    Response.replaceViewRoot(context, XMLQuery.parseXML(cdataBlock.substring(cdataBlock.indexOf("<html"))));
                    break;

                case Response.P_VIEWHEAD:
                    Response.replaceHead(context, XMLQuery.parseXML(cdataBlock));
                    break;

                case Response.P_VIEWBODY:
                    Response.replaceBody(context, XMLQuery.parseXML(cdataBlock));
                    break;

                default://htmlItem replacement
                    Response.updateElement(context, node, cdataBlock);
                    break;

            }
        }
    }

    private static processInsert(request: XMLHttpRequest, context: Config, node: XMLQuery) {
        let insertId = node.attr("id");
        let before = node.attr("before");
        let after = node.attr("after");

        let insertNodes = DomQuery.fromMarkup(node.cDATAAsString);

        if (before.isPresent()) {
            DomQuery.querySelectorAll("#" + before.value).insertBefore(insertNodes);
        } else {
            DomQuery.querySelectorAll("#" + after.value).insertAfter(insertNodes);
        }

        context.apply(Response.MF_INTERNAL, Response.UPDATE_ELEMS).value.push(insertNodes);
    }

    private static processDelete(request: XMLHttpRequest, context: Config, node: XMLQuery) {
        let id = node.attr("id");
        DomQuery.querySelectorAll("#" + id.value).delete();
    }

    private static replaceViewRoot(context: Config, shadownResponse: XMLQuery) {

        let head = new XMLQuery(shadownResponse.byTagName("head"));
        let body = new XMLQuery(shadownResponse.byTagName("body"));

        if (head.isPresent()) {
            Response.replaceHead(context, head);
        }
        if (body.isPresent()) {
            Response.replaceBody(context, body);
        }
    }

    private static replaceHead(context: Config, shadowHead: XMLQuery) {
        let shadowHTML = <DomQuery>DomQuery.fromMarkup("<head />").html(shadowHead.getIf("*").toString());
        let oldHead = DomQuery.querySelectorAll("head");

        oldHead.querySelectorAll("script, style, link").delete();
        shadowHTML.runCss();
        shadowHTML.runScripts();
    }

    private static replaceBody(context: Config, shadowBody: XMLQuery) {
        let shadowInnerHTML = shadowBody.getIf("*").toString();

        let resultb = <DomQuery>DomQuery.querySelectorAll("body").html(shadowInnerHTML);
        let sourceFormb = resultb.querySelectorAll("form");
        context.apply(Response.MF_INTERNAL, Response.UPDATE_FORMS).value.push(sourceFormb);
        context.apply(Response.MF_INTERNAL, Response.UPDATE_ELEMS).value.push(resultb);

        resultb.copyAttrs(shadowBody);
    }

    private static updateElement(context: Config, node: XMLQuery, cdataBlock: string) {
        let result = DomQuery.querySelectorAll("#" + node.attr("id").value).outerHTML(cdataBlock);
        let sourceForm = result.parents("form").orElse(result.byTagName("form", true));

        context.apply(Response.MF_INTERNAL, Response.UPDATE_FORMS).value.push(sourceForm);
        context.apply(Response.MF_INTERNAL, Response.UPDATE_ELEMS).value.push(result);
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