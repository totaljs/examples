exports.install = function() {
    ROUTE('GET /test/standard/', test_standard);
    ROUTE('GET /test/api/', test_api);
}


function test_standard() {
    // Example usage of the test functions
    var id = '162an001ih52d'; // Replace with an actual product ID
    var data = { name: 'Sample Product', price: 100, description: 'This is a sample product description'};

    FUNC.testListEndpoint();
    FUNC.testCreateEndpoint(data);
    FUNC.testReadEndpoint(id);
    FUNC.testUpdateEndpoint(id, data);
    FUNC.testToggleEndpoint(id);
    FUNC.testDeleteEndpoint(id);
}