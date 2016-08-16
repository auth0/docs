```java
@Override
    protected void authorizeRequests(final HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/css/**", "/fonts/**", "/js/**", "/login").permitAll()
                .antMatchers("/portal/**").hasAuthority("ROLE_ADMIN")
                .antMatchers(securedRoute).authenticated();
    }
```