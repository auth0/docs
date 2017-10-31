---
title: Session Handling
description: This tutorial will show you how to login and maintain a session’s connectivity.
seo_alias: android
budicon: 280
---

This tutorial shows you how to let users log in and maintain an active session with Auth0.

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

You need the `Credentials` class to handle users' credentials. The class is composed of these elements:

* `accessToken`: Access token used by the Auth0 API. To learn more, see the [access token documentation](/tokens/access-token).
* `idToken`: Identity token that proves the identity of the user. To learn more, see the [ID token documentation](/tokens/id-token).
* `refreshToken`: Refresh token that can be used to request new tokens without signing in again. To learn more, see the [refresh token documentation](/tokens/refresh-token/current).
* `tokenType`: The type of tokens issued by the server.
* `expiresIn`: The number of seconds before the tokens expire.
* `expiresAt`: The date when the tokens expire.
* `scope`: The scope that was granted to a user. This information is shown only if the granted scope is different than the requested one.

Tokens are objects used to prove your identity against the Auth0 APIs. Read more about them in the [tokens documentation](https://auth0.com/docs/tokens).

## Before You Start

::: note
Before you continue with this tutorial, make sure that you have completed the [Login](/quickstart/native/android/00-login) tutorial.
:::

Before you launch the login process, make sure you get a valid refresh token in the response. To do that, ask for the `offline_access` scope. Find the snippet in which you are initializing the `WebAuthProvider` class. To that snippet, add the line `withScope("openid offline_access")`.

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

## Save the User's Credentials

Save the user's credentials obtained in the login success response.

::: warning
Make sure you use a secure method.
:::

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
User credentials are stored in [Private mode](https://developer.android.com/reference/android/content/Context.html#MODE_PRIVATE) in the seed project in the `SharedPreferences` file. You can achieve this with the `CredentialsManager` class. For details, check the implementation in the project code. There are better and more secure ways to store tokens, but we will not cover them in this tutorial.
:::

## Check for Tokens when the Application Starts

To save your users the effort of logging in every time they open your app, use their access tokens. You can check for the access token when a user starts the app. If you find the token, you can automatically log the user in and direct them straight to your app's main flow.  


```java
// app/src/main/java/com/auth0/samples/LoginActivity.java

String accessToken = CredentialsManager.getCredentials(this).getAccessToken();
if (accessToken == null) {
  // Prompt Login screen.
} else {
  // Try to make an automatic login
}
```

## Validate the Existing Token

If the access token exists, the next step is to check if it is valid. 
You can choose between two options: 
* Save the time when the user receives a new pair of credentials. When you need to use the access token, check how many seconds have passed since the user got the token. When the number exceeds the number specified in the `expiresIn` value, the token is no longer valid. 
* Call the Auth0 Authentication API and check the response.

::: note 
This tutorial shows you how to call the Auth0 Authentication API with the `/userinfo` endpoint.
:::


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

You need to decide how to deal with an invalid token. Typically, you can choose between two options: 
* Ask the user to re-enter their credentials.
* Use a refresh token to get a new valid access token.

::: note
This tutorial shows how to use a refresh token. If you want users to re-enter their credentials, clear the stored data and prompt the login screen.
:::

## Refresh the User's Session

::: panel Learn about refresh tokens
Before you go further with this tutorial, read the [refresh token documentation](/refresh-token).
It is important that you remember the following:
* Refresh tokens must be securely saved.
* Even though refresh tokens cannot expire, they can be revoked. 
* New tokens will never have a different scope than the scope you requested during the first login.
:::

Create an `AuthenticationAPIClient` instance:

```java
// app/src/main/java/com/auth0/samples/MainActivity.java

AuthenticationAPIClient aClient = new AuthenticationAPIClient(auth0);
```

Use the refresh token to get new credentials:

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

## Log the User Out

To log the user out, you must remove their credentials and navigate them to the login screen.

For example, you can do the following:

```java
// app/src/main/java/com/auth0/samples/MainActivity.java

private void logout() {
  CredentialsManager.deleteCredentials(this);
  startActivity(new Intent(this, LoginActivity.class));
  finish();
}
```

::: note
Depending on the way you store users' credentials, you delete them differently. 
:::

## Optional: Encapsulate Session Handling

Handling users' sessions is not a straightforward process. You can simplify it by storing token-related information and processes in a class. The class separates the logic for handling users' sessions from the activity. 

We recommend that you download the sample project from this tutorial and take a look at its implementation. Focus on the `CredentialsManager` class, which manages session handling, obtains user credentials from the `SharedPreferences` file and saves them.