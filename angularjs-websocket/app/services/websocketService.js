app.factory('websocketService', ['$rootScope', '$timeout', function($rootScope, $timeout) {

	var _ws;
	var _username = '';
	var messages = [];
	var users = [];

	function onMessage(e) {
		var data = JSON.parse(decodeURIComponent(e.data));
		$rootScope.$apply(function() {

			if (data.type === 'users') {
				users = data.message;
				$rootScope.$broadcast('websocket', 'users', users);
				return;
			}

			messages.splice(0, 0, { user: data.user, message: data.message, date: data.date });
			$rootScope.$broadcast('websocket', 'message', messages);
		});
	}

	return {

		login: function(url, username) {
			_ws = new WebSocket(url);
			_ws.onmessage = onMessage;
			_username = username;
			$timeout(function() {
				_ws.send(encodeURIComponent(JSON.stringify({ type: 'change', message: _username })));
			}, 500);
		},

		logoff: function() {
			_ws.close();
			_ws = null;
			_username = '';
			users = [];
			$rootScope.$broadcast('websocket', 'users', users);
		},

		send: function(message) {
			_ws.send(encodeURIComponent(JSON.stringify({ type: 'message', message: message })));
		}
	};

}]);