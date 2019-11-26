(function(e, a) { for(var i in a) e[i] = a[i]; }(window, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path='./ApiInterfaces.ts'/>
///<reference types='../../Types/Types'/>
var AjaxImpl_1 = __webpack_require__(1);
var PushImpl_1 = __webpack_require__(24);
var mf_impl = (_c = (_b = (_a = window) === null || _a === void 0 ? void 0 : _a.myfaces) === null || _b === void 0 ? void 0 : _b._impl, (_c !== null && _c !== void 0 ? _c : {}));
var jsf;
(function (jsf) {
    "use strict";
    /*
     * Version of the implementation for the jsf.js.
     * <p />
     * as specified within the jsf specifications jsf.html:
     * <ul>
     * <li>left two digits major release number</li>
     * <li>middle two digits minor spec release number</li>
     * <li>right two digits bug release number</li>
     * </ul>
     * @constant
     */
    jsf.specversion = 220000;
    /**
     * Implementation version as specified within the jsf specification.
     * <p />
     * A number increased with every implementation version
     * and reset by moving to a new spec release number
     *
     * @constant
     */
    jsf.implversion = 0;
    /**
     * SeparatorChar as defined by UINamingContainer.getNamingContainerSeparatorChar()
     * @type {Char}
     */
    jsf.separatorchar = getSeparatorChar();
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
     * <i>javax.faces.application.Application.getProjectStage()</i>
     */
    function getProjectStage() {
        return AjaxImpl_1.Implementation.getProjectStage();
    }
    jsf.getProjectStage = getProjectStage;
    /**
     * collect and encode data for a given form element (must be of type form)
     * find the javax.faces.ViewState element and encode its value as well!
     * return a concatenated string of the encoded values!
     *
     * @throws an exception in case of the given element not being of type form!
     * https://issues.apache.org/jira/browse/MYFACES-2110
     */
    function getViewState(formElement) {
        return AjaxImpl_1.Implementation.getViewState(formElement);
    }
    jsf.getViewState = getViewState;
    /**
     * returns the window identifier for the given node / window
     * @param {optional String | DomNode}  the node for which the client identifier has to be determined
     * @return the window identifier or null if none is found
     */
    function getClientWindow(rootNode) {
        return AjaxImpl_1.Implementation.getClientWindow(rootNode);
    }
    jsf.getClientWindow = getClientWindow;
    //private helper functions
    function getSeparatorChar() {
        return AjaxImpl_1.Implementation.getSeparatorChar();
    }
    //We hook the old namespace system into our npm system
    if ("undefined" == window.jsf) {
        window.jsf = jsf;
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
            //Implementation.getInstance().requestInternal(element, event, options);
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
         * @param {function} errorListener error handler must be of the format <i>function errorListener(&lt;errorData&gt;)</i>
         */
        function addOnError(errorFunc) {
            AjaxImpl_1.Implementation.addOnError(errorFunc);
        }
        ajax.addOnError = addOnError;
        /**
         * Adds a global event listener to the ajax event queue. The event listener must be a function
         * of following format: <i>function eventListener(&lt;eventData&gt;)</i>
         *
         * @param {function} eventListener event must be of the format <i>function eventListener(&lt;eventData&gt;)</i>
         */
        function addOnEvent(eventFunc) {
            AjaxImpl_1.Implementation.addOnEvent(eventFunc);
        }
        ajax.addOnEvent = addOnEvent;
    })(ajax = jsf.ajax || (jsf.ajax = {}));
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
            return AjaxImpl_1.Implementation.chain.apply(AjaxImpl_1.Implementation, __spreadArrays([source, event], funcs));
        }
        util.chain = chain;
    })(util = jsf.util || (jsf.util = {}));
    var push;
    (function (push) {
        /**
         * @param {function} onopen The function to be invoked when the web socket is opened.
         * @param {function} onmessage The function to be invoked when a message is received.
         * @param {function} onclose The function to be invoked when the web socket is closed.
         * @param {boolean} autoconnect Whether or not to immediately open the socket. Defaults to <code>false</code>.
         */
        function init(socketClientId, uri, channel, onopen, onmessage, onclose, behaviorScripts, autoconnect) {
            PushImpl_1.PushImpl.init(socketClientId, uri, channel, onopen, onmessage, onclose, behaviorScripts, autoconnect);
        }
        push.init = init;
        /**
         * Open the web socket on the given channel.
         * @param {string} channel The name of the web socket channel.
         * @throws {Error} When channel is unknown.
         */
        function open(socketClientId) {
            PushImpl_1.PushImpl.open(socketClientId);
        }
        push.open = open;
        /**
         * Close the web socket on the given channel.
         * @param {string} channel The name of the web socket channel.
         * @throws {Error} When channel is unknown.
         */
        function close(socketClientId) {
            PushImpl_1.PushImpl.close(socketClientId);
        }
        push.close = close;
    })(push = jsf.push || (jsf.push = {}));
})(jsf = exports.jsf || (exports.jsf = {}));
//fullfill the window contract
var myfaces2;
(function (myfaces2) {
    //legacy compatibility
    myfaces2._impl = mf_impl;
    /**
     * AB function similar to mojarra and Primefaces
     * not part of the spec but a convenience accesor method
     * Code provided by Thomas Andraschko
     *
     * @param source the event source
     * @param event the event
     * @param eventName event name for java.javax.faces.behavior.evemnt
     * @param execute execute list as passed down in jsf.ajax.request
     * @param render
     * @param options
     */
    function ab(source, event, eventName, execute, render, options) {
        if (options === void 0) { options = {}; }
        if (eventName) {
            options["javax.faces.behavior.event"] = eventName;
        }
        if (execute) {
            options["execute"] = execute;
        }
        if (render) {
            options["render"] = render;
        }
        jsf.ajax.request(source, event, options);
    }
    myfaces2.ab = ab;
})(myfaces2 = exports.myfaces2 || (exports.myfaces2 = {}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var myfacesConfig = __webpack_require__(2);
var Response_1 = __webpack_require__(3);
var XhrRequest_1 = __webpack_require__(20);
var AsyncQueue_1 = __webpack_require__(22);
var Monad_1 = __webpack_require__(6);
var Const_1 = __webpack_require__(11);
var Assertions_1 = __webpack_require__(13);
var XhrFormData_1 = __webpack_require__(21);
var ExtDomQuery_1 = __webpack_require__(23);
var ErrorData_1 = __webpack_require__(16);
var DomQuery_1 = __webpack_require__(5);
var monadish_1 = __webpack_require__(4);
var SourcesCollectors_1 = __webpack_require__(8);
var Lang_1 = __webpack_require__(14);
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
 *   blockfilter for the passthrough filtering; the attributes given here
 *   will not be transmitted from the options into the passthrough
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
    BlockFilter["windowId"] = "windowId";
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
    var trim = monadish_1.Lang.trim;
    var getMessage = Lang_1.ExtLang.getMessage;
    var getForm = Lang_1.ExtLang.getForm;
    var getLocalOrGlobalConfig = Lang_1.ExtLang.getLocalOrGlobalConfig;
    var getEvent = Lang_1.ExtLang.getEvent;
    var getGlobalConfig = Lang_1.ExtLang.getGlobalConfig;
    var assert = Assertions_1.Assertions.assert;
    var globalConfig = myfacesConfig.myfaces.config;
    var projectStage = null;
    var separator = null;
    var eventQueue = [];
    var errorQueue = [];
    Implementation.requestQueue = null;
    /*error reporting threshold*/
    var threshold = "ERROR";
    //we need to proxy this in the tests
    Implementation.queueHandler = {
        /**
         * public to make it shimmable for tests
         */
        addRequestToQueue: function (elem, form, reqCtx, respPassThr, delay, timeout) {
            if (delay === void 0) { delay = 0; }
            if (timeout === void 0) { timeout = 0; }
            Implementation.requestQueue = (Implementation.requestQueue !== null && Implementation.requestQueue !== void 0 ? Implementation.requestQueue : new AsyncQueue_1.AsynchronouseQueue());
            Implementation.requestQueue.enqueue(new XhrRequest_1.XhrRequest(elem, form, reqCtx, respPassThr, [], timeout), delay);
        }
    };
    /**
     * fetches the separator char from the given script tags
     *
     * @return {char} the separator char for the given script tags
     */
    function getSeparatorChar() {
        var _a, _b, _c, _d, _e;
        return _e = (_c = (_b = (_a = this) === null || _a === void 0 ? void 0 : _a.globalConfig) === null || _b === void 0 ? void 0 : _b.separator, (_c !== null && _c !== void 0 ? _c : (_d = this) === null || _d === void 0 ? void 0 : _d.separator)), (_e !== null && _e !== void 0 ? _e : (separator = ExtDomQuery_1.ExtDomquery.searchJsfJsFor(/separator=([^&;]*)/).orElse(":").value));
    }
    Implementation.getSeparatorChar = getSeparatorChar;
    //for testing only
    function reset() {
        globalConfig = myfacesConfig.myfaces.config;
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
     * The value for it comes from the requestInternal parameter of the jsf.js script called "stage".
     */
    function getProjectStage() {
        var _a, _b, _c, _d, _e;
        return _e = (_c = (_b = (_a = this) === null || _a === void 0 ? void 0 : _a.globalConfig) === null || _b === void 0 ? void 0 : _b.projectStage, (_c !== null && _c !== void 0 ? _c : (_d = this) === null || _d === void 0 ? void 0 : _d.projectStage)), (_e !== null && _e !== void 0 ? _e : (projectStage = resolveProjectStateFromURL()));
    }
    Implementation.getProjectStage = getProjectStage;
    function resolveProjectStateFromURL() {
        /* run through all script tags and try to find the one that includes jsf.js */
        var foundStage = ExtDomQuery_1.ExtDomquery.searchJsfJsFor(/stage=([^&;]*)/).value;
        return (foundStage in ProjectStages) ? foundStage : null;
    }
    Implementation.resolveProjectStateFromURL = resolveProjectStateFromURL;
    function chain(source, event) {
        var funcs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            funcs[_i - 2] = arguments[_i];
        }
        var ret = true;
        var resolveAndExecute = function (func) {
            if ("string" != typeof func) {
                return (ret = ret && (func.call(source, event) !== false));
            }
            else {
                //either a function or a string can be passed in case of a string we have to wrap it into another function
                //it it is not a plain executable code but a definition
                var sourceCode = trim(func);
                if (sourceCode.indexOf("function ") == 0) {
                    sourceCode = "return " + sourceCode + " (event)";
                }
                return (ret = ret && (new Function("event", sourceCode).call(source, event) !== false));
            }
        };
        monadish_1.Stream.of.apply(monadish_1.Stream, funcs).each(function (func) { return resolveAndExecute(func); });
        return ret;
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
     * @param {String|Node} elem any dom element no matter being it html or jsf, from which the event is emitted
     * @param {|Event|} event any javascript event supported by that object
     * @param {|Object|} options  map of options being pushed into the ajax cycle
     *
     *
     * a) transformArguments out of the function
     * b) passThrough handling with a map copy with a filter map block map
     */
    function request(el, event, opts) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        /*
         *namespace remap for our local function context we mix the entire function namespace into
         *a local function variable so that we do not have to write the entire namespace
         *all the time
         */
        event = getEvent(event);
        //options not set we define a default one with nothing
        var options = new Monad_1.Config(opts).deepCopy;
        var elem = DomQuery_1.DQ.byId(el || event.target);
        var elementId = elem.id;
        var requestCtx = new Monad_1.Config({});
        var internalCtx = new Monad_1.Config({});
        Assertions_1.Assertions.assertRequestIntegrity(options, elem);
        applyWindowId(options);
        requestCtx.assign(Const_1.Const.CTX_PARAM_PASS_THR).value = fetchPassthroughValues(options.value);
        requestCtx.assignIf(!!event, Const_1.Const.CTX_PARAM_PASS_THR, Const_1.Const.P_EVT).value = (_a = event) === null || _a === void 0 ? void 0 : _a.type;
        /**
         * ajax pass through context with the source
         * onevent and onerror
         */
        requestCtx.assign(Const_1.Const.SOURCE).value = elementId.value;
        /**
         * on event and onError...
         * those values will be traversed later on
         * also into the response context
         */
        requestCtx.assign(Const_1.Const.ON_EVENT).value = (_b = options.value) === null || _b === void 0 ? void 0 : _b.onevent;
        requestCtx.assign(Const_1.Const.ON_ERROR).value = (_c = options.value) === null || _c === void 0 ? void 0 : _c.onerror;
        /**
         * lets drag the myfaces config params also in
         */
        requestCtx.assign(Const_1.Const.MYFACES).value = (_d = options.value) === null || _d === void 0 ? void 0 : _d.myfaces;
        /**
         * fetch the parent form
         *
         * note we also add an override possibility here
         * so that people can use dummy forms and work
         * with detached objects
         */
        var configId = (_g = (_f = (_e = requestCtx.value) === null || _e === void 0 ? void 0 : _e.myfaces) === null || _f === void 0 ? void 0 : _f.form, (_g !== null && _g !== void 0 ? _g : Const_1.Const.MF_NONE));
        var form = resolveForm(requestCtx, elem, event);
        /**
         * binding contract the javax.faces.source must be set
         */
        requestCtx.assign(Const_1.Const.CTX_PARAM_PASS_THR, Const_1.Const.P_PARTIAL_SOURCE).value = elementId.value;
        /**
         * javax.faces.partial.ajax must be set to true
         */
        requestCtx.assign(Const_1.Const.CTX_PARAM_PASS_THR, Const_1.Const.P_AJAX).value = true;
        /**
         * binding contract the javax.faces.source must be set
         */
        requestCtx.assign(Const_1.Const.CTX_PARAM_PASS_THR, Const_1.Const.P_PARTIAL_SOURCE).value = elementId.value;
        /**
         * if resetValues is set to true
         * then we have to set javax.faces.resetValues as well
         * as pass through parameter
         * the value has to be explicitly true, according to
         * the specs jsdoc
         */
        requestCtx.assignIf(true === ((_h = options.value) === null || _h === void 0 ? void 0 : _h.resetValues), Const_1.Const.CTX_PARAM_PASS_THR, Const_1.Const.P_RESET_VALUES).value = true;
        //additional meta information to speed things up, note internal non jsf
        //pass through options are stored under _mfInternal in the context
        internalCtx.assign(Const_1.Const.CTX_PARAM_SRC_FRM_ID).value = form.id.value;
        internalCtx.assign(Const_1.Const.CTX_PARAM_SRC_CTL_ID).value = elementId.value;
        internalCtx.assign(Const_1.Const.CTX_PARAM_TR_TYPE).value = Const_1.Const.REQ_TYPE_POST;
        //mojarra compatibility, mojarra is sending the form id as well
        //this is not documented behavior but can be determined by running
        //mojarra under blackbox conditions
        //i assume it does the same as our formId_submit=1 so leaving it out
        //wont hurt but for the sake of compatibility we are going to add it
        requestCtx.assign(Const_1.Const.CTX_PARAM_PASS_THR, form.id.value).value = form.id.value;
        applyClientWindowId(form, requestCtx);
        applyExecute(options, requestCtx, form, elementId.value);
        applyRender(options, requestCtx, form, elementId.value);
        var delay = resolveDelay(options, requestCtx);
        var timeout = resolveTimeout(options, requestCtx);
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
    function addOnError(errorListener) {
        /*error handling already done in the assert of the queue*/
        errorQueue.push(errorListener);
    }
    Implementation.addOnError = addOnError;
    function addOnEvent(eventListener) {
        /*error handling already done in the assert of the queue*/
        eventQueue.push(eventListener);
    }
    Implementation.addOnEvent = addOnEvent;
    /**
     * sends an event
     */
    function sendEvent(data, localHandler) {
        if (localHandler === void 0) { localHandler = function (data) { }; }
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
    /**
     * implementation triggering the error chain
     *
     * @param {Object} request the request object which comes from the xhr cycle
     * @param {Object} context (Map) the context object being pushed over the xhr cycle keeping additional metadata
     * @param {String} errorName the error name
     * @param {String} errorMessage the error name
     * @param {String} responseCode response Code
     * @param {String} responseMessage response Message
     *
     * @param {String} serverErrorName the server error name in case of a server error
     * @param {String} serverErrorMessage the server error message in case of a server error
     * @param {String} caller optional caller reference for extended error messages
     * @param {String} callFunc optional caller Function reference for extended error messages
     *
     *  handles the errors, in case of an onError exists within the context the onError is called as local error handler
     *  the registered error handlers in the queue receiv an error message to be dealt with
     *  and if the projectStage is at development an alert box is displayed
     *
     *  note: we have additional functionality here, via the global config myfaces.config.defaultErrorOutput a function can be provided
     *  which changes the default output behavior from alert to something else
     *
     *
     */
    function sendError(errorData, localHandler) {
        if (localHandler === void 0) { localHandler = function (data) { }; }
        localHandler(errorData);
        errorQueue.forEach(function (errorCallback) {
            errorCallback(errorData);
        });
        var displayError = getGlobalConfig("defaultErrorOutput", (console ? console.error : alert));
        displayError(errorData);
    }
    Implementation.sendError = sendError;
    /**
     * @return the client window id of the current window, if one is given
     */
    function getClientWindow(node) {
        var _a;
        var ALTERED = "___mf_id_altered__";
        var INIT = "___init____";
        /**
         * the search root for the dom element search
         */
        var searchRoot = new DomQuery_1.DQ(node || document.body);
        /**
         * a set of input elements holding the window id over the entire document
         */
        var windowIdHolders = searchRoot.querySelectorAll("form #" + Const_1.Const.P_WIN_ID);
        /**
         * lazy helper to fetch the window id from the window url
         */
        var fetchWindowIdFromUrl = function () { return ExtDomQuery_1.ExtDomquery.searchJsfJsFor(/jfwid=([^&;]*)/).orElse(null).value; };
        /**
         * functional double check based on stream reduction
         * the values should be identical or on INIT value which is a premise to
         * skip the first check
         *
         * @param value1
         * @param value2
         */
        var doubleCheck = function (value1, value2) {
            if (value1 == ALTERED) {
                return value1;
            }
            else if (value1 == INIT) {
                return value2;
            }
            else if (value1 != value2) {
                return ALTERED;
            }
            return value2;
        };
        /**
         * helper for cleaner code, maps the value from an item
         *
         * @param item
         */
        var getValue = function (item) { return item.attr("value").value; };
        /**
         * fetch the window id from the forms
         * window ids must be present in all forms
         * or non existent. If they exist all of them must be the same
         */
        var formWindowId = searchRoot.stream.map(getValue).reduce(doubleCheck, INIT);
        //if the resulting window id is set on altered then we have an unresolvable problem
        assert(formWindowId.value != ALTERED, "Multiple different windowIds found in document");
        /**
         * return the window id or null
         * prio, forms under node/document and if not given then from the url
         */
        return _a = formWindowId.value, (_a !== null && _a !== void 0 ? _a : fetchWindowIdFromUrl());
    }
    Implementation.getClientWindow = getClientWindow;
    /**
     * collect and encode data for a given form element (must be of type form)
     * find the javax.faces.ViewState element and encode its value as well!
     * return a concatenated string of the encoded values!
     *
     * @throws Error in case of the given element not being of type form!
     * https://issues.apache.org/jira/browse/MYFACES-2110
     */
    function getViewState(form) {
        /**
         *  typecheck assert!, we opt for strong typing here
         *  because it makes it easier to detect bugs
         */
        var element = DomQuery_1.DQ.byId(form);
        if (!element.isTag("form")) {
            throw new Error(getMessage("ERR_VIEWSTATE"));
        }
        var formData = new XhrFormData_1.XhrFormData(element);
        return formData.toString();
    }
    Implementation.getViewState = getViewState;
    //----------------------------------------------- Methods ---------------------------------------------------------------------
    function applyWindowId(options) {
        var _a, _b, _c;
        var windowId = (_c = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.windowId, (_c !== null && _c !== void 0 ? _c : ExtDomQuery_1.ExtDomquery.windowId));
        options.assignIf(!!windowId, Const_1.Const.P_WINDOW_ID).value = windowId;
        options.delete("windowId");
    }
    function applyRender(options, ctx, form, elementId) {
        if (options.getIf("render").isPresent()) {
            transformValues(ctx.getIf(Const_1.Const.CTX_PARAM_PASS_THR).get({}), Const_1.Const.P_RENDER, options.getIf("render").value, form, elementId);
        }
    }
    function applyExecute(options, ctx, form, elementId) {
        if (options.getIf(Const_1.Const.CTX_PARAM_EXECUTE).isPresent()) {
            /*the options must be a blank delimited list of strings*/
            /*compliance with Mojarra which automatically adds @this to an execute
             * the spec rev 2.0a however states, if none is issued nothing at all should be sent down
             */
            options.assign(Const_1.Const.CTX_PARAM_EXECUTE).value = options.getIf(Const_1.Const.CTX_PARAM_EXECUTE).value + " @this";
            transformValues(ctx.getIf(Const_1.Const.CTX_PARAM_PASS_THR).get({}), Const_1.Const.P_EXECUTE, options.getIf(Const_1.Const.CTX_PARAM_EXECUTE).value, form, elementId);
        }
        else {
            ctx.assign(Const_1.Const.CTX_PARAM_PASS_THR, Const_1.Const.P_EXECUTE).value = elementId;
        }
    }
    function applyClientWindowId(form, ctx) {
        var clientWindow = jsf.getClientWindow(form.getAsElem(0).value);
        if (clientWindow) {
            ctx.assign(Const_1.Const.CTX_PARAM_PASS_THR, Const_1.Const.P_CLIENTWINDOW).value = clientWindow;
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
    function transformValues(targetConfig, targetKey, userValues, issuingForm, issuingElementId) {
        //a cleaner implementation of the transform list method
        var iterValues = (userValues) ? trim(userValues).split(/\s+/gi) : [];
        var ret = [];
        var processed = {};
        //TODO make this code cleaner
        //the idea is simply to loop over all values and then replace
        //their generic values and filter out doubles
        //this is more readable than the old indexed based solution
        //and not really slower because we had to build up the index in our old solution
        //anyway
        for (var cnt = 0; cnt < iterValues.length; cnt++) {
            //avoid doubles
            if (iterValues[cnt] in processed) {
                continue;
            }
            switch (iterValues[cnt]) {
                //@none no values should be sent
                case Const_1.Const.IDENT_NONE:
                    return targetConfig.delete(targetKey);
                //@all is a pass through case according to the spec
                case Const_1.Const.IDENT_ALL:
                    targetConfig.assign(targetKey).value = Const_1.Const.IDENT_ALL;
                    return targetConfig;
                //@form pushes the issuing form id into our list
                case Const_1.Const.IDENT_FORM:
                    ret.push(issuingForm.id.value);
                    processed[issuingForm.id.value] = true;
                    break;
                //@this is replaced with the current issuing element id
                case Const_1.Const.IDENT_THIS:
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
    function fetchPassthroughValues(mappedOpts) {
        return monadish_1.Stream.ofAssoc(mappedOpts)
            .filter(function (item) { return !(item[0] in BlockFilter); })
            .collect(new SourcesCollectors_1.AssocArrayCollector());
    }
    function resolveForm(requestCtx, elem, event) {
        var _a, _b, _c;
        var configId = (_c = (_b = (_a = requestCtx.value) === null || _a === void 0 ? void 0 : _a.myfaces) === null || _b === void 0 ? void 0 : _b.form, (_c !== null && _c !== void 0 ? _c : Const_1.Const.MF_NONE)); //requestCtx.getIf(MYFACES, "form").orElse(MF_NONE).value;
        var form = DomQuery_1.DQ
            .byId(configId)
            .orElseLazy(function () { return getForm(elem.getAsElem(0).value, event); });
        return form;
    }
    function resolveTimeout(options, requestCtx) {
        var _a;
        var getCfg = getLocalOrGlobalConfig;
        return _a = options.getIf(Const_1.Const.CTX_PARAM_TIMEOUT).value, (_a !== null && _a !== void 0 ? _a : getCfg(requestCtx.value, Const_1.Const.CTX_PARAM_TIMEOUT, 0));
    }
    function resolveDelay(options, requestCtx) {
        var _a;
        var getCfg = getLocalOrGlobalConfig;
        return _a = options.getIf(Const_1.Const.CTX_PARAM_DELAY).value, (_a !== null && _a !== void 0 ? _a : getCfg(requestCtx.value, Const_1.Const.CTX_PARAM_DELAY, 0));
    }
})(Implementation = exports.Implementation || (exports.Implementation = {}));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var myfaces;
(function (myfaces) {
    var ConfigHolder = /** @class */ (function () {
        function ConfigHolder() {
            this.projectStage = null;
            this.separator = null;
        }
        return ConfigHolder;
    }());
    myfaces.ConfigHolder = ConfigHolder;
    myfaces.config = new ConfigHolder();
    //if (window && "undefined" == typeof window.myfaces) {
    //    window.myfaces = myfaces;
    //}
})(myfaces = exports.myfaces || (exports.myfaces = {}));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var monadish_1 = __webpack_require__(4);
var Const_1 = __webpack_require__(11);
var ResponseProcessor_1 = __webpack_require__(12);
var ResonseDataResolver_1 = __webpack_require__(19);
var Response;
(function (Response) {
    var resolveResponseXML = ResonseDataResolver_1.ResonseDataResolver.resolveResponseXML;
    var resolveContexts = ResonseDataResolver_1.ResonseDataResolver.resolveContexts;
    /**
     * Standardized jsf.js response
     * this one is called straight from jsf.js.response
     *
     * The processing follows the spec by going for the responseXML
     * and processing its tags
     *
     * @param {XMLHttpRequest} request (xhrRequest) - xhr request object
     * @param {[key: string]: any} context (Map) - AJAX context
     *
     */
    function processResponse(request, context) {
        var req = monadish_1.Config.fromNullable(request);
        var _a = resolveContexts(context), externalContext = _a.externalContext, internalContext = _a.internalContext;
        var responseXML = resolveResponseXML(req);
        var responseProcessor = new ResponseProcessor_1.ResponseProcessor(req, externalContext, internalContext);
        internalContext.assign(Const_1.Const.RESPONSE_XML).value = responseXML;
        //we now process the partial tags, or in none given raise an error
        responseXML.querySelectorAll(Const_1.Const.RESP_PARTIAL)
            .each(function (item) { return processPartialTag(item, responseProcessor, internalContext); });
        //we now process the viewstates and the evals deferred
        //the reason for this is that often it is better
        //to wait until the document has caught up before
        //doing any evals even on embedded scripts
        responseProcessor.fixViewStates();
        responseProcessor.globalEval();
        responseProcessor.done();
    }
    Response.processResponse = processResponse;
    /**
     * highest node partial-response from there the main operations are triggered
     */
    function processPartialTag(node, responseProcessor, internalContext) {
        internalContext.assign(Const_1.Const.PARTIAL_ID).value = node.id;
        var SEL_SUB_TAGS = [Const_1.Const.CMD_ERROR, Const_1.Const.CMD_REDIRECT, Const_1.Const.CMD_CHANGES].join(",");
        //now we can process the main operations
        node.getIf(SEL_SUB_TAGS).each(function (node) {
            switch (node.tagName.value) {
                case Const_1.Const.CMD_ERROR:
                    responseProcessor.error(node);
                    break;
                case Const_1.Const.CMD_REDIRECT:
                    responseProcessor.redirect(node);
                    break;
                case Const_1.Const.CMD_CHANGES:
                    processChangesTag(node, responseProcessor);
                    break;
            }
        });
    }
    var processInsert = function (responseProcessor, node) {
        //path1 insert after as child tags
        if (node.querySelectorAll([Const_1.Const.TAG_BEFORE, Const_1.Const.TAG_AFTER].join(",")).length) {
            responseProcessor.insertWithSubtags(node);
        }
        else { //insert before after with id
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
        var ALLOWED_TAGS = [Const_1.Const.CMD_UPDATE, Const_1.Const.CMD_EVAL, Const_1.Const.CMD_INSERT, Const_1.Const.CMD_DELETE, Const_1.Const.CMD_ATTRIBUTES, Const_1.Const.CMD_EXTENSION].join(",");
        node.getIf(ALLOWED_TAGS).each(function (node) {
            switch (node.tagName.value) {
                case Const_1.Const.CMD_UPDATE:
                    processUpdateTag(node, responseProcessor);
                    break;
                case Const_1.Const.CMD_EVAL:
                    responseProcessor.eval(node);
                    break;
                case Const_1.Const.CMD_INSERT:
                    processInsert(responseProcessor, node);
                    break;
                case Const_1.Const.CMD_DELETE:
                    responseProcessor.delete(node);
                    break;
                case Const_1.Const.CMD_ATTRIBUTES:
                    responseProcessor.attributes(node);
                    break;
                case Const_1.Const.CMD_EXTENSION:
                    break;
            }
        });
        return true;
    }
    /**
     * branch tag update.. drill further down into the updates
     * special case viewstate in that case it is a leaf
     * and the viewstate must be processed
     *
     * @param node
     * @param responseProcessor
     */
    function processUpdateTag(node, responseProcessor) {
        if (!responseProcessor.processViewState(node)) {
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
            case Const_1.Const.P_VIEWROOT:
                responseProcessor.replaceViewRoot(monadish_1.DQ.fromMarkup(cdataBlock.substring(cdataBlock.indexOf("<html"))));
                break;
            case Const_1.Const.P_VIEWHEAD:
                responseProcessor.replaceHead(monadish_1.DQ.fromMarkup(cdataBlock));
                break;
            case Const_1.Const.P_VIEWBODY:
                responseProcessor.replaceBody(monadish_1.DQ.fromMarkup(cdataBlock));
                break;
            default: //htmlItem replacement
                responseProcessor.update(node, cdataBlock);
                break;
        }
    }
})(Response = exports.Response || (exports.Response = {}));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DomQuery_1 = __webpack_require__(5);
exports.DomQuery = DomQuery_1.DomQuery;
exports.ElementAttribute = DomQuery_1.ElementAttribute;
exports.DomQueryCollector = DomQuery_1.DomQueryCollector;
exports.DQ = DomQuery_1.DQ;
var Lang_1 = __webpack_require__(7);
exports.Lang = Lang_1.Lang;
var Monad_1 = __webpack_require__(6);
exports.Config = Monad_1.Config;
exports.Monad = Monad_1.Monad;
exports.Optional = Monad_1.Optional;
exports.ValueEmbedder = Monad_1.ValueEmbedder;
var XmlQuery_1 = __webpack_require__(10);
exports.XMLQuery = XmlQuery_1.XMLQuery;
exports.XQ = XmlQuery_1.XQ;
var Stream_1 = __webpack_require__(9);
exports.Stream = Stream_1.Stream;
exports.LazyStream = Stream_1.LazyStream;
var SourcesCollectors_1 = __webpack_require__(8);
exports.ArrayStreamDataSource = SourcesCollectors_1.ArrayStreamDataSource;
exports.MappedStreamDataSource = SourcesCollectors_1.MappedStreamDataSource;
exports.FilteredStreamDatasource = SourcesCollectors_1.FilteredStreamDatasource;
exports.FlatMapStreamDataSource = SourcesCollectors_1.FlatMapStreamDataSource;
exports.QueryFormStringCollector = SourcesCollectors_1.QueryFormStringCollector;
exports.ArrayCollector = SourcesCollectors_1.ArrayCollector;
exports.AssocArrayCollector = SourcesCollectors_1.AssocArrayCollector;
exports.FormDataCollector = SourcesCollectors_1.FormDataCollector;
exports.QueryFormDataCollector = SourcesCollectors_1.QueryFormDataCollector;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Monad_1 = __webpack_require__(6);
var Stream_1 = __webpack_require__(9);
var Lang_1 = __webpack_require__(7);
var trim = Lang_1.Lang.trim;
var objToArray = Lang_1.Lang.objToArray;
var isString = Lang_1.Lang.isString;
var equalsIgnoreCase = Lang_1.Lang.equalsIgnoreCase;
// @ts-ignore supression needed here due to fromnullable
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
        enumerable: true,
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
/**
 * small helper for the specialized jsf case
 * @param src
 * @constructor
 */
var DEFAULT_JSF_WHITELIST = function (src) {
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
var DomQuery = /** @class */ (function () {
    function DomQuery() {
        var _a;
        var rootNode = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rootNode[_i] = arguments[_i];
        }
        this.rootNode = [];
        this.pos = -1;
        this._limits = -1;
        if (Monad_1.Optional.fromNullable(rootNode).isAbsent() || !rootNode.length) {
            return;
        }
        else {
            //we need to flatten out the arrays
            for (var cnt = 0; cnt < rootNode.length; cnt++) {
                if (isString(rootNode[cnt])) {
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "values", {
        get: function () {
            return this.allElems();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "id", {
        /**
         * returns the id of the first element
         */
        get: function () {
            return new ElementAttribute(this.get(0), "id");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "length", {
        /**
         * length of the entire query set
         */
        get: function () {
            return this.rootNode.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "tagName", {
        /**
         * convenience method for tagName
         */
        get: function () {
            return this.getAsElem(0).getIf("tagName");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "nodeName", {
        /**
         * convenience method for nodeName
         */
        get: function () {
            return this.getAsElem(0).getIf("nodeName");
        },
        enumerable: true,
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
        enumerable: true,
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
        enumerable: true,
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "checked", {
        get: function () {
            return Stream_1.Stream.of.apply(Stream_1.Stream, this.values).allMatch(function (el) { return !!el.checked; });
        },
        set: function (newChecked) {
            this.eachElem(function (el) { return el.checked = newChecked; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "elements", {
        get: function () {
            var _this = this;
            var elements = this.stream.flatMap(function (item) {
                var formElement = item.value.value;
                return new Stream_1.Stream(formElement.elements ? objToArray(formElement.elements) : []);
            }).filter(function (item) { return !!item; }).collect(new DomQueryCollector());
            return elements
                .orElseLazy(function () { return _this.querySelectorAll("input, select, textarea, fieldset"); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "disabled", {
        /**
         * todo align this api with the rest of the apis
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
        enumerable: true,
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
            return new (DomQuery.bind.apply(DomQuery, __spreadArrays([void 0], childNodeArr)))();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "stream", {
        /**
         * binding into stream
         */
        get: function () {
            return new (Stream_1.Stream.bind.apply(Stream_1.Stream, __spreadArrays([void 0], this.asArray)))();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "lazyStream", {
        /**
         * fetches a lazy stream representation
         * lazy should be applied if you have some filters etc
         * in between, this can reduce the number of post filter operations
         * and ram usage
         * significantly because the operations are done lazily and stop
         * once they hit a dead end.
         */
        get: function () {
            return Stream_1.LazyStream.ofStreamDataSource(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "asArray", {
        get: function () {
            var ret = [];
            this.each(function (item) {
                ret.push(item);
            });
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * easy query selector all producer
     *
     * @param selector the selector
     * @returns a results dom query object
     */
    DomQuery.querySelectorAll = function (selector) {
        return new DomQuery(document).querySelectorAll(selector);
    };
    /**
     * byId producer
     *
     * @param selector id
     * @return a DomQuery containing the found elements
     */
    DomQuery.byId = function (selector) {
        if (isString(selector)) {
            return new DomQuery(document).byId(selector);
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
    /**
     * builds the ie nodes properly in a placeholder
     * and bypasses a non script insert bug that way
     * @param markup the marku code
     */
    DomQuery.fromMarkup = function (markup) {
        //https://developer.mozilla.org/de/docs/Web/API/DOMParser license creative commons
        var doc = document.implementation.createHTMLDocument("");
        markup = trim(markup);
        var lowerMarkup = markup.toLowerCase();
        if (lowerMarkup.indexOf('<!doctype') != -1 ||
            lowerMarkup.indexOf('<html') != -1 ||
            lowerMarkup.indexOf('<head') != -1 || //TODO proper regexps here to avoid embedded tags with same element names to be triggered
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
            //table needs special treatment due to the browsers auto creation
            if (startsWithTag(lowerMarkup, "thead") || startsWithTag(lowerMarkup, "tbody")) {
                dummyPlaceHolder.html("<table>" + markup + "</table>");
                return dummyPlaceHolder.querySelectorAll("table").get(0).childNodes.detach();
            }
            else if (startsWithTag(lowerMarkup, "tfoot")) {
                dummyPlaceHolder.html("<table><thead></thead><tbody><tbody" + markup + "</table>");
                return dummyPlaceHolder.querySelectorAll("table").get(2).childNodes.detach();
            }
            else if (startsWithTag(lowerMarkup, "tr")) {
                dummyPlaceHolder.html("<table><tbody>" + markup + "</tbody></table>");
                return dummyPlaceHolder.querySelectorAll("tbody").get(0).childNodes.detach();
            }
            else if (startsWithTag(lowerMarkup, "td")) {
                dummyPlaceHolder.html("<table><tbody><tr>" + markup + "</tr></tbody></table>");
                return dummyPlaceHolder.querySelectorAll("tr").get(0).childNodes.detach();
            }
            dummyPlaceHolder.html(markup);
            return dummyPlaceHolder.childNodes.detach();
        }
    };
    /**
     * returns the nth element as domquery
     * from the internal elements
     * note if you try to reach a non existing element position
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
     * @param defaults the default value if the index is overrun default Optional.absent
     */
    DomQuery.prototype.getAsElem = function (index, defaults) {
        if (defaults === void 0) { defaults = Monad_1.Optional.absent; }
        return (index < this.rootNode.length) ? Monad_1.Optional.fromNullable(this.rootNode[index]) : defaults;
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
     * this refers to the active dopmquery object
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
     * this refers to the active dopmquery object
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
    /**
     * query selector all on the existing dom query object
     *
     * @param selector the standard selector
     * @return a DomQuery with the results
     */
    DomQuery.prototype.querySelectorAll = function (selector) {
        var _a, _b, _c;
        if (!((_b = (_a = this) === null || _a === void 0 ? void 0 : _a.rootNode) === null || _b === void 0 ? void 0 : _b.length)) {
            return this;
        }
        var nodes = [];
        for (var cnt = 0; cnt < this.rootNode.length; cnt++) {
            if (!((_c = this.rootNode[cnt]) === null || _c === void 0 ? void 0 : _c.querySelectorAll)) {
                continue;
            }
            var res = this.rootNode[cnt].querySelectorAll(selector);
            nodes = nodes.concat(objToArray(res));
        }
        return new (DomQuery.bind.apply(DomQuery, __spreadArrays([void 0], nodes)))();
    };
    /**
     * core byId method
     * @param id the id to search for
     * @param includeRoot also match the root element?
     */
    DomQuery.prototype.byId = function (id, includeRoot) {
        var _a;
        var res = [];
        for (var cnt = 0; includeRoot && cnt < this.rootNode.length; cnt++) {
            if (((_a = this.rootNode[cnt]) === null || _a === void 0 ? void 0 : _a.id) == id) {
                res.push(new DomQuery(this.rootNode[cnt]));
            }
        }
        //for some strange kind of reason the # selector fails
        //on hidden elements we use the attributes match selector
        //that works
        res = res.concat(this.querySelectorAll("[id=\"" + id + "\"]"));
        return new (DomQuery.bind.apply(DomQuery, __spreadArrays([void 0], res)))();
    };
    /**
     * same as byId just for the tag name
     * @param tagName
     * @param includeRoot
     */
    DomQuery.prototype.byTagName = function (tagName, includeRoot) {
        var _a;
        var res = [];
        for (var cnt = 0; includeRoot && cnt < this.rootNode.length; cnt++) {
            if (((_a = this.rootNode[cnt]) === null || _a === void 0 ? void 0 : _a.tagName) == tagName) {
                res.push(new DomQuery(this.rootNode[cnt]));
            }
        }
        res = res.concat(this.querySelectorAll(tagName));
        return new (DomQuery.bind.apply(DomQuery, __spreadArrays([void 0], res)))();
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
    /**
     * hasclass, checks for an existing class in the class attributes
     *
     * @param clazz the class to search for
     */
    DomQuery.prototype.hasClass = function (clazz) {
        var hasIt = false;
        this.each(function (item) {
            var oldClass = item.attr("class").value || "";
            if (oldClass.toLowerCase().indexOf(clazz.toLowerCase()) == -1) {
                return;
            }
            else {
                var oldClasses = oldClass.split(/\s+/gi);
                var found = false;
                for (var cnt = 0; cnt < oldClasses.length && !found; cnt++) {
                    found = oldClasses[cnt].toLowerCase() == clazz.toLowerCase();
                }
                hasIt = hasIt || found;
                if (hasIt) {
                    return false;
                }
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
        var _this = this;
        this.each(function (item) {
            var oldClass = item.attr("class").value || "";
            if (!_this.hasClass(clazz)) {
                item.attr("class").value = trim(oldClass + " " + clazz);
                return;
            }
        });
        return this;
    };
    /**
     * remove the style class if in the class definitions
     *
     * @param clazz
     */
    DomQuery.prototype.removeClass = function (clazz) {
        var _this = this;
        this.each(function (item) {
            if (_this.hasClass(clazz)) {
                var oldClass = item.attr("class").value || "";
                var newClasses = [];
                var oldClasses = oldClass.split(/\s+/gi);
                for (var cnt = 0; cnt < oldClasses.length; cnt++) {
                    if (oldClasses[cnt].toLowerCase() != clazz.toLowerCase()) {
                        newClasses.push(oldClasses[cnt]);
                    }
                }
                item.attr("class").value = newClasses.join(" ");
            }
        });
        return this;
    };
    /**
     * checks whether we have a multipart element in our children
     */
    DomQuery.prototype.isMultipartCandidate = function () {
        return this.querySelectorAll("input[type='file']").firstElem().isPresent();
    };
    /**
     * innerHtml equivalkent
     * equivalent to jqueries html
     * as setter the html is set and the
     * DomQuery is given back
     * as getter the html string is returned
     *
     * @param inval
     */
    DomQuery.prototype.html = function (inval) {
        if (Monad_1.Optional.fromNullable(inval).isAbsent()) {
            return this.isPresent() ? Monad_1.Optional.fromNullable(this.innerHtml) : Monad_1.Optional.absent;
        }
        this.innerHtml = inval;
        return this;
    };
    Object.defineProperty(DomQuery.prototype, "innerHtml", {
        get: function () {
            var retArr = [];
            this.eachElem(function (elem) { return retArr.push(elem.innerHTML); });
            return retArr.join("");
        },
        set: function (inVal) {
            this.eachElem(function (elem) { return elem.innerHTML = inVal; });
        },
        enumerable: true,
        configurable: true
    });
    //source: https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
    //code snippet license: https://creativecommons.org/licenses/by-sa/2.5/
    DomQuery.prototype._mozMatchesSelector = function (toMatch, selector) {
        var prot = toMatch;
        var matchesSelector = prot.matchesSelector ||
            prot.mozMatchesSelector ||
            prot.msMatchesSelector ||
            prot.oMatchesSelector ||
            prot.webkitMatchesSelector ||
            function (s) {
                var matches = (document || window.ownerDocument).querySelectorAll(s), i = matches.length;
                while (--i >= 0 && matches.item(i) !== toMatch) {
                }
                return i > -1;
            };
        return matchesSelector.call(toMatch, selector);
    };
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
        return new (DomQuery.bind.apply(DomQuery, __spreadArrays([void 0], matched)))();
    };
    DomQuery.prototype.matchesSelector = function (selector) {
        var _this = this;
        this.eachElem(function (item) {
            if (!_this._mozMatchesSelector(item, selector)) {
                return false;
            }
        });
        return true;
    };
    /**
     * easy node traversal, you can pass
     * a set of node selectors which are joined as direct childs
     *
     * not the rootnodes are not in the getIf, those are always the child nodes
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
    DomQuery.prototype.each = function (func) {
        Stream_1.Stream.of.apply(Stream_1.Stream, this.rootNode).each(function (item, cnt) {
            //we could use a filter, but for the best performance we dont
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
     * filter function which filters a subset
     *
     * @param func
     */
    DomQuery.prototype.filter = function (func) {
        var reArr = [];
        this.each(function (item) {
            func(item) ? reArr.push(item) : null;
        });
        return new (DomQuery.bind.apply(DomQuery, __spreadArrays([void 0], reArr)))();
    };
    //TODO append prepend
    /**
     * global eval head appendix method
     * no other methods are supported anymore
     * @param code the code to be evaled
     * @param  nonce optional  nonce key for higher security
     */
    DomQuery.prototype.globalEval = function (code, nonce) {
        var head = document.getElementsByTagName("head")[0] || document.documentElement;
        var script = document.createElement("script");
        if (nonce) {
            script.setAttribute("nonce", nonce);
        }
        script.type = "text/javascript";
        script.innerHTML = code;
        var newScriptElement = head.appendChild(script);
        head.removeChild(newScriptElement);
        return this;
    };
    /**
     * detaches a set of nodes from their parent elements
     * in a browser independend manner
     * @param {Object} items the items which need to be detached
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
        this.eachElem(function (item) {
            var value1 = elem.getAsElem(0).orElseLazy(function () {
                return {
                    appendChild: function (theItem) {
                    }
                };
            }).value;
            value1.appendChild(item);
        });
    };
    /**
     * loads and evals a script from a source uri
     *
     * @param src the source to be loaded and evaled
     * @param defer in miliseconds execution default (0 == no defer)
     * @param charSet
     */
    DomQuery.prototype.loadScriptEval = function (src, defer, charSet) {
        var _this = this;
        if (defer === void 0) { defer = 0; }
        if (charSet === void 0) { charSet = "utf-8"; }
        var xhr = new XMLHttpRequest();
        xhr.open("GET", src, false);
        if (charSet) {
            xhr.setRequestHeader("Content-Type", "application/x-javascript; charset:" + charSet);
        }
        xhr.send(null);
        xhr.onload = function (responseData) {
            //defer also means we have to process after the ajax response
            //has been processed
            //we can achieve that with a small timeout, the timeout
            //triggers after the processing is done!
            if (!defer) {
                _this.globalEval(xhr.responseText.replace("\n", "\r\n") + "\r\n//@ sourceURL=" + src);
            }
            else {
                //TODO not ideal we maybe ought to move to something else here
                //but since it is not in use yet, it is ok
                setTimeout(function () {
                    _this.globalEval(xhr.responseText + "\r\n//@ sourceURL=" + src);
                }, defer);
            }
        };
        xhr.onerror = function (data) {
            throw Error(data);
        };
        //since we are synchronous we do it after not with onReadyStateChange
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
        return new (DomQuery.bind.apply(DomQuery, __spreadArrays([void 0], res)))();
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
        return new (DomQuery.bind.apply(DomQuery, __spreadArrays([void 0], res)))();
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
            return new (DomQuery.bind.apply(DomQuery, __spreadArrays([void 0], elseValue)))();
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
            while (item.parentNode) {
                item = item.parentNode;
                resolveItem(item);
                //nested forms not possible, performance shortcut
                if (tagName == "form" && retArr.length) {
                    return false;
                }
            }
        });
        return new (DomQuery.bind.apply(DomQuery, __spreadArrays([void 0], retArr)))();
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
    DomQuery.prototype.outerHTML = function (markup, runEmbeddedScripts, runEmbeddedCss) {
        var _a, _b;
        if (this.isAbsent()) {
            return;
        }
        var focusElementId = (_b = (_a = document) === null || _a === void 0 ? void 0 : _a.activeElement) === null || _b === void 0 ? void 0 : _b.id;
        var caretPosition = (focusElementId) ? DomQuery.getCaretPosition(document.activeElement) : null;
        var nodes = DomQuery.fromMarkup(markup);
        var res = [];
        var toReplace = this.getAsElem(0).value;
        var firstInsert = nodes.get(0);
        var parentNode = toReplace.parentNode;
        var replaced = firstInsert.getAsElem(0).value;
        parentNode.replaceChild(replaced, toReplace);
        res.push(new DomQuery(replaced));
        //no replacement possible
        if (this.isAbsent()) {
            return this;
        }
        var insertAdditionalItems = [];
        if (nodes.length > 1) {
            insertAdditionalItems = insertAdditionalItems.concat.apply(insertAdditionalItems, nodes.values.slice(1));
            res.push(DomQuery.byId(replaced).insertAfter(new (DomQuery.bind.apply(DomQuery, __spreadArrays([void 0], insertAdditionalItems)))()));
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
     * @param whilteListed: optional whitelist function which can filter out script tags which are not processed
     * defaults to the standard jsf.js exclusion (we use this code for myfaces)
     */
    DomQuery.prototype.runScripts = function (whilteListed) {
        var _this = this;
        if (whilteListed === void 0) { whilteListed = DEFAULT_JSF_WHITELIST; }
        var finalScripts = [], equi = equalsIgnoreCase, execScrpt = function (item) {
            var tagName = item.tagName;
            var itemType = item.type || "";
            if (tagName && equi(tagName, "script") &&
                (itemType === "" || equi(itemType, "text/javascript") ||
                    equi(itemType, "javascript") ||
                    equi(itemType, "text/ecmascript") ||
                    equi(itemType, "ecmascript"))) {
                var src = item.getAttribute('src');
                if ('undefined' != typeof src
                    && null != src
                    && src.length > 0) {
                    //we have to move this into an inner if because chrome otherwise chokes
                    //due to changing the and order instead of relying on left to right
                    //if jsf.js is already registered we do not replace it anymore
                    if (whilteListed(src)) {
                        if (finalScripts.length) {
                            //script source means we have to eval the existing
                            //scripts before running the include
                            _this.globalEval(finalScripts.join("\n"));
                            finalScripts = [];
                        }
                        _this.loadScriptEval(src, 0, "UTF-8");
                    }
                }
                else {
                    // embedded script auto eval
                    //TODO this probably needs to be changed due to our new parsing structures
                    //probably not needed anymore
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
                    // we have to run the script under a global context
                    //we store the script for less calls to eval
                    finalScripts.push(evalText);
                }
            }
        };
        try {
            var scriptElements = new DomQuery(this.filterSelector("script"), this.querySelectorAll("script"));
            //script execution order by relative pos in their dom tree
            scriptElements.stream
                .flatMap(function (item) {
                return Stream_1.Stream.of(item.values);
            })
                .sort(function (node1, node2) {
                return node1.compareDocumentPosition(node2) - 3; //preceding 2, following == 4
            })
                .each(function (item) { return execScrpt(item); });
            if (finalScripts.length) {
                this.globalEval(finalScripts.join("\n"));
            }
        }
        catch (e) {
            if (window.console && window.console.error) {
                //not sure if we
                //should use our standard
                //error mechanisms here
                //because in the head appendix
                //method only a console
                //error would be raised as well
                console.error(e.message || e.description);
            }
        }
        finally {
            //the usual ie6 fix code
            //the IE6 garbage collector is broken
            //nulling closures helps somewhat to reduce
            //mem leaks, which are impossible to avoid
            //at this browser
            execScrpt = null;
        }
        return this;
    };
    DomQuery.prototype.runCss = function () {
        var applyStyle = function (item, style) {
            var _a, _b, _c, _d, _e;
            var newSS = document.createElement("style");
            document.getElementsByTagName("head")[0].appendChild(newSS);
            var styleSheet = (_a = newSS.sheet, (_a !== null && _a !== void 0 ? _a : newSS.styleSheet));
            newSS.setAttribute("rel", (_b = item.getAttribute("rel"), (_b !== null && _b !== void 0 ? _b : "stylesheet")));
            newSS.setAttribute("type", (_c = item.getAttribute("type"), (_c !== null && _c !== void 0 ? _c : "text/css")));
            if (_e = (_d = styleSheet) === null || _d === void 0 ? void 0 : _d.cssText, (_e !== null && _e !== void 0 ? _e : false)) {
                styleSheet.cssText = style;
            }
            else {
                newSS.appendChild(document.createTextNode(style));
            }
        }, execCss = function (item) {
            var tagName = item.tagName;
            if (tagName && equalsIgnoreCase(tagName, "link") && equalsIgnoreCase(item.getAttribute("type"), "text/css")) {
                applyStyle(item, "@import url('" + item.getAttribute("href") + "');");
            }
            else if (tagName && equalsIgnoreCase(tagName, "style") && equalsIgnoreCase(item.getAttribute("type"), "text/css")) {
                var innerText = [];
                //compliant browsers know child nodes
                var childNodes = item.childNodes;
                if (childNodes) {
                    var len = childNodes.length;
                    for (var cnt = 0; cnt < len; cnt++) {
                        innerText.push(childNodes[cnt].innerHTML || childNodes[cnt].data);
                    }
                    //non compliant ones innerHTML
                }
                else if (item.innerHTML) {
                    innerText.push(item.innerHTML);
                }
                applyStyle(item, innerText.join(""));
            }
        };
        var scriptElements = new DomQuery(this.filterSelector("link, style"), this.querySelectorAll("link, style"));
        scriptElements.stream
            .flatMap(function (item) {
            return Stream_1.Stream.of(item.values);
        })
            .sort(function (node1, node2) {
            return node1.compareDocumentPosition(node2) - 3; //preceding 2, following == 4
        })
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
        this.eachElem(function (node) {
            node.addEventListener(type, listener, options);
        });
        return this;
    };
    DomQuery.prototype.removeEventListener = function (type, listener, options) {
        this.eachElem(function (node) {
            node.removeEventListener(type, listener, options);
        });
        return this;
    };
    /**
     * fires an event
     */
    DomQuery.prototype.fireEvent = function (eventName) {
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
                var event_1 = doc.createEvent(eventClass);
                event_1.initEvent(eventName, true, true); // All events created as bubbling and cancelable.
                event_1.synthetic = true; // allow detection of synthetic events
                // The second parameter says go ahead with the default action
                node.dispatchEvent(event_1);
            }
            else if (node.fireEvent) {
                // IE-old school style, you can drop this if you don't need to support IE8 and lower
                var event_2 = doc.createEventObject();
                event_2.synthetic = true; // allow detection of synthetic events
                node.fireEvent("on" + eventName, event_2);
            }
        });
    };
    DomQuery.prototype.textContent = function (joinstr) {
        if (joinstr === void 0) { joinstr = ""; }
        return this.stream
            .map(function (value) {
            var item = value.getAsElem(0).orElseLazy(function () {
                return {
                    textContent: ""
                };
            }).value;
            return item.textContent || "";
        })
            .reduce(function (text1, text2) { return text1 + joinstr + text2; }, "").value;
    };
    DomQuery.prototype.innerText = function (joinstr) {
        if (joinstr === void 0) { joinstr = ""; }
        return this.stream
            .map(function (value) {
            var item = value.getAsElem(0).orElseLazy(function () {
                return {
                    innerText: ""
                };
            }).value;
            return item.innerText || "";
        })
            .reduce(function (text1, text2) { return [text1, text2].join(joinstr); }, "").value;
    };
    /**
     * encodes all input elements properly into respective
     * config entries, this can be used
     * for legacy systems, for newer usecases, use the
     * HTML5 Form class which all newer browsers provide
     *
     * @param toMerge optional config which can be merged in
     * @return a copy pf
     */
    DomQuery.prototype.encodeFormElement = function (toMerge) {
        if (toMerge === void 0) { toMerge = new Monad_1.Config({}); }
        //browser behavior no element name no encoding (normal submit fails in that case)
        //https://issues.apache.org/jira/browse/MYFACES-2847
        if (this.name.isAbsent()) {
            return;
        }
        //lets keep it sideffects free
        var target = toMerge.shallowCopy;
        this.each(function (element) {
            if (element.name.isAbsent()) { //no name, no encoding
                return;
            }
            var name = element.name.value;
            var tagName = element.tagName.orElse("__none__").value.toLowerCase();
            var elemType = element.type.orElse("__none__").value.toLowerCase();
            elemType = elemType.toLowerCase();
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
                    var selectElem = element.getAsElem(0).value;
                    if (selectElem.selectedIndex >= 0) {
                        var uLen = selectElem.options.length;
                        for (var u = 0; u < uLen; u++) {
                            // find all selected options
                            //let subBuf = [];
                            if (selectElem.options[u].selected) {
                                var elementOption = selectElem.options[u];
                                target.assign(name).value = (elementOption.getAttribute("value") != null) ?
                                    elementOption.value : elementOption.text;
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
                    var files = element.value.files;
                    if (files && files.length) {
                        //xhr level2
                        target.assign(name).value = files[0];
                    }
                    else {
                        target.assign(name).value = element.inputValue.value;
                    }
                }
            }
        });
        return target;
    };
    Object.defineProperty(DomQuery.prototype, "cDATAAsString", {
        get: function () {
            var cDataBlock = [];
            // response may contain several blocks
            return this.stream
                .flatMap(function (item) { return item.childNodes.stream; }).reduce(function (reduced, item) {
                var _a, _b, _c, _d;
                reduced.push((_d = (_c = (_b = (_a = item) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.data, (_d !== null && _d !== void 0 ? _d : "")));
                return reduced;
            }, []).value.join("");
        },
        enumerable: true,
        configurable: true
    });
    DomQuery.prototype.subNodes = function (from, to) {
        if (Monad_1.Optional.fromNullable(to).isAbsent()) {
            to = this.length;
        }
        return new (DomQuery.bind.apply(DomQuery, __spreadArrays([void 0], this.rootNode.slice(from, Math.min(to, this.length)))))();
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
    DomQuery.prototype.reset = function () {
        this.pos = -1;
    };
    //from
    // http://blog.vishalon.net/index.php/javascript-getting-and-setting-caret-position-in-textarea/
    DomQuery.getCaretPosition = function (ctrl) {
        var _a;
        var caretPos = 0;
        try {
            if ((_a = document) === null || _a === void 0 ? void 0 : _a.selection) {
                ctrl.focus();
                var selection = document.selection.createRange();
                //the selection now is start zero
                selection.moveStart('character', -ctrl.value.length);
                //the caretposition is the selection start
                caretPos = selection.text.length;
            }
        }
        catch (e) {
            //now this is ugly, but not supported input types throw errors for selectionStart
            //just in case someone dumps this code onto unsupported browsers
        }
        return caretPos;
    };
    DomQuery.setCaretPosition = function (ctrl, pos) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    };
    DomQuery.absent = new DomQuery();
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
            return new (DomQuery.bind.apply(DomQuery, __spreadArrays([void 0], this.data)))();
        },
        enumerable: true,
        configurable: true
    });
    return DomQueryCollector;
}());
exports.DomQueryCollector = DomQueryCollector;
/**
 * abbreviation for DomQuery
 */
exports.DQ = DomQuery;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A module which keeps  basic monadish like definitions in place without any sidedependencies to other modules.
 * Useful if you need the functions in another library to keep its dependencies down
 */
/*IMonad definitions*/
var Lang_1 = __webpack_require__(7);
var SourcesCollectors_1 = __webpack_require__(8);
var Stream_1 = __webpack_require__(9);
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
        enumerable: true,
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
        var _a;
        var mapped = this.map(fn);
        while (((_a = mapped) === null || _a === void 0 ? void 0 : _a.value) instanceof Monad) {
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
        enumerable: true,
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
        enumerable: true,
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
        _this.arrPos = (arrPos !== null && arrPos !== void 0 ? arrPos : -1);
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
        enumerable: true,
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
        get: function () {
            return new Config(Stream_1.Stream.ofAssoc(this.value).collect(new SourcesCollectors_1.AssocArrayCollector()));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "deepCopy", {
        get: function () {
            return new Config(objAssign({}, this.value));
        },
        enumerable: true,
        configurable: true
    });
    Config.fromNullable = function (value) {
        return new Config(value);
    };
    /**
     * simple merge for the root configs
     */
    Config.prototype.shallowMerge = function (other, overwrite) {
        if (overwrite === void 0) { overwrite = true; }
        for (var key in other.value) {
            if (overwrite || !(key in this.value)) {
                this.assign(key).value = other.getIf(key).value;
            }
        }
    };
    Config.prototype.assign = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        if (keys.length < 1) {
            return;
        }
        this.buildPath(keys);
        var currKey = this.keyVal(keys[keys.length - 1]);
        var arrPos = this.arrayIndex(keys[keys.length - 1]);
        var retVal = new ConfigEntry(keys.length == 1 ? this.value : this.getIf.apply(this, keys.slice(0, keys.length - 1)).value, currKey, arrPos);
        return retVal;
    };
    Config.prototype.assignIf = function (condition) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        return condition ? this.assign.apply(this, keys) : { value: null };
    };
    Config.prototype.getIf = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return this.getClass().fromNullable(_super.prototype.getIf.apply(this, keys).value);
    };
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
    Config.prototype.toJson = function () {
        return JSON.stringify(this.value);
    };
    Config.prototype.getClass = function () {
        return Config;
    };
    Config.prototype.setVal = function (val) {
        this._value = val;
    };
    Config.prototype.buildPath = function (keys) {
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
        for (var cnt = 0; cnt < keys.length; cnt++) {
            var currKey = this.keyVal(keys[cnt]);
            var arrPos = this.arrayIndex(keys[cnt]);
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var Monad_1 = __webpack_require__(6);
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
            return Monad_1.Optional.fromNullable((result !== null && result !== void 0 ? result : defaultValue));
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
            return Monad_1.Optional.fromNullable((result !== null && result !== void 0 ? result : defaultValue()));
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
        if (((obj !== null && obj !== void 0 ? obj : "__undefined__")) == "__undefined__") {
            return (pack !== null && pack !== void 0 ? pack : null);
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
        var finalSource = (source !== null && source !== void 0 ? source : "___no_value__");
        var finalDest = (destination !== null && destination !== void 0 ? destination : "___no_value__");
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
        theArgs.forEach(function (item) {
            var nextSource = item;
            if (nextSource != null) { // Skip over if undefined or null
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        });
        return to;
    }
    Lang.objAssign = objAssign;
})(Lang = exports.Lang || (exports.Lang = {}));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Stream_1 = __webpack_require__(9);
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
    ArrayStreamDataSource.prototype.hasNext = function () {
        return this.value.length - 1 > this.dataPos;
    };
    ArrayStreamDataSource.prototype.next = function () {
        this.dataPos++;
        return this.value[this.dataPos];
    };
    ArrayStreamDataSource.prototype.reset = function () {
        this.dataPos = -1;
    };
    return ArrayStreamDataSource;
}());
exports.ArrayStreamDataSource = ArrayStreamDataSource;
/**
 * an intermediate data source wich prefilters
 * incoming stream data
 * and lets only the data out which
 * passes the filter function check
 */
var FilteredStreamDatasource = /** @class */ (function () {
    function FilteredStreamDatasource(filterFunc, parent) {
        this.filteredNext = null;
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
        while (this.filteredNext == null && this.inputDataSource.hasNext()) {
            var next = this.inputDataSource.next();
            if (this.filterFunc(next)) {
                this.filteredNext = next;
                return true;
            }
            else {
                this.filteredNext = null;
            }
        }
        return this.filteredNext != null;
    };
    /**
     * serve the next element
     */
    FilteredStreamDatasource.prototype.next = function () {
        var ret = this.filteredNext;
        this.filteredNext = null;
        //We have to call hasNext, to roll another
        //prefetch in case someone runs next
        //sequentially without calling hasNext
        this.hasNext();
        return ret;
    };
    FilteredStreamDatasource.prototype.reset = function () {
        this.filteredNext = null;
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
    return MappedStreamDataSource;
}());
exports.MappedStreamDataSource = MappedStreamDataSource;
/**
 * Same for flatmap to deal with element -> stream mappings
 */
var FlatMapStreamDataSource = /** @class */ (function () {
    function FlatMapStreamDataSource(func, parent) {
        this.mapFunc = func;
        this.inputDataSource = parent;
    }
    FlatMapStreamDataSource.prototype.hasNext = function () {
        return this.resolveCurrentNext() || this.resolveNextNext();
    };
    FlatMapStreamDataSource.prototype.resolveCurrentNext = function () {
        var next = false;
        if (this.activeDataSource) {
            next = this.activeDataSource.hasNext();
        }
        return next;
    };
    FlatMapStreamDataSource.prototype.resolveNextNext = function () {
        var next = false;
        while (!next && this.inputDataSource.hasNext()) {
            var mapped = this.mapFunc(this.inputDataSource.next());
            if (Array.isArray(mapped)) {
                this.activeDataSource = new (ArrayStreamDataSource.bind.apply(ArrayStreamDataSource, __spreadArrays([void 0], mapped)))();
            }
            else {
                this.activeDataSource = mapped;
            }
            next = this.activeDataSource.hasNext();
        }
        return next;
    };
    FlatMapStreamDataSource.prototype.next = function () {
        return this.activeDataSource.next();
    };
    FlatMapStreamDataSource.prototype.reset = function () {
        this.inputDataSource.reset();
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
        enumerable: true,
        configurable: true
    });
    return ArrayCollector;
}());
exports.ArrayCollector = ArrayCollector;
/**
 * collects an assoc stream back to an assoc array
 */
var AssocArrayCollector = /** @class */ (function () {
    function AssocArrayCollector() {
        this.finalValue = {};
    }
    AssocArrayCollector.prototype.collect = function (element) {
        var _a, _b;
        this.finalValue[_a = element[0], (_a !== null && _a !== void 0 ? _a : element)] = (_b = element[1], (_b !== null && _b !== void 0 ? _b : true));
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
        enumerable: true,
        configurable: true
    });
    return QueryFormStringCollector;
}());
exports.QueryFormStringCollector = QueryFormStringCollector;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * A small stream implementation
 */
var Monad_1 = __webpack_require__(6);
var SourcesCollectors_1 = __webpack_require__(8);
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
        return new (Stream.bind.apply(Stream, __spreadArrays([void 0], data)))();
    };
    Stream.ofAssoc = function (data) {
        return this.of.apply(this, Object.keys(data)).map(function (key) { return [key, data[key]]; });
    };
    Stream.ofDataSource = function (dataSource) {
        var value = [];
        while (dataSource.hasNext()) {
            value.push(dataSource.next());
        }
        return new (Stream.bind.apply(Stream, __spreadArrays([void 0], value)))();
    };
    Stream.prototype.limits = function (end) {
        this._limits = end;
        return this;
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
    };
    Stream.prototype.map = function (fn) {
        if (!fn) {
            fn = function (inval) { return inval; };
        }
        var res = [];
        this.each(function (item, cnt) {
            res.push(fn(item));
        });
        return new (Stream.bind.apply(Stream, __spreadArrays([void 0], res)))();
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
        return new (Stream.bind.apply(Stream, __spreadArrays([void 0], res)))();
    };
    Stream.prototype.reduce = function (fn, startVal) {
        if (startVal === void 0) { startVal = null; }
        var offset = startVal != null ? 0 : 1;
        var val1 = startVal != null ? startVal : this.value.length ? this.value[0] : null;
        for (var cnt = offset; cnt < this.value.length && (this._limits == -1 || cnt < this._limits); cnt++) {
            val1 = fn(val1, this.value[cnt]);
        }
        return Monad_1.Optional.fromNullable(val1);
    };
    Stream.prototype.first = function () {
        return this.value && this.value.length ? Monad_1.Optional.fromNullable(this.value[0]) : Monad_1.Optional.absent;
    };
    Stream.prototype.last = function () {
        //could be done via reduce, but is faster this way
        var length = this._limits > 0 ? Math.min(this._limits, this.value.length) : this.value.length;
        return Monad_1.Optional.fromNullable(length ? this.value[length - 1] : null);
    };
    Stream.prototype.anyMatch = function (fn) {
        for (var cnt = 0; cnt < this.value.length && (this._limits == -1 || cnt < this._limits); cnt++) {
            if (fn(this.value[cnt])) {
                return true;
            }
        }
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
        return matches == this.value.length;
    };
    Stream.prototype.noneMatch = function (fn) {
        var matches = 0;
        for (var cnt = 0; cnt < this.value.length; cnt++) {
            if (!fn(this.value[cnt])) {
                matches++;
            }
        }
        return matches == this.value.length;
    };
    Stream.prototype.sort = function (comparator) {
        var newArr = this.value.slice().sort(comparator);
        return Stream.of.apply(Stream, newArr);
    };
    Stream.prototype.collect = function (collector) {
        this.each(function (data) { return collector.collect(data); });
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
        return new LazyStream(new (SourcesCollectors_1.ArrayStreamDataSource.bind.apply(SourcesCollectors_1.ArrayStreamDataSource, __spreadArrays([void 0], values)))());
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
    LazyStream.prototype.reset = function () {
        this.dataSource.reset();
        this.pos = 0;
        this._limits = -1;
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
    };
    LazyStream.prototype.reduce = function (fn, startVal) {
        if (startVal === void 0) { startVal = null; }
        if (!this.hasNext()) {
            return Monad_1.Optional.absent;
        }
        var value1 = null;
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
        enumerable: true,
        configurable: true
    });
    LazyStream.prototype.stop = function () {
        this.pos = this._limits + 1000000000;
    };
    LazyStream.prototype.isOverLimits = function () {
        return this._limits != -1 && this.pos >= this._limits - 1;
    };
    return LazyStream;
}());
exports.LazyStream = LazyStream;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Lang_1 = __webpack_require__(7);
var DomQuery_1 = __webpack_require__(5);
var isString = Lang_1.Lang.isString;
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
            var domParser = Lang_1.Lang.saveResolveLazy(function () { return new window.DOMParser(); }, function () { return createIe11DomQueryShim(); }).value;
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
            var _a, _b, _c, _d, _e;
            var serialized = (_d = (_c = (_b = (_a = window) === null || _a === void 0 ? void 0 : _a.XMLSerializer) === null || _b === void 0 ? void 0 : _b.constructor()) === null || _c === void 0 ? void 0 : _c.serializeToString(node), (_d !== null && _d !== void 0 ? _d : (_e = node) === null || _e === void 0 ? void 0 : _e.xml));
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var Const;
(function (Const) {
    /*internal identifiers for options*/
    Const.IDENT_ALL = "@all";
    Const.IDENT_NONE = "@none";
    Const.IDENT_THIS = "@this";
    Const.IDENT_FORM = "@form";
    /*
     * [export const] constants
     */
    Const.P_PARTIAL_SOURCE = "javax.faces.source";
    Const.PARTIAL_ID = "partialId";
    Const.P_VIEWSTATE = "javax.faces.ViewState";
    Const.P_VIEWROOT = "javax.faces.ViewRoot";
    Const.P_VIEWHEAD = "javax.faces.ViewHead";
    Const.P_VIEWBODY = "javax.faces.ViewBody";
    Const.P_CLIENTWINDOW = "javax.faces.ClientWindow";
    Const.P_AJAX = "javax.faces.partial.ajax";
    Const.P_EXECUTE = "javax.faces.partial.execute";
    Const.P_RENDER = "javax.faces.partial.render";
    Const.P_EVT = "javax.faces.partial.event";
    Const.P_CLIENT_WINDOW = "javax.faces.ClientWindow";
    Const.P_RESET_VALUES = "javax.faces.partial.resetValues";
    Const.P_WIN_ID = "javax.faces.WindowId";
    Const.P_WINDOW_ID = "javax.faces.windowId";
    /* message types */
    Const.ERROR = "error";
    Const.EVENT = "event";
    Const.ON_ERROR = "onerror";
    Const.ON_EVENT = "onevent";
    /* event emitting stages */
    Const.BEGIN = "begin";
    Const.COMPLETE = "complete";
    Const.SUCCESS = "success";
    Const.SOURCE = "source";
    Const.STATUS = "status";
    Const.ERROR_NAME = "error-name";
    Const.ERROR_MESSAGE = "error-message";
    Const.RESPONSE_TEXT = "responseText";
    Const.RESPONSE_XML = "responseXML";
    /*ajax errors spec 14.4.2*/
    Const.HTTPERROR = "httpError";
    Const.EMPTY_RESPONSE = "emptyResponse";
    Const.MALFORMEDXML = "malformedXML";
    Const.SERVER_ERROR = "serverError";
    Const.CLIENT_ERROR = "clientError";
    Const.TIMEOUT_EVENT = "timeout";
    Const.CTX_PARAM_MF_INTERNAL = "_mfInternal";
    Const.CTX_PARAM_SRC_FRM_ID = "_mfSourceFormId";
    Const.CTX_PARAM_SRC_CTL_ID = "_mfSourceControlId";
    Const.CTX_PARAM_TR_TYPE = "_mfTransportType";
    Const.CTX_PARAM_PASS_THR = "passThrgh";
    Const.CTX_PARAM_DELAY = "delay";
    Const.CTX_PARAM_TIMEOUT = "timeout";
    Const.CTX_PARAM_RST = "resetValues";
    Const.CTX_PARAM_EXECUTE = "execute";
    Const.STAGE_DEVELOPMENT = "Development";
    Const.CONTENT_TYPE = "Content-Type";
    Const.HEAD_FACES_REQ = "Faces-Request";
    Const.REQ_ACCEPT = "Accept";
    Const.VAL_AJAX = "partial/ajax";
    Const.ENCODED_URL = "javax.faces.encodedURL";
    Const.REQ_TYPE_GET = "GET";
    Const.REQ_TYPE_POST = "POST";
    Const.STATE_EVT_BEGIN = "begin"; //TODO remove this
    Const.STATE_EVT_TIMEOUT = "TIMEOUT_EVENT";
    Const.STATE_EVT_COMPLETE = "complete"; //TODO remove this
    Const.URL_ENCODED = "application/x-www-form-urlencoded";
    Const.MULTIPART = "multipart/form-data";
    Const.NO_TIMEOUT = 0;
    Const.STD_ACCEPT = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
    Const.TAG_HEAD = "head";
    Const.TAG_FORM = "form";
    Const.TAG_BODY = "body";
    Const.TAG_BEFORE = "before";
    Const.TAG_AFTER = "after";
    Const.TAG_ATTR = "attribute";
    Const.SEL_VIEWSTATE_ELEM = "[name='" + Const.P_VIEWSTATE + "']";
    Const.SEL_RESPONSE_XML = "responseXML";
    Const.PHASE_PROCESS_RESPONSE = "processResponse";
    Const.ERR_NO_PARTIAL_RESPONSE = "Partial response not set";
    Const.ATTR_URL = "url";
    Const.ATTR_NAME = "name";
    Const.ATTR_VALUE = "value";
    Const.ATTR_ID = "id";
    /*partial response types*/
    Const.RESP_PARTIAL = "partial-response";
    Const.RESP_TYPE_ERROR = "error";
    Const.RESP_TYPE_REDIRECT = "redirect";
    Const.RESP_TYPE_CHANGES = "changes";
    /*partial commands*/
    Const.CMD_CHANGES = "changes";
    Const.CMD_UPDATE = "update";
    Const.CMD_DELETE = "delete";
    Const.CMD_INSERT = "insert";
    Const.CMD_EVAL = "eval";
    Const.CMD_ERROR = "error";
    Const.CMD_ATTRIBUTES = "attributes";
    Const.CMD_EXTENSION = "extension";
    Const.CMD_REDIRECT = "redirect";
    /*other constants*/
    Const.UPDATE_FORMS = "_updateForms";
    Const.UPDATE_ELEMS = "_updateElems";
    Const.MYFACES = "myfaces";
    Const.SEL_SCRIPTS_STYLES = "script, style, link";
    Const.MF_NONE = "__mf_none__";
    Const.REASON_EXPIRED = "Expired";
    Const.APPLIED_VST = "appliedViewState";
    Const.RECONNECT_INTERVAL = 500;
    Const.MAX_RECONNECT_ATTEMPTS = 25;
    Const.HTML_VIEWSTATE = ["<input type='hidden'", "id='", Const.P_VIEWSTATE, "' name='", Const.P_VIEWSTATE, "' value='' />"].join("");
    Const.EMPTY_FUNC = Object.freeze(function () { });
    Const.EMPTY_STR = "";
    Const.EMPTY_MAP = Object.freeze({});
})(Const = exports.Const || (exports.Const = {}));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var monadish_1 = __webpack_require__(4);
var Const_1 = __webpack_require__(11);
var AjaxImpl_1 = __webpack_require__(1);
var Assertions_1 = __webpack_require__(13);
var ErrorData_1 = __webpack_require__(16);
var DomQuery_1 = __webpack_require__(5);
var Lang_1 = __webpack_require__(14);
var trim = monadish_1.Lang.trim;
var getLocalOrGlobalConfig = Lang_1.ExtLang.getLocalOrGlobalConfig;
var ImplTypes_1 = __webpack_require__(18);
var EventData_1 = __webpack_require__(17);
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
 */
var ResponseProcessor = /** @class */ (function () {
    function ResponseProcessor(request, externalContext, internalContext) {
        this.request = request;
        this.externalContext = externalContext;
        this.internalContext = internalContext;
    }
    ResponseProcessor.prototype.replaceHead = function (shadowDocument) {
        var shadowHead = shadowDocument.querySelectorAll(Const_1.Const.TAG_HEAD);
        if (!shadowHead.isPresent()) {
            return;
        }
        var shadowInnerHTML = shadowHead.html().value;
        var oldHead = DomQuery_1.DQ.querySelectorAll(Const_1.Const.TAG_HEAD);
        //delete all to avoid script and style overlays
        oldHead.querySelectorAll(Const_1.Const.SEL_SCRIPTS_STYLES).delete();
        this.storeForEval(shadowHead);
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
        var shadowBody = shadowDocument.querySelectorAll(Const_1.Const.TAG_BODY);
        if (!shadowBody.isPresent()) {
            return;
        }
        var shadowInnerHTML = shadowBody.html().value;
        var resultingBody = DomQuery_1.DQ.querySelectorAll(Const_1.Const.TAG_BODY).html(shadowInnerHTML);
        var updateForms = resultingBody.querySelectorAll(Const_1.Const.TAG_FORM);
        resultingBody.copyAttrs(shadowBody);
        this.storeForPostProcessing(updateForms, resultingBody);
    };
    /**
     * Leaf Tag eval... process whatever is in the evals cdata block
     *
     * @param node the node to eval
     */
    ResponseProcessor.prototype.eval = function (node) {
        DomQuery_1.DQ.globalEval(node.cDATAAsString);
    };
    /**
     * processes an incoming error from the response
     * which is hosted under the &lt;error&gt; tag
     * @param request the current request
     * @param context the context object
     * @param node the node in the xml hosting the error message
     */
    ResponseProcessor.prototype.error = function (node) {
        /**
         * <error>
         *      <error-name>String</error-name>
         *      <error-message><![CDATA[message]]></error-message>
         * <error>
         */
        var mergedErrorData = new monadish_1.Config({});
        mergedErrorData.assign(Const_1.Const.SOURCE).value = this.externalContext.getIf(Const_1.Const.P_PARTIAL_SOURCE).get(0).value;
        mergedErrorData.assign(Const_1.Const.ERROR_NAME).value = node.getIf(Const_1.Const.ERROR_NAME).textContent("");
        mergedErrorData.assign(Const_1.Const.ERROR_MESSAGE).value = node.getIf(Const_1.Const.ERROR_MESSAGE).cDATAAsString;
        var hasResponseXML = this.internalContext.get(Const_1.Const.RESPONSE_XML).isPresent();
        mergedErrorData.assignIf(hasResponseXML, Const_1.Const.RESPONSE_XML).value = this.internalContext.getIf(Const_1.Const.RESPONSE_XML).value.get(0).value;
        var errorData = ErrorData_1.ErrorData.fromServerError(mergedErrorData);
        this.externalContext.getIf(Const_1.Const.ON_ERROR).orElse(this.internalContext.getIf(Const_1.Const.ON_ERROR).value).orElse(Const_1.Const.EMPTY_FUNC).value(errorData);
        AjaxImpl_1.Implementation.sendError(errorData);
    };
    /**
     * process the redirect operation
     *
     * @param node
     */
    ResponseProcessor.prototype.redirect = function (node) {
        Assertions_1.Assertions.assertUrlExists(node);
        var redirectUrl = trim(node.attr(Const_1.Const.ATTR_URL).value);
        if (redirectUrl != "") {
            window.location.href = redirectUrl;
        }
    };
    /**
     * processes the update operation and updates the node with the cdata block
     * @param context
     * @param internalContext
     * @param node
     * @param cdataBlock
     */
    ResponseProcessor.prototype.update = function (node, cdataBlock) {
        var _a;
        var result = DomQuery_1.DQ.byId(node.id.value).outerHTML(cdataBlock, false, false);
        var sourceForm = (_a = result) === null || _a === void 0 ? void 0 : _a.parents(Const_1.Const.TAG_FORM).orElse(result.byTagName(Const_1.Const.TAG_FORM, true));
        if (sourceForm) {
            this.storeForPostProcessing(sourceForm, result);
        }
    };
    ResponseProcessor.prototype.delete = function (node) {
        DomQuery_1.DQ.byId(node.id.value).delete();
    };
    /**
     * attributes leaf tag... process the attributes
     *
     * @param node
     */
    ResponseProcessor.prototype.attributes = function (node) {
        var elem = DomQuery_1.DQ.byId(node.id.value);
        node.byTagName(Const_1.Const.TAG_ATTR).each(function (item) {
            elem.attr(item.attr(Const_1.Const.ATTR_NAME).value).value = item.attr(Const_1.Const.ATTR_VALUE).value;
        });
    };
    /**
     * @param shadownResponse
     */
    ResponseProcessor.prototype.replaceViewRoot = function (shadowDocument) {
        this.replaceHead(shadowDocument);
        this.replaceBody(shadowDocument);
    };
    /**
     * insert handling, either before or after
     *
     * @param node
     */
    ResponseProcessor.prototype.insert = function (node) {
        //let insertId = node.id; //not used atm
        var before = node.attr(Const_1.Const.TAG_BEFORE);
        var after = node.attr(Const_1.Const.TAG_AFTER);
        var insertNodes = DomQuery_1.DQ.fromMarkup(node.cDATAAsString);
        if (before.isPresent()) {
            var res = DomQuery_1.DQ.byId(before.value).insertBefore(insertNodes);
            this.internalContext.assign(Const_1.Const.UPDATE_ELEMS).value.push(insertNodes);
        }
        if (after.isPresent()) {
            var domQuery = DomQuery_1.DQ.byId(after.value);
            domQuery.insertAfter(insertNodes);
            this.internalContext.assign(Const_1.Const.UPDATE_ELEMS).value.push(insertNodes);
        }
    };
    ResponseProcessor.prototype.insertWithSubtags = function (node) {
        var _this = this;
        var before = node.querySelectorAll(Const_1.Const.TAG_BEFORE);
        var after = node.querySelectorAll(Const_1.Const.TAG_AFTER);
        before.each(function (item) {
            var insertId = item.attr(Const_1.Const.ATTR_ID);
            var insertNodes = DomQuery_1.DQ.fromMarkup(item.cDATAAsString);
            if (insertId.isPresent()) {
                DomQuery_1.DQ.byId(insertId.value).insertBefore(insertNodes);
                _this.internalContext.assign(Const_1.Const.UPDATE_ELEMS).value.push(insertNodes);
            }
        });
        after.each(function (item) {
            var insertId = item.attr(Const_1.Const.ATTR_ID);
            var insertNodes = DomQuery_1.DQ.fromMarkup(item.cDATAAsString);
            if (insertId.isPresent()) {
                DomQuery_1.DQ.byId(insertId.value).insertAfter(insertNodes);
                _this.internalContext.assign(Const_1.Const.UPDATE_ELEMS).value.push(insertNodes);
            }
        });
    };
    /**
     * process the viewState update, update the affected
     * forms with their respective new viewstate values
     *
     */
    ResponseProcessor.prototype.processViewState = function (node) {
        if (this.isViewStateNode(node)) {
            var viewStateValue = node.textContent();
            this.internalContext.assign(Const_1.Const.APPLIED_VST, node.id.value).value = new ImplTypes_1.ViewState(node.id.value, viewStateValue);
            return true;
        }
        return false;
    };
    ResponseProcessor.prototype.globalEval = function () {
        var updateElems = new (DomQuery_1.DQ.bind.apply(DomQuery_1.DQ, __spreadArrays([void 0], this.internalContext.getIf(Const_1.Const.UPDATE_ELEMS).value)))();
        updateElems.runCss();
        updateElems.runScripts();
    };
    ResponseProcessor.prototype.fixViewStates = function () {
        var _this = this;
        monadish_1.Stream.ofAssoc(this.internalContext.getIf(Const_1.Const.APPLIED_VST).orElse({}).value)
            .each(function (item) {
            var key = item[0];
            var value = item[1];
            var nameSpace = DomQuery_1.DQ.byId(value.nameSpace).orElse(document.body);
            var affectedForms = nameSpace.byTagName(Const_1.Const.TAG_FORM);
            var affectedForms2 = nameSpace.filter(function (item) { return item.tagName.orElse("").value.toLowerCase() == Const_1.Const.TAG_FORM; });
            _this.appendViewStateToForms(new monadish_1.DomQuery(affectedForms, affectedForms2), value.value);
        });
    };
    ResponseProcessor.prototype.done = function () {
        var eventData = EventData_1.EventData.createFromRequest(this.request.value, this.externalContext, Const_1.Const.SUCCESS);
        //because some frameworks might decorate them over the context in the response
        var eventHandler = this.externalContext.getIf(Const_1.Const.ON_EVENT).orElse(this.internalContext.getIf(Const_1.Const.ON_EVENT).value).orElse(Const_1.Const.EMPTY_FUNC).value;
        AjaxImpl_1.Implementation.sendEvent(eventData, eventHandler);
    };
    ResponseProcessor.prototype.isAllFormResolution = function (context) {
        return getLocalOrGlobalConfig(context, "no_portlet_env", false);
    };
    ResponseProcessor.prototype.appendViewStateToForms = function (forms, viewState) {
        var _this = this;
        forms.each(function (form) {
            var viewStateElems = form.querySelectorAll(Const_1.Const.SEL_VIEWSTATE_ELEM)
                .orElseLazy(function () { return _this.newViewStateElement(form); });
            viewStateElems.attr("value").value = viewState;
        });
    };
    /**
     * Helper to Create a new JSF ViewState Element
     *
     * @param parent, the parent node to attach the viewstate element to
     * (usually a form node)
     */
    ResponseProcessor.prototype.newViewStateElement = function (parent) {
        var newViewState = DomQuery_1.DQ.fromMarkup(Const_1.Const.HTML_VIEWSTATE);
        newViewState.appendTo(parent);
        return newViewState;
    };
    /**
     * Stores certain aspects of the dom for later post processing
     *
     * @param updateForms the update forms which should receive standardized internal jsf data
     * @param toBeEvaled the resulting elements which should be evaled
     */
    ResponseProcessor.prototype.storeForPostProcessing = function (updateForms, toBeEvaled) {
        this.storeForUpdate(updateForms);
        this.storeForEval(toBeEvaled);
    };
    ResponseProcessor.prototype.storeForUpdate = function (updateForms) {
        this.internalContext.assign(Const_1.Const.UPDATE_FORMS).value.push(updateForms);
    };
    ResponseProcessor.prototype.storeForEval = function (toBeEvaled) {
        this.internalContext.assign(Const_1.Const.UPDATE_ELEMS).value.push(toBeEvaled);
    };
    ResponseProcessor.prototype.isViewStateNode = function (node) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var separatorchar = window.jsf.separatorchar;
        return "undefined" != typeof ((_b = (_a = node) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.value) && (((_d = (_c = node) === null || _c === void 0 ? void 0 : _c.id) === null || _d === void 0 ? void 0 : _d.value) == Const_1.Const.P_VIEWSTATE ||
            ((_g = (_f = (_e = node) === null || _e === void 0 ? void 0 : _e.id) === null || _f === void 0 ? void 0 : _f.value) === null || _g === void 0 ? void 0 : _g.indexOf([separatorchar, Const_1.Const.P_VIEWSTATE].join(""))) != -1 ||
            ((_k = (_j = (_h = node) === null || _h === void 0 ? void 0 : _h.id) === null || _j === void 0 ? void 0 : _j.value) === null || _k === void 0 ? void 0 : _k.indexOf([Const_1.Const.P_VIEWSTATE, separatorchar].join(""))) != -1);
    };
    return ResponseProcessor;
}());
exports.ResponseProcessor = ResponseProcessor;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var monadish_1 = __webpack_require__(4);
var Const_1 = __webpack_require__(11);
var Lang_1 = __webpack_require__(14);
var getMessage = Lang_1.ExtLang.getMessage;
var makeException = Lang_1.ExtLang.makeException;
/**
 * a set of internal code assertions
 * which raise an error
 *
 */
var Assertions;
(function (Assertions) {
    function assertRequestIntegrity(options, elem) {
        /*assert if the onerror is set and once if it is set it must be of type function*/
        assertFunction(options.getIf(Const_1.Const.ON_ERROR).value);
        /*assert if the onevent is set and once if it is set it must be of type function*/
        assertFunction(options.getIf(Const_1.Const.ON_EVENT).value);
        //improve the error messages if an empty elem is passed
        //Assertions.assertElementExists(elem);
        assert(elem.isPresent(), getMessage("ERR_MUST_BE_PROVIDED1", "{0}: source  must be provided or exist", "source element id"), "jsf.ajax.request", "ArgNotSet");
    }
    Assertions.assertRequestIntegrity = assertRequestIntegrity;
    function assertUrlExists(node) {
        if (node.attr(Const_1.Const.ATTR_URL).isAbsent()) {
            throw Assertions.raiseError(new Error(), getMessage("ERR_RED_URL", null, "_Ajaxthis.processRedirect"), "processRedirect");
        }
    }
    Assertions.assertUrlExists = assertUrlExists;
    /**
     * checks the xml for various issues which can occur
     * and prevent a proper processing
     */
    function assertValidXMLResponse(responseXML) {
        assert(!responseXML.isAbsent(), Const_1.Const.EMPTY_RESPONSE, Const_1.Const.PHASE_PROCESS_RESPONSE);
        assert(!responseXML.isXMLParserError(), responseXML.parserErrorText(""), Const_1.Const.PHASE_PROCESS_RESPONSE);
        assert(responseXML.querySelectorAll(Const_1.Const.RESP_PARTIAL).isPresent(), Const_1.Const.ERR_NO_PARTIAL_RESPONSE, Const_1.Const.PHASE_PROCESS_RESPONSE);
    }
    Assertions.assertValidXMLResponse = assertValidXMLResponse;
    /**
     * internal helper which raises an error in the
     * format we need for further processing
     *
     * @param message the message
     * @param title the title of the error (optional)
     * @param name the name of the error (optional)
     */
    function raiseError(error, message, caller, title, name) {
        var finalTitle = (title !== null && title !== void 0 ? title : Const_1.Const.MALFORMEDXML);
        var finalName = (name !== null && name !== void 0 ? name : Const_1.Const.MALFORMEDXML);
        var finalMessage = (message !== null && message !== void 0 ? message : "");
        //TODO clean up the messy makeException, this is a perfect case for encapsulation and sane defaults
        return makeException(error, finalTitle, finalName, "Response", caller || ((arguments.caller) ? arguments.caller.toString() : "_raiseError"), finalMessage);
    }
    Assertions.raiseError = raiseError;
    /*
     * using the new typescript 3.7 compiler assertion functionality to improve compiler hinting
     * we are not fully there yet, but soon
     */
    function assert(value, msg, caller, title) {
        if (msg === void 0) { msg = ""; }
        if (caller === void 0) { caller = ""; }
        if (title === void 0) { title = "Assertion Error"; }
        if (!value) {
            throw Assertions.raiseError(new Error(), msg, caller, title);
        }
    }
    Assertions.assert = assert;
    function assertType(value, theType, msg, caller, title) {
        if (msg === void 0) { msg = ""; }
        if (caller === void 0) { caller = ""; }
        if (title === void 0) { title = "Type Assertion Error"; }
        if ((!!value) && !monadish_1.Lang.assertType(value, theType)) {
            throw Assertions.raiseError(new Error(), msg, caller, title);
        }
    }
    Assertions.assertType = assertType;
    function assertFunction(value, msg, caller, title) {
        if (msg === void 0) { msg = ""; }
        if (caller === void 0) { caller = ""; }
        if (title === void 0) { title = "Assertion Error"; }
        assertType(value, "function", msg, caller, title);
    }
    Assertions.assertFunction = assertFunction;
})(Assertions = exports.Assertions || (exports.Assertions = {}));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
 *
 * todo replace singleton with module definition
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Lang_1 = __webpack_require__(7);
var Messages_1 = __webpack_require__(15);
var DomQuery_1 = __webpack_require__(5);
var monadish_1 = __webpack_require__(4);
var ExtLang;
(function (ExtLang) {
    var installedLocale;
    var nameSpace = "impl/util/Lang/";
    function getLanguage() {
        //TODO global config override
        var _a, _b, _c;
        var language = (_b = (_a = navigator.languages) === null || _a === void 0 ? void 0 : _a[0], (_b !== null && _b !== void 0 ? _b : (_c = navigator) === null || _c === void 0 ? void 0 : _c.language));
        language = language.split("-")[0];
        return language;
    }
    ExtLang.getLanguage = getLanguage;
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
     *     let var: Optional<string> = saveResolve(() => a.b.c.d.e, "foobaz")
     * </code>
     *
     * @param resolverProducer a lambda which can produce the value
     * @param defaultValue an optional default value if the producer failes to produce anything
     * @returns an Optional of the produced value
     */
    function failSaveResolve(resolverProducer, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        return Lang_1.Lang.saveResolve(resolverProducer, defaultValue);
    }
    ExtLang.failSaveResolve = failSaveResolve;
    function failSaveExecute(resolverProducer, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        Lang_1.Lang.saveResolve(resolverProducer, defaultValue);
    }
    ExtLang.failSaveExecute = failSaveExecute;
    /**
     * returns a given localized message upon a given key
     * basic java log like templating functionality is included
     *
     * @param {String} key the key for the message
     * @param {String} defaultMessage optional default message if none was found
     *
     * Additionally you can pass additional arguments, which are used
     * in the same way java log templates use the params
     *
     * @param templateParams the param list to be filled in
     */
    function getMessage(key, defaultMessage) {
        var templateParams = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            templateParams[_i - 2] = arguments[_i];
        }
        var _a, _b;
        installedLocale = (installedLocale !== null && installedLocale !== void 0 ? installedLocale : new Messages_1.Messages());
        var msg = (_b = (_a = installedLocale[key], (_a !== null && _a !== void 0 ? _a : defaultMessage)), (_b !== null && _b !== void 0 ? _b : key + " - undefined message"));
        monadish_1.Stream.of.apply(monadish_1.Stream, templateParams).each(function (param, cnt) {
            msg = msg.replace(new RegExp(["\\{", cnt, "\\}"].join(""), "g"), param);
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
     * determines the correct event depending
     * on the browsers state
     *
     * @param evt incoming event object (note not all browsers
     * have this)
     *
     * @return an event object no matter what is incoming
     */
    function getEvent(evt) {
        var _a, _b;
        return _b = (evt !== null && evt !== void 0 ? evt : (_a = window) === null || _a === void 0 ? void 0 : _a.event), (_b !== null && _b !== void 0 ? _b : {});
    }
    ExtLang.getEvent = getEvent;
    /**
     * cross port from the dojo lib
     * browser save event resolution
     * @param evt the event object
     * (with a fallback for ie events if none is present)
     */
    function getEventTarget(evt) {
        var _a, _b, _c, _d, _e;
        //ie6 and 7 fallback
        evt = getEvent(evt);
        /**
         * evt source is defined in the jsf events
         * seems like some component authors use our code
         * so we add it here see also
         * https://issues.apache.org/jira/browse/MYFACES-2458
         * not entirely a bug but makes sense to add this
         * behavior. I dont use it that way but nevertheless it
         * does not break anything so why not
         * */
        var t = (_d = (_b = (_a = evt) === null || _a === void 0 ? void 0 : _a.srcElement, (_b !== null && _b !== void 0 ? _b : (_c = evt) === null || _c === void 0 ? void 0 : _c.target)), (_d !== null && _d !== void 0 ? _d : (_e = evt) === null || _e === void 0 ? void 0 : _e.source));
        while ((t) && (t.nodeType != 1)) {
            t = t.parentNode;
        }
        return t;
    }
    ExtLang.getEventTarget = getEventTarget;
    /**
     * creates an exeption with additional internal parameters
     * for extra information
     *
     * @param {String} title the exception title
     * @param {String} name  the exception name
     * @param {String} callerCls the caller class
     * @param {String} callFunc the caller function
     * @param {String} message the message for the exception
     */
    function makeException(error, title, name, callerCls, callFunc, message) {
        var _a;
        return new Error((_a = message + ((callerCls !== null && callerCls !== void 0 ? callerCls : nameSpace)) + callFunc, (_a !== null && _a !== void 0 ? _a : ("" + arguments.caller.toString()))));
    }
    ExtLang.makeException = makeException;
    /**
     * fetches a global config entry
     * @param {String} configName the name of the configuration entry
     * @param {Object} defaultValue
     *
     * @return either the config entry or if none is given the default value
     */
    function getGlobalConfig(configName, defaultValue) {
        var _a, _b, _c, _d;
        /**
         * note we could use exists but this is an heavy operation, since the config name usually
         * given this function here is called very often
         * is a single entry without . in between we can do the lighter shortcut
         */
        return _d = (_c = (_b = (_a = window) === null || _a === void 0 ? void 0 : _a.myfaces) === null || _b === void 0 ? void 0 : _b.config) === null || _c === void 0 ? void 0 : _c[configName], (_d !== null && _d !== void 0 ? _d : defaultValue);
    }
    ExtLang.getGlobalConfig = getGlobalConfig;
    /**
     * gets the local or global options with local ones having higher priority
     * if no local or global one was found then the default value is given back
     *
     * @param {String} configName the name of the configuration entry
     * @param {String} localOptions the local options root for the configuration myfaces as default marker is added implicitely
     *
     * @param {Object} defaultValue
     *
     * @return either the config entry or if none is given the default value
     */
    function getLocalOrGlobalConfig(localOptions, configName, defaultValue) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return _h = (_d = (_c = (_b = (_a = localOptions.value) === null || _a === void 0 ? void 0 : _a.myfaces) === null || _b === void 0 ? void 0 : _b.config) === null || _c === void 0 ? void 0 : _c[configName], (_d !== null && _d !== void 0 ? _d : (_g = (_f = (_e = window) === null || _e === void 0 ? void 0 : _e.myfaces) === null || _f === void 0 ? void 0 : _f.config) === null || _g === void 0 ? void 0 : _g[configName])), (_h !== null && _h !== void 0 ? _h : defaultValue);
    }
    ExtLang.getLocalOrGlobalConfig = getLocalOrGlobalConfig;
    ;
    /**
     * fetches the form in an unprecise manner depending
     * on an element or event target
     *
     * @param elem
     * @param event
     */
    function getForm(elem, event) {
        var FORM = "form";
        var queryElem = new DomQuery_1.DQ(elem);
        var eventTarget = new DomQuery_1.DQ(ExtLang.getEventTarget(event));
        if (queryElem.isTag(FORM)) {
            return queryElem;
        }
        //html 5 for handling
        if (queryElem.attr(FORM).isPresent()) {
            var formId = queryElem.attr(FORM).value;
            var foundForm = DomQuery_1.DQ.byId(formId);
            if (foundForm.isPresent()) {
                return foundForm;
            }
        }
        var form = queryElem.parents(FORM)
            .orElseLazy(function () { return queryElem.byTagName(FORM, true); })
            .orElseLazy(function () { return eventTarget.parents(FORM); })
            .orElseLazy(function () { return eventTarget.byTagName(FORM); })
            .first();
        assertFormExists(form);
        return form;
    }
    ExtLang.getForm = getForm;
    function assertFormExists(form) {
        if (form.isAbsent()) {
            throw makeException(new Error(), null, null, "Impl", "getForm", getMessage("ERR_FORM"));
        }
    }
})(ExtLang = exports.ExtLang || (exports.ExtLang = {}));


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
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
        this.ERR_VIEWSTATE = "jsf.viewState= param value not of type form!";
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Const_1 = __webpack_require__(11);
var EventData_1 = __webpack_require__(17);
var Lang_1 = __webpack_require__(14);
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
        return new ErrorData("client", e.name, e.message, e.stack);
    };
    ErrorData.fromHttpConnection = function (source, name, message, responseText, responseCode) {
        return new ErrorData(source, name, message, responseText, responseCode, null, "UNKNOWN", ErrorType.HTTP_ERROR);
    };
    ErrorData.fromGeneric = function (context, errorCode, errorType) {
        var UNKNOWN = "UNKNOWN";
        var getMsg = this.getMsg;
        var source = getMsg(context, Const_1.Const.SOURCE);
        var errorName = getMsg(context, Const_1.Const.ERROR_NAME);
        var errorMessage = getMsg(context, Const_1.Const.ERROR_MESSAGE);
        var status = getMsg(context, Const_1.Const.STATUS);
        var responseText = getMsg(context, Const_1.Const.RESPONSE_TEXT);
        var responseXML = getMsg(context, Const_1.Const.RESPONSE_XML);
        return new ErrorData(source, name, errorMessage, responseText, responseXML, errorCode + "", status, ErrorType.SERVER_ERROR);
    };
    ErrorData.getMsg = function (context, param) {
        var UNKNOWN = "UNKNOWN";
        return getMessage(context.getIf(param).orElse(UNKNOWN).value);
    };
    ErrorData.fromServerError = function (context) {
        return this.fromGeneric(context, -1, ErrorType.SERVER_ERROR);
    };
    return ErrorData;
}(EventData_1.EventData));
exports.ErrorData = ErrorData;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var monadish_1 = __webpack_require__(4);
var Const_1 = __webpack_require__(11);
var Lang_1 = __webpack_require__(14);
var getMessage = Lang_1.ExtLang.getMessage;
var EventData = /** @class */ (function () {
    function EventData() {
    }
    EventData.createFromRequest = function (request, context, /*event name*/ name) {
        var _a, _b, _c, _d;
        var eventData = new EventData();
        var UNKNOWN = getMessage("UNKNOWN");
        eventData.type = Const_1.Const.EVENT;
        eventData.status = name;
        var sourceId = context.getIf(Const_1.Const.SOURCE)
            .orElse(context.getIf(Const_1.Const.P_PARTIAL_SOURCE).value)
            .orElse(context.getIf(Const_1.Const.CTX_PARAM_PASS_THR, Const_1.Const.P_PARTIAL_SOURCE).value).value;
        if (sourceId) {
            eventData.source = monadish_1.DQ.byId(sourceId).first().value.value;
        }
        if (name !== Const_1.Const.BEGIN) {
            eventData.responseCode = (_b = (_a = request) === null || _a === void 0 ? void 0 : _a.status) === null || _b === void 0 ? void 0 : _b.toString();
            eventData.responseText = (_c = request) === null || _c === void 0 ? void 0 : _c.responseText;
            eventData.responseXML = (_d = request) === null || _d === void 0 ? void 0 : _d.responseXML;
        }
        return eventData;
    };
    return EventData;
}());
exports.EventData = EventData;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var Const_1 = __webpack_require__(11);
/**
 * a helper class to isolate the
 * view state data processing
 */
var ViewState = /** @class */ (function () {
    function ViewState(id, value) {
        this.id = id;
        this.value = value;
        var viewStatePos = id.indexOf(Const_1.Const.P_VIEWSTATE);
        this.nameSpace = viewStatePos > 0 ? id.substr(0, viewStatePos - 1) : "";
    }
    Object.defineProperty(ViewState.prototype, "hasNameSpace", {
        get: function () {
            var _a, _b;
            return !!(_b = (_a = this) === null || _a === void 0 ? void 0 : _a.nameSpace, (_b !== null && _b !== void 0 ? _b : "")).length;
        },
        enumerable: true,
        configurable: true
    });
    return ViewState;
}());
exports.ViewState = ViewState;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var monadish_1 = __webpack_require__(4);
var Const_1 = __webpack_require__(11);
var Assertions_1 = __webpack_require__(13);
var DomQuery_1 = __webpack_require__(5);
/**
 * Resolver for various aspects of the response data
 *
 * stateless because it might be called from various
 * parts of the response classes
 */
var ResonseDataResolver;
(function (ResonseDataResolver) {
    /**
     * fetches the response XML
     * as XML Query object
     *
     * @param request the request hosting the responseXML
     *
     * Throws an error in case of non existent or wrong xml data
     *
     */
    function resolveResponseXML(request) {
        var ret = new monadish_1.XMLQuery(request.getIf(Const_1.Const.SEL_RESPONSE_XML).value);
        Assertions_1.Assertions.assertValidXMLResponse(ret);
        return ret;
    }
    ResonseDataResolver.resolveResponseXML = resolveResponseXML;
    /**
     * Splits the incoming passthrough context apart
     * in an internal and an external nomalized context
     * the internal one is just for our internal processing
     *
     * @param context the root context as associative array
     */
    function resolveContexts(context) {
        /**
         * we split the context apart into the external one and
         * some internal values
         */
        var externalContext = monadish_1.Config.fromNullable(context);
        var internalContext = externalContext.getIf(Const_1.Const.CTX_PARAM_MF_INTERNAL);
        if (!internalContext.isPresent()) {
            internalContext = monadish_1.Config.fromNullable({});
        }
        /**
         * prepare storage for some deferred operations
         */
        internalContext.assign(Const_1.Const.UPDATE_FORMS).value = [];
        internalContext.assign(Const_1.Const.UPDATE_ELEMS).value = [];
        return { externalContext: externalContext, internalContext: internalContext };
    }
    ResonseDataResolver.resolveContexts = resolveContexts;
    /**
     * fetches the source element out of our conexts
     *
     * @param context the external context which shpuld host the source id
     * @param internalContext internal passthrough fall back
     *
     */
    function resolveSourceElement(context, internalContext) {
        var elemId = resolveSourceElementId(context, internalContext);
        var elem = DomQuery_1.DQ.byId(elemId.value);
        return elem;
    }
    ResonseDataResolver.resolveSourceElement = resolveSourceElement;
    /**
     * fetches the source form if it still exists
     * also embedded forms and parent forms are taken into consideration
     * as fallbacks
     *
     * @param internalContext
     * @param elem
     */
    function resolveSourceForm(internalContext, elem) {
        var sourceFormId = internalContext.getIf(Const_1.Const.CTX_PARAM_SRC_FRM_ID);
        var sourceForm = new DomQuery_1.DQ(sourceFormId.isPresent() ? document.forms[sourceFormId.value] : null);
        sourceForm = sourceForm.orElse(elem.parents(Const_1.Const.TAG_FORM))
            .orElse(elem.querySelectorAll(Const_1.Const.TAG_FORM))
            .orElse(DomQuery_1.DQ.querySelectorAll(Const_1.Const.TAG_FORM));
        return sourceForm;
    }
    ResonseDataResolver.resolveSourceForm = resolveSourceForm;
    function resolveSourceElementId(context, internalContext) {
        //?internal context?? used to be external one
        return internalContext.getIf(Const_1.Const.CTX_PARAM_SRC_CTL_ID)
            .orElseLazy(function () { return context.getIf(Const_1.Const.SOURCE, "id").value; });
    }
})(ResonseDataResolver = exports.ResonseDataResolver || (exports.ResonseDataResolver = {}));


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var AjaxImpl_1 = __webpack_require__(1);
var Const_1 = __webpack_require__(11);
var XhrFormData_1 = __webpack_require__(21);
var ErrorData_1 = __webpack_require__(16);
var EventData_1 = __webpack_require__(17);
var Lang_1 = __webpack_require__(14);
var monadish_1 = __webpack_require__(4);
var failSaveExecute = Lang_1.ExtLang.failSaveExecute;
var XhrRequest = /** @class */ (function () {
    /**
     * Reqired Parameters
     *
     * @param source the issuing element
     * @param sourceForm the form which is related to the issuing element
     * @param requestContext the request context with allö pass through values
     *
     * Optional Parameters
     *
     * @param partialIdsArray an optional restricting partial ids array for encoding
     * @param timeout optional xhr timeout
     * @param ajaxType optional request type, default "POST"
     * @param contentType optional content type, default "application/x-www-form-urlencoded"
     * @param xhrObject optional xhr object which must fullfill the XMLHTTPRequest api, default XMLHttpRequest
     */
    function XhrRequest(source, sourceForm, requestContext, internalContext, partialIdsArray, timeout, ajaxType, contentType, xhrObject) {
        var _this = this;
        if (partialIdsArray === void 0) { partialIdsArray = []; }
        if (timeout === void 0) { timeout = Const_1.Const.NO_TIMEOUT; }
        if (ajaxType === void 0) { ajaxType = Const_1.Const.REQ_TYPE_POST; }
        if (contentType === void 0) { contentType = Const_1.Const.URL_ENCODED; }
        if (xhrObject === void 0) { xhrObject = new XMLHttpRequest(); }
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
        this.catchFuncs = [];
        this.thenFunc = [];
        /*
        * we omit promises here
        * some browsers do not support it and we do not need shim code
        */
        this.registerXhrCallbacks(function (data) { _this.resolve(data); }, function (data) { _this.reject(data); });
    }
    XhrRequest.prototype.start = function () {
        var _this = this;
        var fsExec = failSaveExecute;
        var xhrObject = this.xhrObject;
        try {
            var viewState = jsf.getViewState(this.sourceForm.getAsElem(0).value);
            var formData = new XhrFormData_1.XhrFormData(viewState);
            this.contentType = formData.isMultipartRequest ? Const_1.Const.MULTIPART : this.contentType;
            //next step the pass through parameters are merged in for post params
            var requestContext = this.requestContext;
            var passThroughParams = requestContext.getIf(Const_1.Const.CTX_PARAM_PASS_THR);
            formData.shallowMerge(passThroughParams);
            this.responseContext = passThroughParams.deepCopy;
            //we have to shift the internal passthroughs around to build up our response context
            var responseContext = this.responseContext;
            responseContext.assign(Const_1.Const.CTX_PARAM_MF_INTERNAL).value = this.internalContext.value;
            //per spec the onevent and onerrors must be passed through to the response
            responseContext.assign(Const_1.Const.ON_EVENT).value = requestContext.getIf(Const_1.Const.ON_EVENT).value;
            responseContext.assign(Const_1.Const.ON_ERROR).value = requestContext.getIf(Const_1.Const.ON_ERROR).value;
            xhrObject.open(this.ajaxType, this.resolveFinalUrl(formData), true);
            //adding timeout
            this.timeout ? xhrObject.timeout = this.timeout : null;
            //a bug in the xhr stub library prevents the setRequestHeader to be properly executed on fake xhr objects
            //normal browsers should resolve this
            //tests can quietly fail on this one
            fsExec(function () { return xhrObject.setRequestHeader(Const_1.Const.CONTENT_TYPE, _this.contentType + "; charset=utf-8"); });
            fsExec(function () { return xhrObject.setRequestHeader(Const_1.Const.HEAD_FACES_REQ, Const_1.Const.VAL_AJAX); });
            //probably not needed anymore, will test this
            //some webkit based mobile browsers do not follow the w3c spec of
            // setting the accept headers automatically
            fsExec(function () { return xhrObject.setRequestHeader(Const_1.Const.REQ_ACCEPT, Const_1.Const.STD_ACCEPT); });
            this.sendEvent(Const_1.Const.BEGIN);
            this.sendRequest(formData);
        }
        catch (e) {
            //_onError//_onError
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
        monadish_1.Stream.of.apply(monadish_1.Stream, this.thenFunc).reduce(function (inputVal, thenFunc) {
            return thenFunc(inputVal);
        }, data);
    };
    XhrRequest.prototype.reject = function (data) {
        monadish_1.Stream.of.apply(monadish_1.Stream, this.catchFuncs).reduce(function (inputVal, catchFunc) {
            return catchFunc(inputVal);
        }, data);
    };
    XhrRequest.prototype.catch = function (func) {
        //this.$promise.catch(func);
        this.catchFuncs.push(func);
        return this;
    };
    XhrRequest.prototype.finally = function (func) {
        //no ie11 support we probably are going to revert to shims for that one
        //(<any>this.$promise).then(func).catch(func);
        this.catchFuncs.push(func);
        this.thenFunc.push(func);
        return this;
    };
    XhrRequest.prototype.then = function (func) {
        //this.$promise.then(func);
        this.thenFunc.push(func);
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
            _this.onAbort(resolve, reject);
        };
        xhrObject.ontimeout = function () {
            _this.onTimeout(resolve, reject);
        };
        xhrObject.onload = function () {
            _this.onSuccess(_this.xhrObject, resolve, reject);
        };
        xhrObject.onloadend = function () {
            _this.onDone(_this.xhrObject, resolve, reject);
        };
        xhrObject.onerror = function (errorData) {
            _this.onError(errorData, resolve, reject);
        };
    };
    /*
     * xhr processing callbacks
     *
     * Those methods are the callbacks called by
     * the xhr object depending on its own state
     */
    XhrRequest.prototype.onAbort = function (resolve, reject) {
        reject();
    };
    XhrRequest.prototype.onTimeout = function (resolve, reject) {
        this.sendEvent(Const_1.Const.STATE_EVT_TIMEOUT);
        reject();
    };
    XhrRequest.prototype.onSuccess = function (data, resolve, reject) {
        var _a, _b, _c;
        this.sendEvent(Const_1.Const.COMPLETE);
        //malforms always result in empty response xml
        if (!((_b = (_a = this) === null || _a === void 0 ? void 0 : _a.xhrObject) === null || _b === void 0 ? void 0 : _b.responseXML)) {
            this.handleMalFormedXML(resolve);
            return;
        }
        jsf.ajax.response(this.xhrObject, (_c = this.responseContext.value, (_c !== null && _c !== void 0 ? _c : {})));
    };
    XhrRequest.prototype.handleMalFormedXML = function (resolve) {
        var _a;
        this.stopProgress = true;
        var errorData = {
            type: Const_1.Const.ERROR,
            status: Const_1.Const.MALFORMEDXML,
            responseCode: 200,
            responseText: (_a = this.xhrObject) === null || _a === void 0 ? void 0 : _a.responseText,
            source: {
                id: this.source.id.value
            }
        };
        try {
            AjaxImpl_1.Implementation.sendError(errorData);
        }
        finally {
            resolve(errorData);
        }
        //non blocking non clearing
    };
    XhrRequest.prototype.onDone = function (data, resolve, reject) {
        if (this.stopProgress) {
            return;
        }
        resolve(data);
    };
    XhrRequest.prototype.onError = function (errorData, resolve, reject) {
        this.handleError(errorData);
        reject();
    };
    /*
     * other helpers
     */
    XhrRequest.prototype.sendEvent = function (evtType) {
        var eventData = EventData_1.EventData.createFromRequest(this.xhrObject, this.requestContext, evtType);
        try {
            //user code error, we might cover
            //this in onError but also we cannot swallow it
            //we need to resolve the local handlers lazyly,
            //because some frameworks might decorate them over the context in the response
            var eventHandler = this.resolveHandlerFunc(Const_1.Const.ON_EVENT);
            ;
            AjaxImpl_1.Implementation.sendEvent(eventData, eventHandler);
        }
        catch (e) {
            this.handleError(e);
            throw e;
        }
    };
    XhrRequest.prototype.handleError = function (exception) {
        var errorData = ErrorData_1.ErrorData.fromClient(exception);
        var eventHandler = this.resolveHandlerFunc(Const_1.Const.ON_ERROR);
        AjaxImpl_1.Implementation.sendError(errorData, eventHandler);
    };
    /**
     * resolves the event handlers lazly
     * so that if some decoration happens in between we can deal with it
     *
     * @param funcName
     */
    XhrRequest.prototype.resolveHandlerFunc = function (funcName) {
        return this.responseContext.getIf(funcName)
            .orElse(this.requestContext.getIf(funcName).value)
            .orElse(Const_1.Const.EMPTY_FUNC).value;
    };
    XhrRequest.prototype.resolveTargetUrl = function (srcFormElement) {
        return (typeof srcFormElement.elements[Const_1.Const.ENCODED_URL] == 'undefined') ?
            srcFormElement.action :
            srcFormElement.elements[Const_1.Const.ENCODED_URL].value;
    };
    XhrRequest.prototype.sendRequest = function (formData) {
        var isPost = this.ajaxType != Const_1.Const.REQ_TYPE_GET;
        if (formData.isMultipartRequest) {
            this.xhrObject.send((isPost) ? formData.toFormData() : null);
        }
        else {
            this.xhrObject.send((isPost) ? formData.toString() : null);
        }
    };
    XhrRequest.prototype.resolveFinalUrl = function (formData) {
        var targetUrl = this.resolveTargetUrl(this.sourceForm.getAsElem(0).value);
        return targetUrl + (this.ajaxType == Const_1.Const.REQ_TYPE_GET ? "?" + formData.toString() : "");
    };
    return XhrRequest;
}());
exports.XhrRequest = XhrRequest;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var monadish_1 = __webpack_require__(4);
var Const_1 = __webpack_require__(11);
var Stream_1 = __webpack_require__(9);
var DomQuery_1 = __webpack_require__(5);
var isString = monadish_1.Lang.isString;
/**
 * we simplify now compared to the old form handling
 * given that we have a configuration in place we can recycle that
 * for the entire parameter generation
 * then we have two fallbacks one for the non multipart case
 * the other one for the multipart case
 *
 * From outside we work on a single form configuration
 * which we can use like any other config
 *
 * TODO make this code smaller we might have
 * enough leverage in the streams collectors
 * api just to do that.
 */
var XhrFormData = /** @class */ (function (_super) {
    __extends(XhrFormData, _super);
    /**
     * by the time we hit this code, datasource alöready must be of type form
     *
     * @param dataSource either a form as domquery object or an encoded url string
     * @param partialIdsArray partial ids to collect
     */
    function XhrFormData(dataSource, partialIdsArray) {
        var _this = _super.call(this, {}) || this;
        _this.dataSource = dataSource;
        _this.partialIdsArray = partialIdsArray;
        //a call to getViewState before must pass the encoded line
        //a call from getViewState passes the form element as datasource
        //so we have two call points
        if (isString(dataSource)) {
            _this.handleStringSource();
        }
        else {
            _this.handleFormSource();
        }
        return _this;
    }
    XhrFormData.prototype.handleFormSource = function () {
        //encode and append the issuing item if not a partial ids array of ids is passed
        /*
         * Spec. 13.3.1
         * Collect and encode input elements.
         * Additionally the hidden element javax.faces.ViewState
         * Enhancement partial page submit
         *
         */
        this.encodeSubmittableFields(this, this.dataSource, this.partialIdsArray);
        if (this.getIf(Const_1.Const.P_VIEWSTATE).isPresent()) {
            return;
        }
        this.applyViewState(this.dataSource);
    };
    XhrFormData.prototype.handleStringSource = function () {
        this.mergeEncodedString(this.dataSource);
        return;
    };
    XhrFormData.prototype.applyViewState = function (form) {
        var _this = this;
        form.byId(Const_1.Const.P_VIEWSTATE)
            .ifPresentLazy(function (elem) {
            var value = elem.inputValue.value;
            _this.assignIf(!!value, Const_1.Const.P_VIEWSTATE).value = value;
        });
    };
    XhrFormData.prototype.mergeEncodedString = function (encoded) {
        var _this = this;
        var splittedEntries = encoded.split(/\&/gi);
        Stream_1.Stream.of.apply(Stream_1.Stream, splittedEntries).map(function (line) { return line.split(/\=/gi); })
            .each(function (keyVal) {
            _this.assign(keyVal[0]).value = keyVal[1] || null;
        });
    };
    // noinspection JSUnusedGlobalSymbols
    /**
     * @returns a Form data representation
     */
    XhrFormData.prototype.toFormData = function () {
        var ret = new FormData();
        for (var key in this.value) {
            if (this.value.hasOwnProperty(key)) {
                ret.append(key, this.value[key]);
            }
        }
        return ret;
    };
    /**
     * returns an encoded string representation of our xhr form data
     *
     * @param defaultStr optional default value if nothing is there to encode
     */
    XhrFormData.prototype.toString = function (defaultStr) {
        if (defaultStr === void 0) { defaultStr = ""; }
        if (this.isAbsent()) {
            return defaultStr;
        }
        var entries = [];
        for (var key in this.value) {
            if (this.value.hasOwnProperty(key)) {
                //key value already encoded so no need to reencode them again
                entries.push(key + "=" + this.value[key]);
            }
        }
        return entries.join("&");
    };
    /**
     * determines fields to submit
     * @param {Object} targetBuf - the target form buffer receiving the data
     * @param {Node} parentItem - form element item is nested in
     * @param {Array} partialIds - ids fo PPS
     */
    XhrFormData.prototype.encodeSubmittableFields = function (targetBuf, parentItem, partialIds) {
        var toEncode = null;
        if (this.partialIdsArray && this.partialIdsArray.length) {
            //in case of our myfaces reduced ppr we only
            //only submit the partials
            //TODO maybe also the window id and other defaults lets see
            //this is not a spec case anyway
            this._value = {};
            toEncode = new (DomQuery_1.DQ.bind.apply(DomQuery_1.DQ, __spreadArrays([void 0], this.partialIdsArray)))();
        }
        else {
            if (parentItem.isAbsent())
                throw "NO_PARITEM";
            toEncode = parentItem;
        }
        //lets encode the form elements
        this.shallowMerge(toEncode.querySelectorAll("input, checkbox, select, textarea").encodeFormElement());
    };
    Object.defineProperty(XhrFormData.prototype, "isMultipartRequest", {
        get: function () {
            return this.dataSource instanceof DomQuery_1.DQ && this.dataSource.querySelectorAll("input[type='file']").isPresent();
        },
        enumerable: true,
        configurable: true
    });
    return XhrFormData;
}(monadish_1.Config));
exports.XhrFormData = XhrFormData;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Asynchronous queue which starts to work
 * through the callbacks until the queue is empty
 *
 * Every callback must be of async runnable
 * which is sort of an extended promise which has
 * added a decicated cancel and start point
 *
 * This interface can be used as wrapper contract
 * for normal promises if needed.
 */
var AsynchronouseQueue = /** @class */ (function () {
    function AsynchronouseQueue() {
        this.runnableQueue = [];
    }
    Object.defineProperty(AsynchronouseQueue.prototype, "isEmpty", {
        get: function () {
            return !this.runnableQueue.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * enequeues an element and starts the
     * asynchronous work loop if not already running
     *
     * @param element the element to be queued and processed
     * @param delay possible delay after our usual process or drop if something newer is incoming algorithm
     */
    AsynchronouseQueue.prototype.enqueue = function (element, delay) {
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
    AsynchronouseQueue.prototype.dequeue = function () {
        return this.runnableQueue.shift();
    };
    AsynchronouseQueue.prototype.cleanup = function () {
        this.currentlyRunning = null;
        this.runnableQueue.length = 0;
    };
    AsynchronouseQueue.prototype.appendElement = function (element) {
        //only if the first element is added we start with a trigger
        //otherwise a process already is running and not finished yet at that
        //time
        this.runnableQueue.push(element);
        if (!this.currentlyRunning) {
            this.runEntry();
        }
    };
    AsynchronouseQueue.prototype.runEntry = function () {
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
    AsynchronouseQueue.prototype.cancel = function () {
        try {
            if (this.currentlyRunning) {
                this.currentlyRunning.cancel();
            }
        }
        finally {
            this.cleanup();
        }
    };
    AsynchronouseQueue.prototype.callForNextElementToProcess = function () {
        this.runEntry();
    };
    AsynchronouseQueue.prototype.processNextElement = function () {
        this.currentlyRunning = null;
        if (!this.isEmpty) {
            this.runEntry();
        }
    };
    AsynchronouseQueue.EVT_NEXT = "__mf_queue_next__";
    return AsynchronouseQueue;
}());
exports.AsynchronouseQueue = AsynchronouseQueue;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Monad_1 = __webpack_require__(6);
var Const_1 = __webpack_require__(11);
var DomQuery_1 = __webpack_require__(5);
/**
 * Extension which adds implementation specific
 * meta data to our dom qury
 *
 * Usage
 * el = new ExtDQ(oldReference)
 * nonce = el.nonce
 * windowId = el.getWindowId
 */
var ExtDomquery = /** @class */ (function (_super) {
    __extends(ExtDomquery, _super);
    function ExtDomquery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ExtDomquery, "windowId", {
        get: function () {
            return new ExtDomquery(document.body).windowId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExtDomquery, "nonce", {
        get: function () {
            return new ExtDomquery(document.body).nonce;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExtDomquery.prototype, "windowId", {
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
                var result = this.querySelectorAll("form input[name='" + Const_1.Const.P_WIN_ID + "']");
                if (result.length > 0) {
                    throw Error("Multiple different windowIds found in document");
                }
                return (result.isPresent()) ? result.getAsElem(0).value.value : fetchWindowIdFromURL();
            }
            else {
                return fetchWindowIdFromURL();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExtDomquery.prototype, "nonce", {
        /*
        determines the jsfjs nonce and adds them to the namespace
        * this is done once and only lazily
        */
        get: function () {
            //already processed
            var myfacesConfig = new Monad_1.Config(window.myfaces);
            var nonce = myfacesConfig.assign("config", "cspMeta", "nonce");
            if (nonce.value) {
                return nonce.value;
            }
            var curScript = new DomQuery_1.DQ(document.currentScript);
            //since our baseline atm is ie11 we cannot use document.currentScript globally
            if (curScript.attr("nonce").value != null) {
                //fastpath for modern browsers
                return curScript.attr("nonce").value;
            }
            var nonceScript = DomQuery_1.DQ.querySelectorAll("script[src], link[src]").lazyStream
                .filter(function (item) { return item.attr("nonce").value != null && item.attr("src") != null; })
                .map((function (item) { return !item.attr("src").value.match(/jsf\.js\?ln\=javax\.faces/gi); }))
                .first();
            if (nonceScript.isPresent()) {
                nonce.value = DomQuery_1.DomQuery.byId(nonceScript.value).attr("nonce").value;
            }
            return nonce.value;
        },
        enumerable: true,
        configurable: true
    });
    ExtDomquery.searchJsfJsFor = function (item) {
        return new ExtDomquery(document).searchJsfJsFor(item);
    };
    ExtDomquery.prototype.searchJsfJsFor = function (rexp) {
        //perfect application for lazy stream
        return DomQuery_1.DQ.querySelectorAll("script").lazyStream
            .filter(function (item) {
            var _a;
            return (_a = item.attr("src").value, (_a !== null && _a !== void 0 ? _a : "")).search(/\/javax\.faces\.resource.*\/jsf\.js.*separator/) != -1;
        }).map(function (item) {
            var result = item.attr("src").value.match(rexp);
            return decodeURIComponent(result[1]);
        }).first();
    };
    ExtDomquery.prototype.globalEval = function (code, nonce) {
        return _super.prototype.globalEval.call(this, code, (nonce !== null && nonce !== void 0 ? nonce : this.nonce));
    };
    return ExtDomquery;
}(DomQuery_1.DQ));
exports.ExtDomquery = ExtDomquery;
exports.ExtDQ = DomQuery_1.DQ;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Typescript port of the jsf.push part in the myfaces implementation
 */
Object.defineProperty(exports, "__esModule", { value: true });
//TODO still work in progress
//this is a 1:1 port for the time being
var Jsf_1 = __webpack_require__(0);
var Const_1 = __webpack_require__(11);
/**
 * Implementation class for the push functionality
 */
var PushImpl;
(function (PushImpl) {
    var URL_PROTOCOL = window.location.protocol.replace("http", "ws") + "//";
    //we expose the member variables for testing purposes
    //they are not directly touched outside of tests
    /* socket map by token */
    PushImpl.sockets = {};
    /* component attributes by clientId */
    PushImpl.components = {};
    /* client ids by token (share websocket connection) */
    PushImpl.clientIdsByTokens = {};
    //needed for testing
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
     *
     * @param {function} onopen The function to be invoked when the web socket is opened.
     * @param {function} onmessage The function to be invoked when a message is received.
     * @param {function} onclose The function to be invoked when the web socket is closed.
     * @param {boolean} autoconnect Whether or not to immediately open the socket. Defaults to <code>false</code>.
     */
    function init(socketClientId, uri, channel, onopen, onmessage, onclose, behaviorScripts, autoconnect) {
        onclose = resolveFunction(onclose);
        if (!window.WebSocket) { // IE6-9.
            onclose(-1, channel);
            return;
        }
        var channelToken = uri.substr(uri.indexOf('?') + 1);
        if (!PushImpl.components[socketClientId]) {
            PushImpl.components[socketClientId] = {
                'channelToken': channelToken,
                'onopen': resolveFunction(onopen),
                'onmessage': resolveFunction(onmessage),
                'onclose': onclose,
                'behaviors': behaviorScripts,
                'autoconnect': autoconnect
            };
            if (!PushImpl.clientIdsByTokens[channelToken]) {
                PushImpl.clientIdsByTokens[channelToken] = [];
            }
            PushImpl.clientIdsByTokens[channelToken].push(socketClientId);
            if (!PushImpl.sockets[channelToken]) {
                PushImpl.sockets[channelToken] = new Socket(channelToken, getBaseURL(uri), channel);
            }
        }
        if (autoconnect) {
            Jsf_1.jsf.push.open(socketClientId);
        }
    }
    PushImpl.init = init;
    function open(socketClientId) {
        var _a, _b;
        getSocket((_b = (_a = PushImpl.components) === null || _a === void 0 ? void 0 : _a[socketClientId]) === null || _b === void 0 ? void 0 : _b.channelToken).open();
    }
    PushImpl.open = open;
    function close(socketClientId) {
        var _a;
        getSocket((_a = PushImpl.components) === null || _a === void 0 ? void 0 : _a[socketClientId].channelToken).close();
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
        Socket.prototype.onopen = function (event) {
            if (!this.reconnectAttempts) {
                var clientIds = PushImpl.clientIdsByTokens[this.channelToken];
                for (var i = clientIds.length - 1; i >= 0; i--) {
                    var socketClientId = clientIds[i];
                    PushImpl.components[socketClientId]['onopen'](this.channel);
                }
            }
            this.reconnectAttempts = 0;
        };
        Socket.prototype.onmmessage = function (event) {
            var message = JSON.parse(event.data);
            for (var i = PushImpl.clientIdsByTokens[this.channelToken].length - 1; i >= 0; i--) {
                var socketClientId = PushImpl.clientIdsByTokens[this.channelToken][i];
                if (document.getElementById(socketClientId)) {
                    try {
                        PushImpl.components[socketClientId]['onmessage'](message, this.channel, event);
                    }
                    catch (e) {
                        //Ignore
                    }
                    var behaviors = PushImpl.components[socketClientId]['behaviors'];
                    var functions = behaviors[message];
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
                //tag dissapeared
                this.close();
            }
        };
        Socket.prototype.onclose = function (event) {
            var _a, _b;
            if (!this.socket
                || (event.code == 1000 && event.reason == Const_1.Const.REASON_EXPIRED)
                || (event.code == 1008)
                || (!this.reconnectAttempts)
                || (this.reconnectAttempts >= Const_1.Const.MAX_RECONNECT_ATTEMPTS)) {
                var clientIds = PushImpl.clientIdsByTokens[this.channelToken];
                for (var i = clientIds.length - 1; i >= 0; i--) {
                    var socketClientId = clientIds[i];
                    PushImpl.components[socketClientId]['onclose']((_a = event) === null || _a === void 0 ? void 0 : _a.code, (_b = this) === null || _b === void 0 ? void 0 : _b.channel, event);
                }
            }
            else {
                setTimeout(this.open, Const_1.Const.RECONNECT_INTERVAL * this.reconnectAttempts++);
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
        };
        return Socket;
    }());
    // Private static functions ---------------------------------------------------------------------------------------
    function getBaseURL(url) {
        if (url.indexOf("://") < 0) {
            var base = window.location.hostname + ":" + window.location.port;
            return URL_PROTOCOL + base + url;
        }
        else {
            return url;
        }
    }
    /**
     * Get socket associated with given channelToken.
     * @param {string} channelToken The name of the web socket channelToken.
     * @return {Socket} Socket associated with given channelToken.
     * @throws {Error} When channelToken is unknown, you may need to initialize
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
        return ((typeof fn !== "function") && (fn = window[fn]), fn);
    }
})(PushImpl = exports.PushImpl || (exports.PushImpl = {}));


/***/ })
/******/ ])));
//# sourceMappingURL=jsf-development.js.map