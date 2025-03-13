---
name: src/main/java/com/auth0/example/web/LoginServlet.java
language: javascript
---
    
```javascript
// src/main/java/com/auth0/example/web/LoginServlet.java

@WebServlet(urlPatterns = "/login")
public class LoginServlet extends HttpServlet {
    private final Auth0AuthenticationConfig config;
    private final AuthenticationController authenticationController;

    @Inject
    LoginServlet(Auth0AuthenticationConfig config, AuthenticationController authenticationController) {
        this.config = config;
        this.authenticationController = authenticationController;
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // URL where the application will receive the authorization code (e.g., http://localhost:3000/callback)
        String callbackUrl = String.format(
                "%s://%s:%s/callback",
                request.getScheme(),
                request.getServerName(),
                request.getServerPort()
        );

        // Create the authorization URL to redirect the user to, to begin the authentication flow.
        String authURL = authenticationController.buildAuthorizeUrl(request, response, callbackUrl)
                .withScope(config.getScope())
                .build();

        response.sendRedirect(authURL);
    }
}
```
