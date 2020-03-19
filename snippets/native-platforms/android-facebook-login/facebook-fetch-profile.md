```kotlin
private fun fetchUserProfile(token: String, userId: String, callback: (String?) -> Unit) {
    val params = Bundle()
    params.putString("access_token", token)
    params.putString("fields", "first_name,last_name,email")

    val request = GraphRequest()
    request.parameters = params
    request.graphPath = userId
    request.callback = GraphRequest.Callback { response ->
        if (response.error != null) {
            Log.w(TAG, "Failed to fetch user profile: $\{response.error.errorMessage\}")
            callback.invoke(null)
            return@Callback
        }
        callback.invoke(response.rawResponse)
    }
    request.executeAsync()
}
```