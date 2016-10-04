---
title: Introduction
description: Brief introduction to the iOS Swift tutorials. First steps required to follow any of the tutorials.
---

This multi-step quickstart guide will walk you through managing authentication in your iOS apps with Auth0.



## Sample Projects

<%= include('_includes/_prerequisite') %>

Each tutorial in the series includes a link to its corresponding sample project, which demonstrates how to achieve the tutorial's goal. You can find all the samples [here](https://github.com/auth0-samples/auth0-ios-swift-sample/).

## Dependencies

Each tutorial will require you to use either [Lock](https://github.com/auth0/Lock.iOS-OSX) or the [Auth0.swift](https://github.com/auth0/Auth0.swift) toolkit, or both.

A brief description:

- [**Lock**](https://github.com/auth0/Lock.iOS-OSX) is a widget that is easy to present in your app. It contains default templates (that can be customized) for login with email/password, signup, social providers integration, and password recovery.
- [**Auth0.swift**](https://github.com/auth0/Auth0.swift) is a toolkit that lets you communicate efficiently with many of the basic [Auth0 API](/api/info) functions.

These dependencies are already integrated into each sample project through [Cocoapods](https://cocoapods.org/). We have chosen to use an approach of not git-ignoring them in the samples repo; that way, you don't have to worry about running pod commands— once you've cloned the repo, the samples are ready to be run!

It's recommended that, as a starting point for your project, you download the [seed project](#seed-project) described above, which already includes these dependencies.

Otherwise, if you're starting an empty project on your own, or if you want to add authentication to an existing project of yours, you have to make sure you install them:

#### Carthage

If you are using Carthage, add the following lines to your `Cartfile`:

```ruby
github "auth0/Lock.iOS-OSX" -> 1.26
github "auth0/Auth0.swift" "1.0.0-beta.5"
```

Then, run `carthage bootstrap`.

> For more information about Carthage usage, check [their official documentation](https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos).

#### Cocoapods

If you are using [Cocoapods](https://cocoapods.org/), add these lines to your `Podfile`:

```ruby
use_frameworks!
pod 'Lock', '~> 1.26'
pod 'Auth0', '1.0.0-beta.5'
```

Then, run `pod install`.

> For further reference on Cocoapods, check [their official documentation](http://guides.cocoapods.org/using/getting-started.html).

## Create an Application

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

<%= include('_includes/_config') %>
