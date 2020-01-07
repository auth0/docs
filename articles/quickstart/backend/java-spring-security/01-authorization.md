---
title: Authorization
name: How to secure your Spring Security API with Auth0
description: This tutorial demonstrates how to add authorization to a Spring Security API.
budicon: 500
topics:
    - quickstart
    - backend
    - java
    - spring-security
github:
    path: 01-Authorization
contentType: tutorial
useCase: quickstart
---

:::note
This Quickstart demonstrates securing an API using **Spring Boot 1** and **Spring Security 4**.

See the [Spring Security 5 API Quickstart](quickstart/backend/java-spring-security5) to learn how to use Auth0 to secure an API built using Spring Boot 2 and Spring Security 5.
:::

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

## Configure the Sample Project

The sample project has a `/src/main/resources/auth0.properties` file which configures it to use the correct Auth0 **Domain** and **API Identifier** for your API. If you download the code from this page it will be automatically filled. If you use the example from Github, you will need to fill it yourself.

${snippet(meta.snippets.setup)}

| Attribute | Description|
| --- | --- |
| `auth0.issuer` | The issuer of the JWT Token. Typically, this is your Auth0 domain with an `https://` prefix and a `/` suffix. For example, if your Auth0 domain is `example.auth0.com`, the `auth0.issuer` must be set to `https://example.auth0.com/` (the trailing slash is important). |
| `auth0.apiAudience` | The unique identifier for your API. If you are following the steps in this tutorial it would be `https://quickstarts/api`.|

## Validate Access Tokens

### Install dependencies

Add the `auth0-spring-security-api` dependency.

If you are using Maven, add the dependency to your `pom.xml` file:

${snippet(meta.snippets.dependencies)}

If you are using Gradle, add the dependency to the dependencies block:

${snippet(meta.snippets.dependenciesGradle)}

### Configure JSON Web Token signature algorithm

Configure your API to use the RS256 [signing algorithm](/tokens/concepts/signing-algorithms). 

```java
// src/main/java/com/auth0/example/AppConfig.java

@Configuration
@EnableWebSecurity
public class AppConfig extends WebSecurityConfigurerAdapter {

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

@Configuration
@EnableWebSecurity
public class AppConfig extends WebSecurityConfigurerAdapter {

    @Value(value = "<%= "${auth0.apiAudience}" %>")
    private String apiAudience;
    @Value(value = "<%= "${auth0.issuer}" %>")
    private String issuer;

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST"));
        configuration.setAllowCredentials(true);
        configuration.addAllowedHeader("Authorization");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors();
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

## Run and Test Your API

To build and run the project, use the command:

```bash
./gradlew bootRun
```

or if you are on Windows:

```bash
gradlew.bat bootRun
```

Using a REST client such as Postman or cURL, issue a `GET` request to `http://localhost:3010/api/public`. You should receive the response:

```json
{"message":"All good. You DO NOT need to be authenticated to call /api/public."}
```

Next, issue a `GET` request to `http://localhost:3010/api/private`. You should receive a `401 Unauthorized` response:

```json
{"timestamp":1559321750022,"status":401,"error":"Unauthorized","message":"Unauthorized","path":"/api/private"}
```

To test that your API is properly secured, you can obtain a test token in the Auth0 Dashboard:

1. Go to the **Machine to Machine Applications** tab for the API you created above.
2. Ensure that your API test application is marked as authorized.
3. Click the **Test** tab, then **COPY TOKEN**.

Issue a `GET` request to the `/api/private` endpoint, this time passing the token you obtained above as an `Authorization` header set to `Bearer YOUR-API-TOKEN-HERE`. You should then see the response:

```json
{"message":"All good. You can see this because you are Authenticated."}
```

Finally, to test that our `/api/private-scoped` is properly protected by the `read:messages` scope, make a `GET` request to the `/api/private-scoped` endpoint using the same token as above. You should see a `403 Forbidden` response, as this token does not possess the `read:messages` scope:

```json
{"timestamp":1559322174584,"status":403,"error":"Forbidden","message":"Access is denied","path":"/api/private-scoped"}
```

Back in the Auth0 Dashboard:

1. Go to the **Permissions** tab for the API you created above.
2. Add a permission of `read:messages` and provide a description.
3. Go to the **Machine to Machine Applications** tab.
4. Expand your authorized test application, select the `read:messages` scope, then click **UPDATE** and then **CONTINUE**.
5. Click the **Test** tab, then **COPY TOKEN**.

Issue a GET request to `/api/private-scoped`, this time passing the token you obtained above (with the `read:messages` scope) as an `Authorization` header set to `Bearer YOUR-API-TOKEN-HERE`. You should see the response:

```json
{"message":"All good. You can see this because you are Authenticated with a Token granted the 'read:messages' scope"}
```
