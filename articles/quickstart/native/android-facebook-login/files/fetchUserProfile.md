---
name: fetchUserProfile
language: kotlin
---
    
```kotlin
private fun fetchUserProfile(token: String, userId: String, callback: SimpleCallback<String>) {

        val params = Bundle().apply {
            putString("access_token", token)
            putString("fields", "first_name,last_name,email")
        }

        val request = GraphRequest().apply {
            parameters = params
            graphPath = userId
        }

        request.callback = GraphRequest.Callback { response ->
            val error = response.error
            if (error != null) {
                //Failed to fetch user profile
                callback.onError(error.exception!!)
                return@Callback
            }
            //Handle back the profile as received
            callback.onResult(response.rawResponse!!)
        }

        request.executeAsync()
    }
```
