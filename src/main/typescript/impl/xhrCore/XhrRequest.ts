/**
 * an xmlhttp request approach with a promise
 *
 * The idea is that we basically just enqueue
 * a single ajax request into our queue
 * and let the queue do the processing.
 *
 */
import {jsf} from "../../api/jsf";
import {Impl} from "../Impl";
import {Lang} from "../util/Lang";
import {LangTypes} from "../util/LangTypes";
import {AjaxUtils} from "./AjaxUtils";

import Implementation = Impl.Implementation;
import FormDataDecorator = LangTypes.FormDataDecorator;
import {AsyncRunnable} from "../util/AsyncRunnable";
import {Config} from "../../_ext/monadish/Monad";

import {Promise as ShimPromise} from "../../_ext/monadish/Monad";

type PROMISE_FUNC = (any?) => void;

export class XhrRequest implements AsyncRunnable<XMLHttpRequest> {

    pXhr: Promise<XMLHttpRequest>;
    xhrObject: XMLHttpRequest;

    /** predefined method */
    static CONTENT_TYPE: "Content-Type";
    static HEAD_FACES_REQ: "Faces-Request";
    static VAL_AJAX: "partial/ajax";
    static ENCODED_URL: "javax.faces.encodedURL";

    static REQ_TYPE_GET = "GET";
    static REQ_TYPE_POST = "POST";

    static STATE_EVT_BEGIN = "BEGIN";
    static STATE_EVT_TIMEOUT = "TIMEOUT_EVENT";
    static STATE_EVT_COMPLETE = "COMPLETE";

    static URL_ENCODED = "application/x-www-form-urlencoded";

    static NO_TIMEOUT = 0;

    constructor(
        private source,
        private sourceForm,
        private requestContext: Config,
        private partialIdsArray = [],
        private ajaxType = XhrRequest.REQ_TYPE_POST,
        private contentType = XhrRequest.URL_ENCODED,
        private timeout = XhrRequest.NO_TIMEOUT
    ) {

        this.xhrObject = new XMLHttpRequest();
        this.pXhr = this.createPromise()
    }

    start(): Promise<XMLHttpRequest> {
        let xhr = this.xhrObject;
        try {
            let sourceForm = this.sourceForm,
                targetURL = (typeof sourceForm.elements[XhrRequest.ENCODED_URL] == 'undefined') ?
                    sourceForm.action :
                    sourceForm.elements[XhrRequest.ENCODED_URL].value,
                formData: FormDataDecorator | { [key: string]: any } = this.getFormData();

            formData =  Lang.instance.mixMaps(<any>formData, this.requestContext.getIf("passThrgh").value, true);

            this.xhrObject.open(this.ajaxType, targetURL +
                ((this.ajaxType == XhrRequest.REQ_TYPE_GET) ? "?" + this.formDataToURI(<FormDataDecorator> formData) : "")
                , true);

            xhr.timeout = this.timeout;

            this.applyContentType(xhr);
            xhr.setRequestHeader(XhrRequest.HEAD_FACES_REQ, XhrRequest.VAL_AJAX);

            //some webkit based mobile browsers do not follow the w3c spec of
            // setting the accept headers automatically
            //if(this._RT.browser.isWebKit) {
            //    xhr.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
            //}
            this.sendEvent(XhrRequest.STATE_EVT_BEGIN);
            //Check if it is a custom form data object
            //if yes we use makefinal for the final handling
            let finalFormData: string = <string>((formData && formData.makeFinal) ? formData.makeFinal() : formData);

            xhr.send((this.ajaxType != XhrRequest.REQ_TYPE_GET) ? finalFormData : null);

        } catch (e) {
            //_onError//_onError
            e = (e._mfInternal) ? e : Lang.instance.makeException(new Error(), "sendError", "sendError", "XHRPromise", "send", e.message);
            this.handleError(e);
        }
        return this.pXhr;
    }

    private createPromise() {
        return new Promise<XMLHttpRequest>((resolve: PROMISE_FUNC, reject: PROMISE_FUNC) => {
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
        });
    }

    /**
     * helper, in multipart situations we might alter the content type
     * from the urlencoded one
     */

    private applyContentType(xhr: XMLHttpRequest) {
        let contentType = this.contentType + "; charset=utf-8";
        xhr.setRequestHeader(XhrRequest.CONTENT_TYPE, contentType);
    }


    /**
     * Spec. 13.3.1
     * Collect and encode input elements.
     * Additionally the hidden element javax.faces.ViewState
     * Enhancement partial page submit
     *
     * @return  an element of formDataWrapper
     * which keeps the final Send Representation of the
     */
    private getFormData(): FormDataDecorator {
        let ret = null;

        if (!this.partialIdsArray || !this.partialIdsArray.length) {
             return Lang.instance.createFormDataDecorator(jsf.getViewState(this.sourceForm));
        } else {
            //now this is less performant but we have to call it to allow viewstate decoration
            ret = Lang.instance.createFormDataDecorator(new Array());
            AjaxUtils.encodeSubmittableFields(ret, this.sourceForm, this.partialIdsArray);
            //TODO myfaces options still needed?
            if (this.source && this.requestContext.getIf("myfaces","form").isPresent())
                AjaxUtils.appendIssuingItem(this.source, ret);

        }
        return ret;

    }

    private formDataToURI(formData: FormDataDecorator): string | FormDataDecorator {
        if (formData && formData.makeFinal) {
            return formData.makeFinal()
        }
        return formData;
    }


    onAbort(resolve: PROMISE_FUNC, reject: PROMISE_FUNC) {
        reject();
    }

    onTimeout(resolve: PROMISE_FUNC, reject: PROMISE_FUNC) {
        this.sendEvent(XhrRequest.STATE_EVT_TIMEOUT);
        reject();
    }


    onSuccess(data: any, resolve: PROMISE_FUNC, reject: PROMISE_FUNC) {
        this.sendEvent(XhrRequest.STATE_EVT_COMPLETE);
        this.requestContext.apply("_mfInternal").value = this.requestContext.getIf("_mfInternal").get({}).value;
        jsf.ajax.response(this.xhrObject, this.requestContext);
    }

    onDone(data: any, resolve: PROMISE_FUNC, reject: PROMISE_FUNC) {
        resolve(data);
    }

    onError(errorData: any, resolve: PROMISE_FUNC, reject: PROMISE_FUNC) {
        this.handleError(errorData);
        reject();
    }

    private sendEvent(evtType: string) {
        Implementation.instance.sendEvent(this.xhrObject, this.requestContext, Implementation[evtType]);
    }

    private handleError(exception) {
        Implementation.instance.stdErrorHandler(this.xhrObject, this.requestContext, exception, true);
    }

    get $promise(): Promise<XMLHttpRequest> {
        return this.pXhr;
    }

    catch(func: (data: any) => any): AsyncRunnable<XMLHttpRequest> {
        this.pXhr.catch(func);
        return this;
    }

    finally(func: () => void): AsyncRunnable<XMLHttpRequest> {
        //no ie11 support we probably are going to revert to shims for that one
        (<any>this.pXhr).finally(func);
        return this;
    }

    then(func: (data: any) => any): AsyncRunnable<XMLHttpRequest> {
        this.pXhr.then(func);
        return this;
    }

}