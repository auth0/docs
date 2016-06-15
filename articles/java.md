# Java technologies and Auth0 libraries

Here at Auth0 we try to offer as many libraries as possibly to make your life easier and we understand, that especially when it comes to Java technologies, things can get a bit confussing. In this document you can find a listing of the Java technologies for which we offer guides, libraries and sample projects.

## Java Servlet

A simple servlet based solution. It is mostly available for legacy integration needs with older Java style web apps. 

- [Documentation](/server-platforms/java-servlet)
- [Library](https://github.com/auth0/auth0-servlet)
- [Sample Project](https://github.com/auth0-samples/auth0-servlet-sample)

## Java Spring MVC

A modern Java Spring library that allows you to use Auth0 with Java Spring for server-side MVC web apps. This is the right choice if you are using Spring / Spring Boot but don't want to use Spring Security.

- [Documentation](/server-platforms/java-spring-mvc)
- [Library](https://github.com/auth0/auth0-spring-mvc)
- [Sample Project](https://github.com/auth0-samples/auth0-spring-mvc-sample)

## Java Spring Security MVC

A modern Java Spring library that allows you to use Auth0 with Spring Security for server-side MVC web apps. This provides full integration with Spring Security.

- [Documentation](/server-platforms/java-spring-security-mvc)
- [Library](https://github.com/auth0/auth0-spring-security-mvc)
- [Sample Project](https://github.com/auth0-samples/auth0-spring-security-mvc-sample)

> All three technologies displayed above, adopt the `Oauth2 / OIDC Authorization Code Grant` flow in which authentication results in a callback to the server-side application with a `code`. This is then exchanged for [id_token](/tokens/id_token) and [access_token](/tokens/access_token) on the server-side (as part of the callback), and once the tokens have been received by the application, then `UserProfile` information can also be retrieved via request with a valid Token.

## Java Spring Security API

A modern Java Spring library that allows you to use Auth0 with Spring Security. Leverages Spring Boot dependencies. Validates the JWT from Auth0 in every API call to assert authentication according to configuration. This library would be suitable for headless APIs and SPA (single page application) backend end server scenarios.

- [Documentation](/server-apis/java-spring-security-api)
- [Library](https://github.com/auth0/auth0-spring-security-api)
- [Sample Project](https://github.com/auth0-samples/auth0-spring-security-api-sample)

## Using Auth0 with Spring Boot and Spring Security

We have created a [sample application](https://github.com/auth0-samples/auth0-spring-security-mvc-sso-sample) that demonstrates using Auth0 with Spring Boot and Spring Security to create two traditional server-side MVC web apps that are configured for Single Sign On with one another. 

The aim of this solution is to provide a simple, no-frills sample developers can follow to understand the orchestration required to achieve SSO using Auth0 using Java, without having to also cope with understanding additional libraries or frameworks.

## More information

- [auth0-java](https://github.com/auth0/auth0-java): This is a Client library to make calls to our Authentication and Management APIs.

- [java-jwt](https://github.com/auth0/java-jwt): This is used for performing JWT Token related actions (JWT creation, verification, etc.)