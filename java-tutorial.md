# Auth0 and Java

[Auth0](https://www.auth0.com) is a cloud service that provides a turn-key solution for authentication, authorization and Single Sign On.

You can use  [Auth0](https://www.auth0.com) to add username/password authentication, support for enterprise identity like Active Directory or SAML and also for social identities like Google, Facebook or Salesforce among others to your web, API and mobile native apps.

## Servlet-based Application Tutorial

This guide will walk you through adding authentication to an existing Java Web Application that is based on [Java Servlet Technology](http://www.oracle.com/technetwork/java/index-jsp-135475.html).

In case you are starting from scratch, you can create a Java Web Application by using the `maven-archetype-webapp`

```
mvn archetype:generate -DgroupId=com.acme \
                       -DartifactId=my-webapp \
                       -Dversion=1.0-SNAPSHOT \
                       -DarchetypeArtifactId=maven-archetype-webapp \
                       -DinteractiveMode=false

```

### 1. Adding the Auth0 Maven Dependency

Let's start by adding the Auth0-servlet artifact to the project `pom.xml` file.

```xml
<dependency>
  <groupId>com.auth0</groupId>
  <artifactId>auth0-servlet</artifactId>
  <version>1.4</version>
</dependency>
```

> Note: if you are not using Maven you can download the jar from [here](https://github.com/auth0/auth0-java/releases).

### 2. Setting up the callback URL in Auth0

After authenticating the user on Auth0, we will do a POST to a URL on your web site. For security purposes, you have to register this URL on the <a href="@@uiAppSettingsURL@@" target="_new">Application Settings</a> section on Auth0 Admin app.

```
http://localhost:PORT/callback
```

### 3. Filtering Requests

Let's start configuring the `web.xml` found in your Web Application:

```xml
<web-app>
  ...
  <!-- Servlets -->
    ...
    <servlet>
        <servlet-name>Protected</servlet-name>
        <servlet-class>com.auth0.example.HelloServlet</servlet-class>
    </servlet>
    <servlet>
        <servlet-name>RedirectCallback</servlet-name>
        <servlet-class>com.auth0.Auth0ServletCallback</servlet-class>
        <init-param>
            <param-name>auth0.redirect_on_success</param-name>
            <param-value>/protected</param-value>
        </init-param>
        <init-param>
            <param-name>auth0.redirect_on_error</param-name>
            <param-value>/login</param-value>
        </init-param>
    </servlet>
    <servlet>
        <servlet-name>Login</servlet-name>
        <servlet-class>com.auth0.example.LoginServlet</servlet-class>
    </servlet>

    <!-- Servlet Mappings -->
    ...
    <servlet-mapping>
        <servlet-name>Protected</servlet-name>
        <url-pattern>/protected/*</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>Login</servlet-name>
        <url-pattern>/login</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>Login</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>RedirectCallback</servlet-name>
        <url-pattern>/callback</url-pattern>
    </servlet-mapping>

    <!-- Filters -->
    ...
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
        <url-pattern>/protected/*</url-pattern>
    </filter-mapping>

    <!-- Auth0 Configuration -->
    ...
    <context-param>
        <param-name>auth0.client_id</param-name>
        <param-value>YOUR_CLIENT_ID</param-value>
    </context-param>

    <context-param>
        <param-name>auth0.client_secret</param-name>
        <param-value>YOUR_CLIENT_SECRET</param-value>
    </context-param>

    <context-param>
        <param-name>auth0.domain</param-name>
        <param-value>your-domain.auth0.com</param-value>
    </context-param>

</web-app>
```

In the `Auth0ServletCallback` the data to popuplate principal will be persisted in session. As we will see later this can be customized.

As configured previously, the user will be redirected to `/protected`. User-provided `HelloServlet`, which overrides `doGet` method, will be handling that case.

### 4. (Optional) Widget

@@widgetSDK2@@

### 5. (Optional) Customize your JSP login page

First, we are going to create a Servlet to handle the login page:

```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // import com.auth0.RequestNonceStorage;
    RequestNonceStorage nonceStorage = new RequestNonceStorage(request);
    if (!"/favicon.ico".equals(request.getServletPath())) {
        // import com.auth0.NonceGenerator;
        String nonce = nonceGenerator.generateNonce();
        nonceStorage.setState(nonce);
        request.setAttribute("state", nonce);
        request.getRequestDispatcher("/login.jsp").forward(request, response);
    } else {
        response.sendError(HttpServletResponse.SC_NOT_FOUND);
    }
}
```

Next step is to add a Login Page (`/login.jsp`) with the custom widget of the previous section. We are going to get some of the widget configuration data from the `web.xml`.

```jsp
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>Login</title>
    <script src="@@widget_url_no_scheme@@"></script>
  </head>
  <body>
    <script type="text/javascript">

     <%!

         // Converts a relative path into a full path
         // Taken from http://stackoverflow.com/posts/5212336/revisions
        public String buildUrl(HttpServletRequest request, String relativePath) {
         String scheme      =    request.getScheme();        // http
         String serverName  =    request.getServerName();    // hostname.com
         int serverPort     =    request.getServerPort();    // 80
         String contextPath =    request.getContextPath();   // /mywebapp

         // Reconstruct original requesting URL
         StringBuffer url =  new StringBuffer();
         url.append(scheme).append("://").append(serverName);

         if ((serverPort != 80) && (serverPort != 443)) {
             url.append(":").append(serverPort);
         }

         url.append(contextPath).append(relativePath);
         return url.toString();
         }
      %>

      var widget = new Auth0Widget({
        domain:         '<%= application.getInitParameter("auth0.domain") %>',
        clientID:       '<%= application.getInitParameter("auth0.client_id") %>',
        callbackURL:    '<%= buildUrl(request, "/callback") %>',
        // Add your custom state here
        state:          'foo'
      });

    </script>
    <% if ( request.getParameter("error") != null ) { %>
        <%-- TODO Escape and encode ${param.error} properly. It can be done using jstl c:out. --%>
        <span style="color: red;">${param.error}</span>
    <% } %>
    <button onclick="widget.signin({state: '${state}'})">Login</button>
  </body>
</html>
```

Point your browser to `/login` and you will be seeing that login page.

### 6. Extensibility points

On the first part, we explained how to get running up and fast with Auth0 in your app. But, probably, you needed some degree of customization over any of the involved parts. We will see how to customize it to better suit your needs.

In order to handle the callback call from Auth0, you will need to have a Servlet that handles the request.

#### Auth0 Filter

`Auth0 Filter` can be subclassed and the following `protected` methods meant to be overriden:

 * onSuccess: What should be done when the user is authenticated.
 * onReject: What should be done when the user is not authenticated.
 * loadTokens: You should override this method to provide a custom way of restoring both id and access tokens. By default, they are stored in the Session object but, for instance, they can be persisted in databases.

Method signatures are as follows:

```java
protected void onSuccess(
    ServletRequest req, ServletResponse resp, FilterChain next, Tokens tokens)
        throws IOException, ServletException {

}

protected void onReject(
    ServletRequest req, ServletResponse response, FilterChain next)
        throws IOException, ServletException {

}

protected Tokens loadTokens(ServletRequest req, ServletResponse resp) {

}
```

#### Auth0Principal

`Auth0Principal` class can be subclassed in order to expose custom information you want your principal to have.

#### Auth0ServletCallback

`Auth0ServletCallback` methods `saveTokens` and `onSuccess` can be both overriden. One, to provide the way to store accessTokens. The other, to override the onSuccess behaviour (when user is authenticated).

Method signatures are:

```java
protected void saveTokens(
    HttpServletRequest req, HttpServletResponse resp, Tokens tokens)
        throws ServletException, IOException {
}

protected void onSuccess(
    HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException {
}
```

