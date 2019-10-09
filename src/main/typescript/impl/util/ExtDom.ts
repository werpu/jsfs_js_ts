import {Lang} from "./Lang";
import {DomQuery} from "../../_ext/monadish/DomQuery";

export class ExtDom {

    //TODO check if we still need this
    static getWindowId(node?: HTMLElement | string) {
        let FORM = "form";
        let WIN_ID = "javax.faces.WindowId";

        let fetchWindowIdFromForms = function (forms) {
            let result_idx = {};
            let result;
            let foundCnt = 0;
            for (let cnt = forms.length - 1; cnt >= 0; cnt--) {
                let UDEF = 'undefined';
                let currentForm = forms[cnt];
                let windowId = currentForm[WIN_ID] && currentForm[WIN_ID].value;
                if (UDEF != typeof windowId) {
                    if (foundCnt > 0 && UDEF == typeof result_idx[windowId]) throw Error("Multiple different windowIds found in document");
                    result = windowId;
                    result_idx[windowId] = true;
                    foundCnt++;
                }
            }
            return result;
        };

        let getChildForms = function (currentElement:HTMLElement):Array<HTMLElement> {
            //Special condition no element we return document forms
            //as search parameter, ideal would be to
            //have the viewroot here but the frameworks
            //can deal with that themselves by using
            //the viewroot as currentElement
            if (!currentElement) {
                return Lang.instance.objToArray(document.forms);
            }

            let targetArr:Array<HTMLElement> = [];
            if (!currentElement.tagName) return [];
            else if (currentElement.tagName.toLowerCase() == FORM) {
                targetArr.push(currentElement);
                return targetArr;
            }

            //if query selectors are supported we can take
            //a non recursive shortcut
            return Lang.instance.objToArray(currentElement.querySelectorAll(FORM));
        };

        let fetchWindowIdFromURL = function () {
            let href = window.location.href;
            let windowId = "windowId";
            let regex = new RegExp("[\\?&]" + windowId + "=([^&#\\;]*)");
            let results = regex.exec(href);
            //initial trial over the url and a regexp
            if (results != null) return results[1];
            return null;
        };

        //byId ($)
        if(node) {
            let finalNode:HTMLElement = <HTMLElement> DomQuery.byId(node).getAsElem(0).value;
            let forms = getChildForms(finalNode);
            let result = fetchWindowIdFromForms(forms);
            return (null != result) ? result : fetchWindowIdFromURL();
        } else {
            return fetchWindowIdFromURL();
        }
    }

}