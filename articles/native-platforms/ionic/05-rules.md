---
title: Rules
description: This tutorial will show you how to use Auth0 rules to extend what Auth0 has to offer.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-ionic-samples',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-ionic-samples',
  pkgBranch: 'master',
  pkgPath: '05-Rules',
  pkgFilePath: '05-Rules/www/auth0.variables.js',
  pkgType: 'replace'
}) %>

<%= include('../_includes/_rules-introduction') %>

## Create a Rule

<%= include('../_includes/_rules-create-section') %>

## Test the Rule

<%= include('../_includes/_rules-test-result-intro', { profilelink: '/docs/quickstart/native/ionic/03-user-profile' }) %>

```html
/* ===== www/components/home/home.html ===== */
<ion-view view-title="Auth0 Ionic Quickstart" ng-controller="HomeController as vm">
  <ion-content class="padding">
    <div ng-hide="isAuthenticated">
      <p>Welcome to the Auth0 Ionic Sample! Please log in:</p>
      <button class="button button-full button-positive" ng-click="vm.login()">
        Log In
      </button>
    </div>
    <div ng-show="isAuthenticated">
      <div class="list card">
        <div class="item item-avatar">
          <img src="{{ vm.profile.picture }}">
          <h2>{{ vm.profile.name }}</h2>
          <span ng-if="vm.profile.country" class="additional-info">Country (added by rule): <strong>{{ vm.profile.country }}</strong></span>
        </div>
        <a class="item item-icon-left assertive" ng-click="vm.logout()">
          <i class="icon ion-log-out"></i> Log Out
        </a>
      </div>
    </div>
  </ion-content>
</ion-view>

```

<div class="phone-mockup">
  <img src="/media/articles/native-platforms/ionic/image_rules1.png" alt="Mobile example screenshot"/>
</div>
