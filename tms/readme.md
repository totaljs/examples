## TMS example

Simple example app for __Total Messaging Service (TMS)__. 

# Usage
Main logic of application is inside `users` schema (`schemas/users.js`). Declared array `USERS` represents database or storage of created users. You can list/read/create/update/remove users with REST API or Total's API routing.

# Usage - TMS
All TMS declaration are inside `definitions/tms.js`. You can connect to app's TMS with our [Flowstream](https://github.com/totaljs/flowstream). Default TMS route path is `/$tms/` but can be changed with property `default_tms_url` inside `config` file.

[`NEWPUBLISH()`](https://docs.totaljs.com/total4/407ff001jy51c/#a6eb9001fo51c) and [`NEWSUBSCRIBE()`](https://docs.totaljs.com/total4/407ff001jy51c/#a6eb8001bp51c) has multiple ways of declaration so you can pick which one you like. You can subscribe to events `users_insert`, `users_update` and `users_remove` with [`SUBSCRIBE()`](https://docs.totaljs.com/total4/407ff001jy51c/#a6ec1001uu51c). 
When someone create new user your TMS subscribe `users_insert` will recieve message with this object.

![User insert](https://i.imgur.com/YUtLKnO.png)
