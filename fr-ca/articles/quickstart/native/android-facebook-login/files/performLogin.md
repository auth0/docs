---
name: performLogin
language: kotlin
---
    
```kotlin
private fun performLogin(accessToken: AccessToken) {
        val token = accessToken.token
        fetchSessionToken(token, object : SimpleCallback<String> {
            override fun onResult(sessionToken: String) {
                //2. Obtained the Facebook session token
                fetchUserProfile(token, accessToken.userId, object : SimpleCallback<String> {
                    override fun onResult(userProfile: String) {
                        //3. Obtained the user profile
                        exchangeTokens(
                            sessionToken,
                            userProfile,
                            object : SimpleCallback<Credentials> {
                                override fun onResult(credentials: Credentials) {
                                    //4. Exchanged the tokens
                                    Log.i(TAG, "Logged in to Auth0")
                                }

                                override fun onError(cause: Throwable) {
                                    Log.e(TAG, "Error exchanging tokens", cause)
                                }
                            })
                    }

                    override fun onError(cause: Throwable) {
                        Log.e(TAG, "Error fetching the profile", cause)
                    }
                })
            }

            override fun onError(cause: Throwable) {
                Log.e(TAG, "Error fetching the session token", cause)
            }
        })
    }
```
