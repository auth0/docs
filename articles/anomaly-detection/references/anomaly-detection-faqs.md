---
title: Anomaly Detection Frequently Asked Questions
description: Frequently asked questions about anomaly detection.
topics:
    - security
    - anomaly-detection
    - brute-force-protection
    - breached-password-detection
contentType: reference
useCase: customize-anomaly-detection
v2: true
---
# Anomaly Detection Frequently Asked Questions

* **Is the user notified at every login?**
We send one email every hour, regardless of the number of logins. For example, if a user tries to log in 200 times in 1 hour and 30 minutes, we will send 2 emails.

* **Is there a limit to the number of times a user will be notified?**
Users will only be notified once per hour.

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

## Keep reading

* Understand [how Auth0 detects anomalies](/anomaly-detection).
* Understand why a user receives a [breached password email](/anomaly-detection/concepts/breached-passwords) and general web security tips.
* [Restrictions and limitations](/anomaly-detection/references/anomaly-detection-restrictions-limitations) of Auth0 anomaly detection.