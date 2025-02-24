---
description: Learn how to execute an Implicit Grant flow from a SPA Client application.
toc: true
topics:
  - api-authentication
  - oidc
  - implicit
contentType: tutorial
useCase:
  - secure-api
  - call-api
---
# Implement the Implicit Grant

::: note
This tutorial will help you implement the Implicit Grant. If you are looking for some theory on the flow refer to [Call APIs from Client-side Web Apps](/api-auth/grant/implicit).
:::

The __Implicit Grant__ is an OAuth 2.0 flow that [client-side apps](/quickstart/spa) use in order to access an API. In this document we will work through the steps needed in order to implement this: get the user's authorization, get a token and access an API using the token.

Before you begin this tutorial, do the following:

* Check that your Application's [Grant Type property](/applications/concepts/application-grant-types) is set appropriately
* [Register your API](/apis#how-to-configure-an-api-in-auth0) with Auth0

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
  nonce=YOUR_CRYPTOGRAPHIC_NONCE&
  state=YOUR_OPAQUE_VALUE
```

Where:

* `audience`: The unique identifier of the API the app wants to access. Use the **Identifier** value on the [Settings](${manage_url}/#/apis) tab for the API you created as part of the prerequisites for this tutorial.

* `scope`: The <dfn data-key="scope">scopes</dfn> which you want to request authorization for. These must be separated by a space. You can request any of the [standard OpenID Connect (OIDC) scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, custom claims that must [conform to a namespaced format](/tokens/guides/create-namespaced-custom-claims), or any scopes supported by the target API (for example, `read:contacts`). Note that user's consent will be requested, every time the `scope` value changes.

* `response_type`: Indicates the type of credentials returned in the response. For this flow you can either use `token` to get only an Access Token, `id_token` to get only an ID Token (if you don't plan on accessing an API), or `id_token token` to get both an ID Token and an Access Token.

* `client_id`: Your application's Client ID. You can find this value at your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings).

* `redirect_uri`: The URL to which the Auth0 will redirect the user's browser after authorization has been granted by the user. The Access Token (and optionally an ID Token) will be available in the hash fragment of this URL. This URL must be specified as a valid callback URL under your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings).

  ::: warning
  Per the [OAuth 2.0 Specification](https://tools.ietf.org/html/rfc6749#section-3.1.2), Auth0 removes everything after the hash and does *not* honor any fragments.
  :::

* `state`: An opaque value the application adds to the initial request that Auth0 includes when redirecting back to the application. This value must be used by the application to prevent CSRF attacks. For more information, see [State Parameter](/protocols/oauth-state).

* `nonce`: A string value which will be included in the response from Auth0, [used to prevent token replay attacks](/api-auth/tutorials/nonce). It is required for `response_type=id_token token`.

For example:

```html
<a href="https://${account.namespace}/authorize?scope=appointments%20contacts&audience=appointments:api&response_type=id_token%20token&client_id=${account.clientId}&redirect_uri=${account.callback}&nonce=12345789">
  Sign In
</a>
```

## 2. Extract the Access Token

After Auth0 has redirected back to the app, the hash fragment of the URL contains the following parameters:
- `id_token`: contains an [ID Token](/tokens/concepts/id-tokens) and is present if the request parameter `response_type` included the value `id_token`, or the `scope` request parameter the value `openid`
- `access_token`: contains an [Access Token](/tokens/concepts/access-tokens) and is present if the request parameter `response_type` included the value `token`
- `token_type`: denotes the type of the [Access Token](/tokens/concepts/access-tokens)
- `expires_in`: the lifetime in seconds of the Access Token. For example, the value `3600` denotes that the [Access Token](/tokens/concepts/access-tokens) will expire in one hour from the time the response was generated
- `state`: present in the response if the `state` parameter was present in the request. Holds the exact value received from the client in the request.

You can extract the `access_token`, and other parameters, from the hash fragment of the URL:

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

  // Optional: an ID Token will be returned by Auth0
  // if your response_type argument contained id_token
  var id_token = getIdToken();

  // Use the Access Token to make API calls
  // ...
});
```

## 3. Call the API

Once you have the `access_token` you can use it to make calls to the API, by passing it as a Bearer Token in the `Authorization` header of the HTTP request:

``` js
// Use the Access Token to make API calls
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

For details on the validations that should be performed by the API, see [Validate Access Tokens](/tokens/guides/validate-access-tokens).

## Optional: Customize the Tokens

<%= include('../../_includes/_api-auth-customize-tokens') %>

If you wish to execute special logic unique to the Implicit grant, you can look at the `context.protocol` property in your rule. If the value is `oidc-implicit-profile`, then the rule is running during the Implicit grant.

## Optional: Silent Authentication

If you need to authenticate your users without a login page (for example, when the user is already logged in via <dfn data-key="single-sign-on">[Single Sign-on (SSO)](/sso)</dfn> scenario) or get a new `access_token` (thus simulate refreshing an expired token), you can use Silent Authentication.

For details on how to implement this, refer to [Silent Authentication](/api-auth/tutorials/silent-authentication).

## Sample application

For an example implementation see the [SPA + API](/architecture-scenarios/application/spa-api) architecture scenario.

This is a series of tutorials that describe a scenario for a fictitious company. The company wants to implement a single-page web app that the employees can use to send their timesheets to the company's Timesheets API using OAuth 2.0. The tutorials are accompanied by a sample that you can access in [GitHub](https://github.com/auth0-samples/auth0-pnp-exampleco-timesheets).

## Keep reading

- [How to protect your SPA against replay attacks](/api-auth/tutorials/nonce)
- [How to configure an API in Auth0](/apis)
- [Application Authentication for Client-side Web Apps](/application-auth/client-side-web)
- [Tokens](/tokens)
