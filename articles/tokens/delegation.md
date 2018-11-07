---
description: This page explains an overview about Auth0 delegation tokens.
topics:
  - tokens
  - delegation
contentType:
  - how-to
  - concept
useCase:
  - invoke-api
---

# Delegation Tokens

::: warning
With [the latest Auth0 authentication pipeline](/api-auth/intro), delegation tokens should not be used to exchange an ID Token issued to one application for a new one issued to a different application, or to get a new ID Token. See the [migration notice](/migrations#api-authorization-with-third-party-vendor-apis) for more information.
:::

A delegation token should be obtained and used when an application needs to call the API of an Application Addon, such as Firebase or SAP, registered and configured in Auth0, in the same tenant as the calling program.

Given an existing token, this endpoint will generate a new token signed with the `target` application's secret. This is used to flow the identity of the user from the application to an API.

The type of the delegation token will vary depending on the by provider. For example, if issued for Azure Blob Storage, it will be a SAS (Shared Access Signature). If it is for the Firebase Addon, it will be a JWT.

## How to get a delegation token

The ID Token for an authenticated user can be used with the [Delegation endpoint](/api/authentication#delegation) to request a delegation token for a particular target. The target can be an application Addon configured in Auth0. The Addons for which this can be done are those that are not SAML or WS-Fed Addons and the Addon must be configured in Auth0 with secrets obtained from the Addon service, such as Firebase. Instructions for setting up the secrets are available from the Addon configuration page for each Addon. The secrets are used to sign the delegation token so that the Addon API can validate and trust the token.

The delegation endpoint allows the setting of several parameters which will govern the contents of the delegation token, including the `target`, the `scope`, the API to be called (`api_type`) and an additional free-form area for additional parameters.

See the [Delegation endpoint](/api/authentication#delegation) for more information.

### Auth0.js Example

For an example on how to get a new token for an addon that you have activated, using __Auth0.js__, refer to [Delegation Token Request](/libraries/auth0js/v7#delegation-token-request). Note that this example is for **version 7** of the __Auth0.js__ library; delegation is **not supported** in version 8 of __Auth0.js__.

## Validity Period and Termination

The validity period and the ability to revoke a delegation token, varies by individual Addon. The documentation available from the provider of any Addon API should be consulted for further information.

## Using Delegation Tokens with Public Applications

There is an important caveat to note when using the delegation endpoint with [Public Applications](/applications/application-types#public-applications).

If you call the [Token endpoint](/api/authentication#get-token) from a Public Application, the ID Token will be forcibly signed using `RS256`, even if the _JsonWebToken Signature Algorithm_ in the Application settings is configured as `HS256`.

If you then subsequently call the delegation endpoint with that ID Token, it will fail if the Application's _JsonWebToken Signature Algorithm_ was configured as `HS256`. This is because delegation performs validation according to the Application's settings, but the ID Token was issued with a different algorithm because of the forced algorithm change.

It is therefore important that if you intend to use delegation with a Public Application, that you configure the _JsonWebToken Signature Algorithm_ of your application as `RS256`.
