NEWSCHEMA('ContactForms', function(schema) {

	schema.define('fileid', 'UID');
	schema.define('email', 'Email', true);
	schema.define('phone', 'Phone');
	schema.define('message', 'String(10000)', true);


	schema.action('save', {
		name: 'Save',
		action: function ($, model) {

			// Extends model
			model.dtcreated = NOW;
			model.ip = $.ip;
			model.ua = ($.headers['user-agent'] || '').parseUA();

			DATA.insert('nosql/contactforms', model);

			// var mail = MAIL(....);
			// model.fileid && mail.attachmentfs('files', model.fileid);

			$.success();
		}
	});
});