---
name: LogoutServlet.java
language: java
---
```java
@WebServlet(urlPatterns = {"/logout"})
public class LogoutServlet extends HttpServlet {

    private String domain;
    private String clientId;

    @Override
    public void init(ServletConfig config) {
        domain = config.getServletContext().getInitParameter("com.auth0.domain");
        clientId = config.getServletContext().getInitParameter("com.auth0.clientId");
    }

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
        String logoutUrl = String.format(
                "https://%s/v2/logout?client_id=%s&returnTo=%s",
                domain,
                clientId,
                returnUrl
        );
        response.sendRedirect(logoutUrl);
    }

}
```