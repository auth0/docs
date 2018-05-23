---
title: Getting started
description: Short Introduction to the Auth0 Android Quickstarts.
budicon: 715
github:
  path: 00-Login
---

This quickstart guide walks you through managing authentication with Auth0 in your Android apps.

## Sample Projects

Each tutorial in the series includes a link to a sample project. You can find all the samples [here](https://github.com/auth0-samples/auth0-android-sample).

## Dependencies

Each tutorial uses the [Auth0.Android](https://github.com/auth0/Auth0.Android) library. It is a toolkit that lets you communicate with many of the basic [Auth0 API](https://auth0.com/docs/api) functions in a neat way.

## Create an Application

Create a new client application in your [Auth0 dashboard](${manage_url}/#/applications). For **Type**, select **Native**.

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

<%= include('_includes/_callback_urls') %>

<%= include('_includes/_credentials') %>