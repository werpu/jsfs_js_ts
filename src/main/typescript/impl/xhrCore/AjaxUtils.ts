import {Dom} from "../util/Dom";

export class AjaxUtils {
    /**
     * determines fields to submit
     * @param {Object} targetBuf - the target form buffer receiving the data
     * @param {Node} parentItem - form element item is nested in
     * @param {Array} partialIds - ids fo PPS
     */
    static encodeSubmittableFields(targetBuf: any,
                                       parentItem: HTMLFormElement, partialIds ?: string[]) {
        if (!parentItem) throw "NO_PARITEM";
        if (partialIds ) {
            this.encodePartialSubmit(partialIds, targetBuf);
        } else {
            // add all nodes
            var eLen = parentItem.elements.length;
            for (var e = 0; e < eLen; e++) {
                this.encodeElement(<HTMLFormElement> parentItem.elements[e], targetBuf);
            } // end of for (formElements)
        }
    }

    static encodePartialSubmit(partialIds: string[], targetBuf: {[key: string]: any}) {
        for(let cnt = 0; cnt < partialIds.length; cnt++) {
           let element:HTMLFormElement = <HTMLFormElement> Dom.instance.byId(partialIds[cnt]);
           this.encodeElement(element, targetBuf);
        }
    }

    /**
     * appends the issuing item if not given already
     * @param item
     * @param targetBuf
     */
    static appendIssuingItem(item, targetBuf) {
        // if triggered by a Button send it along
        if (item && item.type && item.type.toLowerCase() == "submit") {
            targetBuf.append(item.name, item.value);
        }
    }


    /**
     * encodes a single input element for submission
     *
     * @param {Node} element - to be encoded
     * @param {} targetBuf - a target array buffer receiving the encoded strings
     */
    static encodeElement(element: HTMLFormElement, targetBuf: {[key: string]: any}) {

        //browser behavior no element name no encoding (normal submit fails in that case)
        //https://issues.apache.org/jira/browse/MYFACES-2847
        if (!element.name) {
            return;
        }

        var name = element.name;
        var tagName = element.tagName.toLowerCase();
        var elemType = element.type;
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
                if (element.selectedIndex >= 0) {
                    var uLen = element.options.length;
                    for (var u = 0; u < uLen; u++) {
                        // find all selected options
                        //var subBuf = [];
                        if (element.options[u].selected) {
                            var elementOption = element.options[u];
                            targetBuf.append(name, (elementOption.getAttribute("value") != null) ?
                                elementOption.value : elementOption.text);
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
                && ((elemType != "checkbox" && elemType != "radio") || element.checked)) {
                if ('undefined' != typeof element.files && element.files != null && element.files.length) {
                    //xhr level2
                    targetBuf.append(name, element.files[0]);
                } else {
                    targetBuf.append(name, element.value);
                }
            }

        }
    }
}