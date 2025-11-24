var cacheName = 'petstore-v1';
var cacheFiles=[
    'index.html',
    'products.js',
    'petstore.webmanifest',
    'images/icon-store-512.png'
];

self.addEventListener('install', (e)=>{
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache)=>{
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('fetch', function(e){
    e.respondWith(
        cache.match(e.request).then(function(response){
            return cache.open(cacheName).then(function(response){
                return caches.open(cacheName).then(function(cache){
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })

        );
});