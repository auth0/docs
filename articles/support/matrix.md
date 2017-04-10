---
description: This doc covers what features, platforms, and software configurations Auth0 supports.
toc: true
---

# Auth0 Product Support Matrix

For customers with valid [subscriptions](${manage_url}/#/account/billing/subscription), this article covers the features, platforms, and software configurations that are eligible for Auth0 support.

If you have any questions, please open a ticket in the [Auth0 Support Center](${env.DOMAIN_URL_SUPPORT}).

Auth0 provides support in alignment with the [Terms of Service](https://auth0.com/terms).

### On This Page

* [Auth0 Support Coverage](#auth0-support-coverate)
  * [Definitions](#definitions)
* [Support for Browsers](#browsers)
* [Support for Operating Systems](#operating-systems)
* [Support for Software Development Kits (SDKs) and Libraries](#software-development-kits-sdks-and-libraries)
  * [Lock](#lock)
  * [SDKs](#software-development-kits-sdks-)
  * [Frameworks/Platform Integration SDKs](#frameworks-platform-integration-sdks)
* [Support for Quickstarts and Samples](#quickstarts-and-samples)
  * [Mobile/Native Applications](#mobile-native-applications)
  * [Single Page Applications](#single-page-applications)
  * [Regular Web Applications](#regular-web-applications)
  * [Backends/APIs](#backends-apis)

## Auth0 Support Coverage

Official support provided by Auth0 is limited to the languages, platforms, versions, and technologies specifically listed as such on this page. Anything that is *not* listed, or listed as **community-supported**, is ineligible for Auth0 support.

In the event that you have questions involving unsupported items, you may post your question on the Auth0 public forum.

For community-supported items, you can seek assistance by contacting the developers responsible for those items (such as submitting issues on the GitHub repositories for the specific libraries or software development kits (SDKs)).

<div class="alert alert-info">
  Auth0 support is limited to the most recent version of the technologies listed (unless otherwise specified). If you are using an older version, you will be required to upgrade prior to seeking support.
</div>

### Definitions

Throughout this article, we will use the following terms to indicate the varying levels of support Auth0 will provide.

<table class="table">
  <tr>
    <th class="text-center">Supported</th>
    <td class="text-center">***</td>
    <td class="text-center">Auth0 has formally tested, will support, and provide both new features and bug fixes (if applicable) for these items.</td>
  </tr>
  <tr>
    <th class="text-center">Sustained</th>
    <td class="text-center">**</td>
    <td class="text-center">Auth0 has <i>not</i> formally tested, but will support and may provide bug fixes (if applicable) for these items.</td>
  </tr>
  <tr>
    <th class="text-center">Community</th>
    <td class="text-center"></td>
    <td class="text-center">Auth0 does <i>not</i> support these items, and all assistance regarding these items will come from the general community.</td>
  </tr>
</table>

## Browsers

This section covers the browsers that Auth0 will support when using the Auth0 Dashboard or Lock Library, or executing authentication transactions.

### Auth0 Dashboard

The following matrix lists the level of support Auth0 will provide with regards to the Internet browser you have chosen when using the [Auth0 Dashboard](${manage_url}).

<div class="alert alert-info">
  At this time, Auth0 only supports use of the Dashboard with desktop browsers.
</div>

<table class = "table">
  <tr>
    <td class="text-center"></td>
    <td class="text-center"><a href="#definitions">Level of Support</a></td>
  </tr>
  <tr>
    <td class="text-center">Apple Safari</td>
    <td class="text-center">**</td>
  </tr>
  <tr>
    <td class="text-center">Google Chrome</td>
    <td class="text-center">***</td>
  </tr>
  <tr>
    <td class="text-center">Microsoft Internet Explorer 11</td>
    <td class="text-center">**</td>
  </tr>
  <tr>
    <td class="text-center">Microsoft Edge</td>
    <td class="text-center">**</td>
  </tr>
  <tr>
    <td class="text-center">Mozilla Firefox</td>
    <td class="text-center">**</td>
  </tr>
</table>

### Auth0 Lock and Authentication

The following matrix lists the level of support Auth0 will provide with regards to the Internet browser you have chosen when you are:

* Using [Lock](/libraries/lock);
* Performing authentication transactions.

#### Desktop Browsers

<table class = "table">
  <tr>
    <td class="text-center"></td>
    <td class="text-center"><a href="#definitions">Level of Support</a></td>
  </tr>
  <tr>
    <td class="text-center">Apple Safari</td>
    <td class="text-center">**</td>
  </tr>
  <tr>
    <td class="text-center">Google Chrome</td>
    <td class="text-center">***</td>
  </tr>
  <tr>
    <td class="text-center">Microsoft Internet Explorer 10/11</td>
    <td class="text-center">**</td>
  </tr>
  <tr>
    <td class="text-center">Microsoft Edge</td>
    <td class="text-center">**</td>
  </tr>
  <tr>
    <td class="text-center">Mozilla Firefox</td>
    <td class="text-center">**</td>
  </tr>
</table>

#### Mobile Browsers

<table class = "table">
  <tr>
    <td class="text-center"></td>
    <td class="text-center"><a href="#definitions">Level of Support</a></td>
  </tr>
  <tr>
    <td class="text-center">Apple Safari for iOS 9 (or later)</td>
    <td class="text-center">***</td>
  </tr>
  <tr>
    <td class="text-center">Google Chrome for Android KitKit (4.4) or later</td>
    <td class="text-center">***</td>
  </tr>
</table>

## Operating Systems

This section covers the operating systems that Auth0 will support when using the Auth0 Dashboard or Lock Library, or executing authentication transactions.

<div class="alert alert-info">
  Auth0 support for the Dashboard and Lock and Authentication is limited to the most recent version of the operating systems listed (unless otherwise specified). If you are using an older version, please upgrade prior to seeking support.
</div>

### Auth0 Dashboard

The following matrix lists the level of support Auth0 will provide with regards to the operating system you have chosen when using the [Auth0 Dashboard](${manage_url}).

<table class="table">
  <tr>
    <td class="text-center"></td>
    <td class="text-center"><a href="#definitions">Level of Support</a></td>
  </tr>
  <tr>
    <td class="text-center">Apple MacOS (when using Google Chrome as your browser)</td>
    <td class="text-center">***</td>
  </tr>
  <tr>
    <td class="text-center">Apple MacOS (when using any browser besides Google Chrome)</td>
    <td class="text-center">**</td>
  </tr>
  <tr>
    <td class="text-center">Linux (Ubuntu)</td>
    <td class="text-center">**</td>
  </tr>
  <tr>
    <td class="text-center">Microsoft Windows</td>
    <td class="text-center">**</td>
  </tr>
</table>

### Auth0 Lock and Authentication

The following matrix lists the level of support Auth0 will provide with regards to the operating system you have chosen when you are:

* Using [Lock](/libraries/lock);
* Performing authentication transactions.

#### Mobile Operating Systems

<table class="table">
  <tr>
    <td class="text-center"></td>
    <td class="text-center"><a href="#definitions">Level of Support</a></td>
  </tr>
  <tr>
    <td class="text-center">Apple iOS 9 (or later)</td>
    <td class="text-center">***</td>
  </tr>
  <tr>
    <td class="text-center">Google Android KitKat (4.4) or later</td>
    <td class="text-center">***</td>
  </tr>
</table>

## Software Development Kits (SDKs) and Libraries

### Support Level Definitions

In this section covering SDKs and Libraries, we will use the following terms to indicate the varying levels of support Auth0 will provide.

<table class="table">
  <tr>
    <th class="text-center">Sustained</th>
    <td class="text-center">Tested; receives features updates and bug fixes</td>
  </tr>
  <tr>
    <th class="text-center">Bug Fixes</th>
    <td class="text-center">May receive bug fixes</td>
  </tr>
<table>

### Lock

<table class="table">
  <tr>
    <td class="text-center"></td>
    <td colspan="2" class="text-center"><a href="#support-level-definitions">Level of Support</a></td>
  </tr>
  <tr>
    <th class="text-center">Library</th>
    <th class="text-center">Sustained</th>
    <th class="text-center">Bug Fixes</th>
  </tr>
  <tr>
    <td class="text-center">Lock.js</td>
    <td class="text-center">v10</td>
    <td class="text-center">v9</td>
  </tr>
  <tr>
    <td class="text-center">Lock.swift</td>
    <td class="text-center">v2</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center">Lock.iOS-macOS</td>
    <td class="text-center"></td>
    <td class="text-center">v1</td>
  </tr>
  <tr>
    <td class="text-center">Lock.Android</td>
    <td class="text-center">v2</td>
    <td class="text-center">v1</td>
  </tr>
</table>


### Software Development Kits (SDKs)

<table class="table">
  <tr>
    <td class="text-center"></td>
    <td colspan="2" class="text-center"><a href="#support-level-definitions">Level of Support</a></td>
  </tr>
  <tr>
    <th class="text-center">SDK</th>
    <th class="text-center">Sustained</th>
    <th class="text-center">Bug Fixes</th>
  </tr>
  <tr>
    <td class="text-center">auth0.js</td>
    <td class="text-center">v7, v8</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center">Auth0.Android</td>
    <td class="text-center">v1</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center">Auth0.Swift</td>
    <td class="text-center">v1</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center">Auth0.net</td>
    <td class="text-center">v3, v4</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center">Auth0-java</td>
    <td class="text-center">v1</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center">node-auth0</td>
    <td class="text-center">v2</td>
    <td class="text-center"></td>
  </tr>
</table>

### Frameworks/Platform Integration SDKs

<div class="alert alert-info">
  Auth0 reserves the right to downgrade support for an SDK to Community-Supported at any time.
</div>

<table class="table">
  <tr>
    <td class="text-center"></td>
    <td colspan="3" class="text-center"><a href="#support-level-definitions">Level of Support</a></td>
  </tr>
  <tr>
    <th class="text-center">SDK</th>
    <th class="text-center">Sustained</th>
    <th class="text-center">Community-Supported</th>
  </tr>
  <tr>
    <td class="text-center">angular-auth0</td>
    <td class="text-center">v2</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center">angular-lock</td>
    <td class="text-center">v2</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center">auth0-servlet</td>
    <td class="text-center">v3</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center">auth0-spring-mvc</td>
    <td class="text-center">v1</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center">auth0-spring-security-mvc</td>
    <td class="text-center">v1</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center">auth0-spring-security-api</td>
    <td class="text-center">v1</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center">auth0-aspnet-owin</td>
    <td class="text-center">v2</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center">auth0-aspnet</td>
    <td class="text-center">v1</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center">Auth0.Windows.UWP</td>
    <td class="text-center"></td>
    <td class="text-center">v1</td>
  </tr>
  <tr>
    <td class="text-center">Auth0.WinformsWPF</td>
    <td class="text-center"></td>
    <td class="text-center">v0.9</td>
  </tr>
  <tr>
    <td class="text-center">auth0-oidc-client-net</td>
    <td class="text-center">v1</td>
    <td class="text-center"></td>
  </tr>
</table>

## Quickstarts and Samples

### Mobile/Native Applications

<table class="table">
  <tr>
    <td class="text-center"></td>
    <td colspan="3" class="text-center"><a href="#support-level-definitions">Level of Support</a></td>
  </tr>
  <tr>
    <th class="text-center"></th>
    <th class="text-center">Auth0 Supported</th>
    <th class="text-center">Community Support Only</th>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/native/android">Android</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/native/chrome">Chrome Extension</a></td>
    <td class="text-center"></td>
    <td class="text-center">X</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/native/cordova">Cordova</a></td>
    <td class="text-center"></td>
    <td class="text-center">X</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/native/electron">Electron</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/native/ionic">Ionic</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/native/ionic2">Ionic 2</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/native/ios-objc">iOS - Objective-C</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/native/ios-swift">iOS - Swift</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/native/phonegap">Phonegap</a></td>
    <td class="text-center"></td>
    <td class="text-center">X</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/native/react-native-android">React Native - Android</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/native/react-native-ios">React Native - iOS</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/native/windows-uwp-csharp">Windows Universal App C#</a></td>
    <td class="text-center"></td>
    <td class="text-center">X</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/native/windows-uwp-javascript">Windows Universal App JavaScript</a></td>
    <td class="text-center"></td>
    <td class="text-center">X</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/native/windowsphone">Windows Phone</a></td>
    <td class="text-center"></td>
    <td class="text-center">X</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/native/wpf-winforms">WPF/Winforms</a></td>
    <td class="text-center"></td>
    <td class="text-center">X</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/native/xamarin">Xamarin</a></td>
    <td class="text-center"></td>
    <td class="text-center">X</td>
  </tr>
</table>

### Single Page Applications

<table class="table">
  <tr>
    <td class="text-center"></td>
    <td colspan="2" class="text-center"><a href="#support-level-definitions">Level of Support</a></td>
  </tr>
  <tr>
    <th class="text-center"></th>
    <th class="text-center">Auth0 Supported</th>
    <th class="text-center">Community Support Only</th>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/spa/angularjs">Angular 1.x</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/spa/angular2">Angular 2</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/spa/aurelia">Aurelia</a></td>
    <td class="text-center"></td>
    <td class="text-center">X</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/spa/cyclejs">Cycle.js</a></td>
    <td class="text-center"></td>
    <td class="text-center">X</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/spa/emberjs">Ember</a></td>
    <td class="text-center"></td>
    <td class="text-center">X</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/spa/ember2js">Ember 2</a></td>
    <td class="text-center"></td>
    <td class="text-center">X</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/spa/vanilla">JavaScript</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/spa/jquery">jQuery</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/spa/react">React</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/spa/socket-io">Socket.io</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/spa/vuejs">Vue.js</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
</table>

### Regular Web Applications

<table class="table">
  <tr>
    <td class="text-center"></td>
    <td colspan="2" class="text-center"><a href="#support-level-definitions">Level of Support</a></td>
  </tr>
  <tr>
    <th class="text-center"></th>
    <th class="text-center">Auth0 Supported</th>
    <th class="text-center">Community Support Only</th>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/webapp/apache">Apache</a></td>
    <td class="text-center"></td>
    <td class="text-center">X</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/webapp/asp-classic">ASP Classic</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/webapp/aspnet-owin">ASP.NET (OWIN)</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/webapp/aspnet">ASP.NET (System.Web)</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/webapp/aspnet-core">ASP.NET Core</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/webapp/golang">Go</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/webapp/java">Java</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/webapp/java-spring-mvc">Java Spring MVC</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/webapp/java-spring-security-mvc">Java Spring Security</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/webapp/nancyfx">NancyFX</a></td>
    <td class="text-center"></td>
    <td class="text-center">X</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/webapp/nodejs">Node.js</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/webapp/php">PHP</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/webapp/laravel">PHP (Laravel)</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/webapp/symfony">PHP (Symfony)</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/webapp/scala">Play 2 Scala</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/webapp/python">Python</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/webapp/rails">Ruby on Rails</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/webapp/servicestack">ServiceStack</a></td>
    <td class="text-center"></td>
    <td class="text-center">X</td>
  </tr>
</table>

### Backends/APIs
<table class="table">
  <tr>
    <td class="text-center"></td>
    <td colspan="2" class="text-center"><a href="#support-level-definitions">Level of Support</a></td>
  </tr>
  <tr>
    <th class="text-center"></th>
    <th class="text-center">Auth0 Supported</th>
    <th class="text-center">Community Support Only</th>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/backend/wcf-service">.NET WCF</a></td>
    <td class="text-center"></td>
    <td class="text-center">X</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/backend/aspnet-core-webapi">ASP.NET Core Web API</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/backend/webapi-owin">ASP.NET Web API (OWIN)</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/backend/aspnet-webapi">ASP.NET Web API (System.Web)</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/backend/falcor">Falcor</a></td>
    <td class="text-center"></td>
    <td class="text-center">X</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/backend/golang">Go</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/backend/hapi">Hapi.js</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/backend/java-spring-security">Java Spring Security</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/backend/nginx">Nginx</a></td>
    <td class="text-center"></td>
    <td class="text-center">X</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/backend/nodejs">Node.js (Express)</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/backend/php">PHP</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/backend/php-laravel">PHP (Laravel)</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/backend/php-symfony">PHP (Symfony)</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/backend/python">Python</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/backend/relay">Relay</a></td>
    <td class="text-center"></td>
    <td class="text-center">X</td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/backend/ruby">Ruby</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
  <tr>
    <td class="text-center"><a href="/quickstart/backend/rails">Ruby on Rails</a></td>
    <td class="text-center">X</td>
    <td class="text-center"></td>
  </tr>
</table>
