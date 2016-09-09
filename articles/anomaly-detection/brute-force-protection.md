---
description: This page describes Auth0's improved brute force protection.
---

## Improved brute force protection

For [Database Identity Providers](/connections/database), Auth0 implements algorithms to detect suspicious login attempts. 
When a suspicious activity is detected, Auth0 will block subsequent login attempts originating from the same computer (e.g. the same public IP address) for one hour. 

Auth0 will also send an email to the user notifying of the block. The message contains a link to re-enable the origin of the request. Notice that Auth0 never blocks the user itself, just the attempts from the suspicious origin.

The email sent to the user looks like this:

 ![docs/img/bfp-2015-12-29_1832.png](/media/articles/brute-force-protection/bfp-2015-12-29_1832.png)

The template used for this message can be customized on the [Dashboard](${uiURL}/#/emails) under __Emails > Templates > Blocked Account Email__.
