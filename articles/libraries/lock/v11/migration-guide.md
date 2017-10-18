---
section: libraries
toc: true
description: Lock 10 to Lock 11 Migration Guide
---
# Lock 10 to Lock 11 Migration Guide

This document lists all the changes you should be aware of between versions 10 and 11 of Lock. It includes information on what is changing and why, details on new or deprecated features, and instructions on how you can migrate your implementation.

You are encouraged to use the latest, and more secure, version of the widget, but before you update your code, make sure that you have reviewed this document and made any necessary changes in your implementation. 

If you have any questions or concerns, you can submit them using the [Support Center](${env.DOMAIN_URL_SUPPORT}), or directly through your account representative, if applicable. 

## Changes and Additions

###Hosted Login Pages

Lock 11 is a new version, designed for embedded login scenarios (i.e. implementations where the Lock widget is embedded in your application), and is not supported in centralized login scenarios (i.e. [Hosted Login Pages](/hosted-pages/login)).

If you are using a Hosted Login Page, keep using Lock 10. If you have the widget embedded in your application consider upgrading to the latest Lock version. 

### Cross-Origin Authentication

Ιn order to use Lock 11, you need to have Cross-Origin Authentication (COA) enabled.

You can enable cross-origin authentication using the Dashboard, for details refer to [Configure Your Client for Cross-Origin Authentication](/cross-origin-authentication).

::: note
Cross Origin Authentication has some limitations. Before you enable it for your app make sure that you are aware of them. For details refer to [Cross Origin Authentication](/cross-origin-authentication).
:::

## Removed Methods and Options

### oidcConformant

The `oidcConformant` configuration option has been removed. Lock 11 is only used in embedded login scenarios, and all of them are OIDC conformant and use cross-origin authentication by default.

### rememberLastLogin

The `rememberLastLogin` option no longer exists in Lock 11. 

## Further Reading

::: next-steps
* [Lock 11 Reference Documents](/libraries/lock/v11)
* [Cross-Origin Authentication](/cross-origin-authentication)
:::
