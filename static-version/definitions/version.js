
// A dynamic versioning
// Documentation: http://docs.totaljs.com/Framework/#framework.onVersion
F.onVersion = function(name) {

	switch (name) {
		case 'custom.png':
			return 'custom101.png';
	}

	return name;
};