---
title: Introduction
description: This quickstart guide demonstrates how to add authentication to an Angular 1.x application using Auth0
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '00-Starter-Seed'
}) %>

Auth0 provides wrappers for using the [Lock widget](https://auth0.com/lock) and the [auth0.js](https://github.com/auth0/auth0.js) library in Anguar apps, and these wrappers will be used throughout these quickstart guides.

## Samples Projects

If you want to follow along with these quickstart guides, download the [seed project](https://github.com/auth0-samples/auth0-angularjs-sample/tree/master/00-Starter-Seed) as a starting point. The seed project is just a basic, blank Angular 1.x application with all the Bower dependencies included and the required references added to the `index.html` file. You can also download the source code for each quickstart step from these docs.

## Prerequisites

Before starting, it is important to ensure your application is set up correctly by following these steps:

## Create an Application

<%= include('../../_includes/_new_app') %>_

## Configure Callback URLs

A callback URL is a URL in your application where Auth0 redirects to after the user has authenticated. You can set the Callback URL by going to the [Application Settings](${uiAppSettingsURL}) section of your Auth0 dashboard and make sure that **Allowed Callback URLs** contains the following value:

<pre><code>http://localhost:3000/</pre></code>

If you are testing your application locally, make sure to add your local URL as an **Allowed Callback URL** and the following as an **Allowed Origin (CORS)**:

```bash
http://localhost:3000/
```

> **Note:** The sample uses host `localhost` and port `3000`,
but if you use others host and port, you will need put an appropriate ones.

## Dependencies

As stated before, the seed project contains all the required Bower dependencies and has the references added to the `index.html` file. If you would rather integrate Auth0 into an existing Angular 1.x application instead of using our seed project, you will need to add the following Bower dependencies to your application:

```bash
bower install --save auth0-lock angular-lock angular-jwt
```

> **Note:** These tutorials use native local storage for storing and retrieving the user's JSON Web Token and profile object. 
Alternatively, you may use [angular-storage](https://github.com/auth0/angular-storage) which provides cookie fallbacks for older browsers.

You will also need to add the references to the libraries to your application's `index.html`:

```html
<!-- Auth0 Lock -->
<script type="text/javascript" src="bower_components/auth0-lock/build/lock.js"></script>
<!-- lock-angular -->
<script type="text/javascript" src="bower_components/angular-lock/dist/angular-lock.js"></script>
<!-- angular-jwt -->
<script type="text/javascript" src="bower_components/angular-jwt/dist/angular-jwt.js"></script>
```

The purpose of each of these references are as follows:

 - **auth0-lock** is the default authentication widget provided by Auth0
 - **angular-lock**: Auth0's wrapper for using Lock with Angular 1.x
 - **angular-jwt**: Library that contains several useful services which make using JSON Web Tokens in Angular 1.x apps easy
