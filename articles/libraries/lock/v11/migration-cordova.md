---
title: Migration from Lock 10 in Cordova Apps
description: Learn how to migrate from Lock 10 in your Cordova app.
topics:
  - libraries
  - lock
  - migrations
  - cordova
contentType:
  - how-to
useCase:
  - add-login
  - migrate
---

# Migration from Lock in Cordova Applications

For Cordova applications, the only migration path forward at this time is to [migrate to Universal Login](/guides/login/migration-embedded-universal). Embedded <dfn data-key="lock">Lock</dfn> will not be supported in Cordova apps going forward, as part of an effort to align Auth0's Cordova support with more stringent standards and security policies.

Instead of updating embedded Lock versions, Cordova apps using Auth0 should instead use the [auth0-cordova](https://github.com/auth0/auth0-cordova) library to initiate <dfn data-key="universal-login">Universal Login</dfn> in Cordova apps. See the [Cordova Quickstart](/quickstart/native/cordova/01-login) for an example of setting this up.
