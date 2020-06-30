---
title: Lock Android v1 Refreshing JWT Tokens
description: Keeping your user logged in
topics:
  - libraries
  - lock
  - android
  - passwordless
  - tokens
contentType:
  - how-to
  - concept
useCase:
  - add-login
  - enable-mobile-auth
---
# Lock Android: Refreshing JWT Tokens

<%= include('../_includes/_lock-version') %>

<%= include('../../../_includes/_uses-delegation') %>

When an authentication is performed with the `offline_access` <dfn data-key="scope">scope</dfn> included, it will return a <dfn data-key="refresh-token">Refresh Token</dfn> that can be used to request a new JWT token and avoid asking the user for their credentials again.

::: note
Lock.Android will include the `offline_scope` scope by default.
:::

Before we start, we have to retrieve the ID Token or Refresh Token from the token when the user logs in.

```java
private BroadcastReceiver authenticationReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
        Token token = intent.getParcelableExtra(Lock.AUTHENTICATION_ACTION_TOKEN_PARAMETER);
        String idToken = token.getIdToken();
        String refreshToken = token.getRefreshToken();
        // Store ID Token or Refresh Token in secure storage
    }
};
```

Then, we need to store the ID Token or Refresh Token in secure storage after the user is authenticated by Auth0. And finally, we can request a new ID Token using either of them by calling Auth0`s **delegation** endpoint.

## Using a non-expired ID Token

```java
String idToken = // Retrieve ID Token from secure storage
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
