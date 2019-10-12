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
        this.encodeSubmittableFields(this, this.sourceForm, this.partialIdsArray);

        this.apply(Const.P_VIEWSTATE).value = jsf.getViewState(this.sourceForm.getAsElem(0).value);
    }

    toFormData(): FormData {
        let ret: any = new FormData();
        for (let key in this.value) {
            //Todo filename in multipart case
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

    /**
     * determines fields to submit
     * @param {Object} targetBuf - the target form buffer receiving the data
     * @param {Node} parentItem - form element item is nested in
     * @param {Array} partialIds - ids fo PPS
     */
    private encodeSubmittableFields(targetBuf: Config,
                                   parentItem: DomQuery, partialIds ?: string[]) {

        if (this.partialIdsArray && this.partialIdsArray.length) {
            this.encodePartialSubmit();
        } else {
            if (parentItem.isAbsent()) throw "NO_PARITEM";
            parentItem.each( (element) => this.encodeElement(element))
        }
    }

    private encodePartialSubmit() {
        let partials = new DomQuery(...this.partialIdsArray);
        partials.each((element: DomQuery) => this.encodeElement(element));
    }

    /**
     * encodes a single input element for submission
     *
     * @param {Node} element - to be encoded
     * @param {} targetBuf - a target array buffer receiving the encoded strings
     */
    private encodeElement(element: DomQuery) {

        //browser behavior no element name no encoding (normal submit fails in that case)
        //https://issues.apache.org/jira/browse/MYFACES-2847
        if (!element.name) {
            return;
        }

        let name = element.name.value;
        let tagName = element.tagName.value.toLowerCase();
        let elemType = element.type.value;
        if (elemType != null) {
            elemType = elemType.toLowerCase();
        }

        // routine for all elements
        // rules:
        // - process only inputs, textareas and selects
        // - elements muest have attribute "name"
        // - elements must not be disabled
        if (((tagName == "input" || tagName == "textarea" || tagName == "select") &&
            (name != null && name != "")) && !element.disabled) {

            // routine for select elements
            // rules:
            // - if select-one and value-Attribute exist => "name=value"
            // (also if value empty => "name=")
            // - if select-one and value-Attribute don't exist =>
            // "name=DisplayValue"
            // - if select multi and multple selected => "name=value1&name=value2"
            // - if select and selectedIndex=-1 don't submit
            if (tagName == "select") {
                // selectedIndex must be >= 0 sein to be submittet
                let selectElem: HTMLSelectElement = <HTMLSelectElement>element.getAsElem(0).value;
                if (selectElem.selectedIndex >= 0) {
                    let uLen = selectElem.options.length;
                    for (let u = 0; u < uLen; u++) {
                        // find all selected options
                        //let subBuf = [];
                        if (selectElem.options[u].selected) {
                            let elementOption = selectElem.options[u];
                            this.apply(name).value = (elementOption.getAttribute("value") != null) ?
                                elementOption.value : elementOption.text;
                        }
                    }
                }
            }

            // routine for remaining elements
            // rules:
            // - don't submit no selects (processed above), buttons, reset buttons, submit buttons,
            // - submit checkboxes and radio inputs only if checked
            if ((tagName != "select" && elemType != "button"
                && elemType != "reset" && elemType != "submit" && elemType != "image")
                && ((elemType != "checkbox" && elemType != "radio") || (<any>element).checked)) {
                let files: any = (<any>element).files;
                if (files && files.length) {
                    //xhr level2
                    this.apply(name).value = files[0];
                } else {
                    this.apply(name).value = element.value;
                }
            }

        }
    }
}