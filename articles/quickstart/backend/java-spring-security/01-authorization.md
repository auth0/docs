---
title: Authorization
name: How to secure your Spring Security API with Auth0
description: This tutorial demonstrates how to add authorization to your Spring Security API using Auth0.
budicon: 500
tags:
    - quickstart
    - backend
    - java
    - spring-security
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-spring-security-api-sample',
  path: '01-Authorization',
  requirements: [
    'Java 8 or above',
    'Maven 3.0.x or above'
  ]
}) %>

This tutorial shows you how to protect your Spring Security API endpoints and limit access to resources in your API.

## Create an API

Create a new API in the [APIs](${manage_url}/#/apis) section of the Auth0 dashboard.

Enter a name and an identifier for the API. These values represent the `auth0.apiAudience` value in the configuration file.

Select the signing algorithm. In the **Settings** tab,  you can change the token expiration time and allow to refresh a token for that API.
In the **Scopes** tab, add scopes you will use later to limit access to resources in your API.

<%= include('../_includes/_api_scopes_access_resources') %>

## Install the Dependencies

Add the `auth0-spring-security-api` dependency.

If you are using Maven, add the dependency to your `pom.xml` file:

${snippet(meta.snippets.dependencies)}

If you are using Gradle, add the dependency to the dependencies block:

${snippet(meta.snippets.dependenciesGradle)}

## Configure Your Spring Security API

Your Spring Security API needs some information to authenticate against your Auth0 account.

The sample project you can download from the top of this page comes with a configuration file. You may need to update some of the entries with the values for your API. The filename is `/src/main/resources/auth0.properties` and it contains the following:

${snippet(meta.snippets.setup)}

| Attribute | Description|
| --- | --- |
| `auth0.issuer` | The issuer of the JWT Token. Typically, this is your Auth0 domain with a `https://` prefix and a `/` suffix. For example, if your Auth0 domain is `example.auth0.com`, the `auth0.issuer` must be set to `https://example.auth0.com/` (the trailing slash is important). |
| `auth0.apiAudience` | The unique identifier for your API. You can find the correct value in the [APIs](${manage_url}/#/apis) section in your Auth0 dashboard. |

::: note
If you download the sample project, the `issuer` attribute is filled out for you. You must manually set the `apiAudience` attribute.
:::

## Configure JSON Web Token Signature Algorithm

Configure your API to use the RS256 signing algorithm.

::: note
If you download the sample project, the signing algorithm is set to `RS256` by default.
:::

```java
// src/main/java/com/auth0/example/AppConfig.java

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value(value = "<%= "${auth0.apiAudience}" %>")
    private String apiAudience;
    @Value(value = "<%= "${auth0.issuer}" %>")
    private String issuer;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        JwtWebSecurityConfigurer
                .forRS256(apiAudience, issuer)
                .configure(http);
    }
}
```

## Configure the Protected Endpoints

The example below shows how to implement secure API methods.

In the `AppConfig` class, add route matchers to the snippet. The `hasAuthority()` method provides a way to specify the required scope for the resource.

<%= include('../_includes/_api_endpoints') %>

```java
// src/main/java/com/auth0/example/AppConfig.java

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value(value = "<%= "${auth0.apiAudience}" %>")
    private String apiAudience;
    @Value(value = "<%= "${auth0.issuer}" %>")
    private String issuer;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        JwtWebSecurityConfigurer
                .forRS256(apiAudience, issuer)
                .configure(http)
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/public").permitAll()
                .antMatchers(HttpMethod.GET, "/api/private").authenticated()
                .antMatchers(HttpMethod.GET, "/api/private-scoped").hasAuthority("read:messages");
    }
}
```

## Create the API Controller

Create a new class called `APIController` to handle each request to the endpoints.

Next, in the `AppConfig.java` file, configure which endpoints are secure and which are not.

```java
// src/main/java/com/auth0/example/APIController.java

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.json.JSONObject;

@Controller
@Component
public class APIController {

    @RequestMapping(value = "/api/public", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public String publicEndpoint() {
        return new JSONObject()
                .put("message", "Hello from a public endpoint! You don\'t need to be authenticated to see this.")
                .toString();
    }

    @RequestMapping(value = "/api/private", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public String privateEndpoint() {
        return new JSONObject()
                .put("message", "Hello from a private endpoint! You need to be authenticated to see this.")
                .toString();
    }

    @RequestMapping(value = "/api/private-scoped", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public String privateScopedEndpoint() {
        return new JSONObject()
                .put("message", "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.")
                .toString();
    }

}
```

To build and run the seed project, use the command: `mvn spring-boot:run`.
