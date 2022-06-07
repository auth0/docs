---
name: Auth0JwtIdentityStore.java
language: java
---

```java
// src/main/java/com/auth0/example/security/Auth0JwtIdentityStore.java

@ApplicationScoped
public class Auth0JwtIdentityStore implements IdentityStore {

    @Override
    public CredentialValidationResult validate(final Credential credential) {
        CredentialValidationResult result = CredentialValidationResult.NOT_VALIDATED_RESULT;
        if (credential instanceof Auth0JwtCredential) {
            Auth0JwtCredential auth0JwtCredential = (Auth0JwtCredential) credential;
            result = new CredentialValidationResult(auth0JwtCredential.getAuth0JwtPrincipal());
        }
        return result;
    }
}
```