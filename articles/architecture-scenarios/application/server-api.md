---
order: 03
title: Server Client + API
image: /docs/media/articles/architecture-scenarios/server-api.png
extract: Server to server communication where a server “Client” needs to make secure calls to an API (“Resource Server”), but on behalf of the client vs. a user.
description: Explains the architecture scenario with server to server communication with secure calls to an API (“Resource Server”), but on behalf of the client vs. a user.
---

# Server + API

In this scenario we will build a Timesheet API for a fictitious company named ABC Inc. The API is meant to allow various clients (for example, mobile applications, SPAs, cron jobs) to add timesheet entries for an employee or a contractor.

We will also be building a cron job which will process timesheet entries from an external system to the centralized timesheet database using the API.

__Table of Contents__
- [The Premise](#the-premise)
  - [Goals & Requirements](#goals-requirements)
- [Overview of the Solution](#overview-of-the-solution)
  - [API Authentication and Authorization](#api-authentication-and-authorization)
    - [Participants](#participants)
  - [Client Credentials Grant](#client-credentials-grant)
- [Auth0 Configuration](#auth0-configuration)
  - [Configure the API](#configure-the-api)
    - [Signing Algorithms](#signing-algorithms)
  - [Configure the Scopes](#configure-the-scopes)
  - [Create the Client](#create-the-client)
  - [Configure Client's access to the API](#configure-client-s-access-to-the-api)
- [Inside the Implementation](#inside-the-implementation)
    - [Implement the API](#implement-the-api)
      - [Define the API endpoints](#define-the-api-endpoints)
      - [Secure the API endpoints](#secure-the-api-endpoints)
        - [Get an Access Token](#get-an-access-token)
      - [Check the Client permissions](#check-the-client-permissions)
    - [Implement the Non Interactive Client](#implement-the-non-interactive-client)
      - [Get an Access Token](#get-an-access-token)
      - [Invoke the API](#invoke-the-api)
- [Conclusion](#conclusion)

## The Premise

ABC Inc. is a consulting startup company. Currently they have approximately 100 employees and they also outsource several activities to external contractors. Most of the employees work from the company's main office, but there are some teams that work remotely. Additionally, some employees frequently travel to customer locations and work from mobile devices.

All employees and external contractors are required to fill in their timesheets every week using spreadsheets. The current system is inefficient and the company decided that they need to move to a better and more automated solution.

The company evaluated several of the available timesheets application and concluded that it would be more cost-effective to build their own in-house solution, since they have fairly unique requirements which are not available in other timesheet applications. The ultimate aim is to allow employees and contractors to capture timesheets via a Web Application and also mobile applications for iOS and Android.

ABC Inc's contractors use an external tool to track their timesheets. A Cron job will be developed which will read the timesheet entries from this external system, and automatically upload those to the timesheet application.

### Goals & Requirements

Because there are multiple client applications, ABC Inc has decided to develop a single Timesheets API which all of the client applications will use to log time in the timesheet database. The will ensure that a large part of the code and business logic for the application can be shared across the different client applications. This will also allow them to easily add other clients in the future if the need arises.

It is required that only authorized users and applications are allowed access to the Timesheets API. In order to secure the API ABC Inc has decided to make use of the OAuth 2.0 authorization framework as this will allow them to easily authorize the various types of application which need to communicate with the Timesheets API.

## Overview of the Solution

### API Authentication and Authorization

An API is a way to expose functionality of your application to other applications. An application can make a request by sending a message to an endpoint on an API and receive information as a response.

It is important to ensure that only authorized users (and applications) can call the endpoints on an API. When a client application wants to access any of these protected endpoints on an API it needs to present an access token as proof that it has the required permissions for make the call to the endpoint.

An access token is obtained by authenticating the user with an Authorization Server and the user can then in turn authorize the application to access the API on their behalf.

An API can enforce fine grained control over who can access the various endpoints exposed by the API. These permissions are expressed as scopes.

When a user authorizes a client application, the application can also indicate which permissions it requires. The user is then allowed to review and grant these permissions. These permissions are then included in the access token as part of the `scope` claim.

Subsequently when the client passes along the access token when making requests to the API, the API can query the `scope` claim to ensure that the required permissions were granted in order to call the particular API endpoint.

::: panel-info What is an Access Token?
An access token (also referred to as `access_token`) is an opaque string representing an authorization issued to the client. It may denote an identifier used to retrieve the authorization information or may self-contain the authorization information (e.g. the user's identity, permissions, etc.) in a verifiable manner.

It is quite common for access tokens to be implemented as [JSON Web Tokens](/jwt).
:::

::: panel-info What are Scopes?
Each access token may include a list of the permissions that have been granted to the client. When a client authenticates with Auth0, it will specify the list of scopes (or permissions) it is requesting. If those scopes are authorized, then the access token will contain a list of authorized scopes. 

For example, the timesheet API may accept four different levels of authorization: reading timesheets (scope `read:timesheets`), creating timesheets (scope `create:timesheets`), deleting timesheets (scope `delete:timesheets`) and approving timesheets (scope `approve:timesheets`).

When a client asks the API to create a new timesheet entry, then the access token should contain the `create:timesheets` scope. In a similar fashion, in order to delete existing timesheets, the access token should contain the `delete:timesheets` scope.
:::

By using the OAuth 2.0 authorization framework, you can give your own applications or third-party applications limited access to your APIs on behalf of the application itself. Using Auth0, you can easily support different flows in your own APIs without worrying about the OAuth 2.0/OpenID Connect specification, or the many other technical aspects of API authorization.

#### Participants

Several participants in the OAuth 2.0 specification can be identified:

- **Authorization Server**: The server issuing access tokens to the client after successfully authenticating the resource owner and obtaining authorization. In this case the authorization server is Auth0.
- **Resource Servers**: The server hosting the protected resources, capable of accepting and responding to protected resource requests using access tokens. In this case the resource server is the Timesheet API.
- **Clients**: An application making protected resource requests on behalf of the resource owner and with its authorization.
- **Resource Owner**: An entity capable of granting access to a protected resource when the resource owner is a person, it is referred to as an end-user.

Using different grants types (or flows), these participants will interact to grant Clients limited access to the Resource Servers you are building. As a result, the Client will obtain an `access_token` that can be used to call the Resource Server on behalf of the user or of the Client itself.

### Client Credentials Grant

OAuth 2 provides several *grant types* for different use cases. In this particular use case where a cron job will be uploading timesheets via an API, there is now interactive user (or resource owner) who grants permission to the cron job to access the API.

The cron job is also not making the API calls on behalf of any user. Instead there is a machine-to-machine authorization and the client (i.e. the cron job) makes calls to the Resource Server (i.e. the API) on its own behalf.

For situations like this where there is no user interaction involved, the Client Credentials Grant is ideal. With Client Credentials Grant (defined in [RFC 6749, section 4.4](https://tools.ietf.org/html/rfc6749#section-4.4)) a Client can directly request an `access_token` from the Authorization Server by using its Client Credentials (a Client Id and a Client Secret). Instead of identifying a Resource Owner, this token will represent the Client itself.

![Client Credentials Grant Flow](/media/articles/architecture-scenarios/server-api/client-credentials-grant.png)

1. The Client authenticates with the Authorization Server using its Client Id and Client Secret.
1. The Authorization Server validates this information and returns an `access_token`.
1. The Client can use the `access_token` to call the Resource Server on behalf of itself.


## Auth0 Configuration

In this section we will review all the configurations we need to apply using the [Auth0 Dashboard](${manage_url}).

### Configure the API

If this is the first time you create an API in Auth0, you will have to enable the API functionality first. Navigate to your [Account Advanced Settings](${manage_url}/#/account/advanced) and scroll down to the **Settings** section.Ensure that the **Enable APIs Section** is switched on.

![Enable APIs Section](/media/articles/architecture-scenarios/server-api/enable-apis-section.png)

Next, you can click on the [APIs menu option](${manage_url}/#/apis) on the left, and click the **Create API** button.

You will be required to supply the following details for your API:

- **Name**: a friendly name for the API. Does not affect any functionality.
- **Identifier**: a unique identifier for the API. We recommend using a URL but note that this doesn't have to be a publicly available URL, Auth0 will not call your API at all. This value cannot be modified afterwards.
- **Signing Algorithm**: the algorithm to sign the tokens with. The available values are `HS256` and `RS256`. When selecting RS256 the token will be signed with the tenant's private key. For more details on the signing algorithms see the [Signing Algorithms paragraph](#signing-algorithms) below.

![Create API](/media/articles/architecture-scenarios/server-api/create-api.png)

Fill in the required information and click the **Create** button.

#### Signing Algorithms

When you create an API you have to select the algorithm your tokens will be signed with. The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

> The signature is part of a JWT. If you are not familiar with the JWT structure please refer to: [JSON Web Tokens (JWTs) in Auth0](/jwt#what-is-the-json-web-token-structure-).

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that. That algorithm, which is part of the JWT header, is the one you select for your API: `HS256` or `RS256`.

- **RS256** is an [asymmetric algorithm](https://en.wikipedia.org/wiki/Public-key_cryptography) which means that there are two keys: one public and one private (secret). Auth0 has the secret key, which is used to generate the signature, and the consumer of the JWT has the public key, which is used to validate the signature.

- **HS256** is a [symmetric algorithm](https://en.wikipedia.org/wiki/Symmetric-key_algorithm) which means that there is only one secret key, shared between the two parties. The same key is used both to generate the signature and to validate it. Special care should be taken in order for the key to remain confidential.

The most secure practice, and our recommendation, is to use **RS256**. Some of the reasons are:

- With RS256 you are sure that only the holder of the private key (Auth0) can sign tokens, while anyone can check if the token is valid using the public key.
- Under HS256, If the private key is compromised you would have to re-deploy the API with the new secret. With RS256 you can request a token that is valid for multiple audiences.
- With RS256 you can implement key rotation without having to re-deploy the API with the new secret.

For a more detailed overview of the JWT signing algorithms refer to: [JSON Web Token (JWT) Signing Algorithms Overview](https://auth0.com/blog/json-web-token-signing-algorithms-overview/).

### Configure the Scopes

Once the client has been created you will need to configure the Scopes which clients can request during authorization.

In the settings for your API, go to the *Scopes* tab. In this section you can add all four of the scopes which was discussed before, namely `read:timesheets`, `create:timesheets`, `delete:timesheets`, `approve:timesheets`.

> For the purposes of this document we will only be ever concerned with the `create:timesheets` scope, as that is all that is required by the Cron job. For completeness sake we are however adding the necessary scopes which will be required by future clients as well.

![Add Scopes](/media/articles/architecture-scenarios/server-api/add-scopes.png)

### Create the Client

When creating an API in the Auth0 Dashboard, a test client for the API will automatically be generated. In the Auth0 Dashboard, navigate to the [Client Section](${manage_url}/#/clients) and you will see the test client for the Timesheets API.

![Non Interactive Client](/media/articles/architecture-scenarios/server-api/non-interactive-client.png)

Go to the settings for the client by clicking on the gear icon, and rename the client to `Timesheets import Job`.

For the cron job you will need a Non-Interactive client. This test client which was generated when the API was created was automatically configured as a Non-Interactive client as can be seen in the screenshot below.

![Non Interactive Client Settings](/media/articles/architecture-scenarios/server-api/non-interactive-client-settings.png)

### Configure Client's access to the API

The final part of the Auth0 configuration is to allow the client access to the Timesheets API. Go back to the configuration of the API, and select the *Non-interactive Clients* tab.

You will see the **Timesheets Import Job** client listed, and it should have access to API as can be seen from the switch to the right of the client name which indicates a value of `Authorized`. If it does not indicate that the client is authorized, simply toggle the value of the switch from `Unauthorized` to `Authorized`.

![Authorize Client](/media/articles/architecture-scenarios/server-api/authorize-client.png)

You will also need to specify which scopes will included in access tokens which are issued to the client when the client authorizes with Auth0.

Expand the settings for the client by clicking on the down arrow to the far right, and you will see the list of available scopes. The cron job will only require the `create:timesheets` scope as it will simply create new timesheets based on the timesheet entries in the external system.

Once you have selected the `create:timesheets` scope you can save the settings by clicking the **Update** button.

![Assign Scopes](/media/articles/architecture-scenarios/server-api/assign-scopes.png)

Now that we have designed our solution and discussed the configurations needed on Auth0 side, we can proceed with the implementation part. That's what the next paragraph is all about, so keep reading!

## Inside the Implementation

### Implement the API

In this section we will see how we can implement an API for our scenario.

**NOTE**: For simplicity reasons we will keep our implementation solely focused on the authentication and authorization part. As you will see in the samples the input timesheet entry will be hard-coded and the API will not persist the timesheet entry, simply echo back some of the info.

#### Define the API endpoints

First we need to define the endpoints of our API.

::: panel-info What is an API endpoint?
An **API endpoint** is a unique URL that represents an object. In order to interact with this object you need to point your client towards that URL. For example, if you had an API that could return either order or customers, you might configure two endpoints: `/orders` and `/customers`. Your client would interact with these endpoints using different HTTP methods, for example `POST /orders` to create a new order, or `GET /orders` to retrieve the dataset of one or more orders.
:::

We will configure one single endpoint that will be used for creating timesheet entries. The endpoint will be `/timesheets` and the HTTP method `POST`.

The API will expect a JSON object as input, containing the timesheet information. We will use the following JSON:

```json
{
  'user_type': 'Employee',
  'user_id': '007',
  'year': 2016,
  'week': 24,
  'project': 'StoreZero',
  'hours': 40
}
```

The API will print the JSON, so we can verify the contents and echo back a message like the following: `Timesheet created for Employee: 007`.

**See the implementation in [Node.js](/architecture-scenarios/application/server-api/api-implementation-nodejs#define-the-api-endpoints)**.

#### Secure the API endpoints

::: panel-warning Configure the API
In order to secure your endpoints you need to have your API configured in the Auth0 Dashboard. For information on how to do that refer to the [Configure the API](#configure-the-api) paragraph of this document.
:::

The first step towards securing our API endpoint is to get an access token as part of the Header and validate it. If it's not valid then we should return a `Missing or invalid token` error message to the calling process.

**See the implementation in [Node.js](/architecture-scenarios/application/server-api/api-implementation-nodejs#secure-the-api-endpoints)**.

##### Get an Access Token

To get an access token without using our Client sample implementation, perform a `POST` operation to the `https://${account.namespace}/oauth/token` endpoint with a payload in the following format:

```json
{
  audience: "{YOUR_API_IDENTIFIER}",
  grant_type: "client_credentials",
  client_id: "${account.client_id}",
  client_secret: "${account.client_secret}"
}
```

For more information on this refer to: [API Authorization: Asking for Access Tokens for a Client Credentials Grant](/api-auth/config/asking-for-access-tokens).

#### Check the Client permissions

Now we have secured our API's endpoint with an access token but we still haven't ensured that the process calling the API has indeed the rights to post a new timesheet entry.

As discussed earlier in this doc, each access token may include a list of the permissions that have been granted to the client. These permissions are defined using the scope request parameter. For more information on how to configure this refer to the [Configure the Scopes](#configure-the-scopes) paragraph.

For our endpoint we will require the scope `create:timesheets`.

**See the implementation in [Node.js](/architecture-scenarios/application/server-api/api-implementation-nodejs#check-the-client-permissions)**.

### Implement the Non Interactive Client

In this section we will see how we can implement a Non Interactive Client for our scenario.

**NOTE**: For simplicity reasons we  will keep our implementations solely focused on the authentication and authorization part and configure our client to send a single hard-coded timesheet entry to the API. Also, we will print in the console, something we wouldn't do with a server running process.

#### Get an Access Token

We will start by invoking the Auth0 `/oauth/token` API endpoint in order to get an access token.

In order to do so we will need the following configuration values:

- **Domain**: The value of your Auth0 Domain. You can retrieve it from the *Settings* of your Client at the [Auth0 Dashboard](${manage_url}/#/clients). This value will be a part of the API URL: `https://${account.namespace}/oauth/token`.

- **Audience**: The value of your API Identifier. You can retrieve it from the *Settings* of your API at the [Auth0 Dashboard](${manage_url}/#/apis).

- **Client Id**: The value of your Auth0 Client's Id. You can retrieve it from the *Settings* of your Client at the [Auth0 Dashboard](${manage_url}/#/clients).

- **Client Secret**: The value of your Auth0 Client's Secret. You can retrieve it from the *Settings* of your Client at the [Auth0 Dashboard](${manage_url}/#/clients).

Our implementation should perform a `POST` operation to the `https://${account.namespace}/oauth/token` endpoint with a payload in the following format:

```json
{
  audience: "{YOUR_API_IDENTIFIER}",
  grant_type: "client_credentials",
  client_id: "${account.client_id}",
  client_secret: "${account.client_secret}"
}
```

For more information on this refer to: [API Authorization: Asking for Access Tokens for a Client Credentials Grant](/api-auth/config/asking-for-access-tokens).

**See the implementation in [Python](/architecture-scenarios/application/server-api/cron-implementation-python#get-an-access-token).**

#### Invoke the API

Now that we have an access token, which includes the valid scopes, we can invoke our API.

In order to do so we will:
- Build a hard-coded timesheet entry in JSON format.
- Add the access token as an `Authorization` header to our request.
- Make the HTTP POST request.
- Parse the response and print it in the terminal (optional).

**See the implementation in [Python](/architecture-scenarios/application/server-api/cron-implementation-python#invoke-the-api).**

## Conclusion
