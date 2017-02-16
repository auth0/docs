---
description: Details generating and using an Auth0 Management APIv2 token.
section: apis
toc: true
---

# The Auth0 Management APIv2 Token

<div class="alert alert-info">
  We recently changed the way you get Management APIv2 tokens. To read what we changed, why we did that, and how you can work around these changes refer to <a href="/api/management/v2/tokens-flows">Changes in Auth0 Management APIv2 Tokens</a>.
</div>

## Overview

In order to call the endpoints of [Auth0 Management API v2](/api/management/v2), you need a token, what we refer to as Auth0 Management APIv2 Token. This token is a [JWT](/jwt), contains specific granted permissions (known as __scopes__), and is signed with a client API key and secret for the entire tenant.

There are two ways to get a Management APIv2 Token:
- [get one manually using the Dashboard](#get-a-token-manually), or
- [automate the process](#automate-the-process) (build a simple command line tool that generates tokens).

In this article we will see how you can do either.

## Get a token manually

<div class="alert alert-warning">
  <strong>Heads up!</strong> Before you decide to follow the manual process, you should know that the Management APIv2 token has a validity of <strong>24 hours</strong>. After that the token will expire and you will have to get a new one. If this doesn't work for you, you can <a href="#automate-the-process">automate the process</a>.
</div>

Let's see how you can get a token manually. Note, that the first two steps of the process need to be executed _only_ the first time. This might be true also for the third step, if the endpoints you need to access do not change. In that case you can skip to the [Get the Token](#4-get-the-token) section.

### 1. Create a Client

First, you need to create a Non Interactive Client. We recommend creating one exclusively for authorizing access to the Management API, instead of reusing another one you might have. If you already have done that, you can skip this paragraph.

  ::: panel-info What is a Non Interactive Client?
  A Non Interactive Client represents a program that interacts with an API where there is no user involved. An example would be a server script that would be granted access to consume a Zip Codes API. It's a machine to machine interaction. This must be used instead of a Single Page or Native apps because those cannot meet the necessary security requirements for executing this type of flow. If you want to read more about calling APIs this way, refer to [Calling APIs from a Service](/api-auth/grant/client-credentials).
  :::

Go to the [Clients section](${manage_url}/#/clients) of the dashboard and click the **Create Client** button.

Enter a name for your new client. We recommend using something descriptive, like `Auth0 Management API Client`.

Select **Non Interactive Clients** and then click **Create**.

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

The last step, before you get a token, is to select which scopes should be granted to this client.

  ::: panel-info What are the scopes?
  The scopes are permissions that should be granted by the owner. Each [Auth0 Management API v2](/api/management/v2) endpoint requires specific scopes. For example, the [Get all clients](/api/management/v2#!/Clients/get_clients) endpoint requires the scopes `read:clients` and `read:client_keys`, while the [Create a client](/api/management/v2#!/Clients/post_clients) endpoint requires the scope `create:clients`. From that we can deduce that if we need to read _and_ create clients, then our token should include three scopes: `read:clients`, `read:client_keys` and `create:clients`.
  :::

If you followed this article so far, then you already are at the _Non Interactive Clients_ tab of the `Auth0 Management API`. If not, go to [APIs](${manage_url}/#/apis), click the **Edit** icon for `Auth0 Management API`, go to _Non Interactive Clients_ and expand your non interactive client, using the pointing down arrow, next to the _Authorized_ toggle.

All the scopes, for the various [Management API v2](/api/management/v2) endpoints are listed here. Tick the ones you want to grant to the client and click the **Update** button. To find out which scopes you should choose, go the [Management API v2](/api/management/v2) and note the scopes listed at each endpoint.

![Choose authorized scopes](/media/articles/api/tokens/choose-scopes.png)

__NOTE__: If you have multiple apps that should access the Management API, and you need different sets of scopes per app, we recommend creating a new Non Interactive Client for each. For example, if one app is to read and create users (`create:users`, `read:users`) and another to read and create clients (`create:clients`, `read:clients`) create two Clients (one for user scopes, one for clients) instead of one.

### 4. Get the Token

To get a token, go to the *Test* section under `Auth0 Management API`.

This page will give you code snippets on how to form a request to get a token.

Check the _Response_, a token is already generated for you. Click **Copy Token**.

![Test Client](/media/articles/api/tokens/test-client.png)

You can now make authorized calls to the [Management API v2](/api/management/v2) using this token.

### 5. Use the Token

You can use the [Management API v2 explorer page](/api/management/v2) to manually call an endpoint, using the token you got in the previous step. You will need two pieces of information:
- The Management API v2 token you just got.
- Your tenant's domain (`${account.namespace}`). You can find this on the _Settings_ of any of your [Clients](${manage_url}/#/clients/${account.clientId}/settings).

Once you have this information you are ready to call the API. Follow these steps:
1. Go to the [Management API v2 explorer page](/api/management/v2).
1. Click the __Set API Token__ button at the top left.
1. Set the __Domain__ and __API Token__ fields, and click __Set Token__.
1. Under the __Set API Token__ button at the top left, some new information is now displayed: the domain and token set, and the scopes that have been granted to this client.
1. Go to the endpoint you want to call, fill any parameters that might be required and click __Try__.

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

To ask Auth0 for a Management API v2 token, perform a `POST` operation to the `https://${account.namespace}/oauth/token` endpoint, using the credentials of the Non Interactive Client you created at [this step](#1-create-a-client).

The payload should be in the following format:

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
- `client_id`: This is the value of the __Client ID__ field of the Non Interactive Client you created at [this step](#1-create-a-client). You can find it at the [Settings tab of your Client](${manage_url}/#/clients/${account.clientId}/settings).
- `client_secret`: This is the value of the __Client Secret__ field of the Non Interactive Client you created at [this step](#1-create-a-client). You can find it at the [Settings tab of your Client](${manage_url}/#/clients/${account.clientId}/settings).
- `audience`: This is the value of the __Identifier__ field of the `Auth0 Management API`. You can find it at the [Settings tab of the API](https://${manage_url}/#/apis).

The response will contain a [signed JWT (JSON Web Token)](/jwt), when it expires, the scopes granted, and the token type.

```json
{
  "access_token": "eyJ...Ggg",
  "expires_in": 86400,
  "scope": "read:clients create:clients read:client_keys",
  "token_type": "Bearer"
}
```

From the above we can see that our `access_token` is a [bearer access token](https://tools.ietf.org/html/rfc6750), it will expire in 24 hours (86400 seconds), and it has been authorized to read and create clients.

### 2. Use the Token

To use this token, just include it in the `Authorization` header of your request .

```har
{
  "method": "POST",
  "url": "http://PATH_TO_THE_ENDPOINT/",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN"}
  ]
}
```

For example, in order to [Get all clients](/api/management/v2#!/Clients/get_clients) use the following:

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/api/v2/clients",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5ESTFNa05DTVRGQlJrVTRORVF6UXpFMk1qZEVNVVEzT1VORk5ESTVSVU5GUXpnM1FrRTFNdyJ9.eyJpc3MiOiJodHRwczovL2RlbW8tYWNjb3VudC5hdXRoMC5jb20vIiwic3ViIjoib9O7eVBnMmd4VGdMNjkxTnNXY2RUOEJ1SmMwS2NZSEVAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGVtby1hY2NvdW50LmF1dGgwLmNvbS9hcGkvdjIvIiwiZXhwIjoxNDg3MDg2Mjg5LCJpYXQiOjE5ODY5OTk4ODksInNjb3BlIjoicmVhZDpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMifQ.oKTT_cEA_U6hVzNYPCl_4-SnEXXvFSOMJbZyFydQDPml2KqBxVw_UPAXhjgtW8Kifc_b2HQ4jFh7nH0KC_j1XjfEJPvwFZgqfI_ILzO3DPfpEIK_n_aX-Tz4okbZe6nj2aT_qLpHimLxK50jOGaMuzp4a1djHJTj5q-NbIiPW8AJowS2-gveP4T3dyyegUsZkmTNwrreqppPApmpWWE-wVsxnVsI_FZFrHnq0rn7lmY_Iz6vyiZjaKrd2C3hFm0zFGTn8FslBfHUldTcDNzOKOpCq7HFMeU0urXBXDetrzkW1afxIqED3G2C51JEV-4nTRYUinnWgXJfLJ87G3ge_A"}
  ]
}
```

<div class="alert alert-info">
  You can get the curl command for each endpoint from the Management API v2 Explorer. Go to the endpoint you want to call, and click the <em>get curl command</em> link at the <em>Test this endpoint</em> section.
</div>

That's it! You are done!

### Sample Implementation: Python

This python script gets a Management API v2 access token, uses it to call the [Get all clients](/api/management/v2#!/Clients/get_clients) endpoint, and prints the response in the console.

Before you run it make sure that the following variables hold valid values:
- `AUDIENCE`: The __Identifier__ of the `Auth0 Management API`. You can find it at the [Settings tab of the API](https://${manage_url}/#/apis).
- `DOMAIN`: The __Domain__ of the Non Interactive Client you created at [this step](#1-create-a-client).
- `CLIENT_ID`: The __Client ID__ of the Non Interactive Client you created at [this step](#1-create-a-client).
- `CLIENT_SECRET`: The __Client Secret__ of the Non Interactive Client you created at [this step](#1-create-a-client).

```python
def main():
  import json, urllib, urllib2

  # Configuration Values
  AUDIENCE = "https://${account.namespace}/api/v2/"
  DOMAIN = "${account.namespace}"
  CLIENT_ID = "${account.clientId}"
  CLIENT_SECRET = "${account.clientSecret}"
  GRANT_TYPE = "client_credentials" # OAuth 2.0 flow to use

  # Get an access token from Auth0
  base_url = "https://{domain}".format(domain=DOMAIN)
  data = urllib.urlencode([('client_id', CLIENT_ID),
                          ('client_secret', CLIENT_SECRET),
                          ('audience', AUDIENCE),
                          ('grant_type', GRANT_TYPE)])
  req = urllib2.Request(base_url + "/oauth/token", data)
  response = urllib2.urlopen(req)
  oauth = json.loads(response.read())
  access_token = oauth['access_token']

  # Get all Clients using the token
  req = urllib2.Request(base_url + "/api/v2/clients")
  req.add_header('Authorization', 'Bearer ' + access_token)
  req.add_header('Content-Type', 'application/json')

  try:
    response = urllib2.urlopen(req)
    res = json.loads(response.read())
    print res
  except urllib2.HTTPError, e:
    print 'HTTPError = ' + str(e.code) + ' ' + str(e.reason)
  except urllib2.URLError, e:
    print 'URLError = ' + str(e.reason)
  except urllib2.HTTPException, e:
    print 'HTTPException'
  except Exception:
    print 'Generic Exception'

# Standard boilerplate to call the main() function.
if __name__ == '__main__':
  main()
```

## Frequently Asked Questions

__How long is the token valid for?__</br>
The Management APIv2 token has a validity of __24 hours__. After that the token will expire and you will have to get a new one.

__The old way of generating tokens was better, since the token never expired. Why was this changed?__</br>
The old way of generating tokens was insecure since the tokens had an infinite lifespan and could not be revoked. The new way allows tokens to be generated with specific scopes, expirations, and with the ability to revoke tokens if they were to be breached. We decided to move to the most secure implementation because your security, and that of your users, is priority number one for us.

__Can I change my token's validity period?__</br>
No, we have disabled this option. Your applications should use short-lived tokens to minimize security risks.

__Can I refresh my token?__</br>
You cannot renew a Management APIv2 token. A [new token](#4-get-the-token) should be created when the old one expires.

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
