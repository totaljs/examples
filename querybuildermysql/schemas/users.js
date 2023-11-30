NEWSCHEMA('Users', function(schema) {

    // Action: List users
    schema.action('list', {
        name: 'List users',
        action: function($) {
            var builder = DB().list('tbl_user');
            // Autoquery using QueryBuilderMySQL
            // - Auto-generates query based on provided parameters
            // - Sorts the result by 'dtcreated' in descending order
            // - Limits the result to 100 records
            builder.autoquery($.query, 'id:String, name:String, phone:String, phone:String, isonline:Boolean, countprovider:Number, dtcreated:Date,dtupdated:Date,countlogin:Number,isonline:Boolean', 'dtcreated_desc', 100);
            // Additional filtering to exclude removed users
            builder.where('isremoved=FALSE');
            // Sorts the result by 'dtcreated' in descending order
            builder.sort('dtcreated', true);
            // Executes the query and provides the result to the callback function
            builder.callback($.callback);
        }
    });

    // Action: Check customer before insert
    schema.action('check', {
        name: 'Check customer before insert',
        action: function($, model) {
            var db = DB();
            // Check operation using QueryBuilderMySQL
            // - Checks if a user with the provided phone number already exists
            // - Provides fields 'id' for further processing
            // - Throws an error if the user already exists
            db.check('tbl_user').where('phone', model.phone).where('isremoved=FALSE').fields('id').error('@(The account already exists)', true).callback($.done());
        }
    });
    // Action: Create new customer
    schema.action('create', {
        name: 'Insert new customer',
        input:  'gender:{male|female},fistname:Capitalize(40),lastname:Capitalize(40),role:{collector|buyer},phone:Phone,password:String,pincode:Number,photo:String', // Schema inline validation.
        action: async function($, model) {
            // ... (implementation details for creating a new customer)
            var db = DB();
            // Insert operation using QueryBuilderMySQL
            // - Inserts the new customer into the 'tbl_user' table
            await db.insert('tbl_user', model).promise($);
            // ... (additional implementation details)
            // Provides a response with a token and user information
            db.callback($.done({ token: token, user: model }));
        }
    });
    // Action: Remove User
    schema.action('remove', {
        name: 'Remove User',
        params: '*id:String',
        action: async function($) {
            var params = $.params;
            var db = DB();
            // Update operation using QueryBuilderMySQL
            // - Marks the user as removed in the 'tbl_user' table
            // - Performs error handling, audit logging, and provides a response
            db.update('tbl_user', { isremoved: true }).id(params.id).where('isremoved=FALSE').error(404).audit($, 'Removed user: ' + params.id).callback($.done());
        }
    });
});