---
section: libraries
title: Migrating to Auth0.js v9
description: How to migrate to auth0.js v9
toc: true
---
# Migrating to Auth0.js v9

Auth0.js v9 has been improved to work better in embedded login scenarios. It operates with enhanced security and removes dependencies that have been deprecated as per Auth0's roadmap. In some cases, these security enhancements may impact application behavior when upgrading from an earlier versions of Auth0.js. 

Auth0.js can be used to implement authentication in different ways:

- Centralized Login, using the .authorize() method, where the user is redirected from your website to an Auth0's Hosted Login Page.

- Embedded Login, using the .login(), popup.loginWithCredentials(), client.loginWithCredentials() methods, where the login dialog is displayed in the application's website.

- In the Hosted Login Page, where you can use the same methods as in Embedded Login but from inside a customized Auth0's Hosted Login page.

Depending on how you are using auth0.js, you have different options:

| Scenario | Migration to v9 | 
| --- | --- | 
| Centralized Login | Recommended |
| Embedded Login | Required |
| Customized Hosted Page | Not Supported |

If you are using Centralized Login, you don't need to make any changes in your code to use auth0.js v9, you can just update it to the latest version.

If you are not using Centralized login, we recommend you to use it as [most secure, powerful and flexible approach for authentication](/guides/login/centralized-vs-embedded). 

If you decide to keep using Embedded Login, you will need to migrate to v9. Before you update your code, make sure that you have reviewed this document and made any necessary changes in your implementation. 

[Migrating from Auth0.js v6]()
[Migrating from Auth0.js v7]()
[Migrating from Auth0.js v8](migration-v8-v9.md)
[Migrating to Auth0.js in Angular.js Applications]()
[Migrating to Auth0.js in Angular Applications]()

If you have any questions or concerns, you can submit them using the [Support Center](${env.DOMAIN_URL_SUPPORT}), or directly through your account representative, if applicable. 

