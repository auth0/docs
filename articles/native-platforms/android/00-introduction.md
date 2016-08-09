---
title: Introduction
description: Short Introduction to the Auth0 Android Quickstarts.
---

<%= include('../../_includes/_github', { link: 'https://github.com/inaka/auth0-android-sample/tree/00-introduction', }) %>

This is a short introduction to the Auth0 Android Quickstarts.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* AndroidStudio 2.0
* Emulator - Nexus5X - Android 6.0 
  :::
  
## Sample Projects

Each tutorial in the serie includes a link to its corresponding sample project, which expose how to achieve the goal from the tutorial in question. You can check out all the samples [here](https://github.com/auth0-samples/auth0-android-sample).

## Dependencies

Each tutorial will require you to use either [Lock](https://github.com/auth0/Lock.Android) or the [Auth0.swift](https://github.com/auth0/Auth0.Android) library.

Briefly speaking about them:

- [**Lock**](https://github.com/auth0/Lock.Android) is a widget that is easy to present in your app. It contains default templates (that can be a customized) for login with email/password, sign up, social providers integration, and also password recovery.
- [**Auth0.Android**](https://github.com/auth0/Auth0.Android) is a toolkit that lets you communicate with many of the basic [Auth0 API](https://auth0.com/docs/api) functions in a neat way.

The `Lock` dependency is already integrated on each sample project through [Gradle](https://gradle.org/).
`Lock` packs most of the `Auth0.Android` functionality inside.

It's recommended that, as a starting point for your project, you download the [seed project](#seed-project) described above, which already includes these dependencies.

Otherwise, if you're starting an empty project by your own, or if you want to add authentication to an existing project from yours, you have to make sure you install them:

#### Gradle

Inside the `app.gradle` dependencies section:

```xml
compile 'com.auth0.android:lock:2.0.0-beta.2'   
```

Then, run `sync with gradle`.

> For more information about Gradle usage, check [their official documentation](https://gradle.org/getting-started-android-build/).


## Your First Steps

Make sure you complete these steps before going through any tutorial:

#### 1. Create an application

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

#### 2. Configure your callback URLs

TO BE UPDATED

#### 3. Set your credentials

The [dependencies](#dependencies) listed above will offer different functionalities that require your credientials inside the app. If you downloaded the seed project, or any sample project from here, these credentials must come automatically set. Anyway, you have to make sure they are there, otherwise your app might crash. 

The required credentials are, your ClientID > `${account.clientId}` and your domain > `${account.namespace}`.

The suggested approach is to add them in the `Strings.xml` file, and access them whenever you want:

```xml
<string name="auth0_client_id">${account.clientId}</string>
<string name="auth0_domain">${account.namespace}</string>
```
Also, remember to update the Lock's data path

```xml
<data
	android:host="@string/auth0_domain"
	android:pathPrefix="/android/auth0/YOUR_APP_PACKAGE/callback"
	android:scheme="https" />
```

## Done!

**You're all set up to start integrating Auth0 in your app!** 🎉

The tutorial guides contained in this section will teach you the different things you can do with it. It's recommendable that you follow them sequentially in order, as they are progressive and there is content that usually needs to be learned from previous tutorials.

Said that, we suggest you to start with the [login tutorial](01-login.md)...

Have fun!