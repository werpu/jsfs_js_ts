
import {Config, IValueHolder, Optional} from "../../ext/monadish/Monad";
import {Const} from "../core/Const";
import {DomQuery, DQ} from "../../ext/monadish/DomQuery";

declare let window: any;

/**
 * Extension which adds implementation specific
 * meta data to our dom qury
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

    get windowId() {

        const fetchWindowIdFromURL = function () {
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
            let result = this.querySelectorAll("form input[name='" + Const.P_WIN_ID + "']");
            if (result.length > 0) {
                throw Error("Multiple different windowIds found in document");
            }

            return (result.isPresent()) ? (<HTMLInputElement>result.getAsElem(0).value).value : fetchWindowIdFromURL();
        } else {
            return fetchWindowIdFromURL();
        }
    }

    /*
    determines the jsfjs nonce and adds them to the namespace
    * this is done once and only lazily
    */
    get nonce(): string {
        //already processed
        let myfacesConfig = new Config(window.myfaces);
        let nonce: IValueHolder<string> = myfacesConfig.assign("config", "cspMeta", "nonce");
        if (nonce.value) {
            return <string>nonce.value;
        }

        let curScript = new DQ(document.currentScript);
        //since our baseline atm is ie11 we cannot use document.currentScript globally
        if (curScript.attr("nonce").value != null) {
            //fastpath for modern browsers
            return curScript.attr("nonce").value;
        }

        let nonceScript = DQ.querySelectorAll("script[src], link[src]").lazyStream
            .filter((item) => item.attr("nonce").value != null && item.attr("src") != null)
            .map((item => !item.attr("src").value.match(/jsf\.js\?ln\=javax\.faces/gi)))
            .first();

        if (nonceScript.isPresent()) {
            nonce.value = DomQuery.byId(nonceScript.value).attr("nonce").value;
        }
        return <string>nonce.value;
    }

    static searchJsfJsFor(item: RegExp): Optional<String> {
        return new ExtDomquery(document).searchJsfJsFor(item);
    }

    searchJsfJsFor(rexp: RegExp): Optional<string> {
        //perfect application for lazy stream
        return DQ.querySelectorAll("script").lazyStream
                .filter(item => {
                    return (item.attr("src").value ?? "").search(/\/javax\.faces\.resource.*\/jsf\.js.*separator/) != -1;
                }).map((item: DQ) => {
                    let result = item.attr("src").value.match(rexp);
                    return decodeURIComponent(result[1]);
                }).first();
    }

    globalEval(code: string, nonce ?: string): DQ {
        return super.globalEval(code, nonce ?? this.nonce);
    }
}

export const ExtDQ = DQ;