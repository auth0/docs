You will make use of a small interface to handle our internal callbacks.

In the sample, the method was named `performLogin` and the interface `SimpleCallback`. Go ahead and add both.

```java
private void performLogin(@NonNull final AccessToken accessToken) {
  // TODO
}

private interface SimpleCallback<T> {
    void onResult(@NonNull T result);

    void onError(@NonNull Throwable cause);
}
```

Now, call the method from the Facebook login callback's `onSuccess` method.

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
            performLogin(accessToken);
        }

        @Override
        public void onCancel() {
            //User closed the dialog. Safe to ignore
        }

        @Override
        public void onError(FacebookException error) {
            //Handle Facebook authentication error
        }
    });
}
```