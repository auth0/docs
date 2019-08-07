---
description: Describes the credentials-exchange extensibility point for use with Hooks
beta: true
topics:
    - hooks
    - extensibility-points
    - credentials-exchange
contentType:
  - concept
useCase: extensibility-hooks
v2: true
---
# Credentials Exchange Extensibility Point

The `credentials-exchange` extensibility point allows you to change the <dfn data-key="scope">scopes</dfn> and add custom claims to the <dfn data-key="access-token">Access Tokens</dfn> issued by the [Auth0 API's `POST /oauth/token` endpoint](/api/authentication#authorization-code) during runtime.

::: note
Please see [Client Credentials Flow](/flows/concepts/client-credentials) for more information on the Client Credentials Grant.
:::

## Claim types

You can add the following as claims to the issued token:

* The `scope` property of the response object
* Any properties with [namespaced](/tokens/concepts/claims-namespacing) property names

The extensibility point will ignore all other response object properties.

::: note
If you need to configure client secrets and access them within Hooks, use `context.webtask.secrets.SECRET_NAME`.
:::

## Next steps

Learn more on how to use the [Credentials Exchange Extensibility Point](/hooks/guides/use-the-credentials-exchange-extensibility-point)