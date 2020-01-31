---
description: Describes the deprecation of ROPG usage of the /oauth/ro endpoint. 
topics:
  - passwordless
  - migrations
contentType: reference
useCase:
  - customize-connections
---
# Deprecation Notice: Passwordless API Calls from /oauth/ro

Support for Resource Owner Password Grant (ROPG) was added to [/oauth/token](/api/authentication#authorization-code). Usage of the [/oauth/ro](/api/authentication#resource-owner) endpoint was deprecated on July 08, 2017. This endpoint was used to exchange an OTP received by the end-user by email or SMS with for an `id_token` and an `access_token`. 

We have implemented a new API that replaces `oauth/ro` for this use case, and we recommend customers to migrate to the new implementation.

## Are you affected?

You are affected if you use the resource owner passwordless credentials exchange, and call `/oauth/ro` directly, without the use of any Auth0 libraries or SDKs. 

## Migration

See [Upgrade Notice: Password and Refresh Token Exchange Rules Using /oauth/token](/product-lifecycle/upgrades/references/password-refresh-token-exchange-rules) for information about the new feature.

See [Migration Guide: Passwordless API Calls from /oauth/ro to /oauth/token](/product-lifecycle/migration/guides/migration-oauthro-oauthtoken-pwdless) for details.
