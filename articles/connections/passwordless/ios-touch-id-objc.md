---
title: Passwordless Authentication on iOS with Touch ID (Objective-C)
languages:
  - name: Swift
    url: swift
  - name: Objective-C
    url: objc
---
# Using Passwordless on iOS with TouchID

<!-- markdownlint-disable -->

::: warning
This feature is disabled for new tenants as of June 8th 2017. Any tenant created after that date won't have the necessary legacy [grant types](/clients/client-grant-types) to use Touch ID. This document is offered as reference for older implementations.

Please take a look at an alternative approach to [Touch ID Authentication](/libraries/lock-ios/v2/touchid-authentication).
:::

<%= include('./_using-lock-ios-touchid', { language: 'objc' }) %>
