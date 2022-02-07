require('total4');

// Unit-testing documentation:
// https://docs.totaljs.com/total4/40842001ok51c/

TESTER(async function(group, start) {

    var url = 'http://localhost:8000/';

    // Define group 'Users'
    group('Users', function(test, cleanup) {

        // Define test 'Users - Create'
        test('Create', function(next) {
            // If first argument of 'next' is "truthy", test is evaluated as failed
            // next(true)  - Fail
            // next(1 + 1) - Fail
            // next(false) - OK
            // next()      - OK

            var data = { email: 'abc@def.ijk' };

            RESTBuilder.POST(url + '/users/', data).exec(function(err, res) {
                if (err)
                    next(err);
                else
                    next();
            });

            // Shorthand
            RESTBuilder.POST(url + '/users/', data).exec(next);

        });

        // Called after:
        // - All tests are successful
        // - One test failed (error argument is returned)
        cleanup(function(err) {
            if (err)
                console.log('Group failed');
            else
                console.log('Group was successful');
        });

    });

    // https://docs.totaljs.com/total4/407ff001jy51c/#49a0f001nk51c
    await LOAD('../');

    // Start tester
    start();

});