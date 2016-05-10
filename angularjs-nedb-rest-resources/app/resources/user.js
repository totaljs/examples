app.factory('User', function ($resource) {
	return $resource('/users/:_id', { _id: '@_id' }, { 'update': { method:'PUT' }});
});