---
title: Add Login to Your .NET Android and iOS Application
description: This tutorial demonstrates how to add user login with Auth0 to a .NET Android or iOS application.
interactive:  true
files:
 - files/MainActivity
 - files/AppDelegate
 - files/MyViewController
github:
  path: https://github.com/auth0-samples/auth0-xamarin-oidc-samples/tree/master/Quickstart/01-Login
locale: en-US
---

# Add Login to Your .NET Android and iOS Application


<p>Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any .NET Android and iOS application using the Auth0 SDKs for <a href="https://www.nuget.org/packages/Auth0.OidcClient.AndroidX/">Android</a> and <a href="https://www.nuget.org/packages/Auth0.OidcClient.iOS">iOS</a>.</p><p><div class="alert-container" severity="default"><p>This quickstart focuses on .NET Android and iOS, as they are the next generation of <code>Xamarin.Android</code> and <code>Xamarin.iOS</code>. If you are still using <code>Xamarin.Android</code> and <code>Xamarin.iOS</code>, you can follow this guide as the integration is identical, and the SDKs are compatible.

</p></div></p><p>To use this quickstart, you’ll need to:</p><ul><li><p>Sign up for a free Auth0 account or log in to Auth0.</p></li><li><p>Have a working Android or iOS project using .NET 6 (or above) that you want to integrate with. Alternatively, you can view or download a sample application after logging in.</p></li></ul><p></p><p></p>

## Configure Auth0


<p>To use Auth0 services, you need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for your project.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new &quot;Native Application&quot;, or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your application in the <a href="https://manage.auth0.com/#/">Dashboard</a>, which is where you can manage your applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to one of the following URLs depending on your platform:</p><ul><li><p><b>Android</b>: <code>YOUR_PACKAGE_NAME://{yourDomain}/android/YOUR_PACKAGE_NAME/callback</code></p></li><li><p><b>iOS</b>: <code>YOUR_BUNDLE_ID://{yourDomain}/ios/YOUR_BUNDLE_ID/callback</code></p></li></ul><p></p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to one of the following URLs depending on your platform:</p><ul><li><p><b>Android</b>: <code>YOUR_PACKAGE_NAME://{yourDomain}/android/YOUR_PACKAGE_NAME/callback</code></p></li><li><p><b>iOS</b>: <code>YOUR_BUNDLE_ID://{yourDomain}/ios/YOUR_BUNDLE_ID/callback</code></p></li></ul><p></p></div></p><p>Lastly, be sure that the <b>Application Type</b> for your application is set to <b>Native</b> in the <a href="https://manage.auth0.com/#/applications/">Application Settings</a>.</p>

## Install the Auth0 SDK


<p>Auth0 provides an <a href="https://www.nuget.org/packages/Auth0.OidcClient.AndroidX/">Android</a> and <a href="https://www.nuget.org/packages/Auth0.OidcClient.iOS">iOS</a> SDK to simplify the process of implementing Auth0 authentication in .NET Android and iOS applications.</p><p>Use the NuGet Package Manager (Tools -&gt; Library Package Manager -&gt; Package Manager Console) to install the <code>Auth0.OidcClient.AndroidX</code> or <code>Auth0.OidcClient.iOS</code> package, depending on whether you are building an Android or iOS application.</p><p>Alternatively, you can use the NuGet Package Manager Console (<code>Install-Package</code>) or the <code>dotnet</code> CLI (<code>dotnet add</code>).</p><p><pre><code>Install-Package Auth0.OidcClient.AndroidX

Install-Package Auth0.OidcClient.iOS

</code></pre>

</p><p><pre><code>dotnet add Auth0.OidcClient.AndroidX

dotnet add Auth0.OidcClient.iOS

</code></pre>

</p>

## Instantiate the Auth0Client


<p>To integrate Auth0 into your application, instantiate an instance of the <code>Auth0Client</code> class, passing an instance of <code>Auth0ClientOptions</code> that contains your Auth0 Domain and Client ID.</p><p><pre><code class="language-csharp">using Auth0.OidcClient;



var client = new Auth0Client(new Auth0ClientOptions {

  Domain = &quot;${account.namespace}&quot;,

  ClientId = &quot;${account.clientId}&quot;

}, this);

</code></pre>

</p><p>By default, the SDK will leverage Chrome Custom Tabs for Android and ASWebAuthenticationSession for iOS.</p><p><div class="checkpoint">.NET Android/iOS Quickstart - Step 3 Checkpoint <div class="checkpoint-default"><p>Your <code>Auth0Client</code> should now be properly instantiated. Run your application to verify that:</p><ul><li><p>The <code>Auth0Client </code>is instantiated correctly in the <code>Activity </code>(Android) or <code>UIViewController </code>(iOS).</p></li><li><p>Your application is not throwing any errors related to Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>make sure the domain and client ID are imported correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Configure Android {{{ data-action="code" data-code="MainActivity.cs#2:9" }}}


<p>After a user successfully authenticates, they will be redirected to the callback URL you set up earlier in this quickstart.</p><p>To handle the callback on Android devices, you need to register an intent that handles this callback URL. An easy way to do this is to register the intent on the same activity from which you called the LoginAsync method to instantiate the authentication flow.</p><p>Ensure to replace <code>YOUR_ANDROID_PACKAGE_NAME</code> in the code sample with the actual Package Name for your application, such as <code>com.mycompany.myapplication</code>, and ensure that all the text for the <code>DataScheme</code>, <code>DataHost</code>, and <code>DataPathPrefix</code> is in lowercase. Also, set <code>LaunchMode = LaunchMode.SingleTask</code> for the Activity; otherwise, the system will create a new instance of the activity every time the Callback URL gets called.</p><p>Additionally, you need to handle the intent in the <code>OnNewIntent</code> event in your <code>Activity</code> class. You need to notify the Auth0 OIDC Client to finish the authentication flow by calling the <code>Send</code> method of the <code>ActivityMediator</code> singleton, passing along the URL that was sent in.</p><p><pre><code class="language-csharp">protected override void OnNewIntent(Intent intent)

    {

        base.OnNewIntent(intent);

        ActivityMediator.Instance.Send(intent.DataString);

    }

</code></pre>

</p>

## Configure iOS {{{ data-action="code" data-code="AppDelegate.cs#6:11" }}}


<p>After a user successfully authenticates, they will be redirected to the callback URL you set up earlier in this quickstart.</p><p>To handle the callback on iOS devices:</p><ol><li><p>Open your application&#39;s <code>Info.plist </code>file in Visual Studio, and go to the <b>Advanced </b>tab.</p></li><li><p>Under <b>URL Types</b>, click the <b>Add URL Type </b>button.</p></li><li><p>Set the <b>Identifier </b>as Auth0, the <b>URL Schemes </b>the same as your application&#39;s <code>Bundle Identifier</code>, and the <b>Role </b>as <code>None</code>. </p></li></ol><p>This is an example of the XML representation of your <code>info.plist</code> file after you have added the URL Type:</p><p><pre><code class="language-xml">&lt;key&gt;CFBundleURLTypes&lt;/key&gt;

&lt;array&gt;

 &lt;dict&gt;

 &lt;key&gt;CFBundleTypeRole&lt;/key&gt;

 &lt;string&gt;None&lt;/string&gt;

 &lt;key&gt;CFBundleURLName&lt;/key&gt;

 &lt;string&gt;Auth0&lt;/string&gt;

 &lt;key&gt;CFBundleURLSchemes&lt;/key&gt;

 &lt;array&gt;

 &lt;string&gt;YOUR_BUNDLE_IDENTIFIER&lt;/string&gt;

 &lt;/array&gt;

 &lt;/dict&gt;

&lt;/array&gt;

</code></pre>

</p><p>Additionally, you need to handle the Callback URL in the <code>OpenUrl</code> event in your <code>AppDelegate</code> class. You need to notify the Auth0 OIDC Client to finish the authentication flow by calling the <code>Send</code> method of the <code>ActivityMediator</code> singleton, passing along the URL that was sent in.</p>

## Add login to your application


<p>Now that you have configured your Auth0 Application and the Auth0 SDK, you need to set up login for your project. To do this, you will use the SDK’s <code>LoginAsync()</code> method to create a login button that redirects users to the Auth0 Universal Login page.</p><p><pre><code class="language-csharp">var loginResult = await client.LoginAsync();

</code></pre>

</p><p>If there isn&#39;t any error, you can access the <code>User</code>, <code>IdentityToken</code>, <code>AccessToken</code> and <code>RefreshToken</code> on the <code>LoginResult</code> returned from <code>LoginAsync()</code>.</p><p><div class="checkpoint">.NET Android/iOS Quickstart - Step 6 Checkpoint <div class="checkpoint-default"><p>You should now be able to log in or sign up using a username and password.</p><p>Click the login button and verify that:</p><ul><li><p>Your Android or iOS application redirects you to the Auth0 Universal Login page.</p></li><li><p>You can log in or sign up.</p></li><li><p>Auth0 redirects you to your application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s something to double-check:</p><ul><li><p>you called <code>LoginAsync</code> as expected</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Add logout to your application


<p>Users who log in to your project will also need a way to log out. Create a logout button using the SDK’s <code>LogoutAsync()</code> method. When users log out, they will be redirected to your Auth0 logout endpoint, which will then immediately redirect them back to the logout URL you set up earlier in this quickstart.</p><p><pre><code class="language-csharp">await client.LogoutAsync();

</code></pre>

</p><p><div class="checkpoint">.NET Android/iOS Quickstart - Step 7 Checkpoint <div class="checkpoint-default"><p>Run your application and click the logout button. Verify that:</p><ul><li><p>Your Android or iOS application redirects you to the address you specified as one of the Allowed Logout URLs in your Application Settings.</p></li><li><p>You are no longer logged in to your application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>you configured the correct Logout URL</p></li><li><p>you called <code>LogoutAsync</code> as expected.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Show user profile information


<p>Now that your users can log in and log out, you will likely want to be able to retrieve the <a data-contentfulid="2ClGWANGeRoTkg5Ax2gOVK-en-US">profile information</a> associated with authenticated users. For example, you may want to display a logged-in user’s name or profile picture in your project.</p><p>The Auth0 SDK for Android and iOS provides user information through the <code>LoginResult.User</code> property.</p><p><pre><code class="language-swift">if loginResult.IsError == false {

  var user = loginResult.User

  var name = user.FindFirst(c =&gt; c.Type == &quot;name&quot;)?.Value

  var email = user.FindFirst(c =&gt; c.Type == &quot;email&quot;)?.Value

  var picture = user.FindFirst(c =&gt; c.Type == &quot;picture&quot;)?.Value

}

</code></pre>

</p>
