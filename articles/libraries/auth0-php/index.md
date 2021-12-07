---
section: libraries
toc: true
description: Integrate a frictionless login and signup experience for your PHP applications.
url: /libraries/auth0-php
topics:
  - libraries
  - php
contentType:
  - how-to
  - index
  - reference
useCase:
  - add-login
---
# PHP: Getting Started

The Auth0-PHP SDK can integrate into your PHP applications to provide a straightforward way to log your users in and to sign them up in your app. It provides support for social identity providers such as Facebook, Google, or Twitter, as well as enterprise providers such as Active Directory. The SDK provides convenient methods for accessing Auth0's Authentication and Management endpoints.

The Auth0-PHP repository is open source and [hosted on GitHub](https://github.com/auth0/auth0-PHP). We appreciate all contributions, including bug reports, enhancement proposals, and pull requests.

## Requirements

- PHP 7.4+ (8.0+ recommended)
- [Composer](https://getcomposer.org/doc/00-intro.md) 2

## Installation

Installing the Auth0 PHP SDK requires [Composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos), the standard dependency management utility for PHP. Composer allows you to declare the dependent libraries your project needs and installs them for you. Please ensure Composer is installed and accessible from your shell before continuing.

Next, run the following shell command within your project directory to install the SDK:

```sh
composer require auth0/auth0-php
```

This will create a `vendor` folder within your project and download all the dependencies needed to use the PHP SDK. This will also create a `vendor/autoload.php` file necessary for the SDK to work with your application, which we'll import later.

## Getting Started

To use the Auth0 Authentication and Management APIs, you'll need a free Auth0 account and an Application:

1. Go to [auth0.com/signup](https://auth0.com/signup) and create an account.
2. From your dashboard, go to **Applications**, then **Create Application**.
3. Give your Application a name, select **Regular Web Application**, then **Create**
4. Click the **Settings** tab for the required credentials used below. More information about these settings is [here](/dashboard/reference/settings-application).

### Configure the SDK

You should use [environment variables](https://secure.php.net/manual/en/reserved.variables.environment.php) to store and load sensitive Auth0 credentials. This eliminates the need for hardcoding them into your application. Let's create an `.env` file within the root of our project directory to store our application's credentials:

```sh
# The URL of our Auth0 Tenant Domain.
# If we're using a Custom Domain, be sure to set this to that value instead.
AUTH0_DOMAIN='https://${account.namespace}'

# Our Auth0 application's Client ID.
AUTH0_CLIENT_ID='${account.clientId}'

# Our Auth0 application's Client Secret.
AUTH0_CLIENT_SECRET='${account.clientSecret}'

# A long secret value we'll use to encrypt session cookies. This can be generated using `openssl rand -hex 32` from our shell.
AUTH0_COOKIE_SECRET='SEE COMMENT ABOVE'

# The base URL of our application.
AUTH0_BASE_URL='http://127.0.0.1:3000'
```

You should never commit this file to version control or share it in an unsecure manner. The contents should be handled with care and treated like a password.

As PHP is unable to read our `.env` file natively, you'll need to install a PHP library to do so. For the purposes of this documentation we'll be using `vlucas/phpdotenv`, but any 'dotenv' library you prefer will work. From our project directory, run the following shell command to install the library:

```sh
composer require vlucas/phpdotenv
```

### Initialize the SDK

We're ready to configure and initialize an instance of the SDK within our new PHP application. Let's start by creating the PHP source file we'll be working with for this demonstration, `index.php`, and use the following snippet to get started:

```php
<?php

// Import the Composer Autoloader to make the SDK classes accessible:
require 'vendor/autoload.php';

// Load our environment variables from the .env file:
(Dotenv\Dotenv::createImmutable(__DIR__))->load();

// Now instantiate the Auth0 class with our configuration:
$auth0 = new \Auth0\SDK\Auth0([
    'domain' => $env['AUTH0_DOMAIN'],
    'clientId' => $env['AUTH0_CLIENT_ID'],
    'clientSecret' => $env['AUTH0_CLIENT_SECRET'],
    'cookieSecret' => $env['AUTH0_COOKIE_SECRET']
]);
```

Congratulations, your application is now setup and ready to use with Auth0! You can now move on to building an example application using one of our PHP quickstarts. Choose the type of application you're looking to build to follow along with a quickstart suited for your needs:

* [PHP Web Application](/quickstart/webapp/php/)
* [PHP Backend API](/quickstart/backend/php/)

## Next Steps

::: next-steps
* [PHP Basic Usage](/libraries/auth0-php/basic-use)
* [PHP Authentication API](/libraries/auth0-php/authentication-api)
* [PHP Management API](/libraries/auth0-php/management-api)
* [PHP JWT Validation](/libraries/auth0-php/jwt-validation)
* [PHP Troubleshooting](/libraries/auth0-php/troubleshooting)
:::
