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

/**
 * Resolver for various aspects of the response data
 *
 * stateless because it might be called from various
 * parts of the response classes
 */
export class ResonseDataResolver {

    /**
     * fetches the response XML
     * as XML Query object
     *
     * @param request the request hosting the responseXML
     *
     * Throws an error in case of non existent or wrong xml data
     *
     */
    static resolveResponseXML(request: Config): XMLQuery {
        let ret = new XMLQuery(request.getIf(Const.SEL_RESPONSE_XML).value);
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
    static resolveContexts(context: { [p: string]: any }) {
        /**
         * we split the context apart into the external one and
         * some internal values
         */
        let externalContext = Config.fromNullable(context);
        let internalContext = externalContext.getIf(Const.CTX_PARAM_MF_INTERNAL);

        /**
         * prepare storage for some deferred operations
         */
        internalContext.assign(Const.UPDATE_FORMS).value = [];
        internalContext.assign(Const.UPDATE_ELEMS).value = [];
        return {externalContext, internalContext};
    }

    /**
     * fetches the source element out of our conexts
     *
     * @param context the external context which shpuld host the source id
     * @param internalContext internal passthrough fall back
     *
     */
    static resolveSourceElement(context: Config, internalContext: Config): DQ {
        let elemId = this.resolveSourceElementId(context, internalContext);
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
    static resolveSourceForm(internalContext: Config, elem: DQ): DQ {
        let sourceFormId = internalContext.getIf(Const.CTX_PARAM_SRC_FRM_ID);
        let sourceForm = new DQ(sourceFormId.isPresent() ? document.forms[sourceFormId.value] : null);

        sourceForm = sourceForm.orElse(elem.parents(Const.TAG_FORM))
            .orElse(elem.querySelectorAll(Const.TAG_FORM))
            .orElse(DQ.querySelectorAll(Const.TAG_FORM));

        return sourceForm;
    }


    private static resolveSourceElementId(context: Config, internalContext: Config) {
        //?internal context?? used to be external one
        return internalContext.getIf(Const.CTX_PARAM_SRC_CTL_ID)
            .orElseLazy(() => context.getIf(Const.SOURCE, "id").value);
    }

}