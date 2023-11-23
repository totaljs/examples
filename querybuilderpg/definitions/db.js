// Requiring the 'querybuilderpg' module.
var queryBuilder = require('querybuilderpg');

// Initializing the 'querybuilderpg' module with the following parameters:
// 1. 'default': This specifies the name of the connection pool. It could be any string identifier.
// 2. CONF.database: It contains the configuration details for connecting to the PostgreSQL database.
// 3. 1: This specifies the number of database connections in the pool.
// 4. ERROR('Postgres'): This specifies an error handler function for handling PostgreSQL-related errors.
queryBuilder.init('default', CONF.database, 1, ERROR('Postgres'));