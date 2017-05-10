---
description: How to execute an Implicit Grant flow from a SPA Client application.
---

<%= include('../../_includes/_pipeline2') %>

# How to implement the Implicit Grant

<div class="alert alert-info">
  This tutorial will help you implement the Implicit Grant. If you are looking for some theory on the flow refer to <a href="/api-auth/grant/implicit">Call APIs from Client-side Web Apps</a>.
</div>

The __Implicit Grant__ is an OAuth 2.0 flow that [client-side apps](/quickstart/spa) use in order to access an API. In this document we will work through the steps needed in order to implement this: get the user's authorization, get a token and access an API using the token.

## 1. Get the User's Authorization

First, your app should get consent from the user to invoke the API on their behalf. Auth0 will authenticate the user and obtain consent, unless consent has been previously given.

To initiate the flow, send the user to the [authorization URL](/api/authentication#implicit):

```text
https://${account.namespace}/authorize?
  audience=YOUR_API_AUDIENCE&
  scope=YOUR_SCOPE&
  response_type=YOUR_RESPONSE_TYPE&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  nonce=YOUR_CRYPTOGRAPHIC_NONCE
  state=YOUR_OPAQUE_VALUE
```

Where:

* `audience`: The unique identifier of the API the app wants to access. Use the value of the __Identifier__ field at your [API Settings](${manage_url}/#/apis). If you can't see this page, enable the __Enable APIs Section__ toggle at [Account Settings > Advanced](${manage_url}/#/account/advanced).

* `scope`: The scopes which you want to request authorization for. These must be separated by a space. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, custom claims that must conform to a namespaced format (see panel below for more info), or any scopes supported by the target API (for example, `read:contacts`). Note that user's consent will be requested, every time the `scope` value changes.

  ::: panel-info Custom claims namespaced format
  Auth0 returns profile information in a [structured claim format as defined by the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). This means that in order to add custom claims to ID tokens or access tokens, they must conform to a namespaced format to avoid possible collisions with standard OIDC claims. For example, if you choose the namespace `https://foo.com/` and you want to add a custom claim named `myclaim`, you would name the claim `https://foo.com/myclaim`, instead of `myclaim`. You can [add namespaced claims using Rules](#optional-customize-the-tokens).
  :::

* `response_type`: Indicates the type of credentials returned in the response. For this flow you can either use `token`, to get only an `access_token`, or `id_token token`, to get both an `id_token` and an `access_token`.

* `client_id`: Your application's Client ID. You can find this value at your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).

* `redirect_uri`: The URL to which the Auth0 will redirect the user's browser after authorization has been granted by the user. The `access_token` (and optionally an `id_token`) will be available in the hash fragment of this URL. This URL must be specified as a valid callback URL under your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).

* `state`: An opaque value the client adds to the initial request that Auth0 includes when redirecting back to the client. This value must be used by the client to prevent CSRF attacks, [click here to learn more](/protocols/oauth-state).

* `nonce`: A string value which will be included in the response from Auth0, [used to prevent token replay attacks](/api-auth/tutorials/nonce). It is required for `response_type=id_token token`.

For example:

```html
<a href="https://${account.namespace}/authorize?scope=appointments%20contacts&audience=appointments:api&response_type=id_token%20token&client_id=${account.clientId}&redirect_uri=${account.callback}">
  Sign In
</a>
```

## 2. Extract the Access Token

After Auth0 has redirected back to the app, you can extract the `access_token` from the hash fragment of the URL:

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

## 3. Call the API

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

## Optional: Customize the Tokens

<%= include('../../_includes/_api-auth-customize-tokens') %>

If you wish to execute special logic unique to the Implicit grant, you can look at the `context.protocol` property in your rule. If the value is `oidc-implicit-profile`, then the rule is running during the Implicit grant.

## Keep reading

<i class="notification-icon icon-budicon-345"></i>&nbsp;[Implicit Grant overview](/api-auth/grant/implicit)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[How to protect your SPA against replay attacks](/api-auth/tutorials/nonce)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[Silent authentication for SPAs](/api-auth/tutorials/silent-authentication)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[How to configure an API in Auth0](/apis)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[Why you should always use access tokens to secure an API](/api-auth/why-use-access-tokens-to-secure-apis)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[Single Page App Quickstarts](/quickstart/spa)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[ID Token](/tokens/id-token)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[Access Token](/tokens/access-token)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[Client Authentication for Client-side Web Apps](/client-auth/client-side-web)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[Authentication API: GET /authorize](/api/authentication#implicit-grant)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[The OAuth 2.0 protocol](/protocols/oauth2)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[The OpenID Connect protocol](/protocols/oidc)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[Tokens used by Auth0](/tokens)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[RFC 6749: The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)
