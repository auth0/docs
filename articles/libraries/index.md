---
section: libraries
classes: topic-page
title: Auth0 Libraries
url: /libraries
description: Auth0 Libraries - helping you implement Auth0 with simple efficiency
---

<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>Auth0 Libraries</h1>
  <p>
    There are several widgets and SDKs available for developers to provide a frictionless, simple experience when using Auth0. Take a look below to find documentation on the tools that you need to get started!
  </p>
</div>

## How Should You Implement Auth0?

When adding Auth0 to your web apps, the best solution is to use Auth0's [Hosted Login Page](/hosted-pages/login). Using the Hosted Login Page is a simple process, and prevents the pitfalls of [cross-origin authentication](/cross-origin-authentication). The Hosted Login Page uses by default the Lock Widget to authenticate users, but there is also a template for Lock Passwordless and a template for a custom UI built with the Auth0.js SDK available. 

You can customize the page in the [Hosted Pages Editor](${manage_url}/#/login_page).

If the Hosted Login Page does not meet your requirements, however, Auth0 has a variety of options which can be embedded in your applications to assist with authentication.

* [Lock](#lock-login-signup-widgets) is a drop-in authentication widget that provides a standard set of behaviors and a customizable user interface.
* [Auth0 SDKs](#auth0-sdks) are client-side libraries that *do not* come with a user interface. These allow for expanded customization of the behavior and appearance of the login process.
* The [Authentication API](/api-auth) can be used to integrate applications with Auth0 without requiring the use of Auth0's libraries.

The best option to choose will depend on the needs of your app. Check out [When to Use Lock](/libraries/when-to-use-lock) for more information to help you decide between using Lock or an SDK.

## Lock

The Lock widget is a simple way to integrate Auth0 into existing projects and provide the frictionless login and signup experience that you want for your app. Lock gives your users a customizable UI to authenticate with which to authenticate in your app.

The Lock widget for each platform has detailed reference documentation.

### Lock Reference Documentation

  <ul class="topic-links">
    <li>
      <i class="icon icon-budicon-715"></i><a href="https://auth0.com/docs/libraries/lock"> Lock for Web</a>
    </li>
    <li>
      <i class="icon icon-budicon-715"></i><a href="https://auth0.com/docs/libraries/lock-ios"> Lock for iOS</a>
    </li>
    <li>
      <i class="icon icon-budicon-715"></i><a href="https://auth0.com/docs/libraries/lock-android"> Lock for Android</a>
    </li>
  </ul>

### Lock Support Table

Below are the GitHub links and support status for the various Lock widgets.

<%= include('../../../_includes/_libraries_support_lock') %>


## Auth0 SDKs

Auth0 SDKs include no UI. Instead, you would use one of these SDKs alongside your custom UI.

### SDK Reference Documentation

The most commonly used SDKs have reference documentation.

  <ul class="topic-links">
    <li>
      <i class="icon icon-budicon-715"></i><a href="https://auth0.com/docs/libraries/auth0js"> Auth0.js</a>
    </li>
    <li>
      <i class="icon icon-budicon-715"></i><a href="https://auth0.com/docs/libraries/auth0-swift"> Auth0.Swift</a>
    </li>
    <li>
      <i class="icon icon-budicon-715"></i><a href="https://auth0.com/docs/libraries/auth0-android"> Auth0.Android</a>
    </li>
    <li>
      <i class="icon icon-budicon-715"></i><a href="https://auth0.github.io/node-auth0/"> Node-Auth0</a>
    </li>
  </ul>

### SDK Support Table

Below are listed all of the SDKs that are available for Auth0, with GitHub links and their support status.

<%= include('../../../_includes/_libraries_support_sdks') %>


### Framework/Platform Integration SDK Support Table

<%= include('../../../_includes/_libraries_support_frameworks') %>


::: note
Auth0 reserves the right to downgrade support for an SDK to Community-Supported at any time.
:::
