!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="./",t(t.s=4)}([function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=0,i=function(){function e(){r(this,e),this.id=u++,this.watchers=[]}return o(e,[{key:"addWatcher",value:function(e){this.watchers.push(e)}},{key:"depend",value:function(){e.target.addDep(this)}},{key:"notify",value:function(){this.watchers.forEach(function(e){e.update()})}}]),e}();i.target=null,t.default=i},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),i=function(e){return e&&e.__esModule?e:{default:e}}(u),a=function(){function e(t,n,o){r(this,e),Object.assign(this,{m:t,expOrFn:n,cb:o,depIds:new Set}),this.value=this.get()}return o(e,[{key:"addDep",value:function(e){this.depIds.has(e.id)||(this.depIds.add(e.id),e.addWatcher(this))}},{key:"update",value:function(){var e=this.get();e!==this.value&&(this.value=e,this.cb.call(this.m,e))}},{key:"get",value:function(){i.default.target=this;var e=this.m._data[this.expOrFn];return i.default.target=null,e}}]),e}();t.default=a},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(7),a=r(i),c=n(6),f=r(c),l=n(1),d=r(l),s=n(5),p=r(s),v=function(){function e(t){o(this,e),this._data=t.data,this.$options=t,this.$el=document.querySelector(t.selector),this.$fragment=null,(0,a.default)(this),(0,f.default)(this),(0,p.default)(this,t.template)}return u(e,[{key:"$watch",value:function(e,t){return new d.default(this,e,t)}}]),e}();t.default=v},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";(function(e){var t=n(2),r=function(e){return e&&e.__esModule?e:{default:e}}(t),o={a:1},u=new r.default({selector:"body",data:o,methods:{onInput:function(e){this.a=e.target.value}},template:'\n\t<div>\n        <input bind:value="a" on:input="onInput"/>\n\t\t<div>{{a}}</div>\n\t</div>\n'});u.$watch("a",function(e){console.log("callback",e)}),console.log(o.a,u.a),o.a=2,console.log(o.a,u.a),e.data=o}).call(t,n(3))},function(e,t,n){"use strict";function r(e,t){e.$fragment=(0,l.stringToFragment)(t),o(e.$fragment,e),e.$el.appendChild(e.$fragment)}function o(e,t){e.childNodes.forEach(function(e){u(e,t),e.childNodes&&e.childNodes.length&&o(e,t)})}function u(e,t){(0,l.isElementNode)(e)?i(e,t):(0,l.isTextNode)(e)&&a(e,t)}function i(e,t){var n,r,o,u=(0,l.toArray)(e.attributes);u.forEach(function(u){n=u.name,r=u.value,(o=d.exec(n))&&p[o[1]](e,t,o[2],r)})}function a(e,t){for(var n;n=s.exec(e.textContent);)p.text(e,t,n[1])}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var c=n(1),f=function(e){return e&&e.__esModule?e:{default:e}}(c),l=n(10),d=/^(bind|on):(\w+)$/,s=/\{\{((?:.|\s)*?)\}\}/g,p={text:function(e,t,n){e.textContent=t[n],new f.default(t,n,function(t){e.textContent=t})},bind:function(e,t,n,r){e.setAttribute(n,t[r]),new f.default(t,r,function(t){e.setAttribute(n,t)})},on:function(e,t,n,r){var o=t[r];e.addEventListener(n,o),new f.default(t,r,function(r){e.removeEventListener(n,o),o=t[r],e.addEventListener(n,o)})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.$options.methods,n=void 0;if(t){var r=!0,o=!1,u=void 0;try{for(var i,a=Object.keys(t)[Symbol.iterator]();!(r=(i=a.next()).done);r=!0)n=i.value,e[n]=t[n].bind(e)}catch(e){o=!0,u=e}finally{try{!r&&a.return&&a.return()}finally{if(o)throw u}}}}},function(e,t,n){"use strict";function r(e){o(e,e.$options.data)}function o(e,t){(0,a.default)(t),u(e,t)}function u(e,t){Object.keys(t).forEach(function(n){Object.defineProperty(e,n,{enumerable:!0,configurable:!0,get:function(){return t[n]},set:function(e){t[n]=e}})})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r,t.proxy=u;var i=n(8),a=function(e){return e&&e.__esModule?e:{default:e}}(i)},function(e,t,n){"use strict";function r(e){e&&"object"===(void 0===e?"undefined":u(e))&&Object.keys(e).forEach(function(t){o(e,t,e[t])})}function o(e,t,n){var o=new a.default;r(n),Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){return a.default.target&&o.depend(),n},set:function(e){e!==n&&(n=e,r(e),o.notify())}})}Object.defineProperty(t,"__esModule",{value:!0});var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=r;var i=n(0),a=function(e){return e&&e.__esModule?e:{default:e}}(i)},function(e,t,n){"use strict";function r(e){for(var t,n=document.createDocumentFragment();t=e.firstChild;)n.appendChild(t);return n}function o(e){var t=void 0;if(/<[^>]+>/g.test(e)){var n=document.createElement("div");n.innerHTML=e,t=r(n)}else t=document.createDocumentFragment(),t.appendChild(document.createTextNode(e));return t}function u(e){return 1===e.nodeType}function i(e){return 3===e.nodeType}Object.defineProperty(t,"__esModule",{value:!0}),t.nodeToFragment=r,t.stringToFragment=o,t.isElementNode=u,t.isTextNode=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(9);Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return r[e]}})});var o=n(11);Object.keys(o).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return o[e]}})})},function(e,t,n){"use strict";function r(e){return o.call(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.toArray=r;var o=Array.prototype.slice}]);