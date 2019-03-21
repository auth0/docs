---
title: Auth0 Product Support Matrix
description: This doc covers what features, platforms, and software configurations Auth0 supports.
toc: true
classes: support-matrix-page
topics:
    - support
    - support-matrix
contentType:
  - reference
useCase:
  - support
---
# Auth0 Product Support Matrix

For customers with valid [subscriptions](${manage_url}/#/account/billing/subscription), this article covers the features, platforms, and software configurations that are eligible for Auth0 support.

Auth0 provides support in alignment with the [Terms of Service](https://auth0.com/terms) and Pricing and Support plans.

## Auth0 Support Coverage

Official support provided by Auth0 is limited to the languages, platforms, versions, and technologies specifically listed as such on this page. Anything that is **not** listed, or is listed as **community-supported**, is ineligible for Auth0 support.

If you have questions about unsupported items, you can post your question on the [Auth0 public forum](https://community.auth0.com/).

For community-supported items, you can ask for help by contacting the developers responsible for those items (such as submitting issues on the GitHub repositories for the specific libraries or software development kits (SDKs)).

::: note
Auth0 support is limited to the most recent version of the technologies listed (unless otherwise specified). If you are using an older version, you will be required to upgrade prior to seeking support.
:::

### Definitions

Throughout this article, we will use the following terms to indicate the varying levels of support Auth0 will provide.

<table class="table">
  <thead>
    <tr>
      <th width="30%">Label</th>
      <th width="70%">Description</th>
    </tr>
  </thead>
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
      <td>Google Chrome (Latest version)</td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td>Apple Safari (Latest version)</td>
      <td><div class="label label-warning">Sustained</div></td>
    </tr>
    <tr>
      <td>Microsoft Edge (Latest version)</td>
      <td><div class="label label-warning">Sustained</div></td>
    </tr>
    <tr>
      <td>Mozilla Firefox (Latest version)</td>
      <td><div class="label label-warning">Sustained</div></td>
    </tr>
  </tbody>
</table>

::: note
At this time, Auth0 only supports use of the Dashboard with desktop browsers.
:::

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
      <td>Google Chrome (Latest version)</td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td>Apple Safari (Latest version)</td>
      <td><div class="label label-warning">Sustained</div></td>
    </tr>
    <tr>
      <td>Microsoft Internet Explorer 10/11</td>
      <td><div class="label label-warning">Sustained</div></td>
    </tr>
    <tr>
      <td>Microsoft Edge (Latest version)</td>
      <td><div class="label label-warning">Sustained</div></td>
    </tr>
    <tr>
      <td>Mozilla Firefox (Latest version)</td>
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
      <td>Google Chrome for Android KitKat (4.4) or later</td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
  </tbody>
</table>

## Operating Systems

This section covers the operating systems (OS) that Auth0 will support when using the Auth0 Dashboard, Lock Library or executing authentication transactions.

::: note
Auth0 support is limited to the most recent version of the OS listed (unless otherwise specified). If you are using an older version, please upgrade prior to seeking support.
:::

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

### Auth0 Lock Widgets

<%= include('../_includes/_libraries_support_lock') %>

### Auth0 SDKs

<%= include('../_includes/_libraries_support_sdks') %>

### Framework and Platform Integration SDKs

<%= include('../_includes/_libraries_support_frameworks') %>

### Auth0 Analytics SDK

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
      <td><a href="https://github.com/auth0/auth0-analytics.js">auth0-analytics.js</a></td>
      <td>v1</td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
  </tbody>
</table>

### Content Management Systems Plugins

<table class="table">
  <thead>
    <tr>
      <th width="80%">CMS</th>
      <th width="20%">Level of Support</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/auth0/wp-auth0">WordPress</a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="https://github.com/auth0/auth0-drupal">Drupal</a></td>
      <td><div class="label label-default">Community</div></td>
    </tr>
    <tr>
      <td><a href="https://github.com/auth0/auth0-joomla">Joomla</a></td>
      <td><div class="label label-default">Community</div></td>
    </tr>
  </tbody>
</table>

## Quickstarts and Samples

### Mobile/Native Applications

<table class="table">
  <thead>
    <tr>
      <th width="70%">Technology</th>
      <th width="10%">Sample</th>
      <th width="20%">Level of Support</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/quickstart/native/android">Android</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-android-sample"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/native/ionic3">Ionic 3</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-ionic3-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/native/ios-objc">iOS - Objective-C</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-ios-objc-sample"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/native/ios-swift">iOS - Swift</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-ios-swift-sample"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/native/react-native-android">React Native - Android</a></td>
      <td class="text-center"><a href="https://github.com/auth0/Mobile-Samples.React"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/native/react-native-ios">React Native - iOS</a></td>
      <td class="text-center"><a href="https://github.com/auth0/Mobile-Samples.React"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/native/chrome">Chrome Extension</a></td>
      <td class="text-center"><a href="https://github.com/auth0-community/auth0-chrome-sample"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-default">Community</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/native/cordova">Cordova</a></td>
      <td class="text-center"><a href="https://github.com/auth0-community/auth0-cordova-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-default">Community</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/native/windows-uwp-csharp">Windows Universal App C#</a></td>
      <td class="text-center"><a href="https://github.com/auth0-community/auth0-uwp-oidc-samples/tree/master/Quickstart/00-Starter-Seed"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-default">Community</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/native/windows-uwp-javascript">Windows Universal App JavaScript</a></td>
      <td class="text-center"><a href="https://github.com/auth0/Auth0.Windows.UWP/tree/master/samples/LoginClientSample.Js"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-default">Community</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/native/windowsphone">Windows Phone</a></td>
      <td class="text-center"><a href="https://github.com/auth0-community/auth0-WindowsPhone-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-default">Community</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/native/wpf-winforms">WPF/Winforms</a></td>
      <td class="text-center"><a href="https://github.com/auth0-community/auth0-WinFormsWPF-oidc-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-default">Community</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/native/xamarin">Xamarin</a></td>
      <td class="text-center"><a href="https://github.com/auth0-community/auth0-xamarin-oidc-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-default">Community</div></td>
    </tr>
  </tbody>
</table>

### Single Page Applications

<table class="table">
  <thead>
    <tr>
      <th width="70%">Technology</th>
      <th width="10%">Sample</th>
      <th width="20%">Level of Support</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>AngularJS</td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-angularjs-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/spa/angular2">Angular (2+)</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-angular-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/spa/vanillajs">JavaScript</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-javascript-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td>jQuery</td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-jquery-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/spa/react">React</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-react-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/spa/vuejs">Vue.js</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-vue-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td>Aurelia</td>
      <td class="text-center"><a href="https://github.com/auth0-community/auth0-aurelia-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-default">Community</div></td>
    </tr>
    <tr>
      <td>Ember</td>
      <td class="text-center"><a href="https://github.com/auth0-community/auth0-ember-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-default">Community</div></td>
    </tr>
  </tbody>
</table>

### Regular Web Applications

<table class="table">
  <thead>
    <tr>
      <th width="70%">Technology</th>
      <th width="10%">Sample</th>
      <th width="20%">Level of Support</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/quickstart/webapp/aspnet-owin">ASP.NET (OWIN)</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-aspnet-owin-mvc-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/webapp/aspnet">ASP.NET (System.Web)</a></td>
      <td class="text-center"><a href="https://github.com/auth0/auth0-aspnet/tree/master/examples/auth0-aspnet-mvc4-sample/"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/webapp/aspnet-core">ASP.NET Core</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-aspnetcore-mvc-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/webapp/golang">Go</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-golang-web-app"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/webapp/java">Java</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-servlet-sample"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/webapp/java-spring-mvc">Java Spring MVC</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-spring-mvc-sample"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/webapp/java-spring-security-mvc">Java Spring Security</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-spring-security-mvc-sample"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/webapp/nodejs">Node.js</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-nodejs-webapp-sample"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/webapp/php">PHP</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-php-web-app"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/webapp/laravel">PHP (Laravel)</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-laravel-php-web-app"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/webapp/symfony">PHP (Symfony)</a></td>
      <td class="text-center"><a href="https://github.com/auth0-community/auth0-symfony-php-web-app"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-default">Community</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/webapp/scala">Play 2 Scala</a></td>
      <td class="text-center"><a href="https://github.com/auth0-community/auth0-scala-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-default">Community</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/webapp/python">Python</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-python-web-app"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/webapp/rails">Ruby on Rails</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-rubyonrails-sample"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/webapp/nancyfx">NancyFX</a></td>
      <td class="text-center"><a href="https://github.com/auth0-community/auth0-nancyfx-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-default">Community</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/webapp/servicestack">ServiceStack</a></td>
      <td class="text-center"><a href="https://github.com/auth0-community/auth0-servicestack-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-default">Community</div></td>
    </tr>
  </tbody>
</table>

### Backends/APIs

<table class="table">
  <thead>
    <tr>
      <th width="70%">Technology</th>
      <th width="10%">Sample</th>
      <th width="20%">Level of Support</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/quickstart/backend/aspnet-core-webapi">ASP.NET Core Web API</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-aspnetcore-webapi-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/backend/webapi-owin">ASP.NET Web API (OWIN)</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-aspnet-owin-webapi-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/backend/golang">Go</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-golang-api-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/backend/hapi">Hapi.js</a></td>
      <td class="text-center"><a href="https://github.com/auth0-community/auth0-hapi-api-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-default">Community</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/backend/java-spring-security">Java Spring Security</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-spring-security-api-sample"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/backend/nodejs">Node.js (Express)</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-express-api-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/backend/php">PHP</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-php-api-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/backend/php-laravel">Laravel</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-laravel-api-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/backend/php-symfony">Symfony</a></td>
      <td class="text-center"><a href="https://github.com/auth0-community/auth0-symfony-api-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-default">Community</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/backend/python">Python</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-python-api-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/backend/ruby">Ruby</a></td>
      <td class="text-center"><a href="https://github.com/auth0-community/auth0-ruby-api-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-default">Community</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/backend/rails">Ruby on Rails</a></td>
      <td class="text-center"><a href="https://github.com/auth0-samples/auth0-rubyonrails-api-samples"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-primary">Supported</div></td>
    </tr>
    <tr>
      <td><a href="/quickstart/backend/falcor">Falcor</a></td>
      <td class="text-center"><a href="https://github.com/auth0-community/auth0-falcor-sample"><img src="https://cdn.auth0.com/website/auth0-docs/github-logo.svg"/></a></td>
      <td><div class="label label-default">Community</div></td>
    </tr>
  </tbody>
</table>

## Extensions

::: note
Auth0 does not provide support for custom extensions.
:::

<table class="table">
  <thead>
    <tr>
      <th width="80%">Extensions</th>
      <th width="20%">Level of Support</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Extensions created by Auth0 and published to the <a href="${manage_url}/#/extensions">Management Dashboard</a></td>
      <td><div class="label label-warning">Sustained</div></td>
    </tr>
  </tbody>
</table>

Feature requests should be requested at the GitHub repository of each extension. Please note there is no commitment from Auth0 to implement requests.

</div>
