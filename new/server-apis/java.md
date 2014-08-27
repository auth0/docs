---
lodash: true
---

## Java API Tutorial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="https://docs.auth0.com/auth0-java/master/create-package?path=examples/java-api&type=server@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
    </a> 
  </blockquote>
</div>

Then, you just need to specify your Auth0 account configuration as enviroment variables. [Check it here](https://github.com/auth0/auth0-java/blob/master/examples/java-api/README.md#running-the-example)

**Otherwise, Please follow the steps below to configure your existing Java app to use it with Auth0.**

### 1. Add java-jwt dependency

You need to add the java-jwt dependency.

For that, you can just add it to your `pom.xml` if you're using maven.

````xml
<dependency>
    <groupId>com.auth0</groupId>
    <artifactId>java-jwt</artifactId>
    <version>0.2</version>
</dependency>
```

### 2. Add JWT Validation filter

Now, you need to validate the [JWT](https://docs.auth0.com/jwt). For that, we'll use a Filter.

````java
@WebFilter(filterName= "jwt-filter", urlPatterns = { "/api/*" })
public class JWTFilter implements Filter {
  private JWTVerifier jwtVerifier;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        jwtVerifier = new JWTVerifier(
          "<%= account.clientSecret %>",
          "<%= account.clientId %>");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = getToken((HttpServletRequest) request);

        try {
            Map<String, Object> decoded = jwtVerifier.verify(token);
            // Do something with decoded information like UserId
            chain.doFilter(request, response);
        } catch (Exception e) {
            throw new ServletException("Unauthorized: Token validation failed", e);
        }
    }

    private String getToken(HttpServletRequest httpRequest) throws ServletException {
      String token = null;
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

  @Override
  public void destroy() {

  }

}
```

Please note that we're setting the URL Pattern to `/api/*` in this case. That means that we'll check the user is authenticated only if the request is to the API.

Please note that if you're using Servlets 2.5, you won't be able to use the `@WebFilter` annotation. In that case, add the following to your `web.xml`:

````xml
<filter>
  <filter-name>JWTFilter</filter-name>
  <filter-class>com.auth0.example.JWTFilter</filter-class>
</filter>

<!-- We are going to restrict /api/* paths -->
<filter-mapping>
  <filter-name>JWTFilter</filter-name>
  <url-pattern>/api/*</url-pattern>
</filter-mapping>
```


### 4. You've nailed it.

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!
