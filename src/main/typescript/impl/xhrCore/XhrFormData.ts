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

import {Config, DomQuery} from "../../_ext/monadish";
import {AjaxUtils} from "./AjaxUtils";
import {Const} from "../core/Const";

declare let jsf: any;

/**
 * we simplify now compared to the old form handling
 * given that we have a configuration in place we can recycle that
 * for the entire parameter generation
 * then we have two fallbacks one for the non multipart case
 * the other one for the multipart case
 *
 * From outside we work on a single form configuration
 * which we can use like any other config
 */
export class XhrFormData extends Config {

    constructor(private sourceForm: DomQuery, private issuingItem?: DomQuery, private partialIdsArray?: string[]) {
        super({});
        //encode and append the issuing item if not a partial ids array of ids is passed
        /*
         * Spec. 13.3.1
         * Collect and encode input elements.
         * Additionally the hidden element javax.faces.ViewState
         * Enhancement partial page submit
         *
         */
        AjaxUtils.encodeSubmittableFields(this.value, <HTMLFormElement>this.sourceForm.getAsElem(0).value, this.partialIdsArray);
        if (!(partialIdsArray || partialIdsArray.length == 0) && this.issuingItem) {
            AjaxUtils.appendIssuingItem(issuingItem.getAsElem(0).value, this.value);
        }
        this.apply(Const.P_VIEWSTATE, jsf.getViewState(this.sourceForm.getAsElem(0).value))
    }

    toFormData(): FormData {
        let ret: any = new FormData();
        for (let key in this.value) {
            ret.append(key, this.value[key])
        }
        return ret;
    }

    toString(defaultStr = ""): string {
        if (this.isAbsent()) {
            return defaultStr;
        }
        let entries = [];
        for (let key in this.value) {
            entries.push(`${encodeURIComponent(key)}=${encodeURIComponent(this.value[key])}`)
        }
        return entries.join("=")
    }
}