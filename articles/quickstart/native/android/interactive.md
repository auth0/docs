---
title: Add Login to Your Android Application
description: This guide demonstrates how to integrate Auth0 with a Android application using the Auth0 Android SDK.
interactive:  true
files:
 - files/build
 - files/strings
 - files/MainActivity
github:
  path: 00-Login-Kt
locale: en-US
---

# Add Login to Your Android Application


<p></p>

## Configure Auth0


<p>To use Auth0 services, you need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure authentication in your project.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure callback URLs</h3><p>A callback URL is the application URL that Auth0 will direct your users to once they have authenticated. If you do not set this value, Auth0 will not return users to your application after they log in.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>demo://{yourDomain}/android/YOUR_APP_PACKAGE_NAME/callback</code>.</p></div></p><h3>Configure logout URLs</h3><p>A logout URL is the application URL Auth0 will redirect your users to once they log out. If you do not set this value, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>demo://{yourDomain}/android/YOUR_APP_PACKAGE_NAME/callback</code></p></div></p>

## Install the Auth0 Android SDK {{{ data-action="code" data-code="build.gradle#18:18" }}}


<p>Add the <a href="https://github.com/auth0/Auth0.Android" target="_blank" rel="noreferrer noopener">Auth0 Android</a> SDK into your project. The library will make requests to the Auth0&#39;s Authentication and Management APIs.</p><p>In your app&#39;s <code>build.gradle</code> dependencies section, add the following:</p><p><pre><code class="language-javascript">implementation 'com.auth0.android:auth0:2. '

</code></pre>

</p><p>Ensure you target Java 8+ byte code for Android and Kotlin plugins respectively.</p>

## Add manifest placeholders {{{ data-action="code" data-code="build.gradle#10:12" }}}


<p>The SDK requires manifest placeholders. Auth0 uses placeholders internally to define an <code>intent-filter</code>, which captures the authentication callback URL. You must set Auth0 tenant domain and the callback URL scheme.</p><p>You do not need to declare a specific <code>intent-filter</code> for your activity, because you have defined the manifest placeholders with your Auth0 <b>Domain</b> and <b>Scheme</b> values and the library will handle the redirection for you.</p><p><div class="alert-container" severity="default"><p>We&#39;ve used a value of <code>demo</code> for <code>auth0Scheme</code> here, so that a custom URL scheme can be used for the URL that Auth0 redirects to after login. The alternative is <code>https</code> if you want to use <a href="https://auth0.com/docs/applications/enable-android-app-links" target="_blank" >Android App Links</a>. You can read more about setting this value in the <a href="https://github.com/auth0/Auth0.Android#a-note-about-app-deep-linking" target="_blank" rel="noreferrer noopener">Auth0.Android SDK README</a>.</p></div></p>

## Configure your application {{{ data-action="code" data-code="strings.xml#2:3" }}}


<p>For the SDK to function properly, you must set the following properties in <code>strings.xml</code>:</p><ul><li><p><code>com_auth0_domain</code>: The domain of your Auth0 tenant. Generally, you can find this in the Auth0 Dashboard under your Application&#39;s Settings in the Domain field. If you are using a <a href="https://auth0.com/docs/custom-domains" target="_blank" >custom domain</a>, you should set this to the value of your custom domain instead.</p></li><li><p><code>com_auth0_client_id</code>: The ID of the Auth0 Application you set up earlier in this quickstart. You can find this in the Auth0 Dashboard under your Application&#39;s Settings in the Client ID field.</p></li></ul><p>Ensure that the <code>AndroidManifest.xml</code> file specifies the <code>android.permissions.INTERNET</code> permission:</p><p><pre><code class="language-javascript">&lt;uses-permission android:name=&quot;android.permission.INTERNET&quot; /&gt;

</code></pre>

</p><p>Run <b>Sync Project with Gradle Files</b> inside Android Studio or execute <code>./gradlew clean assembleDebug</code> from the command line.</p><p><div class="alert-container" severity="default"><p>For more information about using Gradle, check the <a href="https://gradle.org/getting-started-android-build/" target="_blank" rel="noreferrer noopener">Gradle official documentation</a>.</p></div></p>

## Add login to your application {{{ data-action="code" data-code="MainActivity.kt#6:38" }}}


<p><a href="https://auth0.com/docs/hosted-pages/login" target="_blank" >Universal Login</a> is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security and the fullest array of features.</p><p>In the <code>onCreate</code> method, create a new instance of the <code>Auth0</code> class to hold user credentials.</p><p>Create a <code>loginWithBrowser</code> method and use the <code>WebAuthProvider</code> class to authenticate with any connection you enabled on your application in the <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Auth0 dashboard</a>. Here, you can pass the scheme value that was used in the <code>auth0Scheme</code> manifest placeholder as part of the initial configuration.</p><p>After you call the <code>WebAuthProvider#start</code> function, the browser launches and shows the login page. Once the user authenticates, the callback URL is called. The callback URL contains the final result of the authentication process.</p><p><div class="checkpoint">Android Quickstart step 5 checkpoint <div class="checkpoint-default"><p>Add a button to your application that calls <code>loginWithBrowser</code>. When you click it, verify that your Android application redirects you to the <a href="https://auth0.com/universal-login" target="_blank" >Auth0 Universal Login</a> page and that you can now log in or sign up using a username and password or a social provider.</p><p>Once that&#39;s complete, verify that Auth0 redirects back to your app.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not launch successfully:</p><ul><li><p>Ensure you set the Allowed Callback URLs are correct</p></li><li><p>Verify you saved your changes after entering your URLs</p></li><li><p>Make sure the domain and cliend ID values imported correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Add logout to your application {{{ data-action="code" data-code="MainActivity.kt#40:52" }}}


<p>Use <code>WebAuthProvider</code> to remove the cookie set by the browser at authentication time, so that the users are forced to re-enter their credentials the next time they try to authenticate.</p><p>Add a <code>logout</code> method to your app to remove the user&#39;s session and log them out of the app. Here, you can pass the scheme value that was used in the <code>auth0Scheme</code> manifest placeholder as part of the initial configuration.</p><p>Use the <code>WebAuthProvider</code> class to implement logout. This call opens the browser and navigates the user to the logout endpoint. If the user cancels the logout, consider redirected the user to their previous URL.</p><p><div class="checkpoint">Android Quickstart Step 6 Checkpoint <div class="checkpoint-default"><p>Add a button to your app that calls <code>logout</code> and logs the user out of your application. When you click it, verify that your Android app redirects you logout page and back again, and that you are no longer logged in to your application.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not logout successfully:</p><ul><li><p>Ensure the Allowed Logout URLs are set properly</p></li><li><p>Verify you saved your changes after entering your URLs</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Show user profile information {{{ data-action="code" data-code="MainActivity.kt#54:70" }}}


<p>Use the <code>AuthenticationAPIClient</code> class to <a href="https://auth0.com/docs/users/user-profiles#user-profile-management-api-access" target="_blank" >retrieve the user&#39;s profile from Auth0</a>. This requires:</p><ul><li><p>The access token returned from the login phase</p></li><li><p>The <code>WebAuthProvider.login </code>must contain the <code>profile </code>scope</p></li></ul><p>You must specify the <code>email</code> scope if you need to retrieve the user&#39;s email address.</p><p><div class="alert-container" severity="default"><p>This quickstart sets the <code>openid profile email</code> scopes by default during the login step above.</p></div></p><p>The following demonstrates a function that can be used to retrieve the user&#39;s profile and show it on the screen:</p><p><div class="checkpoint">Android Quickstart step 7 checkpoint <div class="checkpoint-default"><p>Call the <code>showUserProfile</code> function after login. Verify the <code>onSuccess</code> callback returns the user&#39;s profile information.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not return user profile information:</p><ul><li><p>Verify the <code>accessToken</code> is valid</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>
