var ContactForm = NEWSCHEMA('ContactForm');
ContactForm.define('Email', 'string(200)', true);
ContactForm.define('Phone', 'string(40)');
ContactForm.define('Message', 'string(10000)', true);
ContactForm.define('Ip', 'string(60)');
ContactForm.define('Created', Date);

ContactForm.setDefault(function(name) {
    switch (name) {
        case 'Email':
            return '@';
        case 'Phone':
            return '+421';
        case 'Created':
            return new Date();
    }
});

ContactForm.setValidation(function(name, value) {
    switch (name) {
        case 'Email':
            return value.isEmail();
        case 'Message':
            return value.length > 0;
    }
});

ContactForm.setSave(function(error, model, options, callback) {
    DATABASE('contactform').insert(model);
    callback(SUCCESS(true));
});