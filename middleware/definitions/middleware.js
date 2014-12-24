framework.middleware('A', function(req, res, next, options, controller) {

	if (controller)
		controller.repository.A = 'middleware - private - A';

	next();

});

framework.middleware('B', function(req, res, next, options, controller) {

	console.log('B');

	if (controller)
		controller.repository.B = 'middleware - private - B';

	next();

});

framework.middleware('C', function(req, res, next, options, controller) {

	console.log('C');

	if (controller)
		controller.repository.C = 'middleware - private - C';

	next();

});

framework.middleware('X', function(req, res, next, options, controller) {
	console.log('Global middleware: X');
	next();
});

framework.use('X');