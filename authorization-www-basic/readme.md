## Example: Basic Access Authentication (BAA)

This example shows how to use [Basic Access Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) to authenticate users.

Features covered by this example:

* `controller.baa()` - read login details from request
* `controller.baa('prompt')` - send login prompt on response (ask user to login)

See the `/controllers/default.js` for sample code.

### Reading credentials

To read credentials, use the `.baa()` method in a route handler function:

```javascript
function authorization() {
  var auth = this.baa(); // this === controller

  // ...
}
```

This looks for the `Authorization: Basic <mime-encoded-userid-and-password>` HTTP header in the request, and returns an object containing relevant details:

```javascript
auth.empty // if true, no credentials were found
auth.user // the user name, if found
auth.password // the password, if found
```

### Requesting credentials

If the user hasn't logged in yet, the `auth.empty` property will be `true` (no username or password found)... so, we need to prompt them for those details:

```javascript
function authorization() {

  // ...

  if (auth.empty) { // ask user to login
    this.baa('Log in, bro.'); // or whatever prompt you want the user to see
    return;
  }

  // ...
}
```

This sends a response back to the browser which has a `WWW-Authenticate` HTTP header like this:

```
WWW-Authenticate: Basic realm="Log in, bro."
```

On seeing that header, the browser will display the prompt (`Log in, bro.`) along with a basic login form with fields for username and password. When the user submits the form, the browser will retry the request, only this time it will have the required `Authorization` HTTP header that we are looking for.

### Validating credentials

The resulting request should include the login credentials, now all we need to do is validate them:

```javascript
function authorization() {

  // ...

  // isValidLogin() would be custom function written by you
  // that checks whether user exists and also that the password
  // is correct for that user
  if ( isValidLogin( auth.user, auth.password ) ) {

    // do authorised stuff

  } else {

    // ask them to login again?
    this.baa('Wrong details, try again, bro.');
    return;

    // or maybe just throw a #401 error?
    this.view401('Invalid login details');
    return;

  }

}
```

> Note: The browser will keep sending the `Authorization` header on subsequent requests for about 15 minutes or more, effectively keeping the user logged in (from user perspective). Downside is that, server-side, you have to re-check the credentials on every request.

## Notes

BAA doesn't make any attempt to encrypt the login details it sends via the `Authorization` HTTP header so, ideally, you should only ever use BAA over HTTPS connections.