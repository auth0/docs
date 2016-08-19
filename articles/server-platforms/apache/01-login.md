---
title: Login
description: This tutorial will show you how to use the Auth0 Apache SDK to add authentication and authorization to your web app.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Apache 2.4
:::

<%= include('../../_includes/_signup') %>

**Please follow the steps below to configure your application using Apache to work with Auth0 and Open ID Connect.**

### 1. Install and enable `mod_auth_openidc` module

First, you need to install the `mod_auth_openidc` module for Apache.

You can get the binaries from [Github](https://github.com/pingidentity/mod_auth_openidc/releases) and install them for your OS. If your OS isn't compatible with any of the binaries, you can still [build it from source](https://github.com/pingidentity/mod_auth_openidc/blob/master/INSTALL)

Once you've installed it, you just need to enable it for Apache (If you are using Windows, you can use [this](https://github.com/enderandpeter/win-a2enmod#installation) to get `a2enmod` working on your system)

${snippet(meta.snippets.dependencies)}

### 2. Configure the module with your Auth0 Account information

Now, you should get a new configuration file under the `/etc/apache2/mods-available` folder, where Apache modules are normally installed (On Windows you need to use `/apache/conf/httpd.conf` file).

In there, you must add the following configuration for the `mod_auth_openidc` module

${snippet(meta.snippets.setup)}

### 3. Configuring Auth0 settings

In your application settings add new allowed callback which is equal to `OIDCRedirectURI`.

Now, go to OAuth section in advanced settings and change `JsonWebToken Token Signature Algorithm` to RS256.


### 4. Authorization

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
