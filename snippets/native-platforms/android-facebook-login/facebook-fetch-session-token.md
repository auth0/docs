The sample uses the Facebook SDK's `GraphRequest` class to perform this request.

```kotlin
private fun fetchSessionToken(token: String, callback: (String?) -> Unit) {
    val params = Bundle()
    params.putString("grant_type", "fb_attenuate_token")
    params.putString("fb_exchange_token", token)
    params.putString("client_id", getString(R.string.facebook_app_id))

    val request = GraphRequest()
    request.parameters = params
    request.graphPath = "oauth/access_token"
    request.callback = GraphRequest.Callback { response ->
        if (response.error != null) {
            Log.e(TAG, "Failed to fetch session token. $\{response.error.errorMessage\}")
            callback.invoke(null)
            return@Callback
        }
        val fbSessionToken = response.jsonObject.getString("access_token")
        callback.invoke(fbSessionToken)
    }
    request.executeAsync()
}
```