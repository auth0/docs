---
title: Introduction
description: Learn how to quickly add authentication to your Angular.js app and authenticate with any social or enterprise identity provider.
---

This is a simple, practical and multi-step quickstart that will guide you through managing authentication in your Angular JS apps with Auth0.

Auth0 provides and manages an [AngularJS SDK](https://github.com/auth0/auth0-angular). This SDK wraps Auth0's [Lock Widget](https://github.com/auth0/lock) and [Auth0.js](https://github.com/auth0/auth0.js), which makes it easy to use either of them. It uses whichever is included in your project, or Lock, if both are included. 

Auth0 supports authentication in both redirect and pop-up modes. Although SPAs do not retain state after a page reloads or redirects, the SDK makes handling this situation simple.

## Seed &amp; Samples

There are two options for following along with these steps. You can either download the [seed project](https://github.com/auth0-samples/auth0-angularjs-sample/tree/master/00-Starter-Seed) or the samples. The seed project is a regular angular app can serve as a starting point for this quickstart. The samples are included with each step below.

## 1. Create an Application

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

## 2. Configure Callback URLs

<%= include('../_includes/_callback-url-introduction') %>

## 3. Structure
Throughout the steps, the seed and samples will have the following directory structure:
```bash
|---home
|------home.html
|------home.js
|---login
|------login.html
|------login.js
|---settings
|------settings.html
|------settings.js
|---app.js
|---index.html
```

## 4. Dependencies
Some JavaScript dependencies are required for Auth0 to work as expected in an Angular app. Include the dependencies' scripts in your `index.html`:

${snippet(meta.snippets.dependencies)}

These may seem like a lot of dependencies, but each one has a very important function. Go through and figure out if each package works for your use case. Feel free to remove packages.

 - **lock** is the default authentication widget provided by Auth0.
 - **auth0.js** is Auth0's javascript library. This is not necessary if you choose to use Lock throughout.
 - **angular** is Angular's main library which you are building the application on.
 - **angular-cookies** is Angular's wrapper for managing client cookies.
 - **angular-route** is used to mange SPA routes in Angular application.
 - **auth0-angular**: Auth0's SDK for Angular. Exposes most of the useful methods for authentication.
 - **angular-storage**: A `localStorage` and `sessionStorage` wrapper by Auth0 team.
 - **angular-jwt**: Angular service that makes using JWT easy in Angular apps.

The seed project already has these files included, injected into angular (where applicable) and ready for use.

## 5. Viewport
Right after including the scripts, add a viewport to make the lock widget fit into device widths:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

The `<head>` will look like this:

${snippet(meta.snippets.head)}
