// This is the initialization script for this theme
// Is optional
exports.install = function() {

	// Custom mapping
	MAP('/red-theme-style.css', '=red/public/css/default.css');
	// Try: http://127.0.0.1:8000/red-theme-style.css

	console.log('RED THEME IS INITIALIZED');

	// =red --> is a shortcut and the framework compiles it as `/app/themes/red/` path.
	// F.merge() is same as F.map()
};