require('total4');
const number = 'YOURPHONENUMBER';

LOAD(['config'], async function() {
// =============================================
//                   Method 1 : Await the response
// =============================================
    var response = await API('TAPI', 'sms', { from: 'Total.js', to: number, body: 'Happy coding!' }).promise();
    console.log(response);



// =============================================
//                   Method 2: with callback
// =============================================

    API('TAPI', 'sms', { from: 'Total.js', to: number, body: 'Happy coding!' }, function(err, res, out) {
        console.log(res);
    });
    // This assumes that you have set `totalapi` inf `/config` file
});


// =============================================
//                   Method 2: with apikey
// =============================================
const API_KEY = 'YOUR APIKEY';
TotalAPI(API_KEY, 'sms', { from: 'Total.js', to: number, body: 'Happy coding!' }, function(err, response) {
    console.log(response);
});



