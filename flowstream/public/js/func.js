FUNC.parsedashboardcomponent = function(html) {

	var beg = -1;
	var end = -1;

	var body_style = '';
	var body_template = '';
	var body_settings = '';
	var body_fe = '';

	var body_style = '';
	var body_template = '';
	var body_settings = '';
	var body_body = '';
	var raw = html;

	beg = raw.indexOf('<template');
	if (beg !== -1) {
		end = raw.indexOf('</template>', beg);
		var tmp = raw.substring(raw.indexOf('>', beg) + 1, end);
		raw = raw.replace(raw.substring(beg, end + 11), '');
		body_template = tmp.trim();
	}

	beg = raw.indexOf('<body');
	if (beg !== -1) {
		end = raw.indexOf('</body>', beg);
		var tmp = raw.substring(raw.indexOf('>', beg) + 1, end);
		raw = raw.replace(raw.substring(beg, end + 7), '');
		body_body = tmp.trim();
	}

	beg = raw.indexOf('<settings');
	if (beg !== -1) {
		end = raw.indexOf('</settings>', beg);
		var tmp = raw.substring(raw.indexOf('>', beg) + 1, end);
		raw = raw.replace(raw.substring(beg, end + 11), '');
		body_settings = tmp.trim();
	}

	end = 0;

	while (true) {

		beg = raw.indexOf('<script', end);
		if (beg === -1)
			break;

		end = raw.indexOf('</script>', beg);
		if (end === -1)
			break;

		var body = raw.substring(beg, end);
		var beg = body.indexOf('>') + 1;

		var tmp = body.substring(8, beg - 1);
		// var be = tmp === 'total' || tmp === 'flow';
		body = body.substring(beg);
		body = body.trim();
		body_fe = body;
		end += 9;
	}

	beg = raw.indexOf('<style');
	if (beg !== -1) {
		end = raw.indexOf('</style>', beg);
		var tmp = raw.substring(raw.indexOf('>', beg) + 1, end);
		raw = raw.replace(raw.substring(beg, end + 8), '');
		body_style = tmp.trim();
	}

	var com = {};
	com.settings = body_settings;
	com.css = body_style;
	com.template = body_template;
	com.html = body_body;
	com.js = body_fe;
	return com;
};