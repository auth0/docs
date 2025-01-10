---
title: Add Login to your Java Servlet application
description: This tutorial demonstrates how to add user login to a Java Servlet application.
interactive: true
files:
  - files/web
  - files/authentication-controller-provider
  - files/login-servlet
  - files/callback-servlet
  - files/home-servlet
  - files/logout-servlet
topics:
  - quickstarts
  - webapp
  - login
  - java
github:
  path: 01-Login
---

# Add Login to Your Java Servlet Application

Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with any new or existing Java Servlet application.

<%= include('../../_includes/_configure_auth0_interactive', { 
  callback: 'http://localhost:3000/callback',
  returnTo: 'http://localhost:3000/login'
}) %>

## Integrate Auth0 in your application

### Setup dependencies

To integrate your Java application with Auth0, add the following dependencies:

- **javax.servlet-api**: is the library that allows you to create Java Servlets. You then need to add a Server dependency like Tomcat or Gretty, which one is up to you. Check our sample code for more information.
- **auth0-java-mvc-commons**: is the [Java library](https://github.com/auth0/auth0-java-mvc-common) that allows you to use Auth0 with Java for server-side MVC web apps. It generates the Authorize URL that you need to call in order to authenticate and validates the result received on the way back to finally obtain the [Auth0 Tokens](/tokens) that identify the user.

If you are using Gradle, add them to your `build.gradle`:

```java
// build.gradle

compile 'javax.servlet:javax.servlet-api:3.1.0'
compile 'com.auth0:mvc-auth-commons:1.+'
```

If you are using Maven, add them to your `pom.xml`:

```xml
<!-- pom.xml -->

<dependency>
  <groupId>com.auth0</groupId>
  <artifactId>mvc-auth-commons</artifactId>
  <version>[1.0, 2.0)</version>
</dependency>
<dependency>
  <groupId>javax.servlet</groupId>
  <artifactId>javax.servlet-api</artifactId>
  <version>3.1.0</version>
</dependency>
```

## Configure your Java application {{{ data-action=code data-code="web.xml#6:14" }}}

Your Java App needs some information in order to authenticate against your Auth0 account. The samples read this information from the deployment descriptor file `src/main/webapp/WEB-INF/web.xml`, but you could store them anywhere else.

This information will be used to configure the **auth0-java-mvc-commons** library to enable users to login to your application. To learn more about the library, including its various configuration options, see the [library's documentation](https://github.com/auth0/auth0-java-mvc-common/blob/master/README.md).


::: panel Check populated attributes
If you downloaded this sample using the **Download Sample** button, the `domain`, `clientId` and `clientSecret` attributes will be populated for you. You should verify that the values are correct, especially if you have multiple Auth0 applications in your account.
:::

### Project structure

The example project, which can be downloaded using the **Download Sample** button, has the following structure:

```text
- src
-- main
---- java
------ com
-------- auth0
---------- example
------------ Auth0Filter.java
------------ AuthenticationControllerProvider.java
------------ HomeServlet.java
------------ CallbackServlet.java
------------ LoginServlet.java
------------ LogoutServlet.java
---- webapp
------ WEB-INF
-------- jsp
---------- home.jsp
-------- web.xml
- build.gradle
```

The project contains a single JSP: the `home.jsp` which will display the tokens associated with the user after a successful login and provide the option to logout.

The project contains a WebFilter: the `Auth0Filter.java` which will check for existing tokens before giving the user access to our protected `/portal/*` path. If the tokens don't exist, the request will be redirected to the `LoginServlet`.

The project contains also four servlets:
- `LoginServlet.java`: Invoked when the user attempts to log in. The servlet uses the `client_id` and `domain` parameters to create a valid Authorize URL and redirects the user there.
- `CallbackServlet.java`: The servlet captures requests to our Callback URL and processes the data to obtain the credentials. After a successful login, the credentials are then saved to the request's HttpSession.
- `HomeServlet.java`: The servlet reads the previously saved tokens and shows them on the `home.jsp` resource.
- `LogoutServlet.java`: Invoked when the user clicks the logout link. The servlet invalidates the user session and redirects the user to the login page, handled by the `LoginServlet`.
- `AuthenticationControllerProvider`: Responsible to create and manage a single instance of the `AuthenticationController`
  
## Create the AuthenticationController {{{ data-action=code data-code="AuthenticationControllerProvider.java#6-32 }}}

To enable users to authenticate, create an instance of the `AuthenticationController` provided by the `auth0-java-mvc-commons` SDK using the `domain`, `clientId`, and `clientSecret`.  The sample shows how to configure the component for use with tokens signed using the RS256 asymmetric signing algorithm, by specifying a `JwkProvider` to fetch the public key used to verify the token's signature. See the [jwks-rsa-java repository](https://github.com/auth0/jwks-rsa-java) to learn about additional configuration options. If you are using HS256, there is no need to configure the `JwkProvider`. 

:::note
The `AuthenticationController` does not store any context, and is inteded to be reused. Unneccessary creation may result in additonal resources being created which could impact performance.
:::

## Login Redirection {{{ data-action=code data-code="LoginServlet.java#21:23" }}}

To enable users to log in, your application will redirect them to the [Universal Login](https://auth0.com/docs/universal-login) page. Using the `AuthenticationController` instance, you can generate the redirect URL by calling the `buildAuthorizeUrl(HttpServletRequest request, HttpServletResponse response, String redirectUrl)` method. The redirect URL must be the URL that was added to the **Allowed Callback URLs** of your Auth0 application.

## Handling the tokens {{{ data-action=code data-code="CallbackServlet.java#16:37" }}}

After the user logs in, the result will be received in our `CallbackServlet` via either a GET or POST HTTP request. Because we are using the Authorization Code Flow (the default), a GET request will be sent. If you have configured the library for the Implicit Flow, a POST request will be sent instead.

The request holds the call context that the library previously set by generating the Authorize URL with the `AuthenticationController`. When passed to the controller, you get back either a valid `Tokens` instance or an Exception indicating what went wrong. In the case of a successful call, you need to save the credentials somewhere to access them later. You can use the `HttpSession` of the request by using the `SessionsUtils` class included in the library.

::: note
It is recommended to store the time in which we requested the tokens and the received `expiresIn` value, so that the next time when we are going to use the token we can check if it has already expired or if it's still valid. For the sake of this sample, we will skip that validation.
:::

## Display the home page {{{ data-action=code data-code="HomeServlet.java#4:14" }}}

Now that the user is authenticated (the tokens exists), the `Auth0Filter` will allow them to access our protected resources. In the `HomeServlet` we obtain the tokens from the request's session and set them as the `userId` attribute so they can be used from the JSP code.

## Handle logout {{{ data-action=code data-code="LogoutServlet.java#13:30" }}}

To properly handle logout, we need to clear the session and log the user out of Auth0. This is handled in the `LogoutServlet` of our sample application.

First, we clear the session by calling `request.getSession().invalidate()`. We then construct the logout URL, being sure to include the `returnTo` query parameter, which is where the user will be redirected to after logging out. Finally, we redirect the response to our logout URL.

## Run the sample {{{ data-action=code data-code="LogoutServlet.java#13:30" }}}

To run the sample from a terminal, change the directory to the root folder of the project and execute the following line:

```bash
./gradlew clean appRun
```

After a few seconds, the application will be accessible on `http://localhost:3000/`. Try to access the protected resource [http://localhost:3000/portal/home](http://localhost:3000/portal/home) and note how you're redirected by the `Auth0Filter` to the Auth0 Login Page. The widget displays all the social and database connections that you have defined for this application in the [dashboard](${manage_url}/#/).

![Auth0 Universal Login](/media/quickstarts/universal-login.png)

After a successful authentication, you'll be able to see the home page contents.

![Display Token](/media/articles/java/display-token.png)

Log out by clicking the **logout** button at the top right of the home page.
