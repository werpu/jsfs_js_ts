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

import {describe, it} from "mocha";
import * as sinon from "sinon";
import {expect} from "chai";
import {StandardInits} from "../frameworkBase/_ext/shared/StandardInits";
import defaultMyFaces = StandardInits.defaultMyFaces;

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

    beforeEach(() => {
        return defaultMyFaces();
    });

    it('namespace must exist', function() {
        expect(!!global?.myfaces?.oam).to.eq(true);
        expect(!!global?.myfaces?.oam?.setHiddenInput).to.eq(true);
        expect(!!global?.myfaces?.oam?.clearHiddenInput).to.eq(true);
        expect(!!global?.myfaces?.oam?.submitForm).to.eq(true);
    });
    // further tests will follow if needed, for now the namespace must be restored
});