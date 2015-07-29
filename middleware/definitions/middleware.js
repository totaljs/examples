F.middleware('A', function(req, res, next, options, controller) {

	if (controller)
		controller.repository.A = 'middleware - private - A';

	next();

});

F.middleware('B', function(req, res, next, options, controller) {

	console.log('B');

	if (controller)
		controller.repository.B = 'middleware - private - B';

	next();

});

F.middleware('C', function(req, res, next, options, controller) {

	console.log('C');

	if (controller)
		controller.repository.C = 'middleware - private - C';

	next();

});

F.middleware('X', function(req, res, next, options, controller) {
	console.log('Global middleware: X');
	next();
});

F.use('X');