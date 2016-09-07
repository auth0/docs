---
title: Rules
description: This tutorial will show you how to use Auth0 rules to extend what Auth0 has to offer.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-jquery-samples',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-jquery-samples',
  pkgBranch: 'master',
  pkgPath: '06-Rules',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* jQuery 3.1.0
:::

<%= include('../_includes/_rules-introduction') %>

## Create a Rule

<%= include('../_includes/_rules-create-section') %>

## Test the Rule

<%= include('../_includes/_rules-test-result-intro', { profilelink: '/docs/quickstart/spa/jquery/04-user-profile' }) %>

```html
<!-- ===== ./index.html ===== -->
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
/* ===== ./app.js ===== */
...
var showUserProfile = function(profile) {
  ...
  $('#country').text(profile.country);
};
...
```

# Summary

In this guide you learned how to extend Auth0 default functionality by using Auth0 rules.
