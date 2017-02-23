---
title: User Profile
description: This tutorial demonstrates how to fetch a user's information from Auth0 to be displayed in a profile area in a React application
budicon: 292
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-react-samples',
  path: '03-User-Profile',
  requirements: [
    'React 15'
  ]
}) %>

<%= include('../../_includes/_updating_user_preabmle') %>

## Request the Profile Scope

The `access_token` requires a `scope` of `openid profile` to successfully retrieve the user's information. Add this to your Lock instance.

```js
// src/Auth/Auth.js

lock = new Auth0Lock(..., {
  // ...
  auth: {
    // ...
    params: {
      scope: 'openid profile'
    }
  }
});
``` 

## Make a Call for the User's Info

<%= include('../../_includes/_user_profile_lock_method') %>

Add a method which calls `getUserInfo` to the `authService`.

```js
// src/Auth/Auth.js

// ...
userProfile;

//...
getProfile(cb) {
  let accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('Access token required for fetching profile');
  }
  this.lock.getUserInfo(accessToken, (err, profile) => {
    if (profile) {
      this.userProfile = profile;
    }
    cb(err, profile);
  });
}
```

<%= include('../../_includes/_user_profile_in_memory') %>

## Add a Profile Area

The way your user's information gets displayed depends on the needs of your application, but a common implementation is to provide a dedicated profile area. The exact details are, of course, at your discretion.

Create a new component called `Profile`.

```js
// src/Profile/Profile.js

import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';

class Profile extends Component {
  login() {
    this.props.route.auth.login();
  }
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.route.auth;
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
    );
  }
}

export default Profile;
```

The component uses the `Auth` service instance passed down, from which it checks for a populated `userProfile` object. If none is found, it makes a call to `getProfile` to retrieve the user's information. The user's information is displayed in the rendered view.

<%= include('../../_includes/_user_profile_additional_info') %>