---
title: Add Login to Your React Native Application
description: This tutorial demonstrates how to add user login to an React Native application using Auth0.
interactive:  true
files:
 - files/app
github:
  path: 00-Login
locale: en-US
---

# Add Login to Your React Native Application


<p>This Quickstart is for the React Native framework. To integrate Auth0 into your Expo application, refer to the <a href="https://auth0.com/docs/quickstart/native/react-native-expo/interactive" target="_blank" >Expo Quickstart</a>.</p><p></p>

## Configure Auth0


<p>To use Auth0 services, you must have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure authentication in your project.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>To explore a complete configuration, review the sample application in your Dashboard.</p><h3>Configure callback and logout URLs</h3><p>Auth0 invokes the callback and logout URLs to redirect users back to your application. Auth0 invokes the callback URL after authenticating the user and the logout URL after removing the session cookie. If you do not set the callback and logout URLs, users will not be able to log in and out of the app, and your application will produce an error.</p><p>Add the corresponding URL to <b>Callback URLs</b> and <b>Logout URLs</b>, according to your app&#39;s platform. If you are using a <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-en-US">custom domain</a>, use the value of your custom domain instead of your Auth0 tenant’s domain.</p><h4>iOS</h4><p><pre><code>BUNDLE_IDENTIFIER.auth0://${account.namespace}/ios/BUNDLE_IDENTIFIER/callback

</code></pre>

</p><h4>Android</h4><p><pre><code>PACKAGE_NAME.auth0://${account.namespace}/android/PACKAGE_NAME/callback

</code></pre>

</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set the following for:</p><ul><li><p><b>iOS</b>: </p><p><code>com.auth0samples.auth0://labs-fundtraining.us.auth0.com/ios/com.auth0samples/callback</code></p></li><li><p><b>Android</b>: </p><p><code>com.auth0samples.auth0://labs-fundtraining.us.auth0.com/android/com.auth0samples/callback</code></p></li></ul><p></p></div></p><p></p>

## Install dependencies


<p>In this section, you will install the React Native Auth0 module.</p><p><div class="alert-container" severity="default"><p>Refer to the <a href="https://facebook.github.io/react-native/" target="_blank" rel="noreferrer noopener">official documentation</a> for additional details on React Native.</p></div></p><h3>Yarn</h3><p><pre><code>yarn add react-native-auth0

</code></pre>

</p><p><div class="alert-container" severity="default"><p>For further reference on yarn, check <a href="https://yarnpkg.com/en/docs" target="_blank" rel="noreferrer noopener">their official documentation</a>.</p></div></p><h3>npm</h3><p><pre><code>npm install react-native-auth0 --save

</code></pre>

</p><h3>Additional iOS step: install the module Pod</h3><p>Our SDK requires a minimum iOS deployment target of 13.0. In your project&#39;s `ios/Podfile``, ensure your platform target is set to 13.0.</p><p><pre><code>platform :ios '13.0'

</code></pre>

</p><p>CocoaPods is the iOS package management tool the React Native framework uses to install itself into your project. For the iOS native module to work with your iOS app, first install the library Pod. If you&#39;re familiar with older React Native SDK versions, this is similar to the previous Linking a Native module. The process is now simplified:</p><p>Change directory into the <code>ios</code> folder and run <code>pod install</code>.</p><p><pre><code class="language-ruby">cd ios

pod install

</code></pre>

</p><p></p>

## Integrate Auth0 in your application


<p>First, you must provide a way for your users to log in. We recommend using the Auth0-hosted <a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-en-US">login page</a>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/3ZRDXpjlUXEcQpXq6Q00L1/789d583affd1f09621dc59ae49b4060c/login-ios.png" alt="An example Universal Login screen for an iOS app" /><h3>Configure Android</h3><p>Open the <code>build.gradle</code> file in your application directory (typically at <code>android/app/build.gradle</code>) and add the following manifest placeholders. The value for <code>auth0Domain</code> should contain your Auth0 application settings as configured above.</p><p><pre><code class="language-groovy">android {

    defaultConfig {

        // Add the next line

        manifestPlaceholders = [auth0Domain: &quot;${account.namespace}&quot;, auth0Scheme: &quot;<%= "${applicationId}.auth0" %>&quot;]

    }

    ...

}

</code></pre>

</p><p><div class="alert-container" severity="default"><p>At runtime, the <code>applicationId</code> value will automatically update with your application&#39;s package name or ID (e.g. <code>com.example.app</code>). You can change this value from the <code>build.gradle</code> file. You can also check it at the top of your <code>AndroidManifest.xml</code> file.</p></div></p>
<h3>Configure iOS</h3><h4>AppDelegate Setup (Choose Based on Architecture)</h4><p>If you're using (Swift - <code>ios/&lt;YOUR PROJECT&gt;/AppDelegat.swift</code>) add the following in `AppDelegate` class:</p><p><pre><code>func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -&gt Bool {
  return RCTLinkingManager.application(app, open: url, options: options)
}</code></pre></p>
<p>If you're using (Objective-C++ - <code>ios/&lt;YOUR PROJECT&gt;/AppDelegate.mm</code>) add the following:</p><p><pre><code>#import &lt;React/RCTLinkingManager.h&gt;



- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url

            options:(NSDictionary&lt;UIApplicationOpenURLOptionsKey, id&gt; *)options

{

  return [RCTLinkingManager application:app openURL:url options:options];

}

</code></pre>

</p><p><div class="alert-container" severity="default"><p>This file will be <code>ios/&lt;YOUR PROJECT&gt;/AppDelegate.m</code> on applications using the <a href="https://reactnative.dev/docs/next/new-architecture-app-intro#ios---use-objective-c-mm-extension" target="_blank" rel="noreferrer noopener">old architecture</a>.</p></div></p><p>Next, add a URLScheme using your App&#39;s bundle identifier.</p><p>In the <code>ios</code> folder, open the <code>Info.plist</code> and locate the value for <code>CFBundleIdentifier</code>.</p><p><code></code><pre><code class="language-xml">&lt;key&gt;CFBundleIdentifier&lt;/key&gt;

&lt;string&gt;$(PRODUCT_BUNDLE_IDENTIFIER)&lt;/string&gt;

</code></pre>

</p><p>Below this value, register a URL type entry using the value of <code>CFBundleIdentifier</code> as the value for the <code>CFBundleURLSchemes</code>.</p><p><pre><code class="language-xml">&lt;key&gt;CFBundleURLTypes&lt;/key&gt;

&lt;array&gt;

 &lt;dict&gt;

 &lt;key&gt;CFBundleTypeRole&lt;/key&gt;

 &lt;string&gt;None&lt;/string&gt;

 &lt;key&gt;CFBundleURLName&lt;/key&gt;

 &lt;string&gt;auth0&lt;/string&gt;

 &lt;key&gt;CFBundleURLSchemes&lt;/key&gt;

 &lt;array&gt;

 &lt;string&gt;$(PRODUCT_BUNDLE_IDENTIFIER).auth0&lt;/string&gt;

 &lt;/array&gt;

 &lt;/dict&gt;

&lt;/array&gt;

</code></pre>

</p><p><div class="alert-container" severity="default"><p>If your application was generated using the React Native CLI, the default value of <code>$(PRODUCT_BUNDLE_IDENTIFIER)</code> dynamically matches <code>org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier)</code>. For the sample app, this value matches <code>com.auth0samples</code>.</p></div></p><p>In a later step, you will use this value to define the callback URLs below. You can change it using XCode with the following steps:</p><ul><li><p>Open the <code>ios/&lt;YOUR PROJECT&gt;.xcodeproj </code>file or run <code>xed ios </code>on a Terminal from the app root.</p></li><li><p>Open your project&#39;s or desired target&#39;s Build Settings tab and find the section that contains &quot;Bundle Identifier&quot;.</p></li><li><p>Replace the &quot;Bundle Identifier&quot; value with your desired application&#39;s bundle identifier name.</p></li></ul><p>For additional information, please read <a href="https://facebook.github.io/react-native/docs/linking" target="_blank" rel="noreferrer noopener">react native docs</a>.</p>

## Configure the Auth0Provider component {{{ data-action="code" data-code="app.js#46:48" }}}


<p>The <code>useAuth0</code> hook relies on a React Context to provide state management. The <code>Auth0Provider</code> component provides this context.</p><p>Import the <code>useAuth0</code> hook and <code>Auth0Provider</code> component from the <code>react-native-auth0</code> package:</p><p><pre><code class="language-javascript">import {useAuth0, Auth0Provider} from 'react-native-auth0';

</code></pre>

</p><p>For the SDK to function correctly, wrap your application in the <code>Auth0Provider</code> component and set the following properties:</p><ul><li><p><code>domain</code>: The domain of your Auth0 tenant. Generally, you can find this in the Auth0 Dashboard under your Application&#39;s Settings in the Domain field. If you are using a <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-en-US">custom domain</a>, you should set this to the value of your custom domain instead.</p></li><li><p><code>clientId</code>: The ID of the Auth0 Application you set up earlier in this quickstart. You can find this in the Auth0 Dashboard under your application&#39;s Settings tab in the Client ID field.</p></li></ul><p><div class="checkpoint">React Native Quickstart - Step 4 Checkpoint <div class="checkpoint-default"><p>You just configured the <code>Auth0Provider</code> component. Run your application to verify that:</p><ul><li><p>The SDK is initializing correctly.</p></li><li><p>Your application is not throwing any errors related to Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>

If your application did not launch successfully:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>ensure your domain and client ID values are correct</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Add login to your application {{{ data-action="code" data-code="app.js#8:14" }}}


<p>Authenticate the user by calling the <code>authorize</code> method provided by the <code>useAuth0</code> hook. This method redirects the user to the Auth0 <a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-en-US">Universal Login</a> page for authentication, then back to your app.</p><p>To confirm the user successfully logged in, check that the <code>user</code> property provided by the hook is not <code>null</code>.</p><p><div class="checkpoint">React Native Quickstart - Step 5 Checkpoint <div class="checkpoint-default"><p>Add a button component that calls <code>authorize</code> when clicked. Verify that you are redirected to the login page and then back to your application.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not launch successfully:</p><ul><li><p>Ensure you set the Allowed Callback URLs are correct</p></li><li><p>Verify you saved your changes after entering your URLs</p></li><li><p>Make sure the domain and client ID values are imported correctly</p></li><li><p>If using Android, ensure you set up the manifest placeholders correctly, otherwise the redirect back to your app may not work</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Add logout to your application {{{ data-action="code" data-code="app.js#16:22" }}}


<p>To log the user out, redirect them to the Auth0 logout endpoint by calling <code>clearSession</code>. This will remove their session from the authorization server and log the user out of the application.</p><p><div class="checkpoint">React Native Quickstart - Step 6 Checkpoint <div class="checkpoint-default"><p>Add a button that calls <code>clearSession</code> and observe that you are redirected to the Auth0 logout endpoint and back again. You should no longer be logged in to your application.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not log out successfully:</p><ul><li><p>Ensure the Allowed Logout URLs are set properly</p></li><li><p>Verify you saved your changes after entering your URLs</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Show user profile information {{{ data-action="code" data-code="app.js#28:34" }}}


<p>The <code>useAuth0</code> hook exposes a <code>user</code> object that contains information about the authenticated user. You can use this to access decoded user profile information about the authenticated user from the <a data-contentfulid="7eGepxAjz89d1F7i1aP4ch-en-US">ID token</a>.</p><p>If a user has not been authenticated, this property will be <code>null</code>.</p><p><div class="checkpoint">React Native Quickstart - Step 7 Checkpoint <div class="checkpoint-default"><p>Log in and inspect the <code>user</code> property on the result. Verify the current user&#39;s profile information, such as <code>email</code> or <code>name</code>.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>
