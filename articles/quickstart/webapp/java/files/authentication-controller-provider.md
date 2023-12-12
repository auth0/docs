---
name: AuthenticationControllerProvider.java
language: java
---
```java
class AuthenticationControllerProvider {

    private AuthenticationControllerProvider() {}

    private static AuthenticationController INSTANCE;

    // if multiple threads may call this, synchronize this method and consider double locking
    static AuthenticationController getInstance(ServletConfig config) throws UnsupportedEncodingException {
        if (INSTANCE == null) {
            String domain = config.getServletContext().getInitParameter("com.auth0.domain");
            String clientId = config.getServletContext().getInitParameter("com.auth0.clientId");
            String clientSecret = config.getServletContext().getInitParameter("com.auth0.clientSecret");

            if (domain == null || clientId == null || clientSecret == null) {
                throw new IllegalArgumentException("Missing domain, clientId, or clientSecret. Did you update src/main/webapp/WEB-INF/web.xml?");
            }

            // JwkProvider required for RS256 tokens. If using HS256, do not use.
            JwkProvider jwkProvider = new JwkProviderBuilder(domain).build();
            INSTANCE = AuthenticationController.newBuilder(domain, clientId, clientSecret)
                    .withJwkProvider(jwkProvider)
                    .build();
        }

        return INSTANCE;
    }
}
```