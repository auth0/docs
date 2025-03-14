---
title: Add Login to Your Expo Application
description: This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any Expo application using the Auth0 React Native SDK.
interactive:  true
files:
 - files/App
 - files/app
github:
  path: https://github.com/auth0-samples/auth0-react-native-sample/tree/master/00-Login
locale: en-US
---

# Add Login to Your Expo Application


<p>This Quickstart is for the Expo framework. To integrate Auth0 into your React Native application, please refer to the <a data-contentfulid="1wLtNQQy4UsKwDEEhJkGeJ-en-US">React Native Quickstart</a>.</p><p><div class="alert-container" severity="warning"><p>This SDK is not compatible with &quot;Expo Go&quot; app. It is compatible only with Custom Dev Client and EAS builds.</p></div></p><p></p>

## Configure Auth0


<p>To use Auth0 services, you need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure authentication in your project.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure callback and logout URLs</h3><p>Auth0 invokes the callback and logout URLs to redirect users back to your application. Auth0 invokes the callback URL after authenticating the user and the logout URL after removing the session cookie. If you do not set the callback and logout URLs, users will not be able to log in and out of the app, and your application will produce an error.</p><p>Add the corresponding URL to <b>Callback URLs</b> and <b>Logout URLs</b>, according to your app&#39;s platform. If you are using a <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-en-US">custom domain</a>, use the value of your custom domain instead of your Auth0 tenant’s domain.</p><h4>iOS</h4><p><code>BUNDLE_IDENTIFIER.auth0://${account.namespace}/ios/BUNDLE_IDENTIFIER/callback</code></p><h4>Android</h4><p><code>PACKAGE_NAME.auth0://${account.namespace}/android/PACKAGE_NAME/callback</code></p><p><code></code><div class="alert-container" severity="default"><p>If you are following along with our sample project, use the following value:</p><ul><li><p>iOS: <code>com.auth0samples.auth0://{yourDomain}/ios/com.auth0samples/callback</code></p></li><li><p>Android: <code>com.auth0samples.auth0://{yourDomain}/android/com.auth0samples/callback</code></p></li></ul><p></p></div></p>

## Install dependencies


<p>In this section, you will learn how to install the React Native Auth0 module.</p><p><div class="alert-container" severity="default"><p>Please refer to the <a href="https://facebook.github.io/react-native/">official documentation</a> for additional details on React Native.</p></div></p><h3>Yarn</h3><p><code>yarn add react-native-auth0</code></p><p><div class="alert-container" severity="default"><p>For further reference on <code>yarn</code>, check their <a href="https://yarnpkg.com/en/docs">official documentation</a>.</p></div></p><h3>npm</h3><p><code>npm install react-native-auth0 --save</code></p>

## Setup Auth0 Config Plugin {{{ data-action="code" data-code="app.json#10:15" }}}


<p>The Auth0 package runs custom native code that must be configured at build time. Use <a href="https://docs.expo.dev/guides/config-plugins/">Expo Config Plugin</a> to achieve this.</p><p>The <code>react-native-auth0</code> plugin will be added in the <a href="https://docs.expo.dev/workflow/configuration/">Expo config</a>.</p>

## Generate Native Source Code {{{ data-action="code" data-code="app.json#31:36" }}}


<p>You must generate the native code for the above configuration to be set. To do this, run the following command:</p><p><code>expo prebuild</code></p><p>You will be prompted to provide the <a href="https://github.com/expo/fyi/blob/main/android-package.md">Android package</a> and <a href="https://github.com/expo/fyi/blob/main/bundle-identifier.md">iOS bundle identifier</a> if they are not already present in the Expo config.</p><p><pre><code>? What would you like your Android package name to be? &gt; com.auth0samples # or your desired package name



? What would you like your iOS bundle identifier to be? &gt; com.auth0samples # or your desired bundle identifier

</code></pre>

</p><p>These values are used to set the callback and logout URLs.</p><p></p>

## Configure the Auth0Provider component {{{ data-action="code" data-code="App.js#46:48" }}}


<p>The <code>useAuth0</code> hook relies on a React Context to provide state management. This context is provided by the <code>Auth0Provider</code> component.</p><p>Import the <code>useAuth0</code> hook and <code>Auth0Provider</code> component from the <code>react-native-auth0</code> package:</p><p><pre><code class="language-javascript">import {useAuth0, Auth0Provider} from 'react-native-auth0';

</code></pre>

</p><p>For the SDK to function properly, you must wrap your application in the <code>Auth0Provider</code> component, and set the following properties:</p><ul><li><p><code>domain</code>: The domain of your Auth0 tenant. Generally, you can find this in the Auth0 Dashboard under your Application&#39;s <b>Settings</b> in the <b>Domain</b> field. If you are using a <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-en-US">custom domain</a>, you should set this to the value of your custom domain instead.</p></li><li><p><code>clientId</code>: The client ID of the Auth0 Application you set up earlier in this quickstart. You can find this in the Auth0 Dashboard under your Application&#39;s <b>Settings</b> in the <b>Client ID</b> field.</p></li></ul><p><div class="checkpoint">Expo - Step 5 - Configure the Auth0Provider component <div class="checkpoint-default"><p>Your <code>Auth0Provider</code> component should now be properly configured. Run your application to verify that:</p><ul><li><p>the SDK is initializing correctly</p></li><li><p>your application is not throwing any errors related to Auth0</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not launch successfully:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>ensure your domain and client ID values are correct</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p><p></p></div>

  </div></p>

## Add login to your application {{{ data-action="code" data-code="App.js#8:14" }}}


<p>Authenticate the user by calling the <code>authorize</code> method provided by the <code>useAuth0</code> hook. This redirects the user to the Auth0 <a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-en-US">Universal Login</a> page for authentication, then back to your app.</p><p>For confirmation that the user was logged in successfully, check that the <code>user</code> property provided by the hook is not <code>null</code>.</p><p><div class="checkpoint">Expo - Step 6 - Add login to your application <div class="checkpoint-default"><p>Add a button component that calls <code>authorize</code> when clicked. Verify that you are redirected to the login page and then back to your application.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not launch successfully:</p><ul><li><p>ensure you set the Allowed Callback URLs are correct</p></li><li><p>verify you saved your changes after entering your URLs</p></li><li><p>make sure the domain and client ID values are imported correctly</p></li><li><p>if using Android, ensure that the manifest placeholders have been set up correctly, otherwise the redirect back to your app may not work</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Add logout to your application {{{ data-action="code" data-code="App.js#16:22" }}}


<p>To log the user out, redirect them to the Auth0 logout endpoint by calling <code>clearSession</code>. This will remove their session from the authorization server and log the user out of the application.</p><p><div class="checkpoint">Expo - Step 7 - Add logout to your application <div class="checkpoint-default"><p>Add a logout button that calls <code>clearSession</code> and observe that you are redirected to the Auth0 logout endpoint and back again. You should no longer be logged in to your application.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not log out successfully:</p><ul><li><p>ensure the Allowed Logout URLs are set properly</p></li><li><p>verify you saved your changes after entering your URLs</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Show user profile information {{{ data-action="code" data-code="App.js#32:34" }}}


<p>The <code>useAuth0</code> hook exposes a <code>user</code> object that contains information about the authenticated user. You can use this to access user profile information about the authenticated user that has been decoded from the <a href="https://auth0.com/docs/secure/tokens/id-tokens">ID token</a>.</p><p>If a user has not been authenticated, this property will be <code>null</code>.</p><p><div class="checkpoint">Expo - Step 8 - Show user profile information <div class="checkpoint-default"><p>Log in and inspect the <code>user</code> property on the result. Verify the current user&#39;s profile information, such as <code>email</code> or <code>name</code>.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>
