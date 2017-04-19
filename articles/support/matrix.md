---
title: Auth0 Product Support Matrix
description: This doc covers what features, platforms, and software configurations Auth0 supports.
toc: true
---

# Auth0 Product Support Matrix

For customers with valid [subscriptions](${manage_url}/#/account/billing/subscription), this article covers the features, platforms, and software configurations that are eligible for Auth0 support.

Auth0 provides support in alignment with the [Terms of Service](https://auth0.com/terms) and Pricing and Support plans.

## Auth0 Support Coverage

Official support provided by Auth0 is limited to the languages, platforms, versions, and technologies specifically listed as such on this page. Anything that is *not* listed, or listed as **community-supported**, is ineligible for Auth0 support.

In the event that you have questions involving unsupported items, you may post your question on the [Auth0 public forum](https://community.auth0.com/).

For community-supported items, you can seek assistance by contacting the developers responsible for those items (such as submitting issues on the GitHub repositories for the specific libraries or software development kits (SDKs)).

<div class="alert alert-info">Auth0 support is limited to the most recent version of the technologies listed (unless otherwise specified). If you are using an older version, you will be required to upgrade prior to seeking support.
</div>

### Definitions

Throughout this article, we will use the following terms to indicate the varying levels of support Auth0 will provide.

<table class="table">
  <thead>
    <tr>
      <th width="30%">Label</th>
      <th width="70%">Description</th>
    </tr>
  <thead>
  <tbody>
    <tr>
      <td><div class="label label-primary">Supported</div></td>
      <td>Auth0 has formally tested, will support, and provide both new features and bug fixes (if applicable) for these items.</td>
    </tr>
    <tr>
      <td><div class="label label-warning">Sustained</div></td>
      <td>Auth0 will support and may provide bug fixes (if applicable) for these items.</td>
    </tr>
    <tr>
      <td><div class="label label-default">Community Supported</div></td>
      <td>Auth0 does <i>not</i> support these items, and all assistance regarding these items will come from the general community.</td>
    </tr>
  </tbody>
</table>

## Browsers

This section covers the browsers that Auth0 will support when using the Auth0 Dashboard or Lock Library, or executing authentication transactions.

### Auth0 Dashboard

The following matrix lists the level of support Auth0 will provide with regards to the Internet browser you have chosen when using the [Auth0 Dashboard](${manage_url}).

<table class="table">
  <thead>
    <tr>
      <th width="80%">Browser</th>
      <th width="20%">Level of Support</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Apple Safari</td>
      <td><div class="label label-warning">Sustained</div></td>
    </tr>
    <tr>
      <td>Google Chrome</td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td>Microsoft Internet Explorer 11</td>
      <td><div class="label label-warning">Sustained</div></td>
    </tr>
    <tr>
      <td>Microsoft Edge</td>
      <td><div class="label label-warning">Sustained</div></td>
    </tr>
    <tr>
      <td>Mozilla Firefox</td>
      <td><div class="label label-warning">Sustained</div></td>
    </tr>
  </tbody>
</table>

<div class="alert alert-info">
  At this time, Auth0 only supports use of the Dashboard with desktop browsers.
</div>

### Auth0 Lock and Authentication

The following matrix lists the level of support Auth0 will provide with regards to the Internet browser you have chosen when you are:

* Using [Lock](/libraries/lock);
* Performing authentication transactions.

#### Desktop Browsers

<table class="table">
  <thead>
    <tr>
      <th width="80%">Browser</th>
      <th width="20%">Level of Support</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Apple Safari</td>
      <td><div class="label label-warning">Sustained</div></td>
    </tr>
    <tr>
      <td>Google Chrome</td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td>Microsoft Internet Explorer 10/11</td>
      <td><div class="label label-warning">Sustained</div></td>
    </tr>
    <tr>
      <td>Microsoft Edge</td>
      <td><div class="label label-warning">Sustained</div></td>
    </tr>
    <tr>
      <td>Mozilla Firefox</td>
      <td><div class="label label-warning">Sustained</div></td>
    </tr>
  </tbody>
</table>

#### Mobile Browsers

<table class="table">
  <thead>
    <tr>
      <th width="80%">Mobile browser</th>
      <th width="20%">Level of Support</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Apple Safari for iOS 9 (or later)</td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td>Google Chrome for Android KitKit (4.4) or later</td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
  </tbody>
</table>

## Operating Systems

This section covers the operating systems (OS) that Auth0 will support when using the Auth0 Dashboard or Lock Library, or executing authentication transactions.

<div class="alert alert-info">
  Auth0 support for the Dashboard and Lock and Authentication is limited to the most recent version of the operating systems listed (unless otherwise specified). If you are using an older version, please upgrade prior to seeking support.
</div>

### Auth0 Dashboard

The following matrix lists the level of support Auth0 will provide with regards to the operating system you have chosen when using the [Auth0 Dashboard](${manage_url}).

<table class="table">
  <thead>
    <tr>
      <th width="80%">OS</th>
      <th width="20%">Level of Support</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Apple MacOS (when using Google Chrome as your browser)</td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td>Apple MacOS (when using any browser besides Google Chrome)</td>
      <td><div class="label label-warning">Sustained</div></td>
    </tr>
    <tr>
      <td>Linux (Ubuntu)</td>
      <td><div class="label label-warning">Sustained</div></td>
    </tr>
    <tr>
      <td>Microsoft Windows</td>
      <td><div class="label label-warning">Sustained</div></td>
    </tr>
  </tbody>
</table>

### Auth0 Lock and Authentication

The following matrix lists the level of support Auth0 will provide with regards to the operating system you have chosen when you are:

* Using [Lock](/libraries/lock);
* Performing authentication transactions.

#### Mobile Operating Systems

<table class="table">
  <thead>
    <tr>
      <th width="80%">OS</th>
      <th width="20%">Level of Support</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Apple iOS 9 (or later)</td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td>Google Android KitKat (4.4) or later</td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
  </tbody>
</table>

## Software Development Kits (SDKs) and Libraries

### Support Level Definitions

In this section covering SDKs and Libraries, we will use the following terms to indicate the varying levels of support Auth0 will provide.

<table class="table">
  <tr>
    <th>Supported</th>
    <td>Tested; receives features updates and bug fixes</td>
  </tr>
  <tr>
    <th>Bug Fixes</th>
    <td>May receive bug fixes</td>
  </tr>
<table>

### Lock

<table class="table">
  <tr>
    <td></td>
    <td colspan="2"><a href="#support-level-definitions">Level of Support</a></td>
  </tr>
  <tr>
    <th>Library</th>
    <th>Supported</th>
    <th>Bug Fixes</th>
  </tr>
  <tr>
    <td>Lock.js</td>
    <td>v10</td>
    <td>v9</td>
  </tr>
  <tr>
    <td>Lock.swift</td>
    <td>v2</td>
    <td></td>
  </tr>
  <tr>
    <td>Lock.iOS-macOS</td>
    <td></td>
    <td>v1</td>
  </tr>
  <tr>
    <td>Lock.Android</td>
    <td>v2</td>
    <td>v1</td>
  </tr>
</table>


### Software Development Kits (SDKs)

<table class="table">
  <tr>
    <td></td>
    <td colspan="2"><a href="#support-level-definitions">Level of Support</a></td>
  </tr>
  <tr>
    <th>SDK</th>
    <th>Supported</th>
    <th>Bug Fixes</th>
  </tr>
  <tr>
    <td>auth0.js</td>
    <td>v7, v8</td>
    <td></td>
  </tr>
  <tr>
    <td>Auth0.Android</td>
    <td>v1</td>
    <td></td>
  </tr>
  <tr>
    <td>Auth0.Swift</td>
    <td>v1</td>
    <td></td>
  </tr>
  <tr>
    <td>Auth0.net</td>
    <td>v3, v4</td>
    <td></td>
  </tr>
  <tr>
    <td>Auth0-java</td>
    <td>v1</td>
    <td></td>
  </tr>
  <tr>
    <td>node-auth0</td>
    <td>v2</td>
    <td></td>
  </tr>
</table>

### Frameworks/Platform Integration SDKs

<div class="alert alert-info">
  Auth0 reserves the right to downgrade support for an SDK to Community-Supported at any time.
</div>

<table class="table">
  <tr>
    <td></td>
    <td colspan="3"><a href="#support-level-definitions">Level of Support</a></td>
  </tr>
  <tr>
    <th>SDK</th>
    <th>Supported</th>
    <th>Community-Supported</th>
  </tr>
  <tr>
    <td>angular-auth0</td>
    <td>v2</td>
    <td></td>
  </tr>
  <tr>
    <td>angular-lock</td>
    <td>v2</td>
    <td></td>
  </tr>
  <tr>
    <td>auth0-servlet</td>
    <td>v3</td>
    <td></td>
  </tr>
  <tr>
    <td>auth0-spring-mvc</td>
    <td>v1</td>
    <td></td>
  </tr>
  <tr>
    <td>auth0-spring-security-mvc</td>
    <td>v1</td>
    <td></td>
  </tr>
  <tr>
    <td>auth0-spring-security-api</td>
    <td>v1</td>
    <td></td>
  </tr>
  <tr>
    <td>auth0-aspnet-owin</td>
    <td>v2</td>
    <td></td>
  </tr>
  <tr>
    <td>auth0-aspnet</td>
    <td>v1</td>
    <td></td>
  </tr>
  <tr>
    <td>Auth0.Windows.UWP</td>
    <td></td>
    <td>v1</td>
  </tr>
  <tr>
    <td>Auth0.WinformsWPF</td>
    <td></td>
    <td>v0.9</td>
  </tr>
  <tr>
    <td>auth0-oidc-client-net</td>
    <td>v1</td>
    <td></td>
  </tr>
</table>

## Quickstarts and Samples

### Mobile/Native Applications

<table class="table">
  <tr>
    <td></td>
    <td colspan="3"><a href="#support-level-definitions">Level of Support</a></td>
  </tr>
  <tr>
    <th></th>
    <th>Auth0 Supported</th>
    <th>Community Support Only</th>
  </tr>
  <tr>
    <td><a href="/quickstart/native/android">Android</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/native/chrome">Chrome Extension</a></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td><a href="/quickstart/native/cordova">Cordova</a></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td><a href="/quickstart/native/electron">Electron</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/native/ionic">Ionic</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/native/ionic2">Ionic 2</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/native/ios-objc">iOS - Objective-C</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/native/ios-swift">iOS - Swift</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/native/phonegap">Phonegap</a></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td><a href="/quickstart/native/react-native-android">React Native - Android</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/native/react-native-ios">React Native - iOS</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/native/windows-uwp-csharp">Windows Universal App C#</a></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td><a href="/quickstart/native/windows-uwp-javascript">Windows Universal App JavaScript</a></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td><a href="/quickstart/native/windowsphone">Windows Phone</a></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td><a href="/quickstart/native/wpf-winforms">WPF/Winforms</a></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td><a href="/quickstart/native/xamarin">Xamarin</a></td>
    <td></td>
    <td>X</td>
  </tr>
</table>

### Single Page Applications

<table class="table">
  <tr>
    <td></td>
    <td colspan="2"><a href="#support-level-definitions">Level of Support</a></td>
  </tr>
  <tr>
    <th></th>
    <th>Auth0 Supported</th>
    <th>Community Support Only</th>
  </tr>
  <tr>
    <td><a href="/quickstart/spa/angularjs">Angular 1.x</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/spa/angular2">Angular 2</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/spa/aurelia">Aurelia</a></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td><a href="/quickstart/spa/cyclejs">Cycle.js</a></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td><a href="/quickstart/spa/emberjs">Ember</a></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td><a href="/quickstart/spa/vanilla">JavaScript</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/spa/jquery">jQuery</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/spa/react">React</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/spa/socket-io">Socket.io</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/spa/vuejs">Vue.js</a></td>
    <td>X</td>
    <td></td>
  </tr>
</table>

### Regular Web Applications

<table class="table">
  <tr>
    <td></td>
    <td colspan="2"><a href="#support-level-definitions">Level of Support</a></td>
  </tr>
  <tr>
    <th></th>
    <th>Auth0 Supported</th>
    <th>Community Support Only</th>
  </tr>
  <tr>
    <td><a href="/quickstart/webapp/apache">Apache</a></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td><a href="/quickstart/webapp/asp-classic">ASP Classic</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/webapp/aspnet-owin">ASP.NET (OWIN)</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/webapp/aspnet">ASP.NET (System.Web)</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/webapp/aspnet-core">ASP.NET Core</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/webapp/golang">Go</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/webapp/java">Java</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/webapp/java-spring-mvc">Java Spring MVC</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/webapp/java-spring-security-mvc">Java Spring Security</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/webapp/nancyfx">NancyFX</a></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td><a href="/quickstart/webapp/nodejs">Node.js</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/webapp/php">PHP</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/webapp/laravel">PHP (Laravel)</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/webapp/symfony">PHP (Symfony)</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/webapp/scala">Play 2 Scala</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/webapp/python">Python</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/webapp/rails">Ruby on Rails</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/webapp/servicestack">ServiceStack</a></td>
    <td></td>
    <td>X</td>
  </tr>
</table>

### Backends/APIs
<table class="table">
  <tr>
    <td></td>
    <td colspan="2"><a href="#support-level-definitions">Level of Support</a></td>
  </tr>
  <tr>
    <th></th>
    <th>Auth0 Supported</th>
    <th>Community Support Only</th>
  </tr>
  <tr>
    <td><a href="/quickstart/backend/aspnet-core-webapi">ASP.NET Core Web API</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/backend/webapi-owin">ASP.NET Web API (OWIN)</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/backend/falcor">Falcor</a></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td><a href="/quickstart/backend/golang">Go</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/backend/hapi">Hapi.js</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/backend/java-spring-security">Java Spring Security</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/backend/nginx">Nginx</a></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td><a href="/quickstart/backend/nodejs">Node.js (Express)</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/backend/php">PHP</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/backend/php-laravel">PHP (Laravel)</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/backend/php-symfony">PHP (Symfony)</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/backend/python">Python</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/backend/relay">Relay</a></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td><a href="/quickstart/backend/ruby">Ruby</a></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/quickstart/backend/rails">Ruby on Rails</a></td>
    <td>X</td>
    <td></td>
  </tr>
</table>
