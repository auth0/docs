---
section: libraries
toc_title: Migration Notes v1 to v2
description: A reference for changed option names and behaviors in Lock for Android v2
---

# Lock for Android v1 to v2 Migration Guide


## Application Class and Initializing Lock

In v1 of Lock for Android, you were asked to create a custom `Application` class and initialize the `Lock.Context` there. **Now this is no longer needed**. In v2, to create a new `Lock` instance and configure it, you will just use the `Lock.Builder` class. The configurable options in v2 have been expanded, allowing more configuration while making the implementation and customization process easier than in v1.

## Obtaining the User's Profile

In v1 when an authentication was successful, you could obtain the UserProfile from the received Intent. As of v2, the only received value is a `Credentials` object. You can get the `access_token` and request the information associated to that user, by making a request to Auth0. The received object will be a OIDC conformant profile, meaning the only information guaranteed to be present is the "sub" claim representing the User Id.

1. Create a new `AuthenticationAPIClient` instance by passing an instance of the `Auth0` object. It can be the same instance used to launch Lock in the first place.
2. Call the `userInfo` method on the API client passing the previously obtained `access_token`.
3. A `UserProfile` instance is returned with the OIDC conformant profile.

```java
Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
auth0.setOIDCConformant(true);

String accessToken = credentials.getAccessToken();
AuthenticationAPIClient apiClient = new AuthenticationAPIClient(auth0);

apiClient.userInfo(accessToken)
  .start(new BaseCallback<UserProfile, AuthenticationException>() {
      @Override
      public void onSuccess(final UserProfile information) {
        //user information received
        String userId = information.getId();
      }

      @Override
      public void onFailure(AuthenticationException error) {
          //user information request failed
      }
  });
```

If you need the full User Profile, you'll need to call the Management API using the id_token obtained in the log in and passing the Id of the user.

1. Create a new `UsersAPIClient` instance by passing an instance of the `Auth0` object and a valid API token.
2. Call the `getProfile` method on the API client passing the user Id obtained previously.
3. A `UserProfile` instance is returned with the full user profile.

```java
Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}")
auth0.setOIDCConformant(true);

String idToken = credentials.getIdToken();
UsersAPIClient usersClient = new UsersAPIClient(auth0, idToken);

usersClient.getProfile(userId)
        .start(new BaseCallback<UserProfile, ManagementException>() {
            @Override
            public void onSuccess(UserProfile profile) {
                // Display the user profile
            }

            @Override
            public void onFailure(ManagementException error) {

            }
        });
```


## Changed Configuration Options

As in the previous version, Lock for Android v2 can be configured with extra options. Check below if the behavior for the option has changed, or if they only got renamed.

* `shouldUseWebView`: This option was renamed to `useBrowser`, but is now entirely **deprecated** and should not be used.
* `shouldUseEmail`: Renamed to `withUsernameStyle`. Defines if it should ask for email only, username only, or both of them. By default it'll respect the Dashboard configuration of the parameter `requires_username`.
* `isClosable`: Renamed to `closable`. Defines if the `LockActivity` can be closed. By default it's not closable.
* `shouldLoginAfterSignUp`: Renamed to `loginAfterSignUp`. Determines whether after a signup the user should be logged in automatically. Defaults to `true`.
* `disableSignupAction`: Renamed to `allowSignUp`. Shows the Sign Up form if a Database connection is configured. Defaults to `true`.
* `disableResetAction`: Renamed to `allowForgotPassword`. Shows a link to the Forgot Password form if a Database connection is configured and it's allowed from the Dashboard. Defaults to `true`.
* `defaultUserPasswordConnection`: Renamed to `setDefaultDatabaseConnection`. Defines which will be the default Database connection. This is useful if your application has many Database connections configured.
* `setConnections`: Renamed to `allowedConnections`. Filters the allowed connections from the list configured in the Dashboard. If this value is empty, all the connections defined in the dashboard will be available. This is also the default behavior.
* `setAuthenticationParameters`: Renamed to `withAuthenticationParameters`. Defines extra authentication parameters to be sent on sign up and log in/sign in. The default `scope` used on authentication calls is `openid`. This is changed from v1, which also included the `offline_access` scope.


Lock for Android v2 also features a bunch of new options. Check the [configuration options page](/libraries/lock-android/configuration) for a complete list of them.
