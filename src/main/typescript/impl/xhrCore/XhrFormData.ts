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

import {Config} from "../../ext/monadish";
import {Const} from "../core/Const";
import {Implementation} from "../AjaxImpl";
import {Lang} from "../util/Lang";
import {Stream} from "../../ext/monadish/Stream";
import {DQ} from "../../ext/monadish/DomQuery";

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
 *
 * TODO make this code smaller we might have
 * enough leverage in the streams collectors
 * api just to do that.
 */
export class XhrFormData extends Config {

    /**
     * by the time we hit this code, datasource alöready must be of type form
     *
     * @param dataSource either a form as domquery object or an encoded url string
     * @param partialIdsArray partial ids to collect
     */
    constructor(private dataSource: DQ | string, private partialIdsArray?: string[]) {
        super({});
        //a call to getViewState before must pass the encoded line
        //a call from getViewState passes the form element as datasource
        //so we have two call points
        if (Lang.instance.isString(dataSource)) {
            this.handleStringSource();
        } else {
            this.handleFormSource();
        }
    }

    private handleFormSource() {
        //encode and append the issuing item if not a partial ids array of ids is passed
        /*
         * Spec. 13.3.1
         * Collect and encode input elements.
         * Additionally the hidden element javax.faces.ViewState
         * Enhancement partial page submit
         *
         */

        this.encodeSubmittableFields(this, <DQ>this.dataSource, this.partialIdsArray);

        if (this.getIf(Const.P_VIEWSTATE).isPresent()) {
            return;
        }

        this.applyViewState(<DQ>this.dataSource);
    }

    private handleStringSource() {
        this.mergeEncodedString(<string>this.dataSource);
        return;
    }

    private applyViewState(form: DQ) {
        form.byId(Const.P_VIEWSTATE)
            .ifPresentLazy((elem: DQ) => {
                let value = elem.inputValue.value;
                this.assignIf(!!value ,Const.P_VIEWSTATE).value = value;
            });
    }

    mergeEncodedString(encoded: string) {
        let splittedEntries = encoded.split(/\&/gi);
        Stream.of(...splittedEntries)
            .map(line => line.split(/\=/gi))
            .each(keyVal => {
                this.assign(keyVal [0]).value = keyVal[1] || null;
            });
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @returns a Form data representation
     */
    toFormData(): FormData {
        let ret: any = new FormData();
        for (let key in this.value) {
            if (this.value.hasOwnProperty(key)) {
                ret.append(key, this.value[key])
            }
        }
        return ret;
    }

    /**
     * returns an encoded string representation of our xhr form data
     *
     * @param defaultStr optional default value if nothing is there to encode
     */
    toString(defaultStr = ""): string {
        if (this.isAbsent()) {
            return defaultStr;
        }
        let entries = [];
        for (let key in this.value) {
            if (this.value.hasOwnProperty(key)) {
                entries.push(`${encodeURIComponent(key)}=${encodeURIComponent(this.value[key])}`)
            }
        }
        return entries.join("&")
    }

    /**
     * determines fields to submit
     * @param {Object} targetBuf - the target form buffer receiving the data
     * @param {Node} parentItem - form element item is nested in
     * @param {Array} partialIds - ids fo PPS
     */
    private encodeSubmittableFields(targetBuf: Config,
                                    parentItem: DQ, partialIds ?: string[]) {
        let toEncode = null;
        if (this.partialIdsArray && this.partialIdsArray.length) {
            //in case of our myfaces reduced ppr we only
            //only submit the partials

            //TODO maybe also the window id and other defaults lets see
            //this is not a spec case anyway
            this._value = {};
            toEncode = new DQ(...this.partialIdsArray);

        } else {
            if (parentItem.isAbsent()) throw "NO_PARITEM";
            toEncode = parentItem;
        }

        //lets encode the form elements
        this.shallowMerge(toEncode.querySelectorAll("input, checkbox, select, textarea").encodeFormElement());
    }

    get isMultipartRequest(): boolean {
        return  this.dataSource instanceof DQ && (<DQ> this.dataSource).querySelectorAll("input[type='file']").isPresent();
    }

}