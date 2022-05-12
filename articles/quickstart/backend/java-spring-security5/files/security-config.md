---
name: SecurityConfig.java
language: java
---
```java
// src/main/java/com/auth0/example/security/SecurityConfig.java

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

   @Value("<%= "${auth0.audience}" %>")
   private String audience;

   @Value("<%= "${spring.security.oauth2.resourceserver.jwt.issuer-uri}" %>")
   private String issuer;

   @Bean
   JwtDecoder jwtDecoder() {
     NimbusJwtDecoder jwtDecoder = (NimbusJwtDecoder)
           JwtDecoders.fromOidcIssuerLocation(issuer);

     OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator(audience);
     OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuer);
     OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, audienceValidator);

     jwtDecoder.setJwtValidator(withAudience);

     return jwtDecoder;
   }
}
```