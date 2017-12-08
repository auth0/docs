---
section: libraries
title: Auth0.js v8 to v9 Migration Guide
description: How to migrate from auth0.js v8 to auth0.js v9
toc: true
---
# Migration Guide: Auth0.js v8 to v9

This document lists all the changes that you should be aware of when migrating between versions 8 and 9 of Auth0.js. It includes information on what is changing and why, details on new or deprecated features, and instructions on how you can migrate your implementation.

If you are using Auth0.js with your custom login in embedded mode, you are encouraged to use the latest and more secure version of the library, but before you update your code, make sure that you have reviewed this document and made any necessary changes in your implementation. 

If you are using older versions of Auth0.js, you will also need to migrate to avoid using deprecated endpoints. You can read about it in our [previous Migration Guides](/libraries/auth0js/v8/migration-guide).

If you have any questions or concerns, you can submit them using the [Support Center](${env.DOMAIN_URL_SUPPORT}), or directly through your account representative, if applicable. 

## Migration Steps

### 1. Configure Auth0 for Embedded Login

In order to send the user credentials to Auth0 server, auth0.js needs to make requests from your website user's browser to the Auth0-server. 

If you enable [Custom Domain Names](/custom-domains) and the domain for your website is the same as the custom domain for the Auth0 tenant, auth0.js will work without any further configuration.

If you don’t enable Custom Domain Names, given that the requests from your application to Auth0 Server will be cross-domain, you will need to configure your Auth0 client to use [Cross Origin Authentication](/cross-origin-authentication). 

### 2. Change Calls to .getProfile()

Auth0.js v8 included a deprecated function called `getProfile()` that received an `id_token` as a parameter and returned the user profile. If you are still using it, you need to change the invocation to use an `access_token` instead.

### 3. Review Calls to .getSSOData()

Auth0.js 8 included a deprecated getSSOData() function, that was reimplemented in Auth0.js v9 to simplify the migration, but the behavior is not exactly the same. We recommend that you don’t use getSSOData() for new code and use checkSession() instead.

In order for the function to work properly, you need to ask for scope='openid profile email' when initializing auth0.js. 

Below is a description of the old values returned by getSSOData() and the new ones. In most use cases, the only value that was used was the ‘sso’ property, which still has the same semantics. 

| Property | Old Value | New Value |
| --- | --- | --- |
| sso | `true` if user has an existing session, `false` if not | The same |
| sessionClients | List of clients ids the user has active sessions with | An array with a single element with the client id configured in auth0.js |
| lastUsedClientId | The client id for the last active connection | The last client the user used when authenticating |
| lastUsedUsername | User’s email or name | The same (requires `scope=’openid profile email’)` |
| lastUsedClientId | Client Id of the active session  | The client id used the last time the user authenticated from the current browser |
| lastUsedConnection | Last used connection and strategy. | Last connection that the user authenticated with from the current browser. It will be `null` if the user authenticated with the Hosted Login Page. It will not return `strategy`, only `name` |

## Behavior Changes

### Hosted Login Pages

Auth0.js 9 is a new version, designed for embedded login scenarios (i.e. implementations where the login widget is embedded in your application), and is not supported in centralized login scenarios (i.e. Hosted Login Pages).

If you are using a [Hosted Login Page](/hosted-pages/login), keep using Auth0.js v8. If you have a login widget embedded in your application consider upgrading to the latest Auth0.js version. 

### Default Values

Auth0.js 9 will default the value of the `scope` parameter to `openid profile email`.
