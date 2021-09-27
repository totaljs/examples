MIDDLEWARE('A', function($) {

	if ($.controller)
		$.controller.repository.A = 'middleware - private - A';

	$.next();

});

MIDDLEWARE('B', function($) {

	console.log('B');

	if ($.controller)
		$.controller.repository.B = 'middleware - private - B';

	$.next();

});

MIDDLEWARE('C', function($) {

	console.log('C');

	if ($.controller)
		$.controller.repository.C = 'middleware - private - C';

	$.next();

});

MIDDLEWARE('X', function($) {
	console.log('Global middleware: X');
	$.next();
});

USE('X');