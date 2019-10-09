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
 *
 * todo replace singleton with module definition
 *
 */


import {PolyFills} from "./Polyfills";
import {LangTypes} from "./LangTypes";
import JSFErrorData = LangTypes.JSFErrorData;
import MyFacesErrorData = LangTypes.MyFacesErrorData;
import FormDataDecorator = LangTypes.FormDataDecorator;
import FormDataDecoratorArray = LangTypes.FormDataDecoratorArray;
import FormDataDecoratorString = LangTypes.FormDataDecoratorString;
import FormDataDecoratorOther = LangTypes.FormDataDecoratorOther;

import {Lang as LangBase} from "../../_ext/monadish/Lang";

import {Messages_de} from "../i18n/Messages_de";
import {Messages_es} from "../i18n/Messages_es";
import {Messages_fr} from "../i18n/Messages_fr";
import {Messages_it} from "../i18n/Messages_it";
import {Messages} from "../i18n/Messages";
import {CancellablePromise, Config} from "../../_ext/monadish/Monad";

export class Lang {

    private static LANGUAGE_MAPS: { [key: string]: any } = {
        "de": Messages_de,
        "es": Messages_es,
        "fr": Messages_fr,
        "it": Messages_it
    };

    private base: LangBase;

    private installedLocale: Messages;
    private nameSpace = "impl/util/Lang/";


    private static _instance: Lang;



    static get instance() {
        if (!Lang._instance) {
            Lang._instance = new Lang();
        }
        return Lang._instance;
    }

    private constructor() {
        this.base = LangBase.instance;
        PolyFills.init();
        this.initLocale();
    }





    /**
     * returns a given localized message upon a given key
     * basic java log like templating functionality is included
     *
     * @param {String} key the key for the message
     * @param {String} defaultMessage optional default message if none was found
     *
     * Additionally you can pass additional arguments, which are used
     * in the same way java log templates use the params
     *
     * @param templateParams the param list to be filled in
     */
    getMessage(key: string, defaultMessage?: string, ...templateParams: Array<string>): string {

        let msg = this.installedLocale[key] || defaultMessage || key + " - undefined message";

        //we now make a simple templating replace of {0}, {1} etc... with their corresponding
        //arguments
        for (let cnt = 0; templateParams && cnt < templateParams.length; cnt++) {
            msg = msg.replace(new RegExp(["\\{", cnt, "\\}"].join(""), "g"), templateParams[cnt]);
        }

        return msg;
    }


    /**
     * String to array function performs a string to array transformation
     * @param {String} it the string which has to be changed into an array
     * @param {RegExp} splitter our splitter reglar expression
     * @return an array of the splitted string
     */
    strToArray(it: string, splitter: string | RegExp = /\./gi): Array<string> {
        return this.base.strToArray(it, splitter);
    }


    arrToMap(arr:any[], offset: number = 0) {
        return this.base.arrToMap(arr, offset);
    }

    /**
     * hyperfast trim
     * http://blog.stevenlevithan.com/archives/faster-trim-javascript
     * crossported from dojo
     */
    trim(str: string): string {
        return this.base.trim(str);
    }


    /**
     * Backported from dojo
     * a failsafe string determination method
     * (since in javascript String != "" typeof alone fails!)
     * @param it {|Object|} the object to be checked for being a string
     * @return true in case of being a string false otherwise
     */
    isString(it?: any): boolean {
        return this.base.isString(it);
    }


    isFunc(it: any): boolean {
        return this.base.isFunc(it);
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
     * @deprecated we should to use typescript first order functions instead
     */
    hitch(scope: any, method: Function): Function {
        return this.base.hitch(scope, method);
    }

    /**
     * simplified merge maps which basically produces
     * a final merged map from left to right
     * the function is sideffect free
     * @param maps
     */
    mergeMaps(maps: {[key:string]:any}[], overwrite: boolean = true, blockFilter: Function = (item) => false, whitelistFilter: Function = (item) => true): {[key:string]:any} {
        return this.base.mergeMaps(maps, overwrite, blockFilter, whitelistFilter);
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
    mixMaps<T>(dest: { [key: string]: T }, src: { [key: string]: T }, overwrite: boolean = true, blockFilter: Function = (item) => false, whitelistFilter: Function = (item) => true): { [key: string]: T } {
        return this.base.mixMaps(dest, src, overwrite, blockFilter, whitelistFilter);
    }

    /**
     * generic object arrays like dom definitions to array conversion method which
     * transforms any object to something array like
     * @param obj
     * @param offset
     * @param pack
     * @returns an array converted from the object
     */
    objToArray<T>(obj: any, offset: number = 0, pack: Array<T> = []): Array<T> {
        return this.base.objToArray(obj, offset, pack);
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
    arrForEach<T>(arr: any, callbackfn: (value: T, index: number, array: T[]) => void, startPos: number = 0, scope: Function = null) {
        return this.base.arrForEach(arr, callbackfn, startPos, scope);
    }

    /**
     * checks if an array contains an element
     * @param {Array} arr   array
     * @param {String} str string to check for
     */
    contains<T>(arr: T[], str: string) {
       return this.base.contains(arr, str);
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
    arrIndexOf<T>(arr: any, element: T, fromIndex : number = 0): number {
        return this.base.arrIndexOf(arr, element, fromIndex);
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
    arrFilter<T>(arr: any, callbackfn: (value: T, index?: number, array?: T[]) => boolean, startPos : number = 0, scope : Function = null) {
        return this.base.arrFilter(arr, callbackfn, startPos, scope);
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
    applyArgs<T>(dest: any, args: { [key: string]: T } | Array<T>, argNames: Array<string> = null): any {
        return this.base.applyArgs(dest, args, argNames);
    }

    /**
     * transforms a key value pair into a string
     * @param key the key
     * @param val the value
     * @param delimiter the delimiter
     */
    keyValToStr(key: string, val: string, delimiter : string = "\n") {
        let ret = [];
        ret.push(key);
        ret.push(val);
        return ret.join(delimiter);
    }


    serializeXML(xmlNode: Node | CDATASection, escape?: boolean): string {
        if (!escape) {
            if ((<CDATASection>xmlNode).data) return (<CDATASection>xmlNode).data; //CDATA block has raw data
            if (xmlNode.textContent) return xmlNode.textContent; //textNode has textContent
        }
        return (new XMLSerializer()).serializeToString(xmlNode);
    }

    serializeChilds(xmlNode: Node): string {
        let buffer = [];
        if (!xmlNode.childNodes) return "";
        for (let cnt = 0; cnt < xmlNode.childNodes.length; cnt++) {
            buffer.push(this.serializeXML(xmlNode.childNodes[cnt]));
        }
        return buffer.join("");
    }

    isXMLParseError(xmlContent: Node): boolean {
        //no xml content
        if (xmlContent == null) return true;
        let findParseError = function (node) {
            if (!node || !node.childNodes) return false;
            for (let cnt = 0; cnt < node.childNodes.length; cnt++) {
                let childNode = node.childNodes[cnt];
                if (childNode.tagName && childNode.tagName == "parsererror") return true;
            }
            return false;
        };


        return !xmlContent ||
            ((<any>xmlContent).parseError && (<any>xmlContent).parserError.errorCode) || findParseError(xmlContent);
    }

    /**
     * determines the correct event depending
     * on the browsers state
     *
     * @param evt incoming event object (note not all browsers
     * have this)
     *
     * @return an event object no matter what is incoming
     */
    getEvent(evt: Event): Event {
        let retVal: Event = (!evt) ? window.event || <Event>{} : evt;
        return retVal;
    }

    /**
     * cross port from the dojo lib
     * browser save event resolution
     * @param evt the event object
     * (with a fallback for ie events if none is present)
     */
    getEventTarget(evt: Event): Element {
        //ie6 and 7 fallback
        evt = this.getEvent(evt);
        /**
         * evt source is defined in the jsf events
         * seems like some component authors use our code
         * so we add it here see also
         * https://issues.apache.org/jira/browse/MYFACES-2458
         * not entirely a bug but makes sense to add this
         * behavior. I dont use it that way but nevertheless it
         * does not break anything so why not
         * */
        let t = evt.srcElement || evt.target || (<any>evt).source || null;
        while ((t) && (t.nodeType != 1)) {
            t = t.parentNode;
        }
        return t;
    }

    /**
     * equalsIgnoreCase, case insensitive comparison of two strings
     *
     * @param source
     * @param destination
     */
    equalsIgnoreCase(source: string, destination: string): boolean {
        return this.base.equalsIgnoreCase(source, destination);
    }



    /**
     * creates a neutral form data wrapper over an existing form Data element
     * the wrapper delegates following methods, append
     * and adds makeFinal as finalizing method which returns the final
     * send representation of the element
     *
     * @param formData an array
     */
    createFormDataDecorator(formData: any): FormDataDecorator {
        //we simulate the dom level 2 form element here
        let bufInstance: FormDataDecorator = null;

        if (formData instanceof Array) {
            bufInstance = new FormDataDecoratorArray(formData);
        } else if (this.isString(formData)) {
            bufInstance = new FormDataDecoratorString(<string>formData);
        } else {
            bufInstance = new FormDataDecoratorOther(formData);
        }
        return bufInstance;
    }


    /**
     * creates an exeption with additional internal parameters
     * for extra information
     *
     * @param {String} title the exception title
     * @param {String} name  the exception name
     * @param {String} callerCls the caller class
     * @param {String} callFunc the caller function
     * @param {String} message the message for the exception
     */
    makeException(error: Error, title: string, name: string, callerCls: string, callFunc: string, message: string): JSFErrorData {
        return new JSFErrorData(name || "clientError", title || "", message || "",
            new MyFacesErrorData(name || "clientError", title || "clientError", callerCls || this.nameSpace, callFunc || ("" + (<any>arguments).caller.toString()))
        );

    }

    /*
     * Promise wrappers for timeout and interval
     */
    timeout(timeout: number): CancellablePromise {
        return this.base.timeout(timeout);
    }



    interval(timeout: number): CancellablePromise {
       return this.base.interval(timeout);
    }


    /**
     * fetches a global config entry
     * @param {String} configName the name of the configuration entry
     * @param {Object} defaultValue
     *
     * @return either the config entry or if none is given the default value
     */
    public getGlobalConfig(configName: string, defaultValue: any): any {
        /**
         * note we could use exists but this is an heavy operation, since the config name usually
         * given this function here is called very often
         * is a single entry without . in between we can do the lighter shortcut
         */
        let myfaces = Config.fromNullable(<any>window);
        return myfaces.getIf("myfaces", "config", configName).get(defaultValue).value;
    }

    /**
     * gets the local or global options with local ones having higher priority
     * if no local or global one was found then the default value is given back
     *
     * @param {String} configName the name of the configuration entry
     * @param {String} localOptions the local options root for the configuration myfaces as default marker is added implicitely
     *
     * @param {Object} defaultValue
     *
     * @return either the config entry or if none is given the default value
     */
    public getLocalOrGlobalConfig(localOptions: Config, configName: string, defaultValue: any): any {
        /*use(myfaces._impl._util)*/
        let local = Config.fromNullable(localOptions);
        let global = Config.fromNullable(window);

        let MYFACES = "myfaces";
        let CONFIG = "config";

        //we use a monadic structure here to have a more readable code for accessing the config values
        //it either is a <local>myfaces.config.<configName> value or window.myfaces.config.<configName> or a default value

        return local.getIf(MYFACES, CONFIG, configName).get(global.getIf(MYFACES, CONFIG, configName)).get(defaultValue).value;
    };

    /**
     * runtime type assertion
     *
     * @param probe the probe to be tested for a type
     * @param theType the type to be tested for
     */
    public assertType(probe: any, theType: any): boolean {
        return this.base.assertType(probe, theType);
    }

    /**
     * (re)inits the currently installed
     * messages so that after loading the main scripts
     * a new locale can be installed optionally
     * to our i18n subsystem
     *
     * @param newLocale locale override
     */
    private initLocale(newLocale ?: any) {
        if (newLocale) {
            this.installedLocale = new newLocale();
            return;
        }

        let language: string = this.language;
        let languageClass = (language) ? Lang.LANGUAGE_MAPS[language] : Messages;
        languageClass = (languageClass) ? languageClass : Messages;

        this.installedLocale = new languageClass();
    }

    private get language(): string {
        //TODO global config override

        let language: string = ("undefined" != typeof (<any>navigator).languages) ? (<any>navigator).languages[0] : navigator.language;
        language = language.split("-")[0];
        return language;
    }

}