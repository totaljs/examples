// ================================================
// AUTHORIZATION
// Please note that this method is called for all routes, regardless of flags set.
// For example, if the route is flagged with 'authorize', and the callback return value is false, the response status will be 401.
// Alternatively, beware that if the route is flagged with 'unauthorize', and the callback return value is false, the response status will be 200 OK.
// ================================================

var opt = {};

// A secret key
opt.secret = CONF.cookie_secret;

// A cookie name (optional)
opt.cookie = CONF.cookie;

// Header name for obtaining of token (if you do not want to use cookie (or can be used with the cookie)
// opt.header = 'REQUEST_HEADER_NAME';

// Enables strict security according to the browser device (default: true)
// opt.strict = true;

// Memory expiration
// opt.expire = '5 minutes';

// A simple DDOS protection (max. limit per IP)
// opt.ddos = 10;

// A cookie options
// opt.options = { samesite: 'lax' }

// Logout delegate
// opt.onlogout = function({ sessionid, userid });

// Delegate will be executed for each request that has obtained session
// If the delegate returns true {Boolean} then the next processing will be canceled
// $ = AuthOptions
// opt.onsession = function(session, $, init)

// Delegate will be executed if the request is blocked
// $ = AuthOptions
// opt.onddos = function($)

// Data read delegate
opt.onread = function(meta, next) {

	// meta.sessionid {String}
	// meta.userid {String}
	// meta.ua {String} A user-agent
	// next(err, USER_DATA) {Function} A callback function

	NOSQL('users').one().where('id', meta.userid).callback(next);
};

// Release delegate
opt.onfree = function(meta) {
	// meta.sessions {Array String} with sessionid
	// meta.users {Array String} with userid (can be "null")
};

// Applies preddefined session + extends "opt" object
AUTH(opt);

// Logout:
// opt.logout($);
// returns Boolean;

// Releases all users in the memory
// opt.refresh(userid, [except_session_id]);

// Updates all existing sessions
// opt.update(userid, function(user) {});

// Creates a token for cookie or custom header
// opt.sign(sessionid, userid);
// returns String;

// Creates a secured cookie
// $ can be controller or Schema/Task/Operation options
// opt.authcookie($, sessionid, userid, expiration, [options]);

// Contains all sessions
// opt.sessions {Object}

// Contains all blocked IP addresses
// opt.blocked {Object}

// Stores "session" instance to a global variable
MAIN.session = opt;