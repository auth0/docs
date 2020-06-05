---
title: Brute-force Protection
description: Understand how Auth0 detects anomalies to stop malicious attempts to access your application, alert you and your users of suspicious activity, and block further login attempts. 
topics:
    - security
    - anomaly-detection
    - brute-force-protection
contentType: concept
useCase: anomaly-detection
---
# Brute-force Protection

Brute-force protection is enabled by default for all connections. There are two different triggers for the brute-force protection shield, for two different attack scenarios:

* 10 consecutive failed login attempts for the same user and from the same IP address
* 100 failed login attempts from the same IP address in 24 hours *or* 50 sign up attempts per minute from the same IP address

For example, if a user with *user_id1* signs in from *IP1* and fails to login consecutively for 10 attempts, their log in attempt from this *IP1* will be blocked. Another user, *user_id2*, signing in from *IP1* will not be blocked. 

## How it works

When brute-force protection is triggers, some or all of the following actions take can place:

* Send an email to the affected user.  (You can [customize the email](/anomaly-detection/guides/customize-blocked-account-emails).)
* Block the suspicious IP address for that user.
* Notify dashboard administrator(s).
* Block suspicious addresses for 15 minutes.

If blocks are triggered, they can be removed in the following ways:

* An administrator can remove the block.
* The user can click on the **unblock** link provided in the email sent when the block went into effect.
* The user can change their password.

## Restrictions and limitations

Both brute-force protection depends on the IP address of the user. Because of this, the following use cases are *not* supported:

* If you use the [Resource Owner](/api/authentication#resource-owner) from the backend of the application. Using this call does not get the IP address of the user. 

* If you use [Resource Owner Password Grant](/api-auth/grant/password) from the backend of the application. Using this call does not get the IP address of the user, however, you can [configure your application and send the IP address of the user as part of the request](/api-auth/tutorials/using-resource-owner-password-from-server-side) to make brute-force protection work correctly.

* If you authenticate a large number of users from the same IP address. For example, users that are behind a proxy are more likely to reach these limits and trigger the associated protection. It is possible to configure a whitelist for the proxy's IP and CIDR range and avoid erroneously triggering the protection.

## Keep reading

* [Set Anomaly Detection Preferences](/anomaly-detection/guides/set-anomaly-detection-preferences)
* [Automated Attack and Credential Stuffing Protection](/anomaly-detection/concepts/credential-stuffing)
* [Customize Blocked Account Emails](/anomaly-detection/guides/customize-blocked-account-emails)
* [View Anomaly Detection Events](/anomaly-detection/guides/view-anomaly-detection-events)
