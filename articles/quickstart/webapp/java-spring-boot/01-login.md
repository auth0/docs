---
title: Login
description: Spring Boot enables you to add authentication to your application quickly and to gain access to user profile information. This guide demonstrates how to integrate Auth0 with any new or existing Spring Boot 2 web application.
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

<%= include('../_includes/_getting_started', { library: 'Java Spring Security', callback: 'http://localhost:3000/login/oauth2/code/auth0' }) %>

<%= include('../../../_includes/_logout_url', { returnTo: 'http://localhost:3000/' }) %>

## Configure Spring Boot Application

### Add Spring dependencies

Spring Boot provides a `spring-boot-starter-oauth2-client` starter, which provides all the Spring Security dependencies needed to add authentication to your web application.

If you're using Gradle, you can include these dependencies as shown below.

```java
plugins {
    id 'java'
    id 'org.springframework.boot' version '2.3.0.RELEASE'
    id 'io.spring.dependency-management' version '1.0.9.RELEASE'
}

implementation 'org.springframework.boot:spring-boot-starter-web'
implementation 'org.springframework.boot:spring-boot-starter-oauth2-client'
```

If you are using Maven:

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.3.0.RELEASE</version>
    <relativePath/>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.security</groupId>
        <artifactId>spring-boot-starter-oauth2-client</artifactId>
    </dependency>
</dependencies>
```

### Configure Spring Security

Spring Security makes it easy to configure your application for authentication with OIDC providers such as Auth0. In your application's configuration, configure the OAuth2 client and provider. The sample below uses an `application.yml` file, though you can also use properties files or any of the other [supported externalization mechanisms](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-external-config).

:::note
You should never store sensitive data such as secrets in source control.
:::

```yaml
# src/main/resources/application.yml

spring:
  security:
    oauth2:
      client:
        registration:
          auth0:
            client-id: ${account.clientId}
            client-secret: YOUR_CLIENT_SECRET
            scope:
              - openid
              - profile
              - email
        provider:
          auth0:
            # trailing slash is important!
            issuer-uri: https://${account.namespace}/
```

## Add Login to Your Application

To enable users to login with Auth0, you will need to extend the `WebSecurityConfigurerAdapter` class and override the `configure(HttpSecurity http)` method.

```java
package com.auth0.example;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.oauth2Login();
    }
}
```

:::note
You can further configure the [HttpSecurity](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html) instance to require authentication on all or certain paths. For example, to require authentication on all paths except the home page:

```java
http.authorizeRequests()
      .mvcMatchers("/").permitAll()
      .anyRequest().authenticated()
      .and().oauth2Login();
```
:::

Spring Security will use the client configuration you defined earlier to handle login when a user visits the `/login/oauth2/code/auth0` path of your application. You can use this to create a Login link in your application.

```html
<a href="/oauth2/authorization/auth0">Login</a>
```

## Add Logout to Your Application

Now that users can log into your application, they need [a way to log out](https://auth0.com/docs/logout/guides/logout-auth0). By default, when logout is enabled, Spring Security will log the user out of your application and clear the session. To enable successful logout of Auth0, you can extend the `SecurityContextLogoutHandler` class to redirect users to your [Auth0 logout endpoint](https://auth0.com/docs/api/authentication?javascript#logout) (`https://${account.namespace}/v2/logout`) and then immediately redirect them to your application.

```java
package com.auth0.example;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriBuilderFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Needed to perform SSO logout with Auth0
 */
@Controller
public class LogoutHandler extends SecurityContextLogoutHandler {

    private final ClientRegistrationRepository clientRegistrationRepository;
    private final String issuer;

    public LogoutHandler(ClientRegistrationRepository clientRegistrationRepository,
                         @Value("<%= "${spring.security.oauth2.client.provider.auth0.issuer-uri}" %>") String issuer) {

        this.clientRegistrationRepository = clientRegistrationRepository;
        this.issuer = issuer;
    }

    @Override
    public void logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                       Authentication authentication) {

        // Invalidate the session and clear the security context
        super.logout(httpServletRequest, httpServletResponse, authentication);

        // Log user out of Auth0. Return to the application's home page ("/").
        String returnTo = ServletUriComponentsBuilder.fromCurrentContextPath().build().toString();
        String logoutUrl = String.format(
                "%sv2/logout?client_id=%s&returnTo=%s",
                this.issuer,
                getClientRegistration().getClientId(),
                returnTo
        );

        try {
            httpServletResponse.sendRedirect(logoutUrl);
        } catch (IOException ioe) {
            // log or handle exception
        }
    }

    private ClientRegistration getClientRegistration() {
        return this.clientRegistrationRepository.findByRegistrationId("auth0");
    }
}
```

Next, you need to update your implementation of `WebSecurityConfigurerAdapter` to register your logout handler and specify the request path that should trigger logout (`/logout` in the example below).

```java
package com.auth0.example;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final LogoutHandler logoutHandler;

    public SecurityConfig(LogoutHandler logoutHandler) {
        this.logoutHandler = logoutHandler;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
       http
          .oauth2Login()
          .and().logout()
          .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
          .addLogoutHandler(logoutHandler);
    }
}
```

## Show User Profile Information

You can retrieve the [profile information](https://auth0.com/docs/users/concepts/overview-user-profile) associated with logged-in users through the [OidcUser](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/oauth2/core/oidc/user/OidcUser.html) class, which can be used with the [AuthenticationPrincipal annotation](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/core/annotation/AuthenticationPrincipal.html).

```java
package com.auth0.example;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProfileController {

    @GetMapping("/profile")
    public String profile(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        // Add user profile info to the model for use by the view
        model.addAttribute("profile", oidcUser.getClaims());
        return "profile";
    }
}
```

You can then use this profile information in your view. The example below uses [Thymeleaf](https://www.thymeleaf.org/) and the [Spring Security integration module](https://github.com/thymeleaf/thymeleaf-extras-springsecurity) to display the user's name and email if the user is logged in.

```html
<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:sec="http://www.thymeleaf.org/thymeleaf-extras-springsecurity5">
<head></head>
<body>
  <div sec:authorize="isAuthenticated()">
    <img th:src="<%= "${profile.get('picture')}" %>"/>
    <h2 th:text="<%= "${profile.get('name')}" %>"></h2>
    <p th:text="<%= "${profile.get('email')}" %>>"></p>
  </div>
</body>
</html>
```
