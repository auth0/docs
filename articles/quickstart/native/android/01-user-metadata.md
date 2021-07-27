---
title: User Metadata
description: This quickstart demonstrates how to make API calls to the Auth0 Management API to read and update user metadata.
seo_alias: android
budicon: 448
topics:
  - quickstarts
  - native
  - android
  - api
github:
  path: 00-Login-Kt
sample_download_required_data:
  - client
  - api
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD002 MD041 -->

::: note
Before you continue with this tutorial, make sure that you have completed the [Login chapter](/quickstart/native/android)
:::

As an example of using the SDK to call APIs that may require custom scopes and audiences, we will demonstrate these settings by reading and updating user profile information.

## Read User Metadata

In [the previous chapter](/quickstart/native/android/00-login#show-user-profile-information), you saw how to access [basic user profile information](https://auth0.com/docs/users/user-profiles) using the `/userinfo` endpoint. This profile information may not include everything about a user that you might need. For example, in order to access the user's metadata, you must make an API call to the Management API using the user ID and the access token. With the Android SDK, this is done using the `UsersAPIClient` object.

To be able to correctly read and update the user metadata, ensure the authorization server allows you to read and edit the current user profile by specifying the `openid profile email read:current_user update:current_user_metadata` scopes. In addition, specify the audience for the [Auth0 Management API](https://auth0.com/docs/api), which happens to include the User Info audience as well.

Find the code in your project that initializes the `WebAuthProvider` class, and make the following changes if necessary:

* amend the argument given to `withScope` to be `openid profile email offline_access read:current_user update:current_user_metadata`
* add a call to `withAudience` and pass the audience for the Auth0 Management API: `https://${account.namespace}/api/v2/` (please note the trailing slash - this is required)

```kotlin
WebAuthProvider.login(account)
  .withScheme("demo")
  // modify the scopes to enable read and write of user_metadata
  .withScope("openid profile email read:current_user update:current_user_metadata")
  // specify the audience for the Auth0 Management API  
  .withAudience("https://${account.namespace}/api/v2/")
  .start(this, /* .. callback .. */)
```

:::note
In the case of the Auth0 Management API, the `read:current_user` and `update:current_user_metadata` scopes let you get an access token that can retrieve user details and update the user's information. In the case of your APIs, you'll define custom [API scopes](https://auth0.com/docs/scopes/current/api-scopes) to implement access control, and you'll identify them in the calls that your client applications make to that API.

In addition, in the case of the Auth0 Management API, the audience is `https://${account.namespace}/api/v2/`. In the case of your APIs, you create an _Identifier_ value that serves as the _Audience_ value whenever you [set up an API](https://auth0.com/docs/getting-started/set-up-api) with Auth0.
:::

Once you have a `UserProfile` instance (retrieved by calling `userInfo` from the previous chapter), get the user's ID and then use the `UsersAPIClient` to get the full profile for the user in another `UserProfile` instance. This profile will include all of the previous user profile information, as well as additional fields such as `user_metadata` and `app_metadata`.

:::note
Fields such as `user_metadata` and `app_metadata` are not available on the user profile that is returned by calling `userInfo`, as these fields are [proprietary fields to Auth0](https://auth0.com/docs/users/normalized-user-profiles) and not part of the OIDC spec. You must call the [Auth0 Management API](https://auth0.com/docs/users/manage-user-metadata#management-api) to get these fields, which is what you are doing by using the `UsersAPIClient` in the snippet below.
:::

The metadata can then be retrieved by using the `getUserMetadata` method on the `UserProfile` object.

```kotlin
fun getUserMetadata(userId: String, accessToken: String) {
  // Get the user ID and call the full getUser Management API endpoint, to retrieve the full profile information
  // Create the user API client using the account details and the access token from Credentials
  val usersClient = UsersAPIClient(account, accessToken)

  // Get the full user profile
  usersClient
    .getProfile(userId)
    .start(object: Callback<UserProfile, ManagementException> {
      override fun onFailure(exception: ManagementException) {
          // Something went wrong!
      }

      override fun onSuccess(profile: UserProfile) {
          // Retrieve the "country" field, if one appears in the metadata
          val country = profile.getUserMetadata()["country"] as String?
      }
  })
}
```

:::note
At this stage, if you are logging in as a brand new user, they are unlikely to have a "country" field inside their metadata. You can [read more about how user metadata](https://auth0.com/docs/users/manage-user-metadata) is managed on our Docs site.
:::

:::panel Checkpoint
Add the above code to your application at the point where you already get the basic user profile, and observe that you are able to get the "country" field, which may be empty if the user does not have that field in their user metadata. In the next section you will see how to update the user with this metadata using the Management API.
:::

## Update User Metadata

Updating user metadata is done in a very similar fashion. Call the `updateMetadata` method on the `UsersAPIClient` object to update the metadata for a specific user. You must also supply a map of data that is used to update the user metadata with.

```kotlin
fun patchUserMetadata(userId: String, accessToken: String) {
  // Create the UsersAPIClient with the account details
  // and the access token from the Credentials object
  val usersClient = UsersAPIClient(account, accessToken)

  // Create a map of data to update the user metadata with.
  // In this case, we're adding/updating a custom "country" field
  val metadata = mapOf("country" to "United States")

  // Call updateMetadata with the id of the user to update, and the map of data
  usersClient.updateMetadata(userId, metadata)
    .start(object: Callback<UserProfile, ManagementException> {
      override fun onFailure(exception: ManagementException) {
          // Something went wrong!
      }

      override fun onSuccess(profile: UserProfile) {
          // The metadata was updated and we're given the updated user profile.
          // Retrieve the "country" field, if one appears in the metadata
          val country = profile.getUserMetadata()["country"] as String?
      }
  })
}
```

:::panel Checkpoint
Add the above code to your application at the point where you already get the basic user profile, and observe that the `onSuccess` callback is executed. Then, re-run the code to _read_ the user metadata, and you should see that a value for "country" is now returned.

You can also see the updated metadata in the [Auth0 Dashboard](https://manage.auth0.com) by [inspecting the user](https://auth0.com/docs/users/manage-users-using-the-dashboard) and looking at the metadata collection in your web browser.
:::
