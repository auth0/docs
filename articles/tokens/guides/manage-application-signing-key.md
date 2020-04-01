---
description: Learn how to manage your tenant's application signing key, which is used to sign tokens and SAML assertions.
topics:
  - tokens
  - access-tokens
  - id-tokens
  - assertions
  - SAML
- signing-keys
  - certificates
contentType:
  - concept
useCase:
  - invoke-api
  - add-login
  - secure-api
---

# Manage Application Signing Keys

When you select our recommended [signing algorithm](/tokens/concepts/signing-algorithms), (RS256), Auth0 uses public-key cryptography to establish trust with your applications. In more general terms, we use a signing key that consists of a public and private key pair.

When a user signs in to your application, we create a token that contains information about the user and sign the token using its private key before we send it back to your application. To verify that the token is valid and originated from Auth0, your application validates the token’s signature using the public key that we expose in the following ways:

* your [tenant settings](/dashboard/reference/settings-tenant) in the Auth0 Dashboard
* your tenant's [OpenID Connect discovery document](/tokens/guides/locate-jwks)

For security purposes, you may manually rotate your signing key on a periodic basis.

::: note
We use the application signing key to sign assertions that are sent to applications. These assertions may include ID Tokens, Access Tokens, SAML assertions, and WS-Fed assertions. Note that these keys are different from those used to sign interactions with connections, including signing SAML Requests to IdPs and encrypting responses from IdPs.

To learn more about signing keys for SAML connection assertions, see [SAML Identity Provider Configuration](/protocols/saml/samlp).
:::

## Rotate your application signing key

Auth0 allows you to manually rotate your signing key on a periodic basis. So, for security purposes, any application that integrates with Auth0 should be prepared to handle key rotation regardless of how infrequently it may occur. If your application does not handle signing key rotation and attempts to use an expired signing key to verify a token, the authentication request will fail.

Your tenant's [OpenID Connect discovery document](/tokens/guides/locate-jwks) always contains more than one valid key. Specifically, it includes both the current key and the next key queued up for use whenever you choose to rotate your signing key. To provide a seamless experience in case of emergency, your application should be able to use any of the keys specified in the document.

You can rotate your application signing key using either the Auth0 Dashboard or Management API. To learn more, see [Rotate Application Signing Keys](/dashboard/guides/tenants/rotate-application-signing-keys).

::: warning
Make sure you have updated your application with the new key before you revoke the previous key.

All tokens signed with the previous key will still be valid until the previous key is revoked.
:::

## Manage your application signing keys

We provide other application security key management capabilities through both our Dashboard and Management API. Through the Management API and Dashboard, you can:

* [Revoke Application Signing Keys](/dashboard/guides/tenants/revoke-application-signing-keys)
* [View Application Signing Keys](/dashboard/guides/tenants/view-application-signing-keys)

In addition, the Dashboard allows you to view, copy, and download the signing certificates for your application signing keys. Additional application signing certificates links are as follows:

[CER](https://${account.namespace}/cer) | [PEM](https://${account.namespace}/pem) | [raw PEM](https://${account.namespace}/rawpem) | [PB7](https://${account.namespace}/pb7) | [Fingerprint](https://${account.namespace}/fingerprint)

### Limitations

* Rotating your signing key will be subject to a smaller rate limit than other API endpoints. To learn more, see [Rate Limits](/policies/rate-limits).

## Keep reading

* [Rotate Application Signing Keys](/dashboard/guides/tenants/rotate-application-signing-keys)
* [Revoke Application Signing Keys](/dashboard/guides/tenants/revoke-application-signing-keys)
* [View Application Signing Keys](/dashboard/guides/tenants/view-application-signing-keys)
* [Locate JSON Web Key Sets (JWKS)](/tokens/guides/locate-jwks)
* [Signing Algorithms](/tokens/concepts/signing-algorithms)
