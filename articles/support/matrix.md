---
title: Auth0 Product Support Matrix
description: This doc covers what features, platforms, and software configurations Auth0 supports.
toc: true
---

<div class="support-matrix-page">

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
        <td><div class="label label-warning">Bug fixes</div></td>
        <td>May receive bug fixes</td>
      </tr>
      <tr>
        <td><div class="label label-default">Community</div></td>
        <td>Auth0 does <i>not</i> support these items, and all assistance regarding these items will come from the general community.</td>
      </tr>
    </tbody>
  </table>

  ## Browsers

  This section covers the browsers that Auth0 will support when using the Auth0 Dashboard or Lock Library, or executing authentication transactions.

  ### Auth0 Dashboard

  <table class="table">
    <thead>
      <tr>
        <th width="80%">Browser</th>
        <th width="20%">Level of Support</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Google Chrome</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td>Apple Safari</td>
        <td><div class="label label-warning">Sustained</div></td>
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
        <td>Google Chrome</td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td>Apple Safari</td>
        <td><div class="label label-warning">Sustained</div></td>
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

  This section covers the operating systems (OS) that Auth0 will support when using the Auth0 Dashboard, Lock Library or executing authentication transactions.

  <div class="alert alert-info">
    Auth0 support is limited to the most recent version of the OS listed (unless otherwise specified). If you are using an older version, please upgrade prior to seeking support.
  </div>

  ### Auth0 Dashboard

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

  ## SDKs and Libraries

  ### Lock

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


  ### SDKs

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
    </tbody>
  </table>

  ### Frameworks/Platform Integration SDKs

  <div class="alert alert-info">
    Auth0 reserves the right to downgrade support for an SDK to Community-Supported at any time.
  </div>

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

  ## Quickstarts and Samples

  ### Mobile/Native Applications

  <table class="table">
    <thead>
      <tr>
        <th width="80%">Technology</th>
        <th width="20%">Level of Support</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="/quickstart/native/android">Android</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/native/electron">Electron</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/native/ionic">Ionic</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/native/ionic2">Ionic 2</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/native/ios-objc">iOS - Objective-C</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/native/ios-swift">iOS - Swift</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/native/react-native-android">React Native - Android</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/native/react-native-ios">React Native - iOS</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/native/chrome">Chrome Extension</a></td>
        <td><div class="label label-default">Community</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/native/cordova">Cordova</a></td>
        <td><div class="label label-default">Community</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/native/phonegap">Phonegap</a></td>
        <td><div class="label label-default">Community</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/native/windows-uwp-csharp">Windows Universal App C#</a></td>
        <td><div class="label label-default">Community</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/native/windows-uwp-javascript">Windows Universal App JavaScript</a></td>
        <td><div class="label label-default">Community</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/native/windowsphone">Windows Phone</a></td>
        <td><div class="label label-default">Community</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/native/wpf-winforms">WPF/Winforms</a></td>
        <td><div class="label label-default">Community</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/native/xamarin">Xamarin</a></td>
        <td><div class="label label-default">Community</div></td>
      </tr>
    </tbody>
  </table>

  ### Single Page Applications

  <table class="table">
    <thead>
      <tr>
        <th width="80%">Framework</th>
        <th width="20%">Level of Support</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="/quickstart/spa/angularjs">Angular 1.x</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/spa/angular2">Angular 2</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/spa/vanilla">JavaScript</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/spa/jquery">jQuery</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/spa/react">React</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/spa/socket-io">Socket.io</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/spa/vuejs">Vue.js</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/spa/aurelia">Aurelia</a></td>
        <td><div class="label label-default">Community</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/spa/cyclejs">Cycle.js</a></td>
        <td><div class="label label-default">Community</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/spa/emberjs">Ember</a></td>
        <td><div class="label label-default">Community</div></td>
      </tr>
    </tbody>
  </table>

  ### Regular Web Applications

  <table class="table">
    <thead>
      <tr>
        <th width="80%">Technology</th>
        <th width="20%">Level of Support</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="/quickstart/webapp/asp-classic">ASP Classic</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/webapp/aspnet-owin">ASP.NET (OWIN)</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/webapp/aspnet">ASP.NET (System.Web)</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/webapp/aspnet-core">ASP.NET Core</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/webapp/golang">Go</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/webapp/java">Java</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/webapp/java-spring-mvc">Java Spring MVC</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/webapp/java-spring-security-mvc">Java Spring Security</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/webapp/nodejs">Node.js</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/webapp/php">PHP</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/webapp/laravel">PHP (Laravel)</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/webapp/symfony">PHP (Symfony)</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/webapp/scala">Play 2 Scala</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/webapp/python">Python</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/webapp/rails">Ruby on Rails</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/webapp/apache">Apache</a></td>
        <td><div class="label label-default">Community</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/webapp/nancyfx">NancyFX</a></td>
        <td><div class="label label-default">Community</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/webapp/servicestack">ServiceStack</a></td>
        <td><div class="label label-default">Community</div></td>
      </tr>
    </tbody>
  </table>

  ### Backends/APIs
  <table class="table">
    <thead>
      <tr>
        <th width="80%">Technology</th>
        <th width="20%">Level of Support</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="/quickstart/backend/aspnet-core-webapi">ASP.NET Core Web API</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/backend/webapi-owin">ASP.NET Web API (OWIN)</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/backend/golang">Go</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/backend/hapi">Hapi.js</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/backend/java-spring-security">Java Spring Security</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/backend/nodejs">Node.js (Express)</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/backend/php">PHP</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/backend/php-laravel">PHP (Laravel)</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/backend/php-symfony">PHP (Symfony)</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/backend/python">Python</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/backend/ruby">Ruby</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/backend/rails">Ruby on Rails</a></td>
        <td><div class="label label-primary">Supported</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/backend/falcor">Falcor</a></td>
        <td><div class="label label-default">Community</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/backend/nginx">Nginx</a></td>
        <td><div class="label label-default">Community</div></td>
      </tr>
      <tr>
        <td><a href="/quickstart/backend/relay">Relay</a></td>
        <td><div class="label label-default">Community</div></td>
      </tr>
    </tbody>
  </table>
</div>
