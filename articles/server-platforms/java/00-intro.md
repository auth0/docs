---
title: Introduction
description: This tutorial will show you how to use the Auth0 Java SDK to add authentication and authorization to your web app.
---

This multi-step quickstart will guide you through the process of managing authentication in your Java Servlet Web Application with Auth0.

Auth0 provides and manages a [Servlet SDK](https://github.com/auth0/auth0-servlet). This SDK allows you to use Auth0 with Java for server-side MVC web apps. It presents a simple servlet based solution without introducing specific frameworks or libraries such as Spring. 

__NOTE:__ You can find a listing of all our Java offerings and several sample projects in [Java technologies and Auth0 libraries](/java-overview). 


## Seed &amp; Samples

There are two options to following along this quickstart. You can either download the [seed project](https://github.com/auth0-samples/auth0-servlet-sample/tree/master/00-Start) or the samples provided at each page of this quickstart. 

The seed is a regular java app, with all the Auth0 dependencies set, but nothing more. It's an empty canvas meant to be filled as you follow along the steps of this quickstart. If you prefer this option download the seed from our [GitHub repository](https://github.com/auth0-samples/auth0-servlet-sample/tree/master/00-Start) and follow along.

Instead you can choose to follow the samples that are included in each step. Each sample uses the [seed project](https://github.com/auth0-samples/auth0-servlet-sample/tree/master/00-Start) as a starting point and applies to it the configuration of each step, so for example the Login sample would be the [seed project](https://github.com/auth0-samples/auth0-servlet-sample/tree/master/00-Start) plus the configuration required to implement login functionality. If you choose to follow this approach continue reading, the rest of this document will guide you through setting up the required prerequisites.

### Seed project structure

Let's take some time and explain how our [seed project](https://github.com/auth0-samples/auth0-servlet-sample/tree/master/00-Start) is structured. 


```
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

To integrate your Java application with Auth0 you need to add the following dependencies:

- [auth0-servlet](https://github.com/auth0/auth0-servlet): is the Java library that allows you to use Auth0 with Java for server-side MVC web apps. It validates the [JWT](/jwt) from Auth0 in every API call to assert authentication according to configuration.

If you are using maven, add the dependency to your `pom.xml`:

${snippet(meta.snippets.dependencies)}

If you are using Gradle, add it to the dependencies block:

${snippet(meta.snippets.dependenciesGradle)}


## Configure your java app

Your java app needs some information in order to authenticate against your Auth0 account. You need to set this information at the deployment descriptor file `src/main/webapp/WEB-INF/web.xml`. The required information is:

${snippet(meta.snippets.setup)}

As you can see in the seed project, there are many customizable attributes in the `web.xml`:

- `auth0.domain`: Your auth0 domain (the tenant you have created when registering with auth0).
- `auth0.issuer`: Your auth0 domain with a `https://` prefix and a `/` suffix. For example, if your `auth0.domain` is `example.auth0.com` then your `auth0.issuer` should be set to `https://example.auth0.com/` (the trailing slash is important).
- `auth0.clientId`: The unique identifier for your application. You can find the correct value on the Settings of your app on [dashboard](${uiURL}).
- `auth0.clientSecret`: This secret will be used to sign and validate tokens which will be used in the different authentication flows. With this key your application will also be able to authenticate to some of the API endpoints (eg: to get an access token from an authorization code). You can find the correct value on the Settings of your app on [dashboard](${uiURL}).

**NOTE**: If you download the seed using our **Download Sample** button then the `domain`, `clientId` and `clientSecret` attributes will be populated for you, unless you are not logged in or you do not have at least one registered client. In any case you should verify that the values are correct if you have multiple clients in your account and you might want to use another than the one we set the information for. Do not forget to manually set the `issuer` attribute!

- `auth0.onLogoutRedirectTo`: The page that users of your site are redirected to on logout. Should start with `/`.
- `auth0.redirect_on_success`: The landing page URL context path for a successful authentication. Should start with `/`.
- `auth0.redirect_on_error`: The URL context path for the page to redirect to upon failure. Should start with `/`.
- `auth0.redirect_on_authentication_error`: The URL context path for the page to redirect to upon authentication failure. Should start with `/`.


You are now ready to continue with [login](/quickstart/webapp/java/01-login) tutorial in order to implement basic login using [Lock](/libraries/lock).
