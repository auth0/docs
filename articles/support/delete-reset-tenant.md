---
description: How to manage your tenant
---

# Delete/Reset Your Tenant

Using the [Reset Tenant Extension](https://github.com/auth0-extensions/auth0-reset-tenant), you can programmatically make changes to your Auth0 tenant. Not only is this useful for creating new environments for development or test purposes, you can use the extension to "clean" your tenant and remove unwanted items.

## Delete vs. Reset

In some cases, users have opted to delete their tenant to begin with a clean slate. Unfortunately, doing so means that you don't keep your tenant name. Because tenant names have to be unique, they can only used once. As such, we recommend using the Reset Tenant Extension to remove the unwanted items and return your tenant to its initial state, since this means that you do *not* have to start over with a new tenant name.
