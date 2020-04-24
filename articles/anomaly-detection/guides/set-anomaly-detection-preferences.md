---
title: Set Anomaly Detection Preferences
description: Learn how to set anomaly detection preferences in the Dashboard for Automated Attack Protection, Brute-force Protection, and Breached Password Detection.
toc: true
topics:
    - security
    - anomaly-detection
    - brute-force-protection
    - breached-password-detection
    - automatic-attack-protection
contentType: how-to
useCase: anomaly-detection
---
# Set Anomaly Detection Preferences

Enable, disable, and customize **Anomaly Detection** settings in the [Dashboard](${manage_url}/#/anomaly).

::: warning
Auth0 recommends that you **do not** make changes to your anomaly detection features with the Management API.
:::

![Anomaly Detection Dashboard](/media/articles/anomaly-detection/anomaly-detection-overview.png)

## Automated Attack Protection 

Automated attack protection protects against [credential stuffing attacks](/anomaly-detection/concepts/credential-stuffing). It is [enabled by default](/anomaly-detection/guides/enable-disable-automated-attack-protection) for all connections. It provides a basic level of protection against certain attacks that does not add any friction to legitimate users. When such an attack is detected, it displays a CAPTCHA step in the login experience to eliminate bot and scripted traffic.

::: warning
Auth0 strongly recommends that you **do not** disable **Automated Attack Protection**, however if you do, you can enable it in the [Dashboard](${manage_url}/#/anomaly).
::: 

**Automated Attack Protection** works in the following ways depending on the Auth0 login option you choose:

| Flow | Limitation | 
| -- | -- |
| New Universal Login | Works automatically (if enabled which is the default). |
| Classic Universal Login (Lock) | Works with Lock v11.20 or higher. |
| Classic Universal Login (auth0.js) | Works automatically. |
| `/oauth/token` | Returns an error message "Suspicious request requires validation" when an error code `requires_validation` occurs. You may need to modify your app to accommodate this error case. |

::: note
This protection type does **not** work with Embedded Login. 
:::

## Brute-force Protection preferences

[Brute-force protection](/anomaly-detection/concepts/brute-force-protection) is enabled by default for all connections. Once enabled, you can customize the brute-force protection settings.

::: warning
Auth0 strongly recommends that you **do not** disable **Brute-force Protection**, however if you do, you can enable it in the [Dashboard](${manage_url}/#/anomaly).
::: 

You can limit the amount of signups and failed logins from a suspicious IP address. 

1. Click on the **Brute-force Protection** shield. 

![Brute-Force Protection Shield](/media/articles/anomaly-detection/brute-force-shield.png)

2. Use the toggles to enable or disable actions for single or multiple user accounts. 

3. Add any IP addresses to the **Whitelist** field to avoid erroneously triggering the protection action.

4. Click **Save**.

## Breached Password Detection preferences

Set preferences for [breached password](/anomaly-detection/concepts/breached-passwords) detection actions. 

1. Click on the **Breached-password Detection** shield.

![Breached Password Detection Shield](/media/articles/anomaly-detection/breached-password-shield.png)

2. Use the toggles to enable or disable actions when login security breaches are detected. 

3. Determine how administrators are notified.

4. Click **Save**.

## Keep reading

* [Attack Protection Triggers and Actions](/anomaly-detection/references/attack-protection-triggers-actions)
* [Customize Blocked Account Emails](/anomaly-detection/guides/customize-blocked-account-emails)
* [View Anomaly Detection Events](/anomaly-detection/guides/view-anomaly-detection-events)