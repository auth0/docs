---
title: Introduction
description: This tutorial demonstrates how to use the Auth0 Java SDK to add authentication and authorization to your web app
budicon: 715
---


This multi-step quickstart will guide you through the process of managing authentication in your Java Servlet Web Application with Auth0.

::: panel-info System Requirements
These tutorials and seed projects have been tested with the following:
- Java 7 or above
- Maven 3.0.x or above
:::

Auth0 provides and manages a [Servlet SDK](https://github.com/auth0/auth0-servlet). This SDK allows you to use Auth0 with Java for server-side MVC web apps. It presents a simple servlet based solution without introducing specific frameworks or libraries such as Spring.

__NOTE:__ You can find a listing of all our Java offerings and several sample projects in [Java technologies and Auth0 libraries](/java-overview).


## Sample Projects

There are two options to following along this quickstart. You can either download the [seed project](https://github.com/auth0-samples/auth0-servlet-sample/tree/master/00-Starter-Seed) or the samples provided at each page of this quickstart.

The seed is a regular java app, with all the Auth0 dependencies set, but nothing more. It's an empty canvas meant to be filled as you follow along the steps of this quickstart. If you prefer this option download the seed from our [GitHub repository](https://github.com/auth0-samples/auth0-servlet-sample/tree/master/00-Starter-Seed) and follow along.

Instead you can choose to follow the samples that are included in each step. Each sample uses the [seed project](https://github.com/auth0-samples/auth0-servlet-sample/tree/master/00-Starter-Seed) as a starting point and applies to it the configuration of each step, so for example the Login sample would be the [seed project](https://github.com/auth0-samples/auth0-servlet-sample/tree/master/00-Starter-Seed) plus the configuration required to implement login functionality. If you choose to follow this approach continue reading, the rest of this document will guide you through setting up the required prerequisites.

### Seed Project Structure

Let's take some time and explain how our [seed project](https://github.com/auth0-samples/auth0-servlet-sample/tree/master/00-Starter-Seed) is structured.


```text
- src
-- main
---- java
------ com
-------- auth0
---------- example
------------ HomeServlet.java
------------ LoginServlet.java
------------ LogoutServlet.java
---- webapp
------ WEB-INF
-------- jsp
---------- home.jsp
---------- login.jsp
-------- web.xml
- pom.xml
```

The project contains two JSP: the `login.jsp` that will handle the user login, and the `home.jsp` which will display user information after a successful login and provide the option to logout.

The project contains also three servlets:
- `HomeServlet.java`: The servlet retrieves the `AUTH0_USER` attribute, using `getAuth0User()`, appends the value at the request, and forwards the request to the `home.jsp` resource.
- `LoginServlet.java`: Invoked when the user attempts to login. The servlet retrieves the `auth0.client_id` and `auth0.domain` parameters, appends the values at the request, and forwards the request to the `login.jsp` resource.
- `LogoutServlet.java`: Invoked when the user clicks the logout link. The servlet invalidates the user session and redirects the user to the URL specified by the parameter `auth0.onLogoutRedirectTo`. We will cover what this parameter is and how it is set later on in this document.


## Create an Application

<%= include('../../_includes/_java_new_app') %>

![App Dashboard](/media/articles/java/app_dashboard.png)

<%= include('_includes/_setup') %>

You are now ready to continue with [login](/quickstart/webapp/java/01-login) tutorial in order to implement basic login using [Lock](/libraries/lock).
