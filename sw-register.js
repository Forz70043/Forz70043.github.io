// sw-register.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('Service Worker registered!'))
    .catch(err => console.error('Error registering SW:', err));
}
