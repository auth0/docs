---
description: Lists the properties that are available for the context argument when creating rules.
---
# Context Argument Properties in Rules

When creating [Rules](/rules), one of the input arguments is `context`. This is an object containing contextual information of the current authentication transaction, such as user's IP address, application, location, and so forth.

The following properties are available for the `context` object:

* `clientID`: the client id of the application the user is logging in to.
* `clientName`: the name of the application (as defined on the dashboard).
* `clientMetadata`: is an object, whose keys and values are strings, for holding other client properties.
* `connection`: the name of the connection used to authenticate the user (such as: `twitter` or `some-google-apps-domain`)
* `connectionStrategy`: the type of connection. For social connection `connectionStrategy` === `connection`. For enterprise connections, the strategy will be `waad` (Windows Azure AD), `ad` (Active Directory/LDAP), `auth0` (database connections), and so on.
* `samlConfiguration`: an object that controls the behavior of the SAML and WS-Fed endpoints. Useful for advanced claims mapping and token enrichment (only available for `samlp` and `wsfed` protocol).
* `protocol`: the authentication protocol. Possible values:
  - `oidc-basic-profile`: most used, web based login
  - `oidc-implicit-profile`: used on mobile devices and single page apps
  - `oauth2-resource-owner`: user/password login typically used on database connections
  - `oauth2-resource-owner-jwt-bearer`: login using a bearer JWT signed with user's private key
  - `oauth2-password`: login using the password exchange
  - `oauth2-refresh-token`: refreshing a token using the Refresh Token exchange
  - `samlp`: SAML protocol used on SaaS apps
  - `wsfed`: WS-Federation used on Microsoft products like Office365
  - `wstrust-usernamemixed`: WS-trust user/password login used on CRM and Office365
  - `delegation`: when calling the [Delegation endpoint](/api/authentication#delegation)
  - `redirect-callback`: when a redirect rule is resumed
* `stats`: an object containing specific user stats, like `stats.loginsCount`. Note that this counter does not increase during [silent authentication](/api-auth/tutorials/silent-authentication) (as when `prompt=none`)
* `sso`: this object will contain information about the SSO transaction (if available)
  - `with_auth0`: when a user signs in with SSO to an application where the `Use Auth0 instead of the IdP to do Single Sign On` setting is enabled.
  - `with_dbconn`: an SSO login for a user that logged in through a database connection.
  - `current_clients`: client IDs using SSO.
* `accessToken`: used to add custom namespaced claims to the `access_token`.
* `idToken`: used to add custom namespaced claims to the `id_token`.
* `sessionID`: unique id for the authentication session. Value is kept only if `prompt=none`
* `request`: an object containing useful information of the request. It has the following properties:
  - `userAgent`: the user-agent of the client that is trying to log in.
  - `ip`: the originating IP address of the user trying to log in.
  - `hostname`: the hostname that is being used for the authentication flow.
  - `query`: an object containing the querystring properties of the login transaction sent by the application. 
  - `body`: the body of the POST request on login transactions used on `oauth2-resource-owner`, `oauth2-resource-owner-jwt-bearer` or `wstrust-usernamemixed` protocols.
  - `geoip`: an object containing geographic IP information. It has the following properties:
    - `country_code`: a two-character code for the country associated with the IP address
    - `country_code3`: a three-character code for the country associated with the IP address
    - `country_name`: the country name associated with the IP address
    - `city_name`: the city or town name associated with the IP address
    - `latitude`: the latitude associated with the IP address.
    - `longitude`: the longitude associated with the IP address.
    - `time_zone`: the timezone associated with the IP address.
    - `continent_code`: a two-character code for the continent associated with the IP address.

## Sample Object

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
