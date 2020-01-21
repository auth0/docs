---
title: Custom Database Connection Security Best Practices
description: Learn about best practices for custom database connection security.
classes: topic-page
topics:
  - best-practices
  - custom-database
  - extensibility
  - database-action-scripts
  - custom-database-connections
  - scripts
contentType: reference
useCase:
  - best-practices
  - custom-database
  - database-action-scripts
---
# Custom Database Connection Security Best Practices

## Access legacy identity storage via custom API

We recommend that you implement an API to provide least privilege to your legacy identity storage rather than simply opening up general access via the internet. 

Protecting legacy identity storage from general access is a recommended best practice. Exposing a (legacy identity) database directly to the internet, for example, can be extremely problematic: database interfaces for SQL and the like are extremely open in terms of functionality, which violates the principle of least privilege when it comes to security.

The alternative is to create a simple (custom) API&mdash;protected via use of an Access Token&mdash;that each action script can call. This would act as the interface to the legacy identity store. Client credentials grant flow can then be used to obtain an Access Token from within a script, and this can be subsequently cached for re-use within the `global` object to improve performance. The API can then provide a discrete number of protected endpoints that perform only the legacy (identity) management functionality required (e.g., read user, change password). 

By default, Auth0 will give you a token for any API if you authenticate successfully and include the appropriate audience. Restricting access to the legacy identity store API by restricting access token allocation via use of a Rule will prevent unauthorized usage and will mitigate a number of attack vector scenarios, such as where redirect to `/authorize` is intercepted and the audience to the API is added.

::: warning
Restricting access to the API via Rule will mitigate attack vector scenarios, such as where redirect to `/authorize` is intercepted and the audience to the API is added, and will ensure that only access using specific client credentials is granted.
:::

## Whitelist access to legacy identity storage

Whether managing access to legacy identity storage via custom API or using the native interface provided, you should restrict access to the list of [IP addresses associated with your Auth0 tenant](/guides/ip-whitelist). Whitelisting in this manner constrains access to the legacy identity store and ensures that only custom database actions scripts defined in Auth0 are permitted. 

::: warning
The Auth0 IP address whitelist is shared between all Auth0 tenants defined to a region. Never use the whitelist as the sole method of securing access to your legacy identity store; doing so could open up potential security vulnerabilities allowing unauthorized access to your users.
:::

## Keep reading

* [Security Bulletins](/security/bulletins)
* [Auth0 Security](/security)
* [Store Tokens](/tokens/guides/store-tokens)
