let USERS = [];

NEWSCHEMA('Users', function(schema) {
	
	schema.define('name', 'String(50)');
	schema.define('email', 'Email');
	schema.define('age', 'Number');
	schema.define('roles', '[String(25)]');

	// Define additional fields but ONLY for TMS schema (definitions/tms.js)
	schema.jsonschema_define('id', 'String');
	schema.jsonschema_define('dtcreated', 'Date');
	schema.jsonschema_define('dtupdated', 'Date');

	schema.setQuery(function($) {
		// Return all users
		$.callback(USERS);
	});

	schema.setRead(function($) {
		// Return specific user (if exists)
		var user = USERS.find(u => u.id === $.id);

		// Response
		user ? $.callback(user) : $.invalid(404);
	});

	schema.setInsert(function($, model) {
		model.id = UID();
		model.dtcreated = NOW;

		// Insert new user at the beginning	of array
		USERS.unshift(model);

		// TMS
		PUBLISH('users_insert', model);

		// Return success object with ID of new user - { success: true, value: ID }
		$.success(model.id);
	});

	schema.setUpdate(function($, model) {
		model.dtupdated = NOW;

		// Find array index of user
		var index = USERS.findIndex(u => u.id === $.id);
		if (index !== -1) {
			// TMS
			PUBLISH('users_update', model);

			// Replace only values based on schema fields => name, email, age, roles
			for (var key of schema.fields)
				USERS[index][key] = model[key];
		}

		// Response
		index === -1 ? $.invalid(404) : $.success();
	});

	schema.setRemove(function($) {
		// Find if user exists
		var user = USERS.find(u => u.id === $.id);

		// Remove user from 'USERS'
		if (user) {
			// TMS
			PUBLISH('users_remove', user);

			USERS = USERS.filter(u => u.id !== user.id);
		}

		// Response
		user ? $.success() : $.invalid(404);
	});

});