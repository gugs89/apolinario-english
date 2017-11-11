const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
	'index.html',
	'irregular-verbs.html',
	'./', // Alias for index.html
	'css/base.css',
	'bower_components/material-icons/materialIcons.css',
	'bower_components/materialize/dist/css/materialize.min.css',
	'bower_components/jquery/dist/jquery.min.js',
	'bower_components/materialize/dist/js/materialize.min.js',
	'js/general.js',
	'js/irregular_verbs.js',
	'js/irregular_verbs_controller.js',
	'bower_components/materialize/dist/fonts/roboto/Roboto-Regular.woff2',
	'bower_components/material-icons/rYFNaTjcS6g4U3t-Y5StnKWgpfO2iSkLzTz-AABg.ttf',
	'bower_components/materialize/dist/fonts/roboto/Roboto-Medium.woff2'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(PRECACHE)
			.then(cache => cache.addAll(PRECACHE_URLS))
			.then(self.skipWaiting())
	);
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
	const currentCaches = [PRECACHE, RUNTIME];
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
		}).then(cachesToDelete => {
			return Promise.all(cachesToDelete.map(cacheToDelete => {
				return caches.delete(cacheToDelete);
			}));
		}).then(() => self.clients.claim())
	);
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
	// Skip cross-origin requests, like those for Google Analytics.
	if (event.request.url.startsWith(self.location.origin)) {
		event.respondWith(
			caches.match(event.request).then(cachedResponse => {
				if (cachedResponse) {
					return cachedResponse;
				}

				return caches.open(RUNTIME).then(cache => {
					return fetch(event.request).then(response => {
						// Put a copy of the response in the runtime cache.
						return cache.put(event.request, response.clone()).then(() => {
							return response;
						});
					});
				});
			})
		);
	}
});