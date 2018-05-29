---
section: libraries
toc: true
description: How to use Auth0.Android with passwordless connections
tags:
  - libraries
  - android
  - passwordless
---
# Auth0.Android Passwordless Authentication

<%= include('../../_includes/_native_passwordless_warning') %>

Passwordless can be done via email or via SMS, and either by sending the user a code, or sending them a link which contains a code. All of these methods of Passwordless authentication will require two steps - requesting the code, and then inputting the code for verification. 

Note that Passwordless authentication **cannot be used** with the [OIDC Conformant Mode](/api-auth/intro) enabled.

## 1. Request the code

In this example, requesting the code is done by calling `passwordlessWithEmail` with the user's email, `PasswordlessType.CODE`, and the name of the connection as parameters. On success, you may wish to display a notice to the user that their code is on the way, and perhaps route them to the view where they will input that code.

```java
authentication
    .passwordlessWithEmail("info@auth0.com", PasswordlessType.CODE, "my-passwordless-connection")
    .start(new BaseCallback<Void, AuthenticationException>() {
        @Override
        public void onSuccess(Void payload) {
            //Code sent!
        }

        @Override
        public void onFailure(AuthenticationException error) {
            //Error!
        }
    });
```

## 2. Input the code

Once the user has a code, they can input it. Call the `loginWithEmail` method, and pass in the user's email, the code they received, and the name of the connection in question. Upon success, you will receive a Credentials object in the response.

```java
authentication
    .loginWithEmail("info@auth0.com", "123456", "my-passwordless-connection")
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
The default scope used is `openid`.
:::
