const CACHE_NAME = 'casamentoPeR';
let files = [
  "./index.html",
  "./manifest.json",
  "./styles/custom.css",
  "./appcache.manifest",
  "./service-worker.js",
  "./imgs/logo-128.png",
  "./imgs/logo-144.png",
  "./imgs/logo-152.png",
  "./imgs/logo-192.png",
  "./imgs/logo-256.png",
  "./imgs/logo.png",
  "./imgs/coracao-semitransparente.jpg",
  "./scripts/app.js",
  "./scripts/geral.js",
  "./scripts/main.js"
];

self.addEventListener('activate', function (event) {
  console.info('[SW] Ativado!');
  event.waitUntil(
    caches.keys().then(
      function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (CACHE_NAME.indexOf(cacheName) == -1) {
              console.log('[SW] Deleta cache: ', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }
    )
  );
});

self.addEventListener('install', function (event) {
  console.info('[SW] Instalar!');
  event.waitUntil(
    caches.open(CACHE_NAME).then(
      function (cache) {
        return Promise.all(
          files.map(function (file) {
            return cache.add(file);
          })
        );
      }
    )
  );
});

self.addEventListener('fetch', function (event) {
  console.info('[SW] Trazendo ' + event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response){
      return response || fetch(event.request.clone());
    })
  );
});

self.addEventListener('notificationClick', function (event) {
  console.info('[SW] Notificação: ', event);
  clients.openWindow('/');
});
