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
function assign(target, ...accessPath) {
  if (accessPath.length < 1) {
    return new IgnoreAssign(target);
  }
  const lastPathItem = buildPath(target, ...accessPath);
  let assigner = new class {
    set value(value) {
      lastPathItem.target[lastPathItem.key] = value;
    }
    get value() {
      return lastPathItem.target[lastPathItem.key];
    }
  }();
  return assigner;
}
function append(target, ...accessPath) {
  if (accessPath.length < 1) {
    return new IgnoreAssign(target);
  }
  const lastPathItem = buildPath(target, ...accessPath);
  let appender = new class {
    set value(value) {
      if (!Array.isArray(value)) {
        value = [value];
      }
      if (!lastPathItem.target[lastPathItem.key]) {
        lastPathItem.target[lastPathItem.key] = value;
      } else {
        if (!Array.isArray(lastPathItem.target[lastPathItem.key])) {
          lastPathItem.target[lastPathItem.key] = [lastPathItem.target[lastPathItem.key]];
        }
        ;(0,_Es2019Array__WEBPACK_IMPORTED_MODULE_0__.pushChunked)(lastPathItem.target[lastPathItem.key], value);
      }
    }
  }();
  return appender;
}
function assignIf(condition, target, ...accessPath) {
  if (!condition || accessPath.length < 1) {
    return new IgnoreAssign(target);
  }
  return assign(target, ...accessPath);
}
function appendIf(condition, target, ...accessPath) {
  if (!condition || accessPath.length < 1) {
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
    currPtr = currPtr == null ? void 0 : currPtr[accessKeyIndex];
    if ("undefined" == typeof currPtr) {
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
  } else {
    return key;
  }
}
function arrayIndex(key) {
  let start = key.indexOf("[");
  let end = key.indexOf("]");
  if (start >= 0 && end > 0 && start < end) {
    return parseInt(key.substring(start + 1, end));
  } else {
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
  (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_0__.pushChunked)(arr, toAdd);
}
function flattenAccessPath(accessPath) {
  return new _Es2019Array__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...accessPath).flatMap((path) => path.split("[")).map((path) => path.indexOf("]") != -1 ? "[" + path : path).filter((path) => path != "");
}
function buildPath(target, ...accessPath) {
  accessPath = flattenAccessPath(accessPath);
  let parentPtr = target;
  let parKeyArrPos = null;
  let currKey = null;
  let arrPos = -1;
  for (let cnt = 0; cnt < accessPath.length; cnt++) {
    currKey = keyVal(accessPath[cnt]);
    arrPos = arrayIndex(accessPath[cnt]);
    if (arrPos != -1) {
      if (!Array.isArray(parentPtr)) {
        throw Error("Associative array referenced as index array in path reference");
      }
      let nextArrPos = -1;
      if (cnt < accessPath.length - 1) {
        nextArrPos = arrayIndex(accessPath[cnt + 1]);
      }
      let dataPresent = "undefined" != typeof (parentPtr == null ? void 0 : parentPtr[arrPos]);
      alloc(parentPtr, arrPos + 1, nextArrPos != -1 ? [] : {});
      parKeyArrPos = arrPos;
      if (cnt == accessPath.length - 1) {
        parentPtr[arrPos] = dataPresent ? parentPtr[arrPos] : null;
      } else {
        parentPtr = parentPtr[arrPos];
      }
    } else {
      if (Array.isArray(parentPtr)) {
        throw Error("Index array referenced as associative array in path reference");
      }
      let nextArrPos = -1;
      if (cnt < accessPath.length - 1) {
        nextArrPos = arrayIndex(accessPath[cnt + 1]);
      }
      parKeyArrPos = currKey;
      let dataPresent = "undefined" != typeof (parentPtr == null ? void 0 : parentPtr[currKey]);
      if (cnt == accessPath.length - 1) {
        if (!dataPresent) {
          parentPtr[currKey] = null;
        }
      } else {
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
function simpleShallowMerge(...assocArrays) {
  return shallowMerge(true, false, ...assocArrays);
}
function _appendWithOverwrite(withAppend, target, key, arr, toAssign) {
  if (!withAppend) {
    target[key] = arr[key];
  } else {
    if ("undefined" == typeof (target == null ? void 0 : target[key])) {
      target[key] = toAssign;
    } else if (!Array.isArray(target[key])) {
      let oldVal = target[key];
      let newVals = [];
      toAssign.forEach((item) => {
        if (oldVal != item) {
          newVals.push(item);
        }
      });
      target[key] = new _Es2019Array__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...[]);
      target[key].push(oldVal);
      (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_0__.pushChunked)(target[key], newVals);
    } else {
      let oldVal = target[key];
      let newVals = [];
      toAssign.forEach((item) => {
        if (oldVal.indexOf(item) == -1) {
          newVals.push(item);
        }
      });
      (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_0__.pushChunked)(target[key], newVals);
    }
  }
}
function _appendWithoutOverwrite(withAppend, target, key, arr, toAssign) {
  if (!withAppend) {
    return;
  } else {
    if ("undefined" == typeof (target == null ? void 0 : target[key])) {
      target[key] = toAssign;
    } else if (!Array.isArray(target[key])) {
      let oldVal = target[key];
      target[key] = new _Es2019Array__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...[]);
      target[key].push(oldVal);
      (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_0__.pushChunked)(target[key], toAssign);
    } else {
      (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_0__.pushChunked)(target[key], toAssign);
    }
  }
}
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
      if (overwrite || !(target == null ? void 0 : target[key])) {
        _appendWithOverwrite(withAppend, target, key, arr, toAssign);
      } else if (!overwrite && (target == null ? void 0 : target[key])) {
        _appendWithoutOverwrite(withAppend, target, key, arr, toAssign);
      }
    });
  });
  return target;
}
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
    return obj1.every((item, cnt) => deepEqual(item, obj2[cnt]));
  }
  if ("object" == typeof obj1 && "object" == typeof obj2) {
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    if (keys1.length != keys2.length) {
      return false;
    }
    return keys1.every((key) => keys2.indexOf(key) != -1) && keys1.every((key) => deepEqual(obj1[key], obj2[key]));
  }
  return false;
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

const _ConfigEntry = class _ConfigEntry extends _Monad__WEBPACK_IMPORTED_MODULE_1__.ValueEmbedder {
  constructor(rootElem, key, arrPos) {
    super(rootElem, key);
    this.arrPos = arrPos != null ? arrPos : -1;
  }
  get value() {
    if (this.key == "" && this.arrPos >= 0) {
      return this._value[this.arrPos];
    } else if (this.key && this.arrPos >= 0) {
      return this._value[this.key][this.arrPos];
    }
    return this._value[this.key];
  }
  set value(val) {
    if (this.key == "" && this.arrPos >= 0) {
      this._value[this.arrPos] = val;
      return;
    } else if (this.key && this.arrPos >= 0) {
      this._value[this.key][this.arrPos] = val;
      return;
    }
    this._value[this.key] = val;
  }
};
/*default value for absent*/
_ConfigEntry.absent = _ConfigEntry.fromNullable(null);
let ConfigEntry = _ConfigEntry;
const CONFIG_VALUE = "__END_POINT__";
const CONFIG_ANY = "__ANY_POINT__";
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
    let newThis = (0,_AssocArray__WEBPACK_IMPORTED_MODULE_3__.shallowMerge)(overwrite, withAppend, this.value, other.value);
    if (Array.isArray(this._value)) {
      this._value.length = 0;
      (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_0__.pushChunked)(this._value, newThis);
    } else {
      Object.getOwnPropertyNames(this._value).forEach((key) => delete this._value[key]);
      Object.getOwnPropertyNames(newThis).forEach((key) => this._value[key] = newThis[key]);
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    accessPath = this.preprocessKeys(...accessPath);
    if (!this.configDef) {
      return;
    }
    const ERR_ACCESS_PATH = "Access Path to config invalid";
    let currAccessPos = _Monad__WEBPACK_IMPORTED_MODULE_1__.Optional.fromNullable(Object.keys(this.configDef).map((key) => {
      let ret = {};
      ret[key] = this.configDef[key];
      return ret;
    }));
    for (let cnt = 0; cnt < accessPath.length; cnt++) {
      let currKey = this.keyVal(accessPath[cnt]);
      let arrPos = this.arrayIndex(accessPath[cnt]);
      if (this.isArray(arrPos)) {
        if (currKey != "") {
          currAccessPos = Array.isArray(currAccessPos.value) ? _Monad__WEBPACK_IMPORTED_MODULE_1__.Optional.fromNullable((_b = (_a = (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_0__.Es2019ArrayFrom)(currAccessPos.value).find((item) => {
            var _a2;
            return !!((_a2 = item == null ? void 0 : item[currKey]) != null ? _a2 : false);
          })) == null ? void 0 : _a[currKey]) == null ? void 0 : _b[arrPos]) : _Monad__WEBPACK_IMPORTED_MODULE_1__.Optional.fromNullable((_e = (_d = (_c = currAccessPos.value) == null ? void 0 : _c[currKey]) == null ? void 0 : _d[arrPos]) != null ? _e : null);
        } else {
          currAccessPos = Array.isArray(currAccessPos.value) ? _Monad__WEBPACK_IMPORTED_MODULE_1__.Optional.fromNullable((_f = currAccessPos.value) == null ? void 0 : _f[arrPos]) : _Monad__WEBPACK_IMPORTED_MODULE_1__.Optional.absent;
        }
      } else {
        currAccessPos = Array.isArray(currAccessPos.value) ? _Monad__WEBPACK_IMPORTED_MODULE_1__.Optional.fromNullable((_g = (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_0__.Es2019ArrayFrom)(currAccessPos.value).find((item) => {
          var _a2;
          return !!((_a2 = item == null ? void 0 : item[currKey]) != null ? _a2 : false);
        })) == null ? void 0 : _g[currKey]) : _Monad__WEBPACK_IMPORTED_MODULE_1__.Optional.fromNullable((_i = (_h = currAccessPos.value) == null ? void 0 : _h[currKey]) != null ? _i : null);
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
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
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





const trim = _Lang__WEBPACK_IMPORTED_MODULE_2__.Lang.trim;
const isString = _Lang__WEBPACK_IMPORTED_MODULE_2__.Lang.isString;
const eqi = _Lang__WEBPACK_IMPORTED_MODULE_2__.Lang.equalsIgnoreCase;
const objToArray = _Lang__WEBPACK_IMPORTED_MODULE_2__.Lang.objToArray;

function prependChunked(target, elements) {
  for (let end = elements.length; end > 0; end -= _Es2019Array__WEBPACK_IMPORTED_MODULE_4__.MAX_ARG_LENGTH) {
    const start = Math.max(0, end - _Es2019Array__WEBPACK_IMPORTED_MODULE_4__.MAX_ARG_LENGTH);
    target.prepend(...elements.slice(start, end));
  }
}
class NonceValueEmbedder extends _Monad__WEBPACK_IMPORTED_MODULE_0__.ValueEmbedder {
  constructor(rootElems) {
    super(rootElems == null ? void 0 : rootElems[0], "nonce");
    this.rootElems = rootElems;
  }
  isAbsent() {
    const value = this.value;
    return "undefined" == typeof value || "" == value;
  }
  get value() {
    var _a, _b, _c, _d, _e;
    return (_e = (_b = (_a = this == null ? void 0 : this.rootElems) == null ? void 0 : _a[0]) == null ? void 0 : _b.nonce) != null ? _e : (_d = (_c = this == null ? void 0 : this.rootElems) == null ? void 0 : _c[0]) == null ? void 0 : _d.getAttribute("nonce");
  }
  set value(newVal) {
    var _a;
    if (!((_a = this == null ? void 0 : this.rootElems) == null ? void 0 : _a.length)) {
      return;
    }
    this.rootElems.forEach((rootElem) => {
      if ("undefined" != typeof (rootElem == null ? void 0 : rootElem.nonce)) {
        rootElem.nonce = newVal;
      } else {
        rootElem.setAttribute("nonce", newVal);
      }
    });
  }
}
var ALLOWED_SUBMITTABLE_ELEMENTS = /* @__PURE__ */ ((ALLOWED_SUBMITTABLE_ELEMENTS2) => {
  ALLOWED_SUBMITTABLE_ELEMENTS2["SELECT"] = "select";
  ALLOWED_SUBMITTABLE_ELEMENTS2["BUTTON"] = "button";
  ALLOWED_SUBMITTABLE_ELEMENTS2["SUBMIT"] = "submit";
  ALLOWED_SUBMITTABLE_ELEMENTS2["RESET"] = "reset";
  ALLOWED_SUBMITTABLE_ELEMENTS2["IMAGE"] = "image";
  ALLOWED_SUBMITTABLE_ELEMENTS2["RADIO"] = "radio";
  ALLOWED_SUBMITTABLE_ELEMENTS2["CHECKBOX"] = "checkbox";
  return ALLOWED_SUBMITTABLE_ELEMENTS2;
})(ALLOWED_SUBMITTABLE_ELEMENTS || {});
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
    function findElement(root2, condition2) {
      let found = null;
      if (!!condition2(root2)) {
        return root2;
      }
      if (options.childList) {
        found = condition2(root2) ? root2 : root2.childNodes.filter((item) => condition2(item)).first().value.value;
      } else if (options.subtree) {
        found = condition2(root2) ? root2 : root2.querySelectorAll(" * ").filter((item) => condition2(item)).first().value.value;
      } else {
        found = condition2(root2) ? root2 : null;
      }
      return found;
    }
    let foundElement = root;
    if (!!(foundElement = findElement(foundElement, condition))) {
      success(new DomQuery(foundElement));
      return;
    }
    if ("undefined" != typeof MutationObserver) {
      const mutTimeout = setTimeout(() => {
        observer.disconnect();
        return error(MUT_ERROR);
      }, options.timeout);
      const callback = (mutationList) => {
        const found = new DomQuery(mutationList.map((mut) => mut.target)).filter((item) => condition(item)).first();
        if (found.isPresent()) {
          clearTimeout(mutTimeout);
          observer.disconnect();
          success(new DomQuery(found || root));
        }
      };
      observer = new MutationObserver(callback);
      let observableOpts = __spreadValues({}, options);
      delete observableOpts.timeout;
      root.eachElem((item) => {
        observer.observe(item, observableOpts);
      });
    } else {
      let interval;
      let timeout;
      interval = setInterval(() => {
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
      timeout = setTimeout(() => {
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
    return Style;
  }
  static fromNullable(value, valueKey = "value") {
    return new Style(value, valueKey);
  }
}
const DEFAULT_WHITELIST = () => {
  return true;
};
const _DomQuery = class _DomQuery {
  constructor(...rootNode) {
    this.rootNode = [];
    this.pos = -1;
    // because we can stream from an array stream directly into the dom query
    this._limits = -1;
    if (_Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(rootNode).isAbsent() || !rootNode.length) {
      return;
    } else {
      for (let cnt = 0; cnt < rootNode.length; cnt++) {
        if (!rootNode[cnt]) {
        } else if (isString(rootNode[cnt])) {
          let foundElement = _DomQuery.querySelectorAll(rootNode[cnt]);
          if (!foundElement.isAbsent()) {
            (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_4__.pushChunked)(rootNode, foundElement.values);
          }
        } else if (rootNode[cnt] instanceof _DomQuery) {
          (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_4__.pushChunked)(this.rootNode, rootNode[cnt].values);
        } else if (Array.isArray(rootNode[cnt])) {
          (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_4__.pushChunked)(rootNode, rootNode[cnt]);
        } else {
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
    return !this.isAbsent() && (this.nodeName.orElse("__none___").value.toLowerCase() == tagName.toLowerCase() || this.tagName.orElse("__none___").value.toLowerCase() == tagName.toLowerCase());
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
    } else {
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
    return (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019ArrayFrom)(this.values).every((el) => !!el.checked);
  }
  set checked(newChecked) {
    this.eachElem((el) => el.checked = newChecked);
  }
  get elements() {
    return this.querySelectorAll("input, select, textarea, fieldset");
  }
  get deepElements() {
    let elemStr = "input, select, textarea, fieldset";
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
    let shadowRoots = this._collectShadowRoots();
    if (shadowRoots.length) {
      let shadowRes = new _DomQuery(shadowRoots).querySelectorAllDeep(queryStr);
      if (shadowRes.length) {
        found.push(shadowRes);
      }
    }
    return new _DomQuery(found);
  }
  /**
   * Collects the shadow roots hosted by the light-DOM descendants of each root
   * node in a single pass.
   *
   * This replaces the prior `querySelectorAll("*").shadowRoot`, which
   * materialized a DomQuery wrapping every element on the page and then walked
   * that throwaway collection a second time through the shadowRoot getter. We
   * still have to inspect every element - there is no CSS selector for "has a
   * shadow root", so the cost stays O(number of elements) - but we drop the
   * intermediate all-elements DomQuery and the redundant second traversal.
   *
   * @private
   */
  _collectShadowRoots() {
    var _a, _b;
    let shadowRoots = [];
    for (let cnt = 0; cnt < ((_b = (_a = this == null ? void 0 : this.rootNode) == null ? void 0 : _a.length) != null ? _b : 0); cnt++) {
      let root = this.rootNode[cnt];
      if (!(root == null ? void 0 : root.querySelectorAll)) {
        continue;
      }
      let all = root.querySelectorAll("*");
      for (let i = 0, len = all.length; i < len; i++) {
        let shadowRoot = all[i].shadowRoot;
        if (shadowRoot) {
          shadowRoots.push(shadowRoot);
        }
      }
    }
    return shadowRoots;
  }
  /**
   * disabled flag
   */
  get disabled() {
    return this.attr("disabled").isPresent();
  }
  set disabled(disabled) {
    if (!disabled) {
      this.removeAttribute("disabled");
    } else {
      this.attr("disabled").value = "disabled";
    }
  }
  removeAttribute(name) {
    this.eachElem((item) => item.removeAttribute(name));
  }
  get childNodes() {
    let childNodeArr = [];
    this.eachElem((item) => {
      (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_4__.pushChunked)(childNodeArr, item.childNodes);
    });
    return new _DomQuery(childNodeArr);
  }
  get asArray() {
    let items = (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019ArrayFrom)(this.rootNode).filter((item) => {
      return item != null;
    }).map((item) => {
      return _DomQuery.byId(item);
    });
    return items;
  }
  get offsetWidth() {
    return (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019ArrayFrom)(this.rootNode).filter((item) => item != null).map((elem) => elem.offsetWidth).reduce((accumulate, incoming) => accumulate + incoming, 0);
  }
  get offsetHeight() {
    return (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019ArrayFrom)(this.rootNode).filter((item) => item != null).map((elem) => elem.offsetHeight).reduce((accumulate, incoming) => accumulate + incoming, 0);
  }
  get offsetLeft() {
    return (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019ArrayFrom)(this.rootNode).filter((item) => item != null).map((elem) => elem.offsetLeft).reduce((accumulate, incoming) => accumulate + incoming, 0);
  }
  get offsetTop() {
    return (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019ArrayFrom)(this.rootNode).filter((item) => item != null).map((elem) => elem.offsetTop).reduce((accumulate, incoming) => accumulate + incoming, 0);
  }
  get asNodeArray() {
    return (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019ArrayFrom)(this.rootNode.filter((item) => item != null));
  }
  get nonce() {
    return new NonceValueEmbedder(this.rootNode);
  }
  static querySelectorAllDeep(selector) {
    return new _DomQuery(document).querySelectorAllDeep(selector);
  }
  /**
   * easy query selector all producer
   *
   * @param selector the selector
   * @returns a results dom query object
   */
  static querySelectorAll(selector) {
    if (selector.indexOf("/shadow/") != -1) {
      return new _DomQuery(document)._querySelectorAllDeep(selector);
    } else {
      return new _DomQuery(document)._querySelectorAll(selector);
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
      return !deep ? new _DomQuery(document).byId(selector) : new _DomQuery(document).byIdDeep(selector);
    } else {
      return new _DomQuery(selector);
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
      return new _DomQuery(document).byTagName(selector);
    } else {
      return new _DomQuery(selector);
    }
  }
  static globalEval(code, nonce) {
    return new _DomQuery(document).globalEval(code, nonce);
  }
  static globalEvalSticky(code, nonce) {
    return new _DomQuery(document).globalEvalSticky(code, nonce);
  }
  /**
   * builds the ie nodes properly in a placeholder
   * and bypasses a non script insert bug that way
   * @param markup the markup code to be executed from
   */
  static fromMarkup(markup) {
    const doc = document.implementation.createHTMLDocument("");
    markup = trim(markup);
    let lowerMarkup = markup.toLowerCase();
    if (lowerMarkup.search(/<!doctype[^\w\-]+/gi) != -1 || lowerMarkup.search(/<html[^\w\-]+/gi) != -1 || lowerMarkup.search(/<head[^\w\-]+/gi) != -1 || lowerMarkup.search(/<body[^\w\-]+/gi) != -1) {
      doc.documentElement.innerHTML = markup;
      return new _DomQuery(doc.documentElement);
    } else {
      let startsWithTag = function(str, tagName) {
        let tag1 = ["<", tagName, ">"].join("");
        let tag2 = ["<", tagName, " "].join("");
        return str.indexOf(tag1) == 0 || str.indexOf(tag2) == 0;
      };
      let dummyPlaceHolder = new _DomQuery(document.createElement("div"));
      if (startsWithTag(lowerMarkup, "thead") || startsWithTag(lowerMarkup, "tbody") || startsWithTag(lowerMarkup, "tfoot")) {
        dummyPlaceHolder.html(`<table>${markup}</table>`);
        return dummyPlaceHolder.querySelectorAll("table").get(0).childNodes.detach();
      } else if (startsWithTag(lowerMarkup, "tr")) {
        dummyPlaceHolder.html(`<table><tbody>${markup}</tbody></table>`);
        return dummyPlaceHolder.querySelectorAll("tbody").get(0).childNodes.detach();
      } else if (startsWithTag(lowerMarkup, "td") || startsWithTag(lowerMarkup, "th")) {
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
    return index < this.rootNode.length ? new _DomQuery(this.rootNode[index]) : _DomQuery.absent;
  }
  /**
   * returns the nth element as optional of an Element object
   * @param index the number from the index
   * @param defaults the default value if the index is overrun default Optional\.absent
   */
  getAsElem(index, defaults = _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.absent) {
    return index < this.rootNode.length ? _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(this.rootNode[index]) : defaults;
  }
  /**
   * returns the files from a given element
   * @param index
   */
  filesFromElem(index) {
    var _a;
    return index < this.rootNode.length ? ((_a = this.rootNode[index]) == null ? void 0 : _a.files) ? this.rootNode[index].files : [] : [];
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
  ifPresentLazy(presentRunnable = function() {
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
    if (selector.indexOf("/shadow/") != -1) {
      return this._querySelectorAllDeep(selector);
    } else {
      return this._querySelectorAll(selector);
    }
  }
  closest(selector) {
    if (selector.indexOf("/shadow/") != -1) {
      return this._closestDeep(selector);
    } else {
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
      res = res.concat(
        (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019ArrayFrom)((this == null ? void 0 : this.rootNode) || []).filter((item) => id == item.id).map((item) => new _DomQuery(item))
      );
    }
    res = res.concat(this.querySelectorAll(`[id="${id}"]`));
    return new _DomQuery(res);
  }
  byIdDeep(id, includeRoot) {
    let res = [];
    if (includeRoot) {
      res = res.concat(
        (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019ArrayFrom)((this == null ? void 0 : this.rootNode) || []).filter((item) => id == item.id).map((item) => new _DomQuery(item))
      );
    }
    let subItems = this.querySelectorAllDeep(`[id="${id}"]`);
    if (subItems.length) {
      res.push(subItems);
    }
    return new _DomQuery(res);
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
      let matchingRoots = (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019ArrayFrom)((_a = this == null ? void 0 : this.rootNode) != null ? _a : []).filter((element) => (element == null ? void 0 : element.tagName) == tagName);
      (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_4__.pushChunked)(res, matchingRoots);
    }
    deep ? res.push(this.querySelectorAllDeep(tagName)) : res.push(this.querySelectorAll(tagName));
    return new _DomQuery(res);
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
    this.eachElem((node) => {
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
    this.eachElem((item) => item.classList.add(clazz));
    return this;
  }
  /**
   * remove the style class if in the class definitions
   *
   * @param clazz
   */
  removeClass(clazz) {
    this.eachElem((item) => item.classList.remove(clazz));
    return this;
  }
  /**
   * checks whether we have a multipart element in our children
   * or are one
   */
  isMultipartCandidate(deep = false) {
    const FILE_INPUT = "input[type='file']";
    return this.matchesSelector(FILE_INPUT) || (!deep ? this.querySelectorAll(FILE_INPUT) : this.querySelectorAllDeep(FILE_INPUT)).first().isPresent();
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
    this.eachElem((elem) => elem.dispatchEvent(evt));
    return this;
  }
  /**
   * abbreviation property to use innerHTML directly like on the dom tree
   * @param newInnerHTML  the new inner html which should be attached to "this" domQuery
   */
  set innerHTML(newInnerHTML) {
    this.eachElem((elem) => elem.innerHTML = newInnerHTML);
  }
  /**
   * getter abbreviation to use innerHTML directly
   */
  get innerHTML() {
    let retArr = [];
    this.eachElem((elem) => retArr.push(elem.innerHTML));
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
    this.eachElem((item) => {
      if (this._matchesSelector(item, selector)) {
        matched.push(item);
      }
    });
    return new _DomQuery(matched);
  }
  /**
   * checks whether any item in this domQuery level matches the selector
   * if there is one element only attached, as root the match is only
   * performed on this element.
   * @param selector
   */
  matchesSelector(selector) {
    return this.asArray.some((item) => this._matchesSelector(item.getAsElem(0).value, selector));
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
  firstElem(func = (item) => item) {
    if (this.rootNode.length > 0) {
      func(this.rootNode[0], 0);
    }
    return this;
  }
  lastElem(func = (item) => item) {
    if (this.rootNode.length > 0) {
      func(this.rootNode[this.rootNode.length - 1], this.rootNode.length - 1);
    }
    return this;
  }
  each(func) {
    ;(0,_Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019ArrayFrom)(this.rootNode).forEach((item, cnt) => {
      if (item == null) {
        return;
      }
      return func(_DomQuery.byId(item), cnt);
    });
    return this;
  }
  /**
   * replace convenience function, replaces one or more elements with
   * a set of elements passed as DomQuery
   * @param toReplace the replaced nodes as reference (original node has been replaced)
   */
  replace(toReplace) {
    this.each((item) => {
      let asElem = item.getAsElem(0).value;
      let parent = asElem.parentElement;
      let nextElement = asElem.nextElementSibling;
      let previousElement = asElem.previousElementSibling;
      if (nextElement != null) {
        new _DomQuery(nextElement).insertBefore(toReplace);
      } else if (previousElement) {
        new _DomQuery(previousElement).insertAfter(toReplace);
      } else {
        new _DomQuery(parent).append(toReplace);
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
    return new _DomQuery(reArr);
  }
  /**
   * global eval head appendix method
   * no other methods are supported anymore
   * @param code the code to be evaluated
   * @param  nonce optional  nonce key for higher security
   */
  globalEval(code, nonce) {
    var _a, _b, _c;
    const head = (_c = (_a = document.getElementsByTagName("head")) == null ? void 0 : _a[0]) != null ? _c : (_b = document.documentElement.getElementsByTagName("head")) == null ? void 0 : _b[0];
    const script = document.createElement("script");
    if (nonce) {
      if ("undefined" != typeof (script == null ? void 0 : script.nonce)) {
        script.nonce = nonce;
      } else {
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
      this.appendTo(_DomQuery.querySelectorAll(elem));
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
    this.each((existingItem) => {
      let existingElement = existingItem.getAsElem(0).value;
      let rootNode = existingElement.parentNode;
      for (let cnt = 0; cnt < toInsertParams.length; cnt++) {
        let nextSibling = existingElement.nextSibling;
        toInsertParams[cnt].eachElem((insertElem) => {
          if (nextSibling) {
            rootNode.insertBefore(insertElem, nextSibling);
            existingElement = nextSibling;
          } else {
            rootNode.appendChild(insertElem);
          }
        });
      }
    });
    let res = [];
    res.push(this);
    res = res.concat(toInsertParams);
    return new _DomQuery(res);
  }
  insertBefore(...toInsertParams) {
    this.each((existingItem) => {
      let existingElement = existingItem.getAsElem(0).value;
      let rootNode = existingElement.parentNode;
      for (let cnt = 0; cnt < toInsertParams.length; cnt++) {
        toInsertParams[cnt].eachElem((insertElem) => {
          rootNode.insertBefore(insertElem, existingElement);
        });
      }
    });
    let res = [];
    res.push(this);
    res = res.concat(toInsertParams);
    return new _DomQuery(res);
  }
  orElse(...elseValue) {
    if (this.isPresent()) {
      return this;
    } else {
      return new _DomQuery(...elseValue);
    }
  }
  orElseLazy(func) {
    if (this.isPresent()) {
      return this;
    } else {
      return new _DomQuery(func());
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
    return new _DomQuery(ret);
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
    return _DomQuery.absent;
  }
  /**
   * fetches all parents as long as the filter criterium matches
   * @param selector
   */
  parentsWhileMatch(selector) {
    const retArr = [];
    let parent = this.parent().filter((item) => item.matchesSelector(selector));
    while (parent.isPresent()) {
      retArr.push(parent);
      parent = parent.parent().filter((item) => item.matchesSelector(selector));
    }
    return new _DomQuery(retArr);
  }
  parent() {
    let ret = [];
    this.eachElem((item) => {
      let parent = item.parentNode || item.host || item.shadowRoot;
      if (parent && ret.indexOf(parent) == -1) {
        ret.push(parent);
      }
    });
    return new _DomQuery(ret);
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
            break;
          default:
            this.attr(name).value = value;
        }
      }
    });
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
      return void 0;
    }
    let toReplace = this.getAsElem(0).value;
    let activeElement = document == null ? void 0 : document.activeElement;
    let focusElementId = activeElement == null ? void 0 : activeElement.id;
    let restoreFocus = !!focusElementId && !!((_a = toReplace == null ? void 0 : toReplace.contains) == null ? void 0 : _a.call(toReplace, activeElement));
    let caretPosition = restoreFocus ? _DomQuery.getCaretPosition(activeElement) : null;
    let nodes = _DomQuery.fromMarkup(markup);
    let res = [];
    let firstInsert = nodes.get(0);
    let parentNode = toReplace.parentNode;
    let replaced = firstInsert.getAsElem(0).value;
    parentNode.replaceChild(replaced, toReplace);
    res.push(new _DomQuery(replaced));
    if (this.isAbsent()) {
      return this;
    }
    let insertAdditionalItems = [];
    if (nodes.length > 1) {
      insertAdditionalItems = insertAdditionalItems.concat(nodes.values.slice(1));
      res.push(_DomQuery.byId(replaced).insertAfter(new _DomQuery(insertAdditionalItems)));
    }
    if (runEmbeddedScripts) {
      this.runScripts();
    }
    if (runEmbeddedCss) {
      this.runCss();
    }
    if (restoreFocus) {
      let focusElement = _DomQuery.byId(focusElementId);
      if (focusElement.isPresent() && caretPosition != null && "undefined" != typeof caretPosition) {
        focusElement.eachElem((item) => _DomQuery.setCaretPosition(item, caretPosition));
      }
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
        let joinedScripts = [];
        (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_4__.Es2019ArrayFrom)(scriptsToProcess).forEach((item) => {
          if (!item.nonce) {
            joinedScripts.push(item.evalText);
          } else {
            if (joinedScripts.length) {
              this.globalEval(joinedScripts.join("\n"));
              joinedScripts.length = 0;
            }
            !sticky ? this.globalEval(item.evalText, item.nonce) : this.globalEvalSticky(item.evalText, item.nonce);
          }
        });
        if (joinedScripts.length) {
          !sticky ? this.globalEval(joinedScripts.join("\n")) : this.globalEvalSticky(joinedScripts.join("\n"));
          joinedScripts.length = 0;
        }
        scriptsToProcess = [];
      }
      return scriptsToProcess;
    };
    let finalScripts = [], allowedItemTypes = ["", "script", "text/javascript", "text/ecmascript", "ecmascript"], execScript = (item) => {
      var _a;
      let tagName = item.tagName;
      let itemType = ((_a = item == null ? void 0 : item.type) != null ? _a : "").toLowerCase();
      if (tagName && eqi(tagName, "script") && allowedItemTypes.indexOf(itemType) != -1) {
        let src = item.getAttribute("src");
        if ("undefined" != typeof src && null != src && src.length > 0) {
          let nonce = (item == null ? void 0 : item.nonce) || item.getAttribute("nonce");
          if (whitelisted(src)) {
            finalScripts = evalCollectedScripts(finalScripts);
            if (!sticky) {
              !!nonce ? this.loadScriptEval(src, 0, nonce) : (
                // if no nonce is set we do not pass any once
                this.loadScriptEval(src, 0)
              );
            } else {
              !!nonce ? this.loadScriptEvalSticky(src, 0, nonce) : (
                // if no nonce is set we do not pass any once
                this.loadScriptEvalSticky(src, 0)
              );
            }
          }
        } else {
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
          let nonce = (item == null ? void 0 : item.nonce) || item.getAttribute("nonce") || "";
          finalScripts.push({
            nonce,
            evalText
          });
        }
      }
    };
    try {
      let scriptElements = new _DomQuery(this.filterSelector("script"), this.querySelectorAll("script"));
      scriptElements.asArray.flatMap((item) => [...item.values]).sort((node1, node2) => node2.compareDocumentPosition(node1) - 3).forEach((item) => execScript(item));
      evalCollectedScripts(finalScripts);
    } catch (e) {
      if (console && console.error) {
        const error = e;
        console.error(error.message || error.description);
      }
    } finally {
      execScript = null;
    }
    return this;
  }
  runCss() {
    const execCss = (toReplace) => {
      const _toReplace = _DomQuery.byId(toReplace);
      const tagName = _toReplace.tagName.orElse("").value;
      let newElement = _DomQuery.fromMarkup(`<${tagName.toLowerCase()} />`);
      newElement = newElement.copyAttrs(_toReplace);
      newElement.innerHTML = toReplace.innerHTML;
      _toReplace.replace(newElement);
    };
    const cssElems = new _DomQuery(this.filterSelector("link, style"), this.querySelectorAll("link, style"));
    cssElems.asArray.flatMap((item) => [...item.values]).sort((node1, node2) => node1.compareDocumentPosition(node2) - 3).forEach((item) => execCss(item));
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
    let finalOptions = {
      bubbles: true,
      cancelable: true
    };
    finalOptions = (0,_AssocArray__WEBPACK_IMPORTED_MODULE_5__.simpleShallowMerge)(finalOptions, options);
    this.eachElem((node) => {
      let doc;
      if (node.ownerDocument) {
        doc = node.ownerDocument;
      } else if (node.nodeType == 9) {
        doc = node;
      } else {
        throw new Error("Invalid node passed to fireEvent: " + node.id);
      }
      if (node.dispatchEvent) {
        let EventClass = Event;
        switch (eventName) {
          case "click":
          // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
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
        event.synthetic = true;
        node.dispatchEvent(event);
      } else if (node.fireEvent) {
        let event = doc.createEventObject();
        event.synthetic = true;
        Object.keys(finalOptions).forEach((key) => event[key] = finalOptions[key]);
        node.fireEvent("on" + eventName, event);
      }
    });
  }
  textContent(joinString = "") {
    return this.asArray.map((value) => {
      let item = value.getAsElem(0).orElseLazy(() => {
        return {
          textContent: ""
        };
      }).value;
      return item.textContent || "";
    }).reduce((text1, text2) => [text1, joinString, text2].join(""), "");
  }
  innerText(joinString = "") {
    return this.asArray.map((value) => {
      let item = value.getAsElem(0).orElseLazy(() => {
        return {
          innerText: ""
        };
      }).value;
      return item.innerText || "";
    }).reduce((text1, text2) => {
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
    if (this.name.isAbsent()) {
      return void 0;
    }
    let target = (0,_AssocArray__WEBPACK_IMPORTED_MODULE_5__.simpleShallowMerge)(toMerge);
    this.each((element) => {
      var _a, _b;
      if (element.name.isAbsent()) {
        return;
      }
      let name = element.name.value;
      let tagName = element.tagName.orElse("__none__").value.toLowerCase();
      let elemType = element.type.orElse("__none__").value.toLowerCase();
      elemType = elemType.toLowerCase();
      if ((tagName == "input" || tagName == "textarea" || tagName == "select") && (name != null && name != "") && !element.disabled) {
        if (tagName == "select") {
          let selectElem = element.getAsElem(0).value;
          if (selectElem.selectedIndex >= 0) {
            let uLen = selectElem.options.length;
            for (let u = 0; u < uLen; u++) {
              if (selectElem.options[u].selected) {
                let elementOption = selectElem.options[u];
                (0,_AssocArray__WEBPACK_IMPORTED_MODULE_5__.append)(target, name).value = elementOption.getAttribute("value") != null ? elementOption.value : elementOption.text;
              }
            }
          }
        }
        if (tagName != "select" /* SELECT */ && elemType != "button" /* BUTTON */ && elemType != "reset" /* RESET */ && elemType != "submit" /* SUBMIT */ && elemType != "image" /* IMAGE */ && (elemType != "checkbox" /* CHECKBOX */ && elemType != "radio" /* RADIO */ || element.checked)) {
          let uploadedFiles = (_b = (_a = element.value) == null ? void 0 : _a.value) == null ? void 0 : _b.files;
          let filesArr = uploadedFiles != null ? uploadedFiles : [];
          if (filesArr == null ? void 0 : filesArr.length) {
            (0,_AssocArray__WEBPACK_IMPORTED_MODULE_5__.assign)(target, name).value = Array.from(filesArr);
          } else {
            if (!!uploadedFiles) {
              return;
            }
            ;(0,_AssocArray__WEBPACK_IMPORTED_MODULE_5__.append)(target, name).value = element.inputValue.value;
          }
        }
      }
    });
    return target;
  }
  get cDATAAsString() {
    let TYPE_CDATA_BLOCK = 4;
    let res = this.asArray.flatMap((item) => {
      return item.childNodes.asArray;
    }).filter((item) => {
      var _a, _b;
      return ((_b = (_a = item == null ? void 0 : item.value) == null ? void 0 : _a.value) == null ? void 0 : _b.nodeType) == TYPE_CDATA_BLOCK;
    }).reduce((reduced, item) => {
      var _a, _b, _c;
      reduced.push((_c = (_b = (_a = item == null ? void 0 : item.value) == null ? void 0 : _a.value) == null ? void 0 : _b.data) != null ? _c : "");
      return reduced;
    }, []);
    return res.join("");
  }
  subNodes(from, to) {
    if (_Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(to).isAbsent()) {
      to = this.length;
    }
    return new _DomQuery(this.rootNode.slice(from, Math.min(to, this.length)));
  }
  limits(end) {
    this._limits = end;
    return this;
  }
  //-- internally exposed methods needed for the interconnectivity
  hasNext() {
    let isLimitsReached = this._limits != -1 && this.pos >= this._limits - 1;
    let isEndOfArray = this.pos >= this.values.length - 1;
    return !(isLimitsReached || isEndOfArray);
  }
  next() {
    if (!this.hasNext()) {
      return null;
    }
    this.pos++;
    return new _DomQuery(this.values[this.pos]);
  }
  lookAhead(cnt = 1) {
    if (this.values.length - 1 < this.pos + cnt) {
      return _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ITERATION_STATUS.EO_STRM;
    }
    return new _DomQuery(this.values[this.pos + cnt]);
  }
  current() {
    if (this.pos == -1) {
      return _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ITERATION_STATUS.BEF_STRM;
    }
    return new _DomQuery(this.values[this.pos]);
  }
  reset() {
    this.pos = -1;
  }
  attachShadow(params = { mode: "open" }) {
    let shadowRoots = [];
    this.eachElem((item) => {
      let shadowElement;
      if (item == null ? void 0 : item.attachShadow) {
        shadowElement = _DomQuery.byId(item.attachShadow(params));
        shadowRoots.push(shadowElement);
      } else {
        throw new Error("Shadow dom creation not supported by the browser, please use a shim, to gain this functionality");
      }
    });
    return new _DomQuery(shadowRoots);
  }
  /**
   * helper to fix a common dom problem
   * we have to wait until a certain condition is met, in most of the cases we just want to know whether an element is present in the sub dom-tree before being able to proceed
   * @param condition
   * @param options
   */
  waitUntilDom(_0) {
    return __async(this, arguments, function* (condition, options = {
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
    let shadowElements = this.querySelectorAll("*").filter((item) => item.hasShadow);
    let mapped = (shadowElements.allElems() || []).map((element) => element.shadowRoot).filter((root) => !!root);
    return new _DomQuery(mapped);
  }
  get shadowRoot() {
    let shadowRoots = [];
    for (let cnt = 0; cnt < this.rootNode.length; cnt++) {
      if (this.rootNode[cnt].shadowRoot) {
        shadowRoots.push(this.rootNode[cnt].shadowRoot);
      }
    }
    return new _DomQuery(shadowRoots);
  }
  get hasShadow() {
    for (let cnt = 0; cnt < this.rootNode.length; cnt++) {
      if (this.rootNode[cnt].shadowRoot) {
        return true;
      }
    }
    return false;
  }
  static getCaretPosition(ctrl) {
    try {
      if (typeof (ctrl == null ? void 0 : ctrl.selectionStart) === "number") {
        return ctrl.selectionStart;
      }
    } catch (e) {
    }
    return 0;
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
    (ctrl == null ? void 0 : ctrl.focus) ? ctrl == null ? void 0 : ctrl.focus() : null;
    try {
      (ctrl == null ? void 0 : ctrl.setSelectionRange) ? ctrl == null ? void 0 : ctrl.setSelectionRange(pos, pos) : null;
    } catch (e) {
    }
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
          done,
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
    const ret = new _DomQuery(domQueries.concat(toAttach.asArray));
    if (!filterDoubles) {
      return ret;
    }
    let idx = {};
    return new _DomQuery(ret.asArray.filter((node) => {
      const notFound = !(idx == null ? void 0 : idx[node.value.value.outerHTML]);
      idx[node.value.value.outerHTML] = true;
      return notFound;
    }));
  }
  append(elem) {
    this.each((item) => elem.appendTo(item));
    return this;
  }
  prependTo(elem) {
    elem.eachElem((item) => {
      prependChunked(item, this.allElems());
    });
    return this;
  }
  prepend(elem) {
    this.eachElem((item) => {
      prependChunked(item, elem.allElems());
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
    if (!((_a = this == null ? void 0 : this.rootNode) == null ? void 0 : _a.length)) {
      return this;
    }
    let nodes = [];
    for (let cnt = 0; cnt < this.rootNode.length; cnt++) {
      if (!((_b = this.rootNode[cnt]) == null ? void 0 : _b.querySelectorAll)) {
        continue;
      }
      let res = this.rootNode[cnt].querySelectorAll(selector);
      (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_4__.pushChunked)(nodes, res);
    }
    return new _DomQuery(nodes);
  }
  /*deep with a selector and a pseudo /shadow/ marker to break into the next level*/
  _querySelectorAllDeep(selector) {
    var _a;
    if (!((_a = this == null ? void 0 : this.rootNode) == null ? void 0 : _a.length)) {
      return this;
    }
    let foundNodes = new _DomQuery(this.rootNode);
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
    if (!((_a = this == null ? void 0 : this.rootNode) == null ? void 0 : _a.length)) {
      return this;
    }
    let nodes = [];
    for (let cnt = 0; cnt < this.rootNode.length; cnt++) {
      if (!((_b = this.rootNode[cnt]) == null ? void 0 : _b.closest)) {
        continue;
      }
      let res = [this.rootNode[cnt].closest(selector)];
      nodes = nodes.concat(res);
    }
    return new _DomQuery(nodes);
  }
  /*deep with a selector and a pseudo /shadow/ marker to break into the next level*/
  _closestDeep(selector) {
    var _a;
    if (!((_a = this == null ? void 0 : this.rootNode) == null ? void 0 : _a.length)) {
      return this;
    }
    let foundNodes = new _DomQuery(this.rootNode);
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
    nonceCheck.innerHTML = `document.head["${marker}"] = true`;
    let head = document.head;
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
      } else {
        setTimeout(() => {
          head.appendChild(srcNode);
          if (!sticky) {
            head.removeChild(srcNode);
          }
        }, delay);
      }
    } finally {
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
    return attrName in this.getAsElem(0).value ? this.getAsElem(0).value : ret;
  }
  createSourceNode(src, nonce) {
    let srcNode = document.createElement("script");
    srcNode.type = "text/javascript";
    if (!!nonce) {
      if ("undefined" != typeof (srcNode == null ? void 0 : srcNode.nonce)) {
        srcNode.nonce = nonce;
      } else {
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
      if ("undefined" != typeof (script == null ? void 0 : script.nonce)) {
        script.nonce = nonce;
      } else {
        script.setAttribute("nonce", nonce);
      }
    }
  }
};
_DomQuery.absent = new _DomQuery();
/**
 * reference to the environmental global object
 */
_DomQuery.global = _Global__WEBPACK_IMPORTED_MODULE_3__._global$;
let DomQuery = _DomQuery;
class DomQueryCollector {
  constructor() {
    this.data = [];
  }
  collect(element) {
    this.data.push(element);
  }
  get finalValue() {
    return new DomQuery(this.data);
  }
}
const DQ = DomQuery;
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
/* harmony export */   Es2019ArrayFrom: () => (/* binding */ Es2019ArrayFrom),
/* harmony export */   MAX_ARG_LENGTH: () => (/* binding */ MAX_ARG_LENGTH),
/* harmony export */   _Es2019Array: () => (/* binding */ _Es2019Array),
/* harmony export */   _Es2019ArrayFromArr: () => (/* binding */ _Es2019ArrayFromArr),
/* harmony export */   pushChunked: () => (/* binding */ pushChunked)
/* harmony export */ });
const MAX_ARG_LENGTH = 3e4;
function pushChunked(target, source) {
  for (let start = 0, len = source.length; start < len; start += MAX_ARG_LENGTH) {
    Array.prototype.push.apply(target, Array.prototype.slice.call(source, start, start + MAX_ARG_LENGTH));
  }
  return target;
}
class Es2019Array_ extends Array {
  constructor(another = []) {
    super();
    another = Array.isArray(another) ? another : [another];
    if (another._another) {
      this._another = another._another;
    } else {
      this._another = another;
    }
    pushChunked(this, another);
    this.flatMap = (flatMapFun) => this._flatMap(flatMapFun);
    this.flat = (flatLevel = 1) => this._flat(flatLevel);
  }
  map(callbackfn, thisArg) {
    const ret = Array.prototype.map.call(this._another, callbackfn, thisArg);
    return _Es2019ArrayFromArr(ret);
  }
  concat(...items) {
    const ret = Array.prototype.concat.apply(this._another, items);
    return _Es2019ArrayFromArr(ret);
  }
  reverse() {
    const ret = Array.prototype.reverse.call(this._another);
    return _Es2019ArrayFromArr(ret);
  }
  slice(start, end) {
    const ret = Array.prototype.slice.call(this._another, start, end);
    return _Es2019ArrayFromArr(ret);
  }
  splice(start, deleteCount) {
    const ret = Array.prototype.splice.call(this._another, start, deleteCount != null ? deleteCount : 0);
    return _Es2019ArrayFromArr(ret);
  }
  filter(predicate, thisArg) {
    const ret = Array.prototype.filter.call(this._another, predicate, thisArg);
    return _Es2019ArrayFromArr(ret);
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
    return Es2019ArrayFrom(res);
  }
  _flatMap(mapperFunction) {
    let res = this.map((item) => mapperFunction(item));
    return this._flatResolve(res);
  }
}
function _Es2019Array(...data) {
  return _Es2019ArrayFromArr(data);
}
function _Es2019ArrayFromArr(data) {
  let ret = new Es2019Array_(data);
  let proxied = new Proxy(ret, {
    get(target, p, receiver) {
      if ("symbol" == typeof p) {
        return target._another[p];
      }
      if (!isNaN(parseInt(p))) {
        return target._another[p];
      } else {
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
var Es2019Array = Array.prototype.flatMap ? function(...data) {
  return (data == null ? void 0 : data.flatMap) ? data : _Es2019ArrayFromArr(data);
} : _Es2019Array;
function Es2019ArrayFrom(source) {
  const data = pushChunked([], source);
  return Array.prototype.flatMap ? data : _Es2019ArrayFromArr(data);
}


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
function _global$() {
  var _a;
  let _global$2 = "undefined" != typeof globalThis && globalThis.window ? globalThis.window : "undefined" != typeof window ? window : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof __webpack_require__.g && (__webpack_require__.g == null ? void 0 : __webpack_require__.g.window) ? __webpack_require__.g.window : "undefined" != typeof __webpack_require__.g ? __webpack_require__.g : null;
  return (_a = _global$2 == null ? void 0 : _global$2.window) != null ? _a : _global$2;
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


var Lang;
((Lang2) => {
  function saveResolve(resolverProducer, defaultValue = null) {
    try {
      let result = resolverProducer();
      return _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(result != null ? result : defaultValue);
    } catch (e) {
      return _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.absent;
    }
  }
  Lang2.saveResolve = saveResolve;
  function saveResolveLazy(resolverProducer, defaultValue = null) {
    try {
      let result = resolverProducer();
      return _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(result != null ? result : defaultValue());
    } catch (e) {
      return _Monad__WEBPACK_IMPORTED_MODULE_0__.Optional.absent;
    }
  }
  Lang2.saveResolveLazy = saveResolveLazy;
  function strToArray(it, splitter = /\./gi) {
    let ret = [];
    it.split(splitter).forEach(((element) => {
      ret.push(trim(element));
    }));
    return ret;
  }
  Lang2.strToArray = strToArray;
  function trim(str) {
    str = str.replace(/^\s\s*/, "");
    let ws = /\s/, i = str.length;
    while (ws.test(str.charAt(--i))) {
    }
    return str.slice(0, i + 1);
  }
  Lang2.trim = trim;
  function objToArray(obj, offset = 0, pack = []) {
    if ((obj != null ? obj : "__undefined__") == "__undefined__") {
      return pack != null ? pack : null;
    }
    if (obj instanceof Array && !offset && !pack) return obj;
    return (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_1__.Es2019ArrayFrom)(pack.concat(Array.prototype.slice.call(obj, offset)));
  }
  Lang2.objToArray = objToArray;
  function equalsIgnoreCase(source, destination) {
    let finalSource = source != null ? source : "___no_value__";
    let finalDest = destination != null ? destination : "___no_value__";
    return finalSource.toLowerCase() === finalDest.toLowerCase();
  }
  Lang2.equalsIgnoreCase = equalsIgnoreCase;
  function assertType(probe, theType) {
    return isString(theType) ? typeof probe == theType : probe instanceof theType;
  }
  Lang2.assertType = assertType;
  function isString(it) {
    return !!arguments.length && it != null && (typeof it == "string" || it instanceof String);
  }
  Lang2.isString = isString;
  function isFunc(it) {
    return it instanceof Function || typeof it === "function";
  }
  Lang2.isFunc = isFunc;
  function objAssign(target, ...theArgs) {
    if (target == null) {
      throw new TypeError("Cannot convert undefined or null to object");
    }
    let to = Object(target);
    if (Object.assign) {
      theArgs.forEach((item) => Object.assign(to, item));
      return to;
    }
    theArgs.filter((item) => item != null).forEach((item) => {
      let nextSource = item;
      const stringKeys = Object.keys(nextSource);
      const symbolKeys = Object.getOwnPropertySymbols(nextSource).filter((sym) => Object.prototype.propertyIsEnumerable.call(nextSource, sym));
      [...stringKeys, ...symbolKeys].forEach((key) => to[key] = nextSource[key]);
    });
    return to;
  }
  Lang2.objAssign = objAssign;
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
    while ((mapped == null ? void 0 : mapped.value) instanceof Monad) {
      mapped = mapped.value;
    }
    return mapped;
  }
}
const _Optional = class _Optional extends Monad {
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
    return new _Optional(value);
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
    } else {
      if (elseValue == null) {
        return _Optional.absent;
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
    } else {
      return this.flatMap(func);
    }
  }
  /*
   * we need to implement it to fulfill the contract, although it is used only internally
   * all values are flattened when accessed anyway, so there is no need to call this method
   */
  flatMap(fn) {
    let val = super.flatMap(fn);
    if (!(val instanceof _Optional)) {
      return _Optional.fromNullable(val.value);
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
        currentPos = this.getClass().fromNullable(!(currentPos.value instanceof Array) ? null : currentPos.value.length < arrPos ? null : currentPos.value[arrPos]);
        if (currentPos.isAbsent()) {
          return currentPos;
        }
        continue;
      } else if (currKey && arrPos >= 0) {
        if (currentPos.getIfPresent(currKey).isAbsent()) {
          return currentPos;
        }
        currentPos = currentPos.getIfPresent(currKey).value instanceof Array ? this.getClass().fromNullable(currentPos.getIfPresent(currKey).value[arrPos]) : this.getClass().absent;
        if (currentPos.isAbsent()) {
          return currentPos;
        }
        continue;
      } else {
        currentPos = currentPos.getIfPresent(currKey);
      }
      if (currentPos.isAbsent()) {
        return currentPos;
      } else if (arrPos > -1) {
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
  get(defaultVal = _Optional.absent) {
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
    return _Optional;
  }
  /*helper method for getIf with array access aka <name>[<indexPos>]*/
  arrayIndex(key) {
    let start = key.indexOf("[");
    let end = key.indexOf("]");
    if (start >= 0 && end > 0 && start < end) {
      return parseInt(key.substring(start + 1, end));
    } else {
      return -1;
    }
  }
  /*helper method for getIf with array access aka <name>[<indexPos>]*/
  keyVal(key) {
    let start = key.indexOf("[");
    if (start >= 0) {
      return key.substring(0, start);
    } else {
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
      return _Optional.absent;
    }
    try {
      return _Optional.fromNullable(resolver(this.value));
    } catch (e) {
      return _Optional.absent;
    }
  }
  preprocessKeys(...keys) {
    return new _Es2019Array__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...keys).flatMap((item) => {
      return new _Es2019Array__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...item.split(/]\s*\[/gi)).map((item2) => {
        item2 = item2.replace(/^\s+|\s+$/g, "");
        if (item2.indexOf("[") == -1 && item2.indexOf("]") != -1) {
          item2 = "[" + item2;
        }
        if (item2.indexOf("]") == -1 && item2.indexOf("[") != -1) {
          item2 = item2 + "]";
        }
        return item2;
      });
    });
  }
};
/*default value for absent*/
_Optional.absent = _Optional.fromNullable(null);
let Optional = _Optional;
const _ValueEmbedder = class _ValueEmbedder extends Optional {
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
    return this.isPresent() ? this : new _ValueEmbedder(alternative, this.key);
  }
  orElseLazy(func) {
    if (this.isPresent()) {
      return this;
    } else {
      let alternative = {};
      alternative[this.key] = func();
      return new _ValueEmbedder(alternative, this.key);
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
    return _ValueEmbedder;
  }
  static fromNullable(value, valueKey = "value") {
    return new _ValueEmbedder(value, valueKey);
  }
};
/*default value for absent*/
_ValueEmbedder.absent = _ValueEmbedder.fromNullable(null);
let ValueEmbedder = _ValueEmbedder;


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

var PromiseStatus = /* @__PURE__ */ ((PromiseStatus2) => {
  PromiseStatus2[PromiseStatus2["PENDING"] = 0] = "PENDING";
  PromiseStatus2[PromiseStatus2["FULFILLED"] = 1] = "FULFILLED";
  PromiseStatus2[PromiseStatus2["REJECTED"] = 2] = "REJECTED";
  return PromiseStatus2;
})(PromiseStatus || {});
function timeout(timeout2) {
  let handler = null;
  return new CancellablePromise((apply, reject) => {
    handler = setTimeout(() => apply(), timeout2);
  }, () => {
    if (handler) {
      clearTimeout(handler);
      handler = null;
    }
  });
}
function interval(timeout2) {
  let handler = null;
  return new CancellablePromise((apply, reject) => {
    handler = setInterval(() => {
      apply();
    }, timeout2);
  }, () => {
    if (handler) {
      clearInterval(handler);
      handler = null;
    }
  });
}
class Promise {
  constructor(executor) {
    this.status = 0 /* PENDING */;
    this.allFuncs = [];
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
      if (reason instanceof Promise) {
        reason.then((val) => {
          reject(val);
        });
      } else {
        setTimeout(() => {
          reject(reason);
        }, 1);
      }
    });
    return retVal;
  }
  static resolve(reason) {
    let retVal = new Promise((resolve, reject) => {
      if (reason instanceof Promise) {
        reason.then((val) => resolve(val));
      } else {
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
      return void 0;
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
          this.transferIntoNewPromise(val);
          return;
        }
      } else {
        break;
      }
    }
    this.appyFinally();
    this.status = 1 /* FULFILLED */;
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
            this.transferIntoNewPromise(val);
            return;
          }
          this.status = 2 /* REJECTED */;
          break;
        } else {
          break;
        }
      }
    }
    this.status = 2 /* REJECTED */;
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
        } else {
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
    this.status = 2 /* REJECTED */;
    this.appyFinally();
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


var ITERATION_STATUS = /* @__PURE__ */ ((ITERATION_STATUS2) => {
  ITERATION_STATUS2["EO_STRM"] = "__EO_STRM__";
  ITERATION_STATUS2["BEF_STRM"] = "___BEF_STRM__";
  return ITERATION_STATUS2;
})(ITERATION_STATUS || {});
function calculateSkips(next_strm) {
  let pos = 1;
  while (next_strm.lookAhead(pos) != "__EO_STRM__" /* EO_STRM */) {
    pos++;
  }
  return --pos;
}
class MultiStreamDatasource {
  constructor(first, ...strms) {
    this.first = first;
    this.selectedPos = 0;
    this.strms = [first];
    strms.forEach((strm) => {
      if (Array.isArray(strm)) {
        (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_0__.pushChunked)(this.strms, strm);
      } else {
        this.strms.push(strm);
      }
    });
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
    const strms = this.strms.slice(this.selectedPos);
    if (!strms.length) {
      return "__EO_STRM__" /* EO_STRM */;
    }
    const all_strms = [...strms];
    while (all_strms.length) {
      let next_strm = all_strms.shift();
      let lookAhead = next_strm.lookAhead(cnt);
      if (lookAhead != "__EO_STRM__" /* EO_STRM */) {
        return lookAhead;
      }
      cnt = cnt - calculateSkips(next_strm);
    }
    return "__EO_STRM__" /* EO_STRM */;
  }
  next() {
    if (this.activeStrm.hasNext()) {
      return this.activeStrm.next();
    }
    this.selectedPos = this.findNextStrm();
    if (this.selectedPos == -1) {
      return "__EO_STRM__" /* EO_STRM */;
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
class SequenceDataSource {
  constructor(start, total) {
    this.total = total;
    this.start = start;
    this.value = start - 1;
  }
  hasNext() {
    return this.value < this.total - 1;
  }
  next() {
    this.value++;
    return this.value <= this.total - 1 ? this.value : "__EO_STRM__" /* EO_STRM */;
  }
  lookAhead(cnt = 1) {
    if (this.value + cnt > this.total - 1) {
      return "__EO_STRM__" /* EO_STRM */;
    } else {
      return this.value + cnt;
    }
  }
  reset() {
    this.value = this.start - 1;
  }
  current() {
    return this.start - 1 ? "___BEF_STRM__" /* BEF_STRM */ : this.value;
  }
}
class ArrayStreamDataSource {
  constructor(...value) {
    this.dataPos = -1;
    this.value = value;
  }
  /**
   * chunk-safe factory, takes the backing array directly instead
   * of spreading it into the constructor call (spreading large arrays
   * overflows the argument stack)
   *
   * @param data the array to stream over
   */
  static ofArray(data) {
    const ret = new ArrayStreamDataSource();
    ret.value = data != null ? data : [];
    return ret;
  }
  lookAhead(cnt = 1) {
    if (this.dataPos + cnt > this.value.length - 1) {
      return "__EO_STRM__" /* EO_STRM */;
    }
    return this.value[this.dataPos + cnt];
  }
  hasNext() {
    return this.value.length - 1 > this.dataPos;
  }
  next() {
    var _a;
    this.dataPos++;
    return (_a = this == null ? void 0 : this.value[this.dataPos]) != null ? _a : "__EO_STRM__" /* EO_STRM */;
  }
  reset() {
    this.dataPos = -1;
  }
  current() {
    return this.value[Math.max(0, this.dataPos)];
  }
}
class FilteredStreamDatasource {
  constructor(filterFunc, parent) {
    this._current = "___BEF_STRM__" /* BEF_STRM */;
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
    while (!found && (next = this.inputDataSource.lookAhead(steps)) != "__EO_STRM__" /* EO_STRM */) {
      if (this.filterFunc(next)) {
        this._filterIdx[this._unfilteredPos + steps] = true;
        found = true;
      } else {
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
    let found = "__EO_STRM__" /* EO_STRM */;
    while (this.inputDataSource.hasNext()) {
      this._unfilteredPos++;
      let next = this.inputDataSource.next();
      if (next != "__EO_STRM__" /* EO_STRM */ && (((_b = (_a = this._filterIdx) == null ? void 0 : _a[this._unfilteredPos]) != null ? _b : false) || this.filterFunc(next))) {
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
    let lookupVal = "__EO_STRM__" /* EO_STRM */;
    for (let loop = 1; cnt > 0 && (lookupVal = this.inputDataSource.lookAhead(loop)) != "__EO_STRM__" /* EO_STRM */; loop++) {
      let inCache = (_a = this._filterIdx) == null ? void 0 : _a[this._unfilteredPos + loop];
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
    this._current = "___BEF_STRM__" /* BEF_STRM */;
    this._filterIdx = {};
    this._unfilteredPos = 0;
    this.inputDataSource.reset();
  }
}
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
    return lookAheadVal == "__EO_STRM__" /* EO_STRM */ ? lookAheadVal : this.mapFunc(lookAheadVal);
  }
}
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
class ArrayAssocArrayCollector {
  constructor() {
    this.finalValue = {};
  }
  collect(element) {
    var _a, _b, _c, _d;
    let key = (_a = element == null ? void 0 : element[0]) != null ? _a : element;
    this.finalValue[key] = (_c = (_b = this.finalValue) == null ? void 0 : _b[key]) != null ? _c : [];
    this.finalValue[key].push((_d = element == null ? void 0 : element[1]) != null ? _d : true);
  }
}
class Run {
  collect(element) {
  }
  get finalValue() {
    return null;
  }
}
class AssocArrayCollector {
  constructor() {
    this.finalValue = {};
  }
  collect(element) {
    var _a, _b;
    this.finalValue[(_a = element[0]) != null ? _a : element] = (_b = element[1]) != null ? _b : true;
  }
}
class ConfigCollector {
  constructor() {
    this.finalValue = new _Config__WEBPACK_IMPORTED_MODULE_1__.Config({});
  }
  collect(element) {
    this.finalValue.append(element.key).value = element.value;
  }
}
class FormDataCollector {
  constructor() {
    this.finalValue = new FormData();
  }
  collect(element) {
    this.finalValue.append(element.key, element.value);
  }
}
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
    return (0,_Es2019Array__WEBPACK_IMPORTED_MODULE_0__.Es2019ArrayFrom)(this.formData).map((keyVal) => keyVal.join("=")).reduce((item1, item2) => [item1, item2].join("&"));
  }
}
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
    let lookAhead = (_a = this == null ? void 0 : this.activeDataSource) == null ? void 0 : _a.lookAhead(cnt);
    if ((this == null ? void 0 : this.activeDataSource) && lookAhead != _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ITERATION_STATUS.EO_STRM) {
      return lookAhead;
    }
    if (this.activeDataSource) {
      cnt -= (0,_SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.calculateSkips)(this.activeDataSource);
    }
    for (let dsLoop = 1; true; dsLoop++) {
      let datasourceData = this.inputDataSource.lookAhead(dsLoop);
      if (datasourceData === _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ITERATION_STATUS.EO_STRM) {
        return _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ITERATION_STATUS.EO_STRM;
      }
      let mappedData = this.mapFunc(datasourceData);
      let currentDataSource = this.toDatasource(mappedData);
      let ret = currentDataSource.lookAhead(cnt);
      if (ret != _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ITERATION_STATUS.EO_STRM) {
        return ret;
      }
      cnt -= (0,_SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.calculateSkips)(currentDataSource);
    }
  }
  toDatasource(mapped) {
    let ds = Array.isArray(mapped) ? _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ArrayStreamDataSource.ofArray(mapped) : mapped;
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
    return void 0;
  }
  reset() {
    this.inputDataSource.reset();
    this.walkedDataSources.forEach((ds) => ds.reset());
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
class Stream {
  constructor(...value) {
    this._limits = -1;
    this.pos = -1;
    this.value = value;
  }
  static of(...data) {
    return Stream.ofArr(data);
  }
  /**
   * chunk-safe factory, takes the backing array directly instead of
   * spreading it into the call (Stream.of(...largeArray) overflows the
   * argument stack on large arrays)
   *
   * @param data the array to stream over
   */
  static ofArr(data) {
    const ret = new Stream();
    ret.value = data != null ? data : [];
    return ret;
  }
  static ofAssoc(data) {
    return this.ofArr(Object.keys(data)).map((key) => [key, data[key]]);
  }
  static ofDataSource(dataSource) {
    let value = [];
    while (dataSource.hasNext()) {
      value.push(dataSource.next());
    }
    return Stream.ofArr(value);
  }
  static ofDomQuery(value) {
    return Stream.ofArr(value.asArray);
  }
  static ofConfig(value) {
    return Stream.ofArr(Object.keys(value.value)).map((key) => [key, value.value[key]]);
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
    return Stream.ofArr(toConcat).flatMap((item) => item);
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
    return Stream.ofArr(res);
  }
  /*
   * we need to implement it to fulfill the contract, although it is used only internally
   * all values are flattened when accessed anyway, so there is no need to call this method
   */
  flatMap(fn) {
    let ret = [];
    this.each((item) => {
      let strmR = fn(item);
      ret = Array.isArray(strmR) ? ret.concat(strmR) : ret.concat(strmR.value);
    });
    return Stream.ofArr(ret);
  }
  filter(fn) {
    let res = [];
    this.each((data) => {
      if (fn(data)) {
        res.push(data);
      }
    });
    return Stream.ofArr(res);
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
    return Stream.ofArr(newArr);
  }
  collect(collector) {
    this.each((data) => collector.collect(data));
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
    if (this.pos + cnt >= this.value.length) {
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
          done,
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
class LazyStream {
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
  static of(...values) {
    return LazyStream.ofArr(values);
  }
  /**
   * chunk-safe factory, takes the backing array directly instead of
   * spreading it into the call (LazyStream.of(...largeArray) overflows
   * the argument stack on large arrays)
   *
   * @param data the array to stream over
   */
  static ofArr(data) {
    return new LazyStream(_SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.ArrayStreamDataSource.ofArray(data));
  }
  static ofAssoc(data) {
    return this.ofArr(Object.keys(data)).map((key) => [key, data[key]]);
  }
  static ofStreamDataSource(value) {
    return new LazyStream(value);
  }
  static ofDomQuery(value) {
    return LazyStream.ofArr(value.asArray);
  }
  static ofConfig(value) {
    return LazyStream.ofArr(Object.keys(value.value)).map((key) => [key, value.value[key]]);
  }
  hasNext() {
    if (this.isOverLimits()) {
      return false;
    }
    return this.dataSource.hasNext();
  }
  next() {
    let next = this.dataSource.next();
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
    return LazyStream.ofStreamDataSource(new _SourcesCollectors__WEBPACK_IMPORTED_MODULE_1__.MultiStreamDatasource(this, toAppend));
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
    } else {
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
    return LazyStream.ofArr(arr);
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
          done,
          value: val
        };
      }
    };
  }
  /*get observable(): Observable<T> {
      return from(this);
  }*/
  stop() {
    this.pos = this._limits + 1e9;
    this._limits = 0;
  }
  isOverLimits() {
    return this._limits != -1 && this.pos >= this._limits - 1;
  }
}
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


if ("undefined" != typeof _Global__WEBPACK_IMPORTED_MODULE_1__._global$) {
  (function() {
    if (void 0 === (0,_Global__WEBPACK_IMPORTED_MODULE_1__._global$)().Reflect || void 0 === (0,_Global__WEBPACK_IMPORTED_MODULE_1__._global$)().customElements || (0,_Global__WEBPACK_IMPORTED_MODULE_1__._global$)().customElements.polyfillWrapFlushCallback) return;
    const a = HTMLElement;
    ;(0,_Global__WEBPACK_IMPORTED_MODULE_1__._global$)().HTMLElement = {
      HTMLElement: function HTMLElement2() {
        return Reflect.construct(a, [], this.constructor);
      }
    }.HTMLElement, HTMLElement.prototype = a.prototype, HTMLElement.prototype.constructor = HTMLElement, Object.setPrototypeOf(HTMLElement, a);
  })();
}
class TagBuilder {
  // noinspection JSUnusedGlobalSymbols
  constructor(tagName) {
    this.extendsType = HTMLElement;
    this.observedAttrs = [];
    this.tagName = tagName;
  }
  // noinspection JSUnusedGlobalSymbols
  static withTagName(tagName) {
    return new TagBuilder(tagName);
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
          this.clazz.prototype[name] = function() {
            if (outerCallback) {
              finalCallback.apply(_DomQuery__WEBPACK_IMPORTED_MODULE_0__.DomQuery.byId(this));
            } else {
              protoCallback.apply(this);
            }
          };
        }
      };
      applyCallback("connectedCallback");
      applyCallback("disconnectedCallback");
      applyCallback("adoptedCallback");
      applyCallback("attributeChangedCallback");
      if (this.observedAttrs.length) {
        Object.defineProperty(this.clazz.prototype, "observedAttributes", {
          get() {
            return this.observedAttrs;
          }
        });
      }
      ;(0,_Global__WEBPACK_IMPORTED_MODULE_1__._global$)().customElements.define(this.tagName, this.clazz, this.theOptions || null);
    } else {
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

class XMLQuery extends _DomQuery__WEBPACK_IMPORTED_MODULE_1__.DomQuery {
  constructor(rootNode, docType = "text/xml") {
    let createIe11DomQueryShim = () => {
      let parser = new ActiveXObject("Microsoft.XMLDOM");
      parser.async = false;
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
      let domParser = _Lang__WEBPACK_IMPORTED_MODULE_0__.Lang.saveResolveLazy(
        () => new ((0,_Global__WEBPACK_IMPORTED_MODULE_2__._global$)()).DOMParser(),
        () => createIe11DomQueryShim()
      ).value;
      return domParser.parseFromString(xml, docType);
    };
    if (isString(rootNode)) {
      super(parseXML(rootNode));
    } else {
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
      let serialized = (_d = (_c = (_b = (_a = (0,_Global__WEBPACK_IMPORTED_MODULE_2__._global$)()) == null ? void 0 : _a.XMLSerializer) == null ? void 0 : _b.constructor()) == null ? void 0 : _c.serializeToString(node)) != null ? _d : node == null ? void 0 : node.xml;
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




var faces;
((faces2) => {
  faces2.specversion = 4e5;
  faces2.implversion = 0;
  faces2.separatorchar = getSeparatorChar();
  faces2.contextpath = "#{facesContext.externalContext.requestContextPath}";
  function getProjectStage() {
    return _impl_AjaxImpl__WEBPACK_IMPORTED_MODULE_0__.Implementation.getProjectStage();
  }
  faces2.getProjectStage = getProjectStage;
  function getViewState(formElement) {
    return _impl_AjaxImpl__WEBPACK_IMPORTED_MODULE_0__.Implementation.getViewState(formElement);
  }
  faces2.getViewState = getViewState;
  function getClientWindow(rootNode) {
    return _impl_AjaxImpl__WEBPACK_IMPORTED_MODULE_0__.Implementation.getClientWindow(rootNode);
  }
  faces2.getClientWindow = getClientWindow;
  function getSeparatorChar() {
    const sep = "#{facesContext.namingContainerSeparatorChar}";
    return sep.match(/\#\{facesContext.namingContainerSeparatorChar\}/gi) ? _impl_AjaxImpl__WEBPACK_IMPORTED_MODULE_0__.Implementation.getSeparatorChar() : sep;
  }
  let ajax;
  ((ajax2) => {
    "use strict";
    function request(element, event, options) {
      _impl_AjaxImpl__WEBPACK_IMPORTED_MODULE_0__.Implementation.request(element, event, options);
    }
    ajax2.request = request;
    function response(request2, context) {
      _impl_AjaxImpl__WEBPACK_IMPORTED_MODULE_0__.Implementation.response(request2, context);
    }
    ajax2.response = response;
    function addOnError(errorFunc) {
      _impl_AjaxImpl__WEBPACK_IMPORTED_MODULE_0__.Implementation.addOnError(errorFunc);
    }
    ajax2.addOnError = addOnError;
    function addOnEvent(eventFunc) {
      _impl_AjaxImpl__WEBPACK_IMPORTED_MODULE_0__.Implementation.addOnEvent(eventFunc);
    }
    ajax2.addOnEvent = addOnEvent;
  })(ajax = faces2.ajax || (faces2.ajax = {}));
  let util;
  ((util2) => {
    function chain(source, event, ...funcs) {
      return _impl_AjaxImpl__WEBPACK_IMPORTED_MODULE_0__.Implementation.chain(source, event != null ? event : null, ...funcs);
    }
    util2.chain = chain;
  })(util = faces2.util || (faces2.util = {}));
  let push;
  ((push2) => {
    function init(socketClientId, url, channel, onopen, onmessage, onerror, onclose, behaviors, autoConnect) {
      _impl_PushImpl__WEBPACK_IMPORTED_MODULE_1__.PushImpl.init(socketClientId, url, channel, onopen, onmessage, onerror, onclose, behaviors, autoConnect);
    }
    push2.init = init;
    function open(socketClientId) {
      _impl_PushImpl__WEBPACK_IMPORTED_MODULE_1__.PushImpl.open(socketClientId);
    }
    push2.open = open;
    function close(socketClientId) {
      _impl_PushImpl__WEBPACK_IMPORTED_MODULE_1__.PushImpl.close(socketClientId);
    }
    push2.close = close;
  })(push = faces2.push || (faces2.push = {}));
})(faces || (faces = {}));
var myfaces;
((myfaces2) => {
  function ab(source, event, eventName, execute, render, options = {}, userParameters = {}) {
    var _a, _b;
    if (!options) {
      options = {};
    }
    if (!userParameters) {
      userParameters = {};
    }
    if (eventName) {
      options[_impl_core_Const__WEBPACK_IMPORTED_MODULE_3__.CTX_OPTIONS_PARAMS] = (_a = options == null ? void 0 : options[_impl_core_Const__WEBPACK_IMPORTED_MODULE_3__.CTX_OPTIONS_PARAMS]) != null ? _a : {};
      options[_impl_core_Const__WEBPACK_IMPORTED_MODULE_3__.CTX_OPTIONS_PARAMS][(0,_impl_core_Const__WEBPACK_IMPORTED_MODULE_3__.$nsp)(_impl_core_Const__WEBPACK_IMPORTED_MODULE_3__.P_BEHAVIOR_EVENT)] = eventName;
    }
    if (execute) {
      options[_impl_core_Const__WEBPACK_IMPORTED_MODULE_3__.CTX_OPTIONS_EXECUTE] = execute;
    }
    if (render) {
      options[_impl_core_Const__WEBPACK_IMPORTED_MODULE_3__.CTX_PARAM_RENDER] = render;
    }
    if (!options["params"]) {
      options["params"] = {};
    }
    for (let key in userParameters) {
      options["params"][key] = userParameters[key];
    }
    ((_b = window == null ? void 0 : window.faces) != null ? _b : window.jsf).ajax.request(source, event, options);
  }
  myfaces2.ab = ab;
  const onReadyChain = [];
  let readyStateListener = null;
  function onDomReady(executionFunc) {
    if (document.readyState !== "complete") {
      onReadyChain.push(executionFunc);
      if (!readyStateListener) {
        readyStateListener = () => {
          window.removeEventListener("DOMContentLoaded", readyStateListener);
          readyStateListener = null;
          try {
            onReadyChain.forEach((func) => func());
          } finally {
            onReadyChain.length = 0;
          }
        };
        window.addEventListener("DOMContentLoaded", readyStateListener);
      }
    } else {
      if (readyStateListener) {
        readyStateListener();
      }
      executionFunc();
    }
  }
  myfaces2.onDomReady = onDomReady;
  function reserveNamespace(namespace) {
    let current = window;
    const namespaces = namespace.split(".");
    for (const part of namespaces) {
      current[part] = current[part] || {};
      current = current[part];
    }
  }
  myfaces2.reserveNamespace = reserveNamespace;
  myfaces2.oam = _myfaces_OamSubmit__WEBPACK_IMPORTED_MODULE_2__.oam;
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











var ProjectStages = /* @__PURE__ */ ((ProjectStages2) => {
  ProjectStages2["Production"] = "Production";
  ProjectStages2["Development"] = "Development";
  ProjectStages2["SystemTest"] = "SystemTest";
  ProjectStages2["UnitTest"] = "UnitTest";
  return ProjectStages2;
})(ProjectStages || {});
var BlockFilter = /* @__PURE__ */ ((BlockFilter2) => {
  BlockFilter2["onerror"] = "onerror";
  BlockFilter2["onevent"] = "onevent";
  BlockFilter2["render"] = "render";
  BlockFilter2["execute"] = "execute";
  BlockFilter2["myfaces"] = "myfaces";
  BlockFilter2["delay"] = "delay";
  BlockFilter2["timeout"] = "timeout";
  BlockFilter2["resetValues"] = "resetValues";
  BlockFilter2["windowId"] = "windowId";
  BlockFilter2["params"] = "params";
  return BlockFilter2;
})(BlockFilter || {});
var Implementation;
((Implementation2) => {
  const trim = mona_dish__WEBPACK_IMPORTED_MODULE_2__.Lang.trim;
  const getMessage = _util_Lang__WEBPACK_IMPORTED_MODULE_6__.ExtLang.getMessage;
  const getGlobalConfig = _util_Lang__WEBPACK_IMPORTED_MODULE_6__.ExtLang.getGlobalConfig;
  const assert = _util_Assertions__WEBPACK_IMPORTED_MODULE_3__.Assertions.assert;
  const ofAssoc = _util_Lang__WEBPACK_IMPORTED_MODULE_6__.ExtLang.ofAssoc;
  const collectAssoc = _util_Lang__WEBPACK_IMPORTED_MODULE_6__.ExtLang.collectAssoc;
  let projectStage = null;
  let separator = null;
  let eventQueue = [];
  let errorQueue = [];
  Implementation2.requestQueue = null;
  let threshold = "ERROR";
  function getSeparatorChar() {
    var _a, _b;
    return (_b = (_a = resolveGlobalConfig()) == null ? void 0 : _a.separator) != null ? _b : separator != null ? separator : separator = _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_4__.ExtDomQuery.searchJsfJsFor(/separator=([^&;]*)/).orElse(":").value;
  }
  Implementation2.getSeparatorChar = getSeparatorChar;
  function reset() {
    projectStage = null;
    separator = null;
    eventQueue = [];
    errorQueue = [];
    Implementation2.requestQueue = null;
  }
  Implementation2.reset = reset;
  function getProjectStage() {
    var _a, _b;
    return (_b = (_a = resolveGlobalConfig()) == null ? void 0 : _a.projectStage) != null ? _b : projectStage != null ? projectStage : projectStage = resolveProjectStateFromURL();
  }
  Implementation2.getProjectStage = getProjectStage;
  function resolveProjectStateFromURL() {
    const foundStage = _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_4__.ExtDomQuery.searchJsfJsFor(/stage=([^&;]*)/).value;
    return foundStage in ProjectStages ? foundStage : "Production" /* Production */;
  }
  Implementation2.resolveProjectStateFromURL = resolveProjectStateFromURL;
  function chain(source, event, ...funcs) {
    let ret = true;
    funcs.every((func) => {
      let returnVal = resolveAndExecute(source, event, func);
      if (returnVal === false) {
        ret = false;
      }
      return ret;
    });
    return ret;
  }
  Implementation2.chain = chain;
  function request(el, event, opts) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C;
    const {
      options,
      elem,
      elementId,
      windowId,
      isResetValues
    } = (0,_xhrCore_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resolveDefaults)(event, opts, el);
    const requestCtx = new _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_4__.ExtConfig({});
    const internalCtx = new _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_4__.ExtConfig({});
    _util_Assertions__WEBPACK_IMPORTED_MODULE_3__.Assertions.assertRequestIntegrity(options, elem);
    const form = (0,_xhrCore_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resolveForm)(elem, event);
    const viewId = (0,_xhrCore_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resolveViewId)(form);
    const formId = form.id.value;
    const delay = (0,_xhrCore_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resolveDelay)(options);
    const timeout = (0,_xhrCore_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resolveTimeout)(options);
    requestCtx.assignIf(!!windowId, _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_WINDOW_ID).value = windowId;
    requestCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR).value = extractLegacyParams(options.value);
    const params = remapArrayToAssocArr(options.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_OPTIONS_PARAMS).orElse({}).value);
    let ctxPassthrough = requestCtx.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR);
    ctxPassthrough.$nspEnabled = false;
    ctxPassthrough.shallowMerge(new mona_dish__WEBPACK_IMPORTED_MODULE_2__.Config(params), true);
    ctxPassthrough.$nspEnabled = true;
    requestCtx.assignIf(!!event, _core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR, _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_EVT).value = event == null ? void 0 : event.type;
    requestCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.SOURCE).value = elementId;
    requestCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.VIEW_ID).value = viewId;
    requestCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.ON_EVENT).value = (_a = options.value) == null ? void 0 : _a.onevent;
    requestCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.ON_ERROR).value = (_b = options.value) == null ? void 0 : _b.onerror;
    requestCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.MYFACES).value = (_c = options.value) == null ? void 0 : _c.myfaces;
    requestCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR, _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_AJAX_SOURCE).value = elementId;
    requestCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR, _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_AJAX).value = true;
    requestCtx.assignIf(isResetValues, _core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR, _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_RESET_VALUES).value = true;
    internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_SRC_FRM_ID).value = formId;
    internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_PREINIT).value = (_f = (_e = (_d = options.value) == null ? void 0 : _d.myfaces) == null ? void 0 : _e.upload) == null ? void 0 : _f.preinit;
    internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_LOADSTART).value = (_i = (_h = (_g = options.value) == null ? void 0 : _g.myfaces) == null ? void 0 : _h.upload) == null ? void 0 : _i.loadstart;
    internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_ON_PROGRESS).value = (_l = (_k = (_j = options.value) == null ? void 0 : _j.myfaces) == null ? void 0 : _k.upload) == null ? void 0 : _l.progress;
    internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_LOADEND).value = (_o = (_n = (_m = options.value) == null ? void 0 : _m.myfaces) == null ? void 0 : _n.upload) == null ? void 0 : _o.loadend;
    internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_LOAD).value = (_r = (_q = (_p = options.value) == null ? void 0 : _p.myfaces) == null ? void 0 : _q.upload) == null ? void 0 : _r.load;
    internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_ERROR).value = (_u = (_t = (_s = options.value) == null ? void 0 : _s.myfaces) == null ? void 0 : _t.upload) == null ? void 0 : _u.error;
    internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_ABORT).value = (_x = (_w = (_v = options.value) == null ? void 0 : _v.myfaces) == null ? void 0 : _w.upload) == null ? void 0 : _x.abort;
    internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_TIMEOUT).value = (_A = (_z = (_y = options.value) == null ? void 0 : _y.myfaces) == null ? void 0 : _z.upload) == null ? void 0 : _A.timeout;
    requestCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR, formId).value = formId;
    internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_SRC_CTL_ID).value = elementId;
    internalCtx.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_PPS).value = (_C = (_B = extractMyFacesParams(options.value)) == null ? void 0 : _B[_core_Const__WEBPACK_IMPORTED_MODULE_7__.MYFACES_OPTION_PPS]) != null ? _C : false;
    assignClientWindowId(form, requestCtx);
    assignExecute(options, requestCtx, form, elementId);
    assignRender(options, requestCtx, form, elementId);
    assignNamingContainerData(internalCtx, form);
    Implementation2.queueHandler.addRequestToQueue(elem, form, requestCtx, internalCtx, delay, timeout);
  }
  Implementation2.request = request;
  function response(request2, context) {
    _xhrCore_Response__WEBPACK_IMPORTED_MODULE_0__.Response.processResponse(request2, context);
  }
  Implementation2.response = response;
  function addOnError(errorListener) {
    errorQueue.push(errorListener);
  }
  Implementation2.addOnError = addOnError;
  function addOnEvent(eventListener) {
    eventQueue.push(eventListener);
  }
  Implementation2.addOnEvent = addOnEvent;
  function sendEvent(data, localHandler = function(data2) {
  }) {
    localHandler(data);
    eventQueue.forEach((fn) => fn(data));
  }
  Implementation2.sendEvent = sendEvent;
  function stdErrorHandler(request2, context, exception, clearRequestQueue = false) {
    var _a;
    try {
      if (threshold == "ERROR") {
        let errorData = _xhrCore_ErrorData__WEBPACK_IMPORTED_MODULE_5__.ErrorData.fromClient(exception);
        sendError(errorData);
      }
    } finally {
      if (clearRequestQueue) {
        (_a = Implementation2.requestQueue) == null ? void 0 : _a.clear();
      }
    }
  }
  Implementation2.stdErrorHandler = stdErrorHandler;
  function sendError(errorData, localHandler = function(data) {
  }) {
    localHandler(errorData);
    errorQueue.forEach((errorCallback) => {
      errorCallback(errorData);
    });
    let displayError = getGlobalConfig("defaultErrorOutput", console ? console.error : alert);
    displayError(errorData);
  }
  Implementation2.sendError = sendError;
  function getClientWindow(node) {
    const ALTERED = "___mf_id_altered__";
    const INIT = "___init____";
    let searchRoot = node ? mona_dish__WEBPACK_IMPORTED_MODULE_2__.DQ.byId(node) : (0,mona_dish__WEBPACK_IMPORTED_MODULE_2__.DQ$)("form");
    let inputs = searchRoot.filterSelector(`input[name='${(0,_core_Const__WEBPACK_IMPORTED_MODULE_7__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_7__.P_CLIENT_WINDOW)}']`).orElseLazy(() => searchRoot.querySelectorAll(`input[name='${(0,_core_Const__WEBPACK_IMPORTED_MODULE_7__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_7__.P_CLIENT_WINDOW)}']`));
    let fetchWindowIdFromJSFJS = () => _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_4__.ExtDomQuery.searchJsfJsFor(/jfwid=([^&;]*)/).orElse(null);
    let fetchWindowIdFromURL = function() {
      const href = window.location.href, windowId = "jfwid";
      const regex = new RegExp("[\\?&]" + windowId + "=([^&#\\;]*)");
      const results = regex.exec(href);
      if (results != null) return mona_dish__WEBPACK_IMPORTED_MODULE_2__.Optional.fromNullable(results[1]);
      return mona_dish__WEBPACK_IMPORTED_MODULE_2__.Optional.fromNullable(null);
    };
    let differenceCheck = (value1, value2) => {
      if (value1 == INIT) {
        return value2;
      } else if (value1 == ALTERED || value1 != value2) {
        return ALTERED;
      }
      return value2;
    };
    let getValue = (item) => item.val;
    let formWindowId = inputs.asArray.map(getValue).reduce(differenceCheck, INIT);
    assert(ALTERED != formWindowId, "Multiple different windowIds found in document");
    return formWindowId != INIT ? formWindowId : (fetchWindowIdFromURL() || fetchWindowIdFromJSFJS()).value;
  }
  Implementation2.getClientWindow = getClientWindow;
  function getViewState(form) {
    let element = mona_dish__WEBPACK_IMPORTED_MODULE_2__.DQ.byId(form, true);
    if (!element.isTag(_core_Const__WEBPACK_IMPORTED_MODULE_7__.HTML_TAG_FORM)) {
      throw new Error(getMessage("ERR_VIEWSTATE"));
    }
    const dummyContext = new mona_dish__WEBPACK_IMPORTED_MODULE_2__.Config({});
    assignNamingContainerData(dummyContext, mona_dish__WEBPACK_IMPORTED_MODULE_2__.DQ.byId(form));
    let formElements = element.deepElements.encodeFormElement();
    return (0,_util_FileUtils__WEBPACK_IMPORTED_MODULE_9__.encodeFormData)(new _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_4__.ExtConfig(formElements), (0,_xhrCore_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resoveNamingContainerMapper)(dummyContext));
  }
  Implementation2.getViewState = getViewState;
  Implementation2.queueHandler = {
    /**
     * public to make it accessible for tests
     *
     * adds a new request to our queue for further processing
     */
    addRequestToQueue: function(elem, form, reqCtx, respPassThr, delay = 0, timeout = 0) {
      var _a;
      Implementation2.requestQueue = (_a = Implementation2.requestQueue) != null ? _a : new _util_XhrQueueController__WEBPACK_IMPORTED_MODULE_10__.XhrQueueController();
      Implementation2.requestQueue.enqueue(new _xhrCore_XhrRequest__WEBPACK_IMPORTED_MODULE_1__.XhrRequest(reqCtx, respPassThr, timeout), delay);
    }
  };
  function assignRender(requestOptions, targetContext, issuingForm, sourceElementId) {
    if (requestOptions.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_RENDER).isPresent()) {
      remapDefaultConstants(targetContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR).get({}), _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_RENDER, requestOptions.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_RENDER).value, issuingForm, sourceElementId, targetContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.VIEW_ID).value);
    }
  }
  function assignExecute(requestOptions, targetContext, issuingForm, sourceElementId) {
    if (requestOptions.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_OPTIONS_EXECUTE).isPresent()) {
      requestOptions.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_OPTIONS_EXECUTE).value = [requestOptions.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_OPTIONS_EXECUTE).value, _core_Const__WEBPACK_IMPORTED_MODULE_7__.IDENT_THIS].join(" ");
      remapDefaultConstants(targetContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR).get({}), _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_EXECUTE, requestOptions.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_OPTIONS_EXECUTE).value, issuingForm, sourceElementId, targetContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.VIEW_ID).value);
    } else {
      targetContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR, _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_EXECUTE).value = sourceElementId;
    }
  }
  function assignClientWindowId(form, targetContext) {
    let clientWindow = (0,_core_Const__WEBPACK_IMPORTED_MODULE_7__.$faces)().getClientWindow(form.getAsElem(0).value);
    if (clientWindow) {
      targetContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR, _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_CLIENT_WINDOW).value = clientWindow;
    }
  }
  function assignNamingContainerData(internalContext, formElement) {
    const viewRootId = (0,_xhrCore_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resolveViewRootId)(formElement);
    if (!!viewRootId) {
      internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.NAMED_VIEWROOT).value = true;
      internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.NAMING_CONTAINER_ID).value = viewRootId;
    }
  }
  function remapDefaultConstants(targetConfig, targetKey, userValues, issuingForm, issuingElementId, rootNamingContainerId = "") {
    const SEP = (0,_core_Const__WEBPACK_IMPORTED_MODULE_7__.$faces)().separatorchar;
    let iterValues = userValues ? trim(userValues).split(/\s+/gi) : [];
    let ret = [];
    let processed = {};
    const remapNamingContainer = (componentIdToTransform) => {
      if (!rootNamingContainerId) {
        return componentIdToTransform;
      }
      const rootNamingContainerPrefix = rootNamingContainerId.length ? rootNamingContainerId + SEP : _core_Const__WEBPACK_IMPORTED_MODULE_7__.EMPTY_STR;
      let formClientId = issuingForm.id.value;
      const nearestNamingContainer = formClientId.substring(0, formClientId.lastIndexOf(SEP));
      const nearestNamingContainerPrefix = nearestNamingContainer.length ? nearestNamingContainer + SEP : _core_Const__WEBPACK_IMPORTED_MODULE_7__.EMPTY_STR;
      const hasLeadingSep = componentIdToTransform.indexOf(SEP) === 0;
      const isAbsolutSearchExpr = hasLeadingSep || rootNamingContainerId.length && componentIdToTransform.indexOf(rootNamingContainerPrefix) == 0;
      let finalIdentifier;
      if (isAbsolutSearchExpr) {
        componentIdToTransform = hasLeadingSep ? componentIdToTransform.substring(1) : componentIdToTransform;
        componentIdToTransform = componentIdToTransform.indexOf(rootNamingContainerPrefix) == 0 ? componentIdToTransform.substring(rootNamingContainerPrefix.length) : componentIdToTransform;
        finalIdentifier = [rootNamingContainerPrefix, componentIdToTransform].join(_core_Const__WEBPACK_IMPORTED_MODULE_7__.EMPTY_STR);
      } else {
        if (formClientId.indexOf(rootNamingContainerPrefix) == 0) {
          formClientId = formClientId.substring(rootNamingContainerPrefix.length);
        }
        let hasPrependId = componentIdToTransform.indexOf(formClientId) == 0;
        finalIdentifier = hasPrependId ? [rootNamingContainerPrefix, componentIdToTransform].join(_core_Const__WEBPACK_IMPORTED_MODULE_7__.EMPTY_STR) : [nearestNamingContainerPrefix, componentIdToTransform].join(_core_Const__WEBPACK_IMPORTED_MODULE_7__.EMPTY_STR);
      }
      return mona_dish__WEBPACK_IMPORTED_MODULE_2__.DQ.byId(finalIdentifier).isPresent() ? finalIdentifier : componentIdToTransform;
    };
    for (let cnt = 0; cnt < iterValues.length; cnt++) {
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
  function extractLegacyParams(mappedOpts) {
    return ofAssoc(mappedOpts).filter(((item) => !(item[0] in BlockFilter))).reduce(collectAssoc, {});
  }
  function extractMyFacesParams(mappedOpts) {
    var _a;
    return (_a = ofAssoc(mappedOpts).filter(((item) => item[0] == "myfaces")).reduce(collectAssoc, {})) == null ? void 0 : _a[_core_Const__WEBPACK_IMPORTED_MODULE_7__.MYFACES];
  }
  function remapArrayToAssocArr(arrayedParams) {
    if (Array.isArray(arrayedParams)) {
      return arrayedParams.reduce(collectAssoc, {});
    }
    return arrayedParams;
  }
  function resolveGlobalConfig() {
    var _a, _b;
    return (_b = (_a = window == null ? void 0 : window[_core_Const__WEBPACK_IMPORTED_MODULE_7__.MYFACES]) == null ? void 0 : _a.config) != null ? _b : {};
  }
  function resolveAndExecute(source, event, func) {
    if ("string" != typeof func) {
      return func.call(source, event) !== false;
    } else {
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


var PushImpl;
((PushImpl2) => {
  const URL_PROTOCOL = mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.global().location.protocol.replace("http", "ws") + "//";
  PushImpl2.sockets = {};
  PushImpl2.components = {};
  PushImpl2.clientIdsByTokens = {};
  function reset() {
    Object.values(PushImpl2.sockets).forEach((s) => {
      try {
        s.close();
      } catch (e) {
      }
    });
    PushImpl2.sockets = {};
    PushImpl2.components = {};
    PushImpl2.clientIdsByTokens = {};
  }
  PushImpl2.reset = reset;
  function init(socketClientId, url, channel, onopen, onmessage, onerror, onclose, behaviors, autoConnect) {
    var _a, _b, _c;
    onclose = resolveFunction(onclose);
    if (!mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.global().WebSocket) {
      onclose(-1, channel);
      return;
    }
    let channelToken = url.substr(url.indexOf("?") + 1);
    if (!PushImpl2.components[socketClientId]) {
      PushImpl2.components[socketClientId] = {
        "channelToken": channelToken,
        "onopen": resolveFunction(onopen),
        "onmessage": resolveFunction(onmessage),
        "onerror": resolveFunction(onerror),
        "onclose": onclose,
        "behaviors": behaviors,
        "autoconnect": autoConnect
      };
      if (!PushImpl2.clientIdsByTokens[channelToken]) {
        PushImpl2.clientIdsByTokens[channelToken] = [];
      }
      PushImpl2.clientIdsByTokens[channelToken].push(socketClientId);
      if (!PushImpl2.sockets[channelToken]) {
        PushImpl2.sockets[channelToken] = new Socket(
          channelToken,
          getBaseURL(url),
          channel
        );
      }
    }
    if (autoConnect) {
      ((_c = (_a = mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.global()) == null ? void 0 : _a.faces) != null ? _c : (_b = mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.global()) == null ? void 0 : _b.jsf).push.open(socketClientId);
    }
  }
  PushImpl2.init = init;
  function open(socketClientId) {
    var _a;
    getSocket((_a = PushImpl2.components[socketClientId]) == null ? void 0 : _a.channelToken).open();
  }
  PushImpl2.open = open;
  function close(socketClientId) {
    getSocket(PushImpl2.components[socketClientId].channelToken).close();
  }
  PushImpl2.close = close;
  class Socket {
    constructor(channelToken, url, channel) {
      this.channelToken = channelToken;
      this.url = url;
      this.channel = channel;
      this.socket = null;
      this.reconnectAttempts = 0;
      this.hasEverConnected = false;
      this.hasNotifiedInitialOpenAttempt = false;
    }
    open() {
      if (this.socket && this.socket.readyState === 1) {
        return;
      }
      this.socket = new WebSocket(this.url);
      this.bindCallbacks();
      this.notifyInitialOpenAttempt();
    }
    // noinspection JSUnusedLocalSymbols
    onopen(event) {
      this.hasEverConnected = true;
      this.reconnectAttempts = 0;
    }
    onerror(event) {
    }
    onmessage(event) {
      var _a, _b, _c, _d;
      let message = JSON.parse(event.data);
      let clientIds = PushImpl2.clientIdsByTokens[this.channelToken];
      if (!clientIds) return;
      for (let i = clientIds.length - 1; i >= 0; i--) {
        let socketClientId = clientIds[i];
        if (document.getElementById(socketClientId)) {
          try {
            (_b = (_a = PushImpl2.components[socketClientId]) == null ? void 0 : _a["onmessage"]) == null ? void 0 : _b.call(_a, message, this.channel, event);
          } catch (e) {
          }
          let behaviors = (_d = (_c = PushImpl2.components) == null ? void 0 : _c[socketClientId]) == null ? void 0 : _d["behaviors"];
          let functions = behaviors == null ? void 0 : behaviors[message];
          if (functions && functions.length) {
            for (let j = 0; j < functions.length; j++) {
              try {
                functions[j](null);
              } catch (e) {
              }
            }
          }
        } else {
          clientIds.splice(i, 1);
        }
      }
      if (clientIds.length === 0) {
        this.close();
      }
    }
    onclose(event) {
      if (this.isTerminalClose(event)) {
        this.notifyClose(event);
        this.resetConnectionState();
        return;
      }
      if (!this.notifyErrorAndPruneMissingComponents(event)) return;
      if (this.closeIfChannelHasNoComponents()) return;
      this.scheduleReconnect();
    }
    close() {
      if (this.socket) {
        let s = this.socket;
        this.socket = null;
        s.close();
      }
    }
    notifyInitialOpenAttempt() {
      var _a, _b;
      if (this.reconnectAttempts || this.hasNotifiedInitialOpenAttempt) return;
      this.hasNotifiedInitialOpenAttempt = true;
      let clientIds = PushImpl2.clientIdsByTokens[this.channelToken];
      if (!clientIds) return;
      for (let i = clientIds.length - 1; i >= 0; i--) {
        let socketClientId = clientIds[i];
        (_b = (_a = PushImpl2.components[socketClientId]) == null ? void 0 : _a["onopen"]) == null ? void 0 : _b.call(_a, this.channel);
      }
    }
    isTerminalClose(event) {
      return !this.socket || !this.hasEverConnected || event.code === 1e3 || event.code === 1008 || this.reconnectAttempts >= _core_Const__WEBPACK_IMPORTED_MODULE_0__.MAX_RECONNECT_ATTEMPTS;
    }
    notifyClose(event) {
      var _a, _b, _c;
      let clientIds = PushImpl2.clientIdsByTokens[this.channelToken];
      if (!clientIds) return;
      for (let i = clientIds.length - 1; i >= 0; i--) {
        let socketClientId = clientIds[i];
        (_c = (_b = (_a = PushImpl2.components) == null ? void 0 : _a[socketClientId]) == null ? void 0 : _b["onclose"]) == null ? void 0 : _c.call(_b, event == null ? void 0 : event.code, this == null ? void 0 : this.channel, event);
      }
    }
    resetConnectionState() {
      this.reconnectAttempts = 0;
      this.hasEverConnected = false;
      this.hasNotifiedInitialOpenAttempt = false;
    }
    notifyErrorAndPruneMissingComponents(event) {
      var _a, _b, _c;
      let clientIds = PushImpl2.clientIdsByTokens[this.channelToken];
      if (!clientIds) return false;
      for (let i = clientIds.length - 1; i >= 0; i--) {
        let socketClientId = clientIds[i];
        if (document.getElementById(socketClientId)) {
          try {
            (_c = (_b = (_a = PushImpl2.components) == null ? void 0 : _a[socketClientId]) == null ? void 0 : _b["onerror"]) == null ? void 0 : _c.call(_b, event == null ? void 0 : event.code, this == null ? void 0 : this.channel, event);
          } catch (e) {
          }
        } else {
          clientIds.splice(i, 1);
        }
      }
      return true;
    }
    closeIfChannelHasNoComponents() {
      var _a;
      if (((_a = PushImpl2.clientIdsByTokens[this.channelToken]) == null ? void 0 : _a.length) !== 0) return false;
      this.close();
      return true;
    }
    scheduleReconnect() {
      const reconnectAttempt = ++this.reconnectAttempts;
      this.socket = null;
      setTimeout(() => this.open(), _core_Const__WEBPACK_IMPORTED_MODULE_0__.RECONNECT_INTERVAL * reconnectAttempt);
    }
    /**
     * bind the callbacks to the socket callbacks
     */
    bindCallbacks() {
      this.socket.onopen = (event) => this.onopen(event);
      this.socket.onmessage = (event) => this.onmessage(event);
      this.socket.onclose = (event) => this.onclose(event);
      this.socket.onerror = (event) => this.onerror(event);
    }
  }
  function getBaseURL(url) {
    if (url.indexOf("://") < 0) {
      let base = mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.global().location.hostname + ":" + mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.global().location.port;
      return URL_PROTOCOL + base + url;
    } else {
      return url;
    }
  }
  function getSocket(channelToken) {
    let socket = PushImpl2.sockets[channelToken];
    if (socket) {
      return socket;
    } else {
      throw new Error("Unknown channelToken: " + channelToken);
    }
  }
  function resolveFunction(fn) {
    if (typeof fn === "function") return fn;
    if (typeof fn === "string" && typeof mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.global()[fn] === "function") return mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.global()[fn];
    return (() => {
    });
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
/* harmony export */   ATTR_NONCE: () => (/* binding */ ATTR_NONCE),
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
const EMPTY_FUNC = Object.freeze(() => {
});
const EMPTY_STR = "";
const EMPTY_MAP = Object.freeze({});
const HTML_VIEWSTATE = ["<input type='hidden'", "name='", P_VIEWSTATE, "' value='' />"].join(EMPTY_STR);
const HTML_CLIENT_WINDOW = ["<input type='hidden'", "' name='", P_CLIENT_WINDOW, "' value='' />"].join(EMPTY_STR);
const IDENT_ALL = "@all";
const IDENT_NONE = "@none";
const IDENT_THIS = "@this";
const IDENT_FORM = "@form";
const P_AJAX = "jakarta.faces.partial.ajax";
const P_EXECUTE = "jakarta.faces.partial.execute";
const P_RENDER = "jakarta.faces.partial.render";
const P_RENDER_OVERRIDE = "_myfaces.rendeOverride";
const P_EVT = "jakarta.faces.partial.event";
const P_RESET_VALUES = "jakarta.faces.partial.resetValues";
const P_WINDOW_ID = "jakarta.faces.windowId";
const P_BEHAVIOR_EVENT = "jakarta.faces.behavior.event";
const CTX_PARAM_RENDER = "render";
const WINDOW_ID = "windowId";
const ERROR = "error";
const EVENT = "event";
const ON_ERROR = "onerror";
const ON_EVENT = "onevent";
const BEGIN = "begin";
const COMPLETE = "complete";
const SUCCESS = "success";
const SOURCE = "source";
const STATUS = "status";
const ERROR_NAME = "error-name";
const ERROR_MESSAGE = "error-message";
const RESPONSE_TEXT = "responseText";
const RESPONSE_XML = "responseXML";
const HTTP_ERROR = "httpError";
const EMPTY_RESPONSE = "emptyResponse";
const MALFORMEDXML = "malformedXML";
const SERVER_ERROR = "serverError";
const CLIENT_ERROR = "clientError";
const TIMEOUT_EVENT = "timeout";
const CTX_OPTIONS_PARAMS = "params";
const CTX_OPTIONS_DELAY = "delay";
const DELAY_NONE = "none";
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
const STATE_EVT_BEGIN = "begin";
const STATE_EVT_TIMEOUT = "TIMEOUT_EVENT";
const STATE_EVT_COMPLETE = "complete";
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
const ATTR_NONCE = "nonce";
const XML_TAG_PARTIAL_RESP = "partial-response";
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
const UPDATE_FORMS = "myfaces.updateForms";
const UPDATE_ELEMS = "myfaces.updateElems";
const DEFERRED_HEAD_INSERTS = "myfaces.headElems";
const MYFACES = "myfaces";
const MF_NONE = "__mf_none__";
const REASON_EXPIRED = "Expired";
const APPLIED_VST = "myfaces.appliedViewState";
const APPLIED_CLIENT_WINDOW = "myfaces.appliedClientWindow";
const RECONNECT_INTERVAL = 500;
const MAX_RECONNECT_ATTEMPTS = 25;
const UNKNOWN = "UNKNOWN";
function $faces() {
  var _a;
  return (_a = window == null ? void 0 : window.faces) != null ? _a : window == null ? void 0 : window.jsf;
}
function $nsp(inputNamespace) {
  if (!inputNamespace || !(inputNamespace == null ? void 0 : inputNamespace.replace)) {
    return inputNamespace;
  }
  return !!(window == null ? void 0 : window.faces) ? inputNamespace.replace(/javax\.faces/gi, "jakarta.faces") : inputNamespace.replace(/jakarta\.faces/gi, "javax.faces");
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

class StateHolder {
  constructor(id, value) {
    this.id = id;
    this.value = value;
    let viewStatePos = id.indexOf(_Const__WEBPACK_IMPORTED_MODULE_0__.P_VIEWSTATE);
    this.nameSpace = viewStatePos > 0 ? id.substr(0, viewStatePos - 1) : _Const__WEBPACK_IMPORTED_MODULE_0__.EMPTY_STR;
  }
  get hasNameSpace() {
    var _a;
    return !!((_a = this == null ? void 0 : this.nameSpace) != null ? _a : _Const__WEBPACK_IMPORTED_MODULE_0__.EMPTY_STR).length;
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
    this.MSG_DEV_MODE = "Note, this message is only sent, because project stage is development and no other error listeners are registered.";
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
    this.ERR_EVT_PASS = "an event must be passed down (either an event object null or undefined) ";
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



var Assertions;
((Assertions2) => {
  function assertRequestIntegrity(options, elem) {
    assertFunction(options.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_1__.ON_ERROR).value);
    assertFunction(options.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_1__.ON_EVENT).value);
    assert(elem.isPresent(), _Lang__WEBPACK_IMPORTED_MODULE_2__.ExtLang.getMessage("ERR_MUST_BE_PROVIDED1", "{0}: source  must be provided or exist", "source element id"), "faces.ajax.request", "ArgNotSet");
  }
  Assertions2.assertRequestIntegrity = assertRequestIntegrity;
  function assertUrlExists(node) {
    if (node.attr(_core_Const__WEBPACK_IMPORTED_MODULE_1__.ATTR_URL).isAbsent()) {
      throw Assertions2.raiseError(new Error(), _Lang__WEBPACK_IMPORTED_MODULE_2__.ExtLang.getMessage("ERR_RED_URL", void 0, "processRedirect"), "processRedirect");
    }
  }
  Assertions2.assertUrlExists = assertUrlExists;
  function assertValidXMLResponse(responseXML) {
    assert(!responseXML.isAbsent(), _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_RESPONSE, _core_Const__WEBPACK_IMPORTED_MODULE_1__.PHASE_PROCESS_RESPONSE);
    assert(!responseXML.isXMLParserError(), responseXML.parserErrorText(_core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR), _core_Const__WEBPACK_IMPORTED_MODULE_1__.PHASE_PROCESS_RESPONSE);
    assert(responseXML.querySelectorAll(_core_Const__WEBPACK_IMPORTED_MODULE_1__.XML_TAG_PARTIAL_RESP).isPresent(), _core_Const__WEBPACK_IMPORTED_MODULE_1__.ERR_NO_PARTIAL_RESPONSE, _core_Const__WEBPACK_IMPORTED_MODULE_1__.PHASE_PROCESS_RESPONSE);
  }
  Assertions2.assertValidXMLResponse = assertValidXMLResponse;
  function raiseError(error, message, caller, title, name) {
    let finalTitle = title != null ? title : _core_Const__WEBPACK_IMPORTED_MODULE_1__.MALFORMEDXML;
    let finalName = name != null ? name : _core_Const__WEBPACK_IMPORTED_MODULE_1__.MALFORMEDXML;
    let finalMessage = message != null ? message : _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR;
    return _Lang__WEBPACK_IMPORTED_MODULE_2__.ExtLang.makeException(error, finalTitle, finalName, "Response", caller || (arguments.caller ? arguments.caller.toString() : "_raiseError"), finalMessage);
  }
  Assertions2.raiseError = raiseError;
  function assert(value, msg = _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR, caller = _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR, title = "Assertion Error") {
    if (!value) {
      throw Assertions2.raiseError(new Error(), msg, caller, title);
    }
  }
  Assertions2.assert = assert;
  function assertType(value, theType, msg = _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR, caller = _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR, title = "Type Assertion Error") {
    if (!!value && !mona_dish__WEBPACK_IMPORTED_MODULE_0__.Lang.assertType(value, theType)) {
      throw Assertions2.raiseError(new Error(), msg, caller, title);
    }
  }
  Assertions2.assertType = assertType;
  function assertFunction(value, msg = _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR, caller = _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR, title = "Assertion Error") {
    assertType(value, "function", msg, caller, title);
  }
  Assertions2.assertFunction = assertFunction;
  function assertDelay(value) {
    if (!(value >= 0)) {
      throw new Error("Invalid delay value: " + value);
    }
  }
  Assertions2.assertDelay = assertDelay;
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
   * @param func the functor for the finally handling chain
   */
  finally(func) {
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


const IS_FACES_SOURCE = (source) => {
  return !!source && !!(source.search(/\/jakarta\.faces\.resource.*\/faces\.js.*/) != -1 || (source == null ? void 0 : source.search(/\/faces-development\.js.*/)) != -1 || (source == null ? void 0 : source.search(/\/faces-uncompressed\.js.*/)) != -1 || (source == null ? void 0 : source.search(/\/faces[^.]*\.js.*ln=jakarta.faces.*/gi)) != -1 || //fallback without check for jsf, that way we allow both bookmarks
  (source == null ? void 0 : source.search(/\/javax\.faces\.resource.*\/jsf\.js.*/)) != -1 || (source == null ? void 0 : source.search(/\/jsf-development\.js.*/)) != -1 || (source == null ? void 0 : source.search(/\/jsf-uncompressed\.js.*/)) != -1 || (source == null ? void 0 : source.search(/\/jsf[^.]*\.js.*ln=javax.faces.*/gi)) != -1);
};
const IS_INTERNAL_SOURCE = (source) => {
  return source.search(/\/faces[^.]*\.js.*ln=myfaces.testscripts.*/gi) != -1 || source.search(/\/jsf[^.]*\.js.*ln=myfaces.testscripts.*/gi) != -1;
};
const ATTR_SRC = "src";
function isRegExpMatchArray(value) {
  return value != null && value.length > 1;
}
class ExtDomQuery extends mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ {
  static get windowId() {
    return new ExtDomQuery(document.body).windowId;
  }
  static get nonce() {
    return new ExtDomQuery(document.body).nonce;
  }
  get windowId() {
    const fetchWindowIdFromURL = function() {
      let href = window.location.href;
      let windowId = "windowId";
      let regex = new RegExp("[\\?&]" + windowId + "=([^&#\\;]*)");
      let results = regex.exec(href);
      if (results != null) return results[1];
      return null;
    };
    if (this.value.isPresent()) {
      let result = this.querySelectorAll("form input[name='" + _core_Const__WEBPACK_IMPORTED_MODULE_1__.P_WINDOW_ID + "']");
      if (result.length > 1) {
        throw Error("Multiple different windowIds found in document");
      }
      return mona_dish__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(result.isPresent() ? result.getAsElem(0).value.value : fetchWindowIdFromURL());
    } else {
      return mona_dish__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable(fetchWindowIdFromURL());
    }
  }
  /*
  * determines the faces.js nonce and adds them to the namespace
  * this is done once and only lazily
  */
  get nonce() {
    var _a;
    let myfacesConfig = new ExtConfig(window.myfaces);
    let globalNonce = myfacesConfig.getIf("config", "cspMeta", "nonce");
    if (!!globalNonce.value) {
      return mona_dish__WEBPACK_IMPORTED_MODULE_0__.ValueEmbedder.fromNullable(globalNonce);
    }
    let curScript = new mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ(document.currentScript);
    let nonce = curScript.nonce;
    if (nonce.isPresent()) {
      return mona_dish__WEBPACK_IMPORTED_MODULE_0__.ValueEmbedder.fromNullable(nonce);
    }
    let nonceScript = mona_dish__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable((_a = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.querySelectorAll("script[src], link[src]").asArray.filter((item) => item.nonce.isPresent() && item.attr(ATTR_SRC).value != null).filter((item) => {
      var _a2;
      return IS_FACES_SOURCE((_a2 = item.attr(ATTR_SRC).value) != null ? _a2 : void 0);
    })) == null ? void 0 : _a[0]);
    if (!(nonceScript == null ? void 0 : nonceScript.value)) {
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
    return mona_dish__WEBPACK_IMPORTED_MODULE_0__.Optional.fromNullable((_a = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.querySelectorAll("script[src], link[src]").asArray.filter((item) => {
      var _a2;
      return IS_FACES_SOURCE((_a2 = item.attr(ATTR_SRC).value) != null ? _a2 : void 0);
    }).map((item) => {
      var _a2;
      return ((_a2 = item.attr(ATTR_SRC).value) != null ? _a2 : "").match(regExp);
    }).filter(isRegExpMatchArray).map((result) => {
      return decodeURIComponent(result[1]);
    })) == null ? void 0 : _a[0]);
  }
  // called from base class runScripts, do not delete
  // noinspection JSUnusedGlobalSymbols
  globalEvalSticky(code, nonce) {
    return new ExtDomQuery(super.globalEvalSticky(code, nonce != null ? nonce : this.nonce.value));
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
      return ((_a = whiteListed == null ? void 0 : whiteListed(src)) != null ? _a : true) && !IS_FACES_SOURCE(src) && !IS_INTERNAL_SOURCE(src);
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
    let processedScripts = [];
    function resourceIsNew(element) {
      if (!suppressDoubleIncludes) {
        return true;
      }
      const tagName = element.tagName.value;
      if (!tagName) {
        return true;
      }
      let reference = element.attr("href").orElseLazy(() => element.attr("src").value).orElseLazy(() => element.attr("rel").value);
      if (!reference.isPresent()) {
        return true;
      }
      return !head.querySelectorAll(`${tagName}[href='${reference.value}']`).length && !head.querySelectorAll(`${tagName}[src='${reference.value}']`).length && !head.querySelectorAll(`${tagName}[rel='${reference.value}']`).length;
    }
    this.filter(resourceIsNew).each((element) => {
      if (element.tagName.value != "SCRIPT") {
        new ExtDomQuery(...processedScripts).runScripts(true);
        processedScripts = [];
        head.append(element);
      } else {
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
    if ((0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$faces)().getProjectStage().toLowerCase() == "development" && (window == null ? void 0 : window.console) && ret.isAbsent() && selector) {
      let identifier = (_c = (_b = (_a = selector == null ? void 0 : selector.id) == null ? void 0 : _a.value) != null ? _b : selector == null ? void 0 : selector.id) != null ? _c : selector.toString();
      console.error("Element  " + identifier + "not found");
    }
    return new ExtDomQuery(ret);
  }
  filter(func) {
    return new ExtDomQuery(super.filter(func));
  }
}
const ExtDQ = ExtDomQuery;
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



function encodeFormData(formData, paramsMapper = (inStr, inVal) => [inStr, inVal], defaultStr = _core_Const__WEBPACK_IMPORTED_MODULE_2__.EMPTY_STR) {
  if (formData.isAbsent()) {
    return defaultStr;
  }
  const assocValues = formData.value;
  const expandValueArrAndRename = (key) => assocValues[key].map((val) => paramsMapper(key, val));
  const isPropertyKey = (key) => assocValues.hasOwnProperty(key);
  const isNotFile = ([, value]) => !(value instanceof _ExtDomQuery__WEBPACK_IMPORTED_MODULE_1__.ExtDomQuery.global().File);
  const mapIntoUrlParam = (keyVal) => `${encodeURIComponent(keyVal[0])}=${encodeURIComponent(keyVal[1])}`;
  return new mona_dish__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...Object.keys(assocValues)).filter(isPropertyKey).flatMap(expandValueArrAndRename).filter(isNotFile).map(mapIntoUrlParam).join("&");
}
function decodeEncodedValues(encoded) {
  const filterBlanks = (item) => !!(item || "").replace(/\s+/g, "");
  const splitKeyValuePair = (_line) => {
    let line = decodeURIComponent(_line);
    let index = line.indexOf("=");
    if (index === -1) {
      return [line];
    }
    return [line.substring(0, index), line.substring(index + 1)];
  };
  let requestParamEntries = encoded.split("&");
  return requestParamEntries.filter(filterBlanks).map(splitKeyValuePair);
}
function resolveFiles(dataSource) {
  const expandFilesArr = ([key, files2]) => {
    return [...files2].map((file) => [key, file]);
  };
  const remapFileInput = (fileInput) => {
    return [fileInput.name.value || fileInput.id.value, fileInput.filesFromElem(0)];
  };
  const files = dataSource.querySelectorAllDeep("input[type='file']").asArray;
  const ret = files.map(remapFileInput).flatMap(expandFilesArr);
  return ret;
}
function fixEmptyParameters(keyVal) {
  var _a, _b;
  return keyVal.length < 3 ? [(_a = keyVal == null ? void 0 : keyVal[0]) != null ? _a : [], (_b = keyVal == null ? void 0 : keyVal[1]) != null ? _b : []] : keyVal;
}
function resolveViewState(parentItem) {
  const viewStateStr = (0,_core_Const__WEBPACK_IMPORTED_MODULE_2__.$faces)().getViewState(parentItem.getAsElem(0).value);
  return decodeEncodedValues(viewStateStr);
}
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


class HiddenInputBuilder {
  constructor(selector) {
    this.namedViewRoot = false;
    const isViewState = selector.includes((0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_1__.P_VIEWSTATE));
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
    var _a;
    const newElement = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.fromMarkup((0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(this.template));
    newElement.id.value = this.buildId();
    newElement.name.value = this.buildName();
    (_a = this.parent) == null ? void 0 : _a.append(newElement);
    return newElement;
  }
  buildId() {
    var _a;
    const separator = (0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$faces)().separatorchar;
    const parts = ((_a = this.namingContainerId) == null ? void 0 : _a.length) ? [this.namingContainerId, (0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(this.name), this.nextIndex()] : [(0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(this.name), this.nextIndex()];
    return parts.join(separator);
  }
  buildName() {
    var _a;
    if (!this.namedViewRoot) {
      return (0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(this.name);
    }
    return ((_a = this.namingContainerId) == null ? void 0 : _a.length) ? [this.namingContainerId, (0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(this.name)].join((0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$faces)().separatorchar) : (0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(this.name);
  }
  nextIndex() {
    const separator = (0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$faces)().separatorchar;
    return (0,mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ$)(`[name*='${(0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(this.name)}']`).asArray.map((state) => state.id.orElse("0").value).map((id) => id.substring(id.lastIndexOf(separator) + 1)).map((idSuffix) => parseInt(idSuffix)).filter((idSuffix) => !isNaN(idSuffix)).reduce((max, idSuffix) => Math.max(max, idSuffix), 0) + 1;
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
((ExtLang2) => {
  let installedLocale;
  const nameSpace = "impl/util/Lang/";
  function getLanguage() {
    var _a, _b, _c;
    const language = (_c = (_b = (_a = navigator.languages) == null ? void 0 : _a[0]) != null ? _b : navigator == null ? void 0 : navigator.language) != null ? _c : "en";
    return language.split("-")[0];
  }
  ExtLang2.getLanguage = getLanguage;
  function failSaveResolve(resolverProducer, defaultValue = null) {
    return mona_dish__WEBPACK_IMPORTED_MODULE_0__.Lang.saveResolve(resolverProducer, defaultValue);
  }
  ExtLang2.failSaveResolve = failSaveResolve;
  function failSaveExecute(resolverProducer, defaultValue = null) {
    mona_dish__WEBPACK_IMPORTED_MODULE_0__.Lang.saveResolve(resolverProducer, defaultValue);
  }
  ExtLang2.failSaveExecute = failSaveExecute;
  function getMessage(key, defaultMessage, ...templateParams) {
    var _a, _b;
    installedLocale = installedLocale != null ? installedLocale : new _i18n_Messages__WEBPACK_IMPORTED_MODULE_1__.Messages();
    let msg = (_b = (_a = installedLocale[key]) != null ? _a : defaultMessage) != null ? _b : key;
    templateParams.forEach((param, cnt) => {
      msg = msg.replace(new RegExp(["\\{", cnt, "\\}"].join(_core_Const__WEBPACK_IMPORTED_MODULE_2__.EMPTY_STR), "g"), param);
    });
    return msg;
  }
  ExtLang2.getMessage = getMessage;
  function keyValToStr(key, val, delimiter = "\n") {
    return [key, val].join(delimiter);
  }
  ExtLang2.keyValToStr = keyValToStr;
  function makeException(error, title, name, callerCls, callFunc, message) {
    return new Error(message + (callerCls != null ? callerCls : nameSpace) + callFunc);
  }
  ExtLang2.makeException = makeException;
  function getGlobalConfig(configName, defaultValue) {
    var _a, _b, _c;
    return (_c = (_b = (_a = window == null ? void 0 : window.myfaces) == null ? void 0 : _a.config) == null ? void 0 : _b[configName]) != null ? _c : defaultValue;
  }
  ExtLang2.getGlobalConfig = getGlobalConfig;
  function getForm(elem, event) {
    const queryElem = new mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ(elem);
    const eventTarget = event ? new mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ((0,_xhrCore_RequestDataResolver__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(event)) : mona_dish__WEBPACK_IMPORTED_MODULE_0__.DomQuery.absent;
    if (queryElem.isTag(_core_Const__WEBPACK_IMPORTED_MODULE_2__.HTML_TAG_FORM)) {
      return queryElem;
    }
    if (queryElem.attr(_core_Const__WEBPACK_IMPORTED_MODULE_2__.HTML_TAG_FORM).isPresent()) {
      const formId = queryElem.attr(_core_Const__WEBPACK_IMPORTED_MODULE_2__.HTML_TAG_FORM).value;
      const foundForm = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId(formId, true);
      if (foundForm.isPresent()) {
        return foundForm;
      }
    }
    let form = queryElem.firstParent(_core_Const__WEBPACK_IMPORTED_MODULE_2__.HTML_TAG_FORM).orElseLazy(() => queryElem.byTagName(_core_Const__WEBPACK_IMPORTED_MODULE_2__.HTML_TAG_FORM, true)).orElseLazy(() => eventTarget.firstParent(_core_Const__WEBPACK_IMPORTED_MODULE_2__.HTML_TAG_FORM)).orElseLazy(() => eventTarget.byTagName(_core_Const__WEBPACK_IMPORTED_MODULE_2__.HTML_TAG_FORM)).first();
    form = form.orElseLazy(() => mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byTagName(_core_Const__WEBPACK_IMPORTED_MODULE_2__.HTML_TAG_FORM));
    assertOnlyOneFormExists(form);
    return form;
  }
  ExtLang2.getForm = getForm;
  function getLocalOrGlobalConfig(localOptions, configName, defaultValue) {
    var _a, _b, _c, _d, _e, _f, _g;
    return (_g = (_f = (_c = (_b = (_a = localOptions.value) == null ? void 0 : _a.myfaces) == null ? void 0 : _b.config) == null ? void 0 : _c[configName]) != null ? _f : (_e = (_d = window == null ? void 0 : window.myfaces) == null ? void 0 : _d.config) == null ? void 0 : _e[configName]) != null ? _g : defaultValue;
  }
  ExtLang2.getLocalOrGlobalConfig = getLocalOrGlobalConfig;
  function ofAssoc(value) {
    return new mona_dish__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...Object.keys(value)).map((key) => [key, value[key]]);
  }
  ExtLang2.ofAssoc = ofAssoc;
  function collectAssoc(target, item) {
    target[item[0]] = item[1];
    return target;
  }
  ExtLang2.collectAssoc = collectAssoc;
  let activeTimeouts = {};
  function debounce(key, runnable, timeout) {
    function clearActiveTimeout() {
      clearTimeout(activeTimeouts[key]);
      delete activeTimeouts[key];
    }
    if (!!(activeTimeouts == null ? void 0 : activeTimeouts[key])) {
      clearActiveTimeout();
    }
    if (timeout > 0) {
      activeTimeouts[key] = setTimeout(() => {
        try {
          runnable();
        } finally {
          clearActiveTimeout();
        }
      }, timeout);
    } else {
      runnable();
    }
  }
  ExtLang2.debounce = debounce;
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

const debounce = _Lang__WEBPACK_IMPORTED_MODULE_0__.ExtLang.debounce;
const _XhrQueueController = class _XhrQueueController {
  constructor() {
    this.queue = [];
    this.taskRunning = false;
    this.debounceKey = `xhrQueue_${_XhrQueueController.instanceCount++}`;
  }
  /**
   * executes or enqueues an element
   * @param runnable the runnable (request) to be enqueued
   * @param timeOut timeout if > 0 which defers the execution
   * until the debounce window for the timeout is closed.
   */
  enqueue(runnable, timeOut = 0) {
    debounce(this.debounceKey, () => {
      const requestHandler = this.enrichRunnable(runnable);
      if (!this.taskRunning) {
        this.signalTaskRunning();
        requestHandler.start();
      } else {
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
    next == null ? void 0 : next.start();
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
    return asyncRunnable.then(() => this.next()).catch(() => this.clear());
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
};
// Each instance needs its own debounce key: a shared key would cause enqueues
// on separate instances to cancel each other's debounce window.
_XhrQueueController.instanceCount = 0;
let XhrQueueController = _XhrQueueController;


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
var ErrorType = /* @__PURE__ */ ((ErrorType2) => {
  ErrorType2["SERVER_ERROR"] = "serverError";
  ErrorType2["HTTP_ERROR"] = "httpError";
  ErrorType2["CLIENT_ERROR"] = "clientError";
  ErrorType2["TIMEOUT"] = "timeout";
  return ErrorType2;
})(ErrorType || {});
class ErrorData extends _EventData__WEBPACK_IMPORTED_MODULE_2__.EventData {
  /** @internal */
  constructor(source, errorName, errorMessage, responseText = null, responseXML = null, responseCode = -1, statusOverride = null, type = "clientError" /* CLIENT_ERROR */) {
    super();
    this.type = "error";
    this.source = mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.byId(source).value.orElse(source).value;
    this.type = _core_Const__WEBPACK_IMPORTED_MODULE_0__.ERROR;
    this.errorName = errorName;
    this.errorMessage = type == "serverError" /* SERVER_ERROR */ ? type + ": " + errorMessage : errorMessage;
    this.responseCode = responseCode;
    this.responseText = responseText;
    this.responseXML = responseXML;
    this.status = statusOverride;
    this.description = `Status: ${this.status}
Response Code: ${this.responseCode}
Error Message: ${this.errorMessage}`;
    this.typeDetails = type;
    if (type == "serverError" /* SERVER_ERROR */) {
      this.serverErrorName = this.errorName;
      this.serverErrorMessage = this.errorMessage;
    }
  }
  /** @internal */
  static fromClient(e) {
    var _a, _b, _c, _d;
    return new ErrorData((_a = e == null ? void 0 : e.source) != null ? _a : "client", (_b = e == null ? void 0 : e.name) != null ? _b : _core_Const__WEBPACK_IMPORTED_MODULE_0__.EMPTY_STR, (_c = e == null ? void 0 : e.message) != null ? _c : _core_Const__WEBPACK_IMPORTED_MODULE_0__.EMPTY_STR, (_d = e == null ? void 0 : e.stack) != null ? _d : _core_Const__WEBPACK_IMPORTED_MODULE_0__.EMPTY_STR);
  }
  /** @internal */
  static fromHttpConnection(source, name, message, responseText, responseXML, responseCode, status = _core_Const__WEBPACK_IMPORTED_MODULE_0__.EMPTY_STR) {
    return new ErrorData(source, name, message, responseText, responseXML, responseCode, status, "httpError" /* HTTP_ERROR */);
  }
  /** @internal */
  static fromGeneric(context, errorCode, errorType = "serverError" /* SERVER_ERROR */) {
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
  /** @internal */
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
  /** @internal */
  static createFromRequest(request, internalContext, context, name) {
    let eventData = new EventData();
    let internalSource = "_internal._source";
    eventData.type = _core_Const__WEBPACK_IMPORTED_MODULE_1__.EVENT;
    eventData.status = name;
    eventData.source = internalContext.getIf("_source", "_element").value;
    if (!eventData.source) {
      let sourceId = context.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_1__.SOURCE).orElseLazy(() => context.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_1__.P_AJAX_SOURCE).value).orElseLazy(() => context.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_1__.CTX_PARAM_REQ_PASS_THR, _core_Const__WEBPACK_IMPORTED_MODULE_1__.P_AJAX_SOURCE).value).value;
      if (sourceId) {
        eventData.source = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId(sourceId, true).first().value.value;
      }
      if (eventData.source) {
        internalContext.assign("_source", "_element").value = eventData.source;
      }
    }
    if (name !== _core_Const__WEBPACK_IMPORTED_MODULE_1__.BEGIN) {
      eventData.responseCode = request == null ? void 0 : request.status;
      eventData.responseText = request == null ? void 0 : request.responseText;
      eventData.responseXML = request == null ? void 0 : request.responseXML;
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





function resolveHandlerFunc(requestContext, responseContext, funcName) {
  responseContext = responseContext || new mona_dish__WEBPACK_IMPORTED_MODULE_0__.Config({});
  return responseContext.getIf(funcName).orElseLazy(() => requestContext.getIf(funcName).value).orElse(_core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_FUNC).value;
}
function resolveTargetUrl(srcFormElement) {
  const formElements = srcFormElement.elements;
  return typeof formElements[_core_Const__WEBPACK_IMPORTED_MODULE_1__.ENCODED_URL] == "undefined" ? srcFormElement.action : formElements[_core_Const__WEBPACK_IMPORTED_MODULE_1__.ENCODED_URL].value;
}
function resolveFinalUrl(sourceForm, formData, ajaxType = _core_Const__WEBPACK_IMPORTED_MODULE_1__.REQ_TYPE_POST) {
  let targetUrl = resolveTargetUrl(sourceForm.getAsElem(0).value);
  return targetUrl + (ajaxType == _core_Const__WEBPACK_IMPORTED_MODULE_1__.REQ_TYPE_GET ? "?" + formData.toString() : _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR);
}
function resolveForm(elem, event) {
  return _util_Lang__WEBPACK_IMPORTED_MODULE_2__.ExtLang.getForm(elem.getAsElem(0).value, event);
}
function resolveViewId(form) {
  const viewState = form.querySelectorAll(`input[type='hidden'][name*='${(0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_1__.P_VIEWSTATE)}']`).id.orElse("").value;
  const divider = (0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$faces)().separatorchar;
  const viewId = viewState.split(divider, 2)[0];
  const viewStateViewId = viewId.indexOf((0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_1__.P_VIEWSTATE)) === -1 ? viewId : "";
  return form.id.value.indexOf(viewStateViewId) === 0 ? viewStateViewId : "";
}
function resolveViewRootId(form) {
  const viewState = form.querySelectorAll(`input[type='hidden'][name*='${(0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_1__.P_VIEWSTATE)}']`).attr("name").orElse("").value;
  const divider = (0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$faces)().separatorchar;
  const viewId = viewState.split(divider, 2)[0];
  return viewId.indexOf((0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_1__.P_VIEWSTATE)) === -1 ? viewId : "";
}
function resoveNamingContainerMapper(internalContext) {
  const isNamedViewRoot = internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_1__.NAMED_VIEWROOT).isPresent();
  if (!isNamedViewRoot) {
    return (key, value) => [key, value];
  }
  const partialId = internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_1__.NAMING_CONTAINER_ID).value;
  const SEP = (0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$faces)().separatorchar;
  const prefix = partialId + SEP;
  return (key, value) => key.indexOf(prefix) == 0 ? [key, value] : [prefix + key, value];
}
function resolveTimeout(options) {
  var _a;
  let getCfg = _util_Lang__WEBPACK_IMPORTED_MODULE_2__.ExtLang.getLocalOrGlobalConfig;
  return (_a = options.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_1__.CTX_OPTIONS_TIMEOUT).value) != null ? _a : getCfg(options.value, _core_Const__WEBPACK_IMPORTED_MODULE_1__.CTX_OPTIONS_TIMEOUT, 0);
}
function resolveDelay(options) {
  let ret = options.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_1__.CTX_OPTIONS_DELAY).orElse(0).value;
  ret = _core_Const__WEBPACK_IMPORTED_MODULE_1__.DELAY_NONE === ret ? 0 : ret;
  _util_Assertions__WEBPACK_IMPORTED_MODULE_4__.Assertions.assertDelay(ret);
  return ret;
}
function resolveWindowId(options) {
  var _a, _b;
  return (_b = (_a = options == null ? void 0 : options.value) == null ? void 0 : _a.windowId) != null ? _b : _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_3__.ExtDomQuery.windowId.value;
}
function getEventTarget(evt) {
  var _a, _b;
  let finalEvent = evt;
  let t = (_b = (_a = finalEvent == null ? void 0 : finalEvent.srcElement) != null ? _a : finalEvent == null ? void 0 : finalEvent.target) != null ? _b : finalEvent == null ? void 0 : finalEvent.source;
  while (t && t.nodeType != 1) {
    t = t.parentNode;
  }
  return t;
}
function resolveDefaults(event, opts, el = null) {
  var _a;
  const elem = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId(el || event.target, true);
  const options = new _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_3__.ExtConfig(opts).deepCopy;
  return {
    options,
    elem,
    elementId: elem.id.value,
    windowId: resolveWindowId(options),
    isResetValues: true === ((_a = options.value) == null ? void 0 : _a.resetValues)
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
((Response2) => {
  function processResponse(request, context) {
    let req = _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_4__.ExtConfig.fromNullable(request);
    let { externalContext, internalContext } = (0,_ResponseDataResolver__WEBPACK_IMPORTED_MODULE_3__.resolveContexts)(context);
    let responseXML = (0,_ResponseDataResolver__WEBPACK_IMPORTED_MODULE_3__.resolveResponseXML)(req);
    let responseProcessor = new _ResponseProcessor__WEBPACK_IMPORTED_MODULE_1__.ResponseProcessor(req, externalContext, internalContext);
    internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_2__.RESPONSE_XML).value = responseXML;
    responseXML.querySelectorAll(_core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_PARTIAL_RESP).each((item) => processPartialTag(item, responseProcessor, internalContext));
    responseProcessor.updateNamedViewRootState();
    responseProcessor.fixViewStates();
    responseProcessor.fixClientWindow();
    responseProcessor.globalEval();
    responseProcessor.done();
  }
  Response2.processResponse = processResponse;
  function processPartialTag(node, responseProcessor, internalContext) {
    var _a;
    let partialId = (_a = node == null ? void 0 : node.id) == null ? void 0 : _a.value;
    internalContext.assignIf(!!partialId, _core_Const__WEBPACK_IMPORTED_MODULE_2__.NAMING_CONTAINER_ID).value = partialId;
    responseProcessor.updateNamedViewRootState();
    const SEL_SUB_TAGS = [_core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_ERROR, _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_REDIRECT, _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_CHANGES].join(",");
    node.querySelectorAll(SEL_SUB_TAGS).each((node2) => {
      switch (node2.tagName.value) {
        case _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_ERROR:
          responseProcessor.error(node2);
          break;
        case _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_REDIRECT:
          responseProcessor.redirect(node2);
          break;
        case _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_CHANGES:
          processChangesTag(node2, responseProcessor);
          break;
      }
    });
  }
  let processInsert = function(responseProcessor, node) {
    if (node.querySelectorAll([_core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_BEFORE, _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_AFTER].join(",")).length) {
      responseProcessor.insertWithSubTags(node);
    } else {
      responseProcessor.insert(node);
    }
  };
  function processChangesTag(node, responseProcessor) {
    const ALLOWED_TAGS = [_core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_UPDATE, _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_EVAL, _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_INSERT, _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_DELETE, _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_ATTRIBUTES, _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_EXTENSION].join(", ");
    node.querySelectorAll(ALLOWED_TAGS).each(
      (node2) => {
        switch (node2.tagName.value) {
          case _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_UPDATE:
            processUpdateTag(node2, responseProcessor);
            break;
          case _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_EVAL:
            responseProcessor.eval(node2);
            break;
          case _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_INSERT:
            processInsert(responseProcessor, node2);
            break;
          case _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_DELETE:
            responseProcessor.delete(node2);
            break;
          case _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_ATTRIBUTES:
            responseProcessor.attributes(node2);
            break;
          case _core_Const__WEBPACK_IMPORTED_MODULE_2__.XML_TAG_EXTENSION:
            break;
        }
      }
    );
    return true;
  }
  function storeState(responseProcessor, node) {
    return responseProcessor.processViewState(node) || responseProcessor.processClientWindow(node);
  }
  function processUpdateTag(node, responseProcessor) {
    if (!storeState(responseProcessor, node)) {
      handleElementUpdate(node, responseProcessor);
    }
  }
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
      default:
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
/* harmony export */   resolveResponseXML: () => (/* binding */ resolveResponseXML)
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




function resolveResponseXML(request) {
  let ret = new mona_dish__WEBPACK_IMPORTED_MODULE_0__.XMLQuery((0,_core_Const__WEBPACK_IMPORTED_MODULE_2__.$nsp)(request.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_2__.SEL_RESPONSE_XML).value));
  _util_Assertions__WEBPACK_IMPORTED_MODULE_1__.Assertions.assertValidXMLResponse(ret);
  return ret;
}
function resolveContexts(context) {
  let externalContext = _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_3__.ExtConfig.fromNullable(context);
  let internalContext = externalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_2__.CTX_PARAM_MF_INTERNAL);
  if (!internalContext.isPresent()) {
    internalContext = _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_3__.ExtConfig.fromNullable({});
  }
  internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_2__.DEFERRED_HEAD_INSERTS).value = [];
  internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_2__.UPDATE_FORMS).value = [];
  internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_2__.UPDATE_ELEMS).value = [];
  return { externalContext, internalContext };
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
    head.childNodes.delete();
    this.addToHead(shadowHead);
    head.copyAttrs(shadowHead);
  }
  addToHead(shadowHead) {
    const mappedHeadData = new _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_7__.ExtDomQuery(shadowHead);
    const scriptTags = [_core_Const__WEBPACK_IMPORTED_MODULE_6__.HTML_TAG_SCRIPT];
    const nonExecutables = mappedHeadData.filter((item) => scriptTags.indexOf(item.tagName.orElse("").value) == -1);
    nonExecutables.runHeadInserts(true);
    const nodesToAdd = shadowHead.tagName.value === "HEAD" ? shadowHead.childNodes : shadowHead;
    const scriptElements = new mona_dish__WEBPACK_IMPORTED_MODULE_0__.DomQuery(...nodesToAdd.asArray.filter((item) => scriptTags.indexOf(item.tagName.orElse("").value) != -1));
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
    resultingBody.html(shadowInnerHTML).copyAttrs(shadowBody);
    this.externalContext.assign((0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_RENDER_OVERRIDE)).value = "@all";
    this.storeForPostProcessing(updateForms, resultingBody);
  }
  /**
   * Leaf Tag eval... process whatever is in the eval cdata block
   *
   * if the eval node carries an explicit nonce attribute (Jakarta Faces 5.0 CSP proposal,
   * see https://github.com/jakartaee/faces/issues/1590) it is used, otherwise this falls
   * back to the page's own CSP nonce, the same one applied to embedded scripts in update/insert
   * blocks, so evaluated code is never silently dropped under a strict CSP script-src policy
   *
   * @param node the node to eval
   */
  eval(node) {
    var _a;
    const nonce = (_a = node.attr(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ATTR_NONCE).value) != null ? _a : _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_7__.ExtDomQuery.nonce.value;
    _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_7__.ExtDomQuery.globalEval(node.cDATAAsString, nonce);
  }
  /**
   * processes an incoming error from the response
   * which is hosted under the &lt;error&gt; tag
   * @param node the node hosting the error in our response xml
   * @param node the node in the xml hosting the error message
   */
  error(node) {
    const mergedErrorData = new _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_7__.ExtConfig({});
    mergedErrorData.assign(_core_Const__WEBPACK_IMPORTED_MODULE_6__.SOURCE).value = this.externalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_AJAX_SOURCE).get(0).value;
    mergedErrorData.assign(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ERROR_NAME).value = node.querySelectorAll(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ERROR_NAME).textContent(_core_Const__WEBPACK_IMPORTED_MODULE_6__.EMPTY_STR);
    mergedErrorData.assign(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ERROR_MESSAGE).value = node.querySelectorAll(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ERROR_MESSAGE).cDATAAsString;
    const hasResponseXML = this.internalContext.get(_core_Const__WEBPACK_IMPORTED_MODULE_6__.RESPONSE_XML).isPresent();
    mergedErrorData.assignIf(hasResponseXML, _core_Const__WEBPACK_IMPORTED_MODULE_6__.RESPONSE_XML).value = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.RESPONSE_XML).value.get(0).value;
    const errorData = _ErrorData__WEBPACK_IMPORTED_MODULE_3__.ErrorData.fromServerError(mergedErrorData);
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
    const sourceForm = result == null ? void 0 : result.firstParent(_core_Const__WEBPACK_IMPORTED_MODULE_6__.HTML_TAG_FORM).orElseLazy(() => result.byTagName(_core_Const__WEBPACK_IMPORTED_MODULE_6__.HTML_TAG_FORM, true));
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
    before.each((item) => {
      const insertId = item.attr(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ATTR_ID);
      const insertNodes = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.fromMarkup(item.cDATAAsString);
      if (insertId.isPresent()) {
        mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId(insertId.value, true).insertBefore(insertNodes);
        this.internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_6__.UPDATE_ELEMS).value.push(insertNodes);
      }
    });
    after.each((item) => {
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
    let insertHeadElems = new _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_7__.ExtDomQuery(...this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.DEFERRED_HEAD_INSERTS).value);
    insertHeadElems.runHeadInserts(true);
    let updateElems = new _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_7__.ExtDomQuery(...this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.UPDATE_ELEMS).value);
    updateElems.runCss();
    updateElems.runScripts();
  }
  /**
   * Postprocessing view state fixing
   * this appends basically the incoming view states to the forms.
   * It is called from outside after all forms have been processed basically
   * as last lifecycle step, before going into the next request.
   */
  fixViewStates() {
    ofAssoc(this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.APPLIED_VST).orElse({}).value).forEach(([, value]) => {
      const namingContainerId = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.NAMING_CONTAINER_ID);
      const namedViewRoot = !!this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.NAMED_VIEWROOT).value;
      const affectedForms = this.getContainerForms(namingContainerId).filter((affectedForm) => this.isInExecuteOrRender(affectedForm));
      this.appendViewStateToForms(affectedForms, namedViewRoot, value.value, namingContainerId.orElse("").value);
    });
  }
  /**
   * same as with view states before applies the incoming client windows as last step after the rest of the processing
   * is done.
   */
  fixClientWindow() {
    ofAssoc(this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.APPLIED_CLIENT_WINDOW).orElse({}).value).forEach(([, value]) => {
      const namingContainerId = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.NAMING_CONTAINER_ID);
      const namedViewRoot = !!this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.NAMED_VIEWROOT).value;
      const affectedForms = this.getContainerForms(namingContainerId).filter((affectedForm) => this.isInExecuteOrRender(affectedForm));
      this.appendClientWindowToForms(affectedForms, namedViewRoot, value.value, namingContainerId.orElse("").value);
    });
  }
  updateNamedViewRootState() {
    let partialId = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.NAMING_CONTAINER_ID);
    let namedViewRoot = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.NAMED_VIEWROOT);
    if (partialId.isPresent() && (namedViewRoot.isAbsent() || !namedViewRoot.value)) {
      const SEP = (0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$faces)().separatorchar;
      this.internalContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_6__.NAMED_VIEWROOT).value = !!document.getElementById(partialId.value) || (0,mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ$)(`input[name*='${(0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_VIEWSTATE)}']`).filter((node) => node.attr("name").value.indexOf(partialId.value + SEP) == 0).length > 0;
    }
  }
  /**
   * all processing done we can close the request and send the appropriate events
   */
  done() {
    const eventData = _EventData__WEBPACK_IMPORTED_MODULE_5__.EventData.createFromRequest(this.request.value, this.internalContext, this.externalContext, _core_Const__WEBPACK_IMPORTED_MODULE_6__.SUCCESS);
    const eventHandler = this.externalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ON_EVENT).orElseLazy(() => this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.ON_EVENT).value).orElse(_core_Const__WEBPACK_IMPORTED_MODULE_6__.EMPTY_FUNC).value;
    _AjaxImpl__WEBPACK_IMPORTED_MODULE_1__.Implementation.sendEvent(eventData, eventHandler);
  }
  /**
   * proper viewState -> form assignment
   *
   * @param forms the forms to append the viewState to
   * @param namedViewRoot if set to true, the name is also prefixed
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
   * @param namedViewRoot if set to true, the name is also prefixed
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
    const createAndAppendHiddenInput = (form) => {
      return new _util_HiddenInputBuilder__WEBPACK_IMPORTED_MODULE_8__.HiddenInputBuilder(selector).withNamingContainerId(namingContainerId).withParent(form).withNamedViewRoot(namedViewRoot).build();
    };
    forms.each((form) => {
      const hiddenInput = form.querySelectorAll(selector).orElseLazy(() => createAndAppendHiddenInput(form));
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
    return "undefined" != typeof ((_a = node == null ? void 0 : node.id) == null ? void 0 : _a.value) && (((_b = node == null ? void 0 : node.id) == null ? void 0 : _b.value) == (0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_VIEWSTATE) || ((_d = (_c = node == null ? void 0 : node.id) == null ? void 0 : _c.value) == null ? void 0 : _d.indexOf([SEP, (0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_VIEWSTATE)].join(_core_Const__WEBPACK_IMPORTED_MODULE_6__.EMPTY_STR))) != -1 || ((_f = (_e = node == null ? void 0 : node.id) == null ? void 0 : _e.value) == null ? void 0 : _f.indexOf([(0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_VIEWSTATE), SEP].join(_core_Const__WEBPACK_IMPORTED_MODULE_6__.EMPTY_STR))) != -1);
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
    return "undefined" != typeof ((_a = node == null ? void 0 : node.id) == null ? void 0 : _a.value) && (((_b = node == null ? void 0 : node.id) == null ? void 0 : _b.value) == (0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_CLIENT_WINDOW) || ((_d = (_c = node == null ? void 0 : node.id) == null ? void 0 : _c.value) == null ? void 0 : _d.indexOf([SEP, (0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_CLIENT_WINDOW)].join(_core_Const__WEBPACK_IMPORTED_MODULE_6__.EMPTY_STR))) != -1 || ((_f = (_e = node == null ? void 0 : node.id) == null ? void 0 : _e.value) == null ? void 0 : _f.indexOf([(0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_CLIENT_WINDOW), SEP].join(_core_Const__WEBPACK_IMPORTED_MODULE_6__.EMPTY_STR))) != -1);
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
    const renders = this.externalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_RENDER_OVERRIDE).orElseLazy(() => this.externalContext.getIf((0,_core_Const__WEBPACK_IMPORTED_MODULE_6__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_6__.P_RENDER)).value).orElse(_core_Const__WEBPACK_IMPORTED_MODULE_6__.IDENT_NONE).value.split(/\s+/gi);
    const executeAndRenders = executes.concat(...renders);
    return [...executeAndRenders].filter((nameOrId) => {
      if ([_core_Const__WEBPACK_IMPORTED_MODULE_6__.IDENT_ALL, _core_Const__WEBPACK_IMPORTED_MODULE_6__.IDENT_NONE].indexOf(nameOrId) != -1) {
        return true;
      }
      const NAME_OR_ID = this.getNameOrIdSelector(nameOrId);
      return affectedForm.matchesSelector(NAME_OR_ID) || affectedForm.querySelectorAll(NAME_OR_ID).isPresent() || affectedForm.firstParent(NAME_OR_ID).isPresent();
    }).length > 0;
  }
  /**
   * gets all forms under a single naming container id
   * @param namingContainerId
   * @private
   */
  getContainerForms(namingContainerId) {
    if (namingContainerId.isPresent()) {
      return (0,mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ$)(this.getNameOrIdSelector(namingContainerId.value)).orElseLazy(() => mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byTagName(_core_Const__WEBPACK_IMPORTED_MODULE_6__.HTML_TAG_BODY)).byTagName(_core_Const__WEBPACK_IMPORTED_MODULE_6__.HTML_TAG_FORM, true);
    } else {
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
    this.paramsMapper = paramsMapper;
    /**
     * Checks if the given datasource is a multipart request source
     * multipart is only needed if one of the executes is a file input
     * since file inputs are stateless, they fall out of the view state
     * and need special handling. With file submits we have to send a formData object
     * instead of an encoded string files cannot be sent that way
     */
    this.isMultipartRequest = false;
    this.initFormData(dataSource, executes, partialIds);
  }
  /**
   * @returns a Form data representation, this is needed for file submits
   */
  toFormData() {
    return this.buildFormData();
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
   * Drives the three-phase form data initialisation in the required order.
   */
  initFormData(dataSource, executes, partialIds) {
    this.detectMultipartRequest(dataSource, executes);
    this.encodeSubmittableFields(dataSource, partialIds);
    this.applyViewState(dataSource);
  }
  /**
   * Sets isMultipartRequest when any of the executed elements is a file input.
   */
  detectMultipartRequest(rootElement, executes) {
    if (!executes || executes.includes(_core_Const__WEBPACK_IMPORTED_MODULE_1__.IDENT_NONE)) {
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
    const viewStateElement = form.querySelectorAllDeep(`[name*='${(0,_core_Const__WEBPACK_IMPORTED_MODULE_1__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_1__.P_VIEWSTATE)}'`);
    const viewState = viewStateElement.inputValue;
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
    const remappedPartialIds = partialIds.map((id) => this.remapKeyForNamingContainer(id));
    (0,_util_FileUtils__WEBPACK_IMPORTED_MODULE_2__.getFormInputsAsArr)(parentItem).map(_util_FileUtils__WEBPACK_IMPORTED_MODULE_2__.fixEmptyParameters).map(namingContainerRemap).filter(([key]) => this.isFieldIncluded(key, remappedPartialIds)).forEach(mergeIntoThis);
  }
  /**
   * Returns true when the field should be included in the submission.
   * Special "@"-prefixed keys (internal markers) are always included.
   * When no partial ids are specified, everything passes through.
   */
  isFieldIncluded(key, remappedPartialIds) {
    if (!remappedPartialIds.length || key.startsWith("@")) {
      return true;
    }
    return remappedPartialIds.includes(key);
  }
  /**
   * Builds the FormData object from the internal key→value[] map.
   * Arrays are expanded so each value becomes a separate FormData entry.
   */
  buildFormData() {
    const expandValueArrays = ([key, item]) => {
      if (Array.isArray(item)) {
        return new mona_dish__WEBPACK_IMPORTED_MODULE_0__.Es2019Array(...item).map((value) => ({ key, value }));
      }
      return [{ key, value: item }];
    };
    const remapForNamingContainer = ({ key, value }) => ({
      key: this.remapKeyForNamingContainer(key),
      value
    });
    return ofAssoc(this.value).flatMap(expandValueArrays).map(remapForNamingContainer).reduce((formData, { key, value }) => {
      formData.append(key, value);
      return formData;
    }, new FormData());
  }
  /**
   * Applies paramsMapper to remap only the key, ignoring the value transformation.
   * EMPTY_STR is passed as a placeholder since only the remapped key is used.
   */
  remapKeyForNamingContainer(key) {
    const [remappedKey] = this.paramsMapper(key, _core_Const__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STR);
    return remappedKey;
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

const _XhrRequest = class _XhrRequest extends _util_AsyncRunnable__WEBPACK_IMPORTED_MODULE_0__.AsyncRunnable {
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
    this.ERR_INVALID_RESPONSE = "Invalid Response";
    this.ERR_EMPTY_RESPONSE = "Empty Response";
    this.stopProgress = false;
    this.xhrObject = new XMLHttpRequest();
    this.registerXhrCallbacks((data) => this.resolve(data), (data) => this.reject(data));
  }
  start() {
    const ignoreErr = failSaveExecute;
    const xhrObject = this.xhrObject;
    const sourceForm = mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.byId(this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_SRC_FRM_ID).value);
    try {
      const executes = this.requestContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR, _core_Const__WEBPACK_IMPORTED_MODULE_7__.P_EXECUTE).get(_core_Const__WEBPACK_IMPORTED_MODULE_7__.IDENT_NONE).value.split(/\s+/gi);
      const partialIdsArray = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_PPS).value === true ? executes : [];
      const formData = new _XhrFormData__WEBPACK_IMPORTED_MODULE_3__.XhrFormData(
        sourceForm,
        (0,_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resoveNamingContainerMapper)(this.internalContext),
        executes,
        partialIdsArray
      );
      this.requestContext.$nspEnabled = false;
      const requestContext = this.requestContext;
      const requestPassThroughParams = requestContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_REQ_PASS_THR);
      requestPassThroughParams.$nspEnabled = false;
      try {
        formData.shallowMerge(requestPassThroughParams, true, true);
      } finally {
        this.requestContext.$nspEnabled = true;
        requestPassThroughParams.$nspEnabled = true;
      }
      this.appendIssuingItem(formData);
      this.responseContext = requestPassThroughParams.deepCopy;
      const responseContext = this.responseContext;
      responseContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_MF_INTERNAL).value = this.internalContext.value;
      responseContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.ON_EVENT).value = requestContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.ON_EVENT).value;
      responseContext.assign(_core_Const__WEBPACK_IMPORTED_MODULE_7__.ON_ERROR).value = requestContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.ON_ERROR).value;
      xhrObject.open(this.ajaxType, (0,_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resolveFinalUrl)(sourceForm, formData, this.ajaxType), true);
      if (this.timeout) xhrObject.timeout = this.timeout;
      if (!formData.isMultipartRequest) {
        ignoreErr(() => xhrObject.setRequestHeader(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CONTENT_TYPE, `${this.contentType}; charset=utf-8`));
      }
      ignoreErr(() => xhrObject.setRequestHeader(_core_Const__WEBPACK_IMPORTED_MODULE_7__.HEAD_FACES_REQ, _core_Const__WEBPACK_IMPORTED_MODULE_7__.VAL_AJAX));
      ignoreErr(() => xhrObject.setRequestHeader(_core_Const__WEBPACK_IMPORTED_MODULE_7__.REQ_ACCEPT, _core_Const__WEBPACK_IMPORTED_MODULE_7__.STD_ACCEPT));
      this.sendEvent(_core_Const__WEBPACK_IMPORTED_MODULE_7__.BEGIN);
      this.sendRequest(formData);
    } catch (e) {
      this.handleErrorAndClearQueue(e);
      throw e;
    }
    return this;
  }
  cancel() {
    try {
      this.xhrObject.abort();
    } catch (e) {
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
    this.registerUploadCallbacks(xhrObject);
    xhrObject.onerror = (errorData) => {
      if (this.isCancelledResponse(this.xhrObject)) {
        this.stopProgress = true;
        reject();
        return;
      }
      if (this.stopProgress) {
        return;
      }
      this.handleError(errorData);
    };
  }
  registerUploadCallbacks(xhrObject) {
    var _a, _b;
    if (!(xhrObject == null ? void 0 : xhrObject.upload)) {
      return;
    }
    (_b = (_a = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_PREINIT)).value) == null ? void 0 : _b.call(_a, xhrObject.upload);
    xhrObject.upload.addEventListener("progress", (event) => {
      var _a2, _b2;
      (_b2 = (_a2 = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_ON_PROGRESS)).value) == null ? void 0 : _b2.call(_a2, xhrObject.upload, event);
    });
    xhrObject.upload.addEventListener("load", (event) => {
      var _a2, _b2;
      (_b2 = (_a2 = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_LOAD)).value) == null ? void 0 : _b2.call(_a2, xhrObject.upload, event);
    });
    xhrObject.upload.addEventListener("loadstart", (event) => {
      var _a2, _b2;
      (_b2 = (_a2 = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_LOADSTART)).value) == null ? void 0 : _b2.call(_a2, xhrObject.upload, event);
    });
    xhrObject.upload.addEventListener("loadend", (event) => {
      var _a2, _b2;
      (_b2 = (_a2 = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_LOADEND)).value) == null ? void 0 : _b2.call(_a2, xhrObject.upload, event);
    });
    xhrObject.upload.addEventListener("abort", (event) => {
      var _a2, _b2;
      (_b2 = (_a2 = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_ABORT)).value) == null ? void 0 : _b2.call(_a2, xhrObject.upload, event);
    });
    xhrObject.upload.addEventListener("timeout", (event) => {
      var _a2, _b2;
      (_b2 = (_a2 = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_TIMEOUT)).value) == null ? void 0 : _b2.call(_a2, xhrObject.upload, event);
    });
    xhrObject.upload.addEventListener("error", (event) => {
      var _a2, _b2;
      (_b2 = (_a2 = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_UPLOAD_ERROR)).value) == null ? void 0 : _b2.call(_a2, xhrObject.upload, event);
    });
  }
  isCancelledResponse(currentTarget) {
    return (currentTarget == null ? void 0 : currentTarget.status) === 0 && // cancelled internally by browser
    (currentTarget == null ? void 0 : currentTarget.readyState) === 4 && (currentTarget == null ? void 0 : currentTarget.responseText) === "" && (currentTarget == null ? void 0 : currentTarget.responseXML) === null;
  }
  /*
   * xhr processing callbacks
   *
   * Those methods are the callbacks called by
   * the xhr object depending on its own state
   */
  onAbort(_resolve, reject) {
    this.handleHttpError(reject);
  }
  onTimeout(resolve, _reject) {
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
    if (!this.processRequestErrors(resolve)) {
      (0,_core_Const__WEBPACK_IMPORTED_MODULE_7__.$faces)().ajax.response(this.xhrObject, (_a = this.responseContext.value) != null ? _a : {});
    }
  }
  processRequestErrors(resolve) {
    var _a, _b, _c, _d, _e;
    const responseXML = new mona_dish__WEBPACK_IMPORTED_MODULE_1__.XMLQuery((_a = this.xhrObject) == null ? void 0 : _a.responseXML);
    const responseText = (_c = (_b = this.xhrObject) == null ? void 0 : _b.responseText) != null ? _c : "";
    const responseCode = (_e = (_d = this.xhrObject) == null ? void 0 : _d.status) != null ? _e : -1;
    if (responseCode >= 300 || responseCode < 200) {
      this.handleHttpError(resolve);
      return true;
    }
    if (responseXML.isXMLParserError()) {
      this.handleGenericResponseError(this.ERR_INVALID_RESPONSE, "The response xml is invalid", _core_Const__WEBPACK_IMPORTED_MODULE_7__.MALFORMEDXML, resolve);
      return true;
    } else if (responseXML.isAbsent() && responseText.trim().length > 0) {
      this.handleGenericResponseError(this.ERR_INVALID_RESPONSE, "The response xml is invalid", _core_Const__WEBPACK_IMPORTED_MODULE_7__.MALFORMEDXML, resolve);
      return true;
    } else if (responseXML.isAbsent()) {
      this.handleGenericResponseError(this.ERR_EMPTY_RESPONSE, "The response has provided no data", _core_Const__WEBPACK_IMPORTED_MODULE_7__.EMPTY_RESPONSE, resolve);
      return true;
    }
    return false;
  }
  handleGenericResponseError(errorName, errorMessage, responseStatus, resolve) {
    var _a, _b, _c, _d;
    const errorData = new _ErrorData__WEBPACK_IMPORTED_MODULE_4__.ErrorData(
      this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_SRC_CTL_ID).value,
      errorName,
      errorMessage,
      (_b = (_a = this.xhrObject) == null ? void 0 : _a.responseText) != null ? _b : "",
      (_d = (_c = this.xhrObject) == null ? void 0 : _c.responseXML) != null ? _d : null,
      this.xhrObject.status,
      responseStatus
    );
    this.finalizeError(errorData, resolve);
  }
  handleHttpError(resolveOrReject, errorMessage = "Generic HTTP Error") {
    var _a, _b, _c, _d, _e, _f;
    this.stopProgress = true;
    const errorData = new _ErrorData__WEBPACK_IMPORTED_MODULE_4__.ErrorData(
      this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_SRC_CTL_ID).value,
      _core_Const__WEBPACK_IMPORTED_MODULE_7__.HTTP_ERROR,
      errorMessage,
      (_b = (_a = this.xhrObject) == null ? void 0 : _a.responseText) != null ? _b : "",
      (_d = (_c = this.xhrObject) == null ? void 0 : _c.responseXML) != null ? _d : null,
      (_f = (_e = this.xhrObject) == null ? void 0 : _e.status) != null ? _f : -1,
      _core_Const__WEBPACK_IMPORTED_MODULE_7__.HTTP_ERROR
    );
    this.finalizeError(errorData, resolveOrReject);
  }
  finalizeError(errorData, resolveOrReject) {
    try {
      this.handleError(errorData, true);
    } finally {
      resolveOrReject(errorData);
      this.stopProgress = true;
    }
  }
  onResponseProcessed(data, resolve) {
    if (!this.stopProgress) {
      resolve(data);
    }
  }
  sendRequest(formData) {
    if (this.ajaxType === _core_Const__WEBPACK_IMPORTED_MODULE_7__.REQ_TYPE_GET) {
      this.xhrObject.send(null);
      return;
    }
    this.xhrObject.send(formData.isMultipartRequest ? formData.toFormData() : formData.toString());
  }
  /*
   * other helpers
   */
  sendEvent(evtType) {
    var _a;
    const eventData = _EventData__WEBPACK_IMPORTED_MODULE_5__.EventData.createFromRequest(this.xhrObject, this.internalContext, this.requestContext, evtType);
    try {
      const eventHandler = (0,_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resolveHandlerFunc)(this.requestContext, this.responseContext, _core_Const__WEBPACK_IMPORTED_MODULE_7__.ON_EVENT);
      _AjaxImpl__WEBPACK_IMPORTED_MODULE_2__.Implementation.sendEvent(eventData, eventHandler);
    } catch (e) {
      e.source = (_a = e == null ? void 0 : e.source) != null ? _a : this.requestContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.SOURCE).value;
      this.handleErrorAndClearQueue(e);
      throw e;
    }
  }
  handleErrorAndClearQueue(e, responseFormatError = false) {
    this.handleError(e, responseFormatError);
    this.reject(e);
  }
  handleError(exception, responseFormatError = false) {
    var _a;
    const errorData = responseFormatError ? _ErrorData__WEBPACK_IMPORTED_MODULE_4__.ErrorData.fromHttpConnection(exception.source, exception.type, (_a = exception.message) != null ? _a : _core_Const__WEBPACK_IMPORTED_MODULE_7__.EMPTY_STR, exception.responseText, exception.responseXML, exception.responseCode, exception.status) : _ErrorData__WEBPACK_IMPORTED_MODULE_4__.ErrorData.fromClient(exception);
    const eventHandler = (0,_RequestDataResolver__WEBPACK_IMPORTED_MODULE_8__.resolveHandlerFunc)(this.requestContext, this.responseContext, _core_Const__WEBPACK_IMPORTED_MODULE_7__.ON_ERROR);
    _AjaxImpl__WEBPACK_IMPORTED_MODULE_2__.Implementation.sendError(errorData, eventHandler);
  }
  appendIssuingItem(formData) {
    var _a, _b;
    const issuingItemId = this.internalContext.getIf(_core_Const__WEBPACK_IMPORTED_MODULE_7__.CTX_PARAM_SRC_CTL_ID).value;
    const eventType = (_b = (_a = formData.getIf((0,_core_Const__WEBPACK_IMPORTED_MODULE_7__.$nsp)(_core_Const__WEBPACK_IMPORTED_MODULE_7__.P_BEHAVIOR_EVENT)).value) == null ? void 0 : _a[0]) != null ? _b : null;
    const isBehaviorEvent = !!eventType && eventType !== "click";
    if (issuingItemId && formData.getIf(issuingItemId).isAbsent() && !isBehaviorEvent) {
      const issuingItem = mona_dish__WEBPACK_IMPORTED_MODULE_1__.DQ.byId(issuingItemId);
      const itemValue = issuingItem.inputValue;
      const arr = new _util_ExtDomQuery__WEBPACK_IMPORTED_MODULE_9__.ExtConfig({});
      const type = issuingItem.type.orElse("").value.toLowerCase();
      const isCheckable = type === _XhrRequest.TYPE_CHECKBOX || type === _XhrRequest.TYPE_RADIO;
      if (isCheckable && !issuingItem.checked) {
        return;
      } else if (isCheckable) {
        arr.assign(issuingItemId).value = itemValue.orElse(true).value;
      } else if (itemValue.isPresent()) {
        arr.assign(issuingItemId).value = itemValue.value;
      }
      formData.shallowMerge(arr, true, true);
    }
  }
};
_XhrRequest.TYPE_CHECKBOX = "checkbox";
_XhrRequest.TYPE_RADIO = "radio";
let XhrRequest = _XhrRequest;


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


var oam;
((oam2) => {
  const ofAssoc = _impl_util_Lang__WEBPACK_IMPORTED_MODULE_1__.ExtLang.ofAssoc;
  oam2.setHiddenInput = function(formName, name, value) {
    const forms = document.forms;
    mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId(forms[formName]).each((form) => {
      const input = form.querySelectorAll(`input[type='hidden'][name='${name}']`);
      if (input.isPresent()) {
        input.inputValue.value = value;
      } else {
        const newInput = mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.fromMarkup(`<input type='hidden' id='${name}' name='${name}'>`);
        newInput.inputValue.value = value;
        newInput.appendTo(form);
      }
    });
  };
  oam2.clearHiddenInput = function(formName, name) {
    var _a;
    const forms = document.forms;
    const elements = (_a = forms == null ? void 0 : forms[formName]) == null ? void 0 : _a.elements;
    let element = elements == null ? void 0 : elements[name];
    if (!element) {
      return;
    }
    mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId(element).delete();
  };
  oam2.submitForm = function(formName, linkId = null, target = null, params = {}) {
    var _a, _b, _c, _d, _e;
    params = !params ? {} : params;
    let clearFn = "clearFormHiddenParams_" + formName.replace(/-/g, "$:").replace(/:/g, "_");
    (_a = window == null ? void 0 : window[clearFn]) == null ? void 0 : _a.call(window, formName);
    if (((_d = (_c = (_b = window == null ? void 0 : window.myfaces) == null ? void 0 : _b.core) == null ? void 0 : _c.config) == null ? void 0 : _d.autoScroll) && (window == null ? void 0 : window.getScrolling)) {
      myfaces.oam.setHiddenInput(formName, "autoScroll", window == null ? void 0 : window.getScrolling());
    }
    let paramsStream = Array.isArray(params) ? [...params] : ofAssoc(params);
    paramsStream.forEach(([key, data]) => myfaces.oam.setHiddenInput(formName, key, data));
    myfaces.oam.setHiddenInput(formName, `${formName}:_idcl`, linkId != null ? linkId : "");
    const forms = document.forms;
    mona_dish__WEBPACK_IMPORTED_MODULE_0__.DQ.byId((_e = forms == null ? void 0 : forms[formName]) != null ? _e : document.getElementById(formName)).each((form) => {
      var _a2;
      const ATTR_TARGET = "target";
      const formElement = form.getAsElem(0).value;
      const oldTarget = form.getAsElem(0).value.getAttribute("target");
      if (target != "null" && target) {
        form.getAsElem(0).value.setAttribute("target", target);
      }
      const result = (_a2 = formElement == null ? void 0 : formElement.onsubmit) == null ? void 0 : _a2.call(formElement, null);
      try {
        if (!!result || "undefined" == typeof result) {
          formElement.submit();
        }
      } catch (e) {
        window == null ? void 0 : window.console.error(e);
      } finally {
        if (oldTarget == null || oldTarget == "null") {
          form.getAsElem(0).value.removeAttribute("target");
        } else {
          form.getAsElem(0).value.setAttribute("target", oldTarget);
        }
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
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
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
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
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
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************************************!*\
  !*** ./src/main/typescript/api/jsf.ts ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   jsf: () => (/* binding */ jsf),
/* harmony export */   myfaces: () => (/* binding */ myfaces)
/* harmony export */ });

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
if (!(window == null ? void 0 : window.jsf)) {
  const myfacesApi = (__webpack_require__(/*! ./_api */ "./src/main/typescript/api/_api.ts").faces);
  window["jsf"] = (_a = window == null ? void 0 : window.jsf) != null ? _a : __spreadProps(__spreadValues({}, myfacesApi), { push: __spreadValues({}, myfacesApi.push) });
  window.jsf.specversion = 23e4;
  delete window.jsf.contextpath;
  window.jsf.push.init = (socketClientId, url, channel, onopen, onmessage, onclose, behaviors, autoConnect) => {
    myfacesApi.push.init(socketClientId, url, channel, onopen, onmessage, null, onclose, behaviors, autoConnect);
  };
}
if (!((_b = window == null ? void 0 : window.myfaces) == null ? void 0 : _b.ab)) {
  const myfaces2 = (__webpack_require__(/*! ./_api */ "./src/main/typescript/api/_api.ts").myfaces);
  window["myfaces"] = (_c = window == null ? void 0 : window.myfaces) != null ? _c : {};
  Object.keys(myfaces2).forEach((key) => {
    var _a2, _b2;
    return window.myfaces[key] = (_b2 = (_a2 = window.myfaces) == null ? void 0 : _a2[key]) != null ? _b2 : myfaces2[key];
  });
}
var jsf = window.jsf;
var myfaces = window.myfaces;

})();

const __webpack_export_target__ = window;
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=jsf-development.js.map
//# sourceMappingURL=jsf-development.js.map.jsf?ln=javax.faces