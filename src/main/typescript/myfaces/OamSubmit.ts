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

/**
 * legacy code to enable various aspects
 * of myfaces, used to be rendered inline
 * for jsf 2.0 we can externalized it into its own custom resource
 *
 * note this is a straight 1:1 port from the existing codebase
 * (not too much work has been spent here, the important thing is, that
 * the namespace and functions need to be kept intact for legacy code)
 *
 * we might move the code over in the future, but for now a straight 1:1 port suffices
 */
declare const window: any;
declare const myfaces: any;

export module oam {

    /**
     * sets a hidden input field
     * @param formname the formName
     * @param name the hidden field
     * @param value the value to be rendered
     */
    export const setHiddenInput = function (formname, name, value) {
        let form: HTMLFormElement = document.forms[formname];
        if (typeof form == 'undefined') {
            form = document.getElementById(formname) as HTMLFormElement;
        }

        if (typeof form.elements[name] != 'undefined' && (form.elements[name].nodeName == 'INPUT' || form.elements[name].nodeName == 'input')) {
            (form.elements[name] as HTMLInputElement).value = value;
        } else {
            let newInput = document.createElement('input');
            newInput.setAttribute('type', 'hidden');
            newInput.setAttribute('id', name);
            newInput.setAttribute('name', name);
            newInput.setAttribute('value', value);
            form.appendChild(newInput);
        }
    };

    /**
     * clears a hidden input field
     *
     * @param formname formName for the input
     * @param name the name of the input field
     */
    export const clearHiddenInput = function (formname: string, name: string) {
        let form: HTMLFormElement = document.forms[formname];

        if (typeof form == 'undefined') {
            form = document.getElementById(formname) as HTMLFormElement;
        }

        let hInput = form.elements[name];
        if (typeof hInput != 'undefined') {
            form.removeChild(hInput);
        }
    };

    // noinspection JSUnusedGlobalSymbols
    /**
     * does special form submit remapping
     * remaps the issuing command link into something
     * the decode of the command link on the server can understand
     *
     * @param formName
     * @param linkId
     * @param target
     * @param params
     */
    export const submitForm = function (formName: string, linkId: string, target: HTMLElement, params: { [key: string]: any }) {

        let clearFn = 'clearFormHiddenParams_' + formName.replace(/-/g, '\$:').replace(/:/g, '_');
        if (typeof window[clearFn] == 'function') {
            window[clearFn](formName);
        }

        let form = document.forms[formName];
        if (typeof form == 'undefined') {
            form = document.getElementById(formName);
        }

        //autoscroll code
        if ((window as any)?.myfaces?.core?.config.autoScroll && typeof (window as any)?.getScrolling != 'undefined') {
            myfaces.oam.setHiddenInput(formName, 'autoScroll', window?.getScrolling());
        }

        let oldTarget = form.target;
        if (target != null) {
            form.target = target;
        }
        if ((typeof params != 'undefined') && params != null) {
            for (let i = 0, param; (param = params[i]); i++) {
                myfaces.oam.setHiddenInput(formName, param[0], param[1]);
            }

        }

        myfaces.oam.setHiddenInput(formName, formName + ':' + '_idcl', linkId);

        if (form.onsubmit) {
            let result = form.onsubmit();
            if ((typeof result == 'undefined') || result) {
                try {
                    form.submit();
                } catch (e) {
                    if (window.console) {
                        console.error(e);
                    }
                }
            }

        } else {
            try {
                form.submit();
            } catch (e) {
                if (window.console) {
                    console.error(e);
                }
            }
        }

        form.target = oldTarget;
        if ((typeof params != 'undefined') && params != null) {

            for (let i = 0, param; (param = params[i]); i++) {
                myfaces.oam.clearHiddenInput(formName, param[0], param[1]);
            }

        }

        myfaces.oam.clearHiddenInput(formName, formName + ':' + '_idcl', linkId);
        return false;
    };
}