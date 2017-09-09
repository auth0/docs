---
description: Auth0 Configuration for the SPA + API architecture scenario
toc: true
---

# SPA + API: Auth0 Configuration

In this section we will review all the configurations we need to apply at the [Auth0 Dashboard](${manage_url}).

## Create the API

Navigate to the [APIs section](${manage_url}/#/apis) of the dashboard, and click the **Create API** button.

You will be asked to supply the following details for your API:

- __Name__: a friendly name for the API. Does not affect any functionality.
- __Identifier__: a unique identifier for the API. We recommend using a URL but note that this doesn't have to be a publicly available URL, Auth0 will not call your API at all. This value cannot be modified afterwards.
- __Signing Algorithm__: the algorithm to sign the tokens with. The available values are `HS256` and `RS256`. When selecting RS256 the token will be signed with the tenant's private key. For more details on the signing algorithms see the [Signing Algorithms paragraph](#signing-algorithms) below.

![Create API](/media/articles/architecture-scenarios/spa-api/create-api.png)

Fill in the required information and click the **Create** button.

## Signing Algorithms

When you create an API you have to select the algorithm your tokens will be signed with. The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

::: note
The signature is part of a JWT. If you are not familiar with the JWT structure please refer to: [JSON Web Tokens (JWTs) in Auth0](/jwt#what-is-the-json-web-token-structure-).
:::

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that. That algorithm, which is part of the JWT header, is the one you select for your API: `HS256` or `RS256`.

- __RS256__ is an [asymmetric algorithm](https://en.wikipedia.org/wiki/Public-key_cryptography) which means that there are two keys: one public and one private (secret). Auth0 has the secret key, which is used to generate the signature, and the consumer of the JWT has the public key, which is used to validate the signature.

- __HS256__ is a [symmetric algorithm](https://en.wikipedia.org/wiki/Symmetric-key_algorithm) which means that there is only one secret key, shared between the two parties. The same key is used both to generate the signature and to validate it. Special care should be taken in order for the key to remain confidential.

The most secure practice, and our recommendation, is to use __RS256__. Some of the reasons are:

- With RS256 you are sure that only the holder of the private key (Auth0) can sign tokens, while anyone can check if the token is valid using the public key.
- Under HS256, If the private key is compromised you would have to re-deploy the API with the new secret. With RS256 you can request a token that is valid for multiple audiences.
- With RS256 you can implement key rotation without having to re-deploy the API with the new secret.

::: note
For a more detailed overview of the JWT signing algorithms refer to: [JSON Web Token (JWT) Signing Algorithms Overview](https://auth0.com/blog/json-web-token-signing-algorithms-overview/).
:::

## Configure the Scopes

Once the client has been created you will need to configure the Scopes which clients can request during authorization.

In the settings for your API, go to the **Scopes** tab. In this section you can add all four of the scopes which was discussed before, namely `read:timesheets`, `create:timesheets`, `delete:timesheets`, `approve:timesheets`.

![Add Scopes](/media/articles/architecture-scenarios/spa-api/add-scopes.png)

## Create the Client

There are four client types in Auth0: __Native__ (used by mobile or desktop apps), __Single Page Web Applications__, __Regular Web Applications__ and __Non Interactive Clients__ (used by CLIs, Daemons, or services running on your backend). For this scenario we want to create a new Client for our SPA, hence we will use Single Page Application as the client type.

To create a new Client, navigate to the [dashboard](${manage_url}) and click on the [Clients](${manage_url}/#/clients}) menu option on the left. Click the __+ Create Client__ button.

Set a name for your Client (we will use `Timesheets SPA`) and select `Single Page Web Applications` as the type.

Click __Create__.

![Create Client](/media/articles/architecture-scenarios/spa-api/create-client.png)

That's it for now. When we are done with the SPA implementation we will revisit the dashboard and this Client's settings to make some changes in its configuration.

<%= include('./_stepnav', {
 prev: ["1. Solution Overview", "/architecture-scenarios/application/spa-api/part-1"], next: ["3. API + SPA Implementation", "/architecture-scenarios/application/spa-api/part-3"]
}) %>