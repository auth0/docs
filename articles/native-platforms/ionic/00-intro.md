---
title: Introduction
description: test
---


::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Ionic 1.3.1
:::

<%= include('../../_includes/_signup') %>

Auth0 provides wrappers for using the [Lock widget](https://auth0.com/lock) and the [auth0.js](https://github.com/auth0/auth0.js) library in Anguar apps, and these wrappers will be used throughout these quickstart guides.

## Samples Projects

If you want to follow along with these quickstart guides, download the [seed project](https://github.com/auth0-samples/auth0-ionic-samples/tree/master/00-Starter-Seed) as a starting point. The seed project is just a basic, blank Ionic application with all the Bower dependencies included and the required references added to the `index.html` file. You can also download the source code for each quickstart step from these docs.

## Prerequisites

Before starting, it is important to ensure your application is set up correctly by following these steps:

### 1. Create an Application

<%= include('../../_includes/_new_app') %>_

### 2. Configure Callback URLs

A callback URL is a URL in your application where Auth0 redirects to after the user has authenticated. You can set the Callback URL by going to the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) section of your Auth0 dashboard and make sure that **Allowed Callback URLs** contains the following value:

<pre><code>https://${account.namespace}/mobile</pre></code>

If you are testing your application locally, make sure to add your local URL as an **Allowed Callback URL** and the following as an **Allowed Origin (CORS)**:

```bash
file://\*
```

### 3. Dependencies

As stated before, the seed project contains all the required Bower dependencies and has the references added to the `index.html` file. If you would rather integrate Auth0 into an existing Ionic application instead of using our seed project, you will need to add the following Bower dependencies to your application:

```bash
bower install --save auth0-lock angular-lock angular-jwt
```

You will also need to add the references to the libraries to your application's `index.html`:

```html
<!-- Auth0 Lock -->
<script src="lib/auth0-lock/build/lock.min.js"></script>
<!-- lock-angular -->
<script src="lib/angular-lock/dist/angular-lock.min.js"></script>
<!-- angular-jwt -->
<script src="lib/angular-jwt/dist/angular-jwt.min.js"></script>
```

The purpose of each of these references are as follows:

 - **auth0-lock** is the default authentication widget provided by Auth0
 - **angular-lock**: Auth0's wrapper for using Lock with Angular
 - **angular-jwt**: Library that contains several useful services which make using JSON Web Tokens in Angular apps easy

### 4. Add the `InAppBrowser` plugin

You must install the `InAppBrowser` plugin from Cordova to be able to show the Login popup. The seed project already has this plugin added, but if you are adding Auth0 to your own application you need to run the following command:

```bash
ionic plugin add cordova-plugin-inappbrowser
```

and then add the following configuration to the `config.xml` file:

```xml
<feature name="InAppBrowser">
  <param name="ios-package" value="CDVInAppBrowser" />
  <param name="android-package" value="org.apache.cordova.inappbrowser.InAppBrowser" />
</feature>
```
