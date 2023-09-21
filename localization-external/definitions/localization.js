var COOKIE = '__language';
var allowed = { sk: true, en: true, cz: true };

LOCALIZE(function(req, res) {

	var language = req.query.language;

	// Set the language according to the querystring and store to the cookie
	if (language) {
		if (!allowed[language])
			return 'en';
		res.cookie(COOKIE, language, '2 days');
		return language;
	}

	language = req.cookie(COOKIE);
	if (language)
		return allowed[language] ? language : 'en';

	// Sets the language according to user-agent
	language = req.language;

	if (language.indexOf('sk') > -1)
		return 'sk';

	if (language.indexOf('cz') > -1)
		return 'cz';

	return 'en';
});

ON('ready', function() {

	// The method downloads multiple resources at once
	LOADRESOURCE('http://{ip}:{port}/multiple.json'.args(F));

	// The method downloads only the one resource
	// LOADRESOURCE('sk', 'http://{ip}:{port}/sk.json'.args(F));

});