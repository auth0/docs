---
description: How to read and update user metadata with Lock.
---

# Using Metadata with Auth0's Lock Library

When using Auth0's [Lock](/libraries/lock) library, you can define and update the user's `user_metadata` field.

**NOTE**: For an overview on implementing Lock, see the [JavaScript Quickstart](/quickstart/spa/vanillajs).

## Defining *user_metadata* on Signup

For information on adding `user_metadata` on signup, see the section on Lock [Custom Sign Up Fields](/libraries/lock/v10/new-features#custom-sign-up-fields) 

## Working with *user_metadata*

Once you have [implemented the login functionality](/quickstart/spa/vanillajs#3-implement-the-login) for your Lock instance, you can choose to store the newly-created `id_token`. This token is used to retrieve the user's profile from Auth0 or to call APIs.

```js
var hash = lock.parseHash(window.location.hash);
if (hash) {
  if (hash.error) {
    console.log("There was an error logging in", hash.error);
    alert('There was an error: ' + hash.error + '\n' + hash.error_description);
  } else {
    //save the token in the session:
    localStorage.setItem('id_token', hash.id_token);
  }
}
```

## Reading *user_metadata* Properties

You can read the user's `user_metadata` properties the same way you would for any user profile property. This example retrieves the value associated with `user.metadata.hobby`:

```js
var id_token = localStorage.getItem('id_token');
if (id_token) {
  lock.getProfile(id_token, function (err, profile) {
    if (err) {
      return alert('There was an error getting the profile: ' + err.message);
    }
    document.getElementById('name').textContent = profile.user_metadata.hobby;
  });
}
```

## Updating Metadata Properties

You can [update the metadata properties](/metadata/apiv2#update-user-metadata) with calls to the Auth0 Management API.

By including the user's `id_token` in the `Authorization` header, you can make the appropriate `PATCH` call to the [Update a user](/api/management/v2#!/Users/patch_users_by_id) endpoint. 

Here is what a sample request might look like:

```js
var request = require("request");

var options = { method: 'PATCH',
  url: 'https://${account.namespace}/api/v2/users/{user_id}',
  headers: { authorization: "Bearer " + localStorage.getItem(id_token) },
  body: { user_metadata: { addresses: { home: '123 Main Street, Anytown, ST 12345' } } },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```
