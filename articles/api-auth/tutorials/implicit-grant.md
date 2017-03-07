---
description: How to execute an Implicit Grant flow from a SPA Client application
---

# Execute the Implicit Grant Flow

## 1. Get the User's Authorization

In order to execute an Implicit Grant flow you will need to configure your Client application to send the user to the authorization URL:

```text
https://${account.namespace}/authorize?
  audience={API_AUDIENCE}&
  scope={SCOPE}&
  response_type={RESPONSE_TYPE}&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  nonce={CRYPTOGRAPHIC_NONCE}
  state={OPAQUE_VALUE}
```

Where:

* `audience`: The target API for which the Client Application is requesting access on behalf of the user.
* `scope`: The scopes which you want to request authorization for. These must be separated by a space. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, custom claims that must conform to a namespaced format (see panel below for more info), or any scopes supported by the target API (for example, `read:contacts`).

  ::: panel-info Custom claims namespaced format
  In order to improve compatibility for client applications, Auth0 will now return profile information in a [structured claim format as defined by the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). This means that in order to add custom claims to ID tokens or access tokens, they must conform to a namespaced format to avoid possible collisions with standard OIDC claims. For example, if you choose the namespace `https://foo.com/` and you want to add a custom claim named `myclaim`, you would name the claim `https://foo.com/myclaim`, instead of `myclaim`.
  :::

* `response_type`: Indicates the type of credentials returned in the response. For this flow you can either use `token`, to get only an `access_token`, or `id_token token`, to get both an `id_token` and an `access_token`.
* `client_id`: Your application's Client ID.
* `redirect_uri`: The URL to which the Auth0 will redirect the user's browser after authorization has been granted by the user. The `access_token` (and optionally an `id_token`) will be available in the hash fragment of this URL. This URL must be specified as a valid callback URL under the Client Settings of your application.
* `state`: An opaque value the clients adds to the initial request that Auth0 includes when redirecting the back to the client. This value must be used by the client to prevent CSRF attacks.
* `nonce`: A string value which will be included in the ID token response from Auth0, [used to prevent token replay attacks](/api-auth/tutorials/nonce). It is required for `response_type=id_token token`.

For example:

```html
<a href="https://${account.namespace}/authorize?scope=appointments%20contacts&audience=appointments:api&response_type=id_token%20token&client_id=${account.clientId}&redirect_uri=${account.callback}">
  Sign In
</a>
```

## 2. Extract the Access Token

After Auth0 has redirected back to the Client, you can extract the `access_token` from the hash fragment of the URL:

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

## 3. Use the Access Token

Once you have the `access_token` you can use it to make calls to the API, by passing it as a Bearer Token in the `Authorization` header of the HTTP request:

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

## 4. Verify the Token

Once your API receives a request with a Bearer `access_token`, the first thing to do is to validate the token. This consists of a series of steps, and if any of these fails then the request _must_ be rejected.

For details on the validations that should be performed by the API, refer to [Verify Access Tokens](/api-auth/tutorials/verify-access-token).

## More information

- [Implicit Grant overview](/api-auth/grant/implicit)
- [Authentication API Explorer](/api/authentication#implicit-grant)
- [How to configure your tenant for the new API Authorization flows](/api-auth/tutorials/configuring-tenant-for-api-auth)
- [Mitigate replay attacks](/api-auth/tutorials/nonce)
- [Silent Authentication for SPAs](/api-auth/tutorials/silent-authentication)
