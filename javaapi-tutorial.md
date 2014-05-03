# Using Auth0 in Java APIs

@@includes.apinote@@

Add the following Maven dependency that will be used to validate [JSON Web Tokens](jwt).

```xml
<dependency>
    <groupId>com.auth0</groupId>
    <artifactId>java-jwt</artifactId>
    <version>0.2</version>
</dependency>
```

> If your application is not Servlet-based use `JWTVerifier` instance method `verify` to validate your tokens. The source code can be found here: [java-jwt](https://github.com/auth0/java-jwt).

The following filter will allow or block incoming requests based on the validity of the issued JWT:
```java
public class JWTFilter implements Filter {
    private JWTVerifier jwtVerifier;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        jwtVerifier = new JWTVerifier(
          filterConfig.getInitParameter("jwt.secret"),
          filterConfig.getInitParameter("jwt.audience"));
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = getToken(token, (HttpServletRequest) request);

        try {
            Map<String, Object> decoded = jwtVerifier.verify(token);
            chain.doFilter(request, response);
        } catch (Exception e) {
            throw new ServletException("Unauthorized: Token validation failed", e);
        }
    }

    private String getToken(String token, HttpServletRequest httpRequest) throws ServletException {
        final String authorizationHeader = httpRequest.getHeader("authorization");
        if (authorizationHeader == null) {
            throw new ServletException("Unauthorized: No Authorization header was found");
        }

        String[] parts = authorizationHeader.split(" ");
        if (parts.length != 2) {
            throw new ServletException("Unauthorized: Format is Authorization: Bearer [token]");
        }

        String scheme = parts[0];
        String credentials = parts[1];

        Pattern pattern = Pattern.compile("^Bearer$", Pattern.CASE_INSENSITIVE);
        if (pattern.matcher(scheme).matches()) {
            token = credentials;
        }
        return token;
    }
}
```

Then add the filter to your `web.xml`:

```xml
    <filter>
        <filter-name>JWTFilter</filter-name>
        <filter-class>com.auth0.example.JWTFilter</filter-class>
        <!-- JWT Configuration -->
        <!-- For your application this can be found on your Auth0 Application Settings -->
        <init-param>
            <param-name>jwt.secret</param-name>
            <param-value>@@account.clientSecret@@</param-value>
        </init-param>

        <init-param>
            <param-name>jwt.audience</param-name>
            <param-value>@@account.clientId@@</param-value>
        </init-param>
    </filter>

    <!-- We are going to restrict /api/* paths -->
    <filter-mapping>
        <filter-name>JWTFilter</filter-name>
        <url-pattern>/api/*</url-pattern>
    </filter-mapping>
```



@@includes.callapi@@
