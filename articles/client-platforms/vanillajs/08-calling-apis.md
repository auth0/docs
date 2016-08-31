---
title: Calling APIs
description: This tutorial will show you how to make authenticated API calls.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-javascript-spa',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-javascript-spa',
  pkgBranch: 'master',
  pkgPath: '08-Calling-Api',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

`Auth0` exposes an assortment of API endpoints to assist you with authentication in your application. Auth0 suggests you conform to the RFC standard by sending the token through the `Authorization` header when calling an API. For a detailed description of API tutorials, see the [full documentation](https://auth0.com/docs/quickstart/backend).

## Sending Authenticated HTTP Requests

In order to make an authenticated request, you need to add the `Authorization` header to every request.

```javascript
/* ===== ./app.js ===== */
...
var authenticate_request = function(xhr) {
  var id_token = localStorage.getItem('id_token');
  xhr.setRequestHeader('Authorization', 'Bearer ' + id_token);
};
...
```

Your requests will have the `Authorization` header added:

`Authorization: Bearer eyJ0eXAiOiJKV1Qi...`

Here, we are fetching the token from `localStorage` stored in the `id_token` key. You can choose a different key name if you’d like.

## Summary

In this guide, we saw how to authenticate requests by reading and using the `id_token` value stored in localStorage along with the use of the XMLHttpRequest.setRequestHeader() method. For a real example of making authenticated API calls, please check our previous guide for [linking accounts](/quickstart/spa/vanillajs/05-linking-accounts).
