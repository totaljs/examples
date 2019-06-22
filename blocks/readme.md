## Example: Blocks

This example shows how to use [Blocks](http://docs.totaljs.com/latest/en.html#pages~Blocks%20\(JS%2BCSS%2BHTML\)) in HTML templates (views), CSS and JS files.

Features covered by this example:

* [`@{BLOCK}`](http://docs.totaljs.com/latest/en.html#pages~Blocks%20\(JS%2BCSS%2BHTML\)) and [`@{END}`](http://docs.totaljs.com/latest/en.html#pages~Blocks%20\(JS%2BCSS%2BHTML\)) tags in CSS, JS and HTML files
* `@{if}`, `@{fi}`, `@{else}` and [`@{import}`](http://docs.totaljs.com/latest/en.html#api~FrameworkViews~%40%7Bimport) tags in HTML files
* [`MAP()`](https://docs.totaljs.com/latest/en.html#api~global~MAP) method - clone files, enable blocks, merging files

### Overview

Blocks are conditional statements that can be used in views (HTML templates), CSS and JS files. Combined with some API functions, this feature allows you to minimise the number of files that you need to maintain, and the minimise the size of files delivered to the client device for a given scenario, particularly in cases where files for different scenarios contain mostly the same information.

First, let's take a look at how the blocks are defined in the files, then at the end we'll see how to choose the desired blocks in the output to the browser.

### Javascript blocks

If you have a `.js` script that contains some common code, some admin-only code and some user-only code, you could either clone the file and maintain two versions - one for admins, one for users - or you could use blocks like so:

```javascript
alert('ADMINS AND USERS');

// @{BLOCK admin}
alert('ADMIN ONLY');
// @{END}

// @{BLOCK users}
alert('USERS ONLY');
// @{END}
```

If the file is output without specifying blocks, you'd get:

```javascript
alert('ADMINS AND USERS');
```

If it's output with the `admin` blocks, you'd get:

```javascript
alert('ADMINS AND USERS');

alert('ADMIN ONLY');
```

And if it's output with `users` blocks you'd get:

```javascript
alert('ADMINS AND USERS');

alert('USERS ONLY');
```

You can see an example script in `/public/js/script.js`. It's also possible to specify multiple conditions per block, for example:

```javascript
// @{BLOCK admin, users, visitors}
alert('ADMINS OR USERS OR VISITORS');
// @{END}
```

### CSS files

CSS file blocks work in a similar manner, but note you can only use `/* ... */` block comments in a CSS file.

```css
/*
 * @{BLOCK admin}
 */
div { background-color: red; }
/*
 * @{END}
 */
```

You can see an example in `/public/css/style.css`.

### HTML templates (views)

```html
<!-- @{BLOCK users} -->
<p>USERS ONLY</p>
<!-- @{END} -->
```

### Notes

Regardless of file format, the `@{BLOCK}` and `@{END}` tags must be on separate lines.

### Block selection

To generate alternate versions of a file with one or more blocks enabled, simply use the framework `MAP()` method as shown below:

```javascript
// JS
MAP('/js/admin.js', '/js/script.js#admin'); // --> "admin" block enabled

// CSS
MAP('/css/admin.css', '/css/style.css#admin,moderator'); // --> "admin" and "moderator" blocks enabled
```

You can see an example in `/definitions/blocks.js`.

In the example above, `script.js` will be cloned to a new file `admin.js` which has the `admin` block enabled. Likewise, the `style.css` file will be cloned to a new file `admin.css` that has the `admin` and `moderator` blocks enabled.

You can apply the same approach to HTML files, although it can make your templates somewhat opaque.

An alternate approach might be:

```html
@{if url === '/admin/'}
   @{import('admin.css', 'admin.js')}
@{else}
   @{import('style.css', 'script.js')}
@{fi}
```

You can see an example in `views/index.html`.

In the example above, if the route that caused the template to be rendered was `/admin/`, it will use the `admin.css` and `admin.js` files, otherwise it will the `style.css` and `script.js` files.