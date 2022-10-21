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
 * Basic internal types used
 *
 * This file is only to eliminate various any calls into
 * window, jsf and myfaces and make also the calls into
 * the apis from a an extended window context in a type safe
 * way
 *
 * We use this trick to map the types into the modules
 * which we need to produce proper jsdoc files
 */
declare global {

    type Producer<T> = () => T;
    type Consumer<T> = (s?: T) => void;
    type Runnable = () => any;
    type Transformable<S, T> = (s: S) => T;

    type AssocArr<T> = { [key: string]: T };

    type EvalFuncs = Array<Function | string>;
    type Options = { [key: string]: string | Function | { [key: string]: string | Function } };
    type Context = AssocArr<any>;
    type ElemDef = Element | string;


    /**
     *  * <ul>
     *     <li> errorData.type : &quot;error&quot;</li>
     *     <li> errorData.status : the error status message</li>
     *     <li> errorData.serverErrorName : the server error name in case of a server error</li>
     *     <li> errorData.serverErrorMessage : the server error message in case of a server error</li>
     *     <li> errorData.source  : the issuing source element which triggered the requestInternal </li>
     *     <li> eventData.responseCode: the response code (aka http requestInternal response code, 401 etc...) </li>
     *     <li> eventData.responseText: the requestInternal response text </li>
     *     <li> eventData.responseXML: the requestInternal response xml </li>
     * </ul>
     */
    interface IErrorData {
        type: any;
        status: string;
        serverErrorName: string;
        serverErrorMessage: string;
        source: any;

        responseCode: string;
        responseText: string;
        responseXML: string;
    }

    /**
     * <ul>
     *     <li>status: status of the ajax cycle</li>
     * </ul>
     */
    interface IEventData {
        status: String;
        source: any;
    }

    /*! Licensed to the Apache Software Foundation (ASF) under one or more
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
     * interface definitions to make the code more compiler typesafe
     */

    interface Ajax {
        request(element: Element, event?: Event, options?: Context): void;

        response(request: XMLHttpRequest, context?: Context): void;
    }

    interface Util {
        chain(source, event, ...funcs: Array<Function | string>): boolean;
    }

    interface Push {
        init(socketClientId: string,
             uri: string,
             channel: string,
             onopen: Function,
             onmessage: Function,
             onclose: Function,
             behaviorScripts: any,
             autoconnect: boolean): void;

        open(socketClientId: string);

        close(socketClientId: string): void;
    }


    interface FacesAPI {
        contextpath: string;
        specversion: number;
        implversion: number;
        separatorchar: string;

        getProjectStage(): string;
        getViewState(formElement: Element | string): string;
        getClientWindow(rootNode?: Element | string): string;
        getSeparatorChar(): string;
        response(request: XMLHttpRequest, context?: Context): void;
        addOnError(errorFunc: (data: IErrorData) => void): void;
        addOnEvent(eventFunc: (data: IEventData) => void): void;

        ajax: Ajax;
        util: Util;
        push: Push;
    }

    interface OAM {
        clearHiddenInput(formName: string, name: string): void;
        setHiddenInput(formName: string, name: string, value: string): void;
        submitForm(formName: string, linkId: string, target: string, params: { [key: string]: any }): boolean;
    }

    interface MyFacesAPI {
        ab(source: Element, event: Event, eventName: string, execute: string, render: string, options: Context): void;

        config: { [key: string]: any };
        oam: OAM;
        core: {
            config ?: {[key: string]: any};
        };
    }

    let myfaces: MyFacesAPI;
    let jsf: FacesAPI;
    let faces: FacesAPI;
    // special trick, the typscript compiler treats window as Window
    interface Window {
        myfaces: MyFacesAPI,
        faces: FacesAPI,
        jsf: FacesAPI,
        XMLHttpRequest: XMLHttpRequest,
        called: { [key: string]: any }
    }
}
// this is needed to tell the compiler that we have an ambient
// module, otherwise the global overload would produce an error
// noinspection JSUnusedGlobalSymbols
export var __my_faces_ambient_module_glob_;