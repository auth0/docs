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

Clickjacking is an attack that tricks a user into clicking a web page element which is invisible or disguised as another element. This is done by loading content in an iframe and rendering elements on top of it. In the context of the <dfn data-key="universal-login">Universal Login</dfn> pages, an attacker could trick the user into clicking a 'Login', or 'Reset Password' button.

This can be prevented by setting the following HTTP headers:

```
X-Frame-Options: deny
Content-Security-Policy: frame-ancestors 'none'
```

Even if the potential attack does not entail significant risk, it's a good security practice to add the headers. It is also detected by security scanners, so reports from penetration testers might mention the lack of these headers.

In a case where you are rendering the login page in an iframe, adding these headers could be a breaking change. Instead of adding these headers for all customers, therefore, Auth0 has added an opt-in for these headers which we strongly recommend you to enable.

You can do this by navigating to [Tenant Settings > Advanced Settings](${manage_url}/#/tenant/advanced), scrolling to 'Migrations', and turning OFF the 'Disable clickjacking protection for Classic Universal Login' setting. This action is not required if you are using the [New Universal Login Experience](/universal-login/new) as those headers are always set.
