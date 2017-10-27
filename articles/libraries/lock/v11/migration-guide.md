---
section: libraries
title: Lock v10 to v11 Migration Guide
description: How to migrate from Lock v10 to Lock v11
toc: true
---
# Migration Guide: Lock v10 to v11

Lock 11 is designed for embedded login scenarios, and operates with enhanced security and protection from common vulnerabilities (such as CSRF attacks) that have been discovered in previous versions of Lock. In some cases, these security enhancements may impact application behavior when upgrading from an earlier version of Lock. 

This document lists all the changes that you should be aware of between versions 10 and 11 of Lock. It includes information on what is changing and why, details on new or deprecated features, and instructions on how you can migrate your implementation.

If you have any questions or concerns, you can submit them using the [Support Center](${env.DOMAIN_URL_SUPPORT}), or directly through your account representative, if applicable. 

## Allowed Web Origins

In order to use Embedded Login you need to whitelist the websites where you will embed the login dialog in the  **Allowed Web Origins** and the **Allowed Origins (CORS)** fields:

![Allowed Web Origins](/media/articles/libraries/lock/allowed-origins.png)

## Browsers with Third-Party Cookies Disabled

Embedded login will not work with [some browser versions](/cross-origin-authentication#browser-testing-matrix) when they have third-party cookies disabled. To remediate this issue, follow these instructions on [Embedded Login and Third-Party Cookies]().

## Usage in Hosted Login Pages

Lock 11 is designed for embedded login scenarios and is not supported in centralized login scenarios (i.e. Hosted Login Pages). If you use Auth0 Hosted Login Pages, you will need to keep using Lock 10.

## Single Sign On Using IP Ranges

In Lock 10, you could configure an IP range in an Active Directory/LDAP connection. You could then use that range to allow integrated Windows Authentication if the user's IP was within the range. Lock would display a button enabling SSO for that user as shown below.

![SSO With Lock 10 and Windows IP Ranges](/media/articles/libraries/lock/lock-11-windows-authentication.png)

This functionality has been removed from Lock 11. There is no IP detection and the user will get redirected to the Active Directory login page where they will have to type in their credentials.

At the moment, the request will return the following response from Lock 11:

```js
{
  "error":"invalid_request",
  "error_description":"Connection strategy not supported."
}
```

## Changes in GetSSOData implementation

TBD

## Deprecated Methods and Options

### oidcConformant

The `oidcConformant` flag was used in Lock 10 to force Lock not to call legacy endpoints. Lock 11 never uses legacy endpoint so the flag is not needed anymore. If specified, it will be ignored.

## Methods with Behavioral Changes

### getProfile

In Lock 10 this function received a string parameter with an ID Token. If you use it in Lock 11, it needs to receive an Access Token. You’ll need to update your code to change the parameter sent.
