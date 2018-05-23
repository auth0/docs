---
title: Passwordless Authentication on iOS with Touch ID (Objective-C)
languages:
  - name: Swift
    url: swift
  - name: Objective-C
    url: objc
tags:
    - connections
    - passwordless
    - touchid
    - ios
    - objective-c
---
# Using Passwordless on iOS with TouchID

<!-- markdownlint-disable -->

::: warning
This feature is disabled for new tenants as of June 8th 2017. Any tenant created after that date won't have the necessary legacy [grant types](/applications/application-grant-types) to use Touch ID. This document is offered as reference for older implementations.
:::

::: note
For an alternative approach, using the [Credentials Manager](https://github.com/auth0/Auth0.swift/blob/master/Auth0/CredentialsManager.swift) utility in Auth0.swift, refer to [Touch ID Authentication](/libraries/lock-ios/v2/touchid-authentication).
:::

<%= include('./_using-lock-ios-touchid', { language: 'objc' }) %>
