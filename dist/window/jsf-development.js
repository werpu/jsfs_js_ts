/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/mona-dish/src/main/typescript/DomQuery.ts":
/*!****************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/DomQuery.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/*!
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http:// www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DQ$ = exports.DQ = exports.DomQueryCollector = exports.DomQuery = exports.Style = exports.ElementAttribute = void 0;
var Monad_1 = __webpack_require__(/*! ./Monad */ "./node_modules/mona-dish/src/main/typescript/Monad.ts");
var Stream_1 = __webpack_require__(/*! ./Stream */ "./node_modules/mona-dish/src/main/typescript/Stream.ts");
var SourcesCollectors_1 = __webpack_require__(/*! ./SourcesCollectors */ "./node_modules/mona-dish/src/main/typescript/SourcesCollectors.ts");
var Lang_1 = __webpack_require__(/*! ./Lang */ "./node_modules/mona-dish/src/main/typescript/Lang.ts");
var trim = Lang_1.Lang.trim;
var isString = Lang_1.Lang.isString;
var eIgnoreC = Lang_1.Lang.equalsIgnoreCase;
var Global_1 = __webpack_require__(/*! ./Global */ "./node_modules/mona-dish/src/main/typescript/Global.ts");
var objToArray = Lang_1.Lang.objToArray;
/**
 *
 *        // - submit checkboxes and radio inputs only if checked
 if ((tagName != "select" && elemType != "button"
 && elemType != "reset" && elemType != "submit" && elemType != "image")
 && ((elemType != "checkbox" && elemType != "radio"
 */
var ALLOWED_SUBMITTABLE_ELEMENTS;
(function (ALLOWED_SUBMITTABLE_ELEMENTS) {
    ALLOWED_SUBMITTABLE_ELEMENTS["SELECT"] = "select";
    ALLOWED_SUBMITTABLE_ELEMENTS["BUTTON"] = "button";
    ALLOWED_SUBMITTABLE_ELEMENTS["SUBMIT"] = "submit";
    ALLOWED_SUBMITTABLE_ELEMENTS["RESET"] = "reset";
    ALLOWED_SUBMITTABLE_ELEMENTS["IMAGE"] = "image";
    ALLOWED_SUBMITTABLE_ELEMENTS["RADIO"] = "radio";
    ALLOWED_SUBMITTABLE_ELEMENTS["CHECKBOX"] = "checkbox";
})(ALLOWED_SUBMITTABLE_ELEMENTS || (ALLOWED_SUBMITTABLE_ELEMENTS = {}));
/**
 * helper to fix a common problem that a system has to wait, until a certain condition is reached.
 * Depending on the browser this uses either the Mutation Observer or a semi compatible interval as fallback.
 * @param root the root DomQuery element to start from
 * @param condition the condition lambda to be fulfilled
 * @param options options for the search
 */
function waitUntilDom(root, condition, options) {
    if (options === void 0) { options = {
        attributes: true,
        childList: true,
        subtree: true,
        timeout: 500,
        interval: 100
    }; }
    return new Promise(function (success, error) {
        var observer = null;
        var MUT_ERROR = new Error("Mutation observer timeout");
        // we do the same but for now ignore the options on the dom query
        // we cannot use absent here, because the condition might search for an absent element
        function findElement(root, condition) {
            var found = null;
            if (!!condition(root)) {
                return root;
            }
            if (options.childList) {
                found = (condition(root)) ? root : root.childNodes.filter(function (item) { return condition(item); }).first().value.value;
            }
            else if (options.subtree) {
                found = (condition(root)) ? root : root.querySelectorAll(" * ").filter(function (item) { return condition(item); }).first().value.value;
            }
            else {
                found = (condition(root)) ? root : null;
            }
            return found;
        }
        var foundElement = root;
        if (!!(foundElement = findElement(foundElement, condition))) {
            success(new DomQuery(foundElement));
            return;
        }
        if ('undefined' != typeof MutationObserver) {
            var mutTimeout_1 = setTimeout(function () {
                observer.disconnect();
                return error(MUT_ERROR);
            }, options.timeout);
            var callback = function (mutationList) {
                var found = new DomQuery(mutationList.map(function (mut) { return mut.target; })).filter(function (item) { return condition(item); }).first();
                if (found.isPresent()) {
                    clearTimeout(mutTimeout_1);
                    observer.disconnect();
                    success(new DomQuery(found || root));
                }
            };
            observer = new MutationObserver(callback);
            // browsers might ignore it, but we cannot break the api in the case
            // hence no timeout is passed
            var observableOpts_1 = __assign({}, options);
            delete observableOpts_1.timeout;
            root.eachElem(function (item) {
                observer.observe(item, observableOpts_1);
            });
        }
        else { // fallback for legacy browsers without mutation observer
            var interval_1 = setInterval(function () {
                var found = findElement(root, condition);
                if (!!found) {
                    if (timeout_1) {
                        clearTimeout(timeout_1);
                        clearInterval(interval_1);
                        interval_1 = null;
                    }
                    success(new DomQuery(found || root));
                }
            }, options.interval);
            var timeout_1 = setTimeout(function () {
                if (interval_1) {
                    clearInterval(interval_1);
                    error(MUT_ERROR);
                }
            }, options.timeout);
        }
    });
}
var ElementAttribute = /** @class */ (function (_super) {
    __extends(ElementAttribute, _super);
    function ElementAttribute(element, name, defaultVal) {
        if (defaultVal === void 0) { defaultVal = null; }
        var _this = _super.call(this, element, name) || this;
        _this.element = element;
        _this.name = name;
        _this.defaultVal = defaultVal;
        return _this;
    }
    Object.defineProperty(ElementAttribute.prototype, "value", {
        get: function () {
            var _a;
            var val = (_a = this.element.get(0)).orElse.apply(_a, []).values;
            if (!val.length) {
                return this.defaultVal;
            }
            return val[0].getAttribute(this.name);
        },
        set: function (value) {
            var _a;
            var val = (_a = this.element.get(0)).orElse.apply(_a, []).values;
            for (var cnt = 0; cnt < val.length; cnt++) {
                val[cnt].setAttribute(this.name, value);
            }
            val[0].setAttribute(this.name, value);
        },
        enumerable: false,
        configurable: true
    });
    ElementAttribute.prototype.getClass = function () {
        return ElementAttribute;
    };
    ElementAttribute.fromNullable = function (value, valueKey) {
        if (valueKey === void 0) { valueKey = "value"; }
        return new ElementAttribute(value, valueKey);
    };
    return ElementAttribute;
}(Monad_1.ValueEmbedder));
exports.ElementAttribute = ElementAttribute;
var Style = /** @class */ (function (_super) {
    __extends(Style, _super);
    function Style(element, name, defaultVal) {
        if (defaultVal === void 0) { defaultVal = null; }
        var _this = _super.call(this, element, name) || this;
        _this.element = element;
        _this.name = name;
        _this.defaultVal = defaultVal;
        return _this;
    }
    Object.defineProperty(Style.prototype, "value", {
        get: function () {
            var val = this.element.values;
            if (!val.length) {
                return this.defaultVal;
            }
            return val[0].style[this.name];
        },
        set: function (value) {
            var val = this.element.values;
            for (var cnt = 0; cnt < val.length; cnt++) {
                val[cnt].style[this.name] = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Style.prototype.getClass = function () {
        return ElementAttribute;
    };
    Style.fromNullable = function (value, valueKey) {
        if (valueKey === void 0) { valueKey = "value"; }
        return new ElementAttribute(value, valueKey);
    };
    return Style;
}(Monad_1.ValueEmbedder));
exports.Style = Style;
/**
 * small helper for the specialized jsf case
 * @constructor
 */
var DEFAULT_WHITELIST = function () {
    return true;
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
 * Also, a few convenience methods are added to reduce
 * the code footprint of standard dom processing
 * operations like eval
 *
 * in most older systems
 * Note parts of this code still stem from the Dom.js I have written 10 years
 * ago, those parts look a bit ancient and will be replaced over time.
 *
 */
var DomQuery = /** @class */ (function () {
    function DomQuery() {
        var _a;
        var rootNode = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rootNode[_i] = arguments[_i];
        }
        this.rootNode = [];
        this.pos = -1;
        // because we can stream from an array stream directly into the dom query
        this._limits = -1;
        if (Monad_1.Optional.fromNullable(rootNode).isAbsent() || !rootNode.length) {
            return;
        }
        else {
            // we need to flatten out the arrays
            for (var cnt = 0; cnt < rootNode.length; cnt++) {
                if (!rootNode[cnt]) {
                    // we skip possible null entries which can happen in
                    // certain corner conditions due to the constructor re-wrapping single elements into arrays.
                }
                else if (isString(rootNode[cnt])) {
                    var foundElement = DomQuery.querySelectorAll(rootNode[cnt]);
                    if (!foundElement.isAbsent()) {
                        rootNode.push.apply(rootNode, foundElement.values);
                    }
                }
                else if (rootNode[cnt] instanceof DomQuery) {
                    (_a = this.rootNode).push.apply(_a, rootNode[cnt].values);
                }
                else {
                    this.rootNode.push(rootNode[cnt]);
                }
            }
        }
    }
    Object.defineProperty(DomQuery.prototype, "value", {
        /**
         * returns the first element
         */
        get: function () {
            return this.getAsElem(0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "values", {
        get: function () {
            return this.allElems();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "global", {
        get: function () {
            return Global_1._global$;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "id", {
        /**
         * returns the id of the first element
         */
        get: function () {
            return new ElementAttribute(this.get(0), "id");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "length", {
        /**
         * length of the entire query set
         */
        get: function () {
            return this.rootNode.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "tagName", {
        /**
         * convenience method for tagName
         */
        get: function () {
            return this.getAsElem(0).getIf("tagName");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "nodeName", {
        /**
         * convenience method for nodeName
         */
        get: function () {
            return this.getAsElem(0).getIf("nodeName");
        },
        enumerable: false,
        configurable: true
    });
    DomQuery.prototype.isTag = function (tagName) {
        return !this.isAbsent()
            && (this.nodeName.orElse("__none___")
                .value.toLowerCase() == tagName.toLowerCase()
                || this.tagName.orElse("__none___")
                    .value.toLowerCase() == tagName.toLowerCase());
    };
    Object.defineProperty(DomQuery.prototype, "type", {
        /**
         * convenience property for type
         *
         * returns null in case of no type existing otherwise
         * the type of the first element
         */
        get: function () {
            return this.getAsElem(0).getIf("type");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "name", {
        /**
         * convenience property for name
         *
         * returns null in case of no type existing otherwise
         * the name of the first element
         */
        get: function () {
            return new Monad_1.ValueEmbedder(this.getAsElem(0).value, "name");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "inputValue", {
        /**
         * convenience property for value
         *
         * returns null in case of no type existing otherwise
         * the value of the first element
         */
        get: function () {
            if (this.getAsElem(0).getIf("value").isPresent()) {
                return new Monad_1.ValueEmbedder(this.getAsElem(0).value);
            }
            else {
                return Monad_1.ValueEmbedder.absent;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "val", {
        get: function () {
            return this.inputValue.value;
        },
        set: function (value) {
            this.inputValue.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "checked", {
        get: function () {
            return Stream_1.Stream.of.apply(Stream_1.Stream, this.values).allMatch(function (el) { return !!el.checked; });
        },
        set: function (newChecked) {
            this.eachElem(function (el) { return el.checked = newChecked; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "elements", {
        get: function () {
            // a simple querySelectorAll should suffice
            return this.querySelectorAll("input, checkbox, select, textarea, fieldset");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "deepElements", {
        get: function () {
            var elemStr = "input, select, textarea, checkbox, fieldset";
            return this.querySelectorAllDeep(elemStr);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * a deep search which treats the single isolated shadow dom areas
     * separately and runs the query on each shadow dom
     * @param queryStr
     */
    DomQuery.prototype.querySelectorAllDeep = function (queryStr) {
        var found = [];
        var queryRes = this.querySelectorAll(queryStr);
        if (queryRes.length) {
            found.push(queryRes);
        }
        var shadowRoots = this.querySelectorAll("*").shadowRoot;
        if (shadowRoots.length) {
            var shadowRes = shadowRoots.querySelectorAllDeep(queryStr);
            if (shadowRes.length) {
                found.push(shadowRes);
            }
        }
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], found, false)))();
    };
    Object.defineProperty(DomQuery.prototype, "disabled", {
        /**
         * disabled flag
         */
        get: function () {
            return this.attr("disabled").isPresent();
        },
        set: function (disabled) {
            // this.attr("disabled").value = disabled + "";
            if (!disabled) {
                this.removeAttribute("disabled");
            }
            else {
                this.attr("disabled").value = "disabled";
            }
        },
        enumerable: false,
        configurable: true
    });
    DomQuery.prototype.removeAttribute = function (name) {
        this.eachElem(function (item) { return item.removeAttribute(name); });
    };
    Object.defineProperty(DomQuery.prototype, "childNodes", {
        get: function () {
            var childNodeArr = [];
            this.eachElem(function (item) {
                childNodeArr = childNodeArr.concat(objToArray(item.childNodes));
            });
            return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], childNodeArr, false)))();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "stream", {
        /**
         * binding into stream
         */
        get: function () {
            return new (Stream_1.Stream.bind.apply(Stream_1.Stream, __spreadArray([void 0], this.asArray, false)))();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "lazyStream", {
        /**
         * fetches a lazy stream representation
         * lazy should be applied if you have some filters etc.
         * in between, this can reduce the number of post filter operations
         * and ram usage
         * significantly because the operations are done lazily and stop
         * once they hit a dead end.
         */
        get: function () {
            return Stream_1.LazyStream.of.apply(Stream_1.LazyStream, this.asArray);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "asArray", {
        get: function () {
            // filter not supported by IE11
            return [].concat(Stream_1.LazyStream.of.apply(Stream_1.LazyStream, this.rootNode).filter(function (item) {
                return item != null;
            })
                .map(function (item) {
                return DomQuery.byId(item);
            }).collect(new SourcesCollectors_1.ArrayCollector()));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "offsetWidth", {
        get: function () {
            return Stream_1.LazyStream.of.apply(Stream_1.LazyStream, this.rootNode).filter(function (item) { return item != null; })
                .map(function (elem) { return elem.offsetWidth; })
                .reduce(function (accumulate, incoming) { return accumulate + incoming; }, 0).value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "offsetHeight", {
        get: function () {
            return Stream_1.LazyStream.of.apply(Stream_1.LazyStream, this.rootNode).filter(function (item) { return item != null; })
                .map(function (elem) { return elem.offsetHeight; })
                .reduce(function (accumulate, incoming) { return accumulate + incoming; }, 0).value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "offsetLeft", {
        get: function () {
            return Stream_1.LazyStream.of.apply(Stream_1.LazyStream, this.rootNode).filter(function (item) { return item != null; })
                .map(function (elem) { return elem.offsetLeft; })
                .reduce(function (accumulate, incoming) { return accumulate + incoming; }, 0).value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "offsetTop", {
        get: function () {
            return Stream_1.LazyStream.of.apply(Stream_1.LazyStream, this.rootNode).filter(function (item) { return item != null; })
                .map(function (elem) { return elem.offsetTop; })
                .reduce(function (accumulate, incoming) { return accumulate + incoming; }, 0).value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "asNodeArray", {
        get: function () {
            return [].concat(Stream_1.Stream.of(this.rootNode).filter(function (item) { return item != null; }).collect(new SourcesCollectors_1.ArrayCollector()));
        },
        enumerable: false,
        configurable: true
    });
    DomQuery.querySelectorAllDeep = function (selector) {
        return new DomQuery(document).querySelectorAllDeep(selector);
    };
    /**
     * easy query selector all producer
     *
     * @param selector the selector
     * @returns a results dom query object
     */
    DomQuery.querySelectorAll = function (selector) {
        if (selector.indexOf("/shadow/") != -1) {
            return new DomQuery(document)._querySelectorAllDeep(selector);
        }
        else {
            return new DomQuery(document)._querySelectorAll(selector);
        }
    };
    /**
     * byId producer
     *
     * @param selector id
     * @param deep true if you want to go into shadow areas
     * @return a DomQuery containing the found elements
     */
    DomQuery.byId = function (selector, deep) {
        if (deep === void 0) { deep = false; }
        if (isString(selector)) {
            return (!deep) ? new DomQuery(document).byId(selector) : new DomQuery(document).byIdDeep(selector);
        }
        else {
            return new DomQuery(selector);
        }
    };
    /**
     * byTagName producer
     *
     * @param selector name
     * @return a DomQuery containing the found elements
     */
    DomQuery.byTagName = function (selector) {
        if (isString(selector)) {
            return new DomQuery(document).byTagName(selector);
        }
        else {
            return new DomQuery(selector);
        }
    };
    DomQuery.globalEval = function (code, nonce) {
        return new DomQuery(document).globalEval(code, nonce);
    };
    DomQuery.globalEvalSticky = function (code, nonce) {
        return new DomQuery(document).globalEvalSticky(code, nonce);
    };
    /**
     * builds the ie nodes properly in a placeholder
     * and bypasses a non script insert bug that way
     * @param markup the markup code to be executed from
     */
    DomQuery.fromMarkup = function (markup) {
        // https:// developer.mozilla.org/de/docs/Web/API/DOMParser license creative commons
        var doc = document.implementation.createHTMLDocument("");
        markup = trim(markup);
        var lowerMarkup = markup.toLowerCase();
        if (lowerMarkup.indexOf('<!doctype') != -1 ||
            lowerMarkup.indexOf('<html') != -1 ||
            lowerMarkup.indexOf('<head') != -1 ||
            lowerMarkup.indexOf('<body') != -1) {
            doc.documentElement.innerHTML = markup;
            return new DomQuery(doc.documentElement);
        }
        else {
            var startsWithTag = function (str, tagName) {
                var tag1 = ["<", tagName, ">"].join("");
                var tag2 = ["<", tagName, " "].join("");
                return (str.indexOf(tag1) == 0) || (str.indexOf(tag2) == 0);
            };
            var dummyPlaceHolder = new DomQuery(document.createElement("div"));
            // table needs special treatment due to the browsers auto creation
            if (startsWithTag(lowerMarkup, "thead") || startsWithTag(lowerMarkup, "tbody")) {
                dummyPlaceHolder.html("<table>".concat(markup, "</table>"));
                return dummyPlaceHolder.querySelectorAll("table").get(0).childNodes.detach();
            }
            else if (startsWithTag(lowerMarkup, "tfoot")) {
                dummyPlaceHolder.html("<table><thead></thead><tbody><tbody".concat(markup, "</table>"));
                return dummyPlaceHolder.querySelectorAll("table").get(2).childNodes.detach();
            }
            else if (startsWithTag(lowerMarkup, "tr")) {
                dummyPlaceHolder.html("<table><tbody>".concat(markup, "</tbody></table>"));
                return dummyPlaceHolder.querySelectorAll("tbody").get(0).childNodes.detach();
            }
            else if (startsWithTag(lowerMarkup, "td")) {
                dummyPlaceHolder.html("<table><tbody><tr>".concat(markup, "</tr></tbody></table>"));
                return dummyPlaceHolder.querySelectorAll("tr").get(0).childNodes.detach();
            }
            dummyPlaceHolder.html(markup);
            return dummyPlaceHolder.childNodes.detach();
        }
    };
    /**
     * returns the nth element as DomQuery
     * from the internal elements
     * note if you try to reach a non-existing element position
     * you will get back an absent entry
     *
     * @param index the nth index
     */
    DomQuery.prototype.get = function (index) {
        return (index < this.rootNode.length) ? new DomQuery(this.rootNode[index]) : DomQuery.absent;
    };
    /**
     * returns the nth element as optional of an Element object
     * @param index the number from the index
     * @param defaults the default value if the index is overrun default Optional\.absent
     */
    DomQuery.prototype.getAsElem = function (index, defaults) {
        if (defaults === void 0) { defaults = Monad_1.Optional.absent; }
        return (index < this.rootNode.length) ? Monad_1.Optional.fromNullable(this.rootNode[index]) : defaults;
    };
    /**
     * returns the files from a given element
     * @param index
     */
    DomQuery.prototype.filesFromElem = function (index) {
        var _a;
        return (index < this.rootNode.length) ? ((_a = this.rootNode[index]) === null || _a === void 0 ? void 0 : _a.files) ? this.rootNode[index].files : [] : [];
    };
    /**
     * returns the value array< of all elements
     */
    DomQuery.prototype.allElems = function () {
        return this.rootNode;
    };
    /**
     * absent no values reached?
     */
    DomQuery.prototype.isAbsent = function () {
        return this.length == 0;
    };
    /**
     * should make the code clearer
     * note if you pass a function
     * this refers to the active DomQuery object
     */
    DomQuery.prototype.isPresent = function (presentRunnable) {
        var absent = this.isAbsent();
        if (!absent && presentRunnable) {
            presentRunnable.call(this, this);
        }
        return !absent;
    };
    /**
     * should make the code clearer
     * note if you pass a function
     * this refers to the active DomQuery object
     *
     *
     * @param presentRunnable
     */
    DomQuery.prototype.ifPresentLazy = function (presentRunnable) {
        if (presentRunnable === void 0) { presentRunnable = function () {
        }; }
        this.isPresent.call(this, presentRunnable);
        return this;
    };
    /**
     * remove all affected nodes from this query object from the dom tree
     */
    DomQuery.prototype.delete = function () {
        this.eachElem(function (node) {
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        });
    };
    DomQuery.prototype.querySelectorAll = function (selector) {
        // We could merge both methods, but for now this is more readable
        if (selector.indexOf("/shadow/") != -1) {
            return this._querySelectorAllDeep(selector);
        }
        else {
            return this._querySelectorAll(selector);
        }
    };
    /**
     * core byId method
     * @param id the id to search for
     * @param includeRoot also match the root element?
     */
    DomQuery.prototype.byId = function (id, includeRoot) {
        var res = [];
        if (includeRoot) {
            res = res.concat(Stream_1.LazyStream.of.apply(Stream_1.LazyStream, ((this === null || this === void 0 ? void 0 : this.rootNode) || [])).filter(function (item) { return id == item.id; })
                .map(function (item) { return new DomQuery(item); })
                .collect(new SourcesCollectors_1.ArrayCollector()));
        }
        // for some strange kind of reason the # selector fails
        // on hidden elements we use the attributes match selector
        // that works
        res = res.concat(this.querySelectorAll("[id=\"".concat(id, "\"]")));
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], res, false)))();
    };
    DomQuery.prototype.byIdDeep = function (id, includeRoot) {
        var res = [];
        if (includeRoot) {
            res = res.concat(Stream_1.LazyStream.of.apply(Stream_1.LazyStream, ((this === null || this === void 0 ? void 0 : this.rootNode) || [])).filter(function (item) { return id == item.id; })
                .map(function (item) { return new DomQuery(item); })
                .collect(new SourcesCollectors_1.ArrayCollector()));
        }
        var subItems = this.querySelectorAllDeep("[id=\"".concat(id, "\"]"));
        if (subItems.length) {
            res.push(subItems);
        }
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], res, false)))();
    };
    /**
     * same as byId just for the tag name
     * @param tagName the tag-name to search for
     * @param includeRoot shall the root element be part of this search
     * @param deep do we also want to go into shadow dom areas
     */
    DomQuery.prototype.byTagName = function (tagName, includeRoot, deep) {
        var _a;
        var res = [];
        if (includeRoot) {
            res = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, ((_a = this === null || this === void 0 ? void 0 : this.rootNode) !== null && _a !== void 0 ? _a : [])).filter(function (element) { return (element === null || element === void 0 ? void 0 : element.tagName) == tagName; })
                .reduce(function (reduction, item) { return reduction.concat([item]); }, res)
                .orElse(res).value;
        }
        (deep) ? res.push(this.querySelectorAllDeep(tagName)) : res.push(this.querySelectorAll(tagName));
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], res, false)))();
    };
    /**
     * attr accessor, usage myQuery.attr("class").value = "bla"
     * or let value myQuery.attr("class").value
     * @param attr the attribute to set
     * @param defaultValue the default value in case nothing is presented (defaults to null)
     */
    DomQuery.prototype.attr = function (attr, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        return new ElementAttribute(this, attr, defaultValue);
    };
    DomQuery.prototype.style = function (cssProperty, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        return new Style(this, cssProperty, defaultValue);
    };
    /**
     * Checks for an existing class in the class attributes
     *
     * @param clazz the class to search for
     */
    DomQuery.prototype.hasClass = function (clazz) {
        var hasIt = false;
        this.eachElem(function (node) {
            hasIt = node.classList.contains(clazz);
            if (hasIt) {
                return false;
            }
        });
        return hasIt;
    };
    /**
     * appends a class string if not already in the element(s)
     *
     * @param clazz the style class to append
     */
    DomQuery.prototype.addClass = function (clazz) {
        this.eachElem(function (item) { return item.classList.add(clazz); });
        return this;
    };
    /**
     * remove the style class if in the class definitions
     *
     * @param clazz
     */
    DomQuery.prototype.removeClass = function (clazz) {
        this.eachElem(function (item) { return item.classList.remove(clazz); });
        return this;
    };
    /**
     * checks whether we have a multipart element in our children
     * or are one
     */
    DomQuery.prototype.isMultipartCandidate = function (deep) {
        if (deep === void 0) { deep = false; }
        var FILE_INPUT = "input[type='file']";
        return this.matchesSelector(FILE_INPUT) ||
            ((!deep) ? this.querySelectorAll(FILE_INPUT) :
                this.querySelectorAllDeep(FILE_INPUT)).first().isPresent();
    };
    /**
     * innerHtml
     * equivalent to jQueries html
     * as setter the html is set and the
     * DomQuery is given back
     * as getter the html string is returned
     *
     * @param newInnerHTML the inner html to be inserted
     */
    DomQuery.prototype.html = function (newInnerHTML) {
        if (Monad_1.Optional.fromNullable(newInnerHTML).isAbsent()) {
            return this.isPresent() ? Monad_1.Optional.fromNullable(this.innerHTML) : Monad_1.Optional.absent;
        }
        this.innerHTML = newInnerHTML;
        return this;
    };
    /**
     * Standard dispatch event method, delegated from node
     */
    DomQuery.prototype.dispatchEvent = function (evt) {
        this.eachElem(function (elem) { return elem.dispatchEvent(evt); });
        return this;
    };
    Object.defineProperty(DomQuery.prototype, "innerHTML", {
        /**
         * getter abbreviation to use innerHTML directly
         */
        get: function () {
            var retArr = [];
            this.eachElem(function (elem) { return retArr.push(elem.innerHTML); });
            return retArr.join("");
        },
        /**
         * abbreviation property to use innerHTML directly like on the dom tree
         * @param newInnerHTML  the new inner html which should be attached to "this" domQuery
         */
        set: function (newInnerHTML) {
            this.eachElem(function (elem) { return elem.innerHTML = newInnerHTML; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "innerHtml", {
        /**
         * same here, getter for allowing innerHtml directly
         */
        get: function () {
            return this.innerHTML;
        },
        /**
         * since the dom allows both innerHTML and innerHtml we also have to implement both
         * @param newInnerHtml see above
         */
        set: function (newInnerHtml) {
            this.innerHTML = newInnerHtml;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * filters the current dom query elements
     * upon a given selector
     *
     * @param selector
     */
    DomQuery.prototype.filterSelector = function (selector) {
        var _this = this;
        var matched = [];
        this.eachElem(function (item) {
            if (_this._mozMatchesSelector(item, selector)) {
                matched.push(item);
            }
        });
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], matched, false)))();
    };
    /**
     * checks whether any item in this domQuery level matches the selector
     * if there is one element only attached, as root the match is only
     * performed on this element.
     * @param selector
     */
    DomQuery.prototype.matchesSelector = function (selector) {
        var _this = this;
        var ret = this.lazyStream
            .map(function (item) { return _this._mozMatchesSelector(item.getAsElem(0).value, selector); })
            .filter(function (match) { return match; })
            .first();
        return ret.isPresent();
    };
    /**
     * easy node traversal, you can pass
     * a set of node selectors which are joined as direct children
     *
     * Note!!! The root nodes are not in the getIf, those are always the child nodes
     *
     * @param nodeSelector
     */
    DomQuery.prototype.getIf = function () {
        var nodeSelector = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nodeSelector[_i] = arguments[_i];
        }
        var selectorStage = this.childNodes;
        for (var cnt = 0; cnt < nodeSelector.length; cnt++) {
            selectorStage = selectorStage.filterSelector(nodeSelector[cnt]);
            if (selectorStage.isAbsent()) {
                return selectorStage;
            }
        }
        return selectorStage;
    };
    DomQuery.prototype.eachElem = function (func) {
        for (var cnt = 0, len = this.rootNode.length; cnt < len; cnt++) {
            if (func(this.rootNode[cnt], cnt) === false) {
                break;
            }
        }
        return this;
    };
    DomQuery.prototype.firstElem = function (func) {
        if (func === void 0) { func = function (item) { return item; }; }
        if (this.rootNode.length > 1) {
            func(this.rootNode[0], 0);
        }
        return this;
    };
    DomQuery.prototype.lastElem = function (func) {
        if (func === void 0) { func = function (item) { return item; }; }
        if (this.rootNode.length > 1) {
            func(this.rootNode[this.rootNode.length - 1], 0);
        }
        return this;
    };
    DomQuery.prototype.each = function (func) {
        Stream_1.Stream.of.apply(Stream_1.Stream, this.rootNode).each(function (item, cnt) {
            // we could use a filter, but for the best performance we don´t
            if (item == null) {
                return;
            }
            return func(DomQuery.byId(item), cnt);
        });
        return this;
    };
    /**
     * returns a new dom query containing only the first element max
     *
     * @param func a an optional callback function to perform an operation on the first element
     */
    DomQuery.prototype.first = function (func) {
        if (func === void 0) { func = function (item) { return item; }; }
        if (this.rootNode.length >= 1) {
            func(this.get(0), 0);
            return this.get(0);
        }
        return this;
    };
    /**
     * returns a new dom query containing only the first element max
     *
     * @param func a an optional callback function to perform an operation on the first element
     */
    DomQuery.prototype.last = function (func) {
        if (func === void 0) { func = function (item) { return item; }; }
        if (this.rootNode.length >= 1) {
            var lastNode = this.get(this.rootNode.length - 1);
            func(lastNode, 0);
            return lastNode;
        }
        return this;
    };
    /**
     * filter function which filters a subset
     *
     * @param func
     */
    DomQuery.prototype.filter = function (func) {
        var reArr = [];
        this.each(function (item) {
            func(item) ? reArr.push(item) : null;
        });
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], reArr, false)))();
    };
    /**
     * global eval head appendix method
     * no other methods are supported anymore
     * @param code the code to be evaluated
     * @param  nonce optional  nonce key for higher security
     */
    DomQuery.prototype.globalEval = function (code, nonce) {
        var _a, _b, _c;
        var head = (_b = (_a = document.getElementsByTagName("head")) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : (_c = document.documentElement.getElementsByTagName("head")) === null || _c === void 0 ? void 0 : _c[0];
        var script = document.createElement("script");
        if (nonce) {
            if ('undefined' != typeof (script === null || script === void 0 ? void 0 : script.nonce)) {
                script.nonce = nonce;
            }
            else {
                script.setAttribute("nonce", nonce);
            }
        }
        script.type = "text/javascript";
        script.innerHTML = code;
        var newScriptElement = head.appendChild(script);
        head.removeChild(newScriptElement);
        return this;
    };
    /**
     * global eval head appendix method
     * no other methods are supported anymore
     * @param code the code to be evaluated
     * @param  nonce optional  nonce key for higher security
     */
    DomQuery.prototype.globalEvalSticky = function (code, nonce) {
        var head = document.getElementsByTagName("head")[0] || document.documentElement;
        var script = document.createElement("script");
        this.applyNonce(nonce, script);
        script.type = "text/javascript";
        script.innerHTML = code;
        head.appendChild(script);
        return this;
    };
    /**
     * detaches a set of nodes from their parent elements
     * in a browser independent manner
     * @return {Array} an array of nodes with the detached dom nodes
     */
    DomQuery.prototype.detach = function () {
        this.eachElem(function (item) {
            item.parentNode.removeChild(item);
        });
        return this;
    };
    /**
     * appends the current set of elements
     * to the element or first element passed via elem
     * @param elem
     */
    DomQuery.prototype.appendTo = function (elem) {
        if (Lang_1.Lang.isString(elem)) {
            this.appendTo(DomQuery.querySelectorAll(elem));
            return this;
        }
        this.eachElem(function (item) {
            var value1 = elem.getAsElem(0).orElseLazy(function () {
                return {
                    appendChild: function () {
                    }
                };
            }).value;
            value1.appendChild(item);
        });
        return this;
    };
    /**
     * loads and evaluates a script from a source uri
     *
     * @param src the source to be loaded and evaluated
     * @param delay in milliseconds execution default (0 == no delay)
     * @param nonce optional nonce value to allow increased security via nonce crypto token
     */
    DomQuery.prototype.loadScriptEval = function (src, delay, nonce) {
        if (delay === void 0) { delay = 0; }
        this._loadScriptEval(false, src, delay, nonce);
        return this;
    };
    /**
     * loads and evaluates a script from a source uri
     *
     * @param src the source to be loaded and evaluated
     * @param delay in milliseconds execution default (0 == no delay)
     * @param nonce optional nonce parameter for increased security via nonce crypto token
     */
    DomQuery.prototype.loadScriptEvalSticky = function (src, delay, nonce) {
        if (delay === void 0) { delay = 0; }
        this._loadScriptEval(true, src, delay, nonce);
        return this;
    };
    DomQuery.prototype.insertAfter = function () {
        var toInsertParams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            toInsertParams[_i] = arguments[_i];
        }
        this.each(function (existingItem) {
            var existingElement = existingItem.getAsElem(0).value;
            var rootNode = existingElement.parentNode;
            var _loop_1 = function (cnt) {
                var nextSibling = existingElement.nextSibling;
                toInsertParams[cnt].eachElem(function (insertElem) {
                    if (nextSibling) {
                        rootNode.insertBefore(insertElem, nextSibling);
                        existingElement = nextSibling;
                    }
                    else {
                        rootNode.appendChild(insertElem);
                    }
                });
            };
            for (var cnt = 0; cnt < toInsertParams.length; cnt++) {
                _loop_1(cnt);
            }
        });
        var res = [];
        res.push(this);
        res = res.concat(toInsertParams);
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], res, false)))();
    };
    DomQuery.prototype.insertBefore = function () {
        var toInsertParams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            toInsertParams[_i] = arguments[_i];
        }
        this.each(function (existingItem) {
            var existingElement = existingItem.getAsElem(0).value;
            var rootNode = existingElement.parentNode;
            for (var cnt = 0; cnt < toInsertParams.length; cnt++) {
                toInsertParams[cnt].eachElem(function (insertElem) {
                    rootNode.insertBefore(insertElem, existingElement);
                });
            }
        });
        var res = [];
        res.push(this);
        res = res.concat(toInsertParams);
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], res, false)))();
    };
    DomQuery.prototype.orElse = function () {
        var elseValue = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elseValue[_i] = arguments[_i];
        }
        if (this.isPresent()) {
            return this;
        }
        else {
            return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], elseValue, false)))();
        }
    };
    DomQuery.prototype.orElseLazy = function (func) {
        if (this.isPresent()) {
            return this;
        }
        else {
            return new DomQuery(func());
        }
    };
    DomQuery.prototype.parents = function (tagName) {
        var retSet = new Set();
        var retArr = [];
        var lowerTagName = tagName.toLowerCase();
        var resolveItem = function (item) {
            if ((item.tagName || "").toLowerCase() == lowerTagName && !retSet.has(item)) {
                retSet.add(item);
                retArr.push(item);
            }
        };
        this.eachElem(function (item) {
            var _a;
            while (item.parentNode || item.host) {
                item = (_a = item === null || item === void 0 ? void 0 : item.parentNode) !== null && _a !== void 0 ? _a : item === null || item === void 0 ? void 0 : item.host;
                resolveItem(item);
                // nested forms not possible, performance shortcut
                if (tagName == "form" && retArr.length) {
                    return false;
                }
            }
        });
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], retArr, false)))();
    };
    DomQuery.prototype.copyAttrs = function (sourceItem) {
        var _this = this;
        sourceItem.eachElem(function (sourceNode) {
            var attrs = objToArray(sourceNode.attributes);
            for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
                var item = attrs_1[_i];
                var value = item.value;
                var name_1 = item.name;
                switch (name_1) {
                    case "id":
                        _this.id.value = value;
                        break;
                    case "disabled":
                        _this.resolveAttributeHolder("disabled").disabled = value;
                        break;
                    case "checked":
                        _this.resolveAttributeHolder("checked").checked = value;
                        break;
                    default:
                        _this.attr(name_1).value = value;
                }
            }
        });
        return this;
    };
    /**
     * outerHTML convenience method
     * browsers only support innerHTML but
     * for instance for your jsf.js we have a full
     * replace pattern which needs outerHTML processing
     *
     * @param markup the markup which should replace the root element
     * @param runEmbeddedScripts if true the embedded scripts are executed
     * @param runEmbeddedCss if true the embedded css are executed
     * @param deep should this also work for shadow dom (run scripts etc...)
     */
    DomQuery.prototype.outerHTML = function (markup, runEmbeddedScripts, runEmbeddedCss, deep) {
        var _a;
        if (deep === void 0) { deep = false; }
        if (this.isAbsent()) {
            return;
        }
        var focusElementId = (_a = document === null || document === void 0 ? void 0 : document.activeElement) === null || _a === void 0 ? void 0 : _a.id;
        var caretPosition = (focusElementId) ? DomQuery.getCaretPosition(document.activeElement) : null;
        var nodes = DomQuery.fromMarkup(markup);
        var res = [];
        var toReplace = this.getAsElem(0).value;
        var firstInsert = nodes.get(0);
        var parentNode = toReplace.parentNode;
        var replaced = firstInsert.getAsElem(0).value;
        parentNode.replaceChild(replaced, toReplace);
        res.push(new DomQuery(replaced));
        // no replacement possible
        if (this.isAbsent()) {
            return this;
        }
        var insertAdditionalItems = [];
        if (nodes.length > 1) {
            insertAdditionalItems = insertAdditionalItems.concat.apply(insertAdditionalItems, nodes.values.slice(1));
            res.push(DomQuery.byId(replaced).insertAfter(new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], insertAdditionalItems, false)))()));
        }
        if (runEmbeddedScripts) {
            this.runScripts();
        }
        if (runEmbeddedCss) {
            this.runCss();
        }
        var focusElement = DomQuery.byId(focusElementId);
        if (focusElementId && focusElement.isPresent() &&
            caretPosition != null && "undefined" != typeof caretPosition) {
            focusElement.eachElem(function (item) { return DomQuery.setCaretPosition(item, caretPosition); });
        }
        return nodes;
    };
    /**
     * Run through the given nodes in the DomQuery execute the inline scripts
     * @param sticky if set to true the evaluated elements will stick to the head, default false
     * @param whitelisted: optional whitelist function which can filter out script tags which are not processed
     * defaults to the standard jsf.js exclusion (we use this code for myfaces)
     */
    DomQuery.prototype.runScripts = function (sticky, whitelisted) {
        var _this = this;
        if (sticky === void 0) { sticky = false; }
        if (whitelisted === void 0) { whitelisted = DEFAULT_WHITELIST; }
        var evalCollectedScripts = function (scriptsToProcess) {
            if (scriptsToProcess.length) {
                // script source means we have to eval the existing
                // scripts before we run the 'include' command
                // this.globalEval(finalScripts.join("\n"));
                var joinedScripts_1 = [];
                Stream_1.Stream.of.apply(Stream_1.Stream, scriptsToProcess).each(function (item) {
                    if (!item.nonce) {
                        joinedScripts_1.push(item.evalText);
                    }
                    else {
                        if (joinedScripts_1.length) {
                            _this.globalEval(joinedScripts_1.join("\n"));
                            joinedScripts_1.length = 0;
                        }
                        (!sticky) ?
                            _this.globalEval(item.evalText, item.nonce) :
                            _this.globalEvalSticky(item.evalText, item.nonce);
                    }
                });
                if (joinedScripts_1.length) {
                    (!sticky) ? _this.globalEval(joinedScripts_1.join("\n")) :
                        _this.globalEvalSticky(joinedScripts_1.join("\n"));
                    joinedScripts_1.length = 0;
                }
                scriptsToProcess = [];
            }
            return scriptsToProcess;
        };
        var finalScripts = [], allowedItemTypes = ["", "script", "text/javascript", "text/ecmascript", "ecmascript"], execScript = function (item) {
            var _a, _b, _c, _d;
            var tagName = item.tagName;
            var itemType = ((_a = item === null || item === void 0 ? void 0 : item.type) !== null && _a !== void 0 ? _a : '').toLowerCase();
            if (tagName &&
                eIgnoreC(tagName, "script") &&
                allowedItemTypes.indexOf(itemType) != -1) {
                var src = item.getAttribute('src');
                if ('undefined' != typeof src
                    && null != src
                    && src.length > 0) {
                    var nonce = (_b = item === null || item === void 0 ? void 0 : item.nonce) !== null && _b !== void 0 ? _b : item.getAttribute('nonce').value;
                    // we have to move this into an inner if because chrome otherwise chokes
                    // due to changing the and order instead of relying on left to right
                    // if jsf.js is already registered we do not replace it anymore
                    if (whitelisted(src)) {
                        // we run the collected scripts, before we run the 'include' command
                        finalScripts = evalCollectedScripts(finalScripts);
                        if (!sticky) {
                            (!!nonce) ? _this.loadScriptEval(src, 0, nonce) :
                                // if no nonce is set we do not pass any once
                                _this.loadScriptEval(src, 0);
                        }
                        else {
                            (!!nonce) ? _this.loadScriptEvalSticky(src, 0, nonce) :
                                // if no nonce is set we do not pass any once
                                _this.loadScriptEvalSticky(src, 0);
                        }
                    }
                }
                else {
                    // embedded script auto eval
                    // probably not needed anymore
                    var evalText = trim(item.text || item.innerText || item.innerHTML);
                    var go = true;
                    while (go) {
                        go = false;
                        if (evalText.substring(0, 4) == "<!--") {
                            evalText = evalText.substring(4);
                            go = true;
                        }
                        if (evalText.substring(0, 4) == "//<!--") {
                            evalText = evalText.substring(6);
                            go = true;
                        }
                        if (evalText.substring(0, 11) == "//<![CDATA[") {
                            evalText = evalText.substring(11);
                            go = true;
                        }
                    }
                    var nonce = (_d = (_c = item === null || item === void 0 ? void 0 : item.nonce) !== null && _c !== void 0 ? _c : item.getAttribute('nonce').value) !== null && _d !== void 0 ? _d : '';
                    // we have to run the script under a global context
                    // we store the script for fewer calls to eval
                    finalScripts.push({
                        nonce: nonce,
                        evalText: evalText
                    });
                }
            }
        };
        try {
            var scriptElements = new DomQuery(this.filterSelector("script"), this.querySelectorAll("script"));
            // script execution order by relative pos in their dom tree
            scriptElements.stream
                .flatMap(function (item) { return Stream_1.Stream.of(item.values); })
                .sort(function (node1, node2) { return node1.compareDocumentPosition(node2) - 3; }) // preceding 2, following == 4)
                .each(function (item) { return execScript(item); });
            evalCollectedScripts(finalScripts);
        }
        catch (e) {
            if (console && console.error) {
                // not sure if we
                // should use our standard
                // error mechanisms here
                // because in the head appendix
                // method only a console
                // error would be raised as well
                console.error(e.message || e.description);
            }
        }
        finally {
            // the usual ie6 fix code
            // the IE6 garbage collector is broken
            // nulling closures helps somewhat to reduce
            // mem leaks, which are impossible to avoid
            // at this browser
            execScript = null;
        }
        return this;
    };
    DomQuery.prototype.runCss = function () {
        var applyStyle = function (item, style) {
            var _a, _b, _c, _d;
            var newSS = document.createElement("style");
            document.getElementsByTagName("head")[0].appendChild(newSS);
            var styleSheet = (_a = newSS.sheet) !== null && _a !== void 0 ? _a : newSS.styleSheet;
            newSS.setAttribute("rel", (_b = item.getAttribute("rel")) !== null && _b !== void 0 ? _b : "stylesheet");
            newSS.setAttribute("type", (_c = item.getAttribute("type")) !== null && _c !== void 0 ? _c : "text/css");
            if ((_d = styleSheet === null || styleSheet === void 0 ? void 0 : styleSheet.cssText) !== null && _d !== void 0 ? _d : false) {
                styleSheet.cssText = style;
            }
            else {
                newSS.appendChild(document.createTextNode(style));
            }
        }, execCss = function (item) {
            var tagName = item.tagName;
            if (tagName && eIgnoreC(tagName, "link") && eIgnoreC(item.getAttribute("type"), "text/css")) {
                applyStyle(item, "@import url('" + item.getAttribute("href") + "');");
            }
            else if (tagName && eIgnoreC(tagName, "style") && eIgnoreC(item.getAttribute("type"), "text/css")) {
                var innerText_1 = [];
                // compliant browsers know child nodes
                var childNodes = Array.prototype.slice.call(item.childNodes);
                if (childNodes) {
                    childNodes.forEach(function (child) { return innerText_1.push(child.innerHTML || child.data); });
                    // non-compliant elements innerHTML
                }
                else if (item.innerHTML) {
                    innerText_1.push(item.innerHTML);
                }
                applyStyle(item, innerText_1.join(""));
            }
        };
        var scriptElements = new DomQuery(this.filterSelector("link, style"), this.querySelectorAll("link, style"));
        scriptElements.stream
            .flatMap(function (item) { return Stream_1.Stream.of(item.values); })
            .sort(function (node1, node2) { return node1.compareDocumentPosition(node2) - 3; })
            .each(function (item) { return execCss(item); });
        return this;
    };
    /**
     * fires a click event on the underlying dom elements
     */
    DomQuery.prototype.click = function () {
        this.fireEvent("click");
        return this;
    };
    DomQuery.prototype.addEventListener = function (type, listener, options) {
        this.eachElem(function (node) { return node.addEventListener(type, listener, options); });
        return this;
    };
    DomQuery.prototype.removeEventListener = function (type, listener, options) {
        this.eachElem(function (node) { return node.removeEventListener(type, listener, options); });
        return this;
    };
    /**
     * fires an event
     */
    DomQuery.prototype.fireEvent = function (eventName, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        // merge with last one having the highest priority
        var finalOptions = Stream_1.Stream.ofAssoc({
            bubbles: true, cancelable: true
        }).concat(Stream_1.Stream.ofAssoc(options)).collect(new SourcesCollectors_1.AssocArrayCollector());
        this.eachElem(function (node) {
            var doc;
            if (node.ownerDocument) {
                doc = node.ownerDocument;
            }
            else if (node.nodeType == 9) {
                // the node may be the document itself, nodeType 9 = DOCUMENT_NODE
                doc = node;
            }
            else {
                throw new Error("Invalid node passed to fireEvent: " + node.id);
            }
            if (node.dispatchEvent) {
                // Gecko-style approach (now the standard) takes more work
                var EventClass = Event;
                // Different events have different event classes.
                // If this switch statement can't map an eventName to an EventClass,
                // the event firing is going to fail.
                // extend this list on demand
                switch (eventName) {
                    case "click": // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
                    case "mousedown":
                    case "mouseup":
                    case "mousemove":
                        EventClass = _this.global().MouseEvent;
                        break;
                    case "keyup":
                    case "keydown":
                    case "keypress":
                        EventClass = _this.global().KeyboardEvent;
                        break;
                    case "focus":
                    case "change":
                    case "blur":
                    case "select":
                        break;
                    default:
                        throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
                }
                var event_1 = new EventClass(eventName, finalOptions);
                // this is added as an extra to allow internally the detection of synthetic events
                // not used atm, but it does not hurt to have the extra info
                event_1.synthetic = true; // allow detection of synthetic events
                // The second parameter says go ahead with the default action
                node.dispatchEvent(event_1);
            }
            else if (node.fireEvent) {
                // IE-old school style, you can drop this if you don't need to support IE8 and lower
                var event_2 = doc.createEventObject();
                event_2.synthetic = true; // allow detection of synthetic events
                Stream_1.Stream.ofAssoc(finalOptions).each(function (_a) {
                    var key = _a[0], value = _a[1];
                    event_2[key] = value;
                });
                node.fireEvent("on" + eventName, event_2);
            }
        });
    };
    DomQuery.prototype.textContent = function (joinString) {
        if (joinString === void 0) { joinString = ""; }
        return this.stream
            .map(function (value) {
            var item = value.getAsElem(0).orElseLazy(function () {
                return {
                    textContent: ""
                };
            }).value;
            return item.textContent || "";
        })
            .reduce(function (text1, text2) { return [text1, joinString, text2].join(""); }, "").value;
    };
    DomQuery.prototype.innerText = function (joinString) {
        if (joinString === void 0) { joinString = ""; }
        return this.stream
            .map(function (value) {
            var item = value.getAsElem(0).orElseLazy(function () {
                return {
                    innerText: ""
                };
            }).value;
            return item.innerText || "";
        })
            .reduce(function (text1, text2) { return [text1, text2].join(joinString); }, "").value;
    };
    /**
     * encodes all input elements properly into respective
     * config entries, this can be used
     * for legacy systems, for newer use-cases, use the
     * HTML5 Form class which all newer browsers provide
     *
     * @param toMerge optional config which can be merged in
     * @return a copy pf
     */
    DomQuery.prototype.encodeFormElement = function (toMerge) {
        if (toMerge === void 0) { toMerge = new Monad_1.Config({}); }
        // browser behavior no element name no encoding (normal submit fails in that case)
        // https:// issues.apache.org/jira/browse/MYFACES-2847
        if (this.name.isAbsent()) {
            return;
        }
        // let´s keep it side-effects free
        var target = toMerge.shallowCopy;
        this.each(function (element) {
            var _a, _b;
            if (element.name.isAbsent()) { // no name, no encoding
                return;
            }
            var name = element.name.value;
            var tagName = element.tagName.orElse("__none__").value.toLowerCase();
            var elemType = element.type.orElse("__none__").value.toLowerCase();
            elemType = elemType.toLowerCase();
            // routine for all elements
            // rules:
            // - process only input, textarea and select elements
            // - elements must have attribute "name"
            // - elements must not be disabled
            if (((tagName == "input" || tagName == "textarea" || tagName == "select") &&
                (name != null && name != "")) && !element.disabled) {
                // routine for select elements
                // rules:
                // - if select-one and value-Attribute exist => "name=value"
                // (also if value empty => "name=")
                // - if select-one and value-Attribute don't exist =>
                // "name=DisplayValue"
                // - if select multi and multiple selected => "name=value1&name=value2"
                // - if select and selectedIndex=-1 don't submit
                if (tagName == "select") {
                    // selectedIndex must be >= 0 to be submitted
                    var selectElem = element.getAsElem(0).value;
                    if (selectElem.selectedIndex >= 0) {
                        var uLen = selectElem.options.length;
                        for (var u = 0; u < uLen; u++) {
                            // find all selected options
                            // let subBuf = [];
                            if (selectElem.options[u].selected) {
                                var elementOption = selectElem.options[u];
                                target.append(name).value = (elementOption.getAttribute("value") != null) ?
                                    elementOption.value : elementOption.text;
                            }
                        }
                    }
                }
                // routine for remaining elements
                // rules:
                // - don't submit no selects (processed above), buttons, reset buttons, submit buttons,
                // - submit checkboxes and radio inputs only if checked
                if ((tagName != ALLOWED_SUBMITTABLE_ELEMENTS.SELECT &&
                    elemType != ALLOWED_SUBMITTABLE_ELEMENTS.BUTTON &&
                    elemType != ALLOWED_SUBMITTABLE_ELEMENTS.RESET &&
                    elemType != ALLOWED_SUBMITTABLE_ELEMENTS.SUBMIT &&
                    elemType != ALLOWED_SUBMITTABLE_ELEMENTS.IMAGE) && ((elemType != ALLOWED_SUBMITTABLE_ELEMENTS.CHECKBOX && elemType != ALLOWED_SUBMITTABLE_ELEMENTS.RADIO) ||
                    element.checked)) {
                    var uploadedFiles = (_b = (_a = element.value) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.files;
                    var filesArr = uploadedFiles !== null && uploadedFiles !== void 0 ? uploadedFiles : [];
                    if (filesArr === null || filesArr === void 0 ? void 0 : filesArr.length) { //files can be empty but set
                        // xhr level2, single multiple must be passes as they are
                        target.assign(name).value = Array.from(filesArr);
                    }
                    else {
                        if (!!uploadedFiles) { //we skip empty file elements i
                            return;
                        }
                        //checkboxes etc.. need to be appended
                        target.append(name).value = element.inputValue.value;
                    }
                }
            }
        });
        return target;
    };
    Object.defineProperty(DomQuery.prototype, "cDATAAsString", {
        get: function () {
            var TYPE_CDATA_BLOCK = 4;
            var res = this.lazyStream.flatMap(function (item) {
                return item.childNodes.stream;
            }).filter(function (item) {
                var _a, _b;
                return ((_b = (_a = item === null || item === void 0 ? void 0 : item.value) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.nodeType) == TYPE_CDATA_BLOCK;
            }).reduce(function (reduced, item) {
                var _a, _b, _c;
                reduced.push((_c = (_b = (_a = item === null || item === void 0 ? void 0 : item.value) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.data) !== null && _c !== void 0 ? _c : "");
                return reduced;
            }, []).value;
            // response may contain several blocks
            return res.join("");
        },
        enumerable: false,
        configurable: true
    });
    DomQuery.prototype.subNodes = function (from, to) {
        if (Monad_1.Optional.fromNullable(to).isAbsent()) {
            to = this.length;
        }
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], this.rootNode.slice(from, Math.min(to, this.length)), false)))();
    };
    DomQuery.prototype.limits = function (end) {
        this._limits = end;
        return this;
    };
    //-- internally exposed methods needed for the interconnectivity
    DomQuery.prototype.hasNext = function () {
        var isLimitsReached = this._limits != -1 && this.pos >= this._limits - 1;
        var isEndOfArray = this.pos >= this.values.length - 1;
        return !(isLimitsReached ||
            isEndOfArray);
    };
    DomQuery.prototype.next = function () {
        if (!this.hasNext()) {
            return null;
        }
        this.pos++;
        return new DomQuery(this.values[this.pos]);
    };
    DomQuery.prototype.lookAhead = function (cnt) {
        if (cnt === void 0) { cnt = 1; }
        if ((this.values.length - 1) < (this.pos + cnt)) {
            return SourcesCollectors_1.ITERATION_STATUS.EO_STRM;
        }
        return new DomQuery(this.values[this.pos + cnt]);
    };
    DomQuery.prototype.current = function () {
        if (this.pos == -1) {
            return SourcesCollectors_1.ITERATION_STATUS.BEF_STRM;
        }
        return new DomQuery(this.values[this.pos]);
    };
    DomQuery.prototype.reset = function () {
        this.pos = -1;
    };
    DomQuery.prototype.attachShadow = function (params) {
        if (params === void 0) { params = { mode: "open" }; }
        var shadowRoots = [];
        this.eachElem(function (item) {
            var shadowElement;
            if (item === null || item === void 0 ? void 0 : item.attachShadow) {
                shadowElement = DomQuery.byId(item.attachShadow(params));
                shadowRoots.push(shadowElement);
            }
            else {
                throw new Error("Shadow dom creation not supported by the browser, please use a shim, to gain this functionality");
            }
        });
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], shadowRoots, false)))();
    };
    /**
     * helper to fix a common dom problem
     * we have to wait until a certain condition is met, in most of the cases we just want to know whether an element is present in the sub dom-tree before being able to proceed
     * @param condition
     * @param options
     */
    DomQuery.prototype.waitUntilDom = function (condition, options) {
        if (options === void 0) { options = {
            attributes: true,
            childList: true,
            subtree: true,
            timeout: 500,
            interval: 100
        }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, waitUntilDom(this, condition, options)];
            });
        });
    };
    Object.defineProperty(DomQuery.prototype, "shadowElements", {
        /**
         * returns the embedded shadow elements
         */
        get: function () {
            var shadowElements = this.querySelectorAll("*")
                .filter(function (item) { return item.hasShadow; });
            var mapped = (shadowElements.allElems() || []).map(function (element) { return element.shadowRoot; });
            return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], mapped, false)))();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "shadowRoot", {
        get: function () {
            var shadowRoots = [];
            for (var cnt = 0; cnt < this.rootNode.length; cnt++) {
                if (this.rootNode[cnt].shadowRoot) {
                    shadowRoots.push(this.rootNode[cnt].shadowRoot);
                }
            }
            return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], shadowRoots, false)))();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "hasShadow", {
        get: function () {
            for (var cnt = 0; cnt < this.rootNode.length; cnt++) {
                if (this.rootNode[cnt].shadowRoot) {
                    return true;
                }
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    // from
    // http:// blog.vishalon.net/index.php/javascript-getting-and-setting-caret-position-in-textarea/
    DomQuery.getCaretPosition = function (ctrl) {
        var caretPos = 0;
        try {
            if (document === null || document === void 0 ? void 0 : document.selection) {
                ctrl.focus();
                var selection = document.selection.createRange();
                // the selection now is start zero
                selection.moveStart('character', -ctrl.value.length);
                // the caret-position is the selection start
                caretPos = selection.text.length;
            }
        }
        catch (e) {
            // now this is ugly, but not supported input types throw errors for selectionStart
            // just in case someone dumps this code onto unsupported browsers
        }
        return caretPos;
    };
    /**
     * sets the caret position
     *
     * @param ctrl the control to set the caret position to
     * @param pos the position to set
     *
     * note if the control does not have any selectable and focusable behavior
     * calling this method does nothing (silent fail)
     *
     */
    DomQuery.setCaretPosition = function (ctrl, pos) {
        (ctrl === null || ctrl === void 0 ? void 0 : ctrl.focus) ? ctrl === null || ctrl === void 0 ? void 0 : ctrl.focus() : null;
        // the selection range is our caret position
        (ctrl === null || ctrl === void 0 ? void 0 : ctrl.setSelectiongRange) ? ctrl === null || ctrl === void 0 ? void 0 : ctrl.setSelectiongRange(pos, pos) : null;
    };
    /**
     * Implementation of an iterator
     * to allow loops over dom query collections
     */
    DomQuery.prototype[Symbol.iterator] = function () {
        var _this = this;
        return {
            next: function () {
                var done = !_this.hasNext();
                var val = _this.next();
                return {
                    done: done,
                    value: val
                };
            }
        };
    };
    /**
     * Concatenates the elements of two Dom Queries into a single one
     * @param toAttach the elements to attach
     * @param filterDoubles filter out possible double elements (aka same markup)
     */
    DomQuery.prototype.concat = function (toAttach, filterDoubles) {
        if (filterDoubles === void 0) { filterDoubles = true; }
        var ret = this.lazyStream.concat(toAttach.lazyStream).collect(new DomQueryCollector());
        // we now filter the doubles out
        if (!filterDoubles) {
            return ret;
        }
        var idx = {}; // ie11 does not support sets, we have to fake it
        return ret.lazyStream.filter(function (node) {
            var notFound = !(idx === null || idx === void 0 ? void 0 : idx[node.value.value.outerHTML]);
            idx[node.value.value.outerHTML] = true;
            return notFound;
        }).collect(new DomQueryCollector());
    };
    DomQuery.prototype.append = function (elem) {
        this.each(function (item) { return elem.appendTo(item); });
        return this;
    };
    DomQuery.prototype.prependTo = function (elem) {
        var _this = this;
        elem.eachElem(function (item) {
            item.prepend.apply(item, _this.allElems());
        });
        return this;
    };
    DomQuery.prototype.prepend = function (elem) {
        this.eachElem(function (item) {
            item.prepend.apply(item, elem.allElems());
        });
        return this;
    };
    /**
     * query selector all on the existing dom queryX object
     *
     * @param selector the standard selector
     * @return a DomQuery with the results
     */
    DomQuery.prototype._querySelectorAll = function (selector) {
        var _a, _b;
        if (!((_a = this === null || this === void 0 ? void 0 : this.rootNode) === null || _a === void 0 ? void 0 : _a.length)) {
            return this;
        }
        var nodes = [];
        for (var cnt = 0; cnt < this.rootNode.length; cnt++) {
            if (!((_b = this.rootNode[cnt]) === null || _b === void 0 ? void 0 : _b.querySelectorAll)) {
                continue;
            }
            var res = this.rootNode[cnt].querySelectorAll(selector);
            nodes = nodes.concat(objToArray(res));
        }
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], nodes, false)))();
    };
    /*deep with a selector and a pseudo /shadow/ marker to break into the next level*/
    DomQuery.prototype._querySelectorAllDeep = function (selector) {
        var _a;
        if (!((_a = this === null || this === void 0 ? void 0 : this.rootNode) === null || _a === void 0 ? void 0 : _a.length)) {
            return this;
        }
        var foundNodes = new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], this.rootNode, false)))();
        var selectors = selector.split(/\/shadow\//);
        for (var cnt2 = 0; cnt2 < selectors.length; cnt2++) {
            if (selectors[cnt2] == "") {
                continue;
            }
            var levelSelector = selectors[cnt2];
            foundNodes = foundNodes.querySelectorAll(levelSelector);
            if (cnt2 < selectors.length - 1) {
                foundNodes = foundNodes.shadowRoot;
            }
        }
        return foundNodes;
    };
    // source: https:// developer.mozilla.org/en-US/docs/Web/API/Element/matches
    // code snippet license: https:// creativecommons.org/licenses/by-sa/2.5/
    /**
     * matches selector call in a browser independent manner
     *
     * @param toMatch
     * @param selector
     * @private
     */
    DomQuery.prototype._mozMatchesSelector = function (toMatch, selector) {
        var prototypeOwner = toMatch;
        var matchesSelector = prototypeOwner.matches ||
            prototypeOwner.matchesSelector ||
            prototypeOwner.mozMatchesSelector ||
            prototypeOwner.msMatchesSelector ||
            prototypeOwner.oMatchesSelector ||
            prototypeOwner.webkitMatchesSelector ||
            function (s) {
                var matches = (document || ownerDocument).querySelectorAll(s), i = matches.length;
                while (--i >= 0 && matches.item(i) !== toMatch) {
                }
                return i > -1;
            };
        return matchesSelector.call(toMatch, selector);
    };
    /**
     * sticky non-sticky unified code of the load script eval
     * implementation if programmatic &gt;script src="... loading
     *
     * @param sticky if set to true a head element is left in the dom tree after the script has loaded
     *
     * @param src the sec to load
     * @param delay delay the script loading x ms (default immediately === 0)
     * @param nonce optional nonce token to be passed into the script tag
     * @private
     */
    DomQuery.prototype._loadScriptEval = function (sticky, src, delay, nonce) {
        if (delay === void 0) { delay = 0; }
        var srcNode = this.createSourceNode(src, nonce);
        var nonceCheck = this.createSourceNode(null, nonce);
        var marker = "nonce_".concat(Date.now(), "_").concat(Math.random());
        nonceCheck.innerHTML = "document.head[\"".concat(marker, "\"] = true"); // noop
        var head = document.head;
        //  upfront nonce check, needed mostly for testing
        //  but cannot hurt to block src calls which have invalid nonce on localhost
        // the reason for doing this up until now we have a similar construct automatically
        // by loading the scripts via xhr and then embedding them.
        // this is not needed anymore but the nonce is more relaxed with script src
        // we now enforce it the old way
        head.appendChild(nonceCheck);
        head.removeChild(nonceCheck);
        if (!head[marker]) {
            return;
        }
        try {
            if (!delay) {
                head.appendChild(srcNode);
                if (!sticky) {
                    head.removeChild(srcNode);
                }
            }
            else {
                setTimeout(function () {
                    head.appendChild(srcNode);
                    if (!sticky) {
                        head.removeChild(srcNode);
                    }
                }, delay);
            }
        }
        finally {
            delete head[marker];
        }
        return this;
    };
    /**
     * resolves an attribute holder compared
     * @param attrName the attribute name
     */
    DomQuery.prototype.resolveAttributeHolder = function (attrName) {
        if (attrName === void 0) { attrName = "value"; }
        var ret = [];
        ret[attrName] = null;
        return (attrName in this.getAsElem(0).value) ?
            this.getAsElem(0).value :
            ret;
    };
    DomQuery.prototype.createSourceNode = function (src, nonce) {
        var srcNode = document.createElement("script");
        srcNode.type = "text/javascript";
        if (!!nonce) {
            if ('undefined' != typeof (srcNode === null || srcNode === void 0 ? void 0 : srcNode.nonce)) {
                srcNode.nonce = nonce;
            }
            else {
                srcNode.setAttribute("nonce", nonce);
            }
        }
        if (!!src) {
            srcNode.src = src;
        }
        return srcNode;
    };
    DomQuery.prototype.applyNonce = function (nonce, script) {
        if (nonce) {
            if ('undefined' != typeof (script === null || script === void 0 ? void 0 : script.nonce)) {
                script.nonce = nonce;
            }
            else {
                script.setAttribute("nonce", nonce);
            }
        }
    };
    DomQuery.absent = new DomQuery();
    /**
     * reference to the environmental global object
     */
    DomQuery.global = Global_1._global$;
    return DomQuery;
}());
exports.DomQuery = DomQuery;
/**
 * Various collectors
 * which can be used in conjunction with Streams
 */
/**
 * A collector which bundles a full dom query stream into a single dom query element
 *
 * This connects basically our stream back into DomQuery
 */
var DomQueryCollector = /** @class */ (function () {
    function DomQueryCollector() {
        this.data = [];
    }
    DomQueryCollector.prototype.collect = function (element) {
        this.data.push(element);
    };
    Object.defineProperty(DomQueryCollector.prototype, "finalValue", {
        get: function () {
            return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], this.data, false)))();
        },
        enumerable: false,
        configurable: true
    });
    return DomQueryCollector;
}());
exports.DomQueryCollector = DomQueryCollector;
/**
 * abbreviation for DomQuery
 */
exports.DQ = DomQuery;
// noinspection JSUnusedGlobalSymbols
/**
 * replacement for the jquery $
 */
exports.DQ$ = DomQuery.querySelectorAll;


/***/ }),

/***/ "./node_modules/mona-dish/src/main/typescript/Global.ts":
/*!**************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/Global.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._global$ = void 0;
/*!
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/**
 * various environments handle the global variable different
 * we have to deal with this.
 */
function _global$() {
    var _a;
    var _global$ = ('undefined' != typeof globalThis && globalThis.window) ? globalThis.window :
        ('undefined' != typeof window) ? window :
            ('undefined' != typeof globalThis) ? globalThis :
                ('undefined' != typeof __webpack_require__.g && (__webpack_require__.g === null || __webpack_require__.g === void 0 ? void 0 : __webpack_require__.g.window)) ? __webpack_require__.g.window :
                    ('undefined' != typeof __webpack_require__.g) ? __webpack_require__.g : null;
    //under test systems we often have a lazy init of the window object under global.window, but we
    //want the window object
    return (_a = _global$ === null || _global$ === void 0 ? void 0 : _global$.window) !== null && _a !== void 0 ? _a : _global$;
}
exports._global$ = _global$;


/***/ }),

/***/ "./node_modules/mona-dish/src/main/typescript/Lang.ts":
/*!************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/Lang.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*!
 * Licensed to the Apache Software Foundation (ASF) under one or more
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Lang = void 0;
var Monad_1 = __webpack_require__(/*! ./Monad */ "./node_modules/mona-dish/src/main/typescript/Monad.ts");
/**
 * Lang helpers crossported from the apache myfaces project
 */
var Lang;
(function (Lang) {
    //should be in lang, but for now here to avoid recursive imports, not sure if typescript still has a problem with those
    /**
     * helper function to savely resolve anything
     * this is not an elvis operator, it resolves
     * a value without exception in a tree and if
     * it is not resolvable then an optional of
     * a default value is restored or Optional.empty
     * if none is given
     *
     * usage
     * <code>
     *     let var: Optiona<string> = saveResolve(() => a.b.c.d.e, "foobaz")
     * </code>
     *
     * @param resolverProducer a lambda which can produce the value
     * @param defaultValue an optional default value if the producer failes to produce anything
     * @returns an Optional of the produced value
     */
    function saveResolve(resolverProducer, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        try {
            var result = resolverProducer();
            return Monad_1.Optional.fromNullable(result !== null && result !== void 0 ? result : defaultValue);
        }
        catch (e) {
            return Monad_1.Optional.absent;
        }
    }
    Lang.saveResolve = saveResolve;
    function saveResolveLazy(resolverProducer, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        try {
            var result = resolverProducer();
            return Monad_1.Optional.fromNullable(result !== null && result !== void 0 ? result : defaultValue());
        }
        catch (e) {
            return Monad_1.Optional.absent;
        }
    }
    Lang.saveResolveLazy = saveResolveLazy;
    /**
     * String to array function performs a string to array transformation
     * @param {String} it the string which has to be changed into an array
     * @param {RegExp} splitter our splitter reglar expression
     * @return a trimmed array of the splitted string
     */
    function strToArray(it, splitter) {
        if (splitter === void 0) { splitter = /\./gi; }
        var ret = [];
        it.split(splitter).forEach((function (element) {
            ret.push(trim(element));
        }));
        return ret;
    }
    Lang.strToArray = strToArray;
    /**
     * hyperfast trim
     * http://blog.stevenlevithan.com/archives/faster-trim-javascript
     * crossported from dojo
     */
    function trim(str) {
        str = str.replace(/^\s\s*/, '');
        var ws = /\s/, i = str.length;
        while (ws.test(str.charAt(--i))) {
            //do nothing
        }
        return str.slice(0, i + 1);
    }
    Lang.trim = trim;
    /**
     * generic object arrays like dom definitions to array conversion method which
     * transforms any object to something array like
     * @param obj
     * @param offset
     * @param pack
     * @returns an array converted from the object
     */
    function objToArray(obj, offset, pack) {
        if (offset === void 0) { offset = 0; }
        if (pack === void 0) { pack = []; }
        if ((obj !== null && obj !== void 0 ? obj : "__undefined__") == "__undefined__") {
            return pack !== null && pack !== void 0 ? pack : null;
        }
        //since offset is numeric we cannot use the shortcut due to 0 being false
        //special condition array delivered no offset no pack
        if (obj instanceof Array && !offset && !pack)
            return obj;
        return pack.concat(Array.prototype.slice.call(obj, offset));
    }
    Lang.objToArray = objToArray;
    /**
     * equalsIgnoreCase, case insensitive comparison of two strings
     *
     * @param source
     * @param destination
     */
    function equalsIgnoreCase(source, destination) {
        var finalSource = source !== null && source !== void 0 ? source : "___no_value__";
        var finalDest = destination !== null && destination !== void 0 ? destination : "___no_value__";
        //in any other case we do a strong string comparison
        return finalSource.toLowerCase() === finalDest.toLowerCase();
    }
    Lang.equalsIgnoreCase = equalsIgnoreCase;
    /**
     * runtime type assertion
     *
     * @param probe the probe to be tested for a type
     * @param theType the type to be tested for
     */
    function assertType(probe, theType) {
        return isString(theType) ? typeof probe == theType : probe instanceof theType;
    }
    Lang.assertType = assertType;
    /**
     * Backported from dojo
     * a failsafe string determination method
     * (since in javascript String != "" typeof alone fails!)
     * @param it {|Object|} the object to be checked for being a string
     * @return true in case of being a string false otherwise
     */
    function isString(it) {
        //	summary:
        //		Return true if it is a String
        return !!arguments.length && it != null && (typeof it == "string" || it instanceof String); // Boolean
    }
    Lang.isString = isString;
    function isFunc(it) {
        return it instanceof Function || typeof it === "function";
    }
    Lang.isFunc = isFunc;
    // code from https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    // license https://creativecommons.org/licenses/by-sa/2.5/
    function objAssign(target) {
        var theArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            theArgs[_i - 1] = arguments[_i];
        }
        if (target == null) { // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }
        var to = Object(target);
        if (Object.assign) {
            theArgs.forEach(function (item) { return Object.assign(to, item); });
            return to;
        }
        theArgs.filter(function (item) { return item != null; }).forEach(function (item) {
            var nextSource = item;
            Object.keys(nextSource)
                .filter(function (nextKey) { return Object.prototype.hasOwnProperty.call(nextSource, nextKey); })
                .forEach(function (nextKey) { return to[nextKey] = nextSource[nextKey]; });
        });
        return to;
    }
    Lang.objAssign = objAssign;
})(Lang = exports.Lang || (exports.Lang = {}));


/***/ }),

/***/ "./node_modules/mona-dish/src/main/typescript/Monad.ts":
/*!*************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/Monad.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/*!
 * Licensed to the Apache Software Foundation (ASF) under one or more
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Config = exports.ValueEmbedder = exports.Optional = exports.Monad = void 0;
/**
 * A module which keeps  basic monadish like definitions in place without any sidedependencies to other modules.
 * Useful if you need the functions in another library to keep its dependencies down
 */
/*IMonad definitions*/
var Lang_1 = __webpack_require__(/*! ./Lang */ "./node_modules/mona-dish/src/main/typescript/Lang.ts");
var SourcesCollectors_1 = __webpack_require__(/*! ./SourcesCollectors */ "./node_modules/mona-dish/src/main/typescript/SourcesCollectors.ts");
var Stream_1 = __webpack_require__(/*! ./Stream */ "./node_modules/mona-dish/src/main/typescript/Stream.ts");
var objAssign = Lang_1.Lang.objAssign;
/**
 * Implementation of a monad
 * (Sideffect free), no write allowed directly on the monads
 * value state
 */
var Monad = /** @class */ (function () {
    function Monad(value) {
        this._value = value;
    }
    Object.defineProperty(Monad.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Monad.prototype.map = function (fn) {
        if (!fn) {
            fn = function (inval) { return inval; };
        }
        var result = fn(this.value);
        return new Monad(result);
    };
    Monad.prototype.flatMap = function (fn) {
        var mapped = this.map(fn);
        while ((mapped === null || mapped === void 0 ? void 0 : mapped.value) instanceof Monad) {
            mapped = mapped.value;
        }
        return mapped;
    };
    return Monad;
}());
exports.Monad = Monad;
/**
 * optional implementation, an optional is basically an implementation of a Monad with additional syntactic
 * sugar on top
 * (Sideeffect free, since value assignment is not allowed)
 * */
var Optional = /** @class */ (function (_super) {
    __extends(Optional, _super);
    function Optional(value) {
        return _super.call(this, value) || this;
    }
    Object.defineProperty(Optional.prototype, "value", {
        get: function () {
            if (this._value instanceof Monad) {
                return this._value.flatMap().value;
            }
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Optional.fromNullable = function (value) {
        return new Optional(value);
    };
    /*syntactic sugar for absent and present checks*/
    Optional.prototype.isAbsent = function () {
        return "undefined" == typeof this.value || null == this.value;
    };
    /**
     * any value present
     */
    Optional.prototype.isPresent = function (presentRunnable) {
        var absent = this.isAbsent();
        if (!absent && presentRunnable) {
            presentRunnable.call(this, this);
        }
        return !absent;
    };
    Optional.prototype.ifPresentLazy = function (presentRunnable) {
        if (presentRunnable === void 0) { presentRunnable = function () {
        }; }
        this.isPresent.call(this, presentRunnable);
        return this;
    };
    Optional.prototype.orElse = function (elseValue) {
        if (this.isPresent()) {
            return this;
        }
        else {
            //shortcut
            if (elseValue == null) {
                return Optional.absent;
            }
            return this.flatMap(function () { return elseValue; });
        }
    };
    /**
     * lazy, passes a function which then is lazily evaluated
     * instead of a direct value
     * @param func
     */
    Optional.prototype.orElseLazy = function (func) {
        if (this.isPresent()) {
            return this;
        }
        else {
            return this.flatMap(func);
        }
    };
    /*
     * we need to implement it to fullfill the contract, although it is used only internally
     * all values are flattened when accessed anyway, so there is no need to call this methiod
     */
    Optional.prototype.flatMap = function (fn) {
        var val = _super.prototype.flatMap.call(this, fn);
        if (!(val instanceof Optional)) {
            return Optional.fromNullable(val.value);
        }
        return val.flatMap();
    };
    /*
     * elvis operation, take care, if you use this you lose typesafety and refactoring
     * capabilites, unfortunately typesceript does not allow to have its own elvis operator
     * this is some syntactic sugar however which is quite useful*/
    Optional.prototype.getIf = function () {
        var key = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            key[_i] = arguments[_i];
        }
        var currentPos = this;
        for (var cnt = 0; cnt < key.length; cnt++) {
            var currKey = this.keyVal(key[cnt]);
            var arrPos = this.arrayIndex(key[cnt]);
            if (currKey === "" && arrPos >= 0) {
                currentPos = this.getClass().fromNullable(!(currentPos.value instanceof Array) ? null : (currentPos.value.length < arrPos ? null : currentPos.value[arrPos]));
                if (currentPos.isAbsent()) {
                    return currentPos;
                }
                continue;
            }
            else if (currKey && arrPos >= 0) {
                if (currentPos.getIfPresent(currKey).isAbsent()) {
                    return currentPos;
                }
                currentPos = (currentPos.getIfPresent(currKey).value instanceof Array) ? this.getClass().fromNullable(currentPos.getIfPresent(currKey).value[arrPos]) : this.getClass().absent;
                if (currentPos.isAbsent()) {
                    return currentPos;
                }
                continue;
            }
            else {
                currentPos = currentPos.getIfPresent(currKey);
            }
            if (currentPos.isAbsent()) {
                return currentPos;
            }
            else if (arrPos > -1) {
                currentPos = this.getClass().fromNullable(currentPos.value[arrPos]);
            }
        }
        var retVal = currentPos;
        return retVal;
    };
    /**
     * simple match, if the first order function call returns
     * true then there is a match, if the value is not present
     * it never matches
     *
     * @param fn the first order function performing the match
     */
    Optional.prototype.match = function (fn) {
        if (this.isAbsent()) {
            return false;
        }
        return fn(this.value);
    };
    /**
     * convenience function to flatmap the internal value
     * and replace it with a default in case of being absent
     *
     * @param defaultVal
     * @returns {Optional<any>}
     */
    Optional.prototype.get = function (defaultVal) {
        if (defaultVal === void 0) { defaultVal = Optional.absent; }
        if (this.isAbsent()) {
            return this.getClass().fromNullable(defaultVal).flatMap();
        }
        return this.getClass().fromNullable(this.value).flatMap();
    };
    Optional.prototype.toJson = function () {
        return JSON.stringify(this.value);
    };
    /**
     * helper to override several implementations in a more fluent way
     * by having a getClass operation we can avoid direct calls into the constructor or
     * static methods and do not have to implement several methods which rely on the type
     * of "this"
     * @returns {Monadish.Optional}
     */
    Optional.prototype.getClass = function () {
        return Optional;
    };
    /*helper method for getIf with array access aka <name>[<indexPos>]*/
    Optional.prototype.arrayIndex = function (key) {
        var start = key.indexOf("[");
        var end = key.indexOf("]");
        if (start >= 0 && end > 0 && start < end) {
            return parseInt(key.substring(start + 1, end));
        }
        else {
            return -1;
        }
    };
    /*helper method for getIf with array access aka <name>[<indexPos>]*/
    Optional.prototype.keyVal = function (key) {
        var start = key.indexOf("[");
        if (start >= 0) {
            return key.substring(0, start);
        }
        else {
            return key;
        }
    };
    /**
     * additional syntactic sugar which is not part of the usual optional implementation
     * but makes life easier, if you want to sacrifice typesafety and refactoring
     * capabilities in typescript
     */
    Optional.prototype.getIfPresent = function (key) {
        if (this.isAbsent()) {
            return this.getClass().absent;
        }
        return this.getClass().fromNullable(this.value[key]).flatMap();
    };
    /**
     * elvis like typesafe functional save resolver
     * a typesafe option for getIfPresent
     *
     * usage myOptional.resolve(value => value.subAttr.subAttr2).orElseLazy(....)
     * if this is resolvable without any errors an Optional with the value is returned
     * if not, then an Optional absent is returned, also if you return Optional absent
     * it is flatmapped into absent
     *
     * @param resolver the resolver function, can throw any arbitrary errors, int  the error case
     * the resolution goes towards absent
     */
    Optional.prototype.resolve = function (resolver) {
        if (this.isAbsent()) {
            return Optional.absent;
        }
        try {
            return Optional.fromNullable(resolver(this.value));
        }
        catch (e) {
            return Optional.absent;
        }
    };
    /*default value for absent*/
    Optional.absent = Optional.fromNullable(null);
    return Optional;
}(Monad));
exports.Optional = Optional;
// --------------------- From here onwards we break out the sideffects free limits ------------
/**
 * ValueEmbedder is the writeable version
 * of optional, it basically is a wrappber
 * around a construct which has a state
 * and can be written to.
 *
 * For the readonly version see Optional
 */
var ValueEmbedder = /** @class */ (function (_super) {
    __extends(ValueEmbedder, _super);
    function ValueEmbedder(rootElem, valueKey) {
        if (valueKey === void 0) { valueKey = "value"; }
        var _this = _super.call(this, rootElem) || this;
        _this.key = valueKey;
        return _this;
    }
    Object.defineProperty(ValueEmbedder.prototype, "value", {
        get: function () {
            return this._value ? this._value[this.key] : null;
        },
        set: function (newVal) {
            if (!this._value) {
                return;
            }
            this._value[this.key] = newVal;
        },
        enumerable: false,
        configurable: true
    });
    ValueEmbedder.prototype.orElse = function (elseValue) {
        var alternative = {};
        alternative[this.key] = elseValue;
        return this.isPresent() ? this : new ValueEmbedder(alternative, this.key);
    };
    ValueEmbedder.prototype.orElseLazy = function (func) {
        if (this.isPresent()) {
            return this;
        }
        else {
            var alternative = {};
            alternative[this.key] = func();
            return new ValueEmbedder(alternative, this.key);
        }
    };
    /**
     * helper to override several implementations in a more fluent way
     * by having a getClass operation we can avoid direct calls into the constructor or
     * static methods and do not have to implement several methods which rely on the type
     * of "this"
     * @returns {Monadish.Optional}
     */
    ValueEmbedder.prototype.getClass = function () {
        return ValueEmbedder;
    };
    ValueEmbedder.fromNullable = function (value, valueKey) {
        if (valueKey === void 0) { valueKey = "value"; }
        return new ValueEmbedder(value, valueKey);
    };
    /*default value for absent*/
    ValueEmbedder.absent = ValueEmbedder.fromNullable(null);
    return ValueEmbedder;
}(Optional));
exports.ValueEmbedder = ValueEmbedder;
/**
 * specialized value embedder
 * for our Configuration
 */
var ConfigEntry = /** @class */ (function (_super) {
    __extends(ConfigEntry, _super);
    function ConfigEntry(rootElem, key, arrPos) {
        var _this = _super.call(this, rootElem, key) || this;
        _this.arrPos = arrPos !== null && arrPos !== void 0 ? arrPos : -1;
        return _this;
    }
    Object.defineProperty(ConfigEntry.prototype, "value", {
        get: function () {
            if (this.key == "" && this.arrPos >= 0) {
                return this._value[this.arrPos];
            }
            else if (this.key && this.arrPos >= 0) {
                return this._value[this.key][this.arrPos];
            }
            return this._value[this.key];
        },
        set: function (val) {
            if (this.key == "" && this.arrPos >= 0) {
                this._value[this.arrPos] = val;
                return;
            }
            else if (this.key && this.arrPos >= 0) {
                this._value[this.key][this.arrPos] = val;
                return;
            }
            this._value[this.key] = val;
        },
        enumerable: false,
        configurable: true
    });
    /*default value for absent*/
    ConfigEntry.absent = ConfigEntry.fromNullable(null);
    return ConfigEntry;
}(ValueEmbedder));
/**
 * Config, basically an optional wrapper for a json structure
 * (not sideeffect free, since we can alter the internal config state
 * without generating a new config), not sure if we should make it sideffect free
 * since this would swallow a lot of performane and ram
 */
var Config = /** @class */ (function (_super) {
    __extends(Config, _super);
    function Config(root) {
        return _super.call(this, root) || this;
    }
    Object.defineProperty(Config.prototype, "shallowCopy", {
        /**
         * shallow copy getter, copies only the first level, references the deeper nodes
         * in a shared manner
         */
        get: function () {
            return this.shallowCopy$();
        },
        enumerable: false,
        configurable: true
    });
    Config.prototype.shallowCopy$ = function () {
        return new Config(Stream_1.Stream.ofAssoc(this.value).collect(new SourcesCollectors_1.AssocArrayCollector()));
    };
    Object.defineProperty(Config.prototype, "deepCopy", {
        /**
         * deep copy, copies all config nodes
         */
        get: function () {
            return this.deepCopy$();
        },
        enumerable: false,
        configurable: true
    });
    Config.prototype.deepCopy$ = function () {
        return new Config(objAssign({}, this.value));
    };
    /**
     * creates a config from an initial value or null
     * @param value
     */
    Config.fromNullable = function (value) {
        return new Config(value);
    };
    /**
     * simple merge for the root configs
     */
    Config.prototype.shallowMerge = function (other, overwrite, withAppend) {
        var _this = this;
        if (overwrite === void 0) { overwrite = true; }
        if (withAppend === void 0) { withAppend = false; }
        var _loop_1 = function (key) {
            if ('undefined' == typeof key || null == key) {
                return "continue";
            }
            if (overwrite || !(key in this_1.value)) {
                if (!withAppend) {
                    this_1.assign(key).value = other.getIf(key).value;
                }
                else {
                    if (Array.isArray(other.getIf(key).value)) {
                        Stream_1.Stream.of.apply(Stream_1.Stream, other.getIf(key).value).each(function (item) { return _this.append(key).value = item; });
                    }
                    else {
                        this_1.append(key).value = other.getIf(key).value;
                    }
                }
            }
        };
        var this_1 = this;
        for (var key in other.value) {
            _loop_1(key);
        }
    };
    /**
     * assigns a single value as array, or appends it
     * to an existing value mapping a single value to array
     *
     *
     * usage myConfig.append("foobaz").value = "newValue"
     *       myConfig.append("foobaz").value = "newValue2"
     *
     * resulting in myConfig.foobaz == ["newValue, newValue2"]
     *
     * @param {string[]} accessPath
     */
    Config.prototype.append = function () {
        var accessPath = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            accessPath[_i] = arguments[_i];
        }
        var noKeys = accessPath.length < 1;
        if (noKeys) {
            return;
        }
        var lastKey = accessPath[accessPath.length - 1];
        var currKey, finalKey = this.keyVal(lastKey);
        var pathExists = this.getIf.apply(this, accessPath).isPresent();
        this.buildPath(accessPath);
        var finalKeyArrPos = this.arrayIndex(lastKey);
        if (finalKeyArrPos > -1) {
            throw Error("Append only possible on non array properties, use assign on indexed data");
        }
        var value = this.getIf.apply(this, accessPath).value;
        if (!Array.isArray(value)) {
            value = this.assign.apply(this, accessPath).value = [value];
        }
        if (pathExists) {
            value.push({});
        }
        finalKeyArrPos = value.length - 1;
        var retVal = new ConfigEntry(accessPath.length == 1 ? this.value : this.getIf.apply(this, accessPath.slice(0, accessPath.length - 1)).value, lastKey, finalKeyArrPos);
        return retVal;
    };
    /**
     * appends to an existing entry (or extends into an array and appends)
     * if the condition is met
     * @param {boolean} condition
     * @param {string[]} accessPath
     */
    Config.prototype.appendIf = function (condition) {
        var accessPath = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            accessPath[_i - 1] = arguments[_i];
        }
        if (!condition) {
            return { value: null };
        }
        return this.append.apply(this, accessPath);
    };
    /**
     * assings an new value on the given access path
     * @param accessPath
     */
    Config.prototype.assign = function () {
        var accessPath = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            accessPath[_i] = arguments[_i];
        }
        if (accessPath.length < 1) {
            return;
        }
        this.buildPath(accessPath);
        var currKey = this.keyVal(accessPath[accessPath.length - 1]);
        var arrPos = this.arrayIndex(accessPath[accessPath.length - 1]);
        var retVal = new ConfigEntry(accessPath.length == 1 ? this.value : this.getIf.apply(this, accessPath.slice(0, accessPath.length - 1)).value, currKey, arrPos);
        return retVal;
    };
    /**
     * assign a value if the condition is set to true, otherwise skip it
     *
     * @param condition the condition, the access accessPath into the config
     * @param accessPath
     */
    Config.prototype.assignIf = function (condition) {
        var accessPath = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            accessPath[_i - 1] = arguments[_i];
        }
        return condition ? this.assign.apply(this, accessPath) : { value: null };
    };
    /**
     * get if the access path is present (get is reserved as getter with a default, on the current path)
     * TODO will be renamed to something more meaningful and deprecated, the name is ambigous
     * @param accessPath the access path
     */
    Config.prototype.getIf = function () {
        var accessPath = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            accessPath[_i] = arguments[_i];
        }
        return this.getClass().fromNullable(_super.prototype.getIf.apply(this, accessPath).value);
    };
    /**
     * gets the current node and if none is present returns a config with a default value
     * @param defaultVal
     */
    Config.prototype.get = function (defaultVal) {
        return this.getClass().fromNullable(_super.prototype.get.call(this, defaultVal).value);
    };
    //empties the current config entry
    Config.prototype.delete = function (key) {
        if (key in this.value) {
            delete this.value[key];
        }
        return this;
    };
    /**
     * converts the entire config into a json object
     */
    Config.prototype.toJson = function () {
        return JSON.stringify(this.value);
    };
    Config.prototype.getClass = function () {
        return Config;
    };
    Config.prototype.setVal = function (val) {
        this._value = val;
    };
    /**
     * builds the config path
     *
     * @param accessPath a sequential array of accessPath containing either a key name or an array reference name[<index>]
     */
    Config.prototype.buildPath = function (accessPath) {
        var val = this;
        var parentVal = this.getClass().fromNullable(null);
        var parentPos = -1;
        var alloc = function (arr, length) {
            var length1 = arr.length;
            var length2 = length1 + length;
            for (var cnt = length1; cnt < length2; cnt++) {
                arr.push({});
            }
        };
        for (var cnt = 0; cnt < accessPath.length; cnt++) {
            var currKey = this.keyVal(accessPath[cnt]);
            var arrPos = this.arrayIndex(accessPath[cnt]);
            if (currKey === "" && arrPos >= 0) {
                val.setVal((val.value instanceof Array) ? val.value : []);
                alloc(val.value, arrPos + 1);
                if (parentPos >= 0) {
                    parentVal.value[parentPos] = val.value;
                }
                parentVal = val;
                parentPos = arrPos;
                val = this.getClass().fromNullable(val.value[arrPos]);
                continue;
            }
            var tempVal = val.getIf(currKey);
            if (arrPos == -1) {
                if (tempVal.isAbsent()) {
                    tempVal = this.getClass().fromNullable(val.value[currKey] = {});
                }
                else {
                    val = tempVal;
                }
            }
            else {
                var arr = (tempVal.value instanceof Array) ? tempVal.value : [];
                alloc(arr, arrPos + 1);
                val.value[currKey] = arr;
                tempVal = this.getClass().fromNullable(arr[arrPos]);
            }
            parentVal = val;
            parentPos = arrPos;
            val = tempVal;
        }
        return this;
    };
    return Config;
}(Optional));
exports.Config = Config;


/***/ }),

/***/ "./node_modules/mona-dish/src/main/typescript/SourcesCollectors.ts":
/*!*************************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/SourcesCollectors.ts ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/*!
 * Licensed to the Apache Software Foundation (ASF) under one or more
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryFormStringCollector = exports.QueryFormDataCollector = exports.FormDataCollector = exports.AssocArrayCollector = exports.Run = exports.ArrayAssocArrayCollector = exports.ArrayCollector = exports.FlatMapStreamDataSource = exports.MappedStreamDataSource = exports.FilteredStreamDatasource = exports.ArrayStreamDataSource = exports.SequenceDataSource = exports.ITERATION_STATUS = void 0;
var Stream_1 = __webpack_require__(/*! ./Stream */ "./node_modules/mona-dish/src/main/typescript/Stream.ts");
/**
 * special status of the datasource location pointer
 * if an access, outside of the possible data boundaries is happening
 * (example for instance current without a first next call, or next
 * which goes over the last possible dataset), an iteration status return
 * value is returned marking this boundary instead of a classical element
 *
 * Note this is only internally used but must be implemented to fullfill
 * internal contracts, the end user will never see those values if he uses
 * streams!
 */
var ITERATION_STATUS;
(function (ITERATION_STATUS) {
    ITERATION_STATUS["EO_STRM"] = "__EO_STRM__";
    ITERATION_STATUS["BEF_STRM"] = "___BEF_STRM__";
})(ITERATION_STATUS = exports.ITERATION_STATUS || (exports.ITERATION_STATUS = {}));
/**
 * defines a sequence of numbers for our stream input
 */
var SequenceDataSource = /** @class */ (function () {
    function SequenceDataSource(start, total) {
        this.total = total;
        this.start = start;
        this.value = start - 1;
    }
    SequenceDataSource.prototype.hasNext = function () {
        return this.value < (this.total - 1);
    };
    SequenceDataSource.prototype.next = function () {
        this.value++;
        return this.value <= (this.total - 1) ? this.value : ITERATION_STATUS.EO_STRM;
    };
    SequenceDataSource.prototype.lookAhead = function (cnt) {
        if (cnt === void 0) { cnt = 1; }
        if ((this.value + cnt) > this.total - 1) {
            return ITERATION_STATUS.EO_STRM;
        }
        else {
            return this.value + cnt;
        }
    };
    SequenceDataSource.prototype.reset = function () {
        this.value = this.start - 1;
    };
    SequenceDataSource.prototype.current = function () {
        //first condition current without initial call for next
        return (this.start - 1) ? ITERATION_STATUS.BEF_STRM : this.value;
    };
    return SequenceDataSource;
}());
exports.SequenceDataSource = SequenceDataSource;
/**
 * implementation of iteratable on top of array
 */
var ArrayStreamDataSource = /** @class */ (function () {
    function ArrayStreamDataSource() {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        this.dataPos = -1;
        this.value = value;
    }
    ArrayStreamDataSource.prototype.lookAhead = function (cnt) {
        if (cnt === void 0) { cnt = 1; }
        if ((this.dataPos + cnt) > this.value.length - 1) {
            return ITERATION_STATUS.EO_STRM;
        }
        return this.value[this.dataPos + cnt];
    };
    ArrayStreamDataSource.prototype.hasNext = function () {
        return this.value.length - 1 > this.dataPos;
    };
    ArrayStreamDataSource.prototype.next = function () {
        var _a;
        this.dataPos++;
        return (_a = this === null || this === void 0 ? void 0 : this.value[this.dataPos]) !== null && _a !== void 0 ? _a : ITERATION_STATUS.EO_STRM;
    };
    ArrayStreamDataSource.prototype.reset = function () {
        this.dataPos = -1;
    };
    ArrayStreamDataSource.prototype.current = function () {
        return this.value[Math.max(0, this.dataPos)];
    };
    return ArrayStreamDataSource;
}());
exports.ArrayStreamDataSource = ArrayStreamDataSource;
/**
 * an intermediate data source which prefilters
 * incoming stream data
 * and lets only the data out which
 * passes the filter function check
 */
var FilteredStreamDatasource = /** @class */ (function () {
    function FilteredStreamDatasource(filterFunc, parent) {
        this._current = ITERATION_STATUS.BEF_STRM;
        // we have to add a filter idx because the external filter values might change over time, so
        // we cannot reset the state properly unless we do it from a snapshot
        this._filterIdx = {};
        this._unfilteredPos = 0;
        this.filterFunc = filterFunc;
        this.inputDataSource = parent;
    }
    /**
     * in order to filter we have to make a look ahead until the
     * first next allowed element
     * hence we prefetch the element and then
     * serve it via next
     */
    FilteredStreamDatasource.prototype.hasNext = function () {
        var steps = 1;
        var found = false;
        var next;
        while (!found && (next = this.inputDataSource.lookAhead(steps)) != ITERATION_STATUS.EO_STRM) {
            if (this.filterFunc(next)) {
                this._filterIdx[this._unfilteredPos + steps] = true;
                found = true;
            }
            else {
                steps++;
            }
        }
        return found;
    };
    /**
     * serve the next element
     */
    FilteredStreamDatasource.prototype.next = function () {
        var _a, _b;
        var found = ITERATION_STATUS.EO_STRM;
        while (this.inputDataSource.hasNext()) {
            this._unfilteredPos++;
            var next = this.inputDataSource.next();
            //again here we cannot call the filter function twice, because its state might change, so if indexed, we have a decent snapshot, either has next or next can trigger
            //the snapshot
            if (next != ITERATION_STATUS.EO_STRM &&
                (((_b = (_a = this._filterIdx) === null || _a === void 0 ? void 0 : _a[this._unfilteredPos]) !== null && _b !== void 0 ? _b : false) || this.filterFunc(next))) {
                this._filterIdx[this._unfilteredPos] = true;
                found = next;
                break;
            }
        }
        this._current = found;
        return found;
    };
    FilteredStreamDatasource.prototype.lookAhead = function (cnt) {
        var _a;
        if (cnt === void 0) { cnt = 1; }
        var lookupVal;
        for (var loop = 1; cnt > 0 && (lookupVal = this.inputDataSource.lookAhead(loop)) != ITERATION_STATUS.EO_STRM; loop++) {
            var inCache = (_a = this._filterIdx) === null || _a === void 0 ? void 0 : _a[this._unfilteredPos + loop];
            if (inCache || this.filterFunc(lookupVal)) {
                cnt--;
                this._filterIdx[this._unfilteredPos + loop] = true;
            }
        }
        return lookupVal;
    };
    FilteredStreamDatasource.prototype.current = function () {
        return this._current;
    };
    FilteredStreamDatasource.prototype.reset = function () {
        this._current = ITERATION_STATUS.BEF_STRM;
        this._filterIdx = {};
        this._unfilteredPos = 0;
        this.inputDataSource.reset();
    };
    return FilteredStreamDatasource;
}());
exports.FilteredStreamDatasource = FilteredStreamDatasource;
/**
 * an intermediate datasource which maps the items from
 * one into another
 */
var MappedStreamDataSource = /** @class */ (function () {
    function MappedStreamDataSource(mapFunc, parent) {
        this.mapFunc = mapFunc;
        this.inputDataSource = parent;
    }
    MappedStreamDataSource.prototype.hasNext = function () {
        return this.inputDataSource.hasNext();
    };
    MappedStreamDataSource.prototype.next = function () {
        return this.mapFunc(this.inputDataSource.next());
    };
    MappedStreamDataSource.prototype.reset = function () {
        this.inputDataSource.reset();
    };
    MappedStreamDataSource.prototype.current = function () {
        return this.mapFunc(this.inputDataSource.current());
    };
    MappedStreamDataSource.prototype.lookAhead = function (cnt) {
        if (cnt === void 0) { cnt = 1; }
        var lookAheadVal = this.inputDataSource.lookAhead(cnt);
        return (lookAheadVal == ITERATION_STATUS.EO_STRM) ? lookAheadVal : this.mapFunc(lookAheadVal);
    };
    return MappedStreamDataSource;
}());
exports.MappedStreamDataSource = MappedStreamDataSource;
/**
 * Same for flatmap to deal with element -> stream mappings
 */
var FlatMapStreamDataSource = /** @class */ (function () {
    function FlatMapStreamDataSource(func, parent) {
        this.walkedDataSources = [];
        this._currPos = 0;
        this.mapFunc = func;
        this.inputDataSource = parent;
    }
    FlatMapStreamDataSource.prototype.hasNext = function () {
        return this.resolveActiveHasNext() || this.resolveNextHasNext();
    };
    FlatMapStreamDataSource.prototype.resolveActiveHasNext = function () {
        var next = false;
        if (this.activeDataSource) {
            next = this.activeDataSource.hasNext();
        }
        return next;
    };
    FlatMapStreamDataSource.prototype.lookAhead = function (cnt) {
        var _a;
        if (cnt === void 0) { cnt = 1; }
        //easy access trial
        if ((this === null || this === void 0 ? void 0 : this.activeDataSource) && ((_a = this === null || this === void 0 ? void 0 : this.activeDataSource) === null || _a === void 0 ? void 0 : _a.lookAhead(cnt)) != ITERATION_STATUS.EO_STRM) {
            //this should coverr 95% of all accesses
            return this === null || this === void 0 ? void 0 : this.activeDataSource.lookAhead(cnt);
        }
        /**
         * we only can determine how many elems datasource has by going up
         * (for now this suffices, however not ideal, we might have to introduce a numElements or so)
         * @param datasource
         */
        function howManyElems(datasource) {
            var cnt = 1;
            while (datasource.lookAhead(cnt) !== ITERATION_STATUS.EO_STRM) {
                cnt++;
            }
            return cnt - 1;
        }
        function readjustSkip(dataSource) {
            var skippedElems = (dataSource) ? howManyElems(dataSource) : 0;
            cnt = cnt - skippedElems;
        }
        if (this.activeDataSource) {
            readjustSkip(this.activeDataSource);
        }
        //the idea is basically to look into the streams subsequentially for a match
        //after each stream we have to take into consideration that the skipCnt is
        //reduced by the number of datasets we already have looked into in the previous stream/datasource
        //unfortunately for now we have to loop into them so we introduce a small o2 here
        for (var dsLoop = 1; true; dsLoop++) {
            var currDatasource = this.inputDataSource.lookAhead(dsLoop);
            //we have looped out
            if (currDatasource === ITERATION_STATUS.EO_STRM) {
                return ITERATION_STATUS.EO_STRM;
            }
            var mapped = this.mapFunc(currDatasource);
            //it either comes in as datasource or as array
            var currentDataSource = this.toDatasource(mapped);
            var ret = currentDataSource.lookAhead(cnt);
            if (ret != ITERATION_STATUS.EO_STRM) {
                return ret;
            }
            readjustSkip(currDatasource);
        }
    };
    FlatMapStreamDataSource.prototype.toDatasource = function (mapped) {
        var ds = Array.isArray(mapped) ? new (ArrayStreamDataSource.bind.apply(ArrayStreamDataSource, __spreadArray([void 0], mapped, false)))() : mapped;
        this.walkedDataSources.push(ds);
        return ds;
    };
    FlatMapStreamDataSource.prototype.resolveNextHasNext = function () {
        var next = false;
        while (!next && this.inputDataSource.hasNext()) {
            var mapped = this.mapFunc(this.inputDataSource.next());
            this.activeDataSource = this.toDatasource(mapped);
            ;
            next = this.activeDataSource.hasNext();
        }
        return next;
    };
    FlatMapStreamDataSource.prototype.next = function () {
        if (this.hasNext()) {
            this._currPos++;
            return this.activeDataSource.next();
        }
    };
    FlatMapStreamDataSource.prototype.reset = function () {
        this.inputDataSource.reset();
        this.walkedDataSources.forEach(function (ds) { return ds.reset(); });
        this.walkedDataSources = [];
        this._currPos = 0;
        this.activeDataSource = null;
    };
    FlatMapStreamDataSource.prototype.current = function () {
        if (!this.activeDataSource) {
            this.hasNext();
        }
        return this.activeDataSource.current();
    };
    return FlatMapStreamDataSource;
}());
exports.FlatMapStreamDataSource = FlatMapStreamDataSource;
/**
 * For the time being we only need one collector
 * a collector which collects a stream back into arrays
 */
var ArrayCollector = /** @class */ (function () {
    function ArrayCollector() {
        this.data = [];
    }
    ArrayCollector.prototype.collect = function (element) {
        this.data.push(element);
    };
    Object.defineProperty(ArrayCollector.prototype, "finalValue", {
        get: function () {
            return this.data;
        },
        enumerable: false,
        configurable: true
    });
    return ArrayCollector;
}());
exports.ArrayCollector = ArrayCollector;
/**
 * collects an tuple array stream into an assoc array with elements being collected into arrays
 *
 */
var ArrayAssocArrayCollector = /** @class */ (function () {
    function ArrayAssocArrayCollector() {
        this.finalValue = {};
    }
    ArrayAssocArrayCollector.prototype.collect = function (element) {
        var _a, _b, _c, _d;
        var key = (_a = element === null || element === void 0 ? void 0 : element[0]) !== null && _a !== void 0 ? _a : element;
        this.finalValue[key] = (_c = (_b = this.finalValue) === null || _b === void 0 ? void 0 : _b[key]) !== null && _c !== void 0 ? _c : [];
        this.finalValue[key].push((_d = element === null || element === void 0 ? void 0 : element[1]) !== null && _d !== void 0 ? _d : true);
    };
    return ArrayAssocArrayCollector;
}());
exports.ArrayAssocArrayCollector = ArrayAssocArrayCollector;
/**
 * dummy collector which just triggers a run
 * on lazy streams without collecting anything
 */
var Run = /** @class */ (function () {
    function Run() {
    }
    Run.prototype.collect = function (element) {
    };
    Object.defineProperty(Run.prototype, "finalValue", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    return Run;
}());
exports.Run = Run;
/**
 * collects an assoc stream back to an assoc array
 */
var AssocArrayCollector = /** @class */ (function () {
    function AssocArrayCollector() {
        this.finalValue = {};
    }
    AssocArrayCollector.prototype.collect = function (element) {
        var _a, _b;
        this.finalValue[(_a = element[0]) !== null && _a !== void 0 ? _a : element] = (_b = element[1]) !== null && _b !== void 0 ? _b : true;
    };
    return AssocArrayCollector;
}());
exports.AssocArrayCollector = AssocArrayCollector;
/**
 * Form data collector for key value pair streams
 */
var FormDataCollector = /** @class */ (function () {
    function FormDataCollector() {
        this.finalValue = new FormData();
    }
    FormDataCollector.prototype.collect = function (element) {
        this.finalValue.append(element.key, element.value);
    };
    return FormDataCollector;
}());
exports.FormDataCollector = FormDataCollector;
/**
 * Form data collector for DomQuery streams
 */
var QueryFormDataCollector = /** @class */ (function () {
    function QueryFormDataCollector() {
        this.finalValue = new FormData();
    }
    QueryFormDataCollector.prototype.collect = function (element) {
        var toMerge = element.encodeFormElement();
        if (toMerge.isPresent()) {
            this.finalValue.append(element.name.value, toMerge.get(element.name).value);
        }
    };
    return QueryFormDataCollector;
}());
exports.QueryFormDataCollector = QueryFormDataCollector;
/**
 * Encoded String collector from dom query streams
 */
var QueryFormStringCollector = /** @class */ (function () {
    function QueryFormStringCollector() {
        this.formData = [];
    }
    QueryFormStringCollector.prototype.collect = function (element) {
        var toMerge = element.encodeFormElement();
        if (toMerge.isPresent()) {
            this.formData.push([element.name.value, toMerge.get(element.name).value]);
        }
    };
    Object.defineProperty(QueryFormStringCollector.prototype, "finalValue", {
        get: function () {
            return Stream_1.Stream.of.apply(Stream_1.Stream, this.formData).map(function (keyVal) { return keyVal.join("="); })
                .reduce(function (item1, item2) { return [item1, item2].join("&"); })
                .orElse("").value;
        },
        enumerable: false,
        configurable: true
    });
    return QueryFormStringCollector;
}());
exports.QueryFormStringCollector = QueryFormStringCollector;


/***/ }),

/***/ "./node_modules/mona-dish/src/main/typescript/Stream.ts":
/*!**************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/Stream.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/*!
 * Licensed to the Apache Software Foundation (ASF) under one or more
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LazyStream = exports.Stream = void 0;
/*
 * A small stream implementation
 */
var Monad_1 = __webpack_require__(/*! ./Monad */ "./node_modules/mona-dish/src/main/typescript/Monad.ts");
var SourcesCollectors_1 = __webpack_require__(/*! ./SourcesCollectors */ "./node_modules/mona-dish/src/main/typescript/SourcesCollectors.ts");
/**
 * A simple typescript based reimplementation of streams
 *
 * This is the early eval version
 * for a lazy eval version check, LazyStream, which is api compatible
 * to this implementation, however with the benefit of being able
 * to provide infinite data sources and generic data providers, the downside
 * is, it might be a tad slower in some situations
 */
var Stream = /** @class */ (function () {
    function Stream() {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        this._limits = -1;
        this.pos = -1;
        this.value = value;
    }
    Stream.of = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        return new (Stream.bind.apply(Stream, __spreadArray([void 0], data, false)))();
    };
    Stream.ofAssoc = function (data) {
        return this.of.apply(this, Object.keys(data)).map(function (key) { return [key, data[key]]; });
    };
    Stream.ofDataSource = function (dataSource) {
        var value = [];
        while (dataSource.hasNext()) {
            value.push(dataSource.next());
        }
        return new (Stream.bind.apply(Stream, __spreadArray([void 0], value, false)))();
    };
    Stream.prototype.limits = function (end) {
        this._limits = end;
        return this;
    };
    /**
     * concat for streams, so that you can concat two streams together
     * @param toAppend
     */
    Stream.prototype.concat = function () {
        //let dataSource = new MultiStreamDatasource<T>(this, ...toAppend);
        //return Stream.ofDataSource<T>(dataSource);
        var toAppend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            toAppend[_i] = arguments[_i];
        }
        return Stream.of.apply(Stream, __spreadArray([this], toAppend, false)).flatMap(function (item) { return item; });
    };
    Stream.prototype.onElem = function (fn) {
        for (var cnt = 0; cnt < this.value.length && (this._limits == -1 || cnt < this._limits); cnt++) {
            if (fn(this.value[cnt], cnt) === false) {
                break;
            }
        }
        return this;
    };
    Stream.prototype.each = function (fn) {
        this.onElem(fn);
        this.reset();
    };
    Stream.prototype.map = function (fn) {
        if (!fn) {
            fn = function (inval) { return inval; };
        }
        var res = [];
        this.each(function (item) {
            res.push(fn(item));
        });
        return new (Stream.bind.apply(Stream, __spreadArray([void 0], res, false)))();
    };
    /*
     * we need to implement it to fullfill the contract, although it is used only internally
     * all values are flattened when accessed anyway, so there is no need to call this methiod
     */
    Stream.prototype.flatMap = function (fn) {
        var ret = [];
        this.each(function (item) {
            var strmR = fn(item);
            ret = Array.isArray(strmR) ? ret.concat(strmR) : ret.concat.apply(ret, strmR.value);
        });
        return Stream.of.apply(Stream, ret);
    };
    Stream.prototype.filter = function (fn) {
        var res = [];
        this.each(function (data) {
            if (fn(data)) {
                res.push(data);
            }
        });
        return new (Stream.bind.apply(Stream, __spreadArray([void 0], res, false)))();
    };
    Stream.prototype.reduce = function (fn, startVal) {
        if (startVal === void 0) { startVal = null; }
        var offset = startVal != null ? 0 : 1;
        var val1 = startVal != null ? startVal : this.value.length ? this.value[0] : null;
        for (var cnt = offset; cnt < this.value.length && (this._limits == -1 || cnt < this._limits); cnt++) {
            val1 = fn(val1, this.value[cnt]);
        }
        this.reset();
        return Monad_1.Optional.fromNullable(val1);
    };
    Stream.prototype.first = function () {
        this.reset();
        return this.value && this.value.length ? Monad_1.Optional.fromNullable(this.value[0]) : Monad_1.Optional.absent;
    };
    Stream.prototype.last = function () {
        //could be done via reduce, but is faster this way
        var length = this._limits > 0 ? Math.min(this._limits, this.value.length) : this.value.length;
        this.reset();
        return Monad_1.Optional.fromNullable(length ? this.value[length - 1] : null);
    };
    Stream.prototype.anyMatch = function (fn) {
        for (var cnt = 0; cnt < this.value.length && (this._limits == -1 || cnt < this._limits); cnt++) {
            if (fn(this.value[cnt])) {
                return true;
            }
        }
        this.reset();
        return false;
    };
    Stream.prototype.allMatch = function (fn) {
        if (!this.value.length) {
            return false;
        }
        var matches = 0;
        for (var cnt = 0; cnt < this.value.length; cnt++) {
            if (fn(this.value[cnt])) {
                matches++;
            }
        }
        this.reset();
        return matches == this.value.length;
    };
    Stream.prototype.noneMatch = function (fn) {
        var matches = 0;
        for (var cnt = 0; cnt < this.value.length; cnt++) {
            if (!fn(this.value[cnt])) {
                matches++;
            }
        }
        this.reset();
        return matches == this.value.length;
    };
    Stream.prototype.sort = function (comparator) {
        var newArr = this.value.slice().sort(comparator);
        return Stream.of.apply(Stream, newArr);
    };
    Stream.prototype.collect = function (collector) {
        this.each(function (data) { return collector.collect(data); });
        this.reset();
        return collector.finalValue;
    };
    //-- internally exposed methods needed for the interconnectivity
    Stream.prototype.hasNext = function () {
        var isLimitsReached = this._limits != -1 && this.pos >= this._limits - 1;
        var isEndOfArray = this.pos >= this.value.length - 1;
        return !(isLimitsReached || isEndOfArray);
    };
    Stream.prototype.next = function () {
        if (!this.hasNext()) {
            return null;
        }
        this.pos++;
        return this.value[this.pos];
    };
    Stream.prototype.lookAhead = function (cnt) {
        if (cnt === void 0) { cnt = 1; }
        if ((this.pos + cnt) >= this.value.length) {
            return SourcesCollectors_1.ITERATION_STATUS.EO_STRM;
        }
        return this.value[this.pos + cnt];
    };
    Stream.prototype[Symbol.iterator] = function () {
        var _this = this;
        return {
            next: function () {
                var done = !_this.hasNext();
                var val = _this.next();
                return {
                    done: done,
                    value: val
                };
            }
        };
    };
    /*get observable(): Observable<T> {
        return from(this);
    }*/
    Stream.prototype.reset = function () {
        this.pos = -1;
    };
    return Stream;
}());
exports.Stream = Stream;
/**
 * Lazy implementation of a Stream
 * The idea is to connect the intermediate
 * streams as datasources like a linked list
 * with reverse referencing and for special
 * operations like filtering flatmapping
 * have intermediate datasources in the list
 * with specialized functions.
 *
 * Sort of a modified pipe valve pattern
 * the streams are the pipes the intermediate
 * data sources are the valves
 *
 * We then can use passed in functions to control
 * the flow in the valves
 *
 * That way we can have a lazy evaluating stream
 *
 * So if an endpoint requests data
 * a callback trace goes back the stream list
 * which triggers an operation upwards
 * which sends data down the drain which then is processed
 * and filtered until one element hits the endpoint.
 *
 * That is repeated, until all elements are processed
 * or an internal limit is hit.
 *
 */
var LazyStream = /** @class */ (function () {
    function LazyStream(parent) {
        this._limits = -1;
        /*
         * needed to have the limits check working
         * we need to keep track of the current position
         * in the stream
         */
        this.pos = -1;
        this.dataSource = parent;
    }
    LazyStream.of = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new LazyStream(new (SourcesCollectors_1.ArrayStreamDataSource.bind.apply(SourcesCollectors_1.ArrayStreamDataSource, __spreadArray([void 0], values, false)))());
    };
    LazyStream.ofAssoc = function (data) {
        return this.of.apply(this, Object.keys(data)).map(function (key) { return [key, data[key]]; });
    };
    LazyStream.ofStreamDataSource = function (value) {
        return new LazyStream(value);
    };
    LazyStream.prototype.hasNext = function () {
        if (this.isOverLimits()) {
            return false;
        }
        return this.dataSource.hasNext();
    };
    LazyStream.prototype.next = function () {
        var next = this.dataSource.next();
        // @ts-ignore
        this.pos++;
        return next;
    };
    LazyStream.prototype.lookAhead = function (cnt) {
        if (cnt === void 0) { cnt = 1; }
        return this.dataSource.lookAhead(cnt);
    };
    LazyStream.prototype.current = function () {
        return this.dataSource.current();
    };
    LazyStream.prototype.reset = function () {
        this.dataSource.reset();
        this.pos = -1;
        this._limits = -1;
    };
    /**
     * concat for streams, so that you can concat two streams together
     * @param toAppend
     */
    LazyStream.prototype.concat = function () {
        var toAppend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            toAppend[_i] = arguments[_i];
        }
        //this.dataSource =  new MultiStreamDatasource<T>(this, ... toAppend);
        //return this;
        return LazyStream.of.apply(LazyStream, __spreadArray([this], toAppend, false)).flatMap(function (item) { return item; });
    };
    LazyStream.prototype.nextFilter = function (fn) {
        if (this.hasNext()) {
            var newVal = this.next();
            if (!fn(newVal)) {
                return this.nextFilter(fn);
            }
            return newVal;
        }
        return null;
    };
    LazyStream.prototype.limits = function (max) {
        this._limits = max;
        return this;
    };
    //main stream methods
    LazyStream.prototype.collect = function (collector) {
        while (this.hasNext()) {
            var t = this.next();
            collector.collect(t);
        }
        this.reset();
        return collector.finalValue;
    };
    LazyStream.prototype.onElem = function (fn) {
        var _this = this;
        return new LazyStream(new SourcesCollectors_1.MappedStreamDataSource(function (el) {
            if (fn(el, _this.pos) === false) {
                _this.stop();
            }
            return el;
        }, this));
    };
    LazyStream.prototype.filter = function (fn) {
        return new LazyStream(new SourcesCollectors_1.FilteredStreamDatasource(fn, this));
    };
    LazyStream.prototype.map = function (fn) {
        return new LazyStream(new SourcesCollectors_1.MappedStreamDataSource(fn, this));
    };
    LazyStream.prototype.flatMap = function (fn) {
        return new LazyStream(new SourcesCollectors_1.FlatMapStreamDataSource(fn, this));
    };
    //endpoint
    LazyStream.prototype.each = function (fn) {
        while (this.hasNext()) {
            if (fn(this.next()) === false) {
                this.stop();
            }
        }
        this.reset();
    };
    LazyStream.prototype.reduce = function (fn, startVal) {
        if (startVal === void 0) { startVal = null; }
        if (!this.hasNext()) {
            return Monad_1.Optional.absent;
        }
        var value1;
        var value2 = null;
        if (startVal != null) {
            value1 = startVal;
            value2 = this.next();
        }
        else {
            value1 = this.next();
            if (!this.hasNext()) {
                return Monad_1.Optional.fromNullable(value1);
            }
            value2 = this.next();
        }
        value1 = fn(value1, value2);
        while (this.hasNext()) {
            value2 = this.next();
            value1 = fn(value1, value2);
        }
        this.reset();
        return Monad_1.Optional.fromNullable(value1);
    };
    LazyStream.prototype.last = function () {
        if (!this.hasNext()) {
            return Monad_1.Optional.absent;
        }
        return this.reduce(function (el1, el2) { return el2; });
    };
    LazyStream.prototype.first = function () {
        this.reset();
        if (!this.hasNext()) {
            return Monad_1.Optional.absent;
        }
        return Monad_1.Optional.fromNullable(this.next());
    };
    LazyStream.prototype.anyMatch = function (fn) {
        while (this.hasNext()) {
            if (fn(this.next())) {
                return true;
            }
        }
        return false;
    };
    LazyStream.prototype.allMatch = function (fn) {
        while (this.hasNext()) {
            if (!fn(this.next())) {
                return false;
            }
        }
        return true;
    };
    LazyStream.prototype.noneMatch = function (fn) {
        while (this.hasNext()) {
            if (fn(this.next())) {
                return false;
            }
        }
        return true;
    };
    LazyStream.prototype.sort = function (comparator) {
        var arr = this.collect(new SourcesCollectors_1.ArrayCollector());
        arr = arr.sort(comparator);
        return LazyStream.of.apply(LazyStream, arr);
    };
    Object.defineProperty(LazyStream.prototype, "value", {
        get: function () {
            return this.collect(new SourcesCollectors_1.ArrayCollector());
        },
        enumerable: false,
        configurable: true
    });
    LazyStream.prototype[Symbol.iterator] = function () {
        var _this = this;
        return {
            next: function () {
                var done = !_this.hasNext();
                var val = _this.next();
                return {
                    done: done,
                    value: val
                };
            }
        };
    };
    /*get observable(): Observable<T> {
        return from(this);
    }*/
    LazyStream.prototype.stop = function () {
        this.pos = this._limits + 1000000000;
        this._limits = 0;
    };
    LazyStream.prototype.isOverLimits = function () {
        return this._limits != -1 && this.pos >= this._limits - 1;
    };
    return LazyStream;
}());
exports.LazyStream = LazyStream;


/***/ }),

/***/ "./node_modules/mona-dish/src/main/typescript/XmlQuery.ts":
/*!****************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/XmlQuery.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/*!
 * Licensed to the Apache Software Foundation (ASF) under one or more
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.XQ = exports.XMLQuery = void 0;
var Lang_1 = __webpack_require__(/*! ./Lang */ "./node_modules/mona-dish/src/main/typescript/Lang.ts");
var DomQuery_1 = __webpack_require__(/*! ./DomQuery */ "./node_modules/mona-dish/src/main/typescript/DomQuery.ts");
var isString = Lang_1.Lang.isString;
var Global_1 = __webpack_require__(/*! ./Global */ "./node_modules/mona-dish/src/main/typescript/Global.ts");
/**
 * xml query as specialized case for DomQuery
 */
var XMLQuery = /** @class */ (function (_super) {
    __extends(XMLQuery, _super);
    function XMLQuery(rootNode, docType) {
        if (docType === void 0) { docType = "text/xml"; }
        var _this = this;
        var createIe11DomQueryShim = function () {
            //at the time if wroting ie11 is the only relevant browser
            //left withut any DomQuery support
            var parser = new ActiveXObject("Microsoft.XMLDOM");
            parser.async = false;
            //we shim th dom parser from ie in
            return {
                parseFromString: function (text, contentType) {
                    return parser.loadXML(text);
                }
            };
        };
        var parseXML = function (xml) {
            if (xml == null) {
                return null;
            }
            var domParser = Lang_1.Lang.saveResolveLazy(function () { return new ((0, Global_1._global$)()).DOMParser(); }, function () { return createIe11DomQueryShim(); }).value;
            return domParser.parseFromString(xml, docType);
        };
        if (isString(rootNode)) {
            _this = _super.call(this, parseXML(rootNode)) || this;
        }
        else {
            _this = _super.call(this, rootNode) || this;
        }
        return _this;
    }
    XMLQuery.prototype.isXMLParserError = function () {
        return this.querySelectorAll("parsererror").isPresent();
    };
    XMLQuery.prototype.toString = function () {
        var ret = [];
        this.eachElem(function (node) {
            var _a, _b, _c, _d;
            var serialized = (_d = (_c = (_b = (_a = ((0, Global_1._global$)())) === null || _a === void 0 ? void 0 : _a.XMLSerializer) === null || _b === void 0 ? void 0 : _b.constructor()) === null || _c === void 0 ? void 0 : _c.serializeToString(node)) !== null && _d !== void 0 ? _d : node === null || node === void 0 ? void 0 : node.xml;
            if (!!serialized) {
                ret.push(serialized);
            }
        });
        return ret.join("");
    };
    XMLQuery.prototype.parserErrorText = function (joinstr) {
        return this.querySelectorAll("parsererror").textContent(joinstr);
    };
    XMLQuery.parseXML = function (txt) {
        return new XMLQuery(txt);
    };
    XMLQuery.parseHTML = function (txt) {
        return new XMLQuery(txt, "text/html");
    };
    XMLQuery.fromString = function (txt, parseType) {
        if (parseType === void 0) { parseType = "text/xml"; }
        return new XMLQuery(txt, parseType);
    };
    return XMLQuery;
}(DomQuery_1.DomQuery));
exports.XMLQuery = XMLQuery;
exports.XQ = XMLQuery;


/***/ }),

/***/ "./node_modules/mona-dish/src/main/typescript/index_core.ts":
/*!******************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/index_core.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryFormDataCollector = exports.FormDataCollector = exports.AssocArrayCollector = exports.ArrayCollector = exports.QueryFormStringCollector = exports.SequenceDataSource = exports.FlatMapStreamDataSource = exports.FilteredStreamDatasource = exports.MappedStreamDataSource = exports.ArrayStreamDataSource = exports.LazyStream = exports.Stream = exports.XQ = exports.XMLQuery = exports.ValueEmbedder = exports.Optional = exports.Monad = exports.Config = exports.Lang = exports.DQ$ = exports.DQ = exports.DomQueryCollector = exports.ElementAttribute = exports.DomQuery = void 0;
/*!
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var DomQuery_1 = __webpack_require__(/*! ./DomQuery */ "./node_modules/mona-dish/src/main/typescript/DomQuery.ts");
Object.defineProperty(exports, "DomQuery", ({ enumerable: true, get: function () { return DomQuery_1.DomQuery; } }));
Object.defineProperty(exports, "ElementAttribute", ({ enumerable: true, get: function () { return DomQuery_1.ElementAttribute; } }));
Object.defineProperty(exports, "DomQueryCollector", ({ enumerable: true, get: function () { return DomQuery_1.DomQueryCollector; } }));
Object.defineProperty(exports, "DQ", ({ enumerable: true, get: function () { return DomQuery_1.DQ; } }));
Object.defineProperty(exports, "DQ$", ({ enumerable: true, get: function () { return DomQuery_1.DQ$; } }));
var Lang_1 = __webpack_require__(/*! ./Lang */ "./node_modules/mona-dish/src/main/typescript/Lang.ts");
Object.defineProperty(exports, "Lang", ({ enumerable: true, get: function () { return Lang_1.Lang; } }));
var Monad_1 = __webpack_require__(/*! ./Monad */ "./node_modules/mona-dish/src/main/typescript/Monad.ts");
Object.defineProperty(exports, "Config", ({ enumerable: true, get: function () { return Monad_1.Config; } }));
Object.defineProperty(exports, "Monad", ({ enumerable: true, get: function () { return Monad_1.Monad; } }));
Object.defineProperty(exports, "Optional", ({ enumerable: true, get: function () { return Monad_1.Optional; } }));
Object.defineProperty(exports, "ValueEmbedder", ({ enumerable: true, get: function () { return Monad_1.ValueEmbedder; } }));
var XmlQuery_1 = __webpack_require__(/*! ./XmlQuery */ "./node_modules/mona-dish/src/main/typescript/XmlQuery.ts");
Object.defineProperty(exports, "XMLQuery", ({ enumerable: true, get: function () { return XmlQuery_1.XMLQuery; } }));
Object.defineProperty(exports, "XQ", ({ enumerable: true, get: function () { return XmlQuery_1.XQ; } }));
var Stream_1 = __webpack_require__(/*! ./Stream */ "./node_modules/mona-dish/src/main/typescript/Stream.ts");
Object.defineProperty(exports, "Stream", ({ enumerable: true, get: function () { return Stream_1.Stream; } }));
Object.defineProperty(exports, "LazyStream", ({ enumerable: true, get: function () { return Stream_1.LazyStream; } }));
var SourcesCollectors_1 = __webpack_require__(/*! ./SourcesCollectors */ "./node_modules/mona-dish/src/main/typescript/SourcesCollectors.ts");
Object.defineProperty(exports, "ArrayStreamDataSource", ({ enumerable: true, get: function () { return SourcesCollectors_1.ArrayStreamDataSource; } }));
Object.defineProperty(exports, "MappedStreamDataSource", ({ enumerable: true, get: function () { return SourcesCollectors_1.MappedStreamDataSource; } }));
Object.defineProperty(exports, "FilteredStreamDatasource", ({ enumerable: true, get: function () { return SourcesCollectors_1.FilteredStreamDatasource; } }));
Object.defineProperty(exports, "FlatMapStreamDataSource", ({ enumerable: true, get: function () { return SourcesCollectors_1.FlatMapStreamDataSource; } }));
Object.defineProperty(exports, "SequenceDataSource", ({ enumerable: true, get: function () { return SourcesCollectors_1.SequenceDataSource; } }));
Object.defineProperty(exports, "QueryFormStringCollector", ({ enumerable: true, get: function () { return SourcesCollectors_1.QueryFormStringCollector; } }));
Object.defineProperty(exports, "ArrayCollector", ({ enumerable: true, get: function () { return SourcesCollectors_1.ArrayCollector; } }));
Object.defineProperty(exports, "AssocArrayCollector", ({ enumerable: true, get: function () { return SourcesCollectors_1.AssocArrayCollector; } }));
Object.defineProperty(exports, "FormDataCollector", ({ enumerable: true, get: function () { return SourcesCollectors_1.FormDataCollector; } }));
Object.defineProperty(exports, "QueryFormDataCollector", ({ enumerable: true, get: function () { return SourcesCollectors_1.QueryFormDataCollector; } }));


/***/ }),

/***/ "./src/main/typescript/api/_api.ts":
/*!*****************************************!*\
  !*** ./src/main/typescript/api/_api.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.myfaces = exports.faces = void 0;
/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
var AjaxImpl_1 = __webpack_require__(/*! ../impl/AjaxImpl */ "./src/main/typescript/impl/AjaxImpl.ts");
var PushImpl_1 = __webpack_require__(/*! ../impl/PushImpl */ "./src/main/typescript/impl/PushImpl.ts");
var OamSubmit_1 = __webpack_require__(/*! ../myfaces/OamSubmit */ "./src/main/typescript/myfaces/OamSubmit.ts");
var Const_1 = __webpack_require__(/*! ../impl/core/Const */ "./src/main/typescript/impl/core/Const.ts");
//we use modules to get a proper jsdoc and static/map structure in the calls
//as per spec requirement
var faces;
(function (faces) {
    /**
     * Version of the implementation for the faces.ts.
     * <p />
     * as specified within the jsf specifications faces.html:
     * <ul>
     * <li>left two digits major release number</li>
     * <li>middle two digits minor spec release number</li>
     * <li>right two digits bug release number</li>
     * </ul>
     * @constant
     */
    faces.specversion = 400000;
    /**
     * Implementation version as specified within the jsf specification.
     * <p />
     * A number increased with every implementation version
     * and reset by moving to a new spec release number
     *
     * @constant
     */
    faces.implversion = 0;
    /**
     * SeparatorChar as defined by facesContext.getNamingContainerSeparatorChar()
     */
    faces.separatorchar = getSeparatorChar();
    // noinspection JSUnusedGlobalSymbols
    /**
     * Context Path as defined externalContext.requestContextPath
     */
    faces.contextpath = '#{facesContext.externalContext.requestContextPath}';
    // we do not have a fallback here, for now
    /**
     * This method is responsible for the return of a given project stage as defined
     * by the jsf specification.
     * <p/>
     * Valid return values are:
     * <ul>
     *     <li>&quot;Production&quot;</li>
     *     <li>&quot;Development&quot;</li>
     *     <li>&quot;SystemTest&quot;</li>
     *     <li>&quot;UnitTest&quot;</li>
     * </li>
     *
     * @return {String} the current project state emitted by the server side method:
     * <i>jakarta.faces.application.Application.getProjectStage()</i>
     */
    function getProjectStage() {
        return AjaxImpl_1.Implementation.getProjectStage();
    }
    faces.getProjectStage = getProjectStage;
    /**
     * collect and encode data for a given form element (must be of type form)
     * find the jakarta.faces.ViewState element and encode its value as well!
     * return a concatenated string of the encoded values!
     *
     * @throws an exception in case of the given element not being of type form!
     * https://issues.apache.org/jira/browse/MYFACES-2110
     */
    function getViewState(formElement) {
        return AjaxImpl_1.Implementation.getViewState(formElement);
    }
    faces.getViewState = getViewState;
    /**
     * returns the window identifier for the given node / window
     * @return the window identifier or null if none is found
     * @param rootNode
     */
    function getClientWindow(rootNode) {
        return AjaxImpl_1.Implementation.getClientWindow(rootNode);
    }
    faces.getClientWindow = getClientWindow;
    //private helper functions
    function getSeparatorChar() {
        var sep = '#{facesContext.namingContainerSeparatorChar}';
        //We now enable standalone mode, the separator char was not mapped we make a fallback to 2.3 behavior
        //the idea is that the separator char is provided from the underlying container, but if not then we
        //will perform a fallback (aka 2.3 has the url fallback behavior)
        return (sep.match(/\#\{facesContext.namingContainerSeparatorChar\}/gi)) ? AjaxImpl_1.Implementation.getSeparatorChar() : sep;
    }
    var ajax;
    (function (ajax) {
        "use strict";
        /**
         * this function has to send the ajax requests
         *
         * following requestInternal conditions must be met:
         * <ul>
         *  <li> the requestInternal must be sent asynchronously! </li>
         *  <li> the requestInternal must be a POST!!! requestInternal </li>
         *  <li> the requestInternal url must be the form action attribute </li>
         *  <li> all requests must be queued with a client side requestInternal queue to ensure the requestInternal ordering!</li>
         * </ul>
         *
         * @param {String|Node} element: any dom element no matter being it html or jsf, from which the event is emitted
         * @param {EVENT} event: any javascript event supported by that object
         * @param {Map} options : map of options being pushed into the ajax cycle
         */
        function request(element, event, options) {
            AjaxImpl_1.Implementation.request(element, event, options);
        }
        ajax.request = request;
        /**
         * response handler
         * @param request the request object having triggered this response
         * @param context the request context
         *
         * TODO add info on what can be in the context
         */
        function response(request, context) {
            AjaxImpl_1.Implementation.response(request, context);
        }
        ajax.response = response;
        /**
         * Adds an error handler to our global error queue.
         * the error handler must be of the format <i>function errorListener(&lt;errorData&gt;)</i>
         * with errorData being of following format:
         * <ul>
         *     <li> errorData.type : &quot;error&quot;</li>
         *     <li> errorData.status : the error status message</li>
         *     <li> errorData.serverErrorName : the server error name in case of a server error</li>
         *     <li> errorData.serverErrorMessage : the server error message in case of a server error</li>
         *     <li> errorData.source  : the issuing source element which triggered the requestInternal </li>
         *     <li> eventData.responseCode: the response code (aka http requestInternal response code, 401 etc...) </li>
         *     <li> eventData.responseText: the requestInternal response text </li>
         *     <li> eventData.responseXML: the requestInternal response xml </li>
         * </ul>
         *
         * @param errorListener error handler must be of the format <i>function errorListener(&lt;errorData&gt;)</i>
         */
        function addOnError(errorFunc) {
            AjaxImpl_1.Implementation.addOnError(errorFunc);
        }
        ajax.addOnError = addOnError;
        /**
         * Adds a global event listener to the ajax event queue. The event listener must be a function
         * of following format: <i>function eventListener(&lt;eventData&gt;)</i>
         *
         * @param eventListener event must be of the format <i>function eventListener(&lt;eventData&gt;)</i>
         */
        function addOnEvent(eventFunc) {
            AjaxImpl_1.Implementation.addOnEvent(eventFunc);
        }
        ajax.addOnEvent = addOnEvent;
    })(ajax = faces.ajax || (faces.ajax = {}));
    var util;
    (function (util) {
        /**
         * varargs function which executes a chain of code (functions or any other code)
         *
         * if any of the code returns false, the execution
         * is terminated prematurely skipping the rest of the code!
         *
         * @param {DomNode} source, the callee object
         * @param {Event} event, the event object of the callee event triggering this function
         * @param funcs ... arbitrary array of functions or strings
         * @returns true if the chain has succeeded false otherwise
         */
        function chain(source, event) {
            var funcs = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                funcs[_i - 2] = arguments[_i];
            }
            return AjaxImpl_1.Implementation.chain.apply(AjaxImpl_1.Implementation, __spreadArray([source, event], funcs, false));
        }
        util.chain = chain;
    })(util = faces.util || (faces.util = {}));
    var push;
    (function (push) {
        /**
         * @param socketClientId the sockets client identifier
         * @param url the uri to reach the socket
         * @param channel the channel name/id
         * @param onopen The function to be invoked when the web socket is opened.
         * @param onmessage The function to be invoked when a message is received.
         * @param onerror The function to be invoked when an error occurs.
         * @param onclose The function to be invoked when the web socket is closed.
         * @param behaviors functions which are invoked whenever a message is received
         * @param autoConnect Whether or not to automatically open the socket. Defaults to <code>false</code>.
         */
        function init(socketClientId, url, channel, onopen, onmessage, onerror, onclose, behaviors, autoConnect) {
            PushImpl_1.PushImpl.init(socketClientId, url, channel, onopen, onmessage, onerror, onclose, behaviors, autoConnect);
        }
        push.init = init;
        /**
         * Open the web socket on the given channel.
         * @param  channel The name of the web socket channel.
         * @throws  Error is thrown, if the channel is unknown.
         */
        function open(socketClientId) {
            PushImpl_1.PushImpl.open(socketClientId);
        }
        push.open = open;
        /**
         * Close the web socket on the given channel.
         * @param  channel The name of the web socket channel.
         * @throws  Error is thrown, if the channel is unknown.
         */
        function close(socketClientId) {
            PushImpl_1.PushImpl.close(socketClientId);
        }
        push.close = close;
    })(push = faces.push || (faces.push = {}));
})(faces = exports.faces || (exports.faces = {}));
var myfaces;
(function (myfaces) {
    /**
     * AB function similar to mojarra and Primefaces
     * not part of the spec but a convenience accessor method
     * Code provided by Thomas Andraschko
     *
     * @param source the event source
     * @param event the event
     * @param eventName event name for java.jakarta.faces.behavior.evemnt
     * @param execute execute list as passed down in faces.ajax.request
     * @param render
     * @param options
     */
    function ab(source, event, eventName, execute, render, options) {
        var _a;
        if (options === void 0) { options = {}; }
        if (eventName) {
            options[(0, Const_1.$nsp)(Const_1.P_BEHAVIOR_EVENT)] = eventName;
        }
        if (execute) {
            options[Const_1.CTX_PARAM_EXECUTE] = execute;
        }
        if (render) {
            options[Const_1.CTX_PARAM_RENDER] = render;
        }
        ((_a = window === null || window === void 0 ? void 0 : window.faces) !== null && _a !== void 0 ? _a : window.jsf).ajax.request(source, event, options);
    }
    myfaces.ab = ab;
    /**
     * legacy oam functions
     */
    myfaces.oam = OamSubmit_1.oam;
})(myfaces = exports.myfaces || (exports.myfaces = {}));


/***/ }),

/***/ "./src/main/typescript/impl/AjaxImpl.ts":
/*!**********************************************!*\
  !*** ./src/main/typescript/impl/AjaxImpl.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Implementation = void 0;
var Response_1 = __webpack_require__(/*! ./xhrCore/Response */ "./src/main/typescript/impl/xhrCore/Response.ts");
var XhrRequest_1 = __webpack_require__(/*! ./xhrCore/XhrRequest */ "./src/main/typescript/impl/xhrCore/XhrRequest.ts");
var AsyncQueue_1 = __webpack_require__(/*! ./util/AsyncQueue */ "./src/main/typescript/impl/util/AsyncQueue.ts");
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
var Assertions_1 = __webpack_require__(/*! ./util/Assertions */ "./src/main/typescript/impl/util/Assertions.ts");
var XhrFormData_1 = __webpack_require__(/*! ./xhrCore/XhrFormData */ "./src/main/typescript/impl/xhrCore/XhrFormData.ts");
var ExtDomQuery_1 = __webpack_require__(/*! ./util/ExtDomQuery */ "./src/main/typescript/impl/util/ExtDomQuery.ts");
var ErrorData_1 = __webpack_require__(/*! ./xhrCore/ErrorData */ "./src/main/typescript/impl/xhrCore/ErrorData.ts");
var Lang_1 = __webpack_require__(/*! ./util/Lang */ "./src/main/typescript/impl/util/Lang.ts");
var Const_1 = __webpack_require__(/*! ./core/Const */ "./src/main/typescript/impl/core/Const.ts");
var RequestDataResolver_1 = __webpack_require__(/*! ./xhrCore/RequestDataResolver */ "./src/main/typescript/impl/xhrCore/RequestDataResolver.ts");
/*
 * allowed project stages
 */
var ProjectStages;
(function (ProjectStages) {
    ProjectStages["Production"] = "Production";
    ProjectStages["Development"] = "Development";
    ProjectStages["SystemTest"] = "SystemTest";
    ProjectStages["UnitTest"] = "UnitTest";
})(ProjectStages || (ProjectStages = {}));
/*
 *   Block-filter for the pass-through filtering; the attributes given here
 *   will not be transmitted from the options into the pass-through
 */
var BlockFilter;
(function (BlockFilter) {
    BlockFilter["onerror"] = "onerror";
    BlockFilter["onevent"] = "onevent";
    BlockFilter["render"] = "render";
    BlockFilter["execute"] = "execute";
    BlockFilter["myfaces"] = "myfaces";
    BlockFilter["delay"] = "delay";
    BlockFilter["timeout"] = "timeout";
    BlockFilter["resetValues"] = "resetValues";
    BlockFilter["windowId"] = "windowId";
    BlockFilter["params"] = "params";
})(BlockFilter || (BlockFilter = {}));
/**
 * Core Implementation
 * to distinct between api and impl
 *
 * The original idea was to make the implementation pluggable
 * but this is pointless, you always can overwrite the thin api layer
 * however a dedicated api makes sense for readability reasons
 */
var Implementation;
(function (Implementation) {
    /*
     Small internal explanation, this code is optimized for readability
     and cuts off a ton of old legacy code.
     Aka older browsers are not supported anymore.
     We use a self written helper library to keep the number of exernal
     code dependencies down.
     The library is called mona-dish and started as a small sideproject of mine
     it provides following
    
     a) Monad like structures for querying because this keeps the code denser and adds abstractions
     that always was the strong point of jquery and it still is better in this regard than what ecmascript provides
    
     b) Streams and lazystreams like java has, a pull like construct, ecmascript does not have anything like Lazystreams.
     Another option would have been rxjs but that would have introduced a code dependency and probably more code. We might
     move to RXJS if the need arises however. But for now I would rather stick with my small self grown library which works
     quite well and where I can patch quickly (I have used it in several industrial projects, so it works well
     and is heavily fortified by unit tests (140 testcases as time of writing this))
    
     c) A neutral json like configuration which allows assignments of arbitrary values with reduce code which then can be
     transformed into different data representations
    
     examples:
     internalCtx.assign(MYPARAM, CTX_PARAM_SRC_FRM_ID).value = form.id.value;
     passes a value into context.MYPARAM.CTX_PARAM_SRC_FRM_ID
    
     basically an abbreviation for
    
     internalCtxt[MYPARAM] = internalCtxt?.[MYPARAM] ?  internalCtxt[MYPARAM] : {};
     internalCtxt[MYPARAM][CTX_PARAM_SRC_FRM_ID] = internalCtxt?.[MYPARAM][CTX_PARAM_SRC_FRM_ID] ?  internalCtxt[MYPARAM][CTX_PARAM_SRC_FRM_ID] : {};
     internalCtxt[MYPARAM][CTX_PARAM_SRC_FRM_ID] = form.id.value;
    
    
     internalCtx.assign(condition, MYPARAM, CTX_PARAM_SRC_FRM_ID).value = form.id.value;
     passes a value into context.MYPARAM.CTX_PARAM_SRC_FRM_ID if condition === true otherwise it is ignored
    
     abbreviates:
     if(condition) {
        internalCtxt[MYPARAM] = internalCtxt?.[MYPARAM] ?  internalCtxt[MYPARAM] : {};
        internalCtxt[MYPARAM][CTX_PARAM_SRC_FRM_ID] = internalCtxt?.[MYPARAM][CTX_PARAM_SRC_FRM_ID] ?  internalCtxt[MYPARAM][CTX_PARAM_SRC_FRM_ID] : {};
        internalCtxt[MYPARAM][CTX_PARAM_SRC_FRM_ID] = form.id.value;
     }
    
    
     d) Optional constructs, while under heavy debate we only use them lightly where the api requires it from mona-dish
    
     Note the inclusion of this library uses a reduced build which only includes the part of it, which we really use
    
     */
    var trim = mona_dish_1.Lang.trim;
    var getMessage = Lang_1.ExtLang.getMessage;
    var getGlobalConfig = Lang_1.ExtLang.getGlobalConfig;
    var assert = Assertions_1.Assertions.assert;
    var projectStage = null;
    var separator = null;
    var eventQueue = [];
    var errorQueue = [];
    Implementation.requestQueue = null;
    /*error reporting threshold*/
    var threshold = "ERROR";
    /**
     * fetches the separator char from the given script tags
     *
     * @return {string} the separator char for the given script tags
     */
    function getSeparatorChar() {
        var _a, _b, _c;
        return (_c = (_b = (_a = resolveGlobalConfig()) === null || _a === void 0 ? void 0 : _a.separator) !== null && _b !== void 0 ? _b : this === null || this === void 0 ? void 0 : this.separator) !== null && _c !== void 0 ? _c : (separator = ExtDomQuery_1.ExtDomQuery.searchJsfJsFor(/separator=([^&;]*)/).orElse(":").value);
    }
    Implementation.getSeparatorChar = getSeparatorChar;
    /**
     * this is for testing purposes only, since AjaxImpl is a module
     * we need to reset for every unit test its internal states
     */
    function reset() {
        projectStage = null;
        separator = null;
        eventQueue = [];
        errorQueue = [];
        Implementation.requestQueue = null;
    }
    Implementation.reset = reset;
    /**
     * @return the project stage also emitted by the server:
     * it cannot be cached and must be delivered over the server
     * The value for it comes from the requestInternal parameter of the faces.js script called "stage".
     */
    function getProjectStage() {
        var _a, _b, _c;
        return (_c = (_b = (_a = resolveGlobalConfig()) === null || _a === void 0 ? void 0 : _a.projectStage) !== null && _b !== void 0 ? _b : this === null || this === void 0 ? void 0 : this.projectStage) !== null && _c !== void 0 ? _c : (projectStage = resolveProjectStateFromURL());
    }
    Implementation.getProjectStage = getProjectStage;
    /**
     * resolves the project stage as url parameter
     * @return the project stage or null
     */
    function resolveProjectStateFromURL() {
        /* run through all script tags and try to find the one that includes faces.js */
        var foundStage = ExtDomQuery_1.ExtDomQuery.searchJsfJsFor(/stage=([^&;]*)/).value;
        return (foundStage in ProjectStages) ? foundStage : null;
    }
    Implementation.resolveProjectStateFromURL = resolveProjectStateFromURL;
    /**
     * implementation of the faces.util.chain functionality
     *
     * @param source
     * @param event
     * @param funcs
     */
    function chain(source, event) {
        // we can use our lazy stream each functionality to run our chain here..
        // by passing a boolean as return value into the onElem call
        // we can stop early at the first false, just like the spec requests
        var funcs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            funcs[_i - 2] = arguments[_i];
        }
        return mona_dish_1.LazyStream.of.apply(mona_dish_1.LazyStream, funcs).map(function (func) { return resolveAndExecute(source, event, func); })
            // we use the return false == stop as an early stop, onElem stops at the first false
            .onElem(function (opResult) { return opResult; })
            //last ensures we run until the first false is returned
            .last().value;
    }
    Implementation.chain = chain;
    /**
     * this function has to send the ajax requests
     *
     * following request conditions must be met:
     * <ul>
     *  <li> the request must be sent asynchronously! </li>
     *  <li> the request must be a POST!!! request </li>
     *  <li> the request url must be the form action attribute </li>
     *  <li> all requests must be queued with a client side request queue to ensure the request ordering!</li>
     * </ul>
     *
     * @param el any dom element no matter being it html or jsf, from which the event is emitted
     * @param event any javascript event supported by that object
     * @param opts  map of options being pushed into the ajax cycle
     *
     * a) transformArguments out of the function
     * b) passThrough handling with a map copy with a filter map block map
     */
    function request(el, event, opts) {
        var _a, _b, _c;
        var _d = (0, RequestDataResolver_1.resolveDefaults)(event, opts, el), resolvedEvent = _d.resolvedEvent, options = _d.options, elem = _d.elem, elementId = _d.elementId, requestCtx = _d.requestCtx, internalCtx = _d.internalCtx, windowId = _d.windowId, isResetValues = _d.isResetValues;
        Assertions_1.Assertions.assertRequestIntegrity(options, elem);
        /**
         * fetch the parent form
         *
         * note we also add an override possibility here
         * so that people can use dummy forms and work
         * with detached objects
         */
        var form = (0, RequestDataResolver_1.resolveForm)(requestCtx, elem, resolvedEvent);
        var formId = form.id.value;
        var delay = (0, RequestDataResolver_1.resolveDelay)(options);
        var timeout = (0, RequestDataResolver_1.resolveTimeout)(options);
        requestCtx.assignIf(!!windowId, Const_1.P_WINDOW_ID).value = windowId;
        // old non spec behavior will be removed after it is clear whether the removal breaks any code
        requestCtx.assign(Const_1.CTX_PARAM_PASS_THR).value = filterPassThroughValues(options.value);
        // spec conform behavior, all passthrough params must be under "passthrough
        var params = remapArrayToAssocArr(options.getIf(Const_1.CTX_PARAM_SPEC_PARAMS).orElse({}).value);
        requestCtx.getIf(Const_1.CTX_PARAM_PASS_THR).shallowMerge(new mona_dish_1.Config(params), true);
        requestCtx.assignIf(!!resolvedEvent, Const_1.CTX_PARAM_PASS_THR, Const_1.P_EVT).value = resolvedEvent === null || resolvedEvent === void 0 ? void 0 : resolvedEvent.type;
        /**
         * ajax pass through context with the source
         * onresolved Event and onerror Event
         */
        requestCtx.assign(Const_1.SOURCE).value = elementId;
        /**
         * on resolvedEvent and onError...
         * those values will be traversed later on
         * also into the response context
         */
        requestCtx.assign(Const_1.ON_EVENT).value = (_a = options.value) === null || _a === void 0 ? void 0 : _a.onevent;
        requestCtx.assign(Const_1.ON_ERROR).value = (_b = options.value) === null || _b === void 0 ? void 0 : _b.onerror;
        /**
         * lets drag the myfaces config params also in
         */
        requestCtx.assign(Const_1.MYFACES).value = (_c = options.value) === null || _c === void 0 ? void 0 : _c.myfaces;
        /**
         * binding contract the jakarta.faces.source must be set
         */
        requestCtx.assign(Const_1.CTX_PARAM_PASS_THR, Const_1.P_PARTIAL_SOURCE).value = elementId;
        /**
         * jakarta.faces.partial.ajax must be set to true
         */
        requestCtx.assign(Const_1.CTX_PARAM_PASS_THR, Const_1.P_AJAX).value = true;
        /**
         * if resetValues is set to true
         * then we have to set jakarta.faces.resetValues as well
         * as pass through parameter
         * the value has to be explicitly true, according to
         * the specs jsdoc
         */
        requestCtx.assignIf(isResetValues, Const_1.CTX_PARAM_PASS_THR, Const_1.P_RESET_VALUES).value = true;
        // additional meta information to speed things up, note internal non jsf
        // pass through options are stored under _mfInternal in the context
        internalCtx.assign(Const_1.CTX_PARAM_SRC_FRM_ID).value = formId;
        // mojarra compatibility, mojarra is sending the form id as well
        // this is not documented behavior but can be determined by running
        // mojarra under blackbox conditions.
        // I assume it does the same as our formId_submit=1 so leaving it out
        // won't hurt but for the sake of compatibility we are going to add it
        requestCtx.assign(Const_1.CTX_PARAM_PASS_THR, formId).value = formId;
        internalCtx.assign(Const_1.CTX_PARAM_SRC_CTL_ID).value = elementId;
        internalCtx.assign(Const_1.CTX_PARAM_TR_TYPE).value = Const_1.REQ_TYPE_POST;
        assignClientWindowId(form, requestCtx);
        assignExecute(options, requestCtx, form, elementId);
        assignRender(options, requestCtx, form, elementId);
        //now we enqueue the request as asynchronous runnable into our request
        //queue and let the queue take over the rest
        Implementation.queueHandler.addRequestToQueue(elem, form, requestCtx, internalCtx, delay, timeout);
    }
    Implementation.request = request;
    /**
     * Spec. 13.3.3
     * Examining the response markup and updating the DOM tree
     * @param {XMLHttpRequest} request - the ajax request
     * @param {Object} context - the ajax context
     */
    function response(request, context) {
        Response_1.Response.processResponse(request, context);
    }
    Implementation.response = response;
    /**
     * adds an error handler to the error queue
     *
     * @param errorListener the error listener handler
     */
    function addOnError(errorListener) {
        errorQueue.push(errorListener);
    }
    Implementation.addOnError = addOnError;
    /**
     * adds an event handler to the event queue
     *
     * @param eventListener the event listener handler
     */
    function addOnEvent(eventListener) {
        eventQueue.push(eventListener);
    }
    Implementation.addOnEvent = addOnEvent;
    // noinspection JSUnusedLocalSymbols
    /**
     * sends an event to the event handlers
     *
     * @param data the event data object hosting the event data according to the spec @see EventData for what is reachable
     * @param localHandler an optional event handler, which is processed before the event handler chain
     */
    function sendEvent(data, localHandler) {
        if (localHandler === void 0) { localHandler = function (data) {
        }; }
        /*now we serve the queue as well*/
        localHandler(data);
        eventQueue.forEach(function (fn) { return fn(data); });
    }
    Implementation.sendEvent = sendEvent;
    /**
     * error handler behavior called internally
     * and only into the impl it takes care of the
     * internal message transformation to a myfaces internal error
     * and then uses the standard send error mechanisms
     * also a double error logging prevention is done as well
     *
     * @param request the request currently being processed
     * @param context the context affected by this error
     * @param exception the exception being thrown
     * @param clearRequestQueue if set to true, clears the request queue of all pending requests
     */
    function stdErrorHandler(request, context, exception, clearRequestQueue) {
        if (clearRequestQueue === void 0) { clearRequestQueue = false; }
        //newer browsers do not allow to hold additional values on native objects like exceptions
        //we hence capsule it into the request, which is gced automatically
        //on ie as well, since the stdErrorHandler usually is called between requests
        //this is a valid approach
        try {
            if (threshold == "ERROR") {
                var errorData = ErrorData_1.ErrorData.fromClient(exception);
                sendError(errorData);
            }
        }
        finally {
            if (clearRequestQueue) {
                Implementation.requestQueue.cleanup();
            }
        }
    }
    Implementation.stdErrorHandler = stdErrorHandler;
    // noinspection JSUnusedLocalSymbols
    /**
     * implementation triggering the error chain
     *
     *
     *
     *  handles the errors, in case of an onError exists within the context the onError is called as local error handler
     *  the registered error handlers in the queue received an error message to be dealt with
     *  and if the projectStage is at development an alert box is displayed
     *
     *  note: we have additional functionality here, via the global config myfaces.config.defaultErrorOutput a function can be provided
     *  which changes the default output behavior from alert to something else
     *
     * @param errorData the error data to be displayed
     * @param localHandler an optional local error handler which has to be processed before the error handler queue
     */
    function sendError(errorData, localHandler) {
        if (localHandler === void 0) { localHandler = function (data) {
        }; }
        localHandler(errorData);
        errorQueue.forEach(function (errorCallback) {
            errorCallback(errorData);
        });
        var displayError = getGlobalConfig("defaultErrorOutput", (console ? console.error : alert));
        displayError(errorData);
    }
    Implementation.sendError = sendError;
    /**
     * @node optional element or id defining a rootnode where an element with the id "jakarta.faces.windowId" is hosted
     * @return the client window id of the current window, if one is given if none is found, null is returned
     */
    function getClientWindow(node) {
        var ALTERED = "___mf_id_altered__";
        var INIT = "___init____";
        /*
         * the search root for the dom element search
         */
        var searchRoot = new mona_dish_1.DQ(node || document.body).querySelectorAll("form input [name='".concat(Const_1.P_CLIENT_WINDOW, "']"));
        /*
         * lazy helper to fetch the window id from the window url
         */
        var fetchWindowIdFromUrl = function () { return ExtDomQuery_1.ExtDomQuery.searchJsfJsFor(/jfwid=([^&;]*)/).orElse(null).value; };
        /*
         * functional double check based on stream reduction
         * the values should be identical or on INIT value which is a premise to
         * skip the first check
         *
         * @param value1
         * @param value2
         */
        var differenceCheck = function (value1, value2) {
            if (value1 == INIT) {
                return value2;
            }
            else if (value1 == ALTERED || value1 != value2) {
                return ALTERED;
            }
            return value2;
        };
        /*
         * helper for cleaner code, maps the value from an item
         *
         * @param item
         */
        var getValue = function (item) { return item.attr("value").value; };
        /*
         * fetch the window id from the forms
         * window ids must be present in all forms
         * or non-existent. If they exist all of them must be the same
         */
        var formWindowId = searchRoot.stream.map(getValue).reduce(differenceCheck, INIT);
        //if the resulting window id is set on altered then we have an unresolvable problem
        assert(ALTERED != formWindowId.value, "Multiple different windowIds found in document");
        /*
         * return the window id or null
         */
        return formWindowId.value != INIT ? formWindowId.value : fetchWindowIdFromUrl();
    }
    Implementation.getClientWindow = getClientWindow;
    /**
     * collect and encode data for a given form element (must be of type form)
     * find the jakarta.faces.ViewState element and encode its value as well!
     * @return a concatenated string of the encoded values!
     *
     * @throws Error in case of the given element not being of type form!
     * https://issues.apache.org/jira/browse/MYFACES-2110
     */
    function getViewState(form) {
        /**
         *  type-check assert!, we opt for strong typing here
         *  because it makes it easier to detect bugs
         */
        var element = mona_dish_1.DQ.byId(form, true);
        if (!element.isTag(Const_1.TAG_FORM)) {
            throw new Error(getMessage("ERR_VIEWSTATE"));
        }
        var formData = new XhrFormData_1.XhrFormData(element);
        return formData.toString();
    }
    Implementation.getViewState = getViewState;
    /**
     * this at the first sight looks like a weird construct, but we need to do it this way
     * for testing, we cannot proxy addRequestToQueue from the testing frameworks directly,
     * but we need to keep it under unit tests.
     */
    Implementation.queueHandler = {
        /**
         * public to make it accessible for tests
         *
         * adds a new request to our queue for further processing
         */
        addRequestToQueue: function (elem, form, reqCtx, respPassThr, delay, timeout) {
            if (delay === void 0) { delay = 0; }
            if (timeout === void 0) { timeout = 0; }
            Implementation.requestQueue = Implementation.requestQueue !== null && Implementation.requestQueue !== void 0 ? Implementation.requestQueue : new AsyncQueue_1.AsynchronousQueue();
            Implementation.requestQueue.enqueue(new XhrRequest_1.XhrRequest(elem, form, reqCtx, respPassThr, [], timeout), delay);
        }
    };
    //----------------------------------------------- Methods ---------------------------------------------------------------------
    /**
     * the idea is to replace some placeholder parameters with their respective values
     * placeholder params like  @all, @none, @form, @this need to be replaced by
     * the values defined by the specification
     *
     * This function does it for the render parameters
     *
     * @param requestOptions the source options coming in as options object from faces.ajax.request (options parameter)
     * @param targetContext the receiving target context
     * @param issuingForm the issuing form
     * @param sourceElementId the executing element triggering the faces.ajax.request (id of it)
     */
    function assignRender(requestOptions, targetContext, issuingForm, sourceElementId) {
        if (requestOptions.getIf(Const_1.CTX_PARAM_RENDER).isPresent()) {
            remapDefaultConstants(targetContext.getIf(Const_1.CTX_PARAM_PASS_THR).get({}), Const_1.P_RENDER, requestOptions.getIf(Const_1.CTX_PARAM_RENDER).value, issuingForm, sourceElementId);
        }
    }
    /**
     * the idea is to replace some placeholder parameters with their respective values
     * placeholder params like  @all, @none, @form, @this need to be replaced by
     * the values defined by the specification
     *
     * This function does it for the execute parameters
     *
     * @param requestOptions the source options coming in as options object from faces.ajax.request (options parameter)
     * @param targetContext the receiving target context
     * @param issuingForm the issuing form
     * @param sourceElementId the executing element triggering the faces.ajax.request (id of it)
     */
    function assignExecute(requestOptions, targetContext, issuingForm, sourceElementId) {
        if (requestOptions.getIf(Const_1.CTX_PARAM_EXECUTE).isPresent()) {
            /*the options must be a blank delimited list of strings*/
            /*compliance with Mojarra which automatically adds @this to an execute
             * the spec rev 2.0a however states, if none is issued nothing at all should be sent down
             */
            requestOptions.assign(Const_1.CTX_PARAM_EXECUTE).value = [requestOptions.getIf(Const_1.CTX_PARAM_EXECUTE).value, Const_1.IDENT_THIS].join(" ");
            remapDefaultConstants(targetContext.getIf(Const_1.CTX_PARAM_PASS_THR).get({}), Const_1.P_EXECUTE, requestOptions.getIf(Const_1.CTX_PARAM_EXECUTE).value, issuingForm, sourceElementId);
        }
        else {
            targetContext.assign(Const_1.CTX_PARAM_PASS_THR, Const_1.P_EXECUTE).value = sourceElementId;
        }
    }
    /**
     * apply the browser tab where the request was originating from
     *
     * @param form the form hosting the client window id
     * @param targetContext the target context receiving the value
     */
    function assignClientWindowId(form, targetContext) {
        var _a;
        var clientWindow = ((_a = window === null || window === void 0 ? void 0 : window.faces) !== null && _a !== void 0 ? _a : window === null || window === void 0 ? void 0 : window.jsf).getClientWindow(form.getAsElem(0).value);
        if (clientWindow) {
            targetContext.assign(Const_1.CTX_PARAM_PASS_THR, Const_1.P_CLIENT_WINDOW).value = clientWindow;
        }
    }
    /**
     * transforms the user values to the expected one
     * with the proper none all form and this handling
     * (note we also could use a simple string replace but then
     * we would have had double entries under some circumstances)
     *
     * there are several standardized constants which need a special treatment
     * like @all, @none, @form, @this
     *
     * @param targetConfig the target configuration receiving the final values
     * @param targetKey the target key
     * @param userValues the passed user values (aka input string which needs to be transformed)
     * @param issuingForm the form where the issuing element originates
     * @param issuingElementId the issuing element
     */
    function remapDefaultConstants(targetConfig, targetKey, userValues, issuingForm, issuingElementId) {
        //a cleaner implementation of the transform list method
        var iterValues = (userValues) ? trim(userValues).split(/\s+/gi) : [];
        var ret = [];
        var processed = {};
        // in this case we do not use lazy stream because it wont bring any code reduction
        // or speedup
        for (var cnt = 0; cnt < iterValues.length; cnt++) {
            //avoid doubles
            if (iterValues[cnt] in processed) {
                continue;
            }
            switch (iterValues[cnt]) {
                //@none no values should be sent
                case Const_1.IDENT_NONE:
                    return targetConfig.delete(targetKey);
                //@all is a pass through case according to the spec
                case Const_1.IDENT_ALL:
                    targetConfig.assign(targetKey).value = Const_1.IDENT_ALL;
                    return targetConfig;
                //@form pushes the issuing form id into our list
                case Const_1.IDENT_FORM:
                    ret.push(issuingForm.id.value);
                    processed[issuingForm.id.value] = true;
                    break;
                //@this is replaced with the current issuing element id
                case Const_1.IDENT_THIS:
                    if (!(issuingElementId in processed)) {
                        ret.push(issuingElementId);
                        processed[issuingElementId] = true;
                    }
                    break;
                default:
                    ret.push(iterValues[cnt]);
                    processed[iterValues[cnt]] = true;
            }
        }
        //We now add the target as joined list
        targetConfig.assign(targetKey).value = ret.join(" ");
        return targetConfig;
    }
    /**
     * Filter the options given with a blacklist, so that only
     * the values required for pass-through are processed in the ajax request
     *
     * Note this is a bug carried over from the old implementation
     * the spec conform behavior is to use params for passthrough values
     * this will be removed soon, after it is cleared up wheter removing
     * it breaks any legacy code
     *
     * @param {Context} mappedOpts the options to be filtered
     * @deprecated
     */
    function filterPassThroughValues(mappedOpts) {
        //we now can use the full code reduction given by our stream api
        //to filter
        return mona_dish_1.Stream.ofAssoc(mappedOpts)
            .filter(function (item) { return !(item[0] in BlockFilter); })
            .collect(new mona_dish_1.AssocArrayCollector());
    }
    function remapArrayToAssocArr(arrayedParams) {
        if (Array.isArray(arrayedParams)) {
            return mona_dish_1.Stream.of.apply(mona_dish_1.Stream, arrayedParams).collect(new mona_dish_1.AssocArrayCollector());
        }
        return arrayedParams;
    }
    function resolveGlobalConfig() {
        var _a, _b;
        return (_b = (_a = window === null || window === void 0 ? void 0 : window[Const_1.MYFACES]) === null || _a === void 0 ? void 0 : _a.config) !== null && _b !== void 0 ? _b : {};
    }
    /**
     * Private helper to execute a function or code fragment
     * @param source the source of the caller passed into the function as this
     * @param event an event which needs to be passed down into the function
     * @param func either a function or code fragment
     * @return a boolean value, if the passed function returns false, then the
     * caller is basically notified that the execution can now stop (JSF requirement for chain)
     * @private
     */
    function resolveAndExecute(source, event, func) {
        if ("string" != typeof func) {
            //function is passed down as chain parameter, can be executed as is
            return func.call(source, event) !== false;
        }
        else {
            //either a function or a string can be passed in case of a string we have to wrap it into another function
            //it is not a plain executable code but a definition
            var sourceCode = trim(func);
            if (sourceCode.indexOf("function ") == 0) {
                sourceCode = "return ".concat(sourceCode, " (event)");
            }
            return new Function("event", sourceCode).call(source, event) !== false;
        }
    }
})(Implementation = exports.Implementation || (exports.Implementation = {}));


/***/ }),

/***/ "./src/main/typescript/impl/PushImpl.ts":
/*!**********************************************!*\
  !*** ./src/main/typescript/impl/PushImpl.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PushImpl = void 0;
/**
 * Typescript port of the faces\.push part in the myfaces implementation
 */
var Const_1 = __webpack_require__(/*! ./core/Const */ "./src/main/typescript/impl/core/Const.ts");
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
/**
 * Implementation class for the push functionality
 */
var PushImpl;
(function (PushImpl) {
    var URL_PROTOCOL = mona_dish_1.DQ.global().location.protocol.replace("http", "ws") + "//";
    // we expose the member variables for testing purposes
    // they are not directly touched outside of tests
    /* socket map by token */
    PushImpl.sockets = {};
    /* component attributes by clientId */
    PushImpl.components = {};
    /* client ids by token (share websocket connection) */
    PushImpl.clientIdsByTokens = {};
    // needed for testing
    function reset() {
        PushImpl.sockets = {};
        PushImpl.components = {};
        PushImpl.clientIdsByTokens = {};
    }
    PushImpl.reset = reset;
    /*
     * Api implementations, exposed functions
     */
    /**
     * @param socketClientId the sockets client identifier
     * @param url the uri to reach the socket
     * @param channel the channel name/id
     * @param onopen The function to be invoked when the web socket is opened.
     * @param onmessage The function to be invoked when a message is received.
     * @param onerror The function to be invoked when an error occurs.
     * @param onclose The function to be invoked when the web socket is closed.
     * @param behaviors functions which are invoked whenever a message is received
     * @param autoConnect Whether or not to automatically open the socket. Defaults to <code>false</code>.
     */
    function init(socketClientId, url, channel, onopen, onmessage, onerror, onclose, behaviors, autoConnect) {
        var _a, _b, _c;
        onclose = resolveFunction(onclose);
        if (!mona_dish_1.DQ.global().WebSocket) { // IE6-9.
            onclose(-1, channel);
            return;
        }
        var channelToken = url.substr(url.indexOf('?') + 1);
        if (!PushImpl.components[socketClientId]) {
            PushImpl.components[socketClientId] = {
                'channelToken': channelToken,
                'onopen': resolveFunction(onopen),
                'onmessage': resolveFunction(onmessage),
                'onerror': resolveFunction(onerror),
                'onclose': onclose,
                'behaviors': behaviors,
                'autoconnect': autoConnect
            };
            if (!PushImpl.clientIdsByTokens[channelToken]) {
                PushImpl.clientIdsByTokens[channelToken] = [];
            }
            PushImpl.clientIdsByTokens[channelToken].push(socketClientId);
            if (!PushImpl.sockets[channelToken]) {
                PushImpl.sockets[channelToken] = new Socket(channelToken, getBaseURL(url), channel);
            }
        }
        if (autoConnect) {
            ((_b = (_a = mona_dish_1.DQ.global()) === null || _a === void 0 ? void 0 : _a.faces) !== null && _b !== void 0 ? _b : (_c = mona_dish_1.DQ.global()) === null || _c === void 0 ? void 0 : _c.jsf).push.open(socketClientId);
        }
    }
    PushImpl.init = init;
    function open(socketClientId) {
        var _a;
        getSocket((_a = PushImpl.components[socketClientId]) === null || _a === void 0 ? void 0 : _a.channelToken).open();
    }
    PushImpl.open = open;
    function close(socketClientId) {
        getSocket(PushImpl.components[socketClientId].channelToken).close();
    }
    PushImpl.close = close;
    // Private helper classes
    // Private classes functions ----------------------------------------------------------------------------------
    /**
     * Creates a reconnecting web socket. When the web socket successfully connects on first attempt, then it will
     * automatically reconnect on timeout with cumulative intervals of 500ms with a maximum of 25 attempts (~3 minutes).
     * The <code>onclose</code> function will be called with the error code of the last attempt.
     * @constructor
     * @param {string} channelToken the channel token associated with this websocket connection
     * @param {string} url The URL of the web socket
     * @param {string} channel The name of the web socket channel.
     */
    var Socket = /** @class */ (function () {
        function Socket(channelToken, url, channel) {
            this.channelToken = channelToken;
            this.url = url;
            this.channel = channel;
            this.reconnectAttempts = 0;
        }
        Socket.prototype.open = function () {
            if (this.socket && this.socket.readyState == 1) {
                return;
            }
            this.socket = new WebSocket(this.url);
            this.bindCallbacks();
        };
        // noinspection JSUnusedLocalSymbols
        Socket.prototype.onopen = function (event) {
            var _a, _b;
            if (!this.reconnectAttempts) {
                var clientIds = PushImpl.clientIdsByTokens[this.channelToken];
                for (var i = clientIds.length - 1; i >= 0; i--) {
                    var socketClientId = clientIds[i];
                    (_b = (_a = PushImpl.components[socketClientId]) === null || _a === void 0 ? void 0 : _a['onopen']) === null || _b === void 0 ? void 0 : _b.call(_a, this.channel);
                }
            }
            this.reconnectAttempts = 0;
        };
        Socket.prototype.onerror = function (event) {
            var _a, _b;
            var message = JSON.parse(event.data);
            //TODO replace this with a more readable Stream code
            for (var i = PushImpl.clientIdsByTokens[this.channelToken].length - 1; i >= 0; i--) {
                var socketClientId = PushImpl.clientIdsByTokens[this.channelToken][i];
                if (document.getElementById(socketClientId)) {
                    try {
                        (_b = (_a = PushImpl.components[socketClientId]) === null || _a === void 0 ? void 0 : _a['onerror']) === null || _b === void 0 ? void 0 : _b.call(_a, message, this.channel, event);
                    }
                    catch (e) {
                        //Ignore
                    }
                }
                else {
                    PushImpl.clientIdsByTokens[this.channelToken].splice(i, 1);
                }
            }
            if (PushImpl.clientIdsByTokens[this.channelToken].length == 0) {
                // tag disappeared
                this.close();
            }
        };
        Socket.prototype.onmmessage = function (event) {
            var _a, _b, _c;
            var message = JSON.parse(event.data);
            for (var i = PushImpl.clientIdsByTokens[this.channelToken].length - 1; i >= 0; i--) {
                var socketClientId = PushImpl.clientIdsByTokens[this.channelToken][i];
                if (document.getElementById(socketClientId)) {
                    try {
                        (_b = (_a = PushImpl.components[socketClientId]) === null || _a === void 0 ? void 0 : _a['onmessage']) === null || _b === void 0 ? void 0 : _b.call(_a, message, this.channel, event);
                    }
                    catch (e) {
                        //Ignore
                    }
                    var behaviors = (_c = PushImpl.components === null || PushImpl.components === void 0 ? void 0 : PushImpl.components[socketClientId]) === null || _c === void 0 ? void 0 : _c['behaviors'];
                    var functions = behaviors === null || behaviors === void 0 ? void 0 : behaviors[message];
                    if (functions && functions.length) {
                        for (var j = 0; j < functions.length; j++) {
                            try {
                                functions[j](null);
                            }
                            catch (e) {
                                //Ignore
                            }
                        }
                    }
                }
                else {
                    PushImpl.clientIdsByTokens[this.channelToken].splice(i, 1);
                }
            }
            if (PushImpl.clientIdsByTokens[this.channelToken].length == 0) {
                // tag disappeared
                this.close();
            }
        };
        Socket.prototype.onclose = function (event) {
            var _a, _b;
            if (!this.socket
                || (event.code == 1000 && event.reason == Const_1.REASON_EXPIRED)
                || (event.code == 1008)
                || (!this.reconnectAttempts)
                || (this.reconnectAttempts >= Const_1.MAX_RECONNECT_ATTEMPTS)) {
                var clientIds = PushImpl.clientIdsByTokens[this.channelToken];
                for (var i = clientIds.length - 1; i >= 0; i--) {
                    var socketClientId = clientIds[i];
                    (_b = (_a = PushImpl.components === null || PushImpl.components === void 0 ? void 0 : PushImpl.components[socketClientId]) === null || _a === void 0 ? void 0 : _a['onclose']) === null || _b === void 0 ? void 0 : _b.call(_a, event === null || event === void 0 ? void 0 : event.code, this === null || this === void 0 ? void 0 : this.channel, event);
                }
            }
            else {
                setTimeout(this.open, Const_1.RECONNECT_INTERVAL * this.reconnectAttempts++);
            }
        };
        ;
        Socket.prototype.close = function () {
            if (this.socket) {
                var s = this.socket;
                this.socket = null;
                s.close();
            }
        };
        /**
         * bind the callbacks to the socket callbacks
         */
        Socket.prototype.bindCallbacks = function () {
            var _this = this;
            this.socket.onopen = function (event) { return _this.onopen(event); };
            this.socket.onmessage = function (event) { return _this.onmmessage(event); };
            this.socket.onclose = function (event) { return _this.onclose(event); };
            this.socket.onerror = function (event) { return _this.onerror(event); };
        };
        return Socket;
    }());
    // Private static functions ---------------------------------------------------------------------------------------
    function getBaseURL(url) {
        if (url.indexOf("://") < 0) {
            var base = mona_dish_1.DQ.global().location.hostname + ":" + mona_dish_1.DQ.global().location.port;
            return URL_PROTOCOL + base + url;
        }
        else {
            return url;
        }
    }
    /**
     * Get socket associated with given channelToken.
     * @param channelToken The name of the web socket channelToken.
     * @return Socket associated with given channelToken.
     * @throws Error, when the channelToken is unknown, you may need to initialize
     *                 it first via <code>init()</code> function.
     */
    function getSocket(channelToken) {
        var socket = PushImpl.sockets[channelToken];
        if (socket) {
            return socket;
        }
        else {
            throw new Error("Unknown channelToken: " + channelToken);
        }
    }
    function resolveFunction(fn) {
        if (fn === void 0) { fn = function () {
        }; }
        return ((typeof fn !== "function") && (fn = mona_dish_1.DQ.global()[fn]), fn);
    }
})(PushImpl = exports.PushImpl || (exports.PushImpl = {}));


/***/ }),

/***/ "./src/main/typescript/impl/core/Const.ts":
/*!************************************************!*\
  !*** ./src/main/typescript/impl/core/Const.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {


/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CTX_PARAM_SPEC_PARAMS = exports.CTX_PARAM_PASS_THR = exports.CTX_PARAM_TR_TYPE = exports.CTX_PARAM_SRC_CTL_ID = exports.CTX_PARAM_SRC_FRM_ID = exports.CTX_PARAM_MF_INTERNAL = exports.TIMEOUT_EVENT = exports.CLIENT_ERROR = exports.SERVER_ERROR = exports.MALFORMEDXML = exports.EMPTY_RESPONSE = exports.HTTPERROR = exports.RESPONSE_XML = exports.RESPONSE_TEXT = exports.ERROR_MESSAGE = exports.ERROR_NAME = exports.STATUS = exports.SOURCE = exports.SUCCESS = exports.COMPLETE = exports.BEGIN = exports.ON_EVENT = exports.ON_ERROR = exports.EVENT = exports.ERROR = exports.WINDOW_ID = exports.CTX_PARAM_RENDER = exports.P_BEHAVIOR_EVENT = exports.P_WINDOW_ID = exports.P_RESET_VALUES = exports.P_CLIENT_WINDOW = exports.P_EVT = exports.P_RENDER = exports.P_EXECUTE = exports.P_AJAX = exports.IDENT_FORM = exports.IDENT_THIS = exports.IDENT_NONE = exports.IDENT_ALL = exports.HTML_VIEWSTATE = exports.EMPTY_MAP = exports.EMPTY_STR = exports.EMPTY_FUNC = exports.P_RESOURCE = exports.P_VIEWBODY = exports.P_VIEWHEAD = exports.P_VIEWROOT = exports.P_VIEWSTATE = exports.PARTIAL_ID = exports.P_PARTIAL_SOURCE = void 0;
exports.MF_NONE = exports.SEL_SCRIPTS_STYLES = exports.MYFACES = exports.DEFERRED_HEAD_INSERTS = exports.UPDATE_ELEMS = exports.UPDATE_FORMS = exports.CMD_REDIRECT = exports.CMD_EXTENSION = exports.CMD_ATTRIBUTES = exports.CMD_ERROR = exports.CMD_EVAL = exports.CMD_INSERT = exports.CMD_DELETE = exports.CMD_UPDATE = exports.CMD_CHANGES = exports.RESP_PARTIAL = exports.ATTR_ID = exports.ATTR_VALUE = exports.ATTR_NAME = exports.ATTR_URL = exports.ERR_NO_PARTIAL_RESPONSE = exports.PHASE_PROCESS_RESPONSE = exports.SEL_RESPONSE_XML = exports.SEL_CLIENT_WINDOW_ELEM = exports.SEL_VIEWSTATE_ELEM = exports.TAG_ATTR = exports.TAG_AFTER = exports.TAG_BEFORE = exports.TAG_BODY = exports.TAG_FORM = exports.TAG_HEAD = exports.STD_ACCEPT = exports.NO_TIMEOUT = exports.MULTIPART = exports.URL_ENCODED = exports.STATE_EVT_COMPLETE = exports.STATE_EVT_TIMEOUT = exports.STATE_EVT_BEGIN = exports.REQ_TYPE_POST = exports.REQ_TYPE_GET = exports.ENCODED_URL = exports.VAL_AJAX = exports.REQ_ACCEPT = exports.HEAD_FACES_REQ = exports.CONTENT_TYPE = exports.STAGE_DEVELOPMENT = exports.CTX_PARAM_EXECUTE = exports.CTX_PARAM_RST = exports.CTX_PARAM_TIMEOUT = exports.CTX_PARAM_DELAY = void 0;
exports.$nsp = exports.UNKNOWN = exports.MAX_RECONNECT_ATTEMPTS = exports.RECONNECT_INTERVAL = exports.APPLIED_CLIENT_WINDOW = exports.APPLIED_VST = exports.REASON_EXPIRED = void 0;
/*
 * [export const] constants
 */
exports.P_PARTIAL_SOURCE = "jakarta.faces.source";
exports.PARTIAL_ID = "partialId";
exports.P_VIEWSTATE = "jakarta.faces.ViewState";
exports.P_VIEWROOT = "jakarta.faces.ViewRoot";
exports.P_VIEWHEAD = "jakarta.faces.ViewHead";
exports.P_VIEWBODY = "jakarta.faces.ViewBody";
exports.P_RESOURCE = "jakarta.faces.Resource";
/*some useful definitions*/
exports.EMPTY_FUNC = Object.freeze(function () {
});
exports.EMPTY_STR = "";
exports.EMPTY_MAP = Object.freeze({});
exports.HTML_VIEWSTATE = ["<input type='hidden'", "id='", exports.P_VIEWSTATE, "' name='", exports.P_VIEWSTATE, "' value='' />"].join(exports.EMPTY_STR);
/*internal identifiers for options*/
exports.IDENT_ALL = "@all";
exports.IDENT_NONE = "@none";
exports.IDENT_THIS = "@this";
exports.IDENT_FORM = "@form";
exports.P_AJAX = "jakarta.faces.partial.ajax";
exports.P_EXECUTE = "jakarta.faces.partial.execute";
exports.P_RENDER = "jakarta.faces.partial.render";
exports.P_EVT = "jakarta.faces.partial.event";
exports.P_CLIENT_WINDOW = "jakarta.faces.ClientWindow";
exports.P_RESET_VALUES = "jakarta.faces.partial.resetValues";
exports.P_WINDOW_ID = "jakarta.faces.windowId";
exports.P_BEHAVIOR_EVENT = "jakarta.faces.behavior.event";
exports.CTX_PARAM_RENDER = "render";
exports.WINDOW_ID = "windowId";
/* message types */
exports.ERROR = "error";
exports.EVENT = "event";
exports.ON_ERROR = "onerror";
exports.ON_EVENT = "onevent";
/* event emitting stages */
exports.BEGIN = "begin";
exports.COMPLETE = "complete";
exports.SUCCESS = "success";
exports.SOURCE = "source";
exports.STATUS = "status";
exports.ERROR_NAME = "error-name";
exports.ERROR_MESSAGE = "error-message";
exports.RESPONSE_TEXT = "responseText";
exports.RESPONSE_XML = "responseXML";
/*ajax errors spec 14.4.2*/
exports.HTTPERROR = "httpError";
exports.EMPTY_RESPONSE = "emptyResponse";
exports.MALFORMEDXML = "malformedXML";
exports.SERVER_ERROR = "serverError";
exports.CLIENT_ERROR = "clientError";
exports.TIMEOUT_EVENT = "timeout";
exports.CTX_PARAM_MF_INTERNAL = "_mfInternal";
exports.CTX_PARAM_SRC_FRM_ID = "_mfSourceFormId";
exports.CTX_PARAM_SRC_CTL_ID = "_mfSourceControlId";
exports.CTX_PARAM_TR_TYPE = "_mfTransportType";
exports.CTX_PARAM_PASS_THR = "passThrgh";
exports.CTX_PARAM_SPEC_PARAMS = "params";
exports.CTX_PARAM_DELAY = "delay";
exports.CTX_PARAM_TIMEOUT = "timeout";
exports.CTX_PARAM_RST = "resetValues";
exports.CTX_PARAM_EXECUTE = "execute";
exports.STAGE_DEVELOPMENT = "Development";
exports.CONTENT_TYPE = "Content-Type";
exports.HEAD_FACES_REQ = "Faces-Request";
exports.REQ_ACCEPT = "Accept";
exports.VAL_AJAX = "partial/ajax";
exports.ENCODED_URL = "jakarta.faces.encodedURL";
exports.REQ_TYPE_GET = "GET";
exports.REQ_TYPE_POST = "POST";
exports.STATE_EVT_BEGIN = "begin"; //TODO remove this
exports.STATE_EVT_TIMEOUT = "TIMEOUT_EVENT";
exports.STATE_EVT_COMPLETE = "complete"; //TODO remove this
exports.URL_ENCODED = "application/x-www-form-urlencoded";
exports.MULTIPART = "multipart/form-data";
exports.NO_TIMEOUT = 0;
exports.STD_ACCEPT = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
exports.TAG_HEAD = "head";
exports.TAG_FORM = "form";
exports.TAG_BODY = "body";
exports.TAG_BEFORE = "before";
exports.TAG_AFTER = "after";
exports.TAG_ATTR = "attribute";
exports.SEL_VIEWSTATE_ELEM = "[name='" + exports.P_VIEWSTATE + "']";
exports.SEL_CLIENT_WINDOW_ELEM = "[name='" + exports.P_CLIENT_WINDOW + "']";
exports.SEL_RESPONSE_XML = "responseXML";
exports.PHASE_PROCESS_RESPONSE = "processResponse";
exports.ERR_NO_PARTIAL_RESPONSE = "Partial response not set";
exports.ATTR_URL = "url";
exports.ATTR_NAME = "name";
exports.ATTR_VALUE = "value";
exports.ATTR_ID = "id";
/*partial response types*/
exports.RESP_PARTIAL = "partial-response";
/*partial commands*/
exports.CMD_CHANGES = "changes";
exports.CMD_UPDATE = "update";
exports.CMD_DELETE = "delete";
exports.CMD_INSERT = "insert";
exports.CMD_EVAL = "eval";
exports.CMD_ERROR = "error";
exports.CMD_ATTRIBUTES = "attributes";
exports.CMD_EXTENSION = "extension";
exports.CMD_REDIRECT = "redirect";
/*other constants*/
exports.UPDATE_FORMS = "_updateForms";
exports.UPDATE_ELEMS = "_updateElems";
//we want the head elements to be processed before we process the body
//but after the inner html is done
exports.DEFERRED_HEAD_INSERTS = "_headElems";
exports.MYFACES = "myfaces";
exports.SEL_SCRIPTS_STYLES = "script, style, link";
exports.MF_NONE = "__mf_none__";
exports.REASON_EXPIRED = "Expired";
exports.APPLIED_VST = "appliedViewState";
exports.APPLIED_CLIENT_WINDOW = "appliedClientWindow";
exports.RECONNECT_INTERVAL = 500;
exports.MAX_RECONNECT_ATTEMPTS = 25;
exports.UNKNOWN = "UNKNOWN";
/**
 * helper to remap the namespaces variables for 2.3
 * from 2.3 to 4.0 every javax namespace has been changed
 * to faces
 * To take the compatibility layer out this method just has to be
 * changed to a simple value passthrough
 */
function $nsp(inputNamespace) {
    if ((!inputNamespace) || !(inputNamespace === null || inputNamespace === void 0 ? void 0 : inputNamespace.replace)) {
        return inputNamespace;
    }
    return (!!(window === null || window === void 0 ? void 0 : window.faces)) ? inputNamespace.replace(/javax\.faces/gi, "jakarta.faces") : inputNamespace.replace(/jakarta\.faces/gi, "javax.faces");
}
exports.$nsp = $nsp;


/***/ }),

/***/ "./src/main/typescript/impl/core/ImplTypes.ts":
/*!****************************************************!*\
  !*** ./src/main/typescript/impl/core/ImplTypes.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StateHolder = void 0;
/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
var Const_1 = __webpack_require__(/*! ./Const */ "./src/main/typescript/impl/core/Const.ts");
/**
 * a helper class to isolate the
 * view state and client window and other
 * future states which follow a similar pattern
 */
var StateHolder = /** @class */ (function () {
    function StateHolder(id, value) {
        this.id = id;
        this.value = value;
        var viewStatePos = id.indexOf(Const_1.P_VIEWSTATE);
        this.nameSpace = viewStatePos > 0 ? id.substr(0, viewStatePos - 1) : Const_1.EMPTY_STR;
    }
    Object.defineProperty(StateHolder.prototype, "hasNameSpace", {
        get: function () {
            var _a;
            return !!((_a = this === null || this === void 0 ? void 0 : this.nameSpace) !== null && _a !== void 0 ? _a : Const_1.EMPTY_STR).length;
        },
        enumerable: false,
        configurable: true
    });
    return StateHolder;
}());
exports.StateHolder = StateHolder;


/***/ }),

/***/ "./src/main/typescript/impl/i18n/Messages.ts":
/*!***************************************************!*\
  !*** ./src/main/typescript/impl/i18n/Messages.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {


/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Messages = void 0;
var Messages = /** @class */ (function () {
    function Messages() {
        this.MSG_TEST = "Testmessage";
        /*Messages*/
        /** @constant */
        this.MSG_DEV_MODE = "Note, this message is only sent, because project stage is development and no " +
            "other error listeners are registered.";
        /** @constant */
        this.MSG_AFFECTED_CLASS = "Affected Class=";
        /** @constant */
        this.MSG_AFFECTED_METHOD = "Affected Method=";
        /** @constant */
        this.MSG_ERROR_NAME = "Error Name=";
        /** @constant */
        this.MSG_ERROR_MESSAGE = "Error Message=";
        /** @constant */
        this.MSG_SERVER_ERROR_NAME = "Server Error Name=";
        /** @constant */
        this.MSG_ERROR_DESC = "Error Description=";
        /** @constant */
        this.MSG_ERROR_NO = "Error Number=";
        /** @constant */
        this.MSG_ERROR_LINENO = "Error Line Number=";
        /*Errors and messages*/
        /** @constant */
        this.ERR_FORM = "Sourceform could not be determined, either because element is not attached to a form or we have multiple forms with named elements of the same identifier or name, stopping the ajax processing";
        /** @constant */
        this.ERR_VIEWSTATE = "faces.viewState= param value not of type form!";
        /** @constant */
        this.ERR_TRANSPORT = "Transport type {0} does not exist";
        /** @constant */
        this.ERR_EVT_PASS = "an event must be passed down (either a an event object null or undefined) ";
        /** @constant */
        this.ERR_CONSTRUCT = "Parts of the response couldn't be retrieved when constructing the event data= {0} ";
        /** @constant */
        this.ERR_MALFORMEDXML = "The server response could not be parsed, the server has returned with a response which is not xml !";
        /** @constant */
        this.ERR_SOURCE_FUNC = "source cannot be a function (probably source and event were not defined or set to null";
        /** @constant */
        this.ERR_EV_OR_UNKNOWN = "An event object or unknown must be passed as second parameter";
        /** @constant */
        this.ERR_SOURCE_NOSTR = "source cannot be a string";
        /** @constant */
        this.ERR_SOURCE_DEF_NULL = "source must be defined or null";
        //_Lang.js
        /** @constant */
        this.ERR_MUST_STRING = "{0}: {1} namespace must be of type String";
        /** @constant */
        this.ERR_REF_OR_ID = "{0}: {1} a reference node or identifier must be provided";
        /** @constant */
        this.ERR_PARAM_GENERIC = "{0}: parameter {1} must be of type {2}";
        /** @constant */
        this.ERR_PARAM_STR = "{0}: {1} param must be of type string";
        /** @constant */
        this.ERR_PARAM_STR_RE = "{0}: {1} param must be of type string or a regular expression";
        /** @constant */
        this.ERR_PARAM_MIXMAPS = "{0}: both a source as well as a destination map must be provided";
        /** @constant */
        this.ERR_MUST_BE_PROVIDED = "{0}: an {1} and a {2} must be provided";
        /** @constant */
        this.ERR_MUST_BE_PROVIDED1 = "{0}: {1} must be set";
        /** @constant */
        this.ERR_REPLACE_EL = "replaceElements called while evalNodes is not an array";
        /** @constant */
        this.ERR_EMPTY_RESPONSE = "{0}: The response cannot be null or empty!";
        /** @constant */
        this.ERR_ITEM_ID_NOTFOUND = "{0}: item with identifier {1} could not be found";
        /** @constant */
        this.ERR_PPR_IDREQ = "{0}: Error in PPR Insert, id must be present";
        /** @constant */
        this.ERR_PPR_INSERTBEFID = "{0}: Error in PPR Insert, before id or after id must be present";
        /** @constant */
        this.ERR_PPR_INSERTBEFID_1 = "{0}: Error in PPR Insert, before  node of id {1} does not exist in document";
        /** @constant */
        this.ERR_PPR_INSERTBEFID_2 = "{0}: Error in PPR Insert, after  node of id {1} does not exist in document";
        /** @constant */
        this.ERR_PPR_DELID = "{0}: Error in delete, id not in xml markup";
        /** @constant */
        this.ERR_PPR_UNKNOWNCID = "{0}:  Unknown Html-Component-ID= {1}";
        /** @constant */
        this.ERR_NO_VIEWROOTATTR = "{0}: Changing of ViewRoot attributes is not supported";
        /** @constant */
        this.ERR_NO_HEADATTR = "{0}: Changing of Head attributes is not supported";
        /** @constant */
        this.ERR_RED_URL = "{0}: Redirect without url";
        /** @constant */
        this.ERR_REQ_FAILED_UNKNOWN = "Request failed with unknown status";
        /** @constant */
        this.ERR_REQU_FAILED = "Request failed with status {0} and reason {1}";
        /** @constant */
        this.UNKNOWN = "UNKNOWN";
    }
    return Messages;
}());
exports.Messages = Messages;


/***/ }),

/***/ "./src/main/typescript/impl/util/Assertions.ts":
/*!*****************************************************!*\
  !*** ./src/main/typescript/impl/util/Assertions.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Assertions = void 0;
/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
var Lang_1 = __webpack_require__(/*! ./Lang */ "./src/main/typescript/impl/util/Lang.ts");
var getMessage = Lang_1.ExtLang.getMessage;
var makeException = Lang_1.ExtLang.makeException;
var Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
/**
 * a set of internal code assertions
 * which raise an error
 *
 */
var Assertions;
(function (Assertions) {
    function assertRequestIntegrity(options, elem) {
        /*assert if the onerror is set and once if it is set it must be of type function*/
        assertFunction(options.getIf(Const_1.ON_ERROR).value);
        /*assert if the onevent is set and once if it is set it must be of type function*/
        assertFunction(options.getIf(Const_1.ON_EVENT).value);
        //improve the error messages if an empty elem is passed
        //Assertions.assertElementExists(elem);
        assert(elem.isPresent(), getMessage("ERR_MUST_BE_PROVIDED1", "{0}: source  must be provided or exist", "source element id"), "faces.ajax.request", "ArgNotSet");
    }
    Assertions.assertRequestIntegrity = assertRequestIntegrity;
    function assertUrlExists(node) {
        if (node.attr(Const_1.ATTR_URL).isAbsent()) {
            throw Assertions.raiseError(new Error(), getMessage("ERR_RED_URL", null, "processRedirect"), "processRedirect");
        }
    }
    Assertions.assertUrlExists = assertUrlExists;
    /**
     * checks the xml for various issues which can occur
     * and prevent a proper processing
     */
    function assertValidXMLResponse(responseXML) {
        assert(!responseXML.isAbsent(), Const_1.EMPTY_RESPONSE, Const_1.PHASE_PROCESS_RESPONSE);
        assert(!responseXML.isXMLParserError(), responseXML.parserErrorText(Const_1.EMPTY_STR), Const_1.PHASE_PROCESS_RESPONSE);
        assert(responseXML.querySelectorAll(Const_1.RESP_PARTIAL).isPresent(), Const_1.ERR_NO_PARTIAL_RESPONSE, Const_1.PHASE_PROCESS_RESPONSE);
    }
    Assertions.assertValidXMLResponse = assertValidXMLResponse;
    /**
     * internal helper which raises an error in the
     * format we need for further processing
     *
     * @param error
     * @param message the message
     * @param caller
     * @param title the title of the error (optional)
     * @param name the name of the error (optional)
     */
    function raiseError(error, message, caller, title, name) {
        var finalTitle = title !== null && title !== void 0 ? title : Const_1.MALFORMEDXML;
        var finalName = name !== null && name !== void 0 ? name : Const_1.MALFORMEDXML;
        var finalMessage = message !== null && message !== void 0 ? message : Const_1.EMPTY_STR;
        //TODO clean up the messy makeException, this is a perfect case for encapsulation and sane defaults
        return makeException(error, finalTitle, finalName, "Response", caller || ((arguments.caller) ? arguments.caller.toString() : "_raiseError"), finalMessage);
    }
    Assertions.raiseError = raiseError;
    /*
     * using the new typescript 3.7 compiler assertion functionality to improve compiler hinting
     * we are not fully there yet, but soon
     */
    function assert(value, msg, caller, title) {
        if (msg === void 0) { msg = Const_1.EMPTY_STR; }
        if (caller === void 0) { caller = Const_1.EMPTY_STR; }
        if (title === void 0) { title = "Assertion Error"; }
        if (!value) {
            throw Assertions.raiseError(new Error(), msg, caller, title);
        }
    }
    Assertions.assert = assert;
    function assertType(value, theType, msg, caller, title) {
        if (msg === void 0) { msg = Const_1.EMPTY_STR; }
        if (caller === void 0) { caller = Const_1.EMPTY_STR; }
        if (title === void 0) { title = "Type Assertion Error"; }
        if ((!!value) && !mona_dish_1.Lang.assertType(value, theType)) {
            throw Assertions.raiseError(new Error(), msg, caller, title);
        }
    }
    Assertions.assertType = assertType;
    function assertFunction(value, msg, caller, title) {
        if (msg === void 0) { msg = Const_1.EMPTY_STR; }
        if (caller === void 0) { caller = Const_1.EMPTY_STR; }
        if (title === void 0) { title = "Assertion Error"; }
        assertType(value, "function", msg, caller, title);
    }
    Assertions.assertFunction = assertFunction;
})(Assertions = exports.Assertions || (exports.Assertions = {}));


/***/ }),

/***/ "./src/main/typescript/impl/util/AsyncQueue.ts":
/*!*****************************************************!*\
  !*** ./src/main/typescript/impl/util/AsyncQueue.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AsynchronousQueue = void 0;
/**
 * Asynchronous queue which starts to work
 * through the callbacks until the queue is empty
 *
 * Every callback must be of async runnable
 * which is sort of an extended promise which has
 * added a dedicated cancel and start point
 *
 * This interface can be used as wrapper contract
 * for normal promises if needed.
 */
var AsynchronousQueue = /** @class */ (function () {
    function AsynchronousQueue() {
        this.runnableQueue = [];
    }
    Object.defineProperty(AsynchronousQueue.prototype, "isEmpty", {
        /**
         * simple is empty accessor, returns true if queue is empty atm
         */
        get: function () {
            return !this.runnableQueue.length;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * enqueues an element and starts the
     * asynchronous work loop if not already running
     *
     * @param element the element to be queued and processed
     * @param delay possible delay after our usual process or drop if something newer is incoming algorithm
     */
    AsynchronousQueue.prototype.enqueue = function (element, delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        if (this.delayTimeout) {
            clearTimeout(this.delayTimeout);
            this.delayTimeout = null;
        }
        if (delay) {
            this.delayTimeout = setTimeout(function () {
                _this.appendElement(element);
            });
        }
        else {
            this.appendElement(element);
        }
    };
    /**
     * fetches the next element from the queue (first in first out order)
     */
    AsynchronousQueue.prototype.dequeue = function () {
        return this.runnableQueue.shift();
    };
    /**
     * clears up all elements from the queue
     */
    AsynchronousQueue.prototype.cleanup = function () {
        this.currentlyRunning = null;
        this.runnableQueue.length = 0;
    };
    /**
     * cancels the currently running element and then cleans up the queue
     * aka cancel the queue entirely
     */
    AsynchronousQueue.prototype.cancel = function () {
        try {
            if (this.currentlyRunning) {
                this.currentlyRunning.cancel();
            }
        }
        finally {
            this.cleanup();
        }
    };
    AsynchronousQueue.prototype.callForNextElementToProcess = function () {
        this.runEntry();
    };
    AsynchronousQueue.prototype.appendElement = function (element) {
        //only if the first element is added we start with a trigger
        //otherwise a process already is running and not finished yet at that
        //time
        this.runnableQueue.push(element);
        if (!this.currentlyRunning) {
            this.runEntry();
        }
    };
    AsynchronousQueue.prototype.runEntry = function () {
        var _this = this;
        if (this.isEmpty) {
            this.currentlyRunning = null;
            return;
        }
        this.currentlyRunning = this.dequeue();
        this.currentlyRunning
            .catch(function (e) {
            //in case of an error we always clean up the remaining calls
            //to allow a clean recovery of the application
            _this.cleanup();
            throw e;
        })
            .then(
        //the idea is to trigger the next over an event to reduce
        //the number of recursive calls (stacks might be limited
        //compared to ram)
        //naturally give we have a DOM, the DOM is the natural event dispatch system
        //which we can use, to decouple the calls from a recursive stack call
        //(the browser engine will take care of that)
        function () { return _this.callForNextElementToProcess(); }).start();
    };
    return AsynchronousQueue;
}());
exports.AsynchronousQueue = AsynchronousQueue;


/***/ }),

/***/ "./src/main/typescript/impl/util/ExtDomQuery.ts":
/*!******************************************************!*\
  !*** ./src/main/typescript/impl/util/ExtDomQuery.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtConfig = exports.ExtDQ = exports.ExtDomQuery = void 0;
/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
var Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
/**
 * detects whether a source is a faces.js request
 *
 * @param source the source string for the faces.js request
 * @return true if a faces.js loading pattern is detected
 * @constructor
 */
var IS_FACES_SOURCE = function (source) {
    //spec version smaller 4 we have to deal with the jsf namespace
    return source && !!((source === null || source === void 0 ? void 0 : source.search(/\/jakarta\.faces\.resource.*\/faces\.js.*/)) != -1 ||
        (source === null || source === void 0 ? void 0 : source.search(/\/faces-development\.js.*/)) != -1 ||
        (source === null || source === void 0 ? void 0 : source.search(/\/faces-uncompressed\.js.*/)) != -1 ||
        (source === null || source === void 0 ? void 0 : source.search(/\/faces[^.]*\.js.*ln=jakarta.faces.*/gi)) != -1 ||
        //fallback without check for jsf, that way we allow both bookmarks
        (source === null || source === void 0 ? void 0 : source.search(/\/javax\.faces\.resource.*\/jsf\.js.*/)) != -1 ||
        (source === null || source === void 0 ? void 0 : source.search(/\/jsf-development\.js.*/)) != -1 ||
        (source === null || source === void 0 ? void 0 : source.search(/\/jsf-uncompressed\.js.*/)) != -1 ||
        (source === null || source === void 0 ? void 0 : source.search(/\/jsf[^.]*\.js.*ln=javax.faces.*/gi)) != -1);
};
/**
 * namespace myfaces\.testscripts can be used as extension point for internal
 * tests, those will be handled similarly to faces.js, in regard
 * to reload blocking on ajax requests
 *
 * Note: atm not used, used to be used in the old implementation
 * but still is reserved for now
 *
 * @param source the source to check
 * @constructor
 */
var IS_INTERNAL_SOURCE = function (source) {
    return source.search(/\/faces[^.]*\.js.*ln=myfaces.testscripts.*/gi) != -1 || source.search(/\/jsf[^.]*\.js.*ln=myfaces.testscripts.*/gi) != -1;
};
var ATTR_SRC = 'src';
/**
 * Extension which adds implementation specific
 * meta-data to our dom query
 *
 * Usage
 * el = new ExtDQ(oldReference)
 * nonce = el.nonce
 * windowId = el.getWindowId
 */
var ExtDomQuery = /** @class */ (function (_super) {
    __extends(ExtDomQuery, _super);
    function ExtDomQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ExtDomQuery, "windowId", {
        get: function () {
            return new ExtDomQuery(document.body).windowId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtDomQuery, "nonce", {
        get: function () {
            return new ExtDomQuery(document.body).nonce;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtDomQuery.prototype, "windowId", {
        get: function () {
            var fetchWindowIdFromURL = function () {
                var href = window.location.href;
                var windowId = "windowId";
                var regex = new RegExp("[\\?&]" + windowId + "=([^&#\\;]*)");
                var results = regex.exec(href);
                //initial trial over the url and a regexp
                if (results != null)
                    return results[1];
                return null;
            };
            //byId ($)
            if (this.value.isPresent()) {
                var result = this.querySelectorAll("form input[name='" + Const_1.P_WINDOW_ID + "']");
                if (result.length > 1) {
                    throw Error("Multiple different windowIds found in document");
                }
                return (result.isPresent()) ? result.getAsElem(0).value.value : fetchWindowIdFromURL();
            }
            else {
                return fetchWindowIdFromURL();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtDomQuery.prototype, "nonce", {
        /*
        * determines the faces.js nonce and adds them to the namespace
        * this is done once and only lazily
        */
        get: function () {
            var _this = this;
            //already processed
            var myfacesConfig = new ExtConfig(window.myfaces);
            var nonce = myfacesConfig.getIf("config", "cspMeta", "nonce");
            if (nonce.value) {
                return nonce.value;
            }
            var curScript = new mona_dish_1.DQ(document.currentScript);
            //since our baseline atm is ie11 we cannot use document.currentScript globally
            if (!!this.extractNonce(curScript)) {
                // fast-path for modern browsers
                return this.extractNonce(curScript);
            }
            // fallback if the currentScript method fails, we just search the jsf tags for nonce, this is
            // the last possibility
            var nonceScript = mona_dish_1.DQ
                .querySelectorAll("script[src], link[src]")
                .lazyStream
                .filter(function (item) { return _this.extractNonce(item) && item.attr(ATTR_SRC) != null; })
                .filter(function (item) { return IS_FACES_SOURCE(item.attr(ATTR_SRC).value); })
                .first();
            if (nonceScript.isPresent()) {
                return this.extractNonce(nonceScript.value);
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    ExtDomQuery.searchJsfJsFor = function (item) {
        return new ExtDomQuery(document).searchJsfJsFor(item);
    };
    /**
     * searches the embedded faces.js for items like separator char etc.
     * expects a match as variable under position 1 in the result match
     * @param regExp
     */
    ExtDomQuery.prototype.searchJsfJsFor = function (regExp) {
        //perfect application for lazy stream
        return mona_dish_1.DQ.querySelectorAll("script[src], link[src]").lazyStream
            .filter(function (item) { return IS_FACES_SOURCE(item.attr(ATTR_SRC).value); })
            .map(function (item) { return item.attr(ATTR_SRC).value.match(regExp); })
            .filter(function (item) { return item != null && item.length > 1; })
            .map(function (result) {
            return decodeURIComponent(result[1]);
        }).first();
    };
    ExtDomQuery.prototype.globalEval = function (code, nonce) {
        return new ExtDomQuery(_super.prototype.globalEval.call(this, code, nonce !== null && nonce !== void 0 ? nonce : this.nonce));
    };
    // called from base class runScripts, do not delete
    // noinspection JSUnusedGlobalSymbols
    ExtDomQuery.prototype.globalEvalSticky = function (code, nonce) {
        return new ExtDomQuery(_super.prototype.globalEvalSticky.call(this, code, nonce !== null && nonce !== void 0 ? nonce : this.nonce));
    };
    /**
     * decorated run scripts which takes our jsf extensions into consideration
     * (standard DomQuery will let you pass anything)
     * @param sticky if set to true the internally generated element for the script is left in the dom
     * @param whiteListed
     */
    ExtDomQuery.prototype.runScripts = function (sticky, whiteListed) {
        if (sticky === void 0) { sticky = false; }
        var whitelistFunc = function (src) {
            var _a;
            return ((_a = whiteListed === null || whiteListed === void 0 ? void 0 : whiteListed(src)) !== null && _a !== void 0 ? _a : true) && !IS_FACES_SOURCE(src) && !IS_INTERNAL_SOURCE(src);
        };
        return _super.prototype.runScripts.call(this, sticky, whitelistFunc);
    };
    /**
     * adds the elements in this ExtDomQuery to the head
     *
     * @param suppressDoubleIncludes checks for existing elements in the head before running the insert
     */
    ExtDomQuery.prototype.runHeadInserts = function (suppressDoubleIncludes) {
        if (suppressDoubleIncludes === void 0) { suppressDoubleIncludes = true; }
        var head = ExtDomQuery.byId(document.head);
        //automated nonce handling
        var processedScripts = [];
        // the idea is only to run head inserts on resources
        // which do not exist already, that way
        // we can avoid double includes on subsequent resource
        // requests.
        function resourceIsNew(element) {
            if (!suppressDoubleIncludes) {
                return true;
            }
            var tagName = element.tagName.value;
            if (!tagName) {
                // text node they do not have tag names, so we can process them as they are without
                // any further ado
                return true;
            }
            var reference = element.attr("href")
                .orElse(element.attr("src").value)
                .orElse(element.attr("rel").value);
            if (!reference.isPresent()) {
                return true;
            }
            return !head.querySelectorAll("".concat(tagName, "[href='").concat(reference.value, "']")).length &&
                !head.querySelectorAll("".concat(tagName, "[src='").concat(reference.value, "']")).length &&
                !head.querySelectorAll("".concat(tagName, "[rel='").concat(reference.value, "']")).length;
        }
        this
            .filter(resourceIsNew)
            .each(function (element) {
            if (element.tagName.value != "SCRIPT") {
                //we need to run runScripts properly to deal with the rest
                new (ExtDomQuery.bind.apply(ExtDomQuery, __spreadArray([void 0], processedScripts, false)))().runScripts(true);
                processedScripts = [];
                head.append(element);
            }
            else {
                processedScripts.push(element);
            }
        });
        new (ExtDomQuery.bind.apply(ExtDomQuery, __spreadArray([void 0], processedScripts, false)))().runScripts(true);
    };
    /**
     * byId producer
     *
     * @param selector id
     * @param deep whether the search should go into embedded shadow dom elements
     * @return a DomQuery containing the found elements
     */
    ExtDomQuery.byId = function (selector, deep) {
        if (deep === void 0) { deep = false; }
        var ret = mona_dish_1.DomQuery.byId(selector, deep);
        return new ExtDomQuery(ret);
    };
    ExtDomQuery.prototype.extractNonce = function (curScript) {
        var _a, _b;
        return (_b = (_a = curScript.getAsElem(0).value) === null || _a === void 0 ? void 0 : _a.nonce) !== null && _b !== void 0 ? _b : curScript.attr("nonce").value;
    };
    return ExtDomQuery;
}(mona_dish_1.DQ));
exports.ExtDomQuery = ExtDomQuery;
exports.ExtDQ = ExtDomQuery;
/**
 * in order to reduce the number of interception points for the fallbacks we add
 * the namespace remapping straight to our config accessors
 */
var ExtConfig = /** @class */ (function (_super) {
    __extends(ExtConfig, _super);
    function ExtConfig(root) {
        return _super.call(this, root) || this;
    }
    ExtConfig.prototype.assignIf = function (condition) {
        var accessPath = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            accessPath[_i - 1] = arguments[_i];
        }
        var accessPathMapped = this.remap(accessPath);
        return _super.prototype.assignIf.apply(this, __spreadArray([condition], accessPathMapped, false));
    };
    ExtConfig.prototype.assign = function () {
        var accessPath = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            accessPath[_i] = arguments[_i];
        }
        var accessPathMapped = this.remap(accessPath);
        return _super.prototype.assign.apply(this, accessPathMapped);
    };
    ExtConfig.prototype.append = function () {
        var accessPath = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            accessPath[_i] = arguments[_i];
        }
        return _super.prototype.append.apply(this, accessPath);
    };
    ExtConfig.prototype.appendIf = function (condition) {
        var accessPath = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            accessPath[_i - 1] = arguments[_i];
        }
        var accessPathMapped = this.remap(accessPath);
        return _super.prototype.appendIf.apply(this, __spreadArray([condition], accessPathMapped, false));
    };
    ExtConfig.prototype.getIf = function () {
        var accessPath = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            accessPath[_i] = arguments[_i];
        }
        var accessPathMapped = this.remap(accessPath);
        return _super.prototype.getIf.apply(this, accessPathMapped);
    };
    ExtConfig.prototype.get = function (defaultVal) {
        return _super.prototype.get.call(this, (0, Const_1.$nsp)(defaultVal));
    };
    ExtConfig.prototype.delete = function (key) {
        return _super.prototype.delete.call(this, (0, Const_1.$nsp)(key));
    };
    /**
     * creates a config from an initial value or null
     * @param value
     */
    ExtConfig.fromNullable = function (value) {
        return new ExtConfig(value);
    };
    ExtConfig.prototype.getClass = function () {
        return ExtConfig;
    };
    /**
     * shallow copy getter, copies only the first level, references the deeper nodes
     * in a shared manner
     */
    ExtConfig.prototype.shallowCopy$ = function () {
        var ret = _super.prototype.shallowCopy$.call(this);
        return new ExtConfig(ret);
    };
    Object.defineProperty(ExtConfig.prototype, "deepCopy", {
        /**
         * deep copy, copies all config nodes
         */
        get: function () {
            return new ExtConfig(_super.prototype.deepCopy$.call(this));
        },
        enumerable: false,
        configurable: true
    });
    /**
     * helper to remap the namespaces of an array of access paths
     * @param accessPath the access paths to be remapped
     * @private returns an array of access paths with version remapped namespaces
     */
    ExtConfig.prototype.remap = function (accessPath) {
        return mona_dish_1.Stream.of.apply(mona_dish_1.Stream, accessPath).map(function (key) { return (0, Const_1.$nsp)(key); }).collect(new mona_dish_1.ArrayCollector());
    };
    return ExtConfig;
}(mona_dish_1.Config));
exports.ExtConfig = ExtConfig;


/***/ }),

/***/ "./src/main/typescript/impl/util/Lang.ts":
/*!***********************************************!*\
  !*** ./src/main/typescript/impl/util/Lang.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
 *
 * todo replace singleton with module definition
 *
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtLang = void 0;
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
var Messages_1 = __webpack_require__(/*! ../i18n/Messages */ "./src/main/typescript/impl/i18n/Messages.ts");
var Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
var RequestDataResolver_1 = __webpack_require__(/*! ../xhrCore/RequestDataResolver */ "./src/main/typescript/impl/xhrCore/RequestDataResolver.ts");
var ExtLang;
(function (ExtLang) {
    var installedLocale;
    var nameSpace = "impl/util/Lang/";
    function getLanguage() {
        //TODO global config override
        var _a, _b;
        var language = (_b = (_a = navigator.languages) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : navigator === null || navigator === void 0 ? void 0 : navigator.language;
        language = language.split("-")[0];
        return language;
    }
    ExtLang.getLanguage = getLanguage;
    //should be in lang, but for now here to avoid recursive imports, not sure if typescript still has a problem with those
    /**
     * helper function to safely resolve anything
     * this is not an elvis operator, it resolves
     * a value without exception in a tree and if
     * it is not resolvable then an optional of
     * a default value is restored or Optional\.empty
     * if none is given
     *
     * usage
     * <code>
     *     let var: Optional<string> = saveResolve(() => a.b.c.d.e, "foobaz")
     * </code>
     *
     * @param resolverProducer a lambda which can produce the value
     * @param defaultValue an optional default value if the producer fails to produce anything
     * @returns an Optional of the produced value
     */
    function failSaveResolve(resolverProducer, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        return mona_dish_1.Lang.saveResolve(resolverProducer, defaultValue);
    }
    ExtLang.failSaveResolve = failSaveResolve;
    /**
     * under some conditions it makes sense to swallow errors and return a default value in the error case
     * classical example the optional resolution of values in a chain (thankfully now covered by Typescript itself)
     * another example which we have in our system is that some operations fail only under test due to test framework
     * limitations while they cannot fail in the real world.
     *
     * @param resolverProducer a producer function which produces a value in the non error case
     * @param defaultValue the default value in case of a fail of the function
     */
    function failSaveExecute(resolverProducer, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        mona_dish_1.Lang.saveResolve(resolverProducer, defaultValue);
    }
    ExtLang.failSaveExecute = failSaveExecute;
    /**
     * returns a given localized message upon a given key
     * basic java log like templating functionality is included
     *
     * @param  key the key for the message
     * @param  defaultMessage optional default message if none was found
     *
     * Additionally, you can pass additional arguments, which are used
     * in the same way java log templates use the params
     *
     * @param templateParams the param list to be filled in
     */
    function getMessage(key, defaultMessage) {
        var _a, _b;
        var templateParams = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            templateParams[_i - 2] = arguments[_i];
        }
        installedLocale = installedLocale !== null && installedLocale !== void 0 ? installedLocale : new Messages_1.Messages();
        var msg = (_b = (_a = installedLocale[key]) !== null && _a !== void 0 ? _a : defaultMessage) !== null && _b !== void 0 ? _b : key;
        mona_dish_1.Stream.of.apply(mona_dish_1.Stream, templateParams).each(function (param, cnt) {
            msg = msg.replace(new RegExp(["\\{", cnt, "\\}"].join(Const_1.EMPTY_STR), "g"), param);
        });
        return msg;
    }
    ExtLang.getMessage = getMessage;
    /**
     * transforms a key value pair into a string
     * @param key the key
     * @param val the value
     * @param delimiter the delimiter
     */
    function keyValToStr(key, val, delimiter) {
        if (delimiter === void 0) { delimiter = "\n"; }
        return [key, val].join(delimiter);
    }
    ExtLang.keyValToStr = keyValToStr;
    /**
     * creates an exception with additional internal parameters
     * for extra information
     *
     * @param error
     * @param  title the exception title
     * @param  name  the exception name
     * @param  callerCls the caller class
     * @param  callFunc the caller function
     * @param  message the message for the exception
     */
    function makeException(error, title, name, callerCls, callFunc, message) {
        var _a;
        return new Error((_a = message + (callerCls !== null && callerCls !== void 0 ? callerCls : nameSpace) + callFunc) !== null && _a !== void 0 ? _a : (Const_1.EMPTY_STR + arguments.caller.toString()));
    }
    ExtLang.makeException = makeException;
    /**
     * fetches a global config entry
     * @param  configName the name of the configuration entry
     * @param  defaultValue
     *
     * @return either the config entry or if none is given the default value
     */
    function getGlobalConfig(configName, defaultValue) {
        var _a, _b, _c;
        /**
         * note we could use exists but this is a heavy operation, since the config name usually
         * given this function here is called very often
         * is a single entry without . in between we can do the lighter shortcut
         */
        return (_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.myfaces) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b[configName]) !== null && _c !== void 0 ? _c : defaultValue;
    }
    ExtLang.getGlobalConfig = getGlobalConfig;
    /**
     * fetches the form in a fuzzy manner depending
     * on an element or event target.
     *
     * The idea is that according to the jsf spec
     * the enclosing form of the issuing element needs to be fetched.
     *
     * This is fine, but since then html5 came into the picture with the form attribute the element
     * can be anywhere referencing its parent form.
     *
     * Also, theoretically you can have the case of an issuing element enclosing a set of forms
     * (not really often used, but theoretically it could be input button allows to embed html for instance)
     *
     * So the idea is not to limit the issuing form determination to the spec case
     * but also cover the theoretical and html5 corner case.
     *
     * @param elem
     * @param event
     */
    function getForm(elem, event) {
        var queryElem = new mona_dish_1.DQ(elem);
        var eventTarget = new mona_dish_1.DQ((0, RequestDataResolver_1.getEventTarget)(event));
        if (queryElem.isTag(Const_1.TAG_FORM)) {
            return queryElem;
        }
        //html 5 for handling
        if (queryElem.attr(Const_1.TAG_FORM).isPresent()) {
            var formId = queryElem.attr(Const_1.TAG_FORM).value;
            var foundForm = mona_dish_1.DQ.byId(formId, true);
            if (foundForm.isPresent()) {
                return foundForm;
            }
        }
        var form = queryElem.parents(Const_1.TAG_FORM)
            .orElseLazy(function () { return queryElem.byTagName(Const_1.TAG_FORM, true); })
            .orElseLazy(function () { return eventTarget.parents(Const_1.TAG_FORM); })
            .orElseLazy(function () { return eventTarget.byTagName(Const_1.TAG_FORM); })
            .first();
        assertFormExists(form);
        return form;
    }
    ExtLang.getForm = getForm;
    /**
     * gets the local or global options with local ones having higher priority
     * if no local or global one was found then the default value is given back
     *
     * @param  configName the name of the configuration entry
     * @param  localOptions the local options root for the configuration myfaces as default marker is added
     * implicitly
     *
     * @param  defaultValue
     *
     * @return either the config entry or if none is given the default value
     */
    function getLocalOrGlobalConfig(localOptions, configName, defaultValue) {
        var _a, _b, _c, _d, _e, _f, _g;
        return (_g = (_d = (_c = (_b = (_a = localOptions.value) === null || _a === void 0 ? void 0 : _a.myfaces) === null || _b === void 0 ? void 0 : _b.config) === null || _c === void 0 ? void 0 : _c[configName]) !== null && _d !== void 0 ? _d : (_f = (_e = window === null || window === void 0 ? void 0 : window.myfaces) === null || _e === void 0 ? void 0 : _e.config) === null || _f === void 0 ? void 0 : _f[configName]) !== null && _g !== void 0 ? _g : defaultValue;
    }
    ExtLang.getLocalOrGlobalConfig = getLocalOrGlobalConfig;
    /**
     * assert that the form exists and throw an exception in the case it does not
     *
     * @param form the form to check for
     */
    function assertFormExists(form) {
        if (form.isAbsent()) {
            throw makeException(new Error(), null, null, "Impl", "getForm", getMessage("ERR_FORM"));
        }
    }
})(ExtLang = exports.ExtLang || (exports.ExtLang = {}));


/***/ }),

/***/ "./src/main/typescript/impl/xhrCore/ErrorData.ts":
/*!*******************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/ErrorData.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorData = exports.ErrorType = void 0;
/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
var Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
var EventData_1 = __webpack_require__(/*! ./EventData */ "./src/main/typescript/impl/xhrCore/EventData.ts");
var Lang_1 = __webpack_require__(/*! ../util/Lang */ "./src/main/typescript/impl/util/Lang.ts");
var getMessage = Lang_1.ExtLang.getMessage;
var ErrorType;
(function (ErrorType) {
    ErrorType["SERVER_ERROR"] = "serverError";
    ErrorType["HTTP_ERROR"] = "httpError";
    ErrorType["CLIENT_ERROR"] = "clientErrror";
    ErrorType["TIMEOUT"] = "timeout";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
/**
 * the spec has a problem of having the error
 * object somewhat underspecified, there is no clear
 * description of the required contents.
 * I want to streamline it with mojarra here
 * hence we are going to move
 * everything into the same attributes,
 * I will add deprecated myfaces backwards compatibility attributes as well
 */
var ErrorData = /** @class */ (function (_super) {
    __extends(ErrorData, _super);
    function ErrorData(source, errorName, errorMessage, responseText, responseXML, responseCode, status, type) {
        if (responseText === void 0) { responseText = null; }
        if (responseXML === void 0) { responseXML = null; }
        if (responseCode === void 0) { responseCode = "200"; }
        if (status === void 0) { status = "UNKNOWN"; }
        if (type === void 0) { type = ErrorType.CLIENT_ERROR; }
        var _this = _super.call(this) || this;
        _this.type = "error";
        _this.source = source;
        _this.type = "error";
        _this.errorName = errorName;
        _this.message = _this.errorMessage = errorMessage;
        _this.responseCode = responseCode;
        _this.responseText = responseText;
        _this.status = status;
        _this.typeDetails = type;
        if (type == ErrorType.SERVER_ERROR) {
            _this.serverErrorName = _this.errorName;
            _this.serverErrorMessage = _this.errorMessage;
        }
        return _this;
    }
    ErrorData.fromClient = function (e) {
        var _a, _b, _c;
        return new ErrorData("client", (_a = e === null || e === void 0 ? void 0 : e.name) !== null && _a !== void 0 ? _a : '', (_b = e === null || e === void 0 ? void 0 : e.message) !== null && _b !== void 0 ? _b : '', (_c = e === null || e === void 0 ? void 0 : e.stack) !== null && _c !== void 0 ? _c : '');
    };
    ErrorData.fromHttpConnection = function (source, name, message, responseText, responseCode, status) {
        if (status === void 0) { status = 'UNKNOWN'; }
        return new ErrorData(source, name, message, responseText, responseCode, "".concat(responseCode), status, ErrorType.HTTP_ERROR);
    };
    ErrorData.fromGeneric = function (context, errorCode, errorType) {
        if (errorType === void 0) { errorType = ErrorType.SERVER_ERROR; }
        var getMsg = this.getMsg;
        var source = getMsg(context, Const_1.SOURCE);
        var errorName = getMsg(context, Const_1.ERROR_NAME);
        var errorMessage = getMsg(context, Const_1.ERROR_MESSAGE);
        var status = getMsg(context, Const_1.STATUS);
        var responseText = getMsg(context, Const_1.RESPONSE_TEXT);
        var responseXML = getMsg(context, Const_1.RESPONSE_XML);
        return new ErrorData(source, errorName, errorMessage, responseText, responseXML, errorCode + Const_1.EMPTY_STR, status, errorType);
    };
    ErrorData.getMsg = function (context, param) {
        return getMessage(context.getIf(param).orElse(Const_1.UNKNOWN).value);
    };
    ErrorData.fromServerError = function (context) {
        return this.fromGeneric(context, -1);
    };
    return ErrorData;
}(EventData_1.EventData));
exports.ErrorData = ErrorData;


/***/ }),

/***/ "./src/main/typescript/impl/xhrCore/EventData.ts":
/*!*******************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/EventData.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventData = void 0;
/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
var Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
var EventData = /** @class */ (function () {
    function EventData() {
    }
    EventData.createFromRequest = function (request, context, /*event name*/ name) {
        var _a;
        var eventData = new EventData();
        eventData.type = Const_1.EVENT;
        eventData.status = name;
        var sourceId = context.getIf(Const_1.SOURCE)
            .orElseLazy(function () { return context.getIf(Const_1.P_PARTIAL_SOURCE).value; })
            .orElseLazy(function () { return context.getIf(Const_1.CTX_PARAM_PASS_THR, Const_1.P_PARTIAL_SOURCE).value; })
            .value;
        if (sourceId) {
            eventData.source = mona_dish_1.DQ.byId(sourceId, true).first().value.value;
        }
        if (name !== Const_1.BEGIN) {
            eventData.responseCode = (_a = request === null || request === void 0 ? void 0 : request.status) === null || _a === void 0 ? void 0 : _a.toString();
            eventData.responseText = request === null || request === void 0 ? void 0 : request.responseText;
            eventData.responseXML = request === null || request === void 0 ? void 0 : request.responseXML;
        }
        return eventData;
    };
    return EventData;
}());
exports.EventData = EventData;


/***/ }),

/***/ "./src/main/typescript/impl/xhrCore/RequestDataResolver.ts":
/*!*****************************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/RequestDataResolver.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveDefaults = exports.getEventTarget = exports.resolveWindowId = exports.resolveDelay = exports.resolveTimeout = exports.resolveForm = exports.resolveFinalUrl = exports.resolveTargetUrl = exports.resolveHandlerFunc = void 0;
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
var Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
var Lang_1 = __webpack_require__(/*! ../util/Lang */ "./src/main/typescript/impl/util/Lang.ts");
var ExtDomQuery_1 = __webpack_require__(/*! ../util/ExtDomQuery */ "./src/main/typescript/impl/util/ExtDomQuery.ts");
/**
 * Resolver functions for various aspects of the request data
 *
 * stateless because it might be called from various
 * parts of the response classes
 */
/**
 * resolves the event handlers lazily
 * so that if some decoration happens in between we can deal with it
 *
 * @param requestContext
 * @param responseContext
 * @param funcName
 */
function resolveHandlerFunc(requestContext, responseContext, funcName) {
    return responseContext.getIf(funcName)
        .orElseLazy(function () { return requestContext.getIf(funcName).value; })
        .orElse(Const_1.EMPTY_FUNC).value;
}
exports.resolveHandlerFunc = resolveHandlerFunc;
function resolveTargetUrl(srcFormElement) {
    return (typeof srcFormElement.elements[Const_1.ENCODED_URL] == 'undefined') ?
        srcFormElement.action :
        srcFormElement.elements[Const_1.ENCODED_URL].value;
}
exports.resolveTargetUrl = resolveTargetUrl;
function resolveFinalUrl(sourceForm, formData, ajaxType) {
    if (ajaxType === void 0) { ajaxType = Const_1.REQ_TYPE_POST; }
    var targetUrl = resolveTargetUrl(sourceForm.getAsElem(0).value);
    return targetUrl + (ajaxType == Const_1.REQ_TYPE_GET ? "?" + formData.toString() : Const_1.EMPTY_STR);
}
exports.resolveFinalUrl = resolveFinalUrl;
/**
 * form resolution the same way our old implementation did
 * it is either the id or the parent form of the element or an embedded form
 * of the element
 *
 * @param requestCtx
 * @param elem
 * @param event
 */
function resolveForm(requestCtx, elem, event) {
    var _a, _b, _c;
    var configId = (_c = (_b = (_a = requestCtx.value) === null || _a === void 0 ? void 0 : _a.myfaces) === null || _b === void 0 ? void 0 : _b.form) !== null && _c !== void 0 ? _c : Const_1.MF_NONE;
    return mona_dish_1.DQ
        .byId(configId, true)
        .orElseLazy(function () { return Lang_1.ExtLang.getForm(elem.getAsElem(0).value, event); });
}
exports.resolveForm = resolveForm;
function resolveTimeout(options) {
    var _a;
    var getCfg = Lang_1.ExtLang.getLocalOrGlobalConfig;
    return (_a = options.getIf(Const_1.CTX_PARAM_TIMEOUT).value) !== null && _a !== void 0 ? _a : getCfg(options.value, Const_1.CTX_PARAM_TIMEOUT, 0);
}
exports.resolveTimeout = resolveTimeout;
/**
 * resolve the delay from the options and/or the request context and or the configuration
 *
 * @param options ... the options object, in most cases it will host the delay value
 */
function resolveDelay(options) {
    var _a;
    var getCfg = Lang_1.ExtLang.getLocalOrGlobalConfig;
    return (_a = options.getIf(Const_1.CTX_PARAM_DELAY).value) !== null && _a !== void 0 ? _a : getCfg(options.value, Const_1.CTX_PARAM_DELAY, 0);
}
exports.resolveDelay = resolveDelay;
/**
 * resolves the window-id from various sources
 *
 * @param options
 */
function resolveWindowId(options) {
    var _a, _b;
    return (_b = (_a = options === null || options === void 0 ? void 0 : options.value) === null || _a === void 0 ? void 0 : _a.windowId) !== null && _b !== void 0 ? _b : ExtDomQuery_1.ExtDomQuery.windowId;
}
exports.resolveWindowId = resolveWindowId;
/**
 * cross port from the dojo lib
 * browser save event resolution
 * @param evt the event object
 * (with a fallback for ie events if none is present)
 * @deprecated soon will be removed
 */
function getEventTarget(evt) {
    var _a, _b;
    // ie6 and 7 fallback
    var finalEvent = evt;
    /*
     * evt source is defined in the jsf events
     * seems like some component authors use our code,
     * so we add it here see also
     * https://issues.apache.org/jira/browse/MYFACES-2458
     * not entirely a bug but makes sense to add this
     * behavior. I don´t use it that way but nevertheless it
     * does not break anything so why not
     */
    var t = (_b = (_a = finalEvent === null || finalEvent === void 0 ? void 0 : finalEvent.srcElement) !== null && _a !== void 0 ? _a : finalEvent === null || finalEvent === void 0 ? void 0 : finalEvent.target) !== null && _b !== void 0 ? _b : finalEvent === null || finalEvent === void 0 ? void 0 : finalEvent.source;
    while ((t) && (t.nodeType != 1)) {
        t = t.parentNode;
    }
    return t;
}
exports.getEventTarget = getEventTarget;
/**
 * resolves a bunch of default values
 * which can be further processed from the given
 * call parameters of faces.ajax.request
 *
 * @param event
 * @param opts
 * @param el
 */
function resolveDefaults(event, opts, el) {
    var _a;
    if (el === void 0) { el = null; }
    //deep copy the options, so that further transformations to not backfire into the callers
    var resolvedEvent = event, options = new ExtDomQuery_1.ExtConfig(opts).deepCopy, elem = mona_dish_1.DQ.byId(el || resolvedEvent.target, true), elementId = elem.id.value, requestCtx = new ExtDomQuery_1.ExtConfig({}), internalCtx = new ExtDomQuery_1.ExtConfig({}), windowId = resolveWindowId(options), isResetValues = true === ((_a = options.value) === null || _a === void 0 ? void 0 : _a.resetValues);
    return { resolvedEvent: resolvedEvent, options: options, elem: elem, elementId: elementId, requestCtx: requestCtx, internalCtx: internalCtx, windowId: windowId, isResetValues: isResetValues };
}
exports.resolveDefaults = resolveDefaults;


/***/ }),

/***/ "./src/main/typescript/impl/xhrCore/ResonseDataResolver.ts":
/*!*****************************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/ResonseDataResolver.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveSourceForm = exports.resolveSourceElement = exports.resolveContexts = exports.resolveResponseXML = void 0;
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
var Assertions_1 = __webpack_require__(/*! ../util/Assertions */ "./src/main/typescript/impl/util/Assertions.ts");
var mona_dish_2 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
var Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
var ExtDomQuery_1 = __webpack_require__(/*! ../util/ExtDomQuery */ "./src/main/typescript/impl/util/ExtDomQuery.ts");
/**
 * Resolver functions for various aspects of the response data
 *
 * stateless because it might be called from various
 * parts of the response classes
 */
/**
 * fetches the response XML
 * as XML Query object
 *
 * @param request the request hosting the responseXML
 *
 * Throws an error in case of non-existent or wrong xml data
 *
 */
function resolveResponseXML(request) {
    var ret = new mona_dish_1.XMLQuery((0, Const_1.$nsp)(request.getIf(Const_1.SEL_RESPONSE_XML).value));
    Assertions_1.Assertions.assertValidXMLResponse(ret);
    return ret;
}
exports.resolveResponseXML = resolveResponseXML;
/**
 * Splits the incoming pass-through context apart
 * in an internal and an external normalized context
 * the internal one is just for our internal processing
 *
 * @param context the root context as associative array
 */
function resolveContexts(context) {
    /**
     * we split the context apart into the external one and
     * some internal values
     */
    var externalContext = ExtDomQuery_1.ExtConfig.fromNullable(context);
    var internalContext = externalContext.getIf(Const_1.CTX_PARAM_MF_INTERNAL);
    if (!internalContext.isPresent()) {
        internalContext = ExtDomQuery_1.ExtConfig.fromNullable({});
    }
    /**
     * prepare storage for some deferred operations
     */
    internalContext.assign(Const_1.DEFERRED_HEAD_INSERTS).value = [];
    internalContext.assign(Const_1.UPDATE_FORMS).value = [];
    internalContext.assign(Const_1.UPDATE_ELEMS).value = [];
    return { externalContext: externalContext, internalContext: internalContext };
}
exports.resolveContexts = resolveContexts;
/**
 * fetches the source element out of our contexts
 *
 * @param context the external context which should host the source id
 * @param internalContext internal pass-through fall back
 *
 */
function resolveSourceElement(context, internalContext) {
    var elemId = resolveSourceElementId(context, internalContext);
    return mona_dish_2.DQ.byId(elemId.value, true);
}
exports.resolveSourceElement = resolveSourceElement;
/**
 * fetches the source form if it still exists
 * also embedded forms and parent forms are taken into consideration
 * as fallbacks
 *
 * @param internalContext
 * @param elem
 */
function resolveSourceForm(internalContext, elem) {
    var sourceFormId = internalContext.getIf(Const_1.CTX_PARAM_SRC_FRM_ID);
    var sourceForm = new mona_dish_2.DQ(sourceFormId.isPresent() ? document.forms[sourceFormId.value] : null);
    sourceForm = sourceForm.orElseLazy(function () { return elem.parents(Const_1.TAG_FORM); })
        .orElseLazy(function () { return elem.querySelectorAll(Const_1.TAG_FORM); })
        .orElseLazy(function () { return mona_dish_2.DQ.querySelectorAll(Const_1.TAG_FORM); });
    return sourceForm;
}
exports.resolveSourceForm = resolveSourceForm;
function resolveSourceElementId(context, internalContext) {
    //?internal context?? used to be external one
    return internalContext.getIf(Const_1.CTX_PARAM_SRC_CTL_ID)
        .orElseLazy(function () { return context.getIf(Const_1.SOURCE, "id").value; });
}


/***/ }),

/***/ "./src/main/typescript/impl/xhrCore/Response.ts":
/*!******************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/Response.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Response = void 0;
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
var ResponseProcessor_1 = __webpack_require__(/*! ./ResponseProcessor */ "./src/main/typescript/impl/xhrCore/ResponseProcessor.ts");
var Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
var ResonseDataResolver_1 = __webpack_require__(/*! ./ResonseDataResolver */ "./src/main/typescript/impl/xhrCore/ResonseDataResolver.ts");
var ExtDomQuery_1 = __webpack_require__(/*! ../util/ExtDomQuery */ "./src/main/typescript/impl/util/ExtDomQuery.ts");
var Response;
(function (Response) {
    /**
     * Standardized faces.ts response
     * this one is called straight from faces.ts.response
     *
     * The processing follows the spec by going for the responseXML
     * and processing its tags
     *
     * @param {XMLHttpRequest} request (xhrRequest) - xhr request object
     * @param context {Context} context (Map) - AJAX context
     *
     */
    function processResponse(request, context) {
        var req = ExtDomQuery_1.ExtConfig.fromNullable(request);
        var _a = (0, ResonseDataResolver_1.resolveContexts)(context), externalContext = _a.externalContext, internalContext = _a.internalContext;
        var responseXML = (0, ResonseDataResolver_1.resolveResponseXML)(req);
        var responseProcessor = new ResponseProcessor_1.ResponseProcessor(req, externalContext, internalContext);
        internalContext.assign(Const_1.RESPONSE_XML).value = responseXML;
        // we now process the partial tags, or in none given raise an error
        responseXML.querySelectorAll(Const_1.RESP_PARTIAL)
            .each(function (item) { return processPartialTag(item, responseProcessor, internalContext); });
        // We now process the viewStates, client windows and the elements to be evaluated are delayed.
        // The reason for this is that often it is better
        // to wait until the document has caught up before
        // doing any evaluations even on embedded scripts.
        // Usually this does not matter, the client window comes in almost last always anyway
        // we maybe drop this deferred assignment in the future, but myfaces did it until now.
        responseProcessor.fixViewStates();
        responseProcessor.fixClientWindow();
        responseProcessor.globalEval();
        responseProcessor.done();
    }
    Response.processResponse = processResponse;
    /**
     * highest node partial-response from there the main operations are triggered
     */
    function processPartialTag(node, responseProcessor, internalContext) {
        internalContext.assign(Const_1.PARTIAL_ID).value = node.id;
        var SEL_SUB_TAGS = [Const_1.CMD_ERROR, Const_1.CMD_REDIRECT, Const_1.CMD_CHANGES].join(",");
        // now we can process the main operations
        node.querySelectorAll(SEL_SUB_TAGS).each(function (node) {
            switch (node.tagName.value) {
                case Const_1.CMD_ERROR:
                    responseProcessor.error(node);
                    break;
                case Const_1.CMD_REDIRECT:
                    responseProcessor.redirect(node);
                    break;
                case Const_1.CMD_CHANGES:
                    processChangesTag(node, responseProcessor);
                    break;
            }
        });
    }
    var processInsert = function (responseProcessor, node) {
        // path1 insert after as child tags
        if (node.querySelectorAll([Const_1.TAG_BEFORE, Const_1.TAG_AFTER].join(",")).length) {
            responseProcessor.insertWithSubTags(node);
        }
        else { // insert before after with id
            responseProcessor.insert(node);
        }
    };
    /**
     * next level changes tag
     *
     * @param node
     * @param responseProcessor
     */
    function processChangesTag(node, responseProcessor) {
        var ALLOWED_TAGS = [Const_1.CMD_UPDATE, Const_1.CMD_EVAL, Const_1.CMD_INSERT, Const_1.CMD_DELETE, Const_1.CMD_ATTRIBUTES, Const_1.CMD_EXTENSION].join(", ");
        node.querySelectorAll(ALLOWED_TAGS).each(function (node) {
            switch (node.tagName.value) {
                case Const_1.CMD_UPDATE:
                    processUpdateTag(node, responseProcessor);
                    break;
                case Const_1.CMD_EVAL:
                    responseProcessor.eval(node);
                    break;
                case Const_1.CMD_INSERT:
                    processInsert(responseProcessor, node);
                    break;
                case Const_1.CMD_DELETE:
                    responseProcessor.delete(node);
                    break;
                case Const_1.CMD_ATTRIBUTES:
                    responseProcessor.attributes(node);
                    break;
                case Const_1.CMD_EXTENSION:
                    break;
            }
        });
        return true;
    }
    /**
     * checks and stores a state update for delayed processing
     *
     * @param responseProcessor the response processor to perform the store operation
     * @param node the xml node to check for the state
     *
     * @private
     */
    function storeState(responseProcessor, node) {
        return responseProcessor.processViewState(node) || responseProcessor.processClientWindow(node);
    }
    /**
     * branch tag update. drill further down into the updates
     * special case viewState in that case it is a leaf
     * and the viewState must be processed
     *
     * @param node
     * @param responseProcessor
     */
    function processUpdateTag(node, responseProcessor) {
        // early state storing, if no state we perform a normal update cycle
        if (!storeState(responseProcessor, node)) {
            handleElementUpdate(node, responseProcessor);
        }
    }
    /**
     * element update
     *
     * @param node
     * @param responseProcessor
     */
    function handleElementUpdate(node, responseProcessor) {
        var cdataBlock = node.cDATAAsString;
        switch (node.id.value) {
            case (0, Const_1.$nsp)(Const_1.P_VIEWROOT):
                responseProcessor.replaceViewRoot(mona_dish_1.DQ.fromMarkup(cdataBlock.substring(cdataBlock.indexOf("<html"))));
                break;
            case (0, Const_1.$nsp)(Const_1.P_VIEWHEAD):
                responseProcessor.replaceHead(mona_dish_1.DQ.fromMarkup(cdataBlock));
                break;
            case (0, Const_1.$nsp)(Const_1.P_VIEWBODY):
                responseProcessor.replaceBody(mona_dish_1.DQ.fromMarkup(cdataBlock));
                break;
            case (0, Const_1.$nsp)(Const_1.P_RESOURCE):
                responseProcessor.addToHead(mona_dish_1.DQ.fromMarkup(cdataBlock));
                break;
            default: // htmlItem replacement
                responseProcessor.update(node, cdataBlock);
                break;
        }
    }
})(Response = exports.Response || (exports.Response = {}));


/***/ }),

/***/ "./src/main/typescript/impl/xhrCore/ResponseProcessor.ts":
/*!***************************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/ResponseProcessor.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseProcessor = void 0;
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
var AjaxImpl_1 = __webpack_require__(/*! ../AjaxImpl */ "./src/main/typescript/impl/AjaxImpl.ts");
var Assertions_1 = __webpack_require__(/*! ../util/Assertions */ "./src/main/typescript/impl/util/Assertions.ts");
var ErrorData_1 = __webpack_require__(/*! ./ErrorData */ "./src/main/typescript/impl/xhrCore/ErrorData.ts");
var ImplTypes_1 = __webpack_require__(/*! ../core/ImplTypes */ "./src/main/typescript/impl/core/ImplTypes.ts");
var EventData_1 = __webpack_require__(/*! ./EventData */ "./src/main/typescript/impl/xhrCore/EventData.ts");
var Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
var trim = mona_dish_1.Lang.trim;
var ExtDomQuery_1 = __webpack_require__(/*! ../util/ExtDomQuery */ "./src/main/typescript/impl/util/ExtDomQuery.ts");
/**
 * Response processor
 *
 * Each  XML tag is either a node or a leaf
 * or both
 *
 * the processor provides a set of operations
 * which are executed on a single leaf node per operation
 * and present the core functionality of our response
 *
 * Note the response processor is stateful hence we bundle it in a class
 * to reduce code we keep references tot contexts in place
 */
var ResponseProcessor = /** @class */ (function () {
    function ResponseProcessor(request, externalContext, internalContext) {
        this.request = request;
        this.externalContext = externalContext;
        this.internalContext = internalContext;
    }
    /**
     * head replacement
     * @param shadowDocument incoming shadow head data (aka cdata as xml reference or dom element)
     * the data incoming must represent the html representation of the head itself one way or the other
     */
    ResponseProcessor.prototype.replaceHead = function (shadowDocument) {
        var shadowHead = shadowDocument.querySelectorAll(Const_1.TAG_HEAD);
        if (!shadowHead.isPresent()) {
            return;
        }
        var oldHead = ExtDomQuery_1.ExtDomQuery.querySelectorAll(Const_1.TAG_HEAD);
        //delete all to avoid script and style overlays
        oldHead.querySelectorAll(Const_1.SEL_SCRIPTS_STYLES).delete();
        // we cannot replace new elements in the head, but we can eval the elements
        // eval means the scripts will get attached (eval script attach method)
        // but this is done by DomQuery not in this code
        this.storeForEval(shadowHead);
        //incoming either the outer head tag or its children
        //shadowHead = (shadowHead.tagName.value === "HEAD") ? shadowHead.childNodes : shadowHead;
        //this.addToHead(shadowHead);
    };
    ResponseProcessor.prototype.addToHead = function (newElements) {
        this.internalContext.assign(Const_1.DEFERRED_HEAD_INSERTS).value.push(newElements);
    };
    /**
     * replaces the body in the expected manner
     * which means the entire body content is refreshed
     * however also the body attributes must be transferred
     * keeping event handlers etc... in place
     *
     * @param shadowDocument .. an incoming shadow document hosting the new nodes
     */
    ResponseProcessor.prototype.replaceBody = function (shadowDocument) {
        var shadowBody = shadowDocument.querySelectorAll(Const_1.TAG_BODY);
        if (!shadowBody.isPresent()) {
            return;
        }
        var shadowInnerHTML = shadowBody.html().value;
        var resultingBody = ExtDomQuery_1.ExtDomQuery.querySelectorAll(Const_1.TAG_BODY).html(shadowInnerHTML);
        var updateForms = resultingBody.querySelectorAll(Const_1.TAG_FORM);
        // main difference, we cannot replace the body itself, but only its content
        // we need a separate step for post-processing the incoming
        // attributes, like classes, styles etc...
        resultingBody.copyAttrs(shadowBody);
        this.storeForPostProcessing(updateForms, resultingBody);
    };
    /**
     * Leaf Tag eval... process whatever is in the eval cdata block
     *
     * @param node the node to eval
     */
    ResponseProcessor.prototype.eval = function (node) {
        ExtDomQuery_1.ExtDomQuery.globalEval(node.cDATAAsString);
    };
    /**
     * processes an incoming error from the response
     * which is hosted under the &lt;error&gt; tag
     * @param node the node hosting the error in our response xml
     * @param node the node in the xml hosting the error message
     */
    ResponseProcessor.prototype.error = function (node) {
        /**
         * <error>
         *      <error-name>String</error-name>
         *      <error-message><![CDATA[message]]></error-message>
         * <error>
         */
        var mergedErrorData = new ExtDomQuery_1.ExtConfig({});
        mergedErrorData.assign(Const_1.SOURCE).value = this.externalContext.getIf(Const_1.P_PARTIAL_SOURCE).get(0).value;
        mergedErrorData.assign(Const_1.ERROR_NAME).value = node.querySelectorAll(Const_1.ERROR_NAME).textContent(Const_1.EMPTY_STR);
        mergedErrorData.assign(Const_1.ERROR_MESSAGE).value = node.querySelectorAll(Const_1.ERROR_MESSAGE).cDATAAsString;
        var hasResponseXML = this.internalContext.get(Const_1.RESPONSE_XML).isPresent();
        //we now store the response xml also in the error data for further details
        mergedErrorData.assignIf(hasResponseXML, Const_1.RESPONSE_XML).value = this.internalContext.getIf(Const_1.RESPONSE_XML).value.get(0).value;
        // error post-processing and enrichment (standard messages from keys)
        var errorData = ErrorData_1.ErrorData.fromServerError(mergedErrorData);
        // we now trigger an internally stored onError function which might be an attached to the context
        // either we do not have an internal on error, or an on error has been based via params from the outside.
        // In both cases they are attached to our contexts
        this.triggerOnError(errorData);
        AjaxImpl_1.Implementation.sendError(errorData);
    };
    /**
     * process the redirect operation
     *
     * @param node
     */
    ResponseProcessor.prototype.redirect = function (node) {
        Assertions_1.Assertions.assertUrlExists(node);
        var redirectUrl = trim(node.attr(Const_1.ATTR_URL).value);
        if (redirectUrl != Const_1.EMPTY_STR) {
            window.location.href = redirectUrl;
        }
    };
    /**
     * processes the update operation and updates the node with the cdata block
     * @param node the xml response node hosting the update info
     * @param cdataBlock the cdata block with the new html code
     */
    ResponseProcessor.prototype.update = function (node, cdataBlock) {
        var result = ExtDomQuery_1.ExtDomQuery.byId(node.id.value, true).outerHTML(cdataBlock, false, false);
        var sourceForm = result === null || result === void 0 ? void 0 : result.parents(Const_1.TAG_FORM).orElseLazy(function () { return result.byTagName(Const_1.TAG_FORM, true); });
        if (sourceForm) {
            this.storeForPostProcessing(sourceForm, result);
        }
    };
    /**
     * Delete handler, simply deletes the node referenced by the xml data
     * @param node
     */
    ResponseProcessor.prototype.delete = function (node) {
        mona_dish_1.DQ.byId(node.id.value, true).delete();
    };
    /**
     * attributes leaf tag... process the attributes
     *
     * @param node
     */
    ResponseProcessor.prototype.attributes = function (node) {
        var elem = mona_dish_1.DQ.byId(node.id.value, true);
        node.byTagName(Const_1.TAG_ATTR).each(function (item) {
            elem.attr(item.attr(Const_1.ATTR_NAME).value).value = item.attr(Const_1.ATTR_VALUE).value;
        });
    };
    /**
     * @param shadowDocument a shadow document which is needed for further processing
     */
    ResponseProcessor.prototype.replaceViewRoot = function (shadowDocument) {
        this.replaceHead(shadowDocument);
        this.replaceBody(shadowDocument);
    };
    /**
     * Insert handling, either before or after
     *
     * @param node
     */
    ResponseProcessor.prototype.insert = function (node) {
        //let insertId = node.id; //not used atm
        var before = node.attr(Const_1.TAG_BEFORE);
        var after = node.attr(Const_1.TAG_AFTER);
        var insertNodes = mona_dish_1.DQ.fromMarkup(node.cDATAAsString);
        if (before.isPresent()) {
            mona_dish_1.DQ.byId(before.value, true).insertBefore(insertNodes);
            this.internalContext.assign(Const_1.UPDATE_ELEMS).value.push(insertNodes);
        }
        if (after.isPresent()) {
            var domQuery = mona_dish_1.DQ.byId(after.value, true);
            domQuery.insertAfter(insertNodes);
            this.internalContext.assign(Const_1.UPDATE_ELEMS).value.push(insertNodes);
        }
    };
    /**
     * Handler for the case &lt;insert <&lt; before id="...
     *
     * @param node the node hosting the insert data
     */
    ResponseProcessor.prototype.insertWithSubTags = function (node) {
        var _this = this;
        var before = node.querySelectorAll(Const_1.TAG_BEFORE);
        var after = node.querySelectorAll(Const_1.TAG_AFTER);
        before.each(function (item) {
            var insertId = item.attr(Const_1.ATTR_ID);
            var insertNodes = mona_dish_1.DQ.fromMarkup(item.cDATAAsString);
            if (insertId.isPresent()) {
                mona_dish_1.DQ.byId(insertId.value, true).insertBefore(insertNodes);
                _this.internalContext.assign(Const_1.UPDATE_ELEMS).value.push(insertNodes);
            }
        });
        after.each(function (item) {
            var insertId = item.attr(Const_1.ATTR_ID);
            var insertNodes = mona_dish_1.DQ.fromMarkup(item.cDATAAsString);
            if (insertId.isPresent()) {
                mona_dish_1.DQ.byId(insertId.value, true).insertAfter(insertNodes);
                _this.internalContext.assign(Const_1.UPDATE_ELEMS).value.push(insertNodes);
            }
        });
    };
    /**
     * Process the viewState update, update the affected
     * forms with their respective new viewState values
     *
     */
    ResponseProcessor.prototype.processViewState = function (node) {
        if (ResponseProcessor.isViewStateNode(node)) {
            var state = node.cDATAAsString;
            this.internalContext.assign(Const_1.APPLIED_VST, node.id.value).value = new ImplTypes_1.StateHolder((0, Const_1.$nsp)(node.id.value), state);
            return true;
        }
        return false;
    };
    ResponseProcessor.prototype.processClientWindow = function (node) {
        if (ResponseProcessor.isClientWindowNode(node)) {
            var state = node.cDATAAsString;
            this.internalContext.assign(Const_1.APPLIED_CLIENT_WINDOW, node.id.value).value = new ImplTypes_1.StateHolder((0, Const_1.$nsp)(node.id.value), state);
            return true;
        }
    };
    /**
     * generic global eval which runs the embedded css and scripts
     */
    ResponseProcessor.prototype.globalEval = function () {
        //  phase one, if we have head inserts, we build up those before going into the script eval phase
        var insertHeadElems = new (ExtDomQuery_1.ExtDomQuery.bind.apply(ExtDomQuery_1.ExtDomQuery, __spreadArray([void 0], this.internalContext.getIf(Const_1.DEFERRED_HEAD_INSERTS).value, false)))();
        insertHeadElems.runHeadInserts(true);
        // phase 2 we run a script eval on all updated elements in the body
        var updateElems = new (ExtDomQuery_1.ExtDomQuery.bind.apply(ExtDomQuery_1.ExtDomQuery, __spreadArray([void 0], this.internalContext.getIf(Const_1.UPDATE_ELEMS).value, false)))();
        updateElems.runCss();
        // phase 3, we do the same for the css
        updateElems.runScripts();
    };
    /**
     * Postprocessing view state fixing
     * this appends basically the incoming view states to the forms.
     * It is called from outside after all forms have been processed basically
     * as last lifecycle step, before going into the next request.
     */
    ResponseProcessor.prototype.fixViewStates = function () {
        var _this = this;
        mona_dish_1.Stream.ofAssoc(this.internalContext.getIf(Const_1.APPLIED_VST).orElse({}).value)
            .each(function (item) {
            var value = item[1];
            var nameSpace = mona_dish_1.DQ.byId(value.nameSpace, true).orElse(document.body);
            var affectedForms = nameSpace.byTagName(Const_1.TAG_FORM);
            var affectedForms2 = nameSpace.filter(function (item) { return item.tagName.orElse(Const_1.EMPTY_STR).value.toLowerCase() == Const_1.TAG_FORM; });
            _this.appendViewStateToForms(new mona_dish_1.DomQuery(affectedForms, affectedForms2), value.value);
        });
    };
    /**
     * same as with view states before applies the incoming client windows as last step after the rest of the processing
     * is done.
     */
    ResponseProcessor.prototype.fixClientWindow = function () {
        var _this = this;
        mona_dish_1.Stream.ofAssoc(this.internalContext.getIf(Const_1.APPLIED_CLIENT_WINDOW).orElse({}).value)
            .each(function (item) {
            var value = item[1];
            var nameSpace = mona_dish_1.DQ.byId(value.nameSpace, true).orElse(document.body);
            var affectedForms = nameSpace.byTagName(Const_1.TAG_FORM);
            var affectedForms2 = nameSpace.filter(function (item) { return item.tagName.orElse(Const_1.EMPTY_STR).value.toLowerCase() == Const_1.TAG_FORM; });
            _this.appendClientWindowToForms(new mona_dish_1.DomQuery(affectedForms, affectedForms2), value.value);
        });
    };
    /**
     * all processing done we can close the request and send the appropriate events
     */
    ResponseProcessor.prototype.done = function () {
        var _this = this;
        var eventData = EventData_1.EventData.createFromRequest(this.request.value, this.externalContext, Const_1.SUCCESS);
        //because some frameworks might decorate them over the context in the response
        var eventHandler = this.externalContext.getIf(Const_1.ON_EVENT).orElseLazy(function () { return _this.internalContext.getIf(Const_1.ON_EVENT).value; }).orElse(Const_1.EMPTY_FUNC).value;
        AjaxImpl_1.Implementation.sendEvent(eventData, eventHandler);
    };
    /**
     * proper viewState -> form assignment
     *
     * @param forms the forms to append the viewState to
     * @param viewState the final viewState
     */
    ResponseProcessor.prototype.appendViewStateToForms = function (forms, viewState) {
        this.assignState(forms, (0, Const_1.$nsp)(Const_1.SEL_VIEWSTATE_ELEM), viewState);
    };
    /**
     * proper clientWindow -> form assignment
     *
     * @param forms the forms to append the viewState to
     * @param clientWindow the final viewState
     */
    ResponseProcessor.prototype.appendClientWindowToForms = function (forms, clientWindow) {
        this.assignState(forms, (0, Const_1.$nsp)(Const_1.SEL_CLIENT_WINDOW_ELEM), clientWindow);
    };
    /**
     * generic append state which appends a certain state as hidden element to an existing set of forms
     *
     * @param forms the forms to append or change to
     * @param selector the selector for the state
     * @param state the state itself which needs to be assigned
     *
     * @private
     */
    ResponseProcessor.prototype.assignState = function (forms, selector, state) {
        forms.each(function (form) {
            var stateHolders = form.querySelectorAll(selector)
                .orElseLazy(function () { return ResponseProcessor.newViewStateElement(form); });
            stateHolders.attr("value").value = state;
        });
    };
    /**
     * Helper to Create a new JSF ViewState Element
     *
     * @param parent, the parent node to attach the viewState element to
     * (usually a form node)
     */
    ResponseProcessor.newViewStateElement = function (parent) {
        var newViewState = mona_dish_1.DQ.fromMarkup((0, Const_1.$nsp)(Const_1.HTML_VIEWSTATE));
        newViewState.appendTo(parent);
        return newViewState;
    };
    /**
     * Stores certain aspects of the dom for later post-processing
     *
     * @param updateForms the update forms which should receive standardized internal jsf data
     * @param toBeEvaluated the resulting elements which should be evaluated
     */
    ResponseProcessor.prototype.storeForPostProcessing = function (updateForms, toBeEvaluated) {
        this.storeForUpdate(updateForms);
        this.storeForEval(toBeEvaluated);
    };
    /**
     * helper to store a given form for the update post-processing (viewState)
     *
     * @param updateForms the dom query object pointing to the forms which need to be updated
     */
    ResponseProcessor.prototype.storeForUpdate = function (updateForms) {
        this.internalContext.assign(Const_1.UPDATE_FORMS).value.push(updateForms);
    };
    /**
     * same for eval (js and css)
     *
     * @param toBeEvaluated
     */
    ResponseProcessor.prototype.storeForEval = function (toBeEvaluated) {
        this.internalContext.assign(Const_1.UPDATE_ELEMS).value.push(toBeEvaluated);
    };
    /**
     * check whether a given XMLQuery node is an explicit viewState node
     *
     * @param node the node to check
     * @returns if it is a viewState node
     */
    ResponseProcessor.isViewStateNode = function (node) {
        var _a, _b, _c, _d, _e, _f, _g;
        var separatorChar = ((_a = window === null || window === void 0 ? void 0 : window.faces) !== null && _a !== void 0 ? _a : window === null || window === void 0 ? void 0 : window.jsf).separatorchar;
        return "undefined" != typeof ((_b = node === null || node === void 0 ? void 0 : node.id) === null || _b === void 0 ? void 0 : _b.value) && (((_c = node === null || node === void 0 ? void 0 : node.id) === null || _c === void 0 ? void 0 : _c.value) == (0, Const_1.$nsp)(Const_1.P_VIEWSTATE) ||
            ((_e = (_d = node === null || node === void 0 ? void 0 : node.id) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.indexOf([separatorChar, (0, Const_1.$nsp)(Const_1.P_VIEWSTATE)].join(Const_1.EMPTY_STR))) != -1 ||
            ((_g = (_f = node === null || node === void 0 ? void 0 : node.id) === null || _f === void 0 ? void 0 : _f.value) === null || _g === void 0 ? void 0 : _g.indexOf([(0, Const_1.$nsp)(Const_1.P_VIEWSTATE), separatorChar].join(Const_1.EMPTY_STR))) != -1);
    };
    /**
     * incoming client window node also needs special processing
     *
     * @param node the node to check
     * @returns true of it ii
     */
    ResponseProcessor.isClientWindowNode = function (node) {
        var _a, _b, _c, _d, _e, _f, _g;
        var separatorChar = ((_a = window === null || window === void 0 ? void 0 : window.faces) !== null && _a !== void 0 ? _a : window === null || window === void 0 ? void 0 : window.jsf).separatorchar;
        return "undefined" != typeof ((_b = node === null || node === void 0 ? void 0 : node.id) === null || _b === void 0 ? void 0 : _b.value) && (((_c = node === null || node === void 0 ? void 0 : node.id) === null || _c === void 0 ? void 0 : _c.value) == (0, Const_1.$nsp)(Const_1.P_CLIENT_WINDOW) ||
            ((_e = (_d = node === null || node === void 0 ? void 0 : node.id) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.indexOf([separatorChar, (0, Const_1.$nsp)(Const_1.P_CLIENT_WINDOW)].join(Const_1.EMPTY_STR))) != -1 ||
            ((_g = (_f = node === null || node === void 0 ? void 0 : node.id) === null || _f === void 0 ? void 0 : _f.value) === null || _g === void 0 ? void 0 : _g.indexOf([(0, Const_1.$nsp)(Const_1.P_CLIENT_WINDOW), separatorChar].join(Const_1.EMPTY_STR))) != -1);
    };
    ResponseProcessor.prototype.triggerOnError = function (errorData) {
        this.externalContext.getIf(Const_1.ON_ERROR).orElse(this.internalContext.getIf(Const_1.ON_ERROR).value).orElse(Const_1.EMPTY_FUNC).value(errorData);
    };
    return ResponseProcessor;
}());
exports.ResponseProcessor = ResponseProcessor;


/***/ }),

/***/ "./src/main/typescript/impl/xhrCore/XhrFormData.ts":
/*!*********************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/XhrFormData.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.XhrFormData = void 0;
/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
var Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
var isString = mona_dish_1.Lang.isString;
var ExtDomQuery_1 = __webpack_require__(/*! ../util/ExtDomQuery */ "./src/main/typescript/impl/util/ExtDomQuery.ts");
/**
 * A unified form data class
 * which builds upon our configuration.
 *
 * We cannot use standard html5 forms everywhere
 * due to api constraints on the HTML Form object in IE11
 * and due to the url encoding constraint given by the faces.js spec
 *
 * probably only one needed and one overlay!
 * the entire file input storing probably is redundant now
 * that dom query has been fixed //TODO check this
 */
var XhrFormData = /** @class */ (function (_super) {
    __extends(XhrFormData, _super);
    /**
     * data collector from a given form
     *
     * @param dataSource either a form as DomQuery object or an encoded url string
     * @param viewState the form view state or an external viewState coming in as string
     * @param executes the executes id list for the elements to being processed
     * @param partialIds partial ids to collect, to reduce the data sent down
     */
    function XhrFormData(dataSource, viewState, executes, partialIds) {
        var _this = _super.call(this, {}) || this;
        _this.dataSource = dataSource;
        _this.partialIds = partialIds;
        /**
         * Checks if the given datasource is a multipart request source
         * multipart is only needed if one of the executes is a file input
         * since file inputs are stateless, they fall out of the view state
         * and need special handling. With file submits we have to send a formData object
         * instead of an encoded string files cannot be sent that way
         */
        _this.isMultipartRequest = false;
        //a call to getViewState before must pass the encoded line
        //a call from getViewState passes the form element as datasource,
        //so we have two call points
        // atm we basically encode twice, to keep the code leaner
        // this will be later optmized, practically elements
        // which are already covered by an external viewstate do not need
        // the encoding a second time, because they are overwritten by the viewstate again
        if (isString(dataSource)) {
            _this.assignEncodedString(_this.dataSource);
        }
        else {
            _this.applyFormDataToConfig();
        }
        //now assign the external viewstate overrides
        if ('undefined' != typeof viewState) {
            _this.assignEncodedString(viewState);
        }
        if (executes) {
            _this.postInit.apply(_this, executes);
        }
        return _this;
    }
    /**
     * generic post init code, for now, this performs some post assign data post-processing
     * @param executes the executable dom nodes which need to be processed into the form data, which we can send
     * in our ajax request
     */
    XhrFormData.prototype.postInit = function () {
        var _this = this;
        var executes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            executes[_i] = arguments[_i];
        }
        var fetchFileInputs = function (id) {
            var INPUT_FILE = "input[type='file']";
            if (id == Const_1.IDENT_ALL) {
                return mona_dish_1.DQ.querySelectorAllDeep(INPUT_FILE);
            }
            else if (id == Const_1.IDENT_FORM) {
                return _this.dataSource.matchesSelector(INPUT_FILE) ?
                    _this.dataSource :
                    _this.dataSource.querySelectorAllDeep(INPUT_FILE);
            }
            else {
                var element = mona_dish_1.DQ.byId(id, true);
                return element.matchesSelector(INPUT_FILE) ? element : _this.getFileInputs(element);
            }
        };
        var inputExists = function (item) {
            return item.isPresent();
        };
        this.isMultipartRequest = mona_dish_1.LazyStream.of.apply(mona_dish_1.LazyStream, executes).map(fetchFileInputs)
            .filter(inputExists)
            .first().isPresent();
    };
    /**
     * special case view state handling
     *
     * @param form the form holding the view state value
     */
    XhrFormData.prototype.applyViewState = function (form) {
        var viewState = form.byId(Const_1.P_VIEWSTATE, true).inputValue;
        this.appendIf(viewState.isPresent(), Const_1.P_VIEWSTATE).value = viewState.value;
    };
    /**
     * assigns an url encoded string to this xhrFormData object
     * as key value entry
     * @param encoded
     */
    XhrFormData.prototype.assignEncodedString = function (encoded) {
        // this code filters out empty strings as key value pairs
        var keyValueEntries = decodeURIComponent(encoded).split(/&/gi)
            .filter(function (item) { return !!(item || '')
            .replace(/\s+/g, ''); });
        this.assignString(keyValueEntries);
    };
    /**
     * assign a set of key value pairs passed as array ['key=val1', 'key2=val2']
     * @param keyValueEntries
     */
    XhrFormData.prototype.assignString = function (keyValueEntries) {
        var toMerge = new ExtDomQuery_1.ExtConfig({});
        function splitToKeyVal(line) {
            return line.split(/=(.*)/gi);
        }
        function fixKeyWithoutVal(keyVal) {
            var _a, _b;
            return keyVal.length < 3 ? [(_a = keyVal === null || keyVal === void 0 ? void 0 : keyVal[0]) !== null && _a !== void 0 ? _a : [], (_b = keyVal === null || keyVal === void 0 ? void 0 : keyVal[1]) !== null && _b !== void 0 ? _b : []] : keyVal;
        }
        //TODO fix files...
        mona_dish_1.Stream.of.apply(mona_dish_1.Stream, keyValueEntries).map(function (line) { return splitToKeyVal(line); })
            //special case of having keys without values
            .map(function (keyVal) { return fixKeyWithoutVal(keyVal); })
            .each(function (keyVal) {
            var _a, _b;
            toMerge.append(keyVal[0]).value = (_b = (_a = keyVal === null || keyVal === void 0 ? void 0 : keyVal.splice(1)) === null || _a === void 0 ? void 0 : _a.join("")) !== null && _b !== void 0 ? _b : "";
        });
        //merge with overwrite but no append! (aka no double entries are allowed)
        this.shallowMerge(toMerge);
    };
    /**
     * @returns a Form data representation, this is needed for file submits
     */
    XhrFormData.prototype.toFormData = function () {
        var ret = new FormData();
        this.appendInputs(ret);
        return ret;
    };
    XhrFormData.prototype.resolveSubmitIdentifier = function (elem) {
        var _a;
        var identifier = elem.name;
        identifier = (((_a = elem === null || elem === void 0 ? void 0 : elem.name) !== null && _a !== void 0 ? _a : "").replace(/s+/gi, "") == "") ? elem.id : identifier;
        return identifier;
    };
    /**
     * returns an encoded string representation of our xhr form data
     *
     * @param defaultStr optional default value if nothing is there to encode
     */
    XhrFormData.prototype.toString = function (defaultStr) {
        var _this = this;
        if (defaultStr === void 0) { defaultStr = Const_1.EMPTY_STR; }
        if (this.isAbsent()) {
            return defaultStr;
        }
        var entries = mona_dish_1.LazyStream.of.apply(mona_dish_1.LazyStream, Object.keys(this.value)).filter(function (key) { return _this.value.hasOwnProperty(key); })
            .flatMap(function (key) { return mona_dish_1.Stream.of.apply(mona_dish_1.Stream, _this.value[key]).map(function (val) { return [key, val]; })
            //we cannot encode file elements that is handled by multipart requests anyway
            .filter(function (_a) {
            var value = _a[1];
            return !(value instanceof ExtDomQuery_1.ExtDomQuery.global().File);
        })
            .collect(new mona_dish_1.ArrayCollector()); })
            .map(function (keyVal) {
            return "".concat(encodeURIComponent(keyVal[0]), "=").concat(encodeURIComponent(keyVal[1]));
        })
            .collect(new mona_dish_1.ArrayCollector());
        return entries.join("&");
    };
    /**
     * helper to fetch all file inputs from as given root element
     * @param rootElement
     * @private
     */
    XhrFormData.prototype.getFileInputs = function (rootElement) {
        var rootFileInputs = rootElement
            .filter(function (elem) { return elem.matchesSelector("input[type='file']"); });
        var childFileInputs = rootElement
            .querySelectorAll("input[type='file']");
        return rootFileInputs.concat(childFileInputs);
    };
    /**
     * encode the given fields and apply the view state
     * @private
     */
    XhrFormData.prototype.applyFormDataToConfig = function () {
        //encode and append the issuing item if not a partial ids array of ids is passed
        /*
         * Spec. 13.3.1
         * Collect and encode input elements.
         * Additionally the hidden element jakarta.faces.ViewState
         * Enhancement partial page submit
         *
         */
        this.encodeSubmittableFields(this, this.dataSource, this.partialIds);
        if (this.getIf(Const_1.P_VIEWSTATE).isPresent()) {
            return;
        }
        this.applyViewState(this.dataSource);
    };
    /**
     * determines fields to submit
     * @param {Object} targetBuf - the target form buffer receiving the data
     * @param {Node} parentItem - form element item is nested in
     * @param {Array} partialIds - ids fo PPS
     */
    XhrFormData.prototype.encodeSubmittableFields = function (targetBuf, parentItem, partialIds) {
        var toEncode = null;
        if (this.partialIds && this.partialIds.length) {
            // in case of our myfaces reduced ppr we
            // only submit the partials
            this._value = {};
            toEncode = new (mona_dish_1.DQ.bind.apply(mona_dish_1.DQ, __spreadArray([void 0], this.partialIds, false)))();
        }
        else {
            if (parentItem.isAbsent())
                throw 'NO_PAR_ITEM';
            toEncode = parentItem;
        }
        //lets encode the form elements
        this.shallowMerge(toEncode.deepElements.encodeFormElement());
    };
    XhrFormData.prototype.appendInputs = function (ret) {
        var _this = this;
        mona_dish_1.Stream.of.apply(mona_dish_1.Stream, Object.keys(this.value)).each(function (key) {
            mona_dish_1.Stream.of.apply(mona_dish_1.Stream, _this.value[key]).each(function (item) { return ret.append(key, item); });
        });
    };
    return XhrFormData;
}(mona_dish_1.Config));
exports.XhrFormData = XhrFormData;


/***/ }),

/***/ "./src/main/typescript/impl/xhrCore/XhrRequest.ts":
/*!********************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/XhrRequest.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.XhrRequest = void 0;
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
var AjaxImpl_1 = __webpack_require__(/*! ../AjaxImpl */ "./src/main/typescript/impl/AjaxImpl.ts");
var XhrFormData_1 = __webpack_require__(/*! ./XhrFormData */ "./src/main/typescript/impl/xhrCore/XhrFormData.ts");
var ErrorData_1 = __webpack_require__(/*! ./ErrorData */ "./src/main/typescript/impl/xhrCore/ErrorData.ts");
var EventData_1 = __webpack_require__(/*! ./EventData */ "./src/main/typescript/impl/xhrCore/EventData.ts");
var Lang_1 = __webpack_require__(/*! ../util/Lang */ "./src/main/typescript/impl/util/Lang.ts");
var Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
var RequestDataResolver_1 = __webpack_require__(/*! ./RequestDataResolver */ "./src/main/typescript/impl/xhrCore/RequestDataResolver.ts");
var failSaveExecute = Lang_1.ExtLang.failSaveExecute;
/**
 * Faces XHR Request Wrapper
 * as AsyncRunnable for our Asynchronous queue
 *
 * The idea is that we basically just enqueue
 * a single ajax request into our queue
 * and let the queue do the processing.
 *
 */
var XhrRequest = /** @class */ (function () {
    /**
     * Required Parameters
     *
     * @param source the issuing element
     * @param sourceForm the form which is related to the issuing element
     * @param requestContext the request context with all pass through values
     *
     * Optional Parameters
     *
     * @param internalContext internal context with internal info which is passed through, not used by the user
     * @param partialIdsArray an optional restricting partial ids array for encoding
     * @param timeout optional xhr timeout
     * @param ajaxType optional request type, default "POST"
     * @param contentType optional content type, default "application/x-www-form-urlencoded"
     * @param xhrObject optional xhr object which must fulfill the XMLHTTPRequest api, default XMLHttpRequest
     */
    function XhrRequest(source, sourceForm, requestContext, internalContext, partialIdsArray, timeout, ajaxType, contentType, xhrObject) {
        if (partialIdsArray === void 0) { partialIdsArray = []; }
        if (timeout === void 0) { timeout = Const_1.NO_TIMEOUT; }
        if (ajaxType === void 0) { ajaxType = Const_1.REQ_TYPE_POST; }
        if (contentType === void 0) { contentType = Const_1.URL_ENCODED; }
        if (xhrObject === void 0) { xhrObject = new XMLHttpRequest(); }
        var _this = this;
        this.source = source;
        this.sourceForm = sourceForm;
        this.requestContext = requestContext;
        this.internalContext = internalContext;
        this.partialIdsArray = partialIdsArray;
        this.timeout = timeout;
        this.ajaxType = ajaxType;
        this.contentType = contentType;
        this.xhrObject = xhrObject;
        this.stopProgress = false;
        /**
         * helper support so that we do not have to drag in Promise shims
         */
        this.catchFunctions = [];
        this.thenFunctions = [];
        // we omit promises here because we have to deal with cancel functionality,
        // and promises to not provide that (yet) instead we have our async queue
        // which uses an api internally, which is very close to promises
        this.registerXhrCallbacks(function (data) {
            _this.resolve(data);
        }, function (data) {
            _this.reject(data);
        });
    }
    XhrRequest.prototype.start = function () {
        var _this = this;
        var _a;
        var ignoreErr = failSaveExecute;
        var xhrObject = this.xhrObject;
        var executesArr = function () {
            return _this.requestContext.getIf(Const_1.CTX_PARAM_PASS_THR, Const_1.P_EXECUTE).get("none").value.split(/\s+/gi);
        };
        try {
            var formElement = this.sourceForm.getAsElem(0).value;
            var viewState = ((_a = window === null || window === void 0 ? void 0 : window.faces) !== null && _a !== void 0 ? _a : window === null || window === void 0 ? void 0 : window.jsf).getViewState(formElement);
            // encoded we need to decode
            // We generated a base representation of the current form
            // in case someone has overloaded the viewState with additional decorators we merge
            // that in, there is no way around it, the spec allows it and getViewState
            // must be called, so whatever getViewState delivers has higher priority then
            // whatever the formData object delivers
            // the partialIdsArray arr is almost deprecated legacy code where we allowed to send a separate list of partial
            // ids for reduced load and server processing, this will be removed soon, we can handle the same via execute
            // anyway TODO remove the partial ids array
            var formData = new XhrFormData_1.XhrFormData(this.sourceForm, viewState, executesArr(), this.partialIdsArray);
            this.contentType = formData.isMultipartRequest ? "undefined" : this.contentType;
            // next step the pass through parameters are merged in for post params
            var requestContext = this.requestContext;
            var passThroughParams = requestContext.getIf(Const_1.CTX_PARAM_PASS_THR);
            // this is an extension where we allow pass through parameters to be sent down additionally
            // this can be used and is used in the impl to enrich the post request parameters with additional
            // information
            formData.shallowMerge(passThroughParams, true, true);
            this.responseContext = passThroughParams.deepCopy;
            // we have to shift the internal passthroughs around to build up our response context
            var responseContext = this.responseContext;
            responseContext.assign(Const_1.CTX_PARAM_MF_INTERNAL).value = this.internalContext.value;
            // per spec the onevent and onerror handlers must be passed through to the response
            responseContext.assign(Const_1.ON_EVENT).value = requestContext.getIf(Const_1.ON_EVENT).value;
            responseContext.assign(Const_1.ON_ERROR).value = requestContext.getIf(Const_1.ON_ERROR).value;
            xhrObject.open(this.ajaxType, (0, RequestDataResolver_1.resolveFinalUrl)(this.sourceForm, formData, this.ajaxType), true);
            // adding timeout
            this.timeout ? xhrObject.timeout = this.timeout : null;
            // a bug in the xhr stub library prevents the setRequestHeader to be properly executed on fake xhr objects
            // normal browsers should resolve this
            // tests can quietly fail on this one
            if (this.contentType != "undefined") {
                ignoreErr(function () { return xhrObject.setRequestHeader(Const_1.CONTENT_TYPE, "".concat(_this.contentType, "; charset=utf-8")); });
            }
            ignoreErr(function () { return xhrObject.setRequestHeader(Const_1.HEAD_FACES_REQ, Const_1.VAL_AJAX); });
            // probably not needed anymore, will test this
            // some webkit based mobile browsers do not follow the w3c spec of
            // setting, they accept headers automatically
            ignoreErr(function () { return xhrObject.setRequestHeader(Const_1.REQ_ACCEPT, Const_1.STD_ACCEPT); });
            this.sendEvent(Const_1.BEGIN);
            this.sendRequest(formData);
        }
        catch (e) {
            // _onError
            this.handleError(e);
        }
        return this;
    };
    XhrRequest.prototype.cancel = function () {
        try {
            this.xhrObject.abort();
        }
        catch (e) {
            this.handleError(e);
        }
    };
    XhrRequest.prototype.resolve = function (data) {
        mona_dish_1.Stream.of.apply(mona_dish_1.Stream, this.thenFunctions).reduce(function (inputVal, thenFunc) {
            return thenFunc(inputVal);
        }, data);
    };
    XhrRequest.prototype.reject = function (data) {
        mona_dish_1.Stream.of.apply(mona_dish_1.Stream, this.catchFunctions).reduce(function (inputVal, catchFunc) {
            return catchFunc(inputVal);
        }, data);
    };
    XhrRequest.prototype.catch = function (func) {
        this.catchFunctions.push(func);
        return this;
    };
    XhrRequest.prototype.finally = function (func) {
        // no ie11 support we probably are going to revert to shims for that one
        this.catchFunctions.push(func);
        this.thenFunctions.push(func);
        return this;
    };
    XhrRequest.prototype.then = function (func) {
        this.thenFunctions.push(func);
        return this;
    };
    /**
     * attaches the internal event and processing
     * callback within the promise to our xhr object
     *
     * @param resolve
     * @param reject
     */
    XhrRequest.prototype.registerXhrCallbacks = function (resolve, reject) {
        var _this = this;
        var xhrObject = this.xhrObject;
        xhrObject.onabort = function () {
            _this.onAbort(reject);
        };
        xhrObject.ontimeout = function () {
            _this.onTimeout(reject);
        };
        xhrObject.onload = function () {
            _this.onSuccess(resolve);
        };
        xhrObject.onloadend = function () {
            _this.onDone(_this.xhrObject, resolve);
        };
        xhrObject.onerror = function (errorData) {
            // some browsers trigger an error when cancelling a request internally
            // in this case we simply ignore the request and clear up the queue, because
            // it is not safe anymore to proceed with the current queue
            // This bypasses a Safari issue where it keeps requests hanging after page unload
            // and then triggers a cancel error on then instead of just stopping
            // and clearing the code
            if (_this.isCancelledResponse(_this.xhrObject)) {
                reject();
                _this.stopProgress = true;
                return;
            }
            _this.onError(errorData, reject);
        };
    };
    XhrRequest.prototype.isCancelledResponse = function (currentTarget) {
        return (currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.status) === 0 && // cancelled by browser
            (currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.readyState) === 4 &&
            (currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.responseText) === '' &&
            (currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.responseXML) === null;
    };
    /*
         * xhr processing callbacks
         *
         * Those methods are the callbacks called by
         * the xhr object depending on its own state
         */
    XhrRequest.prototype.onAbort = function (reject) {
        reject();
    };
    XhrRequest.prototype.onTimeout = function (reject) {
        this.sendEvent(Const_1.STATE_EVT_TIMEOUT);
        reject();
    };
    XhrRequest.prototype.onSuccess = function (resolve) {
        var _a, _b, _c;
        this.sendEvent(Const_1.COMPLETE);
        // malformed responses always result in empty response xml
        // per spec a valid response cannot be empty
        if (!((_a = this === null || this === void 0 ? void 0 : this.xhrObject) === null || _a === void 0 ? void 0 : _a.responseXML)) {
            this.handleMalFormedXML(resolve);
            return;
        }
        ((_b = window === null || window === void 0 ? void 0 : window.faces) !== null && _b !== void 0 ? _b : window.jsf).ajax.response(this.xhrObject, (_c = this.responseContext.value) !== null && _c !== void 0 ? _c : {});
    };
    XhrRequest.prototype.handleMalFormedXML = function (resolve) {
        var _a;
        this.stopProgress = true;
        var errorData = {
            type: Const_1.ERROR,
            status: Const_1.MALFORMEDXML,
            responseCode: 200,
            responseText: (_a = this.xhrObject) === null || _a === void 0 ? void 0 : _a.responseText,
            source: {
                id: this.source.id.value
            }
        };
        try {
            this.handleError(errorData, true);
        }
        finally {
            // we issue a resolve in this case to allow the system to recover
            // reject would clean up the queue
            resolve(errorData);
        }
        // non blocking non clearing
    };
    XhrRequest.prototype.onDone = function (data, resolve) {
        // if stop progress a special handling including resolve is already performed
        if (this.stopProgress) {
            return;
        }
        resolve(data);
    };
    XhrRequest.prototype.onError = function (errorData, reject) {
        this.handleError(errorData);
        reject();
    };
    XhrRequest.prototype.sendRequest = function (formData) {
        var isPost = this.ajaxType != Const_1.REQ_TYPE_GET;
        if (formData.isMultipartRequest) {
            // in case of a multipart request we send in a formData object as body
            this.xhrObject.send((isPost) ? formData.toFormData() : null);
        }
        else {
            // in case of a normal request we send it normally
            this.xhrObject.send((isPost) ? formData.toString() : null);
        }
    };
    /*
     * other helpers
     */
    XhrRequest.prototype.sendEvent = function (evtType) {
        var eventData = EventData_1.EventData.createFromRequest(this.xhrObject, this.requestContext, evtType);
        try {
            // User code error, we might cover
            // this in onError, but also we cannot swallow it.
            // We need to resolve the local handlers lazily,
            // because some frameworks might decorate them over the context in the response
            var eventHandler = (0, RequestDataResolver_1.resolveHandlerFunc)(this.requestContext, this.responseContext, Const_1.ON_EVENT);
            AjaxImpl_1.Implementation.sendEvent(eventData, eventHandler);
        }
        catch (e) {
            this.handleError(e);
            throw e;
        }
    };
    XhrRequest.prototype.handleError = function (exception, responseFormatError) {
        if (responseFormatError === void 0) { responseFormatError = false; }
        var errorData = (responseFormatError) ? ErrorData_1.ErrorData.fromHttpConnection(exception.source, exception.type, exception.status, exception.responseText, exception.responseCode, exception.status) : ErrorData_1.ErrorData.fromClient(exception);
        var eventHandler = (0, RequestDataResolver_1.resolveHandlerFunc)(this.requestContext, this.responseContext, Const_1.ON_ERROR);
        AjaxImpl_1.Implementation.sendError(errorData, eventHandler);
    };
    return XhrRequest;
}());
exports.XhrRequest = XhrRequest;


/***/ }),

/***/ "./src/main/typescript/myfaces/OamSubmit.ts":
/*!**************************************************!*\
  !*** ./src/main/typescript/myfaces/OamSubmit.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.oam = void 0;
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
/**
 * legacy code to enable various aspects
 * of myfaces, used to be rendered inline
 * for jsf 2.0 we can externalize it into its own custom resource
 *
 * note this is a straight 1:1 port from the existing codebase
 * (not too much work has been spent here, the important thing is, that
 * the namespace and functions need to be kept intact for legacy code)
 *
 * we might move the code over in the future, but for now a straight 1:1 port suffices
 */
var oam;
(function (oam) {
    /**
     * sets a hidden input field
     * @param formName the formName
     * @param name the hidden field
     * @param value the value to be rendered
     */
    oam.setHiddenInput = function (formName, name, value) {
        mona_dish_1.DQ.byId(document.forms[formName])
            .each(function (form) {
            var input = form.querySelectorAll("input[type='hidden'][name='".concat(name, "']"));
            if (input.isPresent()) {
                input.inputValue.value = value;
            }
            else {
                var newInput = mona_dish_1.DQ.fromMarkup("<input type='hidden' id='".concat(name, "' name='").concat(name, "'>"));
                newInput.inputValue.value = value;
                newInput.appendTo(form);
            }
        });
    };
    /**
     * clears a hidden input field
     *
     * @param formName formName for the input
     * @param name the name of the input field
     */
    oam.clearHiddenInput = function (formName, name) {
        var _a, _b, _c;
        var element = (_c = (_b = (_a = document.forms) === null || _a === void 0 ? void 0 : _a[formName]) === null || _b === void 0 ? void 0 : _b.elements) === null || _c === void 0 ? void 0 : _c[name];
        if (!element) {
            return;
        }
        mona_dish_1.DQ.byId(element).delete();
    };
    // noinspection JSUnusedGlobalSymbols
    /**
     * does special form submit remapping
     * re-maps the issuing command link into something,
     * a decode of the command link on the server can understand
     *
     * @param formName
     * @param linkId
     * @param target
     * @param params
     */
    oam.submitForm = function (formName, linkId, target, params) {
        var _a, _b, _c, _d;
        var clearFn = 'clearFormHiddenParams_' + formName.replace(/-/g, '\$:').replace(/:/g, '_');
        (_a = window === null || window === void 0 ? void 0 : window[clearFn]) === null || _a === void 0 ? void 0 : _a.call(window, formName);
        //autoscroll code
        if (((_d = (_c = (_b = window === null || window === void 0 ? void 0 : window.myfaces) === null || _b === void 0 ? void 0 : _b.core) === null || _c === void 0 ? void 0 : _c.config) === null || _d === void 0 ? void 0 : _d.autoScroll) && (window === null || window === void 0 ? void 0 : window.getScrolling)) {
            myfaces.oam.setHiddenInput(formName, 'autoScroll', window === null || window === void 0 ? void 0 : window.getScrolling());
        }
        mona_dish_1.Stream.ofAssoc(params).each(function (param) {
            myfaces.oam.setHiddenInput(formName, param[0], param[1]);
        });
        //we call the namespaced function, to allow decoration, via a direct call we would
        myfaces.oam.setHiddenInput(formName, "".concat(formName, ":_idcl"), linkId);
        mona_dish_1.DQ.byId(document.forms[formName]).each(function (form) {
            var _a;
            var ATTR_TARGET = "target";
            var formElement = form.getAsElem(0).value;
            var oldTarget = form.attr(ATTR_TARGET).value;
            form.attr(ATTR_TARGET).value = target;
            var result = (_a = formElement === null || formElement === void 0 ? void 0 : formElement.onsubmit) === null || _a === void 0 ? void 0 : _a.call(formElement, null);
            try {
                if ((!!result) || 'undefined' == typeof result) {
                    formElement.submit();
                }
            }
            catch (e) {
                window === null || window === void 0 ? void 0 : window.console.error(e);
            }
            finally {
                form.attr(ATTR_TARGET).value = oldTarget;
                mona_dish_1.Stream.ofAssoc(params).each(function (param) {
                    myfaces.oam.clearHiddenInput(formName, param[0]);
                });
                myfaces.oam.clearHiddenInput(formName, "".concat(formName, ":_idcl"));
            }
        });
        return false;
    };
})(oam = exports.oam || (exports.oam = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!****************************************!*\
  !*** ./src/main/typescript/api/jsf.ts ***!
  \****************************************/
/*! Licensed to the Apache Software Foundation (ASF) under one or more
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

var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.myfaces = exports.jsf = void 0;
/**
 * jsf.js init layer which provides as per spec the proper
 * window namespace if it does not exist already
 * if this file is included then the code falls back with its namespaces
 * on jsf2.3 or earlier level, for 4.0+ please include faces.js
 */
if (!(window === null || window === void 0 ? void 0 : window.jsf)) {
    var faces_1 = (__webpack_require__(/*! ./_api */ "./src/main/typescript/api/_api.ts").faces);
    window['jsf'] = (_a = window === null || window === void 0 ? void 0 : window.jsf) !== null && _a !== void 0 ? _a : faces_1;
    window.jsf.specversion = 230000;
    delete window.jsf.contextpath;
    var faces4Init_1 = faces_1.push.init;
    /*
     * we shim back the breaking api change from 3.0 to 4.0
     * onerror is gone
     */
    faces_1.push.init = function (socketClientId, url, channel, onopen, onmessage, 
    // no on error api change for 4.0
    //onerror: Function,
    onclose, behaviors, autoConnect) {
        faces4Init_1(socketClientId, url, channel, onopen, onmessage, null, onclose, behaviors, autoConnect);
    };
}
if (!((_b = window === null || window === void 0 ? void 0 : window.myfaces) === null || _b === void 0 ? void 0 : _b.ab)) {
    var myfaces_1 = (__webpack_require__(/*! ./_api */ "./src/main/typescript/api/_api.ts").myfaces);
    //namespace might be extended is not exclusively reserved so we merge
    window["myfaces"] = (_c = window === null || window === void 0 ? void 0 : window.myfaces) !== null && _c !== void 0 ? _c : {};
    if (!((_d = window === null || window === void 0 ? void 0 : window.myfaces) === null || _d === void 0 ? void 0 : _d.ab)) {
        var myfaces_2 = (__webpack_require__(/*! ./_api */ "./src/main/typescript/api/_api.ts").myfaces);
        //namespace might be extended is not exclusively reserved so we merge
        window["myfaces"] = (_e = window === null || window === void 0 ? void 0 : window.myfaces) !== null && _e !== void 0 ? _e : {};
        Object.keys(myfaces_2).forEach(function (key) { var _a, _b; return window.myfaces[key] = (_b = (_a = window.myfaces) === null || _a === void 0 ? void 0 : _a[key]) !== null && _b !== void 0 ? _b : myfaces_2[key]; });
    }
}
exports.jsf = window.jsf;
exports.myfaces = window.myfaces;

})();

var __webpack_export_target__ = window;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=jsf-development.js.map
//# sourceMappingURL=jsf-development.js.map.jsf?ln=javax.faces