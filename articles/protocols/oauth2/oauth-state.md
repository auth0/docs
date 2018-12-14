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

## Keep reading

* [0Auth 2.0 Authorization Framework](/protocols/oauth2)
* [Which OAuth 2.0 flow should I use?](/api-auth/which-oauth-flow-to-use)
* [API Authorization](/api-auth)

