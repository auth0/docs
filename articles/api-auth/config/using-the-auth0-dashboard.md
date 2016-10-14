---
description: How to enable API Authorization on the Auth0 dashboard.
---

# Setting up a Client Credentials Grant using the Management Dashboard

1. Open the Auth0 Management Dashboard and browse to the [Clients section](${manage_url}/#/clients).

2. Create a new client of type **Non Interactive** for each of the applications that will consume the API you want to generate access tokens for.

![](/media/articles/api-auth/create-client.png)

3. Navigate to the [API section](${manage_url}/#/apis) and create a new API.

::: panel-info Enable APIs Section
If you can't see the *APIs* tab in the left hand menu of the dashboard then you will have to enable it.
Navigate to your [Account Advanced Settings](${manage_url}/#/account/advanced), scroll down to the *Settings* section and toggle the **Enable APIs Section** switch.

![Toggle switch to enable APIs section](/media/articles/api-auth/enable-apis-section.png)

You should now see the [API section](${manage_url}/#/apis).
:::

Enter a friendly name and an identifier. Ideally, this identifier should be the public endpoint of the API, but any valid URN is acceptable. This API will be represented by your **Resource Server**.

The selection of the **Signing Algorithm** will dictate how the API will validate the access tokens it receives:
* HS256 (symmetric): signed using the resource server's signing secret
* RS256 (asymmetric): signed using Auth0's private key for your account. Verification is done using the corresponding public key, which can be found at the following standard [JWKS (JSON Web Key set)](https://self-issued.info/docs/draft-ietf-jose-json-web-key.html) URL: [https://${account.namespace}/.well-known/jwks.json](https://${account.namespace}/.well-known/jwks.json)

![](/media/articles/api-auth/apis-create.png)

**NOTE:** There will already be an **Auth0 Management API** that represents Auth0's APIv2. You can authorize client applications to request tokens from this API as well.

4. (Optional) Define some scopes by browsing to the **Scopes** tab. A scope is a claim that may be issued as part of the access token. With this information, the API can enforce fine-grained authorization.

  ![](/media/articles/api-auth/apis-scope-tab.png)

5. Authorize a consumer client. Under the **Non Interactive Clients** tab, you can authorize your clients that will be the consumers of the API. This will create a `client grant` for each client and will allow you to generate access tokens for these clients to call your API. Optionally, you can select a subset of scopes to be granted to this client as part of the access token. Scopes allow the API to enforce fine-grained authorization.

  ![](/media/articles/api-auth/apis-authorize-client-tab.png)

6. Setup your API to accept access tokens. The **Quickstart** tab provides you with code snippets for different languages and will guide you through bootstrapping your API, depending on the selected **Signing Algorithm**.
