---
description: Keeping your user logged in
---

::: panel-warning Version Warning
This document is not yet updated to use [Lock for Android](https://github.com/auth0/Lock.Android) 2.0. It will be soon!
:::

# Lock Android: Refreshing JWT Tokens

When an authentication is performed with the `offline_access` scope included, it will return a [refresh token](/refresh-token) that can be used to request a new JWT token and avoid asking the user their credentials again.

> Lock.Android will include the `offline_scope` scope by default.

Before we start, we have to retreive `id_token` or `refresh_token` from the token when a the user logs in. 

```java
private BroadcastReceiver authenticationReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
        Token token = intent.getParcelableExtra(Lock.AUTHENTICATION_ACTION_TOKEN_PARAMETER);
        String idToken = token.getIdToken();
        String refreshToken = token.getRefreshToken();
        // Store id_token or refresh_token in a secure storage
    }
};
```

Then, we need to store `id_token` or `refresh_token` in a secure storage after the user is authenticated by Auth0. And finally, you can request a new `id_token` using either of them by calling to Auth0`s **delegation** endpoint.

## Using a non-expired id_token

```java
String idToken = // Retrieve id_token from the secure storage
Lock lock = LockContext.getLock(this);
AuthenticationAPIClient client = lock.getAuthenticationAPIClient();
client.delegationWithIdToken(idToken).start(new RefreshIdTokenCallback() {
    @Override
    public void onSuccess(String idToken, String tokenType, int expiresIn) {
        //SUCCESS
    }

    @Override
    public void onFailure(Throwable error) {
        //FAILURE
    }
});
```

## Using refresh_token

```java
String refreshToken = // Retrieve refresh_token from the secure storage
Lock lock = LockContext.getLock(this);
AuthenticationAPIClient client = lock.getAuthenticationAPIClient();
client.delegationWithRefreshToken(refreshToken).start(new RefreshIdTokenCallback() {
    @Override
    public void onSuccess(String idToken, String tokenType, int expiresIn) {
        //SUCCESS
    }

    @Override
    public void onFailure(Throwable error) {
        //FAILURE
    }
});
```
