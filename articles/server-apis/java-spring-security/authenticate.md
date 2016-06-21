---
title: Authenticate
description: This tutorial will show you how to use the Auth0 Java Spring Security SDK to add authentication and authorization to your API.
---

## Java Spring Security API Tutorial

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Java 1.7
* Maven 3.3
* Spring 4.2.4
* Spring Security 4.0.1
:::

You can download the seed project [here](https://github.com/auth0-samples/auth0-spring-security-api-sample).

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

Here is a breakdown of what each attribute means:

- `auth0.domain`: Your auth0 domain (the tenant you have created when registering with auth0).
- `auth0.issuer`: The issuer of the JWT Token (typically full URL of your auth0 tenant account - eg. https://{tenant_name}.auth0.com/).
- `auth0.clientId`: The unique identifier for your application. You can find the correct value on the Settings of your app on [Auth0 dashboard](${uiURL}/#/).
- `auth0.clientSecret`: This secret will be used to sign and validate tokens which will be used in the different authentication flows. With this key your application will also be able to authenticate to some of the API endpoints (eg: to get an access token from an authorization code). You can find the correct value on the Settings of your app on [Auth0 dashboard](${uiURL}/#/).
- `auth0.securedRoute`: The URL pattern that should map to the URL endpoint you wish to secure. You should replace its value with the correct value for your implementation. It should start with `/`. Note, if you are using the default library configuration (not overriding with your own) which just secures a single, specific context path then this value is important. However, if you are building an application which may have several different secured endpoints, or you don't want to specify an explicit configuration value in this `.properties` file then just set the value to something that signifies this. Perhaps `auth0.securedRoute: UNUSED`. Then just ignore the `securedRoute` entirely when you specify your own configuration. See the section [Extending Auth0SecurityConfig](https://github.com/auth0/auth0-spring-security-api#extending-auth0securityconfig) for further info. The takeaway message is that this property value is a convenience for the developer to configure an endpoint by context path (.eg all URLS with `/api/v1/` in their context path), but there is no obligation to actually reference this property in your own `HttpSecurity` configuration.
- `auth0.base64EncodedSecret`: A boolean value indicating whether the Secret used to verify the JWT is `base64` encoded. Default is `true`.
- `auth0.authorityStrategy`: Indicates whether authorization claims against the Principal shall be `GROUPS`, `ROLES` or `SCOPE` based. Default is `ROLES`.
- `auth0.defaultAuth0ApiSecurityEnabled`: A boolean value that switches having the default config enabled. It should be set to `false`.

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
