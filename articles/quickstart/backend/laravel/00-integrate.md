---
title: Getting Started
description: "Integrating Auth0 with your Laravel applications is simple. Our Laravel SDK makes authenticating users, retrieving profiles and protecting routes straightforward."
topics:
  - quickstart
  - backend
  - laravel
  - authorization
  - php
  - laravel
contentType: tutorial
useCase: quickstart
github:
  path: app
---
<!-- markdownlint-disable MD002 MD034 MD041 -->

### Create an Application and API

Download the [Auth0 CLI](https://github.com/auth0/auth0-cli) to your working directory:

```shell
curl -sSfL https://raw.githubusercontent.com/auth0/auth0-cli/main/install.sh | sh -s -- -b .
```

Run the following command and authenticate with your Auth0 account:

```shell
./auth0 login
```

Next, run the following command to create a new application with Auth0:

```shell
./auth0 apps create \
  --name "My Laravel Backend Application" \
  --type "regular" \
  --auth-method "post" \
  --callbacks "http://localhost:8000/callback" \
  --logout-urls "http://localhost:8000" \
  --reveal-secrets \
  --no-input
```

**Note your tenant domain, client ID, and client secret.** These will be necessary during SDK configuration later.

Next, run the following command to create a new API with Auth0:

```shell
./auth0 apis create \
  --name "My Laravel Backend Application's API" \
  --identifier "https://github.com/auth0-samples/auth0-laravel-api-samples" \
  --offline-access \
  --no-input
```

### Prepare the Application

Open a shell to a preferred directory for your new project, and run the following command:

```shell
composer create-project --prefer-dist laravel/laravel auth0-laravel-api
```

Then `cd` into your new project directory:

```shell
cd auth0-laravel-api
```

### Install the SDK

Run the following command within your project directory to install the [Auth0 Laravel SDK](https://github.com/auth0/laravel-auth0):

```shell
composer require auth0/login:^7.0 --with-all-dependencies
```

### Configure the SDK

Run the following command to generate an SDK configuration file for your application:

```shell
php artisan vendor:publish --tag auth0-config
```

Open the `.env` file in your project directory. Append the following to the end of the file:

```ini
APP_URL=http://localhost:8000

AUTH0_STRATEGY=api

# Your Auth0 account's tenant domain.
AUTH0_DOMAIN=${account.namespace}

# Your Auth0 application's client ID.
AUTH0_CLIENT_ID=${account.clientId}

# Your Auth0 application's client secret.
AUTH0_CLIENT_SECRET=${account.clientSecret}

# Your Auth0 API's identifier/audience.
AUTH0_AUDIENCE=${apiIdentifier}
```

### Configure the Guard

Open the `config/auth.php` file. We will update this to add a new Guard and Provider that uses the SDK.

Find the `guards` array, and add an entry to it:

```php
/**
 * Register the SDK's Guard with your application.
 * You should not remove any other entries from this array.
 */
'guards' => [
  'my-example-guard' => [
    'driver' => 'auth0.guard',
    'provider' => 'my-example-provider',
  ],
],
```

Next, find the `providers` array, and add an entry to it:

```php
/**
 * Register the SDK's User Provider with your application.
 * You should not remove any other entries from this array.
 */
'providers' => [
  'my-example-provider' => [
    'driver' => 'auth0.provider',
    'repository' => \Auth0\Laravel\Auth\User\Repository::class
  ],
],
```

### Checkpoint

Your Laravel application is now set up with the Auth0 SDK, and you're ready to begin integrating functionality.

**Next, you'll [learn how to authorize requests to your application's routes using the SDK's middleware.](/quickstart/backend/laravel/01-authorization)**
