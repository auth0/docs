---
title: Introduction
description: This tutorial will show you how to use the Auth0 Java Spring MVC SDK to add authentication and authorization to your web app.
---

<%= include('../../_includes/_signup') %>

This multi-step quickstart will guide you through the process of managing authentication in your Java Spring Web Application with Auth0.

Auth0 provides and manages a [Spring MVC SDK](https://github.com/auth0/auth0-spring-mvc). This SDK allows you to use Auth0 with Java for server-side Spring web apps, leveraging Spring Boot dependencies.

__NOTE:__ You can find a listing of all our Java offerings and several sample projects in [Java technologies and Auth0 libraries](/java-overview).


## Seed &amp; Samples

There are two options to following along this quickstart. You can either download the [seed project](https://github.com/auth0-samples/auth0-spring-mvc-sample/tree/master/00-Starter-Seed) or the samples provided at each page of this quickstart.

The seed is a regular Java Spring app, with all the Auth0 dependencies set, but nothing more. It's an empty canvas meant to be filled as you follow along the steps of this quickstart. If you prefer this option download the seed from our [GitHub repository](https://github.com/auth0-samples/auth0-spring-mvc-sample/tree/master/00-Starter-Seed) and follow along.

Instead you can choose to follow the samples that are included in each step. Each sample uses the [seed project](https://github.com/auth0-samples/auth0-spring-mvc-sample/tree/master/00-Starter-Seed) as a starting point and applies to it the configuration of each step, so for example the Login sample would be the [seed project](https://github.com/auth0-samples/auth0-spring-mvc-sample/tree/master/00-Starter-Seed) plus the configuration required to implement login functionality. If you choose to follow this approach continue reading, the rest of this document will guide you through setting up the required prerequisites.


### Seed project structure

Let's take some time and explain how our [seed project](https://github.com/auth0-samples/auth0-spring-mvc-sample/tree/master/00-Starter-Seed) is structured.


```
- src
-- main
---- java
------ com
-------- auth0
---------- example
------------ App.java
------------ CallbackController.java
------------ ErrorController.java
------------ HomeController.java
------------ LoginController.java
------------ LogoutController.java
---- resources
------ application.properties
------ auth0.properties
---- webapp
------ WEB-INF
-------- jsp
---------- home.jsp
---------- login.jsp
-------- web.xml
- pom.xml
```

The project contains two JSP: the `login.jsp` that will handle the user login, and the `home.jsp` which will display user information after a successful login and provide the option to logout.

The project contains also the following files:
- `application.properties`: Configuration file that holds information such as the port your app will use, the logging level, etc.
- `auth0.properties`: Configuration file that holds Auth0 related information, like the client id, client secret, etc. You can find more detailed information in the [Configure your Java Spring app](#configure-your-java-spring-app) section of this document.
- `App.java`: A Java class that uses Spring Boot’s `SpringApplication.run()` method to launch the application.
- `CallbackController.java`: The controller that handles the callback.
- `ErrorController.java`: The controller that handles the errors.
- `HomeController.java`: The controller that handles landing page requests.
- `LoginController.java`: The controller that handles the login.
- `LogoutController.java`: The controller that handles the logouts.


## Create an application

<%= include('../../_includes/_java_new_app') %>

![App Dashboard](/media/articles/java/app_dashboard.png)


## Configure callback URLs

Callback URLs are URLs that Auth0 invokes after the authentication process. Auth0 routes your application back to this URL and attaches some details to it including a token. Callback URLs can be manipulated on the fly and that could be harmful. For security reasons, you will need to add your application's URL in the app's `Allowed Callback URLs`. This will enable Auth0 to recognize the URLs as valid. If omitted, authentication will not be successful for the app instance.

![Callback error](/media/articles/java/callback_error.png)

If you follow our seed project or the samples based on it, the values you must configure are:
- Allowed Callback URL: `http://localhost:3099/callback`
- Allowed Logout URLs: `http://localhost:3099/logout`


## Setup dependencies

To integrate your Java Spring application with Auth0 you need to have the following dependencies set:

- [auth0-spring-mvc](https://github.com/auth0/auth0-spring-mvc): is the Java library that allows you to use Auth0 with Java for Spring MVC web apps. It validates the [JWT](/jwt) from Auth0 in every API call to assert authentication according to configuration.

If you are using maven, add the dependency to your `pom.xml`:

${snippet(meta.snippets.dependencies)}

If you are using Gradle, add it to the dependencies block:

${snippet(meta.snippets.dependenciesGradle)}


## Configure your Java Spring app

Your Java Spring app needs some information in order to authenticate against your Auth0 account. Create a file called `auth0.properties` and place it under `src/main/resources`. Set the following settings:

${snippet(meta.snippets.setup)}

Here is a breakdown of what each attribute means:

- `auth0.domain`: Your auth0 domain (the tenant you have created when registering with auth0).
- `auth0.clientId`: The unique identifier for your application. You can find the correct value on the Settings of your app on [Auth0 dashboard](${uiURL}/#/).
- `auth0.clientSecret`: This secret will be used to sign and validate tokens which will be used in the different authentication flows. With this key your application will also be able to authenticate to some of the API endpoints (eg: to get an access token from an authorization code). You can find the correct value on the Settings of your app on [Auth0 dashboard](${uiURL}/#/).
- `auth0.onLogoutRedirectTo`: This is the page that users of your site are redirected to on logout. Should start with `/`.
- `auth0.securedRoute`: The URL pattern that should map to the URL endpoint you wish to secure. You should replace its value with the correct value for your implementation. It should start with `/`.
- `auth0.loginCallback`: The URL context path for the login callback endpoint. Should start with `/`.
- `auth0.loginRedirectOnSuccess`: The landing page URL context path for a successful authentication. Should start with `/`.
- `auth0.loginRedirectOnFail`: The URL context path for the page to redirect to upon failure. Should start with `/`.
- `auth0.servletFilterEnabled`: A boolean value that switches having an authentication filter enabled or not.


You are now ready to continue with [login](/quickstart/webapp/java-spring-mvc/01-login) tutorial in order to implement basic login using [Lock](/libraries/lock).
