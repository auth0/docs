---
section: libraries
title: Lock v10 to v11 Migration Guide
description: How to migrate from Lock v10 to Lock v11
toc: true
---
# Migration Guide: Lock v10 to v11

This document lists all the changes you should be aware of between versions 10 and 11 of Lock. It includes information on what is changing and why, details on new or deprecated features, and instructions on how you can migrate your implementation.

If you are using Lock in embedded mode, you are encouraged to use the latest, and more secure, version of the widget, but before you update your code, make sure that you have reviewed this document and made any necessary changes in your implementation. 

If you have any questions or concerns, you can submit them using the [Support Center](${env.DOMAIN_URL_SUPPORT}), or directly through your account representative, if applicable. 

## Why Migrate?

Lock 11 uses by default Auth0's current authentication pipeline and does not utilize any of the legacy pipeline’s endpoints. Going forward, any new Auth0 features, examples and documentation will target only this pipeline. All Auth0 SDK versions that depend on the legacy pipeline are deprecated and will not receive updates for new features or non-critical security issues, and will eventually be discontinued.

For more information on the current authentication pipeline and the changes it brings, refer to [Introducing OIDC Conformant Authentication](/api-auth/intro).

## What Changes?

### Hosted Login Pages

Lock 11 is a new version, designed for embedded login scenarios (i.e. implementations where the Lock widget is embedded in your application), and is not supported in centralized login scenarios (i.e. Hosted Login Pages).

If you are using a [Hosted Login Page](/hosted-pages/login), keep using Lock 10. If you have the widget embedded in your application consider upgrading to the latest Lock version.

### Cross Origin Authentication

Ιn order to use Lock 11, you need to have [Cross Origin Authentication](/cross-origin-authentication) (COA) enabled. 

You can enable COA using the Dashboard, for details refer to [Configure Your Client for Cross-Origin Authentication](/cross-origin-authentication#configure-your-client-for-cross-origin-authentication).

::: note
Cross Origin Authentication has some limitations, before you enable it for your app make sure that you are aware of them. For details refer to [Cross Origin Authentication](/cross-origin-authentication).
:::

### Single Sign On using IP Ranges

Up to Lock 10, you could configure IP ranges in an Active Directory/LDAP connection and use them to allow integrated Windows Authentication if the user attempting to log in was within that range. Lock would display a button enabling SSO for the user.

![Windows Authentication in Lock 10](/media/articles/libraries/lock/windows-authentication.png)

This functionality has been removed from Lock 11. There is no IP detection and the user will get redirected to the Active Directory login page where they will have to type their credentials.

At the moment Lock 11 cannot handle Active Directory connections (we are working hard to add support for this soon), so the request will return the following response:

```text
{
    "error":"invalid_request",
    "error_description":"Connection strategy not supported."
}

```

### Deprecated Methods/Properties

#### oidcConformant

The `oidcConformant` flag was used to force Lock to use Auth0's current authentication pipeline and prevent it from reaching legacy endpoints.

Lock 11 uses by default the current authentication pipeline, therefore this flag has been removed. 

If you are migrating to Lock 11 you need to remove this flag from your implementation.

#### rememberLastLogin

The `rememberLastLogin` flag was used to determine whether or not to show a screen that allows you to quickly log in with the account you used the last time. The flag was set by default to true.

This flag, alongside with the functionality, has been removed from Lock 11.

If you are migrating to Lock 11 you need to remove this flag from your implementation.
