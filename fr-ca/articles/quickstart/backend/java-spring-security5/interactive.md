---
title: Spring Boot API
description: Secure your API using the Okta Spring Boot Starter
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
  - files/security-config
  - files/message
  - files/api-controller
github:
  path: 01-Authorization-MVC
---

# Add Authorization to Your Spring Boot Application

Auth0 allows you to quickly add authorization to your application. This guide demonstrates how to integrate Auth0 with any new or existing Spring Boot application.

If you have not created an API in your Auth0 dashboard yet, use the interactive selector to create a new Auth0 API or select an existing API that represents the project you want to integrate with.

Review [our getting started guide](get-started/auth0-overview/set-up-apis) to set up your first API through the Auth0 dashboard.

Each Auth0 API uses the API Identifier, which your application needs to validate the access token.

<%= include('../../../_includes/_api_auth_intro') %>

## Define permissions
<%= include('../_includes/_api_scopes_access_resources') %>

## Configure the sample project {{{ data-action=code data-code="application.yml#1:8" }}}

The sample project uses a `/src/main/resources/application.yml` file, which configures it to use the correct Auth0 **domain** and **API Identifier** for your API. If you download the code from this page it will be automatically configured. If you clone the example from GitHub, you will need to fill it in yourself.

| Attribute | Description|
| --- | --- |
| `okta.oauth2.audience` | The unique identifier for your API. If you are following the steps in this tutorial it would be `https://quickstarts/api`. |
| `okta.oauth2.issuer` | The issuer URI of the resource server, which will be the value of the `iss` claim in the JWT issued by Auth0. Spring Security will use this property to discover the authorization server's public keys and validate the JWT signature. The value will be your Auth0 domain with an `https://` prefix and a `/` suffix (the trailing slash is important). 

## Install dependencies {{{ data-action=code data-code="application.yml#1:8" }}}

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
        <groupId>com.okta.spring</groupId>
        <artifactId>okta-spring-boot-starter</artifactId>
        <version>3.0.5</version>
    </dependency>
</dependencies>
```


## Configure the resource server {{{ data-action=code data-code="SecurityConfig.java" }}}

To configure the application as a Resource Server and validate the JWTs, create a class that will provide an instance of `SecurityFilterChain`, and add the `@Configuration` annotation.

### Protect API endpoints

<%= include('../_includes/_api_endpoints') %>

The example below shows how to secure API methods using the `HttpSecurity` object provided in the `filterChain()` method of the `SecurityConfig` class. Route matchers restrict access based on the level of authorization required.

::: note
By default, Spring Security creates a `GrantedAuthority` for each scope in the `scope` claim of the JWT. This scope enables using the `hasAuthority("SCOPE_read:messages")` method to restrict access to a valid JWT that contains the `read:messages` scope.
:::

## Create the Domain Object {{{ data-action=code data-code="Message.java#1:11" }}}

To make your endpoint return a JSON, you can use a Java record. The member variables of this object is serialized into the key value for your JSON. Create a new record named `Message` as an example domain object to return during the API calls.

## Create the API controller {{{ data-action=code data-code="APIController.java" }}}

Create a new class named `APIController` to handle requests to the endpoints. The `APIController` has three routes as defined in the [Protect API Endpoints](/quickstart/backend/java-spring-security5/interactive/#configure-the-resource-server) section. For this example, allow all origins through `@CrossOrigin` annotation. Real applications should configure `CORS` for their use case.

## Run the application {{{ data-action=code data-code="APIController.java" }}}

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

::::checkpoint

:::checkpoint-default

The sample application will be available at `http://localhost:3010/`. Read about how to test and use your API in the [Using Your API](/quickstart/backend/java-spring-security5/02-using) article.
:::

:::checkpoint-failure
If your application did not launch successfully:
* Use the [Troubleshooting](/quickstart/backend/java-spring-security5/03-troubleshooting) section to check your configuration.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::
