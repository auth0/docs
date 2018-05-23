---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to perform certain actions in the app.
budicon: 500
github:
  path: 05-Authorization
---

Many identity providers supply access claims which contain, for example, user roles or groups. You can request the access claims in your token with `scope: openid roles` or `scope: openid groups`.

If an identity provider does not supply this information, you can create a rule for assigning roles to users. 

## Create a Rule to Assign Roles

Create a rule that assigns the following access roles to your user: 
* An admin role
* A regular user role

To assign roles, go to the [New rule](${manage_url}/#/rules/new) page. In the **Access Control** section, select the **Set roles to a user** template. 

Edit the following line from the default script to match the conditions that fit your needs:

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

The rule is checked every time a user attempts to authenticate. 

* If the user has a valid email and the domain is `admin.com`, the user gets the admin and user roles.
* If the email contains anything else, the user gets the regular user role.

The claim is saved in the ID Token under the name `https://access.control/roles`. 

::: note
Depending on your needs, you can define roles other than admin and user. Read about the names you give your claims in the [Rules documentation](/rules#hello-world).
:::

## Test the Rule in Your Project

The claim with the roles you set is stored in the user's ID Token. It is a [JSON Web Token (JWT)](/jwt) that holds claims. You can use a JWT decoding library to obtain the roles and perform access control. You can use the [JWTDecode](https://github.com/auth0/JWTDecode.swift) library. 

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

## Restrict Content Based on Access Level

Now you can recognize the users with different roles in your app. You can use this information to give and restrict access to selected features in your app to users with different roles.

In the sample project, the user with the admin role can access the admin panel. 