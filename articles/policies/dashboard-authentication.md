---
description: Describes the Dashboard Authentication Policy wich governs requests for special authentication mechanisms for the Auth0 dashboard.
---

# Dashboard Authentication Policy

The following policy governs requests for special authentication mechanisms for the Auth0 dashboard.

## Multi-Factor Authentication

Any customer on a paid subscription plan can request that Multi-factor authentication, via Duo or Google apps, be implemented for dashboard access to their account.

* Requests for multi-factor authentication must be made via the [Auth0 Support Center](https://support.auth0.com).
* Requests must be made at least 5 business days in advance of the desired implementation date.

* Requests must include
  * The name of the Auth0 account for which MFA will be implemented
  * The preferred mechanism - Duo or Google Apps authentication
  * Google Authenticator: Label to appear on Google Authenticator app
  * Duo: ikey, skey and host

## Other forms of authentication
At this time, other forms of authentication for dashboard authentication are not supported.

## Effectivity
This policy is effective April 4, 2016

This policy may be revised when we are able to make configuration and troubleshooting visibility available on a self-service basis for other forms of authentication.

Any accounts with special dashboard authentication implemented before the effective date of this policy shall be grandfathered and allowed to continue.
