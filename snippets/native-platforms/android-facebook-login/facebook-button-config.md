In the sample, the method was named `performLogin`. Call this method from the login callback's `onSuccess` method, as shown below:

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    //Your existing code

    fbCallbackManager = CallbackManager.Factory.create()

    login_button.registerCallback(fbCallbackManager, object : FacebookCallback<LoginResult> {
        override fun onSuccess(result: LoginResult) {
            //invoke the method, passing the login result
            performLogin(result.accessToken)
        }

        override fun onCancel() {
            Log.i(TAG, "Facebook sign-in cancelled")
        }

        override fun onError(error: FacebookException) {
            Log.e(TAG, "Error $\{error.message\}")
        }
    })
}

private fun performLogin(result: AccessToken) {
  // TODO
}
```