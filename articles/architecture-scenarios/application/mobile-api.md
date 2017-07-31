---
order: 04
title: Mobile + API
image: /media/articles/architecture-scenarios/mobile-api.png
extract: Mobile Application which talks to an API. The application will use OpenID Connect with the Authorization Code Grant using Proof Key for Code Exchange (PKCE) to authenticate users.
description: Explains the architecture scenario with a mobile application client communicating with an API.
beta: true
---

# Mobile + API

In this scenario we will build a Timesheet API for a fictitious company named ABC Inc. The API will allow management of timesheet entries for an employee or a contractor.

We will also be building a Mobile Application which will be used to view and log timesheet entries in the centralized timesheet database using the API.

## The Premise

ABC Inc. is a consulting startup company. Currently they have approximately 100 employees and they also outsource several activities to external contractors. All employees and external contractors are required to fill in their timesheets every week. 

The company has built a timesheets application, a scenario we covered in [Single Sign-On for Regular Web Apps](/architecture-scenarios/application/web-app-sso). The internal employees use this web app to fill in their timesheets but the company wants to replace it with a SPA. The app will be used to log timesheet entries and send the data to the centralized timesheet database using the API.

### Goals & Requirements

ABC wants to build a flexible solution. There are potential multiple clients which should be able to log timesheet entries, as well as batch processes which may upload timesheet entries from other, external systems.

Hence the company has decided to develop a single Timesheets API which will be used to log time not only by this Mobile Client, but by all other clients as well. They want to put in place a security architecture that is flexible enough to accommodate this. ABC Inc. wants to ensure that a large part of the code and business logic for the application can be shared across the different client applications.

It is required that only authorized users and applications are allowed access to the Timesheets API.

## Overview of Solution

In order to ensure that only authorized users and applications are allowed access to the Timesheets API, ABC Inc. has decided to make use of the [OAuth 2.0 authorization framework](https://tools.ietf.org/html/rfc6749). The framework provides the flexibility the company wants since the different grants can allow them to easily authorize the various types of application which need to communicate with the Timesheets API.

### API Authentication and Authorization

An API is a way to expose functionality of your application to other applications. An application can make a request by sending a message to an endpoint on an API and receive information as a response.

An API endpoint can be secured or not. In our case, since the timesheets are sensitive information that affect reviews and payments, it is important to ensure that only authorized users and applications can call the endpoints on our API. When a client application wants to access protected endpoints on an API it needs to present an access token as proof that it has the required permissions for making the call to the endpoint.

An access token is obtained by authenticating the user with an Authorization Server and the user can then in turn authorize the application to access the API on their behalf.

::: panel What is an Access Token?
An access token (also referred to as `access_token`) is an opaque string representing an authorization issued to the client. It may denote an identifier used to retrieve the authorization information or may self-contain the authorization information (for example, the user's identity, permissions, and so forth) in a verifiable manner.

It is quite common for access tokens to be implemented as [JSON Web Tokens](/jwt).

For more information on Auth0 Access Tokens refer to [Access Token](/tokens/access-token).
:::

An API can enforce fine grained control over who can access the various endpoints exposed by the API. These permissions are expressed as scopes.

When a user authorizes a client application, the application can also indicate which permissions it requires. The user is then allowed to review and grant these permissions. These permissions are then included in the access token as part of the `scope` claim.

Subsequently when the client passes along the access token when making requests to the API, the API can inspect the `scope` claim to ensure that the required permissions were granted in order to call the particular API endpoint.

::: panel What are Scopes?
Each access token may include a list of the permissions that have been granted to the client. When a client authenticates with Auth0, it will specify the list of scopes (or permissions) it is requesting. If those scopes are authorized, then the access token will contain a list of authorized scopes.

For example, the timesheet API may accept four different levels of authorization: reading timesheets (scope `read:timesheets`), creating timesheets (scope `create:timesheets`), deleting timesheets (scope `delete:timesheets`) and approving timesheets (scope `approve:timesheets`).

When a client asks the API to create a new timesheet entry, then the access token should contain the `create:timesheets` scope. In a similar fashion, in order to delete existing timesheets, the access token should contain the `delete:timesheets` scope.

For more information on scopes refer to [Scopes](/scopes).
:::

By using the OAuth 2.0 authorization framework, you can give your own applications or third-party applications limited access to your APIs on behalf of the application itself. Using Auth0, you can easily support different flows in your own APIs without worrying about the OAuth 2.0/OpenID Connect specification, or the many other technical aspects of API authorization.

::: panel OAuth Roles
In any OAuth 2.0 flow we can identify the following roles:

- __Resource Owner__: the entity that can grant access to a protected resource. Typically this is the end-user.
- __Resource Server__: the server hosting the protected resources. This is the API you want to access.
- __Client__: an application requesting access to a protected resource on behalf of the Resource Owner.
- __Authorization Server__: the server that authenticates the Resource Owner, and issues access tokens after getting proper authorization. In this case, Auth0.

Using [different grants types (or flows)](/api-auth/which-oauth-flow-to-use), these participants will interact to grant to the client apps limited access to the APIs you are building. As a result, the client app will obtain an `access_token` that can be used to call the API on behalf of the user.
:::

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

In this section we will review all the configurations we need to apply at the [Auth0 Dashboard](https://manage.auth0.com/).

### Create the API

Click on the [APIs menu option](https://manage.auth0.com/#/apis) on the left, and click the Create API button.

You will be required to supply the following details for your API:

- __Name__: a friendly name for the API. Does not affect any functionality.
- __Identifier__: a unique identifier for the API. We recommend using a URL but note that this doesn't have to be a publicly available URL, Auth0 will not call your API at all. This value cannot be modified afterwards.
- __Signing Algorithm__: the algorithm to sign the tokens with. The available values are `HS256` and `RS256`. When selecting RS256 the token will be signed with the tenant's private key. For more details on the signing algorithms see the Signing Algorithms paragraph below.

![Create API](/media/articles/architecture-scenarios/mobile-api/create-api.png)

Fill in the required information and click the __Create__ button.

#### Signing Algorithms

When you create an API you have to select the algorithm your tokens will be signed with. The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

::: note
The signature is part of a JWT. If you are not familiar with the JWT structure please refer to: [JSON Web Tokens (JWTs) in Auth0](/jwt#what-is-the-json-web-token-structure-).
:::

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that. That algorithm, which is part of the JWT header, is the one you select for your API: `HS256` or `RS256`.

- __RS256__ is an [asymmetric algorithm](https://en.wikipedia.org/wiki/Public-key_cryptography) which means that there are two keys: one public and one private (secret). Auth0 has the secret key, which is used to generate the signature, and the consumer of the JWT has the public key, which is used to validate the signature.
- __HS256__ is a [symmetric algorithm](https://en.wikipedia.org/wiki/Symmetric-key_algorithm) which means that there is only one secret key, shared between the two parties. The same key is used both to generate the signature and to validate it. Special care should be taken in order for the key to remain confidential.

The most secure practice, and our recommendation, is to use __RS256__. Some of the reasons are:

- With RS256 you are sure that only the holder of the private key (Auth0) can sign tokens, while anyone can check if the token is valid using the public key.
- Under HS256, If the private key is compromised you would have to re-deploy the API with the new secret. With RS256 you can request a token that is valid for multiple audiences.
- With RS256 you can implement key rotation without having to re-deploy the API with the new secret.

::: note
For a more detailed overview of the JWT signing algorithms refer to: [JSON Web Token (JWT) Signing Algorithms Overview](https://auth0.com/blog/json-web-token-signing-algorithms-overview/).
:::

### Configure the Scopes

Once the client has been created you will need to configure the Scopes which clients can request during authorization.

In the settings for your API, go to the **Scopes** tab. In this section you can add all four of the scopes which were discussed before, namely `read:timesheets`, `create:timesheets`, `delete:timesheets`, `approve:timesheets`.

![Add Scopes](/media/articles/architecture-scenarios/mobile-api/add-scopes.png)

### Create the Client

There are four client types in Auth0: __Native__ (used by mobile or desktop apps), __Single Page Web Applications__, __Regular Web Applications__ and __Non Interactive Clients__ (used by CLIs, Daemons, or services running on your backend). For this scenario we want to create a new Client for our Mobile Application, hence we will use Native as the client type.

To create a new Client, navigate to the [dashboard](${manage_url}) and click on the [Clients](${manage_url}/#/clients}) menu option on the left. Click the __+ Create Client__ button.

Set a name for your Client (we will use `Timesheets Mobile`) and select `Native` as the type.

Click __Create__.

![Create Client](/media/articles/architecture-scenarios/mobile-api/create-client.png)

That's it for now. When we are done with the Mobile app implementation we will revisit the dashboard and this Client's settings to make some changes in its configuration.

## Inside the Implementation

### Implement the API

In this section we will see how we can implement an API for our scenario.

::: note
For simplicity reasons we will keep our implementation solely focused on the authentication and authorization part. As you will see in the samples the input timesheet entry will be hard-coded and the API will not persist the timesheet entry, simply echo back some of the info.
:::

#### Define the API endpoints

First we need to define the endpoints of our API.

::: panel What is an API endpoint?
An **API endpoint** is a unique URL that represents an object. In order to interact with this object you need to point your client towards that URL. For example, if you had an API that could return either order or customers, you might configure two endpoints: `/orders` and `/customers`. Your client would interact with these endpoints using different HTTP methods, for example `POST /orders` to create a new order, or `GET /orders` to retrieve the dataset of one or more orders.
:::

For this implementation we will only define 2 endpoints; one for retrieving a list of all timesheets for an employee, and another which will allow an employee to create a new timesheet entry.

An `HTTP GET` request to the `/timesheets` endpoint will allow a user to retrieve their timesheets, and an `HTTP POST` request to the `/timesheets` endpoint will allow a user to add a new timesheet.

::: note
See the implementation in [Node.js](/architecture-scenarios/application/mobile-api/api-implementation-nodejs#1-define-the-api-endpoints)
:::

#### Secure the Endpoints

When an API receives a request with a bearer access token as part of the header, the first thing to do is to validate the token. This consists of a series of steps, and if any of these fails then the request must be rejected with a `Missing or invalid token` error message to the calling app.

The validations that the API should perform are:

- Check that the JWT is well formed
- Check the signature
- Validate the standard claims

::: note
[JWT.io](https://jwt.io/) provides a list of libraries that can do most of the work for you: parse the JWT, verify the signature and the claims.
:::

Part of the validation process is to also check the Client permissions (scopes), but we will address this separately in the next paragraph of this document.

For more information on validating access tokens, refer to [Verify Access Tokens](/api-auth/tutorials/verify-access-token).

::: note
See the implementation in [Node.js](/architecture-scenarios/application/mobile-api/api-implementation-nodejs#2-secure-the-api-endpoints)
:::

#### Check the Client's Permissions

By now we have verified that the JWT is valid. The last step is to verify that the client has the permissions required to access the protected resources.

To do so, the API needs to check the [scopes](/scopes) of the decoded JWT. This claim is part of the payload and it is a space-separated list of strings.

::: note
See the implementation in [Node.js](/architecture-scenarios/application/mobile-api/api-implementation-nodejs#3-check-the-client-permissions)
:::

#### Determine user identity

For both endpoints (retrieving the list of timesheets, and adding a new timesheet) we will need to determine the identity of the user.

For retrieving the list of timesheets this is to ensure that we only return the timesheets belonging to the user making the request, and for adding a new timesheet this is to ensure that the timesheet is associated with the user making the request.

One of the standard JWT claims is the `sub` claim which identifies the principal that is the subject to the claim. In the case of the Implicit Grant flow this claim will contain the user's identity, which will be the unique identifier for the Auth0 user. You can use this to associate any information in external systems with a particular user.

You can also use a custom claim to add another attribute of the user - such as their email address - to the `access_token` and use that to uniquely identify the user.

::: note
See the implementation in [Node.js](/architecture-scenarios/application/mobile-api/api-implementation-nodejs#4-determine-the-user-identity)
:::

### Implement the Mobile App

In this section we will see how we can implement a Mobile application for our scenario.

::: note
[See the implementation in Android at the bottom of this document](/architecture-scenarios/application/mobile-api/mobile-implementation-android#1-set-up-the-application)
:::

#### Authorize the User

To authorize the user we will implement an [Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce). The mobile application should first send the user to the [authorization URL](/api/authentication#authorization-code-grant-pkce-) along with the `code_challenge` and the method used to generate it:

```
https://YOUR_AUTH0_DOMAIN/authorize?
    audience=API_AUDIENCE&
    scope=SCOPE&
    response_type=code&
    client_id=YOUR_CLIENT_ID&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=https://YOUR_APP/callback
```

The `GET` request to the authorization URL should include the following values:

- __domain__: The value of your Auth0 Domain. You can retrieve it from the Settings of your Client at the [Auth0 Dashboard](https://manage.auth0.com/#/clients).
- __client_id__: The value of your Auth0 Client Id. You can retrieve it from the Settings of your Client at the [Auth0 Dashboard](https://manage.auth0.com/#/clients).
- __audience__: The value of your API Identifier. You can retrieve it from the Settings of your Client at the [Auth0 Dashboard](https://manage.auth0.com/#/clients).
- __scope__: The [scopes](/scopes) which determine the information to be returned in the `id_token` and `access_token`. A scope of `openid profile email offline_access` will return all the user profile information the `id_token` and return a `refresh_token`. You also need to request the scopes required to call the API, in this case the `read:timesheets create:timesheets` scopes. This will ensure that the `access_token` has these scopes.
- __response_type__: Indicates the Authentication Flow to use. For a Mobile application using PKCE, this should be set to `code`.
- __code_challenge__: The generated code challenge from the code verifier. You can find instructions on generating a code challenge [here](/api-auth/tutorials/authorization-code-grant-pkce#1-create-a-code-verifier).
- __code_challenge_method__: Method used to generate the challenge. Auth0 supports only `S256`.
- __redirect_uri__: The URL which Auth0 will redirect the browser to after authorization has been granted by the user. The Authorization Code will be available in the code URL parameter. This URL must be specified as a valid callback URL under your [Client's Settings](https://manage.auth0.com/#/clients).

::: note
[See the implementation in Android at the bottom of this document](/architecture-scenarios/application/mobile-api/mobile-implementation-android#2-authorize-the-user)
:::

#### Get the Credentials

After a successful request to the authorization URL, you should receive the following response:

```
HTTP/1.1 302 Found
Location: https://YOUR_AUTH0_DOMAIN/callback?code=AUTHORIZATION_CODE
```

Next you can exchange the `authorization_code` from the response for an Access Token that can be used to call your API. Perform a `POST` request to the [Token URL](/api/authentication#authorization-code-pkce-) including the following data:

- __grant_type__: This must be set to `authorization_code`.
- __client_id__: The value of your Auth0 Client Id. You can retrieve it from the Settings of your Client at the [Auth0 Dashboard](https://manage.auth0.com/#/clients).
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
[See the implementation in Android at the bottom of this document](/architecture-scenarios/application/mobile-api/mobile-implementation-android#store-credentials)
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
[See the implementation in Android at the bottom of this document](/architecture-scenarios/application/mobile-api/mobile-implementation-android#3-get-the-user-profile)
:::

#### Call the API

To access secured resources from your API, the authenticated user's `access_token` needs to be included in requests that are sent to it. This is accomplished by sending the `access_token` in an `Authorization` header using the `Bearer` scheme.

::: note
[See the implementation in Android at the bottom of this document](/architecture-scenarios/application/mobile-api/mobile-implementation-android#4-call-the-api)
:::

#### Renew the Token

To refresh your `access_token`, perform a `POST` request to the `/oauth/token` endpoint using the `refresh_token` from your authorization result. Your request should include:

* __grant_type__: This must be set to `refresh_token`.
* __client_id__: The value of your Auth0 Client Id. You can retrieve it from the Settings of your Client at the [Auth0 Dashboard](https://manage.auth0.com/#/clients).
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
[See the implementation in Android at the bottom of this document](/architecture-scenarios/application/mobile-api/mobile-implementation-android#store-credentials)
:::

## Conclusion

In this document we covered a simple scenario: an API, used by a mobile application to allow employees to capture their timesheets.

We learned about the Authorization Code Grant with PKCE, what an access token is, how to configure an API in Auth0, how to configure a mobile application to communicate securely with this API, how to define and secure our API endpoints, how to use the provided libraries to validate the access token and how to retrieve a new one from Auth0.

We started by describing the business case and the requirements and went on explaining how each requirement can be met and the thought process behind each choice that was made.

We used Node.js for the API implementation and Android for the mobile application. Hopefully though after going through this document you are able to build this using the technologies you prefer.

Don't forget to check back for new business cases and more complex architecture scenarios!
