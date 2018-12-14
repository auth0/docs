---
title: State Parameter
description: Explains how to use the state parameter in authentication requests to help prevent CSRF attacks and restore state
topics:
    - protocols
    - oauth
    - state-parameter
    - csrf
contentType:
  - concept
useCase:
  - development
---

# State Parameter

Authorization protocols provide a `state` parameter. During authentication, the application sends this parameter in the authorization request, and the Authorization Server (Auth0) returns this parameter unchanged in the response. This allows you to restore the previous state of your application to do the following:

- [Mitigate CSRF attacks](/protocols/oauth2/mitigate-csrf-attacks).  
- [Redirect users](/protocols/oauth2/redirect-users)

The usage of `state` for CSRF mitigation on the redirection endpoint implies that within the `state` value there is a unique and non-guessable value associated with each authentication request about to be initiated. It’s that unique and non-guessable value that allows you to prevent the attack by confirming if the value coming from the response matches the one you expect (the one you generated when initiating the request).

Besides that usage, the state parameter can also be used to encode application state that will round-trip to the client application after the transaction completes; this is sometimes useful so that the application can put the user where they were before the authentication process happened.

In essence, you send a random value when starting an authentication request and validate the received value when processing the response (this implies you store something on the client application side, in session or other medium, that allows you to perform the validation). If you receive a response with a state that does not match, you were likely the target of an attack because this is either a response for an unsolicited request or someone trying to forge the real response.

## Keep reading

* [0Auth 2.0 Authorization Framework](/protocols/oauth2)
* [Which OAuth 2.0 flow should I use?](/api-auth/which-oauth-flow-to-use)
* [API Authorization](/api-auth)
