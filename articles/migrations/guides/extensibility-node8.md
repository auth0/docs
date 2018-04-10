---
title: Migration Guide - Extensibility and Node.js v8
description: This article covers the Auth0 features/modules affected, as well as our recommendations to ensure a smooth migration process.
toc: true
---
# Migration Guide: Extensibility and Node.js v8

Beginning 2018 April 30, [Node.js v4 will be going out of long-term support (LTS)](https://github.com/nodejs/Release#release-schedule), which means that the Node.js development team will no longer be back-porting critical security fixes to this version.

As such, Auth0 will be migrating from Node.js v4 to Node.js v8.

In this document, we:

* Provide recommendations on how you can ensure a smooth migration for your environment
* Detail the specific modules effected

## Summary of the migration

The Webtask runtime powering the following Auth0 features utilize Node.js v4:

* Rules
* Hooks
* Custom database connections
* Custom social connections

Due to the end of long-term support (LTS) for Node.jsv.4, we will be migrating the Webtask runtime to use Node.js v8.

As part of this migration, the Auth0 development team has performed extensive testing to detect any breaking changes proactively.

However, there may be behavioral changes as a result of this migration. As such, we have provided a migration switch that allows you to control the migration of your environment to the new Webtask runtime using Node.js v8.

## How to enable the Node.js v8 runtime

Node 8 can be enabled through the new Extensibility panel on the [Advanced Tenant Settings](${manage_url}/#/tenant/advanced) page of the Dashboard.

![Runtime toggle](/media/articles/migrations/node-runtime1.png)

![Runtime toggle options](/media/articles/migrations/node-runtime1.png)

::: warning
Changing the runtime may break your existing Rules, Hooks, and Custom Database/Social Connections. We recommend that you first switch your development tenant, test your setup, and switch your production tenant only if there are no breaking changes.
:::

## How to ensure a stable migration

Before migrating, we highly recommend testing all of your:

* Rules
* Hooks
* Custom Database Connections/Scripts
* Custom Social Connections

Furthermore, we recommend that the testing be done in your development tenant and migrating your production tenant only if you see no issues in development. 

You can query the Management API for your rules, custom database scripts, and custom social connections. This will make it easier for you to move items from your production tenant to development tenant for testing purposes.

Please see our documentation on the [Connections](/api/management/v2#!/Connections) and [Rules](/api/management/v2#!/Rules/get_rules) endpoints for additional information on this process.

When using the **/connections** endpoints, Custom Database Scripts can be retrieved or updated using **options.customScripts**

Similarly, you can find Custom Social Connections in **options.scripts.fetchUserProfile**.

You will need to manually copy over any Hooks-related code that you use.

### Migration assistance

We have created a migration assistant to help ease the copying of code between production and development tenants.

Please be sure to test each script *individually* with its associated **Try** button. You may, however, test all rules simultaneously with the **Try All Rules With** button.

## Affected modules

If you are using the following built-in modules (that is, modules that you did not explicitly require), please be aware that some versions were updated to work with Node.js v8. The following table summarizes the changes.

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

^* These versions are no longer supported due to incompatibility with Node.js v8.

### Pinned modules

If you have manually pinned modules, you may need to manually update them so that you code runs with Node.js v8.

For example, you must change

`var mysql = require(‘mysql@2.0.0-alpha8’);`

to

`var mysql = require(‘mysql@2.0.0’);`

### Behavioral and syntactic changes

Some of the behavioral and syntactic changes in modules were not forward-compatible with Node.js v8.

For example, the default encoding of the **crypto** module was changed from **binary** to **utf8**, and the used of **new Buffer()** has been deprecated in favor of **Buffer.from()**.

Please consult Node.js' migration nodes for [v4 to v6](https://github.com/nodejs/node/wiki/Breaking-changes-between-v4-LTS-and-v6-LTS) and [v6 to v8](https://github.com/nodejs/node/wiki/Breaking-changes-between-v6-LTS-and-v8-LTS) for additional information.

## Important Dates

* **2018 April 16**: The Webtask runtime using Node.js v8 becomes available to Auth0 customers
* **2018 April 30**: [Node.js v4 is no longer under long-term support (LTS)](https://github.com/nodejs/Release#release-schedule)

**To ensure that your Auth0 implementation functions as intended, please be sure to migrate to the Node.js v8 runtime before 30 April 2018.**
