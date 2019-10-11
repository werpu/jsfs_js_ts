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

///<reference path='./_apiInterfaces.ts'/>
///<reference types='../../Types/Types'/>

import {Implementation} from "../impl/Impl";

declare let window: any;
declare type Context = {[key: string]: any};
const Impl = Implementation.instance;


export module jsf {
    "use strict";




    /*
     * Version of the implementation for the jsf.js.
     * <p />
     * as specified within the jsf specifications jsf.html:
     * <ul>
     * <li>left two digits major release number</li>
     * <li>middle two digits minor spec release number</li>
     * <li>right two digits bug release number</li>
     * </ul>
     * @constant
     */
    export var specversion = 220000;
    /**
     * Implementation version as specified within the jsf specification.
     * <p />
     * A number increased with every implementation version
     * and reset by moving to a new spec release number
     *
     * @constant
     */
    export var implversion = 0;

    /**
     * SeparatorChar as defined by UINamingContainer.getNamingContainerSeparatorChar()
     * @type {Char}
     */
    export var separatorchar = getSeparatorChar();

    /**
     * This method is responsible for the return of a given project stage as defined
     * by the jsf specification.
     * <p/>
     * Valid return values are:
     * <ul>
     *     <li>&quot;Production&quot;</li>
     *     <li>&quot;Development&quot;</li>
     *     <li>&quot;SystemTest&quot;</li>
     *     <li>&quot;UnitTest&quot;</li>
     * </li>
     *
     * @return {String} the current project state emitted by the server side method:
     * <i>javax.faces.application.Application.getProjectStage()</i>
     */
    export function getProjectStage(): string {
        return Impl.getProjectStage();
    }

    /**
     * collect and encode data for a given form element (must be of type form)
     * find the javax.faces.ViewState element and encode its value as well!
     * return a concatenated string of the encoded values!
     *
     * @throws an exception in case of the given element not being of type form!
     * https://issues.apache.org/jira/browse/MYFACES-2110
     */
    export function getViewState(formElement: any): string {
        return null;
    }

    /**
     * returns the window identifier for the given node / window
     * @param {optional String | DomNode}  the node for which the client identifier has to be determined
     * @return the window identifier or null if none is found
     */
    export function getClientWindow(rootNode?: Element | String): string {
        return null;
    }

    //private helper functions
    function getSeparatorChar() {
        return Impl.separatorChar;
    }

    //We hook the old namespace system into our npm system
    if("undefined" == window.jsf) {
        window.jsf = jsf;
    }

    export module ajax {
        "use strict";

        /**
         * this function has to send the ajax requests
         *
         * following requestInternal conditions must be met:
         * <ul>
         *  <li> the requestInternal must be sent asynchronously! </li>
         *  <li> the requestInternal must be a POST!!! requestInternal </li>
         *  <li> the requestInternal url must be the form action attribute </li>
         *  <li> all requests must be queued with a client side requestInternal queue to ensure the requestInternal ordering!</li>
         * </ul>
         *
         * @param {String|Node} element: any dom element no matter being it html or jsf, from which the event is emitted
         * @param {EVENT} event: any javascript event supported by that object
         * @param {Map} options : map of options being pushed into the ajax cycle
         */
        export function request(element: Element, event?: Event, options?: Context | {[key: string]: any}) {
            Impl.request(element, event, options)
             //Implementation.getInstance().requestInternal(element, event, options);
        }

        /**
         * response handler
         * @param request the request object having triggered this response
         * @param context the request context
         *
         * TODO add info on what can be in the context
         */
        export function response(request: XMLHttpRequest, context?: Context  | {[key: string]: any}) {
            Impl.response(request, response);
        }

        /**
         * Adds an error handler to our global error queue.
         * the error handler must be of the format <i>function errorListener(&lt;errorData&gt;)</i>
         * with errorData being of following format:
         * <ul>
         *     <li> errorData.type : &quot;error&quot;</li>
         *     <li> errorData.status : the error status message</li>
         *     <li> errorData.serverErrorName : the server error name in case of a server error</li>
         *     <li> errorData.serverErrorMessage : the server error message in case of a server error</li>
         *     <li> errorData.source  : the issuing source element which triggered the requestInternal </li>
         *     <li> eventData.responseCode: the response code (aka http requestInternal response code, 401 etc...) </li>
         *     <li> eventData.responseText: the requestInternal response text </li>
         *     <li> eventData.responseXML: the requestInternal response xml </li>
         * </ul>
         *
         * @param {function} errorListener error handler must be of the format <i>function errorListener(&lt;errorData&gt;)</i>
         */
        export function addOnError( errorFunc: (data: _apiInterfaces.ErrorData) => void) {
            Impl.addOnError(<any> errorFunc);
        }

        /**
         * Adds a global event listener to the ajax event queue. The event listener must be a function
         * of following format: <i>function eventListener(&lt;eventData&gt;)</i>
         *
         * @param {function} eventListener event must be of the format <i>function eventListener(&lt;eventData&gt;)</i>
         */
        export function addOnEvent( eventFunc: (data: _apiInterfaces.EventData) => void) {
            Impl.addOnEvent(<any> eventFunc);
        }
    }

    export class util {


        /**
         * varargs function which executes a chain of code (functions or any other code)
         *
         * if any of the code returns false, the execution
         * is terminated prematurely skipping the rest of the code!
         *
         * @param {DomNode} source, the callee object
         * @param {Event} event, the event object of the callee event triggering this function
         *
         */
        static chain(source, event, ...funcs : Array<Function | string>): boolean {
            return Impl.chain(source, event, ...funcs);
        }
    }
}

//fullfill the window contract
if(!window.jsf) {
    window.jsf = jsf;
}



