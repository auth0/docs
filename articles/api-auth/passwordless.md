---
title: Passwordless authentication (OIDC-conformant)
tags:
  - api-authentication
  - oidc
  - passwordless
---

# OIDC Conformant Passwordless Authentication

<%= include('./tutorials/adoption/_about.md') %>

## About Passwordless Authentication

Passwordless connections allow users to login without the need to remember a password.

This improves the user experience, especially on mobile applications, since users will only need to remember an email address or phone number to authenticate with your application.

Without passwords, your application will not need to implement a password-reset procedure, and users avoid the insecure practice of using the same password for many purposes.

## OIDC Conformant Passwordless

Auth0 currently supports [OIDC-conformant](/api-auth/tutorials/adoption) passwordless authentication using [Universal Login](/hosted-pages/login) as well as in embedded web authentication scenarios using the newest [Lock](/libraries/lock) or [Auth0.js](/libraries/auth0js) libraries.

Native applications need to use Universal Login (with Auth0-hosted login page). Customers can use the Lock (Passwordless) template in the [Dashboard](${manage_url}) under **Hosted Pages > Default Templates**, or customize it to fit specific requirements.
