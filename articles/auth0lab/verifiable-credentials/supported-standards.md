---
title: Supported Standards
editUrl: 'https://github.com/auth0/docs/edit/auth0lab/articles/auth0lab/verifiable-credentials/supported-standards.md'
breadcrumbs:
  - title: Auth0 Lab
    url: /docs/auth0lab
  - title: Verifiable Credentials
    url: /docs/auth0lab/verifiable-credentials/overview
  - title: Supported Standards
    url: /docs/auth0lab/verifiable-credentials/supported-standards
topics:
  - auth0lab
  - verifiable-credentials
  - verifiable-presentations
contentType: how-to
useCase: auth0lab
interpolate_es: false
navigationIndex: 4
---

This document list the supported standards of Verifiable Credentials in the Auth0 Lab instance.

-  [Verifiable Credentials Data Model v1.1](https://www.w3.org/TR/vc-data-model/)
-  Credential Formats
    - [jwt_vc](https://www.w3.org/TR/vc-data-model/#json-web-token) which uses [RFC7515 - JWS](https://datatracker.ietf.org/doc/html/rfc7515)
    - [ldp_vc](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-vc-secured-using-data-integ) which uses [Verifiable Credential Data Integrity 1.0](https://w3c.github.io/vc-data-integrity/)
-  [OpenID for Verifiable Credentials Issuance 1.0](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) for issuance of VCs.
-  [OpenID for Verifiable Credentials Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html) running on top of [Self-Issued OpenID Provider v2 (SIOP)](https://openid.bitbucket.io/connect/openid-connect-self-issued-v2-1_0.html) as the presentation exchange protocol.
-  Decentralized identifier for Auth0's issuers and verifiers [did:web](https://github.com/w3c-ccg/did-method-web).
-  Supported decentralized identifier for Verifiable Credentials and Presentations: [did:web](https://github.com/w3c-ccg/did-method-web), [did:key](https://w3c-ccg.github.io/did-method-key/), [did:ethr](https://github.com/decentralized-identity/ethr-did-resolver/blob/master/doc/did-method-spec.md), [did:ion](https://identity.foundation/ion/).
-  Credentials issued by Auth0 uses (WIP) [Verifiable Credential Status List 2021](https://w3c-ccg.github.io/vc-status-list-2021/)
-  Auth0's issuers support [Well Known DID Configuration](https://identity.foundation/.well-known/resources/did-configuration)

## Supported signature algorithms

| Key type  | JWT algorithm                                           | JSON-LD Data Integrity                                                                   |
|-----------|---------------------------------------------------------|------------------------------------------------------------------------------------------|
| Ed25519   | [EdDSA](https://datatracker.ietf.org/doc/html/rfc8037)  | [Ed25519VerificationKey2018](https://w3c-ccg.github.io/lds-ed25519-2018/)                |
| secp256k1 | [ES256K](https://datatracker.ietf.org/doc/html/rfc8812) | [EcdsaSecp256k1VerificationKey2019](https://w3c-ccg.github.io/lds-ecdsa-secp256k1-2019/) |


