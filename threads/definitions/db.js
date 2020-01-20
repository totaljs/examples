// This script will be executed for each thread
console.log('DATABASE IS READY');

FUNC.randomdata = function(type) {
	var arr = [];
	for (var i = 0; i < 10; i++)
		arr.push({ id: GUID(5), name: type + ' ' + (i + 1) });
	return arr;
};