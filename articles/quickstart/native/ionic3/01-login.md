---
title: Login
default: true
description: This tutorial demonstrates how to add user login to an Ionic 3 application using Auth0.
budicon: 448
topics:
  - quickstarts
  - native
  - ionic3
github:
  path: 01-Login
contentType: tutorial
useCase: quickstart
---

<%= include('../_includes/_getting_started', { library: 'Swift') %>

<%= include('../../../_includes/_callback_url') %>

The **Callback URL** to be used for your application includes your app's package ID which is found in the `config.xml` file for your app.

Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings">Application Settings</a> section in your Auth0 dashboard and set your **Callback URL** in the **Allowed Callback URLs** box.

If you are following along with the sample project you downloaded from the top of this page, you should set the **Allowed Callback URL** to  

```bash
# replace YOUR_PACKAGE_ID with your app package ID
YOUR_PACKAGE_ID://${account.namespace}/cordova/YOUR_PACKAGE_ID/callback
```
:::

Replace `YOUR_APP_PACKAGE_NAME` with your application's package name, available as the `applicationId` attribute in the `app/build.gradle` file.
```bash
# replace YOUR_PACKAGE_ID with your app package ID
YOUR_PACKAGE_ID://${account.namespace}/cordova/YOUR_PACKAGE_ID/callback
```

Add `file` as an allowed origin to the **Allowed Origins (CORS)** box.

```bash
file://*
```

Lastly, be sure that the **Application Type** for your application is set to **Native** in the application settings.

## Install the Dependencies

The required dependencies for using Auth0 in an Ionic application are **auth0.js** and **auth0-cordova**. Install them with npm or yarn.

```bash
# installation with npm
npm install auth0-js @auth0/cordova --save

# installation with yarn
yarn add auth0-js @auth0/cordova
```

### Add Cordova Plugins

You must install the `SafariViewController` plugin from Cordova to be able to use universal login. The downloadable sample project already has this plugin added, but if you are embedding Auth0 in your own application, install the plugin via the command line.

```bash
ionic cordova plugin add cordova-plugin-safariviewcontroller
```

The `CustomURLScheme` plugin from Cordova is also required to handle redirects properly. The sample project has it already, but if you're adding Auth0 to your own project, install this plugin as well.

```bash
# replace YOUR_PACKAGE_ID with your app identifier
ionic cordova plugin add cordova-plugin-customurlscheme --variable URL_SCHEME={YOUR_PACKAGE_ID} --variable ANDROID_SCHEME={YOUR_PACKAGE_ID} --variable ANDROID_HOST=${account.namespace} --variable ANDROID_PATHPREFIX=/cordova/{YOUR_PACKAGE_ID}/callback
```

## Integrate Auth0 in your Application

### Modify config.xml

Add `<preference name="AndroidLaunchMode" value="singleTask" />` to your config.xml. This will allow the Auth0 dialog to properly redirect back to your app.

### Set Up URL Redirects

Use the `onRedirectUri` method from **auth0-cordova** when your app loads to properly handle redirects after authentication.

```js
// src/app/app.component.ts

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

### Configure Auth0

Create a new file called `auth.config.ts` in your `src/services` folder to provide the necessary Auth0 configuration for your Ionic app:

```js
// src/services/auth.config.ts

export const AUTH_CONFIG = {
  // Needed for Auth0 (capitalization: ID):
  clientID: '${account.clientId}',
  // Needed for Auth0Cordova (capitalization: Id):
  clientId: '${account.clientId}',
  domain: '${account.namespace}',
  packageIdentifier: 'YOUR_PACKAGE_ID' // config.xml widget ID, e.g., com.auth0.ionic
};
```

Be sure to replace `YOUR_PACKAGE_ID` with the identifier for your app.

### Create an Authentication Service

To coordinate authentication tasks, it's best to set up an injectable service that can be reused across the application. This service needs methods for logging users in and out, as well as checking their authentication state.

```js
// src/services/auth.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';

// Import AUTH_CONFIG, Auth0Cordova, and auth0.js
import { AUTH_CONFIG } from './auth.config';
import Auth0Cordova from '@auth0/cordova';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
  Auth0 = new auth0.WebAuth(AUTH_CONFIG);
  Client = new Auth0Cordova(AUTH_CONFIG);
  accessToken: string;
  user: any;
  loggedIn: boolean;
  loading = true;

  constructor(
    public zone: NgZone,
    private storage: Storage
  ) {
    this.storage.get('profile').then(user => this.user = user);
    this.storage.get('access_token').then(token => this.accessToken = token);
    this.storage.get('expires_at').then(exp => {
      this.loggedIn = Date.now() < JSON.parse(exp);
      this.loading = false;
    });
  }

  login() {
    this.loading = true;
    const options = {
      scope: 'openid profile offline_access'
    };
    // Authorize login request with Auth0: open login page and get auth results
    this.Client.authorize(options, (err, authResult) => {
      if (err) {
        throw err;
      }
      // Set Access Token
      this.storage.set('access_token', authResult.accessToken);
      this.accessToken = authResult.accessToken;
      // Set Access Token expiration
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      this.storage.set('expires_at', expiresAt);
      // Set logged in
      this.loading = false;
      this.loggedIn = true;
      // Fetch user's profile info
      this.Auth0.client.userInfo(this.accessToken, (err, profile) => {
        if (err) {
          throw err;
        }
        this.storage.set('profile', profile).then(val =>
          this.zone.run(() => this.user = profile)
        );
      });
    });
  }

  logout() {
    this.storage.remove('profile');
    this.storage.remove('access_token');
    this.storage.remove('expires_at');
    this.accessToken = null;
    this.user = null;
    this.loggedIn = false;
  }
}
```

## Add Authentication with Auth0

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

#### Add Platform and Run the App

You will now need to allow Ionic / Cordova to install the necessary plugins and update your `config.xml` appropriately for the platform you wish to run on.

Use the following commands to add your desired platform(s) (e.g., `ios` or `android`) and run the app:

```bash
# Add platform (e.g., ios or android)
$ ionic cordova platform add {platform}
# Run on desired platform (e.g., ios or android)
$ ionic cordova run {platform} --livereload
```

This will then launch your app in the local emulation environment for the platform you chose (Xcode Simulator for iOS or the Android emulator of your choice).

Don't be alarmed if you _cannot authenticate_ successfully yet at this stage! There was some configuration generated by running the app that you still need to add to your Auth0 settings.

### Update Auth0 Dashboard Configuration

1. After executing the `run` command, your `config.xml` file should contain `<allow-navigation>` tag(s).
2. Make note of IP address URLs from any `<allow-navigation>` tags.
3. In your [Auth0 Dashboard](https://manage.auth0.com), go to your Ionic app's **Settings**.
4. Add the full allowed navigation addresses (including `http://` and ports) to the **Allowed Origins (CORS)** settings for your Auth0 application and click the **Save Changes** button.

You should now be able to log into your app!

## Troubleshooting

### Cannot read property 'isAvailable' of undefined

This means that you're attempting to test this in a browser. This library was designed to be run on a device and expects a Cordova environment with the `SafariViewController` plugin available.

### Completely blank page when launching the app

This could either mean that you've built the seed project using a different version of Ionic, or that the device where you are testing it isn't entirely supported by Ionic 3 yet.

This could also occur on iOS if you are running the app in a simulator and something else is listening on port `8080` on the same machine. A good way to check for this is to run the application from XCode instead and check the logs.

### Profile doesn't show after successful login

This is not actually an issue with your code, but is an Ionic quirk when running in an emulator (generally iOS). You can use a real device, or generally fix this by turning on live reload when you run your app in the emulator, and adding an alert in your `auth.service.ts` that simply creates a notification with the JSON stringified contents of the `authResult` in the `Client.authorize()` callback. This will generally fix the issue, and then you can remove the alert and everything should work normally.
