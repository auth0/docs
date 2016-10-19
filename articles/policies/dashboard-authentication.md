---
description: Describes the Dashboard Authentication Policy which governs requests for special authentication mechanisms for the Auth0 dashboard.
---

# Dashboard Authentication Policy

The following policy governs requests for special authentication mechanisms for the Auth0 dashboard.

## Multifactor Authentication

Any customer can enable multifactor authentication to be implemented for dashboard access to their account. 

To enable multifactor authentication go to your [Account Settings page](${manage_url}/#/account) and scroll down to the **Multifactor** section. Click the **Enroll Your Device Now** link to get started. The process to setting up each form of authentication is the same as using MFA with a client, [click here for more information on each type of authentication.](multifactor-authentication) 

### Unenrolling a Device from Multifactor

To stop using multifactor authentication to login to your dashboard, go to your [Account Setting page](${manage_url}/#/account) and scroll down to the **Multifactor** section and click the **REMOVE** button next to the enrolled device. To verify this request you will need to login once more with multifactor authentication.

If you have lost your device after enrolling in MFA or are having trouble logging in after enabling MFA,[click here for troubleshooting tips.](/multifactor-authentication/guardian/user-guide#troubleshooting)

## Other forms of authentication
At this time, other forms of authentication for dashboard authentication are not supported.

## Effectivity
This policy is effective April 4, 2016

This policy may be revised when we are able to make configuration and troubleshooting visibility available on a self-service basis for other forms of authentication.

Any accounts with special dashboard authentication implemented before the effective date of this policy shall be grandfathered and allowed to continue.
