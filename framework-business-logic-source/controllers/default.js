exports.install = function() {
	F.route('/', view_index);
};

function view_index() {
	var self = this;

	// This function does the same as require (only adds path to the source directory)

    // INCLUDE == SOURCE are same

    // http://docs.totaljs.com/global/#INCLUDE
	var layer_include = INCLUDE('layer');

    // http://docs.totaljs.com/global/#SOURCE
	var layer_source = SOURCE('layer');

	self.plain('{0}\n{1}'.format(layer_include.hello(), layer_source.hello()));
}