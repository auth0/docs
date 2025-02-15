---
title: Authentication for Client-side Web Apps
description: Explains how to authenticate users in a Client-side Web application.
toc: true
topics:
  - spa
  - authentication
  - oauth2
  - implicit
contentType: 
    - concept
    - how-to
useCase:
  - add-login
---

# Authentication for Client-side Web Apps

You can use the Auth0 Authentication API to create client-side web applications that use <dfn data-key="openid">[OpenID Connect](/protocols/oidc)</dfn> and [OAuth 2.0](/protocols/oauth2) to authenticate users and get their authorization to access protected resources.

## Overview

Auth0 exposes endpoints that you can use to authenticate users and get their authorization. You can redirect the user from your JavaScript application to these endpoints in the web browser. Auth0 will handle the authentication of the user, get their authorization for the resources your app wants to access, and then redirect the user back to a pre-configured callback URL, returning an [ID Token](/tokens/concepts/id-tokens) and [Access Token](/tokens/concepts/access-tokens) in the hash fragment of the request.

## The Authentication Flow

The OAuth 2.0 Authorization Framework allows for different kinds of authorization flows (called [Grant Types](https://tools.ietf.org/html/rfc6749#section-1.3)) depending on the type of application. The flow used for Client-side Web applications is known as the [Implicit Grant flow](https://tools.ietf.org/html/rfc6749#section-1.3.2).

The Implicit Grant flow is initiated by redirecting the user in the web browser to the Auth0 `/authorize` endpoint. Auth0 will then display the Auth0 Lock dialog, allowing the user to enter their credentials or alternatively sign in with any other configured [Identity Provider](/identityproviders).

After the user has authenticated, Auth0 will redirect the browser back to the **Redirect URI** (also called **Callback URL**), passing along the [ID Token](/tokens/concepts/id-tokens) as parameter in the [hash fragment](https://en.wikipedia.org/wiki/Fragment_identifier). The [ID Token](/tokens/concepts/id-tokens) is a [JSON Web Token (JWT)](/tokens/concepts/jwts) and contains various attributes (referred to as Claims) regarding the user, such as the user's name, email address, profile picture and so on.

The [ID Token](/tokens/concepts/id-tokens) can be decoded to extract the claims and you are free to use these inside of your application, to display a user's name and profile image for example.

::: note
You can potentially also receive an Access Token which can be used to call the [Authentication API's `/userinfo` endpoint](/api/authentication#get-user-info) or your own APIs.

For more information on calling APIs from Client-side Web Apps, please see [Call APIs from Client-side Web Apps](/api-auth/grant/implicit)
:::

![](/media/articles/client-auth/client-side-web/client-side-web-flow.png)

1. The Applications initiates the flow and redirects the user to the Authorization Server
2. The user authenticates
3. The Authorization Server redirects the user to the `redirect_uri` with an ID Token in the hash fragment
4. The Applications can now extract the token from the hash fragment.  

## Register your Applications

The first thing you need to do is to create a new application in Auth0. An Auth0 application maps to your application and allows it to use Auth0 for authentication.

Navigate to the [Auth0 Dashboard](${manage_url}) and click on the [Applications](${manage_url}/#/applications) menu option on the left. Create a new Application by clicking on the **Create Applications** button.

The **Create Applications** window will open, allowing you to enter the name of your new application. Choose **Single-Page Web Applications** as the **Applications Type** and click on the **Create** button to create the new applications.

![](/media/articles/client-auth/client-side-web/create-client.png)

Once the application has been created you can navigate to the **Settings** tab of the applications and in the **Allowed Callback URLs** field add a URL where Auth0 must redirect to after the user has authenticated, such as `https://YOUR_APP/callback`.

This URL must be part of your application, as your application will need to extract the ID Token from the hash fragment of this URL.

![](/media/articles/client-auth/client-side-web/allowed-callback-url.png)

Next, click on **Show Advanced Settings**. Go to the **OAuth** tab and ensure that you have enabled the **OIDC Conformant** switch:

![](/media/articles/client-auth/client-side-web/oidc-conformant.png)

Save the Settings.

## Call the Authorization URL

The URL used when authenticating a user is `https://${account.namespace}/authorize`. This is the initial endpoint to which a user must be redirected. This will handle checking whether any <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> session is active, authenticating the user and also potentially redirect the user directly to any Identity Provider to handle authentication.

This endpoint supports the following query string parameters:

| Parameter | Description |
|:------------------|:---------|
| response_type | The response type specifies the Grant Type you want to use. For client-side web applications using the Implicit Grant Flow, this should be `id_token`. (If you also want to receive an Access Token it should be set to `token id_token`.) |
| client_id | The Client ID of the Applications you registered in Auth0. This can be found on the **Settings** tab of your Applications in the Auth0 Dashboard |
| scope | Specifies the claims (or attributes) of the user you want the be returned in the [ID Token](/tokens/concepts/id-tokens). To obtain an [ID Token](/tokens/concepts/id-tokens) you need to specify at least a scope of `openid`. If you want to return the user's full profile information, you can request `openid profile`.<br/><br/>You can read up more about [scopes](/scopes). |
| redirect_uri | The URL in your application where the user will be redirected to after they have authenticated, such as `https://YOUR_APP/callback`|
| connection | This is an optional parameter which allows you to force the user to sign in with a specific connection. You can for example pass a value of `github` to send the user directly to GitHub to log in with their GitHub account.<br /><br /> If this parameter is not specified, the user will be presented with the normal Auth0 Lock screen from where they can sign in with any of the available connections. You can see the list of configured connections on the **Connections** tab of your applications.  |
| state | The state parameter will be sent back should be used for CSRF and contextual information (like a return url) |
| nonce | A string value which will be included in the response from Auth0, [used to prevent token replay attacks](/api-auth/tutorials/nonce). **This is required.** |

::: note
  Be sure to add the **redirect_uri** URL to the list of **Allowed Callback URLs** in the **Settings** tab of your Applications inside the [Auth0 Dashboard](${manage_url}).
:::

## Handle the callback

After the user has authenticated, Auth0 will call back to the URL specified in the `redirect_uri` query string parameter which was passed to the `/authorize` endpoint. When calling back to this URL, Auth0 will pass along the [ID Token](/tokens/concepts/id-tokens) in the hash fragment of the URL, such as

```text
https://YOUR_APP/callback#id_token=eyJ0...
```

The [ID Token](/tokens/concepts/id-tokens) will be a [JSON Web Token (JWT)](/tokens/concepts/jwts) containing information about the user. You can access the hash fragment using the `window.location.hash` property and then use basic JavaScript string manipulation to access the ID Token.

You will need to decode the [ID Token](/tokens/concepts/id-tokens) in order to read the claims (or attributes) of the user. 

Once the JWT is decoded, you can extract the information about the user from the payload of the [ID Token](/tokens/concepts/id-tokens). This is a JSON structure and will contain the claims (attributes) about the user as well as some other metadata.

The [Auth0.js library](https://auth0.com/docs/libraries/auth0js) can assist you in decoding the JWT by calling the `parseHash` function, and then access the ID Token values from the `idTokenPayload` property:

```html
<html>

<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>

<body>
  <button id="btn-login">
        Log In
    </button>
  <script src="http://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
  <script src="${auth0js_url}"></script>
  <script>
    (function () {
      var webAuth = new auth0.WebAuth({
        domain: '${account.namespace}',
        clientID: '${account.clientId}',
        redirectUri: 'http://localhost:3000',
        responseType: 'id_token',
        scope: 'openid profile'
      });

      var loginBtn = document.getElementById('btn-login');
      loginBtn.addEventListener('click', function (e) {
        e.preventDefault();
        webAuth.authorize();
      });

      function handleAuthentication() {
        webAuth.parseHash(function (err, authResult) {
          if (authResult && authResult.idTokenPayload) {
            window.location.hash = '';
            alert('your user_id is: ' + authResult.idTokenPayload.sub);
          }
        });
      }

      handleAuthentication();
    })();
  </script>
</body>
</html>
```

### The ID Token payload

An example payload for an [ID Token](/tokens/concepts/id-tokens) may look something like this:

```json
{
  "name": "Jerrie Pelser",
  "email": "jerrie@j...",
  "picture": "https://s.gravatar.com/avatar/6222081fd7dcea7dfb193788d138c457?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fje.png",
  "iss": "https://auth0pnp.auth0.com/",
  "sub": "auth0|581...",
  "aud": "xvt...",
  "exp": 1478113129,
  "iat": 1478077129,
  "nonce": "..."
}
```

The payload above contains the following claims:

| Parameter | Description |
|:------------------|:---------|
| name | The name of the user which is returned from the Identity Provider. |
| email | The email address of the user which is returned from the Identity Provider. |
| picture | The profile picture of the user which is returned from the Identity Provider. |
| sub | The unique identifier of the user. This is guaranteed to be unique per user and will be in the format (identity provider)&#124;(unique id in the provider), such as github&#124;1234567890. |
| iss | The _issuer_. A case-sensitive string or URI that uniquely identiﬁes the party that issued the JWT. For an Auth0 issued [ID Token](/tokens/concepts/id-tokens), this will be **the URL of your Auth0 tenant**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| aud | The _audience_. Either a single case-sensitive string or URI or an array of such values that uniquely identify the intended recipients of this JWT. For an Auth0 issued [ID Token](/tokens/concepts/id-tokens), this will be the **Client ID of your Auth0 Applications**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| exp | The _expiration time_. A number representing a speciﬁc date and time in the format “seconds since epoch” as [deﬁned by POSIX6](https://en.wikipedia.org/wiki/Unix_time). This claim sets the exact moment from which this **JWT is considered invalid**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| iat | The _issued at time_. A number representing a speciﬁc date and time (in the same format as `exp`) at which this **JWT was issued**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| nonce | A string value which was sent with the request to the `/authorize` endpoint. This is used to [prevent token replay attacks](/api-auth/tutorials/nonce). |

The exact claims contained in the [ID Token](/tokens/concepts/id-tokens) will depend on the `scope` parameter you sent to the `/authorize` endpoint. In an [ID Token](/tokens/concepts/id-tokens) issued by Auth0, the **registered claims** and the `sub` claim will always be present, but the other claims depends on the `scope`. You can refer to the [examples below](#examples) to see examples of how the scope influences the claims being returned.

::: note
The [JWT.io website](https://jwt.io) has a handy debugger which will allow you to debug any JSON Web Token. This is useful is you quickly want to decode a JWT to see the information contained in the token.
:::

### Keep the user logged in

Auth0 will assist you in authenticating a user, but it is up to you to keep track in your application of whether or not a user is logged in. You can use `localStorage` to keep track of whether a user is logged in or not, and also to store the claims of the user which was extracted from the [ID Token](/tokens/concepts/id-tokens).

You can then use those claims inside of your application to display the user's information or otherwise personalize the user's experience.

## Examples

### A Basic Authentication Request

The following is the most basic request you can make to the `/authorize` endpoint. It will display the Lock screen and allow a user to sign in with any of the configured connections.

```text
https://${account.namespace}/authorize
  ?response_type=id_token
  &client_id=${account.clientId}
  &redirect_uri=${account.callback}
  &nonce=abc
```

After the user has authenticated, they will be redirected back to the `redirect_uri` with the `id_token` passed as parameter in the hash fragment:

```text
${account.callback}
  #id_token=eyJ0...
```

And this is an example of the decoded payload of the [ID Token](/tokens/concepts/id-tokens) which will be returned:

```json
{
  "iss": "https://auth0pnp.auth0.com/",
  "sub": "auth0|581...",
  "aud": "xvt9...",
  "exp": 1478112929,
  "iat": 1478076929,
  "nonce": "abc"
}
```

### Request the Name and Profile Picture

You can request a user's profile attributes, such as name and profile picture, by requesting the `profile` scope.

```text
https://${account.namespace}/authorize
  ?response_type=id_token
  &client_id=${account.clientId}
  &redirect_uri=${account.callback}
  &scope=openid%20profile
  &nonce=abc
```

After the user has authenticated, they will be redirected back to the `redirect_uri` with the `id_token` passed as parameter in the hash fragment:

```text
${account.callback}
  #id_token=eyJ0...
```

The name and profile picture will be available in the `name` and `picture` claims of the returned [ID Token](/tokens/concepts/id-tokens):

```json
{
  "name": "jerrie@...",
  "picture": "https://s.gravatar.com/avatar/6222081fd7dcea7dfb193788d138c457?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fje.png",
  "iss": "https://auth0pnp.auth0.com/",
  "sub": "auth0|581...",
  "aud": "xvt...",
  "exp": 1478113129,
  "iat": 1478077129,
  "nonce": "abc"
}
```

### Request a User Log In With GitHub

You can send a user directly to the GitHub authentication screen by passing the value of **github** to the `connection` parameter. Note that we also request the `openid` and `profile` scopes:

```text
https://${account.namespace}/authorize
  ?response_type=id_token
  &client_id=${account.clientId}
  &redirect_uri=${account.callback}
  &scope=openid%20profile
  &connection=github
  &nonce=abc
```

::: panel Log in with other social providers
You can just as easily request a user log in with other social providers, like Google or Facebook. All you have to do is configure the corresponding connection in the [dashboard](${manage_url}/#/connections/social) and change the `connection` value of this call to `/authorize` with the name of the connection to use (`google-oauth2` for Google, `facebook` for Facebook, and so forth). You can get the connection's name from the _Settings_ of the connection in the [dashboard](${manage_url}/#/connections/social). For more info:
- [Identity Providers Supported by Auth0](/identityproviders)
- [Social Login using the Authentication API](/api/authentication#social)
:::

After the user has authenticated, they will be redirected back to the `redirect_uri` with the `id_token` passed as parameter in the hash fragment:

```text
${account.callback}
  #id_token=eyJ0...
```

The user's name and profile attributes, such as the name, nickname and picture will be available in the `name`, `nickname` and `picture` claims of the returned [ID Token](/tokens/concepts/id-tokens). You will also notice that the `sub` claim contains the User's unique ID returned from GitHub:

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
