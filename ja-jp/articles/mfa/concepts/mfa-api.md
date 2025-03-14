---
title: Multi-factor Authentication API
description: Overview of available multi-factor authentication APIs
topics:
  - mfa
  - mfa-api
contentType:
  - index
useCase:
  - customize-mfa
---
# Multi-factor Authentication API

Auth0 provides a built-in <dfn data-key="multifactor-authentication">Multi-factor Authentication (MFA)</dfn> enrollment and authentication flow using [Universal Login](/universal-login).

You will need to use the MFA API in the following scenarios:

- If you are [authenticating users with the Resource Owner Password Grant](/mfa/guides/mfa-api/authenticate).

- If you want to build an interface to let users [manage their authentication factors](/mfa/guides/mfa-api/manage).

<%= include('../_includes/_authenticator-before-start') %>

## Limitations

The MFA API is designed to work with SMS, Push via Guardian, Email, and OTP factors. It does not currently support enrolling with Duo or with the legacy 'google-authenticator' factor (Google Authenticator can still be enrolled using the OTP factor).

## Keep reading

* [Authenticate With Resource Owner Password Grant and MFA](/mfa/guides/mfa-api/authenticate)
* [Manage Authenticator Factors using the MFA API](/mfa/guides/mfa-api/manage)
