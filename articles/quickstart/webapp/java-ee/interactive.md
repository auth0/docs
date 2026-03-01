---
title: Add Login to Your Java EE web application
description: This tutorial demonstrates how to add user login to a Java EE web application.
interactive:  true
files:
 - files/src/main/webapp/WEB-INF/web
 - files/src/main/java/com/auth0/example/security/Auth0AuthenticationConfig
 - files/src/main/java/com/auth0/example/web/LoginServlet
 - files/src/main/java/com/auth0/example/web/HomeServlet
 - files/src/main/java/com/auth0/example/web/LogoutServlet
github:
  path: 01-Login
locale: en-US
---

# Add Login to Your Java EE web application


<p>This tutorial demonstrates how to add user login to a Java EE web application. We recommend that you log in to follow this quickstart with examples configured for your account.</p><h2>System Requirements</h2><p>This tutorial and sample project have been tested with the following:</p><ul><li><p>Java 11</p></li></ul><p></p><p></p>

## Configure Auth0


<h3>Get Your Application Keys</h3><p>When you signed up for Auth0, a new application was created for you, or you could have created a new one. You will need some details about that application to communicate with Auth0. You can get these details from the <a href="https://manage.auth0.com/#/applications" target="_blank" rel="noreferrer noopener">Application Settings</a> section in the Auth0 dashboard.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1NtemqhRTHLFgWkGyAVSC6/ae66506a56ffab891e8a36e1344e6376/uwp.png" alt="" /><p>You need the following information:</p><ul><li><p><b>Domain</b></p></li><li><p><b>Client ID</b></p></li><li><p><b>Client Secret</b></p></li></ul><p><div class="alert-container" severity="default"><p>If you download the sample from the top of this page, these details are filled out for you.</p></div></p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application where Auth0 redirects the user after they have authenticated. The callback URL for your app must be added to the <b>Allowed Callback URLs</b> field in your <a href="https://manage.auth0.com/#/applications" target="_blank" rel="noreferrer noopener">Application Settings</a>. If this field is not set, users will be unable to log in to the application and will get an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with the sample project you downloaded from the top of this page, the callback URL you need to add to the <b>Allowed Callback URLs</b> field is <code>http://localhost:3000/callback</code>.</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that Auth0 can return to after the user has been logged out of the authorization server. This is specified in the <code>returnTo</code> query parameter. The logout URL for your app must be added to the <b>Allowed Logout URLs</b> field in your <a href="https://manage.auth0.com/#/applications" target="_blank" rel="noreferrer noopener">Application Settings</a>. If this field is not set, users will be unable to log out from the application and will get an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with the sample project you downloaded from the top of this page, the logout URL you need to add to the <b>Allowed Logout URLs</b> field is <code>http://localhost:3000/</code>.</p></div></p><p></p>

## Configure Java EE to use Auth0 {{{ data-action="code" data-code="src/main/webapp/WEB-INF/web.xml" }}}


<h3>Set up dependencies</h3><p>To integrate your Java EE application with Auth0, add the following dependencies:</p><ul><li><p><b>javax.javaee-api</b>: The Java EE 8 API necessary to write applications using Java EE 8. The actual implementation is provided by the application container, so it does not need to be included in the WAR file.</p></li><li><p><b>javax.security.enterprise</b>: The Java EE 8 Security API that enables handling security concerns in an EE application. Like the <code>javax.javaee-api</code> dependency, the implementation is provided by the application container, so is not included in the WAR file.</p></li><li><p><b>auth0-java-mvc-commons</b>: The <a href="https://github.com/auth0/auth0-java-mvc-common" target="_blank" rel="noreferrer noopener">Auth0 Java MVC SDK</a> allows you to use Auth0 with Java for server-side MVC web applications. It generates the Authorize URL that your application needs to call in order to authenticate a user using Auth0.</p></li></ul><p>If you are using Maven, add these dependencies to your <code>pom.xml</code>:</p><p><pre><code class="language-xml">&lt;!-- pom.xml --&gt;

&lt;dependency&gt;

 &lt;groupId&gt;com.auth0&lt;/groupId&gt;

 &lt;artifactId&gt;mvc-auth-commons&lt;/artifactId&gt;

 &lt;version&gt;[1.0, 2.0)&lt;/version&gt;

&lt;/dependency&gt;

&lt;dependency&gt;

 &lt;groupId&gt;javax&lt;/groupId&gt;

 &lt;artifactId&gt;javaee-api&lt;/artifactId&gt;

 &lt;version&gt;8.0.1&lt;/version&gt;

 &lt;scope&gt;provided&lt;/scope&gt;

&lt;/dependency&gt;

&lt;dependency&gt;

 &lt;groupId&gt;javax.security.enterprise&lt;/groupId&gt;

 &lt;artifactId&gt;javax.security.enterprise-api&lt;/artifactId&gt;

 &lt;version&gt;1.0&lt;/version&gt;

 &lt;scope&gt;provided&lt;/scope&gt;

&lt;/dependency&gt;

</code></pre>

</p><p>If you are using Gradle, add them to your <code>build.gradle</code>:</p><p><pre><code class="language-powershell">// build.gradle



providedCompile 'javax:javaee-api:8.0.1'

providedCompile 'javax.security.enterprise:javax.security.enterprise-api:1.0'

implementation 'com.auth0:mvc-auth-commons:1. '

</code></pre>

</p><h3>Configure your Java EE application</h3><p><div class="alert-container" severity="default"><p>The sample that accompanies this tutorial is written using JSP and tested with the <a href="https://wildfly.org/" target="_blank" rel="noreferrer noopener">WildFly</a> application server. You may need to adjust some of the steps if you working with a different application container or technologies.</p></div></p><p>Your Java EE application needs some information in order to authenticate users with your Auth0 application. The deployment descriptor <code>web.xml </code>file can be used to store this information, though you could store them in a different secured location. </p><p>This information will be used to configure the <b>auth0-java-mvc-commons</b> library to enable users to login to your application. To learn more about the library, including its various configuration options, see the <a href="https://github.com/auth0/auth0-java-mvc-common/blob/master/README.md" target="_blank" rel="noreferrer noopener">README</a> of the library.</p><p><div class="tablew"><table class="table"><thead>

<tr>

<th>**Check populated attributes**</th>

</tr>

</thead>

<tbody>

<tr>

<td>If you downloaded this sample using the **Download Sample** button, the <code>domain</code>, <code>clientId</code> and <code>clientSecret</code> attributes will be populated for you. You should verify that the values are correct, especially if you have multiple Auth0 applications in your account.</td>

</tr>

</tbody>

</table></div></p><p></p>

## Configure Java EE Security {{{ data-action="code" data-code="src/main/java/com/auth0/example/security/Auth0AuthenticationConfig.java" }}}


<p>The Java EE 8 Security API introduced the <code>HttpAuthenticationMechanism</code> interface to enable applications to obtain a user&#39;s credentials. Default implementations exist for Basic and form-based authentication, and it provides an easy way to configure a custom authentication strategy.</p><p>To authenticate with Auth0, provide custom implementations of the following interfaces:</p><ul><li><p>HttpAuthenticationMechanism: Responsible for handling the authentication workflow for users returning from Auth0. (<a href="https://javaee.github.io/javaee-spec/javadocs/javax/security/enterprise/authentication/mechanism/http/HttpAuthenticationMechanism.html" target="_blank" rel="noreferrer noopener">JavaDoc</a>).</p></li><li><p>IdentityStore: Responsible for validating the user&#39;s credentials (<a href="https://javaee.github.io/javaee-spec/javadocs/javax/security/enterprise/identitystore/IdentityStore.html" target="_blank" rel="noreferrer noopener">JavaDoc</a>).</p></li><li><p>CallerPrincipal: Represents the caller principal of the current HTTP request (<a href="https://javaee.github.io/javaee-spec/javadocs/javax/security/enterprise/CallerPrincipal.html" target="_blank" rel="noreferrer noopener">JavaDoc</a>).</p></li><li><p>Credential: Represents the credential the caller will use to authenticate (<a href="https://javaee.github.io/javaee-spec/javadocs/javax/security/enterprise/credential/Credential.html" target="_blank" rel="noreferrer noopener">JavaDoc</a>).</p></li></ul><p>First, make your Auth0 settings available to the application by creating an @ApplicationScoped bean to retrieve the values from the web context and make them available via getters.</p><p>Next, create a custom <code>CallerPrincipal</code> that represents the caller of the current request:</p><p><pre><code class="language-java">// src/main/java/com/auth0/example/security/Auth0JwtPrincipal.java



public class Auth0JwtPrincipal extends CallerPrincipal {

    private final DecodedJWT idToken;



    Auth0JwtPrincipal(DecodedJWT idToken) {

        super(idToken.getClaim(&quot;name&quot;).asString());

        this.idToken = idToken;

    }



    public DecodedJWT getIdToken() {

        return this.idToken;

    }

}

</code></pre>

</p><p>You can now implement a custom <code>Credential</code> that will be used to represent the user&#39;s credentials. It will hold information about the principal:</p><p><pre><code class="language-javascript">// src/main/java/com/auth0/example/security/Auth0JwtCredential.java



class Auth0JwtCredential implements Credential {

    private Auth0JwtPrincipal auth0JwtPrincipal;



    Auth0JwtCredential(String token) {

        DecodedJWT decodedJWT = JWT.decode(token);

        this.auth0JwtPrincipal = new Auth0JwtPrincipal(decodedJWT);

    }



    Auth0JwtPrincipal getAuth0JwtPrincipal() {

        return auth0JwtPrincipal;

    }

}

</code></pre>

</p><p>You now have defined the classes that represent a calling principal and credential. Next, create a custom implementation of <code>IdentityStore</code>. This class will be responsible for validating the user&#39;s credentials:</p><p><pre><code class="language-java">// src/main/java/com/auth0/example/security/Auth0JwtIdentityStore.java



@ApplicationScoped

public class Auth0JwtIdentityStore implements IdentityStore {



    @Override

    public CredentialValidationResult validate(final Credential credential) {

        CredentialValidationResult result = CredentialValidationResult.NOT_VALIDATED_RESULT;

        if (credential instanceof Auth0JwtCredential) {

            Auth0JwtCredential auth0JwtCredential = (Auth0JwtCredential) credential;

            result = new CredentialValidationResult(auth0JwtCredential.getAuth0JwtPrincipal());

        }

        return result;

    }

}

</code></pre>

</p><p>If the <code>credential</code> is an <code>Auth0Credential</code>, the calling user is authenticated and valid, so a <code>CredentialValidationResult</code> created with the credential is returned to indicate success. If it is not an <code>Auth0Credential</code>, return <code>CredentialValidationResult.NOT_VALIDATED_RESULT</code>.</p><p>Before implementing the <code>HttpAuthenticationMechanism</code> interface that will use all these collaborators, create a bean that will provide a configured instance of the <code>AuthenticationController</code> from the Auth0 Java MVC SDK. The <code>AuthenticationController</code> is used to build the authorization URL where users will login, and handle the token exchange to authenticate users.</p><ul><li><p>If your Auth0 Application is configured to use the <b>RS256 signing algorithm </b>(the default when creating a new Auth0 Application), you need to configure a <code>JwkProvider </code>to fetch the public key used to verify the token&#39;s signature. See the <a href="https://github.com/auth0/jwks-rsa-java" target="_blank" rel="noreferrer noopener">jwks-rsa-java repository</a> to learn about additional configuration options.</p></li><li><p>If your Auth0 Application is configured to use the <b>HS256 signing algorithm</b>, there is no need to configure the <code>JwkProvider</code>.</p></li></ul><p><div class="alert-container" severity="default"><p>To learn more about the available signing algorithms, refer to the <a href="https://auth0.com/docs/tokens/concepts/signing-algorithms" target="_blank" >documentation</a>.</p></div></p><p>The sample below shows how to configure the <code>AuthenticationController</code> for use with the <b>RS256 signing algorithm</b>:</p><p><pre><code class="language-javascript">// src/main/java/com/auth0/example/security/Auth0AuthenticationProvider.java



@ApplicationScoped

public class Auth0AuthenticationProvider {



    @Produces

    public AuthenticationController authenticationController(Auth0AuthenticationConfig config) {

        JwkProvider jwkProvider = new JwkProviderBuilder(config.getDomain()).build();

        return AuthenticationController.newBuilder(config.getDomain(), config.getClientId(), config.getClientSecret())

                .withJwkProvider(jwkProvider)

                .build();

    }

}

</code></pre>

</p><p>Finally, implement a custom <code>HttpAuthenticationMechanism</code></p><p><code></code><pre><code class="language-javascript">// src/main/java/com/auth0/example/security/Auth0AuthenticationMechanism.java



@ApplicationScoped

@AutoApplySession

public class Auth0AuthenticationMechanism implements HttpAuthenticationMechanism {

    private final AuthenticationController authenticationController;

    private final IdentityStoreHandler identityStoreHandler;



    @Inject

    Auth0AuthenticationMechanism(AuthenticationController authenticationController, IdentityStoreHandler identityStoreHandler) {

        this.authenticationController = authenticationController;

        this.identityStoreHandler = identityStoreHandler;

    }



    @Override

    public AuthenticationStatus validateRequest(HttpServletRequest httpServletRequest,

                                                HttpServletResponse httpServletResponse,

                                                HttpMessageContext httpMessageContext) throws AuthenticationException {



        // Exchange the code for the ID token, and notify container of result.

        if (isCallbackRequest(httpServletRequest)) {

            try {

                Tokens tokens = authenticationController.handle(httpServletRequest, httpServletResponse);

                Auth0JwtCredential auth0JwtCredential = new Auth0JwtCredential(tokens.getIdToken());

                CredentialValidationResult result = identityStoreHandler.validate(auth0JwtCredential);

                return httpMessageContext.notifyContainerAboutLogin(result);

            } catch (IdentityVerificationException e) {

                return httpMessageContext.responseUnauthorized();

            }

        }

        return httpMessageContext.doNothing();

    }



    private boolean isCallbackRequest(HttpServletRequest request) {

        return request.getRequestURI().equals(&quot;/callback&quot;) &amp;&amp; request.getParameter(&quot;code&quot;) != null;

    }

}

</code></pre>

</p><p>The class overrides the <code>validateRequest</code> method, which is called on every request to our application, and is responsible for notifying the container of the authentication status.</p><p>This sample uses the <a href="https://auth0.com/docs/flows/concepts/auth-code" target="_blank" >Authorization Code Flow</a> to exchange an Authorization Code for a token during the authentication flow. If this request is to the <code>/callback</code> endpoint and contains the <code>code</code> request parameter, it does a few important things:</p><ul><li><p>Calls the <code>handle </code>method of the <code>AuthenticationController </code>to exchange the Authorization Code for an ID token and an access token.</p></li><li><p>Uses the ID token to create a new <code>Auth0Credential</code>.</p></li><li><p>Calls the <code>validate </code>method of the custom <code>IdentityStore </code>implementation to obtain the validation result.</p></li><li><p>Notifies the application container of the login status.</p></li></ul><p>If the requested resource is not <code>/callback</code>, return <code>httpMessageContext.doNothing()</code> to allow the request processing to continue. You will see shortly how to use the authentication information when triggering authentication and displaying web views.</p><p>Finally, note that the <code>@AutoApplySession</code> annotation has been added to allow the container to create a session for the authenticated user.</p>

## Trigger authentication {{{ data-action="code" data-code="src/main/java/com/auth0/example/web/LoginServlet.java" }}}


<p>To enable a user to log in, create a Servlet that will handle requests to the <code>/login</code> path.</p><p>The <code>LoginController</code> is responsible for redirecting the request to the proper authorization URL, where the user can authenticate with Auth0. It uses the <code>AuthenticationController</code> from the Auth0 Java MVC SDK to build the correct authorization URL, using the configuration values injected via <code>Auth0AuthenticationConfig</code>. By default, this sample requests the <code>&quot;openid profile email&quot;</code> scopes, to allow the application to retrieve basic profile information from the authenticated user. You can read more about these scopes in the <a href="https://auth0.com/docs/scopes/current/oidc-scopes" target="_blank" >OpenID Connect Scopes</a> documentation.</p><p>Once the user has entered their credentials and authorized the requested permissions, Auth0 will issue a request to the <code>callbackUrl</code>, and include a <code>code</code> query parameter which can be exchanged for an ID token and an access token. Recall that the <code>Auth0HttpAuthenticationMechanism</code> created above handles this exchange so that it can notify the application container of authentication status. This allows the Servlet that handles requests to the <code>/callback</code> path to simply forward the request on to the originally requested resource prior to logging in, or simply redirect to the home page:</p><p><pre><code class="language-javascript">// src/main/com/auth0/example/web/CallbackServlet.java



@WebServlet(urlPatterns = {&quot;/callback&quot;})

public class CallbackServlet extends HttpServlet {



    @Override

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String referer = (String) request.getSession().getAttribute(&quot;Referer&quot;);

        String redirectTo = referer != null ? referer : &quot;/&quot;;



        response.sendRedirect(redirectTo);

    }

}

</code></pre>



</p>

## Display user information {{{ data-action="code" data-code="src/main/java/com/auth0/example/web/HomeServlet.java" }}}


<p>You can use the <code>Auth0JwtPrincipal</code> to get profile information for the authenticated user. The <code>HomeServlet.java</code> code sample demonstrates how to use the claims on the <a href="https://auth0.com/docs/tokens/id-token" target="_blank" >ID token</a> to set profile data as a request attribute.</p><p>You can then use that profile information in your view to display information about the user:</p><p><pre><code class="language-html">&lt;!-- src/main/webapp/WEB-INF/jsp/fragments/navbar.jspf --&gt;



&lt;c:choose&gt;

 &lt;c:when test=&quot;{empty profile}&quot;&gt;

&lt;li&gt;

 &lt;form action=&quot;/login&quot; method=&quot;GET&quot;&gt;

&lt;input type=&quot;submit&quot; value=&quot;Login&quot;/&gt;

 &lt;/form&gt;

&lt;/li&gt;

 &lt;/c:when&gt;

 &lt;c:otherwise&gt;

&lt;li&gt;

 &lt;a href=&quot;#&quot;&gt;

&lt;!-- Profile image should be set to the profile picture from the id token --&gt;

&lt;img src=&quot;{profile.get('picture').asString()}&quot; alt=&quot;Profile picture&quot;/&gt;

 &lt;/a&gt;

 &lt;div&gt;

&lt;!-- Show the user's full name from the id token here --&gt;

&lt;div&gt;&quot;{profile.get('name').asString()}&quot;&lt;/div&gt;

&lt;a href=&quot;/profile&quot;&gt;Profile&lt;/a&gt;

&lt;a href=&quot;/logout&quot;&gt;Log out&lt;/a&gt;

 &lt;/div&gt;

&lt;/li&gt;

 &lt;/c:otherwise&gt;

&lt;/c:choose&gt;

</code></pre>

</p><p></p><p></p>

## Handle logout {{{ data-action="code" data-code="src/main/java/com/auth0/example/web/LogoutServlet.java" }}}


<p>To log a user out, you should clear the application session and log the user out of Auth0. This is handled in the <code>LogoutServlet</code>.</p><p>First, clear the session by calling <code>request.getSession().invalidate()</code>. Then construct the logout URL, being sure to include the <code>returnTo</code> query parameter, which is where the user will be redirected to after logging out. Finally, redirect the response to the application&#39;s logout URL.</p>

## Run the sample


<p>To build and run the sample, execute the wildfly:run Maven goal to start an embedded WildFly application server with this application deployed to it. See the <a href="https://docs.jboss.org/wildfly/plugins/maven/latest/" target="_blank" rel="noreferrer noopener">WildFly Maven Plugin</a> documentation for more information.</p><p>If you are using Linux or MacOS:</p><p><pre><code class="language-powershell">./mvnw clean wildfly:run

</code></pre>

</p><p>Windows:</p><p><pre><code class="language-powershell">mvnw.cmd clean wildfly:run

</code></pre>

</p><p>Point your browser to <code>http:</code><code>//localhost:3000.</code>  Follow the <b>Log In</b> link to log in or sign up to your Auth0 tenant.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/5Lp4Zahxd2v6wSJmy9JaM4/8625115fc5b27b7f6f4adf9003c30b3a/Login_Screen_-_English.png" alt="" /><p>Upon successful login, you will see the user&#39;s profile picture and a drop-down menu where the Log In link was. You can then view the user&#39;s profile page by clicking the <b>Profile</b> link. You can log out by clicking the <b>Logout</b> link in the drop-down menu.</p>
