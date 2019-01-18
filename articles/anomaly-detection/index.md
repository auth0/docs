---
title: Anomaly Detection
description: Understand how Auth0 detects anomalies.
topics:
    - security
    - anomaly-detection
    - brute-force-protection
    - breached-password-detection
contentType: concept
useCase: customize-anomaly-detection
v2: true
---
# Anomaly Detection

Auth0 can detect anomalies and stop malicious attempts to access your application. Anomaly detection can alert you and your users of suspicious activity, as well as block further login attempts. You can [set preferences](/anomaly-detection/guides/set-anomaly-detection-preferences) for notifications and decide whether to block a suspicious IP address or not. 

Auth0 has two types of **shields** to handle anomalies and attacks.  

* [Brute-force protection](#brute-force-protection)
* [Breached password detection](#breached-password-detection)

A **shield** specifies the **action** you wish to take given a specific **trigger**. A **trigger** is a suspicious event that is detected when someone is trying to login to your system, or there may have been a breached password with another third party service.

Customize the actions in the **Anomaly Detection** section on the [Dashboard](${manage_url}/#/anomaly).

## Brute-force protection

Brute-force protection is [enabled by default](/anomaly-detection/guides/enable-disable-brute-force-protection) for all connections. There are two different [triggers](/anomaly-detection/references/brute-force-protection-triggers-actions) for the brute-force protection shield, for two slightly different attack scenarios.

* 10 consecutive failed login attempts for the same user and from the same IP address
* 100 failed login attempts from the same IP address in 24 hours *or* 50 sign up attempts per minute from the same IP address

For example, if a user with *user_id1* signs in from *IP1* and fails to login consecutively for 10 attempts, their log in attempt from this *IP1* will be blocked. Another user, *user_id2*, signing in from *IP1* will not be blocked. 

## Breached password detection

Every day, malicious hackers penetrate websites and applications, exposing thousands of email and passwords. Because it's common for users to use the same password to login to multiples sites, this poses a problem, not only for the hacked system, but to any application that shares those [breached passwords](/anomaly-detection/concepts/breached-passwords).

Auth0 tracks large security breaches that are happening on major third party sites to help keep your users and system secure. By [enabling breached password detection](/anomaly-detection/guides/set-anomaly-detection-preferences), when a [trigger](/anomaly-detection/references/breached-password-detection-triggers-actions) occurs, your users can be notified and/or blocked from logging in if we suspect their credentials were part of a published security breach. You can [customize blocked account emails](/anomaly-detection/guides/customize-blocked-account-emails).

## Keep reading

* [Restrictions and limitations](/anomaly-detection/references/anomaly-detection-restrictions-limitations) of Auth0 anomaly detection.
* [Frequently asked questions](/anomaly-detection/references/anomaly-detection-faqs) about anomaly detection.