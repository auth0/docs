---
title: Session Handling
description: This tutorial will show you how to login and maintain a session’s connectivity.
seo_alias: android
budicon: 280
---

This tutorial will show you how to login and maintain an active session with Auth0.

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-android-sample',
  path: '03-Session-Handling',
  requirements: [
    'Android Studio 2.3',
    'Android SDK 25',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>__

For this, you will need to handle the user's `Credentials`. Let's take a look at this class, which is composed of five objects:

* `accessToken`: Access Token used by the Auth0 API.
* `idToken`: Identity Token that proves the identity of the user.
* `refreshToken`: Refresh Token that can be used to request new tokens without signing in again.
* `tokenType`: The type of the tokens issued by the server.
* `expiresIn`: The amount in seconds in which the tokens will be deemed invalid.
* `expiresAt`: The Date in which the tokens will be deemed invalid.
* `scope`: The granted scope, if different from the requested one.

The Tokens are the objects used to prove your identity against the Auth0 APIs. Read more about them [here](https://auth0.com/docs/tokens).


## Before Starting

Be sure that you have completed the [Login](/quickstart/native/android/00-login) quickstart.

Before launching the log in you need to ask for the `offline_access` scope in order to get a valid `refresh_token` in the response. Locate the snippet were you're initializing the `WebAuthProvider` and add the `withScope("openid offline_access")` line.

```java
// app/src/main/java/com/auth0/samples/LoginActivity.java

Auth0 auth0 = new Auth0(this);
auth0.setOIDCConformant(true);
WebAuthProvider.init(auth0)
                .withScheme("demo")
                .withAudience(String.format("https://%s/userinfo", getString(R.string.com_auth0_domain)))
                .withScope("openid offline_access")
                .start(LoginActivity.this, callback);
```

## Save The User's Credentials

Save **through a secure method** the user's credentials obtained in the login success response.

```java
// app/src/main/java/com/auth0/samples/LoginActivity.java

private final AuthCallback callback = new AuthCallback() {
    @Override
    public void onFailure(@NonNull final Dialog dialog) {
        //show error dialog
    }

    @Override
    public void onFailure(AuthenticationException exception) {
        //show error message
    }

    @Override
    public void onSuccess(@NonNull Credentials credentials) {
        saveCredentials(credentials);
        //...
    }
};
```

::: note
In the seed project, the `SharedPreferences` is used in [Private mode](https://developer.android.com/reference/android/content/Context.html#MODE_PRIVATE) to store the user credentials. This is done by a the class `CredentialsManager`, you can check the implementation in the project code. There are better and more secure ways to store tokens, but we won't cover them in this tutorial.
:::

## At Startup: Check Token Existence

The main purpose of storing this token is to save users from having to re-enter their login credentials when relaunching the app. Once the app has launched, we need to check for the existence of an `access_token` to see if we can automatically log the user in and redirect the user straight into the app’s main flow, skipping the login screen.

To do so, we check whether this value exists at startup to either prompt for login credentials or to try to perform an automated login.

```java
// app/src/main/java/com/auth0/samples/LoginActivity.java

String accessToken = CredentialsManager.getCredentials(this).getAccessToken();
if (accessToken == null) {
  // Prompt Login screen.
} else {
  // Try to make an automatic login
}
```

## Validate an Existing Token

If the `access_token` exists, we need to check whether it’s still valid. To do so we can:
* Check that the elapsed time since the token was obtained is lesser than the `expires_in` value received in with the credentials. For this to work we'll have to save the current time whenever we receive and store a new pair of credentials.
* Call the Auth0 Authentication API and check the response.

We will explain the latter approach by calling the `/userinfo` endpoint.


```java
// app/src/main/java/com/auth0/samples/LoginActivity.java

AuthenticationAPIClient aClient = new AuthenticationAPIClient(auth0);
aClient.userInfo(accessToken)
        .start(new BaseCallback<UserProfile, AuthenticationException>() {
            @Override
            public void onSuccess(final UserProfile payload) {
                //Navigate to the next activity
            }

            @Override
            public void onFailure(AuthenticationException error) {
                //Delete current credentials and try again
            }
        });
```

How you deal with a non-valid token is up to you. You will normally choose between two scenarios. You can either ask users to re-enter their credentials or use the `refresh_token` to get a new valid `access_token`.

::: note
If you want users to re-enter their credentials, you should clear the stored data and prompt the login screen.
:::

## Refreshing the Token

We will use the previously saved `refresh_token` to get a new `access_token`. It is recommended that you read and understand the [refresh tokens documentation](/refresh-token) before proceeding. For example, you should remember that even though the refresh token cannot expire and must be securely saved, it can be revoked. Also note that the new pair of credentials will never have additional scope than the requested in the first login.


First instantiate an `AuthenticationAPIClient`:

```java
// app/src/main/java/com/auth0/samples/MainActivity.java

AuthenticationAPIClient aClient = new AuthenticationAPIClient(auth0);
```

Then use the `refresh_token` to get fresh new credentials:

```java
// app/src/main/java/com/auth0/samples/MainActivity.java

String refreshToken = CredentialsManager.getCredentials(this).getRefreshToken();
aClient.renewAuth(refreshToken)
      .start(new BaseCallback<Credentials, AuthenticationException>() {

          @Override
          public void onSuccess(Credentials payload) {
            String accessToken = payload.getAccessToken(); // New Access Token
            String idToken = payload.getIdToken(); // New ID Token
            //Save the new values
          }

          @Override
          public void onFailure(AuthenticationException error) {
            //show error
          }
      });
```


## Log Out

To log the user out, you just need to remove the saved user's credentials and navigate them to the login screen.

An example would be:

```java
// app/src/main/java/com/auth0/samples/MainActivity.java

private void logout() {
  CredentialsManager.deleteCredentials(this);
  startActivity(new Intent(this, LoginActivity.class));
  finish();
}
```

::: note
Deleting the user credentials depends on how you have stored them.
:::

### Optional: Encapsulated session handling

As you have probably realized by now, session handling is not a straightforward process. All the token-related information and processes can be encapsulated into a class that separates its logic from the activity. We recommend that you download the sample project from this tutorial and take a look at its implementation, focusing on the `CredentialsManager` class, which is in charge of dealing with this process as well as saving and obtaining the credentials object from the `SharedPreferences`.
