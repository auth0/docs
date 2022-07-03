---
section: libraries
toc: true
description: How to use Auth0.Android with database connections
topics:
  - libraries
  - android
  - db-connections
contentType: how-to
useCase: enable-mobile-auth
---
# Auth0.Android Database Authentication

::: panel-warning Database authentication on Native Platforms
Username/Email & Password authentication from native applications is disabled by default for new tenants as of 8 June 2017. Users are encouraged to use <dfn data-key="universal-login">Universal Login</dfn> and perform Web Authentication instead. If you still want to proceed you'll need to enable the Password Grant Type on your dashboard first. See [Application Grant Types](/applications/concepts/application-grant-types) for more information.
:::

## Log in with a database connection

To log in with a database connection, call `login` with the user's **email**, **password**, and the **connection** you wish to authenticate with. The response will be a Credentials object. 

Additionally, specifying the <dfn data-key="audience">**audience**</dfn> will yield an OIDC-conformant response during authentication.

```java
authentication
    .login("info@auth0.com", "a secret password", "my-database-connection")
    .setAudience("https://${account.namespace}/userinfo")
    .start(new BaseCallback<Credentials, AuthenticationException>() {
        @Override
        public void onSuccess(Credentials payload) {
            //Logged in!
        }

        @Override
        public void onFailure(AuthenticationException error) {
            //Error!
        }
    });
```

::: note
The default <dfn data-key="scope">scope</dfn> used is `openid`.
:::

## Sign up with database connection

To sign up with a database connection you have to call the `signUp` method, passing the user's email, password, and connection name.

```java
authentication
    .signUp("info@auth0.com", "a secret password", "my-database-connection")
    .setAudience("https://${account.namespace}/userinfo")
    .start(new BaseCallback<Credentials, AuthenticationException>() {
        @Override
        public void onSuccess(Credentials payload) {
            //Signed Up & Logged in!
        }

        @Override
        public void onFailure(AuthenticationException error) {
            //Error!
        }
    });
```
