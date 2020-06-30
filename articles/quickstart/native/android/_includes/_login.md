## Add Authentication with Auth0

[Universal Login](/hosted-pages/login) is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security and the fullest array of features.

::: note
You can also embed the login dialog directly in your application using the [Lock widget](/lock). If you use this method, some features, such as single sign-on, will not be accessible.
To learn how to embed the Lock widget in your application, follow the [Embedded Login sample](https://github.com/auth0-samples/auth0-android-sample/tree/embedded-login/01-Embedded-Login). Make sure you read the [Browser-Based vs. Native Login Flows on Mobile Devices](/tutorials/browser-based-vs-native-experience-on-mobile) article to learn how to choose between the two types of login flows.
:::

In the `onCreate` method, create a new instance of the `Auth0` class to hold user credentials and set it to be OIDC conformant.

You can use a constructor that receives an Android Context if you have added the following String resources:
* `R.string.com_auth0_client_id`
* `R.string.com_auth0_domain`

```java
// app/src/main/java/com/auth0/samples/MainActivity.java

private Auth0 auth0;

@Override
protected void onCreate(@Nullable Bundle savedInstanceState) {
    // ...
    auth0 = new Auth0(this);
    auth0.setOIDCConformant(true);
}
```

Otherwise, use the constructor that receives both strings.

Finally, create a `login` method and use the `WebAuthProvider` class to authenticate with any connection you enabled on your application in the [Auth0 dashboard](${manage_url}/#/).

```java
// app/src/main/java/com/auth0/samples/LoginActivity.java

private void login() {
    WebAuthProvider.login(auth0)
            .withScheme("demo")
            .withAudience(String.format("https://%s/userinfo", getString(R.string.com_auth0_domain)))
            .start(MainActivity.this, new AuthCallback() {
                @Override
                public void onFailure(@NonNull Dialog dialog) {
                    // Show error Dialog to user
                }

                @Override
                public void onFailure(AuthenticationException exception) {
                    // Show error to user
                }

                @Override
                public void onSuccess(@NonNull Credentials credentials) {
                    // Store credentials
                    // Navigate to your main activity
                }
        });
}
```

::: note
Future steps of this quickstart guide move the `AuthCallback` in-line instance into a class field named `loginCallback`.
:::

After you call the `WebAuthProvider#start` function, the browser launches and shows the **Lock** widget. Once the user authenticates, the callback URL is called. The callback URL contains the final result of the authentication process.

There are many options to customize the authentication with the `WebAuthProvider` builder. You can read about them in the [Auth0 SDK for Android documentation](/libraries/auth0-android).
<div class="phone-mockup">
  <img src="/media/articles/native-platforms/android/login-android.png" alt="Mobile example screenshot" />
</div>

## Logout

Use WebAuthProvider to remove the cookie set by the Browser at authentication time, so that the users are forced to re-enter their credentials the next time they try to authenticate.

Check in the LoginActivity if a boolean extra is present in the Intent at the Activity launch. This scenario triggered by the MainActivity dictates that the user wants to log out.

```java
// app/src/main/java/com/auth0/samples/MainActivity.java

private void logout() {
    Intent intent = new Intent(this, LoginActivity.class);
    intent.putExtra(LoginActivity.EXTRA_CLEAR_CREDENTIALS, true);

    startActivity(intent);
    finish();
}

// app/src/main/java/com/auth0/samples/LoginActivity.java

@Override
protected void onCreate(Bundle savedInstanceState) {
    // ...
    if (getIntent().getBooleanExtra(EXTRA_CLEAR_CREDENTIALS, false)) {
        logout();
    }
}

private void logout() {
    WebAuthProvider.logout(auth0)
            .withScheme("demo")
            .start(this, new VoidCallback() {
                @Override
                public void onSuccess(Void payload) {
                }

                @Override
                public void onFailure(Auth0Exception error) {
                    // Show error to user
                }
            });
}
```

The logout is achieved by using the WebAuthProvider class. This call will open the Browser and navigate the user to the logout endpoint. If the log out is cancelled, you might want to take the user back to where they were before attempting to log out.

::: note
Future steps of this quickstart guide move the `VoidCallback` in-line instance into a class field named `logoutCallback`.
:::
