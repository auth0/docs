---
description: How to manually generate and use a token for the Management API
section: apis
crews: crew-2
toc: true
---
# Manually generate and use a token for the Management API

In this article, we will cover how you can generate the token required to call the Management API manually. We will then cover how you can use your newly-obtained token.

## Token validity

By default, the Management API Token is valid for 24 hours. Once the token expires, you will need to obtain a new token.

If this doesn't work for you, you can either:

1. [Change the validity period of the token](#2-get-the-token)
2. [Automate the token request process](/api/management/v2/tokens/programatically).

## Generate a token for the Management API

To generate a token for use with the Management API, you will need to:

1. Create and authorize a client
2. Get the token by copying it for later use

## 1. Create and authorize a client

::: warning
You need to follow the steps to create and authorize a client only once.
:::

The first thing you need to do is create an authorize a Non Interactive Client.

We recommend creating a Non Interactive Client exclusively for authorizing access to the Management API instead of reusing one you might already have.

::: panel What is a Non Interactive Client?
A Non Interactive Client represents a program that interacts with an API where there is no user involved. For example, you might have a server-side script that needs access to an API, which is a [machine-to-machine interaction](/api-auth/grant/client-credentials). In such instances, you must use a Non Interactive Client (instead of a Single Page or Native App client), since neither meet the security requirements for this type of flow.
:::

To create and authorize a Non Interactive Client for the Management API, go to [the API Explorer tab of your Auth0 Management API](${manage_url}/#/apis/management/explorer).

Click the button __Create & Authorize a Test Client__.

![Create and Authorize Client](/media/articles/api/tokens/create-authorize-client.png)

That's it! A new client has been created for you, and it is authorized to access the Management API.

### Scopes

Please note that each Non Interactive Client that accesses an API has to be granted a set of scopes. The client that we just created has been granted **all** scopes needed to call the Management API endpoints -- in other words, token users can access all endpoints.

::: panel What are scopes?
Scopes are permissions granted by the owner. Each [Auth0 Management API v2](/api/management/v2) endpoint requires specific scopes.

For example, the [Get all clients](/api/management/v2#!/Clients/get_clients) endpoint requires the read:clients and read:client_keys scopes, while the [Create a client](/api/management/v2#!/Clients/post_clients) endpoint requires the `create:clients` scope.

If you need to read **and** create clients, then your token should include three scopes: read:clients, read:client_keys, and create:clients.
:::

::: note
If you have multiple apps needing access to the Management API, and each app needs a different set of scopes, we recommend creating a Non Interactive Client for each app.
:::

### 2. Get the token

The Management API Token is automatically generated and displayed on [the API Explorer tab of your Auth0 Management API](${manage_url}/#/apis/management/explorer).

Please note that this token has, by default, an expiration time of **24 hours** (86400 seconds). To change this, you can update the __Token Expiration (Seconds)__ field before clicking __Update & Regenerate Token__.

![Test Client](/media/articles/api/tokens/copy-token.png)

Finally, click __Copy Token__ to get the updated token so that you can make authorized calls to the [Management API](/api/management/v2).

### 3. Use the token

You can use the [Management API Explorer](/api/management/v2) to manually call an endpoint.

You will need:

* The Management API Token you just obtained
* The domain for your tenant (**${account.namespace}**). You can also find this on the **Settings** page for any of your [clients](${manage_url}/#/clients/${account.clientId}/settings)

Once you have this information you are ready to call the API. Follow these steps:

1. Go to the [Management API Explorer](/api/management/v2)
1. Click the __Set API Token__ button at the top left of your screen
1. Set the __Domain__ and __API Token__ fields, and click __Set Token__
1. You will now see the following information displayed under __Set API Token__: the domain, the token set, and the scopes that have been granted
1. Go to the endpoint you want to call, fill any parameters that might be required, and click __Try__

![Set the Token](/media/articles/api/tokens/set-token.png)