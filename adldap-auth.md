---
title: Active Directory / LDAP Authentication
layout: doc.nosidebar
---
# AD and LDAP Authentication

Connecting with __Active Directory__ or any other __LDAP__ server with Auth0 usually involves deploying and running a piece of software on your side.

<div class="platform-selector">

  <div class="installers">
    <ul>
      <li>
        <a href="http://assets.auth0.com.s3.amazonaws.com/adldap.msi">
          <img src="/img/node-windows.png" alt="">
          Auth0 Active Directory Agent for Windows
          <small>adldap.msi</small>
        </a>
      </li>
    </ul>
  </div>

<a href="https://@@account.namespace@@/p/custom/@@ticket@@?x=1" class="other-platforms">... or install in other platforms</a>

When prompted for the ticket url, paste the following:

<pre class="lang-html">https://@@account.namespace@@/p/custom/@@ticket@@</pre>

Then you will be asked your LDAP settings.

<!--
### Active Directory and Windows Integrated Authentication

By default, the connector will use forms-based authentication to your LDAP directory. However, if you are deploying this on your network and you use Active Directory, it is possible to configure Windows Integrated Authentication, so the user who is joined to the AD domain does not have to enter credentials at all. This only works if the connector is deployed to a Windows based machine.

To configure Windows Authentication:

* Install iisnode [x86](https://github.com/downloads/WindowsAzure/iisnode/iisnode-full-iis7-v0.2.2-x86.msi) | [x64](https://github.com/downloads/WindowsAzure/iisnode/iisnode-full-iis7-v0.2.2-x64.msi) and the [rewrite module](http://www.iis.net/download/URLRewrite)
* Create a WebSite pointing to the folder running the site, disable Anonymous Authentication and enable __Windows Authentication__ only.
* Update the `config.json` file with the new `SERVER_URL`
* Everytime you change something in the config.json file, open a browser to /test-iss to test the configuration

<a href="@@uiURL@@/tester?ticket=@@ticket@@" class="btn btn-mid" target="_blank"><i class="icon icon-user"></i>&nbsp;<span class="text">Test login again!</span></a>
 -->