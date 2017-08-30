---
order: 04
title: Mobile + API
image: /media/articles/architecture-scenarios/mobile-api.png
extract: Mobile Application which talks to an API. The application will use OpenID Connect with the Authorization Code Grant using Proof Key for Code Exchange (PKCE) to authenticate users.
description: Explains the architecture scenario with a mobile application client communicating with an API.
toc: true
---

# Mobile + API

In this scenario we will build a Timesheet API for a fictitious company named ABC Inc. The API will allow management of timesheet entries for an employee or a contractor.

We will also be building a Mobile Application which will be used to view and log timesheet entries in the centralized timesheet database using the API.


::: panel TL;DR
* Auth0 provides API Authentication and Authorizaion as a means to secure access to API endpoints (see [API Authentication and Authorization](#api-authentication-and-authorization))
* For authorizing a Non Interactive Client (a CLI, service or daemon where no user interaction is involved) Auth0 supports the Client Credentials grant (see [Client Credentials Grant](#client-credentials-grant))
* Both the Non Interactice Client and the API must be configured in the Auth0 Dashboard (see [Auth0 Configuration](#auth0-configuration))
* The API will be secured by ensuring that a valid Access Token (which is implemented as a JSON Web Token) is passed in the HTTP Authorization header when calls are made to the API (see [Implement the API](#implement-the-api))
* Upon successful authorization an Access Token is issued to the Non Interactive Client (see [Get an Access Token](#get-an-access-token))
* The Non Interactive Client can in turn use this Access Token to pass along as an HTTP Authorization header to authenticate calls to API endpoints (see [Invoke the API](#invoke-the-api))
:::

## The Premise

ABC Inc. is a consulting startup company. Currently they have approximately 100 employees and they also outsource several activities to external contractors. All employees and external contractors are required to fill in their timesheets every week. 

The company has built a timesheets application, a scenario we covered in [Single Sign-On for Regular Web Apps](/architecture-scenarios/application/web-app-sso). The internal employees use this web app to fill in their timesheets but the company wants to replace it with a Mobile application. The app will be used to log timesheet entries and send the data to the centralized timesheet database using the API.

### Goals & Requirements

ABC wants to build a flexible solution. There are potential multiple clients which should be able to log timesheet entries, as well as batch processes which may upload timesheet entries from other, external systems.

Hence the company has decided to develop a single Timesheets API which will be used to log time not only by this Mobile Client, but by all other clients as well. They want to put in place a security architecture that is flexible enough to accommodate this. ABC Inc. wants to ensure that a large part of the code and business logic for the application can be shared across the different client applications.

It is required that only authorized users and applications are allowed access to the Timesheets API.

<%= include('../_includes/_api-overview-of-solution.md') %>

<%= include('../_includes/_api-authentication-and-authorization.md') %>

## Proof Key for Code Exchange (PKCE)

OAuth 2 provides several grant types for different use cases. In this particular use case, we want to access the API from a mobile application, which will use the OAuth 2.0 [Proof Key for Code Exchange](/api-auth/grant/authorization-code-pkce) to do so.

The [Authorization Code Grant](/api-auth/grant/authorization-code) has some security issues, when implemented on native applications. For instance, a malicious attacker can intercept the `authorization_code` returned by Auth0 and exchange it for an [Access Token](/tokens/access-token) (and possibly a [Refresh Token](/tokens/refresh-token)).

The Proof Key for Code Exchange (PKCE) (defined in [RFC 7636](https://tools.ietf.org/html/rfc7636)) is a technique used to mitigate this authorization code interception attack.

With PKCE, the Client creates, for every authorization request, a cryptographically random key called `code_verifier` and its transformed value called `code_challenge`, which is sent to Auth0 to get the `authorization_code`. When the Client receives the `authorization_code`, it will send the code and the `code_verifier` to Auth0's token endpoint to exchange them for the requested tokens.

![PKCE](/media/articles/architecture-scenarios/mobile-api/authorization-code-grant-pkce.png)

1. The native app initiates the flow and redirects the user to Auth0 (specifically to the [/authorize endpoint](/api/authentication#authorization-code-grant-pkce-)), sending the `code_challenge` and `code_challenge_method` parameters.
2. Auth0 redirects the user to the native app with an `authorization_code` in the querystring.
3. The native app sends the `authorization_code` and `code_verifier` together with the `redirect_uri` and the `client_id` to Auth0. This is done using the [/oauth/token endpoint](/api/authentication?http#authorization-code-pkce-).
4. Auth0 validates this information and returns an `access_token` (and optionally a `refresh_token`).
5. The native app can use the `access_token` to call the API on behalf of the user.

## Auth0 Configuration

In this section we will review all the configurations we need to apply at the [Auth0 Dashboard](${manage_url}/).

### Create the API

Click on the [APIs menu option](${manage_url}/#/apis) on the left, and click the Create API button.

You will be required to supply the following details for your API:

- __Name__: a friendly name for the API. Does not affect any functionality.
- __Identifier__: a unique identifier for the API. We recommend using a URL but note that this doesn't have to be a publicly available URL, Auth0 will not call your API at all. This value cannot be modified afterwards.
- __Signing Algorithm__: the algorithm to sign the tokens with. The available values are `HS256` and `RS256`. When selecting RS256 the token will be signed with the tenant's private key. For more details on the signing algorithms see the Signing Algorithms paragraph below.

![Create API](/media/articles/architecture-scenarios/mobile-api/create-api.png)

Fill in the required information and click the __Create__ button.

<%= include('../_includes/_api-signing-algorithms.md') %>

<%= include('../_includes/_api-configure-scopes.md') %>

### Create the Client

There are four client types in Auth0: __Native__ (used by mobile or desktop apps), __Single Page Web Applications__, __Regular Web Applications__ and __Non Interactive Clients__ (used by CLIs, Daemons, or services running on your backend). For this scenario we want to create a new Client for our Mobile Application, hence we will use Native as the client type.

To create a new Client, navigate to the [dashboard](${manage_url}) and click on the [Clients](${manage_url}/#/clients}) menu option on the left. Click the __+ Create Client__ button.

Set a name for your Client (we will use `Timesheets Mobile`) and select `Native` as the type.

Click __Create__.

![Create Client](/media/articles/architecture-scenarios/mobile-api/create-client.png)

That's it for now. When we are done with the Mobile app implementation we will revisit the dashboard and this Client's settings to make some changes in its configuration.

## Inside the Implementation

<%= include('../_includes/_api-implement.md') %>

### Implement the Mobile App

In this section we will see how we can implement a Mobile application for our scenario.

::: note
[See the implementation in Android.](/architecture-scenarios/application/mobile-api/mobile-implementation-android#1-set-up-the-application)
:::

#### Authorize the User

To authorize the user we will implement an [Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce). The mobile application should first send the user to the [authorization URL](/api/authentication#authorization-code-grant-pkce-) along with the `code_challenge` and the method used to generate it:

```text
https://${account.namespace}/authorize?
    audience=API_AUDIENCE&
    scope=SCOPE&
    response_type=code&
    client_id=YOUR_CLIENT_ID&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=https://YOUR_APP/callback
```

The `GET` request to the authorization URL should include the following values:

- __domain__: The value of your Auth0 Domain. You can retrieve it from the Settings of your Client at the [Auth0 Dashboard](${manage_url}/#/clients).
- __client_id__: The value of your Auth0 Client Id. You can retrieve it from the Settings of your Client at the [Auth0 Dashboard](${manage_url}/#/clients).
- __audience__: The value of your API Identifier. You can retrieve it from the Settings of your Client at the [Auth0 Dashboard](${manage_url}/#/clients).
- __scope__: The [scopes](/scopes) which determine the information to be returned in the `id_token` and `access_token`. A scope of `openid profile email offline_access` will return all the user profile information the `id_token` and return a `refresh_token`. You also need to request the scopes required to call the API, in this case the `read:timesheets create:timesheets` scopes. This will ensure that the `access_token` has these scopes.
- __response_type__: Indicates the Authentication Flow to use. For a Mobile application using PKCE, this should be set to `code`.
- __code_challenge__: The generated code challenge from the code verifier. You can find instructions on generating a code challenge [here](/api-auth/tutorials/authorization-code-grant-pkce#1-create-a-code-verifier).
- __code_challenge_method__: Method used to generate the challenge. Auth0 supports only `S256`.
- __redirect_uri__: The URL which Auth0 will redirect the browser to after authorization has been granted by the user. The Authorization Code will be available in the code URL parameter. This URL must be specified as a valid callback URL under your [Client's Settings](${manage_url}/#/clients).

::: note
[See the implementation in Android.](/architecture-scenarios/application/mobile-api/mobile-implementation-android#2-authorize-the-user)
:::

#### Get the Credentials

After a successful request to the authorization URL, you should receive the following response:

```text
HTTP/1.1 302 Found
Location: https://${account.namespace}/callback?code=AUTHORIZATION_CODE
```

Next you can exchange the `authorization_code` from the response for an Access Token that can be used to call your API. Perform a `POST` request to the [Token URL](/api/authentication#authorization-code-pkce-) including the following data:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"authorization_code\",\"client_id\": \"${account.clientId}\",\"code_verifier\": \"YOUR_GENERATED_CODE_VERIFIER\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"redirect_uri\": \"com.myclientapp://myclientapp.com/callback\", }"
  }
}
```

- __grant_type__: This must be set to `authorization_code`.
- __client_id__: The value of your Auth0 Client Id. You can retrieve it from the Settings of your Client at the [Auth0 Dashboard](${manage_url}/#/clients).
- __code_verifier__: Cryptographically random key that was used to generate the `code_challenge` passed to [authorization URL](/api/authentication#authorization-code-grant-pkce-) (`/authorize`).
- __code__: The `authorization_code` received from the previous authorize call.
- __redirect_uri__: The URL must match the `redirect_uri` passed in the previous section to `/authorize`.

The response from the Token URL will contain:

```json
{
  "access_token": "eyJz93a...k4laUWw",
  "refresh_token": "GEbRxBN...edjnXbL",
  "id_token": "eyJ0XAi...4faeEoQ",
  "token_type": "Bearer",
  "expires_in":86400
}
```

- __access_token__: An `access_token` for the API, specified by the `audience`.
- __refresh_token__: A [Refresh Token](/tokens/refresh-token/current) will only be present if you included the `offline_access` scope AND enabled __Allow Offline Access__ for your API in the Dashboard.
- __id_token__: An `id_token` JWT containing user profile information.
- __token_type__: A string containing the type of token, this will always be a Bearer token.
- __expires_in__: The amount of seconds until the `access_token` expires.

You will need to store the above credentials in local storage for use in calling your API and retrieving the user profile.

::: note
[See the implementation in Android.](/architecture-scenarios/application/mobile-api/mobile-implementation-android#store-credentials)
:::

#### Get the User Profile

To retrieve the [User Profile](/api/authentication?http#user-profile), your mobile application can decode the [ID Token](/tokens/id-token) using one of the [JWT libraries](https://jwt.io/#libraries-io). This is done by [verifying the signature](/tokens/id-token#verify-the-signature) and [validating the claims](/tokens/id-token#validate-the-claims) of the token. After validating the ID token, you can access its payload containing the user information:

```json
{
  "email_verified": false,
  "email": "test.account@userinfo.com",
  "clientID": "q2hnj2iu...",
  "updated_at": "2016-12-05T15:15:40.545Z",
  "name": "test.account@userinfo.com",
  "picture": "https://s.gravatar.com/avatar/dummy.png",
  "user_id": "auth0|58454...",
  "nickname": "test.account",
  "created_at": "2016-12-05T11:16:59.640Z",
  "sub": "auth0|58454..."
}
```

::: note
[See the implementation in Android.](/architecture-scenarios/application/mobile-api/mobile-implementation-android#3-get-the-user-profile)
:::

#### Call the API

To access secured resources from your API, the authenticated user's `access_token` needs to be included in requests that are sent to it. This is accomplished by sending the `access_token` in an `Authorization` header using the `Bearer` scheme.

::: note
[See the implementation in Android.](/architecture-scenarios/application/mobile-api/mobile-implementation-android#4-call-the-api)
:::

#### Renew the Token

To refresh your `access_token`, perform a `POST` request to the `/oauth/token` endpoint using the `refresh_token` from your authorization result.

A [Refresh Token](/tokens/refresh-token/current) will only be present if you included the `offline_access` scope in the previous authorization request and  enabled __Allow Offline Access__ for your API in the Dashboard.

Your request should include:

* __grant_type__: This must be set to `refresh_token`.
* __client_id__: The value of your Auth0 Client Id. You can retrieve it from the Settings of your Client at the [Auth0 Dashboard](${manage_url}/#/clients).
* __client_secret__: (optional) Your application's Client Secret.
* __refresh_token__: the `refresh_token` to use, from the previous authentication result.

The response will include the new `access_token`:

```json
{
  "access_token": "eyJz93a...k4laUWw",
  "refresh_token": "GEbRxBN...edjnXbL",
  "id_token": "eyJ0XAi...4faeEoQ",
  "token_type": "Bearer",
  "expires_in":86400
}
```

::: note
[See the implementation in Android.](/architecture-scenarios/application/mobile-api/mobile-implementation-android#store-credentials)
:::

## Conclusion

In this document we covered a simple scenario: an API, used by a mobile application to allow employees to capture their timesheets.

We learned about the Authorization Code Grant with PKCE, what an access token is, how to configure an API in Auth0, how to configure a mobile application to communicate securely with this API, how to define and secure our API endpoints, how to use the provided libraries to validate the access token and how to retrieve a new one from Auth0.

We started by describing the business case and the requirements and went on explaining how each requirement can be met and the thought process behind each choice that was made.

We used Node.js for the API implementation and Android for the mobile application. Hopefully though after going through this document you are able to build this using the technologies you prefer.

Don't forget to check back for new business cases and more complex architecture scenarios!
