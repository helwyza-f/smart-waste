if (!self.define) {
  let e,
    s = {};
  const a = (a, t) => (
    (a = new URL(a + ".js", t).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (t, n) => {
    const i =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[i]) return;
    let c = {};
    const u = (e) => a(e, i),
      r = { module: { uri: i }, exports: c, require: u };
    s[i] = Promise.all(t.map((e) => r[e] || u(e))).then((e) => (n(...e), c));
  };
}
define(["./workbox-c2c0676f"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/chunks/153-37106bc7cdbedc13.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/294.e72d2554be082393.js",
          revision: "e72d2554be082393",
        },
        {
          url: "/_next/static/chunks/300.7e6a8f6b8ea5445d.js",
          revision: "7e6a8f6b8ea5445d",
        },
        {
          url: "/_next/static/chunks/341.2903e54d3da731c1.js",
          revision: "2903e54d3da731c1",
        },
        {
          url: "/_next/static/chunks/472.a3826d29d6854395.js",
          revision: "a3826d29d6854395",
        },
        {
          url: "/_next/static/chunks/4bd1b696-ea82a830fa0f846e.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/676-59fa8fcc7d4f7917.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/690-7723f1a2fd002ba6.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/84-eab4486d422b4120.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/845-11d5ebf77a0f12f2.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/874-bc1b0d0fe5be7194.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/942-cbef380caca95712.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/app/(auth)/account/update-password/page-6a4af215cd11d754.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/app/(auth)/auth/callback/route-0fb02e4d51ce435b.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/app/(auth)/auth/confirm/route-68cbc8fa54443784.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/app/(auth)/error/page-df48454f278f5ef8.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/app/(auth)/login/page-cd2c653ac4a52225.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/app/(auth)/reset-password/page-79a83a34d3ed8789.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/app/(auth)/signup/page-1a548fa7c4c5a839.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-cbabda820481ab35.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/app/dashboard/page-a01af7790e668f67.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/app/laporkan-sampah/layout-3f4d6f7bb2b89aab.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/app/laporkan-sampah/page-3ffcb1b2e094f619.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/app/layout-736353c145cc665c.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/app/page-5ef057c0b855b4e2.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/d0deef33.71a275ebfc5f6938.js",
          revision: "71a275ebfc5f6938",
        },
        {
          url: "/_next/static/chunks/fc2f6fa8-f66e1488fc192822.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/framework-859199dea06580b0.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/main-app-be18f36021105b02.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/main-c25c6ce55da7b6b4.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/pages/_app-a66f9296699c5863.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/pages/_error-7688f4c9a69e67c8.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-f7ad8bba870e984e.js",
          revision: "u0fjQVWBIuqJtZhHlTVd0",
        },
        {
          url: "/_next/static/css/1de76be520b4de19.css",
          revision: "1de76be520b4de19",
        },
        {
          url: "/_next/static/css/6d4849d6859cfbe7.css",
          revision: "6d4849d6859cfbe7",
        },
        {
          url: "/_next/static/media/569ce4b8f30dc480-s.p.woff2",
          revision: "ef6cefb32024deac234e82f932a95cbd",
        },
        {
          url: "/_next/static/media/747892c23ea88013-s.woff2",
          revision: "a0761690ccf4441ace5cec893b82d4ab",
        },
        {
          url: "/_next/static/media/93f479601ee12b01-s.p.woff2",
          revision: "da83d5f06d825c5ae65b7cca706cb312",
        },
        {
          url: "/_next/static/media/ba015fad6dcf6784-s.woff2",
          revision: "8ea4f719af3312a055caf09f34c89a77",
        },
        {
          url: "/_next/static/media/layers-2x.9859cd12.png",
          revision: "9859cd12",
        },
        {
          url: "/_next/static/media/layers.ef6db872.png",
          revision: "ef6db872",
        },
        {
          url: "/_next/static/media/marker-icon.d577052a.png",
          revision: "d577052a",
        },
        {
          url: "/_next/static/u0fjQVWBIuqJtZhHlTVd0/_buildManifest.js",
          revision: "d48ddfd369631c21a905ef02699cfe92",
        },
        {
          url: "/_next/static/u0fjQVWBIuqJtZhHlTVd0/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        { url: "/file.svg", revision: "d09f95206c3fa0bb9bd9fefabfd0ea71" },
        { url: "/globe.svg", revision: "2aaafa6a49b6563925fe440891e32717" },
        {
          url: "/icons/android-chrome-192x192.png",
          revision: "38618f69009f9520c0020c1969c22051",
        },
        {
          url: "/icons/icon-512x512.png",
          revision: "6e47b5675cfb26208a558f4a92f6bd75",
        },
        { url: "/manifest.json", revision: "488f2098915eccbc8fc0c4928d570c64" },
        { url: "/marker.png", revision: "8128018d9a45943bfe6991738c47013b" },
        { url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
        { url: "/vercel.svg", revision: "c0af2f507b369b085b35ef4bbe3bcf1e" },
        { url: "/window.svg", revision: "a2760511c65806022ad20adf74370ff3" },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: function (e) {
              return _ref.apply(this, arguments);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: "next-static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var s = e.sameOrigin,
          a = e.url.pathname;
        return !(
          !s ||
          a.startsWith("/api/auth/callback") ||
          !a.startsWith("/api/")
        );
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var s = e.request,
          a = e.url.pathname,
          t = e.sameOrigin;
        return (
          "1" === s.headers.get("RSC") &&
          "1" === s.headers.get("Next-Router-Prefetch") &&
          t &&
          !a.startsWith("/api/")
        );
      },
      new e.NetworkFirst({
        cacheName: "pages-rsc-prefetch",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var s = e.request,
          a = e.url.pathname,
          t = e.sameOrigin;
        return "1" === s.headers.get("RSC") && t && !a.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "pages-rsc",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var s = e.url.pathname;
        return e.sameOrigin && !s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "pages",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        return !e.sameOrigin;
      },
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
