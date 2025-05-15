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
  path: Sample-01
locale: en-US
---

# Add Login to Your iOS or macOS Application


<p>This guide demonstrates how to add authentication and access user profile information in any iOS / macOS app using the <a href="https://github.com/auth0/Auth0.swift" target="_blank" rel="noreferrer noopener">Auth0.swift</a> SDK.</p><p>To use this quickstart, you need to:</p><ul><li><p>Sign up for a free Auth0 account or log in to Auth0.</p></li><li><p>Have an existing iOS / macOS app that you want to integrate. Alternatively, you can view or download a sample app after logging in.</p></li></ul><p></p><p></p>

## Configure Auth0


<p>To use Auth0 services, you need an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the app you are developing.</p><h3>Configure an Auth0 application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing <b>Native</b> Auth0 application. Auth0 assigns every application an alphanumeric, unique Client ID that your app uses to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart automatically update your Auth0 application in the <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, which is where you can manage your applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample app instead.</p><h3>Configure callback and logout URLs</h3><p>Auth0 invokes the callback and logout URLs to redirect users back to your app. Auth0 invokes the callback URL after authenticating the user and the logout URL after removing the session cookie. If you do not set the callback and login URLs, users will not be able to log in and out of the app, and your app will produce an error.</p><p><div class="alert-container" severity="default"><p>On iOS 17.4+ and macOS 14.4+ it is possible to use Universal Links as callback and logout URLs. When enabled, Auth0.swift will fall back to using a custom URL scheme on older iOS / macOS versions.</p><p><b>This feature requires Xcode 15.3+ and a paid Apple Developer account.</b></p></div></p><p>Add the following URLs to <b>Callback URLs</b> and <b>Logout URLs</b>, depending on the platform of your app. If you have a <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-en-US">custom domain</a>, use this instead of your Auth0 tenant’s domain.</p><h4>iOS</h4><p><pre><code>https://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback,

YOUR_BUNDLE_IDENTIFIER://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback

</code></pre>

</p><h4>macOS</h4><p><pre><code>https://${account.namespace}/macos/YOUR_BUNDLE_IDENTIFIER/callback,

YOUR_BUNDLE_IDENTIFIER://${account.namespace}/macos/YOUR_BUNDLE_IDENTIFIER/callback

</code></pre>

</p><p>For example, if your iOS bundle identifier was <code>com.example.MyApp</code> and your Auth0 domain was <code>example.us.auth0.com</code>, then this value would be:</p><p><pre><code>https://example.us.auth0.com/ios/com.example.MyApp/callback,

com.example.MyApp://example.us.auth0.com/ios/com.example.MyApp/callback

</code></pre>

</p><h3>Configure the associated domain</h3><p><div class="alert-container" severity="warning"><p>This step requires a paid Apple Developer account. It is needed to use Universal Links as callback and logout URLs. Skip this step to use a custom URL scheme instead.</p></div></p><h4>Configure the Team ID and bundle identifier</h4><p>Go to the <a href="https://manage.auth0.com/dashboard/us/#/applications/" target="_blank" rel="noreferrer noopener">settings page</a> of your Auth0 application, scroll to the end, and open <b>Advanced Settings &gt; Device Settings</b>. In the <b>iOS</b> section, set <b>Team ID</b> to your <a href="https://developer.apple.com/help/account/manage-your-team/locate-your-team-id/" target="_blank" rel="noreferrer noopener">Apple Team ID</a> and <b>App ID</b> to your app&#39;s bundle identifier.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/62v9bB3bUVMw9XLND5lcMI/d7b81872d8b442a36bcdc412384c14b7/IOS_Settings_-_English.png" alt="Auth0 Dashboard> Applications > Applications > [Native App] > Settings tab > Advanced Settings > Device Settings tab" /><p>This will add your app to your Auth0 tenant&#39;s <code>apple-app-site-association</code> file.</p><h4>Add the associated domain capability</h4><p>In Xcode, go to the <b>Signing and Capabilities</b> <a href="https://developer.apple.com/documentation/xcode/adding-capabilities-to-your-app#Add-a-capability" target="_blank" rel="noreferrer noopener">tab</a> of your app&#39;s target settings, and press the <b>+ Capability</b> button. Then select <b>Associated Domains</b>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/72eVE104zKB5Q4NPnx6MCa/66c81ee64f104583bd00b9916778f989/ios-xcode-capabilities.png" alt="Xcode> Signing and Capabilities tab > Add New > Associated Domains" /><p>Next, add the following <a href="https://developer.apple.com/documentation/xcode/configuring-an-associated-domain#Define-a-service-and-its-associated-domain" target="_blank" rel="noreferrer noopener">entry</a> under <b>Associated Domains</b>:</p><p><pre><code>webcredentials:labs-fundtraining.us.auth0.com

</code></pre>

</p><p>If you have a <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-en-US">custom domain</a>, use this instead of your Auth0 tenant’s domain.</p><p><div class="alert-container" severity="default"><p>For the associated domain to work, your app must be signed with your team certificate <b>even when building for the iOS simulator</b>. Make sure you are using the Apple Team whose Team ID is configured in the settings page of your Auth0 application.</p></div></p>

## Install the SDK


<h3>Using the Swift Package Manager</h3><p>Open the following menu item in Xcode:</p><p><b>File &gt; Add Package Dependencies...</b></p><p>In the <b>Search or Enter Package URL</b> search box enter this URL:</p><p><pre><code>https://github.com/auth0/Auth0.swift

</code></pre>

</p><p>Then, select the dependency rule and press <b>Add Package</b>.</p><p><div class="alert-container" severity="default"><p>For further reference on SPM, check its <a href="https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app" target="_blank" rel="noreferrer noopener">official documentation</a>.</p></div></p><h3>Using Cocoapods</h3><p>Add the following line to your <code>Podfile</code>:</p><p><pre><code class="language-ruby">pod 'Auth0', '~&gt; 2.0'

</code></pre>

</p><p>Then, run <code>pod install</code>. </p><p><div class="alert-container" severity="default"><p>For further reference on Cocoapods, check their <a href="https://guides.cocoapods.org/using/getting-started.html" target="_blank" rel="noreferrer noopener">official documentation</a>.</p></div></p><h3>Using Carthage</h3><p>Add the following line to your <code>Cartfile</code>:</p><p><pre><code class="language-swift">github &quot;auth0/Auth0.swift&quot; ~&gt; 2.0

</code></pre>

</p><p>Then, run <code>carthage bootstrap --use-xcframeworks</code>.</p><p><div class="alert-container" severity="default"><p>For further reference on Carthage, check their <a href="https://github.com/Carthage/Carthage#getting-started" target="_blank" rel="noreferrer noopener">official documentation</a>.</p><p></p></div></p>

## Configure the SDK {{{ data-action="code" data-code="Auth0.plist" }}}


<p>The Auth0.swift SDK needs your Auth0 <b>domain</b> and <b>Client ID</b>. You can find these values in the <a href="https://manage.auth0.com/dashboard/us/#/applications/" target="_blank" rel="noreferrer noopener">settings page</a> of your Auth0 application.</p><ul><li><p><b>domain</b>: The domain of your Auth0 tenant. If you have a <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-en-US">custom domain</a>, use this instead of your Auth0 tenant’s domain.</p></li><li><p><b>Client ID</b>: The alphanumeric, unique ID of the Auth0 application you set up earlier in this quickstart.</p></li></ul><p>Create a <code>plist</code> file named <code>Auth0.plist</code> in your app bundle containing the Auth0 domain and Client ID values.</p><p><div class="alert-container" severity="default"><p>You can also configure the SDK programmatically. Check the <a href="https://github.com/auth0/Auth0.swift#configure-client-id-and-domain-programmatically" target="_blank" rel="noreferrer noopener">README</a> to learn more.</p></div></p><p><div class="checkpoint">iOS Swift Quickstart - Step 3 Checkpoint <div class="checkpoint-default"><p>You configured the Auth0.swift SDK. Run your app to verify that it is not producing any errors related to the SDK.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your app produces errors related to the SDK:</p><ul><li><p>Make sure you selected the correct Auth0 application</p></li><li><p>Verify you saved your URL updates</p></li><li><p>Ensure you set the Auth0 domain and Client ID correctly</p></li></ul><p>Still having issues? Check out our <a href="https://github.com/auth0/Auth0.swift#documentation" target="_blank" rel="noreferrer noopener">documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p><p></p>

## Add login to your application {{{ data-action="code" data-code="MainView.swift#20:31" }}}


<p>Import the <code>Auth0</code> module in the file where you want to present the login page. Then, present the <a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-en-US">Universal Login</a> page in the action of your <b>Login</b> button.</p><p><div class="alert-container" severity="default"><p>You can use async/await or Combine instead of the callback-based API. Check the <a href="https://github.com/auth0/Auth0.swift#web-auth-login-ios--macos" target="_blank" rel="noreferrer noopener">README</a> to learn more.</p></div></p><img src="//images.ctfassets.net/cdy7uua7fh8z/3ZRDXpjlUXEcQpXq6Q00L1/789d583affd1f09621dc59ae49b4060c/login-ios.png" alt="An example Universal Login screen for an iOS app" /><p><div class="checkpoint">iOS Swift Quickstart - Step 4 Checkpoint <div class="checkpoint-default"><p>Press the <b>Login</b> button and verify that:</p><ul><li><p>An <a href="https://github.com/auth0/Auth0.swift#sso-alert-box-ios--macos" target="_blank" rel="noreferrer noopener">alert box</a> shows up asking for consent.</p></li><li><p>Choosing <b>Continue </b>opens the Universal Login page in a Safari modal.</p></li><li><p>You can log in or sign up using a username and password or a social provider.</p></li><li><p>The Safari modal closes automatically afterward. </p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If login fails or produces errors:</p><ul><li><p>Verify you entered the correct callback URL</p></li><li><p>Ensure you set the Auth0 domain and Client ID correctly</p></li></ul><p>Still having issues? Check out our <a href="https://github.com/auth0/Auth0.swift#documentation" target="_blank" rel="noreferrer noopener">documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p><p></p>

## Add logout to your application {{{ data-action="code" data-code="MainView.swift#34:45" }}}


<p>Now that you can log in to your app, you need a way to <a href="https://auth0.com/docs/authenticate/login/logout" target="_blank" >log out</a>. In the action of your <b>Logout</b> button, call the <code>clearSession()</code> method to clear the Universal Login session cookie.</p><p><div class="checkpoint">iOS Swift Quickstart - Step 5 Checkpoint <div class="checkpoint-default"><p>Press the <b>Logout</b> button and verify that:</p><ul><li><p>An alert box shows up asking for consent.</p></li><li><p>Choosing <b>Continue </b>opens a page in a Safari modal.</p></li><li><p>The Safari modal closes automatically soon after.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If logout fails or produces errors:</p><ul><li><p>Verify you entered the correct callback URL</p></li><li><p>Ensure you set the Auth0 domain and Client ID correctly</p></li></ul><p>Still having issues? Check out our <a href="https://github.com/auth0/Auth0.swift#documentation" target="_blank" rel="noreferrer noopener">documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Access user profile information {{{ data-action="code" data-code="User.swift#11:14" }}}


<p>The <code>Credentials</code> instance you obtained after logging in includes an <a data-contentfulid="7eGepxAjz89d1F7i1aP4ch-en-US">ID token</a>. The ID token contains the profile information associated with the logged-in user, such as their email and profile picture. You can use these details to personalize the user interface of your app.</p><p>The Auth0.swift SDK includes a <a href="https://github.com/auth0/JWTDecode.swift" target="_blank" rel="noreferrer noopener">utility</a> for decoding <a href="https://jwt.io/" target="_blank" rel="noreferrer noopener">JWTs</a> like the ID token. Start by importing the <code>JWTDecode</code> module in the file where you want to access the user profile information. Then, use the <code>decode(jwt:)</code> method to decode the ID token and access the claims it contains.</p><p><div class="alert-container" severity="default"><p>You can retrieve the latest user information with the <code>userInfo(withAccessToken:)</code> method. Check the <a href="https://github.com/auth0/Auth0.swift/blob/master/EXAMPLES.md#retrieve-user-information" target="_blank" rel="noreferrer noopener">EXAMPLES</a> to learn more.</p></div></p><p><div class="checkpoint">iOS Swift Quickstart - Step 6 Checkpoint <div class="checkpoint-default"><p>Verify that you can access the <code>email</code>, <code>picture</code>, or any other <a data-contentfulid="2dKoj5wVle1Wz3mWrrQ2Dr-en-US">claim</a> after you have logged in.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If you cannot access the user information:</p><ul><li><p>Verify you imported the <code>JWTDecode</code> module where you invoke the <code>decode(jwt:)</code> method</p></li><li><p>Make sure you spelled your claims correctly</p></li></ul><p>Still having issues? Check out our <a href="https://github.com/auth0/Auth0.swift#documentation" target="_blank" rel="noreferrer noopener">documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community forums</a> to get more help.</p></div>

  </div></p>
