---
title: Login
description: The Okta Spring Boot Starter makes it easy to add login to your Spring Boot application.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - java-spring-boot
github:
    path: mvc-login
contentType: tutorial
useCase: quickstart
---

::: panel Using Spring WebFlux?
This tutorial uses [Spring MVC](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html). If you are using [Spring WebFlux](https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html#spring-web-reactive), the steps to add authentication are similar, but some of the implementation details are different. Refer to the [Spring Boot WebFlux Sample Code](https://github.com/auth0-samples/auth0-spring-boot-login-samples/tree/master/webflux-login) to see how to integrate Auth0 with your Spring Boot WebFlux application.
:::

<%= include('../_includes/_getting_started', { library: 'Java Spring Security', callback: 'http://localhost:3000/login/oauth2/code/okta' }) %>

<%= include('../../../_includes/_logout_url', { returnTo: 'http://localhost:3000/' }) %>

## Configure Spring Boot Application

### Add dependencies

To integrate your Spring Boot application with Auth0, include the [Okta Spring Boot Starter](https://github.com/okta/okta-spring-boot/) in your application's dependencies.

:::note
This guide uses [Thymeleaf](https://www.thymeleaf.org/) and the [Spring Security integration module](https://github.com/thymeleaf/thymeleaf-extras-springsecurity) for the view layer. If you are using a different view technology, the Spring Security configuration and components remain the same.
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
    <version>3.1.5</version>
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

### Configure Spring Security

The Okta Spring Boot Starter makes it easy to configure your application with Auth0. The sample below uses an `application.yml` file, though you can also use properties files or any of the other [supported externalization mechanisms](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-external-config).


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

## Add Login to Your Application

To enable user login with Auth0, create a class that will register a [SecurityFilterChain](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/SecurityFilterChain.html), and add the `@Configuration` annotation.

```java
package com.auth0.example;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                .anyRequest().authenticated()
            )
            .oauth2Login(withDefaults());
        return http.build();
    }
}
```

:::note
You can further configure the [HttpSecurity](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html) instance to require authentication on all or certain paths. For example, to require authentication on all paths except the home page:

```java
 http
    .authorizeHttpRequests(authorize -> authorize
        .requestMatchers("/").permitAll()
        .anyRequest().authenticated()
    );
```
:::

The Okta Spring Boot Starter will use the client configuration you defined earlier to handle login when a user visits the `/oauth2/authorization/okta` path of your application. You can use this to create a login link in your application.

```html
<!-- src/main/resources/templates/index.html -->
<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:sec="http://www.thymeleaf.org/thymeleaf-extras-springsecurity5">
    <body>
        <div sec:authorize="!isAuthenticated()">
            <a th:href="@{/oauth2/authorization/okta}">Log In</a>
        </div>
        <div sec:authorize="isAuthenticated()">
            <p>You are logged in!</p>
        </div>
    </body>
</html>
```

Be sure to create or update a controller to render your view.

```java
package com.auth0.example;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller for the home page.
 */
@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model, @AuthenticationPrincipal OidcUser principal) {
        return "index";
    }
}
```

:::panel Checkpoint
Add the login link to your application. When you click it, verify that your application redirects you to the [Auth0 Universal Login](https://auth0.com/universal-login) page and that you can now log in or sign up using a username and password or a social provider.

Once that's complete, verify that Auth0 redirects you to your application and that you are logged in.
:::

![Auth0 Universal Login](/media/quickstarts/universal-login.png)

:::note
Auth0 enables the Google social provider by default on new tenants and offers you developer keys to test logging in with [social identity providers](https://auth0.com/docs/connections/identity-providers-social). However, these developer keys have some limitations that may cause your application to behave differently. For more details on what this behavior may look like and how to fix it, consult the [Test Social Connections with Auth0 Developer Keys](https://auth0.com/docs/connections/social/devkeys#limitations-of-developer-keys) document.
:::

## Add Logout to Your Application

Now that users can log into your application, they need [a way to log out](https://auth0.com/docs/logout/guides/logout-auth0). By default, when logout is enabled, Spring Security will log the user out of your application and clear the session. To enable successful logout of Auth0, you can provide a `LogoutHandler` to redirect users to your [Auth0 logout endpoint](https://auth0.com/docs/api/authentication?javascript#logout) (`https://${account.namespace}/v2/logout`) and then immediately redirect them to your application.

In the `SecurityConfig` class, provide a `LogoutHandler` that redirects to the Auth0 logout endpoint, and configure the `HttpSecurity` to add the logout handler:

```java
package com.auth0.example;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("<%= "${okta.oauth2.issuer}" %>")
    private String issuer;
    @Value("<%= "${okta.oauth2.client-id}" %>")
    private String clientId;

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/", "/images/**").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2Login(withDefaults())

            // configure logout with Auth0
            .logout(logout -> logout
                .addLogoutHandler(logoutHandler()));
        return http.build();
    }

    private LogoutHandler logoutHandler() {
        return (request, response, authentication) -> {
            try {
                String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
                response.sendRedirect(issuer + "v2/logout?client_id=" + clientId + "&returnTo=" + baseUrl);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        };
    }
}
```

You can then update your view to POST to the `/logout` endpoint (Spring Security provides this by default) to enable users to log out.

```html
<div sec:authorize="isAuthenticated()">
    <p>You are logged in!</p>
    <form name="logoutForm" th:action="@{/logout}" method="post">
        <button type="submit" value="Log out"/>
    </form>
</div>
```

:::panel Checkpoint
Add the logout link in the view of your application. When you click it, verify that your application redirects you the address you specified as one of the "Allowed Logout URLs" in the "Settings" and that you are no longer logged in to your application.
:::

## Show User Profile Information

You can retrieve the [profile information](https://auth0.com/docs/users/concepts/overview-user-profile) associated with logged-in users through the [OidcUser](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/oauth2/core/oidc/user/OidcUser.html) class, which can be used with the [AuthenticationPrincipal annotation](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/core/annotation/AuthenticationPrincipal.html).

In your controller, add the user's profile information to the model:

```java
@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model, @AuthenticationPrincipal OidcUser principal) {
        if (principal != null) {
            model.addAttribute("profile", principal.getClaims());
        }
        return "index";
    }
}
```

You can then use this profile information in your view, as shown below.

```html
<div sec:authorize="isAuthenticated()">
    <img th:src="<%= "${profile.get('picture')}" %>" th:attr="<%= "alt=${profile.get('name')}" %>"/>
    <h2 th:text="<%= "${profile.get('name')}" %>"></h2>
    <p th:text="<%= "${profile.get('email')}" %>"></p>
    <a th:href="@{/logout}">Log Out</a>
</div>
```

:::panel Checkpoint
Verify that you can display the user name or [any other `user` property](https://auth0.com/docs/users/references/user-profile-structure#user-profile-attributes) after you have logged in.
:::
