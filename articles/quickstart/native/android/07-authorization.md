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

Create a [Rule](https://auth0.com/docs/rules) that assigns the users either an `admin` role, or a simple `user` role. Go to the [new rule page](${manage_url}/#/rules/new) and select the **Set Roles To A User** template, under **Access Control**. Edit the following lines from the default script to match the conditions that fit your needs:

```js
const addRolesToUser = function (user) {
    const endsWith = '@example.com';

    if (user.email && (user.email.substring(user.email.length - endsWith.length, user.email.length) === endsWith)) {
      return ['admin'];
    }
    return ['user'];
};
```

The default rules for assigning access roles are:
* If the user's email contains `@example.com`, the user gets the admin role.
* If the email contains anything else, the user gets the regular user role.

::: note
The rule can be customized to grant the user different roles other than the ones explained here, depending on the conditions required in a project. There is a restriction on the name of the claims added to the ID Token which must be [namespaced](/tokens/guides/create-namespaced-custom-claims). Read [this article](/rules/current#hello-world) for more context about Rules.
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
              // Obtain the claim from the "extra info" of the user info
              List<String> roles = userInfo.getExtraInfo().containsKey("https://example.com/roles") ?
                  (List<String>) userInfo.getExtraInfo().get("https://example.com/roles") :
                  Collections.<String>emptyList();

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
