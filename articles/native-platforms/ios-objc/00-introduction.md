---
title: Introduction
description: Brief introduction to the iOS Objective-C tutorials.
---

This is the very beginning of a simple, practical, multi-step quickstart that will guide you through managing authentication in your iOS apps with Auth0.



## Seed Project

Here is a [seed project](https://github.com/auth0-samples/auth0-ios-swift-sample/tree/master/00-Starter-Seed) containing an empty project with only the required [dependencies](#dependencies) installed.

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-ios-objc-sample/tree/master/00-Starter-Seed',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-ios-objc-sample',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed',
  pkgFilePath: '01-Login/Auth0Sample/Info.plist',
  pkgType: 'replace'
}) %>

This seed project can be useful as a starting point for the app to which you need to integrate authentication.



## Sample Projects

Each tutorial in the series includes a link to its corresponding sample project, which demonstrates how to achieve the goal from the tutorial in question. You can check out all the samples [here](https://github.com/auth0-samples/auth0-ios-objc-sample/).



## Dependencies

Each tutorial will require you to use either [Lock](https://github.com/auth0/Lock.iOS-OSX) or the [Auth0.swift](https://github.com/auth0/Auth0.swift) toolkit, or both.

A brief overview:

- [**Lock**](https://github.com/auth0/Lock.iOS-OSX) is a widget that is easy to present in your app. It contains default templates (that can be a bit customized) for login with email/password, sign up, social providers integration, and also password recovery.
- [**Auth0.swift**](https://github.com/auth0/Auth0.swift) is a toolkit that lets you communicate neatly with many of the basic [Auth0 API](https://auth0.com/docs/api) functions.

These dependencies are already integrated in each sample project through [Cocoapods](https://cocoapods.org/). We have chosen to use an approach of not git-ignoring them in the samples repo; that way, you don't have to worry about running pod commands. Once you've cloned the repo, the samples are ready to be run!

It's recommended that, as a starting point for your project, you download the [seed project](#seed-project) described above, which already includes these dependencies.

Otherwise, if you're starting an empty project of your own, or if you want to add authentication to an existing project from yours, you have to make sure you install them:

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
pod 'Lock', '~> 1.24'
pod 'Auth0', '1.0.0-beta.5'
```

Then, run `pod install`.

> For further reference on Cocoapods, check [their official documentation](http://guides.cocoapods.org/using/getting-started.html).



## Your First Steps

Make sure you complete these steps before going through any tutorial:

#### 1. Create an application

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

#### 2. Configure your callback URLs

TO BE UPDATED: The initial PR had this include `'../_includes/_callback-url-introduction'`. Neither the file nor the directory exist and the page could not load due to that.

#### 3. Set your credentials

The [dependencies](#dependencies) listed above require that you set your credentials in two different `.plist` files in order for them to work. If you downloaded the seed project, or any sample project from here, these credentials will come automatically set. Anyway, you have to make sure they are there, otherwise your app might crash.

Make sure you have the following entries in your project's `Info.plist`:

<table class="table">
  <thead>

```
<tr>
  <th>Key</th>
  <th>Value</th>
</tr>
```

  </thead>
  <tr>

```
<td>Auth0ClientId</td>
<td>${account.clientId}</td>
```

  </tr>
  <tr>

```
<td>Auth0Domain</td>
<td>${account.namespace}</td>
```

  </tr>
</table>

Also, make sure you have the following entries in a file named `Auth0.plist`. You have to create that file if it doesn't exist:

<table class="table">
  <thead>

```
<tr>
  <th>Key</th>
  <th>Value</th>
</tr>
```

  </thead>
  <tr>

```
<td>ClientId</td>
<td>${account.clientId}</td>
```

  </tr>
  <tr>

```
<td>Domain</td>
<td>${account.namespace}</td>
```

  </tr>
</table>



## Done!

**You're all set up to start integrating Auth0 in your app!** 🎉

The tutorial guides contained in this section will teach you the different things you can do with it. It's recommendable that you follow them sequentially in order, as they are progressive and there is content that usually needs to be learned from previous tutorials.

Said that, we suggest you to start with the [login tutorial](01-login.md)...

Have fun!
