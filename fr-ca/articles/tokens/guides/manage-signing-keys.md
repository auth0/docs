---
description: Learn how to manage your tenant's application signing key, which is used to sign ID Tokens, Access Tokens, SAML assertions, and WS-Fed assertions that are sent to your application.
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

# Manage Signing Keys

When you select our recommended [signing algorithm](/tokens/concepts/signing-algorithms) (RS256), Auth0 uses public-key cryptography to establish trust with your applications. In more general terms, we use a signing key that consists of a public and private key pair.

When a user signs in to your application, we create a token that contains information about the user and sign the token using its private key before we send it back to your application. Auth0 secures the private key, which is unique per tenant.

To verify that the token is valid and originated from Auth0, your application validates the token’s signature using the public key that we expose in the following ways:

* your [tenant settings](/dashboard/reference/settings-tenant) in the Auth0 Dashboard
* your tenant's [OpenID Connect discovery document](/tokens/guides/locate-jwks)

For security purposes, you may manually rotate your signing key on a periodic basis.

::: note
We use the application signing key to sign assertions that are sent to applications. These assertions may include ID Tokens, Access Tokens, SAML assertions, and WS-Fed assertions that are sent to your application. Note that these keys are different from those used to sign interactions with connections, including signing SAML Requests to IdPs and encrypting responses from IdPs.

By default, SAML assertions for IdP connections are signed, which we recommend. To get public keys you can use to configure the IdP, see [SAML Identity Provider Configuration: Signed Assertions](/protocols/saml/samlp#signed-assertions). 
:::

## Transition your application gracefully

We have designed the rotation and revocation process to both support your personal preferences and promote a graceful transition for your application. If you prefer to update your application first, then rotate and revoke your key, you may do that. Alternatively, if you prefer to rotate your key, and then update your application and revoke your old key, you may also do that.

For this reason, available keys include:

* **Currently used**: Key that is currently being used to sign all new assertions.
* **Previously used**: Key that was previously used, but has been rotated out. Assertions that were generated with this key will still work.
* **Next in queue**: Key that is queued and will replace the current key when the application signing key is next rotated.

::: warning
Regardless of the method you use, you should always test on a development tenant before rotating application signing keys in production.
:::

## Rotate your signing key

Auth0 allows you to manually rotate your application signing key on a periodic basis. So, for security purposes, any application that integrates with Auth0 should be prepared to handle key rotation regardless of how infrequently it may occur. If your application does not handle signing key rotation and attempts to use an expired signing key to verify a token, the authentication request will fail.

Although Auth0 signs with only one signing key at a time, your tenant's [OpenID Connect discovery document](/tokens/guides/locate-jwks) always contains multiple keys. Specifically, it will always include both the current key and the next key, but it may also include the previous key if the previous key has not yet been revoked. To provide a seamless experience in case of emergency, your application should be able to use any of the keys specified in the document.

You can rotate your application signing key using either the Auth0 Dashboard or Management API. To learn more, see [Rotate Signing Keys](/dashboard/guides/tenants/rotate-signing-keys).

::: warning
All tokens signed with the previous key will still be valid until the previous key is revoked.

Make sure you have updated your application with the new key before you revoke the previous key.
:::

## Manage your signing keys

We provide other application security key management capabilities through both our Dashboard and Management API. Through the Management API and Dashboard, you can:

* [Rotate Signing Keys](/dashboard/guides/tenants/rotate-signing-keys)
* [Revoke Signing Keys](/dashboard/guides/tenants/revoke-signing-keys)
* [View Signing Keys](/dashboard/guides/tenants/view-signing-keys)

In addition, the Dashboard allows you to view, copy, and download the signing certificates for your application signing keys. Additional application signing certificates links are as follows:

* [CER](https://${account.namespace}/cer)
* [PEM](https://${account.namespace}/pem)
* [raw PEM](https://${account.namespace}/rawpem)
* [PB7](https://${account.namespace}/pb7)
* [Fingerprint](https://${account.namespace}/fingerprint)

### Limitations

* Rotating your signing key will be subject to a smaller rate limit than other API endpoints. To learn more, see [Rate Limits: Management API v2](/policies/rate-limits#management-api-v2).

## Keep reading

* [Rotate Signing Keys](/dashboard/guides/tenants/rotate-signing-keys)
* [Revoke Signing Keys](/dashboard/guides/tenants/revoke-signing-keys)
* [View Signing Keys](/dashboard/guides/tenants/view-signing-keys)
* [Locate JSON Web Key Sets (JWKS)](/tokens/guides/locate-jwks)
* [Signing Algorithms](/tokens/concepts/signing-algorithms)
