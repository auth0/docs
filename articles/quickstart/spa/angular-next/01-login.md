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
    path: 01-Login
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD002 MD034 MD041 -->

<%= include('../_includes/_getting_started', { library: 'Angular', callback: 'http://localhost:4200', returnTo: 'http://localhost:4200', webOriginUrl: 'http://localhost:4200', showLogoutInfo: true, showWebOriginInfo: true, new_js_sdk: true, show_install_info: false }) %>

## Install the Auth0 Angular SDK

Run the following command within your project directory to install the Auth0 Angular SDK:

```bash
npm install @auth0/auth0-angular
```

The SDK exposes a module and a service that help you integrate Auth0 with your Angular application idiomatically.

### Register and configure `AuthModule`

The SDK exposes a module that contains the components and services that we expose now or in the future. Import this module into your application module so that our components and services can be accessed through the dependency injection framework:

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
      domain: 'YOUR_AUTH0_DOMAIN',
      clientId: 'YOUR_AUTH0_CLIENT_ID',
    }),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
```

We use the [`forRoot()` pattern](https://angular.io/guide/singleton-services#the-forroot-pattern) to configure the module, which takes the properties `domain` and `clientId`; the values of these properties correspond to the "Domain" and "Client ID" values present under the "Settings" of the single-page application that you registered with Auth0.

:::note
If you are using a [custom domain with Auth0](https://auth0.com/docs/custom-domains), the value of the domain prop is the value of your custom domain instead of the value reflected in the "Settings" tab.
:::

:::panel Checkpoint
Now that you have imported `AuthModule`, run your application to verify that the SDK is initializing correctly, and your application is not throwing any errors related to Auth0.
:::