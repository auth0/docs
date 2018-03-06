---
description: Details on how to generate and use a token for the Auth0 Management APIv2
section: apis
crews: crew-2
toc: true
---
# The Auth0 Management APIv2 Token

To call the [Management API] endpoints, you'll need what we refer to as the **Management API Token**.

The Management API Token is a [JSON Web Token (JWT)](/jwt) that:

1. Contains specific permissions (called **scopes**) on what the client is or isn't allowed to do with the API
2. Is signed with the client's API key and secret

## How to get an Management API Token

There are two ways to get a Management API Token

1. [Manually](/api/management/v2/tokens/manually) using the Dashboard
2. [Programmatically](/api/management/v2/tokens/programatically), where you build a simple command line tool that generates tokens

## Frequently Asked Questions

**How long is the token valid?**

By default, the Management API Token expires **24 hours** after issue. Once the token expires, you'll need to get a new token to continue making calls to the API endpoints.

If you get tokens manually from [the API Explorer tab of the Management API](${manage_url}/#/apis/management/explorer), you can extend expiration time. However, please remember that lengthy expiration times are less secure.

**Previously, tokens never expired. Why was this changed?**

Tokens generated with an infinite lifespan are inherently less secure than those that expire after a definite period of time.

The existing token in use allows tokens to be generated with specific expiration times. This increases the security of your implementation, which is the number one priority for us.

**Can I change the validity period for my token?**

While you cannot change the default validity period (which is set to 24 hours), you can change the expiration time for a specific token you've retrieved manually from [the API Explorer tab of your Auth0 Management API](${manage_url}/#/apis/management/explorer). Please remember that your apps should use short-lived tokens to minimize security risks as much as possible.

**Can I refresh my token?**

You cannot renew a Management API Token. You should create a [new token](#2-get-the-token) old token expires.

**Can I revoke a token that has been compromised?**

Unfortunately, you cannot revoke a Management API Token directly, which is why we recommend short-lived tokens.

Please note, however, that deleting the client grant will prevent *new tokens* from being issued to the client. You can do this via the [Management API](/api/management/v2#!/Client_Grants/delete_client_grants_by_id) or the [Management Dashboard](${manage_url}/#/apis/management/authorized-clients).

**What should I do if my Client Secret has been compromised?**

Change your Client Secret immediately:

1. Go to your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings) page
2. Click the __Rotate__ icon <i class="notification-icon icon-budicon-171"></i> **or** use the [Rotate a Client Secret](/api/management/v2#!/Clients/post_rotate_secret) endpoint

Please note that previously issued tokens will continue to be valid until their expiration time.

## Keep reading

::: next-steps
* [Changes in Auth0 Management APIv2 Tokens](/api/management/v2/tokens-flows)
* [Calling APIs from a Service](/api-auth/grant/client-credentials)
* [Ask for Access Tokens for a Client Credentials Grant](/api-auth/config/asking-for-access-tokens)
* [Information on the query string syntax](/api/management/v2/query-string-syntax)
* [Search for Users](/api/management/v2/user-search)
:::
