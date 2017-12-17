---
title: Authorization
name: How to secure your Spring Security API with Auth0
budicon: 500
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

::: note
In this tutorial, the example API contains the Photos resource. The scopes shown on the screenshot below will be used to limit access to `PhotosController`.
:::

![](/media/articles/server-apis/java-spring-security/add-api-scopes.png)

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

The example below shows how to implement CRUD (create, read, update and delete) methods and a login route for the Photos resource. 

For CRUD methods, you need authentication and specific scopes. 

In the `AppConfig` class, add route matchers to the snippet. The `hasAuthority()` method provides a way to specify the required scope for the resource.

The routes shown below are available for the following requests: 

- `GET /login`: available for non-authenticated requests
- `GET /photos`: available for authenticated requests containing an access token with the `read:photos` scope granted
- `POST /photos`: available for authenticated requests containing an access token with the `create:photos` scope granted
- `PUT /photos`: available for authenticated requests containing an access token with the `update:photos` scope granted
- `DELETE /photos`: available for authenticated requests containing an access token with the `delete:photos` scope granted
- Any other route that doesn't match the above requires the user to be authenticated with no additional scopes

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
                .antMatchers(HttpMethod.GET, "/login").permitAll()
                .antMatchers(HttpMethod.GET, "/photos/**").hasAuthority("read:photos")
                .antMatchers(HttpMethod.POST, "/photos/**").hasAuthority("create:photos")
                .antMatchers(HttpMethod.PUT, "/photos/**").hasAuthority("update:photos")
                .antMatchers(HttpMethod.DELETE, "/photos/**").hasAuthority("delete:photos")
                .anyRequest().authenticated();
    }
}
```

## Create the Photos Controller

Create a new class called `PhotosController` to handle each request to the endpoints.

Next, in the `AppConfig.java` file, configure which endpoints are secure and which are not.

## Use the API

To test your endpoints, start the API and send the relevant HTTP requests.

```java
// src/main/java/com/auth0/example/PhotosController.java

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Component
public class PhotosController {

    @RequestMapping(value = "/login")
    @ResponseBody
    public String login() {
        return "All good. You DO NOT need to be authenticated to call /login";
    }

    @RequestMapping(value = "/photos", method = RequestMethod.GET)
    @ResponseBody
    public String getPhotos() {
        return "All good. You can see this because you are Authenticated with a Token granted the 'read:photos' scope";
    }

    @RequestMapping(value = "/photos", method = RequestMethod.POST)
    @ResponseBody
    public String createPhotos() {
        return "All good. You can see this because you are Authenticated with a Token granted the 'create:photos' scope";
    }

    @RequestMapping(value = "/photos", method = RequestMethod.PUT)
    @ResponseBody
    public String updatePhotos() {
        return "All good. You can see this because you are Authenticated with a Token granted the 'update:photos' scope";
    }

    @RequestMapping(value = "/photos", method = RequestMethod.DELETE)
    @ResponseBody
    public String deletePhotos() {
        return "All good. You can see this because you are Authenticated with a Token granted the 'delete:photos' scope";
    }

    @RequestMapping(value = "/**")
    @ResponseBody
    public String anyRequest() {
        return "All good. You can see this because you are Authenticated.";
    }

}
```

To build and run the seed project, use the command: `mvn spring-boot:run`.

To test a non-secure endpoint, send a `GET` request to `http://localhost:3010/login`.

```bash
curl -X GET -H "Content-Type: application/json" -H "Cache-Control: no-cache" "http://localhost:3010/login"
```

You should get the message:
`All good. You DO NOT need to be authenticated to call /login`.

To test secure endpoints, send a `GET` request to `http://localhost:3010/photos`. In this case, you must add a valid access token as an `Authorization` header to your request.

```bash
curl -X GET -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" -H "Cache-Control: no-cache" "http://localhost:3010/photos"
```

You should get the message: `All good. You can see this because you are Authenticated with a Token granted the 'read:photos' scope`.

You can try with other HTTP methods and check if the scopes are validated as well.

If the token is not specified, you will get the following JSON as a response:

```text
{
  "timestamp": 1488492258708,
  "status": 401,
  "error": "Unauthorized",
  "message": "Unauthorized",
  "path": "/photos"
}
```

To obtain an access token, call the `/oauth/token` endpoint of the Auth0 [Authentication API](/api/authentication/reference#resource-owner-password) with Curl:

```text
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"grant_type":"password", "username":"USERNAME_OR_EMAIL", "password":"PASSWORD", "audience":"${apiIdentifier}", "scope":"read:photos update:photos create:photos", "client_id": "${account.clientId}", "client_secret": 'YOUR_CLIENT_SECRET'
 }'
```

::: note
In the example above, the `delete:photos` scope is not requested, so if you try to call `DELETE /photos` with an access token, the request will fail.
:::

The domain, client ID and client secret values must match your Auth0 client. Check the values in the [dashboard](${manage_url}/#/clients). Use the username and password of the user you want to authenticate with. Request the API audience with the API identifier and customize the scope to your needs. 

Pass the access token  in the `Authorization` header as a `Bearer` token.
