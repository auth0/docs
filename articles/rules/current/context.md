---
title: Context Argument Properties in Rules
description: Lists the properties that are available for the context argument when creating rules.
tags:
  - rules
  - extensibility
---
# Context Argument Properties in Rules

When creating [Rules](/rules), one of the input arguments is `context`. 

This is an object containing contextual information of the current authentication transaction, such as user's IP address, application, location, and so forth.

This article lists all properties that the `context` object includes. For examples on how to use them see [Rules Examples](/rules#examples).

## List of properties

The following properties are available for the `context` object.

| Name | Description |
|-|-|
| `clientID` | The client id of the application the user is logging in to. |
| `clientName` | The name of the application (as defined on the dashboard). |
| `clientMetadata` | An object for holding other application properties. Its keys and values are strings. |
| `connection` | The name of the connection used to authenticate the user (such as: `twitter` or `some-google-apps-domain`) |
| `connectionStrategy` | The type of connection. For social connection `connectionStrategy` === `connection`. For enterprise connections, the strategy will be `waad` (Windows Azure AD), `ad` (Active Directory/LDAP), `auth0` (database connections), and so on. |
| `samlConfiguration` | An object that controls the behavior of the SAML and WS-Fed endpoints. Useful for advanced claims mapping and token enrichment (only available for `samlp` and `wsfed` protocol). |
| `protocol` | <%= include('./_context-protocol.md') %> |
| `stats` | An object containing specific user stats, like `stats.loginsCount`. Note that any of the counter variables returned as part of the `stats` object does not increase during [silent authentication](/api-auth/tutorials/silent-authentication) (as when `prompt=none`). |
| `sso` | <%= include('./_context-sso.md') %> |
| `accessToken` | Used to add custom namespaced claims to the [Access Token](/tokens/access-token). |
| `idToken` | Used to add custom namespaced claims to the [ID Token](/tokens/id-token). |
| `sessionID` | Unique id for the authentication session. Value is kept only if `prompt=none`. |
| `request` | <%= include('./_context-request.md') %> |

## Sample contents

```js
{
  clientID: 'q2hn...pXmTUA',
  clientName: 'Default App',
  clientMetadata: {},
  connection: 'Username-Password-Authentication',
  connectionStrategy: 'auth0',
  samlConfiguration: {},
  protocol: 'oidc-basic-profile',
  stats: { loginsCount: 111 },
  sso: { with_auth0: false, with_dbconn: false, current_clients: [] },
  accessToken: {},
  idToken: {},
  sessionID: 'jYA5wG...BNT5Bak',
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
