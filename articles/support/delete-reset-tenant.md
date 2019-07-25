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

If you want to start over completely and remove an unwanted tenant, we recommend deleting it. When you choose this option, you cannot use the deleted tenant's name again because tenant names must be unique. This option is useful if you have created a test or demo tenant and you won't ever be using the tenant name again.

If you want to be able to keep the tenant name, we recommend using the Reset Tenant Extension to remove any unwanted items and return your tenant to its initial state. This way you do *not* have to create with a new tenant name.

<%= include('./_delete-tenant') %>

## Reset tenants

Use the [Reset Tenant Extension](https://github.com/auth0-extensions/auth0-reset-tenant) to make changes to your Auth0 tenant. You can create a "clean" environment for development or test purposes and remove unwanted items.
