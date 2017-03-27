---
title: Linking Accounts
description: This tutorial will show you how to use Lock within your Android project to link two different accounts for the same user.
budicon: 345
---

This tutorial will show you how to use Lock within your Android project to link two different accounts for the same user.

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-android-sample',
  path: '05-Linking-Accounts',
  requirements: [
    'Android Studio 2.3',
    'Android SDK 24',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>

## Before Starting

You should be familiar with previous tutorials. This tutorial assumes that:

* You've integrated [Lock for Android](https://github.com/auth0/Lock.Android) as a dependency in your project and you're familiar with presenting the Lock login dialog. For further information, see the [login tutorial](/quickstart/native/android/01-login) and the [session handling](/quickstart/native/android/03-session-handling) tutorial first.
* You're familiar with the concepts of `userId` and `idToken`. You can find info about them in the session handling and user profile tutorials.

> It is highly recommended that you take a look at the [linking accounts](/link-accounts) documentation to understand the process of linking accounts.

## Enter Account Credentials

Here's the scenario: Your logged-in user wants to link one (or multiple) accounts to the account they are logged in with.

To do this, we will use Lock for logging in as we did in the [Login tutorial](01-login). In this case, we will send as an extra a boolean value to indicate that this is a secondary login.

```java
Intent intent = new Intent(this, LoginActivity.class);
intent.putExtra(Constants.LINK_ACCOUNTS, true);
intent.putExtra(Constants.PRIMARY_USER_ID, profile.getId());
startActivity(intent);
```

In the `LoginActivity` we obtain those values:

```java
boolean linkSessions = getIntent().getExtras().getBoolean(Constants.LINK_ACCOUNTS, false);
String userId = getIntent().getExtras().getString(Constants.PRIMARY_USER_ID);
```

Then, in the login response we decide if we advance to the `MainActivity` as usual or return to the already instantiated one:

```java
@Override
public void onAuthentication(Credentials credentials) {
  if (linkSessions){
    // Link the accounts
    performLink(credentials.getIdToken())
  } else {
    CredentialsManager.saveCredentials(this, credentials);
    Intent intent = new Intent(LoginActivity.this, MainActivity.class);
    startActivity(intent);
  }
}
```

## Link an Account

Now we can link the accounts. You have a main user along with another account you want to link to that user. All we need is the `id` of the logged-in user and the `id_token`s for the two accounts: the one we had previously saved and the one that we just received in the login response.

```java
private void performLink(String secondaryIdToken){
  Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
  auth0.setOIDCConformant(true);
  String idToken = CredentialsManager.getCredentials(this).getIdToken();

  UsersAPIClient usersClient = new UsersAPIClient(auth0, idToken);
  usersClient.link(userId, secondaryIdToken)
      .start(new BaseCallback<List<UserIdentity>, ManagementException>() {
          @Override
          public void onSuccess(List<UserIdentity> payload) {
              // accounts linked!
          }

          @Override
          public void onFailure(ManagementException error) {

          }
      });
}

```

## Retrieve Linked Accounts

The linked accounts are stored within the `UserProfile` received from a `UsersAPIClient` call, as a list of `UserIdentity`.

```java
@Override
public void onSuccess(UserProfile profile) {
  profile.getIdentities();  //Get all the profile accounts
}
```

> For more information, check the [UserIdentity](https://github.com/auth0/Auth0.Android/blob/master/auth0/src/main/java/com/auth0/android/result/UserIdentity.java) class.


### Unlink An Account

The unlink process is similar to the linking one, the only difference being that you need to specify both the two `user id`'s and the `provider name` to unlink the connections. Additionally, the token used to instantiate the `UsersAPIClient` must be the `id_token` of the main identity.

```java
private void unlink(UserIdentity secondaryAccountIdentity) {
    Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
    auth0.setOIDCConformant(true);
    String idToken = CredentialsManager.getCredentials(this).getIdToken();

    UsersAPIClient usersClient = new UsersAPIClient(auth0, idToken);    
    usersClient.unlink(profile.getId(), secondaryAccountIdentity.getId(), secondaryAccountIdentity.getProvider())
             .start(new BaseCallback<List<UserIdentity>, ManagementException>() {
                 @Override
                 public void onSuccess(List<UserIdentity> payload) {
                     // accounts unlinked
                 }

                 @Override
                 public void onFailure(final ManagementException error) {

                 }
             });
}
```
