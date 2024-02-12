NEWSCHEMA('Products', function(schema) {
    schema.action('list', {
        name: 'List products',
        query: 'search:String',
        action: function($) {
            // Retrieve a list of products from the 'tbl_product' table.
            var builder = DATA.list('public.tbl_product');
            
            // Automatically handle query parameters and pagination for the product list.
            builder.autoquery($.query, 'id:UID,name:String,price:Number,description:String,ispublished:Boolean,dtcreated:Date,dtupdated:Date', 'dtcreated_desc', 10);
            
            // Apply search filter if a search query parameter is provided.
            $.query.search && builder.search('search', $.query.search);
            
            // Filter products where 'isremoved' is FALSE and 'ispublished' is TRUE.
            builder.where('isremoved=FALSE');
            builder.where('ispublished=TRUE');
            
            // Callback function to send the product list as the response.
            builder.callback($.callback);

        }
    });

    schema.action('create', {
        name: 'Create new product',
        input: '*name:String,*price:Number,description:String',
        action: function($, model) {
            // Generate a unique ID for the new product.
            model.id = UID();
            
            // Set the creation timestamp.
            model.dtcreated = NOW;
            
            // Generate a search-friendly version of the product name.
            model.search = model.name.toSearch();
            
            // Insert the new product into the 'tbl_product' table.
            DATA.insert('tbl_product', model).callback($.done(model.id));
        }
    });

    schema.action('read', {
        name: 'Read a special product',
        params: '*id:UID',
        action: function($) {
            // Retrieve specific fields of a product based on its ID.
             DATA.read('tbl_product').fields('id,name,price,description,ispublished,dtcreated,dtupdated').id($.params.id).where('isremoved=FALSE').callback($.callback);
        }

    });

    schema.action('update', {
        name: 'Update', 
        params: '*id:UID',
        input: 'name:String,price:Number,description',
        action: function($, model) {
            // Set the update timestamp.
            model.dtupdated = NOW;

            // If the product name is provided, update the search field accordingly.
            if (model.name)
                model.search = model.name.toSearch();
        
            // Update the product in the 'tbl_product' table based on its ID.
            DATA.update('tbl_product', model).id($.params.id).where('isremoved=FALSE').error(404).callback($.done());
        }
    });


    schema.action('delete', {
        name: 'Delete product from database', 
        params: '*id:UID',
        action: function($, model) {
            // Remove the product from the 'tbl_product' table based on its ID.
            DATA.remove('tbl_product').id($.params.id).where('isremoved=FALSE').error(404).callback($.done());
        }
    });

    schema.action('toggle', {
        name: 'Toggle published/unpublished of products', 
        params: '*id:UID',
        action: function($, model) {
            // Toggle the 'ispublished' status of the product to true.
            DATA.update('tbl_product', { '!ispublished': true }).id($.params.id).where('isremoved=FALSE').error(404).callback($.done());
        }   
    });
});

