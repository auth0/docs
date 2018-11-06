---
title: Authentication for Mobile & Desktop Apps
description: Explains how to authenticate users in a mobile or desktop application.
toc: true
topics:
  - authentication
  - oauth2
  - mobile-apps
  - desktop-apps
contentType: 
    - concept
    - tutorial
useCase:
  - add-login
---

# Implement Authentication for Mobile & Desktop Apps

You can authenticate users of your mobile/desktop [applications](/applications) by:

* Using [Universal Login](/hosted-pages/login), Auth0's implementation of a centralized authentication flow that provides a standard set of behaviors and a customizable user interface;
* Using one of the [Auth0 SDKs](/libraries), which are client-side libraries that **do not** include a user interface but allow for expanded customization of the authentication behavior and appearance of the login screen;
* Calling the Auth0 [Authentication API](/api/authentication) endpoints, which allows you to integrate with Auth0 without requiring the user of Auth0's libraries.

This article will cover how to call the Auth0 [Authentication API](/api/authentication) endpoints with the [Authorization Code Grant using Proof Key for Code Exchange (PKCE)](/api-auth/grant/authorization-code-pkce) during the authentication and authorization process.

For most common types of applications, we have SDKs available which handle the PKCE protocol for you. The exact implementation will be different based on the technology being used. Please refer to our [Mobile / Native App Quickstarts](/quickstart/native), select the appropriate Quickstart based on your application, and follow the code samples provided.

## Overview

Auth0 exposes endpoints that you can use to authenticate users and get their authorization. 

You can call these endpoints through an embedded browser in your **native** application. After authentication completes, you can return an [ID Token](/tokens/id-token) (which contains information about the identity of the user) and an [Access Token](/tokens/concepts/overview-access-tokens).

::: note
Instead of following this tutorial, you can use any of Auth0's client libraries. They encapsulate all the logic required and make it easier for your to implement authentication. Please refer to our [Native Quickstarts](/quickstart/native) to get started.

For our mobile app, we will implement the [OAuth 2.0 Authorization Code Grant using Proof Key for Code Exchange](/api-auth/grant/authorization-code-pkce).
:::

::: warning
The Authorization Code Grant using PKCE should only be used for Native Applications.
:::

## Prerequisites

1. Register your Application

Before implementing authentication, you will need to [register your Application](/applications) with Auth0 using the Dashboard. When registering, select an **Application Type** of Native, and add an **Allowed Callback URL** of `https://${account.namespace}/mobile`.

## Steps

1. Create the code challenge and code verifier
2. Authorize the user
3. Obtain an ID Token
4. Extract Info from the ID Token




### Step 1: Create a Random Key and the Code Challenge

First, you will need to generate and store a `code_verifier`, which is a cryptographically random key that, along with its transformed value (called the `code_challenge`), will be sent to Auth0 for an `authorization_code`.

For sample scripts, to generate a `code_verifier` and a `code_challenge`, refer to [Execute an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce#1-create-a-code-verifier).

### Step 2: Authorize the User

Once you've created the `code_verifier` and the `code_challenge`, you'll need to get the user's authorization. This is technically the beginning of the authorization flow, and this step may include one or more of the following processes:

* Authenticating the user;
* Redirecting the user to an Identity Provider to handle authentication;
* Checking for active SSO sessions.

To authorize the user, your application must send the user to the [authorization URL](/api/authentication#authorization-code-grant-pkce-) (which includes the `code_challenge` you generated in the previous step, as well as the method you used to generate the `code_challenge`). Your URL should follow this format:

```text
https://${account.namespace}/authorize?
    scope=SCOPE&
    response_type=code&
    client_id=${account.clientId}&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=${account.namespace}/mobile
```

Note that the sample Authorization URL doesn't include an `audience` parameter. In this scenario, your app needs to authenticate only the user, not access an API, so we omit `audience`.

For details on the request parameters, refer to [Execute an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce#3-get-the-user-s-authorization).

As an example, your HTML snippet for your authorization URL might look like the following:

```html
<a href="https://${account.namespace}/authorize?
  scope=openid%20profile&
  response_type=code&
  client_id=${account.clientId}&
  code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&
  code_challenge_method=S256&
  redirect_uri=https://${account.namespace}/mobile">
  Sign In
</a>
```

If all goes well, you'll receive an `HTTP 302` response:

```text
HTTP/1.1 302 Found
Location: https://${account.namespace}/mobile?code=AUTHORIZATION_CODE
```

Note the authorization code included at the end of the included URL.

### Step 3: Obtain an ID Token

Using the authorization code obtained in step 2, you can obtain the ID Token by making the appropriate `POST` call to the [tokens endpoint](api/authentication#authorization-code-pkce-).

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"authorization_code\",\"client_id\": \"${account.clientId}\",\"code_verifier\": \"YOUR_GENERATED_CODE_VERIFIER\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"redirect_uri\": \"https://${account.namespace}/mobile\" }"
  }
}
```

For details on the request parameters, refer to [Execute an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce#4-exchange-the-authorization-code-for-an-access-token).

If all goes well, you'll receive an HTTP 200 response with the following payload:

```json
{
  "access_token":"eyJz93a...k4laUWw",
  "refresh_token":"GEbRxBN...edjnXbL",
  "id_token":"eyJ0XAi...4faeEoQ",
  "token_type":"Bearer",
  "expires_in":86400
}
```

::: note
You can use the Access Token to call the [Authentication API's `/userinfo` endpoint](/api/authentication#get-user-info).
:::

## The ID Token

Once you've decoded the ID Token, you can extract user information from it. The JSON payload contains the user claims (attributes), as well as metadata, and it will look something like this:

```json
{
  "name": "John Smith",
  "email": "jsmith@example.com",
  "picture": "https://example.com/profile-pic.png",
  "iss": "https://auth0user.auth0.com/",
  "sub": "auth0|581...",
  "aud": "xvt...",
  "exp": 1478113129,
  "iat": 1478077129
}
```

For additional details, please see our docs [on the ID Token and its claims](/tokens/id-token#id-token-payload).

::: note
For a list of libraries you can use to verify and decode tokens refer to [JWT.io](https://jwt.io/#libraries-io).
:::

## Example Use Cases

This section covers use cases that illustrate the authentication process using PKCE.

### Request the User's Name and Profile Picture

In addition to the usual authentication, this example shows how you can request additional user details.

We assume that your app is capable of generating the appropriate `code_verifier` and `code_challenge`.

To return the user's `name` and `picture`, add the appropriate scopes to your call to the `/authorize` endpoint. Therefore, the initial authorization URL is as follows:

```text
https://${account.namespace}/authorize?
    scope=openid%20name%20picture&
    response_type=code&
    client_id=${account.clientId}&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=${account.namespace}/mobile
```

After the user submits the request, the app receives an `TTP 302` response with a URL containing the authorization code at the end: `https://${account.namespace}/callback?code=AUTHORIZATION_CODE`

Using the authorization code, you can obtain the ID Token by making a `POST` call to the [tokens](/api/authentication#authorization-code-pkce-) endpoint.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"authorization_code\",\"client_id\": \"${account.clientId}\",\"code_verifier\": \"YOUR_GENERATED_CODE_VERIFIER\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"redirect_uri\": \"${account.namespace}/mobile\" }"
  }
}
```

If all goes well, you'll receive an HTTP 200 response with the following payload:

```json
{
  "access_token":"eyJz93a...k4laUWw",
  "refresh_token":"GEbRxBN...edjnXbL",
  "id_token":"eyJ0XAi...4faeEoQ",
  "token_type":"Bearer",
  "expires_in":86400
}
```

By extracting the ID Token, which now contains the additional `name` and `picture` claims you requested, you'll see something similar to the following once you've decoded the payload:

```json
{
  "name": "auth0user@...",
  "picture": "https://example.com/profile-pic.png",
  "iss": "https://auth0user.auth0.com/",
  "sub": "auth0|581...",
  "aud": "xvt...",
  "exp": 1478113129,
  "iat": 1478077129
}
```

### Request a User Log In with GitHub

You can send a user directly to the GitHub authentication screen by passing the `connection` parameter and setting its value to `github`.

:::panel Logins with Social Providers
While this example shows how to log in users via GitHub, you can just as easily request that a user log in with other Social providers, such as Google or Facebook.

To do this, configure the appropriate Connection in the [Auth0 Dashboard](${manage_url}/#/connections/social) and change the `connection` value of the call to `/authorize` to the name of the Connection (`google-oauth2` for Google, `facebook` for Facebook, and so on). You can get the Connection's name from the *Settings* tab of the [Connections](${manage_url}/#/connections/social) page.

Read more:

* [Identity Providers Supported by Auth0](/identityproviders)
* [Social Login using the Authentication API](/api/authentication#social)
:::

```text
https://${account.namespace}/authorize?
    scope=openid%20name%20picture&
    response_type=code&
    client_id=${account.clientId}&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=https://${account.namespace}/mobile&
    connection=github
```

After the user submits the request, the app receives an `HTTP 302` response with a URL containing the authorization code at the end: `https://${account.namespace}/callback?code=AUTHORIZATION_CODE`

Using the authorization code, you can obtain the ID Token by making a `POST` call to the [tokens](/api/authentication#authorization-code-pkce-) endpoint.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"authorization_code\",\"client_id\": \"${account.clientId}\",\"code_verifier\": \"YOUR_GENERATED_CODE_VERIFIER\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"redirect_uri\": \"${account.namespace}/mobile\" }"
  }
}
```

If all goes well, you'll receive an `HTTP 200` response with the following payload:

```json
{
  "access_token":"eyJz93a...k4laUWw",
  "refresh_token":"GEbRxBN...edjnXbL",
  "id_token":"eyJ0XAi...4faeEoQ",
  "token_type":"Bearer",
  "expires_in":86400
}
```

You can pull the user's name, profile picture, and email address from the `name`, `picture`, and `email` claims of the returned ID Token. Note that the `sub` claim contains the user's unique ID as returned from GitHub:

```json
{
  "name": "John Smith",
  "picture": "https://avatars.example.com",
  "email": "jsmith@...",
  "email_verified": true,
  "iss": "https://auth0user.auth0.com/",
  "sub": "github|100...",
  "aud": "xvt...",
  "exp": 1478114742,
  "iat": 1478078742
}
```

## How to implement

For most common types of applications, we have SDKs available which handle the PKCE protocol for you. The exact implementation will be different based on the technology being used. Please refer to our [Mobile / Native App Quickstarts](/quickstart/native), select the appropriate Quickstart based on your application, and follow the code samples provided.
