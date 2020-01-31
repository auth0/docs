---
section: libraries
toc: true
description: How to install, initialize and use Auth0-PHP
url: /libraries/auth0-php
topics:
  - libraries
  - php
contentType:
  - how-to
  - index
---
# Auth0-PHP

The Auth0 PHP SDK provides you with methods for accessing Auth0's Authentication and Management API endpoints.

::: note
The Auth0-PHP repository is [hosted on GitHub](https://github.com/auth0/auth0-PHP). We appreciate all contributions, including bug reports, enhancement proposals, and pull requests.
:::

## Requirements

- PHP 7.1 or later
- [Composer](https://getcomposer.org/doc/00-intro.md)

## Installation

Auth0-PHP can be installed one of two ways:

1. With Composer
2. Manually

### Install With Composer

We recommend installing the SDK with [Composer](https://getcomposer.org/). If you already have Composer [installed globally](https://getcomposer.org/doc/00-intro.md#globally), run the following:

```bash
$ composer require auth0/auth0-php
```

Otherwise, [download Composer locally](https://getcomposer.org/doc/00-intro.md#locally) and run:

```bash
$ php composer.phar require auth0/auth0-php
```

This will create `composer.json` and `composer.lock` files in the directory where the command was run, along with a vendor folder containing this SDK and its dependencies.

Finally, include the Composer autoload file in your project to use the SDK:

```php
// index.php
require __DIR__ . '/vendor/autoload.php';
use Auth0\SDK\Auth0;
```

### Install Manually

If your project does not use Composer or you want to maintain a connection to the Git repo, Auth0-PHP can be installed manually. This process still requires Composer to download dependencies, but the process does not use Composer to manage the package.

First, navigate to the directory that contains the Auth0-PHP library and clone the Github repo:

```bash
$ cd /path/to/project/
$ git clone https://github.com/auth0/auth0-PHP.git auth0
```

[Download Composer](https://getcomposer.org/download/) and install the dependencies:

```bash
$ mv ./composer.phar auth0/composer.phar
$ cd auth0
$ php composer.phar install
$ rm composer.phar
```

Finally, require the Auth0-PHP autoloader and you're ready to use the SDK:

```php
// index.php
require __DIR__ . '/auth0/vendor/autoload.php';
use Auth0\SDK\Auth0;
```

## Getting Started

To use the Auth0 Authentication and Management APIs, you'll need a free Auth0 account and an Application:

1. Go to [auth0.com/signup](https://auth0.com/signup) and create your account.
2. Once you are in the dashboard, go to **Applications**, then **Create Application**.
3. Give your Application a name, select **Regular Web Application**, then **Create**
4. Click the **Settings** tab for the required credentials used below. More information about these settings is [here](/dashboard/reference/settings-application).

The examples in this documentation use [environment variables](https://secure.php.net/manual/en/reserved.variables.environment.php) to store and load sensitive Auth0 credentials, eliminating the need for you to hardcode them into your application.

The easiest way to use environment variables in your project is to use a library like [PHP Dotenv](https://github.com/josegonzalez/php-dotenv) along with a local `.env` file. Create a `.env` file (make sure this is not accessible publicly and is excluded from version control) and add the following values:

```
# Auth0 tenant Domain, found in your Application settings
AUTH0_DOMAIN="tenant.auth0.com"

# Auth0 Client ID, found in your Application settings
AUTH0_CLIENT_ID="application_client_id"

# Auth0 Client Secret, found in your Application settings
AUTH0_CLIENT_SECRET="application_client_secret"

# URL to handle the authentication callback
# Save this URL in the "Allowed Callback URLs" field in the Auth0 dashboard
AUTH0_REDIRECT_URI="https://yourdomain.com/auth/callback"
```

The `AUTH0_REDIRECT_URI` value above is a URL for your application that will handle the <dfn data-key="callback">callback</dfn> from Auth0. This is used for both successful logins as well as errors. The processing that happens at this URL is covered later in this documentation.

In your application (below the Composer autoload `require`), add:

```php
// ... other use declarations
use josegonzalez\Dotenv\Loader;

// Setup environment vars
$Dotenv = new Loader(__DIR__ . '/.env');
$Dotenv->parse()->putenv(true);

// Get environment variables
echo 'My Auth0 domain is ' . getenv('AUTH0_DOMAIN');
```

You can now use the environment variables to instantiate the necessary Auth0-PHP classes:

```php
// ... setup environment vars.
// Instantiate the base Auth0 class.
$auth0 = new Auth0([
  'domain' => getenv('AUTH0_DOMAIN'),
  'client_id' => getenv('AUTH0_CLIENT_ID'),
  'client_secret' => getenv('AUTH0_CLIENT_SECRET'),
  'redirect_uri' => getenv('AUTH0_REDIRECT_URI'),
]);
```

You are now ready to use Auth0-PHP. Use one of the articles below to add authentication to your existing app or one of our quickstarts to build a test application from scratch:

* [Basic PHP application quickstart](https://auth0.com/docs/quickstart/webapp/php/)
* [PHP API quickstart](https://auth0.com/docs/quickstart/backend/php/)

### Read more

::: next-steps
* [Auth0-PHP Basic Use](/libraries/auth0-php/basic-use)
* [Auth0-PHP Authentication API](/libraries/auth0-php/authentication-api)
* [Auth0-PHP Management API](/libraries/auth0-php/management-api)
* [Auth0-PHP JWT Validation](/libraries/auth0-php/jwt-validation)
* [Auth0-PHP Troubleshooting](/libraries/auth0-php/troubleshooting)
:::
