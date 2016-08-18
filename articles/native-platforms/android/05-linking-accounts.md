---
title: Linking Accounts
description: This tutorial will show you how to use Lock v2 within your Android project to link two different accounts for the same user.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* AndroidStudio 2.0
* Emulator - Nexus5X - Android 6.0 
:::

 <%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-android-sample/tree/master/05-Linking-Accounts',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-android-sample',
  pkgBranch: 'master',
  pkgPath: '05-Linking-Accounts',
  pkgFilePath: '05-Linking-Accounts/app/src/main/res/values/strings.xml',
  pkgType: 'replace'
}) %>


### Before Starting

You should be familiar with previous tutorials. This tutorial assumes that:

* You've integrated [Lock for Android](https://github.com/auth0/Lock.Android) dependency in your project and you're familiar with presenting the Lock login dialog. For further information, check out the [login tutorial](01-login.md) and the [session handling](03-session-handling.md) tutorial first.
* You're familiar with the concepts of `userId` and `idToken`. You can find info about them in the session handling and user profile tutorials.

>It is highly recommended that you take a look at the [linking accounts](${uiURL}/#/link-accounts) documentation to understand the process of linking accounts

### 1. Enter account credentials

Here's the scenario: You have a user which is logged in, and he wants to link one (or multiple) accounts to that account he's logged in with, such that, he can login with any of them and get into that account.

To do this, we will use the Lock's login as we explained it before in the Login tutorial. In this case, we will send as an Extra, a boolean value to indicate that this is a secondary login mean.

```java
Intent lockToLinkAccounts = new Intent(this, LockActivity.class);        lockToLinkAccounts.putExtra(Constants.LINK_ACCOUNTS, true);
startActivity(lockToLinkAccounts);
```

In the `LockActivity.java` we obtain that value:

```java
mLinkSessions = getIntent().getExtras().getBoolean(Constants.LINK_ACCOUNTS, false);
```

Then, in the login response, we decide if we advance to the `MainActivity.java` as usual, or return to the already instantiated one:

```java
@Override
public void onAuthentication(Credentials secondaryCredentials) {
	if(mLinkSessions){
		// Link the accounts
	}
	else {
		App.getInstance().setUserCredentials(credentials);
		startActivity(new Intent(getApplicationContext(), MainActivity.class));
	}
}
```

> Remember to instantiate the `auth0` object with `auth0 = new Auth0(${account.clientId}, ${account.namespace});`
> Also, bear in mind that the `App.getInstance().getUserCredentials().getIdToken()` method depends on how you stored your user's `Credentials`.

### 2. Link an account

Now, we need to link the accounts. This is pretty simple! You have a user, and another account you want to link with that user. All we need, are the two accounts `token_id`, the one we had previously saved and the one that we just received in the login response. 

```java
UsersAPIClient client = new UsersAPIClient(auth0, credentials.getIdToken());                client.link(App.getInstance().getUserCredentials().getIdToken(),
                        secondaryCredentials.getIdToken());
```        
### 3. Retrieve linked accounts

The linked accounts, are stored within the `UserProfile` as a list of `UserIdentity`, something we've previously learned when fetching the user profile (a process that we already know from the [user profile tutorial](04-user-profile)):

```java
@Override
public void onSuccess(final UserProfile payload) {
	mUserProfile = payload;
	mUserProfile.getIdentities();
}
```
> For more information, check the [UserIdentity.java](https://github.com/auth0/Auth0.Android/blob/cf98a17ddc26b85bd40daa8c69913c0df50d33d1/auth0/src/main/java/com/auth0/android/result/UserIdentity.java) documentation.

### 4. Unlink an account

The unlink process is similar to the link one, with the difference that you need to specify the connection's to be unlinked `identityId` and `provider` parameters. Also, as first parameter we use the main connection `tokenID`. 

```java
UsersAPIClient client = new UsersAPIClient(mAuth0, App.getInstance().getUserCredentials().getIdToken());
client.unlink(primaryUserId, secondaryUserId, secondaryProvider);
```
> You can access the userId directly from the list, `userProfile.getIdentities().get(0).getId()`, knowing the position of the connection's position. 

### Done

That's it! Now, your users can login with different accounts! 
