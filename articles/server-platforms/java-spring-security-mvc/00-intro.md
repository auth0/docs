---
title: Introduction
description: This tutorial demonstrates how to use the Auth0 Java Spring Security MVC SDK to add authentication and authorization to your web app, using Spring Boot
---

<%= include('../../_includes/_signup') %>

This multistep quickstart guide will walk you through the process of managing authentication in your Java Spring Security Web Application with Auth0.

Auth0 provides and manages a [Spring Security MVC SDK](https://github.com/auth0/auth0-spring-security-mvc). This SDK allows you to use Auth0 with Java for server-side Spring Security web apps, leveraging Spring Boot dependencies.

__NOTE:__ You can find a listing of all our Java offerings and several sample projects in [Java technologies and Auth0 libraries](/java-overview).


## Sample Projects

There are two options to follow along this quickstart. You can either download the [seed project](https://github.com/auth0-samples/auth0-spring-security-mvc-sample/tree/master/00-Starter-Seed) or the samples provided at each page of this quickstart.

The seed is a regular Java Spring Security app, with all the Auth0 dependencies set, but nothing more. It's an empty canvas meant to be filled as you follow along the steps of this quickstart. If you prefer this option download the seed from our [GitHub repository](https://github.com/auth0-samples/auth0-spring-security-mvc-sample/tree/master/00-Starter-Seed) and follow along.

Instead you can choose to follow the samples that are included in each step. Each sample uses the [seed project](https://github.com/auth0-samples/auth0-spring-security-mvc-sample/tree/master/00-Starter-Seed) as a starting point and applies to it the configuration of each step, so for example the Login sample would be the [seed project](https://github.com/auth0-samples/auth0-spring-security-mvc-sample/tree/master/00-Starter-Seed) plus the configuration required to implement login functionality. If you choose to follow this approach continue reading, the rest of this document will guide you through setting up the required prerequisites.


### Seed project Structure

Let's take some time and explain how our [seed project](https://github.com/auth0-samples/auth0-spring-security-mvc-sample/tree/master/00-Starter-Seed) is structured.


```
- src
-- main
---- java
------ com
-------- auth0
---------- example
------------ App.java
------------ AppConfig.java
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
- `AppConfig.java`: The security configuration class. By subclassing, and overriding `authorizeRequests` method, you can define the endpoint security configuration (authentication and authorization) suitable for your own needs.
- `ErrorController.java`: The controller that handles the errors.
- `HomeController.java`: The controller that handles landing page requests.
- `LoginController.java`: The controller that handles the login.
- `LogoutController.java`: The controller that handles the logouts.

<%= include('_includes/_setup') %>

You are now ready to continue with the next tutorial in order to implement basic login using [Lock](/libraries/lock)!
