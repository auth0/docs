---
section: libraries
title: Migrating to Lock v11
description: How to migrate to Lock v11
toc: true
---
# Migrating to Lock v11

Lock 11 is designed for embedded login scenarios. It operates with enhanced security and removes dependencies that have been deprecated as per Auth0's roadmap. In some cases, these security enhancements may impact application behavior when upgrading from an earlier version of Lock. 

We recommend that instead of using Lock embedded in your application, you use **Centralized Login**, as it is the [most secure, powerful and flexible approach for authentication](/guides/login/centralized-vs-embedded).

If you decide to keep using Lock, this document lists all the changes that you should be aware of between versions 10 and 11 of Lock. It includes information on what is changing and why, details on new or deprecated features, and instructions on how you can migrate your implementation.

If you are using older versions of Lock, you will also need to migrate to avoid using deprecated endpoints. You can read about it in our [previous Migration Guides](/libraries/lock/v10/migration-guide)

If you have any questions or concerns, you can submit them using the [Support Center](${env.DOMAIN_URL_SUPPORT}), or directly through your account representative, if applicable. 

## Migration Steps

### 1. Configure Auth0 for Embedded Login

Add the domain where your web application is hosted to the **Allowed Web Origins** field. You can find this field in the [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

![Allowed Web Origins](/media/articles/libraries/lock/allowed-origins.png)

If you enable [Custom Domain Names](/custom-domains) and the top level domain for your website is the same as the custom domain for the Auth0 tenant, Lock will work without any further configuration. Otherwise, you will need to configure your Auth0 client to use [Cross Origin Authentication](/cross-origin-authentication). 

### 2. Change Calls to .getProfile()

Lock v10 included a deprecated function called `getProfile()` that received an `id_token` as a parameter and returned the user profile. If you are still using it, you need to change the invocation to use an `access_token` instead.

### 3. [Optional] Remove the oidcConformant parameter

The `oidcConformant` flag was used in Lock 10 to force Lock not to call legacy endpoints. Lock 11 never uses these legacy endpoints, so the flag is unnecessary. If specified, it will simply be ignored.

## Behavior Changes in Lock v11

### Usage in Popup Mode

When using [Popup Mode](libraries/lock/v11/authentication-modes#popup-mode) in previous versions of Lock, a new browser window was opened and immediately closed in order to complete the authentication transaction. In Lock 11 that windows is open on a hidden iframe that the user never sees, providing a better experience. 

### Usage in Hosted Login Pages

Lock 11 is designed for embedded login scenarios and is not supported in centralized login scenarios (i.e. Hosted Login Pages). If you wish to use Lock in your Auth0 Hosted Login Page, you will need to continue using Lock 10.

### Single Sign On Using IP Ranges

In Lock 10, you could configure an IP range in an Active Directory/LDAP connection. You could then use that range to allow integrated Windows Authentication if the user's IP was within the range. When this was true, Lock would display a button enabling SSO for that user as shown below.

![SSO With Lock 10 and Windows IP Ranges](/media/articles/libraries/lock/lock-11-windows-authentication.png)

This functionality has been removed from Lock 11. There is no IP detection and the user will get redirected to the Active Directory login page where they will have to type in their credentials. It will still be available when using Centralized Login.

### Default Values

Lock 11 will default the `scope` parameter to `'openid profile email'`. This is to make the "Last Logged in With" window work correctly.
