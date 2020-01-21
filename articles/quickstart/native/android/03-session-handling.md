---
title: Session Handling
description: This tutorial will show you how to handle user sessions and retrieve the user's profile.
seo_alias: android
budicon: 280
topics:
  - quickstarts
  - native
  - android
github:
    path: 03-Session-Handling
contentType: tutorial
useCase: quickstart
---

You need the `Credentials` class to handle users' credentials. The class is composed of these elements:

* `accessToken`: Access Tokens used by the Auth0 API. To learn more, see the [Access Tokens](/tokens/concepts/access-tokens).
* `idToken`: Identity Token that proves the identity of the user. To learn more, see the [ID Token documentation](/tokens/concepts/id-tokens).
* `refreshToken`: Refresh Token that can be used to request new tokens without signing in again. To learn more, see the [Refresh Tokens](/tokens/concepts/refresh-tokens).
* `tokenType`: The type of tokens issued by the server.
* `expiresIn`: The number of seconds before the tokens expire.
* `expiresAt`: The date when the tokens expire.
* `scope`: The scope that was granted to a user. This information is shown only if the granted scope is different than the requested one.

Tokens are objects used to prove your identity against the Auth0 APIs. Read more about them in the [tokens documentation](https://auth0.com/docs/tokens).

## Before You Start

::: note
Before you continue with this tutorial, make sure that you have completed the [Login](/quickstart/native/android/00-login) tutorial.
:::

You will need a valid Refresh Token in the response. To do that, ask for the `offline_access` scope. Find the snippet in which you are initializing the `WebAuthProvider` class. To that snippet, add the line `withScope("openid offline_access")`.

```java
// app/src/main/java/com/auth0/samples/LoginActivity.java

Auth0 auth0 = new Auth0(this);
auth0.setOIDCConformant(true);

WebAuthProvider.login(auth0)
        .withScheme("demo")
        .withScope("openid offline_access")
        .withAudience(String.format("https://%s/userinfo", getString(R.string.com_auth0_domain)))
        .start(LoginActivity.this, loginCallback);
```

## Check for Tokens when the Application Starts

::: panel Learn about Refresh Tokens
Before you go further with this tutorial, read the [Refresh Token documentation](/refresh-token).
It is important that you remember the following:
* Refresh Tokens must be securely saved.
* Even though Refresh Tokens cannot expire, they can be revoked.
* New tokens will have the same scope as was originally requested during the first authentication.
:::

You can simplify the way you handle user sessions using a Credential Manager class, which knows how to securely store, retrieve and renew credentials obtained from Auth0. Two classes are provided in the SDK to help you achieve this. Further read on how they work and their implementation differences is available in the [Saving and Renewing Tokens](/libraries/auth0-android/save-and-refresh-tokens) article. For this series of tutorials we're going to use the `SecureCredentialsManager` class as it encrypts the credentials before storing them in a private SharedPreferences file.


Create a new instance of the Credentials Manager. When you run the application, you should check if there are any previously stored credentials. You can use these credentials to bypass the login screen:

```java
// app/src/main/java/com/auth0/samples/LoginActivity.java

private SecureCredentialsManager credentialsManager;

protected void onCreate(Bundle savedInstanceState) {
    // Setup CredentialsManager
    auth0 = new Auth0(this);
    auth0.setOIDCConformant(true);
    credentialsManager = new SecureCredentialsManager(this, new AuthenticationAPIClient(auth0), new SharedPreferencesStorage(this));

    // Check if the activity was launched to log the user out
    if (getIntent().getBooleanExtra(EXTRA_CLEAR_CREDENTIALS, false)) {
        doLogout();
        return;
    }

    if (credentialsManager.hasValidCredentials()) {
        // Obtain the existing credentials and move to the next activity
        showNextActivity();
    }
}
```

::: note
The logic for authenticating and logging the user out is kept under the same activity. Ideally a single class should manage the handling of credentials. You can share this instance across activities as long as the Storage strategy persists the data in the same location. Check the `LoginActivity` class to understand how to achieve this in a single class.
:::


## Save the User's Credentials

After a successful login response, you can store the user's credentials using the `saveCredentials` method.

```java
// app/src/main/java/com/auth0/samples/LoginActivity.java

private final AuthCallback loginCallback = new AuthCallback() {
    @Override
    public void onFailure(@NonNull final Dialog dialog) {
        // Show error dialog
    }

    @Override
    public void onFailure(AuthenticationException exception) {
        // Show error message
    }

    @Override
    public void onSuccess(@NonNull Credentials credentials) {
        // User successfully authenticated
        credentialsManager.saveCredentials(credentials);
        showNextActivity();
    }
};
```

::: note
A Storage defines how data is going to be persisted in the device. The Storage implementation given to the Credentials Manager in the seed project uses a SharedPreferences file to store the user credentials in [Private mode](https://developer.android.com/reference/android/content/Context.html#MODE_PRIVATE). You can modify this behavior by implementing a custom Storage.
:::

## Recover the User's Credentials

Retrieving the credentials from the Credentials Manager is an async process as credentials may have expired and require to be refreshed. This renewing process is done automatically by the Credentials Manager as long as a valid Refresh Token is currently stored. A `CredentialsManagerException` exception will be raised if the credentials cannot be renewed.

```java
// app/src/main/java/com/auth0/samples/LoginActivity.java

private void showNextActivity() {
    credentialsManager.getCredentials(new BaseCallback<Credentials, CredentialsManagerException>() {
        @Override
        public void onSuccess(final Credentials credentials) {
            // Move to the next activity
            Intent intent = new Intent(LoginActivity.this, MainActivity.class);
            intent.putExtra(EXTRA_ACCESS_TOKEN, credentials.getAccessToken());
            intent.putExtra(EXTRA_ID_TOKEN, credentials.getIdToken());

            startActivity(intent);
            finish();
        }

        @Override
        public void onFailure(CredentialsManagerException error) {
            // Credentials could not be retrieved.
            finish();
        }
    });
}
```

::: note
The `SecureCredentialsManager` can prompt the user for local device authentication using the configured Lock Screen (PIN, Password, Pattern, Fingerprint) before giving them the stored credentials. This behavior can be enabled calling the `SecureCredentialsManager#requireAuthentication` method when setting up the Credentials Manager. The sample has this line commented for convenience, remove the comment to try it.
:::

## Log the User Out

To log the user out, it is normally enough to remove their credentials and navigate them back to the login screen. When using a Credentials Manager you do that calling `clearCredentials`. In addition, as you did previously for the login step, use the `WebAuthProvider` to remove the cookie set by the Browser at authentication time, so that the users are forced to re-enter their credentials the next time they try to authenticate. The sample combines these two strategies.

```java
// app/src/main/java/com/auth0/samples/LoginActivity.java

private void doLogout() {
    WebAuthProvider.logout(auth0)
            .withScheme("demo")
            .start(this, logoutCallback);
}

private VoidCallback logoutCallback = new VoidCallback() {
    @Override
    public void onSuccess(Void payload) {
        credentialsManager.clearCredentials();
    }

    @Override
    public void onFailure(Auth0Exception error) {
        // Log out canceled, keep the user logged in
        showNextActivity();
    }
};

```


The logout is achieved by using the `WebAuthProvider` class. This call will open the Browser and navigate the user to the logout endpoint. If the log out is cancelled, you might want to take the user back to where they were before attempting to log out. If the call succeeded you will remove the credentials from the manager instance.


::: note
If you are not using our Credentials Manager classes, you are responsible for ensuring that the user's credentials have been removed.
:::
