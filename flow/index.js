require('total.js');

FLOWSTREAM().make(function(flow) {

	flow.register('transform', function(exports) {

		exports.message = function(message) {
			switch (message.options.type) {
				case 'uppercase':
					message.data = message.data.toUpperCase();
					break;
				case 'lowercase':
					message.data = message.data.toLowerCase();
					break;
			}

			// Send next
			message.send(0);
		};

	}, { type: 'uppercase' });

	flow.register('reverse', function(exports) {
		exports.message = function(message) {

			var arr = message.data.split('');
			arr.reverse();
			message.data = arr.join('');

			message.send(0);
		};
	});

	flow.register('length', function(exports) {
		exports.message = function(message) {
			message.data = message.data.length;
			message.send(0);
		};
	});

	flow.register('debug', function(exports) {
		exports.message = function(message) {
			console.log(message.data);
			message.destroy();
		};
	});

	flow.use({

		com1: {
			component: 'transform',
			options: { type: 'uppercase' },
			connections: {
				'0': [
					{ id: 'com2', index: 0 },
					{ id: 'com3', index: 0 },
					{ id: 'com4', index: 0 }
				]
			}
		},
		com2: {
			component: 'length',
			connections: {
				'0': [
					{ id: 'com4', index: 0 }
				]
			}
		},
		com3: {
			component: 'reverse',
			connections: {
				'0': [
					{ id: 'com4', index: 0 }
				]
			}
		},
		com4: {
			component: 'debug'
		}
	});

	flow.trigger('com1__0', 'Total.js Platform');
});