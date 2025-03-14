---
name: src/main/java/com/auth0/example/web/HomeServlet.java
language: javascript
---
    
```javascript
// src/main/java/com/auth0/example/web/HomeServlet.java

@WebServlet(urlPatterns = "")
public class HomeServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Principal principal = request.getUserPrincipal();

        if (principal instanceof Auth0JwtPrincipal) {
            Auth0JwtPrincipal auth0JwtPrincipal = (Auth0JwtPrincipal) principal;
            request.setAttribute("profile", auth0JwtPrincipal.getIdToken().getClaims());
        }
        request.getRequestDispatcher("/WEB-INF/jsp/home.jsp").forward(request, response);
    }
}
```
