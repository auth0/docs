---
title: User Profile
description: This tutorial will show you how to get and modify the user's profile data.
seo_alias: android
budicon: 292
github:
    path: 04-User-Profile
---

This tutorial shows you how to get and modify the user's profile data with Auth0 in your Android apps.

## Before You Start

::: note
Before you continue with this tutorial, make sure that you have completed the [Login](/quickstart/native/android/00-login) and [Session Handling](/quickstart/native/android/03-session-handling) tutorials. To call the API applications, you need a valid Access Token and ID Token.
:::

Before launching the login process, you need to make sure the authorization server allows you to read and edit the current user profile. To do that, ask for the `openid profile email read:current_user update:current_user_metadata` scope and the Management API audience, which happens to include the User Info audience as well. Find the snippet in which you initialize the `WebAuthProvider` class. To that snippet, add the line `withScope("openid profile email read:current_user update:current_user_metadata")` and `withAudience(String.format("https://%s/api/v2/", getString(R.string.com_auth0_domain)))`.

```java
// app/src/main/java/com/auth0/samples/activities/LoginActivity.java

Auth0 auth0 = new Auth0(this);
auth0.setOIDCConformant(true);
WebAuthProvider.init(auth0)
    .withScheme("demo")
    .withAudience(String.format("https://%s/api/v2/", getString(R.string.com_auth0_domain)))
    .withScope("openid profile email read:current_user update:current_user_metadata")
    .start(this, callback);
```

::: note
Note that the Management API audience value ends in `/` in constrast to the User Info audience. 
:::

## Request User Data


To get the user's information:
1. Use the user's access token to call the `userInfo` method in the `AuthenticationAPIClient` application instance.
The profile obtained this way is OIDC-conformant. Depending on the [scopes](/scopes/current) you requested when logging in, the profile contains different information. The result will never contain fields outside the OIDC specification.
2. Get the user's full profile using the [Management API](/api/management/v2#!/Users). Since fields such as [user_metadata](#additional-information) are not part of the OIDC specification you need to obtain the full profile to read them. This step is explained next:


Create an instance of the Users API application using the Access Token that you saved in the log in step. This Access Token can be used to authorize requests since you've requested the Management API audience and the corresponding user entity scopes in the login step. In the snippet bellow we obtain the token from the extras that the LoginActivity class has passed when starting this activity. The API application is used to request the user's profile data.

Create now an instance of the Authentication API application. This time is used to call the userinfo endpoint and retrieve the ID of the user to whom the token was issued.

```java
// app/src/main/java/com/auth0/samples/activities/MainActivity.java

Auth0 auth0 = new Auth0(this);
auth0.setOIDCConformant(true);

String accessToken = getIntent().getStringExtra(LoginActivity.KEY_ACCESS_TOKEN);
UsersAPIClient usersClient = new UsersAPIClient(auth0, accessToken);
AuthenticationAPIClient authenticationAPIClient = new AuthenticationAPIClient(auth0);
```

::: note
Do not hardcode the Auth0 `domain` and `clientId` values when creating the Auth0 instance. We recommend you add them to the `strings.xml` file.
:::


To get the user's profile:
1. Use the user's Access Token to call the `userInfo` method in the `AuthenticationAPIClient` application instance.
You get an instance of the `UserProfile` profile. The profile is OIDC-conformant. Depending on the on the [scopes](/scopes/current) you requested, the profile contains different information. 
2. To get the user's full profile, use the [Management API](/api/management/v2#!/Users). Use the user ID obtained in previous step to call `getProfile` on the Users API application and obtain the full user profile. Use the received data to update the layout.

```java
// app/src/main/java/com/auth0/samples/activities/MainActivity.java

authenticationAPIClient.userInfo(accessToken)
    .start(new BaseCallback<UserProfile, AuthenticationException>() {
        @Override
        public void onSuccess(UserProfile userinfo) {
            usersClient.getProfile(userinfo.getId())
                .start(new BaseCallback<UserProfile, ManagementException>() {
                    @Override
                    public void onSuccess(UserProfile profile) {
                      // Display the user profile        
                    }

                    @Override
                    public void onFailure(ManagementException error) {
                      // Show error                            
                    }
                });
        }

        @Override
        public void onFailure(AuthenticationException error) {
            // Show error
        }
    });
```

## Access the Data Inside the Received Profile

### Default information

At this point, you already have access to the full version of the `UserProfile` instance.
You can use this data wherever you need it.

Some examples are:

```java
profile.getName();
profile.getEmail();
profile.getPictureURL();
```

::: panel Modifying the UI
You cannot modify the UI inside the callback methods as they run in a different thread. To solve this issue you can choose between three options:
* Persist the data and then retrieve it
* Create a task in the UI thread and run it. i.e. using the `Activity#runOnUiThread` method.
* Create a `Handler` to post the information
:::

### Additional information

You can handle additional information within any of the following maps:

#### A. User metadata

The `userMetadata` map contains user profile fields that can be added from the client-side (such as when a user edits their profile). You can access this information in the following way:

```java
String country = (String) profile.getUserMetadata().get("country");
```

::: note
You can choose the key names and value types for subscripting the `user_metadata` map.
:::

#### B. App metadata

The `appMetadata` map contains fields that are usually added with a [Rule](/rules) or a [Hook](/hooks). For native platforms, this information is read-only.

::: note
To learn more about metadata, see the [metadata documentation](/metadata).
:::

#### C. Extra information

The `extraInfo` map contains additional values that are stored in Auth0 but not mapped to a `UserProfile` getter method. For native platforms, this information is read-only.

## Update the User's Profile

You can only update the user metadata. To do this, create a `Map<String, Object>` object and add the information you want to store.

```java
Map<String, Object> userMetadata = new HashMap<>();
userMetadata.put("country", "USA");
```

Update the information with the Users API application created before:

```java
// app/src/main/java/com/auth0/samples/activities/MainActivity.java

usersClient.updateMetadata(userInfo.getId(), userMetadata).start(new BaseCallback<UserProfile, ManagementException>() {
  @Override
  public void onSuccess(UserProfile profile) {
    // As receive the updated profile here
    // You can react to this, and show the information to the user.
  }

  @Override
  public void onFailure(ManagementException error) {
    //show error
  }
});
```


::: note
A call to `updateMetadata` will replace any previous user metadata stored in Auth0. Remember to copy the old values that you wish to maintain. 
::: 
