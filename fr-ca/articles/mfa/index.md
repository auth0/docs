---
title: Multi-factor Authentication
description: Understand how MFA works in Auth0.
classes: topic-page
topics:
    - mfa
contentType:
  - index
useCase:
  - customize-mfa
---
# Multi-factor Authentication

Multi-factor Authentication (MFA) provides a method to verify a user's identity by requiring them to provide more than one piece of identifying information. This ensures that only valid users can access their accounts even if they use a username and password that may have been compromised from a different application. 

To enable MFA, go to [Dashboard > Multifactor Auth](${manage_url}/#/guardian) and toggle on the factors you want to enable on your tenant, such as push notifications or SMS. Next, perform any further setup required to configure that factor, then choose whether you wish to force MFA for all users or not. You can also customize your MFA flow with Auth0 [Rules](/rules/references/use-cases#multi-factor-authentication) to allow MFA to only be required in specific circumstances or force a particular factor to be used.

See the following sections for more details:

<%= include('../_includes/_topic-links', { links: [
  'mfa/concepts/mfa-factors',
  'mfa/guides/enable-mfa',
  'mfa/concepts/guardian',
  'mfa/guides/customize-mfa-universal-login',
  'mfa/guides/reset-user-mfa',
  'mfa/guides/import-user-mfa',
  'mfa/concepts/mfa-developer-resources',
  'mfa/concepts/step-up-authentication',
  'mfa/references/troubleshoot-mfa'
] }) %>

