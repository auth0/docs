---
title: Auth0 Java Spring Security API SDK Tutorial
description: This tutorial will show you how to use the Auth0 Java Spring Security API SDK to add authentication and authorization to your API.
name: Auth0 Java Spring Security API
thirdParty: false
alias:
  - spring security
  - spring
languages:
  - Java
framework:
  - Spring
image: /media/platforms/java.png
tags:
  - quickstart
snippets:
  configure: server-apis/java-spring-security-api/configure
  dependencies: server-apis/java-spring-security-api/dependencies
  setup: server-apis/java-spring-security-api/setup
  use: server-apis/java-spring-security-api/use
---

## Java Spring Security API Tutorial

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Java 1.8
* Maven 3.3
* Spring 4.2.4
* Spring Security 4.0.1
:::

<%= include('../_includes/_package', {
  pkgRepo: 'auth0-spring-security-api',
  pkgBranch: 'master',
  pkgPath: 'examples/auth0-spring-security-api-sample',
  pkgFilePath: 'examples/auth0-spring-security-api-sample/src/main/resources/auth0.properties',
  pkgType: 'replace'
}) %>

**If you have an existing application, please follow the steps below.**

### 1. Add Auth0 Spring Security API dependency

You need to add the `auth0-spring-security-api` dependency.

For that, you can just add it to your `pom.xml` if you're using maven.

${snippet(meta.snippets.dependencies)}

Or, if you're using Gradle, add it to the dependencies block:

${snippet(meta.snippets.dependenciesGradle)}

### 2. Configure Spring to use Auth0

Add these annotations to your application class:

${snippet(meta.snippets.configure)}

Once you've done either of those, then create the `auth0.properties` file with the following information:

${snippet(meta.snippets.setup)}

### 3. Create the controllers

Now, you can create the controllers. Every controller that has a route inside `/secured/` in this case will ask for the JWT

${snippet(meta.snippets.use)}

### 4. Call Your API

You can now make requests against your secure API by providing the Authorization header in your requests with a valid JWT id_token.
```har
{
"method": "GET",
"url": "http://localhost:8000/path_to_your_api",
"headers": [
{ "name": "Authorization", "value": "Bearer YOUR_ID_TOKEN_HERE" }
]
}
```

### 5. You're done!
