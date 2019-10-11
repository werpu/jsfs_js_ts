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

}