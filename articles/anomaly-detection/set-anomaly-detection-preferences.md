---
title: Set Anomaly Detection Preferences
description: Describes how to set anomaly detection preferences in the Dashboard.
topics:
    - security
    - anomaly-detection
    - brute-force-protection
    - breached-password-detection
contentType: how-to
useCase: customize-anomaly-detection
---
# Set Anomaly Detection Preferences

To customize the actions that get taken from the triggers, go to the [Anomaly Detection](${manage_url}/#/anomaly) section on the dashboard.

![](/media/articles/anomaly-detection/anomaly-detection-overview.png)

You can use the toggle to disable all the actions of a certain shield, or you can enable/disable certain actions. Click on the shield that has the action in it that you wish to change. Then you can use the toggle to enable/disable an action.

::: warning
Auth0 recommends that you **do not** make changes to your anomaly detection features with the Management API.
:::

## Brute-force protection preferences

![](/media/articles/anomaly-detection/brute-force-shield.png)

Here you can also add any IP addresses to the **Whitelist** field to avoid erroneously triggering the protection.

Click **Save** when you are finished.

## Breached password detection preferences

![](/media/articles/anomaly-detection/breached-password-shield.png)

Click **Save** when you are finished.
