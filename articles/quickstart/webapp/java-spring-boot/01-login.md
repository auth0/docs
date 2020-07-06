---
title: Login
description: Spring Boot and Spring Security support OIDC natively, enabling you to add authentication to your application without the need for any additional libraries. This guide demonstrates how to integrate Auth0 with any new or existing Spring Boot 2 web application.
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

:::note
This guide uses [Thymeleaf](https://www.thymeleaf.org/) and the [Spring Security integration module](https://github.com/thymeleaf/thymeleaf-extras-springsecurity) for the view layer. If you are using a different view technology, the Spring Security configuration and components remain the same.
:::

If you're using Gradle, you can include these dependencies as shown below.

```groovy
plugins {
    id 'java'
    id 'org.springframework.boot' version '2.3.0.RELEASE'
    id 'io.spring.dependency-management' version '1.0.9.RELEASE'
}

implementation 'org.springframework.boot:spring-boot-starter-web'
implementation 'org.springframework.boot:spring-boot-starter-oauth2-client'
implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
implementation 'org.thymeleaf.extras:thymeleaf-extras-springsecurity5'
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
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-thymeleaf</artifactId>
    </dependency>
    <dependency>
        <groupId>org.thymeleaf.extras</groupId>
        <artifactId>thymeleaf-extras-springsecurity5</artifactId>
    </dependency>
</dependencies>
```

:::note
The Spring Security 5.4.0 release will include [a fix](https://github.com/spring-projects/spring-security/pull/8357) to validate the issuer claim of the ID token. You should update to this release when available.
:::

### Configure Spring Security

Spring Security makes it easy to configure your application for authentication with OIDC providers such as Auth0. In your application's configuration, configure the OAuth2 client and provider. The sample below uses an `application.yml` file, though you can also use properties files or any of the other [supported externalization mechanisms](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-external-config).

:::note
Spring Security will use the `issuer-uri` property value to retrieve all the information necessary to enable login and validation of the ID token at runtime.

[Additional property mappings](https://docs.spring.io/spring-security/site/docs/current/reference/html5/#oauth2login-boot-property-mappings) are available for further customization, if required.
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

To enable users to login with Auth0, you will need to extend the [WebSecurityConfigurerAdapter](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/configuration/WebSecurityConfigurerAdapter.html) class and override the `configure(HttpSecurity http)` method.

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

Spring Security will use the client configuration you defined earlier to handle login when a user visits the `/oauth2/authorization/auth0` path of your application. You can use this to create a login link in your application.

```html
<!-- src/main/resources/templates/index.html -->
<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:sec="http://www.thymeleaf.org/thymeleaf-extras-springsecurity5">
    <body>
        <div sec:authorize="!isAuthenticated()">
            <a th:href="@{/oauth2/authorization/auth0}">Log In</a>
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

![Auth0 Universal Login](https://cdn.auth0.com/blog/universal-login/lightweight-login.png)

:::note
Auth0 enables the Google social provider by default on new tenants and offers you developer keys to test logging in with [social identity providers](https://auth0.com/docs/connections/identity-providers-social). However, these developer keys have some limitations that may cause your application to behave differently. For more details on what this behavior may look like and how to fix it, consult the [Test Social Connections with Auth0 Developer Keys](https://auth0.com/docs/connections/social/devkeys#limitations-of-developer-keys) document.
:::

## Add Logout to Your Application

Now that users can log into your application, they need [a way to log out](https://auth0.com/docs/logout/guides/logout-auth0). By default, when logout is enabled, Spring Security will log the user out of your application and clear the session. To enable successful logout of Auth0, you can extend the `SecurityContextLogoutHandler` class to redirect users to your [Auth0 logout endpoint](https://auth0.com/docs/api/authentication?javascript#logout) (`https://${account.namespace}/v2/logout`) and then immediately redirect them to your application.

```java
package com.auth0.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Needed to perform SSO logout with Auth0. By default, Spring will clear the SecurityContext and the session.
 * This controller will also log users out of Auth0 by calling the Auth0 logout endpoint.
 */
@Controller
public class LogoutHandler extends SecurityContextLogoutHandler {

    private final ClientRegistrationRepository clientRegistrationRepository;

    /**
     * Create a new instance with a {@code ClientRegistrationRepository}, so that we can look up information about the
     * configured provider to call the Auth0 logout endpoint. Called by the Spring framework.
     *
     * @param clientRegistrationRepository the {@code ClientRegistrationRepository} for this application.
     */
    @Autowired
    public LogoutHandler(ClientRegistrationRepository clientRegistrationRepository) {
        this.clientRegistrationRepository = clientRegistrationRepository;
    }

    /**
     * Delegates to {@linkplain SecurityContextLogoutHandler} to log the user out of the application, and then logs
     * the user out of Auth0.
     *
     * @param httpServletRequest the request.
     * @param httpServletResponse the response.
     * @param authentication the current authentication.
     */
    @Override
    public void logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                       Authentication authentication) {

        // Invalidate the session and clear the security context
        super.logout(httpServletRequest, httpServletResponse, authentication);

        // Build the URL to log the user out of Auth0 and redirect them to the home page.
        // URL will look like https://YOUR-DOMAIN/v2/logout?clientId=YOUR-CLIENT-ID&returnTo=http://localhost:3000
        String issuer = (String) getClientRegistration().getProviderDetails().getConfigurationMetadata().get("issuer");
        String clientId = getClientRegistration().getClientId();
        String returnTo = ServletUriComponentsBuilder.fromCurrentContextPath().build().toString();

        String logoutUrl = UriComponentsBuilder
                .fromHttpUrl(issuer + "v2/logout?client_id={clientId}&returnTo={returnTo}")
                .encode()
                .buildAndExpand(clientId, returnTo)
                .toUriString();

        try {
            httpServletResponse.sendRedirect(logoutUrl);
        } catch (IOException ioe) {
            // Handle or log error redirecting to logout URL
        }
    }

    /**
     * Gets the Spring ClientRegistration, which we use to get the registered client ID and issuer for building the
     * {@code returnTo} query parameter when calling the Auth0 logout API.
     *
     * @return the {@code ClientRegistration} for this application.
     */
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

You can then update your view to add a logout link for authenticated users.

```html
<div sec:authorize="isAuthenticated()">
    <p>You are logged in!</p>
    <a th:href="@{/logout}">Log Out</a>
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
    <img th:src="<%= "${profile.get('picture')}" %>" th:attr="<%= "alt=%{profile.get('name')}" %>"/>
    <h2 th:text="<%= "${profile.get('name')}" %>"></h2>
    <p th:text="<%= "${profile.get('email')}" %>"></p>
    <a th:href="@{/logout}">Log Out</a>
</div>
```

:::panel Checkpoint
Verify that you can display the user name or [any other `user` property](https://auth0.com/docs/users/references/user-profile-structure#user-profile-attributes) after you have logged in.
:::
