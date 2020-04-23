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

Auth0 has three types of *shields* to handle anomaly detection and attack protection.  

* Automated attack protection prevents [credential stuffing attacks](/anomaly-detection/concepts/credential-stuffing) by triggering CAPTCHA at login. 
* [Brute-force protection](/anomaly-detection/concepts/brute-force-protection) blocks login attempts after a number of consecutive failed logins.
* [Breached password detection](/anomaly-detection/concepts/breached-passwords) identifies credentials that are known to be stolen.

Customize the type of shield to use in the **Anomaly Detection** section on the [Dashboard](${manage_url}/#/anomaly). A shield specifies the action you wish to take given a specific trigger. A trigger is a suspicious event that is detected when someone is trying to login to your system, or there may have been a breached password with another third party service.

::: note
Auth0 recommends that you [create reports using tenant traffic data to see anomaly detection events](/anomaly-detection/guides/view-anomaly-detection-events).
:::

Your users will be notified by email once per hour regardless of the number of logins. For example, if a user tries to log in 200 times in 1 hour and 30 minutes, we will send 2 emails. Password reset links are valid for 5 days.

In the event of an ongoing attack, traffic can be blocked from thousands of IP addresses at a time.  Auth0 will send a single email to each administrator every hour that traffic is blocked, regardless of the number of IPs involved in the attack. 

## Keep reading

* [Set Anomaly Detection Preferences](/anomaly-detection/guides/set-anomaly-detection-preferences)
* [Brute Force Protection](/anomaly-detection/concepts/brute-force-protection)
* [Breached Password Detection](/anomaly-detection/concepts/breached-passwords)
* [Credential Stuffing Attack Protection](/anomaly-detection/concepts/credential-stuffing)
* [Attack Protection Triggers and Actions](/anomaly-detection/references/attack-protection-triggers-actions)