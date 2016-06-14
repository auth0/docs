---
title: Auth0 Java SDK Web App Tutorial
description: This tutorial will show you how to use the Auth0 Java SDK to add authentication and authorization to your web app.
---

## Java Web App Tutorial

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Java 1.8
* Maven 3.3
:::

<%= include('../../_includes/_package', {
  pkgRepo: 'auth0-servlet',
  pkgBranch: 'master',
  pkgPath: 'examples/auth0-servlet-sample',
  pkgFilePath: 'examples/auth0-servlet-sample/src/main/webapp/WEB-INF/web.xml',
  pkgType: 'replace'
}) %>

**If you have an existing Java WebApp, please follow the steps below.**

### 1. Add Auth0 dependencies

Add the following dependencies to your `pom.xml` and run `mvn install`.

${snippet(meta.snippets.dependencies)}

### 2. Configure it

We need to configure `auth0-servlet` to use our Auth0 credentials. For that, just modify the `web.xml`

```xml
<context-param>
    <param-name>auth0.client_id</param-name>
    <param-value>${account.clientId}</param-value>
</context-param>

<context-param>
    <param-name>auth0.client_secret</param-name>
    <param-value>${account.clientSecret}</param-value>
</context-param>

<context-param>
    <param-name>auth0.domain</param-name>
    <param-value>${account.namespace}</param-value>
</context-param>
```

### 3. Add Auth0 callback handler

We need to add the handler for the Auth0 callback so that we can authenticate the user and get his information. For that, we'll use the `Servlet` provided by the SDK. We have to configure it on the `web.xml`

${snippet(meta.snippets.setup)}

${include('../_callbackRegularWebApp')}

In this case, the callbackURL should look something like:

```
http://yourUrl/callback
```

### 4. Triggering login manually or integrating the Auth0Lock

${lockSDK}

> **Warning:** Auth0 Java requires that you specify the `state` parameter in Auth0 Widget or [Auth0 Lock](/libraries/lock/customization#authparams-object). The Login servlet must propagate [the nonce](https://github.com/auth0/auth0-servlet/blob/2836d13c0a766e3a2fd28fc95bb582fa79e57c52/examples/java-regular-webapp/src/main/java/com/auth0/example/LoginServlet.java#L22) and pass it [to the JSP page](https://github.com/auth0/auth0-servlet/blob/master/examples/java-regular-webapp/src/main/webapp/login.jsp#L45). For an example of this, check the seed project above.

> **Note:** Please note that the `callbackURL` specified in the `Auth0Lock` constructor **must match** the one specified in the previous step

### 5. Accessing user information

You can access the user information from `Auth0User` by calling `Auth0User.get(request)` or you can get the information directly from the Session variable `user`

```java
@Override
protected void doGet(HttpServletRequest request, HttpServletResponse resp) throws ServletException, IOException
{
    resp.setContentType("text/html");
    resp.setStatus(HttpServletResponse.SC_OK);
    resp.getWriter().println("<!DOCTYPE html>\n" +
            "<html>\n" +
            "  <head>\n" +
            "    <meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\" />\n" +
            "    <title>Login</title>\n" +
            "  </head>\n" +
            "  <body>\n");

    // This is the same as Request.getSession().getAttribute("user");
    Auth0User user = Auth0User.get(request);

    resp.getWriter().println("<h1>Welcome</h1>");
    resp.getWriter().println("<img src=\"" + user.getPicture() + "\" />");
    resp.getWriter().println("<p>Hello " + user.getName() + "!</p>");
    resp.getWriter().println("  </body>\n" +
            "</html>");
}
```

### 6. You're done!

You have configured your Java Webapp to use Auth0. Congrats, you're awesome!

### Optional steps

#### Checking if the user is authenticated

You can add a `Filter` to check if the user is authenticated and redirect him to the login page if he's not. For that, we need to configure it in the `web.xml`

```xml
<filter>
  <filter-name>AuthFilter</filter-name>
  <filter-class>com.auth0.Auth0Filter</filter-class>
  <init-param>
      <param-name>auth0.redirect_on_authentication_error</param-name>
      <param-value>/login</param-value>
  </init-param>
</filter>
<filter-mapping>
  <filter-name>AuthFilter</filter-name>
  <url-pattern>/user/*</url-pattern>
</filter-mapping>
```
