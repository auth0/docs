---
description: Best practices on deprovision users of your SAML integration
tags:
  - saml
---

# Deprovision Users

If you ever need to remove application access for users, you'll need to *deprovision* them, at minimum, with the identity provider. Depending on the identity provider you're using, the steps required to deprovision a user account varies; check with your provider for further instructions.

Once a user's account is removed or disabled with the identity provider, the user will not be able to log in.

You may also want to remove the Auth0 user accounts for those who've been deprovisioned if Auth0 is the service provider or if your app integrates with Auth0. Regardless of whether Auth0 is the identity or service provider, you can remove users using the Management [Dashboard](${manage_url}/#/users) or [API](/api/management/v2#!/Users/delete_users_by_id).
