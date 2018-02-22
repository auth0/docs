---
title: Migrating from Embedded to Universal Login
description: Learn how to migrate from Embedded Login using Lock to Universal Login
---

# Migrating to Universal Login

When you integrate Auth0 in our applications, you have to decide whether you will use embedded or universal login.

- With embedded login the login dialog is hosted in your application. You can use [Lock](/libraries/lock) or create your own UI and use [auth0.js](/libraries/auth0js).
- With universal login, you redirect to an Auth0-hosted [login page](/hosted-pages/login) where the authentication flow is performed.

Universal login has several advantages over embedded login. For a detailed analysis refer to [Centralized vs Embedded Login](/guides/login/centralized-vs-embedded).

We put together a set of articles to help you migrate to universal login in different scenarios. 

You can also find how to implement universal login in multiple technology stacks using [our Quickstarts](/quickstart).

## Migration Guides per Application Type

:::next-steps
- [Migrating SPA Applications using Lock 10+](/guides/login/migrating-lock-v10-spa)
- [Migrating Web Applications using Lock 10+](/guides/login/migrating-lock-v10-webapp)
- [Migrating Web Applications using Lock 9](/guides/login/migrating-lock-v9-webapp)
- [Migrating SPA using Lock 9 Redirect Mode](/guides/login/migrating-lock-v9-spa)
- [Migrating SPA using Lock 9 Popup Mode](/guides/login/migrating-lock-v9-spa-popup)
- [Migrating from Lock v8](/guides/login/migrating-lock-v8)
:::
