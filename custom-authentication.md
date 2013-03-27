---
title: Custom Authentication
layout: doc.nosidebar
---
# Custom Authentication

We will guide you to a series of steps to deploy a customized authentication provider.

##Where to deploy?

This component can be deployed on-premises or to the cloud. It is an standard node.js web application that can be easily deployed to [Azure](http://windows.azure.com), [Heroku](http://heroku.com), [Nodejitsu](http://jit.su) or simply within the boundaries of your company in both Windows or Linux Server.

If you are deploying to Windows we recommend you using IIS and [IISNode](https://github.com/tjanczuk/iisnode).

##Guide


####1. Download the package

Download and unzip the application from [here](https://github.com/auth0/sql-federation-server/archive/master.zip).

####2. Initialize the configuration

Open a shell console, access the uncompressed folder and execute this command:

	node_modules/bin/connector-setup

You will be guide through a series of steps. When prompted for the ticket you should use this ```@@ticket@@```.

####3. Validate users

The application comes with an script that validate user names and passwords from a table in sql server. 

Copy ```users.js-sample``` into ```users.js``` and customize this functionality.


####4. Customize logo and login form


The application comes with a nice login page as shown here:

![](img/custom-provider-screenshot.png)

You can customize the logo and style by changing these files: ```views/login.ejs```, ```public/site.css``` and ```public/imgs/logo.png```.

Usually you will also add links for things like __retrieving lost password__.

####5. Deploy

#####IISNode

Create a web application in your IIS pointing to the application folder.

#####Azure Websites

Follow <a href="http://www.windowsazure.com/en-us/develop/nodejs/tutorials/create-a-website-(mac)/?fb=es-es">this tutorial</a>.

#####Heroku

Follow [this tutorial](https://devcenter.heroku.com/articles/nodejs).
