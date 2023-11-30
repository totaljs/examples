// /definitions/db.js
// npm install querybuildermysql2
require('querybuildermysql2').init('default', CONF.database);
// require('querybuildermysql2').init(name, connectionstring, pooling, [errorhandling]);
// name {String} a name of DB (default: "default")
// connectionstring {String} a connection to the [__ MySQL__](https://www.mysql.com)
// pooling {Number} max. clients (default: "0" (disabled))
// errorhandling {Function(err, cmd)}
