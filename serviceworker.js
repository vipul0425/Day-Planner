// v1

// assets

const assets = ['/','style.css','app.js','https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css','https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css','https://fonts.googleapis.com/css2?family=Raleway:ital@1&display=swap','https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Raleway:ital@1&display=swap','https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js'];

// cache assets
self.addEventListener('install',event=>{
    event.waitUntill(
        caches.open("assets_todo").then(cache =>{
            cache.addAll(assets);
        })
    );
});

// serve cache
self.addEventListener('fetch',event=>{
    event.respondWith(
        caches.match(event.request)
        .then(cachedResponse=>{
            const fetchPromise = fetch(event.request).then(
                networkResponse => {
                    caches.open("assets_todo").then( cache => {
                        cache.put(event.request,networkResponse.clone());
                        return networkResponse;
                    } );
                });
                return cachedResponse || fetchPromise;
        })
        );
})