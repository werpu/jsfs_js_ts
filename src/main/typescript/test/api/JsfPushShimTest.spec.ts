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
import {expect} from "chai";
import {StandardInits} from "../frameworkBase/_ext/shared/StandardInits";

const defaultMyFaces23 = StandardInits.defaultMyFaces23;

describe("JSF 2.3 push compatibility shim", function () {
    beforeEach(async function () {
        return defaultMyFaces23().then((close) => {
            this.pushImpl = (global as any).PushImpl;
            this.initSpy = sinon.spy(this.pushImpl, "init");
            this.closeIt = () => {
                this.initSpy.restore();
                this.pushImpl.reset();
                close();
            };
        });
    });

    afterEach(function () {
        this.closeIt();
    });

    it("must adapt legacy jsf.push.init without onerror to the Faces 4 init signature", function () {
        const onopen = () => {};
        const onmessage = () => {};
        const onclose = () => {};
        const behaviors = {"event": [() => {}]};

        window.jsf.push.init("clientId1", "booga.ws", "mychannel",
            onopen,
            onmessage,
            onclose,
            behaviors,
            false
        );

        expect(this.initSpy.calledOnce).to.be.true;
        const args = this.initSpy.firstCall.args;
        expect(args[0]).to.eq("clientId1");
        expect(args[1]).to.eq("booga.ws");
        expect(args[2]).to.eq("mychannel");
        expect(args[3]).to.eq(onopen);
        expect(args[4]).to.eq(onmessage);
        expect(args[5], "legacy shim must pass null for Faces 4 onerror").to.eq(null);
        expect(args[6]).to.eq(onclose);
        expect(args[7]).to.eq(behaviors);
        expect(args[8]).to.eq(false);
    });
});
