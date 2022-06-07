---
name: Auth0JwtPrincipal.java
language: java
---

```java
// src/main/java/com/auth0/example/security/Auth0JwtPrincipal.java

public class Auth0JwtPrincipal extends CallerPrincipal {
    private final DecodedJWT idToken;

    Auth0JwtPrincipal(DecodedJWT idToken) {
        super(idToken.getClaim("name").asString());
        this.idToken = idToken;
    }

    public DecodedJWT getIdToken() {
        return this.idToken;
    }
}
```