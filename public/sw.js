if(!self.define){let e,t={};const s=(s,n)=>(s=new URL(s+".js",n).href,t[s]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=t,document.head.appendChild(e)}else e=s,importScripts(s),t()})).then((()=>{let e=t[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(t[i])return;let c={};const r=e=>s(e,i),u={module:{uri:i},exports:c,require:r};t[i]=Promise.all(n.map((e=>u[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-2e6be583"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"756caea8e67618762dd1b0f44ad4d5c3"},{url:"/_next/static/Q7nJUtetvh5UUIBHuIS-C/_buildManifest.js",revision:"72e8ed314f45b52ebd4dd23304974ac2"},{url:"/_next/static/Q7nJUtetvh5UUIBHuIS-C/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/105-28b1778d164aba2d.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/160-a46612f8c92e5e98.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/294-4c4a42091a2e7887.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/329-6130296f1dd23456.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/357-00a05159f56e1d29.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/41d80367-6ead6c4f87542947.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/651-224adbad609a0480.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/713-165e401830f6e643.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/760-d9025958776de558.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/8-aa7e8ac415b0e6e0.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/89820fca-fbeb9c7568a29324.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/898f153c-baf879cd82446738.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/8b413569-b4a2f3c69982c852.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/95c1909d-737cc9dee5b0b241.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/961-bf46e2e3b92c7eeb.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/999-4321a27f6c73d71b.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/app/_not-found-25f6a087b0e205d4.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/app/album/%5BalbumId%5D/page-5851357fbc3dff8e.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/app/artist/%5BartistId%5D/page-62f45f980f5547c0.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/app/layout-b8c7e073ef9d608b.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/app/library/page-97493a9eb75eb1bb.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/app/library/playlists/page-fc0ca5703bf67ee6.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/app/library/saved-tracks/page-1a4b7cd5a452dc0d.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/app/login/page-5081a1a2d0504927.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/app/page-97687ac3a6eb6901.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/app/playlist/%5BplaylistId%5D/page-6bfc47942b5e3832.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/app/profile/page-22ba1882994b7e95.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/app/studio/page-21a244d0706b3414.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/ba5914e4-69b897add65d9c3e.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/d8f0f0b3-82c7fd1c7db41b0e.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/f923c8e2-be20d9c8fcc1a2d6.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/framework-510ec8ffd65e1d01.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/main-13581edd098003c9.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/main-app-82d67a6044e27711.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/pages/_app-a95d01e00cb44985.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/pages/_error-c1b63312ebbe01fb.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-a7d40c7c2d1dab9a.js",revision:"Q7nJUtetvh5UUIBHuIS-C"},{url:"/_next/static/css/a9666763fd10854c.css",revision:"a9666763fd10854c"},{url:"/_next/static/css/e46aeb8c2b3794c6.css",revision:"e46aeb8c2b3794c6"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/cover-fallback.ea0dfcb6.svg",revision:"cdd2032b52a8880e0bd2ca76f7d41610"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:t,event:s,state:n})=>t&&"opaqueredirect"===t.type?new Response(t.body,{status:200,statusText:"OK",headers:t.headers}):t}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const t=e.pathname;return!t.startsWith("/api/auth/")&&!!t.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
