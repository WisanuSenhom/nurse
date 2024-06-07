self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('my-cache').then(function(cache) {
            return Promise.all([
                cache.add('/index.html'),
                cache.add('/styles.css'),
                cache.add('/script.js'),
                cache.add('/nurse.png'),
                cache.add('/nurse256.png'),
                cache.add('/nurse512.png')
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request).then(function(fetchResponse) {
                return caches.open('my-cache').then(function(cache) {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        })
    );
});
