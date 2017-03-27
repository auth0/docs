---
title: Session Handling
description: This tutorial will show you how to use Lock v2 to maintain a session’s connectivity.
budicon: 280
---

This tutorial will show you how to use Lock to maintain an active session with Auth0.

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-android-sample',
  path: '03-Session-Handling',
  requirements: [
    'Android Studio 2.3',
    'Android SDK 24',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>


For this, you will need to handle the user's `Credentials`. Let's take a look at this class, which is composed of five objects:

* `id_token`: Identity Token that proves the identity of the user.
* `access_token`: Access Token used by the Auth0 API.
* `refresh_token`: Refresh Token that can be used to request new tokens without signing in again.
* `token_type`: Type of the received token.
* `expires_at`: Time in seconds in which the tokens will be deemed invalid.

The Tokens are the objects used to prove your identity against the Auth0 APIs. Read more about them [here](https://auth0.com/docs/tokens).

## Before Starting

Be sure that you have completed the [Login](/quickstart/native/android/01-login) quickstart.

Before launching Lock you need to ask for the `offline_access` scope in order to get a valid `refresh_token` in the response. Locate the snippet were you're initializing Lock and add the `withScope("openid offline_access")` line.

```java
Auth0 auth0 = new Auth0(getString(R.string.auth0_client_id), getString(R.string.auth0_domain));
Lock lock = Lock.newBuilder(auth0, callback)
        .withScope("openid offline_access")
        .build(this);
startActivity(lock.newIntent(this));
```

## Save The User's Credentials

Your first step is to save **through a secure method** the user's credentials obtained in the login success response.

```java
private LockCallback callback = new AuthenticationCallback() {
  @Override
  public void onAuthentication(Credentials credentials) {
    // Login Success response
    saveCredentials(credentials);
  }
  ...
};
```

> In the seed project, the `SharedPreferences` is used in [Private mode](https://developer.android.com/reference/android/content/Context.html#MODE_PRIVATE) to store the user credentials. This is done by a the class `CredentialsManager`, you can check the implementation in the project code. There are better and more secure ways to store tokens, but we won't cover them in this tutorial.


## At Startup: Check `access_token` Existence

The main purpose of storing this token is to save users from having to re-enter their login credentials when relaunching the app. Once the app has launched, we need to check for the existence of an `access_token` to see if we can automatically log the user in and redirect the user straight into the app’s main flow, skipping the login screen.

To do so, we check whether this value exists at startup to either prompt for login information or to try to perform an automated login.

```java
if (CredentialsManager.getCredentials(this).getAccessToken() == null) {
  // Prompt Login screen.
} else {
  // Try to make an automatic login
}
```

## Validate an Existing `access_token`

If the `access_token` exists, we need to check whether it’s still valid. To do so we can:
* Check that the elapsed time since the token was obtained is lesser than the `expires_in` value received in with the credentials. For this to work we'll have to save the current time whenever we receive and store a new pair of credentials.
* Decode the JWT token using a library like [JWTDecode.Android](https://github.com/auth0/JWTDecode.Android) and check the `exp` claim.
* Call the Auth0 Authentication API and check the response.

We will explain the latter approach.

```java
Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
auth0.setOIDCConformant(true);
AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);

String accessToken = CredentialsManager.getCredentials(this).getAccessToken();
client.userInfo(accessToken)
        .start(new BaseCallback<UserProfile, AuthenticationException>() {

            @Override
            public void onSuccess(UserProfile info) {
              // Valid Token > Navigate to the app's MainActivity
              startActivity(new Intent(LoginActivity.this, MainActivity.class));
            }

            @Override
            public void onFailure(AuthenticationException error) {
              // Invalid Token Scenario
            }
        });
```

How you deal with a non-valid token is up to you. You will normally choose between two scenarios. You can either ask users to re-enter their credentials or use the `refresh_token` to get a new valid `access_token`.

> If you want users to re-enter their credentials, you should clear the stored data and prompt the login screen.


## Refreshing the Token

We will use the previously saved `refresh_token` to get a new `access_token`. It is recommended that you read and understand the [refresh tokens documentation](/refresh-token) before proceeding. For example, you should remember that even though the refresh token cannot expire and must be securely saved, it can be revoked. Also note that the new pair of credentials will never have more scope than the requested in the first login.

First instantiate an `AuthenticationAPIClient`:

```java
Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
auth0.setOIDCConformant(true);
AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);
```

Use the `refresh_token` to get fresh new credentials..

```java
String refreshToken = CredentialsManager.getCredentials(this).getRefreshToken();
client.renewAuth(refreshToken)
      .start(new BaseCallback<Credentials, AuthenticationException>() {

          @Override
          public void onSuccess(Credentials payload) {
            String idToken = payload.getIdToken(); // New ID Token
            String accessToken = payload.getAccessToken(); // New Access Token
            //Save the new values
          }

          @Override
          public void onFailure(AuthenticationException error) {

          }
      });
```


## Log Out

**Lock** itself doesn't save the credentials, so there's no included "log out" functionality. In our examples, logging out would mean we need to remove the user's credentials and navigate them to the login screen.

An example would be:

```java
private void logout() {
  CredentialsManager.deleteCredentials(this);
  Intent intent = new Intent(this, LoginActivity.class);
  startActivity(intent);
}
```

> **Note:** Deleting the user credentials depends on how you have stored them.

### Optional: Encapsulated session handling

As you have probably realized by now, session handling is not a straightforward process. All the token-related information and processes can be encapsulated into a class that separates its logic from the activity. We recommend that you download the sample project from this tutorial and take a look at its implementation, focusing on the `CredentialsManager` class, which is in charge of dealing with this process as well as saving and obtaining the credentials object from the `SharedPreferences`.
