To begin, let's create a `.env` file within the root of your project directory to store our sample application's configuration:

```sh
touch .env
```

Now open this new `.env` file, and let's fill in the environment variables:

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

As PHP isn't able to read our `.env` file by itself, we'll want to install a library to help with that. Although we'll be using a particular library for our sample application's purposes, in a real world application any 'dotenv' loader of preference will work. From our project directory, let's run the following command to install the library:

```sh
composer require vlucas/phpdotenv
```

Next, let's create the PHP source file we'll be using for these code samples, `index.php`:

```sh
touch index.php
```

Now open this new `index.php` file, and let's configure an instance of the Auth0 PHP SDK for our sample application:

```php
<?php

// Import the Composer Autoloader to make the SDK classes accessible:
require 'vendor/autoload.php';

// Load our environment variables from the .env file:
(Dotenv\Dotenv::createImmutable(__DIR__))->load();

// Create a configuration object for the Auth0 PHP SDK:
$auth0Configuration = new \Auth0\SDK\SdkConfiguration(
    domain: $env['AUTH0_DOMAIN'],
    clientId: $env['AUTH0_CLIENT_ID'],
    clientSecret: $env['AUTH0_CLIENT_SECRET'],
    cookieSecret: $env['AUTH0_COOKIE_SECRET']
);

// Now instantiate the Auth0 class with the above configuration:
$auth0 = new \Auth0\SDK\Auth0($auth0Configuration);
```
