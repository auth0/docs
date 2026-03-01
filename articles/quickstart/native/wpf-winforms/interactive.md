---
title: Add Login to Your WPF or WinForms Application
description: This tutorial demonstrates how to add user login with Auth0 to a WPF and WinForms application.
interactive:  true
files:
 - files/MainWindow.xaml
github:
  path: Quickstart/00-Starter-Seed
locale: en-US
---

# Add Login to Your WPF or WinForms Application


<p>Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any WPF and WinForms application using the Auth0 SDKs for <a href="https://www.nuget.org/packages/Auth0.OidcClient.WPF/" target="_blank" rel="noreferrer noopener">WPF</a> and <a href="https://www.nuget.org/packages/Auth0.OidcClient.WinForms" target="_blank" rel="noreferrer noopener">WinForms</a>.</p><p>To use this quickstart, you’ll need to:</p><ul><li><p>Sign up for a free Auth0 account or log in to Auth0.</p></li><li><p>Have a working WPF or WinForms project that you want to integrate with. Alternatively, you can view or download a sample application after logging in.</p></li></ul><p></p><p></p>

## Configure Auth0


<p>To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://{yourDomain}:4200/mobile</code>.</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://{yourDomain}:4200/mobile</code>.</p></div></p>

## Install the Auth0 SDK


<p>Auth0 provides a <a href="https://www.nuget.org/packages/Auth0.OidcClient.WPF/" target="_blank" rel="noreferrer noopener">WPF</a> and <a href="https://www.nuget.org/packages/Auth0.OidcClient.WinForms" target="_blank" rel="noreferrer noopener">WinForms</a> SDK to simplify the process of implementing Auth0 authentication in WPF and WinForms applications.</p><p>Use the NuGet Package Manager (Tools -&gt; Library Package Manager -&gt; Package Manager Console) to install the <code>Auth0.OidcClient.WPF</code> or <code>Auth0.OidcClient.WinForms</code> package, depending on whether you are building a WPF or Windows Forms application.</p><p>Alternatively, you can use the NuGet Package Manager Console (<code>Install-Package</code>) or the <code>dotnet</code> CLI (<code>dotnet add</code>).</p><p><pre><code>Install-Package Auth0.OidcClient.WPF

Install-Package Auth0.OidcClient.WinForms

</code></pre>

</p><p><pre><code>dotnet add Auth0.OidcClient.WPF

dotnet add Auth0.OidcClient.WinForms

</code></pre>

</p>

## Instantiate the Auth0Client {{{ data-action="code" data-code="MainWindow.xaml.cs#13:22" }}}


<p>To integrate Auth0 into your application, instantiate an instance of the Auth0Client class, passing an instance of Auth0ClientOptions that contains your Auth0 Domain and Client ID.</p><p>By default, the SDK will leverage <a href="https://learn.microsoft.com/en-us/microsoft-edge/webview2/" target="_blank" rel="noreferrer noopener">WebView2</a> for .NET6 and above, while relying on the older WebView on applications using any version that predates .NET6.</p><p><div class="checkpoint">WPF/WinForms Quickstart - Step 3 Checkpoint <div class="checkpoint-default"><p>Your <code>Auth0Client</code> should now be properly instantiated. Run your application to verify that:</p><ul><li><p>The <code>Auth0Client </code>is instantiated correctly.</p></li><li><p>Your application is not throwing any errors related to Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>make sure the domain and client ID are imported correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Add login to your application {{{ data-action="code" data-code="MainWindow.xaml.cs#24:35" }}}


<p>Now that you have configured your Auth0 Application and the Auth0 SDK, you need to set up login for your project. To do this, you will use the SDK’s <code>LoginAsync()</code> method to create a login button that redirects users to the Auth0 Universal Login page. After a user successfully authenticates, they will be redirected to the callback URL you set up earlier in this quickstart.</p><p>If there isn&#39;t any error, you can access the <code>User</code>, <code>IdentityToken</code>, <code>AccessToken</code> and <code>RefreshToken</code> on the <code>LoginResult</code> returned from <code>LoginAsync()</code>.</p><p><div class="checkpoint">WPF/WinForms Quickstart - Step 4 Checkpoint <div class="checkpoint-default"><p>You should now be able to log in or sign up using a username and password.</p><p>Click the login button and verify that:</p><ul><li><p>Your WPF or WinForms Application redirects you to the Auth0 Universal Login page.</p></li><li><p>You can log in or sign up.</p></li><li><p>Auth0 redirects you to your application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s something to double-check:</p><ul><li><p>you called <code>LoginAsync</code> as expected</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Add logout to your application {{{ data-action="code" data-code="MainWindow.xaml.cs#37:40" }}}


<p>Users who log in to your project will also need a way to log out. Create a logout button using the SDK’s <code>LogoutAsync()</code> method. When users log out, they will be redirected to your Auth0 logout endpoint, which will then immediately redirect them back to the logout URL you set up earlier in this quickstart.</p><p><div class="checkpoint">WPF/WinForms Quickstart - Step 5 Checkpoint <div class="checkpoint-default"><p>Run your application and click the logout button, verify that:</p><ul><li><p>Your WPF or WinForms application redirects you to the address you specified as one of the Allowed Logout URLs in your Application Settings.</p></li><li><p>You are no longer logged in to your application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>you configured the correct Logout URL</p></li><li><p>you called <code>LogoutAsync</code> as expected.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Show user profile information {{{ data-action="code" data-code="MainWindow.xaml.cs#30:33" }}}


<p>Now that your users can log in and log out, you will likely want to be able to retrieve the <a data-contentfulid="2ClGWANGeRoTkg5Ax2gOVK-en-US">profile information</a> associated with authenticated users. For example, you may want to display a logged-in user’s name or profile picture in your project.</p><p>The Auth0 SDK for WPF and WinForms provides user information through the <code>LoginResult.User</code> property.</p><p><div class="checkpoint">WPF/WinForms Quickstart - Step 6 Checkpoint <div class="checkpoint-default"><p>Verify that you can display the user&#39;s name or other user property after logging in. </p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>the <code>LoginResult.IsError</code> is false</p></li><li><p>if the <code>LoginResult.IsError</code> isn&#39;t false, be sure to check <code>LoginResult.Error</code> for details.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>
