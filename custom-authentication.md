---
title: Custom Authentication
layout: doc.nosidebar
---
# Custom Authentication

We will guide you to a series of steps to deploy a customized authentication provider.

__Note:__ you will se a check mark in every step once finished.

##Prerequisites

In order to install your custom authorization provider you need to install [node.js 0.8.x](http://nodejs.org/dist/v0.8.22/).

##Guide


####1. Download the package

Download and unzip the application from [here](https://github.com/auth0/custom-connector/archive/master.zip).

Open a shell console, access the uncompressed folder and execute this command:

	node server.js

You will be guide through a series of steps. When prompted for the ticket you should use this ```@@ticket@@```.


####2. Let's try to login!

Now that you have a running authentication server running, let's try to login with a fake user. 

Go to __@@account.appName@@__ and login with 

-  domain: __@@connectionDomain@@__ 
-  username: __test__ 
-  password: __123__

Finally logout from __@@account.appName@@__ and continue to the next step. 

####3. Validate real users

The application comes with an script that validate user names and passwords from an in memory collection.

Copy one of our examples in the example folder and create your custom logic.

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