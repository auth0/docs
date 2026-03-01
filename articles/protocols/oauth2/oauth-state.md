---
title: State Parameter
description: Explains how to use the state parameter in authentication requests to help prevent CSRF attacks and restore state
topics:
    - protocols
    - oauth
    - state-parameter
    - csrf
    - xsrf
    - redirecting
    - manage-users
contentType:
  - concept
useCase:
  - development
---

# State Parameter

Authorization protocols provide a `state` parameter that allows you to restore the previous state of your application. The `state` parameter preserves some state object set by the client in the Authorization request and makes it available to the client in the response.  

## CSRF attacks

The primary reason for using the `state` parameter is to mitigate [CSRF attacks](https://en.wikipedia.org/wiki/Cross-site_request_forgery).

When you use `state` for CSRF mitigation on the redirection endpoint, that means that within the `state` value there is a unique and non-guessable value associated with each authentication request about to be initiated. It’s that unique and non-guessable value that allows you to prevent the attack by confirming if the value coming from the response matches the one you expect (the one you generated when initiating the request). The `state` parameter is a string so you can encode any other information in it. 

The way this works is that you send a random value when starting an authentication request and validate the received value when processing the response. This requires you to store something on the client application side (in session or another medium) that allows you to perform the validation. If you receive a response with a state that does not match, you may be the target of an attack because this is either a response for an unsolicited request or someone trying to forge the response. For more information, see [Mitigate CSRF Attacks With State Parameters](/protocols/oauth2/mitigate-csrf-attacks).

![Diagram of CSRF attack](/media/articles/protocols/CSRF_Diagram.png)

::: warning
The cookie in which the `state` value is stored should be signed to prevent attackers to forge it.
:::

## Redirect users

You can also use the `state` parameter to encode an application state that will round-trip to the client application after the transaction completes. In this way, the application can put the user where they were before the authentication process happened. For more information, see [Redirect Users With State Parameters](/protocols/oauth2/redirect-users). 

## Limitations

* From a security perspective, neither the request nor the response is integrity-protected so a user can manipulate them. That is true for adding a parameter to the `redirect_uri` as well.
* The allowed length for `state` is not unlimited. If you get the error `414 Request-URI Too Large`, try a smaller value.

## Keep reading

* [OAuth 2.0 Authorization Framework](/protocols/oauth2)
* [Which OAuth 2.0 flow should I use?](/api-auth/which-oauth-flow-to-use)
* [API Authorization](/api-auth)
* [Mitigate CSRF Attacks With State Parameters](/protocols/oauth2/mitigate-csrf-attacks)
* [Redirect Users With State Parameters](/protocols/oauth2/redirect-users)
