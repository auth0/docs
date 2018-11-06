---
title: Context Argument Properties in Rules
description: Lists the properties that are available for the context argument when creating rules.
topics:
  - rules
  - extensibility
contentType:
  - reference
useCase:
  - extensibility-rules
---
# Context Argument Properties in Rules

When creating [Rules](/rules), one of the input arguments is `context`. 

This is an object containing contextual information of the current authentication transaction, such as user's IP address, application, location, and so forth.

This article lists all properties that the `context` object includes. For examples on how to use them, see [Rules Examples](/rules#examples) or visit our Github repo at [auth0/rules](https://github.com/auth0/rules).

## List of properties

The following properties are available for the `context` object.

| Name | Description |
|-|-|
| `tenant` | A string containing the name of the tenant |
| `clientID` | The client id of the application the user is logging in to. |
| `clientName` | The name of the application (as defined on the dashboard). |
| `clientMetadata` | An object for holding other application properties. Its keys and values are strings. |
| `connectionID` | A string containing the connection's unique identifier |
| `connection` | The name of the connection used to authenticate the user (such as: `twitter` or `some-google-apps-domain`) |
| `connectionStrategy` | The type of connection. For social connection `connectionStrategy` === `connection`. For enterprise connections, the strategy will be `waad` (Windows Azure AD), `ad` (Active Directory/LDAP), `auth0` (database connections), and so on. |
| `connectionOptions` | An object representing the options defined on the connection. `connectionOptions.tenant_domain` is a string containing the domain being used for authentication when using an Enterprise connection. `connectionOptions.domain_aliases` is an array containing the optional domains registered as aliases in addition to the primary domain (specified in the `connectionOptions.tenant_domain` property). |
| `connectionMetadata` | An object representing metadata defined on the connection. Its keys and values are strings. |
| `samlConfiguration` | An object that controls the behavior of the SAML and WS-Fed endpoints. Useful for advanced claims mapping and token enrichment (only available for `samlp` and `wsfed` protocol). |
| `protocol` | <%= include('./_context-protocol.md') %> |
| `stats` | An object containing specific user stats, like `stats.loginsCount`. Note that any of the counter variables returned as part of the `stats` object do not increase during [silent authentication](/api-auth/tutorials/silent-authentication) (as when `prompt=none`). |
| `sso` | <%= include('./_context-sso.md') %> |
| `accessToken` | An object representing the options defined on the [Access Token](/tokens/concepts/overview-access-tokens). `accessToken.scope` is an array containing permissions in string format and can be used to [change the Access Token's returned scopes](/rules/current#api-authorization-modify-scope). You can also use this object to [add custom namespaced claims](/tokens/guides/add-custom-claims) to the Access Token. |
| `idToken` | An object representing the options defined on the [ID Token](/tokens/id-token). Used to add custom namespaced claims to the ID Token. |
| `original_protocol` | After a [redirect rule](/rules/current/redirect) has executed and the authentication transaction is resumed, this property will be populated with the original protocol used to initiate the transaction. |
| `multifactor` | An object representing the multifactor settings used in [implementing contextual MFA](/multifactor-authentication/custom). |
| `redirect` | The object used to [implement the redirection of a user from a rule](/rules/current/redirect#how-to-implement-a-redirect). |
| `sessionID` | Unique id for the authentication session. Value is kept only if `prompt=none`. |
| `request` | <%= include('./_context-request.md') %> |
| `primaryUser` | The unique user id of the primary account for the user. Used to [link user accounts](/link-accounts#automatic-account-linking) from various identity providers. |

## Sample content

```js
{
  tenant: 'mydomain',
  clientID: 'q2hn...pXmTUA',
  clientName: 'Default App',
  clientMetadata: {},
  connectionID: 'con_V7s88...lgW97',
  connection: 'Username-Password-Authentication',
  connectionStrategy: 'auth0',
  connectionOptions: {},
  connectionMetadata: {},
  samlConfiguration: {},
  protocol: 'oidc-basic-profile',
  stats: { loginsCount: 111 },
  sso: { with_auth0: false, with_dbconn: false, current_clients: [] },
  accessToken: {},
  idToken: {},
  original_protocol: 'oauth2',
  multifactor: {},
  redirect: {},
  sessionID: 'jYA5wG...BNT5Bak',
  primaryUser: 'auth0|user123',
  request:
  {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    ip: '188.6.125.49',
    hostname: 'mydomain.auth0.com',
    query: 
    {
      scope: 'openid',
      response_type: 'code',
      connection: 'Username-Password-Authentication',
      sso: 'true',
      protocol: 'oauth2',
      audience: 'my-api',
      state: 'nB7rfBCL41nppFxqLQ-3cO75XO1QRFyD',
      client_id: 'q2hn...pXmTUA',
      redirect_uri: 'http://localhost/callback',
      device: 'Browser'
    },
    body: {},
    geoip:
    {
      country_code: 'GR',
      country_code3: 'GRC',
      country_name: 'Greece',
      city_name: 'Athens',
      latitude: 136.9733,
      longitude: 125.7233,
      time_zone: 'Europe/Athens',
      continent_code: 'EU'
    }
  }
}
```
