---
title: Add Login to your Spring Web Application
description: This guide demonstrates how to integrate Auth0 with a Spring Boot application using the Auth0 Spring Boot SDK.
interactive:  true
files:
 - files/application
 - files/SecurityConfig
 - files/index
 - files/HomeController
 - files/SecurityConfigWithLogout
github:
  path: mvc-login
locale: en-US
---

# Add Login to your Spring Web Application


<p><div class="alert-container" severity="default"><h3>Using Spring WebFlux? </h3><p>This tutorial uses <a href="https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html" target="_blank" rel="noreferrer noopener">Spring MVC</a>. If you are using <a href="https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html#spring-web-reactive" target="_blank" rel="noreferrer noopener">Spring WebFlux</a>, the steps to add authentication are similar, but some implementation details are different. Refer to the <a href="https://github.com/auth0-samples/auth0-spring-boot-login-samples/tree/master/webflux-login" target="_blank" rel="noreferrer noopener">Spring Boot WebFlux Sample Code</a> to see how to integrate Auth0 with your Spring Boot WebFlux application.</p></div></p><p></p>

## Configure Auth0


<p>To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to</p><p><code>http://localhost:3000/login/oauth2/code/okta</code>.</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to </p><p><code>http://localhost:3000</code>.</p><p></p></div></p>

## Configure Sprint Boot application


<h3>Add Spring dependencies</h3><p>To integrate your Spring Boot application with Auth0, include the <a href="https://github.com/okta/okta-spring-boot/" target="_blank" rel="noreferrer noopener">Okta Spring Boot Starter</a> in your application&#39;s dependencies.</p><p><div class="alert-container" severity="default"><p>This guide uses <a href="https://www.thymeleaf.org/" target="_blank" rel="noreferrer noopener">Thymeleaf</a> and the <a href="https://github.com/thymeleaf/thymeleaf-extras-springsecurity" target="_blank" rel="noreferrer noopener">Spring Security integration module</a> for the view layer. If you are using a different view technology, the Spring Security configuration and components remain the same.</p></div></p><p>If you&#39;re using Gradle, you can include these dependencies as shown below.</p><p><pre><code class="language-javascript">plugins {

 id 'java'

 id 'org.springframework.boot' version '3.1.4'

 id 'io.spring.dependency-management' version '1.1.3'

}



implementation 'com.okta.spring:okta-spring-boot-starter:3.0.5'

implementation 'org.springframework.boot:spring-boot-starter-web'

implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'

implementation 'org.thymeleaf.extras:thymeleaf-extras-springsecurity6'

implementation 'nz.net.ultraq.thymeleaf:thymeleaf-layout-dialect'

</code></pre>

</p><p>If you are using Maven:</p><p><pre><code class="language-xml">&lt;parent&gt;

 &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;

 &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;

 &lt;version&gt;3.1.4&lt;/version&gt;

 &lt;relativePath/&gt;

&lt;/parent&gt;



&lt;dependencies&gt;

 &lt;dependency&gt;

&lt;groupId&gt;com.okta&lt;/groupId&gt;

&lt;artifactId&gt;okta-spring-boot-starter&lt;/artifactId&gt;

&lt;version&gt;3.0.5&lt;/version&gt;

 &lt;/dependency&gt;

 &lt;dependency&gt;

&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;

&lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;

 &lt;/dependency&gt;

 &lt;dependency&gt;

&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;

&lt;artifactId&gt;spring-boot-starter-oauth2-client&lt;/artifactId&gt;

 &lt;/dependency&gt;

 &lt;dependency&gt;

&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;

&lt;artifactId&gt;spring-boot-starter-thymeleaf&lt;/artifactId&gt;

 &lt;/dependency&gt;

 &lt;dependency&gt;

&lt;groupId&gt;org.thymeleaf.extras&lt;/groupId&gt;

&lt;artifactId&gt;thymeleaf-extras-springsecurity6&lt;/artifactId&gt;

 &lt;/dependency&gt;

 &lt;dependency&gt;

&lt;groupId&gt;nz.net.ultraq.thymeleaf&lt;/groupId&gt;

&lt;artifactId&gt;thymeleaf-layout-dialect&lt;/artifactId&gt;

 &lt;/dependency&gt;

&lt;/dependencies&gt;

</code></pre>

</p>

## Configure Spring Security {{{ data-action="code" data-code="application.yml" }}}


<p>The Okta Spring Boot Starter makes it easy to configure your application with Auth0. The sample below uses an <code>application.yml</code> file, though you can also use properties files or any of the other <a href="https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-external-config" target="_blank" rel="noreferrer noopener">supported externalization mechanisms</a>.</p><p><pre><code>#src/main/resources/application.yml



okta:

  oauth2:

    issuer: https://${account.namespace}/

    client-id: ${account.clientId}

    client-secret: ${account.clientSecret}



#The sample and instructions above for the callback and logout URL configuration use port 3000.

#If you wish to use a different port, change this and be sure your callback and logout URLs are

#configured with the correct port.

server:

  port: 3000

</code></pre>

</p>

## Add login to your application {{{ data-action="code" data-code="SecurityConfig.java" }}}


<p>To enable user login with Auth0, create a class that will register a <a href="https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/SecurityFilterChain.html" target="_blank" rel="noreferrer noopener">SecurityFilterChain</a>, and add the <code>@Configuration</code> annotation.</p><p><div class="alert-container" severity="default"><p>You can configure the <a href="https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html" target="_blank" rel="noreferrer noopener">HttpSecurity</a> instance to require authentication on all or certain paths. For example, to require authentication on all paths except the home page:</p></div></p><p><pre><code class="language-java">http.authorizeHttpRequests(authorize -&gt; authorize

        .requestMatchers(&quot;/&quot;).permitAll()

        .anyRequest().authenticated()

    );

</code></pre>

</p>

## Add front page {{{ data-action="code" data-code="index.html" }}}


<p>The Okta Spring Boot Starter will use the client configuration you defined earlier to handle login when a user visits the <code>/oauth2/authorization/okta</code> path of your application. You can use this to create a login link in your application.</p><p>This page returns the user attributes when the user authentications. You will use the <code>/logout</code> link in the template to implement the logout feature.</p>

## Add controller {{{ data-action="code" data-code="HomeController.java" }}}


<p>Create a controller to handle the incoming request. This controller renders the <code>index.html</code> page. When the user authenticates, the application retrieves the users&#39;s profile information attributes to render the page.</p><p><div class="checkpoint">spring boot step 6 checkpoint <div class="checkpoint-default"><p>When you click the login link, verify the application redirects you to the <a href="https://auth0.com/universal-login" target="_blank" >Auth0 Universal Login</a> page and that you can now log in or sign up using a username and password or a social provider.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p><img src="//images.ctfassets.net/cdy7uua7fh8z/7L6lZ6xCi1L7sJBFZUPb9g/b7697bfa1bc83a1072c2de2f15cec93c/Login_Screen_-_English.png" alt="" /><p><div class="alert-container" severity="default"><p>Auth0 enables the Google social provider by default on new tenants and offers you developer keys to test logging in with <a href="https://auth0.com/docs/connections/identity-providers-social" target="_blank" >social identity providers</a>. However, these developer keys have some limitations that may cause your application to behave differently. For more details on what this behavior may look like and how to fix it, consult the <a href="https://auth0.com/docs/connections/social/devkeys#limitations-of-developer-keys" target="_blank" >Test Social Connections with Auth0 Developer Keys</a> document.</p></div></p>

## Add logout to your application {{{ data-action="code" data-code="SecurityConfigWithLogout.java" }}}


<p>Now that users can log into your application, they need <a href="https://auth0.com/docs/logout/guides/logout-auth0" target="_blank" >a way to log out</a>. By default, when logout is enabled, Spring Security will log the user out of your application and clear the session. To enable successful logout of Auth0, you can provide a <code>LogoutHandler</code> to redirect users to your <a href="https://auth0.com/docs/api/authentication?javascript#logout" target="_blank" >Auth0 logout endpoint</a> (<code>https://{yourDomain}/v2/logout</code>) and then immediately redirect them to your application.</p><p>In the <code>SecurityConfig</code> class, provide a <code>LogoutHandler</code> that redirects to the Auth0 logout endpoint, and configure the <code>HttpSecurity</code> to add the logout handler</p><p><div class="checkpoint">spring boot step 7 checkpoint <div class="checkpoint-default"><p>When you click logout link, the application should redirect you to the address you specified as one of the &quot;Allowed Logout URLs&quot; in the &quot;Settings&quot; and you are no longer logged in to your application.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>
