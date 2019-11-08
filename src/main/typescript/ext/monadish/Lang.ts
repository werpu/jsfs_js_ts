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
        return Lang._instance ?? (Lang._instance = new Lang());
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
            return Optional.fromNullable(result ?? defaultValue);
        } catch (e) {
            return Optional.absent;
        }
    }

    static saveResolveLazy<T>(resolverProducer: () => T, defaultValue: () => T = null): Optional<T> {
        try {
            let result = resolverProducer();
            return Optional.fromNullable(result ?? defaultValue());
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
        let finalOffset =  offset ?? 0;
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
}

