---
title: Client Credentials exchange
tags:
  - api-authentication
  - oidc
  - client-credentials
articleType: discussion
---

# Client Credentials exchange

<%= include('./_about.md') %>

The [Client Credentials exchange](/api-auth/grant/client-credentials) allows apps to authenticate as themselves (that is, not on behalf of any user) to programmatically and securely obtain access to an API.

This exchange does not exist in the legacy pipeline, but the [Resource Owner Password Credentials exchange](/api-auth/tutorials/adoption/password) can be used to simulate it by creating a "service user".

We strongly discourage the latter approach in favor of using Client Credentials, since it allows defining fine-grained permissions for each API app.

::: note
  For more information on how to execute a Client Credentials exchange refer to <a href="/api-auth/grant/client-credentials">Call APIs from Client-side Web Apps</a>.
:::

## Further reading

<%= include('./_index.md') %>
