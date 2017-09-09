---
title: Login
default: true
description: This tutorial demonstrates how to integrate Auth0 authentication into any conventional server-based web application.
budicon: 
---

This guide explains in general terms how to integrate Auth0 authentication into a conventional server-based web app serving static HTML pages to the user. 

## Overview

This is how user authentiation happens between a conventional server-side web application and the Auth0 service. 

1. Your application redirects the user's browser to Auth0 `/authorize` endpoint, with a *redirect URI* in the query string.
2. The user logs in, using the Auth0 login form on that page.
3. Auth0 authenticates the user. 
    - Authentication is performed against the list of users provided by you to Auth0.
4. Auth0 redirects the user to your `redirect_uri`, with an *Authorization Code* in the querystring.
5. Your application calls the Auth0 /oauth/token endpoint with the Authorization Code, asking to exchange it with an access_token.
6. Auth0 authenticates the web app, validates the Authorization Code, and responds back with the token.
7. The web application decodes and verifies the token, which confirms the user's identity.
8. Your application uses sessions or cookies to persist a user login.

## Register Your App as a Client

Go to the [Clients](${manage_url}/#/clients) page from the [Auth0 Dashboard](${manage_url}). Edit the default client or create a new client by clicking **Create Client**.

Name your new application, and set the Client Type to **Regular Web Applications** as the **Client Type**.

### Set Allowed Callback URI

When your app redirects a user to Auth0, the querystring will include a callback URI. After authentication completes, the user will be redirected to this URI.

${include('../_callbackRegularWebApp')}

While you are editing your Client settings, update your Allowed Callbacks list to include the redirect URI you plan to use.

### Enable OIDC Conformance

Before you leave Client Setting, click on **Show Advanced Settings**. Go to the **OAuth** tab and make sure tha the **OIDC Conformant** switch is enabled.

Save your settings.

## Add Users

Before users can login, you need to [add some registered users](/user-profile).

## Create a Log In Link

Your users will log in to your site using the Auth0 authentication portal at the URI `https://${account.namespace}/authorize`.

To facilitate this, you will provide a link from your site with the following query parameters:

| Parameter | Value |
|:----------|:---------|
| response_type | `code` |
| scope | `openid` |
| redirect_uri | The URI that the user will be redirected to after authentication (`${account.callback}`)|

```html
<a href="https://${account.namespace}/authorize?response_type=code&scope=openid&redirect_uri=${account.callback}">Log In</a>
```

## Handle the Callback



After the user has authenticated, Auth0 will redirect the user to the URI specified in the `redirect_uri` parameter of the query string. A query string will be add to the redirect URI, providing a code.

```text
${account.callback}?code=tQPUv...
```

Your application must then:

 - handle the request, responding to the user appropriately;
 - extract the value of the `code` parameter;
 - call `/oauth/token` endpoint.
 
Since your application will *not* have received the ID token when the user first attempts to access the callback URI, you have two choics:

 - Serve an intermediary page which then redirects once the user's identity has been verified
 - Wait to complete the request until the user's identity has been verified.

In the mean time, you will need to verify the user's identy by getting an `id_token`.


## Exchange the `code` for an `id_token`

Call the `oauth/token` endpoint.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"authorization_code\",\"client_id\": \"${account.clientId}\",\"client_secret\": \"${account.clientSecret}\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"redirect_uri\": \"${account.callback}\"}"
  }
}
```

The response from `/oauth/token` contains `access_token`, `expires_in`, `id_token` and `token_type` values (and also potentially a `refresh_token`), for example:

```json
{
  "access_token": "subBe48...",
  "expires_in": 86400,
  "id_token": "eyJ0eXAi...",
  "token_type": "Bearer"
}
```

The `token_type` will be set to **Bearer** and the `id_token` will be a [JSON Web Token (JWT)](/jwt) containing information about the user. 

## Decode the JWT

Decode the `id_token` to read the claims (that is, the identity and attributes) of the user. See the [JWT section of our website](/jwt) for more information about the structure of a JWT.

Refer to the [libraries section on the JWT.io website](https://jwt.io/#libraries-io) in order to obtain a library for your programming language of choice which will assist you in decoding the `id_token`.

Once the JWT is decoded, extract the information about the user from the Payload of the `id_token`. 

### The `id_token` Payload

The payload for an `id_token` will look something like this:

```json
{
  "name": "Jerrie Pelser",
  "email": "jerrie@j...",
  "picture": "https://s.gravatar.com/avatar/6222081fd7dcea7dfb193788d138c457?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fje.png",
  "iss": "https://auth0pnp.auth0.com/",
  "sub": "auth0|581...",
  "aud": "xvt...",
  "exp": 1478113129,
  "iat": 1478077129
}
```

The payload above contains the following claims:


| Parameter | Description |
|:------------------|:---------|
| name | The name of the user which is returned from the Identity Provider. |
| email | The email address of the user which is returned from the Identity Provider. |
| picture | The profile picture of the user which is returned from the Identity Provider. |
| sub | The unique identifier of the user. This is guaranteed to be unique per user and will be in the format (identity provider)&#124;(unique id in the provider), e.g. github&#124;1234567890. |
| iss | The _issuer_. A case-sensitive string or URI that uniquely identiﬁes the party that issued the JWT. For an Auth0 issued `id_token`, this will be **the URL of your Auth0 tenant**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| aud | The _audience_. Either a single case-sensitive string or URI or an array of such values that uniquely identify the intended recipients of this JWT. For an Auth0 issued `id_token`, this will be the **Client ID of your Auth0 Client**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| exp | The _expiration time_. A number representing a speciﬁc date and time in the format “seconds since epoch” as [deﬁned by POSIX6](https://en.wikipedia.org/wiki/Unix_time). This claim sets the exact moment from which this **JWT is considered invalid**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| iat | The _issued at time_. A number representing a speciﬁc date and time (in the same format as `exp`) at which this **JWT was issued**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |

The exact claims contained in the `id_token` will depend on the `scope` parameter you sent to the `/authorize` endpoint. In an `id_token` issued by Auth0, the **registered claims** and the `sub` claim will always be present, but the other claims depends on the `scope`. You can refer to the [examples below](#examples) to see examples of how the scope influences the claims being returned.

::: note
The [JWT.io website](https://jwt.io) has a handy debugger which will allow you to debug any JSON Web Token. This is useful is you quickly want to decode a JWT to see the information contained in the token.
:::

### Keep the user logged in

It is up to you to use a cookie or other session storage to keep track of a logged-in user in your application.

