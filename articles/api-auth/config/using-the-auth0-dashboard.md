# API Authorization: Using the Auth0 Dashboard
<%=include('../_preview-warning') %>

1. Open the Auth0 Dashboard and browse to the Clients section.

2. Here you will create a new client of type Non Interactive for each of the applications that will consume the API you want to generate access tokens for.

3. Navigate to the API section and create a new "API" by entering a friendly name and identifier for it (ideally this would be the public endpoint of API). This API will represent your resource server.
The selection of the Signing Algorithm will dictate how the API will validate the access tokens it receives
  * HS256 (symmetric): signed using the resource server's signing secret
  * RS256 (asymmetric): signed using Auth0's private key for your account. Verification is done using the corresponding public key, which can be found at the following standard [JWKS (JSON Web Key set)](https://self-issued.info/docs/draft-ietf-jose-json-web-key.html) URL: https://${account.namespace}/.well-known/jwks.json

![](/media/articles/api-auth/apis-create.png)

> *NOTE:* You will notice that there's an API called _Auth0 Management API_. This API represent Auth0's APIv2. You can authorize client applications to request tokens for this API as well.

4. (Optional) Define some scopes by browsing to the Scopes tab. A scope is a claim that may be issued as part of the access token. With this information the API can enforce fine grained authorization.

![](/media/articles/api-auth/apis-scope-tab.png)

5. Authorize a consumer client. Under the "Non Interactive Clients" tab, you can authorize your clients representing the consumers of the API. This will create a `client grant` for each client and will allow you to generate `access_token`s for them to consume your API. Optionally, you can select a subset of scopes to be granted to this client as part of the `access_token`. Scopes allows consuming API to enforce fine-grained authorization.

![](/media/articles/api-auth/apis-authorize-client-tab.png)

6. Setup your API to accept `access_tokens`. The Quickstart tab will provide you with code snippets for different languages and will guide you on bootstrapping your API depending on the selected Signing Algorithm.

You are now ready to ask Auth0 for `access_tokens` for you API. Navigate [to this separate section](/api-auth/config/asking-for-access-tokens) for details on generating access tokens.
