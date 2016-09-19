```java
@Override
  protected void authorizeRequests(final HttpSecurity http) throws Exception {
      http.authorizeRequests()
        .antMatchers("/ping").permitAll()
        .anyRequest().authenticated();
  }
```
