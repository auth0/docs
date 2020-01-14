---
description: Understand how Auth0 delegation tokens work in Auth0.
topics:
  - tokens
  - delegation
contentType:
  - concept
useCase:
  - invoke-api
---

# Delegation Tokens

<%= include('../../_includes/_uses-delegation') %>

A delegation token should be obtained and used when an application needs to call the API of an Application Add-on, such as Firebase or SAP, registered and configured in Auth0, in the same tenant as the calling program.

Given an existing token, this endpoint will generate a new token signed with the `target` application's secret. This is used to flow the identity of the user from the application to an API.

The type of the delegation token varies depending on the provider. For example, if it is issued for Azure Blob Storage, it will be an SAS (Shared Access Signature). If it is for the Firebase Add-on, it will be a JWT.

The ID Token for an authenticated user can be used with the [Delegation endpoint](/api/authentication#delegation) to request a delegation token for a particular target. The target can be an application Add-on configured in Auth0. The Add-ons for which this can be done are those that are not <dfn data-key="security-assertion-markup-language">SAML</dfn> or WS-Fed Add-ons. The Add-on must be configured in Auth0 with secrets obtained from the Add-on service, such as Firebase. Instructions for setting up the secrets are available from the Add-on configuration page for each Add-on. The secrets are used to sign the delegation token so that the Add-on API can validate and trust the token.

The delegation endpoint allows you to set several parameters which govern the contents of the delegation token including the `target`, the <dfn data-key="scope">`scope`</dfn>, the API to be called (`api_type`), and an additional free-form area for additional parameters.

See the [Delegation endpoint](/api/authentication#delegation) for more information.

## Auth0.js example

For an example on how to get a new token for an Add-on that you have activated, using __Auth0.js__, refer to [Delegation Token Request](/libraries/auth0js/v7#delegation-token-request). Note that this example is for **version 7** of the __Auth0.js__ library; delegation is **not supported** in version 8 of __Auth0.js__.

## Validity period and termination

The validity period and the ability to revoke a delegation token, varies by individual Add-on. The documentation available from the provider of any Add-on API should be consulted for further information.

## Use Delegation Tokens with public applications

There is an important caveat to note when using the delegation endpoint with [Public Applications](/applications/concepts/app-types-confidential-public#public-applications).

If you call the [Token endpoint](/api/authentication#get-token) from a Public Application, the ID Token will be forcibly signed using `RS256`, even if the _JsonWebToken Signature Algorithm_ in the Application settings is configured as `HS256`.

If you then subsequently call the delegation endpoint with that ID Token, it will fail if the Application's _JsonWebToken Signature Algorithm_ was configured as `HS256`. This is because delegation performs validation according to the Application's settings, but the ID Token was issued with a different algorithm because of the forced algorithm change.

It is therefore important that if you intend to use delegation with a Public Application, that you configure the _JsonWebToken Signature Algorithm_ of your application as `RS256`.
