---
section: libraries
toc: true
description: How to use Auth0.Android with passwordless connections
topics:
  - libraries
  - android
  - passwordless
contentType: how-to
useCase: enable-mobile-auth
---
# Auth0.Android Passwordless Authentication

<dfn data-key="passwordless">Passwordless</dfn> can be done via email or via SMS, and either by sending the user a code, or sending them a link which contains a code. All of these methods of Passwordless authentication will require two steps - requesting the code, and then inputting the code for verification. 

## Configure Auth0 and the Android SDK

### Enable the Passwordless OTP Grant for the Application

In order to be able to use the Passwordless API from a Native client, you first need to enable the Passwordless OTP grant for your application in **Dashboard > Applications > (YOUR APPLICATION) > Settings > Advanced Settings > Grant Types**.

### Initialize the Android SDK 

Using the Passwordless API requires setting using the Auth0 Android SDK version 1.20 or higher, configured to work in OIDC conformant mode. This can be achieved by setting the `ODICConformant` property to `true`:

```java
Auth0 account = new Auth0("{YOUR_CLIENT_ID}", "{YOUR_DOMAIN}");
//Configure the account in OIDC conformant mode
account.setOIDCConformant(true);
//Use the account in the API clients
```

## Implement Passwordless Authentication Steps

## Request the code

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

You can use the `passwordlessWithSms` method to send the code using SMS. 

## Input the code

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

You can use the `loginWithSms` method to send the code received by SMS and authenticate the user.

::: note
The default <dfn data-key="scope">scope</dfn> used is `openid`.
:::
