exports.install = function(framework) {
	framework.route('/', view_homepage, ['#session']);
};

function view_homepage() {
	var self = this;

    if (self.session.counter === undefined)
        self.session.counter = 0;
    else
        self.session.counter++;

	process.send('Response framework ID: ' + framework.id + ' (' + self.session.counter + ')');
	self.view('homepage');
}