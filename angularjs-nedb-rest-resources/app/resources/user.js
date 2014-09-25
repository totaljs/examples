app.factory('User', function ($resource) {
	return $resource('/user/:_id', { _id: '@_id' });
});