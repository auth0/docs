---
title: Add login to your Spring Webapp
description: Spring Boot and Spring Security support OIDC natively, enabling you to add authentication to your application without the need for any additional libraries. This guide demonstrates how to integrate Auth0 with any new or existing Spring Boot 2 web application.
interactive: true
files:
  - files/application
  - files/security-config
  - files/index
  - files/home-controller
  - files/logout-handler
  - files/security-config-logout
github:
    path: mvc-login
---

# Add login to your Spring Webapp

::: panel Using Spring WebFlux?
This tutorial uses [Spring MVC](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html). If you are using [Spring WebFlux](https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html#spring-web-reactive), the steps to add authentication are similar, but some implementation details are different. Refer to the [Spring Boot WebFlux Sample Code](https://github.com/auth0-samples/auth0-spring-boot-login-samples/tree/master/webflux-login) to see how to integrate Auth0 with your Spring Boot WebFlux application.
:::

<%= include('../../_includes/_configure_auth0_interactive', { 
  callback: 'http://localhost:3000/login/oauth2/code/auth0',
  returnTo: 'http://localhost:3000'
}) %>

## Configure Spring Boot application

### Add Spring dependencies

Spring Boot provides a `spring-boot-starter-oauth2-client` starter, which provides all the Spring Security dependencies needed to add authentication to your web application.

:::note
This guide uses [Thymeleaf](https://www.thymeleaf.org/) and the [Spring Security integration module](https://github.com/thymeleaf/thymeleaf-extras-springsecurity) for the view layer. If you are using a different view technology, the Spring Security configuration and components remain the same.
:::

If you're using Gradle, you can include these dependencies as shown below.

```groovy
plugins {
    id 'java'
    id 'org.springframework.boot' version '2.5.12'
    id 'io.spring.dependency-management' version '1.0.9.RELEASE'
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-oauth2-client'
    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
    implementation 'org.thymeleaf.extras:thymeleaf-extras-springsecurity5'
}
```

If you are using Maven:

```xml
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
The Spring Security 5.4.0 release includes [a fix](https://github.com/spring-projects/spring-security/pull/8357) to validate the ID token issuer claim. Upgrade to 5.4.0 or higher when possible.
:::

## Configure Spring Security {{{ data-action=code data-code="application.yml#1:16" }}}

Spring Security makes it easy to configure your application for authentication with OIDC providers such as Auth0. In your application's configuration, configure the OAuth2 client and provider. The sample to the right shows an `application.yml` file, though you can also use properties files or any of the other [supported externalization mechanisms](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-external-config).

:::note
Spring Security uses the `issuer-uri` property value to retrieve the information necessary to enable login and ID token validation at runtime.

If you need more property mappings, [review the Spring documentation](https://docs.spring.io/spring-security/site/docs/current/reference/html5/#oauth2login-boot-property-mappings) for further customization.
:::

## Add login to your application {{{ data-action=code data-code="SecurityConfig.java" }}}

To enable user login with Auth0, extend the [WebSecurityConfigurerAdapter](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/configuration/WebSecurityConfigurerAdapter.html) class and override the `configure(HttpSecurity http)` method.

Later in this quickstart, you will overwrite this file with `SecurityConfigWithLogout.java` to provide extra configurations to support the logout feature.

:::note
You can configure the [HttpSecurity](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html) instance to require authentication on all or certain paths. For example, to require authentication on all paths except the home page:

```java
http.authorizeRequests()
      .mvcMatchers("/").permitAll()
      .anyRequest().authenticated()
      .and().oauth2Login();
```
:::

## Add front page {{{ data-action=code data-code="index.html" }}}

Spring Security uses the client configuration you defined earlier to handle login when a user visits the `/oauth2/authorization/auth0` path of your application. You can use this to create a login link in your application.

This page returns the user attributes when the user authentications. You will use the `/logout` link in the template to implement the logout feature.

## Add controller {{{ data-action=code data-code="HomeController.java" }}}

Create a controller to handle the incoming request. This controller renders the `index.html` page. When the user authenticates, the application retrieves the users's profile information attributes to render the page.

::::checkpoint

:::checkpoint-default

When you click the login link, verify the application redirects you to the [Auth0 Universal Login](https://auth0.com/universal-login) page and that you can now log in or sign up using a username and password or a social provider.

:::

:::checkpoint-failure
If your application did not allow login or signup:
* Verify you configured the correct Callback URL
* Verify you added the login link to redirect to `/oauth2/authorization/auth0`

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::

![Auth0 Universal Login](/media/quickstarts/universal-login.png)

:::note
Auth0 enables the Google social provider by default on new tenants and offers you developer keys to test logging in with [social identity providers](https://auth0.com/docs/connections/identity-providers-social). However, these developer keys have some limitations that may cause your application to behave differently. For more details on what this behavior may look like and how to fix it, consult the [Test Social Connections with Auth0 Developer Keys](https://auth0.com/docs/connections/social/devkeys#limitations-of-developer-keys) document.
:::

## Add logout to your application {{{ data-action=code data-code="LogoutHandler.java" }}}

Now that users can log into your application, they need [a way to log out](https://auth0.com/docs/logout/guides/logout-auth0). By default, Spring Security logs user out of your application and clears the session when you enable logout. To enable successful Auth0 logout, extend the `SecurityContextLogoutHandler` class to redirect users to your [Auth0 logout endpoint](https://auth0.com/docs/api/authentication?javascript#logout) (`https://${account.namespace}/v2/logout`) and then immediately redirect them to your application.

## Update your security configuration {{{ data-action=code data-code="SecurityConfigWithLogout.java" }}}

Next, update your implementation of `WebSecurityConfigurerAdapter` to register your logout handler and specify the request path that should trigger logout (`/logout` in the example below).

You can remove the `SecurityConfig.java` and replace it with `SecurityConfigWithLogout.java` or update the contents from the one file to another.

::::checkpoint

:::checkpoint-default
When you click logout link, the application should redirect you to the address you specified as one of the "Allowed Logout URLs" in the "Settings" and you are no longer logged in to your application.
:::

:::checkpoint-failure
If your application did not allow logout:
* Verify you configured the correct logout URL
* Verify you added the logout link to redirect to `/logout`

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::