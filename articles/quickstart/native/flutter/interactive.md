---
title: Add Login to Your Flutter Application
description: This guide demonstrates how to integrate Auth0 with a Flutter app using the Auth0 Flutter SDK.
interactive:  true
files:
 - files/app/build
 - files/main_view
 - files/profile_view
github:
  path: https://github.com/auth0-samples/auth0-flutter-samples/tree/main/sample
locale: en-US
---

# Add Login to Your Flutter Application


<p>Auth0 allows you to quickly add authentication and access user profile information in your app. This guide demonstrates how to integrate Auth0 with a Flutter app using the <a href="https://github.com/auth0/auth0-flutter">Auth0 Flutter SDK</a>.</p><p><div class="alert-container" severity="default"><p>The Flutter SDK currently only supports Flutter apps for Android, iOS, and macOS.</p></div></p><p>This quickstart assumes you already have a <a href="https://flutter.dev/">Flutter</a> app up and running. If not, check out the <a href="https://docs.flutter.dev/get-started/install">Flutter &quot;getting started&quot; guides</a> to get started with a simple app.</p><p>You should also be familiar with the <a href="https://docs.flutter.dev/reference/flutter-cli">Flutter command line tool</a>.</p><p><div class="alert-container" severity="default"><p><b>New to Auth?</b> Learn <a href="https://auth0.com/docs/overview">How Auth0 works</a>, how it <a href="https://auth0.com/docs/architecture-scenarios/application/spa-api">integrates with Single-Page Applications</a> and which <a href="https://auth0.com/docs/flows/concepts/auth-code-pkce">protocol</a> it uses.</p></div></p><p></p>

## Configure Auth0


<p>To use Auth0 services, you need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for your project.</p><h3>Configure an Auth0 application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing <b>Native</b> Auth0 application. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your application in the <a href="https://manage.auth0.com/dashboard/us/auth0-dsepaid/">Dashboard</a>, which is where you can manage your applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample app instead.</p><h3>Configure the callback and logout URLs</h3><p>The callback and logout URLs are the URLs that Auth0 invokes to redirect back to your app. Auth0 invokes the callback URL after authenticating the user, and the logout URL after removing the session cookie. If the callback and logout URLs are not set, users will be unable to log in and out of the app and will get an error.</p><p>Set the callback and logout URLs to the following values, depending on your platform.</p><p><div class="alert-container" severity="default"><p>On Android, the value of the <code>SCHEME</code> placeholder can be <code>https</code> or some other custom scheme. <code>https</code> schemes require enabling <a href="https://auth0.com/docs/get-started/applications/enable-android-app-links-support">Android App Links</a>.</p><p>On iOS 17.4+ and macOS 14.4+ it is possible to use Universal Links (<code>https</code> scheme) as callback and logout URLs. When enabled, the SDK will fall back to using a custom URL scheme on older iOS / macOS versions –your app&#39;s <a href="https://developer.apple.com/documentation/appstoreconnectapi/bundle_ids">bundle identifier</a>. <b>This feature requires Xcode 15.3+ and a paid Apple Developer account</b>.</p></div></p><h4>Android</h4><p><code>SCHEME://${account.namespace}/android/YOUR_PACKAGE_NAME/callback</code></p><h4>iOS</h4><p><code>https://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback,

YOUR_BUNDLE_IDENTIFIER://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback</code></p><h4>macOS</h4><p><code>https://${account.namespace}/macos/YOUR_BUNDLE_IDENTIFIER/callback,

YOUR_BUNDLE_IDENTIFIER://${account.namespace}/macos/YOUR_BUNDLE_IDENTIFIER/callback</code></p><p>For example, if your iOS bundle identifier were <code>com.example.MyApp</code> and your Auth0 domain were <code>example.us.auth0.com</code>, then this value would be:</p><p><code>https://example.us.auth0.com/ios/com.example.MyApp/callback,

com.example.MyApp://example.us.auth0.com/ios/com.example.MyApp/callback</code></p>

## Install the Auth0 Flutter SDK


<p>Add the Auth0 Flutter SDK into the project:</p><p><code>flutter pub add auth0_flutter</code></p>

## Configure Android


<p>If you are not developing for the Android platform, skip this step.</p><p>The SDK requires manifest placeholders. Auth0 uses placeholders internally to define an <code>intent-filter</code>, which captures the authentication callback URL. You must set the Auth0 tenant domain and the callback URL scheme.</p><p>The <a href="https://github.com/auth0-samples/auth0-flutter-samples/tree/main/sample/android">sample</a> uses the following placeholders:</p><ul><li><p><code>auth0Domain</code>: The domain of your Auth0 tenant. Generally, you find this in the Auth0 Dashboard under your <b>Application Settings</b> in the <b>Domain</b> field. If you are using a custom domain, you should set this to the value of your custom domain instead.</p></li><li><p><code>auth0Scheme</code>: The scheme to use. Can be a custom scheme, or https if you want to use <a href="https://auth0.com/docs/applications/enable-android-app-links">Android App Links</a>. You can read more about setting this value in the <a href="https://github.com/auth0/Auth0.Android#a-note-about-app-deep-linking">Auth0.Android SDK README</a>.</p></li></ul><p><div class="alert-container" severity="default"><p>You do not need to declare a specific <code>intent-filter</code> for your activity because you defined the manifest placeholders with your Auth0 <b>Domain</b> and <b>Scheme</b> values. The library handles the redirection for you.</p></div></p><p>Run <b>Sync Project with Gradle Files</b> inside Android Studio to apply your changes.</p>

## Configure iOS/macOS

If you are not developing for the iOS or macOS platforms, skip this step.

::: warning
This step requires a paid Apple Developer account. It is needed to use Universal Links as callback and logout URLs. Skip this step to use a custom URL scheme instead.
:::

### Configure the Team ID and bundle identifier

Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings" target="_blank" rel="noreferrer">settings page</a> of your Auth0 application, scroll to the end, and open **Advanced Settings > Device Settings**. In the **iOS** section, set **Team ID** to your <a href="https://developer.apple.com/help/account/manage-your-team/locate-your-team-id/" target="_blank" rel="noreferrer">Apple Team ID</a>, and **App ID** to your app's bundle identifier.

<p><img src="/media/articles/native-platforms/ios-swift/ios-device-settings.png" alt="Screenshot of the iOS section inside the Auth0 application settings page"></p>

This will add your app to your Auth0 tenant's `apple-app-site-association` file.

### Add the associated domain capability

Open your app in Xcode by running `open ios/Runner.xcworkspace` (or `open macos/Runner.xcworkspace` for macOS). Go to the **Signing and Capabilities** <a href="https://developer.apple.com/documentation/xcode/adding-capabilities-to-your-app#Add-a-capability" target="_blank" rel="noreferrer">tab</a> of the **Runner** target settings, and press the **+ Capability** button. Then select **Associated Domains**.

<p><img src="/media/articles/native-platforms/ios-swift/ios-xcode-capabilities.png" alt="Screenshot of the capabilities library inside Xcode"></p>

Next, add the following <a href="https://developer.apple.com/documentation/xcode/configuring-an-associated-domain#Define-a-service-and-its-associated-domain" target="_blank" rel="noreferrer">entry</a> under **Associated Domains**:

```text
webcredentials:${account.namespace}
```

If you have a <a href="/customize/custom-domains" target="_blank" rel="noreferrer">custom domain</a>, use this instead of the Auth0 domain from the settings page.

::: note
For the associated domain to work, your app must be signed with your team certificate **even when building for the iOS simulator**. Make sure you are using the Apple Team whose Team ID is configured in the settings page of your Auth0 application.
:::

## Add login to your application {{{ data-action="code" data-code="main_view.dart#29:40" }}}


<p><a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-en-US">Universal Login</a> is the easiest way to set up authentication in your app. We recommend using it for the best experience, best security, and the fullest array of features.</p><p>Integrate Auth0 Universal Login in your Flutter app by using the <code>Auth0</code> class. Redirect your users to the Auth0 Universal Login page using <code>webAuthentication().login()</code>. This is a <code>Future</code> and must be awaited for you to retrieve the user&#39;s tokens.</p><p><b>Android</b>: if you are using a custom scheme, pass this scheme to the login method so that the SDK can route to the login page and back again correctly:</p><p><code>await auth0.webAuthentication(scheme: &#39;YOUR CUSTOM SCHEME&#39;).login();</code></p><p>When a user logs in, they are redirected back to your app. Then, you are able to access the ID and access tokens for this user.</p><p><div class="checkpoint">Flutter - Step 5 - Add login to your application <div class="checkpoint-default"><p>Add a button to your app that calls <code>webAuthentication().login()</code> and logs the user into your app. Verify that you are redirected to Auth0 for authentication and then back to your app.</p><p>Verify that you can get access to the tokens on the result of calling <code>login</code>.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your app did not launch successfully:</p><ul><li><p>Ensure you set the Allowed Callback URLs are correct</p></li><li><p>Verify you saved your changes after entering your URLs</p></li><li><p>Make sure the domain and client ID values are imported correctly</p></li><li><p>If using Android, ensure that the manifest placeholders have been set up correctly, otherwise the redirect back to your app may not work</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Add logout to your application {{{ data-action="code" data-code="main_view.dart#45:55" }}}


<p>To log users out, redirect them to the Auth0 logout endpoint to clear their login session by calling the Auth0 Flutter SDK <code>webAuthentication().logout()</code>. <a data-contentfulid="5sl85ipAFaf8i4CH9wD6VA-en-US">Read more about logging out of Auth0</a>.</p><p><b>Android</b>: if you are using a custom scheme, pass this scheme to the logout method so that the SDK can route back to your app correctly:</p><p><code>await auth0.webAuthentication(scheme: &#39;YOUR CUSTOM SCHEME&#39;).logout();</code></p><p><code></code><div class="checkpoint">Flutter - Step 6 - Add logout to your application <div class="checkpoint-default"><p>Add a button to your app that calls <code>webAuthentication().logout()</code> and logs the user out of your app. When you select it, verify that your Flutter app redirects you to the logout endpoint and back again. You should not be logged in to your app.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your app did not log out successfully:</p><ul><li><p>Ensure the Allowed Logout URLs are set properly</p></li><li><p>Verify you saved your changes after entering your URLs</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Show user profile information {{{ data-action="code" data-code="profile_view.dart" }}}


<p>The user profile automatically retrieves user profile properties for you when you call <code>webAuthentication().login()</code>. The returned object from the login step contains a <code>user</code> property with all the user profile properties, which populates by decoding the ID token.</p><p><div class="checkpoint">Flutter - Step 7 - Show user profile information <div class="checkpoint-default"><p>Log in and inspect the <code>user</code> property on the result. Verify the current user&#39;s profile information, such as <code>email</code> or <code>name</code>.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your app did not return user profile information:</p><ul><li><p>Verify the access token is valid</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
