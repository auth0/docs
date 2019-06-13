---
title: User Profile
description: This tutorial demonstrates how to fetch a user's information from Auth0.
budicon: 292
topics:
  - quickstarts
  - spa
  - react
  - user-profile
github:
  path: 02-User-Profile
contentType: tutorial
useCase: quickstart
---
<%= include('../_includes/_user_profile_preamble') %>

## Request the Profile Scope

To retrieve user information, request a scope of `openid profile` in the instance of the `auth0.WebAuth` object. 

```js
// src/Auth/Auth.js

auth0 = new auth0.WebAuth({
  // ...
  scope: 'openid profile'
});
``` 

## Retrieve User Information

<%= include('../_includes/_user_profile_auth0js_method') %>

Add a method that calls the `client.userInfo` method to the `Auth` service.

```js
// src/Auth/Auth.js

// ...

userProfile;

// ...

constructor() {
  // ...
  this.getProfile = this.getProfile.bind(this);
}

// ...

getProfile(cb) {
  this.auth0.client.userInfo(this.accessToken, (err, profile) => {
    if (profile) {
      this.userProfile = profile;
    }
    cb(err, profile);
  });
}

logout() {
  // ...

  // Remove user profile
  this.userProfile = null;

  // ...
}

// ...
```

<%= include('../_includes/_user_profile_in_memory') %>

## Display the User Profile

Some applications have a dedicated profile section for displaying user information. The example below shows how to set it up. 

Create a new component called `ProfileComponent`.

```js
// src/Profile/Profile.js

import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import './Profile.css';

class Profile extends Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }
  render() {
    const { profile } = this.state;
    return (
      <div className="container">
        <div className="profile-area">
          <h1>{profile.name}</h1>
          <Panel header="Profile">
            <img src={profile.picture} alt="profile" />
            <div>
              <ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel>
              <h3>{profile.nickname}</h3>
            </div>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Profile;
```

The component first looks for a profile cached on the service. If it doesn't find the profile, the component makes a call to `getProfile` to get the user's information.

<%= include('../_includes/_user_profile_additional_info') %>
