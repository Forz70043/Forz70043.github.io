// sw-register.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('Service Worker registrato!'))
    .catch(err => console.error('Errore registrazione SW:', err));
}
