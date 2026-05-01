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
import {describe} from "mocha";
import * as sinon from "sinon";
import * as nise from "nise";
import {StandardInits} from "../frameworkBase/_ext/shared/StandardInits";
import {Implementation} from "../../impl/AjaxImpl";

import {expect} from "chai";

const defaultMyFaces = StandardInits.defaultMyFaces;
import {_Es2019Array, Lang} from "mona-dish";
import {FakeWebsocket} from "./FakeWebsocket";
import {REASON_EXPIRED, RECONNECT_INTERVAL} from "../../impl/core/Const";
const assertType = Lang.assertType;

declare var faces: any;

describe('Tests the jsf websocket client side api on high level (generic test without any myfaces dependencies', function () {
    let oldFlatMap = null;
    beforeEach(async function () {
        let oldFlatMap = null;
        let waitForResult = defaultMyFaces();

        return waitForResult.then((close) => {

            this.xhr = nise.fakeXhr.useFakeXMLHttpRequest();
            this.requests = [];
            this.xhr.onCreate = (xhr) => {
                this.requests.push(xhr);
            };
            (global as any).XMLHttpRequest = this.xhr;
            window.XMLHttpRequest = this.xhr;

            this.jsfAjaxResponse = sinon.stub((global as any).faces.ajax, "response");

            this.fakeWebsocket = new FakeWebsocket();
            this.socket = sinon.stub(window, 'WebSocket').returns(this.fakeWebsocket);
            (global as any).WebSocket = this.socket;

            this.pushImpl = (global as any).PushImpl;
            this.initSpy = sinon.spy(this.pushImpl, "init");
            oldFlatMap =Array.prototype["flatMap"];
            window["Es2019Array"] = _Es2019Array;
            delete Array.prototype["flatMap"];

            this.closeIt = () => {
                (global as any).XMLHttpRequest = window.XMLHttpRequest = this.xhr.restore();
                this.jsfAjaxResponse.restore();
                this.socket.restore();
                this.initSpy.restore();
                delete (global as any).WebSocket;
                Implementation.reset();
                close();
            }
        });

    });

    afterEach(function () {
        this.closeIt();
        if(oldFlatMap) {
            Array.prototype["flatMap"] = oldFlatMap;
            oldFlatMap = null;
        }
    });

    it("must register a channel", function (done: Function) {
        // faces.push.init (Faces 4) includes onerror. PushImpl keeps the same signature
        // so the JSF 2.3 compatibility shim can pass null for that callback.

        try {
            faces.push.init("clientId1", "booga.ws", "mychannel",
                () => { done(); },   // onopen
                () => {},            // onmessage
                () => {},            // onerror
                () => {},            // onclose
                "",                  // behaviorScripts
                true                 // autoConnect
            );

            expect(this.initSpy.called).to.be.true;

            let calledArgs = this.initSpy?.getCall(0)?.args;

            expect(calledArgs[0]).to.eq("clientId1");
            expect(calledArgs[1]).to.eq("booga.ws");
            expect(calledArgs[2]).to.eq("mychannel");

            expect(assertType(calledArgs[3], "function")).to.be.true;  // onopen
            expect(assertType(calledArgs[4], "function")).to.be.true;  // onmessage
            expect(assertType(calledArgs[5], "function")).to.be.true;  // onerror
            expect(assertType(calledArgs[6], "function")).to.be.true;  // onclose
            expect(calledArgs[7]).to.eq("");                           // behaviorScripts
            expect(calledArgs[8]).to.be.true;                          // autoConnect

            // implementation-level state
            expect("clientId1" in this.pushImpl.components, "a component must be registered").to.be.true;
            expect("booga.ws" in this.pushImpl.sockets, "a socket must be registered").to.be.true;
        } finally {
        }
    });

    it("callbacks must be called", function (done) {


        let openCalled = false;
        let closeCalled = false;
        let messageCalled = false;

        let msg = null;
        let cnl = null;
        new Promise((resolve) => {
            faces.push.init("blarg", "booga.ws", "mychannel", () => {
                    openCalled = true;
                    this.fakeWebsocket._respond({data: '"booga"'});
                },

                (message: string, channel: string) => {
                    messageCalled = true;
                    msg = message;
                    cnl = channel;
                    resolve(() => true);
                },
                () => {},
                () => {
                    closeCalled = true;
                },
                "",
                true
            );
        }).then(() => {
            expect(openCalled, "Open must have been called due to autoConnect").to.be.true;



            expect(messageCalled, "on a server response the message must have been called").to.be.true;
            expect(msg, "proper message must be passed").to.eq("booga");
            expect(cnl, "proper message must be passed").to.eq("mychannel");

            expect(closeCalled, "websocket still open").to.be.false;

            faces.push.close("blarg");
            expect(closeCalled, "websocket now closed").to.be.true;


            done();
        });

    });


    it("manual open must work", function (done) {


        let openCalled = false;
        let closeCalled = false;
        let messageCalled = false;

        let msg = null;
        let cnl = null;
        new Promise((resolve) => {
            faces.push.init("blarg", "booga.ws", "mychannel", () => {
                    openCalled = true;
                    this.fakeWebsocket._respond({data: '"booga"'});
                },

                (message: string, channel: string) => {
                    messageCalled = true;
                    msg = message;
                    cnl = channel;
                    resolve(() => true);
                },
                () => {},
                () => {
                    closeCalled = true;
                },
                "",
                false
            );
            faces.push.open("blarg");
        }).then(() => {
            expect(openCalled, "Open must have been called due to open").to.be.true;

            expect(messageCalled, "on a server response the message must have been called").to.be.true;
            expect(msg, "proper message must be passed").to.eq("booga");
            expect(cnl, "proper message must be passed").to.eq("mychannel");

            expect(closeCalled, "websocket still open").to.be.false;

            faces.push.close("blarg");
            expect(closeCalled, "websocket now closed").to.be.true;


            done();
        });

    });

    it("must call onclose(-1) when WebSocket is not available", function () {
        // Null both window and global so DQ.global().WebSocket is falsy regardless of which the impl reads
        const savedWindow = (window as any).WebSocket;
        const savedGlobal = (global as any).WebSocket;
        (window as any).WebSocket = null;
        (global as any).WebSocket = null;

        let closeCalled = false;
        let closeCode: any = null;
        let closeChannel: any = null;

        faces.push.init("blarg", "booga.ws", "nochannel",
            () => {},
            () => {},
            () => {},
            (code: number, channel: string) => { closeCalled = true; closeCode = code; closeChannel = channel; },
            "",
            false
        );

        (window as any).WebSocket = savedWindow;
        (global as any).WebSocket = savedGlobal;

        expect(closeCalled, "onclose must be called when WebSocket is unavailable").to.be.true;
        expect(closeCode).to.eq(-1);
        expect(closeChannel).to.eq("nochannel");
    });

    it("must extract channelToken from the query-string part of the URL", function () {
        faces.push.init("blarg", "ws://example.com/push?mytoken", "mychannel",
            () => {}, () => {}, () => {}, () => {}, "", false
        );

        expect("mytoken" in this.pushImpl.sockets, "socket must be keyed by the query-string token").to.be.true;
        expect(this.pushImpl.components["blarg"].channelToken).to.eq("mytoken");
    });

    it("must be idempotent on repeated init with the same socketClientId", function () {
        faces.push.init("blarg", "booga.ws", "mychannel",
            () => {}, () => {}, () => {}, () => {}, "", false
        );
        faces.push.init("blarg", "booga.ws", "mychannel",
            () => {}, () => {}, () => {}, () => {}, "", false
        );

        expect(Object.keys(this.pushImpl.sockets).length).to.eq(1);
        expect(Object.keys(this.pushImpl.components).length).to.eq(1);
    });

    it("must fan out onopen to all components sharing the same socket URL", function (done) {
        let open1 = false;
        let open2 = false;

        faces.push.init("blarg", "booga.ws", "mychannel",
            () => { open1 = true; }, () => {}, () => {}, () => {}, "", false
        );
        faces.push.init("clientId2", "booga.ws", "mychannel",
            () => { open2 = true; }, () => {}, () => {}, () => {}, "", false
        );

        faces.push.open("blarg");

        setTimeout(() => {
            expect(open1, "first component onopen must be called").to.be.true;
            expect(open2, "second component onopen must be called").to.be.true;
            done();
        }, 20);
    });

    it("must invoke registered behavior functions on a matching message", function (done) {
        let behaviorCalled = false;
        const behaviors = { "booga": [() => { behaviorCalled = true; }] };

        new Promise<void>((resolve) => {
            this.pushImpl.init("blarg", "booga.ws", "mychannel",
                () => { this.fakeWebsocket._respond({data: '"booga"'}); },
                () => { resolve(); },
                null,
                () => {},
                behaviors,
                true
            );
        }).then(() => {
            expect(behaviorCalled, "behavior function must be invoked on matching message key").to.be.true;
            done();
        });
    });

    it("must invoke onerror and reconnect on a reconnectable abnormal close", function (done) {
        let errorCalled = false;
        let closeCalled = false;
        let errorCode: any = null;
        let errorChannel: any = null;

        new Promise<void>((resolve) => {
            faces.push.init("blarg", "booga.ws", "mychannel",
                () => { this.fakeWebsocket._close({code: 1006, reason: "abnormal"}); resolve(); },
                () => {},
                (code: number, channel: string) => { errorCalled = true; errorCode = code; errorChannel = channel; },
                () => { closeCalled = true; },
                "",
                true
            );
        }).then(() => {
            setTimeout(() => {
                expect(errorCalled, "onerror must be called before reconnecting").to.be.true;
                expect(closeCalled, "onclose must not be called while reconnecting").to.be.false;
                expect(errorCode).to.eq(1006);
                expect(errorChannel).to.eq("mychannel");
                expect(this.socket.callCount, "a reconnect must create another WebSocket").to.be.greaterThan(1);
                done();
            }, RECONNECT_INTERVAL + 150);
        });
    });

    it("must use cumulative reconnect delays across consecutive failed reconnect attempts", function () {
        const clock = sinon.useFakeTimers();
        const firstSocket = new FakeWebsocket();
        const secondSocket = new FakeWebsocket();
        const thirdSocket = new FakeWebsocket();

        try {
            this.socket.resetBehavior();
            this.socket.onCall(0).returns(firstSocket);
            this.socket.onCall(1).returns(secondSocket);
            this.socket.onCall(2).returns(thirdSocket);

            faces.push.init("blarg", "booga.ws", "mychannel",
                () => {},
                () => {},
                () => {},
                () => {},
                "",
                true
            );

            clock.tick(10);
            expect(this.socket.callCount, "initial open must create one WebSocket").to.eq(1);

            firstSocket._close({code: 1006, reason: "abnormal"});
            expect(firstSocket.readyState, "first socket must be closed before reconnect").to.eq(3);
            expect(this.pushImpl.sockets["booga.ws"].socket,
                "closed socket reference must be cleared before first reconnect is scheduled").to.eq(null);
            clock.tick(RECONNECT_INTERVAL - 1);
            expect(this.socket.callCount, "first reconnect must wait one reconnect interval").to.eq(1);
            clock.tick(1);
            expect(this.socket.callCount, "first reconnect must create the second WebSocket").to.eq(2);
            expect(this.pushImpl.sockets["booga.ws"].socket,
                "first reconnect must store the replacement WebSocket").to.eq(secondSocket);

            secondSocket._close({code: 1006, reason: "abnormal"});
            expect(secondSocket.readyState, "second socket must be closed before reconnect").to.eq(3);
            expect(this.pushImpl.sockets["booga.ws"].socket,
                "closed socket reference must be cleared before second reconnect is scheduled").to.eq(null);
            clock.tick((RECONNECT_INTERVAL * 2) - 1);
            expect(this.socket.callCount, "second reconnect must wait two reconnect intervals").to.eq(2);
            clock.tick(1);
            expect(this.socket.callCount, "second reconnect must create the third WebSocket").to.eq(3);
            expect(this.pushImpl.sockets["booga.ws"].socket,
                "second reconnect must store the replacement WebSocket").to.eq(thirdSocket);
        } finally {
            clock.restore();
        }
    });

    it("must call onclose callback when server closes with REASON_EXPIRED", function (done) {
        let closeCalled = false;
        let closeCode: any = null;

        new Promise<void>((resolve) => {
            faces.push.init("blarg", "booga.ws", "mychannel",
                () => { this.fakeWebsocket._close({code: 1000, reason: REASON_EXPIRED}); },
                () => {},
                () => {},
                (code: number) => { closeCalled = true; closeCode = code; resolve(); },
                "",
                true
            );
        }).then(() => {
            expect(closeCalled, "onclose must be called on REASON_EXPIRED terminal close").to.be.true;
            expect(closeCode).to.eq(1000);
            done();
        });
    });

    it("must close existing sockets when PushImpl.reset() is called", function () {
        faces.push.init("blarg", "booga.ws", "mychannel",
            () => {},
            () => {},
            () => {},
            () => {},
            "",
            true
        );

        const closeSpy = sinon.spy(this.fakeWebsocket, "close");

        this.pushImpl.reset();

        expect(closeSpy.calledOnce, "reset must close the existing WebSocket").to.be.true;
    });

    it("must ignore pending onopen callback after reset tears down the channel registry", function (done) {
        let openCalled = false;

        faces.push.init("blarg", "booga.ws", "mychannel",
            () => { openCalled = true; },
            () => {},
            () => {},
            () => {},
            "",
            true
        );

        this.pushImpl.reset();

        setTimeout(() => {
            expect(openCalled, "onopen must not be called after reset removed the channel registry").to.be.false;
            done();
        }, 20);
    });

    it("must ignore pending onclose callback after reset tears down the channel registry", function () {
        let closeCount = 0;

        faces.push.init("blarg", "booga.ws", "mychannel",
            () => {},
            () => {},
            () => {},
            () => { closeCount++; },
            "",
            true
        );

        this.pushImpl.reset();
        const closeCountAfterReset = closeCount;

        expect(() => this.fakeWebsocket._close({code: 1006, reason: "abnormal"})).not.to.throw();
        expect(closeCount, "late onclose must not call component callbacks after reset").to.eq(closeCountAfterReset);
    });

    it("must ignore native WebSocket error events", function () {
        let errorCalled = false;

        faces.push.init("blarg", "booga.ws", "mychannel",
            () => {},
            () => {},
            () => { errorCalled = true; },
            () => {},
            "",
            true
        );

        expect(() => this.fakeWebsocket._error({data: '{"code":1006}'})).not.to.throw();
        expect(errorCalled, "Faces onerror is only fired from reconnectable close handling").to.be.false;
    });

    it("must remove stale components whose DOM element has been removed", function (done) {
        const channelToken = "booga.ws"; // no '?' so token == full URL

        new Promise<void>((resolve) => {
            faces.push.init("nonexistent-id", "booga.ws", "mychannel",
                () => { this.fakeWebsocket._respond({data: '"ping"'}); resolve(); },
                () => {},
                () => {},
                () => {},
                "",
                true
            );
        }).then(() => {
            expect(this.pushImpl.clientIdsByTokens[channelToken].length,
                "stale component must be removed from clientIdsByTokens").to.eq(0);
            done();
        });
    });
});
