---
section: libraries
classes: topic-page
title: Auth0 Libraries
description: Auth0 Libraries - helping you implement Auth0 with simple efficiency
url: /libraries
---
<!-- markdownlint-disable MD041 MD002 MD026 -->
<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>Auth0 Libraries</h1>
  <p>
    There are several widgets and SDKs available for developers to provide a frictionless, simple experience when using Auth0. Take a look below to find documentation on the tools that you need to get started!
  </p>
</div>

## How Should You Implement Auth0?

When adding Auth0 to your web apps, the best solution is to use Auth0's [Hosted Login Page](/hosted-pages/login). Using the Hosted Login Page is an incredibly simple process, and prevents the dangers of cross-origin authentication. The Hosted Login Page uses the Lock Widget to allow your userse to authenticate, by default, but also has templates for Lock Passwordless and for a custom UI built with Auth0.js SDK. You can customize the page in the [Hosted Pages Editor](${manage_url}/#/login_page), and use any of the following to implement your auth needs. 

- [Lock](#lock-login-signup-widgets) is a drop-in authentication widget that provides a standard set of behaviors and a customizable user interface. 
- [Auth0 SDKs](#auth0-client-side-sdks) are client-side libraries that *do not* come with a user interface - you use your own. These allow for expanded customization of the behavior and appearance of the login process. 
- The [Authentication API](/api-auth) provides integration without requiring the use of Auth0 libraries. 

The best option to choose will depend on the needs of your app. Check out the [When to Use Lock](/libraries/when-to-use-lock) page for more information to help you decide.

## Lock - Login/Signup Widgets

The Lock widget is a simple way to integrate Auth0 into existing projects and provide the frictionless login and signup experience that you want for your app. Lock provides a customizable UI for your users to use to authenticate with your app.

<%= include('../_includes/_topic-links', { links: [
  'libraries/lock/v10',
  'libraries/lock-ios/v2',
  'libraries/lock-android'
] }) %>

## Auth0 SDKs

These SDKs for Auth0 allow you to trigger the authentication process, parse JWTs, and authenticate requests to your APIs. There is no UI or login widget provided alongside the SDKs; they are for implementation alongside a custom UI. For a complete listing of supported SDKs, along with links to their GitHub repositories, take a look at the Auth0 [Support Matrix](/support/matrix#sdks). For more detailed documentation on our most popular SDKs, take a look below:

<%= include('../_includes/_topic-links', { links: [
  'libraries/auth0js/v8',
  'libraries/auth0-swift',
  'libraries/auth0-android'
] }) %>
