---
title: Auth0 access_token vs id_token
---

# Auth0 access_token vs id_token

One of the common questions we get asked is what the difference is between the `access_token` and the `id_token`, and what the use cases are for each. 

* The `access_token` should be sent as credentials when making API calls on behalf of a user.
* The `id_token` is used by the client to obtain profile information about the user, by decoding and verifying the claims in the JWT. The `id_token` should never be sent to an API. 

The `id_token` is an optimization to avoid network requests to the `/userinfo` endpoint. If the `/userinfo` API is called using the `access_token`, it should return the same claims that are encoded directly in the `id_token`. **Note** that in some cases, the `/userinfo` endpoint may return more information, due to size constraints with JWT id_tokens.

## One caveat

One caveat to this however is that due to historical reasons the `access_token` which was issued by Auth0 did not use to be a JSON Web Token. It used to be a proprietary format which was used to call some of the methods on the [Authentication API](/auth-api).

The JWT format for the `access_token` was only introduced with the new [OAuth2 Authentication Flow](https://auth0.com/docs/api-auth), and you will therefore only be issued a JWT when the user authenticates using the new flow.

If you are still using the older authentication flow, then you should be passing the `id_token` to your own APIs to authentication the user. **Please note** however that passing the `id_token` is strongly discouraged because it is less secure than the  `access_token`. If you are using the new OAuth2 authentication flow, then you should be passing the `access_token`.

## Why is the `access_token` more secure?

The `access_token` is only intended to be consumed by the API (Resource Server), which is why its `aud` (audience) claim is set to the resource_server's identifier and why its signed by the Resource Server's signing secret. Therefore only the API (not the Client) can verify and trust the `access_token` JWT.

In contrast, the `id_token` will only be consumable and trusted by the Client.
