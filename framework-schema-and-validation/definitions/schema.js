// Create group of schemas
var group = SCHEMA('eshop');

// === ORDER

var order = group.add('order'); // add a new schema

order.define('products', '[product]', true); // this property is linked with product
order.define('firstname', 'string(30)', true);
order.define('lastname', 'string(40)', true);
order.define('email', 'string(120)', true);
order.define('telephone', 'string(20)', true);
order.define('address', String, true);
order.define('ip', String);
order.define('created', Date);
order.define('updated', Date);

order.setDefault(function(name, value, isDefault) {
    switch (name) {
        case 'created':
        case 'updated':
            return new Date();
        case 'email':
            return '@';
    }
});

order.setValidation(validation);

// === PRODUCT

var product = group.add('product'); // add a new schema

product.define('name', 'string(30)');
product.define('price', Number);

// === CONTACT FORM

var contactform = group.add('contactform');

contactform.define('name', 'string(30)', true);
contactform.define('email', 'string(120)', true);
contactform.define('message', 'string(8000)', true);
contactform.define('ip', String);
contactform.define('created', Date);

contactform.setDefault(function(name, value, isDefault) {
    switch (name) {
        case 'created':
            return new Date();
    }
});

contactform.setValidation(validation);

// === VALIDATION DELEGATE FOR CURRENT GROUP OF SCHEMAS

function validation(name, value, entityName, model) {
    switch (name) {
        case 'email':
            return (value || '').isEmail();
        case 'price':
            return value.parseFloat() > 0;
        case 'firstname':
        case 'lastname':
        case 'telephone':
        case 'address':
        case 'name':
            return (value || '').length > 0;
    }
}