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


export module LangTypes {



    export interface XMLParserError {
        errorCode: number;
        line: number;
        linepos: number;
        srcText: string;
        reason: string;
    }

    export interface XMLContent extends Node {
        parseError: XMLParserError;
    }

    /**
     * Error parsing message
     */
    export class XMLErrorMessage {
        constructor(public errorMessage: string, public line: number, public linePos?: number, public sourceText ?: string, public visualError?: string) {
        };
    }


    export class MyFacesErrorData {

        constructor(public name: string, public title: string, public caller: string, public callFunc: string) {

        }
    }

    export class JSFErrorData {
        constructor(public name: string, public title: string, public message: string, public mfInternal?: MyFacesErrorData) {

        }
    }

    export class FormDataDecorator {
        protected _valBuf: string[];
        protected _idx: { [key: string]: boolean } = {};


        constructor(valBuf?: string[]) {
            this._valBuf = valBuf || [];
        }

        append(key: string, val: string) {
            this._valBuf.push([encodeURIComponent(key), encodeURIComponent(val)].join("="));
            this._idx[key] = true;
        }

        hasKey(key: string): boolean {
            return !!this._idx[key]
        }

        makeFinal(): string {
            return this._valBuf.join("&");
        }
    }


    export class FormDataDecoratorArray extends FormDataDecorator {
    }

    export class FormDataDecoratorString extends FormDataDecoratorArray {

        private _preprocessedData: string;

        constructor(preprocessedData: string) {
            super();
            this._preprocessedData = preprocessedData;
        }

        makeFinal(): string {
            if (this._preprocessedData != "") {
                return this._preprocessedData + "&" + this._valBuf.join("&")
            } else {
                return this._valBuf.join("&");
            }
        }
    }

    export class FormDataDecoratorOther extends FormDataDecoratorArray {

        private _preprocessedData: string;


        append(key: string, val: string) {
            this._valBuf.push(key, val);
            this._idx[key] = true;
        };

        makeFinal(): string {
            return this._valBuf.join("");
        };
    }

}