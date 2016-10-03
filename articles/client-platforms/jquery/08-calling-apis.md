---
title: Calling APIs
description: This tutorial demonstrates how to use $.ajaxSetup() to make authenticated API calls.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-jquery-samples',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-jquery-samples',
  pkgBranch: 'master',
  pkgPath: '08-Calling-Api',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

<%= include('../../_includes/_calling_apis') %>

## Sending Authenticated HTTP Requests

In order to make an authenticated request, you need to use `$.ajaxSetup()` in order to automatically add the `Authorization` header to every request.

```javascript
// app.js

$.ajaxSetup({
  'beforeSend': function(xhr) {
    if (localStorage.getItem('id_token')) {
      xhr.setRequestHeader('Authorization',
        'Bearer ' + localStorage.getItem('id_token'));
    }
  }
});
```

Your requests will have the `Authorization` header added automatically:

`Authorization: Bearer eyJ0eXAiOiJKV1Qi...`

Here, before every AJAX request, we are fetching the token from `localStorage` stored in the `id_token` key. You can choose a different key name if you like.
