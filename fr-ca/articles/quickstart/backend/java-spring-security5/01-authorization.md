---
title: Authorization
name: How to secure your API with Spring Boot
description: This tutorial demonstrates how to add authorization to an API using the Okta Spring Boot Starter.
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
okta:
  oauth2:
    # Replace with the domain of your Auth0 tenant.
    issuer: https://${account.namespace}/
    # Replace with the API Identifier for your Auth0 API.
    audience: ${apiIdentifier}
```

| Attribute | Description|
| --- | --- |
| `okta.oauth2.audience` | The unique identifier for your API. If you are following the steps in this tutorial it would be `https://quickstarts/api`. |
| `okta.oauth2.issuer` | The issuer URI of the resource server, which will be the value of the `iss` claim in the JWT issued by Auth0. Spring Security will use this property to discover the authorization server's public keys and validate the JWT signature. The value will be your Auth0 domain with an `https://` prefix and a `/` suffix (the trailing slash is important). |

## Install dependencies

If you are using Gradle, you can add the required dependencies using the [Spring Boot Gradle Plugin](https://docs.spring.io/spring-boot/docs/current/gradle-plugin/reference/html/) and the [Dependency Management Plugin](https://docs.spring.io/dependency-management-plugin/docs/current/reference/html/) to resolve dependency versions:

```groovy
// build.gradle

plugins {
    id 'java'
    id 'org.springframework.boot' version '3.1.5'
    id 'io.spring.dependency-management' version '1.1.3'
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'com.okta.spring:okta-spring-boot-starter:3.0.5'
}
```

If you are using Maven, add the Spring dependencies to your `pom.xml` file:

```xml
// pom.xml

<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.1.5</version>
    <relativePath/>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>com.okta</groupId>
        <artifactId>okta-spring-boot-starter</artifactId>
        <version>3.0.5</version>
    </dependency>
</dependencies>
```

## Protect API endpoints

<%= include('../_includes/_api_endpoints') %>

To configure the application as a Resource Server and validate the JWTs, create a class that will register a [SecurityFilterChain](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/SecurityFilterChain.html), an instance of `SecurityFilterChain`, and add the `@Configuration` annotation.

The example below shows how to secure API methods using the `HttpSecurity` object provided in the `filterChain()` method of the `SecurityConfig` class. Route matchers are used to restrict access based on the level of authorization required:

```java
// src/main/java/com/auth0/example/security/SecurityConfig.java

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .mvcMatchers("/api/public").permitAll()
                .mvcMatchers("/api/private").authenticated()
                .mvcMatchers("/api/private-scoped").hasAuthority("SCOPE_read:messages")
                .and().cors()
                .and().oauth2ResourceServer().jwt();
        return http.build();
    }
}
```

::: note
By default, Spring Security will create a `GrantedAuthority` for each scope in the `scope` claim of the JWT. This is what enables using the `hasAuthority("SCOPE_read:messages")` method to restrict access to a valid JWT that contains the `read:messages` scope.
:::

### Create the API controller

Create a new record named `Message`, which will be the domain object the API will return:

```java
// src/main/java/com/auth0/example/model/Message.java

public record Message(String message) {}
```

Create a new class named `APIController` to handle requests to the endpoints:

```java
// src/main/java/com/auth0/example/web/APIController.java

import com.auth0.example.model.Message;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Handles requests to "/api" endpoints.
 * @see com.auth0.example.security.SecurityConfig to see how these endpoints are protected.
 */
@RestController
@RequestMapping(path = "api", produces = MediaType.APPLICATION_JSON_VALUE)
// For simplicity of this sample, allow all origins. Real applications should configure CORS for their use case.
@CrossOrigin(origins = "*")
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
