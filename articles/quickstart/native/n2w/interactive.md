---
title: Enable Native to Web SSO for iOS and Android Apps
description: Learn how to configure Auth0 Native to Web SSO in your iOS or Android apps using the Auth0 CLI and SDKs.
interactive: true
locale: en-US
files:
 - files/NativeApplication_Kotlin
 - files/NativeApplication_ReactNative
 - files/NativeApplication_Swift
 - files/WebApplication_Node
 - files/SinglePageApplication_React
---

# Enable Native to Web SSO for iOS and Android Apps (Beta)

<p>This guide demonstrates how to integrate Auth0 Native to Web Single Sign-On (SSO) with existing iOS or Android applications using the Auth0 CLI and supported SDKs.</p>

<p>We recommend that you <a href="https://auth0.com/login">log in</a> to follow this quickstart with examples configured for your Auth0 tenant.</p>

## Prerequisites

<p>To continue with this quickstart, we recommend completing the <a href="https://auth0.com/docs/quickstart/native/ios-swift/interactive">iOS Swift Quickstart</a> or <a href="https://auth0.com/docs/quickstart/native/android/interactive"> Android Quickstart</a>.</p>

<p>To successfully enable Native to Web SSO, your mobile application must:</p>
<ul>
  <li>Be able to authenticate users with Auth0.</li>
  <li>Be able to request a <code>refresh_token</code> as part of the login flow.</li>
</ul>

<div class="alert-container" severity="default">
<p>This quickstart uses the <a href="https://github.com/auth0/auth0-cli">Auth0 CLI</a> to configure your Auth0 tenant. You may also use the <a href="https://auth0.com/docs/api/management/v2">Auth0 Management API</a>. For more details, see <a href="#">Configure Native to Web SSO</a>.</p>
</div>

## Configure Auth0 CLI

<p>Start by authenticating to your Auth0 tenant using the Auth0 CLI:</p>

<pre><code class="language-bash">auth0 login</code></pre>

<p>When prompted:</p>

<pre><code>How would you like to authenticate?
> As a user
  As a machine
</code></pre>

<p>Choose <strong>As a user</strong> and follow the login flow. Select the Auth0 tenant where you want to enable Native to Web SSO.</p>

## Configure Auth0

### Enable Session Transfer Token in the Native Application

<p>Native to Web SSO uses a <code>session_transfer_token</code> to establish SSO from a native app to a web app.</p>

<p>This token allows Auth0 to identify the user, the native origin app, and additional context securely. For more details, refer to the <a href="#">Native to Web SSO documentation</a>.</p>

<p>Use the Auth0 CLI to enable your native application to generate session transfer tokens:</p>

<pre><code class="language-bash">auth0 apps session-transfer set ${account.clientId} \
  --can-create-token=true \
  --enforce-device-binding=asn</code></pre>

### Enable Session Transfer Authentication in the Web Application

<p>Configure the web application to accept the <code>session_transfer_token</code> for authentication using either cookie or URL parameter:</p>

<pre><code class="language-bash">auth0 apps session-transfer set ${account.clientId} \
  --allowed-authentication-methods=cookie,query</code></pre>

<p>This enables the native application to inject the token into a WebView using a cookie or append it as a URL parameter.</p>

<div class="alert-container" severity="info">
<p>To test Native to Web SSO on mobile, use a WebView that supports cookie injection (e.g., Android WebView or iOS WKWebView) or append the token as a query string to the login URI if your WebView don't support cookie injection.</p>
</div>

## Configure the Native Application {{{ data-action="code" data-code="android" }}}

<p>Once your native app has obtained a <code>refresh_token</code>, it must exchange it for a <code>session_transfer_token</code> <strong>immediately before launching the web session</strong>. This token is short-lived (60 seconds), so it should be generated as close as possible to when the WebView or browser is opened.</p>

<p>We recommend placing the session transfer exchange and WebView launch logic inside the same event handler — such as a button’s <code>onClick</code> method. This ensures the token is valid and avoids timing issues.</p>

<p>The code demonstrates how to pass the <code>session_transfer_token</code> to your web application using a cookie. This method requires WebViews or browsers that support cookie injection. If your platform or WebView does not support cookies, you can instead append the token as a query parameter to the login URL.</p>

```swift

 Auth0
            .authentication()
            .ssoExchange(withRefreshToken: refreshToken)
            .start { result in
                switch result {
                case .success(let ssoCredentials):
                    DispatchQueue.main.async {
                        let cookie = HTTPCookie(properties: [
                            .domain: "${account.namespace}",
                            .path: "/",
                            .name: "auth0_session_transfer_token",
                            .value: ssoCredentials.sessionTransferToken,
                            .expires: ssoCredentials.expiresIn,
                            .secure: true
                        ])!

                        let webView = WKWebView()
                        let store = webView.configuration.websiteDataStore.httpCookieStore
                        store.setCookie(cookie) {
                            let url = URL(string: "https://yourWebApplicationLoginURI")!
                            let request = URLRequest(url: url)
                            webView.load(request)

                            let vc = UIViewController()
                            vc.view = webView
                            UIApplication.shared.windows.first?.rootViewController?.present(vc, animated: true)
                        }
                    }
                case .failure(let error):
                    print("Failed to get SSO token: \(error)")
                }
            }

```

## Configure the Web Application {{{ data-action="code" data-code="react" }}}

<p>To support Native to Web SSO, your web application must be prepared to handle a <code>session_transfer_token</code> received via either a cookie or a URL parameter.</p>

<p>If the token is injected into the browser via a cookie—as shown in the native app examples—then no changes to your web application are required. The only requirement is that the browser navigates to your <strong>Application Login URI</strong>, which should handle redirecting the user to your Auth0 tenant’s <code>/authorize</code> endpoint.</p>

<div class="alert-container" severity="info">
<p>You can configure the <strong>Application Login URI</strong> in your application's settings within the Auth0 Dashboard. This is the route Auth0 will redirect users to when initiating login from external sources.</p>
</div>

<p>In the sample below, we show how to handle URL-based session transfer tokens. This is not needed for cookie-based flows, but it helps illustrate how URL-based SSO would be handled as well.</p>

```js

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email',
  }
};

// Middleware that supports session_transfer_token via query parameter
app.use((req, res, next) => {
  const { session_transfer_token } = req.query;

  if (session_transfer_token) {
    config.authorizationParams.session_transfer_token = session_transfer_token;
  }

  auth(config)(req, res, next);
});

```
