```java
@Override
protected void authorizeRequests(final HttpSecurity http) throws Exception {
  http.authorizeRequests()
    .antMatchers("/ping", "/pong").permitAll()
    .antMatchers(HttpMethod.GET, "/api/v1/profiles").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
    .antMatchers(HttpMethod.GET, "/api/v1/profiles/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
    .antMatchers(HttpMethod.POST, "/api/v1/profiles/**").hasAnyAuthority("ROLE_ADMIN")
    .antMatchers(HttpMethod.PUT, "/api/v1/profiles/**").hasAnyAuthority("ROLE_ADMIN")
    .antMatchers(HttpMethod.DELETE, "/api/v1/profiles/**").hasAnyAuthority("ROLE_ADMIN")
    .anyRequest().authenticated();
}
```
