The SDK must be instantiated before use. This can be done _lazily_ so that the initialisation happens once the field is needed. The credentials defined in the step above are passed to the `Auth0` constructor, and then a new instance of the `AuthenticationAPIClient` is created with it.

```kotlin
private val auth0Client: AuthenticationAPIClient by lazy {
    val account = Auth0(getString(R.string.com_auth0_client_id), getString(R.string.com_auth0_domain))
    AuthenticationAPIClient(account)
}
```

Create the method that will hold the logic to exchange the two obtained artifacts for Auth0 user credentials. In the sample, this method is named `exchangeTokens`.

The API client declares the method `loginWithNativeSocialToken` that receives a token and a subject type. The former corresponds to the session token, and the latter indicates what type of connection the backend will attempt to authenticate with. For native Facebook Login, you will use the following value:

```
"http://auth0.com/oauth/token-type/facebook-info-session-access-token"
```

Other values that need to be configured are the user profile, using the `user_profile` key, and the scope asked to the Auth0 tokens to contain.


```kotlin
private fun exchangeTokens(sessionToken: String, userProfile: String?) {
    val params = mapOf("user_profile" to userProfile)

    auth0Client.loginWithNativeSocialToken(sessionToken, "http://auth0.com/oauth/token-type/facebook-info-session-access-token")
        .setScope("openid email profile offline_access")
        .addAuthenticationParameters(params)
        .start(object : BaseCallback<Credentials, AuthenticationException> {
            override fun onSuccess(credentials: Credentials) {
                Log.i(TAG, "Logged in")
                /*
                * Logged in!
                *   Use access token to call API
                *   or consume ID token locally
                */
            }

            override fun onFailure(error: AuthenticationException) {
                Log.e(TAG, "Error <%= "${error.code}: ${error.description}" %>")
            }

        })
}
```

::: note
You can read more about scopes in the dedicated [article](/scopes/current/oidc-scopes).
:::


Now that every step is defined in its own method, is time to put everything together inside the `performLogin` method.

```kotlin
private fun performLogin(result: AccessToken) {
    result.let { accessToken ->
        fetchSessionToken(accessToken.token) { sessionToken ->
            sessionToken?.let {
                fetchUserProfile(accessToken.token, accessToken.userId) { profile ->
                    exchangeTokens(it, profile)
                }
            }
        }
    }
}
```

If everything went fine, you should now be able to authenticate natively with the Facebook Login SDK. That means, if the Facebook app is installed in the device, the authentication will be handled via the application and not a browser app.
