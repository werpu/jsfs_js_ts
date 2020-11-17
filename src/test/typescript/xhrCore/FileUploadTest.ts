import {describe, it} from "mocha";
import * as sinon from "sinon";
import {expect} from "chai";
import {StandardInits} from "../frameworkBase/_ext/shared/StandardInits";
import {DomQuery} from "../../../main/typescript/ext/monadish";
import {
    COMPLETE,
    P_AJAX,
    P_EXECUTE,
    P_PARTIAL_SOURCE,
    P_RENDER,
    P_VIEWSTATE,
    P_WINDOW_ID,
    SUCCESS
} from "../../../main/typescript/impl/core/Const";
import defaultMyFaces = StandardInits.defaultMyFaces;
import STD_XML = StandardInits.STD_XML;
import defaultFileForm = StandardInits.defaultFileForm;
import {Implementation} from "../../../main/typescript/impl/AjaxImpl";

declare var jsf: any;
declare var Impl


let issueStdReq = function (element) {
    jsf.ajax.request(element, null, {
        execute: "input_1",
        render: "@form",
        pass1: "pass1",
        pass2: "pass2"
    });
};

/**
 * specialized tests testing the xhr core behavior when it hits the xmlHttpRequest object
 */
describe('Tests on the xhr core when it starts to call the request', function () {
    beforeEach(async function () {

        let waitForResult = defaultFileForm();
        return waitForResult.then((close) => {

            this.xhr = sinon.useFakeXMLHttpRequest();
            this.requests = [];

            this.respond = (response: string): XMLHttpRequest => {
                let xhrReq = this.requests.shift();
                xhrReq.responsetype = "text/xml";
                xhrReq.respond(200, {'Content-Type': 'text/xml'}, response);
                return xhrReq;
            };

            this.xhr.onCreate = (xhr) => {
                this.requests.push(xhr);
            };
            (<any>global).XMLHttpRequest = this.xhr;
            (<any>window).XMLHttpRequest = this.xhr;

            this.closeIt = () => {
                (<any>global).XMLHttpRequest = (<any>window).XMLHttpRequest = this.xhr.restore();
                Implementation.reset();
                close();
            }
        });


    });
    afterEach(function () {
        this.closeIt();
    });

    it('must have sent a multipart request', function (done) {
        let send = sinon.spy(XMLHttpRequest.prototype, "send");
        try {

            let button = DomQuery.byId("input_1");

            button.addEventListener("click", (event: Event) => {
                jsf.ajax.request(event.target, event, {render: '@all', execute: '@form'})
            }).click();
            //this.resonse("ok");

            expect(this.requests.length).to.eq(1);
            let request = this.requests[0];
            expect(request.method).to.eq("POST");
            expect(request.async).to.be.true;
            expect(send.called).to.be.true;
            expect(send.callCount).to.eq(1);
            expect(request.requestBody instanceof FormData).to.be.true;
            expect(request.requestHeaders["Content-Type"].indexOf("multipart/form-data") != -1).to.be.true;

        } finally {
            send.restore();
        }
        done();
    });

});
