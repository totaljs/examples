app.controller('UserCtrl', ['$scope', 'User', function($scope, User) {

    $scope.users = User.query();
    $scope.isForm = false;

    $scope.edit = function (_id) {
    	$scope.user = User.get({ _id: _id });
    	$scope.isForm = true;
    };

    $scope.save = function() {
        $scope.user.$update({ _id: $scope.user._id }, function () {
            $scope.users = User.query();
        });
    	$scope.isForm = false;
    };

    $scope.cancel = function() {
    	$scope.isForm = false;
    };

    $scope.delete = function(_id) {

		User.delete({ _id: _id }, function() {
			// Refresh users
			$scope.users = User.query();
			alert('User was removed.');
		});

    	$scope.isForm = false;
    };

}]);