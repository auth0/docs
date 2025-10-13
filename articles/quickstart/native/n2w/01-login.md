---
title: Enable Native to Web SSO for iOS and Android Apps
description: Learn how to configure Auth0 Native to Web SSO in your iOS or Android apps using the Auth0 CLI and SDKs.
seo_alias: native-to-web-sso
budicon: 448
topics:
  - quickstarts
  - native
  - web
  - ios
  - android
github:
  path: native-to-web-sso
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD002 MD041 -->

## Configure Auth0

You will need both a **Native** application (for iOS or Android) and a **Web** or **Single Page Application (SPA)** registered in your Auth0 tenant. If you don’t have them already, <a href="/get-started/auth0-overview/create-applications/native-apps" target="_blank" rel="noreferrer">create one</a> before continuing.

### Enable Session Transfer in the Native Application

Use the Auth0 CLI to allow your native app to create session transfer tokens:

```bash
auth0 apps session-transfer set ${account.clientId} \
  --can-create-token=true \
  --enforce-device-binding=asn
```

### Enable Session Transfer in the Web Application

Configure your web or SPA app to accept session transfer tokens via cookie or query string:

```bash
auth0 apps session-transfer set ${account.clientId} \
  --allowed-authentication-methods=cookie,query
```

::: note
To support cookie injection, use a WebView that allows setting secure cookies such as WKWebView on iOS or Android WebView. If not supported, you can use the query string method.
:::

## Exchange a Refresh Token for a Session Transfer Token

This action should happen right before you launch a WebView or external browser.

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

## Handle Session Transfer in the Web Application

In cookie-based flows, your app doesn’t need to change. Just make sure your <strong>Application Login URI</strong> points to a route that redirects to Auth0’s `/authorize` endpoint.

If using query string method:

```javascript
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email',
  }
};

app.use((req, res, next) => {
  const { session_transfer_token } = req.query;

  if (session_transfer_token) {
    config.authorizationParams.session_transfer_token = session_transfer_token;
  }

  auth(config)(req, res, next);
});
```

::: note
You can configure your Application Login URI in your application's settings in the Auth0 Dashboard.
:::
