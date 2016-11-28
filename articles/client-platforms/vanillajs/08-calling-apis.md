---
title: Calling APIs
description: This tutorial demonstrates how to make authenticated API calls
budicon: 546
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-javascript-spa',
  path: '08-Calling-Api'
}) %>

<%= include('../../_includes/_calling_apis') %>

## Sending Authenticated HTTP Requests

To make an authenticated request, add the user's JWT as an `Authorization` header to requests that go to secured endpoints.

```js
// app.js

var authenticate_request = function(xhr) {
  var id_token = localStorage.getItem('id_token');
  xhr.setRequestHeader('Authorization', 'Bearer ' + id_token);
};
```
