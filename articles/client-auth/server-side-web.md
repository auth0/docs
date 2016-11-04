---
title: Authentication for Server-side Web Apps
description: Explains how to authenticate users in a Server-side Web application. 
---

# Authentication for Server-side Web Apps

You can use the Auth0 Authentication API to create server-side web applications that uses OAuth 2.0 authorization to authenticate users. 

## Overview

Auth0 exposes OAuth 2.0 endpoints for authenticating any user. You can redirect the user from your web application to these endpoints in the web browser. Auth0 will handle the authentication of the user, and then redirect the user back to the `redirect_uri` (also referred to as the Callback URL), returning an `authorization_code` in the query string parameters of the Callback URL. This `authorization_code` can then be exchanged for an `id_token` which contains the identity of the user. 

## The Authentication Flow

The OAuth 2.0 Authorization Framework allows for different kinds of authorization flows (called [Grant Types](https://tools.ietf.org/html/rfc6749#section-1.3)) depending on the type of application. The flow used for Server-side Web applications is known as the [Authorization Code flow](https://tools.ietf.org/html/rfc6749#section-1.3.1).

The Authorization Code flow is initiated by redirecting the user in the web browser to the Auth0 `/authorize` endpoint. Auth0 will then display the Auth0 Lock dialog, allowing the user to enter their credentials or alternatively sign in with any other configured [Identity Provider](/identityproviders).

After the user has authenticated, Auth0 will redirect the browser back to the **Redirect URI** (also called **Callback URL**), passing along an `authorization_code` parameter in the query string of the Callback URL. This code can then be exchanged for an `id_token` by making a request to the `/oauth/token` endpoint.

The `id_token` is a [JSON Web Token (JWT)](/jwt) and contains various attributes - referred to as _Claims_ - regarding the user, such as the user's name, email address, profile picture etc. The `id_token` can be decoded to extract the claims and you are free to use these inside of your application, to display a user's name and profile image for example.

![](/media/articles/client-auth/server-side-web/server-side-web-flow.png)

1. The Client initiates the flow and redirects the user to the Authorization Server.
2. The user authenticates.
3. The Authorization Server redirects to the `redirect_uri` with an `authorization_code` in the query string.
4. The Client sends the `authorization_code` together with the `redirect_uri` and the Client Id/Client Secret to the Authorization Server.
5. The Authorization Server validates this information and returns an `id_token`.

## Registering your Client

The first thing you need to do is to create a new client in Auth0. An Auth0 client maps to your application and allows it to use Auth0 for authentication.

Navigate to the [Auth0 Dashboard](${manage_url}) and click on the [Clients](${manage_url}/#/clients) menu option on the left. Create a new Client by clicking on the **Create Client** button.

The **Create Client** window will open, allowing you to enter the name of your new application. Choose **Regular Web Applications** as the **Client Type** and click on the **Create** button to create the new client.

![](/media/articles/client-auth/server-side-web/create-client.png)

!!!Once the client has been created you can navigate to the **Settings** tab of the client and in the **Allowed Callback URLs** field add a URL where Auth0 must redirect to after the user has authenticated, e.g. `https://YOUR_APP/callback`. 

This URL must be part of your application, as your application will need to retrieve the `code` and exchange it for the `id_token`.

![](/media/articles/client-auth/server-side-web/allowed-callback-url.png)

## Calling the Authorization URL

The URL used when authenticating a user is `https://${account.namespace}/authorize`. This is the initial endpoint to which a user must be redirected. This will handle checking whether any SSO session is active, authenticating the user and also potentially redirect the user directly to any Identity Provider to handle authentication.

This endpoint supports the following query string parameters:

| Parameter | Description |
|:------------------|:---------|
| response_type | The response type specifies the Grant Type you want to use. This can be either `code` or `token`. For server-side web applications using the Authorization Code Flow this **must be set** to `code` |
| client_id | The Client ID of the Client you registered in Auth0. This can be found on the **Settings** tab of your Client in the Auth0 Dashboard |
| scope | Specifies the claims (i.e. attributes) of the user you want the be returned in the `id_token`. To obtain an `id_token` you need to specify at least a scope of `openid` (if no scope is specified then `openid` is implied). You can also request other scopes, so for example to return the user's name and profile picture you can request a scope of `openid name picture`.<br/><br/>You can read up more about [scopes](/scopes). |
| redirect_uri | The URL in your application where the user will be redirected to after they have authenticated, e.g. `https://YOUR_APP/callback`<br><br>**Note:** Be sure to add this URL to the list of **Allowed Callback URLs** in the **Settings** tab of your Client inside the [Auth0 Dashboard](${manage_url}) |
| connection | This is an optional parameter which allows you to force the user to sign in with a specific connection. You can for example pass a value of `github` to send the user directly to GitHub to log in with their GitHub account.<br /><br /> If this parameter is not specified the user will be presented with the normal Auth0 Lock screen from where they can sign in with any of the available connections. You can see the list of configured connections on the **Connections** tab of your client.  |
| state | The state parameter will be sent back should be used for XSRF and contextual information (like a return url) |

## Exhanging the `access_code` for an `id_token`

After the user has authenticated, Auth0 will call back to the URL specified in the `redirect_uri` query string parameter which was passed to the `/authorize` endpoint. When calling back to this URL, Auth0 will pass along an `access_token` in the `code` query string parameter of the URL, e.g.

```text
https://YOUR_APP/callback?code=2OKj...
```

You application will need to handle the request to this callback URL, extract the `access_code` from the `code` query string parameter and call the `/oauth/token` endpoint of the Auth0 Authentication API in order to exchange the `access_code` for the `id_token`:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"authorization_code\",\"client_id\": \"${account.clientId}\",\"client_secret\": \"${account.clientSecret}\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"redirect_uri\": \"https://YOUR_APP/callback\"}"
  }
}
```

The response from `/oauth/token` contains an `access_token`, `id_token` and `token_type` values (and also potentially a `refresh_token`), for example:

```json
{
  "access_token": "AP16...",
  "id_token": "eyJ0...",
  "token_type": "Bearer"
}
```

The `token_type` will be set to **Bearer** and the `id_token` will be a [JSON Web Token (JWT)](/jwt) containing information about the user. You will need to decode the `id_token` in order to read the claims (i.e. attributes) of the user. The [JWT section of our website](/jwt) contains more information about the structure of a JWT.

You can refer to the [libraries section on the JWT.io website](https://jwt.io/#libraries-io) in order to obtain a library for your programming language of choice which will assist you in decoding the `id_token`.

Once the JWT is decoded, you can extract the information about the user from the Payload of the `id_token`. This is a JSON structure and will contain the claims (attributes) about the user as well as some other metadata.

### The `id_token` Payload

An example payload for an `id_token` may look something like this:

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

::: panel-info Debugging a JWT
The [JWT.io website](https://jwt.io) has a handy debugger which will allow you to debug any JSON Web Token. This is useful is you quickly want to decode a JWT to see the information contained in the token.
:::

### Keeping the user logged in

Auth0 will assist you in authenticating a user, but it is up to you to keep track in your application of whether or not a user is logged in. You can use a cookie or other session storage to keep track of whether a user is logged in or not, and also to store the claims of the user which was extracted from the `id_token`.

You can then use those claims inside of your application to display the user's information or otherwise personalize the user's experience.

## Examples

### A Basic Authentication Request

The following is the most basic request you can make to the `/authorize` endpoint. It will display the Lock screen and allow a user to sign in with any of the configured connections. 

```text
https://${account.namespace}/authorize
  ?response_type=code
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https://YOUR_APP/callback
```

After the user has authenticated, they will be redirected back to the `redirect_uri` with the `access_code` in the `code` query string parameter:

```text
https://YOUR_APP/callback?code=2OKj...
```

You can then exchange the `access_code` for an `id_token`. This is an example of the decoded payload of the `id_token` which will be returned:

```json
{
  "iss": "https://auth0pnp.auth0.com/",
  "sub": "auth0|581...",
  "aud": "xvt9...",
  "exp": 1478112929,
  "iat": 1478076929
}
```

### Requesting the Name and Profile Picture

You can request a user's name and profile picture by requesting the `name` and `picture` scopes. 

```text
https://${account.namespace}/authorize
  ?response_type=code
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https://YOUR_APP/callback
  &scope=openid%20name%20picture
```

After the user has authenticated, they will be redirected back to the `redirect_uri` with the `access_code` in the `code` query string parameter:

```text
https://YOUR_APP/callback?code=2OKj...
```

You can then exchange the `access_code` for an `id_token`. The name and profile picture will be available in the `name` and `picture` claims of the returned `id_token`:

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

### Requesting a User Log In With GitHub

You can send a user directly to the GitHub authentication screen by passing the value of **github** to the `connection` parameter. Note that we also request the `openid`, `name`, `picture` and `email` scopes:

```text
https://${account.namespace}/authorize
  ?response_type=code
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https://YOUR_APP/callback
  &scope=openid%20name%20picture%20email
  &connection=github
```

After the user has authenticated, they will be redirected back to the `redirect_uri` with the `id_token` and `token_type` passed as parameters in the hash fragment:

After the user has authenticated, they will be redirected back to the `redirect_uri` with the `access_code` in the `code` query string parameter:

```text
https://YOUR_APP/callback?code=2OKj...
```

You can then exchange the `access_code` for an `id_token`. The user's name and profile picture and email address will be available in the `name`, `picture` and `email` claims of the returned `id_token`. You will also notice that the `sub` claim contains the User's unique ID returned from GitHub:

```json
{
  "name": "Jerrie Pelser",
  "picture": "https://avatars.githubusercontent.com/u/1006420?v=3",
  "email": "jerrie@...",
  "email_verified": true,
  "iss": "https://auth0pnp.auth0.com/",
  "sub": "github|100...",
  "aud": "xvt...",
  "exp": 1478114742,
  "iat": 1478078742
}
```