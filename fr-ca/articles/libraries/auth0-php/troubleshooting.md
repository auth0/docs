---
section: libraries
toc: true
description: Troubleshooting commons issues with your PHP applications.
topics:
  - libraries
  - php
contentType:
  - reference
---
# PHP: Troubleshooting the SDK

The following is a list of issues you might see when using the Auth0 PHP library and how you might troubleshoot these issues.

### I'm getting an "Invalid State" exception when trying to log in.

[State validation](https://auth0.com/docs/protocols/oauth2/oauth-state) was added in 5.1.0 for improved security. By default, this uses session storage and will happen automatically if you are using a combination of `Auth0::login()` and any method which calls `Auth0::exchange()` in your <dfn data-key="callback">callback</dfn>.

If your users encounter this error:
- Ensure your application is not accidentally invoking `Auth0::login()` more than once, which could invalidate the state stored on the end user's device.
- The end user is using a modern browser on their device and not blocking cookies.

### I am getting `curl error 60: SSL certificate problem: self-signed certificate in certificate chain` on Windows

This is a common issue with the latest PHP versions under **Windows OS** (it is related to an incompatibility between Windows and OpenSSL CA's database).

1. Download this CA database `https://curl.haxx.se/ca/cacert.pem` to `c:/cacert.pem`.
2. Edit your php.ini and add `openssl.cafile=c:/cacert.pem`. (It should point to the file you downloaded.)

### My host does not allow using Composer

The PHP SDK requires Composer for maintaining dependencies (external PHP libraries). If Composer is now allowed to be installed globally on your host, you can still install it locally to run on your user shell account. Instructions for this can be found on the Composer website: https://getcomposer.org/doc/00-intro.md#locally

## Keep reading

* [PHP Introduction](/libraries/auth0-php)
* [PHP Basic Use](/libraries/auth0-php/basic-use)
* [PHP Authentication API](/libraries/auth0-php/authentication-api)
* [PHP Management API](/libraries/auth0-php/management-api)
* [PHP JWT Validation](/libraries/auth0-php/jwt-validation)
