exports.install = function () {
    ROUTE('GET /', function () {
        var self = this;
        self.plain('REST Service {0}\nVersion: {1}'.format(CONF.name, CONF.version));
    })

    // Sets cors for the entire API
    CORS();
    ROUTE('GET    /api/users/        *Users --> query');
    ROUTE('GET    /api/users/{id}/   *Users --> read');
    ROUTE('POST   /api/users/        *Users --> insert');
    ROUTE('PUT    /api/users/{id}/   *Users --> update');
    ROUTE('DELETE /api/users/{id}/   *Users --> remove');
}
