---
name: LogoutServlet.java
language: java
---

```java
// src/main/java/com/auth0/example/web/LogoutServlet.java

@WebServlet(urlPatterns = "/logout")
public class LogoutServlet extends HttpServlet {
    private final Auth0AuthenticationConfig config;

    @Inject
    LogoutServlet(Auth0AuthenticationConfig config) {
        this.config = config;
    }

    @Override
    protected void doGet(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
        clearSession(request);
        response.sendRedirect(getLogoutUrl(request));
    }

    private void clearSession(HttpServletRequest request) {
        if (request.getSession() != null) {
            request.getSession().invalidate();
        }
    }

    private String getLogoutUrl(HttpServletRequest request) {
        String returnUrl = String.format("%s://%s", request.getScheme(), request.getServerName());
        int port = request.getServerPort();
        String scheme = request.getScheme();

        if (("http".equals(scheme) && port != 80) ||
                ("https".equals(scheme) && port != 443)) {
            returnUrl += ":" + port;
        }

        returnUrl += "/";

        // Build logout URL like:
        // https://{YOUR-DOMAIN}/v2/logout?client_id={YOUR-CLIENT-ID}&returnTo=http://localhost:3000/
        String logoutUrl = String.format(
                "https://%s/v2/logout?client_id=%s&returnTo=%s",
                config.getDomain(),
                config.getClientId(),
                returnUrl
        );

        return logoutUrl;
    }
}
```