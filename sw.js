const CACHE = 'xgames-v3';
// On ne précharge plus les pages HTML — elles doivent toujours être
// vérifiées en ligne d'abord (voir stratégie réseau-prioritaire plus bas).
// Seuls les fichiers statiques (icônes, manifest) profitent du cache.
const FILES = ['./manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  const isHTML = e.request.mode === 'navigate' || url.endsWith('.html') || url.endsWith('/');

  if (isHTML) {
    // Pages (register/client/admin) : toujours essayer le réseau EN PREMIER,
    // pour ne plus jamais rester bloqué sur une ancienne version après une
    // mise à jour. Le cache ne sert que si le téléphone est hors-ligne.
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    // Fichiers statiques (icônes, manifest) : cache d'abord, c'est stable.
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});
