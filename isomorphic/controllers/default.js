exports.install = function() {
    F.route('/');

    setTimeout(function() {
	    // EXAMPLE
    	console.log(isomorphic.test.getName());
	}, 1000);
};