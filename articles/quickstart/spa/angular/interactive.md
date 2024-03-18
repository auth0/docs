---
title: Add Login to your Angular Application
description: "Auth0 allows you to add authentication to your Angular application and gain access to user profile information. This guide demonstrates common snippets used to integrate Auth0 with any new or existing Angular application using the Auth0 Angular SDK."
interactive: true
files:
  - files/index
  - files/login
  - files/logout
  - files/profile
github:
  path: Sample-01
---

:::note
Visit the [Angular Authentication By Example](https://developer.auth0.com/resources/guides/spa/angular/basic-authentication) guide for a deep dive into implementing user authentication in Angular. This guide provides additional details on how to create a sign-up button, add route guards, and call a protected API from Angular.
:::

# Add Login to Your Angular Application

Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any Angular application using the [Auth0 Angular SDK](https://github.com/auth0/auth0-angular).

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

Install the Auth0 Angular SDK by running the following command in your terminal:

```bash
npm install @auth0/auth0-angular
```

The SDK exposes several types that help integrate Auth0 in an Angular application idiomatically, including a module and an authentication service.

## Register and providing Auth0 {{{ data-action="code" data-code="main.ts#7:13" }}}

The SDK exports `provideAuth0`, which is a provide function that contains all the services required for the SDK to function. To register this with your application:

1. Open the `main.ts` file.
2. Import the `provideAuth0` function from the `@auth0/auth0-angular` package.
3. Add `provideAuth0` to the application by adding it to the `providers` inside `bootstrapApplication`.
4. Inject `AuthService` into `AppComponent`.

The `provideAuth0` function takes the properties `domain` and `clientId`; the values of these properties correspond to the **Domain** and **Client ID** values that you can find under **Settings** in the Single-Page Application (SPA) that you registered with Auth0. On top of that, we configure `authorizationParams.redirect_uri`, which allows Auth0 to redirect the user back to the specific URL after successfully authenticating.

<%= include('../_includes/_auth_note_custom_domains') %>

## Add login to your application {{{ data-action=code data-code="login-button.ts#11:13" }}}

Now that you have configured your Auth0 Application and the Auth0 Angular SDK, you need to set up login for your project. To do this, you will use the SDK’s `loginWithRedirect()` method from the `AuthService` class to redirect users to the Auth0 Universal Login page where Auth0 can authenticate them. After a user successfully authenticates, they will be redirected to your application and the callback URL you set up earlier in this quickstart.

Create a login button in your application that calls `loginWithRedirect()` when selected.

::::checkpoint

:::checkpoint-default
You should now be able to log in to your application.

Run your application, and select the login button. Verify that:

- you can log in or sign up using a username and password.
- your application redirects you to the [Auth0 Universal Login](https://auth0.com/universal-login) page.
- you are redirected to Auth0 for authentication.
- Auth0 successfully redirects back to your application after authentication.
- you do not receive any errors in the console related to Auth0.

:::

:::checkpoint-failure
Sorry about that. Here are a few things to double check:

- make sure you configured the correct `authorizationParams.redirect_uri`
- make sure you added the `LoginButtonComponent` button to the module's declarations

Still having issues? To get more help, check out our [documentation](/) or visit our [community page](https://community.auth0.com).

:::
::::

## Add logout to your application {{{ data-action=code data-code="logout-button.ts#19:25" }}}

Users who log in to your project will also need [a way to log out](/logout/guides/logout-auth0). The SDK provides a `logout()` method on the `AuthService` class that you can use to log a user out of your app. When users log out, they will be redirected to your [Auth0 logout endpoint](/api/authentication?javascript#logout), which will then immediately redirect them to your application and the logout URL you set up earlier in this quickstart.

Create a logout button in your application that calls `logout()` when selected.

:::note
The SDK exposes an `isAuthenticated$` observable on the `AuthService` class that allows you to check whether a user is authenticated or not. You can render the login and logout buttons conditionally based on the value of the `isAuthenticated$` observable. Alternatively, you can use a single button to combine both login and logout buttons as well as their conditional rendering.
:::

::::checkpoint

:::checkpoint-default
You should now be able to log out of your application.

Run your application, log in, and select the logout button. Verify that:

- you are redirected to Auth0's logout endpoint.
- Auth0 successfully redirects back to your application and the correct logout URL.
- you are no longer logged in to your application.
- you do not receive any errors in the console related to Auth0.

:::

:::checkpoint-failure
Sorry about that. Here are a few things to double check:

- make sure that you configured the logout URL as one of the **Allowed Logout URLS** in your application's **Settings**
- check that you added the `LogoutButtonComponent` to the module's declarations 
- inspect the [application logs](https://manage.auth0.com/#/logs) for further errors

Still having issues? To get more help, check out our [documentation](/) or visit our [community page](https://community.auth0.com).

:::

::::

## Show user profile information {{{ data-action=code data-code="user-profile.ts" }}}

Now that your users can log in and log out, you will likely want to be able to retrieve the [profile information](/users/concepts/overview-user-profile) associated with authenticated users. For example, you may want to be able to personalize the user interface by displaying a logged-in user’s name or profile picture.

The Auth0 Angular SDK provides user information through the `user$` observable exposed by the `AuthService` class. Because the `user$` observable contains sensitive information and artifacts related to the user's identity, its availability depends on the user's authentication status. Fortunately, the `user$` observable is configured to only emit values once the `isAuthenticated$` observable is true, so there is no need to manually check the authentication state before accessing the user profile data.

The SDK also exposes an `isAuthenticated$` observable on the `AuthService` class that allows you to check whether a user is authenticated or not, which you can use to determine whether to show or hide UI elements, for example.

Review the `UserProfileComponent` code in the interactive panel to see examples of how to use these functions.

::::checkpoint

:::checkpoint-default
You should now be able to view user profile information.

Run your application, and verify that:

- user information displays correctly after you have logged in.
- user information does not display after you have logged out.

:::

:::checkpoint-failure
Sorry about that. Here are a few things to double check:

- make sure you are logged in
- make sure you are trying to access an existing property such as `user.name`
- make sure you added the `UserProfileComponent` component to the correct module's declarations

Still having issues? To get more help, check out our [documentation](/) or visit our [community page](https://community.auth0.com).
:::

::::
