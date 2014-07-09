#Deploying a basic total.js app to OpenShift

- Create a Node.js application (>= 0.10)
    `rhc app create <appname> nodejs-0.10`
- Add the newly created host to your registry by SSH-ing into it (follow instructions from command line)
- Checkout the new application you just created
	`rhc git-clone <appname>`
- Copy the example code here into your new app.  You can delete any extraneous files from the original app (e.g. server.js, index.html, deplist.txt)
- Commit and push your changes, and test your app at `http://<appname>-<namespace>.rhcloud.com/`

And that's it!