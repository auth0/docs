---
name: Auth0JwtCredential.java
language: java
---

```java
// src/main/java/com/auth0/example/security/Auth0JwtCredential.java

class Auth0JwtCredential implements Credential {
    private Auth0JwtPrincipal auth0JwtPrincipal;

    Auth0JwtCredential(String token) {
        DecodedJWT decodedJWT = JWT.decode(token);
        this.auth0JwtPrincipal = new Auth0JwtPrincipal(decodedJWT);
    }

    Auth0JwtPrincipal getAuth0JwtPrincipal() {
        return auth0JwtPrincipal;
    }
}
```