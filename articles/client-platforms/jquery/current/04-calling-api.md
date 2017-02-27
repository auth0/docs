---
title: Calling an API
description: This tutorial demonstrates how to use angular2-jwt in a jQuery application to make authenticated API calls
budicon: 546
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-samples',
  path: '04-Calling-Api',
  requirements: [
    'jQuery 3.1'
  ]
}) %>

<%= include('../../_includes/_calling_api_preabmle') %>

## Create a Modified $.ajax Method

Making an authenticated request from your jQuery application requires that the `access_token` issued to the authenticated user be included in the call. This can be done by adding an `Authorization` header to the request. The API or library used for making requests is at your discrection, but the example in this tutorial uses jQuery's `$.ajax`.

Add a function called `securedPing` to `app.js`. This function should get the user's `access_token` and include it as an `Authorization` header using `xhr.setRequestHeader` in the `beforeSend` hook. In this example, the function takes a single `route` parameter which is a string to be used as the API route to be called.

```js
// app.js

function securedPing(route) {
  var accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw 'Access token must exist to fetch profile';
  }
  $.ajax({
    url: API_URL + route,
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    }
  }).done(function(data) {
    $('#message').append(data.message);
  });
}
```

<%= include('../../_includes/_calling_api_protect_resources') %>