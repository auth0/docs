---
title: Authorization
name: How to secure your API using Spring Security 5 and Auth0
description: This tutorial demonstrates how to add authorization to an API using Spring Security 5.
budicon: 500
topics:
    - quickstart
    - backend
    - java
    - spring-security
github:
    path: 01-Authorization-MVC
contentType: tutorial
useCase: quickstart
---

<%= include('../_includes/_api_auth_preamble') %>

<%= include('../../../_includes/_api_auth_intro') %>

::: note
This Quickstart uses Spring MVC. If you are using Spring WebFlux, the steps to secure an API are similar, but some of the implementation details are different. Refer to the [Spring Security WebFlux Sample Code](https://github.com/auth0-samples/auth0-spring-security5-api-sample/tree/master/01-Authorization-WebFlux) to see how to integrate Auth0 with your Spring WebFlux API.
:::


<%= include('../_includes/_api_create_new') %>

## Configure the Sample Project

The sample project uses a `/src/main/resources/application.yml` file, which configures it to use the correct Auth0 **Domain** and **API Identifier** for your API. If you download the code from this page it will be automatically configured. If you clone the example from GitHub, you will need to fill it in yourself.

```yaml
auth0:
  audience: ${apiIdentifier}
spring:
  security:
    oauth2:
        resourceserver:
            jwt:
                issuer-uri: https://${account.namespace}/
```

| Attribute | Description|
| --- | --- |
| `auth0.audience` | The unique identifier for your API. If you are following the steps in this tutorial it would be `https://quickstarts/api`. |
| `spring.security.oauth2.resourceserver.jwt.issuer-uri` | The issuer URI of the resource server, which will be the value of the `iss` claim in the JWT issued by Auth0. Spring Security will use this property to discover the authorization server's public keys and validate the JWT signature. The value will be your Auth0 domain with an `https://` prefix and a `/` suffix (the trailing slash is important). |

## Validate Access Tokens

### Install dependencies

If you are using Gradle, you can add the required dependencies using the [Spring Boot Gradle Plugin](https://docs.spring.io/spring-boot/docs/current/gradle-plugin/reference/html/) and the [Dependency Management Plugin](https://docs.spring.io/dependency-management-plugin/docs/current/reference/html/) to resolve dependency versions:

```groovy
// build.gradle

plugins {
    id 'org.springframework.boot' version '2.2.4.RELEASE'
    id 'io.spring.dependency-management' version '1.0.9.RELEASE'
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.security:spring-security-oauth2-resource-server'
    implementation 'org.springframework.security:spring-security-oauth2-jose'
    implementation 'org.springframework.security:spring-security-config'
}
```

If you are using Maven, add the Spring dependencies to your `pom.xml` file:

```xml
// pom.xml

<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.2.4.RELEASE</version>
    <relativePath/>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.security</groupId>
        <artifactId>spring-security-oauth2-resource-server</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.security</groupId>
        <artifactId>spring-security-oauth2-jose</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.security</groupId>
        <artifactId>spring-security-config</artifactId>
    </dependency>
</dependencies>
```

### Configure the resource server

To configure the application as a Resource Server and validate the JWTs, create a class that extends `WebSecurityConfigurerAdapter`, add the `@EnableWebSecurity` annotation, and override the `configure` method:

```java
// src/main/java/com/auth0/example/security/SecurityConfig.java

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.oauth2ResourceServer().jwt();
    }
}
```

### Validate the audience

In addition to validating the JWT, you also need to validate that the JWT is intended for your API by checking the `aud` claim of the JWT. Create a new class named `AudienceValidator` that implements the `OAuth2TokenValidator` interface:

```java
// src/main/java/com/auth0/example/security/AudienceValidator.java

class AudienceValidator implements OAuth2TokenValidator<Jwt> {
    private final String audience;

    AudienceValidator(String audience) {
        this.audience = audience;
    }

    public OAuth2TokenValidatorResult validate(Jwt jwt) {
        OAuth2Error error = new OAuth2Error("invalid_token", "The required audience is missing", null);
        
        if (jwt.getAudience().contains(audience)) {
            return OAuth2TokenValidatorResult.success();
        }
        return OAuth2TokenValidatorResult.failure(error);
    }
}
```

Update the `SecurityConfig` class to configure a `JwtDecoder` bean that uses the `AudienceValidator`:

```java
// src/main/java/com/auth0/example/security/SecurityConfig.java

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("<%= "${auth0.audience}" %>")
    private String audience;

    @Value("<%= "${spring.security.oauth2.resourceserver.jwt.issuer-uri}" %>")
    private String issuer;

    @Bean
    JwtDecoder jwtDecoder() {
        NimbusJwtDecoder jwtDecoder = (NimbusJwtDecoder)
                JwtDecoders.fromOidcIssuerLocation(issuer);

        OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator(audience);
        OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuer);
        OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, audienceValidator);

        jwtDecoder.setJwtValidator(withAudience);

        return jwtDecoder;
    }
}
```

## Protect API Endpoints

<%= include('../_includes/_api_endpoints') %>

The example below shows how to secure API methods using the `HttpSecurity` object provided in the `configure()` method of the `SecurityConfig` class. Route matchers are used to restrict access based on the level of authorization required:

```java
// src/main/java/com/auth0/example/security/SecurityConfig.java

public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .mvcMatchers("/api/public").permitAll()
                .mvcMatchers("/api/private").authenticated()
                .mvcMatchers("/api/private-scoped").hasAuthority("SCOPE_read:messages")
                .and()
                .oauth2ResourceServer().jwt();
    }
}
```

::: note
By default, Spring Security will create a `GrantedAuthority` for each scope in the `scope` claim of the JWT. This is what enables using the `hasAuthority("SCOPE_read:messages")` method to restrict access to a valid JWT that contains the `read:messages` scope.

If your use case requires different claims to make authorization decisions, see the [Spring Security Reference Documentation](https://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#oauth2resourceserver-authorization-extraction) to learn how to customize the extracted authorities.
:::

### Create the API controller

Create a new class named `Message`, which is the domain object the API will return:

```java
// src/main/java/com/auth0/example/model/Message.java

public class Message {
    private final String message;

    public Message(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
```

Create a new class named `APIController` to handle requests to the endpoints:

```java
// src/main/java/com/auth0/example/web/APIController.java

@RestController
@RequestMapping(path = "api", produces = MediaType.APPLICATION_JSON_VALUE)
public class APIController {

    @GetMapping(value = "/public")
    public Message publicEndpoint() {
        return new Message("All good. You DO NOT need to be authenticated to call /api/public.");
    }

    @GetMapping(value = "/private")
    public Message privateEndpoint() {
        return new Message("All good. You can see this because you are Authenticated.");
    }

    @GetMapping(value = "/private-scoped")
    public Message privateScopedEndpoint() {
        return new Message("All good. You can see this because you are Authenticated with a Token granted the 'read:messages' scope");
    }
}
```

## Run the Application

To build and run the sample project, execute the `bootRun` Gradle task.

Linux or macOS:

```bash
./gradlew bootRun
```

Windows:

```bash
gradlew.bat bootRun
```

If you are configuring your own application using Maven and the [Spring Boot Maven Plugin](https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html), you can execute the `spring-boot:run` goal.

Linux or macOS:

```bash
mvn spring-boot:run
```

Windows:

```bash
mvn.cmd spring-boot:run
```

The sample application will be available at `http://localhost:3010/`. Read about how to test and use your API in the [Using Your API](/quickstart/backend/java-spring-security5/02-using) article.
