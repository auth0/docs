---
title: Introduction
name: Introduction to the Quickstart, and configuring environment
---

<%= include('../../_includes/_package', {
githubUrl: 'https://github.com/auth0-samples/auth0-spring-security-api-sample',
pkgOrg: 'auth0-samples',
pkgRepo: 'auth0-spring-security-api-sample',
pkgBranch: 'master',
pkgPath: null,
pkgFilePath: null,
pkgType: 'none'
}) %>

This quickstart will guide you through the various tasks related to using Auth0-issued JSON Web Tokens to secure your Java Spring Security API.

## Seed & Samples

If you prefer to follow along with this quickstart you can download the [seed project](https://github.com/auth0-samples/auth0-spring-security-api-sample/00-Starter-Seed). The seed project is just a basic Spring Security API.

The final project after each of the steps is also available in the [Sample repository](https://github.com/auth0-samples/auth0-spring-security-api-sample). You can find the final result for each step in the relevant folder inside the repository.

## Create a Client

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)


## Setup dependencies

You need to add the `auth0-spring-security-api` dependency.

If you are using maven, add the dependency to your `pom.xml`:

${snippet(meta.snippets.dependencies)}

If you are using Gradle, add it to the dependencies block:

${snippet(meta.snippets.dependenciesGradle)}

## Configure your Spring Security API

Your Spring Security API needs some information in order to authenticate against your Auth0 account. We have created a file for you but you may need to update some of the entries with the valid values for your Client. The file is `/src/main/resources/auth0.properties` and it contains the following:

${snippet(meta.snippets.setup)}

Let's see what each attribute means.

| Attribute | Description|
| --- | --- |
| `auth0.domain` | Your auth0 domain. You can find the correct value on the Settings tab of your client on the [dashboard](${uiURL}/#/applications). * |
| `auth0.issuer` | The issuer of the JWT Token. This is typically your auth0 domain with a `https://` prefix and a `/` suffix. For example, if your `auth0.domain` is `example.auth0.com` then the `auth0.issuer` should be set to `https://example.auth0.com/` (the trailing slash is important). |
| `auth0.clientId` | The unique identifier for your client. You can find the correct value on the Settings tab of your client on the [dashboard](${uiURL}/#/applications). * |
| `auth0.clientSecret` | The secret used to sign and validate the tokens that will be used in the different authentication flows. You can find the correct value on the Settings tab of your client on the [dashboard](${uiURL}/#/applications). * |
| `auth0.securedRoute` | The URL pattern that should map to the URL endpoint you wish to secure. You should replace its value with the correct value for your implementation. It should start with `/`. * |
| `auth0.base64EncodedSecret` | A boolean value indicating whether the Secret used to verify the JWT is `base64` encoded. Default is `true`. |
| `auth0.authorityStrategy` | Indicates whether authorization claims against the Principal shall be `GROUPS`, `ROLES` or `SCOPE` based. Default is `ROLES`. |
| `auth0.defaultAuth0ApiSecurityEnabled` | A boolean value that switches having the default config enabled. It should be set to `false`. |
| `auth0.signingAlgorithm: HS256` | Used when you want to use HS256 as a signing algorithm. We will see more on this on the next steps. |
| `#auth0.signingAlgorithm: RS256` | Used when you want to use RS256 as a signing algorithm. We will see more on this on the next steps. |
| `#auth0.publicKeyPath: certificate/cert.pem` | Indicates the certification in case you use RS256. We will see more on this on the next steps. |

**NOTE**: If you download the seed using our **Download Sample** button then the `domain`, `clientId` and `clientSecret` attributes will be populated for you, unless you are not logged in or you do not have at least one registered client. In any case you should verify that the values are correct if you have multiple clients in your account and you might want to use another than the one we set the information for. Do not forget to manually set the `issuer` attribute!


That's all you need to start working with Auth0 in your Spring Security API!
