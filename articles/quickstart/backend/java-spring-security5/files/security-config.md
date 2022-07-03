---
name: SecurityConfig.java
language: java
---
```java
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

    @Override
    public void configure(HttpSecurity http) throws Exception {
     /*
     This is where we configure the security required for our endpoints and setup our app to serve as
     an OAuth2 Resource Server, using JWT validation.
     */
     http.authorizeRequests()
            .mvcMatchers("/api/public").permitAll()
            .mvcMatchers("/api/private").authenticated()
            .mvcMatchers("/api/private-scoped").hasAuthority("SCOPE_read:messages")
            .and().cors()
            .and().oauth2ResourceServer().jwt();
    }

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