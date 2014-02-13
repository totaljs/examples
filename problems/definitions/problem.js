
// Problem output

framework.on('problem', function(message, name, uri) {
	
	console.log('PROBLEM:');
	console.log('message:', message);
	console.log('name:', name);
	console.log('uri:', uri.href);
	console.log('');

});