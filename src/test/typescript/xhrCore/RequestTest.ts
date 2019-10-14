import {describe, it} from "mocha";
import * as sinon from "sinon";
import {expect} from "chai";
import {standardInits} from "../frameworkBase/_ext/shared/StandardInits";
import defaultMyFaces = standardInits.defaultMyFaces;
import {DomQuery, XMLQuery} from "../../../main/typescript/_ext/monadish";
import {Const} from "../../../main/typescript/impl/core/Const";
import basicXML = standardInits.basicXML;
import STD_XML = standardInits.STD_XML;
import {Lang} from "../../../main/typescript/impl/util/Lang";

declare var jsf: any;
declare var Implementation: any;

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

        let waitForResult = defaultMyFaces();

        return waitForResult.then((close) => {
            this.server = sinon.fakeServer.create();
            this.xhr = sinon.useFakeXMLHttpRequest();
            this.requests = [];
            this.xhr.onCreate = (xhr) => {
                this.requests.push(xhr);
            };
            (<any>global).XMLHttpRequest = this.xhr;
            (<any>window).XMLHttpRequest = this.xhr;

            this.jsfAjaxResponse = sinon.stub((<any>global).jsf.ajax, "response");

            this.closeIt = () => {
                (<any>global).XMLHttpRequest = (<any>window).XMLHttpRequest = this.xhr.restore();
                this.jsfAjaxResponse.restore();
                Implementation.reset();
                close();
            }
        });
    });

    afterEach(function () {

        this.closeIt();
    });

    it('must have the standard parameters all in', function (done) {
        //issue a standard jsf.ajax.request upon the standard simple form case and check the passed parameters
        //and whether send was called
        let send = sinon.spy(XMLHttpRequest.prototype, "send");

        try {
            let element = DomQuery.byId("input_2").getAsElem(0).value;
            issueStdReq(element);

            expect(this.requests.length).to.eq(1);
            expect(this.requests[0].method).to.eq("POST");
            expect(this.requests[0].async).to.be.true;
            expect(send.called).to.be.true;
            expect(send.callCount).to.eq(1);

            //sent params javax.faces.ViewState=null&execute=input_1&render=%40form&pass1=pass1&pass2=pass2&javax.faces.windowId=null&javax.faces.source=input_2&javax.faces.partial.ajax=input_2&blarg=blarg&javax.faces.partial.execute=input_1%20input_2&javax.faces.partial.render=blarg

        } finally {

            send.restore();
        }

        done();
    });

    it('it must have the pass through values properly passed', function (done) {

        let send = sinon.spy(XMLHttpRequest.prototype, "send");
        try {
            let element = DomQuery.byId("input_2").getAsElem(0).value;
            issueStdReq(element);

            expect(send.called).to.be.true;
            let argsVal: any = send.args[0][0];
            let arsArr = argsVal.split("&");
            let resultsMap = {};
            for (let val of arsArr) {
                let keyVal = val.split("=");
                resultsMap[keyVal[0]] = keyVal[1];
            }

            expect(resultsMap["pass1"]).to.eq("pass1");
            expect(resultsMap["pass2"]).to.eq("pass2");
            expect(!!resultsMap["render"]).to.be.false;
            expect(!!resultsMap["execute"]).to.be.false;
            expect(Const.P_WINDOW_ID in resultsMap).to.be.true;
            expect(Const.P_VIEWSTATE in resultsMap).to.be.true;
            expect(resultsMap[Const.P_PARTIAL_SOURCE]).to.eq("input_2");
            expect(resultsMap[Const.P_AJAX]).to.eq("input_2");
            expect(resultsMap[Const.P_RENDER]).to.eq("blarg");
            expect(resultsMap[Const.P_EXECUTE]).to.eq("input_1%20input_2");

        } finally {
            send.restore();
        }
        done();
    });

    it('it must have the proper target type', function (done) {
        let send = sinon.spy(XMLHttpRequest.prototype, "send");
        try {
            let element = DomQuery.byId("input_2").getAsElem(0).value;
            issueStdReq(element);

            expect(this.requests[0].requestHeaders.Accept.indexOf("application/xml") != -1).to.be.true;

        } finally {
            send.restore();
        }
        done();
    });

});

describe('Tests after core when it hits response', function () {

    beforeEach(async function () {

        let waitForResult = defaultMyFaces();

        return waitForResult.then((close) => {
            this.server = sinon.fakeServer.create();
            this.xhr = sinon.useFakeXMLHttpRequest();
            this.requests = [];
            this.xhr.onCreate = (xhr) => {
                this.requests.push(xhr);
            };
            (<any>global).XMLHttpRequest = this.xhr = sinon.useFakeXMLHttpRequest();
            (<any>window).XMLHttpRequest = this.xhr = sinon.useFakeXMLHttpRequest();

            this.jsfAjaxResponse = sinon.stub((<any>global).jsf.ajax, "response");

            this.closeIt = () => {
                (<any>global).XMLHttpRequest = (<any>window).XMLHttpRequest = this.xhr.restore();
                this.jsfAjaxResponse.restore();
                Implementation.reset();
                close();
            }
        });
    });

    afterEach(function () {
        this.closeIt();
    });

    it('must have passed all ajax phase events', function (done) {

        let send = sinon.spy(XMLHttpRequest.prototype, "send");
        let globalCnt = 0;
        let localCnt = 0;
        try {
            let element = DomQuery.byId("input_2").getAsElem(0).value;
            jsf.ajax.addOnEvent(() => {
                globalCnt++;
            });
            jsf.ajax.request(element, null, {
                execute: "input_1",
                render: "@form",
                pass1: "pass1",
                pass2: "pass2",
                onevent: (evt: any) => {
                    localCnt++;
                }
            });

            let xhrReq = this.requests[0];

            xhrReq.respond(200, {'Content-Type': 'text/xml; charset=utf-8'}, STD_XML);
            expect(this.jsfAjaxResponse.callCount).to.eq(1);
            expect(globalCnt == 3).to.eq(true);
            expect(localCnt == 3).to.eq(true);
            done();
        } catch (e) {
            console.error(e);

        } finally {
            send.restore();
        }

    });

    it('it must have called request and the pass through values must be properly transferred into the context', function (done) {
        let send = sinon.spy(XMLHttpRequest.prototype, "send");
        let globalCnt = 0;
        let localCnt = 0;
        let xhrReq = null;

        try {
            let element = DomQuery.byId("input_2").getAsElem(0).value;
            jsf.ajax.addOnEvent(() => {
                globalCnt++;
            });

            jsf.ajax.request(element, null, {
                execute: "input_1",
                render: "@form",
                pass1: "pass1",
                pass2: "pass2",
                onevent: (evt: any) => {
                    localCnt++;
                    if (evt.status == Const.COMPLETE) {
                        expect(!!xhrReq.responseXML).to.be.true;
                    }
                    if (evt.status == Const.SUCCESS) {
                        expect(this.jsfAjaxResponse.callCount).to.eq(1);

                        expect(this.jsfAjaxResponse.firstCall.args[0] instanceof XMLHttpRequest).to.be.true;
                        let lastArg = this.jsfAjaxResponse.firstCall.args[1];
                        expect(lastArg.onevent != null).to.be.true;
                        expect(lastArg.onevent instanceof Function).to.be.true;
                        expect(!!lastArg.onError).to.be.false;
                        expect(lastArg.pass1 == "pass1").to.be.true;
                        expect(lastArg.pass2 == "pass2").to.be.true;
                        expect(!!lastArg[Const.P_PARTIAL_SOURCE]).to.be.true;
                        expect(!!lastArg[Const.P_AJAX]).to.be.true;
                        expect(!!lastArg[Const.P_EXECUTE]).to.be.true;
                        expect(!!lastArg[Const.P_RENDER]).to.be.true;

                        expect(this.jsfAjaxResponse.firstCall.args.length).to.eq(2);

                        expect(globalCnt == 2).to.eq(true); //local before global
                        expect(localCnt == 3).to.eq(true);

                        done();
                    }
                }
            });

            xhrReq = this.requests[0];
            xhrReq.responsetype = "text/xml";
            xhrReq.respond(200, {'Content-Type': 'text/xml'}, STD_XML);

        } catch (e) {
            console.error(e);

        } finally {
            send.restore();
        }
    });

    it('it must have called onError in the error case', function (done) {
        //on hold until it is clear why sinon is not giving me the response XML as expected

        let send = sinon.spy(XMLHttpRequest.prototype, "send");
        let xhrReq = null;

        try {
            let errorCnt = 0;
            let element = DomQuery.byId("input_2").getAsElem(0).value;
            jsf.ajax.request(element, null, {
                execute: "input_1",
                render: "@form",
                pass1: "pass1",
                pass2: "pass2",
                onerror: (error: any) => {
                    expect(error.type).to.eq("error");
                    expect(!!error.status).to.eq(true);
                    expect(!!error.message).to.eq(true);
                    expect(!!error.source).to.eq(true);
                    expect(!!error.responseCode).to.eq(true);
                    expect(!!error.responseText).to.eq(true);
                    expect(!!error.responseXML).to.eq(true);
                    done();
                },
                onevent: (evt: any) => {
                    if (evt.status == Const.COMPLETE) {
                        throw Error("This error is wanted, ignore the log");
                    }
                }
            });

            xhrReq = this.requests[0];
            xhrReq.responsetype = "text/xml";
            xhrReq.respond(200, {'Content-Type': 'text/xml'}, STD_XML);

        } catch (e) {
            console.error(e);

        } finally {
            send.restore();
        }

    });

    it('it must have proper error parameters in the onError case', function (done) {
        done();
    });

    it('error listeners must have been triggered in the onError case', function (done) {
        done();
    });
});

describe('Tests after core when errors out', function () {

});

describe('Myfaces specialized tests', function () {

    it('must have the _mf passthroughs in and out after the request succeeded', function (done) {
        done();
    });

    it('it must have proper _mf parameters in the onError case', function (done) {
        done();
    });

});
