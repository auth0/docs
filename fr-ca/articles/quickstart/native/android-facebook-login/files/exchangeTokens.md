---
name: exchangeTokens
language: kotlin
---
    
```kotlin
private fun exchangeTokens(
        sessionToken: String,
        userProfile: String,
        callback: SimpleCallback<Credentials>
    ) {
        val params = mapOf("user_profile" to userProfile)
        apiClient.loginWithNativeSocialToken(sessionToken, FACEBOOK_SUBJECT_TOKEN_TYPE)
            .setScope(AUTH0_SCOPE)
            .addParameters(params)
            .start(object : Callback<Credentials, AuthenticationException> {
                override fun onFailure(error: AuthenticationException) {
                    callback.onError(error)
                }

                override fun onSuccess(result: Credentials) {
                    callback.onResult(result)
                }
            })
    }
```
