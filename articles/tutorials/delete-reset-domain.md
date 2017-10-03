---
description: How to manage your domain
---

# Delete/Reset Your Domain

Using the [Reset Domain Extension](https://github.com/auth0-extensions/auth0-reset-tenant), you can programmatically make changes to your Auth0 domain. Not only is this useful for creating new environments for development or test purposes, you can use the extension to "clean" your domain and remove unwanted items.

## Delete vs. Reset

In some cases, users have opted to delete their domain to begin with a clean slate. Unfortunately, doing so means that you don't keep your domain name. Because domain names have to be unique, they can only used once. As such, we recommend using the Reset Domain Extension to remove the unwanted items and return your domain to its initial state, since this means that you do *not* have to start over with a new domain name.
