---
classes: topic-page
title: Application Authentication
description: Introduction to authentication and the various application authentication flows.
topics:
  - authentication
  - oauth2
contentType: index
useCase:
  - add-login
---

# Authentication

Authentication refers to the process of confirming identity. While often used interchangeably with [authorization](/authorization), authentication represents a fundamentally different function. 

In authentication, a user or application proves they are who they say they are by providing valid credentials for verification. Authentication is often proved through a username and password, sometimes combined with other elements called _factors_, which fall into three categories: what you know, what you have, or what you are.

* **Single-Factor Authentication** relies on a password. Example: a school website that only requires validating a password against a username. 
* **Two-Factor Authentication** relies on a piece of confidential information in addition to a username and password. Example: a banking website that validates a password against a username and then requires the user to enter a PIN known to only the user.
* **Multi-Factor Authentication (MFA)** uses two or more security factors from independent categories. Example: a hospital system that requires a username and password, a security code received on the user's smartphone, and fingerprint.

For a comparison of authentication and authorization, see [Authentication vs. Authorization](/authorization/concepts/authz-and-authn).

# Application Authentication Flows

Auth0 uses [OpenID Connect](/protocols/oidc) and [OAuth 2.0](/protocols/oauth2) to authenticate users and verify their identity. 

We support scenarios for mobile, desktop, server-side, or client-side applications. You can get more details on implementing these flows by exploring:

<%= include('../../_includes/_topic-links', { links: [
  'flows/guides/auth-code-pkce/add-login-auth-code-pkce',
  'flows/guides/implicit/add-login-implicit',
  'flows/guides/auth-code/add-login-auth-code'
] }) %>
