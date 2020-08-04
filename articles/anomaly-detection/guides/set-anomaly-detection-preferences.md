---
title: Set Anomaly Detection Preferences
description: Learn how to set anomaly detection preferences in the Dashboard for Bot Protection, Brute-force Protection, and Breached Password Detection.
toc: true
topics:
    - security
    - anomaly-detection
    - brute-force-protection
    - breached-password-detection
    - bot-protection
contentType: how-to
useCase: anomaly-detection
---
# Set Anomaly Detection Preferences

Enable, disable, and customize **Anomaly Detection** settings in the [Dashboard](${manage_url}/#/anomaly).

::: warning
Auth0 recommends that you **do not** make changes to your anomaly detection features with the Management API.
:::

![Anomaly Detection Dashboard](/media/articles/anomaly-detection/anomaly-detection-overview.png)

## Bot protection preferences

Bot protection mitigates scripted attacks by detecting when a request is likely to be coming from a bot. These are sometimes called  [credential stuffing](/anomaly-detection/concepts/credential-stuffing) attacks. It is enabled by default for all connections. It provides a basic level of protection against certain attacks that adds very little friction to legitimate users. When such an attack is detected, it displays a CAPTCHA step in the login experience to eliminate bot and scripted traffic.

::: warning
Auth0 strongly recommends that you **do not** disable **Bot Protection**, however if you do, you can enable it in the [Dashboard](${manage_url}/#/anomaly).
::: 

1. Go to [Dashboard > Anomaly Detection](${manage_url}/#/anomaly)
2. Click on the **Bot Protection** shield.
3. Choose whether you wish to use the simple CAPTCHA provided by Auth0, or Google reCAPTCHA (requires external setup and registration). 

    - If you choose simple CAPTCHA, you are done with set up.

    ![Simple CAPTCHA](/media/articles/anomaly-detection/simple.png)

    - If you choose Google's reCAPTCHA, enter the **Site Key** and **Secret** you obtain when you register your app with Google. 

    ![Google reCAPTCHA](/media/articles/anomaly-detection/google.png)

4. Click **Save**.

## Brute-force Protection preferences

[Brute-force protection](/anomaly-detection/concepts/brute-force-protection) is enabled by default for all connections. Once enabled, you can customize the brute-force protection settings. You can limit the number of signups and failed logins from a suspicious IP address.

::: warning
Auth0 strongly recommends that you **do not** disable **Brute-force Protection**, however if you do, you can enable it back in the [Dashboard](${manage_url}/#/anomaly).
:::  

1. Go to [Dashboard > Anomaly Detection](${manage_url}/#/anomaly)
2. Click on the **Brute-force Protection** shield. 
3. Use the toggles to enable or disable actions for single or multiple user accounts. 

![Brute-Force Protection Shield](/media/articles/anomaly-detection/brute-force-shield.png)

4. Add any IP addresses to the **Whitelist** field to avoid erroneously triggering the protection action.

5. Click **Save**.

## Breached Password Detection preferences

Set preferences for [breached password](/anomaly-detection/concepts/breached-passwords) detection actions. 

1. Click on the **Breached-password Detection** shield.
2. Use the toggles to enable or disable actions when login security breaches are detected. 

![Breached Password Detection Shield](/media/articles/anomaly-detection/breached-password-shield.png)

3. Determine how administrators are notified.

4. Click **Save**.

## Keep reading

* [Bot and Credential Stuffing Protection](/anomaly-detection/concepts/credential-stuffing)
* [Customize Blocked Account Emails](/anomaly-detection/guides/customize-blocked-account-emails)
* [View Anomaly Detection Events](/anomaly-detection/guides/view-anomaly-detection-events)