---
title: Add login to your Java EE web application
description: This tutorial demonstrates how to add user login to a Java EE web application.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - java ee
contentType: tutorial
useCase: quickstart
github:
  path: 01-Login
interactive: true
files:
  - files/auth-config
  - files/auth-mechanism
  - files/auth-provider
  - files/home-servlet
  - files/jwt-credential
  - files/jwt-identity-store
  - files/jwt-principal
  - files/login-servlet
  - files/logout-servlet
  - files/web
---

# Add login to your Java EE web application

Auth0 allows you to add authentication and gain access to user profile information in different kind of applications. This guide demonstrates how to integrate Auth0 with any new or existing Java EE web application.
 
<%= include('../../_includes/_configure_auth0_interactive', {
callback: 'http://localhost:3000/callback',
returnTo: 'http://localhost:3000/'
}) %>

## Install dependencies {{{ data-action=code data-code="pom.xml" }}}

To integrate your Java EE application with Auth0, add the following dependencies:

- **javax.javaee-api**: The Java EE 8 API necessary to write applications using Java EE 8. The actual implementation is provided by the application container, so it does not need to be included in the WAR file.
- **javax.security.enterprise**: The Java EE 8 Security API that enables handling security concerns in an EE application. Like the `javax.javaee-api` dependency, the implementation is provided by the application container, so is not included in the WAR file.
- **auth0-java-mvc-commons**: The [Auth0 Java MVC SDK](https://github.com/auth0/auth0-java-mvc-common) allows you to use Auth0 with Java for server-side MVC web applications. It generates the Authorize URL that your application needs to call in order to authenticate a user using Auth0.

If you are using Maven, add these dependencies to your `pom.xml` file.

```xml
<!-- pom.xml -->

<dependency>
    <groupId>com.auth0</groupId>
    <artifactId>mvc-auth-commons</artifactId>
    <version>[1.0, 2.0)</version>
</dependency>
<dependency>
    <groupId>javax</groupId>
    <artifactId>javaee-api</artifactId>
    <version>8.0.1</version>
    <scope>provided</scope>
</dependency>
<dependency>
    <groupId>javax.security.enterprise</groupId>
    <artifactId>javax.security.enterprise-api</artifactId>
    <version>1.0</version>
    <scope>provided</scope>
</dependency>
```

If you are using Gradle, add them to your `build.gradle`:

```java
// build.gradle

providedCompile 'javax:javaee-api:8.0.1'
providedCompile 'javax.security.enterprise:javax.security.enterprise-api:1.0'
implementation 'com.auth0:mvc-auth-commons:1.+'
```

## Configure your application {{{ data-action=code data-code="web.xml" }}}

::: note
The sample that accompanies this tutorial is written using JSP and tested with the [WildFly](https://wildfly.org/) application server. You may need to adjust some of the steps if you working with a different application container or technologies.
:::

Your Java EE application needs some information in order to authenticate users with your Auth0 application. The deployment descriptor `src/main/webapp/WEB-INF/web.xml` file can be used to store this information, though you could store them in a different secured location.

This information will be used to configure the **auth0-java-mvc-commons** library to enable users to login to your application. To learn more about the library, including its various configuration options, see the [README](https://github.com/auth0/auth0-java-mvc-common/blob/master/README.md) of the library.

::: panel Check populated attributes
If you downloaded this sample using the **Download Sample** button, the `domain`, `clientId` and `clientSecret` attributes will be populated for you. You should verify that the values are correct, especially if you have multiple Auth0 applications in your account.
:::

## Configure Java EE Security {{{ data-action=code data-code="Auth0AuthenticationConfig.java" }}}

The Java EE 8 Security API introduced the `HttpAuthenticationMechanism` interface to enable applications to obtain a user's credentials. Default implementations exist for Basic and form-based authentication, and it provides an easy way to configure a custom authentication strategy.

To authenticate with Auth0:

1. Make your Auth0 settings available to the application by creating an `@ApplicationScoped` bean to retrieve the values from the web context and make them available via getters as shown in `Auth0AuthenticationConfig.java`.

2. Create a custom [CallerPrincipal](https://javaee.github.io/javaee-spec/javadocs/javax/security/enterprise/CallerPrincipal.html) that represents the caller principal of the current HTTP request as shown in `Auth0JwtPrincipal.java`.

3. Implement a custom [Credential](https://javaee.github.io/javaee-spec/javadocs/javax/security/enterprise/credential/Credential.html) that will be used to represent the user's credentials. It will hold information about the principal as shown in `Auth0JwtCredential.java`.

4. Create a custom implementation of [IdentityStore](https://javaee.github.io/javaee-spec/javadocs/javax/security/enterprise/identitystore/IdentityStore.html). This class will be responsible for validating the user's credentials as shown in `Auth0JwtIdentityStore.java`. If the credential is an `Auth0Credential`, the calling user is authenticated and valid, so a `CredentialValidationResult` is created with the credential and returned to indicate success. If it is not an `Auth0Credential`, `CredentialValidationResult.NOT_VALIDATED_RESULT` is returned.

5. Create a bean that will provide a configured instance of the `AuthenticationController` from the Auth0 Java MVC SDK. The `AuthenticationController` is used to build the authorization URL where users will login, and handle the token exchange to authenticate users, as shown in `Auth0AuthenticationProvider.java`.

  - If your Auth0 Application is configured to use the **RS256 signing algorithm** (the default when creating a new Auth0 Application), you need to configure a `JwkProvider` to fetch the public key used to verify the token's signature. See the jwks-rsa-java repository to learn about additional configuration options.
  - If your Auth0 Application is configured to use the **HS256 signing algorithm**, there is no need to configure the JwkProvider.

6. Implement a custom [HttpAuthenticationMechanism](https://javaee.github.io/javaee-spec/javadocs/javax/security/enterprise/authentication/mechanism/http/HttpAuthenticationMechanism.html) as shown in `Auth0AuthenticationMechanism.java`. The class overrides the `validateRequest` method, which is called on every request to our application, and is responsible for notifying the container of the authentication status.

This sample uses the [Authorization Code Flow](https://auth0.com/docs/flows/concepts/auth-code) to exchange an Authorization Code for a token during the authentication flow. If this request is to the `/callback` endpoint and contains the `code` request parameter, it does a few important things:

- Calls the `handle` method of the `AuthenticationController` to exchange the Authorization Code for an ID token and an access token.
- Uses the ID token to create a new `Auth0Credential`.
- Calls the `validate` method of the custom `IdentityStore` implementation to obtain the validation result.
- Notifies the application container of the login status.

If the requested resource is not `/callback`, return `httpMessageContext.doNothing()` to allow the request processing to continue. You will see shortly how to use the authentication information when triggering authentication and displaying web views.

Finally, note that the `@AutoApplySession` annotation has been added to allow the container to create a session for the authenticated user.

## Add login to your application {{{ data-action=code data-code="LoginServlet.java" }}}

The `LoginController` is responsible for redirecting the request to the proper authorization URL, where the user can authenticate with Auth0. It uses the `AuthenticationController` from the Auth0 Java MVC SDK to build the correct authorization URL, using the configuration values injected via `Auth0AuthenticationConfig`. By default, this sample requests the `"openid profile email"` scopes, to allow the application to retrieve basic profile information from the authenticated user. You can read more about these scopes in the [OpenID Connect Scopes](https://auth0.com/docs/scopes/current/oidc-scopes) documentation.

Once the user has entered their credentials and authorized the requested permissions, Auth0 will issue a request to the `callbackUrl`, and include a `code` query parameter which can be exchanged for an ID token and an access token. Recall that the `Auth0HttpAuthenticationMechanism` created above handles this exchange so that it can notify the application container of authentication status. This allows the Servlet that handles requests to the `/callback` path to simply forward the request on to the originally requested resource prior to logging in, or simply redirect to the home page:

```java
// src/main/com/auth0/example/web/CallbackServlet.java

@WebServlet(urlPatterns = {"/callback"})
public class CallbackServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String referer = (String) request.getSession().getAttribute("Referer");
        String redirectTo = referer != null ? referer : "/";

        response.sendRedirect(redirectTo);
    }
}
```

## Display user profile information {{{ data-action=code data-code="HomeServlet.java" }}}

You can use the `Auth0JwtPrincipal` to get profile information for the authenticated user. The `HomeServlet` demonstrates how to use the claims on the [ID token](https://auth0.com/docs/tokens/id-token) to set profile data as a request attribute.

You can then use that profile information in your view to display information about the user:

```html
<!-- src/main/webapp/WEB-INF/jsp/fragments/navbar.jspf -->

<c:choose>
    <c:when test="<%= "${empty profile}" %>">
        <li>
            <form action="/login" method="GET">
                <input type="submit" value="Login"/>
            </form>
        </li>
    </c:when>
    <c:otherwise>
        <li>
            <a href="#">
                <!-- Profile image should be set to the profile picture from the id token -->
                <img src="<%= "${profile.get('picture').asString()}" %>" alt="Profile picture"/>
            </a>
            <div>
                <!-- Show the user's full name from the id token here -->
                <div>"<%= "${profile.get('name').asString()}" %>"</div>
                <a href="/profile">Profile</a>
                <a href="/logout">Log out</a>
            </div>
        </li>
    </c:otherwise>
</c:choose>
```

## Add logout to your application {{{ data-action=code data-code="LogoutServlet.java" }}}


To log a user out, you should clear the application session and log the user out of Auth0. This is handled in the `LogoutServlet`.

First, clear the session by calling `request.getSession().invalidate()`. Then construct the logout URL, being sure to include the `returnTo` query parameter, which is where the user will be redirected to after logging out. Finally, redirect the response to the application's logout URL:

## Run the sample

To build and run the sample, execute the `wildfly:run` Maven goal to start an embedded WildFly application server with this application deployed to it. See the [WildFly Maven Plugin](https://docs.jboss.org/wildfly/plugins/maven/latest/) documentation for more information.

If you are using Linux or MacOS:

```bash
./mvnw clean wildfly:run
```

Windows:

```bash
mvnw.cmd clean wildfly:run
```

Point your browser to [http://localhost:3000](http://localhost:3000). Follow the **Log In** link to log in or sign up to your Auth0 tenant. 

Upon successful login, you will see the user's profile picture and a drop-down menu where the Log In link was. You can then view the user's profile page by clicking the **Profile** link. You can log out by clicking the **Logout** link in the drop-down menu.

::::checkpoint

:::checkpoint-default

Now that you have configured your application, verify that:
* clicking **login** navigates to Auth0
* after logging in, you can access the user's profile page by clicking the **profile** link.
* after logging in, you can log out by clicking the **logout** link in the drop-down menu.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure the correct application is selected
* did you save after entering your URLs?
* make sure the domain, Client ID and Client Secret are configured correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::