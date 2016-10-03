---
title: Calling APIs
description: This tutorial demonstrates how to make authenticated API calls
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

<%= include('../../_includes/_calling_apis') %>

## Sending Authenticated HTTP Requests

To make an authenticated request, add the user's JWT as an `Authorization` header to requests that go to secured endpoints.

```js
// app.js

...

var authenticate_request = function(xhr) {
  var id_token = localStorage.getItem('id_token');
  xhr.setRequestHeader('Authorization', 'Bearer ' + id_token);
};

...
```
