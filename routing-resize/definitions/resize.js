RESIZE('/img/small/', function(image) {
	image.resize(100, 100);
	image.quality(90);
	image.minify();
}, ['/img/']);

RESIZE('/img/grayscale/', function(image) {
	image.grayscale();
}, ['/img/', 'nocache']);

RESIZE('/img/filters/', function(image) {
	image.blur(1);
	image.sepia();
	image.flip();
	image.flop();
}, ['/img/']);

RESIZE('/img/50percent/', function(image) {
	image.resize('50%');
}, ['/img/']);

RESIZE('/img/medium/', function(image) {
	image.resize('70%');
}, ['/img/', '.png']);

RESIZE('/img/blur/', function(image) {
	image.resize(100, 100);
	image.quality(90);
	image.blur(1);
	image.minify();
}, ['~' + PATH.root()]);