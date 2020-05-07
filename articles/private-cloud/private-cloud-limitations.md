---
section: private-cloud
description: Private Cloud Limitations
topics:
    - private-cloud
    - managed-private-cloud
contentType: concept
useCase: private-cloud
---
# Private Cloud Limitations

## Regional availability

Auth0 Private Cloud is fully deployable in the following regions:

* USA
* Europe
* Austrailia
* Japan
* Canada (with some limitations on high-availability)

## Default Guardian MFA application not readily available

Auth0's public Guardian MFA app (the app you'd download from your MobileOS's AppStore) is not compatible with dedicated instances because it's always pointing to cloud shared endpoints. You can still leverage Auth0 Guardian via the Guardian SDK. Using the Guardian SDK, you can build your own MFA app that calls the Guardian API and can provide push notifications via Guardian. You can still leverage third-party MFA solutions via Auth0 such as Duo or Google Authenticator while deployed within Private Cloud, this simply would not leverage Auth0 Guardian.

## Breached password detection lowers RPS

When Breached Password Detection is enabled it lowers the RPS of a standard deployment from 500 RPS to 300 RPS and a high capacity deployment from 1500 RPS to 1200 RPS.

## User Import and Export

User import with hashed password is available upon request as of Q2 2020; some options for exporting are less feature-rich than what’s provided on the Public Cloud.
