---
title: Auth0 Java Spring Security MVC Tutorial
description: This tutorial will show you how to use the Auth0 Java Spring Security MVC SDK to add authentication and authorization to your web app.
---

## Java Spring Security MVC Web App Tutorial

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Java 1.7
* Maven 3.3
:::

You can download the seed project [here](https://github.com/auth0-samples/auth0-spring-security-mvc-sample).

If you have an existing application, please follow the steps below. You can find some useful information on our [GitHub library](https://github.com/auth0/auth0-spring-security-mvc).

> We have created a [sample application](https://github.com/auth0-samples/auth0-spring-security-mvc-sso-sample) that demonstrates using Auth0 with Spring Boot and Spring Security to create two traditional server-side MVC web apps that are configured for Single Sign On with one another. The [sample application](https://github.com/auth0-samples/auth0-spring-security-mvc-sso-sample) contains  two demo websites that have been developed to demonstrate the Auth0 SSO capabilities between a main "portal" website and a Partner website that depends on the main "portal" site for SSO authentication.

### 1. Add Auth0 dependencies

You need to add the `auth0-spring-security-mvc` dependency.

If you are using maven, add the dependency to your `pom.xml`:

${snippet(meta.snippets.dependencies)}

If you are using Gradle, add it to the dependencies block:

${snippet(meta.snippets.dependenciesGradle)}

See the [seed project](https://github.com/auth0-samples/auth0-spring-security-mvc-sample) to understand the proposed overall structure of your `pom.xml`.

### 2. Configure your app

We need to configure `auth0-spring-mvc` to use our Auth0 credentials.

Create a file called `auth0.properties` and place this under `src/main/resources`. Set the following settings:

${snippet(meta.snippets.setup)}

Here is a breakdown of what each attribute means:

- `auth0.domain`: Your auth0 domain (the tenant you have created when registering with auth0).
- `auth0.issuer`: The issuer of the JWT Token (typically full URL of your auth0 tenant account - eg. https://{tenant_name}.auth0.com/).
- `auth0.clientId`: The unique identifier for your application. You can find the correct value on the Settings of your app on [Auth0 dashboard](${uiURL}/#/).
- `auth0.clientSecret`: This secret will be used to sign and validate tokens which will be used in the different authentication flows. With this key your application will also be able to authenticate to some of the API endpoints (eg: to get an access token from an authorization code). You can find the correct value on the Settings of your app on [Auth0 dashboard](${uiURL}/#/).
- `auth0.onLogoutRedirectTo`: The page that users of your site are redirected to on logout. Should start with `/`.
- `auth0.securedRoute`: The URL pattern that should map to the URL endpoint you wish to secure. You should replace its value with the correct value for your implementation. It should start with `/`. Note, if you are using the default library configuration (not overriding with your own) which just secures a single, specific context path then this value is important. However, if you are building an application which may have several different secured endpoints, or you don't want to specify an explicit configuration value in this `.properties` file then just set the value to something that signifies this. Perhaps `auth0.securedRoute: UNUSED`. Then just ignore the `securedRoute` entirely when you specify your own configuration. See the section [Extending Auth0SecurityConfig](https://github.com/auth0/auth0-spring-security-api#extending-auth0securityconfig) for further info. The takeaway message is that this property value is a convenience for the developer to configure an endpoint by context path (.eg all URLS with `/api/v1/` in their context path), but there is no obligation to actually reference this property in your own `HttpSecurity` configuration.
- `auth0.loginCallback`: The URL context path for the login callback endpoint. Should start with `/`.
- `auth0.loginRedirectOnSuccess`: The landing page URL context path for a successful authentication. Should start with `/`.
- `auth0.loginRedirectOnFail`: The URL context path for the page to redirect to upon failure. Should start with `/`.
- `auth0.base64EncodedSecret`: A boolean value indicating whether the Secret used to verify the JWT is `base64` encoded. Default is `true`.
- `auth0.authorityStrategy`: Indicates whether authorization claims against the Principal shall be `GROUPS`, `ROLES` or `SCOPE` based. Default is `ROLES`.
- `auth0.servletFilterEnabled`: A boolean value that switches having an authentication filter enabled or not.
- `auth0.defaultAuth0ApiSecurityEnabled`: A boolean value that switches having the default config enabled. It should be set to `false`.

### 3. Add Auth0 callback handler

We need to add the handler for the Auth0 callback so that we can authenticate the user and get his information. For that, we'll use the `Auth0CallbackHandler` provided by the SDK.

Simply define a new Controller, configure it to use the `auth0.loginCallback` endpoint, and inherit from `Auth0CallbackHandler`.

Example usage: extend this class and define Controller in subclass.

${snippet(meta.snippets.use)}

### 4. Defining endpoint security configuration

The [Auth0 Spring Security MVC library](https://github.com/auth0/auth0-spring-security-mvc) contains a security configuration class, called `Auth0SecurityConfig`. This class handles all the library Application Context wiring configuration, and a default `HttpSecurity` endpoint configuration that secures the URL Context path defined with `auth0.securedRoute` property.

This is defined in a method called `authorizeRequests(final HttpSecurity http)` which should be overridden by you.

```java
protected void authorizeRequests(final HttpSecurity http) throws Exception {
  http.authorizeRequests()
    .antMatchers(securedRoute).authenticated()
    .antMatchers("/**").permitAll();
}
```

By subclassing, and overriding `authorizeRequests` you can define whatever endpoint security configuration (authentication and authorization) is suitable for your own needs.

For example, this is the declared subclass together with overridden method from our [sample application](https://github.com/auth0-samples/auth0-spring-security-mvc-sample):

```java
package com.auth0.example;

import com.auth0.spring.security.mvc.Auth0SecurityConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


@Configuration
@EnableWebSecurity(debug = true)
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class AppConfig extends Auth0SecurityConfig {
  @Override
  protected void authorizeRequests(final HttpSecurity http) throws Exception {
    http.authorizeRequests()
      .antMatchers("/css/**", "/fonts/**", "/js/**", "/login").permitAll()
      .antMatchers("/portal/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
      .antMatchers(securedRoute).authenticated();
  }
}
```

### 5. Triggering login manually or integrating the Auth0Lock

Here is a recommended login setup using Lock:

```html
${'<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>'}
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
  <title>Login</title>
  <link rel="stylesheet" type="text/css" href="/css/bootstrap.css"/>
  <link rel="stylesheet" type="text/css" href="/css/jquery.growl.css"/>
  <script src="http://code.jquery.com/jquery.js"></script>
  <script src="http://cdn.auth0.com/js/lock-9.min.js"></script>
  <script src="/js/jquery.growl.js" type="text/javascript"></script>
</head>
<body>
  <div class="container">
    <script type="text/javascript">
      $(function () {
        var error = {error};
        if (error) {
          $.growl.error({message: "An error was detected. Please log in"});
        } else {
          $.growl({title: "Welcome!", message: "Please log in"});
        }
      });

      $(function () {
        var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
        lock.showSignin({
          authParams: {
            state: {state},
            // change scopes to whatever you like
            // claims are added to JWT id_token - openid profile gives everything
            scope: 'openid user_id name nickname email picture'
          },
          responseType: 'code',
          popup: false,
          callbackURL: '${account.callback}'
        });
      });
    </script>
  </div>
</body>
</html>
```

By default, this library expects a Nonce value in the state query param as follows `state=nonce=B4AD596E418F7CE02A703B42F60BAD8F` where `xyz` is a randomly generated UUID.

The NonceFactory can be used to generate such a nonce value. State may be needed to hold other attribute values hence why it has its own keyed value of `nonce=B4AD596E418F7CE02A703B42F60BAD8F`. For instance in SSO you may need an `externalCallbackUrl` which also needs to be stored down in the state param: `state=nonce=B4AD596E418F7CE02A703B42F60BAD8F&externalCallbackUrl=http://localhost:3099/callback`.


### 6. Accessing user information

Depending on what `scopes` you specified upon login, some user information may be available in the [id_token](/tokens#auth0-id_token-jwt-) received.
The full user profile information is available as a session object keyed on `Auth0User`, you can simply call `SessionUtils.getAuth0User()`. Ηowever, because the authenticated user is also a `java.security.Principal` object we can inject it into the Controller automatically for secured endpoints.

```java
   @RequestMapping(value="/portal/home", method = RequestMethod.GET)
   protected String home(final Map<String, Object> model, final Principal principal) {
       logger.info("Home page");
       final Auth0User user = (Auth0User) principal;
       logger.info("Principal name: "  user.getName());
       model.put("user", user);
       return "home";
   }
```

The value `/portal/home` should be replaced with the valid one for your implementation.

### 7. You're done!

You have configured your Java Webapp to use Auth0. Congrats, you're awesome!
