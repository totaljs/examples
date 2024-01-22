
// Exporting the 'install' function, which sets up API routes for products.
exports.install = function() {
    // Handling GET request to retrieve a list of products.
    ROUTE('GET       /api/products/                         *Products --> list');

    // Handling GET request to read details of a specific product by ID.
    ROUTE('GET       /api/products/read/{id}/               *Products --> read');

    // Handling POST request to create a new product.
    ROUTE('POST      /api/products/create/                  *Products --> create');

    // Handling PUT request to update details of a specific product by ID.
    ROUTE('PUT       /api/products/update/{id}/             *Products --> update');

    // Handling DELETE request to delete a specific product by ID.
    ROUTE('DELETE    /api/products/delete/{id}/             *Products --> delete');

    // Handling GET request to toggle the publish status of a specific product by ID.
    ROUTE('GET       /api/products/publish/toggle/{id}/     *Products --> toggle');

    ROUTE('API       /api/   -products_list                 *Products --> list');
    ROUTE('API       /api/   +products_insert               *Products --> insert');
    ROUTE('API       /api/   -products_read/{id}            *Products --> read');
    ROUTE('API       /api/   +products_update/{id}          *Products --> update');
    ROUTE('API       /api/   -products_remove/{id}          *Products --> remove');
    ROUTE('API       /api/   -products_publish/toggle/{id}  *Products --> toggle');

}
