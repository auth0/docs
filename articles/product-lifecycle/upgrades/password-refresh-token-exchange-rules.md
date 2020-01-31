---
description: Describes the new feature that allows you to execute rules during the OAuth 2.0 Resource Owner Password Grant (ROPG) exchange and the Refresh Token exchange.
topics:
  - upgrades
  - rules
  - refresh-tokens
contentType:
  - reference
useCase:
  - password-token-exchange
  - refresh-token-exchange
---
# Upgrade Notice: Password and Refresh Token Exchange Rules Using /oauth/token

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2017-02-23 |  2017-05-31 |

As part of Auth0's efforts to improve security, we recently added the ability to execute rules during the OAuth 2.0 Resource Owner Password Grant exchange (the password exchange) and the <dfn data-key="refresh-token">Refresh Token</dfn> exchange.

You are using this feature if you are calling the [/oauth/token](/api/authentication#authorization-code) endpoint of our Authentication API with `grant_type = "password"` , `grant_type = "http://auth0.com/oauth/grant-type/password-realm"`, or `grant_type = "refresh_token"`.

## Are you affected?

You could be impacted if you are currently using these exchanges and have Rules defined in Dashboard. In order to ensure a smooth transition, we have disabled the rules execution on these specific exchanges for your tenant. These rules will now execute for all new customers, as well as customers who have not yet used these exchanges.

You can add logic to your rules to alter their behavior for these exchanges by checking the `context.protocol` property:
- `oauth2-password` indicates the password (and password-realm) exchange
- `oauth2-refresh-token` indicates the Refresh Token exchange

If you would like to enable the new behavior on this tenant for testing before the mandatory opt-in date, login to [Dashboard](${manage_url}) and enable the __Run Rules on Password and Refresh Token Exchanges__ toggle in [Tenant Settings > Advanced](${manage_url}/#/tenant/advanced).

If you need help with the migration, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT})
