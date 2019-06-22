exports.install = function() {
	ROUTE('/1/', test1);
	ROUTE('/2/', test2);
	ROUTE('/3/', test3, ['post', 'json']);
};

function test1() {
	this.plain('1');
}

function test2() {
	/*
	if (TEST)
		console.log('IS TEST');
	*/
	this.plain('2');
}

function test3() {
	// throw error
	var self = this;
	self.json(self.body);
}