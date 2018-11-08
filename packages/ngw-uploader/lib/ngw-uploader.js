!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.NgwUploader=t():e.NgwUploader=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,n,r){(function(e,r){!function(e,t){t(n)}(0,function(n){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */function o(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}}var i="undefined"!=typeof window?window:void 0!==e?e:"undefined"!=typeof self?self:{};!function(e,t){e(t={exports:{}},t.exports)}(function(e,n){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(e,n){if(null==e)throw new TypeError("Cannot convert first argument to object");for(let t=Object(e),n=1;n<arguments.length;n++){let e=arguments[n];if(null!=e)for(let n=Object.keys(Object(e)),r=0,o=n.length;r<o;r++){let o=n[r],i=Object.getOwnPropertyDescriptor(e,o);void 0!==i&&i.enumerable&&(t[o]=e[o])}}return t}}),function(){function e(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})}function t(){}function n(e){if(!(this instanceof n))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],c(e,this)}function o(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,n._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var r;try{r=n(e._value)}catch(e){return void a(t.promise,e)}s(t.promise,r)}else(1===e._state?s:a)(t.promise,e._value)})):e._deferreds.push(t)}function s(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var r=t.then;if(t instanceof n)return e._state=3,e._value=t,void u(e);if("function"==typeof r)return void c(function(e,t){return function(){e.apply(t,arguments)}}(r,t),e)}e._state=1,e._value=t,u(e)}catch(t){a(e,t)}}function a(e,t){e._state=2,e._value=t,u(e)}function u(e){2===e._state&&0===e._deferreds.length&&n._immediateFn(function(){e._handled||n._unhandledRejectionFn(e._value)});for(var t=0,r=e._deferreds.length;r>t;t++)o(e,e._deferreds[t]);e._deferreds=null}function c(e,t){var n=!1;try{e(function(e){n||(n=!0,s(t,e))},function(e){n||(n=!0,a(t,e))})}catch(e){if(n)return;n=!0,a(t,e)}}var l=setTimeout;n.prototype.catch=function(e){return this.then(null,e)},n.prototype.then=function(e,n){var r=new this.constructor(t);return o(this,new function(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}(e,n,r)),r},n.prototype.finally=e,n.all=function(e){return new n(function(t,n){function r(e,s){try{if(s&&("object"==typeof s||"function"==typeof s)){var a=s.then;if("function"==typeof a)return void a.call(s,function(t){r(e,t)},n)}o[e]=s,0==--i&&t(o)}catch(e){n(e)}}if(!e||void 0===e.length)throw new TypeError("Promise.all accepts an array");var o=Array.prototype.slice.call(e);if(0===o.length)return t([]);for(var i=o.length,s=0;o.length>s;s++)r(s,o[s])})},n.resolve=function(e){return e&&"object"==typeof e&&e.constructor===n?e:new n(function(t){t(e)})},n.reject=function(e){return new n(function(t,n){n(e)})},n.race=function(e){return new n(function(t,n){for(var r=0,o=e.length;o>r;r++)e[r].then(t,n)})},n._immediateFn="function"==typeof r&&function(e){r(e)}||function(e){l(e,0)},n._unhandledRejectionFn=function(e){void 0!==console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var f=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==i)return i;throw Error("unable to locate global object")}();"Promise"in f?f.Promise.prototype.finally||(f.Promise.prototype.finally=e):f.Promise=n}()});var s={route:"/api/component/pyramid/route"},a=function(){function e(e){this.options={},this._loadingQueue={},this._loadingStatus={},this.options=Object.assign({},s,e||{})}return e.prototype.connect=function(){return function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function s(e){try{u(r.next(e))}catch(e){i(e)}}function a(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(s,a)}u((r=r.apply(e,t||[])).next())})}(this,void 0,void 0,function(){var e,t,n,r=this;return o(this,function(o){switch(o.label){case 0:return this.route?[2,Promise.resolve(this.route)]:[3,1];case 1:return this.options.auth?(e=this.options.auth,t=e.login,n=e.password,t&&n?[4,this.getUserInfo()]:[3,3]):[3,3];case 2:o.sent(),o.label=3;case 3:return[4,this.makeQuery(this.options.route,{},{}).then(function(e){return r.route=e,e})];case 4:return[2,o.sent()]}})})},e.prototype.getUserInfo=function(){var e=this,t=this.makeClientId();return this.makeQuery("/api/component/auth/current_user",{},{headers:{Authorization:"Basic "+t,"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"*"},mode:"cors"}).then(function(t){console.log(t),"guest"!==t.keyname&&(t.clientId=e.makeClientId(),localStorage&&localStorage.setItem("nguser",JSON.stringify(t)))})},e.prototype.makeClientId=function(){var e=this.options.auth,t=e.login,n=e.password;return window.btoa(unescape(encodeURIComponent(t+":"+n)))},e.prototype.request=function(e,t,n){var r=this;return this.connect().then(function(o){for(var i in o)if(o.hasOwnProperty(i)&&i===e){var s=o[i].slice(),a=s.shift();if(s.length){t=t||{};for(var u={},l=0;l<s.length;l++){var f=s[l];if(u[l]="{"+f+"}",void 0===t[f])throw new Error("`"+f+"` url api argument is not specified")}a=c(a,u)}return r.makeQuery(a,t,n)}})},e.prototype.post=function(e,t,n){return(t=t||{}).method="POST",this.request(e,n,t)},e.prototype.makeQuery=function(e,t,n){var r=this;if(e=(this.options.baseUrl?this.options.baseUrl:"")+e)return t&&(e=c(e,t)),e=e.replace(/([^:]\/)\/+/g,"$1"),this._loadingStatus[e]?(this._loadingStatus[e]=!1,new Promise(function(t,n){r._setLoadingQueue(e,t,n)})):(this._loadingStatus[e]=!0,this._getJson(e,n).then(function(t){return r._loadingStatus[e]=!1,r._executeLoadingQueue(e,t),t}).catch(function(t){throw r._loadingStatus[e]=!1,r._executeLoadingQueue(e,t,!0),t}));throw new Error("No `url` parameter set for option "+name)},e.prototype._setLoadingQueue=function(e,t,n){this._loadingQueue[e]=this._loadingQueue[e]||{name:e,waiting:[]},this._loadingQueue[e].waiting.push({resolve:t,reject:n,timestamp:new Date})},e.prototype._executeLoadingQueue=function(e,t,n){var r=this._loadingQueue[e];if(r){for(var o=0;o<r.waiting.length;o++){var i=r.waiting[o];n?i.reject&&i.reject():i.resolve(t)}r.waiting=[]}},e.prototype._getJson=function(e,t){return new Promise(function(n,r){!function(e,t,n,r){void 0===n&&(n={});var o;n.method=n.method||"GET","cors"===n.mode?o=function(e,t){var n=new XMLHttpRequest;if("withCredentials"in n)n.open(e,t,!0);else{var r=XDomainRequest;void 0!==r?(n=new r).open(e,t):n=null}return n}(n.method,e):(o=new XMLHttpRequest).open(n.method||"GET",e,!0);o.onreadystatechange=function(){if(4===o.readyState&&200===o.status||3===o.readyState&&201===o.status){if(o.responseText)try{t(JSON.parse(o.responseText))}catch(e){r()}}else if(3===o.readyState&&400===o.status)if(o.responseText)try{r(JSON.parse(o.responseText))}catch(e){r({message:""})}else r({message:""})},o.onerror=function(e){r(e)},o.upload.onprogress=function(e){if(e.lengthComputable){var t=e.loaded/e.total*100;n.onProgress&&n.onProgress(t)}};var i,s=n.headers;if(s)for(var a in s)s.hasOwnProperty(a)&&o.setRequestHeader(a,s[a]);if(o.withCredentials=n.withCredentials,n.file){if((i=new FormData).append("file",n.file),n.data)for(var u in i)i.hasOwnProperty(u)&&i.append(u,i[u])}else i=n.data?JSON.stringify(n.data):null;o.send(i)}(e,n,t,r)})},e}();var u=/\{ *([\w_-]+) *\}/g;function c(e,t){return e.replace(u,function(e,n){var r=t[n];if(void 0===r)throw new Error("No value provided for letiable "+e);return"function"==typeof r&&(r=r(t)),r})}n.NgwConnector=a,Object.defineProperty(n,"__esModule",{value:!0})})}).call(this,r(0),r(3).setImmediate)},function(e,t){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function r(e){return"function"==typeof e}function o(e){return"object"==typeof e&&null!==e}function i(e){return void 0===e}e.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(e){if(!function(e){return"number"==typeof e}(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},n.prototype.emit=function(e){var t,n,s,a,u,c;if(this._events||(this._events={}),"error"===e&&(!this._events.error||o(this._events.error)&&!this._events.error.length)){if((t=arguments[1])instanceof Error)throw t;var l=new Error('Uncaught, unspecified "error" event. ('+t+")");throw l.context=t,l}if(i(n=this._events[e]))return!1;if(r(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:a=Array.prototype.slice.call(arguments,1),n.apply(this,a)}else if(o(n))for(a=Array.prototype.slice.call(arguments,1),s=(c=n.slice()).length,u=0;u<s;u++)c[u].apply(this,a);return!0},n.prototype.addListener=function(e,t){var s;if(!r(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,r(t.listener)?t.listener:t),this._events[e]?o(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,o(this._events[e])&&!this._events[e].warned&&(s=i(this._maxListeners)?n.defaultMaxListeners:this._maxListeners)&&s>0&&this._events[e].length>s&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace()),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(e,t){if(!r(t))throw TypeError("listener must be a function");var n=!1;function o(){this.removeListener(e,o),n||(n=!0,t.apply(this,arguments))}return o.listener=t,this.on(e,o),this},n.prototype.removeListener=function(e,t){var n,i,s,a;if(!r(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(s=(n=this._events[e]).length,i=-1,n===t||r(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(o(n)){for(a=s;a-- >0;)if(n[a]===t||n[a].listener&&n[a].listener===t){i=a;break}if(i<0)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(i,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},n.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(r(n=this._events[e]))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},n.prototype.listeners=function(e){return this._events&&this._events[e]?r(this._events[e])?[this._events[e]]:this._events[e].slice():[]},n.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(r(t))return 1;if(t)return t.length}return 0},n.listenerCount=function(e,t){return e.listenerCount(t)}},function(e,t,n){(function(e){var r=void 0!==e&&e||"undefined"!=typeof self&&self||window,o=Function.prototype.apply;function i(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new i(o.call(setTimeout,r,arguments),clearTimeout)},t.setInterval=function(){return new i(o.call(setInterval,r,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(r,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},n(4),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n(0))},function(e,t,n){(function(e,t){!function(e,n){"use strict";if(!e.setImmediate){var r,o=1,i={},s=!1,a=e.document,u=Object.getPrototypeOf&&Object.getPrototypeOf(e);u=u&&u.setTimeout?u:e,"[object process]"==={}.toString.call(e.process)?r=function(e){t.nextTick(function(){l(e)})}:function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?function(){var t="setImmediate$"+Math.random()+"$",n=function(n){n.source===e&&"string"==typeof n.data&&0===n.data.indexOf(t)&&l(+n.data.slice(t.length))};e.addEventListener?e.addEventListener("message",n,!1):e.attachEvent("onmessage",n),r=function(n){e.postMessage(t+n,"*")}}():e.MessageChannel?function(){var e=new MessageChannel;e.port1.onmessage=function(e){l(e.data)},r=function(t){e.port2.postMessage(t)}}():a&&"onreadystatechange"in a.createElement("script")?function(){var e=a.documentElement;r=function(t){var n=a.createElement("script");n.onreadystatechange=function(){l(t),n.onreadystatechange=null,e.removeChild(n),n=null},e.appendChild(n)}}():r=function(e){setTimeout(l,0,e)},u.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var s={callback:e,args:t};return i[o]=s,r(o),o++},u.clearImmediate=c}function c(e){delete i[e]}function l(e){if(s)setTimeout(l,0,e);else{var t=i[e];if(t){s=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}(t)}finally{c(e),s=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,n(0),n(5))},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(e){r=s}}();var u,c=[],l=!1,f=-1;function p(){l&&u&&(l=!1,u.length?c=u.concat(c):f=-1,c.length&&d())}function d(){if(!l){var e=a(p);l=!0;for(var t=c.length;t;){for(u=c,c=[];++f<t;)u&&u[f].run();f=-1,t=c.length}u=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function m(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new h(e,t)),1!==c.length||l||a(d)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){"use strict";n.r(t);var r=n(1),o=n(2),i=/\{ *([\w_-]+) *\}/g;function s(e){return function(t,n,r){var o=r.value;return r.value=function(){for(var t=this,r=[],s=0;s<arguments.length;s++)r[s]=arguments[s];var a=status||n;e&&e.template&&"object"==typeof r[0]&&(a=function(e,t){return e.replace(i,function(e,n){var r=t[n];return void 0===r?r="":"function"==typeof r&&(r=r(t)),r})}(e.template,r[0]));var u={status:e.status,state:"begin",message:a+" start",data:r[0]};return this.emitter.emit("status:change",u),o.apply(this,r).then(function(n){var r={status:e.status,state:"end",message:a+" finish",data:n};return t.emitter.emit("status:change",r),n}).catch(function(n){var r={status:e.status,state:"error",message:a+" error",data:n};throw t.emitter.emit("status:change",r),n})},r}}var a=function(){return(a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},u=function(e,t,n,r){var o,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(i<3?o(s):i>3?o(t,n,s):o(t,n))||s);return i>3&&s&&Object.defineProperty(t,n,s),s},c=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},l=function(){function e(e){this.options={inputOptions:{html:"Upload file"}},this.emitter=new o.EventEmitter,this.options=a({},this.options,e),this.connector=new r.NgwConnector(e)}return e.prototype.createInput=function(e){var t=this;void 0===e&&(e={}),e=a({},this.options.inputOptions,e);var n=document.createElement("input");return n.setAttribute("type","file"),n.innerHTML=e.html,n.addEventListener("change",function(){var r=t.uploadRaster(n.files[0],e);e.success&&r.then(e.success),e.error&&r.then(e.error)}),n},e.prototype.uploadRaster=function(e,t){var n=this;return this.fileUpload(e,t).then(function(e){var r=t.name||e.name;return t.createName?r=t.createName(r):t.addTimestampToName&&(r+="_"+(new Date).toISOString()),t.name=r,n.createResource(e,r,t).then(function(e){return e?(e.name=e.name||t.name,n.createStyle(e)):Promise.reject("No resource")})})},e.prototype.createResource=function(e,t,n){var r={resource:{cls:"raster_layer",display_name:t,parent:{id:void 0!==n.parentId?n.parentId:0}},raster_layer:{source:{id:e.id,mime_type:e.mime_type,size:e.size},srs:{id:3857}}};return this.connector.post("resource.collection",{data:r,headers:{Accept:"*/*"}})},e.prototype.createStyle=function(e,t){var n={resource:{cls:"raster_style",description:null,display_name:(t=t||e.name||e.id)+"_style",keyname:null,parent:{id:e.id}}};return this.connector.post("resource.collection",{data:n}).then(function(e){return e.name=e.name||t,e})},e.prototype.createWms=function(e,t){var n={resource:{cls:"wmsserver_service",parent:{id:0},display_name:"WMS_"+(t=t||e.name||e.id),keyname:null,description:null},resmeta:{items:{}},wmsserver_service:{layers:[{keyname:"image1",display_name:t,resource_id:e.id,min_scale_denom:null,max_scale_denom:null}]}};return this.connector.post("resource.collection",{data:n})},e.prototype.fileUpload=function(e,t){var n=this;return void 0===t&&(t={}),this.connector.post("file_upload.upload",{file:e,onProgress:function(e){var r=e.toFixed(2)+"% uploaded";t.onProgress&&t.onProgress(e);var o={status:"upload",state:"progress",message:r,data:{percentComplete:e}};n.emitter.emit("status:change",o)}}).then(function(e){var t;return e&&e.upload_meta&&(t=e.upload_meta[0]),t})},u([s({status:"create-resource",template:"resource creation"}),c("design:type",Function),c("design:paramtypes",[Object,String,Object]),c("design:returntype",void 0)],e.prototype,"createResource",null),u([s({status:"create-style",template:"style creation for resource ID {id}"}),c("design:type",Function),c("design:paramtypes",[Object,String]),c("design:returntype",void 0)],e.prototype,"createStyle",null),u([s({status:"create-wms",template:"wms creation for resource ID {id}"}),c("design:type",Function),c("design:paramtypes",[Object,String]),c("design:returntype",void 0)],e.prototype,"createWms",null),u([s({status:"upload",template:"file upload"}),c("design:type",Function),c("design:paramtypes",[File,Object]),c("design:returntype",void 0)],e.prototype,"fileUpload",null),e}();t.default=l}]).default});
//# sourceMappingURL=ngw-uploader.js.map