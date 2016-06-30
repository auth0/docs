---
title: Rules
description: This tutorial will show you how to use Auth0 rules to extend what Auth0 has to offer.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/master/06-Rules',
}) %>_

<%= include('../_includes/_rules-introduction') %>


#### Test rule result

To see the created rule results, just login and fetch user profile information (you can see how [here](/quickstart/spa/angular2/03-user-profile)).

Then, display user profile's new `country` attribute added in the created rule attribute:

```html
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


This is just one of the tons of cool things we can do with rules. Go ahead and create any rule that fits your needs.
