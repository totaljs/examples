app.controller('HomeCtrl', ['$scope', '$timeout', 'websocketService', function($scope, $timeout, websocketService) {

	$scope.users = [];
	$scope.messages = [];
    $scope.alias = '';
    $scope.message = '';
    $scope.isLogged = false;

    $scope.$on('websocket', function(e, type, data) {
		if (type === 'users')
			$scope.users = data;
		else
			$scope.messages = data;
    });

	$scope.login = function() {
		websocketService.login('ws://localhost:8000/', $scope.alias);
		$scope.isLogged = true;
	};

	$scope.logoff = function() {
		websocketService.logoff();
		$scope.alias = '';
		$scope.isLogged = false;
		$scope.message = '';
	};

	$scope.send = function() {
		websocketService.send($scope.message);
		$scope.message = '';
	};

}]);