import {describe, it} from "mocha";
import * as sinon from "sinon";
import { expect } from "chai";
import {standardInits} from "../frameworkBase/_ext/shared/StandardInits";
import defaultMyFaces = standardInits.defaultMyFaces;
import {DomQuery} from "../../../main/typescript/_ext/monadish";


declare var jsf: any;
declare var Implementation: any;

/**
 * specialized tests testing the xhr core behavior when it hits the xmlHttpRequest object
 */
describe('Tests on the xhr core when it starts to call the request', function () {

    beforeEach(function () {



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

    it('must have the standard parameters all in', function (done) {
        //issue a standard jsf.ajax.request upon the standard simple form case and check the passed parameters
        //and whether send was called
        let send = sinon.spy(XMLHttpRequest.prototype,"send");

        let element = DomQuery.byId("input_2").getAsElem(0).value;
        jsf.ajax.request(element, null, {
            execute: "input_1",
            render: "@form",
            pass1: "pass1",
            pass2: "pass2"
        });


        expect(this.requests.length).to.eq(1);
        expect(this.requests[0].method).to.eq("POST");
        expect(this.requests[0].async).to.be.true;
        expect(send.called).to.be.true;
        done();
    });

    it('it must have the pass through values properly passed', function (done) {
        done();
    });

    it('it must have the proper target type', function (done) {
        done();
    });

});

describe('Tests after core when it hits response', function () {

    it('must have passed all ajax phase events', function (done) {
        done();
    });

    it('it must have called request and the pass through values must be properly transferred into the context', function (done) {
        done();
    });

    it('it must have called onError in the error case', function (done) {
        done();
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