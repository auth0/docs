---
title: Introduction
description: Introduction and summary of what the quickstart is about
---

This is the very beginning of a simple, practical and multi-step quickstart that will guide you through managing authentication in your Angular JS apps with Auth0.

Auth0 provides and manages an [AngularJS SDK](https://github.com/auth0/auth0-angular). This SDK wraps Auth0's [Lock Widget](https://github.com/auth0/lock) and [Auth0.js](https://github.com/auth0/auth0.js) which makes it easy to use any of them. It uses which ever is included in your project or Lock if both are included.

## Seed &amp; Samples

There are two options to following along these steps. You can either download the [seed project](https://github.com/auth0-samples/auth0-angularjs-sample/tree/master/00-Starter-Seed) or the samples. The seed is a regular angular app with nothing on Auth0 in it except for the dependencies included in the HTML. It just serves as a starting point as well building blocks for this quickstart. The samples are included in each step and contains the example for each of the step.

::: panel-info Running the Sample
At any point in time you can run this sample with a simple HTTP server. One example is http-server which can be installed with `npm install -g http-server`. Run `http-server` on the root directory of the sample to launch.
:::

## Prerequisites
Before we embark on this journey of ours, it is important to setup our application by following these process:

::: panel-info Can I Skip?
You can skip this step if you think you can find your way around or just looking for something specific in the quickstart.
:::

### 1. Create an Application

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.̨png)

### 2. Configure Callback URLs
Callback URLs are URLs that Auth0 invokes after the authentication process. Auth0 routes your application back to this URL and attaches some details to it including a token. Callback URLs can be manipulated on the fly and that could be harmful. For security reasons, you will need to add your application's URL in the app's `Allowed Callback URLs`. This will enable Auth0 to recognize the URLs as valid. If omitted, authentication will not be successful for the app instance.

![Callback error](/media/articles/angularjs/callback_error2.png)

### 3. Structure
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

### 4. Dependencies
Some JavaScript dependencies are required for Auth0 to work as expected in an Angular app. Include the dependencies' scripts in your `index.html`:

${snippet(meta.snippets.dependencies)}

These may seem like a lot of dependencies, but each one has a very important function. Go through and figure out if each package works for your use case. Feel free to strip off the unnecessary packages.

 - **lock** is the default authentication widget provided by Auth0. It is completely optional but I suggest you stick to it as an Auth0 newbie.
 - **auth0.js** is Auth0's javascript library. This is not necessary if you choose to use Lock throughout.
 - **angular** is Angular's main library which you are building the application on.
 - **angular-cookies** is Angular's wrapper for managing client cookies.
 - **angular-route** is used to mange SPA routes in Angular application.
 - **auth0-angular**: Auth0's SDK for Angular. Exposes most of the useful methods for authentication
 - **angular-storage**: A `localStorage` and `sessionStorage` wrapper create with love by Auth0 team.
 - **angular-jwt**: Angular service that makes using JWT easy in Angular apps.

The seed project already have this files included, injected into angular (where applicable) and ready for use.

### 5. Viewport
Right after including the scripts, add a viewport to make the lock widget fit in to device widths:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

With all that, our entire `<head>` will look like this:

${snippet(meta.snippets.head)}
