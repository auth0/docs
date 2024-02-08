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

## Auth0 as Issuer

The **OpenID Connect for Verifiable Credential Issuance** specification defines an API designated as Credential Endpoint and corresponding OAuth-based authorization mechanisms for issuance of verifiable credentials.

This allows existing OAuth deployments and OpenID Connect OPs (like Auth0) to extend their service and become credential issuers. It also allows new applications built using Verifiable Credentials to utilize OAuth and OpenID Connect as integration and interoperability layer.

#### Supported Standards

-  Specification Draft: [OpenID Connect for Verifiable Credential Issuance v1.0-05](https://openid.net/specs/openid-connect-4-verifiable-credential-issuance-1_0-05.html)
-  Data Model: [Verifiable Credentials Data Model v1.1](https://www.w3.org/TR/vc-data-model/)
-  Credential Format:
    - [jwt_vc](https://www.w3.org/TR/vc-data-model/#json-web-token) which uses [RFC7515 - JWS](https://datatracker.ietf.org/doc/html/rfc7515)
    - _[WIP]_ [ldp_vc](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-vc-secured-using-data-integ) which uses [Verifiable Credential Data Integrity 1.0](https://w3c.github.io/vc-data-integrity/)
-  Decentralized identifier of the issuer: [did:web](https://github.com/w3c-ccg/did-method-web) (did:web:{TENANT}.auth0lab.com)
-  Supported DID methods for users: [did:ethr](https://github.com/decentralized-identity/ethr-did-resolver/blob/master/doc/did-method-spec.md), [did:ion](https://identity.foundation/ion/), [did:key](https://w3c-ccg.github.io/did-method-key/), [did:web](https://github.com/w3c-ccg/did-method-web)
-  Status List: _[WIP]_ [Verifiable Credential Status List 2021](https://w3c-ccg.github.io/vc-status-list-2021/)
-  DID to origin relationship: [Well Known DID Configuration](https://identity.foundation/.well-known/resources/did-configuration)


## Auth0 as Verifier

The **OpenID Connect for Verifiable Presentations** specification extends OpenID Connect with support for presentation of claims via Verifiable Credentials.

This allows existing relying parties to extend their reach towards claims sources asserting claims in this format. It also allows new applications built using verifiable credentials to utilize OpenID Connect as integration and interoperability layer towards credential holders.

The specification enables requesting and delivery of verifiable presentations in conjunction with Self-Issued OpenID Providers (SIOPv2) as well as traditional OpenID Providers.

#### Supported standards:

-  Transportation: [First Implementer’s Draft of OpenID for Verifiable Presentations (OpenID4VP ID1)](https://openid.net/specs/openid-connect-4-verifiable-presentations-1_0-ID1.html)
-  Key Management and Authentication: [First Implementer’s Draft of Self-Issued OpenID Connect Provider v2 (SIOPv2 ID1)](https://openid.net/specs/openid-connect-self-issued-v2-1_0-ID1.html)
-  Data Model: [Verifiable Credentials Data Model v1.1](https://www.w3.org/TR/vc-data-model/)
-  Credential Format:
    - [jwt_vc](https://www.w3.org/TR/vc-data-model/#json-web-token) which uses [RFC7515 - JWS](https://datatracker.ietf.org/doc/html/rfc7515)
    - _[WIP]_ [ldp_vc](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-vc-secured-using-data-integ) which uses [Verifiable Credential Data Integrity 1.0](https://w3c.github.io/vc-data-integrity/)
-  Decentralized identifier of the verifier: [did:web](https://github.com/w3c-ccg/did-method-web) _(did:web:{TENANT}.auth0lab.com)_
-  Query language: Presentation Exchange [v1.0](https://identity.foundation/presentation-exchange/spec/v1.0.0/) and [v2.0](https://identity.foundation/presentation-exchange/spec/v2.0.0/)
-  Supported DID methods for verifiable credentials and presentations: [did:ethr](https://github.com/decentralized-identity/ethr-did-resolver/blob/master/doc/did-method-spec.md), [did:ion](https://identity.foundation/ion/), [did:key](https://w3c-ccg.github.io/did-method-key/), [did:web](https://github.com/w3c-ccg/did-method-web)


## Supported signature algorithms

| Key type  | JWT algorithm                                           | JSON-LD Data Integrity                                                                   |
|-----------|---------------------------------------------------------|------------------------------------------------------------------------------------------|
| Ed25519   | [EdDSA](https://datatracker.ietf.org/doc/html/rfc8037)  | [Ed25519VerificationKey2018](https://w3c-ccg.github.io/lds-ed25519-2018/)                |
| secp256k1 | [ES256K](https://datatracker.ietf.org/doc/html/rfc8812) | [EcdsaSecp256k1VerificationKey2019](https://w3c-ccg.github.io/lds-ecdsa-secp256k1-2019/) |


