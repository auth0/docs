---
title: Context Object in Rules
description: Describes the properties of the context object in Rules that stores information about users' IP addresses, applications, and location. 
topics:
  - rules
  - extensibility
contentType: reference
useCase: extensibility-rules
---

# Context Object in Rules

The `context` object stores contextual information about the current authentication transaction, such as the user's IP address, application, or location.

## Properties

The following properties are available for the `context` object.

| Property | Description |
|-|-|
| `context.tenant` | A string containing the name of the tenant |
| `context.clientID` | The client id of the application the user is logging in to. |
| `context.clientName` | The name of the application (as defined on the dashboard). |
| `context.clientMetadata` | An object for holding other application properties. Its keys and values are strings. |
| `context.connectionID` | A string containing the connection's unique identifier |
| `context.connection` | The name of the connection used to authenticate the user (such as: `twitter` or `some-g-suite-domain`) |
| `context.connectionStrategy` | The type of connection. For social connection `connectionStrategy` === `connection`. For enterprise connections, the strategy will be `waad` (Windows Azure AD), `ad` (Active Directory/LDAP), `auth0` (database connections), and so on. |
| `context.connectionOptions` | An object representing the options defined on the connection. `connectionOptions.tenant_domain` is a string containing the domain being used for authentication when using an Enterprise connection. `connectionOptions.domain_aliases` is an array containing the optional domains registered as aliases in addition to the primary domain (specified in the `connectionOptions.tenant_domain` property). |
| `context.connectionMetadata` | An object representing metadata defined on the connection. Its keys and values are strings. |
| `context.samlConfiguration` | An object that controls the behavior of the <dfn data-key="security-assertion-markup-language">SAML</dfn> and WS-Fed endpoints. Useful for advanced claims mapping and token enrichment (only available for `samlp` and `wsfed` protocol). |
| `context.protocol` | <%= include('../_includes/_context-prop-protocol.md') %> |
| `context.stats` | An object containing specific user stats, like `stats.loginsCount`. Note that any of the counter variables returned as part of the `stats` object do not increase during [silent authentication](/api-auth/tutorials/silent-authentication) (as when `prompt=none`). There are also scenarios where the counter variables might increase yet a rule or set of rules do not execute, as in the case of a successful cross-origin authentication followed by a failed token request. |
| `context.sso` | <%= include('../_includes/_context-prop-sso.md') %> |
| `context.accessToken` | An object representing the options defined on the <dfn data-key="access-token">Access Token</dfn>. You can use this object to [add custom namespaced claims](/scopes/current/sample-use-cases#add-custom-claims-to-a-token) to the Access Token. `context.accessToken.scope` can be used to [change the Access Token's returned scopes](/rules/references/samples#modify-scope-of-access-token).  When provided, it is an array containing permissions in string format. |
| `context.idToken` | An object representing the options defined on the [ID Token](/tokens/concepts/id-tokens). Used to add custom [namespaced](/tokens/guides/create-namespaced-custom-claims) claims to the ID Token. |
| `context.original_protocol` | After a [redirect rule](/rules/current/redirect) has executed and the authentication transaction is resumed, this property will be populated with the original protocol used to initiate the transaction. |
| `context.multifactor` | An object representing the multifactor settings used in [implementing contextual MFA](/multifactor-authentication/custom). |
| `context.redirect` | The object used to [implement the redirection of a user from a rule](/rules/current/redirect#how-to-implement-a-redirect). |
| `context.sessionID` | An internal identification for the authentication session. Value is kept only if `prompt=none` is used in the authorization request. Note that the session ID can change **after** rule execution on other flows, so the value available in `context.sessionID` might not match the new session ID that the user will receive. This makes this value only meaningful when `prompt=none` is used. |
| `context.request` | <%= include('../_includes/_context-prop-request.md') %> |
| `context.primaryUser` | The unique user id of the primary account for the user. Used to [link user accounts](/users/concepts/overview-user-account-linking#automatic-account-linking) from various identity providers. |
| `context.authentication` | <%= include('../_includes/_context-prop-authentication.md') %> |
| `context.authorization` | <%= include('../_includes/_context-prop-authorization.md') %> |
