---
title: Getting Started
description: Initial steps to integrate Auth0 in an iOS Swift application.
budicon: 448
---

This quickstart guide contains individual steps which demonstrate how to use various Auth0 features in your iOS applications. Each step has a dedicated sample project which can be downloaded directly from the doc or forked on Github. If you are logged in to your Auth0 account, the samples will have your Auth0 credentials pre-populated for you.

<%= include('../../_includes/_new_app') %>

## About the Sample Applications

The code snippets within this quickstart guide are based on the downloadable samples. Within each of these samples, you will find a very simple  application which utilizes a few ViewControllers.

It should be noted that a simplistic application is used in the samples and snippets intentionally. The focus of this quickstart guide is on how to use Auth0 in an application in general rather than on how to approach various architectural scenarios.

## Auth0 Dependencies

Each tutorial will require you to use either [Lock](https://github.com/auth0/Lock.swift) or the [Auth0.swift](https://github.com/auth0/Auth0.swift) toolkit, or both.

A brief description:

- [**Lock**](https://github.com/auth0/Lock.iOS-OSX) is a widget that is easy to present in your app. It contains default templates (that can be customized) for login with email/password, signup, social providers integration, and password recovery.
- [**Auth0.swift**](https://github.com/auth0/Auth0.swift) is a toolkit that lets you communicate efficiently with many of the basic [Auth0 API](/api/info) functions.

<%= include('_includes/_dependencies') %>

<%= include('_includes/_config') %>
