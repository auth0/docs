---
title: Set Anomaly Detection Preferences
description: Learn how to set anomaly detection preferences in the Dashboard.
topics:
    - security
    - anomaly-detection
    - brute-force-protection
    - breached-password-detection
contentType: how-to
useCase: customize-anomaly-detection
v2: true
---
# Set Anomaly Detection Preferences

Customize the actions that occur after the triggers in the **Anomaly Detection** section on the [Dashboard](${manage_url}/#/anomaly).

::: warning
Auth0 recommends that you **do not** make changes to your anomaly detection features with the Management API.
:::

![Anomaly Detection Dashboard](/media/articles/anomaly-detection/anomaly-detection-overview.png)

## Brute-force protection preferences

Brute-force protection is enabled by default for all connections. For more information, see [Enable and Disable Brute-Force Protection](/anomaly-detection/guides/enable-disable-brute-force-protection).

::: warning
Auth0 strongly recommends that you **do not** set the `brute_force_protection` flag to `false` (effectively disabling brute-force protection for the connection), however if you do, you can change it back in the [Dashboard](${manage_url}/#/anomaly). 
::: 

Limit the amount of signups and failed logins from a suspicious IP address. For more information, see [Brute-Force Protection Triggers and Actions](/anomaly-detection/references/brute-force-protection-triggers-actions).

1. Click on the **Brute-force Protection** shield. 

![Brute-Force Protection Shield](/media/articles/anomaly-detection/brute-force-shield.png)

2. Use the toggles to enable or disable actions for single or multiple user accounts. 

3. Add any IP addresses to the **Whitelist** field to avoid erroneously triggering the protection action.

4. Click **Save** when you are finished.

## Breached password detection preferences

Set preferences for breached password detection actions. For more information, see [Breached Password Detection Triggers and Actions](/anomaly-detection/references/breached-password-detection-triggers-actions).

1. Click on the **Breached-password Detection** shield.

![Breached Password Detection Shield](/media/articles/anomaly-detection/breached-password-shield.png)

2. Use the toggles to enable or disable actions when login security breaches are detected. 

3. Determine how administrators are notified.

4. Click **Save** when you are finished.

## Keep reading

* Understand [how Auth0 detects anomalies](/anomaly-detection).
* Understand why a user receives a [breached password email](/anomaly-detection/concepts/breached-passwords) and general web security tips.
* [Restrictions and limitations](/anomaly-detection/references/anomaly-detection-restrictions-limitations) of Auth0 anomaly detection.
* [Frequently asked questions](/anomaly-detection/references/anomaly-detection-faqs) about anomaly detection.