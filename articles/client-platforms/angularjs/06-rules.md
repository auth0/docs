---
title: Rules
description: This tutorial demonstrates how to use Auth0 rules to extend what Auth0 has to offer.
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '06-Rules'
}) %>

<%= include('../_includes/_rules-introduction') %>

## Create a Rule

<%= include('../_includes/_rules-create-section') %>

## Test the Rule

<%= include('../_includes/_rules-test-result-intro', { profilelink: '/quickstart/spa/angularjs/04-user-profile' }) %>

```html
<!-- components/home/home.html -->

<div class="text-center" ng-if="isAuthenticated">
  <h2>Welcome, {{ vm.profile.nickname }},</h2>
  <h3 ng-if="vm.profile.country">from {{ vm.profile.country }} <span class="additional-info">(added by rule)</span> </h3>
  <img ng-src="{{ vm.profile.picture }}">
</div>
```

![Country rule sample](/media/articles/angularjs/rule-country-show.png)
