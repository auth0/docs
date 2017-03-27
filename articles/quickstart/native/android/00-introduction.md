---
title: Introduction
description: Short Introduction to the Auth0 Android Quickstarts.
budicon: 715
---

This multistep quickstart guide will walk you through managing authentication in your android apps with Auth0.

## Sample Projects

Each tutorial in the series includes a link to its corresponding sample project. You can find all the samples [here](https://github.com/auth0-samples/auth0-android-sample).

## Dependencies

Each tutorial will require you to use either [Lock](https://github.com/auth0/Lock.Android) or the [Auth0.Android](https://github.com/auth0/Auth0.Android) library.

- [Lock](https://github.com/auth0/Lock.Android) provides customizable Activities to present in an easy way in your app. Some of the included templates are login with email/password, sign up, social providers integration, and also password recovery.
- [Auth0.Android](https://github.com/auth0/Auth0.Android) is a toolkit that lets you communicate with many of the basic [Auth0 API](https://auth0.com/docs/api) functions in a neat way.

The `Lock` dependency is already integrated in each sample project through [Gradle](https://gradle.org/).
`Lock` packs most of the `Auth0.Android` functionality inside.

## Create a Client

If you haven't already done so, create a new client application in your [Auth0 dashboard](${manage_url}/#/clients) and choose **Native**.

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

<%= include('_includes/_callback_urls') %>

<%= include('_includes/_credentials') %>
