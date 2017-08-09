---
title: User Profile
description: This tutorial demonstrates how to fetch a user's information from Auth0
budicon: 292
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-react-samples',
  path: '02-User-Profile',
  requirements: [
    'React 15.5'
  ]
}) %>

<%= include('../_includes/_user_profile_preamble') %>

## Request the Profile Scope

The user's `access_token` requires a `scope` of `openid profile` to successfully retrieve their information. In the `WebAuth` instance, specify that you would like to ask for these scopes.

```js
// src/Auth/Auth.js

auth0 = new auth0.WebAuth({
  // ...
  scope: 'openid profile'
});
``` 

## Make a Call for the User's Info

<%= include('../_includes/_user_profile_auth0js_method') %>

Add a method which calls `client.userInfo` to the `Auth` service.

```js
// src/Auth/Auth.js

constructor() {
  // ...
  this.getProfile = this.getProfile.bind(this);
}

// ...
userProfile;

// ...

getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

//...
getProfile(cb) {
  let accessToken = this.getAccessToken();
  this.auth0.client.userInfo(accessToken, (err, profile) => {
    if (profile) {
      this.userProfile = profile;
    }
    cb(err, profile);
  });
}
```

<%= include('../_includes/_user_profile_in_memory') %>

## Add a Profile Component

The way your user's information gets displayed depends on the needs of your application, but a common implementation is to provide a dedicated profile area. The exact details are, of course, at your discretion.

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

When the component is initialized, it first looks for a profile held in memory on the service. If none is found, it calls the `getProfile` function to fetch the user's profile from Auth0.

<%= include('../_includes/_user_profile_additional_info') %>
