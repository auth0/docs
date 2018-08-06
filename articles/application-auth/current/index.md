---
classes: topic-page
title: Application Authentication
description: Introduction to the various application authentication flows.
topics:
  - authentication
  - oauth2
contentType: index
useCase:
  - add-login
---

# Application Authentication

Auth0 uses [OpenID Connect](/protocols/oidc) and [OAuth 2.0](/protocols/oauth2) to authenticate users and get their authorization to access protected resources. 

We support scenarios for mobile, desktop, server-side, or client-side applications.

You can get more details on implementing these flows by following one of the following links:

<%= include('../../_includes/_topic-links', { links: [
  'application-auth/current/mobile-desktop',
  'application-auth/current/server-side-web',
  'application-auth/current/client-side-web'
] }) %>
