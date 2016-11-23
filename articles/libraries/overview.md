---
section: libraries
classes: topic-page
description: Auth0 Libraries - helping you implement Auth0 with simple efficiency
url: /libraries
---

<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>Auth0 Libraries</h1>
  <p>
    There are several libraries and widgets available for developers to provide a frictionless, simple experience when using Auth0. Take a look below to find documentation on the tools that you need to get started!
  </p>
</div>

## How Should You Implement Auth0?

- [Lock](#lock-login-signup-widgets) is a drop-in authentication widget that provides a standard set of behaviors and a customizable user interface. 
- [Auth0 Libraries](#auth0-client-side-libraries) are client-side libraries that *do not* come with a user interface - you use your own. These allow for expanded customization of the behavior and appearance of the login process. 
- The [Authentication API](/api-auth) provides integration without requiring the use of Auth0 libraries. 

The best option to choose will depend on the needs of your app. Check out the [When to Use Lock](/libraries/when-to-use-lock) page for more information to help you decide.

## Lock - Login/Signup Widgets

The Lock widget is a simple way to integrate Auth0 into existing projects and provide the frictionless login and signup experience that you want for your app. Lock provides a customizable UI for your users to use to authenticate with your app.

<%= include('../_includes/_topic-links', { links: [
  'libraries/lock',
  'libraries/lock-ios',
  'libraries/lock-android'
] }) %>

## Auth0 Client-side Libraries

These client-side libraries for Auth0 allow you to trigger the authentication process, parse JWTs, and authenticate requests to your APIs. There is no UI or widget provided, so these libraries are for use when you need to implement a custom UI, or already have one that you'd like to integrate Auth0 into.

<%= include('../_includes/_topic-links', { links: [
  'libraries/auth0js',
  'libraries/auth0-swift',
  'libraries/auth0-android'
] }) %>