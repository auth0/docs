---
section: libraries
classes: topic-page
title: Auth0 Libraries
description: Auth0 Libraries and SDKs overview
topics:
  - libraries
  - lock
  - auth0js
contentType: 
    - index
    - concept
    - reference
---

<div class="topic-page-header">
<div data-name="example" class="topic-page-badge"></div>
<h1>Auth0 Libraries</h1>
<p>
  There are several widgets and SDKs available to provide a frictionless simple experience when using Auth0. Take a look below to find documentation for the tools that you need to get started!
</p>
</div>

<%= include('../_includes/_lock_auth0js_deprecations_notice') %>

## Options for adding Auth0 to your web applications

You can use Auth0 [Universal Login](/hosted-pages/login) to add Auth0 to your web apps to prevent the pitfalls of [cross-origin authentication](/cross-origin-authentication). The login page uses the Lock widget by default to authenticate users. There are also templates for Lock Passwordless and for a custom UI built with the Auth0.js SDK available. You can customize the page in the [Hosted Pages Editor](${manage_url}/#/login_page).

If Universal Login does not meet your requirements, Auth0 also provides other options to assist with authentication.

* [Lock](#lock) is a drop-in authentication widget that provides a standard set of behaviors and a customizable user interface.
* [Auth0 SDKs](#auth0-sdks) are client-side libraries that do not come with a user interface. These allow for expanded customization to the behavior and appearance of the login process.
* [Authentication API](/api/authentication) allows you to integrate applications with Auth0 without using the Auth0 libraries.

The best option to choose will depend on the needs of your app. Check out [When to Use Lock](/libraries/when-to-use-lock) for more information to help you decide between using Lock or an SDK.

## Lock

The Lock widget is a simple way to integrate Auth0 into existing projects and provide a frictionless login and signup experience for your application. Lock provides your users with a customizable UI with which to authenticate within your application.

### Lock documentation

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

### Lock links and support status

<%= include('../_includes/_libraries_support_lock') %>

## Auth0 SDKs

Auth0 SDKs do not include a UI. Use an SDK with your custom UI.

### SDK documentation

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

### SDK links and support status

<%= include('../_includes/_libraries_support_sdks') %>

### Framework/Platform integration SDK support status

<%= include('../_includes/_libraries_support_frameworks') %>

::: note
Auth0 reserves the right to downgrade support for an SDK to community-supported at any time.
:::
