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

import {Config, XMLQuery} from "../../ext/monadish";
import {Const} from "../core/Const";
import {Assertions} from "../util/Assertions";
import {DQ} from "../../ext/monadish/DomQuery";
import {IConfig, IOptional} from "../../ext/monadish/Types";
import CTX_PARAM_SRC_FRM_ID = Const.CTX_PARAM_SRC_FRM_ID;
import TAG_FORM = Const.TAG_FORM;
import CTX_PARAM_SRC_CTL_ID = Const.CTX_PARAM_SRC_CTL_ID;
import SOURCE = Const.SOURCE;
import CTX_PARAM_MF_INTERNAL = Const.CTX_PARAM_MF_INTERNAL;
import UPDATE_FORMS = Const.UPDATE_FORMS;
import UPDATE_ELEMS = Const.UPDATE_ELEMS;
import SEL_RESPONSE_XML = Const.SEL_RESPONSE_XML;

/**
 * Resolver for various aspects of the response data
 *
 * stateless because it might be called from various
 * parts of the response classes
 */
export module ResonseDataResolver {

    /**
     * fetches the response XML
     * as XML Query object
     *
     * @param request the request hosting the responseXML
     *
     * Throws an error in case of non existent or wrong xml data
     *
     */
    export function resolveResponseXML(request: IConfig): XMLQuery {
        let ret = new XMLQuery(request.getIf(SEL_RESPONSE_XML).value);
        Assertions.assertValidXMLResponse(ret);

        return ret;
    }

    /**
     * Splits the incoming passthrough context apart
     * in an internal and an external nomalized context
     * the internal one is just for our internal processing
     *
     * @param context the root context as associative array
     */
    export function resolveContexts(context: { [p: string]: any }): any {
        /**
         * we split the context apart into the external one and
         * some internal values
         */
        let externalContext = Config.fromNullable(context);
        let internalContext = externalContext.getIf(CTX_PARAM_MF_INTERNAL);

        /**
         * prepare storage for some deferred operations
         */
        internalContext.assign(UPDATE_FORMS).value = [];
        internalContext.assign(UPDATE_ELEMS).value = [];
        return {externalContext, internalContext};
    }

    /**
     * fetches the source element out of our conexts
     *
     * @param context the external context which shpuld host the source id
     * @param internalContext internal passthrough fall back
     *
     */
    export function resolveSourceElement(context: IConfig, internalContext: IConfig): DQ {
        let elemId = resolveSourceElementId(context, internalContext);
        let elem = DQ.byId(elemId.value);
        return elem;
    }

    /**
     * fetches the source form if it still exists
     * also embedded forms and parent forms are taken into consideration
     * as fallbacks
     *
     * @param internalContext
     * @param elem
     */
    export function resolveSourceForm(internalContext: IConfig, elem: DQ): DQ {
        let sourceFormId = internalContext.getIf(CTX_PARAM_SRC_FRM_ID);
        let sourceForm = new DQ(sourceFormId.isPresent() ? document.forms[sourceFormId.value] : null);

        sourceForm = sourceForm.orElse(elem.parents(TAG_FORM))
            .orElse(elem.querySelectorAll(TAG_FORM))
            .orElse(DQ.querySelectorAll(TAG_FORM));

        return sourceForm;
    }


    function resolveSourceElementId(context: IConfig, internalContext: IConfig): IOptional<string> {
        //?internal context?? used to be external one
        return internalContext.getIf(CTX_PARAM_SRC_CTL_ID)
            .orElseLazy(() => context.getIf(SOURCE, "id").value);
    }

}