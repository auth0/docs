---
title: Enable and Disable Brute-Force Protection
description: Learn how to disable and enable brute-force protection.
topics:
    - security
    - anomaly-detection
    - brute-force-protection
contentType: how-to
useCase: customize-anomaly-detection
v2: true
---
# Enable and Disable Brute-Force Protection

Brute-force protection is enabled by default for all connections.

::: warning
Auth0 strongly recommends that you **do not** set the `brute_force_protection` flag to `false` (effectively disabling brute-force protection for the connection), however if you do, you can change it back in the [Dashboard](${manage_url}/#/anomaly).
::: 

![Brute-Force Protection Shield](/media/articles/anomaly-detection/brute-force-shield.png)

1. Use the **Improve brute force protection** toggle under **Connection Settings** to change the flag from `false` to `true`.

2. Click **Save** when you are finished.

## Keep reading

* [Brute-force protection triggers and actions](/anomaly-detection/references/brute-force-protection-triggers-actions) taken upon anomaly detection and how blocks are cleared.
* Learn how to [set anomaly detection preferences](/anomaly-detection/guides/set-anomaly-detection-preferences) in the Dashboard.
* [Restrictions and limitations](/anomaly-detection/references/anomaly-detection-restrictions-limitations) of Auth0 anomaly detection.
* [Frequently asked questions](/anomaly-detection/references/anomaly-detection-faqs) about anomaly detection.
