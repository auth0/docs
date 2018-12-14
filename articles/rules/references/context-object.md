---
title: Context Object in Rules
description: Available properties of the context object in Rules.
toc: true
topics:
  - rules
  - extensibility
contentType: reference
useCase: extensibility-rules
---

# Context Object in Rules

The `context` object stores contextual information about the current authentication transaction, such as the user's IP address, application, or location.

## Properties of the `context` object

The following properties are available for the `context` object.

| | |
|-|-|
| `context.tenant` | A string containing the name of the tenant |
| `context.clientID` | The client id of the application the user is logging in to. |
| `context.clientName` | The name of the application (as defined on the dashboard). |
| `context.clientMetadata` | An object for holding other application properties. Its keys and values are strings. |
| `context.connectionID` | A string containing the connection's unique identifier |
| `context.connection` | The name of the connection used to authenticate the user (such as: `twitter` or `some-google-apps-domain`) |
| `context.connectionStrategy` | The type of connection. For social connection `connectionStrategy` === `connection`. For enterprise connections, the strategy will be `waad` (Windows Azure AD), `ad` (Active Directory/LDAP), `auth0` (database connections), and so on. |
| `context.connectionOptions` | An object representing the options defined on the connection. `connectionOptions.tenant_domain` is a string containing the domain being used for authentication when using an Enterprise connection. `connectionOptions.domain_aliases` is an array containing the optional domains registered as aliases in addition to the primary domain (specified in the `connectionOptions.tenant_domain` property). |
| `context.connectionMetadata` | An object representing metadata defined on the connection. Its keys and values are strings. |
| `context.samlConfiguration` | An object that controls the behavior of the SAML and WS-Fed endpoints. Useful for advanced claims mapping and token enrichment (only available for `samlp` and `wsfed` protocol). |
| `context.protocol` | <%= include('../_includes/_context-prop-protocol.md') %> |
| `context.stats` | An object containing specific user stats, like `stats.loginsCount`. Note that any of the counter variables returned as part of the `stats` object do not increase during [silent authentication](/api-auth/tutorials/silent-authentication) (as when `prompt=none`). |
| `context.sso` | <%= include('../_includes/_context-prop-sso.md') %> |
| `context.accessToken` | An object representing the options defined on the [Access Token](/tokens/overview-access-tokens). `accessToken.scope` is an array containing permissions in string format and can be used to [change the Access Token's returned scopes](/rules/current#api-authorization-modify-scope). You can also use this object to [add custom namespaced claims](/tokens/add-custom-claims) to the Access Token. |
| `context.idToken` | An object representing the options defined on the [ID Token](/tokens/id-token). Used to add custom namespaced claims to the ID Token. |
| `context.original_protocol` | After a [redirect rule](/rules/current/redirect) has executed and the authentication transaction is resumed, this property will be populated with the original protocol used to initiate the transaction. |
| `context.multifactor` | An object representing the multifactor settings used in [implementing contextual MFA](/multifactor-authentication/custom). |
| `context.redirect` | The object used to [implement the redirection of a user from a rule](/rules/current/redirect#how-to-implement-a-redirect). |
| `context.sessionID` | Unique id for the authentication session. Value is kept only if `prompt=none`. |
| `context.request` | <%= include('../_includes/_context-prop-request.md') %> |
| `context.primaryUser` | The unique user id of the primary account for the user. Used to [link user accounts](/link-accounts#automatic-account-linking) from various identity providers. |