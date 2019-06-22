## Example: Controller Mail

This example shows how to create a URL that generates an email and then redirect to another page to display a confirmation message.

Features covered by this example:

* [Controllers](http://docs.totaljs.com/latest/en.html#pages~Controllers) - route URL requests to code
* [Views](http://docs.totaljs.com/latest/en.html#pages~View%20engine) - HTML template engine
* Config - settings (mail server) used by the framework
* [`ROUTE()`](http://docs.totaljs.com/latest/en.html#api~Framework~framework.route) - define a route
* [`controller.view()`](http://docs.totaljs.com/latest/en.html#api~FrameworkController~controller.view) - render a HTML template
* [`MAIL()`](http://docs.totaljs.com/latest/en.html#api~Framework~F.mail) - send an email
* [`controller.redirect()`](http://docs.totaljs.com/latest/en.html#api~FrameworkController~controller.redirect) - redirect a request
* [`@{layout`](http://docs.totaljs.com/latest/en.html#api~FrameworkViews~%40%7Blayout), `@{if}`, `@{fi}`, [`query.success`](http://docs.totaljs.com/latest/en.html#api~FrameworkViews~%40%7Bquery.customKey%7D) and [`{@model.key}`](http://docs.totaljs.com/latest/en.html#api~FrameworkViews~%40%7Bmodel.customKey%7D) template tags

### Overview

This example will perform the following sequence of events:

1. Requests to the site homepage (`/`) route to the `view_homepage()` function
	* `view_homepage()` renders the `homepage.html` "view" back to the browser
	* the page contains a link (`/mail/`) to send email
2. Requests to `/mail/` route to the `redirect_mail()` function
	* `redirect_mail()` renders the `email.html` view and sends it in an email
	* the user is then redirected back to the home page
3. The homepage template detects a `?success` query string on the URL and outputs a success message

### Routing (Controller)

The routing from URL path to handler function is done by the controller (`/controllers/default.js`):

```javascript
exports.install = function() {
	ROUTE( '/',      view_homepage);
	ROUTE( '/mail/', redirect_mail);
};
```

The first handler function renders `homepage.html` back to the browser:

```javascript
function view_homepage() {
	this.view('homepage');
}
```

> **Note:**
> The path and extension are automatically added if not specified, so `'homepage'` becomes `../views/homepage.html`.

The second handler function renders `email.html` to an SMTP server, and then redirects back to the homepage:

```javascript
function redirect_mail() {

	// send email template '~email' --> '../views/email.html'
	// the object in the last parameter is the "model"; it can be accessed in the template
	MAIL( 'petersirka@gmail.com', 'Test e-mail', '~email', { name: 'MODEL NAME' } );

	// redirect to home page
	this.redirect('/?success=1'); // <-- note 'success' query string
}
```

### Settings (Config)

The mail server used by `.mail()` is defined by `key : vlaue` pairs in the `/config` file:

```
// Mail settings
mail-smtp          : smtp.gmail.com
mail-smtp-options  : {"secure":true,"port":465,"user":"YOUR-GMAIL-EMAIL","password":"YOUR-GMAIL-PASSWORD","timeout":10000}
mail-address-from  : petersirka@gmail.com
mail-address-reply : petersirka@gmail.com
mail-address-bcc   :
```

### Templates (Views)

Now let's take a look at the HTML templates. First, the `/views/homepage.html`:

```html
@{layout('')}

@{if query.success}
		<div style="background-color:#E0E0E0;padding:10px">E-mail was sent.</div>
		<br />
@{fi}

<a href="/mail/">Send e-mail</a>
```

The `@{layout('')}` sets the layout for the view, in this case there isn't one.

> When the homepage is first displayed, the rendered output will be:
>
> ```html
> <a href="/mail/">Send e-mail</a>
> ```
>
> If the `?success` query string is detected, the rendered output will be:
>
> ```html
> <div style="background-color:#E0E0E0;padding:10px">E-mail was sent.</div>
> <br />
> <a href="/mail/">Send e-mail</a>
> ```

The `@{if query.success}` checks for the `success` query string on the URL - if found, the following lines are output up to the `{fi}` closing tag.

Next, let's look at the HTML template used for the email, `/views/email.html`:

```html
@{layout('')}

<h1>@{model.name}</h1>
<div>This is message.</div>
```

You'll notice the `@{model.name}` tag - it outputs the `.name` property of the "model" defined earlier in the `redirect_mail()` function.

> The rendered output of this template will be:
>
> ```html
> <h1>MODEL NAME</h1>
> <div>This is message.</div
> ```