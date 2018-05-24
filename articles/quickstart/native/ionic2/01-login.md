---
title: Login
default: true
description: This tutorial demonstrates how to add user login to an Ionic 2+ application using Auth0.
budicon: 448
github:
  path: 01-Login
---
<%= include('../_includes/_ionic_setup') %>

## Set Up URL Redirects

Use the `onRedirectUri` method from **auth0-cordova** when your app loads to properly handle redirects after authentication.

```js
// app.component.ts

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

// Import Auth0Cordova
import Auth0Cordova from '@auth0/cordova';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      // Add this function
      (<any>window).handleOpenURL = (url) => {
        Auth0Cordova.onRedirectUri(url);
      };

    });
  }
}
```

## Create an Authentication Service and Configure Auth0

To coordinate authentication tasks, it's best to set up an injectable service that can be reused across the application. This service needs methods for logging users in and out, as well as checking their authentication state. Be sure to replace `YOUR_PACKAGE_ID` with the identifier for your app in the configuration block.

```js
// src/services/auth.service.ts

import { Injectable, NgZone } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import Auth0Cordova from '@auth0/cordova';
import Auth0 from 'auth0-js';

const auth0Config = {
  // needed for auth0
  clientID: '${account.clientId}',

  // needed for auth0cordova
  clientId: '${account.clientId}',
  domain: '${account.namespace}',
  callbackURL: location.href,
  packageIdentifier: 'YOUR_PACKAGE_ID'
};

@Injectable()
export class AuthService {
  auth0 = new Auth0.WebAuth(auth0Config);
  accessToken: string;
  idToken: string;
  user: any;

  constructor(public zone: NgZone) {
    this.user = this.getStorageVariable('profile');
    this.idToken = this.getStorageVariable('id_token');
  }

  private getStorageVariable(name) {
    return JSON.parse(window.localStorage.getItem(name));
  }

  private setStorageVariable(name, data) {
    window.localStorage.setItem(name, JSON.stringify(data));
  }

  private setIdToken(token) {
    this.idToken = token;
    this.setStorageVariable('id_token', token);
  }

  private setAccessToken(token) {
    this.accessToken = token;
    this.setStorageVariable('access_token', token);
  }

  public isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

  public login() {
    const client = new Auth0Cordova(auth0Config);

    const options = {
      scope: 'openid profile offline_access'
    };

    client.authorize(options, (err, authResult) => {
      if(err) {
        throw err;
      }

      this.setIdToken(authResult.idToken);
      this.setAccessToken(authResult.accessToken);

      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      this.setStorageVariable('expires_at', expiresAt);

      this.auth0.client.userInfo(this.accessToken, (err, profile) => {
        if(err) {
          throw err;
        }

        profile.user_metadata = profile.user_metadata || {};
        this.setStorageVariable('profile', profile);
        this.zone.run(() => {
          this.user = profile;
        });
      });
    });
  }

  public logout() {
    window.localStorage.removeItem('profile');
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('id_token');
    window.localStorage.removeItem('expires_at');

    this.idToken = null;
    this.accessToken = null;
    this.user = null;
  }

}
```

## Add a Login Control

Add a control to your app to allow users to log in. The control should call the `login` method from the `AuthService`. Start by injecting the `AuthService` in a component.

```js
// src/pages/home/home.ts

import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public auth: AuthService) {}

}
```

The `AuthService` is now accessible in the view and its `login` method can be called.

```html
<!-- src/pages/home/home.html -->

<div *ngIf="!auth.isAuthenticated()">
  <button ion-button block color="primary" (click)="auth.login()">Log In</button>
</div>
```

## Display Profile Data

Your application will likely require some kind of profile area for users to see their information. Depending on your needs, this can also serve as the place for them to log out of the app.

The `login` method in the `AuthService` includes a call to Auth0 for the authenticated user's profile. This profile information can now be used in a template.

```html
<!-- src/pages/home/home.html -->

<ion-header>
  <ion-navbar>
    <ion-title>
      Home Page
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>

  <!-- a card with the user's picture and name, plus a logout button -->
  <div *ngIf="auth.isAuthenticated()">
    <ion-card>
      <img [src]="auth.user.picture" />
      <ion-card-content>
        <ion-card-title>{{ auth.user.name }}</ion-card-title>
      </ion-card-content>
    </ion-card>
    <button ion-button block color="primary" (click)="auth.logout()">Logout</button>
  </div>

</ion-content>
```

### Troubleshooting

#### Cannot read property 'isAvailable' of undefined

This means that you're attempting to test this in a browser. At this time you'll need to run this either in an emulator or on a device.

#### Completely blank page when launching the app

This could either mean that you've built the seed project using Ionic 1, or that the device where you are testing it isn't entirely supported by Ionic 2 yet. Be sure to check the console for errors.
