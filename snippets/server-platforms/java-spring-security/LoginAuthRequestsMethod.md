```java
protected void authorizeRequests(final HttpSecurity http) throws Exception {
  http.authorizeRequests()
    .antMatchers(securedRoute).authenticated()
    .antMatchers("/**").permitAll();
}
```