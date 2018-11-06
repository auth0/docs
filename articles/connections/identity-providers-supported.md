---
url: /identityproviders
title: Identity Providers Supported by Auth0
description: Auth0 is an identity hub that supports the many authentication providers listed here.
topics:
   - connections
   - identity providers
contentType: 
   - concept
   - reference
useCase:
  - customize-connections
  - add-idp
---

# Identity Providers Supported by Auth0

Out of the box, Auth0 supports the following [Identity Providers](/connections/concept/identity-providers). Auth0 supports [Social](#social), [Enterprise](#enterprise), and [Legal](#legal) Identity Providers.

## Social

In addition to the listed social Identity Providers, you can [add any other OAuth2 Identity Provider] (/connections/social/oauth2).

<% var socialConnections = cache.find('articles/connections/social', {sort: 'index'}); %>
<%= include('./_connections', { connections: socialConnections }) %>

## Enterprise

<% var enterpriseConnections = cache.find('articles/connections/enterprise', {sort: 'index'}); %>
<%= include('./_connections', { connections: enterpriseConnections }) %>

## Legal

Through our partner, Criipto, we offer a growing range of government and bank identities tied to legal persons. If the one you need isn't found here, please contact [Criipto](https://criipto.com).

<% var criiptoConnections = cache.find('articles/connections/criipto', {sort: 'index'}); %>
<%= include('./_connections', { connections: criiptoConnections }) %>

## Keep Reading

- [Database Connections](/connections/concept/database-connections)
- [Passwordless Connections](/connections/concept/passwordless-connections)
