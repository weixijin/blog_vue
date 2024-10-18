import{c as commonjsGlobal,e as getDefaultExportFromCjs,n as normalizeComponent,N as post_upload_imgs_common,b as baseURL}from"./index.25833e42.js";var index$1="",mavonEditor$1={exports:{}};(function(module,exports){(function(d,h){module.exports=h()})(commonjsGlobal,function(){return function(d){function h(t){if(s[t])return s[t].exports;var r=s[t]={i:t,l:!1,exports:{}};return d[t].call(r.exports,r,r.exports,h),r.l=!0,r.exports}var s={};return h.m=d,h.c=s,h.i=function(t){return t},h.d=function(t,r,e){h.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:e})},h.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return h.d(r,"a",r),r},h.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},h.p="",h(h.s=68)}([function(d,h,s){function t(E){return Object.prototype.toString.call(E)}function r(E){return t(E)==="[object String]"}function e(E,q){return x.call(E,q)}function i(E){return Array.prototype.slice.call(arguments,1).forEach(function(q){if(q){if(typeof q!="object")throw new TypeError(q+"must be object");Object.keys(q).forEach(function(O){E[O]=q[O]})}}),E}function n(E,q,O){return[].concat(E.slice(0,q),O,E.slice(q+1))}function a(E){return!(E>=55296&&E<=57343)&&!(E>=64976&&E<=65007)&&(65535&E)!=65535&&(65535&E)!=65534&&!(E>=0&&E<=8)&&E!==11&&!(E>=14&&E<=31)&&!(E>=127&&E<=159)&&!(E>1114111)}function u(E){if(E>65535){E-=65536;var q=55296+(E>>10),O=56320+(1023&E);return String.fromCharCode(q,O)}return String.fromCharCode(E)}function c(E,q){var O=0;return e(T,q)?T[q]:q.charCodeAt(0)===35&&A.test(q)&&(O=q[1].toLowerCase()==="x"?parseInt(q.slice(2),16):parseInt(q.slice(1),10),a(O))?u(O):E}function o(E){return E.indexOf("\\")<0?E:E.replace(k,"$1")}function l(E){return E.indexOf("\\")<0&&E.indexOf("&")<0?E:E.replace(y,function(q,O,P){return O||c(q,P)})}function p(E){return S[E]}function _(E){return L.test(E)?E.replace(j,p):E}function f(E){return E.replace(M,"\\$&")}function b(E){switch(E){case 9:case 32:return!0}return!1}function g(E){if(E>=8192&&E<=8202)return!0;switch(E){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function m(E){return F.test(E)}function w(E){switch(E){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function v(E){return E=E.trim().replace(/\s+/g," "),"\u1E9E".toLowerCase()==="\u1E7E"&&(E=E.replace(/ẞ/g,"\xDF")),E.toLowerCase().toUpperCase()}var x=Object.prototype.hasOwnProperty,k=/\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g,C=/&([a-z#][a-z0-9]{1,31});/gi,y=new RegExp(k.source+"|"+C.source,"gi"),A=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i,T=s(52),L=/[&<>"]/,j=/[&<>"]/g,S={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"},M=/[.?*+^$[\]\\(){}|-]/g,F=s(34);h.lib={},h.lib.mdurl=s(56),h.lib.ucmicro=s(196),h.assign=i,h.isString=r,h.has=e,h.unescapeMd=o,h.unescapeAll=l,h.isValidEntityCode=a,h.fromCodePoint=u,h.escapeHtml=_,h.arrayReplaceAt=n,h.isSpace=b,h.isWhiteSpace=g,h.isMdAsciiPunct=w,h.isPunctChar=m,h.escapeRE=f,h.normalizeReference=v},function(d,h){var s=d.exports=typeof window!="undefined"&&window.Math==Math?window:typeof self!="undefined"&&self.Math==Math?self:Function("return this")();typeof __g=="number"&&(__g=s)},function(d,h){var s={}.hasOwnProperty;d.exports=function(t,r){return s.call(t,r)}},function(d,h,s){d.exports=!s(11)(function(){return Object.defineProperty({},"a",{get:function(){return 7}}).a!=7})},function(d,h,s){var t=s(5),r=s(13);d.exports=s(3)?function(e,i,n){return t.f(e,i,r(1,n))}:function(e,i,n){return e[i]=n,e}},function(d,h,s){var t=s(9),r=s(42),e=s(28),i=Object.defineProperty;h.f=s(3)?Object.defineProperty:function(n,a,u){if(t(n),a=e(a,!0),t(u),r)try{return i(n,a,u)}catch{}if("get"in u||"set"in u)throw TypeError("Accessors not supported!");return"value"in u&&(n[a]=u.value),n}},function(d,h,s){var t=s(88),r=s(19);d.exports=function(e){return t(r(e))}},function(d,h,s){var t=s(26)("wks"),r=s(14),e=s(1).Symbol,i=typeof e=="function";(d.exports=function(n){return t[n]||(t[n]=i&&e[n]||(i?e:r)("Symbol."+n))}).store=t},function(d,h){d.exports=function(s){return typeof s=="object"?s!==null:typeof s=="function"}},function(d,h,s){var t=s(8);d.exports=function(r){if(!t(r))throw TypeError(r+" is not an object!");return r}},function(d,h){var s=d.exports={version:"2.6.11"};typeof __e=="number"&&(__e=s)},function(d,h){d.exports=function(s){try{return!!s()}catch{return!0}}},function(d,h){d.exports=!0},function(d,h){d.exports=function(s,t){return{enumerable:!(1&s),configurable:!(2&s),writable:!(4&s),value:t}}},function(d,h){var s=0,t=Math.random();d.exports=function(r){return"Symbol(".concat(r===void 0?"":r,")_",(++s+t).toString(36))}},function(d,h){function s(r,e){var i=r[1]||"",n=r[3];if(!n)return i;if(e&&typeof btoa=="function"){var a=t(n);return[i].concat(n.sources.map(function(u){return"/*# sourceURL="+n.sourceRoot+u+" */"})).concat([a]).join(`
`)}return[i].join(`
`)}function t(r){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"}d.exports=function(r){var e=[];return e.toString=function(){return this.map(function(i){var n=s(i,r);return i[2]?"@media "+i[2]+"{"+n+"}":n}).join("")},e.i=function(i,n){typeof i=="string"&&(i=[[null,i,""]]);for(var a={},u=0;u<this.length;u++){var c=this[u][0];typeof c=="number"&&(a[c]=!0)}for(u=0;u<i.length;u++){var o=i[u];typeof o[0]=="number"&&a[o[0]]||(n&&!o[2]?o[2]=n:n&&(o[2]="("+o[2]+") and ("+n+")"),e.push(o))}},e}},function(d,h){d.exports=function(s,t,r,e,i){var n,a=s=s||{},u=typeof s.default;u!=="object"&&u!=="function"||(n=s,a=s.default);var c=typeof a=="function"?a.options:a;t&&(c.render=t.render,c.staticRenderFns=t.staticRenderFns),e&&(c._scopeId=e);var o;if(i?(o=function(_){_=_||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,_||typeof __VUE_SSR_CONTEXT__=="undefined"||(_=__VUE_SSR_CONTEXT__),r&&r.call(this,_),_&&_._registeredComponents&&_._registeredComponents.add(i)},c._ssrRegister=o):r&&(o=r),o){var l=c.functional,p=l?c.render:c.beforeCreate;l?c.render=function(_,f){return o.call(f),p(_,f)}:c.beforeCreate=p?[].concat(p,o):[o]}return{esModule:n,exports:a,options:c}}},function(d,h,s){function t(v){for(var x=0;x<v.length;x++){var k=v[x],C=c[k.id];if(C){C.refs++;for(var y=0;y<C.parts.length;y++)C.parts[y](k.parts[y]);for(;y<k.parts.length;y++)C.parts.push(e(k.parts[y]));C.parts.length>k.parts.length&&(C.parts.length=k.parts.length)}else{for(var A=[],y=0;y<k.parts.length;y++)A.push(e(k.parts[y]));c[k.id]={id:k.id,refs:1,parts:A}}}}function r(){var v=document.createElement("style");return v.type="text/css",o.appendChild(v),v}function e(v){var x,k,C=document.querySelector("style["+g+'~="'+v.id+'"]');if(C){if(_)return f;C.parentNode.removeChild(C)}if(m){var y=p++;C=l||(l=r()),x=i.bind(null,C,y,!1),k=i.bind(null,C,y,!0)}else C=r(),x=n.bind(null,C),k=function(){C.parentNode.removeChild(C)};return x(v),function(A){if(A){if(A.css===v.css&&A.media===v.media&&A.sourceMap===v.sourceMap)return;x(v=A)}else k()}}function i(v,x,k,C){var y=k?"":C.css;if(v.styleSheet)v.styleSheet.cssText=w(x,y);else{var A=document.createTextNode(y),T=v.childNodes;T[x]&&v.removeChild(T[x]),T.length?v.insertBefore(A,T[x]):v.appendChild(A)}}function n(v,x){var k=x.css,C=x.media,y=x.sourceMap;if(C&&v.setAttribute("media",C),b.ssrId&&v.setAttribute(g,x.id),y&&(k+=`
/*# sourceURL=`+y.sources[0]+" */",k+=`
/*# sourceMappingURL=data:application/json;base64,`+btoa(unescape(encodeURIComponent(JSON.stringify(y))))+" */"),v.styleSheet)v.styleSheet.cssText=k;else{for(;v.firstChild;)v.removeChild(v.firstChild);v.appendChild(document.createTextNode(k))}}var a=typeof document!="undefined";if(typeof DEBUG!="undefined"&&DEBUG&&!a)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var u=s(206),c={},o=a&&(document.head||document.getElementsByTagName("head")[0]),l=null,p=0,_=!1,f=function(){},b=null,g="data-vue-ssr-id",m=typeof navigator!="undefined"&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());d.exports=function(v,x,k,C){_=k,b=C||{};var y=u(v,x);return t(y),function(A){for(var T=[],L=0;L<y.length;L++){var j=y[L],S=c[j.id];S.refs--,T.push(S)}A?(y=u(v,A),t(y)):y=[];for(var L=0;L<T.length;L++){var S=T[L];if(S.refs===0){for(var M=0;M<S.parts.length;M++)S.parts[M]();delete c[S.id]}}}};var w=function(){var v=[];return function(x,k){return v[x]=k,v.filter(Boolean).join(`
`)}}()},function(d,h,s){function t(u){return u&&u.__esModule?u:{default:u}}h.__esModule=!0;var r=s(79),e=t(r),i=s(78),n=t(i),a=typeof n.default=="function"&&typeof e.default=="symbol"?function(u){return typeof u}:function(u){return u&&typeof n.default=="function"&&u.constructor===n.default&&u!==n.default.prototype?"symbol":typeof u};h.default=typeof n.default=="function"&&a(e.default)==="symbol"?function(u){return u===void 0?"undefined":a(u)}:function(u){return u&&typeof n.default=="function"&&u.constructor===n.default&&u!==n.default.prototype?"symbol":u===void 0?"undefined":a(u)}},function(d,h){d.exports=function(s){if(s==null)throw TypeError("Can't call method on  "+s);return s}},function(d,h){d.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(d,h){d.exports={}},function(d,h,s){var t=s(47),r=s(20);d.exports=Object.keys||function(e){return t(e,r)}},function(d,h){h.f={}.propertyIsEnumerable},function(d,h,s){var t=s(5).f,r=s(2),e=s(7)("toStringTag");d.exports=function(i,n,a){i&&!r(i=a?i:i.prototype,e)&&t(i,e,{configurable:!0,value:n})}},function(d,h,s){var t=s(26)("keys"),r=s(14);d.exports=function(e){return t[e]||(t[e]=r(e))}},function(d,h,s){var t=s(10),r=s(1),e=r["__core-js_shared__"]||(r["__core-js_shared__"]={});(d.exports=function(i,n){return e[i]||(e[i]=n!==void 0?n:{})})("versions",[]).push({version:t.version,mode:s(12)?"pure":"global",copyright:"\xA9 2019 Denis Pushkarev (zloirock.ru)"})},function(d,h){var s=Math.ceil,t=Math.floor;d.exports=function(r){return isNaN(r=+r)?0:(r>0?t:s)(r)}},function(d,h,s){var t=s(8);d.exports=function(r,e){if(!t(r))return r;var i,n;if(e&&typeof(i=r.toString)=="function"&&!t(n=i.call(r))||typeof(i=r.valueOf)=="function"&&!t(n=i.call(r))||!e&&typeof(i=r.toString)=="function"&&!t(n=i.call(r)))return n;throw TypeError("Can't convert object to primitive value")}},function(d,h,s){var t=s(1),r=s(10),e=s(12),i=s(30),n=s(5).f;d.exports=function(a){var u=r.Symbol||(r.Symbol=e?{}:t.Symbol||{});a.charAt(0)=="_"||a in u||n(u,a,{value:i.f(a)})}},function(d,h,s){h.f=s(7)},function(d,h,s){function t(n,a){return new e(a).process(n)}var r=s(50),e=s(111);h=d.exports=t,h.FilterCSS=e;for(var i in r)h[i]=r[i];typeof window!="undefined"&&(window.filterCSS=d.exports)},function(d,h,s){function t(){this.__rules__=[],this.__cache__=null}t.prototype.__find__=function(r){for(var e=0;e<this.__rules__.length;e++)if(this.__rules__[e].name===r)return e;return-1},t.prototype.__compile__=function(){var r=this,e=[""];r.__rules__.forEach(function(i){i.enabled&&i.alt.forEach(function(n){e.indexOf(n)<0&&e.push(n)})}),r.__cache__={},e.forEach(function(i){r.__cache__[i]=[],r.__rules__.forEach(function(n){n.enabled&&(i&&n.alt.indexOf(i)<0||r.__cache__[i].push(n.fn))})})},t.prototype.at=function(r,e,i){var n=this.__find__(r),a=i||{};if(n===-1)throw new Error("Parser rule not found: "+r);this.__rules__[n].fn=e,this.__rules__[n].alt=a.alt||[],this.__cache__=null},t.prototype.before=function(r,e,i,n){var a=this.__find__(r),u=n||{};if(a===-1)throw new Error("Parser rule not found: "+r);this.__rules__.splice(a,0,{name:e,enabled:!0,fn:i,alt:u.alt||[]}),this.__cache__=null},t.prototype.after=function(r,e,i,n){var a=this.__find__(r),u=n||{};if(a===-1)throw new Error("Parser rule not found: "+r);this.__rules__.splice(a+1,0,{name:e,enabled:!0,fn:i,alt:u.alt||[]}),this.__cache__=null},t.prototype.push=function(r,e,i){var n=i||{};this.__rules__.push({name:r,enabled:!0,fn:e,alt:n.alt||[]}),this.__cache__=null},t.prototype.enable=function(r,e){Array.isArray(r)||(r=[r]);var i=[];return r.forEach(function(n){var a=this.__find__(n);if(a<0){if(e)return;throw new Error("Rules manager: invalid rule name "+n)}this.__rules__[a].enabled=!0,i.push(n)},this),this.__cache__=null,i},t.prototype.enableOnly=function(r,e){Array.isArray(r)||(r=[r]),this.__rules__.forEach(function(i){i.enabled=!1}),this.enable(r,e)},t.prototype.disable=function(r,e){Array.isArray(r)||(r=[r]);var i=[];return r.forEach(function(n){var a=this.__find__(n);if(a<0){if(e)return;throw new Error("Rules manager: invalid rule name "+n)}this.__rules__[a].enabled=!1,i.push(n)},this),this.__cache__=null,i},t.prototype.getRules=function(r){return this.__cache__===null&&this.__compile__(),this.__cache__[r]||[]},d.exports=t},function(d,h,s){function t(r,e,i){this.type=r,this.tag=e,this.attrs=null,this.map=null,this.nesting=i,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}t.prototype.attrIndex=function(r){var e,i,n;if(!this.attrs)return-1;for(e=this.attrs,i=0,n=e.length;i<n;i++)if(e[i][0]===r)return i;return-1},t.prototype.attrPush=function(r){this.attrs?this.attrs.push(r):this.attrs=[r]},t.prototype.attrSet=function(r,e){var i=this.attrIndex(r),n=[r,e];i<0?this.attrPush(n):this.attrs[i]=n},t.prototype.attrGet=function(r){var e=this.attrIndex(r),i=null;return e>=0&&(i=this.attrs[e][1]),i},t.prototype.attrJoin=function(r,e){var i=this.attrIndex(r);i<0?this.attrPush([r,e]):this.attrs[i][1]=this.attrs[i][1]+" "+e},d.exports=t},function(d,h){d.exports=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/},function(d,h){d.exports={indexOf:function(s,t){var r,e;if(Array.prototype.indexOf)return s.indexOf(t);for(r=0,e=s.length;r<e;r++)if(s[r]===t)return r;return-1},forEach:function(s,t,r){var e,i;if(Array.prototype.forEach)return s.forEach(t,r);for(e=0,i=s.length;e<i;e++)t.call(r,s[e],e,s)},trim:function(s){return String.prototype.trim?s.trim():s.replace(/(^\s*)|(\s*$)/g,"")},spaceIndex:function(s){var t=/\s|\n|\t/,r=t.exec(s);return r?r.index:-1}}},function(d,h,s){function t(e){s(203)}var r=s(16)(s(65),s(200),t,"data-v-548e2160",null);r.options.__file="D:\\work\\songwang\\yuangongji\\mavonEditor\\src\\components\\md-toolbar-left.vue",r.esModule&&Object.keys(r.esModule).some(function(e){return e!=="default"&&e.substr(0,2)!=="__"})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] md-toolbar-left.vue: functional components are not supported with templates, they should use render functions."),d.exports=r.exports},function(d,h,s){var t=s(16)(s(66),s(198),null,null,null);t.options.__file="D:\\work\\songwang\\yuangongji\\mavonEditor\\src\\components\\md-toolbar-right.vue",t.esModule&&Object.keys(t.esModule).some(function(r){return r!=="default"&&r.substr(0,2)!=="__"})&&console.error("named exports are not supported in *.vue files."),t.options.functional&&console.error("[vue-loader] md-toolbar-right.vue: functional components are not supported with templates, they should use render functions."),d.exports=t.exports},function(d,h,s){function t(o,l,p){var _=c.prefix,f=c.subfix,b=p.selectionStart,g=p.selectionEnd,m=p.value,w=m.substring(0,b);w+=_+o+`
`,w+=l,w+=f,w+=m.substring(g,m.length),p.value=w,p.selectionStart=b+_.length+(o?0:1),p.selectionEnd=p.selectionStart+o.length+l.length}function r(o){var l=c.prefix,p=c.subfix,_=c.defaultLanguageText,f=o.selectionStart,b=o.selectionEnd,g=o.value,m=g.substring(f,b);if(g.substring(f-1,f)===`
`)l+=`
`;else if(p=`
`+p,l+_+p===g.substring(f-l.length,b+p.length)){var w=g.substring(0,f-l.length);return w+=g.substring(b+p.length,g.length),o.value=w,o.selectionStart=f-l.length,void(o.selectionEnd=o.selectionStart)}var v=g.substring(0,f-l.length);v+=m,v+=g.substring(b+p.length,g.length),o.value=v,o.selectionStart=f-l.length,o.selectionEnd=o.selectionStart+m.length}function e(o){return typeof o.selectionStart=="number"&&typeof o.selectionEnd=="number"}function i(o){var l=o.selectionStart,p=o.selectionEnd,_=o.value,f=c.prefix,b=c.subfix;return _.substring(l-1,l)===`
`?f+=`
`:b=`
`+b,_.substring(l-f.length,l)===f&&_.substring(p,p+b.length)===b}function n(o,l,p,_,f){return o!=="*"||l!=="*"||p.substring(_-2,_-1)!=="*"||p.substring(f+1,f+2)!=="*"}function a(o,l){typeof l!="function"&&(l=function(){});var p=document.querySelectorAll("script[src='"+o+"']");if(p.length>0)return p[0].addEventListener("load",function(){l()}),void l();var _=document.createElement("script"),f=document.getElementsByTagName("head")[0];_.type="text/javascript",_.charset="UTF-8",_.src=o,_.addEventListener?_.addEventListener("load",function(){l()},!1):_.attachEvent&&_.attachEvent("onreadystatechange",function(){window.event.srcElement.readyState==="loaded"&&l()}),f.appendChild(_)}function u(o,l,p){if(typeof l!="function"&&(l=function(){}),document.querySelectorAll("link[href='"+o+"']").length>0)return void l();if(p){var _=document.querySelectorAll("link#"+p);if(_.length)return void(_[0].href=o)}var f=document.createElement("link"),b=document.getElementsByTagName("head")[0];f.rel="stylesheet",f.href=o,p&&(f.id=p),f.addEventListener?f.addEventListener("load",function(){l()},!1):f.attachEvent&&f.attachEvent("onreadystatechange",function(){window.event.srcElement.readyState==="loaded"&&l()}),b.appendChild(f)}Object.defineProperty(h,"__esModule",{value:!0}),h.loadScript=a,h.loadLink=u;var c=(h.insertTextAtCaret=function(o,l,p){var _=l.prefix,f=l.subfix,b=l.str;if(l.type,o.focus(),e(o)){var g=o.selectionStart,m=o.selectionEnd,w=o.value;g===m?(o.value=w.substring(0,g)+_+b+f+w.substring(m,w.length),o.selectionStart=g+_.length,o.selectionEnd=g+(b.length+_.length)):w.substring(g-_.length,g)===_&&w.substring(m,m+f.length)===f&&n(_,f,w,g,m)?(o.value=w.substring(0,g-_.length)+w.substring(g,m)+w.substring(m+f.length,w.length),o.selectionStart=g-_.length,o.selectionEnd=m-_.length):(o.value=w.substring(0,g)+_+w.substring(g,m)+f+w.substring(m,w.length),o.selectionStart=g+_.length,o.selectionEnd=g+(m-g+_.length))}else alert("Error: Browser version is too low");p.d_value=o.value,o.focus()},{prefix:"```",subfix:"\n```\n",defaultLanguageText:"language"});h.insertCodeBlock=function(o){var l=o.getTextareaDom();if(!e(l))return void alert("Error: Browser version is too low");var p=c.defaultLanguageText,_=l.selectionStart,f=l.selectionEnd,b=l.value;if(_===f)t(p,"",l);else if(i(l))r(l);else{var g=b.substring(_,f);t("",g,l)}o.d_value=l.value,l.focus()},h.insertOl=function(o){var l=o.getTextareaDom();if(e(l)){var p=l.selectionStart,_=l.selectionEnd,f=l.value;if(p===_)l.value=f.substring(0,p)+"1. "+f.substring(_,f.length),l.selectionEnd=l.selectionStart=p+3;else{for(var b=p;b>0&&f.substring(b-1,b)!==`
`;)b--;for(var g=f.substring(b,_),m=g.split(`
`),w=0;w<m.length;w++)m[w]=w+1+". "+m[w];var v=m.join(`
`);l.value=f.substring(0,b)+v+f.substring(_,f.length),l.selectionStart=b,l.selectionEnd=_+v.length-g.length}}else alert("Error: Browser version is too low");o.d_value=l.value,l.focus()},h.removeLine=function(o){var l=o.getTextareaDom();if(e(l)){for(var p=l.selectionStart,_=l.selectionEnd,f=l.value,b=p;b>0&&f.substring(b-1,b)!==`
`;)b--;for(var g=_;g<f.length&&f.substring(g,g+1)!==`
`;)g++;g<f.length&&g++,l.value=f.substring(0,b)+f.substring(g,f.length),l.selectionEnd=l.selectionStart=b===0?0:b-1}else alert("Error: Browser version is too low");o.d_value=l.value,l.focus()},h.insertUl=function(o){var l=o.getTextareaDom();if(e(l)){var p=l.selectionStart,_=l.selectionEnd,f=l.value;if(p===_)l.value=f.substring(0,p)+"- "+f.substring(_,f.length),l.selectionEnd=l.selectionStart=p+2;else{for(var b=p;b>0&&f.substring(b-1,b)!==`
`;)b--;var g=f.substring(b,_),m=g.replace(/\n/g,`
- `);m="- "+m,l.value=f.substring(0,b)+m+f.substring(_,f.length),l.selectionStart=b,l.selectionEnd=_+m.length-g.length}}else alert("Error: Browser version is too low");o.d_value=l.value,l.focus()},h.insertTab=function(o,l){l=l?new Array(l).fill(" ").join(""):"	";var p=o.getTextareaDom();if(e(p)){var _=p.selectionStart,f=p.selectionEnd,b=p.value,g=b.substring(0,_).split(`
`).pop();if(g.match(/^\s*[0-9]+\.\s+\S*/)){var m=g.replace(/(\d+)/,1);p.value=b.substring(0,_-m.length)+l+m+b.substring(f,b.length)}else g.match(/^\s*-\s+\S*/)?p.value=b.substring(0,_-g.length)+l+g+b.substring(f,b.length):p.value=b.substring(0,_)+l+b.substring(f,b.length);p.selectionStart=p.selectionEnd=_+l.length}else alert("Error: Browser version is too low");o.d_value=p.value,p.focus()},h.unInsertTab=function(o,l){var p=new RegExp(l?"\\s{"+l+"}":"	");console.log("regTab:",p);var _=o.getTextareaDom();if(e(_)){var f=_.selectionStart,b=_.selectionEnd,g=_.value,m=g.substring(0,f).split(`
`).pop();m.search(p)>=0&&(_.value=g.substring(0,f-m.length)+m.replace(p,"")+g.substring(b,g.length),_.selectionStart=_.selectionEnd=f-(l||1))}else alert("Error: Browser version is too low");o.d_value=_.value,_.focus()},h.insertEnter=function(o,l){var p=o.getTextareaDom();if(e(p)){var _=p.selectionStart,f=p.selectionEnd,b=p.value,g=b.substring(0,_).split(`
`).pop(),m=g.match(/^\s*(?:[0-9]+\.|-)\s+\S+/);if(m){l.preventDefault();var w=m.shift().match(/^\s*(?:[0-9]+\.|-)\s/).shift();if(w.search(/-/)>=0)p.value=b.substring(0,_)+`
`+w+b.substring(f,b.length),p.selectionStart=p.selectionEnd=_+w.length+1;else{var v=w.replace(/(\d+)/,parseInt(w)+1);p.value=b.substring(0,_)+`
`+v+b.substring(f,b.length),p.selectionStart=p.selectionEnd=_+v.length+1}}else{var x=g.match(/^\s*(?:[0-9]+\.|-)\s+$/);if(x){l.preventDefault();var k=x.shift().length;p.value=b.substring(0,_-k)+`
`+b.substring(f,b.length),p.selectionStart=p.selectionEnd=_-k}}}else alert("Error: Browser version is too low");o.d_value=p.value,p.focus()},h.getNavigation=function(o,l){var p=void 0;p=o.$refs.navigationContent,p.innerHTML=o.d_render;var _=p.children;if(_.length)for(var f=0;f<_.length;f++)(function(b,g,m){/^H[1-6]{1}$/.exec(b.tagName)?b.onclick=function(){var w=o.$refs.vShowContent,v=o.$refs.vNoteEdit;o.s_subfield?o.s_preview_switch&&(v.scrollTop=w.children[g].offsetTop*(v.scrollHeight-v.offsetHeight)/(w.scrollHeight-w.offsetHeight)):o.s_preview_switch&&(w.scrollTop=w.children[g].offsetTop)}:b.style.display="none"})(_[f],f)},h.scrollLink=function(o,l){var p=o.srcElement?o.srcElement:o.target,_=p.scrollTop/(p.scrollHeight-p.offsetHeight);l.edit_scroll_height>=0&&p.scrollHeight!==l.edit_scroll_height&&p.scrollHeight-p.offsetHeight-p.scrollTop<=30&&(l.$refs.vNoteEdit.scrollTop=p.scrollHeight-p.offsetHeight,_=1),l.edit_scroll_height=p.scrollHeight,l.$refs.vShowContent.scrollHeight>l.$refs.vShowContent.offsetHeight&&(l.$refs.vShowContent.scrollTop=(l.$refs.vShowContent.scrollHeight-l.$refs.vShowContent.offsetHeight)*_)},h.fullscreenchange=function(o){o.$el.addEventListener("fullscreenchange",function(l){o.$toolbar_right_read_change_status()},!1),o.$el.addEventListener("mozfullscreenchange",function(l){o.$toolbar_right_read_change_status()},!1),o.$el.addEventListener("webkitfullscreenchange",function(l){o.$toolbar_right_read_change_status()},!1),o.$el.addEventListener("msfullscreenchange",function(l){o.$toolbar_right_read_change_status()},!1)},h.windowResize=function(o){function l(){o.$el.clientWidth>768?o.s_subfield=o.subfield:o.s_subfield=!1}l(),window.addEventListener("resize",l)},h.ImagePreviewListener=function(o){o.$refs.vShowContent.addEventListener("click",function(l){l=l||window.event;var p=l.srcElement?l.srcElement:l.target;p.tagName==="IMG"&&(o.imageClick!=null?o.imageClick(p):o.d_preview_imgsrc=p.src)})}},function(d,h){var s={}.toString;d.exports=function(t){return s.call(t).slice(8,-1)}},function(d,h,s){var t=s(8),r=s(1).document,e=t(r)&&t(r.createElement);d.exports=function(i){return e?r.createElement(i):{}}},function(d,h,s){var t=s(1),r=s(10),e=s(85),i=s(4),n=s(2),a=function(u,c,o){var l,p,_,f=u&a.F,b=u&a.G,g=u&a.S,m=u&a.P,w=u&a.B,v=u&a.W,x=b?r:r[c]||(r[c]={}),k=x.prototype,C=b?t:g?t[c]:(t[c]||{}).prototype;b&&(o=c);for(l in o)(p=!f&&C&&C[l]!==void 0)&&n(x,l)||(_=p?C[l]:o[l],x[l]=b&&typeof C[l]!="function"?o[l]:w&&p?e(_,t):v&&C[l]==_?function(y){var A=function(T,L,j){if(this instanceof y){switch(arguments.length){case 0:return new y;case 1:return new y(T);case 2:return new y(T,L)}return new y(T,L,j)}return y.apply(this,arguments)};return A.prototype=y.prototype,A}(_):m&&typeof _=="function"?e(Function.call,_):_,m&&((x.virtual||(x.virtual={}))[l]=_,u&a.R&&k&&!k[l]&&i(k,l,_)))};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,d.exports=a},function(d,h,s){d.exports=!s(3)&&!s(11)(function(){return Object.defineProperty(s(40)("div"),"a",{get:function(){return 7}}).a!=7})},function(d,h,s){var t=s(12),r=s(41),e=s(48),i=s(4),n=s(21),a=s(90),u=s(24),c=s(96),o=s(7)("iterator"),l=!([].keys&&"next"in[].keys()),p=function(){return this};d.exports=function(_,f,b,g,m,w,v){a(b,f,g);var x,k,C,y=function(q){if(!l&&q in j)return j[q];switch(q){case"keys":case"values":return function(){return new b(this,q)}}return function(){return new b(this,q)}},A=f+" Iterator",T=m=="values",L=!1,j=_.prototype,S=j[o]||j["@@iterator"]||m&&j[m],M=S||y(m),F=m?T?y("entries"):M:void 0,E=f=="Array"&&j.entries||S;if(E&&(C=c(E.call(new _)))!==Object.prototype&&C.next&&(u(C,A,!0),t||typeof C[o]=="function"||i(C,o,p)),T&&S&&S.name!=="values"&&(L=!0,M=function(){return S.call(this)}),t&&!v||!l&&!L&&j[o]||i(j,o,M),n[f]=M,n[A]=p,m)if(x={values:T?M:y("values"),keys:w?M:y("keys"),entries:F},v)for(k in x)k in j||e(j,k,x[k]);else r(r.P+r.F*(l||L),f,x);return x}},function(d,h,s){var t=s(9),r=s(93),e=s(20),i=s(25)("IE_PROTO"),n=function(){},a=function(){var u,c=s(40)("iframe"),o=e.length;for(c.style.display="none",s(87).appendChild(c),c.src="javascript:",u=c.contentWindow.document,u.open(),u.write("<script>document.F=Object<\/script>"),u.close(),a=u.F;o--;)delete a.prototype[e[o]];return a()};d.exports=Object.create||function(u,c){var o;return u!==null?(n.prototype=t(u),o=new n,n.prototype=null,o[i]=u):o=a(),c===void 0?o:r(o,c)}},function(d,h,s){var t=s(47),r=s(20).concat("length","prototype");h.f=Object.getOwnPropertyNames||function(e){return t(e,r)}},function(d,h){h.f=Object.getOwnPropertySymbols},function(d,h,s){var t=s(2),r=s(6),e=s(84)(!1),i=s(25)("IE_PROTO");d.exports=function(n,a){var u,c=r(n),o=0,l=[];for(u in c)u!=i&&t(c,u)&&l.push(u);for(;a.length>o;)t(c,u=a[o++])&&(~e(l,u)||l.push(u));return l}},function(d,h,s){d.exports=s(4)},function(d,h,s){var t=s(19);d.exports=function(r){return Object(t(r))}},function(d,h){function s(){var n={};return n["align-content"]=!1,n["align-items"]=!1,n["align-self"]=!1,n["alignment-adjust"]=!1,n["alignment-baseline"]=!1,n.all=!1,n["anchor-point"]=!1,n.animation=!1,n["animation-delay"]=!1,n["animation-direction"]=!1,n["animation-duration"]=!1,n["animation-fill-mode"]=!1,n["animation-iteration-count"]=!1,n["animation-name"]=!1,n["animation-play-state"]=!1,n["animation-timing-function"]=!1,n.azimuth=!1,n["backface-visibility"]=!1,n.background=!0,n["background-attachment"]=!0,n["background-clip"]=!0,n["background-color"]=!0,n["background-image"]=!0,n["background-origin"]=!0,n["background-position"]=!0,n["background-repeat"]=!0,n["background-size"]=!0,n["baseline-shift"]=!1,n.binding=!1,n.bleed=!1,n["bookmark-label"]=!1,n["bookmark-level"]=!1,n["bookmark-state"]=!1,n.border=!0,n["border-bottom"]=!0,n["border-bottom-color"]=!0,n["border-bottom-left-radius"]=!0,n["border-bottom-right-radius"]=!0,n["border-bottom-style"]=!0,n["border-bottom-width"]=!0,n["border-collapse"]=!0,n["border-color"]=!0,n["border-image"]=!0,n["border-image-outset"]=!0,n["border-image-repeat"]=!0,n["border-image-slice"]=!0,n["border-image-source"]=!0,n["border-image-width"]=!0,n["border-left"]=!0,n["border-left-color"]=!0,n["border-left-style"]=!0,n["border-left-width"]=!0,n["border-radius"]=!0,n["border-right"]=!0,n["border-right-color"]=!0,n["border-right-style"]=!0,n["border-right-width"]=!0,n["border-spacing"]=!0,n["border-style"]=!0,n["border-top"]=!0,n["border-top-color"]=!0,n["border-top-left-radius"]=!0,n["border-top-right-radius"]=!0,n["border-top-style"]=!0,n["border-top-width"]=!0,n["border-width"]=!0,n.bottom=!1,n["box-decoration-break"]=!0,n["box-shadow"]=!0,n["box-sizing"]=!0,n["box-snap"]=!0,n["box-suppress"]=!0,n["break-after"]=!0,n["break-before"]=!0,n["break-inside"]=!0,n["caption-side"]=!1,n.chains=!1,n.clear=!0,n.clip=!1,n["clip-path"]=!1,n["clip-rule"]=!1,n.color=!0,n["color-interpolation-filters"]=!0,n["column-count"]=!1,n["column-fill"]=!1,n["column-gap"]=!1,n["column-rule"]=!1,n["column-rule-color"]=!1,n["column-rule-style"]=!1,n["column-rule-width"]=!1,n["column-span"]=!1,n["column-width"]=!1,n.columns=!1,n.contain=!1,n.content=!1,n["counter-increment"]=!1,n["counter-reset"]=!1,n["counter-set"]=!1,n.crop=!1,n.cue=!1,n["cue-after"]=!1,n["cue-before"]=!1,n.cursor=!1,n.direction=!1,n.display=!0,n["display-inside"]=!0,n["display-list"]=!0,n["display-outside"]=!0,n["dominant-baseline"]=!1,n.elevation=!1,n["empty-cells"]=!1,n.filter=!1,n.flex=!1,n["flex-basis"]=!1,n["flex-direction"]=!1,n["flex-flow"]=!1,n["flex-grow"]=!1,n["flex-shrink"]=!1,n["flex-wrap"]=!1,n.float=!1,n["float-offset"]=!1,n["flood-color"]=!1,n["flood-opacity"]=!1,n["flow-from"]=!1,n["flow-into"]=!1,n.font=!0,n["font-family"]=!0,n["font-feature-settings"]=!0,n["font-kerning"]=!0,n["font-language-override"]=!0,n["font-size"]=!0,n["font-size-adjust"]=!0,n["font-stretch"]=!0,n["font-style"]=!0,n["font-synthesis"]=!0,n["font-variant"]=!0,n["font-variant-alternates"]=!0,n["font-variant-caps"]=!0,n["font-variant-east-asian"]=!0,n["font-variant-ligatures"]=!0,n["font-variant-numeric"]=!0,n["font-variant-position"]=!0,n["font-weight"]=!0,n.grid=!1,n["grid-area"]=!1,n["grid-auto-columns"]=!1,n["grid-auto-flow"]=!1,n["grid-auto-rows"]=!1,n["grid-column"]=!1,n["grid-column-end"]=!1,n["grid-column-start"]=!1,n["grid-row"]=!1,n["grid-row-end"]=!1,n["grid-row-start"]=!1,n["grid-template"]=!1,n["grid-template-areas"]=!1,n["grid-template-columns"]=!1,n["grid-template-rows"]=!1,n["hanging-punctuation"]=!1,n.height=!0,n.hyphens=!1,n.icon=!1,n["image-orientation"]=!1,n["image-resolution"]=!1,n["ime-mode"]=!1,n["initial-letters"]=!1,n["inline-box-align"]=!1,n["justify-content"]=!1,n["justify-items"]=!1,n["justify-self"]=!1,n.left=!1,n["letter-spacing"]=!0,n["lighting-color"]=!0,n["line-box-contain"]=!1,n["line-break"]=!1,n["line-grid"]=!1,n["line-height"]=!1,n["line-snap"]=!1,n["line-stacking"]=!1,n["line-stacking-ruby"]=!1,n["line-stacking-shift"]=!1,n["line-stacking-strategy"]=!1,n["list-style"]=!0,n["list-style-image"]=!0,n["list-style-position"]=!0,n["list-style-type"]=!0,n.margin=!0,n["margin-bottom"]=!0,n["margin-left"]=!0,n["margin-right"]=!0,n["margin-top"]=!0,n["marker-offset"]=!1,n["marker-side"]=!1,n.marks=!1,n.mask=!1,n["mask-box"]=!1,n["mask-box-outset"]=!1,n["mask-box-repeat"]=!1,n["mask-box-slice"]=!1,n["mask-box-source"]=!1,n["mask-box-width"]=!1,n["mask-clip"]=!1,n["mask-image"]=!1,n["mask-origin"]=!1,n["mask-position"]=!1,n["mask-repeat"]=!1,n["mask-size"]=!1,n["mask-source-type"]=!1,n["mask-type"]=!1,n["max-height"]=!0,n["max-lines"]=!1,n["max-width"]=!0,n["min-height"]=!0,n["min-width"]=!0,n["move-to"]=!1,n["nav-down"]=!1,n["nav-index"]=!1,n["nav-left"]=!1,n["nav-right"]=!1,n["nav-up"]=!1,n["object-fit"]=!1,n["object-position"]=!1,n.opacity=!1,n.order=!1,n.orphans=!1,n.outline=!1,n["outline-color"]=!1,n["outline-offset"]=!1,n["outline-style"]=!1,n["outline-width"]=!1,n.overflow=!1,n["overflow-wrap"]=!1,n["overflow-x"]=!1,n["overflow-y"]=!1,n.padding=!0,n["padding-bottom"]=!0,n["padding-left"]=!0,n["padding-right"]=!0,n["padding-top"]=!0,n.page=!1,n["page-break-after"]=!1,n["page-break-before"]=!1,n["page-break-inside"]=!1,n["page-policy"]=!1,n.pause=!1,n["pause-after"]=!1,n["pause-before"]=!1,n.perspective=!1,n["perspective-origin"]=!1,n.pitch=!1,n["pitch-range"]=!1,n["play-during"]=!1,n.position=!1,n["presentation-level"]=!1,n.quotes=!1,n["region-fragment"]=!1,n.resize=!1,n.rest=!1,n["rest-after"]=!1,n["rest-before"]=!1,n.richness=!1,n.right=!1,n.rotation=!1,n["rotation-point"]=!1,n["ruby-align"]=!1,n["ruby-merge"]=!1,n["ruby-position"]=!1,n["shape-image-threshold"]=!1,n["shape-outside"]=!1,n["shape-margin"]=!1,n.size=!1,n.speak=!1,n["speak-as"]=!1,n["speak-header"]=!1,n["speak-numeral"]=!1,n["speak-punctuation"]=!1,n["speech-rate"]=!1,n.stress=!1,n["string-set"]=!1,n["tab-size"]=!1,n["table-layout"]=!1,n["text-align"]=!0,n["text-align-last"]=!0,n["text-combine-upright"]=!0,n["text-decoration"]=!0,n["text-decoration-color"]=!0,n["text-decoration-line"]=!0,n["text-decoration-skip"]=!0,n["text-decoration-style"]=!0,n["text-emphasis"]=!0,n["text-emphasis-color"]=!0,n["text-emphasis-position"]=!0,n["text-emphasis-style"]=!0,n["text-height"]=!0,n["text-indent"]=!0,n["text-justify"]=!0,n["text-orientation"]=!0,n["text-overflow"]=!0,n["text-shadow"]=!0,n["text-space-collapse"]=!0,n["text-transform"]=!0,n["text-underline-position"]=!0,n["text-wrap"]=!0,n.top=!1,n.transform=!1,n["transform-origin"]=!1,n["transform-style"]=!1,n.transition=!1,n["transition-delay"]=!1,n["transition-duration"]=!1,n["transition-property"]=!1,n["transition-timing-function"]=!1,n["unicode-bidi"]=!1,n["vertical-align"]=!1,n.visibility=!1,n["voice-balance"]=!1,n["voice-duration"]=!1,n["voice-family"]=!1,n["voice-pitch"]=!1,n["voice-range"]=!1,n["voice-rate"]=!1,n["voice-stress"]=!1,n["voice-volume"]=!1,n.volume=!1,n["white-space"]=!1,n.widows=!1,n.width=!0,n["will-change"]=!1,n["word-break"]=!0,n["word-spacing"]=!0,n["word-wrap"]=!0,n["wrap-flow"]=!1,n["wrap-through"]=!1,n["writing-mode"]=!1,n["z-index"]=!1,n}function t(n,a,u){}function r(n,a,u){}function e(n,a){return i.test(a)?"":a}var i=/javascript\s*\:/gim;h.whiteList=s(),h.getDefaultWhiteList=s,h.onAttr=t,h.onIgnoreAttr=r,h.safeAttrValue=e},function(d,h){d.exports={indexOf:function(s,t){var r,e;if(Array.prototype.indexOf)return s.indexOf(t);for(r=0,e=s.length;r<e;r++)if(s[r]===t)return r;return-1},forEach:function(s,t,r){var e,i;if(Array.prototype.forEach)return s.forEach(t,r);for(e=0,i=s.length;e<i;e++)t.call(r,s[e],e,s)},trim:function(s){return String.prototype.trim?s.trim():s.replace(/(^\s*)|(\s*$)/g,"")},trimRight:function(s){return String.prototype.trimRight?s.trimRight():s.replace(/(\s*$)/g,"")}}},function(d,h,s){d.exports=s(113)},function(d,h,s){var t=`<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^"'=<>\`\\x00-\\x20]+|'[^']*'|"[^"]*"))?)*\\s*\\/?>`,r="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",e=new RegExp("^(?:"+t+"|"+r+"|<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->|<[?].*?[?]>|<![A-Z]+\\s+[^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)"),i=new RegExp("^(?:"+t+"|"+r+")");d.exports.HTML_TAG_RE=e,d.exports.HTML_OPEN_CLOSE_TAG_RE=i},function(d,h,s){function t(r,e){var i,n,a,u,c,o,l=e.length;for(i=l-1;i>=0;i--)n=e[i],n.marker!==95&&n.marker!==42||n.end!==-1&&(a=e[n.end],o=i>0&&e[i-1].end===n.end+1&&e[i-1].token===n.token-1&&e[n.end+1].token===a.token+1&&e[i-1].marker===n.marker,c=String.fromCharCode(n.marker),u=r.tokens[n.token],u.type=o?"strong_open":"em_open",u.tag=o?"strong":"em",u.nesting=1,u.markup=o?c+c:c,u.content="",u=r.tokens[a.token],u.type=o?"strong_close":"em_close",u.tag=o?"strong":"em",u.nesting=-1,u.markup=o?c+c:c,u.content="",o&&(r.tokens[e[i-1].token].content="",r.tokens[e[n.end+1].token].content="",i--))}d.exports.tokenize=function(r,e){var i,n,a,u=r.pos,c=r.src.charCodeAt(u);if(e||c!==95&&c!==42)return!1;for(n=r.scanDelims(r.pos,c===42),i=0;i<n.length;i++)a=r.push("text","",0),a.content=String.fromCharCode(c),r.delimiters.push({marker:c,length:n.length,jump:i,token:r.tokens.length-1,end:-1,open:n.can_open,close:n.can_close});return r.pos+=n.length,!0},d.exports.postProcess=function(r){var e,i=r.tokens_meta,n=r.tokens_meta.length;for(t(r,r.delimiters),e=0;e<n;e++)i[e]&&i[e].delimiters&&t(r,i[e].delimiters)}},function(d,h,s){function t(r,e){var i,n,a,u,c,o=[],l=e.length;for(i=0;i<l;i++)a=e[i],a.marker===126&&a.end!==-1&&(u=e[a.end],c=r.tokens[a.token],c.type="s_open",c.tag="s",c.nesting=1,c.markup="~~",c.content="",c=r.tokens[u.token],c.type="s_close",c.tag="s",c.nesting=-1,c.markup="~~",c.content="",r.tokens[u.token-1].type==="text"&&r.tokens[u.token-1].content==="~"&&o.push(u.token-1));for(;o.length;){for(i=o.pop(),n=i+1;n<r.tokens.length&&r.tokens[n].type==="s_close";)n++;n--,i!==n&&(c=r.tokens[n],r.tokens[n]=r.tokens[i],r.tokens[i]=c)}}d.exports.tokenize=function(r,e){var i,n,a,u,c,o=r.pos,l=r.src.charCodeAt(o);if(e||l!==126||(n=r.scanDelims(r.pos,!0),u=n.length,c=String.fromCharCode(l),u<2))return!1;for(u%2&&(a=r.push("text","",0),a.content=c,u--),i=0;i<u;i+=2)a=r.push("text","",0),a.content=c+c,r.delimiters.push({marker:l,length:0,jump:i,token:r.tokens.length-1,end:-1,open:n.can_open,close:n.can_close});return r.pos+=n.length,!0},d.exports.postProcess=function(r){var e,i=r.tokens_meta,n=r.tokens_meta.length;for(t(r,r.delimiters),e=0;e<n;e++)i[e]&&i[e].delimiters&&t(r,i[e].delimiters)}},function(d,h,s){d.exports.encode=s(183),d.exports.decode=s(182),d.exports.format=s(184),d.exports.parse=s(185)},function(d,h){d.exports=/[\0-\x1F\x7F-\x9F]/},function(d,h){d.exports=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/},function(d,h){d.exports=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/},function(d,h,s){function t(){return{a:["target","href","title"],abbr:["title"],address:[],area:["shape","coords","href","alt"],article:[],aside:[],audio:["autoplay","controls","loop","preload","src"],b:[],bdi:["dir"],bdo:["dir"],big:[],blockquote:["cite"],br:[],caption:[],center:[],cite:[],code:[],col:["align","valign","span","width"],colgroup:["align","valign","span","width"],dd:[],del:["datetime"],details:["open"],div:[],dl:[],dt:[],em:[],font:["color","size","face"],footer:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],header:[],hr:[],i:[],img:["src","alt","title","width","height"],ins:["datetime"],li:[],mark:[],nav:[],ol:[],p:[],pre:[],s:[],section:[],small:[],span:[],sub:[],sup:[],strong:[],table:["width","border","align","valign"],tbody:["align","valign"],td:["width","rowspan","colspan","align","valign"],tfoot:["align","valign"],th:["width","rowspan","colspan","align","valign"],thead:["align","valign"],tr:["rowspan","align","valign"],tt:[],u:[],ul:[],video:["autoplay","controls","loop","preload","src","height","width"]}}function r(D,z,$){}function e(D,z,$){}function i(D,z,$){}function n(D,z,$){}function a(D){return D.replace(A,"&lt;").replace(T,"&gt;")}function u(D,z,$,R){if($=f($),z==="href"||z==="src"){if(($=C.trim($))==="#")return"#";if($.substr(0,7)!=="http://"&&$.substr(0,8)!=="https://"&&$.substr(0,7)!=="mailto:"&&$.substr(0,4)!=="tel:"&&$[0]!=="#"&&$[0]!=="/")return""}else if(z==="background"){if(E.lastIndex=0,E.test($))return""}else if(z==="style"){if(q.lastIndex=0,q.test($)||(O.lastIndex=0,O.test($)&&(E.lastIndex=0,E.test($))))return"";R!==!1&&(R=R||y,$=R.process($))}return $=b($)}function c(D){return D.replace(L,"&quot;")}function o(D){return D.replace(j,'"')}function l(D){return D.replace(S,function(z,$){return $[0]==="x"||$[0]==="X"?String.fromCharCode(parseInt($.substr(1),16)):String.fromCharCode(parseInt($,10))})}function p(D){return D.replace(M,":").replace(F," ")}function _(D){for(var z="",$=0,R=D.length;$<R;$++)z+=D.charCodeAt($)<32?" ":D.charAt($);return C.trim(z)}function f(D){return D=o(D),D=l(D),D=p(D),D=_(D)}function b(D){return D=c(D),D=a(D)}function g(){return""}function m(D,z){function $(H){return!!R||C.indexOf(D,H)!==-1}typeof z!="function"&&(z=function(){});var R=!Array.isArray(D),B=[],W=!1;return{onIgnoreTag:function(H,G,V){if($(H)){if(V.isClosing){var K="[/removed]",Q=V.position+K.length;return B.push([W!==!1?W:V.position,Q]),W=!1,K}return W||(W=V.position),"[removed]"}return z(H,G,V)},remove:function(H){var G="",V=0;return C.forEach(B,function(K){G+=H.slice(V,K[0]),V=K[1]}),G+=H.slice(V)}}}function w(D){return D.replace(P,"")}function v(D){var z=D.split("");return z=z.filter(function($){var R=$.charCodeAt(0);return R!==127&&(!(R<=31)||R===10||R===13)}),z.join("")}var x=s(31).FilterCSS,k=s(31).getDefaultWhiteList,C=s(35),y=new x,A=/</g,T=/>/g,L=/"/g,j=/&quot;/g,S=/&#([a-zA-Z0-9]*);?/gim,M=/&colon;?/gim,F=/&newline;?/gim,E=/((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi,q=/e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi,O=/u\s*r\s*l\s*\(.*/gi,P=/<!--[\s\S]*?-->/g;h.whiteList=t(),h.getDefaultWhiteList=t,h.onTag=r,h.onIgnoreTag=e,h.onTagAttr=i,h.onIgnoreTagAttr=n,h.safeAttrValue=u,h.escapeHtml=a,h.escapeQuote=c,h.unescapeQuote=o,h.escapeHtmlEntities=l,h.escapeDangerHtml5Entities=p,h.clearNonPrintableCharacter=_,h.friendlyAttrValue=f,h.escapeAttrValue=b,h.onIgnoreTagStripAll=g,h.StripTagBody=m,h.stripCommentTag=w,h.stripBlankChar=v,h.cssFilter=y,h.getDefaultCSSWhiteList=k},function(d,h,s){function t(p){var _=o.spaceIndex(p);if(_===-1)var f=p.slice(1,-1);else var f=p.slice(1,_+1);return f=o.trim(f).toLowerCase(),f.slice(0,1)==="/"&&(f=f.slice(1)),f.slice(-1)==="/"&&(f=f.slice(0,-1)),f}function r(p){return p.slice(0,2)==="</"}function e(p,_,f){var b="",g=0,m=!1,w=!1,v=0,x=p.length,k="",C="";for(v=0;v<x;v++){var y=p.charAt(v);if(m===!1){if(y==="<"){m=v;continue}}else if(w===!1){if(y==="<"){b+=f(p.slice(g,v)),m=v,g=v;continue}if(y===">"){b+=f(p.slice(g,m)),C=p.slice(m,v+1),k=t(C),b+=_(m,b.length,k,C,r(C)),g=v+1,m=!1;continue}if((y==='"'||y==="'")&&p.charAt(v-1)==="="){w=y;continue}}else if(y===w){w=!1;continue}}return g<p.length&&(b+=f(p.substr(g))),b}function i(p,_){function f(y,A){if(y=o.trim(y),y=y.replace(l,"").toLowerCase(),!(y.length<1)){var T=_(y,A||"");T&&g.push(T)}}for(var b=0,g=[],m=!1,w=p.length,v=0;v<w;v++){var x,k,C=p.charAt(v);if(m!==!1||C!=="=")if(m===!1||v!==b||C!=='"'&&C!=="'"||p.charAt(v-1)!=="="){if(/\s|\n|\t/.test(C)){if(p=p.replace(/\s|\n|\t/g," "),m===!1){if((k=n(p,v))===-1){x=o.trim(p.slice(b,v)),f(x),m=!1,b=v+1;continue}v=k-1;continue}if((k=a(p,v-1))===-1){x=o.trim(p.slice(b,v)),x=c(x),f(m,x),m=!1,b=v+1;continue}}}else{if((k=p.indexOf(C,v+1))===-1)break;x=o.trim(p.slice(b+1,k)),f(m,x),m=!1,v=k,b=v+1}else m=p.slice(b,v),b=v+1}return b<p.length&&(m===!1?f(p.slice(b)):f(m,c(o.trim(p.slice(b))))),o.trim(g.join(" "))}function n(p,_){for(;_<p.length;_++){var f=p[_];if(f!==" ")return f==="="?_:-1}}function a(p,_){for(;_>0;_--){var f=p[_];if(f!==" ")return f==="="?_:-1}}function u(p){return p[0]==='"'&&p[p.length-1]==='"'||p[0]==="'"&&p[p.length-1]==="'"}function c(p){return u(p)?p.substr(1,p.length-2):p}var o=s(35),l=/[^a-zA-Z0-9_:\.\-]/gim;h.parseTag=e,h.parseAttr=i},function(d,h,s){function t(e){s(204),s(205)}var r=s(16)(s(67),s(201),t,"data-v-7a63e4b3",null);r.options.__file="D:\\work\\songwang\\yuangongji\\mavonEditor\\src\\mavon-editor.vue",r.esModule&&Object.keys(r.esModule).some(function(e){return e!=="default"&&e.substr(0,2)!=="__"})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] mavon-editor.vue: functional components are not supported with templates, they should use render functions."),d.exports=r.exports},function(d,h,s){var t=s(197),r={autoTextarea:t,install:function(e){e.component("auto-textarea",t)}};d.exports=r},function(d,h,s){Object.defineProperty(h,"__esModule",{value:!0}),h.default={data:function(){var t=this;return{temp_value:function(){return t.value}(),s_autofocus:function(){if(t.autofocus)return"autofocus"}()}},created:function(){},props:{fullHeight:{type:Boolean,default:!1},autofocus:{type:Boolean,default:!1},value:{type:String,default:""},placeholder:{type:String,default:""},border:{type:Boolean,default:!1},resize:{type:Boolean,default:!1},onchange:{type:Function,default:null},fontSize:{type:String,default:"14px"},lineHeight:{type:String,default:"18px"}},methods:{change:function(t){this.onchange&&this.onchange(this.temp_value,t)}},watch:{value:function(t,r){this.temp_value=t},temp_value:function(t,r){this.$emit("input",t)}}}},function(d,h,s){Object.defineProperty(h,"__esModule",{value:!0}),h.default={name:"s-md-toolbar-left",props:{editable:{type:Boolean,default:!0},transition:{type:Boolean,default:!0},toolbars:{type:Object,required:!0},d_words:{type:Object,required:!0},image_filter:{type:Function,default:null}},data:function(){return{img_file:[[0,null]],img_timer:null,header_timer:null,s_img_dropdown_open:!1,s_header_dropdown_open:!1,s_img_link_open:!1,trigger:null,num:0,link_text:"",link_addr:"",link_type:"link"}},methods:{$imgLinkAdd:function(){this.$emit("toolbar_left_addlink",this.link_type,this.link_text,this.link_addr),this.s_img_link_open=!1},$toggle_imgLinkAdd:function(t){var r=this;this.link_type=t,this.link_text=this.link_addr="",this.s_img_link_open=!0,this.$nextTick(function(){r.$refs.linkTextInput.focus()}),this.s_img_dropdown_open=!1},$imgFileListClick:function(t){this.$emit("imgTouch",this.img_file[t])},$changeUrl:function(t,r){this.img_file[t][0]=r},$imgFileAdd:function(t){this.img_file.push([++this.num,t]),this.$emit("imgAdd",this.num,t),this.s_img_dropdown_open=!1},$imgFilesAdd:function(t){for(var r=typeof this.image_filter=="function",e=0;e<t.length;e++)r&&this.image_filter(t[e])===!0?this.$imgFileAdd(t[e]):!r&&t[e].type.match(/^image\//i)&&this.$imgFileAdd(t[e])},$imgAdd:function(t){this.$imgFilesAdd(t.target.files),t.target.value=""},$imgDel:function(t){this.$emit("imgDel",this.img_file[t]),this.img_file.splice(t,1),this.num--,this.s_img_dropdown_open=!1},isEqualName:function(t,r){return!(!this.img_file[r][1]||this.img_file[r][1].name!==t&&this.img_file[r][1]._name!==t)},$imgDelByFilename:function(t){for(var r=0;this.img_file.length>r;){if(this.img_file[r][1]===t||this.isEqualName(t,r))return this.$imgDel(r),!0;r+=1}return!1},$imgAddByFilename:function(t,r){for(var e=0;e<this.img_file.length;e++)if(this.img_file[e][0]===t)return!1;return this.img_file[0][0]=t,this.img_file[0][1]=r,this.img_file[0][2]=t,this.img_file.unshift(["./"+this.num,null]),this.$emit("imgAdd",this.img_file[1][0],r,!1),!0},$imgAddByUrl:function(t,r){for(var e=0;e<this.img_file.length;e++)if(this.img_file[e][0]===t)return!1;return this.img_file[0][0]=t,this.img_file[0][1]=r,this.img_file.unshift(["./"+this.num,null]),!0},$imgUpdateByFilename:function(t,r){for(var e=0;e<this.img_file.length;e++)if(this.img_file[e][0]===t||this.isEqualName(t,e))return this.img_file[e][1]=r,this.$emit("imgAdd",t,r,!1),!0;return!1},$mouseenter_img_dropdown:function(){this.editable&&(clearTimeout(this.img_timer),this.s_img_dropdown_open=!0)},$mouseleave_img_dropdown:function(){var t=this;this.img_timer=setTimeout(function(){t.s_img_dropdown_open=!1},200)},$mouseenter_header_dropdown:function(){this.editable&&(clearTimeout(this.header_timer),this.s_header_dropdown_open=!0)},$mouseleave_header_dropdown:function(){var t=this;this.header_timer=setTimeout(function(){t.s_header_dropdown_open=!1},200)},$clicks:function(t){this.editable&&this.$emit("toolbar_left_click",t)},$click_header:function(t){this.$emit("toolbar_left_click",t),this.s_header_dropdown_open=!1},handleClose:function(t){this.s_img_dropdown_open=!1}},watch:{s_img_link_open:function(t){this.$parent.$el.style.zIndex=t?1501:1500}}}},function(d,h,s){Object.defineProperty(h,"__esModule",{value:!0}),h.default={name:"s-md-toolbar-right",props:{s_subfield:{type:Boolean,required:!0},toolbars:{type:Object,required:!0},s_preview_switch:{type:Boolean,required:!0},s_fullScreen:{type:Boolean,required:!0},s_html_code:{type:Boolean,required:!0},s_navigation:{type:Boolean,required:!0},d_words:{type:Object,required:!0}},methods:{$clicks:function(t){this.$emit("toolbar_right_click",t)}}}},function(module,exports,__webpack_require__){function _interopRequireDefault(d){return d&&d.__esModule?d:{default:d}}Object.defineProperty(exports,"__esModule",{value:!0});var _typeof2=__webpack_require__(18),_typeof3=_interopRequireDefault(_typeof2),_autoTextarea=__webpack_require__(63),_keydownListen=__webpack_require__(72),_langHljsCss=__webpack_require__(70),_langHljsCss2=_interopRequireDefault(_langHljsCss),_extraFunction=__webpack_require__(38),_util=__webpack_require__(77),_toolbar_left_click2=__webpack_require__(75),_toolbar_right_click2=__webpack_require__(76),_config=__webpack_require__(69),_markdown=__webpack_require__(74),_markdown2=_interopRequireDefault(_markdown),_mdToolbarLeft=__webpack_require__(36),_mdToolbarLeft2=_interopRequireDefault(_mdToolbarLeft),_mdToolbarRight=__webpack_require__(37),_mdToolbarRight2=_interopRequireDefault(_mdToolbarRight);__webpack_require__(115),__webpack_require__(114),exports.default={mixins:[_markdown2.default],props:{scrollStyle:{type:Boolean,default:!0},boxShadow:{type:Boolean,default:!0},transition:{type:Boolean,default:!0},autofocus:{type:Boolean,default:!0},fontSize:{type:String,default:"14px"},toolbarsBackground:{type:String,default:"#ffffff"},editorBackground:{type:String,default:"#ffffff"},previewBackground:{type:String,default:"#fbfbfb"},boxShadowStyle:{type:String,default:"0 2px 12px 0 rgba(0, 0, 0, 0.1)"},help:{type:String,default:null},value:{type:String,default:""},language:{type:String,default:"zh-CN"},subfield:{type:Boolean,default:!0},navigation:{type:Boolean,default:!1},defaultOpen:{type:String,default:null},editable:{type:Boolean,default:!0},toolbarsFlag:{type:Boolean,default:!0},toolbars:{type:Object,default:function(){return _config.CONFIG.toolbars}},html:{type:Boolean,default:!0},xssOptions:{type:[Object,Boolean],default:function(){return{}}},codeStyle:{type:String,default:function(){return"github"}},placeholder:{type:String,default:null},ishljs:{type:Boolean,default:!0},externalLink:{type:[Object,Boolean],default:!0},imageFilter:{type:Function,default:null},imageClick:{type:Function,default:null},tabSize:{type:Number,default:0},shortCut:{type:Boolean,default:!0}},data:function(){var d=this;return{s_right_click_menu_show:!1,right_click_menu_top:0,right_click_menu_left:0,s_subfield:function(){return d.subfield}(),s_autofocus:!0,s_navigation:function(){return d.navigation}(),s_scrollStyle:function(){return d.scrollStyle}(),d_value:"",d_render:"",s_preview_switch:function(){var h=d.defaultOpen;return h||(h=d.subfield?"preview":"edit"),h==="preview"}(),s_fullScreen:!1,s_help:!1,s_html_code:!1,d_help:null,d_words:null,edit_scroll_height:-1,s_readmodel:!1,s_table_enter:!1,d_history:function(){var h=[];return h.push(d.value),h}(),d_history_index:0,currentTimeout:"",d_image_file:[],d_preview_imgsrc:null,s_external_link:{markdown_css:function(){return"https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css"},hljs_js:function(){return"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js"},hljs_lang:function(h){return"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/languages/"+h+".min.js"},hljs_css:function(h){return _langHljsCss2.default[h]?"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/"+h+".min.css":""},katex_js:function(){return"https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.js"},katex_css:function(){return"https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.css"}},p_external_link:{},textarea_selectionEnd:0,textarea_selectionEnds:[0],_xssHandler:null}},created:function(){var d=this;this.initLanguage(),this.initExternalFuc(),this.$nextTick(function(){d.editableTextarea()})},mounted:function(){var d=this;this.$el.addEventListener("paste",function(h){d.$paste(h)}),this.$el.addEventListener("drop",function(h){d.$drag(h)}),(0,_keydownListen.keydownListen)(this),(0,_extraFunction.ImagePreviewListener)(this),this.autofocus&&this.getTextareaDom().focus(),(0,_extraFunction.fullscreenchange)(this),this.d_value=this.value||"",document.body.appendChild(this.$refs.help),this.loadExternalLink("markdown_css","css"),this.loadExternalLink("katex_css","css"),this.loadExternalLink("katex_js","js",function(){d.iRender(!0)}),this.loadExternalLink("hljs_js","js",function(){d.iRender(!0)}),d.codeStyleChange(d.codeStyle,!0)},beforeDestroy:function(){document.body.removeChild(this.$refs.help)},getMarkdownIt:function(){var d=this.mixins[0].data().markdownIt;return d||(d=(0,_markdown.initMarkdown)()),d},methods:{loadExternalLink:function(d,h,s){if(typeof this.p_external_link[d]!="function")return void(this.p_external_link[d]!==!1&&console.error("external_link."+d,"is not a function, if you want to disabled this error log, set external_link."+d,"to function or false"));var t={css:_extraFunction.loadLink,js:_extraFunction.loadScript};t.hasOwnProperty(h)&&t[h](this.p_external_link[d](),s)},initExternalFuc:function(){for(var d=this,h=["markdown_css","hljs_js","hljs_css","hljs_lang","katex_js","katex_css"],s=(0,_typeof3.default)(d.externalLink),t=s==="object",r=s==="boolean",e=0;e<h.length;e++)r&&!d.externalLink||t&&d.externalLink[h[e]]===!1?d.p_external_link[h[e]]=!1:t&&typeof d.externalLink[h[e]]=="function"?d.p_external_link[h[e]]=d.externalLink[h[e]]:d.p_external_link[h[e]]=d.s_external_link[h[e]]},textAreaFocus:function(){this.$refs.vNoteTextarea.$refs.vTextarea.focus()},$drag:function(d){var h=d.dataTransfer;if(h){var s=h.files;s.length>0&&(d.preventDefault(),this.$refs.toolbar_left.$imgFilesAdd(s))}},$paste:function(d){var h=d.clipboardData;if(h){var s=h.items;if(!s)return;for(var t=h.types||[],r=null,e=0;e<t.length;e++)if(t[e]==="Files"){r=s[e];break}if(r&&r.kind==="file"){(0,_util.stopEvent)(d);var i=r.getAsFile();this.$refs.toolbar_left.$imgFilesAdd([i])}}},$imgTouch:function(d){},$imgDel:function(d){this.markdownIt.image_del(d[1]);var h=d[0],s=new RegExp("\\!\\["+d[1]._name+"\\]\\("+h+"\\)","g");this.d_value=this.d_value.replace(s,""),this.iRender(),this.$emit("imgDel",d)},$imgAdd:function(d,h,s){s===void 0&&(s=!0);var t=this;if(this.__rFilter==null&&(this.__rFilter=/^image\//i),this.__oFReader=new FileReader,this.__oFReader.onload=function(e){t.markdownIt.image_add(d,e.target.result),h.miniurl=e.target.result,s===!0&&(h._name=h.name.replace(/[\[\]\(\)\+\{\}&\|\\\*^%$#@\-]/g,""),t.insertText(t.getTextareaDom(),{prefix:"!["+h._name+"]("+d+")",subfix:"",str:""}),t.$nextTick(function(){t.$emit("imgAdd",d,h)}))},h){var r=h;this.__rFilter.test(r.type)&&this.__oFReader.readAsDataURL(r)}},$imgUpdateByUrl:function(d,h){var s=this;this.markdownIt.image_add(d,h),this.$nextTick(function(){s.d_render=this.markdownIt.render(this.d_value)})},$imgAddByUrl:function(d,h){return!!this.$refs.toolbar_left.$imgAddByUrl(d,h)&&(this.$imgUpdateByUrl(d,h),!0)},$img2Url:function $img2Url(fileIndex,url){var reg_str="/(!\\[[^\\[]*?\\](?=\\())\\(\\s*("+fileIndex+")\\s*\\)/g",reg=eval(reg_str);this.d_value=this.d_value.replace(reg,"$1("+url+")"),this.$refs.toolbar_left.$changeUrl(fileIndex,url),this.iRender()},$imglst2Url:function(d){if(d instanceof Array)for(var h=0;h<d.length;h++)this.$img2Url(d[h][0],d[h][1])},toolbar_left_click:function(d){(0,_toolbar_left_click2.toolbar_left_click)(d,this)},toolbar_left_addlink:function(d,h,s){(0,_toolbar_left_click2.toolbar_left_addlink)(d,h,s,this)},toolbar_right_click:function(d){(0,_toolbar_right_click2.toolbar_right_click)(d,this)},getNavigation:function(d,h){return(0,_extraFunction.getNavigation)(d,h)},change:function(d,h){this.$emit("change",d,h)},fullscreen:function(d,h){this.$emit("fullScreen",d,h)},readmodel:function(d,h){this.$emit("readModel",d,h)},previewtoggle:function(d,h){this.$emit("previewToggle",d,h)},subfieldtoggle:function(d,h){this.$emit("subfieldToggle",d,h)},htmlcode:function(d,h){this.$emit("htmlCode",d,h)},helptoggle:function(d,h){this.$emit("helpToggle",d,h)},save:function(d,h){this.$emit("save",d,h)},navigationtoggle:function(d,h){this.$emit("navigationToggle",d,h)},$toolbar_right_read_change_status:function(){this.s_readmodel=!this.s_readmodel,this.readmodel&&this.readmodel(this.s_readmodel,this.d_value),this.s_readmodel&&this.toolbars.navigation&&this.getNavigation(this,!0)},$v_edit_scroll:function(d){(0,_extraFunction.scrollLink)(d,this)},getTextareaDom:function(){return this.$refs.vNoteTextarea.$refs.vTextarea},insertText:function(d,h){var s=h.prefix,t=h.subfix,r=h.str,e=h.type;(0,_extraFunction.insertTextAtCaret)(d,{prefix:s,subfix:t,str:r,type:e},this)},insertTab:function(){(0,_extraFunction.insertTab)(this,this.tabSize)},insertOl:function(){(0,_extraFunction.insertOl)(this)},removeLine:function(){(0,_extraFunction.removeLine)(this)},insertUl:function(){(0,_extraFunction.insertUl)(this)},unInsertTab:function(){(0,_extraFunction.unInsertTab)(this,this.tabSize)},insertCodeBlock:function(){(0,_extraFunction.insertCodeBlock)(this)},insertEnter:function(d){(0,_extraFunction.insertEnter)(this,d)},saveHistory:function(){this.d_history.splice(this.d_history_index+1,this.d_history.length),this.d_history.push(this.d_value),this.textarea_selectionEnds.splice(this.d_history_index+1,this.textarea_selectionEnds.length),this.textarea_selectionEnds.push(this.textarea_selectionEnd),this.d_history_index=this.d_history.length-1},saveSelectionEndsHistory:function(){var d=this.$refs.vNoteTextarea&&this.$refs.vNoteTextarea.$el.querySelector("textarea");this.textarea_selectionEnd=d?d.selectionEnd:this.textarea_selectionEnd},initLanguage:function(){var d=_config.CONFIG.langList.indexOf(this.language)>=0?this.language:"zh-CN",h=this;h.$render(_config.CONFIG["help_"+d],function(s){h.d_help=s}),this.d_words=_config.CONFIG["words_"+d]},editableTextarea:function(){var d=this.$refs.vNoteTextarea.$refs.vTextarea;this.editable?d.removeAttribute("disabled"):d.setAttribute("disabled","disabled")},codeStyleChange:function(d,h){if(h=h||!1,typeof this.p_external_link.hljs_css!="function")return void(this.p_external_link.hljs_css!==!1&&console.error("external_link.hljs_css is not a function, if you want to disabled this error log, set external_link.hljs_css to function or false"));var s=this.p_external_link.hljs_css(d);s.length===0&&h&&(console.warn("hljs color scheme",d,"do not exist, loading default github"),s=this.p_external_link.hljs_css("github")),s.length>0?(0,_extraFunction.loadLink)(s,null,"md-code-style"):console.warn("hljs color scheme",d,"do not exist, hljs color scheme will not change")},iRender:function(d){var h=this;this.$render(h.d_value,function(s){h.d_render=s,d||h.change&&h.change(h.d_value,h.d_render),h.s_navigation&&(0,_extraFunction.getNavigation)(h,!1),h.$emit("input",h.d_value),h.d_value!==h.d_history[h.d_history_index]&&(window.clearTimeout(h.currentTimeout),h.currentTimeout=setTimeout(function(){h.saveHistory()},500))})},$emptyHistory:function(){this.d_history=[this.d_value],this.d_history_index=0}},watch:{d_value:function(d,h){this.saveSelectionEndsHistory(),this.iRender()},value:function(d,h){d!==this.d_value&&(this.d_value=d)},subfield:function(d,h){this.s_subfield=d},d_history_index:function(){this.d_history_index>20&&(this.d_history.shift(),this.d_history_index=this.d_history_index-1),this.d_value=this.d_history[this.d_history_index]},language:function(d){this.initLanguage()},editable:function(){this.editableTextarea()},defaultOpen:function(d){var h=d;return h||(h=this.subfield?"preview":"edit"),this.s_preview_switch=h==="preview",this.s_preview_switch},codeStyle:function(d){this.codeStyleChange(d)}},components:{"v-autoTextarea":_autoTextarea.autoTextarea,"v-md-toolbar-left":_mdToolbarLeft2.default,"v-md-toolbar-right":_mdToolbarRight2.default}}},function(d,h,s){var t=s(62),r={markdownIt:t.mixins[0].data().markdownIt,mavonEditor:t,LeftToolbar:s(36),RightToolbar:s(37),install:function(e){e.component("mavon-editor",t)}};d.exports=r},function(d,h,s){function t(D){return D&&D.__esModule?D:{default:D}}Object.defineProperty(h,"__esModule",{value:!0}),h.CONFIG=void 0;var r=s(193),e=t(r),i=s(194),n=t(i),a=s(188),u=t(a),c=s(189),o=t(c),l=s(191),p=t(l),_=s(192),f=t(_),b=s(187),g=t(b),m=s(190),w=t(m),v=s(217),x=t(v),k=s(218),C=t(k),y=s(212),A=t(y),T=s(213),L=t(T),j=s(215),S=t(j),M=s(216),F=t(M),E=s(211),q=t(E),O=s(214),P=t(O);h.CONFIG={"help_zh-CN":e.default,"help_zh-TW":n.default,"help_pt-BR":p.default,help_en:u.default,help_fr:o.default,help_ru:f.default,help_de:g.default,help_ja:w.default,"words_zh-CN":x.default,"words_zh-TW":C.default,"words_pt-BR":S.default,words_en:A.default,words_fr:L.default,words_ru:F.default,words_de:q.default,words_ja:P.default,langList:["en","zh-CN","zh-TW","fr","pt-BR","ru","de","ja"],toolbars:{bold:!0,italic:!0,header:!0,underline:!0,strikethrough:!0,mark:!0,superscript:!0,subscript:!0,quote:!0,ol:!0,ul:!0,link:!0,imagelink:!0,code:!0,table:!0,undo:!0,redo:!0,trash:!0,save:!0,alignleft:!0,aligncenter:!0,alignright:!0,navigation:!0,subfield:!0,fullscreen:!0,readmodel:!0,htmlcode:!0,help:!0,preview:!0}}},function(d,h,s){Object.defineProperty(h,"__esModule",{value:!0}),h.default={agate:1,androidstudio:1,"arduino-light":1,arta:1,ascetic:1,"atom-one-dark":1,"atom-one-light":1,"brown-paper":1,"codepen-embed":1,"color-brewer":1,dark:1,default:1,docco:1,far:1,foundation:1,github:1,googlecode:1,grayscale:1,hybrid:1,idea:1,"ir-black":1,magula:1,"mono-blue":1,"monokai-sublime":1,monokai:1,obsidian:1,"paraiso-dark":1,"paraiso-light":1,pojoaque:1,purebasic:1,rainbow:1,routeros:1,"school-book":1,sunburst:1,"tomorrow-night-blue":1,"tomorrow-night-bright":1,vs:1,vs2015:1,xcode:1,xt256:1,"a11y-dark":1,"a11y-light":1,"an-old-hope":1,"atom-one-dark-reasonable":1,"brown-pap":1,devibeans:1,"github-dark":1,"github-dark-dimmed":1,gml:1,"gradient-dark":1,"gradient-light":1,"isbl-editor-dark":1,"isbl-editor-light":1,"kimbie-dark":1,"kimbie-light":1,lightfair:1,lioshi:1,"night-owl":1,"nnfx-dark":1,"nnfx-light":1,nord:1,pojo:1,"qtcreator-dark":1,"qtcreator-light":1,"shades-of-purple":1,srcery:1,"stackoverflow-dark":1,"stackoverflow-light":1}},function(d,h,s){Object.defineProperty(h,"__esModule",{value:!0}),h.default={"1c":"1c",abnf:"abnf",accesslog:"accesslog",actionscript:"actionscript",as:"actionscript",ada:"ada",apache:"apache",apacheconf:"apache",applescript:"applescript",osascript:"applescript",arduino:"arduino",armasm:"armasm",arm:"armasm",asciidoc:"asciidoc",adoc:"asciidoc",aspectj:"aspectj",autohotkey:"autohotkey",ahk:"autohotkey",autoit:"autoit",avrasm:"avrasm",awk:"awk",axapta:"axapta",bash:"bash",sh:"bash",zsh:"bash",basic:"basic",bnf:"bnf",brainfuck:"brainfuck",bf:"brainfuck",cal:"cal",capnproto:"capnproto",capnp:"capnproto",ceylon:"ceylon",clean:"clean",icl:"clean",dcl:"clean","clojure-repl":"clojure-repl",clojure:"clojure",clj:"clojure",cmake:"cmake","cmake.in":"cmake",coffeescript:"coffeescript",coffee:"coffeescript",cson:"coffeescript",iced:"coffeescript",coq:"coq",cos:"cos",cls:"cos",cpp:"cpp",c:"cpp",cc:"cpp",h:"cpp","c++":"cpp","h++":"cpp",hpp:"cpp",crmsh:"crmsh",crm:"crmsh",pcmk:"crmsh",crystal:"crystal",cr:"crystal",cs:"cs",csharp:"cs",csp:"csp",css:"css",d:"d",dart:"dart",delphi:"delphi",dpr:"delphi",dfm:"delphi",pas:"delphi",pascal:"delphi",freepascal:"delphi",lazarus:"delphi",lpr:"delphi",lfm:"delphi",diff:"diff",patch:"diff",django:"django",jinja:"django",dns:"dns",bind:"dns",zone:"dns",dockerfile:"dockerfile",docker:"dockerfile",dos:"dos",bat:"dos",cmd:"dos",dsconfig:"dsconfig",dts:"dts",dust:"dust",dst:"dust",ebnf:"ebnf",elixir:"elixir",elm:"elm",erb:"erb","erlang-repl":"erlang-repl",erlang:"erlang",erl:"erlang",excel:"excel",xlsx:"excel",xls:"excel",fix:"fix",flix:"flix",fortran:"fortran",f90:"fortran",f95:"fortran",fsharp:"fsharp",fs:"fsharp",gams:"gams",gms:"gams",gauss:"gauss",gss:"gauss",gcode:"gcode",nc:"gcode",gherkin:"gherkin",feature:"gherkin",glsl:"glsl",go:"go",golang:"go",golo:"golo",gradle:"gradle",groovy:"groovy",haml:"haml",handlebars:"handlebars",hbs:"handlebars","html.hbs":"handlebars","html.handlebars":"handlebars",haskell:"haskell",hs:"haskell",haxe:"haxe",hx:"haxe",hsp:"hsp",htmlbars:"htmlbars",http:"http",https:"http",hy:"hy",hylang:"hy",inform7:"inform7",i7:"inform7",ini:"ini",toml:"ini",irpf90:"irpf90",java:"java",jsp:"java",javascript:"javascript",js:"javascript",jsx:"javascript","jboss-cli":"jboss-cli","wildfly-cli":"jboss-cli",json:"json","julia-repl":"julia-repl",julia:"julia",kotlin:"kotlin",lasso:"lasso",ls:"livescript",lassoscript:"lasso",ldif:"ldif",leaf:"leaf",less:"less",lisp:"lisp",livecodeserver:"livecodeserver",livescript:"livescript",llvm:"llvm",lsl:"lsl",lua:"lua",makefile:"makefile",mk:"makefile",mak:"makefile",markdown:"markdown",md:"markdown",mkdown:"markdown",mkd:"markdown",mathematica:"mathematica",mma:"mathematica",matlab:"matlab",maxima:"maxima",mel:"mel",mercury:"mercury",m:"mercury",moo:"mercury",mipsasm:"mipsasm",mips:"mipsasm",mizar:"mizar",mojolicious:"mojolicious",monkey:"monkey",moonscript:"moonscript",moon:"moonscript",n1ql:"n1ql",nginx:"nginx",nginxconf:"nginx",nimrod:"nimrod",nim:"nimrod",nix:"nix",nixos:"nix",nsis:"nsis",objectivec:"objectivec",mm:"objectivec",objc:"objectivec","obj-c":"objectivec",ocaml:"ocaml",ml:"sml",openscad:"openscad",scad:"openscad",oxygene:"oxygene",parser3:"parser3",perl:"perl",pl:"perl",pm:"perl",pf:"pf","pf.conf":"pf",php:"php",php3:"php",php4:"php",php5:"php",php6:"php",pony:"pony",powershell:"powershell",ps:"powershell",processing:"processing",profile:"profile",prolog:"prolog",protobuf:"protobuf",puppet:"puppet",pp:"puppet",purebasic:"purebasic",pb:"purebasic",pbi:"purebasic",python:"python",py:"python",gyp:"python",q:"q",k:"q",kdb:"q",qml:"qml",qt:"qml",r:"r",rib:"rib",roboconf:"roboconf",graph:"roboconf",instances:"roboconf",routeros:"routeros",mikrotik:"routeros",rsl:"rsl",ruby:"ruby",rb:"ruby",gemspec:"ruby",podspec:"ruby",thor:"ruby",irb:"ruby",ruleslanguage:"ruleslanguage",rust:"rust",rs:"rust",scala:"scala",scheme:"scheme",scilab:"scilab",sci:"scilab",scss:"scss",shell:"shell",console:"shell",smali:"smali",smalltalk:"smalltalk",st:"smalltalk",sml:"sml",sqf:"sqf",sql:"sql",stan:"stan",stata:"stata",do:"stata",ado:"stata",step21:"step21",p21:"step21",step:"step21",stp:"step21",stylus:"stylus",styl:"stylus",subunit:"subunit",swift:"swift",taggerscript:"taggerscript",tap:"tap",tcl:"tcl",tk:"tcl",tex:"tex",thrift:"thrift",tp:"tp",twig:"twig",craftcms:"twig",typescript:"typescript",ts:"typescript",vala:"vala",vbnet:"vbnet",vb:"vbnet","vbscript-html":"vbscript-html",vbscript:"vbscript",vbs:"vbscript",verilog:"verilog",v:"verilog",sv:"verilog",svh:"verilog",vhdl:"vhdl",vim:"vim",x86asm:"x86asm",xl:"xl",tao:"xl",xml:"xml",html:"xml",xhtml:"xml",rss:"xml",atom:"xml",xjb:"xml",xsd:"xml",xsl:"xml",plist:"xml",xquery:"xquery",xpath:"xquery",xq:"xquery",yaml:"yaml",yml:"yaml",YAML:"yaml",zephir:"zephir",zep:"zephir"}},function(d,h,s){Object.defineProperty(h,"__esModule",{value:!0});var t={F8:119,F9:120,F10:121,F11:122,F12:123,B:66,I:73,H:72,U:85,D:68,M:77,Q:81,O:79,L:76,S:83,Z:90,Y:89,C:67,T:84,R:82,DELETE:8,TAB:9,ENTER:13,ONE:97,TWO:98,THREE:99,FOUR:100,FIVE:101,SIX:102,_ONE:49,_TWO:50,_THREE:51,_FOUR:52,_FIVE:53,_SIX:54};h.keydownListen=function(r){r.shortCut&&r.$el.addEventListener("keydown",function(e){if(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey)if(!e.ctrlKey&&!e.metaKey||e.altKey||e.shiftKey){if((e.ctrlKey||e.metaKey)&&e.altKey&&!e.shiftKey)switch(e.keyCode){case t.S:e.preventDefault(),r.toolbar_left_click("superscript");break;case t.U:e.preventDefault(),r.toolbar_left_click("ul");break;case t.L:e.preventDefault(),r.toolbar_left_click("imagelink");break;case t.C:e.preventDefault(),r.toolbar_left_click("code");break;case t.T:e.preventDefault(),r.toolbar_left_click("table")}else if((e.ctrlKey||e.metaKey)&&e.shiftKey&&!e.altKey)switch(e.keyCode){case t.S:e.preventDefault(),r.toolbar_left_click("subscript");break;case t.D:e.preventDefault(),r.toolbar_left_click("strikethrough");break;case t.L:e.preventDefault(),r.toolbar_left_click("alignleft");break;case t.R:e.preventDefault(),r.toolbar_left_click("alignright");break;case t.C:e.preventDefault(),r.toolbar_left_click("aligncenter")}else if(!e.ctrlKey&&!e.metaKey&&e.shiftKey&&!e.altKey)switch(e.keyCode){case t.TAB:r.$refs.toolbar_left.s_img_link_open||(e.preventDefault(),r.unInsertTab())}}else switch(e.keyCode){case t.B:e.preventDefault(),r.toolbar_left_click("bold");break;case t.I:e.preventDefault(),r.toolbar_left_click("italic");break;case t.H:e.preventDefault(),r.toolbar_left_click("header");break;case t.U:e.preventDefault(),r.toolbar_left_click("underline");break;case t.D:e.preventDefault(),r.toolbar_left_click("removeLine");break;case t.M:e.preventDefault(),r.toolbar_left_click("mark");break;case t.Q:e.preventDefault(),r.toolbar_left_click("quote");break;case t.O:e.preventDefault(),r.toolbar_left_click("ol");break;case t.L:e.preventDefault(),r.toolbar_left_click("link");break;case t.S:e.preventDefault(),r.toolbar_left_click("save");break;case t.Z:e.preventDefault(),r.toolbar_left_click("undo");break;case t.Y:e.preventDefault(),r.toolbar_left_click("redo");break;case t.DELETE:e.preventDefault(),r.toolbar_left_click("trash");break;case t.ONE:e.preventDefault(),r.toolbar_left_click("header1");break;case t.TWO:e.preventDefault(),r.toolbar_left_click("header2");break;case t.THREE:e.preventDefault(),r.toolbar_left_click("header3");break;case t.FOUR:e.preventDefault(),r.toolbar_left_click("header4");break;case t.FIVE:e.preventDefault(),r.toolbar_left_click("header5");break;case t.SIX:e.preventDefault(),r.toolbar_left_click("header6");break;case t._ONE:e.preventDefault(),r.toolbar_left_click("header1");break;case t._TWO:e.preventDefault(),r.toolbar_left_click("header2");break;case t._THREE:e.preventDefault(),r.toolbar_left_click("header3");break;case t._FOUR:e.preventDefault(),r.toolbar_left_click("header4");break;case t._FIVE:e.preventDefault(),r.toolbar_left_click("header5");break;case t._SIX:e.preventDefault(),r.toolbar_left_click("header6")}else switch(e.keyCode){case t.F8:r.toolbars.navigation&&(e.preventDefault(),r.toolbar_right_click("navigation"));break;case t.F9:r.toolbars.preview&&(e.preventDefault(),r.toolbar_right_click("preview"));break;case t.F10:r.toolbars.fullscreen&&(e.preventDefault(),r.toolbar_right_click("fullscreen"));break;case t.F11:r.toolbars.readmodel&&(e.preventDefault(),r.toolbar_right_click("read"));break;case t.F12:r.toolbars.subfield&&(e.preventDefault(),r.toolbar_right_click("subfield"));break;case t.TAB:r.$refs.toolbar_left.s_img_link_open||(e.preventDefault(),r.insertTab());break;case t.ENTER:r.$refs.toolbar_left.s_img_link_open?(e.preventDefault(),r.$refs.toolbar_left.$imgLinkAdd()):r.insertEnter(e)}})}},function(d,h,s){function t(n){i&&r(n.tokens,["inline","html_block"])}function r(n,a){for(var u=void 0,c=void 0,o=0;o<n.length;o++)a.indexOf(n[o].type)!==-1&&(u=n[o].content,c=n[o].children,n[o].content=i.process(u),c&&c.length&&u!==n[o].content&&r(c,["html_inline"]))}Object.defineProperty(h,"__esModule",{value:!0}),h.default=function(n,a){n.options.html&&(i=new e.FilterXSS(a),n.core.ruler.push("mavoneditor_sanitizer",t))};var e=s(209),i=void 0},function(d,h,s){function t(F){return F&&F.__esModule?F:{default:F}}function r(){var F=new p(l),E=F.renderer.rules.link_open||function(q,O,P,D,z){return z.renderToken(q,O,P)};return F.renderer.rules.link_open=function(q,O,P,D,z){var $=q[O].attrIndex("href");if(q[O].attrs[$][1].startsWith("#"))return E(q,O,P,D,z);var R=q[O].attrIndex("target");return R<0?q[O].attrPush(["target","_blank"]):q[O].attrs[R][1]="_blank",E(q,O,P,D,z)},F.use(A,M).use(_).use(b).use(f).use(C).use(C,"hljs-left").use(C,"hljs-center").use(C,"hljs-right").use(g).use(m).use(w).use(v).use(x).use(C).use(L).use(T).use(k).use(y),F}Object.defineProperty(h,"__esModule",{value:!0});var e=s(18),i=t(e);h.initMarkdown=r;var n=s(71),a=t(n),u=s(38),c=s(73),o=t(c),l={html:!0,xhtmlOut:!0,breaks:!0,langPrefix:"lang-",linkify:!1,typographer:!0,quotes:"\u201C\u201D\u2018\u2019"},p=s(137),_=s(121),f=s(133),b=s(134),g=s(120),m=s(118),w=s(127),v=s(130),x=s(132),k=s(135),C=s(119),y=s(136),A=s(128),T=s(131),L=s(129),j={},S=[],M={hljs:"auto",highlighted:!0,langCheck:function(F){F&&a.default[F]&&!j[F]&&(j[F]=1,S.push(a.default[F]))}};h.default={data:function(){return{markdownIt:null}},created:function(){this.markdownIt=r(),this.html?(0,i.default)(this.xssOptions)==="object"&&this.markdownIt.use(o.default,this.xssOptions):(this.markdownIt.set({html:!1}),this.xssOptions=!1)},mounted:function(){M.highlighted=this.ishljs},methods:{$render:function(F,E){var q=this;j={},S=[];var O=this.markdownIt.render(F);this.ishljs&&S.length>0&&q.$_render(F,E,O),E(O)},$_render:function(F,E,q){for(var O=this,P=0,D=0;D<S.length;D++){var z=O.p_external_link.hljs_lang(S[D]);(0,u.loadScript)(z,function(){(P+=1)===S.length&&(q=this.markdownIt.render(F),E(q))})}}},watch:{ishljs:function(F){M.highlighted=F}}}},function(d,h,s){function t(o){o.d_history_index>0&&o.d_history_index--,o.$nextTick(function(){var l=o.textarea_selectionEnds[o.d_history_index];o.getTextareaDom().selectionStart=l,o.getTextareaDom().selectionEnd=l}),o.getTextareaDom().focus()}function r(o){o.d_history_index<o.d_history.length-1&&o.d_history_index++,o.$nextTick(function(){var l=o.textarea_selectionEnds[o.d_history_index];o.getTextareaDom().selectionStart=l,o.getTextareaDom().selectionEnd=l}),o.getTextareaDom().focus()}function e(o){o.d_value="",o.getTextareaDom().focus()}function i(o){o.save(o.d_value,o.d_render)}function n(o){o.insertOl()}function a(o){o.insertUl()}function u(o){o.removeLine()}function c(o){o.insertCodeBlock()}Object.defineProperty(h,"__esModule",{value:!0}),h.toolbar_left_addlink=function(o,l,p,_){var f={prefix:o==="link"?"["+l+"](":"!["+l+"](",subfix:")",str:p};_.insertText(_.getTextareaDom(),f)},h.toolbar_left_click=function(o,l){var p={bold:{prefix:"**",subfix:"**",str:l.d_words.tl_bold},italic:{prefix:"*",subfix:"*",str:l.d_words.tl_italic},header:{prefix:"# ",subfix:"",str:l.d_words.tl_header},header1:{prefix:"# ",subfix:"",str:l.d_words.tl_header_one},header2:{prefix:"## ",subfix:"",str:l.d_words.tl_header_two},header3:{prefix:"### ",subfix:"",str:l.d_words.tl_header_three},header4:{prefix:"#### ",subfix:"",str:l.d_words.tl_header_four},header5:{prefix:"##### ",subfix:"",str:l.d_words.tl_header_five},header6:{prefix:"###### ",subfix:"",str:l.d_words.tl_header_six},underline:{prefix:"++",subfix:"++",str:l.d_words.tl_underline},strikethrough:{prefix:"~~",subfix:"~~",str:l.d_words.tl_strikethrough},mark:{prefix:"==",subfix:"==",str:l.d_words.tl_mark},superscript:{prefix:"^",subfix:"^",str:l.d_words.tl_superscript},subscript:{prefix:"~",subfix:"~",str:l.d_words.tl_subscript},quote:{prefix:"> ",subfix:"",str:l.d_words.tl_quote},link:{prefix:"[](",subfix:")",str:l.d_words.tl_link},imagelink:{prefix:"![](",subfix:")",str:l.d_words.tl_image},table:{prefix:"",subfix:"",str:`|column1|column2|column3|
|-|-|-|
|content1|content2|content3|
`},aligncenter:{prefix:`::: hljs-center

`,subfix:`

:::
`,str:l.d_words.tl_aligncenter},alignright:{prefix:`::: hljs-right

`,subfix:`

:::
`,str:l.d_words.tl_alignright},alignleft:{prefix:`::: hljs-left

`,subfix:`

:::
`,str:l.d_words.tl_alignleft}};p.hasOwnProperty(o)&&l.insertText(l.getTextareaDom(),p[o]);var _={undo:t,redo:r,trash:e,save:i,ol:n,ul:a,removeLine:u,code:c};_.hasOwnProperty(o)&&_[o](l)}},function(d,h,s){function t(c){c.s_html_code=!c.s_html_code,c.htmlcode&&c.htmlcode(c.s_html_code,c.d_value)}function r(c){c.s_help=!c.s_help,c.helptoggle&&c.helptoggle(c.s_help,c.d_value)}function e(c){var o=c.$refs.vReadModel;o.requestFullscreen?o.requestFullscreen():o.mozRequestFullScreen?o.mozRequestFullScreen():o.webkitRequestFullscreen?o.webkitRequestFullscreen():o.msRequestFullscreen&&o.msRequestFullscreen()}function i(c){c.s_preview_switch=!c.s_preview_switch,c.previewtoggle&&c.previewtoggle(c.s_preview_switch,c.d_value)}function n(c){c.s_fullScreen=!c.s_fullScreen,c.fullscreen&&c.fullscreen(c.s_fullScreen,c.d_value)}function a(c){c.s_subfield=!c.s_subfield,c.s_preview_switch=c.s_subfield,c.previewtoggle&&c.previewtoggle(c.s_preview_switch,c.d_value),c.subfieldtoggle&&c.subfieldtoggle(c.s_subfield,c.d_value)}function u(c){c.s_navigation=!c.s_navigation,c.s_navigation&&(c.s_preview_switch=!0),c.navigationtoggle&&c.navigationtoggle(c.s_navigation,c.d_value),c.s_navigation&&c.getNavigation(c,!1)}Object.defineProperty(h,"__esModule",{value:!0}),h.toolbar_right_click=function(c,o){var l={help:r,html:t,read:e,preview:i,fullscreen:n,navigation:u,subfield:a};l.hasOwnProperty(c)&&l[c](o)}},function(d,h,s){function t(a,u){for(var c in u){var o=(0,n.default)(u[c]);!a[c]||o!=="Object"&&o!=="object"?a[c]=u[c]:a[c]=t(a[c],u[c])}return a}function r(){var a=window.location.search,u={},c=/[?&][^?&]+=[^?&]+/g,o=a.match(c);return o&&o.forEach(function(l){var p=l.substring(1).split("="),_=decodeURIComponent(p[0]),f=decodeURIComponent(p[1]);u[_]=f}),u}function e(a){a&&(a.preventDefault&&a.preventDefault(),a.stopPropagation&&a.stopPropagation())}Object.defineProperty(h,"__esModule",{value:!0});var i=s(18),n=function(a){return a&&a.__esModule?a:{default:a}}(i);h.p_ObjectCopy_DEEP=t,h.p_urlParse=r,h.stopEvent=e},function(d,h,s){d.exports={default:s(80),__esModule:!0}},function(d,h,s){d.exports={default:s(81),__esModule:!0}},function(d,h,s){s(103),s(101),s(104),s(105),d.exports=s(10).Symbol},function(d,h,s){s(102),s(106),d.exports=s(30).f("iterator")},function(d,h){d.exports=function(s){if(typeof s!="function")throw TypeError(s+" is not a function!");return s}},function(d,h){d.exports=function(){}},function(d,h,s){var t=s(6),r=s(99),e=s(98);d.exports=function(i){return function(n,a,u){var c,o=t(n),l=r(o.length),p=e(u,l);if(i&&a!=a){for(;l>p;)if((c=o[p++])!=c)return!0}else for(;l>p;p++)if((i||p in o)&&o[p]===a)return i||p||0;return!i&&-1}}},function(d,h,s){var t=s(82);d.exports=function(r,e,i){if(t(r),e===void 0)return r;switch(i){case 1:return function(n){return r.call(e,n)};case 2:return function(n,a){return r.call(e,n,a)};case 3:return function(n,a,u){return r.call(e,n,a,u)}}return function(){return r.apply(e,arguments)}}},function(d,h,s){var t=s(22),r=s(46),e=s(23);d.exports=function(i){var n=t(i),a=r.f;if(a)for(var u,c=a(i),o=e.f,l=0;c.length>l;)o.call(i,u=c[l++])&&n.push(u);return n}},function(d,h,s){var t=s(1).document;d.exports=t&&t.documentElement},function(d,h,s){var t=s(39);d.exports=Object("z").propertyIsEnumerable(0)?Object:function(r){return t(r)=="String"?r.split(""):Object(r)}},function(d,h,s){var t=s(39);d.exports=Array.isArray||function(r){return t(r)=="Array"}},function(d,h,s){var t=s(44),r=s(13),e=s(24),i={};s(4)(i,s(7)("iterator"),function(){return this}),d.exports=function(n,a,u){n.prototype=t(i,{next:r(1,u)}),e(n,a+" Iterator")}},function(d,h){d.exports=function(s,t){return{value:t,done:!!s}}},function(d,h,s){var t=s(14)("meta"),r=s(8),e=s(2),i=s(5).f,n=0,a=Object.isExtensible||function(){return!0},u=!s(11)(function(){return a(Object.preventExtensions({}))}),c=function(f){i(f,t,{value:{i:"O"+ ++n,w:{}}})},o=function(f,b){if(!r(f))return typeof f=="symbol"?f:(typeof f=="string"?"S":"P")+f;if(!e(f,t)){if(!a(f))return"F";if(!b)return"E";c(f)}return f[t].i},l=function(f,b){if(!e(f,t)){if(!a(f))return!0;if(!b)return!1;c(f)}return f[t].w},p=function(f){return u&&_.NEED&&a(f)&&!e(f,t)&&c(f),f},_=d.exports={KEY:t,NEED:!1,fastKey:o,getWeak:l,onFreeze:p}},function(d,h,s){var t=s(5),r=s(9),e=s(22);d.exports=s(3)?Object.defineProperties:function(i,n){r(i);for(var a,u=e(n),c=u.length,o=0;c>o;)t.f(i,a=u[o++],n[a]);return i}},function(d,h,s){var t=s(23),r=s(13),e=s(6),i=s(28),n=s(2),a=s(42),u=Object.getOwnPropertyDescriptor;h.f=s(3)?u:function(c,o){if(c=e(c),o=i(o,!0),a)try{return u(c,o)}catch{}if(n(c,o))return r(!t.f.call(c,o),c[o])}},function(d,h,s){var t=s(6),r=s(45).f,e={}.toString,i=typeof window=="object"&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],n=function(a){try{return r(a)}catch{return i.slice()}};d.exports.f=function(a){return i&&e.call(a)=="[object Window]"?n(a):r(t(a))}},function(d,h,s){var t=s(2),r=s(49),e=s(25)("IE_PROTO"),i=Object.prototype;d.exports=Object.getPrototypeOf||function(n){return n=r(n),t(n,e)?n[e]:typeof n.constructor=="function"&&n instanceof n.constructor?n.constructor.prototype:n instanceof Object?i:null}},function(d,h,s){var t=s(27),r=s(19);d.exports=function(e){return function(i,n){var a,u,c=String(r(i)),o=t(n),l=c.length;return o<0||o>=l?e?"":void 0:(a=c.charCodeAt(o),a<55296||a>56319||o+1===l||(u=c.charCodeAt(o+1))<56320||u>57343?e?c.charAt(o):a:e?c.slice(o,o+2):u-56320+(a-55296<<10)+65536)}}},function(d,h,s){var t=s(27),r=Math.max,e=Math.min;d.exports=function(i,n){return i=t(i),i<0?r(i+n,0):e(i,n)}},function(d,h,s){var t=s(27),r=Math.min;d.exports=function(e){return e>0?r(t(e),9007199254740991):0}},function(d,h,s){var t=s(83),r=s(91),e=s(21),i=s(6);d.exports=s(43)(Array,"Array",function(n,a){this._t=i(n),this._i=0,this._k=a},function(){var n=this._t,a=this._k,u=this._i++;return!n||u>=n.length?(this._t=void 0,r(1)):a=="keys"?r(0,u):a=="values"?r(0,n[u]):r(0,[u,n[u]])},"values"),e.Arguments=e.Array,t("keys"),t("values"),t("entries")},function(d,h){},function(d,h,s){var t=s(97)(!0);s(43)(String,"String",function(r){this._t=String(r),this._i=0},function(){var r,e=this._t,i=this._i;return i>=e.length?{value:void 0,done:!0}:(r=t(e,i),this._i+=r.length,{value:r,done:!1})})},function(d,h,s){var t=s(1),r=s(2),e=s(3),i=s(41),n=s(48),a=s(92).KEY,u=s(11),c=s(26),o=s(24),l=s(14),p=s(7),_=s(30),f=s(29),b=s(86),g=s(89),m=s(9),w=s(8),v=s(49),x=s(6),k=s(28),C=s(13),y=s(44),A=s(95),T=s(94),L=s(46),j=s(5),S=s(22),M=T.f,F=j.f,E=A.f,q=t.Symbol,O=t.JSON,P=O&&O.stringify,D=p("_hidden"),z=p("toPrimitive"),$={}.propertyIsEnumerable,R=c("symbol-registry"),B=c("symbols"),W=c("op-symbols"),H=Object.prototype,G=typeof q=="function"&&!!L.f,V=t.QObject,K=!V||!V.prototype||!V.prototype.findChild,Q=e&&u(function(){return y(F({},"a",{get:function(){return F(this,"a",{value:7}).a}})).a!=7})?function(I,N,U){var X=M(H,N);X&&delete H[N],F(I,N,U),X&&I!==H&&F(H,N,X)}:F,J=function(I){var N=B[I]=y(q.prototype);return N._k=I,N},Y=G&&typeof q.iterator=="symbol"?function(I){return typeof I=="symbol"}:function(I){return I instanceof q},Z=function(I,N,U){return I===H&&Z(W,N,U),m(I),N=k(N,!0),m(U),r(B,N)?(U.enumerable?(r(I,D)&&I[D][N]&&(I[D][N]=!1),U=y(U,{enumerable:C(0,!1)})):(r(I,D)||F(I,D,C(1,{})),I[D][N]=!0),Q(I,N,U)):F(I,N,U)},nt=function(I,N){m(I);for(var U,X=b(N=x(N)),tt=0,ot=X.length;ot>tt;)Z(I,U=X[tt++],N[U]);return I},et=function(I,N){return N===void 0?y(I):nt(y(I),N)},rt=function(I){var N=$.call(this,I=k(I,!0));return!(this===H&&r(B,I)&&!r(W,I))&&(!(N||!r(this,I)||!r(B,I)||r(this,D)&&this[D][I])||N)},at=function(I,N){if(I=x(I),N=k(N,!0),I!==H||!r(B,N)||r(W,N)){var U=M(I,N);return!U||!r(B,N)||r(I,D)&&I[D][N]||(U.enumerable=!0),U}},st=function(I){for(var N,U=E(x(I)),X=[],tt=0;U.length>tt;)r(B,N=U[tt++])||N==D||N==a||X.push(N);return X},lt=function(I){for(var N,U=I===H,X=E(U?W:x(I)),tt=[],ot=0;X.length>ot;)!r(B,N=X[ot++])||U&&!r(H,N)||tt.push(B[N]);return tt};G||(q=function(){if(this instanceof q)throw TypeError("Symbol is not a constructor!");var I=l(arguments.length>0?arguments[0]:void 0),N=function(U){this===H&&N.call(W,U),r(this,D)&&r(this[D],I)&&(this[D][I]=!1),Q(this,I,C(1,U))};return e&&K&&Q(H,I,{configurable:!0,set:N}),J(I)},n(q.prototype,"toString",function(){return this._k}),T.f=at,j.f=Z,s(45).f=A.f=st,s(23).f=rt,L.f=lt,e&&!s(12)&&n(H,"propertyIsEnumerable",rt,!0),_.f=function(I){return J(p(I))}),i(i.G+i.W+i.F*!G,{Symbol:q});for(var ct="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ut=0;ct.length>ut;)p(ct[ut++]);for(var pt=S(p.store),dt=0;pt.length>dt;)f(pt[dt++]);i(i.S+i.F*!G,"Symbol",{for:function(I){return r(R,I+="")?R[I]:R[I]=q(I)},keyFor:function(I){if(!Y(I))throw TypeError(I+" is not a symbol!");for(var N in R)if(R[N]===I)return N},useSetter:function(){K=!0},useSimple:function(){K=!1}}),i(i.S+i.F*!G,"Object",{create:et,defineProperty:Z,defineProperties:nt,getOwnPropertyDescriptor:at,getOwnPropertyNames:st,getOwnPropertySymbols:lt});var ht=u(function(){L.f(1)});i(i.S+i.F*ht,"Object",{getOwnPropertySymbols:function(I){return L.f(v(I))}}),O&&i(i.S+i.F*(!G||u(function(){var I=q();return P([I])!="[null]"||P({a:I})!="{}"||P(Object(I))!="{}"})),"JSON",{stringify:function(I){for(var N,U,X=[I],tt=1;arguments.length>tt;)X.push(arguments[tt++]);if(U=N=X[1],(w(N)||I!==void 0)&&!Y(I))return g(N)||(N=function(ot,it){if(typeof U=="function"&&(it=U.call(this,ot,it)),!Y(it))return it}),X[1]=N,P.apply(O,X)}}),q.prototype[z]||s(4)(q.prototype,z,q.prototype.valueOf),o(q,"Symbol"),o(Math,"Math",!0),o(t.JSON,"JSON",!0)},function(d,h,s){s(29)("asyncIterator")},function(d,h,s){s(29)("observable")},function(d,h,s){s(100);for(var t=s(1),r=s(4),e=s(21),i=s(7)("toStringTag"),n="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),a=0;a<n.length;a++){var u=n[a],c=t[u],o=c&&c.prototype;o&&!o[i]&&r(o,i,u),e[u]=e.Array}},function(d,h,s){h=d.exports=s(15)(!1),h.push([d.i,`
.auto-textarea-wrapper {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  line-height: normal;
}
.auto-textarea-wrapper .auto-textarea-block {
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word !important;
  visibility: hidden;
  overflow: hidden;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 100%;
}
.auto-textarea-wrapper .auto-textarea-input {
  font-family: Menlo, "Ubuntu Mono", Consolas, "Courier New", "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  overflow-y: hidden;
  color: #2c3e50;
}
.auto-textarea-wrapper .auto-textarea-input.no-border {
  outline: 0 none;
  border: none !important;
}
.auto-textarea-wrapper .auto-textarea-input.no-resize {
  resize: none;
}
`,""])},function(d,h,s){h=d.exports=s(15)(!1),h.push([d.i,`
.op-icon.dropdown-wrapper.dropdown[data-v-548e2160] {
  position: relative;
}
.op-icon.dropdown-wrapper.dropdown[type=button][data-v-548e2160] {
  -webkit-appearance: unset;
}
.op-icon.dropdown-wrapper.dropdown .popup-dropdown[data-v-548e2160] {
  position: absolute;
  display: block;
  background: #fff;
  top: 32px;
  left: -45px;
  min-width: 130px;
  z-index: 1600;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}
.op-icon.dropdown-wrapper.dropdown .popup-dropdown .dropdown-item[data-v-548e2160]:first-child {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.op-icon.dropdown-wrapper.dropdown .popup-dropdown .dropdown-item[data-v-548e2160]:last-child {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.op-icon.dropdown-wrapper.dropdown .popup-dropdown.op-header[data-v-548e2160] {
  left: -30px;
  min-width: 90px;
}
.op-icon.dropdown-wrapper.dropdown .popup-dropdown.fade-enter-active[data-v-548e2160],
.op-icon.dropdown-wrapper.dropdown .popup-dropdown.fade-leave-active[data-v-548e2160] {
  opacity: 1;
}
.op-icon.dropdown-wrapper.dropdown .popup-dropdown.fade-enter[data-v-548e2160],
.op-icon.dropdown-wrapper.dropdown .popup-dropdown.fade-leave-active[data-v-548e2160] {
  opacity: 0;
}
.op-icon.dropdown-wrapper.dropdown .popup-dropdown.transition[data-v-548e2160],
.op-icon.dropdown-wrapper.dropdown .popup-dropdown.transition .dropdown-item[data-v-548e2160] {
  -webkit-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-item[data-v-548e2160] {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #606266;
  position: relative;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-item[data-v-548e2160]:hover {
  color: #303133;
  background-color: #e9e9eb;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-item input[data-v-548e2160] {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-images[data-v-548e2160] {
  box-sizing: border-box;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-images button[data-v-548e2160] {
  position: absolute;
  top: -1px;
  right: 5px;
  font-size: 14px;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-images button[data-v-548e2160]:hover {
  color: #f56c6c;
  background-color: transparent;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-images span[data-v-548e2160] {
  display: inline-block;
  width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-images:hover .image-show[data-v-548e2160] {
  display: block !important;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-images .image-show[data-v-548e2160] {
  display: none;
  position: absolute;
  left: -128px;
  top: 0;
  width: 120px;
  height: 90px;
  object-fit: contain;
  border: 1px solid #f2f6fc;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-images .image-show.transition[data-v-548e2160] {
  -webkit-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-images.transition[data-v-548e2160] {
  -webkit-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
}
.add-image-link-wrapper[data-v-548e2160] {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  z-index: 1600;
  -webkit-transition: all 0.1s linear 0s;
  transition: all 0.1s linear 0s;
}
.add-image-link-wrapper.fade-enter-active[data-v-548e2160],
.add-image-link-wrapper.fade-leave-active[data-v-548e2160] {
  opacity: 1;
}
.add-image-link-wrapper.fade-enter[data-v-548e2160],
.add-image-link-wrapper.fade-leave-active[data-v-548e2160] {
  opacity: 0;
}
.add-image-link-wrapper .add-image-link[data-v-548e2160] {
  position: fixed;
  box-sizing: border-box;
  text-align: center;
  width: 24%;
  left: 38%;
  height: auto;
  padding: 40px;
  top: 25%;
  -webkit-transition: all 0.1s linear 0s;
  transition: all 0.1s linear 0s;
  z-index: 3;
  background: #fff;
  border-radius: 2px;
}
@media only screen and (max-width: 1500px) {
.add-image-link-wrapper .add-image-link[data-v-548e2160] {
    width: 34%;
    left: 33%;
}
}
@media only screen and (max-width: 1000px) {
.add-image-link-wrapper .add-image-link[data-v-548e2160] {
    width: 50%;
    left: 25%;
}
}
@media only screen and (max-width: 600px) {
.add-image-link-wrapper .add-image-link[data-v-548e2160] {
    width: 80%;
    left: 10%;
}
}
.add-image-link-wrapper .add-image-link i[data-v-548e2160] {
  font-size: 24px;
  position: absolute;
  right: 8px;
  top: 6px;
  color: rgba(0,0,0,0.7);
  cursor: pointer;
}
.add-image-link-wrapper .add-image-link .title[data-v-548e2160] {
  font-size: 20px;
  margin-bottom: 30px;
  margin-top: 10px;
  font-weight: 500 !important;
}
.add-image-link-wrapper .add-image-link .input-wrapper[data-v-548e2160] {
  margin-top: 10px;
  width: 80%;
  border: 1px solid #eeece8;
  text-align: left;
  margin-left: 10%;
  height: 35px;
}
.add-image-link-wrapper .add-image-link .input-wrapper input[data-v-548e2160] {
  height: 32px;
  line-height: 32px;
  font-size: 15px;
  width: 90%;
  margin-left: 8px;
  border: none;
  outline: none;
}
.add-image-link-wrapper .add-image-link .op-btn[data-v-548e2160] {
  width: 100px;
  height: 35px;
  display: inline-block;
  margin-top: 30px;
  cursor: pointer;
  text-align: center;
  line-height: 35px;
  opacity: 0.9;
  border-radius: 2px;
  letter-spacing: 1px;
  font-size: 15px;
}
.add-image-link-wrapper .add-image-link .op-btn.sure[data-v-548e2160] {
  background: #2185d0;
  color: #fff;
  margin-left: 5%;
}
.add-image-link-wrapper .add-image-link .op-btn.sure[data-v-548e2160]:hover {
  opacity: 1;
}
.add-image-link-wrapper .add-image-link .op-btn.cancel[data-v-548e2160] {
  border: 1px solid #bcbcbc;
  color: #bcbcbc;
}
.add-image-link-wrapper .add-image-link .op-btn.cancel[data-v-548e2160]:hover {
  color: #000;
}
`,""])},function(d,h,s){h=d.exports=s(15)(!1),h.push([d.i,`
textarea:disabled {
  background-color: #fff;
}
.v-note-wrapper {
  position: relative;
  min-width: 300px;
  min-height: 300px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  background-color: #fff;
  z-index: 1500;
  text-align: left;
  border: 1px solid #f2f6fc;
  border-radius: 4px;
}
.v-note-wrapper.fullscreen {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: 0;
  height: auto;
  z-index: 1501;
}
.v-note-wrapper .v-note-op {
  padding: 1px;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  white-space: pre-line;
  -webkit-box-flex: 0;
  -webkit-flex: none;
      -ms-flex: none;
          flex: none;
  min-height: 40px;
  -webkit-user-select: none;
      -ms-user-select: none;
          user-select: none;
  border-bottom: 1px solid #f2f6fc;
  border-radius: 4px 4px 0 0;
  background-color: #fff;
  z-index: 1;
}
.v-note-wrapper .v-note-op .v-left-item,
.v-note-wrapper .v-note-op .v-right-item {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
      -ms-flex: 1;
          flex: 1;
  min-height: 40px;
  box-sizing: border-box;
}
.v-note-wrapper .v-note-op .v-left-item .op-icon-divider,
.v-note-wrapper .v-note-op .v-right-item .op-icon-divider {
  height: 40px;
  border-left: 1px solid #e5e5e5;
  margin: 0 6px 0 4px;
}
.v-note-wrapper .v-note-op .v-left-item .op-icon,
.v-note-wrapper .v-note-op .v-right-item .op-icon {
  box-sizing: border-box;
  display: inline-block;
  cursor: pointer;
  height: 28px;
  width: 28px;
  margin: 6px 0 5px 0px;
  font-size: 14px;
  padding: 4.5px 6px 5px 3.5px;
  color: #757575;
  border-radius: 5px;
  text-align: center;
  background: none;
  border: none;
  outline: none;
  line-height: 1;
}
.v-note-wrapper .v-note-op .v-left-item .op-icon.dropdown-wrapper,
.v-note-wrapper .v-note-op .v-right-item .op-icon.dropdown-wrapper {
  line-height: 18px;
}
.v-note-wrapper .v-note-op .v-left-item .op-icon.selected,
.v-note-wrapper .v-note-op .v-right-item .op-icon.selected {
  color: rgba(0,0,0,0.8);
  background: #eaeaea;
}
.v-note-wrapper .v-note-op .v-left-item .op-icon:hover,
.v-note-wrapper .v-note-op .v-right-item .op-icon:hover {
  color: rgba(0,0,0,0.8);
  background: #e9e9eb;
}
.v-note-wrapper .v-note-op .v-left-item.transition .op-icon,
.v-note-wrapper .v-note-op .v-right-item.transition .op-icon {
  -webkit-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
}
.v-note-wrapper .v-note-op .v-right-item {
  text-align: right;
  padding-right: 6px;
  max-width: 30%;
}
.v-note-wrapper .v-note-op .v-left-item {
  text-align: left;
  padding-left: 6px;
}
.v-note-wrapper .v-note-panel {
  position: relative;
  border-top: none;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
      -ms-flex: 1;
          flex: 1;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 50%;
      -ms-flex: 0 0 50%;
          flex: 0 0 50%;
  width: 50%;
  padding: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
  cursor: text;
  border-bottom-left-radius: 4px;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar {
  width: 6px;
  background-color: #e5e5e5;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar-thumb {
  background-color: #b7b7b7;
  border-radius: 4px;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar-thumb:hover {
  background-color: #a1a1a1;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar-thumb:active {
  background-color: #a1a1a1;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar-track {
  -webkit-box-shadow: 0 0 0px #808080 inset;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style-border-radius::-webkit-scrollbar {
  border-bottom-right-radius: 4px;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.transition {
  -webkit-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.single-edit {
  width: 100%;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 100%;
      -ms-flex: 0 0 100%;
          flex: 0 0 100%;
  overflow-y: auto;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.single-show {
  width: 0;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 0;
      -ms-flex: 0 0 0px;
          flex: 0 0 0;
  display: none;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper .content-div {
  width: 100%;
  padding: 20px 25px;
  box-sizing: border-box;
  outline: 0 none;
  border: none !important;
  color: #2c3e50;
  font-size: 16px;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper .content-input-wrapper {
  width: 100%;
  padding: 8px 25px 15px 25px;
}
.v-note-wrapper .v-note-panel .v-note-show {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 50%;
      -ms-flex: 0 0 50%;
          flex: 0 0 50%;
  width: 50%;
  overflow-y: auto;
  padding: 0 0;
  -webkit-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
}
.v-note-wrapper .v-note-panel .v-note-show.single-show {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 100%;
      -ms-flex: 0 0 100%;
          flex: 0 0 100%;
  width: 100%;
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  width: 100%;
  height: 100%;
  padding: 8px 25px 15px 25px;
  overflow-y: auto;
  box-sizing: border-box;
  overflow-x: hidden;
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar {
  width: 6px;
  background-color: #e5e5e5;
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar-thumb,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar-thumb {
  background-color: #b7b7b7;
  border-radius: 4px;
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar-thumb:hover,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar-thumb:hover {
  background-color: #a1a1a1;
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar-thumb:active,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar-thumb:active {
  background-color: #a1a1a1;
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar-track,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar-track {
  -webkit-box-shadow: 0 0 0px #808080 inset;
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style-border-radius::-webkit-scrollbar,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style-border-radius::-webkit-scrollbar {
  border-bottom-right-radius: 4px;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  position: absolute;
  width: 250px;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  background-color: rgba(255,255,255,0.98);
  border-left: 1px solid #f2f6fc;
  border-right: 1px solid #f2f6fc;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.transition {
  -webkit-transition: all 0.1s linear 0s;
  transition: all 0.1s linear 0s;
}
@media only screen and (max-width: 768px) {
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper {
    width: 50%;
}
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.slideTop-enter-active,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.slideTop-leave-active {
  height: 100%;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.slideTop-enter,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.slideTop-leave-active {
  height: 0;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-title {
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #f2f6fc;
  -webkit-box-flex: 0;
  -webkit-flex: none;
      -ms-flex: none;
          flex: none;
  line-height: 50px;
  font-size: 16px;
  box-sizing: border-box;
  padding: 0 12px 0 18px;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-title .v-note-navigation-close {
  float: right;
  color: #606266;
  font-size: 18px;
  cursor: pointer;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-title .v-note-navigation-close:hover {
  color: #303133;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content {
  overflow-y: auto;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
      -ms-flex: 1;
          flex: 1;
  padding: 8px 0;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar {
  width: 6px;
  background-color: #e5e5e5;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar-thumb {
  background-color: #b7b7b7;
  border-radius: 4px;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar-thumb:hover {
  background-color: #a1a1a1;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar-thumb:active {
  background-color: #a1a1a1;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar-track {
  -webkit-box-shadow: 0 0 0px #808080 inset;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style-border-radius::-webkit-scrollbar {
  border-bottom-right-radius: 4px;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h1,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h2,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h3,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h4,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h5,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h6 {
  margin: 2px 0;
  font-weight: 500;
  font-size: 17px;
  color: #2185d0;
  cursor: pointer;
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 12px;
  border-bottom: none;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h1:hover,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h2:hover,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h3:hover,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h4:hover,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h5:hover,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h6:hover {
  color: #483d8b;
  -webkit-text-decoration-line: underline;
          text-decoration-line: underline;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h2 {
  padding-left: 27px;
  font-size: 17px;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h3 {
  padding-left: 42px;
  font-size: 17px;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h4 {
  padding-left: 58px;
  font-size: 15px;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h5 {
  padding-left: 72px;
  font-size: 15px;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h6 {
  padding-left: 87px;
  font-size: 15px;
}
.v-note-wrapper .v-note-read-model {
  position: relative;
  display: none;
  width: 100%;
  height: 100%;
  background: #fbfbfb;
  padding: 30px 8% 50px 8%;
  overflow-y: auto;
  box-sizing: border-box;
}
.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar {
  width: 6px;
  background-color: #e5e5e5;
}
.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar-thumb {
  background-color: #b7b7b7;
  border-radius: 4px;
}
.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar-thumb:hover {
  background-color: #a1a1a1;
}
.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar-thumb:active {
  background-color: #a1a1a1;
}
.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar-track {
  -webkit-box-shadow: 0 0 0px #808080 inset;
}
.v-note-wrapper .v-note-read-model.scroll-style-border-radius::-webkit-scrollbar {
  border-bottom-right-radius: 4px;
}
.v-note-wrapper .v-note-read-model.show {
  display: block;
}
.v-note-wrapper.shadow {
  border: none;
}
.v-note-help-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  z-index: 1600;
  -webkit-transition: all 0.1s linear 0s;
  transition: all 0.1s linear 0s;
}
.v-note-help-wrapper.fade-enter-active,
.v-note-help-wrapper.fade-leave-active {
  opacity: 1;
}
.v-note-help-wrapper.fade-enter,
.v-note-help-wrapper.fade-leave-active {
  opacity: 0;
}
.v-note-help-wrapper .v-note-help-content {
  position: relative;
  width: 60%;
  max-width: 800px;
  margin: 30px auto;
  height: 90%;
  min-width: 320px;
  -webkit-transition: all 0.1s linear 0s;
  transition: all 0.1s linear 0s;
  z-index: 3;
  border: 1px solid #f2f6fc;
}
.v-note-help-wrapper .v-note-help-content.shadow {
  border: none;
  box-shadow: 0 0px 5px rgba(0,0,0,0.157), 0 0px 5px rgba(0,0,0,0.227);
}
.v-note-help-wrapper .v-note-help-content i {
  font-size: 28px;
  position: absolute;
  right: 15px;
  top: 8px;
  color: rgba(0,0,0,0.7);
  cursor: pointer;
}
.v-note-help-wrapper .v-note-help-content i:hover {
  color: #000;
}
.v-note-help-wrapper .v-note-help-content .v-note-help-show {
  width: 100%;
  height: 100%;
  font-size: 18px;
  background: #fbfbfb;
  overflow-y: auto;
  padding: 2% 6%;
}
.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar {
  width: 6px;
  background-color: #e5e5e5;
}
.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar-thumb {
  background-color: #b7b7b7;
  border-radius: 4px;
}
.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar-thumb:hover {
  background-color: #a1a1a1;
}
.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar-thumb:active {
  background-color: #a1a1a1;
}
.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar-track {
  -webkit-box-shadow: 0 0 0px #808080 inset;
}
.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style-border-radius::-webkit-scrollbar {
  border-bottom-right-radius: 4px;
}
.v-note-img-wrapper {
  position: fixed;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  z-index: 1600;
  -webkit-transition: all 0.1s linear 0s;
  transition: all 0.1s linear 0s;
}
.v-note-img-wrapper.fade-enter-active,
.v-note-img-wrapper.fade-leave-active {
  opacity: 1;
}
.v-note-img-wrapper.fade-enter,
.v-note-img-wrapper.fade-leave-active {
  opacity: 0;
}
.v-note-img-wrapper img {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
      -ms-flex: 0 0 auto;
          flex: 0 0 auto;
  z-index: 3;
}
.v-note-img-wrapper i {
  font-size: 28px;
  position: absolute;
  right: 15px;
  top: 8px;
  color: rgba(255,255,255,0.7);
  cursor: pointer;
}
.v-note-img-wrapper i:hover {
  color: #fff;
}
`,""])},function(d,h,s){h=d.exports=s(15)(!1),h.push([d.i,`
.auto-textarea-wrapper[data-v-7a63e4b3] {
    height: 100%;
}
`,""])},function(d,h,s){function t(a){return a==null}function r(a){var u={};for(var c in a)u[c]=a[c];return u}function e(a){a=r(a||{}),a.whiteList=a.whiteList||i.whiteList,a.onAttr=a.onAttr||i.onAttr,a.onIgnoreAttr=a.onIgnoreAttr||i.onIgnoreAttr,a.safeAttrValue=a.safeAttrValue||i.safeAttrValue,this.options=a}var i=s(50),n=s(112);s(51),e.prototype.process=function(a){if(a=a||"",!(a=a.toString()))return"";var u=this,c=u.options,o=c.whiteList,l=c.onAttr,p=c.onIgnoreAttr,_=c.safeAttrValue;return n(a,function(f,b,g,m,w){var v=o[g],x=!1;if(v===!0?x=v:typeof v=="function"?x=v(m):v instanceof RegExp&&(x=v.test(m)),x!==!0&&(x=!1),m=_(g,m)){var k={position:b,sourcePosition:f,source:w,isWhite:x};if(x){var C=l(g,m,k);return t(C)?g+":"+m:C}var C=p(g,m,k);return t(C)?void 0:C}})},d.exports=e},function(d,h,s){function t(e,i){function n(){if(!u){var f=r.trim(e.slice(c,o)),b=f.indexOf(":");if(b!==-1){var g=r.trim(f.slice(0,b)),m=r.trim(f.slice(b+1));if(g){var w=i(c,l.length,g,m,f);w&&(l+=w+"; ")}}}c=o+1}e=r.trimRight(e),e[e.length-1]!==";"&&(e+=";");for(var a=e.length,u=!1,c=0,o=0,l="";o<a;o++){var p=e[o];if(p==="/"&&e[o+1]==="*"){var _=e.indexOf("*/",o+2);if(_===-1)break;o=_+1,c=o+1,u=!1}else p==="("?u=!0:p===")"?u=!1:p===";"?u||n():p===`
`&&n()}return r.trim(l)}var r=s(51);d.exports=t},function(d,h){d.exports={Aacute:"\xC1",aacute:"\xE1",Abreve:"\u0102",abreve:"\u0103",ac:"\u223E",acd:"\u223F",acE:"\u223E\u0333",Acirc:"\xC2",acirc:"\xE2",acute:"\xB4",Acy:"\u0410",acy:"\u0430",AElig:"\xC6",aelig:"\xE6",af:"\u2061",Afr:"\u{1D504}",afr:"\u{1D51E}",Agrave:"\xC0",agrave:"\xE0",alefsym:"\u2135",aleph:"\u2135",Alpha:"\u0391",alpha:"\u03B1",Amacr:"\u0100",amacr:"\u0101",amalg:"\u2A3F",amp:"&",AMP:"&",andand:"\u2A55",And:"\u2A53",and:"\u2227",andd:"\u2A5C",andslope:"\u2A58",andv:"\u2A5A",ang:"\u2220",ange:"\u29A4",angle:"\u2220",angmsdaa:"\u29A8",angmsdab:"\u29A9",angmsdac:"\u29AA",angmsdad:"\u29AB",angmsdae:"\u29AC",angmsdaf:"\u29AD",angmsdag:"\u29AE",angmsdah:"\u29AF",angmsd:"\u2221",angrt:"\u221F",angrtvb:"\u22BE",angrtvbd:"\u299D",angsph:"\u2222",angst:"\xC5",angzarr:"\u237C",Aogon:"\u0104",aogon:"\u0105",Aopf:"\u{1D538}",aopf:"\u{1D552}",apacir:"\u2A6F",ap:"\u2248",apE:"\u2A70",ape:"\u224A",apid:"\u224B",apos:"'",ApplyFunction:"\u2061",approx:"\u2248",approxeq:"\u224A",Aring:"\xC5",aring:"\xE5",Ascr:"\u{1D49C}",ascr:"\u{1D4B6}",Assign:"\u2254",ast:"*",asymp:"\u2248",asympeq:"\u224D",Atilde:"\xC3",atilde:"\xE3",Auml:"\xC4",auml:"\xE4",awconint:"\u2233",awint:"\u2A11",backcong:"\u224C",backepsilon:"\u03F6",backprime:"\u2035",backsim:"\u223D",backsimeq:"\u22CD",Backslash:"\u2216",Barv:"\u2AE7",barvee:"\u22BD",barwed:"\u2305",Barwed:"\u2306",barwedge:"\u2305",bbrk:"\u23B5",bbrktbrk:"\u23B6",bcong:"\u224C",Bcy:"\u0411",bcy:"\u0431",bdquo:"\u201E",becaus:"\u2235",because:"\u2235",Because:"\u2235",bemptyv:"\u29B0",bepsi:"\u03F6",bernou:"\u212C",Bernoullis:"\u212C",Beta:"\u0392",beta:"\u03B2",beth:"\u2136",between:"\u226C",Bfr:"\u{1D505}",bfr:"\u{1D51F}",bigcap:"\u22C2",bigcirc:"\u25EF",bigcup:"\u22C3",bigodot:"\u2A00",bigoplus:"\u2A01",bigotimes:"\u2A02",bigsqcup:"\u2A06",bigstar:"\u2605",bigtriangledown:"\u25BD",bigtriangleup:"\u25B3",biguplus:"\u2A04",bigvee:"\u22C1",bigwedge:"\u22C0",bkarow:"\u290D",blacklozenge:"\u29EB",blacksquare:"\u25AA",blacktriangle:"\u25B4",blacktriangledown:"\u25BE",blacktriangleleft:"\u25C2",blacktriangleright:"\u25B8",blank:"\u2423",blk12:"\u2592",blk14:"\u2591",blk34:"\u2593",block:"\u2588",bne:"=\u20E5",bnequiv:"\u2261\u20E5",bNot:"\u2AED",bnot:"\u2310",Bopf:"\u{1D539}",bopf:"\u{1D553}",bot:"\u22A5",bottom:"\u22A5",bowtie:"\u22C8",boxbox:"\u29C9",boxdl:"\u2510",boxdL:"\u2555",boxDl:"\u2556",boxDL:"\u2557",boxdr:"\u250C",boxdR:"\u2552",boxDr:"\u2553",boxDR:"\u2554",boxh:"\u2500",boxH:"\u2550",boxhd:"\u252C",boxHd:"\u2564",boxhD:"\u2565",boxHD:"\u2566",boxhu:"\u2534",boxHu:"\u2567",boxhU:"\u2568",boxHU:"\u2569",boxminus:"\u229F",boxplus:"\u229E",boxtimes:"\u22A0",boxul:"\u2518",boxuL:"\u255B",boxUl:"\u255C",boxUL:"\u255D",boxur:"\u2514",boxuR:"\u2558",boxUr:"\u2559",boxUR:"\u255A",boxv:"\u2502",boxV:"\u2551",boxvh:"\u253C",boxvH:"\u256A",boxVh:"\u256B",boxVH:"\u256C",boxvl:"\u2524",boxvL:"\u2561",boxVl:"\u2562",boxVL:"\u2563",boxvr:"\u251C",boxvR:"\u255E",boxVr:"\u255F",boxVR:"\u2560",bprime:"\u2035",breve:"\u02D8",Breve:"\u02D8",brvbar:"\xA6",bscr:"\u{1D4B7}",Bscr:"\u212C",bsemi:"\u204F",bsim:"\u223D",bsime:"\u22CD",bsolb:"\u29C5",bsol:"\\",bsolhsub:"\u27C8",bull:"\u2022",bullet:"\u2022",bump:"\u224E",bumpE:"\u2AAE",bumpe:"\u224F",Bumpeq:"\u224E",bumpeq:"\u224F",Cacute:"\u0106",cacute:"\u0107",capand:"\u2A44",capbrcup:"\u2A49",capcap:"\u2A4B",cap:"\u2229",Cap:"\u22D2",capcup:"\u2A47",capdot:"\u2A40",CapitalDifferentialD:"\u2145",caps:"\u2229\uFE00",caret:"\u2041",caron:"\u02C7",Cayleys:"\u212D",ccaps:"\u2A4D",Ccaron:"\u010C",ccaron:"\u010D",Ccedil:"\xC7",ccedil:"\xE7",Ccirc:"\u0108",ccirc:"\u0109",Cconint:"\u2230",ccups:"\u2A4C",ccupssm:"\u2A50",Cdot:"\u010A",cdot:"\u010B",cedil:"\xB8",Cedilla:"\xB8",cemptyv:"\u29B2",cent:"\xA2",centerdot:"\xB7",CenterDot:"\xB7",cfr:"\u{1D520}",Cfr:"\u212D",CHcy:"\u0427",chcy:"\u0447",check:"\u2713",checkmark:"\u2713",Chi:"\u03A7",chi:"\u03C7",circ:"\u02C6",circeq:"\u2257",circlearrowleft:"\u21BA",circlearrowright:"\u21BB",circledast:"\u229B",circledcirc:"\u229A",circleddash:"\u229D",CircleDot:"\u2299",circledR:"\xAE",circledS:"\u24C8",CircleMinus:"\u2296",CirclePlus:"\u2295",CircleTimes:"\u2297",cir:"\u25CB",cirE:"\u29C3",cire:"\u2257",cirfnint:"\u2A10",cirmid:"\u2AEF",cirscir:"\u29C2",ClockwiseContourIntegral:"\u2232",CloseCurlyDoubleQuote:"\u201D",CloseCurlyQuote:"\u2019",clubs:"\u2663",clubsuit:"\u2663",colon:":",Colon:"\u2237",Colone:"\u2A74",colone:"\u2254",coloneq:"\u2254",comma:",",commat:"@",comp:"\u2201",compfn:"\u2218",complement:"\u2201",complexes:"\u2102",cong:"\u2245",congdot:"\u2A6D",Congruent:"\u2261",conint:"\u222E",Conint:"\u222F",ContourIntegral:"\u222E",copf:"\u{1D554}",Copf:"\u2102",coprod:"\u2210",Coproduct:"\u2210",copy:"\xA9",COPY:"\xA9",copysr:"\u2117",CounterClockwiseContourIntegral:"\u2233",crarr:"\u21B5",cross:"\u2717",Cross:"\u2A2F",Cscr:"\u{1D49E}",cscr:"\u{1D4B8}",csub:"\u2ACF",csube:"\u2AD1",csup:"\u2AD0",csupe:"\u2AD2",ctdot:"\u22EF",cudarrl:"\u2938",cudarrr:"\u2935",cuepr:"\u22DE",cuesc:"\u22DF",cularr:"\u21B6",cularrp:"\u293D",cupbrcap:"\u2A48",cupcap:"\u2A46",CupCap:"\u224D",cup:"\u222A",Cup:"\u22D3",cupcup:"\u2A4A",cupdot:"\u228D",cupor:"\u2A45",cups:"\u222A\uFE00",curarr:"\u21B7",curarrm:"\u293C",curlyeqprec:"\u22DE",curlyeqsucc:"\u22DF",curlyvee:"\u22CE",curlywedge:"\u22CF",curren:"\xA4",curvearrowleft:"\u21B6",curvearrowright:"\u21B7",cuvee:"\u22CE",cuwed:"\u22CF",cwconint:"\u2232",cwint:"\u2231",cylcty:"\u232D",dagger:"\u2020",Dagger:"\u2021",daleth:"\u2138",darr:"\u2193",Darr:"\u21A1",dArr:"\u21D3",dash:"\u2010",Dashv:"\u2AE4",dashv:"\u22A3",dbkarow:"\u290F",dblac:"\u02DD",Dcaron:"\u010E",dcaron:"\u010F",Dcy:"\u0414",dcy:"\u0434",ddagger:"\u2021",ddarr:"\u21CA",DD:"\u2145",dd:"\u2146",DDotrahd:"\u2911",ddotseq:"\u2A77",deg:"\xB0",Del:"\u2207",Delta:"\u0394",delta:"\u03B4",demptyv:"\u29B1",dfisht:"\u297F",Dfr:"\u{1D507}",dfr:"\u{1D521}",dHar:"\u2965",dharl:"\u21C3",dharr:"\u21C2",DiacriticalAcute:"\xB4",DiacriticalDot:"\u02D9",DiacriticalDoubleAcute:"\u02DD",DiacriticalGrave:"`",DiacriticalTilde:"\u02DC",diam:"\u22C4",diamond:"\u22C4",Diamond:"\u22C4",diamondsuit:"\u2666",diams:"\u2666",die:"\xA8",DifferentialD:"\u2146",digamma:"\u03DD",disin:"\u22F2",div:"\xF7",divide:"\xF7",divideontimes:"\u22C7",divonx:"\u22C7",DJcy:"\u0402",djcy:"\u0452",dlcorn:"\u231E",dlcrop:"\u230D",dollar:"$",Dopf:"\u{1D53B}",dopf:"\u{1D555}",Dot:"\xA8",dot:"\u02D9",DotDot:"\u20DC",doteq:"\u2250",doteqdot:"\u2251",DotEqual:"\u2250",dotminus:"\u2238",dotplus:"\u2214",dotsquare:"\u22A1",doublebarwedge:"\u2306",DoubleContourIntegral:"\u222F",DoubleDot:"\xA8",DoubleDownArrow:"\u21D3",DoubleLeftArrow:"\u21D0",DoubleLeftRightArrow:"\u21D4",DoubleLeftTee:"\u2AE4",DoubleLongLeftArrow:"\u27F8",DoubleLongLeftRightArrow:"\u27FA",DoubleLongRightArrow:"\u27F9",DoubleRightArrow:"\u21D2",DoubleRightTee:"\u22A8",DoubleUpArrow:"\u21D1",DoubleUpDownArrow:"\u21D5",DoubleVerticalBar:"\u2225",DownArrowBar:"\u2913",downarrow:"\u2193",DownArrow:"\u2193",Downarrow:"\u21D3",DownArrowUpArrow:"\u21F5",DownBreve:"\u0311",downdownarrows:"\u21CA",downharpoonleft:"\u21C3",downharpoonright:"\u21C2",DownLeftRightVector:"\u2950",DownLeftTeeVector:"\u295E",DownLeftVectorBar:"\u2956",DownLeftVector:"\u21BD",DownRightTeeVector:"\u295F",DownRightVectorBar:"\u2957",DownRightVector:"\u21C1",DownTeeArrow:"\u21A7",DownTee:"\u22A4",drbkarow:"\u2910",drcorn:"\u231F",drcrop:"\u230C",Dscr:"\u{1D49F}",dscr:"\u{1D4B9}",DScy:"\u0405",dscy:"\u0455",dsol:"\u29F6",Dstrok:"\u0110",dstrok:"\u0111",dtdot:"\u22F1",dtri:"\u25BF",dtrif:"\u25BE",duarr:"\u21F5",duhar:"\u296F",dwangle:"\u29A6",DZcy:"\u040F",dzcy:"\u045F",dzigrarr:"\u27FF",Eacute:"\xC9",eacute:"\xE9",easter:"\u2A6E",Ecaron:"\u011A",ecaron:"\u011B",Ecirc:"\xCA",ecirc:"\xEA",ecir:"\u2256",ecolon:"\u2255",Ecy:"\u042D",ecy:"\u044D",eDDot:"\u2A77",Edot:"\u0116",edot:"\u0117",eDot:"\u2251",ee:"\u2147",efDot:"\u2252",Efr:"\u{1D508}",efr:"\u{1D522}",eg:"\u2A9A",Egrave:"\xC8",egrave:"\xE8",egs:"\u2A96",egsdot:"\u2A98",el:"\u2A99",Element:"\u2208",elinters:"\u23E7",ell:"\u2113",els:"\u2A95",elsdot:"\u2A97",Emacr:"\u0112",emacr:"\u0113",empty:"\u2205",emptyset:"\u2205",EmptySmallSquare:"\u25FB",emptyv:"\u2205",EmptyVerySmallSquare:"\u25AB",emsp13:"\u2004",emsp14:"\u2005",emsp:"\u2003",ENG:"\u014A",eng:"\u014B",ensp:"\u2002",Eogon:"\u0118",eogon:"\u0119",Eopf:"\u{1D53C}",eopf:"\u{1D556}",epar:"\u22D5",eparsl:"\u29E3",eplus:"\u2A71",epsi:"\u03B5",Epsilon:"\u0395",epsilon:"\u03B5",epsiv:"\u03F5",eqcirc:"\u2256",eqcolon:"\u2255",eqsim:"\u2242",eqslantgtr:"\u2A96",eqslantless:"\u2A95",Equal:"\u2A75",equals:"=",EqualTilde:"\u2242",equest:"\u225F",Equilibrium:"\u21CC",equiv:"\u2261",equivDD:"\u2A78",eqvparsl:"\u29E5",erarr:"\u2971",erDot:"\u2253",escr:"\u212F",Escr:"\u2130",esdot:"\u2250",Esim:"\u2A73",esim:"\u2242",Eta:"\u0397",eta:"\u03B7",ETH:"\xD0",eth:"\xF0",Euml:"\xCB",euml:"\xEB",euro:"\u20AC",excl:"!",exist:"\u2203",Exists:"\u2203",expectation:"\u2130",exponentiale:"\u2147",ExponentialE:"\u2147",fallingdotseq:"\u2252",Fcy:"\u0424",fcy:"\u0444",female:"\u2640",ffilig:"\uFB03",fflig:"\uFB00",ffllig:"\uFB04",Ffr:"\u{1D509}",ffr:"\u{1D523}",filig:"\uFB01",FilledSmallSquare:"\u25FC",FilledVerySmallSquare:"\u25AA",fjlig:"fj",flat:"\u266D",fllig:"\uFB02",fltns:"\u25B1",fnof:"\u0192",Fopf:"\u{1D53D}",fopf:"\u{1D557}",forall:"\u2200",ForAll:"\u2200",fork:"\u22D4",forkv:"\u2AD9",Fouriertrf:"\u2131",fpartint:"\u2A0D",frac12:"\xBD",frac13:"\u2153",frac14:"\xBC",frac15:"\u2155",frac16:"\u2159",frac18:"\u215B",frac23:"\u2154",frac25:"\u2156",frac34:"\xBE",frac35:"\u2157",frac38:"\u215C",frac45:"\u2158",frac56:"\u215A",frac58:"\u215D",frac78:"\u215E",frasl:"\u2044",frown:"\u2322",fscr:"\u{1D4BB}",Fscr:"\u2131",gacute:"\u01F5",Gamma:"\u0393",gamma:"\u03B3",Gammad:"\u03DC",gammad:"\u03DD",gap:"\u2A86",Gbreve:"\u011E",gbreve:"\u011F",Gcedil:"\u0122",Gcirc:"\u011C",gcirc:"\u011D",Gcy:"\u0413",gcy:"\u0433",Gdot:"\u0120",gdot:"\u0121",ge:"\u2265",gE:"\u2267",gEl:"\u2A8C",gel:"\u22DB",geq:"\u2265",geqq:"\u2267",geqslant:"\u2A7E",gescc:"\u2AA9",ges:"\u2A7E",gesdot:"\u2A80",gesdoto:"\u2A82",gesdotol:"\u2A84",gesl:"\u22DB\uFE00",gesles:"\u2A94",Gfr:"\u{1D50A}",gfr:"\u{1D524}",gg:"\u226B",Gg:"\u22D9",ggg:"\u22D9",gimel:"\u2137",GJcy:"\u0403",gjcy:"\u0453",gla:"\u2AA5",gl:"\u2277",glE:"\u2A92",glj:"\u2AA4",gnap:"\u2A8A",gnapprox:"\u2A8A",gne:"\u2A88",gnE:"\u2269",gneq:"\u2A88",gneqq:"\u2269",gnsim:"\u22E7",Gopf:"\u{1D53E}",gopf:"\u{1D558}",grave:"`",GreaterEqual:"\u2265",GreaterEqualLess:"\u22DB",GreaterFullEqual:"\u2267",GreaterGreater:"\u2AA2",GreaterLess:"\u2277",GreaterSlantEqual:"\u2A7E",GreaterTilde:"\u2273",Gscr:"\u{1D4A2}",gscr:"\u210A",gsim:"\u2273",gsime:"\u2A8E",gsiml:"\u2A90",gtcc:"\u2AA7",gtcir:"\u2A7A",gt:">",GT:">",Gt:"\u226B",gtdot:"\u22D7",gtlPar:"\u2995",gtquest:"\u2A7C",gtrapprox:"\u2A86",gtrarr:"\u2978",gtrdot:"\u22D7",gtreqless:"\u22DB",gtreqqless:"\u2A8C",gtrless:"\u2277",gtrsim:"\u2273",gvertneqq:"\u2269\uFE00",gvnE:"\u2269\uFE00",Hacek:"\u02C7",hairsp:"\u200A",half:"\xBD",hamilt:"\u210B",HARDcy:"\u042A",hardcy:"\u044A",harrcir:"\u2948",harr:"\u2194",hArr:"\u21D4",harrw:"\u21AD",Hat:"^",hbar:"\u210F",Hcirc:"\u0124",hcirc:"\u0125",hearts:"\u2665",heartsuit:"\u2665",hellip:"\u2026",hercon:"\u22B9",hfr:"\u{1D525}",Hfr:"\u210C",HilbertSpace:"\u210B",hksearow:"\u2925",hkswarow:"\u2926",hoarr:"\u21FF",homtht:"\u223B",hookleftarrow:"\u21A9",hookrightarrow:"\u21AA",hopf:"\u{1D559}",Hopf:"\u210D",horbar:"\u2015",HorizontalLine:"\u2500",hscr:"\u{1D4BD}",Hscr:"\u210B",hslash:"\u210F",Hstrok:"\u0126",hstrok:"\u0127",HumpDownHump:"\u224E",HumpEqual:"\u224F",hybull:"\u2043",hyphen:"\u2010",Iacute:"\xCD",iacute:"\xED",ic:"\u2063",Icirc:"\xCE",icirc:"\xEE",Icy:"\u0418",icy:"\u0438",Idot:"\u0130",IEcy:"\u0415",iecy:"\u0435",iexcl:"\xA1",iff:"\u21D4",ifr:"\u{1D526}",Ifr:"\u2111",Igrave:"\xCC",igrave:"\xEC",ii:"\u2148",iiiint:"\u2A0C",iiint:"\u222D",iinfin:"\u29DC",iiota:"\u2129",IJlig:"\u0132",ijlig:"\u0133",Imacr:"\u012A",imacr:"\u012B",image:"\u2111",ImaginaryI:"\u2148",imagline:"\u2110",imagpart:"\u2111",imath:"\u0131",Im:"\u2111",imof:"\u22B7",imped:"\u01B5",Implies:"\u21D2",incare:"\u2105",in:"\u2208",infin:"\u221E",infintie:"\u29DD",inodot:"\u0131",intcal:"\u22BA",int:"\u222B",Int:"\u222C",integers:"\u2124",Integral:"\u222B",intercal:"\u22BA",Intersection:"\u22C2",intlarhk:"\u2A17",intprod:"\u2A3C",InvisibleComma:"\u2063",InvisibleTimes:"\u2062",IOcy:"\u0401",iocy:"\u0451",Iogon:"\u012E",iogon:"\u012F",Iopf:"\u{1D540}",iopf:"\u{1D55A}",Iota:"\u0399",iota:"\u03B9",iprod:"\u2A3C",iquest:"\xBF",iscr:"\u{1D4BE}",Iscr:"\u2110",isin:"\u2208",isindot:"\u22F5",isinE:"\u22F9",isins:"\u22F4",isinsv:"\u22F3",isinv:"\u2208",it:"\u2062",Itilde:"\u0128",itilde:"\u0129",Iukcy:"\u0406",iukcy:"\u0456",Iuml:"\xCF",iuml:"\xEF",Jcirc:"\u0134",jcirc:"\u0135",Jcy:"\u0419",jcy:"\u0439",Jfr:"\u{1D50D}",jfr:"\u{1D527}",jmath:"\u0237",Jopf:"\u{1D541}",jopf:"\u{1D55B}",Jscr:"\u{1D4A5}",jscr:"\u{1D4BF}",Jsercy:"\u0408",jsercy:"\u0458",Jukcy:"\u0404",jukcy:"\u0454",Kappa:"\u039A",kappa:"\u03BA",kappav:"\u03F0",Kcedil:"\u0136",kcedil:"\u0137",Kcy:"\u041A",kcy:"\u043A",Kfr:"\u{1D50E}",kfr:"\u{1D528}",kgreen:"\u0138",KHcy:"\u0425",khcy:"\u0445",KJcy:"\u040C",kjcy:"\u045C",Kopf:"\u{1D542}",kopf:"\u{1D55C}",Kscr:"\u{1D4A6}",kscr:"\u{1D4C0}",lAarr:"\u21DA",Lacute:"\u0139",lacute:"\u013A",laemptyv:"\u29B4",lagran:"\u2112",Lambda:"\u039B",lambda:"\u03BB",lang:"\u27E8",Lang:"\u27EA",langd:"\u2991",langle:"\u27E8",lap:"\u2A85",Laplacetrf:"\u2112",laquo:"\xAB",larrb:"\u21E4",larrbfs:"\u291F",larr:"\u2190",Larr:"\u219E",lArr:"\u21D0",larrfs:"\u291D",larrhk:"\u21A9",larrlp:"\u21AB",larrpl:"\u2939",larrsim:"\u2973",larrtl:"\u21A2",latail:"\u2919",lAtail:"\u291B",lat:"\u2AAB",late:"\u2AAD",lates:"\u2AAD\uFE00",lbarr:"\u290C",lBarr:"\u290E",lbbrk:"\u2772",lbrace:"{",lbrack:"[",lbrke:"\u298B",lbrksld:"\u298F",lbrkslu:"\u298D",Lcaron:"\u013D",lcaron:"\u013E",Lcedil:"\u013B",lcedil:"\u013C",lceil:"\u2308",lcub:"{",Lcy:"\u041B",lcy:"\u043B",ldca:"\u2936",ldquo:"\u201C",ldquor:"\u201E",ldrdhar:"\u2967",ldrushar:"\u294B",ldsh:"\u21B2",le:"\u2264",lE:"\u2266",LeftAngleBracket:"\u27E8",LeftArrowBar:"\u21E4",leftarrow:"\u2190",LeftArrow:"\u2190",Leftarrow:"\u21D0",LeftArrowRightArrow:"\u21C6",leftarrowtail:"\u21A2",LeftCeiling:"\u2308",LeftDoubleBracket:"\u27E6",LeftDownTeeVector:"\u2961",LeftDownVectorBar:"\u2959",LeftDownVector:"\u21C3",LeftFloor:"\u230A",leftharpoondown:"\u21BD",leftharpoonup:"\u21BC",leftleftarrows:"\u21C7",leftrightarrow:"\u2194",LeftRightArrow:"\u2194",Leftrightarrow:"\u21D4",leftrightarrows:"\u21C6",leftrightharpoons:"\u21CB",leftrightsquigarrow:"\u21AD",LeftRightVector:"\u294E",LeftTeeArrow:"\u21A4",LeftTee:"\u22A3",LeftTeeVector:"\u295A",leftthreetimes:"\u22CB",LeftTriangleBar:"\u29CF",LeftTriangle:"\u22B2",LeftTriangleEqual:"\u22B4",LeftUpDownVector:"\u2951",LeftUpTeeVector:"\u2960",LeftUpVectorBar:"\u2958",LeftUpVector:"\u21BF",LeftVectorBar:"\u2952",LeftVector:"\u21BC",lEg:"\u2A8B",leg:"\u22DA",leq:"\u2264",leqq:"\u2266",leqslant:"\u2A7D",lescc:"\u2AA8",les:"\u2A7D",lesdot:"\u2A7F",lesdoto:"\u2A81",lesdotor:"\u2A83",lesg:"\u22DA\uFE00",lesges:"\u2A93",lessapprox:"\u2A85",lessdot:"\u22D6",lesseqgtr:"\u22DA",lesseqqgtr:"\u2A8B",LessEqualGreater:"\u22DA",LessFullEqual:"\u2266",LessGreater:"\u2276",lessgtr:"\u2276",LessLess:"\u2AA1",lesssim:"\u2272",LessSlantEqual:"\u2A7D",LessTilde:"\u2272",lfisht:"\u297C",lfloor:"\u230A",Lfr:"\u{1D50F}",lfr:"\u{1D529}",lg:"\u2276",lgE:"\u2A91",lHar:"\u2962",lhard:"\u21BD",lharu:"\u21BC",lharul:"\u296A",lhblk:"\u2584",LJcy:"\u0409",ljcy:"\u0459",llarr:"\u21C7",ll:"\u226A",Ll:"\u22D8",llcorner:"\u231E",Lleftarrow:"\u21DA",llhard:"\u296B",lltri:"\u25FA",Lmidot:"\u013F",lmidot:"\u0140",lmoustache:"\u23B0",lmoust:"\u23B0",lnap:"\u2A89",lnapprox:"\u2A89",lne:"\u2A87",lnE:"\u2268",lneq:"\u2A87",lneqq:"\u2268",lnsim:"\u22E6",loang:"\u27EC",loarr:"\u21FD",lobrk:"\u27E6",longleftarrow:"\u27F5",LongLeftArrow:"\u27F5",Longleftarrow:"\u27F8",longleftrightarrow:"\u27F7",LongLeftRightArrow:"\u27F7",Longleftrightarrow:"\u27FA",longmapsto:"\u27FC",longrightarrow:"\u27F6",LongRightArrow:"\u27F6",Longrightarrow:"\u27F9",looparrowleft:"\u21AB",looparrowright:"\u21AC",lopar:"\u2985",Lopf:"\u{1D543}",lopf:"\u{1D55D}",loplus:"\u2A2D",lotimes:"\u2A34",lowast:"\u2217",lowbar:"_",LowerLeftArrow:"\u2199",LowerRightArrow:"\u2198",loz:"\u25CA",lozenge:"\u25CA",lozf:"\u29EB",lpar:"(",lparlt:"\u2993",lrarr:"\u21C6",lrcorner:"\u231F",lrhar:"\u21CB",lrhard:"\u296D",lrm:"\u200E",lrtri:"\u22BF",lsaquo:"\u2039",lscr:"\u{1D4C1}",Lscr:"\u2112",lsh:"\u21B0",Lsh:"\u21B0",lsim:"\u2272",lsime:"\u2A8D",lsimg:"\u2A8F",lsqb:"[",lsquo:"\u2018",lsquor:"\u201A",Lstrok:"\u0141",lstrok:"\u0142",ltcc:"\u2AA6",ltcir:"\u2A79",lt:"<",LT:"<",Lt:"\u226A",ltdot:"\u22D6",lthree:"\u22CB",ltimes:"\u22C9",ltlarr:"\u2976",ltquest:"\u2A7B",ltri:"\u25C3",ltrie:"\u22B4",ltrif:"\u25C2",ltrPar:"\u2996",lurdshar:"\u294A",luruhar:"\u2966",lvertneqq:"\u2268\uFE00",lvnE:"\u2268\uFE00",macr:"\xAF",male:"\u2642",malt:"\u2720",maltese:"\u2720",Map:"\u2905",map:"\u21A6",mapsto:"\u21A6",mapstodown:"\u21A7",mapstoleft:"\u21A4",mapstoup:"\u21A5",marker:"\u25AE",mcomma:"\u2A29",Mcy:"\u041C",mcy:"\u043C",mdash:"\u2014",mDDot:"\u223A",measuredangle:"\u2221",MediumSpace:"\u205F",Mellintrf:"\u2133",Mfr:"\u{1D510}",mfr:"\u{1D52A}",mho:"\u2127",micro:"\xB5",midast:"*",midcir:"\u2AF0",mid:"\u2223",middot:"\xB7",minusb:"\u229F",minus:"\u2212",minusd:"\u2238",minusdu:"\u2A2A",MinusPlus:"\u2213",mlcp:"\u2ADB",mldr:"\u2026",mnplus:"\u2213",models:"\u22A7",Mopf:"\u{1D544}",mopf:"\u{1D55E}",mp:"\u2213",mscr:"\u{1D4C2}",Mscr:"\u2133",mstpos:"\u223E",Mu:"\u039C",mu:"\u03BC",multimap:"\u22B8",mumap:"\u22B8",nabla:"\u2207",Nacute:"\u0143",nacute:"\u0144",nang:"\u2220\u20D2",nap:"\u2249",napE:"\u2A70\u0338",napid:"\u224B\u0338",napos:"\u0149",napprox:"\u2249",natural:"\u266E",naturals:"\u2115",natur:"\u266E",nbsp:"\xA0",nbump:"\u224E\u0338",nbumpe:"\u224F\u0338",ncap:"\u2A43",Ncaron:"\u0147",ncaron:"\u0148",Ncedil:"\u0145",ncedil:"\u0146",ncong:"\u2247",ncongdot:"\u2A6D\u0338",ncup:"\u2A42",Ncy:"\u041D",ncy:"\u043D",ndash:"\u2013",nearhk:"\u2924",nearr:"\u2197",neArr:"\u21D7",nearrow:"\u2197",ne:"\u2260",nedot:"\u2250\u0338",NegativeMediumSpace:"\u200B",NegativeThickSpace:"\u200B",NegativeThinSpace:"\u200B",NegativeVeryThinSpace:"\u200B",nequiv:"\u2262",nesear:"\u2928",nesim:"\u2242\u0338",NestedGreaterGreater:"\u226B",NestedLessLess:"\u226A",NewLine:`
`,nexist:"\u2204",nexists:"\u2204",Nfr:"\u{1D511}",nfr:"\u{1D52B}",ngE:"\u2267\u0338",nge:"\u2271",ngeq:"\u2271",ngeqq:"\u2267\u0338",ngeqslant:"\u2A7E\u0338",nges:"\u2A7E\u0338",nGg:"\u22D9\u0338",ngsim:"\u2275",nGt:"\u226B\u20D2",ngt:"\u226F",ngtr:"\u226F",nGtv:"\u226B\u0338",nharr:"\u21AE",nhArr:"\u21CE",nhpar:"\u2AF2",ni:"\u220B",nis:"\u22FC",nisd:"\u22FA",niv:"\u220B",NJcy:"\u040A",njcy:"\u045A",nlarr:"\u219A",nlArr:"\u21CD",nldr:"\u2025",nlE:"\u2266\u0338",nle:"\u2270",nleftarrow:"\u219A",nLeftarrow:"\u21CD",nleftrightarrow:"\u21AE",nLeftrightarrow:"\u21CE",nleq:"\u2270",nleqq:"\u2266\u0338",nleqslant:"\u2A7D\u0338",nles:"\u2A7D\u0338",nless:"\u226E",nLl:"\u22D8\u0338",nlsim:"\u2274",nLt:"\u226A\u20D2",nlt:"\u226E",nltri:"\u22EA",nltrie:"\u22EC",nLtv:"\u226A\u0338",nmid:"\u2224",NoBreak:"\u2060",NonBreakingSpace:"\xA0",nopf:"\u{1D55F}",Nopf:"\u2115",Not:"\u2AEC",not:"\xAC",NotCongruent:"\u2262",NotCupCap:"\u226D",NotDoubleVerticalBar:"\u2226",NotElement:"\u2209",NotEqual:"\u2260",NotEqualTilde:"\u2242\u0338",NotExists:"\u2204",NotGreater:"\u226F",NotGreaterEqual:"\u2271",NotGreaterFullEqual:"\u2267\u0338",NotGreaterGreater:"\u226B\u0338",NotGreaterLess:"\u2279",NotGreaterSlantEqual:"\u2A7E\u0338",NotGreaterTilde:"\u2275",NotHumpDownHump:"\u224E\u0338",NotHumpEqual:"\u224F\u0338",notin:"\u2209",notindot:"\u22F5\u0338",notinE:"\u22F9\u0338",notinva:"\u2209",notinvb:"\u22F7",notinvc:"\u22F6",NotLeftTriangleBar:"\u29CF\u0338",NotLeftTriangle:"\u22EA",NotLeftTriangleEqual:"\u22EC",NotLess:"\u226E",NotLessEqual:"\u2270",NotLessGreater:"\u2278",NotLessLess:"\u226A\u0338",NotLessSlantEqual:"\u2A7D\u0338",NotLessTilde:"\u2274",NotNestedGreaterGreater:"\u2AA2\u0338",NotNestedLessLess:"\u2AA1\u0338",notni:"\u220C",notniva:"\u220C",notnivb:"\u22FE",notnivc:"\u22FD",NotPrecedes:"\u2280",NotPrecedesEqual:"\u2AAF\u0338",NotPrecedesSlantEqual:"\u22E0",NotReverseElement:"\u220C",NotRightTriangleBar:"\u29D0\u0338",NotRightTriangle:"\u22EB",NotRightTriangleEqual:"\u22ED",NotSquareSubset:"\u228F\u0338",NotSquareSubsetEqual:"\u22E2",NotSquareSuperset:"\u2290\u0338",NotSquareSupersetEqual:"\u22E3",NotSubset:"\u2282\u20D2",NotSubsetEqual:"\u2288",NotSucceeds:"\u2281",NotSucceedsEqual:"\u2AB0\u0338",NotSucceedsSlantEqual:"\u22E1",NotSucceedsTilde:"\u227F\u0338",NotSuperset:"\u2283\u20D2",NotSupersetEqual:"\u2289",NotTilde:"\u2241",NotTildeEqual:"\u2244",NotTildeFullEqual:"\u2247",NotTildeTilde:"\u2249",NotVerticalBar:"\u2224",nparallel:"\u2226",npar:"\u2226",nparsl:"\u2AFD\u20E5",npart:"\u2202\u0338",npolint:"\u2A14",npr:"\u2280",nprcue:"\u22E0",nprec:"\u2280",npreceq:"\u2AAF\u0338",npre:"\u2AAF\u0338",nrarrc:"\u2933\u0338",nrarr:"\u219B",nrArr:"\u21CF",nrarrw:"\u219D\u0338",nrightarrow:"\u219B",nRightarrow:"\u21CF",nrtri:"\u22EB",nrtrie:"\u22ED",nsc:"\u2281",nsccue:"\u22E1",nsce:"\u2AB0\u0338",Nscr:"\u{1D4A9}",nscr:"\u{1D4C3}",nshortmid:"\u2224",nshortparallel:"\u2226",nsim:"\u2241",nsime:"\u2244",nsimeq:"\u2244",nsmid:"\u2224",nspar:"\u2226",nsqsube:"\u22E2",nsqsupe:"\u22E3",nsub:"\u2284",nsubE:"\u2AC5\u0338",nsube:"\u2288",nsubset:"\u2282\u20D2",nsubseteq:"\u2288",nsubseteqq:"\u2AC5\u0338",nsucc:"\u2281",nsucceq:"\u2AB0\u0338",nsup:"\u2285",nsupE:"\u2AC6\u0338",nsupe:"\u2289",nsupset:"\u2283\u20D2",nsupseteq:"\u2289",nsupseteqq:"\u2AC6\u0338",ntgl:"\u2279",Ntilde:"\xD1",ntilde:"\xF1",ntlg:"\u2278",ntriangleleft:"\u22EA",ntrianglelefteq:"\u22EC",ntriangleright:"\u22EB",ntrianglerighteq:"\u22ED",Nu:"\u039D",nu:"\u03BD",num:"#",numero:"\u2116",numsp:"\u2007",nvap:"\u224D\u20D2",nvdash:"\u22AC",nvDash:"\u22AD",nVdash:"\u22AE",nVDash:"\u22AF",nvge:"\u2265\u20D2",nvgt:">\u20D2",nvHarr:"\u2904",nvinfin:"\u29DE",nvlArr:"\u2902",nvle:"\u2264\u20D2",nvlt:"<\u20D2",nvltrie:"\u22B4\u20D2",nvrArr:"\u2903",nvrtrie:"\u22B5\u20D2",nvsim:"\u223C\u20D2",nwarhk:"\u2923",nwarr:"\u2196",nwArr:"\u21D6",nwarrow:"\u2196",nwnear:"\u2927",Oacute:"\xD3",oacute:"\xF3",oast:"\u229B",Ocirc:"\xD4",ocirc:"\xF4",ocir:"\u229A",Ocy:"\u041E",ocy:"\u043E",odash:"\u229D",Odblac:"\u0150",odblac:"\u0151",odiv:"\u2A38",odot:"\u2299",odsold:"\u29BC",OElig:"\u0152",oelig:"\u0153",ofcir:"\u29BF",Ofr:"\u{1D512}",ofr:"\u{1D52C}",ogon:"\u02DB",Ograve:"\xD2",ograve:"\xF2",ogt:"\u29C1",ohbar:"\u29B5",ohm:"\u03A9",oint:"\u222E",olarr:"\u21BA",olcir:"\u29BE",olcross:"\u29BB",oline:"\u203E",olt:"\u29C0",Omacr:"\u014C",omacr:"\u014D",Omega:"\u03A9",omega:"\u03C9",Omicron:"\u039F",omicron:"\u03BF",omid:"\u29B6",ominus:"\u2296",Oopf:"\u{1D546}",oopf:"\u{1D560}",opar:"\u29B7",OpenCurlyDoubleQuote:"\u201C",OpenCurlyQuote:"\u2018",operp:"\u29B9",oplus:"\u2295",orarr:"\u21BB",Or:"\u2A54",or:"\u2228",ord:"\u2A5D",order:"\u2134",orderof:"\u2134",ordf:"\xAA",ordm:"\xBA",origof:"\u22B6",oror:"\u2A56",orslope:"\u2A57",orv:"\u2A5B",oS:"\u24C8",Oscr:"\u{1D4AA}",oscr:"\u2134",Oslash:"\xD8",oslash:"\xF8",osol:"\u2298",Otilde:"\xD5",otilde:"\xF5",otimesas:"\u2A36",Otimes:"\u2A37",otimes:"\u2297",Ouml:"\xD6",ouml:"\xF6",ovbar:"\u233D",OverBar:"\u203E",OverBrace:"\u23DE",OverBracket:"\u23B4",OverParenthesis:"\u23DC",para:"\xB6",parallel:"\u2225",par:"\u2225",parsim:"\u2AF3",parsl:"\u2AFD",part:"\u2202",PartialD:"\u2202",Pcy:"\u041F",pcy:"\u043F",percnt:"%",period:".",permil:"\u2030",perp:"\u22A5",pertenk:"\u2031",Pfr:"\u{1D513}",pfr:"\u{1D52D}",Phi:"\u03A6",phi:"\u03C6",phiv:"\u03D5",phmmat:"\u2133",phone:"\u260E",Pi:"\u03A0",pi:"\u03C0",pitchfork:"\u22D4",piv:"\u03D6",planck:"\u210F",planckh:"\u210E",plankv:"\u210F",plusacir:"\u2A23",plusb:"\u229E",pluscir:"\u2A22",plus:"+",plusdo:"\u2214",plusdu:"\u2A25",pluse:"\u2A72",PlusMinus:"\xB1",plusmn:"\xB1",plussim:"\u2A26",plustwo:"\u2A27",pm:"\xB1",Poincareplane:"\u210C",pointint:"\u2A15",popf:"\u{1D561}",Popf:"\u2119",pound:"\xA3",prap:"\u2AB7",Pr:"\u2ABB",pr:"\u227A",prcue:"\u227C",precapprox:"\u2AB7",prec:"\u227A",preccurlyeq:"\u227C",Precedes:"\u227A",PrecedesEqual:"\u2AAF",PrecedesSlantEqual:"\u227C",PrecedesTilde:"\u227E",preceq:"\u2AAF",precnapprox:"\u2AB9",precneqq:"\u2AB5",precnsim:"\u22E8",pre:"\u2AAF",prE:"\u2AB3",precsim:"\u227E",prime:"\u2032",Prime:"\u2033",primes:"\u2119",prnap:"\u2AB9",prnE:"\u2AB5",prnsim:"\u22E8",prod:"\u220F",Product:"\u220F",profalar:"\u232E",profline:"\u2312",profsurf:"\u2313",prop:"\u221D",Proportional:"\u221D",Proportion:"\u2237",propto:"\u221D",prsim:"\u227E",prurel:"\u22B0",Pscr:"\u{1D4AB}",pscr:"\u{1D4C5}",Psi:"\u03A8",psi:"\u03C8",puncsp:"\u2008",Qfr:"\u{1D514}",qfr:"\u{1D52E}",qint:"\u2A0C",qopf:"\u{1D562}",Qopf:"\u211A",qprime:"\u2057",Qscr:"\u{1D4AC}",qscr:"\u{1D4C6}",quaternions:"\u210D",quatint:"\u2A16",quest:"?",questeq:"\u225F",quot:'"',QUOT:'"',rAarr:"\u21DB",race:"\u223D\u0331",Racute:"\u0154",racute:"\u0155",radic:"\u221A",raemptyv:"\u29B3",rang:"\u27E9",Rang:"\u27EB",rangd:"\u2992",range:"\u29A5",rangle:"\u27E9",raquo:"\xBB",rarrap:"\u2975",rarrb:"\u21E5",rarrbfs:"\u2920",rarrc:"\u2933",rarr:"\u2192",Rarr:"\u21A0",rArr:"\u21D2",rarrfs:"\u291E",rarrhk:"\u21AA",rarrlp:"\u21AC",rarrpl:"\u2945",rarrsim:"\u2974",Rarrtl:"\u2916",rarrtl:"\u21A3",rarrw:"\u219D",ratail:"\u291A",rAtail:"\u291C",ratio:"\u2236",rationals:"\u211A",rbarr:"\u290D",rBarr:"\u290F",RBarr:"\u2910",rbbrk:"\u2773",rbrace:"}",rbrack:"]",rbrke:"\u298C",rbrksld:"\u298E",rbrkslu:"\u2990",Rcaron:"\u0158",rcaron:"\u0159",Rcedil:"\u0156",rcedil:"\u0157",rceil:"\u2309",rcub:"}",Rcy:"\u0420",rcy:"\u0440",rdca:"\u2937",rdldhar:"\u2969",rdquo:"\u201D",rdquor:"\u201D",rdsh:"\u21B3",real:"\u211C",realine:"\u211B",realpart:"\u211C",reals:"\u211D",Re:"\u211C",rect:"\u25AD",reg:"\xAE",REG:"\xAE",ReverseElement:"\u220B",ReverseEquilibrium:"\u21CB",ReverseUpEquilibrium:"\u296F",rfisht:"\u297D",rfloor:"\u230B",rfr:"\u{1D52F}",Rfr:"\u211C",rHar:"\u2964",rhard:"\u21C1",rharu:"\u21C0",rharul:"\u296C",Rho:"\u03A1",rho:"\u03C1",rhov:"\u03F1",RightAngleBracket:"\u27E9",RightArrowBar:"\u21E5",rightarrow:"\u2192",RightArrow:"\u2192",Rightarrow:"\u21D2",RightArrowLeftArrow:"\u21C4",rightarrowtail:"\u21A3",RightCeiling:"\u2309",RightDoubleBracket:"\u27E7",RightDownTeeVector:"\u295D",RightDownVectorBar:"\u2955",RightDownVector:"\u21C2",RightFloor:"\u230B",rightharpoondown:"\u21C1",rightharpoonup:"\u21C0",rightleftarrows:"\u21C4",rightleftharpoons:"\u21CC",rightrightarrows:"\u21C9",rightsquigarrow:"\u219D",RightTeeArrow:"\u21A6",RightTee:"\u22A2",RightTeeVector:"\u295B",rightthreetimes:"\u22CC",RightTriangleBar:"\u29D0",RightTriangle:"\u22B3",RightTriangleEqual:"\u22B5",RightUpDownVector:"\u294F",RightUpTeeVector:"\u295C",RightUpVectorBar:"\u2954",RightUpVector:"\u21BE",RightVectorBar:"\u2953",RightVector:"\u21C0",ring:"\u02DA",risingdotseq:"\u2253",rlarr:"\u21C4",rlhar:"\u21CC",rlm:"\u200F",rmoustache:"\u23B1",rmoust:"\u23B1",rnmid:"\u2AEE",roang:"\u27ED",roarr:"\u21FE",robrk:"\u27E7",ropar:"\u2986",ropf:"\u{1D563}",Ropf:"\u211D",roplus:"\u2A2E",rotimes:"\u2A35",RoundImplies:"\u2970",rpar:")",rpargt:"\u2994",rppolint:"\u2A12",rrarr:"\u21C9",Rrightarrow:"\u21DB",rsaquo:"\u203A",rscr:"\u{1D4C7}",Rscr:"\u211B",rsh:"\u21B1",Rsh:"\u21B1",rsqb:"]",rsquo:"\u2019",rsquor:"\u2019",rthree:"\u22CC",rtimes:"\u22CA",rtri:"\u25B9",rtrie:"\u22B5",rtrif:"\u25B8",rtriltri:"\u29CE",RuleDelayed:"\u29F4",ruluhar:"\u2968",rx:"\u211E",Sacute:"\u015A",sacute:"\u015B",sbquo:"\u201A",scap:"\u2AB8",Scaron:"\u0160",scaron:"\u0161",Sc:"\u2ABC",sc:"\u227B",sccue:"\u227D",sce:"\u2AB0",scE:"\u2AB4",Scedil:"\u015E",scedil:"\u015F",Scirc:"\u015C",scirc:"\u015D",scnap:"\u2ABA",scnE:"\u2AB6",scnsim:"\u22E9",scpolint:"\u2A13",scsim:"\u227F",Scy:"\u0421",scy:"\u0441",sdotb:"\u22A1",sdot:"\u22C5",sdote:"\u2A66",searhk:"\u2925",searr:"\u2198",seArr:"\u21D8",searrow:"\u2198",sect:"\xA7",semi:";",seswar:"\u2929",setminus:"\u2216",setmn:"\u2216",sext:"\u2736",Sfr:"\u{1D516}",sfr:"\u{1D530}",sfrown:"\u2322",sharp:"\u266F",SHCHcy:"\u0429",shchcy:"\u0449",SHcy:"\u0428",shcy:"\u0448",ShortDownArrow:"\u2193",ShortLeftArrow:"\u2190",shortmid:"\u2223",shortparallel:"\u2225",ShortRightArrow:"\u2192",ShortUpArrow:"\u2191",shy:"\xAD",Sigma:"\u03A3",sigma:"\u03C3",sigmaf:"\u03C2",sigmav:"\u03C2",sim:"\u223C",simdot:"\u2A6A",sime:"\u2243",simeq:"\u2243",simg:"\u2A9E",simgE:"\u2AA0",siml:"\u2A9D",simlE:"\u2A9F",simne:"\u2246",simplus:"\u2A24",simrarr:"\u2972",slarr:"\u2190",SmallCircle:"\u2218",smallsetminus:"\u2216",smashp:"\u2A33",smeparsl:"\u29E4",smid:"\u2223",smile:"\u2323",smt:"\u2AAA",smte:"\u2AAC",smtes:"\u2AAC\uFE00",SOFTcy:"\u042C",softcy:"\u044C",solbar:"\u233F",solb:"\u29C4",sol:"/",Sopf:"\u{1D54A}",sopf:"\u{1D564}",spades:"\u2660",spadesuit:"\u2660",spar:"\u2225",sqcap:"\u2293",sqcaps:"\u2293\uFE00",sqcup:"\u2294",sqcups:"\u2294\uFE00",Sqrt:"\u221A",sqsub:"\u228F",sqsube:"\u2291",sqsubset:"\u228F",sqsubseteq:"\u2291",sqsup:"\u2290",sqsupe:"\u2292",sqsupset:"\u2290",sqsupseteq:"\u2292",square:"\u25A1",Square:"\u25A1",SquareIntersection:"\u2293",SquareSubset:"\u228F",SquareSubsetEqual:"\u2291",SquareSuperset:"\u2290",SquareSupersetEqual:"\u2292",SquareUnion:"\u2294",squarf:"\u25AA",squ:"\u25A1",squf:"\u25AA",srarr:"\u2192",Sscr:"\u{1D4AE}",sscr:"\u{1D4C8}",ssetmn:"\u2216",ssmile:"\u2323",sstarf:"\u22C6",Star:"\u22C6",star:"\u2606",starf:"\u2605",straightepsilon:"\u03F5",straightphi:"\u03D5",strns:"\xAF",sub:"\u2282",Sub:"\u22D0",subdot:"\u2ABD",subE:"\u2AC5",sube:"\u2286",subedot:"\u2AC3",submult:"\u2AC1",subnE:"\u2ACB",subne:"\u228A",subplus:"\u2ABF",subrarr:"\u2979",subset:"\u2282",Subset:"\u22D0",subseteq:"\u2286",subseteqq:"\u2AC5",SubsetEqual:"\u2286",subsetneq:"\u228A",subsetneqq:"\u2ACB",subsim:"\u2AC7",subsub:"\u2AD5",subsup:"\u2AD3",succapprox:"\u2AB8",succ:"\u227B",succcurlyeq:"\u227D",Succeeds:"\u227B",SucceedsEqual:"\u2AB0",SucceedsSlantEqual:"\u227D",SucceedsTilde:"\u227F",succeq:"\u2AB0",succnapprox:"\u2ABA",succneqq:"\u2AB6",succnsim:"\u22E9",succsim:"\u227F",SuchThat:"\u220B",sum:"\u2211",Sum:"\u2211",sung:"\u266A",sup1:"\xB9",sup2:"\xB2",sup3:"\xB3",sup:"\u2283",Sup:"\u22D1",supdot:"\u2ABE",supdsub:"\u2AD8",supE:"\u2AC6",supe:"\u2287",supedot:"\u2AC4",Superset:"\u2283",SupersetEqual:"\u2287",suphsol:"\u27C9",suphsub:"\u2AD7",suplarr:"\u297B",supmult:"\u2AC2",supnE:"\u2ACC",supne:"\u228B",supplus:"\u2AC0",supset:"\u2283",Supset:"\u22D1",supseteq:"\u2287",supseteqq:"\u2AC6",supsetneq:"\u228B",supsetneqq:"\u2ACC",supsim:"\u2AC8",supsub:"\u2AD4",supsup:"\u2AD6",swarhk:"\u2926",swarr:"\u2199",swArr:"\u21D9",swarrow:"\u2199",swnwar:"\u292A",szlig:"\xDF",Tab:"	",target:"\u2316",Tau:"\u03A4",tau:"\u03C4",tbrk:"\u23B4",Tcaron:"\u0164",tcaron:"\u0165",Tcedil:"\u0162",tcedil:"\u0163",Tcy:"\u0422",tcy:"\u0442",tdot:"\u20DB",telrec:"\u2315",Tfr:"\u{1D517}",tfr:"\u{1D531}",there4:"\u2234",therefore:"\u2234",Therefore:"\u2234",Theta:"\u0398",theta:"\u03B8",thetasym:"\u03D1",thetav:"\u03D1",thickapprox:"\u2248",thicksim:"\u223C",ThickSpace:"\u205F\u200A",ThinSpace:"\u2009",thinsp:"\u2009",thkap:"\u2248",thksim:"\u223C",THORN:"\xDE",thorn:"\xFE",tilde:"\u02DC",Tilde:"\u223C",TildeEqual:"\u2243",TildeFullEqual:"\u2245",TildeTilde:"\u2248",timesbar:"\u2A31",timesb:"\u22A0",times:"\xD7",timesd:"\u2A30",tint:"\u222D",toea:"\u2928",topbot:"\u2336",topcir:"\u2AF1",top:"\u22A4",Topf:"\u{1D54B}",topf:"\u{1D565}",topfork:"\u2ADA",tosa:"\u2929",tprime:"\u2034",trade:"\u2122",TRADE:"\u2122",triangle:"\u25B5",triangledown:"\u25BF",triangleleft:"\u25C3",trianglelefteq:"\u22B4",triangleq:"\u225C",triangleright:"\u25B9",trianglerighteq:"\u22B5",tridot:"\u25EC",trie:"\u225C",triminus:"\u2A3A",TripleDot:"\u20DB",triplus:"\u2A39",trisb:"\u29CD",tritime:"\u2A3B",trpezium:"\u23E2",Tscr:"\u{1D4AF}",tscr:"\u{1D4C9}",TScy:"\u0426",tscy:"\u0446",TSHcy:"\u040B",tshcy:"\u045B",Tstrok:"\u0166",tstrok:"\u0167",twixt:"\u226C",twoheadleftarrow:"\u219E",twoheadrightarrow:"\u21A0",Uacute:"\xDA",uacute:"\xFA",uarr:"\u2191",Uarr:"\u219F",uArr:"\u21D1",Uarrocir:"\u2949",Ubrcy:"\u040E",ubrcy:"\u045E",Ubreve:"\u016C",ubreve:"\u016D",Ucirc:"\xDB",ucirc:"\xFB",Ucy:"\u0423",ucy:"\u0443",udarr:"\u21C5",Udblac:"\u0170",udblac:"\u0171",udhar:"\u296E",ufisht:"\u297E",Ufr:"\u{1D518}",ufr:"\u{1D532}",Ugrave:"\xD9",ugrave:"\xF9",uHar:"\u2963",uharl:"\u21BF",uharr:"\u21BE",uhblk:"\u2580",ulcorn:"\u231C",ulcorner:"\u231C",ulcrop:"\u230F",ultri:"\u25F8",Umacr:"\u016A",umacr:"\u016B",uml:"\xA8",UnderBar:"_",UnderBrace:"\u23DF",UnderBracket:"\u23B5",UnderParenthesis:"\u23DD",Union:"\u22C3",UnionPlus:"\u228E",Uogon:"\u0172",uogon:"\u0173",Uopf:"\u{1D54C}",uopf:"\u{1D566}",UpArrowBar:"\u2912",uparrow:"\u2191",UpArrow:"\u2191",Uparrow:"\u21D1",UpArrowDownArrow:"\u21C5",updownarrow:"\u2195",UpDownArrow:"\u2195",Updownarrow:"\u21D5",UpEquilibrium:"\u296E",upharpoonleft:"\u21BF",upharpoonright:"\u21BE",uplus:"\u228E",UpperLeftArrow:"\u2196",UpperRightArrow:"\u2197",upsi:"\u03C5",Upsi:"\u03D2",upsih:"\u03D2",Upsilon:"\u03A5",upsilon:"\u03C5",UpTeeArrow:"\u21A5",UpTee:"\u22A5",upuparrows:"\u21C8",urcorn:"\u231D",urcorner:"\u231D",urcrop:"\u230E",Uring:"\u016E",uring:"\u016F",urtri:"\u25F9",Uscr:"\u{1D4B0}",uscr:"\u{1D4CA}",utdot:"\u22F0",Utilde:"\u0168",utilde:"\u0169",utri:"\u25B5",utrif:"\u25B4",uuarr:"\u21C8",Uuml:"\xDC",uuml:"\xFC",uwangle:"\u29A7",vangrt:"\u299C",varepsilon:"\u03F5",varkappa:"\u03F0",varnothing:"\u2205",varphi:"\u03D5",varpi:"\u03D6",varpropto:"\u221D",varr:"\u2195",vArr:"\u21D5",varrho:"\u03F1",varsigma:"\u03C2",varsubsetneq:"\u228A\uFE00",varsubsetneqq:"\u2ACB\uFE00",varsupsetneq:"\u228B\uFE00",varsupsetneqq:"\u2ACC\uFE00",vartheta:"\u03D1",vartriangleleft:"\u22B2",vartriangleright:"\u22B3",vBar:"\u2AE8",Vbar:"\u2AEB",vBarv:"\u2AE9",Vcy:"\u0412",vcy:"\u0432",vdash:"\u22A2",vDash:"\u22A8",Vdash:"\u22A9",VDash:"\u22AB",Vdashl:"\u2AE6",veebar:"\u22BB",vee:"\u2228",Vee:"\u22C1",veeeq:"\u225A",vellip:"\u22EE",verbar:"|",Verbar:"\u2016",vert:"|",Vert:"\u2016",VerticalBar:"\u2223",VerticalLine:"|",VerticalSeparator:"\u2758",VerticalTilde:"\u2240",VeryThinSpace:"\u200A",Vfr:"\u{1D519}",vfr:"\u{1D533}",vltri:"\u22B2",vnsub:"\u2282\u20D2",vnsup:"\u2283\u20D2",Vopf:"\u{1D54D}",vopf:"\u{1D567}",vprop:"\u221D",vrtri:"\u22B3",Vscr:"\u{1D4B1}",vscr:"\u{1D4CB}",vsubnE:"\u2ACB\uFE00",vsubne:"\u228A\uFE00",vsupnE:"\u2ACC\uFE00",vsupne:"\u228B\uFE00",Vvdash:"\u22AA",vzigzag:"\u299A",Wcirc:"\u0174",wcirc:"\u0175",wedbar:"\u2A5F",wedge:"\u2227",Wedge:"\u22C0",wedgeq:"\u2259",weierp:"\u2118",Wfr:"\u{1D51A}",wfr:"\u{1D534}",Wopf:"\u{1D54E}",wopf:"\u{1D568}",wp:"\u2118",wr:"\u2240",wreath:"\u2240",Wscr:"\u{1D4B2}",wscr:"\u{1D4CC}",xcap:"\u22C2",xcirc:"\u25EF",xcup:"\u22C3",xdtri:"\u25BD",Xfr:"\u{1D51B}",xfr:"\u{1D535}",xharr:"\u27F7",xhArr:"\u27FA",Xi:"\u039E",xi:"\u03BE",xlarr:"\u27F5",xlArr:"\u27F8",xmap:"\u27FC",xnis:"\u22FB",xodot:"\u2A00",Xopf:"\u{1D54F}",xopf:"\u{1D569}",xoplus:"\u2A01",xotime:"\u2A02",xrarr:"\u27F6",xrArr:"\u27F9",Xscr:"\u{1D4B3}",xscr:"\u{1D4CD}",xsqcup:"\u2A06",xuplus:"\u2A04",xutri:"\u25B3",xvee:"\u22C1",xwedge:"\u22C0",Yacute:"\xDD",yacute:"\xFD",YAcy:"\u042F",yacy:"\u044F",Ycirc:"\u0176",ycirc:"\u0177",Ycy:"\u042B",ycy:"\u044B",yen:"\xA5",Yfr:"\u{1D51C}",yfr:"\u{1D536}",YIcy:"\u0407",yicy:"\u0457",Yopf:"\u{1D550}",yopf:"\u{1D56A}",Yscr:"\u{1D4B4}",yscr:"\u{1D4CE}",YUcy:"\u042E",yucy:"\u044E",yuml:"\xFF",Yuml:"\u0178",Zacute:"\u0179",zacute:"\u017A",Zcaron:"\u017D",zcaron:"\u017E",Zcy:"\u0417",zcy:"\u0437",Zdot:"\u017B",zdot:"\u017C",zeetrf:"\u2128",ZeroWidthSpace:"\u200B",Zeta:"\u0396",zeta:"\u03B6",zfr:"\u{1D537}",Zfr:"\u2128",ZHcy:"\u0416",zhcy:"\u0436",zigrarr:"\u21DD",zopf:"\u{1D56B}",Zopf:"\u2124",Zscr:"\u{1D4B5}",zscr:"\u{1D4CF}",zwj:"\u200D",zwnj:"\u200C"}},function(d,h){},function(d,h){},function(d,h,s){function t(k){return Array.prototype.slice.call(arguments,1).forEach(function(C){C&&Object.keys(C).forEach(function(y){k[y]=C[y]})}),k}function r(k){return Object.prototype.toString.call(k)}function e(k){return r(k)==="[object String]"}function i(k){return r(k)==="[object Object]"}function n(k){return r(k)==="[object RegExp]"}function a(k){return r(k)==="[object Function]"}function u(k){return k.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}function c(k){return Object.keys(k||{}).reduce(function(C,y){return C||m.hasOwnProperty(y)},!1)}function o(k){k.__index__=-1,k.__text_cache__=""}function l(k){return function(C,y){var A=C.slice(y);return k.test(A)?A.match(k)[0].length:0}}function p(){return function(k,C){C.normalize(k)}}function _(k){function C(S){return S.replace("%TLDS%",A.src_tlds)}function y(S,M){throw new Error('(LinkifyIt) Invalid schema "'+S+'": '+M)}var A=k.re=s(117)(k.__opts__),T=k.__tlds__.slice();k.onCompile(),k.__tlds_replaced__||T.push(v),T.push(A.src_xn),A.src_tlds=T.join("|"),A.email_fuzzy=RegExp(C(A.tpl_email_fuzzy),"i"),A.link_fuzzy=RegExp(C(A.tpl_link_fuzzy),"i"),A.link_no_ip_fuzzy=RegExp(C(A.tpl_link_no_ip_fuzzy),"i"),A.host_fuzzy_test=RegExp(C(A.tpl_host_fuzzy_test),"i");var L=[];k.__compiled__={},Object.keys(k.__schemas__).forEach(function(S){var M=k.__schemas__[S];if(M!==null){var F={validate:null,link:null};return k.__compiled__[S]=F,i(M)?(n(M.validate)?F.validate=l(M.validate):a(M.validate)?F.validate=M.validate:y(S,M),void(a(M.normalize)?F.normalize=M.normalize:M.normalize?y(S,M):F.normalize=p())):e(M)?void L.push(S):void y(S,M)}}),L.forEach(function(S){k.__compiled__[k.__schemas__[S]]&&(k.__compiled__[S].validate=k.__compiled__[k.__schemas__[S]].validate,k.__compiled__[S].normalize=k.__compiled__[k.__schemas__[S]].normalize)}),k.__compiled__[""]={validate:null,normalize:p()};var j=Object.keys(k.__compiled__).filter(function(S){return S.length>0&&k.__compiled__[S]}).map(u).join("|");k.re.schema_test=RegExp("(^|(?!_)(?:[><\uFF5C]|"+A.src_ZPCc+"))("+j+")","i"),k.re.schema_search=RegExp("(^|(?!_)(?:[><\uFF5C]|"+A.src_ZPCc+"))("+j+")","ig"),k.re.pretest=RegExp("("+k.re.schema_test.source+")|("+k.re.host_fuzzy_test.source+")|@","i"),o(k)}function f(k,C){var y=k.__index__,A=k.__last_index__,T=k.__text_cache__.slice(y,A);this.schema=k.__schema__.toLowerCase(),this.index=y+C,this.lastIndex=A+C,this.raw=T,this.text=T,this.url=T}function b(k,C){var y=new f(k,C);return k.__compiled__[y.schema].normalize(y,k),y}function g(k,C){if(!(this instanceof g))return new g(k,C);C||c(k)&&(C=k,k={}),this.__opts__=t({},m,C),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=t({},w,k),this.__compiled__={},this.__tlds__=x,this.__tlds_replaced__=!1,this.re={},_(this)}var m={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1},w={"http:":{validate:function(k,C,y){var A=k.slice(C);return y.re.http||(y.re.http=new RegExp("^\\/\\/"+y.re.src_auth+y.re.src_host_port_strict+y.re.src_path,"i")),y.re.http.test(A)?A.match(y.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(k,C,y){var A=k.slice(C);return y.re.no_http||(y.re.no_http=new RegExp("^"+y.re.src_auth+"(?:localhost|(?:(?:"+y.re.src_domain+")\\.)+"+y.re.src_domain_root+")"+y.re.src_port+y.re.src_host_terminator+y.re.src_path,"i")),y.re.no_http.test(A)?C>=3&&k[C-3]===":"||C>=3&&k[C-3]==="/"?0:A.match(y.re.no_http)[0].length:0}},"mailto:":{validate:function(k,C,y){var A=k.slice(C);return y.re.mailto||(y.re.mailto=new RegExp("^"+y.re.src_email_name+"@"+y.re.src_host_strict,"i")),y.re.mailto.test(A)?A.match(y.re.mailto)[0].length:0}}},v="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",x="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|\u0440\u0444".split("|");g.prototype.add=function(k,C){return this.__schemas__[k]=C,_(this),this},g.prototype.set=function(k){return this.__opts__=t(this.__opts__,k),this},g.prototype.test=function(k){if(this.__text_cache__=k,this.__index__=-1,!k.length)return!1;var C,y,A,T,L,j,S,M;if(this.re.schema_test.test(k)){for(S=this.re.schema_search,S.lastIndex=0;(C=S.exec(k))!==null;)if(T=this.testSchemaAt(k,C[2],S.lastIndex)){this.__schema__=C[2],this.__index__=C.index+C[1].length,this.__last_index__=C.index+C[0].length+T;break}}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&(M=k.search(this.re.host_fuzzy_test))>=0&&(this.__index__<0||M<this.__index__)&&(y=k.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))!==null&&(L=y.index+y[1].length,(this.__index__<0||L<this.__index__)&&(this.__schema__="",this.__index__=L,this.__last_index__=y.index+y[0].length)),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&k.indexOf("@")>=0&&(A=k.match(this.re.email_fuzzy))!==null&&(L=A.index+A[1].length,j=A.index+A[0].length,(this.__index__<0||L<this.__index__||L===this.__index__&&j>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=L,this.__last_index__=j)),this.__index__>=0},g.prototype.pretest=function(k){return this.re.pretest.test(k)},g.prototype.testSchemaAt=function(k,C,y){return this.__compiled__[C.toLowerCase()]?this.__compiled__[C.toLowerCase()].validate(k,y,this):0},g.prototype.match=function(k){var C=0,y=[];this.__index__>=0&&this.__text_cache__===k&&(y.push(b(this,C)),C=this.__last_index__);for(var A=C?k.slice(C):k;this.test(A);)y.push(b(this,C)),A=A.slice(this.__last_index__),C+=this.__last_index__;return y.length?y:null},g.prototype.tlds=function(k,C){return k=Array.isArray(k)?k:[k],C?(this.__tlds__=this.__tlds__.concat(k).sort().filter(function(y,A,T){return y!==T[A-1]}).reverse(),_(this),this):(this.__tlds__=k.slice(),this.__tlds_replaced__=!0,_(this),this)},g.prototype.normalize=function(k){k.schema||(k.url="http://"+k.url),k.schema!=="mailto:"||/^mailto:/i.test(k.url)||(k.url="mailto:"+k.url)},g.prototype.onCompile=function(){},d.exports=g},function(d,h,s){d.exports=function(t){var r={};return r.src_Any=s(59).source,r.src_Cc=s(57).source,r.src_Z=s(58).source,r.src_P=s(34).source,r.src_ZPCc=[r.src_Z,r.src_P,r.src_Cc].join("|"),r.src_ZCc=[r.src_Z,r.src_Cc].join("|"),r.src_pseudo_letter="(?:(?![><\uFF5C]|"+r.src_ZPCc+")"+r.src_Any+")",r.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",r.src_auth="(?:(?:(?!"+r.src_ZCc+"|[@/\\[\\]()]).)+@)?",r.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",r.src_host_terminator="(?=$|[><\uFF5C]|"+r.src_ZPCc+")(?!-|_|:\\d|\\.-|\\.(?!$|"+r.src_ZPCc+"))",r.src_path="(?:[/?#](?:(?!"+r.src_ZCc+`|[><\uFF5C]|[()[\\]{}.,"'?!\\-]).|\\[(?:(?!`+r.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+r.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+r.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+r.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+r.src_ZCc+"|[']).)+\\'|\\'(?="+r.src_pseudo_letter+"|[-]).|\\.{2,4}[a-zA-Z0-9%/]|\\.(?!"+r.src_ZCc+"|[.]).|"+(t&&t["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+"\\,(?!"+r.src_ZCc+").|\\!(?!"+r.src_ZCc+"|[!]).|\\?(?!"+r.src_ZCc+"|[?]).)+|\\/)?",r.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',r.src_xn="xn--[a-z0-9\\-]{1,59}",r.src_domain_root="(?:"+r.src_xn+"|"+r.src_pseudo_letter+"{1,63})",r.src_domain="(?:"+r.src_xn+"|(?:"+r.src_pseudo_letter+")|(?:"+r.src_pseudo_letter+"(?:-|"+r.src_pseudo_letter+"){0,61}"+r.src_pseudo_letter+"))",r.src_host="(?:(?:(?:(?:"+r.src_domain+")\\.)*"+r.src_domain+"))",r.tpl_host_fuzzy="(?:"+r.src_ip4+"|(?:(?:(?:"+r.src_domain+")\\.)+(?:%TLDS%)))",r.tpl_host_no_ip_fuzzy="(?:(?:(?:"+r.src_domain+")\\.)+(?:%TLDS%))",r.src_host_strict=r.src_host+r.src_host_terminator,r.tpl_host_fuzzy_strict=r.tpl_host_fuzzy+r.src_host_terminator,r.src_host_port_strict=r.src_host+r.src_port+r.src_host_terminator,r.tpl_host_port_fuzzy_strict=r.tpl_host_fuzzy+r.src_port+r.src_host_terminator,r.tpl_host_port_no_ip_fuzzy_strict=r.tpl_host_no_ip_fuzzy+r.src_port+r.src_host_terminator,r.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+r.src_ZPCc+"|>|$))",r.tpl_email_fuzzy='(^|[><\uFF5C]|"|\\(|'+r.src_ZCc+")("+r.src_email_name+"@"+r.tpl_host_fuzzy_strict+")",r.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|\uFF5C]|"+r.src_ZPCc+"))((?![$+<=>^`|\uFF5C])"+r.tpl_host_port_fuzzy_strict+r.src_path+")",r.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|\uFF5C]|"+r.src_ZPCc+"))((?![$+<=>^`|\uFF5C])"+r.tpl_host_port_no_ip_fuzzy_strict+r.src_path+")",r}},function(d,h,s){d.exports=function(t){function r(o,l,p,_){var f,b,g,m,w,v=o.bMarks[l]+o.tShift[l],x=o.eMarks[l];if(v+2>=x||o.src.charCodeAt(v++)!==42||o.src.charCodeAt(v++)!==91)return!1;for(m=v;v<x;v++){if((g=o.src.charCodeAt(v))===91)return!1;if(g===93){w=v;break}g===92&&v++}return!(w<0||o.src.charCodeAt(w+1)!==58)&&(!!_||(f=o.src.slice(m,w).replace(/\\(.)/g,"$1"),b=o.src.slice(w+2,x).trim(),f.length!==0&&b.length!==0&&(o.env.abbreviations||(o.env.abbreviations={}),o.env.abbreviations[":"+f]===void 0&&(o.env.abbreviations[":"+f]=b),o.line=l+1,!0)))}function e(o){var l,p,_,f,b,g,m,w,v,x,k,C,y,A=o.tokens;if(o.env.abbreviations){for(C=new RegExp("(?:"+Object.keys(o.env.abbreviations).map(function(T){return T.substr(1)}).sort(function(T,L){return L.length-T.length}).map(i).join("|")+")"),k="(^|"+u+"|"+c+"|["+a.split("").map(i).join("")+"])("+Object.keys(o.env.abbreviations).map(function(T){return T.substr(1)}).sort(function(T,L){return L.length-T.length}).map(i).join("|")+")($|"+u+"|"+c+"|["+a.split("").map(i).join("")+"])",v=new RegExp(k,"g"),p=0,_=A.length;p<_;p++)if(A[p].type==="inline"){for(f=A[p].children,l=f.length-1;l>=0;l--)if(y=f[l],y.type==="text"&&(w=0,g=y.content,v.lastIndex=0,m=[],C.test(g))){for(;x=v.exec(g);)(x.index>0||x[1].length>0)&&(b=new o.Token("text","",0),b.content=g.slice(w,x.index+x[1].length),m.push(b)),b=new o.Token("abbr_open","abbr",1),b.attrs=[["title",o.env.abbreviations[":"+x[2]]]],m.push(b),b=new o.Token("text","",0),b.content=x[2],m.push(b),b=new o.Token("abbr_close","abbr",-1),m.push(b),v.lastIndex-=x[3].length,w=v.lastIndex;m.length&&(w<g.length&&(b=new o.Token("text","",0),b.content=g.slice(w),m.push(b)),A[p].children=f=n(f,l,m))}}}}var i=t.utils.escapeRE,n=t.utils.arrayReplaceAt,a=" \r\n$+<=>^`|~",u=t.utils.lib.ucmicro.P.source,c=t.utils.lib.ucmicro.Z.source;t.block.ruler.before("reference","abbr_def",r,{alt:["paragraph","reference"]}),t.core.ruler.after("linkify","abbr_replace",e)}},function(d,h,s){d.exports=function(t,r,e){function i(f){return f.trim().split(" ",2)[0]===r}function n(f,b,g,m,w){return f[b].nesting===1&&f[b].attrPush(["class",r]),w.renderToken(f,b,g,m,w)}function a(f,b,g,m){var w,v,x,k,C,y,A,T,L=!1,j=f.bMarks[b]+f.tShift[b],S=f.eMarks[b];if(o!==f.src.charCodeAt(j))return!1;for(w=j+1;w<=S&&c[(w-j)%l]===f.src[w];w++);if((x=Math.floor((w-j)/l))<u||(w-=(w-j)%l,k=f.src.slice(j,w),C=f.src.slice(w,S),!p(C)))return!1;if(m)return!0;for(v=b;!(++v>=g)&&(j=f.bMarks[v]+f.tShift[v],S=f.eMarks[v],!(j<S&&f.sCount[v]<f.blkIndent));)if(o===f.src.charCodeAt(j)&&!(f.sCount[v]-f.blkIndent>=4)){for(w=j+1;w<=S&&c[(w-j)%l]===f.src[w];w++);if(!(Math.floor((w-j)/l)<x||(w-=(w-j)%l,(w=f.skipSpaces(w))<S))){L=!0;break}}return A=f.parentType,T=f.lineMax,f.parentType="container",f.lineMax=v,y=f.push("container_"+r+"_open","div",1),y.markup=k,y.block=!0,y.info=C,y.map=[b,v],f.md.block.tokenize(f,b+1,v),y=f.push("container_"+r+"_close","div",-1),y.markup=f.src.slice(j,w),y.block=!0,f.parentType=A,f.lineMax=T,f.line=v+(L?1:0),!0}e=e||{};var u=3,c=e.marker||":",o=c.charCodeAt(0),l=c.length,p=e.validate||i,_=e.render||n;t.block.ruler.before("fence","container_"+r,a,{alt:["paragraph","reference","blockquote","list"]}),t.renderer.rules["container_"+r+"_open"]=_,t.renderer.rules["container_"+r+"_close"]=_}},function(d,h,s){d.exports=function(t){function r(a,u){var c,o,l=a.bMarks[u]+a.tShift[u],p=a.eMarks[u];return l>=p||(o=a.src.charCodeAt(l++))!==126&&o!==58?-1:(c=a.skipSpaces(l),l===c||c>=p?-1:l)}function e(a,u){var c,o,l=a.level+2;for(c=u+2,o=a.tokens.length-2;c<o;c++)a.tokens[c].level===l&&a.tokens[c].type==="paragraph_open"&&(a.tokens[c+2].hidden=!0,a.tokens[c].hidden=!0,c+=2)}function i(a,u,c,o){var l,p,_,f,b,g,m,w,v,x,k,C,y,A,T,L,j,S,M,F;if(o)return!(a.ddIndent<0)&&r(a,u)>=0;if((v=u+1)>=c||a.isEmpty(v)&&++v>=c||a.sCount[v]<a.blkIndent||(p=r(a,v))<0)return!1;m=a.tokens.length,M=!0,F=a.push("dl_open","dl",1),F.map=g=[u,0],f=u,_=v;t:for(;;){for(S=!1,F=a.push("dt_open","dt",1),F.map=[f,f],F=a.push("inline","",0),F.map=[f,f],F.content=a.getLines(f,f+1,a.blkIndent,!1).trim(),F.children=[],F=a.push("dt_close","dt",-1);;){for(F=a.push("dd_open","dd",1),F.map=b=[v,0],j=p,w=a.eMarks[_],x=a.sCount[_]+p-(a.bMarks[_]+a.tShift[_]);j<w&&(l=a.src.charCodeAt(j),n(l));)l===9?x+=4-x%4:x++,j++;if(p=j,L=a.tight,k=a.ddIndent,C=a.blkIndent,T=a.tShift[_],A=a.sCount[_],y=a.parentType,a.blkIndent=a.ddIndent=a.sCount[_]+2,a.tShift[_]=p-a.bMarks[_],a.sCount[_]=x,a.tight=!0,a.parentType="deflist",a.md.block.tokenize(a,_,c,!0),a.tight&&!S||(M=!1),S=a.line-_>1&&a.isEmpty(a.line-1),a.tShift[_]=T,a.sCount[_]=A,a.tight=L,a.parentType=y,a.blkIndent=C,a.ddIndent=k,F=a.push("dd_close","dd",-1),b[1]=v=a.line,v>=c||a.sCount[v]<a.blkIndent)break t;if((p=r(a,v))<0)break;_=v}if(v>=c||(f=v,a.isEmpty(f))||a.sCount[f]<a.blkIndent||(_=f+1)>=c||(a.isEmpty(_)&&_++,_>=c)||a.sCount[_]<a.blkIndent||(p=r(a,_))<0)break}return F=a.push("dl_close","dl",-1),g[1]=v,a.line=v,M&&e(a,m),!0}var n=t.utils.isSpace;t.block.ruler.before("paragraph","deflist",i,{alt:["paragraph","reference"]})}},function(d,h,s){var t=s(122),r=s(123),e=s(125),i=s(126),n=s(124);d.exports=function(a,u){var c={defs:t,shortcuts:r,enabled:[]},o=n(a.utils.assign({},c,u||{}));a.renderer.rules.emoji=e,a.core.ruler.push("emoji",i(a,o.defs,o.shortcuts,o.scanRE,o.replaceRE))}},function(d,h){d.exports={100:"\u{1F4AF}",1234:"\u{1F522}",grinning:"\u{1F600}",smiley:"\u{1F603}",smile:"\u{1F604}",grin:"\u{1F601}",laughing:"\u{1F606}",satisfied:"\u{1F606}",sweat_smile:"\u{1F605}",joy:"\u{1F602}",rofl:"\u{1F923}",relaxed:"\u263A\uFE0F",blush:"\u{1F60A}",innocent:"\u{1F607}",slightly_smiling_face:"\u{1F642}",upside_down_face:"\u{1F643}",wink:"\u{1F609}",relieved:"\u{1F60C}",heart_eyes:"\u{1F60D}",kissing_heart:"\u{1F618}",kissing:"\u{1F617}",kissing_smiling_eyes:"\u{1F619}",kissing_closed_eyes:"\u{1F61A}",yum:"\u{1F60B}",stuck_out_tongue_winking_eye:"\u{1F61C}",stuck_out_tongue_closed_eyes:"\u{1F61D}",stuck_out_tongue:"\u{1F61B}",money_mouth_face:"\u{1F911}",hugs:"\u{1F917}",nerd_face:"\u{1F913}",sunglasses:"\u{1F60E}",clown_face:"\u{1F921}",cowboy_hat_face:"\u{1F920}",smirk:"\u{1F60F}",unamused:"\u{1F612}",disappointed:"\u{1F61E}",pensive:"\u{1F614}",worried:"\u{1F61F}",confused:"\u{1F615}",slightly_frowning_face:"\u{1F641}",frowning_face:"\u2639\uFE0F",persevere:"\u{1F623}",confounded:"\u{1F616}",tired_face:"\u{1F62B}",weary:"\u{1F629}",triumph:"\u{1F624}",angry:"\u{1F620}",rage:"\u{1F621}",pout:"\u{1F621}",no_mouth:"\u{1F636}",neutral_face:"\u{1F610}",expressionless:"\u{1F611}",hushed:"\u{1F62F}",frowning:"\u{1F626}",anguished:"\u{1F627}",open_mouth:"\u{1F62E}",astonished:"\u{1F632}",dizzy_face:"\u{1F635}",flushed:"\u{1F633}",scream:"\u{1F631}",fearful:"\u{1F628}",cold_sweat:"\u{1F630}",cry:"\u{1F622}",disappointed_relieved:"\u{1F625}",drooling_face:"\u{1F924}",sob:"\u{1F62D}",sweat:"\u{1F613}",sleepy:"\u{1F62A}",sleeping:"\u{1F634}",roll_eyes:"\u{1F644}",thinking:"\u{1F914}",lying_face:"\u{1F925}",grimacing:"\u{1F62C}",zipper_mouth_face:"\u{1F910}",nauseated_face:"\u{1F922}",sneezing_face:"\u{1F927}",mask:"\u{1F637}",face_with_thermometer:"\u{1F912}",face_with_head_bandage:"\u{1F915}",smiling_imp:"\u{1F608}",imp:"\u{1F47F}",japanese_ogre:"\u{1F479}",japanese_goblin:"\u{1F47A}",hankey:"\u{1F4A9}",poop:"\u{1F4A9}",shit:"\u{1F4A9}",ghost:"\u{1F47B}",skull:"\u{1F480}",skull_and_crossbones:"\u2620\uFE0F",alien:"\u{1F47D}",space_invader:"\u{1F47E}",robot:"\u{1F916}",jack_o_lantern:"\u{1F383}",smiley_cat:"\u{1F63A}",smile_cat:"\u{1F638}",joy_cat:"\u{1F639}",heart_eyes_cat:"\u{1F63B}",smirk_cat:"\u{1F63C}",kissing_cat:"\u{1F63D}",scream_cat:"\u{1F640}",crying_cat_face:"\u{1F63F}",pouting_cat:"\u{1F63E}",open_hands:"\u{1F450}",raised_hands:"\u{1F64C}",clap:"\u{1F44F}",pray:"\u{1F64F}",handshake:"\u{1F91D}","+1":"\u{1F44D}",thumbsup:"\u{1F44D}","-1":"\u{1F44E}",thumbsdown:"\u{1F44E}",fist_oncoming:"\u{1F44A}",facepunch:"\u{1F44A}",punch:"\u{1F44A}",fist_raised:"\u270A",fist:"\u270A",fist_left:"\u{1F91B}",fist_right:"\u{1F91C}",crossed_fingers:"\u{1F91E}",v:"\u270C\uFE0F",metal:"\u{1F918}",ok_hand:"\u{1F44C}",point_left:"\u{1F448}",point_right:"\u{1F449}",point_up_2:"\u{1F446}",point_down:"\u{1F447}",point_up:"\u261D\uFE0F",hand:"\u270B",raised_hand:"\u270B",raised_back_of_hand:"\u{1F91A}",raised_hand_with_fingers_splayed:"\u{1F590}",vulcan_salute:"\u{1F596}",wave:"\u{1F44B}",call_me_hand:"\u{1F919}",muscle:"\u{1F4AA}",middle_finger:"\u{1F595}",fu:"\u{1F595}",writing_hand:"\u270D\uFE0F",selfie:"\u{1F933}",nail_care:"\u{1F485}",ring:"\u{1F48D}",lipstick:"\u{1F484}",kiss:"\u{1F48B}",lips:"\u{1F444}",tongue:"\u{1F445}",ear:"\u{1F442}",nose:"\u{1F443}",footprints:"\u{1F463}",eye:"\u{1F441}",eyes:"\u{1F440}",speaking_head:"\u{1F5E3}",bust_in_silhouette:"\u{1F464}",busts_in_silhouette:"\u{1F465}",baby:"\u{1F476}",boy:"\u{1F466}",girl:"\u{1F467}",man:"\u{1F468}",woman:"\u{1F469}",blonde_woman:"\u{1F471}\u200D\u2640",blonde_man:"\u{1F471}",person_with_blond_hair:"\u{1F471}",older_man:"\u{1F474}",older_woman:"\u{1F475}",man_with_gua_pi_mao:"\u{1F472}",woman_with_turban:"\u{1F473}\u200D\u2640",man_with_turban:"\u{1F473}",policewoman:"\u{1F46E}\u200D\u2640",policeman:"\u{1F46E}",cop:"\u{1F46E}",construction_worker_woman:"\u{1F477}\u200D\u2640",construction_worker_man:"\u{1F477}",construction_worker:"\u{1F477}",guardswoman:"\u{1F482}\u200D\u2640",guardsman:"\u{1F482}",female_detective:"\u{1F575}\uFE0F\u200D\u2640\uFE0F",male_detective:"\u{1F575}",detective:"\u{1F575}",woman_health_worker:"\u{1F469}\u200D\u2695",man_health_worker:"\u{1F468}\u200D\u2695",woman_farmer:"\u{1F469}\u200D\u{1F33E}",man_farmer:"\u{1F468}\u200D\u{1F33E}",woman_cook:"\u{1F469}\u200D\u{1F373}",man_cook:"\u{1F468}\u200D\u{1F373}",woman_student:"\u{1F469}\u200D\u{1F393}",man_student:"\u{1F468}\u200D\u{1F393}",woman_singer:"\u{1F469}\u200D\u{1F3A4}",man_singer:"\u{1F468}\u200D\u{1F3A4}",woman_teacher:"\u{1F469}\u200D\u{1F3EB}",man_teacher:"\u{1F468}\u200D\u{1F3EB}",woman_factory_worker:"\u{1F469}\u200D\u{1F3ED}",man_factory_worker:"\u{1F468}\u200D\u{1F3ED}",woman_technologist:"\u{1F469}\u200D\u{1F4BB}",man_technologist:"\u{1F468}\u200D\u{1F4BB}",woman_office_worker:"\u{1F469}\u200D\u{1F4BC}",man_office_worker:"\u{1F468}\u200D\u{1F4BC}",woman_mechanic:"\u{1F469}\u200D\u{1F527}",man_mechanic:"\u{1F468}\u200D\u{1F527}",woman_scientist:"\u{1F469}\u200D\u{1F52C}",man_scientist:"\u{1F468}\u200D\u{1F52C}",woman_artist:"\u{1F469}\u200D\u{1F3A8}",man_artist:"\u{1F468}\u200D\u{1F3A8}",woman_firefighter:"\u{1F469}\u200D\u{1F692}",man_firefighter:"\u{1F468}\u200D\u{1F692}",woman_pilot:"\u{1F469}\u200D\u2708",man_pilot:"\u{1F468}\u200D\u2708",woman_astronaut:"\u{1F469}\u200D\u{1F680}",man_astronaut:"\u{1F468}\u200D\u{1F680}",woman_judge:"\u{1F469}\u200D\u2696",man_judge:"\u{1F468}\u200D\u2696",mrs_claus:"\u{1F936}",santa:"\u{1F385}",princess:"\u{1F478}",prince:"\u{1F934}",bride_with_veil:"\u{1F470}",man_in_tuxedo:"\u{1F935}",angel:"\u{1F47C}",pregnant_woman:"\u{1F930}",bowing_woman:"\u{1F647}\u200D\u2640",bowing_man:"\u{1F647}",bow:"\u{1F647}",tipping_hand_woman:"\u{1F481}",information_desk_person:"\u{1F481}",sassy_woman:"\u{1F481}",tipping_hand_man:"\u{1F481}\u200D\u2642",sassy_man:"\u{1F481}\u200D\u2642",no_good_woman:"\u{1F645}",no_good:"\u{1F645}",ng_woman:"\u{1F645}",no_good_man:"\u{1F645}\u200D\u2642",ng_man:"\u{1F645}\u200D\u2642",ok_woman:"\u{1F646}",ok_man:"\u{1F646}\u200D\u2642",raising_hand_woman:"\u{1F64B}",raising_hand:"\u{1F64B}",raising_hand_man:"\u{1F64B}\u200D\u2642",woman_facepalming:"\u{1F926}\u200D\u2640",man_facepalming:"\u{1F926}\u200D\u2642",woman_shrugging:"\u{1F937}\u200D\u2640",man_shrugging:"\u{1F937}\u200D\u2642",pouting_woman:"\u{1F64E}",person_with_pouting_face:"\u{1F64E}",pouting_man:"\u{1F64E}\u200D\u2642",frowning_woman:"\u{1F64D}",person_frowning:"\u{1F64D}",frowning_man:"\u{1F64D}\u200D\u2642",haircut_woman:"\u{1F487}",haircut:"\u{1F487}",haircut_man:"\u{1F487}\u200D\u2642",massage_woman:"\u{1F486}",massage:"\u{1F486}",massage_man:"\u{1F486}\u200D\u2642",business_suit_levitating:"\u{1F574}",dancer:"\u{1F483}",man_dancing:"\u{1F57A}",dancing_women:"\u{1F46F}",dancers:"\u{1F46F}",dancing_men:"\u{1F46F}\u200D\u2642",walking_woman:"\u{1F6B6}\u200D\u2640",walking_man:"\u{1F6B6}",walking:"\u{1F6B6}",running_woman:"\u{1F3C3}\u200D\u2640",running_man:"\u{1F3C3}",runner:"\u{1F3C3}",running:"\u{1F3C3}",couple:"\u{1F46B}",two_women_holding_hands:"\u{1F46D}",two_men_holding_hands:"\u{1F46C}",couple_with_heart_woman_man:"\u{1F491}",couple_with_heart:"\u{1F491}",couple_with_heart_woman_woman:"\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F469}",couple_with_heart_man_man:"\u{1F468}\u200D\u2764\uFE0F\u200D\u{1F468}",couplekiss_man_woman:"\u{1F48F}",couplekiss_woman_woman:"\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}",couplekiss_man_man:"\u{1F468}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}",family_man_woman_boy:"\u{1F46A}",family:"\u{1F46A}",family_man_woman_girl:"\u{1F468}\u200D\u{1F469}\u200D\u{1F467}",family_man_woman_girl_boy:"\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}",family_man_woman_boy_boy:"\u{1F468}\u200D\u{1F469}\u200D\u{1F466}\u200D\u{1F466}",family_man_woman_girl_girl:"\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F467}",family_woman_woman_boy:"\u{1F469}\u200D\u{1F469}\u200D\u{1F466}",family_woman_woman_girl:"\u{1F469}\u200D\u{1F469}\u200D\u{1F467}",family_woman_woman_girl_boy:"\u{1F469}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}",family_woman_woman_boy_boy:"\u{1F469}\u200D\u{1F469}\u200D\u{1F466}\u200D\u{1F466}",family_woman_woman_girl_girl:"\u{1F469}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F467}",family_man_man_boy:"\u{1F468}\u200D\u{1F468}\u200D\u{1F466}",family_man_man_girl:"\u{1F468}\u200D\u{1F468}\u200D\u{1F467}",family_man_man_girl_boy:"\u{1F468}\u200D\u{1F468}\u200D\u{1F467}\u200D\u{1F466}",family_man_man_boy_boy:"\u{1F468}\u200D\u{1F468}\u200D\u{1F466}\u200D\u{1F466}",family_man_man_girl_girl:"\u{1F468}\u200D\u{1F468}\u200D\u{1F467}\u200D\u{1F467}",family_woman_boy:"\u{1F469}\u200D\u{1F466}",family_woman_girl:"\u{1F469}\u200D\u{1F467}",family_woman_girl_boy:"\u{1F469}\u200D\u{1F467}\u200D\u{1F466}",family_woman_boy_boy:"\u{1F469}\u200D\u{1F466}\u200D\u{1F466}",family_woman_girl_girl:"\u{1F469}\u200D\u{1F467}\u200D\u{1F467}",family_man_boy:"\u{1F468}\u200D\u{1F466}",family_man_girl:"\u{1F468}\u200D\u{1F467}",family_man_girl_boy:"\u{1F468}\u200D\u{1F467}\u200D\u{1F466}",family_man_boy_boy:"\u{1F468}\u200D\u{1F466}\u200D\u{1F466}",family_man_girl_girl:"\u{1F468}\u200D\u{1F467}\u200D\u{1F467}",womans_clothes:"\u{1F45A}",shirt:"\u{1F455}",tshirt:"\u{1F455}",jeans:"\u{1F456}",necktie:"\u{1F454}",dress:"\u{1F457}",bikini:"\u{1F459}",kimono:"\u{1F458}",high_heel:"\u{1F460}",sandal:"\u{1F461}",boot:"\u{1F462}",mans_shoe:"\u{1F45E}",shoe:"\u{1F45E}",athletic_shoe:"\u{1F45F}",womans_hat:"\u{1F452}",tophat:"\u{1F3A9}",mortar_board:"\u{1F393}",crown:"\u{1F451}",rescue_worker_helmet:"\u26D1",school_satchel:"\u{1F392}",pouch:"\u{1F45D}",purse:"\u{1F45B}",handbag:"\u{1F45C}",briefcase:"\u{1F4BC}",eyeglasses:"\u{1F453}",dark_sunglasses:"\u{1F576}",closed_umbrella:"\u{1F302}",open_umbrella:"\u2602\uFE0F",dog:"\u{1F436}",cat:"\u{1F431}",mouse:"\u{1F42D}",hamster:"\u{1F439}",rabbit:"\u{1F430}",fox_face:"\u{1F98A}",bear:"\u{1F43B}",panda_face:"\u{1F43C}",koala:"\u{1F428}",tiger:"\u{1F42F}",lion:"\u{1F981}",cow:"\u{1F42E}",pig:"\u{1F437}",pig_nose:"\u{1F43D}",frog:"\u{1F438}",monkey_face:"\u{1F435}",see_no_evil:"\u{1F648}",hear_no_evil:"\u{1F649}",speak_no_evil:"\u{1F64A}",monkey:"\u{1F412}",chicken:"\u{1F414}",penguin:"\u{1F427}",bird:"\u{1F426}",baby_chick:"\u{1F424}",hatching_chick:"\u{1F423}",hatched_chick:"\u{1F425}",duck:"\u{1F986}",eagle:"\u{1F985}",owl:"\u{1F989}",bat:"\u{1F987}",wolf:"\u{1F43A}",boar:"\u{1F417}",horse:"\u{1F434}",unicorn:"\u{1F984}",bee:"\u{1F41D}",honeybee:"\u{1F41D}",bug:"\u{1F41B}",butterfly:"\u{1F98B}",snail:"\u{1F40C}",shell:"\u{1F41A}",beetle:"\u{1F41E}",ant:"\u{1F41C}",spider:"\u{1F577}",spider_web:"\u{1F578}",turtle:"\u{1F422}",snake:"\u{1F40D}",lizard:"\u{1F98E}",scorpion:"\u{1F982}",crab:"\u{1F980}",squid:"\u{1F991}",octopus:"\u{1F419}",shrimp:"\u{1F990}",tropical_fish:"\u{1F420}",fish:"\u{1F41F}",blowfish:"\u{1F421}",dolphin:"\u{1F42C}",flipper:"\u{1F42C}",shark:"\u{1F988}",whale:"\u{1F433}",whale2:"\u{1F40B}",crocodile:"\u{1F40A}",leopard:"\u{1F406}",tiger2:"\u{1F405}",water_buffalo:"\u{1F403}",ox:"\u{1F402}",cow2:"\u{1F404}",deer:"\u{1F98C}",dromedary_camel:"\u{1F42A}",camel:"\u{1F42B}",elephant:"\u{1F418}",rhinoceros:"\u{1F98F}",gorilla:"\u{1F98D}",racehorse:"\u{1F40E}",pig2:"\u{1F416}",goat:"\u{1F410}",ram:"\u{1F40F}",sheep:"\u{1F411}",dog2:"\u{1F415}",poodle:"\u{1F429}",cat2:"\u{1F408}",rooster:"\u{1F413}",turkey:"\u{1F983}",dove:"\u{1F54A}",rabbit2:"\u{1F407}",mouse2:"\u{1F401}",rat:"\u{1F400}",chipmunk:"\u{1F43F}",feet:"\u{1F43E}",paw_prints:"\u{1F43E}",dragon:"\u{1F409}",dragon_face:"\u{1F432}",cactus:"\u{1F335}",christmas_tree:"\u{1F384}",evergreen_tree:"\u{1F332}",deciduous_tree:"\u{1F333}",palm_tree:"\u{1F334}",seedling:"\u{1F331}",herb:"\u{1F33F}",shamrock:"\u2618\uFE0F",four_leaf_clover:"\u{1F340}",bamboo:"\u{1F38D}",tanabata_tree:"\u{1F38B}",leaves:"\u{1F343}",fallen_leaf:"\u{1F342}",maple_leaf:"\u{1F341}",mushroom:"\u{1F344}",ear_of_rice:"\u{1F33E}",bouquet:"\u{1F490}",tulip:"\u{1F337}",rose:"\u{1F339}",wilted_flower:"\u{1F940}",sunflower:"\u{1F33B}",blossom:"\u{1F33C}",cherry_blossom:"\u{1F338}",hibiscus:"\u{1F33A}",earth_americas:"\u{1F30E}",earth_africa:"\u{1F30D}",earth_asia:"\u{1F30F}",full_moon:"\u{1F315}",waning_gibbous_moon:"\u{1F316}",last_quarter_moon:"\u{1F317}",waning_crescent_moon:"\u{1F318}",new_moon:"\u{1F311}",waxing_crescent_moon:"\u{1F312}",first_quarter_moon:"\u{1F313}",moon:"\u{1F314}",waxing_gibbous_moon:"\u{1F314}",new_moon_with_face:"\u{1F31A}",full_moon_with_face:"\u{1F31D}",sun_with_face:"\u{1F31E}",first_quarter_moon_with_face:"\u{1F31B}",last_quarter_moon_with_face:"\u{1F31C}",crescent_moon:"\u{1F319}",dizzy:"\u{1F4AB}",star:"\u2B50\uFE0F",star2:"\u{1F31F}",sparkles:"\u2728",zap:"\u26A1\uFE0F",fire:"\u{1F525}",boom:"\u{1F4A5}",collision:"\u{1F4A5}",comet:"\u2604",sunny:"\u2600\uFE0F",sun_behind_small_cloud:"\u{1F324}",partly_sunny:"\u26C5\uFE0F",sun_behind_large_cloud:"\u{1F325}",sun_behind_rain_cloud:"\u{1F326}",rainbow:"\u{1F308}",cloud:"\u2601\uFE0F",cloud_with_rain:"\u{1F327}",cloud_with_lightning_and_rain:"\u26C8",cloud_with_lightning:"\u{1F329}",cloud_with_snow:"\u{1F328}",snowman_with_snow:"\u2603\uFE0F",snowman:"\u26C4\uFE0F",snowflake:"\u2744\uFE0F",wind_face:"\u{1F32C}",dash:"\u{1F4A8}",tornado:"\u{1F32A}",fog:"\u{1F32B}",ocean:"\u{1F30A}",droplet:"\u{1F4A7}",sweat_drops:"\u{1F4A6}",umbrella:"\u2614\uFE0F",green_apple:"\u{1F34F}",apple:"\u{1F34E}",pear:"\u{1F350}",tangerine:"\u{1F34A}",orange:"\u{1F34A}",mandarin:"\u{1F34A}",lemon:"\u{1F34B}",banana:"\u{1F34C}",watermelon:"\u{1F349}",grapes:"\u{1F347}",strawberry:"\u{1F353}",melon:"\u{1F348}",cherries:"\u{1F352}",peach:"\u{1F351}",pineapple:"\u{1F34D}",kiwi_fruit:"\u{1F95D}",avocado:"\u{1F951}",tomato:"\u{1F345}",eggplant:"\u{1F346}",cucumber:"\u{1F952}",carrot:"\u{1F955}",corn:"\u{1F33D}",hot_pepper:"\u{1F336}",potato:"\u{1F954}",sweet_potato:"\u{1F360}",chestnut:"\u{1F330}",peanuts:"\u{1F95C}",honey_pot:"\u{1F36F}",croissant:"\u{1F950}",bread:"\u{1F35E}",baguette_bread:"\u{1F956}",cheese:"\u{1F9C0}",egg:"\u{1F95A}",fried_egg:"\u{1F373}",bacon:"\u{1F953}",pancakes:"\u{1F95E}",fried_shrimp:"\u{1F364}",poultry_leg:"\u{1F357}",meat_on_bone:"\u{1F356}",pizza:"\u{1F355}",hotdog:"\u{1F32D}",hamburger:"\u{1F354}",fries:"\u{1F35F}",stuffed_flatbread:"\u{1F959}",taco:"\u{1F32E}",burrito:"\u{1F32F}",green_salad:"\u{1F957}",shallow_pan_of_food:"\u{1F958}",spaghetti:"\u{1F35D}",ramen:"\u{1F35C}",stew:"\u{1F372}",fish_cake:"\u{1F365}",sushi:"\u{1F363}",bento:"\u{1F371}",curry:"\u{1F35B}",rice:"\u{1F35A}",rice_ball:"\u{1F359}",rice_cracker:"\u{1F358}",oden:"\u{1F362}",dango:"\u{1F361}",shaved_ice:"\u{1F367}",ice_cream:"\u{1F368}",icecream:"\u{1F366}",cake:"\u{1F370}",birthday:"\u{1F382}",custard:"\u{1F36E}",lollipop:"\u{1F36D}",candy:"\u{1F36C}",chocolate_bar:"\u{1F36B}",popcorn:"\u{1F37F}",doughnut:"\u{1F369}",cookie:"\u{1F36A}",milk_glass:"\u{1F95B}",baby_bottle:"\u{1F37C}",coffee:"\u2615\uFE0F",tea:"\u{1F375}",sake:"\u{1F376}",beer:"\u{1F37A}",beers:"\u{1F37B}",clinking_glasses:"\u{1F942}",wine_glass:"\u{1F377}",tumbler_glass:"\u{1F943}",cocktail:"\u{1F378}",tropical_drink:"\u{1F379}",champagne:"\u{1F37E}",spoon:"\u{1F944}",fork_and_knife:"\u{1F374}",plate_with_cutlery:"\u{1F37D}",soccer:"\u26BD\uFE0F",basketball:"\u{1F3C0}",football:"\u{1F3C8}",baseball:"\u26BE\uFE0F",tennis:"\u{1F3BE}",volleyball:"\u{1F3D0}",rugby_football:"\u{1F3C9}","8ball":"\u{1F3B1}",ping_pong:"\u{1F3D3}",badminton:"\u{1F3F8}",goal_net:"\u{1F945}",ice_hockey:"\u{1F3D2}",field_hockey:"\u{1F3D1}",cricket:"\u{1F3CF}",golf:"\u26F3\uFE0F",bow_and_arrow:"\u{1F3F9}",fishing_pole_and_fish:"\u{1F3A3}",boxing_glove:"\u{1F94A}",martial_arts_uniform:"\u{1F94B}",ice_skate:"\u26F8",ski:"\u{1F3BF}",skier:"\u26F7",snowboarder:"\u{1F3C2}",weight_lifting_woman:"\u{1F3CB}\uFE0F\u200D\u2640\uFE0F",weight_lifting_man:"\u{1F3CB}",person_fencing:"\u{1F93A}",women_wrestling:"\u{1F93C}\u200D\u2640",men_wrestling:"\u{1F93C}\u200D\u2642",woman_cartwheeling:"\u{1F938}\u200D\u2640",man_cartwheeling:"\u{1F938}\u200D\u2642",basketball_woman:"\u26F9\uFE0F\u200D\u2640\uFE0F",basketball_man:"\u26F9",woman_playing_handball:"\u{1F93E}\u200D\u2640",man_playing_handball:"\u{1F93E}\u200D\u2642",golfing_woman:"\u{1F3CC}\uFE0F\u200D\u2640\uFE0F",golfing_man:"\u{1F3CC}",surfing_woman:"\u{1F3C4}\u200D\u2640",surfing_man:"\u{1F3C4}",surfer:"\u{1F3C4}",swimming_woman:"\u{1F3CA}\u200D\u2640",swimming_man:"\u{1F3CA}",swimmer:"\u{1F3CA}",woman_playing_water_polo:"\u{1F93D}\u200D\u2640",man_playing_water_polo:"\u{1F93D}\u200D\u2642",rowing_woman:"\u{1F6A3}\u200D\u2640",rowing_man:"\u{1F6A3}",rowboat:"\u{1F6A3}",horse_racing:"\u{1F3C7}",biking_woman:"\u{1F6B4}\u200D\u2640",biking_man:"\u{1F6B4}",bicyclist:"\u{1F6B4}",mountain_biking_woman:"\u{1F6B5}\u200D\u2640",mountain_biking_man:"\u{1F6B5}",mountain_bicyclist:"\u{1F6B5}",running_shirt_with_sash:"\u{1F3BD}",medal_sports:"\u{1F3C5}",medal_military:"\u{1F396}","1st_place_medal":"\u{1F947}","2nd_place_medal":"\u{1F948}","3rd_place_medal":"\u{1F949}",trophy:"\u{1F3C6}",rosette:"\u{1F3F5}",reminder_ribbon:"\u{1F397}",ticket:"\u{1F3AB}",tickets:"\u{1F39F}",circus_tent:"\u{1F3AA}",woman_juggling:"\u{1F939}\u200D\u2640",man_juggling:"\u{1F939}\u200D\u2642",performing_arts:"\u{1F3AD}",art:"\u{1F3A8}",clapper:"\u{1F3AC}",microphone:"\u{1F3A4}",headphones:"\u{1F3A7}",musical_score:"\u{1F3BC}",musical_keyboard:"\u{1F3B9}",drum:"\u{1F941}",saxophone:"\u{1F3B7}",trumpet:"\u{1F3BA}",guitar:"\u{1F3B8}",violin:"\u{1F3BB}",game_die:"\u{1F3B2}",dart:"\u{1F3AF}",bowling:"\u{1F3B3}",video_game:"\u{1F3AE}",slot_machine:"\u{1F3B0}",car:"\u{1F697}",red_car:"\u{1F697}",taxi:"\u{1F695}",blue_car:"\u{1F699}",bus:"\u{1F68C}",trolleybus:"\u{1F68E}",racing_car:"\u{1F3CE}",police_car:"\u{1F693}",ambulance:"\u{1F691}",fire_engine:"\u{1F692}",minibus:"\u{1F690}",truck:"\u{1F69A}",articulated_lorry:"\u{1F69B}",tractor:"\u{1F69C}",kick_scooter:"\u{1F6F4}",bike:"\u{1F6B2}",motor_scooter:"\u{1F6F5}",motorcycle:"\u{1F3CD}",rotating_light:"\u{1F6A8}",oncoming_police_car:"\u{1F694}",oncoming_bus:"\u{1F68D}",oncoming_automobile:"\u{1F698}",oncoming_taxi:"\u{1F696}",aerial_tramway:"\u{1F6A1}",mountain_cableway:"\u{1F6A0}",suspension_railway:"\u{1F69F}",railway_car:"\u{1F683}",train:"\u{1F68B}",mountain_railway:"\u{1F69E}",monorail:"\u{1F69D}",bullettrain_side:"\u{1F684}",bullettrain_front:"\u{1F685}",light_rail:"\u{1F688}",steam_locomotive:"\u{1F682}",train2:"\u{1F686}",metro:"\u{1F687}",tram:"\u{1F68A}",station:"\u{1F689}",helicopter:"\u{1F681}",small_airplane:"\u{1F6E9}",airplane:"\u2708\uFE0F",flight_departure:"\u{1F6EB}",flight_arrival:"\u{1F6EC}",rocket:"\u{1F680}",artificial_satellite:"\u{1F6F0}",seat:"\u{1F4BA}",canoe:"\u{1F6F6}",boat:"\u26F5\uFE0F",sailboat:"\u26F5\uFE0F",motor_boat:"\u{1F6E5}",speedboat:"\u{1F6A4}",passenger_ship:"\u{1F6F3}",ferry:"\u26F4",ship:"\u{1F6A2}",anchor:"\u2693\uFE0F",construction:"\u{1F6A7}",fuelpump:"\u26FD\uFE0F",busstop:"\u{1F68F}",vertical_traffic_light:"\u{1F6A6}",traffic_light:"\u{1F6A5}",world_map:"\u{1F5FA}",moyai:"\u{1F5FF}",statue_of_liberty:"\u{1F5FD}",fountain:"\u26F2\uFE0F",tokyo_tower:"\u{1F5FC}",european_castle:"\u{1F3F0}",japanese_castle:"\u{1F3EF}",stadium:"\u{1F3DF}",ferris_wheel:"\u{1F3A1}",roller_coaster:"\u{1F3A2}",carousel_horse:"\u{1F3A0}",parasol_on_ground:"\u26F1",beach_umbrella:"\u{1F3D6}",desert_island:"\u{1F3DD}",mountain:"\u26F0",mountain_snow:"\u{1F3D4}",mount_fuji:"\u{1F5FB}",volcano:"\u{1F30B}",desert:"\u{1F3DC}",camping:"\u{1F3D5}",tent:"\u26FA\uFE0F",railway_track:"\u{1F6E4}",motorway:"\u{1F6E3}",building_construction:"\u{1F3D7}",factory:"\u{1F3ED}",house:"\u{1F3E0}",house_with_garden:"\u{1F3E1}",houses:"\u{1F3D8}",derelict_house:"\u{1F3DA}",office:"\u{1F3E2}",department_store:"\u{1F3EC}",post_office:"\u{1F3E3}",european_post_office:"\u{1F3E4}",hospital:"\u{1F3E5}",bank:"\u{1F3E6}",hotel:"\u{1F3E8}",convenience_store:"\u{1F3EA}",school:"\u{1F3EB}",love_hotel:"\u{1F3E9}",wedding:"\u{1F492}",classical_building:"\u{1F3DB}",church:"\u26EA\uFE0F",mosque:"\u{1F54C}",synagogue:"\u{1F54D}",kaaba:"\u{1F54B}",shinto_shrine:"\u26E9",japan:"\u{1F5FE}",rice_scene:"\u{1F391}",national_park:"\u{1F3DE}",sunrise:"\u{1F305}",sunrise_over_mountains:"\u{1F304}",stars:"\u{1F320}",sparkler:"\u{1F387}",fireworks:"\u{1F386}",city_sunrise:"\u{1F307}",city_sunset:"\u{1F306}",cityscape:"\u{1F3D9}",night_with_stars:"\u{1F303}",milky_way:"\u{1F30C}",bridge_at_night:"\u{1F309}",foggy:"\u{1F301}",watch:"\u231A\uFE0F",iphone:"\u{1F4F1}",calling:"\u{1F4F2}",computer:"\u{1F4BB}",keyboard:"\u2328\uFE0F",desktop_computer:"\u{1F5A5}",printer:"\u{1F5A8}",computer_mouse:"\u{1F5B1}",trackball:"\u{1F5B2}",joystick:"\u{1F579}",clamp:"\u{1F5DC}",minidisc:"\u{1F4BD}",floppy_disk:"\u{1F4BE}",cd:"\u{1F4BF}",dvd:"\u{1F4C0}",vhs:"\u{1F4FC}",camera:"\u{1F4F7}",camera_flash:"\u{1F4F8}",video_camera:"\u{1F4F9}",movie_camera:"\u{1F3A5}",film_projector:"\u{1F4FD}",film_strip:"\u{1F39E}",telephone_receiver:"\u{1F4DE}",phone:"\u260E\uFE0F",telephone:"\u260E\uFE0F",pager:"\u{1F4DF}",fax:"\u{1F4E0}",tv:"\u{1F4FA}",radio:"\u{1F4FB}",studio_microphone:"\u{1F399}",level_slider:"\u{1F39A}",control_knobs:"\u{1F39B}",stopwatch:"\u23F1",timer_clock:"\u23F2",alarm_clock:"\u23F0",mantelpiece_clock:"\u{1F570}",hourglass:"\u231B\uFE0F",hourglass_flowing_sand:"\u23F3",satellite:"\u{1F4E1}",battery:"\u{1F50B}",electric_plug:"\u{1F50C}",bulb:"\u{1F4A1}",flashlight:"\u{1F526}",candle:"\u{1F56F}",wastebasket:"\u{1F5D1}",oil_drum:"\u{1F6E2}",money_with_wings:"\u{1F4B8}",dollar:"\u{1F4B5}",yen:"\u{1F4B4}",euro:"\u{1F4B6}",pound:"\u{1F4B7}",moneybag:"\u{1F4B0}",credit_card:"\u{1F4B3}",gem:"\u{1F48E}",balance_scale:"\u2696\uFE0F",wrench:"\u{1F527}",hammer:"\u{1F528}",hammer_and_pick:"\u2692",hammer_and_wrench:"\u{1F6E0}",pick:"\u26CF",nut_and_bolt:"\u{1F529}",gear:"\u2699\uFE0F",chains:"\u26D3",gun:"\u{1F52B}",bomb:"\u{1F4A3}",hocho:"\u{1F52A}",knife:"\u{1F52A}",dagger:"\u{1F5E1}",crossed_swords:"\u2694\uFE0F",shield:"\u{1F6E1}",smoking:"\u{1F6AC}",coffin:"\u26B0\uFE0F",funeral_urn:"\u26B1\uFE0F",amphora:"\u{1F3FA}",crystal_ball:"\u{1F52E}",prayer_beads:"\u{1F4FF}",barber:"\u{1F488}",alembic:"\u2697\uFE0F",telescope:"\u{1F52D}",microscope:"\u{1F52C}",hole:"\u{1F573}",pill:"\u{1F48A}",syringe:"\u{1F489}",thermometer:"\u{1F321}",toilet:"\u{1F6BD}",potable_water:"\u{1F6B0}",shower:"\u{1F6BF}",bathtub:"\u{1F6C1}",bath:"\u{1F6C0}",bellhop_bell:"\u{1F6CE}",key:"\u{1F511}",old_key:"\u{1F5DD}",door:"\u{1F6AA}",couch_and_lamp:"\u{1F6CB}",bed:"\u{1F6CF}",sleeping_bed:"\u{1F6CC}",framed_picture:"\u{1F5BC}",shopping:"\u{1F6CD}",shopping_cart:"\u{1F6D2}",gift:"\u{1F381}",balloon:"\u{1F388}",flags:"\u{1F38F}",ribbon:"\u{1F380}",confetti_ball:"\u{1F38A}",tada:"\u{1F389}",dolls:"\u{1F38E}",izakaya_lantern:"\u{1F3EE}",lantern:"\u{1F3EE}",wind_chime:"\u{1F390}",email:"\u2709\uFE0F",envelope:"\u2709\uFE0F",envelope_with_arrow:"\u{1F4E9}",incoming_envelope:"\u{1F4E8}","e-mail":"\u{1F4E7}",love_letter:"\u{1F48C}",inbox_tray:"\u{1F4E5}",outbox_tray:"\u{1F4E4}",package:"\u{1F4E6}",label:"\u{1F3F7}",mailbox_closed:"\u{1F4EA}",mailbox:"\u{1F4EB}",mailbox_with_mail:"\u{1F4EC}",mailbox_with_no_mail:"\u{1F4ED}",postbox:"\u{1F4EE}",postal_horn:"\u{1F4EF}",scroll:"\u{1F4DC}",page_with_curl:"\u{1F4C3}",page_facing_up:"\u{1F4C4}",bookmark_tabs:"\u{1F4D1}",bar_chart:"\u{1F4CA}",chart_with_upwards_trend:"\u{1F4C8}",chart_with_downwards_trend:"\u{1F4C9}",spiral_notepad:"\u{1F5D2}",spiral_calendar:"\u{1F5D3}",calendar:"\u{1F4C6}",date:"\u{1F4C5}",card_index:"\u{1F4C7}",card_file_box:"\u{1F5C3}",ballot_box:"\u{1F5F3}",file_cabinet:"\u{1F5C4}",clipboard:"\u{1F4CB}",file_folder:"\u{1F4C1}",open_file_folder:"\u{1F4C2}",card_index_dividers:"\u{1F5C2}",newspaper_roll:"\u{1F5DE}",newspaper:"\u{1F4F0}",notebook:"\u{1F4D3}",notebook_with_decorative_cover:"\u{1F4D4}",ledger:"\u{1F4D2}",closed_book:"\u{1F4D5}",green_book:"\u{1F4D7}",blue_book:"\u{1F4D8}",orange_book:"\u{1F4D9}",books:"\u{1F4DA}",book:"\u{1F4D6}",open_book:"\u{1F4D6}",bookmark:"\u{1F516}",link:"\u{1F517}",paperclip:"\u{1F4CE}",paperclips:"\u{1F587}",triangular_ruler:"\u{1F4D0}",straight_ruler:"\u{1F4CF}",pushpin:"\u{1F4CC}",round_pushpin:"\u{1F4CD}",scissors:"\u2702\uFE0F",pen:"\u{1F58A}",fountain_pen:"\u{1F58B}",black_nib:"\u2712\uFE0F",paintbrush:"\u{1F58C}",crayon:"\u{1F58D}",memo:"\u{1F4DD}",pencil:"\u{1F4DD}",pencil2:"\u270F\uFE0F",mag:"\u{1F50D}",mag_right:"\u{1F50E}",lock_with_ink_pen:"\u{1F50F}",closed_lock_with_key:"\u{1F510}",lock:"\u{1F512}",unlock:"\u{1F513}",heart:"\u2764\uFE0F",yellow_heart:"\u{1F49B}",green_heart:"\u{1F49A}",blue_heart:"\u{1F499}",purple_heart:"\u{1F49C}",black_heart:"\u{1F5A4}",broken_heart:"\u{1F494}",heavy_heart_exclamation:"\u2763\uFE0F",two_hearts:"\u{1F495}",revolving_hearts:"\u{1F49E}",heartbeat:"\u{1F493}",heartpulse:"\u{1F497}",sparkling_heart:"\u{1F496}",cupid:"\u{1F498}",gift_heart:"\u{1F49D}",heart_decoration:"\u{1F49F}",peace_symbol:"\u262E\uFE0F",latin_cross:"\u271D\uFE0F",star_and_crescent:"\u262A\uFE0F",om:"\u{1F549}",wheel_of_dharma:"\u2638\uFE0F",star_of_david:"\u2721\uFE0F",six_pointed_star:"\u{1F52F}",menorah:"\u{1F54E}",yin_yang:"\u262F\uFE0F",orthodox_cross:"\u2626\uFE0F",place_of_worship:"\u{1F6D0}",ophiuchus:"\u26CE",aries:"\u2648\uFE0F",taurus:"\u2649\uFE0F",gemini:"\u264A\uFE0F",cancer:"\u264B\uFE0F",leo:"\u264C\uFE0F",virgo:"\u264D\uFE0F",libra:"\u264E\uFE0F",scorpius:"\u264F\uFE0F",sagittarius:"\u2650\uFE0F",capricorn:"\u2651\uFE0F",aquarius:"\u2652\uFE0F",pisces:"\u2653\uFE0F",id:"\u{1F194}",atom_symbol:"\u269B\uFE0F",accept:"\u{1F251}",radioactive:"\u2622\uFE0F",biohazard:"\u2623\uFE0F",mobile_phone_off:"\u{1F4F4}",vibration_mode:"\u{1F4F3}",eight_pointed_black_star:"\u2734\uFE0F",vs:"\u{1F19A}",white_flower:"\u{1F4AE}",ideograph_advantage:"\u{1F250}",secret:"\u3299\uFE0F",congratulations:"\u3297\uFE0F",u6e80:"\u{1F235}",a:"\u{1F170}\uFE0F",b:"\u{1F171}\uFE0F",ab:"\u{1F18E}",cl:"\u{1F191}",o2:"\u{1F17E}\uFE0F",sos:"\u{1F198}",x:"\u274C",o:"\u2B55\uFE0F",stop_sign:"\u{1F6D1}",no_entry:"\u26D4\uFE0F",name_badge:"\u{1F4DB}",no_entry_sign:"\u{1F6AB}",anger:"\u{1F4A2}",hotsprings:"\u2668\uFE0F",no_pedestrians:"\u{1F6B7}",do_not_litter:"\u{1F6AF}",no_bicycles:"\u{1F6B3}","non-potable_water":"\u{1F6B1}",underage:"\u{1F51E}",no_mobile_phones:"\u{1F4F5}",no_smoking:"\u{1F6AD}",exclamation:"\u2757\uFE0F",heavy_exclamation_mark:"\u2757\uFE0F",grey_exclamation:"\u2755",question:"\u2753",grey_question:"\u2754",bangbang:"\u203C\uFE0F",interrobang:"\u2049\uFE0F",low_brightness:"\u{1F505}",high_brightness:"\u{1F506}",part_alternation_mark:"\u303D\uFE0F",warning:"\u26A0\uFE0F",children_crossing:"\u{1F6B8}",trident:"\u{1F531}",fleur_de_lis:"\u269C\uFE0F",beginner:"\u{1F530}",recycle:"\u267B\uFE0F",white_check_mark:"\u2705",chart:"\u{1F4B9}",sparkle:"\u2747\uFE0F",eight_spoked_asterisk:"\u2733\uFE0F",negative_squared_cross_mark:"\u274E",globe_with_meridians:"\u{1F310}",diamond_shape_with_a_dot_inside:"\u{1F4A0}",m:"\u24C2\uFE0F",cyclone:"\u{1F300}",zzz:"\u{1F4A4}",atm:"\u{1F3E7}",wc:"\u{1F6BE}",wheelchair:"\u267F\uFE0F",parking:"\u{1F17F}\uFE0F",sa:"\u{1F202}\uFE0F",passport_control:"\u{1F6C2}",customs:"\u{1F6C3}",baggage_claim:"\u{1F6C4}",left_luggage:"\u{1F6C5}",mens:"\u{1F6B9}",womens:"\u{1F6BA}",baby_symbol:"\u{1F6BC}",restroom:"\u{1F6BB}",put_litter_in_its_place:"\u{1F6AE}",cinema:"\u{1F3A6}",signal_strength:"\u{1F4F6}",koko:"\u{1F201}",symbols:"\u{1F523}",information_source:"\u2139\uFE0F",abc:"\u{1F524}",abcd:"\u{1F521}",capital_abcd:"\u{1F520}",ng:"\u{1F196}",ok:"\u{1F197}",up:"\u{1F199}",cool:"\u{1F192}",new:"\u{1F195}",free:"\u{1F193}",zero:"0\uFE0F\u20E3",one:"1\uFE0F\u20E3",two:"2\uFE0F\u20E3",three:"3\uFE0F\u20E3",four:"4\uFE0F\u20E3",five:"5\uFE0F\u20E3",six:"6\uFE0F\u20E3",seven:"7\uFE0F\u20E3",eight:"8\uFE0F\u20E3",nine:"9\uFE0F\u20E3",keycap_ten:"\u{1F51F}",hash:"#\uFE0F\u20E3",asterisk:"*\uFE0F\u20E3",arrow_forward:"\u25B6\uFE0F",pause_button:"\u23F8",play_or_pause_button:"\u23EF",stop_button:"\u23F9",record_button:"\u23FA",next_track_button:"\u23ED",previous_track_button:"\u23EE",fast_forward:"\u23E9",rewind:"\u23EA",arrow_double_up:"\u23EB",arrow_double_down:"\u23EC",arrow_backward:"\u25C0\uFE0F",arrow_up_small:"\u{1F53C}",arrow_down_small:"\u{1F53D}",arrow_right:"\u27A1\uFE0F",arrow_left:"\u2B05\uFE0F",arrow_up:"\u2B06\uFE0F",arrow_down:"\u2B07\uFE0F",arrow_upper_right:"\u2197\uFE0F",arrow_lower_right:"\u2198\uFE0F",arrow_lower_left:"\u2199\uFE0F",arrow_upper_left:"\u2196\uFE0F",arrow_up_down:"\u2195\uFE0F",left_right_arrow:"\u2194\uFE0F",arrow_right_hook:"\u21AA\uFE0F",leftwards_arrow_with_hook:"\u21A9\uFE0F",arrow_heading_up:"\u2934\uFE0F",arrow_heading_down:"\u2935\uFE0F",twisted_rightwards_arrows:"\u{1F500}",repeat:"\u{1F501}",repeat_one:"\u{1F502}",arrows_counterclockwise:"\u{1F504}",arrows_clockwise:"\u{1F503}",musical_note:"\u{1F3B5}",notes:"\u{1F3B6}",heavy_plus_sign:"\u2795",heavy_minus_sign:"\u2796",heavy_division_sign:"\u2797",heavy_multiplication_x:"\u2716\uFE0F",heavy_dollar_sign:"\u{1F4B2}",currency_exchange:"\u{1F4B1}",tm:"\u2122\uFE0F",copyright:"\xA9\uFE0F",registered:"\xAE\uFE0F",wavy_dash:"\u3030\uFE0F",curly_loop:"\u27B0",loop:"\u27BF",end:"\u{1F51A}",back:"\u{1F519}",on:"\u{1F51B}",top:"\u{1F51D}",soon:"\u{1F51C}",heavy_check_mark:"\u2714\uFE0F",ballot_box_with_check:"\u2611\uFE0F",radio_button:"\u{1F518}",white_circle:"\u26AA\uFE0F",black_circle:"\u26AB\uFE0F",red_circle:"\u{1F534}",large_blue_circle:"\u{1F535}",small_red_triangle:"\u{1F53A}",small_red_triangle_down:"\u{1F53B}",small_orange_diamond:"\u{1F538}",small_blue_diamond:"\u{1F539}",large_orange_diamond:"\u{1F536}",large_blue_diamond:"\u{1F537}",white_square_button:"\u{1F533}",black_square_button:"\u{1F532}",black_small_square:"\u25AA\uFE0F",white_small_square:"\u25AB\uFE0F",black_medium_small_square:"\u25FE\uFE0F",white_medium_small_square:"\u25FD\uFE0F",black_medium_square:"\u25FC\uFE0F",white_medium_square:"\u25FB\uFE0F",black_large_square:"\u2B1B\uFE0F",white_large_square:"\u2B1C\uFE0F",speaker:"\u{1F508}",mute:"\u{1F507}",sound:"\u{1F509}",loud_sound:"\u{1F50A}",bell:"\u{1F514}",no_bell:"\u{1F515}",mega:"\u{1F4E3}",loudspeaker:"\u{1F4E2}",eye_speech_bubble:"\u{1F441}\u200D\u{1F5E8}",speech_balloon:"\u{1F4AC}",thought_balloon:"\u{1F4AD}",right_anger_bubble:"\u{1F5EF}",spades:"\u2660\uFE0F",clubs:"\u2663\uFE0F",hearts:"\u2665\uFE0F",diamonds:"\u2666\uFE0F",black_joker:"\u{1F0CF}",flower_playing_cards:"\u{1F3B4}",mahjong:"\u{1F004}\uFE0F",clock1:"\u{1F550}",clock2:"\u{1F551}",clock3:"\u{1F552}",clock4:"\u{1F553}",clock5:"\u{1F554}",clock6:"\u{1F555}",clock7:"\u{1F556}",clock8:"\u{1F557}",clock9:"\u{1F558}",clock10:"\u{1F559}",clock11:"\u{1F55A}",clock12:"\u{1F55B}",clock130:"\u{1F55C}",clock230:"\u{1F55D}",clock330:"\u{1F55E}",clock430:"\u{1F55F}",clock530:"\u{1F560}",clock630:"\u{1F561}",clock730:"\u{1F562}",clock830:"\u{1F563}",clock930:"\u{1F564}",clock1030:"\u{1F565}",clock1130:"\u{1F566}",clock1230:"\u{1F567}",white_flag:"\u{1F3F3}\uFE0F",black_flag:"\u{1F3F4}",checkered_flag:"\u{1F3C1}",triangular_flag_on_post:"\u{1F6A9}",rainbow_flag:"\u{1F3F3}\uFE0F\u200D\u{1F308}",afghanistan:"\u{1F1E6}\u{1F1EB}",aland_islands:"\u{1F1E6}\u{1F1FD}",albania:"\u{1F1E6}\u{1F1F1}",algeria:"\u{1F1E9}\u{1F1FF}",american_samoa:"\u{1F1E6}\u{1F1F8}",andorra:"\u{1F1E6}\u{1F1E9}",angola:"\u{1F1E6}\u{1F1F4}",anguilla:"\u{1F1E6}\u{1F1EE}",antarctica:"\u{1F1E6}\u{1F1F6}",antigua_barbuda:"\u{1F1E6}\u{1F1EC}",argentina:"\u{1F1E6}\u{1F1F7}",armenia:"\u{1F1E6}\u{1F1F2}",aruba:"\u{1F1E6}\u{1F1FC}",australia:"\u{1F1E6}\u{1F1FA}",austria:"\u{1F1E6}\u{1F1F9}",azerbaijan:"\u{1F1E6}\u{1F1FF}",bahamas:"\u{1F1E7}\u{1F1F8}",bahrain:"\u{1F1E7}\u{1F1ED}",bangladesh:"\u{1F1E7}\u{1F1E9}",barbados:"\u{1F1E7}\u{1F1E7}",belarus:"\u{1F1E7}\u{1F1FE}",belgium:"\u{1F1E7}\u{1F1EA}",belize:"\u{1F1E7}\u{1F1FF}",benin:"\u{1F1E7}\u{1F1EF}",bermuda:"\u{1F1E7}\u{1F1F2}",bhutan:"\u{1F1E7}\u{1F1F9}",bolivia:"\u{1F1E7}\u{1F1F4}",caribbean_netherlands:"\u{1F1E7}\u{1F1F6}",bosnia_herzegovina:"\u{1F1E7}\u{1F1E6}",botswana:"\u{1F1E7}\u{1F1FC}",brazil:"\u{1F1E7}\u{1F1F7}",british_indian_ocean_territory:"\u{1F1EE}\u{1F1F4}",british_virgin_islands:"\u{1F1FB}\u{1F1EC}",brunei:"\u{1F1E7}\u{1F1F3}",bulgaria:"\u{1F1E7}\u{1F1EC}",burkina_faso:"\u{1F1E7}\u{1F1EB}",burundi:"\u{1F1E7}\u{1F1EE}",cape_verde:"\u{1F1E8}\u{1F1FB}",cambodia:"\u{1F1F0}\u{1F1ED}",cameroon:"\u{1F1E8}\u{1F1F2}",canada:"\u{1F1E8}\u{1F1E6}",canary_islands:"\u{1F1EE}\u{1F1E8}",cayman_islands:"\u{1F1F0}\u{1F1FE}",central_african_republic:"\u{1F1E8}\u{1F1EB}",chad:"\u{1F1F9}\u{1F1E9}",chile:"\u{1F1E8}\u{1F1F1}",cn:"\u{1F1E8}\u{1F1F3}",christmas_island:"\u{1F1E8}\u{1F1FD}",cocos_islands:"\u{1F1E8}\u{1F1E8}",colombia:"\u{1F1E8}\u{1F1F4}",comoros:"\u{1F1F0}\u{1F1F2}",congo_brazzaville:"\u{1F1E8}\u{1F1EC}",congo_kinshasa:"\u{1F1E8}\u{1F1E9}",cook_islands:"\u{1F1E8}\u{1F1F0}",costa_rica:"\u{1F1E8}\u{1F1F7}",cote_divoire:"\u{1F1E8}\u{1F1EE}",croatia:"\u{1F1ED}\u{1F1F7}",cuba:"\u{1F1E8}\u{1F1FA}",curacao:"\u{1F1E8}\u{1F1FC}",cyprus:"\u{1F1E8}\u{1F1FE}",czech_republic:"\u{1F1E8}\u{1F1FF}",denmark:"\u{1F1E9}\u{1F1F0}",djibouti:"\u{1F1E9}\u{1F1EF}",dominica:"\u{1F1E9}\u{1F1F2}",dominican_republic:"\u{1F1E9}\u{1F1F4}",ecuador:"\u{1F1EA}\u{1F1E8}",egypt:"\u{1F1EA}\u{1F1EC}",el_salvador:"\u{1F1F8}\u{1F1FB}",equatorial_guinea:"\u{1F1EC}\u{1F1F6}",eritrea:"\u{1F1EA}\u{1F1F7}",estonia:"\u{1F1EA}\u{1F1EA}",ethiopia:"\u{1F1EA}\u{1F1F9}",eu:"\u{1F1EA}\u{1F1FA}",european_union:"\u{1F1EA}\u{1F1FA}",falkland_islands:"\u{1F1EB}\u{1F1F0}",faroe_islands:"\u{1F1EB}\u{1F1F4}",fiji:"\u{1F1EB}\u{1F1EF}",finland:"\u{1F1EB}\u{1F1EE}",fr:"\u{1F1EB}\u{1F1F7}",french_guiana:"\u{1F1EC}\u{1F1EB}",french_polynesia:"\u{1F1F5}\u{1F1EB}",french_southern_territories:"\u{1F1F9}\u{1F1EB}",gabon:"\u{1F1EC}\u{1F1E6}",gambia:"\u{1F1EC}\u{1F1F2}",georgia:"\u{1F1EC}\u{1F1EA}",de:"\u{1F1E9}\u{1F1EA}",ghana:"\u{1F1EC}\u{1F1ED}",gibraltar:"\u{1F1EC}\u{1F1EE}",greece:"\u{1F1EC}\u{1F1F7}",greenland:"\u{1F1EC}\u{1F1F1}",grenada:"\u{1F1EC}\u{1F1E9}",guadeloupe:"\u{1F1EC}\u{1F1F5}",guam:"\u{1F1EC}\u{1F1FA}",guatemala:"\u{1F1EC}\u{1F1F9}",guernsey:"\u{1F1EC}\u{1F1EC}",guinea:"\u{1F1EC}\u{1F1F3}",guinea_bissau:"\u{1F1EC}\u{1F1FC}",guyana:"\u{1F1EC}\u{1F1FE}",haiti:"\u{1F1ED}\u{1F1F9}",honduras:"\u{1F1ED}\u{1F1F3}",hong_kong:"\u{1F1ED}\u{1F1F0}",hungary:"\u{1F1ED}\u{1F1FA}",iceland:"\u{1F1EE}\u{1F1F8}",india:"\u{1F1EE}\u{1F1F3}",indonesia:"\u{1F1EE}\u{1F1E9}",iran:"\u{1F1EE}\u{1F1F7}",iraq:"\u{1F1EE}\u{1F1F6}",ireland:"\u{1F1EE}\u{1F1EA}",isle_of_man:"\u{1F1EE}\u{1F1F2}",israel:"\u{1F1EE}\u{1F1F1}",it:"\u{1F1EE}\u{1F1F9}",jamaica:"\u{1F1EF}\u{1F1F2}",jp:"\u{1F1EF}\u{1F1F5}",crossed_flags:"\u{1F38C}",jersey:"\u{1F1EF}\u{1F1EA}",jordan:"\u{1F1EF}\u{1F1F4}",kazakhstan:"\u{1F1F0}\u{1F1FF}",kenya:"\u{1F1F0}\u{1F1EA}",kiribati:"\u{1F1F0}\u{1F1EE}",kosovo:"\u{1F1FD}\u{1F1F0}",kuwait:"\u{1F1F0}\u{1F1FC}",kyrgyzstan:"\u{1F1F0}\u{1F1EC}",laos:"\u{1F1F1}\u{1F1E6}",latvia:"\u{1F1F1}\u{1F1FB}",lebanon:"\u{1F1F1}\u{1F1E7}",lesotho:"\u{1F1F1}\u{1F1F8}",liberia:"\u{1F1F1}\u{1F1F7}",libya:"\u{1F1F1}\u{1F1FE}",liechtenstein:"\u{1F1F1}\u{1F1EE}",lithuania:"\u{1F1F1}\u{1F1F9}",luxembourg:"\u{1F1F1}\u{1F1FA}",macau:"\u{1F1F2}\u{1F1F4}",macedonia:"\u{1F1F2}\u{1F1F0}",madagascar:"\u{1F1F2}\u{1F1EC}",malawi:"\u{1F1F2}\u{1F1FC}",malaysia:"\u{1F1F2}\u{1F1FE}",maldives:"\u{1F1F2}\u{1F1FB}",mali:"\u{1F1F2}\u{1F1F1}",malta:"\u{1F1F2}\u{1F1F9}",marshall_islands:"\u{1F1F2}\u{1F1ED}",martinique:"\u{1F1F2}\u{1F1F6}",mauritania:"\u{1F1F2}\u{1F1F7}",mauritius:"\u{1F1F2}\u{1F1FA}",mayotte:"\u{1F1FE}\u{1F1F9}",mexico:"\u{1F1F2}\u{1F1FD}",micronesia:"\u{1F1EB}\u{1F1F2}",moldova:"\u{1F1F2}\u{1F1E9}",monaco:"\u{1F1F2}\u{1F1E8}",mongolia:"\u{1F1F2}\u{1F1F3}",montenegro:"\u{1F1F2}\u{1F1EA}",montserrat:"\u{1F1F2}\u{1F1F8}",morocco:"\u{1F1F2}\u{1F1E6}",mozambique:"\u{1F1F2}\u{1F1FF}",myanmar:"\u{1F1F2}\u{1F1F2}",namibia:"\u{1F1F3}\u{1F1E6}",nauru:"\u{1F1F3}\u{1F1F7}",nepal:"\u{1F1F3}\u{1F1F5}",netherlands:"\u{1F1F3}\u{1F1F1}",new_caledonia:"\u{1F1F3}\u{1F1E8}",new_zealand:"\u{1F1F3}\u{1F1FF}",nicaragua:"\u{1F1F3}\u{1F1EE}",niger:"\u{1F1F3}\u{1F1EA}",nigeria:"\u{1F1F3}\u{1F1EC}",niue:"\u{1F1F3}\u{1F1FA}",norfolk_island:"\u{1F1F3}\u{1F1EB}",northern_mariana_islands:"\u{1F1F2}\u{1F1F5}",north_korea:"\u{1F1F0}\u{1F1F5}",norway:"\u{1F1F3}\u{1F1F4}",oman:"\u{1F1F4}\u{1F1F2}",pakistan:"\u{1F1F5}\u{1F1F0}",palau:"\u{1F1F5}\u{1F1FC}",palestinian_territories:"\u{1F1F5}\u{1F1F8}",panama:"\u{1F1F5}\u{1F1E6}",papua_new_guinea:"\u{1F1F5}\u{1F1EC}",paraguay:"\u{1F1F5}\u{1F1FE}",peru:"\u{1F1F5}\u{1F1EA}",philippines:"\u{1F1F5}\u{1F1ED}",pitcairn_islands:"\u{1F1F5}\u{1F1F3}",poland:"\u{1F1F5}\u{1F1F1}",portugal:"\u{1F1F5}\u{1F1F9}",puerto_rico:"\u{1F1F5}\u{1F1F7}",qatar:"\u{1F1F6}\u{1F1E6}",reunion:"\u{1F1F7}\u{1F1EA}",romania:"\u{1F1F7}\u{1F1F4}",ru:"\u{1F1F7}\u{1F1FA}",rwanda:"\u{1F1F7}\u{1F1FC}",st_barthelemy:"\u{1F1E7}\u{1F1F1}",st_helena:"\u{1F1F8}\u{1F1ED}",st_kitts_nevis:"\u{1F1F0}\u{1F1F3}",st_lucia:"\u{1F1F1}\u{1F1E8}",st_pierre_miquelon:"\u{1F1F5}\u{1F1F2}",st_vincent_grenadines:"\u{1F1FB}\u{1F1E8}",samoa:"\u{1F1FC}\u{1F1F8}",san_marino:"\u{1F1F8}\u{1F1F2}",sao_tome_principe:"\u{1F1F8}\u{1F1F9}",saudi_arabia:"\u{1F1F8}\u{1F1E6}",senegal:"\u{1F1F8}\u{1F1F3}",serbia:"\u{1F1F7}\u{1F1F8}",seychelles:"\u{1F1F8}\u{1F1E8}",sierra_leone:"\u{1F1F8}\u{1F1F1}",singapore:"\u{1F1F8}\u{1F1EC}",sint_maarten:"\u{1F1F8}\u{1F1FD}",slovakia:"\u{1F1F8}\u{1F1F0}",slovenia:"\u{1F1F8}\u{1F1EE}",solomon_islands:"\u{1F1F8}\u{1F1E7}",somalia:"\u{1F1F8}\u{1F1F4}",south_africa:"\u{1F1FF}\u{1F1E6}",south_georgia_south_sandwich_islands:"\u{1F1EC}\u{1F1F8}",kr:"\u{1F1F0}\u{1F1F7}",south_sudan:"\u{1F1F8}\u{1F1F8}",es:"\u{1F1EA}\u{1F1F8}",sri_lanka:"\u{1F1F1}\u{1F1F0}",sudan:"\u{1F1F8}\u{1F1E9}",suriname:"\u{1F1F8}\u{1F1F7}",swaziland:"\u{1F1F8}\u{1F1FF}",sweden:"\u{1F1F8}\u{1F1EA}",switzerland:"\u{1F1E8}\u{1F1ED}",syria:"\u{1F1F8}\u{1F1FE}",taiwan:"\u{1F1F9}\u{1F1FC}",tajikistan:"\u{1F1F9}\u{1F1EF}",tanzania:"\u{1F1F9}\u{1F1FF}",thailand:"\u{1F1F9}\u{1F1ED}",timor_leste:"\u{1F1F9}\u{1F1F1}",togo:"\u{1F1F9}\u{1F1EC}",tokelau:"\u{1F1F9}\u{1F1F0}",tonga:"\u{1F1F9}\u{1F1F4}",trinidad_tobago:"\u{1F1F9}\u{1F1F9}",tunisia:"\u{1F1F9}\u{1F1F3}",tr:"\u{1F1F9}\u{1F1F7}",turkmenistan:"\u{1F1F9}\u{1F1F2}",turks_caicos_islands:"\u{1F1F9}\u{1F1E8}",tuvalu:"\u{1F1F9}\u{1F1FB}",uganda:"\u{1F1FA}\u{1F1EC}",ukraine:"\u{1F1FA}\u{1F1E6}",united_arab_emirates:"\u{1F1E6}\u{1F1EA}",gb:"\u{1F1EC}\u{1F1E7}",uk:"\u{1F1EC}\u{1F1E7}",us:"\u{1F1FA}\u{1F1F8}",us_virgin_islands:"\u{1F1FB}\u{1F1EE}",uruguay:"\u{1F1FA}\u{1F1FE}",uzbekistan:"\u{1F1FA}\u{1F1FF}",vanuatu:"\u{1F1FB}\u{1F1FA}",vatican_city:"\u{1F1FB}\u{1F1E6}",venezuela:"\u{1F1FB}\u{1F1EA}",vietnam:"\u{1F1FB}\u{1F1F3}",wallis_futuna:"\u{1F1FC}\u{1F1EB}",western_sahara:"\u{1F1EA}\u{1F1ED}",yemen:"\u{1F1FE}\u{1F1EA}",zambia:"\u{1F1FF}\u{1F1F2}",zimbabwe:"\u{1F1FF}\u{1F1FC}"}},function(d,h,s){d.exports={angry:[">:(",">:-("],blush:[':")',':-")'],broken_heart:["</3","<\\3"],confused:[":/",":-/"],cry:[":'(",":'-(",":,(",":,-("],frowning:[":(",":-("],heart:["<3"],imp:["]:(","]:-("],innocent:["o:)","O:)","o:-)","O:-)","0:)","0:-)"],joy:[":')",":'-)",":,)",":,-)",":'D",":'-D",":,D",":,-D"],kissing:[":*",":-*"],laughing:["x-)","X-)"],neutral_face:[":|",":-|"],open_mouth:[":o",":-o",":O",":-O"],rage:[":@",":-@"],smile:[":D",":-D"],smiley:[":)",":-)"],smiling_imp:["]:)","]:-)"],sob:[":,'(",":,'-(",";(",";-("],stuck_out_tongue:[":P",":-P"],sunglasses:["8-)","B-)"],sweat:[",:(",",:-("],sweat_smile:[",:)",",:-)"],unamused:[":s",":-S",":z",":-Z",":$",":-$"],wink:[";)",";-)"]}},function(d,h,s){function t(r){return r.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}d.exports=function(r){var e,i=r.defs;r.enabled.length&&(i=Object.keys(i).reduce(function(c,o){return r.enabled.indexOf(o)>=0&&(c[o]=i[o]),c},{})),e=Object.keys(r.shortcuts).reduce(function(c,o){return i[o]?Array.isArray(r.shortcuts[o])?(r.shortcuts[o].forEach(function(l){c[l]=o}),c):(c[r.shortcuts[o]]=o,c):c},{});var n=Object.keys(i).map(function(c){return":"+c+":"}).concat(Object.keys(e)).sort().reverse().map(function(c){return t(c)}).join("|"),a=RegExp(n),u=RegExp(n,"g");return{defs:i,shortcuts:e,scanRE:a,replaceRE:u}}},function(d,h,s){d.exports=function(t,r){return t[r].content}},function(d,h,s){d.exports=function(t,r,e,i,n){function a(l,p,_){var f,b=0,g=[];return l.replace(n,function(m,w,v){var x;if(e.hasOwnProperty(m)){if(x=e[m],w>0&&!o.test(v[w-1])||w+m.length<v.length&&!o.test(v[w+m.length]))return}else x=m.slice(1,-1);w>b&&(f=new _("text","",0),f.content=l.slice(b,w),g.push(f)),f=new _("emoji","",0),f.markup=x,f.content=r[x],g.push(f),b=w+m.length}),b<l.length&&(f=new _("text","",0),f.content=l.slice(b),g.push(f)),g}var u=t.utils.arrayReplaceAt,c=t.utils.lib.ucmicro,o=new RegExp([c.Z.source,c.P.source,c.Cc.source].join("|"));return function(l){var p,_,f,b,g,m=l.tokens,w=0;for(_=0,f=m.length;_<f;_++)if(m[_].type==="inline")for(b=m[_].children,p=b.length-1;p>=0;p--)g=b[p],g.type!=="link_open"&&g.type!=="link_close"||g.info==="auto"&&(w-=g.nesting),g.type==="text"&&w===0&&i.test(g.content)&&(m[_].children=b=u(b,p,a(g.content,g.level,l.Token)))}}},function(d,h,s){function t(o,l,p,_){var f=Number(o[l].meta.id+1).toString(),b="";return typeof _.docId=="string"&&(b="-"+_.docId+"-"),b+f}function r(o,l){var p=Number(o[l].meta.id+1).toString();return o[l].meta.subId>0&&(p+=":"+o[l].meta.subId),"["+p+"]"}function e(o,l,p,_,f){var b=f.rules.footnote_anchor_name(o,l,p,_,f),g=f.rules.footnote_caption(o,l,p,_,f),m=b;return o[l].meta.subId>0&&(m+=":"+o[l].meta.subId),'<sup class="footnote-ref"><a href="#fn'+b+'" id="fnref'+m+'">'+g+"</a></sup>"}function i(o,l,p){return(p.xhtmlOut?`<hr class="footnotes-sep" />
`:`<hr class="footnotes-sep">
`)+`<section class="footnotes">
<ol class="footnotes-list">
`}function n(){return`</ol>
</section>
`}function a(o,l,p,_,f){var b=f.rules.footnote_anchor_name(o,l,p,_,f);return o[l].meta.subId>0&&(b+=":"+o[l].meta.subId),'<li id="fn'+b+'" class="footnote-item">'}function u(){return`</li>
`}function c(o,l,p,_,f){var b=f.rules.footnote_anchor_name(o,l,p,_,f);return o[l].meta.subId>0&&(b+=":"+o[l].meta.subId),' <a href="#fnref'+b+'" class="footnote-backref">\u21A9\uFE0E</a>'}d.exports=function(o){function l(m,w,v,x){var k,C,y,A,T,L,j,S,M,F,E,q=m.bMarks[w]+m.tShift[w],O=m.eMarks[w];if(q+4>O||m.src.charCodeAt(q)!==91||m.src.charCodeAt(q+1)!==94)return!1;for(T=q+2;T<O;T++){if(m.src.charCodeAt(T)===32)return!1;if(m.src.charCodeAt(T)===93)break}if(T===q+2||T+1>=O||m.src.charCodeAt(++T)!==58)return!1;if(x)return!0;for(T++,m.env.footnotes||(m.env.footnotes={}),m.env.footnotes.refs||(m.env.footnotes.refs={}),L=m.src.slice(q+2,T-2),m.env.footnotes.refs[":"+L]=-1,j=new m.Token("footnote_reference_open","",1),j.meta={label:L},j.level=m.level++,m.tokens.push(j),k=m.bMarks[w],C=m.tShift[w],y=m.sCount[w],A=m.parentType,E=T,S=M=m.sCount[w]+T-(m.bMarks[w]+m.tShift[w]);T<O&&(F=m.src.charCodeAt(T),g(F));)F===9?M+=4-M%4:M++,T++;return m.tShift[w]=T-E,m.sCount[w]=M-S,m.bMarks[w]=E,m.blkIndent+=4,m.parentType="footnote",m.sCount[w]<m.blkIndent&&(m.sCount[w]+=m.blkIndent),m.md.block.tokenize(m,w,v,!0),m.parentType=A,m.blkIndent-=4,m.tShift[w]=C,m.sCount[w]=y,m.bMarks[w]=k,j=new m.Token("footnote_reference_close","",-1),j.level=--m.level,m.tokens.push(j),!0}function p(m,w){var v,x,k,C,y,A=m.posMax,T=m.pos;return!(T+2>=A)&&m.src.charCodeAt(T)===94&&m.src.charCodeAt(T+1)===91&&(v=T+2,!((x=b(m,T+1))<0)&&(w||(m.env.footnotes||(m.env.footnotes={}),m.env.footnotes.list||(m.env.footnotes.list=[]),k=m.env.footnotes.list.length,m.md.inline.parse(m.src.slice(v,x),m.md,m.env,y=[]),C=m.push("footnote_ref","",0),C.meta={id:k},m.env.footnotes.list[k]={content:m.src.slice(v,x),tokens:y}),m.pos=x+1,m.posMax=A,!0))}function _(m,w){var v,x,k,C,y,A=m.posMax,T=m.pos;if(T+3>A||!m.env.footnotes||!m.env.footnotes.refs||m.src.charCodeAt(T)!==91||m.src.charCodeAt(T+1)!==94)return!1;for(x=T+2;x<A;x++){if(m.src.charCodeAt(x)===32||m.src.charCodeAt(x)===10)return!1;if(m.src.charCodeAt(x)===93)break}return x!==T+2&&!(x>=A)&&(x++,v=m.src.slice(T+2,x-1),m.env.footnotes.refs[":"+v]!==void 0&&(w||(m.env.footnotes.list||(m.env.footnotes.list=[]),m.env.footnotes.refs[":"+v]<0?(k=m.env.footnotes.list.length,m.env.footnotes.list[k]={label:v,count:0},m.env.footnotes.refs[":"+v]=k):k=m.env.footnotes.refs[":"+v],C=m.env.footnotes.list[k].count,m.env.footnotes.list[k].count++,y=m.push("footnote_ref","",0),y.meta={id:k,subId:C,label:v}),m.pos=x,m.posMax=A,!0))}function f(m){var w,v,x,k,C,y,A,T,L,j,S=!1,M={};if(m.env.footnotes&&(m.tokens=m.tokens.filter(function(F){return F.type==="footnote_reference_open"?(S=!0,L=[],j=F.meta.label,!1):F.type==="footnote_reference_close"?(S=!1,M[":"+j]=L,!1):(S&&L.push(F),!S)}),m.env.footnotes.list)){for(y=m.env.footnotes.list,A=new m.Token("footnote_block_open","",1),m.tokens.push(A),w=0,v=y.length;w<v;w++){for(A=new m.Token("footnote_open","",1),A.meta={id:w,label:y[w].label},m.tokens.push(A),y[w].tokens?(T=[],A=new m.Token("paragraph_open","p",1),A.block=!0,T.push(A),A=new m.Token("inline","",0),A.children=y[w].tokens,A.content=y[w].content,T.push(A),A=new m.Token("paragraph_close","p",-1),A.block=!0,T.push(A)):y[w].label&&(T=M[":"+y[w].label]),m.tokens=m.tokens.concat(T),C=m.tokens[m.tokens.length-1].type==="paragraph_close"?m.tokens.pop():null,k=y[w].count>0?y[w].count:1,x=0;x<k;x++)A=new m.Token("footnote_anchor","",0),A.meta={id:w,subId:x,label:y[w].label},m.tokens.push(A);C&&m.tokens.push(C),A=new m.Token("footnote_close","",-1),m.tokens.push(A)}A=new m.Token("footnote_block_close","",-1),m.tokens.push(A)}}var b=o.helpers.parseLinkLabel,g=o.utils.isSpace;o.renderer.rules.footnote_ref=e,o.renderer.rules.footnote_block_open=i,o.renderer.rules.footnote_block_close=n,o.renderer.rules.footnote_open=a,o.renderer.rules.footnote_close=u,o.renderer.rules.footnote_anchor=c,o.renderer.rules.footnote_caption=r,o.renderer.rules.footnote_anchor_name=t,o.block.ruler.before("reference","footnote_def",l,{alt:["paragraph","reference"]}),o.inline.ruler.after("image","footnote_inline",p),o.inline.ruler.after("footnote_inline","footnote_ref",_),o.core.ruler.after("inline","footnote_tail",f)}},function(d,h){var s=function(t,r){r=r||{},r.highlighted===void 0&&(r.highlighted=!0),r.hljs===void 0&&(r.hljs="auto"),typeof r.langCheck!="function"&&(r.langCheck=function(){}),t.options.highlight=function(e,i){var n=r.hljs;if(r.hljs==="auto"&&(n=window.hljs),r.highlighted&&i&&n){if(n.getLanguage(i))return'<pre><div class="hljs"><code class="'+t.options.langPrefix+i+'">'+n.highlight(i,e,!0).value+"</code></div></pre>";typeof r.langCheck=="function"&&r.langCheck(i)}return'<pre><code class="'+t.options.langPrefix+i+'">'+t.utils.escapeHtml(e)+"</code></pre>"}};d.exports=s},function(d,h){d.exports=function(s,t){s.image_add=function(e,i){s.__image instanceof Object||(s.__image={}),s.__image[e]=i},s.image_del=function(e){s.__image instanceof Object||(s.__image={}),delete s.__image[e]};var r=s.renderer.rules.image;s.renderer.rules.image=function(e,i,n,a,u){var c=e[i].attrs;if(s.__image instanceof Object){for(var o=0;o<c.length;o++)if(c[o][0]=="src"&&s.__image.hasOwnProperty(e[i].attrs[o][1])){c.push(["rel",c[o][1]]),c[o][1]=s.__image[e[i].attrs[o][1]];break}}return r(e,i,n,a,u)}}},function(d,h,s){d.exports=function(t){function r(i,n){var a,u,c,o,l,p=i.pos,_=i.src.charCodeAt(p);if(n||_!==43||(u=i.scanDelims(i.pos,!0),o=u.length,l=String.fromCharCode(_),o<2))return!1;for(o%2&&(c=i.push("text","",0),c.content=l,o--),a=0;a<o;a+=2)c=i.push("text","",0),c.content=l+l,i.delimiters.push({marker:_,jump:a,token:i.tokens.length-1,level:i.level,end:-1,open:u.can_open,close:u.can_close});return i.pos+=u.length,!0}function e(i){var n,a,u,c,o,l=[],p=i.delimiters,_=i.delimiters.length;for(n=0;n<_;n++)u=p[n],u.marker===43&&u.end!==-1&&(c=p[u.end],o=i.tokens[u.token],o.type="ins_open",o.tag="ins",o.nesting=1,o.markup="++",o.content="",o=i.tokens[c.token],o.type="ins_close",o.tag="ins",o.nesting=-1,o.markup="++",o.content="",i.tokens[c.token-1].type==="text"&&i.tokens[c.token-1].content==="+"&&l.push(c.token-1));for(;l.length;){for(n=l.pop(),a=n+1;a<i.tokens.length&&i.tokens[a].type==="ins_close";)a++;a--,n!==a&&(o=i.tokens[a],i.tokens[a]=i.tokens[n],i.tokens[n]=o)}}t.inline.ruler.before("emphasis","ins",r),t.inline.ruler2.before("emphasis","ins",e)}},function(d,h,s){function t(n,a){var u,c,o=n.posMax,l=!0,p=!0;return u=a>0?n.src.charCodeAt(a-1):-1,c=a+1<=o?n.src.charCodeAt(a+1):-1,(u===32||u===9||c>=48&&c<=57)&&(p=!1),c!==32&&c!==9||(l=!1),{can_open:l,can_close:p}}function r(n,a){if(!i&&window.katex&&(i=window.katex),!i)return!1;var u,c,o,l,p;if(n.src[n.pos]!=="$")return!1;if(l=t(n,n.pos),!l.can_open)return a||(n.pending+="$"),n.pos+=1,!0;for(u=n.pos+1,c=u;(c=n.src.indexOf("$",c))!==-1;){for(p=c-1;n.src[p]==="\\";)p-=1;if((c-p)%2==1)break;c+=1}return c===-1?(a||(n.pending+="$"),n.pos=u,!0):c-u==0?(a||(n.pending+="$$"),n.pos=u+1,!0):(l=t(n,c),l.can_close?(a||(o=n.push("math_inline","math",0),o.markup="$",o.content=n.src.slice(u,c)),n.pos=c+1,!0):(a||(n.pending+="$"),n.pos=u,!0))}function e(n,a,u,c){if(!i&&window.katex&&(i=window.katex),!i)return!1;var o,l,p,_,f,b=!1,g=n.bMarks[a]+n.tShift[a],m=n.eMarks[a];if(g+2>m||n.src.slice(g,g+2)!=="$$")return!1;if(g+=2,o=n.src.slice(g,m),c)return!0;for(o.trim().slice(-2)==="$$"&&(o=o.trim().slice(0,-2),b=!0),p=a;!b&&!(++p>=u)&&(g=n.bMarks[p]+n.tShift[p],m=n.eMarks[p],!(g<m&&n.tShift[p]<n.blkIndent));)n.src.slice(g,m).trim().slice(-2)==="$$"&&(_=n.src.slice(0,m).lastIndexOf("$$"),l=n.src.slice(g,_),b=!0);return n.line=p+1,f=n.push("math_block","math",0),f.block=!0,f.content=(o&&o.trim()?o+`
`:"")+n.getLines(a+1,p,n.tShift[a],!0)+(l&&l.trim()?l:""),f.map=[a,n.line],f.markup="$$",!0}var i=null;d.exports=function(n,a){a=a||{};var u=function(p){!i&&window.katex&&(i=window.katex),a.displayMode=!1;try{return i.renderToString(p,a)}catch(_){return a.throwOnError&&console.log(_),p}},c=function(p,_){return u(p[_].content)},o=function(p){!i&&window.katex&&(i=window.katex),a.displayMode=!0;try{return"<p>"+i.renderToString(p,a)+"</p>"}catch(_){return a.throwOnError&&console.log(_),p}},l=function(p,_){return o(p[_].content)+`
`};n.inline.ruler.after("escape","math_inline",r),n.block.ruler.after("blockquote","math_block",e,{alt:["paragraph","reference","blockquote","list"]}),n.renderer.rules.math_inline=c,n.renderer.rules.math_block=l}},function(d,h,s){d.exports=function(t){function r(i,n){var a,u,c,o,l,p=i.pos,_=i.src.charCodeAt(p);if(n||_!==61||(u=i.scanDelims(i.pos,!0),o=u.length,l=String.fromCharCode(_),o<2))return!1;for(o%2&&(c=i.push("text","",0),c.content=l,o--),a=0;a<o;a+=2)c=i.push("text","",0),c.content=l+l,i.delimiters.push({marker:_,jump:a,token:i.tokens.length-1,level:i.level,end:-1,open:u.can_open,close:u.can_close});return i.pos+=u.length,!0}function e(i){var n,a,u,c,o,l=[],p=i.delimiters,_=i.delimiters.length;for(n=0;n<_;n++)u=p[n],u.marker===61&&u.end!==-1&&(c=p[u.end],o=i.tokens[u.token],o.type="mark_open",o.tag="mark",o.nesting=1,o.markup="==",o.content="",o=i.tokens[c.token],o.type="mark_close",o.tag="mark",o.nesting=-1,o.markup="==",o.content="",i.tokens[c.token-1].type==="text"&&i.tokens[c.token-1].content==="="&&l.push(c.token-1));for(;l.length;){for(n=l.pop(),a=n+1;a<i.tokens.length&&i.tokens[a].type==="mark_close";)a++;a--,n!==a&&(o=i.tokens[a],i.tokens[a]=i.tokens[n],i.tokens[n]=o)}}t.inline.ruler.before("emphasis","mark",r),t.inline.ruler2.before("emphasis","mark",e)}},function(d,h,s){function t(e,i){var n,a,u,c=e.posMax,o=e.pos;if(e.src.charCodeAt(o)!==126||i||o+2>=c)return!1;for(e.pos=o+1;e.pos<c;){if(e.src.charCodeAt(e.pos)===126){n=!0;break}e.md.inline.skipToken(e)}return n&&o+1!==e.pos?(a=e.src.slice(o+1,e.pos),a.match(/(^|[^\\])(\\\\)*\s/)?(e.pos=o,!1):(e.posMax=e.pos,e.pos=o+1,u=e.push("sub_open","sub",1),u.markup="~",u=e.push("text","",0),u.content=a.replace(r,"$1"),u=e.push("sub_close","sub",-1),u.markup="~",e.pos=e.posMax+1,e.posMax=c,!0)):(e.pos=o,!1)}var r=/\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;d.exports=function(e){e.inline.ruler.after("emphasis","sub",t)}},function(d,h,s){function t(e,i){var n,a,u,c=e.posMax,o=e.pos;if(e.src.charCodeAt(o)!==94||i||o+2>=c)return!1;for(e.pos=o+1;e.pos<c;){if(e.src.charCodeAt(e.pos)===94){n=!0;break}e.md.inline.skipToken(e)}return n&&o+1!==e.pos?(a=e.src.slice(o+1,e.pos),a.match(/(^|[^\\])(\\\\)*\s/)?(e.pos=o,!1):(e.posMax=e.pos,e.pos=o+1,u=e.push("sup_open","sup",1),u.markup="^",u=e.push("text","",0),u.content=a.replace(r,"$1"),u=e.push("sup_close","sup",-1),u.markup="^",e.pos=e.posMax+1,e.posMax=c,!0)):(e.pos=o,!1)}var r=/\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;d.exports=function(e){e.inline.ruler.after("emphasis","sup",t)}},function(d,h){function s(g,m,w){var v=g.attrIndex(m),x=[m,w];v<0?g.attrPush(x):g.attrs[v]=x}function t(g,m){for(var w=g[m].level-1,v=m-1;v>=0;v--)if(g[v].level===w)return v;return-1}function r(g,m){return c(g[m])&&o(g[m-1])&&l(g[m-2])&&p(g[m])}function e(g,m){if(g.children.unshift(i(g,m)),g.children[1].content=g.children[1].content.slice(3),g.content=g.content.slice(3),f)if(b){g.children.pop();var w="task-item-"+Math.ceil(1e7*Math.random()-1e3);g.children[0].content=g.children[0].content.slice(0,-1)+' id="'+w+'">',g.children.push(u(g.content,w,m))}else g.children.unshift(n(m)),g.children.push(a(m))}function i(g,m){var w=new m("html_inline","",0),v=_?' disabled="" ':"";return g.content.indexOf("[ ] ")===0?w.content='<input class="task-list-item-checkbox"'+v+'type="checkbox">':g.content.indexOf("[x] ")!==0&&g.content.indexOf("[X] ")!==0||(w.content='<input class="task-list-item-checkbox" checked=""'+v+'type="checkbox">'),w}function n(g){var m=new g("html_inline","",0);return m.content="<label>",m}function a(g){var m=new g("html_inline","",0);return m.content="</label>",m}function u(g,m,w){var v=new w("html_inline","",0);return v.content='<label class="task-list-item-label" for="'+m+'">'+g+"</label>",v.attrs=[{for:m}],v}function c(g){return g.type==="inline"}function o(g){return g.type==="paragraph_open"}function l(g){return g.type==="list_item_open"}function p(g){return g.content.indexOf("[ ] ")===0||g.content.indexOf("[x] ")===0||g.content.indexOf("[X] ")===0}var _=!0,f=!1,b=!1;d.exports=function(g,m){m&&(_=!m.enabled,f=!!m.label,b=!!m.labelAfter),g.core.ruler.after("inline","github-task-lists",function(w){for(var v=w.tokens,x=2;x<v.length;x++)r(v,x)&&(e(v[x],w.Token),s(v[x-2],"class","task-list-item"+(_?"":" enabled")),s(v[t(v,x-2)],"class","contains-task-list"))})}},function(d,h,s){d.exports=function(t){function r(u,c){for(;u.src.indexOf(`
`)>=0&&u.src.indexOf(`
`)<u.src.indexOf("@[toc]");)u.tokens.slice(-1)[0].type==="softbreak"&&(u.src=u.src.split(`
`).slice(1).join(`
`),u.pos=0);var o;if(u.src.charCodeAt(u.pos)!==64||u.src.charCodeAt(u.pos+1)!==91)return!1;var l=i.exec(u.src);if(!l||(l=l.filter(function(b){return b}),l.length<1)||c)return!1;o=u.push("toc_open","toc",1),o.markup="@[toc]",o=u.push("toc_body","",0);var p=n;l.length>1&&(p=l.pop()),o.content=p,o=u.push("toc_close","toc",-1);var _=0,f=u.src.indexOf(`
`);return _=f!==-1?u.pos+f:u.pos+u.posMax+1,u.pos=_,!0}var e,i=/^@\[toc\](?:\((?:\s+)?([^\)]+)(?:\s+)?\)?)?(?:\s+?)?$/im,n="Table of Contents",a=function(u){return u.replace(/[^\w\s]/gi,"").split(" ").join("_")};t.renderer.rules.heading_open=function(u,c){var o=u[c].tag,l=u[c+1];return l.type==="inline"?"<"+o+'><a id="'+(a(l.content)+"_"+l.map[0])+'"></a>':"</h1>"},t.renderer.rules.toc_open=function(u,c){return""},t.renderer.rules.toc_close=function(u,c){return""},t.renderer.rules.toc_body=function(u,c){for(var o=[],l=e.tokens,p=l.length,_=0;_<p;_++)if(l[_].type==="heading_close"){var f=l[_],b=l[_-1];b.type==="inline"&&o.push({level:+f.tag.substr(1,1),anchor:a(b.content)+"_"+b.map[0],content:b.content})}var g=0,m=o.map(function(w){var v=[];if(w.level>g)for(var x=w.level-g,k=0;k<x;k++)v.push("<ul>"),g++;else if(w.level<g)for(var x=g-w.level,k=0;k<x;k++)v.push("</ul>"),g--;return v=v.concat(['<li><a href="#',w.anchor,'">',w.content,"</a></li>"]),v.join("")});return"<h3>"+u[c].content+"</h3>"+m.join("")+new Array(g+1).join("</ul>")},t.core.ruler.push("grab_state",function(u){e=u}),t.inline.ruler.after("emphasis","toc",r)}},function(d,h,s){d.exports=s(143)},function(d,h,s){d.exports=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","meta","nav","noframes","ol","optgroup","option","p","param","section","source","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"]},function(d,h,s){h.parseLinkLabel=s(141),h.parseLinkDestination=s(140),h.parseLinkTitle=s(142)},function(d,h,s){var t=s(0).unescapeAll;d.exports=function(r,e,i){var n,a,u=e,c={ok:!1,pos:0,lines:0,str:""};if(r.charCodeAt(e)===60){for(e++;e<i;){if((n=r.charCodeAt(e))===10)return c;if(n===62)return c.pos=e+1,c.str=t(r.slice(u+1,e)),c.ok=!0,c;n===92&&e+1<i?e+=2:e++}return c}for(a=0;e<i&&(n=r.charCodeAt(e))!==32&&!(n<32||n===127);)if(n===92&&e+1<i)e+=2;else{if(n===40&&a++,n===41){if(a===0)break;a--}e++}return u===e||a!==0||(c.str=t(r.slice(u,e)),c.lines=0,c.pos=e,c.ok=!0),c}},function(d,h,s){d.exports=function(t,r,e){var i,n,a,u,c=-1,o=t.posMax,l=t.pos;for(t.pos=r+1,i=1;t.pos<o;){if((a=t.src.charCodeAt(t.pos))===93&&--i===0){n=!0;break}if(u=t.pos,t.md.inline.skipToken(t),a===91){if(u===t.pos-1)i++;else if(e)return t.pos=l,-1}}return n&&(c=t.pos),t.pos=l,c}},function(d,h,s){var t=s(0).unescapeAll;d.exports=function(r,e,i){var n,a,u=0,c=e,o={ok:!1,pos:0,lines:0,str:""};if(e>=i||(a=r.charCodeAt(e))!==34&&a!==39&&a!==40)return o;for(e++,a===40&&(a=41);e<i;){if((n=r.charCodeAt(e))===a)return o.pos=e+1,o.lines=u,o.str=t(r.slice(c+1,e)),o.ok=!0,o;n===10?u++:n===92&&e+1<i&&(e++,r.charCodeAt(e)===10&&u++),e++}return o}},function(d,h,s){function t(v){var x=v.trim().toLowerCase();return!g.test(x)||!!m.test(x)}function r(v){var x=_.parse(v,!0);if(x.hostname&&(!x.protocol||w.indexOf(x.protocol)>=0))try{x.hostname=f.toASCII(x.hostname)}catch{}return _.encode(_.format(x))}function e(v){var x=_.parse(v,!0);if(x.hostname&&(!x.protocol||w.indexOf(x.protocol)>=0))try{x.hostname=f.toUnicode(x.hostname)}catch{}return _.decode(_.format(x))}function i(v,x){if(!(this instanceof i))return new i(v,x);x||n.isString(v)||(x=v||{},v="default"),this.inline=new l,this.block=new o,this.core=new c,this.renderer=new u,this.linkify=new p,this.validateLink=t,this.normalizeLink=r,this.normalizeLinkText=e,this.utils=n,this.helpers=n.assign({},a),this.options={},this.configure(v),x&&this.set(x)}var n=s(0),a=s(139),u=s(150),c=s(145),o=s(144),l=s(146),p=s(116),_=s(56),f=s(186),b={default:s(148),zero:s(149),commonmark:s(147)},g=/^(vbscript|javascript|file|data):/,m=/^data:image\/(gif|png|jpeg|webp);/,w=["http:","https:","mailto:"];i.prototype.set=function(v){return n.assign(this.options,v),this},i.prototype.configure=function(v){var x,k=this;if(n.isString(v)&&(x=v,!(v=b[x])))throw new Error('Wrong `markdown-it` preset "'+x+'", check name');if(!v)throw new Error("Wrong `markdown-it` preset, can't be empty");return v.options&&k.set(v.options),v.components&&Object.keys(v.components).forEach(function(C){v.components[C].rules&&k[C].ruler.enableOnly(v.components[C].rules),v.components[C].rules2&&k[C].ruler2.enableOnly(v.components[C].rules2)}),this},i.prototype.enable=function(v,x){var k=[];Array.isArray(v)||(v=[v]),["core","block","inline"].forEach(function(y){k=k.concat(this[y].ruler.enable(v,!0))},this),k=k.concat(this.inline.ruler2.enable(v,!0));var C=v.filter(function(y){return k.indexOf(y)<0});if(C.length&&!x)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+C);return this},i.prototype.disable=function(v,x){var k=[];Array.isArray(v)||(v=[v]),["core","block","inline"].forEach(function(y){k=k.concat(this[y].ruler.disable(v,!0))},this),k=k.concat(this.inline.ruler2.disable(v,!0));var C=v.filter(function(y){return k.indexOf(y)<0});if(C.length&&!x)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+C);return this},i.prototype.use=function(v){var x=[this].concat(Array.prototype.slice.call(arguments,1));return v.apply(v,x),this},i.prototype.parse=function(v,x){if(typeof v!="string")throw new Error("Input data should be a String");var k=new this.core.State(v,this,x);return this.core.process(k),k.tokens},i.prototype.render=function(v,x){return x=x||{},this.renderer.render(this.parse(v,x),this.options,x)},i.prototype.parseInline=function(v,x){var k=new this.core.State(v,this,x);return k.inlineMode=!0,this.core.process(k),k.tokens},i.prototype.renderInline=function(v,x){return x=x||{},this.renderer.render(this.parseInline(v,x),this.options,x)},d.exports=i},function(d,h,s){function t(){this.ruler=new r;for(var i=0;i<e.length;i++)this.ruler.push(e[i][0],e[i][1],{alt:(e[i][2]||[]).slice()})}var r=s(32),e=[["table",s(162),["paragraph","reference"]],["code",s(152)],["fence",s(153),["paragraph","reference","blockquote","list"]],["blockquote",s(151),["paragraph","reference","blockquote","list"]],["hr",s(155),["paragraph","reference","blockquote","list"]],["list",s(158),["paragraph","reference","blockquote"]],["reference",s(160)],["heading",s(154),["paragraph","reference","blockquote"]],["lheading",s(157)],["html_block",s(156),["paragraph","reference","blockquote"]],["paragraph",s(159)]];t.prototype.tokenize=function(i,n,a){for(var u,c=this.ruler.getRules(""),o=c.length,l=n,p=!1,_=i.md.options.maxNesting;l<a&&(i.line=l=i.skipEmptyLines(l),!(l>=a))&&!(i.sCount[l]<i.blkIndent);){if(i.level>=_){i.line=a;break}for(u=0;u<o&&!c[u](i,l,a,!1);u++);i.tight=!p,i.isEmpty(i.line-1)&&(p=!0),(l=i.line)<a&&i.isEmpty(l)&&(p=!0,l++,i.line=l)}},t.prototype.parse=function(i,n,a,u){var c;i&&(c=new this.State(i,n,a,u),this.tokenize(c,c.line,c.lineMax))},t.prototype.State=s(161),d.exports=t},function(d,h,s){function t(){this.ruler=new r;for(var i=0;i<e.length;i++)this.ruler.push(e[i][0],e[i][1])}var r=s(32),e=[["normalize",s(166)],["block",s(163)],["inline",s(164)],["linkify",s(165)],["replacements",s(167)],["smartquotes",s(168)]];t.prototype.process=function(i){var n,a,u;for(u=this.ruler.getRules(""),n=0,a=u.length;n<a;n++)u[n](i)},t.prototype.State=s(169),d.exports=t},function(d,h,s){function t(){var n;for(this.ruler=new r,n=0;n<e.length;n++)this.ruler.push(e[n][0],e[n][1]);for(this.ruler2=new r,n=0;n<i.length;n++)this.ruler2.push(i[n][0],i[n][1])}var r=s(32),e=[["text",s(180)],["newline",s(178)],["escape",s(174)],["backticks",s(171)],["strikethrough",s(55).tokenize],["emphasis",s(54).tokenize],["link",s(177)],["image",s(176)],["autolink",s(170)],["html_inline",s(175)],["entity",s(173)]],i=[["balance_pairs",s(172)],["strikethrough",s(55).postProcess],["emphasis",s(54).postProcess],["text_collapse",s(181)]];t.prototype.skipToken=function(n){var a,u,c=n.pos,o=this.ruler.getRules(""),l=o.length,p=n.md.options.maxNesting,_=n.cache;if(_[c]!==void 0)return void(n.pos=_[c]);if(n.level<p)for(u=0;u<l&&(n.level++,a=o[u](n,!0),n.level--,!a);u++);else n.pos=n.posMax;a||n.pos++,_[c]=n.pos},t.prototype.tokenize=function(n){for(var a,u,c=this.ruler.getRules(""),o=c.length,l=n.posMax,p=n.md.options.maxNesting;n.pos<l;){if(n.level<p)for(u=0;u<o&&!(a=c[u](n,!1));u++);if(a){if(n.pos>=l)break}else n.pending+=n.src[n.pos++]}n.pending&&n.pushPending()},t.prototype.parse=function(n,a,u,c){var o,l,p,_=new this.State(n,a,u,c);for(this.tokenize(_),l=this.ruler2.getRules(""),p=l.length,o=0;o<p;o++)l[o](_)},t.prototype.State=s(179),d.exports=t},function(d,h,s){d.exports={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"\u201C\u201D\u2018\u2019",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","text_collapse"]}}}},function(d,h,s){d.exports={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"\u201C\u201D\u2018\u2019",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}}},function(d,h,s){d.exports={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"\u201C\u201D\u2018\u2019",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","text_collapse"]}}}},function(d,h,s){function t(){this.rules=r({},n)}var r=s(0).assign,e=s(0).unescapeAll,i=s(0).escapeHtml,n={};n.code_inline=function(a,u,c,o,l){var p=a[u];return"<code"+l.renderAttrs(p)+">"+i(a[u].content)+"</code>"},n.code_block=function(a,u,c,o,l){var p=a[u];return"<pre"+l.renderAttrs(p)+"><code>"+i(a[u].content)+`</code></pre>
`},n.fence=function(a,u,c,o,l){var p,_,f,b,g=a[u],m=g.info?e(g.info).trim():"",w="";return m&&(w=m.split(/\s+/g)[0]),p=c.highlight&&c.highlight(g.content,w)||i(g.content),p.indexOf("<pre")===0?p+`
`:m?(_=g.attrIndex("class"),f=g.attrs?g.attrs.slice():[],_<0?f.push(["class",c.langPrefix+w]):f[_][1]+=" "+c.langPrefix+w,b={attrs:f},"<pre><code"+l.renderAttrs(b)+">"+p+`</code></pre>
`):"<pre><code"+l.renderAttrs(g)+">"+p+`</code></pre>
`},n.image=function(a,u,c,o,l){var p=a[u];return p.attrs[p.attrIndex("alt")][1]=l.renderInlineAsText(p.children,c,o),l.renderToken(a,u,c)},n.hardbreak=function(a,u,c){return c.xhtmlOut?`<br />
`:`<br>
`},n.softbreak=function(a,u,c){return c.breaks?c.xhtmlOut?`<br />
`:`<br>
`:`
`},n.text=function(a,u){return i(a[u].content)},n.html_block=function(a,u){return a[u].content},n.html_inline=function(a,u){return a[u].content},t.prototype.renderAttrs=function(a){var u,c,o;if(!a.attrs)return"";for(o="",u=0,c=a.attrs.length;u<c;u++)o+=" "+i(a.attrs[u][0])+'="'+i(a.attrs[u][1])+'"';return o},t.prototype.renderToken=function(a,u,c){var o,l="",p=!1,_=a[u];return _.hidden?"":(_.block&&_.nesting!==-1&&u&&a[u-1].hidden&&(l+=`
`),l+=(_.nesting===-1?"</":"<")+_.tag,l+=this.renderAttrs(_),_.nesting===0&&c.xhtmlOut&&(l+=" /"),_.block&&(p=!0,_.nesting===1&&u+1<a.length&&(o=a[u+1],(o.type==="inline"||o.hidden||o.nesting===-1&&o.tag===_.tag)&&(p=!1))),l+=p?`>
`:">")},t.prototype.renderInline=function(a,u,c){for(var o,l="",p=this.rules,_=0,f=a.length;_<f;_++)o=a[_].type,p[o]!==void 0?l+=p[o](a,_,u,c,this):l+=this.renderToken(a,_,u);return l},t.prototype.renderInlineAsText=function(a,u,c){for(var o="",l=0,p=a.length;l<p;l++)a[l].type==="text"?o+=a[l].content:a[l].type==="image"&&(o+=this.renderInlineAsText(a[l].children,u,c));return o},t.prototype.render=function(a,u,c){var o,l,p,_="",f=this.rules;for(o=0,l=a.length;o<l;o++)p=a[o].type,p==="inline"?_+=this.renderInline(a[o].children,u,c):f[p]!==void 0?_+=f[a[o].type](a,o,u,c,this):_+=this.renderToken(a,o,u,c);return _},d.exports=t},function(d,h,s){var t=s(0).isSpace;d.exports=function(r,e,i,n){var a,u,c,o,l,p,_,f,b,g,m,w,v,x,k,C,y,A,T,L,j=r.lineMax,S=r.bMarks[e]+r.tShift[e],M=r.eMarks[e];if(r.sCount[e]-r.blkIndent>=4||r.src.charCodeAt(S++)!==62)return!1;if(n)return!0;for(o=b=r.sCount[e]+S-(r.bMarks[e]+r.tShift[e]),r.src.charCodeAt(S)===32?(S++,o++,b++,a=!1,C=!0):r.src.charCodeAt(S)===9?(C=!0,(r.bsCount[e]+b)%4==3?(S++,o++,b++,a=!1):a=!0):C=!1,g=[r.bMarks[e]],r.bMarks[e]=S;S<M&&(u=r.src.charCodeAt(S),t(u));)u===9?b+=4-(b+r.bsCount[e]+(a?1:0))%4:b++,S++;for(m=[r.bsCount[e]],r.bsCount[e]=r.sCount[e]+1+(C?1:0),p=S>=M,x=[r.sCount[e]],r.sCount[e]=b-o,k=[r.tShift[e]],r.tShift[e]=S-r.bMarks[e],A=r.md.block.ruler.getRules("blockquote"),v=r.parentType,r.parentType="blockquote",L=!1,f=e+1;f<i&&(r.sCount[f]<r.blkIndent&&(L=!0),S=r.bMarks[f]+r.tShift[f],M=r.eMarks[f],!(S>=M));f++)if(r.src.charCodeAt(S++)!==62||L){if(p)break;for(y=!1,c=0,l=A.length;c<l;c++)if(A[c](r,f,i,!0)){y=!0;break}if(y){r.lineMax=f,r.blkIndent!==0&&(g.push(r.bMarks[f]),m.push(r.bsCount[f]),k.push(r.tShift[f]),x.push(r.sCount[f]),r.sCount[f]-=r.blkIndent);break}g.push(r.bMarks[f]),m.push(r.bsCount[f]),k.push(r.tShift[f]),x.push(r.sCount[f]),r.sCount[f]=-1}else{for(o=b=r.sCount[f]+S-(r.bMarks[f]+r.tShift[f]),r.src.charCodeAt(S)===32?(S++,o++,b++,a=!1,C=!0):r.src.charCodeAt(S)===9?(C=!0,(r.bsCount[f]+b)%4==3?(S++,o++,b++,a=!1):a=!0):C=!1,g.push(r.bMarks[f]),r.bMarks[f]=S;S<M&&(u=r.src.charCodeAt(S),t(u));)u===9?b+=4-(b+r.bsCount[f]+(a?1:0))%4:b++,S++;p=S>=M,m.push(r.bsCount[f]),r.bsCount[f]=r.sCount[f]+1+(C?1:0),x.push(r.sCount[f]),r.sCount[f]=b-o,k.push(r.tShift[f]),r.tShift[f]=S-r.bMarks[f]}for(w=r.blkIndent,r.blkIndent=0,T=r.push("blockquote_open","blockquote",1),T.markup=">",T.map=_=[e,0],r.md.block.tokenize(r,e,f),T=r.push("blockquote_close","blockquote",-1),T.markup=">",r.lineMax=j,r.parentType=v,_[1]=r.line,c=0;c<k.length;c++)r.bMarks[c+e]=g[c],r.tShift[c+e]=k[c],r.sCount[c+e]=x[c],r.bsCount[c+e]=m[c];return r.blkIndent=w,!0}},function(d,h,s){d.exports=function(t,r,e){var i,n,a;if(t.sCount[r]-t.blkIndent<4)return!1;for(n=i=r+1;i<e;)if(t.isEmpty(i))i++;else{if(!(t.sCount[i]-t.blkIndent>=4))break;i++,n=i}return t.line=n,a=t.push("code_block","code",0),a.content=t.getLines(r,n,4+t.blkIndent,!0),a.map=[r,t.line],!0}},function(d,h,s){d.exports=function(t,r,e,i){var n,a,u,c,o,l,p,_=!1,f=t.bMarks[r]+t.tShift[r],b=t.eMarks[r];if(t.sCount[r]-t.blkIndent>=4||f+3>b||(n=t.src.charCodeAt(f))!==126&&n!==96||(o=f,f=t.skipChars(f,n),(a=f-o)<3)||(p=t.src.slice(o,f),u=t.src.slice(f,b),n===96&&u.indexOf(String.fromCharCode(n))>=0))return!1;if(i)return!0;for(c=r;!(++c>=e)&&(f=o=t.bMarks[c]+t.tShift[c],b=t.eMarks[c],!(f<b&&t.sCount[c]<t.blkIndent));)if(t.src.charCodeAt(f)===n&&!(t.sCount[c]-t.blkIndent>=4||(f=t.skipChars(f,n))-o<a||(f=t.skipSpaces(f))<b)){_=!0;break}return a=t.sCount[r],t.line=c+(_?1:0),l=t.push("fence","code",0),l.info=u,l.content=t.getLines(r+1,c,a,!0),l.markup=p,l.map=[r,t.line],!0}},function(d,h,s){var t=s(0).isSpace;d.exports=function(r,e,i,n){var a,u,c,o,l=r.bMarks[e]+r.tShift[e],p=r.eMarks[e];if(r.sCount[e]-r.blkIndent>=4||(a=r.src.charCodeAt(l))!==35||l>=p)return!1;for(u=1,a=r.src.charCodeAt(++l);a===35&&l<p&&u<=6;)u++,a=r.src.charCodeAt(++l);return!(u>6||l<p&&!t(a))&&(!!n||(p=r.skipSpacesBack(p,l),c=r.skipCharsBack(p,35,l),c>l&&t(r.src.charCodeAt(c-1))&&(p=c),r.line=e+1,o=r.push("heading_open","h"+String(u),1),o.markup="########".slice(0,u),o.map=[e,r.line],o=r.push("inline","",0),o.content=r.src.slice(l,p).trim(),o.map=[e,r.line],o.children=[],o=r.push("heading_close","h"+String(u),-1),o.markup="########".slice(0,u),!0))}},function(d,h,s){var t=s(0).isSpace;d.exports=function(r,e,i,n){var a,u,c,o,l=r.bMarks[e]+r.tShift[e],p=r.eMarks[e];if(r.sCount[e]-r.blkIndent>=4||(a=r.src.charCodeAt(l++))!==42&&a!==45&&a!==95)return!1;for(u=1;l<p;){if((c=r.src.charCodeAt(l++))!==a&&!t(c))return!1;c===a&&u++}return!(u<3)&&(!!n||(r.line=e+1,o=r.push("hr","hr",0),o.map=[e,r.line],o.markup=Array(u+1).join(String.fromCharCode(a)),!0))}},function(d,h,s){var t=s(138),r=s(53).HTML_OPEN_CLOSE_TAG_RE,e=[[/^<(script|pre|style)(?=(\s|>|$))/i,/<\/(script|pre|style)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+t.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(r.source+"\\s*$"),/^$/,!1]];d.exports=function(i,n,a,u){var c,o,l,p,_=i.bMarks[n]+i.tShift[n],f=i.eMarks[n];if(i.sCount[n]-i.blkIndent>=4||!i.md.options.html||i.src.charCodeAt(_)!==60)return!1;for(p=i.src.slice(_,f),c=0;c<e.length&&!e[c][0].test(p);c++);if(c===e.length)return!1;if(u)return e[c][2];if(o=n+1,!e[c][1].test(p)){for(;o<a&&!(i.sCount[o]<i.blkIndent);o++)if(_=i.bMarks[o]+i.tShift[o],f=i.eMarks[o],p=i.src.slice(_,f),e[c][1].test(p)){p.length!==0&&o++;break}}return i.line=o,l=i.push("html_block","",0),l.map=[n,o],l.content=i.getLines(n,o,i.blkIndent,!0),!0}},function(d,h,s){d.exports=function(t,r,e){var i,n,a,u,c,o,l,p,_,f,b=r+1,g=t.md.block.ruler.getRules("paragraph");if(t.sCount[r]-t.blkIndent>=4)return!1;for(f=t.parentType,t.parentType="paragraph";b<e&&!t.isEmpty(b);b++)if(!(t.sCount[b]-t.blkIndent>3)){if(t.sCount[b]>=t.blkIndent&&(o=t.bMarks[b]+t.tShift[b],l=t.eMarks[b],o<l&&((_=t.src.charCodeAt(o))===45||_===61)&&(o=t.skipChars(o,_),(o=t.skipSpaces(o))>=l))){p=_===61?1:2;break}if(!(t.sCount[b]<0)){for(n=!1,a=0,u=g.length;a<u;a++)if(g[a](t,b,e,!0)){n=!0;break}if(n)break}}return!!p&&(i=t.getLines(r,b,t.blkIndent,!1).trim(),t.line=b+1,c=t.push("heading_open","h"+String(p),1),c.markup=String.fromCharCode(_),c.map=[r,t.line],c=t.push("inline","",0),c.content=i,c.map=[r,t.line-1],c.children=[],c=t.push("heading_close","h"+String(p),-1),c.markup=String.fromCharCode(_),t.parentType=f,!0)}},function(d,h,s){function t(n,a){var u,c,o,l;return c=n.bMarks[a]+n.tShift[a],o=n.eMarks[a],u=n.src.charCodeAt(c++),u!==42&&u!==45&&u!==43||c<o&&(l=n.src.charCodeAt(c),!i(l))?-1:c}function r(n,a){var u,c=n.bMarks[a]+n.tShift[a],o=c,l=n.eMarks[a];if(o+1>=l||(u=n.src.charCodeAt(o++))<48||u>57)return-1;for(;;){if(o>=l)return-1;u=n.src.charCodeAt(o++);{if(!(u>=48&&u<=57)){if(u===41||u===46)break;return-1}if(o-c>=10)return-1}}return o<l&&(u=n.src.charCodeAt(o),!i(u))?-1:o}function e(n,a){var u,c,o=n.level+2;for(u=a+2,c=n.tokens.length-2;u<c;u++)n.tokens[u].level===o&&n.tokens[u].type==="paragraph_open"&&(n.tokens[u+2].hidden=!0,n.tokens[u].hidden=!0,u+=2)}var i=s(0).isSpace;d.exports=function(n,a,u,c){var o,l,p,_,f,b,g,m,w,v,x,k,C,y,A,T,L,j,S,M,F,E,q,O,P,D,z,$,R=!1,B=!0;if(n.sCount[a]-n.blkIndent>=4||n.listIndent>=0&&n.sCount[a]-n.listIndent>=4&&n.sCount[a]<n.blkIndent)return!1;if(c&&n.parentType==="paragraph"&&n.tShift[a]>=n.blkIndent&&(R=!0),(q=r(n,a))>=0){if(g=!0,P=n.bMarks[a]+n.tShift[a],C=Number(n.src.substr(P,q-P-1)),R&&C!==1)return!1}else{if(!((q=t(n,a))>=0))return!1;g=!1}if(R&&n.skipSpaces(q)>=n.eMarks[a])return!1;if(k=n.src.charCodeAt(q-1),c)return!0;for(x=n.tokens.length,g?($=n.push("ordered_list_open","ol",1),C!==1&&($.attrs=[["start",C]])):$=n.push("bullet_list_open","ul",1),$.map=v=[a,0],$.markup=String.fromCharCode(k),A=a,O=!1,z=n.md.block.ruler.getRules("list"),j=n.parentType,n.parentType="list";A<u;){for(E=q,y=n.eMarks[A],b=T=n.sCount[A]+q-(n.bMarks[a]+n.tShift[a]);E<y;){if((o=n.src.charCodeAt(E))===9)T+=4-(T+n.bsCount[A])%4;else{if(o!==32)break;T++}E++}if(l=E,f=l>=y?1:T-b,f>4&&(f=1),_=b+f,$=n.push("list_item_open","li",1),$.markup=String.fromCharCode(k),$.map=m=[a,0],F=n.tight,M=n.tShift[a],S=n.sCount[a],L=n.listIndent,n.listIndent=n.blkIndent,n.blkIndent=_,n.tight=!0,n.tShift[a]=l-n.bMarks[a],n.sCount[a]=T,l>=y&&n.isEmpty(a+1)?n.line=Math.min(n.line+2,u):n.md.block.tokenize(n,a,u,!0),n.tight&&!O||(B=!1),O=n.line-a>1&&n.isEmpty(n.line-1),n.blkIndent=n.listIndent,n.listIndent=L,n.tShift[a]=M,n.sCount[a]=S,n.tight=F,$=n.push("list_item_close","li",-1),$.markup=String.fromCharCode(k),A=a=n.line,m[1]=A,l=n.bMarks[a],A>=u||n.sCount[A]<n.blkIndent||n.sCount[a]-n.blkIndent>=4)break;for(D=!1,p=0,w=z.length;p<w;p++)if(z[p](n,A,u,!0)){D=!0;break}if(D)break;if(g){if((q=r(n,A))<0)break}else if((q=t(n,A))<0)break;if(k!==n.src.charCodeAt(q-1))break}return $=g?n.push("ordered_list_close","ol",-1):n.push("bullet_list_close","ul",-1),$.markup=String.fromCharCode(k),v[1]=A,n.line=A,n.parentType=j,B&&e(n,x),!0}},function(d,h,s){d.exports=function(t,r){var e,i,n,a,u,c,o=r+1,l=t.md.block.ruler.getRules("paragraph"),p=t.lineMax;for(c=t.parentType,t.parentType="paragraph";o<p&&!t.isEmpty(o);o++)if(!(t.sCount[o]-t.blkIndent>3||t.sCount[o]<0)){for(i=!1,n=0,a=l.length;n<a;n++)if(l[n](t,o,p,!0)){i=!0;break}if(i)break}return e=t.getLines(r,o,t.blkIndent,!1).trim(),t.line=o,u=t.push("paragraph_open","p",1),u.map=[r,t.line],u=t.push("inline","",0),u.content=e,u.map=[r,t.line],u.children=[],u=t.push("paragraph_close","p",-1),t.parentType=c,!0}},function(d,h,s){var t=s(0).normalizeReference,r=s(0).isSpace;d.exports=function(e,i,n,a){var u,c,o,l,p,_,f,b,g,m,w,v,x,k,C,y,A=0,T=e.bMarks[i]+e.tShift[i],L=e.eMarks[i],j=i+1;if(e.sCount[i]-e.blkIndent>=4||e.src.charCodeAt(T)!==91)return!1;for(;++T<L;)if(e.src.charCodeAt(T)===93&&e.src.charCodeAt(T-1)!==92){if(T+1===L||e.src.charCodeAt(T+1)!==58)return!1;break}for(l=e.lineMax,C=e.md.block.ruler.getRules("reference"),m=e.parentType,e.parentType="reference";j<l&&!e.isEmpty(j);j++)if(!(e.sCount[j]-e.blkIndent>3||e.sCount[j]<0)){for(k=!1,_=0,f=C.length;_<f;_++)if(C[_](e,j,l,!0)){k=!0;break}if(k)break}for(x=e.getLines(i,j,e.blkIndent,!1).trim(),L=x.length,T=1;T<L;T++){if((u=x.charCodeAt(T))===91)return!1;if(u===93){g=T;break}(u===10||u===92&&++T<L&&x.charCodeAt(T)===10)&&A++}if(g<0||x.charCodeAt(g+1)!==58)return!1;for(T=g+2;T<L;T++)if((u=x.charCodeAt(T))===10)A++;else if(!r(u))break;if(w=e.md.helpers.parseLinkDestination(x,T,L),!w.ok||(p=e.md.normalizeLink(w.str),!e.md.validateLink(p)))return!1;for(T=w.pos,A+=w.lines,c=T,o=A,v=T;T<L;T++)if((u=x.charCodeAt(T))===10)A++;else if(!r(u))break;for(w=e.md.helpers.parseLinkTitle(x,T,L),T<L&&v!==T&&w.ok?(y=w.str,T=w.pos,A+=w.lines):(y="",T=c,A=o);T<L&&(u=x.charCodeAt(T),r(u));)T++;if(T<L&&x.charCodeAt(T)!==10&&y)for(y="",T=c,A=o;T<L&&(u=x.charCodeAt(T),r(u));)T++;return!(T<L&&x.charCodeAt(T)!==10)&&!!(b=t(x.slice(1,g)))&&(!!a||(e.env.references===void 0&&(e.env.references={}),e.env.references[b]===void 0&&(e.env.references[b]={title:y,href:p}),e.parentType=m,e.line=i+A+1,!0))}},function(d,h,s){function t(i,n,a,u){var c,o,l,p,_,f,b,g;for(this.src=i,this.md=n,this.env=a,this.tokens=u,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0,this.result="",o=this.src,g=!1,l=p=f=b=0,_=o.length;p<_;p++){if(c=o.charCodeAt(p),!g){if(e(c)){f++,c===9?b+=4-b%4:b++;continue}g=!0}c!==10&&p!==_-1||(c!==10&&p++,this.bMarks.push(l),this.eMarks.push(p),this.tShift.push(f),this.sCount.push(b),this.bsCount.push(0),g=!1,f=0,b=0,l=p+1)}this.bMarks.push(o.length),this.eMarks.push(o.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}var r=s(33),e=s(0).isSpace;t.prototype.push=function(i,n,a){var u=new r(i,n,a);return u.block=!0,a<0&&this.level--,u.level=this.level,a>0&&this.level++,this.tokens.push(u),u},t.prototype.isEmpty=function(i){return this.bMarks[i]+this.tShift[i]>=this.eMarks[i]},t.prototype.skipEmptyLines=function(i){for(var n=this.lineMax;i<n&&!(this.bMarks[i]+this.tShift[i]<this.eMarks[i]);i++);return i},t.prototype.skipSpaces=function(i){for(var n,a=this.src.length;i<a&&(n=this.src.charCodeAt(i),e(n));i++);return i},t.prototype.skipSpacesBack=function(i,n){if(i<=n)return i;for(;i>n;)if(!e(this.src.charCodeAt(--i)))return i+1;return i},t.prototype.skipChars=function(i,n){for(var a=this.src.length;i<a&&this.src.charCodeAt(i)===n;i++);return i},t.prototype.skipCharsBack=function(i,n,a){if(i<=a)return i;for(;i>a;)if(n!==this.src.charCodeAt(--i))return i+1;return i},t.prototype.getLines=function(i,n,a,u){var c,o,l,p,_,f,b,g=i;if(i>=n)return"";for(f=new Array(n-i),c=0;g<n;g++,c++){for(o=0,b=p=this.bMarks[g],_=g+1<n||u?this.eMarks[g]+1:this.eMarks[g];p<_&&o<a;){if(l=this.src.charCodeAt(p),e(l))l===9?o+=4-(o+this.bsCount[g])%4:o++;else{if(!(p-b<this.tShift[g]))break;o++}p++}f[c]=o>a?new Array(o-a+1).join(" ")+this.src.slice(p,_):this.src.slice(p,_)}return f.join("")},t.prototype.Token=r,d.exports=t},function(d,h,s){function t(i,n){var a=i.bMarks[n]+i.blkIndent,u=i.eMarks[n];return i.src.substr(a,u-a)}function r(i){var n,a=[],u=0,c=i.length,o=0,l=0,p=!1,_=0;for(n=i.charCodeAt(u);u<c;)n===96?p?(p=!1,_=u):o%2==0&&(p=!0,_=u):n!==124||o%2!=0||p||(a.push(i.substring(l,u)),l=u+1),n===92?o++:o=0,u++,u===c&&p&&(p=!1,u=_+1),n=i.charCodeAt(u);return a.push(i.substring(l)),a}var e=s(0).isSpace;d.exports=function(i,n,a,u){var c,o,l,p,_,f,b,g,m,w,v,x;if(n+2>a||(_=n+1,i.sCount[_]<i.blkIndent)||i.sCount[_]-i.blkIndent>=4||(l=i.bMarks[_]+i.tShift[_])>=i.eMarks[_]||(c=i.src.charCodeAt(l++))!==124&&c!==45&&c!==58)return!1;for(;l<i.eMarks[_];){if((c=i.src.charCodeAt(l))!==124&&c!==45&&c!==58&&!e(c))return!1;l++}for(o=t(i,n+1),f=o.split("|"),m=[],p=0;p<f.length;p++){if(!(w=f[p].trim())){if(p===0||p===f.length-1)continue;return!1}if(!/^:?-+:?$/.test(w))return!1;w.charCodeAt(w.length-1)===58?m.push(w.charCodeAt(0)===58?"center":"right"):w.charCodeAt(0)===58?m.push("left"):m.push("")}if(o=t(i,n).trim(),o.indexOf("|")===-1||i.sCount[n]-i.blkIndent>=4||(f=r(o.replace(/^\||\|$/g,"")),(b=f.length)>m.length))return!1;if(u)return!0;for(g=i.push("table_open","table",1),g.map=v=[n,0],g=i.push("thead_open","thead",1),g.map=[n,n+1],g=i.push("tr_open","tr",1),g.map=[n,n+1],p=0;p<f.length;p++)g=i.push("th_open","th",1),g.map=[n,n+1],m[p]&&(g.attrs=[["style","text-align:"+m[p]]]),g=i.push("inline","",0),g.content=f[p].trim(),g.map=[n,n+1],g.children=[],g=i.push("th_close","th",-1);for(g=i.push("tr_close","tr",-1),g=i.push("thead_close","thead",-1),g=i.push("tbody_open","tbody",1),g.map=x=[n+2,0],_=n+2;_<a&&!(i.sCount[_]<i.blkIndent)&&(o=t(i,_).trim(),o.indexOf("|")!==-1)&&!(i.sCount[_]-i.blkIndent>=4);_++){for(f=r(o.replace(/^\||\|$/g,"")),g=i.push("tr_open","tr",1),p=0;p<b;p++)g=i.push("td_open","td",1),m[p]&&(g.attrs=[["style","text-align:"+m[p]]]),g=i.push("inline","",0),g.content=f[p]?f[p].trim():"",g.children=[],g=i.push("td_close","td",-1);g=i.push("tr_close","tr",-1)}return g=i.push("tbody_close","tbody",-1),g=i.push("table_close","table",-1),v[1]=x[1]=_,i.line=_,!0}},function(d,h,s){d.exports=function(t){var r;t.inlineMode?(r=new t.Token("inline","",0),r.content=t.src,r.map=[0,1],r.children=[],t.tokens.push(r)):t.md.block.parse(t.src,t.md,t.env,t.tokens)}},function(d,h,s){d.exports=function(t){var r,e,i,n=t.tokens;for(e=0,i=n.length;e<i;e++)r=n[e],r.type==="inline"&&t.md.inline.parse(r.content,t.md,t.env,r.children)}},function(d,h,s){function t(i){return/^<a[>\s]/i.test(i)}function r(i){return/^<\/a\s*>/i.test(i)}var e=s(0).arrayReplaceAt;d.exports=function(i){var n,a,u,c,o,l,p,_,f,b,g,m,w,v,x,k,C,y=i.tokens;if(i.md.options.linkify){for(a=0,u=y.length;a<u;a++)if(y[a].type==="inline"&&i.md.linkify.pretest(y[a].content))for(c=y[a].children,w=0,n=c.length-1;n>=0;n--)if(l=c[n],l.type!=="link_close"){if(l.type==="html_inline"&&(t(l.content)&&w>0&&w--,r(l.content)&&w++),!(w>0)&&l.type==="text"&&i.md.linkify.test(l.content)){for(f=l.content,C=i.md.linkify.match(f),p=[],m=l.level,g=0,_=0;_<C.length;_++)v=C[_].url,x=i.md.normalizeLink(v),i.md.validateLink(x)&&(k=C[_].text,k=C[_].schema?C[_].schema!=="mailto:"||/^mailto:/i.test(k)?i.md.normalizeLinkText(k):i.md.normalizeLinkText("mailto:"+k).replace(/^mailto:/,""):i.md.normalizeLinkText("http://"+k).replace(/^http:\/\//,""),b=C[_].index,b>g&&(o=new i.Token("text","",0),o.content=f.slice(g,b),o.level=m,p.push(o)),o=new i.Token("link_open","a",1),o.attrs=[["href",x]],o.level=m++,o.markup="linkify",o.info="auto",p.push(o),o=new i.Token("text","",0),o.content=k,o.level=m,p.push(o),o=new i.Token("link_close","a",-1),o.level=--m,o.markup="linkify",o.info="auto",p.push(o),g=C[_].lastIndex);g<f.length&&(o=new i.Token("text","",0),o.content=f.slice(g),o.level=m,p.push(o)),y[a].children=c=e(c,n,p)}}else for(n--;c[n].level!==l.level&&c[n].type!=="link_open";)n--}}},function(d,h,s){var t=/\r\n?|\n/g,r=/\0/g;d.exports=function(e){var i;i=e.src.replace(t,`
`),i=i.replace(r,"\uFFFD"),e.src=i}},function(d,h,s){function t(c,o){return u[o.toLowerCase()]}function r(c){var o,l,p=0;for(o=c.length-1;o>=0;o--)l=c[o],l.type!=="text"||p||(l.content=l.content.replace(a,t)),l.type==="link_open"&&l.info==="auto"&&p--,l.type==="link_close"&&l.info==="auto"&&p++}function e(c){var o,l,p=0;for(o=c.length-1;o>=0;o--)l=c[o],l.type!=="text"||p||i.test(l.content)&&(l.content=l.content.replace(/\+-/g,"\xB1").replace(/\.{2,}/g,"\u2026").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---([^-]|$)/gm,"$1\u2014$2").replace(/(^|\s)--(\s|$)/gm,"$1\u2013$2").replace(/(^|[^-\s])--([^-\s]|$)/gm,"$1\u2013$2")),l.type==="link_open"&&l.info==="auto"&&p--,l.type==="link_close"&&l.info==="auto"&&p++}var i=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,n=/\((c|tm|r|p)\)/i,a=/\((c|tm|r|p)\)/gi,u={c:"\xA9",r:"\xAE",p:"\xA7",tm:"\u2122"};d.exports=function(c){var o;if(c.md.options.typographer)for(o=c.tokens.length-1;o>=0;o--)c.tokens[o].type==="inline"&&(n.test(c.tokens[o].content)&&r(c.tokens[o].children),i.test(c.tokens[o].content)&&e(c.tokens[o].children))}},function(d,h,s){function t(o,l,p){return o.substr(0,l)+p+o.substr(l+1)}function r(o,l){var p,_,f,b,g,m,w,v,x,k,C,y,A,T,L,j,S,M,F,E,q;for(F=[],p=0;p<o.length;p++){for(_=o[p],w=o[p].level,S=F.length-1;S>=0&&!(F[S].level<=w);S--);if(F.length=S+1,_.type==="text"){f=_.content,g=0,m=f.length;t:for(;g<m&&(u.lastIndex=g,b=u.exec(f));){if(L=j=!0,g=b.index+1,M=b[0]==="'",x=32,b.index-1>=0)x=f.charCodeAt(b.index-1);else for(S=p-1;S>=0&&o[S].type!=="softbreak"&&o[S].type!=="hardbreak";S--)if(o[S].type==="text"){x=o[S].content.charCodeAt(o[S].content.length-1);break}if(k=32,g<m)k=f.charCodeAt(g);else for(S=p+1;S<o.length&&o[S].type!=="softbreak"&&o[S].type!=="hardbreak";S++)if(o[S].type==="text"){k=o[S].content.charCodeAt(0);break}if(C=n(x)||i(String.fromCharCode(x)),y=n(k)||i(String.fromCharCode(k)),A=e(x),T=e(k),T?L=!1:y&&(A||C||(L=!1)),A?j=!1:C&&(T||y||(j=!1)),k===34&&b[0]==='"'&&x>=48&&x<=57&&(j=L=!1),L&&j&&(L=!1,j=y),L||j){if(j){for(S=F.length-1;S>=0&&(v=F[S],!(F[S].level<w));S--)if(v.single===M&&F[S].level===w){v=F[S],M?(E=l.md.options.quotes[2],q=l.md.options.quotes[3]):(E=l.md.options.quotes[0],q=l.md.options.quotes[1]),_.content=t(_.content,b.index,q),o[v.token].content=t(o[v.token].content,v.pos,E),g+=q.length-1,v.token===p&&(g+=E.length-1),f=_.content,m=f.length,F.length=S;continue t}}L?F.push({token:p,pos:b.index,single:M,level:w}):j&&M&&(_.content=t(_.content,b.index,c))}else M&&(_.content=t(_.content,b.index,c))}}}}var e=s(0).isWhiteSpace,i=s(0).isPunctChar,n=s(0).isMdAsciiPunct,a=/['"]/,u=/['"]/g,c="\u2019";d.exports=function(o){var l;if(o.md.options.typographer)for(l=o.tokens.length-1;l>=0;l--)o.tokens[l].type==="inline"&&a.test(o.tokens[l].content)&&r(o.tokens[l].children,o)}},function(d,h,s){function t(e,i,n){this.src=e,this.env=n,this.tokens=[],this.inlineMode=!1,this.md=i}var r=s(33);t.prototype.Token=r,d.exports=t},function(d,h,s){var t=/^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/,r=/^<([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)>/;d.exports=function(e,i){var n,a,u,c,o,l,p=e.pos;return e.src.charCodeAt(p)===60&&(n=e.src.slice(p),!(n.indexOf(">")<0)&&(r.test(n)?(a=n.match(r),c=a[0].slice(1,-1),o=e.md.normalizeLink(c),!!e.md.validateLink(o)&&(i||(l=e.push("link_open","a",1),l.attrs=[["href",o]],l.markup="autolink",l.info="auto",l=e.push("text","",0),l.content=e.md.normalizeLinkText(c),l=e.push("link_close","a",-1),l.markup="autolink",l.info="auto"),e.pos+=a[0].length,!0)):!!t.test(n)&&(u=n.match(t),c=u[0].slice(1,-1),o=e.md.normalizeLink("mailto:"+c),!!e.md.validateLink(o)&&(i||(l=e.push("link_open","a",1),l.attrs=[["href",o]],l.markup="autolink",l.info="auto",l=e.push("text","",0),l.content=e.md.normalizeLinkText(c),l=e.push("link_close","a",-1),l.markup="autolink",l.info="auto"),e.pos+=u[0].length,!0))))}},function(d,h,s){d.exports=function(t,r){var e,i,n,a,u,c,o=t.pos;if(t.src.charCodeAt(o)!==96)return!1;for(e=o,o++,i=t.posMax;o<i&&t.src.charCodeAt(o)===96;)o++;for(n=t.src.slice(e,o),a=u=o;(a=t.src.indexOf("`",u))!==-1;){for(u=a+1;u<i&&t.src.charCodeAt(u)===96;)u++;if(u-a===n.length)return r||(c=t.push("code_inline","code",0),c.markup=n,c.content=t.src.slice(o,a).replace(/\n/g," ").replace(/^ (.+) $/,"$1")),t.pos=u,!0}return r||(t.pending+=n),t.pos+=n.length,!0}},function(d,h,s){function t(r,e){var i,n,a,u,c,o,l,p,_={},f=e.length;for(i=0;i<f;i++)if(a=e[i],a.length=a.length||0,a.close){for(_.hasOwnProperty(a.marker)||(_[a.marker]=[-1,-1,-1]),c=_[a.marker][a.length%3],o=-1,n=i-a.jump-1;n>c;n-=u.jump+1)if(u=e[n],u.marker===a.marker&&(o===-1&&(o=n),u.open&&u.end<0&&u.level===a.level&&(l=!1,(u.close||a.open)&&(u.length+a.length)%3==0&&(u.length%3==0&&a.length%3==0||(l=!0)),!l))){p=n>0&&!e[n-1].open?e[n-1].jump+1:0,a.jump=i-n+p,a.open=!1,u.end=i,u.jump=p,u.close=!1,o=-1;break}o!==-1&&(_[a.marker][(a.length||0)%3]=o)}}d.exports=function(r){var e,i=r.tokens_meta,n=r.tokens_meta.length;for(t(r,r.delimiters),e=0;e<n;e++)i[e]&&i[e].delimiters&&t(r,i[e].delimiters)}},function(d,h,s){var t=s(52),r=s(0).has,e=s(0).isValidEntityCode,i=s(0).fromCodePoint,n=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,a=/^&([a-z][a-z0-9]{1,31});/i;d.exports=function(u,c){var o,l,p=u.pos,_=u.posMax;if(u.src.charCodeAt(p)!==38)return!1;if(p+1<_){if(u.src.charCodeAt(p+1)===35){if(l=u.src.slice(p).match(n))return c||(o=l[1][0].toLowerCase()==="x"?parseInt(l[1].slice(1),16):parseInt(l[1],10),u.pending+=i(e(o)?o:65533)),u.pos+=l[0].length,!0}else if((l=u.src.slice(p).match(a))&&r(t,l[1]))return c||(u.pending+=t[l[1]]),u.pos+=l[0].length,!0}return c||(u.pending+="&"),u.pos++,!0}},function(d,h,s){for(var t=s(0).isSpace,r=[],e=0;e<256;e++)r.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(i){r[i.charCodeAt(0)]=1}),d.exports=function(i,n){var a,u=i.pos,c=i.posMax;if(i.src.charCodeAt(u)!==92)return!1;if(++u<c){if((a=i.src.charCodeAt(u))<256&&r[a]!==0)return n||(i.pending+=i.src[u]),i.pos+=2,!0;if(a===10){for(n||i.push("hardbreak","br",0),u++;u<c&&(a=i.src.charCodeAt(u),t(a));)u++;return i.pos=u,!0}}return n||(i.pending+="\\"),i.pos++,!0}},function(d,h,s){function t(e){var i=32|e;return i>=97&&i<=122}var r=s(53).HTML_TAG_RE;d.exports=function(e,i){var n,a,u,c,o=e.pos;return!!e.md.options.html&&(u=e.posMax,!(e.src.charCodeAt(o)!==60||o+2>=u)&&!((n=e.src.charCodeAt(o+1))!==33&&n!==63&&n!==47&&!t(n))&&!!(a=e.src.slice(o).match(r))&&(i||(c=e.push("html_inline","",0),c.content=e.src.slice(o,o+a[0].length)),e.pos+=a[0].length,!0))}},function(d,h,s){var t=s(0).normalizeReference,r=s(0).isSpace;d.exports=function(e,i){var n,a,u,c,o,l,p,_,f,b,g,m,w,v="",x=e.pos,k=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91||(l=e.pos+2,(o=e.md.helpers.parseLinkLabel(e,e.pos+1,!1))<0))return!1;if((p=o+1)<k&&e.src.charCodeAt(p)===40){for(p++;p<k&&(a=e.src.charCodeAt(p),r(a)||a===10);p++);if(p>=k)return!1;for(w=p,f=e.md.helpers.parseLinkDestination(e.src,p,e.posMax),f.ok&&(v=e.md.normalizeLink(f.str),e.md.validateLink(v)?p=f.pos:v=""),w=p;p<k&&(a=e.src.charCodeAt(p),r(a)||a===10);p++);if(f=e.md.helpers.parseLinkTitle(e.src,p,e.posMax),p<k&&w!==p&&f.ok)for(b=f.str,p=f.pos;p<k&&(a=e.src.charCodeAt(p),r(a)||a===10);p++);else b="";if(p>=k||e.src.charCodeAt(p)!==41)return e.pos=x,!1;p++}else{if(e.env.references===void 0)return!1;if(p<k&&e.src.charCodeAt(p)===91?(w=p+1,p=e.md.helpers.parseLinkLabel(e,p),p>=0?c=e.src.slice(w,p++):p=o+1):p=o+1,c||(c=e.src.slice(l,o)),!(_=e.env.references[t(c)]))return e.pos=x,!1;v=_.href,b=_.title}return i||(u=e.src.slice(l,o),e.md.inline.parse(u,e.md,e.env,m=[]),g=e.push("image","img",0),g.attrs=n=[["src",v],["alt",""]],g.children=m,g.content=u,b&&n.push(["title",b])),e.pos=p,e.posMax=k,!0}},function(d,h,s){var t=s(0).normalizeReference,r=s(0).isSpace;d.exports=function(e,i){var n,a,u,c,o,l,p,_,f,b,g="",m=e.pos,w=e.posMax,v=e.pos,x=!0;if(e.src.charCodeAt(e.pos)!==91||(o=e.pos+1,(c=e.md.helpers.parseLinkLabel(e,e.pos,!0))<0))return!1;if((l=c+1)<w&&e.src.charCodeAt(l)===40){for(x=!1,l++;l<w&&(a=e.src.charCodeAt(l),r(a)||a===10);l++);if(l>=w)return!1;for(v=l,p=e.md.helpers.parseLinkDestination(e.src,l,e.posMax),p.ok&&(g=e.md.normalizeLink(p.str),e.md.validateLink(g)?l=p.pos:g=""),v=l;l<w&&(a=e.src.charCodeAt(l),r(a)||a===10);l++);if(p=e.md.helpers.parseLinkTitle(e.src,l,e.posMax),l<w&&v!==l&&p.ok)for(f=p.str,l=p.pos;l<w&&(a=e.src.charCodeAt(l),r(a)||a===10);l++);else f="";(l>=w||e.src.charCodeAt(l)!==41)&&(x=!0),l++}if(x){if(e.env.references===void 0)return!1;if(l<w&&e.src.charCodeAt(l)===91?(v=l+1,l=e.md.helpers.parseLinkLabel(e,l),l>=0?u=e.src.slice(v,l++):l=c+1):l=c+1,u||(u=e.src.slice(o,c)),!(_=e.env.references[t(u)]))return e.pos=m,!1;g=_.href,f=_.title}return i||(e.pos=o,e.posMax=c,b=e.push("link_open","a",1),b.attrs=n=[["href",g]],f&&n.push(["title",f]),e.md.inline.tokenize(e),b=e.push("link_close","a",-1)),e.pos=l,e.posMax=w,!0}},function(d,h,s){var t=s(0).isSpace;d.exports=function(r,e){var i,n,a=r.pos;if(r.src.charCodeAt(a)!==10)return!1;for(i=r.pending.length-1,n=r.posMax,e||(i>=0&&r.pending.charCodeAt(i)===32?i>=1&&r.pending.charCodeAt(i-1)===32?(r.pending=r.pending.replace(/ +$/,""),r.push("hardbreak","br",0)):(r.pending=r.pending.slice(0,-1),r.push("softbreak","br",0)):r.push("softbreak","br",0)),a++;a<n&&t(r.src.charCodeAt(a));)a++;return r.pos=a,!0}},function(d,h,s){function t(a,u,c,o){this.src=a,this.env=c,this.md=u,this.tokens=o,this.tokens_meta=Array(o.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[]}var r=s(33),e=s(0).isWhiteSpace,i=s(0).isPunctChar,n=s(0).isMdAsciiPunct;t.prototype.pushPending=function(){var a=new r("text","",0);return a.content=this.pending,a.level=this.pendingLevel,this.tokens.push(a),this.pending="",a},t.prototype.push=function(a,u,c){this.pending&&this.pushPending();var o=new r(a,u,c),l=null;return c<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),o.level=this.level,c>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],l={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(o),this.tokens_meta.push(l),o},t.prototype.scanDelims=function(a,u){var c,o,l,p,_,f,b,g,m,w=a,v=!0,x=!0,k=this.posMax,C=this.src.charCodeAt(a);for(c=a>0?this.src.charCodeAt(a-1):32;w<k&&this.src.charCodeAt(w)===C;)w++;return l=w-a,o=w<k?this.src.charCodeAt(w):32,b=n(c)||i(String.fromCharCode(c)),m=n(o)||i(String.fromCharCode(o)),f=e(c),g=e(o),g?v=!1:m&&(f||b||(v=!1)),f?x=!1:b&&(g||m||(x=!1)),u?(p=v,_=x):(p=v&&(!x||b),_=x&&(!v||m)),{can_open:p,can_close:_,length:l}},t.prototype.Token=r,d.exports=t},function(d,h,s){function t(r){switch(r){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}d.exports=function(r,e){for(var i=r.pos;i<r.posMax&&!t(r.src.charCodeAt(i));)i++;return i!==r.pos&&(e||(r.pending+=r.src.slice(r.pos,i)),r.pos=i,!0)}},function(d,h,s){d.exports=function(t){var r,e,i=0,n=t.tokens,a=t.tokens.length;for(r=e=0;r<a;r++)n[r].nesting<0&&i--,n[r].level=i,n[r].nesting>0&&i++,n[r].type==="text"&&r+1<a&&n[r+1].type==="text"?n[r+1].content=n[r].content+n[r+1].content:(r!==e&&(n[e]=n[r]),e++);r!==e&&(n.length=e)}},function(d,h,s){function t(i){var n,a,u=e[i];if(u)return u;for(u=e[i]=[],n=0;n<128;n++)a=String.fromCharCode(n),u.push(a);for(n=0;n<i.length;n++)a=i.charCodeAt(n),u[a]="%"+("0"+a.toString(16).toUpperCase()).slice(-2);return u}function r(i,n){var a;return typeof n!="string"&&(n=r.defaultChars),a=t(n),i.replace(/(%[a-f0-9]{2})+/gi,function(u){var c,o,l,p,_,f,b,g="";for(c=0,o=u.length;c<o;c+=3)l=parseInt(u.slice(c+1,c+3),16),l<128?g+=a[l]:(224&l)==192&&c+3<o&&(192&(p=parseInt(u.slice(c+4,c+6),16)))==128?(b=l<<6&1984|63&p,g+=b<128?"\uFFFD\uFFFD":String.fromCharCode(b),c+=3):(240&l)==224&&c+6<o&&(p=parseInt(u.slice(c+4,c+6),16),_=parseInt(u.slice(c+7,c+9),16),(192&p)==128&&(192&_)==128)?(b=l<<12&61440|p<<6&4032|63&_,g+=b<2048||b>=55296&&b<=57343?"\uFFFD\uFFFD\uFFFD":String.fromCharCode(b),c+=6):(248&l)==240&&c+9<o&&(p=parseInt(u.slice(c+4,c+6),16),_=parseInt(u.slice(c+7,c+9),16),f=parseInt(u.slice(c+10,c+12),16),(192&p)==128&&(192&_)==128&&(192&f)==128)?(b=l<<18&1835008|p<<12&258048|_<<6&4032|63&f,b<65536||b>1114111?g+="\uFFFD\uFFFD\uFFFD\uFFFD":(b-=65536,g+=String.fromCharCode(55296+(b>>10),56320+(1023&b))),c+=9):g+="\uFFFD";return g})}var e={};r.defaultChars=";/?:@&=+$,#",r.componentChars="",d.exports=r},function(d,h,s){function t(i){var n,a,u=e[i];if(u)return u;for(u=e[i]=[],n=0;n<128;n++)a=String.fromCharCode(n),/^[0-9a-z]$/i.test(a)?u.push(a):u.push("%"+("0"+n.toString(16).toUpperCase()).slice(-2));for(n=0;n<i.length;n++)u[i.charCodeAt(n)]=i[n];return u}function r(i,n,a){var u,c,o,l,p,_="";for(typeof n!="string"&&(a=n,n=r.defaultChars),a===void 0&&(a=!0),p=t(n),u=0,c=i.length;u<c;u++)if(o=i.charCodeAt(u),a&&o===37&&u+2<c&&/^[0-9a-f]{2}$/i.test(i.slice(u+1,u+3)))_+=i.slice(u,u+3),u+=2;else if(o<128)_+=p[o];else if(o>=55296&&o<=57343){if(o>=55296&&o<=56319&&u+1<c&&(l=i.charCodeAt(u+1))>=56320&&l<=57343){_+=encodeURIComponent(i[u]+i[u+1]),u++;continue}_+="%EF%BF%BD"}else _+=encodeURIComponent(i[u]);return _}var e={};r.defaultChars=";/?:@&=+$,-_.!~*'()#",r.componentChars="-_.!~*'()",d.exports=r},function(d,h,s){d.exports=function(t){var r="";return r+=t.protocol||"",r+=t.slashes?"//":"",r+=t.auth?t.auth+"@":"",t.hostname&&t.hostname.indexOf(":")!==-1?r+="["+t.hostname+"]":r+=t.hostname||"",r+=t.port?":"+t.port:"",r+=t.pathname||"",r+=t.search||"",r+=t.hash||""}},function(d,h,s){function t(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}function r(g,m){if(g&&g instanceof t)return g;var w=new t;return w.parse(g,m),w}var e=/^([a-z0-9.+-]+:)/i,i=/:[0-9]*$/,n=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,a=["<",">",'"',"`"," ","\r",`
`,"	"],u=["{","}","|","\\","^","`"].concat(a),c=["'"].concat(u),o=["%","/","?",";","#"].concat(c),l=["/","?","#"],p=/^[+a-z0-9A-Z_-]{0,63}$/,_=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,f={javascript:!0,"javascript:":!0},b={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};t.prototype.parse=function(g,m){var w,v,x,k,C,y=g;if(y=y.trim(),!m&&g.split("#").length===1){var A=n.exec(y);if(A)return this.pathname=A[1],A[2]&&(this.search=A[2]),this}var T=e.exec(y);if(T&&(T=T[0],x=T.toLowerCase(),this.protocol=T,y=y.substr(T.length)),(m||T||y.match(/^\/\/[^@\/]+@[^@\/]+/))&&(!(C=y.substr(0,2)==="//")||T&&f[T]||(y=y.substr(2),this.slashes=!0)),!f[T]&&(C||T&&!b[T])){var L=-1;for(w=0;w<l.length;w++)(k=y.indexOf(l[w]))!==-1&&(L===-1||k<L)&&(L=k);var j,S;for(S=L===-1?y.lastIndexOf("@"):y.lastIndexOf("@",L),S!==-1&&(j=y.slice(0,S),y=y.slice(S+1),this.auth=j),L=-1,w=0;w<o.length;w++)(k=y.indexOf(o[w]))!==-1&&(L===-1||k<L)&&(L=k);L===-1&&(L=y.length),y[L-1]===":"&&L--;var M=y.slice(0,L);y=y.slice(L),this.parseHost(M),this.hostname=this.hostname||"";var F=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!F){var E=this.hostname.split(/\./);for(w=0,v=E.length;w<v;w++){var q=E[w];if(q&&!q.match(p)){for(var O="",P=0,D=q.length;P<D;P++)q.charCodeAt(P)>127?O+="x":O+=q[P];if(!O.match(p)){var z=E.slice(0,w),$=E.slice(w+1),R=q.match(_);R&&(z.push(R[1]),$.unshift(R[2])),$.length&&(y=$.join(".")+y),this.hostname=z.join(".");break}}}}this.hostname.length>255&&(this.hostname=""),F&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}var B=y.indexOf("#");B!==-1&&(this.hash=y.substr(B),y=y.slice(0,B));var W=y.indexOf("?");return W!==-1&&(this.search=y.substr(W),y=y.slice(0,W)),y&&(this.pathname=y),b[x]&&this.hostname&&!this.pathname&&(this.pathname=""),this},t.prototype.parseHost=function(g){var m=i.exec(g);m&&(m=m[0],m!==":"&&(this.port=m.substr(1)),g=g.substr(0,g.length-m.length)),g&&(this.hostname=g)},d.exports=r},function(d,h,s){(function(t,r){var e;(function(i){function n(D){throw new RangeError(E[D])}function a(D,z){for(var $=D.length,R=[];$--;)R[$]=z(D[$]);return R}function u(D,z){var $=D.split("@"),R="";return $.length>1&&(R=$[0]+"@",D=$[1]),D=D.replace(F,"."),R+a(D.split("."),z).join(".")}function c(D){for(var z,$,R=[],B=0,W=D.length;B<W;)z=D.charCodeAt(B++),z>=55296&&z<=56319&&B<W?($=D.charCodeAt(B++),(64512&$)==56320?R.push(((1023&z)<<10)+(1023&$)+65536):(R.push(z),B--)):R.push(z);return R}function o(D){return a(D,function(z){var $="";return z>65535&&(z-=65536,$+=P(z>>>10&1023|55296),z=56320|1023&z),$+=P(z)}).join("")}function l(D){return D-48<10?D-22:D-65<26?D-65:D-97<26?D-97:x}function p(D,z){return D+22+75*(D<26)-((z!=0)<<5)}function _(D,z,$){var R=0;for(D=$?O(D/A):D>>1,D+=O(D/z);D>q*C>>1;R+=x)D=O(D/q);return O(R+(q+1)*D/(D+y))}function f(D){var z,$,R,B,W,H,G,V,K,Q,J=[],Y=D.length,Z=0,nt=L,et=T;for($=D.lastIndexOf(j),$<0&&($=0),R=0;R<$;++R)D.charCodeAt(R)>=128&&n("not-basic"),J.push(D.charCodeAt(R));for(B=$>0?$+1:0;B<Y;){for(W=Z,H=1,G=x;B>=Y&&n("invalid-input"),V=l(D.charCodeAt(B++)),(V>=x||V>O((v-Z)/H))&&n("overflow"),Z+=V*H,K=G<=et?k:G>=et+C?C:G-et,!(V<K);G+=x)Q=x-K,H>O(v/Q)&&n("overflow"),H*=Q;z=J.length+1,et=_(Z-W,z,W==0),O(Z/z)>v-nt&&n("overflow"),nt+=O(Z/z),Z%=z,J.splice(Z++,0,nt)}return o(J)}function b(D){var z,$,R,B,W,H,G,V,K,Q,J,Y,Z,nt,et,rt=[];for(D=c(D),Y=D.length,z=L,$=0,W=T,H=0;H<Y;++H)(J=D[H])<128&&rt.push(P(J));for(R=B=rt.length,B&&rt.push(j);R<Y;){for(G=v,H=0;H<Y;++H)(J=D[H])>=z&&J<G&&(G=J);for(Z=R+1,G-z>O((v-$)/Z)&&n("overflow"),$+=(G-z)*Z,z=G,H=0;H<Y;++H)if(J=D[H],J<z&&++$>v&&n("overflow"),J==z){for(V=$,K=x;Q=K<=W?k:K>=W+C?C:K-W,!(V<Q);K+=x)et=V-Q,nt=x-Q,rt.push(P(p(Q+et%nt,0))),V=O(et/nt);rt.push(P(p(V,0))),W=_($,Z,R==B),$=0,++R}++$,++z}return rt.join("")}function g(D){return u(D,function(z){return S.test(z)?f(z.slice(4).toLowerCase()):z})}function m(D){return u(D,function(z){return M.test(z)?"xn--"+b(z):z})}typeof h=="object"&&h&&h.nodeType,typeof t=="object"&&t&&t.nodeType;var w,v=2147483647,x=36,k=1,C=26,y=38,A=700,T=72,L=128,j="-",S=/^xn--/,M=/[^\x20-\x7E]/,F=/[\x2E\u3002\uFF0E\uFF61]/g,E={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},q=x-k,O=Math.floor,P=String.fromCharCode;w={version:"1.4.1",ucs2:{decode:c,encode:o},decode:f,encode:b,toASCII:m,toUnicode:g},(e=function(){return w}.call(h,s,h,t))!==void 0&&(t.exports=e)})()}).call(h,s(208)(d),s(207))},function(d,h){d.exports=`@[toc](Catalog)

Markdown Handbuch
===
> Details: [http://commonmark.org/help/](http://commonmark.org/help/)

## **Fett**
\`\`\`
**fett**
__fett__
\`\`\`
## *Kursiv*
\`\`\`
*kursiv*
_kursiv_
\`\`\`
## \xDCberschriften
\`\`\`
# h1 #
h1
====
## h2 ##
h2
----
### h3 ###
#### h4 ####
##### h5 #####
###### h6 ######
\`\`\`
## Trennlinien
\`\`\`
***
---
\`\`\`
****
## ^Hoch^gestellt & ~Tief~gestellt
\`\`\`
hochgestellt x^2^
tiefgestellt H~2~0
\`\`\`
## ++Unterstrichen++ & ~~Durchgestrichen~~
\`\`\`
++unterstrichen++
~~durchgestrichen~~
\`\`\`
## ==Markiert==
\`\`\`
==markiert==
\`\`\`
## Zitat

\`\`\`
> zitat 1
>> zitat 2
>>> zitat 3
...
\`\`\`

## Liste
\`\`\`
ol
1.
2.
3.
...

ul
-
-
...
\`\`\`

## Todo Liste

- [x] aufgabe 1
- [ ] aufgabe 2

\`\`\`
- [x] aufgabe 1
- [ ] aufgabe 2
\`\`\`

## Link
\`\`\`
Text Link
[Text](www.baidu.com)

Link mit Bild
![Text](http://www.image.com)
\`\`\`
## Code
\\\`\`\` Typ

Codeblock

\\\`\`\`

\\\` code \\\`

\`\`\`c++
int main()
{
    printf("hello world!");
}
\`\`\`
\`code\`

## Tabelle
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| links | mitte | rechts |
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| links | mitte | rechts |
| ---------------------- | ------------- | ----------------- |
## Fu\xDFnote
\`\`\`
hallo[^hallo]
\`\`\`

Schau zum unteren Rand[^hallo]

[^hallo]: fussnote

## Emojis
Details: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
\`\`\`
:laughing:
:blush:
:smiley:
:)
...
\`\`\`
:laughing::blush::smiley::)

## $\\KaTeX$ Mathematik

Formeln lassen sich darstellen z.b. \uFF1A$x_i + y_i = z_i$ und $\\sum_{i=1}^n a_i=0$
Formeln k\xF6nnen auf einer eigenen Zeile gerendert werden
$$\\sum_{i=1}^n a_i=0$$
Details: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)\u548C[katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)\u4EE5\u53CA[latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## Layout

::: hljs-left
\`::: hljs-left\`
\`links\`
\`:::\`
:::

::: hljs-center
\`::: hljs-center\`
\`mitte\`
\`:::\`
:::

::: hljs-right
\`::: hljs-right\`
\`rechts\`
\`:::\`
:::

## Liste von Definitionen

Term 1

:   Definition 1

Term 2 mit *inline markup*

:   Definition 2

        { ein wenig code, teil von Definition 2 }

    Dritter Absatz von Definition 2.

\`\`\`
Term 1

:   Definition 1

Term 2 mit *inline markup*

:   Definition 2

        { ein wenig code, teil von Definition 2 }

    Dritter Absatz von Definition 2.

\`\`\`

## Abk\xFCrzungen
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
Die HTML Spezifikation
wird gepflegt vom W3C.
\`\`\`
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
Die HTML Spezifikation
wird gepflegt vom W3C.
\`\`\`
`},function(d,h){d.exports=`@[toc](Catalog)

Markdown Guide
===
> Detailed: [http://commonmark.org/help/](http://commonmark.org/help/)

## **Bold**
\`\`\`
**bold**
__bold__
\`\`\`
## *Italic*
\`\`\`
*italic*
_italic_
\`\`\`
## Header
\`\`\`
# h1 #
h1
====
## h2 ##
h2
----
### h3 ###
#### h4 ####
##### h5 #####
###### h6 ######
\`\`\`
## Dividing line
\`\`\`
***
---
\`\`\`
****
## ^Super^script & ~Sub~script
\`\`\`
super x^2^
sub H~2~0
\`\`\`
## ++Underline++ & ~~Strikethrough~~
\`\`\`
++underline++
~~strikethrough~~
\`\`\`
## ==Mark==
\`\`\`
==mark==
\`\`\`
## Quote

\`\`\`
> quote 1
>> quote 2
>>> quote 3
...
\`\`\`

## List
\`\`\`
ol
1.
2.
3.
...

ul
-
-
...
\`\`\`

## Todo List

- [x] task 1
- [ ] task 2

\`\`\`
- [x] task 1
- [ ] task 2
\`\`\`

## Link
\`\`\`
Text Link
[Text](www.baidu.com)

Image Link
![Text](http://www.image.com)
\`\`\`
## Code
\\\`\`\` type

code block

\\\`\`\`

\\\` code \\\`

\`\`\`c++
int main()
{
    printf("hello world!");
}
\`\`\`
\`code\`

## Table
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| left | center | right |
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| left | center | right |
| ---------------------- | ------------- | ----------------- |
## Footnote
\`\`\`
hello[^hello]
\`\`\`

Look at the bottom[^hello]

[^hello]: footnote

## Emojis
Detailed: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
\`\`\`
:laughing:
:blush:
:smiley:
:)
...
\`\`\`
:laughing::blush::smiley::)

## $\\KaTeX$ Mathematics

We can render formulas for example\uFF1A$x_i + y_i = z_i$ and $\\sum_{i=1}^n a_i=0$
We can also single-line rendering
$$\\sum_{i=1}^n a_i=0$$
Detailed: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)\u548C[katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)\u4EE5\u53CA[latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## Layout

::: hljs-left
\`::: hljs-left\`
\`left\`
\`:::\`
:::

::: hljs-center
\`::: hljs-center\`
\`center\`
\`:::\`
:::

::: hljs-right
\`::: hljs-right\`
\`right\`
\`:::\`
:::

## deflist

Term 1

:   Definition 1

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

\`\`\`
Term 1

:   Definition 1

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

\`\`\`

## abbr
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
\`\`\`
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
\`\`\`
`},function(d,h){d.exports=`@[toc](Catalogue)

Guide Markdown
==============
> D\xE9tail : [http://commonmark.org/help/](http://commonmark.org/help/)

## **Bold**
\`\`\`
**bold**
__bold__
\`\`\`
## *Italic*
\`\`\`
*italic*
_italic_
\`\`\`
## Header
\`\`\`
# h1 #
h1
====
## h2 ##
h2
----
### h3 ###
#### h4 ####
##### h5 #####
###### h6 ######
\`\`\`
## Dividing line
\`\`\`
***
---
\`\`\`
****
## ^Super^script & ~Sub~script
\`\`\`
super x^2^
sub H~2~0
\`\`\`
## ++Underline++ & ~~Strikethrough~~
\`\`\`
++underline++
~~strikethrough~~
\`\`\`
## ==Mark==
\`\`\`
==mark==
\`\`\`
## Quote

\`\`\`
> quote 1
>> quote 2
>>> quote 3
...
\`\`\`

## List
\`\`\`
ol
1.
2.
3.
...

ul
-
-
...
\`\`\`
## Link

## Todo List

- [x] \xC9quipe 1
- [ ] \xC9quipe 2

\`\`\`
- [x] \xC9quipe 1
- [ ] \xC9quipe 2
\`\`\`

\`\`\`
Text Link
[Text](www.baidu.com)

Image Link
![Text](http://www.image.com)
\`\`\`
## Code
\\\`\`\` type

code block

\\\`\`\`

\\\` code \\\`

\`\`\`c++
int main()
{
    printf("hello world!");
}
\`\`\`
\`code\`

## Table
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| left | center | right |
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| left | center | right |
| ---------------------- | ------------- | ----------------- |
## Footnote
\`\`\`
hello[^hello]
\`\`\`

Look at the bottom[^hello]

[^hello]: footnote

## Emojis
Detailed: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
\`\`\`
:laughing:
:blush:
:smiley:
:)
...
\`\`\`
:laughing::blush::smiley::)

## $\\KaTeX$ Mathematics

We can render formulas for example\uFF1A$x_i + y_i = z_i$ and $\\sum_{i=1}^n a_i=0$
We can also single-line rendering
$$\\sum_{i=1}^n a_i=0$$
Detailed: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)\u548C[katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)\u4EE5\u53CA[latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## Layout

::: hljs-left
\`::: hljs-left\`
\`left\`
\`:::\`
:::

::: hljs-center
\`::: hljs-center\`
\`center\`
\`:::\`
:::

::: hljs-right
\`::: hljs-right\`
\`right\`
\`:::\`
:::

## deflist

Term 1

:   Definition 1

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

\`\`\`
Term 1

:   Definition 1

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

\`\`\`

## abbr
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
\`\`\`
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
\`\`\`
`},function(d,h){d.exports=`@[toc](\u76EE\u6B21)

Markdown \u6587\u6CD5\u30AC\u30A4\u30C9
===
> Detailed: [http://commonmark.org/help/](http://commonmark.org/help/)

## **\u592A\u5B57**
\`\`\`
**\u592A\u5B57**
__\u592A\u5B57__
\`\`\`
## *\u659C\u4F53*
\`\`\`
*\u659C\u4F53*
_\u659C\u4F53_
\`\`\`
## \u898B\u51FA\u3057
\`\`\`
# h1 #
h1
====
## h2 ##
h2
----
### h3 ###
#### h4 ####
##### h5 #####
###### h6 ######
\`\`\`
## \u6A2A\u7DDA
\`\`\`
***
---
\`\`\`
****
## ^\u4E0A\u4ED8\u304D^\u6587\u5B57 & ~\u4E0B\u4ED8\u304D~\u6587\u5B57
\`\`\`
super x^2^
sub H~2~0
\`\`\`
## ++\u4E0B\u7DDA++ & ~~\u53D6\u308A\u6D88\u3057\u7DDA~~
\`\`\`
++underline++
~~strikethrough~~
\`\`\`
## ==\u86CD\u5149\u30DA\u30F3==
\`\`\`
==mark==
\`\`\`
## \u5F15\u7528

\`\`\`
> quote 1
>> quote 2
>>> quote 3
...
\`\`\`

## \u30EA\u30B9\u30C8
\`\`\`
\u756A\u53F7\u4ED8\u304D\u30EA\u30B9\u30C8
1.
2.
3.
...

\u7B87\u6761\u66F8\u304D\u30EA\u30B9\u30C8
-
-
...
\`\`\`

## Todo\u30EA\u30B9\u30C8

- [x] task 1
- [ ] task 2

\`\`\`
- [x] task 1
- [ ] task 2
\`\`\`

## \u30EA\u30F3\u30AF
\`\`\`
Text Link
[Text](www.baidu.com)

Image Link
![Text](http://www.image.com)
\`\`\`
## \u30B3\u30FC\u30C9
\\\`\`\` type

code block

\\\`\`\`

\\\` code \\\`

\`\`\`c++
int main()
{
    printf("hello world!");
}
\`\`\`
\`code\`

## \u8868
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| left | center | right |
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| left | center | right |
| ---------------------- | ------------- | ----------------- |

## \u811A\u6CE8
\`\`\`
hello[^hello]
\`\`\`

Look at the bottom[^hello]

[^hello]: footnote

## \u7D75\u6587\u5B57
> Detailed: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
\`\`\`
:laughing:
:blush:
:smiley:
:)
...
\`\`\`
:laughing::blush::smiley::)

## $\\KaTeX$ \u6570\u5F0F
> Detailed: [KaTeX\u30DE\u30CB\u30E5\u30A2\u30EB](http://www.intmath.com/cg5/katex-mathjax-comparison.php)\u3001[KaTeX function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)\u3001[LaTeX\u30DE\u30CB\u30E5\u30A2\u30EB](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

We can render formulas for example\uFF1A$x_i + y_i = z_i$ and $\\sum_{i=1}^n a_i=0$  
We can also single-line rendering
$$\\sum_{i=1}^n a_i=0$$

## \u30EC\u30A4\u30A2\u30A6\u30C8

::: hljs-left
\`::: hljs-left\`
\`left\`
\`:::\`
:::

::: hljs-center
\`::: hljs-center\`
\`center\`
\`:::\`
:::

::: hljs-right
\`::: hljs-right\`
\`right\`
\`:::\`
:::

## \u5B9A\u7FA9\u30EA\u30B9\u30C8

Term 1

:   Definition 1

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

\`\`\`
Term 1

:   Definition 1

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

\`\`\`

## abbr
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
\`\`\`
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
\`\`\`
`},function(d,h){d.exports=`@[toc](Directory)

Guia Markdown
===
> Detalhes: [http://commonmark.org/help/](http://commonmark.org/help/)

## **Negrito**
\`\`\`
**negrito**
__negrito__
\`\`\`
## *It\xE1lico*
\`\`\`
*it\xE1lico*
_it\xE1lico_
\`\`\`
## Cabe\xE7alho
\`\`\`
# h1 #
h1
====
## h2 ##
h2
----
### h3 ###
#### h4 ####
##### h5 #####
###### h6 ######
\`\`\`
## Linha Divisora
\`\`\`
***
---
\`\`\`
****
## ^Sobre^scrito & ~Sub~scrito
\`\`\`
sobre x^2^
sub H~2~0
\`\`\`
## ++Sublinhar++ & ~~Tachar~~
\`\`\`
++sublinhar++
~~tachar~~
\`\`\`
## ==Marcador==
\`\`\`
==marcador==
\`\`\`
## Cita\xE7\xE3o

\`\`\`
> cita\xE7\xE3o 1
>> cita\xE7\xE3o 2
>>> cita\xE7\xE3o 3
...
\`\`\`

## Listas
\`\`\`
lista Numerada
1.
2.
3.
...

lista com marcadores
-
-
...
\`\`\`

## Todo Listas

- [x] Tarefa 1
- [ ] Tarefa 2

\`\`\`
- [x] Tarefa 1
- [ ] Tarefa 2
\`\`\`

## Link
\`\`\`
Link Texto
[Text](www.baidu.com)

Link Imagem
![Text](http://www.image.com)
\`\`\`
## C\xF3digo
\\\`\`\` tipo

bloco de c\xF3digo

\\\`\`\`

\\\` c\xF3digo \\\`

\`\`\`c++
int main()
{
    printf("hello world!");
}
\`\`\`
\`code\`

## Tabela
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| esquerda | centro | direita |
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| esquerda | centro | direita |
| ---------------------- | ------------- | ----------------- |
## Rodap\xE9
\`\`\`
ol\xE1[^ol\xE1]
\`\`\`

Olhe para baixo[^ol\xE1]

[^ol\xE1]: rodap\xE9

## Emojis
Detalhes: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
\`\`\`
:laughing:
:blush:
:smiley:
:)
...
\`\`\`
:laughing::blush::smiley::)

## $\\KaTeX$ Mathematics

Podemos mostrar f\xF3rmulas por exemplo\uFF1A$x_i + y_i = z_i$ and $\\sum_{i=1}^n a_i=0$
Podemos tamb\xE9m mostrar em uma \xFAnica linha:
$$\\sum_{i=1}^n a_i=0$$
Detalhes: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)\u548C[katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)\u4EE5\u53CA[latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## Layout

::: hljs-left
\`::: hljs-left\`
\`esquerda\`
\`:::\`
:::

::: hljs-center
\`::: hljs-center\`
\`centro\`
\`:::\`
:::

::: hljs-right
\`::: hljs-right\`
\`direita\`
\`:::\`
:::

## Defini\xE7\xF5es

Termo 1

:   Defini\xE7\xE3o 1

Termo 2 com *markup inline*

:   Defini\xE7\xE3o 2

        { um pouco de c\xF3digo, parte da Defini\xE7\xE3o 2 }

    Terceiro par\xE1grafo da defini\xE7\xE3o 2.

\`\`\`
Termo 1

:   Defini\xE7\xE3o 1

Termo 2 com *markup inline*

:   Defini\xE7\xE3o 2

        { um pouco de c\xF3digo, parte da Defini\xE7\xE3o 2 }

    Terceiro par\xE1grafo da defini\xE7\xE3o 2.

\`\`\`

## Abrevia\xE7\xF5es
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
A especifica\xE7\xE3o HTML
\xE9 mantida pela W3C.
\`\`\`
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
\xE9 mantida pela W3C.
\`\`\`
`},function(d,h){d.exports=`@[toc](Catalog)  
  
Markdown \u043F\u043E\u043C\u043E\u0449\u044C  
===  
> \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435: [http://commonmark.org/help/](http://commonmark.org/help/)  
  
## **\u041F\u043E\u043B\u0443\u0436\u0438\u0440\u043D\u044B\u0439**  
\`\`\`  
**\u041F\u043E\u043B\u0443\u0436\u0438\u0440\u043D\u044B\u0439**  
__\u041F\u043E\u043B\u0443\u0436\u0438\u0440\u043D\u044B\u0439__  
\`\`\`  
## *\u041A\u0443\u0440\u0441\u0438\u0432*  
\`\`\`  
*\u041A\u0443\u0440\u0441\u0438\u0432*  
_\u041A\u0443\u0440\u0441\u0438\u0432_  
\`\`\`  
## \u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A  
\`\`\`  
# h1 #  
h1  
====  
## h2 ##  
h2  
----  
### h3 ###  
#### h4 ####  
##### h5 #####  
###### h6 ######  
\`\`\`  
## \u0420\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u043B\u0438\u043D\u0438\u044F  
\`\`\`  
***  
---  
\`\`\`  
****  
## ^\u0412\u0435\u0440\u0445\u043D\u0438\u0439^\u0438\u043D\u0434\u0435\u043A\u0441 & ~\u041D\u0438\u0436\u043D\u0438\u0439~\u0438\u043D\u0434\u0435\u043A\u0441  
\`\`\`  
\u0432\u0435\u0440\u0445\u043D\u0438\u0439 x^2^  
\u043D\u0438\u0436\u043D\u0438\u0439 H~2~0  
\`\`\`  
## ++\u041F\u043E\u0434\u0447\u0435\u0440\u043A\u043D\u0443\u0442\u044B\u0439++ & ~~\u0417\u0430\u0447\u0435\u0440\u043A\u043D\u0443\u0442\u044B\u0439~~  
\`\`\`  
++\u041F\u043E\u0434\u0447\u0435\u0440\u043A\u043D\u0443\u0442\u044B\u0439++  
~~\u0417\u0430\u0447\u0435\u0440\u043A\u043D\u0443\u0442\u044B\u0439~~  
\`\`\`  
## ==\u041E\u0442\u043C\u0435\u0442\u043A\u0430==  
\`\`\`  
==\u041E\u0442\u043C\u0435\u0442\u043A\u0430==  
\`\`\`  
## \u0426\u0438\u0442\u0430\u0442\u0430  
  
\`\`\`  
> \u0426\u0438\u0442\u0430\u0442\u0430  
>> \u0426\u0438\u0442\u0430\u0442\u0430 2  
>>> \u0426\u0438\u0442\u0430\u0442\u0430 3  
...  
\`\`\`  
  
## \u0421\u043F\u0438\u0441\u043E\u043A  
\`\`\`  
ol  
1.  
2.  
3.  
...  
  
ul  
-  
-  
...  
\`\`\`  
  
## \u0421\u043F\u0438\u0441\u043E\u043A \u0437\u0430\u0434\u0430\u0447  
  
- [x] \u0417\u0430\u0434\u0430\u0447\u0430 1  
- [ ] \u0417\u0430\u0434\u0430\u0447\u0430 2  
  
\`\`\`  
- [x] \u0417\u0430\u0434\u0430\u0447\u0430 1  
- [ ] \u0417\u0430\u0434\u0430\u0447\u0430 2  
\`\`\`  
  
## \u0421\u0441\u044B\u043B\u043A\u0430  
\`\`\`  
\u0421\u0441\u044B\u043B\u043A\u0430  
[\u0422\u0435\u043A\u0441\u0442](www.baidu.com)  
  
\u0421\u0441\u044B\u043B\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F  
![\u0422\u0435\u043A\u0441\u0442](http://www.image.com)  
\`\`\`  
## \u041A\u043E\u0434  
\\\`\`\` type  
  
code block  
  
\\\`\`\`  
  
\\\` code \\\`  
  
\`\`\`c++  
int main()  
{  
 printf("hello world!");}  
\`\`\`  
\`code\`  
  
## \u0422\u0430\u0431\u043B\u0438\u0446\u0430  
\`\`\`  
| th1 | th2 | th3 |  
| :--  | :--: | ----: |  
| left | center | right |  
\`\`\`  
| th1 | th2 | th3 |  
| :--  | :--: | ----: |  
| left | center | right |  
| ---------------------- | ------------- | ----------------- |  
## \u0421\u043D\u043E\u0441\u043A\u0430  
\`\`\`  
\u041F\u0440\u0438\u0432\u0435\u0442[^\u041F\u0440\u0438\u0432\u0435\u0442]  
\`\`\`  
  
\u0422\u0443\u0442 \u0447\u0442\u043E-\u0442\u043E \u043D\u0435\u043F\u043E\u043D\u044F\u0442\u043D\u043E\u0435[^\u041F\u0440\u0438\u0432\u0435\u0442]  
  
[^\u041F\u0440\u0438\u0432\u0435\u0442]: \u0410 \u0442\u0443\u0442 \u043E\u0431\u044A\u044F\u0441\u043D\u0435\u043D\u0438\u0435  
  
## Emojis  
\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)  
\`\`\`  
:laughing:  
:blush:  
:smiley:  
:)  
...  
\`\`\`  
:laughing::blush::smiley::)  
  
## $\\KaTeX$ Mathematics  
  
\u041C\u043E\u0436\u043D\u043E \u0432\u044B\u0432\u043E\u0434\u0438\u0442\u044C \u0442\u0430\u043A\u0438\u0435 \u0444\u043E\u0440\u043C\u0443\u043B\u044B\uFF1A$x_i + y_i = z_i$ and $\\sum_{i=1}^n a_i=0$  
\u0410 \u0442\u0430\u043A\u0436\u0435 \u0432 \u043E\u0434\u043D\u0443 \u0441\u0442\u0440\u043E\u043A\u0443:
$$\\sum_{i=1}^n a_i=0$$  
\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435: 
- [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)
- [katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)
- [latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)  
  
## \u0420\u0430\u0437\u043C\u0435\u0442\u043A\u0430
  
::: hljs-left  
\`::: hljs-left\`  
\`left\`  
\`:::\`  
:::  
  
::: hljs-center  
\`::: hljs-center\`  
\`center\`  
\`:::\`  
:::  
  
::: hljs-right  
\`::: hljs-right\`  
\`right\`  
\`:::\`  
:::  
  
## \u0421\u043F\u0438\u0441\u043E\u043A \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0439
  
\u0422\u0435\u0440\u043C\u0438\u043D 1  
  
:   \u041E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 1  
  
\u0422\u0435\u0440\u043C\u0438\u043D  2 \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C *\u0440\u0430\u0437\u043C\u0435\u0442\u043A\u0438*
  
:   \u041E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 2  
  
 { \u041A\u0430\u043A\u043E\u0439-\u043D\u0438\u0431\u0443\u0434\u044C \u043A\u043E\u0434, \u0447\u0430\u0441\u0442\u044C \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u044F 2 }  
 \u0422\u0440\u0435\u0442\u0438\u0439 \u043F\u0430\u0440\u0430\u0433\u0440\u0430\u0444 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u044F 2.  
\`\`\`  
\u0422\u0435\u0440\u043C\u0438\u043D 1  
  
:   \u041E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 1  
  
\u0422\u0435\u0440\u043C\u0438\u043D  2 \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C *\u0440\u0430\u0437\u043C\u0435\u0442\u043A\u0438*
  
:   \u041E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 2  
  
 { \u041A\u0430\u043A\u043E\u0439-\u043D\u0438\u0431\u0443\u0434\u044C \u043A\u043E\u0434, \u0447\u0430\u0441\u0442\u044C \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u044F 2 }  
 \u0422\u0440\u0435\u0442\u0438\u0439 \u043F\u0430\u0440\u0430\u0433\u0440\u0430\u0444 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u044F 2.  
\`\`\`  
  
## \u0421\u043E\u043A\u0440\u0430\u0449\u0435\u043D\u0438\u044F
*[HTML]: Hyper Text Markup Language  
*[W3C]:  World Wide Web Consortium  
The HTML specification  
is maintained by the W3C.  
\`\`\`  
*[HTML]: Hyper Text Markup Language  
*[W3C]:  World Wide Web Consortium  
The HTML specification  
is maintained by the W3C.  
\`\`\`
`},function(d,h){d.exports=`@[toc](\u76EE\u5F55)

Markdown \u8BED\u6CD5\u7B80\u4ECB
=============
> [\u8BED\u6CD5\u8BE6\u89E3](http://commonmark.org/help/)

## **\u76EE\u5F55**
\`\`\`
@[toc](\u76EE\u5F55)
\`\`\`

## **\u7C97\u4F53**
\`\`\`
**\u7C97\u4F53**
__\u7C97\u4F53__
\`\`\`
## *\u659C\u4F53*
\`\`\`
*\u659C\u4F53*
_\u659C\u4F53_
\`\`\`
## \u6807\u9898
\`\`\`
# \u4E00\u7EA7\u6807\u9898 #
\u4E00\u7EA7\u6807\u9898
====
## \u4E8C\u7EA7\u6807\u9898 ##
\u4E8C\u7EA7\u6807\u9898
----
### \u4E09\u7EA7\u6807\u9898 ###
#### \u56DB\u7EA7\u6807\u9898 ####
##### \u4E94\u7EA7\u6807\u9898 #####
###### \u516D\u7EA7\u6807\u9898 ######
\`\`\`
## \u5206\u5272\u7EBF
\`\`\`
***
---
\`\`\`
****
## ^\u4E0A^\u89D2~\u4E0B~\u6807
\`\`\`
\u4E0A\u89D2\u6807 x^2^
\u4E0B\u89D2\u6807 H~2~0
\`\`\`
## ++\u4E0B\u5212\u7EBF++ ~~\u4E2D\u5212\u7EBF~~
\`\`\`
++\u4E0B\u5212\u7EBF++
~~\u4E2D\u5212\u7EBF~~
\`\`\`
## ==\u6807\u8BB0==
\`\`\`
==\u6807\u8BB0==
\`\`\`
## \u6BB5\u843D\u5F15\u7528
\`\`\`
> \u4E00\u7EA7
>> \u4E8C\u7EA7
>>> \u4E09\u7EA7
...
\`\`\`

## \u5217\u8868
\`\`\`
\u6709\u5E8F\u5217\u8868
1.
2.
3.
...
\u65E0\u5E8F\u5217\u8868
-
-
...
\`\`\`

## \u4EFB\u52A1\u5217\u8868

- [x] \u5DF2\u5B8C\u6210\u4EFB\u52A1
- [ ] \u672A\u5B8C\u6210\u4EFB\u52A1

\`\`\`
- [x] \u5DF2\u5B8C\u6210\u4EFB\u52A1
- [ ] \u672A\u5B8C\u6210\u4EFB\u52A1
\`\`\`

## \u94FE\u63A5
\`\`\`
[\u94FE\u63A5](www.baidu.com)
![\u56FE\u7247\u63CF\u8FF0](http://www.image.com)
\`\`\`
## \u4EE3\u7801\u6BB5\u843D
\\\`\`\` type

\u4EE3\u7801\u6BB5\u843D

\\\`\`\`

\\\` \u4EE3\u7801\u5757 \\\`

\`\`\`c++
int main()
{
    printf("hello world!");
}
\`\`\`
\`code\`
## \u8868\u683C(table)
\`\`\`
| \u6807\u98981 | \u6807\u98982 | \u6807\u98983 |
| :--  | :--: | ----: |
| \u5DE6\u5BF9\u9F50 | \u5C45\u4E2D | \u53F3\u5BF9\u9F50 |
| ---------------------- | ------------- | ----------------- |
\`\`\`
| \u6807\u98981 | \u6807\u98982 | \u6807\u98983 |
| :--  | :--: | ----: |
| \u5DE6\u5BF9\u9F50 | \u5C45\u4E2D | \u53F3\u5BF9\u9F50 |
| ---------------------- | ------------- | ----------------- |
## \u811A\u6CE8(footnote)
\`\`\`
hello[^hello]
\`\`\`

\u89C1\u5E95\u90E8\u811A\u6CE8[^hello]

[^hello]: \u4E00\u4E2A\u6CE8\u811A

## \u8868\u60C5(emoji)
[\u53C2\u8003\u7F51\u7AD9: https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
\`\`\`
:laughing:
:blush:
:smiley:
:)
...
\`\`\`
:laughing::blush::smiley::)

## $\\KaTeX$\u516C\u5F0F

\u6211\u4EEC\u53EF\u4EE5\u6E32\u67D3\u516C\u5F0F\u4F8B\u5982\uFF1A$x_i + y_i = z_i$\u548C$\\sum_{i=1}^n a_i=0$
\u6211\u4EEC\u4E5F\u53EF\u4EE5\u5355\u884C\u6E32\u67D3
$$\\sum_{i=1}^n a_i=0$$
\u5177\u4F53\u53EF\u53C2\u7167[katex\u6587\u6863](http://www.intmath.com/cg5/katex-mathjax-comparison.php)\u548C[katex\u652F\u6301\u7684\u51FD\u6570](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)\u4EE5\u53CA[latex\u6587\u6863](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## \u5E03\u5C40

::: hljs-left
\`::: hljs-left\`
\`\u5C45\u5DE6\`
\`:::\`
:::

::: hljs-center
\`::: hljs-center\`
\`\u5C45\u4E2D\`
\`:::\`
:::

::: hljs-right
\`::: hljs-right\`
\`\u5C45\u53F3\`
\`:::\`
:::

## \u5B9A\u4E49

\u672F\u8BED\u4E00

:   \u5B9A\u4E49\u4E00

\u5305\u542B\u6709*\u884C\u5185\u6807\u8BB0*\u7684\u672F\u8BED\u4E8C

:   \u5B9A\u4E49\u4E8C

        {\u4E00\u4E9B\u5B9A\u4E49\u4E8C\u7684\u6587\u5B57\u6216\u4EE3\u7801}

    \u5B9A\u4E49\u4E8C\u7684\u7B2C\u4E09\u6BB5

\`\`\`
\u672F\u8BED\u4E00

:   \u5B9A\u4E49\u4E00

\u5305\u542B\u6709*\u884C\u5185\u6807\u8BB0*\u7684\u672F\u8BED\u4E8C

:   \u5B9A\u4E49\u4E8C

        {\u4E00\u4E9B\u5B9A\u4E49\u4E8C\u7684\u6587\u5B57\u6216\u4EE3\u7801}

    \u5B9A\u4E49\u4E8C\u7684\u7B2C\u4E09\u6BB5

\`\`\`

## abbr
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
HTML \u89C4\u8303\u7531 W3C \u7EF4\u62A4
\`\`\`
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
HTML \u89C4\u8303\u7531 W3C \u7EF4\u62A4
\`\`\`

`},function(d,h){d.exports=`@[toc](\u76EE\u9304)

Markdown \u8A9E\u6CD5\u7C21\u4ECB
=============
> [\u8A9E\u6CD5\u8A73\u89E3](http://commonmark.org/help/)

## **\u7C97\u9AD4**
\`\`\`
**\u7C97\u9AD4**
__\u7C97\u9AD4__
\`\`\`
## *\u659C\u9AD4*
\`\`\`
*\u659C\u9AD4*
_\u659C\u9AD4_
\`\`\`
## \u6A19\u984C
\`\`\`
# \u4E00\u7D1A\u6A19\u984C #
\u4E00\u7D1A\u6A19\u984C
====
## \u4E8C\u7D1A\u6A19\u984C ##
\u4E8C\u7D1A\u6A19\u984C
----
### \u4E09\u7D1A\u6A19\u984C ###
#### \u56DB\u7D1A\u6A19\u984C ####
##### \u4E94\u7D1A\u6A19\u984C #####
###### \u516D\u7D1A\u6A19\u984C ######
\`\`\`
## \u5206\u5272\u7DDA
\`\`\`
***
---
\`\`\`
****
## ^\u4E0A^\u89D2~\u4E0B~\u6A19
\`\`\`
\u4E0A\u89D2\u6A19 x^2^
\u4E0B\u89D2\u6A19 H~2~0
\`\`\`
## ++\u4E0B\u5283\u7DDA++ ~~\u4E2D\u5283\u7DDA~~
\`\`\`
++\u4E0B\u5283\u7DDA++
~~\u4E2D\u5283\u7DDA~~
\`\`\`
## ==\u6A19\u8A18==
\`\`\`
==\u6A19\u8A18==
\`\`\`
## \u6BB5\u843D\u5F15\u7528
\`\`\`
> \u4E00\u7D1A
>> \u4E8C\u7D1A
>>> \u4E09\u7D1A
...
\`\`\`

## \u5217\u8868
\`\`\`
\u6709\u5E8F\u5217\u8868
1.
2.
3.
...
\u7121\u5E8F\u5217\u8868
-
-
...
\`\`\`

## \u4EFB\u52D9\u5217\u8868

- [x] \u5DF2\u5B8C\u6210\u4EFB\u52D9
- [ ] \u672A\u5B8C\u6210\u4EFB\u52D9

\`\`\`
- [x] \u5DF2\u5B8C\u6210\u4EFB\u52D9
- [ ] \u672A\u5B8C\u6210\u4EFB\u52D9
\`\`\`

## \u93C8\u63A5
\`\`\`
[\u93C8\u63A5](www.baidu.com)
![\u5716\u7247\u63CF\u8FF0](http://www.image.com)
\`\`\`
## \u4EE3\u78BC\u6BB5\u843D
\\\`\`\` type

\u4EE3\u78BC\u6BB5\u843D

\\\`\`\`

\\\` \u4EE3\u78BC\u584A \\\`

\`\`\`c++
int main()
{
    printf("hello world!");
}
\`\`\`
\`code\`
## \u8868\u683C(table)
\`\`\`
| \u6A19\u984C1 | \u6A19\u984C2 | \u6A19\u984C3 |
| :--  | :--: | ----: |
| \u5DE6\u5C0D\u9F4A | \u5C45\u4E2D | \u53F3\u5C0D\u9F4A |
| ---------------------- | ------------- | ----------------- |
\`\`\`
| \u6A19\u984C1 | \u6A19\u984C2 | \u6A19\u984C3 |
| :--  | :--: | ----: |
| \u5DE6\u5C0D\u9F4A | \u5C45\u4E2D | \u53F3\u5C0D\u9F4A |
| ---------------------- | ------------- | ----------------- |
## \u8173\u8A3B(footnote)
\`\`\`
hello[^hello]
\`\`\`

\u898B\u5E95\u90E8\u8173\u8A3B[^hello]

[^hello]: \u4E00\u500B\u8A3B\u8173

## \u8868\u60C5(emoji)
[\u53C3\u8003\u7DB2\u7AD9: https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
\`\`\`
:laughing:
:blush:
:smiley:
:)
...
\`\`\`
:laughing::blush::smiley::)

## $\\KaTeX$\u516C\u5F0F

\u6211\u5011\u53EF\u4EE5\u6E32\u67D3\u516C\u5F0F\u4F8B\u5982\uFF1A$x_i + y_i = z_i$\u548C$\\sum_{i=1}^n a_i=0$
\u6211\u5011\u4E5F\u53EF\u4EE5\u55AE\u884C\u6E32\u67D3
$$\\sum_{i=1}^n a_i=0$$
\u5177\u9AD4\u53EF\u53C3\u7167[katex\u6587\u6A94](http://www.intmath.com/cg5/katex-mathjax-comparison.php)\u548C[katex\u652F\u6301\u7684\u51FD\u6578](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)\u4EE5\u53CA[latex\u6587\u6A94](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## \u5E03\u5C40

::: hljs-left
\`::: hljs-left\`
\`\u5C45\u5DE6\`
\`:::\`
:::

::: hljs-center
\`::: hljs-center\`
\`\u5C45\u4E2D\`
\`:::\`
:::

::: hljs-right
\`::: hljs-right\`
\`\u5C45\u53F3\`
\`:::\`
:::

## \u5B9A\u7FA9

\u8853\u8A9E\u4E00

:   \u5B9A\u7FA9\u4E00

\u5305\u542B\u6709*\u884C\u5167\u6A19\u8A18*\u7684\u8853\u8A9E\u4E8C

:   \u5B9A\u7FA9\u4E8C

        {\u4E00\u4E9B\u5B9A\u7FA9\u4E8C\u7684\u6587\u5B57\u6216\u4EE3\u78BC}

    \u5B9A\u7FA9\u4E8C\u7684\u7B2C\u4E09\u6BB5

\`\`\`
\u8853\u8A9E\u4E00

:   \u5B9A\u7FA9\u4E00

\u5305\u542B\u6709*\u884C\u5167\u6A19\u8A18*\u7684\u8853\u8A9E\u4E8C

:   \u5B9A\u7FA9\u4E8C

        {\u4E00\u4E9B\u5B9A\u7FA9\u4E8C\u7684\u6587\u5B57\u6216\u4EE3\u78BC}

    \u5B9A\u7FA9\u4E8C\u7684\u7B2C\u4E09\u6BB5

\`\`\`

## abbr
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
HTML \u898F\u7BC4\u7531 W3C \u7DAD\u8B77
\`\`\`
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
HTML \u898F\u7BC4\u7531 W3C \u7DAD\u8B77
\`\`\`

`},function(d,h){d.exports=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/},function(d,h,s){h.Any=s(59),h.Cc=s(57),h.Cf=s(195),h.P=s(34),h.Z=s(58)},function(d,h,s){function t(e){s(202)}var r=s(16)(s(64),s(199),t,null,null);r.options.__file="D:\\work\\songwang\\yuangongji\\mavonEditor\\node_modules\\auto-textarea\\auto-textarea.vue",r.esModule&&Object.keys(r.esModule).some(function(e){return e!=="default"&&e.substr(0,2)!=="__"})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] auto-textarea.vue: functional components are not supported with templates, they should use render functions."),d.exports=r.exports},function(d,h,s){d.exports={render:function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"v-right-item"},[t._t("right-toolbar-before"),t._v(" "),t.toolbars.navigation?e("button",{directives:[{name:"show",rawName:"v-show",value:!t.s_navigation,expression:"!s_navigation"}],staticClass:"op-icon fa fa-mavon-bars",attrs:{type:"button","aria-hidden":"true",title:t.d_words.tl_navigation_on+" (F8)"},on:{click:function(i){return t.$clicks("navigation")}}}):t._e(),t._v(" "),t.toolbars.navigation?e("button",{directives:[{name:"show",rawName:"v-show",value:t.s_navigation,expression:"s_navigation"}],staticClass:"op-icon fa fa-mavon-bars selected",attrs:{type:"button","aria-hidden":"true",title:t.d_words.tl_navigation_off+" (F8)"},on:{click:function(i){return t.$clicks("navigation")}}}):t._e(),t._v(" "),t.toolbars.preview?e("button",{directives:[{name:"show",rawName:"v-show",value:t.s_preview_switch,expression:"s_preview_switch"}],staticClass:"op-icon fa fa-mavon-eye-slash selected",attrs:{type:"button","aria-hidden":"true",title:t.d_words.tl_edit+" (F9)"},on:{click:function(i){return t.$clicks("preview")}}}):t._e(),t._v(" "),t.toolbars.preview?e("button",{directives:[{name:"show",rawName:"v-show",value:!t.s_preview_switch,expression:"!s_preview_switch"}],staticClass:"op-icon fa fa-mavon-eye",attrs:{type:"button","aria-hidden":"true",title:t.d_words.tl_preview+" (F9)"},on:{click:function(i){return t.$clicks("preview")}}}):t._e(),t._v(" "),t.toolbars.fullscreen?e("button",{directives:[{name:"show",rawName:"v-show",value:!t.s_fullScreen,expression:"!s_fullScreen"}],staticClass:"op-icon fa fa-mavon-arrows-alt",attrs:{type:"button",title:t.d_words.tl_fullscreen_on+" (F10)","aria-hidden":"true"},on:{click:function(i){return t.$clicks("fullscreen")}}}):t._e(),t._v(" "),t.toolbars.fullscreen?e("button",{directives:[{name:"show",rawName:"v-show",value:t.s_fullScreen,expression:"s_fullScreen"}],staticClass:"op-icon fa fa-mavon-compress selected",attrs:{type:"button",title:t.d_words.tl_fullscreen_off+" (F10)","aria-hidden":"true"},on:{click:function(i){return t.$clicks("fullscreen")}}}):t._e(),t._v(" "),t.toolbars.readmodel?e("button",{staticClass:"op-icon fa fa-mavon-window-maximize",attrs:{type:"button","aria-hidden":"true",title:t.d_words.tl_read+" (F11)"},on:{click:function(i){return t.$clicks("read")}}}):t._e(),t._v(" "),t.toolbars.subfield?e("button",{staticClass:"op-icon fa fa-mavon-columns",class:{selected:t.s_subfield},attrs:{type:"button","aria-hidden":"true",title:(t.s_subfield?t.d_words.tl_single_column:t.d_words.tl_double_column)+" (F12)"},on:{click:function(i){return t.$clicks("subfield")}}}):t._e(),t._v(" "),t.toolbars.help&&t.toolbars.htmlcode&&t.toolbars.readmodel&&t.toolbars.fullscreen&&t.toolbars.subfield&&t.toolbars.navigation?e("span",{staticClass:"op-icon-divider"}):t._e(),t._v(" "),t.toolbars.htmlcode?e("button",{directives:[{name:"show",rawName:"v-show",value:!t.s_html_code,expression:"!s_html_code"}],staticClass:"op-icon fa fa-mavon-code",attrs:{type:"button",title:t.d_words.tl_html_on,"aria-hidden":"true"},on:{click:function(i){return t.$clicks("html")}}}):t._e(),t._v(" "),t.toolbars.htmlcode?e("button",{directives:[{name:"show",rawName:"v-show",value:t.s_html_code,expression:"s_html_code"}],staticClass:"op-icon fa fa-mavon-code selected",attrs:{type:"button",title:t.d_words.tl_html_off,"aria-hidden":"true"},on:{click:function(i){return t.$clicks("html")}}}):t._e(),t._v(" "),t.toolbars.help?e("button",{staticClass:"op-icon fa fa-mavon-question-circle",staticStyle:{"font-size":"17px",padding:"5px 6px 5px 3px"},attrs:{type:"button",title:t.d_words.tl_help,"aria-hidden":"true"},on:{click:function(i){return t.$clicks("help")}}}):t._e(),t._v(" "),t._t("right-toolbar-after")],2)},staticRenderFns:[]},d.exports.render._withStripped=!0},function(d,h,s){d.exports={render:function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"auto-textarea-wrapper",style:{fontSize:t.fontSize,lineHeight:t.lineHeight,height:t.fullHeight?"100%":"auto"}},[e("pre",{staticClass:"auto-textarea-block",style:{fontSize:t.fontSize,lineHeight:t.lineHeight,minHeight:t.fullHeight?"100%":"auto"}},[e("br"),t._v(t._s(t.temp_value)+" ")]),t._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.temp_value,expression:"temp_value"}],ref:"vTextarea",staticClass:"auto-textarea-input",class:{"no-border":!t.border,"no-resize":!t.resize},style:{fontSize:t.fontSize,lineHeight:t.lineHeight},attrs:{autofocus:t.s_autofocus,spellcheck:"false",placeholder:t.placeholder},domProps:{value:t.temp_value},on:{keyup:t.change,input:function(i){i.target.composing||(t.temp_value=i.target.value)}}})])},staticRenderFns:[]},d.exports.render._withStripped=!0},function(d,h,s){d.exports={render:function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"v-left-item"},[t._t("left-toolbar-before"),t._v(" "),t.toolbars.bold?e("button",{staticClass:"op-icon fa fa-mavon-bold",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_bold+" (ctrl+b)"},on:{click:function(i){return t.$clicks("bold")}}}):t._e(),t._v(" "),t.toolbars.italic?e("button",{staticClass:"op-icon fa fa-mavon-italic",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_italic+" (ctrl+i)"},on:{click:function(i){return t.$clicks("italic")}}}):t._e(),t._v(" "),t.toolbars.header?e("div",{staticClass:"op-icon fa fa-mavon-header dropdown dropdown-wrapper",class:{selected:t.s_header_dropdown_open},attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_header+" (ctrl+h)"},on:{mouseleave:t.$mouseleave_header_dropdown,mouseenter:t.$mouseenter_header_dropdown}},[e("transition",{attrs:{name:"fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.s_header_dropdown_open,expression:"s_header_dropdown_open"}],staticClass:"op-header popup-dropdown",class:{transition:t.transition},on:{mouseenter:t.$mouseenter_header_dropdown,mouseleave:t.$mouseleave_header_dropdown}},[e("div",{staticClass:"dropdown-item",attrs:{title:"#"},on:{click:function(i){return i.stopPropagation(),t.$click_header("header1")}}},[e("span",[t._v(t._s(t.d_words.tl_header_one))])]),t._v(" "),e("div",{staticClass:"dropdown-item",attrs:{title:"## "},on:{click:function(i){return i.stopPropagation(),t.$click_header("header2")}}},[e("span",[t._v(t._s(t.d_words.tl_header_two))])]),t._v(" "),e("div",{staticClass:"dropdown-item",attrs:{title:"### "},on:{click:function(i){return i.stopPropagation(),t.$click_header("header3")}}},[e("span",[t._v(t._s(t.d_words.tl_header_three))])]),t._v(" "),e("div",{staticClass:"dropdown-item",attrs:{title:"#### "},on:{click:function(i){return i.stopPropagation(),t.$click_header("header4")}}},[e("span",[t._v(t._s(t.d_words.tl_header_four))])]),t._v(" "),e("div",{staticClass:"dropdown-item",attrs:{title:"##### "},on:{click:function(i){return i.stopPropagation(),t.$click_header("header5")}}},[e("span",[t._v(t._s(t.d_words.tl_header_five))])]),t._v(" "),e("div",{staticClass:"dropdown-item",attrs:{title:"###### "},on:{click:function(i){return i.stopPropagation(),t.$click_header("header6")}}},[e("span",[t._v(t._s(t.d_words.tl_header_six))])])])])],1):t._e(),t._v(" "),t.toolbars.header||t.toolbars.italic||t.toolbars.bold?e("span",{staticClass:"op-icon-divider"}):t._e(),t._v(" "),t.toolbars.underline?e("button",{staticClass:"op-icon fa fa-mavon-underline",attrs:{disabled:!t.editable,type:"button",title:t.d_words.tl_underline+" (ctrl+u)","aria-hidden":"true"},on:{click:function(i){return t.$clicks("underline")}}}):t._e(),t._v(" "),t.toolbars.strikethrough?e("button",{staticClass:"op-icon fa fa-mavon-strikethrough",attrs:{disabled:!t.editable,type:"button",title:t.d_words.tl_strikethrough+" (ctrl+shift+d)","aria-hidden":"true"},on:{click:function(i){return t.$clicks("strikethrough")}}}):t._e(),t._v(" "),t.toolbars.mark?e("button",{staticClass:"op-icon fa fa-mavon-thumb-tack",attrs:{disabled:!t.editable,type:"button",title:t.d_words.tl_mark+" (ctrl+m)","aria-hidden":"true"},on:{click:function(i){return t.$clicks("mark")}}}):t._e(),t._v(" "),t.toolbars.superscript?e("button",{staticClass:"op-icon fa fa-mavon-superscript",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_superscript+" (ctrl+alt+s)"},on:{click:function(i){return t.$clicks("superscript")}}}):t._e(),t._v(" "),t.toolbars.subscript?e("button",{staticClass:"op-icon fa fa-mavon-subscript",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_subscript+" (ctrl+shift+s)"},on:{click:function(i){return t.$clicks("subscript")}}}):t._e(),t._v(" "),t.toolbars.alignleft?e("button",{staticClass:"op-icon fa fa-mavon-align-left",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_alignleft+" (ctrl+l)"},on:{click:function(i){return t.$clicks("alignleft")}}}):t._e(),t._v(" "),t.toolbars.aligncenter?e("button",{staticClass:"op-icon fa fa-mavon-align-center",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_aligncenter+" (ctrl+e)"},on:{click:function(i){return t.$clicks("aligncenter")}}}):t._e(),t._v(" "),t.toolbars.alignright?e("button",{staticClass:"op-icon fa fa-mavon-align-right",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_alignright+" (ctrl+r)"},on:{click:function(i){return t.$clicks("alignright")}}}):t._e(),t._v(" "),t.toolbars.superscript||t.toolbars.subscript||t.toolbars.underline||t.toolbars.strikethrough||t.toolbars.mark?e("span",{staticClass:"op-icon-divider"}):t._e(),t._v(" "),t.toolbars.quote?e("button",{staticClass:"op-icon fa fa-mavon-quote-left",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_quote+" (ctrl+q)"},on:{click:function(i){return t.$clicks("quote")}}}):t._e(),t._v(" "),t.toolbars.ol?e("button",{staticClass:"op-icon fa fa-mavon-list-ol",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_ol+" (ctrl+o)"},on:{click:function(i){return t.$clicks("ol")}}}):t._e(),t._v(" "),t.toolbars.ul?e("button",{staticClass:"op-icon fa fa-mavon-list-ul",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_ul+" (ctrl+alt+u)"},on:{click:function(i){return t.$clicks("ul")}}}):t._e(),t._v(" "),t.toolbars.ul||t.toolbars.ol||t.toolbars.quote?e("span",{staticClass:"op-icon-divider"}):t._e(),t._v(" "),t.toolbars.link?e("button",{staticClass:"op-icon fa fa-mavon-link",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_link+" (ctrl+l)"},on:{click:function(i){return i.stopPropagation(),t.$toggle_imgLinkAdd("link")}}}):t._e(),t._v(" "),t.toolbars.imagelink?e("div",{staticClass:"op-icon fa fa-mavon-picture-o dropdown dropdown-wrapper",class:{selected:t.s_img_dropdown_open},attrs:{disabled:!t.editable,type:"button","aria-hidden":"true"},on:{mouseleave:t.$mouseleave_img_dropdown,mouseenter:t.$mouseenter_img_dropdown}},[e("transition",{attrs:{name:"fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.s_img_dropdown_open,expression:"s_img_dropdown_open"}],staticClass:"op-image popup-dropdown",class:{transition:t.transition},on:{mouseleave:t.$mouseleave_img_dropdown,mouseenter:t.$mouseenter_img_dropdown}},[e("div",{staticClass:"dropdown-item",on:{click:function(i){return i.stopPropagation(),t.$toggle_imgLinkAdd("imagelink")}}},[e("span",[t._v(t._s(t.d_words.tl_image))])]),t._v(" "),e("div",{staticClass:"dropdown-item",staticStyle:{overflow:"hidden"}},[e("input",{attrs:{type:"file",accept:"image/gif,image/jpeg,image/jpg,image/png,image/svg",multiple:"multiple"},on:{change:function(i){return t.$imgAdd(i)}}}),t._v(t._s(t.d_words.tl_upload)+`
                `)]),t._v(" "),t._l(t.img_file,function(i,n){return i&&i[1]?e("div",{key:n,staticClass:"dropdown-item dropdown-images",attrs:{title:i[1].name},on:{click:function(a){return a.stopPropagation(),t.$imgFileListClick(n)}}},[e("span",[t._v(t._s(i[1].name))]),t._v(" "),e("button",{staticClass:"op-icon fa fa-mavon-times",attrs:{slot:"right",type:"button","aria-hidden":"true",title:t.d_words.tl_upload_remove},on:{click:function(a){return a.stopPropagation(),t.$imgDel(n)}},slot:"right"}),t._v(" "),e("img",{staticClass:"image-show",class:{transition:t.transition},attrs:{src:i[1].miniurl,alt:"none"}})]):t._e()})],2)])],1):t._e(),t._v(" "),t.toolbars.code?e("button",{staticClass:"op-icon fa fa-mavon-code",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_code+" (ctrl+alt+c)"},on:{click:function(i){return t.$clicks("code")}}}):t._e(),t._v(" "),t.toolbars.table?e("button",{staticClass:"op-icon fa fa-mavon-table",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_table+" (ctrl+alt+t)"},on:{click:function(i){return t.$clicks("table")}}}):t._e(),t._v(" "),t.toolbars.link||t.toolbars.imagelink||t.toolbars.code||t.toolbars.table?e("span",{staticClass:"op-icon-divider"}):t._e(),t._v(" "),t.toolbars.undo?e("button",{staticClass:"op-icon fa fa-mavon-undo",attrs:{type:"button","aria-hidden":"true",title:t.d_words.tl_undo+" (ctrl+z)"},on:{click:function(i){return t.$clicks("undo")}}}):t._e(),t._v(" "),t.toolbars.redo?e("button",{staticClass:"op-icon fa fa-mavon-repeat",attrs:{type:"button","aria-hidden":"true",title:t.d_words.tl_redo+" (ctrl+y)"},on:{click:function(i){return t.$clicks("redo")}}}):t._e(),t._v(" "),t.toolbars.trash?e("button",{staticClass:"op-icon fa fa-mavon-trash-o",attrs:{type:"button","aria-hidden":"true",title:t.d_words.tl_trash+" (ctrl+breakspace)"},on:{click:function(i){return t.$clicks("trash")}}}):t._e(),t._v(" "),t.toolbars.save?e("button",{staticClass:"op-icon fa fa-mavon-floppy-o",attrs:{type:"button","aria-hidden":"true",title:t.d_words.tl_save+" (ctrl+s)"},on:{click:function(i){return t.$clicks("save")}}}):t._e(),t._v(" "),t._t("left-toolbar-after"),t._v(" "),e("transition",{attrs:{name:"fade"}},[t.s_img_link_open?e("div",{staticClass:"add-image-link-wrapper"},[e("div",{staticClass:"add-image-link"},[e("i",{staticClass:"fa fa-mavon-times",attrs:{"aria-hidden":"true"},on:{click:function(i){i.stopPropagation(),i.preventDefault(),t.s_img_link_open=!1}}}),t._v(" "),e("h3",{staticClass:"title"},[t._v(t._s(t.link_type=="link"?t.d_words.tl_popup_link_title:t.d_words.tl_popup_img_link_title))]),t._v(" "),e("div",{staticClass:"link-text input-wrapper"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.link_text,expression:"link_text"}],ref:"linkTextInput",attrs:{type:"text",placeholder:t.link_type=="link"?t.d_words.tl_popup_link_text:t.d_words.tl_popup_img_link_text},domProps:{value:t.link_text},on:{input:function(i){i.target.composing||(t.link_text=i.target.value)}}})]),t._v(" "),e("div",{staticClass:"link-addr input-wrapper"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.link_addr,expression:"link_addr"}],attrs:{type:"text",placeholder:t.link_type=="link"?t.d_words.tl_popup_link_addr:t.d_words.tl_popup_img_link_addr},domProps:{value:t.link_addr},on:{input:function(i){i.target.composing||(t.link_addr=i.target.value)}}})]),t._v(" "),e("div",{staticClass:"op-btn cancel",on:{click:function(i){i.stopPropagation(),t.s_img_link_open=!1}}},[t._v(t._s(t.d_words.tl_popup_link_cancel))]),t._v(" "),e("div",{staticClass:"op-btn sure",on:{click:function(i){return i.stopPropagation(),t.$imgLinkAdd()}}},[t._v(t._s(t.d_words.tl_popup_link_sure))])])]):t._e()])],2)},staticRenderFns:[]},d.exports.render._withStripped=!0},function(d,h,s){d.exports={render:function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"v-note-wrapper markdown-body",class:[{fullscreen:t.s_fullScreen,shadow:t.boxShadow}],style:{"box-shadow":t.boxShadow?t.boxShadowStyle:""}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.toolbarsFlag,expression:"toolbarsFlag"}],staticClass:"v-note-op",style:{background:t.toolbarsBackground}},[e("v-md-toolbar-left",{ref:"toolbar_left",class:{transition:t.transition},attrs:{editable:t.editable,transition:t.transition,d_words:t.d_words,toolbars:t.toolbars,image_filter:t.imageFilter},on:{toolbar_left_click:t.toolbar_left_click,toolbar_left_addlink:t.toolbar_left_addlink,imgAdd:t.$imgAdd,imgDel:t.$imgDel,imgTouch:t.$imgTouch}},[t._t("left-toolbar-before",null,{slot:"left-toolbar-before"}),t._v(" "),t._t("left-toolbar-after",null,{slot:"left-toolbar-after"})],2),t._v(" "),e("v-md-toolbar-right",{ref:"toolbar_right",class:{transition:t.transition},attrs:{d_words:t.d_words,toolbars:t.toolbars,s_subfield:t.s_subfield,s_preview_switch:t.s_preview_switch,s_fullScreen:t.s_fullScreen,s_html_code:t.s_html_code,s_navigation:t.s_navigation},on:{toolbar_right_click:t.toolbar_right_click}},[t._t("right-toolbar-before",null,{slot:"right-toolbar-before"}),t._v(" "),t._t("right-toolbar-after",null,{slot:"right-toolbar-after"})],2)],1),t._v(" "),e("div",{staticClass:"v-note-panel"},[e("div",{ref:"vNoteEdit",staticClass:"v-note-edit divarea-wrapper",class:{"scroll-style":t.s_scrollStyle,"scroll-style-border-radius":t.s_scrollStyle&&!t.s_preview_switch&&!t.s_html_code,"single-edit":!t.s_preview_switch&&!t.s_html_code,"single-show":!t.s_subfield&&t.s_preview_switch||!t.s_subfield&&t.s_html_code,transition:t.transition},on:{scroll:t.$v_edit_scroll,click:t.textAreaFocus}},[e("div",{staticClass:"content-input-wrapper",style:{"background-color":t.editorBackground}},[e("v-autoTextarea",{ref:"vNoteTextarea",staticClass:"content-input",style:{"background-color":t.editorBackground},attrs:{placeholder:t.placeholder?t.placeholder:t.d_words.start_editor,fontSize:t.fontSize,lineHeight:"1.5",fullHeight:""},model:{value:t.d_value,callback:function(i){t.d_value=i},expression:"d_value"}})],1)]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.s_preview_switch||t.s_html_code,expression:"s_preview_switch || s_html_code"}],staticClass:"v-note-show",class:{"single-show":!t.s_subfield&&t.s_preview_switch||!t.s_subfield&&t.s_html_code}},[e("div",{directives:[{name:"show",rawName:"v-show",value:!t.s_html_code,expression:"!s_html_code"}],ref:"vShowContent",staticClass:"v-show-content",class:{"scroll-style":t.s_scrollStyle,"scroll-style-border-radius":t.s_scrollStyle},style:{"background-color":t.previewBackground},domProps:{innerHTML:t._s(t.d_render)}}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.s_html_code,expression:"s_html_code"}],staticClass:"v-show-content-html",class:{"scroll-style":t.s_scrollStyle,"scroll-style-border-radius":t.s_scrollStyle},style:{"background-color":t.previewBackground}},[t._v(`
                `+t._s(t.d_render)+`
            `)])]),t._v(" "),e("transition",{attrs:{name:"slideTop"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.s_navigation,expression:"s_navigation"}],staticClass:"v-note-navigation-wrapper",class:{transition:t.transition}},[e("div",{staticClass:"v-note-navigation-title"},[t._v(`
                    `+t._s(t.d_words.navigation_title)),e("i",{staticClass:"fa fa-mavon-times v-note-navigation-close",attrs:{"aria-hidden":"true"},on:{click:function(i){return t.toolbar_right_click("navigation")}}})]),t._v(" "),e("div",{ref:"navigationContent",staticClass:"v-note-navigation-content",class:{"scroll-style":t.s_scrollStyle}})])])],1),t._v(" "),e("transition",{attrs:{name:"fade"}},[e("div",{ref:"help"},[t.s_help?e("div",{staticClass:"v-note-help-wrapper",on:{click:function(i){return i.target!==i.currentTarget?null:t.toolbar_right_click("help")}}},[e("div",{staticClass:"v-note-help-content markdown-body",class:{shadow:t.boxShadow}},[e("i",{staticClass:"fa fa-mavon-times",attrs:{"aria-hidden":"true"},on:{click:function(i){return i.stopPropagation(),i.preventDefault(),t.toolbar_right_click("help")}}}),t._v(" "),e("div",{staticClass:"scroll-style v-note-help-show",domProps:{innerHTML:t._s(t.d_help)}})])]):t._e()])]),t._v(" "),e("transition",{attrs:{name:"fade"}},[t.d_preview_imgsrc?e("div",{staticClass:"v-note-img-wrapper",on:{click:function(i){t.d_preview_imgsrc=null}}},[e("img",{attrs:{src:t.d_preview_imgsrc,alt:"none"}})]):t._e()]),t._v(" "),e("div",{ref:"vReadModel",staticClass:"v-note-read-model scroll-style",class:{show:t.s_readmodel}},[e("div",{ref:"vNoteReadContent",staticClass:"v-note-read-content",domProps:{innerHTML:t._s(t.d_render)}})])],1)},staticRenderFns:[]},d.exports.render._withStripped=!0},function(d,h,s){var t=s(107);typeof t=="string"&&(t=[[d.i,t,""]]),t.locals&&(d.exports=t.locals),s(17)("c0faed68",t,!1,{})},function(d,h,s){var t=s(108);typeof t=="string"&&(t=[[d.i,t,""]]),t.locals&&(d.exports=t.locals),s(17)("118de024",t,!1,{})},function(d,h,s){var t=s(109);typeof t=="string"&&(t=[[d.i,t,""]]),t.locals&&(d.exports=t.locals),s(17)("2f84471f",t,!1,{})},function(d,h,s){var t=s(110);typeof t=="string"&&(t=[[d.i,t,""]]),t.locals&&(d.exports=t.locals),s(17)("6daa4aa0",t,!1,{})},function(d,h){d.exports=function(s,t){for(var r=[],e={},i=0;i<t.length;i++){var n=t[i],a=n[0],u=n[1],c=n[2],o=n[3],l={id:s+":"+i,css:u,media:c,sourceMap:o};e[a]?e[a].parts.push(l):r.push(e[a]={id:a,parts:[l]})}return r}},function(d,h){var s;s=function(){return this}();try{s=s||Function("return this")()||(0,eval)("this")}catch{typeof window=="object"&&(s=window)}d.exports=s},function(d,h){d.exports=function(s){return s.webpackPolyfill||(s.deprecate=function(){},s.paths=[],s.children||(s.children=[]),Object.defineProperty(s,"loaded",{enumerable:!0,get:function(){return s.l}}),Object.defineProperty(s,"id",{enumerable:!0,get:function(){return s.i}}),s.webpackPolyfill=1),s}},function(d,h,s){function t(a,u){return new i(u).process(a)}var r=s(60),e=s(61),i=s(210);h=d.exports=t,h.filterXSS=t,h.FilterXSS=i;for(var n in r)h[n]=r[n];for(var n in e)h[n]=e[n];typeof window!="undefined"&&(window.filterXSS=d.exports),function(){return typeof self!="undefined"&&typeof DedicatedWorkerGlobalScope!="undefined"&&self instanceof DedicatedWorkerGlobalScope}()&&(self.filterXSS=d.exports)},function(d,h,s){function t(p){return p==null}function r(p){var _=l.spaceIndex(p);if(_===-1)return{html:"",closing:p[p.length-2]==="/"};p=l.trim(p.slice(_+1,-1));var f=p[p.length-1]==="/";return f&&(p=l.trim(p.slice(0,-1))),{html:p,closing:f}}function e(p){var _={};for(var f in p)_[f]=p[f];return _}function i(p){p=e(p||{}),p.stripIgnoreTag&&(p.onIgnoreTag&&console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'),p.onIgnoreTag=a.onIgnoreTagStripAll),p.whiteList=p.whiteList||a.whiteList,p.onTag=p.onTag||a.onTag,p.onTagAttr=p.onTagAttr||a.onTagAttr,p.onIgnoreTag=p.onIgnoreTag||a.onIgnoreTag,p.onIgnoreTagAttr=p.onIgnoreTagAttr||a.onIgnoreTagAttr,p.safeAttrValue=p.safeAttrValue||a.safeAttrValue,p.escapeHtml=p.escapeHtml||a.escapeHtml,this.options=p,p.css===!1?this.cssFilter=!1:(p.css=p.css||{},this.cssFilter=new n(p.css))}var n=s(31).FilterCSS,a=s(60),u=s(61),c=u.parseTag,o=u.parseAttr,l=s(35);i.prototype.process=function(p){if(p=p||"",!(p=p.toString()))return"";var _=this,f=_.options,b=f.whiteList,g=f.onTag,m=f.onIgnoreTag,w=f.onTagAttr,v=f.onIgnoreTagAttr,x=f.safeAttrValue,k=f.escapeHtml,C=_.cssFilter;f.stripBlankChar&&(p=a.stripBlankChar(p)),f.allowCommentTag||(p=a.stripCommentTag(p));var y=!1;if(f.stripIgnoreTagBody){var y=a.StripTagBody(f.stripIgnoreTagBody,m);m=y.onIgnoreTag}var A=c(p,function(T,L,j,S,M){var F={sourcePosition:T,position:L,isClosing:M,isWhite:b.hasOwnProperty(j)},P=g(j,S,F);if(!t(P))return P;if(F.isWhite){if(F.isClosing)return"</"+j+">";var E=r(S),q=b[j],O=o(E.html,function(z,$){var R=l.indexOf(q,z)!==-1,B=w(j,z,$,R);if(!t(B))return B;if(R)return $=x(j,z,$,C),$?z+'="'+$+'"':z;var B=v(j,z,$,R);return t(B)?void 0:B}),S="<"+j;return O&&(S+=" "+O),E.closing&&(S+=" /"),S+=">"}var P=m(j,S,F);return t(P)?k(S):P},k);return y&&(A=y.remove(A)),A},d.exports=i},function(d,h){d.exports={start_editor:"Bearbeitung beginnen...",navigation_title:"Navigation",tl_bold:"Fett",tl_italic:"Kursiv",tl_header:"\xDCberschrift",tl_header_one:"\xDCberschrift 1",tl_header_two:"\xDCberschrift 2",tl_header_three:"\xDCberschrift 3",tl_header_four:"\xDCberschrift 4",tl_header_five:"\xDCberschrift 5",tl_header_six:"\xDCberschrift 6",tl_underline:"Unterstrichen",tl_strikethrough:"Durchgestrichen",tl_mark:"Markiert",tl_superscript:"Hochgestellt",tl_subscript:"Tiefgestellt",tl_quote:"Zitat",tl_ol:"Ol",tl_ul:"Ul",tl_link:"Link",tl_image:"Link mit Bild",tl_code:"Code",tl_table:"Tabelle",tl_undo:"R\xFCckg\xE4ngig",tl_redo:"Wiederherstellen",tl_trash:"M\xFClleimer",tl_save:"Speichern",tl_navigation_on:"Navigation AN",tl_navigation_off:"Navigation AUS",tl_preview:"Vorschau",tl_aligncenter:"Text zentrieren",tl_alignleft:"Nach links ausrichten",tl_alignright:"Nach rechts ausrichten",tl_edit:"Bearbeiten",tl_single_column:"Einspaltig",tl_double_column:"Zweispaltig",tl_fullscreen_on:"Vollbild AN",tl_fullscreen_off:"Vollbild AUS",tl_read:"Lesemodus",tl_html_on:"HTML AN",tl_html_off:"HTML AUS",tl_help:"Markdown Handbuch",tl_upload:"Bilder-Upload",tl_upload_remove:"Entfernen",tl_popup_link_title:"Link hinzuf\xFCgen",tl_popup_link_text:"Text des Links",tl_popup_link_addr:"Linkziel",tl_popup_img_link_title:"Bild hinzuf\xFCgen",tl_popup_img_link_text:"Text des Bildes",tl_popup_img_link_addr:"Link auf Bild",tl_popup_link_sure:"Ja",tl_popup_link_cancel:"Abbruch"}},function(d,h){d.exports={start_editor:"Begin editing...",navigation_title:"Navigation",tl_bold:"Bold",tl_italic:"Italic",tl_header:"Header",tl_header_one:"Header 1",tl_header_two:"Header 2",tl_header_three:"Header 3",tl_header_four:"Header 4",tl_header_five:"Header 5",tl_header_six:"Header 6",tl_underline:"Underline",tl_strikethrough:"Strikethrough",tl_mark:"Mark",tl_superscript:"Superscript",tl_subscript:"Subscript",tl_quote:"Quote",tl_ol:"Ol",tl_ul:"Ul",tl_link:"Link",tl_image:"Image Link",tl_code:"Code",tl_table:"Table",tl_undo:"Undo",tl_redo:"Redo",tl_trash:"Trash",tl_save:"Save",tl_navigation_on:"Navigation ON",tl_navigation_off:"Navigation OFF",tl_preview:"Preview",tl_aligncenter:"Center text",tl_alignleft:"Clamp text to the left",tl_alignright:"Clamp text to the right",tl_edit:"Edit",tl_single_column:"Single Column",tl_double_column:"Double Columns",tl_fullscreen_on:"FullScreen ON",tl_fullscreen_off:"FullScreen OFF",tl_read:"Read Model",tl_html_on:"HTML ON",tl_html_off:"HTML OFF",tl_help:"Markdown Guide",tl_upload:"Upload Images",tl_upload_remove:"Remove",tl_popup_link_title:"Add Link",tl_popup_link_text:"Link text",tl_popup_link_addr:"Link address",tl_popup_img_link_title:"Add Image",tl_popup_img_link_text:"Image Text",tl_popup_img_link_addr:"Image Link",tl_popup_link_sure:"Sure",tl_popup_link_cancel:"Cancel"}},function(d,h){d.exports={start_editor:"D\xE9but d'\xE9dition...",navigation_title:"Navigation",tl_bold:"Gras",tl_italic:"Italique",tl_header:"Ent\xEAte",tl_header_one:"Ent\xEAte 1",tl_header_two:"Ent\xEAte 2",tl_header_three:"Ent\xEAte 3",tl_header_four:"Ent\xEAte 4",tl_header_five:"Ent\xEAte 5",tl_header_six:"Ent\xEAte 6",tl_underline:"Soulign\xE9",tl_strikethrough:"Barr\xE9",tl_mark:"Mark",tl_superscript:"Exposant",tl_subscript:"Sous-exposant",tl_quote:"Quote",tl_ol:"Liste ",tl_ul:"Puce",tl_link:"Lien",tl_image:"Image Lien",tl_code:"Code",tl_table:"Table",tl_undo:"Annuler",tl_redo:"Refaire",tl_trash:"Supprimer",tl_save:"Sauver",tl_navigation_on:"Activer la navigation",tl_navigation_off:"D\xE9sactiver le navigation",tl_preview:"Previsualis\xE9",tl_aligncenter:"Center le texte",tl_alignleft:"F\xE9rer le texte \xE0 gauche",tl_alignright:"F\xE9rer le texte \xE0 droite",tl_edit:"Editer",tl_single_column:"Seule Colonne",tl_double_column:"Colonnes Doubles",tl_fullscreen_on:"Activer le mode plein \xE9cran",tl_fullscreen_off:"D\xE9sactiver le mode plein \xE9cran",tl_read:"Lire le mod\xE8le",tl_html_on:"Activer le mode HTML",tl_html_off:"D\xE9sactiver le mode HTML",tl_help:"Guide Markdown",tl_upload:"T\xE9l\xE9charger les images",tl_upload_remove:"Supprimer",tl_popup_link_title:"Ajouter un lien",tl_popup_link_text:"Description",tl_popup_link_addr:"Link",tl_popup_img_link_title:"Ajouter une image",tl_popup_img_link_text:"Description",tl_popup_img_link_addr:"Link",tl_popup_link_sure:"s\xFBr",tl_popup_link_cancel:"Annuler"}},function(d,h){d.exports={start_editor:"\u7DE8\u96C6\u3092\u59CB\u3081\u3066\u306D\uFF01",navigation_title:"\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3",tl_bold:"\u592A\u5B57",tl_italic:"\u659C\u4F53",tl_header:"\u898B\u51FA\u3057",tl_header_one:"\u898B\u51FA\u30571",tl_header_two:"\u898B\u51FA\u30572",tl_header_three:"\u898B\u51FA\u30573",tl_header_four:"\u898B\u51FA\u30574",tl_header_five:"\u898B\u51FA\u30575",tl_header_six:"\u898B\u51FA\u30576",tl_underline:"\u4E0B\u7DDA",tl_strikethrough:"\u53D6\u308A\u6D88\u3057\u7DDA",tl_mark:"\u86CD\u5149\u30DA\u30F3",tl_superscript:"\u4E0A\u4ED8\u304D\u6587\u5B57",tl_subscript:"\u4E0B\u4ED8\u304D\u6587\u5B57",tl_quote:"\u5F15\u7528",tl_ol:"\u756A\u53F7\u4ED8\u304D\u30EA\u30B9\u30C8",tl_ul:"\u7B87\u6761\u66F8\u304D\u30EA\u30B9\u30C8",tl_link:"\u30CF\u30A4\u30D1\u30FC\u30EA\u30F3\u30AF",tl_image:"\u753B\u50CF\u306E\u30EA\u30F3\u30AF",tl_code:"\u30B3\u30FC\u30C9\u306E\u633F\u5165",tl_table:"\u8868\u306E\u633F\u5165",tl_undo:"\u623B\u308B",tl_redo:"\u9032\u3080",tl_trash:"\u524A\u9664",tl_save:"\u4FDD\u5B58",tl_navigation_on:"\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3\u3092\u8868\u793A",tl_navigation_off:"\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3\u3092\u975E\u8868\u793A",tl_preview:"\u30D7\u30EC\u30D3\u30E5\u30FC",tl_aligncenter:"\u4E2D\u592E\u63C3\u3048",tl_alignleft:"\u5DE6\u63C3\u3048",tl_alignright:"\u53F3\u63C3\u3048",tl_edit:"\u7DE8\u96C6",tl_single_column:"\u4E00\u5217",tl_double_column:"\u4E8C\u5217",tl_fullscreen_on:"\u5168\u753B\u9762\u8868\u793A",tl_fullscreen_off:"\u5168\u753B\u9762\u8868\u793A\u306E\u7D42\u4E86",tl_read:"\u30E2\u30C7\u30EB\u306E\u8AAD\u307F\u8FBC\u307F",tl_html_on:"HTML\u3067\u8868\u793A",tl_html_off:"HTML\u8868\u793A\u306E\u7D42\u4E86",tl_help:"\u30D8\u30EB\u30D7",tl_upload:"\u753B\u50CF\u3092\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9",tl_upload_remove:"\u753B\u50CF\u306E\u524A\u9664",tl_popup_link_title:"\u30EA\u30F3\u30AF\u306E\u8FFD\u52A0",tl_popup_link_text:"\u30EA\u30F3\u30AF\u30C6\u30AD\u30B9\u30C8",tl_popup_link_addr:"\u30EA\u30F3\u30AF\u5148\u306EURL",tl_popup_img_link_title:"\u753B\u50CF\u306E\u8FFD\u52A0",tl_popup_img_link_text:"\u753B\u50CF\u30BF\u30A4\u30C8\u30EB",tl_popup_img_link_addr:"\u753B\u50CFURL",tl_popup_link_sure:"OK",tl_popup_link_cancel:"\u623B\u308B"}},function(d,h){d.exports={start_editor:"Come\xE7ar edi\xE7\xE3o...",navigation_title:"Navega\xE7\xE3o",tl_bold:"Negrito",tl_italic:"It\xE1lico",tl_header:"Cabe\xE7alho",tl_header_one:"Cabe\xE7alho 1",tl_header_two:"Cabe\xE7alho 2",tl_header_three:"Cabe\xE7alho 3",tl_header_four:"Cabe\xE7alho 4",tl_header_five:"Cabe\xE7alho 5",tl_header_six:"Cabe\xE7alho 6",tl_underline:"Sublinhar",tl_strikethrough:"Tachar",tl_mark:"Marca\xE7\xE3o",tl_superscript:"Sobrescrito",tl_subscript:"Subscrito",tl_quote:"Cita\xE7\xE3o",tl_ol:"Lista Numerada",tl_ul:"Lista com marcadores",tl_link:"Link",tl_image:"Link de imagem",tl_code:"C\xF3digo",tl_table:"Tabela",tl_undo:"Desfazer",tl_redo:"Refazer",tl_trash:"Lixo",tl_save:"Salvar",tl_navigation_on:"Mostrar Navega\xE7\xE3o",tl_navigation_off:"Esconder Navega\xE7\xE3o",tl_preview:"Preview",tl_aligncenter:"Alinhar no centro",tl_alignleft:"Alinhar \xE0 esquerda",tl_alignright:"Alinhar \xE0 direita",tl_edit:"Editar",tl_single_column:"Coluna \xDAnica",tl_double_column:"Duas Colunas",tl_fullscreen_on:"Ligar Tela Cheia",tl_fullscreen_off:"Desligar Tela Cheia",tl_read:"Modo de Leitura",tl_html_on:"Ligar HTML",tl_html_off:"Desligar HTML",tl_help:"Guia Markdown",tl_upload:"Upload de Imagens",tl_upload_remove:"Remover",tl_popup_link_title:"Adicionar Link",tl_popup_link_text:"Descri\xE7\xE3o",tl_popup_link_addr:"Link",tl_popup_img_link_title:"Adicionar fotos",tl_popup_img_link_text:"Descri\xE7\xE3o",tl_popup_img_link_addr:"Link",tl_popup_link_sure:"Confirmar",tl_popup_link_cancel:"Cancelar"}},function(d,h){d.exports={start_editor:"\u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435...",navigation_title:"\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F",tl_bold:"\u041F\u043E\u043B\u0443\u0436\u0438\u0440\u043D\u044B\u0439",tl_italic:"\u041A\u0443\u0440\u0441\u0438\u0432",tl_header:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438",tl_header_one:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 1",tl_header_two:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 2",tl_header_three:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 3",tl_header_four:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 4",tl_header_five:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 5",tl_header_six:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 6",tl_underline:"\u041F\u043E\u0434\u0447\u0435\u0440\u043A\u043D\u0443\u0442\u044B\u0439",tl_strikethrough:"\u0417\u0430\u0447\u0435\u0440\u043A\u043D\u0443\u0442\u044B\u0439",tl_mark:"\u041E\u0442\u043C\u0435\u0442\u043A\u0430",tl_superscript:"\u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u0438\u043D\u0434\u0435\u043A\u0441",tl_subscript:"\u041D\u0438\u0436\u043D\u0438\u0439 \u0438\u043D\u0434\u0435\u043A\u0441",tl_quote:"\u0426\u0438\u0442\u0430\u0442\u0430",tl_ol:"\u041D\u0443\u043C\u0435\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A",tl_ul:"\u0421\u043F\u0438\u0441\u043E\u043A",tl_link:"\u0421\u0441\u044B\u043B\u043A\u0430",tl_image:"\u0421\u0441\u044B\u043B\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",tl_code:"\u041A\u043E\u0434",tl_table:"\u0422\u0430\u0431\u043B\u0438\u0446\u0430",tl_undo:"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",tl_redo:"\u0412\u0435\u0440\u043D\u0443\u0442\u044C",tl_trash:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",tl_save:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",tl_navigation_on:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044E",tl_navigation_off:"\u0421\u043A\u0440\u044B\u0442\u044C \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044E",tl_preview:"\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440",tl_aligncenter:"\u0412\u044B\u0440\u043E\u0432\u043D\u044F\u0442\u044C \u043F\u043E \u0446\u0435\u043D\u0442\u0440\u0443",tl_alignleft:"\u0412\u044B\u0440\u043E\u0432\u043D\u044F\u0442\u044C \u043F\u043E \u043B\u0435\u0432\u043E\u043C\u0443 \u043A\u0440\u0430\u044E",tl_alignright:"\u0412\u044B\u0440\u043E\u0432\u043D\u044F\u0442\u044C \u043F\u043E \u043F\u0440\u0430\u0432\u043E\u043C\u0443 \u043A\u0440\u0430\u044E",tl_edit:"\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440",tl_single_column:"\u041E\u0434\u043D\u043E \u043F\u043E\u043B\u0435",tl_double_column:"\u0414\u0432\u0430 \u043F\u043E\u043B\u044F",tl_fullscreen_on:"\u041F\u043E\u043B\u043D\u043E\u044D\u043A\u0440\u0430\u043D\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C",tl_fullscreen_off:"\u0412\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043F\u043E\u043B\u043D\u043E\u044D\u043A\u0440\u0430\u043D\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C",tl_read:"\u0420\u0435\u0436\u0438\u043C \u0447\u0442\u0435\u043D\u0438\u044F",tl_html_on:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C HTML",tl_html_off:"\u0423\u0431\u0440\u0430\u0442\u044C HTML",tl_help:"Markdown \u043F\u043E\u043C\u043E\u0449\u044C",tl_upload:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",tl_upload_remove:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",tl_popup_link_title:"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",tl_popup_link_text:"\u0422\u0435\u043A\u0441\u0442 \u0441\u0441\u044B\u043B\u043A\u0438",tl_popup_link_addr:"\u0410\u0434\u0440\u0435\u0441 \u0441\u0441\u044B\u043B\u043A\u0438",tl_popup_img_link_title:"\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",tl_popup_img_link_text:"\u0422\u0435\u043A\u0441\u0442 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",tl_popup_img_link_addr:"\u0421\u0441\u044B\u043B\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",tl_popup_link_sure:"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",tl_popup_link_cancel:"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C"}},function(d,h){d.exports={start_editor:"\u5F00\u59CB\u7F16\u8F91...",navigation_title:"\u5BFC\u822A\u76EE\u5F55",tl_bold:"\u7C97\u4F53",tl_italic:"\u659C\u4F53",tl_header:"\u6807\u9898",tl_header_one:"\u4E00\u7EA7\u6807\u9898",tl_header_two:"\u4E8C\u7EA7\u6807\u9898",tl_header_three:"\u4E09\u7EA7\u6807\u9898",tl_header_four:"\u56DB\u7EA7\u6807\u9898",tl_header_five:"\u4E94\u7EA7\u6807\u9898",tl_header_six:"\u516D\u7EA7\u6807\u9898",tl_underline:"\u4E0B\u5212\u7EBF",tl_strikethrough:"\u4E2D\u5212\u7EBF",tl_mark:"\u6807\u8BB0",tl_superscript:"\u4E0A\u89D2\u6807",tl_subscript:"\u4E0B\u89D2\u6807",tl_quote:"\u6BB5\u843D\u5F15\u7528",tl_ol:"\u6709\u5E8F\u5217\u8868",tl_ul:"\u65E0\u5E8F\u5217\u8868",tl_link:"\u94FE\u63A5",tl_image:"\u6DFB\u52A0\u56FE\u7247\u94FE\u63A5",tl_code:"\u4EE3\u7801\u5757",tl_table:"\u8868\u683C",tl_undo:"\u4E0A\u4E00\u6B65",tl_redo:"\u4E0B\u4E00\u6B65",tl_trash:"\u6E05\u7A7A",tl_save:"\u4FDD\u5B58",tl_navigation_on:"\u5F00\u542F\u6807\u9898\u5BFC\u822A",tl_navigation_off:"\u5173\u95ED\u6807\u9898\u5BFC\u822A",tl_preview:"\u9884\u89C8",tl_aligncenter:"\u5C45\u4E2D",tl_alignleft:"\u5C45\u5DE6",tl_alignright:"\u5C45\u53F3",tl_edit:"\u7F16\u8F91",tl_single_column:"\u5355\u680F",tl_double_column:"\u53CC\u680F",tl_fullscreen_on:"\u5168\u5C4F\u7F16\u8F91",tl_fullscreen_off:"\u9000\u51FA\u5168\u5C4F",tl_read:"\u6C89\u6D78\u5F0F\u9605\u8BFB",tl_html_on:"\u67E5\u770Bhtml\u6587\u672C",tl_html_off:"\u8FD4\u56DEmarkdown\u6587\u672C",tl_help:"markdown\u8BED\u6CD5\u5E2E\u52A9",tl_upload:"\u4E0A\u4F20\u56FE\u7247",tl_upload_remove:"\u5220\u9664",tl_popup_link_title:"\u6DFB\u52A0\u94FE\u63A5",tl_popup_link_text:"\u94FE\u63A5\u63CF\u8FF0",tl_popup_link_addr:"\u94FE\u63A5\u5730\u5740",tl_popup_img_link_title:"\u6DFB\u52A0\u56FE\u7247",tl_popup_img_link_text:"\u56FE\u7247\u63CF\u8FF0",tl_popup_img_link_addr:"\u56FE\u7247\u94FE\u63A5",tl_popup_link_sure:"\u786E\u5B9A",tl_popup_link_cancel:"\u53D6\u6D88"}},function(d,h){d.exports={start_editor:"\u958B\u59CB\u7DE8\u8F2F...",navigation_title:"\u5C0E\u822A\u76EE\u9304",tl_bold:"\u7C97\u9AD4",tl_italic:"\u659C\u9AD4",tl_header:"\u6A19\u984C",tl_header_one:"\u4E00\u7D1A\u6A19\u984C",tl_header_two:"\u4E8C\u7D1A\u6A19\u984C",tl_header_three:"\u4E09\u7D1A\u6A19\u984C",tl_header_four:"\u56DB\u7D1A\u6A19\u984C",tl_header_five:"\u4E94\u7D1A\u6A19\u984C",tl_header_six:"\u516D\u7D1A\u6A19\u984C",tl_underline:"\u4E0B\u5283\u7DDA",tl_strikethrough:"\u4E2D\u5283\u7DDA",tl_mark:"\u6A19\u8A18",tl_superscript:"\u4E0A\u89D2\u6A19",tl_subscript:"\u4E0B\u89D2\u6A19",tl_quote:"\u6BB5\u843D\u5F15\u7528",tl_ol:"\u6709\u5E8F\u5217\u8868",tl_ul:"\u7121\u5E8F\u5217\u8868",tl_link:"\u93C8\u63A5",tl_image:"\u6DFB\u52A0\u5716\u7247\u93C8\u63A5",tl_code:"\u4EE3\u78BC\u584A",tl_table:"\u8868\u683C",tl_undo:"\u4E0A\u4E00\u6B65",tl_redo:"\u4E0B\u4E00\u6B65",tl_trash:"\u6E05\u7A7A",tl_save:"\u4FDD\u5B58",tl_navigation_on:"\u958B\u555F\u6A19\u984C\u5C0E\u822A",tl_navigation_off:"\u95DC\u9589\u6A19\u984C\u5C0E\u822A",tl_preview:"\u9810\u89BD",tl_aligncenter:"\u5C45\u4E2D",tl_alignleft:"\u5C45\u5DE6",tl_alignright:"\u5C45\u53F3",tl_edit:"\u7DE8\u8F2F",tl_single_column:"\u55AE\u6B04",tl_double_column:"\u96D9\u6B04",tl_fullscreen_on:"\u5168\u5C4F\u7DE8\u8F2F",tl_fullscreen_off:"\u9000\u51FA\u5168\u5C4F",tl_read:"\u6C88\u6D78\u5F0F\u95B1\u8B80",tl_html_on:"\u67E5\u770Bhtml\u6587\u672C",tl_html_off:"\u8FD4\u56DEmarkdown\u6587\u672C",tl_help:"markdown\u8A9E\u6CD5\u5E6B\u52A9",tl_upload:"\u4E0A\u50B3\u5716\u7247",tl_upload_remove:"\u522A\u9664",tl_popup_link_title:"\u6DFB\u52A0\u93C8\u63A5",tl_popup_link_text:"\u93C8\u63A5\u63CF\u8FF0",tl_popup_link_addr:"\u93C8\u63A5\u5730\u5740",tl_popup_img_link_title:"\u6DFB\u52A0\u5716\u7247",tl_popup_img_link_text:"\u5716\u7247\u63CF\u8FF0",tl_popup_img_link_addr:"\u5716\u7247\u93C8\u63A5",tl_popup_link_sure:"\u78BA\u5B9A",tl_popup_link_cancel:"\u53D6\u6D88"}}])})})(mavonEditor$1);var mavonEditor=getDefaultExportFromCjs(mavonEditor$1.exports),render=function(){var d=this,h=d.$createElement,s=d._self._c||h;return s("mavon-editor",{ref:"md",staticClass:"bug-c-movon-editor",attrs:{ishljs:!0,toolbars:d.toolbarsComPuted},on:{imgAdd:d.imgAdd,save:d.editorChange,change:d.changeFn},model:{value:d.value,callback:function(t){d.value=t},expression:"value"}})},staticRenderFns=[],index_vue_vue_type_style_index_0_scoped_true_lang="";Vue.use(mavonEditor);const __vue2_script={props:{value:{type:String,default:""},upload_file_url:{type:String,require:!0},toolbars:{type:Object,default:()=>({})}},data(){return{}},computed:{toolbarsComPuted(){return Object.assign({bold:!0,italic:!0,header:!0,underline:!0,strikethrough:!0,mark:!0,superscript:!0,subscript:!0,quote:!0,ol:!0,ul:!0,link:!0,imagelink:!0,code:!0,table:!0,fullscreen:!0,readmodel:!0,htmlcode:!0,help:!0,undo:!0,redo:!0,trash:!0,save:!0,navigation:!0,alignleft:!0,aligncenter:!0,alignright:!0,subfield:!0,preview:!0},this.toolbars)}},methods:{changeFn(d,h){this.$emit("change",{str:d,html:h})},async editorChange(d,h){this.$emit("save",{str:d,html:h}),this.$emit("input",d)},async imgAdd(d,h){try{const{upload_file_url:s}=this;if(!s)return this.$message.error("\u8BF7\u914D\u7F6E\u4E0A\u4F20\u56FE\u7247\u5730\u5740upload_file_url");let t=window.devicePixelRatio||1,r=new Image;r.src=window.URL.createObjectURL(h),r.onload=async()=>{let{width:e,height:i}=r,n=document.createElement("canvas"),a=n.getContext("2d");n.width=e/t,n.height=i/t,a.drawImage(r,0,0,n.width,n.height);let u=n.toDataURL(h.type,.8),c=this.base64ToFile(u,h.name),o={1:1,2:.92,3:.85},{file:l,newWidth:p,newHeight:_}=await this.compressImg(c,o[t]);if(!l){this.$message.error("\u56FE\u7247\u538B\u7F29\u5931\u8D25");return}const f=new FormData;f.append("file",l);const b={type:s,devicePixelRatioa:t,width:Math.floor(p/t),height:Math.floor(_/t)},g=await post_upload_imgs_common({data:f,params:b});let{netdisk_url:m}=(g==null?void 0:g.data)||{};if(!m){this.$message.warning("\u4E0A\u4F20\u56FE\u7247\u5931\u8D25");return}this.$refs.md.$img2Url(d,`${baseURL}${m}`)}}catch(s){this.Toast(s)}}}},__cssModules={};var __component__=normalizeComponent(__vue2_script,render,staticRenderFns,!1,__vue2_injectStyles,"1241d286",null,null);function __vue2_injectStyles(d){for(let h in __cssModules)this[h]=__cssModules[h]}var index=function(){return __component__.exports}();export{index as default};
