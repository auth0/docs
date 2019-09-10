---
title: Authorization
description: This tutorial will show you how to use the Auth0 authentication API in your Android project to create a custom login screen.
seo_alias: android
budicon: 500
topics:
  - quickstarts
  - native
  - android
github:
  path: 07-Authorization
contentType: tutorial
useCase: quickstart
---

This tutorial shows you how to use Auth0 to create access roles for your users. With access roles, you can authorize or deny access to your content to different users based on the level of access they have.

## Before You Start

::: note
Be sure that you have completed the [Login](/quickstart/native/android/00-login) quickstart.
:::

Create a rule that assigns the users either an `admin` role, or a simple `user` role. Go to the [new rule page](${manage_url}/#/rules/new) and select the "Set Roles To A User" template, under **Access Control**. Replace the default script contents with the following snippet:

```js
function (user, context, callback) {

  // Roles should only be set to verified users.
  if (!user.email || !user.email_verified) {
    return callback(null, user, context);
  }

  user.app_metadata = user.app_metadata || {};
  // You can add a Role based on what you want
  // In this case I check domain
  const addRolesToUser = function(user) {
    const endsWith = '@example.com';

    if (user.email && (user.email.substring(user.email.length - endsWith.length, user.email.length) === endsWith)) {
      return ['admin']
    }
    return ['user'];
  };

  const roles = addRolesToUser(user);

  user.app_metadata.roles = roles;
  auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
    .then(function() {
      context.idToken['https://example.com/roles'] = user.app_metadata.roles;
      callback(null, user, context);
    })
    .catch(function (err) {
      callback(err);
    });
}
```

The default rules for assigning access roles are:
* If the user's email contains `@example.com`, the user gets the admin role.
* If the email contains anything else, the user gets the regular user role.

::: note
The rule can be customized to grant the user different roles other than the ones explained here, depending on the conditions required in a project. There is a restriction on the name of the claims added to the ID Token which must be [namespaced](/tokens/concepts/claims-namespacing). Read [this article](/rules/current#hello-world) for more context about Rules.
:::


## Test the Rule in Your Project

Once the user credentials had been obtained (as explained in the [Login](/quickstart/native/android/00-login) tutorial), save them to access them at any time.

The claims added to the ID Token via a Rule are included in the userinfo endpoint response. Use the Access Token to call this endpoint and obtain the user roles.

```java
// app/src/main/java/com/auth0/samples/activities/MainActivity.java

authenticationClient.userInfo(accessToken)
  .start(new BaseCallback<UserProfile, AuthenticationException>() {
      @Override
      public void onSuccess(UserProfile userInfo) {
        //Obtain the claim from the "extra info" of the user info
        List<String> roles = userInfo.getExtraInfo().containsKey("https://access.control/roles") ? (List<String>) userInfo.getExtraInfo().get("https://access.control/roles") : Collections.<String>emptyList();

        if (!roles.contains("admin")) {
          // User is not authorized
        } else {
          // User is authorized  
        }
      }

      @Override
      public void onFailure(AuthenticationException error) {
          // Show error
      }
  });
```

## Restrict Content Based On Access Level

Roles can be used to distinguish user permissions within an app, authorizing or denying access to a certain feature. The sample project illustrates this by allowing users with the `admin` role to access the "Settings Activity".
