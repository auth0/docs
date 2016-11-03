---
title: Linking Accounts
description: This tutorial will show you how to use Lock within your Android project to link two different accounts for the same user.
budicon: 345
---

This tutorial will show you how to use Lock within your Android project to link two different accounts for the same user.

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-android-sample',
  path: '05-Linking-Accounts',
  requirements: [
    'Android Studio 2.2',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>

## Before Starting

You should be familiar with previous tutorials. This tutorial assumes that:

* You've integrated [Lock for Android](https://github.com/auth0/Lock.Android) as a dependency in your project and you're familiar with presenting the Lock login dialog. For further information, see the [login tutorial](01-login) and the [session handling](03-session-handling) tutorial first.
* You're familiar with the concepts of `userId` and `idToken`. You can find info about them in the session handling and user profile tutorials.

> It is highly recommended that you take a look at the [linking accounts](/link-accounts) documentation to understand the process of linking accounts.

## Enter Account Credentials

Here's the scenario: Your logged-in user wants to link one (or multiple) accounts to the account they are logged in with.

To do this, we will use Lock for logging in as we did in the [Login tutorial](01-login). In this case, we will send as an `Extra`, a boolean value to indicate that this is a secondary login.

```java
Intent intent = new Intent(this, LoginActivity.class);        intent.putExtra(Constants.LINK_ACCOUNTS, true);
intent.putExtra(Constants.PRIMARY_USER_ID, mUserProfile.getId());
startActivity(intent);
```

In the `LoginActivity.java` we obtain that value:

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
    startActivity(new Intent(LoginActivity.this, MainActivity.class));
  }
}
```

> Remember to instantiate the `auth0` object with `auth0 = new Auth0(${account.clientId}, ${account.namespace});`
> Also, bear in mind that the `App.getInstance().getUserCredentials().getIdToken()` method depends on how you stored your user's `Credentials`.

## Link an Account

Now we can link the accounts. You have a main user along with another account you want to link to that user. All we need is the `id` of the logged-in user and the `id_token`s for the two accounts: the one we had previously saved and the one that we just received in the login response.

```java
UsersAPIClient client = new UsersAPIClient(auth0, credentials.getIdToken());
  String primaryUserId = mUserProfile.getId();
  client.link(primaryUserId, secondaryCredentials.getIdToken());
```

## Retrieve Linked Accounts

The linked accounts are stored within the `UserProfile` as a list of `UserIdentity`, something we've previously learned when fetching the user profile (a process that we already know from the [user profile tutorial](04-user-profile)):

```java
@Override
public void onSuccess(final UserProfile payload) {
  mUserProfile.getIdentities();  //Get all the profile accounts
}
```

> For more information, check the [UserIdentity.java](https://github.com/auth0/Auth0.Android/blob/master/auth0/src/main/java/com/auth0/android/result/UserIdentity.java) documentation.

### 4. Unlink An Account

The unlink process is similar to the linking one, the only difference being that you need to specify the `identityId` and `provider` to unlink the connections. Additionally, as the first parameter, you need to use the main connection's `idToken`.

```java
UsersAPIClient client = new UsersAPIClient(mAuth0, App.getInstance().getUserCredentials().getIdToken());
client.unlink(primaryUserId, secondaryUserId, secondaryProvider);
```

> You can access the userId directly from the list, `userProfile.getIdentities().get(0).getId()`, if you know the connection's position in the array.
