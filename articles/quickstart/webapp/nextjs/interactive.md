---
title: Add Login to Your Next.js Application
description: This guide demonstrates how to integrate Auth0 with any new or existing Next.js application using the Auth0 Next.js v4 SDK (Beta).
interactive:  true
files:
 - files/.env
 - files/src/lib/auth0
 - files/src/middleware
 - files/src/app/page
github:
  path: Sample-01
locale: en-US
---

# Add Login to Your Next.js Application


<p>This guide demonstrates how to integrate Auth0 with any new or existing Next.js application using the Auth0 Next.js v4 SDK. We recommend that you log in to follow this quickstart with examples configured for your account.</p><p></p>

## Configure Auth0


<p>To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000/auth/callback</code>.</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000</code>.</p><p></p></div></p>

## Install the Auth0 Next.js v4 SDK


<p>Run the following command within your project directory to install the Auth0 Next.js SDK:</p><p><code>npm i @auth0/nextjs-auth0</code></p><p>The SDK exposes methods and variables that help you integrate Auth0 with your Next.js application using <a href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers" target="_blank" rel="noreferrer noopener">Route Handlers</a> on the backend and <a href="https://reactjs.org/docs/context.html" target="_blank" rel="noreferrer noopener">React Context</a> with <a href="https://reactjs.org/docs/hooks-overview.html" target="_blank" rel="noreferrer noopener">React Hooks</a> on the frontend.</p>

## Configure the SDK {{{ data-action="code" data-code=".env.local" }}}


<p>In the root directory of your project, add the file .<code>env.local</code> with the following <a href="https://nextjs.org/docs/app/guides/environment-variables" target="_blank" rel="noreferrer noopener">environment variables</a>:</p><ul><li><p><code>AUTH0_SECRET</code>: A long secret value used to encrypt the session cookie. You can generate a suitable string using <code>openssl rand -hex 32 </code>on the command line.</p></li><li><p><code>APP_BASE_URL</code>: The base URL of your application.</p></li><li><p><code>AUTH0_DOMAIN</code>: The URL of your Auth0 tenant domain. If you are using a <a href="https://auth0.com/docs/custom-domains" target="_blank" >Custom Domain with Auth0</a>, set this to the value of your Custom Domain instead of the value reflected in the &quot;Settings&quot; tab.</p></li><li><p><code>AUTH0_CLIENT_ID</code>: Your Auth0 application&#39;s Client ID.</p></li><li><p><code>AUTH0_CLIENT_SECRET</code>: Your Auth0 application&#39;s Client Secret.</p></li></ul><p>The SDK will read these values from the Node.js process environment and automatically configure itself.</p>

## Create the Auth0 SDK Client {{{ data-action="code" data-code="src/lib/auth0.ts" }}}


<p>Create a file at <code>src/lib</code><code>/</code><code>auth0.ts</code>. This file provides methods for handling authentication, sessions and user data.</p><p>Then, import the <code>Auth0Client</code> class from the SDK to create an instance and export it as <code>auth0</code>. This instance is used in your app to interact with Auth0.</p><p></p>

## Add the Authentication Middleware {{{ data-action="code" data-code="src/middleware.ts" }}}


<p><div class="alert-container" severity="default"><p>The Next.js Middleware allows you to run code before a request is completed.</p></div></p><p>Create a file at <code>src/middleware.ts</code>. This file is used to enforce authentication on specific routes.</p><p>The <code>middleware</code> function intercepts incoming requests and applies Auth0&#39;s authentication logic. The <code>matcher</code> configuration ensures that the middleware runs on all routes except for static files and metadata.</p><p></p>

## Add the Landing Page Content {{{ data-action="code" data-code="src/app/page.tsx" }}}


<p>The Landing page <code>src/app/page.tsx</code> is where users interact with your app. It displays different content based on whether the users is logged in or not.</p><p>Edit the file <code>src/app/page.tsx</code> to add the <code>auth0.getSession()</code> method to determine if the user is logged in by retrieving the user session.</p><p>If there is no user session, the method returns <code>null</code> and the app displays the <b>Sign up</b> or <b>Log in</b> buttons. If a user sessions exists, the app displays a welcome message with the user&#39;s name and a <b>Log out</b> button.</p><p><div class="alert-container" severity="default"><p>The Logout functionality is already included in the file <code>src/app/page.tsx</code>. When the user selects the <b>Log out</b> button, they are redirected to the Auth0 logout endpoint, which clears their session and redirects back to your app.</p></div></p>

## Run Your Application


<p>Run this command to start your Next.js development server:</p><p><code>npm run dev</code></p><p>Visit the url <code>http://localhost:3000</code> in your browser.</p><p>You will see:</p><ul><li><p>A <b>Sign up </b>and <b>Log in </b>button if the user is not authenticated.</p></li><li><p>A welcome message and a <b>Log out </b>button if the user is authenticated.</p></li></ul><p><div class="checkpoint">Checkpoint <div class="checkpoint-default"><p>Run Your application.</p><ul><li><p>Verify that your Next.js application redirects you to the <a href="https://auth0.com/universal-login" target="_blank" >Auth0 Universal Login</a> page and that you can now log in or sign up using a username and password or a social provider.</p></li><li><p>Once that&#39;s complete, verify that Auth0 redirects back to your application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple of things to double check:</p><ul><li><p>are your environment variables populated correctly?</p></li><li><p>make sure that &quot;Allowed Callback URLs&quot; is configured correctly in your tenant</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p><img src="//images.ctfassets.net/cdy7uua7fh8z/5Lp4Zahxd2v6wSJmy9JaM4/8625115fc5b27b7f6f4adf9003c30b3a/Login_Screen_-_English.png" alt="" /><p></p>
