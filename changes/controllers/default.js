// Change describes some changes ...
var counter = 0;


framework.route('/', function () {

	var self = this;
	counter++;

	self.change('Counter was updated, current state: ' + counter);
	
	self.plain('homepage');

});
