import {Config, IValueHolder, Optional, DomQuery, DQ} from "mona-dish";
import {EMPTY_STR, P_WINDOW_ID} from "../core/Const";

declare let window: any;


/**
 * detects whether a source is a jsf.js request
 *
 * @param source the source string for the jsf.js request
 * @return true if a jsf.js loading pattern is detected
 * @constructor
 */
const IS_JSF_SOURCE = (source?: string): boolean => {
    return source && !!(source?.search(/\/javax\.faces\.resource.*\/jsf\.js.*/) != -1 ||
        source?.search(/\/jsf\-development\.js.*/) != -1 ||
        source?.search(/\/jsf\-uncompressed\.js.*/) != -1 ||
        source?.search(/\/jsf[^\.]\.js.*ln\=javax.faces.*/gi) != -1);
}

/**
 * namespace myfaces.testscripts can be used as extension point for internal
 * tests, those will be handled similarly to jsf.js regarding
 * reload blocking on ajax requests
 *
 * @param source the source to check
 * @constructor
 */
const IS_INTERNAL_SOURCE = (source: string): boolean => {
    return  source.search(/\/jsf[^\.]\.js.*ln\=myfaces.testscripts.*/gi) != -1;
}


/**
 * Extension which adds implementation specific
 * meta data to our dom query
 *
 * Usage
 * el = new ExtDQ(oldReference)
 * nonce = el.nonce
 * windowId = el.getWindowId
 */
export class ExtDomquery extends DQ {

    static get windowId() {
        return new ExtDomquery(document.body).windowId;
    }

    static get nonce(): string {
        return new ExtDomquery(document.body).nonce;
    }

    get windowId(): string | null {

        const fetchWindowIdFromURL = function (): string | null {
            let href = window.location.href;
            let windowId = "windowId";
            let regex = new RegExp("[\\?&]" + windowId + "=([^&#\\;]*)");
            let results = regex.exec(href);
            //initial trial over the url and a regexp
            if (results != null) return results[1];
            return null;
        };

        //byId ($)
        if (this.value.isPresent()) {
            let result = this.querySelectorAll("form input[name='" + P_WINDOW_ID + "']");
            if (result.length > 0) {
                throw Error("Multiple different windowIds found in document");
            }

            return (result.isPresent()) ? (<HTMLInputElement>result.getAsElem(0).value).value : fetchWindowIdFromURL();
        } else {
            return fetchWindowIdFromURL();
        }
    }

    /*
    * determines the jsf.js nonce and adds them to the namespace
    * this is done once and only lazily
    */
    get nonce(): string | null {
        //already processed
        let myfacesConfig = new Config(window.myfaces);
        let nonce: IValueHolder<string> = myfacesConfig.getIf("config", "cspMeta", "nonce");
        if (nonce.value) {
            return <string>nonce.value;
        }

        let curScript = new DQ(document.currentScript);
        //since our baseline atm is ie11 we cannot use document.currentScript globally
        if (curScript.attr("nonce").value != null) {
            // fastpath for modern browsers
            return curScript.attr("nonce").value;
        }
        // fallback if the currentScript method fails, we just search the jsf tags for nonce, this is
        // the last possibility
        let nonceScript = DQ
            .querySelectorAll("script[src], link[src]")
            .lazyStream
            .filter((item) => item.attr("nonce").value != null && item.attr("src") != null)
            .map(item => IS_JSF_SOURCE(item.attr('src').value))
            .first();

        if (nonceScript.isPresent()) {
            nonce.value = DomQuery.byId(nonceScript.value, true).attr("nonce").value;
        }
        return <string>nonce.value;
    }

    static searchJsfJsFor(item: RegExp): Optional<String> {
        return new ExtDomquery(document).searchJsfJsFor(item);
    }

    /**
     * searches the embedded jsf.js for items like separator char etc..
     * expects a match as variable under position 1 in the result match
     * @param rexp
     */
    searchJsfJsFor(rexp: RegExp): Optional<string> {
        //perfect application for lazy stream
        return DQ.querySelectorAll("script[src], link[src]").lazyStream
                .filter(item => IS_JSF_SOURCE(item.attr('src').value))
                .map(item => item.attr("src").value.match(rexp))
                .filter(item => item != null && item.length > 1)
                .map((result: string[]) => {
                    return decodeURIComponent(result[1]);
                }).first();
    }

    globalEval(code: string, nonce ?: string): DQ {
        return super.globalEval(code, nonce ?? this.nonce);
    }

    /**
     * decorated run scripts which takes our jsf extensions into consideration
     * (standard DomQuery will let you pass anything)
     * @param whilteListed
     */
    runScripts(whilteListed?: (src: string) => boolean): DomQuery {
        const whitelistFunc = (src: string): boolean => {
            return (whilteListed?.(src) ?? true) && !IS_JSF_SOURCE(src)  && !IS_INTERNAL_SOURCE(src);
        };
        return super.runScripts(whitelistFunc);
    }

    /**
     * byId producer
     *
     * @param selector id
     * @return a DomQuery containing the found elements
     */
    static byId(selector: string | DomQuery | Element, deep = false): DomQuery {
        const ret = DomQuery.byId(selector, deep);
        //return new ExtDomquery(ret);
        return ret;
    }
}

export const ExtDQ = DQ;