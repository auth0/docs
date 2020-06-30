---
title: "Migration Guide: Extensibility and Node 12"
description: Learn about the Auth0 features affected by the Node.js v8 to Node.js v12 migration and review our recommendations for ensuring a smooth migration process.
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
# Migration Guide: Extensibility and Node 12

On December 31, 2019, [Node.js v8 went out of long-term support (LTS)](https://github.com/nodejs/Release#release-schedule), which means that the Node.js development team no longer back-ports critical security fixes to this version. This _could_ expose your extensibility code to security vulnerabilities.

As such, Auth0 is migrating from Node 8 to Node 12.

In this document, we:

* Provide recommendations on how you can ensure a smooth migration for your environment
* Detail the specific modules affected

## Summary of the migration

The Webtask runtime powering the following Auth0 features use Node 8:

* Rules
* Hooks
* Custom database connections
* Custom social connections
* Extensions

If you do not use any of the extensibility features mentioned above, you are not affected by this migration.

## Verified extensions

As part of this migration, the Auth0 development team has performed extensive testing to proactively detect any breaking changes.

Verified extensions for Node 12 include:

* Realtime Webtask Logs
* Deploy extensions (Github, Gitlab, etc.)
* Deploy CLI

Still, there may be behavioral changes as a result of this migration, so we have provided a migration switch that allows you to control the migration of your environment to the new Webtask runtime using Node 12.

## Enable the Node 12 runtime

Node 12 can be enabled through the new Extensibility panel on the [Advanced Tenant Settings](${manage_url}/#/tenant/advanced) page of the Dashboard.

![Runtime toggle](/media/articles/migrations/node-runtime1.png)

![Runtime toggle options](/media/articles/migrations/node-runtime2.png)

::: warning
Changing the runtime may break your existing Rules, Hooks, and Custom Database/Social Connections. We recommend that you first switch your development tenant to the Node 12 runtime, test your setup, and switch your production tenant only when you have identified there are no breaking changes.
:::

## Whitelist the new URLs

The [Delegated Administration Extension](/extensions/delegated-admin) and the [Single Sign-on (SSO) Dashboard Extension](/extensions/sso-dashboard) require whitelisting the URLs used to access extensions and custom webtasks. When you upgrade to Node 12, the URLs you use to access extensions and custom webtasks will change. This is a breaking change for these extensions.

If you use any of these extensions, **you must whitelist the new URLs** both as Allowed <dfn data-key="callback">Callback</dfn> and as Allowed Logout URLs.

The region portion of the URL will change from 8 to 12. If you access an extension using the URL `https://${account.tenant}.us8.webtask.io/dummy-extension-url`, when you upgrade to Node 12 the URL will be `https://${account.tenant}.us12.webtask.io/dummy-extension-url`.

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

If you use the Delegated Administration Extension, the matrix that follows contains the updated URLs you must configure after you migrate to Node 12. The URL varies based on your location.

| Location | Allowed Callback URL for Node 12 | Allowed Logout URL for Node 12 |
| --- | --- | --- |
| USA | `https://${account.tenant}.us12.webtask.io/auth0-delegated-admin/login` | `https://${account.tenant}.us12.webtask.io/auth0-delegated-admin` |
| Europe | `https://${account.tenant}.eu12.webtask.io/auth0-delegated-admin/login` | `https://${account.tenant}.eu12.webtask.io/auth0-delegated-admin` |
| Australia | `https://${account.tenant}.au12.webtask.io/auth0-delegated-admin/login` | `https://${account.tenant}.au12.webtask.io/auth0-delegated-admin` |

For example, if you are located in the USA and you use the Delegated Administration, you should update the following fields in your application's settings:
- **Allowed Callback URLs**: `https://${account.tenant}.us12.webtask.io/auth0-delegated-admin/login`
- **Allowed Logout URLs**: `https://${account.tenant}.us12.webtask.io/auth0-delegated-admin`

### SSO Dashboard URLs

The matrix that follows contains the updated URLs you must configure after you migrate to Node 12. The URL varies based on your location.

The login URL for **Admins**:

| Location | Allowed Callback URL |
| --- | --- |
| USA | `https://${account.tenant}.us12.webtask.io/auth0-sso-dashboard/admins/login` |
| Europe | `https://${account.tenant}.eu12.webtask.io/auth0-sso-dashboard/admins/login` |
| Australia | `https://${account.tenant}.au12.webtask.io/auth0-sso-dashboard/admins/login` |

The login URL for **Users**:

| Location | Allowed Callback URL |
| --- | --- |
| USA | `https://${account.tenant}.us12.webtask.io/auth0-sso-dashboard/login` |
| Europe | `https://${account.tenant}.eu12.webtask.io/auth0-sso-dashboard/login` |
| Australia | `https://${account.tenant}.au12.webtask.io/auth0-sso-dashboard/login` |

### All Extensions

Most extensions use the `PUBLIC_WT_URL` hidden secret for authorization. This secret depends on the runtime version and does not update automatically.

To update it, you need to save the extension's settings (no changes are necessary). To do so, after switching the runtime to `Node 12`, you need to open the extension's settings in the extensions dashboard (gear icon) and hit `Save`. After that, the extensions gallery will update the `PUBLIC_WT_URL` secret accordingly based on the selected runtime.

If you do not update the `PUBLIC_WT_URL` hidden secret, you will receive the following error:

![Misconfiguration or Service Outage Error](/media/articles/migrations/node-hidden-secret-error.png)

## How to ensure a stable migration

As part of the process of introducing Node 12 in our Webtask runtime, we ran a number of tests to determine which modules are not forward-compatible from Node 8 to 12. Most customers _should_ be able to upgrade to Node 12 without any issues.

With that said, before you migrate, we highly recommend testing all of your:

* Rules
* Hooks
* Custom Database Connections/Scripts
* Custom Social Connections
* Extensions

Furthermore, we recommend that the testing be done in your development tenant and migrating your production tenant only if you see no issues in development.

You can query the Management API for your Rules, Hooks, Custom Database scripts, and Custom Social Connections. This will make it easier for you to move items from your production tenant to development tenant for testing purposes.

Please see our documentation on the [Connections](/api/management/v2#!/Connections), [Rules](/api/management/v2#!/Rules/get_rules), and [Hooks](/api/management/v2/#!/Hooks/get_hooks) endpoints for additional information on this process.

When using the [Connections](/api/management/v2#!/Connections) endpoints in the Management API, Custom Database Scripts can be retrieved or updated using `options.customScripts`.

Similarly, you can find Custom Social Connections in `options.scripts.fetchUserProfile`.

## Affected modules

If you are using the following built-in modules (that is, modules that you did not explicitly require), please be aware that some versions were updated to work with Node 12. The following table summarizes the changes.

| Module name | Old version | New version |
| - | - | - |
| couchbase | ~2.5.1 | 2.6.10 |
| bcrypt | 1.0.3 | 3.0.8 |

These new versions should remain backwards compatible with their previous versions.

### Pinned modules

If you have manually pinned modules, you may need to manually update them so that your code runs with Node 12.

For example, you must change

`var bcrypt = require(‘bcrypt@1.0.3’);`

to

`var bcrypt = require(‘bcrypt’);`

or, if the module must be pinned to a specific version:

`var bcrypt = require(‘bcrypt@3.0.8’);`

### Notes for Node 10 and Node 12 changes

For additional information, please consult Node.js's [Node 10 release notes](https://nodejs.org/fr/blog/release/v10.0.0/) and [Introducing Node.js 12](https://medium.com/@nodejs/introducing-node-js-12-76c41a1b3f3f).
