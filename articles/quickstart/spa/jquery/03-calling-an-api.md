---
title: Calling an API
description: This tutorial demonstrates how to make API calls for protected resources on your server.
budicon: 546
github:
  path: 03-Calling-an-API
sample_download_required_data:
  - client
  - api
---
<%= include('../_includes/_calling_api_preamble') %>

<%= include('../_includes/_calling_api_create_api') %>

<%= include('../_includes/_calling_api_create_scope') %>

## Set the Audience and Scope in `auth0.WebAuth`

In your `auth0.WebAuth` instance, enter your API identifier as the value for `audience`. Add your scopes to the `scope` key. 

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
We recommend you implement a custom function that adds the header automatically. 
:::

Create a new function called `callAPI` which wraps a jQuery `$.ajax` request. If you want to secure the request, you can do it if there is a user's Access Token in local storage. To secure the request, attach the Access Token as the `Authorization` header.

```js
// app.js

var apiUrl = 'http://localhost:3001/api';

// ...
function callAPI(endpoint, secured) {
  var url = apiUrl + endpoint;
  var accessToken = localStorage.getItem('access_token');

  var headers;
  if (secured && accessToken) {
    headers = { Authorization: 'Bearer ' + accessToken };
  }

  $.ajax({
    url: url,
    headers: headers
  })
    .done(function(result) {
      $('#ping-view h2').text(result.message);
    })
    .fail(function(err) {
      $('#ping-view h2').text('Request failed: ' + err.statusText);
    });
}
```

<%= include('../_includes/_calling_api_protect_resources') %>