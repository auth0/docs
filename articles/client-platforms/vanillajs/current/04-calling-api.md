---
title: Calling an API
description: This tutorial demonstrates how to use angular2-jwt in a JavaScript application to make authenticated API calls
budicon: 546
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-javascript-samples',
  path: '04-Calling-Api',
  requirements: [
    'ECMAScript 5'
  ]
}) %>

<%= include('../../_includes/_calling_api_preabmle') %>

## Create a Modified $.ajax Method

Making an authenticated request from your JavaScript application requires that the `access_token` issued to the authenticated user be included in the call. This can be done by adding an `Authorization` header to the request. The API or library used for making requests is at your discrection, but the example in this tutorial uses a plain `XMLHttpRequest`.

Add a function called `securedPing` to `app.js`. This function should get the user's `access_token` and include it as an `Authorization` header using `xhr.setRequestHeader`. In this example, the function takes a single `route` parameter which is a string to be used as the API route to be called.

```js
// app.js

function callAPI(endpoint, secured) {
  var url = apiUrl + endpoint;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  if (secured) {
    xhr.setRequestHeader(
      'Authorization',
      'Bearer ' + localStorage.getItem('access_token')
    );
  }
  xhr.onload = function() {
    if (xhr.status == 200) {
      // update message
      document.querySelector('#ping-view h2').innerHTML = JSON.parse(
        xhr.responseText
      ).message;
    } else {
      alert('Request failed: ' + xhr.statusText);
    }
  };
  xhr.send();
}
```

<%= include('../../_includes/_calling_api_protect_resources') %>