---
section: libraries
title: Migrating to Lock v11
description: How to migrate to Lock v11
---
# Migrating to Lock v11

[Lock v11](/libraries/lock) is designed for [embedded login scenarios](/guides/login/centralized-vs-embedded). It operates with enhanced security and removes dependencies that have been deprecated as per Auth0's roadmap. In some cases, these security enhancements may impact application behavior when upgrading from an earlier version of Lock. 

::: warning
If you are using Lock to implement login embedded in your applications, we recommend [moving to a centralized login approach](/guides/login/migration-embedded-centralized), as it is the [most secure, powerful and flexible approach for authentication](/guides/login/centralized-vs-embedded).
:::

## Should I migrate to v11?

Lock can be used to implement authentication in two ways:

- In your application, to implement embedded login.
- In the [Hosted Login Page](/hosted-pages/login), where you can use the configure Lock to behave in the way you need. 

Migration to v11 will depend on how you are using Lock:

| **Scenario** | **Migration to v11** | 
| --- | --- | 
| In your application, to implement embedded login | Required |
| In a customized Hosted Login Page | Not Supported, keep using Lock 10 and/or Auth0.js |

## Migration instructions

If you decide to keep using embedded Lock you will need to migrate to [Lock v11](/libraries/lock).

The documents below describe all the changes that you should be aware of when migrating from different versions of Lock. Make sure you go through them before upgrading.

[Migrating from the lock-passwordless widget](/libraries/lock/v11/migration-lock-passwordless)

[Migrating from Lock v10](/libraries/lock/v11/migration-v10-v11)

[Migrating from Lock v10 in Angular 1.x Applications](/libraries/lock/v11/migration-angularjs-v10)

[Migrating from Lock v10 in Angular 2+ Applications](/libraries/lock/v11/migration-angular)

[Migrating from Lock v10 in React Applications](/libraries/lock/v11/migration-react)

[Migrating from Lock v9](/libraries/lock/v11/migration-v9-v11)

[Migrating from Lock v9 in Angular 1.x Applications](/libraries/lock/v11/migration-angularjs-v9)

[Migrating from Lock v8](/libraries/lock/v11/migration-v8-v11)

[Migrating from Lock v8 in Angular 1.x Applications](/libraries/lock/v11/migration-angularjs-v8)

:::note
If you have any questions or concerns, you can discuss them in the [Auth0 Community](https://community.auth0.com/), submit them using the [Support Center](${env.DOMAIN_URL_SUPPORT}), or directly through your account representative, if applicable. 
:::

## Disabling legacy Lock API

After you update to Lock v11 and/or Auth0.js v9, it is advised that you turn off the **Legacy Lock API** toggle in the Dashboard. This will make your Auth0 tenant behave as if the legacy API is no longer available. Starting on April 1, 2018, this option will be forcibly disabled, so it is recommended you opt-in before that time to verify that your configuration will work correctly. 

You can find the setting in the [Advanced section](${manage_url}/#/tenant/advanced) of Tenant Settings.

![Allowed Web Origins](/media/articles/libraries/lock/legacy-lock-api-off.png)

## Troubleshooting

If Lock takes a lot of time to display the login options, it could be because the [Allowed Web Origins](/libraries/lock/v11/migration-v10-v11#configure-auth0-for-embedded-login) property is not correctly set. Please set it and try again.
