// ================================================
// AUTHORIZATION
// ================================================

AUTH(function($) {
	var cookie = $.cookie('__user');
	switch (cookie) {
		case 'administrator':
		case 'moderator':
			$.roles(cookie);
			$.success({ name: cookie });
			return;
	}

	$.invalid();
});