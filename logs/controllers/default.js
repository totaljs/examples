exports.install = function(framework) {
	framework.route('/', view_index);
};

function view_index() {
	var self = this;
	var message = 'MESSAGE TO LOG :: LOOK AT LOGS DIRECTORY';
	self.log(message);
	self.plain(message);
}