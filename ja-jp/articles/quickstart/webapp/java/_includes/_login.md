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

The project contains a single JSP: the `home.jsp` which will display the tokens associated with the user after a successful login and provide the option to logout.

The project contains a WebFilter: the `Auth0Filter.java` which will check for existing tokens before giving the user access to our protected `/portal/*` path. If the tokens don't exist, the request will be redirected to the `LoginServlet`.

The project contains also four servlets:
- `LoginServlet.java`: Invoked when the user attempts to log in. The servlet uses the `client_id` and `domain` parameters to create a valid Authorize URL and redirects the user there.
- `CallbackServlet.java`: The servlet captures requests to our Callback URL and processes the data to obtain the credentials. After a successful login, the credentials are then saved to the request's HttpSession.
- `HomeServlet.java`: The servlet reads the previously saved tokens and shows them on the `home.jsp` resource.
- `LogoutServlet.java`: Invoked when the user clicks the logout link. The servlet invalidates the user session and redirects the user to the login page, handled by the `LoginServlet`.
- `AuthenticationControllerProvider`: Responsible to create and manage a single instance of the `AuthenticationController`

## Create the AuthenticationController

To enable users to authenticate, create an instance of the `AuthenticationController` provided by the `auth0-java-mvc-commons` SDK using the `domain`, `clientId`, and `clientSecret`.  The sample shows how to configure the component for use with tokens signed using the RS256 asymmetric signing algorithm, by specifying a `JwkProvider` to fetch the public key used to verify the token's signature. See the [jwks-rsa-java repository](https://github.com/auth0/jwks-rsa-java) to learn about additional configuration options. If you are using HS256, there is no need to configure the `JwkProvider`. 

:::note
The `AuthenticationController` does not store any context, and is inteded to be reused. Unneccessary creation may result in additonal resources being created which could impact performance.
:::

```java
class AuthenticationControllerProvider {

    private AuthenticationControllerProvider() {}

    private static AuthenticationController INSTANCE;

    // if multiple threads may call this, synchronize this method and consider double locking
    static AuthenticationController getInstance(ServletConfig config) throws UnsupportedEncodingException {
        if (INSTANCE == null) {
            String domain = config.getServletContext().getInitParameter("com.auth0.domain");
            String clientId = config.getServletContext().getInitParameter("com.auth0.clientId");
            String clientSecret = config.getServletContext().getInitParameter("com.auth0.clientSecret");

            if (domain == null || clientId == null || clientSecret == null) {
                throw new IllegalArgumentException("Missing domain, clientId, or clientSecret. Did you update src/main/webapp/WEB-INF/web.xml?");
            }

            // JwkProvider required for RS256 tokens. If using HS256, do not use.
            JwkProvider jwkProvider = new JwkProviderBuilder(domain).build();
            INSTANCE = AuthenticationController.newBuilder(domain, clientId, clientSecret)
                    .withJwkProvider(jwkProvider)
                    .build();
        }

        return INSTANCE;
    }
```

## Trigger Authentication

To enable users to login, your application will redirect them to the [Universal Login](https://auth0.com/docs/universal-login) page. Using the `AuthenticationController` instance, you can generate the redirect URL by calling the `buildAuthorizeUrl(HttpServletRequest request, HttpServletResponse response, String redirectUrl)` method. The redirect URL must be the URL that was added to the **Allowed Callback URLs** of your Auth0 Application.

```java
// src/main/java/com/auth0/example/LoginServlet.java

@Override
protected void doGet(final HttpServletRequest req, final HttpServletResponse res) throws ServletException, IOException {
    String redirectUri = req.getScheme() + "://" + req.getServerName();
    if ((req.getScheme().equals("http") && req.getServerPort() != 80) || (req.getScheme().equals("https") && req.getServerPort() != 443)) {
        redirectUri += ":" + req.getServerPort();
    }
    redirectUri += "/callback";

    String authorizeUrl = authenticationController.buildAuthorizeUrl(req, res, redirectUri)
            .build();
    res.sendRedirect(authorizeUrl);
}
```

After the user logs in, the result will be received in our `CallbackServlet` via either a GET or POST HTTP request. Because we are using the Authorization Code Flow (the default), a GET request will be sent. If you have configured the library for the Implicit Flow, a POST request will be sent instead.

The request holds the call context that the library previously set by generating the Authorize URL with the `AuthenticationController`. When passed to the controller, you get back either a valid `Tokens` instance or an Exception indicating what went wrong. In the case of a successful call, you need to save the credentials somewhere to access them later. You can use the `HttpSession` of the request by using the `SessionsUtils` class included in the library.

```java
// src/main/java/com/auth0/example/CallbackServlet.java

@Override
public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
    handle(req, res);
}

@Override
public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
    handle(req, res);
}

private void handle(HttpServletRequest req, HttpServletResponse res) throws IOException {
    try {
        // Parse the request
        Tokens tokens = authenticationController.handle(req, res);
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
It is recommended to store the time in which we requested the tokens and the received `expiresIn` value, so that the next time when we are going to use the token we can check if it has already expired or if it's still valid. For the sake of this sample, we will skip that validation.
:::

## Display the Home Page

Now that the user is authenticated (the tokens exists), the `Auth0Filter` will allow them to access our protected resources. In the `HomeServlet` we obtain the tokens from the request's session and set them as the `userId` attribute so they can be used from the JSP code:

```java
// src/main/java/com/auth0/example/HomeServlet.java

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

## Handle Logout

To properly handle logout, we need to clear the session and log the user out of Auth0. This is handled in the `LogoutServlet` of our sample application.

First, we clear the session by calling `request.getSession().invalidate()`. We then construct the logout URL, being sure to include the `returnTo` query parameter, which is where the user will be redirected to after logging out. Finally, we redirect the response to our logout URL.


```java
// src/main/java/com/auth0/example/LogoutServlet.java

@Override
protected void doGet(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
    if (request.getSession() != null) {
        request.getSession().invalidate();
    }

    String returnUrl = String.format("%s://%s", request.getScheme(), request.getServerName());
    if ((request.getScheme().equals("http") && request.getServerPort() != 80) || (request.getScheme().equals("https") && request.getServerPort() != 443)) {
        returnUrl += ":" + request.getServerPort();
    }
    returnUrl += "/login";

    // Build logout URL like:
    // https://{YOUR-DOMAIN}/v2/logout?client_id={YOUR-CLIENT-ID}&returnTo=http://localhost:3000/login
    String logoutUrl = String.format(
            "https://%s/v2/logout?client_id=%s&returnTo=%s",
            domain,
            clientId,
            returnUrl
    );
    response.sendRedirect(logoutUrl);
}
```

## Run the Sample

To run the sample from a terminal, change the directory to the root folder of the project and execute the following line:

```bash
./gradlew clean appRun
```

After a few seconds, the application will be accessible on `http://localhost:3000/`. Try to access the protected resource [http://localhost:3000/portal/home](http://localhost:3000/portal/home) and note how you're redirected by the `Auth0Filter` to the Auth0 Login Page. The widget displays all the social and database connections that you have defined for this application in the [dashboard](${manage_url}/#/).

![Auth0 Universal Login](/media/quickstarts/universal-login.png)

After a successful authentication, you'll be able to see the home page contents.

![Display Token](/media/articles/java/display-token.png)

Log out by clicking the **Logout** button at the top right of the home page.
