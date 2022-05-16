---
title: Add Login to your Angular Application
description: "Auth0 allows you to add authentication to your Angular application and gain access to user profile information. This quickstart shows common snippets used to integrate Auth0 with any new or existing Angular application using the Auth0 Angular SDK."
interactive: true
files:
  - files/index
  - files/login
  - files/logout
  - files/profile
github:
  path: Sample-01
---

# Add Login to your Angular App

Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any Angular application using the Auth0 Angular SDK.

To use this quickstart, you’ll need to:
- Sign up for a free Auth0 account or log in to Auth0.
- Have a working Angular project that you want to integrate with. Alternatively, you can view or download a sample application after logging in.

<%= include('../../_includes/_configure_auth0_interactive', { 
  callback: 'http://localhost:4200',
  returnTo: 'http://localhost:4200',
  webOriginUrl: 'http://localhost:4200',
  showWebOriginInfo: true
}) %>

## Install the Auth0 Angular SDK

Auth0 provides an [Angular SDK](https://github.com/auth0/auth0-angular) to simplify the process of implementing Auth0 authentication and authorization in Angular applications.

Install the Auth0 Angular SDK by running the following commands in your terminal:

```bash
npm install @auth0/auth0-angular
```

The SDK exposes several types that help integrate Auth0 in an Angular application idiomatically, including a module and an authentication service.

## Register and configure AuthModule {{{ data-action="code" data-code="app.module.ts#10:13" }}}

The SDK exports `AuthModule`, a module that contains all the services required for the SDK to function. To register this with your application:

* Open the `app.module.ts` file
* Import the `AuthModule` type from the `@auth0/auth0-angular` package
* Add `AuthModule` to the application by calling `AuthModule.forRoot` and adding to your application module's `imports` array.
* Inject `AuthService` into `AppComponent`.

We use the [`forRoot()` pattern](https://angular.io/guide/singleton-services#the-forroot-pattern) to configure the module, which takes the properties `domain` and `clientId`; the values of these properties correspond to the "Domain" and "Client ID" values present under the "Settings" of the single-page application that you registered with Auth0.

<%= include('../_includes/_auth_note_custom_domains') %>

## Add login to your application {{{ data-action=code data-code="login-button.ts#11:13" }}}

The Auth0 Angular SDK provides tools to quickly implement user authentication in an Angular application, such as creating a login button using the `loginWithRedirect()` method from the `AuthService` service class. Executing `loginWithRedirect()` redirects the users to the Auth0 Universal Login page. Upon successful authentication, Auth0 will redirect the users back to the original application.

::::checkpoint

:::checkpoint-default

Click the login button and verify that your Angular application redirects you to the [Auth0 Universal Login](https://auth0.com/universal-login) page and that you can now log in or sign up using a username and password or a social provider.

Once that's complete, verify that Auth0 redirects back to your application's homepage.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* you configured the correct `redirectUri`
* you added the `LoginButtonComponent` button to the module's declarations

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Add Logout to your Application {{{ data-action=code data-code="logout-button.ts#21:25" }}}

Users who log in to your project will also need [a way to log out](/logout/guides/logout-auth0). Create a logout button using the `logout()` method from the `AuthService` service. When users log out, they will be redirected to your [Auth0 logout endpoint](/api/authentication?javascript#logout), which will then immediately redirect them to the logout URL you set up earlier in this quickstart.

:::note
The `LoginButton` and `LogoutButton` can be rendered conditionally based on the value of the `isAuthenticated$` observable, exposed on the `AuthService`. Alternatively, a single `AuthButton` could be used to combine both buttons as well as the conditional rendering.
:::

::::checkpoint

:::checkpoint-default

Run your application and click the logout button, verify that:

- your Angular application redirects you to the address you specified as one of the Allowed Logout URLs in your Application Settings
- you are no longer logged in to your application

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* you configured the correct Logout URL
* you added the `LogoutButtonComponent` to the module's declarations 

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::

## Show user profile information {{{ data-action=code data-code="user-profile.ts" }}}

Now that your users can log in and log out, you will likely want to be able to retrieve the [profile information](https://auth0.com/docs/users/concepts/overview-user-profile) associated with authenticated users. 

The Auth0 Angular SDK helps you retrieve that [profile information](/users/concepts/overview-user-profile), such as their name or profile picture, through the `user$` observable exposed by the `AuthService` service.

The `user$` observable contains sensitive information and artifacts related to the user's identity. As such, its availability depends on the user's authentication status. Fortunately, the `user$` observable is configured so that it only starts to emit values once the `isAuthenticated$` observable is true, so there is no need to manually check the authentication state before accessing the user profile data.

::::checkpoint

:::checkpoint-default

Add the `UserProfileComponent` to your application and verify that it displays the user's `name` and `email` after being logged in.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* you are trying to access an existing property such as `user.name`
* you added the `UserProfileComponent` component to the correct module's declarations
* you are logged in 

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::

:::note
For a deep dive into implementing user authentication in Angular, visit the [Complete Guide to Angular User Authentication with Auth0](https://auth0.com/blog/complete-guide-to-angular-user-authentication/). This guide provides you with additional details, such as creating a signup button.
:::
