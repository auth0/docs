---
title: Overview
editUrl: 'https://github.com/auth0/docs/edit/auth0lab/articles/auth0lab/verifiable-credentials/overview.md'
breadcrumbs:
  - title: Auth0 Lab
    url: /docs/auth0lab
  - title: Verifiable Credentials
    url: /docs/auth0lab/verifiable-credentials/overview
  - title: Overview
    url: /docs/auth0lab/verifiable-credentials/overview
topics:
  - auth0lab
  - verifiable-credentials
  - verifiable-presentations
contentType: how-to
useCase: auth0lab
navigationIndex: 0
---

We are all used to physical credentials, driver licenses, passports, credit cards, etc. They all have data (claims) made by an issuer (driver’s license government authority, state department, bank) about a subject. Verifiable Credentials (VCs) are digital, cryptographically verifiable versions of these credentials. This means they can be stored on digital devices, and you can use cryptography to verify their data.

Here are the key parts of a Verifiable Credential:

* __Holder:__ the entity that controls the credential, most often this is the Subject
* __Subject:__ the entity which claims are made about
* __Issuer:__ the entity that created the credential
* __Claims:__ attributes about the Subject that the Issuer is asserting
* __Proofs (signature):__ cryptographic mechanism for establishing authorship and validity

### Verifiable Credential Lifecycle

A typical Verifiable Credential life cycle follows a sequence similar to the following:

1. A user (often the Subject) requests or is given a credential from an Issuer.
2. The Issuer includes data about the Subject in a digital credential, including the Subject's identifier.
3. The Issuer signs the VC with its private key.
4. The user receives the VC and stores it in a digital wallet, becoming the Holder. The digital wallet allows users to store and present VCs of any type.
5. Later, the Holder encounters an application that wants to verify that the Holder has a particular VC. The Holder uses the digital wallet to present the credential to the Verifier, and signs a Verifiable Presentation (VP) with the Holder’s private key.
6. The Verifier cryptographically verifies the VP (it was signed by the Holder and original VC signed by the Issuer) and checks its validity (for example, it hasn't expired). It obtains the Holder and Issuer public keys from a Verifiable Data Registry.
7. __(Optional)__ Finally, for any number of reasons the Issuer MAY revoke the credential, or the credential MAY expire (e.g. Past an expiration date).

You can find a more in depth explanation and visual presentation of verifiable credentials at [verifiablecredentials.dev](https://verifiablecredentials.dev/).

### Walkthrough Articles

In the following articles, you will experience Verifiable Credentials from the end user and developer perspectives.

* [Use Credentials as a user](/auth0lab/verifiable-credentials/end-user-experience):
  * __Obtain a Credential:__ Using a developer wallet that the Auth0 Lab team has set up, you will obtain a vaccine card from a sample institution.
  * __Present a Credential:__ Using a tool developed by Auth0 Lab to request specific types of credentials, you will request your vaccine card from the developer wallet.
* [Issue credentials](/auth0lab/verifiable-credentials/issue-credentials): Using the Auth0 Lab instance, you will set up a tenant as a credential issuer.
* [Verify credentials](/auth0lab/verifiable-credentials/verify-credentials): Using the Auth0 Lab instance, you will set up a tenant as a credential verifier.

::: note
If you encounter any issues, please raise them to the Auth0 Labs team by heading to our [Discord server](https://auth0lab.com/chat).
:::

### Next Steps

1. Visit [verifiablecredentials.dev](https://verifiablecredentials.dev/) to get a quick overview of verifiable credentials with potential use cases.
2. Try the [Walkthrough Articles](#walkthrough-articles).
3. Join the conversation at our [Discord server](https://auth0lab.com/chat).
