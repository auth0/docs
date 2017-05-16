---
  description: Where to deprovision user accounts
---

# Deprovision Accounts

If you need to deprovision accounts, you should, at a minimum, do so with the identity provider. Once the account is removed or disabled with the identity provider, the user will not be able to log in.

If Auth0 acts as the service provider or the application integrates with Auth0, you might also want to remove the associated Auth0 accounts. You can do this using the Auth0 [Dashboard](${manage_url}/#/users) or [API](/api/management/v2#!/Users/delete_users_by_id).
