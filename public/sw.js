if(!self.define){let e,t={};const s=(s,n)=>(s=new URL(s+".js",n).href,t[s]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=t,document.head.appendChild(e)}else e=s,importScripts(s),t()})).then((()=>{let e=t[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(t[a])return;let c={};const r=e=>s(e,a),o={module:{uri:a},exports:c,require:r};t[a]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-2e6be583"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"bd01b59863c09d8fc140dd9ef1eb1614"},{url:"/_next/static/OFlet9BIrD-w5A7potfUJ/_buildManifest.js",revision:"72e8ed314f45b52ebd4dd23304974ac2"},{url:"/_next/static/OFlet9BIrD-w5A7potfUJ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/105-b7768d1bd2f9c603.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/124-1f216fea2be32d35.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/163-153f62e307355c7f.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/357-a44010edd167196b.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/394-0c527b02257e7487.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/3c746cde-d43c59fc8d0722d1.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/41d80367-20aa17cbb13c130d.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/457-16ddd9a51e492924.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/651-7e625a3874801406.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/658-aba3c2f73172ad4f.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/695-e8cc8a079f99aa06.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/786-e6d465b7bb521e2a.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/806-c0f7021449668e43.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/833-9128f94155757268.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/89820fca-b17e8aa6ac071f4f.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/8b413569-b4a2f3c69982c852.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/956-82653c4885785baa.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/95c1909d-8afd035690352da2.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/app/_not-found-d56c3ad37c84ea88.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/app/album/%5BalbumId%5D/page-ac12ab71d07ce8fb.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/app/artist/%5BartistId%5D/page-96740614b6b884c8.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/app/layout-48c4bcbb88b50291.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/app/library/page-f3cbf6668b6b9848.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/app/library/playlists/page-2b6693ac1ae55492.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/app/library/saved-tracks/page-a668684ed33d3034.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/app/login/page-32e64b0e8c19a742.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/app/page-b94d074f5914a5e0.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/app/playlist/%5BplaylistId%5D/page-72e37b10fa3400df.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/app/profile/page-91c77c2dd7f3091e.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/app/search/page-1fa4da9131176fc4.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/app/studio/page-d97bd286ed915e44.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/ba5914e4-69b897add65d9c3e.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/d8f0f0b3-82c7fd1c7db41b0e.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/f4796409-a58216cd5cac4b14.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/f5a862d5-e66911926cabb9e2.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/f923c8e2-9806416b293f1bb1.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/framework-510ec8ffd65e1d01.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/main-a2af23138f365c63.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/main-app-52ad819391222fc5.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/pages/_app-a95d01e00cb44985.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/pages/_error-c1b63312ebbe01fb.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-833cd8fd5ca31fbc.js",revision:"OFlet9BIrD-w5A7potfUJ"},{url:"/_next/static/css/0a5e76f0c07b6d32.css",revision:"0a5e76f0c07b6d32"},{url:"/_next/static/media/392b9ab48df0b584-s.p.ttf",revision:"fe0bddb876ee3c18c1d99fdbabb6e20c"},{url:"/_next/static/media/6e03d4143383b14d-s.p.ttf",revision:"ce2a6c4154de87815e8971d21a987403"},{url:"/_next/static/media/84325db1dd350141-s.p.ttf",revision:"46d551dfd0caa61f1332d7c477f584c2"},{url:"/_next/static/media/b01877bcdfd46e46-s.p.ttf",revision:"7095d23a432c27d51c271d4df95f9cf7"},{url:"/_next/static/media/cover-fallback.ea0dfcb6.svg",revision:"cdd2032b52a8880e0bd2ca76f7d41610"},{url:"/icon-192x192.png",revision:"fc2c57a1dc5203af10ffa64105d250b2"},{url:"/icon-256x256.png",revision:"fece79e2c32c319ec355adfdc93fef69"},{url:"/icon-384x384.png",revision:"361f7e1a2d5f422c64abb93e30d8a5fb"},{url:"/icon-512x512.png",revision:"7029c1b770115e3e5b6d1ffa7bcf4855"},{url:"/manifest.json",revision:"7dc56f10447ea9507c1542b521ad1a76"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:t,event:s,state:n})=>t&&"opaqueredirect"===t.type?new Response(t.body,{status:200,statusText:"OK",headers:t.headers}):t}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const t=e.pathname;return!t.startsWith("/api/auth/")&&!!t.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
