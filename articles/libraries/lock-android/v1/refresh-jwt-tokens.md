---
title: Lock Android v1 Refreshing JWT Tokens
description: Keeping your user logged in
---
# Lock Android: Refreshing JWT Tokens

<%= include('../_includes/_lock-version') %>

When an authentication is performed with the `offline_access` scope included, it will return a [Refresh Token](/refresh-token) that can be used to request a new JWT token and avoid asking the user for their credentials again.

::: note
Lock.Android will include the `offline_scope` scope by default.
:::

Before we start, we have to retrieve the `id_token` or Refresh Token from the token when the user logs in.

```java
private BroadcastReceiver authenticationReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
        Token token = intent.getParcelableExtra(Lock.AUTHENTICATION_ACTION_TOKEN_PARAMETER);
        String idToken = token.getIdToken();
        String refreshToken = token.getRefreshToken();
        // Store id_token or Refresh Token in secure storage
    }
};
```

Then, we need to store the `id_token` or Refresh Token in secure storage after the user is authenticated by Auth0. And finally, we can request a new `id_token` using either of them by calling Auth0`s **delegation** endpoint.

## Using a non-expired id_token

```java
String idToken = // Retrieve id_token from secure storage
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

## Using Refresh Token

```java
String refreshToken = // Retrieve Refresh Token from secure storage
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
