---
title: Authentication for Mobile & Desktop Apps
description: Explains how to authenticate users in a mobile or desktop application. 
toc: true
---

# Authentication for Mobile & Desktop Apps

You can easily authenticate users in your mobile and desktop applications by using either the Lock client libraries, or by calling the Auth0 OAuth 2.0 endpoints yourself. 

## Overview

Auth0 exposes OAuth 2.0 endpoints for authenticating any user. You can call these endpoints through an embedded browser in your application, and then intercept the request to the callback URL to extract the `id_token` which contains the user's profile information.

We also make a set of client libraries available which encapsulates all the logic for you and makes it much easier to implement authentication in all the popular mobile and desktop platforms. Please refer to our [Native Quickstarts](/quickstart/native) to get started with any of these.

## The Authentication Flow

The OAuth 2.0 Authorization Framework allows for different kinds of authorization flows (called [Grant Types](https://tools.ietf.org/html/rfc6749#section-1.3)) depending on the type of application. The flow used for mobile applications is known as the [Implicit Grant flow](https://tools.ietf.org/html/rfc6749#section-1.3.2).

The Implicit Grant flow is initiated by redirecting the user in an embedded web browser inside of your application to the Auth0 `/authorize` endpoint. Auth0 will then display the Auth0 Lock dialog, allowing the user to enter their credentials or alternatively sign in with any other configured [Identity Provider](/identityproviders).

After the user has authenticated, Auth0 will redirect the browser back to the `redirect_uri` (also known as the **Callback URL**), passing along an `id_token` parameter in the [hash fragment](https://en.wikipedia.org/wiki/Fragment_identifier) or the URL. The `id_token` is a [JSON Web Token (JWT)](/jwt) and contains various attributes - referred to as _Claims_ - regarding the user, such as the user's name, email address, profile picture etc.

The `id_token` can be decoded to extract the claims and you can use these inside of your application, to display a user's name and profile image for example.

![](/media/articles/client-auth/mobile-desktop/mobile-desktop-flow.png)

1. The Client initiates the flow and redirects the user to the Authorization Server
2. The user authenticates
3. The Authorization Server redirects the user to the `redirect_uri` with an `id_token` in the hash fragment
4. The Client can now extract the token from the hash fragment.  

## Registering your Client

The first thing you need to do is to create a new client in Auth0. An Auth0 client maps to your application and allows it to use Auth0 for authentication.

Navigate to the [Auth0 Dashboard](${manage_url}) and click on the [Clients](${manage_url}/#/clients) menu option on the left. Create a new Client by clicking on the **Create Client** button.

The **Create Client** window will open, allowing you to enter the name of your new application. Choose **Native** as the **Client Type** and click on the **Create** button to create the new client.

![](/media/articles/client-auth/mobile-desktop/create-client.png) 

Once the client has been created you can navigate to the **Settings** tab of the client and in the **Allowed Callback URLs** field add the URL `https://${account.namespace}/mobile`. Save the Settings.

![](/media/articles/client-auth/mobile-desktop/allowed-callback-url.png)

## Calling the Authorization URL

The URL used when authenticating a user is `https://${account.namespace}/authorize`. This is the initial endpoint to which a user must be redirected. This will handle checking whether any SSO session is active, authenticating the user and also potentially redirect the user directly to any Identity Provider to handle authentication.

This endpoint supports the following query string parameters:

| Parameter | Description |
|:------------------|:---------|
| response_type | The response type specifies the Grant Type you want to use. This can be either `code` or `token`. For mobile applications using the Implicit Grant Flow this **must be set** to `token` |
| client_id | The Client ID of the Client you registered in Auth0. This can be found on the **Settings** tab of your Client in the Auth0 Dashboard |
| scope | Specifies the claims (i.e. attributes) of the user you want the be returned in the `id_token`. To obtain an `id_token` you need to specify at least a scope of `openid` (if no scope is specified then `openid` is implied). You can also request other scopes, so for example to return the user's name and profile picture you can request a scope of `openid name picture`.<br/><br/>You can read up more about [scopes](/scopes). |
| redirect_uri | The URL where the user will be redirected to after they have authenticated. For mobile applications you should specify this as `https://${account.namespace}/mobile`<br><br>**Note:** Be sure to add this URL to the list of **Allowed Callback URLs** in the **Settings** tab of your Client inside the [Auth0 Dashboard](${manage_url}) |
| connection | This is an optional parameter which allows you to force the user to sign in with a specific connection. You can for example pass a value of `google-oauth2` to send the user directly to Google to log in with their Google account.<br /><br /> If this parameter is not specified the user will be presented with the normal Auth0 Lock screen from where they can sign in with any of the available connections. You can see the list of configured connections on the **Connections** tab of your client.  |
| state | The state parameter will be sent back should be used for XSRF and contextual information (like a return url) |

## Handling the callback

After the user has authenticated, Auth0 will call back to the URL specified in the `redirect_uri` query string parameter which was passed to the `/authorize` endpoint. When calling back to this URL, Auth0 will pass along the `id_token` and the `token_type` in the hash fragment of the URL, e.g.

```text
https://${account.namespace}/mobile#id_token=eyJ0...&token_type=Bearer
```

The `token_type` will be set to **Bearer** and the `id_token` will be a [JSON Web Token (JWT)](/jwt) containing information about the user. You can extract both of these values from the URL using basic string manipulation techniques in whatever programming language you are using.

As mentioned, the `id_token` is a JWT and you will need to decode this token in order to read the claims (i.e. attributes) of the user. The [JWT section of our website](/jwt) contains more information about the structure of a JWT.

You can also refer to the [libraries section on the JWT.io website](https://jwt.io/#libraries-io) in order to obtain a library for your programming language of choice which will assist you in decoding the `id_token`.

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

Auth0 will assist you in authenticating a user, but it is up to you to keep track in your application of whether or not a user is logged in. You can keep a global variable or a singleton object inside your application which will keep track of whether the user has logged in.

You can also use this object to store information about the user (e.g. name, profile image, etc.) and then use those inside of your application to display the user's information or otherwise personalize the user's experience.

## Examples

### A Basic Authentication Request

The following is the most basic request you can make to the `/authorize` endpoint. It will display the Lock screen and allow a user to sign in with any of the configured connections. 

```text
https://${account.namespace}/authorize
  ?response_type=token
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https://${account.namespace}/mobile
```

After the user has authenticated, they will be redirected back to the `redirect_uri` with the `id_token` and `token_type` passed as parameters in the hash fragment:

```text
https://${account.namespace}/mobile
  #id_token=eyJ0...
  &token_type=Bearer
```

And this is an example of the decoded payload of the `id_token` which will be returned:

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
  ?response_type=token
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https://${account.namespace}/mobile
  &scope=openid%20name%20picture
```

After the user has authenticated, they will be redirected back to the `redirect_uri` with the `id_token` and `token_type` passed as parameters in the hash fragment:

```text
https://${account.namespace}/mobile
  #id_token=eyJ0...
  &token_type=Bearer
```

The name and profile picture will be available in the `name` and `picture` claims of the returned `id_token`:

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
  ?response_type=token
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https://${account.namespace}/mobile
  &scope=openid%20name%20picture%20email
  &connection=github
```

After the user has authenticated, they will be redirected back to the `redirect_uri` with the `id_token` and `token_type` passed as parameters in the hash fragment:

```text
https://${account.namespace}/mobile
  #id_token=eyJ0...
  &token_type=Bearer
```

The user's name and profile picture and email address will be available in the `name`, `picture` and `email` claims of the returned `id_token`. You will also notice that the `sub` claim contains the User's unique ID returned from GitHub:

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
