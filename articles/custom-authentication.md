---
title: Custom Authentication
---
# Custom Authentication

Custom authentication with Auth0 usually involves deploying and running a piece of software on your side. This guide will walk you through the steps to download, run, deploy and customize such component.

> Note: to make the installation easier, this tutorial will provide real time feedback every time you complete a step. You should see a green check besides the headings for every step accomplished. This tutorial is intended to be used by a developer.

## Prerequisites

In order to install the __Auth0 Custom Authentication Connector__ you need to first install node.js.

<div class="installers">
  <ul>
    <li>
      <a href="http://nodejs.org/dist/v0.8.22/node-v0.8.22-x86.msi">
        <img src="//cdn.auth0.com/docs/img/node-windows.png" alt="">
        Windows Installer
        <small>node-v0.8.22-x86.msi</small>
      </a>
    </li>
    <li>
      <a href="http://nodejs.org/dist/v0.8.22/node-v0.8.22.pkg">
        <img src="//cdn.auth0.com/docs/img/node-mac.png" alt="">
        Macintosh Installer
        <small>node-v0.8.22.pkg</small>
      </a>
    </li>
    <li id="source">
      <a href="http://nodejs.org/dist/v0.8.22/node-v0.8.22.tar.gz">
        <img src="//cdn.auth0.com/docs/img/node-linux.png" alt="">
        Linux
        <small>node-v0.8.22.tar.gz</small>
      </a>
    </li>
  </ul>
</div>

Once node.js has been installed, download and unzip the source code for the __Auth0 Custom Authentication Connector__

<div class="installers">
  <ul>
    <li>
      <a href="https://github.com/auth0/custom-connector/archive/master.zip">
        <img src="//cdn.auth0.com/docs/img/package.png" alt="">
        Auth0 Custom Authentication Connector (zip)
        <small>source code zip file</small>
      </a>
    </li>
  </ul>
</div>

## 1. Run the connector

Open a shell console, access the uncompressed folder and execute the following command:

	> node server.js

When prompted for the ticket url, paste the following:

	https://${account.namespace}/p/custom/${ticket}

> After entering the ticket, the connector will exchange trust information (like URLs, endpoints, etc.) with the server to complete the setup on Auth0.

## 2. Let's try to login!

Now that you have a running authentication server, let's try to login with a test user.

<a href="${uiURL}/tester?ticket=${ticket}" class="btn btn-mid"><i class="icon icon-user" rel="nofollow"></i>&nbsp;<span class="text">Test Login</span></a>

-  Test User: __foo@bar.com__
-  Test Password: __123__

> By default, the connector will only allow one user to login: a __test__ user that is hard coded in the app. This is so you can verify that everything works fine before changing it to use a real user repository (like a SQL database).

**Congratulations!** If you get a green check on this step, it means the configuration of the connector has been successful.

----

## Next Steps

Read the following sections to learn more about customizing the logic to authenticate users and deploying it.

### Plug your own authentication

To change the authentication logic, you will have to edit `users.js`

	exports.getProfile = function (name, password, callback) {
	  // lookup a user
	  // validate password
	  // return user with profile

	  return callback(null, { id: 123, username: 'test', displayName: 'test user', ... });
	};

We implemented some sample providers that you can use as starting points:

- [SQL Server database](https://github.com/auth0/custom-connector/tree/master/examples/FromSqlServer)
- [MongoDB database](https://github.com/auth0/custom-connector/tree/master/examples/FromMongoDb)
- [Any .NET code](https://github.com/auth0/custom-connector/tree/master/examples/From.Net)

### Customize the login page

The login page can be customized by editing the [views/login.ejs](https://github.com/auth0/custom-connector/blob/master/views/login.ejs) file.

### Deploy it

The connector can be deployed on your own network or in the cloud. It runs on Windows and Linux. Choosing one or the other usually will depend on which technology you are using to store users. For instance, connecting to a Microsoft SQL Server database, typically depends on native drivers that work on Windows but not on Linux.

Once you have the final URL of the service, update the `SERVER_URL` configuration setting in the `config.json` file with the new address, then restart the server.

#### On-Premises Deployment

For more information on hosting node.js see:

* [Windows (IIS / IISNode)](https://github.com/tjanczuk/iisnode)
* [Linux](http://howtonode.org/deploying-node-upstart-monit)

#### Cloud Deployment

For your reference, here are tutorials you can follow to learn more about deploying the application to a cloud provider.

* [Windows Azure Web Sites](http://www.windowsazure.com/en-us/develop/nodejs/tutorials/web-site-with-webmatrix/)
* [Heroku](https://devcenter.heroku.com/articles/nodejs)

### Production considerations

To avoid man in the middle attacks, this server has to be configured to use TLS/SSL. If you are running under IIS, configure the [web site to use SSL](http://www.iis.net/learn/manage/configuring-security/how-to-set-up-ssl-on-iis).

If you are hosting on Linux, change the [server.js](https://github.com/auth0/ad-ldap-connector/blob/master/server.js) to use an [https server in node.js](http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener).

Finally, if you are looking for a highly available setup, you can simply install multiple instances of this server behind a Network Load Balancer.

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>

<script type="text/javascript">
var prevStep = 0, checkIntervalLapse = 5000;
var checkStep = function () {
	if ('${ticket}' === 'YOUR_TICKET')
		return;

	$.ajax({
		url:   '/ticket/step?ticket=${ticket}',
		cache: false
	}).done(function (data) {

		var currentStep = data.currentStep;
		if (prevStep == currentStep) return setTimeout(checkStep, checkIntervalLapse);

		for (var i = 1; i < currentStep; i++) {
			$('h2:contains(' + i + '.)')
				.addClass('step-finished')
				.prepend('<img src="//cdn.auth0.com/docs/img/check.png">');
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
