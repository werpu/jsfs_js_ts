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
import {AsyncRunnable} from "../util/AsyncRunnable";
import {Config} from "../../_ext/monadish/Monad";
import {Implementation} from "../Impl";
import {DomQuery} from "../../_ext/monadish/DomQuery";
import {Const} from "../core/Const";
import {XhrFormData} from "./XhrFormData";
import {XMLQuery} from "../../_ext/monadish";

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

    private _onEvent: Function;
    private _onError: Function;

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
        this._onEvent = requestContext.getIf(Const.CTX_PARAM_MF_INTERNAL, Const.ON_EVENT).orElse(() => {
        }).value;
        this._onError = requestContext.getIf(Const.CTX_PARAM_MF_INTERNAL, Const.ON_ERROR).orElse(() => {
        }).value;
    }

    start(): AsyncRunnable<XMLHttpRequest> {
        let _Lang = Lang.instance;
        try {
            let formData: XhrFormData = new XhrFormData(this.sourceForm, this.source);

            //next step the pass through parameters are merged in for post params
            formData.shallowMerge(this.requestContext.getIf(Const.CTX_PARAM_PASS_THR));
            //drag back in the onError amd onEvent functions
            //per spec the request context must have the on event and on error request functions in the main namespace
            this.requestContext.apply(Const.CTX_PARAM_PASS_THR, Const.ON_ERROR).value  = this.requestContext.getIf(Const.CTX_PARAM_MF_INTERNAL, Const.ON_ERROR).value;
            this.requestContext.apply(Const.CTX_PARAM_PASS_THR, Const.ON_EVENT).value  = this.requestContext.getIf(Const.CTX_PARAM_MF_INTERNAL, Const.ON_EVENT).value;

            //we have to shift the internal passthroughs around to build up our response context
            this.requestContext.apply(Const.CTX_PARAM_PASS_THR, Const.CTX_PARAM_MF_INTERNAL).value = this.requestContext.getIf(Const.CTX_PARAM_MF_INTERNAL).orElse({}).value;

            this.xhrObject.open(this.ajaxType, this.resolveFinalUrl(formData), true);

            //adding timeout
            this.timeout ? this.xhrObject.timeout = this.timeout : null;

            //a bug in the xhr stub library prevents the setRequestHeader to be properly executed on fake xhr objects
            //normal browsers should resolve this
            //tests can quietly fail on this one
            Lang.failSaveExecute(() => this.xhrObject.setRequestHeader(Const.CONTENT_TYPE, `${this.
                contentType}; charset=utf-8`));
            Lang.failSaveExecute(() => this.xhrObject.setRequestHeader(Const.HEAD_FACES_REQ, Const.VAL_AJAX));

            //probably not needed anymore, will test this
            //some webkit based mobile browsers do not follow the w3c spec of
            // setting the accept headers automatically
            Lang.failSaveExecute(() => this.xhrObject.setRequestHeader(Const.REQ_ACCEPT, Const.STD_ACCEPT));

            this.sendEvent(Const.BEGIN);

            this.sendRequest(formData);

        } catch (e) {
            //_onError//_onError
            e = (e._mfInternal) ? e : _Lang.makeException(new Error(), "sendError", "sendError", "XHRPromise", "send", e.message);
            this.handleError(e);
        }
        return this;
    }

    cancel() {
        try {
            this.xhrObject.abort();
        } catch (e) {
            e = (e._mfInternal) ? e : Lang.instance.makeException(new Error(), "sendError", "sendError", "XHRPromise", "send", e.message);
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
            this.xhrPromise = new Lang.Promise((resolve: Consumer<any>, reject: Consumer<any>) => {
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

        //bypass a bug in some testing libraries
        //normally the attribute is reasdonly but the testing shims make it writable
        //but in my case do not generate the response xml document object
        Lang.failSaveExecute(() => {
            if(!this.xhrObject.responseXML) {
                (<any>this.xhrObject)["responseXML"] = <any> XMLQuery.parseXML(this.xhrObject.responseText).getAsElem(0).value;
            }
        });
        this.sendEvent(Const.COMPLETE);

        jsf.ajax.response(this.xhrObject, this.requestContext.getIf(Const.CTX_PARAM_PASS_THR).orElse({}).value);
    }

    protected onDone(data: any, resolve: Consumer<any>, reject: Consumer<any>) {
        this.sendEvent(Const.SUCCESS);
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
        let eventData = Implementation.instance.createEventData(this.xhrObject, this.requestContext, evtType);
        try {
            //user code error, we might cover
            //this in onError but also we cannot swallow it
            this._onEvent(eventData);
            Implementation.instance.sendEvent(eventData);
        } catch(e) {
            this.handleError(e);
            throw e;
        }
    }

    private handleError(exception) {
        let errorData = Implementation.instance.createErrorFromException(this.xhrObject, this.requestContext, exception);
        try {
            this._onError(errorData);
        } finally {
            Implementation.instance.stdErrorHandler(this.xhrObject, this.requestContext, exception, true);
        }
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
        let targetUrl = this.resolveTargetUrl(<HTMLFormElement>this.sourceForm.getAsElem(0).value);

        return targetUrl + (this.isGetRequest() ? "?" + formData.toString() : "");
    }

    private isGetRequest() {
        return this.ajaxType == Const.REQ_TYPE_GET;
    }

}