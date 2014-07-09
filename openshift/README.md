#Deploying a basic total.js app to OpenShift

- Create a Node.js application (>= 0.10)
	rhc app create <appname> nodejs-0.10
- Add the newly created host to your registry by SSH-ing into it (follow instructions from command line)
- Checkout the new application you just created
	rhc git-clone <appname>
- Copy the example code here into your new app.	
	