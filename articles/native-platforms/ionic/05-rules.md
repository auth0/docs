---
title: Rules
description: This tutorial demonstrates how to use rules to extend what Auth0 has to offer
budicon: 173
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ionic-samples',
  path: '05-Rules',
  requirements: [
    'Ionic 1.3.1'
  ]
}) %>


<%= include('../_includes/_rules-introduction') %>

## Create a Rule

<%= include('../_includes/_rules-create-section') %>

## Test the Rule

<%= include('../_includes/_rules-test-result-intro', { profilelink: '/quickstart/native/ionic/03-user-profile' }) %>

```html
<!-- www/components/home/home.html -->

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
