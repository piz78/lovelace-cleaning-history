var CleaningHistoryCard=function(t){"use strict";function e(t,e,i,o){var s,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const i=window,o=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const a=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var l;const c=window,d=c.trustedTypes,h=d?d.emptyScript:"",u=c.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>e!==t&&(e==e||t==t),m={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:_},v="finalized";let f=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const o=this._$Ep(i,e);void 0!==o&&(this._$Ev.set(o,i),t.push(o))}),t}static createProperty(t,e=m){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const s=this[t];this[e]=o,this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||m}static finalize(){if(this.hasOwnProperty(v))return!1;this[v]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{o?t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(e=>{const o=document.createElement("style"),s=i.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=e.cssText,t.appendChild(o)})})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=m){var o;const s=this.constructor._$Ep(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$El=null}}_$AK(t,e){var i;const o=this.constructor,s=o._$Ev.get(t);if(void 0!==s&&this._$El!==s){const t=o.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=s,this[s]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let o=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||_)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var g;f[v]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:f}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const y=window,$=y.trustedTypes,b=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,x="?"+w,E=`<${x}>`,C=document,S=()=>C.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,P="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,O=/>/g,U=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),M=/'/g,R=/"/g,z=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),D=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),L=new WeakMap,K=C.createTreeWalker(C,129,null,!1);function B(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(e):e}const V=(t,e)=>{const i=t.length-1,o=[];let s,n=2===e?"<svg>":"",r=H;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===H?"!--"===l[1]?r=N:void 0!==l[1]?r=O:void 0!==l[2]?(z.test(l[2])&&(s=RegExp("</"+l[2],"g")),r=U):void 0!==l[3]&&(r=U):r===U?">"===l[0]?(r=null!=s?s:H,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?U:'"'===l[3]?R:M):r===R||r===M?r=U:r===N||r===O?r=H:(r=U,s=void 0);const h=r===U&&t[e+1].startsWith("/>")?" ":"";n+=r===H?i+E:c>=0?(o.push(a),i.slice(0,c)+A+i.slice(c)+w+h):i+w+(-2===c?(o.push(void 0),e):h)}return[B(t,n+(t[i]||"<?>")+(2===e?"</svg>":"")),o]};class W{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,n=0;const r=t.length-1,a=this.parts,[l,c]=V(t,e);if(this.el=W.createElement(l,i),K.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(o=K.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes()){const t=[];for(const e of o.getAttributeNames())if(e.endsWith(A)||e.startsWith(w)){const i=c[n++];if(t.push(e),void 0!==i){const t=o.getAttribute(i.toLowerCase()+A).split(w),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?Q:"@"===e[1]?X:Y})}else a.push({type:6,index:s})}for(const e of t)o.removeAttribute(e)}if(z.test(o.tagName)){const t=o.textContent.split(w),e=t.length-1;if(e>0){o.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],S()),K.nextNode(),a.push({type:2,index:++s});o.append(t[e],S())}}}else if(8===o.nodeType)if(o.data===x)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(w,t+1));)a.push({type:7,index:s}),t+=w.length-1}s++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function q(t,e,i=t,o){var s,n,r,a;if(e===D)return e;let l=void 0!==o?null===(s=i._$Co)||void 0===s?void 0:s[o]:i._$Cl;const c=k(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,o)),void 0!==o?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[o]=l:i._$Cl=l),void 0!==l&&(e=q(t,l._$AS(t,e.values),l,o)),e}class F{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:o}=this._$AD,s=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:C).importNode(i,!0);K.currentNode=s;let n=K.nextNode(),r=0,a=0,l=o[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new J(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new tt(n,this,t)),this._$AV.push(e),l=o[++a]}r!==(null==l?void 0:l.index)&&(n=K.nextNode(),r++)}return K.currentNode=C,s}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class J{constructor(t,e,i,o){var s;this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cp=null===(s=null==o?void 0:o.isConnected)||void 0===s||s}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),k(t)?t===I||null==t||""===t?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==D&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>T(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==I&&k(this._$AH)?this._$AA.nextSibling.data=t:this.$(C.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:o}=t,s="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=W.createElement(B(o.h,o.h[0]),this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===s)this._$AH.v(i);else{const t=new F(s,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=L.get(t.strings);return void 0===e&&L.set(t.strings,e=new W(t)),e}T(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new J(this.k(S()),this.k(S()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}let Y=class{constructor(t,e,i,o,s){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=I}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,o){const s=this.strings;let n=!1;if(void 0===s)t=q(this,t,e,0),n=!k(t)||t!==this._$AH&&t!==D,n&&(this._$AH=t);else{const o=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=q(this,o[i+r],e,r),a===D&&(a=this._$AH[r]),n||(n=!k(a)||a!==this._$AH[r]),a===I?t=I:t!==I&&(t+=(null!=a?a:"")+s[r+1]),this._$AH[r]=a}n&&!o&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}};class Z extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}}const G=$?$.emptyScript:"";class Q extends Y{constructor(){super(...arguments),this.type=4}j(t){t&&t!==I?this.element.setAttribute(this.name,G):this.element.removeAttribute(this.name)}}class X extends Y{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=q(this,t,e,0))&&void 0!==i?i:I)===D)return;const o=this._$AH,s=t===I&&o!==I||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==I&&(o===I||s);s&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}let tt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}};const et=y.litHtmlPolyfillSupport;null==et||et(W,J),(null!==(g=y.litHtmlVersions)&&void 0!==g?g:y.litHtmlVersions=[]).push("2.8.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var it,ot;class st extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var o,s;const n=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:e;let r=n._$litPart$;if(void 0===r){const t=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;n._$litPart$=r=new J(e.insertBefore(S(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return D}}st.finalized=!0,st._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:st});const nt=globalThis.litElementPolyfillSupport;null==nt||nt({LitElement:st}),(null!==(ot=globalThis.litElementVersions)&&void 0!==ot?ot:globalThis.litElementVersions=[]).push("3.3.3");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const rt=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:o}=e;return{kind:i,elements:o,finisher(e){customElements.define(t,e)}}})(t,e),at=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function lt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):at(t,e)}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function ct(t){return lt({...t,state:!0})}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var dt,ht,ut;null===(dt=window.HTMLSlotElement)||void 0===dt||dt.prototype.assignedElements,function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ht||(ht={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ut||(ut={}));var pt=function(t){if(t.time_format===ut.language||t.time_format===ut.system){var e=t.time_format===ut.language?t.language:void 0,i=(new Date).toLocaleString(e);return i.includes("AM")||i.includes("PM")}return t.time_format===ut.am_pm},_t=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"2-digit",hour12:pt(t)})};var mt=["closed","locked","off"],vt=function(t,e,i,o){o=o||{},i=null==i?{}:i;var s=new Event(e,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return s.detail=i,t.dispatchEvent(s),s},ft=function(t){vt(window,"haptic",t)},gt=function(t,e,i,o){if(o||(o={action:"more-info"}),!o.confirmation||o.confirmation.exemptions&&o.confirmation.exemptions.some(function(t){return t.user===e.user.id})||(ft("warning"),confirm(o.confirmation.text||"Are you sure you want to "+o.action+"?")))switch(o.action){case"more-info":(i.entity||i.camera_image)&&vt(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":o.navigation_path&&function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),vt(window,"location-changed",{replace:i})}(0,o.navigation_path);break;case"url":o.url_path&&window.open(o.url_path);break;case"toggle":i.entity&&(function(t,e){(function(t,e,i){void 0===i&&(i=!0);var o,s=function(t){return t.substr(0,t.indexOf("."))}(e),n="group"===s?"homeassistant":s;switch(s){case"lock":o=i?"unlock":"lock";break;case"cover":o=i?"open_cover":"close_cover";break;default:o=i?"turn_on":"turn_off"}t.callService(n,o,{entity_id:e})})(t,e,mt.includes(t.states[e].state))}(e,i.entity),ft("success"));break;case"call-service":if(!o.service)return void ft("failure");var s=o.service.split(".",2);e.callService(s[0],s[1],o.service_data,o.target),ft("success");break;case"fire-dom-event":vt(t,"ll-custom",o)}},yt=function(t,e,i,o){var s;"double_tap"===o&&i.double_tap_action?s=i.double_tap_action:"hold"===o&&i.hold_action?s=i.hold_action:"tap"===o&&i.tap_action&&(s=i.tap_action),gt(t,e,i,s)};function $t(t){return void 0!==t&&"none"!==t.action}const bt=[{name:"entity",required:!0,selector:{entity:{domain:"camera"}}},{name:"title",selector:{text:{}}},{name:"attribute",selector:{text:{}}},{name:"tap_action",selector:{ui_action:{}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}}],At={entity:"Entity",title:"Title",attribute:"Attribute",tap_action:"Tap action",hold_action:"Hold action",double_tap_action:"Double tap action"};let wt=class extends st{constructor(){super(...arguments),this._computeLabel=t=>At[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?j`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${bt}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:I}_valueChanged(t){vt(this,"config-changed",{config:t.detail.value})}};e([lt({attribute:!1})],wt.prototype,"hass",void 0),e([ct()],wt.prototype,"_config",void 0),wt=e([rt("cleaning-history-card-editor")],wt);const xt="cleaning_history_picture",Et=/^(\d+):\s*(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\s+(\d{1,2}):(\d{2})\s*-\s*(.+)$/;function Ct(t,e){const i=t.match(Et);if(!i)return t;const[,o,s,n,r,a,l,c]=i,d=new Date,h=r?2===r.length?2e3+Number(r):Number(r):d.getFullYear();let u=new Date(h,Number(s)-1,Number(n),Number(a),Number(l));return!r&&u.getTime()>d.getTime()+864e5&&(u=new Date(h-1,Number(s)-1,Number(n),Number(a),Number(l))),Number.isNaN(u.getTime())?t:`${o}: ${function(t,e){return _t(e).format(t)}(u,e)} - ${c}`}return t.CleaningHistoryCard=class extends st{constructor(){super(...arguments),this._modalOpen=!1,this._holdTriggered=!1}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");this._config=t,this._selectedKey=void 0}static getConfigElement(){return document.createElement("cleaning-history-card-editor")}static getStubConfig(){return{entity:"",attribute:xt}}getCardSize(){return 5}getLayoutOptions(){return{grid_columns:4,grid_rows:4,grid_min_rows:2,grid_max_rows:8}}willUpdate(t){if(!t.has("hass")||this._selectedKey)return;const e=this._getEntries();e.length&&(this._selectedKey=e[0][0])}_getEntries(){if(!this._config||!this.hass)return[];const t=this.hass.states[this._config.entity];if(!t)return[];const e=this._config.attribute||xt,i=t.attributes[e];return i?Object.entries(i):[]}_handleSelected(t){const e=t.target.value;e&&(this._selectedKey=e)}_closeModal(){this._modalOpen=!1}_onModalKeydown(t){"Escape"===t.key&&this._closeModal()}_onImagePointerDown(){this._holdTriggered=!1,$t(this._config.hold_action)&&(this._holdTimer=window.setTimeout(()=>{this._holdTriggered=!0,yt(this,this.hass,this._config,"hold")},500))}_onImagePointerUp(){this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=void 0)}_handleTap(){$t(this._config.tap_action)?yt(this,this.hass,this._config,"tap"):this._modalOpen=!0}_onImageClick(){if(this._holdTriggered)this._holdTriggered=!1;else{if($t(this._config.double_tap_action))return this._clickTimer?(clearTimeout(this._clickTimer),this._clickTimer=void 0,void yt(this,this.hass,this._config,"double_tap")):void(this._clickTimer=window.setTimeout(()=>{this._clickTimer=void 0,this._handleTap()},250));this._handleTap()}}updated(t){t.has("_modalOpen")&&this._modalOpen&&this._modalOverlay?.focus()}render(){if(!this._config||!this.hass)return I;const t=this.hass.states[this._config.entity];if(!t)return j`
        <ha-card>
          <div class="warning">
            Entity not found: ${this._config.entity}
          </div>
        </ha-card>
      `;const e=this._getEntries(),i=this._config.title??t.attributes.friendly_name,o=this._selectedKey?e.find(([t])=>t===this._selectedKey)?.[1]:void 0,s=this._selectedKey?Ct(this._selectedKey,this.hass.locale):void 0;return j`
      <ha-card .header=${i}>
        <div class="content">
          ${0===e.length?j`<div class="warning">No history available</div>`:j`
                <select class="history-select" @change=${this._handleSelected}>
                  ${e.map(([t])=>j`<option
                        value=${t}
                        ?selected=${t===this._selectedKey}
                      >
                        ${Ct(t,this.hass.locale)}
                      </option>`)}
                </select>
                ${o?j`
                      <img
                        class="history-image"
                        src=${o}
                        alt=${this._selectedKey??""}
                        @pointerdown=${this._onImagePointerDown}
                        @pointerup=${this._onImagePointerUp}
                        @pointercancel=${this._onImagePointerUp}
                        @click=${this._onImageClick}
                      />
                    `:I}
              `}
        </div>
      </ha-card>
      ${this._modalOpen&&o?j`
            <div
              class="modal-overlay"
              tabindex="-1"
              @click=${this._closeModal}
              @keydown=${this._onModalKeydown}
            >
              <div class="modal-dialog" @click=${t=>t.stopPropagation()}>
                <div class="modal-header">
                  <button
                    class="modal-close"
                    @click=${this._closeModal}
                    aria-label="Close"
                  >
                    <ha-icon icon="mdi:close"></ha-icon>
                  </button>
                  <div class="modal-titles">
                    <div class="modal-subtitle">${i}</div>
                    <div class="modal-title">${s}</div>
                  </div>
                </div>
                <img
                  class="modal-image"
                  src=${o}
                  alt=${this._selectedKey??""}
                />
                <a
                  class="modal-download"
                  href=${o}
                  download
                  target="_blank"
                  rel="noopener"
                >
                  <ha-icon icon="mdi:download"></ha-icon>
                  Download
                </a>
              </div>
            </div>
          `:I}
    `}},t.CleaningHistoryCard.styles=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new r(i,t,s)})`
    ha-card {
      --ha-card-header-font-size: 18px;
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 0 16px 16px;
    }
    .history-select {
      width: 100%;
      box-sizing: border-box;
      padding: 12px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 16px;
      font-family: inherit;
    }
    .history-select:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: -1px;
    }
    .history-image {
      width: 100%;
      max-width: 100%;
      border-radius: var(--ha-card-border-radius, 12px);
      cursor: zoom-in;
    }
    .warning {
      padding: 8px 0;
      color: var(--error-color);
    }
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      outline: none;
    }
    .modal-dialog {
      position: relative;
      display: flex;
      flex-direction: column;
      max-width: 90vw;
      max-height: 90vh;
      background: var(--card-background-color, #fff);
      border-radius: var(--ha-card-border-radius, 12px);
      overflow: hidden;
      box-shadow: var(
        --shadow-elevation-16dp,
        0 11px 15px -7px rgba(0, 0, 0, 0.2)
      );
    }
    .modal-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
    }
    .modal-close {
      background: transparent;
      border: none;
      color: var(--primary-text-color);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      border-radius: 50%;
    }
    .modal-close:hover {
      background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.08);
    }
    .modal-titles {
      display: flex;
      flex-direction: column;
    }
    .modal-subtitle {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .modal-title {
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .modal-image {
      flex: 1;
      max-width: 100%;
      max-height: calc(90vh - 64px);
      object-fit: contain;
      display: block;
    }
    .modal-download {
      position: absolute;
      bottom: 16px;
      right: 16px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 20px;
      background: rgba(var(--rgb-primary-color), 0.1);
      color: var(--primary-color);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
    }
  `,e([lt({attribute:!1})],t.CleaningHistoryCard.prototype,"hass",void 0),e([ct()],t.CleaningHistoryCard.prototype,"_config",void 0),e([ct()],t.CleaningHistoryCard.prototype,"_selectedKey",void 0),e([ct()],t.CleaningHistoryCard.prototype,"_modalOpen",void 0),e([
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
function(t){return(({finisher:t,descriptor:e})=>(i,o)=>{var s;if(void 0===o){const o=null!==(s=i.originalKey)&&void 0!==s?s:i.key,n=null!=e?{kind:"method",placement:"prototype",key:o,descriptor:e(i.key)}:{...i,key:o};return null!=t&&(n.finisher=function(e){t(e,o)}),n}{const s=i.constructor;void 0!==e&&Object.defineProperty(i,o,e(o)),null==t||t(s,o)}})({descriptor:e=>{const i={get(){var e,i;return null!==(i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==i?i:null},enumerable:!0,configurable:!0};return i}})}(".modal-overlay")],t.CleaningHistoryCard.prototype,"_modalOverlay",void 0),t.CleaningHistoryCard=e([rt("cleaning-history-card")],t.CleaningHistoryCard),window.customCards=window.customCards||[],window.customCards.push({type:"cleaning-history-card",name:"Cleaning History Card",description:"Browse and display a robot vacuum's historical cleaning maps from a camera entity's attributes."}),t}({});
