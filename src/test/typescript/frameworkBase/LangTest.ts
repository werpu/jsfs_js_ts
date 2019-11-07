import {expect} from 'chai';
import {describe, it} from 'mocha';
import {Lang} from "../../../main/typescript/impl/util/Lang";

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

    it('keyval to string working', () => {
        const lang = Lang.instance;
        let keyval = lang.keyValToStr("key", "val", ":")
        expect(keyval).to.eq("key:val");

    });

    it('equals ignore case test', () => {
        const lang = Lang.instance;
        expect(lang.equalsIgnoreCase(null, null)).to.be.true;
        expect(lang.equalsIgnoreCase("", "")).to.be.true;
        expect(lang.equalsIgnoreCase("null", "NuLL")).to.be.true;
        expect(lang.equalsIgnoreCase("null ", "NuLL")).to.be.false;
        expect(lang.equalsIgnoreCase("null", "NuLL2")).to.be.false;

    });

    /*it('form data test', () => {
        const lang = Lang.instance;
        let sourceData: any = [1, 2, 3];
        let formData: FormDataDecorator = lang.createFormDataDecorator(sourceData);
        expect(formData instanceof FormDataDecorator).to.be.true;
        expect(formData.makeFinal()).to.eq("1&2&3");

        formData.append("bla", "arg");
        expect(formData.makeFinal()).to.eq("1&2&3&bla=arg");
    });*/
});

