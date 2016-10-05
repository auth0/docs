---
description: Lists the properties that are available for the context argument when creating rules.
---

# Context Argument Properties in Rules

When creating [Rules](/rules), the following properties are available for the `context' argument:

* `clientID`: the client id of the application the user is logging in to.
* `clientName`: the name of the application (as defined on the dashboard).
* `connection`: the name of the connection used to authenticate the user (e.g.: `twitter` or `some-google-apps-domain`)
* `connectionStrategy`: the type of connection. For social connection `connectionStrategy` === `connection`. For enterprise connections, the strategy will be `waad` (Windows Azure AD), `ad` (Active Directory/LDAP), `auth0` (database connections), etc.
* `jwtConfiguration`: an object to configure how Json Web Tokens (JWT) will be generated:
  * `lifetimeInSeconds`: expiration of the token.
  * `scopes`: predefined scopes values (e.g.: `{ 'images': ['picture', 'logo'] }` this scope value will request access to the picture and logo claims).
* `protocol`: the authentication protocol. Possible values:
  * `oidc-basic-profile`: most used, web based login
  * `oidc-implicit-profile`: used on mobile devices and single page apps
  * `oauth2-resource-owner`: user/password login typically used on database connections
  * `oauth2-resource-owner-jwt-bearer`: login using a bearer JWT signed with user's private key
  * `samlp`: SAML protocol used on SaaS apps
  * `wsfed`: WS-Federation used on Microsoft products like Office365
  * `wstrust-usernamemixed`: WS-trust user/password login used on CRM and Office365
  * `delegation`: when calling the [Delegation endpoint](/auth-api#delegated)
  * `redirect-callback`: when a redirect rule is resumed
* `request`: an object containing useful information of the request. It has the following properties:
  * `query`: the querystring of the login transaction sent by the application
  * `body`: the body of the POST request on login transactions used on `oauth2-resource-owner`, `oauth2-resource-owner-jwt-bearer` or `wstrust-usernamemixed` protocols.
  * `userAgent`: the user-agent of the client that is trying to log in.
  * `ip`: the originating IP address of the user trying to log in.
* `samlConfiguration`: an object that controls the behavior of the SAML and WS-Fed endpoints. Useful for advanced claims mapping and token enrichment (only available for `samlp` and `wsfed` protocol).
* `sso`: this object will contain information about the SSO transaction (if available)
  * `with_auth0`: when a user signs in with SSO to an application where the `Use Auth0 instead of the IdP to do Single Sign On` setting is enabled.
  * `with_dbconn`: an SSO login for a user that logged in through a database connection.
* `stats`: an object containing specific user stats, like `stats.loginsCount`.
* `hostname`: the hostname that is being used for the authentication flow.
