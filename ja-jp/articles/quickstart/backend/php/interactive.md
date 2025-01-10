---
title: Add endpoint authorization to your PHP application
description: "Auth0 allows you to add token-based endpoint authorization to your PHP application quickly and to protect your routes. This guide demonstrates how to integrate Auth0 with any new or existing PHP application using the Auth0 PHP SDK."
interactive: true
files:
  - files/index
  - files/router
github:
  path: app
---

# Add Authorization to Your PHP Application

Auth0 allows you to add token-based endpoint authorization to almost any application type quickly. This guide demonstrates how to integrate Auth0, add token-based authorization, and protect application routes using the Auth0 PHP SDK.

To use this quickstart, you’ll need to:
- Sign up for a free Auth0 account or log in to Auth0.
- Have a working PHP project that you want to integrate with Auth0. Alternatively, you can view or download a sample application after logging in.

## Configure Auth0 {{{ data-action=configure }}}

To use Auth0 services, you need to have an application registered in the Auth0 Dashboard. The Auth0 application is where you configure how you want authentication to work for your project.

### Configure an application

Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code uses to call Auth0 APIs through the SDK.

Any settings you configure using this quickstart automatically updates for your application in the <a href="${manage_url}/#/">Dashboard</a>, which is where you can manage your applications in the future.

If you would rather explore a complete configuration, you can view a sample application instead.

### Configure an API

Similarly, you need to create a new Auth0 API or use an existing API that represents the project you're integrating from the <a href="${manage_url}/#/">Dashboard</a>. Choose a unique identifier for the API and make a note of it. You need that identifier to configure your application below.

## Install the Auth0 PHP SDK {{{ data-action=code data-code="index.php" }}}

Auth0 provides a [PHP SDK](https://github.com/auth0/auth0-PHP) (Auth0-PHP) to simplify the process of implementing Auth0 authentication and authorization in PHP apps.

The Auth0 PHP SDK requires [PSR-17](https://www.php-fig.org/psr/psr-17/) and [PSR-18](https://www.php-fig.org/psr/psr-18/) installed, compatible HTTP libraries for managing network requests. If you don't have libraries available, you can install reliable choices by running the following commands in your terminal:

```bash
cd <your-project-directory>
composer require symfony/http-client nyholm/psr7
```

Now, install the Auth0 PHP SDK by running the following command in your terminal:

```bash
composer require auth0/auth0-php
```

### Configure the Auth0 SDK {{{ data-action=code data-code="index.php#7:16" }}}

For the SDK to function properly, you must set the following properties in the Auth0 SDK during initialization:

- `strategy`: The strategy helps guide the behavior of the SDK for the use case of your app. In this case, you want to set this to the constant `Auth0\SDK\Configuration\SdkConfiguration::STRATEGY_API`.
- `domain`: The domain of your Auth0 tenant. Generally, you find this in the Auth0 Dashboard under Application's Settings in the _Domain_ field. If you are using a [custom domain](https://auth0.com/docs/custom-domains), set this to the value of your custom domain instead.
- `clientId`: The ID of the Auth0 Application you set up earlier in this quickstart. You can find this in the Auth0 Dashboard under your Application's Settings in the _Client ID_ field.
- `clientSecret`: The secret of the Auth0 application you created earlier in this quickstart. Client secret is in the Auth0 Dashboard under your Application's Settings in the _Client Secret_ field.
- `audience`: The identifier of the Auth0 API you registered above. This must be provided as an array.

::::checkpoint
:::checkpoint-default

Your Auth0 SDK is now properly configured. Run your application to verify that:
- The SDK is initializing correctly.
- Your application is not throwing any errors related to Auth0.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* Make sure the correct application is selected.
* Did you save after entering your URLs?
* Make sure the domain and client ID imported correctly.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Listen for bearer tokens {{{ data-action=code data-code="index.php#20:23" }}}

Next, expand your application to retrieve and process bearer tokens. Bearer tokens are access tokens provided to your API with requests from clients on a users' behalf. Access tokens approve or deny access to routes in your application. This is referred to as endpoint authorization.

The easiest way to retrieve access tokens from a request is using the PHP SDK's `getBearerToken()` method. This method fetches tokens from GET parameters, POST bodies, request headers, and other sources. In this case, the PHP SDK processes tokens passed from GET requests in the `token` parameter or from the HTTP `Authorization` header.

## Create and configure routes {{{ data-action=code data-code="router.php" }}}

Now, install a routing library to help direct incoming requests to your application. This isn't a required step, but simplifies the application structure for the purposes of this quickstart.

```bash
composer require steampixel/simple-php-router
```

Create a new file in your application called `router.php` to define the routes. Copy in the code from the interactive panel to the right under the <b>router.php</b> tab.

## Configue endpoint authorization {{{ data-action=code data-code="router.php#21:31" }}}

Now that you have configured your Auth0 application, the Auth0 PHP SDK, and you application retrieves bearer tokens from requests, the next step is to set up endpoint authorization for your project. The `getBearerToken()` method you implemented above returns a `Token` class that includes details on the request's access.

Since the `getBearerToken()` method automatically validates and verifies the incoming request, your application determines the details of the access token by evaluating the method's response. When the response is null, no valid token has been provided. Otherwise, inspect the contents of the response to learn more about the request.

In the interactive panel to the right, you can see a check if the response is null or not to filter access to your `/api/private` route.

## Authorize with scopes {{{ data-action=code data-code="router.php#33:48" }}}

In some cases, you may want to filter access to a specific route based on the requested scopes in an access token. As shown in the interactive panel on the right, evaluate the contents of the 'scope' property from the `getBearerToken()` method's response to check the scopes granted by the access token.
