---
title: Authorization
name: How to secure your Spring Security API with Auth0
description: This tutorial demonstrates how to add authorization to a Spring Security API.
budicon: 500
github:
    path: 01-Authorization
---

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

## Configure the Sample Project

The sample project has a `/src/main/resources/auth0.properties` file which configures it to use the correct Auth0 **Domain** and **API Identifier** for your API. If you download the code from this page it will be automatically filled. If you use the example from Github, you will need to fill it yourself.

${snippet(meta.snippets.setup)}

| Attribute | Description|
| --- | --- |
| `auth0.issuer` | The issuer of the JWT Token. Typically, this is your Auth0 domain with a `https://` prefix and a `/` suffix. For example, if your Auth0 domain is `example.auth0.com`, the `auth0.issuer` must be set to `https://example.auth0.com/` (the trailing slash is important). |
| `auth0.apiAudience` | The unique identifier for your API. If you are following the steps in this tutorial it would be `https://quickstarts/api`.|

## Validate Access Tokens

### Install dependencies

Add the `auth0-spring-security-api` dependency.

If you are using Maven, add the dependency to your `pom.xml` file:

${snippet(meta.snippets.dependencies)}

If you are using Gradle, add the dependency to the dependencies block:

${snippet(meta.snippets.dependenciesGradle)}

### Configure JSON Web Token signature algorithm

Configure your API to use the RS256 signing algorithm. 

```java
// src/main/java/com/auth0/example/AppConfig.java

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value(value = "<%= "${auth0.apiAudience}" %>")
    private String apiAudience;
    @Value(value = "<%= "${auth0.issuer}" %>")
    private String issuer;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        JwtWebSecurityConfigurer
                .forRS256(apiAudience, issuer)
                .configure(http);
    }
}
```

## Protect API Endpoints

<%= include('../_includes/_api_endpoints') %>

The example below shows how to implement secure API methods. In the `AppConfig` class, add route matchers to the snippet. The `hasAuthority()` method provides a way to specify the required scope for the resource.

```java
// src/main/java/com/auth0/example/AppConfig.java

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value(value = "<%= "${auth0.apiAudience}" %>")
    private String apiAudience;
    @Value(value = "<%= "${auth0.issuer}" %>")
    private String issuer;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        JwtWebSecurityConfigurer
                .forRS256(apiAudience, issuer)
                .configure(http)
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/public").permitAll()
                .antMatchers(HttpMethod.GET, "/api/private").authenticated()
                .antMatchers(HttpMethod.GET, "/api/private-scoped").hasAuthority("read:messages");
    }
}
```

### Create the API Controller

Create a new class called `APIController` to handle each request to the endpoints.

Next, in the `AppConfig.java` file, configure which endpoints are secure and which are not.

```java
// src/main/java/com/auth0/example/APIController.java

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.json.JSONObject;

@Controller
@Component
public class APIController {

    @RequestMapping(value = "/api/public", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public String publicEndpoint() {
        return new JSONObject()
                .put("message", "Hello from a public endpoint! You don\'t need to be authenticated to see this.")
                .toString();
    }

    @RequestMapping(value = "/api/private", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public String privateEndpoint() {
        return new JSONObject()
                .put("message", "Hello from a private endpoint! You need to be authenticated to see this.")
                .toString();
    }

    @RequestMapping(value = "/api/private-scoped", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public String privateScopedEndpoint() {
        return new JSONObject()
                .put("message", "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.")
                .toString();
    }
}
```

To build and run the seed project, use the command: `mvn spring-boot:run`.
