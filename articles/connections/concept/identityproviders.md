---
title: Identity Providers
description: Explains the concept of an identity provider.
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

Auth0 is an identity hub that supports many Identity Providers using various protocols (like OpenID Connect, SAML, WS-Federation, and more). Auth0 sits between your app and the Identity Provider that authenticates your users. This adds a level of abstraction so your app is isolated from any changes to and idiosyncrasies of each provider's implementation.

Identity Providers can be categorized as:

- [Social](/connections/concept/identity-provider): Provide identity information from their servers to other servers. Example: Google; if you log in to a site using your Google account, then a Google server will send your identity information to that site.
- [Enterprise](/connections/concept/database-connection): Function as your own user store, allowing you to authenticate users with an email (or username) and a password. Credentials can be securely stored with Auth0 or in your own database.
- [Legal](/connections/concept/passwordless): Allow users to login without the need to remember a password. Use an authentication channel like SMS or email.

## Keep Reading

- [Identity Providers supported by Auth0]()
