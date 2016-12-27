---
title: Calling APIs
description: This tutorial demonstrates how to use $.ajaxSetup() to make authenticated API calls.
budicon: 546
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-samples',
  path: '04-Calling-Api',
  requirements: [
    'jQuery 3.1.0'
  ]
}) %>

A common need for any client-side application is to access resources from a data API. Some of these data resources will likely need to be protected such that only the user who is authenticated in the client-side app can access them. This can be achieved by protecting your API's endpoints with your Auth0 JSON Web Key Set (JWKS) and sending the user's **access token** as an `Authorization` header when calling the API.

This step uses a simple Node server to demonstrate how to sends requests from a jQuery app to an API with protected endpoints. For usage with other backend technologies, see the [server API documentation](/quickstart/backend).

The examples in this guide use the AJAX methods that are shipped with jQuery, but you are free to use any other XHR library.

## Enable OAuth 2.0 API Authorization

<%= include('../../_includes/_configure_oauth2aas') %>

## Create a Resource Server (API)

<%= include('../../_includes/_new_api') %>

![Create API](/media/articles/api-auth/api-5.png)
![Update Scopes](/media/articles/api-auth/api-6.png)

<%= include('../../_includes/_create_resource_server') %>

## Configure $.ajax

Requests for protected resources must include the user's **access token** as an `Authorization` header using the `Bearer` scheme. This header will be checked on the server when a request arrives and the JWT contained within will be verified. If the JWT is valid when it reaches the server, the requested resource can be returned. If the JWT is invalid, a `401 Unauthorized` error will be returned.

Configure jQuery's `$.ajaxSetup` to include the user's **access token** as a header.

```js
// app.js

// Configure AJAX calls to include the
// access token as an Authorization header
$.ajaxSetup({
  'beforeSend': function(xhr) {
    if (localStorage.getItem('access_token')) {
      xhr.setRequestHeader(
        'Authorization', 'Bearer ' + localStorage.getItem('access_token')
      );
    }
  }
});
```

With this configuration set, all AJAX requests will contain the user's **access token** as an `Authorization` header (if the access token exists).

## Make Requests to the API

Provide a function to make an AJAX call to the protected API endpoint and a button to trigger the call.

```html
<button class="btn-call-private">Call Private Endpoint</button>
```

```js
// app.js

var btnCallPrivate = $('.btn-call-private');
var privateEndpoint = 'http://localhost:3001/api/private';

btnCallPrivate.click(function(e) {
  e.preventDefault();
  $.get(privateEndpoint).done(function(data) {
    $('.api-call-result').text(data.message);
  }).fail(function(error) {
    $('.api-call-result').text(error.statusText);
  });
});
```

When the button is clicked, a `GET` request is made to `/api/private` endpoint. The user's **access token** will automatically be sent with this call because that behavior was configured in `$.ajaxSetup` above.

The UI in this example has been configured such that the message in the result will be displayed as text in an element with a class of `api-call-result`. Any error messages will be displayed there as well. 