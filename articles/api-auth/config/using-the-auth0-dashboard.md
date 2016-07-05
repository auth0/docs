---
description: How to enable API Authorization on the Auth0 dashboard. 
---

# API Authorization: Using the Auth0 Dashboard
<%=include('../_preview-warning') %>

1. Open the [Auth0 Dashboard](${uiURL}) and browse to the Clients section.

2. Create a new client of type **Non Interactive** for each of the applications that will consume the API you want to generate access tokens for.

3. Navigate to the API section and create a new API by entering a friendly name and identifier (this will be the public endpoint of the API). This API will be represented by your **Resource Server**.

  The selection of the **Signing Algorithm** will dictate how the API will validate the access tokens it receives:
  * HS256 (symmetric): signed using the resource server's signing secret
  * RS256 (asymmetric): signed using Auth0's private key for your account. Verification is done using the corresponding public key, which can be found at the following standard [JWKS (JSON Web Key set)](https://self-issued.info/docs/draft-ietf-jose-json-web-key.html) URL: https://${account.namespace}/.well-known/jwks.json

  ![](/media/articles/api-auth/apis-create.png)

  **NOTE:** There will already be an **Auth0 Management API** that represents Auth0's APIv2. You can authorize client applications to request tokens from this API as well.

4. (Optional) Define some scopes by browsing to the **Scopes** tab. A scope is a claim that may be issued as part of the access token. With this information, the API can enforce fine-grained authorization.

  ![](/media/articles/api-auth/apis-scope-tab.png)

5. Authorize a consumer client. Under the **Non Interactive Clients** tab, you can authorize your clients that will be the consumers of the API. This will create a `client grant` for each client and will allow you to generate access tokens for these clients to call your API. Optionally, you can select a subset of scopes to be granted to this client as part of the access token. Scopes allow the API to enforce fine-grained authorization.

  ![](/media/articles/api-auth/apis-authorize-client-tab.png)

6. Setup your API to accept access tokens. The **Quickstart** tab provides you with code snippets for different languages and will guide you through bootstrapping your API, depending on the selected **Signing Algorithm**.

You can now request access tokens for your API from Auth0. For details on generating access tokens, see [API Authorization: Asking for Access Tokens](/api-auth/config/asking-for-access-tokens) .
