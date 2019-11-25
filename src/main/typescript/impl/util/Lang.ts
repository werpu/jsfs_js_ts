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
import {DomQuery, DQ} from "../../ext/monadish/DomQuery";
import {Stream} from "../../ext/monadish";


export module ExtLang {

     let installedLocale: Messages;
     let nameSpace = "impl/util/Lang/";


    export function getLanguage(): string {
        //TODO global config override

        let language: string = (<any>navigator).languages?.[0] ?? navigator?.language;
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
     *     let var: Optional<string> = saveResolve(() => a.b.c.d.e, "foobaz")
     * </code>
     *
     * @param resolverProducer a lambda which can produce the value
     * @param defaultValue an optional default value if the producer failes to produce anything
     * @returns an Optional of the produced value
     */
    export function failSaveResolve<T>(resolverProducer: () => T, defaultValue: T = null): Optional<T> {
        return LangBase.saveResolve(resolverProducer, defaultValue);
    }

    export function failSaveExecute<T>(resolverProducer: () => any, defaultValue: T = null): void {
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
    export function getMessage(key: string, defaultMessage?: string, ...templateParams: Array<string>): string {
        installedLocale = installedLocale ?? new Messages();

        let msg = installedLocale[key] ?? defaultMessage ?? key + " - undefined message";

        Stream.of(...templateParams).each((param, cnt) => {
            msg = msg.replace(new RegExp(["\\{", cnt, "\\}"].join(""), "g"), param);
        });

        return msg;
    }



    /**
     * transforms a key value pair into a string
     * @param key the key
     * @param val the value
     * @param delimiter the delimiter
     */
    export function keyValToStr(key: string, val: string, delimiter: string = "\n") {
        return [key, val].join(delimiter);
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
    export function getEvent(evt: Event): Event {
        return evt ?? <any>window?.event ?? {};
    }

    /**
     * cross port from the dojo lib
     * browser save event resolution
     * @param evt the event object
     * (with a fallback for ie events if none is present)
     */
    export function getEventTarget(evt: Event): Element {
        //ie6 and 7 fallback
        evt = getEvent(evt);
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
     * creates an exeption with additional internal parameters
     * for extra information
     *
     * @param {String} title the exception title
     * @param {String} name  the exception name
     * @param {String} callerCls the caller class
     * @param {String} callFunc the caller function
     * @param {String} message the message for the exception
     */
    export function makeException(error: Error, title: string, name: string, callerCls: string, callFunc: string, message: string): Error {

        return new Error(message + (callerCls ?? nameSpace) + callFunc ?? ("" + (<any>arguments).caller.toString()));

    }

    /**
     * fetches a global config entry
     * @param {String} configName the name of the configuration entry
     * @param {Object} defaultValue
     *
     * @return either the config entry or if none is given the default value
     */
    export function getGlobalConfig(configName: string, defaultValue: any): any {
        /**
         * note we could use exists but this is an heavy operation, since the config name usually
         * given this function here is called very often
         * is a single entry without . in between we can do the lighter shortcut
         */
        return (<any>window)?.myfaces?.config?.[configName] ?? defaultValue;
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
    export function getLocalOrGlobalConfig(localOptions: Config, configName: string, defaultValue: any): any {
        return localOptions.value?.myfaces?.config?.[configName] ??
            (<any>window)?.myfaces?.config?.[configName] ??
            defaultValue;
    };


    /**
     * fetches the form in an unprecise manner depending
     * on an element or event target
     *
     * @param elem
     * @param event
     */
    export function getForm(elem: Element, event ?: Event): DQ | never {

        const FORM = "form";

        let queryElem = new DQ(elem);
        let eventTarget = new DQ(ExtLang.getEventTarget(event));

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

        assertFormExists(form);

        return form;
    }

    function assertFormExists(form: DomQuery): void | never {
        if (form.isAbsent()) {
            throw makeException(new Error(), null, null, "Impl", "getForm", getMessage("ERR_FORM"));
        }
    }

}