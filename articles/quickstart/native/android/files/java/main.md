---
name: MainActivity.java
language: java
variants:
  - Java
---
```java

import com.auth0.android.Auth0;
import com.auth0.android.authentication.AuthenticationAPIClient;
import com.auth0.android.authentication.AuthenticationException;
import com.auth0.android.callback.Callback;
import com.auth0.android.provider.WebAuthProvider;
import com.auth0.android.result.Credentials;
import com.auth0.android.result.UserProfile;

public class MainActivity extends AppCompatActivity {

private Auth0 account;

@Override
protected void onCreate(@Nullable Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);

  account = new Auth0(getString(R.string.com_auth0_client_id),
            getString(R.string.com_auth0_domain));
}

private void loginWithBrowser() {
  WebAuthProvider.login(account)
    .withScheme("demo")
    .withScope("openid profile email")
    .start(this, new Callback<Credentials, AuthenticationException>() {
        // Called when there is an authentication failure
        @Override
        public void onFailure(@NonNull final AuthenticationException exception) {
            // Something went wrong!
        }
        // Called when authentication completed successfully
        @Override
        public void onSuccess(@Nullable final Credentials credentials) {
            // Get the access token from the credentials object.
            // This can be used to call APIs
            String accessToken = credentials.getAccessToken();
        }
    });
}

private void logout() {
  WebAuthProvider.logout(account)
    .withScheme("demo")
    .start(this, new Callback<Void, AuthenticationException>() {
        @Override
        public void onFailure(@NonNull AuthenticationException error) {
            // Something went wrong!
        }

        @Override
        public void onSuccess(Void result) {
            // The user has been logged out!
        }
    });
}

private void showUserProfile(String accessToken) {
  AuthenticationAPIClient client = new AuthenticationAPIClient(account);
  client.userInfo(accessToken)
    .start(new Callback<UserProfile, AuthenticationException>() {
        @Override
        public void onFailure(@NonNull AuthenticationException error) {
            // Something went wrong!
        }

        @Override
        public void onSuccess(UserProfile profile) {
            // We have the user's profile!
            String email = profile.getEmail();
            String name = profile.getName();
        }
    });
}
}
```