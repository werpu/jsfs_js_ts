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

import {Lang} from "./Lang";
import {IValueHolder, Optional, Stream} from "./Monad";
import {XMLQuery} from "./XmlQuery";

export class ElementAttribute implements IValueHolder<string> {

    constructor(private element: DomQuery, private attributeName: string, private defaultVal: string = null) {
    }

    get value(): string {
        let val: Element[] = this.element.get(0).orElse(...[]).values;
        if (!val.length) {
            return this.defaultVal;
        }

        return val[0].getAttribute(this.attributeName);
    }

    set value(value: string) {

        let val: Element[] = this.element.get(0).orElse(...[]).values;

        for (let cnt = 0; cnt < val.length; cnt++) {
            val[cnt].setAttribute(this.attributeName, value);
        }
        val[0].setAttribute(this.attributeName, value);
    }
}

/**
 * small helper for the specialized jsf case
 * @param src
 * @constructor
 */
const DEFAULT_JSF_WHITELIST = (src: string) => {
    return (src.indexOf("ln=scripts") == -1 &&
        src.indexOf("ln=javax.faces") == -1) ||
        (src.indexOf("/jsf.js") == -1 &&
            src.indexOf("/jsf-uncompressed.js") == -1);
};

/**
 * Monadic DomNode representation, ala jquery
 * This is a thin wrapper over querySelectorAll
 * to get slim monadic support
 * to reduce implementation code on the users side.
 * This is vital for frameworks which want to rely on
 * plain dom but still do not want to lose
 * the reduced code footprint of querying dom trees and traversing
 * by using functional patterns.
 *
 * Also a few convenience methods are added to reduce
 * the code footprint of standard dom processing
 * operations like eval
 *
 * TODO add jquery fallback support, since it is supported
 * in most older systems
 * Note parts of this code still stem from the Dom.js I have written 10 years
 * ago, those parts look a little bit ancient and will be replaced over time.
 *
 */
export class DomQuery {

    static absent = new DomQuery();
    private rootNode: Array<Element> = [];

    constructor(...rootNode: Array<Element | DomQuery | Document | Array<any> | string>) {

        if (Optional.fromNullable(rootNode).isAbsent() || !rootNode.length) {
            return;
        } else {
            //we need to flatten out the arrays

            for (let cnt = 0; cnt < rootNode.length; cnt++) {
                if (Lang.instance.isString(rootNode[cnt])) {
                    let foundElement = DomQuery.querySelectorAll(<string>rootNode[cnt]);
                    if (!foundElement.isAbsent()) {
                        rootNode.push(...foundElement.values)
                    }
                } else if (rootNode[cnt] instanceof DomQuery) {
                    this.rootNode.push(...(<any>rootNode[cnt]).values);
                } else if (Lang.instance.isString(rootNode[cnt])) {
                    let result = DomQuery.querySelectorAll(<string>rootNode[cnt]);
                    this.rootNode.push(...result.values);

                } else {
                    this.rootNode.push(<any>rootNode[cnt]);
                }
            }
        }
    }

    /**
     * returns the elements of this dom tree, always as array (keep that in mind)
     */
    get value(): Optional<Element> {

        return this.getAsElem(0);
    }

    get values(): Element[] {
        return this.allElems();
    }

    /**
     * returns the id of the first element
     */
    get id(): Optional<string> {
        return <Optional<string>>this.getAsElem(0).getIf("id");
    }

    /**
     * length of the entire query set
     */
    get length(): number {
        return this.rootNode.length
    }

    /**
     * convenience method for tagName
     */
    get tagName(): Optional<string> {
        return <Optional<string>>this.getAsElem(0).getIf("tagName");
    }

    /**
     * convenience method for type
     */
    get type(): Optional<string> {
        return Optional.fromNullable(this.get(0).attr("type").value);
    }

    get childNodes(): DomQuery {
        let childNodeArr: Array<Element> = [];
        this.eachElem((item: Element) => {
            childNodeArr = childNodeArr.concat(Lang.instance.objToArray(item.childNodes));
        });
        return new DomQuery(...childNodeArr);
    }

    /**
     * binding into stream
     */
    get stream(): Stream<DomQuery> {
        let ret: Array<DomQuery> = [];
        this.each((item) => {
            ret.push(item);
        });
        return new Stream<DomQuery>(...ret);
    }

    /**
     * easy query selector all producer
     *
     * @param selector the selector
     * @returns a results dom query object
     */
    static querySelectorAll(selector: string): DomQuery {
        return new DomQuery(document).querySelectorAll(selector);
    }

    /**
     * byId producer
     *
     * @param selector id
     * @return a DomQuery containing the found elements
     */
    static byId(selector: string | DomQuery | Element): DomQuery {
        if (Lang.instance.isString(selector)) {
            return new DomQuery(document).byId(<string>selector);
        } else {
            return new DomQuery(<any>selector);
        }
    }

    /**
     * byTagName producer
     *
     * @param selector name
     * @return a DomQuery containing the found elements
     */
    static byTagName(selector: string | DomQuery | Element): DomQuery {
        if (Lang.instance.isString(selector)) {
            return new DomQuery(document).byTagName(<string>selector);
        } else {
            return new DomQuery(<any>selector);
        }
    }

    static globalEval(code: string): DomQuery {
        return new DomQuery(document).globalEval(code);
    }

    /**
     * builds the ie nodes properly in a placeholder
     * and bypasses a non script insert bug that way
     * @param markup the marku code
     */
    static fromMarkup(markup: string): DomQuery {
        //TODO check if ie8 still has this problem, probably not we probably
        //can drop this code in favor of html

        //now to the non w3c compliant browsers
        //http://blogs.perl.org/users/clinton_gormley/2010/02/forcing-ie-to-accept-script-tags-in-innerhtml.html
        //we have to cope with deficiencies between ie and its simulations in this case
        let dummyPlaceHolder = new DomQuery(document.createElement("div"));

        //fortunately a table element also works which is less critical than form elements regarding
        //the inner content
        dummyPlaceHolder.html("<table><tbody><tr><td>" + markup + "</td></tr></tbody></table>");
        let childs = dummyPlaceHolder.querySelectorAll("td").get(0).childNodes;
        childs.detach();
        dummyPlaceHolder.html("");
        return childs;
    }

    /**
     * returns the nth element as domquery
     * from the internal elements
     * note if you try to reach a non existing element position
     * you will get back an absent entry
     *
     * @param index the nth index
     */
    get(index: number): DomQuery {
        return (index < this.rootNode.length) ? new DomQuery(this.rootNode[index]) : DomQuery.absent;
    }

    /**
     * returns the nth element as optional of an Element object
     * @param index the number from the index
     * @param defaults the default value if the index is overrun default Optional.absent
     */
    getAsElem(index: number, defaults: Optional<any> = Optional.absent): Optional<Element> {
        return (index < this.rootNode.length) ? Optional.fromNullable(this.rootNode[index]) : defaults;
    }

    /**
     * returns the value array< of all elements
     */
    allElems(): Array<Element> {
        return this.rootNode;
    }

    /**
     * absent no values reached?
     */
    isAbsent(): boolean {
        return this.length == 0;
    }

    /**
     * any value present
     */
    isPresent(): boolean {
        return !this.isAbsent();
    }

    /**
     * remove all affected nodes from this query object from the dom tree
     */
    delete() {
        this.eachElem((node: Element) => {
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        });
    }

    /**
     * query selector all on the existing dom query object
     *
     * @param selector the standard selector
     * @return a DomQuery with the results
     */
    querySelectorAll(selector): DomQuery {
        if (this.rootNode.length == 0) {
            return this;
        }
        let nodes = [];
        for (let cnt = 0; cnt < this.rootNode.length; cnt++) {
            if (!this.rootNode[cnt].querySelectorAll) {
                continue;
            }
            let res = this.rootNode[cnt].querySelectorAll(selector);
            nodes = nodes.concat(Lang.instance.objToArray(res));
        }

        return new DomQuery(...nodes);
    }

    /**
     * core byId method
     * @param id the id to search for
     * @param includeRoot also match the root element?
     */
    byId(id: string, includeRoot?: boolean): DomQuery {
        let res: Array<DomQuery> = [];
        for (let cnt = 0; includeRoot && cnt < this.rootNode.length; cnt++) {
            if (this.rootNode[cnt].id == id) {
                res.push(new DomQuery(this.rootNode[cnt]));
            }
        }
        res = res.concat(this.querySelectorAll("#" + id));
        return new DomQuery(...res);
    }

    /**
     * same as byId just for the tag name
     * @param tagName
     * @param includeRoot
     */
    byTagName(tagName: string, includeRoot ?: boolean): DomQuery {
        let res = [];
        for (let cnt = 0; includeRoot && cnt < this.rootNode.length; cnt++) {
            if (this.rootNode[cnt].tagName == tagName) {
                res.push(new DomQuery(this.rootNode[cnt]));
            }
        }
        res = res.concat(this.querySelectorAll(tagName));
        return new DomQuery(...res);
    }

    /**
     * attr accessor, usage myQuery.attr("class").value = "bla"
     * or let value myQuery.attr("class").value
     * @param attr the attribute to set
     * @param defaultValue the default value in case nothing is presented (defaults to null)
     */
    attr(attr: string, defaultValue: string = null): ElementAttribute {
        return new ElementAttribute(this, attr, defaultValue);
    }

    /**
     * hasclass, checks for an existing class in the class attributes
     *
     * @param clazz the class to search for
     */
    hasClass(clazz: string) {
        let hasIt = false;

        this.each((item) => {
            let oldClass = item.attr("class").value || "";
            if (oldClass.toLowerCase().indexOf(clazz.toLowerCase()) == -1) {
                return;
            } else {
                let oldClasses = oldClass.split(/\s+/gi);
                let found = false;
                for (let cnt = 0; cnt < oldClasses.length && !found; cnt++) {
                    found = oldClasses[cnt].toLowerCase() == clazz.toLowerCase();
                }
                hasIt = hasIt || found;
                if (hasIt) {
                    return false;
                }
            }
        });
        return hasIt;
    }

    /**
     * appends a class string if not already in the element(s)
     *
     * @param clazz the style class to append
     */
    addClass(clazz: string): DomQuery {
        this.each((item) => {
            let oldClass = item.attr("class").value || "";
            if (!this.hasClass(clazz)) {
                item.attr("class").value = Lang.instance.trim(oldClass + " " + clazz);
                return;
            }
        });
        return this;
    }

    /**
     * remove the style class if in the class definitions
     *
     * @param clazz
     */
    removeClass(clazz: string): DomQuery {
        this.each((item) => {
            if (this.hasClass(clazz)) {
                let oldClass = item.attr("class").value || "";
                let newClasses = [];
                let oldClasses = oldClass.split(/\s+/gi);
                for (let cnt = 0; cnt < oldClasses.length; cnt++) {
                    if (oldClasses[cnt].toLowerCase() != clazz.toLowerCase()) {
                        newClasses.push(oldClasses[cnt]);
                    }
                }
                item.attr("class").value = newClasses.join(" ");
            }
        });
        return this;
    }

    /**
     * checks whether we have a multipart element in our children
     */
    isMultipartCandidate(): boolean {
        return this.querySelectorAll("input[type='file']").firstElem().isPresent();
    }

    /**
     * innerHtml equivalkent
     * equivalent to jqueries html
     * as setter the html is set and the
     * DomQuery is given back
     * as getter the html string is returned
     *
     * @param inval
     */
    html(inval?: string): DomQuery | Optional<string> {
        if (Optional.fromNullable(inval).isAbsent()) {
            return this.getAsElem(0).isPresent() ? Optional.fromNullable(this.getAsElem(0).value.innerHTML) : Optional.absent;
        }
        if (this.getAsElem(0).isPresent()) {
            this.getAsElem(0).value.innerHTML = inval;
        }
        return this;
    }

    /**
     * easy node traversal, you can pass
     * a set of node selectors which are joined as direct childs
     * @param nodeSelector
     */
    getIf(...nodeSelector: Array<string>): DomQuery {
        return this.querySelectorAll(" > " + nodeSelector.join(">"));
    }

    eachElem(func: (item: Element, cnt?: number) => any): DomQuery {
        for (let cnt = 0, len = this.rootNode.length; cnt < len; cnt++) {
            if (func(this.rootNode[cnt], cnt) === false) {
                break;
            }
        }
        return this;
    }

    firstElem(func: (item: Element, cnt?: number) => any = item => item): DomQuery {
        if (this.rootNode.length > 1) {
            func(this.rootNode[0], 0);
        }
        return this;
    }

    each(func: (item: DomQuery, cnt?: number) => any): DomQuery {
        for (let cnt = 0, len = this.rootNode.length; cnt < len; cnt++) {
            if (func(this.get(cnt), cnt) === false) {
                break;
            }
        }
        return this;
    }

    /**
     * returns a new dom query containing only the first element max
     *
     * @param func a an optional callback function to perform an operation on the first element
     */
    first(func: (item: DomQuery, cnt?: number) => any = (item) => item): DomQuery {
        if (this.rootNode.length >= 1) {
            func(this.get(0), 0);
            return this.get(0);
        }
        return this;
    }

    /**
     * filter function which filters a subset
     *
     * @param func
     */
    filter(func: (item: DomQuery) => boolean): DomQuery {
        let reArr: Array<DomQuery> = [];
        this.each((item: DomQuery) => {
            func(item) ? reArr.push(item) : null;
        });
        return new DomQuery(...<any>reArr);
    }

    //TODO append prepend

    /**
     * globa eval head appendix method
     * no other methods are supported anymore
     * @param code the code to be evaled
     * @param  nonce optional  nonce key for higher security
     */
    globalEval(code: string, nonce ?: string): DomQuery {
        let head = document.getElementsByTagName("head")[0] || document.documentElement;
        let script = document.createElement("script");
        if (nonce) {
            script.setAttribute("nonce", nonce);
        }
        script.type = "text/javascript";
        script.text = code;
        head.insertBefore(script, head.firstChild);
        head.removeChild(script);
        return this;
    }

    /**
     * detaches a set of nodes from their parent elements
     * in a browser independend manner
     * @param {Object} items the items which need to be detached
     * @return {Array} an array of nodes with the detached dom nodes
     */
    detach(): DomQuery {
        this.eachElem((item: Element) => {
            item.parentNode.removeChild(item);
        });
        return this;
    }

    /**
     * appends the current set of elements
     * to the element or first element passed via elem
     * @param elem
     */
    appendTo(elem: DomQuery) {
        this.eachElem((item) => {
            let value1: Element = <Element>elem.getAsElem(0).get(Optional.fromNullable({
                appendChild: (theItem: any) => {
                }
            })).value;
            value1.appendChild(item);
        });
    }

    /**
     * loads and evals a script from a source uri
     *
     * @param src the source to be loaded and evaled
     * @param defer in miliseconds execution default (0 == no defer)
     * @param charSet
     */
    loadScriptEval(src: string, defer: number = 0, charSet: string) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", src, false);

        if (charSet) {
            xhr.setRequestHeader("Content-Type", "application/x-javascript; charset:" + charSet);
        }

        xhr.send(null);

        //since we are synchronous we do it after not with onReadyStateChange

        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                //defer also means we have to process after the ajax response
                //has been processed
                //we can achieve that with a small timeout, the timeout
                //triggers after the processing is done!
                if (!defer) {
                    this.globalEval(xhr.responseText.replace("\n", "\r\n") + "\r\n//@ sourceURL=" + src);
                } else {
                    //TODO not ideal we maybe ought to move to something else here
                    //but since it is not in use yet, it is ok
                    setTimeout(function () {
                        this.globalEval(xhr.responseText + "\r\n//@ sourceURL=" + src);
                    }, defer);
                }
            } else {
                throw Error(xhr.responseText);
            }
        } else {
            throw Error("Loading of script " + src + " failed ");
        }
        return this;
    }

    insertAfter(...elem: Array<DomQuery>) {
        let sibling = this.getAsElem(0).value;
        for (let cnt = 0; cnt < elem.length; cnt++) {
            elem[cnt].eachElem((myElem: Element) => {
                sibling.parentNode.insertBefore(myElem, sibling.nextSibling);
                sibling = <Element>sibling.nextSibling;
                this.rootNode.push(myElem);
            });
        }
        return this;
    }

    insertBefore(...elem: Array<DomQuery>) {
        for (let cnt = 0; cnt < elem.length; cnt++) {
            elem[cnt].eachElem((myElem: Element) => {
                this.getAsElem(0).value.parentNode.insertBefore(myElem, this.getAsElem(0).value);
                this.rootNode.push(myElem);
            });
        }
        return this;
    }

    orElse(...elseValue: any): DomQuery {
        if (this.isPresent()) {
            return this;
        } else {
            return new DomQuery(...elseValue);
        }
    }

    orElseLazy(func: () => any): DomQuery {
        if (this.isPresent()) {
            return this;
        } else {
            return new DomQuery(func());
        }
    }

    parents(tagName: string): DomQuery {
        let retArr = [];
        const lowerTagName = tagName.toLowerCase();
        let resolveItem = (item: Element) => {

            if (item.tagName.toLowerCase() == lowerTagName) {
                retArr.push(item);
            }

        };

        this.eachElem((item: Element) => {
            while (item.parentNode) {
                item = <Element>item.parentNode;
                resolveItem(item);
                //nested forms not possible, performance shortcut
                if (tagName == "form" && retArr.length) {
                    return false;
                }
            }
        });
        return new DomQuery(...retArr);
    }

    copyAttrs(sourceItem: DomQuery | XMLQuery): DomQuery {
        sourceItem.eachElem((sourceNode: Element) => {
            for (let cnt = 0; cnt < sourceNode.attributes.length; cnt++) {
                let value = sourceNode.attributes[cnt].value;
                if (value) {
                    this.attr(sourceNode.attributes[cnt].name).value = value;
                }
            }
        });
        return this;
    }

    /**
     * outerhtml convenience method
     * browsers only support innerHTML but
     * for instance for your jsf.js we have a full
     * replace pattern which needs outerHTML processing
     *
     * @param markup
     * @param runEmbeddedScripts
     * @param runEmbeddedCss
     */
    outerHTML(markup: string, runEmbeddedScripts ?: boolean, runEmbeddedCss ?: boolean): DomQuery {
        let nodes = DomQuery.fromMarkup(markup);

        this.getAsElem(0).value.parentNode.replaceChild(nodes.getAsElem(0).value, this.getAsElem(0).value);
        this.rootNode = [];
        this.rootNode = this.rootNode.concat(nodes.values);
        // this.rootNode.push(nodes.value);

        for (let cnt = 1; cnt < nodes.length; cnt++) {
            this.insertAfter(nodes.get(cnt));
        }

        if (runEmbeddedScripts) {
            this.runScripts();
        }
        if (runEmbeddedCss) {
            this.runCss();
        }

        return this;
    }

    /**
     * Run through the given nodes in the DomQuery execute the inline scripts
     * @param whilteListed: optional whitelist function which can filter out script tags which are not processed
     * defaults to the standard jsf.js exclusion (we use this code for myfaces)
     */
    runScripts(whilteListed: (val: string) => boolean = DEFAULT_JSF_WHITELIST): DomQuery {
        let _Lang = Lang.instance,
            finalScripts = [],
            execScrpt = (item) => {
                let tagName = item.tagName;
                let itemType = item.type || "";
                if (tagName && _Lang.equalsIgnoreCase(tagName, "script") &&
                    (itemType === "" || _Lang.equalsIgnoreCase(itemType, "text/javascript") ||
                        _Lang.equalsIgnoreCase(itemType, "javascript") ||
                        _Lang.equalsIgnoreCase(itemType, "text/ecmascript") ||
                        _Lang.equalsIgnoreCase(itemType, "ecmascript"))) {
                    let src = item.getAttribute('src');
                    if ('undefined' != typeof src
                        && null != src
                        && src.length > 0
                    ) {
                        //we have to move this into an inner if because chrome otherwise chokes
                        //due to changing the and order instead of relying on left to right
                        //if jsf.js is already registered we do not replace it anymore
                        if (whilteListed(src)) {
                            if (finalScripts.length) {
                                //script source means we have to eval the existing
                                //scripts before running the include
                                this.globalEval(finalScripts.join("\n"));

                                finalScripts = [];
                            }
                            this.loadScriptEval(src, 0, "UTF-8");
                        }

                    } else {
                        // embedded script auto eval
                        let test = item.text;
                        let go = true;
                        while (go) {
                            go = false;
                            if (test.substring(0, 1) == " ") {
                                test = test.substring(1);
                                go = true;
                            }
                            if (test.substring(0, 4) == "<!--") {
                                test = test.substring(4);
                                go = true;
                            }
                            if (test.substring(0, 11) == "//<![CDATA[") {
                                test = test.substring(11);
                                go = true;
                            }
                        }
                        // we have to run the script under a global context
                        //we store the script for less calls to eval
                        finalScripts.push(test);

                    }
                }
            };
        try {
            let scriptElements = this.querySelectorAll("script");
            if (scriptElements == null) return;
            for (let cnt = 0; cnt < scriptElements.length; cnt++) {
                execScrpt(scriptElements.getAsElem(cnt).value);
            }
            if (finalScripts.length) {
                this.globalEval(finalScripts.join("\n"));
            }
        } catch (e) {
            if (window.console && window.console.error) {
                //not sure if we
                //should use our standard
                //error mechanisms here
                //because in the head appendix
                //method only a console
                //error would be raised as well
                console.error(e.message || e.description);
            }
        } finally {
            //the usual ie6 fix code
            //the IE6 garbage collector is broken
            //nulling closures helps somewhat to reduce
            //mem leaks, which are impossible to avoid
            //at this browser
            execScrpt = null;
        }
    }

    runCss(): DomQuery {

        const UDEF = "undefined",
            // _RT = this._RT,
            _Lang = Lang.instance,
            applyStyle = (item: Element, style: string) => {
                let newSS: HTMLStyleElement = document.createElement("style");
                document.getElementsByTagName("head")[0].appendChild(newSS);

                let styleSheet = newSS.sheet ? newSS.sheet : (<any>newSS).styleSheet;

                newSS.setAttribute("rel", item.getAttribute("rel") || "stylesheet");
                newSS.setAttribute("type", item.getAttribute("type") || "text/css");

                if (UDEF != typeof styleSheet.cssText) {
                    styleSheet.cssText = style;
                } else {
                    newSS.appendChild(document.createTextNode(style));
                }

            },

            execCss = (item: Element) => {
                const equalsIgnoreCase = _Lang.equalsIgnoreCase;
                const tagName = item.tagName;
                if (tagName && equalsIgnoreCase(tagName, "link") && equalsIgnoreCase(item.getAttribute("type"), "text/css")) {
                    applyStyle(item, "@import url('" + item.getAttribute("href") + "');");
                } else if (tagName && equalsIgnoreCase(tagName, "style") && equalsIgnoreCase(item.getAttribute("type"), "text/css")) {
                    let innerText = [];
                    //compliant browsers know child nodes
                    let childNodes: NodeList = item.childNodes;
                    if (childNodes) {
                        const len = childNodes.length;
                        for (let cnt = 0; cnt < len; cnt++) {
                            innerText.push((<Element>childNodes[cnt]).innerHTML || (<CharacterData>childNodes[cnt]).data);
                        }
                        //non compliant ones innerHTML
                    } else if (item.innerHTML) {
                        innerText.push(item.innerHTML);
                    }

                    applyStyle(item, innerText.join(""));
                }
            };

        const scriptElements: DomQuery = this.querySelectorAll("link, style");
        if (scriptElements == null) return;
        for (let cnt = 0; cnt < scriptElements.length; cnt++) {
            let element: any = scriptElements.getAsElem(cnt);
            execCss(element.value);
        }

        return this;
    }

    /**
     * fires a click event on the underlying dom elements
     */
    click(): DomQuery {
        this.fireEvent("click");
        return this;
    }

    addEventListener(type: string, listener: (evt: Event) => void, options?: boolean | EventListenerOptions): DomQuery {
        this.eachElem((node: Element) => {
            node.addEventListener(type, listener, options);
        });
        return this;
    }

    removeEventListener(type: string, listener: (evt: Event) => void, options?: boolean | EventListenerOptions): DomQuery {
        this.eachElem((node: Element) => {
            node.removeEventListener(type, listener, options);
        });
        return this;
    }

    /**
     * fires an event
     */
    fireEvent(eventName: string) {
        this.eachElem((node: Element) => {
            var doc;
            if (node.ownerDocument) {
                doc = node.ownerDocument;
            } else if (node.nodeType == 9) {
                // the node may be the document itself, nodeType 9 = DOCUMENT_NODE
                doc = node;
            } else {
                throw new Error("Invalid node passed to fireEvent: " + node.id);
            }

            if (node.dispatchEvent) {
                // Gecko-style approach (now the standard) takes more work
                var eventClass = "";

                // Different events have different event classes.
                // If this switch statement can't map an eventName to an eventClass,
                // the event firing is going to fail.
                switch (eventName) {
                    case "click": // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
                    case "mousedown":
                    case "mouseup":
                        eventClass = "MouseEvents";
                        break;

                    case "focus":
                    case "change":
                    case "blur":
                    case "select":
                        eventClass = "HTMLEvents";
                        break;

                    default:
                        throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
                        break;
                }
                var event = doc.createEvent(eventClass);
                event.initEvent(eventName, true, true); // All events created as bubbling and cancelable.

                event.synthetic = true; // allow detection of synthetic events
                // The second parameter says go ahead with the default action
                node.dispatchEvent(event);
            } else if ((<any>node).fireEvent) {
                // IE-old school style, you can drop this if you don't need to support IE8 and lower
                var event = doc.createEventObject();
                event.synthetic = true; // allow detection of synthetic events
                (<any>node).fireEvent("on" + eventName, event);
            }
        })
    }

    //TODO maybe move this out into a specialized domquery implementation

    private subNodes(from: number, to?: number): DomQuery {
        if (Optional.fromNullable(to).isAbsent()) {
            to = this.length;
        }
        return new DomQuery(...this.rootNode.slice(from, Math.min(to, this.length)));
    }

    //in the myfaces project
    private encodeElement(element: HTMLInputElement | HTMLSelectElement, targetBuf: { [key: string]: any }) {

        //browser behavior no element name no encoding (normal submit fails in that case)
        //https://issues.apache.org/jira/browse/MYFACES-2847
        if (!element.name) {
            return;
        }

        let name = element.name;
        let tagName = element.tagName.toLowerCase();
        let elemType = element.type;
        if (elemType != null) {
            elemType = elemType.toLowerCase();
        }

        // routine for all elements
        // rules:
        // - process only inputs, textareas and selects
        // - elements muest have attribute "name"
        // - elements must not be disabled
        if (((tagName == "input" || tagName == "textarea" || tagName == "select") &&
            (name != null && name != "")) && !element.disabled) {

            // routine for select elements
            // rules:
            // - if select-one and value-Attribute exist => "name=value"
            // (also if value empty => "name=")
            // - if select-one and value-Attribute don't exist =>
            // "name=DisplayValue"
            // - if select multi and multple selected => "name=value1&name=value2"
            // - if select and selectedIndex=-1 don't submit
            if (tagName == "select") {
                // selectedIndex must be >= 0 sein to be submittet
                if ((<HTMLSelectElement>element).selectedIndex >= 0) {
                    let uLen = (<HTMLSelectElement>element).options.length;
                    for (let u = 0; u < uLen; u++) {
                        // find all selected options
                        //let subBuf = [];
                        if ((<any>(<HTMLSelectElement>element).options[u]).selected) {
                            let elementOption = (<HTMLSelectElement>element).options[u];
                            targetBuf[name] = (elementOption.getAttribute("value") != null) ?
                                elementOption.getAttribute("value") : elementOption.getAttribute("text");
                        }
                    }
                }
            }

            // routine for remaining elements
            // rules:
            // - don't submit no selects (processed above), buttons, reset buttons, submit buttons,
            // - submit checkboxes and radio inputs only if checked
            if ((tagName != "select" && elemType != "button"
                && elemType != "reset" && elemType != "submit" && elemType != "image")
                && ((elemType != "checkbox" && elemType != "radio") || (<HTMLInputElement>element).checked)) {
                if ('undefined' != typeof (<HTMLInputElement>element).files && (<HTMLInputElement>element).files != null && (<HTMLInputElement>element).files.length) {
                    //xhr level2
                    targetBuf[name] = (<HTMLInputElement>element).files[0];
                } else {
                    targetBuf[name] = element.value;
                }
            }

        }
    }
}



