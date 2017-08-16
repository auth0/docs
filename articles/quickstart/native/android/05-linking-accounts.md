---
title: Linking Accounts
description: This tutorial will show you how to link two different accounts for the same user.
seo_alias: android
budicon: 345
---

This tutorial will show you how to link two different accounts for the same user using Auth0.

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

## Before Starting

You should be familiar with previous tutorials. This tutorial assumes that:

* You've integrated [Auth0](https://github.com/auth0/Auth0.Android) as a dependency in your project and you're familiar with the `WebAuthProvider` class. For further information, see the [Login](/quickstart/native/android/00-login) and the [Session Handling](/quickstart/native/android/03-session-handling) tutorial first.
* You're familiar with the concepts of `userId` and `idToken`. You can find info about them in the [Session Handling](/quickstart/native/android/03-session-handling) and [User Profile](/quickstart/native/android/04-user-profile) tutorials.

::: note
It is highly recommended that you take a look at the [Linking Accounts](/link-accounts) documentation to understand the process of linking accounts.
:::

## Enter Account Credentials

Here's the scenario: Your logged-in user wants to link one (or multiple) accounts to the account they are logged in with.

To do this, we will use the Auth0 library as we did in the [Login](/quickstart/native/android/00-login) tutorial. In this case, we will send as an extra a boolean value to indicate that this is a secondary login, along with the `userId` obtained from the first login.

```java
// app/src/main/java/com/auth0/samples/activities/MainActivity.java
Intent intent = new Intent(MainActivity.this, LoginActivity.class);        
intent.putExtra(Constants.LINK_ACCOUNTS, true);
intent.putExtra(Constants.PRIMARY_USER_ID, profile.getId());
startActivity(intent);
```

In the `LoginActivity` we obtain those values:

```java
// app/src/main/java/com/auth0/samples/activities/LoginActivity.java

boolean linkSessions = getIntent().getExtras().getBoolean(Constants.LINK_ACCOUNTS, false);
String userId = getIntent().getExtras().getString(Constants.PRIMARY_USER_ID);
```

Then, in the login response we decide if we advance to the `MainActivity` as usual or return to the already instantiated one:

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

## Link an Account

Now we can link the accounts. You have a main user along with another account you want to link to that user. All we need is the `id` of the logged-in user and the `id_token` for the two accounts: the one we had previously saved and the one that we just received in the login response.

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

## Retrieve Linked Accounts

The `AuthenticationAPIClient#userInfo` response doesn't include the identities array, but still you need to use it to obtain the user `id`. Then, by calling the `UsersAPIClient#getProfile` method you can obtain a user's full profile, which includes the linked accounts as an array of `UserIdentities`.

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
For more information, check the [UserIdentity.java](https://github.com/auth0/Auth0.Android/blob/master/auth0/src/main/java/com/auth0/android/result/UserIdentity.java) class.
:::

### Unlink An Account

The unlink process is similar to the linking one, the only difference being that you need to specify both the two `user id``s and the `provider name` to unlink the connections. Additionally, the token used to instantiate the `UsersAPIClient` must be the `id_token` of the main identity.

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
