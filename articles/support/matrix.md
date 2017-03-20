---
description: This doc covers what features, platforms, and software configurations Auth0 supports.
toc: true
---

# Auth0 Product Support Matrix

For customers with valid [subscriptions](${manage_url}/#/account/billing/subscription), this article covers the features, platforms, and software configurations that are eligible for Auth0 support.

If you have any questions, please open a ticket in the [Auth0 Support Center](${env.DOMAIN_URL_SUPPORT}).

### On This Page

* [Auth0 Support Coverage](#)
  * [Definitions](#)
* [Support for Browsers and Operating Systems](#)
* [Support for Software Development Kits (SDKs) and Libraries](#)
* [Support for Quickstarts and Samples](#)

## Auth0 Support Coverage

Official support provided by Auth0 is limited to the languages, platforms, versions, and technologies specifically listed as such on this page. Anything that is *not* listed, or listed as **community-supported**, is ineligible for Auth0 support.

In the event that you have questions involving unsupported items, you may:

* Post your question on the Auth0 public forum;
* Seek direct assistance by contacting the developers responsible for the items (such as specific libraries or software development kits (SDKs).

<div class="alert alert-info">
  Auth0 support is limited to the most recent version of the technologies listed (unless otherwise specified). If you are using an older version, please upgrade prior to seeking support.
</div>

### Definitions

Throughout this article, we will use the following terms to indicate the varying levels of support Auth0 will provide.

<table class="table">
  <tr>
    <th>Quickstarts/Docs Provided</th>
    <td>The Auth0 Developer Success Engineering (DSE) team will support these items, and bugs will be fixed.</td>
  </tr>
  <tr>
    <th>Certified</th>
    <td>Auth0 has formally tested, will support, and provide bug fixes (if applicable) for these items.</td>
  </tr>
  <tr>
    <th>Bug Fixes</th>
    <td>Auth0 has <i>not</i> formally tested, but will support and provide bug fixes (if applicable) these items.</td>
  </tr>
  <tr>
    <th>Best Effort</th>
    <td>Auth0 may provide assistance if the appropriate resources are available.</td>
  </tr>
  <tr>
    <th>Community</th>
    <td>Auth0 does <i>not</i> support these items, and all assistance regarding these items will come from the general community.</td>
  </tr>
</table>

## Browsers

This section covers the browsers that Auth0 will support when using the Auth0 Dashboard or Lock Library, or executing authentication transactions.

### Auth0 Dashboard

The following matrix lists the level of support Auth0 will provide with regards to the Internet browser you have chosen when using the [Auth0 Dashboard](${manage_url}).

<div class="alert alert-info">
  At this time, Auth0 only supports use of the Dashboard with non-mobile browsers.
</div>

<table class = "table">
  <tr>
    <td>Apple Safari</td>
    <td>Bug Fixes</td>
  </tr>
  <tr>
    <td>Google Chrome</td>
    <td>Certified</td>
  </tr>
  <tr>
    <td>Microsoft Internet Explorer</td>
    <td>Not Supported</td>
  </tr>
  <tr>
    <td>Microsoft Edge</td>
    <td>Not Supported</td>
  </tr>
  <tr>
    <td>Mozilla Firefox</td>
    <td>Bug Fixes</td>
  </tr>
</table>

### Auth0 Lock and Authentication

The following matrix lists the level of support Auth0 will provide with regards to the Internet browser you have chosen when you are:

* Using [Lock](/libraries/lock);
* Performing authentication transactions.

#### Non-Mobile Browsers

<table class = "table">
  <tr>
    <td>Apple Safari</td>
    <td>Bug Fixes</td>
  </tr>
  <tr>
    <td>Google Chrome</td>
    <td>Certified</td>
  </tr>
  <tr>
    <td>Microsoft Internet Explorer</td>
    <td>Bug Fixes for Version 10 (or later)</td>
  </tr>
  <tr>
    <td>Microsoft Edge</td>
    <td>Not Supported</td>
  </tr>
  <tr>
    <td>Mozilla Firefox</td>
    <td>Bug Fixes</td>
  </tr>
</table>

#### Mobile Browsers

<table class = "table">
  <tr>
    <td>Apple Safari for iOS 9 (or later)</td>
    <td>Certified</td>
  </tr>
  <tr>
    <td>Google Chrome for Android Kit Kit (4.4) or later</td>
    <td>Certified</td>
  </tr>
</table>

## Operating Systems

This section covers the operating systems that Auth0 will support when using the Auth0 Dashboard or Lock Library, or executing authentication transactions.

### Auth0 Dashboard

The following matrix lists the level of support Auth0 will provide with regards to the operating system you have chosen when using the [Auth0 Dashboard](${manage_url}).

<table class="table">
  <tr>
    <td>Apple MacOS (when using Google Chrome as your browser)</td>
    <td>Certified</td>
  </tr>
  <tr>
    <td>Apple MacOS (when using any browser besides Google Chrome)</td>
    <td>Bug Fixes</td>
  </tr>
  <tr>
    <td>Linux (Ubuntu)</td>
    <td>Bug Fixes</td>
  </tr>
  <tr>
    <td>Microsoft Windows</td>
    <td>Bug Fixes</td>
  </tr>
</table>

### Auth0 Lock and Authentication

The following matrix lists the level of support Auth0 will provide with regards to the operating system you have chosen when you are:

* Using [Lock](/libraries/lock);
* Performing authentication transactions.

#### Non-Mobile Operating Systems

<table class="table">
<tr>
  <td>Apple MacOS El Capitan (or later)</td>
  <td>Certified</td>
</tr>
<tr>
  <td>Linux (Ubuntu)</td>
  <td>Bug Fixes</td>
</tr>
<tr>
  <td>Linux (non-Ubuntu)</td>
  <td>Best Effort</td>
</tr>
<tr>
  <td>Microsoft Windows 8/10</td>
  <td>Bug Fixes</td>
</tr>
</table>

#### Mobile Operating Systems

<table class="table">
<tr>
  <td>Apple iOS 9 (or later)</td>
  <td>Certified</td>
</tr>
<tr>
  <td>Google Android Kit Kat (4.4) or later</td>
  <td>Certified</td>
</tr>
</table>

## Software Development Kits (SDKs) and Libraries

### Definitions

In this section covering SDKs and Libraries, we will use the following terms to indicate the varying levels of support Auth0 will provide.

<table class="table">
  <tr>
    <th>Quickstarts</th>
    <td>Covers core use cases; fully supported</td>
  </tr>
  <tr>
    <th>Certified</th>
    <td>Tested and fully supported</td>
  </tr>
  <tr>
    <th>Features</th>
    <td>May receive new features</td>
  </tr>
  <tr>
    <th>Bug Fixes</th>
    <td>May receive bug fixes</td>
  </tr>
<table>

### Lock

<table class="table">
  <tr>
    <th>Library</th>
    <th>Certified</th>
    <th>Features</th>
    <th>Bug Fixes</th>
  </tr>
  <tr>
    <td>Lock.js</td>
    <td>v10</td>
    <td>v10</td>
    <td>v9</td>
  </tr>
  <tr>
    <td>Lock.swift</td>
    <td>v2</td>
    <td>v2</td>
    <td></td>
  </tr>
  <tr>
    <td>Lock.iOS-macOS</td>
    <td></td>
    <td></td>
    <td>v1</td>
  </tr>
  <tr>
    <td>Lock.Android</td>
    <td>v2</td>
    <td>v2</td>
    <td>v1</td>
  </tr>
</table>


### Software Development Kits (SDKS)

<table class="table">
  <tr>
    <th>SDK</th>
    <th>Certified</th>
    <th>Features</th>
    <th>Bug Fixes</th>
  </tr>
  <tr>
    <td>auth0.js</td>
    <td>v7, v8</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Auth0.Android</td>
    <td></td>
    <td>v1</td>
    <td></td>
  </tr>
  <tr>
    <td>Auth0.Swift</td>
    <td></td>
    <td>v1</td>
    <td></td>
  </tr>
  <tr>
    <td>Auth0.net</td>
    <td></td>
    <td>v3, v4</td>
    <td></td>
  </tr>
  <tr>
    <td>Auth0-java</td>
    <td></td>
    <td>v1</td>
    <td></td>
  </tr>
  <tr>
    <td>node-auth0</td>
    <td></td>
    <td>v2</td>
    <td></td>
  </tr>
</table>

### Frameworks/Platform Integration SDKs

<table class="table">
  <tr>
    <th>SDK</th>
    <th>Certified</th>
    <th>Features</th>
    <th>Bug Fixes</th>
  </tr>
  <tr>
    <td>angular-auth0</td>
    <td>X</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>angular-lock</td>
    <td>X</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>auth0-servlet</td>
    <td></td>
    <td></td>
    <td>v3</td>
  </tr>
  <tr>
    <td>auth0-spring-mvc</td>
    <td></td>
    <td></td>
    <td>v1</td>
  </tr>
  <tr>
    <td>auth0-spring-security-mvc</td>
    <td></td>
    <td></td>
    <td>v1</td>
  </tr>
  <tr>
    <td>auth0-spring-security-api</td>
    <td></td>
    <td>v1</td>
    <td></td>
  </tr>
  <tr>
    <td>auth0-aspnet-owin</td>
    <td></td>
    <td>v1</td>
    <td></td>
  </tr>
  <tr>
    <td>auth0-aspnet</td>
    <td></td>
    <td>v1</td>
    <td></td>
  </tr>
  <tr>
    <td>Auth0.Windows.UWP</td>
    <td></td>
    <td></td>
    <td>v0</td>
  </tr>
  <tr>
    <td>Auth0.WinformsWPF</td>
    <td></td>
    <td></td>
    <td>v0</td>
  </tr>
  <tr>
    <td>auth0-oidc-client-net</td>
    <td></td>
    <td>v1</td>
    <td></td>
  </tr>
</table>

## Quickstarts and Samples

<table class="table">
  <tr>
    <th></th>
    <th>Quickstart Provided + Auth0 Support</th>
    <th>Bug Fixes Provided</th>
    <th>Community Support Only</th>
  </tr>
  <tr>
    <td>Android</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Chrome Extension</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>Cordova</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>Electron</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Ionic</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Ionic 2</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>macOS - Objective-C</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>macOS - Swift</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>React Native - Android</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>React Native - macOS</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Phonegap</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>Windows Universal App C#</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>Windows Universal App JavaScript</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>Windows Phone</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>WPF/Winforms</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
</table>

## Single Page Applications

<table class="table">
  <tr>
    <th></th>
    <th>Quickstart + Auth0 Support</th>
    <th>Bug Fixes Provided</th>
    <th>Community Support Only</th>
  </tr>
  <tr>
    <td>Angular 1.x</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Angular 2</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Aurelia</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>Cycle.js</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>Ember</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>JavaScript</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>jQuery</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>React</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Socket.io</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Vue.js</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
</table>

## Regular Web Applications

<table class="table">
  <tr>
    <th></th>
    <th>Quickstart + Auth0 Support</th>
    <th>Bug Fixes Provided</th>
    <th>Community Support Only</th>
  </tr>
  <tr>
    <td>Apache</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>ASP Classic</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>ASP.NET (OWIN)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>ASP.NET (System.Web)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>ASP.NET Core</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Go</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Java</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Java Spring MVC</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Java Spring Security</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>NancyFX</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>Node.js</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>PHP</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>PHP (Laravel)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>PHP (Symfony)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Play 2 Scala</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Python</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Ruby on Rails</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>ServiceStack</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
</table>

## Backends/APIs
<table class="table">
  <tr>
    <th></th>
    <th>Quickstart + Auth0 Support</th>
    <th>Bug Fixes</th>
    <th>Community Support Only</th>
  </tr>
  <tr>
    <td>.NET WCF</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>ASP.NET Core Web API</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>ASP.NET Web API (OWIN)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>ASP.NET Web API (System.Web)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Falcor</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>Go</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Hapi.js</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Java Spring Security</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Nginx</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>Node.js (Express)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>PHP</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>PHP (Laravel)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>PHP (Symfony)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Python</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Relay</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>Ruby</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>Ruby on Rails</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
</table>
