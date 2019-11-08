import {describe} from "mocha";
import * as sinon from "sinon";
import {StandardInits} from "../frameworkBase/_ext/shared/StandardInits";
import {Implementation} from "../../../main/typescript/impl/AjaxImpl";

import {expect} from "chai";

import defaultMyFaces = StandardInits.defaultMyFaces;
import {Lang} from "../../../main/typescript/ext/monadish";

declare var jsf: any;

describe('Tests the jsf websocket client side api on high level (generic test without any myfaces dependencies', function () {

    beforeEach(async function () {

        let waitForResult = defaultMyFaces();

        return waitForResult.then((close) => {

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

    it("must register a channel", function () {
        /**
         *   export function init(socketClientId: string,
         uri: string,
         channel: string,
         onopen: Function,
         onmessage: Function,
         onclose: Function,
         behaviorScripts: any,
         autoconnect: boolean) {
            PushImpl.init(socketClientId, uri, channel, onopen, onmessage, onclose, behaviorScripts, autoconnect);
        }
         */

        var dummySocket = {send: sinon.spy()};
        sinon.stub(window, 'WebSocket').returns(dummySocket);
        let initSpy = sinon.spy((<any>global).PushImpl, "init");

        jsf.push.init("clientId1", "booga.ws", () => {
                //todo do something in opnopen
            },
            () => {
                //todo do something in onclose
            },
            () => {
                //todo do something in onmessage
            },
            "",
            true
        );

        expect(initSpy.called).to.be.true;


        let calledArgs = initSpy?.getCall(0)?.args;

        expect(calledArgs[0] == "clientId1").to.be.true;
        expect(calledArgs[1] == "booga.ws").to.be.true;
        expect(Lang.instance.assertType(calledArgs[2], "function")).to.be.true;
        expect(Lang.instance.assertType(calledArgs[3], "function")).to.be.true;
        expect(Lang.instance.assertType(calledArgs[4], "function")).to.be.true;
    })
});