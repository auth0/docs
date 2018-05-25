### Project Structure
The Login project sample has the following structure:

```text
- src
-- main
---- java
------ com
-------- auth0
---------- example
------------ mvc
-------------- CallbackController.java
-------------- ErrorController.java
-------------- HomeController.java
-------------- LoginController.java
-------------- LogoutController.java
------------ security
-------------- AppConfig.java
-------------- TokenAuthentication.java
------------ App.java
---- resources
------ application.properties
------ auth0.properties
---- webapp
------ WEB-INF
-------- jsp
---------- home.jsp
- build.gradle
```

The project contains a single JSP: the `home.jsp` which will display the user information associated to the token after a successful login and provide the option to logout.

The access control is handled by the Spring Security framework. A few rules in the `AppConfig.java` class will suffice to check for existing tokens before giving the user access to our protected `/portal/*` path. If the tokens don't exist, the request will be redirected by the `ErrorController` to the `LoginController`.

The project contains also five Controllers:
- `LoginController.java`: Invoked when the user attempts to login. The controller uses the `client_id` and `domain` parameters to create a valid Authorize URL and redirects the user there.
- `CallbackController.java`: The controller captures requests to our Callback URL and processes the data to obtain the credentials. After a successful login, the credentials are then saved to the request's HttpSession.
- `HomeController.java`: The controller reads the previously saved tokens and shows them on the `home.jsp` resource.
- `LogoutController.java`: Invoked when the user clicks the logout link. The controller invalidates the user session and redirects the user to the login page, handled by the `LoginController`.
- `ErrorController.java`: The controller triggers upon any non-handled exception and redirects the user to the `/login` path.


## Trigger Authentication

Let's begin by making your Auth0 credentials available on the App. In the `AppConfig` class we tell Spring to map the properties defined in the `auth0.properties` file to the corresponding fields by using the `@Configuration` and `@Value` annotations.

```java

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

Next, define the rules that will prevent unauthenticated users to access our protected resources. You do that by allowing anyone to access the `/login` and `/callback` endpoints in order to be able to complete the login flow, and blocking them from accessing any other endpoint if they are not authenticated:

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
    http.csrf().disable();
    http
            .authorizeRequests()
            .antMatchers("/callback", "/login").permitAll()
            .antMatchers("/**").authenticated()
            .and()
            .logout().permitAll();
    http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.NEVER);
}
```

Now create the `AuthenticationController` instance that will create the Authorize URLs and handle the request received in the callback. Do that by defining a method that returns the Bean in the same `AppConfig` class. Any customization on the behavior of the component should be done here, such as requesting a different response type or using a different signature verification algorithm.

```java
@Bean
public AuthenticationController authenticationController() throws UnsupportedEncodingException {
    return AuthenticationController.newBuilder(domain, clientId, clientSecret)
            .build();
}
```

To authenticate the users you will redirect them to the login page which uses [Lock](/libraries/lock/v10). This page is accessible from what we call the "Authorize URL". By using this library you can generate it with a simple method call. It will require a `HttpServletRequest` to store the call context in the session and the URI to redirect the authentication result to. This URI is normally the address where your app is running plus the path where the result will be parsed, which happens to be also the "Callback URL" whitelisted before. Finally, request the "User Info" *audience* in order to obtain an Open ID Connect compliant response. After you create the Authorize URL, you redirect the request there so the user can enter their credentials. The following code snippet is located on the `LoginController` class of our sample.

```java
@RequestMapping(value = "/login", method = RequestMethod.GET)
protected String login(final HttpServletRequest req) {
    String redirectUri = req.getScheme() + "://" + req.getServerName() + ":" + req.getServerPort() + "/callback";
    String authorizeUrl = controller.buildAuthorizeUrl(req, redirectUri)
        .withAudience(String.format("https://%s/userinfo", appConfig.getDomain()))
        .build();
    return "redirect:" + authorizeUrl;
}
```

After the user logs in the result will be received in our `CallbackController`, either via a GET or a POST Http method. The request holds the call context that the library have previously set by generating the Authorize URL with the controller. When you pass it to the controller, you get back either a valid `Tokens` instance or an Exception indicating what went wrong. In the case of a successful call, you need to create a new `TokenAuthentication` instance with the *id_token* and set it to the `SecurityContextHolder`. You can modify this class to accept *access_token* as well, but this is not covered in this tutorial. If an exception is raised instead, you need to clear any existing Authentication from the `SecurityContextHolder`.

```java
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

Now that the user is authenticated (the tokens exists), the framework will allow them to access our protected resources. In the `HomeController` you can get the existing Authentication object and even the Principal that represents it. Let's set that as the `userId` attribute so it can be used from the JSP code:

```java
@RequestMapping(value = "/portal/home", method = RequestMethod.GET)
protected String home(final Map<String, Object> model, final Principal principal) {
    if (principal == null) {
        return "redirect:/logout";
    }
    model.put("userId", principal);
    return "home";
}
```

## Run the Sample

To run the sample from a terminal, change the directory to the root folder of the project and execute the following line:

```bash
./gradlew clean bootRun
```

After a few seconds, the application will be accessible on `http://localhost:3000/`. Try to access the protected resource [http://localhost:3000/portal/home](http://localhost:3000/portal/home) and note how you're redirected by the framework to the login page. The widget displays all the social and database connections that you have defined for this application in the [dashboard](${manage_url}/#/).

![Login using Lock](/media/articles/java/login-with-lock.png)

After a successful authentication you'll be able to see the home page contents.

![Display Token](/media/articles/java/display-token.png)

Log out by clicking the **Logout** button at the top right of the home page.
