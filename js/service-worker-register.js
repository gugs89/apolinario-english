if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('js/service-worker.js', {
        scope: '/apolinario-english/'
    }).then(function() {
        console.info('service worker registered');
    }).catch(function(e) {
        console.error(e, 'service worker registration failed');
    });
}