---
section: libraries
title: Migrating to Auth0.js v9
description: How to migrate to Auth0.js v9
toc: true
tags:
  - libraries
  - auth0js
  - migrations
---
# Migrating to Auth0.js v9

[Auth0.js v9](/libraries/auth0js) has been improved to operate with enhanced security and removes dependencies that have been deprecated as per Auth0's roadmap. In some cases, these security enhancements may impact application behavior when upgrading from an earlier versions of auth0.js. 

## Should I migrate to v9?

Everyone should migrate to v9. All previous versions are deprecated, and will be removed from service July 16, 2018. For applications that use Auth0.js within an Auth0 login page, this migration is recommended; for applications with Auth0.js embedded within them, this migration is mandatory.

::: note
Previously, deprecated Auth0.js versions were planned to be removed from service on April 1, 2018. However, the Removal of Service date has been extended to **July 16, 2018** due to a [mitigation of the risks posed by deprecated versions](/cross-origin-authentication/fingerprinting). Customers are still encouraged to migrate applications to the latest version **as soon as possible** in order to ensure that applications continue to function properly. 
:::

## Migration Instructions

The documents below describe all the changes that you should be aware of when migrating from different versions of auth0.js to v9. Make sure you go through the relevant guide(s) before upgrading.

* [Migrating from Auth0.js v8](/libraries/auth0js/v9/migration-v8-v9)
    * [Recommendations for migrating from Auth0.js v8 when SSO is required](/guides/login/migration-sso)
* [Migrating from Auth0.js v7](/libraries/auth0js/v9/migration-v7-v9)
* [Migrating from Auth0.js v6](/libraries/auth0js/v9/migration-v6-v9)
* [Migrating from Auth0.js v8 in Angular 1.x Applications](/libraries/auth0js/v9/migration-angularjs-v8)
* [Migrating from Auth0.js v7 in Angular 1.x Applications](/libraries/auth0js/v9/migration-angularjs-v7)
* [Migrating from Auth0.js v6 in Angular 1.x Applications](/libraries/auth0js/v9/migration-angularjs-v6)
* [Migrating from Auth0.js v8 in Angular 2.x Applications](/libraries/auth0js/v9/migration-angular)
* [Migrating from Auth0.js v8 in React.js Applications](/libraries/auth0js/v9/migration-react)

If you have any questions or concerns, you can discuss them in the [Auth0 Community](https://community.auth0.com/), submit them using the [Support Center](${env.DOMAIN_URL_SUPPORT}), or directly through your account representative, if applicable. 

<%= include('../../../_includes/_embedded_login_warning') %>

## Troubleshooting

### I upgraded but I still get deprecation warnings in the logs

You have already migrated to Auth0.js 9 but you still see this error in your logs:

```text
Legacy Lock API: This feature is being deprecated. Please refer to our documentation to learn how to migrate your application.
```

These deprecation notices most likely originate from a user visiting the [Universal Login page](/hosted-pages/login) directly without initiating the authentication flow from your app. This can happen if a user bookmarks the login page directly. If this happens after **July 16, 2018** the user will not be able to log in. 

Check out the [Deprecation Error Reference](/errors/deprecation-errors) for more information on deprecation related errors.
