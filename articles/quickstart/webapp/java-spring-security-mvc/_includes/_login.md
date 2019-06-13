### Project Structure
The Login project sample has the following structure:

```text
.
├── build.gradle
├── settings.gradle
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── auth0
    │   │           └── example
    │   │               ├── App.java
    │   │               ├── mvc
    │   │               │   ├── CallbackController.java
    │   │               │   ├── ErrorController.java
    │   │               │   ├── HomeController.java
    │   │               │   ├── LoginController.java
    │   │               │   ├── LogoutController.java
    │   │               │   └── ProfileController.java
    │   │               ├── security
    │   │               │   ├── AppConfig.java
    │   │               │   └── TokenAuthentication.java
    │   │               └── util
    │   │                   └── TokenUtils.java
    │   └── resources
    │       ├── application.properties
    │       ├── auth0.properties
    │       └── templates
    │           ├── fragments
    │           │   ├── footer.html
    │           │   ├── header.html
    │           │   └── navbar.html
    │           ├── index.html
    │           ├── layouts
    │           │   └── default.html
    │           └── profile.html
```

The application uses [Thymeleaf](https://www.thymeleaf.org/) for view rendering. The two views in our application are:
- `index.html`: Displays the home page. If the user is logged in, it will display the user's profile picture and a menu to see the user profile data.
- `profile.html`: Displays the user profile page, showing the profile data from the authenticated user's ID token. This view should only be accessible to authenticated users.

The access control is handled by the Spring Security framework. A few rules in the `AppConfig.java` class will suffice to check for existing tokens before giving the user access to our protected `/profile` path. If the tokens don't exist, the request will be redirected by the `ErrorController` to the `LoginController`.

The project contains six Controllers:
- `LoginController.java`: Invoked when the user attempts to login. The controller uses the `client_id` and `domain` parameters to create a valid Authorize URL and redirects the user there.
- `CallbackController.java`: Captures requests to our Callback URL and processes the data to obtain the credentials. After a successful login, the credentials are then saved to the request's HttpSession.
- `HomeController.java`: Renders the `index.html` resource. If the user is logged in, it sets the user's profile information on the Model so the view can display information about the authenticated user.
- `ProfileController.java`: Sets the authenticated user's profile information on the Model and renders the `profile.html` resource.
- `LogoutController.java`: Invoked when the user clicks the logout link. The controller invalidates the user session and redirects the user to the home page.
- `ErrorController.java`: The controller triggers upon any non-handled exception and redirects the user to the `/login` path.

## Trigger Authentication

Let's begin by making your Auth0 credentials available on the App. In the `AppConfig` class we tell Spring to map the properties defined in the `auth0.properties` file to the corresponding fields by using the `@Configuration` and `@Value` annotations.

```java
// src/main/java/com/auth0/example/security/AppConfig.java

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AppConfig extends WebSecurityConfigurerAdapter {

    @Value(value = "<%= "${com.auth0.domain}" %>")
    private String domain;
    
    @Value(value = "<%= "${com.auth0.clientId}" %>")
    private String clientId;
    
    @Value(value = "<%= "${com.auth0.clientSecret}" %>")
    private String clientSecret;

    //...
}
```

Next, define the rules that will prevent unauthenticated users to access our protected resources. You do that by allowing anyone to access the `/login` and `/callback` endpoints (and our static view resources) in order to be able to complete the login flow, and blocking them from accessing any other endpoint if they are not authenticated. We also configure Spring Security to handle logout by registering our `LogoutController`.

```java
// src/main/java/com/auth0/example/security/AppConfig.java

@Bean
public LogoutSuccessHandler logoutSuccessHandler() {
    return new LogoutController();
}

@Override
protected void configure(HttpSecurity http) throws Exception {
    http.csrf().disable();
    http
        .authorizeRequests()
        .antMatchers("/callback", "/login", "/", "/*.png", "/css/**", "/js/**").permitAll()
        .anyRequest().authenticated()
        .and()
        .logout().logoutSuccessHandler(logoutSuccessHandler()).permitAll();
}
```

Now create the `AuthenticationController` instance that will create the Authorize URLs and handle the request received in the callback. Do that by defining a method that returns the Bean in the same `AppConfig` class. Any customization on the behavior of the component should be done here, such as requesting a different response type or using a different signature verification algorithm.

```java
// src/main/java/com/auth0/example/security/AppConfig.java

@Bean
public AuthenticationController authenticationController() throws UnsupportedEncodingException {
    return AuthenticationController.newBuilder(domain, clientId, clientSecret)
            .build();
}
```

To authenticate the users you will redirect them to the login page which uses [Universal Login](https://auth0.com/docs/universal-login). This page is accessible from what we call the "Authorize URL". By using this library you can generate it with a simple method call. It will require a `HttpServletRequest` to store the call context in the session and the URI to redirect the authentication result to. This URI is normally the address where your app is running plus the path where the result will be parsed, which happens to be also the "Callback URL" whitelisted before. We also request the "User Info" *audience* in order to obtain an Open ID Connect compliant response. Finally, request the scopes `"openid profile email"` to get back user profile information in the ID token upon login. After you create the Authorize URL, you redirect the request there so the user can enter their credentials. The following code snippet is located on the `LoginController` class of our sample.

```java
// src/main/java/com/auth0/example/mvc/LoginController.java

@RequestMapping(value = "/login", method = RequestMethod.GET)
protected String login(final HttpServletRequest req) {
    String redirectUri = req.getScheme() + "://" + req.getServerName();
    if ((req.getScheme().equals("http") && req.getServerPort() != 80) || (req.getScheme().equals("https") && req.getServerPort() != 443)) {
        redirectUri += ":" + req.getServerPort();
    }
    redirectUri += "/callback";

    String authorizeUrl = controller.buildAuthorizeUrl(req, redirectUri)
            .withAudience(String.format("https://%s/userinfo", appConfig.getDomain()))
            .withScope("openid profile email")
            .build();
    return "redirect:" + authorizeUrl;
}
```

After the user logs in the result will be received in our `CallbackController`, either via a GET or a POST Http method. The request holds the call context that the library have previously set by generating the Authorize URL with the controller. When you pass it to the controller, you get back either a valid `Tokens` instance or an Exception indicating what went wrong. In the case of a successful call, you need to create a new `TokenAuthentication` instance with the *ID Token* and set it to the `SecurityContextHolder`. You can modify this class to accept an *Access Token* as well, but this is not covered in this tutorial. If an exception is raised instead, you need to clear any existing Authentication from the `SecurityContextHolder`.

```java
// src/main/java/com/auth0/example/mvc/CallbackController.java

@RequestMapping(value = "/callback", method = RequestMethod.GET)
protected void getCallback(final HttpServletRequest req, final HttpServletResponse res) throws ServletException, IOException {
  try {
      Tokens tokens = controller.handle(req);
      TokenAuthentication tokenAuth = new TokenAuthentication(JWT.decode(tokens.getIdToken()));
      SecurityContextHolder.getContext().setAuthentication(tokenAuth);
      res.sendRedirect(redirectOnSuccess);
  } catch (AuthenticationException | IdentityVerificationException e) {
      e.printStackTrace();
      SecurityContextHolder.clearContext();
      res.sendRedirect(redirectOnFail);
  }
}
```

## Display the Home Page

When the user visits the home page, it should display whether they are logged in or not. We can then take advantage of the [Thymeleaf Spring Security](https://github.com/thymeleaf/thymeleaf-extras-springsecurity) integration to conditionally render content based on the authentication status.

The `HomeController` checks if there is an existing `TokenAuthentication` on the request, and sets the user's profile data on the `Model` for the view to use:

```java
// src/main/java/com/auth0/example/mvc/HomeController.java

@RequestMapping(value = "/", method = RequestMethod.GET)
protected String home(final Model model, final Authentication authentication) {
    if (authentication instanceof TokenAuthentication) {
        TokenAuthentication tokenAuthentication = (TokenAuthentication) authentication;
        model.addAttribute("profile", tokenAuthentication.getClaims());
    }

    return "index";
}
```

In the `navbar.html` Thymeleaf fragment, we use the `sec:authorize` tag to check if the user is authenticated. If they are authenticated, we display the profile picture and the main menu. If they are not authenticated, a Login button is displayed:

```html
<!-- src/main/resources/templates/fragments/navbar.html -->

<ul>
    <!-- Login button: show if NOT authenticated -->
    <li sec:authorize="!isAuthenticated()">
        <form th:action="@{/login}" method="GET">
            <input type="submit" value="Login"/>
        </form>
    </li>

    <!-- Menu: show if authenticated -->
    <li sec:authorize="isAuthenticated()">
        <a href="#">
            <!-- Profile image should be set to the profile picture from the id token -->
            <img th:src="<%= "${profile.get('picture').asString()}" %>"/>
        </a>
        <div>
            <!-- Show the user's full name from the id token here -->
            <div th:text="<%= "${profile.get('name').asString()}" %>"</div>
            <a href="/profile">Profile</a>
            <a th:href="@{/logout}">Log out</a>
        </div>
    </li>
</ul>
```

## Display the Profile Page

Now that the user is authenticated (the tokens exists), the framework will allow them to access our protected resources. In the `ProfileController` we get the `Authentication` object, then set the profile information on the `Model` for use by the view:

```java
// src/main/java/com/auth0/example/mvc/ProfileController.java

@RequestMapping(value = "/profile", method = RequestMethod.GET)
protected String profile(final Model model, final Authentication authentication) {
    TokenAuthentication tokenAuthentication = (TokenAuthentication) authentication;
    model.addAttribute("profile", tokenAuthentication.getClaims());
    return "profile";
}
```

In `profile.html`, we don't need to check for authentication status, since we've protected this resource using Spring Security. We simply use the `profile` attribute sent by `ProfileController` to render information about the authenticated user:

```html
<!— src/main/resources/templates/fragments/profile.html —>

<img th:src="<%= "${profile.get('picture').asString()}" %>"/>
<h2 th:text="<%= "${profile.get('name').asString()}" %>"/>
<p th:text="<%= "${profile.get('email').asString()}" %>"/>
```

## Handle Logout

To properly handle logout, we need to clear the session and log the user out of Auth0. This is handled in the `LogoutController` of our sample application.

First, we clear the session by calling `request.getSession().invalidate()`. We then construct the logout URL, being sure to include the `returnTo` query parameter, which is where the user will be redirected to after logging out. Finally, we redirect the response to our logout URL.

```java
// src/main/java/com/auth0/example/mvc/LogoutController.java

@Override
public void onLogoutSuccess(HttpServletRequest req, HttpServletResponse res, Authentication authentication) {
    invalidateSession(req);

    String returnTo = req.getScheme() + "://" + req.getServerName();
    if ((req.getScheme().equals("http") && req.getServerPort() != 80) || (req.getScheme().equals("https") && req.getServerPort() != 443)) {
        returnTo += ":" + req.getServerPort();
    }
    returnTo += "/";
    
    // Build logout URL like:
    // https://{YOUR-DOMAIN}/v2/logout?client_id={YOUR-CLIENT-ID}&returnTo=http://localhost:3000/
    String logoutUrl = String.format(
            "https://%s/v2/logout?client_id=%s&returnTo=%s",
            appConfig.getDomain(),
            appConfig.getClientId(),
            returnTo);
    try {
        res.sendRedirect(logoutUrl);
    } catch(IOException e){
        e.printStackTrace();
    }
}

private void invalidateSession(HttpServletRequest request) {
    if (request.getSession() != null) {
        request.getSession().invalidate();
    }
}
```

## Run the Sample

To build an run the project, use the command:

```bash
./gradlew clean bootRun
```

Or if you are using Windows:

```bash
gradlew.cmd clean bootRun
```


Point your browser to [http://localhost:3000](http://localhost:3000). Follow the **Log In** link to log in or sign up to your Auth0 tenant. 

![login page](/media/articles/web/hosted-login.png)

Upon successful login or signup, you will see the user's profile picture and a drop-down menu where the Log In link was. You can then view the user's profile page by clicking the **Profile** link.

Log out by clicking the **Logout** link in the drop-down menu. To verify that the profile page is restricted to authenticated users, point your browser to [http://localhost:3000/profile](http://localhost:3000/profile), and note how you are directed to the login page.
