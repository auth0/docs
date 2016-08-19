---
title: Session Handling
description: This tutorial will show you how to use Lock v2 to mantain a session connected.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* AndroidStudio 2.0
* Emulator - Nexus5X - Android 6.0 
:::

 <%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-android-sample/tree/master/03-Session-Handling',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-android-sample',
  pkgBranch: 'master',
  pkgPath: '03-Session-Handling',
  pkgFilePath: '03-Session-Handling/app/src/main/res/values/strings.xml',
  pkgType: 'replace'
}) %>

This tutorial will show you how to use Lock to mantain an active session with Auth0.

For this, you will need to handle the user's `credentials`. Let's take a look at this class, which is composed by three objects:

* ``idToken``: Identity Token that proves the identity of the user.
* ``accessToken``: Access Token used by the Auth0 API.
* ``refreshToken``: Refresh Token that can be used to request new tokens without signing in again.

Those objects are the keys needed to keep the user connected, as they will be used in all the API calls`.

### Before Starting

Be sure that you have completed the [Login](01-login.md) quickstart.

### 1. Save the User's Credentials

Your first step is to save--through a secure method--the user's credentials obtained in the login success response. We won't cover how to do that in this tutorial, but feel free to save it as you like.

```java
private LockCallback callback = new AuthenticationCallback() {
	@Override
	public void onAuthentication(Credentials credentials) {
		// Login Success response
		saveCredentials(credentials)
	}
	...
};
```

 
### 2. Request a new idToken

First, for both cases, you need to instantiate an `AuthenticationAPIClient`:

```java
AuthenticationAPIClient client = new AuthenticationAPIClient(
      new Auth0(${account.clientId}, ${account.namespace}));
```

#### i. Using a non-expired idToken

If your current idToken hasn't expired, you can use it to get a new one.

```java
String idToken = // TODO: GET STORED TOKEN ID

client.delegationWithIdToken(idToken)
      .start(new BaseCallback<Delegation>() {

	@Override
	public void onSuccess(Delegation payload) {
            
		payload.getIdToken(); // New ID Token
		payload.getExpiresIn(); // New ID Token Expire Date
            
	}

	@Override
	public void onFailure(Auth0Exception error) {
		
	}
});
```         

#### ii. Using refreshToken

If the `idToken` already expired, you can always use the `refreshToken` to get a new one, without having to login again. For this reason, the token must be securely saved.

```java
String refreshToken = // TODO: GET STORED REFRESH ID
        
client.delegationWithRefreshToken(refreshToken)
      .start(new BaseCallback<Delegation>() {
      
	@Override
	public void onSuccess(Delegation payload) {
		payload.getIdToken(); // New ID Token
		payload.getExpiresIn(); // New ID Token Expire Date
	}

	@Override
	public void onFailure(Auth0Exception error) {

	}
});
```                

        
### 3. Log Out

To log the user out, you just need to remove the user's credentials and navigate them to the login screen.

An example would be:

```java
private void logout() {
	setUserCredentials(null); 
	startActivity(new Intent(this, LoginActivity.class));
}
```

> **Note:** Deleting the user credentials depends on how you store them.

