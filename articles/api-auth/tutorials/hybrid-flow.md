---
title: How to Implement the Hybrid Flow
description: How to execute the Hybrid Flow
toc: true
topics:
  - api-authentication
  - oidc
  - hybrid
contentType: tutorial
useCase:
  - secure-api
  - call-api
---
# How to Implement the Hybrid Flow

The Hybrid Flow is an OIDC grant that allows you to...

## Prerequisites

Before you begin this tutorial, please:

* Check that your Application's [Grant Type property](/applications/application-grant-types) is set appropriately
* [Register your API](/apis#how-to-configure-an-api-in-auth0) with Auth0

## Get the User's Authorization

The first step is to get the user's consent for authentication (and possibly authorization). You can initiate the flow by sending the user to the [authorization URL](/api/authentication#authorization-code-grant)

```text
https://${account.namespace}/authorize?
    audience=YOUR_API_AUDIENCE&
    scope=YOUR_SCOPE&
    response_type=code&
    client_id=${account.clientId}&
    redirect_uri=${account.callback}&
    state=YOUR_OPAQUE_VALUE
```

Where:

* `audience`: The unique identifier of the API the web app wants to access. Use the **Identifier** value on the [Settings](${manage_url}/#/apis) tab for the API you created as part of the prerequisites for this tutorial.

* `scope`: The [scopes](/scopes) which you want to request authorization for. These must be separated by a space. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, custom claims that must conform to a namespaced format, or any scopes supported by the target API (for example, `read:contacts`). Include `offline_access` to get a Refresh Token (make sure that the __Allow Offline Access__ field is enabled in the [API Settings](${manage_url}/#/apis)). The custom scopes must [conform to a namespaced format](/api-auth/tutorials/adoption/scope-custom-claims). For more information on this, refer to the [Namespacing Custom Claims](#optional-customize-the-tokens) panel.

* `response_type`: Denotes the kind of credential that Auth0 will return (code vs token). For this flow, the value must be `code id_token`, `code token`, or `code id_token token`. More specifically, `token` returns an Access Token, `id_token` returns an ID Token, and `code` returns the Authorization Code.

* `client_id`: Your application's Client ID. You can find this value at your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings).

* `state`: An opaque value the application adds to the initial request that Auth0 includes when redirecting back to the application. This value must be used by the application to prevent CSRF attacks, [click here to learn more](/protocols/oauth-state).

* `redirect_uri`: The URL to which Auth0 will redirect the browser after authorization has been granted by the user. The Authorization Code will be available in the `code` URL parameter. This URL must be specified as a valid callback URL under your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings).

For example:

```html
<a href="https://${account.namespace}/authorize?scope=appointments%20contacts&audience=appointments:api&response_type=code&client_id=${account.clientId}&redirect_uri=${account.callback}">
  Sign In
</a>
```

* `nonce`: A string value which will be included in the response from Auth0, [used to prevent token replay attacks](/api-auth/tutorials/nonce). It is required for `response_type=id_token token`.

The purpose of this call is to obtain consent from the user to invoke the API (specified in `audience`) to do certain things (specified in `scope`) on behalf of the user. Auth0 will authenticate the user and obtain consent, unless consent has been previously given.

Note that if you alter the value in `scope`, Auth0 will require consent to be given again.

## 2. Exchange the Authorization Code for an Access Token

If you have plans to call an API, you'll have returned an Authorization Code that can be exchanged with Auth0 for an Access Token.