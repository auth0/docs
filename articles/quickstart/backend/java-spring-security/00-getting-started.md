---
title: Getting Started
name: Introduction to the Quickstart and configuring the environment
budicon: 715
---

This quickstart will guide you through the various tasks related to using Auth0-issued JSON Web Tokens to secure your Java Spring Security API.

## Sample

The final project is also available in the [sample repository](https://github.com/auth0-samples/auth0-spring-security-api-sample).

<%= include('../../../_includes/_new_app') %>

## Create an API

Create a new API by accessing the [APIs section](${manage_url}/#/apis) of the dashboard.
Type a name and an identifier, which will represent the `auth0.apiAudience` value that you have to set in the configuration file. Next, choose the signing algorithm. Click the **Create** button and you'll be redirected to the API you've just created. In the **Settings** tab you can change the token expiration and allow refreshing a token for that API.

The example API in this tutorial will be centered around a **Photos** resource. Create some custom scopes to limit the access to the `PhotosController` which will be created in the next section. In the API screen, click the **Scopes** tab and add the following scopes: `create:photos`, `read:photos`, `update:photos` and `delete:photos`.

![](/media/articles/server-apis/java-spring-security/add-api-scopes.png)

## Install the Dependencies

Add the `auth0-spring-security-api` dependency.

If you are using Maven, add the dependency to your `pom.xml`:

${snippet(meta.snippets.dependencies)}

If you are using Gradle, add it to the dependencies block:

${snippet(meta.snippets.dependenciesGradle)}

## Configure your Spring Security API

Your Spring Security API needs some information in order to authenticate against your Auth0 account. The downloadable sample comes with a configration file already in place but you may need to update some of the entries with the valid values for your API. The file is `/src/main/resources/auth0.properties` and it contains the following:

${snippet(meta.snippets.setup)}

| Attribute | Description|
| --- | --- |
| `auth0.issuer` | The issuer of the JWT Token. This is typically your auth0 domain with a `https://` prefix and a `/` suffix. For example, if your `auth0.domain` is `example.auth0.com` then the `auth0.issuer` should be set to `https://example.auth0.com/` (the trailing slash is important). |
| `auth0.apiAudience` | The unique identifier for your API. You can find the correct value on the [APIs](${manage_url}/#/apis) section of the Dashboard. * |

::: note
If you download the seed project using our **Download Sample** button then the `issuer` attribute will be populated for you, unless you are not logged in or you do not have at least one registered client. Do not forget to manually set the `apiAudience` attribute.
:::
