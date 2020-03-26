You will make use of a small interface to handle our internal callbacks.

In the sample, the method was named `performLogin` and the interface `SimpleCallback`. Go ahead and add both.

```java
private void performLogin(@NonNull final AccessToken accessToken, final SimpleCallback<Credentials> loginCallback) {
  // TODO
}

private interface SimpleCallback<T> {
    void onResult(@NonNull T result);

    void onError(@NonNull Throwable cause);
}
```

::: note
The compiler will point out an error on the method signature. The `Credentials` class belongs to the Auth0 SDK that you will install towards the end of this article. Until then, feel free to ignore it.
:::

Now, call the method from the Facebook login callback's `onSuccess` method. The instance of the callback passed here will end up receiving the Auth0 tokens or any error occurred in the authentication attempt. Be sure to handle those as well.

```java
@Override
public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    setContentView(R.layout.activity_login);

    Auth0 account = new Auth0(getString(R.string.com_auth0_client_id), getString(R.string.com_auth0_domain));
    auth0Client = new AuthenticationAPIClient(account);

    fbCallbackManager = CallbackManager.Factory.create();

    LoginButton loginButton = findViewById(R.id.login_button);
    loginButton.setPermissions(FACEBOOK_PERMISSIONS);
    loginButton.registerCallback(fbCallbackManager, new FacebookCallback<LoginResult>() {
        @Override
        public void onSuccess(LoginResult result) {
            //1. Logged in to Facebook
            AccessToken accessToken = result.getAccessToken();
            performLogin(accessToken, new SimpleCallback<Credentials>() {
                @Override
                public void onResult(@NonNull Credentials credentials) {
                    /*
                    * Logged in!
                    *  Use access token to call API
                    *  or consume ID token locally
                    */
                }

                @Override
                public void onError(@NonNull Throwable cause) {
                    //Handle error
                }
            });
        }

        @Override
        public void onCancel() {
            //User closed the dialog. Safe to ignore
        }

        @Override
        public void onError(FacebookException error) {
            //Handle error
        }
    });
}
```