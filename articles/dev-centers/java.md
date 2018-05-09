---
title: Java Developer Center
description: Resources and documentation for Java developers
logo: java
---

# Java SDK Developer Center

Here at Auth0 we try to offer as many libraries as needed to ensure we make your life as easy as possible. We understand when it comes to Java technologies things can get a bit confusing, especially given the number of prominent third party frameworks, libraries, and topologies to cover. In this document you can find a listing of the Java technologies for which we currently offer guides, libraries and sample projects. If you can’t find something you need then please let us know, and where possible we’ll make every effort to have it covered.

## Java Servlet

A simple servlet based solution, suitable if you are using a legacy application or alternate Web MVC Framework without Spring support. If your application only needs secured endpoints and the ability to programmatically work with a Principal object for GrantedAuthority checks this library is a good fit.

- [Documentation](/server-platforms/java)
- [Library](https://github.com/auth0/auth0-servlet)
- [Sample Project](https://github.com/auth0-samples/auth0-servlet-sample)

## Java Spring MVC

A modern Java Spring library that allows you to use Auth0 with Java Spring for server-side MVC web apps. This is the right choice if you are using Spring / Spring Boot but don't want to use Spring Security.

- [Documentation](/server-platforms/java-spring-mvc)
- [Library](https://github.com/auth0/auth0-spring-mvc)
- [Sample Project](https://github.com/auth0-samples/auth0-spring-mvc-sample): Simple sample project that demonstrates using Auth0 with Java Spring to create a Secured MVC Web Application.
- [Sample Project demonstrating Lock, auth0.js, Social Connection Login, Database Connection and Account Linking](https://github.com/auth0-samples/auth0-spring-boot-social-dbconnection-link): Extends the simpler [Auth0 Spring MVC Sample Project](https://github.com/auth0-samples/auth0-spring-mvc-sample) and demonstrates Social Login, Database Connection Login and [account linking](/link-accounts). In this app, you can choose to login either with a Social Login or a Database Connection. If you login using Social Login and have not already linked you DB Connection then you are requested to do so. You can find details on how to setup and use this sample application in the _README_ of the [GitHub repository](https://github.com/auth0-samples/auth0-spring-boot-social-dbconnection-link).
- [Sample Project demonstrating Passwordless Authentication, Multifactor Authentication opt-in & account linking](https://github.com/auth0-samples/auth0-spring-mvc-passwordless-mfa-sample): Extends the simpler [Auth0 Spring MVC Sample Project](https://github.com/auth0-samples/auth0-spring-mvc-sample) and demonstrates using Auth0 (including Lock Passwordless and Auth0.js) with Java Spring to create a Secured MVC Web Application using [Passwordless Authentication](/connections/passwordless), [Multifactor Authentication](/multifactor-authentication) Opt-in & [account linking](/link-accounts). You can find details on how to setup and use this sample application in the _README_ of the [GitHub repository](https://github.com/auth0-samples/auth0-spring-mvc-passwordless-mfa-sample.

## Java Spring Security MVC

A modern Java Spring library that allows you to use Auth0 with Spring Security for server-side MVC web apps. This provides full integration with Spring Security.

- [Documentation](/server-platforms/java-spring-security-mvc)
- [Library](https://github.com/auth0/auth0-spring-security-mvc)
- [Sample Project](https://github.com/auth0-samples/auth0-spring-security-mvc-sample)

::: panel Authorization Code Grant
All three technologies displayed above, adopt the `Oauth2 / OIDC Authorization Code Grant` flow in which authentication results in a callback to the server-side application with a `code`. This is then exchanged for [id_token](/tokens/id_token) and [access_token](/tokens/access_token) on the server-side (as part of the callback), and once the tokens have been received by the application, then `UserProfile` information can also be retrieved via request with a valid Token.
:::

## Java Spring Security API

A modern Java Spring library that allows you to use Auth0 with Spring Security. Leverages Spring Boot dependencies. Validates the JWT from Auth0 in every API call to assert authentication according to configuration. This library would be suitable for headless APIs and SPA (single page application) backend end server scenarios.

- [Documentation](/server-apis/java-spring-security)
- [Library](https://github.com/auth0/auth0-spring-security-api)
- [Sample Project](https://github.com/auth0-samples/auth0-spring-security-api-sample)
- [Companion SPA Applications](https://github.com/auth0-samples/auth0-spring-security-api-client-samples): Sample application that works as a companion for the [Auth0 Spring Security API Sample](https://github.com/auth0-samples/auth0-spring-security-api-sample) and [Auth0 Spring Security API Resource Server Sample](#auth0-resource-server-sample-using-spring-boot-and-spring-security). This sample provides an easy to understand seed project for users wishing to combine Java Spring Security API Server with a single page application front-end. The sample can run in two different modes:
  - The SPA and API Server trust one another, and share the same Auth0 application information. In other words, they both have the same ClientId and therefore share the same Audience in their JWT Tokens. Hence the JWT Token received upon successful authentication in the SPA application is also passed in the Authorization Bearer header of the AJAX requests to the API Server. The API Server accepts the audience as it is the same as its own.
  - The SPA application and API Server each have their own Auth0 Application on a shared Tenant (Account / Domain). In this situation, each has a different ClientId, and the Audience of the JWT Token generated for each application is different. The SPA application logs in and receives a JWT Token for authentication / authorization checks local to the SPA application. When making AJAX requests to the API Server, a delegation token is used instead - in effect, the SPA application swaps its own JWT Token for a JWT Token that is valid for requests to the API Server.
  You can find details on how to setup and use this sample application at the _README_ of the [GitHub repository](https://github.com/auth0-samples/auth0-spring-security-api-client-samples/tree/master/auth0-spring-security-api-angular-client).

## Using Auth0 with Spring Boot and Spring Security for Single Sign On (SSO)

We have created a [sample application](https://github.com/auth0-samples/auth0-spring-security-mvc-sso-sample) that demonstrates using Auth0 with Spring Boot and Spring Security to create two traditional server-side MVC web apps that are configured for Single Sign On with one another. `app1.com` is the main _portal_ website and `app2.com` is a _partner_ website that depends on `app1.com` for SSO authentication. The sample offers also one more _portal_ website, `app3.com`, which is a Single Page Application written in Angular 1.x. This is optional and provided for those wishing to do SSO with a mix of Server side and Single Page Apps.

The aim of this solution is to provide a simple, no-frills sample, developers can follow to understand the orchestration required to achieve SSO using Auth0 using Java, without having to also cope with understanding additional libraries or frameworks.

You can find more details on how to setup and use this sample application [here](https://github.com/auth0-samples/auth0-spring-security-mvc-sso-sample).

## Auth0 Resource Server Sample using Spring Boot and Spring Security

We have created a [sample application](https://github.com/auth0-samples/auth0-spring-security-api-resource-server-sample) that demonstrates using Auth0 with Spring Boot and Spring Security to create a secure Resource Server. This sample would be suitable for headless APIs and SPA (single page application) backend end server scenarios. It is specifically intended to demonstrate how to setup and read `scope` information from an Auth0 IDP JWT [Access Token](/tokens/access_token), and use this information to control authentication and authorization to secured endpoints.

This sample application shows you how to:
- Configure and run Java based Spring API server with Auth0 and Spring Security.
- Use 100% Java Configuration (Annotations).
- Secure one or more URL endpoints with Role / Authority based permissions (ROLE_USER, ROLE_ADMIN, and so on).
- Secure Java Services using method level security annotations for role based access control.

You can find more details on how to setup and use this sample application [here](https://github.com/auth0-samples/auth0-spring-security-api-resource-server-sample).

## More libraries

- [auth0-java](https://github.com/auth0/auth0-java): This is an application (client) library to make calls to our Authentication and Management APIs.

- [java-jwt](https://github.com/auth0/java-jwt): This library is used for performing JWT Token related actions (JWT creation, verification, and so on)
