---
title: Auth0 Java Spring Security SDK API Tutorial
description: This tutorial will show you how to use the Auth0 Java Spring Security SDK to add authentication and authorization to your API.
name: Spring Security Java API
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
  configure: server-apis/java-spring-security/configure
  dependencies: server-apis/java-spring-security/dependencies
  dependenciesGradle: server-apis/java-spring-security/dependencies-gradle
  setup: server-apis/java-spring-security/setup
  use: server-apis/java-spring-security/use
---

## Java API Tutorial

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

### 1. Add Auth0 Spring Security dependency

You need to add the `spring-security-auth0` dependency.

For that, you can just add it to your `pom.xml` if you're using maven.

${snippet(meta.snippets.dependencies)}

Or, if you're using Gradle, add it to the dependencies block:

${snippet(meta.snippets.dependenciesGradle)}

### 2. Configure Spring to use Auth0

Now you need to configure Spring to use Spring Security with Auth0.

For that, just add the following to the `application-context.xml`

```xml
<!--  Use default Auth0 security context -->
<import resource="classpath:auth0-security-context.xml" />

<!-- Scan for spring annotated components from Auth0 -->
<context:component-scan base-package="com.auth0"/>

<!-- Read auth0.properties file -->
<context:property-placeholder location="classpath:auth0.properties" />
```

Or, alternately, add these annotations to your application class:

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

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!

### Optional Steps
#### Configure CORS

In order to configure CORS, just add the following `Filter` for all your requests:

```java

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

@Component
public class SimpleCORSFilter implements Filter {

  public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
    HttpServletResponse response = (HttpServletResponse) res;
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    response.setHeader("Access-Control-Max-Age", "3600");
    response.setHeader("Access-Control-Allow-Headers", "Authorization");
    chain.doFilter(req, res);
  }

  public void init(FilterConfig filterConfig) {}

  public void destroy() {}
```
