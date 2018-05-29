---
section: libraries
description: Keeping your user logged in with Auth0.Android
toc: true
tags:
  - libraries
  - android
  - tokens
---
# Auth0.Android Saving and Renewing Tokens

When an authentication is performed with the `offline_access` scope included, it will return a [Refresh Token](/refresh-token) that can be used to request a new user token, without forcing the user to perform authentication again.

## Credentials Manager

[Auth0.Android](https://github.com/auth0/Auth0.Android) provides a utility class to streamline the process of storing and renewing credentials. You can access the `accessToken` or `idToken` properties from the [Credentials](https://github.com/auth0/Auth0.Android/blob/master/auth0/src/main/java/com/auth0/android/result/Credentials.java) instance. This is the preferred method to manage user credentials.

First, add the library dependency to your build.gradle file:

```gradle
compile 'com.auth0.android:auth0:1.+'
```

Next, decide which class to use depending on your Android SDK target version.

### API less than 21

If you require APIs lower than 21 (Lollipop) create a new instance of `CredentialsManager`. This class makes use of the `Context.MODE_PRIVATE` to store the credentials in a key-value preferences file, accessible only to your app. The data is stored in plaintext.

### API equal to or greater than 21

If you require APIs equal or greater than 21 (Lollipop) create a new instance of `SecureCredentialsManager`. This class has the same methods as the one above, but encrypts the data before storing it using a combination of _RSA_ and _AES_ algorithms along with the use of [Android KeyStore](https://developer.android.com/reference/java/security/KeyStore.html).

## Using the CredentialsManager class

### Setup the CredentialsManager

Create a new instance by passing an `AuthenticationAPIClient` and a `Storage` implementation.

```java
Auth0 auth0 = new Auth0(this);
AuthenticationAPIClient apiClient = new AuthenticationAPIClient(auth0);
CredentialsManager manager = new CredentialsManager(apiClient, new SharedPreferencesStorage(this));
```

### Current State of the Authentication

Stored credentials are considered valid if they have not expired or can be refreshed. Check if a user has already logged in:

```java
boolean loggedIn = manager.hasValidCredentials();
```

When you want to log the user out of your app, remove the stored credentials and direct them to the login screen.

```java
manager.clearCredentials();
//Show login screen
```

### Retrieving Credentials

Because the credentials may need to be refreshed against Auth0 Servers, this method is asynchronous. Pass a callback implementation where you'd like to receive the credentials. Credentials returned by this method upon success are always valid.

```java
manager.getCredentials(new BaseCallback<Credentials, CredentialsManagerException>() {
    @Override
    public void onSuccess(Credentials credentials) {
        //Use credentials
    }

    @Override
    public void onFailure(CredentialsManagerException error) {
        //No credentials were previously saved or they couldn't be refreshed
    }
});
```

::: note
If the `accessToken` has expired, the manager will automatically use the `refreshToken` and renew the credentials for you. New credentials will be stored for future access.
:::

### Save new Credentials

You can save the credentials obtained during authentication in the manager.

```java
manager.saveCredentials(credentials);
```

## Using the SecureCredentialsManager class

### Setup the SecureCredentialsManager

Setup is a little different to the CredentialsManager class. Create a new instance by passing a valid android `Context`, an `AuthenticationAPIClient` and a `Storage` implementation.

```java
Auth0 auth0 = new Auth0(this);
AuthenticationAPIClient apiClient = new AuthenticationAPIClient(auth0);
SecureCredentialsManager manager = new SecureCredentialsManager(this, apiClient, new SharedPreferencesStorage(this));
```

The methods to obtain, save, check for existence and clearing the credentials are the ones explained before.

### Pre-Authenticate the User

This class provides optional functionality for additional authentication using the device's configured Lock Screen. If the Lock Screen Security is set to something different than PIN, Pattern, Password or Fingerprint, this feature won't be available. You need to call the method below to enable the authentication. Pass a valid `Activity` context, a request code, and 2 optional Strings to use as title and description for the Lock Screen.

```java
private static final int RC_UNLOCK_AUTHENTICATION = 123;

//Called from an Activity
boolean available = manager.requireAuthentication(this, RC_UNLOCK_AUTHENTICATION, getString(R.string.unlock_authentication_title), getString(R.string.unlock_authentication_description));
```

If the feature was enabled, the manager will prompt the user to authenticate using the configured Lock Screen. The result of this call will be obtained in the `onActivityResult` method of the activity passed before as first parameter. If the feature was not enabled, Lock Screen authentication will be skipped.

After checking that the received request code matches the one used in the configuration step, redirect the received parameters to the manager to finish the authentication. The credentials will be yield to the original callback.

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (requestCode == RC_UNLOCK_AUTHENTICATION && manager.checkAuthenticationResult(requestCode, resultCode)) {
        return;
    }
    super.onActivityResult(requestCode, resultCode, data);
}
```
