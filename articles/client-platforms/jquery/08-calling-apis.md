---
title: Calling APIs
description: This tutorial will show you how to use $.ajaxSetup() to make authenticated API calls.
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

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* jQuery 3.1.0
:::

`Auth0` exposes an assortment of API endpoints to assist you with authentication in your application. Auth0 suggests you conform to the RFC standard by sending the token through the `Authorization` header when calling an API.

## Sending Authenticated HTTP Requests

In order to make an authenticated request, you need to use `$.ajaxSetup()` in order to automatically add the `Authorization` header to every request.

```javascript
/* ===== ./app.js ===== */
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

# Summary

In this guide you learned how to make authenticated API calls by reading and using the `id_token` value stored in localStorage along with the use of $.ajaxSetup() jQuery function.
