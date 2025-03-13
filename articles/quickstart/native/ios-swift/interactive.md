---
title: Add Login to Your iOS or macOS Application
description: This guide demonstrates how to integrate Auth0 with any iOS / macOS app using the Auth0.swift SDK.
interactive:  true
files:
 - files/Auth0
 - files/MainView
 - files/ProfileView
 - files/User
github:
  path: https://github.com/auth0-samples/auth0-ios-swift-sample/tree/master/Sample-01
locale: en-US
---

# Add Login to Your iOS or macOS Application


<p>This guide demonstrates how to add authentication and access user profile information in any iOS / macOS app using the <a href="https://github.com/auth0/Auth0.swift">Auth0.swift</a> SDK.</p><p>To use this quickstart, you need to:</p><ul><li><p>Sign up for a free Auth0 account or log in to Auth0.</p></li><li><p>Have an existing iOS / macOS app that you want to integrate. Alternatively, you can view or download a sample app after logging in.</p></li></ul><p></p><p></p>

## Configure Auth0


<p>To use Auth0 services, you need an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the app you are developing.</p><h3>Configure an Auth0 application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing <b>Native</b> Auth0 application. Auth0 assigns every application an alphanumeric, unique Client ID that your app uses to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart automatically update your Auth0 application in the <a href="https://manage.auth0.com/#/">Dashboard</a>, which is where you can manage your applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample app instead.</p><h3>Configure callback and logout URLs</h3><p>Auth0 invokes the callback and logout URLs to redirect users back to your app. Auth0 invokes the callback URL after authenticating the user and the logout URL after removing the session cookie. If you do not set the callback and login URLs, users will not be able to log in and out of the app, and your app will produce an error.</p><p><div class="alert-container" severity="default"><p>On iOS 17.4+ and macOS 14.4+ it is possible to use Universal Links as callback and logout URLs. When enabled, Auth0.swift will fall back to using a custom URL scheme on older iOS / macOS versions.</p><p><b>This feature requires Xcode 15.3+ and a paid Apple Developer account.</b></p></div></p><p>Add the following URLs to <b>Callback URLs</b> and <b>Logout URLs</b>, depending on the platform of your app. If you have a <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-en-US">custom domain</a>, use this instead of your Auth0 tenant’s domain.</p><h4>iOS</h4><p><pre><code>https://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback,

YOUR_BUNDLE_IDENTIFIER://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback

</code></pre>

</p><h4>macOS</h4><p><pre><code>https://${account.namespace}/macos/YOUR_BUNDLE_IDENTIFIER/callback,

YOUR_BUNDLE_IDENTIFIER://${account.namespace}/macos/YOUR_BUNDLE_IDENTIFIER/callback

</code></pre>

</p><p>For example, if your iOS bundle identifier was <code>com.example.MyApp</code> and your Auth0 domain was <code>example.us.auth0.com</code>, then this value would be:</p><p><pre><code>https://example.us.auth0.com/ios/com.example.MyApp/callback,

com.example.MyApp://example.us.auth0.com/ios/com.example.MyApp/callback
```

### Configure the associated domain

::: warning
This step requires a paid Apple Developer account. It is needed to use Universal Links as callback and logout URLs. Skip this step to use a custom URL scheme instead.
:::

#### Configure the Team ID and bundle identifier

Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings" target="_blank" rel="noreferrer">settings page</a> of your Auth0 application, scroll to the end, and open **Advanced Settings > Device Settings**. In the **iOS** section, set **Team ID** to your <a href="https://developer.apple.com/help/account/manage-your-team/locate-your-team-id/" target="_blank" rel="noreferrer">Apple Team ID</a>, and **App ID** to your app's bundle identifier.

<p><img src="/media/articles/native-platforms/ios-swift/ios-device-settings.png" alt="Screenshot of the iOS section inside the Auth0 application settings page"></p>

This will add your app to your Auth0 tenant's `apple-app-site-association` file.

#### Add the associated domain capability

In Xcode, go to the **Signing and Capabilities** <a href="https://developer.apple.com/documentation/xcode/adding-capabilities-to-your-app#Add-a-capability" target="_blank" rel="noreferrer">tab</a> of your app's target settings, and press the **+ Capability** button. Then select **Associated Domains**.

<p><img src="/media/articles/native-platforms/ios-swift/ios-xcode-capabilities.png" alt="Screenshot of the capabilities library inside Xcode"></p>

Next, add the following <a href="https://developer.apple.com/documentation/xcode/configuring-an-associated-domain#Define-a-service-and-its-associated-domain" target="_blank" rel="noreferrer">entry</a> under **Associated Domains**:

```text
webcredentials:${account.namespace}
```

If you have a <a href="/customize/custom-domains" target="_blank" rel="noreferrer">custom domain</a>, use this instead of your Auth0 tenant’s domain.

::: note
For the associated domain to work, your app must be signed with your team certificate **even when building for the iOS simulator**. Make sure you are using the Apple Team whose Team ID is configured in the settings page of your Auth0 application.
:::

## Install the SDK


<h3>Using the Swift Package Manager</h3><p>Open the following menu item in Xcode:</p><p><b>File &gt; Add Package Dependencies...</b></p><p>In the <b>Search or Enter Package URL</b> search box enter this URL:</p><p><pre><code>https://github.com/auth0/Auth0.swift

</code></pre>

</p><p>Then, select the dependency rule and press <b>Add Package</b>.</p><p><div class="alert-container" severity="default"><p>For further reference on SPM, check its <a href="https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app">official documentation</a>.</p></div></p><h3>Using Cocoapods</h3><p>Add the following line to your <code>Podfile</code>:</p><p><pre><code class="language-ruby">pod 'Auth0', '~&gt; 2.0'

</code></pre>

</p><p>Then, run <code>pod install</code>. </p><p><div class="alert-container" severity="default"><p>For further reference on Cocoapods, check their <a href="https://guides.cocoapods.org/using/getting-started.html">official documentation</a>.</p></div></p><h3>Using Carthage</h3><p>Add the following line to your <code>Cartfile</code>:</p><p><pre><code class="language-swift">github &quot;auth0/Auth0.swift&quot; ~&gt; 2.0

</code></pre>

</p><p>Then, run <code>carthage bootstrap --use-xcframeworks</code>.</p><p><div class="alert-container" severity="default"><p>For further reference on Carthage, check their <a href="https://github.com/Carthage/Carthage#getting-started">official documentation</a>.</p><p></p></div></p>

## Configure the SDK {{{ data-action="code" data-code="Auth0.plist" }}}


<p>The Auth0.swift SDK needs your Auth0 <b>domain</b> and <b>Client ID</b>. You can find these values in the <a href="https://manage.auth0.com/dashboard/us/#/applications/">settings page</a> of your Auth0 application.</p><ul><li><p><b>domain</b>: The domain of your Auth0 tenant. If you have a <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-en-US">custom domain</a>, use this instead of your Auth0 tenant’s domain.</p></li><li><p><b>Client ID</b>: The alphanumeric, unique ID of the Auth0 application you set up earlier in this quickstart.</p></li></ul><p>Create a <code>plist</code> file named <code>Auth0.plist</code> in your app bundle containing the Auth0 domain and Client ID values.</p><p><div class="alert-container" severity="default"><p>You can also configure the SDK programmatically. Check the <a href="https://github.com/auth0/Auth0.swift#configure-client-id-and-domain-programmatically">README</a> to learn more.</p></div></p><p><div class="checkpoint">iOS Swift Quickstart - Step 3 Checkpoint <div class="checkpoint-default"><p>You configured the Auth0.swift SDK. Run your app to verify that it is not producing any errors related to the SDK.</p></div>

  <div class="checkpoint-success"></div>

### Using Carthage

Add the following line to your `Cartfile`:

```text
github "auth0/Auth0.swift" ~> 2.0
```

Then, run `carthage bootstrap --use-xcframeworks`.

::: note
For further reference on Carthage, check their <a href="https://github.com/Carthage/Carthage#getting-started" target="_blank" rel="noreferrer">official documentation</a>.
:::

## Configure the SDK {{{ data-action=code data-code="Auth0.plist" }}}

The Auth0.swift SDK needs your Auth0 **domain** and **Client ID**. You can find these values in the <a href="${manage_url}/#/applications/${account.clientId}/settings" target="_blank" rel="noreferrer">settings page</a> of your Auth0 application.

- **domain**: The domain of your Auth0 tenant. If you have a <a href="/customize/custom-domains" target="_blank" rel="noreferrer">custom domain</a>, use this instead of your Auth0 tenant’s domain.
- **Client ID**: The alphanumeric, unique ID of the Auth0 application you set up earlier in this quickstart.

Create a `plist` file named `Auth0.plist` in your app bundle containing the Auth0 domain and Client ID values. 

::: note
You can also configure the SDK programmatically. Check the <a href="https://github.com/auth0/Auth0.swift#configure-client-id-and-domain-programmatically" target="_blank" rel="noreferrer">README</a> to learn more.
:::

::::checkpoint
:::checkpoint-default
You configured the Auth0.swift SDK. Run your app to verify that it is not producing any errors related to the SDK.
:::

:::checkpoint-failure
If your app produces errors related to the SDK:
- Make sure you selected the correct Auth0 application
- Verify you saved your URL updates
- Ensure you set the Auth0 domain and Client ID correctly

Still having issues? Check out our <a href="https://github.com/auth0/Auth0.swift#documentation" target="_blank" rel="noreferrer">documentation</a> or visit our <a href="https://community.auth0.com" target="_blank" rel="noreferrer">community page</a> to get more help.
:::
::::

## Add login to your application {{{ data-action="code" data-code="MainView.swift#20:31" }}}


<p>Import the <code>Auth0</code> module in the file where you want to present the login page. Then, present the <a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-en-US">Universal Login</a> page in the action of your <b>Login</b> button.</p><p><div class="alert-container" severity="default"><p>You can use async/await or Combine instead of the callback-based API. Check the <a href="https://github.com/auth0/Auth0.swift#web-auth-login-ios--macos">README</a> to learn more.</p></div></p><img src="//images.ctfassets.net/cdy7uua7fh8z/3ZRDXpjlUXEcQpXq6Q00L1/789d583affd1f09621dc59ae49b4060c/login-ios.png" alt="An example Universal Login screen for an iOS app" /><p><div class="checkpoint">iOS Swift Quickstart - Step 4 Checkpoint <div class="checkpoint-default"><p>Press the <b>Login</b> button and verify that:</p><ul><li><p>An <a href="https://github.com/auth0/Auth0.swift#sso-alert-box-ios--macos">alert box</a> shows up asking for consent.</p></li><li><p>Choosing <b>Continue </b>opens the Universal Login page in a Safari modal.</p></li><li><p>You can log in or sign up using a username and password or a social provider.</p></li><li><p>The Safari modal closes automatically afterward. </p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If login fails or produces errors:</p><ul><li><p>Verify you entered the correct callback URL</p></li><li><p>Ensure you set the Auth0 domain and Client ID correctly</p></li></ul><p>Still having issues? Check out our <a href="https://github.com/auth0/Auth0.swift#documentation">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p><p></p>

## Add logout to your application {{{ data-action="code" data-code="MainView.swift#34:45" }}}


<p>Now that you can log in to your app, you need a way to <a href="https://auth0.com/docs/authenticate/login/logout">log out</a>. In the action of your <b>Logout</b> button, call the <code>clearSession()</code> method to clear the Universal Login session cookie.</p><p><div class="checkpoint">iOS Swift Quickstart - Step 5 Checkpoint <div class="checkpoint-default"><p>Press the <b>Logout</b> button and verify that:</p><ul><li><p>An alert box shows up asking for consent.</p></li><li><p>Choosing <b>Continue </b>opens a page in a Safari modal.</p></li><li><p>The Safari modal closes automatically soon after.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If logout fails or produces errors:</p><ul><li><p>Verify you entered the correct callback URL</p></li><li><p>Ensure you set the Auth0 domain and Client ID correctly</p></li></ul><p>Still having issues? Check out our <a href="https://github.com/auth0/Auth0.swift#documentation">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Access user profile information {{{ data-action="code" data-code="User.swift#11:14" }}}


<p>The <code>Credentials</code> instance you obtained after logging in includes an <a data-contentfulid="7eGepxAjz89d1F7i1aP4ch-en-US">ID token</a>. The ID token contains the profile information associated with the logged-in user, such as their email and profile picture. You can use these details to personalize the user interface of your app.</p><p>The Auth0.swift SDK includes a <a href="https://github.com/auth0/JWTDecode.swift">utility</a> for decoding <a href="https://jwt.io/">JWTs</a> like the ID token. Start by importing the <code>JWTDecode</code> module in the file where you want to access the user profile information. Then, use the <code>decode(jwt:)</code> method to decode the ID token and access the claims it contains.</p><p><div class="alert-container" severity="default"><p>You can retrieve the latest user information with the <code>userInfo(withAccessToken:)</code> method. Check the <a href="https://github.com/auth0/Auth0.swift/blob/master/EXAMPLES.md#retrieve-user-information">EXAMPLES</a> to learn more.</p></div></p><p><div class="checkpoint">iOS Swift Quickstart - Step 6 Checkpoint <div class="checkpoint-default"><p>Verify that you can access the <code>email</code>, <code>picture</code>, or any other <a data-contentfulid="2dKoj5wVle1Wz3mWrrQ2Dr">claim</a> after you have logged in.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If you cannot access the user information:</p><ul><li><p>Verify you imported the <code>JWTDecode</code> module where you invoke the <code>decode(jwt:)</code> method</p></li><li><p>Make sure you spelled your claims correctly</p></li></ul><p>Still having issues? Check out our <a href="https://github.com/auth0/Auth0.swift#documentation">documentation</a> or visit our <a href="https://community.auth0.com/">community forums</a> to get more help.</p></div>

  </div></p>
