// This is server-side implementaion of component

exports.install = function() {
	F.route('/api/newsletter/', json_newsletter, ['post']);
};

function json_newsletter() {
	var self = this;
	self.body.ip = self.ip;
	self.body.created = F.datetime;
	NOSQL('newsletter').insert(self.body);
	self.json(SUCCESS(true));
}