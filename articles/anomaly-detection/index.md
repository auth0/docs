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

Auth0 can detect anomalies and stop malicious attempts to access your application. Anomaly detection also allows you to implement controls to mitigate the impact of suspicious traffic, such as blocking attempts, displaying CAPTCHA, or triggering Multi Factor Authentication. 

You can also set email notification preferences and decide whether to block a suspicious IP address or not. 

- Your users will be notified by email once per hour regardless of the number of logins. For example, if a user tries to log in 200 times in 1 hour and 30 minutes, we will send 2 emails. Password reset links are valid for 5 days.

- In the event of an ongoing attack, traffic can be blocked from thousands of IP addresses at a time.  Auth0 will send a single email to each administrator every hour that traffic is blocked, regardless of the number of IPs involved in the attack. 

Auth0 has the following options that you can use to mitigate attacks: 

* [**Automated Attack Protection**](/anomaly-detection/concepts/credential-stuffing) prevents credential stuffing attacks by detecting when a request is likely coming from a bot or script and presents a CAPTCHA challenge at login. 
* [**Brute-force Protection**](/anomaly-detection/concepts/brute-force-protection) blocks traffic from an IP address if Auth0 sees an abnormal number of login errors using multiple accounts within 24 hours. 
* [**Breached Password Detection**](/anomaly-detection/concepts/breached-passwords) detects that a username/password combination is in a list of external breached credentials.
* [**Multi-factor Authentication**](/mfa) can be effective in preventing unauthorized logins, but it adds friction to the user experience. During sign in, MFA presents an extra challenge to make sure the person logging in is the owner of the account.     

::: note
You can [create reports using tenant traffic data to see anomaly detection events](/anomaly-detection/guides/view-anomaly-detection-events).
:::

## Keep reading

* [Set Anomaly Detection Preferences](/anomaly-detection/guides/set-anomaly-detection-preferences)
* [Brute Force Protection](/anomaly-detection/concepts/brute-force-protection)
* [Breached Password Detection](/anomaly-detection/concepts/breached-passwords)
* [Credential Stuffing Attack Protection](/anomaly-detection/concepts/credential-stuffing)
* [Attack Protection Triggers and Actions](/anomaly-detection/references/attack-protection-triggers-actions)