
(function() {
	'use strict';
	var createApp = function() {

		// Main Vue instance must be returned and have a root
		// node with the id "app", so that the client-side
		// version can take over once it loads.
		return new Vue({
			template: '<div id="app">You have been here for {{ counter }} seconds.</div>',
			data: {
				counter: 0
			},
			created: function() {
				console.log('CREATED');
				var vm = this;
				setInterval(function() {
					vm.counter += 1
				}, 1000);
			}
		});

	};
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = createApp;
	} else {
		this.app = createApp({ el: '#app' });
	}
}).call(this);
