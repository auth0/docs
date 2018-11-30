---
title: Customize Blocked Account Emails
description: Describes how to customize blocked account emails. 
topics:
    - security
    - anomaly-detection
    - brute-force-protection
    - breached-password-detection
contentType: how-to
useCase: customize-anomaly-detection
---
# Customize Blocked Accoumt Emails

When Auth0 sends an email to a user to notify them of the block, the message contains a link to re-enable the origin of the request. Notice that Auth0 never blocks the user itself, just the attempts from the suspicious origin.

The email sent to the user looks like this:

![Email Example](/media/articles/brute-force-protection/bfp-2015-12-29_1832.png)

The template used for this message can be customized on the [Dashboard](${manage_url}/#/emails) under __Emails > Templates > Blocked Account Email__.

## Keep reading

Learn more about [email templates]](/email/templates).
