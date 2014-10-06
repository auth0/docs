---
lodash: true
---

## Java Webapp Tutorial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="@@base_url@@/auth0-java/master/create-package?path=examples/java-regular-webapp&filePath=examples/java-regular-webapp/src/main/webapp/WEB-INF/web.xml&type=replace@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

**Otherwise, Please follow the steps below to configure your existing Java WebApp to use it with Auth0.**

### 1. Add Auth0 dependencies

Add the following dependencies to your `pom.xml` and run `mvn install`.

````xml
<dependency>
  <groupId>javax.servlet</groupId>
  <artifactId>javax.servlet-api</artifactId>
  <version>3.0.1</version>
  <scope>provided</scope>
</dependency>
<dependency>
  <groupId>com.auth0</groupId>
  <artifactId>auth0-servlet</artifactId>
  <version>2.0</version>
</dependency>
```

### 2. Configure it

We need to configure `auth0-servlet` to use our Auth0 credentials. For that, just modify the `web.xml`

````xml
<context-param>
    <param-name>auth0.client_id</param-name>
    <param-value>@@account.clientId@@</param-value>
</context-param>

<context-param>
    <param-name>auth0.client_secret</param-name>
    <param-value>@@account.clientSecret@@</param-value>
</context-param>

<context-param>
    <param-name>auth0.domain</param-name>
    <param-value>@@account.namespace@@</param-value>
</context-param>
```

### 3. Add Auth0 callback handler

We need to add the handler for the Auth0 callback so that we can authenticate the user and get his information. For that, we'll use the `Servlet` provided by the SDK. We have to configure it on the `web.xml`

````js
<servlet>
    <servlet-name>RedirectCallback</servlet-name>
    <servlet-class>com.auth0.Auth0ServletCallback</servlet-class>
    <init-param>
        <param-name>auth0.redirect_on_success</param-name>
        <param-value>/</param-value>
    </init-param>
    <init-param>
        <param-name>auth0.redirect_on_error</param-name>
        <param-value>/login</param-value>
    </init-param>
</servlet>
 <servlet-mapping>
    <servlet-name>RedirectCallback</servlet-name>
    <url-pattern>/callback</url-pattern>
</servlet-mapping>
```

@@includes.callbackRegularWebapp@@

In this case, the callbackURL should look something like:

````
http://yourUrl/callback
```

### 4. Triggering login manually or integrating the Auth0 widget

@@widgetSDK2@@

> **Note:** Please note that the `callbackURL` specified in the `Auth0Widget` constructor **must match** the one specified in the previous step

### 5. Accessing user information

You can access the user information from `Auth0User` by calling `Auth0User.get(request)` or you can get the information directly from the Session variable `user`

````java
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

### 6. You've nailed it.

You have configured your Java Webapp to use Auth0. Congrats, you're awesome!

### Optional steps

#### Checking if the user is authenticated

You can add a `Filter` to check if the user is authenticated and redirect him to the login page if he's not. For that, we need to configure it in the `web.xml`

````xml
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
