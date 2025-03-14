---
title: Login
description: This tutorial demonstrates how to add user login to an Angular application using Auth0.
budicon: 448
topics:
  - quickstarts
  - spa
  - angular
  - login
github:
  path: Standalone
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD002 MD034 MD041 -->

:::note
Visit the [Angular Authentication By Example](https://developer.auth0.com/resources/guides/spa/angular/basic-authentication) guide for a deep dive into implementing user authentication in Angular. This guide provides additional details on how to create a sign-up button and add route guards to an Angular application.
:::

<%= include('../_includes/_getting_started', { library: 'Angular', callback: 'http://localhost:4200', returnTo: 'http://localhost:4200', webOriginUrl: 'http://localhost:4200', showLogoutInfo: true, showWebOriginInfo: true, new_js_sdk: true, show_install_info: false }) %>

<%= include('../../_includes/_auth0-angular-install') %>

### Register and providing Auth0

The SDK exports `provideAuth0`, which is a provide function that contains all the services required for the SDK to function. To register this with your application:

1. Open the `main.ts` file.
2. Import the `provideAuth0` function from the `@auth0/auth0-angular` package.
3. Add `provideAuth0` to the application by adding it to the `providers` inside `bootstrapApplication`.
4. Inject `AuthService` into `AppComponent`.

```javascript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAuth0 } from '@auth0/auth0-angular';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideAuth0({
      domain: '${account.namespace}',
      clientId: '${account.clientId}',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ]
});
```

The `provideAuth0` function takes the properties `domain` and `clientId`; the values of these properties correspond to the **Domain** and **Client ID** values that you can find under **Settings** in the Single-Page Application (SPA) that you registered with Auth0. On top of that, we configure `authorizationParams.redirect_uri`, which allows Auth0 to redirect the user back to the specific URL after successfully authenticating.

<%= include('../_includes/_auth_note_custom_domains') %>

:::panel Checkpoint
Now that you have imported `AuthModule`, run your application to verify that the SDK is initializing correctly and that your application is not throwing any errors related to Auth0.
:::

## Add Login to Your Application

The Auth0 Angular SDK gives you tools to quickly implement user authentication in your Angular application, such as creating a [login](/login) button using the `loginWithRedirect()` method from the `AuthService` service class. Executing `loginWithRedirect()` redirects your users to the Auth0 Universal Login Page, where Auth0 can authenticate them. Upon successful authentication, Auth0 will redirect your users back to your application.

```javascript
import { Component } from '@angular/core';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  template: '<button (click)="auth.loginWithRedirect()">Log in</button>',
  standalone: true
})
export class AuthButtonComponent {
  // Inject the authentication service into your component through the constructor
  constructor(public auth: AuthService) {}
}
```

:::panel Checkpoint
Add the `AuthButtonComponent` component to your application. When you click it, verify that your Angular application redirects you to the [Auth0 Universal Login](https://auth0.com/universal-login) page and that you can now log in or sign up using a username and password or a social provider.

Once that's complete, verify that Auth0 redirects back to your application's homepage.
:::

![Auth0 Universal Login](/media/quickstarts/universal-login.png)

<%= include('../_includes/_auth_note_dev_keys') %>

## Add Logout to Your Application

Now that you can log in to your Angular application, you need [a way to log out](/logout/guides/logout-auth0). You can create a logout button using the `logout()` method from the `AuthService` service. Executing `logout()` redirects your users to your [Auth0 logout endpoint](/api/authentication?javascript#logout) (`https://YOUR_DOMAIN/v2/logout`) and then immediately redirects them to your application.

Here is a modified version of the `AuthButtonComponent` component above that uses both `loginWithRedirect()` and `logout()`, as well as checking the authentication state using the `isAuthenticated$` observable:

```javascript
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <button (click)="auth.logout({ logoutParams: { returnTo: document.location.origin } })">
        Log out
      </button>
    </ng-container>

    <ng-template #loggedOut>
      <button (click)="auth.loginWithRedirect()">Log in</button>
    </ng-template>
  `,
  standalone: true
})
export class AuthButtonComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
}
```

Specify the `returnTo` option when calling `logout` to tell Auth0 where it should redirect to after a successful logout. This value must be specified in [the **Allowed Logout URLs** setting](#configure-logout-urls) in the dashboard.

:::note
Here we use `http://localhost:4200` as the value for `logoutParams.returnTo`, but the associate sample uses `window.location.origin`, which in this case would resolve to the same value. Ultimately, this value should point to the root URL for your application.
:::

:::panel Checkpoint
Add a button to the component template that logs the user out of your application. When you click it, verify that your Angular application redirects you the address you specified as one of the "Allowed Logout URLs" in the "Settings" and that you are no longer logged in to your application.
:::

## Show User Profile Information

The Auth0 Angular SDK helps you retrieve the [profile information](/users/concepts/overview-user-profile) associated with logged-in users quickly in whatever component you need, such as their name or profile picture, to personalize the user interface. The profile information is available through the `user$` observable exposed by the `AuthService` service. Take this `Profile` component as an example of how to use it:

```javascript
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  template: `
    <ul *ngIf="auth.user$ | async as user">
      <li>{{ user.name }}</li>
      <li>{{ user.email }}</li>
    </ul>`,
  standalone: true
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}
}
```

The `user$` observable contains sensitive information and artifacts related to the user's identity. As such, its availability depends on the user's authentication status. Fortunately, the `user$` observable is configured so that it only starts to emit values once the `isAuthenticated$` observable is true, so there is no need to manually check the authentication state before accessing the user profile data.

:::panel Checkpoint
Verify that you can display the `user.name` or [any other `user` property](/users/references/user-profile-structure#user-profile-attributes) within a component correctly after you have logged in.
:::