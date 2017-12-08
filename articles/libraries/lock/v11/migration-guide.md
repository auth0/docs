---
section: libraries
title: Lock v10 to v11 Migration Guide
description: How to migrate from Lock v10 to Lock v11
toc: true
---
# Migration Guide: Lock v10 to v11

Lock 11 is designed for embedded login scenarios. It operates with enhanced security and removes dependencies that have been deprecated as per Auth0's roadmap. In some cases, these security enhancements may impact application behavior when upgrading from an earlier version of Lock. 

This document lists all the changes that you should be aware of between versions 10 and 11 of Lock. It includes information on what is changing and why, details on new or deprecated features, and instructions on how you can migrate your implementation.

If you are using older versions of Lock, you will also need to migrate to avoid using deprecated endpoints. You can read about it in our [previous Migration Guides](/libraries/lock/v10/migration-guide)

If you have any questions or concerns, you can submit them using the [Support Center](${env.DOMAIN_URL_SUPPORT}), or directly through your account representative, if applicable. 

## Migration Steps

### 1. Configure Auth0 for Embedded Login

In order to send the user credentials to Auth0 server, Lock needs to make requests from your website user's browser to the Auth0-server. 

If you enable [Custom Domain Names](/custom-domains) and the domain for your website is the same as the custom domain for the Auth0 tenant, Lock will work without any further configuration.

If you don’t enable Custom Domain Names, given that the requests from your application to Auth0 Server will be cross-domain, you will need to configure your Auth0 client to use Cross Origin Authentication (/cross-origin-authentication). 

### 2. Change Calls to .getProfile()

Lock v10 included a deprecated function called `getProfile()` that received an `id_token` as a parameter and returned the user profile. If you are still using it, you need to change the invocation to use an `access_token` instead.

### 3. [Optional] Remove the oidcConformant parameter

The oidcConformant flag was used in Lock 10 to force Lock not to call legacy endpoints. Lock 11 never uses these legacy endpoints, so the flag is unnecessary. If specified, it will simply be ignored.

## Behavior Changes in Lock v11

### Usage in Popup Mode

When using [Popup Mode](libraries/lock/v11/authentication-modes#popup-mode) in previous versions of Lock, a new browser window was opened and immediately closed in order to complete the authentication transaction. In Lock 11 that windows is open on a hidden iframe, so it's not shown, providing a better user experience. 

### Usage in Hosted Login Pages

Lock 11 is designed for embedded login scenarios and is not supported in centralized login scenarios (i.e. Hosted Login Pages). If you wish to use Lock in your Auth0 Hosted Login Page, you will need to continue using Lock 10.

### Single Sign On Using IP Ranges

In Lock 10, you could configure an IP range in an Active Directory/LDAP connection. You could then use that range to allow integrated Windows Authentication if the user's IP was within the range. When this was true, Lock would display a button enabling SSO for that user as shown below.

![SSO With Lock 10 and Windows IP Ranges](/media/articles/libraries/lock/lock-11-windows-authentication.png)

This functionality has been removed from Lock 11. There is no IP detection and the user will get redirected to the Active Directory login page where they will have to type in their credentials.

### Default Values

Both Lock 11 and Auth0.js 9 will default the `scope` parameter to `'openid profile email'`. This is to make `getSSOData` and the "Last Logged in With" window work correctly.
