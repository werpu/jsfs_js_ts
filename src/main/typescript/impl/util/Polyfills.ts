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


import {Monad, Promise as PolyPRomise} from "../../_ext/monadish/Monad";


export class PolyFills {



    static init() {
        PolyFills.initForEach();
        PolyFills.initFilter();
        PolyFills.initDomParser();
    }


    private static initPromise() {
        if(!(<any>window).Promise) {
            (<any>window).Promise = PolyPRomise;
        }
    }

    private static initForEach() {
        //https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
        if (!Array.prototype.forEach) {

            (<any>Array.prototype).forEach = function (callback: any, thisArg: any) {

                let T, k;

                if (this === null) {
                    throw new TypeError(' this is null or not defined');
                }

                // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
                let O = Object(this);

                // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
                // 3. Let len be ToUint32(lenValue).
                let len = O.length >>> 0;

                // 4. If IsCallable(callback) is false, throw a TypeError exception.
                // See: http://es5.github.com/#x9.11
                if (typeof callback !== "function") {
                    throw new TypeError(callback + ' is not a function');
                }

                // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
                if (arguments.length > 1) {
                    T = thisArg;
                }

                // 6. Let k be 0
                k = 0;

                // 7. Repeat, while k < len
                while (k < len) {

                    let kValue;

                    // a. Let Pk be ToString(k).
                    //   This is implicit for LHS operands of the in operator
                    // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
                    //   This step can be combined with c
                    // c. If kPresent is true, then
                    if (k in O) {

                        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                        kValue = O[k];

                        // ii. Call the Call internal method of callback with T as the this value and
                        // argument list containing kValue, k, and O.
                        callback.call(T, kValue, k, O);
                    }
                    // d. Increase k by 1.
                    k++;
                }
                // 8. return undefined
            };
        }
    }

    private static initFilter() {
        //https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        if (!Array.prototype.filter) {
            (<any>Array.prototype).filter = function (fun: any/*, thisArg*/) {
                'use strict';

                if (this === void 0 || this === null) {
                    throw new TypeError();
                }

                let t = Object(this);
                let len = t.length >>> 0;
                if (typeof fun !== 'function') {
                    throw new TypeError();
                }

                let res = [];
                let thisArg = arguments.length >= 2 ? arguments[1] : void 0;
                for (let i = 0; i < len; i++) {
                    if (i in t) {
                        let val = t[i];

                        // NOTE: Technically this should Object.defineProperty at
                        //       the next index, as push can be affected by
                        //       properties on Object.prototype and Array.prototype.
                        //       But that method's new, and collisions should be
                        //       rare, so use the more-compatible alternative.
                        if (fun.call(thisArg, val, i, t)) {
                            res.push(val);
                        }
                    }
                }

                return res;
            };
        }
    }


    static initDomParser() {
        if(!(<any>window).DOMParser) {
            (<any>window).DOMParser = function() {};
        }
        PolyFills._initDomParser((<any>window).DOMParser);
    }

    //https://developer.mozilla.org/de/docs/Web/API/DOMParser
    private static _initDomParser(DOMParser: any) {
        var
            proto = DOMParser.prototype
            , nativeParse = proto.parseFromString
        ;

        // Firefox/Opera/IE throw errors on unsupported types
        try {
            // WebKit returns null on unsupported types
            if ((new DOMParser()).parseFromString("", "text/html")) {
                // text/html parsing is natively supported
                return;
            }
        } catch (ex) {}

        proto.parseFromString = function(markup, type) {
            if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
                var
                    doc = document.implementation.createHTMLDocument("")
                ;
                if (markup.toLowerCase().indexOf('<!doctype') > -1) {
                    doc.documentElement.innerHTML = markup;
                }
                else {
                    doc.body.innerHTML = markup;
                }
                return doc;
            } else {
                return nativeParse.apply(this, arguments);
            }
        }
    }

}



