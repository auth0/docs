---
title: Custom Authentication
layout: doc.nosidebar
---
# AD and LDAP Authentication

To plug in an __Active Directory__ or any __LDAP__ authentication provider to __@@account.appName@@__ you have to run a piece of software. This guide will walk you through the steps to download, run, deploy and customize such piece.

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
      <a href="https://github.com/auth0/ad-ldap-connector/archive/master.zip" target="_blank">
        <img src="/img/package.png" alt="">
        Auth0 Connector (zip)
        <small>source code zip file</small>
      </a>
    </li>
  </ul>
</div>

####1. Run the connector

Open a shell console, access the uncompressed folder and execute this command:

	node server.js

When prompted for the ticket url you should paste this ```https://@@account.namespace@@/p/custom/@@ticket@@```.


####2. Let's try to login!

Now that you have a running authentication server running, let's try to login with a fake user. 

Go to __@@account.appName@@__ and login with 

-  domain: __@@connectionDomain@@__ 
-  username: __test__ 
-  password: __123__

Finally logout from __@@account.appName@@__ and continue to the next step. 

####3. Validate real users

The application comes with hardcoded user but the purpose of this software is to connect AD or LDAP directories.

In order to do so, open the ```config.json``` file and edit the variables:

-  __LDAP_URL__: the url for the ldap server (eg: ```ldap://myldap.com/DC=mycompany,DC=com```)
-  __LDAP_BASE__: the base to query (eg: ```DC=mycompany,DC=com```)
-  __LDAP_BIND_USER__: a proxy user for authentication and quering (eg: ```auser```)
-  __LDAP_BIND_PASSWORD__: the password of the bind user in plain text

When you feel ready to try it, restart the server and try to login in __@@account.appName@@__ again. 

####4. Deploy your application

In the last step you will deploy your application. You have many options, you can deploy it on premises and/or to a platform as a service cloud provider.

If you deploy on premises and you want only intranet users to log to __@@account.appName@@__ you don't need to make it public.

Make sure you edit the ```SERVER_URL``` configuration setting in the ```config.json``` file.

#####IISNode

Create a web application in your IIS pointing to the application folder.

#####Azure Websites

Follow <a href="http://www.windowsazure.com/en-us/develop/nodejs/tutorials/create-a-website-(mac)/?fb=es-es">this tutorial</a>.

#####Heroku

Follow [this tutorial](https://devcenter.heroku.com/articles/nodejs).

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>

<script type="text/javascript">
var prevStep = 0, checkIntervalLapse = 5000;
var checkStep = function () {
	$.ajax({
		url:   '/ticket/step?ticket=@@ticket@@',
		cache: false
	}).done(function (data) {

		var currentStep = data.currentStep;
		if (prevStep == currentStep) return setTimeout(checkStep, checkIntervalLapse);

		for (var i = 1; i < currentStep; i++) {
			$('h4:contains(' + i + '.)')
				.addClass('step-finished')
				.prepend('<img src="/img/check.png">');
		};

		$('.current-step').removeClass('current-step');
		
		$('h4:contains(' + currentStep + '.)').addClass('current-step');

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