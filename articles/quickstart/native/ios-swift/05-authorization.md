---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to perform certain actions in the app.
budicon: 500
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-swift-sample',
  path: '05-Authorization',
  requirements: [
    'CocoaPods 1.2.1',
    'Version 8.3.2 (8E2002)',
    'iPhone 7 - iOS 10.3 (14E269)'
  ]
}) %>

Many identity providers will supply access claims, like roles or groups, with the user. You can request these in your token by setting `scope: openid roles` or `scope: openid groups`. However, not every identity provider provides this type of information. Fortunately, Auth0 has an alternative to it, which is creating a rule for assigning different roles to different users.

## Create A Rule To Assign Roles

First, you need to create a rule that assigns your users either an `admin` role, or a simple `user` role. To do so, go to the [new rule page](${manage_url}/#/rules/new) and select the "*Set Roles To A User*" template, under *Access Control*. Then, replace the default script with the contents of the following snippet:

```js
function (user, context, callback) {

  //Define the name of the claim. Must look like a url:
  //Have 'http' or 'https' scheme and a hostname other than
  //'auth0.com', 'webtask.io' and 'webtask.run'.
  var claimName = 'https://access.control/roles';

  //Check if the email has the 'admin.com' domain and give the 'admin' role.
  //Otherwise, keep a default 'user' role.
  var roles = ['user'];
  if (user.email && user.email.indexOf('@admin.com') > -1) {
      roles.push('admin');
  }
  //Set the role claim in the id_token
  context.idToken[claimName] = roles;

  callback(null, user, context);
}
```

The rule will run every time a user attempts to authenticate. If the user has a valid `email` and the email's domain is `admin.com`, the user will be granted the `user` and `admin` roles. On any other case, the user will be granted a simple `user` role. This new claim is saved in the *id_token* under the `https://access.control/roles` name, which you will have to check on your app.

::: note
Feel free to customize the conditions and the roles to grant on each of them. You can define as many roles as your project requires, beyond `admin` and `user`. There are some restrictions on the naming of the claims detailed in the [rules documentation](/rules/#hello-world).
:::

## Test the Rule

The id_token is a [JWT](/jwt) that holds several claims, like the one with the roles you set previously. By using a JWT decoding library (like [this one](https://github.com/auth0/JWTDecode.swift)) you will be able to obtain the roles and perform access control.

```swift
import JWTDecode
```

```swift
guard
    let idToken = self.keychain.string(forKey: "id_token"),
    let jwt = try? decode(jwt: idToken),
    let roles = jwt.claim(name: "https://access.control/roles").array
    else { // Couldn't retrieve claim }

if roles.contains("admin") {
    // Access Granted
    // Present Admin Screen
} else {
    // Access Denied
    // Show warning
}
```

## Restrict Content Based On Access Level

At this point, you are able to distinguish the users roles in your app and authorize or deny (depending on the user) access to a certain feature. In the sample project those users with the `admin` role will be able to access the Admin Panel.