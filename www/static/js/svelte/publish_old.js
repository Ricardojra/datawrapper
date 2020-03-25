!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define("svelte/publish_old",t):(e=e||self).publish=t()}(this,(function(){"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function n(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function r(e){for(var r=1;r<arguments.length;r++){var i=null!=arguments[r]?arguments[r]:{};r%2?n(Object(i),!0).forEach((function(n){t(e,n,i[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):n(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function a(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function o(e,t,n){return(o=a()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var i=new(Function.bind.apply(e,r));return n&&s(i,n.prototype),i}).apply(null,arguments)}function u(e){var t="function"==typeof Map?new Map:void 0;return(u=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return o(e,arguments,i(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),s(r,e)})(e)}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function l(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function p(){}function h(e,t){for(var n in t)e[n]=t[n];return e}function d(e,t){for(var n in t)e[n]=1;return e}function f(e,t){e.appendChild(t)}function b(e,t,n){e.insertBefore(t,n)}function m(e){e.parentNode.removeChild(e)}function _(e){for(;e.nextSibling;)e.parentNode.removeChild(e.nextSibling)}function g(e,t){for(var n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function v(){return document.createDocumentFragment()}function w(e){return document.createElement(e)}function y(e){return document.createTextNode(e)}function N(e,t,n,r){e.addEventListener(t,n,r)}function O(e,t,n,r){e.removeEventListener(t,n,r)}function T(e,t,n){null==n?e.removeAttribute(t):e.setAttribute(t,n)}function j(e,t){e.data=""+t}function k(e,t,n){e.style.setProperty(t,n)}function x(e,t,n){e.classList[n?"add":"remove"](t)}function S(){return Object.create(null)}function E(t,n){return t!=t?n==n:t!==n||t&&"object"===e(t)||"function"==typeof t}function C(e,t){return e!=e?t==t:e!==t}function L(e,t){var n=e in this._handlers&&this._handlers[e].slice();if(n)for(var r=0;r<n.length;r+=1){var i=n[r];if(!i.__calling)try{i.__calling=!0,i.call(this,t)}finally{i.__calling=!1}}}function M(e){e._lock=!0,U(e._beforecreate),U(e._oncreate),U(e._aftercreate),e._lock=!1}function P(){return this._state}function H(e,t){e._handlers=S(),e._slots=S(),e._bind=t._bind,e._staged={},e.options=t,e.root=t.root||e,e.store=t.store||e.root.store,t.root||(e._beforecreate=[],e._oncreate=[],e._aftercreate=[])}function D(e,t){var n=this._handlers[e]||(this._handlers[e]=[]);return n.push(t),{cancel:function(){var e=n.indexOf(t);~e&&n.splice(e,1)}}}function U(e){for(;e&&e.length;)e.shift()()}var A={destroy:function(e){this.destroy=p,this.fire("destroy"),this.set=p,this._fragment.d(!1!==e),this._fragment=null,this._state={}},get:P,fire:L,on:D,set:function(e){this._set(h({},e)),this.root._lock||M(this.root)},_recompute:p,_set:function(e){var t=this._state,n={},r=!1;for(var i in e=h(this._staged,e),this._staged={},e)this._differs(e[i],t[i])&&(n[i]=r=!0);r&&(this._state=h(h({},t),e),this._recompute(n,this._state),this._bind&&this._bind(n,this._state),this._fragment&&(this.fire("state",{changed:n,current:this._state,previous:t}),this._fragment.p(n,this._state),this.fire("update",{changed:n,current:this._state,previous:t})))},_stage:function(e){h(this._staged,e)},_mount:function(e,t){this._fragment[this._fragment.i?"i":"m"](e,t||null)},_differs:E};var G={show:function(){var e=this,t=setTimeout((function(){e.set({visible:!0})}),400);this.set({t:t})},hide:function(){var e=this.get().t;clearTimeout(e),this.set({visible:!1})}};function I(e,t){var n,r,i,s,a=e._slotted.default;return{c:function(){n=w("div"),r=w("i"),i=y("\n        "),r.className="hat-icon im im-graduation-hat svelte-19xfki7",n.className="content svelte-19xfki7"},m:function(e,t){b(e,n,t),f(n,r),f(n,i),a&&(f(n,s||(s=document.createComment(""))),f(n,a))},d:function(e){e&&m(n),a&&function(e,t){for(;e.nextSibling;)t.appendChild(e.nextSibling)}(s,a)}}}function R(e){H(this,e),this._state=h({visible:!1},e.data),this._intro=!0,this._slotted=e.slots||{},this._fragment=function(e,t){var n,r,i,s=t.visible&&I(e);function a(t){e.show()}function o(t){e.hide()}return{c:function(){n=w("div"),(r=w("span")).textContent="?",i=y("\n    "),s&&s.c(),r.className="help-icon svelte-19xfki7",N(n,"mouseenter",a),N(n,"mouseleave",o),n.className="help svelte-19xfki7"},m:function(e,t){b(e,n,t),f(n,r),f(n,i),s&&s.m(n,null)},p:function(t,r){r.visible?s||((s=I(e)).c(),s.m(n,null)):s&&(s.d(1),s=null)},d:function(e){e&&m(n),s&&s.d(),O(n,"mouseenter",a),O(n,"mouseleave",o)}}}(this,this._state),e.target&&(this._fragment.c(),this._mount(e.target,e.anchor))}h(R.prototype,A),h(R.prototype,G);var q={};function F(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"core";"chart"===e?window.__dw&&window.__dw.vis&&window.__dw.vis.meta&&(q[e]=window.__dw.vis.meta.locale||{}):q[e]="core"===e?dw.backend.__messages.core:Object.assign({},dw.backend.__messages.core,dw.backend.__messages[e])}function W(e){var t=arguments,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"core";if(e=e.trim(),q[n]||F(n),!q[n][e])return"MISSING:"+e;var r=q[n][e];return"string"==typeof r&&arguments.length>2&&(r=r.replace(/\$(\d)/g,(function(e,n){return n=2+Number(n),void 0===t[n]?e:t[n]}))),r}function $(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=r({payload:null,raw:!1,method:"GET",baseUrl:"//".concat(dw.backend.__api_domain),mode:"cors",credentials:"include"},t,{headers:r({"Content-Type":"application/json"},t.headers)}),i=n.payload,s=n.baseUrl,a=n.raw,o=c(n,["payload","baseUrl","raw"]),u="".concat(s.replace(/\/$/,""),"/").concat(e.replace(/^\//,""));return i&&(o.body=JSON.stringify(i)),window.fetch(u,o).then((function(e){if(a)return e;if(!e.ok)throw new J(e);if(204!==e.status){var t=e.headers.get("content-type").split(";")[0];return"application/json"===t?e.json():"image/png"===t||"application/pdf"===t?e.blob():e.text()}}))}$.get=B("GET"),$.patch=B("PATCH"),$.put=B("PUT"),$.post=B("POST"),$.head=B("HEAD");function B(e){return function(t,n){if(n&&n.method)throw new Error("Setting option.method is not allowed in httpReq.".concat(e.toLowerCase(),"()"));return $(t,r({},n,{method:e}))}}$.delete=B("DELETE");var J=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=l(this,i(t).call(this))).name="HttpReqError",n.status=e.status,n.statusText=e.statusText,n.message="[".concat(e.status,"] ").concat(e.statusText),n.response=e,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(t,e),t}(u(Error));function z(e,t,n,r){window._paq&&window._paq.push(["trackEvent",e,t,n,r])}var K=[100,200,300,400,500,700,800,900,1e3];var Q=!0;var V={publish:function(){var e=this,t=this;if(window.chart.save){var n,r,i,s,a,o=t.get().chart;t.set({publishing:!0,publishStarted:(new Date).getTime(),now:(new Date).getTime(),progress:[],publish_error:!1}),o.metadata.publish["embed-heights"]=(t.get().embed_templates,n={},r=window.$,i=r(r("#iframe-vis")[0].contentDocument),s=r("h1",i).height()+r(".chart-intro",i).height()+r(".dw-chart-notes",i).height(),a=r("#iframe-vis").height(),K.forEach((function(e){i.find("h1,.chart-intro,.dw-chart-notes").css("width",e+"px");var t=r("h1",i).height()+r(".chart-intro",i).height()+r(".dw-chart-notes",i).height();n[e]=a+(t-s)})),i.find("h1,.chart-intro,.dw-chart-notes").css("width","auto"),n),t.set({chart:o}),z("Chart Editor","publish"),window.chart.attributes(o).save().then((function(n){$.post("/v3/charts/".concat(o.id,"/publish")).then((function(n){e.set({published:!0,progress:["done"]}),$.get("/v3/charts/".concat(o.id)).then((function(e){z("Chart Editor","publish-success"),t.publishFinished(e)}))})).catch((function(e){z("Chart Editor","publish-error",e.message)})),setTimeout((function(){t.get().publishing&&t.updateStatus()}),1e3)}))}else setTimeout((function(){t.publish()}),100)},updateStatus:function(){var e=this,t=this.get().chart;$.get("/v3/charts/".concat(t.id,"/publish/status")).then((function(t){e.set({progress:t.progress||[],now:(new Date).getTime()}),e.get().publishing&&setTimeout((function(){e.updateStatus()}),500)}))},publishFinished:function(e){var t=this;this.set({progress:["done"],published:!0,publishStarted:0,needs_republish:!1}),setTimeout((function(){return t.set({publishing:!1})}),1e3),this.set({chart:e}),window.parent.postMessage({source:"datawrapper",type:"chart-publish",chartId:e.id},"*"),window.chart.attributes(e)},copy:function(e){var t=this;t.refs.embedInput.select();try{document.execCommand("copy")&&(z("Chart Editor","embedcode-copy"),t.set({copy_success:!0}),setTimeout((function(){return t.set({copy_success:!1})}),300))}catch(e){}}};function X(e){var t=e.changed,n=e.current,r=window.dw&&window.dw.backend&&window.dw.backend.setUserData;if(t.publishing,t.embed_type&&r){var i=window.dw.backend.__userData;if(!n.embed_type||!i)return;i.embed_type=n.embed_type,window.dw.backend.setUserData(i)}if(t.shareurl_type&&r){var s=window.dw.backend.__userData;if(!n.shareurl_type||!s)return;s.shareurl_type=n.shareurl_type,window.dw.backend.setUserData(s)}t.published&&window.document.querySelector(".dw-create-publish .publish-step").classList[n.published?"add":"remove"]("is-published"),t.auto_publish&&n.auto_publish&&Q&&(this.publish(),Q=!1,window.history.replaceState("","",window.location.pathname))}function Y(e,t,n){var r=Object.create(e);return r.tpl=t[n],r}function Z(e,t,n){var r=Object.create(e);return r.tpl=t[n],r}function ee(e,t,n){var r=Object.create(e);return r.tpl=t[n],r}function te(e,t,n){var r=Object.create(e);return r.step=t[n],r.i=n,r}function ne(e,t){var n,r=W("publish / publish-intro");return{c:function(){k(n=w("p"),"margin-bottom","20px")},m:function(e,t){b(e,n,t),n.innerHTML=r},d:function(e){e&&m(n)}}}function re(e,t){var n,r=W("publish / republish-intro");return{c:function(){n=w("p")},m:function(e,t){b(e,n,t),n.innerHTML=r},d:function(e){e&&m(n)}}}function ie(e,t){var n,r,i,s,a,o,u=W("publish / publish-btn");return{c:function(){n=w("span"),r=w("i"),s=y("\n        "),a=w("span"),o=y(u),r.className=i="fa fa-fw "+(t.publishing?"fa-refresh fa-spin":"fa-cloud-upload")+" svelte-1wigpa8",a.className="title svelte-1wigpa8",n.className="publish"},m:function(e,t){b(e,n,t),f(n,r),f(n,s),f(n,a),f(a,o)},p:function(e,t){e.publishing&&i!==(i="fa fa-fw "+(t.publishing?"fa-refresh fa-spin":"fa-cloud-upload")+" svelte-1wigpa8")&&(r.className=i)},d:function(e){e&&m(n)}}}function se(e,t){var n,r,i,s,a,o,u=W("publish / republish-btn");return{c:function(){n=w("span"),r=w("i"),s=y(" "),a=w("span"),o=y(u),r.className=i="fa fa-fw fa-refresh "+(t.publishing?"fa-spin":"")+" svelte-1wigpa8",a.className="title svelte-1wigpa8",n.className="re-publish"},m:function(e,t){b(e,n,t),f(n,r),f(n,s),f(n,a),f(a,o)},p:function(e,t){e.publishing&&i!==(i="fa fa-fw fa-refresh "+(t.publishing?"fa-spin":"")+" svelte-1wigpa8")&&(r.className=i)},d:function(e){e&&m(n)}}}function ae(e,t){var n,r,i,s,a=W("publish / publish-btn-intro");return{c:function(){n=w("div"),(r=w("div")).innerHTML='<i class="fa fa-chevron-left"></i>',i=y("\n    "),s=w("div"),r.className="arrow svelte-1wigpa8",s.className="text svelte-1wigpa8",n.className="publish-intro svelte-1wigpa8"},m:function(e,t){b(e,n,t),f(n,r),f(n,i),f(n,s),s.innerHTML=a},d:function(e){e&&m(n)}}}function oe(e,t){var n,r=W("publish / republish-alert");return{c:function(){(n=w("div")).className="btn-aside alert svelte-1wigpa8"},m:function(e,t){b(e,n,t),n.innerHTML=r},d:function(e){e&&m(n)}}}function ue(e,t){var n,r=W("publish / publish-success");return{c:function(){(n=w("div")).className="alert alert-success"},m:function(e,t){b(e,n,t),n.innerHTML=r},d:function(e){e&&m(n)}}}function ce(e,t){var n;return{c:function(){(n=w("div")).className="alert alert-error"},m:function(e,r){b(e,n,r),n.innerHTML=t.publish_error},p:function(e,t){e.publish_error&&(n.innerHTML=t.publish_error)},d:function(e){e&&m(n)}}}function le(e,t){var n,r,i,s=W("publish / progress / please-wait"),a=t.publishWait>3e3&&pe(e,t);return{c:function(){n=w("div"),r=y(s),i=y(" "),a&&a.c(),n.className="alert alert-info publishing"},m:function(e,t){b(e,n,t),f(n,r),f(n,i),a&&a.m(n,null)},p:function(t,r){r.publishWait>3e3?a?a.p(t,r):((a=pe(e,r)).c(),a.m(n,null)):a&&(a.d(1),a=null)},d:function(e){e&&m(n),a&&a.d()}}}function pe(e,t){for(var n,r=t.progress,i=[],s=0;s<r.length;s+=1)i[s]=he(e,te(t,r,s));return{c:function(){n=w("ul");for(var e=0;e<i.length;e+=1)i[e].c();n.className="publish-progress unstyled svelte-1wigpa8"},m:function(e,t){b(e,n,t);for(var r=0;r<i.length;r+=1)i[r].m(n,null)},p:function(t,s){if(t.progress){r=s.progress;for(var a=0;a<r.length;a+=1){var o=te(s,r,a);i[a]?i[a].p(t,o):(i[a]=he(e,o),i[a].c(),i[a].m(n,null))}for(;a<i.length;a+=1)i[a].d(1);i.length=r.length}},d:function(e){e&&m(n),g(i,e)}}}function he(e,t){var n,r,i,s,a,o=W("publish / status / "+t.step);return{c:function(){n=w("li"),r=w("i"),s=y(" "),a=w("noscript"),r.className=i="fa fa-fw "+(t.i<t.progress.length-1?"fa-check":"fa-spinner fa-pulse")+" svelte-1wigpa8",n.className="svelte-1wigpa8",x(n,"done",t.i<t.progress.length-1)},m:function(e,t){b(e,n,t),f(n,r),f(n,s),f(n,a),a.insertAdjacentHTML("afterend",o)},p:function(e,t){e.progress&&i!==(i="fa fa-fw "+(t.i<t.progress.length-1?"fa-check":"fa-spinner fa-pulse")+" svelte-1wigpa8")&&(r.className=i),e.progress&&o!==(o=W("publish / status / "+t.step))&&(_(a),a.insertAdjacentHTML("afterend",o)),e.progress&&x(n,"done",t.i<t.progress.length-1)},d:function(e){e&&m(n)}}}function de(e,t){var n,r,i,s,a,o=t.tpl.name;function u(){e.set({shareurl_type:r.__value})}return{c:function(){n=w("label"),r=w("input"),s=y(" "),a=w("noscript"),e._bindingGroups[0].push(r),N(r,"change",u),r.__value=i=t.tpl.id,r.value=r.__value,T(r,"type","radio"),r.name="url-type",r.className="svelte-1wigpa8",n.className="radio"},m:function(e,i){b(e,n,i),f(n,r),r.checked=r.__value===t.shareurl_type,f(n,s),f(n,a),a.insertAdjacentHTML("afterend",o)},p:function(e,t){e.shareurl_type&&(r.checked=r.__value===t.shareurl_type),e.plugin_shareurls&&i!==(i=t.tpl.id)&&(r.__value=i),r.value=r.__value,e.plugin_shareurls&&o!==(o=t.tpl.name)&&(_(a),a.insertAdjacentHTML("afterend",o))},d:function(t){t&&m(n),e._bindingGroups[0].splice(e._bindingGroups[0].indexOf(r),1),O(r,"change",u)}}}function fe(e,t){var n,r,i,s,a,o=t.tpl.title;function u(){e.set({embed_type:r.__value})}return{c:function(){n=w("label"),r=w("input"),s=y(" "),a=w("noscript"),e._bindingGroups[1].push(r),N(r,"change",u),T(r,"type","radio"),r.__value=i=t.tpl.id,r.value=r.__value,r.className="svelte-1wigpa8",n.className="radio"},m:function(e,i){b(e,n,i),f(n,r),r.checked=r.__value===t.embed_type,f(n,s),f(n,a),a.insertAdjacentHTML("afterend",o)},p:function(e,t){e.embed_type&&(r.checked=r.__value===t.embed_type),e.embed_templates&&i!==(i=t.tpl.id)&&(r.__value=i),r.value=r.__value,e.embed_templates&&o!==(o=t.tpl.title)&&(_(a),a.insertAdjacentHTML("afterend",o))},d:function(t){t&&m(n),e._bindingGroups[1].splice(e._bindingGroups[1].indexOf(r),1),O(r,"change",u)}}}function be(e,t){var n,r,i,s,a,o,u=t.tpl.title,c=t.tpl.text;return{c:function(){n=w("div"),r=w("b"),i=y(u),s=y(":"),a=y(" "),o=w("noscript")},m:function(e,t){b(e,n,t),f(n,r),f(r,i),f(r,s),f(n,a),f(n,o),o.insertAdjacentHTML("afterend",c)},p:function(e,t){e.embed_templates&&u!==(u=t.tpl.title)&&j(i,u),e.embed_templates&&c!==(c=t.tpl.text)&&(_(o),o.insertAdjacentHTML("afterend",c))},d:function(e){e&&m(n)}}}function me(e){var t=this;H(this,e),this.refs={},this._state=h({chart:{id:""},embed_templates:[],plugin_shareurls:[],published:!1,publishing:!1,publishStarted:0,needs_republish:!1,publish_error:!1,auto_publish:!1,progress:[],shareurl_type:"default",embed_type:"responsive",copy_success:!1},e.data),this._recompute({shareurl_type:1,chart:1,plugin_shareurls:1,published:1,embed_type:1,publishStarted:1,now:1},this._state),this._bindingGroups=[[],[]],this._intro=!0,this._handlers.state=[X],X.call(this,{changed:d({},this._state),current:this._state}),this._fragment=function(e,t){var n,r,i,s,a,o,u,c,l,p,h,d,_,x,S,E,C,L,M,P,H,D,U,A,G,I,q,F,$,B,J,z,K,Q,V,X,te,pe,he,me,_e,ge,ve,we,ye,Ne,Oe,Te,je,ke,xe,Se,Ee,Ce,Le,Me,Pe,He=W("publish / share-embed"),De=W("publish / share-url"),Ue=W("publish / share-url / fullscreen"),Ae=W("publish / help / share-url"),Ge=W("publish / embed"),Ie=W("publish / copy"),Re=W("publish / copy-success"),qe=W("publish / embed / help");function Fe(e){return e.published?re:ne}var We=Fe(t),$e=We(e,t);function Be(e){return e.published?se:ie}var Je=Be(t),ze=Je(e,t);function Ke(t){e.publish()}var Qe=!t.published&&ae(),Ve=t.needs_republish&&!t.publishing&&oe(),Xe=t.published&&!t.needs_republish&&t.progress&&t.progress.includes("done")&&!t.publishing&&ue(),Ye=t.publish_error&&ce(e,t),Ze=t.publishing&&le(e,t);function et(){e.set({shareurl_type:D.__value})}for(var tt=t.plugin_shareurls,nt=[],rt=0;rt<tt.length;rt+=1)nt[rt]=de(e,ee(t,tt,rt));var it=new R({root:e.root,store:e.store,slots:{default:v()}}),st=t.embed_templates,at=[];for(rt=0;rt<st.length;rt+=1)at[rt]=fe(e,Z(t,st,rt));function ot(n){e.copy(t.embedCode)}var ut=t.embed_templates.slice(2),ct=[];for(rt=0;rt<ut.length;rt+=1)ct[rt]=be(e,Y(t,ut,rt));var lt=new R({root:e.root,store:e.store,slots:{default:v()}});return{c:function(){$e.c(),n=y("\n\n"),r=w("button"),ze.c(),s=y("\n\n"),Qe&&Qe.c(),a=y(" "),Ve&&Ve.c(),o=y(" "),Xe&&Xe.c(),u=y(" "),Ye&&Ye.c(),c=y(" "),Ze&&Ze.c(),l=y("\n\n"),p=w("div"),h=w("h2"),d=y("\n    "),_=w("div"),x=w("i"),S=y("\n        "),E=w("div"),C=w("div"),L=w("b"),M=y("\n                "),P=w("div"),H=w("label"),D=w("input"),U=y("\n                        "),A=w("noscript"),G=y("\n                    ");for(var f=0;f<nt.length;f+=1)nt[f].c();I=y("\n            "),q=w("div"),F=w("a"),$=y(t.shareUrl),B=y("\n        "),J=w("div"),it._fragment.c(),z=y("\n\n    "),K=w("div"),Q=w("i"),V=y("\n        "),X=w("div"),te=w("div"),pe=w("b"),he=y("\n                "),me=w("div");for(f=0;f<at.length;f+=1)at[f].c();_e=y("\n            "),ge=w("div"),ve=w("textarea"),we=y("\n                "),ye=w("button"),Ne=w("i"),Oe=y(" "),Te=y(Ie),je=y("\n                "),ke=w("div"),xe=y(Re),Ee=y("\n        "),Ce=w("div"),Le=w("noscript"),Me=y(" ");for(f=0;f<ct.length;f+=1)ct[f].c();lt._fragment.c(),N(r,"click",Ke),r.disabled=t.publishing,r.className=i="btn-publish btn btn-primary btn-large "+(t.published?"":"btn-first-publish")+" svelte-1wigpa8",x.className="icon fa fa-link fa-fw",e._bindingGroups[0].push(D),N(D,"change",et),D.__value="default",D.value=D.__value,T(D,"type","radio"),D.name="url-type",D.className="svelte-1wigpa8",H.className="radio",P.className="embed-options svelte-1wigpa8",C.className="h",F.target="_blank",F.className="share-url svelte-1wigpa8",F.href=t.shareUrl,q.className="inpt",E.className="ctrls",_.className="block",Q.className="icon fa fa-code fa-fw",me.className="embed-options svelte-1wigpa8",te.className="h",T(ve,"type","text"),ve.className="input embed-code svelte-1wigpa8",ve.readOnly=!0,ve.value=t.embedCode,Ne.className="fa fa-copy",N(ye,"click",ot),ye.className="btn btn-copy",ye.title="copy",ke.className=Se="copy-success "+(t.copy_success?"show":"")+" svelte-1wigpa8",ge.className="inpt",X.className="ctrls",K.className="block",k(p,"margin-top","20px"),p.className=Pe=t.published?"":"inactive"},m:function(i,m){$e.m(i,m),b(i,n,m),b(i,r,m),ze.m(r,null),b(i,s,m),Qe&&Qe.m(i,m),b(i,a,m),Ve&&Ve.m(i,m),b(i,o,m),Xe&&Xe.m(i,m),b(i,u,m),Ye&&Ye.m(i,m),b(i,c,m),Ze&&Ze.m(i,m),b(i,l,m),b(i,p,m),f(p,h),h.innerHTML=He,f(p,d),f(p,_),f(_,x),f(_,S),f(_,E),f(E,C),f(C,L),L.innerHTML=De,f(C,M),f(C,P),f(P,H),f(H,D),D.checked=D.__value===t.shareurl_type,f(H,U),f(H,A),A.insertAdjacentHTML("afterend",Ue),f(P,G);for(var g=0;g<nt.length;g+=1)nt[g].m(P,null);f(E,I),f(E,q),f(q,F),f(F,$),f(_,B),f(it._slotted.default,J),J.innerHTML=Ae,it._mount(_,null),f(p,z),f(p,K),f(K,Q),f(K,V),f(K,X),f(X,te),f(te,pe),pe.innerHTML=Ge,f(te,he),f(te,me);for(g=0;g<at.length;g+=1)at[g].m(me,null);f(X,_e),f(X,ge),f(ge,ve),e.refs.embedInput=ve,f(ge,we),f(ge,ye),f(ye,Ne),f(ye,Oe),f(ye,Te),f(ge,je),f(ge,ke),f(ke,xe),f(K,Ee),f(lt._slotted.default,Ce),f(Ce,Le),Le.insertAdjacentHTML("beforebegin",qe),f(Ce,Me);for(g=0;g<ct.length;g+=1)ct[g].m(Ce,null);lt._mount(K,null)},p:function(s,h){if(We!==(We=Fe(t=h))&&($e.d(1),($e=We(e,t)).c(),$e.m(n.parentNode,n)),Je===(Je=Be(t))&&ze?ze.p(s,t):(ze.d(1),(ze=Je(e,t)).c(),ze.m(r,null)),s.publishing&&(r.disabled=t.publishing),s.published&&i!==(i="btn-publish btn btn-primary btn-large "+(t.published?"":"btn-first-publish")+" svelte-1wigpa8")&&(r.className=i),t.published?Qe&&(Qe.d(1),Qe=null):Qe||((Qe=ae()).c(),Qe.m(a.parentNode,a)),t.needs_republish&&!t.publishing?Ve||((Ve=oe()).c(),Ve.m(o.parentNode,o)):Ve&&(Ve.d(1),Ve=null),t.published&&!t.needs_republish&&t.progress&&t.progress.includes("done")&&!t.publishing?Xe||((Xe=ue()).c(),Xe.m(u.parentNode,u)):Xe&&(Xe.d(1),Xe=null),t.publish_error?Ye?Ye.p(s,t):((Ye=ce(e,t)).c(),Ye.m(c.parentNode,c)):Ye&&(Ye.d(1),Ye=null),t.publishing?Ze?Ze.p(s,t):((Ze=le(e,t)).c(),Ze.m(l.parentNode,l)):Ze&&(Ze.d(1),Ze=null),s.shareurl_type&&(D.checked=D.__value===t.shareurl_type),s.plugin_shareurls||s.shareurl_type){tt=t.plugin_shareurls;for(var d=0;d<tt.length;d+=1){var f=ee(t,tt,d);nt[d]?nt[d].p(s,f):(nt[d]=de(e,f),nt[d].c(),nt[d].m(P,null))}for(;d<nt.length;d+=1)nt[d].d(1);nt.length=tt.length}if(s.shareUrl&&(j($,t.shareUrl),F.href=t.shareUrl),s.embed_templates||s.embed_type){st=t.embed_templates;for(d=0;d<st.length;d+=1){var b=Z(t,st,d);at[d]?at[d].p(s,b):(at[d]=fe(e,b),at[d].c(),at[d].m(me,null))}for(;d<at.length;d+=1)at[d].d(1);at.length=st.length}if(s.embedCode&&(ve.value=t.embedCode),s.copy_success&&Se!==(Se="copy-success "+(t.copy_success?"show":"")+" svelte-1wigpa8")&&(ke.className=Se),s.embed_templates){ut=t.embed_templates.slice(2);for(d=0;d<ut.length;d+=1){var m=Y(t,ut,d);ct[d]?ct[d].p(s,m):(ct[d]=be(e,m),ct[d].c(),ct[d].m(Ce,null))}for(;d<ct.length;d+=1)ct[d].d(1);ct.length=ut.length}s.published&&Pe!==(Pe=t.published?"":"inactive")&&(p.className=Pe)},d:function(t){$e.d(t),t&&(m(n),m(r)),ze.d(),O(r,"click",Ke),t&&m(s),Qe&&Qe.d(t),t&&m(a),Ve&&Ve.d(t),t&&m(o),Xe&&Xe.d(t),t&&m(u),Ye&&Ye.d(t),t&&m(c),Ze&&Ze.d(t),t&&(m(l),m(p)),e._bindingGroups[0].splice(e._bindingGroups[0].indexOf(D),1),O(D,"change",et),g(nt,t),it.destroy(),g(at,t),e.refs.embedInput===ve&&(e.refs.embedInput=null),O(ye,"click",ot),g(ct,t),lt.destroy()}}}(this,this._state),this.root._oncreate.push((function(){t.fire("update",{changed:d({},t._state),current:t._state})})),e.target&&(this._fragment.c(),this._mount(e.target,e.anchor),M(this))}function _e(e,t){this._handlers={},this._dependents=[],this._computed=S(),this._sortedComputedProperties=[],this._state=h({},e),this._differs=t&&t.immutable?C:E}h(me.prototype,A),h(me.prototype,V),me.prototype._recompute=function(e,t){var n,r,i,s,a,o;(e.shareurl_type||e.chart||e.plugin_shareurls||e.published)&&this._differs(t.shareUrl,t.shareUrl=function(e){var t=e.shareurl_type,n=e.chart,r=e.plugin_shareurls;if(!e.published)return"https://www.datawrapper.de/...";if("default"===t)return n.publicUrl;var i="";return r.forEach((function(e){e.id===t&&(i=(i=e.url.replace(/%chart_id%/g,n.id)).replace(/%(.*?)%/g,(function(e,t){return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(!t)return e;for(var r=t.split("."),i=e,s=0;s<r.length&&null!=i;s++)i=i[r[s]];return null==i?n:i}({id:n.id,metadata:n.metadata},t)})))})),i}(t))&&(e.shareUrl=!0),(e.embed_type||e.chart)&&this._differs(t.embedCode,t.embedCode=(r=(n=t).embed_type,(i=n.chart).metadata?i.metadata.publish&&!i.metadata.publish["embed-codes"]?'<iframe src="'.concat(i.publicUrl,'" width="100%" height="').concat(i.metadata.publish["embed-height"],'" scrolling="no" frameborder="0" allowtransparency="true"></iframe>'):i.metadata.publish["embed-codes"]["embed-method-"+r]?i.metadata.publish["embed-codes"]["embed-method-"+r]:"":""))&&(e.embedCode=!0),(e.publishStarted||e.now)&&this._differs(t.publishWait,t.publishWait=(a=(s=t).publishStarted,o=s.now,a>0?o-a:0))&&(e.publishWait=!0)},h(_e.prototype,{_add:function(e,t){this._dependents.push({component:e,props:t})},_init:function(e){for(var t={},n=0;n<e.length;n+=1){var r=e[n];t["$"+r]=this._state[r]}return t},_remove:function(e){for(var t=this._dependents.length;t--;)if(this._dependents[t].component===e)return void this._dependents.splice(t,1)},_set:function(e,t){var n=this,r=this._state;this._state=h(h({},r),e);for(var i=0;i<this._sortedComputedProperties.length;i+=1)this._sortedComputedProperties[i].update(this._state,t);this.fire("state",{changed:t,previous:r,current:this._state}),this._dependents.filter((function(e){for(var r={},i=!1,s=0;s<e.props.length;s+=1){var a=e.props[s];a in t&&(r["$"+a]=n._state[a],i=!0)}if(i)return e.component._stage(r),!0})).forEach((function(e){e.component.set({})})),this.fire("update",{changed:t,previous:r,current:this._state})},_sortComputedProperties:function(){var e,t=this._computed,n=this._sortedComputedProperties=[],r=S();function i(s){var a=t[s];a&&(a.deps.forEach((function(t){if(t===e)throw new Error("Cyclical dependency detected between ".concat(t," <-> ").concat(s));i(t)})),r[s]||(r[s]=!0,n.push(a)))}for(var s in this._computed)i(e=s)},compute:function(e,t,n){var r,i=this,s={deps:t,update:function(s,a,o){var u=t.map((function(e){return e in a&&(o=!0),s[e]}));if(o){var c=n.apply(null,u);i._differs(c,r)&&(r=c,a[e]=!0,s[e]=r)}}};this._computed[e]=s,this._sortComputedProperties();var a=h({},this._state),o={};s.update(a,o,!0),this._set(a,o)},fire:L,get:P,on:D,set:function(e){var t=this._state,n=this._changed={},r=!1;for(var i in e){if(this._computed[i])throw new Error("'".concat(i,"' is a read-only computed property"));this._differs(e[i],t[i])&&(n[i]=r=!0)}r&&this._set(e,n)}});return{App:me,data:{chart:{id:""},embed_templates:[],plugin_shareurls:[],published:!1,publishing:!1,needs_republish:!1,publish_error:!1,auto_publish:!1,progress:[],shareurl_type:"default",embed_type:"responsive",copy_success:!1},store:new _e({})}}));
