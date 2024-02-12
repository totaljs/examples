// Define API connectors
// https://docs.totaljs.com/total4/407ff001jy51c/#rspi001cs41d


NEWAPI('Payments', function(opt, next) {
    RESTBuilder.API(CONF.payments_api, opt.schema, opt.data).callback(next);
});
