---
title: Legal Identity Providers
description: Learn about legal identity providers supported by Auth0.
topics:
  - connections
  - identity-providers
contentType: 
    - reference
useCase:
  - customize-connections
  - add-idp
---
# Legal Identity Providers

Through our partner, Criipto, we offer a growing range of government and bank identities tied to legal persons. If what you need isn't found here, please contact [Criipto](https://criipto.com).

<% var criiptoConnections = cache.find('articles/connections/criipto', {sort: 'index'}); %>
<%= include('./_connections', { connections: criiptoConnections }) %>