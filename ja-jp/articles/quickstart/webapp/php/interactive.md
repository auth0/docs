---
title: Add Login to your PHP application
description: "Auth0 allows you to add authentication to your PHP application quickly and to gain access to user profile information. This guide demonstrates how to integrate Auth0 with any new or existing PHP application using the Auth0 PHP SDK."
interactive: true
files:
  - files/index
  - files/login
  - files/logout
  - files/profile
  - files/router
  - files/callback
github:
  path: app
---

# Add Login to Your PHP Application

Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any PHP application using the Auth0 PHP SDK.

To use this quickstart, you’ll need to:
- Sign up for a free Auth0 account or log in to Auth0.
- Have a working PHP project that you want to integrate with. Alternatively, you can view or download a sample application after logging in.

## Configure Auth0 {{{ data-action=configure }}}

To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.

### Configure an application

Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.

Any settings you configure using this quickstart will automatically update for your Application in the <a href="${manage_url}/#/">Dashboard</a>, which is where you can manage your Applications in the future.

If you would rather explore a complete configuration, you can view a sample application instead.

### Configure Callback URLs

A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.

::: note
If you are following along with our sample project, set this to http://localhost:3000/callback.
:::

### Configure Logout URLs

A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.

::: note
If you are following along with our sample project, set this to http://localhost:3000.
:::

### Configure Allowed Web Origins

An Allowed Web Origin is a URL that you want to be allowed to access to your authentication flow. This must contain the URL of your project. If not properly set, your project will be unable to silently refresh authentication tokens, so your users will be logged out the next time they visit your application or refresh a page.

::: note
If you are following along with our sample project, set this to http://localhost:3000.
:::

## Install the Auth0 PHP SDK {{{ data-action=code data-code="index.php" }}}

Auth0 provides a [PHP SDK](https://github.com/auth0/auth0-PHP) (Auth0-PHP) to simplify the process of implementing Auth0 authentication and authorization in PHP apps.

The Auth0 PHP SDK requires [PSR-17](https://www.php-fig.org/psr/psr-17/) and [PSR-18](https://www.php-fig.org/psr/psr-18/) compatible HTTP libraries to be installed for managing network requests. If you don't have libraries available, you can install reliable choices by running the following commands in your terminal:

```bash
cd <your-project-directory>
composer require symfony/http-client nyholm/psr7
```

Now install the Auth0 PHP SDK by running the following command in your terminal:

```bash
composer require auth0/auth0-php
```

### Configure the Auth0 SDK

Create a new file in your application called `index.php`, and copy in the code from the interactive panel to the right under the <b>index.php</b> tab.

For the SDK to function properly, you must set the following properties in the Auth0 SDK during initialization:

- `domain`: The domain of your Auth0 tenant. Generally, you can find this in the Auth0 Dashboard under your Application's Settings in the Domain field. If you are using a [custom domain](https://auth0.com/docs/custom-domains), you should set this to the value of your custom domain instead.
- `clientId`: The ID of the Auth0 Application you set up earlier in this quickstart. You can find this in the Auth0 Dashboard under your Application's Settings in the Client ID field.
- `clientSecret`: The secret of the Auth0 Application you set up earlier in this quickstart. You can find this in the Auth0 Dashboard under your Application's Settings in the Client Secret field.
- `redirectUri`: The URL in your application that you would like Auth0 to redirect users to after they have authenticated. This corresponds to the callback URL you set up earlier in this quickstart. You can also find this value in the Auth0 Dashboard under your Application's Settings in the Callback URLs field. Make sure what you enter in your code matches what you set up earlier or your users will see an error.
- `cookieSecret`: A long secret value used to encrypt the session cookie. You can generate a suitable string by running `openssl rand -hex 32` in your terminal.

::::checkpoint
:::checkpoint-default

Your Auth0 SDK should now be properly configured. Run your application to verify that:
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

## Create routes {{{ data-action=code data-code="router.php" }}}

Now install a routing library, to help direct incoming requests to your application. This isn't a required step, but simplifies our application structure for the purposes of this quickstart.

```bash
composer require steampixel/simple-php-router
```

Create a new file in your application called `router.php` to define our routes, and copy in the code from the interactive panel to the right.

## Add login to your application {{{ data-action=code data-code="login.php" }}}

Now that you have configured your Auth0 Application and the Auth0 PHP SDK, you need to set up login for your project. To do this, you will use the SDK’s `login()` method to create a login button that redirects users to the Auth0 Universal Login page. After a user successfully authenticates, they will be redirected to the callback URL you set up earlier in this quickstart.

Create a new file in your application called `login.php` to handle logging process, and copy in the code from the interactive panel to the right, which contains the logic needed for login.

::::checkpoint
:::checkpoint-default

You should now be able to log in or sign up using a username and password.

Click the login link and verify that:
* Your application redirects you to the Auth0 Universal Login page.
* You can log in or sign up.
* Auth0 redirects you back to your application using the value of the `redirectUri` you used to configure the SDK.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* You configured the correct `redirectUri`.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Add logout to your application {{{ data-action=code data-code="logout.php" }}}

Users who log in to your project will also need a way to log out. We will handle a logout button using the SDK’s `logout()` method. When users log out, they will be redirected to your [Auth0 logout](https://auth0.com/docs/api/authentication?http#logout) endpoint, which will then immediately redirect them to the logout URL you set up earlier in this quickstart.

Create a new file in your application called `logout.php` for handling the process, and copy in the code from the interactive panel, which contains the logic needed for logout. Then, update your `index.php` file to include the logout button.

::::checkpoint
:::checkpoint-default

Run your application and click the logout button, verify that:
* Your application redirects you to the address you specified as one of the Allowed Logout URLs in your Application Settings.
* You are no longer logged in to your application.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* You configured the correct Logout URL.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::

## Show User Profile Information {{{ data-action=code data-code="profile.php" }}}

Now that your users can log in and log out, you will likely want to be able to retrieve the [profile information](https://auth0.com/docs/users/concepts/overview-user-profile) associated with authenticated users. For example, you may want to be able to display a logged-in user’s name or profile picture in your project.

The Auth0 PHP SDK provides user information through the `getCredentials()` method. Review the `profile.php` code in the interactive panel to see an example of how to use it.

Because the method contains sensitive information related to the user's identity, its availability depends on the user's authentication status. To prevent render errors, you should always check if the `getCredentials()` method returns an `object` or `null` to determine whether Auth0 has authenticated the user before your application consumes the results.

::::checkpoint
:::checkpoint-default

Verify that:
* You can display the `nickname` or any other user property correctly after you have logged in.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* You created the `profile.php` file and are logged in.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::
