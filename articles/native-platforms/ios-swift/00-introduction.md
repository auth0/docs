---
title: Introduction
description: Brief introduction to the iOS-Swift tutorials.
---

This is the very beginning of a simple, practical and multi-step quickstart that will guide you through managing authentication in your iOS apps with Auth0.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* CocoaPods 1.0.0
* XCode 7.3 (7D175)
* Simulator - iPhone 6 - iOS 9.3 (13E230)
  :::

<%= include('../../_includes/_package', {
  pkgRepo: 'native-mobile-samples',
  pkgBranch: 'master',
  pkgPath: 'iOS/basic-sample-swift',
  pkgFilePath: 'iOS/basic-sample-swift/SwiftSample/Info.plist',
  pkgType: 'replace'
}) %>

### Before Starting

<div class="setup-callback">
<p>Go to the <a href="${uiAppSettingsURL}">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:</p>

<pre><code>a0${account.clientId}://\*.auth0.com/authorize</pre></code>
</div>

### Done!

You're all set up to start integrating Auth0 in your app. The tutorial guides contained in this section will teach you the different things you can do with it. It's recommendable that you follow them sequentially in order, as they are progressive and there is content that usually needs to be learned in previous tutorials.