---
description: Identifier-First
topics:
  - universal-login
toc: true
---
# Identifier-First

An identifier-first authentication flow prompts users for their identifier and their authentication factor in two separate steps.

Google was the first major website that adopted this flow. When you authenticate to Google websites, you enter your email first, click ‘Next’, and then enter your password.

This flow allows customizing the user experience depending on the identifier you entered:

- If you enter a corporate email as the identifier, e.g. “user@acme.com”, you will be redirected to the acme.com’s corporate login page.

- If you registered a non-password authentication factor with the website, you can use it instead of the password. For example, when authenticating to Microsoft’s accounts, if you enrolled Microsoft Authenticator, you are offered to accept a push notification instead of typing your password.

- If you enter a phone number as the identifier, you’ll get a message on your phone that will let you authenticate.

Auth0 currently supports this flow using the Classic Universal Login Experience:

- After entering an email, Auth0 will recognize if the domain matches one from a registered Enterprise Connection, and redirect to the enterprise identity provider’s login page. This is also known as HRD or Home Realm Discovery. You can configure the domains for each Enterprise Connection in the ‘IdP Domains’ field:

![IdP Domains](/media/articles/universal-login/idp-domains.png)


- When using Passwordless, users will be able to enter a phone or an email and be able to complete authentication using a code or magic link.


