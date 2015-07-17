exports.install = function() {
	F.route('/', view_index);
};

function view_index() {

	var builder = [];
	var self = this;

	Object.keys(F.config).forEach(function(o) {
		var value = F.config[o];
		builder.push('{0} : {1}'.format(o.padRight(30, ' '), value instanceof Array ? value.join(', ') : value));
	});

	self.plain(builder.join('\n'));
}