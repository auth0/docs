---
description: This article covers the Legacy Lock API deprecation and gives direction as to migration paths and changes required.
toc: true
contentType:
  - concept
  - how-to
useCase:
  - add-login
  - migrate
---
# Migration Guide: Legacy Lock API Deprecation

All applications _must_ stop using the deprecated endpoints / library versions, as they have been removed from service as of August 6, 2018. Applications using those endpoints will no longer function correctly. There are two options for migration:

* Migrate to Universal Login
* Continue to use embedded login and migrate

## Migrate to Universal Login

Universal Login is **strongly** recommended for most use cases because it [offers many advantages](/guides/login/universal-vs-embedded) over the embedded form of login screen. These advantages include:

* Developed, hosted and maintained by Auth0 (less maintenance required by your team).
* Provides a single place to make changes.
* More secure because credentials are collected and verified within the same domain. This reduces exposure of static credentials to multiple applications as well as the possibility of CSRF and man-in-the-middle attacks.
* Provides reliable <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> functionality without relying on third-party cookies or restricting the domain of applications.
* Fully customizable in terms of colors, text, logos, buttons as well as [custom domain](/custom-domains).
* Provides proper cache control to avoid browsers caching old versions.
* Can leverage either the [Lock Widget](/libraries/lock) or [Auth0.js SDK](/libraries/auth0js) for flexibility in appearance and function.
* Works with any type of Auth0 connection as well as <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn>.

### Universal Login migration guides

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="/guides/login/migrating-lock-v10-webapp"> Migrate Web Apps with Embedded Lock to Universal Login</a>
    <p>
      This document provides instruction for web apps which have embedded login (via the Lock widget) to migrate to Universal Login.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/guides/login/migrating-lock-v10-spa"> Migrate Single-Page Apps with Embedded Lock to Universal Login</a>
    <p>
      This document provides instruction for single-page apps which have embedded login (via the Lock widget) to migrate to Universal Login.
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/guides/login/migration-embedded-universal"> Migrate Apps with Embedded Login to Universal Login</a>
    <p>
      This document provides instruction for apps which have embedded login to migrate to Universal Login.
    </p>
  </li>
</ul>

## Continue to use embedded login and migrate

Embedded login (embedding Lock or a custom authentication UI) should be used only if the Universal Login Page **cannot** be used. If you intend to continue using embedded login, you **must** upgrade applications from deprecated library versions.

### Embedded login migration guides

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

Continued use of embedded login will require the use of [custom domains](/custom-domains) in order to prevent cross-origin authentication issues. The custom domains documentation includes important information on the use of custom domains, how to set them up, and what configuration is required for more intricate use cases, such as custom domains with <dfn data-key="security-assertion-markup-language">SAML</dfn>.

## Other considerations

A few specific items are changing with the new versions / endpoints. If you use any of the following features, you might want to take a look at the corresponding section below.

### Get user information

Once a user has been authenticated, an application may wish to retrieve information about a user. The recommended way to do this now is via the [/userinfo](/api/authentication#get-user-info) endpoint. If you are using Auth0.js v8 or v9 and using the [userInfo()](/libraries/auth0js/v9#extract-the-authresult-and-get-user-info) method, you already have made this change.

For customers who are using the [/tokeninfo](/api/authentication#get-token-info) endpoint, this endpoint is being replaced with the /userinfo endpoint. Customers should migrate to use the /userinfo endpoint instead of /tokeninfo. The /userinfo endpoint is the only one that will be maintained going forward and is the only endpoint for user information that is supported with the [custom domains](/custom-domains) feature.

As explained in the /userinfo endpoint docs entry, /userinfo obtains information using the Management API and therefore requires an <dfn data-key="access-token">Access Token</dfn> (obtained during login) instead of the [ID Token](/tokens/concepts/id-tokens) used by /tokeninfo.

Note also that the [/userinfo response](/api-auth/tutorials/adoption/scope-custom-claims) may vary based on <dfn data-key="scope">scopes</dfn> requested and the value of the [OIDC Conformant](/api-auth/tutorials/adoption/oidc-conformant) setting in the [Dashboard](${manage_url}) under **Applications > (Your Application) > Settings > Advanced Settings**. In that case, application code might need adjusted to handle the slightly altered response format.

### Check for existing session

#### Single-Page Applications

If a user navigates to a new page in a Single-Page Application, your application may wish to check if a user already has an existing session. In order to do this, you may have directly called the /ssodata endpoint or utilized the `getSSOData()` function in Auth0.js v8 or prior. The /ssodata endpoint is deprecated and was removed from service on **August 6, 2018**. The `getSSOData()` function will continue to work, but will behave differently, and in most cases, can be replaced with use of `checkSession()`.

::: note
The `getSSOData()` and `checkSession()` functions should only be used from a Single-Page Application
:::

##### checkSession()

* The Auth0.js `checkSession()` function can be used to check whether or not a user has an existing session in Auth0.
* Invoking the `checkSession()` function will trigger an /authorize call, which will in turn result in the execution of [rules](/rules).
* The new `checkSession()` function is more lightweight and should be used as a replacement for `getSSOData()` unless `getSSOData()` features are needed.

##### getSSOData()

* The Auth0.js v9 `getSSOData()` function will continue to work, but it now [behaves differently than in the past](/libraries/auth0js/v9/migration-v8-v9#review-calls-to-getssodata-).
* In Auth0.js v9, `getSSOData()` will check if a user has an existing session and perform a further check to determine if the user is the same one as in the last interactive authentication transaction. This supports Lock’s feature of showing the last logged-in user to facilitate subsequent logins.
* Invoking the `getSSOData()` function will now trigger a call to the [/authorize](/api/authentication#authorize-application) endpoint, which will in turn result in the execution of [rules](/rules).

##### Polling for an existing session

<%= include('../../_includes/_checksession_polling') %>

This was previously done with `getSSOData()`. The `getSSOData()` function performs more work behind the scenes than is needed for this purpose and applications that are not switched to `checkSession()` will suffer a needless performance penalty.

#### Web applications

In "web applications", the backend typically has a session for the user. Over time, the application session may expire, in which case the application should renew the session. The application backend should invoke a call to the [/authorize](/api/authentication#authorize-application) endpoint to get a new token. If the Authorization Server (Auth0 in this case) still has a session for the user, the user will not have to re-enter their credentials to log in again. If Auth0 no longer has a session for the user, the user has to log in again.

Customers with web applications which call the API from their backend should use this approach. Specifically, they should [call /oauth/token](/tokens/guides/use-refresh-tokens) to renew their token.

### Log users out

The deprecation does not require any changes for [logout](/logout), but if a custom domain has been configured and is used when invoking authentication, the /logout endpoint should be invoked using the custom domain as well.

### Using Lock with AD/LDAP and Kerberos

If your application is using Lock in embedded mode with the goal of detecting IP ranges with AD/LDAP + Kerberos, this will no longer work.

The solution for the Kerberos case is to [migrate to Universal Login](#1-migrate-to-universal-login). Lock will no longer attempt to detect an IP range by itself when embedded in an application. However, when using Universal Login with Lock inside your hosted login page, it will use the /user/ssodata endpoint (which still works from within the login page), and that endpoint will still return “true” when the user is in the Kerberos IP range. That means that using Universal Login you can:

* Use `getSSOData()` to achieve an automatic login
* Use Lock and get the **Use Windows Authentication** button (log in with Kerberos).

## Troubleshooting

See [Check Deprecation Errors](/troubleshoot/guides/check-deprecation-errors) for more information on deprecation-related errors.
