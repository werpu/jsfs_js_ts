import {DomQuery} from "../../ext/monadish/DomQuery";
import {Config, IValueHolder, Optional} from "../../ext/monadish/Monad";
import {Const} from "../core/Const";

declare let window: any;

/**
 * Extension which adds implementation specific
 * meta data to our dom qury
 *
 * Usage
 * el = new ExtDomQuery(oldReference)
 * nonce = el.nonce
 * windowId = el.getWindowId
 */
export class ExtDomQuery extends DomQuery {

    static get windowId() {
        return new ExtDomQuery(document.body).windowId;
    }

    static get nonce(): string {
        return new ExtDomQuery(document.body).nonce;
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
        let nonce: IValueHolder<string> = myfacesConfig.apply("config", "cspMeta", "nonce");
        if (nonce.value) {
            return <string>nonce.value;
        }

        let curScript = new DomQuery(document.currentScript);
        //since our baseline atm is ie11 we cannot use document.currentScript globally
        if (curScript.attr("nonce").value != null) {
            //fastpath for modern browsers
            return curScript.attr("nonce").value;
        }

        let nonceScript = DomQuery.querySelectorAll("script[src], link[src]")
            .filter((item) => item.attr("nonce").value != null && item.attr("src") != null)
            .first((item => !item.attr("src").value.match(/jsf\.js\?ln\=javax\.faces/gi)));

        if (nonceScript.isPresent()) {
            nonce.value = nonceScript.attr("nonce").value;
        }
        return <string>nonce.value;
    }

    static searchJsfJsFor(item: RegExp): Optional<String> {
        return new ExtDomQuery(document).searchJsfJsFor(item);
    }

    searchJsfJsFor(rexp: RegExp): Optional<string> {
        let res: string = null;
        DomQuery.querySelectorAll("script").filter(item => {
            return (item.attr("src", "").value || "").search(/\/javax\.faces\.resource.*\/jsf\.js.*separator/) != -1;
        }).first((item: DomQuery) => {
            let result = item.attr("src", "").value.match(rexp);
            res = decodeURIComponent(result[1]);
            return false;
        });
        return Optional.fromNullable(res);
    }

    globalEval(code: string, nonce ?: string): DomQuery {
        return super.globalEval(code, nonce || this.nonce);
    }
}