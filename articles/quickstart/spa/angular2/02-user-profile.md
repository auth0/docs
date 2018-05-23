---
title: User Profile
description: This tutorial demonstrates how to fetch a user's information from Auth0.
budicon: 292
github:
  path : 02-User-Profile
---
<%= include('../_includes/_user_profile_preamble') %>

## Request the Profile Scope

To retrieve user information, request a scope of `openid profile` in the instance of the `auth0.WebAuth` object. 

```ts
// src/app/auth/auth.service.ts

auth0 = new auth0.WebAuth({
  // ...
  scope: 'openid profile'
});
``` 

## Make a Call for the User's Information

<%= include('../_includes/_user_profile_auth0js_method') %>

Add a method that calls the `client.userInfo` method to the `AuthService` service.

```ts
// src/app/auth/auth.service.ts

// ...
userProfile: any;

//...
public getProfile(cb): void {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('Access Token must exist to fetch profile');
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

Some applications have a dedicated profile section for displaying user information. The example below shows how to set it up. 

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

The component injects the `AuthService` service. Then, it checks the service for a populated `userProfile` object. If it doesn't find the object, the component makes a call to `getProfile` to get the user's information.

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
