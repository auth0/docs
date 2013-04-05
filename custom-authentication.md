---
title: Custom Authentication
layout: doc.nosidebar
---
# Custom Authentication

To plug in a custom authentication you have to run a piece of software. This guide will walk you through the steps to download, run, deploy and customize such piece.

> Note: to make the installation easier, this tutorial will provide real time feedback every time you complete a step. You should see a green check besides the headings for every step accomplished. This tutorial is intended to be used by a developer.

##Prerequisites

In order to install your custom authorization provider you need to install node.js.

<div class="installers">
  <ul>
    <li>
      <a href="http://nodejs.org/dist/v0.8.22/node-v0.8.22-x86.msi" target="_blank">
        <img src="/img/node-windows.png" alt="">
        Windows Installer
        <small>node-v0.8.22-x86.msi</small>
      </a>
    </li>
    <li>
      <a href="http://nodejs.org/dist/v0.8.22/node-v0.8.22.pkg" target="_blank">
        <img src="/img/node-mac.png" alt="">
        Macintosh Installer
        <small>node-v0.8.22.pkg</small>
      </a>
    </li>
    <li id="source">
      <a href="http://nodejs.org/dist/v0.8.22/node-v0.8.22.tar.gz" target="_blank">
        <img src="/img/node-linux.png" alt="">
        Linux
        <small>node-v0.8.22.tar.gz</small>
      </a>
    </li>
  </ul>
</div>

Once node.js has been installed, download and unzip the source code for the connector

<div class="installers">
  <ul>
    <li>
      <a href="https://github.com/auth0/custom-connector/archive/master.zip" target="_blank">
        <img src="/img/package.png" alt="">
        Auth0 Connector (zip)
        <small>source code zip file</small>
      </a>
    </li>
  </ul>
</div>

##1. Run the connector

Open a shell console, access the uncompressed folder and execute the following command:

	> node server.js

When prompted for the ticket url you should paste the following:

	https://@@account.namespace@@/p/custom/@@ticket@@

> After entering the ticket the connector will exchange trust information (like URLs, endpoints, etc.) with the server and.

##2. Let's try to login!

Now that you have a running authentication server, let's try to login with a test user.

<a href="https://app.auth0.com/tester?connection=@@connectionDomain@@" class="btn btn-mid"><i class="icon icon-user"></i>&nbsp;<span class="text">Test Login</span></a>

-  Test User: __test__ 
-  Test Password: __123__

> By default, the connector will only allow one user to login: a __test__ user that is fixed in code. This is so you can try that everything works fine before changing it to use a real user repository (like a SQL database).

**Congratulations!** The connector is now setup.

----

## Next Steps

Read the following sections to learn how to customize the logic to authenticate users and how to deploy it.

### Plug your own authentication

To change the authentication logic, you will have to edit `users.js`

	exports.getProfile = function (name, password, callback) {
	  // lookup a user
	  // validate password
	  // return user with profile
	  
	  return callback(null, { id: 123, username: 'test', displayName: 'test user', ... });
	};

We implemented some examples providers that you can use as an example:

- [SQL Server database](https://github.com/auth0/custom-connector/tree/master/examples/FromSqlServer)
- [MongoDB database](https://github.com/auth0/custom-connector/tree/master/examples/FromMongoDb)
- [Any .NET code](https://github.com/auth0/custom-connector/tree/master/examples/From.Net)

### Customize the login page

The login page can be customized by editing the [views/login.ejs](https://github.com/auth0/custom-connector/blob/master/views/login.ejs) file.

### Deploy it

The connector can be deployed on your own network or in the cloud. It runs on Windows and Linux, although co depends on which technology you are using to store users. For instance, there is a way to connect to SQL Server through the native driver on Windows but not on Linux (which would use ODBX).

Once you have the final URL of the service, update the `SERVER_URL` configuration setting to the new address in the `config.json` file and restart the server.

#### On-Premise Deployment

* [Windows (IIS / IISNode)](https://github.com/tjanczuk/iisnode)
* [Linux](http://howtonode.org/deploying-node-upstart-monit)

#### Cloud Deployment

For your reference, here is a tutorial on how to deploy the application to a cloud provider.

* [Windows Azure Web Sites](http://www.windowsazure.com/en-us/develop/nodejs/tutorials/web-site-with-webmatrix/) 
* [Heroku](https://devcenter.heroku.com/articles/nodejs)


<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>

<script type="text/javascript">
var prevStep = 0, checkIntervalLapse = 5000;
var checkStep = function () {
	if ('@@ticket@@' === 'YOUR_TICKET')
		return;

	$.ajax({
		url:   '/ticket/step?ticket=@@ticket@@',
		cache: false
	}).done(function (data) {

		var currentStep = data.currentStep;
		if (prevStep == currentStep) return setTimeout(checkStep, checkIntervalLapse);

		for (var i = 1; i < currentStep; i++) {
			$('h2:contains(' + i + '.)')
				.addClass('step-finished')
				.prepend('<img src="/img/check.png">');
		};

		$('.current-step').removeClass('current-step');
		
		$('h2:contains(' + currentStep + '.)').addClass('current-step');

		if (currentStep === 3 && $('#logmeout3').length === 0) {
			$('<iframe id="logmeout3" style="visibility: hidden;" src="http://localhost:4000/logout"></iframe>')
				.appendTo('body');
		}

		prevStep = currentStep;
		setTimeout(checkStep, checkIntervalLapse);
	});
};
$(checkStep);
</script>