/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/mona-dish/dist/js/commonjs/index_core.js":
/*!***************************************************************!*\
  !*** ./node_modules/mona-dish/dist/js/commonjs/index_core.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

!function(){"use strict";var t={585:function(t,e,r){var n,o=this&&this.__extends||(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},i.apply(this,arguments)},a=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function a(t){try{u(n.next(t))}catch(t){i(t)}}function l(t){try{u(n.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(a,l)}u((n=n.apply(t,e||[])).next())}))},l=this&&this.__generator||function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}},u=this&&this.__read||function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)a.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return a},s=this&&this.__spreadArray||function(t,e,r){if(r||2===arguments.length)for(var n,o=0,i=e.length;o<i;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))},c=this&&this.__values||function(t){var e="function"==typeof Symbol&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(e,"__esModule",{value:!0}),e.DQ=e.DomQueryCollector=e.DomQuery=e.ElementAttribute=void 0;var f,p=r(152),h=r(551),y=r(255),d=r(805),v=d.Lang.trim,m=d.Lang.objToArray,b=d.Lang.isString,g=d.Lang.equalsIgnoreCase;function S(t,e,r){return void 0===r&&(r={attributes:!0,childList:!0,subtree:!0,timeout:500,interval:100}),new Promise((function(n,o){var a=new Error("Mutation observer timeout");if(void 0!==window.MutationObserver){var l=setTimeout((function(){return o(a)}),r.timeout),u=new window.MutationObserver((function(t,r){var o=new x(t.map((function(t){return t.target}))).first(e);o.isPresent()&&(clearTimeout(l),n(o))})),s=i({},r);delete s.timeout,t.eachElem((function(t){u.observe(t,s)}))}else var c=setInterval((function(){var o=null;(o=r.childList?e(t)?t:t.childNodes.first(e):r.subtree?e(t)?t:t.querySelectorAll(" * ").first(e):e(t)?t:x.absent).isPresent()&&f&&(clearTimeout(f),clearInterval(c),c=null,n(o))}),r.interval),f=setTimeout((function(){c&&(clearInterval(c),o(a))}),r.timeout)}))}!function(t){t.SELECT="select",t.BUTTON="button",t.SUBMIT="submit",t.RESET="reset",t.IMAGE="image",t.RADIO="radio",t.CHECKBOX="checkbox"}(f||(f={}));var A=function(t){function e(e,r,n){void 0===n&&(n=null);var o=t.call(this,e,r)||this;return o.element=e,o.name=r,o.defaultVal=n,o}return o(e,t),Object.defineProperty(e.prototype,"value",{get:function(){var t,e=(t=this.element.get(0)).orElse.apply(t,[]).values;return e.length?e[0].getAttribute(this.name):this.defaultVal},set:function(t){for(var e,r=(e=this.element.get(0)).orElse.apply(e,[]).values,n=0;n<r.length;n++)r[n].setAttribute(this.name,t);r[0].setAttribute(this.name,t)},enumerable:!1,configurable:!0}),e.prototype.getClass=function(){return e},e.fromNullable=function(t,r){return void 0===r&&(r="value"),new e(t,r)},e}(p.ValueEmbedder);e.ElementAttribute=A;var w=function(t){return-1==t.indexOf("ln=scripts")&&-1==t.indexOf("ln=javax.faces")||-1==t.indexOf("/jsf.js")&&-1==t.indexOf("/jsf-uncompressed.js")},x=function(){function t(){for(var e,r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];if(this.rootNode=[],this.pos=-1,this._limits=-1,!p.Optional.fromNullable(r).isAbsent()&&r.length)for(var o=0;o<r.length;o++)if(b(r[o])){var i=t.querySelectorAll(r[o]);i.isAbsent()||r.push.apply(r,s([],u(i.values),!1))}else r[o]instanceof t?(e=this.rootNode).push.apply(e,s([],u(r[o].values),!1)):this.rootNode.push(r[o])}return Object.defineProperty(t.prototype,"value",{get:function(){return this.getAsElem(0)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"values",{get:function(){return this.allElems()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"id",{get:function(){return new A(this.get(0),"id")},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"length",{get:function(){return this.rootNode.length},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"tagName",{get:function(){return this.getAsElem(0).getIf("tagName")},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"nodeName",{get:function(){return this.getAsElem(0).getIf("nodeName")},enumerable:!1,configurable:!0}),t.prototype.isTag=function(t){return!this.isAbsent()&&(this.nodeName.orElse("__none___").value.toLowerCase()==t.toLowerCase()||this.tagName.orElse("__none___").value.toLowerCase()==t.toLowerCase())},Object.defineProperty(t.prototype,"type",{get:function(){return this.getAsElem(0).getIf("type")},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"name",{get:function(){return new p.ValueEmbedder(this.getAsElem(0).value,"name")},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"inputValue",{get:function(){return this.getAsElem(0).getIf("value").isPresent()?new p.ValueEmbedder(this.getAsElem(0).value):p.ValueEmbedder.absent},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"checked",{get:function(){return h.Stream.of.apply(h.Stream,s([],u(this.values),!1)).allMatch((function(t){return!!t.checked}))},set:function(t){this.eachElem((function(e){return e.checked=t}))},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"elements",{get:function(){return this.querySelectorAll("input, checkbox, select, textarea, fieldset")},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"deepElements",{get:function(){return this.querySelectorAllDeep("input, select, textarea, checkbox, fieldset")},enumerable:!1,configurable:!0}),t.prototype.querySelectorAllDeep=function(e){var r=[],n=this.querySelectorAll(e);n.length&&r.push(n);var o=this.querySelectorAll("*").shadowRoot;if(o.length){var i=o.querySelectorAllDeep(e);i.length&&r.push(i)}return new(t.bind.apply(t,s([void 0],u(r),!1)))},Object.defineProperty(t.prototype,"disabled",{get:function(){return this.attr("disabled").isPresent()},set:function(t){t?this.attr("disabled").value="disabled":this.removeAttribute("disabled")},enumerable:!1,configurable:!0}),t.prototype.removeAttribute=function(t){this.eachElem((function(e){return e.removeAttribute(t)}))},Object.defineProperty(t.prototype,"childNodes",{get:function(){var e=[];return this.eachElem((function(t){e=e.concat(m(t.childNodes))})),new(t.bind.apply(t,s([void 0],u(e),!1)))},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"stream",{get:function(){return new(h.Stream.bind.apply(h.Stream,s([void 0],u(this.asArray),!1)))},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"lazyStream",{get:function(){return h.LazyStream.of.apply(h.LazyStream,s([],u(this.asArray),!1))},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"asArray",{get:function(){return[].concat(h.LazyStream.of.apply(h.LazyStream,s([],u(this.rootNode),!1)).filter((function(t){return null!=t})).map((function(e){return t.byId(e)})).collect(new y.ArrayCollector))},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"asNodeArray",{get:function(){return[].concat(h.Stream.of(this.rootNode).filter((function(t){return null!=t})).collect(new y.ArrayCollector))},enumerable:!1,configurable:!0}),t.querySelectorAllDeep=function(e){return new t(document).querySelectorAllDeep(e)},t.querySelectorAll=function(e){return-1!=e.indexOf("/shadow/")?new t(document)._querySelectorAllDeep(e):new t(document)._querySelectorAll(e)},t.byId=function(e,r){return void 0===r&&(r=!1),b(e)?r?new t(document).byIdDeep(e):new t(document).byId(e):new t(e)},t.byTagName=function(e){return b(e)?new t(document).byTagName(e):new t(e)},t.globalEval=function(e,r){return new t(document).globalEval(e,r)},t.fromMarkup=function(e){var r=document.implementation.createHTMLDocument(""),n=(e=v(e)).toLowerCase();if(-1!=n.indexOf("<!doctype")||-1!=n.indexOf("<html")||-1!=n.indexOf("<head")||-1!=n.indexOf("<body"))return r.documentElement.innerHTML=e,new t(r.documentElement);var o=function(t,e){var r=["<",e,">"].join(""),n=["<",e," "].join("");return 0==t.indexOf(r)||0==t.indexOf(n)},i=new t(document.createElement("div"));return o(n,"thead")||o(n,"tbody")?(i.html("<table>".concat(e,"</table>")),i.querySelectorAll("table").get(0).childNodes.detach()):o(n,"tfoot")?(i.html("<table><thead></thead><tbody><tbody".concat(e,"</table>")),i.querySelectorAll("table").get(2).childNodes.detach()):o(n,"tr")?(i.html("<table><tbody>".concat(e,"</tbody></table>")),i.querySelectorAll("tbody").get(0).childNodes.detach()):o(n,"td")?(i.html("<table><tbody><tr>".concat(e,"</tr></tbody></table>")),i.querySelectorAll("tr").get(0).childNodes.detach()):(i.html(e),i.childNodes.detach())},t.prototype.get=function(e){return e<this.rootNode.length?new t(this.rootNode[e]):t.absent},t.prototype.getAsElem=function(t,e){return void 0===e&&(e=p.Optional.absent),t<this.rootNode.length?p.Optional.fromNullable(this.rootNode[t]):e},t.prototype.filesFromElem=function(t){var e;return t<this.rootNode.length&&(null===(e=this.rootNode[t])||void 0===e?void 0:e.files)?this.rootNode[t].files:[]},t.prototype.allElems=function(){return this.rootNode},t.prototype.isAbsent=function(){return 0==this.length},t.prototype.isPresent=function(t){var e=this.isAbsent();return!e&&t&&t.call(this,this),!e},t.prototype.ifPresentLazy=function(t){return void 0===t&&(t=function(){}),this.isPresent.call(this,t),this},t.prototype.delete=function(){this.eachElem((function(t){t.parentNode&&t.parentNode.removeChild(t)}))},t.prototype.querySelectorAll=function(t){return-1!=t.indexOf("/shadow/")?this._querySelectorAllDeep(t):this._querySelectorAll(t)},t.prototype._querySelectorAll=function(e){var r,n;if(!(null===(r=null==this?void 0:this.rootNode)||void 0===r?void 0:r.length))return this;for(var o=[],i=0;i<this.rootNode.length;i++)if(null===(n=this.rootNode[i])||void 0===n?void 0:n.querySelectorAll){var a=this.rootNode[i].querySelectorAll(e);o=o.concat(m(a))}return new(t.bind.apply(t,s([void 0],u(o),!1)))},t.prototype._querySelectorAllDeep=function(e){var r;if(!(null===(r=null==this?void 0:this.rootNode)||void 0===r?void 0:r.length))return this;for(var n=new(t.bind.apply(t,s([void 0],u(this.rootNode),!1))),o=e.split(/\/shadow\//),i=0;i<o.length;i++)if(""!=o[i]){var a=o[i];n=n.querySelectorAll(a),i<o.length-1&&(n=n.shadowRoot)}return n},t.prototype.byId=function(e,r){var n=[];return r&&(n=n.concat(h.LazyStream.of.apply(h.LazyStream,s([],u((null==this?void 0:this.rootNode)||[]),!1)).filter((function(t){return e==t.id})).map((function(e){return new t(e)})).collect(new y.ArrayCollector))),n=n.concat(this.querySelectorAll('[id="'.concat(e,'"]'))),new(t.bind.apply(t,s([void 0],u(n),!1)))},t.prototype.byIdDeep=function(e,r){var n=[];r&&(n=n.concat(h.LazyStream.of.apply(h.LazyStream,s([],u((null==this?void 0:this.rootNode)||[]),!1)).filter((function(t){return e==t.id})).map((function(e){return new t(e)})).collect(new y.ArrayCollector)));var o=this.querySelectorAllDeep('[id="'.concat(e,'"]'));return o.length&&n.push(o),new(t.bind.apply(t,s([void 0],u(n),!1)))},t.prototype.byTagName=function(e,r,n){var o,i=[];return r&&(i=h.LazyStream.of.apply(h.LazyStream,s([],u(null!==(o=null==this?void 0:this.rootNode)&&void 0!==o?o:[]),!1)).filter((function(t){return(null==t?void 0:t.tagName)==e})).reduce((function(t,e){return t.concat([e])}),i).orElse(i).value),n?i.push(this.querySelectorAllDeep(e)):i.push(this.querySelectorAll(e)),new(t.bind.apply(t,s([void 0],u(i),!1)))},t.prototype.attr=function(t,e){return void 0===e&&(e=null),new A(this,t,e)},t.prototype.hasClass=function(t){var e=!1;return this.eachElem((function(r){if(e=r.classList.contains(t))return!1})),e},t.prototype.addClass=function(t){return this.eachElem((function(e){return e.classList.add(t)})),this},t.prototype.removeClass=function(t){return this.eachElem((function(e){return e.classList.remove(t)})),this},t.prototype.isMultipartCandidate=function(t){var e=this;void 0===t&&(t=!1);return this.stream.filter((function(r){return function(r){var n;return 0!=r.length&&(1==r.length?"input"==r.tagName.get("booga").value.toLowerCase()&&"file"==((null===(n=r.attr("type"))||void 0===n?void 0:n.value)||"").toLowerCase()||(t?e.querySelectorAllDeep("input[type='file']").firstElem().isPresent():e.querySelectorAll("input[type='file']").firstElem().isPresent()):r.isMultipartCandidate(t))}(r)})).first().isPresent()},t.prototype.html=function(t){return p.Optional.fromNullable(t).isAbsent()?this.isPresent()?p.Optional.fromNullable(this.innerHtml):p.Optional.absent:(this.innerHtml=t,this)},t.prototype.dispatchEvent=function(t){return this.eachElem((function(e){return e.dispatchEvent(t)})),this},Object.defineProperty(t.prototype,"innerHtml",{get:function(){var t=[];return this.eachElem((function(e){return t.push(e.innerHTML)})),t.join("")},set:function(t){this.eachElem((function(e){return e.innerHTML=t}))},enumerable:!1,configurable:!0}),t.prototype._mozMatchesSelector=function(t,e){var r=t,n=r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector||function(e){for(var r=(document||window.ownerDocument).querySelectorAll(e),n=r.length;--n>=0&&r.item(n)!==t;);return n>-1};return n.call(t,e)},t.prototype.filterSelector=function(e){var r=this,n=[];return this.eachElem((function(t){r._mozMatchesSelector(t,e)&&n.push(t)})),new(t.bind.apply(t,s([void 0],u(n),!1)))},t.prototype.matchesSelector=function(t){var e=this;return this.eachElem((function(r){if(!e._mozMatchesSelector(r,t))return!1})),!0},t.prototype.getIf=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var r=this.childNodes,n=0;n<t.length;n++)if((r=r.filterSelector(t[n])).isAbsent())return r;return r},t.prototype.eachElem=function(t){for(var e=0,r=this.rootNode.length;e<r&&!1!==t(this.rootNode[e],e);e++);return this},t.prototype.firstElem=function(t){return void 0===t&&(t=function(t){return t}),this.rootNode.length>1&&t(this.rootNode[0],0),this},t.prototype.each=function(e){return h.Stream.of.apply(h.Stream,s([],u(this.rootNode),!1)).each((function(r,n){if(null!=r)return e(t.byId(r),n)})),this},t.prototype.first=function(t){return void 0===t&&(t=function(t){return t}),this.rootNode.length>=1?(t(this.get(0),0),this.get(0)):this},t.prototype.filter=function(e){var r=[];return this.each((function(t){e(t)&&r.push(t)})),new(t.bind.apply(t,s([void 0],u(r),!1)))},t.prototype.globalEval=function(t,e){var r=document.getElementsByTagName("head")[0]||document.documentElement,n=document.createElement("script");e&&n.setAttribute("nonce",e),n.type="text/javascript",n.innerHTML=t;var o=r.appendChild(n);return r.removeChild(o),this},t.prototype.detach=function(){return this.eachElem((function(t){t.parentNode.removeChild(t)})),this},t.prototype.appendTo=function(t){this.eachElem((function(e){t.getAsElem(0).orElseLazy((function(){return{appendChild:function(t){}}})).value.appendChild(e)}))},t.prototype.loadScriptEval=function(t,e,r){var n=this;void 0===e&&(e=0),void 0===r&&(r="utf-8");var o=new XMLHttpRequest;return o.open("GET",t,!1),r&&o.setRequestHeader("Content-Type","application/x-javascript; charset:"+r),o.send(null),o.onload=function(r){e?setTimeout((function(){n.globalEval(o.responseText+"\r\n//@ sourceURL="+t)}),e):n.globalEval(o.responseText.replace(/\n/g,"\r\n")+"\r\n//@ sourceURL="+t)},o.onerror=function(t){throw Error(t)},this},t.prototype.insertAfter=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this.each((function(t){for(var r=t.getAsElem(0).value,n=r.parentNode,o=function(t){var o=r.nextSibling;e[t].eachElem((function(t){o?(n.insertBefore(t,o),r=o):n.appendChild(t)}))},i=0;i<e.length;i++)o(i)}));var n=[];return n.push(this),n=n.concat(e),new(t.bind.apply(t,s([void 0],u(n),!1)))},t.prototype.insertBefore=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this.each((function(t){for(var r=t.getAsElem(0).value,n=r.parentNode,o=0;o<e.length;o++)e[o].eachElem((function(t){n.insertBefore(t,r)}))}));var n=[];return n.push(this),n=n.concat(e),new(t.bind.apply(t,s([void 0],u(n),!1)))},t.prototype.orElse=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return this.isPresent()?this:new(t.bind.apply(t,s([void 0],u(e),!1)))},t.prototype.orElseLazy=function(e){return this.isPresent()?this:new t(e())},t.prototype.parents=function(e){var r=new Set,n=[],o=e.toLowerCase(),i=function(t){(t.tagName||"").toLowerCase()!=o||r.has(t)||(r.add(t),n.push(t))};return this.eachElem((function(t){for(var r;t.parentNode||t.host;)if(t=null!==(r=null==t?void 0:t.parentNode)&&void 0!==r?r:null==t?void 0:t.host,i(t),"form"==e&&n.length)return!1})),new(t.bind.apply(t,s([void 0],u(n),!1)))},t.prototype.copyAttrs=function(t){var e=this;return t.eachElem((function(t){var r,n,o=m(t.attributes);try{for(var i=c(o),a=i.next();!a.done;a=i.next()){var l=a.value,u=l.value,s=l.name;switch(s){case"id":e.id.value=u;break;case"disabled":e.resolveAttributeHolder("disabled").disabled=u;break;case"checked":e.resolveAttributeHolder("checked").checked=u;break;default:e.attr(s).value=u}}}catch(t){r={error:t}}finally{try{a&&!a.done&&(n=i.return)&&n.call(i)}finally{if(r)throw r.error}}})),this},t.prototype.resolveAttributeHolder=function(t){void 0===t&&(t="value");var e=[];return e[t]=null,t in this.getAsElem(0).value?this.getAsElem(0).value:e},t.prototype.outerHTML=function(e,r,n,o){var i;if(void 0===o&&(o=!1),!this.isAbsent()){var a=null===(i=null===document||void 0===document?void 0:document.activeElement)||void 0===i?void 0:i.id,l=a?t.getCaretPosition(document.activeElement):null,c=t.fromMarkup(e),f=[],p=this.getAsElem(0).value,h=c.get(0),y=p.parentNode,d=h.getAsElem(0).value;if(y.replaceChild(d,p),f.push(new t(d)),this.isAbsent())return this;var v=[];c.length>1&&(v=v.concat.apply(v,s([],u(c.values.slice(1)),!1)),f.push(t.byId(d).insertAfter(new(t.bind.apply(t,s([void 0],u(v),!1)))))),r&&this.runScripts(),n&&this.runCss();var m=t.byId(a);return a&&m.isPresent()&&null!=l&&void 0!==l&&m.eachElem((function(e){return t.setCaretPosition(e,l)})),c}},t.prototype.runScripts=function(e){var r=this;void 0===e&&(e=w);var n=[],o=g,i=function(t){var i=t.tagName,a=t.type||"";if(i&&o(i,"script")&&(""===a||o(a,"text/javascript")||o(a,"javascript")||o(a,"text/ecmascript")||o(a,"ecmascript"))){var l=t.getAttribute("src");if(void 0!==l&&null!=l&&l.length>0)e(l)&&(n.length&&(r.globalEval(n.join("\n")),n=[]),r.loadScriptEval(l,0,"UTF-8"));else{for(var u=v(t.text||t.innerText||t.innerHTML),s=!0;s;)s=!1,"\x3c!--"==u.substring(0,4)&&(u=u.substring(4),s=!0),"//\x3c!--"==u.substring(0,4)&&(u=u.substring(6),s=!0),"//<![CDATA["==u.substring(0,11)&&(u=u.substring(11),s=!0);n.push(u)}}};try{new t(this.filterSelector("script"),this.querySelectorAll("script")).stream.flatMap((function(t){return h.Stream.of(t.values)})).sort((function(t,e){return t.compareDocumentPosition(e)-3})).each((function(t){return i(t)})),n.length&&this.globalEval(n.join("\n"))}catch(t){window.console&&window.console.error&&console.error(t.message||t.description)}finally{i=null}return this},t.prototype.runCss=function(){var e=function(t,e){var r,n,o,i,a=document.createElement("style");document.getElementsByTagName("head")[0].appendChild(a);var l=null!==(r=a.sheet)&&void 0!==r?r:a.styleSheet;a.setAttribute("rel",null!==(n=t.getAttribute("rel"))&&void 0!==n?n:"stylesheet"),a.setAttribute("type",null!==(o=t.getAttribute("type"))&&void 0!==o?o:"text/css"),null!==(i=null==l?void 0:l.cssText)&&void 0!==i&&i?l.cssText=e:a.appendChild(document.createTextNode(e))};return new t(this.filterSelector("link, style"),this.querySelectorAll("link, style")).stream.flatMap((function(t){return h.Stream.of(t.values)})).sort((function(t,e){return t.compareDocumentPosition(e)-3})).each((function(t){return function(t){var r=t.tagName;if(r&&g(r,"link")&&g(t.getAttribute("type"),"text/css"))e(t,"@import url('"+t.getAttribute("href")+"');");else if(r&&g(r,"style")&&g(t.getAttribute("type"),"text/css")){var n=[],o=Array.prototype.slice.call(t.childNodes);o?o.forEach((function(t){return n.push(t.innerHTML||t.data)})):t.innerHTML&&n.push(t.innerHTML),e(t,n.join(""))}}(t)})),this},t.prototype.click=function(){return this.fireEvent("click"),this},t.prototype.addEventListener=function(t,e,r){return this.eachElem((function(n){return n.addEventListener(t,e,r)})),this},t.prototype.removeEventListener=function(t,e,r){return this.eachElem((function(n){return n.removeEventListener(t,e,r)})),this},t.prototype.fireEvent=function(t){this.eachElem((function(e){var r;if(e.ownerDocument)r=e.ownerDocument;else{if(9!=e.nodeType)throw new Error("Invalid node passed to fireEvent: "+e.id);r=e}if(e.dispatchEvent){var n="";switch(t){case"click":case"mousedown":case"mouseup":n="MouseEvents";break;case"focus":case"change":case"blur":case"select":n="HTMLEvents";break;default:throw"fireEvent: Couldn't find an event class for event '"+t+"'."}var o=r.createEvent(n);o.initEvent(t,!0,!0),o.synthetic=!0,e.dispatchEvent(o)}else if(e.fireEvent){var i=r.createEventObject();i.synthetic=!0,e.fireEvent("on"+t,i)}}))},t.prototype.textContent=function(t){return void 0===t&&(t=""),this.stream.map((function(t){return t.getAsElem(0).orElseLazy((function(){return{textContent:""}})).value.textContent||""})).reduce((function(e,r){return e+t+r}),"").value},t.prototype.innerText=function(t){return void 0===t&&(t=""),this.stream.map((function(t){return t.getAsElem(0).orElseLazy((function(){return{innerText:""}})).value.innerText||""})).reduce((function(e,r){return[e,r].join(t)}),"").value},t.prototype.encodeFormElement=function(t){if(void 0===t&&(t=new p.Config({})),!this.name.isAbsent()){var e=t.shallowCopy;return this.each((function(t){var r,n;if(!t.name.isAbsent()){var o=t.name.value,i=t.tagName.orElse("__none__").value.toLowerCase(),a=t.type.orElse("__none__").value.toLowerCase();if(a=a.toLowerCase(),("input"==i||"textarea"==i||"select"==i)&&null!=o&&""!=o&&!t.disabled){if("select"==i){var l=t.getAsElem(0).value;if(l.selectedIndex>=0)for(var u=l.options.length,s=0;s<u;s++)if(l.options[s].selected){var c=l.options[s];e.append(o).value=null!=c.getAttribute("value")?c.value:c.text}}if(i!=f.SELECT&&a!=f.BUTTON&&a!=f.RESET&&a!=f.SUBMIT&&a!=f.IMAGE&&(a!=f.CHECKBOX&&a!=f.RADIO||t.checked)){var p=null!==(n=null===(r=t.value.value)||void 0===r?void 0:r.files)&&void 0!==n?n:[];(null==p?void 0:p.length)?e.append(o).value=p[0]:e.append(o).value=t.inputValue.value}}}})),e}},Object.defineProperty(t.prototype,"cDATAAsString",{get:function(){return this.lazyStream.flatMap((function(t){return t.childNodes.stream})).filter((function(t){var e,r;return 4==(null===(r=null===(e=null==t?void 0:t.value)||void 0===e?void 0:e.value)||void 0===r?void 0:r.nodeType)})).reduce((function(t,e){var r,n,o;return t.push(null!==(o=null===(n=null===(r=null==e?void 0:e.value)||void 0===r?void 0:r.value)||void 0===n?void 0:n.data)&&void 0!==o?o:""),t}),[]).value.join("")},enumerable:!1,configurable:!0}),t.prototype.subNodes=function(e,r){return p.Optional.fromNullable(r).isAbsent()&&(r=this.length),new(t.bind.apply(t,s([void 0],u(this.rootNode.slice(e,Math.min(r,this.length))),!1)))},t.prototype.limits=function(t){return this._limits=t,this},t.prototype.hasNext=function(){var t=-1!=this._limits&&this.pos>=this._limits-1,e=this.pos>=this.values.length-1;return!(t||e)},t.prototype.next=function(){return this.hasNext()?(this.pos++,new t(this.values[this.pos])):null},t.prototype.reset=function(){this.pos=-1},t.prototype.attachShadow=function(e){void 0===e&&(e={mode:"open"});var r=[];return this.eachElem((function(n){var o;if(!(null==n?void 0:n.attachShadow))throw new Error("Shadow dom creation not supported by the browser, please use a shim, to gain this functionality");o=t.byId(n.attachShadow(e)),r.push(o)})),new(t.bind.apply(t,s([void 0],u(r),!1)))},t.prototype.waitUntilDom=function(t,e){return void 0===e&&(e={attributes:!0,childList:!0,subtree:!0,timeout:500,interval:100}),a(this,void 0,void 0,(function(){return l(this,(function(r){return[2,S(this,t,e)]}))}))},Object.defineProperty(t.prototype,"shadowElements",{get:function(){var e=(this.querySelectorAll("*").filter((function(t){return t.hasShadow})).allElems()||[]).map((function(t){return t.shadowRoot}));return new(t.bind.apply(t,s([void 0],u(e),!1)))},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"shadowRoot",{get:function(){for(var e=[],r=0;r<this.rootNode.length;r++)this.rootNode[r].shadowRoot&&e.push(this.rootNode[r].shadowRoot);return new(t.bind.apply(t,s([void 0],u(e),!1)))},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"hasShadow",{get:function(){for(var t=0;t<this.rootNode.length;t++)if(this.rootNode[t].shadowRoot)return!0;return!1},enumerable:!1,configurable:!0}),t.getCaretPosition=function(t){var e=0;try{if(null===document||void 0===document?void 0:document.selection){t.focus();var r=document.selection.createRange();r.moveStart("character",-t.value.length),e=r.text.length}}catch(t){}return e},t.setCaretPosition=function(t,e){(null==t?void 0:t.focus)&&(null==t||t.focus()),(null==t?void 0:t.setSelectiongRange)&&(null==t||t.setSelectiongRange(e,e))},t.prototype[Symbol.iterator]=function(){var t=this;return{next:function(){return{done:!t.hasNext(),value:t.next()}}}},t.absent=new t,t}();e.DomQuery=x;var E=function(){function t(){this.data=[]}return t.prototype.collect=function(t){this.data.push(t)},Object.defineProperty(t.prototype,"finalValue",{get:function(){return new(x.bind.apply(x,s([void 0],u(this.data),!1)))},enumerable:!1,configurable:!0}),t}();e.DomQueryCollector=E,e.DQ=x},805:function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.Lang=void 0;var n=r(152);!function(t){function e(t){for(var e=/\s/,r=(t=t.replace(/^\s\s*/,"")).length;e.test(t.charAt(--r)););return t.slice(0,r+1)}function r(t){return!!arguments.length&&null!=t&&("string"==typeof t||t instanceof String)}t.saveResolve=function(t,e){void 0===e&&(e=null);try{var r=t();return n.Optional.fromNullable(null!=r?r:e)}catch(t){return n.Optional.absent}},t.saveResolveLazy=function(t,e){void 0===e&&(e=null);try{var r=t();return n.Optional.fromNullable(null!=r?r:e())}catch(t){return n.Optional.absent}},t.strToArray=function(t,r){void 0===r&&(r=/\./gi);var n=[];return t.split(r).forEach((function(t){n.push(e(t))})),n},t.trim=e,t.objToArray=function(t,e,r){return void 0===e&&(e=0),void 0===r&&(r=[]),"__undefined__"==(null!=t?t:"__undefined__")?null!=r?r:null:t instanceof Array&&!e&&!r?t:r.concat(Array.prototype.slice.call(t,e))},t.equalsIgnoreCase=function(t,e){var r=null!=e?e:"___no_value__";return(null!=t?t:"___no_value__").toLowerCase()===r.toLowerCase()},t.assertType=function(t,e){return r(e)?typeof t==e:t instanceof e},t.isString=r,t.isFunc=function(t){return t instanceof Function||"function"==typeof t},t.objAssign=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];if(null==t)throw new TypeError("Cannot convert undefined or null to object");var n=Object(t);return Object.assign?(e.forEach((function(t){return Object.assign(n,t)})),n):(e.filter((function(t){return null!=t})).forEach((function(t){var e=t;Object.keys(e).filter((function(t){return Object.prototype.hasOwnProperty.call(e,t)})).forEach((function(t){return n[t]=e[t]}))})),n)}}(e.Lang||(e.Lang={}))},152:function(t,e,r){var n,o=this&&this.__extends||(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),i=this&&this.__read||function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)a.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return a},a=this&&this.__spreadArray||function(t,e,r){if(r||2===arguments.length)for(var n,o=0,i=e.length;o<i;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))};Object.defineProperty(e,"__esModule",{value:!0}),e.Config=e.ValueEmbedder=e.Optional=e.Monad=void 0;var l=r(805),u=r(255),s=r(551),c=l.Lang.objAssign,f=function(){function t(t){this._value=t}return Object.defineProperty(t.prototype,"value",{get:function(){return this._value},enumerable:!1,configurable:!0}),t.prototype.map=function(e){return e||(e=function(t){return t}),new t(e(this.value))},t.prototype.flatMap=function(e){for(var r=this.map(e);(null==r?void 0:r.value)instanceof t;)r=r.value;return r},t}();e.Monad=f;var p=function(t){function e(e){return t.call(this,e)||this}return o(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this._value instanceof f?this._value.flatMap().value:this._value},enumerable:!1,configurable:!0}),e.fromNullable=function(t){return new e(t)},e.prototype.isAbsent=function(){return void 0===this.value||null==this.value},e.prototype.isPresent=function(t){var e=this.isAbsent();return!e&&t&&t.call(this,this),!e},e.prototype.ifPresentLazy=function(t){return void 0===t&&(t=function(){}),this.isPresent.call(this,t),this},e.prototype.orElse=function(t){return this.isPresent()?this:null==t?e.absent:this.flatMap((function(){return t}))},e.prototype.orElseLazy=function(t){return this.isPresent()?this:this.flatMap(t)},e.prototype.flatMap=function(r){var n=t.prototype.flatMap.call(this,r);return n instanceof e?n.flatMap():e.fromNullable(n.value)},e.prototype.getIf=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var r=this,n=0;n<t.length;n++){var o=this.keyVal(t[n]),i=this.arrayIndex(t[n]);if(""===o&&i>=0){if((r=this.getClass().fromNullable(r.value instanceof Array?r.value.length<i?null:r.value[i]:null)).isAbsent())return r}else if(o&&i>=0){if(r.getIfPresent(o).isAbsent())return r;if((r=r.getIfPresent(o).value instanceof Array?this.getClass().fromNullable(r.getIfPresent(o).value[i]):this.getClass().absent).isAbsent())return r}else{if((r=r.getIfPresent(o)).isAbsent())return r;i>-1&&(r=this.getClass().fromNullable(r.value[i]))}}return r},e.prototype.match=function(t){return!this.isAbsent()&&t(this.value)},e.prototype.get=function(t){return void 0===t&&(t=e.absent),this.isAbsent()?this.getClass().fromNullable(t).flatMap():this.getClass().fromNullable(this.value).flatMap()},e.prototype.toJson=function(){return JSON.stringify(this.value)},e.prototype.getClass=function(){return e},e.prototype.arrayIndex=function(t){var e=t.indexOf("["),r=t.indexOf("]");return e>=0&&r>0&&e<r?parseInt(t.substring(e+1,r)):-1},e.prototype.keyVal=function(t){var e=t.indexOf("[");return e>=0?t.substring(0,e):t},e.prototype.getIfPresent=function(t){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[t]).flatMap()},e.prototype.resolve=function(t){if(this.isAbsent())return e.absent;try{return e.fromNullable(t(this.value))}catch(t){return e.absent}},e.absent=e.fromNullable(null),e}(f);e.Optional=p;var h=function(t){function e(e,r){void 0===r&&(r="value");var n=t.call(this,e)||this;return n.key=r,n}return o(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this._value?this._value[this.key]:null},set:function(t){this._value&&(this._value[this.key]=t)},enumerable:!1,configurable:!0}),e.prototype.orElse=function(t){var r={};return r[this.key]=t,this.isPresent()?this:new e(r,this.key)},e.prototype.orElseLazy=function(t){if(this.isPresent())return this;var r={};return r[this.key]=t(),new e(r,this.key)},e.prototype.getClass=function(){return e},e.fromNullable=function(t,r){return void 0===r&&(r="value"),new e(t,r)},e.absent=e.fromNullable(null),e}(p);e.ValueEmbedder=h;var y=function(t){function e(e,r,n){var o=t.call(this,e,r)||this;return o.arrPos=null!=n?n:-1,o}return o(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return""==this.key&&this.arrPos>=0?this._value[this.arrPos]:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]:this._value[this.key]},set:function(t){""==this.key&&this.arrPos>=0?this._value[this.arrPos]=t:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]=t:this._value[this.key]=t},enumerable:!1,configurable:!0}),e.absent=e.fromNullable(null),e}(h),d=function(t){function e(e){return t.call(this,e)||this}return o(e,t),Object.defineProperty(e.prototype,"shallowCopy",{get:function(){return new e(s.Stream.ofAssoc(this.value).collect(new u.AssocArrayCollector))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"deepCopy",{get:function(){return new e(c({},this.value))},enumerable:!1,configurable:!0}),e.fromNullable=function(t){return new e(t)},e.prototype.shallowMerge=function(t,e,r){var n=this;void 0===e&&(e=!0),void 0===r&&(r=!1);var o=function(o){!e&&o in l.value||(r?Array.isArray(t.getIf(o).value)?s.Stream.of.apply(s.Stream,a([],i(t.getIf(o).value),!1)).each((function(t){return n.append(o).value=t})):l.append(o).value=t.getIf(o).value:l.assign(o).value=t.getIf(o).value)},l=this;for(var u in t.value)o(u)},e.prototype.append=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=t.length<1;if(!r){var n=t[t.length-1],o=(this.keyVal(n),this.getIf.apply(this,a([],i(t),!1)).isPresent());this.buildPath(t);var l=this.arrayIndex(n);if(l>-1)throw Error("Append only possible on non array properties, use assign on indexed data");var u=this.getIf.apply(this,a([],i(t),!1)).value;Array.isArray(u)||(u=this.assign.apply(this,a([],i(t),!1)).value=[u]),o&&u.push({}),l=u.length-1;var s=new y(1==t.length?this.value:this.getIf.apply(this,t.slice(0,t.length-1)).value,n,l);return s}},e.prototype.appendIf=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return t?this.append.apply(this,a([],i(e),!1)):{value:null}},e.prototype.assign=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(!(t.length<1)){this.buildPath(t);var r=this.keyVal(t[t.length-1]),n=this.arrayIndex(t[t.length-1]),o=new y(1==t.length?this.value:this.getIf.apply(this,t.slice(0,t.length-1)).value,r,n);return o}},e.prototype.assignIf=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return t?this.assign.apply(this,a([],i(e),!1)):{value:null}},e.prototype.getIf=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return this.getClass().fromNullable(t.prototype.getIf.apply(this,e).value)},e.prototype.get=function(e){return this.getClass().fromNullable(t.prototype.get.call(this,e).value)},e.prototype.delete=function(t){return t in this.value&&delete this.value[t],this},e.prototype.toJson=function(){return JSON.stringify(this.value)},e.prototype.getClass=function(){return e},e.prototype.setVal=function(t){this._value=t},e.prototype.buildPath=function(t){for(var e=this,r=this.getClass().fromNullable(null),n=-1,o=function(t,e){for(var r=t.length,n=r+e,o=r;o<n;o++)t.push({})},i=0;i<t.length;i++){var a=this.keyVal(t[i]),l=this.arrayIndex(t[i]);if(""===a&&l>=0)e.setVal(e.value instanceof Array?e.value:[]),o(e.value,l+1),n>=0&&(r.value[n]=e.value),r=e,n=l,e=this.getClass().fromNullable(e.value[l]);else{var u=e.getIf(a);if(-1==l)u.isAbsent()?u=this.getClass().fromNullable(e.value[a]={}):e=u;else{var s=u.value instanceof Array?u.value:[];o(s,l+1),e.value[a]=s,u=this.getClass().fromNullable(s[l])}r=e,n=l,e=u}}return this},e}(p);e.Config=d},255:function(t,e,r){var n=this&&this.__read||function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)a.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return a},o=this&&this.__spreadArray||function(t,e,r){if(r||2===arguments.length)for(var n,o=0,i=e.length;o<i;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))};Object.defineProperty(e,"__esModule",{value:!0}),e.QueryFormStringCollector=e.QueryFormDataCollector=e.FormDataCollector=e.AssocArrayCollector=e.Run=e.ArrayAssocArrayCollector=e.ArrayCollector=e.FlatMapStreamDataSource=e.MappedStreamDataSource=e.FilteredStreamDatasource=e.ArrayStreamDataSource=e.SequenceDataSource=void 0;var i=r(551),a=function(){function t(t,e){this.total=e,this.start=t,this.value=t}return t.prototype.hasNext=function(){return this.value<this.total},t.prototype.next=function(){return Math.min(this.value++,this.total-1)},t.prototype.reset=function(){this.value=0},t}();e.SequenceDataSource=a;var l=function(){function t(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.dataPos=-1,this.value=t}return t.prototype.hasNext=function(){return this.value.length-1>this.dataPos},t.prototype.next=function(){return this.dataPos++,this.value[this.dataPos]},t.prototype.reset=function(){this.dataPos=-1},t}();e.ArrayStreamDataSource=l;var u=function(){function t(t,e){this.filteredNext=null,this.filterFunc=t,this.inputDataSource=e}return t.prototype.hasNext=function(){for(;null==this.filteredNext&&this.inputDataSource.hasNext();){var t=this.inputDataSource.next();if(this.filterFunc(t))return this.filteredNext=t,!0;this.filteredNext=null}return null!=this.filteredNext},t.prototype.next=function(){var t=this.filteredNext;return this.filteredNext=null,this.hasNext(),t},t.prototype.reset=function(){this.filteredNext=null,this.inputDataSource.reset()},t}();e.FilteredStreamDatasource=u;var s=function(){function t(t,e){this.mapFunc=t,this.inputDataSource=e}return t.prototype.hasNext=function(){return this.inputDataSource.hasNext()},t.prototype.next=function(){return this.mapFunc(this.inputDataSource.next())},t.prototype.reset=function(){this.inputDataSource.reset()},t}();e.MappedStreamDataSource=s;var c=function(){function t(t,e){this.mapFunc=t,this.inputDataSource=e}return t.prototype.hasNext=function(){return this.resolveCurrentNext()||this.resolveNextNext()},t.prototype.resolveCurrentNext=function(){var t=!1;return this.activeDataSource&&(t=this.activeDataSource.hasNext()),t},t.prototype.resolveNextNext=function(){for(var t=!1;!t&&this.inputDataSource.hasNext();){var e=this.mapFunc(this.inputDataSource.next());Array.isArray(e)?this.activeDataSource=new(l.bind.apply(l,o([void 0],n(e),!1))):this.activeDataSource=e,t=this.activeDataSource.hasNext()}return t},t.prototype.next=function(){return this.activeDataSource.next()},t.prototype.reset=function(){this.inputDataSource.reset()},t}();e.FlatMapStreamDataSource=c;var f=function(){function t(){this.data=[]}return t.prototype.collect=function(t){this.data.push(t)},Object.defineProperty(t.prototype,"finalValue",{get:function(){return this.data},enumerable:!1,configurable:!0}),t}();e.ArrayCollector=f;var p=function(){function t(){this.finalValue={}}return t.prototype.collect=function(t){var e,r,n,o,i=null!==(e=null==t?void 0:t[0])&&void 0!==e?e:t;this.finalValue[i]=null!==(n=null===(r=this.finalValue)||void 0===r?void 0:r[i])&&void 0!==n?n:[],this.finalValue[i].push(null===(o=null==t?void 0:t[1])||void 0===o||o)},t}();e.ArrayAssocArrayCollector=p;var h=function(){function t(){}return t.prototype.collect=function(t){},Object.defineProperty(t.prototype,"finalValue",{get:function(){return null},enumerable:!1,configurable:!0}),t}();e.Run=h;var y=function(){function t(){this.finalValue={}}return t.prototype.collect=function(t){var e,r;this.finalValue[null!==(e=t[0])&&void 0!==e?e:t]=null===(r=t[1])||void 0===r||r},t}();e.AssocArrayCollector=y;var d=function(){function t(){this.finalValue=new FormData}return t.prototype.collect=function(t){this.finalValue.append(t.key,t.value)},t}();e.FormDataCollector=d;var v=function(){function t(){this.finalValue=new FormData}return t.prototype.collect=function(t){var e=t.encodeFormElement();e.isPresent()&&this.finalValue.append(t.name.value,e.get(t.name).value)},t}();e.QueryFormDataCollector=v;var m=function(){function t(){this.formData=[]}return t.prototype.collect=function(t){var e=t.encodeFormElement();e.isPresent()&&this.formData.push([t.name.value,e.get(t.name).value])},Object.defineProperty(t.prototype,"finalValue",{get:function(){return i.Stream.of.apply(i.Stream,o([],n(this.formData),!1)).map((function(t){return t.join("=")})).reduce((function(t,e){return[t,e].join("&")})).orElse("").value},enumerable:!1,configurable:!0}),t}();e.QueryFormStringCollector=m},551:function(t,e,r){var n=this&&this.__read||function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)a.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return a},o=this&&this.__spreadArray||function(t,e,r){if(r||2===arguments.length)for(var n,o=0,i=e.length;o<i;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))};Object.defineProperty(e,"__esModule",{value:!0}),e.LazyStream=e.Stream=void 0;var i=r(152),a=r(255),l=function(){function t(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._limits=-1,this.pos=-1,this.value=t}return t.of=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return new(t.bind.apply(t,o([void 0],n(e),!1)))},t.ofAssoc=function(t){return this.of.apply(this,o([],n(Object.keys(t)),!1)).map((function(e){return[e,t[e]]}))},t.ofDataSource=function(e){for(var r=[];e.hasNext();)r.push(e.next());return new(t.bind.apply(t,o([void 0],n(r),!1)))},t.prototype.limits=function(t){return this._limits=t,this},t.prototype.concat=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return t.of.apply(t,o([this],n(e),!1)).flatMap((function(t){return t}))},t.prototype.onElem=function(t){for(var e=0;e<this.value.length&&(-1==this._limits||e<this._limits)&&!1!==t(this.value[e],e);e++);return this},t.prototype.each=function(t){this.onElem(t)},t.prototype.map=function(e){e||(e=function(t){return t});var r=[];return this.each((function(t,n){r.push(e(t))})),new(t.bind.apply(t,o([void 0],n(r),!1)))},t.prototype.flatMap=function(e){var r=[];return this.each((function(t){var i=e(t);r=Array.isArray(i)?r.concat(i):r.concat.apply(r,o([],n(i.value),!1))})),t.of.apply(t,o([],n(r),!1))},t.prototype.filter=function(e){var r=[];return this.each((function(t){e(t)&&r.push(t)})),new(t.bind.apply(t,o([void 0],n(r),!1)))},t.prototype.reduce=function(t,e){void 0===e&&(e=null);for(var r=null!=e?0:1,n=null!=e?e:this.value.length?this.value[0]:null,o=r;o<this.value.length&&(-1==this._limits||o<this._limits);o++)n=t(n,this.value[o]);return i.Optional.fromNullable(n)},t.prototype.first=function(){return this.value&&this.value.length?i.Optional.fromNullable(this.value[0]):i.Optional.absent},t.prototype.last=function(){var t=this._limits>0?Math.min(this._limits,this.value.length):this.value.length;return i.Optional.fromNullable(t?this.value[t-1]:null)},t.prototype.anyMatch=function(t){for(var e=0;e<this.value.length&&(-1==this._limits||e<this._limits);e++)if(t(this.value[e]))return!0;return!1},t.prototype.allMatch=function(t){if(!this.value.length)return!1;for(var e=0,r=0;r<this.value.length;r++)t(this.value[r])&&e++;return e==this.value.length},t.prototype.noneMatch=function(t){for(var e=0,r=0;r<this.value.length;r++)t(this.value[r])||e++;return e==this.value.length},t.prototype.sort=function(e){var r=this.value.slice().sort(e);return t.of.apply(t,o([],n(r),!1))},t.prototype.collect=function(t){return this.each((function(e){return t.collect(e)})),t.finalValue},t.prototype.hasNext=function(){var t=-1!=this._limits&&this.pos>=this._limits-1,e=this.pos>=this.value.length-1;return!(t||e)},t.prototype.next=function(){return this.hasNext()?(this.pos++,this.value[this.pos]):null},t.prototype[Symbol.iterator]=function(){var t=this;return{next:function(){return{done:!t.hasNext(),value:t.next()}}}},t.prototype.reset=function(){this.pos=-1},t}();e.Stream=l;var u=function(){function t(t){this._limits=-1,this.pos=-1,this.dataSource=t}return t.of=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return new t(new(a.ArrayStreamDataSource.bind.apply(a.ArrayStreamDataSource,o([void 0],n(e),!1))))},t.ofAssoc=function(t){return this.of.apply(this,o([],n(Object.keys(t)),!1)).map((function(e){return[e,t[e]]}))},t.ofStreamDataSource=function(e){return new t(e)},t.prototype.hasNext=function(){return!this.isOverLimits()&&this.dataSource.hasNext()},t.prototype.next=function(){var t=this.dataSource.next();return this.pos++,t},t.prototype.reset=function(){this.dataSource.reset(),this.pos=0,this._limits=-1},t.prototype.concat=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return t.of.apply(t,o([this],n(e),!1)).flatMap((function(t){return t}))},t.prototype.nextFilter=function(t){if(this.hasNext()){var e=this.next();return t(e)?e:this.nextFilter(t)}return null},t.prototype.limits=function(t){return this._limits=t,this},t.prototype.collect=function(t){for(;this.hasNext();){var e=this.next();t.collect(e)}return t.finalValue},t.prototype.onElem=function(e){var r=this;return new t(new a.MappedStreamDataSource((function(t){return!1===e(t,r.pos)&&r.stop(),t}),this))},t.prototype.filter=function(e){return new t(new a.FilteredStreamDatasource(e,this))},t.prototype.map=function(e){return new t(new a.MappedStreamDataSource(e,this))},t.prototype.flatMap=function(e){return new t(new a.FlatMapStreamDataSource(e,this))},t.prototype.each=function(t){for(;this.hasNext();)!1===t(this.next())&&this.stop()},t.prototype.reduce=function(t,e){if(void 0===e&&(e=null),!this.hasNext())return i.Optional.absent;var r=null,n=null;if(null!=e)r=e,n=this.next();else{if(r=this.next(),!this.hasNext())return i.Optional.fromNullable(r);n=this.next()}for(r=t(r,n);this.hasNext();)r=t(r,n=this.next());return i.Optional.fromNullable(r)},t.prototype.last=function(){return this.hasNext()?this.reduce((function(t,e){return e})):i.Optional.absent},t.prototype.first=function(){return this.reset(),this.hasNext()?i.Optional.fromNullable(this.next()):i.Optional.absent},t.prototype.anyMatch=function(t){for(;this.hasNext();)if(t(this.next()))return!0;return!1},t.prototype.allMatch=function(t){for(;this.hasNext();)if(!t(this.next()))return!1;return!0},t.prototype.noneMatch=function(t){for(;this.hasNext();)if(t(this.next()))return!1;return!0},t.prototype.sort=function(e){var r=this.collect(new a.ArrayCollector);return r=r.sort(e),t.of.apply(t,o([],n(r),!1))},Object.defineProperty(t.prototype,"value",{get:function(){return this.collect(new a.ArrayCollector)},enumerable:!1,configurable:!0}),t.prototype[Symbol.iterator]=function(){var t=this;return{next:function(){return{done:!t.hasNext(),value:t.next()}}}},t.prototype.stop=function(){this.pos=this._limits+1e9},t.prototype.isOverLimits=function(){return-1!=this._limits&&this.pos>=this._limits-1},t}();e.LazyStream=u},121:function(t,e,r){var n,o=this&&this.__extends||(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0}),e.XQ=e.XMLQuery=void 0;var i=r(805),a=r(585),l=i.Lang.isString,u=function(t){function e(e,r){void 0===r&&(r="text/xml");var n;return l(e)?t.call(this,null==(n=e)?null:i.Lang.saveResolveLazy((function(){return new window.DOMParser}),(function(){return(t=new ActiveXObject("Microsoft.XMLDOM")).async=!1,{parseFromString:function(e,r){return t.loadXML(e)}};var t})).value.parseFromString(n,r))||this:t.call(this,e)||this}return o(e,t),e.prototype.isXMLParserError=function(){return this.querySelectorAll("parsererror").isPresent()},e.prototype.toString=function(){var t=[];return this.eachElem((function(e){var r,n,o,i=null!==(o=null===(n=null===(r=null===window||void 0===window?void 0:window.XMLSerializer)||void 0===r?void 0:r.constructor())||void 0===n?void 0:n.serializeToString(e))&&void 0!==o?o:null==e?void 0:e.xml;i&&t.push(i)})),t.join("")},e.prototype.parserErrorText=function(t){return this.querySelectorAll("parsererror").textContent(t)},e.parseXML=function(t){return new e(t)},e.parseHTML=function(t){return new e(t,"text/html")},e.fromString=function(t,r){return void 0===r&&(r="text/xml"),new e(t,r)},e}(a.DomQuery);e.XMLQuery=u,e.XQ=u}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n].call(i.exports,i,i.exports,r),i.exports}var n={};!function(){var t=n;Object.defineProperty(t,"__esModule",{value:!0}),t.QueryFormDataCollector=t.FormDataCollector=t.AssocArrayCollector=t.ArrayCollector=t.QueryFormStringCollector=t.SequenceDataSource=t.FlatMapStreamDataSource=t.FilteredStreamDatasource=t.MappedStreamDataSource=t.ArrayStreamDataSource=t.LazyStream=t.Stream=t.XQ=t.XMLQuery=t.ValueEmbedder=t.Optional=t.Monad=t.Config=t.Lang=t.DQ=t.DomQueryCollector=t.ElementAttribute=t.DomQuery=void 0;var e=r(585);Object.defineProperty(t,"DomQuery",{enumerable:!0,get:function(){return e.DomQuery}}),Object.defineProperty(t,"ElementAttribute",{enumerable:!0,get:function(){return e.ElementAttribute}}),Object.defineProperty(t,"DomQueryCollector",{enumerable:!0,get:function(){return e.DomQueryCollector}}),Object.defineProperty(t,"DQ",{enumerable:!0,get:function(){return e.DQ}});var o=r(805);Object.defineProperty(t,"Lang",{enumerable:!0,get:function(){return o.Lang}});var i=r(152);Object.defineProperty(t,"Config",{enumerable:!0,get:function(){return i.Config}}),Object.defineProperty(t,"Monad",{enumerable:!0,get:function(){return i.Monad}}),Object.defineProperty(t,"Optional",{enumerable:!0,get:function(){return i.Optional}}),Object.defineProperty(t,"ValueEmbedder",{enumerable:!0,get:function(){return i.ValueEmbedder}});var a=r(121);Object.defineProperty(t,"XMLQuery",{enumerable:!0,get:function(){return a.XMLQuery}}),Object.defineProperty(t,"XQ",{enumerable:!0,get:function(){return a.XQ}});var l=r(551);Object.defineProperty(t,"Stream",{enumerable:!0,get:function(){return l.Stream}}),Object.defineProperty(t,"LazyStream",{enumerable:!0,get:function(){return l.LazyStream}});var u=r(255);Object.defineProperty(t,"ArrayStreamDataSource",{enumerable:!0,get:function(){return u.ArrayStreamDataSource}}),Object.defineProperty(t,"MappedStreamDataSource",{enumerable:!0,get:function(){return u.MappedStreamDataSource}}),Object.defineProperty(t,"FilteredStreamDatasource",{enumerable:!0,get:function(){return u.FilteredStreamDatasource}}),Object.defineProperty(t,"FlatMapStreamDataSource",{enumerable:!0,get:function(){return u.FlatMapStreamDataSource}}),Object.defineProperty(t,"SequenceDataSource",{enumerable:!0,get:function(){return u.SequenceDataSource}}),Object.defineProperty(t,"QueryFormStringCollector",{enumerable:!0,get:function(){return u.QueryFormStringCollector}}),Object.defineProperty(t,"ArrayCollector",{enumerable:!0,get:function(){return u.ArrayCollector}}),Object.defineProperty(t,"AssocArrayCollector",{enumerable:!0,get:function(){return u.AssocArrayCollector}}),Object.defineProperty(t,"FormDataCollector",{enumerable:!0,get:function(){return u.FormDataCollector}}),Object.defineProperty(t,"QueryFormDataCollector",{enumerable:!0,get:function(){return u.QueryFormDataCollector}})}();var o=exports;for(var i in n)o[i]=n[i];n.__esModule&&Object.defineProperty(o,"__esModule",{value:!0})}();
//# sourceMappingURL=index_core.js.map

/***/ }),

/***/ "./src/main/typescript/api/Jsf.ts":
/*!****************************************!*\
  !*** ./src/main/typescript/api/_api.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.myfaces = exports.jsf = void 0;
///<reference types='../../types/typedefs'/>
var AjaxImpl_1 = __webpack_require__(/*! ../impl/AjaxImpl */ "./src/main/typescript/impl/AjaxImpl.ts");
var PushImpl_1 = __webpack_require__(/*! ../impl/PushImpl */ "./src/main/typescript/impl/PushImpl.ts");
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
     * @return the window identifier or null if none is found
     * @param rootNode
     */
    function getClientWindow(rootNode) {
        return AjaxImpl_1.Implementation.getClientWindow(rootNode);
    }
    jsf.getClientWindow = getClientWindow;
    //private helper functions
    function getSeparatorChar() {
        return AjaxImpl_1.Implementation.getSeparatorChar();
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
            return AjaxImpl_1.Implementation.chain.apply(AjaxImpl_1.Implementation, __spreadArray([source, event], funcs, false));
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
    //We hook the old namespace system into our npm system
    //if ("undefined" == window.jsf) {
    //    window.jsf = jsf;
    //}
})(jsf = exports.jsf || (exports.jsf = {}));
//fullfill the window contract
var myfaces;
(function (myfaces) {
    /**
     * AB function similar to mojarra and Primefaces
     * not part of the spec but a convenience accessor method
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
    myfaces.ab = ab;
})(myfaces = exports.myfaces || (exports.myfaces = {}));


/***/ }),

/***/ "./src/main/typescript/impl/AjaxImpl.ts":
/*!**********************************************!*\
  !*** ./src/main/typescript/impl/AjaxImpl.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Implementation = void 0;
var Response_1 = __webpack_require__(/*! ./xhrCore/Response */ "./src/main/typescript/impl/xhrCore/Response.ts");
var XhrRequest_1 = __webpack_require__(/*! ./xhrCore/XhrRequest */ "./src/main/typescript/impl/xhrCore/XhrRequest.ts");
var AsyncQueue_1 = __webpack_require__(/*! ./util/AsyncQueue */ "./src/main/typescript/impl/util/AsyncQueue.ts");
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
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
     * @return {char} the separator char for the given script tags
     */
    function getSeparatorChar() {
        var _a, _b, _c;
        return (_c = (_b = (_a = resolveGlobalConfig()) === null || _a === void 0 ? void 0 : _a.separator) !== null && _b !== void 0 ? _b : this === null || this === void 0 ? void 0 : this.separator) !== null && _c !== void 0 ? _c : (separator = ExtDomQuery_1.ExtDomquery.searchJsfJsFor(/separator=([^&;]*)/).orElse(":").value);
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
     * The value for it comes from the requestInternal parameter of the jsf.js script called "stage".
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
        /* run through all script tags and try to find the one that includes jsf.js */
        var foundStage = ExtDomQuery_1.ExtDomquery.searchJsfJsFor(/stage=([^&;]*)/).value;
        return (foundStage in ProjectStages) ? foundStage : null;
    }
    Implementation.resolveProjectStateFromURL = resolveProjectStateFromURL;
    /**
     * implementation of the jsf.util.chain functionality
     *
     * @param source
     * @param event
     * @param funcs
     */
    function chain(source, event) {
        var funcs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            funcs[_i - 2] = arguments[_i];
        }
        var ret = true;
        var resolveAndExecute = function (func) {
            if ("string" != typeof func) {
                //function is passed down as chain parameter, can be executed as is
                return (ret = ret && (func.call(source, event) !== false));
            }
            else {
                //either a function or a string can be passed in case of a string we have to wrap it into another function
                //it it is not a plain executable code but a definition
                var sourceCode = trim(func);
                if (sourceCode.indexOf("function ") == 0) {
                    sourceCode = "return ".concat(sourceCode, " (event)");
                }
                return (ret = ret && (new Function("event", sourceCode).call(source, event) !== false));
            }
        };
        //we can use our stream each functionality to run our chain here..
        //the no return value == false stop stream functionality is handled by our resolveAndExecute
        mona_dish_1.Stream.of.apply(mona_dish_1.Stream, funcs).each(function (func) { return resolveAndExecute(func); });
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
        var _a, _b, _c;
        var _d = (0, RequestDataResolver_1.resolveDefaults)(event, opts, el), resolvedEvent = _d.resolvedEvent, options = _d.options, elem = _d.elem, elementId = _d.elementId, requestCtx = _d.requestCtx, internalCtx = _d.internalCtx, windowId = _d.windowId, isResetValues = _d.isResetValues;
        Assertions_1.Assertions.assertRequestIntegrity(options, elem);
        requestCtx.assignIf(!!windowId, Const_1.P_WINDOW_ID).value = windowId;
        requestCtx.assign(Const_1.CTX_PARAM_PASS_THR).value = filterPassthroughValues(options.value);
        requestCtx.assignIf(!!resolvedEvent, Const_1.CTX_PARAM_PASS_THR, Const_1.P_EVT).value = resolvedEvent === null || resolvedEvent === void 0 ? void 0 : resolvedEvent.type;
        /**
         * ajax pass through context with the source
         * onresolvedEvent and onerror
         */
        requestCtx.assign(Const_1.SOURCE).value = elementId.value;
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
         * fetch the parent form
         *
         * note we also add an override possibility here
         * so that people can use dummy forms and work
         * with detached objects
         */
        var form = (0, RequestDataResolver_1.resolveForm)(requestCtx, elem, resolvedEvent);
        /**
         * binding contract the javax.faces.source must be set
         */
        requestCtx.assign(Const_1.CTX_PARAM_PASS_THR, Const_1.P_PARTIAL_SOURCE).value = elementId.value;
        /**
         * javax.faces.partial.ajax must be set to true
         */
        requestCtx.assign(Const_1.CTX_PARAM_PASS_THR, Const_1.P_AJAX).value = true;
        /**
         * binding contract the javax.faces.source must be set
         */
        requestCtx.assign(Const_1.CTX_PARAM_PASS_THR, Const_1.P_PARTIAL_SOURCE).value = elementId.value;
        /**
         * if resetValues is set to true
         * then we have to set javax.faces.resetValues as well
         * as pass through parameter
         * the value has to be explicitly true, according to
         * the specs jsdoc
         */
        requestCtx.assignIf(isResetValues, Const_1.CTX_PARAM_PASS_THR, Const_1.P_RESET_VALUES).value = true;
        //additional meta information to speed things up, note internal non jsf
        //pass through options are stored under _mfInternal in the context
        internalCtx.assign(Const_1.CTX_PARAM_SRC_FRM_ID).value = form.id.value;
        internalCtx.assign(Const_1.CTX_PARAM_SRC_CTL_ID).value = elementId.value;
        internalCtx.assign(Const_1.CTX_PARAM_TR_TYPE).value = Const_1.REQ_TYPE_POST;
        //mojarra compatibility, mojarra is sending the form id as well
        //this is not documented behavior but can be determined by running
        //mojarra under blackbox conditions
        //i assume it does the same as our formId_submit=1 so leaving it out
        //wont hurt but for the sake of compatibility we are going to add it
        requestCtx.assign(Const_1.CTX_PARAM_PASS_THR, form.id.value).value = form.id.value;
        assignClientWindowId(form, requestCtx);
        assignExecute(options, requestCtx, form, elementId.value);
        assignRender(options, requestCtx, form, elementId.value);
        var delay = (0, RequestDataResolver_1.resolveDelay)(options);
        var timeout = (0, RequestDataResolver_1.resolveTimeout)(options);
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
        /*error handling already done in the assert of the queue*/
        errorQueue.push(errorListener);
    }
    Implementation.addOnError = addOnError;
    /**
     * adds an event handler to the event queue
     *
     * @param eventListener the event listener handler
     */
    function addOnEvent(eventListener) {
        /*error handling already done in the assert of the queue*/
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
     *  the registered error handlers in the queue receiv an error message to be dealt with
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
     * @node optional element or id defining a rootnode where an element with the id "javax.faces.windowId" is hosted
     * @return the client window id of the current window, if one is given if none is found, null is returned
     */
    function getClientWindow(node) {
        var ALTERED = "___mf_id_altered__";
        var INIT = "___init____";
        /**
         * the search root for the dom element search
         */
        var searchRoot = new mona_dish_1.DQ(node || document.body).querySelectorAll("form input [name='".concat(Const_1.P_CLIENT_WINDOW, "']"));
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
        var differenceCheck = function (value1, value2) {
            if (value1 == INIT) {
                return value2;
            }
            else if (value1 == ALTERED || value1 != value2) {
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
        var formWindowId = searchRoot.stream.map(getValue).reduce(differenceCheck, INIT);
        //if the resulting window id is set on altered then we have an unresolvable problem
        assert(ALTERED != formWindowId.value, "Multiple different windowIds found in document");
        /**
         * return the window id or null
         * prio, forms under node/document and if not given then from the url
         */
        return formWindowId.value != INIT ? formWindowId.value : fetchWindowIdFromUrl();
    }
    Implementation.getClientWindow = getClientWindow;
    /**
     * collect and encode data for a given form element (must be of type form)
     * find the javax.faces.ViewState element and encode its value as well!
     * @return a concatenated string of the encoded values!
     *
     * @throws Error in case of the given element not being of type form!
     * https://issues.apache.org/jira/browse/MYFACES-2110
     */
    function getViewState(form) {
        /**
         *  typecheck assert!, we opt for strong typing here
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
     * for testing, we cannot proxy addRequestToQueue from the testing frameworks directly
     * but we need to keep it under unit tests.
     */
    Implementation.queueHandler = {
        /**
         * public to make it shimmable for tests
         *
         * adds a new request to our queue for further processing
         */
        addRequestToQueue: function (elem, form, reqCtx, respPassThr, delay, timeout) {
            if (delay === void 0) { delay = 0; }
            if (timeout === void 0) { timeout = 0; }
            Implementation.requestQueue = Implementation.requestQueue !== null && Implementation.requestQueue !== void 0 ? Implementation.requestQueue : new AsyncQueue_1.AsynchronouseQueue();
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
     * @param requestOptions the source options coming in as options object from jsf.ajax.request (options parameter)
     * @param targetContext the receiving target context
     * @param issuingForm the issuing form
     * @param sourceElementId the executing element triggering the jsf.ajax.request (id of it)
     */
    function assignRender(requestOptions, targetContext, issuingForm, sourceElementId) {
        if (requestOptions.getIf(Const_1.RENDER).isPresent()) {
            remapDefaultConstants(targetContext.getIf(Const_1.CTX_PARAM_PASS_THR).get({}), Const_1.P_RENDER, requestOptions.getIf(Const_1.RENDER).value, issuingForm, sourceElementId);
        }
    }
    /**
     * the idea is to replace some placeholder parameters with their respective values
     * placeholder params like  @all, @none, @form, @this need to be replaced by
     * the values defined by the specification
     *
     * This function does it for the execute parameters
     *
     * @param requestOptions the source options coming in as options object from jsf.ajax.request (options parameter)
     * @param targetContext the receiving target context
     * @param issuingForm the issuing form
     * @param sourceElementId the executing element triggering the jsf.ajax.request (id of it)
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
        var clientWindow = jsf.getClientWindow(form.getAsElem(0).value);
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
     * filter the options given with a blacklist so that only
     * the values required for passthough land in the ajax request
     *
     * @param {Context} mappedOpts the options to be filtered
     */
    function filterPassthroughValues(mappedOpts) {
        //we now can use the full code reduction given by our stream api
        //to filter
        return mona_dish_1.Stream.ofAssoc(mappedOpts)
            .filter(function (item) { return !(item[0] in BlockFilter); })
            .collect(new mona_dish_1.AssocArrayCollector());
    }
    function resolveGlobalConfig() {
        var _a, _b;
        return (_b = (_a = window === null || window === void 0 ? void 0 : window[Const_1.MYFACES]) === null || _a === void 0 ? void 0 : _a.config) !== null && _b !== void 0 ? _b : {};
    }
})(Implementation = exports.Implementation || (exports.Implementation = {}));


/***/ }),

/***/ "./src/main/typescript/impl/PushImpl.ts":
/*!**********************************************!*\
  !*** ./src/main/typescript/impl/PushImpl.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/**
 * Typescript port of the jsf.push part in the myfaces implementation
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PushImpl = void 0;
//TODO still work in progress
//this is a 1:1 port for the time being
var Jsf_1 = __webpack_require__(/*! ../api/Jsf */ "./src/main/typescript/api/Jsf.ts");
var Const_1 = __webpack_require__(/*! ./core/Const */ "./src/main/typescript/impl/core/Const.ts");
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
        var _a;
        getSocket((_a = PushImpl.components === null || PushImpl.components === void 0 ? void 0 : PushImpl.components[socketClientId]) === null || _a === void 0 ? void 0 : _a.channelToken).open();
    }
    PushImpl.open = open;
    function close(socketClientId) {
        getSocket(PushImpl.components === null || PushImpl.components === void 0 ? void 0 : PushImpl.components[socketClientId].channelToken).close();
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
            if (!this.socket
                || (event.code == 1000 && event.reason == Const_1.REASON_EXPIRED)
                || (event.code == 1008)
                || (!this.reconnectAttempts)
                || (this.reconnectAttempts >= Const_1.MAX_RECONNECT_ATTEMPTS)) {
                var clientIds = PushImpl.clientIdsByTokens[this.channelToken];
                for (var i = clientIds.length - 1; i >= 0; i--) {
                    var socketClientId = clientIds[i];
                    PushImpl.components[socketClientId]['onclose'](event === null || event === void 0 ? void 0 : event.code, this === null || this === void 0 ? void 0 : this.channel, event);
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


/***/ }),

/***/ "./src/main/typescript/impl/core/Const.ts":
/*!************************************************!*\
  !*** ./src/main/typescript/impl/core/Const.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CTX_PARAM_RST = exports.CTX_PARAM_TIMEOUT = exports.CTX_PARAM_DELAY = exports.CTX_PARAM_PASS_THR = exports.CTX_PARAM_TR_TYPE = exports.CTX_PARAM_SRC_CTL_ID = exports.CTX_PARAM_SRC_FRM_ID = exports.CTX_PARAM_MF_INTERNAL = exports.TIMEOUT_EVENT = exports.CLIENT_ERROR = exports.SERVER_ERROR = exports.MALFORMEDXML = exports.EMPTY_RESPONSE = exports.HTTPERROR = exports.RESPONSE_XML = exports.RESPONSE_TEXT = exports.ERROR_MESSAGE = exports.ERROR_NAME = exports.STATUS = exports.SOURCE = exports.SUCCESS = exports.COMPLETE = exports.BEGIN = exports.ON_EVENT = exports.ON_ERROR = exports.EVENT = exports.ERROR = exports.WINDOW_ID = exports.RENDER = exports.P_WINDOW_ID = exports.P_RESET_VALUES = exports.P_CLIENT_WINDOW = exports.P_EVT = exports.P_RENDER = exports.P_EXECUTE = exports.P_AJAX = exports.IDENT_FORM = exports.IDENT_THIS = exports.IDENT_NONE = exports.IDENT_ALL = exports.HTML_VIEWSTATE = exports.EMPTY_MAP = exports.EMPTY_STR = exports.EMPTY_FUNC = exports.P_VIEWBODY = exports.P_VIEWHEAD = exports.P_VIEWROOT = exports.P_VIEWSTATE = exports.PARTIAL_ID = exports.P_PARTIAL_SOURCE = void 0;
exports.RECONNECT_INTERVAL = exports.APPLIED_CLIENT_WINDOW = exports.APPLIED_VST = exports.REASON_EXPIRED = exports.MF_NONE = exports.SEL_SCRIPTS_STYLES = exports.MYFACES = exports.UPDATE_ELEMS = exports.UPDATE_FORMS = exports.CMD_REDIRECT = exports.CMD_EXTENSION = exports.CMD_ATTRIBUTES = exports.CMD_ERROR = exports.CMD_EVAL = exports.CMD_INSERT = exports.CMD_DELETE = exports.CMD_UPDATE = exports.CMD_CHANGES = exports.RESP_PARTIAL = exports.ATTR_ID = exports.ATTR_VALUE = exports.ATTR_NAME = exports.ATTR_URL = exports.ERR_NO_PARTIAL_RESPONSE = exports.PHASE_PROCESS_RESPONSE = exports.SEL_RESPONSE_XML = exports.SEL_CLIENT_WINDOW_ELEM = exports.SEL_VIEWSTATE_ELEM = exports.TAG_ATTR = exports.TAG_AFTER = exports.TAG_BEFORE = exports.TAG_BODY = exports.TAG_FORM = exports.TAG_HEAD = exports.STD_ACCEPT = exports.NO_TIMEOUT = exports.MULTIPART = exports.URL_ENCODED = exports.STATE_EVT_COMPLETE = exports.STATE_EVT_TIMEOUT = exports.STATE_EVT_BEGIN = exports.REQ_TYPE_POST = exports.REQ_TYPE_GET = exports.ENCODED_URL = exports.VAL_AJAX = exports.REQ_ACCEPT = exports.HEAD_FACES_REQ = exports.CONTENT_TYPE = exports.STAGE_DEVELOPMENT = exports.CTX_PARAM_EXECUTE = void 0;
exports.UNKNOWN = exports.MAX_RECONNECT_ATTEMPTS = void 0;
/*
 * [export const] constants
 */
exports.P_PARTIAL_SOURCE = "javax.faces.source";
exports.PARTIAL_ID = "partialId";
exports.P_VIEWSTATE = "javax.faces.ViewState";
exports.P_VIEWROOT = "javax.faces.ViewRoot";
exports.P_VIEWHEAD = "javax.faces.ViewHead";
exports.P_VIEWBODY = "javax.faces.ViewBody";
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
exports.P_AJAX = "javax.faces.partial.ajax";
exports.P_EXECUTE = "javax.faces.partial.execute";
exports.P_RENDER = "javax.faces.partial.render";
exports.P_EVT = "javax.faces.partial.event";
exports.P_CLIENT_WINDOW = "javax.faces.ClientWindow";
exports.P_RESET_VALUES = "javax.faces.partial.resetValues";
exports.P_WINDOW_ID = "javax.faces.windowId";
exports.RENDER = "render";
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
exports.CTX_PARAM_DELAY = "delay";
exports.CTX_PARAM_TIMEOUT = "timeout";
exports.CTX_PARAM_RST = "resetValues";
exports.CTX_PARAM_EXECUTE = "execute";
exports.STAGE_DEVELOPMENT = "Development";
exports.CONTENT_TYPE = "Content-Type";
exports.HEAD_FACES_REQ = "Faces-Request";
exports.REQ_ACCEPT = "Accept";
exports.VAL_AJAX = "partial/ajax";
exports.ENCODED_URL = "javax.faces.encodedURL";
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
exports.MYFACES = "myfaces";
exports.SEL_SCRIPTS_STYLES = "script, style, link";
exports.MF_NONE = "__mf_none__";
exports.REASON_EXPIRED = "Expired";
exports.APPLIED_VST = "appliedViewState";
exports.APPLIED_CLIENT_WINDOW = "appliedClientWindow";
exports.RECONNECT_INTERVAL = 500;
exports.MAX_RECONNECT_ATTEMPTS = 25;
exports.UNKNOWN = "UNKNOWN";


/***/ }),

/***/ "./src/main/typescript/impl/core/ImplTypes.ts":
/*!****************************************************!*\
  !*** ./src/main/typescript/impl/core/ImplTypes.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StateHolder = void 0;
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

/***/ "./src/main/typescript/impl/util/Assertions.ts":
/*!*****************************************************!*\
  !*** ./src/main/typescript/impl/util/Assertions.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Assertions = void 0;
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
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
        assert(elem.isPresent(), getMessage("ERR_MUST_BE_PROVIDED1", "{0}: source  must be provided or exist", "source element id"), "jsf.ajax.request", "ArgNotSet");
    }
    Assertions.assertRequestIntegrity = assertRequestIntegrity;
    function assertUrlExists(node) {
        if (node.attr(Const_1.ATTR_URL).isAbsent()) {
            throw Assertions.raiseError(new Error(), getMessage("ERR_RED_URL", null, "_Ajaxthis.processRedirect"), "processRedirect");
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

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AsynchronousQueue = void 0;
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
        enumerable: false,
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
    return AsynchronouseQueue;
}());
exports.AsynchronousQueue = AsynchronouseQueue;


/***/ }),

/***/ "./src/main/typescript/impl/util/ExtDomQuery.ts":
/*!******************************************************!*\
  !*** ./src/main/typescript/impl/util/ExtDomQuery.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.ExtDQ = exports.ExtDomquery = void 0;
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
var Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtDomquery, "nonce", {
        get: function () {
            return new ExtDomquery(document.body).nonce;
        },
        enumerable: false,
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
                var result = this.querySelectorAll("form input[name='" + Const_1.P_WINDOW_ID + "']");
                if (result.length > 0) {
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
    Object.defineProperty(ExtDomquery.prototype, "nonce", {
        /*
        determines the jsfjs nonce and adds them to the namespace
        * this is done once and only lazily
        */
        get: function () {
            //already processed
            var myfacesConfig = new mona_dish_1.Config(window.myfaces);
            var nonce = myfacesConfig.assign("config", "cspMeta", "nonce");
            if (nonce.value) {
                return nonce.value;
            }
            var curScript = new mona_dish_1.DQ(document.currentScript);
            //since our baseline atm is ie11 we cannot use document.currentScript globally
            if (curScript.attr("nonce").value != null) {
                //fastpath for modern browsers
                return curScript.attr("nonce").value;
            }
            var nonceScript = mona_dish_1.DQ
                .querySelectorAll("script[src], link[src]")
                .lazyStream
                .filter(function (item) { return item.attr("nonce").value != null && item.attr("src") != null; })
                .map((function (item) { return !item.attr("src").value.match(/jsf\.js\?ln=javax\.faces/gi); }))
                .first();
            if (nonceScript.isPresent()) {
                nonce.value = mona_dish_1.DomQuery.byId(nonceScript.value, true).attr("nonce").value;
            }
            return nonce.value;
        },
        enumerable: false,
        configurable: true
    });
    ExtDomquery.searchJsfJsFor = function (item) {
        return new ExtDomquery(document).searchJsfJsFor(item);
    };
    ExtDomquery.prototype.searchJsfJsFor = function (rexp) {
        //perfect application for lazy stream
        return mona_dish_1.DQ.querySelectorAll("script").lazyStream
            .filter(function (item) {
            var _a;
            return ((_a = item.attr("src").value) !== null && _a !== void 0 ? _a : Const_1.EMPTY_STR).search(/\/javax\.faces\.resource.*\/jsf\.js.*separator/) != -1;
        }).map(function (item) {
            var result = item.attr("src").value.match(rexp);
            return decodeURIComponent(result[1]);
        }).first();
    };
    ExtDomquery.prototype.globalEval = function (code, nonce) {
        return _super.prototype.globalEval.call(this, code, nonce !== null && nonce !== void 0 ? nonce : this.nonce);
    };
    return ExtDomquery;
}(mona_dish_1.DQ));
exports.ExtDomquery = ExtDomquery;
exports.ExtDQ = mona_dish_1.DQ;


/***/ }),

/***/ "./src/main/typescript/impl/util/Lang.ts":
/*!***********************************************!*\
  !*** ./src/main/typescript/impl/util/Lang.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtLang = void 0;
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
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
     * @param {String} key the key for the message
     * @param {String} defaultMessage optional default message if none was found
     *
     * Additionally you can pass additional arguments, which are used
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
        var msg = (_b = (_a = installedLocale[key]) !== null && _a !== void 0 ? _a : defaultMessage) !== null && _b !== void 0 ? _b : key + " - undefined message";
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
     * creates an exeption with additional internal parameters
     * for extra information
     *
     * @param error
     * @param {String} title the exception title
     * @param {String} name  the exception name
     * @param {String} callerCls the caller class
     * @param {String} callFunc the caller function
     * @param {String} message the message for the exception
     */
    function makeException(error, title, name, callerCls, callFunc, message) {
        var _a;
        return new Error((_a = message + (callerCls !== null && callerCls !== void 0 ? callerCls : nameSpace) + callFunc) !== null && _a !== void 0 ? _a : (Const_1.EMPTY_STR + arguments.caller.toString()));
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
        var _a, _b, _c;
        /**
         * note we could use exists but this is an heavy operation, since the config name usually
         * given this function here is called very often
         * is a single entry without . in between we can do the lighter shortcut
         */
        return (_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.myfaces) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b[configName]) !== null && _c !== void 0 ? _c : defaultValue;
    }
    ExtLang.getGlobalConfig = getGlobalConfig;
    /**
     * fetches the form in an fuzzy manner depending
     * on an element or event target.
     *
     * The idea is that according to the jsf spec
     * the enclosing form of the issuing element needs to be fetched.
     *
     * This is fine, but since then html5 came into the picture with the form attribute the element
     * can be anywhere referencing its parent form.
     *
     * Also theoretically you can have the case of an issuing element enclosing a set of forms
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
     * @param {String} configName the name of the configuration entry
     * @param {String} localOptions the local options root for the configuration myfaces as default marker is added implicitely
     *
     * @param {Object} defaultValue
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
     * (TODO move this into the assertions)
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

"use strict";

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
        return new ErrorData("client", e.name, e.message, e.stack);
    };
    ErrorData.fromHttpConnection = function (source, name, message, responseText, responseCode) {
        return new ErrorData(source, name, message, responseText, responseCode, null, "UNKNOWN", ErrorType.HTTP_ERROR);
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

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventData = void 0;
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
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
            .orElse(context.getIf(Const_1.P_PARTIAL_SOURCE).value)
            .orElse(context.getIf(Const_1.CTX_PARAM_PASS_THR, Const_1.P_PARTIAL_SOURCE).value).value;
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveDefaults = exports.getEventTarget = exports.resolveWindowId = exports.resolveDelay = exports.resolveTimeout = exports.resolveForm = exports.resolveFinalUrl = exports.resolveTargetUrl = exports.resolveHandlerFunc = void 0;
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
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
 * resolves the event handlers lazly
 * so that if some decoration happens in between we can deal with it
 *
 * @param requestContext
 * @param responseContext
 * @param funcName
 */
function resolveHandlerFunc(requestContext, responseContext, funcName) {
    return responseContext.getIf(funcName)
        .orElse(requestContext.getIf(funcName).value)
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
    var configId = (_c = (_b = (_a = requestCtx.value) === null || _a === void 0 ? void 0 : _a.myfaces) === null || _b === void 0 ? void 0 : _b.form) !== null && _c !== void 0 ? _c : Const_1.MF_NONE; //requestCtx.getIf(MYFACES, "form").orElse(MF_NONE).value;
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
 * resolves the window Id from various sources
 *
 * @param options
 */
function resolveWindowId(options) {
    var _a, _b;
    return (_b = (_a = options === null || options === void 0 ? void 0 : options.value) === null || _a === void 0 ? void 0 : _a.windowId) !== null && _b !== void 0 ? _b : ExtDomQuery_1.ExtDomquery.windowId;
}
exports.resolveWindowId = resolveWindowId;
/**
 * cross port from the dojo lib
 * browser save event resolution
 * @param evt the event object
 * (with a fallback for ie events if none is present)
 */
function getEventTarget(evt) {
    var _a, _b;
    //ie6 and 7 fallback
    var finalEvent = evt;
    /**
     * evt source is defined in the jsf events
     * seems like some component authors use our code
     * so we add it here see also
     * https://issues.apache.org/jira/browse/MYFACES-2458
     * not entirely a bug but makes sense to add this
     * behavior. I dont use it that way but nevertheless it
     * does not break anything so why not
     * */
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
 * call parameters of jsf.ajax.request
 *
 * @param event
 * @param opts
 * @param el
 */
function resolveDefaults(event, opts, el) {
    var _a;
    if (opts === void 0) { opts = {}; }
    if (el === void 0) { el = null; }
    //deep copy the options, so that further transformations to not backfire into the callers
    var resolvedEvent = event, options = new mona_dish_1.Config(opts).deepCopy, elem = mona_dish_1.DQ.byId(el || resolvedEvent.target, true), elementId = elem.id, requestCtx = new mona_dish_1.Config({}), internalCtx = new mona_dish_1.Config({}), windowId = resolveWindowId(options), isResetValues = true === ((_a = options.value) === null || _a === void 0 ? void 0 : _a.resetValues);
    return { resolvedEvent: resolvedEvent, options: options, elem: elem, elementId: elementId, requestCtx: requestCtx, internalCtx: internalCtx, windowId: windowId, isResetValues: isResetValues };
}
exports.resolveDefaults = resolveDefaults;


/***/ }),

/***/ "./src/main/typescript/impl/xhrCore/ResonseDataResolver.ts":
/*!*****************************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/ResonseDataResolver.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveSourceForm = exports.resolveSourceElement = exports.resolveContexts = exports.resolveResponseXML = void 0;
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
var Assertions_1 = __webpack_require__(/*! ../util/Assertions */ "./src/main/typescript/impl/util/Assertions.ts");
var mona_dish_2 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
var Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
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
 * Throws an error in case of non existent or wrong xml data
 *
 */
function resolveResponseXML(request) {
    var ret = new mona_dish_1.XMLQuery(request.getIf(Const_1.SEL_RESPONSE_XML).value);
    Assertions_1.Assertions.assertValidXMLResponse(ret);
    return ret;
}
exports.resolveResponseXML = resolveResponseXML;
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
    var externalContext = mona_dish_1.Config.fromNullable(context);
    var internalContext = externalContext.getIf(Const_1.CTX_PARAM_MF_INTERNAL);
    if (!internalContext.isPresent()) {
        internalContext = mona_dish_1.Config.fromNullable({});
    }
    /**
     * prepare storage for some deferred operations
     */
    internalContext.assign(Const_1.UPDATE_FORMS).value = [];
    internalContext.assign(Const_1.UPDATE_ELEMS).value = [];
    return { externalContext: externalContext, internalContext: internalContext };
}
exports.resolveContexts = resolveContexts;
/**
 * fetches the source element out of our conexts
 *
 * @param context the external context which shpuld host the source id
 * @param internalContext internal passthrough fall back
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
    sourceForm = sourceForm.orElse(elem.parents(Const_1.TAG_FORM))
        .orElse(elem.querySelectorAll(Const_1.TAG_FORM))
        .orElse(mona_dish_2.DQ.querySelectorAll(Const_1.TAG_FORM));
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Response = void 0;
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
var ResponseProcessor_1 = __webpack_require__(/*! ./ResponseProcessor */ "./src/main/typescript/impl/xhrCore/ResponseProcessor.ts");
var Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
var ResonseDataResolver_1 = __webpack_require__(/*! ./ResonseDataResolver */ "./src/main/typescript/impl/xhrCore/ResonseDataResolver.ts");
var Response;
(function (Response) {
    /**
     * Standardized jsf.js response
     * this one is called straight from jsf.js.response
     *
     * The processing follows the spec by going for the responseXML
     * and processing its tags
     *
     * @param {XMLHttpRequest} request (xhrRequest) - xhr request object
     * @param ASSOC_ARR<any> context (Map) - AJAX context
     *
     */
    function processResponse(request, context) {
        var req = mona_dish_1.Config.fromNullable(request);
        var _a = (0, ResonseDataResolver_1.resolveContexts)(context), externalContext = _a.externalContext, internalContext = _a.internalContext;
        var responseXML = (0, ResonseDataResolver_1.resolveResponseXML)(req);
        var responseProcessor = new ResponseProcessor_1.ResponseProcessor(req, externalContext, internalContext);
        internalContext.assign(Const_1.RESPONSE_XML).value = responseXML;
        //we now process the partial tags, or in none given raise an error
        responseXML.querySelectorAll(Const_1.RESP_PARTIAL)
            .each(function (item) { return processPartialTag(item, responseProcessor, internalContext); });
        //we now process the viewstates, client windows and the evals deferred
        //the reason for this is that often it is better
        //to wait until the document has caught up before
        //doing any evals even on embedded scripts
        //usually this does not matter, the client window comes in almost last always anyway
        //we maybe drop this deferred assignment in the future, but myfaces did it until now
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
        //now we can process the main operations
        node.getIf(SEL_SUB_TAGS).each(function (node) {
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
        //path1 insert after as child tags
        if (node.querySelectorAll([Const_1.TAG_BEFORE, Const_1.TAG_AFTER].join(",")).length) {
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
        var ALLOWED_TAGS = [Const_1.CMD_UPDATE, Const_1.CMD_EVAL, Const_1.CMD_INSERT, Const_1.CMD_DELETE, Const_1.CMD_ATTRIBUTES, Const_1.CMD_EXTENSION].join(",");
        node.getIf(ALLOWED_TAGS).each(function (node) {
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
     * branch tag update.. drill further down into the updates
     * special case viewstate in that case it is a leaf
     * and the viewstate must be processed
     *
     * @param node
     * @param responseProcessor
     */
    function processUpdateTag(node, responseProcessor) {
        //early state storing, if no state we perform a normal update cycle
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
            case Const_1.P_VIEWROOT:
                responseProcessor.replaceViewRoot(mona_dish_1.DQ.fromMarkup(cdataBlock.substring(cdataBlock.indexOf("<html"))));
                break;
            case Const_1.P_VIEWHEAD:
                responseProcessor.replaceHead(mona_dish_1.DQ.fromMarkup(cdataBlock));
                break;
            case Const_1.P_VIEWBODY:
                responseProcessor.replaceBody(mona_dish_1.DQ.fromMarkup(cdataBlock));
                break;
            default: //htmlItem replacement
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
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
var AjaxImpl_1 = __webpack_require__(/*! ../AjaxImpl */ "./src/main/typescript/impl/AjaxImpl.ts");
var Assertions_1 = __webpack_require__(/*! ../util/Assertions */ "./src/main/typescript/impl/util/Assertions.ts");
var ErrorData_1 = __webpack_require__(/*! ./ErrorData */ "./src/main/typescript/impl/xhrCore/ErrorData.ts");
var ImplTypes_1 = __webpack_require__(/*! ../core/ImplTypes */ "./src/main/typescript/impl/core/ImplTypes.ts");
var EventData_1 = __webpack_require__(/*! ./EventData */ "./src/main/typescript/impl/xhrCore/EventData.ts");
var Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
var trim = mona_dish_1.Lang.trim;
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
    ResponseProcessor.prototype.replaceHead = function (shadowDocument) {
        var shadowHead = shadowDocument.querySelectorAll(Const_1.TAG_HEAD);
        if (!shadowHead.isPresent()) {
            return;
        }
        var oldHead = mona_dish_1.DQ.querySelectorAll(Const_1.TAG_HEAD);
        //delete all to avoid script and style overlays
        oldHead.querySelectorAll(Const_1.SEL_SCRIPTS_STYLES).delete();
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
        var shadowBody = shadowDocument.querySelectorAll(Const_1.TAG_BODY);
        if (!shadowBody.isPresent()) {
            return;
        }
        var shadowInnerHTML = shadowBody.html().value;
        var resultingBody = mona_dish_1.DQ.querySelectorAll(Const_1.TAG_BODY).html(shadowInnerHTML);
        var updateForms = resultingBody.querySelectorAll(Const_1.TAG_FORM);
        resultingBody.copyAttrs(shadowBody);
        this.storeForPostProcessing(updateForms, resultingBody);
    };
    /**
     * Leaf Tag eval... process whatever is in the evals cdata block
     *
     * @param node the node to eval
     */
    ResponseProcessor.prototype.eval = function (node) {
        mona_dish_1.DQ.globalEval(node.cDATAAsString);
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
        var mergedErrorData = new mona_dish_1.Config({});
        mergedErrorData.assign(Const_1.SOURCE).value = this.externalContext.getIf(Const_1.P_PARTIAL_SOURCE).get(0).value;
        mergedErrorData.assign(Const_1.ERROR_NAME).value = node.getIf(Const_1.ERROR_NAME).textContent(Const_1.EMPTY_STR);
        mergedErrorData.assign(Const_1.ERROR_MESSAGE).value = node.getIf(Const_1.ERROR_MESSAGE).cDATAAsString;
        var hasResponseXML = this.internalContext.get(Const_1.RESPONSE_XML).isPresent();
        mergedErrorData.assignIf(hasResponseXML, Const_1.RESPONSE_XML).value = this.internalContext.getIf(Const_1.RESPONSE_XML).value.get(0).value;
        var errorData = ErrorData_1.ErrorData.fromServerError(mergedErrorData);
        this.externalContext.getIf(Const_1.ON_ERROR).orElse(this.internalContext.getIf(Const_1.ON_ERROR).value).orElse(Const_1.EMPTY_FUNC).value(errorData);
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
        var result = mona_dish_1.DQ.byId(node.id.value, true).outerHTML(cdataBlock, false, false);
        var sourceForm = result === null || result === void 0 ? void 0 : result.parents(Const_1.TAG_FORM).orElse(result.byTagName(Const_1.TAG_FORM, true));
        if (sourceForm) {
            this.storeForPostProcessing(sourceForm, result);
        }
    };
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
     * insert handling, either before or after
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
     * handler for the case &lt;insert <&lt; before id="...
     *
     * @param node the node hosting the insert data
     */
    ResponseProcessor.prototype.insertWithSubtags = function (node) {
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
     * process the viewState update, update the affected
     * forms with their respective new viewstate values
     *
     */
    ResponseProcessor.prototype.processViewState = function (node) {
        if (ResponseProcessor.isViewStateNode(node)) {
            var state = node.cDATAAsString;
            this.internalContext.assign(Const_1.APPLIED_VST, node.id.value).value = new ImplTypes_1.StateHolder(node.id.value, state);
            return true;
        }
        return false;
    };
    ResponseProcessor.prototype.processClientWindow = function (node) {
        if (ResponseProcessor.isClientWindowNode(node)) {
            var state = node.cDATAAsString;
            this.internalContext.assign(Const_1.APPLIED_CLIENT_WINDOW, node.id.value).value = new ImplTypes_1.StateHolder(node.id.value, state);
            return true;
        }
    };
    /**
     * generic global eval which runs the embedded css and scripts
     */
    ResponseProcessor.prototype.globalEval = function () {
        var updateElems = new (mona_dish_1.DQ.bind.apply(mona_dish_1.DQ, __spreadArray([void 0], this.internalContext.getIf(Const_1.UPDATE_ELEMS).value, false)))();
        updateElems.runCss();
        updateElems.runScripts();
    };
    /**
     * post processing viewstate fixing
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
        var eventData = EventData_1.EventData.createFromRequest(this.request.value, this.externalContext, Const_1.SUCCESS);
        //because some frameworks might decorate them over the context in the response
        var eventHandler = this.externalContext.getIf(Const_1.ON_EVENT).orElse(this.internalContext.getIf(Const_1.ON_EVENT).value).orElse(Const_1.EMPTY_FUNC).value;
        AjaxImpl_1.Implementation.sendEvent(eventData, eventHandler);
    };
    /**
     * proper viewstate -> form assignment
     *
     * @param forms the forms to append the viewstate to
     * @param viewState the final viewstate
     */
    ResponseProcessor.prototype.appendViewStateToForms = function (forms, viewState) {
        this.assignState(forms, Const_1.SEL_VIEWSTATE_ELEM, viewState);
    };
    /**
     * proper clientwindow -> form assignment
     *
     * @param forms the forms to append the viewstate to
     * @param clientWindow the final viewstate
     */
    ResponseProcessor.prototype.appendClientWindowToForms = function (forms, clientWindow) {
        this.assignState(forms, Const_1.SEL_CLIENT_WINDOW_ELEM, clientWindow);
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
     * @param parent, the parent node to attach the viewstate element to
     * (usually a form node)
     */
    ResponseProcessor.newViewStateElement = function (parent) {
        var newViewState = mona_dish_1.DQ.fromMarkup(Const_1.HTML_VIEWSTATE);
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
    /**
     * helper to store a given form for the update post processing (viewstate)
     *
     * @param updateForms the dom query object pointing to the forms which need to be updated
     */
    ResponseProcessor.prototype.storeForUpdate = function (updateForms) {
        this.internalContext.assign(Const_1.UPDATE_FORMS).value.push(updateForms);
    };
    /**
     * same for eval (js and css)
     *
     * @param toBeEvaled
     */
    ResponseProcessor.prototype.storeForEval = function (toBeEvaled) {
        this.internalContext.assign(Const_1.UPDATE_ELEMS).value.push(toBeEvaled);
    };
    /**
     * check whether a given XMLQuery node is an explicit viewstate node
     *
     * @param node the node to check
     * @returns true of it ii
     */
    ResponseProcessor.isViewStateNode = function (node) {
        var _a, _b, _c, _d, _e, _f;
        var separatorChar = window.jsf.separatorchar;
        return "undefined" != typeof ((_a = node === null || node === void 0 ? void 0 : node.id) === null || _a === void 0 ? void 0 : _a.value) && (((_b = node === null || node === void 0 ? void 0 : node.id) === null || _b === void 0 ? void 0 : _b.value) == Const_1.P_VIEWSTATE ||
            ((_d = (_c = node === null || node === void 0 ? void 0 : node.id) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.indexOf([separatorChar, Const_1.P_VIEWSTATE].join(Const_1.EMPTY_STR))) != -1 ||
            ((_f = (_e = node === null || node === void 0 ? void 0 : node.id) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.indexOf([Const_1.P_VIEWSTATE, separatorChar].join(Const_1.EMPTY_STR))) != -1);
    };
    /**
     * incoming client window node also needs special processing
     *
     * @param node the node to check
     * @returns true of it ii
     */
    ResponseProcessor.isClientWindowNode = function (node) {
        var _a, _b, _c, _d, _e, _f;
        var separatorChar = window.jsf.separatorchar;
        return "undefined" != typeof ((_a = node === null || node === void 0 ? void 0 : node.id) === null || _a === void 0 ? void 0 : _a.value) && (((_b = node === null || node === void 0 ? void 0 : node.id) === null || _b === void 0 ? void 0 : _b.value) == Const_1.P_CLIENT_WINDOW ||
            ((_d = (_c = node === null || node === void 0 ? void 0 : node.id) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.indexOf([separatorChar, Const_1.P_CLIENT_WINDOW].join(Const_1.EMPTY_STR))) != -1 ||
            ((_f = (_e = node === null || node === void 0 ? void 0 : node.id) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.indexOf([Const_1.P_CLIENT_WINDOW, separatorChar].join(Const_1.EMPTY_STR))) != -1);
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

"use strict";

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
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
var mona_dish_2 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
var isString = mona_dish_1.Lang.isString;
var Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
/**
 * A unified form data class
 * which builds upon our configuration.
 *
 * We cannot use standard html5 forms everywhere
 * due to api constraints on the HTML Form object in IE11
 * and due to the url encoding constraint given by the jsf.js spec
 *
 * TODO not ideal. too many encoding calls
 * probably only one needed and one overlay!
 * the entire fileinput storing probably is redundant now
 * that domquery has been fixed
 */
var XhrFormData = /** @class */ (function (_super) {
    __extends(XhrFormData, _super);
    /**
     * data collector from a given form
     *
     * @param dataSource either a form as DomQuery object or an encoded url string
     * @param partialIdsArray partial ids to collect, to reduce the data sent down
     */
    function XhrFormData(dataSource, partialIdsArray, encode) {
        if (encode === void 0) { encode = true; }
        var _this = _super.call(this, {}) || this;
        _this.dataSource = dataSource;
        _this.partialIdsArray = partialIdsArray;
        _this.encode = encode;
        _this.fileInputs = {};
        //a call to getViewState before must pass the encoded line
        //a call from getViewState passes the form element as datasource
        //so we have two call points
        if (isString(dataSource)) {
            _this.assignEncodedString(_this.dataSource);
        }
        else {
            _this.handleFormSource();
        }
        return _this;
    }
    /**
     * generic application of ids
     * @param executes
     */
    XhrFormData.prototype.applyFileInputs = function () {
        var _this = this;
        var executes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            executes[_i] = arguments[_i];
        }
        var fetchInput = function (id) {
            if (id == "@all") {
                return mona_dish_2.DQ.querySelectorAllDeep("input[type='file']");
            }
            else if (id == "@form") {
                return _this.dataSource.querySelectorAllDeep("input[type='file']");
            }
            else {
                var element = mona_dish_2.DQ.byId(id, true);
                return _this.getFileInputs(element);
            }
        };
        var inputExists = function (item) {
            return !!item.length;
        };
        var applyInput = function (item) {
            _this.fileInputs[_this.resolveSubmitIdentifier(item.getAsElem(0).value)] = true;
        };
        mona_dish_1.LazyStream.of.apply(mona_dish_1.LazyStream, executes).map(fetchInput)
            .filter(inputExists)
            .each(applyInput);
    };
    XhrFormData.prototype.getFileInputs = function (rootElment) {
        var _this = this;
        var resolveFileInputs = function (item) {
            var _a;
            if (item.length == 1) {
                if (item.tagName.get("booga").value.toLowerCase() == "input" &&
                    (((_a = item.attr("type")) === null || _a === void 0 ? void 0 : _a.value) || '').toLowerCase() == "file") {
                    return item;
                }
                return rootElment.querySelectorAllDeep("input[type='file']");
            }
            return _this.getFileInputs(item);
        };
        var itemExists = function (item) {
            return !!(item === null || item === void 0 ? void 0 : item.length);
        };
        var ret = rootElment.lazyStream
            .map(resolveFileInputs)
            .filter(itemExists)
            .collect(new mona_dish_1.DomQueryCollector());
        return ret;
    };
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
        if (this.getIf(Const_1.P_VIEWSTATE).isPresent()) {
            return;
        }
        this.applyViewState(this.dataSource);
    };
    /**
     * special case viewstate handling
     *
     * @param form the form holding the viewstate value
     */
    XhrFormData.prototype.applyViewState = function (form) {
        var viewState = form.byId(Const_1.P_VIEWSTATE, true).inputValue;
        this.appendIf(viewState.isPresent(), Const_1.P_VIEWSTATE).value = viewState.value;
    };
    /**
     * assignes a url encoded string to this xhrFormData object
     * as key value entry
     * @param encoded
     */
    XhrFormData.prototype.assignEncodedString = function (encoded) {
        var keyValueEntries = decodeURIComponent(encoded).split(/&/gi);
        this.assignKeyValueEntries(keyValueEntries);
    };
    XhrFormData.prototype.assignString = function (keyValueEntries) {
        var toMerge = new mona_dish_1.Config({});
        mona_dish_2.Stream.of.apply(mona_dish_2.Stream, keyValueEntries).map(function (line) { return line.split(/=(.*)/gi); })
            //special case of having keys without values
            .map(function (keyVal) { var _a, _b; return keyVal.length < 3 ? [(_a = keyVal === null || keyVal === void 0 ? void 0 : keyVal[0]) !== null && _a !== void 0 ? _a : [], (_b = keyVal === null || keyVal === void 0 ? void 0 : keyVal[1]) !== null && _b !== void 0 ? _b : []] : keyVal; })
            .each(function (keyVal) {
            var _a, _b;
            toMerge.append(keyVal[0]).value = (_b = (_a = keyVal === null || keyVal === void 0 ? void 0 : keyVal.splice(1)) === null || _a === void 0 ? void 0 : _a.join("")) !== null && _b !== void 0 ? _b : "";
        });
        //merge with overwrite but no append! (aka no double entries are allowed)
        this.shallowMerge(toMerge);
    };
    // noinspection JSUnusedGlobalSymbols
    /**
     * @returns a Form data representation
     */
    XhrFormData.prototype.toFormData = function () {
        var _this = this;
        var ret = new FormData();
        mona_dish_1.LazyStream.of.apply(mona_dish_1.LazyStream, Object.keys(this.value)).filter(function (key) { return !(key in _this.fileInputs); })
            .each(function (key) {
            mona_dish_2.Stream.of.apply(mona_dish_2.Stream, _this.value[key]).each(function (item) { return ret.append(key, item); });
        });
        mona_dish_2.Stream.of.apply(mona_dish_2.Stream, Object.keys(this.fileInputs)).each(function (key) {
            mona_dish_2.DQ.querySelectorAllDeep("[name='".concat(key, "'], [id=\"").concat(key, "\"]")).eachElem(function (elem) {
                var _a;
                var identifier = _this.resolveSubmitIdentifier(elem);
                if (!((_a = elem === null || elem === void 0 ? void 0 : elem.files) === null || _a === void 0 ? void 0 : _a.length)) {
                    ret.append(identifier, elem.value);
                    return;
                }
                ret.append(identifier, elem.files[0]);
            });
        });
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
            .flatMap(function (key) { return mona_dish_2.Stream.of.apply(mona_dish_2.Stream, _this.value[key]).map(function (val) { return [key, val]; }).collect(new mona_dish_1.ArrayCollector()); })
            .map(function (keyVal) {
            return "".concat(encodeURIComponent(keyVal[0]), "=").concat(encodeURIComponent(keyVal[1]));
        })
            .collect(new mona_dish_1.ArrayCollector());
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
            this._value = {};
            toEncode = new (mona_dish_2.DQ.bind.apply(mona_dish_2.DQ, __spreadArray([void 0], this.partialIdsArray, false)))();
        }
        else {
            if (parentItem.isAbsent())
                throw "NO_PARITEM";
            toEncode = parentItem;
        }
        //lets encode the form elements
        this.shallowMerge(toEncode.deepElements.encodeFormElement());
    };
    Object.defineProperty(XhrFormData.prototype, "isMultipartRequest", {
        /**
         * checks if the given datasource is a multipart request source
         * multipart is only needed if one of the executes is a file input
         * since file inputs are stateless, they fall out of the viewstate
         * and need special handling
         */
        get: function () {
            return !!Object.keys(this.fileInputs).length;
        },
        enumerable: false,
        configurable: true
    });
    return XhrFormData;
}(mona_dish_1.Config));
exports.XhrFormData = XhrFormData;


/***/ }),

/***/ "./src/main/typescript/impl/xhrCore/XhrRequest.ts":
/*!********************************************************!*\
  !*** ./src/main/typescript/impl/xhrCore/XhrRequest.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.XhrRequest = void 0;
var mona_dish_1 = __webpack_require__(/*! mona-dish */ "./node_modules/mona-dish/dist/js/commonjs/index_core.js");
var AjaxImpl_1 = __webpack_require__(/*! ../AjaxImpl */ "./src/main/typescript/impl/AjaxImpl.ts");
var XhrFormData_1 = __webpack_require__(/*! ./XhrFormData */ "./src/main/typescript/impl/xhrCore/XhrFormData.ts");
var ErrorData_1 = __webpack_require__(/*! ./ErrorData */ "./src/main/typescript/impl/xhrCore/ErrorData.ts");
var EventData_1 = __webpack_require__(/*! ./EventData */ "./src/main/typescript/impl/xhrCore/EventData.ts");
var Lang_1 = __webpack_require__(/*! ../util/Lang */ "./src/main/typescript/impl/util/Lang.ts");
var Const_1 = __webpack_require__(/*! ../core/Const */ "./src/main/typescript/impl/core/Const.ts");
var RequestDataResolver_1 = __webpack_require__(/*! ./RequestDataResolver */ "./src/main/typescript/impl/xhrCore/RequestDataResolver.ts");
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
        this.catchFuncs = [];
        this.thenFunc = [];
        /*
        * we omit promises here
        * some browsers do not support it and we do not need shim code
        */
        this.registerXhrCallbacks(function (data) {
            _this.resolve(data);
        }, function (data) {
            _this.reject(data);
        });
    }
    XhrRequest.prototype.start = function () {
        var _this = this;
        var ignoreErr = failSaveExecute;
        var xhrObject = this.xhrObject;
        var executesArr = function () {
            return _this.requestContext.getIf(Const_1.CTX_PARAM_PASS_THR, Const_1.P_EXECUTE).get("none").value.split(/\s+/gi);
        };
        try {
            var formElement = this.sourceForm.getAsElem(0).value;
            var viewState = jsf.getViewState(formElement);
            //encoded we need to decode
            //We generated a base representation of the current form
            var formData = new XhrFormData_1.XhrFormData(this.sourceForm);
            //in case someone has overloaded the viewstate with addtional decorators we merge
            //that in, there is no way around it, the spec allows it and getViewState
            //must be called, so whatever getViewState delivers has higher priority then
            //whatever the formData object delivers
            formData.assignEncodedString(viewState);
            formData.applyFileInputs.apply(formData, executesArr());
            this.contentType = formData.isMultipartRequest ? "undefined" : this.contentType;
            //next step the pass through parameters are merged in for post params
            var requestContext = this.requestContext;
            var passThroughParams = requestContext.getIf(Const_1.CTX_PARAM_PASS_THR);
            formData.shallowMerge(passThroughParams, true, true);
            this.responseContext = passThroughParams.deepCopy;
            //we have to shift the internal passthroughs around to build up our response context
            var responseContext = this.responseContext;
            responseContext.assign(Const_1.CTX_PARAM_MF_INTERNAL).value = this.internalContext.value;
            //per spec the onevent and onerrors must be passed through to the response
            responseContext.assign(Const_1.ON_EVENT).value = requestContext.getIf(Const_1.ON_EVENT).value;
            responseContext.assign(Const_1.ON_ERROR).value = requestContext.getIf(Const_1.ON_ERROR).value;
            xhrObject.open(this.ajaxType, (0, RequestDataResolver_1.resolveFinalUrl)(this.sourceForm, formData, this.ajaxType), true);
            //adding timeout
            this.timeout ? xhrObject.timeout = this.timeout : null;
            //a bug in the xhr stub library prevents the setRequestHeader to be properly executed on fake xhr objects
            //normal browsers should resolve this
            //tests can quietly fail on this one
            if (this.contentType != "undefined") {
                ignoreErr(function () { return xhrObject.setRequestHeader(Const_1.CONTENT_TYPE, "".concat(_this.contentType, "; charset=utf-8")); });
            }
            ignoreErr(function () { return xhrObject.setRequestHeader(Const_1.HEAD_FACES_REQ, Const_1.VAL_AJAX); });
            //probably not needed anymore, will test this
            //some webkit based mobile browsers do not follow the w3c spec of
            // setting the accept headers automatically
            ignoreErr(function () { return xhrObject.setRequestHeader(Const_1.REQ_ACCEPT, Const_1.STD_ACCEPT); });
            this.sendEvent(Const_1.BEGIN);
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
        mona_dish_1.Stream.of.apply(mona_dish_1.Stream, this.thenFunc).reduce(function (inputVal, thenFunc) {
            return thenFunc(inputVal);
        }, data);
    };
    XhrRequest.prototype.reject = function (data) {
        mona_dish_1.Stream.of.apply(mona_dish_1.Stream, this.catchFuncs).reduce(function (inputVal, catchFunc) {
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
        this.sendEvent(Const_1.STATE_EVT_TIMEOUT);
        reject();
    };
    XhrRequest.prototype.onSuccess = function (data, resolve, reject) {
        var _a, _b;
        this.sendEvent(Const_1.COMPLETE);
        //malforms always result in empty response xml
        if (!((_a = this === null || this === void 0 ? void 0 : this.xhrObject) === null || _a === void 0 ? void 0 : _a.responseXML)) {
            this.handleMalFormedXML(resolve);
            return;
        }
        jsf.ajax.response(this.xhrObject, (_b = this.responseContext.value) !== null && _b !== void 0 ? _b : {});
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
            var eventHandler = (0, RequestDataResolver_1.resolveHandlerFunc)(this.requestContext, this.responseContext, Const_1.ON_EVENT);
            AjaxImpl_1.Implementation.sendEvent(eventData, eventHandler);
        }
        catch (e) {
            this.handleError(e);
            throw e;
        }
    };
    XhrRequest.prototype.handleError = function (exception) {
        var errorData = ErrorData_1.ErrorData.fromClient(exception);
        var eventHandler = (0, RequestDataResolver_1.resolveHandlerFunc)(this.requestContext, this.responseContext, Const_1.ON_ERROR);
        AjaxImpl_1.Implementation.sendError(errorData, eventHandler);
    };
    XhrRequest.prototype.sendRequest = function (formData) {
        var isPost = this.ajaxType != Const_1.REQ_TYPE_GET;
        if (formData.isMultipartRequest) {
            //in case of a multipart request we send in a formData object as body
            this.xhrObject.send((isPost) ? formData.toFormData() : null);
        }
        else {
            //in case of a normal request we send it normally
            this.xhrObject.send((isPost) ? formData.toString() : null);
        }
    };
    return XhrRequest;
}());
exports.XhrRequest = XhrRequest;


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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main/typescript/api/Jsf.ts");
/******/ 	var __webpack_export_target__ = window;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=jsf-development.js.map
//# sourceMappingURL=jsf-development.js.map.jsf?ln=scripts