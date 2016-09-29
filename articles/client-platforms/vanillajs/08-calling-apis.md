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

A common need for any client-side application is to access resources from a data API. Some of these data resources will likely need to be protected such that only the user who is authenticated in the client-side app can access them. This can be achieved by protecting your API's endpoints with your Auth0 secret key and sending the user's JWT as an `Authorization` header when calling the API. For more detail on how to secure your API, see the [server API documentation](https://auth0.com/docs/quickstart/backend).

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
