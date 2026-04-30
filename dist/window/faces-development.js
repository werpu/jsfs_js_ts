/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/mona-dish/src/main/typescript/AssocArray.ts"
/*!******************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/AssocArray.ts ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   append: () => (/* binding */ append),
/* harmony export */   appendIf: () => (/* binding */ appendIf),
/* harmony export */   assign: () => (/* binding */ assign),
/* harmony export */   assignIf: () => (/* binding */ assignIf),
/* harmony export */   buildPath: () => (/* binding */ buildPath),
/* harmony export */   deepCopy: () => (/* binding */ deepCopy),
/* harmony export */   deepEqual: () => (/* binding */ deepEqual),
/* harmony export */   resolve: () => (/* binding */ resolve),
/* harmony export */   shallowMerge: () => (/* binding */ shallowMerge),
/* harmony export */   simpleShallowMerge: () => (/* binding */ simpleShallowMerge)
/* harmony export */ });
/* harmony import */ var _Es2019Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Es2019Array */ "./node_modules/mona-dish/src/main/typescript/Es2019Array.ts");
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

/**
 * A nop as assign functionality (aka ignore assign)
 */
class IgnoreAssign {
    constructor(parent) {
        this.parent = parent;
    }
    set value(value) {
    }
    get value() {
        return this.parent;
    }
}
;
/**
 * uses the known pattern from config
 * assign(target, key1, key2, key3).value = value;
 * @param target
 * @param keys
 */
function assign(target, ...accessPath) {
    if (accessPath.length < 1) {
        return new IgnoreAssign(target);
    }
    const lastPathItem = buildPath(target, ...accessPath);
    let assigner = new (class {
        set value(value) {
            lastPathItem.target[lastPathItem.key] = value;
        }
        get value() {
            return lastPathItem.target[lastPathItem.key];
        }
    })();
    return assigner;
}
function append(target, ...accessPath) {
    if (accessPath.length < 1) {
        return new IgnoreAssign(target);
    }
    const lastPathItem = buildPath(target, ...accessPath);
    let appender = new (class {
        set value(value) {
            if (!Array.isArray(value)) {
                value = [value];
            }
            if (!lastPathItem.target[lastPathItem.key]) {
                lastPathItem.target[lastPathItem.key] = value;
            }
            else {
                if (!Array.isArray(lastPathItem.target[lastPathItem.key])) {
                    lastPathItem.target[lastPathItem.key] = [lastPathItem.target[lastPathItem.key]];
                }
                lastPathItem.target[lastPathItem.key].push(...value);
            }
        }
    })();
    return appender;
}
/**
 * uses the known pattern from config
 * assign(target, key1, key2, key3).value = value;
 * @param target
 * @param keys
 */
function assignIf(condition, target, ...accessPath) {
    if ((!condition) || accessPath.length < 1) {
        return new IgnoreAssign(target);
    }
    return assign(target, ...accessPath);
}
/**
 * uses the known pattern from config
 * assign(target, key1, key2, key3).value = value;
 * @param target
 * @param keys
 */
function appendIf(condition, target, ...accessPath) {
    if ((!condition) || accessPath.length < 1) {
        return new IgnoreAssign(target);
    }
    return append(target, ...accessPath);
}
function resolve(target, ...accessPath) {
    let ret = null;
    accessPath = flattenAccessPath(accessPath);
    let currPtr = target;
    for (let cnt = 0; cnt < accessPath.length; cnt++) {
        let accessKeyIndex = accessPath[cnt];
        accessKeyIndex = arrayIndex(accessKeyIndex) != -1 ? arrayIndex(accessKeyIndex) : accessKeyIndex;
        currPtr = currPtr === null || currPtr === void 0 ? void 0 : currPtr[accessKeyIndex];
        if ('undefined' == typeof currPtr) {
            return null;
        }
        ret = currPtr;
    }
    return currPtr;
}
function keyVal(key) {
    let start = key.indexOf("[");
    if (start >= 0) {
        return key.substring(0, start);
    }
    else {
        return key;
    }
}
function arrayIndex(key) {
    let start = key.indexOf("[");
    let end = key.indexOf("]");
    if (start >= 0 && end > 0 && start < end) {
        return parseInt(key.substring(start + 1, end));
    }
    else {
        return -1;
    }
}
function isArrayPos(currKey, arrPos) {
    return currKey === "" && arrPos >= 0;
}
function isNoArray(arrPos) {
    return arrPos == -1;
}
function alloc(arr, length, defaultVal = {}) {
    let toAdd = [];
    toAdd.length = length;
    toAdd[length - 1] = defaultVal;
    arr.push(...toAdd);
}
function flattenAccessPath(accessPath) {
    return new _Es2019Array__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...accessPath).flatMap((path) => path.split("["))
        .map((path) => path.indexOf("]") != -1 ? "[" + path : path)
        .filter((path) => path != "");
}
/**
 * builds up a path, only done if no data is present!
 * @param target
 * @param accessPath
 * @returns the last assignable entry
 */
function buildPath(target, ...accessPath) {
    accessPath = flattenAccessPath(accessPath);
    //we now have a pattern of having the array accessors always in separate items
    let parentPtr = target;
    let parKeyArrPos = null;
    let currKey = null;
    let arrPos = -1;
    for (let cnt = 0; cnt < accessPath.length; cnt++) {
        currKey = keyVal(accessPath[cnt]);
        arrPos = arrayIndex(accessPath[cnt]);
        //it now is either key or arrPos
        if (arrPos != -1) {
            //case root(array)[5] -> root must be array and allocate 5 elements
            //case root.item[5] root.item must be array and of 5 elements
            if (!Array.isArray(parentPtr)) {
                throw Error("Associative array referenced as index array in path reference");
            }
            //we need to look ahead for proper allocation
            //not end reached
            let nextArrPos = -1;
            if (cnt < accessPath.length - 1) {
                nextArrPos = arrayIndex(accessPath[cnt + 1]);
            }
            let dataPresent = 'undefined' != typeof (parentPtr === null || parentPtr === void 0 ? void 0 : parentPtr[arrPos]);
            //no data present check here is needed, because alloc only reserves if not present
            alloc(parentPtr, arrPos + 1, nextArrPos != -1 ? [] : {});
            parKeyArrPos = arrPos;
            //we now go to the reserved element
            if (cnt == accessPath.length - 1) {
                parentPtr[arrPos] = (dataPresent) ? parentPtr[arrPos] : null;
            }
            else {
                parentPtr = parentPtr[arrPos];
            }
        }
        else {
            if (Array.isArray(parentPtr)) {
                throw Error("Index array referenced as associative array in path reference");
            }
            //again look ahead whether the next value is an array or assoc array
            let nextArrPos = -1;
            if (cnt < accessPath.length - 1) {
                nextArrPos = arrayIndex(accessPath[cnt + 1]);
            }
            parKeyArrPos = currKey;
            let dataPresent = 'undefined' != typeof (parentPtr === null || parentPtr === void 0 ? void 0 : parentPtr[currKey]);
            if (cnt == accessPath.length - 1) {
                if (!dataPresent) {
                    parentPtr[currKey] = null;
                }
            }
            else {
                if (!dataPresent) {
                    parentPtr[currKey] = nextArrPos == -1 ? {} : [];
                }
                parentPtr = parentPtr[currKey];
            }
        }
    }
    return { target: parentPtr, key: parKeyArrPos };
}
function deepCopy(fromAssoc) {
    return JSON.parse(JSON.stringify(fromAssoc));
}
/**
 * simple left to right merge
 *
 * @param assocArrays
 */
function simpleShallowMerge(...assocArrays) {
    return shallowMerge(true, false, ...assocArrays);
}
function _appendWithOverwrite(withAppend, target, key, arr, toAssign) {
    if (!withAppend) {
        target[key] = arr[key];
    }
    else {
        //overwrite means in this case, no double entries!
        //we do not a deep compare for now a single value compare suffices
        if ('undefined' == typeof (target === null || target === void 0 ? void 0 : target[key])) {
            target[key] = toAssign;
        }
        else if (!Array.isArray(target[key])) {
            let oldVal = target[key];
            let newVals = [];
            //TODO maybe deep deep compare here, but on the other hand it is
            //shallow
            toAssign.forEach((item) => {
                if (oldVal != item) {
                    newVals.push(item);
                }
            });
            target[key] = new _Es2019Array__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...[]);
            target[key].push(oldVal);
            target[key].push(...newVals);
        }
        else {
            let oldVal = target[key];
            let newVals = [];
            //TODO deep compare here
            toAssign.forEach((item) => {
                if (oldVal.indexOf(item) == -1) {
                    newVals.push(item);
                }
            });
            target[key].push(...newVals);
        }
    }
}
function _appendWithoutOverwrite(withAppend, target, key, arr, toAssign) {
    if (!withAppend) {
        return;
    }
    else {
        //overwrite means in this case, no double entries!
        //we do not a deep compare for now a single value compare suffices
        if ('undefined' == typeof (target === null || target === void 0 ? void 0 : target[key])) {
            target[key] = toAssign;
        }
        else if (!Array.isArray(target[key])) {
            let oldVal = target[key];
            target[key] = new _Es2019Array__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...[]);
            target[key].push(oldVal);
            target[key].push(...toAssign);
        }
        else {
            target[key].push(...toAssign);
        }
    }
}
/**
 * Shallow merge as in config, but on raw associative arrays
 *
 * @param overwrite overwrite existing keys, if they exist with their subtrees
 * @param withAppend if a key exist append the values or drop them
 * Combination overwrite withappend filters doubles out of merged arrays
 * @param assocArrays array of assoc arres reduced right to left
 */
function shallowMerge(overwrite = true, withAppend = false, ...assocArrays) {
    let target = {};
    new _Es2019Array__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...assocArrays).map((arr) => {
        return { arr, keys: Object.keys(arr) };
    }).forEach(({ arr, keys }) => {
        keys.forEach((key) => {
            let toAssign = arr[key];
            if (!Array.isArray(toAssign) && withAppend) {
                toAssign = new _Es2019Array__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...[toAssign]);
            }
            if (overwrite || !(target === null || target === void 0 ? void 0 : target[key])) {
                _appendWithOverwrite(withAppend, target, key, arr, toAssign);
            }
            else if (!overwrite && (target === null || target === void 0 ? void 0 : target[key])) {
                _appendWithoutOverwrite(withAppend, target, key, arr, toAssign);
            }
        });
    });
    return target;
}
//TODO test this, slightly altered from https://medium.com/@pancemarko/deep-equality-in-javascript-determining-if-two-objects-are-equal-bf98cf47e934
//he overlooked some optimizations and a shortcut at typeof!
function deepEqual(obj1, obj2) {
    if (obj1 == obj2) {
        return false;
    }
    if (typeof obj1 != typeof obj2) {
        return false;
    }
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length != obj2.length) {
            return;
        }
        //arrays must be equal, order as well, there is no way around it
        //this is the major limitation we have
        return obj1.every((item, cnt) => deepEqual(item, obj2[cnt]));
    }
    //string number and other primitives are filtered out here
    if ("object" == typeof obj1 && "object" == typeof obj2) {
        let keys1 = Object.keys(obj1);
        let keys2 = Object.keys(obj2);
        if (keys1.length != keys2.length) {
            return false;
        }
        return keys1.every(key => keys2.indexOf(key) != -1) &&
            keys1.every(key => deepEqual(obj1[key], obj2[key]));
    }
    return false;
    //done here no match found
}


/***/ },

/***/ "./node_modules/mona-dish/src/main/typescript/Config.ts"
/*!**************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/Config.ts ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONFIG_ANY: () => (/* binding */ CONFIG_ANY),
/* harmony export */   CONFIG_VALUE: () => (/* binding */ CONFIG_VALUE),
/* harmony export */   Config: () => (/* binding */ Config)
/* harmony export */ });
/* harmony import */ var _Es2019Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Es2019Array */ "./node_modules/mona-dish/src/main/typescript/Es2019Array.ts");
/* harmony import */ var _Monad__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Monad */ "./node_modules/mona-dish/src/main/typescript/Monad.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Lang */ "./node_modules/mona-dish/src/main/typescript/Lang.ts");
/* harmony import */ var _AssocArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AssocArray */ "./node_modules/mona-dish/src/main/typescript/AssocArray.ts");



const objAssign = _Lang__WEBPACK_IMPORTED_MODULE_2__.Lang.objAssign;

/**
 * specialized value embedder
 * for our Configuration
 */
class ConfigEntry extends _Monad__WEBPACK_IMPORTED_MODULE_1__.ValueEmbedder {
    constructor(rootElem, key, arrPos) {
        super(rootElem, key);
        this.arrPos = arrPos !== null && arrPos !== void 0 ? arrPos : -1;
    }
    get value() {
        if (this.key == "" && this.arrPos >= 0) {
            return this._value[this.arrPos];
        }
        else if (this.key && this.arrPos >= 0) {
            return this._value[this.key][this.arrPos];
        }
        return this._value[this.key];
    }
    set value(val) {
        if (this.key == "" && this.arrPos >= 0) {
            this._value[this.arrPos] = val;
            return;
        }
        else if (this.key && this.arrPos >= 0) {
            this._value[this.key][this.arrPos] = val;
            return;
        }
        this._value[this.key] = val;
    }
}
/*default value for absent*/
ConfigEntry.absent = ConfigEntry.fromNullable(null);
const CONFIG_VALUE = "__END_POINT__";
const CONFIG_ANY = "__ANY_POINT__";
/**
 * Config, basically an optional wrapper for a json structure
 * (not Side - effect free, since we can alter the internal config state
 * without generating a new config), not sure if we should make it side - effect free
 * since this would swallow a lot of performance and ram
 */
class Config extends _Monad__WEBPACK_IMPORTED_MODULE_1__.Optional {
    constructor(root, configDef) {
        super(root);
        this.configDef = configDef;
    }
    /**
     * shallow copy getter, copies only the first level, references the deeper nodes
     * in a shared manner
     */
    get shallowCopy() {
        return this.shallowCopy$();
    }
    shallowCopy$() {
        let ret = new Config({});
        ret.shallowMerge(this.value);
        return ret;
    }
    /**
     * deep copy, copies all config nodes
     */
    get deepCopy() {
        return this.deepCopy$();
    }
    deepCopy$() {
        return new Config(objAssign({}, this.value));
    }
    /**
     * creates a config from an initial value or null
     * @param value
     */
    static fromNullable(value) {
        return new Config(value);
    }
    /**
     * simple merge for the root configs
     */
    shallowMerge(other, overwrite = true, withAppend = false) {
        //shallow merge must be mutable so we have to remap
        let newThis = (0,_AssocArray__WEBPACK_IMPORTED_MODULE_3__.shallowMerge)(overwrite, withAppend, this.value, other.value);
        if (Array.isArray(this._value)) {
            this._value.length = 0;
            this._value.push(...newThis);
        }
        else {
            Object.getOwnPropertyNames(this._value).forEach(key => delete this._value[key]);
            Object.getOwnPropertyNames(newThis).forEach(key => this._value[key] = newThis[key]);
        }
    }
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
    append(...accessPath) {
        return (0,_AssocArray__WEBPACK_IMPORTED_MODULE_3__.append)(this._value, ...accessPath);
    }
    /**
     * appends to an existing entry (or extends into an array and appends)
     * if the condition is met
     * @param {boolean} condition
     * @param {string[]} accessPath
     */
    appendIf(condition, ...accessPath) {
        return (0,_AssocArray__WEBPACK_IMPORTED_MODULE_3__.appendIf)(condition, this._value, ...accessPath);
    }
    /**
     * assigns a new value on the given access path
     * @param accessPath
     */
    assign(...accessPath) {
        return (0,_AssocArray__WEBPACK_IMPORTED_MODULE_3__.assign)(this.value, ...accessPath);
    }
    /**
     * assign a value if the condition is set to true, otherwise skip it
     *
     * @param condition the condition, the access accessPath into the config
     * @param accessPath
     */
    assignIf(condition, ...accessPath) {
        return (0,_AssocArray__WEBPACK_IMPORTED_MODULE_3__.assignIf)(condition, this._value, ...accessPath);
    }
    /**
     * get if the access path is present (get is reserved as getter with a default, on the current path)
     * TODO will be renamed to something more meaningful and deprecated, the name is ambiguous
     * @param accessPath the access path
     */
    getIf(...accessPath) {
        this.assertAccessPath(...accessPath);
        return this.getClass().fromNullable((0,_AssocArray__WEBPACK_IMPORTED_MODULE_3__.resolve)(this.value, ...accessPath));
    }
    /**
     * gets the current node and if none is present returns a config with a default value
     * @param defaultVal
     */
    get(defaultVal) {
        return this.getClass().fromNullable(super.get(defaultVal).value);
    }
    //empties the current config entry
    delete(key) {
        if (key in this.value) {
            delete this.value[key];
        }
        return this;
    }
    /**
     * converts the entire config into a json object
     */
    toJson() {
        return JSON.stringify(this.value);
    }
    getClass() {
        return Config;
    }
    setVal(val) {
        this._value = val;
    }
    /**
     * asserts the access path for a semi typed access
     * @param accessPath
     * @private
     */
    assertAccessPath(...accessPath) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        accessPath = this.preprocessKeys(...accessPath);
        if (!this.configDef) {
            //untyped
            return;
        }
        const ERR_ACCESS_PATH = "Access Path to config invalid";
        let currAccessPos = _Monad__WEBPACK_IMPORTED_MODULE_1__.Optional.fromNullable(Object.keys(this.configDef).map(key => {
            let ret = {};
            ret[key] = this.configDef[key];
            return ret;
        }));
        for (let cnt = 0; cnt < accessPath.length; cnt++) {
            let currKey = this.keyVal(accessPath[cnt]);
            let arrPos = this.arrayIndex(accessPath[cnt]);
            //key index
            if (this.isArray(arrPos)) {
                if (currKey != "") {
                    currAccessPos = Array.isArray(currAccessPos.value) ?
                        _Monad__WEBPACK_IMPORTED_MODULE_1__.Optional.fromNullable((_b = (_a = new _Es2019Array__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...currAccessPos.value)
                            .find(item => {
                            var _a;
                            return !!((_a = item === null || item === void 0 ? void 0 : item[currKey]) !== null && _a !== void 0 ? _a : false);
                        })) === null || _a === void 0 ? void 0 : _a[currKey]) === null || _b === void 0 ? void 0 : _b[arrPos]) :
                        _Monad__WEBPACK_IMPORTED_MODULE_1__.Optional.fromNullable((_e = (_d = (_c = currAccessPos.value) === null || _c === void 0 ? void 0 : _c[currKey]) === null || _d === void 0 ? void 0 : _d[arrPos]) !== null && _e !== void 0 ? _e : null);
                }
                else {
                    currAccessPos = (Array.isArray(currAccessPos.value)) ?
                        _Monad__WEBPACK_IMPORTED_MODULE_1__.Optional.fromNullable((_f = currAccessPos.value) === null || _f === void 0 ? void 0 : _f[arrPos]) : _Monad__WEBPACK_IMPORTED_MODULE_1__.Optional.absent;
                }
                //we noe store either the current array or the filtered look ahead to go further
            }
            else {
                //we now have an array and go further with a singular key
                currAccessPos = (Array.isArray(currAccessPos.value)) ? _Monad__WEBPACK_IMPORTED_MODULE_1__.Optional.fromNullable((_g = new _Es2019Array__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...currAccessPos.value)
                    .find(item => {
                    var _a;
                    return !!((_a = item === null || item === void 0 ? void 0 : item[currKey]) !== null && _a !== void 0 ? _a : false);
                })) === null || _g === void 0 ? void 0 : _g[currKey]) :
                    _Monad__WEBPACK_IMPORTED_MODULE_1__.Optional.fromNullable((_j = (_h = currAccessPos.value) === null || _h === void 0 ? void 0 : _h[currKey]) !== null && _j !== void 0 ? _j : null);
            }
            if (!currAccessPos.isPresent()) {
                throw Error(ERR_ACCESS_PATH);
            }
            if (currAccessPos.value == CONFIG_ANY) {
                return;
            }
        }
    }
    isNoArray(arrPos) {
        return arrPos == -1;
    }
    isArray(arrPos) {
        return !this.isNoArray(arrPos);
    }
}


/***/ },

/***/ "./node_modules/mona-dish/src/main/typescript/DomQuery.ts"
/*!****************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/DomQuery.ts ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DQ: () => (/* binding */ DQ),
/* harmony export */   DQ$: () => (/* binding */ DQ$),
/* harmony export */   DomQuery: () => (/* binding */ DomQuery),
/* harmony export */   DomQueryCollector: () => (/* binding */ DomQueryCollector),
/* harmony export */   ElementAttribute: () => (/* binding */ ElementAttribute),
/* harmony export */   Style: () => (/* binding */ Style)
/* harmony export */ });
/* harmony import */ var _Monad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Monad */ "./node_modules/mona-dish/src/main/typescript/Monad.ts");
/* harmony import */ var _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SourcesCollectors */ "./node_modules/mona-dish/src/main/typescript/SourcesCollectors.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Lang */ "./node_modules/mona-dish/src/main/typescript/Lang.ts");
/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Global */ "./node_modules/mona-dish/src/main/typescript/Global.ts");
/* harmony import */ var _Es2019Array__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Es2019Array */ "./node_modules/mona-dish/src/main/typescript/Es2019Array.ts");
/* harmony import */ var _AssocArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AssocArray */ "./node_modules/mona-dish/src/main/typescript/AssocArray.ts");
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
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const trim = _Lang__WEBPACK_IMPORTED_MODULE_2__.Lang.trim;
const isString = _Lang__WEBPACK_IMPORTED_MODULE_2__.Lang.isString;
const eqi = _Lang__WEBPACK_IMPORTED_MODULE_2__.Lang.equalsIgnoreCase;
const objToArray = _Lang__WEBPACK_IMPORTED_MODULE_2__.Lang.objToArray;

class NonceValueEmbedder extends _Monad__WEBPACK_IMPORTED_MODULE_0__.ValueEmbedder {
    constructor(rootElems) {
        super(rootElems === null || rootElems === void 0 ? void 0 : rootElems[0], "nonce");
        this.rootElems = rootElems;
    }
    isAbsent() {
        const value = this.value;
        return 'undefined' == typeof value || '' == value;
    }
    get value() {
        var _a, _b, _c, _d, _e;
        return (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.rootElems) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.nonce) !== null && _c !== void 0 ? _c : (_e = (_d = this === null || this === void 0 ? void 0 : this.rootElems) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.getAttribute("nonce");
    }
    set value(newVal) {
        var _a;
        if (!((_a = this === null || this === void 0 ? void 0 : this.rootElems) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        this.rootElems.forEach((rootElem) => {
            if ("undefined" != typeof (rootElem === null || rootElem === void 0 ? void 0 : rootElem.nonce)) {
                rootElem.nonce = newVal;
            }
            else {
                rootElem.setAttribute("nonce", newVal);
            }
        });
    }
}
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
function waitUntilDom(root, condition, options = {
    attributes: true,
    childList: true,
    subtree: true,
    timeout: 500,
    interval: 100
}) {
    return new Promise((success, error) => {
        let observer = null;
        const MUT_ERROR = new Error("Mutation observer timeout");
        // we do the same but for now ignore the options on the dom query
        // we cannot use absent here, because the condition might search for an absent element
        function findElement(root, condition) {
            let found = null;
            if (!!condition(root)) {
                return root;
            }
            if (options.childList) {
                found = (condition(root)) ? root : root.childNodes.filter(item => condition(item)).first().value.value;
            }
            else if (options.subtree) {
                found = (condition(root)) ? root : root.querySelectorAll(" * ").filter(item => condition(item)).first().value.value;
            }
            else {
                found = (condition(root)) ? root : null;
            }
            return found;
        }
        let foundElement = root;
        if (!!(foundElement = findElement(foundElement, condition))) {
            success(new DomQuery(foundElement));
            return;
        }
        if ('undefined' != typeof MutationObserver) {
            const mutTimeout = setTimeout(() => {
                observer.disconnect();
                return error(MUT_ERROR);
            }, options.timeout);
            const callback = (mutationList) => {
                const found = new DomQuery(mutationList.map((mut) => mut.target)).filter(item => condition(item)).first();
                if (found.isPresent()) {
                    clearTimeout(mutTimeout);
                    observer.disconnect();
                    success(new DomQuery(found || root));
                }
            };
            observer = new MutationObserver(callback);
            // browsers might ignore it, but we cannot break the api in the case
            // hence no timeout is passed
            let observableOpts = Object.assign({}, options);
            delete observableOpts.timeout;
            root.eachElem(item => {
                observer.observe(item, observableOpts);
            });
        }
        else { // fallback for legacy browsers without mutation observer
            let interval = setInterval(() => {
                let found = findElement(root, condition);
                if (!!found) {
                    if (timeout) {
                        clearTimeout(timeout);
                        clearInterval(interval);
                        interval = null;
                    }
                    success(new DomQuery(found || root));
                }
            }, options.interval);
            let timeout = setTimeout(() => {
                if (interval) {
                    clearInterval(interval);
                    error(MUT_ERROR);
                }
            }, options.timeout);
        }
    });
}
class ElementAttribute extends _Monad__WEBPACK_IMPORTED_MODULE_0__.ValueEmbedder {
    constructor(element, name, defaultVal = null) {
        super(element, name);
        this.element = element;
        this.name = name;
        this.defaultVal = defaultVal;
    }
    get value() {
        let val = this.element.get(0).orElse(...[]).values;
        if (!val.length) {
            return this.defaultVal;
        }
        return val[0].getAttribute(this.name);
    }
    set value(value) {
        let val = this.element.get(0).orElse(...[]).values;
        for (let cnt = 0; cnt < val.length; cnt++) {
            val[cnt].setAttribute(this.name, value);
        }
        val[0].setAttribute(this.name, value);
    }
    getClass() {
        return ElementAttribute;
    }
    static fromNullable(value, valueKey = "value") {
        return new ElementAttribute(value, valueKey);
    }
}
class Style extends _Monad__WEBPACK_IMPORTED_MODULE_0__.ValueEmbedder {
    constructor(element, name, defaultVal = null) {
        super(element, name);
        this.element = element;
        this.name = name;
        this.defaultVal = defaultVal;
    }
    get value() {
        let val = this.element.values;
        if (!val.length) {
            return this.defaultVal;
        }
        return val[0].style[this.name];
    }
    set value(value) {
        let val = this.element.values;
        for (let cnt = 0; cnt < val.length; cnt++) {
            val[cnt].style[this.name] = value;
        }
    }
    getClass() {
        return ElementAttribute;
    }
    static fromNullable(value, valueKey = "value") {
        return new ElementAttribute(value, valueKey);
    }
}
/**
 * small helper for the specialized jsf case
 * @constructor
 */
const DEFAULT_WHITELIST = () => {
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
class DomQuery {
    constructor(...rootNode) {
        this.rootNode = [];
        this.pos = -1;
        // because we can stream from an array stream directly into the dom query
        this._limits = -1;
        if (_Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(rootNode).isAbsent() || !rootNode.length) {
            return;
        }
        else {
            // we need to flatten out the arrays
            for (let cnt = 0; cnt < rootNode.length; cnt++) {
                if (!rootNode[cnt]) {
                    // we skip possible null entries which can happen in
                    // certain corner conditions due to the constructor re-wrapping single elements into arrays.
                }
                else if (isString(rootNode[cnt])) {
                    let foundElement = DomQuery.querySelectorAll(rootNode[cnt]);
                    if (!foundElement.isAbsent()) {
                        rootNode.push(...foundElement.values);
                    }
                }
                else if (rootNode[cnt] instanceof DomQuery) {
                    this.rootNode.push(...rootNode[cnt].values);
                }
                else {
                    this.rootNode.push(rootNode[cnt]);
                }
            }
        }
    }
    /**
     * returns the first element
     */
    get value() {
        return this.getAsElem(0);
    }
    get values() {
        return this.allElems();
    }
    get global() {
        return _Global__WEBPACK_IMPORTED_MODULE_3__._global$;
    }
    get stream() {
        throw Error("Not implemented, include Stream.ts for this to work");
    }
    get lazyStream() {
        throw Error("Not implemented, include Stream.ts for this to work");
    }
    /**
     * returns the id of the first element
     */
    get id() {
        return new ElementAttribute(this.get(0), "id");
    }
    /**
     * length of the entire query set
     */
    get length() {
        return this.rootNode.length;
    }
    /**
     * convenience method for tagName
     */
    get tagName() {
        return this.getAsElem(0).getIf("tagName");
    }
    /**
     * convenience method for nodeName
     */
    get nodeName() {
        return this.getAsElem(0).getIf("nodeName");
    }
    isTag(tagName) {
        return !this.isAbsent()
            && (this.nodeName.orElse("__none___")
                .value.toLowerCase() == tagName.toLowerCase()
                || this.tagName.orElse("__none___")
                    .value.toLowerCase() == tagName.toLowerCase());
    }
    /**
     * convenience property for type
     *
     * returns null in case of no type existing otherwise
     * the type of the first element
     */
    get type() {
        return this.getAsElem(0).getIf("type");
    }
    /**
     * convenience property for name
     *
     * returns null in case of no type existing otherwise
     * the name of the first element
     */
    get name() {
        return new _Monad__WEBPACK_IMPORTED_MODULE_0__.ValueEmbedder(this.getAsElem(0).value, "name");
    }
    /**
     * convenience property for value
     *
     * returns null in case of no type existing otherwise
     * the value of the first element
     */
    get inputValue() {
        if (this.getAsElem(0).getIf("value").isPresent()) {
            return new _Monad__WEBPACK_IMPORTED_MODULE_0__.ValueEmbedder(this.getAsElem(0).value);
        }
        else {
            return _Monad__WEBPACK_IMPORTED_MODULE_0__.ValueEmbedder.absent;
        }
    }
    get val() {
        return this.inputValue.value;
    }
    set val(value) {
        this.inputValue.value = value;
    }
    get nodeId() {
        return this.id.value;
    }
    set nodeId(value) {
        this.id.value = value;
    }
    get checked() {
        return new _Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019Array(...this.values).every(el => !!el.checked);
    }
    set checked(newChecked) {
        this.eachElem(el => el.checked = newChecked);
    }
    get elements() {
        // a simple querySelectorAll should suffice
        return this.querySelectorAll("input, checkbox, select, textarea, fieldset");
    }
    get deepElements() {
        let elemStr = "input, select, textarea, checkbox, fieldset";
        return this.querySelectorAllDeep(elemStr);
    }
    /**
     * a deep search which treats the single isolated shadow dom areas
     * separately and runs the query on each shadow dom
     * @param queryStr
     */
    querySelectorAllDeep(queryStr) {
        let found = [];
        let queryRes = this.querySelectorAll(queryStr);
        if (queryRes.length) {
            found.push(queryRes);
        }
        let shadowRoots = this.querySelectorAll("*").shadowRoot;
        if (shadowRoots.length) {
            let shadowRes = shadowRoots.querySelectorAllDeep(queryStr);
            if (shadowRes.length) {
                found.push(shadowRes);
            }
        }
        return new DomQuery(...found);
    }
    /**
     * disabled flag
     */
    get disabled() {
        return this.attr("disabled").isPresent();
    }
    set disabled(disabled) {
        // this.attr("disabled").value = disabled + "";
        if (!disabled) {
            this.removeAttribute("disabled");
        }
        else {
            this.attr("disabled").value = "disabled";
        }
    }
    removeAttribute(name) {
        this.eachElem(item => item.removeAttribute(name));
    }
    get childNodes() {
        let childNodeArr = [];
        this.eachElem((item) => {
            childNodeArr = childNodeArr.concat(objToArray(item.childNodes));
        });
        return new DomQuery(...childNodeArr);
    }
    get asArray() {
        // filter not supported by IE11
        let items = new _Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019Array(...this.rootNode).filter(item => {
            return item != null;
        }).map(item => {
            return DomQuery.byId(item);
        });
        return items;
    }
    get offsetWidth() {
        return new _Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019Array(...this.rootNode)
            .filter(item => item != null)
            .map(elem => elem.offsetWidth)
            .reduce((accumulate, incoming) => accumulate + incoming, 0);
    }
    get offsetHeight() {
        return new _Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019Array(...this.rootNode)
            .filter(item => item != null)
            .map(elem => elem.offsetHeight)
            .reduce((accumulate, incoming) => accumulate + incoming, 0);
    }
    get offsetLeft() {
        return new _Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019Array(...this.rootNode)
            .filter(item => item != null)
            .map(elem => elem.offsetLeft)
            .reduce((accumulate, incoming) => accumulate + incoming, 0);
    }
    get offsetTop() {
        return new _Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019Array(this.rootNode)
            .filter(item => item != null)
            .map(elem => elem.offsetTop)
            .reduce((accumulate, incoming) => accumulate + incoming, 0);
    }
    get asNodeArray() {
        return new _Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019Array(...this.rootNode.filter(item => item != null));
    }
    get nonce() {
        return new NonceValueEmbedder(this.rootNode);
    }
    static querySelectorAllDeep(selector) {
        return new DomQuery(document).querySelectorAllDeep(selector);
    }
    /**
     * easy query selector all producer
     *
     * @param selector the selector
     * @returns a results dom query object
     */
    static querySelectorAll(selector) {
        if (selector.indexOf("/shadow/") != -1) {
            return new DomQuery(document)._querySelectorAllDeep(selector);
        }
        else {
            return new DomQuery(document)._querySelectorAll(selector);
        }
    }
    /**
     * byId producer
     *
     * @param selector id
     * @param deep true if you want to go into shadow areas
     * @return a DomQuery containing the found elements
     */
    static byId(selector, deep = false) {
        if (isString(selector)) {
            return (!deep) ? new DomQuery(document).byId(selector) : new DomQuery(document).byIdDeep(selector);
        }
        else {
            return new DomQuery(selector);
        }
    }
    /**
     * byTagName producer
     *
     * @param selector name
     * @return a DomQuery containing the found elements
     */
    static byTagName(selector) {
        if (isString(selector)) {
            return new DomQuery(document).byTagName(selector);
        }
        else {
            return new DomQuery(selector);
        }
    }
    static globalEval(code, nonce) {
        return new DomQuery(document).globalEval(code, nonce);
    }
    static globalEvalSticky(code, nonce) {
        return new DomQuery(document).globalEvalSticky(code, nonce);
    }
    /**
     * builds the ie nodes properly in a placeholder
     * and bypasses a non script insert bug that way
     * @param markup the markup code to be executed from
     */
    static fromMarkup(markup) {
        // https:// developer.mozilla.org/de/docs/Web/API/DOMParser license creative commons
        const doc = document.implementation.createHTMLDocument("");
        markup = trim(markup);
        let lowerMarkup = markup.toLowerCase();
        if (lowerMarkup.search(/<!doctype[^\w\-]+/gi) != -1 ||
            lowerMarkup.search(/<html[^\w\-]+/gi) != -1 ||
            lowerMarkup.search(/<head[^\w\-]+/gi) != -1 ||
            lowerMarkup.search(/<body[^\w\-]+/gi) != -1) {
            doc.documentElement.innerHTML = markup;
            return new DomQuery(doc.documentElement);
        }
        else {
            let startsWithTag = function (str, tagName) {
                let tag1 = ["<", tagName, ">"].join("");
                let tag2 = ["<", tagName, " "].join("");
                return (str.indexOf(tag1) == 0) || (str.indexOf(tag2) == 0);
            };
            let dummyPlaceHolder = new DomQuery(document.createElement("div"));
            // table needs special treatment due to the browsers auto creation
            if (startsWithTag(lowerMarkup, "thead") || startsWithTag(lowerMarkup, "tbody")) {
                dummyPlaceHolder.html(`<table>${markup}</table>`);
                return dummyPlaceHolder.querySelectorAll("table").get(0).childNodes.detach();
            }
            else if (startsWithTag(lowerMarkup, "tfoot")) {
                dummyPlaceHolder.html(`<table><thead></thead><tbody><tbody${markup}</table>`);
                return dummyPlaceHolder.querySelectorAll("table").get(2).childNodes.detach();
            }
            else if (startsWithTag(lowerMarkup, "tr")) {
                dummyPlaceHolder.html(`<table><tbody>${markup}</tbody></table>`);
                return dummyPlaceHolder.querySelectorAll("tbody").get(0).childNodes.detach();
            }
            else if (startsWithTag(lowerMarkup, "td")) {
                dummyPlaceHolder.html(`<table><tbody><tr>${markup}</tr></tbody></table>`);
                return dummyPlaceHolder.querySelectorAll("tr").get(0).childNodes.detach();
            }
            dummyPlaceHolder.html(markup);
            return dummyPlaceHolder.childNodes.detach();
        }
    }
    /**
     * returns the nth element as DomQuery
     * from the internal elements
     * note if you try to reach a non-existing element position
     * you will get back an absent entry
     *
     * @param index the nth index
     */
    get(index) {
        return (index < this.rootNode.length) ? new DomQuery(this.rootNode[index]) : DomQuery.absent;
    }
    /**
     * returns the nth element as optional of an Element object
     * @param index the number from the index
     * @param defaults the default value if the index is overrun default Optional\.absent
     */
    getAsElem(index, defaults = _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.absent) {
        return (index < this.rootNode.length) ? _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(this.rootNode[index]) : defaults;
    }
    /**
     * returns the files from a given element
     * @param index
     */
    filesFromElem(index) {
        var _a;
        return (index < this.rootNode.length) ? ((_a = this.rootNode[index]) === null || _a === void 0 ? void 0 : _a.files) ? this.rootNode[index].files : [] : [];
    }
    /**
     * returns the value array< of all elements
     */
    allElems() {
        return this.rootNode;
    }
    /**
     * absent no values reached?
     */
    isAbsent() {
        return this.length == 0;
    }
    /**
     * should make the code clearer
     * note if you pass a function
     * this refers to the active DomQuery object
     */
    isPresent(presentRunnable) {
        let absent = this.isAbsent();
        if (!absent && presentRunnable) {
            presentRunnable.call(this, this);
        }
        return !absent;
    }
    /**
     * should make the code clearer
     * note if you pass a function
     * this refers to the active DomQuery object
     *
     *
     * @param presentRunnable
     */
    ifPresentLazy(presentRunnable = function () {
    }) {
        this.isPresent.call(this, presentRunnable);
        return this;
    }
    /**
     * remove all affected nodes from this query object from the dom tree
     */
    delete() {
        this.eachElem((node) => {
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        });
    }
    querySelectorAll(selector) {
        // We could merge both methods, but for now this is more readable
        if (selector.indexOf("/shadow/") != -1) {
            return this._querySelectorAllDeep(selector);
        }
        else {
            return this._querySelectorAll(selector);
        }
    }
    closest(selector) {
        // We could merge both methods, but for now this is more readable
        if (selector.indexOf("/shadow/") != -1) {
            return this._closestDeep(selector);
        }
        else {
            return this._closest(selector);
        }
    }
    /**
     * core byId method
     * @param id the id to search for
     * @param includeRoot also match the root element?
     */
    byId(id, includeRoot) {
        let res = [];
        if (includeRoot) {
            res = res.concat(...new _Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019Array(...((this === null || this === void 0 ? void 0 : this.rootNode) || []))
                .filter((item) => id == item.id)
                .map(item => new DomQuery(item)));
        }
        // for some strange kind of reason the # selector fails
        // on hidden elements we use the attributes match selector
        // that works
        res = res.concat(this.querySelectorAll(`[id="${id}"]`));
        return new DomQuery(...res);
    }
    byIdDeep(id, includeRoot) {
        let res = [];
        if (includeRoot) {
            res = res.concat(new _Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019Array(...((this === null || this === void 0 ? void 0 : this.rootNode) || []))
                .filter(item => id == item.id)
                .map(item => new DomQuery(item)));
        }
        let subItems = this.querySelectorAllDeep(`[id="${id}"]`);
        if (subItems.length) {
            res.push(subItems);
        }
        return new DomQuery(...res);
    }
    /**
     * same as byId just for the tag name
     * @param tagName the tag-name to search for
     * @param includeRoot shall the root element be part of this search
     * @param deep do we also want to go into shadow dom areas
     */
    byTagName(tagName, includeRoot, deep) {
        var _a;
        let res = [];
        if (includeRoot) {
            res = new _Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019Array(...((_a = this === null || this === void 0 ? void 0 : this.rootNode) !== null && _a !== void 0 ? _a : []))
                .filter(element => (element === null || element === void 0 ? void 0 : element.tagName) == tagName)
                .reduce((reduction, item) => reduction.concat([item]), res);
        }
        (deep) ? res.push(this.querySelectorAllDeep(tagName)) : res.push(this.querySelectorAll(tagName));
        return new DomQuery(...res);
    }
    /**
     * attr accessor, usage myQuery.attr("class").value = "bla"
     * or let value myQuery.attr("class").value
     * @param attr the attribute to set
     * @param defaultValue the default value in case nothing is presented (defaults to null)
     */
    attr(attr, defaultValue = null) {
        return new ElementAttribute(this, attr, defaultValue);
    }
    style(cssProperty, defaultValue = null) {
        return new Style(this, cssProperty, defaultValue);
    }
    /**
     * Checks for an existing class in the class attributes
     *
     * @param clazz the class to search for
     */
    hasClass(clazz) {
        let hasIt = false;
        this.eachElem(node => {
            hasIt = node.classList.contains(clazz);
            if (hasIt) {
                return false;
            }
        });
        return hasIt;
    }
    /**
     * appends a class string if not already in the element(s)
     *
     * @param clazz the style class to append
     */
    addClass(clazz) {
        this.eachElem(item => item.classList.add(clazz));
        return this;
    }
    /**
     * remove the style class if in the class definitions
     *
     * @param clazz
     */
    removeClass(clazz) {
        this.eachElem(item => item.classList.remove(clazz));
        return this;
    }
    /**
     * checks whether we have a multipart element in our children
     * or are one
     */
    isMultipartCandidate(deep = false) {
        const FILE_INPUT = "input[type='file']";
        return this.matchesSelector(FILE_INPUT) ||
            ((!deep) ? this.querySelectorAll(FILE_INPUT) :
                this.querySelectorAllDeep(FILE_INPUT)).first().isPresent();
    }
    /**
     * innerHtml
     * equivalent to jQueries html
     * as setter the html is set and the
     * DomQuery is given back
     * as getter the html string is returned
     *
     * @param newInnerHTML the inner html to be inserted
     */
    html(newInnerHTML) {
        if (_Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(newInnerHTML).isAbsent()) {
            return this.isPresent() ? _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(this.innerHTML) : _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.absent;
        }
        this.innerHTML = newInnerHTML;
        return this;
    }
    /**
     * Standard dispatch event method, delegated from node
     */
    dispatchEvent(evt) {
        this.eachElem(elem => elem.dispatchEvent(evt));
        return this;
    }
    /**
     * abbreviation property to use innerHTML directly like on the dom tree
     * @param newInnerHTML  the new inner html which should be attached to "this" domQuery
     */
    set innerHTML(newInnerHTML) {
        this.eachElem(elem => elem.innerHTML = newInnerHTML);
    }
    /**
     * getter abbreviation to use innerHTML directly
     */
    get innerHTML() {
        let retArr = [];
        this.eachElem(elem => retArr.push(elem.innerHTML));
        return retArr.join("");
    }
    /**
     * since the dom allows both innerHTML and innerHtml we also have to implement both
     * @param newInnerHtml see above
     */
    set innerHtml(newInnerHtml) {
        this.innerHTML = newInnerHtml;
    }
    /**
     * same here, getter for allowing innerHtml directly
     */
    get innerHtml() {
        return this.innerHTML;
    }
    /**
     * filters the current dom query elements
     * upon a given selector
     *
     * @param selector
     */
    filterSelector(selector) {
        let matched = [];
        this.eachElem(item => {
            if (this._matchesSelector(item, selector)) {
                matched.push(item);
            }
        });
        return new DomQuery(...matched);
    }
    /**
     * checks whether any item in this domQuery level matches the selector
     * if there is one element only attached, as root the match is only
     * performed on this element.
     * @param selector
     */
    matchesSelector(selector) {
        return this.asArray
            .some(item => this._matchesSelector(item.getAsElem(0).value, selector));
    }
    /**
     * easy node traversal, you can pass
     * a set of node selectors which are joined as direct children
     *
     * Note!!! The root nodes are not in the getIf, those are always the child nodes
     *
     * @param nodeSelector
     */
    getIf(...nodeSelector) {
        let selectorStage = this.childNodes;
        for (let cnt = 0; cnt < nodeSelector.length; cnt++) {
            selectorStage = selectorStage.filterSelector(nodeSelector[cnt]);
            if (selectorStage.isAbsent()) {
                return selectorStage;
            }
        }
        return selectorStage;
    }
    eachElem(func) {
        for (let cnt = 0, len = this.rootNode.length; cnt < len; cnt++) {
            if (func(this.rootNode[cnt], cnt) === false) {
                break;
            }
        }
        return this;
    }
    firstElem(func = item => item) {
        if (this.rootNode.length > 1) {
            func(this.rootNode[0], 0);
        }
        return this;
    }
    lastElem(func = item => item) {
        if (this.rootNode.length > 1) {
            func(this.rootNode[this.rootNode.length - 1], 0);
        }
        return this;
    }
    each(func) {
        new _Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019Array(...this.rootNode)
            .forEach((item, cnt) => {
            // we could use a filter, but for the best performance we don´t
            if (item == null) {
                return;
            }
            return func(DomQuery.byId(item), cnt);
        });
        return this;
    }
    /**
     * replace convenience function, replaces one or more elements with
     * a set of elements passed as DomQuery
     * @param toReplace the replaced nodes as reference (original node has been replaced)
     */
    replace(toReplace) {
        this.each(item => {
            let asElem = item.getAsElem(0).value;
            let parent = asElem.parentElement;
            let nextElement = asElem.nextElementSibling;
            let previousElement = asElem.previousElementSibling;
            if (nextElement != null) {
                new DomQuery(nextElement).insertBefore(toReplace);
            }
            else if (previousElement) {
                new DomQuery(previousElement).insertAfter(toReplace);
            }
            else {
                new DomQuery(parent).append(toReplace);
            }
            item.delete();
        });
        return toReplace;
    }
    /**
     * returns a new dom query containing only the first element max
     *
     * @param func a an optional callback function to perform an operation on the first element
     */
    first(func = (item) => item) {
        if (this.rootNode.length >= 1) {
            func(this.get(0), 0);
            return this.get(0);
        }
        return this;
    }
    /**
     * returns a new dom query containing only the first element max
     *
     * @param func a an optional callback function to perform an operation on the first element
     */
    last(func = (item) => item) {
        if (this.rootNode.length >= 1) {
            let lastNode = this.get(this.rootNode.length - 1);
            func(lastNode, 0);
            return lastNode;
        }
        return this;
    }
    /**
     * filter function which filters a subset
     *
     * @param func
     */
    filter(func) {
        let reArr = [];
        this.each((item) => {
            func(item) ? reArr.push(item) : null;
        });
        return new DomQuery(...reArr);
    }
    /**
     * global eval head appendix method
     * no other methods are supported anymore
     * @param code the code to be evaluated
     * @param  nonce optional  nonce key for higher security
     */
    globalEval(code, nonce) {
        var _a, _b, _c;
        const head = (_b = (_a = document.getElementsByTagName("head")) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : (_c = document.documentElement.getElementsByTagName("head")) === null || _c === void 0 ? void 0 : _c[0];
        const script = document.createElement("script");
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
        let newScriptElement = head.appendChild(script);
        head.removeChild(newScriptElement);
        return this;
    }
    /**
     * global eval head appendix method
     * no other methods are supported anymore
     * @param code the code to be evaluated
     * @param  nonce optional  nonce key for higher security
     */
    globalEvalSticky(code, nonce) {
        let head = document.getElementsByTagName("head")[0] || document.documentElement;
        let script = document.createElement("script");
        this.applyNonce(nonce, script);
        script.type = "text/javascript";
        script.innerHTML = code;
        head.appendChild(script);
        return this;
    }
    /**
     * detaches a set of nodes from their parent elements
     * in a browser independent manner
     * @return {Array} an array of nodes with the detached dom nodes
     */
    detach() {
        this.eachElem((item) => {
            item.parentNode.removeChild(item);
        });
        return this;
    }
    /**
     * appends the current set of elements
     * to the element or first element passed via elem
     * @param elem
     */
    appendTo(elem) {
        if (_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang.isString(elem)) {
            this.appendTo(DomQuery.querySelectorAll(elem));
            return this;
        }
        this.eachElem((item) => {
            let value1 = elem.getAsElem(0).orElseLazy(() => {
                return {
                    appendChild: () => {
                    }
                };
            }).value;
            value1.appendChild(item);
        });
        return this;
    }
    /**
     * loads and evaluates a script from a source uri
     *
     * @param src the source to be loaded and evaluated
     * @param delay in milliseconds execution default (0 == no delay)
     * @param nonce optional nonce value to allow increased security via nonce crypto token
     */
    loadScriptEval(src, delay = 0, nonce) {
        this._loadScriptEval(false, src, delay, nonce);
        return this;
    }
    /**
     * loads and evaluates a script from a source uri
     *
     * @param src the source to be loaded and evaluated
     * @param delay in milliseconds execution default (0 == no delay)
     * @param nonce optional nonce parameter for increased security via nonce crypto token
     */
    loadScriptEvalSticky(src, delay = 0, nonce) {
        this._loadScriptEval(true, src, delay, nonce);
        return this;
    }
    insertAfter(...toInsertParams) {
        this.each(existingItem => {
            let existingElement = existingItem.getAsElem(0).value;
            let rootNode = existingElement.parentNode;
            for (let cnt = 0; cnt < toInsertParams.length; cnt++) {
                let nextSibling = existingElement.nextSibling;
                toInsertParams[cnt].eachElem(insertElem => {
                    if (nextSibling) {
                        rootNode.insertBefore(insertElem, nextSibling);
                        existingElement = nextSibling;
                    }
                    else {
                        rootNode.appendChild(insertElem);
                    }
                });
            }
        });
        let res = [];
        res.push(this);
        res = res.concat(toInsertParams);
        return new DomQuery(...res);
    }
    insertBefore(...toInsertParams) {
        this.each(existingItem => {
            let existingElement = existingItem.getAsElem(0).value;
            let rootNode = existingElement.parentNode;
            for (let cnt = 0; cnt < toInsertParams.length; cnt++) {
                toInsertParams[cnt].eachElem(insertElem => {
                    rootNode.insertBefore(insertElem, existingElement);
                });
            }
        });
        let res = [];
        res.push(this);
        res = res.concat(toInsertParams);
        return new DomQuery(...res);
    }
    orElse(...elseValue) {
        if (this.isPresent()) {
            return this;
        }
        else {
            return new DomQuery(...elseValue);
        }
    }
    orElseLazy(func) {
        if (this.isPresent()) {
            return this;
        }
        else {
            return new DomQuery(func());
        }
    }
    /**
     * find all parents in the hierarchy for which the selector matches
     * @param selector
     */
    allParents(selector) {
        let parent = this.parent();
        let ret = [];
        while (parent.isPresent()) {
            if (parent.matchesSelector(selector)) {
                ret.push(parent);
            }
            parent = parent.parent();
        }
        return new DomQuery(...ret);
    }
    /**
     * finds the first parent in the hierarchy for which the selector matches
     * @param selector
     */
    firstParent(selector) {
        let parent = this.parent();
        while (parent.isPresent()) {
            if (parent.matchesSelector(selector)) {
                return parent;
            }
            parent = parent.parent();
        }
        return DomQuery.absent;
    }
    /**
     * fetches all parents as long as the filter criterium matches
     * @param selector
     */
    parentsWhileMatch(selector) {
        const retArr = [];
        let parent = this.parent().filter(item => item.matchesSelector(selector));
        while (parent.isPresent()) {
            retArr.push(parent);
            parent = parent.parent().filter(item => item.matchesSelector(selector));
        }
        return new DomQuery(...retArr);
    }
    parent() {
        let ret = [];
        this.eachElem((item) => {
            let parent = item.parentNode || item.host || item.shadowRoot;
            if (parent && ret.indexOf(parent) == -1) {
                ret.push(parent);
            }
        });
        return new DomQuery(...ret);
    }
    copyAttrs(sourceItem) {
        sourceItem.eachElem((sourceNode) => {
            let attrs = objToArray(sourceNode.attributes);
            for (let item of attrs) {
                let value = item.value;
                let name = item.name;
                switch (name) {
                    case "id":
                        this.id.value = value;
                        break;
                    case "disabled":
                        this.resolveAttributeHolder("disabled").disabled = value;
                        break;
                    case "checked":
                        this.resolveAttributeHolder("checked").checked = value;
                        break;
                    case "nonce":
                        // nonce will be handled below!
                        break;
                    default:
                        this.attr(name).value = value;
                }
            }
        });
        //special nonce handling
        sourceItem.nonce.isPresent(() => {
            this.nonce.value = sourceItem.nonce.value;
        });
        return this;
    }
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
    outerHTML(markup, runEmbeddedScripts, runEmbeddedCss, deep = false) {
        var _a;
        if (this.isAbsent()) {
            return undefined;
        }
        let focusElementId = (_a = document === null || document === void 0 ? void 0 : document.activeElement) === null || _a === void 0 ? void 0 : _a.id;
        let caretPosition = (focusElementId) ? DomQuery.getCaretPosition(document.activeElement) : null;
        let nodes = DomQuery.fromMarkup(markup);
        let res = [];
        let toReplace = this.getAsElem(0).value;
        let firstInsert = nodes.get(0);
        let parentNode = toReplace.parentNode;
        let replaced = firstInsert.getAsElem(0).value;
        parentNode.replaceChild(replaced, toReplace);
        res.push(new DomQuery(replaced));
        // no replacement possible
        if (this.isAbsent()) {
            return this;
        }
        let insertAdditionalItems = [];
        if (nodes.length > 1) {
            insertAdditionalItems = insertAdditionalItems.concat(...nodes.values.slice(1));
            res.push(DomQuery.byId(replaced).insertAfter(new DomQuery(...insertAdditionalItems)));
        }
        if (runEmbeddedScripts) {
            this.runScripts();
        }
        if (runEmbeddedCss) {
            this.runCss();
        }
        let focusElement = DomQuery.byId(focusElementId);
        if (focusElementId && focusElement.isPresent() &&
            caretPosition != null && "undefined" != typeof caretPosition) {
            focusElement.eachElem(item => DomQuery.setCaretPosition(item, caretPosition));
        }
        return nodes;
    }
    /**
     * Run through the given nodes in the DomQuery execute the inline scripts
     * @param sticky if set to true the evaluated elements will stick to the head, default false
     * @param whitelisted: optional whitelist function which can filter out script tags which are not processed
     * defaults to the standard jsf.js exclusion (we use this code for myfaces)
     */
    runScripts(sticky = false, whitelisted = DEFAULT_WHITELIST) {
        const evalCollectedScripts = (scriptsToProcess) => {
            if (scriptsToProcess.length) {
                // script source means we have to eval the existing
                // scripts before we run the 'include' command
                // this.globalEval(finalScripts.join("\n"));
                let joinedScripts = [];
                new _Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019Array(...scriptsToProcess).forEach(item => {
                    if (!item.nonce) {
                        joinedScripts.push(item.evalText);
                    }
                    else {
                        if (joinedScripts.length) {
                            this.globalEval(joinedScripts.join("\n"));
                            joinedScripts.length = 0;
                        }
                        (!sticky) ?
                            this.globalEval(item.evalText, item.nonce) :
                            this.globalEvalSticky(item.evalText, item.nonce);
                    }
                });
                if (joinedScripts.length) {
                    (!sticky) ? this.globalEval(joinedScripts.join("\n")) :
                        this.globalEvalSticky(joinedScripts.join("\n"));
                    joinedScripts.length = 0;
                }
                scriptsToProcess = [];
            }
            return scriptsToProcess;
        };
        let finalScripts = [], allowedItemTypes = ["", "script", "text/javascript", "text/ecmascript", "ecmascript"], execScript = (item) => {
            var _a, _b, _c, _d;
            let tagName = item.tagName;
            let itemType = ((_a = item === null || item === void 0 ? void 0 : item.type) !== null && _a !== void 0 ? _a : '').toLowerCase();
            if (tagName &&
                eqi(tagName, "script") &&
                allowedItemTypes.indexOf(itemType) != -1) {
                let src = item.getAttribute('src');
                if ('undefined' != typeof src
                    && null != src
                    && src.length > 0) {
                    let nonce = (_b = item === null || item === void 0 ? void 0 : item.nonce) !== null && _b !== void 0 ? _b : item.getAttribute('nonce').value;
                    // we have to move this into an inner if because chrome otherwise chokes
                    // due to changing the and order instead of relying on left to right
                    // if jsf.js is already registered we do not replace it anymore
                    if (whitelisted(src)) {
                        // we run the collected scripts, before we run the 'include' command
                        finalScripts = evalCollectedScripts(finalScripts);
                        if (!sticky) {
                            (!!nonce) ? this.loadScriptEval(src, 0, nonce) :
                                // if no nonce is set we do not pass any once
                                this.loadScriptEval(src, 0);
                        }
                        else {
                            (!!nonce) ? this.loadScriptEvalSticky(src, 0, nonce) :
                                // if no nonce is set we do not pass any once
                                this.loadScriptEvalSticky(src, 0);
                        }
                    }
                }
                else {
                    // embedded script auto eval
                    // probably not needed anymore
                    let evalText = trim(item.text || item.innerText || item.innerHTML);
                    let go = true;
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
                    let nonce = (_d = (_c = item === null || item === void 0 ? void 0 : item.nonce) !== null && _c !== void 0 ? _c : item.getAttribute('nonce').value) !== null && _d !== void 0 ? _d : '';
                    // we have to run the script under a global context
                    // we store the script for fewer calls to eval
                    finalScripts.push({
                        nonce,
                        evalText
                    });
                }
            }
        };
        try {
            let scriptElements = new DomQuery(this.filterSelector("script"), this.querySelectorAll("script"));
            // script execution order by relative pos in their dom tree
            scriptElements.asArray
                .flatMap(item => [...item.values])
                .sort((node1, node2) => node2.compareDocumentPosition(node1) - 3) // preceding 2, following == 4)
                .forEach(item => execScript(item));
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
                const error = e;
                console.error(error.message || error.description);
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
    }
    runCss() {
        const execCss = (toReplace) => {
            const _toReplace = DomQuery.byId(toReplace);
            const tagName = _toReplace.tagName.orElse("").value;
            let newElement = DomQuery.fromMarkup(`<${tagName.toLowerCase()} />`);
            newElement = newElement.copyAttrs(_toReplace);
            newElement.innerHTML = toReplace.innerHTML;
            // css suffices a simple replace to get it eval-ed, no need
            // for a full head replace
            _toReplace.replace(newElement);
        };
        const cssElems = new DomQuery(this.filterSelector("link, style"), this.querySelectorAll("link, style"));
        cssElems.asArray
            .flatMap(item => [...item.values])
            // sort to make sure the execution order is correct
            // this is needed because we mix 2 queries together
            // -3 is needed due to the compareDocumentPosition return value
            .sort((node1, node2) => node1.compareDocumentPosition(node2) - 3)
            .forEach(item => execCss(item));
        return this;
    }
    /**
     * fires a click event on the underlying dom elements
     */
    click() {
        this.fireEvent("click");
        return this;
    }
    addEventListener(type, listener, options) {
        this.eachElem((node) => node.addEventListener(type, listener, options));
        return this;
    }
    removeEventListener(type, listener, options) {
        this.eachElem((node) => node.removeEventListener(type, listener, options));
        return this;
    }
    /**
     * fires an event
     */
    fireEvent(eventName, options = {}) {
        // merge with last one having the highest priority
        let finalOptions = {
            bubbles: true, cancelable: true
        };
        finalOptions = (0,_AssocArray__WEBPACK_IMPORTED_MODULE_5__.simpleShallowMerge)(finalOptions, options);
        this.eachElem((node) => {
            let doc;
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
                let EventClass = Event;
                // Different events have different event classes.
                // If this switch statement can't map an eventName to an EventClass,
                // the event firing is going to fail.
                // extend this list on demand
                switch (eventName) {
                    case "click": // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
                    case "mousedown":
                    case "mouseup":
                    case "mousemove":
                        EventClass = this.global().MouseEvent;
                        break;
                    case "keyup":
                    case "keydown":
                    case "keypress":
                        EventClass = this.global().KeyboardEvent;
                        break;
                    case "focus":
                    case "change":
                    case "blur":
                    case "select":
                        break;
                    default:
                        throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
                }
                let event = new EventClass(eventName, finalOptions);
                // this is added as an extra to allow internally the detection of synthetic events
                // not used atm, but it does not hurt to have the extra info
                event.synthetic = true; // allow detection of synthetic events
                // The second parameter says go ahead with the default action
                node.dispatchEvent(event);
            }
            else if (node.fireEvent) {
                // IE-old school style, you can drop this if you don't need to support IE8 and lower
                let event = doc.createEventObject();
                event.synthetic = true; // allow detection of synthetic events
                Object.keys(finalOptions).forEach(key => event[key] = finalOptions[key]);
                node.fireEvent("on" + eventName, event);
            }
        });
    }
    textContent(joinString = "") {
        return this.asArray
            .map((value) => {
            let item = value.getAsElem(0).orElseLazy(() => {
                return {
                    textContent: ""
                };
            }).value;
            return item.textContent || "";
        })
            .reduce((text1, text2) => [text1, joinString, text2].join(""), "");
    }
    innerText(joinString = "") {
        return this.asArray
            .map((value) => {
            let item = value.getAsElem(0).orElseLazy(() => {
                return {
                    innerText: ""
                };
            }).value;
            return item.innerText || "";
        })
            .reduce((text1, text2) => {
            return [text1, text2].join(joinString);
        }, "");
    }
    /**
     * encodes all input elements properly into respective
     * config entries, this can be used
     * for legacy systems, for newer use-cases, use the
     * HTML5 Form class which all newer browsers provide
     *
     * @param toMerge optional config which can be merged in
     * @return a copy pf
     */
    encodeFormElement(toMerge = {}) {
        // browser behavior no element name no encoding (normal submit fails in that case)
        // https:// issues.apache.org/jira/browse/MYFACES-2847
        if (this.name.isAbsent()) {
            return undefined;
        }
        // let´s keep it side-effects free
        let target = (0,_AssocArray__WEBPACK_IMPORTED_MODULE_5__.simpleShallowMerge)(toMerge);
        this.each((element) => {
            var _a, _b;
            if (element.name.isAbsent()) { // no name, no encoding
                return;
            }
            let name = element.name.value;
            let tagName = element.tagName.orElse("__none__").value.toLowerCase();
            let elemType = element.type.orElse("__none__").value.toLowerCase();
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
                    let selectElem = element.getAsElem(0).value;
                    if (selectElem.selectedIndex >= 0) {
                        let uLen = selectElem.options.length;
                        for (let u = 0; u < uLen; u++) {
                            // find all selected options
                            // let subBuf = [];
                            if (selectElem.options[u].selected) {
                                let elementOption = selectElem.options[u];
                                (0,_AssocArray__WEBPACK_IMPORTED_MODULE_5__.append)(target, name).value = (elementOption.getAttribute("value") != null) ?
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
                    let uploadedFiles = (_b = (_a = element.value) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.files;
                    let filesArr = uploadedFiles !== null && uploadedFiles !== void 0 ? uploadedFiles : [];
                    if (filesArr === null || filesArr === void 0 ? void 0 : filesArr.length) { //files can be empty but set
                        // xhr level2, single multiple must be passes as they are
                        (0,_AssocArray__WEBPACK_IMPORTED_MODULE_5__.assign)(target, name).value = Array.from(filesArr);
                    }
                    else {
                        if (!!uploadedFiles) { //we skip empty file elements i
                            return;
                        }
                        //checkboxes etc.. need to be appended
                        (0,_AssocArray__WEBPACK_IMPORTED_MODULE_5__.append)(target, name).value = element.inputValue.value;
                    }
                }
            }
        });
        return target;
    }
    get cDATAAsString() {
        let TYPE_CDATA_BLOCK = 4;
        let res = this.asArray
            .flatMap(item => {
            return item.childNodes.asArray;
        })
            .filter(item => {
            var _a, _b;
            return ((_b = (_a = item === null || item === void 0 ? void 0 : item.value) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.nodeType) == TYPE_CDATA_BLOCK;
        })
            .reduce((reduced, item) => {
            var _a, _b, _c;
            reduced.push((_c = (_b = (_a = item === null || item === void 0 ? void 0 : item.value) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.data) !== null && _c !== void 0 ? _c : "");
            return reduced;
        }, []);
        /*let res: any = this.lazyStream.flatMap(item => {
            return item.childNodes.stream
        }).filter(item => {
            return item?.value?.value?.nodeType == TYPE_CDATA_BLOCK;
        }).reduce((reduced: Array<any>, item: DomQuery) => {
            reduced.push((item?.value?.value)?.data ?? "" as any);
            return reduced;
        }, []).value;*/
        // response may contain several blocks
        return res.join("");
    }
    subNodes(from, to) {
        if (_Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(to).isAbsent()) {
            to = this.length;
        }
        return new DomQuery(...this.rootNode.slice(from, Math.min(to, this.length)));
    }
    limits(end) {
        this._limits = end;
        return this;
    }
    //-- internally exposed methods needed for the interconnectivity
    hasNext() {
        let isLimitsReached = this._limits != -1 && this.pos >= this._limits - 1;
        let isEndOfArray = this.pos >= this.values.length - 1;
        return !(isLimitsReached ||
            isEndOfArray);
    }
    next() {
        if (!this.hasNext()) {
            return null;
        }
        this.pos++;
        return new DomQuery(this.values[this.pos]);
    }
    lookAhead(cnt = 1) {
        if ((this.values.length - 1) < (this.pos + cnt)) {
            return _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ITERATION_STATUS.EO_STRM;
        }
        return new DomQuery(this.values[this.pos + cnt]);
    }
    current() {
        if (this.pos == -1) {
            return _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ITERATION_STATUS.BEF_STRM;
        }
        return new DomQuery(this.values[this.pos]);
    }
    reset() {
        this.pos = -1;
    }
    attachShadow(params = { mode: "open" }) {
        let shadowRoots = [];
        this.eachElem((item) => {
            var _a;
            let shadowElement;
            if ((_a = (item)) === null || _a === void 0 ? void 0 : _a.attachShadow) {
                shadowElement = DomQuery.byId(item.attachShadow(params));
                shadowRoots.push(shadowElement);
            }
            else {
                throw new Error("Shadow dom creation not supported by the browser, please use a shim, to gain this functionality");
            }
        });
        return new DomQuery(...shadowRoots);
    }
    /**
     * helper to fix a common dom problem
     * we have to wait until a certain condition is met, in most of the cases we just want to know whether an element is present in the sub dom-tree before being able to proceed
     * @param condition
     * @param options
     */
    waitUntilDom(condition_1) {
        return __awaiter(this, arguments, void 0, function* (condition, options = {
            attributes: true,
            childList: true,
            subtree: true,
            timeout: 500,
            interval: 100
        }) {
            return waitUntilDom(this, condition, options);
        });
    }
    /**
     * returns the embedded shadow elements
     */
    get shadowElements() {
        let shadowElements = this.querySelectorAll("*")
            .filter(item => item.hasShadow);
        let mapped = (shadowElements.allElems() || [])
            .map(element => element.shadowRoot)
            .filter((root) => !!root);
        return new DomQuery(...mapped);
    }
    get shadowRoot() {
        let shadowRoots = [];
        for (let cnt = 0; cnt < this.rootNode.length; cnt++) {
            if (this.rootNode[cnt].shadowRoot) {
                shadowRoots.push(this.rootNode[cnt].shadowRoot);
            }
        }
        return new DomQuery(...shadowRoots);
    }
    get hasShadow() {
        for (let cnt = 0; cnt < this.rootNode.length; cnt++) {
            if (this.rootNode[cnt].shadowRoot) {
                return true;
            }
        }
        return false;
    }
    // from
    // http:// blog.vishalon.net/index.php/javascript-getting-and-setting-caret-position-in-textarea/
    static getCaretPosition(ctrl) {
        let caretPos = 0;
        try {
            if (document === null || document === void 0 ? void 0 : document.selection) {
                ctrl.focus();
                let selection = document.selection.createRange();
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
    }
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
    static setCaretPosition(ctrl, pos) {
        (ctrl === null || ctrl === void 0 ? void 0 : ctrl.focus) ? ctrl === null || ctrl === void 0 ? void 0 : ctrl.focus() : null;
        // the selection range is our caret position
        (ctrl === null || ctrl === void 0 ? void 0 : ctrl.setSelectiongRange) ? ctrl === null || ctrl === void 0 ? void 0 : ctrl.setSelectiongRange(pos, pos) : null;
    }
    /**
     * Implementation of an iterator
     * to allow loops over dom query collections
     */
    [Symbol.iterator]() {
        return {
            next: () => {
                let done = !this.hasNext();
                let val = this.next();
                return {
                    done: done,
                    value: val
                };
            }
        };
    }
    /**
     * Concatenates the elements of two Dom Queries into a single one
     * @param toAttach the elements to attach
     * @param filterDoubles filter out possible double elements (aka same markup)
     */
    concat(toAttach, filterDoubles = true) {
        let domQueries = this.asArray;
        const ret = new DomQuery(...domQueries.concat(toAttach.asArray));
        // we now filter the doubles out
        if (!filterDoubles) {
            return ret;
        }
        let idx = {}; // ie11 does not support sets, we have to fake it
        return new DomQuery(...ret.asArray.filter(node => {
            const notFound = !(idx === null || idx === void 0 ? void 0 : idx[node.value.value.outerHTML]);
            idx[node.value.value.outerHTML] = true;
            return notFound;
        }));
    }
    append(elem) {
        this.each(item => elem.appendTo(item));
        return this;
    }
    prependTo(elem) {
        elem.eachElem(item => {
            item.prepend(...this.allElems());
        });
        return this;
    }
    prepend(elem) {
        this.eachElem(item => {
            item.prepend(...elem.allElems());
        });
        return this;
    }
    /**
     * query selector all on the existing dom queryX object
     *
     * @param selector the standard selector
     * @return a DomQuery with the results
     */
    _querySelectorAll(selector) {
        var _a, _b;
        if (!((_a = this === null || this === void 0 ? void 0 : this.rootNode) === null || _a === void 0 ? void 0 : _a.length)) {
            return this;
        }
        let nodes = [];
        for (let cnt = 0; cnt < this.rootNode.length; cnt++) {
            if (!((_b = this.rootNode[cnt]) === null || _b === void 0 ? void 0 : _b.querySelectorAll)) {
                continue;
            }
            let res = this.rootNode[cnt].querySelectorAll(selector);
            nodes = nodes.concat(...objToArray(res));
        }
        return new DomQuery(...nodes);
    }
    /*deep with a selector and a pseudo /shadow/ marker to break into the next level*/
    _querySelectorAllDeep(selector) {
        var _a;
        if (!((_a = this === null || this === void 0 ? void 0 : this.rootNode) === null || _a === void 0 ? void 0 : _a.length)) {
            return this;
        }
        let foundNodes = new DomQuery(...this.rootNode);
        let selectors = selector.split(/\/shadow\//);
        for (let cnt2 = 0; cnt2 < selectors.length; cnt2++) {
            if (selectors[cnt2] == "") {
                continue;
            }
            let levelSelector = selectors[cnt2];
            foundNodes = foundNodes.querySelectorAll(levelSelector);
            if (cnt2 < selectors.length - 1) {
                foundNodes = foundNodes.shadowRoot;
            }
        }
        return foundNodes;
    }
    /**
     * query selector all on the existing dom queryX object
     *
     * @param selector the standard selector
     * @return a DomQuery with the results
     */
    _closest(selector) {
        var _a, _b;
        if (!((_a = this === null || this === void 0 ? void 0 : this.rootNode) === null || _a === void 0 ? void 0 : _a.length)) {
            return this;
        }
        let nodes = [];
        for (let cnt = 0; cnt < this.rootNode.length; cnt++) {
            if (!((_b = this.rootNode[cnt]) === null || _b === void 0 ? void 0 : _b.closest)) {
                continue;
            }
            let res = [this.rootNode[cnt].closest(selector)];
            nodes = nodes.concat(...res);
        }
        return new DomQuery(...nodes);
    }
    /*deep with a selector and a pseudo /shadow/ marker to break into the next level*/
    _closestDeep(selector) {
        var _a;
        if (!((_a = this === null || this === void 0 ? void 0 : this.rootNode) === null || _a === void 0 ? void 0 : _a.length)) {
            return this;
        }
        let foundNodes = new DomQuery(...this.rootNode);
        let selectors = selector.split(/\/shadow\//);
        for (let cnt2 = 0; cnt2 < selectors.length; cnt2++) {
            if (selectors[cnt2] == "") {
                continue;
            }
            let levelSelector = selectors[cnt2];
            foundNodes = foundNodes.closest(levelSelector);
            if (cnt2 < selectors.length - 1) {
                foundNodes = foundNodes.shadowRoot;
            }
        }
        return foundNodes;
    }
    /**
     * matches selector call in a browser independent manner
     *
     * @param toMatch
     * @param selector
     * @private
     */
    _matchesSelector(toMatch, selector) {
        if (toMatch.matches) {
            return toMatch.matches(selector);
        }
        var foundElements = (document || ownerDocument).querySelectorAll(selector);
        return Array.prototype.indexOf.call(foundElements, toMatch) !== -1;
    }
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
    _loadScriptEval(sticky, src, delay = 0, nonce) {
        let srcNode = this.createSourceNode(src, nonce);
        let nonceCheck = this.createSourceNode(null, nonce);
        let marker = `nonce_${Date.now()}_${Math.random()}`;
        nonceCheck.innerHTML = `document.head["${marker}"] = true`; // noop
        let head = document.head;
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
                setTimeout(() => {
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
    }
    /**
     * resolves an attribute holder compared
     * @param attrName the attribute name
     */
    resolveAttributeHolder(attrName = "value") {
        let ret = [];
        ret[attrName] = null;
        return (attrName in this.getAsElem(0).value) ?
            this.getAsElem(0).value :
            ret;
    }
    createSourceNode(src, nonce) {
        let srcNode = document.createElement("script");
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
    }
    applyNonce(nonce, script) {
        if (nonce) {
            if ('undefined' != typeof (script === null || script === void 0 ? void 0 : script.nonce)) {
                script.nonce = nonce;
            }
            else {
                script.setAttribute("nonce", nonce);
            }
        }
    }
}
DomQuery.absent = new DomQuery();
/**
 * reference to the environmental global object
 */
DomQuery.global = _Global__WEBPACK_IMPORTED_MODULE_3__._global$;
/**
 * Various collectors
 * which can be used in conjunction with Streams
 */
/**
 * A collector which bundles a full dom query stream into a single dom query element
 *
 * This connects basically our stream back into DomQuery
 */
class DomQueryCollector {
    constructor() {
        this.data = [];
    }
    collect(element) {
        this.data.push(element);
    }
    get finalValue() {
        return new DomQuery(...this.data);
    }
}
/**
 * abbreviation for DomQuery
 */
const DQ = DomQuery;
// noinspection JSUnusedGlobalSymbols
/**
 * replacement for the jquery $
 */
const DQ$ = DomQuery.querySelectorAll;


/***/ },

/***/ "./node_modules/mona-dish/src/main/typescript/Es2019Array.ts"
/*!*******************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/Es2019Array.ts ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Es2019Array: () => (/* binding */ Es2019Array),
/* harmony export */   _Es2019Array: () => (/* binding */ _Es2019Array)
/* harmony export */ });
/**
 * Extended array
 */
/**
 * Extended array which adds various es 2019 shim functions to the normal array
 * We must remap all array producing functions in order to keep
 * the delegation active, once we are in!
 */
class Es2019Array_ extends Array {
    constructor(...another) {
        super(...another);
        if (another._another) {
            this._another = another._another;
        }
        else {
            this._another = another;
        }
        //for testing it definitely runs into this branch because we are on es5 level
        //if (!(Array.prototype).flatMap as any) {
        this.flatMap = (flatMapFun) => this._flatMap(flatMapFun);
        //}
        //if (!(Array.prototype).flat as any) {
        this.flat = (flatLevel = 1) => this._flat(flatLevel);
        //}
    }
    map(callbackfn, thisArg) {
        const ret = Array.prototype.map.call(this._another, callbackfn, thisArg);
        return new _Es2019Array(...ret);
    }
    concat(...items) {
        const ret = Array.prototype.concat.call(this._another, ...items);
        return new _Es2019Array(...ret);
    }
    reverse() {
        const ret = Array.prototype.reverse.call(this._another);
        return new _Es2019Array(...ret);
    }
    slice(start, end) {
        const ret = Array.prototype.slice.call(this._another, start, end);
        return new _Es2019Array(...ret);
    }
    splice(start, deleteCount) {
        const ret = Array.prototype.splice.call(this._another, start, deleteCount !== null && deleteCount !== void 0 ? deleteCount : 0);
        return new _Es2019Array(...ret);
    }
    filter(predicate, thisArg) {
        const ret = Array.prototype.filter.call(this._another, predicate, thisArg);
        return new _Es2019Array(...ret);
    }
    reduce(callbackfn, initialValue) {
        const ret = Array.prototype.reduce.call(this._another, callbackfn, initialValue);
        return ret;
    }
    /*reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T {
        const ret = Array.prototype.reduceRight.call(callbackfn, initialValue);
        return ret;
    }*/
    _flat(flatDepth = 1) {
        return this._flatResolve(this._another, flatDepth);
    }
    _flatResolve(arr, flatDepth = 1) {
        //recursion break
        if (flatDepth == 0) {
            return arr;
        }
        let res = [];
        let reFlat = (item) => {
            item = Array.isArray(item) ? item : [item];
            let mapped = this._flatResolve(item, flatDepth - 1);
            res = res.concat(mapped);
        };
        arr.forEach(reFlat);
        return new Es2019Array(...res);
    }
    _flatMap(mapperFunction) {
        let res = this.map(item => mapperFunction(item));
        return this._flatResolve(res);
    }
}
//let _Es2019Array = function<T>(...data: T[]) {};
//let oldProto = Es2019Array.prototype;
function _Es2019Array(...data) {
    let ret = new Es2019Array_(...data);
    let proxied = new Proxy(ret, {
        get(target, p, receiver) {
            if ("symbol" == typeof p) {
                return target._another[p];
            }
            if (!isNaN(parseInt(p))) {
                return target._another[p];
            }
            else {
                return target[p];
            }
        },
        set(target, property, value) {
            target[property] = value;
            target._another[property] = value;
            return true;
        }
    });
    return proxied;
}
;
var Es2019Array = ((Array.prototype.flatMap) ? function (...data) {
    // sometimes the typescript compiler produces
    // an array without flatmap between boundaries (the result produces True for Array.isArray
    // but has no flatMap function, could be a node issue also or Typescript!
    // we remap that (could be related to: https://github.com/microsoft/TypeScript/issues/31033
    // the check and remap fixes the issue which should not exist in the first place
    return (data === null || data === void 0 ? void 0 : data.flatMap) ? data : _Es2019Array(...data);
} : _Es2019Array);


/***/ },

/***/ "./node_modules/mona-dish/src/main/typescript/Global.ts"
/*!**************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/Global.ts ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _global$: () => (/* binding */ _global$)
/* harmony export */ });
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
    let _global$ = ('undefined' != typeof globalThis && globalThis.window) ? globalThis.window :
        ('undefined' != typeof window) ? window :
            ('undefined' != typeof globalThis) ? globalThis :
                ('undefined' != typeof __webpack_require__.g && (__webpack_require__.g === null || __webpack_require__.g === void 0 ? void 0 : __webpack_require__.g.window)) ? __webpack_require__.g.window :
                    ('undefined' != typeof __webpack_require__.g) ? __webpack_require__.g : null;
    //under test systems we often have a lazy init of the window object under global.window, but we
    //want the window object
    return (_a = _global$ === null || _global$ === void 0 ? void 0 : _global$.window) !== null && _a !== void 0 ? _a : _global$;
}


/***/ },

/***/ "./node_modules/mona-dish/src/main/typescript/Lang.ts"
/*!************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/Lang.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Lang: () => (/* binding */ Lang)
/* harmony export */ });
/* harmony import */ var _Monad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Monad */ "./node_modules/mona-dish/src/main/typescript/Monad.ts");
/* harmony import */ var _Es2019Array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Es2019Array */ "./node_modules/mona-dish/src/main/typescript/Es2019Array.ts");
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


/**
 * Lang helpers crossported from the apache myfaces project
 */
var Lang;
(function (Lang) {
    //should be in lang, but for now here to avoid recursive imports, not sure if typescript still has a problem with those
    /**
     * helper function to safely resolve anything
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
     * @param defaultValue an optional default value if the producer fails to produce anything
     * @returns an Optional of the produced value
     */
    function saveResolve(resolverProducer, defaultValue = null) {
        try {
            let result = resolverProducer();
            return _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(result !== null && result !== void 0 ? result : defaultValue);
        }
        catch (e) {
            return _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.absent;
        }
    }
    Lang.saveResolve = saveResolve;
    /**
     * lazy resolve... aka the function is called on resolve and a default value also
     * is a producing function (called only if the original producer does not produce any result)
     * @param resolverProducer the producer for the resolve
     * @param defaultValue the default value producer function
     */
    function saveResolveLazy(resolverProducer, defaultValue = null) {
        try {
            let result = resolverProducer();
            return _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(result !== null && result !== void 0 ? result : defaultValue());
        }
        catch (e) {
            return _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.absent;
        }
    }
    Lang.saveResolveLazy = saveResolveLazy;
    /**
     * String to array function performs a string to array transformation
     * @param {String} it the string which has to be changed into an array
     * @param {RegExp} splitter our splitter reglar expression
     * @return a trimmed array of the splitted string
     */
    function strToArray(it, splitter = /\./gi) {
        let ret = [];
        it.split(splitter).forEach((element => {
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
        let ws = /\s/, i = str.length;
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
    function objToArray(obj, offset = 0, pack = []) {
        if ((obj !== null && obj !== void 0 ? obj : "__undefined__") == "__undefined__") {
            return pack !== null && pack !== void 0 ? pack : null;
        }
        //since offset is numeric we cannot use the shortcut due to 0 being false
        //special condition array delivered no offset no pack
        if ((obj) instanceof Array && !offset && !pack)
            return obj;
        return new _Es2019Array__WEBPACK_IMPORTED_MODULE_1__.Es2019Array(...pack.concat(Array.prototype.slice.call(obj, offset)));
    }
    Lang.objToArray = objToArray;
    /**
     * equalsIgnoreCase, case-insensitive comparison of two strings
     *
     * @param source
     * @param destination
     */
    function equalsIgnoreCase(source, destination) {
        let finalSource = source !== null && source !== void 0 ? source : "___no_value__";
        let finalDest = destination !== null && destination !== void 0 ? destination : "___no_value__";
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
     * Back ported from Dojo
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
    /**
     * Back-ported, a failsafe determination code for checking whether an object is a function
     * @param it the object to check for being a function
     */
    function isFunc(it) {
        return it instanceof Function || typeof it === "function";
    }
    Lang.isFunc = isFunc;
    // code from https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    // license https://creativecommons.org/licenses/by-sa/2.5/
    function objAssign(target, ...theArgs) {
        if (target == null) { // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }
        let to = Object(target);
        if ((Object).assign) {
            theArgs.forEach(item => (Object).assign(to, item));
            return to;
        }
        theArgs.filter(item => item != null).forEach(item => {
            let nextSource = item;
            Object.keys(nextSource)
                .filter(nextKey => Object.prototype.hasOwnProperty.call(nextSource, nextKey))
                .forEach(nextKey => to[nextKey] = nextSource[nextKey]);
        });
        return to;
    }
    Lang.objAssign = objAssign;
})(Lang || (Lang = {}));


/***/ },

/***/ "./node_modules/mona-dish/src/main/typescript/Monad.ts"
/*!*************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/Monad.ts ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Monad: () => (/* binding */ Monad),
/* harmony export */   Optional: () => (/* binding */ Optional),
/* harmony export */   ValueEmbedder: () => (/* binding */ ValueEmbedder)
/* harmony export */ });
/* harmony import */ var _Es2019Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Es2019Array */ "./node_modules/mona-dish/src/main/typescript/Es2019Array.ts");
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

/**
 * Implementation of a monad
 * (Side - effect free), no write allowed directly on the monads
 * value state
 */
class Monad {
    constructor(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
    map(fn) {
        if (!fn) {
            fn = (inVal) => inVal;
        }
        let result = fn(this.value);
        return new Monad(result);
    }
    flatMap(fn) {
        let mapped = this.map(fn);
        while ((mapped === null || mapped === void 0 ? void 0 : mapped.value) instanceof Monad) {
            mapped = mapped.value;
        }
        return mapped;
    }
}
/**
 * optional implementation, an optional is basically an implementation of a Monad with additional syntactic
 * sugar on top
 * (Side - effect free, since value assignment is not allowed)
 * */
class Optional extends Monad {
    constructor(value) {
        super(value);
    }
    get value() {
        if (this._value instanceof Monad) {
            return this._value.flatMap().value;
        }
        return this._value;
    }
    static fromNullable(value) {
        return new Optional(value);
    }
    /*syntactic sugar for absent and present checks*/
    isAbsent() {
        return "undefined" == typeof this.value || null == this.value;
    }
    /**
     * any value present
     */
    isPresent(presentRunnable) {
        let absent = this.isAbsent();
        if (!absent && presentRunnable) {
            presentRunnable.call(this, this);
        }
        return !absent;
    }
    ifPresentLazy(presentRunnable = () => {
    }) {
        this.isPresent.call(this, presentRunnable);
        return this;
    }
    orElse(elseValue) {
        if (this.isPresent()) {
            return this;
        }
        else {
            //shortcut
            if (elseValue == null) {
                return Optional.absent;
            }
            return this.flatMap(() => elseValue);
        }
    }
    /**
     * lazy, passes a function which then is lazily evaluated
     * instead of a direct value
     * @param func
     */
    orElseLazy(func) {
        if (this.isPresent()) {
            return this;
        }
        else {
            return this.flatMap(func);
        }
    }
    /*
     * we need to implement it to fulfill the contract, although it is used only internally
     * all values are flattened when accessed anyway, so there is no need to call this method
     */
    flatMap(fn) {
        let val = super.flatMap(fn);
        if (!(val instanceof Optional)) {
            return Optional.fromNullable(val.value);
        }
        return val.flatMap();
    }
    /*
     * elvis operation, take care, if you use this you lose typesafety and refactoring
     * capabilities, unfortunately typescript does not allow to have its own elvis operator
     * this is some syntactic sugar however which is quite useful*/
    getIf(...key) {
        key = this.preprocessKeys(...key);
        let currentPos = this;
        for (let cnt = 0; cnt < key.length; cnt++) {
            let currKey = this.keyVal(key[cnt]);
            let arrPos = this.arrayIndex(key[cnt]);
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
        return currentPos;
    }
    /**
     * simple match, if the first order function call returns
     * true then there is a match, if the value is not present
     * it never matches
     *
     * @param fn the first order function performing the match
     */
    match(fn) {
        if (this.isAbsent()) {
            return false;
        }
        return fn(this.value);
    }
    /**
     * convenience function to flatmap the internal value
     * and replace it with a default in case of being absent
     *
     * @param defaultVal
     * @returns {Optional<any>}
     */
    get(defaultVal = Optional.absent) {
        if (this.isAbsent()) {
            return this.getClass().fromNullable(defaultVal).flatMap();
        }
        return this.getClass().fromNullable(this.value).flatMap();
    }
    toJson() {
        return JSON.stringify(this.value);
    }
    /**
     * helper to override several implementations in a more fluent way
     * by having a getClass operation we can avoid direct calls into the constructor or
     * static methods and do not have to implement several methods which rely on the type
     * of "this"
     * @returns the type of Optional
     */
    getClass() {
        return Optional;
    }
    /*helper method for getIf with array access aka <name>[<indexPos>]*/
    arrayIndex(key) {
        let start = key.indexOf("[");
        let end = key.indexOf("]");
        if (start >= 0 && end > 0 && start < end) {
            return parseInt(key.substring(start + 1, end));
        }
        else {
            return -1;
        }
    }
    /*helper method for getIf with array access aka <name>[<indexPos>]*/
    keyVal(key) {
        let start = key.indexOf("[");
        if (start >= 0) {
            return key.substring(0, start);
        }
        else {
            return key;
        }
    }
    /**
     * additional syntactic sugar which is not part of the usual optional implementation
     * but makes life easier, if you want to sacrifice typesafety and refactoring
     * capabilities in typescript
     */
    getIfPresent(key) {
        if (this.isAbsent()) {
            return this.getClass().absent;
        }
        return this.getClass().fromNullable(this.value[key]).flatMap();
    }
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
    resolve(resolver) {
        if (this.isAbsent()) {
            return Optional.absent;
        }
        try {
            return Optional.fromNullable(resolver(this.value));
        }
        catch (e) {
            return Optional.absent;
        }
    }
    preprocessKeys(...keys) {
        return new _Es2019Array__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...keys)
            .flatMap(item => {
            return new _Es2019Array__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...item.split(/]\s*\[/gi))
                .map(item => {
                item = item.replace(/^\s+|\s+$/g, "");
                if (item.indexOf("[") == -1 && item.indexOf("]") != -1) {
                    item = "[" + item;
                }
                if (item.indexOf("]") == -1 && item.indexOf("[") != -1) {
                    item = item + "]";
                }
                return item;
            });
        });
    }
}
/*default value for absent*/
Optional.absent = Optional.fromNullable(null);
// --------------------- From here onwards we break out the side effect free limits ------------
/**
 * ValueEmbedder is the writeable version
 * of optional, it basically is a wrapper
 * around a construct which has a state
 * and can be written to.
 *
 * For the readonly version see Optional
 */
class ValueEmbedder extends Optional {
    constructor(rootElem, valueKey = "value") {
        super(rootElem);
        this.key = valueKey;
    }
    get value() {
        return this._value ? this._value[this.key] : null;
    }
    set value(newVal) {
        if (!this._value) {
            return;
        }
        this._value[this.key] = newVal;
    }
    orElse(elseValue) {
        let alternative = {};
        alternative[this.key] = elseValue;
        return this.isPresent() ? this : new ValueEmbedder(alternative, this.key);
    }
    orElseLazy(func) {
        if (this.isPresent()) {
            return this;
        }
        else {
            let alternative = {};
            alternative[this.key] = func();
            return new ValueEmbedder(alternative, this.key);
        }
    }
    /**
     * helper to override several implementations in a more fluent way
     * by having a getClass operation we can avoid direct calls into the constructor or
     * static methods and do not have to implement several methods which rely on the type
     * of "this"
     * @returns ValueEmbedder
     */
    getClass() {
        return ValueEmbedder;
    }
    static fromNullable(value, valueKey = "value") {
        return new ValueEmbedder(value, valueKey);
    }
}
/*default value for absent*/
ValueEmbedder.absent = ValueEmbedder.fromNullable(null);


/***/ },

/***/ "./node_modules/mona-dish/src/main/typescript/Promise.ts"
/*!***************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/Promise.ts ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CancellablePromise: () => (/* binding */ CancellablePromise),
/* harmony export */   Promise: () => (/* binding */ Promise),
/* harmony export */   PromiseStatus: () => (/* binding */ PromiseStatus),
/* harmony export */   interval: () => (/* binding */ interval),
/* harmony export */   timeout: () => (/* binding */ timeout)
/* harmony export */ });
/* harmony import */ var _Monad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Monad */ "./node_modules/mona-dish/src/main/typescript/Monad.ts");
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

var PromiseStatus;
(function (PromiseStatus) {
    PromiseStatus[PromiseStatus["PENDING"] = 0] = "PENDING";
    PromiseStatus[PromiseStatus["FULFILLED"] = 1] = "FULFILLED";
    PromiseStatus[PromiseStatus["REJECTED"] = 2] = "REJECTED";
})(PromiseStatus || (PromiseStatus = {}));
/*
 * Promise wrappers for timeout and interval
 */
function timeout(timeout) {
    let handler = null;
    return new CancellablePromise((apply, reject) => {
        handler = setTimeout(() => apply(), timeout);
    }, () => {
        if (handler) {
            clearTimeout(handler);
            handler = null;
        }
    });
}
function interval(timeout) {
    let handler = null;
    return new CancellablePromise((apply, reject) => {
        handler = setInterval(() => {
            apply();
        }, timeout);
    }, () => {
        if (handler) {
            clearInterval(handler);
            handler = null;
        }
    });
}
/**
 * a small (probably not 100% correct, although I tried to be correct as possible) Promise implementation
 * for systems which do not have a promise implemented
 * Note, although an internal state is kept, this is sideffect free since
 * is value is a function to operate on, hence no real state is kept internally, except for the then
 * and catch calling order
 */
class Promise {
    constructor(executor) {
        this.status = PromiseStatus.PENDING;
        this.allFuncs = [];
        //super(executor);
        this.value = executor;
        this.value((data) => this.resolve(data), (data) => this.reject(data));
    }
    static all(...promises) {
        let promiseCnt = 0;
        let myapply;
        let myPromise = new Promise((apply, reject) => {
            myapply = apply;
        });
        let executor = () => {
            promiseCnt++;
            if (promises.length == promiseCnt) {
                myapply();
            }
        };
        executor.__last__ = true;
        for (let cnt = 0; cnt < promises.length; cnt++) {
            promises[cnt].finally(executor);
        }
        return myPromise;
    }
    static race(...promises) {
        let promiseCnt = 0;
        let myapply;
        let myreject;
        let myPromise = new Promise((apply, reject) => {
            myapply = apply;
            myreject = reject;
        });
        let thenexecutor = () => {
            if (!!myapply) {
                myapply();
            }
            myapply = null;
            myreject = null;
            return null;
        };
        thenexecutor.__last__ = true;
        let catchexeutor = () => {
            if (!!myreject) {
                myreject();
            }
            myreject = null;
            myapply = null;
            return null;
        };
        catchexeutor.__last__ = true;
        for (let cnt = 0; cnt < promises.length; cnt++) {
            promises[cnt].then(thenexecutor);
            promises[cnt].catch(catchexeutor);
        }
        return myPromise;
    }
    static reject(reason) {
        let retVal = new Promise((resolve, reject) => {
            //not really doable without a hack
            if (reason instanceof Promise) {
                reason.then((val) => {
                    reject(val);
                });
            }
            else {
                setTimeout(() => {
                    reject(reason);
                }, 1);
            }
        });
        return retVal;
    }
    static resolve(reason) {
        let retVal = new Promise((resolve, reject) => {
            //not really doable without a hack
            if (reason instanceof Promise) {
                reason.then((val) => resolve(val));
            }
            else {
                setTimeout(() => {
                    resolve(reason);
                }, 1);
            }
        });
        return retVal;
    }
    then(executorFunc, catchfunc) {
        this.allFuncs.push({ "then": executorFunc });
        if (catchfunc) {
            this.allFuncs.push({ "catch": catchfunc });
        }
        this.spliceLastFuncs();
        return this;
    }
    catch(executorFunc) {
        this.allFuncs.push({ "catch": executorFunc });
        this.spliceLastFuncs();
        return this;
    }
    finally(executorFunc) {
        if (this.__reason__) {
            this.__reason__.finally(executorFunc);
            return undefined;
        }
        this.allFuncs.push({ "finally": executorFunc });
        this.spliceLastFuncs();
        return this;
    }
    resolve(val) {
        while (this.allFuncs.length) {
            if (!this.allFuncs[0].then) {
                break;
            }
            let fn = this.allFuncs.shift();
            let funcResult = _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(fn.then(val));
            if (funcResult.isPresent()) {
                funcResult = funcResult.flatMap();
                val = funcResult.value;
                if (val instanceof Promise) {
                    //let func = (newVal: any) => {this.resolve(newVal)};
                    //func.__last__  = true;
                    //val.then(func);
                    this.transferIntoNewPromise(val);
                    return;
                }
            }
            else {
                break;
            }
        }
        this.appyFinally();
        this.status = PromiseStatus.FULFILLED;
    }
    reject(val) {
        while (this.allFuncs.length) {
            if (this.allFuncs[0].finally) {
                break;
            }
            let fn = this.allFuncs.shift();
            if (fn.catch) {
                let funcResult = _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(fn.catch(val));
                if (funcResult.isPresent()) {
                    funcResult = funcResult.flatMap();
                    val = funcResult.value;
                    if (val instanceof Promise) {
                        //val.then((newVal: any) => {this.resolve(newVal)});
                        this.transferIntoNewPromise(val);
                        return;
                    }
                    this.status = PromiseStatus.REJECTED;
                    break;
                }
                else {
                    break;
                }
            }
        }
        this.status = PromiseStatus.REJECTED;
        this.appyFinally();
    }
    appyFinally() {
        while (this.allFuncs.length) {
            let fn = this.allFuncs.shift();
            if (fn.finally) {
                fn.finally();
            }
        }
    }
    spliceLastFuncs() {
        let lastFuncs = [];
        let rest = [];
        for (let cnt = 0; cnt < this.allFuncs.length; cnt++) {
            for (let key in this.allFuncs[cnt]) {
                if (this.allFuncs[cnt][key].__last__) {
                    lastFuncs.push(this.allFuncs[cnt]);
                }
                else {
                    rest.push(this.allFuncs[cnt]);
                }
            }
        }
        this.allFuncs = rest.concat(lastFuncs);
    }
    transferIntoNewPromise(val) {
        for (let cnt = 0; cnt < this.allFuncs.length; cnt++) {
            for (let key in this.allFuncs[cnt]) {
                val[key](this.allFuncs[cnt][key]);
            }
        }
    }
}
/**
 * a cancellable promise
 * a Promise with a cancel function, which can be cancellend any time
 * this is useful for promises which use cancellable asynchronous operations
 * note, even in a cancel state, the finally of the promise is executed, however
 * subsequent thens are not anymore.
 * The current then however is fished or a catch is called depending on how the outer
 * operation reacts to a cancel order.
 */
class CancellablePromise extends Promise {
    /**
     * @param executor asynchronous callback operation which triggers the callback
     * @param cancellator cancel operation, separate from the trigger operation
     */
    constructor(executor, cancellator) {
        super(executor);
        this.cancellator = () => {
        };
        this.cancellator = cancellator;
    }
    cancel() {
        this.status = PromiseStatus.REJECTED;
        this.appyFinally();
        //lets terminate it once and for all, the finally has been applied
        this.allFuncs = [];
    }
    then(executorFunc, catchfunc) {
        return super.then(executorFunc, catchfunc);
    }
    catch(executorFunc) {
        return super.catch(executorFunc);
    }
    finally(executorFunc) {
        return super.finally(executorFunc);
    }
}


/***/ },

/***/ "./node_modules/mona-dish/src/main/typescript/SourcesCollectors.ts"
/*!*************************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/SourcesCollectors.ts ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArrayAssocArrayCollector: () => (/* binding */ ArrayAssocArrayCollector),
/* harmony export */   ArrayCollector: () => (/* binding */ ArrayCollector),
/* harmony export */   ArrayStreamDataSource: () => (/* binding */ ArrayStreamDataSource),
/* harmony export */   AssocArrayCollector: () => (/* binding */ AssocArrayCollector),
/* harmony export */   ConfigCollector: () => (/* binding */ ConfigCollector),
/* harmony export */   FilteredStreamDatasource: () => (/* binding */ FilteredStreamDatasource),
/* harmony export */   FormDataCollector: () => (/* binding */ FormDataCollector),
/* harmony export */   ITERATION_STATUS: () => (/* binding */ ITERATION_STATUS),
/* harmony export */   InverseArrayCollector: () => (/* binding */ InverseArrayCollector),
/* harmony export */   MappedStreamDataSource: () => (/* binding */ MappedStreamDataSource),
/* harmony export */   MultiStreamDatasource: () => (/* binding */ MultiStreamDatasource),
/* harmony export */   QueryFormDataCollector: () => (/* binding */ QueryFormDataCollector),
/* harmony export */   QueryFormStringCollector: () => (/* binding */ QueryFormStringCollector),
/* harmony export */   Run: () => (/* binding */ Run),
/* harmony export */   SequenceDataSource: () => (/* binding */ SequenceDataSource),
/* harmony export */   ShimArrayCollector: () => (/* binding */ ShimArrayCollector),
/* harmony export */   calculateSkips: () => (/* binding */ calculateSkips)
/* harmony export */ });
/* harmony import */ var _Es2019Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Es2019Array */ "./node_modules/mona-dish/src/main/typescript/Es2019Array.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Config */ "./node_modules/mona-dish/src/main/typescript/Config.ts");
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


/**
 * special status of the datasource location pointer
 * if an access, outside - of the possible data boundaries is happening
 * (example for instance current without a first next call, or next
 * which goes over the last possible dataset), an iteration status return
 * value is returned marking this boundary instead of a classical element
 *
 * Note this is only internally used but must be implemented to fulfill
 * internal contracts, the end user will never see those values if he uses
 * streams!
 */
var ITERATION_STATUS;
(function (ITERATION_STATUS) {
    ITERATION_STATUS["EO_STRM"] = "__EO_STRM__";
    ITERATION_STATUS["BEF_STRM"] = "___BEF_STRM__";
})(ITERATION_STATUS || (ITERATION_STATUS = {}));
function calculateSkips(next_strm) {
    let pos = 1;
    while (next_strm.lookAhead(pos) != ITERATION_STATUS.EO_STRM) {
        pos++;
    }
    return --pos;
}
/**
 * A data source which combines multiple streams sequentially into one
 * (this is used internally by  flatmap, but also can be used externally)
 */
class MultiStreamDatasource {
    constructor(first, ...strms) {
        this.first = first;
        this.selectedPos = 0;
        this.strms = [first].concat(...strms);
        this.activeStrm = this.strms[this.selectedPos];
    }
    current() {
        return this.activeStrm.current();
    }
    hasNext() {
        if (this.activeStrm.hasNext()) {
            return true;
        }
        if (this.selectedPos >= this.strms.length) {
            return false;
        }
        return this.findNextStrm() != -1;
    }
    findNextStrm() {
        let hasNext = false;
        let cnt = this.selectedPos;
        while (!hasNext && cnt < this.strms.length) {
            hasNext = this.strms[cnt].hasNext();
            if (!hasNext) {
                cnt++;
            }
        }
        return hasNext ? cnt : -1;
    }
    lookAhead(cnt = 1) {
        //lets clone
        const strms = this.strms.slice(this.selectedPos);
        if (!strms.length) {
            return ITERATION_STATUS.EO_STRM;
        }
        const all_strms = [...strms];
        while (all_strms.length) {
            let next_strm = all_strms.shift();
            let lookAhead = next_strm.lookAhead(cnt);
            if (lookAhead != ITERATION_STATUS.EO_STRM) {
                return lookAhead;
            }
            cnt = cnt - calculateSkips(next_strm);
        }
        return ITERATION_STATUS.EO_STRM;
    }
    next() {
        if (this.activeStrm.hasNext()) {
            return this.activeStrm.next();
        }
        this.selectedPos = this.findNextStrm();
        if (this.selectedPos == -1) {
            return ITERATION_STATUS.EO_STRM;
        }
        this.activeStrm = this.strms[this.selectedPos];
        return this.activeStrm.next();
    }
    reset() {
        this.activeStrm = this.strms[0];
        this.selectedPos = 0;
        for (let cnt = 0; cnt < this.strms.length; cnt++) {
            this.strms[cnt].reset();
        }
    }
}
/**
 * defines a sequence of numbers for our stream input
 */
class SequenceDataSource {
    constructor(start, total) {
        this.total = total;
        this.start = start;
        this.value = start - 1;
    }
    hasNext() {
        return this.value < (this.total - 1);
    }
    next() {
        this.value++;
        return this.value <= (this.total - 1) ? this.value : ITERATION_STATUS.EO_STRM;
    }
    lookAhead(cnt = 1) {
        if ((this.value + cnt) > this.total - 1) {
            return ITERATION_STATUS.EO_STRM;
        }
        else {
            return this.value + cnt;
        }
    }
    reset() {
        this.value = this.start - 1;
    }
    current() {
        //first condition current without initial call for next
        return (this.start - 1) ? ITERATION_STATUS.BEF_STRM : this.value;
    }
}
/**
 * implementation of a datasource on top of a standard array
 */
class ArrayStreamDataSource {
    constructor(...value) {
        this.dataPos = -1;
        this.value = value;
    }
    lookAhead(cnt = 1) {
        if ((this.dataPos + cnt) > this.value.length - 1) {
            return ITERATION_STATUS.EO_STRM;
        }
        return this.value[this.dataPos + cnt];
    }
    hasNext() {
        return this.value.length - 1 > this.dataPos;
    }
    next() {
        var _a;
        this.dataPos++;
        return (_a = this === null || this === void 0 ? void 0 : this.value[this.dataPos]) !== null && _a !== void 0 ? _a : ITERATION_STATUS.EO_STRM;
    }
    reset() {
        this.dataPos = -1;
    }
    current() {
        return this.value[Math.max(0, this.dataPos)];
    }
}
/**
 * an intermediate data source which prefilters
 * incoming stream data
 * and lets only the data out which
 * passes the filter function check
 */
class FilteredStreamDatasource {
    constructor(filterFunc, parent) {
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
    hasNext() {
        let steps = 1;
        let found = false;
        let next;
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
    }
    /**
     * serve the next element
     */
    next() {
        var _a, _b;
        let found = ITERATION_STATUS.EO_STRM;
        while (this.inputDataSource.hasNext()) {
            this._unfilteredPos++;
            let next = this.inputDataSource.next();
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
    }
    /**
     * looks ahead cnt without changing the internal data "pointers" of the data source
     * (this is mostly needed by LazyStreams, because they do not know by definition their
     * boundaries)
     *
     * @param cnt the elements to look ahead
     * @return either the element or ITERATION_STATUS.EO_STRM if we hit the end of the stream before
     * finding the "cnt" element
     */
    lookAhead(cnt = 1) {
        var _a;
        let lookupVal = ITERATION_STATUS.EO_STRM;
        for (let loop = 1; cnt > 0 && (lookupVal = this.inputDataSource.lookAhead(loop)) != ITERATION_STATUS.EO_STRM; loop++) {
            let inCache = (_a = this._filterIdx) === null || _a === void 0 ? void 0 : _a[this._unfilteredPos + loop];
            if (inCache || this.filterFunc(lookupVal)) {
                cnt--;
                this._filterIdx[this._unfilteredPos + loop] = true;
            }
        }
        return lookupVal;
    }
    current() {
        return this._current;
    }
    reset() {
        this._current = ITERATION_STATUS.BEF_STRM;
        this._filterIdx = {};
        this._unfilteredPos = 0;
        this.inputDataSource.reset();
    }
}
/**
 * an intermediate datasource which maps the items from
 * one into another
 */
class MappedStreamDataSource {
    constructor(mapFunc, parent) {
        this.mapFunc = mapFunc;
        this.inputDataSource = parent;
    }
    hasNext() {
        return this.inputDataSource.hasNext();
    }
    next() {
        return this.mapFunc(this.inputDataSource.next());
    }
    reset() {
        this.inputDataSource.reset();
    }
    current() {
        return this.mapFunc(this.inputDataSource.current());
    }
    lookAhead(cnt = 1) {
        const lookAheadVal = this.inputDataSource.lookAhead(cnt);
        return (lookAheadVal == ITERATION_STATUS.EO_STRM) ? lookAheadVal : this.mapFunc(lookAheadVal);
    }
}
/**
 * For the time being we only need one collector
 * a collector which collects a stream back into arrays
 */
class ShimArrayCollector {
    constructor() {
        this.data = new _Es2019Array__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...[]);
    }
    collect(element) {
        this.data.push(element);
    }
    get finalValue() {
        return this.data;
    }
}
/**
 * collects the values as inverse array
 */
class InverseArrayCollector {
    constructor() {
        this.data = [];
    }
    collect(element) {
        this.data.unshift(element);
    }
    get finalValue() {
        return this.data;
    }
}
/**
 * collects an tuple array stream into an assoc array with elements being collected into arrays
 *
 */
class ArrayAssocArrayCollector {
    constructor() {
        this.finalValue = {};
    }
    collect(element) {
        var _a, _b, _c, _d;
        let key = (_a = element === null || element === void 0 ? void 0 : element[0]) !== null && _a !== void 0 ? _a : element;
        this.finalValue[key] = (_c = (_b = this.finalValue) === null || _b === void 0 ? void 0 : _b[key]) !== null && _c !== void 0 ? _c : [];
        this.finalValue[key].push((_d = element === null || element === void 0 ? void 0 : element[1]) !== null && _d !== void 0 ? _d : true);
    }
}
/**
 * dummy collector which just triggers a run
 * on lazy streams without collecting anything
 */
class Run {
    collect(element) {
    }
    get finalValue() {
        return null;
    }
}
/**
 * collects an assoc stream back to an assoc array
 */
class AssocArrayCollector {
    constructor() {
        this.finalValue = {};
    }
    collect(element) {
        var _a, _b;
        this.finalValue[(_a = element[0]) !== null && _a !== void 0 ? _a : element] = (_b = element[1]) !== null && _b !== void 0 ? _b : true;
    }
}
/**
 * A Config collector similar to the FormDFata Collector
 */
class ConfigCollector {
    constructor() {
        this.finalValue = new _Config__WEBPACK_IMPORTED_MODULE_1__.Config({});
    }
    collect(element) {
        this.finalValue.append(element.key).value = element.value;
    }
}
/**
 * Form data collector for key value pair streams
 */
class FormDataCollector {
    constructor() {
        this.finalValue = new FormData();
    }
    collect(element) {
        this.finalValue.append(element.key, element.value);
    }
}
/**
 * Form data collector for DomQuery streams
 */
class QueryFormDataCollector {
    constructor() {
        this.finalValue = new FormData();
    }
    collect(element) {
        let toMerge = element.encodeFormElement();
        if (toMerge.isPresent()) {
            this.finalValue.append(element.name.value, toMerge.get(element.name).value);
        }
    }
}
/**
 * Encoded String collector from dom query streams
 */
class QueryFormStringCollector {
    constructor() {
        this.formData = [];
    }
    collect(element) {
        let toMerge = element.encodeFormElement();
        if (toMerge.isPresent()) {
            this.formData.push([element.name.value, toMerge.get(element.name).value]);
        }
    }
    get finalValue() {
        return new _Es2019Array__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...this.formData)
            .map((keyVal) => keyVal.join("="))
            .reduce((item1, item2) => [item1, item2].join("&"));
    }
}
/**
 * For the time being we only need one collector
 * a collector which collects a stream back into arrays
 */
class ArrayCollector {
    constructor() {
        this.data = [];
    }
    collect(element) {
        this.data.push(element);
    }
    get finalValue() {
        return this.data;
    }
}


/***/ },

/***/ "./node_modules/mona-dish/src/main/typescript/Stream.ts"
/*!**************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/Stream.ts ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FlatMapStreamDataSource: () => (/* binding */ FlatMapStreamDataSource),
/* harmony export */   LazyStream: () => (/* binding */ LazyStream),
/* harmony export */   Stream: () => (/* binding */ Stream)
/* harmony export */ });
/* harmony import */ var _Monad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Monad */ "./node_modules/mona-dish/src/main/typescript/Monad.ts");
/* harmony import */ var _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SourcesCollectors */ "./node_modules/mona-dish/src/main/typescript/SourcesCollectors.ts");
/* harmony import */ var _DomQuery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DomQuery */ "./node_modules/mona-dish/src/main/typescript/DomQuery.ts");
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
/*
 * A small stream implementation
 */



/**
 * Same for flatmap to deal with element -> stream mappings
 */
class FlatMapStreamDataSource {
    constructor(func, parent) {
        /**
         * the currently active stream
         * coming from an incoming element
         * once the end of this one is reached
         * it is swapped out by another one
         * from the next element
         */
        this.activeDataSource = null;
        this.walkedDataSources = [];
        this._currPos = 0;
        this.mapFunc = func;
        this.inputDataSource = parent;
    }
    hasNext() {
        return this.resolveActiveHasNext() || this.resolveNextHasNext();
    }
    resolveActiveHasNext() {
        let next = false;
        if (this.activeDataSource) {
            next = this.activeDataSource.hasNext();
        }
        return next;
    }
    lookAhead(cnt = 1) {
        var _a;
        let lookAhead = (_a = this === null || this === void 0 ? void 0 : this.activeDataSource) === null || _a === void 0 ? void 0 : _a.lookAhead(cnt);
        if ((this === null || this === void 0 ? void 0 : this.activeDataSource) && lookAhead != _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ITERATION_STATUS.EO_STRM) {
            //this should cover 95% of all cases
            return lookAhead;
        }
        if (this.activeDataSource) {
            cnt -= (0,_SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.calculateSkips)(this.activeDataSource);
        }
        //the idea is basically to look into the streams sub-sequentially for a match
        //after each stream we have to take into consideration that the skipCnt is
        //reduced by the number of datasets we already have looked into in the previous stream/datasource
        //unfortunately for now we have to loop into them, so we introduce a small o2 here
        for (let dsLoop = 1; true; dsLoop++) {
            let datasourceData = this.inputDataSource.lookAhead(dsLoop);
            //we have looped out
            //no embedded data anymore? we are done, data
            //can either be a scalar an array or another datasource
            if (datasourceData === _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ITERATION_STATUS.EO_STRM) {
                return _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ITERATION_STATUS.EO_STRM;
            }
            let mappedData = this.mapFunc(datasourceData);
            //it either comes in as datasource or as array
            //both cases must be unified into a datasource
            let currentDataSource = this.toDatasource(mappedData);
            //we now run again  a lookahead
            let ret = currentDataSource.lookAhead(cnt);
            //if the value is found then we are set
            if (ret != _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ITERATION_STATUS.EO_STRM) {
                return ret;
            }
            //reduce the next lookahead by the number of elements
            //we are now skipping in the current data source
            cnt -= (0,_SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.calculateSkips)(currentDataSource);
        }
    }
    toDatasource(mapped) {
        let ds = Array.isArray(mapped) ? new _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ArrayStreamDataSource(...mapped) : mapped;
        this.walkedDataSources.push(ds);
        return ds;
    }
    resolveNextHasNext() {
        let next = false;
        while (!next && this.inputDataSource.hasNext()) {
            let mapped = this.mapFunc(this.inputDataSource.next());
            this.activeDataSource = this.toDatasource(mapped);
            next = this.activeDataSource.hasNext();
        }
        return next;
    }
    next() {
        if (this.hasNext()) {
            this._currPos++;
            return this.activeDataSource.next();
        }
        return undefined;
    }
    reset() {
        this.inputDataSource.reset();
        this.walkedDataSources.forEach(ds => ds.reset());
        this.walkedDataSources = [];
        this._currPos = 0;
        this.activeDataSource = null;
    }
    current() {
        if (!this.activeDataSource) {
            this.hasNext();
        }
        return this.activeDataSource.current();
    }
}
/**
 * A simple typescript based reimplementation of streams
 *
 * This is the early eval version
 * for a lazy eval version check, LazyStream, which is api compatible
 * to this implementation, however with the benefit of being able
 * to provide infinite data sources and generic data providers, the downside
 * is, it might be a tad slower in some situations
 */
class Stream {
    constructor(...value) {
        this._limits = -1;
        this.pos = -1;
        this.value = value;
    }
    static of(...data) {
        return new Stream(...data);
    }
    static ofAssoc(data) {
        return this.of(...Object.keys(data)).map(key => [key, data[key]]);
    }
    static ofDataSource(dataSource) {
        let value = [];
        while (dataSource.hasNext()) {
            value.push(dataSource.next());
        }
        return new Stream(...value);
    }
    static ofDomQuery(value) {
        return Stream.of(...value.asArray);
    }
    static ofConfig(value) {
        return Stream.of(...Object.keys(value.value)).map(key => [key, value.value[key]]);
    }
    current() {
        if (this.pos == -1) {
            return _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ITERATION_STATUS.BEF_STRM;
        }
        if (this.pos >= this.value.length) {
            return _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ITERATION_STATUS.EO_STRM;
        }
        return this.value[this.pos];
    }
    limits(end) {
        this._limits = end;
        return this;
    }
    /**
     * concat for streams, so that you can concat two streams together
     * @param toAppend
     */
    concat(...toAppend) {
        let toConcat = [this].concat(toAppend);
        return Stream.of(...toConcat).flatMap(item => item);
    }
    onElem(fn) {
        for (let cnt = 0; cnt < this.value.length && (this._limits == -1 || cnt < this._limits); cnt++) {
            if (fn(this.value[cnt], cnt) === false) {
                break;
            }
        }
        return this;
    }
    each(fn) {
        this.onElem(fn);
        this.reset();
    }
    map(fn) {
        if (!fn) {
            fn = (inval) => inval;
        }
        let res = [];
        this.each((item) => {
            res.push(fn(item));
        });
        return new Stream(...res);
    }
    /*
     * we need to implement it to fulfill the contract, although it is used only internally
     * all values are flattened when accessed anyway, so there is no need to call this method
     */
    flatMap(fn) {
        let ret = [];
        this.each(item => {
            let strmR = fn(item);
            ret = Array.isArray(strmR) ? ret.concat(strmR) : ret.concat(strmR.value);
        });
        return Stream.of(...ret);
    }
    filter(fn) {
        let res = [];
        this.each((data) => {
            if (fn(data)) {
                res.push(data);
            }
        });
        return new Stream(...res);
    }
    reduce(fn, startVal = null) {
        let offset = startVal != null ? 0 : 1;
        let val1 = startVal != null ? startVal : this.value.length ? this.value[0] : null;
        for (let cnt = offset; cnt < this.value.length && (this._limits == -1 || cnt < this._limits); cnt++) {
            val1 = fn(val1, this.value[cnt]);
        }
        this.reset();
        return _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(val1);
    }
    first() {
        this.reset();
        return this.value && this.value.length ? _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(this.value[0]) : _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.absent;
    }
    last() {
        //could be done via reduce, but is faster this way
        let length = this._limits > 0 ? Math.min(this._limits, this.value.length) : this.value.length;
        this.reset();
        return _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(length ? this.value[length - 1] : null);
    }
    anyMatch(fn) {
        for (let cnt = 0; cnt < this.value.length && (this._limits == -1 || cnt < this._limits); cnt++) {
            if (fn(this.value[cnt])) {
                return true;
            }
        }
        this.reset();
        return false;
    }
    allMatch(fn) {
        if (!this.value.length) {
            return false;
        }
        let matches = 0;
        for (let cnt = 0; cnt < this.value.length; cnt++) {
            if (fn(this.value[cnt])) {
                matches++;
            }
        }
        this.reset();
        return matches == this.value.length;
    }
    noneMatch(fn) {
        let matches = 0;
        for (let cnt = 0; cnt < this.value.length; cnt++) {
            if (!fn(this.value[cnt])) {
                matches++;
            }
        }
        this.reset();
        return matches == this.value.length;
    }
    sort(comparator) {
        let newArr = this.value.slice().sort(comparator);
        return Stream.of(...newArr);
    }
    collect(collector) {
        this.each(data => collector.collect(data));
        this.reset();
        return collector.finalValue;
    }
    //-- internally exposed methods needed for the interconnectivity
    hasNext() {
        let isLimitsReached = this._limits != -1 && this.pos >= this._limits - 1;
        let isEndOfArray = this.pos >= this.value.length - 1;
        return !(isLimitsReached || isEndOfArray);
    }
    next() {
        if (!this.hasNext()) {
            return null;
        }
        this.pos++;
        return this.value[this.pos];
    }
    lookAhead(cnt = 1) {
        if ((this.pos + cnt) >= this.value.length) {
            return _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ITERATION_STATUS.EO_STRM;
        }
        return this.value[this.pos + cnt];
    }
    [Symbol.iterator]() {
        return {
            next: () => {
                let done = !this.hasNext();
                let val = this.next();
                return {
                    done: done,
                    value: val
                };
            }
        };
    }
    /*get observable(): Observable<T> {
        return from(this);
    }*/
    reset() {
        this.pos = -1;
    }
}
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
class LazyStream {
    static of(...values) {
        return new LazyStream(new _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ArrayStreamDataSource(...values));
    }
    static ofAssoc(data) {
        return this.of(...Object.keys(data)).map(key => [key, data[key]]);
    }
    static ofStreamDataSource(value) {
        return new LazyStream(value);
    }
    static ofDomQuery(value) {
        return LazyStream.of(...value.asArray);
    }
    static ofConfig(value) {
        return LazyStream.of(...Object.keys(value.value)).map(key => [key, value.value[key]]);
    }
    constructor(parent) {
        this._limits = -1;
        /*
         * needed to have the limits check working
         * we need to keep track of the current position
         * in the stream
         */
        this.pos = -1;
        this.dataSource = parent;
    }
    hasNext() {
        if (this.isOverLimits()) {
            return false;
        }
        return this.dataSource.hasNext();
    }
    next() {
        let next = this.dataSource.next();
        // @ts-ignore
        this.pos++;
        return next;
    }
    lookAhead(cnt = 1) {
        return this.dataSource.lookAhead(cnt);
    }
    current() {
        return this.dataSource.current();
    }
    reset() {
        this.dataSource.reset();
        this.pos = -1;
        this._limits = -1;
    }
    /**
     * concat for streams, so that you can concat two streams together
     * @param toAppend
     */
    concat(...toAppend) {
        //this.dataSource =  new MultiStreamDatasource<T>(this, ... toAppend);
        //return this;
        return LazyStream.ofStreamDataSource(new _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.MultiStreamDatasource(this, toAppend));
        //return LazyStream.of(<IStream<T>>this, ...toAppend).flatMap(item => item);
    }
    nextFilter(fn) {
        if (this.hasNext()) {
            let newVal = this.next();
            if (!fn(newVal)) {
                return this.nextFilter(fn);
            }
            return newVal;
        }
        return null;
    }
    limits(max) {
        this._limits = max;
        return this;
    }
    //main stream methods
    collect(collector) {
        while (this.hasNext()) {
            let t = this.next();
            collector.collect(t);
        }
        this.reset();
        return collector.finalValue;
    }
    onElem(fn) {
        return new LazyStream(new _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.MappedStreamDataSource((el) => {
            if (fn(el, this.pos) === false) {
                this.stop();
            }
            return el;
        }, this));
    }
    filter(fn) {
        return new LazyStream(new _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.FilteredStreamDatasource(fn, this));
    }
    map(fn) {
        return new LazyStream(new _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.MappedStreamDataSource(fn, this));
    }
    flatMap(fn) {
        return new LazyStream(new FlatMapStreamDataSource(fn, this));
    }
    //endpoint
    each(fn) {
        while (this.hasNext()) {
            if (fn(this.next()) === false) {
                this.stop();
            }
        }
        this.reset();
    }
    reduce(fn, startVal = null) {
        if (!this.hasNext()) {
            return _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.absent;
        }
        let value1;
        let value2 = _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ITERATION_STATUS.EO_STRM;
        if (startVal != null) {
            value1 = startVal;
            value2 = this.next();
        }
        else {
            value1 = this.next();
            if (!this.hasNext()) {
                return _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(value1);
            }
            value2 = this.next();
        }
        value1 = fn(value1, value2);
        while (this.hasNext()) {
            value2 = this.next();
            value1 = fn(value1, value2);
        }
        this.reset();
        return _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(value1);
    }
    last() {
        if (!this.hasNext()) {
            return _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.absent;
        }
        return this.reduce((el1, el2) => el2);
    }
    first() {
        this.reset();
        if (!this.hasNext()) {
            return _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.absent;
        }
        return _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(this.next());
    }
    anyMatch(fn) {
        while (this.hasNext()) {
            if (fn(this.next())) {
                return true;
            }
        }
        return false;
    }
    allMatch(fn) {
        while (this.hasNext()) {
            if (!fn(this.next())) {
                return false;
            }
        }
        return true;
    }
    noneMatch(fn) {
        while (this.hasNext()) {
            if (fn(this.next())) {
                return false;
            }
        }
        return true;
    }
    sort(comparator) {
        let arr = this.collect(new _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ArrayCollector());
        arr = arr.sort(comparator);
        return LazyStream.of(...arr);
    }
    get value() {
        return this.collect(new _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ArrayCollector());
    }
    [Symbol.iterator]() {
        return {
            next: () => {
                let done = !this.hasNext();
                let val = this.next();
                return {
                    done: done,
                    value: val
                };
            }
        };
    }
    /*get observable(): Observable<T> {
        return from(this);
    }*/
    stop() {
        this.pos = this._limits + 1000000000;
        this._limits = 0;
    }
    isOverLimits() {
        return this._limits != -1 && this.pos >= this._limits - 1;
    }
}
/**
 * 1.0 backwards compatibility functions
 *
 * this restores the stream and lazy stream
 * property on DomQuery on prototype level
 *
 */
Object.defineProperty(_DomQuery__WEBPACK_IMPORTED_MODULE_2__.DomQuery.prototype, "stream", {
    get: function stream() {
        return Stream.ofDomQuery(this);
    }
});
Object.defineProperty(_DomQuery__WEBPACK_IMPORTED_MODULE_2__.DomQuery.prototype, "lazyStream", {
    get: function lazyStream() {
        return LazyStream.ofDomQuery(this);
    }
});


/***/ },

/***/ "./node_modules/mona-dish/src/main/typescript/TagBuilder.ts"
/*!******************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/TagBuilder.ts ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TagBuilder: () => (/* binding */ TagBuilder)
/* harmony export */ });
/* harmony import */ var _DomQuery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DomQuery */ "./node_modules/mona-dish/src/main/typescript/DomQuery.ts");
/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Global */ "./node_modules/mona-dish/src/main/typescript/Global.ts");
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
//poliyfill from @webcomponents/webcomponentsjs


if ("undefined" != typeof _Global__WEBPACK_IMPORTED_MODULE_1__._global$) {
    (function () {
        if (void 0 === (0,_Global__WEBPACK_IMPORTED_MODULE_1__._global$)().Reflect || void 0 === (0,_Global__WEBPACK_IMPORTED_MODULE_1__._global$)().customElements || ((0,_Global__WEBPACK_IMPORTED_MODULE_1__._global$)().customElements).polyfillWrapFlushCallback)
            return;
        const a = HTMLElement;
        (0,_Global__WEBPACK_IMPORTED_MODULE_1__._global$)().HTMLElement = {
            HTMLElement: function HTMLElement() {
                return Reflect.construct(a, [], this.constructor);
            }
        }.HTMLElement, HTMLElement.prototype = a.prototype, HTMLElement.prototype.constructor = HTMLElement, Object.setPrototypeOf(HTMLElement, a);
    })();
}
/**
 * beginning custom tag support
 *
 * This api is still experimental
 * and might be interwoven with DomQuery
 * so it is bound to change
 *
 * it follows a builder pattern to allow easier creations
 * with less code of custom tags
 */
class TagBuilder {
    // noinspection JSUnusedGlobalSymbols
    static withTagName(tagName) {
        return new TagBuilder(tagName);
    }
    // noinspection JSUnusedGlobalSymbols
    constructor(tagName) {
        this.extendsType = HTMLElement;
        this.observedAttrs = [];
        this.tagName = tagName;
    }
    // noinspection JSUnusedGlobalSymbols
    withObservedAttributes(...oAttrs) {
        this.observedAttrs = oAttrs;
    }
    // noinspection JSUnusedGlobalSymbols
    withConnectedCallback(callback) {
        this.connectedCallback = callback;
        return this;
    }
    // noinspection JSUnusedGlobalSymbols
    withDisconnectedCallback(callback) {
        this.disconnectedCallback = callback;
        return this;
    }
    // noinspection JSUnusedGlobalSymbols
    withAdoptedCallback(callback) {
        this.adoptedCallback = callback;
        return this;
    }
    // noinspection JSUnusedGlobalSymbols
    withAttributeChangedCallback(callback) {
        this.attributeChangedCallback = callback;
        return this;
    }
    // noinspection JSUnusedGlobalSymbols
    withExtendsType(extendsType) {
        this.extendsType = extendsType;
        return this;
    }
    // noinspection JSUnusedGlobalSymbols
    withOptions(theOptions) {
        this.theOptions = theOptions;
        return this;
    }
    // noinspection JSUnusedGlobalSymbols
    withClass(clazz) {
        if (this.markup) {
            throw Error("Markup already defined, markup must be set in the class");
        }
        this.clazz = clazz;
        return this;
    }
    // noinspection JSUnusedGlobalSymbols
    withMarkup(markup) {
        if (this.clazz) {
            throw Error("Class already defined, markup must be set in the class");
        }
        this.markup = markup;
        return this;
    }
    // noinspection JSUnusedGlobalSymbols
    register() {
        if (!this.clazz && !this.markup) {
            throw Error("Class or markup must be defined");
        }
        if (this.clazz) {
            let applyCallback = (name) => {
                let outerCallback = this[name];
                let protoCallback = this.clazz.prototype[name];
                let finalCallback = outerCallback || protoCallback;
                if (finalCallback) {
                    this.clazz.prototype[name] = function () {
                        if (outerCallback) {
                            finalCallback.apply(_DomQuery__WEBPACK_IMPORTED_MODULE_0__.DomQuery.byId(this));
                        }
                        else {
                            protoCallback.apply(this);
                        }
                    };
                }
            };
            applyCallback("connectedCallback");
            applyCallback("disconnectedCallback");
            applyCallback("adoptedCallback");
            applyCallback("attributeChangedCallback");
            //TODO how do we handle the oAttrs?
            if (this.observedAttrs.length) {
                Object.defineProperty(this.clazz.prototype, "observedAttributes", {
                    get() {
                        return this.observedAttrs;
                    }
                });
            }
            (0,_Global__WEBPACK_IMPORTED_MODULE_1__._global$)().customElements.define(this.tagName, this.clazz, this.theOptions || null);
        }
        else {
            let _t_ = this;
            let applyCallback = (name, scope) => {
                if (_t_[name]) {
                    _t_[name].apply(_DomQuery__WEBPACK_IMPORTED_MODULE_0__.DomQuery.byId(scope));
                }
            };
            (0,_Global__WEBPACK_IMPORTED_MODULE_1__._global$)().customElements.define(this.tagName, class extends this.extendsType {
                constructor() {
                    super();
                    this.innerHTML = _t_.markup;
                }
                // noinspection JSUnusedGlobalSymbols
                static get observedAttributes() {
                    return _t_.observedAttrs;
                }
                // noinspection JSUnusedGlobalSymbols
                connectedCallback() {
                    applyCallback("connectedCallback", this);
                }
                // noinspection JSUnusedGlobalSymbols
                disconnectedCallback() {
                    applyCallback("disconnectedCallback", this);
                }
                // noinspection JSUnusedGlobalSymbols
                adoptedCallback() {
                    applyCallback("adoptedCallback", this);
                }
                // noinspection JSUnusedGlobalSymbols
                attributeChangedCallback() {
                    applyCallback("attributeChangedCallback", this);
                }
            }, this.theOptions || null);
        }
    }
}


/***/ },

/***/ "./node_modules/mona-dish/src/main/typescript/XmlQuery.ts"
/*!****************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/XmlQuery.ts ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XMLQuery: () => (/* binding */ XMLQuery),
/* harmony export */   XQ: () => (/* binding */ XQ)
/* harmony export */ });
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lang */ "./node_modules/mona-dish/src/main/typescript/Lang.ts");
/* harmony import */ var _DomQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DomQuery */ "./node_modules/mona-dish/src/main/typescript/DomQuery.ts");
/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Global */ "./node_modules/mona-dish/src/main/typescript/Global.ts");
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


const isString = _Lang__WEBPACK_IMPORTED_MODULE_0__.Lang.isString;

/**
 * xml query as specialized case for DomQuery
 */
class XMLQuery extends _DomQuery__WEBPACK_IMPORTED_MODULE_1__.DomQuery {
    constructor(rootNode, docType = "text/xml") {
        let createIe11DomQueryShim = () => {
            //at the time if wroting ie11 is the only relevant browser
            //left withut any DomQuery support
            let parser = new ActiveXObject("Microsoft.XMLDOM");
            parser.async = false;
            //we shim th dom parser from ie in
            return {
                parseFromString: (text, contentType) => {
                    return parser.loadXML(text);
                }
            };
        };
        let parseXML = (xml) => {
            if (xml == null) {
                return null;
            }
            let domParser = _Lang__WEBPACK_IMPORTED_MODULE_0__.Lang.saveResolveLazy(() => new ((0,_Global__WEBPACK_IMPORTED_MODULE_2__._global$)()).DOMParser(), () => createIe11DomQueryShim()).value;
            return domParser.parseFromString(xml, docType);
        };
        if (isString(rootNode)) {
            super(parseXML(rootNode));
        }
        else {
            super(rootNode);
        }
    }
    isXMLParserError() {
        return this.querySelectorAll("parsererror").isPresent();
    }
    toString() {
        let ret = [];
        this.eachElem((node) => {
            var _a, _b, _c, _d;
            let serialized = (_d = (_c = (_b = (_a = ((0,_Global__WEBPACK_IMPORTED_MODULE_2__._global$)())) === null || _a === void 0 ? void 0 : _a.XMLSerializer) === null || _b === void 0 ? void 0 : _b.constructor()) === null || _c === void 0 ? void 0 : _c.serializeToString(node)) !== null && _d !== void 0 ? _d : node === null || node === void 0 ? void 0 : node.xml;
            if (!!serialized) {
                ret.push(serialized);
            }
        });
        return ret.join("");
    }
    parserErrorText(joinstr) {
        return this.querySelectorAll("parsererror").textContent(joinstr);
    }
    static parseXML(txt) {
        return new XMLQuery(txt);
    }
    static parseHTML(txt) {
        return new XMLQuery(txt, "text/html");
    }
    static fromString(txt, parseType = "text/xml") {
        return new XMLQuery(txt, parseType);
    }
}
const XQ = XMLQuery;


/***/ },

/***/ "./node_modules/mona-dish/src/main/typescript/index_core.ts"
/*!******************************************************************!*\
  !*** ./node_modules/mona-dish/src/main/typescript/index_core.ts ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArrayCollector: () => (/* reexport safe */ _SourcesCollectors__WEBPACK_IMPORTED_MODULE_6__.ArrayCollector),
/* harmony export */   ArrayStreamDataSource: () => (/* reexport safe */ _SourcesCollectors__WEBPACK_IMPORTED_MODULE_6__.ArrayStreamDataSource),
/* harmony export */   Assoc: () => (/* reexport module object */ _AssocArray__WEBPACK_IMPORTED_MODULE_7__),
/* harmony export */   AssocArrayCollector: () => (/* reexport safe */ _SourcesCollectors__WEBPACK_IMPORTED_MODULE_6__.AssocArrayCollector),
/* harmony export */   CONFIG_ANY: () => (/* reexport safe */ _Config__WEBPACK_IMPORTED_MODULE_8__.CONFIG_ANY),
/* harmony export */   CONFIG_VALUE: () => (/* reexport safe */ _Config__WEBPACK_IMPORTED_MODULE_8__.CONFIG_VALUE),
/* harmony export */   CancellablePromise: () => (/* reexport safe */ _Promise__WEBPACK_IMPORTED_MODULE_3__.CancellablePromise),
/* harmony export */   Config: () => (/* reexport safe */ _Config__WEBPACK_IMPORTED_MODULE_8__.Config),
/* harmony export */   ConfigCollector: () => (/* reexport safe */ _SourcesCollectors__WEBPACK_IMPORTED_MODULE_6__.ConfigCollector),
/* harmony export */   DQ: () => (/* reexport safe */ _DomQuery__WEBPACK_IMPORTED_MODULE_0__.DQ),
/* harmony export */   DQ$: () => (/* reexport safe */ _DomQuery__WEBPACK_IMPORTED_MODULE_0__.DQ$),
/* harmony export */   DomQuery: () => (/* reexport safe */ _DomQuery__WEBPACK_IMPORTED_MODULE_0__.DomQuery),
/* harmony export */   DomQueryCollector: () => (/* reexport safe */ _DomQuery__WEBPACK_IMPORTED_MODULE_0__.DomQueryCollector),
/* harmony export */   ElementAttribute: () => (/* reexport safe */ _DomQuery__WEBPACK_IMPORTED_MODULE_0__.ElementAttribute),
/* harmony export */   Es2019Array: () => (/* reexport safe */ _Es2019Array__WEBPACK_IMPORTED_MODULE_9__.Es2019Array),
/* harmony export */   FilteredStreamDatasource: () => (/* reexport safe */ _SourcesCollectors__WEBPACK_IMPORTED_MODULE_6__.FilteredStreamDatasource),
/* harmony export */   FlatMapStreamDataSource: () => (/* reexport safe */ _Stream__WEBPACK_IMPORTED_MODULE_5__.FlatMapStreamDataSource),
/* harmony export */   FormDataCollector: () => (/* reexport safe */ _SourcesCollectors__WEBPACK_IMPORTED_MODULE_6__.FormDataCollector),
/* harmony export */   Lang: () => (/* reexport safe */ _Lang__WEBPACK_IMPORTED_MODULE_1__.Lang),
/* harmony export */   LazyStream: () => (/* reexport safe */ _Stream__WEBPACK_IMPORTED_MODULE_5__.LazyStream),
/* harmony export */   MappedStreamDataSource: () => (/* reexport safe */ _SourcesCollectors__WEBPACK_IMPORTED_MODULE_6__.MappedStreamDataSource),
/* harmony export */   Monad: () => (/* reexport safe */ _Monad__WEBPACK_IMPORTED_MODULE_2__.Monad),
/* harmony export */   MultiStreamDatasource: () => (/* reexport safe */ _SourcesCollectors__WEBPACK_IMPORTED_MODULE_6__.MultiStreamDatasource),
/* harmony export */   Optional: () => (/* reexport safe */ _Monad__WEBPACK_IMPORTED_MODULE_2__.Optional),
/* harmony export */   PromiseStatus: () => (/* reexport safe */ _Promise__WEBPACK_IMPORTED_MODULE_3__.PromiseStatus),
/* harmony export */   QueryFormDataCollector: () => (/* reexport safe */ _SourcesCollectors__WEBPACK_IMPORTED_MODULE_6__.QueryFormDataCollector),
/* harmony export */   QueryFormStringCollector: () => (/* reexport safe */ _SourcesCollectors__WEBPACK_IMPORTED_MODULE_6__.QueryFormStringCollector),
/* harmony export */   SequenceDataSource: () => (/* reexport safe */ _SourcesCollectors__WEBPACK_IMPORTED_MODULE_6__.SequenceDataSource),
/* harmony export */   Stream: () => (/* reexport safe */ _Stream__WEBPACK_IMPORTED_MODULE_5__.Stream),
/* harmony export */   TagBuilder: () => (/* reexport safe */ _TagBuilder__WEBPACK_IMPORTED_MODULE_10__.TagBuilder),
/* harmony export */   ValueEmbedder: () => (/* reexport safe */ _Monad__WEBPACK_IMPORTED_MODULE_2__.ValueEmbedder),
/* harmony export */   XMLQuery: () => (/* reexport safe */ _XmlQuery__WEBPACK_IMPORTED_MODULE_4__.XMLQuery),
/* harmony export */   XQ: () => (/* reexport safe */ _XmlQuery__WEBPACK_IMPORTED_MODULE_4__.XQ),
/* harmony export */   _Es2019Array: () => (/* reexport safe */ _Es2019Array__WEBPACK_IMPORTED_MODULE_9__._Es2019Array),
/* harmony export */   append: () => (/* reexport safe */ _AssocArray__WEBPACK_IMPORTED_MODULE_7__.append),
/* harmony export */   assign: () => (/* reexport safe */ _AssocArray__WEBPACK_IMPORTED_MODULE_7__.assign),
/* harmony export */   assignIf: () => (/* reexport safe */ _AssocArray__WEBPACK_IMPORTED_MODULE_7__.assignIf),
/* harmony export */   shallowMerge: () => (/* reexport safe */ _AssocArray__WEBPACK_IMPORTED_MODULE_7__.shallowMerge),
/* harmony export */   simpleShallowMerge: () => (/* reexport safe */ _AssocArray__WEBPACK_IMPORTED_MODULE_7__.simpleShallowMerge)
/* harmony export */ });
/* harmony import */ var _DomQuery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DomQuery */ "./node_modules/mona-dish/src/main/typescript/DomQuery.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Lang */ "./node_modules/mona-dish/src/main/typescript/Lang.ts");
/* harmony import */ var _Monad__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Monad */ "./node_modules/mona-dish/src/main/typescript/Monad.ts");
/* harmony import */ var _Promise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Promise */ "./node_modules/mona-dish/src/main/typescript/Promise.ts");
/* harmony import */ var _XmlQuery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./XmlQuery */ "./node_modules/mona-dish/src/main/typescript/XmlQuery.ts");
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Stream */ "./node_modules/mona-dish/src/main/typescript/Stream.ts");
/* harmony import */ var _SourcesCollectors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SourcesCollectors */ "./node_modules/mona-dish/src/main/typescript/SourcesCollectors.ts");
/* harmony import */ var _AssocArray__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AssocArray */ "./node_modules/mona-dish/src/main/typescript/AssocArray.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Config */ "./node_modules/mona-dish/src/main/typescript/Config.ts");
/* harmony import */ var _Es2019Array__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Es2019Array */ "./node_modules/mona-dish/src/main/typescript/Es2019Array.ts");
/* harmony import */ var _TagBuilder__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./TagBuilder */ "./node_modules/mona-dish/src/main/typescript/TagBuilder.ts");
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
















/***/ },

/***/ "./src/main/typescript/api/_api.ts"
/*!*****************************************!*\
  !*** ./src/main/typescript/api/_api.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   faces: () => (/* binding */ faces),
/* harmony export */   myfaces: () => (/* binding */ myfaces)
/* harmony export */ });
/* harmony import */ var _impl_AjaxImpl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../impl/AjaxImpl */ "./src/main/typescript/impl/AjaxImpl.ts");
/* harmony import */ var _impl_PushImpl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../impl/PushImpl */ "./src/main/typescript/impl/PushImpl.ts");
/* harmony import */ var _myfaces_OamSubmit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../myfaces/OamSubmit */ "./src/main/typescript/myfaces/OamSubmit.ts");
/* harmony import */ var _impl_core_Const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../impl/core/Const */ "./src/main/typescript/impl/core/Const.ts");
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
     */
    faces.specversion = 400000;
    /**
     * Implementation version as specified within the jsf specification.
     * <p />
     * A number increased with every implementation version
     * and reset by moving to a new spec release number
     *
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
        return _impl_AjaxImpl__WEBPACK_IMPORTED_MODULE_0__.Implementation.getProjectStage();
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
        return _impl_AjaxImpl__WEBPACK_IMPORTED_MODULE_0__.Implementation.getViewState(formElement);
    }
    faces.getViewState = getViewState;
    /**
     * returns the window identifier for the given node / window
     * @return the window identifier or null if none is found
     * @param rootNode
     */
    function getClientWindow(rootNode) {
        return _impl_AjaxImpl__WEBPACK_IMPORTED_MODULE_0__.Implementation.getClientWindow(rootNode);
    }
    faces.getClientWindow = getClientWindow;
    // private helper functions
    function getSeparatorChar() {
        const sep = '#{facesContext.namingContainerSeparatorChar}';
        //We now enable standalone mode, the separator char was not mapped we make a fallback to 2.3 behavior
        //the idea is that the separator char is provided from the underlying container, but if not then we
        //will perform a fallback (aka 2.3 has the url fallback behavior)
        return (sep.match(/\#\{facesContext.namingContainerSeparatorChar\}/gi)) ? _impl_AjaxImpl__WEBPACK_IMPORTED_MODULE_0__.Implementation.getSeparatorChar() : sep;
    }
    let ajax;
    (function (ajax) {
        "use strict";
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
         * @param {String|Node} element: any dom element no matter being it html or jsf, from which the event is emitted
         * @param {EVENT} event: any javascript event supported by that object
         * @param {Map} options : map of options being pushed into the ajax cycle
         */
        function request(element, event, options) {
            _impl_AjaxImpl__WEBPACK_IMPORTED_MODULE_0__.Implementation.request(element, event, options);
        }
        ajax.request = request;
        /**
         * response handler
         * @param request the request object having triggered this response
         * @param context the request context
         *
         */
        function response(request, context) {
            _impl_AjaxImpl__WEBPACK_IMPORTED_MODULE_0__.Implementation.response(request, context);
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
         *     <li> errorData.source  : the issuing source element which triggered the request </li>
         *     <li> eventData.responseCode: the response code (aka http request response code, 401 etc...) </li>
         *     <li> eventData.responseText: the request response text </li>
         *     <li> eventData.responseXML: the request response xml </li>
         * </ul>
         *
         * @param errorFunc error handler must be of the format <i>function errorListener(&lt;errorData&gt;)</i>
         */
        function addOnError(errorFunc) {
            _impl_AjaxImpl__WEBPACK_IMPORTED_MODULE_0__.Implementation.addOnError(errorFunc);
        }
        ajax.addOnError = addOnError;
        /**
         * Adds a global event listener to the ajax event queue. The event listener must be a function
         * of following format: <i>function eventListener(&lt;eventData&gt;)</i>
         *
         * @param eventFunc event must be of the format <i>function eventListener(&lt;eventData&gt;)</i>
         */
        function addOnEvent(eventFunc) {
            _impl_AjaxImpl__WEBPACK_IMPORTED_MODULE_0__.Implementation.addOnEvent(eventFunc);
        }
        ajax.addOnEvent = addOnEvent;
    })(ajax = faces.ajax || (faces.ajax = {}));
    let util;
    (function (util) {
        /**
         * varargs function which executes a chain of code (functions or any other code)
         *
         * if any of the code returns false, the execution
         * is terminated prematurely skipping the rest of the code!
         *
         * @param {HTMLElement | String} source, the callee object
         * @param {Event} event, the event object of the callee event triggering this function
         * @param funcs ... arbitrary array of functions or strings
         * @returns true if the chain has succeeded false otherwise
         */
        function chain(source, event, ...funcs) {
            return _impl_AjaxImpl__WEBPACK_IMPORTED_MODULE_0__.Implementation.chain(source, event, ...funcs);
        }
        util.chain = chain;
    })(util = faces.util || (faces.util = {}));
    let push;
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
            _impl_PushImpl__WEBPACK_IMPORTED_MODULE_1__.PushImpl.init(socketClientId, url, channel, onopen, onmessage, onerror, onclose, behaviors, autoConnect);
        }
        push.init = init;
        /**
         * Open the web socket on the given channel.
         * @param  socketClientId The name of the web socket channel.
         * @throws  Error is thrown, if the channel is unknown.
         */
        function open(socketClientId) {
            _impl_PushImpl__WEBPACK_IMPORTED_MODULE_1__.PushImpl.open(socketClientId);
        }
        push.open = open;
        /**
         * Close the web socket on the given channel.
         * @param  socketClientId The id of the web socket client.
         * @throws  Error is thrown, if the channel is unknown.
         */
        function close(socketClientId) {
            _impl_PushImpl__WEBPACK_IMPORTED_MODULE_1__.PushImpl.close(socketClientId);
        }
        push.close = close;
    })(push = faces.push || (faces.push = {}));
})(faces || (faces = {}));
var myfaces;
(function (myfaces) {
    /**
     * AB function similar to mojarra and Primefaces
     * not part of the spec but a convenience accessor method
     * Code provided by Thomas Andraschko
     *
     * @param source the event source
     * @param event the event
     * @param eventName event name for java.jakarta.faces.behavior.event
     * @param execute execute list as passed down in faces.ajax.request
     * @param render the render list as string
     * @param options the options which need to be merged in
     * @param userParameters a set of user parameters which go into the final options under params, they can override whatever is passed via options
     */
    function ab(source, event, eventName, execute, render, options = {}, userParameters = {}) {
        var _a, _b;
        if (!options) {
            options = {};
        }
        if (!userParameters) {
            userParameters = {};
        }
        if (eventName) {
            options[_impl_core_Const__WEBPACK_IMPORTED_MODULE_3__.CTX_OPTIONS_PARAMS] = (_a = options === null || options === void 0 ? void 0 : options[_impl_core_Const__WEBPACK_IMPORTED_MODULE_3__.CTX_OPTIONS_PARAMS]) !== null && _a !== void 0 ? _a : {};
            options[_impl_core_Const__WEBPACK_IMPORTED_MODULE_3__.CTX_OPTIONS_PARAMS][(0,_impl_core_Const__WEBPACK_IMPORTED_MODULE_3__.$nsp)(_impl_core_Const__WEBPACK_IMPORTED_MODULE_3__.P_BEHAVIOR_EVENT)] = eventName;
        }
        if (execute) {
            options[_impl_core_Const__WEBPACK_IMPORTED_MODULE_3__.CTX_OPTIONS_EXECUTE] = execute;
        }
        if (render) {
            options[_impl_core_Const__WEBPACK_IMPORTED_MODULE_3__.CTX_PARAM_RENDER] = render;
        }
        //we push the users parameters in
        if (!options["params"]) {
            options["params"] = {};
        }
        for (let key in userParameters) {
            options["params"][key] = userParameters[key];
        }
        ((_b = window === null || window === void 0 ? void 0 : window.faces) !== null && _b !== void 0 ? _b : window.jsf).ajax.request(source, event, options);
    }
    myfaces.ab = ab;
    const onReadyChain = [];
    let readyStateListener = null;
    // noinspection JSUnusedGlobalSymbols
    /**
     * Helper function in the myfaces namespace to handle document ready properly for the load case
     * the ajax case, does not need proper treatment, since it is deferred anyway.
     * Used by command script as helper function!
     *
     * @param executionFunc the function to be executed upon ready
     */
    function onDomReady(executionFunc) {
        if (document.readyState !== "complete") {
            onReadyChain.push(executionFunc);
            if (!readyStateListener) {
                readyStateListener = () => {
                    window.removeEventListener("DOMContentLoaded", readyStateListener);
                    readyStateListener = null;
                    try {
                        onReadyChain.forEach(func => func());
                    }
                    finally {
                        //done we clear now the ready chain
                        onReadyChain.length = 0;
                    }
                };
                window.addEventListener("DOMContentLoaded", readyStateListener);
            }
        }
        else {
            if (readyStateListener) {
                readyStateListener();
            }
            executionFunc();
        }
    }
    myfaces.onDomReady = onDomReady;
    /**
     * reserve a namespace for the given string
     * @param namespace the namespace to reserve with '.' as separator
     */
    function reserveNamespace(namespace) {
        let current = window;
        const namespaces = namespace.split(".");
        for (const part of namespaces) {
            current[part] = current[part] || {};
            current = current[part];
        }
    }
    myfaces.reserveNamespace = reserveNamespace;
    /**
     * legacy oam functions
     */
    myfaces.oam = _myfaces_OamSubmit__WEBPACK_IMPORTED_MODULE_2__.oam;
})(myfaces || (myfaces = {}));


/***/ },

/***/ "./src/main/typescript/impl/AjaxImpl.ts"
/*!**********************************************!*\
  !*** ./src/main/typescript/impl/AjaxImpl.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Implementation: () => (/* binding */ Implementation)
/* harmony export */ });
/* harmony import */ var _xhrCore_Response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./xhrCore/Response */ "./src/main/typescript/impl/xhrCore/Response.ts");
/* harmony import */ var _xhrCore_XhrRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xhrCore/XhrRequest */ "./src/main/typescript/impl/xhrCore/XhrRequest.ts");
/* harmony import */ var mona_dish__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
/* harmony import */ var _util_Assertions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/Assertions */ "./src/main/typescript/impl/util/Assertions.ts");
/* harmony import */ var _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/ExtDomQuery */ "./src/main/typescript/impl/util/ExtDomQuery.ts");
/* harmony import */ var _xhrCore_ErrorData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./xhrCore/ErrorData */ "./src/main/typescript/impl/xhrCore/ErrorData.ts");
/* harmony import */ var _util_Lang__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util/Lang */ "./src/main/typescript/impl/util/Lang.ts");
/* harmony import */ var _core_Const__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core/Const */ "./src/main/typescript/impl/core/Const.ts");
/* harmony import */ var _xhrCore_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./xhrCore/RequestDataResolver */ "./src/main/typescript/impl/xhrCore/RequestDataResolver.ts");
/* harmony import */ var _util_FileUtils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./util/FileUtils */ "./src/main/typescript/impl/util/FileUtils.ts");
/* harmony import */ var _util_XhrQueueController__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./util/XhrQueueController */ "./src/main/typescript/impl/util/XhrQueueController.ts");
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
     We use a self written helper library to keep the number of external
     code dependencies down.
     The library is called mona-dish and started as a small sideproject of mine
     it provides following

     a) Monad like structures for querying because this keeps the code denser and adds abstractions
     that always was the strong point of jQuery, and it still is better in this regard than what ecmascript provides

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
    const trim = mona_dish__WEBPACK_IMPORTED_MODULE_2__.Lang.trim;
    const getMessage = _util_Lang__WEBPACK_IMPORTED_MODULE_6__.ExtLang.getMessage;
    const getGlobalConfig = _util_Lang__WEBPACK_IMPORTED_MODULE_6__.ExtLang.getGlobalConfig;
    var assert = _util_Assertions__WEBPACK_IMPORTED_MODULE_3__.Assertions.assert;
    const ofAssoc = _util_Lang__WEBPACK_IMPORTED_MODULE_6__.ExtLang.ofAssoc;
    const collectAssoc = _util_Lang__WEBPACK_IMPORTED_MODULE_6__.ExtLang.collectAssoc;
    let projectStage = null;
    let separator = null;
    let eventQueue = [];
    let errorQueue = [];
    Implementation.requestQueue = null;
    /*error reporting threshold*/
    let threshold = "ERROR";
    /**
     * fetches the separator char from the given script tags
     *
     * @return {string} the separator char for the given script tags
     */
    function getSeparatorChar() {
        var _a, _b;
        return (_b = (_a = resolveGlobalConfig()) === null || _a === void 0 ? void 0 : _a.separator) !== null && _b !== void 0 ? _b : (separator !== null && separator !== void 0 ? separator : (separator = _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_4__.ExtDomQuery.searchJsfJsFor(/separator=([^&;]*)/).orElse(":").value));
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
        var _a, _b;
        return (_b = (_a = resolveGlobalConfig()) === null || _a === void 0 ? void 0 : _a.projectStage) !== null && _b !== void 0 ? _b : (projectStage !== null && projectStage !== void 0 ? projectStage : (projectStage = resolveProjectStateFromURL()));
    }
    Implementation.getProjectStage = getProjectStage;
    /**
     * resolves the project stage as url parameter
     * @return the project stage or null
     */
    function resolveProjectStateFromURL() {
        /* run through all script tags and try to find the one that includes faces.js */
        const foundStage = _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_4__.ExtDomQuery.searchJsfJsFor(/stage=([^&;]*)/).value;
        return (foundStage in ProjectStages) ? foundStage : ProjectStages.Production; // MYFACES-4572: default is production
    }
    Implementation.resolveProjectStateFromURL = resolveProjectStateFromURL;
    /**
     * implementation of the faces.util.chain functionality
     *
     * @param source
     * @param event
     * @param funcs
     */
    function chain(source, event, ...funcs) {
        // we can use our lazy stream each functionality to run our chain here.
        // by passing a boolean as return value into the onElem call
        // we can stop early at the first false, just like the spec requests
        let ret = true;
        funcs.every(func => {
            let returnVal = resolveAndExecute(source, event, func);
            if (returnVal === false) {
                ret = false;
            }
            //we short circuit in case of false and break the every loop
            return ret;
        });
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
     * @param el any dom element no matter being it html or jsf, from which the event is emitted
     * @param event any javascript event supported by that object
     * @param opts  map of options being pushed into the ajax cycle
     *
     * a) transformArguments out of the function
     * b) passThrough handling with a map copy with a filter map block map
     */
    function request(el, event, opts) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
        const { options, elem, elementId, windowId, isResetValues } = (0,_xhrCore_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resolveDefaults)(event, opts, el);
        const requestCtx = new _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_4__.ExtConfig({});
        const internalCtx = new _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_4__.ExtConfig({});
        _util_Assertions__WEBPACK_IMPORTED_MODULE_3__.Assertions.assertRequestIntegrity(options, elem);
        /**
         * fetch the parent form
         *
         * note we also add an override possibility here
         * so that people can use dummy forms and work
         * with detached objects
         */
        const form = (0,_xhrCore_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resolveForm)(elem, event);
        const viewId = (0,_xhrCore_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resolveViewId)(form);
        const formId = form.id.value;
        const delay = (0,_xhrCore_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resolveDelay)(options);
        const timeout = (0,_xhrCore_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resolveTimeout)(options);
        requestCtx.assignIf(!!windowId, _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_WINDOW_ID).value = windowId;
        // old non - spec behavior will be removed after it is clear whether the removal breaks any code
        requestCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR).value = extractLegacyParams(options.value);
        // spec conform behavior, all passthrough params must be under "passthrough
        const params = remapArrayToAssocArr(options.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_OPTIONS_PARAMS).orElse({}).value);
        //we turn off the remapping for the param merge, because we do not want to have
        //any namespacing to be remapped
        let ctxPassthrough = requestCtx.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR);
        ctxPassthrough.$nspEnabled = false;
        ctxPassthrough.shallowMerge(new mona_dish__WEBPACK_IMPORTED_MODULE_2__.Config(params), true);
        //now we turn it on again
        ctxPassthrough.$nspEnabled = true;
        requestCtx.assignIf(!!event, _core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR, _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_EVT).value = event === null || event === void 0 ? void 0 : event.type;
        /**
         * ajax pass through context with the source
         * onresolved Event and onerror Event
         */
        requestCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.SOURCE).value = elementId;
        requestCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.VIEW_ID).value = viewId;
        /**
         * on resolvedEvent and onError...
         * those values will be traversed later on
         * also into the response context
         */
        requestCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.ON_EVENT).value = (_a = options.value) === null || _a === void 0 ? void 0 : _a.onevent;
        requestCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.ON_ERROR).value = (_b = options.value) === null || _b === void 0 ? void 0 : _b.onerror;
        /**
         * Fetch the myfaces config params
         */
        requestCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.MYFACES).value = (_c = options.value) === null || _c === void 0 ? void 0 : _c.myfaces;
        /**
         * binding contract the jakarta.faces.source must be set
         */
        requestCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR, _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_AJAX_SOURCE).value = elementId;
        /**
         * jakarta.faces.partial.ajax must be set to true
         */
        requestCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR, _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_AJAX).value = true;
        /**
         * if resetValues is set to true
         * then we have to set jakarta.faces.resetValues as well
         * as pass through parameter
         * the value has to be explicitly true, according to
         * the specs jsdoc
         */
        requestCtx.assignIf(isResetValues, _core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR, _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_RESET_VALUES).value = true;
        // additional meta information to speed things up, note internal non jsf
        // pass through options are stored under _mfInternal in the context
        internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_SRC_FRM_ID).value = formId;
        /**
         * special myfaces only internal parameter for onProgress until we have an official api
         * that way we can track the progress of a xhr request (useful for file uploads)
         */
        internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_PREINIT).value = (_f = (_e = (_d = options.value) === null || _d === void 0 ? void 0 : _d.myfaces) === null || _e === void 0 ? void 0 : _e.upload) === null || _f === void 0 ? void 0 : _f.preinit;
        internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_LOADSTART).value = (_j = (_h = (_g = options.value) === null || _g === void 0 ? void 0 : _g.myfaces) === null || _h === void 0 ? void 0 : _h.upload) === null || _j === void 0 ? void 0 : _j.loadstart;
        internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_ON_PROGRESS).value = (_m = (_l = (_k = options.value) === null || _k === void 0 ? void 0 : _k.myfaces) === null || _l === void 0 ? void 0 : _l.upload) === null || _m === void 0 ? void 0 : _m.progress;
        internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_LOADEND).value = (_q = (_p = (_o = options.value) === null || _o === void 0 ? void 0 : _o.myfaces) === null || _p === void 0 ? void 0 : _p.upload) === null || _q === void 0 ? void 0 : _q.loadend;
        internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_LOAD).value = (_t = (_s = (_r = options.value) === null || _r === void 0 ? void 0 : _r.myfaces) === null || _s === void 0 ? void 0 : _s.upload) === null || _t === void 0 ? void 0 : _t.load;
        internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_ERROR).value = (_w = (_v = (_u = options.value) === null || _u === void 0 ? void 0 : _u.myfaces) === null || _v === void 0 ? void 0 : _v.upload) === null || _w === void 0 ? void 0 : _w.error;
        internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_ABORT).value = (_z = (_y = (_x = options.value) === null || _x === void 0 ? void 0 : _x.myfaces) === null || _y === void 0 ? void 0 : _y.upload) === null || _z === void 0 ? void 0 : _z.abort;
        internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_TIMEOUT).value = (_2 = (_1 = (_0 = options.value) === null || _0 === void 0 ? void 0 : _0.myfaces) === null || _1 === void 0 ? void 0 : _1.upload) === null || _2 === void 0 ? void 0 : _2.timeout;
        // mojarra compatibility, mojarra is sending the form id as well
        // this is not documented behavior but can be determined by running
        // mojarra under blackbox conditions.
        // I assume it does the same as our formId_submit=1 so leaving it out
        // won't hurt but for the sake of compatibility we are going to add it
        requestCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR, formId).value = formId;
        internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_SRC_CTL_ID).value = elementId;
        // reintroduction of PPS as per myfaces 2.3 (myfaces.pps = true, only the executes are submitted)
        internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_PPS).value = (_4 = (_3 = extractMyFacesParams(options.value)) === null || _3 === void 0 ? void 0 : _3[_core_Const__WEBPACK_IMPORTED_MODULE_7__.MYFACES_OPTION_PPS]) !== null && _4 !== void 0 ? _4 : false;
        assignClientWindowId(form, requestCtx);
        assignExecute(options, requestCtx, form, elementId);
        assignRender(options, requestCtx, form, elementId);
        assignNamingContainerData(internalCtx, form);
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
        _xhrCore_Response__WEBPACK_IMPORTED_MODULE_0__.Response.processResponse(request, context);
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
    function sendEvent(data, localHandler = function (data) {
    }) {
        /*now we serve the queue as well*/
        localHandler(data);
        eventQueue.forEach(fn => fn(data));
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
    function stdErrorHandler(request, context, exception, clearRequestQueue = false) {
        //newer browsers do not allow to hold additional values on native objects like exceptions
        //we hence capsule it into the request, which is gced automatically
        //on ie as well, since the stdErrorHandler usually is called between requests
        //this is a valid approach
        try {
            if (threshold == "ERROR") {
                let errorData = _xhrCore_ErrorData__WEBPACK_IMPORTED_MODULE_5__.ErrorData.fromClient(exception);
                sendError(errorData);
            }
        }
        finally {
            if (clearRequestQueue) {
                Implementation.requestQueue === null || Implementation.requestQueue === void 0 ? void 0 : Implementation.requestQueue.clear();
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
    function sendError(errorData, localHandler = function (data) {
    }) {
        localHandler(errorData);
        errorQueue.forEach((errorCallback) => {
            errorCallback(errorData);
        });
        let displayError = getGlobalConfig("defaultErrorOutput", (console ? console.error : alert));
        displayError(errorData);
    }
    Implementation.sendError = sendError;
    /**
     * @node optional element or id defining a rootnode where an element with the id "jakarta.faces.windowId" is hosted
     * @return the client window id of the current window, if one is given if none is found, null is returned
     */
    function getClientWindow(node) {
        const ALTERED = "___mf_id_altered__";
        const INIT = "___init____";
        /*
         * the search root for the dom element search
         */
        let searchRoot = ((node) ? mona_dish__WEBPACK_IMPORTED_MODULE_2__.DQ.byId(node) : (0,mona_dish__WEBPACK_IMPORTED_MODULE_2__.DQ$)("form"));
        let inputs = searchRoot
            .filterSelector(`input[name='${(0,_core_Const__WEBPACK_IMPORTED_MODULE_7__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_7__.P_CLIENT_WINDOW)}']`)
            .orElseLazy(() => searchRoot.querySelectorAll(`input[name='${(0,_core_Const__WEBPACK_IMPORTED_MODULE_7__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_7__.P_CLIENT_WINDOW)}']`));
        /*
         * lazy helper to fetch the window id from the included faces.js
         */
        let fetchWindowIdFromJSFJS = () => _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_4__.ExtDomQuery.searchJsfJsFor(/jfwid=([^&;]*)/).orElse(null);
        /*
         * fetch window id from the url
         */
        let fetchWindowIdFromURL = function () {
            const href = window.location.href, windowId = "jfwid";
            const regex = new RegExp("[\\?&]" + windowId + "=([^&#\\;]*)");
            const results = regex.exec(href);
            //initial trial over the url and a regexp
            if (results != null)
                return mona_dish__WEBPACK_IMPORTED_MODULE_2__.Optional.fromNullable(results[1]);
            return mona_dish__WEBPACK_IMPORTED_MODULE_2__.Optional.fromNullable(null);
        };
        /*
         * functional double check based on stream reduction
         * the values should be identical or on INIT value which is a premise to
         * skip the first check
         *
         * @param value1
         * @param value2
         */
        let differenceCheck = (value1, value2) => {
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
        let getValue = (item) => item.val;
        /*
         * fetch the window id from the forms
         * window ids must be present in all forms
         * or non-existent. If they exist all of them must be the same
         */
        let formWindowId = inputs.asArray.map(getValue).reduce(differenceCheck, INIT);
        //if the resulting window id is set on altered then we have an unresolvable problem
        assert(ALTERED != formWindowId, "Multiple different windowIds found in document");
        /*
         * return the window id or null
         */
        return formWindowId != INIT ? formWindowId : (fetchWindowIdFromURL() || fetchWindowIdFromJSFJS()).value;
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
        let element = mona_dish__WEBPACK_IMPORTED_MODULE_2__.DQ.byId(form, true);
        if (!element.isTag(_core_Const__WEBPACK_IMPORTED_MODULE_7__.HTML_TAG_FORM)) {
            throw new Error(getMessage("ERR_VIEWSTATE"));
        }
        // determine the naming container scenario
        const dummyContext = new mona_dish__WEBPACK_IMPORTED_MODULE_2__.Config({});
        assignNamingContainerData(dummyContext, mona_dish__WEBPACK_IMPORTED_MODULE_2__.DQ.byId(form));
        // fetch all non file input form elements
        let formElements = element.deepElements.encodeFormElement();
        // encode them! (file inputs are handled differently and are not part of the viewstate)
        return (0,_util_FileUtils__WEBPACK_IMPORTED_MODULE_9__.encodeFormData)(new _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_4__.ExtConfig(formElements), (0,_xhrCore_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resoveNamingContainerMapper)(dummyContext));
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
        addRequestToQueue: function (elem, form, reqCtx, respPassThr, delay = 0, timeout = 0) {
            Implementation.requestQueue = Implementation.requestQueue !== null && Implementation.requestQueue !== void 0 ? Implementation.requestQueue : new _util_XhrQueueController__WEBPACK_IMPORTED_MODULE_10__.XhrQueueController();
            Implementation.requestQueue.enqueue(new _xhrCore_XhrRequest__WEBPACK_IMPORTED_MODULE_1__.XhrRequest(reqCtx, respPassThr, timeout), delay);
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
        if (requestOptions.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_RENDER).isPresent()) {
            remapDefaultConstants(targetContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR).get({}), _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_RENDER, requestOptions.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_RENDER).value, issuingForm, sourceElementId, targetContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.VIEW_ID).value);
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
        if (requestOptions.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_OPTIONS_EXECUTE).isPresent()) {
            /*the options must be a blank delimited list of strings*/
            /*compliance with Mojarra which automatically adds @this to an execute
             * the spec rev 2.0a however states, if none is issued nothing at all should be sent down
             */
            requestOptions.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_OPTIONS_EXECUTE).value = [requestOptions.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_OPTIONS_EXECUTE).value, _core_Const__WEBPACK_IMPORTED_MODULE_7__.IDENT_THIS].join(" ");
            remapDefaultConstants(targetContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR).get({}), _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_EXECUTE, requestOptions.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_OPTIONS_EXECUTE).value, issuingForm, sourceElementId, targetContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.VIEW_ID).value);
        }
        else {
            targetContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR, _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_EXECUTE).value = sourceElementId;
        }
    }
    /**
     * apply the browser tab where the request was originating from
     *
     * @param form the form hosting the client window id
     * @param targetContext the target context receiving the value
     */
    function assignClientWindowId(form, targetContext) {
        let clientWindow = (0,_core_Const__WEBPACK_IMPORTED_MODULE_7__.$faces)().getClientWindow(form.getAsElem(0).value);
        if (clientWindow) {
            targetContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR, _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_CLIENT_WINDOW).value = clientWindow;
        }
    }
    /**
     * determines the current naming container
     * and assigns it internally
     *
     * @param internalContext
     * @param formElement
     * @private
     */
    function assignNamingContainerData(internalContext, formElement) {
        const viewRootId = (0,_xhrCore_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resolveViewRootId)(formElement);
        if (!!viewRootId) {
            internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.NAMED_VIEWROOT).value = true;
            internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.NAMING_CONTAINER_ID).value = viewRootId;
        }
    }
    /**
     * transforms the user values to the expected values
     *  handling '@none', '@all', '@form', and '@this' appropriately.
     * (Note: Although we could employ a simple string replacement method,
     * it could result in duplicate entries under certain conditions.)
     *
     * Specific standardized constants such as
     * '@all', '@none', '@form', and '@this'
     * require special treatment.
     *
     * @param targetConfig the target configuration receiving the final values
     * @param targetKey the target key
     * @param userValues the passed user values (aka input string which needs to be transformed)
     * @param issuingForm the form where the issuing element originates
     * @param issuingElementId the issuing element
     * @param rootNamingContainerId the naming container id ("" default if none is given)
     */
    function remapDefaultConstants(targetConfig, targetKey, userValues, issuingForm, issuingElementId, rootNamingContainerId = "") {
        //a cleaner implementation of the transform list method
        const SEP = (0,_core_Const__WEBPACK_IMPORTED_MODULE_7__.$faces)().separatorchar;
        let iterValues = (userValues) ? trim(userValues).split(/\s+/gi) : [];
        let ret = [];
        let processed = {};
        /**
         * remaps the client ids for the portlet case so that the server
         * can deal with them either prefixed ir not
         * also resolves the absolute id case (it was assumed the server does this, but
         * apparently the RI does not, so we have to follow the RI behavior here)
         * @param componentIdToTransform the componentId which needs post-processing
         */
        const remapNamingContainer = (componentIdToTransform) => {
            // pattern :<anything> must be prepended by viewRoot if there is one,
            // otherwise we are in a not namespaced then only the id has to match
            const rootNamingContainerPrefix = (rootNamingContainerId.length) ? rootNamingContainerId + SEP : _core_Const__WEBPACK_IMPORTED_MODULE_7__.EMPTY_STR;
            let formClientId = issuingForm.id.value;
            // nearest parent naming container relative to the form
            const nearestNamingContainer = formClientId.substring(0, formClientId.lastIndexOf(SEP));
            const nearestNamingContainerPrefix = (nearestNamingContainer.length) ? nearestNamingContainer + SEP : _core_Const__WEBPACK_IMPORTED_MODULE_7__.EMPTY_STR;
            // Absolute search expressions, always start with SEP or the name of the root naming container
            const hasLeadingSep = componentIdToTransform.indexOf(SEP) === 0;
            const isAbsolutSearchExpr = hasLeadingSep || (rootNamingContainerId.length
                && componentIdToTransform.indexOf(rootNamingContainerPrefix) == 0);
            let finalIdentifier;
            if (isAbsolutSearchExpr) {
                //we cut off the leading sep if there is one
                componentIdToTransform = hasLeadingSep ? componentIdToTransform.substring(1) : componentIdToTransform;
                componentIdToTransform = componentIdToTransform.indexOf(rootNamingContainerPrefix) == 0 ? componentIdToTransform.substring(rootNamingContainerPrefix.length) : componentIdToTransform;
                //now we prepend either the prefix or "" from the cut-off string to get the final result
                finalIdentifier = [rootNamingContainerPrefix, componentIdToTransform].join(_core_Const__WEBPACK_IMPORTED_MODULE_7__.EMPTY_STR);
            }
            else { //relative search according to the javadoc
                //we cut off the root naming container id from the form
                if (formClientId.indexOf(rootNamingContainerPrefix) == 0) {
                    formClientId = formClientId.substring(rootNamingContainerPrefix.length);
                }
                //If prependId = true, the outer form id must be present in the id if same form
                let hasPrependId = componentIdToTransform.indexOf(formClientId) == 0;
                finalIdentifier = hasPrependId ?
                    [rootNamingContainerPrefix, componentIdToTransform].join(_core_Const__WEBPACK_IMPORTED_MODULE_7__.EMPTY_STR) :
                    [nearestNamingContainerPrefix, componentIdToTransform].join(_core_Const__WEBPACK_IMPORTED_MODULE_7__.EMPTY_STR);
            }
            // We need to double-check because we have scenarios where we have a naming container
            // and no prepend (aka tobago testcase "must handle ':' in IDs properly", scenario 3,
            // in this case we return the component id, and be happy
            // we can roll a dom check here
            return mona_dish__WEBPACK_IMPORTED_MODULE_2__.DQ.byId(finalIdentifier).isPresent() ? finalIdentifier : componentIdToTransform;
        };
        // in this case we do not use lazy stream because it won´t bring any code reduction
        // or speedup
        for (let cnt = 0; cnt < iterValues.length; cnt++) {
            //avoid doubles
            if (iterValues[cnt] in processed) {
                continue;
            }
            switch (iterValues[cnt]) {
                //@none no values should be sent
                case _core_Const__WEBPACK_IMPORTED_MODULE_7__.IDENT_NONE:
                    return targetConfig.delete(targetKey);
                //@all is a pass through case according to the spec
                case _core_Const__WEBPACK_IMPORTED_MODULE_7__.IDENT_ALL:
                    targetConfig.assign(targetKey).value = _core_Const__WEBPACK_IMPORTED_MODULE_7__.IDENT_ALL;
                    return targetConfig;
                //@form pushes the issuing form id into our list
                case _core_Const__WEBPACK_IMPORTED_MODULE_7__.IDENT_FORM:
                    ret.push(remapNamingContainer(issuingForm.id.value));
                    processed[issuingForm.id.value] = true;
                    break;
                //@this is replaced with the current issuing element id
                case _core_Const__WEBPACK_IMPORTED_MODULE_7__.IDENT_THIS:
                    if (!(issuingElementId in processed)) {
                        ret.push(remapNamingContainer(issuingElementId));
                        processed[issuingElementId] = true;
                    }
                    break;
                default:
                    ret.push(remapNamingContainer(iterValues[cnt]));
                    processed[iterValues[cnt]] = true;
            }
        }
        targetConfig.assign(targetKey).value = ret.join(" ");
        return targetConfig;
    }
    /**
     * Filters the provided options using a blacklist to ensure
     * only pass-through parameters are processed for the Ajax request.
     *
     * Note that this issue is leftover from a previous implementation.
     * The specification-conforming behavior is to use parameters for pass-through values.
     * This will be addressed soon, after confirming that removal won't break any legacy code.
     *
     * @param {Context} mappedOpts - The options to be filtered.
     */
    function extractLegacyParams(mappedOpts) {
        //we now can use the full code reduction given by our stream api
        //to filter
        return ofAssoc(mappedOpts)
            .filter(((item) => !(item[0] in BlockFilter)))
            .reduce(collectAssoc, {});
    }
    /**
     * Extracts the MyFaces configuration parameters
     * that augment JSF with additional functionality.
     *
     * @param mappedOpts
     * @private
     */
    function extractMyFacesParams(mappedOpts) {
        var _a;
        //we now can use the full code reduction given by our stream api
        //to filter
        return (_a = ofAssoc(mappedOpts)
            .filter(((item) => (item[0] == "myfaces")))
            .reduce(collectAssoc, {})) === null || _a === void 0 ? void 0 : _a[_core_Const__WEBPACK_IMPORTED_MODULE_7__.MYFACES];
    }
    function remapArrayToAssocArr(arrayedParams) {
        if (Array.isArray(arrayedParams)) {
            return arrayedParams.reduce(collectAssoc, {});
        }
        return arrayedParams;
    }
    function resolveGlobalConfig() {
        var _a, _b;
        return (_b = (_a = window === null || window === void 0 ? void 0 : window[_core_Const__WEBPACK_IMPORTED_MODULE_7__.MYFACES]) === null || _a === void 0 ? void 0 : _a.config) !== null && _b !== void 0 ? _b : {};
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
            let sourceCode = trim(func);
            if (sourceCode.indexOf("function ") == 0) {
                sourceCode = `return ${sourceCode} (event)`;
            }
            return new Function("event", sourceCode).call(source, event) !== false;
        }
    }
})(Implementation || (Implementation = {}));


/***/ },

/***/ "./src/main/typescript/impl/PushImpl.ts"
/*!**********************************************!*\
  !*** ./src/main/typescript/impl/PushImpl.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PushImpl: () => (/* binding */ PushImpl)
/* harmony export */ });
/* harmony import */ var _core_Const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Const */ "./src/main/typescript/impl/core/Const.ts");
/* harmony import */ var mona_dish__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
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
/**
 * Typescript port of the faces\.push part in the myfaces implementation
 */


/**
 * Implementation class for the push functionality
 */
var PushImpl;
(function (PushImpl) {
    // @deprecated because we can assume at least for the newer versions
    // that the protocol is properly set!
    const URL_PROTOCOL = mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.global().location.protocol.replace("http", "ws") + "//";
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
        if (!mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.global().WebSocket) { // IE6-9.
            onclose(-1, channel);
            return;
        }
        let channelToken = url.substr(url.indexOf('?') + 1);
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
            ((_b = (_a = mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.global()) === null || _a === void 0 ? void 0 : _a.faces) !== null && _b !== void 0 ? _b : (_c = mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.global()) === null || _c === void 0 ? void 0 : _c.jsf).push.open(socketClientId);
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
    class Socket {
        constructor(channelToken, url, channel) {
            this.channelToken = channelToken;
            this.url = url;
            this.channel = channel;
            this.reconnectAttempts = 0;
        }
        open() {
            if (this.socket && this.socket.readyState == 1) {
                return;
            }
            this.socket = new WebSocket(this.url);
            this.bindCallbacks();
        }
        // noinspection JSUnusedLocalSymbols
        onopen(event) {
            var _a, _b;
            if (!this.reconnectAttempts) {
                let clientIds = PushImpl.clientIdsByTokens[this.channelToken];
                for (let i = clientIds.length - 1; i >= 0; i--) {
                    let socketClientId = clientIds[i];
                    (_b = (_a = PushImpl.components[socketClientId]) === null || _a === void 0 ? void 0 : _a['onopen']) === null || _b === void 0 ? void 0 : _b.call(_a, this.channel);
                }
            }
            this.reconnectAttempts = 0;
        }
        onerror(event) {
            var _a, _b, _c;
            let message = JSON.parse((_a = event === null || event === void 0 ? void 0 : event.data) !== null && _a !== void 0 ? _a : null);
            //TODO replace this with a more readable Stream code
            for (let i = PushImpl.clientIdsByTokens[this.channelToken].length - 1; i >= 0; i--) {
                let socketClientId = PushImpl.clientIdsByTokens[this.channelToken][i];
                if (document.getElementById(socketClientId)) {
                    try {
                        (_c = (_b = PushImpl.components[socketClientId]) === null || _b === void 0 ? void 0 : _b['onerror']) === null || _c === void 0 ? void 0 : _c.call(_b, message, this.channel, event);
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
        }
        onmmessage(event) {
            var _a, _b, _c;
            let message = JSON.parse(event.data);
            for (let i = PushImpl.clientIdsByTokens[this.channelToken].length - 1; i >= 0; i--) {
                let socketClientId = PushImpl.clientIdsByTokens[this.channelToken][i];
                if (document.getElementById(socketClientId)) {
                    try {
                        (_b = (_a = PushImpl.components[socketClientId]) === null || _a === void 0 ? void 0 : _a['onmessage']) === null || _b === void 0 ? void 0 : _b.call(_a, message, this.channel, event);
                    }
                    catch (e) {
                        //Ignore
                    }
                    let behaviors = (_c = PushImpl.components === null || PushImpl.components === void 0 ? void 0 : PushImpl.components[socketClientId]) === null || _c === void 0 ? void 0 : _c['behaviors'];
                    let functions = behaviors === null || behaviors === void 0 ? void 0 : behaviors[message];
                    if (functions && functions.length) {
                        for (let j = 0; j < functions.length; j++) {
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
        }
        onclose(event) {
            var _a, _b;
            if (!this.socket
                || (event.code == 1000 && event.reason == _core_Const__WEBPACK_IMPORTED_MODULE_0__.REASON_EXPIRED)
                || (event.code == 1008)
                || (!this.reconnectAttempts)
                || (this.reconnectAttempts >= _core_Const__WEBPACK_IMPORTED_MODULE_0__.MAX_RECONNECT_ATTEMPTS)) {
                let clientIds = PushImpl.clientIdsByTokens[this.channelToken];
                for (let i = clientIds.length - 1; i >= 0; i--) {
                    let socketClientId = clientIds[i];
                    (_b = (_a = PushImpl.components === null || PushImpl.components === void 0 ? void 0 : PushImpl.components[socketClientId]) === null || _a === void 0 ? void 0 : _a['onclose']) === null || _b === void 0 ? void 0 : _b.call(_a, event === null || event === void 0 ? void 0 : event.code, this === null || this === void 0 ? void 0 : this.channel, event);
                }
            }
            else {
                setTimeout(this.open, _core_Const__WEBPACK_IMPORTED_MODULE_0__.RECONNECT_INTERVAL * this.reconnectAttempts++);
            }
        }
        ;
        close() {
            if (this.socket) {
                let s = this.socket;
                this.socket = null;
                s.close();
            }
        }
        /**
         * bind the callbacks to the socket callbacks
         */
        bindCallbacks() {
            this.socket.onopen = (event) => this.onopen(event);
            this.socket.onmessage = (event) => this.onmmessage(event);
            this.socket.onclose = (event) => this.onclose(event);
            this.socket.onerror = (event) => this.onerror(event);
        }
    }
    // Private static functions ---------------------------------------------------------------------------------------
    // @deprecated because we can assume at least for the newer versions
    // that the protocol is properly set!
    // https://issues.apache.org/jira/browse/MYFACES-4718
    // This needs further investigation
    function getBaseURL(url) {
        if (url.indexOf("://") < 0) {
            let base = mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.global().location.hostname + ":" + mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.global().location.port;
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
        let socket = PushImpl.sockets[channelToken];
        if (socket) {
            return socket;
        }
        else {
            throw new Error("Unknown channelToken: " + channelToken);
        }
    }
    function resolveFunction(fn = () => {
    }) {
        return ((typeof fn !== "function") && (fn = mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.global()[fn]), fn);
    }
})(PushImpl || (PushImpl = {}));


/***/ },

/***/ "./src/main/typescript/impl/core/Const.ts"
/*!************************************************!*\
  !*** ./src/main/typescript/impl/core/Const.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $faces: () => (/* binding */ $faces),
/* harmony export */   $nsp: () => (/* binding */ $nsp),
/* harmony export */   APPLIED_CLIENT_WINDOW: () => (/* binding */ APPLIED_CLIENT_WINDOW),
/* harmony export */   APPLIED_VST: () => (/* binding */ APPLIED_VST),
/* harmony export */   ATTR_ID: () => (/* binding */ ATTR_ID),
/* harmony export */   ATTR_NAME: () => (/* binding */ ATTR_NAME),
/* harmony export */   ATTR_URL: () => (/* binding */ ATTR_URL),
/* harmony export */   ATTR_VALUE: () => (/* binding */ ATTR_VALUE),
/* harmony export */   BEGIN: () => (/* binding */ BEGIN),
/* harmony export */   CLIENT_ERROR: () => (/* binding */ CLIENT_ERROR),
/* harmony export */   COMPLETE: () => (/* binding */ COMPLETE),
/* harmony export */   CONTENT_TYPE: () => (/* binding */ CONTENT_TYPE),
/* harmony export */   CTX_OPTIONS_DELAY: () => (/* binding */ CTX_OPTIONS_DELAY),
/* harmony export */   CTX_OPTIONS_EXECUTE: () => (/* binding */ CTX_OPTIONS_EXECUTE),
/* harmony export */   CTX_OPTIONS_PARAMS: () => (/* binding */ CTX_OPTIONS_PARAMS),
/* harmony export */   CTX_OPTIONS_RESET: () => (/* binding */ CTX_OPTIONS_RESET),
/* harmony export */   CTX_OPTIONS_TIMEOUT: () => (/* binding */ CTX_OPTIONS_TIMEOUT),
/* harmony export */   CTX_PARAM_MF_INTERNAL: () => (/* binding */ CTX_PARAM_MF_INTERNAL),
/* harmony export */   CTX_PARAM_PPS: () => (/* binding */ CTX_PARAM_PPS),
/* harmony export */   CTX_PARAM_RENDER: () => (/* binding */ CTX_PARAM_RENDER),
/* harmony export */   CTX_PARAM_REQ_PASS_THR: () => (/* binding */ CTX_PARAM_REQ_PASS_THR),
/* harmony export */   CTX_PARAM_SRC_CTL_ID: () => (/* binding */ CTX_PARAM_SRC_CTL_ID),
/* harmony export */   CTX_PARAM_SRC_FRM_ID: () => (/* binding */ CTX_PARAM_SRC_FRM_ID),
/* harmony export */   CTX_PARAM_UPLOAD_ABORT: () => (/* binding */ CTX_PARAM_UPLOAD_ABORT),
/* harmony export */   CTX_PARAM_UPLOAD_ERROR: () => (/* binding */ CTX_PARAM_UPLOAD_ERROR),
/* harmony export */   CTX_PARAM_UPLOAD_LOAD: () => (/* binding */ CTX_PARAM_UPLOAD_LOAD),
/* harmony export */   CTX_PARAM_UPLOAD_LOADEND: () => (/* binding */ CTX_PARAM_UPLOAD_LOADEND),
/* harmony export */   CTX_PARAM_UPLOAD_LOADSTART: () => (/* binding */ CTX_PARAM_UPLOAD_LOADSTART),
/* harmony export */   CTX_PARAM_UPLOAD_ON_PROGRESS: () => (/* binding */ CTX_PARAM_UPLOAD_ON_PROGRESS),
/* harmony export */   CTX_PARAM_UPLOAD_PREINIT: () => (/* binding */ CTX_PARAM_UPLOAD_PREINIT),
/* harmony export */   CTX_PARAM_UPLOAD_TIMEOUT: () => (/* binding */ CTX_PARAM_UPLOAD_TIMEOUT),
/* harmony export */   DEFERRED_HEAD_INSERTS: () => (/* binding */ DEFERRED_HEAD_INSERTS),
/* harmony export */   DELAY_NONE: () => (/* binding */ DELAY_NONE),
/* harmony export */   EMPTY_FUNC: () => (/* binding */ EMPTY_FUNC),
/* harmony export */   EMPTY_MAP: () => (/* binding */ EMPTY_MAP),
/* harmony export */   EMPTY_RESPONSE: () => (/* binding */ EMPTY_RESPONSE),
/* harmony export */   EMPTY_STR: () => (/* binding */ EMPTY_STR),
/* harmony export */   ENCODED_URL: () => (/* binding */ ENCODED_URL),
/* harmony export */   ERROR: () => (/* binding */ ERROR),
/* harmony export */   ERROR_MESSAGE: () => (/* binding */ ERROR_MESSAGE),
/* harmony export */   ERROR_NAME: () => (/* binding */ ERROR_NAME),
/* harmony export */   ERR_NO_PARTIAL_RESPONSE: () => (/* binding */ ERR_NO_PARTIAL_RESPONSE),
/* harmony export */   EVENT: () => (/* binding */ EVENT),
/* harmony export */   HEAD_FACES_REQ: () => (/* binding */ HEAD_FACES_REQ),
/* harmony export */   HTML_CLIENT_WINDOW: () => (/* binding */ HTML_CLIENT_WINDOW),
/* harmony export */   HTML_TAG_BODY: () => (/* binding */ HTML_TAG_BODY),
/* harmony export */   HTML_TAG_FORM: () => (/* binding */ HTML_TAG_FORM),
/* harmony export */   HTML_TAG_HEAD: () => (/* binding */ HTML_TAG_HEAD),
/* harmony export */   HTML_TAG_LINK: () => (/* binding */ HTML_TAG_LINK),
/* harmony export */   HTML_TAG_SCRIPT: () => (/* binding */ HTML_TAG_SCRIPT),
/* harmony export */   HTML_TAG_STYLE: () => (/* binding */ HTML_TAG_STYLE),
/* harmony export */   HTML_VIEWSTATE: () => (/* binding */ HTML_VIEWSTATE),
/* harmony export */   HTTP_ERROR: () => (/* binding */ HTTP_ERROR),
/* harmony export */   IDENT_ALL: () => (/* binding */ IDENT_ALL),
/* harmony export */   IDENT_FORM: () => (/* binding */ IDENT_FORM),
/* harmony export */   IDENT_NONE: () => (/* binding */ IDENT_NONE),
/* harmony export */   IDENT_THIS: () => (/* binding */ IDENT_THIS),
/* harmony export */   MALFORMEDXML: () => (/* binding */ MALFORMEDXML),
/* harmony export */   MAX_RECONNECT_ATTEMPTS: () => (/* binding */ MAX_RECONNECT_ATTEMPTS),
/* harmony export */   MF_NONE: () => (/* binding */ MF_NONE),
/* harmony export */   MULTIPART: () => (/* binding */ MULTIPART),
/* harmony export */   MYFACES: () => (/* binding */ MYFACES),
/* harmony export */   MYFACES_OPTION_PPS: () => (/* binding */ MYFACES_OPTION_PPS),
/* harmony export */   NAMED_VIEWROOT: () => (/* binding */ NAMED_VIEWROOT),
/* harmony export */   NAMING_CONTAINER_ID: () => (/* binding */ NAMING_CONTAINER_ID),
/* harmony export */   NO_TIMEOUT: () => (/* binding */ NO_TIMEOUT),
/* harmony export */   ON_ERROR: () => (/* binding */ ON_ERROR),
/* harmony export */   ON_EVENT: () => (/* binding */ ON_EVENT),
/* harmony export */   PHASE_PROCESS_RESPONSE: () => (/* binding */ PHASE_PROCESS_RESPONSE),
/* harmony export */   P_AJAX: () => (/* binding */ P_AJAX),
/* harmony export */   P_AJAX_SOURCE: () => (/* binding */ P_AJAX_SOURCE),
/* harmony export */   P_BEHAVIOR_EVENT: () => (/* binding */ P_BEHAVIOR_EVENT),
/* harmony export */   P_CLIENT_WINDOW: () => (/* binding */ P_CLIENT_WINDOW),
/* harmony export */   P_EVT: () => (/* binding */ P_EVT),
/* harmony export */   P_EXECUTE: () => (/* binding */ P_EXECUTE),
/* harmony export */   P_RENDER: () => (/* binding */ P_RENDER),
/* harmony export */   P_RENDER_OVERRIDE: () => (/* binding */ P_RENDER_OVERRIDE),
/* harmony export */   P_RESET_VALUES: () => (/* binding */ P_RESET_VALUES),
/* harmony export */   P_RESOURCE: () => (/* binding */ P_RESOURCE),
/* harmony export */   P_VIEWBODY: () => (/* binding */ P_VIEWBODY),
/* harmony export */   P_VIEWHEAD: () => (/* binding */ P_VIEWHEAD),
/* harmony export */   P_VIEWROOT: () => (/* binding */ P_VIEWROOT),
/* harmony export */   P_VIEWSTATE: () => (/* binding */ P_VIEWSTATE),
/* harmony export */   P_WINDOW_ID: () => (/* binding */ P_WINDOW_ID),
/* harmony export */   REASON_EXPIRED: () => (/* binding */ REASON_EXPIRED),
/* harmony export */   RECONNECT_INTERVAL: () => (/* binding */ RECONNECT_INTERVAL),
/* harmony export */   REQ_ACCEPT: () => (/* binding */ REQ_ACCEPT),
/* harmony export */   REQ_TYPE_GET: () => (/* binding */ REQ_TYPE_GET),
/* harmony export */   REQ_TYPE_POST: () => (/* binding */ REQ_TYPE_POST),
/* harmony export */   RESPONSE_TEXT: () => (/* binding */ RESPONSE_TEXT),
/* harmony export */   RESPONSE_XML: () => (/* binding */ RESPONSE_XML),
/* harmony export */   SEL_CLIENT_WINDOW_ELEM: () => (/* binding */ SEL_CLIENT_WINDOW_ELEM),
/* harmony export */   SEL_RESPONSE_XML: () => (/* binding */ SEL_RESPONSE_XML),
/* harmony export */   SEL_VIEWSTATE_ELEM: () => (/* binding */ SEL_VIEWSTATE_ELEM),
/* harmony export */   SERVER_ERROR: () => (/* binding */ SERVER_ERROR),
/* harmony export */   SOURCE: () => (/* binding */ SOURCE),
/* harmony export */   STATE_EVT_BEGIN: () => (/* binding */ STATE_EVT_BEGIN),
/* harmony export */   STATE_EVT_COMPLETE: () => (/* binding */ STATE_EVT_COMPLETE),
/* harmony export */   STATE_EVT_TIMEOUT: () => (/* binding */ STATE_EVT_TIMEOUT),
/* harmony export */   STATUS: () => (/* binding */ STATUS),
/* harmony export */   STD_ACCEPT: () => (/* binding */ STD_ACCEPT),
/* harmony export */   SUCCESS: () => (/* binding */ SUCCESS),
/* harmony export */   TIMEOUT_EVENT: () => (/* binding */ TIMEOUT_EVENT),
/* harmony export */   UNKNOWN: () => (/* binding */ UNKNOWN),
/* harmony export */   UPDATE_ELEMS: () => (/* binding */ UPDATE_ELEMS),
/* harmony export */   UPDATE_FORMS: () => (/* binding */ UPDATE_FORMS),
/* harmony export */   URL_ENCODED: () => (/* binding */ URL_ENCODED),
/* harmony export */   VAL_AJAX: () => (/* binding */ VAL_AJAX),
/* harmony export */   VIEW_ID: () => (/* binding */ VIEW_ID),
/* harmony export */   WINDOW_ID: () => (/* binding */ WINDOW_ID),
/* harmony export */   XML_ATTR_NAMED_VIEWROOT: () => (/* binding */ XML_ATTR_NAMED_VIEWROOT),
/* harmony export */   XML_TAG_AFTER: () => (/* binding */ XML_TAG_AFTER),
/* harmony export */   XML_TAG_ATTR: () => (/* binding */ XML_TAG_ATTR),
/* harmony export */   XML_TAG_ATTRIBUTES: () => (/* binding */ XML_TAG_ATTRIBUTES),
/* harmony export */   XML_TAG_BEFORE: () => (/* binding */ XML_TAG_BEFORE),
/* harmony export */   XML_TAG_CHANGES: () => (/* binding */ XML_TAG_CHANGES),
/* harmony export */   XML_TAG_DELETE: () => (/* binding */ XML_TAG_DELETE),
/* harmony export */   XML_TAG_ERROR: () => (/* binding */ XML_TAG_ERROR),
/* harmony export */   XML_TAG_EVAL: () => (/* binding */ XML_TAG_EVAL),
/* harmony export */   XML_TAG_EXTENSION: () => (/* binding */ XML_TAG_EXTENSION),
/* harmony export */   XML_TAG_INSERT: () => (/* binding */ XML_TAG_INSERT),
/* harmony export */   XML_TAG_PARTIAL_RESP: () => (/* binding */ XML_TAG_PARTIAL_RESP),
/* harmony export */   XML_TAG_REDIRECT: () => (/* binding */ XML_TAG_REDIRECT),
/* harmony export */   XML_TAG_UPDATE: () => (/* binding */ XML_TAG_UPDATE)
/* harmony export */ });
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
/*
 * [export const] constants
 */
const XML_ATTR_NAMED_VIEWROOT = "namedViewRoot";
const NAMED_VIEWROOT = "namedViewRoot";
const P_AJAX_SOURCE = "jakarta.faces.source";
const NAMING_CONTAINER_ID = "myfaces.NamingContainerId";
const VIEW_ID = "myfaces.viewId";
const P_VIEWSTATE = "jakarta.faces.ViewState";
const P_CLIENT_WINDOW = "jakarta.faces.ClientWindow";
const P_VIEWROOT = "jakarta.faces.ViewRoot";
const P_VIEWHEAD = "jakarta.faces.ViewHead";
const P_VIEWBODY = "jakarta.faces.ViewBody";
const P_RESOURCE = "jakarta.faces.Resource";
/*some useful definitions*/
const EMPTY_FUNC = Object.freeze(() => {
});
const EMPTY_STR = "";
const EMPTY_MAP = Object.freeze({});
const HTML_VIEWSTATE = ["<input type='hidden'", "name='", P_VIEWSTATE, "' value='' />"].join(EMPTY_STR);
const HTML_CLIENT_WINDOW = ["<input type='hidden'", "' name='", P_CLIENT_WINDOW, "' value='' />"].join(EMPTY_STR);
/*internal identifiers for options*/
const IDENT_ALL = "@all";
const IDENT_NONE = "@none";
const IDENT_THIS = "@this";
const IDENT_FORM = "@form";
const P_AJAX = "jakarta.faces.partial.ajax";
const P_EXECUTE = "jakarta.faces.partial.execute";
const P_RENDER = "jakarta.faces.partial.render";
/*render override for viewbody or viewroot, in both cases an all is performed*/
const P_RENDER_OVERRIDE = "_myfaces.rendeOverride";
const P_EVT = "jakarta.faces.partial.event";
const P_RESET_VALUES = "jakarta.faces.partial.resetValues";
const P_WINDOW_ID = "jakarta.faces.windowId";
const P_BEHAVIOR_EVENT = "jakarta.faces.behavior.event";
const CTX_PARAM_RENDER = "render";
const WINDOW_ID = "windowId";
/* message types */
const ERROR = "error";
const EVENT = "event";
const ON_ERROR = "onerror";
const ON_EVENT = "onevent";
/* event emitting stages */
const BEGIN = "begin";
const COMPLETE = "complete";
const SUCCESS = "success";
const SOURCE = "source";
const STATUS = "status";
const ERROR_NAME = "error-name";
const ERROR_MESSAGE = "error-message";
const RESPONSE_TEXT = "responseText";
const RESPONSE_XML = "responseXML";
/*ajax errors spec 14.4.2*/
const HTTP_ERROR = "httpError";
const EMPTY_RESPONSE = "emptyResponse";
const MALFORMEDXML = "malformedXML";
const SERVER_ERROR = "serverError";
const CLIENT_ERROR = "clientError";
const TIMEOUT_EVENT = "timeout";
const CTX_OPTIONS_PARAMS = "params";
const CTX_OPTIONS_DELAY = "delay";
const DELAY_NONE = 'none';
const CTX_OPTIONS_TIMEOUT = "timeout";
const CTX_OPTIONS_RESET = "resetValues";
const CTX_OPTIONS_EXECUTE = "execute";
const CTX_PARAM_MF_INTERNAL = "myfaces.internal";
const CTX_PARAM_SRC_FRM_ID = "myfaces.source.formId";
const CTX_PARAM_UPLOAD_ON_PROGRESS = "myfaces.upload.progress";
const CTX_PARAM_UPLOAD_PREINIT = "myfaces.upload.preinit";
const CTX_PARAM_UPLOAD_LOADSTART = "myfaces.upload.loadstart";
const CTX_PARAM_UPLOAD_LOADEND = "myfaces.upload.loadend";
const CTX_PARAM_UPLOAD_LOAD = "myfaces.upload.load";
const CTX_PARAM_UPLOAD_ERROR = "myfaces.upload.error";
const CTX_PARAM_UPLOAD_ABORT = "myfaces.upload.abort";
const CTX_PARAM_UPLOAD_TIMEOUT = "myfaces.upload.timeout";
const CTX_PARAM_SRC_CTL_ID = "myfaces.source.controlId";
const CTX_PARAM_REQ_PASS_THR = "myfaces.request.passThrough";
const CTX_PARAM_PPS = "myfaces.request.pps";
const CONTENT_TYPE = "Content-Type";
const HEAD_FACES_REQ = "Faces-Request";
const REQ_ACCEPT = "Accept";
const VAL_AJAX = "partial/ajax";
const ENCODED_URL = "jakarta.faces.encodedURL";
const REQ_TYPE_GET = "GET";
const REQ_TYPE_POST = "POST";
const STATE_EVT_BEGIN = "begin"; //TODO remove this
const STATE_EVT_TIMEOUT = "TIMEOUT_EVENT";
const STATE_EVT_COMPLETE = "complete"; //TODO remove this
const URL_ENCODED = "application/x-www-form-urlencoded";
const MULTIPART = "multipart/form-data";
const NO_TIMEOUT = 0;
const STD_ACCEPT = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
const HTML_TAG_HEAD = "HEAD";
const HTML_TAG_FORM = "FORM";
const HTML_TAG_BODY = "BODY";
const HTML_TAG_LINK = "LINK";
const HTML_TAG_SCRIPT = "SCRIPT";
const HTML_TAG_STYLE = "STYLE";
const SEL_VIEWSTATE_ELEM = "[name='" + P_VIEWSTATE + "']";
const SEL_CLIENT_WINDOW_ELEM = "[name='" + P_CLIENT_WINDOW + "']";
const SEL_RESPONSE_XML = "responseXML";
const PHASE_PROCESS_RESPONSE = "processResponse";
const ERR_NO_PARTIAL_RESPONSE = "Partial response not set";
const MYFACES_OPTION_PPS = "pps";
const ATTR_URL = "url";
const ATTR_NAME = "name";
const ATTR_VALUE = "value";
const ATTR_ID = "id";
/*partial response types*/
const XML_TAG_PARTIAL_RESP = "partial-response";
/*partial commands*/
const XML_TAG_CHANGES = "changes";
const XML_TAG_UPDATE = "update";
const XML_TAG_DELETE = "delete";
const XML_TAG_INSERT = "insert";
const XML_TAG_EVAL = "eval";
const XML_TAG_ERROR = "error";
const XML_TAG_ATTRIBUTES = "attributes";
const XML_TAG_EXTENSION = "extension";
const XML_TAG_REDIRECT = "redirect";
const XML_TAG_BEFORE = "before";
const XML_TAG_AFTER = "after";
const XML_TAG_ATTR = "attribute";
/*other constants*/
const UPDATE_FORMS = "myfaces.updateForms";
const UPDATE_ELEMS = "myfaces.updateElems";
//we want the head elements to be processed before we process the body
//but after the inner html is done
const DEFERRED_HEAD_INSERTS = "myfaces.headElems";
const MYFACES = "myfaces";
const MF_NONE = "__mf_none__";
const REASON_EXPIRED = "Expired";
const APPLIED_VST = "myfaces.appliedViewState";
const APPLIED_CLIENT_WINDOW = "myfaces.appliedClientWindow";
const RECONNECT_INTERVAL = 500;
const MAX_RECONNECT_ATTEMPTS = 25;
const UNKNOWN = "UNKNOWN";
/**
 * helper to remap the namespaces variables for 2.3
 * from 2.3 to 4.0 every javax namespace has been changed
 * to faces
 * To take the compatibility layer out this method just has to be
 * changed to a simple value passthrough
 */
function $faces() {
    var _a;
    return ((_a = window === null || window === void 0 ? void 0 : window.faces) !== null && _a !== void 0 ? _a : window === null || window === void 0 ? void 0 : window.jsf);
}
function $nsp(inputNamespace) {
    if ((!inputNamespace) || !(inputNamespace === null || inputNamespace === void 0 ? void 0 : inputNamespace.replace)) {
        return inputNamespace;
    }
    return (!!(window === null || window === void 0 ? void 0 : window.faces)) ? inputNamespace.replace(/javax\.faces/gi, "jakarta.faces") : inputNamespace.replace(/jakarta\.faces/gi, "javax.faces");
}


/***/ },

/***/ "./src/main/typescript/impl/core/ImplTypes.ts"
/*!****************************************************!*\
  !*** ./src/main/typescript/impl/core/ImplTypes.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StateHolder: () => (/* binding */ StateHolder)
/* harmony export */ });
/* harmony import */ var _Const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Const */ "./src/main/typescript/impl/core/Const.ts");
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

/**
 * a helper class to isolate the
 * view state and client window and other
 * future states which follow a similar pattern
 */
class StateHolder {
    constructor(id, value) {
        this.id = id;
        this.value = value;
        let viewStatePos = id.indexOf(_Const__WEBPACK_IMPORTED_MODULE_0__.P_VIEWSTATE);
        this.nameSpace = viewStatePos > 0 ? id.substr(0, viewStatePos - 1) : _Const__WEBPACK_IMPORTED_MODULE_0__.EMPTY_STR;
    }
    get hasNameSpace() {
        var _a;
        return !!((_a = this === null || this === void 0 ? void 0 : this.nameSpace) !== null && _a !== void 0 ? _a : _Const__WEBPACK_IMPORTED_MODULE_0__.EMPTY_STR).length;
    }
}


/***/ },

/***/ "./src/main/typescript/impl/i18n/Messages.ts"
/*!***************************************************!*\
  !*** ./src/main/typescript/impl/i18n/Messages.ts ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Messages: () => (/* binding */ Messages)
/* harmony export */ });
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
class Messages {
    constructor() {
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
}


/***/ },

/***/ "./src/main/typescript/impl/util/Assertions.ts"
/*!*****************************************************!*\
  !*** ./src/main/typescript/impl/util/Assertions.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Assertions: () => (/* binding */ Assertions)
/* harmony export */ });
/* harmony import */ var mona_dish__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
/* harmony import */ var _core_Const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Lang */ "./src/main/typescript/impl/util/Lang.ts");
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



/**
 * a set of internal code assertions
 * which raise an error
 *
 */
var Assertions;
(function (Assertions) {
    function assertRequestIntegrity(options, elem) {
        /*assert if the onerror is set and once if it is set it must be of type function*/
        assertFunction(options.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_1__.ON_ERROR).value);
        /*assert if the onevent is set and once if it is set it must be of type function*/
        assertFunction(options.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_1__.ON_EVENT).value);
        //improve the error messages if an empty elem is passed
        //Assertions.assertElementExists(elem);
        assert(elem.isPresent(), _Lang__WEBPACK_IMPORTED_MODULE_2__.ExtLang.getMessage("ERR_MUST_BE_PROVIDED1", "{0}: source  must be provided or exist", "source element id"), "faces.ajax.request", "ArgNotSet");
    }
    Assertions.assertRequestIntegrity = assertRequestIntegrity;
    function assertUrlExists(node) {
        if (node.attr(_core_Const__WEBPACK_IMPORTED_MODULE_1__.ATTR_URL).isAbsent()) {
            throw Assertions.raiseError(new Error(), _Lang__WEBPACK_IMPORTED_MODULE_2__.ExtLang.getMessage("ERR_RED_URL", undefined, "processRedirect"), "processRedirect");
        }
    }
    Assertions.assertUrlExists = assertUrlExists;
    /**
     * checks the xml for various issues which can occur
     * and prevent a proper processing
     */
    function assertValidXMLResponse(responseXML) {
        assert(!responseXML.isAbsent(), _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_RESPONSE, _core_Const__WEBPACK_IMPORTED_MODULE_1__.PHASE_PROCESS_RESPONSE);
        assert(!responseXML.isXMLParserError(), responseXML.parserErrorText(_core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR), _core_Const__WEBPACK_IMPORTED_MODULE_1__.PHASE_PROCESS_RESPONSE);
        assert(responseXML.querySelectorAll(_core_Const__WEBPACK_IMPORTED_MODULE_1__.XML_TAG_PARTIAL_RESP).isPresent(), _core_Const__WEBPACK_IMPORTED_MODULE_1__.ERR_NO_PARTIAL_RESPONSE, _core_Const__WEBPACK_IMPORTED_MODULE_1__.PHASE_PROCESS_RESPONSE);
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
        let finalTitle = title !== null && title !== void 0 ? title : _core_Const__WEBPACK_IMPORTED_MODULE_1__.MALFORMEDXML;
        let finalName = name !== null && name !== void 0 ? name : _core_Const__WEBPACK_IMPORTED_MODULE_1__.MALFORMEDXML;
        let finalMessage = message !== null && message !== void 0 ? message : _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR;
        //TODO clean up the messy makeException, this is a perfect case for encapsulation and sane defaults
        return _Lang__WEBPACK_IMPORTED_MODULE_2__.ExtLang.makeException(error, finalTitle, finalName, "Response", caller || ((arguments.caller) ? arguments.caller.toString() : "_raiseError"), finalMessage);
    }
    Assertions.raiseError = raiseError;
    /*
     * using the new typescript 3.7 compiler assertion functionality to improve compiler hinting
     * we are not fully there yet, but soon
     */
    function assert(value, msg = _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR, caller = _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR, title = "Assertion Error") {
        if (!value) {
            throw Assertions.raiseError(new Error(), msg, caller, title);
        }
    }
    Assertions.assert = assert;
    function assertType(value, theType, msg = _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR, caller = _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR, title = "Type Assertion Error") {
        if ((!!value) && !mona_dish__WEBPACK_IMPORTED_MODULE_0__.Lang.assertType(value, theType)) {
            throw Assertions.raiseError(new Error(), msg, caller, title);
        }
    }
    Assertions.assertType = assertType;
    function assertFunction(value, msg = _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR, caller = _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR, title = "Assertion Error") {
        assertType(value, "function", msg, caller, title);
    }
    Assertions.assertFunction = assertFunction;
    function assertDelay(value) {
        if (!(value >= 0)) { // >= 0 abbreviation which covers all cases of non positive values,
            // including NaN and non numeric strings, no type equality is deliberate here,
            throw new Error("Invalid delay value: " + value);
        }
    }
    Assertions.assertDelay = assertDelay;
})(Assertions || (Assertions = {}));


/***/ },

/***/ "./src/main/typescript/impl/util/AsyncRunnable.ts"
/*!********************************************************!*\
  !*** ./src/main/typescript/impl/util/AsyncRunnable.ts ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsyncRunnable: () => (/* binding */ AsyncRunnable)
/* harmony export */ });
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
/**
 * pretty much the same as cancellable Promise, but given
 * we do not have that on browser level yet this is sort
 * of a non - intrusive Shim!
 */
class AsyncRunnable {
    constructor() {
        /**
         * helper support so that we do not have to drag in Promise shims
         */
        this.catchFunctions = [];
        this.thenFunctions = [];
    }
    /**
     * resolve handler function which calls the then chain
     * and after that finally
     * @param data
     */
    resolve(data) {
        this.thenFunctions.reduce((inputVal, thenFunc) => {
            return thenFunc(inputVal);
        }, data);
    }
    /**
     * reject handler function which triggers the catch chain
     * @param data
     */
    reject(data) {
        this.catchFunctions.reduce((inputVal, catchFunc) => {
            return catchFunc(inputVal);
        }, data);
    }
    /**
     * register a catch functor
     * @param func the functor for the catch monad
     */
    catch(func) {
        this.catchFunctions.push(func);
        return this;
    }
    /**
     * registers a finally functor
     * @param func the functor for the finally handling chanin
     */
    finally(func) {
        // no ie11 support we probably are going to revert to shims for that one
        this.catchFunctions.push(func);
        this.thenFunctions.push(func);
        return this;
    }
    /**
     * @param func then functor similar to promise
     */
    then(func) {
        this.thenFunctions.push(func);
        return this;
    }
}


/***/ },

/***/ "./src/main/typescript/impl/util/ExtDomQuery.ts"
/*!******************************************************!*\
  !*** ./src/main/typescript/impl/util/ExtDomQuery.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExtConfig: () => (/* binding */ ExtConfig),
/* harmony export */   ExtDQ: () => (/* binding */ ExtDQ),
/* harmony export */   ExtDomQuery: () => (/* binding */ ExtDomQuery)
/* harmony export */ });
/* harmony import */ var mona_dish__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
/* harmony import */ var _core_Const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
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


/**
 * detects whether a source is a faces.js request
 *
 * @param source the source string for the faces.js request
 * @return true if a faces.js loading pattern is detected
 * @constructor
 */
const IS_FACES_SOURCE = (source) => {
    //spec version smaller 4 we have to deal with the jsf namespace
    return !!source && !!(source.search(/\/jakarta\.faces\.resource.*\/faces\.js.*/) != -1 ||
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
const IS_INTERNAL_SOURCE = (source) => {
    return source.search(/\/faces[^.]*\.js.*ln=myfaces.testscripts.*/gi) != -1 || source.search(/\/jsf[^.]*\.js.*ln=myfaces.testscripts.*/gi) != -1;
};
const ATTR_SRC = 'src';
function isRegExpMatchArray(value) {
    return value != null && value.length > 1;
}
/**
 * Extension which adds implementation specific
 * meta-data to our dom query
 *
 * Usage
 * el = new ExtDQ(oldReference)
 * nonce = el.nonce
 * windowId = el.getWindowId
 */
class ExtDomQuery extends mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ {
    static get windowId() {
        return new ExtDomQuery(document.body).windowId;
    }
    static get nonce() {
        return new ExtDomQuery(document.body).nonce;
    }
    get windowId() {
        const fetchWindowIdFromURL = function () {
            let href = window.location.href;
            let windowId = "windowId";
            let regex = new RegExp("[\\?&]" + windowId + "=([^&#\\;]*)");
            let results = regex.exec(href);
            //initial trial over the url and a regexp
            if (results != null)
                return results[1];
            return null;
        };
        //byId ($)
        if (this.value.isPresent()) {
            let result = this.querySelectorAll("form input[name='" + _core_Const__WEBPACK_IMPORTED_MODULE_1__.P_WINDOW_ID + "']");
            if (result.length > 1) {
                throw Error("Multiple different windowIds found in document");
            }
            return mona_dish__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable((result.isPresent()) ? result.getAsElem(0).value.value : fetchWindowIdFromURL());
        }
        else {
            return mona_dish__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(fetchWindowIdFromURL());
        }
    }
    /*
    * determines the faces.js nonce and adds them to the namespace
    * this is done once and only lazily
    */
    get nonce() {
        var _a;
        //already processed
        let myfacesConfig = new ExtConfig(window.myfaces);
        let globalNonce = myfacesConfig.getIf("config", "cspMeta", "nonce");
        if (!!globalNonce.value) {
            return mona_dish__WEBPACK_IMPORTED_MODULE_0__.ValueEmbedder.fromNullable(globalNonce);
        }
        let curScript = new mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ(document.currentScript);
        //since our baseline atm is ie11 we cannot use document.currentScript globally
        let nonce = curScript.nonce;
        if (nonce.isPresent()) {
            // fast-path for modern browsers
            return mona_dish__WEBPACK_IMPORTED_MODULE_0__.ValueEmbedder.fromNullable(nonce);
        }
        // fallback if the currentScript method fails, we just search the jsf tags for nonce, this is
        // the last possibility
        let nonceScript = mona_dish__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable((_a = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ
            .querySelectorAll("script[src], link[src]").asArray
            .filter((item) => item.nonce.isPresent() && item.attr(ATTR_SRC).value != null)
            .filter(item => { var _a; return IS_FACES_SOURCE((_a = item.attr(ATTR_SRC).value) !== null && _a !== void 0 ? _a : undefined); })) === null || _a === void 0 ? void 0 : _a[0]);
        if (!(nonceScript === null || nonceScript === void 0 ? void 0 : nonceScript.value)) {
            return mona_dish__WEBPACK_IMPORTED_MODULE_0__.ValueEmbedder.absent;
        }
        return new mona_dish__WEBPACK_IMPORTED_MODULE_0__.DomQuery(nonceScript.value).nonce;
    }
    static searchJsfJsFor(item) {
        return new ExtDomQuery(document).searchJsfJsFor(item);
    }
    /**
     * searches the embedded faces.js for items like separator char etc.
     * expects a match as variable under position 1 in the result match
     * @param regExp
     */
    searchJsfJsFor(regExp) {
        var _a;
        //perfect application for lazy stream
        return mona_dish__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable((_a = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.querySelectorAll("script[src], link[src]").asArray
            .filter(item => { var _a; return IS_FACES_SOURCE((_a = item.attr(ATTR_SRC).value) !== null && _a !== void 0 ? _a : undefined); })
            .map(item => { var _a; return ((_a = item.attr(ATTR_SRC).value) !== null && _a !== void 0 ? _a : "").match(regExp); })
            .filter(isRegExpMatchArray)
            .map((result) => {
            return decodeURIComponent(result[1]);
        })) === null || _a === void 0 ? void 0 : _a[0]);
    }
    globalEval(code, nonce) {
        return new ExtDomQuery(super.globalEval(code, nonce !== null && nonce !== void 0 ? nonce : this.nonce.value));
    }
    // called from base class runScripts, do not delete
    // noinspection JSUnusedGlobalSymbols
    globalEvalSticky(code, nonce) {
        return new ExtDomQuery(super.globalEvalSticky(code, nonce !== null && nonce !== void 0 ? nonce : this.nonce.value));
    }
    /**
     * decorated run scripts which takes our jsf extensions into consideration
     * (standard DomQuery will let you pass anything)
     * @param sticky if set to true the internally generated element for the script is left in the dom
     * @param whiteListed
     */
    runScripts(sticky = false, whiteListed) {
        const whitelistFunc = (src) => {
            var _a;
            return ((_a = whiteListed === null || whiteListed === void 0 ? void 0 : whiteListed(src)) !== null && _a !== void 0 ? _a : true) && !IS_FACES_SOURCE(src) && !IS_INTERNAL_SOURCE(src);
        };
        return super.runScripts(sticky, whitelistFunc);
    }
    /**
     * adds the elements in this ExtDomQuery to the head
     *
     * @param suppressDoubleIncludes checks for existing elements in the head before running the insert
     */
    runHeadInserts(suppressDoubleIncludes = true) {
        let head = ExtDomQuery.byId(document.head);
        //automated nonce handling
        let processedScripts = [];
        // the idea is only to run head inserts on resources
        // which do not exist already, that way
        // we can avoid double includes on subsequent resource
        // requests.
        function resourceIsNew(element) {
            if (!suppressDoubleIncludes) {
                return true;
            }
            const tagName = element.tagName.value;
            if (!tagName) {
                // text node they do not have tag names, so we can process them as they are without
                // any further ado
                return true;
            }
            let reference = element.attr("href")
                .orElseLazy(() => element.attr("src").value)
                .orElseLazy(() => element.attr("rel").value);
            if (!reference.isPresent()) {
                return true;
            }
            return !head.querySelectorAll(`${tagName}[href='${reference.value}']`).length &&
                !head.querySelectorAll(`${tagName}[src='${reference.value}']`).length &&
                !head.querySelectorAll(`${tagName}[rel='${reference.value}']`).length;
        }
        this
            .filter(resourceIsNew)
            .each(element => {
            if (element.tagName.value != "SCRIPT") {
                //we need to run runScripts properly to deal with the rest
                new ExtDomQuery(...processedScripts).runScripts(true);
                processedScripts = [];
                head.append(element);
            }
            else {
                processedScripts.push(element);
            }
        });
        new ExtDomQuery(...processedScripts).runScripts(true);
    }
    /**
     * byId producer
     *
     * @param selector id
     * @param deep whether the search should go into embedded shadow dom elements
     * @return a DomQuery containing the found elements
     */
    static byId(selector, deep = false) {
        var _a, _b, _c;
        const ret = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DomQuery.byId(selector, deep);
        if ((0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$faces)().getProjectStage().toLowerCase() == "development" &&
            (window === null || window === void 0 ? void 0 : window.console) && ret.isAbsent() && selector) {
            let identifier = (_c = (_b = (_a = selector === null || selector === void 0 ? void 0 : selector.id) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : selector === null || selector === void 0 ? void 0 : selector.id) !== null && _c !== void 0 ? _c : selector.toString();
            console.error("Element  " + identifier + "not found");
        }
        return new ExtDomQuery(ret);
    }
    filter(func) {
        return new ExtDomQuery(super.filter(func));
    }
}
const ExtDQ = ExtDomQuery;
/**
 * in order to reduce the number of interception points for the fallbacks we add
 * the namespace remapping straight to our config accessors
 */
class ExtConfig extends mona_dish__WEBPACK_IMPORTED_MODULE_0__.Config {
    constructor(root) {
        super(root);
        this.$nspEnabled = true;
    }
    assignIf(condition, ...accessPath) {
        const accessPathMapped = this.remap(accessPath);
        return super.assignIf(condition, ...accessPathMapped);
    }
    assign(...accessPath) {
        const accessPathMapped = this.remap(accessPath);
        return super.assign(...accessPathMapped);
    }
    append(...accessPath) {
        return super.append(...accessPath);
    }
    appendIf(condition, ...accessPath) {
        const accessPathMapped = this.remap(accessPath);
        return super.appendIf(condition, ...accessPathMapped);
    }
    getIf(...accessPath) {
        const accessPathMapped = this.remap(accessPath);
        return super.getIf(...accessPathMapped);
    }
    get(defaultVal) {
        return super.get((0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(defaultVal));
    }
    delete(key) {
        return super.delete((0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(key));
    }
    /**
     * creates a config from an initial value or null
     * @param value
     */
    static fromNullable(value) {
        return new ExtConfig(value);
    }
    getClass() {
        return ExtConfig;
    }
    /**
     * shallow copy getter, copies only the first level, references the deeper nodes
     * in a shared manner
     */
    shallowCopy$() {
        const ret = super.shallowCopy$();
        return new ExtConfig(ret);
    }
    /**
     * deep copy, copies all config nodes
     */
    get deepCopy() {
        return new ExtConfig(super.deepCopy$());
    }
    /**
     * helper to remap the namespaces of an array of access paths
     * @param accessPath the access paths to be remapped
     * @private returns an array of access paths with version remapped namespaces
     */
    remap(accessPath) {
        if (!this.$nspEnabled) {
            return accessPath;
        }
        return new mona_dish__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...accessPath).map((key) => (0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(key));
    }
}


/***/ },

/***/ "./src/main/typescript/impl/util/FileUtils.ts"
/*!****************************************************!*\
  !*** ./src/main/typescript/impl/util/FileUtils.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeEncodedValues: () => (/* binding */ decodeEncodedValues),
/* harmony export */   encodeFormData: () => (/* binding */ encodeFormData),
/* harmony export */   fixEmptyParameters: () => (/* binding */ fixEmptyParameters),
/* harmony export */   getFormInputsAsArr: () => (/* binding */ getFormInputsAsArr),
/* harmony export */   resolveFiles: () => (/* binding */ resolveFiles)
/* harmony export */ });
/* harmony import */ var mona_dish__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
/* harmony import */ var _ExtDomQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ExtDomQuery */ "./src/main/typescript/impl/util/ExtDomQuery.ts");
/* harmony import */ var _core_Const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");



/*
 * various routines for encoding and decoding url parameters
 * into configs and vice versa
 */
/**
 * encodes a given form data into a url encoded string
 * @param formData the form data config object
 * @param paramsMapper the params mapper
 * @param defaultStr a default string if nothing comes out of it
 */
function encodeFormData(formData, paramsMapper = (inStr, inVal) => [inStr, inVal], defaultStr = _core_Const__WEBPACK_IMPORTED_MODULE_2__.EMPTY_STR) {
    if (formData.isAbsent()) {
        return defaultStr;
    }
    const assocValues = formData.value;
    const expandValueArrAndRename = (key) => assocValues[key].map((val) => paramsMapper(key, val));
    const isPropertyKey = (key) => assocValues.hasOwnProperty(key);
    const isNotFile = ([, value]) => !(value instanceof _ExtDomQuery__WEBPACK_IMPORTED_MODULE_1__.ExtDomQuery.global().File);
    const mapIntoUrlParam = (keyVal) => `${encodeURIComponent(keyVal[0])}=${encodeURIComponent(keyVal[1])}`;
    return new mona_dish__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...Object.keys(assocValues))
        .filter(isPropertyKey)
        .flatMap(expandValueArrAndRename)
        .filter(isNotFile)
        .map(mapIntoUrlParam)
        .join("&");
}
/**
 * splits and decodes encoded values into strings containing of key=value
 * @param encoded encoded string
 */
function decodeEncodedValues(encoded) {
    const filterBlanks = (item) => !!(item || '').replace(/\s+/g, '');
    const splitKeyValuePair = (_line) => {
        let line = decodeURIComponent(_line);
        let index = line.indexOf("=");
        if (index == -1) {
            return [line];
        }
        return [line.substring(0, index), line.substring(index + 1)];
    };
    let requestParamEntries = encoded.split(/&/gi);
    return requestParamEntries.filter(filterBlanks).map(splitKeyValuePair);
}
/**
 * gets all the input files and their corresponding file objects
 * @param dataSource
 */
function resolveFiles(dataSource) {
    const expandFilesArr = ([key, files]) => {
        return [...files].map((file) => [key, file]);
    };
    const remapFileInput = (fileInput) => {
        return [fileInput.name.value || fileInput.id.value, fileInput.filesFromElem(0)];
    };
    const files = dataSource
        .querySelectorAllDeep("input[type='file']")
        .asArray;
    const ret = files
        .map(remapFileInput)
        .flatMap(expandFilesArr);
    return ret;
}
function fixEmptyParameters(keyVal) {
    var _a, _b;
    return (keyVal.length < 3 ? [(_a = keyVal === null || keyVal === void 0 ? void 0 : keyVal[0]) !== null && _a !== void 0 ? _a : [], (_b = keyVal === null || keyVal === void 0 ? void 0 : keyVal[1]) !== null && _b !== void 0 ? _b : []] : keyVal);
}
/**
 * returns the decoded viewState from parentItem
 * @param parentItem
 */
function resolveViewState(parentItem) {
    const viewStateStr = (0,_core_Const__WEBPACK_IMPORTED_MODULE_2__.$faces)().getViewState(parentItem.getAsElem(0).value);
    // we now need to decode it and then merge it into the target buf
    // which hosts already our overrides (aka do not override what is already there(
    // after that we need to deal with form elements on a separate level
    return decodeEncodedValues(viewStateStr);
}
/**
 * gets all the inputs under the form parentItem
 * as array
 * @param parentItem
 */
function getFormInputsAsArr(parentItem) {
    const standardInputs = resolveViewState(parentItem);
    const fileInputs = resolveFiles(parentItem);
    return standardInputs.concat(fileInputs);
}


/***/ },

/***/ "./src/main/typescript/impl/util/HiddenInputBuilder.ts"
/*!*************************************************************!*\
  !*** ./src/main/typescript/impl/util/HiddenInputBuilder.ts ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HiddenInputBuilder: () => (/* binding */ HiddenInputBuilder)
/* harmony export */ });
/* harmony import */ var mona_dish__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
/* harmony import */ var _core_Const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
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
 */


/**
 * Builder for hidden inputs.
 * ATM only ViewState and Client window
 * are supported (per spec)
 *
 * Improves readability in the response processor!
 */
class HiddenInputBuilder {
    constructor(selector) {
        this.selector = selector;
        this.namedViewRoot = false;
        const isViewState = selector.indexOf((0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_1__.P_VIEWSTATE)) != -1;
        this.name = isViewState ? _core_Const__WEBPACK_IMPORTED_MODULE_1__.P_VIEWSTATE : _core_Const__WEBPACK_IMPORTED_MODULE_1__.P_CLIENT_WINDOW;
        this.template = isViewState ? _core_Const__WEBPACK_IMPORTED_MODULE_1__.HTML_VIEWSTATE : _core_Const__WEBPACK_IMPORTED_MODULE_1__.HTML_CLIENT_WINDOW;
    }
    withNamingContainerId(namingContainer) {
        this.namingContainerId = namingContainer;
        return this;
    }
    withParent(parent) {
        this.parent = parent;
        return this;
    }
    withNamedViewRoot(namedViewRoot) {
        this.namedViewRoot = namedViewRoot;
        return this;
    }
    build() {
        var _a, _b, _c;
        const SEP = (0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$faces)().separatorchar;
        let existingStates = (0,mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ$)(`[name*='${(0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(this.name)}']`);
        let cnt = existingStates.asArray.map(state => {
            let ident = state.id.orElse("0").value;
            ident = ident.substring(ident.lastIndexOf(SEP) + 1);
            return parseInt(ident);
        })
            .filter(item => {
            return !isNaN(item);
        })
            .reduce((item1, item2) => {
            return Math.max(item1, item2);
        }, 0); //we start with 1 (see cnt++)
        //the maximum  new ident is the current max + 1
        cnt++;
        const newElement = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.fromMarkup((0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(this.template));
        newElement.id.value = (((_a = this.namingContainerId) === null || _a === void 0 ? void 0 : _a.length) ?
            [this.namingContainerId, (0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(this.name), cnt] :
            [(0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(this.name), cnt]).join(SEP);
        //name must be prefixed with the naming container id as well according to the jsdocs
        if (this.namedViewRoot) {
            newElement.name.value = ((_b = this.namingContainerId) === null || _b === void 0 ? void 0 : _b.length) ?
                [this.namingContainerId, (0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(this.name)].join(SEP) : (0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(this.name);
        }
        else {
            newElement.name.value = (0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(this.name);
        }
        (_c = this === null || this === void 0 ? void 0 : this.parent) === null || _c === void 0 ? void 0 : _c.append(newElement);
        return newElement;
    }
}


/***/ },

/***/ "./src/main/typescript/impl/util/Lang.ts"
/*!***********************************************!*\
  !*** ./src/main/typescript/impl/util/Lang.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExtLang: () => (/* binding */ ExtLang)
/* harmony export */ });
/* harmony import */ var mona_dish__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
/* harmony import */ var _i18n_Messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n/Messages */ "./src/main/typescript/impl/i18n/Messages.ts");
/* harmony import */ var _core_Const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
/* harmony import */ var _xhrCore_RequestDataResolver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../xhrCore/RequestDataResolver */ "./src/main/typescript/impl/xhrCore/RequestDataResolver.ts");
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
 */





var ExtLang;
(function (ExtLang) {
    let installedLocale;
    let nameSpace = "impl/util/Lang/";
    function getLanguage() {
        //TODO global config override
        var _a, _b;
        let language = (_b = (_a = navigator.languages) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : navigator === null || navigator === void 0 ? void 0 : navigator.language;
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
    function failSaveResolve(resolverProducer, defaultValue = null) {
        return mona_dish__WEBPACK_IMPORTED_MODULE_0__.Lang.saveResolve(resolverProducer, defaultValue);
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
    function failSaveExecute(resolverProducer, defaultValue = null) {
        mona_dish__WEBPACK_IMPORTED_MODULE_0__.Lang.saveResolve(resolverProducer, defaultValue);
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
    function getMessage(key, defaultMessage, ...templateParams) {
        var _a, _b;
        installedLocale = installedLocale !== null && installedLocale !== void 0 ? installedLocale : new _i18n_Messages__WEBPACK_IMPORTED_MODULE_1__.Messages();
        let msg = (_b = (_a = installedLocale[key]) !== null && _a !== void 0 ? _a : defaultMessage) !== null && _b !== void 0 ? _b : key;
        templateParams.forEach((param, cnt) => {
            msg = msg.replace(new RegExp(["\\{", cnt, "\\}"].join(_core_Const__WEBPACK_IMPORTED_MODULE_2__.EMPTY_STR), "g"), param);
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
    function keyValToStr(key, val, delimiter = "\n") {
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
        return new Error(message + (callerCls !== null && callerCls !== void 0 ? callerCls : nameSpace) + callFunc);
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
        let queryElem = new mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ(elem);
        let eventTarget = (event) ? new mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ((0,_xhrCore_RequestDataResolver__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(event)) : mona_dish__WEBPACK_IMPORTED_MODULE_0__.DomQuery.absent;
        if (queryElem.isTag(_core_Const__WEBPACK_IMPORTED_MODULE_2__.HTML_TAG_FORM)) {
            return queryElem;
        }
        //html 5 for handling
        if (queryElem.attr(_core_Const__WEBPACK_IMPORTED_MODULE_2__.HTML_TAG_FORM).isPresent()) {
            let formId = queryElem.attr(_core_Const__WEBPACK_IMPORTED_MODULE_2__.HTML_TAG_FORM).value;
            let foundForm = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId(formId, true);
            if (foundForm.isPresent()) {
                return foundForm;
            }
        }
        //no direct form is found we look for parent/child relationships as fallback
        //(90% case)
        let form = queryElem.firstParent(_core_Const__WEBPACK_IMPORTED_MODULE_2__.HTML_TAG_FORM)
            .orElseLazy(() => queryElem.byTagName(_core_Const__WEBPACK_IMPORTED_MODULE_2__.HTML_TAG_FORM, true))
            .orElseLazy(() => eventTarget.firstParent(_core_Const__WEBPACK_IMPORTED_MODULE_2__.HTML_TAG_FORM))
            .orElseLazy(() => eventTarget.byTagName(_core_Const__WEBPACK_IMPORTED_MODULE_2__.HTML_TAG_FORM))
            .first();
        //either a form is found within parent child - nearest form (aka first)
        //or we look for a single form
        form = form.orElseLazy(() => mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byTagName(_core_Const__WEBPACK_IMPORTED_MODULE_2__.HTML_TAG_FORM));
        //the end result must be a found form otherwise - Exception
        assertOnlyOneFormExists(form);
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
     * expands an associative array into an array of key value tuples
     * @param value
     */
    function ofAssoc(value) {
        return new mona_dish__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...Object.keys(value))
            .map((key) => [key, value[key]]);
    }
    ExtLang.ofAssoc = ofAssoc;
    function collectAssoc(target, item) {
        target[item[0]] = item[1];
        return target;
    }
    ExtLang.collectAssoc = collectAssoc;
    /**
     * The active timeout for the "debounce".
     * Since we only use it in the XhrController
     * we can use a local module variable here
     */
    let activeTimeouts = {};
    /**
     * a simple debounce function
     * which waits until a timeout is reached and
     * if something comes in in between debounces
     *
     * @param runnable a runnable which should go under debounce control
     * @param timeout a timeout for the debounce window
     */
    function debounce(key, runnable, timeout) {
        function clearActiveTimeout() {
            clearTimeout(activeTimeouts[key]);
            delete activeTimeouts[key];
        }
        if (!!(activeTimeouts === null || activeTimeouts === void 0 ? void 0 : activeTimeouts[key])) {
            clearActiveTimeout();
        }
        if (timeout > 0) {
            activeTimeouts[key] = setTimeout(() => {
                try {
                    runnable();
                }
                finally {
                    clearActiveTimeout();
                }
            }, timeout);
        }
        else {
            runnable();
        }
    }
    ExtLang.debounce = debounce;
    /**
     * assert that the form exists and only one form exists and throw an exception in the case it does not
     *
     * @param forms the form to check for
     */
    function assertOnlyOneFormExists(forms) {
        if (forms.isAbsent() || forms.length > 1) {
            throw makeException(new Error(), null, null, "Impl", "getForm", getMessage("ERR_FORM"));
        }
    }
})(ExtLang || (ExtLang = {}));


/***/ },

/***/ "./src/main/typescript/impl/util/XhrQueueController.ts"
/*!*************************************************************!*\
  !*** ./src/main/typescript/impl/util/XhrQueueController.ts ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XhrQueueController: () => (/* binding */ XhrQueueController)
/* harmony export */ });
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lang */ "./src/main/typescript/impl/util/Lang.ts");

const debounce = _Lang__WEBPACK_IMPORTED_MODULE_0__.ExtLang.debounce;
/**
 * A simple XHR queue controller
 * following the async op -> next pattern
 * Faces enforces for the XHR handling
 */
class XhrQueueController {
    constructor() {
        this.queue = [];
        this.taskRunning = false;
    }
    /**
     * executes or enqueues an element
     * @param runnable the runnable (request) to be enqueued
     * @param timeOut timeout if > 0 which defers the execution
     * until the debounce window for the timeout is closed.
     */
    enqueue(runnable, timeOut = 0) {
        debounce("xhrQueue", () => {
            const requestHandler = this.enrichRunnable(runnable);
            if (!this.taskRunning) {
                this.signalTaskRunning();
                requestHandler.start();
            }
            else {
                this.queue.push(requestHandler);
            }
        }, timeOut);
    }
    /**
     * trigger the next element in the queue
     * to be started!
     */
    next() {
        this.updateTaskRunning();
        const next = this.queue.shift();
        next === null || next === void 0 ? void 0 : next.start();
    }
    /**
     * clears and resets the queue
     */
    clear() {
        this.queue.length = 0;
        this.updateTaskRunning();
    }
    /**
     * true if queue is empty
     */
    get isEmpty() {
        return !this.queue.length;
    }
    /**
     * Enriches the incoming async asyncRunnable
     * with the error and next handling
     * (aka: asyncRunnable is done -> next
     *                   error -> clear queue
     * @param asyncRunnable the async runnable which needs enrichment
     * @private
     */
    enrichRunnable(asyncRunnable) {
        /**
         * we can use the Promise pattern asyncrunnable uses
         * to trigger queue control callbacks of next element
         * and clear the queue (theoretically this
         * would work with any promise)
         */
        return asyncRunnable
            .then(() => this.next())
            .catch(() => this.clear());
    }
    /**
     * alerts the queue that a task is running
     *
     * @private
     */
    signalTaskRunning() {
        this.taskRunning = true;
    }
    /**
     * updates the task running status according to the current queue
     * @private
     */
    updateTaskRunning() {
        this.taskRunning = !this.isEmpty;
    }
}


/***/ },

/***/ "./src/main/typescript/impl/xhrCore/ErrorData.ts"
/*!*******************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/ErrorData.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorData: () => (/* binding */ ErrorData),
/* harmony export */   ErrorType: () => (/* binding */ ErrorType)
/* harmony export */ });
/* harmony import */ var _core_Const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
/* harmony import */ var mona_dish__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
/* harmony import */ var _EventData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EventData */ "./src/main/typescript/impl/xhrCore/EventData.ts");
/* harmony import */ var _util_Lang__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/Lang */ "./src/main/typescript/impl/util/Lang.ts");
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




const getMessage = _util_Lang__WEBPACK_IMPORTED_MODULE_3__.ExtLang.getMessage;
var ErrorType;
(function (ErrorType) {
    ErrorType["SERVER_ERROR"] = "serverError";
    ErrorType["HTTP_ERROR"] = "httpError";
    ErrorType["CLIENT_ERROR"] = "clientError";
    ErrorType["TIMEOUT"] = "timeout";
})(ErrorType || (ErrorType = {}));
/**
 * the spec has a problem of having the error
 * object somewhat underspecified, there is no clear
 * description of the required contents.
 * I want to streamline it with mojarra here
 * hence we are going to move
 * everything into the same attributes,
 * I will add deprecated myfaces backwards compatibility attributes as well
 */
class ErrorData extends _EventData__WEBPACK_IMPORTED_MODULE_2__.EventData {
    constructor(source, errorName, errorMessage, responseText = null, responseXML = null, responseCode = -1, statusOverride = null, type = ErrorType.CLIENT_ERROR) {
        super();
        this.type = "error";
        ///MYFACES-4676 error payload expects an element if possible
        //this code remaps the string in an element and if not existing just passes as is what comes in
        this.source = mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.byId(source).value.orElse(source).value;
        this.type = _core_Const__WEBPACK_IMPORTED_MODULE_0__.ERROR;
        this.errorName = errorName;
        //tck requires that the type is prefixed to the message itself (jsdoc also) in case of a server error
        this.errorMessage = (type == ErrorType.SERVER_ERROR) ? type + ": " + errorMessage : errorMessage;
        this.responseCode = responseCode;
        this.responseText = responseText;
        this.responseXML = responseXML;
        this.status = statusOverride;
        this.description = `Status: ${this.status}\nResponse Code: ${this.responseCode}\nError Message: ${this.errorMessage}`;
        this.typeDetails = type;
        if (type == ErrorType.SERVER_ERROR) {
            this.serverErrorName = this.errorName;
            this.serverErrorMessage = this.errorMessage;
        }
    }
    static fromClient(e) {
        var _a, _b, _c, _d;
        return new ErrorData((_a = e === null || e === void 0 ? void 0 : e.source) !== null && _a !== void 0 ? _a : "client", (_b = e === null || e === void 0 ? void 0 : e.name) !== null && _b !== void 0 ? _b : _core_Const__WEBPACK_IMPORTED_MODULE_0__.EMPTY_STR, (_c = e === null || e === void 0 ? void 0 : e.message) !== null && _c !== void 0 ? _c : _core_Const__WEBPACK_IMPORTED_MODULE_0__.EMPTY_STR, (_d = e === null || e === void 0 ? void 0 : e.stack) !== null && _d !== void 0 ? _d : _core_Const__WEBPACK_IMPORTED_MODULE_0__.EMPTY_STR);
    }
    static fromHttpConnection(source, name, message, responseText, responseXML, responseCode, status = _core_Const__WEBPACK_IMPORTED_MODULE_0__.EMPTY_STR) {
        return new ErrorData(source, name, message, responseText, responseXML, responseCode, status, ErrorType.HTTP_ERROR);
    }
    static fromGeneric(context, errorCode, errorType = ErrorType.SERVER_ERROR) {
        let getMsg = this.getMsg;
        let source = getMsg(context, _core_Const__WEBPACK_IMPORTED_MODULE_0__.SOURCE);
        let errorName = getMsg(context, _core_Const__WEBPACK_IMPORTED_MODULE_0__.ERROR_NAME);
        let errorMessage = getMsg(context, _core_Const__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE);
        let status = getMsg(context, _core_Const__WEBPACK_IMPORTED_MODULE_0__.STATUS);
        let responseText = getMsg(context, _core_Const__WEBPACK_IMPORTED_MODULE_0__.RESPONSE_TEXT);
        let responseXML = context.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_0__.RESPONSE_XML).value;
        return new ErrorData(source, errorName, errorMessage, responseText, responseXML, errorCode, status, errorType);
    }
    static getMsg(context, param) {
        return getMessage(context.getIf(param).orElse(_core_Const__WEBPACK_IMPORTED_MODULE_0__.EMPTY_STR).value);
    }
    static fromServerError(context) {
        return this.fromGeneric(context, -1);
    }
}


/***/ },

/***/ "./src/main/typescript/impl/xhrCore/EventData.ts"
/*!*******************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/EventData.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventData: () => (/* binding */ EventData)
/* harmony export */ });
/* harmony import */ var mona_dish__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
/* harmony import */ var _core_Const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
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


class EventData {
    static createFromRequest(request, internalContext, context, /*event name*/ name) {
        let eventData = new EventData();
        let internalSource = "_internal._source";
        eventData.type = _core_Const__WEBPACK_IMPORTED_MODULE_1__.EVENT;
        eventData.status = name;
        eventData.source = internalContext.getIf("_source", "_element").value;
        // this fixes the issue that the source element is not present anymore at done
        // at page transitions
        if (!eventData.source) {
            let sourceId = context.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_1__.SOURCE)
                .orElseLazy(() => context.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_1__.P_AJAX_SOURCE).value)
                .orElseLazy(() => context.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_1__.CTX_PARAM_REQ_PASS_THR, _core_Const__WEBPACK_IMPORTED_MODULE_1__.P_AJAX_SOURCE).value)
                .value;
            if (sourceId) {
                eventData.source = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId(sourceId, true).first().value.value;
            }
            if (eventData.source) {
                //we store the event source for later references
                internalContext.assign("_source", "_element").value = eventData.source;
            }
        }
        if (name !== _core_Const__WEBPACK_IMPORTED_MODULE_1__.BEGIN) {
            eventData.responseCode = request === null || request === void 0 ? void 0 : request.status;
            eventData.responseText = request === null || request === void 0 ? void 0 : request.responseText;
            eventData.responseXML = request === null || request === void 0 ? void 0 : request.responseXML;
        }
        return eventData;
    }
}


/***/ },

/***/ "./src/main/typescript/impl/xhrCore/RequestDataResolver.ts"
/*!*****************************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/RequestDataResolver.ts ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEventTarget: () => (/* binding */ getEventTarget),
/* harmony export */   resolveDefaults: () => (/* binding */ resolveDefaults),
/* harmony export */   resolveDelay: () => (/* binding */ resolveDelay),
/* harmony export */   resolveFinalUrl: () => (/* binding */ resolveFinalUrl),
/* harmony export */   resolveForm: () => (/* binding */ resolveForm),
/* harmony export */   resolveHandlerFunc: () => (/* binding */ resolveHandlerFunc),
/* harmony export */   resolveTargetUrl: () => (/* binding */ resolveTargetUrl),
/* harmony export */   resolveTimeout: () => (/* binding */ resolveTimeout),
/* harmony export */   resolveViewId: () => (/* binding */ resolveViewId),
/* harmony export */   resolveViewRootId: () => (/* binding */ resolveViewRootId),
/* harmony export */   resolveWindowId: () => (/* binding */ resolveWindowId),
/* harmony export */   resoveNamingContainerMapper: () => (/* binding */ resoveNamingContainerMapper)
/* harmony export */ });
/* harmony import */ var mona_dish__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
/* harmony import */ var _core_Const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
/* harmony import */ var _util_Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/Lang */ "./src/main/typescript/impl/util/Lang.ts");
/* harmony import */ var _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/ExtDomQuery */ "./src/main/typescript/impl/util/ExtDomQuery.ts");
/* harmony import */ var _util_Assertions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/Assertions */ "./src/main/typescript/impl/util/Assertions.ts");
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
    responseContext = responseContext || new mona_dish__WEBPACK_IMPORTED_MODULE_0__.Config({});
    return responseContext.getIf(funcName)
        .orElseLazy(() => requestContext.getIf(funcName).value)
        .orElse(_core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_FUNC).value;
}
function resolveTargetUrl(srcFormElement) {
    const formElements = srcFormElement.elements;
    return (typeof formElements[_core_Const__WEBPACK_IMPORTED_MODULE_1__.ENCODED_URL] == 'undefined') ?
        srcFormElement.action :
        formElements[_core_Const__WEBPACK_IMPORTED_MODULE_1__.ENCODED_URL].value;
}
function resolveFinalUrl(sourceForm, formData, ajaxType = _core_Const__WEBPACK_IMPORTED_MODULE_1__.REQ_TYPE_POST) {
    let targetUrl = resolveTargetUrl(sourceForm.getAsElem(0).value);
    return targetUrl + (ajaxType == _core_Const__WEBPACK_IMPORTED_MODULE_1__.REQ_TYPE_GET ? "?" + formData.toString() : _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR);
}
/**
 * form resolution the same way our old implementation did
 * it is either the id or the parent form of the element or an embedded form
 * of the element
 *
 * @param elem
 * @param event
 */
function resolveForm(elem, event) {
    return _util_Lang__WEBPACK_IMPORTED_MODULE_2__.ExtLang.getForm(elem.getAsElem(0).value, event);
}
function resolveViewId(form) {
    const viewState = form.querySelectorAll(`input[type='hidden'][name*='${(0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_1__.P_VIEWSTATE)}']`).id.orElse("").value;
    const divider = (0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$faces)().separatorchar;
    const viewId = viewState.split(divider, 2)[0];
    const viewStateViewId = viewId.indexOf((0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_1__.P_VIEWSTATE)) === -1 ? viewId : "";
    // myfaces specific, we in non portlet environments prepend the viewId
    // even without being in a naming container, the other components ignore that
    return form.id.value.indexOf(viewStateViewId) === 0 ? viewStateViewId : "";
}
function resolveViewRootId(form) {
    const viewState = form.querySelectorAll(`input[type='hidden'][name*='${(0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_1__.P_VIEWSTATE)}']`).attr("name").orElse("").value;
    const divider = (0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$faces)().separatorchar;
    const viewId = viewState.split(divider, 2)[0];
    //different to the identifier the form id is never prepended to the viewstate
    return viewId.indexOf((0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_1__.P_VIEWSTATE)) === -1 ? viewId : "";
}
/**
 * as per jsdoc before the request it must be ensured that every post argument
 * is prefixed with the naming container id (there is an exception in mojarra with
 * the element=element param, which we have to follow here as well.
 * (inputs are prefixed by name anyway normally this only affects our standard parameters)
 * @private
 */
function resoveNamingContainerMapper(internalContext) {
    const isNamedViewRoot = internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_1__.NAMED_VIEWROOT).isPresent();
    if (!isNamedViewRoot) {
        return (key, value) => [key, value];
    }
    const partialId = internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_1__.NAMING_CONTAINER_ID).value;
    const SEP = (0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$faces)().separatorchar;
    const prefix = partialId + SEP;
    return (key, value) => (key.indexOf(prefix) == 0) ? [key, value] : [prefix + key, value];
}
function resolveTimeout(options) {
    var _a;
    let getCfg = _util_Lang__WEBPACK_IMPORTED_MODULE_2__.ExtLang.getLocalOrGlobalConfig;
    return (_a = options.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_1__.CTX_OPTIONS_TIMEOUT).value) !== null && _a !== void 0 ? _a : getCfg(options.value, _core_Const__WEBPACK_IMPORTED_MODULE_1__.CTX_OPTIONS_TIMEOUT, 0);
}
/**
 * resolve the delay from the options and/or the request context and or the configuration
 *
 * @param options ... the options object, in most cases it will host the delay value
 */
function resolveDelay(options) {
    // null, 'none', or undefined will automatically be mapped to 0 aka no delay
    // the config delay will be dropped not needed anymore, it does not really
    // make sense anymore now that it is part of a local spec
    let ret = options.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_1__.CTX_OPTIONS_DELAY).orElse(0).value;
    // if delay === none, no delay must be used, aka delay 0
    ret = (_core_Const__WEBPACK_IMPORTED_MODULE_1__.DELAY_NONE === ret) ? 0 : ret;
    // negative, or invalid values will automatically get a js exception
    _util_Assertions__WEBPACK_IMPORTED_MODULE_4__.Assertions.assertDelay(ret);
    return ret;
}
/**
 * resolves the window-id from various sources
 *
 * @param options
 */
function resolveWindowId(options) {
    var _a, _b;
    return (_b = (_a = options === null || options === void 0 ? void 0 : options.value) === null || _a === void 0 ? void 0 : _a.windowId) !== null && _b !== void 0 ? _b : _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_3__.ExtDomQuery.windowId.value;
}
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
    let finalEvent = evt;
    /*
     * evt source is defined in the jsf events
     * seems like some component authors use our code,
     * so we add it here see also
     * https://issues.apache.org/jira/browse/MYFACES-2458
     * not entirely a bug but makes sense to add this
     * behavior. I don´t use it that way but nevertheless it
     * does not break anything so why not
     */
    let t = (_b = (_a = finalEvent === null || finalEvent === void 0 ? void 0 : finalEvent.srcElement) !== null && _a !== void 0 ? _a : finalEvent === null || finalEvent === void 0 ? void 0 : finalEvent.target) !== null && _b !== void 0 ? _b : finalEvent === null || finalEvent === void 0 ? void 0 : finalEvent.source;
    while ((t) && (t.nodeType != 1)) {
        t = t.parentNode;
    }
    return t;
}
/**
 * resolves a bunch of default values
 * which can be further processed from the given
 * call parameters of faces.ajax.request
 *
 * @param event
 * @param opts
 * @param el
 */
function resolveDefaults(event, opts, el = null) {
    var _a;
    //deep copy the options, so that further transformations to not backfire into the callers
    const elem = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId(el || event.target, true);
    const options = new _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_3__.ExtConfig(opts).deepCopy;
    return {
        options: options,
        elem: elem,
        elementId: elem.id.value,
        windowId: resolveWindowId(options),
        isResetValues: true === ((_a = options.value) === null || _a === void 0 ? void 0 : _a.resetValues)
    };
}


/***/ },

/***/ "./src/main/typescript/impl/xhrCore/Response.ts"
/*!******************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/Response.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Response: () => (/* binding */ Response)
/* harmony export */ });
/* harmony import */ var mona_dish__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
/* harmony import */ var _ResponseProcessor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResponseProcessor */ "./src/main/typescript/impl/xhrCore/ResponseProcessor.ts");
/* harmony import */ var _core_Const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
/* harmony import */ var _ResponseDataResolver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ResponseDataResolver */ "./src/main/typescript/impl/xhrCore/ResponseDataResolver.ts");
/* harmony import */ var _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/ExtDomQuery */ "./src/main/typescript/impl/util/ExtDomQuery.ts");
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
        let req = _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_4__.ExtConfig.fromNullable(request);
        let { externalContext, internalContext } = (0,_ResponseDataResolver__WEBPACK_IMPORTED_MODULE_3__.resolveContexts)(context);
        let responseXML = (0,_ResponseDataResolver__WEBPACK_IMPORTED_MODULE_3__.resolveResponseXML)(req);
        let responseProcessor = new _ResponseProcessor__WEBPACK_IMPORTED_MODULE_1__.ResponseProcessor(req, externalContext, internalContext);
        internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_2__.RESPONSE_XML).value = responseXML;
        // we now process the partial tags, or in none given raise an error
        responseXML.querySelectorAll(_core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_PARTIAL_RESP)
            .each(item => processPartialTag(item, responseProcessor, internalContext));
        // We now process the viewStates, client windows and the elements to be evaluated are delayed.
        // The reason for this is that often it is better
        // to wait until the document has caught up before
        // doing any evaluations even on embedded scripts.
        // Usually this does not matter, the client window comes in almost last always anyway
        // we maybe drop this deferred assignment in the future, but myfaces did it until now.
        responseProcessor.updateNamedViewRootState();
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
        /*
        https://javaee.github.io/javaserverfaces/docs/2.2/javadocs/web-partialresponse.html#ns_xsd
        The "partial-response" element is the root of the partial response information hierarchy,
        and contains nested elements for all possible elements that can exist in the response.
        This element must have an "id" attribute whose value is the return from calling getContainerClientId()
        on the UIViewRoot to which this response pertains.
         */
        // we can determine whether we are in a naming container scenario by checking whether the passed view id is present in the page
        // under or in body as identifier
        var _a;
        let partialId = (_a = node === null || node === void 0 ? void 0 : node.id) === null || _a === void 0 ? void 0 : _a.value;
        internalContext.assignIf(!!partialId, _core_Const__WEBPACK_IMPORTED_MODULE_2__.NAMING_CONTAINER_ID).value = partialId; // second case mojarra
        // there must be at least one container viewstate element resembling the viewroot that we know
        // this is named
        responseProcessor.updateNamedViewRootState();
        const SEL_SUB_TAGS = [_core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_ERROR, _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_REDIRECT, _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_CHANGES].join(",");
        // now we can process the main operations
        node.querySelectorAll(SEL_SUB_TAGS).each((node) => {
            switch (node.tagName.value) {
                case _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_ERROR:
                    responseProcessor.error(node);
                    break;
                case _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_REDIRECT:
                    responseProcessor.redirect(node);
                    break;
                case _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_CHANGES:
                    processChangesTag(node, responseProcessor);
                    break;
            }
        });
    }
    let processInsert = function (responseProcessor, node) {
        // path1 insert after as child tags
        if (node.querySelectorAll([_core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_BEFORE, _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_AFTER].join(",")).length) {
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
        const ALLOWED_TAGS = [_core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_UPDATE, _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_EVAL, _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_INSERT, _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_DELETE, _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_ATTRIBUTES, _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_EXTENSION].join(", ");
        node.querySelectorAll(ALLOWED_TAGS).each((node) => {
            switch (node.tagName.value) {
                case _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_UPDATE:
                    processUpdateTag(node, responseProcessor);
                    break;
                case _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_EVAL:
                    responseProcessor.eval(node);
                    break;
                case _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_INSERT:
                    processInsert(responseProcessor, node);
                    break;
                case _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_DELETE:
                    responseProcessor.delete(node);
                    break;
                case _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_ATTRIBUTES:
                    responseProcessor.attributes(node);
                    break;
                case _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_EXTENSION:
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
        let cdataBlock = node.cDATAAsString;
        switch (node.id.value) {
            case (0,_core_Const__WEBPACK_IMPORTED_MODULE_2__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_2__.P_VIEWROOT):
                responseProcessor.replaceViewRoot(mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.fromMarkup(cdataBlock.substring(cdataBlock.indexOf("<html"))));
                break;
            case (0,_core_Const__WEBPACK_IMPORTED_MODULE_2__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_2__.P_VIEWHEAD):
                responseProcessor.replaceHead(mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.fromMarkup(cdataBlock));
                break;
            case (0,_core_Const__WEBPACK_IMPORTED_MODULE_2__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_2__.P_VIEWBODY):
                responseProcessor.replaceBody(mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.fromMarkup(cdataBlock));
                break;
            case (0,_core_Const__WEBPACK_IMPORTED_MODULE_2__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_2__.P_RESOURCE):
                responseProcessor.addToHead(mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.fromMarkup(cdataBlock));
                break;
            default: // htmlItem replacement
                responseProcessor.update(node, cdataBlock);
                break;
        }
    }
})(Response || (Response = {}));


/***/ },

/***/ "./src/main/typescript/impl/xhrCore/ResponseDataResolver.ts"
/*!******************************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/ResponseDataResolver.ts ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveContexts: () => (/* binding */ resolveContexts),
/* harmony export */   resolveResponseXML: () => (/* binding */ resolveResponseXML),
/* harmony export */   resolveSourceElement: () => (/* binding */ resolveSourceElement),
/* harmony export */   resolveSourceForm: () => (/* binding */ resolveSourceForm)
/* harmony export */ });
/* harmony import */ var mona_dish__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
/* harmony import */ var _util_Assertions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Assertions */ "./src/main/typescript/impl/util/Assertions.ts");
/* harmony import */ var _core_Const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
/* harmony import */ var _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/ExtDomQuery */ "./src/main/typescript/impl/util/ExtDomQuery.ts");
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
    let ret = new mona_dish__WEBPACK_IMPORTED_MODULE_0__.XMLQuery((0,_core_Const__WEBPACK_IMPORTED_MODULE_2__.$nsp)(request.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_2__.SEL_RESPONSE_XML).value));
    _util_Assertions__WEBPACK_IMPORTED_MODULE_1__.Assertions.assertValidXMLResponse(ret);
    return ret;
}
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
    let externalContext = _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_3__.ExtConfig.fromNullable(context);
    let internalContext = externalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_2__.CTX_PARAM_MF_INTERNAL);
    if (!internalContext.isPresent()) {
        internalContext = _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_3__.ExtConfig.fromNullable({});
    }
    /**
     * prepare storage for some deferred operations
     */
    internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_2__.DEFERRED_HEAD_INSERTS).value = [];
    internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_2__.UPDATE_FORMS).value = [];
    internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_2__.UPDATE_ELEMS).value = [];
    return { externalContext, internalContext };
}
/**
 * fetches the source element out of our contexts
 *
 * @param context the external context which should host the source id
 * @param internalContext internal pass-through fall back
 *
 */
function resolveSourceElement(context, internalContext) {
    let elemId = resolveSourceElementId(context, internalContext);
    return mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId(elemId.value, true);
}
/**
 * fetches the source form if it still exists
 * also embedded forms and parent forms are taken into consideration
 * as fallbacks
 *
 * @param internalContext
 * @param elem
 */
function resolveSourceForm(internalContext, elem) {
    let sourceFormId = internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_2__.CTX_PARAM_SRC_FRM_ID);
    let sourceForm = new mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ(sourceFormId.isPresent() ? document.forms[sourceFormId.value] : null);
    sourceForm = sourceForm.orElseLazy(() => elem.firstParent(_core_Const__WEBPACK_IMPORTED_MODULE_2__.HTML_TAG_FORM))
        .orElseLazy(() => elem.querySelectorAll(_core_Const__WEBPACK_IMPORTED_MODULE_2__.HTML_TAG_FORM))
        .orElseLazy(() => mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.querySelectorAll(_core_Const__WEBPACK_IMPORTED_MODULE_2__.HTML_TAG_FORM));
    return sourceForm;
}
function resolveSourceElementId(context, internalContext) {
    //?internal context?? used to be external one
    return internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_2__.CTX_PARAM_SRC_CTL_ID)
        .orElseLazy(() => context.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_2__.SOURCE, "id").value);
}


/***/ },

/***/ "./src/main/typescript/impl/xhrCore/ResponseProcessor.ts"
/*!***************************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/ResponseProcessor.ts ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResponseProcessor: () => (/* binding */ ResponseProcessor)
/* harmony export */ });
/* harmony import */ var mona_dish__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
/* harmony import */ var _AjaxImpl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AjaxImpl */ "./src/main/typescript/impl/AjaxImpl.ts");
/* harmony import */ var _util_Assertions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/Assertions */ "./src/main/typescript/impl/util/Assertions.ts");
/* harmony import */ var _ErrorData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ErrorData */ "./src/main/typescript/impl/xhrCore/ErrorData.ts");
/* harmony import */ var _core_ImplTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/ImplTypes */ "./src/main/typescript/impl/core/ImplTypes.ts");
/* harmony import */ var _EventData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EventData */ "./src/main/typescript/impl/xhrCore/EventData.ts");
/* harmony import */ var _core_Const__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
/* harmony import */ var _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/ExtDomQuery */ "./src/main/typescript/impl/util/ExtDomQuery.ts");
/* harmony import */ var _util_HiddenInputBuilder__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/HiddenInputBuilder */ "./src/main/typescript/impl/util/HiddenInputBuilder.ts");
/* harmony import */ var _util_Lang__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/Lang */ "./src/main/typescript/impl/util/Lang.ts");
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









const trim = mona_dish__WEBPACK_IMPORTED_MODULE_0__.Lang.trim;

const ofAssoc = _util_Lang__WEBPACK_IMPORTED_MODULE_9__.ExtLang.ofAssoc;
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
class ResponseProcessor {
    constructor(request, externalContext, internalContext) {
        this.request = request;
        this.externalContext = externalContext;
        this.internalContext = internalContext;
    }
    /**
     * head replacement
     * @param shadowDocument incoming shadow head data (aka cdata as xml reference or dom element)
     * the data incoming must represent the html representation of the head itself one way or the other
     */
    replaceHead(shadowDocument) {
        const shadowHead = shadowDocument.querySelectorAll(_core_Const__WEBPACK_IMPORTED_MODULE_6__.HTML_TAG_HEAD);
        if (!shadowHead.isPresent()) {
            return;
        }
        const head = _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_7__.ExtDomQuery.querySelectorAll(_core_Const__WEBPACK_IMPORTED_MODULE_6__.HTML_TAG_HEAD);
        // full replace we delete everything
        head.childNodes.delete();
        this.addToHead(shadowHead);
        //we copy the attributes as well (just in case myfaces introduces the id in head)
        head.copyAttrs(shadowHead);
    }
    addToHead(shadowHead) {
        const mappedHeadData = new _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_7__.ExtDomQuery(shadowHead);
        const scriptTags = [_core_Const__WEBPACK_IMPORTED_MODULE_6__.HTML_TAG_SCRIPT];
        const nonExecutables = mappedHeadData.filter(item => scriptTags.indexOf(item.tagName.orElse("").value) == -1);
        nonExecutables.runHeadInserts(true);
        //incoming either the outer head tag or its children
        const nodesToAdd = (shadowHead.tagName.value === "HEAD") ? shadowHead.childNodes : shadowHead;
        // this is stored for "post" processing
        // after the rest of the "physical build up", head before body
        const scriptElements = new mona_dish__WEBPACK_IMPORTED_MODULE_0__.DomQuery(...nodesToAdd.asArray
            .filter(item => scriptTags.indexOf(item.tagName.orElse("").value) != -1));
        this.addToHeadDeferred(scriptElements);
    }
    addToHeadDeferred(newElements) {
        this.internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_6__.DEFERRED_HEAD_INSERTS).value.push(newElements);
    }
    /**
     * replaces the body in the expected manner
     * which means the entire body content is refreshed
     * however also the body attributes must be transferred
     * keeping event handlers etc... in place
     *
     * @param shadowDocument .. an incoming shadow document hosting the new nodes
     */
    replaceBody(shadowDocument) {
        const shadowBody = shadowDocument.querySelectorAll(_core_Const__WEBPACK_IMPORTED_MODULE_6__.HTML_TAG_BODY);
        if (!shadowBody.isPresent()) {
            return;
        }
        const shadowInnerHTML = shadowBody.innerHTML;
        const resultingBody = _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_7__.ExtDomQuery.querySelectorAll(_core_Const__WEBPACK_IMPORTED_MODULE_6__.HTML_TAG_BODY);
        const updateForms = resultingBody.querySelectorAll(_core_Const__WEBPACK_IMPORTED_MODULE_6__.HTML_TAG_FORM);
        // main difference, we cannot replace the body itself, but only its content
        // we need a separate step for post-processing the incoming
        // attributes, like classes, styles etc...
        resultingBody.html(shadowInnerHTML).copyAttrs(shadowBody);
        this.externalContext.assign((0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_RENDER_OVERRIDE)).value = "@all";
        this.storeForPostProcessing(updateForms, resultingBody);
    }
    /**
     * Leaf Tag eval... process whatever is in the eval cdata block
     *
     * @param node the node to eval
     */
    eval(node) {
        _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_7__.ExtDomQuery.globalEval(node.cDATAAsString);
    }
    /**
     * processes an incoming error from the response
     * which is hosted under the &lt;error&gt; tag
     * @param node the node hosting the error in our response xml
     * @param node the node in the xml hosting the error message
     */
    error(node) {
        /**
         * <error>
         *      <error-name>String</error-name>
         *      <error-message><![CDATA[message]]></error-message>
         * <error>
         */
        const mergedErrorData = new _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_7__.ExtConfig({});
        mergedErrorData.assign(_core_Const__WEBPACK_IMPORTED_MODULE_6__.SOURCE).value = this.externalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_AJAX_SOURCE).get(0).value;
        mergedErrorData.assign(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ERROR_NAME).value = node.querySelectorAll(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ERROR_NAME).textContent(_core_Const__WEBPACK_IMPORTED_MODULE_6__.EMPTY_STR);
        mergedErrorData.assign(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ERROR_MESSAGE).value = node.querySelectorAll(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ERROR_MESSAGE).cDATAAsString;
        const hasResponseXML = this.internalContext.get(_core_Const__WEBPACK_IMPORTED_MODULE_6__.RESPONSE_XML).isPresent();
        //we now store the response xml also in the error data for further details
        mergedErrorData.assignIf(hasResponseXML, _core_Const__WEBPACK_IMPORTED_MODULE_6__.RESPONSE_XML).value = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.RESPONSE_XML).value.get(0).value;
        // error post-processing and enrichment (standard messages from keys)
        const errorData = _ErrorData__WEBPACK_IMPORTED_MODULE_3__.ErrorData.fromServerError(mergedErrorData);
        // we now trigger an internally stored onError function which might be an attached to the context
        // either we do not have an internal on error, or an on error has been based via params from the outside.
        // In both cases they are attached to our contexts
        this.triggerOnError(errorData);
        _AjaxImpl__WEBPACK_IMPORTED_MODULE_1__.Implementation.sendError(errorData);
    }
    /**
     * process the redirect operation
     *
     * @param node
     */
    redirect(node) {
        _util_Assertions__WEBPACK_IMPORTED_MODULE_2__.Assertions.assertUrlExists(node);
        const redirectUrl = trim(node.attr(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ATTR_URL).value);
        if (redirectUrl != _core_Const__WEBPACK_IMPORTED_MODULE_6__.EMPTY_STR) {
            window.location.href = redirectUrl;
        }
    }
    /**
     * processes the update operation and updates the node with the cdata block
     * @param node the xml response node hosting the update info
     * @param cdataBlock the cdata block with the new html code
     */
    update(node, cdataBlock) {
        const result = _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_7__.ExtDomQuery.byId(node.id.value, true).outerHTML(cdataBlock, false, false);
        const sourceForm = result === null || result === void 0 ? void 0 : result.firstParent(_core_Const__WEBPACK_IMPORTED_MODULE_6__.HTML_TAG_FORM).orElseLazy(() => result.byTagName(_core_Const__WEBPACK_IMPORTED_MODULE_6__.HTML_TAG_FORM, true));
        if (sourceForm) {
            this.storeForPostProcessing(sourceForm, result);
        }
    }
    /**
     * Delete handler, simply deletes the node referenced by the xml data
     * @param node
     */
    delete(node) {
        mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId(node.id.value, true).delete();
    }
    /**
     * attributes leaf tag... process the attributes
     *
     * @param node
     */
    attributes(node) {
        const elem = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId(node.id.value, true);
        node.byTagName(_core_Const__WEBPACK_IMPORTED_MODULE_6__.XML_TAG_ATTR).each((item) => {
            elem.attr(item.attr(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ATTR_NAME).value).value = item.attr(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ATTR_VALUE).value;
        });
    }
    /**
     * @param shadowDocument a shadow document which is needed for further processing
     */
    replaceViewRoot(shadowDocument) {
        this.replaceHead(shadowDocument);
        this.replaceBody(shadowDocument);
    }
    /**
     * Insert handling, either before or after
     *
     * @param node
     */
    insert(node) {
        //let insertId = node.id; //not used atm
        const before = node.attr(_core_Const__WEBPACK_IMPORTED_MODULE_6__.XML_TAG_BEFORE);
        const after = node.attr(_core_Const__WEBPACK_IMPORTED_MODULE_6__.XML_TAG_AFTER);
        const insertNodes = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.fromMarkup(node.cDATAAsString);
        if (before.isPresent()) {
            mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId(before.value, true).insertBefore(insertNodes);
            this.internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_6__.UPDATE_ELEMS).value.push(insertNodes);
        }
        if (after.isPresent()) {
            const domQuery = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId(after.value, true);
            domQuery.insertAfter(insertNodes);
            this.internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_6__.UPDATE_ELEMS).value.push(insertNodes);
        }
    }
    /**
     * Handler for the case &lt;insert <&lt; before id="...
     *
     * @param node the node hosting the insert data
     */
    insertWithSubTags(node) {
        const before = node.querySelectorAll(_core_Const__WEBPACK_IMPORTED_MODULE_6__.XML_TAG_BEFORE);
        const after = node.querySelectorAll(_core_Const__WEBPACK_IMPORTED_MODULE_6__.XML_TAG_AFTER);
        before.each(item => {
            const insertId = item.attr(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ATTR_ID);
            const insertNodes = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.fromMarkup(item.cDATAAsString);
            if (insertId.isPresent()) {
                mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId(insertId.value, true).insertBefore(insertNodes);
                this.internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_6__.UPDATE_ELEMS).value.push(insertNodes);
            }
        });
        after.each(item => {
            const insertId = item.attr(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ATTR_ID);
            const insertNodes = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.fromMarkup(item.cDATAAsString);
            if (insertId.isPresent()) {
                mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId(insertId.value, true).insertAfter(insertNodes);
                this.internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_6__.UPDATE_ELEMS).value.push(insertNodes);
            }
        });
    }
    /**
     * Process the viewState update, update the affected
     * forms with their respective new viewState values
     *
     */
    processViewState(node) {
        if (ResponseProcessor.isViewStateNode(node)) {
            const state = node.cDATAAsString;
            this.internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_6__.APPLIED_VST, node.id.value).value = new _core_ImplTypes__WEBPACK_IMPORTED_MODULE_4__.StateHolder((0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(node.id.value), state);
            return true;
        }
        return false;
    }
    processClientWindow(node) {
        if (ResponseProcessor.isClientWindowNode(node)) {
            const state = node.cDATAAsString;
            this.internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_6__.APPLIED_CLIENT_WINDOW, node.id.value).value = new _core_ImplTypes__WEBPACK_IMPORTED_MODULE_4__.StateHolder((0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(node.id.value), state);
            return true;
        }
        return false;
    }
    /**
     * generic global eval which runs the embedded css and scripts
     */
    globalEval() {
        //  phase one, if we have head inserts, we build up those before going into the script eval phase
        let insertHeadElems = new _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_7__.ExtDomQuery(...this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.DEFERRED_HEAD_INSERTS).value);
        insertHeadElems.runHeadInserts(true);
        // phase 2 we run a script eval on all updated elements in the body
        let updateElems = new _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_7__.ExtDomQuery(...this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.UPDATE_ELEMS).value);
        updateElems.runCss();
        // phase 3, we do the same for the css
        updateElems.runScripts();
    }
    /**
     * Postprocessing view state fixing
     * this appends basically the incoming view states to the forms.
     * It is called from outside after all forms have been processed basically
     * as last lifecycle step, before going into the next request.
     */
    fixViewStates() {
        ofAssoc(this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.APPLIED_VST).orElse({}).value)
            .forEach(([, value]) => {
            const namingContainerId = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.NAMING_CONTAINER_ID);
            const namedViewRoot = !!this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.NAMED_VIEWROOT).value;
            const affectedForms = this.getContainerForms(namingContainerId)
                .filter(affectedForm => this.isInExecuteOrRender(affectedForm));
            this.appendViewStateToForms(affectedForms, namedViewRoot, value.value, namingContainerId.orElse("").value);
        });
    }
    /**
     * same as with view states before applies the incoming client windows as last step after the rest of the processing
     * is done.
     */
    fixClientWindow() {
        ofAssoc(this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.APPLIED_CLIENT_WINDOW).orElse({}).value)
            .forEach(([, value]) => {
            const namingContainerId = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.NAMING_CONTAINER_ID);
            const namedViewRoot = !!this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.NAMED_VIEWROOT).value;
            const affectedForms = this.getContainerForms(namingContainerId)
                .filter(affectedForm => this.isInExecuteOrRender(affectedForm));
            this.appendClientWindowToForms(affectedForms, namedViewRoot, value.value, namingContainerId.orElse("").value);
        });
    }
    updateNamedViewRootState() {
        let partialId = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.NAMING_CONTAINER_ID);
        let namedViewRoot = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.NAMED_VIEWROOT);
        if (partialId.isPresent() &&
            (namedViewRoot.isAbsent() ||
                !namedViewRoot.value)) {
            const SEP = (0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$faces)().separatorchar;
            this.internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_6__.NAMED_VIEWROOT).value = (!!document.getElementById(partialId.value)) || (0,mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ$)(`input[name*='${(0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_VIEWSTATE)}']`)
                .filter(node => node.attr("name").value.indexOf(partialId.value + SEP) == 0).length > 0;
        }
    }
    /**
     * all processing done we can close the request and send the appropriate events
     */
    done() {
        const eventData = _EventData__WEBPACK_IMPORTED_MODULE_5__.EventData.createFromRequest(this.request.value, this.internalContext, this.externalContext, _core_Const__WEBPACK_IMPORTED_MODULE_6__.SUCCESS);
        //because some frameworks might decorate them over the context in the response
        const eventHandler = this.externalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ON_EVENT).orElseLazy(() => this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ON_EVENT).value).orElse(_core_Const__WEBPACK_IMPORTED_MODULE_6__.EMPTY_FUNC).value;
        _AjaxImpl__WEBPACK_IMPORTED_MODULE_1__.Implementation.sendEvent(eventData, eventHandler);
    }
    /**
     * proper viewState -> form assignment
     *
     * @param forms the forms to append the viewState to
     * @param viewState the final viewState
     * @param namingContainerId
     */
    appendViewStateToForms(forms, namedViewRoot, viewState, namingContainerId = "") {
        this.assignState(forms, (0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.SEL_VIEWSTATE_ELEM), namedViewRoot, viewState, namingContainerId);
    }
    /**
     * proper clientWindow -> form assignment
     *
     * @param forms the forms to append the viewState to
     * @param clientWindow the final viewState
     * @param namingContainerId
     */
    appendClientWindowToForms(forms, namedViewRoot, clientWindow, namingContainerId = "") {
        this.assignState(forms, (0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.SEL_CLIENT_WINDOW_ELEM), namedViewRoot, clientWindow, namingContainerId);
    }
    /**
     * generic append state which appends a certain state as hidden element to an existing set of forms
     *
     * @param forms the forms to append or change to
     * @param selector the selector for the state
     * @param namedViewRoot if set to true, the name is also prefixed
     * @param state the state itself which needs to be assigned
     *
     * @param namingContainerId
     * @private
     */
    assignState(forms, selector, namedViewRoot, state, namingContainerId) {
        /**
         * creates the viewState or client window id element
         * @param form
         */
        const createAndAppendHiddenInput = (form) => {
            return new _util_HiddenInputBuilder__WEBPACK_IMPORTED_MODULE_8__.HiddenInputBuilder(selector)
                .withNamingContainerId(namingContainerId)
                .withParent(form)
                .withNamedViewRoot(namedViewRoot)
                .build();
        };
        forms.each(form => {
            const hiddenInput = form.querySelectorAll(selector)
                .orElseLazy(() => createAndAppendHiddenInput(form));
            hiddenInput.val = state;
        });
    }
    /**
     * Stores certain aspects of the dom for later post-processing
     *
     * @param updateForms the update forms which should receive standardized internal jsf data
     * @param toBeEvaluated the resulting elements which should be evaluated
     */
    storeForPostProcessing(updateForms, toBeEvaluated) {
        this.storeForUpdate(updateForms);
        this.storeForEval(toBeEvaluated);
    }
    /**
     * helper to store a given form for the update post-processing (viewState)
     *
     * @param updateForms the dom query object pointing to the forms which need to be updated
     */
    storeForUpdate(updateForms) {
        this.internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_6__.UPDATE_FORMS).value.push(updateForms);
    }
    /**
     * same for eval (js and css)
     *
     * @param toBeEvaluated
     */
    storeForEval(toBeEvaluated) {
        this.internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_6__.UPDATE_ELEMS).value.push(toBeEvaluated);
    }
    /**
     * check whether a given XMLQuery node is an explicit viewState node
     *
     * @param node the node to check
     * @returns if it is a viewState node
     */
    static isViewStateNode(node) {
        var _a, _b, _c, _d, _e, _f;
        const SEP = (0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$faces)().separatorchar;
        return "undefined" != typeof ((_a = node === null || node === void 0 ? void 0 : node.id) === null || _a === void 0 ? void 0 : _a.value) && (((_b = node === null || node === void 0 ? void 0 : node.id) === null || _b === void 0 ? void 0 : _b.value) == (0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_VIEWSTATE) ||
            ((_d = (_c = node === null || node === void 0 ? void 0 : node.id) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.indexOf([SEP, (0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_VIEWSTATE)].join(_core_Const__WEBPACK_IMPORTED_MODULE_6__.EMPTY_STR))) != -1 ||
            ((_f = (_e = node === null || node === void 0 ? void 0 : node.id) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.indexOf([(0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_VIEWSTATE), SEP].join(_core_Const__WEBPACK_IMPORTED_MODULE_6__.EMPTY_STR))) != -1);
    }
    /**
     * incoming client window node also needs special processing
     *
     * @param node the node to check
     * @returns true of it ii
     */
    static isClientWindowNode(node) {
        var _a, _b, _c, _d, _e, _f;
        const SEP = (0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$faces)().separatorchar;
        return "undefined" != typeof ((_a = node === null || node === void 0 ? void 0 : node.id) === null || _a === void 0 ? void 0 : _a.value) && (((_b = node === null || node === void 0 ? void 0 : node.id) === null || _b === void 0 ? void 0 : _b.value) == (0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_CLIENT_WINDOW) ||
            ((_d = (_c = node === null || node === void 0 ? void 0 : node.id) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.indexOf([SEP, (0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_CLIENT_WINDOW)].join(_core_Const__WEBPACK_IMPORTED_MODULE_6__.EMPTY_STR))) != -1 ||
            ((_f = (_e = node === null || node === void 0 ? void 0 : node.id) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.indexOf([(0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_CLIENT_WINDOW), SEP].join(_core_Const__WEBPACK_IMPORTED_MODULE_6__.EMPTY_STR))) != -1);
    }
    triggerOnError(errorData) {
        this.externalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ON_ERROR).orElseLazy(() => this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ON_ERROR).value).orElse(_core_Const__WEBPACK_IMPORTED_MODULE_6__.EMPTY_FUNC).value(errorData);
    }
    /**
     * filters the forms according to being member of the "execute" or "render" cycle
     * @param affectedForm
     * @private
     */
    isInExecuteOrRender(affectedForm) {
        const executes = this.externalContext.getIf((0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_EXECUTE)).orElse("@none").value.split(/\s+/gi);
        const renders = this.externalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_RENDER_OVERRIDE)
            .orElseLazy(() => this.externalContext.getIf((0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_RENDER)).value)
            .orElse(_core_Const__WEBPACK_IMPORTED_MODULE_6__.IDENT_NONE).value.split(/\s+/gi);
        const executeAndRenders = executes.concat(...renders);
        return [...executeAndRenders].filter((nameOrId) => {
            if ([_core_Const__WEBPACK_IMPORTED_MODULE_6__.IDENT_ALL, _core_Const__WEBPACK_IMPORTED_MODULE_6__.IDENT_NONE].indexOf(nameOrId) != -1) {
                return true;
            }
            const NAME_OR_ID = this.getNameOrIdSelector(nameOrId);
            //either the form directly is in execute or render or one of its children or one of its parents
            return affectedForm.matchesSelector(NAME_OR_ID) ||
                affectedForm.querySelectorAll(NAME_OR_ID).isPresent() ||
                affectedForm.firstParent(NAME_OR_ID).isPresent();
        }).length > 0;
    }
    /**
     * gets all forms under a single naming container id
     * @param namingContainerId
     * @private
     */
    getContainerForms(namingContainerId) {
        if (namingContainerId.isPresent()) {
            //naming container mode, all forms under naming container id must be processed
            return (0,mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ$)(this.getNameOrIdSelector(namingContainerId.value))
                // missing condition if the naming container is not present we have to
                // use the body as fallback
                .orElseLazy(() => mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byTagName(_core_Const__WEBPACK_IMPORTED_MODULE_6__.HTML_TAG_BODY))
                .byTagName(_core_Const__WEBPACK_IMPORTED_MODULE_6__.HTML_TAG_FORM, true);
        }
        else {
            return mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byTagName(_core_Const__WEBPACK_IMPORTED_MODULE_6__.HTML_TAG_FORM);
        }
    }
    getNameOrIdSelector(nameOrId) {
        return `[id='${nameOrId}'], [name='${nameOrId}']`;
    }
}


/***/ },

/***/ "./src/main/typescript/impl/xhrCore/XhrFormData.ts"
/*!*********************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/XhrFormData.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XhrFormData: () => (/* binding */ XhrFormData)
/* harmony export */ });
/* harmony import */ var mona_dish__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
/* harmony import */ var _core_Const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
/* harmony import */ var _util_FileUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/FileUtils */ "./src/main/typescript/impl/util/FileUtils.ts");
/* harmony import */ var _util_Lang__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/Lang */ "./src/main/typescript/impl/util/Lang.ts");
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




const ofAssoc = _util_Lang__WEBPACK_IMPORTED_MODULE_3__.ExtLang.ofAssoc;

const defaultParamsMapper = (key, item) => [key, item];
/**
 * A unified form data class
 * which builds upon our configuration.
 *
 * We cannot use standard html5 forms everywhere
 * due to api constraints on the HTML Form object in IE11
 * and due to the url encoding constraint given by the faces.js spec
 *
 *
 * internal storage format
 * every value is stored as an array
 * even scalar ones!
 */
class XhrFormData extends mona_dish__WEBPACK_IMPORTED_MODULE_0__.Config {
    /**
     * data collector from a given form
     *
     * @param dataSource either a form as DomQuery object or an encoded url string
     * @param paramsMapper a remapper for the params keys and values
     * @param executes the executes id list for the elements to being processed
     * @param partialIds partial ids to collect, to reduce the data sent down
     */
    constructor(dataSource, paramsMapper = defaultParamsMapper, executes, partialIds) {
        super({});
        this.dataSource = dataSource;
        this.paramsMapper = paramsMapper;
        this.partialIds = partialIds;
        /**
         * Checks if the given datasource is a multipart request source
         * multipart is only needed if one of the executes is a file input
         * since file inputs are stateless, they fall out of the view state
         * and need special handling. With file submits we have to send a formData object
         * instead of an encoded string files cannot be sent that way
         */
        this.isMultipartRequest = false;
        //encode and append the issuing item if not a partial ids array of ids is passed
        /*
         * Spec. 13.3.1
         * Collect and encode input elements.
         * Additionally the hidden element jakarta.faces.ViewState
         * Enhancement partial page submit
         */
        this.resolveRequestType(this.dataSource, executes);
        this.encodeSubmittableFields(this.dataSource, this.partialIds);
        this.applyViewState(this.dataSource);
    }
    /**
     * @returns a Form data representation, this is needed for file submits
     */
    toFormData() {
        /*
           * expands key: [item1, item2]
           * to: [{key: key,  value: item1}, {key: key, value: item2}]
           */
        let expandValueArrays = ([key, item]) => {
            if (Array.isArray(item)) {
                return new mona_dish__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...item).map((value) => {
                    return { key, value };
                });
            }
            return [{ key, value: item }];
        };
        /*
         * remaps the incoming {key, value} tuples
         * to naming container prefixed keys and values
         */
        let remapForNamingContainer = ({ key, value }) => {
            key = this.remapKeyForNamingContainer(key);
            return { key, value };
        };
        /*
         * collects everything into a FormData object
         */
        return ofAssoc(this.value)
            .flatMap(expandValueArrays)
            .map(remapForNamingContainer)
            .reduce((formData, { key, value }) => {
            formData.append(key, value);
            return formData;
        }, new FormData());
    }
    /**
     * returns an encoded string representation of our xhr form data
     *
     * @param defaultStr optional default value if nothing is there to encode
     */
    toString(defaultStr = _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR) {
        return (0,_util_FileUtils__WEBPACK_IMPORTED_MODULE_2__.encodeFormData)(this, this.paramsMapper, defaultStr);
    }
    /**
     * generic post init code, for now, this performs some post assign data post-processing
     * @param rootElement the root element which knows the request type (usually a form)
     * @param executes the executable dom nodes which need to be processed into the form data, which we can send
     * in our ajax request
     */
    resolveRequestType(rootElement, executes) {
        if (!executes || executes.indexOf(_core_Const__WEBPACK_IMPORTED_MODULE_1__.IDENT_NONE) != -1) {
            return;
        }
        this.isMultipartRequest = rootElement.isMultipartCandidate(true);
    }
    /**
     * special case view state handling
     *
     * @param form the form holding the view state value
     */
    applyViewState(form) {
        if (this.getIf((0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_1__.P_VIEWSTATE)).isPresent()) {
            return;
        }
        let viewStateElement = form.querySelectorAllDeep(`[name*='${(0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_1__.P_VIEWSTATE)}'`);
        let viewState = viewStateElement.inputValue;
        this.appendIf(viewState.isPresent(), this.remapKeyForNamingContainer(viewStateElement.name.value)).value = viewState.value;
    }
    /**
     * determines fields to submit
     * @param {Node} parentItem - form element item is nested in
     * @param {Array} partialIds - ids fo PPS
     */
    encodeSubmittableFields(parentItem, partialIds = []) {
        const mergeIntoThis = ([key, value]) => this.append(key).value = value;
        const namingContainerRemap = ([key, value]) => this.paramsMapper(key, value);
        const remappedPartialIds = partialIds.map(partialId => this.remapKeyForNamingContainer(partialId));
        const partialIdsFilter = ([key, value]) => (!remappedPartialIds.length || key.indexOf("@") == 0) ? true :
            remappedPartialIds.indexOf(key) != -1;
        let inputs = (0,_util_FileUtils__WEBPACK_IMPORTED_MODULE_2__.getFormInputsAsArr)(parentItem);
        inputs
            .map(_util_FileUtils__WEBPACK_IMPORTED_MODULE_2__.fixEmptyParameters)
            .map(namingContainerRemap)
            .filter(partialIdsFilter)
            .forEach(mergeIntoThis);
    }
    remapKeyForNamingContainer(key) {
        return this.paramsMapper(key, "")[0];
    }
}


/***/ },

/***/ "./src/main/typescript/impl/xhrCore/XhrRequest.ts"
/*!********************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/XhrRequest.ts ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XhrRequest: () => (/* binding */ XhrRequest)
/* harmony export */ });
/* harmony import */ var _util_AsyncRunnable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/AsyncRunnable */ "./src/main/typescript/impl/util/AsyncRunnable.ts");
/* harmony import */ var mona_dish__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
/* harmony import */ var _AjaxImpl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AjaxImpl */ "./src/main/typescript/impl/AjaxImpl.ts");
/* harmony import */ var _XhrFormData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./XhrFormData */ "./src/main/typescript/impl/xhrCore/XhrFormData.ts");
/* harmony import */ var _ErrorData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ErrorData */ "./src/main/typescript/impl/xhrCore/ErrorData.ts");
/* harmony import */ var _EventData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EventData */ "./src/main/typescript/impl/xhrCore/EventData.ts");
/* harmony import */ var _util_Lang__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/Lang */ "./src/main/typescript/impl/util/Lang.ts");
/* harmony import */ var _core_Const__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
/* harmony import */ var _RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./RequestDataResolver */ "./src/main/typescript/impl/xhrCore/RequestDataResolver.ts");
/* harmony import */ var _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/ExtDomQuery */ "./src/main/typescript/impl/util/ExtDomQuery.ts");
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









const failSaveExecute = _util_Lang__WEBPACK_IMPORTED_MODULE_6__.ExtLang.failSaveExecute;

/**
 * Faces XHR Request Wrapper
 * as AsyncRunnable for our Asynchronous queue
 * This means from the outside the
 * xhr request is similar to a Promise in a way
 * that you can add then and catch and finally callbacks.
 *
 *
 * The idea is that we basically just enqueue
 * a single ajax request into our queue
 * and let the queue do the processing.
 *
 *
 */
class XhrRequest extends _util_AsyncRunnable__WEBPACK_IMPORTED_MODULE_0__.AsyncRunnable {
    /**
     * Required Parameters
     *
     * @param requestContext the request context with all pass through values
     * @param internalContext internal context with internal info which is passed through, not used by the user
     * Optional Parameters
     * @param timeout optional xhr timeout
     * @param ajaxType optional request type, default "POST"
     * @param contentType optional content type, default "application/x-www-form-urlencoded"
     */
    constructor(requestContext, internalContext, timeout = _core_Const__WEBPACK_IMPORTED_MODULE_7__.NO_TIMEOUT, ajaxType = _core_Const__WEBPACK_IMPORTED_MODULE_7__.REQ_TYPE_POST, contentType = _core_Const__WEBPACK_IMPORTED_MODULE_7__.URL_ENCODED) {
        super();
        this.requestContext = requestContext;
        this.internalContext = internalContext;
        this.timeout = timeout;
        this.ajaxType = ajaxType;
        this.contentType = contentType;
        this.stopProgress = false;
        this.xhrObject = new XMLHttpRequest();
        // we omit promises here because we have to deal with cancel functionality,
        // and promises to not provide that (yet) instead we have our async queue
        // which uses an api internally, which is very close to promises
        this.registerXhrCallbacks((data) => this.resolve(data), (data) => this.reject(data));
    }
    start() {
        let ignoreErr = failSaveExecute;
        let xhrObject = this.xhrObject;
        let sourceForm = mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.byId(this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_SRC_FRM_ID).value);
        let executesArr = () => {
            return this.requestContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR, _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_EXECUTE).get(_core_Const__WEBPACK_IMPORTED_MODULE_7__.IDENT_NONE).value.split(/\s+/gi);
        };
        try {
            // encoded we need to decode
            // We generated a base representation of the current form
            // in case someone has overloaded the viewState with additional decorators we merge
            // that in, there is no way around it, the spec allows it and getViewState
            // must be called, so whatever getViewState delivers has higher priority then
            // whatever the formData object delivers
            // the partialIdsArray arr is almost deprecated legacy code where we allowed to send a separate list of partial
            // ids for reduced load and server processing, this will be removed soon, we can handle the same via execute
            const executes = executesArr();
            const partialIdsArray = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_PPS).value === true ? executes : [];
            const formData = new _XhrFormData__WEBPACK_IMPORTED_MODULE_3__.XhrFormData(sourceForm, (0,_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resoveNamingContainerMapper)(this.internalContext), executes, partialIdsArray);
            this.contentType = formData.isMultipartRequest ? "undefined" : this.contentType;
            // next step the pass through parameters are merged in for post params
            this.requestContext.$nspEnabled = false;
            const requestContext = this.requestContext;
            const requestPassThroughParams = requestContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR);
            // we are turning off here the jsf, faces remapping because we are now dealing with
            // pass-through parameters
            requestPassThroughParams.$nspEnabled = false;
            // this is an extension where we allow pass through parameters to be sent down additionally
            // this can be used and is used in the impl to enrich the post request parameters with additional
            // information
            try {
                formData.shallowMerge(requestPassThroughParams, true, true);
            }
            finally {
                // unfortunately as long as we support
                // both namespaces we have to keep manual control
                // on the key renaming before doing ops like deep copy
                this.requestContext.$nspEnabled = true;
                requestPassThroughParams.$nspEnabled = true;
            }
            this.appendIssuingItem(formData);
            this.responseContext = requestPassThroughParams.deepCopy;
            // we have to shift the internal passthroughs around to build up our response context
            const responseContext = this.responseContext;
            responseContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_MF_INTERNAL).value = this.internalContext.value;
            // per spec the onEvent and onError handlers must be passed through to the response
            responseContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.ON_EVENT).value = requestContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.ON_EVENT).value;
            responseContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.ON_ERROR).value = requestContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.ON_ERROR).value;
            xhrObject.open(this.ajaxType, (0,_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resolveFinalUrl)(sourceForm, formData, this.ajaxType), true);
            // adding timeout
            this.timeout ? xhrObject.timeout = this.timeout : null;
            // a bug in the xhr stub library prevents the setRequestHeader to be properly executed on fake xhr objects
            // normal browsers should resolve this
            // tests can quietly fail on this one
            if (this.contentType != "undefined") {
                ignoreErr(() => xhrObject.setRequestHeader(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CONTENT_TYPE, `${this.contentType}; charset=utf-8`));
            }
            ignoreErr(() => xhrObject.setRequestHeader(_core_Const__WEBPACK_IMPORTED_MODULE_7__.HEAD_FACES_REQ, _core_Const__WEBPACK_IMPORTED_MODULE_7__.VAL_AJAX));
            // probably not needed anymore, will test this
            // some webkit based mobile browsers do not follow the w3c spec of
            // setting, they accept headers automatically
            ignoreErr(() => xhrObject.setRequestHeader(_core_Const__WEBPACK_IMPORTED_MODULE_7__.REQ_ACCEPT, _core_Const__WEBPACK_IMPORTED_MODULE_7__.STD_ACCEPT));
            this.sendEvent(_core_Const__WEBPACK_IMPORTED_MODULE_7__.BEGIN);
            this.sendRequest(formData);
        }
        catch (e) {
            // this happens usually in a client side condition, hence we have to deal in with it in a client
            // side manner
            this.handleErrorAndClearQueue(e);
            throw e;
        }
        return this;
    }
    cancel() {
        try {
            // this causes onError to be called where the error
            // handling takes over
            this.xhrObject.abort();
        }
        catch (e) {
            this.handleError(e);
        }
    }
    /**
     * attaches the internal event and processing
     * callback within the promise to our xhr object
     *
     * @param resolve
     * @param reject
     */
    registerXhrCallbacks(resolve, reject) {
        var _a, _b;
        const xhrObject = this.xhrObject;
        xhrObject.onabort = () => {
            this.onAbort(resolve, reject);
        };
        xhrObject.ontimeout = () => {
            this.onTimeout(resolve, reject);
        };
        xhrObject.onload = () => {
            this.onResponseReceived(resolve);
        };
        xhrObject.onloadend = () => {
            this.onResponseProcessed(this.xhrObject, resolve);
        };
        if (xhrObject === null || xhrObject === void 0 ? void 0 : xhrObject.upload) {
            //this is an  extension so that we can send the upload object of the current
            //request before any operation
            (_b = (_a = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_PREINIT)).value) === null || _b === void 0 ? void 0 : _b.call(_a, xhrObject.upload);
            //now we hook in the upload events
            xhrObject.upload.addEventListener("progress", (event) => {
                var _a, _b;
                (_b = (_a = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_ON_PROGRESS)).value) === null || _b === void 0 ? void 0 : _b.call(_a, xhrObject.upload, event);
            });
            xhrObject.upload.addEventListener("load", (event) => {
                var _a, _b;
                (_b = (_a = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_LOAD)).value) === null || _b === void 0 ? void 0 : _b.call(_a, xhrObject.upload, event);
            });
            xhrObject.upload.addEventListener("loadstart", (event) => {
                var _a, _b;
                (_b = (_a = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_LOADSTART)).value) === null || _b === void 0 ? void 0 : _b.call(_a, xhrObject.upload, event);
            });
            xhrObject.upload.addEventListener("loadend", (event) => {
                var _a, _b;
                (_b = (_a = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_LOADEND)).value) === null || _b === void 0 ? void 0 : _b.call(_a, xhrObject.upload, event);
            });
            xhrObject.upload.addEventListener("abort", (event) => {
                var _a, _b;
                (_b = (_a = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_ABORT)).value) === null || _b === void 0 ? void 0 : _b.call(_a, xhrObject.upload, event);
            });
            xhrObject.upload.addEventListener("timeout", (event) => {
                var _a, _b;
                (_b = (_a = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_TIMEOUT)).value) === null || _b === void 0 ? void 0 : _b.call(_a, xhrObject.upload, event);
            });
            xhrObject.upload.addEventListener("error", (event) => {
                var _a, _b;
                (_b = (_a = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_ERROR)).value) === null || _b === void 0 ? void 0 : _b.call(_a, xhrObject.upload, event);
            });
        }
        xhrObject.onerror = (errorData) => {
            // Safari in rare cases triggers an error when cancelling a request internally, or when
            // in this case we simply ignore the request and clear up the queue, because
            // it is not safe anymore to proceed with the current queue
            // This bypasses a Safari issue where it keeps requests hanging after page unload
            // and then triggers a cancel error on then instead of just stopping
            // and clearing the code
            // in a page unload case it is safe to clear the queue
            // in the exact safari case any request after this one in the queue is invalid
            // because the queue references xhr requests to a page which already is gone!
            if (this.isCancelledResponse(this.xhrObject)) {
                /*
                 * this triggers the catch chain and after that finally
                 */
                this.stopProgress = true;
                reject();
                return;
            }
            // error already processed somewhere else
            if (this.stopProgress) {
                return;
            }
            this.handleError(errorData);
        };
    }
    isCancelledResponse(currentTarget) {
        return (currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.status) === 0 && // cancelled internally by browser
            (currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.readyState) === 4 &&
            (currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.responseText) === '' &&
            (currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.responseXML) === null;
    }
    /*
     * xhr processing callbacks
     *
     * Those methods are the callbacks called by
     * the xhr object depending on its own state
     */
    /**
     * client side abort... also here for now we clean the queue
     *
     * @param resolve
     * @param reject
     * @private
     */
    onAbort(resolve, reject) {
        // reject means clear queue, in this case we abort entirely the processing
        // does not happen yet, we have to probably rethink this strategy in the future
        // when we introduce cancel functionality
        this.handleHttpError(reject);
    }
    /**
     * request timeout, this must be handled like a generic server error per spec
     * unfortunately, so we have to jump to the next item (we cancelled before)
     * @param resolve
     * @param reject
     * @private
     */
    onTimeout(resolve, reject) {
        // timeout also means we we probably should clear the queue,
        // the state is unsafe for the next requests
        this.sendEvent(_core_Const__WEBPACK_IMPORTED_MODULE_7__.STATE_EVT_TIMEOUT);
        this.handleHttpError(resolve);
    }
    /**
     * the response is received and normally is a normal response
     * but also can be some kind of error (http code >= 300)
     * In any case the response will be resolved either as error or response
     * and the next item in the queue will be processed
     * @param resolve
     * @private
     */
    onResponseReceived(resolve) {
        var _a;
        this.sendEvent(_core_Const__WEBPACK_IMPORTED_MODULE_7__.COMPLETE);
        //request error resolution as per spec:
        if (!this.processRequestErrors(resolve)) {
            (0,_core_Const__WEBPACK_IMPORTED_MODULE_7__.$faces)().ajax.response(this.xhrObject, (_a = this.responseContext.value) !== null && _a !== void 0 ? _a : {});
        }
    }
    processRequestErrors(resolve) {
        var _a, _b, _c, _d, _e;
        const responseXML = new mona_dish__WEBPACK_IMPORTED_MODULE_1__.XMLQuery((_a = this.xhrObject) === null || _a === void 0 ? void 0 : _a.responseXML);
        const responseText = (_c = (_b = this.xhrObject) === null || _b === void 0 ? void 0 : _b.responseText) !== null && _c !== void 0 ? _c : "";
        const responseCode = (_e = (_d = this.xhrObject) === null || _d === void 0 ? void 0 : _d.status) !== null && _e !== void 0 ? _e : -1;
        if (responseXML.isXMLParserError()) {
            // Firefox: malformed XML produces a Document with <parsererror>
            const errorName = "Invalid Response";
            const errorMessage = "The response xml is invalid";
            this.handleGenericResponseError(errorName, errorMessage, _core_Const__WEBPACK_IMPORTED_MODULE_7__.MALFORMEDXML, resolve);
            return true;
        }
        else if (responseXML.isAbsent() && responseText.trim().length > 0) {
            // Chrome: responseXML is null for unparseable XML, but responseText has content
            const errorName = "Invalid Response";
            const errorMessage = "The response xml is invalid";
            this.handleGenericResponseError(errorName, errorMessage, _core_Const__WEBPACK_IMPORTED_MODULE_7__.MALFORMEDXML, resolve);
            return true;
        }
        else if (responseXML.isAbsent()) {
            // Truly empty response
            const errorName = "Empty Response";
            const errorMessage = "The response has provided no data";
            this.handleGenericResponseError(errorName, errorMessage, _core_Const__WEBPACK_IMPORTED_MODULE_7__.EMPTY_RESPONSE, resolve);
            return true;
        }
        else if (responseCode >= 300 || responseCode < 200) {
            this.handleHttpError(resolve);
            return true;
        }
        return false;
    }
    handleGenericResponseError(errorName, errorMessage, responseStatus, resolve) {
        var _a, _b, _c, _d;
        const errorData = new _ErrorData__WEBPACK_IMPORTED_MODULE_4__.ErrorData(this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_SRC_CTL_ID).value, errorName, errorMessage, (_b = (_a = this.xhrObject) === null || _a === void 0 ? void 0 : _a.responseText) !== null && _b !== void 0 ? _b : "", (_d = (_c = this.xhrObject) === null || _c === void 0 ? void 0 : _c.responseXML) !== null && _d !== void 0 ? _d : null, this.xhrObject.status, responseStatus);
        this.finalizeError(errorData, resolve);
    }
    handleHttpError(resolveOrReject, errorMessage = "Generic HTTP Serror") {
        var _a, _b, _c, _d, _e, _f;
        this.stopProgress = true;
        const errorData = new _ErrorData__WEBPACK_IMPORTED_MODULE_4__.ErrorData(this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_SRC_CTL_ID).value, _core_Const__WEBPACK_IMPORTED_MODULE_7__.HTTP_ERROR, errorMessage, (_b = (_a = this.xhrObject) === null || _a === void 0 ? void 0 : _a.responseText) !== null && _b !== void 0 ? _b : "", (_d = (_c = this.xhrObject) === null || _c === void 0 ? void 0 : _c.responseXML) !== null && _d !== void 0 ? _d : null, (_f = (_e = this.xhrObject) === null || _e === void 0 ? void 0 : _e.status) !== null && _f !== void 0 ? _f : -1, _core_Const__WEBPACK_IMPORTED_MODULE_7__.HTTP_ERROR);
        this.finalizeError(errorData, resolveOrReject);
    }
    finalizeError(errorData, resolveOrReject) {
        try {
            this.handleError(errorData, true);
        }
        finally {
            // we issue a resolveOrReject in this case to allow the system to recover
            // reject would clean up the queue
            // resolve would trigger the next element in the queue to be processed
            resolveOrReject(errorData);
            this.stopProgress = true;
        }
    }
    /**
     * last minute cleanup, the request now either is fully done
     * or not by having had a cancel or error event be
     * @param data
     * @param resolve
     * @private
     */
    onResponseProcessed(data, resolve) {
        // if stop progress true, the cleanup already has been performed
        if (this.stopProgress) {
            return;
        }
        /*
         * normal case, cleanup == next item if possible
         */
        resolve(data);
    }
    sendRequest(formData) {
        const isPost = this.ajaxType != _core_Const__WEBPACK_IMPORTED_MODULE_7__.REQ_TYPE_GET;
        if (formData.isMultipartRequest) {
            // in case of a multipart request we send in a formData object as body
            this.xhrObject.send((isPost) ? formData.toFormData() : null);
        }
        else {
            // in case of a normal request we send it normally
            this.xhrObject.send((isPost) ? formData.toString() : null);
        }
    }
    /*
     * other helpers
     */
    sendEvent(evtType) {
        var _a;
        const eventData = _EventData__WEBPACK_IMPORTED_MODULE_5__.EventData.createFromRequest(this.xhrObject, this.internalContext, this.requestContext, evtType);
        try {
            // User code error, we might cover
            // this in onError, but also we cannot swallow it.
            // We need to resolve the local handlers lazily,
            // because some frameworks might decorate them over the context in the response
            let eventHandler = (0,_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resolveHandlerFunc)(this.requestContext, this.responseContext, _core_Const__WEBPACK_IMPORTED_MODULE_7__.ON_EVENT);
            _AjaxImpl__WEBPACK_IMPORTED_MODULE_2__.Implementation.sendEvent(eventData, eventHandler);
        }
        catch (e) {
            e.source = (_a = e === null || e === void 0 ? void 0 : e.source) !== null && _a !== void 0 ? _a : this.requestContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.SOURCE).value;
            // this is a client error, no save state anymore for queue processing!
            this.handleErrorAndClearQueue(e);
            // we forward the error upward like all client side errors
            throw e;
        }
    }
    handleErrorAndClearQueue(e, responseFormatError = false) {
        this.handleError(e, responseFormatError);
        this.reject(e);
    }
    handleError(exception, responseFormatError = false) {
        var _a;
        const errorData = (responseFormatError) ? _ErrorData__WEBPACK_IMPORTED_MODULE_4__.ErrorData.fromHttpConnection(exception.source, exception.type, (_a = exception.message) !== null && _a !== void 0 ? _a : _core_Const__WEBPACK_IMPORTED_MODULE_7__.EMPTY_STR, exception.responseText, exception.responseXML, exception.responseCode, exception.status) : _ErrorData__WEBPACK_IMPORTED_MODULE_4__.ErrorData.fromClient(exception);
        const eventHandler = (0,_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resolveHandlerFunc)(this.requestContext, this.responseContext, _core_Const__WEBPACK_IMPORTED_MODULE_7__.ON_ERROR);
        _AjaxImpl__WEBPACK_IMPORTED_MODULE_2__.Implementation.sendError(errorData, eventHandler);
    }
    appendIssuingItem(formData) {
        var _a, _b;
        const issuingItemId = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_SRC_CTL_ID).value;
        //to avoid sideffects with buttons we only can append the issuing item if no behavior event is set
        //MYFACES-4679!
        const eventType = (_b = (_a = formData.getIf((0,_core_Const__WEBPACK_IMPORTED_MODULE_7__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_7__.P_BEHAVIOR_EVENT)).value) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null;
        const isBehaviorEvent = (!!eventType) && eventType != 'click';
        //not encoded
        if (issuingItemId && formData.getIf(issuingItemId).isAbsent() && !isBehaviorEvent) {
            const issuingItem = mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.byId(issuingItemId);
            const itemValue = issuingItem.inputValue;
            const arr = new _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_9__.ExtConfig({});
            const type = issuingItem.type.orElse("").value.toLowerCase();
            //Checkbox and radio only value pass if checked is set, otherwise they should not show
            //up at all, and if checked is set, they either can have a value or simply being boolean
            if ((type == XhrRequest.TYPE_CHECKBOX || type == XhrRequest.TYPE_RADIO) && !issuingItem.checked) {
                return;
            }
            else if ((type == XhrRequest.TYPE_CHECKBOX || type == XhrRequest.TYPE_RADIO)) {
                arr.assign(issuingItemId).value = itemValue.orElse(true).value;
            }
            else if (itemValue.isPresent()) {
                arr.assign(issuingItemId).value = itemValue.value;
            }
            formData.shallowMerge(arr, true, true);
        }
    }
}
XhrRequest.TYPE_CHECKBOX = "checkbox";
XhrRequest.TYPE_RADIO = "radio";


/***/ },

/***/ "./src/main/typescript/myfaces/OamSubmit.ts"
/*!**************************************************!*\
  !*** ./src/main/typescript/myfaces/OamSubmit.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   oam: () => (/* binding */ oam)
/* harmony export */ });
/* harmony import */ var mona_dish__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/src/main/typescript/index_core.ts");
/* harmony import */ var _impl_util_Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../impl/util/Lang */ "./src/main/typescript/impl/util/Lang.ts");
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
    const ofAssoc = _impl_util_Lang__WEBPACK_IMPORTED_MODULE_1__.ExtLang.ofAssoc;
    /**
     * sets a hidden input field
     * @param formName the formName
     * @param name the hidden field
     * @param value the value to be rendered
     */
    oam.setHiddenInput = function (formName, name, value) {
        const forms = document.forms;
        mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId(forms[formName])
            .each(form => {
            const input = form.querySelectorAll(`input[type='hidden'][name='${name}']`);
            if (input.isPresent()) {
                input.inputValue.value = value;
            }
            else {
                const newInput = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.fromMarkup(`<input type='hidden' id='${name}' name='${name}'>`);
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
        var _a;
        const forms = document.forms;
        const elements = (_a = forms === null || forms === void 0 ? void 0 : forms[formName]) === null || _a === void 0 ? void 0 : _a.elements;
        let element = elements === null || elements === void 0 ? void 0 : elements[name];
        if (!element) {
            return;
        }
        mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId(element).delete();
    };
    // noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
    /**
     * does special form submit remapping
     * re-maps the issuing command link into something,
     * the "decode" of the command link on the server can understand
     *
     * @param formName
     * @param linkId
     * @param target
     * @param params
     */
    oam.submitForm = function (formName, linkId = null, target = null, params = {}) {
        var _a, _b, _c, _d, _e;
        //handle a possible incoming null, not sure if this is used that way anywhere, but we allow it
        params = (!params) ? {} : params;
        let clearFn = 'clearFormHiddenParams_' + formName.replace(/-/g, '\$:').replace(/:/g, '_');
        (_a = window === null || window === void 0 ? void 0 : window[clearFn]) === null || _a === void 0 ? void 0 : _a.call(window, formName);
        //autoscroll code
        if (((_d = (_c = (_b = window === null || window === void 0 ? void 0 : window.myfaces) === null || _b === void 0 ? void 0 : _b.core) === null || _c === void 0 ? void 0 : _c.config) === null || _d === void 0 ? void 0 : _d.autoScroll) && (window === null || window === void 0 ? void 0 : window.getScrolling)) {
            myfaces.oam.setHiddenInput(formName, 'autoScroll', window === null || window === void 0 ? void 0 : window.getScrolling());
        }
        let paramsStream = Array.isArray(params) ? [...params] : ofAssoc(params);
        paramsStream.forEach(([key, data]) => myfaces.oam.setHiddenInput(formName, key, data));
        //we call the namespaced function, to allow decoration, via a direct call we would
        myfaces.oam.setHiddenInput(formName, `${formName}:_idcl`, linkId !== null && linkId !== void 0 ? linkId : '');
        const forms = document.forms;
        mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId((_e = forms === null || forms === void 0 ? void 0 : forms[formName]) !== null && _e !== void 0 ? _e : document.getElementById(formName)).each(form => {
            var _a;
            const ATTR_TARGET = "target";
            const formElement = form.getAsElem(0).value;
            const oldTarget = form.getAsElem(0).value.getAttribute("target");
            if (target != "null" && target) {
                form.getAsElem(0).value.setAttribute("target", target);
            }
            const result = (_a = formElement === null || formElement === void 0 ? void 0 : formElement.onsubmit) === null || _a === void 0 ? void 0 : _a.call(formElement, null);
            try {
                if ((!!result) || 'undefined' == typeof result) {
                    formElement.submit();
                }
            }
            catch (e) {
                window === null || window === void 0 ? void 0 : window.console.error(e);
            }
            finally {
                if (oldTarget == null || oldTarget == "null") {
                    form.getAsElem(0).value.removeAttribute("target");
                }
                else {
                    form.getAsElem(0).value.setAttribute("target", oldTarget);
                }
                // noinspection JSUnusedLocalSymbols
                paramsStream.forEach(([key, data]) => {
                    myfaces.oam.clearHiddenInput(formName, key);
                });
                myfaces.oam.clearHiddenInput(formName, `${formName}:_idcl`);
            }
        });
        return false;
    };
})(oam || (oam = {}));


/***/ }

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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************************************!*\
  !*** ./src/main/typescript/api/faces.ts ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   faces: () => (/* binding */ faces),
/* harmony export */   myfaces: () => (/* binding */ myfaces)
/* harmony export */ });
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

var _a, _b, _c;
/**
 * faces.js init layer which provides as per spec the proper
 * window namespace if it does not exist already
 *
 * The idea is that we use a small shim on top of
 * the implementation to provide the window namespace.
 * The implementation itself is in a protected namespace
 * which will be bound by the build system
 *
 * The documentation nevertheless targets the _api file, which
 * hosts the full api
 */
if (!window.faces) {
    //we lazily load the code to prevent ram bloat
    const faces = (__webpack_require__(/*! ./_api */ "./src/main/typescript/api/_api.ts").faces);
    window['faces'] = (_a = window === null || window === void 0 ? void 0 : window.faces) !== null && _a !== void 0 ? _a : faces;
}
if (!((_b = window === null || window === void 0 ? void 0 : window.myfaces) === null || _b === void 0 ? void 0 : _b.ab)) {
    const myfaces = (__webpack_require__(/*! ./_api */ "./src/main/typescript/api/_api.ts").myfaces);
    //namespace might be extended is not exclusively reserved so we merge
    window["myfaces"] = (_c = window === null || window === void 0 ? void 0 : window.myfaces) !== null && _c !== void 0 ? _c : {};
    Object.keys(myfaces).forEach(key => { var _a, _b; return window.myfaces[key] = (_b = (_a = window.myfaces) === null || _a === void 0 ? void 0 : _a[key]) !== null && _b !== void 0 ? _b : myfaces[key]; });
}
var faces = window.faces;
var myfaces = window.myfaces;

})();

var __webpack_export_target__ = window;
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=faces-development.js.map