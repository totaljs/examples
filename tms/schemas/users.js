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

	schema.action('query', {
		name: 'Query users list',
		action: function($) {
			// Return all users
			$.callback(USERS);
		}
	});

	schema.action('read', {
		name: 'Read specific user',
		params: '*id:UID',
		actioin: function($) {
			// Return specific user (if exists)
			var user = USERS.find(u => u.id === $.params.id);

			// Response
			if (user)
				$.callback(user);
			else
				$.invalid(404);
		}
	});

	schema.action('insert', {
		name: 'Insert new user',
		action: function($, model) {
			model.id = UID();
			model.dtcreated = NOW;
	
			// Insert new user at the beginning	of array
			USERS.unshift(model);
	
			// TMS
			PUBLISH('users_insert', model);
	
			// Return success object with ID of new user - { success: true, value: ID }
			$.success(model.id);
		}
	})


	schema.action('update', {
		name: 'Update user info',
		params: '*id:UID',
		action: function($, model) {
			model.dtupdated = NOW;

			// Find array index of user
			var index = USERS.findIndex(u => u.id === $.params.id);
			if (index !== -1) {
				// TMS
				PUBLISH('users_update', model);

				// Replace only values based on schema fields => name, email, age, roles
				for (var key of schema.fields)
					USERS[index][key] = model[key];

				$.success();
			} else
				$.invalid(404);
		}
	});

	schema.action('remove', {
		name: 'Remove a specific user',
		params: '*id:UID', 
		action: function($) {
			// Find if user exists
			var user = USERS.find(u => u.id === $.params.id);

			// Remove user from 'USERS'
			if (user) {
				// TMS
				PUBLISH('users_remove', user);

				USERS = USERS.filter(u => u.id !== user.id);

				$.success();
			} else
				$.invalid(404);
		}
	});
});