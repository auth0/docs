---
name: MainActivity.kt
language: kotlin
---
```kotlin
import com.auth0.android.Auth0
import com.auth0.android.provider.WebAuthProvider

class MainActivity : AppCompatActivity() {

  private lateinit var account: Auth0

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    // Set up the account object with the Auth0 application details
    account = Auth0(
      getString(R.string.com_auth0_client_id),
      getString(R.string.com_auth0_domain),
    )
  }

  private fun loginWithBrowser() {
    // Setup the WebAuthProvider, using the custom scheme and scope.

    WebAuthProvider.login(account)
      .withScheme("demo")
      .withScope("openid profile email")
      // Launch the authentication passing the callback where the results will be received
      .start(this, object : Callback<Credentials, AuthenticationException> {
        // Called when there is an authentication failure
        override fun onFailure(exception: AuthenticationException) {
          // Something went wrong!
        }

        // Called when authentication completed successfully
        override fun onSuccess(credentials: Credentials) {
          // Get the access token from the credentials object.
          // This can be used to call APIs
          val accessToken = credentials.accessToken
        }
      })
  }

  private fun logout() {
    WebAuthProvider.logout(account)
      .withScheme("demo")
      .start(this, object : Callback<Void?, AuthenticationException> {
        override fun onSuccess(payload: Void?) {
          // The user has been logged out!
        }

        override fun onFailure(error: AuthenticationException) {
          // Something went wrong!
        }
      })
  }

  private fun showUserProfile(accessToken: String) {
    var client = AuthenticationAPIClient(account)

    // With the access token, call `userInfo` and get the profile from Auth0.
    client.userInfo(accessToken)
      .start(object : Callback<UserProfile, AuthenticationException> {
        override fun onFailure(exception: AuthenticationException) {
          // Something went wrong!
        }

        override fun onSuccess(profile: UserProfile) {
          // We have the user's profile!
          val email = profile.email
          val name = profile.name
        }
      })
  }
}
```