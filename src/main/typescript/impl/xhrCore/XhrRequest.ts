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

import {Lang} from "../util/Lang";
import {LangTypes} from "../util/LangTypes";
import {AsyncRunnable} from "../util/AsyncRunnable";
import {Config} from "../../_ext/monadish/Monad";
import {Implementation} from "../Impl";
import {DomQuery} from "../../_ext/monadish/DomQuery";
import {Const} from "../core/Const";
import {XhrFormData} from "./XhrFormData";

type PROMISE_FUNC = (any?) => void;

/**
 * JSFed XHR Request Wrapper
 * as Asyncrunnable for our Asynchronous queue
 *
 * The idea is that we basically just enqueue
 * a single ajax request into our queue
 * and let the queue do the processing.
 *
 */
export class XhrRequest implements AsyncRunnable<XMLHttpRequest> {

    /** predefined method */


    private xhrPromise: Promise<XMLHttpRequest>;

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
        private source: DomQuery,
        private sourceForm: DomQuery,
        private requestContext: Config,
        private partialIdsArray = [],
        private timeout = Const.NO_TIMEOUT,
        private ajaxType = Const.REQ_TYPE_POST,
        private contentType = Const.URL_ENCODED,
        private xhrObject = new XMLHttpRequest()
    ) {
    }

    start(): Promise<XMLHttpRequest> {
        let _Lang = Lang.instance;
        try {
            let formData: XhrFormData = new XhrFormData(this.sourceForm, this.source);

            //next step the pass through parameters are merged in for post params
            formData.shallowMerge(this.requestContext.getIf(Const.CTX_PARAM_PASS_THR));

            this.xhrObject.open(this.ajaxType, this.resolveFinalUrl(formData), true);

            //adding timeout
            if (this.timeout) {
                this.xhrObject.timeout = this.timeout;
            }

            //a bug in the xhr stub library prevents the setRequestHeader to be properly executed on fake xhr objects
            //normal browsers should resolve this
            //tests can quietly fail on this one
            Lang.faileSaveExecute(() => this.xhrObject.setRequestHeader(Const.CONTENT_TYPE, `${this.contentType}; charset=utf-8"`));
            Lang.faileSaveExecute(() => this.xhrObject.setRequestHeader(Const.HEAD_FACES_REQ, Const.VAL_AJAX));

            //probably not needed anymore, will test this
            //some webkit based mobile browsers do not follow the w3c spec of
            // setting the accept headers automatically
            Lang.faileSaveExecute(() => this.xhrObject.setRequestHeader(Const.REQ_ACCEPT,Const.STD_ACCEPT));

            this.sendEvent(Const.STATE_EVT_BEGIN);

            this.sendRequest(formData);

        } catch (e) {
            //_onError//_onError
            e = (e._mfInternal) ? e : _Lang.makeException(new Error(), "sendError", "sendError", "XHRPromise", "send", e.message);
            this.handleError(e);
        }
        return this.$promise;
    }



    onAbort(resolve: PROMISE_FUNC, reject: PROMISE_FUNC) {
        reject();
    }

    onTimeout(resolve: PROMISE_FUNC, reject: PROMISE_FUNC) {
        this.sendEvent(Const.STATE_EVT_TIMEOUT);
        reject();
    }

    onSuccess(data: any, resolve: PROMISE_FUNC, reject: PROMISE_FUNC) {
        this.sendEvent(Const.STATE_EVT_COMPLETE);
        this.requestContext.apply("_mfInternal").value = this.requestContext.getIf("_mfInternal").get({}).value;
        (<any>window).jsf.ajax.response(this.xhrObject, this.requestContext);
    }

    onDone(data: any, resolve: PROMISE_FUNC, reject: PROMISE_FUNC) {
        resolve(data);
    }

    onError(errorData: any, resolve: PROMISE_FUNC, reject: PROMISE_FUNC) {
        this.handleError(errorData);
        reject();
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

    get $promise(): Promise<any> {
        if (!this.xhrPromise) {
            this.xhrPromise = new Lang.Promise((resolve: PROMISE_FUNC, reject: PROMISE_FUNC) => {
                this.registerXhrCallbacks(resolve, reject);
            });
        }
        return this.xhrPromise;
    }

    /**
     * attaches the internal event and processing
     * callback within the promise to our xhr object
     * @param resolve
     * @param reject
     */
    private registerXhrCallbacks(resolve: PROMISE_FUNC, reject: PROMISE_FUNC) {
        this.xhrObject.onabort = () => {
            this.onAbort(resolve, reject);
        };
        this.xhrObject.ontimeout = () => {
            this.onTimeout(resolve, reject);
        };
        this.xhrObject.onload = () => {
            this.onSuccess(this.xhrObject, resolve, reject)
        };
        this.xhrObject.onloadend = () => {
            this.onDone(this.xhrObject, resolve, reject);
        };
        this.xhrObject.onerror = (errorData: any) => {
            this.onError(errorData, resolve, reject);
        };
    }

    private sendEvent(evtType: string) {
        Implementation.instance.sendEvent(this.xhrObject, this.requestContext, Implementation[evtType]);
    }

    private handleError(exception) {
        Implementation.instance.stdErrorHandler(this.xhrObject, this.requestContext, exception, true);
    }

    private resolveTargetUrl(srcFormElement: HTMLFormElement) {
        return (typeof srcFormElement.elements[Const.ENCODED_URL] == 'undefined') ?
            srcFormElement.action :
            srcFormElement.elements[Const.ENCODED_URL].value;
    }

    protected sendRequest(formData: XhrFormData) {
        this.xhrObject.send((this.ajaxType != Const.REQ_TYPE_GET) ? formData.toString() : null);
    }

    private resolveFinalUrl(formData: XhrFormData) {
        let targetUrl =  this.resolveTargetUrl(<HTMLFormElement>this.sourceForm.getAsElem(0).value);

        return targetUrl + (this.isGetRequest() ? "?" + formData.toString() : "");
    }

    private isGetRequest() {
        return this.ajaxType == Const.REQ_TYPE_GET;
    }
}