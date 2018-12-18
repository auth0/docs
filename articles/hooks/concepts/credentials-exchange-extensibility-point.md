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

The `credentials-exchange` extensibility point allows you to change the scopes and add custom claims to the [Access Tokens](/tokens/overview-access-tokens) issued by the [Auth0 API's `POST /oauth/token` endpoint](/api/authentication#authorization-code) during runtime.

::: note
Please see [Calling APIs from a Service](/api-auth/grant/client-credentials) for more information on the Client Credentials Grant.
:::

## Claim types

You can add the following as claims to the issued token:

* The `scope` property of the response object;
* Any properties with namespaced property names:

  * URLs with HTTP or HTTPS schemes
  * URLs with hostnames that *aren't* auth0.com, webtask.io, webtask.run, or the associated subdomain names

The extensibility point will ignore all other response object properties.

::: note
If you need to configure client secrets and access them within Hooks, use `context.webtask.secrets.SECRET_NAME`.
:::

## Next steps

Learn more on how to use the [Credentials Exchange Extensibility Point](/hooks/guides/use-the-credentials-exchange-extensibility-point)