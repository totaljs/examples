exports.install = function() {
	ROUTE('GET /', view_index);
};

function view_index() {

	var builder = [];
	var self = this;

	Object.keys(CONF).forEach(function(o) {
		var value = CONF[o];
		builder.push('{0} : {1}'.format(o.padRight(30, ' '), value instanceof Array ? value.join(', ') : value));
	});

	self.plain(builder.join('\n'));
}