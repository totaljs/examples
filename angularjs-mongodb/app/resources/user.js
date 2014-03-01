app.factory('User', function($resource) {
	return $resource('/user/:id', { id: '@id' });
});