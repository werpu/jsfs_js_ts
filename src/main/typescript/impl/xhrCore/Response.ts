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


import {Monadish} from "../util/Monad";
import Config = Monadish.Config;
import {Lang} from "../util/Lang";
import {DomQuery, XMLQuery} from "../util/Nodes";
import {Impl} from "../Impl";
export class Response {

    /*partial response types*/
    static RESP_PARTIAL         = "partial-response";
    static RESP_TYPE_ERROR      = "error";
    static RESP_TYPE_REDIRECT   = "redirect";
    static RESP_TYPE_CHANGES    = "changes";

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
        let ctx = Config.fromNullable(context);
        let _Impl = Impl.Implementation.instance;

        ctx.apply(Response.MF_INTERNAL, Response.UPDATE_FORMS).value = [];
        ctx.apply(Response.MF_INTERNAL, Response.UPDATE_ELEMS).value = [];

        if (req.getIf("responseXML").isAbsent()) {
            throw Lang.instance.makeException(new Error(), _Impl.EMPTY_RESPONSE, _Impl.EMPTY_RESPONSE, "Response", "processResponse", "");
        }
        let responseXML = new XMLQuery(req.getIf("responseXML").value);

        if (responseXML.isXMLParserError()) {
            throw Response.raiseError(new Error(), responseXML.parserErrorText(""), "processResponse");
        }

        var partial = responseXML.getIf(Response.RESP_PARTIAL);
        if (partial.isAbsent()) {
            throw Response.raiseError(new Error(), "Partial response not set", "processResponse");
        }

        partial.getIf([Response.CMD_ERROR, Response.CMD_REDIRECT, Response.CMD_CHANGES].join(",")).eachNode(
            (node: XMLQuery) => {
                switch ((<any>node.value).tagName) {
                    case Response.CMD_ERROR:
                        Response.processError(request, ctx, node);
                        break;
                    case Response.CMD_REDIRECT:
                        Response.processRedirect(request, ctx, node);
                        break;
                    case Response.CMD_CHANGES:
                        Response.processChanges(request, ctx, node);
                        break;
                }
            }
        );

        Response.fixViewStates(ctx);
        Response.eval(ctx);

        //TODO replace this with an api call
        //Impl.Implementation.instance.sendEvent(request, context, _Impl.SUCCESS);
    }

    private static eval(context: Config) {
        let updateelems = new DomQuery(context.getIf(Response.MF_INTERNAL, Response.UPDATE_ELEMS).value);
        updateelems.runCss();
        updateelems.runScripts();
    }
    
    private static fixViewStates(context: Config) {
        if(context.getIf(Response.MF_INTERNAL, "appliedViewState").isAbsent()) {
            return;
        }
        let viewState = context.getIf(Response.MF_INTERNAL, "appliedViewState").value;
        if(Lang.instance.getLocalOrGlobalConfig(context, "no_portlet_env", false)) {
            let forms = DomQuery.querySelectorAll("form");
            this.appendViewStateToForms(forms, viewState);
        } else {
            let updateforms = new DomQuery(context.getIf(Response.MF_INTERNAL, Response.UPDATE_FORMS).value);
            this.appendViewStateToForms(updateforms, viewState);
        }
    }

    private static appendViewStateToForms(forms: DomQuery, viewState: any) {
        forms.eachNode((form: DomQuery) => {
            let viewStates = forms.querySelectorAll("[name='" + Response.P_VIEWSTATE + "']");
            if (viewStates.isAbsent()) {
                let newViewState = DomQuery.fromMarkup(
                    ["<input type='hidden'", "id='", Response.P_VIEWSTATE, "' name='", Response.P_VIEWSTATE, "' value='", viewState, "' />"].join("")
                );
                form.appendTo(newViewState);
            } else {
                viewStates.setAttribute("value", viewState);
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
        if (node.getAttribute("url").isAbsent()) {
            throw Response.raiseError(new Error(), Lang.instance.getMessage("ERR_RED_URL", null, "_AjaxResponse.processRedirect"), "processRedirect");
        }
        let redirectUrl = Lang.instance.trim(node.getAttribute("url").value);
        if (redirectUrl == "") {
            return false;
        }
        (<any>window).location = redirectUrl;
        return true;
    }

    private static processChanges(request: XMLHttpRequest, context: Config, node: XMLQuery): boolean {
        node.getIf([Response.CMD_UPDATE, Response.CMD_EVAL, Response.CMD_INSERT, Response.CMD_DELETE, Response.CMD_ATTRIBUTES, Response.CMD_EXTENSION].join(",")).eachNode(
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
        let id = node.getAttribute("id");
        let elem = DomQuery.querySelectorAll("#"+id.value);
        node.byTagName("attribute").eachNode((item: XMLQuery) => {
            elem.setAttribute(item.getAttribute("name").value, item.getAttribute("value").value);
        });
    }

    private static processUpdate(request: XMLHttpRequest, context: Config, node: XMLQuery) {
        if (node.getAttribute("id").value == Response.P_VIEWSTATE) {
            context.apply(Response.MF_INTERNAL, "appliedViewState").value = node.textContent("");


            let elemId = context.getIf("_mfSourceControlId").presentOrElse(context.getIf("source").isPresent() ? context.getIf("source", "id") : null);
            let sourceFormId = context.getIf(Response.MF_INTERNAL, "_mfSourceFormId");

            let sourceForm = new DomQuery(sourceFormId.isPresent() ? document.forms[sourceFormId.value] : null);

            let elem = DomQuery.querySelectorAll("#" + elemId.value);
            sourceForm = sourceForm.presentOrElse(elem.parents("form"))
                .presentOrElse(elem.querySelectorAll("form"))
                .presentOrElse(DomQuery.querySelectorAll("form"));

            if (sourceForm.isAbsent()) {
                //no source form found is not an error because
                //we might be able to recover one way or the other
                return true;
            } else {
                context.apply(Response.MF_INTERNAL, Response.UPDATE_FORMS).value.push(sourceForm);
            }
        } else {
            let cdataBlock = node.cDATAAsString;
            switch (node.getAttribute("id").value) {
                case Response.P_VIEWROOT :
                    Response.replaceViewRoot(context,XMLQuery.parseXML(cdataBlock.substring(cdataBlock.indexOf("<html"))));
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
        let insertId = node.getAttribute("id");
        let before = node.getAttribute("before");
        let after = node.getAttribute("after");

        let insertNodes = DomQuery.fromMarkup(node.cDATAAsString);

        if(before.isPresent()) {
            DomQuery.querySelectorAll("#"+before.value).insertBefore(insertNodes);
        } else {
            DomQuery.querySelectorAll("#"+after.value).insertAfter(insertNodes);
        }

        context.apply(Response.MF_INTERNAL,Response.UPDATE_ELEMS).value.push(insertNodes);
    }

    private static processDelete(request: XMLHttpRequest, context: Config, node: XMLQuery) {
        let id = node.getAttribute("id");
        DomQuery.querySelectorAll("#"+id.value).delete();
    }


    private static replaceViewRoot(context: Config, shadownResponse: XMLQuery) {

        let head = shadownResponse.byTagName("head");
        let body = shadownResponse.byTagName("body");

        if(head.isPresent()) {
            Response.replaceHead(context, head);
        }
        if(body.isPresent()) {
            Response.replaceBody(context, body);
        }
    }

    private static replaceHead(context: Config, shadowHead: XMLQuery) {
        let shadowHTML = <DomQuery> DomQuery.fromMarkup("<head />").html(shadowHead.getIf("*").toString());
        let oldHead = DomQuery.querySelectorAll("head");

        oldHead.querySelectorAll("script, style, link").delete();
        shadowHTML.runCss();
        shadowHTML.runScripts();
    }

    private static replaceBody(context: Config, shadowBody: XMLQuery) {
        let shadowInnerHTML = shadowBody.getIf("*").toString();

        let resultb = <DomQuery> DomQuery.querySelectorAll("body").html(shadowInnerHTML);
        let sourceFormb = resultb.querySelectorAll("form");
        context.apply(Response.MF_INTERNAL, Response.UPDATE_FORMS).value.push(sourceFormb);
        context.apply(Response.MF_INTERNAL,Response.UPDATE_ELEMS).value.push(resultb);

        resultb.copyAttrs(shadowBody);
    }

    private static updateElement(context: Config, node: XMLQuery, cdataBlock: string) {
        let result = DomQuery.querySelectorAll("#"+node.getAttribute("id").value).outerHTML(cdataBlock);
        let sourceForm = result.parents("form").presentOrElse(result.byTagName("form", true));

        context.apply(Response.MF_INTERNAL, Response.UPDATE_FORMS).value.push(sourceForm);
        context.apply(Response.MF_INTERNAL,Response.UPDATE_ELEMS).value.push(result);
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
        var _Impl = Impl.Implementation.instance;
        var finalTitle = title || _Impl.MALFORMEDXML;
        var finalName = name || _Impl.MALFORMEDXML;
        var finalMessage = message || "";

        return Lang.instance.makeException(error, finalTitle, finalName, "Response", caller || ( ((<any>arguments).caller) ? (<any>arguments).caller.toString() : "_raiseError"), finalMessage);
    }
}