---
name: swift.swift
language: swift
---

```swift
import SwiftUI
import Auth0
import WebKit

struct MainView: View {
    var body: some View {
        Button("Open Web Session", action: self.launchWebSSO)
    }

    func launchWebSSO() {
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
    }
}
```
