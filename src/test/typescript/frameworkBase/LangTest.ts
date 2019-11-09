import {expect} from 'chai';
import {describe, it} from 'mocha';
import {Lang} from "../../../main/typescript/ext/monadish";

import equalsIgnoreCase = Lang.equalsIgnoreCase;
import assertType = Lang.assertType;
import objToArray = Lang.objToArray;
import isFunc = Lang.isFunc;
import isString = Lang.isString;
import trim = Lang.trim;
import strToArray = Lang.strToArray;
import {ExtLang} from "../../../main/typescript/impl/util/Lang";
import keyValToStr = ExtLang.keyValToStr;


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
;

function hello_world() {
    return "Hello World!"
}

describe('Hello World!', () => {
    before(() => {
        (<any>global).window = window;
        (<any>global).document = window.document;
        (<any>global).navigator = {
            language: "en-En"
        };

    });
    it('first test', () => {
        const result = hello_world();
        expect(result).to.equal('Hello World!');
    });
});

class Probe {

    val1 = 1;
    val2 = 2;
    val3 = 3;

    constructor() {
    }
}

describe('Lang tests', () => {
    it('initializable', () => {
        const lang = Lang;
        expect(lang).to.exist;
    });

    it('strToArray working', () => {
        const lang = Lang;

        let arr = strToArray("hello.world.from.me", /\./gi);

        expect(arr).to.exist;
        expect(arr.length).to.eq(4);
        expect(arr[3]).to.eq("me");

    });

    it('trim working', () => {
        const lang = Lang;
        let origStr = " hello world from me    ";
        let trimmed = trim(origStr);
        expect(trimmed).to.exist;
        expect(trimmed).to.eq("hello world from me");

    });

    it('isString working', () => {
        const lang = Lang;
        expect(isString(" ")).to.be.true;
        expect(isString('')).to.be.true;
        expect(isString(null)).to.be.false;
        expect(isString(undefined)).to.be.false;
        expect(isString(function () {
            return true;
        })).to.be.false;
        expect(isString(new Probe())).to.be.false;
    });

    it('isFunc working', () => {
        const lang = Lang;
        expect(isFunc(() => {
        })).to.be.true;
        expect(isFunc(function () {
            return true;
        })).to.be.true;
        expect(isFunc("blarg")).to.be.false;
        expect(isFunc(new Probe())).to.be.false;
    });

    it('objToArray working', () => {
        const lang = Lang;
        let obj_probe = new Probe();
        let resultArr = objToArray(obj_probe);
        expect(assertType(resultArr, Array)).to.be.true;
        expect(resultArr.length).to.eq(0);
        obj_probe = window.document.body.querySelectorAll("div");
        resultArr = objToArray(obj_probe);
        expect(resultArr.length).to.eq(4);
        expect(assertType(resultArr, Array)).to.be.true;
    });

    it('keyval to string working', () => {
        const lang = Lang;
        let keyval = keyValToStr("key", "val", ":")
        expect(keyval).to.eq("key:val");

    });

    it('equals ignore case test', () => {
        const lang = Lang;
        expect(equalsIgnoreCase(null, null)).to.be.true;
        expect(equalsIgnoreCase("", "")).to.be.true;
        expect(equalsIgnoreCase("null", "NuLL")).to.be.true;
        expect(equalsIgnoreCase("null ", "NuLL")).to.be.false;
        expect(equalsIgnoreCase("null", "NuLL2")).to.be.false;

    });

    /*it('form data test', () => {
        const lang = Lang;
        let sourceData: any = [1, 2, 3];
        let formData: FormDataDecorator = createFormDataDecorator(sourceData);
        expect(formData instanceof FormDataDecorator).to.be.true;
        expect(formData.makeFinal()).to.eq("1&2&3");

        formData.append("bla", "arg");
        expect(formData.makeFinal()).to.eq("1&2&3&bla=arg");
    });*/
});

