---
title: Active Directory / LDAP Authentication
layout: doc.nosidebar
---
# AD and LDAP Authentication

To plug in an __Active Directory__ or any __LDAP__ repository you have to run a piece of software. This guide will walk you through the steps to download, run, deploy and customize such piece.

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
        Auth0 AD / LDAP Connector (zip)
        <small>source code zip file</small>
      </a>
    </li>
  </ul>
</div>

##1. Run the connector

> NOTE: If you are running on Mac or Linux, before moving forward, delete the `node_modules` folder and reinstall the modules with this command `rm -rf node_modules/passport-windowsauth && npm install`

Open a shell console, access the uncompressed folder and execute this command:

	> node server.js

When prompted for the ticket url you should paste the following:

    https://@@account.namespace@@/p/custom/@@ticket@@

> After entering the ticket, the connector will exchange trust information (like URLs, endpoints, etc.) with the server.

##2. Let's try to login!

Now that you have a running authentication server, let's try to login with a test user.

<a href="https://app.auth0.com/tester?ticket=@@ticket@@" class="btn btn-mid" target="_blank"><i class="icon icon-user"></i>&nbsp;<span class="text">Test Login</span></a>

-  Test User: __test__ 
-  Test Password: __123__

> By default, the connector will only allow one user to login: a __test__ user that is fixed in code. This is so you can try that everything works fine before changing it to use LDAP / AD.

##3. Connecting to AD / LDAP

Let's connect to AD or LDAP directories. 

In order to do so, open the ```config.json``` file and edit the following variables:

-  `LDAP_URL`: the url for the ldap server (e.g.: `ldap://myldap.com:389`)
-  `LDAP_BASE`: the base to query (e.g.: `DC=mycompany,DC=com`)
- `LDAP_BIND_USER`: a service account used for authentication and quering (currently this accepts the fully qualified name for the user, like CN=Foo,CN=Users,DC=fabrikam,DC=com)
- `LDAP_BIND_PASSWORD`: the password of the service account

Restart the server (`CTRL+C` to stop it) and try to login again.

<a href="https://app.auth0.com/tester?ticket=@@ticket@@" class="btn btn-mid" target="_blank"><i class="icon icon-user"></i>&nbsp;<span class="text">Test Login</span></a>

**Congratulations!** If you get a green check on this step, it means the configuration of the connector is done.

----

## Next Steps

Read the following sections to learn how to customize the login page and how to deploy it.

### Active Directory and Windows Integrated Authentication

By default, the connector will use forms-based authentication to your LDAP directory. However, if you are deploying this on your network and you use Active Directory, it is possible to configure Windows Integrated Authentication, so the user who is joined to the AD domain does not have to enter credentials at all. This only works if the connector is deployed to a Windows machine. 

To configure Windows Authentication

* Install iisnode [[x86](https://github.com/downloads/WindowsAzure/iisnode/iisnode-full-iis7-v0.2.2-x86.msi) | [x64](https://github.com/downloads/WindowsAzure/iisnode/iisnode-full-iis7-v0.2.2-x64.msi)
* Create a WebSite pointing to the folder running the site and enable only Anonymous Authentication
* Create a Virtual Directory pointing to the **wa** folder and enable only Windows Authentication
* Set the `integrated` variable in `config.json` to true

You can try the app now and get integrated Windows Authentication.

### Customize the login page

The login page can be customized by editing the [views/login.ejs](https://github.com/auth0/custom-connector/blob/master/views/login.ejs) file.

### Deploy it

The connector can be deployed on Windows and Linux.

Once you have the final URL of the service (not localhost), update the `SERVER_URL` configuration setting to the new address in the `config.json` file and restart the server.

#### Deployment options

* [Windows (IIS / IISNode)](https://github.com/tjanczuk/iisnode)
* [Linux](http://howtonode.org/deploying-node-upstart-monit)

### Production considerations

To avoid man in the middle attacks, this server has to be configured to use TLS/SSL. If you are running under IIS, configure the [web site to use SSL](http://www.iis.net/learn/manage/configuring-security/how-to-set-up-ssl-on-iis). If you are hosting on Linux, change the [server.js](https://github.com/auth0/ad-ldap-connector/blob/master/server.js) to use an [https server in node.js](http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener).

Finally, if you are looking for a highly available setup, this server can run behind a Network Load Balancer.

#### Troubleshooting

**Error binding to LDAP**

If you see this error in the console:

  Error binding to LDAP dn:
   code: 49
   message: 80090308: LdapErr: DSID-0C0903A9, comment: AcceptSecurityContext error, data 52e, v1db1

It means that the user was not valid. Try using the distinguished name of the user on the `LDAP_USER_BIND` property (e.g.: `CN=John Foo,CN=Users,DC=fabrikam,DC=com`).

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
