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

import {Lang} from "./Lang";
import {jsf} from "../../api/jsf";
export class Dom {
    /*table elements which are used in various parts */
    private TABLE_ELEMS: any = {
        "thead": 1,
        "tbody": 1,
        "tr": 1,
        "th": 1,
        "td": 1,
        "tfoot": 1
    };




    _RT: any;

    private static _instance: Dom;

    _Lang: Lang;

    static get instance(): Dom {
        if (!Dom._instance) {
            Dom._instance = new Dom();
        }
        return Dom._instance;
    }


    private constructor() {
        this._Lang = Lang.instance;
    }

    runCss(item: HTMLElement) {

        let UDEF = "undefined",
            // _RT = this._RT,
            _Lang = this._Lang,
            applyStyle = function (item: HTMLElement, style: string) {
                let newSS: HTMLStyleElement = document.createElement("style");
                document.getElementsByTagName("head")[0].appendChild(newSS);

                let styleSheet = newSS.sheet ? newSS.sheet : (<any>newSS).styleSheet;

                newSS.setAttribute("rel", item.getAttribute("rel") || "stylesheet");
                newSS.setAttribute("type", item.getAttribute("type") || "text/css");

                if (UDEF != typeof styleSheet.cssText) {
                    styleSheet.cssText = style;
                } else {
                    newSS.appendChild(document.createTextNode(style));
                }


            },

            execCss = function (item: HTMLElement) {
                let equalsIgnoreCase = _Lang.equalsIgnoreCase;
                let tagName = item.tagName;
                if (tagName && equalsIgnoreCase(tagName, "link") && equalsIgnoreCase(item.getAttribute("type"), "text/css")) {
                    applyStyle(item, "@import url('" + item.getAttribute("href") + "');");
                } else if (tagName && equalsIgnoreCase(tagName, "style") && equalsIgnoreCase(item.getAttribute("type"), "text/css")) {
                    let innerText = [];
                    //compliant browsers know child nodes
                    let childNodes: NodeList = item.childNodes;
                    if (childNodes) {
                        let len = childNodes.length;
                        for (let cnt = 0; cnt < len; cnt++) {
                            innerText.push((<HTMLElement>childNodes[cnt]).innerHTML || (<CharacterData>childNodes[cnt]).data);
                        }
                        //non compliant ones innerHTML
                    } else if (item.innerHTML) {
                        innerText.push(item.innerHTML);
                    }

                    applyStyle(item, innerText.join(""));
                }
            };

        try {
            let scriptElements: NodeListOf<Element> = document.querySelectorAll("link, style");
            if (scriptElements == null) return;
            for (let cnt = 0; cnt < scriptElements.length; cnt++) {
                let element: any = scriptElements[cnt];
                execCss(element);
            }

        } finally {
            //the usual ie6 fix code
            //the IE6 garbage collector is broken
            //nulling closures helps somewhat to reduce
            //mem leaks, which are impossible to avoid
            //at this browser
            execCss = null;
            applyStyle = null;
        }
    }

    /**
     * Run through the given Html item and execute the inline scripts
     * (IE doesn't do this by itself)
     * @param {Node} item
     */
    runScripts(item: HTMLElement, xmlData: Node) {
        let _Lang = this._Lang,
            _RT = this._RT,
            finalScripts = [],
            execScrpt = function (item) {
                let tagName = item.tagName;
                let itemType = item.type || "";
                if (tagName && _Lang.equalsIgnoreCase(tagName, "script") &&
                    (itemType === "" || _Lang.equalsIgnoreCase(itemType, "text/javascript") ||
                    _Lang.equalsIgnoreCase(itemType, "javascript") ||
                    _Lang.equalsIgnoreCase(itemType, "text/ecmascript") ||
                    _Lang.equalsIgnoreCase(itemType, "ecmascript"))) {
                    let src = item.getAttribute('src');
                    if ('undefined' != typeof src
                        && null != src
                        && src.length > 0
                    ) {
                        //we have to move this into an inner if because chrome otherwise chokes
                        //due to changing the and order instead of relying on left to right
                        //if jsf.js is already registered we do not replace it anymore
                        if ((src.indexOf("ln=scripts") == -1 && src.indexOf("ln=javax.faces") == -1) || (src.indexOf("/jsf.js") == -1
                            && src.indexOf("/jsf-uncompressed.js") == -1)) {
                            if (finalScripts.length) {
                                //script source means we have to eval the existing
                                //scripts before running the include
                                _RT.globalEval(finalScripts.join("\n"));

                                finalScripts = [];
                            }
                            _RT.loadScriptEval(src, item.getAttribute('type'), false, "UTF-8", false);
                        }

                    } else {
                        // embedded script auto eval
                        let test = (!xmlData) ? item.text : _Lang.serializeChilds(item);
                        let go = true;
                        while (go) {
                            go = false;
                            if (test.substring(0, 1) == " ") {
                                test = test.substring(1);
                                go = true;
                            }
                            if (test.substring(0, 4) == "<!--") {
                                test = test.substring(4);
                                go = true;
                            }
                            if (test.substring(0, 11) == "//<![CDATA[") {
                                test = test.substring(11);
                                go = true;
                            }
                        }
                        // we have to run the script under a global context
                        //we store the script for less calls to eval
                        finalScripts.push(test);

                    }
                }
            };
        try {
            let scriptElements = item.querySelectorAll("script");
            if (scriptElements == null) return;
            for (let cnt = 0; cnt < scriptElements.length; cnt++) {
                execScrpt(scriptElements[cnt]);
            }
            if (finalScripts.length) {
                _RT.globalEval(finalScripts.join("\n"));
            }
        } catch (e) {
            if (window.console && window.console.error) {
                //not sure if we
                //should use our standard
                //error mechanisms here
                //because in the head appendix
                //method only a console
                //error would be raised as well
                console.error(e.message || e.description);
            } else {
                if (jsf.getProjectStage() === "Development") {
                    alert("Error in evaluated javascript:" + (e.message || e.description));
                }
            }
        } finally {
            //the usual ie6 fix code
            //the IE6 garbage collector is broken
            //nulling closures helps somewhat to reduce
            //mem leaks, which are impossible to avoid
            //at this browser
            execScrpt = null;
        }
    }


    getWindowId(node?: HTMLElement | string) {
        let FORM = "form";
        let WIN_ID = "javax.faces.WindowId";

        let fetchWindowIdFromForms = function (forms) {
            let result_idx = {};
            let result;
            let foundCnt = 0;
            for (let cnt = forms.length - 1; cnt >= 0; cnt--) {
                let UDEF = 'undefined';
                let currentForm = forms[cnt];
                let windowId = currentForm[WIN_ID] && currentForm[WIN_ID].value;
                if (UDEF != typeof windowId) {
                    if (foundCnt > 0 && UDEF == typeof result_idx[windowId]) throw Error("Multiple different windowIds found in document");
                    result = windowId;
                    result_idx[windowId] = true;
                    foundCnt++;
                }
            }
            return result;
        };

        let getChildForms = function (currentElement:HTMLElement):Array<HTMLElement> {
            //Special condition no element we return document forms
            //as search parameter, ideal would be to
            //have the viewroot here but the frameworks
            //can deal with that themselves by using
            //the viewroot as currentElement
            if (!currentElement) {
                return Lang.instance.objToArray(document.forms);
            }

            let targetArr:Array<HTMLElement> = [];
            if (!currentElement.tagName) return [];
            else if (currentElement.tagName.toLowerCase() == FORM) {
                targetArr.push(currentElement);
                return targetArr;
            }

            //if query selectors are supported we can take
            //a non recursive shortcut
            return Lang.instance.objToArray(currentElement.querySelectorAll(FORM));
        };

        let fetchWindowIdFromURL = function () {
            let href = window.location.href;
            let windowId = "windowId";
            let regex = new RegExp("[\\?&]" + windowId + "=([^&#\\;]*)");
            let results = regex.exec(href);
            //initial trial over the url and a regexp
            if (results != null) return results[1];
            return null;
        };

        //byId ($)
        if(node) {
            let finalNode:HTMLElement = <HTMLElement> this.byId(node);
            let forms = getChildForms(finalNode);
            let result = fetchWindowIdFromForms(forms);
            return (null != result) ? result : fetchWindowIdFromURL();
        } else {
            return fetchWindowIdFromURL();
        }
    }

    byId(node: HTMLElement | string):HTMLElement {
        return <HTMLElement> ((node && (typeof node == "string" || node instanceof String)) ?
            document.getElementById(<string>node) : (node || null));
    }

    byTagName(node: HTMLElement | string, tagName: string):Array<HTMLElement> {
        let finalNode = this.byId(node);
        return (finalNode.tagName === tagName) ? [finalNode] : Lang.instance.objToArray(finalNode.querySelectorAll(tagName));
    }

    isMultipartCandidate(executes: Array<HTMLElement | string> | string) {
        if (Lang.instance.isString(executes)) {
            executes = Lang.instance.strToArray(<string> executes, /\s+/);
        }

        for (let cnt = 0, len = executes.length; cnt < len ; cnt ++) {
            let element = this.byId(executes[cnt]);
            let inputs = this.byTagName(element, "input");
            for (let cnt2 = 0, len2 = inputs.length; cnt2 < len2 ; cnt2++) {
                if (inputs[cnt2].getAttribute("type") == "file") return true;
            }
        }
        return false;
    }

}