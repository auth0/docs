---
title: Session Handling
description: This tutorial will show you how to use Lock v2 to maintain a session’s connectivity.
---

This tutorial will show you how to use Lock to mantain an active session with Auth0.

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


For this, you will need to handle the user's `credentials`. Let's take a look at this class, which is composed by three objects:

* ``idToken``: Identity Token that proves the identity of the user.
* ``accessToken``: Access Token used by the Auth0 API.
* ``refreshToken``: Refresh Token that can be used to request new tokens without signing in again.

Those objects are the keys needed to keep the user connected, as they will be used in all the API calls`.

### Before Starting

Be sure that you have completed the [Login](01-login.md) quickstart.

### 1. Save The User's Credentials

Your first step is to save--through a secure method--the user's credentials obtained in the login success response. 

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

::: panel-info In the seed project, we use the `SharedPreference` object in private mode to store different `Credentials` values. There are other means of storage, but we won't cover them in this tutorial. Feel free to save them if you’d like.

:::

### 2. At Startup: Check idToken existence

The main purpose of storing this token is to save users from having to re-enter their login credentials when relaunching the app. Once the app has launched, we need to check for the existence of an `idToken` to see if we can automatically log the user in and redirect the user straight into the app’s main flow, skipping the login screen.

To do so, we check whether this value exists at startup to either prompt for login information or to try to perform an automated login.

```java
if(CredentialsManager.getCredentials(this).getIdToken() == null) {
	// Prompt Login screen.
} 
else {
	// Try to make an automatic login
}
```

### 3. Validate an existent idToken

If the idToken exists, we need to check whether it’s still valid. To do so, we will fetch the user profile with the `AuthenticationAPI`.

```java
AuthenticationAPIClient aClient = new AuthenticationAPIClient(auth0);
aClient.tokenInfo(CredentialsManager.getCredentials(this).getIdToken())
       .start(new BaseCallback<UserProfile, AuthenticationException>() {
	@Override
	public void onSuccess(final UserProfile payload) {
		// Valid ID > Navigate to the app's MainActivity
		startActivity(new Intent(getApplicationContext(), MainActivity.class));
	}
	@Override
	public void onFailure(AuthenticationException error) {
		// Invalid ID Scenario		
	}
});
```

How you deal with a non-valid idToken is up to you. You will normally choose between two scenarios. You can either ask users to re-enter their credentials or use the `refreshToken` to get a new valid `idToken`.

>If you want users to re-enter their credentials, you should clear the stored data and prompt the login screen. 

 
### 4. Request A New idToken

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
::: panel-info We recommend that you read and understand the [refresh token documentation](/refresh-token) before proceeding. For example, you should remember that even though the refresh token cannot expire, it can be revoked.                
:::
        
### 4. Log Out

To log the user out, you just need to remove the user's credentials and navigate them to the login screen.

An example would be:

```java
private void logout() {
	setUserCredentials(null); 
	startActivity(new Intent(this, LoginActivity.class));
}
```

> **Note:** Deleting the user credentials depends on how you store them.

### Optional: Encapsulated session handling

As you have probably realized by now, session handling is not a straightforward process. All the token-related information and processes can be encapsulated into a class that separates its logic from the activity. We recommend that you download the sample project from this tutorial and take a look at its implementation, focusing on the CredentialManager class, which is in charge of dealing with this process as well as saving and obtaining the credentials object from the SharedPreferences.

