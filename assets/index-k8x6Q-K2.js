(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function l(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=l(o);fetch(o.href,n)}})();const Fl=globalThis,cr=Fl.ShadowRoot&&(Fl.ShadyCSS===void 0||Fl.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ur=Symbol(),ci=new WeakMap;let mn=class{constructor(t,l,s){if(this._$cssResult$=!0,s!==ur)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=l}get styleSheet(){let t=this.o;const l=this.t;if(cr&&t===void 0){const s=l!==void 0&&l.length===1;s&&(t=ci.get(l)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ci.set(l,t))}return t}toString(){return this.cssText}};const fr=e=>new mn(typeof e=="string"?e:e+"",void 0,ur),Wt=(e,...t)=>{const l=e.length===1?e[0]:t.reduce((s,o,n)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[n+1],e[0]);return new mn(l,e,ur)},ec=(e,t)=>{if(cr)e.adoptedStyleSheets=t.map(l=>l instanceof CSSStyleSheet?l:l.styleSheet);else for(const l of t){const s=document.createElement("style"),o=Fl.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=l.cssText,e.appendChild(s)}},ui=cr?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let l="";for(const s of t.cssRules)l+=s.cssText;return fr(l)})(e):e;const{is:tc,defineProperty:sc,getOwnPropertyDescriptor:lc,getOwnPropertyNames:oc,getOwnPropertySymbols:rc,getPrototypeOf:ic}=Object,Zl=globalThis,fi=Zl.trustedTypes,nc=fi?fi.emptyScript:"",ac=Zl.reactiveElementPolyfillSupport,pl=(e,t)=>e,Bl={toAttribute(e,t){switch(t){case Boolean:e=e?nc:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let l=e;switch(t){case Boolean:l=e!==null;break;case Number:l=e===null?null:Number(e);break;case Object:case Array:try{l=JSON.parse(e)}catch{l=null}}return l}},hr=(e,t)=>!tc(e,t),hi={attribute:!0,type:String,converter:Bl,reflect:!1,useDefault:!1,hasChanged:hr};Symbol.metadata??=Symbol("metadata"),Zl.litPropertyMetadata??=new WeakMap;let Fs=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,l=hi){if(l.state&&(l.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((l=Object.create(l)).wrapped=!0),this.elementProperties.set(t,l),!l.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(t,s,l);o!==void 0&&sc(this.prototype,t,o)}}static getPropertyDescriptor(t,l,s){const{get:o,set:n}=lc(this.prototype,t)??{get(){return this[l]},set(a){this[l]=a}};return{get:o,set(a){const h=o?.call(this);n?.call(this,a),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??hi}static _$Ei(){if(this.hasOwnProperty(pl("elementProperties")))return;const t=ic(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(pl("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(pl("properties"))){const l=this.properties,s=[...oc(l),...rc(l)];for(const o of s)this.createProperty(o,l[o])}const t=this[Symbol.metadata];if(t!==null){const l=litPropertyMetadata.get(t);if(l!==void 0)for(const[s,o]of l)this.elementProperties.set(s,o)}this._$Eh=new Map;for(const[l,s]of this.elementProperties){const o=this._$Eu(l,s);o!==void 0&&this._$Eh.set(o,l)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const l=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const o of s)l.unshift(ui(o))}else t!==void 0&&l.push(ui(t));return l}static _$Eu(t,l){const s=l.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,l=this.constructor.elementProperties;for(const s of l.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ec(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,l,s){this._$AK(t,s)}_$ET(t,l){const s=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,s);if(o!==void 0&&s.reflect===!0){const n=(s.converter?.toAttribute!==void 0?s.converter:Bl).toAttribute(l,s.type);this._$Em=t,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(t,l){const s=this.constructor,o=s._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const n=s.getPropertyOptions(o),a=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Bl;this._$Em=o;const h=a.fromAttribute(l,n.type);this[o]=h??this._$Ej?.get(o)??h,this._$Em=null}}requestUpdate(t,l,s,o=!1,n){if(t!==void 0){const a=this.constructor;if(o===!1&&(n=this[t]),s??=a.getPropertyOptions(t),!((s.hasChanged??hr)(n,l)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,s))))return;this.C(t,l,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,l,{useDefault:s,reflect:o,wrapped:n},a){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??l??this[t]),n!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(l=void 0),this._$AL.set(t,l)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(l){Promise.reject(l)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,n]of s){const{wrapped:a}=n,h=this[o];a!==!0||this._$AL.has(o)||h===void 0||this.C(o,void 0,n,h)}}let t=!1;const l=this._$AL;try{t=this.shouldUpdate(l),t?(this.willUpdate(l),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(l)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(l)}willUpdate(t){}_$AE(t){this._$EO?.forEach(l=>l.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(l=>this._$ET(l,this[l])),this._$EM()}updated(t){}firstUpdated(t){}};Fs.elementStyles=[],Fs.shadowRootOptions={mode:"open"},Fs[pl("elementProperties")]=new Map,Fs[pl("finalized")]=new Map,ac?.({ReactiveElement:Fs}),(Zl.reactiveElementVersions??=[]).push("2.1.2");const dr=globalThis,di=e=>e,Vl=dr.trustedTypes,pi=Vl?Vl.createPolicy("lit-html",{createHTML:e=>e}):void 0,gn="$lit$",Qt=`lit$${Math.random().toFixed(9).slice(2)}$`,vn="?"+Qt,cc=`<${vn}>`,vs=document,wl=()=>vs.createComment(""),yl=e=>e===null||typeof e!="object"&&typeof e!="function",pr=Array.isArray,uc=e=>pr(e)||typeof e?.[Symbol.iterator]=="function",zo=`[ 	
\f\r]`,nl=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,mi=/-->/g,gi=/>/g,us=RegExp(`>|${zo}(?:([^\\s"'>=/]+)(${zo}*=${zo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),vi=/'/g,bi=/"/g,bn=/^(?:script|style|textarea|title)$/i,fc=e=>(t,...l)=>({_$litType$:e,strings:t,values:l}),U=fc(1),Bs=Symbol.for("lit-noChange"),he=Symbol.for("lit-nothing"),wi=new WeakMap,ms=vs.createTreeWalker(vs,129);function wn(e,t){if(!pr(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return pi!==void 0?pi.createHTML(t):t}const hc=(e,t)=>{const l=e.length-1,s=[];let o,n=t===2?"<svg>":t===3?"<math>":"",a=nl;for(let h=0;h<l;h++){const f=e[h];let p,b,m=-1,v=0;for(;v<f.length&&(a.lastIndex=v,b=a.exec(f),b!==null);)v=a.lastIndex,a===nl?b[1]==="!--"?a=mi:b[1]!==void 0?a=gi:b[2]!==void 0?(bn.test(b[2])&&(o=RegExp("</"+b[2],"g")),a=us):b[3]!==void 0&&(a=us):a===us?b[0]===">"?(a=o??nl,m=-1):b[1]===void 0?m=-2:(m=a.lastIndex-b[2].length,p=b[1],a=b[3]===void 0?us:b[3]==='"'?bi:vi):a===bi||a===vi?a=us:a===mi||a===gi?a=nl:(a=us,o=void 0);const S=a===us&&e[h+1].startsWith("/>")?" ":"";n+=a===nl?f+cc:m>=0?(s.push(p),f.slice(0,m)+gn+f.slice(m)+Qt+S):f+Qt+(m===-2?h:S)}return[wn(e,n+(e[l]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class _l{constructor({strings:t,_$litType$:l},s){let o;this.parts=[];let n=0,a=0;const h=t.length-1,f=this.parts,[p,b]=hc(t,l);if(this.el=_l.createElement(p,s),ms.currentNode=this.el.content,l===2||l===3){const m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(o=ms.nextNode())!==null&&f.length<h;){if(o.nodeType===1){if(o.hasAttributes())for(const m of o.getAttributeNames())if(m.endsWith(gn)){const v=b[a++],S=o.getAttribute(m).split(Qt),P=/([.?@])?(.*)/.exec(v);f.push({type:1,index:n,name:P[2],strings:S,ctor:P[1]==="."?pc:P[1]==="?"?mc:P[1]==="@"?gc:Ql}),o.removeAttribute(m)}else m.startsWith(Qt)&&(f.push({type:6,index:n}),o.removeAttribute(m));if(bn.test(o.tagName)){const m=o.textContent.split(Qt),v=m.length-1;if(v>0){o.textContent=Vl?Vl.emptyScript:"";for(let S=0;S<v;S++)o.append(m[S],wl()),ms.nextNode(),f.push({type:2,index:++n});o.append(m[v],wl())}}}else if(o.nodeType===8)if(o.data===vn)f.push({type:2,index:n});else{let m=-1;for(;(m=o.data.indexOf(Qt,m+1))!==-1;)f.push({type:7,index:n}),m+=Qt.length-1}n++}}static createElement(t,l){const s=vs.createElement("template");return s.innerHTML=t,s}}function Vs(e,t,l=e,s){if(t===Bs)return t;let o=s!==void 0?l._$Co?.[s]:l._$Cl;const n=yl(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),n===void 0?o=void 0:(o=new n(e),o._$AT(e,l,s)),s!==void 0?(l._$Co??=[])[s]=o:l._$Cl=o),o!==void 0&&(t=Vs(e,o._$AS(e,t.values),o,s)),t}class dc{constructor(t,l){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=l}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:l},parts:s}=this._$AD,o=(t?.creationScope??vs).importNode(l,!0);ms.currentNode=o;let n=ms.nextNode(),a=0,h=0,f=s[0];for(;f!==void 0;){if(a===f.index){let p;f.type===2?p=new $l(n,n.nextSibling,this,t):f.type===1?p=new f.ctor(n,f.name,f.strings,this,t):f.type===6&&(p=new vc(n,this,t)),this._$AV.push(p),f=s[++h]}a!==f?.index&&(n=ms.nextNode(),a++)}return ms.currentNode=vs,o}p(t){let l=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,l),l+=s.strings.length-2):s._$AI(t[l])),l++}}class $l{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,l,s,o){this.type=2,this._$AH=he,this._$AN=void 0,this._$AA=t,this._$AB=l,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const l=this._$AM;return l!==void 0&&t?.nodeType===11&&(t=l.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,l=this){t=Vs(this,t,l),yl(t)?t===he||t==null||t===""?(this._$AH!==he&&this._$AR(),this._$AH=he):t!==this._$AH&&t!==Bs&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):uc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==he&&yl(this._$AH)?this._$AA.nextSibling.data=t:this.T(vs.createTextNode(t)),this._$AH=t}$(t){const{values:l,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=_l.createElement(wn(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(l);else{const n=new dc(o,this),a=n.u(this.options);n.p(l),this.T(a),this._$AH=n}}_$AC(t){let l=wi.get(t.strings);return l===void 0&&wi.set(t.strings,l=new _l(t)),l}k(t){pr(this._$AH)||(this._$AH=[],this._$AR());const l=this._$AH;let s,o=0;for(const n of t)o===l.length?l.push(s=new $l(this.O(wl()),this.O(wl()),this,this.options)):s=l[o],s._$AI(n),o++;o<l.length&&(this._$AR(s&&s._$AB.nextSibling,o),l.length=o)}_$AR(t=this._$AA.nextSibling,l){for(this._$AP?.(!1,!0,l);t!==this._$AB;){const s=di(t).nextSibling;di(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class Ql{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,l,s,o,n){this.type=1,this._$AH=he,this._$AN=void 0,this.element=t,this.name=l,this._$AM=o,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=he}_$AI(t,l=this,s,o){const n=this.strings;let a=!1;if(n===void 0)t=Vs(this,t,l,0),a=!yl(t)||t!==this._$AH&&t!==Bs,a&&(this._$AH=t);else{const h=t;let f,p;for(t=n[0],f=0;f<n.length-1;f++)p=Vs(this,h[s+f],l,f),p===Bs&&(p=this._$AH[f]),a||=!yl(p)||p!==this._$AH[f],p===he?t=he:t!==he&&(t+=(p??"")+n[f+1]),this._$AH[f]=p}a&&!o&&this.j(t)}j(t){t===he?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class pc extends Ql{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===he?void 0:t}}class mc extends Ql{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==he)}}class gc extends Ql{constructor(t,l,s,o,n){super(t,l,s,o,n),this.type=5}_$AI(t,l=this){if((t=Vs(this,t,l,0)??he)===Bs)return;const s=this._$AH,o=t===he&&s!==he||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==he&&(s===he||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class vc{constructor(t,l,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=l,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Vs(this,t)}}const bc=dr.litHtmlPolyfillSupport;bc?.(_l,$l),(dr.litHtmlVersions??=[]).push("3.3.2");const wc=(e,t,l)=>{const s=l?.renderBefore??t;let o=s._$litPart$;if(o===void 0){const n=l?.renderBefore??null;s._$litPart$=o=new $l(t.insertBefore(wl(),n),n,void 0,l??{})}return o._$AI(e),o};const mr=globalThis;class rt extends Fs{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const l=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=wc(l,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Bs}}rt._$litElement$=!0,rt.finalized=!0,mr.litElementHydrateSupport?.({LitElement:rt});const yc=mr.litElementPolyfillSupport;yc?.({LitElement:rt});(mr.litElementVersions??=[]).push("4.2.2");const Bt=e=>(t,l)=>{l!==void 0?l.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};const _c={attribute:!0,type:String,converter:Bl,reflect:!1,hasChanged:hr},xc=(e=_c,t,l)=>{const{kind:s,metadata:o}=l;let n=globalThis.litPropertyMetadata.get(o);if(n===void 0&&globalThis.litPropertyMetadata.set(o,n=new Map),s==="setter"&&((e=Object.create(e)).wrapped=!0),n.set(l.name,e),s==="accessor"){const{name:a}=l;return{set(h){const f=t.get.call(this);t.set.call(this,h),this.requestUpdate(a,f,e,!0,h)},init(h){return h!==void 0&&this.C(a,void 0,e,h),h}}}if(s==="setter"){const{name:a}=l;return function(h){const f=this[a];t.call(this,h),this.requestUpdate(a,f,e,!0,h)}}throw Error("Unsupported decorator location: "+s)};function Xl(e){return(t,l)=>typeof l=="object"?xc(e,t,l):((s,o,n)=>{const a=o.hasOwnProperty(n);return o.constructor.createProperty(n,s),a?Object.getOwnPropertyDescriptor(o,n):void 0})(e,t,l)}function se(e){return Xl({...e,state:!0,attribute:!1})}function eo(){return localStorage.getItem("mock-gateway")==="true"}function to(){return localStorage.getItem("mock-coffee")==="true"}const yn={version:"2",title:"Bloomy Espresso",notes:"Bloom preinfusion followed by 6 bar declining pressure",author:"Decent",beverage_type:"espresso",target_volume:null,target_weight:36,target_volume_count_start:2,tank_temperature:0,steps:[{name:"Preinfusion",pump:"flow",flow:4,transition:"fast",exit:{type:"pressure",condition:"over",value:4},volume:0,seconds:20,weight:null,temperature:92,sensor:"coffee",limiter:null},{name:"Bloom",pump:"flow",flow:0,transition:"fast",exit:null,volume:0,seconds:5,weight:null,temperature:92,sensor:"coffee",limiter:null},{name:"Pour",pump:"pressure",pressure:6,transition:"smooth",exit:null,volume:0,seconds:60,weight:36,temperature:90,sensor:"coffee",limiter:{value:3.5,range:.5}}]},Sc={version:"2",title:"Filter 2.1",notes:"Low pressure long extraction for filter-style coffee",author:"Decent",beverage_type:"pourover",target_volume:null,target_weight:200,target_volume_count_start:0,tank_temperature:0,steps:[{name:"Saturate",pump:"flow",flow:5,transition:"fast",exit:{type:"pressure",condition:"over",value:1.5},volume:0,seconds:15,weight:null,temperature:88,sensor:"coffee",limiter:null},{name:"Bloom",pump:"flow",flow:0,transition:"fast",exit:null,volume:0,seconds:30,weight:null,temperature:88,sensor:"coffee",limiter:null},{name:"Pour",pump:"flow",flow:4.5,transition:"smooth",exit:null,volume:0,seconds:120,weight:200,temperature:85,sensor:"coffee",limiter:null}]},$c={version:"2",title:"Cleaning",notes:"Standard backflush cleaning cycle",author:"Decent",beverage_type:"cleaning",target_volume:null,target_weight:null,target_volume_count_start:0,tank_temperature:0,steps:[{name:"Flush",pump:"pressure",pressure:8,transition:"fast",exit:null,volume:0,seconds:10,weight:null,temperature:93,sensor:"coffee",limiter:null},{name:"Pause",pump:"flow",flow:0,transition:"fast",exit:null,volume:0,seconds:10,weight:null,temperature:93,sensor:"coffee",limiter:null}]};function No(e,t,l){return{id:e,profile:t,metadataHash:e,compoundHash:e,parentId:null,visibility:"visible",isDefault:l,createdAt:"2025-01-15T08:00:00Z",updatedAt:"2025-01-15T08:00:00Z",metadata:null}}const Ko=[No("profile-bloomy",yn,!0),No("profile-filter",Sc,!1),No("profile-cleaning",$c,!1)],gr={id:"workflow-1",name:"Morning Espresso",description:"Daily bloomy espresso workflow",profile:yn,doseData:{doseIn:18,doseOut:36},grinderData:{setting:"2.5",manufacturer:"Lagom",model:"P100"},coffeeData:{name:"El Paraiso",roaster:"Manhattan"},steamSettings:{targetTemperature:160,duration:30,flow:1.5},hotWaterData:{targetTemperature:80,duration:15,volume:200,flow:4},rinseData:{targetTemperature:93,duration:5,flow:6}};function _n(e){const t=[],l=Date.now()-e*1e3;for(let s=0;s<=e;s++){const o=new Date(l+s*1e3).toISOString(),n=s/e;let a,h,f,p;if(n<.15)a=n/.15*3,h=3+Math.random()*.5,f=s*.3,p="preinfusion";else if(n<.25){const v=(n-.15)/.1;a=3+v*6,h=3-v*1,f=4.5+(s-e*.15)*.8,p="pouring"}else if(n<.85){const v=(n-.25)/.6;a=9-v*3,h=2+v*.5+(Math.random()-.5)*.1,f=10+(s-e*.25)*1.2,p="pouring"}else{const v=(n-.85)/.15;a=6*(1-v),h=2.5*(1-v),f=32+(s-e*.85)*.5,p="pouring"}const b={timestamp:o,state:{state:"espresso",substate:p},flow:Math.max(0,h),pressure:Math.max(0,a),targetFlow:2,targetPressure:9,mixTemperature:92+(Math.random()-.5)*.3,groupTemperature:90+(Math.random()-.5)*.5,targetMixTemperature:92,targetGroupTemperature:90,profileFrame:n<.15?0:n<.25?1:2,steamTemperature:155},m={timestamp:o,weight:Math.max(0,f),weightFlow:h*.9};t.push({machine:b,scale:m,volume:f*.95})}return t}const ml={id:"shot-2025-01-15-0830",timestamp:"2025-01-15T08:30:00Z",measurements:_n(30),workflow:gr,shotNotes:"Tasted sweet with berry notes",metadata:null},Yo={id:"shot-2025-01-14-0900",timestamp:"2025-01-14T09:00:00Z",measurements:_n(28),workflow:{...gr,id:"workflow-2",doseData:{doseIn:18,doseOut:40}},shotNotes:"Slightly over-extracted, grind finer next time",metadata:null},kc={version:"3.5.0",model:"Decent DE1Pro",serialNumber:"DE1-MOCK-001",GHC:!0,extra:{}},Cc={steamSetting:1,targetSteamTemp:160,targetSteamDuration:30,targetHotWaterTemp:80,targetHotWaterVolume:200,targetHotWaterDuration:30,targetShotVolume:0,groupTemp:92},Pc={fan:1,usb:!1,flushTemp:93,flushTimeout:10,flushFlow:6,hotWaterFlow:4,steamFlow:1.5,tankTemp:0,steamPurgeMode:0},Ac={gatewayMode:"tracking",webUiPath:"/webui",logLevel:"info",weightFlowMultiplier:1,volumeFlowMultiplier:1,scalePowerMode:"displayOff",preferredMachineId:"DE1-MOCK-001",defaultSkinId:"espresso-term",automaticUpdateCheck:!0},yi=[{name:"Decent DE1Pro",id:"DE1-MOCK-001",state:"connected",type:"machine"},{name:"Acaia Lunar",id:"SCALE-MOCK-001",state:"connected",type:"scale"}];function qo(){return{timestamp:new Date().toISOString(),state:{state:"idle",substate:"idle"},flow:0,pressure:0,targetFlow:0,targetPressure:0,mixTemperature:92+(Math.random()-.5)*.4,groupTemperature:89.5+(Math.random()-.5)*.6,targetMixTemperature:92,targetGroupTemperature:90,profileFrame:0,steamTemperature:155+(Math.random()-.5)*1}}const _i={"/api/v1/machine/state":qo,"/api/v1/machine/info":()=>kc,"/api/v1/machine/settings":()=>Pc,"/api/v1/scale/tare":()=>{},"/api/v1/workflow":()=>gr,"/api/v1/profiles":()=>Ko,"/api/v1/shots/ids":()=>[ml.id,Yo.id],"/api/v1/shots/latest":()=>ml,"/api/v1/devices":()=>yi,"/api/v1/devices/scan":()=>yi,"/api/v1/settings":()=>Ac};function Ec(e){if(_i[e])return _i[e];const t=e.match(/^\/api\/v1\/profiles\/(.+)$/);if(t){const o=decodeURIComponent(t[1]);return()=>Ko.find(n=>n.id===o)??Ko[0]}const l=e.match(/^\/api\/v1\/shots\/(.+)$/);if(l){const o=decodeURIComponent(l[1]);return()=>o===ml.id?ml:o===Yo.id?Yo:ml}const s=e.match(/^\/api\/v1\/machine\/state\/(.+)$/);if(s){const o=s[1];return()=>{gl=o,console.log("[mock] Machine state set to:",o)}}}function xn(e,t){const l=t?.method??"GET",s=Ec(e);if(s){const o=s();return console.log(`[mock] ${l} ${e}`,o!==void 0?o:""),o}if(l==="PUT"||l==="POST"){console.log(`[mock] ${l} ${e}`,t?.body?JSON.parse(t.body):"");return}console.warn(`[mock] Unhandled: ${l} ${e}`)}let gl="idle",al=0,Ul=0;class kl{constructor(t,l,s){this.path=t,this.generator=l,this.intervalMs=s,this.handlers=new Set,this.timer=null,this.disposed=!1}connect(){this.disposed||this.timer||(this.timer=setInterval(()=>{const t=this.generator();for(const l of this.handlers)l(t)},this.intervalMs))}subscribe(t){return this.handlers.add(t),this.handlers.size===1&&this.connect(),()=>{this.handlers.delete(t),this.handlers.size===0&&this.dispose()}}dispose(){this.disposed=!0,this.timer&&(clearInterval(this.timer),this.timer=null),this.handlers.clear()}}const Mc=[{id:"rec-mock-1",name:"El Paraiso",roaster:"Manhattan",roasterRecordId:"rec-roaster-1",country:"Colombia",processing:"Washed",roastLevel:"Light",roastDate:"2026-01-15",archived:!1},{id:"rec-mock-2",name:"Guji Natural",roaster:"Onyx",roasterRecordId:"rec-roaster-2",country:"Ethiopia",processing:"Natural",roastLevel:"Light",roastDate:"2026-01-20",archived:!1},{id:"rec-mock-3",name:"Finca Deborah",roaster:"SEY",roasterRecordId:"rec-roaster-3",country:"Panama",processing:"Washed",roastLevel:"Light-Medium",roastDate:"2025-12-28",archived:!0}];function Tc(){if(gl==="espresso"){al++;const t=al/30;if(t>1)return gl="idle",al=0,Ul=0,qo();let l,s,o;if(t<.15)l=t/.15*3,s=3+Math.random()*.5,o="preinfusion";else if(t<.25){const n=(t-.15)/.1;l=3+n*6,s=3-n,o="pouring"}else if(t<.85){const n=(t-.25)/.6;l=9-n*3,s=2+n*.5+(Math.random()-.5)*.1,o="pouring"}else{const n=(t-.85)/.15;l=6*(1-n),s=2.5*(1-n),o="pouring"}return Ul+=s*.9,{timestamp:new Date().toISOString(),state:{state:"espresso",substate:o},flow:Math.max(0,s),pressure:Math.max(0,l),targetFlow:2,targetPressure:9,mixTemperature:92+(Math.random()-.5)*.3,groupTemperature:90+(Math.random()-.5)*.5,targetMixTemperature:92,targetGroupTemperature:90,profileFrame:t<.15?0:t<.25?1:2,steamTemperature:155}}return gl==="steam"?{timestamp:new Date().toISOString(),state:{state:"steam",substate:"pouring"},flow:1.5,pressure:1.2,targetFlow:1.5,targetPressure:0,mixTemperature:92,groupTemperature:90,targetMixTemperature:92,targetGroupTemperature:90,profileFrame:0,steamTemperature:155+Math.random()*5}:(al>0&&(al=0,Ul=0),qo())}function Dc(){return{timestamp:new Date().toISOString(),weight:gl==="espresso"?Ul:0,batteryLevel:85}}let Ho=80;function Lc(){return Ho=Math.max(10,Ho-.1),{currentLevel:Ho,refillLevel:20}}function Rc(){return Cc}function Sn(){return new kl("ws/v1/machine/snapshot",Tc,1e3)}function $n(){return new kl("ws/v1/scale/snapshot",Dc,1e3)}function kn(){return new kl("ws/v1/machine/waterLevels",Lc,5e3)}function Cn(){return new kl("ws/v1/machine/shotSettings",Rc,6e4)}const Oc=Object.freeze(Object.defineProperty({__proto__:null,MockSocket:kl,createMockMachineSocket:Sn,createMockScaleSocket:$n,createMockSettingsSocket:Cn,createMockWaterSocket:kn,isMockCoffee:to,isMockGateway:eo,mockCoffeeBags:Mc,mockRequest:xn},Symbol.toStringTag,{value:"Module"}));function Pn(){const e=localStorage.getItem("gateway-url");return e||`http://${window.location.hostname}:8080`}async function It(e,t){if(eo())return xn(e,t);const l=`${Pn()}${e}`,s=await fetch(l,t);if(!s.ok)throw new Error(`Gateway ${s.status}: ${s.statusText}`);return s.json()}function An(e){return{headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}}const xi=e=>It(`/api/v1/machine/state/${e}`,{method:"PUT"}),Ic=()=>It("/api/v1/machine/info"),En=e=>It("/api/v1/machine/profile",{method:"POST",...An(e)}),zc=()=>It("/api/v1/workflow"),Si=e=>It("/api/v1/workflow",{method:"PUT",...An(e)}),Mn=()=>It("/api/v1/profiles"),Nc=()=>It("/api/v1/shots/ids"),Hc=e=>It(`/api/v1/shots/${encodeURIComponent(e)}`),Fc=()=>It("/api/v1/devices"),Uc=()=>It("/api/v1/settings"),Wc=3e4,Bc=1e3;class so{constructor(t){this.path=t,this.ws=null,this.attempt=0,this.timer=null,this.disposed=!1,this.handlers=new Set}connect(){if(this.disposed)return;this.cleanup();const l=`${Pn().replace(/^http/,"ws")}/${this.path}`,s=new WebSocket(l);this.ws=s,s.addEventListener("open",()=>{this.attempt=0}),s.addEventListener("message",o=>{const n=JSON.parse(o.data);for(const a of this.handlers)a(n)}),s.addEventListener("close",()=>{this.scheduleReconnect()}),s.addEventListener("error",()=>{s.close()})}subscribe(t){return this.handlers.add(t),this.handlers.size===1&&this.connect(),()=>{this.handlers.delete(t),this.handlers.size===0&&this.dispose()}}dispose(){this.disposed=!0,this.cleanup(),this.handlers.clear()}cleanup(){this.timer!==null&&(clearTimeout(this.timer),this.timer=null),this.ws&&(this.ws.close(),this.ws=null)}scheduleReconnect(){if(this.disposed)return;const t=Math.min(Bc*2**this.attempt,Wc);this.attempt++,this.timer=setTimeout(()=>this.connect(),t)}}const lo=eo(),Vc=lo?Sn():new so("ws/v1/machine/snapshot"),jc=lo?Cn():new so("ws/v1/machine/shotSettings"),Gc=lo?kn():new so("ws/v1/machine/waterLevels"),Kc=lo?$n():new so("ws/v1/scale/snapshot");class Tn{constructor(t){this.host=t,this.snapshot=null,this.scale=null,this.water=null,this.shotSettings=null,this.recording=!1,this.measurements=[],t.addController(this)}startRecording(){this.recording=!0,this.measurements=[]}stopRecording(){this.recording=!1}get isRecording(){return this.recording}get recordedMeasurements(){return this.measurements}hostConnected(){this.unsubMachine=Vc.subscribe(t=>{this.snapshot=t,this.recording&&t.state.state==="espresso"&&(this.measurements=[...this.measurements,{machine:t,scale:this.scale?{timestamp:this.scale.timestamp,weight:this.scale.weight,weightFlow:0}:null,volume:null}]),this.host.requestUpdate()}),this.unsubScale=Kc.subscribe(t=>{this.scale=t,this.host.requestUpdate()}),this.unsubWater=Gc.subscribe(t=>{this.water=t,this.host.requestUpdate()}),this.unsubSettings=jc.subscribe(t=>{this.shotSettings=t,this.host.requestUpdate()})}hostDisconnected(){this.unsubMachine?.(),this.unsubScale?.(),this.unsubWater?.(),this.unsubSettings?.()}get state(){return this.snapshot?.state.state??null}get substate(){return this.snapshot?.state.substate??null}get isConnected(){return this.snapshot!==null}get isBrewing(){return this.state==="espresso"}get isSteaming(){return this.state==="steam"}get isIdle(){return this.state==="idle"}}function $i(e){return`${e.toFixed(1)}°`}function Yc(e){return`${e.toFixed(1)} bar`}function qc(e){return`${e.toFixed(1)} ml/s`}function Jo(e){return`${e.toFixed(1)}g`}function Zo(e){const t=Math.floor(e/60),l=Math.floor(e%60);return t>0?`${t}:${l.toString().padStart(2,"0")}`:`${l}s`}function Jc(e){return new Date(e).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}var Zc=Object.getOwnPropertyDescriptor,Qc=(e,t,l,s)=>{for(var o=s>1?void 0:s?Zc(t,l):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=a(o)||o);return o};let Qo=class extends rt{constructor(){super(...arguments),this.machine=new Tn(this)}render(){if(!this.machine.isConnected)return U`<span class="disconnected">Connecting...</span>`;const e=this.machine.snapshot;return U`
      <span class="state" ?data-brewing=${this.machine.isBrewing}>
        ${e.state.state}
      </span>
      <span class="temps">
        <span>Group ${$i(e.groupTemperature)}</span>
        <span>Steam ${$i(e.steamTemperature)}</span>
      </span>
    `}};Qo.styles=Wt`
    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: var(--status-height, 32px);
      padding: 0 var(--space-md, 16px);
      background: var(--color-surface, #292424);
      border-bottom: 1px solid var(--color-border, #655d5d);
      font-size: 12px;
      color: var(--color-text-secondary, #8a8585);
    }

    .state {
      text-transform: capitalize;
      font-weight: 600;
    }

    .state[data-brewing] {
      color: var(--color-accent, #4b8b8b);
    }

    .temps {
      display: flex;
      gap: var(--space-md, 16px);
      font-family: var(--font-mono);
    }

    .disconnected {
      color: var(--color-warning, #b45a3c);
    }
  `;Qo=Qc([Bt("status-bar")],Qo);var Xc=Object.defineProperty,eu=Object.getOwnPropertyDescriptor,Dn=(e,t,l,s)=>{for(var o=s>1?void 0:s?eu(t,l):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=(s?a(t,l,o):a(o))||o);return s&&o&&Xc(t,l,o),o};const tu=[{route:"brew",label:"Brew"},{route:"history",label:"History"},{route:"profiles",label:"Profiles"},{route:"settings",label:"Settings"}];let jl=class extends rt{constructor(){super(...arguments),this.active="brew"}render(){return U`
      <nav>
        ${tu.map(e=>U`
            <a
              href="#/${e.route}"
              ?data-active=${this.active===e.route}
            >
              ${e.label}
            </a>
          `)}
      </nav>
    `}};jl.styles=Wt`
    :host {
      display: block;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: var(--nav-height, 56px);
      background: var(--color-surface, #292424);
      border-top: 1px solid var(--color-border, #655d5d);
      padding-bottom: env(safe-area-inset-bottom);
      z-index: 100;
    }

    nav {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: space-around;
      max-width: 600px;
      margin: 0 auto;
    }

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      text-decoration: none;
      color: var(--color-text-secondary, #8a8585);
      font-size: 10px;
      padding: 4px 8px;
      border-bottom: 2px solid transparent;
      transition: color 0.15s ease-out, border-color 0.15s ease-out;
    }

    a[data-active] {
      color: var(--color-accent, #4b8b8b);
      border-color: var(--color-accent, #4b8b8b);
    }
  `;Dn([Xl()],jl.prototype,"active",2);jl=Dn([Bt("nav-bar")],jl);const su="modulepreload",lu=function(e){return"/"+e},ki={},ou=function(t,l,s){let o=Promise.resolve();if(l&&l.length>0){let p=function(b){return Promise.all(b.map(m=>Promise.resolve(m).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};var a=p;document.getElementsByTagName("link");const h=document.querySelector("meta[property=csp-nonce]"),f=h?.nonce||h?.getAttribute("nonce");o=p(l.map(b=>{if(b=lu(b),b in ki)return;ki[b]=!0;const m=b.endsWith(".css"),v=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${b}"]${v}`))return;const S=document.createElement("link");if(S.rel=m?"stylesheet":su,m||(S.as="script"),S.crossOrigin="",S.href=b,f&&S.setAttribute("nonce",f),document.head.appendChild(S),m)return new Promise((P,O)=>{S.addEventListener("load",P),S.addEventListener("error",()=>O(new Error(`Unable to preload CSS for ${b}`)))})}))}function n(h){const f=new Event("vite:preloadError",{cancelable:!0});if(f.payload=h,window.dispatchEvent(f),!f.defaultPrevented)throw h}return o.then(h=>{for(const f of h||[])f.status==="rejected"&&n(f.reason);return t().catch(n)})};function Ln(){return{pat:localStorage.getItem("airtable-pat")??void 0??"",baseId:localStorage.getItem("airtable-base-id")??void 0??""}}async function vr(e,t){const{pat:l,baseId:s}=Ln();if(!l||!s)throw new Error("Airtable not configured");const o=[],n=new URLSearchParams(t);for(;;){const a=`https://api.airtable.com/v0/${s}/${encodeURIComponent(e)}?${n}`,h=await fetch(a,{headers:{Authorization:`Bearer ${l}`}});if(!h.ok)throw new Error(`Airtable ${h.status}: ${h.statusText}`);const f=await h.json();if(o.push(...f.records),!f.offset)break;n.set("offset",f.offset)}return o}async function Rn(){const e=new URLSearchParams;e.set("fields[]","Name");const t=await vr("Roasters",e),l=new Map;for(const s of t)l.set(s.id,s.fields.Name??"");return l}async function ru(){const e=new URLSearchParams;return e.append("fields[]","Name"),e.append("fields[]","Roaster"),e.append("fields[]","Country"),e.append("fields[]","Processing"),e.append("fields[]","Roast level"),e.append("fields[]","Roast date"),e.append("fields[]","Archived at"),vr("Coffee Bags",e)}async function iu(){const e=new URLSearchParams;e.append("fields[]","Coffee Bag"),e.set("sort[0][field]","Start time"),e.set("sort[0][direction]","desc"),e.set("pageSize","100");const t=await vr("Shots",e),l=new Set,s=[];for(const o of t){const n=o.fields["Coffee Bag"]??[];for(const a of n)l.has(a)||(l.add(a),s.push(a))}return s}let fs=null;async function Ci(){if(fs)return fs;if(to()){const{mockCoffeeBags:o}=await ou(async()=>{const{mockCoffeeBags:n}=await Promise.resolve().then(()=>Oc);return{mockCoffeeBags:n}},void 0);return fs=o,fs}const[e,t,l]=await Promise.all([ru(),Rn(),iu().catch(()=>[])]),s=e.map(o=>{const n=o.fields.Roaster??[],a=n.length>0?t.get(n[0])??"":"";return{id:o.id,name:o.fields.Name??"",roaster:a,roasterRecordId:n.length>0?n[0]:"",country:o.fields.Country??"",processing:o.fields.Processing??"",roastLevel:o.fields["Roast level"]??"",roastDate:o.fields["Roast date"]??null,archived:!!o.fields["Archived at"]}});if(l.length>0){const o=new Map(l.map((n,a)=>[n,a]));s.sort((n,a)=>(o.get(n.id)??1/0)-(o.get(a.id)??1/0))}return fs=s,fs}function nu(){fs=null}let Il=null;async function au(){return Il||(Il=await Rn(),Il)}async function cu(e,t){if(to()){console.log("[mock] updateCoffeeBag",e,t);return}const{pat:l,baseId:s}=Ln();if(!l||!s)throw new Error("Airtable not configured");const o={};t.name!==void 0&&(o.Name=t.name),t.roasterRecordId!==void 0&&(o.Roaster=[t.roasterRecordId]),t.country!==void 0&&(o.Country=t.country),t.processing!==void 0&&(o.Processing=t.processing),t.roastLevel!==void 0&&(o["Roast level"]=t.roastLevel),t.roastDate!==void 0&&(o["Roast date"]=t.roastDate);const n=`https://api.airtable.com/v0/${s}/${encodeURIComponent("Coffee Bags")}/${e}`,a=await fetch(n,{method:"PATCH",headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"},body:JSON.stringify({fields:o})});if(!a.ok)throw new Error(`Airtable ${a.status}: ${a.statusText}`)}var uu=Object.defineProperty,fu=Object.getOwnPropertyDescriptor,vt=(e,t,l,s)=>{for(var o=s>1?void 0:s?fu(t,l):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=(s?a(t,l,o):a(o))||o);return s&&o&&uu(t,l,o),o};let Qe=class extends rt{constructor(){super(...arguments),this.name="",this.roasterRecordId="",this.country="",this.processing="",this.roastLevel="",this.roastDate="",this.roasters=new Map,this.showRoasterPicker=!1,this.saving=!1,this.errorMessage=""}willUpdate(e){e.has("bag")&&this.bag&&(this.name=this.bag.name,this.roasterRecordId=this.bag.roasterRecordId,this.country=this.bag.country,this.processing=this.bag.processing,this.roastLevel=this.bag.roastLevel,this.roastDate=this.bag.roastDate??"")}connectedCallback(){super.connectedCallback(),this.loadRoasters()}async loadRoasters(){try{this.roasters=await au()}catch{}}get selectedRoasterName(){return this.roasterRecordId?this.roasters.get(this.roasterRecordId)??this.bag.roaster:""}toggleRoasterPicker(){this.showRoasterPicker=!this.showRoasterPicker}selectRoaster(e){this.roasterRecordId=e,this.showRoasterPicker=!1}async save(){this.saving=!0,this.errorMessage="";const e={};this.name!==this.bag.name&&(e.name=this.name),this.roasterRecordId!==this.bag.roasterRecordId&&(e.roasterRecordId=this.roasterRecordId),this.country!==this.bag.country&&(e.country=this.country),this.processing!==this.bag.processing&&(e.processing=this.processing),this.roastLevel!==this.bag.roastLevel&&(e.roastLevel=this.roastLevel);const t=this.roastDate||null;t!==this.bag.roastDate&&(e.roastDate=t);try{await cu(this.bag.id,e);const l={...this.bag,name:this.name,roaster:this.roasters.get(this.roasterRecordId)??this.bag.roaster,roasterRecordId:this.roasterRecordId,country:this.country,processing:this.processing,roastLevel:this.roastLevel,roastDate:t};this.dispatchEvent(new CustomEvent("coffee-bag-saved",{detail:{bag:l},bubbles:!0,composed:!0}))}catch(l){this.errorMessage=l instanceof Error?l.message:"Save failed"}finally{this.saving=!1}}cancel(){this.dispatchEvent(new CustomEvent("coffee-bag-edit-cancel",{bubbles:!0,composed:!0}))}render(){return U`
      <div class="edit-form">
        <div class="field">
          <label class="field-label">Roast date</label>
          <input
            class="field-input"
            type="date"
            .value=${this.roastDate}
            @input=${e=>{this.roastDate=e.target.value}}
          />
        </div>

        <div class="field">
          <label class="field-label">Name</label>
          <input
            class="field-input"
            type="text"
            .value=${this.name}
            @input=${e=>{this.name=e.target.value}}
          />
        </div>

        <div class="field">
          <label class="field-label">Roaster</label>
          <div class="roaster-display" @click=${()=>this.toggleRoasterPicker()}>
            <span>${this.selectedRoasterName||"Select roaster"}</span>
            <span class="roaster-chevron">${this.showRoasterPicker?"▲":"▼"}</span>
          </div>
          ${this.showRoasterPicker?U`
                <div class="roaster-list">
                  ${[...this.roasters.entries()].map(([e,t])=>U`
                      <button
                        class="roaster-option"
                        ?data-selected=${e===this.roasterRecordId}
                        @click=${()=>this.selectRoaster(e)}
                      >
                        ${t}
                      </button>
                    `)}
                </div>
              `:he}
        </div>

        <div class="field">
          <label class="field-label">Country</label>
          <input
            class="field-input"
            type="text"
            .value=${this.country}
            @input=${e=>{this.country=e.target.value}}
          />
        </div>

        <div class="field">
          <label class="field-label">Processing</label>
          <input
            class="field-input"
            type="text"
            .value=${this.processing}
            @input=${e=>{this.processing=e.target.value}}
          />
        </div>

        <div class="field">
          <label class="field-label">Roast level</label>
          <input
            class="field-input"
            type="text"
            .value=${this.roastLevel}
            @input=${e=>{this.roastLevel=e.target.value}}
          />
        </div>

        ${this.errorMessage?U`<div class="error-msg">${this.errorMessage}</div>`:he}

        <div class="actions">
          <button class="btn" @click=${()=>this.cancel()} ?disabled=${this.saving}>
            Cancel
          </button>
          <button class="btn btn-primary" @click=${()=>this.save()} ?disabled=${this.saving}>
            ${this.saving?"Saving...":"Save"}
          </button>
        </div>
      </div>
    `}};Qe.styles=Wt`
    :host {
      display: block;
      width: 100%;
    }

    .edit-form {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      padding: var(--space-md) 0;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .field-label {
      font-size: 12px;
      color: var(--color-text-secondary);
    }

    .field-input {
      border: 1px solid var(--color-border);
      border-radius: 0;
      padding: var(--space-xs) var(--space-sm);
      font-size: 14px;
      font-family: inherit;
      background: var(--color-surface);
      color: var(--base_07);
      outline: none;
      -webkit-appearance: none;
      appearance: none;
    }

    .field-input:focus {
      border-color: var(--color-accent);
    }

    /* Date input color-scheme for dark backgrounds */
    input[type="date"] {
      color-scheme: dark;
    }

    /* Roaster picker */

    .roaster-display {
      border: 1px solid var(--color-border);
      border-radius: 0;
      padding: var(--space-xs) var(--space-sm);
      font-size: 14px;
      font-family: inherit;
      background: var(--color-surface);
      color: var(--base_07);
      cursor: pointer;
      min-height: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: border-color 0.15s ease-out;
    }

    .roaster-display:active {
      border-color: var(--color-accent);
    }

    .roaster-chevron {
      font-size: 10px;
      color: var(--color-text-secondary);
    }

    .roaster-list {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--color-border);
      border-top: none;
      max-height: 200px;
      overflow-y: auto;
    }

    .roaster-option {
      padding: var(--space-xs) var(--space-sm);
      font-size: 14px;
      font-family: inherit;
      background: var(--color-surface);
      color: var(--base_07);
      border: none;
      border-bottom: 1px solid var(--color-border);
      cursor: pointer;
      text-align: left;
      transition: color 0.15s ease-out;
    }

    .roaster-option:last-child {
      border-bottom: none;
    }

    .roaster-option:active {
      color: var(--color-accent);
    }

    .roaster-option[data-selected] {
      color: var(--color-accent);
    }

    /* Actions */

    .actions {
      display: flex;
      gap: var(--space-sm);
      margin-top: var(--space-sm);
    }

    .btn {
      min-height: 44px;
      padding: var(--space-sm) var(--space-lg);
      border: 1px solid var(--base_07);
      border-radius: 0;
      background: transparent;
      color: var(--base_07);
      font-family: inherit;
      font-size: 16px;
      cursor: pointer;
      flex: 1;
      transition: border-color 0.15s ease-out, color 0.15s ease-out;
    }

    .btn:active {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .btn-primary {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .btn:disabled {
      opacity: 0.4;
      cursor: default;
    }

    .error-msg {
      font-size: 12px;
      color: var(--color-error);
    }
  `;vt([Xl({attribute:!1})],Qe.prototype,"bag",2);vt([se()],Qe.prototype,"name",2);vt([se()],Qe.prototype,"roasterRecordId",2);vt([se()],Qe.prototype,"country",2);vt([se()],Qe.prototype,"processing",2);vt([se()],Qe.prototype,"roastLevel",2);vt([se()],Qe.prototype,"roastDate",2);vt([se()],Qe.prototype,"roasters",2);vt([se()],Qe.prototype,"showRoasterPicker",2);vt([se()],Qe.prototype,"saving",2);vt([se()],Qe.prototype,"errorMessage",2);Qe=vt([Bt("coffee-bag-edit")],Qe);const hu=!0,De="u-",du="uplot",pu=De+"hz",mu=De+"vt",gu=De+"title",vu=De+"wrap",bu=De+"under",wu=De+"over",yu=De+"axis",ps=De+"off",_u=De+"select",xu=De+"cursor-x",Su=De+"cursor-y",$u=De+"cursor-pt",ku=De+"legend",Cu=De+"live",Pu=De+"inline",Au=De+"series",Eu=De+"marker",Pi=De+"label",Mu=De+"value",fl="width",hl="height",cl="top",Ai="bottom",Hs="left",Fo="right",br="#000",Ei=br+"0",Uo="mousemove",Mi="mousedown",Wo="mouseup",Ti="mouseenter",Di="mouseleave",Li="dblclick",Tu="resize",Du="scroll",Ri="change",Gl="dppxchange",wr="--",Js=typeof window<"u",Xo=Js?document:null,Ws=Js?window:null,Lu=Js?navigator:null;let ne,zl;function er(){let e=devicePixelRatio;ne!=e&&(ne=e,zl&&sr(Ri,zl,er),zl=matchMedia(`(min-resolution: ${ne-.001}dppx) and (max-resolution: ${ne+.001}dppx)`),gs(Ri,zl,er),Ws.dispatchEvent(new CustomEvent(Gl)))}function ot(e,t){if(t!=null){let l=e.classList;!l.contains(t)&&l.add(t)}}function tr(e,t){let l=e.classList;l.contains(t)&&l.remove(t)}function we(e,t,l){e.style[t]=l+"px"}function St(e,t,l,s){let o=Xo.createElement(e);return t!=null&&ot(o,t),l?.insertBefore(o,s),o}function mt(e,t){return St("div",e,t)}const Oi=new WeakMap;function Ot(e,t,l,s,o){let n="translate("+t+"px,"+l+"px)",a=Oi.get(e);n!=a&&(e.style.transform=n,Oi.set(e,n),t<0||l<0||t>s||l>o?ot(e,ps):tr(e,ps))}const Ii=new WeakMap;function zi(e,t,l){let s=t+l,o=Ii.get(e);s!=o&&(Ii.set(e,s),e.style.background=t,e.style.borderColor=l)}const Ni=new WeakMap;function Hi(e,t,l,s){let o=t+""+l,n=Ni.get(e);o!=n&&(Ni.set(e,o),e.style.height=l+"px",e.style.width=t+"px",e.style.marginLeft=s?-t/2+"px":0,e.style.marginTop=s?-l/2+"px":0)}const yr={passive:!0},Ru={...yr,capture:!0};function gs(e,t,l,s){t.addEventListener(e,l,s?Ru:yr)}function sr(e,t,l,s){t.removeEventListener(e,l,yr)}Js&&er();function $t(e,t,l,s){let o;l=l||0,s=s||t.length-1;let n=s<=2147483647;for(;s-l>1;)o=n?l+s>>1:it((l+s)/2),t[o]<e?l=o:s=o;return e-t[l]<=t[s]-e?l:s}function On(e){return(l,s,o)=>{let n=-1,a=-1;for(let h=s;h<=o;h++)if(e(l[h])){n=h;break}for(let h=o;h>=s;h--)if(e(l[h])){a=h;break}return[n,a]}}const In=e=>e!=null,zn=e=>e!=null&&e>0,oo=On(In),Ou=On(zn);function Iu(e,t,l,s=0,o=!1){let n=o?Ou:oo,a=o?zn:In;[t,l]=n(e,t,l);let h=e[t],f=e[t];if(t>-1)if(s==1)h=e[t],f=e[l];else if(s==-1)h=e[l],f=e[t];else for(let p=t;p<=l;p++){let b=e[p];a(b)&&(b<h?h=b:b>f&&(f=b))}return[h??de,f??-de]}function ro(e,t,l,s){let o=Wi(e),n=Wi(t);e==t&&(o==-1?(e*=l,t/=l):(e/=l,t*=l));let a=l==10?Ft:Nn,h=o==1?it:gt,f=n==1?gt:it,p=h(a(Te(e))),b=f(a(Te(t))),m=js(l,p),v=js(l,b);return l==10&&(p<0&&(m=pe(m,-p)),b<0&&(v=pe(v,-b))),s||l==2?(e=m*o,t=v*n):(e=Wn(e,m),t=io(t,v)),[e,t]}function _r(e,t,l,s){let o=ro(e,t,l,s);return e==0&&(o[0]=0),t==0&&(o[1]=0),o}const xr=.1,Fi={mode:3,pad:xr},vl={pad:0,soft:null,mode:0},zu={min:vl,max:vl};function Kl(e,t,l,s){return no(l)?Ui(e,t,l):(vl.pad=l,vl.soft=s?0:null,vl.mode=s?3:0,Ui(e,t,zu))}function re(e,t){return e??t}function Nu(e,t,l){for(t=re(t,0),l=re(l,e.length-1);t<=l;){if(e[t]!=null)return!0;t++}return!1}function Ui(e,t,l){let s=l.min,o=l.max,n=re(s.pad,0),a=re(o.pad,0),h=re(s.hard,-de),f=re(o.hard,de),p=re(s.soft,de),b=re(o.soft,-de),m=re(s.mode,0),v=re(o.mode,0),S=t-e,P=Ft(S),O=Ye(Te(e),Te(t)),H=Ft(O),W=Te(H-P);(S<1e-24||W>10)&&(S=0,(e==0||t==0)&&(S=1e-24,m==2&&p!=de&&(n=0),v==2&&b!=-de&&(a=0)));let x=S||O||1e3,N=Ft(x),$=js(10,it(N)),q=x*(S==0?e==0?.1:1:n),T=pe(Wn(e-q,$/10),24),J=e>=p&&(m==1||m==3&&T<=p||m==2&&T>=p)?p:de,G=Ye(h,T<J&&e>=J?J:kt(J,T)),X=x*(S==0?t==0?.1:1:a),j=pe(io(t+X,$/10),24),k=t<=b&&(v==1||v==3&&j>=b||v==2&&j<=b)?b:-de,Y=kt(f,j>k&&t<=k?k:Ye(k,j));return G==Y&&G==0&&(Y=100),[G,Y]}const Hu=new Intl.NumberFormat(Js?Lu.language:"en-US"),Sr=e=>Hu.format(e),at=Math,Wl=at.PI,Te=at.abs,it=at.floor,Me=at.round,gt=at.ceil,kt=at.min,Ye=at.max,js=at.pow,Wi=at.sign,Ft=at.log10,Nn=at.log2,Fu=(e,t=1)=>at.sinh(e)*t,Bo=(e,t=1)=>at.asinh(e/t),de=1/0;function Bi(e){return(Ft((e^e>>31)-(e>>31))|0)+1}function lr(e,t,l){return kt(Ye(e,t),l)}function Hn(e){return typeof e=="function"}function ee(e){return Hn(e)?e:()=>e}const Uu=()=>{},Fn=e=>e,Un=(e,t)=>t,Wu=e=>null,Vi=e=>!0,ji=(e,t)=>e==t,Bu=/\.\d*?(?=9{6,}|0{6,})/gm,bs=e=>{if(Vn(e)||Xt.has(e))return e;const t=`${e}`,l=t.match(Bu);if(l==null)return e;let s=l[0].length-1;if(t.indexOf("e-")!=-1){let[o,n]=t.split("e");return+`${bs(o)}e${n}`}return pe(e,s)};function hs(e,t){return bs(pe(bs(e/t))*t)}function io(e,t){return bs(gt(bs(e/t))*t)}function Wn(e,t){return bs(it(bs(e/t))*t)}function pe(e,t=0){if(Vn(e))return e;let l=10**t,s=e*l*(1+Number.EPSILON);return Me(s)/l}const Xt=new Map;function Bn(e){return((""+e).split(".")[1]||"").length}function xl(e,t,l,s){let o=[],n=s.map(Bn);for(let a=t;a<l;a++){let h=Te(a),f=pe(js(e,a),h);for(let p=0;p<s.length;p++){let b=e==10?+`${s[p]}e${a}`:s[p]*f,m=(a>=0?0:h)+(a>=n[p]?0:n[p]),v=e==10?b:pe(b,m);o.push(v),Xt.set(v,m)}}return o}const bl={},$r=[],Gs=[null,null],Zt=Array.isArray,Vn=Number.isInteger,Vu=e=>e===void 0;function Gi(e){return typeof e=="string"}function no(e){let t=!1;if(e!=null){let l=e.constructor;t=l==null||l==Object}return t}function ju(e){return e!=null&&typeof e=="object"}const Gu=Object.getPrototypeOf(Uint8Array),jn="__proto__";function Ks(e,t=no){let l;if(Zt(e)){let s=e.find(o=>o!=null);if(Zt(s)||t(s)){l=Array(e.length);for(let o=0;o<e.length;o++)l[o]=Ks(e[o],t)}else l=e.slice()}else if(e instanceof Gu)l=e.slice();else if(t(e)){l={};for(let s in e)s!=jn&&(l[s]=Ks(e[s],t))}else l=e;return l}function Pe(e){let t=arguments;for(let l=1;l<t.length;l++){let s=t[l];for(let o in s)o!=jn&&(no(e[o])?Pe(e[o],Ks(s[o])):e[o]=Ks(s[o]))}return e}const Ku=0,Yu=1,qu=2;function Ju(e,t,l){for(let s=0,o,n=-1;s<t.length;s++){let a=t[s];if(a>n){for(o=a-1;o>=0&&e[o]==null;)e[o--]=null;for(o=a+1;o<l&&e[o]==null;)e[n=o++]=null}}}function Zu(e,t){if(ef(e)){let a=e[0].slice();for(let h=1;h<e.length;h++)a.push(...e[h].slice(1));return tf(a[0])||(a=Xu(a)),a}let l=new Set;for(let a=0;a<e.length;a++){let f=e[a][0],p=f.length;for(let b=0;b<p;b++)l.add(f[b])}let s=[Array.from(l).sort((a,h)=>a-h)],o=s[0].length,n=new Map;for(let a=0;a<o;a++)n.set(s[0][a],a);for(let a=0;a<e.length;a++){let h=e[a],f=h[0];for(let p=1;p<h.length;p++){let b=h[p],m=Array(o).fill(void 0),v=t?t[a][p]:Yu,S=[];for(let P=0;P<b.length;P++){let O=b[P],H=n.get(f[P]);O===null?v!=Ku&&(m[H]=O,v==qu&&S.push(H)):m[H]=O}Ju(m,S,o),s.push(m)}}return s}const Qu=typeof queueMicrotask>"u"?e=>Promise.resolve().then(e):queueMicrotask;function Xu(e){let t=e[0],l=t.length,s=Array(l);for(let n=0;n<s.length;n++)s[n]=n;s.sort((n,a)=>t[n]-t[a]);let o=[];for(let n=0;n<e.length;n++){let a=e[n],h=Array(l);for(let f=0;f<l;f++)h[f]=a[s[f]];o.push(h)}return o}function ef(e){let t=e[0][0],l=t.length;for(let s=1;s<e.length;s++){let o=e[s][0];if(o.length!=l)return!1;if(o!=t){for(let n=0;n<l;n++)if(o[n]!=t[n])return!1}}return!0}function tf(e,t=100){const l=e.length;if(l<=1)return!0;let s=0,o=l-1;for(;s<=o&&e[s]==null;)s++;for(;o>=s&&e[o]==null;)o--;if(o<=s)return!0;const n=Ye(1,it((o-s+1)/t));for(let a=e[s],h=s+n;h<=o;h+=n){const f=e[h];if(f!=null){if(f<=a)return!1;a=f}}return!0}const Gn=["January","February","March","April","May","June","July","August","September","October","November","December"],Kn=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function Yn(e){return e.slice(0,3)}const sf=Kn.map(Yn),lf=Gn.map(Yn),of={MMMM:Gn,MMM:lf,WWWW:Kn,WWW:sf};function ul(e){return(e<10?"0":"")+e}function rf(e){return(e<10?"00":e<100?"0":"")+e}const nf={YYYY:e=>e.getFullYear(),YY:e=>(e.getFullYear()+"").slice(2),MMMM:(e,t)=>t.MMMM[e.getMonth()],MMM:(e,t)=>t.MMM[e.getMonth()],MM:e=>ul(e.getMonth()+1),M:e=>e.getMonth()+1,DD:e=>ul(e.getDate()),D:e=>e.getDate(),WWWW:(e,t)=>t.WWWW[e.getDay()],WWW:(e,t)=>t.WWW[e.getDay()],HH:e=>ul(e.getHours()),H:e=>e.getHours(),h:e=>{let t=e.getHours();return t==0?12:t>12?t-12:t},AA:e=>e.getHours()>=12?"PM":"AM",aa:e=>e.getHours()>=12?"pm":"am",a:e=>e.getHours()>=12?"p":"a",mm:e=>ul(e.getMinutes()),m:e=>e.getMinutes(),ss:e=>ul(e.getSeconds()),s:e=>e.getSeconds(),fff:e=>rf(e.getMilliseconds())};function kr(e,t){t=t||of;let l=[],s=/\{([a-z]+)\}|[^{]+/gi,o;for(;o=s.exec(e);)l.push(o[0][0]=="{"?nf[o[1]]:o[0]);return n=>{let a="";for(let h=0;h<l.length;h++)a+=typeof l[h]=="string"?l[h]:l[h](n,t);return a}}const af=new Intl.DateTimeFormat().resolvedOptions().timeZone;function cf(e,t){let l;return t=="UTC"||t=="Etc/UTC"?l=new Date(+e+e.getTimezoneOffset()*6e4):t==af?l=e:(l=new Date(e.toLocaleString("en-US",{timeZone:t})),l.setMilliseconds(e.getMilliseconds())),l}const qn=e=>e%1==0,Yl=[1,2,2.5,5],uf=xl(10,-32,0,Yl),Jn=xl(10,0,32,Yl),ff=Jn.filter(qn),ds=uf.concat(Jn),Cr=`
`,Zn="{YYYY}",Ki=Cr+Zn,Qn="{M}/{D}",dl=Cr+Qn,Nl=dl+"/{YY}",Xn="{aa}",hf="{h}:{mm}",Us=hf+Xn,Yi=Cr+Us,qi=":{ss}",ce=null;function ea(e){let t=e*1e3,l=t*60,s=l*60,o=s*24,n=o*30,a=o*365,f=(e==1?xl(10,0,3,Yl).filter(qn):xl(10,-3,0,Yl)).concat([t,t*5,t*10,t*15,t*30,l,l*5,l*10,l*15,l*30,s,s*2,s*3,s*4,s*6,s*8,s*12,o,o*2,o*3,o*4,o*5,o*6,o*7,o*8,o*9,o*10,o*15,n,n*2,n*3,n*4,n*6,a,a*2,a*5,a*10,a*25,a*50,a*100]);const p=[[a,Zn,ce,ce,ce,ce,ce,ce,1],[o*28,"{MMM}",Ki,ce,ce,ce,ce,ce,1],[o,Qn,Ki,ce,ce,ce,ce,ce,1],[s,"{h}"+Xn,Nl,ce,dl,ce,ce,ce,1],[l,Us,Nl,ce,dl,ce,ce,ce,1],[t,qi,Nl+" "+Us,ce,dl+" "+Us,ce,Yi,ce,1],[e,qi+".{fff}",Nl+" "+Us,ce,dl+" "+Us,ce,Yi,ce,1]];function b(m){return(v,S,P,O,H,W)=>{let x=[],N=H>=a,$=H>=n&&H<a,q=m(P),T=pe(q*e,3),J=Vo(q.getFullYear(),N?0:q.getMonth(),$||N?1:q.getDate()),G=pe(J*e,3);if($||N){let X=$?H/n:0,j=N?H/a:0,k=T==G?T:pe(Vo(J.getFullYear()+j,J.getMonth()+X,1)*e,3),Y=new Date(Me(k/e)),D=Y.getFullYear(),B=Y.getMonth();for(let z=0;k<=O;z++){let te=Vo(D+j*z,B+X*z,1),I=te-m(pe(te*e,3));k=pe((+te+I)*e,3),k<=O&&x.push(k)}}else{let X=H>=o?o:H,j=it(P)-it(T),k=G+j+io(T-G,X);x.push(k);let Y=m(k),D=Y.getHours()+Y.getMinutes()/l+Y.getSeconds()/s,B=H/s,z=v.axes[S]._space,te=W/z;for(;k=pe(k+H,e==1?0:3),!(k>O);)if(B>1){let I=it(pe(D+B,6))%24,le=m(k).getHours()-I;le>1&&(le=-1),k-=le*s,D=(D+B)%24;let ue=x[x.length-1];pe((k-ue)/H,3)*te>=.7&&x.push(k)}else x.push(k)}return x}}return[f,p,b]}const[df,pf,mf]=ea(1),[gf,vf,bf]=ea(.001);xl(2,-53,53,[1]);function Ji(e,t){return e.map(l=>l.map((s,o)=>o==0||o==8||s==null?s:t(o==1||l[8]==0?s:l[1]+s)))}function Zi(e,t){return(l,s,o,n,a)=>{let h=t.find(P=>a>=P[0])||t[t.length-1],f,p,b,m,v,S;return s.map(P=>{let O=e(P),H=O.getFullYear(),W=O.getMonth(),x=O.getDate(),N=O.getHours(),$=O.getMinutes(),q=O.getSeconds(),T=H!=f&&h[2]||W!=p&&h[3]||x!=b&&h[4]||N!=m&&h[5]||$!=v&&h[6]||q!=S&&h[7]||h[1];return f=H,p=W,b=x,m=N,v=$,S=q,T(O)})}}function wf(e,t){let l=kr(t);return(s,o,n,a,h)=>o.map(f=>l(e(f)))}function Vo(e,t,l){return new Date(e,t,l)}function Qi(e,t){return t(e)}const yf="{YYYY}-{MM}-{DD} {h}:{mm}{aa}";function Xi(e,t){return(l,s,o,n)=>n==null?wr:t(e(s))}function _f(e,t){let l=e.series[t];return l.width?l.stroke(e,t):l.points.width?l.points.stroke(e,t):null}function xf(e,t){return e.series[t].fill(e,t)}const Sf={show:!0,live:!0,isolate:!1,mount:Uu,markers:{show:!0,width:2,stroke:_f,fill:xf,dash:"solid"},idx:null,idxs:null,values:[]};function $f(e,t){let l=e.cursor.points,s=mt(),o=l.size(e,t);we(s,fl,o),we(s,hl,o);let n=o/-2;we(s,"marginLeft",n),we(s,"marginTop",n);let a=l.width(e,t,o);return a&&we(s,"borderWidth",a),s}function kf(e,t){let l=e.series[t].points;return l._fill||l._stroke}function Cf(e,t){let l=e.series[t].points;return l._stroke||l._fill}function Pf(e,t){return e.series[t].points.size}const jo=[0,0];function Af(e,t,l){return jo[0]=t,jo[1]=l,jo}function Hl(e,t,l,s=!0){return o=>{o.button==0&&(!s||o.target==t)&&l(o)}}function Go(e,t,l,s=!0){return o=>{(!s||o.target==t)&&l(o)}}const Ef={show:!0,x:!0,y:!0,lock:!1,move:Af,points:{one:!1,show:$f,size:Pf,width:0,stroke:Cf,fill:kf},bind:{mousedown:Hl,mouseup:Hl,click:Hl,dblclick:Hl,mousemove:Go,mouseleave:Go,mouseenter:Go},drag:{setScale:!0,x:!0,y:!1,dist:0,uni:null,click:(e,t)=>{t.stopPropagation(),t.stopImmediatePropagation()},_x:!1,_y:!1},focus:{dist:(e,t,l,s,o)=>s-o,prox:-1,bias:0},hover:{skip:[void 0],prox:null,bias:0},left:-10,top:-10,idx:null,dataIdx:null,idxs:null,event:null},ta={show:!0,stroke:"rgba(0,0,0,0.07)",width:2},Pr=Pe({},ta,{filter:Un}),sa=Pe({},Pr,{size:10}),la=Pe({},ta,{show:!1}),Ar='12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',oa="bold "+Ar,ra=1.5,en={show:!0,scale:"x",stroke:br,space:50,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:oa,side:2,grid:Pr,ticks:sa,border:la,font:Ar,lineGap:ra,rotate:0},Mf="Value",Tf="Time",tn={show:!0,scale:"x",auto:!1,sorted:1,min:de,max:-de,idxs:[]};function Df(e,t,l,s,o){return t.map(n=>n==null?"":Sr(n))}function Lf(e,t,l,s,o,n,a){let h=[],f=Xt.get(o)||0;l=a?l:pe(io(l,o),f);for(let p=l;p<=s;p=pe(p+o,f))h.push(Object.is(p,-0)?0:p);return h}function or(e,t,l,s,o,n,a){const h=[],f=e.scales[e.axes[t].scale].log,p=f==10?Ft:Nn,b=it(p(l));o=js(f,b),f==10&&(o=ds[$t(o,ds)]);let m=l,v=o*f;f==10&&(v=ds[$t(v,ds)]);do h.push(m),m=m+o,f==10&&!Xt.has(m)&&(m=pe(m,Xt.get(o))),m>=v&&(o=m,v=o*f,f==10&&(v=ds[$t(v,ds)]));while(m<=s);return h}function Rf(e,t,l,s,o,n,a){let f=e.scales[e.axes[t].scale].asinh,p=s>f?or(e,t,Ye(f,l),s,o):[f],b=s>=0&&l<=0?[0]:[];return(l<-f?or(e,t,Ye(f,-s),-l,o):[f]).reverse().map(v=>-v).concat(b,p)}const ia=/./,Of=/[12357]/,If=/[125]/,sn=/1/,rr=(e,t,l,s)=>e.map((o,n)=>t==4&&o==0||n%s==0&&l.test(o.toExponential()[o<0?1:0])?o:null);function zf(e,t,l,s,o){let n=e.axes[l],a=n.scale,h=e.scales[a],f=e.valToPos,p=n._space,b=f(10,a),m=f(9,a)-b>=p?ia:f(7,a)-b>=p?Of:f(5,a)-b>=p?If:sn;if(m==sn){let v=Te(f(1,a)-b);if(v<p)return rr(t.slice().reverse(),h.distr,m,gt(p/v)).reverse()}return rr(t,h.distr,m,1)}function Nf(e,t,l,s,o){let n=e.axes[l],a=n.scale,h=n._space,f=e.valToPos,p=Te(f(1,a)-f(2,a));return p<h?rr(t.slice().reverse(),3,ia,gt(h/p)).reverse():t}function Hf(e,t,l,s){return s==null?wr:t==null?"":Sr(t)}const ln={show:!0,scale:"y",stroke:br,space:30,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:oa,side:3,grid:Pr,ticks:sa,border:la,font:Ar,lineGap:ra,rotate:0};function Ff(e,t){let l=3+(e||1)*2;return pe(l*t,3)}function Uf(e,t){let{scale:l,idxs:s}=e.series[0],o=e._data[0],n=e.valToPos(o[s[0]],l,!0),a=e.valToPos(o[s[1]],l,!0),h=Te(a-n),f=e.series[t],p=h/(f.points.space*ne);return s[1]-s[0]<=p}const on={scale:null,auto:!0,sorted:0,min:de,max:-de},na=(e,t,l,s,o)=>o,rn={show:!0,auto:!0,sorted:0,gaps:na,alpha:1,facets:[Pe({},on,{scale:"x"}),Pe({},on,{scale:"y"})]},nn={scale:"y",auto:!0,sorted:0,show:!0,spanGaps:!1,gaps:na,alpha:1,points:{show:Uf,filter:null},values:null,min:de,max:-de,idxs:[],path:null,clip:null};function Wf(e,t,l,s,o){return l/10}const aa={time:hu,auto:!0,distr:1,log:10,asinh:1,min:null,max:null,dir:1,ori:0},Bf=Pe({},aa,{time:!1,ori:1}),an={};function ca(e,t){let l=an[e];return l||(l={key:e,plots:[],sub(s){l.plots.push(s)},unsub(s){l.plots=l.plots.filter(o=>o!=s)},pub(s,o,n,a,h,f,p){for(let b=0;b<l.plots.length;b++)l.plots[b]!=o&&l.plots[b].pub(s,o,n,a,h,f,p)}},e!=null&&(an[e]=l)),l}const Ys=1,ir=2;function ws(e,t,l){const s=e.mode,o=e.series[t],n=s==2?e._data[t]:e._data,a=e.scales,h=e.bbox;let f=n[0],p=s==2?n[1]:n[t],b=s==2?a[o.facets[0].scale]:a[e.series[0].scale],m=s==2?a[o.facets[1].scale]:a[o.scale],v=h.left,S=h.top,P=h.width,O=h.height,H=e.valToPosH,W=e.valToPosV;return b.ori==0?l(o,f,p,b,m,H,W,v,S,P,O,co,Zs,fo,fa,da):l(o,f,p,b,m,W,H,S,v,O,P,uo,Qs,Tr,ha,pa)}function Er(e,t){let l=0,s=0,o=re(e.bands,$r);for(let n=0;n<o.length;n++){let a=o[n];a.series[0]==t?l=a.dir:a.series[1]==t&&(a.dir==1?s|=1:s|=2)}return[l,s==1?-1:s==2?1:s==3?2:0]}function Vf(e,t,l,s,o){let n=e.mode,a=e.series[t],h=n==2?a.facets[1].scale:a.scale,f=e.scales[h];return o==-1?f.min:o==1?f.max:f.distr==3?f.dir==1?f.min:f.max:0}function Ut(e,t,l,s,o,n){return ws(e,t,(a,h,f,p,b,m,v,S,P,O,H)=>{let W=a.pxRound;const x=p.dir*(p.ori==0?1:-1),N=p.ori==0?Zs:Qs;let $,q;x==1?($=l,q=s):($=s,q=l);let T=W(m(h[$],p,O,S)),J=W(v(f[$],b,H,P)),G=W(m(h[q],p,O,S)),X=W(v(n==1?b.max:b.min,b,H,P)),j=new Path2D(o);return N(j,G,X),N(j,T,X),N(j,T,J),j})}function ao(e,t,l,s,o,n){let a=null;if(e.length>0){a=new Path2D;const h=t==0?fo:Tr;let f=l;for(let m=0;m<e.length;m++){let v=e[m];if(v[1]>v[0]){let S=v[0]-f;S>0&&h(a,f,s,S,s+n),f=v[1]}}let p=l+o-f,b=10;p>0&&h(a,f,s-b/2,p,s+n+b)}return a}function jf(e,t,l){let s=e[e.length-1];s&&s[0]==t?s[1]=l:e.push([t,l])}function Mr(e,t,l,s,o,n,a){let h=[],f=e.length;for(let p=o==1?l:s;p>=l&&p<=s;p+=o)if(t[p]===null){let m=p,v=p;if(o==1)for(;++p<=s&&t[p]===null;)v=p;else for(;--p>=l&&t[p]===null;)v=p;let S=n(e[m]),P=v==m?S:n(e[v]),O=m-o;S=a<=0&&O>=0&&O<f?n(e[O]):S;let W=v+o;P=a>=0&&W>=0&&W<f?n(e[W]):P,P>=S&&h.push([S,P])}return h}function cn(e){return e==0?Fn:e==1?Me:t=>hs(t,e)}function ua(e){let t=e==0?co:uo,l=e==0?(o,n,a,h,f,p)=>{o.arcTo(n,a,h,f,p)}:(o,n,a,h,f,p)=>{o.arcTo(a,n,f,h,p)},s=e==0?(o,n,a,h,f)=>{o.rect(n,a,h,f)}:(o,n,a,h,f)=>{o.rect(a,n,f,h)};return(o,n,a,h,f,p=0,b=0)=>{p==0&&b==0?s(o,n,a,h,f):(p=kt(p,h/2,f/2),b=kt(b,h/2,f/2),t(o,n+p,a),l(o,n+h,a,n+h,a+f,p),l(o,n+h,a+f,n,a+f,b),l(o,n,a+f,n,a,b),l(o,n,a,n+h,a,p),o.closePath())}}const co=(e,t,l)=>{e.moveTo(t,l)},uo=(e,t,l)=>{e.moveTo(l,t)},Zs=(e,t,l)=>{e.lineTo(t,l)},Qs=(e,t,l)=>{e.lineTo(l,t)},fo=ua(0),Tr=ua(1),fa=(e,t,l,s,o,n)=>{e.arc(t,l,s,o,n)},ha=(e,t,l,s,o,n)=>{e.arc(l,t,s,o,n)},da=(e,t,l,s,o,n,a)=>{e.bezierCurveTo(t,l,s,o,n,a)},pa=(e,t,l,s,o,n,a)=>{e.bezierCurveTo(l,t,o,s,a,n)};function ma(e){return(t,l,s,o,n)=>ws(t,l,(a,h,f,p,b,m,v,S,P,O,H)=>{let{pxRound:W,points:x}=a,N,$;p.ori==0?(N=co,$=fa):(N=uo,$=ha);const q=pe(x.width*ne,3);let T=(x.size-x.width)/2*ne,J=pe(T*2,3),G=new Path2D,X=new Path2D,{left:j,top:k,width:Y,height:D}=t.bbox;fo(X,j-J,k-J,Y+J*2,D+J*2);const B=z=>{if(f[z]!=null){let te=W(m(h[z],p,O,S)),I=W(v(f[z],b,H,P));N(G,te+T,I),$(G,te,I,T,0,Wl*2)}};if(n)n.forEach(B);else for(let z=s;z<=o;z++)B(z);return{stroke:q>0?G:null,fill:G,clip:X,flags:Ys|ir}})}function ga(e){return(t,l,s,o,n,a)=>{s!=o&&(n!=s&&a!=s&&e(t,l,s),n!=o&&a!=o&&e(t,l,o),e(t,l,a))}}const Gf=ga(Zs),Kf=ga(Qs);function va(e){const t=re(e?.alignGaps,0);return(l,s,o,n)=>ws(l,s,(a,h,f,p,b,m,v,S,P,O,H)=>{[o,n]=oo(f,o,n);let W=a.pxRound,x=D=>W(m(D,p,O,S)),N=D=>W(v(D,b,H,P)),$,q;p.ori==0?($=Zs,q=Gf):($=Qs,q=Kf);const T=p.dir*(p.ori==0?1:-1),J={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:Ys},G=J.stroke;let X=!1;if(n-o>=O*4){let D=L=>l.posToVal(L,p.key,!0),B=null,z=null,te,I,qe,ye=x(h[T==1?o:n]),le=x(h[o]),ue=x(h[n]),Z=D(T==1?le+1:ue-1);for(let L=T==1?o:n;L>=o&&L<=n;L+=T){let Ae=h[L],_e=(T==1?Ae<Z:Ae>Z)?ye:x(Ae),ae=f[L];_e==ye?ae!=null?(I=ae,B==null?($(G,_e,N(I)),te=B=z=I):I<B?B=I:I>z&&(z=I)):ae===null&&(X=!0):(B!=null&&q(G,ye,N(B),N(z),N(te),N(I)),ae!=null?(I=ae,$(G,_e,N(I)),B=z=te=I):(B=z=null,ae===null&&(X=!0)),ye=_e,Z=D(ye+T))}B!=null&&B!=z&&qe!=ye&&q(G,ye,N(B),N(z),N(te),N(I))}else for(let D=T==1?o:n;D>=o&&D<=n;D+=T){let B=f[D];B===null?X=!0:B!=null&&$(G,x(h[D]),N(B))}let[k,Y]=Er(l,s);if(a.fill!=null||k!=0){let D=J.fill=new Path2D(G),B=a.fillTo(l,s,a.min,a.max,k),z=N(B),te=x(h[o]),I=x(h[n]);T==-1&&([I,te]=[te,I]),$(D,I,z),$(D,te,z)}if(!a.spanGaps){let D=[];X&&D.push(...Mr(h,f,o,n,T,x,t)),J.gaps=D=a.gaps(l,s,o,n,D),J.clip=ao(D,p.ori,S,P,O,H)}return Y!=0&&(J.band=Y==2?[Ut(l,s,o,n,G,-1),Ut(l,s,o,n,G,1)]:Ut(l,s,o,n,G,Y)),J})}function Yf(e){const t=re(e.align,1),l=re(e.ascDesc,!1),s=re(e.alignGaps,0),o=re(e.extend,!1);return(n,a,h,f)=>ws(n,a,(p,b,m,v,S,P,O,H,W,x,N)=>{[h,f]=oo(m,h,f);let $=p.pxRound,{left:q,width:T}=n.bbox,J=le=>$(P(le,v,x,H)),G=le=>$(O(le,S,N,W)),X=v.ori==0?Zs:Qs;const j={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:Ys},k=j.stroke,Y=v.dir*(v.ori==0?1:-1);let D=G(m[Y==1?h:f]),B=J(b[Y==1?h:f]),z=B,te=B;o&&t==-1&&(te=q,X(k,te,D)),X(k,B,D);for(let le=Y==1?h:f;le>=h&&le<=f;le+=Y){let ue=m[le];if(ue==null)continue;let Z=J(b[le]),L=G(ue);t==1?X(k,Z,D):X(k,z,L),X(k,Z,L),D=L,z=Z}let I=z;o&&t==1&&(I=q+T,X(k,I,D));let[qe,ye]=Er(n,a);if(p.fill!=null||qe!=0){let le=j.fill=new Path2D(k),ue=p.fillTo(n,a,p.min,p.max,qe),Z=G(ue);X(le,I,Z),X(le,te,Z)}if(!p.spanGaps){let le=[];le.push(...Mr(b,m,h,f,Y,J,s));let ue=p.width*ne/2,Z=l||t==1?ue:-ue,L=l||t==-1?-ue:ue;le.forEach(Ae=>{Ae[0]+=Z,Ae[1]+=L}),j.gaps=le=p.gaps(n,a,h,f,le),j.clip=ao(le,v.ori,H,W,x,N)}return ye!=0&&(j.band=ye==2?[Ut(n,a,h,f,k,-1),Ut(n,a,h,f,k,1)]:Ut(n,a,h,f,k,ye)),j})}function un(e,t,l,s,o,n,a=de){if(e.length>1){let h=null;for(let f=0,p=1/0;f<e.length;f++)if(t[f]!==void 0){if(h!=null){let b=Te(e[f]-e[h]);b<p&&(p=b,a=Te(l(e[f],s,o,n)-l(e[h],s,o,n)))}h=f}}return a}function qf(e){e=e||bl;const t=re(e.size,[.6,de,1]),l=e.align||0,s=e.gap||0;let o=e.radius;o=o==null?[0,0]:typeof o=="number"?[o,0]:o;const n=ee(o),a=1-t[0],h=re(t[1],de),f=re(t[2],1),p=re(e.disp,bl),b=re(e.each,S=>{}),{fill:m,stroke:v}=p;return(S,P,O,H)=>ws(S,P,(W,x,N,$,q,T,J,G,X,j,k)=>{let Y=W.pxRound,D=l,B=s*ne,z=h*ne,te=f*ne,I,qe;$.ori==0?[I,qe]=n(S,P):[qe,I]=n(S,P);const ye=$.dir*($.ori==0?1:-1);let le=$.ori==0?fo:Tr,ue=$.ori==0?b:(E,me,Ee,Ss,ss,Et,ls)=>{b(E,me,Ee,ss,Ss,ls,Et)},Z=re(S.bands,$r).find(E=>E.series[0]==P),L=Z!=null?Z.dir:0,Ae=W.fillTo(S,P,W.min,W.max,L),Be=Y(J(Ae,q,k,X)),_e,ae,bt,Xe=j,Se=Y(W.width*ne),At=!1,zt=null,ct=null,jt=null,ys=null;m!=null&&(Se==0||v!=null)&&(At=!0,zt=m.values(S,P,O,H),ct=new Map,new Set(zt).forEach(E=>{E!=null&&ct.set(E,new Path2D)}),Se>0&&(jt=v.values(S,P,O,H),ys=new Map,new Set(jt).forEach(E=>{E!=null&&ys.set(E,new Path2D)})));let{x0:_s,size:Xs}=p;if(_s!=null&&Xs!=null){D=1,x=_s.values(S,P,O,H),_s.unit==2&&(x=x.map(Ee=>S.posToVal(G+Ee*j,$.key,!0)));let E=Xs.values(S,P,O,H);Xs.unit==2?ae=E[0]*j:ae=T(E[0],$,j,G)-T(0,$,j,G),Xe=un(x,N,T,$,j,G,Xe),bt=Xe-ae+B}else Xe=un(x,N,T,$,j,G,Xe),bt=Xe*a+B,ae=Xe-bt;bt<1&&(bt=0),Se>=ae/2&&(Se=0),bt<5&&(Y=Fn);let Cl=bt>0,es=Xe-bt-(Cl?Se:0);ae=Y(lr(es,te,z)),_e=(D==0?ae/2:D==ye?0:ae)-D*ye*((D==0?B/2:0)+(Cl?Se/2:0));const Ve={stroke:null,fill:null,clip:null,band:null,gaps:null,flags:0},xs=At?null:new Path2D;let Nt=null;if(Z!=null)Nt=S.data[Z.series[1]];else{let{y0:E,y1:me}=p;E!=null&&me!=null&&(N=me.values(S,P,O,H),Nt=E.values(S,P,O,H))}let ts=I*ae,K=qe*ae;for(let E=ye==1?O:H;E>=O&&E<=H;E+=ye){let me=N[E];if(me==null)continue;if(Nt!=null){let Je=Nt[E]??0;if(me-Je==0)continue;Be=J(Je,q,k,X)}let Ee=$.distr!=2||p!=null?x[E]:E,Ss=T(Ee,$,j,G),ss=J(re(me,Ae),q,k,X),Et=Y(Ss-_e),ls=Y(Ye(ss,Be)),et=Y(kt(ss,Be)),ut=ls-et;if(me!=null){let Je=me<0?K:ts,wt=me<0?ts:K;At?(Se>0&&jt[E]!=null&&le(ys.get(jt[E]),Et,et+it(Se/2),ae,Ye(0,ut-Se),Je,wt),zt[E]!=null&&le(ct.get(zt[E]),Et,et+it(Se/2),ae,Ye(0,ut-Se),Je,wt)):le(xs,Et,et+it(Se/2),ae,Ye(0,ut-Se),Je,wt),ue(S,P,E,Et-Se/2,et,ae+Se,ut)}}return Se>0?Ve.stroke=At?ys:xs:At||(Ve._fill=W.width==0?W._fill:W._stroke??W._fill,Ve.width=0),Ve.fill=At?ct:xs,Ve})}function Jf(e,t){const l=re(t?.alignGaps,0);return(s,o,n,a)=>ws(s,o,(h,f,p,b,m,v,S,P,O,H,W)=>{[n,a]=oo(p,n,a);let x=h.pxRound,N=I=>x(v(I,b,H,P)),$=I=>x(S(I,m,W,O)),q,T,J;b.ori==0?(q=co,J=Zs,T=da):(q=uo,J=Qs,T=pa);const G=b.dir*(b.ori==0?1:-1);let X=N(f[G==1?n:a]),j=X,k=[],Y=[];for(let I=G==1?n:a;I>=n&&I<=a;I+=G)if(p[I]!=null){let ye=f[I],le=N(ye);k.push(j=le),Y.push($(p[I]))}const D={stroke:e(k,Y,q,J,T,x),fill:null,clip:null,band:null,gaps:null,flags:Ys},B=D.stroke;let[z,te]=Er(s,o);if(h.fill!=null||z!=0){let I=D.fill=new Path2D(B),qe=h.fillTo(s,o,h.min,h.max,z),ye=$(qe);J(I,j,ye),J(I,X,ye)}if(!h.spanGaps){let I=[];I.push(...Mr(f,p,n,a,G,N,l)),D.gaps=I=h.gaps(s,o,n,a,I),D.clip=ao(I,b.ori,P,O,H,W)}return te!=0&&(D.band=te==2?[Ut(s,o,n,a,B,-1),Ut(s,o,n,a,B,1)]:Ut(s,o,n,a,B,te)),D})}function Zf(e){return Jf(Qf,e)}function Qf(e,t,l,s,o,n){const a=e.length;if(a<2)return null;const h=new Path2D;if(l(h,e[0],t[0]),a==2)s(h,e[1],t[1]);else{let f=Array(a),p=Array(a-1),b=Array(a-1),m=Array(a-1);for(let v=0;v<a-1;v++)b[v]=t[v+1]-t[v],m[v]=e[v+1]-e[v],p[v]=b[v]/m[v];f[0]=p[0];for(let v=1;v<a-1;v++)p[v]===0||p[v-1]===0||p[v-1]>0!=p[v]>0?f[v]=0:(f[v]=3*(m[v-1]+m[v])/((2*m[v]+m[v-1])/p[v-1]+(m[v]+2*m[v-1])/p[v]),isFinite(f[v])||(f[v]=0));f[a-1]=p[a-2];for(let v=0;v<a-1;v++)o(h,e[v]+m[v]/3,t[v]+f[v]*m[v]/3,e[v+1]-m[v]/3,t[v+1]-f[v+1]*m[v]/3,e[v+1],t[v+1])}return h}const nr=new Set;function fn(){for(let e of nr)e.syncRect(!0)}Js&&(gs(Tu,Ws,fn),gs(Du,Ws,fn,!0),gs(Gl,Ws,()=>{Ue.pxRatio=ne}));const Xf=va(),eh=ma();function hn(e,t,l,s){return(s?[e[0],e[1]].concat(e.slice(2)):[e[0]].concat(e.slice(1))).map((n,a)=>ar(n,a,t,l))}function th(e,t){return e.map((l,s)=>s==0?{}:Pe({},t,l))}function ar(e,t,l,s){return Pe({},t==0?l:s,e)}function ba(e,t,l){return t==null?Gs:[t,l]}const sh=ba;function lh(e,t,l){return t==null?Gs:Kl(t,l,xr,!0)}function wa(e,t,l,s){return t==null?Gs:ro(t,l,e.scales[s].log,!1)}const oh=wa;function ya(e,t,l,s){return t==null?Gs:_r(t,l,e.scales[s].log,!1)}const rh=ya;function ih(e,t,l,s,o){let n=Ye(Bi(e),Bi(t)),a=t-e,h=$t(o/s*a,l);do{let f=l[h],p=s*f/a;if(p>=o&&n+(f<5?Xt.get(f):0)<=17)return[f,p]}while(++h<l.length);return[0,0]}function dn(e){let t,l;return e=e.replace(/(\d+)px/,(s,o)=>(t=Me((l=+o)*ne))+"px"),[e,t,l]}function nh(e){e.show&&[e.font,e.labelFont].forEach(t=>{let l=pe(t[2]*ne,1);t[0]=t[0].replace(/[0-9.]+px/,l+"px"),t[1]=l})}function Ue(e,t,l){const s={mode:re(e.mode,1)},o=s.mode;function n(r,i,c,u){let d=i.valToPct(r);return u+c*(i.dir==-1?1-d:d)}function a(r,i,c,u){let d=i.valToPct(r);return u+c*(i.dir==-1?d:1-d)}function h(r,i,c,u){return i.ori==0?n(r,i,c,u):a(r,i,c,u)}s.valToPosH=n,s.valToPosV=a;let f=!1;s.status=0;const p=s.root=mt(du);if(e.id!=null&&(p.id=e.id),ot(p,e.class),e.title){let r=mt(gu,p);r.textContent=e.title}const b=St("canvas"),m=s.ctx=b.getContext("2d"),v=mt(vu,p);gs("click",v,r=>{r.target===P&&(ge!=Rs||xe!=Os)&&Fe.click(s,r)},!0);const S=s.under=mt(bu,v);v.appendChild(b);const P=s.over=mt(wu,v);e=Ks(e);const O=+re(e.pxAlign,1),H=cn(O);(e.plugins||[]).forEach(r=>{r.opts&&(e=r.opts(s,e)||e)});const W=e.ms||.001,x=s.series=o==1?hn(e.series||[],tn,nn,!1):th(e.series||[null],rn),N=s.axes=hn(e.axes||[],en,ln,!0),$=s.scales={},q=s.bands=e.bands||[];q.forEach(r=>{r.fill=ee(r.fill||null),r.dir=re(r.dir,-1)});const T=o==2?x[1].facets[0].scale:x[0].scale,J={axes:Ha,series:Ra},G=(e.drawOrder||["axes","series"]).map(r=>J[r]);function X(r){const i=r.distr==3?c=>Ft(c>0?c:r.clamp(s,c,r.min,r.max,r.key)):r.distr==4?c=>Bo(c,r.asinh):r.distr==100?c=>r.fwd(c):c=>c;return c=>{let u=i(c),{_min:d,_max:g}=r,w=g-d;return(u-d)/w}}function j(r){let i=$[r];if(i==null){let c=(e.scales||bl)[r]||bl;if(c.from!=null){j(c.from);let u=Pe({},$[c.from],c,{key:r});u.valToPct=X(u),$[r]=u}else{i=$[r]=Pe({},r==T?aa:Bf,c),i.key=r;let u=i.time,d=i.range,g=Zt(d);if((r!=T||o==2&&!u)&&(g&&(d[0]==null||d[1]==null)&&(d={min:d[0]==null?Fi:{mode:1,hard:d[0],soft:d[0]},max:d[1]==null?Fi:{mode:1,hard:d[1],soft:d[1]}},g=!1),!g&&no(d))){let w=d;d=(y,_,C)=>_==null?Gs:Kl(_,C,w)}i.range=ee(d||(u?sh:r==T?i.distr==3?oh:i.distr==4?rh:ba:i.distr==3?wa:i.distr==4?ya:lh)),i.auto=ee(g?!1:i.auto),i.clamp=ee(i.clamp||Wf),i._min=i._max=null,i.valToPct=X(i)}}}j("x"),j("y"),o==1&&x.forEach(r=>{j(r.scale)}),N.forEach(r=>{j(r.scale)});for(let r in e.scales)j(r);const k=$[T],Y=k.distr;let D,B;k.ori==0?(ot(p,pu),D=n,B=a):(ot(p,mu),D=a,B=n);const z={};for(let r in $){let i=$[r];(i.min!=null||i.max!=null)&&(z[r]={min:i.min,max:i.max},i.min=i.max=null)}const te=e.tzDate||(r=>new Date(Me(r/W))),I=e.fmtDate||kr,qe=W==1?mf(te):bf(te),ye=Zi(te,Ji(W==1?pf:vf,I)),le=Xi(te,Qi(yf,I)),ue=[],Z=s.legend=Pe({},Sf,e.legend),L=s.cursor=Pe({},Ef,{drag:{y:o==2}},e.cursor),Ae=Z.show,Be=L.show,_e=Z.markers;Z.idxs=ue,_e.width=ee(_e.width),_e.dash=ee(_e.dash),_e.stroke=ee(_e.stroke),_e.fill=ee(_e.fill);let ae,bt,Xe,Se=[],At=[],zt,ct=!1,jt={};if(Z.live){const r=x[1]?x[1].values:null;ct=r!=null,zt=ct?r(s,1,0):{_:0};for(let i in zt)jt[i]=wr}if(Ae)if(ae=St("table",ku,p),Xe=St("tbody",null,ae),Z.mount(s,ae),ct){bt=St("thead",null,ae,Xe);let r=St("tr",null,bt);St("th",null,r);for(var ys in zt)St("th",Pi,r).textContent=ys}else ot(ae,Pu),Z.live&&ot(ae,Cu);const _s={show:!0},Xs={show:!1};function Cl(r,i){if(i==0&&(ct||!Z.live||o==2))return Gs;let c=[],u=St("tr",Au,Xe,Xe.childNodes[i]);ot(u,r.class),r.show||ot(u,ps);let d=St("th",null,u);if(_e.show){let y=mt(Eu,d);if(i>0){let _=_e.width(s,i);_&&(y.style.border=_+"px "+_e.dash(s,i)+" "+_e.stroke(s,i)),y.style.background=_e.fill(s,i)}}let g=mt(Pi,d);r.label instanceof HTMLElement?g.appendChild(r.label):g.textContent=r.label,i>0&&(_e.show||(g.style.color=r.width>0?_e.stroke(s,i):_e.fill(s,i)),Ve("click",d,y=>{if(L._lock)return;rs(y);let _=x.indexOf(r);if((y.ctrlKey||y.metaKey)!=Z.isolate){let C=x.some((A,M)=>M>0&&M!=_&&A.show);x.forEach((A,M)=>{M>0&&Tt(M,C?M==_?_s:Xs:_s,!0,Ce.setSeries)})}else Tt(_,{show:!r.show},!0,Ce.setSeries)},!1),ks&&Ve(Ti,d,y=>{L._lock||(rs(y),Tt(x.indexOf(r),zs,!0,Ce.setSeries))},!1));for(var w in zt){let y=St("td",Mu,u);y.textContent="--",c.push(y)}return[u,c]}const es=new Map;function Ve(r,i,c,u=!0){const d=es.get(i)||{},g=L.bind[r](s,i,c,u);g&&(gs(r,i,d[r]=g),es.set(i,d))}function xs(r,i,c){const u=es.get(i)||{};for(let d in u)(r==null||d==r)&&(sr(d,i,u[d]),delete u[d]);r==null&&es.delete(i)}let Nt=0,ts=0,K=0,E=0,me=0,Ee=0,Ss=me,ss=Ee,Et=K,ls=E,et=0,ut=0,Je=0,wt=0;s.bbox={};let po=!1,Pl=!1,$s=!1,os=!1,Al=!1,ft=!1;function mo(r,i,c){(c||r!=s.width||i!=s.height)&&Lr(r,i),Ms(!1),$s=!0,Pl=!0,Ts()}function Lr(r,i){s.width=Nt=K=r,s.height=ts=E=i,me=Ee=0,Pa(),Aa();let c=s.bbox;et=c.left=hs(me*ne,.5),ut=c.top=hs(Ee*ne,.5),Je=c.width=hs(K*ne,.5),wt=c.height=hs(E*ne,.5)}const $a=3;function ka(){let r=!1,i=0;for(;!r;){i++;let c=za(i),u=Na(i);r=i==$a||c&&u,r||(Lr(s.width,s.height),Pl=!0)}}function Ca({width:r,height:i}){mo(r,i)}s.setSize=Ca;function Pa(){let r=!1,i=!1,c=!1,u=!1;N.forEach((d,g)=>{if(d.show&&d._show){let{side:w,_size:y}=d,_=w%2,C=d.label!=null?d.labelSize:0,A=y+C;A>0&&(_?(K-=A,w==3?(me+=A,u=!0):c=!0):(E-=A,w==0?(Ee+=A,r=!0):i=!0))}}),is[0]=r,is[1]=c,is[2]=i,is[3]=u,K-=Gt[1]+Gt[3],me+=Gt[3],E-=Gt[2]+Gt[0],Ee+=Gt[0]}function Aa(){let r=me+K,i=Ee+E,c=me,u=Ee;function d(g,w){switch(g){case 1:return r+=w,r-w;case 2:return i+=w,i-w;case 3:return c-=w,c+w;case 0:return u-=w,u+w}}N.forEach((g,w)=>{if(g.show&&g._show){let y=g.side;g._pos=d(y,g._size),g.label!=null&&(g._lpos=d(y,g.labelSize))}})}if(L.dataIdx==null){let r=L.hover,i=r.skip=new Set(r.skip??[]);i.add(void 0);let c=r.prox=ee(r.prox),u=r.bias??=0;L.dataIdx=(d,g,w,y)=>{if(g==0)return w;let _=w,C=c(d,g,w,y)??de,A=C>=0&&C<de,M=k.ori==0?K:E,V=L.left,ie=t[0],oe=t[g];if(i.has(oe[w])){_=null;let Q=null,F=null,R;if(u==0||u==-1)for(R=w;Q==null&&R-- >0;)i.has(oe[R])||(Q=R);if(u==0||u==1)for(R=w;F==null&&R++<oe.length;)i.has(oe[R])||(F=R);if(Q!=null||F!=null)if(A){let be=Q==null?-1/0:D(ie[Q],k,M,0),$e=F==null?1/0:D(ie[F],k,M,0),Ne=V-be,fe=$e-V;Ne<=fe?Ne<=C&&(_=Q):fe<=C&&(_=F)}else _=F==null?Q:Q==null?F:w-Q<=F-w?Q:F}else A&&Te(V-D(ie[w],k,M,0))>C&&(_=null);return _}}const rs=r=>{L.event=r};L.idxs=ue,L._lock=!1;let We=L.points;We.show=ee(We.show),We.size=ee(We.size),We.stroke=ee(We.stroke),We.width=ee(We.width),We.fill=ee(We.fill);const Mt=s.focus=Pe({},e.focus||{alpha:.3},L.focus),ks=Mt.prox>=0,Cs=ks&&We.one;let ht=[],Ps=[],As=[];function Rr(r,i){let c=We.show(s,i);if(c instanceof HTMLElement)return ot(c,$u),ot(c,r.class),Ot(c,-10,-10,K,E),P.insertBefore(c,ht[i]),c}function Or(r,i){if(o==1||i>0){let c=o==1&&$[r.scale].time,u=r.value;r.value=c?Gi(u)?Xi(te,Qi(u,I)):u||le:u||Hf,r.label=r.label||(c?Tf:Mf)}if(Cs||i>0){r.width=r.width==null?1:r.width,r.paths=r.paths||Xf||Wu,r.fillTo=ee(r.fillTo||Vf),r.pxAlign=+re(r.pxAlign,O),r.pxRound=cn(r.pxAlign),r.stroke=ee(r.stroke||null),r.fill=ee(r.fill||null),r._stroke=r._fill=r._paths=r._focus=null;let c=Ff(Ye(1,r.width),1),u=r.points=Pe({},{size:c,width:Ye(1,c*.2),stroke:r.stroke,space:c*2,paths:eh,_stroke:null,_fill:null},r.points);u.show=ee(u.show),u.filter=ee(u.filter),u.fill=ee(u.fill),u.stroke=ee(u.stroke),u.paths=ee(u.paths),u.pxAlign=r.pxAlign}if(Ae){let c=Cl(r,i);Se.splice(i,0,c[0]),At.splice(i,0,c[1]),Z.values.push(null)}if(Be){ue.splice(i,0,null);let c=null;Cs?i==0&&(c=Rr(r,i)):i>0&&(c=Rr(r,i)),ht.splice(i,0,c),Ps.splice(i,0,0),As.splice(i,0,0)}ze("addSeries",i)}function Ea(r,i){i=i??x.length,r=o==1?ar(r,i,tn,nn):ar(r,i,{},rn),x.splice(i,0,r),Or(x[i],i)}s.addSeries=Ea;function Ma(r){if(x.splice(r,1),Ae){Z.values.splice(r,1),At.splice(r,1);let i=Se.splice(r,1)[0];xs(null,i.firstChild),i.remove()}Be&&(ue.splice(r,1),ht.splice(r,1)[0].remove(),Ps.splice(r,1),As.splice(r,1)),ze("delSeries",r)}s.delSeries=Ma;const is=[!1,!1,!1,!1];function Ta(r,i){if(r._show=r.show,r.show){let c=r.side%2,u=$[r.scale];u==null&&(r.scale=c?x[1].scale:T,u=$[r.scale]);let d=u.time;r.size=ee(r.size),r.space=ee(r.space),r.rotate=ee(r.rotate),Zt(r.incrs)&&r.incrs.forEach(w=>{!Xt.has(w)&&Xt.set(w,Bn(w))}),r.incrs=ee(r.incrs||(u.distr==2?ff:d?W==1?df:gf:ds)),r.splits=ee(r.splits||(d&&u.distr==1?qe:u.distr==3?or:u.distr==4?Rf:Lf)),r.stroke=ee(r.stroke),r.grid.stroke=ee(r.grid.stroke),r.ticks.stroke=ee(r.ticks.stroke),r.border.stroke=ee(r.border.stroke);let g=r.values;r.values=Zt(g)&&!Zt(g[0])?ee(g):d?Zt(g)?Zi(te,Ji(g,I)):Gi(g)?wf(te,g):g||ye:g||Df,r.filter=ee(r.filter||(u.distr>=3&&u.log==10?zf:u.distr==3&&u.log==2?Nf:Un)),r.font=dn(r.font),r.labelFont=dn(r.labelFont),r._size=r.size(s,null,i,0),r._space=r._rotate=r._incrs=r._found=r._splits=r._values=null,r._size>0&&(is[i]=!0,r._el=mt(yu,v))}}function el(r,i,c,u){let[d,g,w,y]=c,_=i%2,C=0;return _==0&&(y||g)&&(C=i==0&&!d||i==2&&!w?Me(en.size/3):0),_==1&&(d||w)&&(C=i==1&&!g||i==3&&!y?Me(ln.size/2):0),C}const Ir=s.padding=(e.padding||[el,el,el,el]).map(r=>ee(re(r,el))),Gt=s._padding=Ir.map((r,i)=>r(s,i,is,0));let He,Le=null,Re=null;const El=o==1?x[0].idxs:null;let yt=null,tl=!1;function zr(r,i){if(t=r??[],s.data=s._data=t,o==2){He=0;for(let c=1;c<x.length;c++)He+=t[c][0].length}else{t.length==0&&(s.data=s._data=t=[[]]),yt=t[0],He=yt.length;let c=t;if(Y==2){c=t.slice();let u=c[0]=Array(He);for(let d=0;d<He;d++)u[d]=d}s._data=t=c}if(Ms(!0),ze("setData"),Y==2&&($s=!0),i!==!1){let c=k;c.auto(s,tl)?go():Yt(T,c.min,c.max),os=os||L.left>=0,ft=!0,Ts()}}s.setData=zr;function go(){tl=!0;let r,i;o==1&&(He>0?(Le=El[0]=0,Re=El[1]=He-1,r=t[0][Le],i=t[0][Re],Y==2?(r=Le,i=Re):r==i&&(Y==3?[r,i]=ro(r,r,k.log,!1):Y==4?[r,i]=_r(r,r,k.log,!1):k.time?i=r+Me(86400/W):[r,i]=Kl(r,i,xr,!0))):(Le=El[0]=r=null,Re=El[1]=i=null)),Yt(T,r,i)}let Ml,Es,vo,bo,wo,yo,_o,xo,So,Ze;function Nr(r,i,c,u,d,g){r??=Ei,c??=$r,u??="butt",d??=Ei,g??="round",r!=Ml&&(m.strokeStyle=Ml=r),d!=Es&&(m.fillStyle=Es=d),i!=vo&&(m.lineWidth=vo=i),g!=wo&&(m.lineJoin=wo=g),u!=yo&&(m.lineCap=yo=u),c!=bo&&m.setLineDash(bo=c)}function Hr(r,i,c,u){i!=Es&&(m.fillStyle=Es=i),r!=_o&&(m.font=_o=r),c!=xo&&(m.textAlign=xo=c),u!=So&&(m.textBaseline=So=u)}function $o(r,i,c,u,d=0){if(u.length>0&&r.auto(s,tl)&&(i==null||i.min==null)){let g=re(Le,0),w=re(Re,u.length-1),y=c.min==null?Iu(u,g,w,d,r.distr==3):[c.min,c.max];r.min=kt(r.min,c.min=y[0]),r.max=Ye(r.max,c.max=y[1])}}const Fr={min:null,max:null};function Da(){for(let u in $){let d=$[u];z[u]==null&&(d.min==null||z[T]!=null&&d.auto(s,tl))&&(z[u]=Fr)}for(let u in $){let d=$[u];z[u]==null&&d.from!=null&&z[d.from]!=null&&(z[u]=Fr)}z[T]!=null&&Ms(!0);let r={};for(let u in z){let d=z[u];if(d!=null){let g=r[u]=Ks($[u],ju);if(d.min!=null)Pe(g,d);else if(u!=T||o==2)if(He==0&&g.from==null){let w=g.range(s,null,null,u);g.min=w[0],g.max=w[1]}else g.min=de,g.max=-de}}if(He>0){x.forEach((u,d)=>{if(o==1){let g=u.scale,w=z[g];if(w==null)return;let y=r[g];if(d==0){let _=y.range(s,y.min,y.max,g);y.min=_[0],y.max=_[1],Le=$t(y.min,t[0]),Re=$t(y.max,t[0]),Re-Le>1&&(t[0][Le]<y.min&&Le++,t[0][Re]>y.max&&Re--),u.min=yt[Le],u.max=yt[Re]}else u.show&&u.auto&&$o(y,w,u,t[d],u.sorted);u.idxs[0]=Le,u.idxs[1]=Re}else if(d>0&&u.show&&u.auto){let[g,w]=u.facets,y=g.scale,_=w.scale,[C,A]=t[d],M=r[y],V=r[_];M!=null&&$o(M,z[y],g,C,g.sorted),V!=null&&$o(V,z[_],w,A,w.sorted),u.min=w.min,u.max=w.max}});for(let u in r){let d=r[u],g=z[u];if(d.from==null&&(g==null||g.min==null)){let w=d.range(s,d.min==de?null:d.min,d.max==-de?null:d.max,u);d.min=w[0],d.max=w[1]}}}for(let u in r){let d=r[u];if(d.from!=null){let g=r[d.from];if(g.min==null)d.min=d.max=null;else{let w=d.range(s,g.min,g.max,u);d.min=w[0],d.max=w[1]}}}let i={},c=!1;for(let u in r){let d=r[u],g=$[u];if(g.min!=d.min||g.max!=d.max){g.min=d.min,g.max=d.max;let w=g.distr;g._min=w==3?Ft(g.min):w==4?Bo(g.min,g.asinh):w==100?g.fwd(g.min):g.min,g._max=w==3?Ft(g.max):w==4?Bo(g.max,g.asinh):w==100?g.fwd(g.max):g.max,i[u]=c=!0}}if(c){x.forEach((u,d)=>{o==2?d>0&&i.y&&(u._paths=null):i[u.scale]&&(u._paths=null)});for(let u in i)$s=!0,ze("setScale",u);Be&&L.left>=0&&(os=ft=!0)}for(let u in z)z[u]=null}function La(r){let i=lr(Le-1,0,He-1),c=lr(Re+1,0,He-1);for(;r[i]==null&&i>0;)i--;for(;r[c]==null&&c<He-1;)c++;return[i,c]}function Ra(){if(He>0){let r=x.some(i=>i._focus)&&Ze!=Mt.alpha;r&&(m.globalAlpha=Ze=Mt.alpha),x.forEach((i,c)=>{if(c>0&&i.show&&(Ur(c,!1),Ur(c,!0),i._paths==null)){let u=Ze;Ze!=i.alpha&&(m.globalAlpha=Ze=i.alpha);let d=o==2?[0,t[c][0].length-1]:La(t[c]);i._paths=i.paths(s,c,d[0],d[1]),Ze!=u&&(m.globalAlpha=Ze=u)}}),x.forEach((i,c)=>{if(c>0&&i.show){let u=Ze;Ze!=i.alpha&&(m.globalAlpha=Ze=i.alpha),i._paths!=null&&Wr(c,!1);{let d=i._paths!=null?i._paths.gaps:null,g=i.points.show(s,c,Le,Re,d),w=i.points.filter(s,c,g,d);(g||w)&&(i.points._paths=i.points.paths(s,c,Le,Re,w),Wr(c,!0))}Ze!=u&&(m.globalAlpha=Ze=u),ze("drawSeries",c)}}),r&&(m.globalAlpha=Ze=1)}}function Ur(r,i){let c=i?x[r].points:x[r];c._stroke=c.stroke(s,r),c._fill=c.fill(s,r)}function Wr(r,i){let c=i?x[r].points:x[r],{stroke:u,fill:d,clip:g,flags:w,_stroke:y=c._stroke,_fill:_=c._fill,_width:C=c.width}=c._paths;C=pe(C*ne,3);let A=null,M=C%2/2;i&&_==null&&(_=C>0?"#fff":y);let V=c.pxAlign==1&&M>0;if(V&&m.translate(M,M),!i){let ie=et-C/2,oe=ut-C/2,Q=Je+C,F=wt+C;A=new Path2D,A.rect(ie,oe,Q,F)}i?ko(y,C,c.dash,c.cap,_,u,d,w,g):Oa(r,y,C,c.dash,c.cap,_,u,d,w,A,g),V&&m.translate(-M,-M)}function Oa(r,i,c,u,d,g,w,y,_,C,A){let M=!1;_!=0&&q.forEach((V,ie)=>{if(V.series[0]==r){let oe=x[V.series[1]],Q=t[V.series[1]],F=(oe._paths||bl).band;Zt(F)&&(F=V.dir==1?F[0]:F[1]);let R,be=null;oe.show&&F&&Nu(Q,Le,Re)?(be=V.fill(s,ie)||g,R=oe._paths.clip):F=null,ko(i,c,u,d,be,w,y,_,C,A,R,F),M=!0}}),M||ko(i,c,u,d,g,w,y,_,C,A)}const Br=Ys|ir;function ko(r,i,c,u,d,g,w,y,_,C,A,M){Nr(r,i,c,u,d),(_||C||M)&&(m.save(),_&&m.clip(_),C&&m.clip(C)),M?(y&Br)==Br?(m.clip(M),A&&m.clip(A),Dl(d,w),Tl(r,g,i)):y&ir?(Dl(d,w),m.clip(M),Tl(r,g,i)):y&Ys&&(m.save(),m.clip(M),A&&m.clip(A),Dl(d,w),m.restore(),Tl(r,g,i)):(Dl(d,w),Tl(r,g,i)),(_||C||M)&&m.restore()}function Tl(r,i,c){c>0&&(i instanceof Map?i.forEach((u,d)=>{m.strokeStyle=Ml=d,m.stroke(u)}):i!=null&&r&&m.stroke(i))}function Dl(r,i){i instanceof Map?i.forEach((c,u)=>{m.fillStyle=Es=u,m.fill(c)}):i!=null&&r&&m.fill(i)}function Ia(r,i,c,u){let d=N[r],g;if(u<=0)g=[0,0];else{let w=d._space=d.space(s,r,i,c,u),y=d._incrs=d.incrs(s,r,i,c,u,w);g=ih(i,c,y,u,w)}return d._found=g}function Co(r,i,c,u,d,g,w,y,_,C){let A=w%2/2;O==1&&m.translate(A,A),Nr(y,w,_,C,y),m.beginPath();let M,V,ie,oe,Q=d+(u==0||u==3?-g:g);c==0?(V=d,oe=Q):(M=d,ie=Q);for(let F=0;F<r.length;F++)i[F]!=null&&(c==0?M=ie=r[F]:V=oe=r[F],m.moveTo(M,V),m.lineTo(ie,oe));m.stroke(),O==1&&m.translate(-A,-A)}function za(r){let i=!0;return N.forEach((c,u)=>{if(!c.show)return;let d=$[c.scale];if(d.min==null){c._show&&(i=!1,c._show=!1,Ms(!1));return}else c._show||(i=!1,c._show=!0,Ms(!1));let g=c.side,w=g%2,{min:y,max:_}=d,[C,A]=Ia(u,y,_,w==0?K:E);if(A==0)return;let M=d.distr==2,V=c._splits=c.splits(s,u,y,_,C,A,M),ie=d.distr==2?V.map(R=>yt[R]):V,oe=d.distr==2?yt[V[1]]-yt[V[0]]:C,Q=c._values=c.values(s,c.filter(s,ie,u,A,oe),u,A,oe);c._rotate=g==2?c.rotate(s,Q,u,A):0;let F=c._size;c._size=gt(c.size(s,Q,u,r)),F!=null&&c._size!=F&&(i=!1)}),i}function Na(r){let i=!0;return Ir.forEach((c,u)=>{let d=c(s,u,is,r);d!=Gt[u]&&(i=!1),Gt[u]=d}),i}function Ha(){for(let r=0;r<N.length;r++){let i=N[r];if(!i.show||!i._show)continue;let c=i.side,u=c%2,d,g,w=i.stroke(s,r),y=c==0||c==3?-1:1,[_,C]=i._found;if(i.label!=null){let Ge=i.labelGap*y,lt=Me((i._lpos+Ge)*ne);Hr(i.labelFont[0],w,"center",c==2?cl:Ai),m.save(),u==1?(d=g=0,m.translate(lt,Me(ut+wt/2)),m.rotate((c==3?-Wl:Wl)/2)):(d=Me(et+Je/2),g=lt);let cs=Hn(i.label)?i.label(s,r,_,C):i.label;m.fillText(cs,d,g),m.restore()}if(C==0)continue;let A=$[i.scale],M=u==0?Je:wt,V=u==0?et:ut,ie=i._splits,oe=A.distr==2?ie.map(Ge=>yt[Ge]):ie,Q=A.distr==2?yt[ie[1]]-yt[ie[0]]:_,F=i.ticks,R=i.border,be=F.show?F.size:0,$e=Me(be*ne),Ne=Me((i.alignTo==2?i._size-be-i.gap:i.gap)*ne),fe=i._rotate*-Wl/180,ke=H(i._pos*ne),tt=($e+Ne)*y,je=ke+tt;g=u==0?je:0,d=u==1?je:0;let dt=i.font[0],_t=i.align==1?Hs:i.align==2?Fo:fe>0?Hs:fe<0?Fo:u==0?"center":c==3?Fo:Hs,Lt=fe||u==1?"middle":c==2?cl:Ai;Hr(dt,w,_t,Lt);let st=i.font[1]*i.lineGap,pt=ie.map(Ge=>H(h(Ge,A,M,V))),xt=i._values;for(let Ge=0;Ge<xt.length;Ge++){let lt=xt[Ge];if(lt!=null){u==0?d=pt[Ge]:g=pt[Ge],lt=""+lt;let cs=lt.indexOf(`
`)==-1?[lt]:lt.split(/\n/gm);for(let Ke=0;Ke<cs.length;Ke++){let ai=cs[Ke];fe?(m.save(),m.translate(d,g+Ke*st),m.rotate(fe),m.fillText(ai,0,0),m.restore()):m.fillText(ai,d,g+Ke*st)}}}F.show&&Co(pt,F.filter(s,oe,r,C,Q),u,c,ke,$e,pe(F.width*ne,3),F.stroke(s,r),F.dash,F.cap);let Rt=i.grid;Rt.show&&Co(pt,Rt.filter(s,oe,r,C,Q),u,u==0?2:1,u==0?ut:et,u==0?wt:Je,pe(Rt.width*ne,3),Rt.stroke(s,r),Rt.dash,Rt.cap),R.show&&Co([ke],[1],u==0?1:0,u==0?1:2,u==1?ut:et,u==1?wt:Je,pe(R.width*ne,3),R.stroke(s,r),R.dash,R.cap)}ze("drawAxes")}function Ms(r){x.forEach((i,c)=>{c>0&&(i._paths=null,r&&(o==1?(i.min=null,i.max=null):i.facets.forEach(u=>{u.min=null,u.max=null})))})}let Ll=!1,Po=!1,sl=[];function Fa(){Po=!1;for(let r=0;r<sl.length;r++)ze(...sl[r]);sl.length=0}function Ts(){Ll||(Qu(Vr),Ll=!0)}function Ua(r,i=!1){Ll=!0,Po=i,r(s),Vr(),i&&sl.length>0&&queueMicrotask(Fa)}s.batch=Ua;function Vr(){if(po&&(Da(),po=!1),$s&&(ka(),$s=!1),Pl){if(we(S,Hs,me),we(S,cl,Ee),we(S,fl,K),we(S,hl,E),we(P,Hs,me),we(P,cl,Ee),we(P,fl,K),we(P,hl,E),we(v,fl,Nt),we(v,hl,ts),b.width=Me(Nt*ne),b.height=Me(ts*ne),N.forEach(({_el:r,_show:i,_size:c,_pos:u,side:d})=>{if(r!=null)if(i){let g=d===3||d===0?c:0,w=d%2==1;we(r,w?"left":"top",u-g),we(r,w?"width":"height",c),we(r,w?"top":"left",w?Ee:me),we(r,w?"height":"width",w?E:K),tr(r,ps)}else ot(r,ps)}),Ml=Es=vo=wo=yo=_o=xo=So=bo=null,Ze=1,rl(!0),me!=Ss||Ee!=ss||K!=Et||E!=ls){Ms(!1);let r=K/Et,i=E/ls;if(Be&&!os&&L.left>=0){L.left*=r,L.top*=i,Ds&&Ot(Ds,Me(L.left),0,K,E),Ls&&Ot(Ls,0,Me(L.top),K,E);for(let c=0;c<ht.length;c++){let u=ht[c];u!=null&&(Ps[c]*=r,As[c]*=i,Ot(u,gt(Ps[c]),gt(As[c]),K,E))}}if(ve.show&&!Al&&ve.left>=0&&ve.width>0){ve.left*=r,ve.width*=r,ve.top*=i,ve.height*=i;for(let c in Lo)we(Is,c,ve[c])}Ss=me,ss=Ee,Et=K,ls=E}ze("setSize"),Pl=!1}Nt>0&&ts>0&&(m.clearRect(0,0,b.width,b.height),ze("drawClear"),G.forEach(r=>r()),ze("draw")),ve.show&&Al&&(Rl(ve),Al=!1),Be&&os&&(as(null,!0,!1),os=!1),Z.show&&Z.live&&ft&&(To(),ft=!1),f||(f=!0,s.status=1,ze("ready")),tl=!1,Ll=!1}s.redraw=(r,i)=>{$s=i||!1,r!==!1?Yt(T,k.min,k.max):Ts()};function Ao(r,i){let c=$[r];if(c.from==null){if(He==0){let u=c.range(s,i.min,i.max,r);i.min=u[0],i.max=u[1]}if(i.min>i.max){let u=i.min;i.min=i.max,i.max=u}if(He>1&&i.min!=null&&i.max!=null&&i.max-i.min<1e-16)return;r==T&&c.distr==2&&He>0&&(i.min=$t(i.min,t[0]),i.max=$t(i.max,t[0]),i.min==i.max&&i.max++),z[r]=i,po=!0,Ts()}}s.setScale=Ao;let Eo,Mo,Ds,Ls,jr,Gr,Rs,Os,Kr,Yr,ge,xe,Kt=!1;const Fe=L.drag;let Oe=Fe.x,Ie=Fe.y;Be&&(L.x&&(Eo=mt(xu,P)),L.y&&(Mo=mt(Su,P)),k.ori==0?(Ds=Eo,Ls=Mo):(Ds=Mo,Ls=Eo),ge=L.left,xe=L.top);const ve=s.select=Pe({show:!0,over:!0,left:0,width:0,top:0,height:0},e.select),Is=ve.show?mt(_u,ve.over?P:S):null;function Rl(r,i){if(ve.show){for(let c in r)ve[c]=r[c],c in Lo&&we(Is,c,r[c]);i!==!1&&ze("setSelect")}}s.setSelect=Rl;function Wa(r){if(x[r].show)Ae&&tr(Se[r],ps);else if(Ae&&ot(Se[r],ps),Be){let c=Cs?ht[0]:ht[r];c!=null&&Ot(c,-10,-10,K,E)}}function Yt(r,i,c){Ao(r,{min:i,max:c})}function Tt(r,i,c,u){i.focus!=null&&Ka(r),i.show!=null&&x.forEach((d,g)=>{g>0&&(r==g||r==null)&&(d.show=i.show,Wa(g),o==2?(Yt(d.facets[0].scale,null,null),Yt(d.facets[1].scale,null,null)):Yt(d.scale,null,null),Ts())}),c!==!1&&ze("setSeries",r,i),u&&il("setSeries",s,r,i)}s.setSeries=Tt;function Ba(r,i){Pe(q[r],i)}function Va(r,i){r.fill=ee(r.fill||null),r.dir=re(r.dir,-1),i=i??q.length,q.splice(i,0,r)}function ja(r){r==null?q.length=0:q.splice(r,1)}s.addBand=Va,s.setBand=Ba,s.delBand=ja;function Ga(r,i){x[r].alpha=i,Be&&ht[r]!=null&&(ht[r].style.opacity=i),Ae&&Se[r]&&(Se[r].style.opacity=i)}let Ht,qt,ns;const zs={focus:!0};function Ka(r){if(r!=ns){let i=r==null,c=Mt.alpha!=1;x.forEach((u,d)=>{if(o==1||d>0){let g=i||d==0||d==r;u._focus=i?null:g,c&&Ga(d,g?1:Mt.alpha)}}),ns=r,c&&Ts()}}Ae&&ks&&Ve(Di,ae,r=>{L._lock||(rs(r),ns!=null&&Tt(null,zs,!0,Ce.setSeries))});function Dt(r,i,c){let u=$[i];c&&(r=r/ne-(u.ori==1?Ee:me));let d=K;u.ori==1&&(d=E,r=d-r),u.dir==-1&&(r=d-r);let g=u._min,w=u._max,y=r/d,_=g+(w-g)*y,C=u.distr;return C==3?js(10,_):C==4?Fu(_,u.asinh):C==100?u.bwd(_):_}function Ya(r,i){let c=Dt(r,T,i);return $t(c,t[0],Le,Re)}s.valToIdx=r=>$t(r,t[0]),s.posToIdx=Ya,s.posToVal=Dt,s.valToPos=(r,i,c)=>$[i].ori==0?n(r,$[i],c?Je:K,c?et:0):a(r,$[i],c?wt:E,c?ut:0),s.setCursor=(r,i,c)=>{ge=r.left,xe=r.top,as(null,i,c)};function qr(r,i){we(Is,Hs,ve.left=r),we(Is,fl,ve.width=i)}function Jr(r,i){we(Is,cl,ve.top=r),we(Is,hl,ve.height=i)}let ll=k.ori==0?qr:Jr,ol=k.ori==1?qr:Jr;function qa(){if(Ae&&Z.live)for(let r=o==2?1:0;r<x.length;r++){if(r==0&&ct)continue;let i=Z.values[r],c=0;for(let u in i)At[r][c++].firstChild.nodeValue=i[u]}}function To(r,i){if(r!=null&&(r.idxs?r.idxs.forEach((c,u)=>{ue[u]=c}):Vu(r.idx)||ue.fill(r.idx),Z.idx=ue[0]),Ae&&Z.live){for(let c=0;c<x.length;c++)(c>0||o==1&&!ct)&&Ja(c,ue[c]);qa()}ft=!1,i!==!1&&ze("setLegend")}s.setLegend=To;function Ja(r,i){let c=x[r],u=r==0&&Y==2?yt:t[r],d;ct?d=c.values(s,r,i)??jt:(d=c.value(s,i==null?null:u[i],r,i),d=d==null?jt:{_:d}),Z.values[r]=d}function as(r,i,c){Kr=ge,Yr=xe,[ge,xe]=L.move(s,ge,xe),L.left=ge,L.top=xe,Be&&(Ds&&Ot(Ds,Me(ge),0,K,E),Ls&&Ot(Ls,0,Me(xe),K,E));let u,d=Le>Re;Ht=de,qt=null;let g=k.ori==0?K:E,w=k.ori==1?K:E;if(ge<0||He==0||d){u=L.idx=null;for(let y=0;y<x.length;y++){let _=ht[y];_!=null&&Ot(_,-10,-10,K,E)}ks&&Tt(null,zs,!0,r==null&&Ce.setSeries),Z.live&&(ue.fill(u),ft=!0)}else{let y,_,C;o==1&&(y=k.ori==0?ge:xe,_=Dt(y,T),u=L.idx=$t(_,t[0],Le,Re),C=D(t[0][u],k,g,0));let A=-10,M=-10,V=0,ie=0,oe=!0,Q="",F="";for(let R=o==2?1:0;R<x.length;R++){let be=x[R],$e=ue[R],Ne=$e==null?null:o==1?t[R][$e]:t[R][1][$e],fe=L.dataIdx(s,R,u,_),ke=fe==null?null:o==1?t[R][fe]:t[R][1][fe];if(ft=ft||ke!=Ne||fe!=$e,ue[R]=fe,R>0&&be.show){let tt=fe==null?-10:fe==u?C:D(o==1?t[0][fe]:t[R][0][fe],k,g,0),je=ke==null?-10:B(ke,o==1?$[be.scale]:$[be.facets[1].scale],w,0);if(ks&&ke!=null){let dt=k.ori==1?ge:xe,_t=Te(Mt.dist(s,R,fe,je,dt));if(_t<Ht){let Lt=Mt.bias;if(Lt!=0){let st=Dt(dt,be.scale),pt=ke>=0?1:-1,xt=st>=0?1:-1;xt==pt&&(xt==1?Lt==1?ke>=st:ke<=st:Lt==1?ke<=st:ke>=st)&&(Ht=_t,qt=R)}else Ht=_t,qt=R}}if(ft||Cs){let dt,_t;k.ori==0?(dt=tt,_t=je):(dt=je,_t=tt);let Lt,st,pt,xt,Rt,Ge,lt=!0,cs=We.bbox;if(cs!=null){lt=!1;let Ke=cs(s,R);pt=Ke.left,xt=Ke.top,Lt=Ke.width,st=Ke.height}else pt=dt,xt=_t,Lt=st=We.size(s,R);if(Ge=We.fill(s,R),Rt=We.stroke(s,R),Cs)R==qt&&Ht<=Mt.prox&&(A=pt,M=xt,V=Lt,ie=st,oe=lt,Q=Ge,F=Rt);else{let Ke=ht[R];Ke!=null&&(Ps[R]=pt,As[R]=xt,Hi(Ke,Lt,st,lt),zi(Ke,Ge,Rt),Ot(Ke,gt(pt),gt(xt),K,E))}}}}if(Cs){let R=Mt.prox,be=ns==null?Ht<=R:Ht>R||qt!=ns;if(ft||be){let $e=ht[0];$e!=null&&(Ps[0]=A,As[0]=M,Hi($e,V,ie,oe),zi($e,Q,F),Ot($e,gt(A),gt(M),K,E))}}}if(ve.show&&Kt)if(r!=null){let[y,_]=Ce.scales,[C,A]=Ce.match,[M,V]=r.cursor.sync.scales,ie=r.cursor.drag;if(Oe=ie._x,Ie=ie._y,Oe||Ie){let{left:oe,top:Q,width:F,height:R}=r.select,be=r.scales[M].ori,$e=r.posToVal,Ne,fe,ke,tt,je,dt=y!=null&&C(y,M),_t=_!=null&&A(_,V);dt&&Oe?(be==0?(Ne=oe,fe=F):(Ne=Q,fe=R),ke=$[y],tt=D($e(Ne,M),ke,g,0),je=D($e(Ne+fe,M),ke,g,0),ll(kt(tt,je),Te(je-tt))):ll(0,g),_t&&Ie?(be==1?(Ne=oe,fe=F):(Ne=Q,fe=R),ke=$[_],tt=B($e(Ne,V),ke,w,0),je=B($e(Ne+fe,V),ke,w,0),ol(kt(tt,je),Te(je-tt))):ol(0,w)}else Ro()}else{let y=Te(Kr-jr),_=Te(Yr-Gr);if(k.ori==1){let V=y;y=_,_=V}Oe=Fe.x&&y>=Fe.dist,Ie=Fe.y&&_>=Fe.dist;let C=Fe.uni;C!=null?Oe&&Ie&&(Oe=y>=C,Ie=_>=C,!Oe&&!Ie&&(_>y?Ie=!0:Oe=!0)):Fe.x&&Fe.y&&(Oe||Ie)&&(Oe=Ie=!0);let A,M;Oe&&(k.ori==0?(A=Rs,M=ge):(A=Os,M=xe),ll(kt(A,M),Te(M-A)),Ie||ol(0,w)),Ie&&(k.ori==1?(A=Rs,M=ge):(A=Os,M=xe),ol(kt(A,M),Te(M-A)),Oe||ll(0,g)),!Oe&&!Ie&&(ll(0,0),ol(0,0))}if(Fe._x=Oe,Fe._y=Ie,r==null){if(c){if(ni!=null){let[y,_]=Ce.scales;Ce.values[0]=y!=null?Dt(k.ori==0?ge:xe,y):null,Ce.values[1]=_!=null?Dt(k.ori==1?ge:xe,_):null}il(Uo,s,ge,xe,K,E,u)}if(ks){let y=c&&Ce.setSeries,_=Mt.prox;ns==null?Ht<=_&&Tt(qt,zs,!0,y):Ht>_?Tt(null,zs,!0,y):qt!=ns&&Tt(qt,zs,!0,y)}}ft&&(Z.idx=u,To()),i!==!1&&ze("setCursor")}let Jt=null;Object.defineProperty(s,"rect",{get(){return Jt==null&&rl(!1),Jt}});function rl(r=!1){r?Jt=null:(Jt=P.getBoundingClientRect(),ze("syncRect",Jt))}function Zr(r,i,c,u,d,g,w){L._lock||Kt&&r!=null&&r.movementX==0&&r.movementY==0||(Do(r,i,c,u,d,g,w,!1,r!=null),r!=null?as(null,!0,!0):as(i,!0,!1))}function Do(r,i,c,u,d,g,w,y,_){if(Jt==null&&rl(!1),rs(r),r!=null)c=r.clientX-Jt.left,u=r.clientY-Jt.top;else{if(c<0||u<0){ge=-10,xe=-10;return}let[C,A]=Ce.scales,M=i.cursor.sync,[V,ie]=M.values,[oe,Q]=M.scales,[F,R]=Ce.match,be=i.axes[0].side%2==1,$e=k.ori==0?K:E,Ne=k.ori==1?K:E,fe=be?g:d,ke=be?d:g,tt=be?u:c,je=be?c:u;if(oe!=null?c=F(C,oe)?h(V,$[C],$e,0):-10:c=$e*(tt/fe),Q!=null?u=R(A,Q)?h(ie,$[A],Ne,0):-10:u=Ne*(je/ke),k.ori==1){let dt=c;c=u,u=dt}}_&&(i==null||i.cursor.event.type==Uo)&&((c<=1||c>=K-1)&&(c=hs(c,K)),(u<=1||u>=E-1)&&(u=hs(u,E))),y?(jr=c,Gr=u,[Rs,Os]=L.move(s,c,u)):(ge=c,xe=u)}const Lo={width:0,height:0,left:0,top:0};function Ro(){Rl(Lo,!1)}let Qr,Xr,ei,ti;function si(r,i,c,u,d,g,w){Kt=!0,Oe=Ie=Fe._x=Fe._y=!1,Do(r,i,c,u,d,g,w,!0,!1),r!=null&&(Ve(Wo,Xo,li,!1),il(Mi,s,Rs,Os,K,E,null));let{left:y,top:_,width:C,height:A}=ve;Qr=y,Xr=_,ei=C,ti=A}function li(r,i,c,u,d,g,w){Kt=Fe._x=Fe._y=!1,Do(r,i,c,u,d,g,w,!1,!0);let{left:y,top:_,width:C,height:A}=ve,M=C>0||A>0,V=Qr!=y||Xr!=_||ei!=C||ti!=A;if(M&&V&&Rl(ve),Fe.setScale&&M&&V){let ie=y,oe=C,Q=_,F=A;if(k.ori==1&&(ie=_,oe=A,Q=y,F=C),Oe&&Yt(T,Dt(ie,T),Dt(ie+oe,T)),Ie)for(let R in $){let be=$[R];R!=T&&be.from==null&&be.min!=de&&Yt(R,Dt(Q+F,R),Dt(Q,R))}Ro()}else L.lock&&(L._lock=!L._lock,as(i,!0,r!=null));r!=null&&(xs(Wo,Xo),il(Wo,s,ge,xe,K,E,null))}function Za(r,i,c,u,d,g,w){if(L._lock)return;rs(r);let y=Kt;if(Kt){let _=!0,C=!0,A=10,M,V;k.ori==0?(M=Oe,V=Ie):(M=Ie,V=Oe),M&&V&&(_=ge<=A||ge>=K-A,C=xe<=A||xe>=E-A),M&&_&&(ge=ge<Rs?0:K),V&&C&&(xe=xe<Os?0:E),as(null,!0,!0),Kt=!1}ge=-10,xe=-10,ue.fill(null),as(null,!0,!0),y&&(Kt=y)}function oi(r,i,c,u,d,g,w){L._lock||(rs(r),go(),Ro(),r!=null&&il(Li,s,ge,xe,K,E,null))}function ri(){N.forEach(nh),mo(s.width,s.height,!0)}gs(Gl,Ws,ri);const Ns={};Ns.mousedown=si,Ns.mousemove=Zr,Ns.mouseup=li,Ns.dblclick=oi,Ns.setSeries=(r,i,c,u)=>{let d=Ce.match[2];c=d(s,i,c),c!=-1&&Tt(c,u,!0,!1)},Be&&(Ve(Mi,P,si),Ve(Uo,P,Zr),Ve(Ti,P,r=>{rs(r),rl(!1)}),Ve(Di,P,Za),Ve(Li,P,oi),nr.add(s),s.syncRect=rl);const Ol=s.hooks=e.hooks||{};function ze(r,i,c){Po?sl.push([r,i,c]):r in Ol&&Ol[r].forEach(u=>{u.call(null,s,i,c)})}(e.plugins||[]).forEach(r=>{for(let i in r.hooks)Ol[i]=(Ol[i]||[]).concat(r.hooks[i])});const ii=(r,i,c)=>c,Ce=Pe({key:null,setSeries:!1,filters:{pub:Vi,sub:Vi},scales:[T,x[1]?x[1].scale:null],match:[ji,ji,ii],values:[null,null]},L.sync);Ce.match.length==2&&Ce.match.push(ii),L.sync=Ce;const ni=Ce.key,Oo=ca(ni);function il(r,i,c,u,d,g,w){Ce.filters.pub(r,i,c,u,d,g,w)&&Oo.pub(r,i,c,u,d,g,w)}Oo.sub(s);function Qa(r,i,c,u,d,g,w){Ce.filters.sub(r,i,c,u,d,g,w)&&Ns[r](null,i,c,u,d,g,w)}s.pub=Qa;function Xa(){Oo.unsub(s),nr.delete(s),es.clear(),sr(Gl,Ws,ri),p.remove(),ae?.remove(),ze("destroy")}s.destroy=Xa;function Io(){ze("init",e,t),zr(t||e.data,!1),z[T]?Ao(T,z[T]):go(),Al=ve.show&&(ve.width>0||ve.height>0),os=ft=!0,mo(e.width,e.height)}return x.forEach(Or),N.forEach(Ta),l?l instanceof HTMLElement?(l.appendChild(p),Io()):l(s,Io):Io(),s}Ue.assign=Pe;Ue.fmtNum=Sr;Ue.rangeNum=Kl;Ue.rangeLog=ro;Ue.rangeAsinh=_r;Ue.orient=ws;Ue.pxRatio=ne;Ue.join=Zu;Ue.fmtDate=kr,Ue.tzDate=cf;Ue.sync=ca;{Ue.addGap=jf,Ue.clipGaps=ao;let e=Ue.paths={points:ma};e.linear=va,e.stepped=Yf,e.bars=qf,e.spline=Zf}const _a='.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';var ah=Object.defineProperty,ch=Object.getOwnPropertyDescriptor,Pt=(e,t,l,s)=>{for(var o=s>1?void 0:s?ch(t,l):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=(s?a(t,l,o):a(o))||o);return s&&o&&ah(t,l,o),o};let nt=class extends rt{constructor(){super(...arguments),this.machine=new Tn(this),this.step="dose",this.shotComplete=!1,this.shotEndTimer=null,this.doseIn=18,this.selectedProfile=null,this.profiles=[],this.showProfileList=!1,this.coffeeBags=[],this.selectedCoffee=null,this.showCoffeeList=!1,this.showCoffeeEdit=!1,this.plot=null,this.chartContainer=null,this.ro=null,this.chartWidth=0,this.chartHeight=0}connectedCallback(){super.connectedCallback(),this.loadDefaults()}disconnectedCallback(){super.disconnectedCallback(),this.teardownChart()}async loadDefaults(){let e=null;try{const t=await zc();this.doseIn=t.doseData.doseIn,this.selectedProfile=t.profile,e=t.coffeeData?.name??null}catch{}try{this.coffeeBags=await Ci(),e&&(this.selectedCoffee=this.coffeeBags.find(t=>t.name===e)??null)}catch{}}toggleCoffeeList(){this.showCoffeeEdit=!1,this.showCoffeeList=!this.showCoffeeList}selectCoffee(e){this.selectedCoffee=e,this.showCoffeeList=!1}async onCoffeeBagSaved(e){const t=e.detail.bag;this.selectedCoffee=t,this.showCoffeeEdit=!1,nu();try{this.coffeeBags=await Ci(),this.selectedCoffee=this.coffeeBags.find(l=>l.id===t.id)??t}catch{}}adjustDose(e){this.doseIn=Math.max(0,+(this.doseIn+e).toFixed(1))}async loadProfiles(){try{this.profiles=await Mn()}catch{}}async selectProfile(e){this.selectedProfile=e.profile,this.showProfileList=!1;try{await Promise.all([En(e.profile),Si({profile:e.profile})])}catch{}}async startShot(){try{const e={doseData:{doseIn:this.doseIn,doseOut:this.doseIn*2}};this.selectedCoffee&&(e.coffeeData={name:this.selectedCoffee.name,roaster:this.selectedCoffee.roaster}),await Si(e)}catch{}this.shotEndTimer&&(clearTimeout(this.shotEndTimer),this.shotEndTimer=null),this.machine.startRecording(),this.shotComplete=!1,this.step="shot";try{await xi("espresso")}catch{}}async stopShot(){try{await xi("idle")}catch{}}resetToStart(){this.shotEndTimer&&(clearTimeout(this.shotEndTimer),this.shotEndTimer=null),this.teardownChart(),this.machine.stopRecording(),this.shotComplete=!1,this.step="dose"}updated(){this.step==="shot"&&!this.shotComplete&&!this.shotEndTimer&&this.machine.isRecording&&this.machine.recordedMeasurements.length>0&&this.machine.state!=="espresso"&&(this.shotEndTimer=setTimeout(()=>{this.shotComplete=!0,this.shotEndTimer=null},2e3)),this.step==="shot"?this.ensureChart():this.plot&&this.teardownChart()}ensureChart(){if(!this.ro){if(this.chartContainer=this.renderRoot.querySelector(".chart-area"),!this.chartContainer)return;this.ro=new ResizeObserver(e=>{const{width:t,height:l}=e[0].contentRect,s=Math.floor(t),o=Math.floor(l);s>0&&o>0&&(s!==this.chartWidth||o!==this.chartHeight)&&(this.chartWidth=s,this.chartHeight=o,this.plot?this.plot.setSize({width:s,height:o}):this.createChart())}),this.ro.observe(this.chartContainer)}if(this.plot){const e=this.buildChartData();e[0].length>0&&this.plot.setData(e)}else this.chartWidth>0&&this.chartHeight>0&&this.createChart()}createChart(){if(!this.chartContainer||this.chartWidth===0||this.chartHeight===0)return;this.plot?.destroy(),this.plot=null,this.chartContainer.innerHTML="";const e=this.buildChartData();e[0].length!==0&&(this.plot=new Ue(this.buildChartOpts(),e,this.chartContainer))}teardownChart(){this.ro?.disconnect(),this.ro=null,this.plot?.destroy(),this.plot=null,this.chartContainer=null,this.chartWidth=0,this.chartHeight=0}buildChartData(){const e=this.machine.recordedMeasurements,t=[],l=[],s=[],o=[],n=[],a=[],h=[],f=[];for(const p of e){const b=new Date(p.machine.timestamp).getTime()/1e3;t.push(b),l.push(p.machine.pressure),s.push(p.machine.flow),o.push(p.scale?.weight??0),n.push(p.machine.groupTemperature),a.push(p.scale?.weightFlow??0),h.push(p.machine.targetPressure),f.push(p.machine.targetFlow)}if(t.length>0){const p=t[0];for(let b=0;b<t.length;b++)t[b]-=p}return[t,l,s,o,n,a,h,f]}buildChartOpts(){return{width:this.chartWidth,height:this.chartHeight,cursor:{show:!1},legend:{show:!1},scales:{x:{time:!1},y:{auto:!1,range:(e,t,l)=>[0,Math.max(11,l)]},y2:{auto:!0}},axes:[{stroke:"#655d5d",grid:{stroke:"#292424"},ticks:{show:!1}},{stroke:"#655d5d",grid:{stroke:"#292424"},size:40,ticks:{show:!1}},{side:1,stroke:"#655d5d",size:40,grid:{show:!1},ticks:{show:!1}}],series:[{},{label:"Pressure",stroke:"#5485b6",width:2,scale:"y",points:{show:!1}},{label:"Flow",stroke:"#4b8b8b",width:2,scale:"y",points:{show:!1}},{label:"Weight",stroke:"#b45a3c",width:2,scale:"y2",dash:[4,4],points:{show:!1}},{label:"Temp",stroke:"#ca4949",width:1,scale:"y2",dash:[4,4],points:{show:!1}},{label:"Weight/s",stroke:"#b45a3c",width:2,scale:"y",points:{show:!1}},{label:"Target Pressure",stroke:"#5485b6",width:1,scale:"y",dash:[4,4],points:{show:!1}},{label:"Target Flow",stroke:"#4b8b8b",width:1,scale:"y",dash:[4,4],points:{show:!1}}]}}get shotDuration(){const e=this.machine.recordedMeasurements;if(e.length<2)return 0;const t=new Date(e[0].machine.timestamp).getTime();return(new Date(e[e.length-1].machine.timestamp).getTime()-t)/1e3}get finalWeight(){const e=this.machine.recordedMeasurements;return e.length===0?0:e[e.length-1].scale?.weight??0}get ratio(){return this.doseIn<=0||this.finalWeight<=0?"-":`1:${(this.finalWeight/this.doseIn).toFixed(1)}`}renderDose(){return U`
      <div class="step-content">
        <div class="dose-section">
          <span class="dose-label">Dose</span>
          <div class="dose-stepper">
            <button @click=${()=>this.adjustDose(-.1)}>-</button>
            <span class="dose-value">
              ${this.doseIn.toFixed(1)}<span class="dose-unit">g</span>
            </span>
            <button @click=${()=>this.adjustDose(.1)}>+</button>
          </div>
          ${this.selectedProfile?U`<span class="profile-label">${this.selectedProfile.title}</span>`:he}
          <div class="picker-card" @click=${()=>this.toggleCoffeeList()}>
            <span class="picker-card-label">coffee</span>
            ${this.selectedCoffee?U`
                  <div class="picker-card-title">${this.selectedCoffee.name}</div>
                  ${this.selectedCoffee.roaster?U`<div class="picker-card-meta">${this.selectedCoffee.roaster}</div>`:he}
                `:U`<div class="picker-card-empty">Select coffee</div>`}
          </div>
          ${this.selectedCoffee&&!this.showCoffeeList&&!this.showCoffeeEdit?U`
                <button
                  class="btn-edit-bag"
                  @click=${()=>{this.showCoffeeEdit=!0}}
                >edit bag info</button>
              `:he}
          ${this.showCoffeeList?this.renderCoffeeList():he}
          ${this.showCoffeeEdit&&this.selectedCoffee?U`
                <coffee-bag-edit
                  .bag=${this.selectedCoffee}
                  @coffee-bag-saved=${this.onCoffeeBagSaved}
                  @coffee-bag-edit-cancel=${()=>{this.showCoffeeEdit=!1}}
                ></coffee-bag-edit>
              `:he}
          <div class="actions">
            <button class="btn btn-primary btn-full" @click=${()=>{this.step="profile"}}>
              Next
            </button>
          </div>
        </div>
      </div>
    `}renderCoffeeItem(e){return U`
      <div
        class="picker-list-item"
        ?data-selected=${this.selectedCoffee?.id===e.id}
        ?data-archived=${e.archived}
        @click=${()=>this.selectCoffee(e)}
      >
        ${e.name}
        ${e.roaster?U`<div class="picker-list-item-sub">${e.roaster}</div>`:he}
      </div>
    `}renderCoffeeList(){if(this.coffeeBags.length===0)return U`<div class="loading">No coffee bags found</div>`;const e=this.coffeeBags.filter(l=>!l.archived),t=this.coffeeBags.filter(l=>l.archived);return U`
      <div class="picker-list">
        ${e.map(l=>this.renderCoffeeItem(l))}
        ${t.length>0?U`
              <hr class="picker-list-divider" />
              ${t.map(l=>this.renderCoffeeItem(l))}
            `:he}
      </div>
    `}toggleProfileList(){!this.showProfileList&&this.profiles.length===0&&this.loadProfiles(),this.showProfileList=!this.showProfileList}renderProfile(){return U`
      <div class="step-content">
        <div class="picker-card" @click=${()=>this.toggleProfileList()}>
          <span class="picker-card-label">profile</span>
          ${this.selectedProfile?U`
                <div class="picker-card-title">${this.selectedProfile.title}</div>
                <div class="picker-card-meta">
                  ${this.selectedProfile.author}
                  / ${this.selectedProfile.beverage_type}
                  / ${this.selectedProfile.steps.length} steps
                </div>
              `:U`<div class="picker-card-empty">Select profile</div>`}
        </div>

        ${this.showProfileList?U`
              <div class="picker-list">
                ${this.profiles.map(e=>U`
                    <div
                      class="picker-list-item"
                      ?data-selected=${this.selectedProfile?.title===e.profile.title}
                      @click=${()=>this.selectProfile(e)}
                    >
                      ${e.profile.title}
                      <div class="picker-list-item-sub">${e.profile.author}</div>
                    </div>
                  `)}
              </div>
            `:he}

        <div class="actions">
          <button class="btn btn-primary btn-full" @click=${()=>this.startShot()}>
            Start
          </button>
        </div>
      </div>
    `}renderShot(){const e=this.machine.snapshot;return U`
      <div class="shot-layout">
        <div class="chart-area"></div>
        <div class="chart-legend">
          <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#5485b6"></span>Pressure</span>
          <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#4b8b8b"></span>Flow</span>
          <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:transparent;border-top:2px dashed #b45a3c;height:0"></span>Weight</span>
          <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:transparent;border-top:1px dashed #ca4949;height:0"></span>Temp</span>
          <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#b45a3c"></span>Weight/s</span>
          <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:transparent;border-top:1px dashed #5485b6;height:0"></span>Goal P</span>
          <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:transparent;border-top:1px dashed #4b8b8b;height:0"></span>Goal F</span>
        </div>
        <div class="shot-controls">
          <div class="shot-timer">${Zo(this.shotDuration)}</div>

          <div class="readings">
            <div>
              <div class="reading-value">${e?Yc(e.pressure):"-"}</div>
              <div class="reading-label">Pressure</div>
            </div>
            <div>
              <div class="reading-value">${e?qc(e.flow):"-"}</div>
              <div class="reading-label">Flow</div>
            </div>
            <div>
              <div class="reading-value">${Jo(this.machine.scale?.weight??0)}</div>
              <div class="reading-label">Weight</div>
            </div>
          </div>

          ${this.shotComplete?this.renderSummary():U`
                <div class="actions">
                  <button class="btn btn-danger btn-full" @click=${()=>this.stopShot()}>
                    Stop
                  </button>
                </div>
              `}
        </div>
      </div>
    `}renderSummary(){return U`
      <fieldset class="summary">
        <legend>shot complete</legend>
        <div class="summary-stats">
          <div>
            <div class="summary-stat-value">${Jo(this.finalWeight)}</div>
            <div class="summary-stat-label">Weight</div>
          </div>
          <div>
            <div class="summary-stat-value">${Zo(this.shotDuration)}</div>
            <div class="summary-stat-label">Duration</div>
          </div>
          <div>
            <div class="summary-stat-value">${this.ratio}</div>
            <div class="summary-stat-label">Ratio</div>
          </div>
        </div>
        <button class="btn btn-primary btn-full" @click=${()=>this.resetToStart()}>
          New Shot
        </button>
      </fieldset>
    `}render(){switch(this.step){case"dose":return this.renderDose();case"profile":return this.renderProfile();case"shot":return this.renderShot()}}};nt.styles=Wt`
    ${fr(_a)}

    :host {
      display: block;
    }

    .step-content {
      padding: var(--space-md);
      max-width: 480px;
      margin: 0 auto;
    }

    /* Dose step */

    .dose-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-lg);
      padding-top: var(--space-xl);
    }

    .dose-label {
      font-size: 14px;
      color: var(--color-text-secondary);
    }

    .dose-stepper {
      display: flex;
      align-items: center;
      gap: var(--space-md);
    }

    .dose-stepper button {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      border: 1px solid var(--base_07);
      border-radius: 0;
      background: transparent;
      color: var(--base_07);
      font-family: inherit;
      font-size: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: border-color 0.15s ease-out, color 0.15s ease-out;
    }

    .dose-stepper button:active {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .dose-value {
      font-size: 48px;
      text-align: center;
    }

    .dose-unit {
      font-size: 20px;
      color: var(--color-text-secondary);
    }

    .profile-label {
      font-size: 14px;
      color: var(--color-text-secondary);
    }

    /* Shared picker card + list */

    .picker-card {
      position: relative;
      border: 1px solid var(--base_07);
      padding: var(--space-sm) var(--space-md);
      padding-top: calc(var(--space-sm) + 10px);
      width: 100%;
      cursor: pointer;
      box-sizing: border-box;
      color: var(--base_07);
      transition: border-color 0.15s ease-out, color 0.15s ease-out;
    }

    .picker-card:active {
      border-color: var(--color-accent);
    }

    .picker-card:active .picker-card-label {
      color: var(--color-accent);
    }

    .picker-card-label {
      position: absolute;
      top: -0.55em;
      left: 0.75rem;
      padding: 0 0.25em;
      background: var(--color-bg);
      color: var(--base_07);
      font-weight: bold;
      font-size: 0.75rem;
      text-transform: lowercase;
      transition: color 0.15s ease-out;
    }

    .picker-card-title {
      font-size: 16px;
      font-weight: 600;
    }

    .picker-card-meta {
      font-size: 13px;
      color: var(--color-text-secondary);
      margin-top: 2px;
    }

    .picker-card-empty {
      font-size: 14px;
      color: var(--color-text-secondary);
      transition: color 0.15s ease-out;
    }

    .picker-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      width: 100%;
      margin-top: var(--space-md);
    }

    .picker-list-item {
      padding: var(--space-sm) var(--space-md);
      background: transparent;
      border: 1px solid var(--base_07);
      border-radius: 0;
      cursor: pointer;
      font-size: 14px;
      color: var(--base_07);
      transition: border-color 0.15s ease-out, color 0.15s ease-out;
    }

    .picker-list-item:active {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .picker-list-item[data-selected] {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .picker-list-item-sub {
      font-size: 12px;
      color: var(--color-text-secondary);
      margin-top: 2px;
    }

    .picker-list-item[data-archived] {
      opacity: 0.4;
    }

    .picker-list-divider {
      border: none;
      border-top: 1px solid var(--color-border);
      margin: var(--space-xs) 0;
    }

    .btn-edit-bag {
      background: transparent;
      border: none;
      border-radius: 0;
      font-family: inherit;
      font-size: 12px;
      color: var(--color-text-secondary);
      cursor: pointer;
      padding: var(--space-xs) 0;
      transition: color 0.15s ease-out;
    }

    .btn-edit-bag:active {
      color: var(--color-accent);
    }

    /* Shot step - fixed overlay that fills between status bar and nav */

    .shot-layout {
      position: fixed;
      top: var(--status-height, 32px);
      left: 0;
      right: 0;
      bottom: calc(var(--nav-height, 56px) + env(safe-area-inset-bottom));
      display: flex;
      flex-direction: column;
      background: var(--color-bg);
      z-index: 10;
    }

    .chart-area {
      flex: 1;
      min-height: 0;
      overflow: hidden;
    }

    .chart-legend {
      flex-shrink: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2px var(--space-md);
      padding: var(--space-xs) var(--space-md);
    }

    .chart-legend-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: var(--color-text-secondary);
    }

    .chart-legend-swatch {
      width: 12px;
      height: 3px;
    }

    .shot-controls {
      flex-shrink: 0;
      padding: var(--space-sm) var(--space-md);
    }

    .readings {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-sm);
      text-align: center;
      margin: var(--space-md) 0;
    }

    .reading-value {
      font-size: 24px;
    }

    .reading-label {
      font-size: 11px;
      color: var(--color-text-secondary);
      margin-top: 2px;
    }

    .shot-timer {
      text-align: center;
      font-size: 16px;
      color: var(--color-text-secondary);
      margin-bottom: var(--space-sm);
    }

    /* Summary overlay */

    .summary {
      border: 1px solid var(--color-border);
      padding: 0.75rem 1rem;
      margin-top: var(--space-md);
      text-align: center;
      transition: border-color 0.15s ease-out;
    }

    .summary legend {
      padding: 0 0.5em;
      color: var(--base_04, #7e7777);
      font-weight: bold;
      font-size: 0.75rem;
      text-transform: lowercase;
      transition: color 0.15s ease-out;
    }

    .summary-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-md);
      margin-bottom: var(--space-lg);
    }

    .summary-stat-value {
      font-size: 20px;
    }

    .summary-stat-label {
      font-size: 11px;
      color: var(--color-text-secondary);
      margin-top: 2px;
    }

    /* Shared */

    .actions {
      display: flex;
      gap: var(--space-sm);
      justify-content: center;
      margin-top: var(--space-lg);
      width: 100%;
    }

    .btn {
      min-height: 44px;
      padding: var(--space-sm) var(--space-lg);
      border: 1px solid var(--base_07);
      border-radius: 0;
      background: transparent;
      color: var(--base_07);
      font-family: inherit;
      font-size: 16px;
      cursor: pointer;
      transition: border-color 0.15s ease-out, color 0.15s ease-out;
    }

    .btn:active {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .btn-primary {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .btn-primary:active {
      border-color: var(--color-accent-dim);
      color: var(--color-accent-dim);
    }

    .btn-danger {
      border-color: var(--color-error);
      color: var(--color-error);
    }

    .btn-full {
      width: 100%;
    }

    .loading {
      text-align: center;
      padding: var(--space-xl);
      color: var(--color-text-secondary);
    }
  `;Pt([se()],nt.prototype,"step",2);Pt([se()],nt.prototype,"shotComplete",2);Pt([se()],nt.prototype,"doseIn",2);Pt([se()],nt.prototype,"selectedProfile",2);Pt([se()],nt.prototype,"profiles",2);Pt([se()],nt.prototype,"showProfileList",2);Pt([se()],nt.prototype,"coffeeBags",2);Pt([se()],nt.prototype,"selectedCoffee",2);Pt([se()],nt.prototype,"showCoffeeList",2);Pt([se()],nt.prototype,"showCoffeeEdit",2);nt=Pt([Bt("brew-view")],nt);var uh=Object.defineProperty,fh=Object.getOwnPropertyDescriptor,Dr=(e,t,l,s)=>{for(var o=s>1?void 0:s?fh(t,l):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=(s?a(t,l,o):a(o))||o);return s&&o&&uh(t,l,o),o};let Sl=class extends rt{constructor(){super(...arguments),this.profiles=[],this.loading=!0}connectedCallback(){super.connectedCallback(),this.loadProfiles()}async loadProfiles(){this.loading=!0;try{this.profiles=await Mn()}catch{this.profiles=[]}this.loading=!1}async selectProfile(e){await En(e.profile)}render(){return this.loading?U`<div class="loading">Loading profiles...</div>`:this.profiles.length===0?U`<div class="empty">No profiles found</div>`:U`
      <h2>Profiles</h2>
      <div class="list">
        ${this.profiles.filter(e=>e.visibility==="visible").map(e=>U`
              <div class="profile-card" @click=${()=>this.selectProfile(e)}>
                <div class="profile-title">${e.profile.title}</div>
                <div class="profile-meta">
                  ${e.profile.author} / ${e.profile.beverage_type}
                </div>
              </div>
            `)}
      </div>
    `}};Sl.styles=Wt`
    :host {
      display: block;
      padding: var(--space-md);
    }

    h2 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: var(--space-md);
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .profile-card {
      padding: var(--space-md);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      cursor: pointer;
    }

    .profile-card:active {
      background: var(--color-surface-alt);
    }

    .profile-title {
      font-weight: 600;
      margin-bottom: 4px;
    }

    .profile-meta {
      font-size: 12px;
      color: var(--color-text-secondary);
    }

    .empty {
      text-align: center;
      padding: var(--space-xl);
      color: var(--color-text-secondary);
    }

    .loading {
      text-align: center;
      padding: var(--space-xl);
      color: var(--color-text-secondary);
    }
  `;Dr([se()],Sl.prototype,"profiles",2);Dr([se()],Sl.prototype,"loading",2);Sl=Dr([Bt("profiles-view")],Sl);var hh=Object.defineProperty,dh=Object.getOwnPropertyDescriptor,xa=(e,t,l,s)=>{for(var o=s>1?void 0:s?dh(t,l):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=(s?a(t,l,o):a(o))||o);return s&&o&&hh(t,l,o),o};let ql=class extends rt{constructor(){super(...arguments),this.measurements=[],this.plot=null,this.container=null,this.chartWidth=0,this.chartHeight=0,this.ro=null}buildData(){const e=[],t=[],l=[],s=[],o=[];for(const n of this.measurements){const a=new Date(n.machine.timestamp).getTime()/1e3;e.push(a),t.push(n.machine.pressure),l.push(n.machine.flow),s.push(n.scale?.weight??0),o.push(n.machine.groupTemperature)}if(e.length>0){const n=e[0];for(let a=0;a<e.length;a++)e[a]-=n}return[e,t,l,s,o]}buildOpts(){return{width:this.chartWidth,height:this.chartHeight,cursor:{show:!1},legend:{show:!1},scales:{x:{time:!1},y:{auto:!0},y2:{auto:!0}},axes:[{stroke:"#655d5d",grid:{stroke:"#292424"}},{stroke:"#655d5d",grid:{stroke:"#292424"},size:40},{side:1,stroke:"#655d5d",size:40,grid:{show:!1}}],series:[{},{label:"Pressure",stroke:"#5485b6",width:2,scale:"y"},{label:"Flow",stroke:"#4b8b8b",width:2,scale:"y"},{label:"Weight",stroke:"#b45a3c",width:2,scale:"y2"},{label:"Temp",stroke:"#ca4949",width:1,scale:"y2",dash:[4,4]}]}}firstUpdated(){this.container=this.renderRoot.querySelector(".chart"),this.ro=new ResizeObserver(e=>{const{width:t,height:l}=e[0].contentRect,s=Math.floor(t),o=Math.floor(l);s>0&&o>0&&(s!==this.chartWidth||o!==this.chartHeight)&&(this.chartWidth=s,this.chartHeight=o,this.plot?this.plot.setSize({width:s,height:o}):this.rebuildChart())}),this.ro.observe(this)}updated(e){if(e.has("measurements")){const t=this.buildData();if(t[0].length===0)return;this.plot?this.plot.setData(t):this.rebuildChart()}}rebuildChart(){if(!this.container||this.chartWidth===0||this.chartHeight===0)return;this.plot?.destroy(),this.plot=null,this.container.innerHTML="";const e=this.buildData();e[0].length!==0&&(this.plot=new Ue(this.buildOpts(),e,this.container))}disconnectedCallback(){super.disconnectedCallback(),this.ro?.disconnect(),this.plot?.destroy(),this.plot=null}render(){return U`<div class="chart"></div>`}};ql.styles=Wt`
    ${fr(_a)}

    :host {
      display: block;
      overflow: hidden;
    }

    .chart {
      width: 100%;
      height: 100%;
    }
  `;xa([Xl({type:Array})],ql.prototype,"measurements",2);ql=xa([Bt("shot-graph")],ql);var ph=Object.defineProperty,mh=Object.getOwnPropertyDescriptor,ho=(e,t,l,s)=>{for(var o=s>1?void 0:s?mh(t,l):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=(s?a(t,l,o):a(o))||o);return s&&o&&ph(t,l,o),o};let qs=class extends rt{constructor(){super(...arguments),this.shotIds=[],this.selectedShot=null,this.loading=!0}connectedCallback(){super.connectedCallback(),this.loadShotIds()}async loadShotIds(){this.loading=!0;try{this.shotIds=await Nc()}catch{this.shotIds=[]}this.loading=!1}async selectShot(e){this.selectedShot=await Hc(e)}shotDuration(e){const t=e.measurements;if(t.length<2)return 0;const l=new Date(t[0].machine.timestamp).getTime();return(new Date(t[t.length-1].machine.timestamp).getTime()-l)/1e3}shotFinalWeight(e){const t=e.measurements;return t.length===0?0:t[t.length-1].scale?.weight??0}render(){return this.loading?U`<div class="empty">Loading history...</div>`:this.selectedShot?U`
        <div class="shot-detail">
          <div class="shot-detail-header">
            <h2>${this.selectedShot.workflow.profile.title}</h2>
            <div class="shot-meta">
              ${Jc(this.selectedShot.timestamp)}
              ${Jo(this.shotFinalWeight(this.selectedShot))}
              ${Zo(this.shotDuration(this.selectedShot))}
            </div>
          </div>
          <div class="detail">
            <shot-graph .measurements=${this.selectedShot.measurements}></shot-graph>
          </div>
          <div class="shot-detail-footer">
            <button class="back-btn" @click=${()=>this.selectedShot=null}>Back</button>
          </div>
        </div>
      `:this.shotIds.length===0?U`<div class="empty">No shot history</div>`:U`
      <h2>History</h2>
      <div class="list">
        ${this.shotIds.map(e=>U`
            <div class="shot-card" @click=${()=>this.selectShot(e)}>
              <span class="shot-title">${e}</span>
            </div>
          `)}
      </div>
    `}};qs.styles=Wt`
    :host {
      display: block;
      padding: var(--space-md);
    }

    h2 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: var(--space-md);
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .shot-card {
      padding: var(--space-md);
      background: transparent;
      border: 1px solid var(--color-border);
      border-radius: 0;
      cursor: pointer;
      transition: border-color 0.15s ease-out, color 0.15s ease-out;
    }

    .shot-card:active {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .shot-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    .shot-title {
      font-weight: 600;
      font-size: 14px;
    }

    .shot-time {
      font-size: 12px;
      color: var(--color-text-secondary);
    }

    .shot-detail {
      position: fixed;
      top: var(--status-height, 32px);
      left: 0;
      right: 0;
      bottom: calc(var(--nav-height, 56px) + env(safe-area-inset-bottom));
      display: flex;
      flex-direction: column;
      background: var(--color-bg);
      z-index: 10;
    }

    .shot-detail-header {
      flex-shrink: 0;
      padding: var(--space-md);
    }

    .shot-meta {
      font-size: 12px;
      color: var(--color-text-secondary);
    }

    .detail {
      flex: 1;
      min-height: 0;
      overflow: hidden;
    }

    .detail shot-graph {
      height: 100%;
    }

    .shot-detail-footer {
      flex-shrink: 0;
      padding: var(--space-sm) var(--space-md);
    }

    .back-btn {
      width: 100%;
      padding: var(--space-sm) var(--space-md);
      border: 1px solid var(--color-text);
      border-radius: 0;
      background: transparent;
      color: var(--color-text);
      font-family: inherit;
      font-size: 14px;
      cursor: pointer;
      transition: border-color 0.15s ease-out, color 0.15s ease-out;
    }

    .back-btn:active {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .empty {
      text-align: center;
      padding: var(--space-xl);
      color: var(--color-text-secondary);
    }
  `;ho([se()],qs.prototype,"shotIds",2);ho([se()],qs.prototype,"selectedShot",2);ho([se()],qs.prototype,"loading",2);qs=ho([Bt("history-view")],qs);var gh=Object.defineProperty,vh=Object.getOwnPropertyDescriptor,Vt=(e,t,l,s)=>{for(var o=s>1?void 0:s?vh(t,l):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=(s?a(t,l,o):a(o))||o);return s&&o&&gh(t,l,o),o};let Ct=class extends rt{constructor(){super(...arguments),this.machineInfo=null,this.devices=[],this.reaSettings=null,this.gatewayUrl=localStorage.getItem("gateway-url")??"",this.airtablePat=localStorage.getItem("airtable-pat")??"",this.airtableBaseId=localStorage.getItem("airtable-base-id")??"",this.mockGateway=eo(),this.mockCoffee=to()}connectedCallback(){super.connectedCallback(),this.loadData()}async loadData(){const e=await Promise.allSettled([Ic(),Fc(),Uc()]);e[0].status==="fulfilled"&&(this.machineInfo=e[0].value),e[1].status==="fulfilled"&&(this.devices=e[1].value),e[2].status==="fulfilled"&&(this.reaSettings=e[2].value)}toggleMockGateway(){!this.mockGateway?localStorage.setItem("mock-gateway","true"):localStorage.removeItem("mock-gateway"),window.location.reload()}toggleMockCoffee(){!this.mockCoffee?localStorage.setItem("mock-coffee","true"):localStorage.removeItem("mock-coffee"),window.location.reload()}saveAirtableConfig(){this.airtablePat?localStorage.setItem("airtable-pat",this.airtablePat):localStorage.removeItem("airtable-pat"),this.airtableBaseId?localStorage.setItem("airtable-base-id",this.airtableBaseId):localStorage.removeItem("airtable-base-id"),window.location.reload()}saveGatewayUrl(){this.gatewayUrl?localStorage.setItem("gateway-url",this.gatewayUrl):localStorage.removeItem("gateway-url"),window.location.reload()}render(){return U`
      <h2>Settings</h2>

      <fieldset>
        <legend>gateway</legend>
        <div class="gateway-input">
          <input
            type="text"
            placeholder="http://tablet-ip:8080"
            .value=${this.gatewayUrl}
            @input=${e=>this.gatewayUrl=e.target.value}
          />
          <button @click=${this.saveGatewayUrl}>Save</button>
        </div>
      </fieldset>

      <fieldset>
        <legend>airtable</legend>
        <div class="config-label">Personal access token</div>
        <div class="config-row">
          <input
            type="password"
            placeholder="patXXXXXX..."
            .value=${this.airtablePat}
            @input=${e=>this.airtablePat=e.target.value}
          />
        </div>
        <div class="config-label">Base ID</div>
        <div class="config-row">
          <input
            type="text"
            placeholder="appXXXXXX..."
            .value=${this.airtableBaseId}
            @input=${e=>this.airtableBaseId=e.target.value}
          />
        </div>
        <div class="config-row">
          <button @click=${this.saveAirtableConfig}>Save</button>
        </div>
      </fieldset>

      <fieldset>
        <legend>development</legend>
        <div class="toggle-row">
          <span class="field-label">Mock gateway</span>
          <label>
            <input
              type="checkbox"
              .checked=${this.mockGateway}
              @change=${this.toggleMockGateway}
            />
            Simulate machine data
          </label>
        </div>
        <div class="toggle-row">
          <span class="field-label">Mock coffee</span>
          <label>
            <input
              type="checkbox"
              .checked=${this.mockCoffee}
              @change=${this.toggleMockCoffee}
            />
            Simulate Airtable data
          </label>
        </div>
      </fieldset>

      ${this.machineInfo?U`
            <fieldset>
              <legend>machine</legend>
              <div class="field">
                <span class="field-label">Model</span>
                <span class="field-value">${this.machineInfo.model}</span>
              </div>
              <div class="field">
                <span class="field-label">Serial</span>
                <span class="field-value">${this.machineInfo.serialNumber}</span>
              </div>
              <div class="field">
                <span class="field-label">Firmware</span>
                <span class="field-value">${this.machineInfo.version}</span>
              </div>
              <div class="field">
                <span class="field-label">GHC</span>
                <span class="field-value">${this.machineInfo.GHC?"Yes":"No"}</span>
              </div>
            </fieldset>
          `:""}

      ${this.devices.length>0?U`
            <fieldset>
              <legend>devices</legend>
              ${this.devices.map(e=>U`
                  <div class="device">
                    <div class="device-name">${e.name}</div>
                    <div class="device-meta">${e.type} / ${e.state}</div>
                  </div>
                `)}
            </fieldset>
          `:""}

      ${this.reaSettings?U`
            <fieldset>
              <legend>gateway settings</legend>
              <div class="field">
                <span class="field-label">Mode</span>
                <span class="field-value">${this.reaSettings.gatewayMode}</span>
              </div>
              <div class="field">
                <span class="field-label">Log Level</span>
                <span class="field-value">${this.reaSettings.logLevel}</span>
              </div>
            </fieldset>
          `:""}
    `}};Ct.styles=Wt`
    :host {
      display: block;
      padding: var(--space-md);
    }

    h2 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: var(--space-md);
    }

    fieldset {
      border: 1px solid var(--color-border);
      padding: 0.75rem 1rem;
      margin: var(--space-md) 0;
      transition: border-color 0.15s ease-out;
    }

    fieldset:hover,
    fieldset:focus-within {
      border-color: var(--color-accent);
    }

    fieldset legend {
      padding: 0 0.5em;
      color: var(--base_04, #7e7777);
      font-weight: bold;
      font-size: 0.75rem;
      text-transform: lowercase;
      transition: color 0.15s ease-out;
    }

    fieldset:hover legend,
    fieldset:focus-within legend {
      color: var(--color-accent);
    }

    .field {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-sm) 0;
      border-bottom: 1px solid var(--color-border);
      font-size: 14px;
    }

    .field:last-child {
      border-bottom: none;
    }

    .field-label {
      color: var(--color-text-secondary);
    }

    .field-value {
    }

    .device {
      padding: var(--space-sm) 0;
      border-bottom: 1px solid var(--color-border);
    }

    .device-name {
      font-size: 14px;
    }

    .device-meta {
      font-size: 12px;
      color: var(--color-text-secondary);
    }

    .gateway-input {
      margin-top: var(--space-md);
      display: flex;
      gap: var(--space-sm);
    }

    input[type="text"],
    input[type="password"] {
      flex: 1;
      padding: var(--space-xs) var(--space-sm);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 0;
      color: var(--color-text);
      font-family: inherit;
      font-size: 14px;
      transition: border-color 0.15s ease-out;
    }

    input[type="text"]:focus,
    input[type="password"]:focus {
      border-color: var(--color-accent);
    }

    .config-row {
      display: flex;
      gap: var(--space-sm);
      margin-top: var(--space-sm);
    }

    .config-row:first-child {
      margin-top: var(--space-md);
    }

    .config-label {
      font-size: 12px;
      color: var(--color-text-secondary);
      margin-top: var(--space-md);
    }

    .config-label:first-child {
      margin-top: 0;
    }

    button {
      padding: var(--space-xs) var(--space-md);
      border: 1px solid var(--color-border);
      border-radius: 0;
      background: var(--color-surface);
      color: var(--color-text);
      font-family: inherit;
      font-size: 14px;
      cursor: pointer;
      transition: border-color 0.15s ease-out, color 0.15s ease-out;
    }

    button:active {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .toggle-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-sm) 0;
      border-bottom: 1px solid var(--color-border);
      font-size: 14px;
    }

    .toggle-row label {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      cursor: pointer;
    }
  `;Vt([se()],Ct.prototype,"machineInfo",2);Vt([se()],Ct.prototype,"devices",2);Vt([se()],Ct.prototype,"reaSettings",2);Vt([se()],Ct.prototype,"gatewayUrl",2);Vt([se()],Ct.prototype,"airtablePat",2);Vt([se()],Ct.prototype,"airtableBaseId",2);Vt([se()],Ct.prototype,"mockGateway",2);Vt([se()],Ct.prototype,"mockCoffee",2);Ct=Vt([Bt("settings-view")],Ct);var bh=Object.defineProperty,wh=Object.getOwnPropertyDescriptor,Sa=(e,t,l,s)=>{for(var o=s>1?void 0:s?wh(t,l):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=(s?a(t,l,o):a(o))||o);return s&&o&&bh(t,l,o),o};const yh=["brew","history","profiles","settings"];function pn(){const e=window.location.hash.replace("#/","");return yh.includes(e)?e:"brew"}let Jl=class extends rt{constructor(){super(...arguments),this.route=pn(),this.onHashChange=()=>{this.route=pn()}}connectedCallback(){super.connectedCallback(),window.addEventListener("hashchange",this.onHashChange)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this.onHashChange)}renderView(){switch(this.route){case"brew":return U`<brew-view></brew-view>`;case"profiles":return U`<profiles-view></profiles-view>`;case"history":return U`<history-view></history-view>`;case"settings":return U`<settings-view></settings-view>`}}render(){return U`
      <status-bar></status-bar>
      <main>${this.renderView()}</main>
      <nav-bar .active=${this.route}></nav-bar>
    `}};Jl.styles=Wt`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      height: 100dvh;
    }

    main {
      flex: 1;
      overflow-y: auto;
      padding-bottom: calc(var(--nav-height, 56px) + env(safe-area-inset-bottom));
    }
  `;Sa([se()],Jl.prototype,"route",2);Jl=Sa([Bt("rea-app")],Jl);"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js");
