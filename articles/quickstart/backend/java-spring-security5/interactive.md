---
title: Add Authorization to Your Spring Boot Application
description: This guide demonstrates how to integrate Auth0 with any new or existing Spring Boot application.
interactive:  true
files:
 - files/application
 - files/SecurityConfig
 - files/Message
 - files/APIController
github:
  path: 01-Authorization-MVC
locale: en-US
---

# Add Authorization to Your Spring Boot Application


<p>Auth0 allows you to quickly add authorization to your application. This guide demonstrates how to integrate Auth0 with any new or existing Spring Boot application.</p><p>If you have not created an API in your Auth0 dashboard yet, use the interactive selector to create a new Auth0 API or select an existing API that represents the project you want to integrate with.</p><p>Review <a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis" target="_blank" >our getting started guide</a> to set up your first API through the Auth0 dashboard.</p><p>Each Auth0 API uses the API Identifier, which your application needs to validate the access token.</p><p><div class="alert-container" severity="default"><p><b>New to Auth0?</b> Learn <a href="https://auth0.com/docs/overview" target="_blank" >how Auth0 works</a> and read about <a href="https://auth0.com/docs/api-auth" target="_blank" >implementing API authentication and authorization</a> using the OAuth 2.0 framework.</p></div></p><p></p>

## Define permissions


<p>Permissions let you define how resources can be accessed on behalf of the user with a given access token. For example, you might choose to grant read access to the <code>messages</code> resource if users have the manager access level, and a write access to that resource if they have the administrator access level.</p><p>You can define allowed permissions in the <b>Permissions</b> view of the Auth0 Dashboard&#39;s <a href="https://manage.auth0.com/dashboard/us/dev-1-2s2aq0/apis" target="_blank" rel="noreferrer noopener">APIs</a> section.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/e61793a2822d095666002c3f65c71ac2/configure-permissions.png" alt="Auth0 Dashboard> Applications > APIs > [Specific API] > Permissions tab" /><p><div class="alert-container" severity="default"><p>This example uses the <code>read:messages</code> scope.</p></div></p>

## Configure the sample project {{{ data-action="code" data-code="application.yml#1:6" }}}


<p>The sample project uses a <code>/src/main/resources/application.yml</code> file, which configures it to use the correct Auth0 <b>domain</b> and <b>API Identifier</b> for your API. If you download the code from this page it will be automatically configured. If you clone the example from GitHub, you will need to fill it in yourself.</p><p></p>

## Install dependencies {{{ data-action="code" data-code="application.yml#1:6" }}}


<p>If you are using Gradle, you can add the required dependencies using the <a href="https://docs.spring.io/spring-boot/docs/current/gradle-plugin/reference/html/" target="_blank" rel="noreferrer noopener">Spring Boot Gradle Plugin</a> and the <a href="https://docs.spring.io/dependency-management-plugin/docs/current/reference/html/" target="_blank" rel="noreferrer noopener">Dependency Management Plugin</a> to resolve dependency versions:</p><p><pre><code>// build.gradle



    plugins {

        id 'java'

        id 'org.springframework.boot'

        version '3.1.5'

        id 'io.spring.dependency-management'

        version '1.1.3'

    }



    dependencies {

        implementation 'org.springframework.boot:spring-boot-starter-web'

        implementation 'com.okta.spring:okta-spring-boot-starter:3.0.5'

    }

</code></pre>

</p><p>If you are using Maven, add the Spring dependencies to your <code>pom.xml</code> file:</p><p><pre><code class="language-xml">// pom.xml



&lt;parent&gt;

 &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;

 &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;

 &lt;version&gt;3.1.5&lt;/version&gt;

 &lt;relativePath/&gt;

&lt;/parent&gt;

&lt;dependencies&gt;

 &lt;dependency&gt;

 &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;

 &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;

 &lt;/dependency&gt;

 &lt;dependency&gt;

 &lt;groupId&gt;com.okta.spring&lt;/groupId&gt;

 &lt;artifactId&gt;okta-spring-boot-starter&lt;/artifactId&gt;

 &lt;version&gt;3.0.5&lt;/version&gt;

 &lt;/dependency&gt;

&lt;/dependencies&gt;

</code></pre>

</p>

## Configure the resource server {{{ data-action="code" data-code="SecurityConfig.java" }}}


<p>To configure the application as a Resource Server and validate the JWTs, create a class that will provide an instance of <code>SecurityFilterChain</code>, and add the <code>@Configuration</code> annotation.</p><h3>Protect API endpoints</h3><p>The routes shown below are available for the following requests:</p><ul><li><p><code>GET /api/public</code>: available for non-authenticated requests</p></li><li><p><code>GET /api/private</code>: available for authenticated requests containing an access token with no additional scopes</p></li><li><p><code>GET /api/private-scoped</code>: available for authenticated requests containing an access token with the <code>read:messages </code>scope granted</p></li></ul><p>The example below shows how to secure API methods using the <code>HttpSecurity</code> object provided in the <code>filterChain()</code> method of the <code>SecurityConfig</code> class. Route matchers restrict access based on the level of authorization required.</p><p><div class="alert-container" severity="default"><p>By default, Spring Security creates a <code>GrantedAuthority</code> for each scope in the <code>scope</code> claim of the JWT. This scope enables using the <code>hasAuthority(&quot;SCOPE_read:messages&quot;)</code> method to restrict access to a valid JWT that contains the <code>read:messages</code> scope.</p></div></p>

## Create the Domain Object {{{ data-action="code" data-code="Message.java#1:4" }}}


<p>To make your endpoint return a JSON, you can use a Java record. The member variables of this object is serialized into the key value for your JSON. Create a new record named <code>Message</code> as an example domain object to return during the API calls.</p>

## Create the API controller {{{ data-action="code" data-code="APIController.java" }}}


<p>Create a new class named <code>APIController</code> to handle requests to the endpoints. The <code>APIController</code> has three routes as defined in the <a href="https://auth0.com/docs/quickstart/backend/java-spring-security5/interactive#configure-the-resource-server" target="_blank" >Protect API Endpoints</a> section. For this example, allow all origins through <code>@CrossOrigin</code> annotation. Real applications should configure <code>CORS</code> for their use case.</p>

## Run the application {{{ data-action="code" data-code="APIController.java" }}}


<p>To build and run the sample project, execute the <code>bootRun</code> Gradle task.</p><p>Linux or macOS:</p><p><pre><code class="language-bash">./gradlew bootRun

</code></pre>

</p><p>Windows:</p><p><pre><code class="language-bash">gradlew.bat bootRun

</code></pre>

</p><p>If you are configuring your own application using Maven and the <a href="https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html" target="_blank" rel="noreferrer noopener">Spring Boot Maven Plugin</a>, you can execute the <code>spring-boot:run</code> goal.</p><p>Linux or macOS:</p><p><pre><code class="language-bash">mvn spring-boot:run

</code></pre>

</p><p>Windows:</p><p><pre><code class="language-bash">mvn.cmd spring-boot:run

</code></pre>

</p><p><code></code><div class="checkpoint">Spring Boot API Step 7 Checkpoint <div class="checkpoint-default"><p>The sample application will be available at <code>http://localhost:3010/</code>. Read about how to test and use your API in the <a href="https://auth0.com/docs/quickstart/backend/java-spring-security5/02-using" target="_blank" >Using Your API</a> article.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not launch successfully:</p><ul><li><p>Use the <a href="https://auth0.com/docs/quickstart/backend/java-spring-security5/03-troubleshooting" target="_blank" >Troubleshooting</a> section to check your configuration.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>
