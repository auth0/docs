---
title: Auth0 access_token vs id_token
---

# Auth0 access_token vs id_token

## When should you use the `access_token` and the `id_token`?

One of the common questions that gets asked is when you should use the `access_token` and when you should use the `id_token`? 

The answer is as follows:

* If you need to pass a user's credentials to your own API in order to authenticate the user against the API, then you should use the `access_token`
* When you want to get information about a user from the [/tokeninfo endpoint](/auth-api#post--tokeninfo), then you should use the `id_token`

The situation above is the ideally correct answer, but in reality things are not that simple. Due to historical reasons, `access_token` which is issued by Auth0 is not always a JWT. It used to be a proprietary format which was used to call some of the methods on the [Authentication API](/auth-api).

The JWT format for the `access_token` was only introduced with the new [OAuth2 Authentication Flow](https://auth0.com/docs/api-auth), and you will therefore only be issued a JWT when the user authenticates using the new flow.

If you are still using the older authentication flow, then you should be passing the `id_token` to your own APIs to authentication the user. **Please note** however that passing the `id_token` is strongly discouraged, and you should therefore only use it in this scenarion. If you are using the new OAuth2 authentication flow, then you should be passing the `access_token`.

## Why is the `access_token` more secure?

Can we get a short writeup here??

