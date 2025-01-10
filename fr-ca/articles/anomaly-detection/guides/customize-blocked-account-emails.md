---
title: Customize Blocked Account Emails
description: Learn how to customize blocked account emails.
topics:
    - security
    - anomaly-detection
    - brute-force-protection
    - breached-password-detection
contentType: how-to
useCase: customize-anomaly-detection
v2: true
---
# Customize Blocked Account Emails

When Auth0 sends an email to a user to notify them of the [breached password block action](/anomaly-detection/references/breached-password-detection-triggers-actions), the message contains a link to re-enable the origin of the request.

::: note
Auth0 never blocks the user itself, just the attempts from the suspicious origin.
:::

The email sent to the user looks like this:

![Email Example](/media/articles/brute-force-protection/bfp-2015-12-29_1832.png)

You can customize the template used for this message on the [Dashboard](${manage_url}/#/emails) under __Emails > Templates > Blocked Account Email__.

## Keep reading

* Learn more about [email templates](/email/templates).
* Understand [why a user receives a breached password email](/anomaly-detection/concepts/breached-passwords) and general web security tips.
