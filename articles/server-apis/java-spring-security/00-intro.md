---
title: Introduction
name: Introduction to the Quickstart, and configuring environment
budicon: 715
---

This quickstart will guide you through the various tasks related to using Auth0-issued JSON Web Tokens to secure your Java Spring Security API.


## Sample

The final project is also available in the [Sample repository](https://github.com/auth0-samples/auth0-spring-security-api-sample).

<%= include('../../_includes/_new_app') %>


## Setup dependencies

You need to add the `auth0-spring-security-api` dependency.

If you are using Maven, add the dependency to your `pom.xml`:

${snippet(meta.snippets.dependencies)}

If you are using Gradle, add it to the dependencies block:

${snippet(meta.snippets.dependenciesGradle)}

## Configure your Spring Security API

Your Spring Security API needs some information in order to authenticate against your Auth0 account. We have created a file for you but you may need to update some of the entries with the valid values for your API. The file is `/src/main/resources/auth0.properties` and it contains the following:

${snippet(meta.snippets.setup)}

Let's see what each attribute means.

| Attribute | Description|
| --- | --- |
| `auth0.issuer` | The issuer of the JWT Token. This is typically your auth0 domain with a `https://` prefix and a `/` suffix. For example, if your `auth0.domain` is `example.auth0.com` then the `auth0.issuer` should be set to `https://example.auth0.com/` (the trailing slash is important). |
| `auth0.apiAudience` | The unique identifier for your API. You can find the correct value on the [APIs](${manage_url}/#/apis) section of the Dashboard. * |

**NOTE**: If you download the seed project using our **Download Sample** button then the `issuer` attribute will be populated for you, unless you are not logged in or you do not have at least one registered client. Do not forget to manually set the `apiAudience` attribute!


That's all you need to start working with Auth0 in your Spring Security API!
