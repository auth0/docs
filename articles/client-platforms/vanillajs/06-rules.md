---
title: Rules
description: This tutorial will show you how to use rules to easily customize and extend Auth0's capabilities.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-javascript-spa',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-javascript-spa',
  pkgBranch: 'master',
  pkgPath: '06-Rules',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

<%= include('../_includes/_rules-introduction') %>

## Create a Rule

<%= include('../_includes/_rules-create-section') %>

## Test the Rule

<%= include('../_includes/_rules-test-result-intro', { profilelink: '/docs/quickstart/spa/vanillajs/04-user-profile' }) %>

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
  document.getElementById('country').textContent = profile.country;
};
...
```

## Summary

In this guide, we saw how to extend Auth0's default functionality by using rules.
