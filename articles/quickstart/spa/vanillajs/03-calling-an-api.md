---
title: Calling an API
description: This tutorial demonstrates how to make API calls for protected resources on your server.
budicon: 546
topics:
  - quickstarts
  - spa
  - vanillajs
  - apis
github:
    path: 03-Calling-an-API
sample_download_required_data:
  - client
  - api
contentType: tutorial
useCase: quickstart
---
<%= include('../_includes/_calling_api_preamble') %>

<%= include('../_includes/_calling_api_create_api') %>

<%= include('../_includes/_calling_api_create_scope') %>

## Configure your Application

In your `auth0.WebAuth` instance, enter your API identifier as the value for `audience`.
Add your scopes to the `scope` key.

```js
// app.js

var webAuth = new auth0.WebAuth({
  // ...
  audience: '${apiIdentifier}',
  scope: 'openid profile read:messages'
});
```

<%= include('../_includes/_calling_api_use_rules') %>

## Configure a Custom XHR Request

<%= include('../_includes/_calling_api_access_token') %>

To attach the user's Access Token to HTTP calls as an `Authorization` header, add the header as an option to your requests. 

::: note
We recommend you implement a custom function which adds the header automatically.
:::

Create a new function called `callAPI`. The function wraps an XHR request with the user's Access Token included as the `Authorization` header.

```js
// app.js

var apiUrl = 'http://localhost:3001/api';

// ...
function callAPI(endpoint, secured) {
  var url = apiUrl + endpoint;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  if (secured) {
    xhr.setRequestHeader(
      'Authorization',
      'Bearer ' + accessToken
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

<%= include('../_includes/_calling_api_protect_resources') %>
