---
title: Client Credentials exchange
---

# Client Credentials exchange

<%= include('./_about.md') %>

<%= include('../../../_includes/_client-credentials-warning') %>

The [Client Credentials exchange](/api-auth/grant/client-credentials) allows clients to authenticate as themselves (i.e. not on behalf of any user) to programmatically and securely obtain access to an API.

This exchange does not exist in the legacy pipeline, but the [Resource Owner Password Credentials exchange](/api-auth/tutorials/adoption/password) can be used to simulate it by creating a "service user".

We strongly discourage the latter approach in favor of using Client Credentials, since it allows defining fine-grained permissions for each API client.

::: note
  For more information on how to execute a Client Credentials exchange refer to <a href="/api-auth/grant/client-credentials">Call APIs from Client-side Web Apps</a>.
:::

## Further reading

<%= include('./_index.md') %>
