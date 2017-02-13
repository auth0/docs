---
description: Details generating and using an Auth0 Management APIv2 token.
section: apis
toc: true
---

# The Auth0 Management APIv2 Token

## Overview

In order to call the endpoints of [Auth0 Management API v2](/api/management/v2), you need a token, what we refer to as Auth0 Management APIv2 Token. This token is a [JWT](/jwt), contains specific granted permissions (known as __scopes__), and is signed with a client API key and secret for the entire tenant.

  ::: panel-info What are these scopes?
  The scopes are permissions that should be granted by the owner. Each [Auth0 Management API v2](/api/management/v2) endpoint requires specific scopes. For example, the [Get all clients](/api/management/v2#!/Clients/get_clients) endpoint requires the scopes `read:clients` and `read:client_keys`, while the [Create a client](/api/management/v2#!/Clients/post_clients) endpoint requires the scope `create:clients`. From that we can deduce that if we need to read _and_ create clients, then our token should include three scopes: `read:clients`, `read:client_keys` and `create:clients`.
  :::

There are two ways to get a Management APIv2 Token: [get one manually using the Dashboard](#get-a-token-manually), or [automate the process](#automate-the-process) (build a simple command line tool that generates tokens). In this article we will see how you can do either.

## Get a token manually

<div class="alert alert-info">
  <strong>Heads up!</strong> Before you decide to follow the manual process, you should know that the Management APIv2 token has a validity of <strong>24 hours</strong>. After that the token will expire and you will have to get a new one. If this doesn't work for you, you can <a href="#automate-the-process">automate the process</a>.
</div>

Let's see how you can get a token manually. Note, that the first two steps of the process need to be executed _only_ the first time. This might be true also for the third step, if the endpoints you need to access do not change. In that case you can skip to the [Get the Token](#4-get-the-token) section.

### 1. Create a Client

First, you need to create a Non Interactive Client. If you already have one skip this paragraph.

  ::: panel-info What is a Non Interactive Client?
  A Non Interactive Client represents a program that interacts with an API where there is no user involved. An example would be a server script that would be granted access to consume a Zip Codes API. It's a machine to machine interaction. This must be used instead of a Single Page or Native apps because those cannot meet the necessary security requirements for executing this type of flow. If you want to read more about calling APIs this way, refer to [Calling APIs from a Service](/api-auth/grant/client-credentials).
  :::

Go to the [Clients section](${manage_url}/#/clients) of the dashboard and click the **Create Client** button.

Enter a name for your new client, select **Non Interactive Clients** and then click **Create**.

![Create New Client](/media/articles/api/tokens/noninteractive-client.png)

### 2. Authorize the Client

Once you create the new client, you will be navigated to it's *Quick Start* section.

If this is the first time you are configuring an API in Auth0, you will see this message:

```text
Defining Non Interactive Clients and APIs is a new feature in Auth0 that you can opt-in to.
Once you enable it, a new item on the sidebar "APIs" will be shown.
To enable it, turn on this toggle (or do it on Account Settings).
```

If you see that, turn on the toggle. Notice that a new item is added on the left hand menu: [APIs](${manage_url}/#/apis).

Now you should see a `Select an API` dropdown, listing all the APIs you have configured with Auth0.

Select `Auth0 Management API` from the dropdown. You will then see a message that the client is not authorized.

Click **Navigate to the API and authorize**.

![Navigate to the API and authorize button](/media/articles/api/tokens/navigate-button.png)

This will bring you to the [APIs section](${manage_url}/#/apis), specifically to the _Non Interactive Clients_ tab of the `Auth0 Management API`.

![Authorize Non Interactive Client](/media/articles/api/tokens/authorize-noninteractive.png)

Toggle the slider from `Unauthorized` to `Authorized` for your client.

### 3. Choose the Scopes

The last step, before you get a token, is to select which scopes (permissions) should be granted to this client: for example, should it be able only to read users or create and delete as well?

If you followed this article so far, then you already are at the _Non Interactive Clients_ tab of the `Auth0 Management API`. If not, go to [APIs](${manage_url}/#/apis), click the **Edit** icon for `Auth0 Management API`, go to _Non Interactive Clients_ and expand your non interactive client, using the pointing down arrow, next to the _Authorized_ toggle.

All the scopes, for the various [Management API v2](/api/management/v2) endpoints are listed here. Tick the ones you want to grant to the client and click the **Update** button.

  ::: panel-info I don't know which scopes to choose!
  To find out which scopes you should choose, go the [Management API v2](/api/management/v2) and note the scopes listed at each endpoint. For example, the [Get all Clients](/api/management/v2#!/Clients/get_clients) endpoint requires the scopes `read:clients` and `read:client_keys`, while the [Create a Client](/api/management/v2#!/Clients/post_clients) endpoint requires the scope `create:clients`. If your client needs to read and create users, then you need to tick the checkboxes for these three scopes: `read:clients`, `read:client_keys` and `create:clients`.
  :::

![Choose authorized scopes](/media/articles/api/tokens/choose-scopes.png)

### 4. Get the Token

To get a token, go to the *Test* section under `Auth0 Management API`.

This page will give you code snippets on how to form a request to get a token.

Check the _Response_, a token is already generated for you. Click **Copy Token**.

![Test Client](/media/articles/api/tokens/test-client.png)

You can now make authorized calls to the [Management API v2](/api/management/v2) using this token.

### 5. Use the Token

You can use the [Management API v2 explorer page](/api/management/v2) to manually call an endpoint, using the token you got in the previous step. You will need two pieces of information:
- The Management API v2 token you just got
- Your tenant's domain (`${account.namespace}`). You can find this on the _Settings_ of any of your [Clients](${manage_url}/#/clients/${account.clientId}/settings).

Once you have this information you are ready to call the API. Follow these steps:
1. Go to the [Management API v2 explorer page](/api/management/v2)
1. Click the __Set API Token__ button at the top left
1. Set the __Domain__ and __API Token__ fields, and click __Set Token__
1. Under the __Set API Token__ button at the top left, some new information is now displayed: the domain and token set, and the scopes that have been granted to this client
1. Go to the endpoint you want to call, fill any parameters that might be required and click __Try__

![Set the Token](/media/articles/api/tokens/set-token.png)

## Automate the Process

[The manual process](#get-a-token-manually) might work for you if you want to test an endpoint or invoke it sporadically. But if you need to make scheduled frequent calls then you have to build a simple CLI that will provide you with a token automatically (and thus simulate a non-expiring token).

::: panel-info Prerequisites
Before we proceed with the implementation, some configuration at the [Auth0 dashboard](${manage_url}) is required:
- You must have configured a Non Interactive Client (step by step instructions: [Create a Client](#1-create-a-client)).
- You must have authorized this Client to access the Auth0 Management API (step by step instructions: [Authorize the Client](#2-authorize-the-client)).
- You must have granted to your Client the required scopes (step by step instructions: [Choose the Scopes](#3-choose-the-scopes))
:::

### 1. Get a Token

To ask Auth0 for a Management API v2 token, perform a `POST` operation to the `https://${account.namespace}/oauth/token` endpoint with a payload in the following format:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"client_credentials\",\"client_id\": \"${account.clientId}\",\"client_secret\": \"${account.clientSecret}\",\"audience\": \"https://${account.namespace}/api/v2/\"}"
  }
}
```

The request parameters are:
- `grant_type`: Denotes which [OAuth 2.0 flow](/protocols/oauth2#authorization-grant-types) you want to run. For machine to machine communication use the value `client_credentials`.
- `client_id`: This is the value of the __Client ID__ field on the [Settings tab of the Non Interactive Client](${manage_url}/#/clients/${account.clientId}/settings).
- `client_secret`: This is the value of the __Client Secret__ field on the [Settings tab of the Non Interactive Client](${manage_url}/#/clients/${account.clientId}/settings).
- `audience`: This is the value of the __Identifier__ field on the [Settings tab of the API](https://${manage_url}/#/apis).

The response will contain a [signed JWT (JSON Web Token)](/jwt), when it expires, the scopes granted, and the token type.

```json
{
  "access_token": "eyJ...Ggg",
  "expires_in": 86400,
  "scope": "read:clients create:clients read:client_keys",
  "token_type": "Bearer"
}
```

From the above we can see that our `access_token` is a bearer access token, it will expire in 24 hours (86400 seconds), and it has been authorized to read and create clients.

### 2. Verify the Token

Access tokens will be signed using the signature method configured for the resource server, and must be verified accordingly:

* HS256 (symmetric): signed using the resource server's signing secret
* RS256 (asymmetric): signed using Auth0's private key for your account. Verification is done using the corresponding public key, which can be found at the following standard [JWKS (JSON Web Key set)](https://self-issued.info/docs/draft-ietf-jose-json-web-key.html) URL: [https://${account.namespace}/.well-known/jwks.json](https://${account.namespace}/.well-known/jwks.json)

For claim verification, use any [recommended JWT library](https://jwt.io/) which validates all the standard claims returned in the token.

### 3. Use the Token

You can use this bearer token with an Authorization Header in your request to obtain authorized access to your API.

```har
{
  "method": "POST",
  "url": "http://PATH_TO_THE_ENDPOINT/",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "authorization: Bearer YOUR_ACCESS_TOKEN"}
  ]
}
```


## Frequently Asked Questions

__How long is the token valid for?__</br>
The Management APIv2 token has a validity of __24 hours__. After that the token will expire and you will have to get a new one.

__I hate this! The Management APIv2 token used to never expire, why would you change that?__</br>
The old way of generating tokens was insecure since the tokens had an infinite lifespan and could not be revoked. The new way allows tokens to be generated with specific scopes, expirations, and with the ability to revoke tokens if they were to be breached. These changes were done with our first priority in mind: keeping you and your users secure.

__Can I change my token's validity period?__</br>
No, we have disabled this option. Your applications should use short-lived tokens to minimize security risks.

__Can I refresh my token?__</br>
You cannot renew a Management APIv2 token. A [new token](#get-the-token) should be created when the old one expires.

__My token was compromised! Can I invalidate it?__</br>
Sure. You can terminate the Management APIv2 tokens calling the [blacklist endpoint](/api/v2#!/Blacklists/post_tokens).

__I need to invalidate all my tokens. How can I do that?__</br>
All your tenant's Management APIv2 tokens are signed using the Client Secret of your non interactive client, hence if you change that, all your tokens will be invalidated. To do this, go to your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings) and click the __Rotate__ icon <i class="notification-icon icon-budicon-171"></i>, or use the [Rotate a client secret](/api/management/v2#!/Clients/post_rotate_secret) endpoint.

__My Client Secret was compromised! What should I do?__</br>
You need to change the secret immediately. Go to your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings) and click the __Rotate__ icon <i class="notification-icon icon-budicon-171"></i>, or use the [Rotate a client secret](/api/management/v2#!/Clients/post_rotate_secret) endpoint. Since your tenant's Management APIv2 tokens are signed using the Client Secret, all your tokens will be invalidated and you will have to issue new ones.

__I can see some `current_user` scopes in my `id_token`. What is that?__</br>
Within the Users API some endpoints have scopes related to the current user (like `read:current_user` or `update:current_user_identities`). These are [special scopes](/api/v2/changes#the-id_token-and-special-scopes) in the `id_token`, which are granted automatically to the logged in user.


## More reading

[Calling APIs from a Service](/api-auth/grant/client-credentials)

[Ask for Access Tokens for a Client Credentials Grant](/api-auth/config/asking-for-access-tokens)

[Information on the query string syntax](/api/management/v2/query-string-syntax)

[Search for Users](/api/management/v2/user-search)

[Architecture Scenarios: Server + API](/architecture-scenarios/application/server-api)
