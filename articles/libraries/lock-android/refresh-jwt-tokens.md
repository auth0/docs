---
section: libraries
description: Keeping your user logged in
---

# Lock Android: Refreshing JWT Tokens

When an authentication is performed with the `offline_access` scope included, the returned Credentials will contain a [refresh_token](/refresh-token) and a `id_token`. Both tokens can be used to request a new `access_token` and avoid asking the user their credentials again.

We need to store the tokens in a secure storage after a successful authentication. Keep in mind that refresh tokens **never expire**. To request a new token you'll need to use `auth0.android`'s `AuthenticationAPIClient`. Don't forget to request the same scope used in the first login call.


## Using a non-expired id_token

```java
String idToken = // Retrieve id_token from the secure storage
Auth0 auth0 = // create account

AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);
client.delegationWithIdToken(idToken)
  .setScope("openid email")
  .start(new BaseCallback<Delegation, AuthenticationException>() {
    @Override
    public void onSuccess(Delegation delegation) {
        //SUCCESS
        String idToken = delegation.getIdtoken();
    }

    @Override
    public void onFailure(AuthenticationException error) {
        //FAILURE
    }
  });
```

## Using refresh_token

```java
String refreshToken = // Retrieve refresh_token from the secure storage
Auth0 auth0 = // create account

AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);
client.renewAuth(refreshToken)
  .addParameter("scope", "openid email")
  .start(new BaseCallback<Credentials, AuthenticationException>() {
    @Override
    public void onSuccess(Credentials credentials) {
      //SUCCESS
      String accessToken = credentials.getAccessToken();
    }

    @Override
    public void onFailure(AuthenticationException error) {
        //FAILURE
    }
});
```
