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

import {Config} from "../../_ext/monadish/Monad";
import {XMLQuery} from "../../_ext/monadish/XmlQuery";
import {Const} from "../core/Const";
import {ResponseProcessor} from "./ResponseProcessor";
import {ResonseDataResolver} from "./ResonseDataResolver";

export class Response {

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
        let {externalContext, internalContext} = ResonseDataResolver.resolveContexts(context);
        let responseXML: XMLQuery = ResonseDataResolver.resolveResponseXML(req);

        //we now process the partial tags, or in none given raise an error
        responseXML.querySelectorAll(Const.RESP_PARTIAL)
            .each(item => this.processPartialTag(item, request, externalContext, internalContext));

        //we now process the viewstates and the evals deferred
        //the reason for this is that often it is better
        //to wait until the document has caught up before
        //doing any evals even on embedded scripts
        ResponseProcessor.fixViewStates(externalContext, internalContext);
        ResponseProcessor.globalEval(externalContext, internalContext);
    }

    /**
     *
     * highest node partia-response from there the main operations are triggered
     */
    private static processPartialTag(item, request: XMLHttpRequest, externalContext, internalContext) {

        internalContext.apply(Const.PARTIAL_ID).value = item.id;
        const SEL_SUB_TAGS = [Const.CMD_ERROR, Const.CMD_REDIRECT, Const.CMD_CHANGES].join(",");

        //now we can process the main operations
        item.getIf(SEL_SUB_TAGS).each((node: XMLQuery) => {
            switch (node.tagName.value) {
                case Const.CMD_ERROR:
                    ResponseProcessor.processError(request, externalContext, internalContext, node);
                    break;
                case Const.CMD_REDIRECT:
                    ResponseProcessor.processRedirect(request, externalContext, internalContext, node);
                    break;
                case Const.CMD_CHANGES:
                    this.processChangesTag(request, externalContext, internalContext, node);
                    break;
            }
        });
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
        const ALLOWED_TAGS = [Const.CMD_UPDATE, Const.CMD_EVAL, Const.CMD_INSERT, Const.CMD_DELETE, Const.CMD_ATTRIBUTES, Const.CMD_EXTENSION].join(",");
        node.getIf(ALLOWED_TAGS).each(
            (node: XMLQuery) => {
                switch (node.tagName.value) {
                    case Const.CMD_UPDATE:
                        this.processUpdateTag(request, context, internalContext, node);
                        break;

                    case Const.CMD_EVAL:
                        ResponseProcessor.processEvalTag(node);
                        break;

                    case Const.CMD_INSERT:
                        ResponseProcessor.processInsert(request, context, internalContext, node);
                        break;

                    case Const.CMD_DELETE:
                        ResponseProcessor.processDeleteTag(request, context, internalContext, node);
                        break;

                    case Const.CMD_ATTRIBUTES:
                        ResponseProcessor.processAttributes(request, context, internalContext, node);
                        break;

                    case Const.CMD_EXTENSION:
                        break;
                }
            }
        );
        return true;
    }

    /**
     * branch tag update.. drill further down into the updates
     * special case viewstate in that case it is a leaf
     * and the viewstate must be processed
     *
     * @param request
     * @param context
     * @param internalContext
     * @param node
     */
    private static processUpdateTag(request: XMLHttpRequest, context: Config, internalContext: Config, node: XMLQuery) {
        if (node.id.value == Const.P_VIEWSTATE) {
            ResponseProcessor.processViewState(context, internalContext, node);
        } else {
            //branch case we need to drill down further
            this.handleElementUpdate(node, context, internalContext);
        }
    }

    /**
     * element update
     * @param node
     * @param context
     * @param internalContext
     */
    private static handleElementUpdate(node: XMLQuery, context: Config, internalContext: Config) {
        let cdataBlock = node.cDATAAsString;
        switch (node.id.value) {
            case Const.P_VIEWROOT :
                ResponseProcessor.replaceViewRoot(context, internalContext, XMLQuery.parseXML(cdataBlock.substring(cdataBlock.indexOf("<html"))));
                break;

            case Const.P_VIEWHEAD:
                ResponseProcessor.replaceHead(context, internalContext, XMLQuery.parseXML(cdataBlock));
                break;

            case Const.P_VIEWBODY:
                ResponseProcessor.replaceBody(context, internalContext, XMLQuery.parseXML(cdataBlock));
                break;

            default://htmlItem replacement
                ResponseProcessor.processUpdateElem(context, internalContext, node, cdataBlock);
                break;

        }
    }
}