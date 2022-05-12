---
title: Spring Boot API
description: Secure your API using Spring Security 5 and Auth0
interactive: true
alias:
  - spring security
  - spring
topics:
  - quickstart
  - backend
  - spring
files:
  - files/application
  - files/audience-validator
  - files/security-config
  - files/message
  - files/api-controller
github:
  path: Sample-01
---

# Secure your API using Spring Security 5 and Auth0

Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with any new or existing Spring Boot application using the [auth0-spring-security-api](https://github.com/auth0/auth0-spring-security-api) package.

If you haven't created an API in your Auth0 dashboard yet, you can use the interactive selector to create a new Auth0 API or select an existing API that represents the project you want to integrate with.

Alternatively, you can read [our getting started guide](get-started/auth0-overview/set-up-apis) that helps you set up your first API through the Auth0 dashboard.

Every API in Auth0 is configured using an API Identifier that your application code will use as the Audience to validate the access token.

<%= include('../../../_includes/_api_auth_intro') %>

## Define permissions
<%= include('../_includes/_api_scopes_access_resources') %>

## Configure the Sample Project {{{ data-action=code data-code="application.yml#13:22" }}}

The sample project uses a `/src/main/resources/application.yml` file, which configures it to use the correct Auth0 **Domain** and **API Identifier** for your API. If you download the code from this page it will be automatically configured. If you clone the example from GitHub, you will need to fill it in yourself.

| Attribute | Description|
| --- | --- |
| `auth0.audience` | The unique identifier for your API. If you are following the steps in this tutorial it would be `https://quickstarts/api`. |
| `spring.security.oauth2.resourceserver.jwt.issuer-uri` | The issuer URI of the resource server, which will be the value of the `iss` claim in the JWT issued by Auth0. Spring Security will use this property to discover the authorization server's public keys and validate the JWT signature. The value will be your Auth0 domain with an `https://` prefix and a `/` suffix (the trailing slash is important). |

## Install dependencies

If you are using Gradle, you can add the required dependencies using the [Spring Boot Gradle Plugin](https://docs.spring.io/spring-boot/docs/current/gradle-plugin/reference/html/) and the [Dependency Management Plugin](https://docs.spring.io/dependency-management-plugin/docs/current/reference/html/) to resolve dependency versions:

```groovy
// build.gradle

plugins {
    id 'org.springframework.boot' version '2.5.12'
    id 'io.spring.dependency-management' version '1.0.9.RELEASE'
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-oauth2-resource-server'
}
```

If you are using Maven, add the Spring dependencies to your `pom.xml` file:

```xml
// pom.xml

<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.5.12</version>
    <relativePath/>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
    </dependency>
</dependencies>
```

## Validate the audience {{{ data-action=code data-code="AudienceValidator.java#7:14" }}}

In addition to validating the JWT, you also need to validate that the JWT is intended for your API by checking the `aud` claim of the JWT. Create a new class named `AudienceValidator` that implements the `OAuth2TokenValidator` interface:

## Configure the resource server {{{ data-action=code data-code="SecurityConfig.java#7:14" }}}

To configure the application as a Resource Server and validate the JWTs, create a class that extends `WebSecurityConfigurerAdapter`, add the `@EnableWebSecurity` annotation, and override the `configure` method

Update the `SecurityConfig` class to configure a `JwtDecoder` bean that uses the `AudienceValidator`

### Protect API Endpoints

<%= include('../_includes/_api_endpoints') %>

The example below shows how to secure API methods using the `HttpSecurity` object provided in the `configure()` method of the `SecurityConfig` class. Route matchers are used to restrict access based on the level of authorization required:

::: note
By default, Spring Security will create a `GrantedAuthority` for each scope in the `scope` claim of the JWT. This is what enables using the `hasAuthority("SCOPE_read:messages")` method to restrict access to a valid JWT that contains the `read:messages` scope.

If your use case requires different claims to make authorization decisions, see the [Spring Security Reference Documentation](https://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#oauth2resourceserver-authorization-extraction) to learn how to customize the extracted authorities.
:::

## Create the Domain Object {{{ data-action=code data-code="Message.java#13:22" }}}

Create a new class named `Message`, which is the domain object the API will return:

## Create the API controller {{{ data-action=code data-code="APIController.java#13:22" }}}

Create a new class named `APIController` to handle requests to the endpoints

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

#TODO Add sections on Running and troubleshooting seen in previous 