/*
    Service Worker Starter
*/

let swRegistration;

(function () {
	var site = {
		isLoading: true,
		spinner: document.querySelector('.loader'),
		container: document.querySelector('main')
	};

	if (site.isLoading) {
		site.spinner.setAttribute('hidden', true);
		site.container.removeAttribute('hidden');
		site.isLoading = false;
	}

	if ('serviceWorker' in navigator) {
		console.info('Navegador possui service workers');
		navigator.serviceWorker.register('service-worker.js', {
	    scope: './'
	  }).then(function (registration) {
			console.info('Service worker registrado!');
			if (typeof registration.update == 'function') {
	      registration.update();
	    }
		}).catch(function(e) {
	    console.error('Error during service worker registration:', e);
	  });
	}
	else {
		console.warn('Navegador NÃO possui service workers');
	}

}());
