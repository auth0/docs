---
description: Describes the Dashboard Authentication Policy which governs requests for special authentication mechanisms for the Auth0 dashboard.
crews: crew-2
topics:
    - auth0-policies
    - dashboard
contentType:
  - reference
useCase:
  - support
---

# Dashboard Authentication Policy

The following policy governs requests for special authentication mechanisms for the Auth0 dashboard.

## Multi-factor Authentication

You can enable multi-factor authentication for logging in to the dashboard with your account.

To enable multi-factor authentication for your account: 

1. Go to your [Account Profile page](${manage_url}/#/profile)
2. Scroll down to the **Multi-factor** section.
3. Click the **Enroll Your Device Now** link to get started.

The process for setting up each form of authentication is the same as using MFA with an application, [click here for more information on each type of authentication.](/multifactor-authentication)

### Unenrolling a Device from Multi-factor

To stop using multi-factor authentication to log in to your dashboard:

1. Go to your [Account Profile page](${manage_url}/#/profile)
2. Scroll down to the **Multi-factor** section and click the **REMOVE** button next to the enrolled device.
3. To verify this request you will need to login once more with multi-factor authentication.

## Other forms of authentication

At this time, other forms of authentication for dashboard authentication are not supported.

## Effectivity

This policy is effective April 4, 2016

This policy may be revised when we are able to make configuration and troubleshooting visibility available on a self-service basis for other forms of authentication.

Any accounts with special dashboard authentication implemented before the effective date of this policy shall be grandfathered and allowed to continue.
