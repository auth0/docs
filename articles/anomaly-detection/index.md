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

Auth0 can detect anomalies and stop malicious attempts to access your application such as blocking traffic from certain IPs, displaying CAPTCHA, or triggering multi-factor authentication. 

In the event of an attack, users will be notified by email once per hour regardless of the number of logins. For example, if a user tries to log in 200 times in 1 hour and 30 minutes, we will send 2 emails. Password reset links are valid for 5 days. You can [customize the emails](/anomaly-detection/guides/customize-blocked-account-emails) sent to your users.

In the event of an ongoing attack, traffic can be blocked from thousands of IP addresses at a time. Auth0 will send a single email to each administrator every hour that traffic is blocked, regardless of the number of IPs involved in the attack. 

Auth0 anomaly detection provides the following options to mitigate attacks: 

* [**Bot Protection**](/anomaly-detection/concepts/credential-stuffing) prevents credential stuffing attacks by detecting when a request is likely coming from a bot or script and presents a CAPTCHA challenge at login. 
* [**Brute-force Protection**](/anomaly-detection/concepts/brute-force-protection) blocks traffic from an IP address if Auth0 sees an abnormal number of login errors using multiple accounts within 24 hours. 
* [**Breached Password Detection**](/anomaly-detection/concepts/breached-passwords) detects that a username/password combination is in a list of external breached credentials.
* [**Multi-factor Authentication**](/mfa) can be effective in preventing unauthorized logins, but it adds friction to the user experience. During sign in, MFA presents an extra challenge to make sure the person logging in is the owner of the account.     

You can also [create reports using tenant traffic data to see anomaly detection events](/anomaly-detection/guides/view-anomaly-detection-events).

## Keep reading

* [Set Anomaly Detection Preferences](/anomaly-detection/guides/set-anomaly-detection-preferences)
* [View Anomaly Detection Events](/anomaly-detection/guides/view-anomaly-detection-events)
* [Customize Blocked Account Emails](/anomaly-detection/guides/customize-blocked-account-emails)
