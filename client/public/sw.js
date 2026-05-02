const CACHE_NAME = 'fixate-pwa-v3';
const urlsToCache = [
  '/manifest.json',
  '/icon-192.png',
  '/icon-384.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png'
];

// Install — cache static assets only (NOT HTML, to avoid stale shells)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Fetch — network-first for HTML/navigation, cache-first for static assets
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Never cache API calls
  if (req.url.includes('/api/')) return;

  // Network-first for HTML/navigation
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      fetch(req).catch(() => caches.match(req).then((r) => r || caches.match('/')))
    );
    return;
  }

  // Cache-first for everything else
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, responseToCache));
        return response;
      });
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Push notification event
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const title = data.title || 'Fixate';
  const options = {
    body: data.body || data.message,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: data.data || {},
    tag: data.tag || 'fixate-notification',
    requireInteraction: data.requireInteraction || false,
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        // Check if there's already a window open
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // If not, open a new window
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
