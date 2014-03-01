
// Change output

framework.on('change', function(message, name, uri, ip) {
	
	console.log('CHANGE:');
	console.log('message:', message);
	console.log('name:', name);
	console.log('uri:', uri.href);
	console.log('ip:', ip);
	console.log('');

});