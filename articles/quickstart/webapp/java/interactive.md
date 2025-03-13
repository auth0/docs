---
title: Add Login to Your Java Servlet Application
description: This guide demonstrates how to integrate Auth0 with any new or existing Java Servlet application.
interactive:  true
files:
 - files/web
 - files/AuthenticationControllerProvider
 - files/LoginServlet
 - files/CallbackServlet
 - files/HomeServlet
 - files/LogoutServlet
github:
  path: https://github.com/auth0-samples/auth0-servlet-sample/tree/master/01-Login
locale: en-US
---

# Add Login to Your Java Servlet Application


<p>Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with any new or existing Java Servlet application.</p><p></p>

## Configure Auth0


<p>To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/#/">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000/</code>.</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000/</code>.</p></div></p>

## Integrate Auth0 in your application


<h3>Setup dependencies</h3><p>To integrate your Java application with Auth0, add the following dependencies:</p><ul><li><p><b>javax.servlet-api</b></p><p>: is the library that allows you to create Java Servlets. You then need to add a Server dependency like Tomcat or Gretty, which one is up to you. Check our sample code for more information.</p></li><li><p><b>auth0-java-mvc-commons</b>: is the <a href="https://github.com/auth0/auth0-java-mvc-common">Java library</a> that allows you to use Auth0 with Java for server-side MVC web apps. It generates the Authorize URL that you need to call in order to authenticate and validates the result received on the way back to finally obtain the <a href="https://auth0.com/docs/tokens">Auth0 Tokens</a> that identify the user.</p></li></ul><p>If you are using Gradle, add them to your <code>build.gradle</code>:</p><p><pre><code>// build.gradle



compile 'javax.servlet:javax.servlet-api:3.1.0'

compile 'com.auth0:mvc-auth-commons:1.+'W

</code></pre>

</p><p>If you are using Maven, add them to your <code>pom.xml</code>:</p><p><pre><code>&lt;!-- pom.xml --&gt;



&lt;dependency&gt;

  &lt;groupId&gt;com.auth0&lt;/groupId&gt;

  &lt;artifactId&gt;mvc-auth-commons&lt;/artifactId&gt;

  &lt;version&gt;[1.0, 2.0)&lt;/version&gt;

&lt;/dependency&gt;

&lt;dependency&gt;

  &lt;groupId&gt;javax.servlet&lt;/groupId&gt;

  &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;

  &lt;version&gt;3.1.0&lt;/version&gt;

&lt;/dependency&gt;

</code></pre>

</p>

## Configure your Java application {{{ data-action="code" data-code="web.xml" }}}

Your Java App needs some information in order to authenticate against your Auth0 account. The samples read this information from the deployment descriptor file `src/main/webapp/WEB-INF/web.xml`, but you could store them anywhere else.

This information will be used to configure the **auth0-java-mvc-commons** library to enable users to login to your application. To learn more about the library, including its various configuration options, see the <a href="https://github.com/auth0/auth0-java-mvc-common/blob/master/README.md" target="_blank" rel="noreferrer">library's documentation</a>.


::: panel Check populated attributes
If you downloaded this sample using the **Download Sample** button, the `domain`, `clientId` and `clientSecret` attributes will be populated for you. You should verify that the values are correct, especially if you have multiple Auth0 applications in your account.
:::

### Project structure

The example project, which can be downloaded using the **Download Sample** button, has the following structure:

```text
- src
-- main

---- java

------ com

-------- auth0

---------- example

------------ Auth0Filter.java

------------ AuthenticationControllerProvider.java

------------ HomeServlet.java

------------ CallbackServlet.java

------------ LoginServlet.java

------------ LogoutServlet.java

---- webapp

------ WEB-INF

-------- jsp

---------- home.jsp

-------- web.xml

- build.gradle

</code></pre>

</p><p>The project contains a single JSP: the <code>home.jsp</code> which will display the tokens associated with the user after a successful login and provide the option to logout.</p><p>The project contains a WebFilter: the <code>Auth0Filter.java</code> which will check for existing tokens before giving the user access to our protected <code>/portal/*</code> path. If the tokens don&#39;t exist, the request will be redirected to the <code>LoginServlet</code>.</p><p>The project contains also four servlets:</p><ul><li><p><code>LoginServlet.java</code>: Invoked when the user attempts to log in. The servlet uses the <code>client_id</code> and <code>domain</code> parameters to create a valid Authorize URL and redirects the user there.</p></li><li><p><code>CallbackServlet.java</code>: The servlet captures requests to our Callback URL and processes the data to obtain the credentials. After a successful login, the credentials are then saved to the request&#39;s HttpSession.</p></li><li><p><code>HomeServlet.java</code>: The servlet reads the previously saved tokens and shows them on the <code>home.jsp</code> resource.</p></li><li><p><code>LogoutServlet.java</code>: Invoked when the user clicks the logout link. The servlet invalidates the user session and redirects the user to the login page, handled by the <code>LoginServlet</code>.</p></li><li><p><code>AuthenticationControllerProvider.java</code>: Responsible to create and manage a single instance of the <code>AuthenticationController</code></p></li></ul><p></p>

## Create the AuthenticationController {{{ data-action="code" data-code="AuthenticationControllerProvider.java#5:26" }}}


<p>To enable users to authenticate, create an instance of the <code>AuthenticationController</code> provided by the <code>auth0-java-mvc-commons</code> SDK using the <code>domain</code>, <code>clientId</code>, and <code>clientSecret</code>. The sample shows how to configure the component for use with tokens signed using the RS256 asymmetric signing algorithm, by specifying a <code>JwkProvider</code> to fetch the public key used to verify the token&#39;s signature. See the <a href="https://github.com/auth0/jwks-rsa-java">jwks-rsa-java repository</a> to learn about additional configuration options. If you are using HS256, there is no need to configure the <code>JwkProvider</code>.</p><p><div class="alert-container" severity="default"><p>The <code>AuthenticationController</code> does not store any context, and is inteded to be reused. Unneccessary creation may result in additonal resources being created which could impact performance.</p></div></p>

## Login Redirection {{{ data-action="code" data-code="LoginServlet.java#21:23" }}}


<p>To enable users to log in, your application will redirect them to the <a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-en-US">Universal Login</a> page. Using the <code>AuthenticationController</code> instance, you can generate the redirect URL by calling the <code>buildAuthorizeUrl(HttpServletRequest request</code>, <code>HttpServletResponse response</code>, <code>String redirectUrl)</code> method. The redirect URL must be the URL that was added to the <b>Allowed Callback URLs</b> of your Auth0 application.</p>

## Handling the tokens {{{ data-action="code" data-code="CallbackServlet.java#16:37" }}}


<p>After the user logs in, the result will be received in our <code>CallbackServlet</code> via either a GET or POST HTTP request. Because we are using the Authorization Code Flow (the default), a GET request will be sent. If you have configured the library for the Implicit Flow, a POST request will be sent instead.</p><p>The request holds the call context that the library previously set by generating the Authorize URL with the <code>AuthenticationController</code>. When passed to the controller, you get back either a valid <code>Tokens</code> instance or an Exception indicating what went wrong. In the case of a successful call, you need to save the credentials somewhere to access them later. You can use the <code>HttpSession</code> of the request by using the <code>SessionsUtils</code> class included in the library.</p><p><div class="alert-container" severity="default"><p>It is recommended to store the time in which we requested the tokens and the received <code>expiresIn</code> value, so that the next time when we are going to use the token we can check if it has already expired or if it&#39;s still valid. For the sake of this sample, we will skip that validation.</p></div></p>

## Display the home page {{{ data-action="code" data-code="HomeServlet.java#4:14" }}}


<p>Now that the user is authenticated (the tokens exists), the <code>Auth0Filter</code> will allow them to access our protected resources. In the <code>HomeServlet</code> we obtain the tokens from the request&#39;s session and set them as the <code>userId</code> attribute so they can be used from the JSP code.</p>

## Handle logout {{{ data-action="code" data-code="LogoutServlet.java#13:30" }}}

To properly handle logout, we need to clear the session and log the user out of Auth0. This is handled in the `LogoutServlet` of our sample application.

First, we clear the session by calling `request.getSession().invalidate()`. We then construct the logout URL, being sure to include the `returnTo` query parameter, which is where the user will be redirected to after logging out. Finally, we redirect the response to our logout URL.

## Run the sample {{{ data-action=code data-code="LogoutServlet.java#13:30" }}}

To run the sample from a terminal, change the directory to the root folder of the project and execute the following line:

```bash
./gradlew clean appRun
```

After a few seconds, the application will be accessible on `http://localhost:3000/`. Try to access the protected resource <a href="http://localhost:3000/portal/home" target="_blank" rel="noreferrer">http://localhost:3000/portal/home</a> and note how you're redirected by the `Auth0Filter` to the Auth0 Login Page. The widget displays all the social and database connections that you have defined for this application in the <a href="${manage_url}/#/" target="_blank" rel="noreferrer">dashboard</a>.

![Auth0 Universal Login](/media/quickstarts/universal-login.png)

After a successful authentication, you'll be able to see the home page contents.

![Display Token](/media/articles/java/display-token.png)

Log out by clicking the **logout** button at the top right of the home page.
