---
title: Social Identity Providers
description: Learn about the social identity providers supported by Auth0.
topics:
  - connections
  - identity-providers
contentType: 
    - reference
useCase:
  - customize-connections
  - add-idp
---
# Social Identity Providers

Auth0 supports the following social providers for web applications out of the box. You can also use any [OAuth2 Authorization Server](/connections/social/oauth2) or explore partner-supported social connections in the [Auth0 Marketplace](https://marketplace.auth0.com/).

<% var socialConnections = cache.find('articles/connections/social', {sort: 'index'}); %>
<%= include('../_connections', { connections: socialConnections }) %>