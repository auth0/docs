---
title: Rules
description: This tutorial demonstrates how to use Auth0 rules
budicon: 173
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs2-systemjs-sample',
  path: '06-Rules',
  requirements: [
    'Angular 2.0.1'
  ]
}) %>

<%= include('../_includes/_rules-introduction') %>

## Create a Rule

<%= include('../_includes/_rules-create-section') %>

## Test the Rule

<%= include('../_includes/_rules-test-result-intro', { profilelink: '/quickstart/spa/angular2/04-user-profile' }) %>

```html
  <!-- ./profile_show.template.html -->
  <div *ngIf="auth.authenticated() && auth.userProfile">
    <div class="row">
      <div class="col-md-6">
        <h3>Profile</h3>
        ...
        <p><strong>Country (added by rule): </strong> {{auth.userProfile.country}}</p>
      </div>
    </div>
  </div>
  <h4 *ngIf="!auth.authenticated()">You are not logged in, please click 'Log in' button to login</h4>
```

![Country rule sample](/media/articles/angularjs2/rule-country-show.png)
