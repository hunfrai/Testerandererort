
const CACHE_NAME = "static_cache";
const STATIC_ASSETS = [
  '/',
  '/public/index.html',
  '/public/src/css/stylesheet.css',
  '/public/src/javascript/app.js',
  '/public/src/javascript/graph.js',
  '/public/src/javascript/downloads.js',
  '/public/src/javascript/logik.js',
  '/public/src/javascript/tabelle.js',
  '/public/favicon.ico',
  '/public/src/images/grüne_wiese.jpeg',
  '/public/src/images/logo.png',
  '/public/manifest.json'

];


self.addEventListener('install', event => {
  console.log("ServiceWorker installed");
  self.skipWaiting();
  event.waitUntil(preCache());
});

self.addEventListener('activate', event => {
  console.log("ServiceWorker activated");
  event.waitUntil(cleanupCache());
});

self.addEventListener('fetch', event => {
  console.log("ServiceWorker fetched");
  event.respondWith(fetchAssests(event))
});



async function preCache() {
  const cache = await caches.open(CACHE_NAME)
  return cache.addAll(STATIC_ASSETS);
};

async function fetchAssests(event) {
  try{
    const response = await fetch(event.request)
    return response

  } catch (err){
    const cache = await caches.open(CACHE_NAME)
    return cache.match(event.request)

  }
};

async function cleanupCache() {
  const keys = await caches.keys()
  const keysToDelete = keys.map(key => {
    if (key !== CACHE_NAME) {
      return caches.delete(key)
    }
  })

  return Promise.all(keysToDelete)
};

