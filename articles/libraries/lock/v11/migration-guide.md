---
section: libraries
title: Migrating to Lock v11
description: How to migrate to Lock v11
topics:
  - libraries
  - lock
  - migrations
contentType:
  - how-to
  - reference
  - concept
useCase:
  - add-login
  - migrate
---
# Migrating to Lock v11

<dfn data-key="lock">[Lock v11](/libraries/lock)</dfn> operates with enhanced security and removes dependencies that have been deprecated as per Auth0's roadmap. In some cases, these security enhancements may impact application behavior when upgrading from an earlier version of Lock. 

## Should I migrate to v11?

Everyone should migrate to v11. All previous versions are deprecated, and the Legacy Lock API was removed from service on August 6, 2018. For applications that use Lock within an Auth0 login page, this migration is recommended; for applications with Lock embedded within them, this migration is mandatory.

## Migration instructions

The documents below describe all the changes that you should be aware of when migrating from different versions of Lock. Make sure you go through the relevant guide(s) before upgrading.

* [Migrating from the lock-passwordless widget](/libraries/lock/v11/migration-lock-passwordless)
* [Migrating from Lock v10](/libraries/lock/v11/migration-v10-v11)
* [Recommendations for migrating from Lock v10 when Single Sign-on (SSO) is required](/guides/login/migration-sso)
* [Migrating from Lock v10 in Angular 1.x Applications](/libraries/lock/v11/migration-angularjs-v10)
* [Migrating from Lock v10 in Angular 2+ Applications](/libraries/lock/v11/migration-angular)
* [Migrating from Lock v10 in React Applications](/libraries/lock/v11/migration-react)
* [Migrating from Lock v10 in Cordova Applications](/libraries/lock/v11/migration-cordova)
* [Migrating from Lock v9](/libraries/lock/v11/migration-v9-v11)
* [Migrating from Lock v9 in Angular 1.x Applications](/libraries/lock/v11/migration-angularjs-v9)
* [Migrating from Lock v8](/libraries/lock/v11/migration-v8-v11)
* [Migrating from Lock v8 in Angular 1.x Applications](/libraries/lock/v11/migration-angularjs-v8)

If you have any questions or concerns, you can discuss them in the [Auth0 Community](https://community.auth0.com/), submit them using the [Support Center](${env.DOMAIN_URL_SUPPORT}), or directly through your account representative, if applicable. 

<%= include('../../../_includes/_embedded_login_warning') %>

## Troubleshooting

### Lock takes too long to display the login options

If Lock takes a lot of time to display the login options, it could be because the [Allowed Web Origins](/libraries/lock/v11/migration-v10-v11#configure-auth0-for-embedded-login) property is not correctly set.

To verify that this is a problem check your logs at [Dashboard > Logs](${manage_url}/#/logs). If you see an entry with the following error description, set the [Allowed Web Origins](/libraries/lock/v11/migration-v10-v11#configure-auth0-for-embedded-login) property and try again.

```text
The specified redirect_uri 'https://YOUR_APP_URL' does not have a registered domain.
```

### I upgraded but I still get deprecation warnings in the logs

You have already migrated to Lock 11 but you still see this error in your logs:

```text
Legacy Lock API: This feature is being deprecated. Please refer to our documentation to learn how to migrate your application.
```

These deprecation notices most likely originate from a user visiting the <dfn data-key="universal-login">Universal Login</dfn> [page](/hosted-pages/login) directly without initiating the authentication flow from your app. This can happen if a user bookmarks the login page directly. After August 6, 2018, these users will not be able to log in.

See [Check Deprecation Errors](/troubleshoot/guides/check-deprecation-errors) for more information on deprecation-related errors.
