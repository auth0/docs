---
title: Anomaly Detection
description: Understand how Auth0 detects anomalies to stop malicious attempts to access your application, alert you and your users of suspicious activity, and block further login attempts. 
toc: true 
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

::: note
Auth0 recommends that you [create reports using tenant traffic data to see anomaly detection events](/anomaly-detection/guides/use-tenant-data-for-anomaly-detection).
:::

## Brute-force protection

Brute-force protection is [enabled by default](/anomaly-detection/guides/enable-disable-brute-force-protection) for all connections. There are two different [triggers](/anomaly-detection/references/brute-force-protection-triggers-actions) for the brute-force protection shield, for two slightly different attack scenarios.

* 10 consecutive failed login attempts for the same user and from the same IP address
* 100 failed login attempts from the same IP address in 24 hours *or* 50 sign up attempts per minute from the same IP address

For example, if a user with *user_id1* signs in from *IP1* and fails to login consecutively for 10 attempts, their log in attempt from this *IP1* will be blocked. Another user, *user_id2*, signing in from *IP1* will not be blocked. 

## Breached password detection

Every day, malicious hackers penetrate websites and applications, exposing thousands of email and passwords. Because it's common for users to use the same password to login to multiples sites, this poses a problem, not only for the hacked system, but to any application that shares those [breached passwords](/anomaly-detection/concepts/breached-passwords).

Auth0 tracks large security breaches that are happening on major third party sites to help keep your users and system secure. By [enabling breached password detection](/anomaly-detection/guides/set-anomaly-detection-preferences), when a [trigger](/anomaly-detection/references/breached-password-detection-triggers-actions) occurs, your users can be notified and/or blocked from logging in if we suspect their credentials were part of a published security breach. You can [customize blocked account emails](/anomaly-detection/guides/customize-blocked-account-emails).

## Frequently asked questions

* **Is the user notified at every login?**
We send one email every hour, regardless of the number of logins. For example, if a user tries to log in 200 times in 1 hour and 30 minutes, we will send 2 emails.

* **Is there a limit to the number of times a user will be notified?**
Users will only be notified once per hour.

* **How often does Auth0 email administrators when traffic is blocked using Brute Force Protection for multiple accounts?**
In the event of an ongoing attack, traffic can be blocked from thousands of IP addresses at a time.  Auth0 will send a single email to each administrator every hour that traffic is blocked, regardless of the number of IPs involved in the attack.

* **For how long is the reset password link, included in the breached password email, valid?**
Password reset links are valid for 5 days.

* **Is there a test dataset of breached passwords?**
You can test with **leak-test@example.com** as the email and **Paaf213XXYYZZ** as the password. 

* **Does the breached password detection work when logging in using the Resource Owner password grant?**
Yes.

* **Does the breached password detection feature work with a custom database?**
Yes.

* **What Redirect URL applies to the *Change password* link included in the breached password notification email?**
The **RedirectTo** URL is the URL listed in the Dashboard in [Emails > Templates > Change Password Template](${manage_url}/#/emails).

* **Is there a way to configure the Redirect URL and the length of time that the change password link is valid?**
You can configure the **URL Lifetime** and **Redirect To** values in the Dashboard by going to [Emails > Templates > Change Password Template](${manage_url}/#/emails).