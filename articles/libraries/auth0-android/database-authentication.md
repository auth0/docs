---
section: libraries
toc: true
description: How to use Auth0.Android with database connections
---
# Auth0.Android Database Authentication

## Login with a database connection

::: panel-warning Database authentication on Native Platforms
Username/Email & Password authentication from native clients is disabled by default for new tenants as of 8 June 2017. Users are encouraged to use the [Hosted Login Page](/hosted-pages/login) and perform Web Authentication instead. If you still want to proceed you'll need to enable the Password Grant Type on your dashboard first. See [Client Grant Types](/clients/client-grant-types) for more information.
:::

Logging in with a database connection requires calling `login` with the user's **email**, **password**, and the **connection** you wish to authenticate with. The response will be a Credentials object. Additionally, specifying the **audience** will yield an OIDC conformant response during authentication.

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

::: panel Scope
Note that the default scope used is `openid`
:::

## Sign up with database connection

Signing up with a database connection is similarly easy. Call the `signUp` method, passing the user's email, password, and connection name, to initiate the signup process.

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