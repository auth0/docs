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
  path: Sample-01
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD002 MD034 MD041 -->

<%= include('../_includes/_getting_started', { library: 'Angular', callback: 'http://localhost:4200', returnTo: 'http://localhost:4200', webOriginUrl: 'http://localhost:4200', showLogoutInfo: true, showWebOriginInfo: true, new_js_sdk: true, show_install_info: false }) %>

<%= include('../../_includes/_auth0-angular-install') %>

### Register and configure the authentication module

The SDK exports `AuthModule`, a module that contains all the services required for the SDK to function. To register this with your application:

* Open the `app.module.ts` file
* Import the `AuthModule` type from the `@auth0/auth0-angular` package
* Add `AuthModule` to the application by calling `AuthModule.forRoot` and adding to your application module's `imports` array

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: '${account.namespace}',
      clientId: '${account.clientId}'
    }),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
```

We use the [`forRoot()` pattern](https://angular.io/guide/singleton-services#the-forroot-pattern) to configure the module, which takes the properties `domain` and `clientId`; the values of these properties correspond to the "Domain" and "Client ID" values present under the "Settings" of the single-page application that you registered with Auth0.

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
  template: '<button (click)="auth.loginWithRedirect()">Log in</button>'
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

![Auth0 Universal Login](https://cdn.auth0.com/blog/universal-login/lightweight-login.png)

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
      <button (click)="auth.logout({ returnTo: document.location.origin })">
        Log out
      </button>
    </ng-container>

    <ng-template #loggedOut>
      <button (click)="auth.loginWithRedirect()">Log in</button>
    </ng-template>
  `,
  styles: [],
})
export class AuthButtonComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
}
```

Specify the `returnTo` option when calling `logout` to tell Auth0 where it should redirect to after a successful logout. This value must be specified in [the **Allowed Logout URLs** setting](#configure-logout-urls) in the dashboard.

:::note
Here we use `http://localhost:4200` as the value for `returnTo`, but the associate sample uses `window.location.origin`, which in this case would resolve to the same value. Ultimately, this value should point to the root URL for your application.
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
    </ul>`
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}
}
```

The `user$` observable contains sensitive information and artifacts related to the user's identity. As such, its availability depends on the user's authentication status. Fortunately, the `user$` observable is configured so that it only starts to emit values once the `isAuthenticated$` observable is true, so there is no need to manually check the authentication state before accessing the user profile data.

:::panel Checkpoint
Verify that you can display the `user.name` or [any other `user` property](/users/references/user-profile-structure#user-profile-attributes) within a component correctly after you have logged in.
:::

:::note
For a deep dive into implementing user authentication in Angular, visit the [Complete Guide to Angular User Authentication with Auth0](https://auth0.com/blog/complete-guide-to-angular-user-authentication/). This guide provides you with additional details, such as creating a signup button.
:::
