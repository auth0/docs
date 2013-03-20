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

####2. Validate users

The application comes with an script that validate user names and hashed passwords from a table in sql server. 

You can customize this functionality to change the DBMS engine or the way user information is stored by simple editing the file ```users.js```.


####3. Configure the application

There are few configuration variables to setup:

-  ```SQL_CONNECTION_STRING```: this is the connection string to sql server.
-  ```WSFED_CALLBACKS_URLS```: Valid callbacks urls, use __https://@@account.namespace@@/login/callback__
-  ```WSFED_ISSUER```: The issuer of the WS-Federation tokens. Use the name of your company.
-  ```SITE_NAME```: The title to display in the login page. You can use the name of your company.

If you deploy to IISNode or Windows Azure Websites, just copy ```web.config-sample``` as ```web.config``` and change the settings there.

If you deploy to heroku, use [```heroku config:set```](https://devcenter.heroku.com/articles/config-vars#setting-up-config-vars-for-a-deployed-application)

####4. Customize logo and login form


The application comes with a nice login page as shown here:

![](img/custom-provider-screenshot.png)

You can customize the logo and style by changing these files: ```views/login.ejs```, ```public/site.css``` and ```public/imgs/logo.png```.

Usually you will also add links for things like __retrieving lost password__.

####5. Generate a certificate

You need to generate a x509 certificate in order to sign authentication requests. Use openssl as follows:

	openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -subj "/CN=yourcompany.com" -keyout cert.key  -out cert.pem

And copy the ```cert.key``` and ```cert.pem``` to the certs folder.

####6. Deploy

#####IISNode

Create a web application in your IIS pointing to the application folder.

#####Azure Websites

Follow <a href="http://www.windowsazure.com/en-us/develop/nodejs/tutorials/create-a-website-(mac)/?fb=es-es">this tutorial</a>.

#####Heroku

Follow [this tutorial](https://devcenter.heroku.com/articles/nodejs).
