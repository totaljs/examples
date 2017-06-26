require('total.js');

const release = process.env.NODE_ENV === 'production';
const next = require('next');
const app = next({ dir: '.', dev: !release });
const handle = app.getRequestHandler();

app.prepare().then(function() {

	Controller.prototype.next = function(name, model) {
		this.custom();
		app.render(this.req, this.res, name, model);
		return this;
	};

	F.route('/*', function() {
		this.custom();
		handle(this.req, this.res);
	});

	F.http(release ? 'release' : 'debug');
});