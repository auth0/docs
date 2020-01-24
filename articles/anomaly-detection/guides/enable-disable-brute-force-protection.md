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

![Brute-Force Protection Shield](/media/articles/anomaly-detection/anomaly-detection-overview.png)

::: warning
Auth0 strongly recommends that you **do not** set the `brute_force_protection` flag to `false` (effectively disabling brute-force protection for the connection), however if you do, you can change it back in the [Dashboard](${manage_url}/#/anomaly).
::: 

Once enabled, you can [customize](/anomaly-detection/guides/set-anomaly-detection-preferences#brute-force-protection-preferences) your brute-force protection settings.

::: note
If there are 10 attempted logins from an email address that is not associated with an existing user in Auth0, brute-force protection will still be triggered. However, no brute-force notification email is sent to the email address that is attempting the access. 
:::

![Brute-Force Protection Shield](/media/articles/anomaly-detection/brute-force-shield.png)

## Keep reading

* [Brute-Force Protection Triggers and Actions](/anomaly-detection/references/brute-force-protection-triggers-actions)
* [Set Anomaly Detection Preferences](/anomaly-detection/guides/set-anomaly-detection-preferences)