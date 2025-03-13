---
title: Add login to your Ionic Vue with Capacitor app
description: This guide demonstrates how to integrate Auth0 with an Ionic (Vue) & Capacitor application using the Auth0 Vue SDK
interactive:  true
files:
 - files/main
 - files/LoginButton
 - files/LogoutButton
 - files/App
 - files/UserProfile
github:
  path: https://github.com/auth0-samples/auth0-ionic-samples/tree/main/vue
locale: en-US
---

# Add login to your Ionic Vue with Capacitor app


<p>Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with an Ionic (Vue) &amp; Capacitor application using the <a href="https://github.com/auth0/auth0-vue">Auth0 Vue SDK</a>. </p><p></p>

## Getting started


<p>This quickstart assumes you already have an <a href="https://ionicframework.com/">Ionic</a> application up and running with <a href="https://capacitorjs.com/">Capacitor</a>. If not, check out the <a href="https://capacitorjs.com/docs/getting-started/with-ionic">Using Capacitor with Ionic Framework guide</a> to get started with a simple app, or clone <a href="https://github.com/auth0-samples/auth0-ionic-samples">our sample apps</a>.</p><p>You should also be familiar with the <a href="https://capacitorjs.com/docs/basics/workflow">Capacitor development workflow</a>.</p>

## Configure Auth0


<p>To use Auth0 services, you need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for your project.</p><p><div class="alert-container" severity="default"><p>Throughout this article, <code>YOUR_PACKAGE_ID</code> is your application&#39;s package ID. This can be found and configured in the <code>appId</code> field in your <code>capacitor.config.ts</code> file. See <a href="https://capacitorjs.com/docs/config#schema">Capacitor&#39;s Config schema</a> for more info.</p></div></p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your application in the <a href="https://manage.auth0.com/#/">Dashboard</a>, which is where you can manage your applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>YOUR_PACKAGE_ID://{yourDomain}/capacitor/YOUR_PACKAGE_ID/callback</code></p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>YOUR_PACKAGE_ID://{yourDomain}/capacitor/YOUR_PACKAGE_ID/callback</code>.</p></div></p><h3>Configure Allowed Origins</h3><p>To be able to make requests from your native application to Auth0, set the following <b>Allowed Origins</b> in your <a href="https://manage.auth0.com/#/applications/{yourClientId}/settings">Application Settings</a>.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>capacitor://localhost, http://localhost</code> for iOS and Android respectively.</p></div></p><p>Lastly, be sure that the <b>Application Type</b> for your application is set to <b>Native</b> in the <a href="https://manage.auth0.com/#/applications/{yourClientId}/settings">Application Settings</a>.</p>

## Install the Auth0 Vue SDK


<p>Run the following command within your project directory to install the Auth0 Vue SDK:</p><p><code>npm install @auth0/auth0-vue</code></p><p>The SDK exposes several types that help you integrate Auth0 with your Vue application idiomatically, including a module and an authentication service.</p><h3>Install Capacitor plugins</h3><p>This quickstart and sample make use of some of Capacitor&#39;s official plugins. Install these into your app using the following command:</p><p>npm install @capacitor/browser @capacitor/app</p><ul><li><p><a href="https://capacitorjs.com/docs/apis/browser"><code>@capacitor/browser</code></a> - allows you to interact with the device&#39;s system browser and is used to open the URL to Auth0&#39;s authorizaction endpoint</p></li><li><p><a href="https://capacitorjs.com/docs/apis/app"><code>@capacitor/app</code></a> - allows you to subscribe to high-level app events, useful for handling callbacks from Auth0</p></li></ul><p><div class="alert-container" severity="default"><p>Capacitor&#39;s Browser plugin on iOS uses <a href="https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller"><code>SFSafariViewController</code></a>, which on iOS 11+ does not share cookies with Safari on the device. This means that <a href="https://auth0.com/docs/sso">SSO</a> will not work on those devices. If you need SSO, please instead use a compatible plugin that uses <a href="https://developer.apple.com/documentation/authenticationservices/aswebauthenticationsession">ASWebAuthenticationSession</a>.</p></div></p>

## Configure the CreateAuht0 plugin {{{ data-action="code" data-code="main.ts" }}}

The SDK exports `createAuth0`, a composable that contains all the services required for the SDK to function. This composable should be registered with your application and be configured with your Auth0 domain and Client ID.

The `createAuth0` composable takes the following configuration:

- `domain`: The `domain` value present under the **Settings** of the application you created in the Auth0 Dashboard, or your custom domain if you are using Auth0's <a href="https://auth0.com/docs/custom-domains" target="_blank" rel="noreferrer">custom domains feature</a>.
- `clientId`: The Client ID value present under the **Settings** of the application you created in the Auth0 Dashboard.
- `useRefreshTokens`: To use auth0-vue with Ionic on Android and iOS, it's required to enable refresh tokens.
- `useRefreshTokensFallback`: To use auth0-vue with Ionic on Android and iOS, it's required to disable the iframe fallback.
- `authorizationParams.redirect_uri`: The URL to redirect your users after they authenticate with Auth0.

<%= include('../_includes/ionic/_note_storage') %>

:::: checkpoint
:::checkpoint-default
Now that you have configured your app with the Auth0 Vue SDK, run your application to verify that the SDK is initializing without error, and that your application runs as it did before.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

- ensure the correct application is selected
- did you save after entering your URLs?
- make sure the domain and Client ID imported correctly

Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" rel="noreferrer">documentation</a> or visit our <a href="https://community.auth0.com" target="_blank" rel="noreferrer">community page</a> to get more help.
:::
::::

## Add login to your application {{{ data-action="code" data-code="LoginButton.vue" }}}


<p>In a Capacitor application, the <a href="https://capacitorjs.com/docs/apis/browser">Capacitor&#39;s Browser plugin</a> performs a redirect to the Auth0 <a href="https://auth0.com/universal-login">Universal Login Page</a>. Set the <code>openUrl</code> parameter on the <code>loginWithRedirect</code> function to use <code>Browser.open</code> so that the URL is opened using the device&#39;s system browser component (<a href="https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller">SFSafariViewController</a> on iOS, and <a href="https://developer.chrome.com/docs/android/custom-tabs">Chrome Custom Tabs</a> on Android).</p><p><div class="alert-container" severity="default"><p>By default, the SDK&#39;s <code>loginWithRedirect</code> method uses <code>window.location.href</code> to navigate to the login page in the default browser application on the user&#39;s device rather than the system browser component appropriate for the platform. The user would leave your application to authenticate and could make for a suboptimal user experience.</p></div></p><p><div class="checkpoint">ionic step 5 checkpoint <div class="checkpoint-default"><p>The <code>loginWithRedirect</code> function tells the SDK to initiate the login flow, using the <code>Browser.open</code> function to open the login URL with the platform&#39;s system browser component by setting the <code>openUrl</code> parameter. This provides a way for your user to log in to your application. Users redirect to the login page at Auth0 and do not receive any errors.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>ensure that there are no errors in the browser&#39;s console window at the point of login</p></li><li><p>ensure the domain and Client ID are correct according to your Auth0 application in the dashboard</p></li><li><p>if you are redirected to Auth0 and receive an error page, check the &quot;technical details&quot; section at the bottom for the reason for the failure</p></li></ul><p></p></div>

  </div></p>

## Handle the login callback {{{ data-action="code" data-code="App.vue" }}}


<p>Once users logs in with the Universal Login Page, they redirect back to your app via a URL with a custom URL scheme. The <code>appUrlOpen</code> event must be handled within your app. You can call the <code>handleRedirectCallback</code> method from the Auth0 SDK to initialize the authentication state.</p><p>You can only use this method on a redirect from Auth0. To verify success, check for the presence of the <code>code</code> and <code>state</code> parameters in the URL.</p><p>The <code>Browser.close()</code> method should close the browser when this event is raised.</p><p><div class="alert-container" severity="default"><p>This article assumes you will be using Custom URL Schemes to handle the callback within your application. To do this, register your <code>YOUR_PACKAGE_ID</code> as a URL scheme for your chosen platform. To learn more, read <a href="https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app">Defining a Custom URL Scheme</a> for iOS, or <a href="https://developer.android.com/training/app-links/deep-linking">Create Deep Links to App Content</a> for Android.</p></div></p><p><div class="checkpoint">ionic step 6 Checkpoint <div class="checkpoint-default"><p>Add the <code>appUrlOpen</code> to your application&#39;s <code>App</code> component setup and log in. The browser window should close once the user authenticates and logs in to your app.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>check that the custom URL scheme is registered for your chosen platform. On iOS, <a href="https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app">define a custom URL scheme</a>, or add an <a href="https://developer.android.com/training/app-links/deep-linking">intent filter with your custom scheme</a> on Android</p></li><li><p>if the event fires but you receive an error, check the <a href="https://manage.auth0.com/#/logs">logs in your Auth0 Dashboard</a> for the reason for the error</p></li></ul><p></p></div>

  </div></p>

## Add logout to your application {{{ data-action="code" data-code="LogoutButton.vue" }}}


<p>Now that users can log in, you need to configure <a href="https://auth0.com/docs/logout/guides/logout-auth0">a way to log out</a>. Users must redirect to the Auth0 logout endpoint in the browser to clear their browser session. Again, Capacitor&#39;s Browser plugin should perform this redirect so that the user does not leave your app and receive a suboptimal experience.</p><p>To achieve this with Ionic and Capacitor in conjunction with the Auth0 SDK:</p><ul><li><p>Construct the URL for your app Auth0 should use to redirect to after logout. This is a URL that uses your registered custom scheme and Auth0 domain. Add it to your <b>Allowed Logout URLs </b>configuration in the Auth0 Dashboard</p></li><li><p>Logout from the SDK by calling <code>logout</code>, and pass your redirect URL back as the <code>logoutParams.returnTo </code>parameter.</p></li><li><p>Set the <code>openUrl </code>parameter to a callback that uses the Capacitor browser plugin to open the URL using <code>Browser.open</code>.</p></li></ul><p><div class="alert-container" severity="default"><p>Similar to the login step, if you do not set <code>openUrl</code> when calling <code>logout</code>, the SDK redirects the user to the logout URL using the default browser application on the device, which provides a suboptimal user experience.</p></div></p><p><div class="checkpoint">ionic step 7 Checkpoint <div class="checkpoint-default"><p>Provide a way for your users to log out of your application. Verify that you redirect to Auth0 and then to the address you specified in the <code>returnTo</code> parameter. Check that you are no longer logged in to your application.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>check that the URL you provided to in the <code>returnTo</code> parameter is registered as an allowed callback URL in your Auth0 Dashboard</p></li></ul><p></p></div>

  </div></p><p></p>

## Show the user profile {{{ data-action="code" data-code="UserProfile.vue" }}}


<p>The Auth0 Vue SDK retrieves the <a href="https://auth0.com/docs/users/concepts/overview-user-profile">user&#39;s profile</a> associated with logged-in users in whatever component you need, such as their name or profile picture, to personalize the user interface. The profile information is available through the <code>user</code> property exposed by the <code>useAuth0()</code> composable.</p><p>Initializing the SDK is asynchronous, and you should guard the user profile by checking the <code>isLoading</code> and <code>user</code> properties. Once <code>isLoading</code> is <code>false</code> and <code>user</code> has a value, the user profile can be used.</p><p><div class="checkpoint">ionic step 8 Checkpoint <div class="checkpoint-default"><p>Provide a way for your users to see their user profile details within the app and verify you are able to retrieve and see your profile information on screen once you have logged in.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>
