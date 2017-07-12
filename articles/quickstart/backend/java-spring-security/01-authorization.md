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
    'Java 7 or above',
    'Maven 3.0.x or above'
  ]
}) %>

This tutorial demonstrates how to protect your Spring Security API endpoints and how to limit access based on permissions. The permissions are handled with **scopes** which are set up in your Auth0 dashboard and which can be included in the `access_token` sent by a client (user).

## Create an API

Create a new API by accessing the [APIs section](${manage_url}/#/apis) of the dashboard.
Type a name and an identifier, which will represent the `auth0.apiAudience` value that you have to set in the configuration file. Next, choose the signing algorithm. Click the **Create** button and you'll be redirected to the API you've just created. In the **Settings** tab you can change the token expiration and allow refreshing a token for that API.

The example API in this tutorial will be centered around a **Photos** resource. Create some custom scopes to limit the access to the `PhotosController` which will be created in the next section. In the API screen, click the **Scopes** tab and add the following scopes: `create:photos`, `read:photos`, `update:photos` and `delete:photos`.

![](/media/articles/server-apis/java-spring-security/add-api-scopes.png)

## Install the Dependencies

Add the `auth0-spring-security-api` dependency.

If you are using Maven, add the dependency to your `pom.xml`:

${snippet(meta.snippets.dependencies)}

If you are using Gradle, add it to the dependencies block:

${snippet(meta.snippets.dependenciesGradle)}

## Configure your Spring Security API

Your Spring Security API needs some information in order to authenticate against your Auth0 account. The downloadable sample comes with a configration file already in place but you may need to update some of the entries with the valid values for your API. The file is `/src/main/resources/auth0.properties` and it contains the following:

${snippet(meta.snippets.setup)}

| Attribute | Description|
| --- | --- |
| `auth0.issuer` | The issuer of the JWT Token. This is typically your auth0 domain with a `https://` prefix and a `/` suffix. For example, if your `auth0.domain` is `example.auth0.com` then the `auth0.issuer` should be set to `https://example.auth0.com/` (the trailing slash is important). |
| `auth0.apiAudience` | The unique identifier for your API. You can find the correct value on the [APIs](${manage_url}/#/apis) section of the Dashboard. * |

::: note
If you download the seed project using our **Download Sample** button then the `issuer` attribute will be populated for you, unless you are not logged in or you do not have at least one registered client. Do not forget to manually set the `apiAudience` attribute.
:::

## Configure JSON Web Token Signature Algorithm

Start by configuring your API to use the RS256 signing algorithm. If you downloaded the seed project above, `RS256` is configured by default.

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

This example assumes one entity called **Photos** and implements CRUD methods for it, along with a **login** route. The former will require authentication and specific scopes, while the latter won't. In the `AppConfig` class, edit the snippet to add the route matchers. The `hasAuthority()` method provides a way to specify the required scope for the resource.

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

These routes will behave as such:

- `GET /login` will be available for non-authenticated requests.
- `GET /photos` will be available for authenticated requests which include an `access_token` with the `read:photos` scope granted.
- `POST /photos` will be available for authenticated requests which include an `access_token` with the `create:photos` scope granted.
- `PUT /photos` will be available for authenticated requests which include an `access_token` with the `update:photos` scope granted.
- `DELETE /photos` will be available for authenticated requests which include an `access_token` with the `delete:photos` scope granted.
- Any other route that doesn't match the above will require the user to be authenticated with no additional scopes.

## Create the Photos Controller

Create a new class called `PhotosController` to handle each request to the endpoints.

Next, edit the `AppConfig.java` file to configure which endpoints are secure and which are not.

## Using the API

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

To test the non-secure endpoint, send a `GET` request at `http://localhost:3001/login`.

```bash
curl -X GET -H "Content-Type: application/json" -H "Cache-Control: no-cache" "http://localhost:3001/login"
```

You should get the message: `All good. You DO NOT need to be authenticated to call /login`.

To test the secure endpoints send a request at `http://localhost:3001/photos`. In this case, you will also have to add a valid `access_token` as an `Authorization` header to your request.

```bash
curl -X GET -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" -H "Cache-Control: no-cache" "http://localhost:3001/photos"
```

You should get the message: `All good. You can see this because you are Authenticated with a Token granted the 'read:photos' scope`. You can try with other HTTP methods and verify that the scopes are validated as well.

If the token is not specified you will get the following JSON as a response.

```text
{
  "timestamp": 1488492258708,
  "status": 401,
  "error": "Unauthorized",
  "message": "Unauthorized",
  "path": "/photos"
}
```

A quick and easy way to obtain an `access_token` is to call the `/oauth/token` endpoint of the Auth0 [Authentication API](/api/authentication/reference#resource-owner-password) using Curl:

```text
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"grant_type":"password", "username":"USERNAME_OR_EMAIL", "password":"PASSWORD", "audience":"${apiIdentifier}", "scope":"read:photos update:photos create:photos", "client_id": "${account.clientId}", "client_secret": "${account.clientSecret}"
 }'
```

The domain along with the `client_id` and `client_secret` values should match your Auth0 client. Check the values in the [dashboard](${manage_url}/#/clients). Use the `username` and `password` of the user you want to authenticate with. Request the API `audience` by using the API ddentifier defined at the beginning of the article and customize the `scope` to your needs. In the snippet above, the `delete:photos` scope is not requested, so calling `DELETE /photos` with the received `access_token` will fail.

Now you can use the `access_token` and pass it along in the `Authorization` header as a `Bearer` token.
