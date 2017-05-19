---
title: User Profile
description: This tutorial will show you how to get and modify the user's profile data.
seo_alias: android
budicon: 292
---

This tutorial will show you how to get and modify the user's profile data in your Android apps with Auth0.

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-android-sample',
  path: '04-User-Profile',
  requirements: [
    'Android Studio 2.3',
    'Android SDK 25',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>__

## Before Starting

Be sure that you have completed the [Login](/quickstart/native/android/00-login) and the [Session Handling](/quickstart/native/android/03-session-handling) Quickstarts. You'll need a valid `access_token` and `id_token` to call the API clients.

## Request User Data

The first step is to instantiate the API clients. This will be used to request the user's profile data.

```java
Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
auth0.setOIDCConformant(true);

String idToken = CredentialsManager.getCredentials(this).getIdToken();
UsersAPIClient usersClient = new UsersAPIClient(auth0, idToken);
AuthenticationAPIClient authClient = new AuthenticationAPIClient(auth0);
```

::: note
It's suggested that you add both the Auth0 `domain` and `clientId` to the `strings.xml` file rather than hardcode them.
:::

Next, use the `access_token` to obtain the user id with the `AuthenticationAPIClient`. Although the call returns a `UserProfile` instance, this is a basic OIDC conformant profile and the only value guaranteed to be present is the `sub` claim that indicates the user id. We're going to use this value to call later the [Management API](https://auth0.com/docs/api/management/v2#!/Users) and get a full profile.


```java
String accessToken = CredentialsManager.getCredentials(this).getAccessToken();
authenticationClient.userInfo(accessToken)
    .start(new BaseCallback<UserProfile, AuthenticationException>() {

        @Override
        public void onSuccess(final UserProfile userInfo) {
            String userId = userInfo.getId();
            // fetch the full user profile
        }

        @Override
        public void onFailure(AuthenticationException error) {
            //show error
        }
    });
```

Finally, use the `UsersAPIClient` and the user id to get the full User profile.

```java
usersClient.getProfile(userId)
        .start(new BaseCallback<UserProfile, ManagementException>() {
            @Override
            public void onSuccess(UserProfile profile) {
                // Display the user profile
            }

            @Override
            public void onFailure(ManagementException error) {
                //show error
            }
        });
```


## Access The Data Inside The UserProfile

##### I. DEFAULT INFO

At this point, you already have access to the `UserProfile`.
You can use this data wherever you need it.

Some examples are:

```java
profile.getName();
profile.getEmail();
profile.getPictureURL();
```

::: note
Remember that you can't modify the UI inside the onSuccess() method, as it works in a second thread. To solve this, you can persist the data, create a task in the UI thread or create a handler to receive that information.
:::

#### I. ADDITIONAL INFO

Besides the defaults, you can handle more information that is contained within any of the following `map`:

##### A. USER METADATA

The `userMetadata` map contains fields related to the user profile that can be added from the client-side (e.g. when editing the profile). We're going to edit this one in this tutorial. You can access its fields as follows:

```java
String country = (String) profile.getUserMetadata().get("country");
```

::: note
The strings you use for subscripting the user_metadata map, and the variable types you handle, are up to you.
:::

##### B. APP METADATA

The `appMetadata` map contains fields that are usually added via a Rule or Hook, which is read-only for the native platform.

##### C. EXTRA INFO

The `extraInfo` map contains additional values stored in Auth0 but not mapped to a `UserProfile` getter method. That information is read-only for the native platform.

::: note
For further information on metadata, see the full documentation.
:::

## Update the User Profile

You can only update the user metadata. In order to do so you must create a `Map<String, Object>` and add the new metadata:

```java
Map<String, Object> userMetadata = new HashMap<>();
userMetadata.put("country", "USA");
```

And then with the `UsersAPIClient`, perform the update:

```java
String idToken = CredentialsManager.getCredentials(this).getIdToken();
UsersAPIClient usersClient = new UsersAPIClient(auth0, idToken);
usersClient.updateMetadata(userInfo.getId(), userMetadata).start(new BaseCallback<UserProfile, ManagementException>() {
  @Override
  public void onSuccess(final UserProfile profile) {
    // As receive the updated profile here
    // You can react to this, and show the information to the user.
  }

  @Override
  public void onFailure(ManagementException error) {
    //show error
  }
});
```
