(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[483],{2239:function(e,t,r){"use strict";var n,o=r(7294);function s(){return(s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var a=(0,o.memo)(function(e){return o.createElement("svg",s({viewBox:"0 0 41 21",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e),n||(n=o.createElement("path",{d:"m36 6.6.1 2V20h4V6.6h-4Zm0-1.9h4.3v-4H36v4ZM21.2 6.6l.1 2.3V20h4.3l-.2-7c0-2.7 1.7-3.1 2.8-3.1 1.7 0 1.9 1.2 1.9 2.6V20h4l-.1-9c0-3.3-1.8-4.6-4-4.6-1.9 0-3.2.7-4.5 1.8h-.3V6.6h-4ZM0 .6V20h4.2V.7H0Zm14.9 6v6.1c.1 3-1.2 3.6-2.6 3.6-1.9 0-1.8-1.4-1.8-3V6.7h-4V15c0 3.7 1.8 5.3 4.1 5.3 1.7 0 2.9-.8 4.1-2h.4l.2 1.6h3.6l-.1-3.6V6.6h-4Z",fill:"#292929"})))});t.Z=a},428:function(e,t,r){"use strict";r.d(t,{r:function(){return l}});var n=r(5893),o=r(1664),s=r.n(o),a=r(7294);let i=["?demo=true"],l=(0,a.forwardRef)((e,t)=>{let{href:r,children:o,className:a,shallow:l,...c}=e,u={ref:t,className:a,...c},d=(null==r?void 0:r.startsWith("mailto:"))||(null==r?void 0:r.startsWith("tel:")),m=!!i.find(e=>null==r?void 0:r.includes(e)),h=null==r?void 0:r.startsWith("http");return"string"!=typeof r?(0,n.jsx)("button",{...u,children:o}):(0,n.jsx)(s(),{href:r,shallow:m||l,...d||h?{target:"_blank",rel:"noopener noreferrer"}:{},...u,children:o})});l.displayName="Link"},6304:function(e,t,r){"use strict";r.d(t,{A:function(){return ee}});var n,o,s,a,i,l,c,u,d,m,h,p,f,v=r(5893),x=r(6010),g=r(6038),j=r(585),k=r(7294),_=r(6248),w=r(6838),b=r.n(w);function C(){let e=(0,k.useRef)(),t=(0,k.useRef)(),r=(0,k.useRef)(!1),[n,o]=(0,k.useState)(!1),[s,a]=(0,k.useState)(!1),[i,l]=(0,k.useState)(!1),[c,u]=(0,j.o)(e=>[e.elementHover,e.setElementHover],_.X);(0,k.useEffect)(()=>{let e;let n=()=>{r.current&&t.current&&g.ZP.to(t.current,{rotationZ:0}),e=requestAnimationFrame(n)};return n(),()=>{cancelAnimationFrame(e)}});let d=null,m=(0,k.useCallback)(r=>{let{clientX:n,clientY:o}=r;g.ZP.to(e.current,{x:n,y:o,duration:i?.6:0,ease:"expo.out"}),l(!0),null!==d&&o!==d&&(o<d?t.current&&g.ZP.to(t.current,{duration:1.5,rotationZ:.1*o+"deg"}):t.current&&g.ZP.to(t.current,{duration:1.5,rotationZ:-(.1*o)+"deg"})),d=o},[i]);return(0,k.useEffect)(()=>{""!=c?(r.current=!0,(null==t?void 0:t.current)&&g.ZP.from(null==t?void 0:t.current,{duration:.25,scale:0,ease:"elastic.out(1, 1)"}),a(!0)):(r.current=!1,(null==t?void 0:t.current)&&g.ZP.set(null==t?void 0:t.current,{scale:1}),a(!1))},[c]),(0,k.useEffect)(()=>{let e=e=>{let t=window.getComputedStyle(e.target).getPropertyValue("cursor");"pointer"!==t||s||a(!0),"pointer"!==t&&s&&a(!1)};return window.addEventListener("mouseover",e,!1),window.addEventListener("mousemove",m,!1),()=>{window.removeEventListener("mouseover",e,!1),window.removeEventListener("mousemove",m,!1)}},[i]),(0,k.useEffect)(()=>(document.documentElement.classList.add("has-custom-cursor"),()=>{document.documentElement.classList.remove("has-custom-cursor")}),[]),(0,k.useEffect)(()=>{let e=[],t=()=>{a(!0)},r=()=>{a(!1)};return(e=[...document.querySelectorAll("button,a,input,label,[data-cursor='pointer']")]).forEach(e=>{e.addEventListener("mouseenter",t,!1),e.addEventListener("mouseleave",r,!1)}),()=>{e.forEach(e=>{e.removeEventListener("mouseenter",t,!1),e.removeEventListener("mouseleave",r,!1)})}},[]),(0,k.useEffect)(()=>{let e=[],t=()=>{o(!0)},r=()=>{o(!1)};return(e=[...document.querySelectorAll("button,a,input,label,[data-cursor='pointer']")]).forEach(e=>{e.addEventListener("mouseenter",t,!1),e.addEventListener("mouseleave",r,!1)}),()=>{e.forEach(e=>{e.removeEventListener("mouseenter",t,!1),e.removeEventListener("mouseleave",r,!1)})}},[]),(0,v.jsx)("div",{style:{opacity:i?1:0},className:b().container,children:(0,v.jsxs)("div",{ref:e,children:[(0,v.jsx)("div",{className:(0,x.Z)(b().cursor,n&&b().grab,s&&b().pointer)}),["omada","spark","coach","kitchenLab"].includes(c)?(0,v.jsx)("div",{className:b().title,ref:t,style:{background:"omada"===c?"var(--cyan)":"spark"===c?"var(--lime)":"coach"===c?"var(--lavander)":"kitchenLab"===c?"var(--orange)":null},children:"kitchenLab"===c?"lab":"coach"===c?"coach+":c}):null]})})}var E=r(2962),Z=r(9008),L=r.n(Z);function y(e){let{title:t="",description:r,image:n,keywords:o}=e;return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)(L(),{children:[(0,v.jsx)("meta",{httpEquiv:"x-ua-compatible",content:"ie=edge"}),(0,v.jsx)("meta",{name:"robots",content:"index,follow"}),(0,v.jsx)("meta",{name:"googlebot",content:"index,follow"}),(0,v.jsx)("meta",{name:"keywords",content:o&&o.length?o.join(","):o}),(0,v.jsx)("meta",{name:"author",content:"Studio Freight"}),(0,v.jsx)("meta",{name:"referrer",content:"no-referrer"}),(0,v.jsx)("meta",{name:"format-detection",content:"telephone=no"}),(0,v.jsx)("meta",{httpEquiv:"x-dns-prefetch-control",content:"off"}),(0,v.jsx)("meta",{httpEquiv:"Window-Target",content:"_value"}),(0,v.jsx)("meta",{name:"geo.region",content:"US"}),(0,v.jsx)("meta",{property:"og:image",itemprop:"image",content:"/preview.png"}),(0,v.jsx)("meta",{property:"twitter:image",itemprop:"image",content:"/preview.png"}),(0,v.jsx)("link",{rel:"manifest",href:"/site.webmanifest"}),(0,v.jsx)("link",{rel:"apple-touch-icon",sizes:"180x180",href:"/apple-touch-icon.png"}),(0,v.jsx)("link",{rel:"icon",type:"image/png",sizes:"32x32",href:"/favicon-32x32.png"}),(0,v.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"/favicon-16x16.png"}),(0,v.jsx)("link",{rel:"manifest",href:"/site.webmanifest"}),(0,v.jsx)("link",{rel:"mask-icon",href:"/safari-pinned-tab.svg",color:"#292929"}),(0,v.jsx)("meta",{name:"msapplication-TileColor",content:"#292929"}),(0,v.jsx)("meta",{name:"theme-color",content:"#292929"}),(0,v.jsx)("link",{rel:"icon",href:"/favicon.ico"}),(0,v.jsx)("title",{children:t})]}),(0,v.jsx)(E.PB,{title:t,description:r,openGraph:{title:t,description:r,type:"website",locale:"en_US",images:[{url:n?n.url:"/preview.png",width:n?n.width:1200,height:n?n.height:630,alt:t}],defaultImageWidth:1200,defaultImageHeight:630,site_name:""},twitter:{handle:"@Luni_app",cardType:"summary_large_image"}})]})}var M=r(8965),W=r.n(M);function N(){return(0,v.jsx)("footer",{className:W().footer,children:(0,v.jsx)("div",{className:"layout-block",children:(0,v.jsx)("h2",{})})})}var F=r(6942),R=r.n(F),P=r(2239);function V(){return(V=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var S=(0,k.memo)(function(e){return k.createElement("svg",V({viewBox:"0 0 988 358",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e),n||(n=k.createElement("path",{d:"M584.4 270.3c-47.3 60.1-107.8 31.9-126-10C361.6 67.5 440 10.3 500 12.8c140.7 5.8 143.5 182.4 84.4 257.5Z",fill:"#B7F452",stroke:"#292929",strokeWidth:3.3})),o||(o=k.createElement("path",{d:"M524.7 213.6c7.7-18 20.2-65.1 8.5-109.5",stroke:"#292929",strokeWidth:3.3,strokeLinecap:"round"})),s||(s=k.createElement("path",{d:"M625.7 270.3c49.6 60.1 113.2 31.9 132.3-10 101.6-192.8 19.3-250-43.7-247.5-147.6 5.8-150.6 182.4-88.6 257.5Z",fill:"#B7F452",stroke:"#292929",strokeWidth:3.3})),a||(a=k.createElement("path",{d:"M683.9 104c8 18 21.1 65.2 8.8 109.6",stroke:"#292929",strokeWidth:3.3,strokeLinecap:"round"})),i||(i=k.createElement("path",{d:"M805.6 47.3c49.6-60.1 113.2-31.9 132.3 10 101.6 192.8 19.2 250-43.7 247.5-147.7-5.8-150.6-182.3-88.6-257.5Z",fill:"#B7F452",stroke:"#292929",strokeWidth:3.3})),l||(l=k.createElement("path",{d:"M863.7 213.6c8-18 21.2-65.1 8.9-109.5",stroke:"#292929",strokeWidth:3.3,strokeLinecap:"round"})),c||(c=k.createElement("mask",{id:"a",fill:"white"},k.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M231.6 302c-15.4-2.1-36.4-16.4-58.5-38.7-5.8 34.4-20 58.4-40 61.7-33.7 5.5-71.1-50.3-83.4-124.8-12.4-74.5 5-139.4 38.8-145 2.7-.4 5.4-.5 8-.2 15.4.9 37.2 15 60.2 38 5.9-33.9 20-57.4 39.7-60.7 33.8-5.6 71.2 50.3 83.5 124.7 12.4 74.5-5 139.4-38.8 145-3.1.5-6.3.5-9.5 0Z"}))),u||(u=k.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M231.6 302c-15.4-2.1-36.4-16.4-58.5-38.7-5.8 34.4-20 58.4-40 61.7-33.7 5.5-71.1-50.3-83.4-124.8-12.4-74.5 5-139.4 38.8-145 2.7-.4 5.4-.5 8-.2 15.4.9 37.2 15 60.2 38 5.9-33.9 20-57.4 39.7-60.7 33.8-5.6 71.2 50.3 83.5 124.7 12.4 74.5-5 139.4-38.8 145-3.1.5-6.3.5-9.5 0Z",fill:"#B7F452"})),d||(d=k.createElement("path",{d:"m231.6 302 .5-3-.5 3Zm-58.5-38.7 2.2-2.1-4.2-4.3-1 6 3 .4Zm-123.4-63 3-.6-3 .5Zm38.8-145-.5-3.1.5 3Zm8-.3-.3 3h.1v.1l.3-3Zm60.2 38-2.2 2.2 4.2 4.2 1-5.9-3-.5Zm39.7-60.7.5 3-.5-3ZM280 157l-3 .5 3-.5Zm-48 142c-7-1-15.7-4.8-25.4-11.3a206.2 206.2 0 0 1-31.3-26.5l-4.4 4.3a214.2 214.2 0 0 0 32.3 27.3 71.7 71.7 0 0 0 28 12.3l.8-6.1Zm-62-36.2c-2.8 17-7.7 31.1-14.2 41.4-6.4 10.2-14.3 16.3-23.1 17.7l1 6c11-1.8 20.3-9.3 27.3-20.5 7-11.1 12.2-26.1 15.1-43.6l-6-1ZM132.8 322c-15 2.5-31.8-8.6-46.8-31-14.8-22.1-27-54.3-33.2-91.2l-6 1c6.2 37.6 18.7 70.6 34.1 93.6 15.3 22.8 34 36.8 52.9 33.7l-1-6Zm-80-122.2a239.8 239.8 0 0 1 2-97c7-26 19.3-42 34.3-44.4l-1-6.1c-18.8 3.1-32 22.4-39.2 48.9-7.1 26.7-8.4 62-2.2 99.6l6.1-1ZM89 58.3a26 26 0 0 1 7.2-.2L97 52c-3-.4-6-.3-8.9.2l1 6Zm7.4-.2c6.9.4 15.6 3.8 25.7 10.2 10 6.4 21 15.5 32.4 26.9l4.3-4.4c-11.6-11.6-23-21-33.4-27.7A63 63 0 0 0 96.7 52l-.3 6.1Zm63.3 35.4a112 112 0 0 1 14.2-40.7c6.5-10 14.3-16 23-17.5l-1-6c-11 1.8-20.1 9.2-27.1 20.2a118 118 0 0 0-15.2 43l6 1Zm37.2-58.2c15-2.5 31.8 8.7 46.8 31 14.8 22.2 27 54.3 33.2 91.2l6-1c-6.1-37.5-18.6-70.5-34-93.5-15.3-22.7-34-36.7-52.9-33.6l1 6Zm80 122.2c6.1 37 4.8 71.3-2 97-7 26-19.3 42-34.3 44.5l1 6c18.8-3 32-22.4 39.2-48.8 7.1-26.8 8.4-62 2.2-99.7l-6.1 1ZM240.6 299c-2.8.5-5.6.5-8.5 0l-1 6c3.5.6 7 .6 10.5 0l-1-6Z",fill:"#292929",mask:"url(#a)"})),m||(m=k.createElement("path",{d:"M177.9 127c-7-14.8-17.3-27.5-22.3-32",stroke:"#292929",strokeWidth:3.1})),h||(h=k.createElement("path",{d:"M171.8 259.3c-9.5-12-16.8-25.2-19.2-30.7",stroke:"#292929",strokeWidth:3.1})),p||(p=k.createElement("path",{d:"M421.6 56.7c-50.3-60.1-114.9-31.9-134.3 10-103 192.8-19.5 250 44.4 247.5 149.9-5.8 152.9-182.3 90-257.5Z",fill:"#B7F452",stroke:"#292929",strokeWidth:3.3})),f||(f=k.createElement("path",{d:"M358 113.5c8.2 18 21.5 65 9 109.5",stroke:"#292929",strokeWidth:3.3,strokeLinecap:"round"})))});function O(e){let{}=e;return(0,v.jsxs)("div",{className:R()["not-supported"],children:[(0,v.jsx)(P.Z,{className:R().logo}),(0,v.jsx)(S,{}),(0,v.jsxs)("p",{className:"subtitle ".concat(R().text),children:["Are you comingback? ",(0,v.jsx)("br",{}),"Pinky promise?"]}),(0,v.jsxs)("p",{className:"paragraph ".concat(R().text),children:["Your browser is not compatible with the website's webgl version.",(0,v.jsx)("br",{}),"Please update your browser for optimal site performance."]})]})}var B=r(1110),I=r.n(B);function A(e){let{}=e;return(0,v.jsx)("div",{className:I().background,children:(0,v.jsx)("div",{className:I().radial})})}var H=r(1163),q=r(6935),D=r.n(q);function T(e){let{}=e,[t,r]=(0,j.o)(e=>[e.firstView,e.setFirstView]),[n,o]=(0,j.o)(e=>[e.isLoaded,e.setIsLoaded]),[s,a]=(0,j.o)(e=>[e.isFirstPodLoaded,e.setIsFirstPodLoaded]),i=(0,k.useRef)(null),l=(0,k.useRef)([]),c=(0,k.useRef)(null),[u,d]=(0,k.useState)(0),m=(0,k.useRef)(0),h=(0,k.useRef)(!1),p=(0,H.useRouter)();return(0,k.useEffect)(()=>{s&&c.current&&("/[slug]"!=p.pathname?c.current.duration(1):c.current.duration(2)),h.current=s},[s]),(0,k.useEffect)(()=>{c.current=g.ZP.timeline();for(let e=0;e<l.current.length;e++)c.current.to(l.current[e],{duration:.5,fill:"#292929",ease:"power3.in",onComplete:()=>{3==e&&g.ZP.to(i.current,{duration:1.5,opacity:0,onComplete:()=>{o(!0)}})},onUpdate:()=>{d(Math.floor(100*c.current.progress())),u>m.current&&(m.current=u)}},e);return()=>{c.current.kill()}},[]),t&&!n&&(0,v.jsxs)("div",{className:D().loader,ref:i,children:[(0,v.jsx)(A,{}),(0,v.jsx)("div",{className:D().percent,children:u}),(0,v.jsx)("p",{className:D().sentence,children:"Creation of the Luniverse..."}),(0,v.jsxs)("svg",{width:"109",height:"108",viewBox:"0 0 109 108",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,v.jsx)("mask",{fill:"white",children:(0,v.jsx)("path",{d:"M93.8868 9.47229C98.845 18.0685 104.379 30.0487 107.857 39.4397C108.764 42.0384 106.955 46.4248 103.539 43.814C90.8616 33.4638 88.4355 26.0625 88.2246 11.4095C88.2139 9.03983 91.2834 5.01859 93.8868 9.47229Z"})}),(0,v.jsx)("path",{ref:e=>l.current.push(e),d:"M93.8868 9.47229C98.845 18.0685 104.379 30.0487 107.857 39.4397C108.764 42.0384 106.955 46.4248 103.539 43.814C90.8616 33.4638 88.4355 26.0625 88.2246 11.4095C88.2139 9.03983 91.2834 5.01859 93.8868 9.47229Z",stroke:"#292929",strokeWidth:"1",mask:"url(#path-3-inside-3_3590_38681)"}),(0,v.jsx)("mask",{fill:"white",children:(0,v.jsx)("path",{d:"M88.9015 66.7846C90.4785 53.2875 92.8226 48.7988 104.491 52.9507C108.272 54.2952 109.082 57.4515 107.842 60.4476C101.945 74.6695 89.9358 97.7476 84.8715 100.997C80.2437 103.973 57.6288 106.815 41.9468 107.194C37.08 107.312 32.8029 103.059 37.5381 97.8756L59.8856 71.6344C70.0949 59.6447 80.1698 60.453 83.9312 79.1785L84.6028 82.5463C85.1402 85.3754 86.7521 85.2407 87.0208 82.5463L88.9015 66.7846Z"})}),(0,v.jsx)("path",{ref:e=>l.current.push(e),d:"M88.9015 66.7846C90.4785 53.2875 92.8226 48.7988 104.491 52.9507C108.272 54.2952 109.082 57.4515 107.842 60.4476C101.945 74.6695 89.9358 97.7476 84.8715 100.997C80.2437 103.973 57.6288 106.815 41.9468 107.194C37.08 107.312 32.8029 103.059 37.5381 97.8756L59.8856 71.6344C70.0949 59.6447 80.1698 60.453 83.9312 79.1785L84.6028 82.5463C85.1402 85.3754 86.7521 85.2407 87.0208 82.5463L88.9015 66.7846Z",stroke:"#292929",strokeWidth:"1",mask:"url(#path-2-inside-2_3590_38681)"}),(0,v.jsx)("mask",{fill:"white",children:(0,v.jsx)("path",{d:"M30.0632 49.5407L6.44888 55.1395C-0.348353 56.7292 -1.14495 60.6858 1.17632 66.065C5.07197 75.0909 12.3837 87.0092 18.3239 95.5812C21.4995 100.161 27.5673 101.239 31.3031 95.3225L49.8101 66.2455C58.4074 52.6392 53.0341 44.1521 30.0632 49.5407Z"})}),(0,v.jsx)("path",{ref:e=>l.current.push(e),d:"M30.0632 49.5407L6.44888 55.1395C-0.348353 56.7292 -1.14495 60.6858 1.17632 66.065C5.07197 75.0909 12.3837 87.0092 18.3239 95.5812C21.4995 100.161 27.5673 101.239 31.3031 95.3225L49.8101 66.2455C58.4074 52.6392 53.0341 44.1521 30.0632 49.5407Z",stroke:"#292929",strokeWidth:"1",mask:"url(#path-1-inside-1_3590_38681)"}),(0,v.jsx)("mask",{fill:"white",children:(0,v.jsx)("path",{d:"M35.0323 39.8413L7.30874 49.2284C2.28739 50.9285 1.01522 46.9974 3.54067 42.5868C11.8236 28.6896 26.2886 8.92682 31.1366 6.16245C35.8289 3.487 57.7157 0.496321 73.1196 0.0019146C78.3518 -0.064096 83.7144 1.57 82.1951 5.96038C77.3954 19.8523 70.9313 20.7926 53.9732 13.8412L50.3462 12.3594C47.7939 11.2816 46.7192 13.0329 48.5999 14.919L51.0178 17.3438C59.0778 25.4268 62.4361 30.546 35.0323 39.8413Z"})}),(0,v.jsx)("path",{ref:e=>l.current.push(e),d:"M35.0323 39.8413L7.30874 49.2284C2.28739 50.9285 1.01522 46.9974 3.54067 42.5868C11.8236 28.6896 26.2886 8.92682 31.1366 6.16245C35.8289 3.487 57.7157 0.496321 73.1196 0.0019146C78.3518 -0.064096 83.7144 1.57 82.1951 5.96038C77.3954 19.8523 70.9313 20.7926 53.9732 13.8412L50.3462 12.3594C47.7939 11.2816 46.7192 13.0329 48.5999 14.919L51.0178 17.3438C59.0778 25.4268 62.4361 30.546 35.0323 39.8413Z",stroke:"#292929",strokeWidth:"1",mask:"url(#path-4-inside-4_3590_38681)"})]})]})}var U=r(1425),X=r(4428),z=r(1764),G=r(6018),K=r(7666),Y=r.n(K);function J(e){let{}=e,t=(0,k.useRef)(),{height:r}=(0,G.Z)(),[n,{height:o}]=(0,U.EL)(),[s,{height:a}]=(0,U.EL)(),i=(0,X.LZ)(e=>{let{scroll:r,limit:n}=e;t.current.style.transform="translate3d(0,".concat(r/n*(o-a),"px,0)")}),[l,c]=(0,k.useState)(!1),[u,d]=(0,k.useState)({progress:0,y:0}),m=(0,k.useCallback)(e=>{if(!l)return;e.preventDefault();let t=u.progress,r=u.y,n=e.clientY-r,s=(0,z.uZ)(0,t+n/o,1);i.scrollTo(s*i.limit,{immediate:!0}),i.isScrolling=!1},[i,l,r,o,u]),h=(0,k.useCallback)(()=>{c(!1)},[]);return(0,k.useEffect)(()=>(window.addEventListener("pointermove",m,!1),window.addEventListener("pointerup",h,!1),()=>{window.removeEventListener("pointermove",m,!1),window.removeEventListener("pointerup",h,!1)}),[m,h]),(0,v.jsx)("div",{className:Y().scrollbar,children:(0,v.jsx)("div",{ref:n,className:Y().inner,children:(0,v.jsx)("div",{className:Y().thumb,ref:e=>{t.current=e,s(e)},onPointerDown:e=>{c(!0),d({progress:i.progress,y:e.clientY})}})})})}var Q=r(4104),$=r.n(Q);function ee(e){let{seo:t={title:"",description:"",image:"",keywords:""},children:r,theme:n="light",className:o}=e,[s,a]=(0,j.o)(e=>[e.labIsOpen,e.setLabIsOpen],_.X),[i,l]=(0,j.o)(e=>[e.homeIsOpen,e.setHomeIsOpen],_.X),c=(0,k.useRef)(!1);return(0,k.useEffect)(()=>{"undefined"==typeof WebGL2RenderingContext?c.current=!0:c.current=!1},[]),(0,v.jsxs)(v.Fragment,{children:[!0==c.current&&(0,v.jsx)(O,{}),(0,v.jsx)(y,{...t}),(0,v.jsxs)("div",{className:(0,x.Z)("theme-".concat(n),$().layout,o),children:[(0,v.jsx)(C,{}),(0,v.jsx)(J,{}),(0,v.jsx)("main",{className:$().main,children:r}),(0,v.jsx)(N,{}),i&&(0,v.jsx)(T,{})]})]})}},1764:function(e,t,r){"use strict";function n(e,t,r){return Math.max(e,Math.min(t,r))}function o(e,t,r,n,o){return(r-e)*(o-n)/(t-e)+n}function s(e,t,r){var n=Math.max(0,Math.min(1,(r-e)/(t-e)));return n*n*(3-2*n)}r.d(t,{CW:function(){return s},KK:function(){return o},uZ:function(){return n}})},1110:function(e){e.exports={background:"background_background__2nFag",radial:"background_radial__nDBA4"}},6838:function(e){e.exports={container:"cursor_container__x_n9C",cursor:"cursor_cursor__Gs2Iw",pointer:"cursor_pointer__W7e1H",title:"cursor_title__Rnnwh"}},8965:function(e){e.exports={footer:"footer_footer__LV2HF"}},6942:function(e){e.exports={"not-supported":"gl-not-supported_not-supported__DWa_o",text:"gl-not-supported_text__FyuSa",logo:"gl-not-supported_logo__1VHOe"}},6935:function(e){e.exports={loader:"loader_loader__hkoAF",percent:"loader_percent__Ja_Id",sentence:"loader_sentence__3qEFn"}},7666:function(e){e.exports={scrollbar:"scrollbar_scrollbar__Cli_4",inner:"scrollbar_inner__gfDqZ",thumb:"scrollbar_thumb__vmS2h"}},4104:function(e){e.exports={layout:"layout_layout__KUVXp",main:"layout_main__jba1g"}}}]);