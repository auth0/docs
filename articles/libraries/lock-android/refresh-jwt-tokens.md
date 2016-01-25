---
toc_title: Refreshing JWT Tokens
description: Keeping your user logged in
---

# Lock Android: Refreshing JWT Tokens

When an authentication is performed with the `offline_scope` included, it will return a [refresh token](/refresh-token) that can be used to request a new JWT token and avoid asking the user their credentials again.

> Lock.Android will include the `offline_scope` scope by default.

Before we start, we need to store `id_token` & `refresh_token` in a secure storage after the user is authenticated by Auth0. Then you can request a new `id_token` using either of them by calling to Auth0`s **delegation** endpoint.

## Using a non-expired id_token

```java
Lock lock = LockContext.getLock(this);
AuthenticationAPIClient client = lock.getAuthenticationAPIClient();
client.delegationWithIdToken("ID_TOKEN").start(new RefreshIdTokenCallback() {
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
Lock lock = LockContext.getLock(this);
AuthenticationAPIClient client = lock.getAuthenticationAPIClient();
client.delegationWithRefreshToken("REFRESH_TOKEN").start(new RefreshIdTokenCallback() {
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