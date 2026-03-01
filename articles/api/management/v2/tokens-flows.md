---
description: Describes what changed in the flow for generating Auth0 Management APIv2 tokens and why.
section: apis
crews: crew-2
toc: true
topics:
  - apis
  - management-api
  - tokens
contentType: concept
useCase: invoke-api
---
# Changes in Auth0 Management APIv2 Tokens

Some time ago, we changed the process of getting a Management APIv2 Token. This article explains what changed, why this was done, and how you can work around it (not recommended).

## What changed and why

### The User Experience

Until recently, you could generate a Management APIv2 Token directly from the Management API explorer. You selected the <dfn data-key="scope">scopes</dfn>, according to the endpoint you wanted to invoke, and got a token from that same page.

That way was very easy but it was also __very insecure__. So we changed it.

The new way uses the [Client Credentials Flow](/flows/concepts/client-credentials).

::: note
For details on how to follow this new process, see [Access Tokens for the Management API](/api/management/v2/tokens).
:::

#### Why this changed

To generate the token, the Management API required access to your __Global Client Secret__ (used to sign the token). This is information that should __not__ be exposed to web browsers.

Furthermore, the API Explorer has no way to do authorization. This means that if a user could login and access the API explorer, they could generate a token with __any__ scope, even if they were not allowed to have that scope.

The new OAuth 2.0 Client Credentials grant implementation does not pose such risks. Once you do the initial configuration, you can get a token either by visiting the dashboard, or by making a simple `POST` request to [the `/oauth/token` endpoint of our Authentication API](/api/authentication#client-credentials).

However, with regards to the manual process, we do understand that changing screens is not always the best user experience, so we are looking into ways to make the new flow more intuitive.

### The Validity Period

With the previous flow, the tokens never expired. With the new flow, all Management APIv2 Tokens __expire by default after 24 hours__.

#### Why this changed

Having a token that never expires can be very risky, in case an attacker gets hold of it. If the token expires within a few hours the attacker has only a small window to access your protected resources.

To get a token, you should follow only the process described in [Access Tokens for the Management API](/api/management/v2/tokens).
