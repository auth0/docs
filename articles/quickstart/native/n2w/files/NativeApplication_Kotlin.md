---
name: android.kt
language: kotlin
---

```kotlin
import android.app.Activity
import android.util.Log
import android.webkit.CookieManager
import android.webkit.WebView

fun launchWebSSO(context: Activity) {
    authentication
        .ssoExchange("refresh_token")
        .start(object : Callback<SSOCredentials, AuthenticationException> {
            override fun onSuccess(result: SSOCredentials) {
                val cookieManager = CookieManager.getInstance()
                val cookieValue = "auth0_session_transfer_token=" + result.sessionTransferToken +
                    "; Path=/; Secure; HttpOnly; SameSite=None"
                cookieManager.setAcceptCookie(true)
                cookieManager.setCookie("${account.namespace}", cookieValue)

                val webView = WebView(context)
                webView.settings.javaScriptEnabled = true
                webView.loadUrl("https://yourWebApplicationLoginURI")

                context.runOnUiThread {
                    context.setContentView(webView)
                }
            }

            override fun onFailure(exception: AuthenticationException) {
                Log.e("Auth0", "Failed to get session transfer token", exception)
            }
        })
}
```
