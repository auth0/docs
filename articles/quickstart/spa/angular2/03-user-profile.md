---
title: User Profile
description: This tutorial demonstrates how to fetch a user's information from Auth0
budicon: 292
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angular-samples',
  path: '02-User-Profile',
  requirements: [
    'Angular 2+'
  ]
}) %>

<%= include('../_includes/_user_profile_preamble') %>

## Request the Profile Scope

The user's `access_token` requires a `scope` of `openid profile` to successfully retrieve their information. In the `WebAuth` instance, specify that you would like to ask for these scopes.

```ts
// src/app/auth/auth.service.ts

auth0 = new auth0.WebAuth({
  // ...
  scope: 'openid profile'
});
``` 

## Make a Call for the User's Info

<%= include('../_includes/_user_profile_auth0js_method') %>

Add a method which calls `client.userInfo` to the `AuthService`.

```ts
// src/app/auth/auth.service.ts

// ...
userProfile: any;

//...
public getProfile(cb): void {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('Access token must exist to fetch profile');
  }

  const self = this;
  this.auth0.client.userInfo(accessToken, (err, profile) => {
    if (profile) {
      self.userProfile = profile;
    }
    cb(err, profile);
  });
}
```

<%= include('../_includes/_user_profile_in_memory') %>

## Add a Profile Component

The way your user's information gets displayed depends on the needs of your application, but a common implementation is to provide a dedicated profile area. The exact details are, of course, at your discretion.

Create a new component called `ProfileComponent`.

```ts
// src/app/profile/profile.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

}
```

The component injects the `AuthService`, from which it checks for a populated `userProfile` object. If none is found, it makes a call to `getProfile` to retrieve the user's information.

The user's information can be displayed in a template.

```html
<!-- src/app/profile/profile.component.html -->

<div class="panel panel-default profile-area">
  <div class="panel-heading">
    <h3>Profile</h3>
  </div>
  <div class="panel-body">
    <img src="{{profile?.picture}}" class="avatar" alt="avatar">
    <div>
      <label><i class="glyphicon glyphicon-user"></i> Nickname</label>
      <h3 class="nickname">{{ profile?.nickname }}</h3>
    </div>
    <pre class="full-profile">{{ profile | json }}</pre>
  </div>
</div>
```

<%= include('../_includes/_user_profile_additional_info') %>