---
title: Auth0 Android Quickstarts - 3. Session Handling
description: This tutorial will show you how to use Lock10 to mantain a session connected.
---

## Android - Session Handling Tutorial

This tutorial will show you how to use Lock10 to mantain an active session with Auth0.

The user's Credentials, contains three kind of tokens:

* idToken: Identity Token that proves the identity of the user.
* accessToken: Access Token used by Auth0 API.
* refreshToken: Refresh Token that can be used to request new tokens without signing in again.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* AndroidStudio 2.0
* Emulator - Nexus5X - Android 6.0 
  :::


### Before Starting

Be sure that you have completed the [Basic Login](01-login.md) Quickstart.

### 1. Save the User's Credential

Your first step is to save, through a secure method, the user's credentials obtained in the login success response. We won't cover how to do that on this tutorial, feel free to save it.

```Android
private LockCallback callback = new AuthenticationCallback() {
            @Override
            public void onAuthentication(Credentials credentials) {
				// Login Success response
				saveCredentials(credentials)
            }
				...
        };
```

 
### 2. Request a new tokenID

#### i. Using a non-expired tokenID

In the case your current tokenID didn't expire, you can use it to get a new one, with a newer expire date.

        String idToken = // GET STORED TOKEN ID
        AuthenticationAPIClient client = new AuthenticationAPIClient(new Auth0(CLIENT_ID, AUTH0_DOMAIN));
        
        client.delegationWithIdToken(idToken).start(new BaseCallback<Delegation>() {
            @Override
            public void onSuccess(Delegation payload) {
            
            payload.getIdToken(); // New ID Token
            payload.getExpiresIn(); // New ID Token Expire Date
            
            }

            @Override
            public void onFailure(Auth0Exception error) {

            }
        });
                

#### ii. Using refreshToken

If the tokenID already expired, you can always use the refreshToken to get a new one, without having to login again. For this reason, this token must be securely saved.


        String refreshToken = // GET STORED REFRESH ID
        AuthenticationAPIClient(new Auth0(CLIENT_ID, AUTH0_DOMAIN));
        
        authenticationClient.delegationWithRefreshToken(refreshToken).start(new BaseCallback<Delegation>() {
            @Override
            public void onSuccess(Delegation payload) {
                payload.getIdToken(); // New ID Token
                payload.getExpiresIn(); // New ID Token Expire Date
            }

            @Override
            public void onFailure(Auth0Exception error) {

            }
        });
                

        
### 3. Logout

Whenever you want to Logout, you just need to erase the user's credentials, and navigate the user to the login screen.

An example would be:

```android
private void logout() {
        setUserCredentials(null); 
        startActivity(new Intent(this, LoginActivity.class));
    }
```

> Deleting the user credentials depends on how you store them.
> 

### Done!

This exercise was simple! Look forward to other tutorials of Lock10.

