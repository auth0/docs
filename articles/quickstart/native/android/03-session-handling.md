---
title: Session Handling
description: This tutorial will show you how to login and maintain a session’s connectivity.
seo_alias: android
budicon: 280
github:
    path: 03-Session-Handling
---

You need the `Credentials` class to handle users' credentials. The class is composed of these elements:

* `accessToken`: Access Token used by the Auth0 API. To learn more, see the [Access Token documentation](/tokens/access-token).
* `idToken`: Identity Token that proves the identity of the user. To learn more, see the [ID Token documentation](/tokens/id-token).
* `refreshToken`: Refresh Token that can be used to request new tokens without signing in again. To learn more, see the [Refresh Token documentation](/tokens/refresh-token/current).
* `tokenType`: The type of tokens issued by the server.
* `expiresIn`: The number of seconds before the tokens expire.
* `expiresAt`: The date when the tokens expire.
* `scope`: The scope that was granted to a user. This information is shown only if the granted scope is different than the requested one.

Tokens are objects used to prove your identity against the Auth0 APIs. Read more about them in the [tokens documentation](https://auth0.com/docs/tokens).

## Before You Start

::: note
Before you continue with this tutorial, make sure that you have completed the [Login](/quickstart/native/android/00-login) tutorial.
:::

Before you launch the login process, make sure you get a valid Refresh Token in the response. To do that, ask for the `offline_access` scope. Find the snippet in which you are initializing the `WebAuthProvider` class. To that snippet, add the line `withScope("openid offline_access")`.

```java
// app/src/main/java/com/auth0/samples/LoginActivity.java

Auth0 auth0 = new Auth0(this);
auth0.setOIDCConformant(true);
WebAuthProvider.init(auth0)
    .withScheme("demo")
    .withAudience(String.format("https://%s/userinfo", getString(R.string.com_auth0_domain)))
    .withScope("openid offline_access")
    .start(LoginActivity.this, webCallback);
```

## Check for Tokens when the Application Starts

::: panel Learn about Refresh Tokens
Before you go further with this tutorial, read the [refresh token documentation](/refresh-token).
It is important that you remember the following:
* Refresh Tokens must be securely saved.
* Even though Refresh Tokens cannot expire, they can be revoked.
* New tokens will have the same scope as was originally requested during the first authentication.
:::

You can simplify the way you handle user sessions using a Credential Manager class, which knows how to securely store, retrieve and renew credentials obtained from Auth0. Two classes are provided in the SDK to help you achieve this. Further read on how they work and their implementation differences is available in the [Saving and Renewing Tokens](/libraries/auth0-android/save-and-refresh-tokens.md) article. For this series of tutorials we're going to use the `SecureCredentialsManager` class as it encrypts the credentials before storing them in a private SharedPreferences file.


Create a new instance of the Credentials Manager. When you run the application, you should check if there are any previously stored credentials. You can use these credentials to bypass the login screen:

```java
// app/src/main/java/com/auth0/samples/LoginActivity.java
  Auth0 auth0 = new Auth0(this);
  auth0.setOIDCConformant(true);
  AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);
  SecureCredentialsManager credentialsManager = new SecureCredentialsManager(this, client, new SharedPreferencesStorage(this));

  // Check if the activity was launched after a logout
  if (getIntent().getBooleanExtra(KEY_CLEAR_CREDENTIALS, false)) {
      credentialsManager.clearCredentials();
  }

  if (!credentialsManager.hasValidCredentials()) {
    // Prompt Login screen.
  } else {
    // Obtain credentials and move to the next activity
  }
```

::: note
Ideally a single class should manage the handling of credentials. You can share this instance across activities or create a new one every time is required as long as the Storage strategy persists the data in the same location. Check the `LoginActivity` class to understand how to achieve this in a single class.
:::


## Save the User's Credentials

After a successful login response, you can store the user's credentials using the `saveCredentials` method.

```java
// app/src/main/java/com/auth0/samples/LoginActivity.java

private final AuthCallback webCallback = new AuthCallback() {
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
        //user successfully authenticated
        credentialsManager.saveCredentials(credentials);
    }
};
```

::: note
A Storage defines how data is going to be persisted in the device. The Storage implementation given to the Credentials Manager in the seed project uses a SharedPreferences file to store the user credentials in [Private mode](https://developer.android.com/reference/android/content/Context.html#MODE_PRIVATE). You can modify this behavior by implementing a custom Storage. 
:::

## Recover the User's Credentials

Retrieving the credentials from the Credentials Manager is an async process, as credentials may have expired and require to be refreshed. This renewing process is done automatically by the Credentials Manager as long as a valid Refresh Token is currently stored. A `CredentialsManagerException` exception will be raised if the credentials cannot be renewed.

```java
// app/src/main/java/com/auth0/samples/LoginActivity.java

credentialsManager.getCredentials(new BaseCallback<Credentials, CredentialsManagerException>() {
    @Override
    public void onSuccess(Credentials credentials) {
        // Move to the next activity
    }

    @Override
    public void onFailure(CredentialsManagerException error) {
        // Credentials could not be refreshed.
    }
});
```

::: note
The `SecureCredentialsManager` can prompt the user for local device authentication using the configured Lock Screen (PIN, Password, Pattern, Fingerprint) before giving them the stored credentials. This behavior can be enabled calling the `SecureCredentialsManager#requireAuthentication` method when setting up the Credentials Manager. The sample has this line commented for convenience, remove the comment to try it. 
:::

## Log the User Out

To log the user out, you remove their credentials and navigate them to the login screen. When using a Credentials Manager you do that calling `clearCredentials`.

In the sample, the LoginActivity checks that a boolean extra is present in the Intent at the Activity launch, so that if this flag is true the credentials are first removed from the Credentials Manager.

```java
// app/src/main/java/com/auth0/samples/MainActivity.java

private void logout() {
    Intent intent = new Intent(this, LoginActivity.class);
    intent.putExtra(LoginActivity.KEY_CLEAR_CREDENTIALS, true);
    startActivity(intent);
    finish();
}

// app/src/main/java/com/auth0/samples/LoginActivity.java
@Override
protected void onCreate(Bundle savedInstanceState) {
    //...
    if (getIntent().getBooleanExtra(KEY_CLEAR_CREDENTIALS, false)) {
        credentialsManager.clearCredentials();
    }
}
```

::: note
If you are not using our Credentials Manager classes, you are responsible for ensuring that the user's credentials have been removed.
:::