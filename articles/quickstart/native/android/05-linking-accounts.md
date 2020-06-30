---
title: Linking Accounts
description: This tutorial will show you how to link two different accounts for the same user.
seo_alias: android
budicon: 345
topics:
  - quickstarts
  - native
  - android
github:
    path: 05-Linking-Accounts
contentType: tutorial
useCase: quickstart
---

## Before You Start

Before you continue with this tutorial, make sure that you have completed the previous tutorials. This tutorial assumes that:
* You have integrated [Auth0](https://github.com/auth0/Auth0.Android) as a dependency in your project.
* You are familiar with the `WebAuthProvider` class. To learn more, see the [Login](/quickstart/native/android/00-login) and the [Session Handling](/quickstart/native/android/03-session-handling) tutorials.
* You are familiar with the concepts of `userId`, `accessToken` and `idToken`. You can find info about them in the [Session Handling](/quickstart/native/android/03-session-handling) and the [User Profile](/quickstart/native/android/04-user-profile) tutorials.

We recommend that you read the [Linking Accounts](/users/concepts/overview-user-account-linking) documentation to understand the process of linking accounts.

## API scopes on Authentication

As seen previously in the [User Profile](/quickstart/native/android/04-user-profile) tutorial, you need to request the Management API audience and the corresponding scopes to be able to read the full user profile and edit their identities, since they are not part of the OIDC specification. Each identity in the user profile represents details from the authentication provider used to log in. e.g. the user's Facebook account details.

```java
// app/src/main/java/com/auth0/samples/activities/LoginActivity.java

Auth0 auth0 = new Auth0(this);
auth0.setOIDCConformant(true);

WebAuthProvider.login(auth0)
        .withScheme("demo")
        .withScope("openid profile email offline_access read:current_user update:current_user_identities")
        .withAudience(String.format("https://%s/api/v2/", getString(R.string.com_auth0_domain)))
        .start(this, callback);
```

::: note
Note that the Management API audience value ends in `/` in contrast to the User Info audience.
:::


## Enter Account Credentials

Your users may want to link their other accounts to the account they are logged in to.

To achieve this, you need to store the user ID for the logged user in the Intent, along with the ID Token and Access Token provided by the LoginActivity at launch, which are already available in the intent extras.

```java
// app/src/main/java/com/auth0/samples/activities/MainActivity.java

private void linkAccount() {
    Intent linkAccounts = new Intent(this, LoginActivity.class);
    linkAccounts.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
    linkAccounts.putExtras(getIntent().getExtras());
    linkAccounts.putExtra(LoginActivity.EXTRA_LINK_ACCOUNTS, true);
    linkAccounts.putExtra(LoginActivity.EXTRA_PRIMARY_USER_ID, userProfile.getId());

    startActivity(linkAccounts);
}
```

Obtain the stored values in `LoginActivity`.

First in `onCreate`, check if a new account linking was requested. Check as well if a previous `savedInstanceState` exists and contains the "logging in" state. This flag is set when the web authentication is launched and must be correctly handled to avoid state loss.

```java
// app/src/main/java/com/auth0/samples/activities/LoginActivity.java

private boolean linkSession;
private boolean logginIn;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Setup the UI
    setContentView(R.layout.activity_login);
    Button loginButton = findViewById(R.id.loginButton);
    loginButton.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            doLogin();
        }
    });

    // Setup CredentialsManager
    auth0 = new Auth0(this);
    auth0.setOIDCConformant(true);
    credentialsManager = new SecureCredentialsManager(this, new AuthenticationAPIClient(auth0), new SharedPreferencesStorage(this));

    // Optional - Uncomment the next line to use:
    // Require device authentication before obtaining the credentials
    // credentialsManager.requireAuthentication(this, CODE_DEVICE_AUTHENTICATION, getString(R.string.request_credentials_title), null);

    // Check if the activity was launched to log the user out
    if (getIntent().getBooleanExtra(EXTRA_CLEAR_CREDENTIALS, false)) {
        doLogout();
        return;
    }

    linkSessions = getIntent().getBooleanExtra(EXTRA_LINK_ACCOUNTS, false);
    loggingIn = savedInstanceState != null && savedInstanceState.getBoolean(EXTRA_LOG_IN_IN_PROGRESS, false);

    if (!linkSessions && credentialsManager.hasValidCredentials()) {
        // Obtain the existing credentials and move to the next activity
        showNextActivity();
        return;
    }

    // Check if an account linking was requested
    if (linkSessions && !loggingIn) {
        loginButton.setText(R.string.link_account);
        // Auto log in but allow to retry if authentication is cancelled
        doLogin();
    }
}

@Override
protected void onSaveInstanceState(Bundle outState) {
    outState.putBoolean(EXTRA_LOG_IN_IN_PROGRESS, loggingIn);
    super.onSaveInstanceState(outState);
}
```

In the login response, based on the boolean flag set in the first step, decide if you need to show the `MainActivity` screen, or continue to link the accounts.

```java
// app/src/main/java/com/auth0/samples/activities/LoginActivity.java

private final AuthCallback loginCallback = new AuthCallback() {
    @Override
    public void onFailure(@NonNull final Dialog dialog) {
        // Show error message
        // If currently linking accounts, finish.
    }

    @Override
    public void onFailure(AuthenticationException exception) {
        // Show error message
        // If currently linking accounts, finish.
    }

    @Override
    public void onSuccess(@NonNull Credentials credentials) {
        if (linkSessions) {
            // Link the accounts
            performLink(credentials.getIdToken());
            return;
        }

        // Store the credentials and move to the next activity
        credentialsManager.saveCredentials(credentials);
        showNextActivity(credentials);
    }
};
```

::: note
Make sure to handle the callback's failure calls as well
:::


## Link the Accounts

Now, you can link the accounts. To do this, you need the logged-in user's ID and Access Token, and the ID Token for the secondary account received in the last login response.

```java
// app/src/main/java/com/auth0/samples/activities/LoginActivity.java

private void performLink(final String secondaryIdToken) {
    UsersAPIClient client = new UsersAPIClient(auth0, getIntent().getExtras().getString(EXTRA_ACCESS_TOKEN));
    String primaryUserId = getIntent().getExtras().getString(EXTRA_PRIMARY_USER_ID);

    client.link(primaryUserId, secondaryIdToken)
            .start(new BaseCallback<List<UserIdentity>, ManagementException>() {
                @Override
                public void onSuccess(List<UserIdentity> userIdentities) {
                    // Accounts linked
                }

                @Override
                public void onFailure(ManagementException error) {
                    // Linking failed
                }
            });
}
```

## Retrieve the Linked Accounts

The updated list of identities is returned in the `link` method response. Alternatively, obtain the user's full profile, use the user's ID to call the `getProfile` method in the `UsersAPIClient` class. The profile includes the linked accounts as the `UserIdentity` array.

```java
// app/src/main/java/com/auth0/samples/activities/MainActivity.java

private void fetchProfile() {
    // ...
    usersClient.getProfile(userInfo.getId())
            .start(new BaseCallback<UserProfile, ManagementException>() {
                @Override
                public void onSuccess(UserProfile fullProfile) {
                    // Display the updated user profile
                }

                @Override
                public void onFailure(ManagementException error) {
                    // Show error
                }
            });
}
```

::: note
For more information, check the [UserIdentity.java class documentation](https://github.com/auth0/Auth0.Android/blob/master/auth0/src/main/java/com/auth0/android/result/UserIdentity.java).
:::

## Unlink the Accounts

To unlink the accounts, you need to specify the following:
* user ID for the main account
* user ID for the linked account
* the provider name for the linked account

To instantiate the `UsersAPIClient` client, use the Access Token for the main account like before.

```java
// app/src/main/java/com/auth0/samples/activities/MainActivity.java

private void unlink(UserIdentity secondaryAccountIdentity) {
    usersClient.unlink(userProfile.getId(), secondaryAccountIdentity.getId(), secondaryAccountIdentity.getProvider())
            .start(new BaseCallback<List<UserIdentity>, ManagementException>() {
                @Override
                public void onSuccess(List<UserIdentity> userIdentities) {
                    // Accounts unlinked
                }

                @Override
                public void onFailure(ManagementException error) {
                    // Accounts unlink failed
                }
            });
}
```
