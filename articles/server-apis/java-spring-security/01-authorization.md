---
title: Authentication
name: Shows how to secure your API
budicon: 500
---

In this tutorial you will learn to protect a "Photos API" by requiring specific scopes.

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-spring-security-api-sample',
  path: '01-Authorization',
  requirements: [
    'Java 7 or above',
    'Maven 3.0.x or above'
  ]
}) %>


## 1. Create the API

Create a new API by accessing the [APIs section](${manage_url}/#/apis) of the dashboard.
Type a name and an identifier, which will represent the `auth0.apiAudience` value that you have to set in the configuration file. Next, choose the signing algorithm. Auth0 can sign JSON Web Tokens (JWT) using either a symmetric key (HS256) or an asymmetric key (RS256). In this example we'll be signing tokens using **RS256**. Click the **CREATE** button and you'll be redirected to the API you've just created. In the **Settings** tab you can change the token expiration and allow refreshing a token for that API.

> For more information on the signing algorithms see: [JSON Web Token (JWT) Signing Algorithms Overview](https://auth0.com/blog/json-web-token-signing-algorithms-overview/)

We need to create custom scopes to limit the access to the `PhotosController`. In the API screen click the **Scopes** tab and add the following scopes: `create:photos`, `read:photos`, `update:photos` and `delete:photos`.


![](/media/articles/server-apis/java-spring-security/add-api-scopes.png)


## 2. Configure JSON Web Token Signature Algorithm

The next step is to configure your API to use the algorithm you chose. If you downloaded our seed project, `RS256` is configured by default. You can change that in the `AppConfig` class.

```java
@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        JwtWebSecurityConfigurer
                .forRS256(apiAudience, issuer)
                .configure(http);
    }
}
```


## 2. Configure the protected endpoints

In our example, we will assume one entity "Photos" and it's CRUD methods, along with a "login" route. The former will require authentication and specific scopes, while the later won't. In the `AppConfig` class edit the snippet to add the route matchers. By calling `hasAuthority()` we're requiring the request to be authenticated AND to have the given scope granted.

```java
@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

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

Above we're securing the routes like this:
- `GET /login` will be available for non-authenticated requests.
- `GET /photos` will be available for authenticated request that have a token with `read:photos` scope granted.
- `POST /photos` will be available for authenticated request that have a token with `create:photos` scope granted.
- `PUT /photos` will be available for authenticated request that have a token with `update:photos` scope granted.
- `DELETE /photos` will be available for authenticated request that have a token with `delete:photos` scope granted.
- Any other route that doesn't match the above, will require the user to be authenticated with no additional scopes.


## 3. Create the Photos Controller

Create a new class `PhotosController` to handle each request to our endpoints.

${snippet(meta.snippets.PhotosController)}

Next we need to configure which endpoint is secure and which is not. Edit the `AppConfig.java` file.


## 4. Using the API

To test your endpoints you need to start the API and then send the relevant HTTP requests.

In order to build and run our seed project use the command: `mvn spring-boot:run`.

To test the non-secure endpoint send a `GET` request at `http://localhost:3001/login`.

```bash
curl -X GET -H "Content-Type: application/json" -H "Cache-Control: no-cache" "http://localhost:3001/login"
```

You should get the message: `All good. You DO NOT need to be authenticated to call /login`.

To test the secure endpoints send a request at `http://localhost:3001/photos`. In this case, you will also have to add a valid `access_token` to your request.

```bash
curl -X GET -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" -H "Cache-Control: no-cache" "http://localhost:3001/photos"
```

You should get the message: `All good. You can see this because you are Authenticated with a Token granted the 'read:photos' scope`. You can try with other Http methods and verify that the scopes are validated as well.

If the token is not specified you will get the following JSON as a response.

```json
{
  "timestamp": 1488492258708,
  "status": 401,
  "error": "Unauthorized",
  "message": "Unauthorized",
  "path": "/photos"
}
```

A quick and easy way to obtain an `access_token` is to call the `/oauth/token` endpoint of the Auth0 [Authentication API](/api/authentication/reference#resource-owner-password) using Curl:

```
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"grant_type":"password", "username":"USERNAME_OR_EMAIL", "password":"PASSWORD", "audience":"API_IDENTIFIER", "scope":"read:photos update:photos create:photos", "client_id": "${account.clientId}", "client_secret": "${account.clientSecret}"
 }'
```

The url's domain along with the `client_id` and `client_secret` values should match your Auth0 Client. Check the values in the [dashboard](${manage_url}/#/clients). Use the `username` and `password` of the user you're going to authenticate with. Request the API `audience` by using the API Identifier defined at the beginning of the article and customize the `scope` to your needs. In the snippet above, we're not requesting the `delete:photos` scope, so calling `DELETE /photos` with the received `access_token` will fail.

Now you can use the `access_token` and pass it along in the Authorization header as a Bearer token.

## 4. You're done!

You have secured your Java Spring Security API endpoints using Auth0. Congrats, you're awesome!
