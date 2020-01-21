---
title: Authentication for Server-side Web Apps
description: Explains how to authenticate users in a Server-side Web application.
toc: true
topics:
  - oauth2
  - authentication
  - server-side-apps
contentType: 
    - concept
    - how-to
useCase:
  - add-login
---

# Authentication for Server-side Web Apps

You can use the Auth0 Authentication API to create server-side web applications that uses OAuth 2.0 and <dfn data-key="openid">OpenID Connect (OIDC)</dfn> to authenticate users and get their authorization to access protected resources.

## Overview

Auth0 exposes endpoints that you can use to authenticate users and get their authorization. 

You can redirect the user from your web application to these endpoints in the web browser. Auth0 will handle the authentication of the user, and then redirect the user back to a pre-configured callback URL, returning an authorization code in the query string parameters of the callback URL. This code can then be exchanged for an [ID Token](/tokens/concepts/id-tokens) (which contains information about the identity of the user) and an [Access Token](/tokens/concepts/access-tokens).

## The Authentication Flow

The OAuth 2.0 Authorization Framework allows for different kinds of authorization flows (called [Grant Types](https://tools.ietf.org/html/rfc6749#section-1.3)) depending on the type of application. The flow used for Server-side Web applications is known as the [Authorization Code flow](https://tools.ietf.org/html/rfc6749#section-1.3.1).

The Authorization Code flow is initiated by redirecting the user in the web browser to the Auth0 `/authorize` endpoint. Auth0 will then display the Auth0 Lock dialog, allowing the user to enter their credentials or alternatively sign in with any other configured [Identity Provider](/identityproviders).

After the user has authenticated, Auth0 will redirect the browser back to the **Redirect URI** (also called **Callback URL**), passing along a `code` parameter in the query string of the Callback URL. This `code` can then be exchanged for an [ID Token](/tokens/concepts/id-tokens) by making a request to the `/oauth/token` endpoint.

The ID Token is a [JSON Web Token (JWT)](/tokens/concepts/jwts) and contains various attributes regarding the user, such as the user's name, email address, profile picture and so on. These attributes are referred to as **Claims** and they can be extracted from the ID Token and used in your application (for example, to display a user's name and profile image).

::: note
You will also receive an [Access Token](/tokens/concepts/access-tokens) which you can use to call the [Authentication API's `/userinfo` endpoint](/api/authentication#get-user-info) or your own APIs. For more information on calling APIs web apps running on the server, see [Calling APIs from Server-side Web Apps](/api-auth/grant/authorization-code)
:::

![Authentication flow for server-side web apps](/media/articles/client-auth/server-side-web/server-side-web-flow.png)

1. The Application initiates the flow and redirects the user to the Authorization Server.
2. The user authenticates.
3. The Authorization Server redirects to the `redirect_uri` with a `code` in the query string.
4. The Application sends the `code` together with the Client ID, Client Secret and `redirect_uri` to the Authorization Server.
5. The Authorization Server validates this information and returns an ID Token.

## Register your Application

The first thing you need to do is to create a new application in Auth0. An Auth0 application maps to your application and allows it to use Auth0 for authentication.

Navigate to the [Auth0 Dashboard](${manage_url}) and click on the [Applications](${manage_url}/#/applications) menu option on the left. Create a new Application by clicking on the **Create Application** button.

The **Create Application** window will open, allowing you to enter the name of your new application. Choose **Regular Web Applications** as the **Application Type** and click on the **Create** button to create the new application.

![](/media/articles/client-auth/server-side-web/create-client.png)

Once the application has been created you can navigate to the **Settings** tab of the application and in the **Allowed Callback URLs** field add a URL where Auth0 must redirect to after the user has authenticated, such as `${account.callback}`.

This URL must be part of your application, as your application will need to retrieve the `code` and exchange it for the ID Token.

![](/media/articles/client-auth/server-side-web/allowed-callback-url.png)

Next, click on **Show Advanced Settings**. Go to the **OAuth** tab and ensure that you have enabled the **OIDC Conformant** switch:

![](/media/articles/client-auth/server-side-web/oidc-conformant.png)

Save the Settings.

## Call the Authorization URL

The URL used when authenticating a user is `https://${account.namespace}/authorize`. This is the initial endpoint to which a user must be redirected. This will handle checking whether any <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> [session](/sessions) is active, authenticating the user and also potentially redirect the user directly to any Identity Provider to handle authentication.

This endpoint supports the following query string parameters:

| Parameter | Description |
|:------------------|:---------|
| response_type | The response type specifies the Grant Type you want to use. For server-side web applications using the Authorization Code Flow this **must be set** to `code` |
| client_id | The Client ID of the Application you registered in Auth0. This can be found on the **Settings** tab of your Application in the Auth0 Dashboard |
| scope | Specifies the claims (or attributes) of the user you want the be returned in the ID Token. To get an ID Token in the response, you need to specify at least the scope of `openid` in the request. If you want to return the user's full profile information, you can request `openid profile`.<br/><br/>You can read the [scopes documentation](/scopes) for more information. |
| redirect_uri | The URL in your application where the user will be redirected to after they have authenticated, such as `${account.callback}`|
| connection | This is an optional parameter which allows you to force the user to sign in with a specific connection. You can for example pass a value of `github` to send the user directly to GitHub to log in with their GitHub account.<br /><br /> If this parameter is not specified the user will be presented with the normal Auth0 Lock screen from where they can sign in with any of the available connections. You can see the list of configured connections on the **Connections** tab of your application.  |

::: note
  Be sure to add the **redirect_uri** URL to the list of **Allowed Callback URLs** in the **Settings** tab of your Application inside the [Auth0 Dashboard](${manage_url}).
:::

## Exchange the code for an ID Token

After the user has authenticated, Auth0 will call back to the URL specified in the `redirect_uri` query string parameter which was passed to the `/authorize` endpoint. When calling back to this URL, Auth0 will pass along a `code` as a query string parameter of the URL, such as

```text
${account.callback}?code=tQPUv...
```

You application will need to handle the request to this callback URL, extract the `code` query string parameter and call the `/oauth/token` endpoint of the Auth0 Authentication API in order to exchange the `code` for the ID Token:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
  ],
  "postData": {
    "mimeType": "application/x-www-form-urlencoded",
    "params": [
      {
        "name": "grant_type",
        "value": "authorization_code"
      },
      {
        "name": "client_id",
        "value": "${account.clientId}"
      },
      {
        "name": "client_secret",
        "value": "YOUR_CLIENT_SECRET"
      },
      {
        "name": "code",
        "value": "YOUR_AUTHORIZATION_CODE"
      },
      {
        "name": "redirect_uri",
        "value": "https://${account.callback}"
      }
    ]
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

The `token_type` will be set to **Bearer** and the `id_token` will be a [JSON Web Token (JWT)](/tokens/concepts/jwts) containing information about the user. You will need to decode the ID Token in order to read the claims (or attributes) of the user. The [JWT section of our website](/tokens/concepts/jwts) contains more information about the structure of a JWT.

You can refer to the [libraries section on the JWT.io website](https://jwt.io/#libraries-io) in order to obtain a library for your programming language of choice which will assist you in decoding the ID Token.

Once the JWT is decoded, you can extract the information about the user from the payload of the ID Token. This is a JSON structure and will contain the claims (attributes) about the user as well as some other metadata.

### The ID Token payload

An example payload for an ID Token may look something like this:

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
| sub | The unique identifier of the user. This is guaranteed to be unique per user and will be in the format (identity provider)&#124;(unique id in the provider), such as github&#124;1234567890. |
| iss | The _issuer_. A case-sensitive string or URI that uniquely identiﬁes the party that issued the JWT. For an Auth0 issued ID Token, this will be **the URL of your Auth0 tenant**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| aud | The _audience_. Either a single case-sensitive string or URI or an array of such values that uniquely identify the intended recipients of this JWT. For an Auth0 issued ID Token, this will be the **Client ID of your Auth0 Application**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| exp | The _expiration time_. A number representing a speciﬁc date and time in the format “seconds since epoch” as [deﬁned by POSIX6](https://en.wikipedia.org/wiki/Unix_time). This claim sets the exact moment from which this **JWT is considered invalid**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| iat | The _issued at time_. A number representing a speciﬁc date and time (in the same format as `exp`) at which this **JWT was issued**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |

The exact claims contained in the ID Token will depend on the `scope` parameter you sent to the `/authorize` endpoint. In an ID Token issued by Auth0, the **registered claims** and the `sub` claim will always be present, but the other claims depends on the `scope`. You can refer to the [examples below](#examples) to see examples of how the scope influences the claims being returned.

::: note
The [JWT.io website](https://jwt.io) has a handy debugger which will allow you to debug any JSON Web Token. This is useful is you quickly want to decode a JWT to see the information contained in the token.
:::

### Keep the user logged in

Auth0 will assist you in authenticating a user, but it is up to you to keep track in your application of whether or not a user is logged in. You can use a cookie or other session storage to keep track of whether a user is logged in or not, and also to store the claims of the user which was extracted from the ID Token.

You can then use those claims inside of your application to display the user's information or otherwise personalize the user's experience.

## Examples

### A Basic Authentication Request

The following is the most basic request you can make to the `/authorize` endpoint. It will display the Lock screen and allow a user to sign in with any of the configured connections.

```text
https://${account.namespace}/authorize
  ?response_type=code
  &client_id=${account.clientId}
  &redirect_uri=${account.callback}
  &scope=openid
```

After the user has authenticated, they will be redirected back to the `redirect_uri` with a `code` query string parameter:

```text
${account.callback}?code=2OKj...
```

You can then exchange the `code` for an ID Token. This is an example of the decoded payload of the ID Token which will be returned:

```json
{
  "iss": "https://auth0pnp.auth0.com/",
  "sub": "auth0|581...",
  "aud": "xvt9...",
  "exp": 1478112929,
  "iat": 1478076929
}
```

### Request the Name and Profile Picture

You can request a user's profile information, for example their name and profile picture, by requesting the `profile` scope in addition to the `openid` scope:

```text
https://${account.namespace}/authorize
  ?response_type=code
  &client_id=${account.clientId}
  &redirect_uri=${account.callback}
  &scope=openid%20profile
```

After the user has authenticated, they will be redirected back to the `redirect_uri` with a `code` query string parameter:

```text
${account.callback}?code=2OKj...
```

You can then exchange the `code` for an ID Token. The profile attributes of the user, such as the name and profile picture will be available in the `name` and `picture` claims of the returned ID Token:

```json
{
  "name": "jerrie@...",
  "picture": "https://s.gravatar.com/avatar/6222081fd7dcea7dfb193788d138c457?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fje.png",
  "iss": "https://auth0pnp.auth0.com/",
  "sub": "auth0|581...",
  "aud": "xvt...",
  "exp": 1478113129,
  "iat": 1478077129
}
```

### Request a User Log In With GitHub

You can send a user directly to the GitHub authentication screen by passing the value of **github** to the `connection` parameter:

```text
https://${account.namespace}/authorize
  ?response_type=code
  &client_id=${account.clientId}
  &redirect_uri=${account.callback}
  &scope=openid%20profile
  &connection=github
```

::: note
You can just as easily request a user log in with other social providers, like Google or Facebook. All you have to do is configure the corresponding connection in the [dashboard](${manage_url}/#/connections/social) and change the `connection` value of this call to `/authorize` with the name of the connection to use (`google-oauth2` for Google, `facebook` for Facebook, and so forth). You can get the connection's name from the _Settings_ of the connection in the [dashboard](${manage_url}/#/connections/social). For more info:
- [Identity Providers Supported by Auth0](/identityproviders)
- [Social Login using the Authentication API](/api/authentication#social)
:::

After the user has authenticated, they will be redirected back to the `redirect_uri` with a `code` query string parameter:

```text
${account.callback}?code=2OKj...
```

You can then exchange the `code` for an ID Token. Since we also requested the `profile` scope, the user's Github profile attributes will also be available. In the example below you will notice the `name`, `nickname` and `picture` attributes are returned with the values from GitHub. You will also notice that the `sub` claim contains the User's unique ID returned from GitHub:

```json
{
  "name": "Jerrie Pelser",
  "nickname": "jerriep",
  "picture": "https://avatars.githubusercontent.com/u/1006420?v=3",
  "iss": "https://auth0pnp.auth0.com/",
  "sub": "github|100...",
  "aud": "xvt...",
  "exp": 1478114742,
  "iat": 1478078742
}
```
