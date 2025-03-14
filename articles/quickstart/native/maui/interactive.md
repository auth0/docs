---
title: Add Login to Your MAUI Application
description: This tutorial demonstrates how to add user login with Auth0 to a .NET MAUI application.
interactive:  true
files:
 - files/MainPage.xaml
github:
  path: https://github.com/auth0-samples/auth0-maui-samples/tree/master/Sample
locale: en-US
---

# Add Login to Your MAUI Application


<p>Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any .NET MAUI application using the Auth0 SDKs for <a href="https://www.nuget.org/packages/Auth0.OidcClient.MAUI/">MAUI</a>.</p><p><div class="alert-container" severity="default"><p>The MAUI SDK supports Android, iOS, macOS, and Windows. Continue reading for platform-specific configuration.</p></div></p><p></p>

## Configure Auth0


<p>To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/#/">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>myapp://callback</code>.</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>myapp://callback</code>.</p></div></p>

## Install the Auth0 SDK


<p>Auth0 provides a <a href="https://www.nuget.org/packages/Auth0.OidcClient.MAUI/">MAUI</a> SDK to simplify the process of implementing Auth0 authentication in MAUI applications.</p><p>Use the NuGet Package Manager (Tools -&gt; Library Package Manager -&gt; Package Manager Console) to install the <code>Auth0.OidcClient.MAUI</code> package.</p><p>Alternatively, you can use the NuGet Package Manager Console (<code>Install-Package</code>) or the <code>dotnet</code> CLI (<code>dotnet add</code>).</p><p><pre><code>Install-Package Auth0.OidcClient.MAUI

</code></pre>

</p><p><pre><code>dotnet add package Auth0.OidcClient.MAUI

</code></pre>

</p>

## Platform specific configuration


<p>You need some platform-specific configuration to use the SDK with Android and Windows.</p><h3>Android</h3><p>Create a new Activity that extends <code>WebAuthenticatorCallbackActivity</code>:</p><p><pre><code class="language-csharp">[Activity(NoHistory = true, LaunchMode = LaunchMode.SingleTop, Exported = true)]

[IntentFilter(new[] { Intent.ActionView },

              Categories = new[] { Intent.CategoryDefault, Intent.CategoryBrowsable },

              DataScheme = CALLBACK_SCHEME)]

public class WebAuthenticatorActivity : Microsoft.Maui.Authentication.WebAuthenticatorCallbackActivity

{

    const string CALLBACK_SCHEME = &quot;myapp&quot;;

}

</code></pre>

</p><p>The above activity will ensure the application can handle the <code>myapp://callback</code> URL when Auth0 redirects back to the Android application after logging in.</p><h3>Windows</h3><p>To make sure it can properly reactivate your application after being redirected back to Auth0, you need to do two things:</p><ul><li><p>Add the corresponding protocol to the <code>Package.appxmanifest</code>. In this case, this is set to <code>myapp</code>, but you can change this to whatever you like (ensure to update all relevant Auth0 URLs as well).</p></li></ul><p><pre><code class="language-xml">&lt;Applications&gt;

  &lt;Application Id=&quot;App&quot; Executable=&quot;$targetnametoken$.exe&quot; EntryPoint=&quot;$targetentrypoint$&quot;&gt;

    &lt;Extensions&gt;

      &lt;uap:Extension Category=&quot;windows.protocol&quot;&gt;

        &lt;uap:Protocol Name=&quot;myapp&quot;/&gt;

      &lt;/uap:Extension&gt;

    &lt;/Extensions&gt;

  &lt;/Application&gt;

&lt;/Applications&gt;

</code></pre>

</p><ul><li><p>Call <code>Activator.Default.CheckRedirectionActivation()</code> in the Windows-specific <code>App.xaml.cs</code> file.</p></li></ul><p><pre><code class="language-csharp">public App()

{

  if (Auth0.OidcClient.Platforms.Windows.Activator.Default.CheckRedirectionActivation())

    return;



  this.InitializeComponent();

}

</code></pre>

</p>

## Instantiate the Auth0Client {{{ data-action="code" data-code="MainPage.xaml.cs#3:10" }}}


<p>To integrate Auth0 into your application, instantiate an instance of the <code>Auth0Client</code> class, passing an instance of <code>Auth0ClientOptions</code> that contains your Auth0 Domain, Client ID and the required Scopes. Additionally, you also need to configure the <code>RedirectUri</code> and <code>PostLogoutRedirectUri</code> to ensure Auth0 can redirect back to the application using the URL(s) configured.</p><p><pre><code class="language-csharp">using Auth0.OidcClient;



var client = new Auth0Client(new Auth0ClientOptions

{

    Domain = &quot;${account.namespace}&quot;,

    ClientId = &quot;${account.clientId}&quot;,

    RedirectUri = &quot;myapp://callback&quot;,

    PostLogoutRedirectUri = &quot;myapp://callback&quot;,

    Scope = &quot;openid profile email&quot;

});

</code></pre>

</p><p>By default, the SDK will leverage Chrome Custom Tabs for Android, ASWebAuthenticationSession for iOS and macOS and use your system&#39;s default browser on Windows.</p><p><div class="checkpoint">MAUI Quickstart - Step 4 Checkpoint <div class="checkpoint-default"><p>Your <code>Auth0Client</code> should now be properly instantiated. Run your application to verify that:</p><ul><li><p>The <code>Auth0Client </code>is instantiated correctly in the <code>MainPage</code>.</p></li><li><p>Your application is not throwing any errors related to Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>make sure the domain and client ID are imported correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Add login to your application {{{ data-action="code" data-code="MainPage.xaml.cs#25:25" }}}


<p>Now that you have configured your Auth0 Application and the Auth0 SDK, you need to set up login for your project. To do this, you will use the SDK’s <code>LoginAsync()</code> method to create a login button that redirects users to the Auth0 Universal Login page.</p><p><pre><code class="language-csharp">var loginResult = await client.LoginAsync();

</code></pre>

</p><p>If there isn&#39;t any error, you can access the <code>User</code>, <code>IdentityToken</code>, <code>AccessToken</code> and <code>RefreshToken</code> on the <code>LoginResult</code> returned from <code>LoginAsync()</code>.</p><p><div class="checkpoint">MAUI Quickstart - Step 5 Checkpoint <div class="checkpoint-default"><p>You should now be able to log in or sign up using a username and password.</p><p>Click the login button and verify that:</p><ul><li><p>Your application redirects you to the Auth0 Universal Login page.</p></li><li><p>You can log in or sign up.</p></li><li><p>Auth0 redirects you to your application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s something to double-check:</p><ul><li><p>you called <code>LoginAsync</code> as expected</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Add logout to your application {{{ data-action="code" data-code="MainPage.xaml.cs#32:32" }}}


<p>Users who log in to your project will also need a way to log out. Create a logout button using the SDK’s <code>LogoutAsync()</code> method. When users log out, they will be redirected to your Auth0 logout endpoint, which will then immediately redirect them back to the logout URL you set up earlier in this quickstart.</p><p><pre><code class="language-csharp">await client.LogoutAsync();

</code></pre>

</p><p><div class="checkpoint">MAUI Quickstart - Step 6 Checkpoint <div class="checkpoint-default"><p>Run your application and click the logout button, verify that:</p><ul><li><p>Your application redirects you to the address you specified as one of the Allowed Logout URLs in your Application Settings.</p></li><li><p>You are no longer logged in to your application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>you configured the correct Logout URL</p></li><li><p>you called <code>LogoutAsync</code> as expected.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Show user profile information {{{ data-action="code" data-code="MainPage.xaml.cs#55:58" }}}


<p>Now that your users can log in and log out, you will likely want to be able to retrieve the <a href="https://auth0.com/docs/users/concepts/overview-user-profile">profile information</a> associated with authenticated users. For example, you may want to be able to display a logged-in user’s name or profile picture in your project.</p><p>The Auth0 SDK for MAUI provides user information through the <code>LoginResult.User</code> property.</p>
