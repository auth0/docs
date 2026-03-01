---
name: fetchSessionToken
language: kotlin
---
    
```kotlin
private fun fetchSessionToken(token: String, callback: SimpleCallback<String>) {
        val params = Bundle().apply {
            putString("grant_type", "fb_attenuate_token")
            putString("fb_exchange_token", token)
            putString("client_id", getString(R.string.facebook_app_id))
        }

        val request = GraphRequest().apply {
            parameters = params
            graphPath = "oauth/access_token"
        }

        request.callback = GraphRequest.Callback { response ->
            if (response.error != null) {
                callback.onError(response.error?.exception!!)
                return@Callback
            }

            try {
                val fbSessionToken = response.jsonObject!!.getString("access_token")
                callback.onResult(fbSessionToken)
            } catch (jsonException: JSONException) {
                //Failed to parse session token
                callback.onError(jsonException)
            }
        }
        request.executeAsync()
    }
```
