---
title: Login
default: true
description: This tutorial demonstrates how to use the Auth0 Apache SDK to add authentication and authorization to your web app.
budicon: 448
topics:
  - quickstarts
  - webapp
  - apache
  - login
contentType: tutorial
useCase: quickstart
---

::: panel System Requirements
This tutorial and seed project have been tested with the following:
* Apache 2.4
:::

**Please follow the steps below to configure your application using Apache to work with Auth0 and Open ID Connect.**

## Install and Enable `mod_auth_openidc` Module

First, you need to install the `mod_auth_openidc` module for Apache.

You can get the binaries from [Github](https://github.com/zmartzone/mod_auth_openidc/releases) and install them for your OS. If your OS isn't compatible with any of the binaries, you can still [build it from source](https://github.com/zmartzone/mod_auth_openidc/blob/master/INSTALL)

You can install the package with apt, which is useful for setting up a Raspberry Pi.
```bash
sudo apt-get install libapache2-mod-auth-openidc
```

Once you've installed it, you just need to enable it for Apache to use. (If you are on Windows, you can use [this](https://github.com/enderandpeter/win-a2enmod#installation) to get `a2enmod` working.)

**_WARNING - Enabling this mod will break Apache2 until the config file is properly set up._**

```bash
sudo a2enmod auth_openidc
```

## Configure the Module with Your Auth0 Account Information

Now you should have a new configuration file named `auth_openidc.conf` in the Apache mods available directory: `/etc/apache2/mods-available/`. (On Windows you need to use `/apache/conf/httpd.conf` file).

Before we edit the file we should back it up.
```bash
sudo cp /etc/apache2/mods-available/auth_openidc.conf /etc/apache2/mods-available/auth_openidc.conf.old
```
Now you can replace the information in your .conf file with the code below. It should be pre-populated with your specific `OIDCProviderMetadataURL` and `OIDCClientID`, however you will need to add in your `OIDCClientSecret`, `OIDCRedirectURI` and `OIDCCryptoPassphrase`. You should change the scope so it is relevant to your project. Read up on it [here](https://auth0.com/docs/scopes/current#api-scopes), before making that decision.

${snippet(meta.snippets.setup)}

You can find documentation on what some of this code means in your auth_openidc.conf.old or on [GitHub here](https://github.com/zmartzone/mod_auth_openidc/blob/master/auth_openidc.conf).

For clarification on redirecting I found [this](https://auth0.com/docs/users/redirecting-users) helpful.

## Configuring Auth0 Settings

In your application settings add a new allowed callback using the same URI as in your `OIDCRedirectURI`.

Then, go to "Applications > Settings (scroll down to) > Show Advanced Settings > OAuth". Ensure that `JsonWebToken Token Signature Algorithm` is set to RS256.


## Authorization

You can configure Apache to protect a certain location based on an attribute of the user. Here is an example:

${snippet(meta.snippets.use)}

Then you can write a rule in Auth0 that would return the `folder` attribute:

```js
function(user, context, callback) {
    if (somecondition()) {
       user.folder = 'example2';
    }

   user.folder = 'example';
}
```

Or you could even use an array of folders and the apache module will check if the array contains any of these values

```js
function(user, context, callback) {
    user.folders = [];
    if (somecondition()) {
       user.folders.push('example2');
    }

   user.folders.push('example');
}
```
