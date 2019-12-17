---
url: /users
title: Manage Users
description: Learn about working with users, user profiles, and user metadata in Auth0.
classes: topic-page
topics:
  - users
  - user-management
contentType:
  - index
useCase:
  - manage-users
v2: true
---
# Manage Users

Auth0's hosted cloud database stores a variety of information on your users that is accessible to you. This information is available to you via a *user profile*, and your users are grouped by tenant. The user information itself can come from a variety of sources, including identity providers, your own databases, and enterprise connections (Active Directory, <dfn data-key="security-assertion-markup-language">SAML</dfn>).

<%= include('../_includes/_topic-links', { links: [
  'users/concepts/overview-user-profile',
  'users/concepts/overview-user-metadata',
  'sessions',
  'users/guides/manage-users-using-the-dashboard',
  'users/guides/manage-users-using-the-management-api',
  'extensions/account-link',
  'security/blacklisting-attributes',
  'users/concepts/overview-user-migration',
  'users/search/v3'
] }) %>