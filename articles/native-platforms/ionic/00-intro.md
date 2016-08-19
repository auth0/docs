---
title: Introduction
description: test
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-ionic-samples',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-ionic-samples',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed',
  pkgFilePath: '00-Starter-Seed/www/app/auth0.variables.js',
  pkgType: 'replace'
}) %>

Welcome to this quickstart which will guide you through the various steps of implementing Auth0 in your Ionic applications.

Auth0 provides and manages an [AngularJS SDK](https://github.com/auth0/auth0-angular) which can be used with Ionic applications. This SDK wraps Auth0's [Lock Widget](https://github.com/auth0/lock) as well as the [Auth0.js library](https://github.com/auth0/auth0.js), so it makes it simple to integrate these in your Ionic applications.

<%= include('../../_includes/_signup') %> 

## Seed &amp; Samples

If you want to follow along with this Quickstart, you can download the [seed project](https://github.com/auth0-samples/auth0-ionic-samples/tree/master/00-Starter-Seed) as a starting point. The seed project is just a basic, blank Ionic application with all the Bower dependencies included and the required references added to the `index.html` file.

You can also download the included source code for a specific step of this quickstart by going to the [Sample repository](https://github.com/auth0-samples/auth0-ionic-samples) and then using the source code for that step as your starting point.    

## Prerequisites

Before we start with this Quickstart, it is important to set up our application by following these steps:

::: panel-info Can I Skip?
You can skip this step if you think you can find your way around or just looking for something specific in the quickstart.
:::

### 1. Create an Application

<%= include('../../_includes/_new_app') %>_

### 2. Configure Callback URLs

A callback URL is a URL in your application where Auth0 redirects to after the user has authenticated. You can set the Callback URL by going to the [Application Settings](${uiAppSettingsURL}) section of your Auth0 dashboard and make sure that **Allowed Callback URLs** contains the following value:

<pre><code>https://${account.namespace}/mobile</pre></code>

Also, if you are testing your application locally, make sure to add your local URL as an **Allowed Callback URL** and the following as an **Allowed Origin (CORS)**:

```bash
file://\*
```

### 3. Dependencies

As stated before, the seed project contains all the required Bower dependencies and has the references added to the `index.html` file. If you would rather integrate Auth0 into an existing Ionic application instead of using our seed project, you will need to add the following Bower dependencies to your application:

${snippet(meta.snippets.bower)}

You will also need to add the references to the libraries to your application's `index.html`:

${snippet(meta.snippets.references)}

The purpose of each of these references are as follows:

 - **auth0-lock** is the default authentication widget provided by Auth0. It is completely optional but I suggest you stick to it as an Auth0 newbie.
 - **auth0.js** is Auth0's javascript library. This is not necessary if you choose to use Lock throughout.
 - **auth0-angular**: Auth0's SDK for Angular. It exposes most of the useful methods for authentication.
 - **angular-storage**: A `localStorage` and `sessionStorage` wrapper create with love by Auth0 team.
 - **angular-jwt**: Angular service that makes using JSON Web Tokens easy in Angular apps.

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
