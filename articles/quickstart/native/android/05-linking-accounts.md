---
title: Linking Accounts
description: This tutorial will show you how to link two different accounts for the same user.
seo_alias: android
budicon: 345
---

This tutorial shows you how to link two different accounts for the same user using Auth0.

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-android-sample',
  path: '05-Linking-Accounts',
  requirements: [
    'Android Studio 2.3',
    'Android SDK 25',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>__

## Before You Start

Before you continue with this tutorial, make sure that you have completed the previous tutorials. This tutorial assumes that:
* You have integrated [Auth0](https://github.com/auth0/Auth0.Android) as a dependency in your project. 
* You are familiar with the `WebAuthProvider` class. To learn more, see the [Login](/quickstart/native/android/00-login) and the [Session Handling](/quickstart/native/android/03-session-handling) tutorials.
* You are familiar with the concepts of `userId` and `idToken`. You can find info about them in the [Session Handling](/quickstart/native/android/03-session-handling) and the [User Profile](/quickstart/native/android/04-user-profile) tutorial.

We recommend that you read the [Linking Accounts](/link-accounts) documentation to understand the process of linking accounts.

## Enter Account Credentials

Your users may want to link their other accounts to the account they are logged in to. 

To achieve this, you need to store the user ID for the logged user in the Intent so it can be accessed in other activities.

```java
// app/src/main/java/com/auth0/samples/activities/MainActivity.java
Intent intent = new Intent(MainActivity.this, LoginActivity.class);        
intent.putExtra(Constants.LINK_ACCOUNTS, true);
intent.putExtra(Constants.PRIMARY_USER_ID, profile.getId());
startActivity(intent);
```

Obtain the stored values in `LoginActivity`:

```java
// app/src/main/java/com/auth0/samples/activities/LoginActivity.java

boolean linkSessions = getIntent().getExtras().getBoolean(Constants.LINK_ACCOUNTS, false);
String userId = getIntent().getExtras().getString(Constants.PRIMARY_USER_ID);
```

In the login response, based on the boolean flag set in the first step, decide if you need to show the `MainActivity` screen, or continue to link the accounts. 

```java
// app/src/main/java/com/auth0/samples/activities/LoginActivity.java
@Override
public void onAuthentication(Credentials credentials) {
  if (linkSessions) {
    // Link the accounts
    performLink(credentials.getIdToken())
  } else {
    CredentialsManager.saveCredentials(LoginActivity.this, credentials);
    Intent intent = new Intent(LoginActivity.this, MainActivity.class);
    startActivity(intent);
  }
}
```

## Link the Accounts

Now, you can link the accounts. To do this, you need the logged-in user's ID and the ID tokens for the two accounts: 
* The saved account the user initially logged in to
* The second account received in the last login response

```java
// app/src/main/java/com/auth0/samples/activities/LoginActivity.java

private void performLink(String secondaryIdToken) {
  String primaryIdToken = CredentialsManager.getCredentials(LoginActivity.this).getIdToken();
  UsersAPIClient client = new UsersAPIClient(auth0, primaryIdToken);
  client.link(primaryUserId, secondaryIdToken)
          .start(new BaseCallback<List<UserIdentity>, ManagementException>() {
              @Override
              public void onSuccess(List<UserIdentity> payload) {
                  //Accounts linked
              }

              @Override
              public void onFailure(ManagementException error) {
                  //show error
              }
          });
```

## Retrieve the Linked Accounts

To obtain the user's full profile, use the user's ID to call the `getProfile` method in the `UsersAPIClient` class. The profile includes the linked accounts as the `UserIdentities` array. 

```java
// app/src/main/java/com/auth0/samples/activities/MainActivity.java

usersClient.getProfile(userInfo.getId())
    .start(new BaseCallback<UserProfile, ManagementException>() {
        @Override
        public void onSuccess(UserProfile fullProfile) {
            //refreshScreenInformation
        }

        @Override
        public void onFailure(ManagementException error) {
            //show error
        }
    });
```

::: note
For more information, check the [UserIdentity.java class documentation](https://github.com/auth0/Auth0.Android/blob/master/auth0/src/main/java/com/auth0/android/result/UserIdentity.java).
:::

## Unlink the Accounts

To unlink the accounts, you need to specify the following: 
* user ID for the main account
* user ID for the linked acocunt
* the provider name

To instantiate the `UsersAPIClient` client, use the ID token for the main account.

```java
// app/src/main/java/com/auth0/samples/activities/MainActivity.java

String primaryIdToken = CredentialsManager.getCredentials(LoginActivity.this).getIdToken();
UsersAPIClient client = new UsersAPIClient(auth0, primaryIdToken);

client.unlink(userProfile.getId(), secondaryAccountIdentity.getId(), secondaryAccountIdentity.getProvider())
        .start(new BaseCallback<List<UserIdentity>, ManagementException>() {
            @Override
            public void onSuccess(List<UserIdentity> payload) {
                //Accounts unlinked
            }

            @Override
            public void onFailure(final ManagementException error) {
                //Accounts unlink failed
            }
        });
```
