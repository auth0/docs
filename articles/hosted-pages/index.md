---
description: Overview of hosted pages with Auth0, and how to use them
tags:
  - login
  - universal-login
  - password-reset
  - guardian
  - mfa
  - error-pages
  - hosted-pages
---

# Auth0 Hosted Pages

Auth0 offers you the ability to display customized pages containing Auth0-related functionality and to which Auth0 redirects your users during the authorization process. You can create the following types of hosted pages:

* [Login](/hosted-pages/login)
* [Password Reset](/hosted-pages/password-reset)
* [Guardian Multifactor](/hosted-pages/guardian)
* [Error pages](/hosted-pages/error-pages)

While Auth0 hosts your custom pages, you can still [manage your pages using the version control system of your choice](/hosted-pages/version-control).

## Why Use Hosted Pages

Hosted pages are easy to implement and secure. For example, using Auth0 hosted pages instead of hosting them externally provides seamless CSRF protection. This helps prevent third party impersonation or the hijacking of sessions.

## How to Enable and Customize Hosted Pages

To enable a particular type of hosted page, navigate to the [Hosted Pages section of the Auth0 Dashboard](${manage_url}/#/login_page) (note that Error Page settings are located under [Tenant Settings](${manage_url}/#/tenant)). Click on the slider to enable the page.

## Customize Your Hosted Page

In the Auth0 Dashboard, you'll see an HTML editor, as well as a **Preview** tab, for each of the hosted page types. You can either use the editor to create your HTML or paste in the HTML you've created elsewhere.

For detailed instructions on how to customize each type of hosted page, please see the following docs:

* [Login Page](/hosted-pages/login)
* [Password Reset Page](/hosted-pages/password-reset)
* [Guardian Multifactor Authentication Page](/hosted-pages/guardian)
* [Error Pages](/error-pages)
