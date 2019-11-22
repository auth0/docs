---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to perform certain actions in the app.
budicon: 500
topics:
    - quickstarts
    - native
    - ios
    - swift
github:
    path: 05-Authorization
contentType: tutorial
useCase: quickstart
---

Many identity providers supply access claims which contain, for example, user roles or groups. You can request the access claims in your token with `.scope("openid roles")` or `.scope("openid groups")`.

If an identity provider does not supply this information, you can create a rule for assigning roles to users.

## Create a Rule to Assign Roles

Create a rule that assigns the following access roles to your user:
* An admin role
* A regular user role

To assign roles, go to the [New rule](${manage_url}/#/rules/new) page. In the **Access Control** section, select the **Set roles to a user** template.

Edit the following line from the default script to match the conditions that fit your needs:

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
      return ['admin'];
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

The rule is checked every time a user attempts to authenticate.

* If the user has a valid email and the domain is `example.com`, the user gets the admin and user roles.
* If the email contains anything else, the user gets the regular user role.

The claim is saved in the ID Token under the name `https://example.com/roles`.

::: note
Depending on your needs, you can define roles other than admin and user. Read about the names you give your claims in the [Rules documentation](/rules#hello-world).
:::

## Test the Rule in Your Project

The claim with the roles you set is stored in the user's ID Token. It is a [JSON Web Token (JWT)](/jwt) that holds claims. You can use a JWT decoding library to obtain the roles and perform access control. You can use the [JWTDecode](https://github.com/auth0/JWTDecode.swift) library.

```swift
import JWTDecode
```

```swift
guard let idToken = self.keychain.string(forKey: "id_token"),
    let jwt = try? decode(jwt: idToken),
    let roles = jwt.claim(name: "https://example.com/roles").array else {
    // Couldn't retrieve claim
    return
}

if roles.contains("admin") {
    // Access Granted
    // Present Admin Screen
} else {
    // Access Denied
    // Show warning
}
```

## Restrict Content Based on Access Level

Now you can recognize the users with different roles in your app. You can use this information to give and restrict access to selected features in your app to users with different roles.

In the sample project, the user with the admin role can access the admin panel.
