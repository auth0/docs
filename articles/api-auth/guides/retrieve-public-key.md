---
url: /api-auth
title: Retrieve a Public Key
description: Learn the basics of retrieving an application's public key from Auth0.
topics:
  - api-authentication
  - oidc
  - apis
  - signing algorithms
  - RS256
  - public key
contentType: concept
useCase:
  - secure-api
  - call-api
---

# Retrieve a Public Key

When using RS256, Auth0 provides metadata endpoints for the OIDC, SAML, and WS-Fed protocols so that applications can be programmed to retrieve public keys automatically.

1. Under the [Applications](${manage_url}/#/applications) section of your Dashboard, edit the settings for your application.
2. Scroll down, and click **Show Advanced Settings**.
3. Click the **Endpoints** tab.

Example: The OIDC metadata endpoint takes the form of `https://{account domain}/.well-known/openid-configuration`. If you browse to this URL, you will see a JSON object with a reference to `https://{account domain}/.well-known/jwks.json`, which contains the public key (or keys) for the account.
