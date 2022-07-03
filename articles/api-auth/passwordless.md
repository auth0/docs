---
title: Passwordless authentication (OIDC-conformant)
topics:
  - api-authentication
  - oidc
  - passwordless
contentType: concept
useCase:
  - secure-api
  - call-api
---

# OIDC Conformant Passwordless Authentication

<%= include('./tutorials/adoption/_about.md') %>

<dfn data-key="passwordless">Passwordless</dfn> connections allow users to login without the need to remember a password.

This improves the user experience, especially on mobile applications, since users will only need to remember an email address or phone number to authenticate with your application.

Without passwords, your application will not need to implement a password-reset procedure, and users avoid the insecure practice of using the same password for many purposes.

## OIDC Conformant Passwordless

Auth0 currently supports [OIDC-conformant](/api-auth/tutorials/adoption) passwordless authentication using <dfn data-key="universal-login">Universal Login</dfn> as well as in embedded web authentication scenarios using the newest [Lock](/libraries/lock) or [Auth0.js](/libraries/auth0js) libraries.

Native applications need to use Universal Login. Customers can use the <dfn data-key="lock">Lock</dfn> (Passwordless) template for the login page in the [Dashboard](${manage_url}) under **Universal Login > Login > Default Templates**, or customize the page to fit specific requirements.
