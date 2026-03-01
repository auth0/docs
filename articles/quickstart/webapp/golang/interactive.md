---
title: Add Login to your Go Application
description: This guide demonstrates how to integrate Auth0 with any new or existing Go web application.
interactive:  true
files:
 - files/auth
 - files/callback
 - files/env
 - files/go
 - files/isAuthenticated
 - files/login
 - files/logout
 - files/main
 - files/router
 - files/user
github:
  path: 01-Login
locale: en-US
---

# Add Login to your Go Application


<p>Auth0 allows you to add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with any new or existing Go web application.</p><p></p>

## Configure Auth0


<p>To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/dashboard/us/auth0-dsepaid/" target="_blank" rel="noreferrer noopener">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000/callback</code>.</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000</code>.</p></div></p>

## Install dependencies {{{ data-action="code" data-code="go.mod" }}}


<p>Create a <code>go.mod</code> file to list all the dependencies in your application.</p><p>To integrate Auth0 in a Go application, add the <code>coreos/go-oidc/v3</code> and <code>x/oauth2</code> packages.</p><p>In addition to the OIDC and OAuth2 packages, add <code>joho/godotenv</code>, <code>gin-gonic/gin</code>, and <code>gin-contrib/sessions</code>.</p><p><div class="alert-container" severity="default"><p>This example uses <code>gin</code> for routing, but you can use whichever router you want.</p></div></p><p>Save the <code>go.mod</code> file with the necessary dependencies and install them using the following command in your terminal:</p><p><pre><code>go mod download

</code></pre>

</p>

## Configure the environment variables {{{ data-action="code" data-code=".env" }}}


<p>You must set the following environment variables in <code>.env</code> within the root of your project directory:</p><ul><li><p><b>AUTH0_DOMAIN</b>: The domain of your Auth0 tenant. Find your Auth0 Domain in the Auth0 Dashboard under your Application&#39;s Settings in the Domain field. For custom domains, set this to the value of your <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-en-US">custom domain</a> instead.</p></li><li><p><b>AUTH0_CLIENT_ID</b>: The ID of the Auth0 Application you set up earlier in this quickstart. Find this in the Auth0 Dashboard under your Application&#39;s Settings in the Client ID field.</p></li><li><p><b>AUTH0_CLIENT_SECRET</b>: The Secret of the Auth0 Application you set up earlier in this quickstart. Find this in the Auth0 Dashboard under your Application&#39;s Settings in the Client Secret field.</p></li><li><p><b>AUTH0_CALLBACK_URL</b>: The URL used by Auth0 to redirect the user after successful authentication.</p></li></ul><p></p>

## Configure OAuth2 and OpenID Connect packages {{{ data-action="code" data-code="auth.go" }}}


<p>Next, configure the OAuth2 and OpenID Connect packages.</p><p>Create a file called <code>auth.go</code> in the <code>platform/authenticator</code> folder. In this package, create a method to configure and return <a href="https://godoc.org/golang.org/x/oauth2" target="_blank" rel="noreferrer noopener">OAuth2</a> and <a href="https://godoc.org/github.com/coreos/go-oidc" target="_blank" rel="noreferrer noopener">OIDC</a> clients, and another one to verify an ID Token.</p>

## Set up your application routes {{{ data-action="code" data-code="router.go" }}}


<p>Create a file called <code>router.go</code> in the <code>platform/router</code> folder. In this package, create a method to configure and return our routes using <a href="https://github.com/gin-gonic/gin" target="_blank" rel="noreferrer noopener">github.com/gin-gonic/gin</a>. You will be passing an instance of <code>Authenticator</code> to the method, for use with the <code>login</code> and <code>callback</code> handlers.</p><p></p>

## Add login to your application {{{ data-action="code" data-code="login.go" }}}


<p>For the user to authenticate themselves, we need to create a handler function to handle the <code>/login</code> route.</p><p>Create a file called <code>login.go</code> in the <code>web/app/login</code> folder, and add a <code>Handler</code> function. Upon executing the handler, the user will be redirected to Auth0 where they can enter their credentials.</p><p>To call the <code>/login</code> route, add a link to <code>/login</code> in the <code>home.html</code> template located in the <code>web/template</code> directory.</p><p></p>

## Handle authentication callback {{{ data-action="code" data-code="callback.go" }}}


<p>Once users have authenticated using Auth0&#39;s Universal Login Page, they will return to the app at the <code>/callback</code> route.</p><p>Create a file called <code>callback.go</code> in the <code>web/app/callback</code> folder, and add a <code>Handler</code> function.</p><p>This handler will take the <code>code</code> query string, provided by Auth0, and exchange it for an ID token and an access token.</p><p>If the ID token is valid, it will store the profile information and access token in the session. The profile information is based on the claims contained in the ID token. Session storage allows the application to access that information as needed.</p>

## Display user profile information {{{ data-action="code" data-code="user.go" }}}


<p>Now that your users can log in, you will likely want to be able to retrieve and use the <a data-contentfulid="2ClGWANGeRoTkg5Ax2gOVK-en-US">profile information</a> associated with authenticated users.</p><p>You can access that profile information, such as their nickname or profile picture, through the <code>profile</code> that was stored in the session previously.</p><p>Create a handler for the <code>/user</code> endpoint in <code>web/app/user/user.go</code> and return the corresponding HTML file. As the <code>profile</code> is being passed to <code>ctx.HTML()</code>, you can access the profile information such as <code>picture</code> and <code>nickname</code> inside that same HTML file.</p><p>An example of such an HTML file could look like the example below, but you can retrieve any profile information, including custom claims.</p><p></p>

## Add logout to your application {{{ data-action="code" data-code="logout.go" }}}


<p>To log the user out, clear the data from the session and redirect the user to the Auth0 logout endpoint. You can find more information about this in the <a href="https://auth0.com/docs/logout" target="_blank" >logout documentation</a>.</p><p>Create a file called <code>logout.go</code> in the folder <code>web/app/logout</code>, and add the function <code>Handler</code> to redirect the user to Auth0&#39;s logout endpoint.</p><p>The <code>returnTo</code> URL needs to be in the list of Allowed Logout URLs in the settings section of the application, For more information, see <a href="https://auth0.com/docs/logout/guides/redirect-users-after-logout" target="_blank" >Redirect Users After Logout</a>.</p><p>Create a file called <code>user.js</code> in the folder <code>web/static/js</code>, and add the code to remove the cookie from a logged-in user.</p><p></p><p></p>

## Protect routes {{{ data-action="code" data-code="isAuthenticated.go" }}}


<p>Recommended practice dictates certain routes are accessible only to authenticated users. When unauthenticated users try accessing protected routes, your application should redirect them.</p><p>In this case, you will implement middleware to hook into the HTTP request. The middleware function determines if the request should route to the endpoint handler or block the request.</p><p>Create a file called <code>isAuthenticated.go</code> in <code>platform/middleware</code> and add a function that checks if the user is authenticated or not based on the <code>profile</code> session key. If the user is not authenticated, the middleware will redirect the user to the root of the application.</p><p>With the middleware created, we can set it up for any route that needs authentication by adding it to the router.</p><p></p>

## Serve your application {{{ data-action="code" data-code="main.go" }}}


<p>With both the authenticator and router configured, we can wire things up using our application&#39;s entry point. Inside <code>main.go</code>, create an instance of the authenticator and the router, which gets passed the authenticator instance.</p><p>If you are using a <code>.env</code> file, you must call <code>godotenv.Load()</code> at the very beginning of the <code>main()</code> function.</p><p>Serve your application by using the following command in your terminal:</p><p><code>go run main.go</code></p>
