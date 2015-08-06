---
title: Spring Security Java API Tutorial
name: Spring Security Java API
thirdParty: false
alias:
  - spring security
  - spring
languages:
  - Java
framework:
  - Spring
image: //auth0.com/lib/platforms-collection/img/java.png
lodash: true
tags:
  - quickstart
snippets:
  dependencies: server-apis/java-spring-security/dependencies
  setup: server-apis/java-spring-security/setup
  use: server-apis/java-spring-security/use
---

## Java API Tutorial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="/spring-security-auth0/master/create-package?path=examples/api-example&filePath=examples/api-example/src/main/resources/auth0.properties&type=replace@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
    </a>
  </blockquote>
</div>

**Otherwise, Please follow the steps below to configure your existing Java app to use it with Auth0.**

### 1. Add Auth0 Spring Security dependency

You need to add the `spring-security-auth0` dependency.

For that, you can just add it to your `pom.xml` if you're using maven.

@@snippet(meta.snippets.dependencies)@@

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

and create the `auth0.properties` file with the following information:

@@snippet(meta.snippets.setup)@@

### 3. Create the controllers

Now, you can create the controllers. Every controller that has a route inside `/secured/` in this case will ask for the JWT

@@snippet(meta.snippets.use)@@

### 4. You're done!

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!

### Optional Steps
#### Configure CORS

In order to configure CORS, just add the following `Filter` for all your requests:

```java
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
