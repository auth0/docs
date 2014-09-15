---
lodash: true
---

## Java API Tutorial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="https://docs.auth0.com/spring-security-auth0/master/create-package?path=/examples/api-example&filePath=/examples/api-example/src/main/resources/auth0.properties&type=replace@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
    </a> 
  </blockquote>
</div>

**Otherwise, Please follow the steps below to configure your existing Java app to use it with Auth0.**

### 1. Add Auth0 Spring Security dependency

You need to add the `spring-security-auth0` dependency.

For that, you can just add it to your `pom.xml` if you're using maven.

````xml
<dependency>
  <groupId>com.auth0</groupId>
  <artifactId>spring-security-auth0</artifactId>
  <version>0.2</version>
</dependency>
```

### 2. Configure Spring to use Auth0

Now you need to configure Spring to use Spring Security with Auth0.

For that, just add the following to the `application-context.xml`

````xml
<!--  Use default Auth0 security context -->
<import resource="classpath:auth0-security-context.xml" />

<!-- Scan for spring annotated components from Auth0 -->
<context:component-scan base-package="com.auth0"/>

<!-- Read auth0.properties file -->
<context:property-placeholder location="classpath:auth0.properties" />
```

and create the `auth0.properties` file with the following information:

````properties
auth0.clientSecret=@@account.clientSecret@@
auth0.clientId=@@account.clientId@@
auth0.domain=@@account.namespace@@
# This is the path to secure. 
auth0.securedRoute=/secured/**
```

### 3. Create the controllers

Now, you can create the controllers. Every controller that has a route inside `/secured/` in this case will ask for the JWT

````java
@Controller
public class SecuredPingController {

 @RequestMapping(value = "/secured/ping")
  @ResponseBody
  public String securedPing() {
    return "All good. You only get this message if you're authenticated";
  }
}
```

### 4. You've nailed it.

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!

### Optional Steps
#### Configure CORS

In order to configure CORS, just add the following `Filter` for all your requests:

````java
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
