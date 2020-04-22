---
title: Anomaly Detection
description: Understand how Auth0 detects anomalies to stop malicious attempts to access your application, alert you and your users of suspicious activity, and block further login attempts. 
topics:
    - security
    - anomaly-detection
    - brute-force-protection
    - breached-password-detection
contentType: concept
useCase: customize-anomaly-detection
---
# Anomaly Detection

Auth0 can detect anomalies and stop malicious attempts to access your application. Anomaly detection can alert you and your users of suspicious activity, as well as block further login attempts. You can [set preferences](/anomaly-detection/guides/set-anomaly-detection-preferences) for notifications and decide whether to block a suspicious IP address or not. 

[Multi-factor authentication](/mfa) can be effective in preventing unauthorized logins, but it adds friction to the user experience. 
However, it is our goal to provide a standard level of protection against credential stuffing attacks that does not require that the customer introduce any friction to its legitimate users or turn on additional features.    

Auth0 has two types of **shields** to handle anomalies and attacks.  

* [Brute-force protection](#brute-force-protection) blocks login attempts after a number of consecutive failed logins.
* [Breached password detection](#breached-password-detection) identifies credentials that are known to be stolen.

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

### Credential stuffing attacks

Credential stuffing (or *list validation*) attacks are a type of brute-force attack which attempts to compromise a large number of user accounts with stolen credentials. At Auth0, credential stuffing attacks account for, on average, nearly half of all login attempts using our platform. Credential stuffing protection is [enabled by default](/anomaly-detection/guides/enable-disable-credential-stuffing) for all connections. 

To detect this type of attack, Auth0 uses a large amount of data to identify patterns that signal that a credential stuffing attack is taking place. Using sophisticated algorithms, Auth0 can identify when bursts of traffic are likely to be from a bot or script, and performs the following:

- Provides a score that measures the likelihood of an individual operation coming from an IP associated with credential stuffing attacks. Use this score to trigger rules or custom logic in the Auth0 platform. 
- Shows a CAPTCHA (Completely Automated Public Turing Test To Tell Computers and Humans Apart) step during the sign in or sign up flows.  This CAPTCHA step helps prevent bad actors from continuing to send credential stuffing attack traffic to your tenant.

Auth0 automatically analyzes anonymized login data to detect when a customer is likely to be experiencing a credential stuffing attack.  When such an attack is detected, it throws a CAPTCHA step in the login experience to eliminate bot and scripted traffic.

Download this free [whitepaper](https://auth0.com/resources/whitepapers/credential-stuffing-attacks) to learn how Auth0 can help you combat credential stuffing attacks.

## Breached password detection

Every day, malicious hackers penetrate websites and applications, exposing thousands of email and passwords. Because it's common for users to use the same password to login to multiples sites, this poses a problem, not only for the hacked system, but to any application that shares those [breached passwords](/anomaly-detection/concepts/breached-passwords).

Auth0 tracks large security breaches that are happening on major third party sites to help keep your users and system secure. By [enabling breached password detection](/anomaly-detection/guides/set-anomaly-detection-preferences), when a [trigger](/anomaly-detection/references/breached-password-detection-triggers-actions) occurs, your users can be notified and/or blocked from logging in if we suspect their credentials were part of a published security breach. You can [customize blocked account emails](/anomaly-detection/guides/customize-blocked-account-emails).

You can configure the **URL Lifetime** and **Redirect To** values in the Dashboard by going to [Emails > Templates > Change Password Template](${manage_url}/#/emails).

::: note
Breached password detection works when logging in using the Resource Owner Password Grant (ROPG) and when using custom databases with your tenants.
:::

## Results of anomaly detection

Your users will be notified by email once per hour regardless of the number of logins. For example, if a user tries to log in 200 times in 1 hour and 30 minutes, we will send 2 emails. Password reset links are valid for 5 days.

In the event of an ongoing attack, traffic can be blocked from thousands of IP addresses at a time.  Auth0 will send a single email to each administrator every hour that traffic is blocked, regardless of the number of IPs involved in the attack.

::: panel Test Notification Emails
You can set up a test for anomaly detection using **leak-test@example.com** as the email and **Paaf213XXYYZZ** as the password. 
:::
