if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const d=e=>n(e,o),l={module:{uri:o},exports:t,require:d};i[o]=Promise.all(s.map((e=>l[e]||d(e)))).then((e=>(r(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-B8l4Ny1Y.css",revision:null},{url:"assets/index-BsLSQMoO.js",revision:null},{url:"index.html",revision:"fd6bc11da1f9f00125b7524710e7b755"},{url:"registerSW.js",revision:"a2a664ec35b72c430433a98ebd76c2a9"},{url:"apple-touch-icon.png",revision:"16605b5a2313c8a7ff4ec1b4b63608d4"},{url:"android-chrome-512x512.png",revision:"dd0b6ee343bb2804c4dfdcefdc5dee29"},{url:"mstile-310x310.png",revision:"164fd3159b251b7aa5aafa0f988f13a6"},{url:"manifest.webmanifest",revision:"0011407d5c6b2fbb3214cfa0b73a449a"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
