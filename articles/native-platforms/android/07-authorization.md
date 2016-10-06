---
title: Authorization
description: This tutorial will show you how to use the Auth0 authentication API in your Android project to create a custom login screen.
seo_alias: android
---

This Quickstart will show you how to use Auth0 to create access roles for your users. With access roles, you can authorize or deny content to different users based on the level of access they have.

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-android-sample/tree/master/07-Authorization',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-android-sample',
  pkgBranch: 'master',
  pkgPath: '07-Authorization',
  pkgFilePath: '07-Authorization/app/src/main/res/values/strings.xml',
  pkgType: 'replace'
}) %>

## Before Starting

Be sure that you have completed the [user profile](04-user-profile) quickstart.

## Create A Rule To Assign Roles

First, you need to create a rule that assigns your users either an `admin` role, or a single `user` role. To do so, go to the [new rule page](${manage_url}/#/rules/new) and select the "*Set Roles To A User*" template, under *Access Control*. Then, replace this line from the default script:

```java
if (user.email.indexOf('@example.com') > -1)
```
to match the condition that fits your needs.

By default, it says that if the user email contains `@example.com` he will be given an `admin` role, otherwise a regular `user` role.

> You can define more roles other than `admin` and `user`, depending on your product requirements.

> In the demo app, we use `@admin.com` to validate, like the next rule:

```
  var addRolesToUser = function(user, cb) {
    if (user.email.indexOf('@admin.com') > -1) {
      cb(null, ['admin']);
    } else {
      cb(null, ['user']);
    }
  };
```

## Test the Rule in Your Project

Once you have the user profile (as explained in the [user profile](04-user-profile) tutorial), you can save it and access it at any point.

Inside it, you will have the role, and you will be ready to perform the access control.

```java
List<String> roles = (List<String>) mUserProfile.getAppMetadata().get("roles");

if (roles.contains("admin")) {
 // perform any action
};
```

> Notice that you'll find the `roles` information within the `appMetadata` HashMap and not in the `userMetadata`. Application metadata cannot be modified by users, whereas User metadata can be.

## Restrict Content Based On Access Level

At this point, you are able to distinguish the users roles in your app and authorize or deny (depending on the user) access to a certain feature.
