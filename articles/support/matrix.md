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
    <th>Supported</th>
    <td>***</td>
    <td>Auth0 has formally tested, will support, and provide both new features and bug fixes (if applicable) for these items.</td>
  </tr>
  <tr>
    <th>Sustained</th>
    <td>**</td>
    <td>Auth0 has <i>not</i> formally tested, but will support and may provide bug fixes (if applicable) for these items.</td>
  </tr>
  <tr>
    <th>Best Effort</th>
    <td>*</td>
    <td>Auth0 may provide assistance if the appropriate resources are available.</td>
  </tr>
  <tr>
    <th>Community</th>
    <td></td>
    <td>Auth0 does <i>not</i> support these items, and all assistance regarding these items will come from the general community.</td>
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
    <td>Apple Safari</td>
    <td>**</td>
  </tr>
  <tr>
    <td>Google Chrome</td>
    <td>***</td>
  </tr>
  <tr>
    <td>Microsoft Internet Explorer 10</td>
    <td>TBD</td>
  </tr>
  <tr>
    <td>Microsoft Edge</td>
    <td></td>
  </tr>
  <tr>
    <td>Mozilla Firefox</td>
    <td>**</td>
  </tr>
</table>

### Auth0 Lock and Authentication

The following matrix lists the level of support Auth0 will provide with regards to the Internet browser you have chosen when you are:

* Using [Lock](/libraries/lock);
* Performing authentication transactions.

#### Desktop Browsers

<table class = "table">
  <tr>
    <td>Apple Safari</td>
    <td>**</td>
  </tr>
  <tr>
    <td>Google Chrome</td>
    <td>***</td>
  </tr>
  <tr>
    <td>Microsoft Internet Explorer 10</td>
    <td>**</td>
  </tr>
  <tr>
    <td>Microsoft Edge</td>
    <td>**</td>
  </tr>
  <tr>
    <td>Mozilla Firefox</td>
    <td>**</td>
  </tr>
</table>

#### Mobile Browsers

<table class = "table">
  <tr>
    <td>Apple Safari for iOS 9 (or later)</td>
    <td>***</td>
  </tr>
  <tr>
    <td>Google Chrome for Android KitKit (4.4) or later</td>
    <td>***</td>
  </tr>
</table>

## Operating Systems

This section covers the operating systems that Auth0 will support when using the Auth0 Dashboard or Lock Library, or executing authentication transactions.

<div class="alert alert-info">
  Auth0 support is limited to the most recent version of the operating systems listed (unless otherwise specified). If you are using an older version, please upgrade prior to seeking support.
</div>

### Auth0 Dashboard

The following matrix lists the level of support Auth0 will provide with regards to the operating system you have chosen when using the [Auth0 Dashboard](${manage_url}).

<table class="table">
  <tr>
    <td>Apple MacOS (when using Google Chrome as your browser)</td>
    <td>***</td>
  </tr>
  <tr>
    <td>Apple MacOS (when using any browser besides Google Chrome)</td>
    <td>**</td>
  </tr>
  <tr>
    <td>Linux (Ubuntu)</td>
    <td>**</td>
  </tr>
  <tr>
    <td>Microsoft Windows</td>
    <td>**</td>
  </tr>
</table>

### Auth0 Lock and Authentication

The following matrix lists the level of support Auth0 will provide with regards to the operating system you have chosen when you are:

* Using [Lock](/libraries/lock);
* Performing authentication transactions.

#### Mobile Operating Systems

<table class="table">
<tr>
  <td>Apple iOS 9 (or later)</td>
  <td>***</td>
</tr>
<tr>
  <td>Google Android KitKat (4.4) or later</td>
  <td>***</td>
</tr>
</table>

## Software Development Kits (SDKs) and Libraries

### Definitions

In this section covering SDKs and Libraries, we will use the following terms to indicate the varying levels of support Auth0 will provide.

<table class="table">
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


### Software Development Kits (SDKs)

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

<div class="alert alert-info">
  Auth0 reserves the right to downgrade support for an SDK to Community-Supported at any time.
</div>

<table class="table">
  <tr>
    <th>SDK</th>
    <th>Certified</th>
    <th>Features</th>
    <th>Community-Supported</th>
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

### Mobile/Native Applications

<table class="table">
  <tr>
    <th></th>
    <th>Quickstart Provided + Auth0 Support</th>
    <th>Bug Fixes Provided</th>
    <th>Community Support Only</th>
  </tr>
  <tr>
    <td>[Android](/quickstart/native/android)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Chrome Extension](/quickstart/native/chrome)</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[Cordova](/quickstart/native/cordova)</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[Electron](/quickstart/native/electron)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Ionic](/quickstart/native/ionic)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Ionic 2](/quickstart/native/ionic2)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[macOS - Objective-C](/quickstart/native/ios-objc)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[macOS - Swift](/quickstart/native/ios-swift)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Phonegap](/quickstart/native/phonegap)</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[React Native - Android](/quickstart/native/react-native-android)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[React Native - macOS](/quickstart/native/react-native-ios)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Windows Universal App C#](/quickstart/native/windows-uwp-csharp)</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[Windows Universal App JavaScript](/quickstart/native/windows-uwp-javascript)</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[Windows Phone](/quickstart/native/windowsphone)</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[WPF/Winforms](/quickstart/native/wpf-winforms)</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[Xamarin](/quickstart/native/Xamarin)</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
</table>

### Single Page Applications

<table class="table">
  <tr>
    <th></th>
    <th>Quickstart + Auth0 Support</th>
    <th>Bug Fixes Provided</th>
    <th>Community Support Only</th>
  </tr>
  <tr>
    <td>[Angular 1.x](/quickstart/spa/angularjs)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Angular 2](/quickstart/spa/angular2)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Aurelia](/quickstart/spa/aurelia)</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[Cycle.js](/quickstart/spa/cyclejs)</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[Ember](/quickstart/spa/emberjs)</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[Ember 2](/quickstart/spa/ember2js)</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[JavaScript](/quickstart/spa/vanilla)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[jQuery](/quickstart/spa/jquery)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[React](/quickstart/spa/react)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Socket.io](/quickstart/spa/socket-io)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Vue.js](/quickstart/spa/vuejs)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
</table>

### Regular Web Applications

<table class="table">
  <tr>
    <th></th>
    <th>Quickstart + Auth0 Support</th>
    <th>Bug Fixes Provided</th>
    <th>Community Support Only</th>
  </tr>
  <tr>
    <td>[Apache](/quickstart/webapp/apache)</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[ASP Classic](/quickstart/webapp/asp-classic)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[ASP.NET (OWIN)](/quickstart/webapp/aspnet-owin)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[ASP.NET (System.Web)](/quickstart/webapp/aspnet)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[ASP.NET Core](/quickstart/webapp/aspnet-core)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Go](/quickstart/webapp/golang)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Java](/quickstart/webapp/java)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Java Spring MVC](/quickstart/webapp/java-spring-mvc)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Java Spring Security](/quickstart/webapp/java-spring-security-mvc)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[NancyFX](/quickstart/webapp/nancyfx)</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[Node.js](/quickstart/webapp/nodejs)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[PHP](/quickstart/webapp/php)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[PHP (Laravel)](/quickstart/webapp/laravel)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[PHP (Symfony)](/quickstart/webapp/symfony)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Play 2 Scala](/quickstart/webapp/scala)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Python](/quickstart/webapp/python)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Ruby on Rails](/quickstart/webapp/rails)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[ServiceStack](/quickstart/webapp/servicestack)</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
</table>

### Backends/APIs
<table class="table">
  <tr>
    <th></th>
    <th>Quickstart + Auth0 Support</th>
    <th>Bug Fixes</th>
    <th>Community Support Only</th>
  </tr>
  <tr>
    <td>[.NET WCF](/quickstart/backend/wcf-service)</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[ASP.NET Core Web API](/quickstart/backend/aspnet-core-webapi)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[ASP.NET Web API (OWIN)](/quickstart/backend/webapi-owin)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[ASP.NET Web API (System.Web)](/quickstart/backend/aspnet-webapi)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Falcor](/quickstart/backend/falcor)</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[Go](/quickstart/backend/golang)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Hapi.js](/quickstart/backend/hapi)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Java Spring Security](/quickstart/backend/java-spring-security)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Nginx](/quickstart/backend/nginx)</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[Node.js (Express)](/quickstart/backend/nodejs)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[PHP](/quickstart/backend/php)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[PHP (Laravel)](/quickstart/backend/php-laravel)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[PHP (Symfony)](/quickstart/backend/php-symfony)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Python](/quickstart/backend/python)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Relay](/quickstart/backend/relay)</td>
    <td></td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[Ruby](/quickstart/backend/ruby)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[Ruby on Rails](/quickstart/backend/rails)</td>
    <td></td>
    <td>X</td>
    <td></td>
  </tr>
</table>
