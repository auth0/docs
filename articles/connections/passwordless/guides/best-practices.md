---
title: Passwordless Connections Best Practices
description: Passwordless Connections Best Practices
toc: true
topics:
    - connections
    - passwordless
    - authentication
    - concept
---

##  Linking Accounts

When a user authenticates via Passwordless, the user is attached to the connection using Auth0 as the Identity Provider (IdP). Since you can't force users to use the same mobile phone number or email address every time they authenticate, users may end up with multiple user profiles in the Auth0 datastore; you can link multiple user profiles through [account linking](/link-accounts).

## Implementing MFA with Passwordless

Passwordless differs from Multi-factor Authentication (MFA) in that only one factor is used to authenticate the user is the one-time-use code or link received by the user. 

If you want to require that users log in with a one-time-use code  **in addition** to another factor (e.g., username/password or a social Identity Provider, such as Google), see [Multi-factor Authentication (MFA)](/multifactor-authentication).

## Implementing Login

Use the [Universal Login](/universal-login) [Classic Experience](/universal-login/classic) with the Lock (passwordless) template for your login page.

<%= include('../_includes/_rate_limit_server_side') %>