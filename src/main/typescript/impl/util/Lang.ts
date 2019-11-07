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

import {Lang as LangBase} from "../../ext/monadish/Lang";
import {Messages} from "../i18n/Messages";
import {Config, Optional} from "../../ext/monadish/Monad";
import {CancellablePromise} from "../../ext/monadish/Promise";
import {DomQuery, DQ} from "../../ext/monadish/DomQuery";

export class Lang {


    private base: LangBase;

    private installedLocale: Messages;
    private nameSpace = "impl/util/Lang/";

    private constructor() {
        this.base = LangBase.instance;
        this.initLocale();
    }

    private static _instance: Lang;

    static get instance() {
        return Lang._instance ?? (Lang._instance = new Lang());
    }

    /**
     * instead of Polyfills we rely on class
     * producers
     * @constructor
     */
    static get Promise(): any {
        return this.failSaveResolve<any>(
            () => Promise.prototype.then ? Promise : CancellablePromise,
            CancellablePromise).value
    }

    private get language(): string {
        //TODO global config override

        let language: string = ("undefined" != typeof (<any>navigator).languages) ? (<any>navigator).languages[0] : navigator.language;
        language = language.split("-")[0];
        return language;
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
    static failSaveResolve<T>(resolverProducer: () => T, defaultValue: T = null): Optional<T> {
        return LangBase.saveResolve(resolverProducer, defaultValue);
    }

    static failSaveExecute<T>(resolverProducer: () => any, defaultValue: T = null): void {
        LangBase.saveResolve(resolverProducer, defaultValue);
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
    strToArray(it: string, splitter: string | RegExp = /\./gi): Array<string> {
        return this.base.strToArray(it, splitter);
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
     * transforms a key value pair into a string
     * @param key the key
     * @param val the value
     * @param delimiter the delimiter
     */
    keyValToStr(key: string, val: string, delimiter: string = "\n") {
        let ret = [];
        ret.push(key);
        ret.push(val);
        return ret.join(delimiter);
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
        return evt ?? <any>window?.event ?? {};
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
        let t = evt?.srcElement ?? evt?.target ?? (<any>evt)?.source;
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
     * creates an exeption with additional internal parameters
     * for extra information
     *
     * @param {String} title the exception title
     * @param {String} name  the exception name
     * @param {String} callerCls the caller class
     * @param {String} callFunc the caller function
     * @param {String} message the message for the exception
     */
    makeException(error: Error, title: string, name: string, callerCls: string, callFunc: string, message: string): Error {

        return new Error(message + (callerCls || this.nameSpace, callFunc || ("" + (<any>arguments).caller.toString())));

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
        let MYFACES = "myfaces";
        let CONFIG = "config";

        let fromNullable = Config.fromNullable;

        let local = fromNullable(localOptions);
        let global = fromNullable(window);

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
        let finalLocale = newLocale ?? Messages;
        this.installedLocale = new finalLocale();
    }

    /**
     * fetches the form in an unprecise manner depending
     * on an element or event target
     *
     * @param elem
     * @param event
     */
    static getForm(elem: Element, event ?: Event): DQ {
        const lang = Lang.instance;
        const FORM = "form";

        let queryElem = new DQ(elem);
        let eventTarget = new DQ(lang.getEventTarget(event));

        if (queryElem.isTag(FORM)) {
            return queryElem;
        }

        //html 5 for handling
        if (queryElem.attr(FORM).isPresent()) {
            let formId = queryElem.attr(FORM).value;
            let foundForm = DQ.byId(formId);
            if (foundForm.isPresent()) {
                return foundForm;
            }
        }

        let form = queryElem.parents(FORM)
            .orElseLazy(() => queryElem.byTagName(FORM, true))
            .orElseLazy(() => eventTarget.parents(FORM))
            .orElseLazy(() => eventTarget.byTagName(FORM))
            .first();

        this.assertFormExists(form);

        return form;
    }

    private static assertFormExists(form: DomQuery) {
        if (form.isAbsent()) {
            let lang = Lang.instance;
            throw lang.makeException(new Error(), null, null, "Impl", "getForm", lang.getMessage("ERR_FORM"));
        }
    }

}