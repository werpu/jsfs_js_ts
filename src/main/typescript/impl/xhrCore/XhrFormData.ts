/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
import {Config, DQ, LazyStream, Stream} from "mona-dish";
import {$faces, $nsp, EMPTY_STR, IDENT_ALL, IDENT_FORM, P_VIEWSTATE} from "../core/Const";
import {ExtConfig} from "../util/ExtDomQuery";
import {decodeEncodedValues, encodeFormData, mergeKeyValueEntries} from "../util/URLCodec";


type ParamsMapper<V, K> = (key: V, item: K) => [V, K];
const defaultParamsMapper: ParamsMapper<string, any> = (key, item) => [key, item];

/**
 * A unified form data class
 * which builds upon our configuration.
 *
 * We cannot use standard html5 forms everywhere
 * due to api constraints on the HTML Form object in IE11
 * and due to the url encoding constraint given by the faces.js spec
 *
 * probably only one needed and one overlay!
 * the entire file input storing probably is redundant now
 * that dom query has been fixed //TODO check this
 */
export class XhrFormData extends Config {
    /**
     * Checks if the given datasource is a multipart request source
     * multipart is only needed if one of the executes is a file input
     * since file inputs are stateless, they fall out of the view state
     * and need special handling. With file submits we have to send a formData object
     * instead of an encoded string files cannot be sent that way
     */
    isMultipartRequest: boolean = false;

    /**
     * data collector from a given form
     *
     * @param dataSource either a form as DomQuery object or an encoded url string
     * @param paramsMapper a remapper for the params keys and values
     * @param executes the executes id list for the elements to being processed
     * @param partialIds partial ids to collect, to reduce the data sent down
     */
    constructor(private dataSource: DQ, private paramsMapper: ParamsMapper<string, any> = defaultParamsMapper, executes?: string[], private partialIds?: string[]) {
        super({});
        //encode and append the issuing item if not a partial ids array of ids is passed
        /*
         * Spec. 13.3.1
         * Collect and encode input elements.
         * Additionally the hidden element jakarta.faces.ViewState
         * Enhancement partial page submit
         */
        this.encodeSubmittableFields(this, this.dataSource, this.partialIds);
        this.applyViewState(this.dataSource);
        this.resolveRequestType(executes);
    }

    /**
     * generic post init code, for now, this performs some post assign data post-processing
     * @param executes the executable dom nodes which need to be processed into the form data, which we can send
     * in our ajax request
     */
    resolveRequestType(executes?: Array<string>) {
        if (!executes) {
            return;
        }
        let isMultiPartContainer = (id: string): boolean => {
            if (id == IDENT_ALL) {
                let namingContainer = this.remapKeyForNamingContainer("");
                if (namingContainer.length) {
                    namingContainer = namingContainer.substring(0, namingContainer.length - 1);
                    return DQ.byId(namingContainer).isMultipartCandidate();
                }
                return DQ.byId(document.body).isMultipartCandidate();
            } else if (id == IDENT_FORM) {
                return this.dataSource.isMultipartCandidate(true);
            } else {
                const element = DQ.byId(id, true);
                return element.isMultipartCandidate();
            }
        };

        this.isMultipartRequest = LazyStream.of(...executes)
            .filter(isMultiPartContainer)
            .first().isPresent();
    }

    /**
     * special case view state handling
     *
     * @param form the form holding the view state value
     */
    private applyViewState(form: DQ) {
        if (this.getIf($nsp(P_VIEWSTATE)).isPresent()) {
            return;
        }
        let viewStateElement = form.querySelectorAllDeep(`[name*='${$nsp(P_VIEWSTATE)}'`);
        let viewState = viewStateElement.inputValue;
        this.appendIf(viewState.isPresent(), this.remapKeyForNamingContainer(viewStateElement.name.value)).value = viewState.value;
    }


    /**
     * @returns a Form data representation, this is needed for file submits
     */
    toFormData(): FormData {
        let ret: any = new FormData();
        this.appendInputs(ret);
        return ret;
    }

    /**
     * returns an encoded string representation of our xhr form data
     *
     * @param defaultStr optional default value if nothing is there to encode
     */
    toString(defaultStr = EMPTY_STR): string {
        return encodeFormData(this, this.paramsMapper, defaultStr);
    }


    /**
     * determines fields to submit
     * @param {Object} targetBuf - the target form buffer receiving the data
     * @param {Node} parentItem - form element item is nested in
     * @param {Array} partialIds - ids fo PPS
     */
    public encodeSubmittableFields(targetBuf: Config,
                                   parentItem: DQ, partialIds ?: string[]) {
        //encoded String
        let viewStateStr = $faces().getViewState(parentItem.getAsElem(0).value);
        // we now need to decode it and then merge it into the target buf
        // which hosts already our overrides (aka do not override what is already there(
        // after that we need to deal with form elements on a separate level
        let target = new ExtConfig({});
        mergeKeyValueEntries(target, decodeEncodedValues(viewStateStr), this.paramsMapper);
        this.shallowMerge(target);
    }

    private remapKeyForNamingContainer(key: string): string {
        return this.paramsMapper(key, "")[0];
    }

    private appendInputs(ret: any) {
        Stream.ofAssoc(this.value)
            .flatMap(([key, item])  =>
                Stream.of(...(item as Array<any>)).map(item => {
                    return {key, item};
            }))
            .map(({key, item}) => {
                key = this.remapKeyForNamingContainer(key);
                return {key, item}
            })
            .each(({key, item}) => ret.append(key, item))
    }
}