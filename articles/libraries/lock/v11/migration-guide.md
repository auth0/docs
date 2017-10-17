---
section: libraries
toc: true
description: Lock 10 to Lock 11 Migration Guide
---
# Lock 10 to Lock 11 Migration Guide

The following instructions assume you are migrating from **Lock 10** to the latest **Lock 11**. 

## Changes and Additions

### OIDC Conformant and Cross-Origin Authentication

The latest version of Lock caters to ease of use for the developer more than ever. Lock 11 makes it even simpler to start using an [OIDC](/cross-origin-authentication) authentication flow than ever before.

When embedding Lock in your application, you will no longer need to use the `oidcconformant` option. Lock 11 **assumes** that your client is OIDC Conformant. You can verify this in your [Dashboard](${manage_url}), in the Client Settings screen, under "Advanced" and then "OAuth".

![Cross Origin Settings](/media/articles/cross-origin-authentication/cross-origin-settings.png)

Additionally, when including Lock 11 in your application, [cross-origin authentication](/cross-origin-authentication) must be used. You can check to ensure that this setting is also toggled on in the same OAuth settings screen for your client.

### Hosted Login

If you use Lock in the Auth0 [Hosted Login Page](/hosted-pages/login), you will need to continue using Lock 10 for the time being. 

## Further Reading

::: next-steps
* [Lock 11 Reference Documents](/libraries/lock/v11)
* [Cross-Origin Authentication](/cross-origin-authentication)
:::