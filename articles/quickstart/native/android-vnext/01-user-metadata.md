---
title: User Metadata
description: This quickstart demonstrates how to make API calls to the Auth0 Management API to update user metadata.
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
Before you continue with this tutorial, make sure that you have completed the [Login chapter](/quickstart/native/android-vnext/00-login)
:::

## Read User Metadata

In [the previous chapter](/quickstart/native/android-vnext/00-login#show-user-profile-information), you saw how to access basic profile information about a user. This profile information is extracted from the [ID token](https://auth0.com/docs/tokens/id-tokens) and as such may not include all the information about a user that you might need. For example, in order to access the user's metadata, you must make an API call to the Management API using the user ID and the access token. With the Android SDK, this is done using the `UsersAPIClient` object.

To be able to correctly read and update the user metadata, ensure the authorization server allows you to read and edit the current user profile by specifying the `profile email read:current_user update:current_user_metadata` scopes. In addition, specify the audience for the Auth0 Management API, which happens to include the User Info audience as well.

Find the code in your project that initializes the `WebAuthProvider` class, and amend the argument given to `withScope` to be `"openid profile email offline_access read:current_user update:current_user_metadata"`. Finally, add a call to `withAudience` and pass the audience for the Auth0 Management API: `"https://${account.namespace}/api/v2"`.

```kotlin
WebAuthProvider.login(account)
  .withScheme("demo")
  .withScope("openid profile email read:current_user update:current_user_metadata")     // modify the scopes
  .withAudience("https://${account.namespace}/api/v2/")                                 // specify the audience for the Auth0 Management API
  .start(this, /* .. callback .. */)
```

:::note
In the case of the Auth0 Management API, the `read:current_user` and `update:current_user_metadata` scopes let you get an access token that can retrieve user details and update the user's information. In the case of your APIs, you'll define custom [API scopes](https://auth0.com/docs/scopes/current/api-scopes) to implement access control, and you'll identify them in the calls that your client applications make to that API.

In addition, in the case of the Auth0 Management API, the audience is `https://${account.namespace}/api/v2/`. In the case of your APIs, you create an _Identifier_ value that serves as the _Audience_ value whenever you [set up an API](https://auth0.com/docs/getting-started/set-up-api) with Auth0.
:::

Once you have the `UserProfile` instance, retrieve the user's ID and then use the `UsersAPIClient` to get the full profile for the user.

```kotlin
// Get the user ID and call the full getUser Management API endpoint, to retrieve the full profile information
profile?.getId()?.let { userId ->
    // Create the user API client using the account details and the access token from Credentials
    val usersClient = UsersAPIClient(account, accessToken)

    // Get the full user profile
    usersClient
        .getProfile(userId)
        .start(object: Callback<UserProfile, ManagementException> {
            override fun onFailure(exception: ManagementException) {
                // Something went wrong!
                Snackbar.make(
                    binding.root,
                    "Failure: <%= "${exception.getCode()}" %>",
                    Snackbar.LENGTH_LONG
                ).show()
            }

            override fun onSuccess(payload: UserProfile?) {
                // Display the "country" field, if one appears in the metadata
                Snackbar.make(
                    binding.root,
                    "Country: <%= "${payload?.getUserMetadata()?.get(\"country\") as String? ?: \"\"}" %>",
                    Snackbar.LENGTH_LONG
                ).show()
            }
        })
}
```

:::note
At this stage, if you are logging in as a brand new user, they are unlikely to have a "country" field inside their metadata. You can [read more about how user metadata](https://auth0.com/docs/users/manage-user-metadata) is managed on our Docs site.
:::

:::panel Checkpoint
Add the above code to your application at the point where you already get the basic user profile, and observe that a new Snackbar is shown with the text "Country: ", which may include a value for the country if the user has had the metadata applied. In the next section you will see how to update the user with this metadata using the Management API.
:::
