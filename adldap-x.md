---
title: Active Directory / LDAP Authentication
layout: doc.nosidebar
---
# AD and LDAP Authentication

Connecting with __Active Directory__ or any other __LDAP__ server with Auth0 usually involves deploying and running a piece of software on your side. This guide will walk you through the steps to download, run, deploy and customize such component.

> Note: to make the installation easier, this tutorial will provide real time feedback every time you complete a step. You should see a green check besides the headings for every step accomplished. This tutorial is intended to be used by a developer.

##Prerequisites

In order to install the __Auth0 AD/LDAP Connector__  you need to first install node.js.

<div class="installers">
  <ul>
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

Once node.js has been installed, download and unzip the source code for the __Auth0 AD/LDAP Connector__:

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

	> node server.js

When prompted for the ticket url, paste the following:

    https://@@account.namespace@@/p/custom/@@ticket@@

> After entering the ticket, the connector will exchange trust information (like URLs, endpoints, etc.) with the server to complete the setup on Auth0.

##2. Connecting to AD / LDAP

To connect to AD or any LDAP directory:

###Open the ```config.json``` file and edit the following variables:

- `LDAP_URL`: the url for the ldap server (e.g.: `ldap://myldap.com:389`)
- `LDAP_BASE`: the base to query (e.g.: `DC=mycompany,DC=com`)
- `LDAP_BIND_USER`: a service account used for authentication and quering (currently this accepts the fully qualified name for the user, like CN=Foo,CN=Users,DC=fabrikam,DC=com)
- `LDAP_BIND_PASSWORD`: the password of the service account

###Restart the server (`CTRL+C` to stop it and then `node server.js` again). Login again.

<a href="@@uiURL@@/tester?ticket=@@ticket@@" class="btn btn-mid" target="_blank"><i class="icon icon-user"></i>&nbsp;<span class="text">Test Login</span></a>

**Congratulations!** If you get a green check on this step, it means the configuration of the connector is successfully completed.

----

## Next Steps

Read the following sections to learn how to customize the login page and how to deploy it.

### Deploy it

The connector can be deployed on Windows and Linux.

Once you have the final URL of the service (not localhost), update the `SERVER_URL` configuration setting localted in the `config.json` file with the new address and restart the server.

* [Linux](http://howtonode.org/deploying-node-upstart-monit)

### Production considerations

To avoid man in the middle attacks, we strongly recommend that you configure the server to use TLS/SSL. If you are hosting on Linux, change the [server.js](https://github.com/auth0/ad-ldap-connector/blob/master/server.js) to use an [https server in node.js](http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener).

Finally, if you are looking for a highly available setup, you can simply install multiple instances of this server behind a Network Load Balancer.

#### Troubleshooting

**Error binding to LDAP**

If you see this error in the console:

  Error binding to LDAP dn:
   code: 49
   message: 80090308: LdapErr: DSID-0C0903A9, comment: AcceptSecurityContext error, data 52e, v1db1

It means that the service account is not valid (this is the account that is used to connect to LDAP, not the end user account). Try using the distinguished name of the user on the `LDAP_USER_BIND` property (e.g.: `CN=John Foo,CN=Users,DC=fabrikam,DC=com`).
