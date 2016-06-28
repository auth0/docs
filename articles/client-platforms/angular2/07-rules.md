---
title: Rules
description: This tutorial will show you how to use Auth0 rules to extend what Auth0 has to offer.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/master/06-Rules',
}) %>_

<%= include('../_includes/_rules-introduction.md') %>


#### Test rule results

To see the created rule results, just login and fetch user profile information (you can see how [here](/quickstart/spa/angular2/03-user-profile)).

Then, display user profile's new rules attribute:

```html
<div *ngIf="auth.authenticated() && auth.userProfile">
  <div class="row">
    <div class="col-md-6">
      <h3>Profile</h3>
      ...
      <div>
        <!-- The roles are added to user in the rule defined in Auth0 (https://manage.auth0.com/#/rules) -->
        <strong>Roles: </strong>
        <ul>
          <li *ngFor="let role of auth.userProfile.roles">
            {{role}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
<h4 *ngIf="!auth.authenticated()">You are not logged in, please click 'Log in' button to login</h4>
```

If you login with `test@example.com`, profile will have both roles in the profile:

![Admin role](/media/articles/angularjs2/rule-profile-admin.png)

If you login with antoher user, for example `another@example.com`, profile will only have `guest` role:

![Admin role](/media/articles/angularjs2/rule-profile-guest.png)


This is just one of the tons of cool things we can do with rules. Go ahead and create any rule that fits your needs.