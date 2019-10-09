import {DomQuery} from "../../_ext/monadish/DomQuery";
import {Config, IValueHolder} from "../../_ext/monadish/Monad";
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
            return <string> nonce.value;
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
        return <string> nonce.value;
    }

    globalEval(code: string, nonce ?:string): DomQuery {
        return super.globalEval(code, nonce || this.nonce);
    }

    static get windowId() {
        return new ExtDomQuery(document.body).windowId;
    }

    static get nonce(): string {
        return new ExtDomQuery(document.body).nonce;
    }
}