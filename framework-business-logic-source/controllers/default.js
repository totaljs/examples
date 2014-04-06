exports.install = function(framework) {

	framework.route('/', view_homepage);
};

function view_homepage() {
	var self = this;

	// This function does the same as require (only adds path to the source directory)

	var layer_include = include('layer');
	var layer_source = source('layer');

	self.plain('{0}\n{1}'.format(layer_include.hello(), layer_source.hello()));
}