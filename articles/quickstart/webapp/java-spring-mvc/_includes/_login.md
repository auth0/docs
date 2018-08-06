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

The project contains a single JSP: the `home.jsp` which will display the tokens associated to the user after a successful login and provide the option to logout.

The project contains a Filter: the `Auth0Filter.java` which will check for existing tokens before giving the user access to our protected `/portal/*` path. If the tokens don't exist, the request will be redirected to the `LoginController`. This Filter is set on the `AppConfig.java` class.

The project contains also five Controllers:
- `LoginController.java`: Invoked when the user attempts to login. The controller uses the `client_id` and `domain` parameters to create a valid Authorize URL and redirects the user there.
- `CallbackController.java`: The controller captures requests to our Callback URL and processes the data to obtain the credentials. After a successful login, the credentials are then saved to the request's HttpSession.
- `HomeController.java`: The controller reads the previously saved tokens and shows them on the `home.jsp` resource.
- `LogoutController.java`: Invoked when the user clicks the logout link. The controller invalidates the user session and redirects the user to the login page, handled by the `LoginController`.
- `ErrorController.java`: The controller triggers upon any non-handled exception and redirects the user to the `/login` path.

Lastly, the project defines a helper class: the `AuthController.java` which will be in charge of creating new instances of `AuthenticationController`. By defining it as a Spring Component, the framework will handle it's creation.

## Trigger Authentication

Let's begin by making your Auth0 credentials available on the App. In the `AppConfig` class we tell Spring to map the properties defined in the `auth0.properties` file to the corresponding fields by using the `@Configuration` and `@Value` annotations. We also define the class as a `@Component` so we can later autowire it to make it available on other classes:

```java
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

Now create the `AuthenticationController` instance that will create the Authorize URLs and handle the request received in the callback. Any customization on the behavior of the component should be done here, such as requesting a different scope or using a different signature verification algorithm.

```java
// src/main/java/com/auth0/example/AppConfig.java

@Component
public class AuthController {
    private final AuthenticationController controller;
    private final String userInfoAudience;

    @Autowired
    public AuthController(AppConfig config) {
        controller = AuthenticationController.newBuilder(config.getDomain(), config.getClientId(), config.getClientSecret())
                .build();
        userInfoAudience = String.format("https://%s/userinfo", config.getDomain());
    }

    public Tokens handle(HttpServletRequest request) throws IdentityVerificationException {
        return controller.handle(request);
    }

    public String buildAuthorizeUrl(HttpServletRequest request, String redirectUri) {
        return controller.buildAuthorizeUrl(request, redirectUri)
                .withAudience(userInfoAudience)
                .build();
    }
}
```


To authenticate the users we will redirect them to the **Auth0 Login Page** which uses the best version available of [Lock](/lock). This page is what we call the "Authorize URL". By using this library we can generate it with a simple method call. It will require a `HttpServletRequest` to store the call context in the session and the URI to redirect the authentication result to. This URI is normally the address where our app is running plus the path where the result will be parsed, which happens to be also the "Callback URL" whitelisted before. Finally, we will request the "User Info" *audience* in order to obtain an Open ID Connect compliant response. After we create the Authorize URL, we redirect the request there so the user can enter their credentials. The following code snippet is located on the `LoginController` class of our sample.

```java
@RequestMapping(value = "/login", method = RequestMethod.GET)
protected String login(final HttpServletRequest req) {
    String redirectUri = req.getScheme() + "://" + req.getServerName() + ":" + req.getServerPort() + "/callback";
    String authorizeUrl = controller.buildAuthorizeUrl(req, redirectUri);
    return "redirect:" + authorizeUrl;
}
```

After the user logs in the result will be received in our `CallbackController`, either via a GET or a POST Http method. The request holds the call context that we've previously set by generating the Authorize URL with the controller. When we pass it to the controller, we get back either a valid `Tokens` instance or an Exception indicating what went wrong. In the case of a successful call, we need to save the credentials somewhere we can access them later. We will use again the `HttpSession` of the request. A helper class called `SessionUtils` is included in the library to set and read values from a request's session.

```java
@RequestMapping(value = "/callback", method = RequestMethod.GET)
protected void getCallback(final HttpServletRequest req, final HttpServletResponse res) throws ServletException, IOException {
  try {
      Tokens tokens = controller.handle(req);
      SessionUtils.set(req, "accessToken", tokens.getAccessToken());
      SessionUtils.set(req, "idToken", tokens.getIdToken());
      res.sendRedirect("/portal/home");
  } catch (IdentityVerificationException e) {
      res.sendRedirect("/login");
  }
}
```

::: note
It it's recommended to store the time in which we requested the tokens and the received `expiresIn` value, so that the next time when we are going to use the token we can check if it has already expired or if it's still valid. For the sake of this sample we will skip that validation.
:::

## Display the Home Page

Now that the user is authenticated (the tokens exists), the `Auth0Filter` will allow them to access our protected resources. In the `HomeController` we obtain the tokens from the request's session and set them as the `userId` attribute so they can be used from the JSP code:

```java
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

## Run the Sample

To run the sample from a terminal, change the directory to the root folder of the project and execute the following line:

```bash
./gradlew clean bootRun
```

After a few seconds, the application will be accessible on `http://localhost:3000/`. Try to access the protected resource [http://localhost:3000/portal/home](http://localhost:3000/portal/home) and note how you're redirected by the `Auth0Filter` to the Auth0 Login Page. The widget displays all the social and database connections that you have defined for this application in the [dashboard](${manage_url}/#/).

![Login using Lock](/media/articles/java/login-with-lock.png)

After a successful authentication you'll be able to see the home page contents.

![Display Token](/media/articles/java/display-token.png)

Log out by clicking the **Logout** button at the top right of the home page.
