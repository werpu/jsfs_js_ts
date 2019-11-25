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


import {AsyncRunnable} from "../util/AsyncRunnable";
import {Config} from "../../ext/monadish/Monad";
import {Implementation} from "../AjaxImpl";

import {Const} from "../core/Const";
import {XhrFormData} from "./XhrFormData";
import {ErrorData} from "./ErrorData";
import {EventData} from "./EventData";
import {DQ} from "../../ext/monadish/DomQuery";
import {ExtLang} from "../util/Lang";
import {Stream} from "../../ext/monadish";
import failSaveExecute = ExtLang.failSaveExecute;



/**
 * JSFed XHR Request Wrapper
 * as Asyncrunnable for our Asynchronous queue
 *
 * The idea is that we basically just enqueue
 * a single ajax request into our queue
 * and let the queue do the processing.
 *
 */

declare let jsf: any;



export class XhrRequest implements AsyncRunnable<XMLHttpRequest> {

    private responseContext: Config;

    private stopProgress = false;

    /**
     * helper support so that we do not have to drag in Promise shims
     */
    private catchFuncs: Array<Function> = [];
    private  thenFunc: Array<Function> = [];

    /**
     * Reqired Parameters
     *
     * @param source the issuing element
     * @param sourceForm the form which is related to the issuing element
     * @param requestContext the request context with allö pass through values
     *
     * Optional Parameters
     *
     * @param partialIdsArray an optional restricting partial ids array for encoding
     * @param timeout optional xhr timeout
     * @param ajaxType optional request type, default "POST"
     * @param contentType optional content type, default "application/x-www-form-urlencoded"
     * @param xhrObject optional xhr object which must fullfill the XMLHTTPRequest api, default XMLHttpRequest
     */
    constructor(
        private source: DQ,
        private sourceForm: DQ,
        private requestContext: Config,
        private internalContext: Config,
        private partialIdsArray = [],
        private timeout = Const.NO_TIMEOUT,
        private ajaxType = Const.REQ_TYPE_POST,
        private contentType = Const.URL_ENCODED,
        private xhrObject = new XMLHttpRequest()
    ) {
        /*
        * we omit promises here
        * some browsers do not support it and we do not need shim code
        */
        this.registerXhrCallbacks((data: any) => {this.resolve(data)}, (data: any) => {this.reject(data)});
    }

    start(): AsyncRunnable<XMLHttpRequest> {

        let fsExec = failSaveExecute;
        let xhrObject = this.xhrObject;

        try {

            let viewState = jsf.getViewState(this.sourceForm.getAsElem(0).value);
            let formData: XhrFormData = new XhrFormData(viewState);

            this.contentType = formData.isMultipartRequest ? Const.MULTIPART : this.contentType;

            //next step the pass through parameters are merged in for post params
            let requestContext = this.requestContext;
            let passThroughParams = requestContext.getIf(Const.CTX_PARAM_PASS_THR);
            formData.shallowMerge(passThroughParams);

            this.responseContext = passThroughParams.deepCopy;

            //we have to shift the internal passthroughs around to build up our response context
            let responseContext = this.responseContext;

            responseContext.assign(Const.CTX_PARAM_MF_INTERNAL).value = this.internalContext.value;

            //per spec the onevent and onerrors must be passed through to the response
            responseContext.assign(Const.ON_EVENT).value = requestContext.getIf(Const.ON_EVENT).value;
            responseContext.assign(Const.ON_ERROR).value = requestContext.getIf(Const.ON_ERROR).value;

            xhrObject.open(this.ajaxType, this.resolveFinalUrl(formData), true);

            //adding timeout
            this.timeout ? xhrObject.timeout = this.timeout : null;

            //a bug in the xhr stub library prevents the setRequestHeader to be properly executed on fake xhr objects
            //normal browsers should resolve this
            //tests can quietly fail on this one

            fsExec(() => xhrObject.setRequestHeader(Const.CONTENT_TYPE, `${this.contentType}; charset=utf-8`));
            fsExec(() => xhrObject.setRequestHeader(Const.HEAD_FACES_REQ, Const.VAL_AJAX));

            //probably not needed anymore, will test this
            //some webkit based mobile browsers do not follow the w3c spec of
            // setting the accept headers automatically
            fsExec(() => xhrObject.setRequestHeader(Const.REQ_ACCEPT, Const.STD_ACCEPT));

            this.sendEvent(Const.BEGIN);

            this.sendRequest(formData);

        } catch (e) {
            //_onError//_onError
            this.handleError(e);
        }
        return this;
    }

    cancel() {
        try {
            this.xhrObject.abort();
        } catch (e) {
            this.handleError(e);
        }
    }

    resolve(data: any) {
        Stream.of(...this.thenFunc).reduce((inputVal: any, thenFunc: any) => {
            return thenFunc(inputVal);
        }, data);
    }

    reject(data: any) {
        Stream.of(...this.catchFuncs).reduce((inputVal: any, catchFunc: any) => {
            return catchFunc(inputVal);
        }, data);
    }


    catch(func: (data: any) => any): AsyncRunnable<XMLHttpRequest> {
        //this.$promise.catch(func);
        this.catchFuncs.push(func);
        return this;
    }

    finally(func: () => void): AsyncRunnable<XMLHttpRequest> {
        //no ie11 support we probably are going to revert to shims for that one
        //(<any>this.$promise).then(func).catch(func);
        this.catchFuncs.push(func);
        this.thenFunc.push(func);
        return this;
    }

    then(func: (data: any) => any): AsyncRunnable<XMLHttpRequest> {
        //this.$promise.then(func);
        this.thenFunc.push(func);
        return this;
    }

    /**
     * attaches the internal event and processing
     * callback within the promise to our xhr object
     *
     * @param resolve
     * @param reject
     */
    protected registerXhrCallbacks(resolve: Consumer<any>, reject: Consumer<any>) {
        let xhrObject = this.xhrObject;

        xhrObject.onabort = () => {
            this.onAbort(resolve, reject);
        };
        xhrObject.ontimeout = () => {
            this.onTimeout(resolve, reject);
        };
        xhrObject.onload = () => {
            this.onSuccess(this.xhrObject, resolve, reject)
        };
        xhrObject.onloadend = () => {
            this.onDone(this.xhrObject, resolve, reject);
        };
        xhrObject.onerror = (errorData: any) => {
            this.onError(errorData, resolve, reject);
        };
    }

    /*
     * xhr processing callbacks
     *
     * Those methods are the callbacks called by
     * the xhr object depending on its own state
     */

    protected onAbort(resolve: Consumer<any>, reject: Consumer<any>) {
        reject();
    }

    protected onTimeout(resolve: Consumer<any>, reject: Consumer<any>) {
        this.sendEvent(Const.STATE_EVT_TIMEOUT);
        reject();
    }

    protected onSuccess(data: any, resolve: Consumer<any>, reject: Consumer<any>) {

        this.sendEvent(Const.COMPLETE);

        //malforms always result in empty response xml
        if(!this?.xhrObject?.responseXML) {
            this.handleMalFormedXML(resolve);
            return;
        }

        jsf.ajax.response(this.xhrObject, this.responseContext.value ?? {});
    }

    private handleMalFormedXML(resolve: Function) {
        this.stopProgress = true;
        let errorData = {
            type: Const.ERROR,
            status: Const.MALFORMEDXML,
            responseCode: 200,
            responseText: this.xhrObject?.responseText,
            source: {
                id: this.source.id.value
            }
        };
        try {
            Implementation.sendError(errorData);
        } finally {
            resolve(errorData);
        }
        //non blocking non clearing
    }

    protected onDone(data: any, resolve: Consumer<any>, reject: Consumer<any>) {
        if(this.stopProgress) {
            return;
        }
        resolve(data);
    }

    protected onError(errorData: any, resolve: Consumer<any>, reject: Consumer<any>) {
        this.handleError(errorData);
        reject();
    }

    /*
     * other helpers
     */
    private sendEvent(evtType: string) {
        let eventData = EventData.createFromRequest(this.xhrObject, this.requestContext, evtType);
        try {
            //user code error, we might cover
            //this in onError but also we cannot swallow it
            //we need to resolve the local handlers lazyly,
            //because some frameworks might decorate them over the context in the response
            let eventHandler = this.resolveHandlerFunc(Const.ON_EVENT);;
            Implementation.sendEvent(eventData,  eventHandler);
        } catch (e) {
            this.handleError(e);
            throw e;
        }
    }

    private handleError(exception) {
        let errorData = ErrorData.fromClient(exception);

        let eventHandler = this.resolveHandlerFunc(Const.ON_ERROR);
        Implementation.sendError(errorData, eventHandler);
    }

    /**
     * resolves the event handlers lazly
     * so that if some decoration happens in between we can deal with it
     *
     * @param funcName
     */
    private resolveHandlerFunc(funcName: string) {
        return this.responseContext.getIf(funcName)
                .orElse(this.requestContext.getIf(funcName).value)
                .orElse(Const.EMPTY_FUNC).value;
    }

    private resolveTargetUrl(srcFormElement: HTMLFormElement) {
        return (typeof srcFormElement.elements[Const.ENCODED_URL] == 'undefined') ?
            srcFormElement.action :
            srcFormElement.elements[Const.ENCODED_URL].value;
    }

    protected sendRequest(formData: XhrFormData) {
        let isPost = this.ajaxType != Const.REQ_TYPE_GET;
        if(formData.isMultipartRequest) {
            this.xhrObject.send((isPost) ? formData.toFormData() : null);
        } else {
            this.xhrObject.send((isPost) ? formData.toString() : null);
        }
    }

    private resolveFinalUrl(formData: XhrFormData) {
        let targetUrl = this.resolveTargetUrl(<HTMLFormElement>this.sourceForm.getAsElem(0).value);

        return targetUrl + (this.ajaxType == Const.REQ_TYPE_GET ? "?" + formData.toString() : "");
    }

}