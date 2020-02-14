---
description: Describes the deprecation of the ability to perform account linking with ID Tokens and provides migration options.
topics: deprecation-notice
contentType: reference
useCase:
  - migrate
---

# Legacy Lock API Deprecation

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2017-12-21 |  2018-08-06 |

We are continually improving the security of our service. As part of this effort, we have deprecated the Legacy Lock API, which consists of the /usernamepassword/login and /ssodata endpoints. These endpoints are used by Lock.js v8, v9, and v10 and Auth0.js, v6, v7, and v8, and can also be called directly from applications.

As of August 6, 2018, Auth0 has permanently disabled the Legacy Lock API. This removal of service fully mitigates the CSRF vulnerability [disclosed in April 2018](https://auth0.com/blog/managing-and-mitigating-security-vulnerabilities-at-auth0/). This also ends the soft removal grace period that was [first announced on July 16, 2018](https://community.auth0.com/t/auth0-legacy-lock-api-disabled-grace-period-available/12949), meaning the Legacy Lock API can no longer be re-enabled.

## Are you affected?

If your applications match any of the following cases, you are affected:

* Use of versions of Lock previous to v11 and versions of Auth0.js previous to v9 in embedded login scenarios
* Use of /usernamepassword/login endpoint directly from applications 
* Use of /user/ssodata endpoint directly from applications

If you do not use the above libraries and do not specifically call the above endpoints, you are not affected. No libraries which are not specifically named are affected by this vulnerability, or in turn, by the migration.

## Next steps

### If you already use Universal Login / Hosted Login Page

Applications which log users in via <dfn data-key="universal-login">Universal Login</dfn> through an Auth0 hosted page are not _required_ to update the version of Lock or Auth0.js that they use _inside_ that login page (if you have customized your login page in the [Dashboard](${manage_url}/#/login_page). However, the use of the newest library versions is strongly recommended, even in the Universal Login Page. For those who have not customized their login page, the Lock v11 widget is already in use and no further action is required.

### If you use embedded login

Embedded login with Lock v11 and Auth0.js v9 now rely entirely on [cross-origin authentication](/cross-origin-authentication) for any form of username/password authentication (such as Auth0 DB, Custom DB, or LDAP connections). Cross-origin authentication is the situation in which credentials are collected on one domain, but validated on another.

This cross-origin authentication protocol relies on cookies, which will be considered third-party cookies if the domain of the application and Auth0 tenant do not match. Unfortunately, some browsers block third-party cookies, and even if supported, many users may have manually disabled third-party cookies in their browsers. 

Because of these [cross-origin authentication issues](/cross-origin-authentication#limitations), there are only two general implementations that can be recommended. 

1. [Migrate to Universal Login](/product-lifecycle/migration/guides/legacy-lock-api-deprecation#migrate-to-universal-login). Universal Login will work with or without [custom domains](/custom-domains), and will work from most application types as well. It requires the least application code to implement and is the most secure option. 

2. [Continue to use embedded login and migrate to newer library versions](/product-lifecycle/migration/guides/legacy-lock-api-deprecation#continue-to-use-embedded-login-and-migrate). A crucial part of this implementation is employing a custom domain to prevent cross-origin issues. The following caveats apply:
    * Only one custom domain can be applied per Auth0 tenant, so all applications on the tenant will use the same custom domain (they will need to use the same top-level domain as well).
    * This option may not be viable for customers who are not eligible to use custom domains, or who choose not to do so. In those cases, Universal Login is the best approach.

<%= include('../../_includes/_embedded_login_warning') %>

## Migration

See the [Legacy Lock API Migration Guide](/product-lifecycle/migration/legacy-lock-api-deprecation) for details. 

<%= include('./_contact-support') %>
