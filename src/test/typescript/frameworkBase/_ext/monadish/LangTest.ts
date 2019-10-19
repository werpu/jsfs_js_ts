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

import {expect} from 'chai';
import {describe, it} from 'mocha';
import {Lang} from "../../../../../main/typescript/ext/monadish/Lang";

const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const dom = new JSDOM(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    </head>
    <body>
        <div />
        <div />
        <div />
        <div />
    </body>
    </html>
    
    `)

export const window = dom.window;

class Probe {

    val1 = 1;
    val2 = 2;
    val3 = 3;

    constructor() {
    }
}

describe('Lang tests', () => {

    it('initializable', () => {
        const lang = Lang.instance;
        expect(lang).to.exist;
    });

    it('strToArray working', () => {
        const lang = Lang.instance;

        let arr = lang.strToArray("hello.world.from.me", /\./gi);

        expect(arr).to.exist;
        expect(arr.length).to.eq(4);
        expect(arr[3]).to.eq("me");

    });

    it('arrToMap working', () => {
        const lang = Lang.instance;

        let arr = lang.strToArray("hello.world.from.me", /\./gi);
        let probe = lang.arrToMap(arr);
        expect(probe).to.exist;
        expect(probe.length).to.eq(4);
        expect(probe["me"]).to.eq(3);
        expect(probe["hello"]).to.eq(0);

        probe = lang.arrToMap(arr, 3);
        expect(probe["hello"]).to.eq(3);
        expect(probe.length).to.eq(4);
        expect(probe["me"]).to.eq(6);
    });

    it('trim working', () => {
        const lang = Lang.instance;
        let origStr = " hello world from me    ";
        let trimmed = lang.trim(origStr);
        expect(trimmed).to.exist;
        expect(trimmed).to.eq("hello world from me");

    });

    it('isString working', () => {
        const lang = Lang.instance;
        expect(lang.isString(" ")).to.be.true;
        expect(lang.isString('')).to.be.true;
        expect(lang.isString(null)).to.be.false;
        expect(lang.isString(undefined)).to.be.false;
        expect(lang.isString(function () {
            return true;
        })).to.be.false;
        expect(lang.isString(new Probe())).to.be.false;
    });

    it('isFunc working', () => {
        const lang = Lang.instance;
        expect(lang.isFunc(() => {
        })).to.be.true;
        expect(lang.isFunc(function () {
            return true;
        })).to.be.true;
        expect(lang.isFunc("blarg")).to.be.false;
        expect(lang.isFunc(new Probe())).to.be.false;
    });

    it('mergeMaps working', () => {
        const lang = Lang.instance;
        let probe1 = {
            "key1": "val1",
            "key2": "val1_2",
            "key3": "val_2"
        }

        let probe2 = {
            "key1": "val2_1",
            "key4": "val4"
        }

        let probe3 = {
            "key2": "val2_2",
            "key5": "val5"
        }

        let merged = lang.mergeMaps([probe1, probe2, probe3]);
        expect(merged["key1"]).to.eq("val2_1");
        expect(merged["key2"]).to.eq("val2_2");
        expect(merged["key4"]).to.eq("val4");
        expect(merged["key5"]).to.eq("val5");
    });

    it('objToArray working', () => {
        const lang = Lang.instance;
        let obj_probe = new Probe();
        let resultArr = lang.objToArray(obj_probe);
        expect(lang.assertType(resultArr, Array)).to.be.true;
        expect(resultArr.length).to.eq(0);
        obj_probe = window.document.body.querySelectorAll("div");
        resultArr = lang.objToArray(obj_probe);
        expect(resultArr.length).to.eq(4);
        expect(lang.assertType(resultArr, Array)).to.be.true;
    });

    it('equals ignore case test', () => {
        const lang = Lang.instance;
        expect(lang.equalsIgnoreCase(null, null)).to.be.true;
        expect(lang.equalsIgnoreCase("", "")).to.be.true;
        expect(lang.equalsIgnoreCase("null", "NuLL")).to.be.true;
        expect(lang.equalsIgnoreCase("null ", "NuLL")).to.be.false;
        expect(lang.equalsIgnoreCase("null", "NuLL2")).to.be.false;

    });

});

