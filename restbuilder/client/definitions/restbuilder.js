
// Function to test the 'list' endpoint
FUNC.testListEndpoint = function() {
    RESTBuilder.GET(CONF.baseurl).callback(function(err, response) {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('List of products:', response);
        }
    });
}

// Function to test the 'read' endpoint with a specific product ID
FUNC.testReadEndpoint = function(productid) {
    RESTBuilder.GET(CONF.baseurl + '/read/' + productid).callback(function(err, response) {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('Product details:', response);
        }
    });
}

// Function to test the 'create' endpoint with new product data
FUNC.testCreateEndpoint = function(productData) {
    RESTBuilder.POST(CONF.baseurl + '/create/', productData).callback(function(err, response) {
        if (err) {
            console.error('Error:', err);
        } else {
            id = response.value;
            console.log('New product created:', response);
        }
    });
}

// Function to test the 'update' endpoint with product ID and updated data
FUNC.testUpdateEndpoint = function (productid, updatedProductData) {
    RESTBuilder.PUT(CONF.baseurl + '/update/' + productid, updatedProductData).callback(function(err, response) {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('Product updated:', response);
        }
    });
}

// Function to test the 'delete' endpoint with a specific product ID
FUNC.testDeleteEndpoint = function(productid) {
    RESTBuilder.DELETE(CONF.baseurl + '/delete/' + productid).callback(function(err, response) {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('Product deleted:', response);
        }
    });
}

// Function to test the 'toggle' endpoint with a specific product ID
FUNC.testToggleEndpoint = function (productid) {
    RESTBuilder.GET(CONF.baseurl + '/publish/toggle/' + productid).callback(function(err, response) {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('Publish status toggled:', response);
        }
    });
};
