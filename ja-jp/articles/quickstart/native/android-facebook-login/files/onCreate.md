---
name: onCreate
language: kotlin
---
    
```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        FacebookSdk.setClientToken(getString(R.string.facebook_client_token))
        FacebookSdk.sdkInitialize(this)

        setContentView(R.layout.activity_login)

        val auth0 =
            Auth0(getString(R.string.com_auth0_client_id), getString(R.string.com_auth0_domain))
        apiClient = AuthenticationAPIClient(auth0)

        fbCallbackManager = CallbackManager.Factory.create()

        val loginButton = findViewById<LoginButton>(R.id.login_button).apply {
            setPermissions(*FACEBOOK_PERMISSIONS)
        }

        loginButton.registerCallback(fbCallbackManager, object : FacebookCallback<LoginResult> {
            override fun onSuccess(result: LoginResult) {

                val accessToken = result.accessToken
                performLogin(accessToken)
            }

            override fun onCancel() {
                Log.i(TAG, "Facebook sign-in cancelled")
            }

            override fun onError(error: FacebookException) {
                Log.e(TAG, "Error {error.message}")
            }
        })
    }
```
