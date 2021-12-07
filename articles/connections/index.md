---
section: articles
classes: topic-page
title: Connections
description: Describes the various sources of users supported by Auth0, including identity providers, databases, and passwordless authentication methods.
topics:
  - connections
contentType: 
    - index
useCase:
  - customize-connections
  - add-idp
---
# Connections

A connection is the relationship between Auth0 and a source of users, which may include external Identity Providers (such as Google or LinkedIn), databases, or passwordless authentication methods. Auth0 sits between your application and its sources of users, which adds a level of abstraction, so your application is isolated from any changes to and idiosyncrasies of each source's implementation.

By default, Auth0 automatically syncs user profile data with each user login, thereby ensuring that changes made in the connection source are automatically updated in Auth0. You can disable synchronization to allow for updating profile attributes from your application.

You can configure any number of connections for your applications. 

| Read... | To learn... |
|---------|-------------|
| [Social Identity Providers](/connections/identity-providers-social) | About the external social Identity Providers supported by Auth0. |
| [Enterprise Identity Providers](/connections/identity-providers-enterprise) | About the external enterprise Identity Providers supported by Auth0. |
| [Legal Identity Providers](/connections/identity-providers-legal) | About the external legal Identity Providers supported by Auth0. |
| [Database Connections](/connections/database) | How to create your own user store, which allows you to authenticate users with an email address or username and a password. The credentials can be stored securely in either the Auth0 user store or your own database. |
| [Passwordless Connections](/connections/passwordless) | How to allow users to log in without needing to remember a password. Users enter their mobile phone number or email address, and receive a one-time code or link, which they can use to log in. |
| [View Connections](/dashboard/guides/connections/view-connections) | How to view the configure connections for your application using the Auth0 Dashboard. |
| [Disable Connection Sync](/dashboard/guides/connections/configure-connection-sync) | How to disable the synchronization between user profile data and the connection source, which allows you to update profile attributes from your application instead. |
| [Pass Parameters to Identity Providers](/connections/pass-parameters-to-idps) | How to pass provider-specific parameters to an Identity Provider during authentication. |