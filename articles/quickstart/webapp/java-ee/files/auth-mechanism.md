---
name: Auth0AuthenticationMechanism.java
language: java
---

```java
// src/main/java/com/auth0/example/security/Auth0AuthenticationMechanism.java

@ApplicationScoped
@AutoApplySession
public class Auth0AuthenticationMechanism implements HttpAuthenticationMechanism {
    private final AuthenticationController authenticationController;
    private final IdentityStoreHandler identityStoreHandler;

    @Inject
    Auth0AuthenticationMechanism(AuthenticationController authenticationController, IdentityStoreHandler identityStoreHandler) {
        this.authenticationController = authenticationController;
        this.identityStoreHandler = identityStoreHandler;
    }

    @Override
    public AuthenticationStatus validateRequest(HttpServletRequest httpServletRequest,
                                                HttpServletResponse httpServletResponse,
                                                HttpMessageContext httpMessageContext) throws AuthenticationException {

        // Exchange the code for the ID token, and notify container of result.
        if (isCallbackRequest(httpServletRequest)) {
            try {
                Tokens tokens = authenticationController.handle(httpServletRequest, httpServletResponse);
                Auth0JwtCredential auth0JwtCredential = new Auth0JwtCredential(tokens.getIdToken());
                CredentialValidationResult result = identityStoreHandler.validate(auth0JwtCredential);
                return httpMessageContext.notifyContainerAboutLogin(result);
            } catch (IdentityVerificationException e) {
                return httpMessageContext.responseUnauthorized();
            }
        }
        return httpMessageContext.doNothing();
    }

    private boolean isCallbackRequest(HttpServletRequest request) {
        return request.getRequestURI().equals("/callback") && request.getParameter("code") != null;
    }
}
```