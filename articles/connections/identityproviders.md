---
url: /identityproviders
description: Learn about identity providers and the different identity providers supported by Auth0.
topics:
  - connections
  - identity-providers
contentType: 
    - concept
useCase:
  - customize-connections
  - add-idp
---
# Identity Providers

An Identity Provider (IdP) is a server that can provide identity information to other servers. For example, Google is an IdP; if a user logs in to a website using their Google account, then a Google server sends their identity information to that site. 

Auth0 is an identity hub that supports many IdPs using various protocols (like <dfn data-key="openid">OpenID Connect (OIDC)</dfn>, <dfn data-key="security-assertion-markup-language">SAML</dfn>, and [WS-Federation](/protocols/ws-fed)); it sits between your application and its sources of users, which adds a level of abstraction so your application is isolated from any changes to and idiosyncrasies of each source's implementation.

IdPs are categorized as [Social](#social), [Enterprise](#enterprise), and [Legal](#legal).

## Social

Auth0 supports the following Social IdPs out of the box. You can also use any [OAuth2 Authorization Server](/connections/social/oauth2).

<% var socialConnections = cache.find('articles/connections/social', {sort: 'index'}); %>
<%= include('./_connections', { connections: socialConnections }) %>

## Enterprise

Auth0 supports the following Enterprise IdPs out of the box.

<% var enterpriseConnections = cache.find('articles/connections/enterprise', {sort: 'index'}); %>
<%= include('./_connections', { connections: enterpriseConnections }) %>

## Legal

Through our partner, Criipto, we offer a growing range of government and bank identities tied to legal persons. If the one you need isn't found here, we suggest getting in touch with [Criipto](https://criipto.com).

<% var criiptoConnections = cache.find('articles/connections/criipto', {sort: 'index'}); %>
<%= include('./_connections', { connections: criiptoConnections }) %>
