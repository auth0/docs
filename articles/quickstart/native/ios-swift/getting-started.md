---
title: Getting Started
description: Initial steps to integrate Auth0 in an iOS Swift application.
budicon: 448
---

This quickstart guide contains individual steps which demonstrate how to use various Auth0 features in your iOS applications. Each step has a dedicated sample project which can be downloaded directly from the quickstart guide or forked on Github.

## About the Sample Applications

Each step within this quickstart guide (starting with ** Centralized Login**) contains a downloadable sample which demonstrates the topic being covered. Within each of these samples, you will find an appropriate application to demonstrate the features discussed in the chapter.

It should be noted that a simplistic application is used in the samples and snippets intentionally. The focus of this quickstart guide is on how to use Auth0 in an application in general rather than on how to approach various architectural scenarios.

## Auth0 Dependencies

Each tutorial will require you to use either the [Auth0.swift](https://github.com/auth0/Auth0.swift) toolkit, the [Lock](https://github.com/auth0/Lock.swift) widget or both.

A brief description:

- [**Auth0.swift**](https://github.com/auth0/Auth0.swift) is a toolkit that lets you communicate efficiently with many the [Auth0 API](/api/info) functions and enables you to integrate centralized Lock.

- [**Lock**](https://github.com/auth0/Lock.iOS-OSX) is a native widget that is easy to embed in your app. It contains default templates (that can be customized) for login with email/password, signup, social providers integration, and password recovery.

## Create a Client

If you haven't already done so, create a new client application in your [Auth0 dashboard](${manage_url}/#/applications/${account.clientId}/settings) and choose **Native**.

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

<%= include('_includes/_config') %>
