---
description: Describes the Dashboard Authentication Policy which governs requests for special authentication mechanisms for the Auth0 dashboard.
crews: crew-2
tags:
    - auth0-policies
    - dashboard
---

# Dashboard Authentication Policy

The following policy governs requests for special authentication mechanisms for the Auth0 dashboard.

## Multifactor Authentication

You can enable multifactor authentication for logging in to the dashboard with your account.

To enable multifactor authentication for your account: 

1. Go to your [Account Profile page](${manage_url}/#/profile)
2. Scroll down to the **Multifactor** section.
3. Click the **Enroll Your Device Now** link to get started.

The process for setting up each form of authentication is the same as using MFA with an application, [click here for more information on each type of authentication.](/multifactor-authentication)

### Unenrolling a Device from Multifactor

To stop using multifactor authentication to log in to your dashboard:

1. Go to your [Account Profile page](${manage_url}/#/profile)
2. Scroll down to the **Multifactor** section and click the **REMOVE** button next to the enrolled device.
3. To verify this request you will need to login once more with multifactor authentication.

If you have lost your device after enrolling in MFA or are having trouble logging in after enabling MFA, [click here for troubleshooting tips.](/multifactor-authentication/guardian/user-guide#troubleshooting)

## Other forms of authentication

At this time, other forms of authentication for dashboard authentication are not supported.

## Effectivity

This policy is effective April 4, 2016

This policy may be revised when we are able to make configuration and troubleshooting visibility available on a self-service basis for other forms of authentication.

Any accounts with special dashboard authentication implemented before the effective date of this policy shall be grandfathered and allowed to continue.
