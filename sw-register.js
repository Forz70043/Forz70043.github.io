// sw-register.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .catch((error) => {
      console.warn('Service worker registration failed:', error);
    });
}
