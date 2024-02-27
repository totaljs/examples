const TABLE = 'nosql/employees';
NEWSCHEMA('Employees', function(schema) {
	schema.action('list', {
		name: 'List employees',
		query: 'search:String',
		action: function($) {
			var builder = DATA.find(TABLE);
			$.query.search && builder.seach('search', $.query.search);
			builder.where('isremoved', false);
			builder.callback($.callback);
		}
	});

	schema.action('read', {
		name: 'Read specific employee info',
		params: '*id:UID',
		action: function($) {
			var params = $.params;
			DATA.read(TABLE).id(params.id).where('isremoved', false).error(404).callback($.callback);
		}
	});

	schema.action('create', {
		name: 'Create new employee',
		input: '*firstname:Name,*lastname:Name,*email:Email,dob:Date,*gender:{female|male},education:String,company:String,experience:String,package:String',
		action: function($, model) {
			model.id = UID();
			model.dtcreated = NOW;
			model.isremoved = false;
			model.search = (model.firstname + ' ' + model.lastname + ' ' + model.email).toSearch();
			DATA.insert(TABLE, model).callback($.done(model.id));
		}
	});


	schema.action('update', {
		name: 'Update employee infos',
		params: '*id:UID',
		input: '*firstname:Name,*lastname:Name,*email:Email,dob:Date,*gender:{female|male},education:String,company:String,experience:String,package:String',
		action: function($, model) {
			var params = $.params;
			model.dtupdated = NOW;
			model.search = (model.firstname + ' ' + model.lastname + ' ' + model.email).toSearch();
			DATA.update(TABLE, model).id(params.id).callback($.done(model.id));
		}
	});
	schema.action('remove', {
		name: 'Remove specific employee',
		params: '*id:UID',
		action: function($) {
			var params = $.params;
			DATA.update(TABLE, { isremoved: true }).id(params.id).where('isremoved', false).error(404).callback($.callback);
		}
	});
});
