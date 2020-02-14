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

On April 30, 2018, [Node.js v4 went out of long-term support (LTS)](https://github.com/nodejs/Release#release-schedule), which means that the Node.js development team no longer back-ports critical security fixes to this version. This _could_ expose your extensibility code to security vulnerabilities.

As such, Auth0 is migrating from Node 4 to Node 8.

**We will be ending support for the Node 4 runtime on June 30, 2019**. Tenants which have not already migrated to Node 8 will be migrated automatically. Automatic migrations will begin on April 29, 2019, and continue through June 30, 2019. Automatic migrations are happening in cohorts: 

* Free tier tenants will be migrated beginning on April 29, 2019
* Self-serve tenants will follow through early May 2019
* Enterprise tenants will be migrated in late May and June 2019

Customers will be notified two weeks in advance of their automatic migration date, with additional periodic reminders leading up to their automatic migration date.

::: warning
All tenant automatic upgrades to Node 8 will be completed no later than June 30, 2019. Most tenant upgrades will be completed before this date. Admins for affected tenants will be notified of their exact migration date.
:::

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

If you do not use any of the extensibility features mentioned above, you are not affected by this migration. **Additionally, your tenant will automatically be upgraded to use the Node 8 runtime by June 30, 2019.** This will ensure that any future extensibility code you author will be running on a secure runtime.

As part of this migration, the Auth0 development team has performed extensive testing to detect any breaking changes proactively. However, there may be behavioral changes as a result of this migration. As such, we have provided a migration switch that allows you to control the migration of your environment to the new Webtask runtime using Node 8.

::: note
Private Cloud and Managed Private Cloud (PSaaS) customers have had their tenants migrated already. No further action is necessary.
:::

### Important Dates

* **2018 April 17**: The Webtask runtime using Node 8 becomes available to Auth0 customers
* **2018 April 23**: All official Auth0 Extensions will be updated to run on Node 8 and available for you to upgrade in the **Installed Extensions** tab of the [Extensions page](${manage_url}/#/extensions)
* **2018 April 30**: [Node 4 is no longer under long-term support (LTS)](https://github.com/nodejs/Release#release-schedule)
* **2018 April 30**: Tenants with NO Extensibility code will be automatically be upgraded to use Node 8
* **2018 July 26**: Any tenants created after this date are already using the Node.js 8 runtime, and no action is required.
* **2019 April 29**: All Auth0 tenants on the Auth0 public cloud which have not already migrated to the Node.js 8 runtime, will be automatically migrated between April 29, 2019 and June 30, 2019
* **2019 June 30**: Node 4 support in Auth0 is permanently removed

### Migration Assistant

We have created a [migration assistant](https://github.com/auth0/webtask-migration-assistant) to help ease the copying of code between production and development tenants.

Please be sure to test each script *individually* with its associated **Try** button. You may, however, test all rules simultaneously with the **Try All Rules With** button.

In addition, test _logging in_ using the development tenant to ensure that all of the items that you have set up work as expected.

## How to enable the Node 8 runtime

Node 8 can be enabled through the new Extensibility panel on the [Advanced Tenant Settings](${manage_url}/#/tenant/advanced) page of the Dashboard.

![Runtime toggle](/media/articles/migrations/node-runtime1.png)

![Runtime toggle options](/media/articles/migrations/node-runtime2.png)

::: warning
Changing the runtime may break your existing Rules, Hooks, and Custom Database/Social Connections. We recommend that you first switch your development tenant to the Node 8 runtime, test your setup, and switch your production tenant only when you have identified there are no breaking changes.
:::

## Whitelist the new URLs

The [Authorization Extension](/extensions/authorization), the [Delegated Administration Extension](/extensions/delegated-admin) and the [Single Sign-on (SSO) Dashboard Extension](/extensions/sso-dashboard) require whitelisting the URLs used to access extensions and custom webtasks. When you upgrade to Node 8, the URLs you use to access extensions and custom webtasks will change. This is a breaking change for these extensions.

If you use any of these extensions, **you must whitelist the new URLs** both as Allowed <dfn data-key="callback">Callback</dfn> and as Allowed Logout URLs.

The change is an `8` that is appended before the `webtask.io` part. So if you accessed an extension using the URL `https://${account.tenant}.us.webtask.io/dummy-extension-url`, when you upgrade to Node 8 the URL will be `https://${account.tenant}.us8.webtask.io/dummy-extension-url`.

To do so, go to [Dashboard > Applications > Settings](${manage_url}/#/applications/${account.clientId}/settings), and add the URL to the fields **Allowed Callback URLs** and **Allowed Logout URLs**.

The execution URLs will also change for custom webtasks in your Auth0 container. You must update any external applications that call those webtasks.

### Authorization Extension Changes

If you use the Authorization Extension, it generates an `auth0-authorization-extension` rule. Republishing this rule from within the Authorization Extension will update the URLs automatically.

To ensure a clean upgrade:

1. Ensure you have upgraded to the latest version of the Authorization Extension from the "Installed Extensions" tab. If the upgrade button is present, click to upgrade. If the button is not present, you are already on the latest version of the extension.
2. Open the Authorization Extension configuration page.
3. To update the URL in the rule, publish the rule again by clicking the "Publish Rule" button. 
4. Test to make sure everything is still working.
5. If you see an "Invalid API Key" error after updating, use the "Rotate" button to generate a new API key.

![Authorization Extension Configuration](/media/articles/migrations/node-auth-ext-config.png)

![Authorization Extension Buttons](/media/articles/migrations/node-auth-ext-buttons.png)

### Delegated Administration URLs

If you use the Delegated Administration Extension, the matrix that follows contains the updated URLs you must configure after you migrate to Node 8. The URL varies based on your location.

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

### All Extensions

Most extensions use the `PUBLIC_WT_URL` hidden secret for authorization. This secret depends on the runtime version and does not update automatically.

To update it, you need to save the extension's settings (no changes are necessary). To do so, after switching the runtime to `Node 8`, you need to open the extension's settings in the extensions dashboard (gear icon) and hit `Save`. After that, the extensions gallery will update the `PUBLIC_WT_URL` secret accordingly based on the selected runtime.

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
| bcrypt | ~0.8.5^* | 1.0.3 |
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

Please consult Node.js' migration guide for [v4 to v6](https://github.com/nodejs/wiki-archive/blob/master/Breaking-changes-between-v4-LTS-and-v6-LTS.md) and [v6 to v8](https://github.com/nodejs/wiki-archive/blob/master/Breaking-changes-between-v6-LTS-and-v8-LTS.md) for additional information.

**To ensure that your Auth0 implementation functions as intended, please be sure to migrate to the Node 8 runtime before June 30, 2019.**