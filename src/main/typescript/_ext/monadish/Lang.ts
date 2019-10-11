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

import {CancellablePromise} from "./Promise";
import {Optional} from "./Monad";

/**
 * Lang helpers crossported from the apache myfaces project
 */
export class Lang {

    private static _instance: Lang;

    static get instance() {
        if (!Lang._instance) {
            Lang._instance = new Lang();
        }
        return Lang._instance;
    }

    //should be in lang, but for now here to avoid recursive imports, not sure if typescript still has a problem with those
    /**
     * helper function to savely resolve anything
     * this is not an elvis operator, it resolves
     * a value without exception in a tree and if
     * it is not resolvable then an optional of
     * a default value is restored or Optional.empty
     * if none is given
     *
     * usage
     * <code>
     *     let var: Optiona<string> = saveResolve(() => a.b.c.d.e, "foobaz")
     * </code>
     *
     * @param resolverProducer a lambda which can produce the value
     * @param defaultValue an optional default value if the producer failes to produce anything
     * @returns an Optional of the produced value
     */
    static saveResolve<T>(resolverProducer: () => T, defaultValue: T = null): Optional<T> {
        try {
            let result = resolverProducer();
            if ("undefined" == typeof result || null == result) {
                return Optional.fromNullable(defaultValue);
            }
            return Optional.fromNullable(result);
        } catch (e) {
            return Optional.absent;
        }
    }

    /**
     * String to array function performs a string to array transformation
     * @param {String} it the string which has to be changed into an array
     * @param {RegExp} splitter our splitter reglar expression
     * @return an array of the splitted string
     */
    strToArray(it: string, splitter: string | RegExp = /\./gi): Array<string> {
        //	summary:
        //		Return true if it is a String

        let retArr = it.split(splitter);
        for (let cnt = 0; cnt < retArr.length; cnt++) {
            retArr[cnt] = this.trim(retArr[cnt]);
        }
        return retArr;
    }

    arrToMap(arr: any[], offset: number = 0) {
        var ret = new Array(arr.length);
        var len = arr.length;
        offset = (offset) ? offset : 0;
        for (var cnt = 0; cnt < len; cnt++) {
            ret[arr[cnt]] = cnt + offset;
        }
        return ret;
    }

    /**
     * hyperfast trim
     * http://blog.stevenlevithan.com/archives/faster-trim-javascript
     * crossported from dojo
     */
    trim(str: string): string {
        str = str.replace(/^\s\s*/, '');
        let ws = /\s/, i = str.length;

        while (ws.test(str.charAt(--i))) {
            //do nothing
        }
        return str.slice(0, i + 1);
    }

    /**
     * Backported from dojo
     * a failsafe string determination method
     * (since in javascript String != "" typeof alone fails!)
     * @param it {|Object|} the object to be checked for being a string
     * @return true in case of being a string false otherwise
     */
    isString(it?: any): boolean {
        //	summary:
        //		Return true if it is a String
        return !!arguments.length && it != null && (typeof it == "string" || it instanceof String); // Boolean
    }

    isFunc(it: any): boolean {
        return it instanceof Function || typeof it === "function";
    }

    /**
     * hitch backported from dojo
     * hitch allows to assign a function to a dedicated scope
     * this is helpful in situations when function reassignments
     * can happen
     * (notably happens often in lazy xhr code)
     *
     * @param {Function} scope of the function to be executed in
     * @param {Function} method to be executed, the method must be of type function
     *
     * @return whatever the executed method returns
     *
     */
    hitch(scope: any, method: Function): Function {
        return !scope ? method : function () {
            return method.apply(scope, arguments || []);
        }; // Function
    }

    /**
     * simplified merge maps which basically produces
     * a final merged map from left to right
     * the function is sideffect free
     * @param maps
     */
    mergeMaps(maps: { [key: string]: any }[], overwrite: boolean = true, blockFilter?: Function, whitelistFilter?: Function): { [key: string]: any } {
        let retVal = {};
        this.arrForEach(maps, (item: { [key: string]: any }) => {
            this.mixMaps(retVal, item, overwrite)
        });
        return retVal;
    }

    /**
     * Helper function to merge two maps
     * into one
     * @param {Object} dest the destination map
     * @param {Object} src the source map
     * @param {boolean} overwrite if set to true the destination is overwritten if the keys exist in both maps
     * @param blockFilter
     * @param whitelistFilter
     **/
    mixMaps<T>(dest: { [key: string]: T }, src: { [key: string]: T }, overwrite: boolean, blockFilter?: Function, whitelistFilter?: Function): { [key: string]: T } {
        let UNDEF = "undefined";
        for (let key in src) {
            if (!src.hasOwnProperty(key)) continue;
            if (blockFilter && blockFilter[key]) {
                continue;
            }
            if (whitelistFilter && !whitelistFilter[key]) {
                continue;
            }
            if (!overwrite) {
                /**
                 *we use exists instead of booleans because we cannot rely
                 *on all values being non boolean, we would need an getIf
                 *operator in javascript to shorten this :-(
                 */
                dest[key] = (UNDEF != typeof dest[key]) ? dest[key] : src[key];
            } else {
                dest[key] = (UNDEF != typeof src[key]) ? src[key] : dest[key];
            }
        }
        return dest;
    }

    /**
     * generic object arrays like dom definitions to array conversion method which
     * transforms any object to something array like
     * @param obj
     * @param offset
     * @param pack
     * @returns an array converted from the object
     */
    objToArray<T>(obj: any, offset?: number, pack?: Array<T>): Array<T> {
        if (!obj) {
            return pack || null;
        }
        //since offset is numeric we cannot use the shortcut due to 0 being false
        //special condition array delivered no offset no pack
        if (obj instanceof Array && !offset && !pack) return obj;
        let finalOffset = ('undefined' != typeof offset || null != offset) ? offset : 0;
        let finalPack = pack || [];
        try {
            return finalPack.concat(Array.prototype.slice.call(obj, finalOffset));
        } catch (e) {
            //ie8 (again as only browser) delivers for css 3 selectors a non convertible object
            //we have to do it the hard way
            //ie8 seems generally a little bit strange in its behavior some
            //objects break the function is everything methodology of javascript
            //and do not implement apply call, or are pseudo arrays which cannot
            //be sliced
            for (let cnt = finalOffset; cnt < obj.length; cnt++) {
                finalPack.push(obj[cnt]);
            }
            return finalPack;
        }
    }

    /**
     * foreach implementation utilizing the
     * ECMAScript wherever possible
     * with added functionality
     *
     * @param arr the array to filter
     * @param callbackfn
     * @param startPos
     * @param scope the closure to apply the function to, with the syntax defined by the ecmascript functionality
     * function (element<,key, array>)
     * <p />
     * optional params
     * <p />
     * <ul>
     *      <li>param startPos (optional) the starting position </li>
     *      <li>param scope (optional) the scope to apply the closure to  </li>
     * </ul>
     */
    arrForEach<T>(arr: any, callbackfn: (value: T, index: number, array: T[]) => void, startPos?: number, scope?: Function) {
        if (!arr || !arr.length) return;
        let startPosFinal = startPos || 0;
        let thisObj = scope;
        //check for an existing foreach mapping on array prototypes
        //IE9 still does not pass array objects as result for dom ops
        let convertedArr: Array<T> = this.objToArray<T>(arr);
        (startPos) ? convertedArr.slice(startPosFinal).forEach(callbackfn, thisObj) : convertedArr.forEach(callbackfn, thisObj);
    }

    /**
     * checks if an array contains an element
     * @param {Array} arr   array
     * @param {String} str string to check for
     */
    contains<T>(arr: T[], str: string) {
        if (!arr || !str) {
            throw Error("null value on arr or str not allowed");
        }
        return this.arrIndexOf(arr, str) != -1;
    }

    /**
     * adds a EcmaScript optimized indexOf to our mix,
     * checks for the presence of an indexOf functionality
     * and applies it, otherwise uses a fallback to the hold
     * loop method to determine the index
     *
     * @param arr the array
     * @param element the index to search for
     * @param fromIndex
     */
    arrIndexOf<T>(arr: any, element: T, fromIndex ?: number): number {
        if (!arr || !arr.length) return -1;
        let pos = fromIndex || 0;
        arr = this.objToArray<T>(arr);
        return arr.indexOf(element, pos);
    }

    /**
     * filter implementation utilizing the
     * ECMAScript wherever possible
     * with added functionality
     *
     * @param arr the array to filter
     * @param scope the closure to apply the function to, with the syntax defined by the ecmascript functionality
     * function (element<,key, array>)
     * <p />
     * additional params
     * <ul>
     *  <li> startPos (optional) the starting position</li>
     *  <li> scope (optional) the scope to apply the closure to</li>
     * </ul>
     */
    arrFilter<T>(arr: any, callbackfn: (value: T, index?: number, array?: T[]) => boolean, startPos ?: number, scope ?: Function) {
        if (!arr || !arr.length) return [];
        let arrFinal = this.objToArray<T>(arr);
        return ((startPos) ? arrFinal.slice(startPos).filter(callbackfn, scope) : arrFinal.filter(callbackfn, scope));
    }

    /**
     * helper to automatically apply a delivered arguments map or array
     * to its destination which has a field "_"<key> and a full field
     *
     * @param dest the destination object
     * @param args the arguments array or map
     * @param argNames the argument names to be transferred
     */
    /**
     * helper to automatically apply a delivered arguments map or array
     * to its destination which has a field "_"<key> and a full field
     *
     * @param dest the destination object
     * @param args the arguments array or map
     * @param argNames the argument names to be transferred
     */
    applyArgs<T>(dest: any, args: { [key: string]: T } | Array<T>, argNames?: Array<string>): any {
        let UDEF = 'undefined';
        if (argNames) {
            for (let cnt = 0; cnt < (<Array<T>>args).length; cnt++) {
                //dest can be null or 0 hence no shortcut
                if (UDEF != typeof dest["_" + argNames[cnt]]) {
                    dest["_" + argNames[cnt]] = args[cnt];
                }
                if (UDEF != typeof dest[argNames[cnt]]) {
                    dest[argNames[cnt]] = args[cnt];
                }
            }
        } else {
            for (let key in args) {
                if (!args.hasOwnProperty(key)) continue;
                if (UDEF != typeof dest["_" + key]) {
                    dest["_" + key] = args[key];
                }
                if (UDEF != typeof dest[key]) {
                    dest[key] = args[key];
                }
            }
        }
        return dest;
    }

    /**
     * equalsIgnoreCase, case insensitive comparison of two strings
     *
     * @param source
     * @param destination
     */
    equalsIgnoreCase(source: string, destination: string): boolean {
        //either both are not set or null
        if (!source && !destination) {
            return true;
        }
        //source or dest is set while the other is not
        if (!source || !destination) return false;
        //in any other case we do a strong string comparison
        return source.toLowerCase() === destination.toLowerCase();
    }

    /*
     * Promise wrappers for timeout and interval
     */
    timeout(timeout: number): CancellablePromise {
        let handler: any = null;
        return new CancellablePromise((apply: Function, reject: Function) => {
            handler = setTimeout(() => {
                apply();
            }, timeout);
        }, () => {
            if (handler) {
                clearTimeout(handler);
                handler = null;
            }
        });
    }

    interval(timeout: number): CancellablePromise {
        let handler: any = null;
        return new CancellablePromise((apply: Function, reject: Function) => {
            handler = setInterval(() => {
                apply();
            }, timeout);
        }, () => {
            if (handler) {
                clearInterval(handler);
                handler = null;
            }
        });
    }

    /**
     * runtime type assertion
     *
     * @param probe the probe to be tested for a type
     * @param theType the type to be tested for
     */
    public assertType(probe: any, theType: any): boolean {
        return this.isString(theType) ? typeof probe == theType : probe instanceof theType;
    }

}