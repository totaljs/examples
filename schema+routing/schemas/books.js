// Create an empty array to store book data
var Books = [];

// Define a new schema for 'Books'
NEWSCHEMA('Books', function(schema) {

    // Action for querying books
    schema.action('query', {
        name: 'Listing books',
        query: 'search:String',
        action: function($) {
            // Callback with the array of books
            $.callback(Books);
        }
    });

    // Action for reading a specific book
    schema.action('read', {
        name: 'Read a specific book',
        params: '*id:UID',
        action: function($) {
            var params = $.params;
            // Find the book by ID in the array
            var item = Books.findItem('id', params.id);
            if (!item) {
                // If the book is not found, return a 404 error
                $.invalid(404);
                return;
            }
            // Callback with the found book
            $.callback(item);
        }
    });

    // Action for inserting a new book
    schema.action('insert', {
        name: 'Insert new book',
        input: '*title:String,description:String,price:Number,author:String,year:String',
        action: function($, model) {
            // Generate a unique ID and set the creation timestamp
            model.id = UID();
            model.dtcreated = NOW;
            // Create a search string for the book
            model.search = (model.title + ' ' + model.description + ' ' + model.author + ' ' + model.year).toSearch();
            // Add the new book to the array
            Books.push(model);
            // Callback with the ID of the inserted book
            $.done(model.id)();
        }
    });

    // Action for updating a book
    schema.action('update', {
        name: 'Update book',
        params: '*id:String',
        input: '*title:String,description:String,price:Number,author:String,year:String',
        action: function($, model) {
            var item = Books.findItem('id', $.params.id);
            if (!item) {
                // If the book is not found, return a 404 error
                $.invalid(404);
                return;
            }
            // Update the book with the new data
            model.dtupdated = NOW;
            model.search = (model.title + ' ' + model.description + ' ' + model.author + ' ' + model.year).toSearch();
            for (var el in model) 
                item[el] = model[el];
            // Callback with the ID of the updated book
            $.done(model.id)();
        }
    });

    // Action for removing a book
    schema.action('remove', {
        name: 'Remove book',
        params: '*id:String',
        action: function($) {
            var params = $.params;
            // Find the index of the book in the array
            var index = Books.findIndex('id', params.id);
            console.log(index);
            if (index === -1) {
                // If the book is not found, return a 404 error
                $.invalid(404);
                return;
            }
            // Remove the book from the array
            Books.remove(item => item.id == index);
            // Callback to indicate successful removal
            $.done()();
        } 
    });
});
