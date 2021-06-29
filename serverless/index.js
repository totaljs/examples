require('total4');
const Serverless = require('serverless-http');

const app = function (req, res) {
	F.serverless(req, res);
}

module.exports.handler = Serverless(app);
