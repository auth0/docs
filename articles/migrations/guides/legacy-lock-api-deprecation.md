---
title: Legacy Lock API Deprecation
description: This article covers the Legacy Lock API deprecation and gives direction as to migration paths and changes required.
toc: true
contentType:
  - concept
  - how-to
useCase:
  - add-login
  - migrate
---
# Legacy Lock API Deprecation

On April 4, 2018, Auth0 [publicly disclosed a vulnerability](https://auth0.com/blog/managing-and-mitigating-security-vulnerabilities-at-auth0/). That vulnerability resulted in the deprecation of two endpoints in the Auth0 API, and the libraries and SDKs which used those endpoints. Due to this vulnerability, those endpoints (and thus, the deprecated versions of the libraries) will be removed from service on **July 16, 2018**.

The purpose of this guide is to help you to select the best migration path for your application(s) if you are impacted by the deprecation notice. 

## Am I affected?

If your applications match any of the following cases, you are affected:

* Use of versions of Lock previous to v11 and versions of Auth0.js previous to v9 in embedded login scenarios
* Use of /usernamepassword/login endpoint directly from applications 
* Use of /user/ssodata endpoint directly from applications

If you do not use the above libraries and do not specifically call the above endpoints, you are not affected. No libraries which are not specifically named are affected by this vulnerability, or in turn, by the migration.

::: panel-warning Dashboard Warning Banner - Legacy Lock API Enabled
You may see this warning panel when you log in to the Dashboard: 

_Your tenant has the Legacy Lock API enabled. Please follow our Deprecation Guide then disable the Legacy Lock API in your advanced settings. The Legacy Lock API will be removed on July 16th, 2018 and your applications will no longer work if you have not fully migrated._

This is because you have not turned off the Legacy Lock API switch in your [Advanced Settings](${manage_url}/#/tenant/advanced). If you are not affected by the migration, or have already completed it, turn that setting off to remove the warning.
:::

### If you already use Universal Login / Hosted Login Page

Applications which log users in via Universal Login through an Auth0 hosted page are not _required_ to update the version of Lock or Auth0.js that they use _inside_ that login page (if you have customized your login page in the [Dashboard](${manage_url}/#/login_page). However, the use of the newest library versions is strongly recommended, even in the Universal Login Page. For those who have not customized their login page, the Lock v11 widget is already in use and no further action is required.

### If you use embedded login

Embedded login with Lock v11 and Auth0.js v9 now rely entirely on [cross-origin authentication](/cross-origin-authentication) for any form of username/password authentication (such as Auth0 DB, Custom DB, or LDAP connections). Cross-origin authentication is the situation in which credentials are collected on one domain, but validated on another.

This cross-origin authentication protocol relies on cookies, which will be considered third-party cookies if the domain of the application and Auth0 tenant do not match. Unfortunately, some browsers block third-party cookies, and even if supported, many users may have manually disabled third-party cookies in their browsers. 

Because of these [cross-origin authentication issues](/cross-origin-authentication#limitations-of-cross-origin-authentication), there are only two general implementations that can be recommended. 

1. [Migrate to Universal Login](#1-migrate-to-universal-login). Universal Login will work with or without [custom domains](/custom-domains), and will work from most application types as well. It requires the least application code to implement and is the most secure option. 

2. [Continue to use embedded login and migrate to newer library versions](#2-continue-to-use-embedded-login-and-migrate). A crucial part of this implementation is employing a custom domain to prevent cross-origin issues. The following caveats apply:
    * Only one custom domain can be applied per Auth0 tenant, so all applications on the tenant will use the same custom domain (they will need to use the same top-level domain as well).
    * This option may not be viable for customers who are not eligible to use custom domains, or who choose not to do so. In those cases, Universal Login is the best approach.

<%= include('../../_includes/_embedded_login_warning') %>

If neither of these recommendations (Universal Login or embedded + custom domains) seem to work for your situation, please visit our [Support Center](${env.DOMAIN_URL_SUPPORT}) and file a support ticket or a community post for further guidance.

## What do I do?

All applications _must_ stop using the deprecated endpoints / library versions prior to **July 16, 2018**, when they will be removed from service and those applications will cease to work correctly. There are two options for migration:

### 1. Migrate to Universal Login

Universal Login is **strongly** recommended for most use cases because it [offers many advantages](/guides/login/universal-vs-embedded) over the embedded form of login screen. These advantages include:

* Developed, hosted and maintained by Auth0 (less maintenance required by your team).
* Provides a single place to make changes.
* More secure because credentials are collected and verified within the same domain. This reduces exposure of static credentials to multiple applications as well as the possibility of CSRF and man-in-the-middle attacks.
* Provides reliable Single Sign On functionality without relying on third-party cookies or restricting the domain of applications.
* Fully customizable in terms of colors, text, logos, buttons as well as [custom domain](/custom-domains).
* Provides proper cache control to avoid browsers caching old versions.
* Can leverage either the [Lock Widget](/libraries/lock) or [Auth0.js SDK](/libraries/auth0js) for flexibility in appearance and function.
* Works with any type of Auth0 connection as well as [multifactor authentication](/multifactor-authentication).

#### Universal Login migration guides

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="/guides/login/migrating-lock-v10-webapp"> Migrate Web Apps with Embedded Lock to Universal Login</a>
    <p>
      This document provides instruction for web apps which have embedded login (via the Lock widget) to migrate to Universal Login.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/guides/login/migrating-lock-v10-spa"> Migrate Single Page Apps with Embedded Lock to Universal Login</a>
    <p>
      This document provides instruction for single page apps which have embedded login (via the Lock widget) to migrate to Universal Login.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/guides/login/migration-embedded-universal"> Migrate Apps with Embedded Login to Universal Login</a>
    <p>
      This document provides instruction for apps which have embedded login to migrate to Universal Login.
    </p>
  </li>
</ul>

### 2. Continue to use embedded login and migrate

Embedded login (embedding Lock or a custom authentication UI) should be used only if the Universal Login Page **cannot** be used. If you intend to continue using embedded login, you **must** upgrade applications from deprecated library versions.

#### Embedded login migration guides

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="/libraries/lock/v11/migration-guide"> Lock v11 Migration Guide</a>
    <p>
      This document presents an overview of the updates to Lock in version 11 and points to technology and version-specific tutorials to help you with your migration.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/libraries/auth0js/v9/migration-guide"> Auth0.js v9 Migration Guide</a>
    <p>
      This document presents an overview of the updates to Auth0.js in version 9 and points to technology and version-specific tutorials to help you with your migration.
    </p>
  </li>
</ul>

Continued use of embedded login will require the use of [custom domains](/custom-domains) in order to prevent cross-origin authentication issues. The custom domains documentation includes important information on the use of custom domains, how to set them up, and what configuration is required for more intricate use cases, such as custom domains with SAML.

## Other considerations

A few specific items are changing with the new versions / endpoints. If you use any of the following features, you might want to take a look at the corresponding section below.

* [How to get user info](#how-to-get-user-info)
* [How to check for an existing session](#session-management)
* [How to log users out](#how-to-log-users-out)

### How to get user info

Once a user has been authenticated, an application may wish to retrieve information about a user. The recommended way to do this now is via the [/userinfo](/api/authentication#get-user-info) endpoint. If you are using Auth0.js v8 or v9 and using the [userInfo()](/libraries/auth0js/v9#extract-the-authresult-and-get-user-info) method, you already have made this change.

For customers who are using the [/tokeninfo](/api/authentication#get-token-info) endpoint, this endpoint is being replaced with the /userinfo endpoint. Customers should migrate to use the /userinfo endpoint instead of /tokeninfo. The /userinfo endpoint is the only one that will be maintained going forward and is the only endpoint for user information that is supported with the [custom domains](/custom-domains) feature.

As explained in the /userinfo endpoint docs entry, /userinfo obtains information using the Management API and therefore requires an [Access Token](/tokens/access-token#how-to-get-an-access-token) (obtained during login) instead of the [ID Token](/tokens/id-token) used by /tokeninfo.

Note also that the [/userinfo response](/api-auth/tutorials/adoption/scope-custom-claims) may vary based on scopes requested and the value of the [OIDC Conformant](/api-auth/tutorials/adoption/oidc-conformant) setting in the [Dashboard](${manage_url}) under **Applications > (Your Application) > Settings > Advanced Settings**. In that case, application code might need adjusted to handle the slightly altered response format.

### Session management

#### Single Page Applications

If a user navigates to a new page in a Single Page Application, your application may wish to check if a user already has an existing session. In order to do this, you may have directly called the /ssodata endpoint or utilized the `getSSOData()` function in auth0.js v8 or prior. The /ssodata endpoint is deprecated and will be removed from service on **July 16, 2018**. The `getSSOData()` function will continue to work, but will behave differently, and in most cases, can be replaced with use of `checkSession()`.

::: note
The `getSSOData()` and `checkSession()` functions should only be used from a Single Page Application
:::

##### checkSession

* The Auth0.js `checkSession()` function can be used to check whether or not a user has an existing session in Auth0.
* Invoking the `checkSession()` function will trigger an /authorize call, which will in turn result in the execution of [rules](/rules).
* The new `checkSession()` function is more lightweight and should be used as a replacement for `getSSOData()` unless `getSSOData()` features are needed.

##### getSSOData

* The Auth0.js v9 `getSSOData()` function will continue to work, but it now [behaves differently than in the past](/libraries/auth0js/v9/migration-v8-v9#review-calls-to-getssodata-).
* In Auth0.js v9, `getSSOData()` will check if a user has an existing session and perform a further check to determine if the user is the same one as in the last interactive authentication transaction. This supports Lock’s feature of showing the last logged-in user to facilitate subsequent logins.
* Invoking the `getSSOData()` function will now trigger a call to the [/authorize](/api/authentication#authorize-application) endpoint, which will in turn result in the execution of [rules](/rules).

##### Polling for an existing session

In some multi-application scenarios, where a user logging out of one application needs to be logged out of other applications, an application may have been set up to periodically poll Auth0 using `getSSOData()` to see if a session existed, and if not, log the user out of the application. 

Instead of doing this, applications should now use `checkSession()` instead of `getSSOData()`. The `getSSOData()` function performs more work behind the scenes than is needed for this purpose and applications that are not switched to `checkSession()` will suffer a needless performance penalty.

The poll interval between checks to `checkSession()` should be at least 15 minutes between calls to avoid any issues in the future with rate limiting of this call.

#### Web applications

In "web applications", the backend typically has a session for the user. Over time, the application session may expire, in which case the application should renew the session. The application backend should invoke a call to the [/authorize](/api/authentication#authorize-application) endpoint to get a new token. If the Authorization Server (Auth0 in this case) still has a session for the user, the user will not have to re-enter their credentials to log in again. If Auth0 no longer has a session for the user, the user has to log in again.

Customers with web applications which call the API from their backend should use this approach. Specifically, they should [call /oauth/token](/tokens/refresh-token/current#use-a-refresh-token) to renew their token.

### How to log users out

The deprecation does not require any changes for [logout](/logout), but if a custom domain has been configured and is used when invoking authentication, the /logout endpoint should be invoked using the custom domain as well.

## Troubleshooting

### How to tell if you have deprecated usage

Please take a look at the [Deprecation Error Reference](/errors/deprecation-errors) to assist with verifying that your application does, or does not, use deprecated features.

### How to test whether you are ready before the removal of service date

Auth0 has provided a toggle in the tenant settings in the [Dashboard](${manage_url}) to allow customers to turn off the legacy endpoints manually for their tenant ahead of the deprecation deadline of July 16, 2018. Navigate to the tenant settings screen, **Advanced** tab and scroll down to the block of migration toggles.

![Allowed Web Origins](/media/articles/libraries/lock/legacy-lock-api-off.png)

Turn off the **Legacy Lock API** toggle to stop your tenant from being able to use those endpoints. This toggle allows you to test the removal of the deprecated endpoints with the ability to turn them back on if you encounter issues.

::: note
Tenants created after Dec 27, 2017 were not allowed to begin usage of these deprecated features, and therefore do not have the Legacy Lock API toggle.
:::

### Bookmarking the login page

Bookmarking the Universal Login page is not supported. If a user bookmarks the login page and attempts to initiate authentication by going directly to the bookmarked URL instead of starting from the application, the following error message will be shown: `Password login is disabled for clients using externally hosted login pages with oidc_conformant flag set`.

### Fingerprinting error

For any customers who have not quite finished migrating away from the above deprecated features, Auth0 has [implemented a temporary solution](/cross-origin-authentication/fingerprinting) to help mitigate the severity of the issues with the deprecated endpoints. This solution relies on "fingerprinting" checks on the successive calls in an authentication transaction.  

If any authentication requests are being rejected by the fingerprinting solution, they can be identified with the following query against logs:

Description: "Unable to verify transaction consistency"

Customers who have any transactions rejected by the fingerprinting checks should complete their upgrades to resolve the issue.
