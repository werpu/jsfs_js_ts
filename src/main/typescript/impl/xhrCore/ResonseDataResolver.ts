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

import {Config, DomQuery, XMLQuery} from "../../_ext/monadish";
import {Const} from "../core/Const";
import {Assertions} from "../util/Assertions";

/**
 * Resolver for various aspects of the response data
 *
 * stateless because it might be calleds from various
 * parts of the response classes
 */
export class ResonseDataResolver {

    static resolveResponseXML(request: Config) {
        let ret = new XMLQuery(request.getIf(Const.SEL_RESPONSE_XML).value);
        Assertions.assertValidXMLResponse(ret);

        return ret;
    }

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
        internalContext.apply(Const.UPDATE_FORMS).value = [];
        internalContext.apply(Const.UPDATE_ELEMS).value = [];
        return {externalContext, internalContext};
    }

    static resolveSourceElement(context: Config, internalContext: Config) {
        let elemId = this.resolveSourceElementId(context, internalContext);
        let elem = DomQuery.byId(elemId.value);
        return elem;
    }

    static resolveSourceForm(internalContext: Config, elem: DomQuery) {
        let sourceFormId = internalContext.getIf(Const.CTX_PARAM_SRC_FRM_ID);
        let sourceForm = new DomQuery(sourceFormId.isPresent() ? document.forms[sourceFormId.value] : null);

        sourceForm = sourceForm.orElse(elem.parents(Const.TAG_FORM))
            .orElse(elem.querySelectorAll(Const.TAG_FORM))
            .orElse(DomQuery.querySelectorAll(Const.TAG_FORM));

        return sourceForm;
    }

    static resolveSourceElementId(context: Config, internalContext: Config) {
        //?internal context?? used to be external one
        return internalContext.getIf(Const.CTX_PARAM_SRC_CTL_ID)
            .orElseLazy(() => context.getIf(Const.SOURCE, "id").value);
    }

}