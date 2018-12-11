---
title: "Migration Guide: Extensibility and Node 8"
description: This article covers the Auth0 features/modules affected, as well as our recommendations to ensure a smooth migration process.
toc: true
topics:
  - migrations
  - extensibility
  - nodejs
  - rules
  - hooks
  - custom-db
  - custom-social-connections
  - extensions
contentType:
  - concept
  - how-to
useCase:
  - manage-accounts
  - migrate
---
# Migration Guide: Extensibility and Node 8

Beginning April 30, 2018, [Node.js v4 will be going out of long-term support (LTS)](https://github.com/nodejs/Release#release-schedule), which means that the Node.js development team will no longer be back-porting critical security fixes to this version and this _could_ expose your extensibility code to security vulnerabilities.

As such, Auth0 will be migrating from Node 4 to Node 8.

We will **NOT** be shutting down the Node 4 runtime after the April 30 LTS deadline. Your extensibility code will continue to run on Node 4, if you choose not to upgrade to Node 8 at this time. After April 30, you will assume the risk of potential security issues if you choose to continue with Node 4.

In this document, we:

* Provide recommendations on how you can ensure a smooth migration for your environment
* Detail the specific modules affected

## Summary of the migration

The Webtask runtime powering the following Auth0 features utilize Node 4:

* Rules
* Hooks
* Custom database connections
* Custom social connections
* Extensions

If you do not use any of the extensibility features mentioned above, you are not affected by this migration. **Additionally, your tenant will automatically be upgraded to use the Node 8 runtime on April 30, 2018.** This will ensure that any future extensibility code you author will be running on a secure runtime.

Due to the end of long-term support (LTS) for Node 4, we will be migrating the Webtask runtime to use Node 8. As part of this migration, the Auth0 development team has performed extensive testing to detect any breaking changes proactively.

However, there may be behavioral changes as a result of this migration. As such, we have provided a migration switch that allows you to control the migration of your environment to the new Webtask runtime using Node 8.

### Important Dates

* **2018 April 17**: The Webtask runtime using Node 8 becomes available to Auth0 customers
* **2018 April 23**: All official Auth0 Extensions will be updated to run on Node 8 and available for you to upgrade in the **Installed Extensions** tab of the [Extensions page](${manage_url}/#/extensions)
* **2018 April 30**: [Node 4 is no longer under long-term support (LTS)](https://github.com/nodejs/Release#release-schedule)
* **2018 April 30**: Tenants with NO Extensibility code will be automatically be upgraded to use Node 8

## How to enable the Node 8 runtime

Node 8 can be enabled through the new Extensibility panel on the [Advanced Tenant Settings](${manage_url}/#/tenant/advanced) page of the Dashboard.

![Runtime toggle](/media/articles/migrations/node-runtime1.png)

![Runtime toggle options](/media/articles/migrations/node-runtime2.png)

::: warning
Changing the runtime may break your existing Rules, Hooks, and Custom Database/Social Connections. We recommend that you first switch your development tenant to the Node 8 runtime, test your setup, and switch your production tenant only when you have identified there are no breaking changes.
:::

## Whitelist the new URLs

When you upgrade to Node 8, the URLs you use to access extensions and custom webtasks will change. The change is an `8` that is appended before the `webtask.io` part. So if you accessed an extension using the URL `https://${account.tenant}.us.webtask.io/dummy-extension-url`, when you upgrade to Node 8 the URL will be `https://${account.tenant}.us8.webtask.io/dummy-extension-url`.

The execution URLs will also change for custom webtasks in your Auth0 container. You must update any external applications that call those webtasks.

This is a breaking change for some extensions, that require whitelisting the URLs in order to properly work.

The affected extensions are the [Delegated Administration Extension](/extensions/delegated-admin) and the [Single Sign-On (SSO) Dashboard](/extensions/sso-dashboard). If you use either, **you must whitelist the new URLs** both as Allowed Callback and as Allowed Logout URLs.

To do so, go to [Dashboard > Applications > Settings](${manage_url}/#/applications/${account.clientId}/settings), and add the URL to the fields **Allowed Callback URLs** and **Allowed Logout URLs**.

### Delegated Administration URLs

The matrix that follows contains the updated URLs you must configure after you migrate to Node 8. The URL varies based on your location.

| Location | Allowed Callback URL for Node 8 | Allowed Logout URL for Node 8 |
| --- | --- | --- |
| USA | `https://${account.tenant}.us8.webtask.io/auth0-delegated-admin/login` | `https://${account.tenant}.us8.webtask.io/auth0-delegated-admin` |
| Europe | `https://${account.tenant}.eu8.webtask.io/auth0-delegated-admin/login` | `https://${account.tenant}.eu8.webtask.io/auth0-delegated-admin` |
| Australia | `https://${account.tenant}.au8.webtask.io/auth0-delegated-admin/login` | `https://${account.tenant}.au8.webtask.io/auth0-delegated-admin` |

For example, if you are located in the USA and you use the Delegated Administration, you should update the following fields in your application's settings: 
- **Allowed Callback URLs**: `https://${account.tenant}.us8.webtask.io/auth0-delegated-admin/login`
- **Allowed Logout URLs**: `https://${account.tenant}.us8.webtask.io/auth0-delegated-admin`

### SSO Dashboard URLs

The matrix that follows contains the updated URLs you must configure after you migrate to Node 8. The URL varies based on your location.

The login URL for **Admins**:

| Location | Allowed Callback URL |
| --- | --- |
| USA | `https://${account.tenant}.us8.webtask.io/auth0-sso-dashboard/admins/login` |
| Europe | `https://${account.tenant}.eu8.webtask.io/auth0-sso-dashboard/admins/login` |
| Australia | `https://${account.tenant}.au8.webtask.io/auth0-sso-dashboard/admins/login` |

The login URL for **Users**:

| Location | Allowed Callback URL |
| --- | --- |
| USA | `https://${account.tenant}.us8.webtask.io/auth0-sso-dashboard/login` |
| Europe | `https://${account.tenant}.eu8.webtask.io/auth0-sso-dashboard/login` |
| Australia | `https://${account.tenant}.au8.webtask.io/auth0-sso-dashboard/login` |

## How to ensure a stable migration

As part of the process of introducing Node 8 in our Webtask runtime, we ran a number of tests to determine which modules are not forward-compatible from Node 4 to 8. Most customers _should_ be able to upgrade to Node 8 without any issues.

With that said, before you migrate, we highly recommend testing all of your:

* Rules
* Hooks
* Custom Database Connections/Scripts
* Custom Social Connections
* Extensions

Furthermore, we recommend that the testing be done in your development tenant and migrating your production tenant only if you see no issues in development. 

You can query the Management API for your Rules, Custom Database scripts, and Custom Social Connections. This will make it easier for you to move items from your production tenant to development tenant for testing purposes.

Please see our documentation on the [Connections](/api/management/v2#!/Connections) and [Rules](/api/management/v2#!/Rules/get_rules) endpoints for additional information on this process.

When using the [Connections](/api/management/v2#!/Connections) endpoints in the Management API, Custom Database Scripts can be retrieved or updated using `options.customScripts`.

Similarly, you can find Custom Social Connections in `options.scripts.fetchUserProfile`.

You will need to manually copy over any Hooks-related code that you use since they cannot be accessed via the Management API.

### Migration assistance

We have created a [migration assistant](https://github.com/auth0/webtask-migration-assistant) to help ease the copying of code between production and development tenants.

Please be sure to test each script *individually* with its associated **Try** button. You may, however, test all rules simultaneously with the **Try All Rules With** button.

In addition, test _logging in_ using the development tenant to ensure that all of the following items that you have set up work as expected:

* Rules
* Hooks
* Database Connections
* Custom Social Connections
* Extensions

## Affected modules

If you are using the following built-in modules (that is, modules that you did not explicitly require), please be aware that some versions were updated to work with Node 8. The following table summarizes the changes.

| Module name | Old version | New version |
| - | - | - |
| azure-storage | ~0.4.1 | ~2.2.1 |
| couchbase | ~1.2.1 | ~2.3.5 |
| jsonwebtoken | ~0.4.1^* | ~7.4.1 (w/ compatibility shim) |
| knex | ~0.6.3 | ~0.13.0 |
| mongo-getdb | ~1.2.0^* | ^2.2.0 |
| mongodb | ~1.3.15^* | ^2.2.0 |
| mysql | 2.0.0-alpha8^* | ^2.0.0 |
| node-cassandra-cql | ^0.4.4 | ^0.5.0 |
| request | ~2.27.0 | ~2.81.0 |
| pg | ^4.3.0^* | ^4.5.7 |
| bcrypt | ~0.8.5^* | ~0.8.7 |
| xml2json | ~0.10.0^* | ~0.11.2 |

^* These versions are no longer supported due to incompatibility with Node 8.

### Pinned modules

If you have manually pinned modules, you may need to manually update them so that your code runs with Node 8.

For example, you must change

`var mysql = require(‘mysql@2.0.0-alpha8’);`

to

`var mysql = require(‘mysql’);`

or, if the module must be pinned to a specific version:

`var mysql = require(‘mysql@2.0.0’);`

### Behavioral and syntactic changes

Some of the behavioral and syntactic changes in modules were not forward-compatible with Node 8.

For example, the default encoding of the `crypto` module was changed from `binary` to `utf8`, and the use of `new Buffer()` has been deprecated in favor of `Buffer.from()`.

Please consult Node.js' migration nodes for [v4 to v6](https://github.com/nodejs/wiki-archive/blob/master/Breaking-changes-between-v4-LTS-and-v6-LTS.md) and [v6 to v8](https://github.com/nodejs/wiki-archive/blob/master/Breaking-changes-between-v6-LTS-and-v8-LTS.md) for additional information.

**To ensure that your Auth0 implementation functions as intended, please be sure to migrate to the Node 8 runtime before April 30 2018.**
