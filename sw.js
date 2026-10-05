const CACHE_NAME = 'schulte-v11';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest'
];

// 安装 Service Worker 时缓存资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// 拦截网络请求，优先使用缓存
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});