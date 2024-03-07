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

:::note
Visit the [Vue.js Authentication By Example](https://developer.auth0.com/resources/guides/spa/vue/basic-authentication/) guide for a deep dive into implementing user authentication in Vue. This guide provides additional details on how to create a sign-up button, add route guards, and call a protected API from Vue.
:::

# Add Login to Your Vue Application

Auth0 allows you to add authentication to almost any application type. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any Vue application using the Auth0 Vue SDK.

::: warning
This quickstart is designed for using [Auth0 Vue](https://github.com/auth0/auth0-vue) with Vue 3 applications. If you are using Vue 2, please check out the [Vue 2 Tutorial with Auth0 SPA SDK](https://github.com/auth0/auth0-vue/blob/main/tutorial/vue2-login.md) instead or visit the [Vue.js Authentication 2 By Example](https://developer.auth0.com/resources/guides/spa/vue/basic-authentication/v2-javascript) guide.
:::

To use this quickstart, you will need:
- A free Auth0 account or log in to Auth0.
- A working Vue project that you want to integrate with OR you can download a sample application after logging in.
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

For the SDK to function, you must register the plugin with your Vue application using the following properties:

- `domain`: The domain of your Auth0 tenant. This value is in the Auth0 Dashboard under your Application's Settings in the Domain field. If you are using a [custom domain](https://auth0.com/docs/custom-domains), set this to the value of your custom domain instead.
- `clientId`: The ID of the Auth0 Application you set up earlier in this quickstart. Find this in the Auth0 Dashboard under your Application's Settings in the Client ID field.
- `authorizationParams.redirect_uri`: The URL in your application that you would like Auth0 to redirect users to after they have authenticated. This corresponds to the callback URL you set up earlier in this quickstart. This value is in the Auth0 Dashboard under your Application's Settings in the Callback URLs field. Make sure what you enter in your code matches what you set up earlier or your users will see an error.

The plugin will register the SDK using both `provide` and `app.config.globalProperties`. This enables both the [Composition API](https://vuejs.org/guide/introduction.html#composition-api) and [Options API](https://vuejs.org/guide/introduction.html#options-api).

::::checkpoint

:::checkpoint-default

The plugin is now configured. Run your application to verify that:
- the SDK is initializing correctly
- your application is not throwing any errors related to Auth0

:::

:::checkpoint-failure
If your application did not start successfully:
* Verify you selected the correct application
* Save your changes after entering your URLs
* Verify the domain and Client ID imported correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Add login to your application {{{ data-action=code data-code="login.js" }}}

Next, you will set up login for your project. You will use the SDK’s `loginWithRedirect` function exposed on the return value of `useAuth0`, which you can access in your component's setup function. It will redirect users to the Auth0 Universal Login page. and, after a user authenticates, redirect then back to the callback URL you set up earlier in this quickstart.

### Using the Options API
If you are using the Options API, you can use the same `loginWithRedirect` method from the global `$auth0` property through the `this` accessor.


::::checkpoint

:::checkpoint-default

You should now be able to log in using Auth0 Universal Login.

Click the login button and verify that:
* your Vue application redirects you to the Auth0 Universal Login page
* you can log in or sign up
* Auth0 redirects you to your application using the value of the `authorizationParams.redirect_uri` you used to configure the plugin.

:::

:::checkpoint-failure
If you were not able to log in using Auth0 Universal Login:
* Verify you configured the correct `authorizationParams.redirect_uri`
* Verify the domain and Client ID are set correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Add logout to your application {{{ data-action=code data-code="logout.js" }}}

Users who log in to your project will also need a way to log out. When users log out, your application will redirect them to your [Auth0 logout](https://auth0.com/docs/api/authentication?javascript#logout) endpoint, which will then redirect them to the specified `logoutParams.returnTo` parameter.

Use the `logout` function exposed on the return value of `useAuth0`, which you can access in your component's `setup` function, to log the user out of your application.

:::note
To log the user out of your application but not from Auth0, use `logout({ openUrl: false })`.
:::

### Using the Options API
With the Options API, you can use the same `logout` method from the global `$auth0` property through the `this` accessor.

::::checkpoint

:::checkpoint-default

Run your application and click the logout button, verify that:
* your Vue application redirects you to the `logoutParams.returnTo` address
* you are no longer logged in to your application

:::

:::checkpoint-failure
If you are not able to logout:
* Verify you specified a value for `logoutParams.returnTo` when calling `logout`
* Verify the Allowed Logout URLs in your Application Settings contains the `returnTo` value.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::

## Show user profile information {{{ data-action=code data-code="profile.js" }}}

Next, you will configure how to retrieve the [profile information](https://auth0.com/docs/users/concepts/overview-user-profile) associated with authenticated users. For example, you may want to be able to display a logged-in user’s name or profile picture in your project.
Once the user authenticates, the SDK extracts the user's profile information and stores it in memory. The application can access the user profile with the reactive `user` property. To access this property, review your component's `setup` function and find the `userAuth0` return value.

The `user` property contains sensitive information related to the user's identity. It is only available based on the user's authentication status. To prevent render errors, you should always:
- use the `isAuthenticated` property to determine whether Auth0 has authenticated the user before Vue renders any component that consumes the `user` property.

- ensure that the SDK has finished loading by checking that `isLoading` is false before accessing the `isAuthenticated` property.

### Using the Options API
For the Options API, use the same reactive `user`, `isLoading`, and `isAuthenticated` properties from the global `$auth0` property through the `this` accessor.

::::checkpoint

:::checkpoint-default

Verify that:
* you can display the `user` or any of the user properties within a component correctly after you have logged in

:::

:::checkpoint-failure
If you are having issues with the `user` properties:
* Verify you added the `isLoading` check before accessing the `isAuthenticated` property
* Verify you added the `isAuthenticated` check before accessing the `user` property

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::

::::
