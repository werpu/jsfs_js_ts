import {expect} from 'chai';
import {describe, it} from 'mocha';
import {DomQuery} from "../../../../../main/typescript/_ext/monadish/DomQuery";



const jsdom = require("jsdom");
const {JSDOM} = jsdom;

describe('DOMQuery tests', () => {

    beforeEach(() => {

        let dom = new JSDOM(`
            <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
            </head>
            <body>
                <div id="id_1"></div>
                <div id="id_2"  booga="blarg"></div>
                <div id="id_3"></div>
                <div id="id_4"></div>
            </body>
            </html>
    
    `)

        let window = dom.window;


        (<any>global).window = window;
        (<any>global).body = window.document.body;
        (<any>global).document = window.document;
        (<any>global).navigator = {
            language: "en-En"
        };
    });

    it('basic init', () => {
        let probe1 = new DomQuery(window.document.body);
        let probe2 = DomQuery.querySelectorAll("div");
        let probe3 = new DomQuery(probe1, probe2);
        let probe4 = new DomQuery(window.document.body, probe3);


        expect(probe1.length).to.be.eq(1);
        expect(probe2.length == 4).to.be.true;
        expect(probe3.length == 5).to.be.true;
        //still under discussion (we might index to avoid doubles)
        expect(probe4.length == 6).to.be.true;
    });

    it('domquery ops test filter', () => {
        let probe2 = DomQuery.querySelectorAll("div");
        probe2 = probe2.filter((item: DomQuery) => item.id.match((id) => id != "id_1"));
        expect(probe2.length == 3);
    });

    it('domquery ops test2 each', () => {
        let probe2 = DomQuery.querySelectorAll("div");
        let noIter = 0;
        probe2 = probe2.eachElem((item, cnt) => {
            expect(noIter == cnt).to.be.true;
            noIter++;
        });
        expect(noIter == 4).to.be.true;
    });

    it('domquery ops test2 eachNode', () => {
        let probe2 = DomQuery.querySelectorAll("div");
        let noIter = 0;
        probe2 = probe2.each((item, cnt) => {
            expect(item instanceof DomQuery).to.be.true;
            expect(noIter == cnt).to.be.true;
            noIter++;
        });
        expect(noIter == 4).to.be.true;
    });

    it('domquery ops test2 byId', () => {
        let probe2 = DomQuery.byId("id_1");
        expect(probe2.length == 1).to.be.true;
        probe2 = DomQuery.byTagName("div");
        expect(probe2.length == 4).to.be.true;
    });


    it('outerhtml and eval tests', () => {
        let probe1 = new DomQuery(window.document.body);
        probe1.querySelectorAll("#id_1").outerHTML(`
            <div id='barg'>
            
            </div>
            <script type="text/javascript">
                document.getElementById('blarg').innerHTML = 'hello world';
            </script>
            `, true, true);
        expect(window.document.body.innerHTML.indexOf("hello world") != -1).to.be.true;
        expect(window.document.head.innerHTML.indexOf("hello world") == -1).to.be.true;
        expect(window.document.body.innerHTML.indexOf("id_1") == -1).to.be.true;
        expect(window.document.body.innerHTML.indexOf("blarg") != -1).to.be.true;
    });

    it('attrn test and eval tests', () => {

        let probe1 = new DomQuery(document);
        probe1.querySelectorAll("div#id_2").attr("style").value="border=1;";
        let blarg = probe1.querySelectorAll("div#id_2").attr("booga").value;
        let style = probe1.querySelectorAll("div#id_2").attr("style").value;
        let nonexistent = probe1.querySelectorAll("div#id_2").attr("buhaha").value;

        expect(blarg).to.be.eq("blarg");
        expect(style).to.be.eq("border=1;");
        expect(nonexistent).to.be.eq(null);
    });

    it('hasclass and addclass test', () => {
        let probe1 = new DomQuery(document);
        let element = probe1.querySelectorAll("div#id_2");
        element.addClass("booga").addClass("Booga2");

        let classdef = element.attr("class").value;
        expect(classdef).to.eq("booga Booga2");

        element.removeClass("booga2")
        expect(element.hasClass("booga2")).to.be.false;
        expect(element.hasClass("booga")).to.be.true;

    });

});
