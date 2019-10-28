---
description: How to delete or reset your tenant
topics:
    - support
    - delete-tenant
    - reset-tenant
    - tenants
contentType:
  - how-to
useCase:
  - support
---

# Delete or Reset Tenants

If you want to completely remove an unwanted tenant, we recommend deleting it. This option is useful if you have created a test or demo tenant that you won't be using again.

When choosing this option, please note that you **cannot** use the deleted tenant's name again; Auth0 requires that all tenant names be unique.

If you want to keep using the tenant name, we recommend using the **Deploy CLI Tool** to remove any unwanted items and return your tenant to its initial state. This way, you do *not* have to create a new tenant name.

<%= include('./_delete-tenant') %>

<%= include('./_reset-tenant') %>

## Keep reading

* If you've deleted your tenant, and you require the use of a particular domain name, we recommend configuring a [custom domain name](/custom-domains) for your new tenant.
* [Cancel Your Auth0 Subscription](/support/cancel-paid-subscriptions) to downgrade to a free account.
* [Change or Upgrade Your Auth0 Subscription](/support/subscription)
* [Update a Tenant Admin](/dashboard/manage-dashboard-admins#update-admin) to change ownership of the tenant.
* [Export Data Out of Auth0](/support/removing-auth0-exporting-data)
* [Reset Your Auth0 Account Password](/support/reset-account-password)
