---
order: 03
title: SPA + API
image: /media/articles/architecture-scenarios/spa-api.png
extract: Single Page Web Application which talks to an API. The application will use OpenID Connect with the Implicit Grant Flow to authenticate users with Auth0.
description: Explains the architecture scenario where a Single Page Web Application (SPA) talks to an API using OpenID Connect, and the OAuth 2.0 Implicit Grant Flow, to authenticate users with Auth0.
toc: true
---
# SPA + API

In this scenario we will build a Timesheet API for a fictitious company named ABC Inc. The API will allow to add timesheet entries for an employee or a contractor.

We will also be building a Single Page Application (SPA) which will be used to log timesheet entries and send them to the centralized timesheet database using the API.

::: TL;DR
* Auth0 provides API Authentication and Authorizaion as a means to secure access to API endpoints (see [API Authentication and Authorization](#api-authentication-and-authorization))
* For authorizing a user of a SPA, Auth0 supports the Implicit Grant (see [Implicit Grant](#implicit-grant))
* Both the SPA and the API must be configured in the Auth0 Dashboard (see [Auth0 Configuration](#auth0-configuration))
* The API will be secured by ensuring that a valid Access Token is passed in the HTTP Authorization header when calls are made to the API (see [Implement the API](#implement-the-api))
* The Auth0.js library can be used to authorize the user of the SPA and obtain a valid Access Token which can be used to call the API (see [Authorize the User](#authorize-the-user))
* The SPA can pass the Access Token in the HTTP Authorization header when making calls to the API (see [Call the API](#call-the-api))
:::

## The Premise

ABC Inc. is a consulting startup company. Currently they have approximately 100 employees and they also outsource several activities to external contractors. All employees and external contractors are required to fill in their timesheets every week.

The company has built a timesheets application, a scenario we covered in [Single Sign-On for Regular Web Apps](/architecture-scenarios/application/web-app-sso). The internal employees use this web app to fill in their timesheets but the company wants to replace it with a SPA. The app will be used to log timesheet entries and send the data to the centralized timesheet database using the API.

## Goals & Requirements

ABC wants to build a flexible solution. At the moment only an automated process needs to push timesheet entries but in the future the company plans on launching more clients, like a mobile app to accommodate their sales teams. Hence the company has decided to develop a single Timesheets API which will be used to log time not only by this server process, but by all future clients as well. They want to put in place a security architecture that is flexible enough to accommodate this. ABC Inc. wants to ensure that a large part of the code and business logic for the application can be shared across the different client applications.

It is required that only authorized users and applications are allowed access to the Timesheets API.

## Overview of the Solution

In order to ensure that only authorized users and applications are allowed access to the Timesheets API, ABC Inc. has decided to make use of the [OAuth 2.0 authorization framework](https://tools.ietf.org/html/rfc6749). The framework provides the flexibility the company wants since the different grants can allow them to easily authorize the various types of application which need to communicate with the Timesheets API.

### API Authentication and Authorization

An API is a way to expose functionality of your application to other applications. An application can make a request by sending a message to an endpoint on an API and receive information as a response.

An API endpoint can be secured or not. In our case, since the timesheets are sensitive information that affect reviews and payments, it is important to ensure that only authorized users and applications can call the endpoints on our API. When a client application wants to access protected endpoints on an API it needs to present an access token as proof that it has the required permissions for making the call to the endpoint.

An access token is obtained by authenticating the user with an Authorization Server and the user can then in turn authorize the application to access the API on their behalf.

::: panel What is an Access Token?
An access token (also referred to as `access_token`) is an opaque string representing an authorization issued to the client. It may denote an identifier used to retrieve the authorization information or may self-contain the authorization information (for example, the user's identity, permissions, and so forth) in a verifiable manner.

It is quite common for access tokens to be implemented as [JSON Web Tokens](/jwt). For more information on Auth0 Access Tokens refer to [Access Token](/tokens/access-token).
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

### Implicit Grant

OAuth 2.0 provides several __grant types__ for different use cases. In this particular use case, we want to access the API from a [client-side app](/quickstart/spa).

The SPA will use the OAuth 2.0 [Implicit Grant](/api-auth/grant/implicit) to do so.

The Implicit Grant (defined in [RFC 6749, section 4.1](https://tools.ietf.org/html/rfc6749#section-4.2)) is similar to the [Authorization Code Grant](/api-auth/grant/authorization-code), but the main difference is that the client app receives an `access_token` directly, without the need for an `authorization_code`. This happens because the client app, which is typically a JavaScript app running within a browser, is less trusted than a web app running on the server, hence cannot be trusted with the `client_secret` (which is required in the Authorization Code Grant).

Once the user authenticates, the client app receives the `id_token` and `access_token` in the hash fragment of the URI. The client app can now use the `id_token` to obtain information about the user, and `access_token` to call the API on behalf of the user.

![Implicit Grant](/media/articles/api-auth/implicit-grant.png)

1. The app initiates the flow and redirects the browser to Auth0 (specifically to the [/authorize endpoint](/api/authentication#implicit-grant)), so the user can authenticate.

1. Auth0 authenticates the user. The first time the user goes through this flow, and if the client is a third party client, a consent page will be shown where the permissions, that will be given to the Client, are listed (for example: post messages, list contacts, and so forth).

1. Auth0 redirects the user to the app with an `access_token` (and optionally a `id_token`) in the hash fragment of the URI. The app can now extract the tokens from the hash fragment.

1. The app can use the `access_token` to call the API on behalf of the user.

## Auth0 Configuration

In this section we will review all the configurations we need to apply at the [Auth0 Dashboard](${manage_url}).

### Create the API

Navigate to the [APIs section](${manage_url}/#/apis) of the dashboard, and click the **Create API** button.

You will be asked to supply the following details for your API:

- __Name__: a friendly name for the API. Does not affect any functionality.
- __Identifier__: a unique identifier for the API. We recommend using a URL but note that this doesn't have to be a publicly available URL, Auth0 will not call your API at all. This value cannot be modified afterwards.
- __Signing Algorithm__: the algorithm to sign the tokens with. The available values are `HS256` and `RS256`. When selecting RS256 the token will be signed with the tenant's private key. For more details on the signing algorithms see the [Signing Algorithms paragraph](#signing-algorithms) below.

![Create API](/media/articles/architecture-scenarios/spa-api/create-api.png)

Fill in the required information and click the **Create** button.

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

In the settings for your API, go to the **Scopes** tab. In this section you can add all four of the scopes which was discussed before, namely `read:timesheets`, `create:timesheets`, `delete:timesheets`, `approve:timesheets`.

![Add Scopes](/media/articles/architecture-scenarios/spa-api/add-scopes.png)

### Create the Client

There are four client types in Auth0: __Native__ (used by mobile or desktop apps), __Single Page Web Applications__, __Regular Web Applications__ and __Non Interactive Clients__ (used by CLIs, Daemons, or services running on your backend). For this scenario we want to create a new Client for our SPA, hence we will use Single Page Application as the client type.

To create a new Client, navigate to the [dashboard](${manage_url}) and click on the [Clients](${manage_url}/#/clients}) menu option on the left. Click the __+ Create Client__ button.

Set a name for your Client (we will use `Timesheets SPA`) and select `Single Page Web Applications` as the type.

Click __Create__.

![Create Client](/media/articles/architecture-scenarios/spa-api/create-client.png)

That's it for now. When we are done with the SPA implementation we will revisit the dashboard and this Client's settings to make some changes in its configuration.

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
See the implementation in [Node.js](/architecture-scenarios/application/spa-api/api-implementation-nodejs#1-define-the-api-endpoints)
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
See the implementation in [Node.js](/architecture-scenarios/application/spa-api/api-implementation-nodejs#2-secure-the-api-endpoints)
:::

#### Check the Client's Permissions

By now we have verified that the JWT is valid. The last step is to verify that the client has the permissions required to access the protected resources.

To do so, the API needs to check the [scopes](/scopes) of the decoded JWT. This claim is part of the payload and it is a space-separated list of strings.

::: note
See the implementation in [Node.js](/architecture-scenarios/application/spa-api/api-implementation-nodejs#3-check-the-client-permissions)
:::

#### Determine user identity

For both endpoints (retrieving the list of timesheets, and adding a new timesheet) we will need to determine the identity of the user.

For retrieving the list of timesheets this is to ensure that we only return the timesheets belonging to the user making the request, and for adding a new timesheet this is to ensure that the timesheet is associated with the user making the request.

One of the standard JWT claims is the `sub` claim which identifies the principal that is the subject to the claim. In the case of the Implicit Grant flow this claim will contain the user's identity, which will be the unique identifier for the Auth0 user. You can use this to associate any information in external systems with a particular user.

You can also use a custom claim to add another attribute of the user - such as their email address - to the `access_token` and use that to uniquely identify the user.

::: note
See the implementation in [Node.js](/architecture-scenarios/application/spa-api/api-implementation-nodejs#4-determine-the-user-identity)
:::

### Implement the SPA

In this section we will see how we can implement a SPA for our scenario.

#### Authorize the user

To authorize the user we will be using the [auth0.js library](/libraries/auth0js). You can initialize a new instance of the Auth0 client as follows:

```js
var auth0 = new auth0.WebAuth({
  clientID: '${account.clientId}',
  domain: '${account.namespace}',
  responseType: 'token id_token',
  audience: 'YOUR_API_IDENTIFIER',
  redirectUri: '${account.callback}',
  scope: 'openid profile read:timesheets create:timesheets'
});
```

You need to pass the following configuration values:

- __clientID__:The value of your Auth0 Client Id. You can retrieve it from the Settings of your Client at the [Dashboard](${manage_url}/#/clients}).
- __domain__: The value of your Auth0 Domain. You can retrieve it from the Settings of your Client at the [Dashboard](${manage_url}/#/clients}).
- __responseType__: Indicates the Authentication Flow to use. For a SPA which uses the __Implicit Flow__, this should be set to `token id_token`. The `token` part, triggers the flow to return an `access_token` in the URL fragment, while the `id_token` part, triggers the flow to return an `id_token` as well.
- __audience__: The value of your API Identifier. You can retrieve it from the [Settings of your API](${manage_url}/#/apis}) at the Dashboard.
- __redirectUri__: The URL to which Auth0 should redirect to after the user has authenticated.
- __scope__: The [scopes](/scopes) which determine the information to be returned in the `id_token` and `access_token`. A scope of `openid profile` will return all the user profile information in the `id_token`. You also need to request the scopes required to call the API, in this case the `read:timesheets create:timesheets` scopes. This will ensure that the `access_token` has these scopes.

To initiate the authentication flow you can call the `authorize()` method:

```js
auth0.authorize();
```

After the authentication, Auth0 will redirect back to the __redirectUri__ you specified when configuring the new instance of the Auth0 client. At this point you will need to call the `parseHash()` method which parses a URL hash fragment to extract the result of an Auth0 authentication response.

The contents of the authResult object returned by parseHash depend upon which authentication parameters were used. It may include the following:

- __idToken__: An `id_token` JWT containing user profile information
- __accessToken__: An `access_token` for the API, specified by the __audience__.
- __expiresIn__: A string containing the expiration time (in seconds) of the `access_token`.

You also need to store the tokens returned by the authentication result in local storage to keep track of the fact that the user is logged in. You can also subsequently retrieve the `access_token` from local storage when calling your API.

```js
this.auth0.parseHash((err, authResult) => {
  if (authResult && authResult.accessToken && authResult.idToken) {
    window.location.hash = '';
    // Store the authResult in local storage and redirect the user elsewhere
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  } else if (err) {
    // Handle authentication error, for example by displaying a notification to the user
  }
});
```

::: note
See the implementation in [Angular 2](/architecture-scenarios/application/spa-api/spa-implementation-angular2#2-authorize-the-user)
:::

#### Get the User Profile

::: panel Extract info from the token
This section shows how to retrieve the user info using the `access_token` and the [/userinfo endpoint](/api/authentication#get-user-info). To avoid this API call, you can just decode the `id_token` [using a library](https://jwt.io/#libraries-io) (make sure you validate it first). If you need additional user information consider using [our Management API](/api/management/v2#!/Users/get_users_by_id) from your backend.
:::

The `client.userInfo` method can be called passing the returned `authResult.accessToken` in order to retrieve the user's profile information.  It will make a request to the [/userinfo endpoint](/api/authentication#get-user-info) and return the `user` object, which contains the user's information, similar to the example below:

```json
{
    "email_verified": "false",
    "email": "test@example.com",
    "clientID": "AAAABBBBCCCCDDDDEEEEFFFFGGGGHHHH",
    "updated_at": "2017-02-07T20:50:33.563Z",
    "name": "tester9@example.com",
    "picture": "https://gravatar.com/avatar/example.png",
    "user_id": "auth0|123456789012345678901234",
    "nickname": "tester9",
    "created_at": "2017-01-20T20:06:05.008Z",
    "sub": "auth0|123456789012345678901234"
}
```

You can access any of these properties in the callback function passed when calling the `userInfo` function:

```js
const accessToken = localStorage.getItem('access_token');
 
auth0.client.userInfo(accessToken, (err, profile) => {
  if (profile) {
    // Get the user’s nickname and profile image
    var nickname = profile.nickname;
    var picture = profile.picture;
  }
});
```

::: note
See the implementation in [Angular 2](/architecture-scenarios/application/spa-api/spa-implementation-angular2#3-get-the-user-profile)
:::

#### Call the API

To access secured resources from your API, the authenticated user's `access_token` needs to be included in requests that are sent to it. This is accomplished by sending the `access_token` in an `Authorization` header using the `Bearer` scheme. 

::: note
See the implementation in [Angular 2](/architecture-scenarios/application/spa-api/spa-implementation-angular2#4-call-the-api)
:::

#### Renew the Access Token

As a security measure, it is recommended that the lifetime of a user's `access_token` be kept short. When you create an API in the Auth0 dashboard, the default lifetime is `7200` seconds (2 hours), but this can be controlled on a per-API basis.

Once expired, an `access_token` can no longer be used to access an API. In order to obtain access again, a new `access_token` needs to be obtained.

Obtaining a new `access_token` can be done by repeating the authentication flow, used to obtain the initial `access_token`. In a SPA this is not ideal, as you may not want to redirect the user away from their current task to complete the authentication flow again.

In cases like this you can make use of [Silent Authentication](/api-auth/tutorials/silent-authentication). Silent authentication lets you perform an authentication flow where Auth0 will only reply with redirects, and never with a login page. This does however require that the user was already logged in via [SSO (Single Sign-On)](/sso).

::: note
See the implementation in [Angular 2](/architecture-scenarios/application/spa-api/spa-implementation-angular2#5-renew-the-access-token)
:::

## Conclusion

In this document we covered a simple scenario: an API, used by a Single Page Application (SPA) to allow employees to capture their timesheets.

We learned about the Implicit Grant, what an access token is, how to configure an API in Auth0, how to configure a SPA client to communicate securely with this API, how to define and secure our API endpoints, how to use the provided libraries to validate the access token and how to retrieve a new one from Auth0.

We started by describing the business case and the requirements and went on explaining how each requirement can be met and the thought process behind each choice that was made.

We used Node.js for the API implementation and Angular for the SPA. Hopefully though after going through this document you are able to build this using the technologies you prefer.

Don't forget to check back for new business cases and more complex architecture scenarios!
