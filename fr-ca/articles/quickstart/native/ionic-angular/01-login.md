---
title: Login
default: true
description: This tutorial demonstrates how to add user login with Auth0 to an Ionic Angular & Capacitor application.
budicon: 448
topics:
  - quickstarts
  - native
  - ionic
  - angular
  - capacitor
github:
  path: angular
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD002 MD041 -->

<%= include('../_includes/ionic/_article_intro') %>

<%= include('../_includes/_getting_started', { library: 'Ionic' }) %>

<%= include('../_includes/ionic/_configure_urls') %>

<%= include('../../_includes/_auth0-angular-install') %>

<%= include('../_includes/ionic/_install_plugins') %>

### Configure your App module

The SDK exports `AuthModule`, a module that contains all the services required for the SDK to function. To register this with your application:

- Open the `app.module.ts` file
- Import the `AuthModule` type from the `@auth0/auth0-angular` package
- Add `AuthModule` to the application by calling `AuthModule.forRoot` and adding to your application module's `imports` array
- Specify the configuration for the Auth0 Angular SDK

```javascript
// Import the types from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import config from '../../capacitor.config';

// ..

// Build the URL that Auth0 should redirect back to
const redirect_uri = `<%= "${config.appId}" %>://${account.namespace}/capacitor/<%= "${config.appId}" %>/callback`;

// Register AuthModule with your AppModule
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AuthModule.forRoot({
      domain: "${account.namespace}",
      clientId: "${account.clientId}",
      useRefreshTokens: true,
      useRefreshTokensFallback: false,
      authorizationParams: {
        redirect_uri,
      }
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
```

The `AuthModule.forRoot` function takes the following configuration:

- `domain`: The "domain" value present under the "Settings" of the application you created in your Auth0 dashboard, or your custom domain if using Auth0's [Custom Domains feature](http://localhost:3000/docs/custom-domains)
- `clientId`: The "client ID" value present under the "Settings" of the application you created in your Auth0 dashboard
- `useRefreshTokens`: To use auth0-angular with Ionic on Android and iOS, it's required to enable refresh tokens.
- `useRefreshTokensFallback`: To use auth0-angular with Ionic on Android and iOS, it's required to disable the iframe fallback.
- `authorizationParams.redirect_uri`: The URL to where you'd like to redirect your users after they authenticate with Auth0.

<%= include('../_includes/ionic/_note_storage') %>

:::panel Checkpoint
Now that you have configured your app with the Auth0 Angular SDK, run your application to verify that the SDK is initializing without error and that your application runs as it did before.
:::

## Add Login to Your Application

<%= include('../_includes/ionic/_add_login_intro') %>

Add a new `LoginButton` component to your application with the following code:

```js
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-login-button',
  template: `<ion-button (click)="login()">Login</ion-button>`,
})
export class LoginButtonComponent {
  constructor(public auth: AuthService) {}

  login() {
    this.auth
      .loginWithRedirect({
        async openUrl(url: string) {
          await Browser.open({ url, windowName: '_self' });
        }
      })
      .subscribe();
  }
}
```

This component:

- defines a template with a simple button that logs the user in when clicked
- uses `loginWithRedirect` to login using Auth0's Universal Login page
- uses the `openUrl` callback to use Capacitor's Browser plugin to open the URL and show the login page to the user

### Handling the callback

<%= include('../_includes/ionic/_handle_callback_intro') %>

Modify your `App` component and use the `ngOnInit` method to handle the callback from Auth0.

```js
import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { mergeMap } from 'rxjs/operators';
import { Browser } from '@capacitor/browser';
import { App } from '@capacitor/app';

const callbackUri = `<%= "${config.appId}" %>://${account.namespace}/capacitor/<%= "${config.appId}" %>/callback`;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  // Import the AuthService module from the Auth0 Angular SDK
  constructor(public auth: AuthService, private ngZone: NgZone) {}

  ngOnInit(): void {
    // Use Capacitor's App plugin to subscribe to the `appUrlOpen` event
    App.addListener('appUrlOpen', ({ url }) => {
      // Must run inside an NgZone for Angular to pick up the changes
      // https://capacitorjs.com/docs/guides/angular
      ngZone.run(() => {
        if (url?.startsWith(callbackUri)) {
          // If the URL is an authentication callback URL..
          if (
            url.includes('state=') &&
            (url.includes('error=') || url.includes('code='))
          ) {
            // Call handleRedirectCallback and close the browser
            this.auth
              .handleRedirectCallback(url)
              .pipe(mergeMap(() => Browser.close()))
              .subscribe();
          } else {
            Browser.close();
          }
        }
      });
    });
  }
}
```

Note that the `appUrlOpen` event callback is wrapped in `ngZone.run`, which means that the changes to observables that occur when `handleRedirectCallback` runs are picked up by the Angular app. Please read [Using Angular with Capacitor](https://capacitorjs.com/docs/guides/angular) for more details. Otherwise, the screen will not update to show the authenticated state after you log in.

<%= include('../_includes/ionic/_note_custom_schemes') %>

:::panel Checkpoint
Add the `LoginButton` component to your application, as well as the handler for the "appUrlOpen" event to your `App` component. When you click the login button, verify that your application redirects you to the Auth0 Universal Login Page and that you can now log in or sign up using a username and password or a social provider.

Once that's complete, verify that Auth0 redirects you back to your application.
:::

## Add Logout to Your Application

<%= include('../_includes/ionic/_add_logout_intro.md') %>

Create a new `LogoutButton` component and add the following code to the file. Then, add the `LogoutButton` component to your app.

```js
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { tap } from 'rxjs/operators';

// Build the URL to return back to your app after logout
const returnTo = `<%= "${config.appId}" %>://${account.namespace}/capacitor/<%= "${config.appId}" %>/callback`;

@Component({
  selector: 'app-logout-button',
  template: `<ion-button (click)="logout()">Log out</ion-button>`,
})
export class LogoutButtonComponent {
  // Import the AuthService module from the Auth0 Angular SDK
  constructor(public auth: AuthService) {}

   logout() {
    this.auth
      .logout({ 
        logoutParams: {
          returnTo,
        },
        async openUrl(url: string) {
          await Browser.open({ url });
        } 
      })
      .subscribe();
  }
}
```

:::panel Checkpoint
Add the `LogoutButton` component to your application. When you click it, verify that your Ionic application redirects you to the address you specified as one of the "Allowed Logout URLs" in the "Settings" and that you are no longer logged in to your application.
:::

## Show User Profile Information

The Auth0 SDK helps you retrieve the [profile information](https://auth0.com/docs/users/concepts/overview-user-profile) associated with logged-in users quickly in whatever component you need, such as their name or profile picture, to personalize the user interface. The profile information is available through the `user$` property exposed by `AuthService`.

Create a new component `Profile`, and use the following code to display user profile information in your app.

```js
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  template: `
  <div *ngIf="auth.user$ | async as user">
    <ion-avatar class="avatar">
      <img [src]="user.picture" [alt]="user.name" />
    </ion-avatar>
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
  </div>`,
})
export class ProfileComponent {
  constructor(public auth: AuthService) {}
}

```

:::panel Checkpoint
Add `ProfileComponent` to your application, and verify that you can display the `user.name` or [any other `user` property](https://auth0.com/docs/users/references/user-profile-structure#user-profile-attributes) within a component correctly after you have logged in.
:::
