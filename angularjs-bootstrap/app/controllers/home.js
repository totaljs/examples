app.controller('HomeCtrl', ['$scope', function($scope) {
    $scope.name = 'total.js + angular.js = awesome';
    $scope.users = [{ name: 'Peter', age: 30 }, { name: 'Michal', age: 34 }, { name: 'Lucia', age: 33 }];
}])