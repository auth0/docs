---
section: libraries
title: Migrating to Auth0.js v9
description: How to migrate to Auth0.js v9
toc: true
---
# Migrating to Auth0.js v9

<<<<<<< HEAD
[Auth0.js v9](/libraries/auth0js) has been improved to operate with enhanced security and removes dependencies that have been deprecated as per Auth0's roadmap. In some cases, these security enhancements may impact application behavior when upgrading from an earlier versions of auth0.js. 
## Should I migrate to v9?

Everyone should migrate to v9. All previous versions are deprecated as of April 1, 2018, and will at some point cease to work after this date. For clients who use Auth0.js within an Auth0 login page, this migration is recommended; for client applications with Auth0.js embedded within them, this migration is mandatory.
=======
[Auth0.js v9](/libraries/auth0js) has been improved to work better in embedded login scenarios. It operates with enhanced security and removes dependencies that have been deprecated as per Auth0's roadmap. In some cases, these security enhancements may impact application behavior when upgrading from an earlier versions of auth0.js. 

::: warning
If you are using auth0.js to implement login embedded in your applications, we recommend moving to a universal login approach, as it is the [most secure, powerful and flexible approach for authentication](/guides/login/centralized-vs-embedded). You can find examples on how to implement universal login in our [Quickstarts](/quickstarts).
:::

## Should I migrate to v9?

Auth0.js can be used to implement authentication in different ways:

- In your application, to trigger universal login, using the `.authorize()` method, where the user is redirected from your website to an Auth0's Hosted Login Page.

- In your application, to implement embedded login, using the `.login()`, `popup.loginWithCredentials()`, `client.loginWithCredentials()` methods, where the login dialog is displayed in the application's website.

- In the [Hosted Login Page](/hosted-pages/login), where you can use the same methods as in embedded login but from inside a customized Auth0's Hosted Login Page. Most customers don't customize Auth0 Hosted Login Page with auth0.js, so you probably don't need to worry about this scenario.

Migration to v9 will depend on how you are using auth0.js:

| **Scenario** | **Migration to v9** | 
| --- | --- | 
| In your application, to trigger universal login | Required (*) | 
| In your application, to implement embedded login | Required |
| In a customized hosted page | Not Supported |

(*) There a certain usage patterns with universal login and auth0.js v8 that don't require migration. However, given that for those scenarios just updating the library version will work, we recommend that you always migrate to v9.
>>>>>>> Replacing the term 'centralized login' with 'universal login'

## Migration Instructions

The documents below describe all the changes that you should be aware of when migrating from different versions of auth0.js to v9. Make sure you go through the relevant guide(s) before upgrading.

[Migrating from Auth0.js v8](/libraries/auth0js/v9/migration-v8-v9)

[Migrating from Auth0.js v7](/libraries/auth0js/v9/migration-v7-v9)

[Migrating from Auth0.js v6](/libraries/auth0js/v9/migration-v6-v9)

[Migrating from Auth0.js v8 in Angular 1.x Applications](/libraries/auth0js/v9/migration-angularjs-v8)

[Migrating from Auth0.js v7 in Angular 1.x Applications](/libraries/auth0js/v9/migration-angularjs-v7)

[Migrating from Auth0.js v6 in Angular 1.x Applications](/libraries/auth0js/v9/migration-angularjs-v6)

[Migrating from Auth0.js v8 in Angular 2.x Applications](/libraries/auth0js/v9/migration-angular)

[Migrating from Auth0.js v8 in React.js Applications](/libraries/auth0js/v9/migration-react)

:::note
If you have any questions or concerns, you can discuss them in the [Auth0 Community](https://community.auth0.com/), submit them using the [Support Center](${env.DOMAIN_URL_SUPPORT}), or directly through your account representative, if applicable. 
:::

