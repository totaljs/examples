
exports.install = function() {
    ROUTE('GET /', function() {
        this.plain('Querybuilder Mysql example');
    });
    // Handling HTTP requests for user-related operations
    ROUTE('GET     /api/users/                        *Users --> list');    // Retrieve a list of users.
    ROUTE('GET     /api/users/read/{id}/              *Users --> read');    // Read details of a specific user by ID.
    ROUTE('POST    /api/users/create/                 *Users --> create');  // Create a new user.
    ROUTE('PUT     /api/users/update/{id}/            *Users --> update');  // Update details of a specific user by ID.
    ROUTE('DELETE  /api/users/delete/{id}/            *Users --> delete');  // Delete a specific user by ID.

    // Handling API requests for user-related operations (Total.js API endpoints)
    ROUTE('API     /api/   -users_list                *Users --> list');
    ROUTE('API     /api/   +users_insert              *Users --> insert');
    ROUTE('API     /api/   -users_read/{id}           *Users --> read');
    ROUTE('API     /api/   +users_update/{id}         *Users --> update');
    ROUTE('API     /api/   -users_remove/{id}         *Users --> remove');
}
