---
title: Add login to your Spring Webapp
description: The Okta Spring Boot Starter makes it easy to add login to your Spring Boot application.
interactive: true
files:
  - files/application
  - files/security-config
  - files/index
  - files/home-controller
  - files/security-config-logout
github:
    path: mvc-login
---

# Add Login to Your Spring Web Application

::: panel Using Spring WebFlux?
This tutorial uses <a href="https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html" target="_blank">Spring MVC</a>. If you are using <a href="https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html#spring-web-reactive" target="_blank">Spring WebFlux</a>, the steps to add authentication are similar, but some implementation details are different. Refer to the <a href="https://github.com/auth0-samples/auth0-spring-boot-login-samples/tree/master/webflux-login" target="_blank">Spring Boot WebFlux Sample Code</a> to see how to integrate Auth0 with your Spring Boot WebFlux application.
:::

<%= include('../../_includes/_configure_auth0_interactive', { 
  callback: 'http://localhost:3000/login/oauth2/code/okta',
  returnTo: 'http://localhost:3000'
}) %>

## Configure Spring Boot application

### Add Spring dependencies

To integrate your Spring Boot application with Auth0, include the <a href="https://github.com/okta/okta-spring-boot/" target="_blank">Okta Spring Boot Starter</a> in your application's dependencies.

:::note
This guide uses <a href="https://www.thymeleaf.org/" target="_blank">Thymeleaf</a> and the <a href="https://github.com/thymeleaf/thymeleaf-extras-springsecurity" target="_blank">Spring Security integration module</a> for the view layer. If you are using a different view technology, the Spring Security configuration and components remain the same.
:::

If you're using Gradle, you can include these dependencies as shown below.

```groovy
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.1.4'
    id 'io.spring.dependency-management' version '1.1.3'
}

implementation 'com.okta.spring:okta-spring-boot-starter:3.0.5'
implementation 'org.springframework.boot:spring-boot-starter-web'
implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
implementation 'org.thymeleaf.extras:thymeleaf-extras-springsecurity6'
implementation 'nz.net.ultraq.thymeleaf:thymeleaf-layout-dialect'
```

If you are using Maven:

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.1.4</version>
    <relativePath/>
</parent>

<dependencies>
    <dependency>
        <groupId>com.okta</groupId>
        <artifactId>okta-spring-boot-starter</artifactId>
        <version>3.0.5</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-oauth2-client</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-thymeleaf</artifactId>
    </dependency>
    <dependency>
        <groupId>org.thymeleaf.extras</groupId>
        <artifactId>thymeleaf-extras-springsecurity6</artifactId>
    </dependency>
    <dependency>
        <groupId>nz.net.ultraq.thymeleaf</groupId>
        <artifactId>thymeleaf-layout-dialect</artifactId>
    </dependency>
</dependencies>
```

## Configure Spring Security {{{ data-action=code data-code="application.yml#1:11" }}}

The Okta Spring Boot Starter makes it easy to configure your application with Auth0. The sample below uses an `application.yml` file, though you can also use properties files or any of the other <a href="https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-external-config" target="_blank">supported externalization mechanisms</a>.


```yaml
# src/main/resources/application.yml
okta:
  oauth2:
    issuer: https://${account.namespace}/
    client-id: ${account.clientId}
    client-secret: YOUR_CLIENT_SECRET

# The sample and instructions above for the callback and logout URL configuration use port 3000.
# If you wish to use a different port, change this and be sure your callback and logout URLs are
# configured with the correct port.
server:
  port: 3000
```

## Add login to your application {{{ data-action=code data-code="SecurityConfig.java" }}}

To enable user login with Auth0, create a class that will register a <a href="https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/SecurityFilterChain.html" target="_blank">SecurityFilterChain</a>, and add the `@Configuration` annotation.


:::note
You can configure the <a href="https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html" target="_blank">HttpSecurity</a> instance to require authentication on all or certain paths. For example, to require authentication on all paths except the home page:

```java
 http
    .authorizeHttpRequests(authorize -> authorize
        .requestMatchers("/").permitAll()
        .anyRequest().authenticated()
    );
```
:::

## Add front page {{{ data-action=code data-code="index.html" }}}

The Okta Spring Boot Starter will use the client configuration you defined earlier to handle login when a user visits the `/oauth2/authorization/okta` path of your application. You can use this to create a login link in your application.

This page returns the user attributes when the user authentications. You will use the `/logout` link in the template to implement the logout feature.

## Add controller {{{ data-action=code data-code="HomeController.java" }}}

Create a controller to handle the incoming request. This controller renders the `index.html` page. When the user authenticates, the application retrieves the users's profile information attributes to render the page.

::::checkpoint

:::checkpoint-default

When you click the login link, verify the application redirects you to the <a href="https://auth0.com/universal-login" target="_blank">Auth0 Universal Login</a> page and that you can now log in or sign up using a username and password or a social provider.

:::

:::checkpoint-failure
If your application did not allow login or signup:
* Verify you configured the correct Callback URL
* Verify you added the login link to redirect to `/oauth2/authorization/okta`

Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank">documentation</a> or visit our <a href="https://community.auth0.com" target="_blank">community page</a> to get more help.

:::

::::

![Auth0 Universal Login](/media/quickstarts/universal-login.png)

:::note
Auth0 enables the Google social provider by default on new tenants and offers you developer keys to test logging in with <a href="https://auth0.com/docs/connections/identity-providers-social" target="_blank">social identity providers</a>. However, these developer keys have some limitations that may cause your application to behave differently. For more details on what this behavior may look like and how to fix it, consult the <a href="https://auth0.com/docs/connections/social/devkeys#limitations-of-developer-keys" target="_blank">Test Social Connections with Auth0 Developer Keys</a> document.
:::

## Add logout to your application {{{ data-action=code data-code="SecurityConfigWithLogout.java" }}}

Now that users can log into your application, they need <a href="https://auth0.com/docs/logout/guides/logout-auth0" target="_blank">a way to log out</a>. By default, when logout is enabled, Spring Security will log the user out of your application and clear the session. To enable successful logout of Auth0, you can provide a `LogoutHandler` to redirect users to your <a href="https://auth0.com/docs/api/authentication?javascript#logout" target="_blank">Auth0 logout endpoint</a> (`https://${account.namespace}/v2/logout`) and then immediately redirect them to your application.

In the `SecurityConfig` class, provide a `LogoutHandler` that redirects to the Auth0 logout endpoint, and configure the `HttpSecurity` to add the logout handler

::::checkpoint

:::checkpoint-default
When you click logout link, the application should redirect you to the address you specified as one of the "Allowed Logout URLs" in the "Settings" and you are no longer logged in to your application.
:::

:::checkpoint-failure
If your application did not allow logout:
* Verify you configured the correct logout URL
* Verify you added the logout link to POST to `/logout`

Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank">documentation</a> or visit our <a href="https://community.auth0.com" target="_blank">community page</a> to get more help.

:::

::::
