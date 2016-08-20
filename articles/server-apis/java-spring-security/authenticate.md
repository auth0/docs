---
title: Authenticate
description: This tutorial will show you how to use the Auth0 Java Spring Security SDK to add authentication and authorization to your API.
---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Java 1.7
* Maven 3.3
* Spring 4.2.4
* Spring Security 4.0.1
:::

<%= include('../../_includes/_package', {
githubUrl: 'https://github.com/auth0-samples/auth0-spring-security-api-sample',
pkgOrg: 'auth0-samples',
pkgRepo: 'auth0-spring-security-api-sample',
pkgBranch: 'master',
pkgPath: null,
pkgFilePath: null,
pkgType: 'none'
}) %>

If you have an existing application, please follow the steps below. You can find some useful information on our [GitHub library](https://github.com/auth0/auth0-spring-security-api).

### 1. Add Auth0 Spring Security API dependency

You need to add the `auth0-spring-security-api` dependency.

If you are using maven, add the dependency to your `pom.xml`:

${snippet(meta.snippets.dependencies)}

If you are using Gradle, add it to the dependencies block:

${snippet(meta.snippets.dependenciesGradle)}

### 2. Configure Spring to use Auth0

Add these annotations to your application class:

${snippet(meta.snippets.configure)}

Create a file called `auth0.properties` and place this under `src/main/resources`. Set the following settings:

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

**NOTE**: If you download the seed using our **Download Sample** button then the `domain`, `clientId` and `clientSecret` attributes will be populated for you, unless you are not logged in or you do not have at least one registered client. In any case you should verify that the values are correct if you have multiple clients in your account and you might want to use another than the one we set the information for. Do not forget to manually set the `issuer` attribute!

**NOTE**: If you are using the default library configuration (not overriding with your own) which just secures a single, specific context path then the `auth0.securedRoute` value is important. However, if you are building an application which may have several different secured endpoints, or you don't want to specify an explicit configuration value in this `.properties` file then just set `auth0.securedRoute` to something that signifies this. Perhaps `auth0.securedRoute: UNUSED`. Then just ignore the `securedRoute` entirely when you specify your own configuration. See the section [Extending Auth0SecurityConfig](https://github.com/auth0/auth0-spring-security-api#extending-auth0securityconfig) for further info. This property value is a convenience for the developer to configure an endpoint by context path (.eg all URLS with `/api/v1/` in their context path), but there is no obligation to actually reference this property in your own `HttpSecurity` configuration.


### 3. Create the controllers

Now, you can create the controllers. Every controller that has a route inside `/secured/` will ask for the JWT.

${snippet(meta.snippets.use)}

### 4. Call Your API

You can now make requests against your secure API by providing the Authorization header in your requests with a valid JWT [id_token](/tokens#auth0-id_token-jwt-).

```har
{
"method": "GET",
"url": "http://localhost:8000/path_to_your_api",
"headers": [
{ "name": "Authorization", "value": "Bearer YOUR_ID_TOKEN_HERE" }
]
}
```

Before making the request you should replace the port (`8000`) with the one on which your app is listening.

### 5. You're done!

You have configured your Java Spring Security API to use Auth0. Congrats, you're awesome!
