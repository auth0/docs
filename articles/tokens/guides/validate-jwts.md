---
title: Validate JSON Web Tokens
description: Learn how to parse and validate a JSON Web Token (JWT).
topics:
  - jwt
  - tokens
  - id-tokens
contentType:
  - how-to
useCase:
  - invoke-api
  - secure-api
  - add-login
---
# Validate JSON Web Tokens

In general, you won't need to manually validate and parse <dfn data-key="json-web-token">JSON Web Tokens</dfn> (JWTs) as many Auth0 backend SDKs do this for you.

However, for some cases you may need to implement your own JWT validation and parsing:

* a really good reason
* a decent reason
* another reason

If you'd like to visually inspect a JWT, visit [JWT.io](https://jwt.io/) or use the [JWT Debugger Chrome Extension](https://chrome.google.com/webstore/detail/jwt-debugger/ppmmlchacdbknfphdeafcbmklcghghmd?hl=en)).

## Middleware and third-party libraries

If you need to validate and parse JWTs, we recommend using middleware or an existing open source third-party library.

Many web frameworks include middleware to handle JWT validation. For example, [ASP.NET Core](https://github.com/dotnet/aspnetcore) provides a JWT Bearer package which integrates with the standard ASP.NET Core Authentication and Authorization.

When choosing middleware or a third-party library for JWT validation:

* make sure it supports the [signing algorithm](/tokens/concepts/signing-algorithms) used to sign tokens issued for your application or API.
* keep in mind that not all libraries validate all JWT claims.

[Libraries for Token Signing/Verification](https://jwt.io/#libraries-io) lists libraries for a variety of platforms and languages, as well as the validations and signing algorithms each library supports.

## Manually implement the checks

All Auth0-issued JSON Web Tokens (JWTs) are JSON Web Signatures (JWS), meaning they are signed rather than encrypted. As such, this section describes validation for JWSs. If you need to validate a JSON Web Encryption (JWE), see [RFC 7519](https://tools.ietf.org/html/rfc7519#section-7.2) for instructions specific to that type of JWT.

To validate a JWT, your application needs to:

1. Check that the JWT is well formed.
2. Check the signature.
3. Check the standard claims.

If any of these steps fail, then the associated request must be rejected.

### Check that the JWT is well-formed

Ensure that the JWT conforms to the [structure of a JWT](/tokens/references/jwt-structure). If this fails, the token is considered invalid, and the request must be rejected.

1. Verify that the JWT contains three segments, separated by two period ('.') characters.
2. Parse the JWT using [JWT.io](https://jwt.io/) to extract its components. The first segment is the Header, the second is the Payload, and the third is the Signature. Each segment is base64url encoded.
3. Base64url-decode the Header, ensuring that no line breaks, whitespace, or other additional characters have been used, and verify that the decoded Header is a valid JSON object.
4. Base64url-decode the Payload, ensuring that no line breaks, whitespace, or other additional characters have been used, and verify that the decoded Payload is a valid JSON object.
5. Base64url-decode the Signature, ensuring that no line breaks, whitespace, or other additional characters have been used, and verify that the decoded Signature is a valid JSON object.

### Check the signature

The last segment of a JWT is the Signature, which is used to verify that the token was signed by the sender and not altered in any way. The Signature is created using the Header and Payload segments, a [signing algorithm](/tokens/concepts/signing-algorithms), and a secret or public key (depending on the chosen signing algorithm).

To verify the signature, you will need to:

1. Check the signing algorithm.

    1. Retrieve the `alg` property from the decoded Header.
    2. Ensure that it is an allowed algorithm. Specifically, to avoid certain attacks, make sure you disallow `none`.
    3. Check that it matches the algorithm you selected when you [registered your Application](/getting-started/set-up-app) or [API](/getting-started/set-up-api) with Auth0.
2. Confirm that the token is correctly signed using the proper key. Check the Signature to verify that the sender of the JWT is who it says it is and that the message wasn't changed along the way.

    Remember that the Signature is created using the Header and Payload segments, a [signing algorithm](/tokens/concepts/signing-algorithms), and a secret or public key (depending on the chosen signing algorithm).

    To verify that the signature is correct, you need to generate a new Base64url-encoded signature using the public key (RS256) or secret (HS256) and verify that it matches the original Signature included with the JWT:

    1. Take the original Base64url-encoded Header and original Base64url-encoded Payload segments (Base64url-encoded Header + "." + Base64url-encoded Payload), and hash them with SHA-256.
    2. Encrypt using either HMAC or RSA (depending on your selected signing algorithm) and the appropriate key.
    3. Base64url-encode the result.

    ::: panel Locate Public Key

    For RS256:
    Retrieve the public key from the [JWKS](/tokens/concepts/jwks) located by using your [Auth0 discovery endpoint](/tokens/guides/locate-jwks).

    For debugging purposes, you can visually inspect your token at [jwt.io](jwt.io); for this purpose, you can also locate your public key in the Auth0 Dashboard. Look in **Applications**>**Settings**>**Advanced Settings**>**Certificates** and locate the **Signing Certificate** field.

    For HS256:
    Retrieve the `client_secret` from Auth0's Management API using the [Get a Client endpoint](/api/management/v2/#!/Clients/get_clients_by_id). 

    For debugging purposes, you can visually inspect your token at [jwt.io](jwt.io); for this purpose, you can also locate your secret in the Auth0 Dashboard. For applications, look in **Settings** and locate the **Client Secret** field. For APIs, look in **Settings** and locate the **Signing Secret** field. (Note that this field is only displayed for APIs using the HS256 [signing algorithm](/tokens/concepts/signing-algorithms).)
    :::

    If the generated signature does not match the original Signature included with the JWT, the token is considered invalid, and the request must be rejected.

### Check standard claims

Before using the token, you should retrieve the following standard claims from the decoded Payload and perform the following checks:

* **Token expiration** (`exp`, Unix timestamp): The expiration date/time must be after the current date/time and should match what you set for your token lifetime.
* **Token issuer** (`iss`, string): The issuing authority inside the token must match the issuing authority (`issuer`) identified in your Auth0 tenant's discovery document, which exists at `https://${account.namespace}/.well-known/openid-configuration`.

Additional checks are required depending on whether the JWT you are validating is an ID Token or an Access Token. To learn about the additional requirements, see [Validate ID Tokens](/tokens/guides/validate-id-tokens) or [Validate Access Tokens](/tokens/guides/validate-access-tokens).
