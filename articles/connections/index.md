---
description: Learn about Auth0 connections and the different sources of users against which a user can be authenticated.
topics:
  - connections
contentType: 
    - index
    - concept
useCase:
  - customize-connections
  - add-idp
---
# Connections

A connection is the relationship between Auth0 and a source of users against which a user can be authenticated. Auth0 sits between your application and its sources of users, which adds a level of abstraction so your application is isolated from any changes to and idiosyncrasies of each source's implementation.

In the Auth0 Dashboard, you can configure any number of connections for your applications to use. To view all the connections that you have configured or create new ones, see [View Connections](/dashboard/guides/connections/view-connections).

By default, Auth0 automatically syncs user profile data with each user login, thereby ensuring that changes made in the connection source are automatically updated in Auth0. You can [optionally disable this synchronization](/dashboard/guides/connections/configure-connection-sync) to allow for updating profile attributes from your application.

Auth0 supports the following sources of users:

* **[Identity Provider](/identityproviders)**: Allows your app to receive identity information from other servers. For example, Google is an Identity Provider; if a user logs in to a website using their Google account, then a Google server sends their identity information to that site. Identity Providers are categorized as [Social](/identityproviders#social), [Enterprise](/identityproviders#enterprise), and [Legal](/identityproviders#legal).

* **[Database](/connections/database)**: Allows you to create your own user store against which you can authenticate users with an email address or username, and a password. Credentials can be securely stored either in the Auth0 user store or in your own custom database.

* **[SAML](/connections/saml)**: ??

* **[Passwordless](/connections/passwordless)**: Allows your users to log in without needing to remember a password. Instead, passwordless connections use a configured authentication channel like SMS or email.
