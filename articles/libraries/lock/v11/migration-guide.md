---
section: libraries
title: Migrating to Lock v11
description: How to migrate to Lock v11
---
# Migrating to Lock v11

Lock 11 is designed for **embedded login** scenarios. It operates with enhanced security and removes dependencies that have been deprecated as per Auth0's roadmap. In some cases, these security enhancements may impact application behavior when upgrading from an earlier version of Lock. 

## Should I migrate to v11?

Lock can be used to implement authentication in different ways:

- In your application, to implement embedded login

- In the [Hosted Login Page](/hosted-pages/login), where you can use the configure Lock to behave in the way you need. Most customers don't customize Auth0 Hosted Login Page with Auth0.js, so your probably don't need to worry about this scenario.

Depending on how you are using Lock, you have different options:

| **Scenario** | **Migration to v9** | 
| --- | --- | 
| In your app, to implement Embedded Login | Required |
| In a customized Hosted Login Page | Not Supported, keep using Auth0.js v8 and/or Lock v10 |

If you are not using centralized login in your applications, we recommend you to start using it, it as [most secure, powerful and flexible approach for authentication](/guides/login/centralized-vs-embedded). 

## Migration Instructions

If you decide to keep using Lock you will need to migrate to Lock 11.

The documents below describe all the changes that you should be aware of when migrating from different versions of Lock. Make sure you go through them before upgrading.

[Migrating from Lock v10](/libraries/lock/v11/migration-v10-v11)

[Migrating from Lock v9](/libraries/lock/v11/migration-v9-v11)

[Migrating from Lock v8](/libraries/lock/v11/migration-v8-v11)

[Migrating from Lock v10 in Angular 1.x Applications](/libraries/lock/v11/migration-angularjs-v10)

[Migrating from Lock v9 in Angular 1.x Applications](/libraries/lock/v11/migration-angularjs-v9)

[Migrating from Lock v10 in Angular 2+ Applications](/libraries/lock/v11/migration-angular)

[Migrating from Lock v10 in React Applications](/libraries/lock/v11/migration-react)

:::note
If you have any questions or concerns, you can submit them using the [Support Center](${env.DOMAIN_URL_SUPPORT}), or directly through your account representative, if applicable. 
:::
