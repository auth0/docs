---
title: Introduction
description: This tutorial will show you how to use the Auth0 Java SDK to add authentication and authorization to your web app.
---

This multi-step quickstart will guide you through the process of managing authentication in your Java Servlet Web Application with Auth0.

Auth0 provides and manages a [Servlet SDK](https://github.com/auth0/auth0-servlet). This SDK allows you to use Auth0 with Java for server-side MVC web apps. It presents s simple servlet based solution without introducing specific frameworks or libraries such as Spring. 

__NOTE:__ You can find a listing of all our Java offerings and several sample projects in our [Java technologies and Auth0 libraries](/java-overview) document. 


## Seed &amp; Samples

There are two options to following along this quickstart. You can either download the [seed project](https://github.com/auth0-samples/auth0-servlet-sample/tree/master/00-Start) or the samples. 

The seed is a regular java servlet with all the Auth0 dependencies set, but nothing more. It's an empty canvas meant to be filled as you follow along the steps of this quickstart. If you prefer this option download the seed from our [GitHub repository](https://github.com/auth0-samples/auth0-servlet-sample/tree/master/00-Start) and follow along.

Instead you can choose to follow the samples that are included in each step. Each sample uses the [seed project](https://github.com/auth0-samples/auth0-servlet-sample/tree/master/00-Start) as a starting point and applies to it the configuration of each step, so for example the Login sample would be the [seed project](https://github.com/auth0-samples/auth0-servlet-sample/tree/master/00-Start) plus the configuration required to implement the Login. If you choose to follow this approach continue reading, the rest of this document will guide you through setting up the required prerequisites.


## Create an application

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/java/app_dashboard.png)


## Configure Callback URLs

Callback URLs are URLs that Auth0 invokes after the authentication process. Auth0 routes your application back to this URL and attaches some details to it including a token. Callback URLs can be manipulated on the fly and that could be harmful. For security reasons, you will need to add your application's URL in the app's `Allowed Callback URLs`. This will enable Auth0 to recognize the URLs as valid. If omitted, authentication will not be successful for the app instance.

![Callback error](/media/articles/java/callback_error.png)


## Setup dependencies

To integrate your Java application with Auth0 you need to add the following dependencies:

- [auth0-servlet](https://github.com/auth0/auth0-servlet): is the Java library that allows you to use Auth0 with Java for server-side MVC web apps. It validates the [JWT](/jwt) from Auth0 in every API call to assert authentication according to configuration.

If you are using maven, add the dependency to your `pom.xml`:

${snippet(meta.snippets.dependencies)}

If you are using Gradle, add it to the dependencies block:

${snippet(meta.snippets.dependenciesGradle)}


## Configure your app

To configure `auth0-servlet` to use your Auth0 credentials, edit the `src/main/webapp/WEB-INF/web.xml` file.:

${snippet(meta.snippets.setup)}

Here is a list of customizable attributes of `web.xml`:

- `auth0.domain`: Your auth0 domain (the tenant you have created when registering with auth0).
- `auth0.clientId`: The unique identifier for your application. You can find the correct value on the Settings of your app on [dashboard](${uiURL}).
- `auth0.clientSecret`: This secret will be used to sign and validate tokens which will be used in the different authentication flows. With this key your application will also be able to authenticate to some of the API endpoints (eg: to get an access token from an authorization code). You can find the correct value on the Settings of your app on [dashboard](${uiURL}).
- `auth0.onLogoutRedirectTo`: The page that users of your site are redirected to on logout. Should start with `/`.
- `auth0.redirect_on_success`: The landing page URL context path for a successful authentication. Should start with `/`.
- `auth0.redirect_on_error`: The URL context path for the page to redirect to upon failure. Should start with `/`.
- `auth0.redirect_on_authentication_error`: The URL context path for the page to redirect to upon authentication failure. Should start with `/`.


You are now ready to continue with [login](/quickstart/webapp/java/01-login) tutorial in order to implement basic login using [Lock](/libraries/lock).
