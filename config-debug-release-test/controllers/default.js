exports.install = function(framework) {
	framework.route('/', view_index);
};

function view_index() {

	var builder = [];
	var self = this;

	Object.keys(self.config).forEach(function(o) {
		var value = self.config[o];
		builder.push('{0} : {1}'.format(o.padRight(30, ' '), value instanceof Array ? value.join(', ') : value));
	});

	self.plain(builder.join('\n'));
}