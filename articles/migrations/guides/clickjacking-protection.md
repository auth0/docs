---
title: Migration Guide: Enabling Clickjacking Protection for Universal Login
description: Auth0 is adding a way to prevent the Universal Login pages to be embedded in an iframe.
toc: true
topics:
  - universal-login
  - migrations
contentType:
  - concept
  - how-to
---
# Migration Guide: Enabling Clickjacking Protection

Clickjacking is an attack that tricks a user into clicking a webpage element which is invisible or disguised as another element. It's done by loading content in an IFRAME and rendering elements on top of it. In the context of the Universal Login pages, an attacker could trick the user to click the 'Login', or 'Reset Password' button. 

This can be prevented by setting the following HTTP headers:

X-Frame-Options: deny
Content-Security-Policy: frame-ancestors 'none'

Even if the potential attack does not entail significant risk, it's a good security practice to add those headers. It's also detected by security scanners, so customers could get reports from penetration testers mentioning the lack of those headers.

Given it's a potential breaking change, as you could be actually rendering the login page in an IFRAME, we added a way to let you opt-in for these headers, and we strongly recommend you to do so.

You can do it by navigating to [Tenant Settings > Advanced Settings>({manage_url}/#/tenant/advanced), scrolling to 'Migrations', and turn OFF the 'Disable click-jacking protection for Classic Universal Login'. This is not required if you are using the [New Universal Login Experience](/universal-login/new) as those headers are always set.

