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

When adding Auth0 to your web apps, the best solution is to use Auth0's [Hosted Login Page](/hosted-pages/login). Using the Hosted Login Page is a simple process, and prevents the pitfalls of [cross-origin authentication](/cross-origin-authentication). The Hosted Login Page uses by default the Lock Widget to authenticate users, but you can also find templates for Lock Passwordless and for a custom UI built with the Auth0.js SDK. 

You can customize the page in the [Hosted Pages Editor](${manage_url}/#/login_page).

If the Hosted Login Page does not meet your requirements, however, Auth0 has a variety of options which can be embedded in your applications to assist with authentication.

* [Lock](#lock-login-signup-widgets) is a drop-in authentication widget that provides a standard set of behaviors and a customizable user interface.
* [Auth0 SDKs](#auth0-sdks) are client-side libraries that *do not* come with a user interface. These allow for expanded customization of the behavior and appearance of the login process.
* The [Authentication API](/api-auth) provides integration with Auth0 without requiring the use of Auth0 libraries.

The best option to choose will depend on the needs of your app. Check out [When to Use Lock](/libraries/when-to-use-lock) for more information to help you decide between using Lock or an SDK.

## Lock

The Lock widget is a simple way to integrate Auth0 into existing projects and provide the frictionless login and signup experience that you want for your app. Lock provides a customizable UI for your users to use to authenticate with your app.

The Lock widget for each platform has detailed reference documentation.

### Lock Reference Documentation

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="https://auth0.com/docs/libraries/lock">Lock for Web</a>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="https://auth0.com/docs/libraries/lock-ios">Lock for iOS</a>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="https://auth0.com/docs/libraries/lock-android">Lock for Android</a>
  </li>
</ul>

### Lock Support Table

Below are the GitHub links and support status for the various Lock widgets.

  <table class="table">
    <thead>
      <tr>
        <th width="25%">Library</th>
        <th width="55%">Version</th>
        <th width="20%">Level of Support</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="https://github.com/auth0/lock">Lock.js</a></td>
        <td>v10</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr class="light-top-border">
        <td></td>
        <td>v9</td>
        <td><div class="label label-warning">Bug fixes</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/Lock.Android">Lock.Android</a></td>
        <td>v2</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr class="light-top-border">
        <td></td>
        <td>v1</td>
        <td><div class="label label-warning">Bug fixes</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/Lock.swift">Lock for iOS v2</a></td>
        <td>v2</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/Lock.swift/tree/v1">Lock for iOS v1</a></td>
        <td>v1</td>
        <td><div class="label label-warning">Bug fixes</div></td>
      </tr>
    </tbody>
  </table>

## Auth0 SDKs

Auth0 SDKs include no UI. Instead, you would use one of these SDKs alongside your custom UI.

### SDK Reference Documentation

The most commonly used SDKs have reference documentation.

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="https://auth0.com/docs/libraries/auth0js">Auth0.js</a>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="https://auth0.com/docs/libraries/auth0-swift">Auth0.Swift</a>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="https://auth0.com/docs/libraries/auth0-android">Auth0.Android</a>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="https://auth0.github.io/node-auth0/">Node-Auth0</a>
  </li>
</ul>

### SDK Support Table

Below are listed all of the SDKs that are available for Auth0, with GitHub links and their support status.

  <table class="table">
    <thead>
      <tr>
        <th width="25%">SDK</th>
        <th width="55%">Version</th>
        <th width="20%">Level of Support</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="https://github.com/auth0/auth0.js">Auth0.js</a></td>
        <td>v8</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr class="light-top-border">
        <td></td>
        <td>v7</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/Auth0.Android">Auth0 Android</a></td>
        <td>v1</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/Auth0.Swift">Auth0 Swift</a></td>
        <td>v1</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/Auth0.net">Auth0 .NET</a></td>
        <td>v4</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr class="light-top-border">
        <td></td>
        <td>v3</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/Auth0-java">Auth0 Java</a></td>
        <td>v1</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/node-auth0">Auth0 Node</a></td>
        <td>v2</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/auth0-python">Auth0 Python</a></td>
        <td>v2</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/auth0-php">Auth0 PHP</a></td>
        <td>v5</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
    </tbody>
  </table>

### Framework/Platform Integration SDK Support Table

  <table class="table">
    <thead>
      <tr>
        <th width="25%">SDK</th>
        <th width="55%">Version</th>
        <th width="20%">Level of Support</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="https://github.com/auth0/angular-auth0">Angular Auth0</a></td>
        <td>v2</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/angular-lock">Angular Lock</a></td>
        <td>v2</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/auth0-servlet">Auth0 Servlet</a></td>
        <td>v3</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/auth0-spring-mvc">Auth0 Spring MVC</a></td>
        <td>v1</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/auth0-spring-security-mvc">Auth0 Spring Security MVC</a></td>
        <td>v1</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/auth0-spring-security-api">Auth0 Spring Security API</a></td>
        <td>v1</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/auth0-aspnet-owin">Auth0 ASP.NET 4.5 Owin</a></td>
        <td>v2</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/auth0-aspnet">Auth0 ASP.NET</a></td>
        <td>v1</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/auth0-oidc-client-net">OIDC Client for .NET Desktop and Mobile applications</a></td>
        <td>v1</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/jwt-auth-bundle">JWT Auth Bundle</a></td>
        <td>v3</td>
        <td><div class="label label-default">Supported</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/Auth0.Windows.UWP">Auth0 with UWP applications</a></td>
        <td>v1</td>
        <td><div class="label label-default">Community</div></td>
      </tr>
      <tr>
        <td><a href="https://github.com/auth0/Auth0.WinformsWPF">Auth0 auth client for Winforms and WPF</a></td>
        <td>v0.9</td>
        <td><div class="label label-default">Community</div></td>
      </tr>
    </tbody>
  </table>

::: note
Auth0 reserves the right to downgrade support for an SDK to Community-Supported at any time.
:::
