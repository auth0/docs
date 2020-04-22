---
title: Enable and Disable Credential Stuffing Protection
description: Learn how to disable and enable credential stuffing protection.
topics:
    - security
    - anomaly-detection
    - credential-stuffing-protection
contentType: how-to
useCase: enable-credential-stuffing-protection

---
# Enable and Disable Credential Stuffing Protection

Credential stuffing is the automated injection of breached username/password pairs in order to fraudulently gain access to user accounts. This is a subset of the brute force attack category: large numbers of spilled credentials are automatically entered into websites until they are potentially matched to an existing account, which the attacker can then hijack for their own purposes.

Auth0 automatically analyzes anonymized login data to detect when a customer is likely to be experiencing a credential stuffing attack.  When such an attack is detected, it throws a CAPTCHA step in the login experience to eliminate bot and scripted traffic.

Credential stuffing protection is enabled by default for all connections.

::: warning
Auth0 strongly recommends that you **do not** disable the credential stuffing protection feature, however if you do, you can change it back in the [Dashboard](${manage_url}/#/anomaly).
::: 

## Keep reading

* [Anomaly Detection](/anomaly-detection)
* [Brute-force Protection Triggers](/anomaly-detection/references/brute-force-protection-triggers-actions)