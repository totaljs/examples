TEST('config', function() {
	var builder = [];

	Object.keys(F.config).forEach(function(o) {
		var value = F.config[o];
		builder.push('{0} : {1}'.format(o.padRight(30, ' '), value instanceof Array ? value.join(', ') : value));
	});

	console.log(builder.join('\n'));
	console.log('');

	OK(true);
});