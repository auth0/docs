---
description: How to set Access Token lifetime
topics:
  - tokens
  - access-tokens
contentType:
  - how-to
useCase:
  - invoke-api
---

# Set Access Token Lifetime

You control the Access Token lifetime on a per-API basis.

Auth0 recommends that you set the validity period of your taken based on the security requirements of your API. For example, an Access Token that accesses a banking API should expire more quickly than one that accesses a ToDo API.

To configure the amount of time a token lives, use the **Token Expiration (Seconds)** field for your API in the [Dashboard](${manage_url}/#/apis) APIs section. 
* Default value: `24` hours (`86400` seconds)
* Maximum amount of time (in seconds) that the token can be valid after being issued: `2592000` seconds (`30` days).

![Token Expiration - API](/media/articles/tokens/tokens-expiration-api.png)

## Regain access after an Access Token expires
Once expired, an Access Token can no longer be used to access an API. To regain access, a new Access Token needs to be obtained. This can be done by repeating the OAuth flow used to obtain the initial Access Token.

## Use a Refresh Token to gain permanent access to an API
In some situations, it is desirable to have permanent, ongoing access to an API without having to repeat an OAuth flow. This is often referred to as `offline_access`, and is possible with the use of a [Refresh Token](/tokens/refresh-token).

A Refresh Token is issued from the OAuth 2.0 endpoints along with the Access Token. When the Access Token expires, the Refresh Token can be used to obtain a fresh Access Token with the same permissions, without further involvement from a user. 

Note that offline access is enabled as a policy of the API to which the Access Token grants access. This is a setting that can be altered in the [Dashboard](${manage_url}/#/apis) in the APIs section. If the API does not permit offline access, a Refresh Token will not be issued. In such circumstances, the OAuth flow must be repeated in order to obtain a new Access Token.

![Offline Access - API](/media/articles/tokens/tokens-offlineaccess-api.png)
