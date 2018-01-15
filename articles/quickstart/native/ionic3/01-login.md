---
title: Login
default: true
description: This tutorial demonstrates how to add authentication and authorization to an Ionic 3 app
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ionic3-samples',
  path: '01-Login',
  requirements: [
    'Ionic 3.x',
    'Angular 5+'
  ]
}) %>

<%= include('../_includes/_ionic_setup') %>

## Set Up URL Redirects

Use the `onRedirectUri` method from **auth0-cordova** when your app loads to properly handle redirects after authentication.

```js
// app.component.ts
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

// Import Auth0Cordova
import Auth0Cordova from '@auth0/cordova';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Redirect back to app after authenticating
      (window as any).handleOpenURL = (url: string) => {
        Auth0Cordova.onRedirectUri(url);
      }
    });
  }
}
```

## Create an Authentication Service and Configure Auth0

To coordinate authentication tasks, it's best to set up an injectable service that can be reused across the application. This service needs methods for logging users in and out, as well as checking their authentication state. Be sure to replace `YOUR_PACKAGE_ID` with the identifier for your app in the configuration block.

${snippet(meta.snippets.use)}

## Show Authentication State

Add a control to your app to allow users to log in. The control should call the `login` method from the `AuthService`. Start by injecting the `AuthService` in a component.

```js
// src/pages/home/home.ts
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(
    public navCtrl: NavController,
    public auth: AuthService
  ) {}

}
```

The `AuthService` is now accessible in the view and its `login` method can be called.

```html
<!-- src/pages/home/home.html -->
<ion-header>
  <ion-navbar>
    <ion-title>Home</ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <p *ngIf="auth.loading" text-center>Loading...</p>
  <ng-template [ngIf]="!auth.loading">
    <!-- Not loading, not logged in: show login button -->
    <button
      ion-button
      block
      color="primary"
      *ngIf="!auth.loggedIn"
      (click)="auth.login()">Log In</button>
    <!-- Not loading, logged in: show profile and logout button -->
    <ng-template [ngIf]="auth.loggedIn">
      <ion-card *ngIf="auth.user">
        <img [src]="auth.user.picture">
        <ion-card-content>
          <ion-card-title>{{ auth.user.name }}</ion-card-title>
          <pre>{{ auth.user | json }}</pre>
        </ion-card-content>
      </ion-card>
      <button
        ion-button
        block
        color="danger"
        (click)="auth.logout()">Log Out</button>
    </ng-template>
  </ng-template>
</ion-content>
```

### Troubleshooting

#### Cannot read property 'isAvailable' of undefined

This means that you're attempting to test this in a browser. At this time you'll need to run this either in an emulator or on a device.

#### Completely blank page when launching the app

This could either mean that you've built the seed project using Ionic 1, or that the device where you are testing it isn't entirely supported by Ionic 2 yet. Be sure to check the console for errors.
