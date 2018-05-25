### Project Structure

The Login project sample has the following structure:

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

The project contains a single JSP: the `home.jsp` which will display the tokens associated to the user after a successful login and provide the option to logout.

The project contains a WebFilter: the `Auth0Filter.java` which will check for existing tokens before giving the user access to our protected `/portal/*` path. If the tokens don't exist, the request will be redirected to the `LoginServlet`.

The project contains also four servlets:
- `LoginServlet.java`: Invoked when the user attempts to login. The servlet uses the `client_id` and `domain` parameters to create a valid Authorize URL and redirects the user there.
- `CallbackServlet.java`: The servlet captures requests to our Callback URL and processes the data to obtain the credentials. After a successful login, the credentials are then saved to the request's HttpSession.
- `HomeServlet.java`: The servlet reads the previously saved tokens and shows them on the `home.jsp` resource.
- `LogoutServlet.java`: Invoked when the user clicks the logout link. The servlet invalidates the user session and redirects the user to the login page, handled by the `LoginServlet`.

Lastly, the project defines a helper class: the `AuthenticationControllerProvider.java` which will be in charge of creating new instances of `AuthenticationController`. Because this controller is very simple and doesn't keep any context it can be safely reused. You can also choose to create a new one every time it's needed.

## Trigger Authentication

Let's begin by creating the `AuthenticationController` instance. From any Servlet class we can obtain the ServletConfig instance and read the properties defined in the `web.xml` file. Let's read our application properties and create a new instance of this controller:

```java
String domain = getServletConfig().getServletContext().getInitParameter("com.auth0.domain");
String clientId = getServletConfig().getServletContext().getInitParameter("com.auth0.clientId");
String clientSecret = getServletConfig().getServletContext().getInitParameter("com.auth0.clientSecret");

AuthenticationController controller = AuthenticationController.newBuilder(domain, clientId, clientSecret)
                .build();
```

To authenticate the users we will redirect them to the **Auth0 Login Page** which uses the best version available of [Lock](/lock). This page is what we call the "Authorize URL". By using this library we can generate it with a simple method call. It will require a `HttpServletRequest` to store the call context in the session and the URI to redirect the authentication result to. This URI is normally the address where our app is running plus the path where the result will be parsed, which happens to be also the "Callback URL" whitelisted before. Finally, we will request the "User Info" *audience* in order to obtain an Open ID Connect compliant response. After we create the Authorize URL, we redirect the request there so the user can enter their credentials. The following code snippet is located on the `LoginServlet` class of our sample.

```java
@Override
protected void doGet(final HttpServletRequest req, final HttpServletResponse res) throws ServletException, IOException {
    String redirectUri = req.getScheme() + "://" + req.getServerName() + ":" + req.getServerPort() + "/callback";

    String authorizeUrl = authenticationController.buildAuthorizeUrl(req, redirectUri)
            .withAudience(String.format("https://%s/userinfo", domain))
            .build();
    res.sendRedirect(authorizeUrl);
}
```

After the user logs in the result will be received in our `CallbackServlet`, either via a GET or a POST Http method. The request holds the call context that we've previously set by generating the Authorize URL with the controller. When we pass it to the controller, we get back either a valid `Tokens` instance or an Exception indicating what went wrong. In the case of a successful call, we need to save the credentials somewhere we can access them later. We will use again the `HttpSession` of the request. A helper class called `SessionUtils` is included in the library to set and read values from a request's session.

```java
public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
    try {
      //Parse the request
        Tokens tokens = authenticationController.handle(req);
        SessionUtils.set(req, "accessToken", tokens.getAccessToken());
        SessionUtils.set(req, "idToken", tokens.getIdToken());
        res.sendRedirect(redirectOnSuccess);
    } catch (IdentityVerificationException e) {
        e.printStackTrace();
        res.sendRedirect(redirectOnFail);
    }
}
```

::: note
It it's recommended to store the time in which we requested the tokens and the received `expiresIn` value, so that the next time when we are going to use the token we can check if it has already expired or if it's still valid. For the sake of this sample we will skip that validation.
:::

## Display the Home Page

Now that the user is authenticated (the tokens exists), the `Auth0Filter` will allow them to access our protected resources. In the `HomeServlet` we obtain the tokens from the request's session and set them as the `userId` attribute so they can be used from the JSP code:

```java
protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    final String accessToken = (String) SessionUtils.get(req, "accessToken");
    final String idToken = (String) SessionUtils.get(req, "idToken");
    if (accessToken != null) {
        req.setAttribute("userId", accessToken);
    } else if (idToken != null) {
        req.setAttribute("userId", idToken);
    }
    req.getRequestDispatcher("/WEB-INF/jsp/home.jsp").forward(req, res);
}
```

## Run the Sample

To run the sample from a terminal, change the directory to the root folder of the project and execute the following line:

```bash
./gradlew clean appRun
```

After a few seconds, the application will be accessible on `http://localhost:3000/`. Try to access the protected resource [http://localhost:3000/portal/home](http://localhost:3000/portal/home) and note how you're redirected by the `Auth0Filter` to the Auth0 Login Page. The widget displays all the social and database connections that you have defined for this application in the [dashboard](${manage_url}/#/).

![Login using Lock](/media/articles/java/login-with-lock.png)

After a successful authentication you'll be able to see the home page contents.

![Display Token](/media/articles/java/display-token.png)

Log out by clicking the **Logout** button at the top right of the home page.
