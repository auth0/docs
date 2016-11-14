---
title: User Profile
description: This tutorial will show you how to use Lock to get the user's profile data.
budicon: 292
---

This tutorial will show you how to use Lock to get the user's profile data in your Android apps with Auth0.

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-android-sample',
  path: '04-User-Profile',
  requirements: [
    'Android Studio 2.2',
    'Android SDK 24',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>

## Before Starting

Be sure that you have completed the [Basic Login](01-login) and the [Session Handling](03-session-handling) Quickstarts.

## Request User Data

The first step is to instantiate the authentication API client. This will be used to request the user's profile data.

```java
AuthenticationAPIClient client = new AuthenticationAPIClient(
new Auth0(${account.clientId}, ${account.namespace}));
```

> It's suggested that you add both the `Auth0DomainID` and `Auth0ClientID` to the `strings.xml` file rather than hardcode them in the manifest.


Then, use your previously stored credentials (in this example, stored in the Application Singleton) to request the data.

```java
client.tokenInfo(App.getInstance().getUserCredentials().getIdToken())
                .start(new BaseCallback<UserProfile, AuthenticationException>() {
  @Override
  public void onSuccess(UserProfile payload){
  }

  @Override
  public void onFailure(AuthenticationException error){
  }
});
```

## Access The Data Inside The UserProfile

##### I. DEFAULT INFO

At this point, you already have access to the `UserProfile`.
You can use this data wherever you need it.

Some examples are:

```java
payload.getName();
payload.getEmail();
payload.getPictureURL();
```

> Remember that you can't modify the UI inside the onSuccess() method, as it works in a second thread. To solve this, you can persist the data, create a task in the UI thread or create a handler to receive that information.

#### I. ADDITIONAL INFO

Besides the defaults, you can handle more information that is contained within any of the following `map`:

##### A. USER METADATA

The userMetadata `map` contains fields related to the user profile that can be added from the client-side (e.g. when editing the profile). We're going to edit this one in this tutorial. You can access its fields as follows:

```java
String country = payload.getUserMetadata().get("country").toString();
boolean active = payload.getUserMetadata().get("active");
```

> The strings you use for subscripting the userMetadata dictionary, and the variable types you handle, are up to you.

##### B. APP METADATA

The appMetadata `map` contains fields that are usually added via a rule, which is read-only for the native platform.

##### C. EXTRA INFO

The extraInfo `map` contains any other extra information stored in Auth0. That information is read-only for the native platform.

> For further information on metadata, see the full documentation.

## Update the User Profile

You can only update the user metadata. In order to do so you must:
Create a `Map<String, Object>` and add the new metadata:

```java
Map<String, Object> userMetadata = new HashMap<>();
userMetadata.put("country", "USA");
```
And then with the `UserApiClient`, perform the update:

```java
UsersAPIClient usersClient = new UsersAPIClient(mAuth0, App.getInstance().getUserCredentials().getIdToken());
usersClient.updateMetadata(mUserProfile.getId(), userMetadata).start(new BaseCallback<UserProfile, ManagementException>() {
  @Override
  public void onSuccess(final UserProfile payload) {
    // As receive the updated profile here
    // You can react to this, and show the information to the user.
  }

  @Override
  public void onFailure(ManagementException error) {

  }
});
```
