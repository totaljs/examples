NEWSCHEMA('Tutorials', function(schema) {
	schema.action('query', {
		name: 'List tutorials',
		query: 'title:String',
		action: function($) {
			var builder = DATA.find('nosql/tutorials');
			$.query.title && builder.where('title', $.query.title);

			builder.fields('id,title,description');
			builder.callback($.callback);
		}
	});


	schema.action('read', {
		name: 'Read specific tutorial',
		params: '*id:UID',
		action: function() {
			DATA.read('nosql/tutorials').id($.params.id).error(404).callback($.callback);
		}
	});


	schema.action('insert', {
		name: 'Insert new tutorial',
		input: '*title:String,*description:String',
		action: function($, model) {
			model.id = UID();
			model.search = model.title.toSearch();
			model.dtcreated = NOW;
			DATA.insert('nosql/tutorials', model).callback($.done(model.id));
		}
	});


	schema.action('update', {
		name: 'UPdate specific tutorial',
		input: '*title:String,*description:String',
		params: '*id:UID',
		action: function($, model) {
			model.dtupdated = NOW;
			DATA.update('nosql/tutorials', model).id($.params.id).error(404).callback($.done(model.id))
		}
	});

	schema.action('delete_all', {
		name: 'Delete all tutorials',
		action: function($) {
			DATA.remove('nosql/tutorials').callback($.done())
		}
	});

	schema.action('delete', {
		name: 'Delete specific tutorial',
		params: '*id:UID',
		action: function($) {
			DATA.remove('nosql/tutorials').id($.params.id).error(404).callback($.done())
		}
	});
})