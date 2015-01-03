// Problem describes some problems ... Problem is not error, but problem describes unexpected situation.

framework.route('/', function () {

	var self = this;

	// throw a custom problem
	if (self.user === null)
		self.problem('User is offline.');

	self.plain('index');

});

framework.route('/forbidden/', function () {
	var self = this;
	self.view403('A visitor was denied.');

	// self.view401([problem])
	// self.view403([problem])
	// self.view404([problem])
	// self.view501([problem])

	// IMPORTANT:
	// self.view500(error)
});

// SHOW LAST 50 PROBLEMS
framework.route('/all/', function () {

	var self = this;
	self.json(framework.problems);

});