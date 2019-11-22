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
import {Assertions} from "../util/Assertions";
import failSaveExecute = ExtLang.failSaveExecute;
import getPromise = ExtLang.getPromise;
import COMPLETE = Const.COMPLETE;
import NO_TIMEOUT = Const.NO_TIMEOUT;
import REQ_TYPE_POST = Const.REQ_TYPE_POST;
import URL_ENCODED = Const.URL_ENCODED;
import ON_EVENT = Const.ON_EVENT;
import ON_ERROR = Const.ON_ERROR;
import MULTIPART = Const.MULTIPART;
import CTX_PARAM_PASS_THR = Const.CTX_PARAM_PASS_THR;
import CTX_PARAM_MF_INTERNAL = Const.CTX_PARAM_MF_INTERNAL;
import CONTENT_TYPE = Const.CONTENT_TYPE;
import HEAD_FACES_REQ = Const.HEAD_FACES_REQ;
import VAL_AJAX = Const.VAL_AJAX;
import STATE_EVT_TIMEOUT = Const.STATE_EVT_TIMEOUT;
import REQ_ACCEPT = Const.REQ_ACCEPT;
import STD_ACCEPT = Const.STD_ACCEPT;
import REQ_TYPE_GET = Const.REQ_TYPE_GET;
import ENCODED_URL = Const.ENCODED_URL;
import BEGIN = Const.BEGIN;
import MALFORMEDXML = Const.MALFORMEDXML;
import ERROR = Const.ERROR;


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

    /** predefined method */


    private xhrPromise: Promise<XMLHttpRequest>;



    private responseContext: Config;

    private stopProgress = false;

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
        private timeout = NO_TIMEOUT,
        private ajaxType = REQ_TYPE_POST,
        private contentType = URL_ENCODED,
        private xhrObject = new XMLHttpRequest()
    ) {

    }

    start(): AsyncRunnable<XMLHttpRequest> {

        let fsExec = failSaveExecute;
        let xhrObject = this.xhrObject;

        try {

            let viewState = jsf.getViewState(this.sourceForm.getAsElem(0).value);
            let formData: XhrFormData = new XhrFormData(viewState);

            this.contentType = formData.isMultipartRequest ? MULTIPART : this.contentType;

            //next step the pass through parameters are merged in for post params
            let requestContext = this.requestContext;
            let passThroughParams = requestContext.getIf(CTX_PARAM_PASS_THR);
            formData.shallowMerge(passThroughParams);

            this.responseContext = passThroughParams.deepCopy;

            //we have to shift the internal passthroughs around to build up our response context
            let responseContext = this.responseContext;

            responseContext.assign(CTX_PARAM_MF_INTERNAL).value = this.internalContext.value;

            //per spec the onevent and onerrors must be passed through to the response
            responseContext.assign(ON_EVENT).value = requestContext.getIf(ON_EVENT).value;
            responseContext.assign(ON_ERROR).value = requestContext.getIf(ON_ERROR).value;

            xhrObject.open(this.ajaxType, this.resolveFinalUrl(formData), true);

            //adding timeout
            this.timeout ? xhrObject.timeout = this.timeout : null;

            //a bug in the xhr stub library prevents the setRequestHeader to be properly executed on fake xhr objects
            //normal browsers should resolve this
            //tests can quietly fail on this one

            fsExec(() => xhrObject.setRequestHeader(CONTENT_TYPE, `${this.contentType}; charset=utf-8`));
            fsExec(() => xhrObject.setRequestHeader(HEAD_FACES_REQ, VAL_AJAX));

            //probably not needed anymore, will test this
            //some webkit based mobile browsers do not follow the w3c spec of
            // setting the accept headers automatically
            fsExec(() => xhrObject.setRequestHeader(REQ_ACCEPT, STD_ACCEPT));

            this.sendEvent(BEGIN);

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

    /*
     * Promise bindings
     *
     * We have to delegate a few calls to our promise
     * to make the callback from the outside and inside work with our
     * xhr promise
     *
     */
    protected get $promise(): Promise<any> {
        if (!this.xhrPromise) {
            this.xhrPromise = new (getPromise())((resolve: Consumer<any>, reject: Consumer<any>) => {
                //to allow callback into xhr over promises
                //we have to register the callbacks
                //accordingly
                this.registerXhrCallbacks(resolve, reject);
            });
        }
        return this.xhrPromise;
    }

    catch(func: (data: any) => any): AsyncRunnable<XMLHttpRequest> {
        this.$promise.catch(func);
        return this;
    }

    finally(func: () => void): AsyncRunnable<XMLHttpRequest> {
        //no ie11 support we probably are going to revert to shims for that one
        (<any>this.$promise).finally(func);
        return this;
    }

    then(func: (data: any) => any): AsyncRunnable<XMLHttpRequest> {
        this.$promise.then(func);
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
        this.sendEvent(STATE_EVT_TIMEOUT);
        reject();
    }

    protected onSuccess(data: any, resolve: Consumer<any>, reject: Consumer<any>) {

        this.sendEvent(COMPLETE);

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
            type: ERROR,
            status: MALFORMEDXML,
            responseCode: 200,
            responseText: this.xhrObject?.responseText,
            source: {
                id: this.source.id.value
            }
        };
        try {
            this.handleError(errorData);
        }
        finally {
            try {
                Implementation.sendError(errorData);
            } finally {
                resolve(errorData);
            }
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
            let eventHandler = this.resolveHandlerFunc(ON_EVENT);;
            Implementation.sendEvent(eventData,  eventHandler);
        } catch (e) {
            this.handleError(e);
            throw e;
        }
    }

    private handleError(exception) {
        let errorData = ErrorData.fromClient(exception);

        let eventHandler = this.resolveHandlerFunc(ON_ERROR);
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
                .orElse(function () {}).value;
    }

    private resolveTargetUrl(srcFormElement: HTMLFormElement) {
        return (typeof srcFormElement.elements[ENCODED_URL] == 'undefined') ?
            srcFormElement.action :
            srcFormElement.elements[ENCODED_URL].value;
    }

    protected sendRequest(formData: XhrFormData) {
        let isPost = this.ajaxType != REQ_TYPE_GET;
        if(formData.isMultipartRequest) {
            this.xhrObject.send((isPost) ? formData.toFormData() : null);
        } else {
            this.xhrObject.send((isPost) ? formData.toString() : null);
        }
    }

    private resolveFinalUrl(formData: XhrFormData) {
        let targetUrl = this.resolveTargetUrl(<HTMLFormElement>this.sourceForm.getAsElem(0).value);

        return targetUrl + (this.ajaxType == REQ_TYPE_GET ? "?" + formData.toString() : "");
    }



}