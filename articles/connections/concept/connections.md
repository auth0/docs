---
title: Connections
description: Explains Auth0 Connections.
topics:
  - authentication
  - applications
  - dashboard
contentType: concept
useCase:
  - add-login
---
# Connections

A connection is the relationship between Auth0 and a source of users. Auth0 sits between your application and its sources of users, which adds a level of abstraction so your application is isolated from any changes to and idiosyncrasies of each source's implementation.

Connections can be categorized as:

- [Identity Providers](/connections/concept/identity-providers): Provide identity information from their servers to other servers. Example: Google; if you log in to a site using your Google account, then a Google server will send your identity information to that site.
- [Databases](/connections/concept/database-connections): Function as your own user store, allowing you to authenticate users with an email (or username) and a password. Credentials can be securely stored with Auth0 or in your own database.
- [Passwordless](/connections/concept/passwordless-connections): Allow users to login without the need to remember a password. Use an authentication channel like SMS or email.
