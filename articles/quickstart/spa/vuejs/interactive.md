---
title: Add Login to your Vue App
description: "Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any Vue application using the Auth0 Vue SDK."
topics:
  - quickstarts
  - spa
  - vuejs
  - login
github:
  path: 01-Login
sample_download_required_data:
  - client
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/index
  - files/login
  - files/logout
  - files/profile
---

# Add Login to your Vue App

Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any Vue application using the Auth0 Vue SDK.

::: warning
This quickstart is designed for using [Auth0 Vue](https://github.com/auth0/auth0-vue) with Vue 3 applications. If you are using Vue 2, please check out the [Vue 2 Tutorial with Auth0 SPA SDK](https://github.com/auth0/auth0-vue/blob/main/tutorial/vue2-login.md) instead.
:::

To use this quickstart, you’ll need to:
- Sign up for a free Auth0 account or log in to Auth0.
- Have a working Vue project that you want to integrate with. Alternatively, you can view or download a sample application after logging in.

<%= include('../../_includes/_configure_auth0_interactive', { 
  callback: 'http://localhost:3000',
  returnTo: 'http://localhost:3000',
  webOriginUrl: 'http://localhost:3000',
  showWebOriginInfo: true
}) %>

## Install the Auth0 Vue SDK {{{ data-action=code data-code="index.js" }}}

Auth0 provides a [Vue SDK](https://github.com/auth0/auth0-vue) to simplify the process of implementing Auth0 authentication and authorization in Vue 3 apps.

Install the Auth0 Vue SDK by running the following commands in your terminal:

```bash
cd <your-project-directory>
npm install @auth0/auth0-vue
```

### Register the plugin

For the SDK to function properly, you must register the plugin with your Vue application using the following properties:

- `domain`: The domain of your Auth0 tenant. Generally, you can find this in the Auth0 Dashboard under your Application's Settings in the Domain field. If you are using a [custom domain](https://auth0.com/docs/custom-domains), you should set this to the value of your custom domain instead.
- `client_id`: The ID of the Auth0 Application you set up earlier in this quickstart. You can find this in the Auth0 Dashboard under your Application's Settings in the Client ID field.
- `redirect_uri`: The URL in your application that you would like Auth0 to redirect users to after they have authenticated. This corresponds to the callback URL you set up earlier in this quickstart. You can also find this value in the Auth0 Dashboard under your Application's Settings in the Callback URLs field. Make sure what you enter in your code matches what you set up earlier or your users will see an error.

The plugin will register the SDK using both `provide` and `app.config.globalProperties`, allowing the SDK to be used with both the [Composition API](https://vuejs.org/guide/introduction.html#composition-api) and [Options API](https://vuejs.org/guide/introduction.html#options-api).

::::checkpoint

:::checkpoint-default

The plugin should now be properly configured. Run your application to verify that:
- the SDK is initializing correctly
- your application is not throwing any errors related to Auth0

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure the correct application is selected
* did you save after entering your URLs?
* make sure the domain and client ID are set correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Add Login to Your Application {{{ data-action=code data-code="login.js" }}}

Now that you have configured your Auth0 Application and the Auth0 Vue SDK, you need to set up login for your project. To do this, you will use the SDK’s `loginWithRedirect` function that is exposed on the return value of `useAuth0`, which you can access in your component's setup function. It will redirect users to the Auth0 Universal Login page. and, after a user successfully authenticates, redirect then back to the callback URL you set up earlier in this quickstart.

### Using the Options API
If you are using the Options API, you can use the same `loginWithRedirect` method from the global `$auth0` property through the `this` accessor.


::::checkpoint

:::checkpoint-default

You should now be able to log in using a username and password.

Click the login button and verify that:
* your Vue Application redirects you to the Auth0 Universal Login page
* you can log in or sign up
* Auth0 redirects you to your application using the value of the `redirectUri` you used to configure the plugin.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* you configured the correct `redirectUri`
* make sure the domain and client ID are set correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Add Logout to your Application {{{ data-action=code data-code="logout.js" }}}

Users who log in to your project will also need a way to log out. When users log out, they will be redirected to your [Auth0 logout](https://auth0.com/docs/api/authentication?javascript#logout) endpoint, which will then immediately redirect them to specified `returnTo` parameter.

Use the `logout` function that is exposed on the return value of `useAuth0`, which you can access in your component's `setup` function, to log the user out of your application.

:::note
To log the user out of your application but not from Auth0, use `logout({ localOnly: true })`.
:::

### Using the Options API
If you're using the Options API, you can use the same `logout` method from the global `$auth0` property through the `this` accessor.

::::checkpoint

:::checkpoint-default

Run your application and click the logout button, verify that:
* your Vue application redirects you to the `returnTo` address
* you are no longer logged in to your application

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* you specified a value for `returnTo` when calling `logout`
* the `returnTo` value is configured as one of the Allowed Logout URLs in your Application Settings

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::

## Show User Profile Information {{{ data-action=code data-code="profile.js" }}}

Now that your users can log in and log out, you will likely want to be able to retrieve the [profile information](https://auth0.com/docs/users/concepts/overview-user-profile) associated with authenticated users. For example, you may want to be able to display a logged-in user’s name or profile picture in your project.

Once the user authenticates, the SDK extracts the user's profile information and stores it in memory. It can be accessed by using the reactive `user` property exposed by the return value of `useAuth0`, which you can access in your component's `setup` function.

Because the `user` property contains sensitive information related to the user's identity, its availability depends on the user's authentication status. To prevent render errors, you should always:
- use the `isAuthenticated` property to determine whether Auth0 has authenticated the user before Vue renders any component that consumes the `user` property.
- ensure that the SDK has finished loading by checking that `isLoading` is false before accessing the `isAuthenticated` property.

### Using the Options API
If you're using the Options API, you can use the same reactive `user`, `isLoading` and `isAuthenticated` properties from the global `$auth0` property through the `this` accessor.

::::checkpoint

:::checkpoint-default

Verify that:
* you can display the `user` or any of its properties within a component correctly after you have logged in

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* you added the `isLoading` check before accessing the `isAuthenticated` property
* you added the `isAuthenticated` check before accessing the `user` property

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::
