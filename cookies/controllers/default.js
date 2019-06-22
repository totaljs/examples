exports.install = function() {
	ROUTE('GET /get/', cookieRead);
	ROUTE('GET /set/', cookieWrite);
};

function cookieRead() {
	var self = this;
	self.plain('Cookie example\nread test1: ' + (self.cookie('test1') || 'null') + '\nread test2: ' + (self.cookie('test2') || 'null'));
}

function cookieWrite() {
	var self = this;

	self.cookie('test1', 'value 1', '2 days');
	self.cookie('test2', 'value 2', new Date().add('day', 1));

	// options.domain
	// options.path
	// options.secure
	// options.httponly
	// self.res.cookie(name, value, expire, [options]);

	//self.plain('Cookie example, write: ' + value);
	self.redirect('/get/');
}