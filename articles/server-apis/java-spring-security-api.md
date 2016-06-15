---
title: Auth0 Java Spring Security API SDK Tutorial
description: This tutorial will show you how to use the Auth0 Java Spring Security API SDK to add authentication and authorization to your API.
name: Java Spring Security API
thirdParty: false
alias:
  - spring security
  - spring
languages:
  - Java
framework:
  - Spring
image: /media/platforms/spring.png
tags:
  - quickstart
snippets:
  configure: server-apis/java-spring-security-api/configure
  dependencies: server-apis/java-spring-security-api/dependencies
  dependenciesGradle: server-apis/java-spring-security-api/dependencies-gradle
  setup: server-apis/java-spring-security-api/setup
  use: server-apis/java-spring-security-api/use
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

If you have an existing application, please follow the steps below.

### 1. Add Auth0 Spring Security API dependency

You need to add the `auth0-spring-security-api` dependency.

If you are using maven, add the dependency to your `pom.xml`:

${snippet(meta.snippets.dependencies)}

If you are using Gradle, add it to the dependencies block:

${snippet(meta.snippets.dependenciesGradle)}

### 2. Configure Spring to use Auth0

Add these annotations to your application class:

${snippet(meta.snippets.configure)}

Once you've done either of those, then create the `auth0.properties` file with the following information:

${snippet(meta.snippets.setup)}

The `auth0.securedRoute` is a URL pattern that should map to the URL endpoint you wish to secure. You should replace `/secured/**` with the correct value for your implementation.

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