---
url: /jwks
title: JSON Web Key Set (JWKS)
description: A JSON Web Key set is a JSON object which represents a set of JSON Web Keys (a JSON object that represents a cryptographic key).
toc: true
tags:
  - tokens
  - jwks
---
# JSON Web Key Set (JWKS)

When creating applications and resources servers (APIs) in Auth0, two algorithms are supported for signing [JSON Web Tokens (JWTs)](/jwt): **RS256** and **HS256**. RS256 generates an asymmetric signature, which means a private key must be used to sign the JWT and a different public key must be used to verify the signature.

Auth0 uses the [JWK](https://tools.ietf.org/html/rfc7517) specification to represent the cryptographic keys used for signing RS256 tokens. This specification defines two high level data structures: **JSON Web Key (JWK)** and **JSON Web Key Set (JWKS)**. Here are the definitions directly from the specification:

> **JSON Web Key (JWK)**
>
> A JSON object that represents a cryptographic key. The members of the object represent properties of the key, including its value.

> **JSON Web Key Set (JWKS)**
> 
> A JSON object that represents a set of JWKs. The JSON object MUST have a `keys` member, which is an array of JWKs.

At the most basic level, the JWKS is a set of keys containing the public keys that should be used to verify any JWT issued by the authorization server. Auth0 exposes a JWKS endpoint for each tenant, which is found at `https://${account.namespace}/.well-known/jwks.json`. This endpoint will contain the JWK used to sign all Auth0 issued JWTs for this tenant. 

This is an example of the JWKS used by a demo tenant.

```json
{
"keys": [
  {
    "alg": "RS256",
    "kty": "RSA",
    "use": "sig",
    "x5c": [
      "MIIC+DCCAeCgAwIBAgIJBIGjYW6hFpn2MA0GCSqGSIb3DQEBBQUAMCMxITAfBgNVBAMTGGN1c3RvbWVyLWRlbW9zLmF1dGgwLmNvbTAeFw0xNjExMjIyMjIyMDVaFw0zMDA4MDEyMjIyMDVaMCMxITAfBgNVBAMTGGN1c3RvbWVyLWRlbW9zLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMnjZc5bm/eGIHq09N9HKHahM7Y31P0ul+A2wwP4lSpIwFrWHzxw88/7Dwk9QMc+orGXX95R6av4GF+Es/nG3uK45ooMVMa/hYCh0Mtx3gnSuoTavQEkLzCvSwTqVwzZ+5noukWVqJuMKNwjL77GNcPLY7Xy2/skMCT5bR8UoWaufooQvYq6SyPcRAU4BtdquZRiBT4U5f+4pwNTxSvey7ki50yc1tG49Per/0zA4O6Tlpv8x7Red6m1bCNHt7+Z5nSl3RX/QYyAEUX1a28VcYmR41Osy+o2OUCXYdUAphDaHo4/8rbKTJhlu8jEcc1KoMXAKjgaVZtG/v5ltx6AXY0CAwEAAaMvMC0wDAYDVR0TBAUwAwEB/zAdBgNVHQ4EFgQUQxFG602h1cG+pnyvJoy9pGJJoCswDQYJKoZIhvcNAQEFBQADggEBAGvtCbzGNBUJPLICth3mLsX0Z4z8T8iu4tyoiuAshP/Ry/ZBnFnXmhD8vwgMZ2lTgUWwlrvlgN+fAtYKnwFO2G3BOCFw96Nm8So9sjTda9CCZ3dhoH57F/hVMBB0K6xhklAc0b5ZxUpCIN92v/w+xZoz1XQBHe8ZbRHaP1HpRM4M7DJk2G5cgUCyu3UBvYS41sHvzrxQ3z7vIePRA4WF4bEkfX12gvny0RsPkrbVMXX1Rj9t6V7QXrbPYBAO+43JvDGYawxYVvLhz+BJ45x50GFQmHszfY3BR9TPK8xmMmQwtIvLu1PMttNCs7niCYkSiUv2sc2mlq1i3IashGkkgmo="
    ],
    "n": "yeNlzlub94YgerT030codqEztjfU_S6X4DbDA_iVKkjAWtYfPHDzz_sPCT1Axz6isZdf3lHpq_gYX4Sz-cbe4rjmigxUxr-FgKHQy3HeCdK6hNq9ASQvMK9LBOpXDNn7mei6RZWom4wo3CMvvsY1w8tjtfLb-yQwJPltHxShZq5-ihC9irpLI9xEBTgG12q5lGIFPhTl_7inA1PFK97LuSLnTJzW0bj096v_TMDg7pOWm_zHtF53qbVsI0e3v5nmdKXdFf9BjIARRfVrbxVxiZHjU6zL6jY5QJdh1QCmENoejj_ytspMmGW7yMRxzUqgxcAqOBpVm0b-_mW3HoBdjQ",
    "e": "AQAB",
    "kid": "NjVBRjY5MDlCMUIwNzU4RTA2QzZFMDQ4QzQ2MDAyQjVDNjk1RTM2Qg",
    "x5t": "NjVBRjY5MDlCMUIwNzU4RTA2QzZFMDQ4QzQ2MDAyQjVDNjk1RTM2Qg"
  }
]}
```

::: note
Currently Auth0 only supports a single JWK for signing, however it is important to assume this endpoint could contain multiple JWKs. As an example, multiple keys can be found in the JWKS when rotating signing certificates.
:::

The example JWKS above contains a single key. Each property in the key is defined by the JWK specification [RFC 7517 Section 4](https://tools.ietf.org/html/rfc7517#section-4). We will use these properties to determine which key was used to sign the JWT. Here is a quick breakdown of what each property represents:

* **alg**: is the algorithm for the key
* **kty**: is the key type
* **use**: is how the key was meant to be used. For the example above sig represents signature.
* **x5c**: is the x509 certificate chain
* **e**: is the exponent for a standard pem
* **n**: is the modulus for a standard pem
* **kid**: is the unique identifier for the key
* **x5t**: is the thumbprint of the x.509 cert (SHA-1 thumbprint)

## Verifying a JWT using the JWKS endpoint

We discussed verifying a JWT in detail in [Verify Access Tokens](/api-auth/tutorials/verify-access-token), so will not go into much detail in this document. One of the steps when verifying a JWT is to [verify the signature](/api-auth/tutorials/verify-access-token#verify-the-signature). 

When verifying a JWT using a JWKS, here are the high level steps you will need to follow:

* Retrieve the JWKS and filter for potential signing keys.
* Extract the JWT from the request's authorization header.
* Decode the JWT and grab the `kid` property from the header.
* Find the signing key in the filtered JWKS with a matching `kid` property.
* Using the `x5c` property build a certificate which will be used to verify the JWT signature.

## Using the JWKS in your application to verify a JWT

Due to the fact that there are such a wide range of technologies being used by our customers, going into detail of the actual implementation of verifying a JWT using a JWKS is beyond the scope of this document.

However, here are some resources which will assist you:

1. When building an API, our [Backend / API Quickstarts](/quickstart/backend) show how to implement signature verification for many different platforms. This is typically done by some form of middleware which is available on the particular platform.
1. To manually verify a token's signature, you can use one of the libraries listed in the Libraries for Token Signing/Verification section of [JWT.io](https://jwt.io/). Refer to the documentation of the relevant library for the exact implementation details.
1. Our blog post [Navigating RS256 and JWKS](https://auth0.com/blog/navigating-rs256-and-jwks/) shows a sample implementation using Node.js.
