/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/mona-dish/dist/js/commonjs/index_core.js":
/*!***************************************************************!*\
  !*** ./node_modules/mona-dish/dist/js/commonjs/index_core.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

!function(){"use strict";var e={447:function(e,t,r){r.r(t),r.d(t,{append:function(){return i},appendIf:function(){return a},assign:function(){return s},assignIf:function(){return o},buildPath:function(){return v},deepCopy:function(){return p},resolve:function(){return u},shallowMerge:function(){return m},simpleShallowMerge:function(){return g}});var n=r(484);class l{constructor(e){this.parent=e}set value(e){}get value(){return this.parent}}function s(e,...t){if(t.length<1)return new l(e);const r=v(e,...t);return new class{set value(e){r.target[r.key]=e}get value(){return r.target[r.key]}}}function i(e,...t){if(t.length<1)return new l(e);const r=v(e,...t);return new class{set value(e){Array.isArray(e)||(e=[e]),r.target[r.key]?(Array.isArray(r.target[r.key])||(r.target[r.key]=[r.target[r.key]]),r.target[r.key].push(...e)):r.target[r.key]=e}}}function o(e,t,...r){return!e||r.length<1?new l(t):s(t,...r)}function a(e,t,...r){return!e||r.length<1?new l(t):i(t,...r)}function u(e,...t){let r=null;t=f(t);let n=e;for(let e=0;e<t.length;e++){let l=t[e];if(l=-1!=c(l)?c(l):l,n=null==n?void 0:n[l],void 0===n)return null;r=n}return n}function h(e){let t=e.indexOf("[");return t>=0?e.substring(0,t):e}function c(e){let t=e.indexOf("["),r=e.indexOf("]");return t>=0&&r>0&&t<r?parseInt(e.substring(t+1,r)):-1}function d(e,t,r={}){let n=[];n.length=t,n[t-1]=r,e.push(...n)}function f(e){return new n.Es2019Array(...e).flatMap((e=>e.split("["))).map((e=>-1!=e.indexOf("]")?"["+e:e)).filter((e=>""!=e))}function v(e,...t){t=f(t);let r=e,n=null,l=null,s=-1;for(let e=0;e<t.length;e++)if(l=h(t[e]),s=c(t[e]),-1!=s){if(!Array.isArray(r))throw Error("Associative array referenced as index array in path reference");let l=-1;e<t.length-1&&(l=c(t[e+1]));let i=void 0!==(null==r?void 0:r[s]);d(r,s+1,-1!=l?[]:{}),n=s,e==t.length-1?r[s]=i?r[s]:null:r=r[s]}else{if(Array.isArray(r))throw Error("Index array referenced as associative array in path reference");let s=-1;e<t.length-1&&(s=c(t[e+1])),n=l;let i=void 0!==(null==r?void 0:r[l]);e==t.length-1?i||(r[l]=null):(i||(r[l]=-1==s?{}:[]),r=r[l])}return{target:r,key:n}}function p(e){return JSON.parse(JSON.stringify(e))}function g(...e){return m(!0,!1,...e)}function m(e=!0,t=!1,...r){let l={};return new n.Es2019Array(...r).map((e=>({arr:e,keys:Object.keys(e)}))).forEach((({arr:r,keys:s})=>{s.forEach((s=>{let i=r[s];if(!Array.isArray(i)&&t&&(i=new n.Es2019Array(...[i])),e||!(null==l?void 0:l[s]))if(t)if(void 0===(null==l?void 0:l[s]))l[s]=i;else if(Array.isArray(l[s]))l[s].push(...i);else{let e=l[s];l[s]=new n.Es2019Array(...[]),l[s].push(e),l[s].push(...i)}else l[s]=r[s]}))})),l}},549:function(e,t,r){r.d(t,{De:function(){return c},ac:function(){return u},ko:function(){return h}});var n=r(484),l=r(152),s=r(805),i=r(447),o=s.Lang.objAssign;class a extends l.ValueEmbedder{constructor(e,t,r){super(e,t),this.arrPos=null!=r?r:-1}get value(){return""==this.key&&this.arrPos>=0?this._value[this.arrPos]:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]:this._value[this.key]}set value(e){""==this.key&&this.arrPos>=0?this._value[this.arrPos]=e:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]=e:this._value[this.key]=e}}a.absent=a.fromNullable(null);const u="__END_POINT__",h="__ANY_POINT__";class c extends l.Optional{constructor(e,t){super(e),this.configDef=t}get shallowCopy(){return this.shallowCopy$()}shallowCopy$(){let e=new c({});return e.shallowMerge(this.value),e}get deepCopy(){return this.deepCopy$()}deepCopy$(){return new c(o({},this.value))}static fromNullable(e){return new c(e)}shallowMerge(e,t=!0,r=!1){let n=(0,i.shallowMerge)(t,r,this.value,e.value);Array.isArray(this._value)?(this._value.length=0,this._value.push(...n)):(Object.getOwnPropertyNames(this._value).forEach((e=>delete this._value[e])),Object.getOwnPropertyNames(n).forEach((e=>this._value[e]=n[e])))}append(...e){return(0,i.append)(this._value,...e)}appendIf(e,...t){return(0,i.appendIf)(e,this._value,...t)}assign(...e){return(0,i.assign)(this.value,...e)}assignIf(e,...t){return(0,i.assignIf)(e,this._value,...t)}getIf(...e){return this.assertAccessPath(...e),this.getClass().fromNullable((0,i.resolve)(this.value,...e))}get(e){return this.getClass().fromNullable(super.get(e).value)}delete(e){return e in this.value&&delete this.value[e],this}toJson(){return JSON.stringify(this.value)}getClass(){return c}setVal(e){this._value=e}assertAccessPath(...e){var t,r,s,i,o,a,u,c,d;if(e=this.preprocessKeys(...e),!this.configDef)return;let f=l.Optional.fromNullable(Object.keys(this.configDef).map((e=>{let t={};return t[e]=this.configDef[e],t})));for(let v=0;v<e.length;v++){let p=this.keyVal(e[v]),g=this.arrayIndex(e[v]);if(f=this.isArray(g)?""!=p?Array.isArray(f.value)?l.Optional.fromNullable(null===(r=null===(t=new n.Es2019Array(...f.value).find((e=>{var t;return!(null===(t=null==e?void 0:e[p])||void 0===t||!t)})))||void 0===t?void 0:t[p])||void 0===r?void 0:r[g]):l.Optional.fromNullable(null!==(o=null===(i=null===(s=f.value)||void 0===s?void 0:s[p])||void 0===i?void 0:i[g])&&void 0!==o?o:null):Array.isArray(f.value)?l.Optional.fromNullable(null===(a=f.value)||void 0===a?void 0:a[g]):l.Optional.absent:Array.isArray(f.value)?l.Optional.fromNullable(null===(u=new n.Es2019Array(...f.value).find((e=>{var t;return!(null===(t=null==e?void 0:e[p])||void 0===t||!t)})))||void 0===u?void 0:u[p]):l.Optional.fromNullable(null!==(d=null===(c=f.value)||void 0===c?void 0:c[p])&&void 0!==d?d:null),!f.isPresent())throw Error("Access Path to config invalid");if(f.value==h)return}}isNoArray(e){return-1==e}isArray(e){return!this.isNoArray(e)}}},585:function(e,t,r){r.d(t,{DQ:function(){return w},DQ$:function(){return E},DomQuery:function(){return y},DomQueryCollector:function(){return b},ElementAttribute:function(){return p}});var n,l=r(152),s=r(255),i=r(805),o=r(456),a=r(484),u=r(447),h=function(e,t,r,n){return new(r||(r=Promise))((function(l,s){function i(e){try{a(n.next(e))}catch(e){s(e)}}function o(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?l(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,o)}a((n=n.apply(e,t||[])).next())}))},c=i.Lang.trim,d=i.Lang.isString,f=i.Lang.equalsIgnoreCase,v=i.Lang.objToArray;!function(e){e.SELECT="select",e.BUTTON="button",e.SUBMIT="submit",e.RESET="reset",e.IMAGE="image",e.RADIO="radio",e.CHECKBOX="checkbox"}(n||(n={}));class p extends l.ValueEmbedder{constructor(e,t,r=null){super(e,t),this.element=e,this.name=t,this.defaultVal=r}get value(){let e=this.element.get(0).orElse().values;return e.length?e[0].getAttribute(this.name):this.defaultVal}set value(e){let t=this.element.get(0).orElse().values;for(let r=0;r<t.length;r++)t[r].setAttribute(this.name,e);t[0].setAttribute(this.name,e)}getClass(){return p}static fromNullable(e,t="value"){return new p(e,t)}}class g extends l.ValueEmbedder{constructor(e,t,r=null){super(e,t),this.element=e,this.name=t,this.defaultVal=r}get value(){let e=this.element.values;return e.length?e[0].style[this.name]:this.defaultVal}set value(e){let t=this.element.values;for(let r=0;r<t.length;r++)t[r].style[this.name]=e}getClass(){return p}static fromNullable(e,t="value"){return new p(e,t)}}const m=()=>!0;class y{constructor(...e){if(this.rootNode=[],this.pos=-1,this._limits=-1,!l.Optional.fromNullable(e).isAbsent()&&e.length)for(let t=0;t<e.length;t++)if(e[t])if(d(e[t])){let r=y.querySelectorAll(e[t]);r.isAbsent()||e.push(...r.values)}else e[t]instanceof y?this.rootNode.push(...e[t].values):this.rootNode.push(e[t]);else;}get value(){return this.getAsElem(0)}get values(){return this.allElems()}get global(){return o.R}get stream(){throw Error("Not implemented, include Stream.ts for this to work")}get lazyStream(){throw Error("Not implemented, include Stream.ts for this to work")}get id(){return new p(this.get(0),"id")}get length(){return this.rootNode.length}get tagName(){return this.getAsElem(0).getIf("tagName")}get nodeName(){return this.getAsElem(0).getIf("nodeName")}isTag(e){return!this.isAbsent()&&(this.nodeName.orElse("__none___").value.toLowerCase()==e.toLowerCase()||this.tagName.orElse("__none___").value.toLowerCase()==e.toLowerCase())}get type(){return this.getAsElem(0).getIf("type")}get name(){return new l.ValueEmbedder(this.getAsElem(0).value,"name")}get inputValue(){return this.getAsElem(0).getIf("value").isPresent()?new l.ValueEmbedder(this.getAsElem(0).value):l.ValueEmbedder.absent}get val(){return this.inputValue.value}set val(e){this.inputValue.value=e}get nodeId(){return this.id.value}set nodeId(e){this.id.value=e}get checked(){return new a.Es2019Array(...this.values).every((e=>!!e.checked))}set checked(e){this.eachElem((t=>t.checked=e))}get elements(){return this.querySelectorAll("input, checkbox, select, textarea, fieldset")}get deepElements(){return this.querySelectorAllDeep("input, select, textarea, checkbox, fieldset")}querySelectorAllDeep(e){let t=[],r=this.querySelectorAll(e);r.length&&t.push(r);let n=this.querySelectorAll("*").shadowRoot;if(n.length){let r=n.querySelectorAllDeep(e);r.length&&t.push(r)}return new y(...t)}get disabled(){return this.attr("disabled").isPresent()}set disabled(e){e?this.attr("disabled").value="disabled":this.removeAttribute("disabled")}removeAttribute(e){this.eachElem((t=>t.removeAttribute(e)))}get childNodes(){let e=[];return this.eachElem((t=>{e=e.concat(v(t.childNodes))})),new y(...e)}get asArray(){return new a.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>y.byId(e)))}get offsetWidth(){return new a.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>e.offsetWidth)).reduce(((e,t)=>e+t),0)}get offsetHeight(){return new a.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>e.offsetHeight)).reduce(((e,t)=>e+t),0)}get offsetLeft(){return new a.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>e.offsetLeft)).reduce(((e,t)=>e+t),0)}get offsetTop(){return new a.Es2019Array(this.rootNode).filter((e=>null!=e)).map((e=>e.offsetTop)).reduce(((e,t)=>e+t),0)}get asNodeArray(){return new a.Es2019Array(...this.rootNode.filter((e=>null!=e)))}static querySelectorAllDeep(e){return new y(document).querySelectorAllDeep(e)}static querySelectorAll(e){return-1!=e.indexOf("/shadow/")?new y(document)._querySelectorAllDeep(e):new y(document)._querySelectorAll(e)}static byId(e,t=!1){return d(e)?t?new y(document).byIdDeep(e):new y(document).byId(e):new y(e)}static byTagName(e){return d(e)?new y(document).byTagName(e):new y(e)}static globalEval(e,t){return new y(document).globalEval(e,t)}static globalEvalSticky(e,t){return new y(document).globalEvalSticky(e,t)}static fromMarkup(e){const t=document.implementation.createHTMLDocument("");let r=(e=c(e)).toLowerCase();if(-1!=r.search(/<!doctype[^\w\-]+/gi)||-1!=r.search(/<html[^\w\-]+/gi)||-1!=r.search(/<head[^\w\-]+/gi)||-1!=r.search(/<body[^\w\-]+/gi))return t.documentElement.innerHTML=e,new y(t.documentElement);{let t=function(e,t){let r=["<",t,">"].join(""),n=["<",t," "].join("");return 0==e.indexOf(r)||0==e.indexOf(n)},n=new y(document.createElement("div"));return t(r,"thead")||t(r,"tbody")?(n.html(`<table>${e}</table>`),n.querySelectorAll("table").get(0).childNodes.detach()):t(r,"tfoot")?(n.html(`<table><thead></thead><tbody><tbody${e}</table>`),n.querySelectorAll("table").get(2).childNodes.detach()):t(r,"tr")?(n.html(`<table><tbody>${e}</tbody></table>`),n.querySelectorAll("tbody").get(0).childNodes.detach()):t(r,"td")?(n.html(`<table><tbody><tr>${e}</tr></tbody></table>`),n.querySelectorAll("tr").get(0).childNodes.detach()):(n.html(e),n.childNodes.detach())}}get(e){return e<this.rootNode.length?new y(this.rootNode[e]):y.absent}getAsElem(e,t=l.Optional.absent){return e<this.rootNode.length?l.Optional.fromNullable(this.rootNode[e]):t}filesFromElem(e){var t;return e<this.rootNode.length&&(null===(t=this.rootNode[e])||void 0===t?void 0:t.files)?this.rootNode[e].files:[]}allElems(){return this.rootNode}isAbsent(){return 0==this.length}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=function(){}){return this.isPresent.call(this,e),this}delete(){this.eachElem((e=>{e.parentNode&&e.parentNode.removeChild(e)}))}querySelectorAll(e){return-1!=e.indexOf("/shadow/")?this._querySelectorAllDeep(e):this._querySelectorAll(e)}closest(e){return-1!=e.indexOf("/shadow/")?this._closestDeep(e):this._closest(e)}byId(e,t){let r=[];return t&&(r=r.concat(...new a.Es2019Array(...(null==this?void 0:this.rootNode)||[]).filter((t=>e==t.id)).map((e=>new y(e))))),r=r.concat(this.querySelectorAll(`[id="${e}"]`)),new y(...r)}byIdDeep(e,t){let r=[];t&&(r=r.concat(new a.Es2019Array(...(null==this?void 0:this.rootNode)||[]).filter((t=>e==t.id)).map((e=>new y(e)))));let n=this.querySelectorAllDeep(`[id="${e}"]`);return n.length&&r.push(n),new y(...r)}byTagName(e,t,r){var n;let l=[];return t&&(l=new a.Es2019Array(...null!==(n=null==this?void 0:this.rootNode)&&void 0!==n?n:[]).filter((t=>(null==t?void 0:t.tagName)==e)).reduce(((e,t)=>e.concat([t])),l)),r?l.push(this.querySelectorAllDeep(e)):l.push(this.querySelectorAll(e)),new y(...l)}attr(e,t=null){return new p(this,e,t)}style(e,t=null){return new g(this,e,t)}hasClass(e){let t=!1;return this.eachElem((r=>{if(t=r.classList.contains(e),t)return!1})),t}addClass(e){return this.eachElem((t=>t.classList.add(e))),this}removeClass(e){return this.eachElem((t=>t.classList.remove(e))),this}isMultipartCandidate(e=!1){const t="input[type='file']";return this.matchesSelector(t)||(e?this.querySelectorAllDeep(t):this.querySelectorAll(t)).first().isPresent()}html(e){return l.Optional.fromNullable(e).isAbsent()?this.isPresent()?l.Optional.fromNullable(this.innerHTML):l.Optional.absent:(this.innerHTML=e,this)}dispatchEvent(e){return this.eachElem((t=>t.dispatchEvent(e))),this}set innerHTML(e){this.eachElem((t=>t.innerHTML=e))}get innerHTML(){let e=[];return this.eachElem((t=>e.push(t.innerHTML))),e.join("")}set innerHtml(e){this.innerHTML=e}get innerHtml(){return this.innerHTML}filterSelector(e){let t=[];return this.eachElem((r=>{this._mozMatchesSelector(r,e)&&t.push(r)})),new y(...t)}matchesSelector(e){return this.asArray.some((t=>this._mozMatchesSelector(t.getAsElem(0).value,e)))}getIf(...e){let t=this.childNodes;for(let r=0;r<e.length;r++)if(t=t.filterSelector(e[r]),t.isAbsent())return t;return t}eachElem(e){for(let t=0,r=this.rootNode.length;t<r&&!1!==e(this.rootNode[t],t);t++);return this}firstElem(e=(e=>e)){return this.rootNode.length>1&&e(this.rootNode[0],0),this}lastElem(e=(e=>e)){return this.rootNode.length>1&&e(this.rootNode[this.rootNode.length-1],0),this}each(e){return new a.Es2019Array(...this.rootNode).forEach(((t,r)=>{if(null!=t)return e(y.byId(t),r)})),this}replace(e){return this.each((t=>{let r=t.getAsElem(0).value,n=r.parentElement,l=r.nextElementSibling,s=r.previousElementSibling;null!=l?new y(l).insertBefore(e):s?new y(s).insertAfter(e):new y(n).append(e),t.delete()})),e}first(e=(e=>e)){return this.rootNode.length>=1?(e(this.get(0),0),this.get(0)):this}last(e=(e=>e)){if(this.rootNode.length>=1){let t=this.get(this.rootNode.length-1);return e(t,0),t}return this}filter(e){let t=[];return this.each((r=>{e(r)&&t.push(r)})),new y(...t)}globalEval(e,t){var r,n,l;const s=null!==(n=null===(r=document.getElementsByTagName("head"))||void 0===r?void 0:r[0])&&void 0!==n?n:null===(l=document.documentElement.getElementsByTagName("head"))||void 0===l?void 0:l[0],i=document.createElement("script");t&&(void 0!==(null==i?void 0:i.nonce)?i.nonce=t:i.setAttribute("nonce",t)),i.type="text/javascript",i.innerHTML=e;let o=s.appendChild(i);return s.removeChild(o),this}globalEvalSticky(e,t){let r=document.getElementsByTagName("head")[0]||document.documentElement,n=document.createElement("script");return this.applyNonce(t,n),n.type="text/javascript",n.innerHTML=e,r.appendChild(n),this}detach(){return this.eachElem((e=>{e.parentNode.removeChild(e)})),this}appendTo(e){return i.Lang.isString(e)?(this.appendTo(y.querySelectorAll(e)),this):(this.eachElem((t=>{e.getAsElem(0).orElseLazy((()=>({appendChild:()=>{}}))).value.appendChild(t)})),this)}loadScriptEval(e,t=0,r){return this._loadScriptEval(!1,e,t,r),this}loadScriptEvalSticky(e,t=0,r){return this._loadScriptEval(!0,e,t,r),this}insertAfter(...e){this.each((t=>{let r=t.getAsElem(0).value,n=r.parentNode;for(let t=0;t<e.length;t++){let l=r.nextSibling;e[t].eachElem((e=>{l?(n.insertBefore(e,l),r=l):n.appendChild(e)}))}}));let t=[];return t.push(this),t=t.concat(e),new y(...t)}insertBefore(...e){this.each((t=>{let r=t.getAsElem(0).value,n=r.parentNode;for(let t=0;t<e.length;t++)e[t].eachElem((e=>{n.insertBefore(e,r)}))}));let t=[];return t.push(this),t=t.concat(e),new y(...t)}orElse(...e){return this.isPresent()?this:new y(...e)}orElseLazy(e){return this.isPresent()?this:new y(e())}allParents(e){let t=this.parent(),r=[];for(;t.isPresent();)t.matchesSelector(e)&&r.push(t),t=t.parent();return new y(...r)}firstParent(e){let t=this.parent();for(;t.isPresent();){if(t.matchesSelector(e))return t;t=t.parent()}return y.absent}parentsWhileMatch(e){const t=[];let r=this.parent().filter((t=>t.matchesSelector(e)));for(;r.isPresent();)t.push(r),r=r.parent().filter((t=>t.matchesSelector(e)));return new y(...t)}parent(){let e=[];return this.eachElem((t=>{let r=t.parentNode||t.host||t.shadowRoot;r&&-1==e.indexOf(r)&&e.push(r)})),new y(...e)}copyAttrs(e){return e.eachElem((e=>{let t=v(e.attributes);for(let e of t){let t=e.value,r=e.name;switch(r){case"id":this.id.value=t;break;case"disabled":this.resolveAttributeHolder("disabled").disabled=t;break;case"checked":this.resolveAttributeHolder("checked").checked=t;break;default:this.attr(r).value=t}}})),this}outerHTML(e,t,r,n=!1){var l;if(this.isAbsent())return;let s=null===(l=null===document||void 0===document?void 0:document.activeElement)||void 0===l?void 0:l.id,i=s?y.getCaretPosition(document.activeElement):null,o=y.fromMarkup(e),a=[],u=this.getAsElem(0).value,h=o.get(0),c=u.parentNode,d=h.getAsElem(0).value;if(c.replaceChild(d,u),a.push(new y(d)),this.isAbsent())return this;let f=[];o.length>1&&(f=f.concat(...o.values.slice(1)),a.push(y.byId(d).insertAfter(new y(...f)))),t&&this.runScripts(),r&&this.runCss();let v=y.byId(s);return s&&v.isPresent()&&null!=i&&void 0!==i&&v.eachElem((e=>y.setCaretPosition(e,i))),o}runScripts(e=!1,t=m){const r=t=>{if(t.length){let r=[];new a.Es2019Array(...t).forEach((t=>{t.nonce?(r.length&&(this.globalEval(r.join("\n")),r.length=0),e?this.globalEvalSticky(t.evalText,t.nonce):this.globalEval(t.evalText,t.nonce)):r.push(t.evalText)})),r.length&&(e?this.globalEvalSticky(r.join("\n")):this.globalEval(r.join("\n")),r.length=0),t=[]}return t};let n=[],l=["","script","text/javascript","text/ecmascript","ecmascript"],s=s=>{var i,o,a,u;let h=s.tagName,d=(null!==(i=null==s?void 0:s.type)&&void 0!==i?i:"").toLowerCase();if(h&&f(h,"script")&&-1!=l.indexOf(d)){let l=s.getAttribute("src");if(void 0!==l&&null!=l&&l.length>0){let i=null!==(o=null==s?void 0:s.nonce)&&void 0!==o?o:s.getAttribute("nonce").value;t(l)&&(n=r(n),e?i?this.loadScriptEvalSticky(l,0,i):this.loadScriptEvalSticky(l,0):i?this.loadScriptEval(l,0,i):this.loadScriptEval(l,0))}else{let e=c(s.text||s.innerText||s.innerHTML),t=!0;for(;t;)t=!1,"\x3c!--"==e.substring(0,4)&&(e=e.substring(4),t=!0),"//\x3c!--"==e.substring(0,4)&&(e=e.substring(6),t=!0),"//<![CDATA["==e.substring(0,11)&&(e=e.substring(11),t=!0);let r=null!==(u=null!==(a=null==s?void 0:s.nonce)&&void 0!==a?a:s.getAttribute("nonce").value)&&void 0!==u?u:"";n.push({nonce:r,evalText:e})}}};try{new y(this.filterSelector("script"),this.querySelectorAll("script")).asArray.flatMap((e=>[...e.values])).sort(((e,t)=>e.compareDocumentPosition(t)-3)).forEach((e=>s(e))),r(n)}catch(e){console&&console.error&&console.error(e.message||e.description)}finally{s=null}return this}runCss(){return new y(this.filterSelector("link, style"),this.querySelectorAll("link, style")).asArray.flatMap((e=>[...e.values])).sort(((e,t)=>e.compareDocumentPosition(t)-3)).forEach((e=>(e=>{const t=y.byId(e),r=t.tagName.orElse("").value;let n=y.fromMarkup(`<${r.toLowerCase()} />`);n=n.copyAttrs(t),n.innerHTML=e.innerHTML,t.replace(n)})(e))),this}click(){return this.fireEvent("click"),this}addEventListener(e,t,r){return this.eachElem((n=>n.addEventListener(e,t,r))),this}removeEventListener(e,t,r){return this.eachElem((n=>n.removeEventListener(e,t,r))),this}fireEvent(e,t={}){let r={bubbles:!0,cancelable:!0};r=(0,u.simpleShallowMerge)(r,t),this.eachElem((t=>{let n;if(t.ownerDocument)n=t.ownerDocument;else{if(9!=t.nodeType)throw new Error("Invalid node passed to fireEvent: "+t.id);n=t}if(t.dispatchEvent){let n=Event;switch(e){case"click":case"mousedown":case"mouseup":case"mousemove":n=this.global().MouseEvent;break;case"keyup":case"keydown":case"keypress":n=this.global().KeyboardEvent;break;case"focus":case"change":case"blur":case"select":break;default:throw"fireEvent: Couldn't find an event class for event '"+e+"'."}let l=new n(e,r);l.synthetic=!0,t.dispatchEvent(l)}else if(t.fireEvent){let l=n.createEventObject();l.synthetic=!0,Object.keys(r).forEach((e=>l[e]=r[e])),t.fireEvent("on"+e,l)}}))}textContent(e=""){return this.asArray.map((e=>e.getAsElem(0).orElseLazy((()=>({textContent:""}))).value.textContent||"")).reduce(((t,r)=>[t,e,r].join("")),"")}innerText(e=""){return this.asArray.map((e=>e.getAsElem(0).orElseLazy((()=>({innerText:""}))).value.innerText||"")).reduce(((t,r)=>[t,r].join(e)),"")}encodeFormElement(e={}){if(this.name.isAbsent())return;let t=(0,u.simpleShallowMerge)(e);return this.each((e=>{var r,l;if(e.name.isAbsent())return;let s=e.name.value,i=e.tagName.orElse("__none__").value.toLowerCase(),o=e.type.orElse("__none__").value.toLowerCase();if(o=o.toLowerCase(),("input"==i||"textarea"==i||"select"==i)&&null!=s&&""!=s&&!e.disabled){if("select"==i){let r=e.getAsElem(0).value;if(r.selectedIndex>=0){let e=r.options.length;for(let n=0;n<e;n++)if(r.options[n].selected){let e=r.options[n];(0,u.append)(t,s).value=null!=e.getAttribute("value")?e.value:e.text}}}if(i!=n.SELECT&&o!=n.BUTTON&&o!=n.RESET&&o!=n.SUBMIT&&o!=n.IMAGE&&(o!=n.CHECKBOX&&o!=n.RADIO||e.checked)){let n=null===(l=null===(r=e.value)||void 0===r?void 0:r.value)||void 0===l?void 0:l.files,i=null!=n?n:[];if(null==i?void 0:i.length)(0,u.assign)(t,s).value=Array.from(i);else{if(n)return;(0,u.append)(t,s).value=e.inputValue.value}}}})),t}get cDATAAsString(){return this.asArray.flatMap((e=>e.childNodes.asArray)).filter((e=>{var t,r;return 4==(null===(r=null===(t=null==e?void 0:e.value)||void 0===t?void 0:t.value)||void 0===r?void 0:r.nodeType)})).reduce(((e,t)=>{var r,n,l;return e.push(null!==(l=null===(n=null===(r=null==t?void 0:t.value)||void 0===r?void 0:r.value)||void 0===n?void 0:n.data)&&void 0!==l?l:""),e}),[]).join("")}subNodes(e,t){return l.Optional.fromNullable(t).isAbsent()&&(t=this.length),new y(...this.rootNode.slice(e,Math.min(t,this.length)))}limits(e){return this._limits=e,this}hasNext(){let e=-1!=this._limits&&this.pos>=this._limits-1,t=this.pos>=this.values.length-1;return!(e||t)}next(){return this.hasNext()?(this.pos++,new y(this.values[this.pos])):null}lookAhead(e=1){return this.values.length-1<this.pos+e?s.dD.EO_STRM:new y(this.values[this.pos+e])}current(){return-1==this.pos?s.dD.BEF_STRM:new y(this.values[this.pos])}reset(){this.pos=-1}attachShadow(e={mode:"open"}){let t=[];return this.eachElem((r=>{let n;if(!(null==r?void 0:r.attachShadow))throw new Error("Shadow dom creation not supported by the browser, please use a shim, to gain this functionality");n=y.byId(r.attachShadow(e)),t.push(n)})),new y(...t)}waitUntilDom(e,t={attributes:!0,childList:!0,subtree:!0,timeout:500,interval:100}){return h(this,void 0,void 0,(function*(){return function(e,t,r={attributes:!0,childList:!0,subtree:!0,timeout:500,interval:100}){return new Promise(((n,l)=>{let s=null;const i=new Error("Mutation observer timeout");function o(e,t){let n=null;return t(e)?e:(n=r.childList?t(e)?e:e.childNodes.filter((e=>t(e))).first().value.value:r.subtree?t(e)?e:e.querySelectorAll(" * ").filter((e=>t(e))).first().value.value:t(e)?e:null,n)}let a=e;if(a=o(a,t))n(new y(a));else if("undefined"!=typeof MutationObserver){const o=setTimeout((()=>(s.disconnect(),l(i))),r.timeout),a=r=>{const l=new y(r.map((e=>e.target))).filter((e=>t(e))).first();l.isPresent()&&(clearTimeout(o),s.disconnect(),n(new y(l||e)))};s=new MutationObserver(a);let u=Object.assign({},r);delete u.timeout,e.eachElem((e=>{s.observe(e,u)}))}else{let s=setInterval((()=>{let r=o(e,t);r&&(a&&(clearTimeout(a),clearInterval(s),s=null),n(new y(r||e)))}),r.interval),a=setTimeout((()=>{s&&(clearInterval(s),l(i))}),r.timeout)}}))}(this,e,t)}))}get shadowElements(){let e=(this.querySelectorAll("*").filter((e=>e.hasShadow)).allElems()||[]).map((e=>e.shadowRoot));return new y(...e)}get shadowRoot(){let e=[];for(let t=0;t<this.rootNode.length;t++)this.rootNode[t].shadowRoot&&e.push(this.rootNode[t].shadowRoot);return new y(...e)}get hasShadow(){for(let e=0;e<this.rootNode.length;e++)if(this.rootNode[e].shadowRoot)return!0;return!1}static getCaretPosition(e){let t=0;try{if(null===document||void 0===document?void 0:document.selection){e.focus();let r=document.selection.createRange();r.moveStart("character",-e.value.length),t=r.text.length}}catch(e){}return t}static setCaretPosition(e,t){(null==e?void 0:e.focus)&&(null==e||e.focus()),(null==e?void 0:e.setSelectiongRange)&&(null==e||e.setSelectiongRange(t,t))}[Symbol.iterator](){return{next:()=>({done:!this.hasNext(),value:this.next()})}}concat(e,t=!0){let r=this.asArray;const n=new y(...r.concat(e.asArray));if(!t)return n;let l={};return new y(...n.asArray.filter((e=>{const t=!(null==l?void 0:l[e.value.value.outerHTML]);return l[e.value.value.outerHTML]=!0,t})))}append(e){return this.each((t=>e.appendTo(t))),this}prependTo(e){return e.eachElem((e=>{e.prepend(...this.allElems())})),this}prepend(e){return this.eachElem((t=>{t.prepend(...e.allElems())})),this}_querySelectorAll(e){var t,r;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let n=[];for(let t=0;t<this.rootNode.length;t++){if(!(null===(r=this.rootNode[t])||void 0===r?void 0:r.querySelectorAll))continue;let l=this.rootNode[t].querySelectorAll(e);n=n.concat(...v(l))}return new y(...n)}_querySelectorAllDeep(e){var t;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let r=new y(...this.rootNode),n=e.split(/\/shadow\//);for(let e=0;e<n.length;e++){if(""==n[e])continue;let t=n[e];r=r.querySelectorAll(t),e<n.length-1&&(r=r.shadowRoot)}return r}_closest(e){var t,r;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let n=[];for(let t=0;t<this.rootNode.length;t++){if(!(null===(r=this.rootNode[t])||void 0===r?void 0:r.closest))continue;let l=[this.rootNode[t].closest(e)];n=n.concat(...l)}return new y(...n)}_closestDeep(e){var t;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let r=new y(...this.rootNode),n=e.split(/\/shadow\//);for(let e=0;e<n.length;e++){if(""==n[e])continue;let t=n[e];r=r.closest(t),e<n.length-1&&(r=r.shadowRoot)}return r}_mozMatchesSelector(e,t){let r=e,n=r.matches||r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector||function(t){let r=(document||ownerDocument).querySelectorAll(t),n=r.length;for(;--n>=0&&r.item(n)!==e;);return n>-1};return n.call(e,t)}_loadScriptEval(e,t,r=0,n){let l=this.createSourceNode(t,n),s=this.createSourceNode(null,n),i=`nonce_${Date.now()}_${Math.random()}`;s.innerHTML=`document.head["${i}"] = true`;let o=document.head;if(o.appendChild(s),o.removeChild(s),o[i]){try{r?setTimeout((()=>{o.appendChild(l),e||o.removeChild(l)}),r):(o.appendChild(l),e||o.removeChild(l))}finally{delete o[i]}return this}}resolveAttributeHolder(e="value"){let t=[];return t[e]=null,e in this.getAsElem(0).value?this.getAsElem(0).value:t}createSourceNode(e,t){let r=document.createElement("script");return r.type="text/javascript",t&&(void 0!==(null==r?void 0:r.nonce)?r.nonce=t:r.setAttribute("nonce",t)),e&&(r.src=e),r}applyNonce(e,t){e&&(void 0!==(null==t?void 0:t.nonce)?t.nonce=e:t.setAttribute("nonce",e))}}y.absent=new y,y.global=o.R;class b{constructor(){this.data=[]}collect(e){this.data.push(e)}get finalValue(){return new y(...this.data)}}const w=y,E=y.querySelectorAll},484:function(e,t,r){r.d(t,{Es2019Array:function(){return s},_Es2019Array:function(){return l}});class n extends Array{constructor(...e){super(...e),e._another?this._another=e._another:this._another=e,this.flatMap=e=>this._flatMap(e),this.flat=(e=1)=>this._flat(e)}map(e,t){return new l(...Array.prototype.map.call(this._another,e,t))}concat(...e){return new l(...Array.prototype.concat.call(this._another,...e))}reverse(){return new l(...Array.prototype.reverse.call(this._another))}slice(e,t){return new l(...Array.prototype.slice.call(this._another,e,t))}splice(e,t){return new l(...Array.prototype.splice.call(this._another,e,t))}filter(e,t){return new l(...Array.prototype.filter.call(this._another,e,t))}reduce(e,t){return Array.prototype.reduce.call(this._another,e,t)}_flat(e=1){return this._flatResolve(this._another,e)}_flatResolve(e,t=1){if(0==t)return e;let r=[];return e.forEach((e=>{e=Array.isArray(e)?e:[e];let n=this._flatResolve(e,t-1);r=r.concat(n)})),new s(...r)}_flatMap(e){let t=this.map((t=>e(t)));return this._flatResolve(t)}}function l(...e){let t=new n(...e);return new Proxy(t,{get(e,t,r){return"symbol"==typeof t?e._another[t]:isNaN(parseInt(t))?e[t]:e._another[t]},set(e,t,r){return e[t]=r,e._another[t]=r,!0}})}var s=Array.prototype.flatMap?function(...e){return[...e]}:l},456:function(e,t,r){function n(){var e;let t="undefined"!=typeof globalThis&&globalThis.window?globalThis.window:"undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:void 0!==r.g&&(null===r.g||void 0===r.g?void 0:r.g.window)?r.g.window:void 0!==r.g?r.g:null;return null!==(e=null==t?void 0:t.window)&&void 0!==e?e:t}r.d(t,{R:function(){return n}})},805:function(e,t,r){r.d(t,{Lang:function(){return n}});var n,l=r(152),s=r(484);!function(e){function t(e){let t=/\s/,r=(e=e.replace(/^\s\s*/,"")).length;for(;t.test(e.charAt(--r)););return e.slice(0,r+1)}function r(e){return!!arguments.length&&null!=e&&("string"==typeof e||e instanceof String)}e.saveResolve=function(e,t=null){try{let r=e();return l.Optional.fromNullable(null!=r?r:t)}catch(e){return l.Optional.absent}},e.saveResolveLazy=function(e,t=null){try{let r=e();return l.Optional.fromNullable(null!=r?r:t())}catch(e){return l.Optional.absent}},e.strToArray=function(e,r=/\./gi){let n=[];return e.split(r).forEach((e=>{n.push(t(e))})),n},e.trim=t,e.objToArray=function(e,t=0,r=[]){return"__undefined__"==(null!=e?e:"__undefined__")?null!=r?r:null:e instanceof Array&&!t&&!r?e:new s.Es2019Array(...r.concat(Array.prototype.slice.call(e,t)))},e.equalsIgnoreCase=function(e,t){let r=null!=t?t:"___no_value__";return(null!=e?e:"___no_value__").toLowerCase()===r.toLowerCase()},e.assertType=function(e,t){return r(t)?typeof e==t:e instanceof t},e.isString=r,e.isFunc=function(e){return e instanceof Function||"function"==typeof e},e.objAssign=function(e,...t){if(null==e)throw new TypeError("Cannot convert undefined or null to object");let r=Object(e);return Object.assign?(t.forEach((e=>Object.assign(r,e))),r):(t.filter((e=>null!=e)).forEach((e=>{let t=e;Object.keys(t).filter((e=>Object.prototype.hasOwnProperty.call(t,e))).forEach((e=>r[e]=t[e]))})),r)}}(n||(n={}))},152:function(e,t,r){r.d(t,{Monad:function(){return l},Optional:function(){return s},ValueEmbedder:function(){return i}});var n=r(484);class l{constructor(e){this._value=e}get value(){return this._value}map(e){e||(e=e=>e);let t=e(this.value);return new l(t)}flatMap(e){let t=this.map(e);for(;(null==t?void 0:t.value)instanceof l;)t=t.value;return t}}class s extends l{constructor(e){super(e)}get value(){return this._value instanceof l?this._value.flatMap().value:this._value}static fromNullable(e){return new s(e)}isAbsent(){return void 0===this.value||null==this.value}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=(()=>{})){return this.isPresent.call(this,e),this}orElse(e){return this.isPresent()?this:null==e?s.absent:this.flatMap((()=>e))}orElseLazy(e){return this.isPresent()?this:this.flatMap(e)}flatMap(e){let t=super.flatMap(e);return t instanceof s?t.flatMap():s.fromNullable(t.value)}getIf(...e){e=this.preprocessKeys(...e);let t=this;for(let r=0;r<e.length;r++){let n=this.keyVal(e[r]),l=this.arrayIndex(e[r]);if(""===n&&l>=0){if(t=this.getClass().fromNullable(t.value instanceof Array?t.value.length<l?null:t.value[l]:null),t.isAbsent())return t}else if(n&&l>=0){if(t.getIfPresent(n).isAbsent())return t;if(t=t.getIfPresent(n).value instanceof Array?this.getClass().fromNullable(t.getIfPresent(n).value[l]):this.getClass().absent,t.isAbsent())return t}else{if(t=t.getIfPresent(n),t.isAbsent())return t;l>-1&&(t=this.getClass().fromNullable(t.value[l]))}}return t}match(e){return!this.isAbsent()&&e(this.value)}get(e=s.absent){return this.isAbsent()?this.getClass().fromNullable(e).flatMap():this.getClass().fromNullable(this.value).flatMap()}toJson(){return JSON.stringify(this.value)}getClass(){return s}arrayIndex(e){let t=e.indexOf("["),r=e.indexOf("]");return t>=0&&r>0&&t<r?parseInt(e.substring(t+1,r)):-1}keyVal(e){let t=e.indexOf("[");return t>=0?e.substring(0,t):e}getIfPresent(e){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[e]).flatMap()}resolve(e){if(this.isAbsent())return s.absent;try{return s.fromNullable(e(this.value))}catch(e){return s.absent}}preprocessKeys(...e){return e.flatMap((e=>new n.Es2019Array(...e.split(/]\s*\[/gi)).map((e=>(-1==(e=e.replace(/^\s+|\s+$/g,"")).indexOf("[")&&-1!=e.indexOf("]")&&(e="["+e),-1==e.indexOf("]")&&-1!=e.indexOf("[")&&(e+="]"),e)))))}}s.absent=s.fromNullable(null);class i extends s{constructor(e,t="value"){super(e),this.key=t}get value(){return this._value?this._value[this.key]:null}set value(e){this._value&&(this._value[this.key]=e)}orElse(e){let t={};return t[this.key]=e,this.isPresent()?this:new i(t,this.key)}orElseLazy(e){if(this.isPresent())return this;{let t={};return t[this.key]=e(),new i(t,this.key)}}getClass(){return i}static fromNullable(e,t="value"){return new i(e,t)}}i.absent=i.fromNullable(null)},255:function(e,t,r){r.d(t,{dD:function(){return n}});var n;r(484),r(549);!function(e){e.EO_STRM="__EO_STRM__",e.BEF_STRM="___BEF_STRM__"}(n||(n={}))},121:function(e,t,r){r.d(t,{XMLQuery:function(){return o},XQ:function(){return a}});var n=r(805),l=r(585),s=r(456),i=n.Lang.isString;class o extends l.DomQuery{constructor(e,t="text/xml"){let r=e=>{if(null==e)return null;return n.Lang.saveResolveLazy((()=>new((0,s.R)().DOMParser)),(()=>(()=>{let e=new ActiveXObject("Microsoft.XMLDOM");return e.async=!1,{parseFromString:(t,r)=>e.loadXML(t)}})())).value.parseFromString(e,t)};i(e)?super(r(e)):super(e)}isXMLParserError(){return this.querySelectorAll("parsererror").isPresent()}toString(){let e=[];return this.eachElem((t=>{var r,n,l,i;let o=null!==(i=null===(l=null===(n=null===(r=(0,s.R)())||void 0===r?void 0:r.XMLSerializer)||void 0===n?void 0:n.constructor())||void 0===l?void 0:l.serializeToString(t))&&void 0!==i?i:null==t?void 0:t.xml;o&&e.push(o)})),e.join("")}parserErrorText(e){return this.querySelectorAll("parsererror").textContent(e)}static parseXML(e){return new o(e)}static parseHTML(e){return new o(e,"text/html")}static fromString(e,t="text/xml"){return new o(e,t)}}const a=o}},t={};function r(n){var l=t[n];if(void 0!==l)return l.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,r),s.exports}r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};!function(){r.r(n),r.d(n,{Assoc:function(){return i},CONFIG_ANY:function(){return o.ko},CONFIG_VALUE:function(){return o.ac},Config:function(){return o.De},DQ:function(){return e.DQ},DQ$:function(){return e.DQ$},DomQuery:function(){return e.DomQuery},DomQueryCollector:function(){return e.DomQueryCollector},ElementAttribute:function(){return e.ElementAttribute},Es2019Array:function(){return a.Es2019Array},Lang:function(){return t.Lang},Monad:function(){return l.Monad},Optional:function(){return l.Optional},ValueEmbedder:function(){return l.ValueEmbedder},XMLQuery:function(){return s.XMLQuery},XQ:function(){return s.XQ},_Es2019Array:function(){return a._Es2019Array},append:function(){return i.append},assign:function(){return i.assign},assignIf:function(){return i.assignIf},shallowMerge:function(){return i.shallowMerge},simpleShallowMerge:function(){return i.simpleShallowMerge}});var e=r(585),t=r(805),l=r(152),s=r(121),i=r(447),o=r(549),a=r(484)}();var l=exports;for(var s in n)l[s]=n[s];n.__esModule&&Object.defineProperty(l,"__esModule",{value:!0})}();
//# sourceMappingURL=index_core.js.map

/***/ }),

/***/ "./src/main/typescript/api/_api.ts":
/*!*****************************************!*\
  !*** ./src/main/typescript/api/_api.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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
const AjaxImpl_1 = __webpack_require__(/*! ../impl/AjaxImpl */ "./src/main/typescript/impl/AjaxImpl.ts");
const PushImpl_1 = __webpack_require__(/*! ../impl/PushImpl */ "./src/main/typescript/impl/PushImpl.ts");
const OamSubmit_1 = __webpack_require__(/*! ../myfaces/OamSubmit */ "./src/main/typescript/myfaces/OamSubmit.ts");
const Const_1 = __webpack_require__(/*! ../impl/core/Const */ "./src/main/typescript/impl/core/Const.ts");
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
    // private helper functions
    function getSeparatorChar() {
        const sep = '#{facesContext.namingContainerSeparatorChar}';
        //We now enable standalone mode, the separator char was not mapped we make a fallback to 2.3 behavior
        //the idea is that the separator char is provided from the underlying container, but if not then we
        //will perform a fallback (aka 2.3 has the url fallback behavior)
        return (sep.match(/\#\{facesContext.namingContainerSeparatorChar\}/gi)) ? AjaxImpl_1.Implementation.getSeparatorChar() : sep;
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
            AjaxImpl_1.Implementation.request(element, event, options);
        }
        ajax.request = request;
        /**
         * response handler
         * @param request the request object having triggered this response
         * @param context the request context
         *
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
         *     <li> errorData.source  : the issuing source element which triggered the request </li>
         *     <li> eventData.responseCode: the response code (aka http request response code, 401 etc...) </li>
         *     <li> eventData.responseText: the request response text </li>
         *     <li> eventData.responseXML: the request response xml </li>
         * </ul>
         *
         * @param errorFunc error handler must be of the format <i>function errorListener(&lt;errorData&gt;)</i>
         */
        function addOnError(errorFunc) {
            AjaxImpl_1.Implementation.addOnError(errorFunc);
        }
        ajax.addOnError = addOnError;
        /**
         * Adds a global event listener to the ajax event queue. The event listener must be a function
         * of following format: <i>function eventListener(&lt;eventData&gt;)</i>
         *
         * @param eventFunc event must be of the format <i>function eventListener(&lt;eventData&gt;)</i>
         */
        function addOnEvent(eventFunc) {
            AjaxImpl_1.Implementation.addOnEvent(eventFunc);
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
            return AjaxImpl_1.Implementation.chain(source, event, ...funcs);
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
            PushImpl_1.PushImpl.init(socketClientId, url, channel, onopen, onmessage, onerror, onclose, behaviors, autoConnect);
        }
        push.init = init;
        /**
         * Open the web socket on the given channel.
         * @param  socketClientId The name of the web socket channel.
         * @throws  Error is thrown, if the channel is unknown.
         */
        function open(socketClientId) {
            PushImpl_1.PushImpl.open(socketClientId);
        }
        push.open = open;
        /**
         * Close the web socket on the given channel.
         * @param  socketClientId The id of the web socket client.
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
     * @param render the render list as string
     * @param options the options which need to be mered in
     */
    function ab(source, event, eventName, execute, render, options = {}) {
        var _a, _b;
        if (eventName) {
            options[Const_1.CTX_OPTIONS_PARAMS] = (_a = options === null || options === void 0 ? void 0 : options[Const_1.CTX_OPTIONS_PARAMS]) !== null && _a !== void 0 ? _a : {};
            options[Const_1.CTX_OPTIONS_PARAMS][(0, Const_1.$nsp)(Const_1.P_BEHAVIOR_EVENT)] = eventName;
        }
        if (execute) {
            options[Const_1.CTX_OPTIONS_EXECUTE] = execute;
        }
        if (render) {
            options[Const_1.CTX_PARAM_RENDER] = render;
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

"use strict";

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
const Response_1 = __webpack_require__(/*! ./xhrCore/Response */ "./src/main/typescript/impl/xhrCore/Response.ts");
const XhrRequest_1 = __webpack_require__(/*! ./xhrCore/XhrRequest */ "./src/main/typescript/impl/xhrCore/XhrRequest.ts");
const mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
const Assertions_1 = __webpack_require__(/*! ./util/Assertions */ "./src/main/typescript/impl/util/Assertions.ts");
const ExtDomQuery_1 = __webpack_require__(/*! ./util/ExtDomQuery */ "./src/main/typescript/impl/util/ExtDomQuery.ts");
const ErrorData_1 = __webpack_require__(/*! ./xhrCore/ErrorData */ "./src/main/typescript/impl/xhrCore/ErrorData.ts");
const Lang_1 = __webpack_require__(/*! ./util/Lang */ "./src/main/typescript/impl/util/Lang.ts");
const Const_1 = __webpack_require__(/*! ./core/Const */ "./src/main/typescript/impl/core/Const.ts");
const RequestDataResolver_1 = __webpack_require__(/*! ./xhrCore/RequestDataResolver */ "./src/main/typescript/impl/xhrCore/RequestDataResolver.ts");
const FileUtils_1 = __webpack_require__(/*! ./util/FileUtils */ "./src/main/typescript/impl/util/FileUtils.ts");
const XhrQueueController_1 = __webpack_require__(/*! ./util/XhrQueueController */ "./src/main/typescript/impl/util/XhrQueueController.ts");
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
    var trim = mona_dish_1.Lang.trim;
    var getMessage = Lang_1.ExtLang.getMessage;
    var getGlobalConfig = Lang_1.ExtLang.getGlobalConfig;
    var assert = Assertions_1.Assertions.assert;
    var ofAssoc = Lang_1.ExtLang.ofAssoc;
    var collectAssoc = Lang_1.ExtLang.collectAssoc;
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
        const foundStage = ExtDomQuery_1.ExtDomQuery.searchJsfJsFor(/stage=([^&;]*)/).value;
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
        let ret;
        funcs.every(func => {
            let returnVal = resolveAndExecute(source, event, func);
            if (returnVal !== false) {
                ret = returnVal;
            }
            return returnVal !== false;
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
        var _a, _b, _c, _d, _e;
        const { options, elem, elementId, windowId, isResetValues } = (0, RequestDataResolver_1.resolveDefaults)(event, opts, el);
        const requestCtx = new ExtDomQuery_1.ExtConfig({});
        const internalCtx = new ExtDomQuery_1.ExtConfig({});
        Assertions_1.Assertions.assertRequestIntegrity(options, elem);
        /**
         * fetch the parent form
         *
         * note we also add an override possibility here
         * so that people can use dummy forms and work
         * with detached objects
         */
        const form = (0, RequestDataResolver_1.resolveForm)(elem, event);
        const viewId = (0, RequestDataResolver_1.resolveViewId)(form);
        const formId = form.id.value;
        const delay = (0, RequestDataResolver_1.resolveDelay)(options);
        const timeout = (0, RequestDataResolver_1.resolveTimeout)(options);
        requestCtx.assignIf(!!windowId, Const_1.P_WINDOW_ID).value = windowId;
        // old non - spec behavior will be removed after it is clear whether the removal breaks any code
        requestCtx.assign(Const_1.CTX_PARAM_REQ_PASS_THR).value = extractLegacyParams(options.value);
        // spec conform behavior, all passthrough params must be under "passthrough
        const params = remapArrayToAssocArr(options.getIf(Const_1.CTX_OPTIONS_PARAMS).orElse({}).value);
        //we turn off the remapping for the param merge, because we do not want to have
        //any namespacing to be remapped
        let ctxPassthrough = requestCtx.getIf(Const_1.CTX_PARAM_REQ_PASS_THR);
        ctxPassthrough.$nspEnabled = false;
        ctxPassthrough.shallowMerge(new mona_dish_1.Config(params), true);
        //now we turn it on again
        ctxPassthrough.$nspEnabled = true;
        requestCtx.assignIf(!!event, Const_1.CTX_PARAM_REQ_PASS_THR, Const_1.P_EVT).value = event === null || event === void 0 ? void 0 : event.type;
        /**
         * ajax pass through context with the source
         * onresolved Event and onerror Event
         */
        requestCtx.assign(Const_1.SOURCE).value = elementId;
        requestCtx.assign(Const_1.VIEW_ID).value = viewId;
        /**
         * on resolvedEvent and onError...
         * those values will be traversed later on
         * also into the response context
         */
        requestCtx.assign(Const_1.ON_EVENT).value = (_a = options.value) === null || _a === void 0 ? void 0 : _a.onevent;
        requestCtx.assign(Const_1.ON_ERROR).value = (_b = options.value) === null || _b === void 0 ? void 0 : _b.onerror;
        /**
         * Fetch the myfaces config params
         */
        requestCtx.assign(Const_1.MYFACES).value = (_c = options.value) === null || _c === void 0 ? void 0 : _c.myfaces;
        /**
         * binding contract the jakarta.faces.source must be set
         */
        requestCtx.assign(Const_1.CTX_PARAM_REQ_PASS_THR, Const_1.P_AJAX_SOURCE).value = elementId;
        /**
         * jakarta.faces.partial.ajax must be set to true
         */
        requestCtx.assign(Const_1.CTX_PARAM_REQ_PASS_THR, Const_1.P_AJAX).value = true;
        /**
         * if resetValues is set to true
         * then we have to set jakarta.faces.resetValues as well
         * as pass through parameter
         * the value has to be explicitly true, according to
         * the specs jsdoc
         */
        requestCtx.assignIf(isResetValues, Const_1.CTX_PARAM_REQ_PASS_THR, Const_1.P_RESET_VALUES).value = true;
        // additional meta information to speed things up, note internal non jsf
        // pass through options are stored under _mfInternal in the context
        internalCtx.assign(Const_1.CTX_PARAM_SRC_FRM_ID).value = formId;
        // mojarra compatibility, mojarra is sending the form id as well
        // this is not documented behavior but can be determined by running
        // mojarra under blackbox conditions.
        // I assume it does the same as our formId_submit=1 so leaving it out
        // won't hurt but for the sake of compatibility we are going to add it
        requestCtx.assign(Const_1.CTX_PARAM_REQ_PASS_THR, formId).value = formId;
        internalCtx.assign(Const_1.CTX_PARAM_SRC_CTL_ID).value = elementId;
        // reintroduction of PPS as per myfaces 2.3 (myfaces.pps = true, only the executes are submitted)
        internalCtx.assign(Const_1.CTX_PARAM_PPS).value = (_e = (_d = extractMyFacesParams(options.value)) === null || _d === void 0 ? void 0 : _d[Const_1.MYFACES_OPTION_PPS]) !== null && _e !== void 0 ? _e : false;
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
                let errorData = ErrorData_1.ErrorData.fromClient(exception);
                sendError(errorData);
            }
        }
        finally {
            if (clearRequestQueue) {
                Implementation.requestQueue.clear();
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
        let searchRoot = ((node) ? mona_dish_1.DQ.byId(node) : (0, mona_dish_1.DQ$)("form"));
        let inputs = searchRoot
            .filterSelector(`input[name='${(0, Const_1.$nsp)(Const_1.P_CLIENT_WINDOW)}']`)
            .orElseLazy(() => searchRoot.querySelectorAll(`input[name='${(0, Const_1.$nsp)(Const_1.P_CLIENT_WINDOW)}']`));
        /*
         * lazy helper to fetch the window id from the included faces.js
         */
        let fetchWindowIdFromJSFJS = () => ExtDomQuery_1.ExtDomQuery.searchJsfJsFor(/jfwid=([^&;]*)/).orElse(null).value;
        /*
         * fetch window id from the url
         */
        let fetchWindowIdFromURL = function () {
            const href = window.location.href, windowId = "jfwid";
            const regex = new RegExp("[\\?&]" + windowId + "=([^&#\\;]*)");
            const results = regex.exec(href);
            //initial trial over the url and a regexp
            if (results != null)
                return results[1];
            return null;
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
        return formWindowId != INIT ? formWindowId : (fetchWindowIdFromURL() || fetchWindowIdFromJSFJS());
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
        let element = mona_dish_1.DQ.byId(form, true);
        if (!element.isTag(Const_1.HTML_TAG_FORM)) {
            throw new Error(getMessage("ERR_VIEWSTATE"));
        }
        // determine the naming container scenario
        const dummyContext = new mona_dish_1.Config({});
        assignNamingContainerData(dummyContext, mona_dish_1.DQ.byId(form));
        // fetch all non file input form elements
        let formElements = element.deepElements.encodeFormElement();
        // encode them! (file inputs are handled differently and are not part of the viewstate)
        return (0, FileUtils_1.encodeFormData)(new ExtDomQuery_1.ExtConfig(formElements), (0, RequestDataResolver_1.resoveNamingContainerMapper)(dummyContext));
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
            Implementation.requestQueue = Implementation.requestQueue !== null && Implementation.requestQueue !== void 0 ? Implementation.requestQueue : new XhrQueueController_1.XhrQueueController();
            Implementation.requestQueue.enqueue(new XhrRequest_1.XhrRequest(reqCtx, respPassThr, timeout), delay);
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
            remapDefaultConstants(targetContext.getIf(Const_1.CTX_PARAM_REQ_PASS_THR).get({}), Const_1.P_RENDER, requestOptions.getIf(Const_1.CTX_PARAM_RENDER).value, issuingForm, sourceElementId, targetContext.getIf(Const_1.VIEW_ID).value);
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
        if (requestOptions.getIf(Const_1.CTX_OPTIONS_EXECUTE).isPresent()) {
            /*the options must be a blank delimited list of strings*/
            /*compliance with Mojarra which automatically adds @this to an execute
             * the spec rev 2.0a however states, if none is issued nothing at all should be sent down
             */
            requestOptions.assign(Const_1.CTX_OPTIONS_EXECUTE).value = [requestOptions.getIf(Const_1.CTX_OPTIONS_EXECUTE).value, Const_1.IDENT_THIS].join(" ");
            remapDefaultConstants(targetContext.getIf(Const_1.CTX_PARAM_REQ_PASS_THR).get({}), Const_1.P_EXECUTE, requestOptions.getIf(Const_1.CTX_OPTIONS_EXECUTE).value, issuingForm, sourceElementId, targetContext.getIf(Const_1.VIEW_ID).value);
        }
        else {
            targetContext.assign(Const_1.CTX_PARAM_REQ_PASS_THR, Const_1.P_EXECUTE).value = sourceElementId;
        }
    }
    /**
     * apply the browser tab where the request was originating from
     *
     * @param form the form hosting the client window id
     * @param targetContext the target context receiving the value
     */
    function assignClientWindowId(form, targetContext) {
        let clientWindow = (0, Const_1.$faces)().getClientWindow(form.getAsElem(0).value);
        if (clientWindow) {
            targetContext.assign(Const_1.CTX_PARAM_REQ_PASS_THR, Const_1.P_CLIENT_WINDOW).value = clientWindow;
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
        const viewRootId = (0, RequestDataResolver_1.resolveViewRootId)(formElement);
        if (!!viewRootId) {
            internalContext.assign(Const_1.NAMED_VIEWROOT).value = true;
            internalContext.assign(Const_1.NAMING_CONTAINER_ID).value = viewRootId;
        }
    }
    /**
     * transforms the user values to the expected one
     * with the proper none all form and this handling
     * (note we also could use a simple string replace, but then
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
     * @param rootNamingContainerId the naming container id ("" default if none is given)
     */
    function remapDefaultConstants(targetConfig, targetKey, userValues, issuingForm, issuingElementId, rootNamingContainerId = "") {
        //a cleaner implementation of the transform list method
        const SEP = (0, Const_1.$faces)().separatorchar;
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
        const remapNamingContainer = componentIdToTransform => {
            // pattern :<anything> must be prepended by viewRoot if there is one,
            // otherwise we are in a not namespaced then only the id has to match
            const rootNamingContainerPrefix = (rootNamingContainerId.length) ? rootNamingContainerId + SEP : Const_1.EMPTY_STR;
            let formClientId = issuingForm.id.value;
            // nearest parent naming container relative to the form
            const nearestNamingContainer = formClientId.substring(0, formClientId.lastIndexOf(SEP));
            const nearestNamingContainerPrefix = (nearestNamingContainer.length) ? nearestNamingContainer + SEP : Const_1.EMPTY_STR;
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
                finalIdentifier = [rootNamingContainerPrefix, componentIdToTransform].join(Const_1.EMPTY_STR);
            }
            else { //relative search according to the javadoc
                //we cut off the root naming container id from the form
                if (formClientId.indexOf(rootNamingContainerPrefix) == 0) {
                    formClientId = formClientId.substring(rootNamingContainerPrefix.length);
                }
                //If prependId = true, the outer form id must be present in the id if same form
                let hasPrependId = componentIdToTransform.indexOf(formClientId) == 0;
                finalIdentifier = hasPrependId ?
                    [rootNamingContainerPrefix, componentIdToTransform].join(Const_1.EMPTY_STR) :
                    [nearestNamingContainerPrefix, componentIdToTransform].join(Const_1.EMPTY_STR);
            }
            // We need to double-check because we have scenarios where we have a naming container
            // and no prepend (aka tobago testcase "must handle ':' in IDs properly", scenario 3,
            // in this case we return the component id, and be happy
            // we can roll a dom check here
            return (!!document.getElementById(finalIdentifier)) ? finalIdentifier : componentIdToTransform;
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
                case Const_1.IDENT_NONE:
                    return targetConfig.delete(targetKey);
                //@all is a pass through case according to the spec
                case Const_1.IDENT_ALL:
                    targetConfig.assign(targetKey).value = Const_1.IDENT_ALL;
                    return targetConfig;
                //@form pushes the issuing form id into our list
                case Const_1.IDENT_FORM:
                    ret.push(remapNamingContainer(issuingForm.id.value));
                    processed[issuingForm.id.value] = true;
                    break;
                //@this is replaced with the current issuing element id
                case Const_1.IDENT_THIS:
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
     * Filter the options given with a blacklist, so that only
     * the values required for params-through are processed in the ajax request
     *
     * Note this is a bug carried over from the old implementation
     * the spec conform behavior is to use params for pass - through values
     * this will be removed soon, after it is cleared up whether removing
     * it breaks any legacy code
     *
     * @param {Context} mappedOpts the options to be filtered
     */
    function extractLegacyParams(mappedOpts) {
        //we now can use the full code reduction given by our stream api
        //to filter
        return ofAssoc(mappedOpts)
            .filter((item => !(item[0] in BlockFilter)))
            .reduce(collectAssoc, {});
    }
    /**
     * extracts the myfaces config parameters which provide extra functionality
     * on top of JSF
     * @param mappedOpts
     * @private
     */
    function extractMyFacesParams(mappedOpts) {
        var _a;
        //we now can use the full code reduction given by our stream api
        //to filter
        return (_a = ofAssoc(mappedOpts)
            .filter((item => (item[0] == "myfaces")))
            .reduce(collectAssoc, {})) === null || _a === void 0 ? void 0 : _a[Const_1.MYFACES];
    }
    function remapArrayToAssocArr(arrayedParams) {
        if (Array.isArray(arrayedParams)) {
            return arrayedParams.reduce(collectAssoc, {});
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
            let sourceCode = trim(func);
            if (sourceCode.indexOf("function ") == 0) {
                sourceCode = `return ${sourceCode} (event)`;
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

"use strict";

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
const Const_1 = __webpack_require__(/*! ./core/Const */ "./src/main/typescript/impl/core/Const.ts");
const mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
/**
 * Implementation class for the push functionality
 */
var PushImpl;
(function (PushImpl) {
    const URL_PROTOCOL = mona_dish_1.DQ.global().location.protocol.replace("http", "ws") + "//";
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
            var _a, _b;
            let message = JSON.parse(event.data);
            //TODO replace this with a more readable Stream code
            for (let i = PushImpl.clientIdsByTokens[this.channelToken].length - 1; i >= 0; i--) {
                let socketClientId = PushImpl.clientIdsByTokens[this.channelToken][i];
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
                || (event.code == 1000 && event.reason == Const_1.REASON_EXPIRED)
                || (event.code == 1008)
                || (!this.reconnectAttempts)
                || (this.reconnectAttempts >= Const_1.MAX_RECONNECT_ATTEMPTS)) {
                let clientIds = PushImpl.clientIdsByTokens[this.channelToken];
                for (let i = clientIds.length - 1; i >= 0; i--) {
                    let socketClientId = clientIds[i];
                    (_b = (_a = PushImpl.components === null || PushImpl.components === void 0 ? void 0 : PushImpl.components[socketClientId]) === null || _a === void 0 ? void 0 : _a['onclose']) === null || _b === void 0 ? void 0 : _b.call(_a, event === null || event === void 0 ? void 0 : event.code, this === null || this === void 0 ? void 0 : this.channel, event);
                }
            }
            else {
                setTimeout(this.open, Const_1.RECONNECT_INTERVAL * this.reconnectAttempts++);
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
    function getBaseURL(url) {
        if (url.indexOf("://") < 0) {
            let base = mona_dish_1.DQ.global().location.hostname + ":" + mona_dish_1.DQ.global().location.port;
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
        return ((typeof fn !== "function") && (fn = mona_dish_1.DQ.global()[fn]), fn);
    }
})(PushImpl = exports.PushImpl || (exports.PushImpl = {}));


/***/ }),

/***/ "./src/main/typescript/impl/core/Const.ts":
/*!************************************************!*\
  !*** ./src/main/typescript/impl/core/Const.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

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
exports.CTX_OPTIONS_PARAMS = exports.TIMEOUT_EVENT = exports.CLIENT_ERROR = exports.SERVER_ERROR = exports.MALFORMEDXML = exports.EMPTY_RESPONSE = exports.HTTPERROR = exports.RESPONSE_XML = exports.RESPONSE_TEXT = exports.ERROR_MESSAGE = exports.ERROR_NAME = exports.STATUS = exports.SOURCE = exports.SUCCESS = exports.COMPLETE = exports.BEGIN = exports.ON_EVENT = exports.ON_ERROR = exports.EVENT = exports.ERROR = exports.WINDOW_ID = exports.CTX_PARAM_RENDER = exports.P_BEHAVIOR_EVENT = exports.P_WINDOW_ID = exports.P_RESET_VALUES = exports.P_EVT = exports.P_RENDER_OVERRIDE = exports.P_RENDER = exports.P_EXECUTE = exports.P_AJAX = exports.IDENT_FORM = exports.IDENT_THIS = exports.IDENT_NONE = exports.IDENT_ALL = exports.HTML_CLIENT_WINDOW = exports.HTML_VIEWSTATE = exports.EMPTY_MAP = exports.EMPTY_STR = exports.EMPTY_FUNC = exports.P_RESOURCE = exports.P_VIEWBODY = exports.P_VIEWHEAD = exports.P_VIEWROOT = exports.P_CLIENT_WINDOW = exports.P_VIEWSTATE = exports.VIEW_ID = exports.NAMING_CONTAINER_ID = exports.P_AJAX_SOURCE = exports.NAMED_VIEWROOT = exports.XML_ATTR_NAMED_VIEWROOT = void 0;
exports.XML_TAG_REDIRECT = exports.XML_TAG_EXTENSION = exports.XML_TAG_ATTRIBUTES = exports.XML_TAG_ERROR = exports.XML_TAG_EVAL = exports.XML_TAG_INSERT = exports.XML_TAG_DELETE = exports.XML_TAG_UPDATE = exports.XML_TAG_CHANGES = exports.XML_TAG_PARTIAL_RESP = exports.ATTR_ID = exports.ATTR_VALUE = exports.ATTR_NAME = exports.ATTR_URL = exports.MYFACES_OPTION_PPS = exports.ERR_NO_PARTIAL_RESPONSE = exports.PHASE_PROCESS_RESPONSE = exports.SEL_RESPONSE_XML = exports.SEL_CLIENT_WINDOW_ELEM = exports.SEL_VIEWSTATE_ELEM = exports.HTML_TAG_STYLE = exports.HTML_TAG_SCRIPT = exports.HTML_TAG_LINK = exports.HTML_TAG_BODY = exports.HTML_TAG_FORM = exports.HTML_TAG_HEAD = exports.STD_ACCEPT = exports.NO_TIMEOUT = exports.MULTIPART = exports.URL_ENCODED = exports.STATE_EVT_COMPLETE = exports.STATE_EVT_TIMEOUT = exports.STATE_EVT_BEGIN = exports.REQ_TYPE_POST = exports.REQ_TYPE_GET = exports.ENCODED_URL = exports.VAL_AJAX = exports.REQ_ACCEPT = exports.HEAD_FACES_REQ = exports.CONTENT_TYPE = exports.CTX_PARAM_PPS = exports.CTX_PARAM_REQ_PASS_THR = exports.CTX_PARAM_SRC_CTL_ID = exports.CTX_PARAM_SRC_FRM_ID = exports.CTX_PARAM_MF_INTERNAL = exports.CTX_OPTIONS_EXECUTE = exports.CTX_OPTIONS_RESET = exports.CTX_OPTIONS_TIMEOUT = exports.DELAY_NONE = exports.CTX_OPTIONS_DELAY = void 0;
exports.$nsp = exports.$faces = exports.UNKNOWN = exports.MAX_RECONNECT_ATTEMPTS = exports.RECONNECT_INTERVAL = exports.APPLIED_CLIENT_WINDOW = exports.APPLIED_VST = exports.REASON_EXPIRED = exports.MF_NONE = exports.MYFACES = exports.DEFERRED_HEAD_INSERTS = exports.UPDATE_ELEMS = exports.UPDATE_FORMS = exports.XML_TAG_ATTR = exports.XML_TAG_AFTER = exports.XML_TAG_BEFORE = void 0;
/*
 * [export const] constants
 */
exports.XML_ATTR_NAMED_VIEWROOT = "namedViewRoot";
exports.NAMED_VIEWROOT = "namedViewRoot";
exports.P_AJAX_SOURCE = "jakarta.faces.source";
exports.NAMING_CONTAINER_ID = "myfaces.NamingContainerId";
exports.VIEW_ID = "myfaces.viewId";
exports.P_VIEWSTATE = "jakarta.faces.ViewState";
exports.P_CLIENT_WINDOW = "jakarta.faces.ClientWindow";
exports.P_VIEWROOT = "jakarta.faces.ViewRoot";
exports.P_VIEWHEAD = "jakarta.faces.ViewHead";
exports.P_VIEWBODY = "jakarta.faces.ViewBody";
exports.P_RESOURCE = "jakarta.faces.Resource";
/*some useful definitions*/
exports.EMPTY_FUNC = Object.freeze(() => {
});
exports.EMPTY_STR = "";
exports.EMPTY_MAP = Object.freeze({});
exports.HTML_VIEWSTATE = ["<input type='hidden'", "name='", exports.P_VIEWSTATE, "' value='' />"].join(exports.EMPTY_STR);
exports.HTML_CLIENT_WINDOW = ["<input type='hidden'", "' name='", exports.P_CLIENT_WINDOW, "' value='' />"].join(exports.EMPTY_STR);
/*internal identifiers for options*/
exports.IDENT_ALL = "@all";
exports.IDENT_NONE = "@none";
exports.IDENT_THIS = "@this";
exports.IDENT_FORM = "@form";
exports.P_AJAX = "jakarta.faces.partial.ajax";
exports.P_EXECUTE = "jakarta.faces.partial.execute";
exports.P_RENDER = "jakarta.faces.partial.render";
/*render override for viewbody or viewroot, in both cases an all is performed*/
exports.P_RENDER_OVERRIDE = "_myfaces.rendeOverride";
exports.P_EVT = "jakarta.faces.partial.event";
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
exports.CTX_OPTIONS_PARAMS = "params";
exports.CTX_OPTIONS_DELAY = "delay";
exports.DELAY_NONE = 'none';
exports.CTX_OPTIONS_TIMEOUT = "timeout";
exports.CTX_OPTIONS_RESET = "resetValues";
exports.CTX_OPTIONS_EXECUTE = "execute";
exports.CTX_PARAM_MF_INTERNAL = "myfaces.internal";
exports.CTX_PARAM_SRC_FRM_ID = "myfaces.source.formId";
exports.CTX_PARAM_SRC_CTL_ID = "myfaces.source.controlId";
exports.CTX_PARAM_REQ_PASS_THR = "myfaces.request.passThrough";
exports.CTX_PARAM_PPS = "myfaces.request.pps";
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
exports.HTML_TAG_HEAD = "HEAD";
exports.HTML_TAG_FORM = "FORM";
exports.HTML_TAG_BODY = "BODY";
exports.HTML_TAG_LINK = "LINK";
exports.HTML_TAG_SCRIPT = "SCRIPT";
exports.HTML_TAG_STYLE = "STYLE";
exports.SEL_VIEWSTATE_ELEM = "[name='" + exports.P_VIEWSTATE + "']";
exports.SEL_CLIENT_WINDOW_ELEM = "[name='" + exports.P_CLIENT_WINDOW + "']";
exports.SEL_RESPONSE_XML = "responseXML";
exports.PHASE_PROCESS_RESPONSE = "processResponse";
exports.ERR_NO_PARTIAL_RESPONSE = "Partial response not set";
exports.MYFACES_OPTION_PPS = "pps";
exports.ATTR_URL = "url";
exports.ATTR_NAME = "name";
exports.ATTR_VALUE = "value";
exports.ATTR_ID = "id";
/*partial response types*/
exports.XML_TAG_PARTIAL_RESP = "partial-response";
/*partial commands*/
exports.XML_TAG_CHANGES = "changes";
exports.XML_TAG_UPDATE = "update";
exports.XML_TAG_DELETE = "delete";
exports.XML_TAG_INSERT = "insert";
exports.XML_TAG_EVAL = "eval";
exports.XML_TAG_ERROR = "error";
exports.XML_TAG_ATTRIBUTES = "attributes";
exports.XML_TAG_EXTENSION = "extension";
exports.XML_TAG_REDIRECT = "redirect";
exports.XML_TAG_BEFORE = "before";
exports.XML_TAG_AFTER = "after";
exports.XML_TAG_ATTR = "attribute";
/*other constants*/
exports.UPDATE_FORMS = "myfaces.updateForms";
exports.UPDATE_ELEMS = "myfaces.updateElems";
//we want the head elements to be processed before we process the body
//but after the inner html is done
exports.DEFERRED_HEAD_INSERTS = "myfaces.headElems";
exports.MYFACES = "myfaces";
exports.MF_NONE = "__mf_none__";
exports.REASON_EXPIRED = "Expired";
exports.APPLIED_VST = "myfaces.appliedViewState";
exports.APPLIED_CLIENT_WINDOW = "myfaces.appliedClientWindow";
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
function $faces() {
    var _a;
    return ((_a = window === null || window === void 0 ? void 0 : window.faces) !== null && _a !== void 0 ? _a : window === null || window === void 0 ? void 0 : window.jsf);
}
exports.$faces = $faces;
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

"use strict";

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
const Const_1 = __webpack_require__(/*! ./Const */ "./src/main/typescript/impl/core/Const.ts");
/**
 * a helper class to isolate the
 * view state and client window and other
 * future states which follow a similar pattern
 */
class StateHolder {
    constructor(id, value) {
        this.id = id;
        this.value = value;
        let viewStatePos = id.indexOf(Const_1.P_VIEWSTATE);
        this.nameSpace = viewStatePos > 0 ? id.substr(0, viewStatePos - 1) : Const_1.EMPTY_STR;
    }
    get hasNameSpace() {
        var _a;
        return !!((_a = this === null || this === void 0 ? void 0 : this.nameSpace) !== null && _a !== void 0 ? _a : Const_1.EMPTY_STR).length;
    }
}
exports.StateHolder = StateHolder;


/***/ }),

/***/ "./src/main/typescript/impl/i18n/Messages.ts":
/*!***************************************************!*\
  !*** ./src/main/typescript/impl/i18n/Messages.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

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
exports.Messages = Messages;


/***/ }),

/***/ "./src/main/typescript/impl/util/Assertions.ts":
/*!*****************************************************!*\
  !*** ./src/main/typescript/impl/util/Assertions.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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
const mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
const Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
const Lang_1 = __webpack_require__(/*! ./Lang */ "./src/main/typescript/impl/util/Lang.ts");
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
        assert(elem.isPresent(), Lang_1.ExtLang.getMessage("ERR_MUST_BE_PROVIDED1", "{0}: source  must be provided or exist", "source element id"), "faces.ajax.request", "ArgNotSet");
    }
    Assertions.assertRequestIntegrity = assertRequestIntegrity;
    function assertUrlExists(node) {
        if (node.attr(Const_1.ATTR_URL).isAbsent()) {
            throw Assertions.raiseError(new Error(), Lang_1.ExtLang.getMessage("ERR_RED_URL", null, "processRedirect"), "processRedirect");
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
        assert(responseXML.querySelectorAll(Const_1.XML_TAG_PARTIAL_RESP).isPresent(), Const_1.ERR_NO_PARTIAL_RESPONSE, Const_1.PHASE_PROCESS_RESPONSE);
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
        let finalTitle = title !== null && title !== void 0 ? title : Const_1.MALFORMEDXML;
        let finalName = name !== null && name !== void 0 ? name : Const_1.MALFORMEDXML;
        let finalMessage = message !== null && message !== void 0 ? message : Const_1.EMPTY_STR;
        //TODO clean up the messy makeException, this is a perfect case for encapsulation and sane defaults
        return Lang_1.ExtLang.makeException(error, finalTitle, finalName, "Response", caller || ((arguments.caller) ? arguments.caller.toString() : "_raiseError"), finalMessage);
    }
    Assertions.raiseError = raiseError;
    /*
     * using the new typescript 3.7 compiler assertion functionality to improve compiler hinting
     * we are not fully there yet, but soon
     */
    function assert(value, msg = Const_1.EMPTY_STR, caller = Const_1.EMPTY_STR, title = "Assertion Error") {
        if (!value) {
            throw Assertions.raiseError(new Error(), msg, caller, title);
        }
    }
    Assertions.assert = assert;
    function assertType(value, theType, msg = Const_1.EMPTY_STR, caller = Const_1.EMPTY_STR, title = "Type Assertion Error") {
        if ((!!value) && !mona_dish_1.Lang.assertType(value, theType)) {
            throw Assertions.raiseError(new Error(), msg, caller, title);
        }
    }
    Assertions.assertType = assertType;
    function assertFunction(value, msg = Const_1.EMPTY_STR, caller = Const_1.EMPTY_STR, title = "Assertion Error") {
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
})(Assertions = exports.Assertions || (exports.Assertions = {}));


/***/ }),

/***/ "./src/main/typescript/impl/util/AsyncRunnable.ts":
/*!********************************************************!*\
  !*** ./src/main/typescript/impl/util/AsyncRunnable.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

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
exports.AsyncRunnable = void 0;
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
exports.AsyncRunnable = AsyncRunnable;


/***/ }),

/***/ "./src/main/typescript/impl/util/ExtDomQuery.ts":
/*!******************************************************!*\
  !*** ./src/main/typescript/impl/util/ExtDomQuery.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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
const mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
const Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
/**
 * detects whether a source is a faces.js request
 *
 * @param source the source string for the faces.js request
 * @return true if a faces.js loading pattern is detected
 * @constructor
 */
const IS_FACES_SOURCE = (source) => {
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
const IS_INTERNAL_SOURCE = (source) => {
    return source.search(/\/faces[^.]*\.js.*ln=myfaces.testscripts.*/gi) != -1 || source.search(/\/jsf[^.]*\.js.*ln=myfaces.testscripts.*/gi) != -1;
};
const ATTR_SRC = 'src';
/**
 * Extension which adds implementation specific
 * meta-data to our dom query
 *
 * Usage
 * el = new ExtDQ(oldReference)
 * nonce = el.nonce
 * windowId = el.getWindowId
 */
class ExtDomQuery extends mona_dish_1.DQ {
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
            let result = this.querySelectorAll("form input[name='" + Const_1.P_WINDOW_ID + "']");
            if (result.length > 1) {
                throw Error("Multiple different windowIds found in document");
            }
            return (result.isPresent()) ? result.getAsElem(0).value.value : fetchWindowIdFromURL();
        }
        else {
            return fetchWindowIdFromURL();
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
        let nonce = myfacesConfig.getIf("config", "cspMeta", "nonce");
        if (nonce.value) {
            return nonce.value;
        }
        let curScript = new mona_dish_1.DQ(document.currentScript);
        //since our baseline atm is ie11 we cannot use document.currentScript globally
        if (!!this.extractNonce(curScript)) {
            // fast-path for modern browsers
            return this.extractNonce(curScript);
        }
        // fallback if the currentScript method fails, we just search the jsf tags for nonce, this is
        // the last possibility
        let nonceScript = mona_dish_1.Optional.fromNullable((_a = mona_dish_1.DQ
            .querySelectorAll("script[src], link[src]").asArray
            .filter((item) => this.extractNonce(item) && item.attr(ATTR_SRC) != null)
            .filter(item => IS_FACES_SOURCE(item.attr(ATTR_SRC).value))) === null || _a === void 0 ? void 0 : _a[0]);
        if (nonceScript.isPresent()) {
            return this.extractNonce(nonceScript.value);
        }
        return null;
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
        return mona_dish_1.Optional.fromNullable((_a = mona_dish_1.DQ.querySelectorAll("script[src], link[src]").asArray
            .filter(item => IS_FACES_SOURCE(item.attr(ATTR_SRC).value))
            .map(item => item.attr(ATTR_SRC).value.match(regExp))
            .filter(item => item != null && item.length > 1)
            .map((result) => {
            return decodeURIComponent(result[1]);
        })) === null || _a === void 0 ? void 0 : _a[0]);
    }
    globalEval(code, nonce) {
        return new ExtDomQuery(super.globalEval(code, nonce !== null && nonce !== void 0 ? nonce : this.nonce));
    }
    // called from base class runScripts, do not delete
    // noinspection JSUnusedGlobalSymbols
    globalEvalSticky(code, nonce) {
        return new ExtDomQuery(super.globalEvalSticky(code, nonce !== null && nonce !== void 0 ? nonce : this.nonce));
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
        const ret = mona_dish_1.DomQuery.byId(selector, deep);
        return new ExtDomQuery(ret);
    }
    extractNonce(curScript) {
        var _a, _b;
        return (_b = (_a = curScript.getAsElem(0).value) === null || _a === void 0 ? void 0 : _a.nonce) !== null && _b !== void 0 ? _b : curScript.attr("nonce").value;
    }
    filter(func) {
        return new ExtDomQuery(super.filter(func));
    }
}
exports.ExtDomQuery = ExtDomQuery;
exports.ExtDQ = ExtDomQuery;
/**
 * in order to reduce the number of interception points for the fallbacks we add
 * the namespace remapping straight to our config accessors
 */
class ExtConfig extends mona_dish_1.Config {
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
        return super.get((0, Const_1.$nsp)(defaultVal));
    }
    delete(key) {
        return super.delete((0, Const_1.$nsp)(key));
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
        return new mona_dish_1.Es2019Array(...accessPath).map(key => (0, Const_1.$nsp)(key));
    }
}
exports.ExtConfig = ExtConfig;


/***/ }),

/***/ "./src/main/typescript/impl/util/FileUtils.ts":
/*!****************************************************!*\
  !*** ./src/main/typescript/impl/util/FileUtils.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFormInputsAsArr = exports.fixEmptyParameters = exports.resolveFiles = exports.decodeEncodedValues = exports.encodeFormData = void 0;
const mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
const ExtDomQuery_1 = __webpack_require__(/*! ./ExtDomQuery */ "./src/main/typescript/impl/util/ExtDomQuery.ts");
const Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
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
function encodeFormData(formData, paramsMapper = (inStr, inVal) => [inStr, inVal], defaultStr = Const_1.EMPTY_STR) {
    if (formData.isAbsent()) {
        return defaultStr;
    }
    const assocValues = formData.value;
    const expandValueArrAndRename = key => assocValues[key].map(val => paramsMapper(key, val));
    const isPropertyKey = key => assocValues.hasOwnProperty(key);
    const isNotFile = ([, value]) => !(value instanceof ExtDomQuery_1.ExtDomQuery.global().File);
    const mapIntoUrlParam = keyVal => `${encodeURIComponent(keyVal[0])}=${encodeURIComponent(keyVal[1])}`;
    return new mona_dish_1.Es2019Array(...Object.keys(assocValues))
        .filter(isPropertyKey)
        .flatMap(expandValueArrAndRename)
        .filter(isNotFile)
        .map(mapIntoUrlParam)
        .join("&");
}
exports.encodeFormData = encodeFormData;
/**
 * splits and decodes encoded values into strings containing of key=value
 * @param encoded encoded string
 */
function decodeEncodedValues(encoded) {
    const filterBlanks = item => !!(item || '').replace(/\s+/g, '');
    const splitKeyValuePair = line => {
        let index = line.indexOf("=");
        if (index == -1) {
            return [line];
        }
        return [line.substring(0, index), line.substring(index + 1)];
    };
    let requestParamEntries = decodeURIComponent(encoded).split(/&/gi);
    return requestParamEntries.filter(filterBlanks).map(splitKeyValuePair);
}
exports.decodeEncodedValues = decodeEncodedValues;
/**
 * gets all the input files and their corresponding file objects
 * @param dataSource
 */
function resolveFiles(dataSource) {
    const expandFilesArr = ([key, files]) => {
        return [...files].map(file => [key, file]);
    };
    const remapFileInput = fileInput => {
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
exports.resolveFiles = resolveFiles;
function fixEmptyParameters(keyVal) {
    var _a, _b;
    return (keyVal.length < 3 ? [(_a = keyVal === null || keyVal === void 0 ? void 0 : keyVal[0]) !== null && _a !== void 0 ? _a : [], (_b = keyVal === null || keyVal === void 0 ? void 0 : keyVal[1]) !== null && _b !== void 0 ? _b : []] : keyVal);
}
exports.fixEmptyParameters = fixEmptyParameters;
/**
 * returns the decoded viewState from parentItem
 * @param parentItem
 */
function resolveViewState(parentItem) {
    const viewStateStr = (0, Const_1.$faces)().getViewState(parentItem.getAsElem(0).value);
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
exports.getFormInputsAsArr = getFormInputsAsArr;


/***/ }),

/***/ "./src/main/typescript/impl/util/HiddenInputBuilder.ts":
/*!*************************************************************!*\
  !*** ./src/main/typescript/impl/util/HiddenInputBuilder.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HiddenInputBuilder = void 0;
const mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
const Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
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
        const isViewState = selector.indexOf((0, Const_1.$nsp)(Const_1.P_VIEWSTATE)) != -1;
        this.name = isViewState ? Const_1.P_VIEWSTATE : Const_1.P_CLIENT_WINDOW;
        this.template = isViewState ? Const_1.HTML_VIEWSTATE : Const_1.HTML_CLIENT_WINDOW;
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
        const SEP = (0, Const_1.$faces)().separatorchar;
        let existingStates = (0, mona_dish_1.DQ$)(`[name*='${(0, Const_1.$nsp)(this.name)}']`);
        let cnt = existingStates.asArray.map(state => {
            let ident = state.id.orElse("-1").value;
            ident = ident.substring(ident.lastIndexOf(SEP) + 1);
            return parseInt(ident);
        })
            .filter(item => {
            return !isNaN(item);
        })
            .reduce((item1, item2) => {
            return Math.max(item1, item2);
        }, -1);
        //the maximum  new ident is the current max + 1
        cnt++;
        const newElement = mona_dish_1.DQ.fromMarkup((0, Const_1.$nsp)(this.template));
        newElement.id.value = (((_a = this.namingContainerId) === null || _a === void 0 ? void 0 : _a.length) ?
            [this.namingContainerId, (0, Const_1.$nsp)(this.name), cnt] :
            [(0, Const_1.$nsp)(this.name), cnt]).join(SEP);
        //name must be prefixed with the naming container id as well according to the jsdocs
        if (this.namedViewRoot) {
            newElement.name.value = ((_b = this.namingContainerId) === null || _b === void 0 ? void 0 : _b.length) ?
                [this.namingContainerId, (0, Const_1.$nsp)(this.name)].join(SEP) : (0, Const_1.$nsp)(this.name);
        }
        else {
            newElement.name.value = (0, Const_1.$nsp)(this.name);
        }
        (_c = this === null || this === void 0 ? void 0 : this.parent) === null || _c === void 0 ? void 0 : _c.append(newElement);
        return newElement;
    }
}
exports.HiddenInputBuilder = HiddenInputBuilder;


/***/ }),

/***/ "./src/main/typescript/impl/util/Lang.ts":
/*!***********************************************!*\
  !*** ./src/main/typescript/impl/util/Lang.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtLang = void 0;
const mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
const Messages_1 = __webpack_require__(/*! ../i18n/Messages */ "./src/main/typescript/impl/i18n/Messages.ts");
const Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
const RequestDataResolver_1 = __webpack_require__(/*! ../xhrCore/RequestDataResolver */ "./src/main/typescript/impl/xhrCore/RequestDataResolver.ts");
const mona_dish_2 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
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
    function failSaveExecute(resolverProducer, defaultValue = null) {
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
    function getMessage(key, defaultMessage, ...templateParams) {
        var _a, _b;
        installedLocale = installedLocale !== null && installedLocale !== void 0 ? installedLocale : new Messages_1.Messages();
        let msg = (_b = (_a = installedLocale[key]) !== null && _a !== void 0 ? _a : defaultMessage) !== null && _b !== void 0 ? _b : key;
        templateParams.forEach((param, cnt) => {
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
        let queryElem = new mona_dish_1.DQ(elem);
        let eventTarget = (event) ? new mona_dish_1.DQ((0, RequestDataResolver_1.getEventTarget)(event)) : mona_dish_1.DomQuery.absent;
        if (queryElem.isTag(Const_1.HTML_TAG_FORM)) {
            return queryElem;
        }
        //html 5 for handling
        if (queryElem.attr(Const_1.HTML_TAG_FORM).isPresent()) {
            let formId = queryElem.attr(Const_1.HTML_TAG_FORM).value;
            let foundForm = mona_dish_1.DQ.byId(formId, true);
            if (foundForm.isPresent()) {
                return foundForm;
            }
        }
        let form = queryElem.firstParent(Const_1.HTML_TAG_FORM)
            .orElseLazy(() => queryElem.byTagName(Const_1.HTML_TAG_FORM, true))
            .orElseLazy(() => eventTarget.firstParent(Const_1.HTML_TAG_FORM))
            .orElseLazy(() => eventTarget.byTagName(Const_1.HTML_TAG_FORM))
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
     * expands an associative array into an array of key value tuples
     * @param value
     */
    function ofAssoc(value) {
        return new mona_dish_2.Es2019Array(...Object.keys(value))
            .map(key => [key, value[key]]);
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

/***/ "./src/main/typescript/impl/util/XhrQueueController.ts":
/*!*************************************************************!*\
  !*** ./src/main/typescript/impl/util/XhrQueueController.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.XhrQueueController = void 0;
const Lang_1 = __webpack_require__(/*! ./Lang */ "./src/main/typescript/impl/util/Lang.ts");
var debounce = Lang_1.ExtLang.debounce;
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
exports.XhrQueueController = XhrQueueController;


/***/ }),

/***/ "./src/main/typescript/impl/xhrCore/ErrorData.ts":
/*!*******************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/ErrorData.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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
const Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
const EventData_1 = __webpack_require__(/*! ./EventData */ "./src/main/typescript/impl/xhrCore/EventData.ts");
const Lang_1 = __webpack_require__(/*! ../util/Lang */ "./src/main/typescript/impl/util/Lang.ts");
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
class ErrorData extends EventData_1.EventData {
    constructor(source, errorName, errorMessage, responseText = null, responseXML = null, responseCode = "200", status = "", type = ErrorType.CLIENT_ERROR) {
        super();
        this.type = "error";
        this.source = document.getElementById(source);
        this.sourceId = source;
        this.type = Const_1.ERROR;
        this.errorName = errorName;
        //tck requires that the type is prefixed to the message itself (jsdoc also) in case of a server error
        this.message = this.errorMessage = (type == Const_1.SERVER_ERROR) ? type + ": " + errorMessage : errorMessage;
        this.responseCode = responseCode;
        this.responseText = responseText;
        this.status = status;
        this.typeDetails = type;
        if (type == ErrorType.SERVER_ERROR) {
            this.serverErrorName = this.errorName;
            this.serverErrorMessage = this.errorMessage;
        }
    }
    static fromClient(e) {
        var _a, _b, _c, _d;
        return new ErrorData((_a = e === null || e === void 0 ? void 0 : e.source) !== null && _a !== void 0 ? _a : "client", (_b = e === null || e === void 0 ? void 0 : e.name) !== null && _b !== void 0 ? _b : Const_1.EMPTY_STR, (_c = e === null || e === void 0 ? void 0 : e.message) !== null && _c !== void 0 ? _c : Const_1.EMPTY_STR, (_d = e === null || e === void 0 ? void 0 : e.stack) !== null && _d !== void 0 ? _d : Const_1.EMPTY_STR);
    }
    static fromHttpConnection(source, name, message, responseText, responseCode, status = Const_1.EMPTY_STR) {
        return new ErrorData(source, name, message, responseText, responseCode, `${responseCode}`, status, ErrorType.HTTP_ERROR);
    }
    static fromGeneric(context, errorCode, errorType = ErrorType.SERVER_ERROR) {
        let getMsg = this.getMsg;
        let source = getMsg(context, Const_1.SOURCE);
        let errorName = getMsg(context, Const_1.ERROR_NAME);
        let errorMessage = getMsg(context, Const_1.ERROR_MESSAGE);
        let status = getMsg(context, Const_1.STATUS);
        let responseText = getMsg(context, Const_1.RESPONSE_TEXT);
        let responseXML = getMsg(context, Const_1.RESPONSE_XML);
        return new ErrorData(source, errorName, errorMessage, responseText, responseXML, errorCode + Const_1.EMPTY_STR, status, errorType);
    }
    static getMsg(context, param) {
        return getMessage(context.getIf(param).orElse(Const_1.EMPTY_STR).value);
    }
    static fromServerError(context) {
        return this.fromGeneric(context, -1);
    }
}
exports.ErrorData = ErrorData;


/***/ }),

/***/ "./src/main/typescript/impl/xhrCore/EventData.ts":
/*!*******************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/EventData.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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
const mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
const Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
class EventData {
    static createFromRequest(request, context, /*event name*/ name) {
        var _a;
        let eventData = new EventData();
        eventData.type = Const_1.EVENT;
        eventData.status = name;
        let sourceId = context.getIf(Const_1.SOURCE)
            .orElseLazy(() => context.getIf(Const_1.P_AJAX_SOURCE).value)
            .orElseLazy(() => context.getIf(Const_1.CTX_PARAM_REQ_PASS_THR, Const_1.P_AJAX_SOURCE).value)
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
    }
}
exports.EventData = EventData;


/***/ }),

/***/ "./src/main/typescript/impl/xhrCore/RequestDataResolver.ts":
/*!*****************************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/RequestDataResolver.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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
exports.resolveDefaults = exports.getEventTarget = exports.resolveWindowId = exports.resolveDelay = exports.resolveTimeout = exports.resoveNamingContainerMapper = exports.resolveViewRootId = exports.resolveViewId = exports.resolveForm = exports.resolveFinalUrl = exports.resolveTargetUrl = exports.resolveHandlerFunc = void 0;
const mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
const Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
const Lang_1 = __webpack_require__(/*! ../util/Lang */ "./src/main/typescript/impl/util/Lang.ts");
const ExtDomQuery_1 = __webpack_require__(/*! ../util/ExtDomQuery */ "./src/main/typescript/impl/util/ExtDomQuery.ts");
const Assertions_1 = __webpack_require__(/*! ../util/Assertions */ "./src/main/typescript/impl/util/Assertions.ts");
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
    responseContext = responseContext || new mona_dish_1.Config({});
    return responseContext.getIf(funcName)
        .orElseLazy(() => requestContext.getIf(funcName).value)
        .orElse(Const_1.EMPTY_FUNC).value;
}
exports.resolveHandlerFunc = resolveHandlerFunc;
function resolveTargetUrl(srcFormElement) {
    return (typeof srcFormElement.elements[Const_1.ENCODED_URL] == 'undefined') ?
        srcFormElement.action :
        srcFormElement.elements[Const_1.ENCODED_URL].value;
}
exports.resolveTargetUrl = resolveTargetUrl;
function resolveFinalUrl(sourceForm, formData, ajaxType = Const_1.REQ_TYPE_POST) {
    let targetUrl = resolveTargetUrl(sourceForm.getAsElem(0).value);
    return targetUrl + (ajaxType == Const_1.REQ_TYPE_GET ? "?" + formData.toString() : Const_1.EMPTY_STR);
}
exports.resolveFinalUrl = resolveFinalUrl;
/**
 * form resolution the same way our old implementation did
 * it is either the id or the parent form of the element or an embedded form
 * of the element
 *
 * @param elem
 * @param event
 */
function resolveForm(elem, event) {
    return Lang_1.ExtLang.getForm(elem.getAsElem(0).value, event);
}
exports.resolveForm = resolveForm;
function resolveViewId(form) {
    const viewState = form.querySelectorAll(`input[type='hidden'][name*='${(0, Const_1.$nsp)(Const_1.P_VIEWSTATE)}']`).id.orElse("").value;
    const divider = (0, Const_1.$faces)().separatorchar;
    const viewId = viewState.split(divider, 2)[0];
    const viewStateViewId = viewId.indexOf((0, Const_1.$nsp)(Const_1.P_VIEWSTATE)) === -1 ? viewId : "";
    // myfaces specific, we in non portlet environments prepend the viewId
    // even without being in a naming container, the other components ignore that
    return form.id.value.indexOf(viewStateViewId) === 0 ? viewStateViewId : "";
}
exports.resolveViewId = resolveViewId;
function resolveViewRootId(form) {
    const viewState = form.querySelectorAll(`input[type='hidden'][name*='${(0, Const_1.$nsp)(Const_1.P_VIEWSTATE)}']`).attr("name").orElse("").value;
    const divider = (0, Const_1.$faces)().separatorchar;
    const viewId = viewState.split(divider, 2)[0];
    //different to the identifier the form id is never prepended to the viewstate
    return viewId.indexOf((0, Const_1.$nsp)(Const_1.P_VIEWSTATE)) === -1 ? viewId : "";
}
exports.resolveViewRootId = resolveViewRootId;
/**
 * as per jsdoc before the request it must be ensured that every post argument
 * is prefixed with the naming container id (there is an exception in mojarra with
 * the element=element param, which we have to follow here as well.
 * (inputs are prefixed by name anyway normally this only affects our standard parameters)
 * @private
 */
function resoveNamingContainerMapper(internalContext) {
    const isNamedViewRoot = internalContext.getIf(Const_1.NAMED_VIEWROOT).isPresent();
    if (!isNamedViewRoot) {
        return (key, value) => [key, value];
    }
    const partialId = internalContext.getIf(Const_1.NAMING_CONTAINER_ID).value;
    const SEP = (0, Const_1.$faces)().separatorchar;
    const prefix = partialId + SEP;
    return (key, value) => (key.indexOf(prefix) == 0) ? [key, value] : [prefix + key, value];
}
exports.resoveNamingContainerMapper = resoveNamingContainerMapper;
function resolveTimeout(options) {
    var _a;
    let getCfg = Lang_1.ExtLang.getLocalOrGlobalConfig;
    return (_a = options.getIf(Const_1.CTX_OPTIONS_TIMEOUT).value) !== null && _a !== void 0 ? _a : getCfg(options.value, Const_1.CTX_OPTIONS_TIMEOUT, 0);
}
exports.resolveTimeout = resolveTimeout;
/**
 * resolve the delay from the options and/or the request context and or the configuration
 *
 * @param options ... the options object, in most cases it will host the delay value
 */
function resolveDelay(options) {
    // null, 'none', or undefined will automatically be mapped to 0 aka no delay
    // the config delay will be dropped not needed anymore, it does not really
    // make sense anymore now that it is part of a local spec
    let ret = options.getIf(Const_1.CTX_OPTIONS_DELAY).orElse(0).value;
    // if delay === none, no delay must be used, aka delay 0
    ret = (Const_1.DELAY_NONE === ret) ? 0 : ret;
    // negative, or invalid values will automatically get a js exception
    Assertions_1.Assertions.assertDelay(ret);
    return ret;
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
function resolveDefaults(event, opts, el = null) {
    var _a;
    //deep copy the options, so that further transformations to not backfire into the callers
    const elem = mona_dish_1.DQ.byId(el || event.target, true);
    const options = new ExtDomQuery_1.ExtConfig(opts).deepCopy;
    return {
        options: options,
        elem: elem,
        elementId: elem.id.value,
        windowId: resolveWindowId(options),
        isResetValues: true === ((_a = options.value) === null || _a === void 0 ? void 0 : _a.resetValues)
    };
}
exports.resolveDefaults = resolveDefaults;


/***/ }),

/***/ "./src/main/typescript/impl/xhrCore/ResonseDataResolver.ts":
/*!*****************************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/ResonseDataResolver.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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
const mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
const Assertions_1 = __webpack_require__(/*! ../util/Assertions */ "./src/main/typescript/impl/util/Assertions.ts");
const mona_dish_2 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
const Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
const ExtDomQuery_1 = __webpack_require__(/*! ../util/ExtDomQuery */ "./src/main/typescript/impl/util/ExtDomQuery.ts");
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
    let ret = new mona_dish_1.XMLQuery((0, Const_1.$nsp)(request.getIf(Const_1.SEL_RESPONSE_XML).value));
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
    let externalContext = ExtDomQuery_1.ExtConfig.fromNullable(context);
    let internalContext = externalContext.getIf(Const_1.CTX_PARAM_MF_INTERNAL);
    if (!internalContext.isPresent()) {
        internalContext = ExtDomQuery_1.ExtConfig.fromNullable({});
    }
    /**
     * prepare storage for some deferred operations
     */
    internalContext.assign(Const_1.DEFERRED_HEAD_INSERTS).value = [];
    internalContext.assign(Const_1.UPDATE_FORMS).value = [];
    internalContext.assign(Const_1.UPDATE_ELEMS).value = [];
    return { externalContext, internalContext };
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
    let elemId = resolveSourceElementId(context, internalContext);
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
    let sourceFormId = internalContext.getIf(Const_1.CTX_PARAM_SRC_FRM_ID);
    let sourceForm = new mona_dish_2.DQ(sourceFormId.isPresent() ? document.forms[sourceFormId.value] : null);
    sourceForm = sourceForm.orElseLazy(() => elem.firstParent(Const_1.HTML_TAG_FORM))
        .orElseLazy(() => elem.querySelectorAll(Const_1.HTML_TAG_FORM))
        .orElseLazy(() => mona_dish_2.DQ.querySelectorAll(Const_1.HTML_TAG_FORM));
    return sourceForm;
}
exports.resolveSourceForm = resolveSourceForm;
function resolveSourceElementId(context, internalContext) {
    //?internal context?? used to be external one
    return internalContext.getIf(Const_1.CTX_PARAM_SRC_CTL_ID)
        .orElseLazy(() => context.getIf(Const_1.SOURCE, "id").value);
}


/***/ }),

/***/ "./src/main/typescript/impl/xhrCore/Response.ts":
/*!******************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/Response.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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
const mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
const ResponseProcessor_1 = __webpack_require__(/*! ./ResponseProcessor */ "./src/main/typescript/impl/xhrCore/ResponseProcessor.ts");
const Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
const ResonseDataResolver_1 = __webpack_require__(/*! ./ResonseDataResolver */ "./src/main/typescript/impl/xhrCore/ResonseDataResolver.ts");
const ExtDomQuery_1 = __webpack_require__(/*! ../util/ExtDomQuery */ "./src/main/typescript/impl/util/ExtDomQuery.ts");
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
        let req = ExtDomQuery_1.ExtConfig.fromNullable(request);
        let { externalContext, internalContext } = (0, ResonseDataResolver_1.resolveContexts)(context);
        let responseXML = (0, ResonseDataResolver_1.resolveResponseXML)(req);
        let responseProcessor = new ResponseProcessor_1.ResponseProcessor(req, externalContext, internalContext);
        internalContext.assign(Const_1.RESPONSE_XML).value = responseXML;
        // we now process the partial tags, or in none given raise an error
        responseXML.querySelectorAll(Const_1.XML_TAG_PARTIAL_RESP)
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
        internalContext.assignIf(!!partialId, Const_1.NAMING_CONTAINER_ID).value = partialId; // second case mojarra
        // there must be at least one container viewstate element resembling the viewroot that we know
        // this is named
        responseProcessor.updateNamedViewRootState();
        const SEL_SUB_TAGS = [Const_1.XML_TAG_ERROR, Const_1.XML_TAG_REDIRECT, Const_1.XML_TAG_CHANGES].join(",");
        // now we can process the main operations
        node.querySelectorAll(SEL_SUB_TAGS).each((node) => {
            switch (node.tagName.value) {
                case Const_1.XML_TAG_ERROR:
                    responseProcessor.error(node);
                    break;
                case Const_1.XML_TAG_REDIRECT:
                    responseProcessor.redirect(node);
                    break;
                case Const_1.XML_TAG_CHANGES:
                    processChangesTag(node, responseProcessor);
                    break;
            }
        });
    }
    let processInsert = function (responseProcessor, node) {
        // path1 insert after as child tags
        if (node.querySelectorAll([Const_1.XML_TAG_BEFORE, Const_1.XML_TAG_AFTER].join(",")).length) {
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
        const ALLOWED_TAGS = [Const_1.XML_TAG_UPDATE, Const_1.XML_TAG_EVAL, Const_1.XML_TAG_INSERT, Const_1.XML_TAG_DELETE, Const_1.XML_TAG_ATTRIBUTES, Const_1.XML_TAG_EXTENSION].join(", ");
        node.querySelectorAll(ALLOWED_TAGS).each((node) => {
            switch (node.tagName.value) {
                case Const_1.XML_TAG_UPDATE:
                    processUpdateTag(node, responseProcessor);
                    break;
                case Const_1.XML_TAG_EVAL:
                    responseProcessor.eval(node);
                    break;
                case Const_1.XML_TAG_INSERT:
                    processInsert(responseProcessor, node);
                    break;
                case Const_1.XML_TAG_DELETE:
                    responseProcessor.delete(node);
                    break;
                case Const_1.XML_TAG_ATTRIBUTES:
                    responseProcessor.attributes(node);
                    break;
                case Const_1.XML_TAG_EXTENSION:
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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
exports.ResponseProcessor = void 0;
const mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
const AjaxImpl_1 = __webpack_require__(/*! ../AjaxImpl */ "./src/main/typescript/impl/AjaxImpl.ts");
const Assertions_1 = __webpack_require__(/*! ../util/Assertions */ "./src/main/typescript/impl/util/Assertions.ts");
const ErrorData_1 = __webpack_require__(/*! ./ErrorData */ "./src/main/typescript/impl/xhrCore/ErrorData.ts");
const ImplTypes_1 = __webpack_require__(/*! ../core/ImplTypes */ "./src/main/typescript/impl/core/ImplTypes.ts");
const EventData_1 = __webpack_require__(/*! ./EventData */ "./src/main/typescript/impl/xhrCore/EventData.ts");
const Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
const ExtDomQuery_1 = __webpack_require__(/*! ../util/ExtDomQuery */ "./src/main/typescript/impl/util/ExtDomQuery.ts");
const HiddenInputBuilder_1 = __webpack_require__(/*! ../util/HiddenInputBuilder */ "./src/main/typescript/impl/util/HiddenInputBuilder.ts");
var trim = mona_dish_1.Lang.trim;
const Lang_1 = __webpack_require__(/*! ../util/Lang */ "./src/main/typescript/impl/util/Lang.ts");
var ofAssoc = Lang_1.ExtLang.ofAssoc;
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
        const shadowHead = shadowDocument.querySelectorAll(Const_1.HTML_TAG_HEAD);
        if (!shadowHead.isPresent()) {
            return;
        }
        const head = ExtDomQuery_1.ExtDomQuery.querySelectorAll(Const_1.HTML_TAG_HEAD);
        // full replace we delete everything
        head.childNodes.delete();
        this.addToHead(shadowHead);
        //we copy the attributes as well (just in case myfaces introduces the id in head)
        head.copyAttrs(shadowHead);
    }
    addToHead(shadowHead) {
        const mappedHeadData = new ExtDomQuery_1.ExtDomQuery(shadowHead);
        const scriptTags = [Const_1.HTML_TAG_SCRIPT];
        const nonExecutables = mappedHeadData.filter(item => scriptTags.indexOf(item.tagName.orElse("").value) == -1);
        nonExecutables.runHeadInserts(true);
        //incoming either the outer head tag or its children
        const nodesToAdd = (shadowHead.tagName.value === "HEAD") ? shadowHead.childNodes : shadowHead;
        // this is stored for "post" processing
        // after the rest of the "physical build up", head before body
        const scriptElements = new mona_dish_1.DomQuery(...nodesToAdd.asArray
            .filter(item => scriptTags.indexOf(item.tagName.orElse("").value) != -1));
        this.addToHeadDeferred(scriptElements);
    }
    addToHeadDeferred(newElements) {
        this.internalContext.assign(Const_1.DEFERRED_HEAD_INSERTS).value.push(newElements);
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
        const shadowBody = shadowDocument.querySelectorAll(Const_1.HTML_TAG_BODY);
        if (!shadowBody.isPresent()) {
            return;
        }
        const shadowInnerHTML = shadowBody.innerHTML;
        const resultingBody = ExtDomQuery_1.ExtDomQuery.querySelectorAll(Const_1.HTML_TAG_BODY);
        const updateForms = resultingBody.querySelectorAll(Const_1.HTML_TAG_FORM);
        // main difference, we cannot replace the body itself, but only its content
        // we need a separate step for post-processing the incoming
        // attributes, like classes, styles etc...
        resultingBody.html(shadowInnerHTML).copyAttrs(shadowBody);
        this.externalContext.assign((0, Const_1.$nsp)(Const_1.P_RENDER_OVERRIDE)).value = "@all";
        this.storeForPostProcessing(updateForms, resultingBody);
    }
    /**
     * Leaf Tag eval... process whatever is in the eval cdata block
     *
     * @param node the node to eval
     */
    eval(node) {
        ExtDomQuery_1.ExtDomQuery.globalEval(node.cDATAAsString);
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
        const mergedErrorData = new ExtDomQuery_1.ExtConfig({});
        mergedErrorData.assign(Const_1.SOURCE).value = this.externalContext.getIf(Const_1.P_AJAX_SOURCE).get(0).value;
        mergedErrorData.assign(Const_1.ERROR_NAME).value = node.querySelectorAll(Const_1.ERROR_NAME).textContent(Const_1.EMPTY_STR);
        mergedErrorData.assign(Const_1.ERROR_MESSAGE).value = node.querySelectorAll(Const_1.ERROR_MESSAGE).cDATAAsString;
        const hasResponseXML = this.internalContext.get(Const_1.RESPONSE_XML).isPresent();
        //we now store the response xml also in the error data for further details
        mergedErrorData.assignIf(hasResponseXML, Const_1.RESPONSE_XML).value = this.internalContext.getIf(Const_1.RESPONSE_XML).value.get(0).value;
        // error post-processing and enrichment (standard messages from keys)
        const errorData = ErrorData_1.ErrorData.fromServerError(mergedErrorData);
        // we now trigger an internally stored onError function which might be an attached to the context
        // either we do not have an internal on error, or an on error has been based via params from the outside.
        // In both cases they are attached to our contexts
        this.triggerOnError(errorData);
        AjaxImpl_1.Implementation.sendError(errorData);
    }
    /**
     * process the redirect operation
     *
     * @param node
     */
    redirect(node) {
        Assertions_1.Assertions.assertUrlExists(node);
        const redirectUrl = trim(node.attr(Const_1.ATTR_URL).value);
        if (redirectUrl != Const_1.EMPTY_STR) {
            window.location.href = redirectUrl;
        }
    }
    /**
     * processes the update operation and updates the node with the cdata block
     * @param node the xml response node hosting the update info
     * @param cdataBlock the cdata block with the new html code
     */
    update(node, cdataBlock) {
        const result = ExtDomQuery_1.ExtDomQuery.byId(node.id.value, true).outerHTML(cdataBlock, false, false);
        const sourceForm = result === null || result === void 0 ? void 0 : result.firstParent(Const_1.HTML_TAG_FORM).orElseLazy(() => result.byTagName(Const_1.HTML_TAG_FORM, true));
        if (sourceForm) {
            this.storeForPostProcessing(sourceForm, result);
        }
    }
    /**
     * Delete handler, simply deletes the node referenced by the xml data
     * @param node
     */
    delete(node) {
        mona_dish_1.DQ.byId(node.id.value, true).delete();
    }
    /**
     * attributes leaf tag... process the attributes
     *
     * @param node
     */
    attributes(node) {
        const elem = mona_dish_1.DQ.byId(node.id.value, true);
        node.byTagName(Const_1.XML_TAG_ATTR).each((item) => {
            elem.attr(item.attr(Const_1.ATTR_NAME).value).value = item.attr(Const_1.ATTR_VALUE).value;
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
        const before = node.attr(Const_1.XML_TAG_BEFORE);
        const after = node.attr(Const_1.XML_TAG_AFTER);
        const insertNodes = mona_dish_1.DQ.fromMarkup(node.cDATAAsString);
        if (before.isPresent()) {
            mona_dish_1.DQ.byId(before.value, true).insertBefore(insertNodes);
            this.internalContext.assign(Const_1.UPDATE_ELEMS).value.push(insertNodes);
        }
        if (after.isPresent()) {
            const domQuery = mona_dish_1.DQ.byId(after.value, true);
            domQuery.insertAfter(insertNodes);
            this.internalContext.assign(Const_1.UPDATE_ELEMS).value.push(insertNodes);
        }
    }
    /**
     * Handler for the case &lt;insert <&lt; before id="...
     *
     * @param node the node hosting the insert data
     */
    insertWithSubTags(node) {
        const before = node.querySelectorAll(Const_1.XML_TAG_BEFORE);
        const after = node.querySelectorAll(Const_1.XML_TAG_AFTER);
        before.each(item => {
            const insertId = item.attr(Const_1.ATTR_ID);
            const insertNodes = mona_dish_1.DQ.fromMarkup(item.cDATAAsString);
            if (insertId.isPresent()) {
                mona_dish_1.DQ.byId(insertId.value, true).insertBefore(insertNodes);
                this.internalContext.assign(Const_1.UPDATE_ELEMS).value.push(insertNodes);
            }
        });
        after.each(item => {
            const insertId = item.attr(Const_1.ATTR_ID);
            const insertNodes = mona_dish_1.DQ.fromMarkup(item.cDATAAsString);
            if (insertId.isPresent()) {
                mona_dish_1.DQ.byId(insertId.value, true).insertAfter(insertNodes);
                this.internalContext.assign(Const_1.UPDATE_ELEMS).value.push(insertNodes);
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
            this.internalContext.assign(Const_1.APPLIED_VST, node.id.value).value = new ImplTypes_1.StateHolder((0, Const_1.$nsp)(node.id.value), state);
            return true;
        }
        return false;
    }
    processClientWindow(node) {
        if (ResponseProcessor.isClientWindowNode(node)) {
            const state = node.cDATAAsString;
            this.internalContext.assign(Const_1.APPLIED_CLIENT_WINDOW, node.id.value).value = new ImplTypes_1.StateHolder((0, Const_1.$nsp)(node.id.value), state);
            return true;
        }
    }
    /**
     * generic global eval which runs the embedded css and scripts
     */
    globalEval() {
        //  phase one, if we have head inserts, we build up those before going into the script eval phase
        let insertHeadElems = new ExtDomQuery_1.ExtDomQuery(...this.internalContext.getIf(Const_1.DEFERRED_HEAD_INSERTS).value);
        insertHeadElems.runHeadInserts(true);
        // phase 2 we run a script eval on all updated elements in the body
        let updateElems = new ExtDomQuery_1.ExtDomQuery(...this.internalContext.getIf(Const_1.UPDATE_ELEMS).value);
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
        ofAssoc(this.internalContext.getIf(Const_1.APPLIED_VST).orElse({}).value)
            .forEach(([, value]) => {
            const namingContainerId = this.internalContext.getIf(Const_1.NAMING_CONTAINER_ID);
            const namedViewRoot = !!this.internalContext.getIf(Const_1.NAMED_VIEWROOT).value;
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
        ofAssoc(this.internalContext.getIf(Const_1.APPLIED_CLIENT_WINDOW).orElse({}).value)
            .forEach(([, value]) => {
            const namingContainerId = this.internalContext.getIf(Const_1.NAMING_CONTAINER_ID);
            const namedViewRoot = !!this.internalContext.getIf(Const_1.NAMED_VIEWROOT).value;
            const affectedForms = this.getContainerForms(namingContainerId)
                .filter(affectedForm => this.isInExecuteOrRender(affectedForm));
            this.appendClientWindowToForms(affectedForms, namedViewRoot, value.value, namingContainerId.orElse("").value);
        });
    }
    updateNamedViewRootState() {
        let partialId = this.internalContext.getIf(Const_1.NAMING_CONTAINER_ID);
        let namedViewRoot = this.internalContext.getIf(Const_1.NAMED_VIEWROOT);
        if (partialId.isPresent() &&
            (namedViewRoot.isAbsent() ||
                !namedViewRoot.value)) {
            const SEP = (0, Const_1.$faces)().separatorchar;
            this.internalContext.assign(Const_1.NAMED_VIEWROOT).value = (!!document.getElementById(partialId.value)) || (0, mona_dish_1.DQ$)(`input[name*='${(0, Const_1.$nsp)(Const_1.P_VIEWSTATE)}']`)
                .filter(node => node.attr("name").value.indexOf(partialId.value + SEP) == 0).length > 0;
        }
    }
    /**
     * all processing done we can close the request and send the appropriate events
     */
    done() {
        const eventData = EventData_1.EventData.createFromRequest(this.request.value, this.externalContext, Const_1.SUCCESS);
        //because some frameworks might decorate them over the context in the response
        const eventHandler = this.externalContext.getIf(Const_1.ON_EVENT).orElseLazy(() => this.internalContext.getIf(Const_1.ON_EVENT).value).orElse(Const_1.EMPTY_FUNC).value;
        AjaxImpl_1.Implementation.sendEvent(eventData, eventHandler);
    }
    /**
     * proper viewState -> form assignment
     *
     * @param forms the forms to append the viewState to
     * @param viewState the final viewState
     * @param namingContainerId
     */
    appendViewStateToForms(forms, namedViewRoot, viewState, namingContainerId = "") {
        this.assignState(forms, (0, Const_1.$nsp)(Const_1.SEL_VIEWSTATE_ELEM), namedViewRoot, viewState, namingContainerId);
    }
    /**
     * proper clientWindow -> form assignment
     *
     * @param forms the forms to append the viewState to
     * @param clientWindow the final viewState
     * @param namingContainerId
     */
    appendClientWindowToForms(forms, namedViewRoot, clientWindow, namingContainerId = "") {
        this.assignState(forms, (0, Const_1.$nsp)(Const_1.SEL_CLIENT_WINDOW_ELEM), namedViewRoot, clientWindow, namingContainerId);
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
            return new HiddenInputBuilder_1.HiddenInputBuilder(selector)
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
        this.internalContext.assign(Const_1.UPDATE_FORMS).value.push(updateForms);
    }
    /**
     * same for eval (js and css)
     *
     * @param toBeEvaluated
     */
    storeForEval(toBeEvaluated) {
        this.internalContext.assign(Const_1.UPDATE_ELEMS).value.push(toBeEvaluated);
    }
    /**
     * check whether a given XMLQuery node is an explicit viewState node
     *
     * @param node the node to check
     * @returns if it is a viewState node
     */
    static isViewStateNode(node) {
        var _a, _b, _c, _d, _e, _f;
        const SEP = (0, Const_1.$faces)().separatorchar;
        return "undefined" != typeof ((_a = node === null || node === void 0 ? void 0 : node.id) === null || _a === void 0 ? void 0 : _a.value) && (((_b = node === null || node === void 0 ? void 0 : node.id) === null || _b === void 0 ? void 0 : _b.value) == (0, Const_1.$nsp)(Const_1.P_VIEWSTATE) ||
            ((_d = (_c = node === null || node === void 0 ? void 0 : node.id) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.indexOf([SEP, (0, Const_1.$nsp)(Const_1.P_VIEWSTATE)].join(Const_1.EMPTY_STR))) != -1 ||
            ((_f = (_e = node === null || node === void 0 ? void 0 : node.id) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.indexOf([(0, Const_1.$nsp)(Const_1.P_VIEWSTATE), SEP].join(Const_1.EMPTY_STR))) != -1);
    }
    /**
     * incoming client window node also needs special processing
     *
     * @param node the node to check
     * @returns true of it ii
     */
    static isClientWindowNode(node) {
        var _a, _b, _c, _d, _e, _f;
        const SEP = (0, Const_1.$faces)().separatorchar;
        return "undefined" != typeof ((_a = node === null || node === void 0 ? void 0 : node.id) === null || _a === void 0 ? void 0 : _a.value) && (((_b = node === null || node === void 0 ? void 0 : node.id) === null || _b === void 0 ? void 0 : _b.value) == (0, Const_1.$nsp)(Const_1.P_CLIENT_WINDOW) ||
            ((_d = (_c = node === null || node === void 0 ? void 0 : node.id) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.indexOf([SEP, (0, Const_1.$nsp)(Const_1.P_CLIENT_WINDOW)].join(Const_1.EMPTY_STR))) != -1 ||
            ((_f = (_e = node === null || node === void 0 ? void 0 : node.id) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.indexOf([(0, Const_1.$nsp)(Const_1.P_CLIENT_WINDOW), SEP].join(Const_1.EMPTY_STR))) != -1);
    }
    triggerOnError(errorData) {
        this.externalContext.getIf(Const_1.ON_ERROR).orElseLazy(() => this.internalContext.getIf(Const_1.ON_ERROR).value).orElse(Const_1.EMPTY_FUNC).value(errorData);
    }
    /**
     * filters the forms according to being member of the "execute" or "render" cycle
     * @param affectedForm
     * @private
     */
    isInExecuteOrRender(affectedForm) {
        const executes = this.externalContext.getIf((0, Const_1.$nsp)(Const_1.P_EXECUTE)).orElse("@none").value.split(/\s+/gi);
        const renders = this.externalContext.getIf(Const_1.P_RENDER_OVERRIDE)
            .orElseLazy(() => this.externalContext.getIf((0, Const_1.$nsp)(Const_1.P_RENDER)).value)
            .orElse(Const_1.IDENT_NONE).value.split(/\s+/gi);
        const executeAndRenders = executes.concat(...renders);
        return [...executeAndRenders].filter(nameOrId => {
            if ([Const_1.IDENT_ALL, Const_1.IDENT_NONE].indexOf(nameOrId) != -1) {
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
            return (0, mona_dish_1.DQ$)(this.getNameOrIdSelector(namingContainerId.value))
                // missing condition if the naming container is not present we have to
                // use the body as fallback
                .orElseLazy(() => mona_dish_1.DQ.byTagName(Const_1.HTML_TAG_BODY))
                .byTagName(Const_1.HTML_TAG_FORM, true);
        }
        else {
            return mona_dish_1.DQ.byTagName(Const_1.HTML_TAG_FORM);
        }
    }
    getNameOrIdSelector(nameOrId) {
        return `[id='${nameOrId}'], [name='${nameOrId}']`;
    }
}
exports.ResponseProcessor = ResponseProcessor;


/***/ }),

/***/ "./src/main/typescript/impl/xhrCore/XhrFormData.ts":
/*!*********************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/XhrFormData.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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
const mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
const Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
const FileUtils_1 = __webpack_require__(/*! ../util/FileUtils */ "./src/main/typescript/impl/util/FileUtils.ts");
const Lang_1 = __webpack_require__(/*! ../util/Lang */ "./src/main/typescript/impl/util/Lang.ts");
var ofAssoc = Lang_1.ExtLang.ofAssoc;
const mona_dish_2 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
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
class XhrFormData extends mona_dish_1.Config {
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
                return new mona_dish_2.Es2019Array(...item).map(value => {
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
    toString(defaultStr = Const_1.EMPTY_STR) {
        return (0, FileUtils_1.encodeFormData)(this, this.paramsMapper, defaultStr);
    }
    /**
     * generic post init code, for now, this performs some post assign data post-processing
     * @param rootElement the root element which knows the request type (usually a form)
     * @param executes the executable dom nodes which need to be processed into the form data, which we can send
     * in our ajax request
     */
    resolveRequestType(rootElement, executes) {
        if (!executes || executes.indexOf(Const_1.IDENT_NONE) != -1) {
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
        if (this.getIf((0, Const_1.$nsp)(Const_1.P_VIEWSTATE)).isPresent()) {
            return;
        }
        let viewStateElement = form.querySelectorAllDeep(`[name*='${(0, Const_1.$nsp)(Const_1.P_VIEWSTATE)}'`);
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
        let inputs = (0, FileUtils_1.getFormInputsAsArr)(parentItem);
        inputs
            .map(FileUtils_1.fixEmptyParameters)
            .map(namingContainerRemap)
            .filter(partialIdsFilter)
            .forEach(mergeIntoThis);
    }
    remapKeyForNamingContainer(key) {
        return this.paramsMapper(key, "")[0];
    }
}
exports.XhrFormData = XhrFormData;


/***/ }),

/***/ "./src/main/typescript/impl/xhrCore/XhrRequest.ts":
/*!********************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/XhrRequest.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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
const AsyncRunnable_1 = __webpack_require__(/*! ../util/AsyncRunnable */ "./src/main/typescript/impl/util/AsyncRunnable.ts");
const mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
const AjaxImpl_1 = __webpack_require__(/*! ../AjaxImpl */ "./src/main/typescript/impl/AjaxImpl.ts");
const XhrFormData_1 = __webpack_require__(/*! ./XhrFormData */ "./src/main/typescript/impl/xhrCore/XhrFormData.ts");
const ErrorData_1 = __webpack_require__(/*! ./ErrorData */ "./src/main/typescript/impl/xhrCore/ErrorData.ts");
const EventData_1 = __webpack_require__(/*! ./EventData */ "./src/main/typescript/impl/xhrCore/EventData.ts");
const Lang_1 = __webpack_require__(/*! ../util/Lang */ "./src/main/typescript/impl/util/Lang.ts");
const Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
const RequestDataResolver_1 = __webpack_require__(/*! ./RequestDataResolver */ "./src/main/typescript/impl/xhrCore/RequestDataResolver.ts");
var failSaveExecute = Lang_1.ExtLang.failSaveExecute;
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
class XhrRequest extends AsyncRunnable_1.AsyncRunnable {
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
    constructor(requestContext, internalContext, timeout = Const_1.NO_TIMEOUT, ajaxType = Const_1.REQ_TYPE_POST, contentType = Const_1.URL_ENCODED) {
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
        let sourceForm = mona_dish_1.DQ.byId(this.internalContext.getIf(Const_1.CTX_PARAM_SRC_FRM_ID).value);
        let executesArr = () => {
            return this.requestContext.getIf(Const_1.CTX_PARAM_REQ_PASS_THR, Const_1.P_EXECUTE).get(Const_1.IDENT_NONE).value.split(/\s+/gi);
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
            const partialIdsArray = this.internalContext.getIf(Const_1.CTX_PARAM_PPS).value === true ? executes : [];
            const formData = new XhrFormData_1.XhrFormData(sourceForm, (0, RequestDataResolver_1.resoveNamingContainerMapper)(this.internalContext), executes, partialIdsArray);
            this.contentType = formData.isMultipartRequest ? "undefined" : this.contentType;
            // next step the pass through parameters are merged in for post params
            this.requestContext.$nspEnabled = false;
            const requestContext = this.requestContext;
            const requestPassThroughParams = requestContext.getIf(Const_1.CTX_PARAM_REQ_PASS_THR);
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
            this.responseContext = requestPassThroughParams.deepCopy;
            // we have to shift the internal passthroughs around to build up our response context
            const responseContext = this.responseContext;
            responseContext.assign(Const_1.CTX_PARAM_MF_INTERNAL).value = this.internalContext.value;
            // per spec the onEvent and onError handlers must be passed through to the response
            responseContext.assign(Const_1.ON_EVENT).value = requestContext.getIf(Const_1.ON_EVENT).value;
            responseContext.assign(Const_1.ON_ERROR).value = requestContext.getIf(Const_1.ON_ERROR).value;
            xhrObject.open(this.ajaxType, (0, RequestDataResolver_1.resolveFinalUrl)(sourceForm, formData, this.ajaxType), true);
            // adding timeout
            this.timeout ? xhrObject.timeout = this.timeout : null;
            // a bug in the xhr stub library prevents the setRequestHeader to be properly executed on fake xhr objects
            // normal browsers should resolve this
            // tests can quietly fail on this one
            if (this.contentType != "undefined") {
                ignoreErr(() => xhrObject.setRequestHeader(Const_1.CONTENT_TYPE, `${this.contentType}; charset=utf-8`));
            }
            ignoreErr(() => xhrObject.setRequestHeader(Const_1.HEAD_FACES_REQ, Const_1.VAL_AJAX));
            // probably not needed anymore, will test this
            // some webkit based mobile browsers do not follow the w3c spec of
            // setting, they accept headers automatically
            ignoreErr(() => xhrObject.setRequestHeader(Const_1.REQ_ACCEPT, Const_1.STD_ACCEPT));
            this.sendEvent(Const_1.BEGIN);
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
        this.handleGenericError(reject);
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
        this.sendEvent(Const_1.STATE_EVT_TIMEOUT);
        this.handleGenericError(resolve);
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
        var _a, _b, _c, _d;
        this.sendEvent(Const_1.COMPLETE);
        /*
         * second on error path
         */
        if (((_b = (_a = this.xhrObject) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : 0) >= 300 || !((_c = this === null || this === void 0 ? void 0 : this.xhrObject) === null || _c === void 0 ? void 0 : _c.responseXML)) {
            // all errors from the server are resolved without interfering in the queue
            this.handleGenericError(resolve);
            return;
        }
        (0, Const_1.$faces)().ajax.response(this.xhrObject, (_d = this.responseContext.value) !== null && _d !== void 0 ? _d : {});
    }
    handleGenericError(resolveOrReject) {
        var _a, _b, _c, _d;
        this.stopProgress = true;
        const errorData = {
            type: Const_1.ERROR,
            status: Const_1.MALFORMEDXML,
            responseCode: (_b = (_a = this.xhrObject) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : 400,
            responseText: (_d = (_c = this.xhrObject) === null || _c === void 0 ? void 0 : _c.responseText) !== null && _d !== void 0 ? _d : "Error",
            source: this.internalContext.getIf(Const_1.CTX_PARAM_SRC_CTL_ID).value
        };
        try {
            this.handleError(errorData, true);
        }
        finally {
            // we issue a resolveOrReject in this case to allow the system to recover
            // reject would clean up the queue
            // resolve would trigger the next element in the queue to be processed
            resolveOrReject(errorData);
        }
        // non blocking non clearing
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
        const isPost = this.ajaxType != Const_1.REQ_TYPE_GET;
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
        const eventData = EventData_1.EventData.createFromRequest(this.xhrObject, this.requestContext, evtType);
        try {
            // User code error, we might cover
            // this in onError, but also we cannot swallow it.
            // We need to resolve the local handlers lazily,
            // because some frameworks might decorate them over the context in the response
            let eventHandler = (0, RequestDataResolver_1.resolveHandlerFunc)(this.requestContext, this.responseContext, Const_1.ON_EVENT);
            AjaxImpl_1.Implementation.sendEvent(eventData, eventHandler);
        }
        catch (e) {
            e.source = (_a = e === null || e === void 0 ? void 0 : e.source) !== null && _a !== void 0 ? _a : this.requestContext.getIf(Const_1.SOURCE).value;
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
        const errorData = (responseFormatError) ? ErrorData_1.ErrorData.fromHttpConnection(exception.source, exception.type, exception.status, exception.responseText, exception.responseCode, exception.status) : ErrorData_1.ErrorData.fromClient(exception);
        const eventHandler = (0, RequestDataResolver_1.resolveHandlerFunc)(this.requestContext, this.responseContext, Const_1.ON_ERROR);
        AjaxImpl_1.Implementation.sendError(errorData, eventHandler);
    }
}
exports.XhrRequest = XhrRequest;


/***/ }),

/***/ "./src/main/typescript/myfaces/OamSubmit.ts":
/*!**************************************************!*\
  !*** ./src/main/typescript/myfaces/OamSubmit.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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
const mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
const Lang_1 = __webpack_require__(/*! ../impl/util/Lang */ "./src/main/typescript/impl/util/Lang.ts");
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
    var ofAssoc = Lang_1.ExtLang.ofAssoc;
    /**
     * sets a hidden input field
     * @param formName the formName
     * @param name the hidden field
     * @param value the value to be rendered
     */
    oam.setHiddenInput = function (formName, name, value) {
        mona_dish_1.DQ.byId(document.forms[formName])
            .each(form => {
            const input = form.querySelectorAll(`input[type='hidden'][name='${name}']`);
            if (input.isPresent()) {
                input.inputValue.value = value;
            }
            else {
                const newInput = mona_dish_1.DQ.fromMarkup(`<input type='hidden' id='${name}' name='${name}'>`);
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
        let element = (_c = (_b = (_a = document.forms) === null || _a === void 0 ? void 0 : _a[formName]) === null || _b === void 0 ? void 0 : _b.elements) === null || _c === void 0 ? void 0 : _c[name];
        if (!element) {
            return;
        }
        mona_dish_1.DQ.byId(element).delete();
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
        var _a, _b, _c, _d, _e, _f;
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
        mona_dish_1.DQ.byId((_f = (_e = document.forms) === null || _e === void 0 ? void 0 : _e[formName]) !== null && _f !== void 0 ? _f : document.getElementById(formName)).each(form => {
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
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
    const faces = (__webpack_require__(/*! ./_api */ "./src/main/typescript/api/_api.ts").faces);
    window['jsf'] = (_a = window === null || window === void 0 ? void 0 : window.jsf) !== null && _a !== void 0 ? _a : faces;
    window.jsf.specversion = 230000;
    delete window.jsf.contextpath;
    let faces4Init = faces.push.init;
    /*
     * we shim back the breaking api change from 3.0 to 4.0
     * onerror is gone
     */
    faces.push.init = (socketClientId, url, channel, onopen, onmessage, 
    // no on error api change for 4.0
    //onerror: Function,
    onclose, behaviors, autoConnect) => {
        faces4Init(socketClientId, url, channel, onopen, onmessage, null, onclose, behaviors, autoConnect);
    };
}
if (!((_b = window === null || window === void 0 ? void 0 : window.myfaces) === null || _b === void 0 ? void 0 : _b.ab)) {
    const myfaces = (__webpack_require__(/*! ./_api */ "./src/main/typescript/api/_api.ts").myfaces);
    //namespace might be extended is not exclusively reserved so we merge
    window["myfaces"] = (_c = window === null || window === void 0 ? void 0 : window.myfaces) !== null && _c !== void 0 ? _c : {};
    if (!((_d = window === null || window === void 0 ? void 0 : window.myfaces) === null || _d === void 0 ? void 0 : _d.ab)) {
        const myfaces = (__webpack_require__(/*! ./_api */ "./src/main/typescript/api/_api.ts").myfaces);
        //namespace might be extended is not exclusively reserved so we merge
        window["myfaces"] = (_e = window === null || window === void 0 ? void 0 : window.myfaces) !== null && _e !== void 0 ? _e : {};
        Object.keys(myfaces).forEach(key => { var _a, _b; return window.myfaces[key] = (_b = (_a = window.myfaces) === null || _a === void 0 ? void 0 : _a[key]) !== null && _b !== void 0 ? _b : myfaces[key]; });
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