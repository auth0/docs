---
description: Describes the deprecation of the ability to perform account linking with ID Tokens and provides migration options.
topics: deprecation-notice
contentType: reference
useCase:
  - migrate
---

# Deprecation Notice: Legacy Lock API

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2017-12-21 |  2018-08-06 |

We are continually improving the security of our service. As part of this effort, we have deprecated the Legacy Lock API, which consists of the /usernamepassword/login and /ssodata endpoints. These endpoints are used by Lock.js v8, v9, and v10 and Auth0.js, v6, v7, and v8, and can also be called directly from applications.

As of August 6, 2018, Auth0 has permanently disabled the Legacy Lock API. This removal of service fully mitigates the CSRF vulnerability [disclosed in April 2018](https://auth0.com/blog/managing-and-mitigating-security-vulnerabilities-at-auth0/). This also ends the soft removal grace period that was [first announced on July 16, 2018](https://community.auth0.com/t/auth0-legacy-lock-api-disabled-grace-period-available/12949), meaning the Legacy Lock API can no longer be re-enabled.

## New Lock v11 and Auth0.js v9

If your Legacy Lock API migration has not yet been completed, your users may experience an outage, failed logins, or other adverse effects. You will need to complete your migration in order to restore normal functionality. Refer to the [Legacy Lock API Deprecation Guide](/migrations/guides/legacy-lock-api-deprecation) to determine the correct path for your needs. See [Check Deprecation Errors](/troubleshoot/guides/check-deprecation-errors) to identify the source(s) of any errors in your tenant logs. 

### Am I affected by the change?

If you are currently implementing login in your application with Lock v8, v9, or v10, or Auth0.js v6, v7, or v8, you are affected by these changes. Additionally, you are affected if your application calls the /usernamepassword/login or /ssodata endpoints directly via the API.

We **recommend** that applications using [Universal Login](/hosted-pages/login) update the library versions they use inside of the login page.

However, those who are using Lock or Auth0.js embedded within their applications, or are calling the affected API endpoints directly, are **required** to update, and applications which still use deprecated endpoints will cease to function properly after the removal of service date.

Libraries and SDKs not explicitly named here are not affected by this migration.
