---
name: Auth0AuthenticationConfig.java
language: java
---

```java
// src/main/java/com/auth0/example/security/Auth0AuthenticationConfig.java

@ApplicationScoped
public class Auth0AuthenticationConfig {

    private String domain;
    private String clientId;
    private String clientSecret;
    private String scope;

    @PostConstruct
    public void init() {
        // Get authentication config values from env-entries in web.xml
        try {
            Context env = (Context)new InitialContext().lookup("java:comp/env");

            this.domain = (String) env.lookup("auth0.domain");
            this.clientId = (String) env.lookup("auth0.clientId");
            this.clientSecret = (String) env.lookup("auth0.clientSecret");
            this.scope = (String) env.lookup("auth0.scope");
        } catch (NamingException ne) {
            throw new IllegalArgumentException("Unable to lookup auth0 configuration properties from web.xml", ne);
        }

        if (this.domain == null || this.clientId == null || this.clientSecret == null || this.scope == null) {
            throw new IllegalArgumentException("domain, clientId, clientSecret, and scope must be set in web.xml");
        }
    }

    public String getDomain() {
         return domain;
    }

    public String getClientId() {
         return clientId;
    }

    public String getClientSecret() {
         return clientSecret;
    }

    public String getScope() {
        return scope;
    }
}
```