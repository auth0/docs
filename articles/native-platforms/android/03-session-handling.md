---
title: Session Handling
description: This tutorial will show you how to use Lock v2 to maintain a session’s connectivity.
budicon: 280
---

This tutorial will show you how to use Lock to maintain an active session with Auth0.

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-android-sample',
  path: '03-Session-Handling',
  requirements: [
    'Android Studio 2.2',
    'Android SDK 24',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>


For this, you will need to handle the user's `credentials`. Let's take a look at this class, which is composed of three objects:

* `idToken`: Identity Token that proves the identity of the user.
* `accessToken`: Access Token used by the Auth0 API.
* `refreshToken`: Refresh Token that can be used to request new tokens without signing in again.

Those objects are the keys needed to keep the user connected, as they will be used in all the API calls`.

## Before Starting

Be sure that you have completed the [Login](/quickstart/native/android/01-login) quickstart.

Before launching Lock you need to ask for the `offline_access` scope in order to get a valid `refresh_token` in the response. Locate the snippet were you're initializing Lock and add the `withScope("openid offline_access")` line.

```java
Auth0 auth0 = new Auth0(getString(R.string.auth0_client_id), getString(R.string.auth0_domain));
Map<String, Object> parameters = new HashMap<>();
parameters.put("scope", "openid offline_access");
Lock lock = Lock.newBuilder(auth0, callback)
        .withAuthenticationParameters(parameters)
        .build(this);
startActivity(lock.newIntent(this));
```

## Save The User's Credentials

Save _through a secure method_ the user's credentials obtained in the login success response.

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

> In the seed project, the `SharedPreference` object in private mode is used to store different `Credentials` values. There are other means of storage, but we won't cover them in this tutorial.

## At Startup: Check `idToken` Existence

The main purpose of storing this token is to save users from having to re-enter their login credentials when relaunching the app. Once the app has launched, we need to check for the existence of an `idToken` to see if we can automatically log the user in and redirect the user straight into the app’s main flow, skipping the login screen.

To do so, we check whether this value exists at startup to either prompt for login information or to try to perform an automated login.

```java
if(CredentialsManager.getCredentials(this).getIdToken() == null) {
  // Prompt Login screen.
}
else {
  // Try to make an automatic login
}
```

## Validate an Existing `idToken`

If the idToken exists, we need to check whether it’s still valid. To do so, we will fetch the user profile with the `AuthenticationAPI`.

```java
AuthenticationAPIClient aClient = new AuthenticationAPIClient(auth0);
aClient.tokenInfo(CredentialsManager.getCredentials(this).getIdToken())
       .start(new BaseCallback<UserProfile, AuthenticationException>() {
  @Override
  public void onSuccess(UserProfile payload) {
    // Valid ID > Navigate to the app's MainActivity
    startActivity(new Intent(LoginActivity.this, MainActivity.class));
  }

  @Override
  public void onFailure(AuthenticationException error) {
    // Invalid ID Scenario
  }
});
```

How you deal with a non-valid idToken is up to you. You will normally choose between two scenarios. You can either ask users to re-enter their credentials or use the `refreshToken` to get a new valid `idToken`.

>If you want users to re-enter their credentials, you should clear the stored data and prompt the login screen.


## Check for an Valid `idToken` at Startup

First, for both cases, you need to instantiate an `AuthenticationAPIClient`:

```java
AuthenticationAPIClient client = new AuthenticationAPIClient(
      new Auth0("${account.clientId}", "${account.namespace}"));
```

### i. Using a non-expired idToken

If your current idToken hasn't expired, you can use it to get a new one.

```java
String idToken = ... // TODO: GET STORED TOKEN ID

client.delegationWithIdToken(idToken)
      .start(new BaseCallback<Delegation, AuthenticationException>() {

  @Override
  public void onSuccess(Delegation payload) {
    String idToken = payload.getIdToken(); // New ID Token
    long expiresIn = payload.getExpiresIn(); // New ID Token Expire Date
  }

  @Override
  public void onFailure(AuthenticationException error) {
    //Show error to the user
  }
});
```

### ii. Using refreshToken

If the `idToken` already expired, you can always use the `refreshToken` to get a new one, without having to login again. For this reason, the token must be securely saved.

```java
String refreshToken = ... // TODO: GET STORED REFRESH ID

client.delegationWithRefreshToken(refreshToken)
      .start(new BaseCallback<Delegation, AuthenticationException>() {

  @Override
  public void onSuccess(Delegation payload) {
    String idToken = payload.getIdToken(); // New ID Token
    long expiresIn = payload.getExpiresIn(); // New ID Token Expire Date
  }

  @Override
  public void onFailure(AuthenticationException error) {

  }
});
```

> It is recommended that you read and understand the [refresh token documentation](/refresh-token) before proceeding. For example, you should remember that even though the refresh token cannot expire, it can be revoked.

## Log Out

To log the user out, you just need to remove the user's credentials and navigate them to the login screen.

An example would be:

```java
private void logout() {
  setUserCredentials(null);
  startActivity(new Intent(this, LoginActivity.class));
}
```

> **Note:** Deleting the user credentials depends on how you store them.

### Optional: Encapsulated session handling

As you have probably realized by now, session handling is not a straightforward process. All the token-related information and processes can be encapsulated into a class that separates its logic from the activity. We recommend that you download the sample project from this tutorial and take a look at its implementation, focusing on the CredentialManager class, which is in charge of dealing with this process as well as saving and obtaining the credentials object from the SharedPreferences.
