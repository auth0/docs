---
title: Identity Providers
description: Explains what Identity Providers are.
topics:
  - authentication
  - applications
  - dashboard
contentType: concept
useCase:
  - add-login
---
# Identity Providers

An Identity Provider is a server that can provide identity information to other servers. For example, Google is an Identity Provider. If you log in to a site using your Google account, then a Google server will send your identity information to that site.

Auth0 is an identity hub that supports many Identity Providers using various protocols (like [OpenID Connect](/protocols/oidc), [SAML](/protocols/saml), [WS-Federation](/protocols/ws-fed), and more). Auth0 sits between your app and the Identity Provider that authenticates your users. This adds a level of abstraction so your app is isolated from any changes to and idiosyncrasies of each provider's implementation.

Identity Providers can be categorized as:

- **Social:** Allow users to authenticate using their existing social media identities.
- **Enterprise:** Leverage existing enterprise authentication infrastructure to allow secure single sign-on (SSO).
- **Legal:** Use electronic legal identity verification, usually issued by banks or governments.


## Keep Reading

- [Identity Providers supported by Auth0](/connections/identity-providers-supported)
