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

Brute-force protection is [enabled by default](/anomaly-detection/guides/enable-disable-brute-force-protection) for all connections. There are two different [triggers](/anomaly-detection/references/attack-protection-triggers-actions) for the brute-force protection shield, for two slightly different attack scenarios.

* 10 consecutive failed login attempts for the same user and from the same IP address
* 100 failed login attempts from the same IP address in 24 hours *or* 50 sign up attempts per minute from the same IP address

For example, if a user with *user_id1* signs in from *IP1* and fails to login consecutively for 10 attempts, their log in attempt from this *IP1* will be blocked. Another user, *user_id2*, signing in from *IP1* will not be blocked. 

## Keep reading

* [Enable and Disable Brute-Force Protection](/anomaly-detection/guides/enable-disable-brute-force-protection)
* [Credential Stuffing Attack Protection](/anomaly-detection/concepts/credential-stuffing)
* [Attack Protection Triggers and Actions](/anomaly-detection/references/attack-protection-triggers-actions)
* [Customize Blocked Account Emails](/anomaly-detection/guides/customize-blocked-account-emails)
* [View Anomaly Detection Events](/anomaly-detection/guides/view-anomaly-detection-events)
