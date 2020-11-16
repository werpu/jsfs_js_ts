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
import {ArrayCollector, Config, Lang} from "../../ext/monadish";

import {Stream} from "../../ext/monadish";
import {DQ} from "../../ext/monadish";
import isString = Lang.isString;
import {EMPTY_STR, P_VIEWSTATE} from "../core/Const";


/**
 * A unified form data class
 * which builds upon our configuration.
 *
 * We cannot use standard html5 forms everywhere
 * due to api constraints on the HTML Form object in IE11
 * and due to the url encoding constraint given by the jsf.js spec
 */
export class XhrFormData extends Config {

    /**
     * data collector from a given form
     *
     * @param dataSource either a form as DomQuery object or an encoded url string
     * @param partialIdsArray partial ids to collect, to reduce the data sent down
     */
    constructor(private dataSource: DQ | string, private partialIdsArray?: string[], private encode = true) {
        super({});
        //a call to getViewState before must pass the encoded line
        //a call from getViewState passes the form element as datasource
        //so we have two call points
        if (isString(dataSource)) {
            this.assignEncodedString(<string>this.dataSource);
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

        if (this.getIf(P_VIEWSTATE).isPresent()) {
            return;
        }

        this.applyViewState(<DQ>this.dataSource);
    }

    /**
     * special case viewstate handling
     *
     * @param form the form holding the viewstate value
     */
    private applyViewState(form: DQ) {
        let viewState = form.byId(P_VIEWSTATE, true).inputValue;
        this.appendIf(viewState.isPresent() ,P_VIEWSTATE).value = viewState.value;
    }

    /**
     * assignes a url encoded string to this xhrFormData object
     * as key value entry
     * @param encoded
     */
    assignEncodedString(encoded: string) {
        let keyValueEntries = encoded.split(/&/gi);
        Stream.of(...keyValueEntries)
            //split only the first =
            .map(line => line.split(/=(.*)/gi))
            //special case of having keys without values
            .map(keyVal => keyVal.length < 3 ? [keyVal?.[0] ?? [], keyVal?.[1] ?? []] : keyVal)
            .each(keyVal => {
                this.append(keyVal[0]).value = keyVal?.splice(1)?.join("") ?? "";
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
                Stream.of(...this.value[key]).each(item => ret.append(key, item));
            }
        }
        return ret;
    }

    /**
     * returns an encoded string representation of our xhr form data
     *
     * @param defaultStr optional default value if nothing is there to encode
     */
    toString(defaultStr = EMPTY_STR): string {
        if (this.isAbsent()) {
            return defaultStr;
        }
        let entries = Stream.of(...Object.keys(this.value))
            .filter(key => this.value.hasOwnProperty(key))
            .flatMap(key => Stream.of(...this.value[key]).map(val => [key, val]).collect(new ArrayCollector()))
            .map(keyVal => {
                return `${encodeURIComponent(keyVal[0])}=${encodeURIComponent(keyVal[1])}`;
            })
            .collect(new ArrayCollector());
       /* for (let key in this.value) {
            if (this.value.hasOwnProperty(key)) {
                //key value already encoded so no need to reencode them again
                Stream.of(...this.value[key]).each(item => {
                    entries.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`);
                });
            }
        }*/
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
            this._value = {};
            toEncode = new DQ(...this.partialIdsArray);

        } else {
            if (parentItem.isAbsent()) throw "NO_PARITEM";
            toEncode = parentItem;
        }

        //lets encode the form elements
        this.shallowMerge(toEncode.querySelectorAll("input, checkbox, select, textarea").encodeFormElement());
    }

    /**
     * checks if the given datasource is a multipart request source
     */
    get isMultipartRequest(): boolean {
        return  this.dataSource instanceof DQ && (<DQ> this.dataSource).querySelectorAll("input[type='file']").isPresent();
    }

}