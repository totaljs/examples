exports.install = function() {

	// IMPORTANT: www. is removed automatically

	// add to host:
	// 127.0.0.1	website.debug
	// 127.0.0.1	subdomain.website.debug
	// and run node on 80 port

	ROUTE('GET [subdomain]/', subdomain);
	ROUTE('GET /', root);

	// 127.0.0.1	subdomain.website.debug
	// 127.0.0.1	eshop.website.debug
	// 127.0.0.1	blog.website.debug
	ROUTE('GET [subdomain,eshop,blog]/', subdomain);

	// show for all subdomain
	ROUTE('GET /all/', all);

	// hidden for subdomain
	ROUTE('GET []/contact/', contact);

	// wildcard subdomain routing
	ROUTE('GET [api*]/', api);
};

function subdomain() {
	this.plain('subdomain');
}

function all() {
	this.plain('all');
}

function contact() {
	this.plain('contact');
}

function root() {
	this.plain('root');
}

function api() {
	this.plain('api');
}