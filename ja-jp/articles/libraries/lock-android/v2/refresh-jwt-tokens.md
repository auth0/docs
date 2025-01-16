---
section: libraries
title: Lock Android v2 Refreshing JWTs
description: Keeping your user logged in
topics:
  - libraries
  - lock
  - android
  - tokens
contentType:
  - how-to
useCase:
  - add-login
  - enable-mobile-auth
---
# Lock Android: Refreshing JWT Tokens

<%= include('../../../_includes/_uses-delegation') %>

When an authentication is performed with the `offline_access` <dfn data-key="scope">scope</dfn> included, the returned Credentials will contain a <dfn data-key="refresh-token">Refresh Token</dfn> and an ID Token. Both tokens can be used to request a new <dfn data-key="access-token">Access Token</dfn> and avoid asking the user their credentials again.

We need to store the tokens in a secure storage after a successful authentication. Keep in mind that Refresh Tokens **never expire**. To request a new token you'll need to use `auth0.android`'s `AuthenticationAPIClient`. Don't forget to request the same scope used in the first login call.

## Using Refresh Token

```java
String refreshToken = // Retrieve Refresh Token from secure storage
Auth0 account = new Auth0("${account.clientId}", "${account.namespace}");
auth0.setOIDCConformant(true);

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

## Using a non-expired ID Token

```java
String idToken = // Retrieve ID Token from the secure storage
Auth0 account = new Auth0("${account.clientId}", "${account.namespace}");
auth0.setOIDCConformant(true);

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
