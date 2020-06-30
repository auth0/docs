---
section: libraries
description: Describes troubleshooting the Auth0-PHP SDK.
topics:
  - libraries
  - php
contentType: reference
---
# Troubleshoot Auth0-PHP Library

The following is a list of issues you might see when using the Auth0-PHP library and how you might troubleshoot these issues.

> I'm getting an "Invalid State" exception when trying to log in.

[State validation](https://auth0.com/docs/protocols/oauth2/oauth-state) was added in 5.1.0 for improved security. By default, this uses session storage and will happen automatically if you are using a combination of `Auth0::login()` and any method which calls `Auth0::exchange()` in your <dfn data-key="callback">callback</dfn>.

If you need to use a different storage method, implement your own [StateHandler](https://github.com/auth0/auth0-PHP/blob/master/src/API/Helpers/State/StateHandler.php) and set it using the `state_handler` config key when you initialize an `Auth0` instance.

If you are using `Auth0::exchange()` and a method other than `Auth0::login()` to generate the Authorize URL, you can disable automatic state validation by setting the `state_handler` key to `false` when you initialize the `Auth0` instance. It is **highly recommended** to implement state validation, either automatically or otherwise.

> I am getting `curl error 60: SSL certificate problem: self-signed certificate in certificate chain` on Windows

This is a common issue with the latest PHP versions under **Windows OS** (it is related to an incompatibility between Windows and OpenSSL CA's database).

1. Download this CA database `https://curl.haxx.se/ca/cacert.pem` to `c:/cacert.pem`.
2. Edit your php.ini and add `openssl.cafile=c:/cacert.pem`. (It should point to the file you downloaded.)

> My host does not allow using Composer

This SDK uses Composer for maintaining dependencies (required external PHP libraries). If Composer is not allowed or installed on your host, install Composer locally, follow the installation instructions there, then upload your entire application, vendor folder included, to your host.

## Keep reading

* [Auth0-PHP Introduction](/libraries/auth0-php)
* [Auth0-PHP Basic Use](/libraries/auth0-php/basic-use)
* [Auth0-PHP Authentication API](/libraries/auth0-php/authentication-api)
* [Auth0-PHP Management API](/libraries/auth0-php/management-api)
* [Auth0-PHP JWT Validation](/libraries/auth0-php/jwt-validation)
