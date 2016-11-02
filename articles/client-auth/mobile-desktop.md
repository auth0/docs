---
title: Authentication for Mobile & Desktop Apps
description: Explains how to authenticate users in a mobile or desktop application. 
---

# Authentication for Mobile & Desktop Apps

You can easily authenticate users in your mobile and desktop applications by using either the Lock client libraries, or by calling the Auth0 OAuth 2.0 endpoints yourself. 

## Overview

Auth0 exposes OAuth 2.0 endpoints for authenticating any user. You can call these endpoints through an embedded browser in your application, and then intercept the request to the callback URL to extract the `id_token` which contains the user's profile information.

We also make a set of client libraries available which encapsulates all the logic for you and makes it much easier to implement authentication in all the popular mobile and desktop platforms. Please refer to our [Native Quickstarts](/quickstart/native) to get started with any of these.

## The Authentication Flow

The OAuth 2.0 Authorization Framework allows for different kinds of authorization flows (called [Grant Types](https://tools.ietf.org/html/rfc6749#section-1.3)) depending on the type of application. The flow used for mobile applications is known as the [Implicit Grant flow](https://tools.ietf.org/html/rfc6749#section-1.3.2).

The Implicit Grant flow is initiated by redirecting the user in an embedded web browser inside of your application to the Auth0 `/authorize` endpoint. Auth0 will then display the Auth0 Lock dialog, allowing the user to enter their credentials or alternatively sign in with any other configured [Identity Provider](https://auth0.com/docs/identityproviders).

After the user has authenticated, Auth0 will redirect the browser back to the **Redirect URI** (also called **Callback URL**), passing along an `id_token` parameter in the query string. This `id_token` is a [JSON Web Token (JWT)](https://auth0.com/docs/jwt) and contains various attributes - referred to as Claims - regarding the user, such as the user's name, email address, etc.

The `id_token` can be decoded to extract the claims and you are free to use these inside of your application, to display a user's name and profile image for example.

!! ADD SOME DIAGRAM HERE :) 

## Registering your Client

The first thing you need to do is to create a new client in Auth0. An Auth0 client maps to your application and allows to use Auth0 for authentication.

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
| scope | Specifies the claims (i.e. attributes) of the user you want the be returned in the `id_token`. To obtain an `id_token` you need to specify at least a claim of `openid` (if no scope is specified then `openid` is implied). You can also request other scopes, so for example to return the user's name and profile picture you can request a scope of `openid name picture`.<br/><br/>You can read up more about [scopes](/scopes). |
| redirect_uri | The URL where the user will be redirected to after they have authenticated. For mobile applications you should specify this as `https://${account.namespace}/mobile` |
| connection | This is an optional parameter which allows you to force the user to sign in with a specific connection. You can for example pass a value of `google-oauth2` to send the user directly to Google to log in with their Google account.<br /><br /> If this parameter is not specified the user will be presented with the normal Auth0 Lock screen from where they can sign in with any of the available connections. You can see the list of configured connections on the **Connections** tab of your client.  |
| state | The state parameter will be sent back should be used for XSRF and contextual information (like a return url) |

## Examples

### The most basic authentication request

The following is the simplist request you can make to the `/authorize` endpoint. It will display the Lock screen and allow a user to sign in with any of the configured connections. 

```text
https://${account.namespace}/authorize
  ?response_type=token
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https://${account.namespace}/mobile
```

After the user has authenticated they will be redirected back to the `redirect_uri`:

```text
https://${account.namespace}/mobile
  ?id_token=eyJ0...
  &token_type=Bearer
```

And this is the decoded payload of the `id_token`:

```json
{
  "iss": "https://auth0pnp.auth0.com/",
  "sub": "auth0|581...",
  "aud": "xvt9...",
  "exp": 1478112929,
  "iat": 1478076929
}
```

### Requesting a user's name and profile picture

You can request a user's name and profile picture by requesting the `name` and `picture` scopes. 

```text
https://${account.namespace}/authorize
  ?response_type=token
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https://${account.namespace}/mobile
  &scope=openid%20
```

After the user has authenticated they will be redirected back to the `redirect_uri`:

```text
https://${account.namespace}/mobile
  ?id_token=eyJ0...
  &token_type=Bearer
```

The name and profile picture will be available in the `name` and `picture` claims of the returned `id_token`:

```json
{
  "name": "jerrie@j...",
  "picture": "https://s.gravatar.com/avatar/6222081fd7dcea7dfb193788d138c457?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fje.png",
  "iss": "https://auth0pnp.auth0.com/",
  "sub": "auth0|581...",
  "aud": "xvt...",
  "exp": 1478113129,
  "iat": 1478077129
}
```

### Requesting a user sign in with GitHub

You can send a user directly to the GitHub login screen by passing the   

```text
https://${account.namespace}/authorize
  ?response_type=token
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https://${account.namespace}/mobile
  &scope=openid%20
  &connection=github
```

After the user has authenticated they will be redirected back to the `redirect_uri`:

```text
https://${account.namespace}/mobile
  ?id_token=eyJ0...
  &token_type=Bearer
```

Once again the user's name and profile picture will be available in the `name` and `picture` claims of the returned `id_token`:

```json
{
  "name": "Jerrie Pelser",
  "picture": "https://avatars.githubusercontent.com/u/1006420?v=3",
  "iss": "https://auth0pnp.auth0.com/",
  "sub": "github|100...",
  "aud": "xvt...",
  "exp": 1478114742,
  "iat": 1478078742
}
```