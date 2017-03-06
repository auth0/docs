---
title: Authorization
description: This tutorial will show you how to use the Auth0 authentication API in your Android project to create a custom login screen.
seo_alias: android
budicon: 500
---

This step demonstrates how to use Auth0 to create access roles for your users. With access roles, you can authorize or deny content to different users based on the level of access they have.

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-android-sample',
  path: '07-Authorization',
  requirements: [
    'Android Studio 2.3',
    'Android SDK 24',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>

## Before Starting

Make sure you have completed the [Login](01-login) example.

## Configuration

There are some changes in the configuration that you need to do before setting up the Rules for them to work:

In the Auth0 Dashboard, go to your [account settings](https://manage.auth0.com/#/account) page and select the **Advanced** tab. Scroll down to **Migrations** and enable the "Run Rules on Password and Refresh Token Exchanges" toggle. This will make Rules run on the new Password and Refresh Token grants.

In your Android client, be sure to tell the `Auth0` instance that you'll be using OIDC conformant endpoints. i.e. if you're using Lock, it should look like this:

```java
Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
auth0.setOIDCConformant(true);

Lock lock = Lock.newBuilder(auth0, callback)
  //...
  .build(this);
```


## Create A Rule To Assign Roles

First, you need to create a rule that assigns your users either an `admin` role, or a single `user` role. To do so, go to the [new rule page](${manage_url}/#/rules/new) and select the "*Empty rule*" template under *Empty*. Then, name the rule and replace the entire code with the next snippet:

```java
function (user, context, callback) {

  //Define the name of the claim. Must look like a url:
  //Have 'http' or 'https' scheme and a hostname other than
  //'auth0.com', 'webtask.io' and 'webtask.run'.
  var claimName = 'https://access.control/role';

  //Check if the email has 'admin.com' domain and give the 'admin' role.
  //Otherwise, keep the default 'user' role.
  var role = 'user';
  if (user.email && user.email.indexOf('@admin.com') > -1) {
      role = 'admin';
  }
  //Set the role claim in the id_token
  context.idToken[claimName] = role;

  callback(null, user, context);
}
```

Make sure you press the **SAVE** button after the changes.

The rule will run before each user's authentication. In this particular case, the rule will decide which role the user should be granted by checking the email he used when he first signed up. The role value will be stored in the `id_token` using a custom claim name. In this example we've chosen `'https://access.control/role'`. If you haven't yet read about JWT's or it's Claims we recommend you to read [this article](https://auth0.com/docs/jwt).

```java
var claimName = 'https://access.control/role';
```

The name used for the claim must look like a Url for it to be correctly set:
- Must begin with a `http` or `https` scheme.
- Must have a hostname other than `auth0.com`, `webtask.io` and `webtask.run`.


Next, the rule will check the user's email:

```java
var role = 'user';
if (user.email && user.email.indexOf('@admin.com') > -1) {
    role = 'admin';
}
```

By default, it says that if the user email exists and contains `@admin.com` then he will be given an `admin` role, otherwise a regular `user` role. Use this or any other condition to decide the role. You can define more roles other than `admin` and `user`, depending on your product requirements.

Finally, the rule will set the role claim value in the `id_token` for later verification.

```java
context.idToken[claimName] = role;
```


## Testing the Rule in your project

In the Android client after the user logs in you'll obtain a `Credentials` object. Take the `id_token` and decode it using a **JWT library** to obtain it's Claims. We will use [this one](https://github.com/auth0/JWTDecode.Android) as it's focused on Android.

When we decode the token, we'll see that the payload contains the custom claim that we added in the rule code.

```java
String idToken = CredentialsManager.getCredentials(this).getIdToken();
JWT jwt = new JWT(idToken);
```

Example token payload:

```java
{
  "name": "user123@company.com",
  "nickname": "user123",
  "updated_at": "2017-03-01T18:05:41.970Z",
  "email": "user123@company.comd",
  "email_verified": true,
  "iss": "https://mydomain.auth0.com/",
  "sub": "auth0|58810c3cac6244199eed0d60",
  "aud": "OrfjK23lsdOfh94HfosaORYhk1v9e",
  "exp": 1488427542,
  "iat": 1488391542,
  "https://access.control/role": "user"
}
```

Extract the role claim's value. Use the name of the claim you've used in the Rule code:

```
String roleClaim = "https://access.control/role";
String userRole = jwt.getClaim(roleClaim).asString();
// userRole = "user"
```


Now that you have the user's role, use it to decide if he can access the custom sections of your application. In our example, we're protecting the `SettingsActivity`:

```java
private void showSettings() {
    if (!"admin".equals(userRole)) {
        Toast.makeText(MainActivity.this, "You don't have access rights to visit this page", Toast.LENGTH_SHORT).show();
        return;
    }

    startActivity(new Intent(this, SettingsActivity.class));
}
```

Create and account and log in using an email ending in '@admin.com' and you should be able to enter the `SettingsActivity`. Log in using an email with a different domain and this section should have the access blocked.


## Restrict Content Based On Access Level

At this point, you are able to distinguish the users roles in your app and authorize or deny (depending on the user) access to a certain feature.
