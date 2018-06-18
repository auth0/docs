---
description: Details on how to generate and use an Access Token for the Management API
section: apis
crews: crew-2
toc: true
---
# Access Tokens for the Management API

To call the [Management API](/api/management/v2) endpoints, you'll need an Access Token for the Management API. 

The Access Token is a [JSON Web Token (JWT)](/jwt) that contains specific permissions (called **scopes**) on what the client is or isn't allowed to do with the API and is [signed using RS256](/apis#signing-algorithms). The Access Token for the Management API also has the **audience** set to **https://${account.tenant}.auth0.com/api/v2/**.

## How to get an Access Token for the Management API

There are two ways to get an Access Token

1. [Manually](/api/management/v2/tokens/manually). You can obtain tokens manually from the Dashboard for instances where you're performing quick, one-off actions (such as testing an endpoint).
2. [Programmatically](/api/management/v2/tokens/programatically). If you need to make scheduled or frequent calls to the Management API, you can build a client that generates Access Tokens for your use. By doing this, your client's behavior is functionally equivalent to having a non-expiring token.

## Token validity

By default, the Access Token is valid for 24 hours. Once the token expires, you will need to obtain a new token.

If this doesn't work for you, you can either:

1. [Change the validity period of the token](#2-get-the-token)
2. [Automate the token request process](/api/management/v2/tokens/programatically). Doing this is the functional equivalent of having a non-expiring token.

## Frequently Asked Questions

**How long is the token valid?**

By default, the Access Token expires **24 hours** after issue. Once the token expires, you'll need to get a new token to continue making calls to the API endpoints.

If you get tokens manually from [the API Explorer tab of the Management API](${manage_url}/#/apis/management/explorer), you can extend expiration time. However, please remember that lengthy expiration times are less secure.

**Previously, tokens never expired. Why was this changed?**

Tokens generated with an infinite lifespan are inherently less secure than those that expire after a definite period of time.

The existing token in use allows tokens to be generated with specific expiration times *and* scopes. This increases the security of your implementation, which is the number one priority for us.

**Can I change the validity period for my token?**

While you cannot change the default validity period (which is set to 24 hours), you can change the expiration time for a specific token you've retrieved manually from [the API Explorer tab of your Auth0 Management API](${manage_url}/#/apis/management/explorer). Please remember that your apps should use short-lived tokens to minimize security risks as much as possible.

**Can I refresh my token?**

You cannot renew an Access Token. You should create a [new token](#2-get-the-token) old token expires.

**Can I revoke a token that has been compromised?**

Unfortunately, you cannot revoke an Access Token directly, which is why we recommend short-lived tokens.

Please note, however, that deleting the client grant will prevent *new tokens* from being issued to the client. You can do this via the [Management API](/api/management/v2#!/Client_Grants/delete_client_grants_by_id) or the [Management Dashboard](${manage_url}/#/apis/management/authorized-clients).

**What should I do if my Client Secret has been compromised?**

Change your Client Secret immediately:

1. Go to your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings) page
2. Click the __Rotate__ icon <i class="notification-icon icon-budicon-171"></i> **or** use the [Rotate a Client Secret](/api/management/v2#!/Clients/post_rotate_secret) endpoint

Please note that previously issued tokens will continue to be valid until their expiration time.

## Keep reading

::: next-steps
* [Manually Obtain Access Tokens](/api/management/v2/tokens/manually)
* [Programmatically Obtain Access Tokens](/api/management/v2/tokens/programatically)
* [Changes in Access Tokens for the Management API](/api/management/v2/tokens-flows)
:::
