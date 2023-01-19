(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const $t="modulepreload",Et=function(t,e){return new URL(t,e).href},Y={},St=function(e,n,i){if(!n||n.length===0)return e();const o=document.getElementsByTagName("link");return Promise.all(n.map(r=>{if(r=Et(r,i),r in Y)return;Y[r]=!0;const s=r.endsWith(".css"),c=s?'[rel="stylesheet"]':"";if(!!i)for(let f=o.length-1;f>=0;f--){const l=o[f];if(l.href===r&&(!s||l.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${c}`))return;const a=document.createElement("link");if(a.rel=s?"stylesheet":$t,s||(a.as="script",a.crossOrigin=""),a.href=r,document.head.appendChild(a),s)return new Promise((f,l)=>{a.addEventListener("load",f),a.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>e())},Lt=`html{text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}html,html body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background-color:#fffdf8;touch-action:none;-webkit-text-size-adjust:100%;text-size-adjust:100%}html body .click{cursor:pointer}html body #app{display:block;position:absolute;top:0;left:0;width:100%;height:100%;margin:0;padding:0;overflow:hidden}body .tp-dfwv{max-height:calc(100vh - 16px)}body .tp-dfwv::-webkit-scrollbar{width:5px}body .tp-dfwv::-webkit-scrollbar-track{background-color:#4c4f53}body .tp-dfwv::-webkit-scrollbar-thumb{background-color:#777c81}@font-face{font-family:Stylish;src:url(assets/fonts/Stylish-Regular.woff2) format("woff2"),url(assets/fonts/Stylish-Regular.woff) format("woff");font-weight:400;font-style:normal;font-display:swap}html{--default-font: "Stylish", sans-serif}
`;function N(){}const ut=t=>t;function Ct(t,e){for(const n in e)t[n]=e[n];return t}function dt(t){return t()}function Z(){return Object.create(null)}function E(t){t.forEach(dt)}function K(t){return typeof t=="function"}function Pt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function Nt(t){return Object.keys(t).length===0}function ie(t,e,n,i){if(t){const o=ht(t,e,n,i);return t[0](o)}}function ht(t,e,n,i){return t[1]&&i?Ct(n.ctx.slice(),t[1](i(e))):n.ctx}function se(t,e,n,i){if(t[2]&&i){const o=t[2](i(n));if(e.dirty===void 0)return o;if(typeof o=="object"){const r=[],s=Math.max(e.dirty.length,o.length);for(let c=0;c<s;c+=1)r[c]=e.dirty[c]|o[c];return r}return e.dirty|o}return e.dirty}function le(t,e,n,i,o,r){if(o){const s=ht(e,n,i,r);t.p(s,o)}}function ae(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}const mt=typeof window<"u";let Bt=mt?()=>window.performance.now():()=>Date.now(),W=mt?t=>requestAnimationFrame(t):N;const x=new Set;function pt(t){x.forEach(e=>{e.c(t)||(x.delete(e),e.f())}),x.size!==0&&W(pt)}function Rt(t){let e;return x.size===0&&W(pt),{promise:new Promise(n=>{x.add(e={c:t,f:n})}),abort(){x.delete(e)}}}function B(t,e){t.appendChild(e)}function gt(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function jt(t){const e=R("style");return At(gt(t),e),e.sheet}function At(t,e){return B(t.head||t,e),e.sheet}function z(t,e,n){t.insertBefore(e,n||null)}function $(t){t.parentNode&&t.parentNode.removeChild(t)}function R(t){return document.createElement(t)}function tt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function _t(t){return document.createTextNode(t)}function yt(){return _t(" ")}function ce(){return _t("")}function Ot(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function _(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function zt(t){return Array.from(t.childNodes)}function fe(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Mt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function et(t,e,n){t.classList[n?"add":"remove"](e)}function wt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,n,i,e),o}const T=new Map;let q=0;function Dt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Tt(t,e){const n={stylesheet:jt(e),rules:{}};return T.set(t,n),n}function qt(t,e,n,i,o,r,s,c=0){const d=16.666/i;let a=`{
`;for(let g=0;g<=1;g+=d){const v=e+(n-e)*r(g);a+=g*100+`%{${s(v,1-v)}}
`}const f=a+`100% {${s(n,1-n)}}
}`,l=`__svelte_${Dt(f)}_${c}`,u=gt(t),{stylesheet:p,rules:h}=T.get(u)||Tt(u,t);h[l]||(h[l]=!0,p.insertRule(`@keyframes ${l} ${f}`,p.cssRules.length));const b=t.style.animation||"";return t.style.animation=`${b?`${b}, `:""}${l} ${i}ms linear ${o}ms 1 both`,q+=1,l}function Ft(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?r=>r.indexOf(e)<0:r=>r.indexOf("__svelte")===-1),o=n.length-i.length;o&&(t.style.animation=i.join(", "),q-=o,q||Ht())}function Ht(){W(()=>{q||(T.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&$(e)}),T.clear())})}let j;function C(t){j=t}function J(){if(!j)throw new Error("Function called outside component initialization");return j}function It(t){J().$$.on_mount.push(t)}function ue(t){J().$$.on_destroy.push(t)}function Ut(){const t=J();return(e,n,{cancelable:i=!1}={})=>{const o=t.$$.callbacks[e];if(o){const r=wt(e,n,{cancelable:i});return o.slice().forEach(s=>{s.call(t,r)}),!r.defaultPrevented}return!0}}const L=[],V=[],M=[],nt=[],vt=Promise.resolve();let G=!1;function bt(){G||(G=!0,vt.then(kt))}function de(){return bt(),vt}function F(t){M.push(t)}const U=new Set;let O=0;function kt(){const t=j;do{for(;O<L.length;){const e=L[O];O++,C(e),Vt(e.$$)}for(C(null),L.length=0,O=0;V.length;)V.pop()();for(let e=0;e<M.length;e+=1){const n=M[e];U.has(n)||(U.add(n),n())}M.length=0}while(L.length);for(;nt.length;)nt.pop()();G=!1,U.clear(),C(t)}function Vt(t){if(t.fragment!==null){t.update(),E(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(F)}}let S;function Gt(){return S||(S=Promise.resolve(),S.then(()=>{S=null})),S}function ot(t,e,n){t.dispatchEvent(wt(`${e?"intro":"outro"}${n}`))}const D=new Set;let k;function Kt(){k={r:0,c:[],p:k}}function Wt(){k.r||E(k.c),k=k.p}function P(t,e){t&&t.i&&(D.delete(t),t.i(e))}function rt(t,e,n,i){if(t&&t.o){if(D.has(t))return;D.add(t),k.c.push(()=>{D.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Jt={duration:0};function it(t,e,n){const i={direction:"out"};let o=e(t,n,i),r=!0,s;const c=k;c.r+=1;function d(){const{delay:a=0,duration:f=300,easing:l=ut,tick:u=N,css:p}=o||Jt;p&&(s=qt(t,1,0,f,a,l,p));const h=Bt()+a,b=h+f;F(()=>ot(t,!1,"start")),Rt(g=>{if(r){if(g>=b)return u(0,1),ot(t,!1,"end"),--c.r||E(c.c),!1;if(g>=h){const v=l((g-h)/f);u(1-v,v)}}return r})}return K(o)?Gt().then(()=>{o=o(i),d()}):d(),{end(a){a&&o.tick&&o.tick(1,0),r&&(s&&Ft(t,s),r=!1)}}}function he(t,e){t.d(1),e.delete(t.key)}function me(t,e,n,i,o,r,s,c,d,a,f,l){let u=t.length,p=r.length,h=u;const b={};for(;h--;)b[t[h].key]=h;const g=[],v=new Map,H=new Map;for(h=p;h--;){const m=l(o,r,h),y=n(m);let w=s.get(y);w?i&&w.p(m,e):(w=a(y,m),w.c()),v.set(y,g[h]=w),y in b&&H.set(y,Math.abs(h-b[y]))}const Q=new Set,X=new Set;function I(m){P(m,1),m.m(c,f),s.set(m.key,m),f=m.first,p--}for(;u&&p;){const m=g[p-1],y=t[u-1],w=m.key,A=y.key;m===y?(f=m.first,u--,p--):v.has(A)?!s.has(w)||Q.has(w)?I(m):X.has(A)?u--:H.get(w)>H.get(A)?(X.add(w),I(m)):(Q.add(A),u--):(d(y,s),u--)}for(;u--;){const m=t[u];v.has(m.key)||d(m,s)}for(;p;)I(g[p-1]);return g}function pe(t){t&&t.c()}function Qt(t,e,n,i){const{fragment:o,after_update:r}=t.$$;o&&o.m(e,n),i||F(()=>{const s=t.$$.on_mount.map(dt).filter(K);t.$$.on_destroy?t.$$.on_destroy.push(...s):E(s),t.$$.on_mount=[]}),r.forEach(F)}function Xt(t,e){const n=t.$$;n.fragment!==null&&(E(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Yt(t,e){t.$$.dirty[0]===-1&&(L.push(t),bt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Zt(t,e,n,i,o,r,s,c=[-1]){const d=j;C(t);const a=t.$$={fragment:null,ctx:[],props:r,update:N,not_equal:o,bound:Z(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(d?d.$$.context:[])),callbacks:Z(),dirty:c,skip_bound:!1,root:e.target||d.$$.root};s&&s(a.root);let f=!1;if(a.ctx=n?n(t,e.props||{},(l,u,...p)=>{const h=p.length?p[0]:u;return a.ctx&&o(a.ctx[l],a.ctx[l]=h)&&(!a.skip_bound&&a.bound[l]&&a.bound[l](h),f&&Yt(t,l)),u}):[],a.update(),f=!0,E(a.before_update),a.fragment=i?i(a.ctx):!1,e.target){if(e.hydrate){const l=zt(e.target);a.fragment&&a.fragment.l(l),l.forEach($)}else a.fragment&&a.fragment.c();e.intro&&P(t.$$.fragment),Qt(t,e.target,e.anchor,e.customElement),kt()}C(d)}class te{$destroy(){Xt(this,1),this.$destroy=N}$on(e,n){if(!K(n))return N;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const o=i.indexOf(n);o!==-1&&i.splice(o,1)}}$set(e){this.$$set&&!Nt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function st(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1}function lt(t,{delay:e=0,duration:n=400,easing:i=ut}={}){const o=+getComputedStyle(t).opacity;return{delay:e,duration:n,easing:i,css:r=>`opacity: ${r*o}`}}function at(t){let e,n,i,o,r,s,c,d,a,f;return{c(){e=R("h1"),e.innerHTML="Summer<br/>Afternoon",i=yt(),o=R("div"),r=tt("svg"),s=tt("circle"),et(e,"fallback",t[2]),_(s,"class","path"),_(s,"fill","none"),_(s,"stroke-width","7"),_(s,"stroke-linecap","round"),_(s,"cx","33"),_(s,"cy","33"),_(s,"r","29"),_(r,"viewBox","0 0 66 66"),_(r,"xmlns","http://www.w3.org/2000/svg"),_(o,"class","spinner"),Mt(o,"--spin-duration",ne)},m(l,u){z(l,e,u),z(l,i,u),z(l,o,u),B(o,r),B(r,s),d=!0,a||(f=Ot(e,"outroend",t[3]),a=!0)},p(l,u){t=l,(!d||u&4)&&et(e,"fallback",t[2])},i(l){d||(n&&n.end(1),c&&c.end(1),d=!0)},o(l){n=it(e,lt,{duration:750,easing:st}),c=it(o,lt,{duration:750,easing:st}),d=!1},d(l){l&&$(e),l&&n&&n.end(),l&&$(i),l&&$(o),l&&c&&c.end(),a=!1,f()}}}function ee(t){let e,n,i,o,r=t[1]&&at(t);return{c(){e=R("div"),r&&r.c(),n=yt(),i=R("style"),i.textContent=`/* js */
        div#loader {
            display: flex;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: center;
            align-content: center;
        }

        div#loader h1 {
            font-family: var(--default-font);
            font-weight: normal;
            text-align: center;
            font-size: 50px;
            line-height: 0.8em;
            margin: 0 0 20px 0;
            color: #BDBCB8;

        }

        div#loader h1.fallback {
            line-height: 0.95em;
            font-size: 42px;
        }

        div#loader .spinner {
            width: 54px;
            height: 54px;
        }

        div#loader svg {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;;

            margin-bottom: 20px;
            will-change: opacity;

            animation: loaedrrotator var(--spin-duration) linear infinite;
        }

        div#loader svg .path {
            stroke: #BDBCB8;
            stroke-dasharray: 187;
            stroke-dashoffset: 0;
            transform-origin: center;
            animation: loaderdash var(--spin-duration) ease-in-out infinite;
        }

        @keyframes loaedrrotator {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(270deg); }
        }

        @keyframes loaderdash {
            0% { stroke-dashoffset: 187; }
            50% {
                stroke-dashoffset: 46.75;
                transform: rotate(135deg);
            }
            100% {
                stroke-dashoffset: 187;
                transform: rotate(450deg);
            }
        }`,_(e,"id","loader")},m(s,c){z(s,e,c),r&&r.m(e,null),B(e,n),B(e,i),t[6](e),o=!0},p(s,[c]){s[1]?r?(r.p(s,c),c&2&&P(r,1)):(r=at(s),r.c(),P(r,1),r.m(e,n)):r&&(Kt(),rt(r,1,1,()=>{r=null}),Wt())},i(s){o||(P(r),o=!0)},o(s){rt(r),o=!1},d(s){s&&$(e),r&&r.d(),t[6](null)}}}const ne="2.5s";function oe(t,e,n){const i=Ut();let o,r=!0,s=!0;const c=()=>o,d=()=>{n(1,r=!1)},a=()=>{setTimeout(()=>{i("hidden")},250)};It(()=>{document.fonts.load("1em Stylish").then(()=>{n(2,s=!1)})});function f(l){V[l?"unshift":"push"](()=>{o=l,n(0,o)})}return[o,r,s,a,c,d,f]}class re extends te{constructor(e){super(),Zt(this,e,oe,ee,Pt,{getEl:4,hide:5})}get getEl(){return this.$$.ctx[4]}get hide(){return this.$$.ctx[5]}}const xt=document.createElement("style");xt.textContent=Lt;document.head.append(xt);const ct="width=device-width, initial-scale=1.0, shrink-to-fit=no, minimal-ui, viewport-fit=cover",ft=document.querySelector("meta[viewport]");ft?ft.setAttribute("content",ct):document.head.insertAdjacentHTML("beforeend",`<meta name="viewport" content="${ct}">`);window.__webgl={events:null,start:async t=>{let e=null;t!=null&&t.cnt?e=t.cnt:(e=document.createElement("div"),e.id="app",document.body.prepend(e)),new Proxy(new URLSearchParams(window.location.search),{get:(s,c)=>s.get(c)});const n=new re({target:e}),i=(await St(()=>import("./App3D-74d81619.js"),["./App3D-74d81619.js","./App3D-fe835078.css"],import.meta.url)).default,o=new i({target:e,props:{interactionNode:t==null?void 0:t.interactionNode},...n?{anchor:n.getEl()}:{}}),r=await o.ready;return n&&await new Promise(s=>{n.$on("hidden",()=>{n.$destroy(),s()}),n.hide()}),o.loaderHidden.resolve(),r}};window.__webgl.start();export{tt as A,V as B,me as C,he as D,ce as E,Mt as F,Wt as G,Kt as H,de as I,te as S,z as a,_ as b,ie as c,$ as d,R as e,se as f,ae as g,rt as h,Zt as i,yt as j,_t as k,Ot as l,pe as m,N as n,et as o,B as p,Qt as q,E as r,Pt as s,P as t,le as u,fe as v,Xt as w,Ut as x,It as y,ue as z};
