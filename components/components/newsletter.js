// This is server-side implementaion of the component
exports.install = function() {
	ROUTE('POST /api/newsletter/', json_newsletter);
};

function json_newsletter() {
	var self = this;
	self.body.ip = self.ip;
	self.body.created = NOW;
	NOSQL('newsletter').insert(self.body).callback(self.done());
}