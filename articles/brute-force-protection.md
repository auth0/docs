## Improved brute force protection

For [Database Identity Providers](docs/connections/database), Auth0 implements algorithms to detect suspicious login attempts. 

When a suspicious activity is detected, Auth0 will block subsequent login attempts originating from the same computer (public IP address). 

We will also send an email to the user notifying them, containing a link to re-enable the origin of the request. Notice that Auth0 never blocks the user itself, just the attempts from the suspicious origin.

The email that is sent to the user looks like this ![docs/img/bfp-2015-12-29_1832.png](/media/articles/brute-force-protection/bfp-2015-12-29_1832.png)

It is generated under a template that can be edited in your [Dashboard](manage.auth0.com/#/emails) under Emails->Templates->Blocked Account Email.
