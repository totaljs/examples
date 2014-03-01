
// Problem output

framework.on('problem', function(message, name, uri, ip) {
	
	console.log('PROBLEM:');
	console.log('message:', message);
	console.log('name:', name);
	console.log('uri:', uri.href);
	console.log('ip:', ip);
	console.log('');

});