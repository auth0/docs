### Project Structure
The Login project sample has the following structure:

```text
- src
-- main
---- java
------ com
-------- auth0
---------- example
------------ App.java
------------ AppConfig.java
------------ Auth0Filter.java
------------ AuthController.java
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
- build.gradle
```

The project contains a single JSP: the `home.jsp` which will display the tokens associated with the user after a successful login and provide the option to logout.

The project contains a Filter: the `Auth0Filter.java` which will check for existing tokens before giving the user access to our protected `/portal/*` path. If the tokens don't exist, the request will be redirected to the `LoginController`. This Filter is set on the `AppConfig.java` class.

The project contains also five Controllers:
- `LoginController.java`: Invoked when the user attempts to log in. The controller uses the `client_id` and `domain` parameters to create a valid Authorize URL and redirects the user there.
- `CallbackController.java`: The controller captures requests to our Callback URL and processes the data to obtain the credentials. After a successful login, the credentials are then saved to the request's HttpSession.
- `HomeController.java`: The controller reads the previously saved tokens and shows them on the `home.jsp` resource.
- `LogoutController.java`: Invoked when the user clicks the logout link. The controller invalidates the user session and redirects the user to the login page, handled by the `LoginController`.
- `ErrorController.java`: The controller triggers upon any non-handled exception and redirects the user to the `/login` path.

Lastly, the project defines a helper class: the `AuthController.java` which will be in charge of creating new instances of `AuthenticationController`. By defining it as a Spring Component, the framework will handle its creation.

## Trigger Authentication

Let's begin by making your Auth0 credentials available on the App. In the `AppConfig` class, we tell Spring to map the properties defined in the `auth0.properties` file to the corresponding fields by using the `@Configuration` and `@Value` annotations. We also define the class as a `@Component` so we can later autowire it to make it available on other classes:

```java
// src/main/java/com/auth0/example/AppConfig.java

@Component
@Configuration
public class AppConfig {
    @Value(value = "<%= "${com.auth0.domain}" %>")
    private String domain;

    @Value(value = "<%= "${com.auth0.clientId}" %>")
    private String clientId;

    @Value(value = "<%= "${com.auth0.clientSecret}" %>")
    private String clientSecret;
}
```

Create a Component that will generate the Authorize URLs and handle the callback request to obtain the tokens for the authenticated user. 

* If your Auth0 Application is configured to use the **RS256 signing algorithm** (the default when creating a new Auth0 Application), you need to configure a `JwkProvider` to fetch the public key used to verify the token's signature. See the [jwks-rsa-java repository](https://github.com/auth0/jwks-rsa-java) to learn about additional configuration options.
* If your Auth0 Application is configured to use the **HS256 signing algorithm**, there is no need to configure the `JwkProvider`.

::: note
To learn more about the available signing algorithms, refer to the [documentation](https://auth0.com/docs/tokens/concepts/signing-algorithms).
:::

The sample below hows to configure the `AuthenticationController` for use with the **RS256 signing algorithm**:

```java
// src/main/java/com/auth0/example/AuthController.java

@Component
public class AuthController {
    private final AuthenticationController controller;

    @Autowired
    public AuthController(AppConfig config) {
        JwkProvider jwkProvider = new JwkProviderBuilder(config.getDomain()).build();
        controller = AuthenticationController.newBuilder(config.getDomain(), config.getClientId(), config.getClientSecret())
                .withJwkProvider(jwkProvider)
                .build();
    }

    public Tokens handle(HttpServletRequest request, HttpServletResponse response) throws IdentityVerificationException {
        return controller.handle(request, response);
    }

    public String buildAuthorizeUrl(HttpServletRequest request, HttpServletResponse response, String redirectUri) {
        return controller.buildAuthorizeUrl(request, response, redirectUri)
                .build();
    }
}
```

To enable users to login, your application will redirect them to the [Universal Login](https://auth0.com/docs/universal-login) page. Using the `AuthenticationController` instance, you can generate the redirect URL by calling the `buildAuthorizeUrl(HttpServletRequest request, HttpServletResponse response, String redirectUrl)` method. The redirect URL must be the URL that was added to the **Allowed Callback URLs** of your Auth0 Application.

```java
// src/main/java/com/auth0/example/LoginController.java

@RequestMapping(value = "/login", method = RequestMethod.GET)
protected String login(final HttpServletRequest req, final HttpServletResponse res) {
    String redirectUrl = req.getScheme() + "://" + req.getServerName() + ":" + req.getServerPort() + "/callback";
    String authorizeUrl = controller.buildAuthorizeUrl(req, res, redirectUrl);
    return "redirect:" + authorizeUrl;
}
```

After the user logs in, the result will be received in our `CallbackController` via either a GET or POST HTTP request. Because we are using the Authorization Code Flow (the default), a GET request will be sent. If you have configured the library for the Implicit Flow, a POST request will be sent instead.

The request holds the call context that the library previously set by generating the Authorize URL with the controller. When passed to the controller, you get back either a valid `Tokens` instance or an Exception indicating what went wrong. In the case of a successful call, you need to save the credentials somewhere to access them later. You can use the `HttpSession` of the request by using the `SessionsUtils` class included in the library.

```java
// src/main/java/com/auth0/example/CallbackController.java

@RequestMapping(value = "/callback", method = RequestMethod.GET)
protected void getCallback(final HttpServletRequest req, final HttpServletResponse res) throws ServletException, IOException {
  try {
      Tokens tokens = controller.handle(req, res);
      SessionUtils.set(req, "accessToken", tokens.getAccessToken());
      SessionUtils.set(req, "idToken", tokens.getIdToken());
      res.sendRedirect("/portal/home");
  } catch (IdentityVerificationException e) {
      res.sendRedirect("/login");
  }
}
```

::: note
It is recommended to store the time in which we requested the tokens and the received `expiresIn` value, so that the next time when we are going to use the token we can check if it has already expired or if it's still valid. For the sake of this sample, we will skip that validation.
:::

## Display the Home Page

Now that the user is authenticated (the tokens exists), the `Auth0Filter` will allow them to access our protected resources. In the `HomeController` we obtain the tokens from the request's session and set them as the `userId` attribute so they can be used from the JSP code:

```java
// src/main/java/com/auth0/example/HomeController.java

@RequestMapping(value = "/portal/home", method = RequestMethod.GET)
protected String home(final Map<String, Object> model, final HttpServletRequest req) {
    String accessToken = (String) SessionUtils.get(req, "accessToken");
    String idToken = (String) SessionUtils.get(req, "idToken");
    if (accessToken != null) {
        model.put("userId", accessToken);
    } else if (idToken != null) {
        model.put("userId", idToken);
    }
    return "home";
}
```

## Handle Logout

To properly handle logout, we need to clear the session and log the user out of Auth0. This is handled in the `LogoutController` of our sample application.

First, we clear the session by calling `request.getSession().invalidate()`. We then construct the logout URL, being sure to include the `returnTo` query parameter, which is where the user will be redirected to after logging out. Finally, we redirect the response to our logout URL.

```java
// src/main/java/com/auth0/example/LogoutController.java

@RequestMapping(value = "/logout", method = RequestMethod.GET)
protected String logout(final HttpServletRequest req) {
    invalidateSession(req);

    String returnTo = req.getScheme() + "://" + req.getServerName() + ":" + req.getServerPort();

    // Build logout URL like:
    // https://{YOUR-DOMAIN}/v2/logout?client_id={YOUR-CLIENT-ID}&returnTo=http://localhost:3000
    String logoutUrl = String.format("https://%s/v2/logout?client_id=%s&returnTo=%s", domain, clientId, returnTo);
    
    return "redirect:" + logoutUrl;
}

private void invalidateSession(HttpServletRequest request) {
    if (request.getSession() != null) {
        request.getSession().invalidate();
    }
}

```

## Run the Sample

To run the sample from a terminal, change the directory to the root folder of the project and execute the following line:

```bash
./gradlew clean bootRun
```

If you are using a Windows environment, execute `gradlew clean appRun`

After a few seconds, the application will be accessible on `http://localhost:3000/`. Try to access the protected resource [http://localhost:3000/portal/home](http://localhost:3000/portal/home) and note how you're redirected by the `Auth0Filter` to the Auth0 Login Page. The widget displays all the social and database connections that you have defined for this application in the [dashboard](${manage_url}/#/).

![Login using Lock](/media/articles/java/login-with-lock.png)

After a successful authentication, you'll be able to see the home page contents.

![Display Token](/media/articles/java/display-token.png)

Log out by clicking the **Logout** button at the top right of the home page.
