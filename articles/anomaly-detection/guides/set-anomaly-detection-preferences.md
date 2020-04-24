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

Customize the actions that occur after the triggers in the **Anomaly Detection** section on the [Dashboard](${manage_url}/#/anomaly).

::: warning
Auth0 recommends that you **do not** make changes to your anomaly detection features with the Management API.
:::

![Anomaly Detection Dashboard](/media/articles/anomaly-detection/anomaly-detection-overview.png)

## Automated attack protection preferences

Automated attack protection protects against [credential stuffing attacks](/anomaly-detection/concepts/credential-stuffing). It is [enabled by default](/anomaly-detection/guides/enable-disable-automated-attack-protection) for all connections. It provides a basic level of protection against certain attacks that does not add any friction to legitimate users. When such an attack is detected, it displays a CAPTCHA step in the login experience to eliminate bot and scripted traffic.

::: warning
Auth0 strongly recommends that you **do not** disable **Automated Attack Protection**, however if you do, you can enable it in the [Dashboard](${manage_url}/#/anomaly).
::: 

The **Automated Attack Protection** feature works in the following ways depending on the Auth0 login option you choose:

- If you are using New Universal Login: No further configuration is required. The feature will work for your tenant immediately.
- If you are using Classic Universal Login: Determine if your page is customized. If it is, upgrade your version of Lock to v11.20 by replacing the script tage with the tag for the newer version: 

    For example, replace this tag:
    ```html
    <script src="https://cdn.auth0.com/js/lock/x.x/lock.min.js"></script>
    ```

    With the following:
    ```html
    <script src="https://cdn.auth0.com/js/lock/11.20/lock.min.js"></script>
    ```

## Brute-force protection preferences

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

## Breached password detection preferences

Set preferences for [breached password](/anomaly-detection/concepts/breached-passwords) detection actions. 

1. Click on the **Breached-password Detection** shield.

![Breached Password Detection Shield](/media/articles/anomaly-detection/breached-password-shield.png)

2. Use the toggles to enable or disable actions when login security breaches are detected. 

3. Determine how administrators are notified.

4. Click **Save**.

## View anomaly detection events in logs

You can monitor your [tenant logs](/anomaly-detection/guides/view-anomaly-detection-events) for events that indicate potential attacks. For example, the following events may indicate credential stuffing attacks:

- `f`: failed login
- `fu`: failed login due to invalid email/username

## Restrictions and limitations

Both brute-force protection and breached password detection depend on the IP address of the user. Because of this, the following use cases are *not* supported:

* If you use the [Resource Owner](/api/authentication#resource-owner) from the backend of the application. Using this call does not get the IP address of the user. 

* If you use [Resource Owner Password Grant](/api-auth/grant/password) from the backend of the application. Using this call does not get the IP address of the user, however, you can [configure your application and send the IP address of the user as part of the request](/api-auth/tutorials/using-resource-owner-password-from-server-side) to make brute-force protection work correctly.

* If you authenticate a large number of users from the same IP address. For example, users that are behind a proxy are more likely to reach these limits and trigger the associated protection. It is possible to configure a whitelist for the proxy's IP and CIDR range and avoid erroneously triggering the protection.

## Keep reading

* [Attack Protection Triggers and Actions](/anomaly-detection/references/attack-protection-triggers-actions)
* [Customize Blocked Account Emails](/anomaly-detection/guides/customize-blocked-account-emails)