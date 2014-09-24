---
lodash: true
---

## Apache Tutorial

**Please follow the steps below to configure your application using Apache to work with Auth0 and Open ID Connect.**

### 1. Install and enable `mod_auth_openidc` module

First, you need to install the `mod_auth_openidc` module for Apache. 

You can get the binaries from [Github](https://github.com/pingidentity/mod_auth_openidc/releases) and install them for your OS. If your OS isn't compatible with any of the binaries, you can still [build it from source](https://github.com/pingidentity/mod_auth_openidc/blob/master/INSTALL)

Once you've installed it, you just need to enable it for Apache

````bash
sudo a2enmod mod_auth_openidc
```

### 2. Configure the module with your Auth0 Account information

Now, you should get a new configuration file under the `/etc/apache2/mods-available` folder, where Apache modules are normally installed.

In there, you must add the following configuration for the `mod_auth_openidc` module

````
OIDCProviderIssuer https://@@account.namespace@@
OIDCProviderAuthorizationEndpoint https://@@account.namespace@@/authorize
OIDCProviderTokenEndpoint https://@@account.namespace@@/oauth/token
OIDCProviderTokenEndpointAuth client_secret_post
OIDCProviderUserInfoEndpoint https://@@account.namespace@@/userinfo

OIDCClientID @@account.clientId@@
OIDCClientSecret @@account.clientSecret@@

OIDCScope "openid profile"
OIDCRedirectURI https://your_apache_server/your_path/redirect_uri/
OIDCCryptoPassphrase <passwordToEncryptTheSessionInformationOnTheCookie>
OIDCCookiePath /your_path/

SSLEngine on
SSLCertificateFile /home/your_cert.crt
SSLCertificateKeyFile /home/your_key.key

<Location /your_path/>
   AuthType openid-connect
   Require valid-user
   LogLevel debug
</Location>
```

### 3. Configuring Auth0 secret

Auth0 `clientSecret` is by default Base64 encoded which isn't compatible with this Apache plugin out of the box. We're going to change that in the near future, but in the meantime, you need to call an API to set that, for your account, the `clientSecret` isn't Base64 encoded.

Just do the following `curl` from your terminal. Make sure to change `ACCESS_TOKEN` with a token obtained here <https://docs.auth0.com/api#!#post--oauth-token>

````bash
curl 'https://@@account.namespace@@/api/clients/@@account.clientId@@' -X PUT -H 'authorization: Bearer ACCESS_TOKEN' -H 'content-type: application/json' --data-binary $'{ "jwtConfiguration": {"lifetimeInSeconds": "36000", "secretNotEncoded": true  }}'
```

> Please note that you can get your `access_token` by clicking on `Try Me` in [this endpoint of the Api Explorer](https://docs.auth0.com/api#!#post--oauth-token)

### 4. Authorization

You can configure Apache to protect a certain location based on an attribute of the user. Here is an example:

```
<Location /example/>
   AuthType openid-connect
   #Require valid-user
   Require claim folder:exmaple
</Location>

<Location /example2>
   AuthType openid-connect
   #Require valid-user
   Require claim folder:example2
</Location>
```

Then you can write a rule in Auth0 that would return the `folder` attribute:

```
function(user, context, callback) {
    if (somecondition()) {   
       user.folder = 'example2';
    }

   user.folder = 'example';
}
```

Or you could even use an array of folders and the apache module will check if the array contains any of these values

```
function(user, context, callback) {
    user.folders = [];
    if (somecondition()) {   
       user.folders.push('example2');
    }

   user.folders.push('example');
}
```
