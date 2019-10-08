///<reference path='../_ext/Dom.d.ts'/>
"use strict";
exports.__esModule = true;
var Queue = require("../_supportive/_Queue");
var myfacesConfig = require("../api/myfaces");
var Lang_1 = require("./util/Lang");
var Dom_1 = require("./util/Dom");
var Request_1 = require("./xhrCore/Request");
var Impl;
(function (Impl) {
    "use strict";
    var globalConfig = myfacesConfig.myfaces.config;
    var Implementation = (function () {
        function Implementation() {
            /*internal identifiers for options*/
            this.IDENT_ALL = "@all";
            this.IDENT_NONE = "@none";
            this.IDENT_THIS = "@this";
            this.IDENT_FORM = "@form";
            /*
             * [STATIC] constants
             */
            this.P_PARTIAL_SOURCE = "javax.faces.source";
            this.P_VIEWSTATE = "javax.faces.ViewState";
            this.P_AJAX = "javax.faces.partial.ajax";
            this.P_EXECUTE = "javax.faces.partial.execute";
            this.P_RENDER = "javax.faces.partial.render";
            this.P_EVT = "javax.faces.partial.event";
            /* message types */
            this.ERROR = "error";
            this.EVENT = "event";
            /* event emitting stages */
            this.BEGIN = "begin";
            this.COMPLETE = "complete";
            this.SUCCESS = "success";
            /*ajax errors spec 14.4.2*/
            this.HTTPERROR = "httpError";
            this.EMPTY_RESPONSE = "emptyResponse";
            this.MALFORMEDXML = "malformedXML";
            this.SERVER_ERROR = "serverError";
            this.CLIENT_ERROR = "clientError";
            this.TIMEOUT_EVENT = "timeout";
            /*error reporting threshold*/
            this._threshold = "ERROR";
            /*blockfilter for the passthrough filtering; the attributes given here
             * will not be transmitted from the options into the passthrough*/
            this._BLOCKFILTER = { onerror: 1, onevent: 1, render: 1, execute: 1, myfaces: 1 };
            this.projectStage = null;
            this.separator = null;
            this.listenerQueue = new Queue._Queue.Queue();
            this.errorQueue = new Queue._Queue.Queue();
        }
        Object.defineProperty(Implementation, "instance", {
            get: function () {
                if (this._instance) {
                    return this.instance;
                }
                this._instance = new Implementation();
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return the project stage also emitted by the server:
         * it cannot be cached and must be delivered over the server
         * The value for it comes from the requestInternal parameter of the jsf.js script called "stage".
         */
        Implementation.prototype.getProjectStage = function () {
            if (globalConfig.projectStage !== null) {
                return globalConfig.projectStage;
            }
            if (this.projectStage !== null) {
                return this.projectStage;
            }
            var scriptTags = document.getElementsByTagName("script");
            var found = false;
            var allowedProjectStages = { STG_PROD: 1, "Development": 1, "SystemTest": 1, "UnitTest": 1 };
            /* run through all script tags and try to find the one that includes jsf.js */
            for (var i = 0; i < scriptTags.length && !found; i++) {
                if (scriptTags[i].src.search(/\/javax\.faces\.resource\/jsf\.js.*ln=javax\.faces/) != -1) {
                    var result = scriptTags[i].src.match(/stage=([^&;]*)/);
                    found = true;
                    if (result) {
                        // we found stage=XXX
                        // return only valid values of ProjectStage
                        this.projectStage = (allowedProjectStages[result[1]]) ? result[1] : null;
                    }
                }
            }
            return this.projectStage;
        };
        /**
         * fetches the separator char from the given script tags
         *
         * @return {char} the separator char for the given script tags
         */
        Implementation.prototype.getSeparatorChar = function () {
            if (globalConfig.separator !== null) {
                return globalConfig.separator;
            }
            if (this.separator) {
                return this.separator;
            }
            var scriptTags = document.getElementsByTagName("script");
            var found = false;
            for (var i = 0; i < scriptTags.length && !found; i++) {
                if (scriptTags[i].src.search(/\/javax\.faces\.resource.*\/jsf\.js.*separator/) != -1) {
                    found = true;
                    var result = scriptTags[i].src.match(/separator=([^&;]*)/);
                    this.separator = decodeURIComponent(result[1]);
                }
            }
            this.separator = this.separator || ":";
            return this.separator;
        };
        Implementation.prototype.chain = function (source, event, funcs) {
            for (var cnt = 0; funcs && cnt < funcs.length; cnt++) {
                var ret = void 0;
                if ("string" != typeof funcs[cnt]) {
                    ret = funcs[cnt].call(source, event);
                }
                else {
                    //either a function or a string can be passed in case of a string we have to wrap it into another function
                    ret = new Function("event", funcs[cnt]).call(source, event);
                }
                if (ret === false) {
                    return false;
                }
            }
            return true;
        };
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
        Implementation.prototype.request = function (elem, event, options) {
            /*namespace remap for our local function context we mix the entire function namespace into
             *a local function variable so that we do not have to write the entire namespace
             *all the time
             **/
            var WINDOW_ID = "javax.faces.windowId";
            /*assert if the onerror is set and once if it is set it must be of type function*/
            Lang_1.Lang.instance.assertType(options.onerror, "function");
            /*assert if the onevent is set and once if it is set it must be of type function*/
            Lang_1.Lang.instance.assertType(options.onevent, "function");
            //options not set we define a default one with nothing
            options = options || {};
            /*preparations for jsf 2.2 windowid handling*/
            //pass the window id into the options if not set already
            if (!options.windowId) {
                var windowId = Dom_1.Dom.instance.getWindowId();
                (windowId) ? options[WINDOW_ID] = windowId : null;
            }
            else {
                options[WINDOW_ID] = options.windowId;
                delete options.windowId;
            }
            /**
             * we cross reference statically hence the mapping here
             * the entire mapping between the functions is stateless
             */
            //null definitely means no event passed down so we skip the ie specific checks
            if ('undefined' == typeof event) {
                event = window.event || null;
            }
            //improve the error messages if an empty elem is passed
            if (!elem) {
                throw Lang_1.Lang.instance.makeException(new Error(), "ArgNotSet", null, this._nameSpace, "request", Lang_1.Lang.instance.getMessage("ERR_MUST_BE_PROVIDED1", "{0}: source  must be provided", "jsf.ajax.request", "source element id"));
            }
            var oldElem = elem;
            elem = Dom_1.Dom.instance.byId(elem);
            if (!elem) {
                throw Lang_1.Lang.instance.makeException(new Error(), "Notfound", null, this._nameSpace, "request", Lang_1.Lang.instance.getMessage("ERR_PPR_UNKNOWNCID", "{0}: Node with id {1} could not be found from source", this._nameSpace + ".request", oldElem));
            }
            var elementId = elem.id;
            /*
             * We make a copy of our options because
             * we should not touch the incoming params!
             */
            var passThrgh = Lang_1.Lang.instance.mixMaps({}, options, true, this._BLOCKFILTER);
            if (event) {
                passThrgh[this.P_EVT] = event.type;
            }
            /**
             * ajax pass through context with the source
             * onevent and onerror
             */
            var context = {
                source: elem,
                onevent: options.onevent,
                onerror: options.onerror,
                //TODO move the myfaces part into the _mfInternal part
                myfaces: options.myfaces,
                _mfInternal: {}
            };
            /**
             * fetch the parent form
             *
             * note we also add an override possibility here
             * so that people can use dummy forms and work
             * with detached objects
             */
            var form = (options.myfaces && options.myfaces.form) ?
                Lang_1.Lang.instance.byId(options["myfaces"]["form"]) :
                this.getForm(elem, event);
            /**
             * binding contract the javax.faces.source must be set
             */
            passThrgh[this.P_PARTIAL_SOURCE] = elementId;
            /**
             * javax.faces.partial.ajax must be set to true
             */
            passThrgh[this.P_AJAX] = true;
            if (options.execute) {
                /*the options must be a blank delimited list of strings*/
                /*compliance with Mojarra which automatically adds @this to an execute
                 * the spec rev 2.0a however states, if none is issued nothing at all should be sent down
                 */
                if (options.execute.indexOf("@this") == -1) {
                    options.execute = options.execute + " @this";
                }
                this.transformList(passThrgh, this.P_EXECUTE, options.execute, form, elementId);
            }
            else {
                passThrgh[this.P_EXECUTE] = elementId;
            }
            if (options.render) {
                this.transformList(passThrgh, this.P_RENDER, options.render, form, elementId);
            }
            /**
             * multiple transports upcoming jsf 2.x feature currently allowed
             * default (no value) xhrQueuedPost
             *
             * xhrQueuedPost
             * xhrPost
             * xhrGet
             * xhrQueuedGet
             * iframePost
             * iframeQueuedPost
             *
             */
            var transportType = this.getTransportType(context, passThrgh, form);
            //additional meta information to speed things up, note internal non jsf
            //pass through options are stored under _mfInternal in the context
            context._mfInternal = {};
            var mfInternal = context._mfInternal;
            mfInternal["_mfSourceFormId"] = form.id;
            mfInternal["_mfSourceControlId"] = elementId;
            mfInternal["_mfTransportType"] = transportType;
            //mojarra compatibility, mojarra is sending the form id as well
            //this is not documented behavior but can be determined by running
            //mojarra under blackbox conditions
            //i assume it does the same as our formId_submit=1 so leaving it out
            //wont hurt but for the sake of compatibility we are going to add it
            passThrgh[form.id] = form.id;
            //delay handling is an experimental feature which will most likely
            //make it into jsf 2.2
            /* jsf2.2 only: options.delay || */
            var delayTimeout = Lang_1.Lang.instance.getLocalOrGlobalConfig(context, "delay", false);
            //TODO emit the request accordingly into the request queue and attach the params to the request for further processing
            Request_1.RequestQueue.instance.request();
            if (delayTimeout) {
                this._delayTimeout = setTimeout(_Lang.hitch(this, function () {
                    this._transport[transportType](elem, form, context, passThrgh);
                }), delayTimeout);
            }
            else {
                this._transport[transportType](elem, form, context, passThrgh);
            }
        };
        /**
         * fetches the form in an unprecise manner depending
         * on an element or event target
         *
         * @param elem
         * @param event
         */
        Implementation.prototype.getForm = function (elem, event) {
            var _Dom = this._Dom;
            var _Lang = this._Lang;
            var form = _Dom.fuzzyFormDetection(elem);
            if (!form && event) {
                //in case of no form is given we retry over the issuing event
                form = _Dom.fuzzyFormDetection(_Lang.getEventTarget(event));
                if (!form) {
                    throw _Lang.makeException(new Error(), null, null, this._nameSpace, "_getForm", _Lang.getMessage("ERR_FORM"));
                }
            }
            else if (!form) {
                throw _Lang.makeException(new Error(), null, null, this._nameSpace, "_getForm", _Lang.getMessage("ERR_FORM"));
            }
            return form;
        };
        /**
         * determines the transport type to be called
         * for the ajax call
         *
         * @param context the context
         * @param passThrgh  pass through values
         * @param form the form which issues the request
         */
        Implementation.prototype.getTransportType = function (context, passThrgh, form) {
            /**
             * if execute or render exist
             * we have to pass them down as a blank delimited string representation
             * of an array of ids!
             */
            //for now we turn off the transport auto selection, to enable 2.0 backwards compatibility
            //on protocol level, the file upload only can be turned on if the auto selection is set to true
            var getConfig = Lang_1.Lang.instance.getLocalOrGlobalConfig;
            var transportAutoSelection = getConfig(context, "transportAutoSelection", false);
            var isMultipart = (transportAutoSelection && form.getAttribut("enctype") == "multipart/form-data") ?
                Dom_1.Dom.instance.isMultipartCandidate(passThrgh[this.P_EXECUTE]) :
                false;
            /**
             * multiple transports upcoming jsf 2.1 feature currently allowed
             * default (no value) xhrQueuedPost
             *
             * xhrQueuedPost
             * xhrPost
             * xhrGet
             * xhrQueuedGet
             * iframePost
             * iframeQueuedPost
             *
             */
            var transportType = (!isMultipart) ?
                getConfig(context, "transportType", "xhrQueuedPost") :
                getConfig(context, "transportType", "multipartQueuedPost");
            if (transportType !== "xhrQueuedPost" && transportType != "multipartQueuedPost") {
                //throw new Error("Transport type " + transportType + " does not exist");
                throw new Error(Lang_1.Lang.instance.getMessage("ERR_TRANSPORT", null, transportType));
            }
            return transportType;
        };
        /**
         * transforms the list to the expected one
         * with the proper none all form and this handling
         * (note we also could use a simple string replace but then
         * we would have had double entries under some circumstances)
         *
         * @param passThrgh
         * @param target
         * @param srcStr
         * @param form
         * @param elementId
         */
        Implementation.prototype.transformList = function (passThrgh, target, srcStr, form, elementId) {
            var _Lang = Lang_1.Lang.instance;
            //this is probably the fastest transformation method
            //it uses an array and an index to position all elements correctly
            //the offset variable is there to prevent 0 which results in a javascript
            //false
            srcStr = _Lang.trim(srcStr);
            var offset = 1, vals = (srcStr) ? srcStr.split(/\s+/) : [], idIdx = (vals.length) ? _Lang.arrToMap(vals, offset) : {}, 
            //helpers to improve speed and compression
            none = idIdx[this.IDENT_NONE], all = idIdx[this.IDENT_ALL], theThis = idIdx[this.IDENT_THIS], theForm = idIdx[this.IDENT_FORM];
            if (none) {
                //in case of none nothing is returned
                if ('undefined' != typeof passThrgh.target) {
                    delete passThrgh.target;
                }
                return passThrgh;
            }
            if (all) {
                //in case of all only one value is returned
                passThrgh[target] = this.IDENT_ALL;
                return passThrgh;
            }
            if (theForm) {
                //the form is replaced with the proper id but the other
                //values are not touched
                vals[theForm - offset] = form.id;
            }
            if (theThis && !idIdx[elementId]) {
                //in case of this, the element id is set
                vals[theThis - offset] = elementId;
            }
            //the final list must be blank separated
            passThrgh[target] = vals.join(" ");
            return passThrgh;
        };
        return Implementation;
    }());
    Implementation._instance = null;
    Impl.Implementation = Implementation;
})(Impl = exports.Impl || (exports.Impl = {}));
