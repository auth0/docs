The SDK must be instantiated before use. Define a field at the class level and initialize it on the `onCreate` method. Note how the credentials defined in the step above are passed to the `Auth0` constructor and then a new instance of the `AuthenticationAPIClient` is created with it.

```java
private AuthenticationAPIClient auth0Client;

@Override
public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    setContentView(R.layout.activity_login);

    Auth0 account = new Auth0(getString(R.string.com_auth0_client_id), getString(R.string.com_auth0_domain));
    auth0Client = new AuthenticationAPIClient(account);

    //...
}
```

Create the method that will hold the logic to exchange the two obtained artifacts for Auth0 user credentials. In the sample, this method is named `exchangeTokens`.

The API client declares the method `loginWithNativeSocialToken` that receives a token and a subject type. The former corresponds to the session token, and the latter indicates what type of connection the backend will attempt to authenticate with. For native Facebook Login, you will use the following value:

```
"http://auth0.com/oauth/token-type/facebook-info-session-access-token"
```

Other values that need to be configured are the user profile (using the `user_profile` key) and the scope you request the Auth0 tokens contain.


```java
private void exchangeTokens(@NonNull String sessionToken, @NonNull String userProfile, @NonNull final SimpleCallback<Credentials> callback) {
    Map<String, Object> params = new HashMap<>();
    params.put("user_profile", userProfile);

    auth0Client.loginWithNativeSocialToken(sessionToken, "http://auth0.com/oauth/token-type/facebook-info-session-access-token")
            .setScope("openid email profile offline_access")
            .addAuthenticationParameters(params)
            .start(new BaseCallback<Credentials, AuthenticationException>() {
                @Override
                public void onSuccess(Credentials credentials) {
                    callback.onResult(credentials);
                }

                @Override
                public void onFailure(AuthenticationException error) {
                    callback.onError(error);
                }
            });
}
```

::: note
It's a good practice to keep all the values that you know won't change as constants at the top of the class. The sample makes use of constants for the subject token type, the Facebook permissions, and the Auth0 scopes. 
You can read more about Auth0 scopes in the dedicated [article](/scopes/current/oidc-scopes).
:::


Now that every step is defined in its own method, it's time to put everything together inside the `performLogin` method.

```java
private void performLogin(@NonNull final AccessToken accessToken) {
    final String token = accessToken.getToken();
    fetchSessionToken(token, new SimpleCallback<String>() {
        @Override
        public void onResult(@NonNull final String sessionToken) {
            //2. Obtained the Facebook session token
            fetchUserProfile(token, accessToken.getUserId(), new SimpleCallback<String>() {

                @Override
                public void onResult(@NonNull String jsonProfile) {
                    //3. Obtained the Facebook user profile
                    exchangeTokens(sessionToken, jsonProfile, new SimpleCallback<Credentials>() {

                        @Override
                        public void onResult(@NonNull Credentials credentials) {
                            /*
                            *  4. Logged in!
                            *     Use access token to call API
                            *     or consume ID token locally
                            */
                        }

                        @Override
                        public void onError(@NonNull Throwable cause) {
                            //Handle token exchange error
                        }
                    });
                }

                @Override
                public void onError(@NonNull Throwable cause) {
                    //Handle profile request error
                }
            });
        }

        @Override
        public void onError(@NonNull Throwable cause) {
            //Handle session token request error
        }
    });
}
```

If everything went well, you should now be able to authenticate natively with the Facebook Login SDK. This means that if the Facebook app is installed on the device, the authentication will be handled via the application and not a browser app.
