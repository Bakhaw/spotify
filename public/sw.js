if(!self.define){let s,e={};const a=(a,i)=>(a=new URL(a+".js",i).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(i,c)=>{const t=s||("document"in self?document.currentScript.src:"")||location.href;if(e[t])return;let n={};const u=s=>a(s,t),r={module:{uri:t},exports:n,require:u};e[t]=Promise.all(i.map((s=>r[s]||u(s)))).then((s=>(c(...s),n)))}}define(["./workbox-2e6be583"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/FB1.webp",revision:"7b029cb859b3660d3b4170488aadf8ca"},{url:"/FB2.jpg",revision:"e87115a54839076cf7aa5b7585b2df86"},{url:"/FB3.jpg",revision:"deb36d7fe2dbfaeb9bfa8377ac9012f5"},{url:"/FB4.jpg",revision:"9fefe00b27f0e93a61af0c80eef8ef50"},{url:"/_next/app-build-manifest.json",revision:"c9faf9625fac0f50d8712ad209c9628e"},{url:"/_next/static/chunks/1651-4c01642680754db0.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/1970-cb17b77810efc3a7.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/2357-037f86e796cb88ca.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/2584-836863509b202672.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/2930-091aee346c90eab8.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/3663-f07d86362a6a84b0.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/37144445-aeb4e59523c4af4a.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/3905-7644062a8a86cbae.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/3c746cde-b87c0321fed8d9a1.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/41d80367-20aa17cbb13c130d.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/4724-982a1ced9bb04385.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/4838-773b85fc041af179.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/4fe418c6-18dcf2f01a5ec896.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/5137-1ac0cc2fb254969c.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/5346-1194390d4a7775af.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/6081-b8a77c31d6de71a8.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/6298-7e114bf945c003ff.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/6558-fd630b17c41830d4.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/6577-91f20dc964435d59.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/7123-96a64b8af8a4b4e0.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/7457-a28dca8105d70a3d.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/7746-f66d55ebc912342b.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/8784-642ce48afe67a2e4.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/89820fca-13bcd5b9bdf81b2c.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/8b413569-57cd5411e7c56980.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/95c1909d-4c1832b1d71d2ceb.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/9e6acbcb-5ad2c4f0cf85d271.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/app/_not-found-64215aae9934aae1.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/app/album/%5BalbumId%5D/page-d330733813373387.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/app/artist/%5BartistId%5D/page-bbe09991d7df05cc.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/app/layout-58b63621527f56b3.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/app/library/page-8add0cba220de29c.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/app/library/playlists/page-4546ac10aeab715b.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/app/library/saved-tracks/page-c81878d96f1eea96.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/app/login/page-ea6c5fea99885fc3.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/app/page-23c62e3ed148629f.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/app/playlist/%5BplaylistId%5D/page-fce2e7b45504aab4.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/app/profile/page-cfb34f7f41d8b537.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/app/search/page-c1786499a690b623.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/app/studio/page-2297fc3b8d42c063.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/app/user/%5BuserId%5D/page-d749af380314210f.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/ba5914e4-b147acfa3674130e.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/c94be943-7e1b5950817e7655.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/d8f0f0b3-fb0b2dd7a9a2e45d.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/f4796409-4e59823c1169a05d.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/f5a862d5-e4deea8dd452857d.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/f923c8e2-7d78fe0691951109.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/framework-1b14094c1d20e16b.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/main-306d6c44d8dcdea2.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/main-app-991de4461e7cf2c0.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/pages/_app-d5cad537a8a35c4e.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/pages/_error-6e4b50dbca3931ab.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-0fa0caf902da63a7.js",revision:"s3sUl5YbZu1HPPRo-WRpb"},{url:"/_next/static/css/e5fc960417c713aa.css",revision:"e5fc960417c713aa"},{url:"/_next/static/media/392b9ab48df0b584-s.p.ttf",revision:"fe0bddb876ee3c18c1d99fdbabb6e20c"},{url:"/_next/static/media/6e03d4143383b14d-s.p.ttf",revision:"ce2a6c4154de87815e8971d21a987403"},{url:"/_next/static/media/84325db1dd350141-s.p.ttf",revision:"46d551dfd0caa61f1332d7c477f584c2"},{url:"/_next/static/media/FB1.78841f14.webp",revision:"7b029cb859b3660d3b4170488aadf8ca"},{url:"/_next/static/media/FB2.297668d7.jpg",revision:"e87115a54839076cf7aa5b7585b2df86"},{url:"/_next/static/media/FB3.976ebeb6.jpg",revision:"deb36d7fe2dbfaeb9bfa8377ac9012f5"},{url:"/_next/static/media/FB4.1f81ae99.jpg",revision:"9fefe00b27f0e93a61af0c80eef8ef50"},{url:"/_next/static/media/b01877bcdfd46e46-s.p.ttf",revision:"7095d23a432c27d51c271d4df95f9cf7"},{url:"/_next/static/media/cover-fallback.ea0dfcb6.svg",revision:"cdd2032b52a8880e0bd2ca76f7d41610"},{url:"/_next/static/media/disqueDiamant.7345a4bb.svg",revision:"8a46c538ea3261fd6a1000a359eea9b6"},{url:"/_next/static/media/disqueOr.a8272cb8.svg",revision:"e2bc062cee40cf6a530a47064b18070c"},{url:"/_next/static/media/disquePlatine.d8a83a45.svg",revision:"93e570601f07ffa8ebad6c5a68f31a8a"},{url:"/_next/static/media/spotify-icon.be39a6c1.svg",revision:"c259ecab9f22cf6dc518c2f3995465c5"},{url:"/_next/static/media/youtube-icon.004fcb4b.svg",revision:"7a44696754509db83fd9e8cae4d62e88"},{url:"/_next/static/s3sUl5YbZu1HPPRo-WRpb/_buildManifest.js",revision:"14a228225df19586dc38af319da4732f"},{url:"/_next/static/s3sUl5YbZu1HPPRo-WRpb/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/icon-192x192.png",revision:"fc2c57a1dc5203af10ffa64105d250b2"},{url:"/icon-256x256.png",revision:"fece79e2c32c319ec355adfdc93fef69"},{url:"/icon-384x384.png",revision:"361f7e1a2d5f422c64abb93e30d8a5fb"},{url:"/icon-512x512.png",revision:"7029c1b770115e3e5b6d1ffa7bcf4855"},{url:"/manifest.json",revision:"0cc9128ce42994d6fa5f4e3f2f21ffa2"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:a,state:i})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
