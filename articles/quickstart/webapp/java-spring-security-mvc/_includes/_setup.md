## Configure Spring Security to Use Auth0 

### Setup Dependencies

You'll need to configure **Spring Boot** in your project first. You can generate the base project in [this](https://start.spring.io/) link, choosing `Web` in the dependencies and clicking the button "Generate Project". The downloaded project has the Spring Boot dependencies and plugin applied. You then need to add a Server dependency like Tomcat or Gretty, which one is up to you. Check our sample code for more information.
The next step is to add the **auth0-java-mvc-commons** library. This one allows you to use Auth0 with Java for server-side MVC web apps. It generates the Authorize URL that you need to call in order to authenticate and validates the result received on the way back to finally obtain the [Auth0 Tokens](/tokens) that identify the user. You can always check the latest version in the [library's GitHub](https://github.com/auth0/auth0-java-mvc-common).

If you are using Gradle, add it to your `build.gradle`:

```java
compile 'com.auth0:mvc-auth-commons:1.+'
```

If you are using Maven, add it to your `pom.xml`:

```xml
<dependency>
  <groupId>com.auth0</groupId>
  <artifactId>mvc-auth-commons</artifactId>
  <version>1.+</version>
</dependency>
```

### Configure your Java Spring Security App

Your Java Spring Security App needs some information in order to authenticate against your Auth0 account. The samples read this information from the properties file `src/main/resources/auth0.properties`, but you could store them anywhere else. The required information is:

```xml
com.auth0.domain: ${account.namespace}
com.auth0.clientId: ${account.clientId}
com.auth0.clientSecret: 'YOUR_CLIENT_SECRET'
```

The library we're using has this default behavior:
- Request the scope `openid`, needed to call the `/userinfo` endpoint later to verify the User's identity.
- Request the `code` Response Type and later perform a Code Exchange to obtain the tokens.
- Use the `HS256` Algorithm along with the Client Secret to verify the tokens.

But it also allows us to customize it's behavior:
* To use the `RS256` Algorithm along with the Public Key obtained dynamically from the Auth0 hosted JWKs file, pass a `JwkProvider` instance to the `AuthenticationController` builder.
* To use a different Response Type, set the desired value in the `AuthenticationController` builder. Any combination of `code token id_token` is allowed.
* To request a different `scope`, set the desired value in the `AuthorizeUrl` received after calling `AuthenticationController#buildAuthorizeUrl()`.
* To specify the `audience`, set the desired value in the `AuthorizeUrl` received after calling `AuthenticationController#buildAuthorizeUrl()`.


::: panel Check populated attributes
If you download the seed using our **Download Sample** button then the `domain`, `clientId` and `clientSecret` attributes will be populated for you, unless you are not logged in or you do not have at least one registered application. In any case, you should verify that the values are correct if you have multiple applications in your account and you might want to use another than the one we set the information for.
:::
