// Change describes some changes ...
var counter = 0;

F.route('/', function () {

	var self = this;
	counter++;

	self.change('The counter was updated, current state: ' + counter);
	self.plain('homepage');

});
