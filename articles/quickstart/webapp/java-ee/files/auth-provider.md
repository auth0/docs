---
name: Auth0AuthenticationProvider.java
language: java
---

```java
// src/main/java/com/auth0/example/security/Auth0AuthenticationProvider.java

@ApplicationScoped
public class Auth0AuthenticationProvider {

    @Produces
    public AuthenticationController authenticationController(Auth0AuthenticationConfig config) {
        JwkProvider jwkProvider = new JwkProviderBuilder(config.getDomain()).build();
        return AuthenticationController.newBuilder(config.getDomain(), config.getClientId(), config.getClientSecret())
                .withJwkProvider(jwkProvider)
                .build();
    }
}
```