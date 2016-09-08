exports.install = function() {
	F.route('/');
	F.route('/live/', view_live);
};

function view_live() {

	var self = this;
	var index = 0;
	var count = 0;

	// Sends 5 times 5 pictures
	var interval = setInterval(function() {

		index++;

		if (index > 5) {
			index = 1;
			count++;
		}

		if (!self.isConnected) {
			clearInterval(interval);
			return;
		}

		self.mmr(self.path.public('img/' + index + '.jpg'));
		// self.mmr(filename or name when the stream exists, [stream], [callback])

		if (count > 5) {
			clearInterval(interval);
			self.close();
		}

	}, 500);
}