---
title: Manually Verify a Signed Token
description: Learn the basics of manually verifying tokens signed with signing algorithms.
topics:
  - api-authentication
  - oidc
  - apis
  - signing-algorithms
  - RS256
  - token
contentType: concept
useCase:
  - secure-api
  - call-api
---

# Manually Verify an RS256-signed Token

To use the Public Key to manually verify a JWT Signature on the [JWT.io](https://jwt.io) website, you will need to find and copy the Public Key in Auth0 and use it in the [JWT.io Debugger](https://jwt.io/#debugger).  

## Copy the Public Key in Auth0

1. Go to [Dashboard > Applications](${manage_url}/#/applications). 
2. Open the **Settings** for your application. Scroll down and click **Show Advanced Settings**. 
3. Open the **Certificates** tab. 
4. You will find the Public Key in the **Signing Certificate** field. Copy it.

## Verify the JWT Signature

1. Go to the [JWT.io Debugger](https://jwt.io/#debugger).
2. From the **Algorithm** dropdown, choose RS256.
3. In the **Verify Signature** section, paste the Public Key in the **Public Key or Certificate** field.
4. In the **Encoded** section, paste the JWT you want to verify.


::: note
To verify the signature of a token from within one of your applications, we recommend that you use the Public Key from your tenant's [JSON Web Key Set (JWKS)](/jwks). Your tenant's JWKS is `https://${account.namespace}/.well-known/jwks.json`.
:::
