---
title: Introduction
description: Short Introduction to the Auth0 Android Quickstarts.
---

This multistep quickstart guide will walk you through managing authentication in your android apps with Auth0.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* AndroidStudio 2.2
* Emulator - Nexus5X - Android 6.0
:::

<%= include('../../_includes/_signup') %>

## Sample Projects

Each tutorial in the series includes a link to its corresponding sample project. You can check out all the samples [here](https://github.com/auth0-samples/auth0-android-sample).

## Dependencies

Each tutorial will require you to use either [Lock](https://github.com/auth0/Lock.Android) or the [Auth0.Android](https://github.com/auth0/Auth0.Android) library.

- [**Lock**](https://github.com/auth0/Lock.Android) is an `Activity` that is easy to present in your app. It contains default templates (that can be customized) for login with email/password, sign up, social providers integration, and also password recovery.
- [**Auth0.Android**](https://github.com/auth0/Auth0.Android) is a toolkit that lets you communicate with many of the basic [Auth0 API](https://auth0.com/docs/api) functions in a neat way.

The `Lock` dependency is already integrated in each sample project through [Gradle](https://gradle.org/).
`Lock` packs most of the `Auth0.Android` functionality inside.

#### Gradle

Inside the `build.gradle` dependencies section:

```xml
apply plugin: 'com.android.application'
android {
	//..
}
dependencies {
	compile 'com.auth0.android:lock:2.0.0'   
}
```

Then, run `sync with gradle`.

> For more information about Gradle usage, check [their official documentation](https://gradle.org/getting-started-android-build/).


## First Steps

Make sure you complete these steps before going through the tutorials:

#### 1. Create a client

<%= include('../../client-platforms/_includes/_callback-url-introduction') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

#### 2. Configure Your Callback URLs

> If you wish to only use DB connections, skip this point.

The callback URLs are meant to be used to receive the OAuth response when logging in with social connections or enterprise connections.

#### 3. Set Your Credentials

The [dependencies](#dependencies) listed above will offer different functionalities that require your credentials inside the app. If you downloaded the seed project, or any sample project from here, these credentials must come automatically set.

The required credentials are, your ClientID > `${account.clientId}` and your domain > `${account.namespace}`.

The suggested approach is to add them in the `strings.xml` file, and access them whenever you want:

```xml
<string name="auth0_client_id">${account.clientId}</string>
<string name="auth0_domain">${account.namespace}</string>
```
Also, remember to update the Lock's data path

```xml
<data
	android:host="@string/auth0_domain"
	android:pathPrefix="/android/YOUR_APP_PACKAGE/callback"
	android:scheme="https" />
```

## Done!

**You're all set up to start integrating Auth0 in your app!** 🎉

We recommend that you follow the steps sequentially, as they are progressive and there is content that usually needs to be learned from previous steps.
