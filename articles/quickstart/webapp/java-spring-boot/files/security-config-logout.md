---
name: SecurityConfigWithLogout.java
language: java
---
```java
package com.auth0.example;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final LogoutHandler logoutHandler;

    public SecurityConfig(LogoutHandler logoutHandler) {
        this.logoutHandler = logoutHandler;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
          .oauth2Login()
          .and().logout()
          .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
          .addLogoutHandler(logoutHandler);
    }
}
```