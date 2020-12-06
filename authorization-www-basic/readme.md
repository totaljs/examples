## Example: Basic Access Authentication (BAA)

This example shows how to use [Basic Access Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) to authenticate users. For understanding `controller.baa()` --> `baa` means __`B`asic `A`ccess `A`uthentication__.

__Default credentials__:

- user: `totaljs`
- password: `123456`

Features covered by this example:

- `controller.baa()` - read login details from request
- `controller.baa('prompt')` - send login prompt on response (ask user to login)

See the `/controllers/default.js` for sample code.

> **Note:** BAA doesn't attempt to encrypt credentials and as such should only be used on HTTPS connections.

### Reading credentials

To read credentials, use the `.baa()` method in a route handler function:

```js
function authorization() {
	var auth = this.baa(); // this === controller
	// ...
}
```

This looks for the `Authorization: Basic <mime-encoded-userid-and-password>` HTTP header in the request, and returns an object containing relevant details:

```js
auth.empty;    // if true, no credentials were found
auth.user;     // the user name, if found
auth.password; // the password, if found
```

### Requesting credentials

If the user hasn't logged in yet, the `auth.empty` property will be `true` (no username or password found)... so, we need to prompt them for those details:

```js
function authorization() {

	// ...

	if (auth.empty) { // ask user to login
		this.baa('Admin Login Required.'); // or whatever prompt you want the user to see
		return;
	}

	// ...
}
```

This sends a response back to the browser which has a `WWW-Authenticate` HTTP header like this:

```
WWW-Authenticate: Basic realm="Admin Login Required."
```

On seeing that header, the browser will display the prompt (`Admin Login Required.`) along with a basic login form with fields for username and password. When the user submits the form, the browser will retry the request, only this time it will have the required `Authorization` HTTP header that we are looking for.

### Validating credentials

The resulting request should include the login credentials, now all we need to do is validate them:

```js
function authorization() {

	// ...

	// isValidLogin() would be custom function written by you
	// that checks whether user exists and also that the password
	// is correct for that user
	if ( isValidLogin( auth.user, auth.password ) ) {

		// do authorised stuff

	} else {

		// ask them to login again?
		this.baa('Admin Login Required.');
		return;

		// or maybe just throw a #401 error?
		this.view401('Invalid login details');
		return;

	}

}
```

### Bonus 1: Server-side caching

The browser will keep sending the `Authorization` header on subsequent requests for about 15 minutes, effectively keeping the user logged in (from user perspective). Downside is that, server-side, you have to re-check the credentials on every request. As such it's probably worth keeping a cache of validated credentials to avoid excessive database lookups, for example:

```js
var baaCache = {};

function authorization() {

	// ...

	if ( (baaCache[auth.user] && baaCache[auth.user] === auth.password) || isValidLogin( auth.user, auth.password ) ) {

		baaCache[auth.user] = auth.password; // cache

		// do authorised stuff

	} else {
		// ...
	}
}

function housekeeping(tick) {
	if (tick % 5 === 0) // every 5 mins clear cache
		baaCache = {};
}

// add this to export.install() at top of script:
F.on('service', housekeeping)

// also add an export.uninstall() to remove the listener
export.uninstall = function() {
	F.removeListener('service', housekeeping);
}
```

### Bonus 2: URI authentication

The `.baa()` method only checks request HTTP headers for credentials, it doesn't check for credentials in the URI like this:

```
https://user:password@www.example.com/
```

If you wish to accept credentials in the URI, use `.req.uri.auth`:

```js
function authorization() {

	// ...

	if (auth.empty) { // check for URI auth first, before asking user to login

		if (this.req.uri.auth) { // found credentials on auth, use those instead

			let creds = this.req.uri.auth.split(':');
			auth.user = creds[0];
			auth.password = creds[1];
			auth.empty = false;

		} else {
			this.baa('Admin Login Required.'); // or whatever prompt you want the user to see
			return;
		}

	}

	// ...
}
```