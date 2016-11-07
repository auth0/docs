---
title: Rules
description: This tutorial demonstrates how to use Auth0 rules to extend what Auth0 has to offer.
budicon: 173
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-samples',
  path: '06-Rules'
}) %>

<%= include('../_includes/_rules-introduction') %>

## Create a Rule

<%= include('../_includes/_rules-create-section') %>

## Test the Rule

<%= include('../_includes/_rules-test-result-intro', { profilelink: '/quickstart/spa/jquery/04-user-profile' }) %>

```html
  <!-- index.html -->

  ...

  <div id="logged" class="row" style="display: none;">
    <h4>You are logged in</h4>
    <div class="row">
      <div class="col-md-6">
        <h3>Profile</h3>
        <img alt="" id="avatar">
        ...
        <p><strong>Country (added by rule): </strong> <span id="country"></span></p>
      </div>
    </div>
    <button type="button" class="btn btn-default" id="btn-logout">Logout</button>
  </div>

  ...

```

```javascript
// app.js

...

var showUserProfile = function(profile) {

  ...

  $('#country').text(profile.country);
};

...
```
