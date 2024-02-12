exports.install = function() {
    ROUTE('GET /', function() {
        this.plain('Total.js Schema and Routing Example');
    });
    // Define routes for CRUD operations on the 'Books' API

    // Standard RESTful routing
    ROUTE('GET      /api/books/         *Books --> query');   // Query all books
    ROUTE('GET      /api/books/{id}/    *Books --> read');    // Read a specific book by ID
    ROUTE('POST     /api/books/         *Books --> insert');  // Insert a new book (+ expects payload data, validated in schema)
    ROUTE('PUT      /api/books/{id}/    *Books --> update');  // Update a specific book by ID (+ expects payload data, validated in schema)
    ROUTE('DELETE   /api/books/{id}/    *Books --> remove');  // Remove a specific book by ID (- does not expect payload data)

    // API routing using different conventions

    // Using hyphen notation for API endpoint names
    ROUTE('API /api/ -books             *Books --> query');   // API: Query all books (- does not expect payload data)
    ROUTE('API /api/ -books_read/{id}   *Books --> read');    // API: Read a specific book by ID (- does not expect payload data)
    ROUTE('API /api/ +books_insert      *Books --> insert');  // API: Insert a new book (+ expects payload data, validated in schema)
    ROUTE('API /api/ +books_update/{id} *Books --> update');  // API: Update a specific book by ID (+ expects payload data, validated in schema)
    ROUTE('API /api/ -books_remove/{id} *Books --> remove');  // API: Remove a specific book by ID (- does not expect payload data)

    // API routing for websockets using at notation
    ROUTE('API @api -books              *Books --> query');   // API Websocket: Query all books (- does not expect payload data)
    ROUTE('API @api -books_read/{id}    *Books --> read');    // API Websocket: Read a specific book by ID (- does not expect payload data)
    ROUTE('API @api +books_insert       *Books --> insert');  // API Websocket: Insert a new book (+ expects payload data, validated in schema)
    ROUTE('API @api +books_update/{id}  *Books --> update');  // API Websocket: Update a specific book by ID (+ expects payload data, validated in schema)
    ROUTE('API @api -books_remove/{id}  *Books --> remove');  // API Websocket: Remove a specific book by ID (- does not expect payload data)

    // For WEBSOCKET Routing
    ROUTE('SOCKET /api/ @api', 1024 * 5);                                 // Handle websockets on the '/api/' path using at notation

}