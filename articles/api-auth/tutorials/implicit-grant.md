---
description: How to execute an Implicit Grant flow from a SPA Client application
---

# Executing the Implicit Grant Flow
<%=include('../_preview-warning') %>

In order to execute an Implicit Grant flow you will need to configure your Client application to send the user to the authorization URL:

```text
https://${account.namespace}/authorize?
	audience={API_AUDIENCE}&
	scope={SCOPE}&
	response_type={RESPONSE_TYPE}&
	client_id={AUTH0_CLIENT_ID}&
	redirect_uri={CALLBACK_URL}
```

Where:

* `audience`: The target API for which the Client Application is requesting access on behalf of the user.
* `scope`: The scopes which you want to request authorization for. These must be separated by a space.
* `response_type`: The response type. For this flow you can either use `token` or `id_token token`. This will specify the type of token you will receive at the end of the flow.
* `client_id`: Your application's Client ID.
* `redirect_uri`: The URL to which the Authorization Server (Auth0) will redirect the User Agent (Browser) after authorization has been granted by the User. The `access_token` (and optionally an `id_token`) will be available in the hash fragment of this URL. This URL must be specified as a valid callback URL under the Client Settings of your application.

For example:

```html
<a href="https://${account.namespace}/authorize?scope=appointments%20contacts&audience=appointments:api&response_type=id_token%20token&client_id=${account.clientId}&redirect_uri=https://myclientapp.com/callback">
  Sign In
</a>
```

## Extracting the Access Token

After the Authorization Server has redirected back to the Client, you can extract the `access_token` from the hash fragment of the URL:

```js
function getParameterByName(name) {
  var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function getAccessToken() {
  return getParameterByName('access_token');
}

function getIdToken() {
  return getParameterByName('id_token');
}

$(function () {
  var access_token = getAccessToken();

  // Optional: an id_token will be returned by Auth0
  // if your response_type argument contained id_token
  var id_token = getIdToken();

  // Use the access token to make API calls
  // ...
});
```

## Using the Access Token

Once the `access_token` has been obtained it can be used to make calls to the Resource Server by passing it as a Bearer Token in the `Authorization` header of the HTTP request:

``` js
// Use the access token to make API calls
$('#get-appointments').click(function(e) {
  e.preventDefault();

  $.ajax({
    cache: false,
    url: "http://localhost:7001/api/appointments",
    headers: { "Authorization": "Bearer " + access_token }
  });
});
```
