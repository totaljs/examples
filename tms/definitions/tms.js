// https://docs.totaljs.com/tms/

// PUBLISH - Sending data

// Using Total.js schema (schemas/users.js)
NEWPUBLISH('users_insert', 'Users');
NEWPUBLISH('users_update', 'Users');
NEWPUBLISH('users_remove', 'Users');

// Using json schema (jsonschemas/users.json) - https://json-schema.org/
// NEWPUBLISH('users_insert', 'users');
// NEWPUBLISH('users_update', 'users');
// NEWPUBLISH('users_remove', 'users');

// Using inline declaration - key:value,key2:value2,...
// NEWPUBLISH('users_insert', 'id:String,name:String,email:String,age:Number,roles:[String],dtcreated:Date');
// NEWPUBLISH('users_update', 'id:String,name:String,email:String,age:Number,roles:[String],dtcreated:Date,dtupdated:Date');
// NEWPUBLISH('users_remove', 'id:String,name:String,email:String,age:Number,roles:[String],dtcreated:Date,dtupdated:Date');



// SUBSCRIBE - Receiving data (different declrations can be also used)
NEWSUBSCRIBE('users_insert', 'Users');
NEWSUBSCRIBE('users_update', 'Users');
NEWSUBSCRIBE('users_remove', 'Users');

SUBSCRIBE('users_insert', function(model) {
	EXEC('+Users --> insert', model, NOOP);
});

SUBSCRIBE('users_update', function(model) {
	var controller = EXEC('+Users --> update', model, NOOP);

	// Set $.id param to EXEC call - https://docs.totaljs.com/total4/407ff001jy51c/#485dc001cl51c
	controller.id = model.id;
});

SUBSCRIBE('users_remove', function(model) {
	var controller = EXEC('+Users --> remove', null, NOOP);

	// Set $.id param to EXEC call - https://docs.totaljs.com/total4/407ff001jy51c/#485dc001cl51c
	controller.id = model.id; 
});